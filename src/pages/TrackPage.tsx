import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, Loader, XCircle } from 'lucide-react';
import { Language, Navigate, ReportType } from '@/types';
import { L, pick } from '@/data/i18n';
import { complaintService } from '@/services/complaintService';
import { apiError } from '@/services/supportService';
import PageHeader from '@/components/support/PageHeader';
import { Input, ErrorBanner, SubmitButton } from '@/components/forms/FormKit';
import { reportTypeLabels } from './ReportForm';

interface TrackResult {
  trackingId: string;
  type: ReportType;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  statusHistory: { status: string; at: string }[];
  createdAt: string;
}

const statusInfo: Record<TrackResult['status'], { label: L; desc: L; icon: React.ElementType; tone: string }> = {
  pending: {
    label: { en: 'Received', bn: 'গ্রহণ করা হয়েছে' },
    desc: { en: 'Your report is waiting for a team member to review it.', bn: 'একজন সদস্য আপনার অভিযোগ দেখার অপেক্ষায় আছে।' },
    icon: Clock,
    tone: 'bg-amber-100 text-amber-800',
  },
  investigating: {
    label: { en: 'Being reviewed', bn: 'পর্যালোচনা চলছে' },
    desc: { en: 'A team member is working on your report.', bn: 'একজন সদস্য আপনার অভিযোগ নিয়ে কাজ করছেন।' },
    icon: Loader,
    tone: 'bg-sky-100 text-sky-800',
  },
  resolved: {
    label: { en: 'Resolved', bn: 'সমাধান হয়েছে' },
    desc: { en: 'Action has been taken on your report.', bn: 'আপনার অভিযোগের ভিত্তিতে ব্যবস্থা নেওয়া হয়েছে।' },
    icon: CheckCircle2,
    tone: 'bg-emerald-100 text-emerald-800',
  },
  dismissed: {
    label: { en: 'Closed', bn: 'বন্ধ করা হয়েছে' },
    desc: { en: 'This report was closed. You can submit a new one or call 109 for help.', bn: 'এই অভিযোগটি বন্ধ করা হয়েছে। নতুন অভিযোগ করতে পারেন বা সাহায্যের জন্য ১০৯-এ কল করুন।' },
    icon: XCircle,
    tone: 'bg-slate-200 text-slate-700',
  },
};

const TrackPage: React.FC<{ currentLang: Language; onNavigate: Navigate }> = ({ currentLang, onNavigate }) => {
  const lang = currentLang;
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<TrackResult | null>(null);

  const fmt = (d: string) => new Date(d).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = id.trim().toUpperCase();
    setError('');
    setResult(null);
    if (!/^NP-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(clean)) {
      return setError(pick(lang, { en: 'Tracking IDs look like NP-XXXX-XXXX.', bn: 'ট্র্যাকিং আইডি দেখতে এমন: NP-XXXX-XXXX' }));
    }
    setLoading(true);
    try {
      setResult((await complaintService.track(clean)).data);
    } catch (err) {
      setError(apiError(err, pick(lang, { en: 'Could not find this report.', bn: 'এই অভিযোগটি পাওয়া যায়নি।' })));
    } finally {
      setLoading(false);
    }
  };

  const info = result ? statusInfo[result.status] : null;

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, { en: 'Track a report', bn: 'অভিযোগের অবস্থা' })}
        title={pick(lang, { en: 'Check the status of your report', bn: 'আপনার অভিযোগের অবস্থা জানুন' })}
        subtitle={pick(lang, {
          en: 'Enter the tracking ID you received. Only the status is shown here, never your personal details.',
          bn: 'আপনার পাওয়া ট্র্যাকিং আইডি দিন। এখানে শুধু অবস্থা দেখানো হয়, আপনার ব্যক্তিগত তথ্য কখনো নয়।',
        })}
      >
        <form onSubmit={handleSubmit} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="NP-XXXX-XXXX"
              className="pl-12 font-mono uppercase tracking-wider"
              aria-label={pick(lang, { en: 'Tracking ID', bn: 'ট্র্যাকিং আইডি' })}
              autoComplete="off"
            />
          </div>
          <SubmitButton loading={loading} label={pick(lang, { en: 'Check', bn: 'দেখুন' })} loadingLabel={pick(lang, { en: 'Checking...', bn: 'দেখা হচ্ছে...' })} />
        </form>
      </PageHeader>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <ErrorBanner message={error} />
        {result && info && (
          <div className="animate-fade-up rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-sm text-slate-500">{result.trackingId}</p>
                <p className="mt-1 font-semibold text-slate-900">{pick(lang, reportTypeLabels[result.type] ?? { en: result.type, bn: result.type })}</p>
              </div>
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${info.tone}`}>
                <info.icon className="h-4 w-4" /> {pick(lang, info.label)}
              </span>
            </div>
            <p className="mt-5 text-slate-700">{pick(lang, info.desc)}</p>

            <ol className="mt-8 space-y-0 border-l-2 border-brand-100 pl-6">
              {result.statusHistory.map((h, i) => (
                <li key={i} className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-white" />
                  <p className="font-medium text-slate-900">{pick(lang, statusInfo[h.status as TrackResult['status']]?.label ?? { en: h.status, bn: h.status })}</p>
                  <p className="text-sm text-slate-500">{fmt(h.at)}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
        {!result && !error && (
          <p className="text-center text-sm text-slate-500">
            {pick(lang, { en: 'Lost your tracking ID? ', bn: 'ট্র্যাকিং আইডি হারিয়ে ফেলেছেন? ' })}
            <button onClick={() => onNavigate('callback')} className="font-semibold text-brand-700 underline">
              {pick(lang, { en: 'Ask us to call you', bn: 'আমাদের কল করতে বলুন' })}
            </button>
          </p>
        )}
      </section>
    </>
  );
};

export default TrackPage;
