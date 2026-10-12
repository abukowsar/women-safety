import React from 'react';
import {
  ArrowRight,
  Wind,
  ClipboardList,
  LogOut,
  Ear,
  HeartHandshake,
  Users,
  MapPin,
} from 'lucide-react';
import { Language, Navigate } from '@/types';
import { translations } from '@/utils/translations';
import { pick, ui, L } from '@/data/i18n';
import { topics } from '@/data/topics';
import { helplines } from '@/data/helplines';
import TopicCard from '@/components/support/TopicCard';
import HomeHero from '@/components/HomeHero';
import HelplineCard from '@/components/support/HelplineCard';

interface HomeProps {
  currentLang: Language;
  onNavigate: Navigate;
}

const SectionTitle: React.FC<{ eyebrow: string; title: string; subtitle?: string; action?: React.ReactNode }> = ({
  eyebrow,
  title,
  subtitle,
  action,
}) => (
  <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-brand-950 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-slate-600">{subtitle}</p>}
    </div>
    {action}
  </div>
);

const Home: React.FC<HomeProps> = ({ currentLang, onNavigate }) => {
  const lang = currentLang;
  const t = translations[currentLang];

  const tools = [
    {
      icon: Wind,
      title: { en: 'Calm breathing', bn: 'শান্ত শ্বাস-প্রশ্বাস' },
      desc: { en: 'A guided exercise for panic and anxiety.', bn: 'আতঙ্ক ও উদ্বেগের জন্য নির্দেশিত অনুশীলন।' },
      style: 'from-teal-500 to-emerald-500',
    },
    {
      icon: ClipboardList,
      title: { en: 'Safety plan', bn: 'নিরাপত্তা পরিকল্পনা' },
      desc: { en: 'A private checklist for leaving or staying safer.', bn: 'নিরাপদে থাকা বা বের হওয়ার গোপন চেকলিস্ট।' },
      style: 'from-brand-600 to-rose-500',
    },
    {
      icon: LogOut,
      title: { en: 'Quick exit', bn: 'দ্রুত বের হওয়া' },
      desc: { en: 'One tap, or Esc twice, to leave this site instantly.', bn: 'এক ট্যাপে বা Esc দুবার চেপে সাথে সাথে সাইট ছাড়ুন।' },
      style: 'from-slate-700 to-slate-900',
    },
  ];

  const supportSteps = [
    { icon: Ear, title: { en: 'Listen', bn: 'শুনুন' }, desc: { en: 'Give her time. Do not interrupt or judge.', bn: 'সময় দিন। বাধা দেবেন না, বিচার করবেন না।' } },
    { icon: HeartHandshake, title: { en: 'Believe', bn: 'বিশ্বাস করুন' }, desc: { en: 'Say "It is not your fault. I am with you."', bn: 'বলুন "এটা তোমার দোষ নয়। আমি তোমার সাথে আছি।"' } },
    { icon: Users, title: { en: 'Connect', bn: 'যুক্ত করুন' }, desc: { en: 'Help her reach a helpline, doctor or lawyer, at her pace.', bn: 'তার নিজের গতিতে হেল্পলাইন, ডাক্তার বা আইনজীবীর সাথে যুক্ত হতে সাহায্য করুন।' } },
  ];

  return (
    <>
      <HomeHero currentLang={currentLang} onNavigate={onNavigate} />

      {/* Topics */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={pick(lang, { en: 'Help center', bn: 'সহায়তা কেন্দ্র' })}
            title={pick(lang, { en: 'Information for every kind of harm', bn: 'প্রতিটি ধরনের ক্ষতির জন্য তথ্য' })}
            subtitle={pick(lang, {
              en: 'Signs to look for, what to do now, how to help someone, and what the law says.',
              bn: 'লক্ষণ, এখন কী করবেন, কাউকে কীভাবে সাহায্য করবেন, এবং আইন কী বলে।',
            })}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} lang={lang} onClick={() => onNavigate('topic', topic.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Not your fault */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-brand-950 px-6 py-16 text-center sm:px-16">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-rose-500/30 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-brand-500/40 blur-3xl" aria-hidden />
          <p className="relative mx-auto max-w-3xl font-display text-3xl font-medium leading-snug text-white sm:text-4xl">
            “{pick(lang, ui.notYourFault)}”
          </p>
          <p className="relative mx-auto mt-5 max-w-2xl text-brand-200">
            {pick(lang, {
              en: 'Not what you wore, not where you went, not who you trusted. The responsibility belongs only to the person who caused harm.',
              bn: 'আপনি কী পরেছিলেন, কোথায় গিয়েছিলেন, কাকে বিশ্বাস করেছিলেন — তার জন্য নয়। দায় শুধুমাত্র যে ক্ষতি করেছে তার।',
            })}
          </p>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={pick(lang, ui.nav.tools)}
            title={pick(lang, { en: 'Small tools for hard moments', bn: 'কঠিন মুহূর্তের জন্য ছোট টুল' })}
            action={
              <button onClick={() => onNavigate('tools')} className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-900">
                {pick(lang, { en: 'Open tools', bn: 'টুলগুলো খুলুন' })} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            }
          />
          <div className="grid gap-5 md:grid-cols-3">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <button
                  key={i}
                  onClick={() => onNavigate('tools')}
                  className={`group rounded-3xl bg-gradient-to-br ${tool.style} p-7 text-left text-white transition-transform hover:-translate-y-1`}
                >
                  <Icon className="h-8 w-8 opacity-90" />
                  <h3 className="mt-10 text-xl font-semibold">{pick(lang, tool.title)}</h3>
                  <p className="mt-2 text-sm text-white/80">{pick(lang, tool.desc)}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Helplines */}
      <section className="border-y border-slate-200/70 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={pick(lang, ui.nav.helplines)}
            title={pick(lang, { en: 'Someone is ready to answer', bn: 'কেউ উত্তর দিতে প্রস্তুত' })}
            subtitle={pick(lang, {
              en: 'Tap a number to call. Government helplines are free.',
              bn: 'কল করতে নম্বরে ট্যাপ করুন। সরকারি হেল্পলাইন বিনামূল্যে।',
            })}
            action={
              <button onClick={() => onNavigate('helplines')} className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-900">
                {pick(lang, { en: 'All helplines', bn: 'সব হেল্পলাইন' })} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[helplines.emergency, helplines.women, helplines.emotional, helplines.legal].map((h) => (
              <HelplineCard key={h.id} helpline={h} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Supporting someone */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {pick(lang, { en: 'Worried about someone?', bn: 'কাউকে নিয়ে চিন্তিত?' })}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-brand-950 sm:text-4xl">
              {pick(lang, { en: 'How you respond can change everything', bn: 'আপনার প্রতিক্রিয়া সবকিছু বদলে দিতে পারে' })}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {pick(lang, {
                en: 'Most women tell a friend or relative first. A calm, believing response makes it far more likely she will get help.',
                bn: 'বেশিরভাগ নারী প্রথমে বন্ধু বা আত্মীয়কে বলেন। শান্ত, বিশ্বাসভরা প্রতিক্রিয়া পেলে তার সাহায্য নেওয়ার সম্ভাবনা অনেক বাড়ে।',
              })}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {supportSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-semibold text-slate-900">{pick(lang, s.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{pick(lang, s.desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campaign & regional */}
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col justify-between rounded-[2rem] bg-gradient-to-br from-rose-500 to-brand-700 p-8 text-white sm:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-rose-100">{t.campaign.title}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{t.campaign.bannerTitle}</h3>
              <p className="mt-3 text-rose-50/90">{t.campaign.bannerDesc}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('news')} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-rose-50">
                {t.campaign.btnEvents}
              </button>
              <button onClick={() => onNavigate('volunteer')} className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                {t.campaign.btnPartner}
              </button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 sm:p-10">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
              <MapPin className="h-4 w-4" /> {t.regional.title}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-brand-950 sm:text-3xl">{t.regional.collabTitle}</h3>
            <p className="mt-3 text-slate-600">{t.regional.collabDesc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {t.regional.countries.map((country) => (
                <span key={country} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{country}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
