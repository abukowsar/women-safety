
import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface VolunteerPageProps {
  currentLang: Language;
}

const VolunteerPage: React.FC<VolunteerPageProps> = ({ currentLang }) => {
  const t = translations[currentLang].pages?.volunteer;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">{t?.title || 'Volunteer'}</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-lg text-slate-700 leading-relaxed">
          {t?.content || 'Join us. Use your skills to help ensure women\'s cyber safety.'}
        </p>
        <button className="mt-6 bg-brand-600 text-white px-6 py-2 rounded-full font-bold hover:bg-brand-700 transition-colors">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default VolunteerPage;
