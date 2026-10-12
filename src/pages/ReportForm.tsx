import React, { useRef, useState } from 'react';
import { Upload, X, CheckCircle2, Copy, Phone, ShieldCheck, Lock, FileText } from 'lucide-react';
import { Language, Navigate, ReportType } from '@/types';
import { L, pick } from '@/data/i18n';
import { complaintService } from '@/services/complaintService';
import { apiError } from '@/services/supportService';
import PageHeader from '@/components/support/PageHeader';
import { Field, Input, Textarea, Chips, Switch, ErrorBanner, SubmitButton, FormSection } from '@/components/forms/FormKit';

interface ReportFormProps {
  currentLang: Language;
  onNavigate: Navigate;
}

export const reportTypeLabels: Record<ReportType, L> = {
  [ReportType.SexualViolence]: { en: 'Rape / sexual violence', bn: 'ধর্ষণ / যৌন সহিংসতা' },
  [ReportType.DomesticViolence]: { en: 'Domestic violence', bn: 'পারিবারিক সহিংসতা' },
  [ReportType.DowryAbuse]: { en: 'Dowry abuse', bn: 'যৌতুকের জন্য নির্যাতন' },
  [ReportType.ChildMarriage]: { en: 'Child marriage', bn: 'বাল্যবিবাহ' },
  [ReportType.SexualHarassment]: { en: 'Sexual harassment', bn: 'যৌন হয়রানি' },
  [ReportType.Cyberstalking]: { en: 'Cyberstalking', bn: 'সাইবারস্টকিং' },
  [ReportType.Deepfake]: { en: 'Deepfake', bn: 'ডিপফেক' },
  [ReportType.ImageAbuse]: { en: 'Leaked / shared images', bn: 'ছবি ফাঁস / অপব্যবহার' },
  [ReportType.Harassment]: { en: 'Online harassment', bn: 'অনলাইন হয়রানি' },
  [ReportType.IdentityTheft]: { en: 'Fake account / identity theft', bn: 'ভুয়া অ্যাকাউন্ট / পরিচয় চুরি' },
  [ReportType.OnlineThreats]: { en: 'Threats / blackmail', bn: 'হুমকি / ব্ল্যাকমেইল' },
  [ReportType.Other]: { en: 'Something else', bn: 'অন্য কিছু' },
};

export const safeTimeOptions: { value: string; label: L }[] = [
  { value: 'morning', label: { en: 'Morning', bn: 'সকাল' } },
  { value: 'afternoon', label: { en: 'Afternoon', bn: 'দুপুর' } },
  { value: 'evening', label: { en: 'Evening', bn: 'সন্ধ্যা' } },
  { value: 'anytime', label: { en: 'Any time', bn: 'যেকোনো সময়' } },
];

const MAX_FILES = 5;
const MAX_SIZE = 25 * 1024 * 1024;
const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif,application/pdf,video/mp4,audio/mpeg,audio/mp4';

