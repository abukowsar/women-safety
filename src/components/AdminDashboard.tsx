import React, { useState } from 'react';
import { Case, Language } from '@/types';
import { translations } from '@/utils/translations';
import Sidebar from './admin/Sidebar';
import Header from './admin/Header';
import Login from './admin/Login';
import StatsGrid from './admin/StatsGrid';
import RecentCasesTable from './admin/RecentCasesTable';
import CaseManagement from './admin/CaseManagement';
import AIInsights from './admin/AIInsights';
import SettingsTab from './admin/SettingsTab';

interface AdminDashboardProps {
  cases: Case[];
  currentLang: Language;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Case['status']) => void;
}

type Tab = 'dashboard' | 'cases' | 'ai-insights' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ cases, currentLang, onClose, onUpdateStatus }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  
  const t = translations[currentLang].admin;
  
  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={() => setIsAuthenticated(true)} 
        onClose={onClose} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex text-slate-900">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLogout={() => { setIsAuthenticated(false); onClose(); }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
        
        <Header 
          activeTab={activeTab} 
          onMenuClick={() => setIsSidebarOpen(true)}
          onLogout={() => { setIsAuthenticated(false); onClose(); }}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
              <StatsGrid cases={cases} t={t} />
              <RecentCasesTable cases={cases} t={t} />
            </div>
          )}

          {activeTab === 'cases' && (
            <CaseManagement cases={cases} onUpdateStatus={onUpdateStatus} />
          )}

          {activeTab === 'ai-insights' && (
            <AIInsights />
          )}
          
          {activeTab === 'settings' && (
            <SettingsTab 
              onClose={onClose} 
              setIsAuthenticated={setIsAuthenticated} 
            />
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
