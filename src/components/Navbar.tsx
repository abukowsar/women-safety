import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Globe, Lock, ChevronDown } from 'lucide-react';
import Shapla from './brand/Shapla';
import { Language, Navigate, Page } from '@/types';
import { pick, ui } from '@/data/i18n';
import { topics } from '@/data/topics';
import { topicIcons, accents } from '@/components/support/topicStyles';

interface NavbarProps {
  currentLang: Language;
  currentPage: Page;
  setLanguage: (lang: Language) => void;
  onAdminClick: () => void;
  onNavigate: Navigate;
}

// South Asian Association for Regional Cooperation (SAARC) languages + English
const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'en', label: 'English', flag: '🌏' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' },
  { code: 'ne', label: 'नेपाली', flag: '🇳🇵' },
  { code: 'si', label: 'සිංහල', flag: '🇱🇰' },
  { code: 'ps', label: 'پښتو', flag: '🇦🇫' },
  { code: 'dv', label: 'ދިވެހި', flag: '🇲🇻' },
  { code: 'dz', label: 'རྫོང་ཁ', flag: '🇧🇹' },
];

type OpenMenu = 'help' | 'more' | 'lang' | null;

export const Logo: React.FC<{ lang: Language; light?: boolean }> = ({ lang, light = false }) => (
  <span className="group flex items-center gap-2.5">
    <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-[14px] bg-gradient-to-br from-brand-700 via-brand-600 to-rose-500 shadow-lg shadow-brand-900/20 transition-transform duration-500 group-hover:rotate-6">
      <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-amber-300/40 blur-md" />
      <Shapla className="relative h-7 w-7 text-white" />
    </span>
    <span className="text-left leading-tight">
      <span className={`block font-display text-xl font-semibold ${light ? 'text-white' : 'text-brand-950'}`}>
        {pick(lang, ui.brand)}
      </span>
      <span className={`hidden text-[11px] sm:block ${light ? 'text-brand-200' : 'text-slate-500'}`}>
        {pick(lang, ui.tagline)}
      </span>
    </span>
  </span>
);

