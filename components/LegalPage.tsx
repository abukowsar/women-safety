
import React from 'react';
import { Gavel, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface LegalPageProps {
  currentLang: Language;
}

const LegalPage: React.FC<LegalPageProps> = ({ currentLang }) => {
  const t = translations[currentLang].legal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{t.title}</h2>
        <p className="mt-4 text-xl text-slate-500">{t.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center mb-6">
            <Gavel className="h-8 w-8 text-brand-600 mr-3" />
            <h3 className="text-2xl font-bold">{t.lawsTitle}</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mt-1 mr-3 min-w-fit">{t.dsa.badge}</span>
              <p className="text-slate-700 text-sm md:text-base">{t.dsa.text}</p>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mt-1 mr-3 min-w-fit">{t.pca.badge}</span>
              <p className="text-slate-700 text-sm md:text-base">{t.pca.text}</p>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mt-1 mr-3 min-w-fit">{t.tip.badge}</span>
              <p className="text-slate-700 text-sm md:text-base italic">{t.tip.text}</p>
            </li>
          </ul>
        </div>
        <div className="bg-brand-50 p-8 rounded-2xl shadow-sm border border-brand-100">
            <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-brand-600 mr-3" />
            <h3 className="text-2xl font-bold">{t.evidenceTitle}</h3>
          </div>
          <p className="mb-4 text-slate-700">{t.evidenceDesc}</p>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white p-3 rounded-lg flex items-center shadow-sm">
              <div className="h-8 w-8 min-w-[2rem] rounded-full bg-slate-200 flex items-center justify-center font-bold mr-3 text-sm">1</div>
              <span className="text-sm md:text-base">{t.step1}</span>
            </div>
            <div className="bg-white p-3 rounded-lg flex items-center shadow-sm">
                <div className="h-8 w-8 min-w-[2rem] rounded-full bg-slate-200 flex items-center justify-center font-bold mr-3 text-sm">2</div>
              <span className="text-sm md:text-base">{t.step2}</span>
            </div>
            <div className="bg-white p-3 rounded-lg flex items-center shadow-sm">
                <div className="h-8 w-8 min-w-[2rem] rounded-full bg-slate-200 flex items-center justify-center font-bold mr-3 text-sm">3</div>
              <span className="text-sm md:text-base">{t.step3}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
