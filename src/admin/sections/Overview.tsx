import React, { useCallback, useEffect, useState } from "react";
import { FileWarning, Siren, UserX, PhoneCall, Users, ArrowRight, ArrowUpRight, ArrowDownRight, Minus, RefreshCw, Timer, FileText, UserPlus } from "lucide-react";
import { adminApi, AdminNavigate, Role, Stats, can, errorMessage } from "../adminApi";
import { Card, PageTitle, Loading, ErrorNote, Segmented, StatusBadge, ago } from "../ui";
import { TrendChart, Donut, BarList, Heatmap, Meter, Sparkline, STATUS_COLORS, SERIES } from "../charts";
import { reportTypeLabels } from "@/pages/ReportForm";
import { topics } from "@/data/topics";
import { ReportType } from "@/types";

const typeLabel = (t: string) => reportTypeLabels[t as ReportType]?.en ?? t;
const topicLabel = (id: string) => topics.find((t) => t.id === id)?.title.en ?? "Other";

const Panel: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode; className?: string; children: React.ReactNode }> = ({ title, subtitle, action, className = "", children }) => (
  <Card className={`flex flex-col p-6 ${className}`}>
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h2 className="font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
    <div className="flex-1">{children}</div>
  </Card>
);

/** Change vs the previous period. Neutral ink: more reports is not "good" or "bad" by itself. */
const Delta: React.FC<{ now: number; prev: number }> = ({ now, prev }) => {
  const diff = now - prev;
  const pct = prev ? Math.round((diff / prev) * 100) : null;
  const Icon = diff > 0 ? ArrowUpRight : diff < 0 ? ArrowDownRight : Minus;
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-slate-500">
      <Icon className="h-3.5 w-3.5" />
      {diff === 0 ? "No change" : pct === null ? `+${diff}` : `${diff > 0 ? "+" : ""}${pct}%`}
      <span className="ml-1 font-normal text-slate-400">vs prev.</span>
    </span>
  );
};

