import React, { useEffect, useMemo, useState } from "react";
import { Search, Siren, Paperclip, X, Phone, MapPin, CalendarDays, User, FileText, Trash2, Send, Download, EyeOff } from "lucide-react";
import { adminApi, can, errorMessage, Report, ReportStatus, SectionProps } from "../adminApi";
import { Card, PageTitle, StatusBadge, Loading, Empty, ErrorNote, Button, TextArea, TextInput, SelectInput, ConfirmDialog, fmtDate, ago, statusLabel } from "../ui";
import { reportTypeLabels } from "@/pages/ReportForm";
import { ReportType } from "@/types";

const typeLabel = (t: string) => reportTypeLabels[t as ReportType]?.en ?? t;
const STATUSES: ReportStatus[] = ["pending", "investigating", "resolved", "dismissed"];

type Staff = { _id: string; name: string; role: string };

const Evidence: React.FC<{ report: Report }> = ({ report }) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let created: string[] = [];
    let cancelled = false;
    setUrls([]);
    Promise.all(report.evidence.map((p) => adminApi.evidenceUrl(p).catch(() => "")))
      .then((list) => {
        created = list.filter(Boolean);
        if (cancelled) return created.forEach((u) => URL.revokeObjectURL(u));
        setFailed(list.some((u) => !u));
        setUrls(list);
      });
    return () => {
      cancelled = true;
      created.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [report._id, report.evidence]);

  if (!report.evidence.length) return <p className="text-sm text-slate-400">No files attached.</p>;

  return (
    <div>
      {failed && <ErrorNote message="Some files could not be loaded." />}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {report.evidenceMeta.map((m, i) => {
          const url = urls[i];
          const isImage = m.type.startsWith("image/");
          return (
            <a
              key={i}
              href={url || undefined}
              target="_blank"
              rel="noreferrer"
              download={!isImage ? m.name : undefined}
              className="group relative flex h-28 flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-center hover:border-brand-400"
            >
              {isImage && url ? (
                <img src={url} alt={m.name} className="h-full w-full object-cover blur-md transition group-hover:blur-0" />
              ) : (
                <>
                  <Download className="h-5 w-5 text-slate-400" />
                  <span className="mt-1 line-clamp-2 px-2 text-xs text-slate-600">{m.name}</span>
                </>
              )}
              <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 text-[10px] text-white">{(m.size / 1024).toFixed(0)} KB</span>
            </a>
          );
        })}
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
        <EyeOff className="h-3.5 w-3.5" /> Images are blurred until you hover, to limit exposure to distressing content.
      </p>
    </div>
  );
};