const ReportForm: React.FC<ReportFormProps> = ({ currentLang, onNavigate }) => {
  const lang = currentLang;
  const fileInput = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<ReportType | ''>('');
  const [description, setDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [district, setDistrict] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [canContact, setCanContact] = useState(false);
  const [safeTime, setSafeTime] = useState('anytime');
  const [inDanger, setInDanger] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [copied, setCopied] = useState(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const tooBig = incoming.find((f) => f.size > MAX_SIZE);
    if (tooBig) setError(pick(lang, { en: `"${tooBig.name}" is larger than 25 MB.`, bn: `"${tooBig.name}" ২৫ MB-এর চেয়ে বড়।` }));
    setFiles((prev) => [...prev, ...incoming.filter((f) => f.size <= MAX_SIZE)].slice(0, MAX_FILES));
    if (fileInput.current) fileInput.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!type) return setError(pick(lang, { en: 'Please choose what happened.', bn: 'কী ঘটেছে তা বেছে নিন।' }));
    if (description.trim().length < 10)
      return setError(pick(lang, { en: 'Please describe what happened in a few words (at least 10 characters).', bn: 'কয়েকটি শব্দে ঘটনাটি লিখুন (অন্তত ১০ অক্ষর)।' }));
    if (!isAnonymous && canContact && !phone.trim())
      return setError(pick(lang, { en: 'Add a phone number so we can contact you, or turn off contact.', bn: 'যোগাযোগের জন্য ফোন নম্বর দিন, অথবা যোগাযোগ বন্ধ রাখুন।' }));

    const data = new FormData();
    data.append('type', type);
    data.append('description', description.trim());
    if (incidentDate) data.append('incidentDate', incidentDate);
    if (district.trim()) data.append('district', district.trim());
    if (incidentLocation.trim()) data.append('incidentLocation', incidentLocation.trim());
    data.append('isAnonymous', String(isAnonymous));
    data.append('inDanger', String(inDanger));
    if (!isAnonymous) {
      if (name.trim()) data.append('victimName', name.trim());
      if (phone.trim()) data.append('victimPhone', phone.trim());
      data.append('canContact', String(canContact));
      if (canContact) data.append('safeTime', safeTime);
    }
    files.forEach((f) => data.append('evidence', f));

    setLoading(true);
    try {
      const res = await complaintService.submit(data);
      setTrackingId(res.data.trackingId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(apiError(err, pick(lang, { en: 'Could not submit your report. Please try again.', bn: 'অভিযোগ জমা দেওয়া যায়নি। আবার চেষ্টা করুন।' })));
    } finally {
      setLoading(false);
    }
  };

  if (trackingId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
        <div className="animate-fade-up rounded-[2rem] border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-900/5 sm:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-semibold text-brand-950">
            {pick(lang, { en: 'Your report is safely received', bn: 'আপনার অভিযোগ নিরাপদে পৌঁছেছে' })}
          </h1>
          <p className="mt-3 text-slate-600">
            {pick(lang, {
              en: 'Thank you for trusting us. A trained team member will review it. Speaking up takes courage.',
              bn: 'আমাদের উপর আস্থা রাখার জন্য ধন্যবাদ। একজন প্রশিক্ষিত সদস্য এটি দেখবেন। মুখ খোলা সাহসের কাজ।',
            })}
          </p>
          <div className="mt-8 rounded-3xl bg-brand-950 p-6 text-white">
            <p className="text-sm text-brand-200">{pick(lang, { en: 'Your tracking ID', bn: 'আপনার ট্র্যাকিং আইডি' })}</p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="font-mono text-3xl font-bold tracking-wider">{trackingId}</span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(trackingId);
                  setCopied(true);
                }}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                aria-label="Copy"
              >
                {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-300" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            {pick(lang, {
              en: 'Write it down somewhere safe. It is the only way to check your report, as we do not store it on this device.',
              bn: 'এটি নিরাপদ কোথাও লিখে রাখুন। অভিযোগের অবস্থা জানার এটাই একমাত্র উপায়, কারণ আমরা এই ডিভাইসে এটি সংরক্ষণ করি না।',
            })}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('track')} className="rounded-full bg-brand-900 px-6 py-3 font-semibold text-white hover:bg-brand-950">
              {pick(lang, { en: 'Check status', bn: 'অবস্থা দেখুন' })}
            </button>
            <button onClick={() => onNavigate('home')} className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">
              {pick(lang, { en: 'Back to home', bn: 'হোমে ফিরুন' })}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, { en: 'Report safely', bn: 'নিরাপদে অভিযোগ' })}
        title={pick(lang, { en: 'Tell us what happened, at your own pace', bn: 'কী ঘটেছে, নিজের মতো করে জানান' })}
        subtitle={pick(lang, {
          en: 'You can stay anonymous. Personal details are encrypted and only seen by trained staff.',
          bn: 'আপনি পরিচয় গোপন রাখতে পারেন। ব্যক্তিগত তথ্য এনক্রিপ্ট করা থাকে এবং শুধু প্রশিক্ষিত কর্মীরা দেখেন।',
        })}
      >
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a href="tel:999" className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700">
            <Phone className="h-4 w-4" /> {pick(lang, { en: 'In danger now? Call 999', bn: 'এখন বিপদে? ৯৯৯-এ কল করুন' })}
          </a>
          <button onClick={() => onNavigate('track')} className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 font-semibold text-brand-800 hover:bg-brand-50">
            <FileText className="h-4 w-4" /> {pick(lang, { en: 'Already reported? Track it', bn: 'আগে অভিযোগ করেছেন? অবস্থা দেখুন' })}
          </button>
        </div>
      </PageHeader>

      <form onSubmit={handleSubmit} noValidate className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-6 lg:col-span-8">
          <FormSection step="1" title={pick(lang, { en: 'What happened?', bn: 'কী ঘটেছে?' })}>
            <Field label={pick(lang, { en: 'Type of harm', bn: 'ক্ষতির ধরন' })}>
              <Chips
                options={Object.values(ReportType).map((t) => ({ value: t, label: pick(lang, reportTypeLabels[t]) }))}
                value={type}
                onChange={setType}
              />
            </Field>
            <Field
              label={pick(lang, { en: 'Describe what happened', bn: 'ঘটনার বিবরণ' })}
              htmlFor="description"
              hint={pick(lang, {
                en: 'Share only what you are comfortable with. Who, what, when and where helps us most.',
                bn: 'যতটুকু বলতে স্বস্তি বোধ করেন ততটুকুই লিখুন। কে, কী, কখন, কোথায় জানালে সবচেয়ে সুবিধা হয়।',
              })}
            >
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={5000} required />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={pick(lang, { en: 'When did it happen?', bn: 'কখন ঘটেছে?' })} htmlFor="date" optional={pick(lang, { en: 'Optional', bn: 'ঐচ্ছিক' })}>
                <Input id="date" type="date" value={incidentDate} max={new Date().toISOString().slice(0, 10)} onChange={(e) => setIncidentDate(e.target.value)} />
              </Field>
              <Field label={pick(lang, { en: 'District', bn: 'জেলা' })} htmlFor="district" optional={pick(lang, { en: 'Optional', bn: 'ঐচ্ছিক' })}>
                <Input id="district" value={district} onChange={(e) => setDistrict(e.target.value)} maxLength={60} placeholder={pick(lang, { en: 'e.g. Dhaka', bn: 'যেমন ঢাকা' })} />
              </Field>
            </div>
            <Field label={pick(lang, { en: 'Where did it happen?', bn: 'কোথায় ঘটেছে?' })} htmlFor="location" optional={pick(lang, { en: 'Optional', bn: 'ঐচ্ছিক' })}>
              <Input id="location" value={incidentLocation} onChange={(e) => setIncidentLocation(e.target.value)} maxLength={300} placeholder={pick(lang, { en: 'Home, workplace, a website or app...', bn: 'বাড়ি, কর্মস্থল, কোনো ওয়েবসাইট বা অ্যাপ...' })} />
            </Field>
            <Switch
              checked={inDanger}
              onChange={setInDanger}
              label={pick(lang, { en: 'I am still at risk', bn: 'আমি এখনো ঝুঁকিতে আছি' })}
              description={pick(lang, { en: 'We will review your report first. If you are in danger right now, please also call 999.', bn: 'আপনার অভিযোগ আগে দেখা হবে। এই মুহূর্তে বিপদে থাকলে ৯৯৯-এও কল করুন।' })}
            />
          </FormSection>

          <FormSection step="2" title={pick(lang, { en: 'About you', bn: 'আপনার সম্পর্কে' })} description={pick(lang, { en: 'Everything here is optional.', bn: 'এখানের সব তথ্য ঐচ্ছিক।' })}>
            <Switch
              checked={isAnonymous}
              onChange={setIsAnonymous}
              label={pick(lang, { en: 'Report anonymously', bn: 'পরিচয় গোপন রেখে অভিযোগ' })}
              description={pick(lang, { en: 'We will not ask for your name or number. Keep your tracking ID to follow up.', bn: 'আপনার নাম বা নম্বর চাওয়া হবে না। পরে খোঁজ নিতে ট্র্যাকিং আইডি রেখে দিন।' })}
            />
            {!isAnonymous && (
              <div className="animate-fade-up space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={pick(lang, { en: 'Name or nickname', bn: 'নাম বা ডাকনাম' })} htmlFor="name">
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} autoComplete="off" />
                  </Field>
                  <Field label={pick(lang, { en: 'Safe phone number', bn: 'নিরাপদ ফোন নম্বর' })} htmlFor="phone">
                    <Input id="phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} placeholder="01XXXXXXXXX" autoComplete="off" />
                  </Field>
                </div>
                <Switch
                  checked={canContact}
                  onChange={setCanContact}
                  label={pick(lang, { en: 'It is safe to contact me', bn: 'আমার সাথে যোগাযোগ করা নিরাপদ' })}
                  description={pick(lang, { en: 'Only turn this on if no one else checks this phone.', bn: 'শুধু তখনই চালু করুন যদি এই ফোন অন্য কেউ না দেখে।' })}
                />
                {canContact && (
                  <Field label={pick(lang, { en: 'Best time to call', bn: 'কল করার উপযুক্ত সময়' })}>
                    <Chips options={safeTimeOptions.map((o) => ({ value: o.value, label: pick(lang, o.label) }))} value={safeTime} onChange={setSafeTime} />
                  </Field>
                )}
              </div>
            )}
          </FormSection>

          <FormSection step="3" title={pick(lang, { en: 'Evidence', bn: 'প্রমাণ' })} description={pick(lang, { en: 'Optional. Screenshots, photos, documents, audio or video.', bn: 'ঐচ্ছিক। স্ক্রিনশট, ছবি, কাগজপত্র, অডিও বা ভিডিও।' })}>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addFiles(e.dataTransfer.files);
              }}
              disabled={files.length >= MAX_FILES}
              className="flex w-full flex-col items-center rounded-3xl border-2 border-dashed border-brand-200 bg-brand-50/40 px-6 py-10 text-center transition-colors hover:border-brand-400 hover:bg-brand-50 disabled:opacity-50"
            >
              <Upload className="h-8 w-8 text-brand-500" />
              <span className="mt-3 font-semibold text-brand-900">{pick(lang, { en: 'Choose files or drop them here', bn: 'ফাইল বেছে নিন বা এখানে টেনে আনুন' })}</span>
              <span className="mt-1 text-xs text-slate-500">{pick(lang, { en: 'Up to 5 files, 25 MB each · JPG, PNG, PDF, MP4, MP3', bn: 'সর্বোচ্চ ৫টি ফাইল, প্রতিটি ২৫ MB · JPG, PNG, PDF, MP4, MP3' })}</span>
            </button>
            <input ref={fileInput} type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => addFiles(e.target.files)} />
            {files.length > 0 && (
              <ul className="space-y-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="min-w-0 truncate text-slate-700">{f.name}</span>
                    <span className="flex shrink-0 items-center gap-3 text-xs text-slate-400">
                      {(f.size / 1024 / 1024).toFixed(1)} MB
                      <button type="button" onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="rounded-full p-1 text-slate-500 hover:bg-slate-200" aria-label="Remove">
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </FormSection>

          <ErrorBanner message={error} />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <Lock className="h-4 w-4" /> {pick(lang, { en: 'Encrypted and confidential', bn: 'এনক্রিপ্টেড ও গোপনীয়' })}
            </p>
            <SubmitButton loading={loading} label={pick(lang, { en: 'Submit report', bn: 'অভিযোগ জমা দিন' })} loadingLabel={pick(lang, { en: 'Sending securely...', bn: 'নিরাপদে পাঠানো হচ্ছে...' })} />
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-4 lg:sticky lg:top-36">
            <div className="rounded-3xl bg-brand-950 p-6 text-white">
              <ShieldCheck className="h-7 w-7 text-rose-300" />
              <h3 className="mt-4 font-semibold">{pick(lang, { en: 'How we protect you', bn: 'আমরা কীভাবে আপনাকে সুরক্ষিত রাখি' })}</h3>
              <ul className="mt-4 space-y-3 text-sm text-brand-100">
                {[
                  { en: 'Names, numbers and your story are encrypted before they are stored.', bn: 'নাম, নম্বর ও আপনার বিবরণ সংরক্ষণের আগেই এনক্রিপ্ট করা হয়।' },
                  { en: 'Evidence files are encrypted and visible only to logged-in staff.', bn: 'প্রমাণের ফাইল এনক্রিপ্ট করা থাকে, শুধু লগইন করা কর্মীরা দেখতে পারেন।' },
                  { en: 'We never share your report without your consent.', bn: 'আপনার সম্মতি ছাড়া আপনার অভিযোগ কখনো শেয়ার করা হয় না।' },
                ].map((t, i) => (
                  <li key={i} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {pick(lang, t)}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => onNavigate('callback')} type="button" className="w-full rounded-3xl border border-slate-200 bg-white p-6 text-left hover:border-brand-300">
              <p className="font-semibold text-slate-900">{pick(lang, { en: 'Prefer to talk?', bn: 'কথা বলতে চান?' })}</p>
              <p className="mt-1 text-sm text-slate-600">{pick(lang, { en: 'Request a confidential call back at a time that is safe for you →', bn: 'আপনার জন্য নিরাপদ সময়ে গোপনীয় কল-ব্যাক চান →' })}</p>
            </button>
          </div>
        </aside>
      </form>
    </>
  );
};

export default ReportForm;
