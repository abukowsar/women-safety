import React from 'react';
import { Phone, LogOut, ArrowUpRight, ArrowUp } from 'lucide-react';
import { Language, Navigate } from '@/types';
import { pick, ui } from '@/data/i18n';
import { topics } from '@/data/topics';
import { helplines } from '@/data/helplines';
import { Logo } from './Navbar';
import { quickExit } from './CrisisBar';
import Shapla from './brand/Shapla';

interface FooterProps {
  currentLang: Language;
  onNavigate: Navigate;
}

const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const lang = currentLang;
  const lines = [
    { h: helplines.emergency, tone: 'bg-red-600 hover:bg-red-500' },
    { h: helplines.women, tone: 'bg-rose-500/90 hover:bg-rose-500' },
    { h: helplines.emotional, tone: 'bg-teal-600/90 hover:bg-teal-600' },
  ];

  const moreLinks = [
    { page: 'tools' as const, label: ui.nav.tools },
    { page: 'helplines' as const, label: ui.nav.helplines },
    { page: 'legal' as const, label: ui.nav.legal },
    { page: 'about' as const, label: ui.nav.about },
    { page: 'volunteer' as const, label: ui.nav.volunteer },
    { page: 'privacy' as const, label: ui.nav.privacy },
  ];

  return (
    <footer className="relative mt-10 text-white">
      {/* Wave edge */}
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-16 w-full text-brand-950 sm:h-24" aria-hidden>
        <path
          fill="currentColor"
          d="M0 70C120 40 240 20 380 34S640 104 800 98 1080 30 1220 26 1400 52 1440 60V120H0Z"
        />
      </svg>

      <div className="relative overflow-hidden bg-brand-950 pb-28 sm:pb-8">
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Promise */}
          <div className="grid items-center gap-10 border-b border-white/10 pb-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Shapla outline strokeWidth={1.2} className="h-14 w-14 text-rose-300" />
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-[2.6rem]">
                {pick(lang, {
                  en: 'Wherever you are, whatever happened, help is here.',
                  bn: 'আপনি যেখানেই থাকুন, যা-ই ঘটুক, সাহায্য আছে।',
                })}
              </h2>
              <p className="mt-4 max-w-md text-brand-200">
                {pick(lang, {
                  en: 'Free, confidential support for women facing violence, abuse or mental distress across South Asia.',
                  bn: 'দক্ষিণ এশিয়া জুড়ে সহিংসতা, নির্যাতন বা মানসিক কষ্টের মুখোমুখি নারীদের জন্য বিনামূল্যে, গোপনীয় সহায়তা।',
                })}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:col-span-6">
              {lines.map(({ h, tone }) => (
                <a
                  key={h.id}
                  href={`tel:${h.number}`}
                  className={`group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-3xl p-5 transition-all hover:-translate-y-1 ${tone}`}
                >
                  <span className="flex items-center justify-between">
                    <Phone className="h-5 w-5" />
                    <ArrowUpRight className="h-5 w-5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span>
                    <span className={`block font-display font-semibold ${h.display.en.length > 5 ? 'text-xl xl:text-2xl' : 'text-3xl'}`}>{pick(lang, h.display)}</span>
                    <span className="mt-1 block text-sm leading-snug text-white/85">{pick(lang, h.name)}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-10 py-14 md:grid-cols-12">
            <div className="md:col-span-4">
              <button onClick={() => onNavigate('home')}>
                <Logo lang={lang} light />
              </button>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={quickExit}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-950 hover:bg-rose-100"
                >
                  <LogOut className="h-4 w-4" /> {pick(lang, ui.quickExit)}
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  <ArrowUp className="h-4 w-4" /> {pick(lang, { en: 'Back to top', bn: 'উপরে যান' })}
                </button>
              </div>
            </div>

            <div className="md:col-span-5">
              <h4 className={`text-xs font-semibold uppercase text-rose-300 ${lang === 'bn' ? 'text-sm' : 'tracking-[0.2em]'}`}>{pick(lang, ui.nav.help)}</h4>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                {topics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      onClick={() => onNavigate('topic', topic.id)}
                      className="group inline-flex items-center gap-2 text-left text-brand-100 transition-colors hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400 transition-transform group-hover:scale-150" />
                      {pick(lang, topic.title)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className={`text-xs font-semibold uppercase text-rose-300 ${lang === 'bn' ? 'text-sm' : 'tracking-[0.2em]'}`}>{pick(lang, ui.nav.more)}</h4>
              <ul className="mt-5 space-y-3">
                {moreLinks.map((l) => (
                  <li key={l.page}>
                    <button onClick={() => onNavigate(l.page)} className="text-brand-100 transition-colors hover:text-white">
                      {pick(lang, l.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="pointer-events-none relative select-none overflow-hidden" aria-hidden>
          <p className="-mb-[0.28em] whitespace-nowrap text-center font-display text-[24vw] font-semibold leading-none tracking-tight">
            <span className="bg-gradient-to-b from-white/25 via-brand-300/10 to-transparent bg-clip-text text-transparent">
              {pick(lang, ui.brand)}
            </span>
          </p>
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 pt-6 text-sm text-brand-300 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {pick(lang, ui.brand)} · {pick(lang, { en: 'Made with care in Bangladesh', bn: 'যত্নের সাথে বাংলাদেশে তৈরি' })}
          </p>
          <p className="max-w-xl md:text-right">
            {pick(lang, {
              en: 'General information, not legal or medical advice. In an emergency, call 999.',
              bn: 'সাধারণ তথ্য, আইনি বা চিকিৎসা পরামর্শ নয়। জরুরি অবস্থায় ৯৯৯-এ কল করুন।',
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
