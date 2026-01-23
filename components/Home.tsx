
import React from 'react';
import Hero from './Hero';
import { Video, Fingerprint, Lock, Shield, ArrowRight, MapPin } from 'lucide-react';
import { Language, Page } from '../types';
import { translations } from '../utils/translations';

interface HomeProps {
  currentLang: Language;
  onNavigate: (page: Page) => void;
}

// Reusable Section Component
const Section: React.FC<{ 
  id?: string; 
  title: string; 
  subtitle?: string; 
  className?: string; 
  children: React.ReactNode 
}> = ({ id, title, subtitle, className = "bg-white", children }) => (
  <section id={id} className={`py-16 ${className} scroll-mt-24`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-xl text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; color: string; btnText: string; onClick: () => void }> = ({ icon, title, desc, color, btnText, onClick }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 transition-all hover:-translate-y-2 hover:shadow-xl duration-300 group" style={{ borderColor: color }}>
    <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-50 mb-4 group-hover:bg-slate-100 transition-colors" style={{ color: color }}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600">{desc}</p>
    <button 
      onClick={onClick}
      className="mt-4 text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center group-hover:translate-x-1 transition-transform"
    >
      {btnText} <ArrowRight className="ml-1 h-4 w-4" />
    </button>
  </div>
);

const Home: React.FC<HomeProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang];

  return (
    <>
      <Hero currentLang={currentLang} onNavigate={onNavigate} />
      
      {/* Key Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Video className="h-6 w-6" />} 
            title={t.features.cyberstalking.title}
            desc={t.features.cyberstalking.desc}
            color="#ef4444" 
            btnText={t.features.more}
            onClick={() => onNavigate('problems')}
          />
          <FeatureCard 
            icon={<Fingerprint className="h-6 w-6" />} 
            title={t.features.deepfake.title}
            desc={t.features.deepfake.desc}
            color="#f97316" 
            btnText={t.features.more}
            onClick={() => onNavigate('problems')}
          />
          <FeatureCard 
            icon={<Lock className="h-6 w-6" />} 
            title={t.features.imageAbuse.title}
            desc={t.features.imageAbuse.desc}
            color="#eab308" 
            btnText={t.features.more}
            onClick={() => onNavigate('problems')}
          />
          <FeatureCard 
            icon={<Shield className="h-6 w-6" />} 
            title={t.features.harassment.title}
            desc={t.features.harassment.desc}
            color="#ec4899" 
            btnText={t.features.more}
            onClick={() => onNavigate('problems')}
          />
        </div>
      </div>

      {/* Campaign Section */}
      <Section id="campaign" title={t.campaign.title} subtitle={t.campaign.subtitle}>
        <div className="bg-brand-900 rounded-3xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/80 to-transparent opacity-90 z-10"></div>
          <img src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Campaign Banner" className="w-full h-64 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 text-white">
            <h3 className="text-2xl md:text-4xl font-bold mb-4">{t.campaign.bannerTitle}</h3>
            <p className="max-w-xl text-lg mb-6 text-brand-100">{t.campaign.bannerDesc}</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('news')}
                className="bg-white text-brand-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                {t.campaign.btnEvents}
              </button>
              <button 
                onClick={() => onNavigate('volunteer')}
                className="border border-white text-white px-6 py-2 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                {t.campaign.btnPartner}
              </button>
            </div>
          </div>
        </div>
        
        {/* Partners */}
        <div className="mt-12">
          <p className="text-center text-slate-500 mb-6 font-medium uppercase tracking-wide text-xs">{t.campaign.partners}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <span className="text-xl font-bold text-slate-800">UNOPS</span>
             <span className="text-xl font-bold text-slate-800">a2i</span>
             <span className="text-xl font-bold text-slate-800">ICT Division</span>
             <span className="text-xl font-bold text-slate-800">BIISS</span>
             <span className="text-xl font-bold text-slate-800">Maldives HC</span>
          </div>
        </div>
      </Section>

      {/* Regional Collaboration */}
      <Section id="regional" title={t.regional.title} subtitle={t.regional.subtitle}>
         <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
               <h3 className="text-2xl font-bold mb-4 flex items-center">
                 <MapPin className="mr-2" /> {t.regional.collabTitle}
               </h3>
               <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                 {t.regional.collabDesc}
               </p>
               <div className="flex flex-wrap gap-2">
                  {t.regional.countries.map(country => (
                    <span key={country} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors cursor-default">{country}</span>
                  ))}
               </div>
            </div>
            <div className="md:w-1/3 relative z-10">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-lg">
                <h4 className="font-bold text-xl mb-2">{t.regional.trainingTitle}</h4>
                <p className="text-sm text-blue-100 mb-4">{t.regional.trainingDesc}</p>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                   <div className="bg-green-400 h-full w-3/4 animate-pulse"></div>
                </div>
                <p className="text-right text-xs mt-1 font-mono">75% Complete</p>
              </div>
            </div>
         </div>
      </Section>
    </>
  );
};

export default Home;
