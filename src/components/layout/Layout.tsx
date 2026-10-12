import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CrisisBar from '../CrisisBar';
import ChatWidget from '../ChatWidget';
import { Language, Navigate, Page } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentLang: Language;
  currentPage: Page;
  setLanguage: (lang: Language) => void;
  onAdminClick: () => void;
  onNavigate: Navigate;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentLang,
  currentPage,
  setLanguage,
  onAdminClick,
  onNavigate
}) => {
  const isRtl = ['ur', 'ps', 'dv'].includes(currentLang);

  return (
    <div className="min-h-screen bg-cream text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 z-50">
        <CrisisBar currentLang={currentLang} />
        <Navbar
          currentLang={currentLang}
          currentPage={currentPage}
          setLanguage={setLanguage}
          onAdminClick={onAdminClick}
          onNavigate={onNavigate}
        />
      </header>

      <main className="min-h-[60vh]">
        {children}
      </main>

      <Footer currentLang={currentLang} onNavigate={onNavigate} />

      <ChatWidget currentLang={currentLang} />
    </div>
  );
};

export default Layout;
