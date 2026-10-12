import React, { useState } from 'react';
import { CheckCircle2, HeartHandshake, Scale, Stethoscope, Laptop, Languages, Megaphone, Sparkles } from 'lucide-react';
import { Language, Navigate } from '@/types';
import { L, pick } from '@/data/i18n';
import { volunteerService, apiError } from '@/services/supportService';
import PageHeader from '@/components/support/PageHeader';
import { Field, Input, Textarea, Chips, ErrorBanner, SubmitButton, FormSection } from '@/components/forms/FormKit';

const skills: { value: string; label: L; icon: React.ElementType }[] = [
  { value: 'counselling', label: { en: 'Counselling', bn: 'কাউন্সেলিং' }, icon: HeartHandshake },
  { value: 'legal', label: { en: 'Legal', bn: 'আইনি' }, icon: Scale },
  { value: 'medical', label: { en: 'Medical', bn: 'চিকিৎসা' }, icon: Stethoscope },
  { value: 'tech', label: { en: 'Tech & digital safety', bn: 'প্রযুক্তি ও ডিজিটাল নিরাপত্তা' }, icon: Laptop },
  { value: 'translation', label: { en: 'Translation', bn: 'অনুবাদ' }, icon: Languages },
  { value: 'outreach', label: { en: 'Community outreach', bn: 'কমিউনিটি কার্যক্রম' }, icon: Megaphone },
  { value: 'other', label: { en: 'Other', bn: 'অন্যান্য' }, icon: Sparkles },
];

const availability: { value: string; label: L }[] = [
  { value: 'weekdays', label: { en: 'Weekdays', bn: 'সাপ্তাহিক কর্মদিবস' } },
  { value: 'weekends', label: { en: 'Weekends', bn: 'সাপ্তাহিক ছুটি' } },
  { value: 'evenings', label: { en: 'Evenings', bn: 'সন্ধ্যা' } },
  { value: 'flexible', label: { en: 'Flexible', bn: 'যেকোনো সময়' } },
];

const languages = [
  { value: 'bn', label: 'বাংলা' },
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'ur', label: 'اردو' },
  { value: 'ne', label: 'नेपाली' },
  { value: 'si', label: 'සිංහල' },
];

