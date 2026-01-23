
import React from 'react';
import { Shield, Phone } from 'lucide-react';
import { Language, Page } from '../types';
import { translations } from '../utils/translations';

interface FooterProps {
  currentLang: Language;
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang].footer;
  
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4 cursor-pointer" onClick={() => onNavigate('home')}>
               <Shield className="h-8 w-8 text-brand-500 mr-2" />
               <span className="font-bold text-2xl">
                 {currentLang === 'en' ? 'Nirapad Digital' : 'নিরাপদ ডিজিটাল'}
               </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              {t.desc}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">{t.emergency}</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center group"><Phone className="h-4 w-4 mr-2 text-green-400 group-hover:scale-110 transition-transform" /> {t.police}</li>
              <li className="flex items-center group"><Phone className="h-4 w-4 mr-2 text-brand-400 group-hover:scale-110 transition-transform" /> {t.women}</li>
              <li className="flex items-center group"><Phone className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" /> {t.mental}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">{t.links}</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">{t.about}</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors text-left">{t.privacy}</button></li>
              <li><button onClick={() => onNavigate('volunteer')} className="hover:text-white transition-colors text-left">{t.volunteer}</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2025 Nirapad Digital. {t.rights}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">FB</div>
             <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">TW</div>
             <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">YT</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
