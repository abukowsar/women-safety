import React from 'react';
import { LogOut, Camera, Link2, CalendarClock, Trash2 } from 'lucide-react';
import { Language } from '@/types';
import { pick, ui } from '@/data/i18n';
import PageHeader from '@/components/support/PageHeader';
import BreathingExercise from '@/components/support/BreathingExercise';
import Grounding from '@/components/support/Grounding';
import SafetyPlan from '@/components/support/SafetyPlan';
import { quickExit } from '@/components/CrisisBar';

const ToolsPage: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const lang = currentLang;

  const evidence = [
    { icon: Camera, text: { en: 'Screenshot messages, posts and profiles. Make sure the date and username are visible.', bn: 'মেসেজ, পোস্ট ও প্রোফাইলের স্ক্রিনশট নিন। তারিখ ও ইউজারনেম যেন দেখা যায়।' } },
    { icon: Link2, text: { en: 'Copy links (URLs) to profiles and posts before reporting or blocking.', bn: 'রিপোর্ট বা ব্লক করার আগে প্রোফাইল ও পোস্টের লিংক (URL) কপি করুন।' } },
    { icon: CalendarClock, text: { en: 'Keep a simple diary: date, time, what happened, who saw it.', bn: 'একটি সহজ ডায়েরি রাখুন: তারিখ, সময়, কী ঘটেছে, কে দেখেছে।' } },
    { icon: Trash2, text: { en: 'Do not delete anything, even if it hurts to see. Store copies somewhere safe.', bn: 'দেখতে কষ্ট হলেও কিছু মুছবেন না। কপি নিরাপদ কোথাও রাখুন।' } },
  ];

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, ui.nav.tools)}
        title={pick(lang, { en: 'Tools to steady yourself and stay safer', bn: 'নিজেকে সামলাতে ও নিরাপদ থাকতে টুল' })}
        subtitle={pick(lang, {
          en: 'Everything here works on your device only. Nothing is saved or sent.',
          bn: 'এখানকার সবকিছু শুধু আপনার ডিভাইসে কাজ করে। কিছুই সংরক্ষণ বা পাঠানো হয় না।',
        })}
        gradient="from-teal-50 via-cream to-cream"
      />

      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <BreathingExercise lang={lang} />
          <Grounding lang={lang} />
        </div>

        <SafetyPlan lang={lang} />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-3">
            <h3 className="font-semibold text-slate-900">
              {pick(lang, { en: 'Saving evidence safely', bn: 'নিরাপদে প্রমাণ সংরক্ষণ' })}
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {evidence.map((e, i) => {
                const Icon = e.icon;
                return (
                  <li key={i} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {pick(lang, e.text)}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-slate-900 p-6 text-white sm:p-8 lg:col-span-2">
            <div>
              <h3 className="font-semibold">{pick(lang, { en: 'Browsing safely', bn: 'নিরাপদে ব্রাউজ করুন' })}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {pick(lang, {
                  en: 'If someone checks your phone, use a private/incognito window, and clear your history afterwards. The quick exit button opens a weather search and keeps this site out of your Back button.',
                  bn: 'কেউ আপনার ফোন দেখলে প্রাইভেট/ইনকগনিটো উইন্ডো ব্যবহার করুন এবং পরে হিস্টোরি মুছে ফেলুন। দ্রুত বের হওয়ার বোতাম আবহাওয়ার খোঁজ খুলে দেয় এবং ব্যাক বোতামে এই সাইট রাখে না।',
                })}
              </p>
            </div>
            <button
              onClick={quickExit}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-200"
            >
              <LogOut className="h-4 w-4" /> {pick(lang, ui.quickExit)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolsPage;
