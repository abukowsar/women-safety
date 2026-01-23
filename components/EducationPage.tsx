
import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface EducationPageProps {
  currentLang: Language;
}

const EducationCard: React.FC<{ item: { title: string; desc: string; impact: string; legal: string; action: string } }> = ({ item }) => (
  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-brand-200 hover:shadow-md transition-all">
    <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
    <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between border-b border-slate-200 pb-1">
        <span className="text-slate-500">Impact</span>
        <span className="font-medium text-red-500">{item.impact}</span>
      </div>
      <div className="flex justify-between border-b border-slate-200 pb-1">
        <span className="text-slate-500">Legal</span>
        <span className="font-medium text-blue-600">{item.legal}</span>
      </div>
      <div className="flex justify-between pt-1">
        <span className="text-slate-500">Action</span>
        <span className="font-medium text-green-600">{item.action}</span>
      </div>
    </div>
  </div>
);

const EducationPage: React.FC<EducationPageProps> = ({ currentLang }) => {
  const t = translations[currentLang].education;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{t.title}</h2>
        <p className="mt-4 text-xl text-slate-500">{t.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.cards.map((item, index) => (
          <EducationCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default EducationPage;
