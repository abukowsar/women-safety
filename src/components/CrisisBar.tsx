import React, { useEffect, useRef } from 'react';
import { Phone, LogOut } from 'lucide-react';
import { Language } from '@/types';
import { pick, ui } from '@/data/i18n';

// Neutral page to land on, so nothing about this site stays on screen.
const EXIT_URL = 'https://www.google.com/search?q=weather';

export const quickExit = () => {
  // replace() keeps this site out of the Back button history.
  window.location.replace(EXIT_URL);
};

const CrisisBar: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const lastEsc = useRef(0);

  // Pressing Esc twice within a second also exits.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const now = Date.now();
      if (now - lastEsc.current < 1000) quickExit();
      lastEsc.current = now;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="bg-brand-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 text-sm sm:gap-4">
          <span className="hidden font-medium text-brand-200 md:inline">{pick(currentLang, ui.crisisPrompt)}</span>
          <a
            href="tel:999"
            className="inline-flex items-center gap-1.5 rounded-full bg-alert-500 px-3 py-1 font-bold transition-colors hover:bg-red-700"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{pick(currentLang, ui.emergency)}</span> {currentLang === 'bn' ? '৯৯৯' : '999'}
          </a>
          <a
            href="tel:109"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-semibold transition-colors hover:bg-white/20"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{pick(currentLang, ui.womenHelpline)}</span> {currentLang === 'bn' ? '১০৯' : '109'}
          </a>
        </div>
        <button
          onClick={quickExit}
          title={pick(currentLang, ui.quickExitHint)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/30 px-3 py-1 text-sm font-semibold transition-colors hover:bg-white hover:text-brand-950"
        >
          <LogOut className="h-3.5 w-3.5" />
          {pick(currentLang, ui.quickExit)}
        </button>
      </div>
    </div>
  );
};

export default CrisisBar;
