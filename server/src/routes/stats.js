import { Router } from 'express';
import Complaint from '../models/Complaint.js';
import CallbackRequest from '../models/CallbackRequest.js';
import Volunteer from '../models/Volunteer.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = Router();
const TZ = 'Asia/Dhaka';
const OPEN = ['pending', 'investigating'];
const RANGES = [7, 30, 90];

const startOfDay = (daysAgo) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d;
};
const dayKey = (d) => d.toLocaleDateString('en-CA', { timeZone: TZ });

/** Daily counts for [from, to), with missing days filled as 0. */
const daily = async (Model, from, days) => {
  const rows = await Model.aggregate([
    { $match: { createdAt: { $gte: from, $lt: new Date(from.getTime() + days * 864e5) } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: TZ } }, count: { $sum: 1 } } },
  ]);
  const counts = Object.fromEntries(rows.map((r) => [r._id, r.count]));
  return Array.from({ length: days }, (_, i) => {
    const key = dayKey(new Date(from.getTime() + i * 864e5 + 6 * 36e5));
    return { date: key, count: counts[key] || 0 };
  });
};

const sum = (series) => series.reduce((n, d) => n + d.count, 0);

router.get('/', protect, async (req, res) => {
  const days = RANGES.includes(Number(req.query.days)) ? Number(req.query.days) : 30;
  const from = startOfDay(days - 1);
  const prevFrom = startOfDay(2 * days - 1);
  const inRange = { createdAt: { $gte: from } };

  const [
    reportsDaily, reportsPrev, callbacksDaily, callbacksPrev, volunteersDaily, volunteersPrev,
    byStatus, byType, byDistrict, heat, workload, callbacksByTopic, volunteersBySkill,
    urgentOpen, unassignedOpen, callbacksNew, volunteersNew, rangeReports,
    recentReports, recentCallbacks, recentVolunteers,
  ] = await Promise.all([
    daily(Complaint, from, days),
    daily(Complaint, prevFrom, days),
    daily(CallbackRequest, from, days),
    daily(CallbackRequest, prevFrom, days),
    daily(Volunteer, from, days),
    daily(Volunteer, prevFrom, days),
    Complaint.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Complaint.aggregate([{ $match: inRange }, { $group: { _id: '$type', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Complaint.aggregate([
      { $match: { ...inRange, district: { $nin: [null, ''] } } },
      { $group: { _id: { $toLower: { $trim: { input: '$district' } } }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]),
    Complaint.aggregate([
      { $match: inRange },
      { $group: { _id: { d: { $dayOfWeek: { date: '$createdAt', timezone: TZ } }, h: { $hour: { date: '$createdAt', timezone: TZ } } }, count: { $sum: 1 } } },
    ]),
    Complaint.aggregate([
      { $match: { status: { $in: OPEN } } },
      { $group: { _id: '$assignedTo', count: { $sum: 1 }, urgent: { $sum: { $cond: ['$inDanger', 1, 0] } } } },
      { $sort: { count: -1 } },
    ]),
    CallbackRequest.aggregate([{ $match: inRange }, { $group: { _id: '$topic', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Volunteer.aggregate([{ $unwind: '$skills' }, { $group: { _id: '$skills', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Complaint.countDocuments({ inDanger: true, status: { $in: OPEN } }),
    Complaint.countDocuments({ assignedTo: null, status: { $in: OPEN } }),
    CallbackRequest.countDocuments({ status: 'new' }),
    Volunteer.countDocuments({ status: 'new' }),
    Complaint.find(inRange).select('status statusHistory createdAt').lean(),
    Complaint.find().sort({ createdAt: -1 }).limit(8).select('trackingId type inDanger status createdAt').lean(),
    CallbackRequest.find().sort({ createdAt: -1 }).limit(5).select('topic status createdAt').lean(),
    Volunteer.find().sort({ createdAt: -1 }).limit(5).select('skills status createdAt').lean(),
  ]);

  // Response: hours from submission to the first action taken by a staff member.
  const responseHours = rangeReports
    .map((r) => r.statusHistory.find((h) => h.by))
    .map((h, i) => (h ? (new Date(h.at) - new Date(rangeReports[i].createdAt)) / 36e5 : null))
    .filter((h) => h !== null)
    .sort((a, b) => a - b);
  const median = responseHours.length ? responseHours[Math.floor(responseHours.length / 2)] : null;
  const resolved = rangeReports.filter((r) => r.status === 'resolved').length;

  const names = Object.fromEntries(
    (await User.find({ _id: { $in: workload.map((w) => w._id).filter(Boolean) } }).select('name').lean()).map((u) => [String(u._id), u.name]),
  );

  const recent = [
    ...recentReports.map((r) => ({ kind: 'report', at: r.createdAt, title: r.trackingId, detail: r.type, urgent: r.inDanger, status: r.status })),
    ...recentCallbacks.map((c) => ({ kind: 'callback', at: c.createdAt, title: 'Call-back request', detail: c.topic, status: c.status })),
    ...recentVolunteers.map((v) => ({ kind: 'volunteer', at: v.createdAt, title: 'Volunteer application', detail: v.skills.join(', '), status: v.status })),
  ]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, 10);

  res.json({
    success: true,
    data: {
      days,
      reports: { daily: reportsDaily, prevDaily: reportsPrev, total: sum(reportsDaily), prevTotal: sum(reportsPrev) },
      callbacks: { daily: callbacksDaily, total: sum(callbacksDaily), prevTotal: sum(callbacksPrev) },
      volunteers: { daily: volunteersDaily, total: sum(volunteersDaily), prevTotal: sum(volunteersPrev) },
      byStatus: Object.fromEntries(byStatus.map((s) => [s._id, s.count])),
      byType: byType.map((t) => ({ label: t._id, count: t.count })),
      byDistrict: byDistrict.map((d) => ({ label: d._id.replace(/\b\w/g, (c) => c.toUpperCase()), count: d.count })),
      // MongoDB $dayOfWeek: 1 = Sunday
      heatmap: heat.map((h) => ({ day: h._id.d - 1, hour: h._id.h, count: h.count })),
      workload: workload.map((w) => ({ label: w._id ? names[String(w._id)] ?? 'Former staff' : 'Unassigned', count: w.count, urgent: w.urgent, unassigned: !w._id })),
      callbacksByTopic: callbacksByTopic.map((t) => ({ label: t._id, count: t.count })),
      volunteersBySkill: volunteersBySkill.map((s) => ({ label: s._id, count: s.count })),
      response: { medianHours: median, measured: responseHours.length, resolved, inRange: rangeReports.length },
      urgentOpen,
      unassignedOpen,
      callbacksNew,
      volunteersNew,
      recent,
    },
  });
});

export default router;
