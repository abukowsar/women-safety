
import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface AboutPageProps {
  currentLang: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ currentLang }) => {
  const t = translations[currentLang].pages?.about;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">{t?.title || 'About Us'}</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-lg text-slate-700 leading-relaxed">
          {t?.content || 'Nirapad Digital is a non-profit initiative dedicated to making the online world safer for women in South Asia.'}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
