import React, { useState } from 'react';
import { PhoneCall, CheckCircle2, Phone, Lock } from 'lucide-react';
import { Language, Navigate } from '@/types';
import { pick } from '@/data/i18n';
import { topics } from '@/data/topics';
import { callbackService, apiError } from '@/services/supportService';
import PageHeader from '@/components/support/PageHeader';
import { Field, Input, Textarea, Chips, Switch, ErrorBanner, SubmitButton, FormSection } from '@/components/forms/FormKit';
import { safeTimeOptions } from './ReportForm';

const CallbackPage: React.FC<{ currentLang: Language; onNavigate: Navigate }> = ({ currentLang, onNavigate }) => {
  const lang = currentLang;
  const [alias, setAlias] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('other');
  const [safeTime, setSafeTime] = useState('anytime');
  const [language, setLanguage] = useState<'bn' | 'en'>(lang === 'en' ? 'en' : 'bn');
  const [voicemailOk, setVoicemailOk] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^\+?[0-9\s-]{6,20}$/.test(phone.trim())) {
      return setError(pick(lang, { en: 'Please enter a valid phone number.', bn: 'সঠিক ফোন নম্বর দিন।' }));
    }
    setLoading(true);
    try {
      await callbackService.request({ alias: alias.trim() || undefined, phone: phone.trim(), topic, safeTime, language, voicemailOk, message: message.trim() || undefined });
      setDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(apiError(err, pick(lang, { en: 'Could not send your request. Please try again.', bn: 'অনুরোধ পাঠানো যায়নি। আবার চেষ্টা করুন।' })));
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
          {pick(lang, { en: 'We will call you', bn: 'আমরা আপনাকে কল করব' })}
        </h1>
        <p className="mt-3 text-slate-600">
          {pick(lang, {
            en: 'A trained team member will call at the time you chose. If you cannot talk when we call, just hang up; we will not say who we are unless you confirm.',
            bn: 'একজন প্রশিক্ষিত সদস্য আপনার বেছে নেওয়া সময়ে কল করবেন। তখন কথা বলতে না পারলে কেটে দিন; আপনি নিশ্চিত না করা পর্যন্ত আমরা নিজেদের পরিচয় দেব না।',
          })}
        </p>
        <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-800">
          {pick(lang, { en: 'If you are in danger before we call, dial 999.', bn: 'আমাদের কলের আগে বিপদে পড়লে ৯৯৯-এ কল করুন।' })}
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
        eyebrow={pick(lang, { en: 'Confidential call back', bn: 'গোপনীয় কল-ব্যাক' })}
        title={pick(lang, { en: 'Talk to a trained listener, when it is safe for you', bn: 'আপনার জন্য নিরাপদ সময়ে একজন প্রশিক্ষিত শ্রোতার সাথে কথা বলুন' })}
        subtitle={pick(lang, {
          en: 'Leave a number and a safe time. We will call you back for free. You do not need to give your real name.',
          bn: 'একটি নম্বর ও নিরাপদ সময় দিন। আমরা বিনামূল্যে কল করব। আসল নাম দেওয়ার প্রয়োজন নেই।',
        })}
        gradient="from-teal-50 via-cream to-cream"
      />

      <form onSubmit={handleSubmit} noValidate className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-6 lg:col-span-8">
          <FormSection title={pick(lang, { en: 'How can we reach you?', bn: 'কীভাবে যোগাযোগ করব?' })}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={pick(lang, { en: 'What should we call you?', bn: 'আপনাকে কী নামে ডাকব?' })} htmlFor="alias" optional={pick(lang, { en: 'Optional', bn: 'ঐচ্ছিক' })}>
                <Input id="alias" value={alias} onChange={(e) => setAlias(e.target.value)} maxLength={60} placeholder={pick(lang, { en: 'Any name is fine', bn: 'যেকোনো নাম দিতে পারেন' })} autoComplete="off" />
              </Field>
              <Field label={pick(lang, { en: 'Safe phone number', bn: 'নিরাপদ ফোন নম্বর' })} htmlFor="cb-phone">
                <Input id="cb-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} placeholder="01XXXXXXXXX" autoComplete="off" required />
              </Field>
            </div>
            <Field label={pick(lang, { en: 'When is it safe to call?', bn: 'কখন কল করা নিরাপদ?' })}>
              <Chips options={safeTimeOptions.map((o) => ({ value: o.value, label: pick(lang, o.label) }))} value={safeTime} onChange={setSafeTime} />
            </Field>
            <Field label={pick(lang, { en: 'Language', bn: 'ভাষা' })}>
              <Chips options={[{ value: 'bn', label: 'বাংলা' }, { value: 'en', label: 'English' }]} value={language} onChange={setLanguage} />
            </Field>
            <Switch
              checked={voicemailOk}
              onChange={setVoicemailOk}
              label={pick(lang, { en: 'It is OK to leave a message', bn: 'মেসেজ রেখে যাওয়া যাবে' })}
              description={pick(lang, { en: 'If off, we will only try again later and never leave a voicemail.', bn: 'বন্ধ থাকলে আমরা শুধু পরে আবার চেষ্টা করব, কোনো ভয়েস মেসেজ রাখব না।' })}
            />
          </FormSection>

          <FormSection title={pick(lang, { en: 'What would you like to talk about?', bn: 'কী বিষয়ে কথা বলতে চান?' })} description={pick(lang, { en: 'Optional. It helps us find the right person.', bn: 'ঐচ্ছিক। সঠিক মানুষ খুঁজে পেতে সাহায্য করে।' })}>
            <Chips
              options={[...topics.map((t) => ({ value: t.id as string, label: pick(lang, t.title) })), { value: 'other', label: pick(lang, { en: 'Something else', bn: 'অন্য কিছু' }) }]}
              value={topic}
              onChange={setTopic}
            />
            <Field label={pick(lang, { en: 'Anything you want us to know first', bn: 'আগে থেকে যা জানাতে চান' })} htmlFor="cb-message" optional={pick(lang, { en: 'Optional', bn: 'ঐচ্ছিক' })}>
              <Textarea id="cb-message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} />
            </Field>
          </FormSection>

          <ErrorBanner message={error} />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <Lock className="h-4 w-4" /> {pick(lang, { en: 'Your number is encrypted', bn: 'আপনার নম্বর এনক্রিপ্ট করা থাকে' })}
            </p>
            <SubmitButton loading={loading} label={pick(lang, { en: 'Request a call back', bn: 'কল-ব্যাক চান' })} loadingLabel={pick(lang, { en: 'Sending...', bn: 'পাঠানো হচ্ছে...' })} />
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-4 lg:sticky lg:top-36">
            <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-600 p-6 text-white">
              <PhoneCall className="h-7 w-7" />
              <h3 className="mt-4 font-semibold">{pick(lang, { en: 'Need to talk right now?', bn: 'এখনই কথা বলা দরকার?' })}</h3>
              <p className="mt-2 text-sm text-teal-50">{pick(lang, { en: 'These lines answer immediately.', bn: 'এই লাইনগুলো সাথে সাথে উত্তর দেয়।' })}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="tel:999" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-red-700">
                  <Phone className="h-4 w-4" /> {lang === 'bn' ? '৯৯৯' : '999'}
                </a>
                <a href="tel:109" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold hover:bg-white/25">
                  <Phone className="h-4 w-4" /> {lang === 'bn' ? '১০৯' : '109'}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </>
  );
};

export default CallbackPage;
