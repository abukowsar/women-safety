
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

// Pages
import Home from './components/Home';
import EducationPage from './components/EducationPage';
import LegalPage from './components/LegalPage';
import NewsPage from './components/NewsPage';
import ReportForm from './components/ReportForm';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import VolunteerPage from './components/VolunteerPage';

import { Language, Case, ReportType, Page } from './types';
import { translations } from './utils/translations';

function App() {
  const [currentLang, setCurrentLang] = useState<Language>('bn');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showAdmin, setShowAdmin] = useState(false);
  
  // RTL support for Urdu, Pashto, Dhivehi
  const isRtl = ['ur', 'ps', 'dv'].includes(currentLang);
  
  // Mock Database
  const [reports, setReports] = useState<Case[]>([
    {
      id: 'CASE-884210',
      type: ReportType.Harassment,
      description: 'Repeated threats in DM...',
      status: 'pending',
      date: new Date().toISOString(),
      isAnonymous: false,
      riskScore: 85,
      evidenceCount: 2
    },
    {
      id: 'CASE-102938',
      type: ReportType.Deepfake,
      description: 'Found my face on a video...',
      status: 'investigating',
      date: new Date(Date.now() - 86400000).toISOString(),
      isAnonymous: true,
      riskScore: 92,
      evidenceCount: 1
    },
    {
      id: 'CASE-554123',
      type: ReportType.Cyberbullying,
      description: 'Bullying in comments section',
      status: 'resolved',
      date: new Date(Date.now() - 172800000).toISOString(),
      isAnonymous: false,
      riskScore: 45,
      evidenceCount: 3
    }
  ]);

  const handleAddReport = (newReport: Omit<Case, 'id' | 'status' | 'date' | 'riskScore' | 'evidenceCount'>) => {
    const report: Case = {
      ...newReport,
      id: `CASE-${Math.floor(Math.random() * 1000000)}`,
      status: 'pending',
      date: new Date().toISOString(),
      riskScore: Math.floor(Math.random() * 100), // Mock AI analysis
      evidenceCount: Math.floor(Math.random() * 5)
    };
    setReports(prev => [report, ...prev]);
  };

  const handleUpdateStatus = (id: string, status: Case['status']) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showAdmin) {
    return (
      <AdminDashboard 
        cases={reports} 
        currentLang={currentLang} 
        onClose={() => setShowAdmin(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    );
  }

  // Router Logic
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home currentLang={currentLang} onNavigate={handleNavigation} />;
      case 'problems':
        return <EducationPage currentLang={currentLang} />;
      case 'legal':
        return <LegalPage currentLang={currentLang} />;
      case 'news':
        return <NewsPage currentLang={currentLang} />;
      case 'report':
        return <ReportForm onSubmitReport={handleAddReport} />;
      case 'about':
        return <AboutPage currentLang={currentLang} />;
      case 'privacy':
        return <PrivacyPage currentLang={currentLang} />;
      case 'volunteer':
        return <VolunteerPage currentLang={currentLang} />;
      default:
        return <Home currentLang={currentLang} onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar 
        currentLang={currentLang} 
        setLanguage={setCurrentLang} 
        onAdminClick={() => setShowAdmin(true)}
        onNavigate={handleNavigation}
      />
      
      <main className="min-h-[calc(100vh-80px-300px)]">
        {renderPage()}
      </main>

      <Footer currentLang={currentLang} onNavigate={handleNavigation} />

      <ChatWidget />
    </div>
  );
}

export default App;
