import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ChatWidget from '../ChatWidget';
import { Language, Page } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  onAdminClick: () => void;
  onNavigate: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentLang, 
  setLanguage, 
  onAdminClick, 
  onNavigate 
}) => {
  const isRtl = ['ur', 'ps', 'dv'].includes(currentLang);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar 
        currentLang={currentLang} 
        setLanguage={setLanguage} 
        onAdminClick={onAdminClick}
        onNavigate={onNavigate}
      />
      
      <main className="min-h-[calc(100vh-80px-300px)]">
        {children}
      </main>

      <Footer currentLang={currentLang} onNavigate={onNavigate} />

      <div>
        hello
      </div>

      <ChatWidget />
    </div>
  );
};

export default Layout;
