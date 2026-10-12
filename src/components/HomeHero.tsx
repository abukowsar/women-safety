import React, { useEffect, useState } from 'react';
import { Phone, MessageCircleHeart, FileText, Compass, ArrowRight, Heart, Sparkles, Lock, BadgeCheck, Clock } from 'lucide-react';
import { Language, Navigate } from '@/types';
import { pick, ui, L } from '@/data/i18n';
import Shapla from './brand/Shapla';

interface HomeHeroProps {
  currentLang: Language;
  onNavigate: Navigate;
}

const places: L[] = [
  { en: 'at home.', bn: 'ঘরে' },
  { en: 'on the street.', bn: 'রাস্তায়' },
  { en: 'at work.', bn: 'কর্মক্ষেত্রে' },
  { en: 'online.', bn: 'অনলাইনে' },
  { en: 'in your own mind.', bn: 'মনের ভেতরেও' },
];

const affirmations: L[] = [
  { en: 'You are not alone', bn: 'আপনি একা নন' },
  { en: 'It is not your fault', bn: 'এটা আপনার দোষ নয়' },
  { en: 'Asking for help is brave', bn: 'সাহায্য চাওয়া সাহসের কাজ' },
  { en: 'You will be believed', bn: 'আপনার কথা বিশ্বাস করা হবে' },
  { en: 'Your feelings are valid', bn: 'আপনার অনুভূতি সত্যি' },
  { en: 'Healing is possible', bn: 'সেরে ওঠা সম্ভব' },
  { en: 'You deserve respect', bn: 'আপনি সম্মান পাওয়ার যোগ্য' },
];