const VolunteerPage: React.FC<{ currentLang: Language; onNavigate: Navigate }> = ({ currentLang, onNavigate }) => {
  const lang = currentLang;
  const [form, setForm] = useState({ name: '', email: '', phone: '', district: '', motivation: '' });
  const [chosenSkills, setChosenSkills] = useState<string[]>([]);
  const [chosenLanguages, setChosenLanguages] = useState<string[]>(['bn']);
  const [when, setWhen] = useState('flexible');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.name.trim().length < 2) return setError(pick(lang, { en: 'Please enter your name.', bn: 'আপনার নাম লিখুন।' }));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) return setError(pick(lang, { en: 'Please enter a valid email.', bn: 'সঠিক ইমেইল দিন।' }));
    if (!chosenSkills.length) return setError(pick(lang, { en: 'Choose at least one way you can help.', bn: 'কীভাবে সাহায্য করতে পারেন, অন্তত একটি বেছে নিন।' }));
    if (!consent) return setError(pick(lang, { en: 'Please accept the confidentiality pledge.', bn: 'গোপনীয়তার অঙ্গীকারে সম্মতি দিন।' }));

    setLoading(true);
    try {
      await volunteerService.apply({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        district: form.district.trim() || undefined,
        motivation: form.motivation.trim() || undefined,
        skills: chosenSkills,
        languages: chosenLanguages,
        availability: when,
        consent,
      });
      setDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(apiError(err, pick(lang, { en: 'Could not send your application. Please try again.', bn: 'আবেদন পাঠানো যায়নি। আবার চেষ্টা করুন।' })));
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold text-brand-950">
          {pick(lang, { en: 'Thank you for stepping up', bn: 'এগিয়ে আসার জন্য ধন্যবাদ' })}
        </h1>
        <p className="mt-3 text-slate-600">
          {pick(lang, {
            en: 'We have received your application and will email you about training and next steps.',
            bn: 'আপনার আবেদন পেয়েছি। প্রশিক্ষণ ও পরবর্তী ধাপ সম্পর্কে ইমেইলে জানাব।',
          })}
        </p>
        <button onClick={() => onNavigate('home')} className="mt-8 rounded-full bg-brand-900 px-6 py-3 font-semibold text-white hover:bg-brand-950">
          {pick(lang, { en: 'Back to home', bn: 'হোমে ফিরুন' })}
        </button>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, { en: 'Volunteer', bn: 'স্বেচ্ছাসেবী' })}
        title={pick(lang, { en: 'Lend your skills to keep women safe', bn: 'নারীদের নিরাপদ রাখতে আপনার দক্ষতা দিন' })}
        subtitle={pick(lang, {
          en: 'Counsellors, lawyers, doctors, techies, translators and organisers: there is a place for you. We provide training.',
          bn: 'কাউন্সেলর, আইনজীবী, ডাক্তার, প্রযুক্তিবিদ, অনুবাদক ও সংগঠক: সবার জন্য জায়গা আছে। আমরা প্রশিক্ষণ দিই।',
        })}
        gradient="from-rose-50 via-cream to-cream"
      />

      <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-4xl space-y-6 px-4 pb-24 sm:px-6 lg:px-8">
        <FormSection step="1" title={pick(lang, { en: 'About you', bn: 'আপনার সম্পর্কে' })}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={pick(lang, { en: 'Full name', bn: 'পূর্ণ নাম' })} htmlFor="v-name">
              <Input id="v-name" value={form.name} onChange={set('name')} maxLength={100} autoComplete="name" required />
            </Field>
            <Field label={pick(lang, { en: 'Email', bn: 'ইমেইল' })} htmlFor="v-email">
              <Input id="v-email" type="email" value={form.email} onChange={set('email')} maxLength={200} autoComplete="email" required />
            </Field>
            <Field label={pick(lang, { en: 'Phone', bn: 'ফোন' })} htmlFor="v-phone" optional={pick(lang, { en: 'Optional', bn: 'ঐচ্ছিক' })}>
              <Input id="v-phone" type="tel" value={form.phone} onChange={set('phone')} maxLength={20} autoComplete="tel" />
            </Field>
            <Field label={pick(lang, { en: 'District', bn: 'জেলা' })} htmlFor="v-district" optional={pick(lang, { en: 'Optional', bn: 'ঐচ্ছিক' })}>
              <Input id="v-district" value={form.district} onChange={set('district')} maxLength={60} />
            </Field>
          </div>
        </FormSection>

        <FormSection step="2" title={pick(lang, { en: 'How can you help?', bn: 'কীভাবে সাহায্য করতে পারেন?' })}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => {
              const on = chosenSkills.includes(s.value);
              return (
                <button
                  key={s.value}
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => setChosenSkills((cur) => (on ? cur.filter((x) => x !== s.value) : [...cur, s.value]))}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${
                    on ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-200' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300'
                  }`}
                >
                  <s.icon className={`h-5 w-5 ${on ? 'text-brand-700' : 'text-slate-400'}`} />
                  {pick(lang, s.label)}
                </button>
              );
            })}
          </div>
          <Field label={pick(lang, { en: 'Languages you speak', bn: 'যে ভাষায় কথা বলেন' })}>
            <Chips options={languages} value={chosenLanguages} onChange={setChosenLanguages} multiple />
          </Field>
          <Field label={pick(lang, { en: 'When are you available?', bn: 'কখন সময় দিতে পারবেন?' })}>
            <Chips options={availability.map((a) => ({ value: a.value, label: pick(lang, a.label) }))} value={when} onChange={setWhen} />
          </Field>
          <Field label={pick(lang, { en: 'Why do you want to volunteer?', bn: 'কেন স্বেচ্ছাসেবী হতে চান?' })} htmlFor="v-why" optional={pick(lang, { en: 'Optional', bn: 'ঐচ্ছিক' })}>
            <Textarea id="v-why" value={form.motivation} onChange={set('motivation')} maxLength={1500} />
          </Field>
        </FormSection>

        <label className="flex cursor-pointer items-start gap-3 rounded-3xl border border-slate-200 bg-white p-5">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 rounded accent-brand-700" />
          <span className="text-sm leading-relaxed text-slate-700">
            {pick(lang, {
              en: 'I pledge to keep everything I learn about survivors strictly confidential, and to treat everyone with respect and without judgement.',
              bn: 'আমি অঙ্গীকার করছি যে ভুক্তভোগীদের সম্পর্কে জানা সবকিছু কঠোরভাবে গোপন রাখব এবং সবার সাথে সম্মান ও বিচারহীনভাবে আচরণ করব।',
            })}
          </span>
        </label>

        <ErrorBanner message={error} />
        <div className="flex justify-end">
          <SubmitButton loading={loading} label={pick(lang, { en: 'Send application', bn: 'আবেদন পাঠান' })} loadingLabel={pick(lang, { en: 'Sending...', bn: 'পাঠানো হচ্ছে...' })} />
        </div>
      </form>
    </>
  );
};

export default VolunteerPage;
