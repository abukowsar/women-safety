
import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface PrivacyPageProps {
  currentLang: Language;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ currentLang }) => {
  const t = translations[currentLang].pages?.privacy;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">{t?.title || 'Privacy Policy'}</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-lg text-slate-700 leading-relaxed">
          {t?.content || 'Your data is safe with us. We never disclose the identity of the complainant. All data is encrypted.'}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
