import React from 'react';
import { ShieldAlert, X, Home, FileText, Activity, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: 'dashboard' | 'cases' | 'ai-insights' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'cases' | 'ai-insights' | 'settings') => void;
  setIsOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab, setIsOpen, onLogout }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-xl`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-8 h-8 text-brand-500" />
          <span className="font-bold text-xl">Admin Panel</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="mt-6 px-4 space-y-2">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveTab('cases')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'cases' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <FileText className="w-5 h-5" />
          <span>Case Management</span>
        </button>
        <button 
          onClick={() => setActiveTab('ai-insights')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'ai-insights' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <Activity className="w-5 h-5" />
          <span>AI Analysis</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
        <button onClick={onLogout} className="flex items-center space-x-2 text-slate-400 hover:text-white w-full px-4 py-2">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
