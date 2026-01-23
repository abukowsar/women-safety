
import React, { useState } from 'react';
import { Menu, X, Shield, Globe, Lock } from 'lucide-react';
import { Language, Page } from '../types';
import { translations } from '../utils/translations';

interface NavbarProps {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  onAdminClick: () => void;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, setLanguage, onAdminClick, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLang].nav;

  // South Asian Association for Regional Cooperation (SAARC) languages + English
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'bn', label: 'বাংলা (Bangladesh)', flag: '🇧🇩' },
    { code: 'en', label: 'English (International)', flag: '🌏' },
    { code: 'hi', label: 'हिन्दी (India)', flag: '🇮🇳' },
    { code: 'ur', label: 'اردو (Pakistan)', flag: '🇵🇰' },
    { code: 'ne', label: 'नेपाली (Nepal)', flag: '🇳🇵' },
    { code: 'si', label: 'සිංහල (Sri Lanka)', flag: '🇱🇰' },
    { code: 'ps', label: 'پښتو (Afghanistan)', flag: '🇦🇫' },
    { code: 'dv', label: 'ދިވެހި (Maldives)', flag: '🇲🇻' },
    { code: 'dz', label: 'རྫོང་ཁ (Bhutan)', flag: '🇧🇹' },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            <Shield className="h-8 w-8 text-brand-600 mr-2" />
            <div>
              <span className="font-bold text-2xl text-slate-800 tracking-tight">
                {currentLang === 'en' ? 'Nirapad Digital' : 'নিরাপদ ডিজিটাল'}
              </span>
              <p className="text-xs text-slate-500 -mt-1 hidden sm:block">
                South Asia Digital Safety Initiative
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <button onClick={() => handleNav('home')} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">{t.home}</button>
            <button onClick={() => handleNav('problems')} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">{t.problems}</button>
            <button onClick={() => handleNav('legal')} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">{t.legal}</button>
            <button onClick={() => handleNav('news')} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">{t.news}</button>
            
            <div className="relative group">
              <button className="flex items-center text-slate-600 hover:text-brand-600 font-medium px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <Globe className="w-4 h-4 mr-1" />
                <span className="uppercase text-sm">{currentLang}</span>
              </button>
              <div className="absolute right-0 mt-0 w-56 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border border-slate-100 h-96 overflow-y-auto no-scrollbar">
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-50 mb-1">Select Language</div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center w-full text-left px-4 py-3 text-sm hover:bg-brand-50 hover:text-brand-600 transition-colors ${currentLang === lang.code ? 'font-bold text-brand-600 bg-brand-50' : 'text-slate-700'}`}
                  >
                    <span className="text-lg mr-3">{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={onAdminClick} className="flex items-center text-slate-400 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100" title={t.admin}>
              <Lock className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Admin</span>
            </button>

            <button 
              onClick={() => handleNav('report')}
              className="bg-alert-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-red-200 transition-transform hover:scale-105"
            >
              {t.report}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-600 focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-5 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => handleNav('home')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">{t.home}</button>
            <button onClick={() => handleNav('problems')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">{t.problems}</button>
            <button onClick={() => handleNav('legal')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">{t.legal}</button>
            <button onClick={() => handleNav('news')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">{t.news}</button>
            
            <div className="py-2 border-t border-slate-100 mt-2 px-2">
              <p className="text-xs text-slate-400 mb-2 uppercase px-2">Select Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm border ${currentLang === lang.code ? 'bg-brand-50 border-brand-200 text-brand-700 font-bold' : 'bg-white border-slate-100 text-slate-600'}`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { onAdminClick(); setIsOpen(false); }}
              className="flex items-center w-full text-left px-4 py-3 text-slate-600 rounded-lg hover:bg-slate-50"
            >
              <Lock className="w-4 h-4 mr-2" /> {t.admin}
            </button>

            <button
              onClick={() => handleNav('report')}
              className="block w-full text-center mt-4 bg-alert-500 text-white px-5 py-3 rounded-xl font-bold shadow-md"
            >
              {t.report}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
