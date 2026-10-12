import React, { useState } from 'react';
import { PhoneCall, ArrowRight } from 'lucide-react';
import { Language, Navigate } from '@/types';
import { pick, ui } from '@/data/i18n';
import { helplines, helplineCategories, HelplineCategory } from '@/data/helplines';
import PageHeader from '@/components/support/PageHeader';
import HelplineCard from '@/components/support/HelplineCard';

const HelplinesPage: React.FC<{ currentLang: Language; onNavigate: Navigate }> = ({ currentLang, onNavigate }) => {
  const lang = currentLang;
  const [filter, setFilter] = useState<HelplineCategory | 'all'>('all');
  const all = Object.values(helplines);
  const shown = filter === 'all' ? all : all.filter((h) => h.category === filter);

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'bg-brand-800 text-white' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
    }`;

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, ui.nav.helplines)}
        title={pick(lang, { en: 'Talk to someone today', bn: 'আজই কারো সাথে কথা বলুন' })}
        subtitle={pick(lang, {
          en: 'Bangladesh helplines for emergencies, violence, mental health and legal aid. You do not need to give your name.',
          bn: 'জরুরি অবস্থা, সহিংসতা, মানসিক স্বাস্থ্য ও আইনি সহায়তার জন্য বাংলাদেশের হেল্পলাইন। নাম বলার প্রয়োজন নেই।',
        })}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          <button onClick={() => setFilter('all')} className={chip(filter === 'all')}>
            {pick(lang, { en: 'All', bn: 'সব' })}
          </button>
          {helplineCategories.map((c) => (
            <button key={c.id} onClick={() => setFilter(c.id)} className={chip(filter === c.id)}>
              {pick(lang, c.label)}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('callback')}
          className="group mb-8 flex w-full flex-col gap-4 rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-left text-white shadow-lg sm:flex-row sm:items-center sm:p-8"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15">
            <PhoneCall className="h-7 w-7" />
          </span>
          <span className="flex-1">
            <span className="block text-xl font-semibold">{pick(lang, { en: 'Cannot call right now? We will call you.', bn: 'এখন কল করতে পারছেন না? আমরা আপনাকে কল করব।' })}</span>
            <span className="mt-1 block text-teal-50">{pick(lang, { en: 'Leave a safe number and time. Free and confidential.', bn: 'একটি নিরাপদ নম্বর ও সময় দিন। বিনামূল্যে ও গোপনীয়।' })}</span>
          </span>
          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
        </button>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((h) => (
            <HelplineCard key={h.id} helpline={h} lang={lang} />
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm text-slate-500">
          {pick(lang, {
            en: 'Outside Bangladesh? Contact your local emergency number. Numbers and hours can change; if a line does not answer, try 999 or 109.',
            bn: 'বাংলাদেশের বাইরে? স্থানীয় জরুরি নম্বরে যোগাযোগ করুন। নম্বর ও সময়সূচি বদলাতে পারে; কোনো লাইনে উত্তর না পেলে ৯৯৯ বা ১০৯-এ চেষ্টা করুন।',
          })}
        </p>
      </section>
    </>
  );
};

export default HelplinesPage;
