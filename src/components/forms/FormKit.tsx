import React from 'react';
import { Loader2, AlertCircle, Check } from 'lucide-react';

const control =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-shadow focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100';

export const Field: React.FC<{
  label: string;
  htmlFor?: string;
  hint?: string;
  optional?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ label, htmlFor, hint, optional, className = '', children }) => (
  <div className={className}>
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-semibold text-slate-800">
      {label}
      {optional && <span className="text-xs font-normal text-slate-400">{optional}</span>}
    </label>
    {children}
    {hint && <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{hint}</p>}
  </div>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => <input ref={ref} className={`${control} ${className}`} {...props} />,
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea className={`${control} min-h-[130px] resize-y leading-relaxed ${className}`} {...props} />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
  <select className={`${control} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2394a3b8%22><path d=%22M5.5 7.5 10 12l4.5-4.5%22 stroke=%22%2394a3b8%22 stroke-width=%221.6%22 fill=%22none%22/></svg>')] bg-[length:20px] bg-[right_14px_center] bg-no-repeat pr-11 ${className}`} {...props}>
    {children}
  </select>
);

/** Pill choices; single- or multi-select. */
export function Chips<T extends string>({
  options,
  value,
  onChange,
  multiple = false,
}: {
  options: { value: T; label: string }[];
  value: T | T[];
  onChange: (v: any) => void;
  multiple?: boolean;
}) {
  const selected = (v: T) => (multiple ? (value as T[]).includes(v) : value === v);
  const toggle = (v: T) => {
    if (!multiple) return onChange(v);
    const current = value as T[];
    onChange(current.includes(v) ? current.filter((x) => x !== v) : [...current, v]);
  };

  return (
    <div className="flex flex-wrap gap-2" role={multiple ? 'group' : 'radiogroup'}>
      {options.map((o) => {
        const on = selected(o.value);
        return (
          <button
            key={o.value}
            type="button"
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={on}
            onClick={() => toggle(o.value)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              on ? 'border-brand-700 bg-brand-800 text-white shadow-md shadow-brand-900/15' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300'
            }`}
          >
            {on && multiple && <Check className="h-3.5 w-3.5" />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export const Switch: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string; description?: string }> = ({
  checked,
  onChange,
  label,
  description,
}) => (
  <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-200">
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-brand-700' : 'bg-slate-300'}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
    <span>
      <span className="block text-sm font-semibold text-slate-900">{label}</span>
      {description && <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{description}</span>}
    </span>
  </label>
);

export const ErrorBanner: React.FC<{ message: string }> = ({ message }) =>
  message ? (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </div>
  ) : null;

export const SubmitButton: React.FC<{ loading: boolean; label: string; loadingLabel: string; tone?: 'brand' | 'alert' }> = ({
  loading,
  label,
  loadingLabel,
  tone = 'brand',
}) => (
  <button
    type="submit"
    disabled={loading}
    className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 ${
      tone === 'alert' ? 'bg-red-600 shadow-red-900/20 hover:bg-red-700' : 'bg-brand-900 shadow-brand-950/20 hover:bg-brand-950'
    }`}
  >
    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    {loading ? loadingLabel : label}
  </button>
);

export const FormSection: React.FC<{ step?: string; title: string; description?: string; children: React.ReactNode }> = ({
  step,
  title,
  description,
  children,
}) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
    <div className="mb-6 flex items-start gap-4">
      {step && (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 font-display text-lg font-semibold text-brand-800">
          {step}
        </span>
      )}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
    </div>
    <div className="space-y-5">{children}</div>
  </section>
);
