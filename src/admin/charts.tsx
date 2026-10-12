import React, { useMemo, useRef, useState } from "react";

/* Chart colours. Primary series = brand plum (validated against white).
   Status colours are reserved for status meaning and always ship with icon + label. */
export const SERIES = "#8a3f84";
export const CONTEXT = "#94a3b8";
export const STATUS_COLORS: Record<string, string> = {
  pending: "#d97706",
  investigating: "#0284c7",
  resolved: "#059669",
  dismissed: "#475569",
};
// Sequential plum ramp (light → dark) for the heatmap; zero gets the empty-cell tint.
const RAMP = ["#ead2e8", "#d9acd5", "#c07dba", "#a5569e", "#8a3f84", "#72336d", "#4f284c"];
const EMPTY = "#f1f5f9";

const fmtDay = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export const Tooltip: React.FC<{ x: number; y: number; children: React.ReactNode }> = ({ x, y, children }) => (
  <div
    className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-xl"
    style={{ left: x, top: y - 10 }}
  >
    {children}
  </div>
);

/** Tiny trend line for stat tiles. Decorative; the tile's number carries the value. */
export const Sparkline: React.FC<{ values: number[]; color?: string }> = ({ values, color = SERIES }) => {
  const w = 120;
  const h = 32;
  const max = Math.max(1, ...values);
  const pts = values.map((v, i) => [(i / Math.max(1, values.length - 1)) * w, h - 2 - (v / max) * (h - 4)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" preserveAspectRatio="none" aria-hidden>
      <path d={`${line}L${w},${h}L0,${h}Z`} fill={color} opacity={0.12} />
      <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

/** Single-series area chart with the previous period as a dashed grey context line and a crosshair tooltip. */
export const TrendChart: React.FC<{
  data: { date: string; count: number }[];
  previous?: { date: string; count: number }[];
  label: string;
}> = ({ data, previous, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const W = 640;
  const H = 220;
  const pad = { l: 32, r: 12, t: 12, b: 26 };
  const max = Math.max(4, ...data.map((d) => d.count), ...(previous ?? []).map((d) => d.count));
  const niceMax = Math.ceil(max / 4) * 4;
  const x = (i: number) => pad.l + (i / Math.max(1, data.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / niceMax) * (H - pad.t - pad.b);
  const path = (s: { count: number }[]) => s.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.count).toFixed(1)}`).join("");
  const ticks = [0, niceMax / 4, niceMax / 2, (3 * niceMax) / 4, niceMax];
  const labelEvery = Math.ceil(data.length / 7);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };

  const hx = hover !== null ? (x(hover) / W) * (ref.current?.clientWidth ?? W) : 0;
  const hy = hover !== null ? (y(data[hover].count) / H) * (ref.current?.clientHeight ?? H) : 0;

  return (
    <div ref={ref} className="relative" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-56 w-full" role="img" aria-label={label}>
        <defs>
          <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={SERIES} stopOpacity={0.28} />
            <stop offset="100%" stopColor={SERIES} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#cbd5e1" : "#f1f5f9"} strokeWidth={1} />
            <text x={pad.l - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" className="fill-slate-400 text-[10px]">{t}</text>
          </g>
        ))}
        {data.map((d, i) =>
          i % labelEvery === 0 || i === data.length - 1 ? (
            <text key={d.date} x={x(i)} y={H - 6} textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"} className="fill-slate-400 text-[10px]">
              {fmtDay(d.date)}
            </text>
          ) : null,
        )}
        {previous && <path d={path(previous)} fill="none" stroke={CONTEXT} strokeWidth={1.5} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />}
        <path d={`${path(data)}L${x(data.length - 1)},${y(0)}L${x(0)},${y(0)}Z`} fill="url(#trendFill)" />
        <path d={path(data)} fill="none" stroke={SERIES} strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {hover !== null && (
          <>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={y(0)} stroke="#94a3b8" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <circle cx={x(hover)} cy={y(data[hover].count)} r={5} fill={SERIES} stroke="#fff" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
      {hover !== null && (
        <Tooltip x={hx} y={hy}>
          <span className="block text-slate-300">{fmtDay(data[hover].date)}</span>
          <span className="flex items-center gap-1.5 font-semibold"><span className="h-2 w-2 rounded-full" style={{ background: SERIES }} /> {data[hover].count} this period</span>
          {previous && <span className="flex items-center gap-1.5 text-slate-300"><span className="h-0.5 w-2" style={{ background: CONTEXT }} /> {previous[hover]?.count ?? 0} previous period</span>}
        </Tooltip>
      )}
    </div>
  );
};

/** Part-to-whole for the four report statuses (≤ 6 segments), with a 2px surface gap between arcs. */
export const Donut: React.FC<{ segments: { key: string; label: string; value: number; color: string }[]; centerLabel: string }> = ({ segments, centerLabel }) => {
  const [hover, setHover] = useState<string | null>(null);
  const total = segments.reduce((n, s) => n + s.value, 0);
  const R = 70;
  const r = 48;
  const C = 2 * Math.PI * ((R + r) / 2);
  let offset = 0;
  const active = segments.find((s) => s.key === hover);

  return (
    <div className="relative mx-auto h-48 w-48">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" role="img" aria-label={`${centerLabel}: ${segments.map((s) => `${s.label} ${s.value}`).join(", ")}`}>
        <circle cx={80} cy={80} r={(R + r) / 2} fill="none" stroke={EMPTY} strokeWidth={R - r} />
        {total > 0 &&
          segments.map((s) => {
            const len = (s.value / total) * C;
            const gap = s.value && s.value !== total ? 2 : 0;
            const el = (
              <circle
                key={s.key}
                cx={80}
                cy={80}
                r={(R + r) / 2}
                fill="none"
                stroke={s.color}
                strokeWidth={hover === s.key ? R - r + 6 : R - r}
                strokeDasharray={`${Math.max(0, len - gap)} ${C}`}
                strokeDashoffset={-offset}
                className="cursor-pointer transition-all"
                opacity={hover && hover !== s.key ? 0.35 : 1}
                onMouseEnter={() => setHover(s.key)}
                onMouseLeave={() => setHover(null)}
              />
            );
            offset += len;
            return el;
          })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-3xl font-semibold tabular-nums text-brand-950">{active ? active.value : total}</span>
        <span className="text-xs text-slate-500">{active ? `${active.label} · ${total ? Math.round((active.value / total) * 100) : 0}%` : centerLabel}</span>
      </div>
    </div>
  );
};

/** Ranked horizontal bars: one hue, value labels in text ink, hover shows share. */
export const BarList: React.FC<{ items: { label: string; count: number; note?: string }[]; empty?: string; color?: string; format?: (l: string) => string }> = ({
  items,
  empty = "No data for this period.",
  color = SERIES,
  format = (l) => l,
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...items.map((i) => i.count));
  const total = items.reduce((n, i) => n + i.count, 0);
  if (!items.length) return <p className="py-8 text-center text-sm text-slate-400">{empty}</p>;
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={it.label} className="relative" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate capitalize text-slate-700">{format(it.label)}</span>
            <span className="shrink-0 tabular-nums font-semibold text-slate-900">
              {it.count}
              {it.note && <span className="ml-1.5 text-xs font-medium text-red-600">{it.note}</span>}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-full rounded-full transition-all" style={{ width: `${(it.count / max) * 100}%`, background: color, opacity: hover !== null && hover !== i ? 0.4 : 1 }} />
          </div>
          {hover === i && (
            <span className="pointer-events-none absolute -top-7 right-0 z-10 rounded-md bg-slate-900 px-2 py-1 text-[11px] text-white">
              {Math.round((it.count / total) * 100)}% of total
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Day × hour heatmap on a single-hue sequential ramp. */
export const Heatmap: React.FC<{ cells: { day: number; hour: number; count: number }[] }> = ({ cells }) => {
  const [hover, setHover] = useState<{ d: number; h: number } | null>(null);
  const grid = useMemo(() => {
    const g = Array.from({ length: 7 }, () => Array(24).fill(0) as number[]);
    cells.forEach((c) => (g[c.day][c.hour] = c.count));
    return g;
  }, [cells]);
  const max = Math.max(1, ...cells.map((c) => c.count));
  const shade = (v: number) => (v === 0 ? EMPTY : RAMP[Math.min(RAMP.length - 1, Math.floor((v / max) * (RAMP.length - 1)))]);
  const hourLabel = (h: number) => (h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`);

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          {grid.map((row, d) => (
            <div key={d} className="flex items-center gap-[2px] py-[1px]">
              <span className="w-9 shrink-0 text-[11px] text-slate-500">{DAYS[d]}</span>
              {row.map((v, h) => (
                <div
                  key={h}
                  className="relative h-6 flex-1 rounded-[4px] transition-transform hover:scale-110"
                  style={{ background: shade(v) }}
                  onMouseEnter={() => setHover({ d, h })}
                  onMouseLeave={() => setHover(null)}
                >
                  {hover?.d === d && hover.h === h && (
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] text-white">
                      {DAYS[d]} {hourLabel(h)}–{hourLabel((h + 1) % 24)}: <strong>{v}</strong>
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className="flex gap-[2px] pt-1">
            <span className="w-9 shrink-0" />
            {Array.from({ length: 24 }, (_, h) => (
              <span key={h} className="flex-1 text-center text-[10px] text-slate-400">{h % 3 === 0 ? hourLabel(h) : ""}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 text-[11px] text-slate-500">
        Fewer
        <span className="h-3 w-3 rounded-sm" style={{ background: EMPTY }} />
        {RAMP.map((c) => <span key={c} className="h-3 w-3 rounded-sm" style={{ background: c }} />)}
        More
      </div>
    </div>
  );
};

/** A single ratio against 100%. */
export const Meter: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div>
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="font-display text-2xl font-semibold tabular-nums text-brand-950">{Math.round(value)}%</span>
    </div>
    <div className="mt-2 h-2.5 rounded-full bg-brand-100" role="meter" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="h-full rounded-full" style={{ width: `${Math.min(100, value)}%`, background: SERIES }} />
    </div>
  </div>
);