const StatTile: React.FC<{
  label: string;
  value: number;
  icon: React.ElementType;
  tone: string;
  onClick: () => void;
  critical?: boolean;
  spark?: number[];
  delta?: { now: number; prev: number };
  hint?: string;
}> = ({ label, value, icon: Icon, tone, onClick, critical, spark, delta, hint }) => (
  <button
    onClick={onClick}
    className={`group flex flex-col rounded-2xl border bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-950/5 ${critical ? "border-red-200 ring-1 ring-red-100" : "border-slate-200"}`}
  >
    <div className="flex items-center justify-between">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${tone}`}><Icon className="h-[18px] w-[18px]" /></span>
      <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
    </div>
    <p className={`mt-4 font-display text-[2rem] font-semibold leading-none tabular-nums ${critical ? "text-red-700" : "text-brand-950"}`}>{value}</p>
    <p className="mt-1.5 text-sm text-slate-600">{label}</p>
    <div className="mt-3 min-h-[2rem]">
      {spark ? <Sparkline values={spark} /> : hint ? <p className="text-xs text-slate-400">{hint}</p> : null}
    </div>
    {delta && <div className="mt-1"><Delta now={delta.now} prev={delta.prev} /></div>}
  </button>
);

const recentIcon = { report: FileText, callback: PhoneCall, volunteer: UserPlus };

const Overview: React.FC<{ onNavigate: AdminNavigate; role: Role }> = ({ onNavigate, role }) => {
  const [days, setDays] = useState<"7" | "30" | "90">("30");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(() => {
    setRefreshing(true);
    adminApi
      .stats(Number(days))
      .then((s) => {
        setStats(s);
        setUpdated(new Date());
        setError("");
      })
      .catch((e) => setError(errorMessage(e, "Could not load the dashboard")))
      .finally(() => setRefreshing(false));
  }, [days]);

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, [load]);

  if (!stats) return error ? <ErrorNote message={error} /> : <Loading label="Loading dashboard..." />;

  const open = (stats.byStatus.pending ?? 0) + (stats.byStatus.investigating ?? 0);
  const period = `last ${stats.days} days`;
  const requests = can.handleRequests(role);
  const median = stats.response.medianHours;
  const medianText = median === null ? "—" : median < 1 ? `${Math.max(1, Math.round(median * 60))} min` : median < 48 ? `${median.toFixed(1)} h` : `${Math.round(median / 24)} days`;

  return (
    <>
      <PageTitle
        title="Overview"
        subtitle={updated ? `Live dashboard · updated ${updated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}` : "Live dashboard"}
        action={
          <div className="flex items-center gap-2">
            <Segmented value={days} onChange={setDays} options={[{ value: "7", label: "7 days" }, { value: "30", label: "30 days" }, { value: "90", label: "90 days" }]} />
            <button onClick={load} className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:text-brand-700" aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        }
      />
      <ErrorNote message={error} />

      {stats.urgentOpen > 0 && (
        <button onClick={() => onNavigate("reports")} className="mb-6 flex w-full items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 p-4 text-left text-white shadow-lg shadow-red-900/20">
          <span className="grid h-10 w-10 shrink-0 animate-pulse-ring place-items-center rounded-full bg-white/20"><Siren className="h-5 w-5" /></span>
          <span className="flex-1">
            <span className="block font-semibold">{stats.urgentOpen} open report{stats.urgentOpen === 1 ? "" : "s"} from people still at risk</span>
            <span className="text-sm text-red-50">Review and assign these before anything else.</span>
          </span>
          <ArrowRight className="h-5 w-5" />
        </button>
      )}

      {/* KPI row */}
      <div className={`grid gap-4 sm:grid-cols-2 ${requests ? "xl:grid-cols-5" : "xl:grid-cols-3"}`}>
        <StatTile label={`Reports, ${period}`} value={stats.reports.total} icon={FileWarning} tone="bg-brand-50 text-brand-700" onClick={() => onNavigate("reports")} spark={stats.reports.daily.map((d) => d.count)} delta={{ now: stats.reports.total, prev: stats.reports.prevTotal }} />
        <StatTile label="Still at risk (open)" value={stats.urgentOpen} icon={Siren} tone="bg-red-50 text-red-700" critical={stats.urgentOpen > 0} onClick={() => onNavigate("reports")} hint={`${open} open reports in total`} />
        <StatTile label="Unassigned (open)" value={stats.unassignedOpen} icon={UserX} tone="bg-amber-50 text-amber-700" onClick={() => onNavigate("reports")} hint="Waiting for a case worker" />
        {requests && <StatTile label={`Call-backs, ${period}`} value={stats.callbacks.total} icon={PhoneCall} tone="bg-teal-50 text-teal-700" onClick={() => onNavigate("callbacks")} spark={stats.callbacks.daily.map((d) => d.count)} delta={{ now: stats.callbacks.total, prev: stats.callbacks.prevTotal }} />}
        {requests && <StatTile label={`Volunteers, ${period}`} value={stats.volunteers.total} icon={Users} tone="bg-sky-50 text-sky-700" onClick={() => onNavigate("volunteers")} spark={stats.volunteers.daily.map((d) => d.count)} delta={{ now: stats.volunteers.total, prev: stats.volunteers.prevTotal }} />}
      </div>

      {/* Trend + status */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Reports received"
          subtitle={`Per day, ${period}`}
          action={
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: SERIES }} /> This period</span>
              <span className="flex items-center gap-1.5"><span className="h-0 w-4 border-t-2 border-dashed border-slate-400" /> Previous period</span>
            </div>
          }
        >
          <TrendChart data={stats.reports.daily} previous={stats.reports.prevDaily} label={`Reports per day, ${period}`} />
        </Panel>
        <Panel title="Case status" subtitle="All reports, all time">
          <Donut
            centerLabel="reports"
            segments={(["pending", "investigating", "resolved", "dismissed"] as const).map((s) => ({ key: s, label: s[0].toUpperCase() + s.slice(1), value: stats.byStatus[s] ?? 0, color: STATUS_COLORS[s] }))}
          />
          <ul className="mt-5 grid grid-cols-2 gap-2">
            {(["pending", "investigating", "resolved", "dismissed"] as const).map((s) => (
              <li key={s} className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLORS[s] }} /><StatusBadge status={s} /></span>
                <span className="tabular-nums text-sm font-semibold">{stats.byStatus[s] ?? 0}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Heatmap + response */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title="When reports come in" subtitle={`Day and hour (Bangladesh time), ${period}. Use this to plan staff and helpline cover.`}>
          <Heatmap cells={stats.heatmap} />
        </Panel>
        <Panel title="Response" subtitle={`Reports received in the ${period}`}>
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-700"><Timer className="h-5 w-5" /></span>
              <div>
                <p className="font-display text-2xl font-semibold text-brand-950">{medianText}</p>
                <p className="text-xs text-slate-600">Median time to first staff action{stats.response.measured ? ` (${stats.response.measured} reports)` : ""}</p>
              </div>
            </div>
            <Meter value={stats.response.inRange ? (stats.response.resolved / stats.response.inRange) * 100 : 0} label={`Resolved (${stats.response.resolved} of ${stats.response.inRange})`} />
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-700">Open cases per staff member</p>
              <BarList items={stats.workload.map((w) => ({ label: w.label, count: w.count, note: w.urgent ? `${w.urgent} at risk` : undefined }))} empty="No open cases." />
            </div>
          </div>
        </Panel>
      </div>

      {/* Breakdowns */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Panel title="Reports by type" subtitle={period}>
          <BarList items={stats.byType} format={typeLabel} />
        </Panel>
        <Panel title="Top districts" subtitle={`${period} · where people said it happened`}>
          <BarList items={stats.byDistrict} empty="No districts given in this period." />
        </Panel>
        <Panel title="Recent activity" subtitle="Latest submissions">
          {stats.recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Nothing yet.</p>
          ) : (
            <ul className="-my-1 divide-y divide-slate-100">
              {stats.recent.map((r, i) => {
                const Icon = recentIcon[r.kind];
                return (
                  <li key={i} className="flex items-center gap-3 py-2.5">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${r.urgent ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"}`}><Icon className="h-4 w-4" /></span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-sm font-medium ${r.kind === "report" ? "font-mono" : ""}`}>{r.title}{r.urgent && <span className="ml-2 font-sans text-xs font-semibold text-red-600">at risk</span>}</span>
                      <span className="block truncate text-xs capitalize text-slate-500">{r.kind === "report" ? typeLabel(r.detail) : r.kind === "callback" ? topicLabel(r.detail) : r.detail}</span>
                    </span>
                    <span className="shrink-0 text-xs text-slate-400">{ago(r.at)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
        {requests && (
          <>
            <Panel title="Call-back topics" subtitle={period}>
              <BarList items={stats.callbacksByTopic} format={topicLabel} />
            </Panel>
            <Panel title="Volunteer skills" subtitle="All applicants">
              <BarList items={stats.volunteersBySkill} />
            </Panel>
          </>
        )}
      </div>
    </>
  );
};

export default Overview;