const Navbar: React.FC<NavbarProps> = ({ currentLang, currentPage, setLanguage, onAdminClick, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const t = ui.nav;

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  // Past the top, the bar lifts into a floating pill.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go: Navigate = (page, topic) => {
    onNavigate(page, topic);
    setMobileOpen(false);
    setOpenMenu(null);
  };

  const toggle = (menu: OpenMenu) => setOpenMenu((m) => (m === menu ? null : menu));

  const linkClass = (active: boolean) =>
    `rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
      active ? 'bg-brand-950 text-white shadow-md shadow-brand-950/20' : 'text-slate-600 hover:bg-brand-50 hover:text-brand-900'
    }`;

  const moreLinks: { page: Page; label: keyof typeof t }[] = [
    { page: 'track', label: 'track' },
    { page: 'callback', label: 'callback' },
    { page: 'news', label: 'news' },
    { page: 'about', label: 'about' },
    { page: 'volunteer', label: 'volunteer' },
    { page: 'privacy', label: 'privacy' },
  ];

  const mobileLinks: { page: Page; label: keyof typeof t }[] = [
    { page: 'home', label: 'home' },
    { page: 'tools', label: 'tools' },
    { page: 'helplines', label: 'helplines' },
    { page: 'legal', label: 'legal' },
    ...moreLinks,
  ];

  return (
    <nav ref={navRef} className={`transition-all duration-500 ${scrolled ? 'px-2 pt-2 sm:px-4' : 'border-b border-brand-100/70 bg-white/70 backdrop-blur-xl'}`}>
      <div
        className={`mx-auto flex items-center justify-between backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? 'h-16 max-w-6xl rounded-full border border-white/70 bg-white/80 px-3 shadow-xl shadow-brand-950/10 sm:px-4'
            : 'h-[76px] max-w-7xl px-4 sm:px-6 lg:px-8'
        }`}
      >
        <button onClick={() => go('home')} aria-label={pick(currentLang, t.home)}>
          <Logo lang={currentLang} />
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          <button onClick={() => go('home')} className={linkClass(currentPage === 'home')}>
            {pick(currentLang, t.home)}
          </button>

          <div className="relative">
            <button
              onClick={() => toggle('help')}
              aria-expanded={openMenu === 'help'}
              className={`${linkClass(currentPage === 'help' || currentPage === 'topic')} inline-flex items-center gap-1`}
            >
              {pick(currentLang, t.help)}
              <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === 'help' ? 'rotate-180' : ''}`} />
            </button>
            {openMenu === 'help' && (
              <div className="animate-fade-up absolute left-1/2 top-full mt-3 w-[560px] -translate-x-1/2 rounded-3xl border border-slate-100 bg-white p-3 shadow-2xl shadow-brand-950/10">
                <div className="grid grid-cols-2 gap-1">
                  {topics.map((topic) => {
                    const Icon = topicIcons[topic.id];
                    return (
                      <button
                        key={topic.id}
                        onClick={() => go('topic', topic.id)}
                        className="flex items-start gap-3 rounded-2xl p-3 text-left transition-colors hover:bg-slate-50"
                      >
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${accents[topic.accent].icon}`}>
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-slate-900">{pick(currentLang, topic.title)}</span>
                          <span className="line-clamp-2 text-xs leading-relaxed text-slate-500">{pick(currentLang, topic.short)}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => go('help')}
                  className="mt-2 w-full rounded-2xl bg-brand-50 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-100"
                >
                  {pick(currentLang, { en: 'See all support topics', bn: 'সব সহায়তা বিষয় দেখুন' })} →
                </button>
              </div>
            )}
          </div>

          <button onClick={() => go('tools')} className={linkClass(currentPage === 'tools')}>
            {pick(currentLang, t.tools)}
          </button>
          <button onClick={() => go('helplines')} className={linkClass(currentPage === 'helplines')}>
            {pick(currentLang, t.helplines)}
          </button>
          <button onClick={() => go('legal')} className={linkClass(currentPage === 'legal')}>
            {pick(currentLang, t.legal)}
          </button>

          <div className="relative">
            <button
              onClick={() => toggle('more')}
              aria-expanded={openMenu === 'more'}
              className={`${linkClass(moreLinks.some((l) => l.page === currentPage))} inline-flex items-center gap-1`}
            >
              {pick(currentLang, t.more)}
              <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === 'more' ? 'rotate-180' : ''}`} />
            </button>
            {openMenu === 'more' && (
              <div className="animate-fade-up absolute right-0 top-full mt-3 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                {moreLinks.map((l) => (
                  <button
                    key={l.page}
                    onClick={() => go(l.page)}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {pick(currentLang, t[l.label])}
                  </button>
                ))}
                <button
                  onClick={() => { setOpenMenu(null); onAdminClick(); }}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl border-t border-slate-100 px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-50"
                >
                  <Lock className="h-3.5 w-3.5" /> {pick(currentLang, t.admin)}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => toggle('lang')}
              aria-expanded={openMenu === 'lang'}
              aria-label={pick(currentLang, t.language)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{currentLang}</span>
            </button>
            {openMenu === 'lang' && (
              <div className="animate-fade-up absolute right-0 top-full z-10 mt-3 w-48 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setOpenMenu(null); }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm ${
                      currentLang === lang.code ? 'bg-brand-50 font-semibold text-brand-800' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => go('report')}
            className="hidden rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-900/20 transition-colors hover:bg-brand-900 sm:inline-flex"
          >
            {pick(currentLang, t.report)}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Menu"
            className="rounded-full p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className={`max-h-[calc(100vh-130px)] overflow-y-auto bg-white px-4 pb-6 pt-3 shadow-2xl lg:hidden ${scrolled ? 'mx-auto mt-2 rounded-3xl' : 'border-t border-slate-100'}`}>
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{pick(currentLang, t.help)}</p>
          <div className="grid grid-cols-2 gap-2">
            {topics.map((topic) => {
              const Icon = topicIcons[topic.id];
              return (
                <button
                  key={topic.id}
                  onClick={() => go('topic', topic.id)}
                  className={`flex items-center gap-2 rounded-2xl p-3 text-left text-sm font-medium text-slate-800 ${accents[topic.accent].soft}`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${accents[topic.accent].text}`} />
                  {pick(currentLang, topic.title)}
                </button>
              );
            })}
          </div>
          <div className="mt-4 space-y-1 border-t border-slate-100 pt-4">
            {mobileLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                className="block w-full rounded-xl px-3 py-2.5 text-left font-medium text-slate-700 hover:bg-slate-50"
              >
                {pick(currentLang, t[l.label])}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onAdminClick(); }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-slate-500 hover:bg-slate-50"
            >
              <Lock className="h-4 w-4" /> {pick(currentLang, t.admin)}
            </button>
          </div>
          <button
            onClick={() => go('report')}
            className="mt-4 w-full rounded-2xl bg-brand-800 py-3 font-semibold text-white"
          >
            {pick(currentLang, t.report)}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