const Detail: React.FC<{
  report: Report;
  staff: Staff[];
  props: SectionProps;
  onUpdated: (r: Report) => void;
  onDeleted: (id: string) => void;
  onClose: () => void;
}> = ({ report, staff, props, onUpdated, onDeleted, onClose }) => {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const run = async (key: string, fn: () => Promise<Report>) => {
    setBusy(key);
    setError("");
    try {
      onUpdated(await fn());
      props.onChange();
      return true;
    } catch (err) {
      setError(errorMessage(err));
      return false;
    } finally {
      setBusy(null);
    }
  };

  const assignee = staff.find((s) => s._id === report.assignedTo);

  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-brand-950/30 backdrop-blur-[2px]" onMouseDown={onClose}>
      <aside onMouseDown={(e) => e.stopPropagation()} className="animate-fade-up flex h-full w-full max-w-2xl flex-col bg-cream shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <p className="font-mono text-sm text-slate-500">{report.trackingId}</p>
            <h2 className="mt-0.5 text-xl font-semibold text-slate-900">{typeLabel(report.type)}</h2>
            <p className="mt-1 text-xs text-slate-500">Received {fmtDate(report.createdAt)} · updated {ago(report.updatedAt)}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <ErrorNote message={error} />
          {report.inDanger && report.status !== "resolved" && report.status !== "dismissed" && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
              <Siren className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <span><strong>Still at risk.</strong> The person said they are still in danger. Prioritise this report.</span>
            </div>
          )}

          <Card className="grid gap-4 p-5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-slate-700">Status</span>
              <SelectInput
                value={report.status}
                disabled={busy === "status"}
                onChange={(e) => run("status", () => adminApi.setReportStatus(report._id, e.target.value as ReportStatus))}
                className="w-full"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
              </SelectInput>
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-slate-700">Assigned to</span>
              {can.assign(props.role) ? (
                <SelectInput
                  value={report.assignedTo ?? ""}
                  disabled={busy === "assign"}
                  onChange={(e) => run("assign", () => adminApi.assignReport(report._id, e.target.value))}
                  className="w-full"
                >
                  <option value="">Unassigned</option>
                  {staff.map((s) => <option key={s._id} value={s._id}>{s.name}{s._id === props.user._id ? " (me)" : ""}</option>)}
                </SelectInput>
              ) : (
                <p className="py-2 text-slate-700">{assignee?.name ?? "Unassigned"}</p>
              )}
            </label>
          </Card>

          <Card className="p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700"><FileText className="h-4 w-4" /> What happened</h3>
            <p className="mt-3 whitespace-pre-wrap leading-relaxed text-slate-800">{report.description}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div className="flex items-start gap-2"><CalendarDays className="mt-0.5 h-4 w-4 text-slate-400" /><div><dt className="text-xs text-slate-500">Incident date</dt><dd>{fmtDate(report.incidentDate, false)}</dd></div></div>
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-slate-400" /><div><dt className="text-xs text-slate-500">District</dt><dd>{report.district || "—"}</dd></div></div>
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-slate-400" /><div><dt className="text-xs text-slate-500">Place</dt><dd>{report.incidentLocation || "—"}</dd></div></div>
            </dl>
          </Card>

          <Card className="p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700"><User className="h-4 w-4" /> Person reporting</h3>
            {report.isAnonymous ? (
              <p className="mt-3 text-sm text-slate-600">Reported anonymously. Only the tracking ID can be used to follow up.</p>
            ) : (
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div><dt className="text-xs text-slate-500">Name</dt><dd>{report.victimName || "—"}</dd></div>
                <div>
                  <dt className="text-xs text-slate-500">Phone</dt>
                  <dd>{report.victimPhone ? <a href={`tel:${report.victimPhone}`} className="font-mono text-brand-700 hover:underline">{report.victimPhone}</a> : "—"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-slate-500">Contact</dt>
                  <dd className={report.canContact ? "text-emerald-700" : "font-semibold text-red-700"}>
                    {report.canContact ? <>Safe to call · best time: <strong>{report.safeTime ?? "any time"}</strong></> : <>Do NOT contact: the person did not say it is safe.</>}
                  </dd>
                </div>
              </dl>
            )}
          </Card>

          <Card className="p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700"><Paperclip className="h-4 w-4" /> Evidence ({report.evidence.length})</h3>
            <Evidence report={report} />
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-slate-700">Case notes <span className="font-normal text-slate-400">(staff only, encrypted)</span></h3>
            <ul className="mt-3 space-y-3">
              {report.notes.length === 0 && <li className="text-sm text-slate-400">No notes yet.</li>}
              {report.notes.map((n) => (
                <li key={n._id} className="rounded-xl bg-slate-50 p-3 text-sm">
                  <p className="whitespace-pre-wrap text-slate-800">{n.text}</p>
                  <p className="mt-1.5 text-xs text-slate-500">{n.byName} · {fmtDate(n.at)}</p>
                </li>
              ))}
            </ul>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (note.trim()) run("note", () => adminApi.addNote(report._id, note.trim())).then((saved) => saved && setNote(""));
              }}
            >
              <TextArea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note: calls made, referrals, next steps..." rows={2} maxLength={3000} className="flex-1" />
              <Button type="submit" icon={Send} loading={busy === "note"} disabled={!note.trim()} className="self-end">Add</Button>
            </form>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-slate-700">History</h3>
            <ol className="mt-3 space-y-2 border-l-2 border-brand-100 pl-4 text-sm">
              {[...report.statusHistory].reverse().map((h, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-brand-500" />
                  <span className="font-medium text-slate-800">{statusLabel(h.status)}</span>
                  <span className="text-slate-500"> · {fmtDate(h.at)}{h.by ? ` · ${staff.find((s) => s._id === h.by)?.name ?? "staff"}` : ""}</span>
                </li>
              ))}
            </ol>
          </Card>

          {can.delete(props.role) && (
            <div className="flex justify-end">
              <Button tone="ghost" icon={Trash2} className="text-red-600 hover:bg-red-50" onClick={() => setConfirmDelete(true)}>Delete report</Button>
            </div>
          )}
        </div>
      </aside>

      {confirmDelete && (
        <ConfirmDialog
          title="Delete this report?"
          message={`Report ${report.trackingId}, its evidence files and notes will be permanently deleted. The person will no longer be able to track it. This cannot be undone.`}
          confirmLabel="Delete permanently"
          onClose={() => setConfirmDelete(false)}
          onConfirm={async () => {
            await adminApi.deleteReport(report._id);
            props.onChange();
            onDeleted(report._id);
          }}
        />
      )}
    </div>
  );
};

