
import React from 'react';
import { AlertTriangle, LifeBuoy, ShieldCheck } from 'lucide-react';
import { Language, Page } from '../types';
import { translations } from '../utils/translations';

interface HeroProps {
  currentLang: Language;
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang].hero;

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20 lg:pt-32 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-50 text-brand-700 font-medium text-sm mb-6 border border-brand-100 shadow-sm">
              <ShieldCheck className="w-4 h-4 mr-2" />
              <span>Safety First Initiative</span>
            </div>
            
            <h1 className="text-5xl tracking-tight font-extrabold text-slate-900 sm:text-6xl mb-6 leading-tight">
              {t.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 block lg:inline">
                {t.highlight}
              </span>
            </h1>
            
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.subtitle}
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => onNavigate('report')}
                className="flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-alert-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all hover:-translate-y-1 cursor-pointer"
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                {t.ctaReport}
              </button>
              <button
                onClick={() => onNavigate('legal')}
                className="flex items-center justify-center px-8 py-4 border border-slate-200 text-lg font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all hover:-translate-y-1 cursor-pointer"
              >
                <LifeBuoy className="mr-2 h-5 w-5 text-safety-500" />
                {t.ctaHelp}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Women Tech Safety"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-bold text-lg">Your Voice Matters</p>
                  <p className="text-sm opacity-90">Secure. Anonymous. Supported.</p>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block animate-bounce-slow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Active Support</p>
                  <p className="font-bold text-slate-800">24/7 Online</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block animate-bounce-slow animation-delay-1500">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <LifeBuoy className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Cases Solved</p>
                  <p className="font-bold text-slate-800">12,500+</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