const HomeHero: React.FC<HomeHeroProps> = ({ currentLang, onNavigate }) => {
  const lang = currentLang;
  const [word, setWord] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % places.length), 2600);
    return () => clearInterval(id);
  }, []);

  const needs: { icon: React.ElementType; title: L; desc: L; chip: string; onClick?: () => void; href?: string }[] = [
    {
      icon: Phone,
      title: { en: 'I am in danger now', bn: 'আমি এখন বিপদে আছি' },
      desc: { en: 'Call 999 for police or ambulance', bn: 'পুলিশ বা অ্যাম্বুলেন্সের জন্য ৯৯৯' },
      chip: 'bg-red-600 text-white',
      href: 'tel:999',
    },
    {
      icon: MessageCircleHeart,
      title: { en: 'I need someone to talk to', bn: 'কারো সাথে কথা বলা দরকার' },
      desc: { en: 'Free, confidential support lines', bn: 'বিনামূল্যে, গোপনীয় সহায়তা লাইন' },
      chip: 'bg-teal-100 text-teal-700',
      onClick: () => onNavigate('helplines'),
    },
    {
      icon: FileText,
      title: { en: 'I want to report something', bn: 'আমি অভিযোগ করতে চাই' },
      desc: { en: 'Securely, anonymously if you wish', bn: 'নিরাপদে, চাইলে পরিচয় গোপন রেখে' },
      chip: 'bg-brand-100 text-brand-700',
      onClick: () => onNavigate('report'),
    },
    {
      icon: Compass,
      title: { en: 'I want to understand my options', bn: 'আমার পথগুলো জানতে চাই' },
      desc: { en: 'Rights, safety and recovery guides', bn: 'অধিকার, নিরাপত্তা ও সেরে ওঠার গাইড' },
      chip: 'bg-amber-100 text-amber-700',
      onClick: () => onNavigate('help'),
    },
  ];

  const trust = [
    { icon: Lock, text: { en: 'Confidential', bn: 'গোপনীয়' } },
    { icon: BadgeCheck, text: { en: 'Free to use', bn: 'বিনামূল্যে' } },
    { icon: Clock, text: { en: '24/7 helplines', bn: '২৪/৭ হেল্পলাইন' } },
  ];

  const ribbon = [...affirmations, ...affirmations];

  return (
    <section className="relative overflow-hidden">
      {/* Aurora backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_10%,rgba(244,114,182,0.22),transparent_70%),radial-gradient(50%_45%_at_10%_30%,rgba(165,86,158,0.20),transparent_70%),radial-gradient(40%_40%_at_60%_95%,rgba(45,212,191,0.16),transparent_70%)]" />
        <div className="bg-grain absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="animate-fade-up lg:col-span-6">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200/80 bg-white/70 py-1.5 pl-2 pr-4 text-sm font-medium text-brand-800 shadow-sm backdrop-blur">
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-rose-500">
              <Shapla className="h-4 w-4 text-white" />
            </span>
            {pick(lang, { en: "A safe space for every woman", bn: 'প্রতিটি নারীর জন্য একটি নিরাপদ জায়গা' })}
          </span>

          <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.12] tracking-tight text-brand-950 sm:text-6xl lg:text-[4.1rem]">
            <span className="block">{pick(lang, { en: 'You deserve to feel safe', bn: 'নিরাপদ থাকা আপনার অধিকার —' })}</span>
            <span className="relative mt-1 inline-block min-h-[1.25em]">
              <span
                key={word}
                className="animate-word-in inline-block bg-gradient-to-r from-brand-600 via-rose-500 to-amber-500 bg-clip-text pb-2 text-transparent"
              >
                {pick(lang, places[word])}
              </span>
              <svg
                key={`u${word}`}
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-4 w-full text-rose-400"
                aria-hidden
              >
                <path
                  className="animate-draw"
                  d="M3 14C60 4 120 3 170 8S260 16 297 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600">
            {pick(lang, {
              en: 'Support for women facing violence, abuse, dowry pressure, harassment or mental distress. Clear guides, real helplines, and people who believe you.',
              bn: 'সহিংসতা, নির্যাতন, যৌতুকের চাপ, হয়রানি বা মানসিক কষ্টের মুখোমুখি নারীদের জন্য সহায়তা। সহজ গাইড, সত্যিকারের হেল্পলাইন, এবং এমন মানুষ যারা আপনাকে বিশ্বাস করে।',
            })}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('help')}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-950 py-3.5 pl-6 pr-3 font-semibold text-white shadow-xl shadow-brand-950/25 transition-transform hover:-translate-y-0.5"
            >
              {pick(lang, { en: 'Find support', bn: 'সহায়তা খুঁজুন' })}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </span>
            </button>
            <a
              href="tel:109"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-5 py-3.5 font-semibold text-brand-900 backdrop-blur transition-colors hover:bg-white"
            >
              <Phone className="h-4 w-4 text-rose-500" />
              {pick(lang, { en: 'Call 109', bn: '১০৯-এ কল করুন' })}
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            {trust.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={i} className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-brand-500" /> {pick(lang, item.text)}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <Shapla
            outline
            strokeWidth={0.4}
            className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 text-brand-300/60"
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300/30 blur-3xl" aria-hidden />

          <div
            className="animate-float absolute -left-4 -top-6 z-20 hidden items-center gap-2 rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm font-semibold text-brand-900 shadow-xl shadow-brand-950/10 sm:flex"
            style={{ ['--tilt' as string]: '-5deg' }}
          >
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            {pick(lang, affirmations[1])}
          </div>
          <div
            className="animate-float absolute -bottom-6 -right-2 z-20 hidden items-center gap-2 rounded-2xl rounded-br-sm bg-brand-950 px-4 py-3 text-sm font-semibold text-white shadow-xl sm:flex"
            style={{ ['--tilt' as string]: '4deg', animationDelay: '1.5s' }}
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            {pick(lang, affirmations[2])}
          </div>

          <div
            className="animate-fade-up relative z-10 mx-auto max-w-lg rounded-[2rem] border border-white/80 bg-white/75 p-3 shadow-2xl shadow-brand-950/15 backdrop-blur-2xl"
            style={{ animationDelay: '150ms' }}
          >
            <div className="flex items-center justify-between px-4 pb-3 pt-3">
              <h2 className="font-semibold text-slate-900">
                {pick(lang, { en: 'What do you need right now?', bn: 'এই মুহূর্তে আপনার কী প্রয়োজন?' })}
              </h2>
              <span className="flex gap-1" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-teal-300" />
              </span>
            </div>
            <div className="space-y-1.5">
              {needs.map((n, i) => {
                const Icon = n.icon;
                const urgent = i === 0;
                const cls = `group flex w-full items-center gap-4 rounded-3xl p-3.5 text-left transition-all ${
                  urgent ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-white hover:shadow-md'
                }`;
                const content = (
                  <>
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${n.chip} ${urgent ? 'animate-pulse-ring' : ''}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block font-semibold ${urgent ? 'text-red-800' : 'text-slate-900'}`}>{pick(lang, n.title)}</span>
                      <span className="block text-sm text-slate-500">{pick(lang, n.desc)}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-brand-600 rtl:rotate-180" />
                  </>
                );
                return n.href ? (
                  <a key={i} href={n.href} className={cls}>{content}</a>
                ) : (
                  <button key={i} onClick={n.onClick} className={cls}>{content}</button>
                );
              })}
            </div>
            <p className="px-4 pb-2 pt-3 text-center text-xs text-slate-500">{pick(lang, ui.confidential)}</p>
          </div>
        </div>
      </div>

      {/* Affirmation ribbon */}
      <div className="relative -ml-[5%] w-[110%] -rotate-1 overflow-hidden bg-gradient-to-r from-brand-950 via-brand-800 to-brand-950 py-4 shadow-xl" aria-hidden>
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {ribbon.map((a, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-xl text-white sm:text-2xl">
              {pick(lang, a)}
              <Shapla className="h-6 w-6 text-rose-300" />
            </span>
          ))}
        </div>
      </div>
      <div className="h-10" />
    </section>
  );
};

export default HomeHero;
