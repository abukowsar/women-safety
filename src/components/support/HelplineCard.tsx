import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { Language } from '@/types';
import { Helpline } from '@/data/helplines';
import { pick, ui } from '@/data/i18n';

interface HelplineCardProps {
  helpline: Helpline;
  lang: Language;
  compact?: boolean;
}

const HelplineCard: React.FC<HelplineCardProps> = ({ helpline, lang, compact = false }) => {
  const isEmergency = helpline.category === 'emergency';

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-white p-5 transition-shadow hover:shadow-lg ${
        isEmergency ? 'border-red-200' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-snug text-slate-900">{pick(lang, helpline.name)}</h3>
        {helpline.free && (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            {pick(lang, ui.free)}
          </span>
        )}
      </div>

      {!compact && <p className="mt-2 text-sm leading-relaxed text-slate-600">{pick(lang, helpline.desc)}</p>}

      <div className="mt-4 flex items-center justify-between gap-3 pt-1">
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          {pick(lang, helpline.hours)}
        </span>
        {helpline.number ? (
          <a
            href={`tel:${helpline.number}`}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white transition-colors ${
              isEmergency ? 'bg-alert-500 hover:bg-red-700' : 'bg-brand-700 hover:bg-brand-800'
            }`}
            aria-label={`${pick(lang, ui.call)} ${pick(lang, helpline.name)} ${helpline.number}`}
          >
            <Phone className="h-4 w-4" />
            {pick(lang, helpline.display)}
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            <MapPin className="h-4 w-4" />
            {pick(lang, helpline.display)}
          </span>
        )}
      </div>
    </div>
  );
};

export default HelplineCard;