const Reports: React.FC<SectionProps> = (props) => {
  const [reports, setReports] = useState<Report[] | null>(null);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [error, setError] = useState("");
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [status, setStatus] = useState<"open" | ReportStatus | "all">(params.get("q") ? "all" : "open");
  const [type, setType] = useState("");
  const [assignee, setAssignee] = useState<"all" | "me" | "none">(params.get("mine") ? "me" : params.get("unassigned") ? "none" : "all");
  const [urgentOnly, setUrgentOnly] = useState(params.has("risk"));
  const [openId, setOpenId] = useState<string | null>(null);

  // A quick-search for an exact tracking ID opens that report directly.
  useEffect(() => {
    const exact = reports?.find((r) => r.trackingId === query.trim().toUpperCase());
    if (exact && params.get("q")) setOpenId(exact._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports]);

  useEffect(() => {
    adminApi.reports().then(setReports).catch((e) => setError(errorMessage(e, "Could not load reports")));
    adminApi.staffPicker().then(setStaff).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    if (!reports) return [];
    const q = query.trim().toLowerCase();
    return reports.filter((r) => {
      if (status === "open" ? !["pending", "investigating"].includes(r.status) : status !== "all" && r.status !== status) return false;
      if (type && r.type !== type) return false;
      if (urgentOnly && !r.inDanger) return false;
      if (assignee === "me" && r.assignedTo !== props.user._id) return false;
      if (assignee === "none" && r.assignedTo) return false;
      if (q && !`${r.trackingId} ${r.description} ${r.district ?? ""} ${r.victimName ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [reports, query, status, type, assignee, urgentOnly, props.user._id]);

  const open = reports?.find((r) => r._id === openId);
  const staffName = (id: string | null) => staff.find((s) => s._id === id)?.name;

  return (
    <>
      <PageTitle title="Reports" subtitle="Encrypted survivor reports. Treat everything here as strictly confidential." />
      <ErrorNote message={error} />

      <Card className="mb-4 flex flex-wrap items-center gap-3 p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <TextInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ID, text, district, name" className="w-full pl-9" />
        </div>
        <SelectInput value={status} onChange={(e) => setStatus(e.target.value as typeof status)} aria-label="Status">
          <option value="open">Open (pending + investigating)</option>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
        </SelectInput>
        <SelectInput value={type} onChange={(e) => setType(e.target.value)} aria-label="Type">
          <option value="">All types</option>
          {Object.values(ReportType).map((t) => <option key={t} value={t}>{typeLabel(t)}</option>)}
        </SelectInput>
        <SelectInput value={assignee} onChange={(e) => setAssignee(e.target.value as typeof assignee)} aria-label="Assignee">
          <option value="all">Anyone</option>
          <option value="me">Assigned to me</option>
          <option value="none">Unassigned</option>
        </SelectInput>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl px-2 text-sm text-slate-700">
          <input type="checkbox" checked={urgentOnly} onChange={(e) => setUrgentOnly(e.target.checked)} className="h-4 w-4 accent-red-600" />
          Still at risk only
        </label>
      </Card>

      {!reports ? (
        <Loading label="Loading reports..." />
      ) : filtered.length === 0 ? (
        <Empty title={reports.length ? "No reports match these filters" : "No reports yet"} hint={reports.length ? "Try clearing a filter." : "Reports submitted on the site will appear here."} />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Report</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Assigned</th>
                  <th className="px-4 py-3 font-semibold">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr key={r._id} onClick={() => setOpenId(r._id)} className="cursor-pointer hover:bg-brand-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {r.inDanger && !["resolved", "dismissed"].includes(r.status) && (
                          <span title="Still at risk" className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-700">
                            <Siren className="h-3 w-3" /> At risk
                          </span>
                        )}
                        <span className="font-mono font-semibold text-slate-900">{r.trackingId}</span>
                        {r.evidence.length > 0 && <span className="flex items-center text-xs text-slate-400"><Paperclip className="h-3.5 w-3.5" />{r.evidence.length}</span>}
                        {!r.isAnonymous && r.canContact && <Phone className="h-3.5 w-3.5 text-emerald-600" aria-label="Can be contacted" />}
                      </div>
                      <p className="mt-0.5 line-clamp-1 max-w-sm text-xs text-slate-500">{r.description}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{typeLabel(r.type)}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3 text-slate-600">{staffName(r.assignedTo) ?? <span className="text-amber-700">Unassigned</span>}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500" title={fmtDate(r.createdAt)}>{ago(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500">{filtered.length} of {reports.length} reports</p>
        </Card>
      )}

      {open && (
        <Detail
          report={open}
          staff={staff}
          props={props}
          onClose={() => setOpenId(null)}
          onUpdated={(r) => setReports((list) => list?.map((x) => (x._id === r._id ? r : x)) ?? null)}
          onDeleted={(id) => {
            setOpenId(null);
            setReports((list) => list?.filter((x) => x._id !== id) ?? null);
          }}
        />
      )}
    </>
  );
};

export default Reports;
