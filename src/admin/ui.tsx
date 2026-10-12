import React, { useEffect } from "react";
import { X, Loader2, AlertCircle, Inbox, Clock, Loader, CheckCircle2, XCircle, CircleDot, PhoneCall, Ban, BadgeCheck } from "lucide-react";

export const fmtDate = (d?: string, withTime = true) =>
  d ? new Date(d).toLocaleString("en-GB", withTime ? { dateStyle: "medium", timeStyle: "short" } : { dateStyle: "medium" }) : "—";

export const ago = (d: string) => {
  const mins = Math.round((Date.now() - new Date(d).getTime()) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
};

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white ${className}`}>{children}</div>
);

export const PageTitle: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="font-display text-3xl font-semibold text-brand-950">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
    {action}
  </div>
);

type Tone = "brand" | "danger" | "ghost" | "outline";
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; loading?: boolean; icon?: React.ElementType }> = ({
  tone = "brand",
  loading,
  icon: Icon,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const tones: Record<Tone, string> = {
    brand: "bg-brand-900 text-white hover:bg-brand-950",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-slate-600 hover:bg-slate-100",
    outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  };
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${tones[tone]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
};

const control = "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";
export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...p }) => <input className={`${control} ${className}`} {...p} />;
export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = "", ...p }) => <textarea className={`${control} ${className}`} {...p} />;
export const SelectInput: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = "", children, ...p }) => (
  <select className={`${control} pr-8 ${className}`} {...p}>{children}</select>
);

export const Label: React.FC<{ text: string; children: React.ReactNode; hint?: string }> = ({ text, children, hint }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-semibold text-slate-800">{text}</span>
    {children}
    {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
  </label>
);

// Status palette: reserved meanings, always shown with an icon and a label.
const statusStyles: Record<string, { cls: string; icon: React.ElementType; label: string }> = {
  pending: { cls: "bg-amber-50 text-amber-800 ring-amber-200", icon: Clock, label: "Pending" },
  investigating: { cls: "bg-sky-50 text-sky-800 ring-sky-200", icon: Loader, label: "Investigating" },
  resolved: { cls: "bg-emerald-50 text-emerald-800 ring-emerald-200", icon: CheckCircle2, label: "Resolved" },
  dismissed: { cls: "bg-slate-100 text-slate-600 ring-slate-200", icon: XCircle, label: "Dismissed" },
  new: { cls: "bg-amber-50 text-amber-800 ring-amber-200", icon: CircleDot, label: "New" },
  contacted: { cls: "bg-sky-50 text-sky-800 ring-sky-200", icon: PhoneCall, label: "Contacted" },
  closed: { cls: "bg-slate-100 text-slate-600 ring-slate-200", icon: XCircle, label: "Closed" },
  approved: { cls: "bg-emerald-50 text-emerald-800 ring-emerald-200", icon: BadgeCheck, label: "Approved" },
  declined: { cls: "bg-slate-100 text-slate-600 ring-slate-200", icon: Ban, label: "Declined" },
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const s = statusStyles[status] ?? { cls: "bg-slate-100 text-slate-600 ring-slate-200", icon: CircleDot, label: status };
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${s.cls}`}>
      <s.icon className="h-3.5 w-3.5" /> {s.label}
    </span>
  );
};

export const statusLabel = (s: string) => statusStyles[s]?.label ?? s;

export const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; width?: string }> = ({ title, onClose, children, width = "max-w-lg" }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-brand-950/40 p-4 backdrop-blur-sm sm:items-center" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
        className={`animate-fade-up max-h-[90vh] w-full overflow-y-auto rounded-3xl bg-white shadow-2xl ${width}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export const ConfirmDialog: React.FC<{
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => Promise<void> | void;
  onClose: () => void;
}> = ({ title, message, confirmLabel, onConfirm, onClose }) => {
  const [busy, setBusy] = React.useState(false);
  return (
    <Modal title={title} onClose={onClose} width="max-w-md">
      <p className="text-sm leading-relaxed text-slate-600">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Button tone="outline" onClick={onClose}>Cancel</Button>
        <Button
          tone="danger"
          loading={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await onConfirm();
              onClose();
            } finally {
              setBusy(false);
            }
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};

export const ErrorNote: React.FC<{ message: string }> = ({ message }) =>
  message ? (
    <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {message}
    </div>
  ) : null;

export const Loading: React.FC<{ label?: string }> = ({ label = "Loading..." }) => (
  <div className="flex h-48 items-center justify-center gap-2 text-sm text-slate-500">
    <Loader2 className="h-5 w-5 animate-spin" /> {label}
  </div>
);

export const Empty: React.FC<{ title: string; hint?: string }> = ({ title, hint }) => (
  <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center">
    <Inbox className="h-8 w-8 text-slate-300" />
    <p className="mt-3 font-semibold text-slate-700">{title}</p>
    {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
  </div>
);

/** Segmented filter pills. */
export function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; count?: number }[] }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${value === o.value ? "bg-white text-brand-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
        >
          {o.label}
          {o.count !== undefined && <span className="ml-1.5 text-xs text-slate-400">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}
