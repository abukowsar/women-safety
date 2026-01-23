
import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart2, Users, CheckCircle, Clock, Search, Filter, ShieldAlert, 
  FileText, ArrowUpRight, LogOut, Home, Settings, Activity,
  Lock, Menu, X, Bell, User, ChevronDown, Mail, Save, Plus, Shield
} from 'lucide-react';
import { Case, Language } from '../types';
import { translations } from '../utils/translations';

interface AdminDashboardProps {
  cases: Case[];
  currentLang: Language;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Case['status']) => void;
}

type Tab = 'dashboard' | 'cases' | 'ai-insights' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ cases, currentLang, onClose, onUpdateStatus }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  
  // Header State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for click-outside detection
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang].admin;
  
  const totalCases = cases.length;
  const pendingCases = cases.filter(c => c.status === 'pending').length;
  const resolvedCases = cases.filter(c => c.status === 'resolved').length;

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Use admin/admin');
    }
  };

  // Login Screen Component
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-900">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-6 text-center">
            <Lock className="w-12 h-12 text-white mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
            <p className="text-slate-400 text-sm">Law Enforcement Access Only</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full !bg-white !text-slate-900 border-slate-300 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2.5" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full !bg-white !text-slate-900 border-slate-300 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2.5" 
              />
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
              Login to Dashboard
            </button>
            <div className="text-center text-xs text-slate-400 mt-4">
              Demo Credentials: User: <b>admin</b> / Pass: <b>admin</b>
            </div>
          </form>
          <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
            <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-sm">
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex text-slate-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-xl`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-8 h-8 text-brand-500" />
            <span className="font-bold text-xl">Admin Panel</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
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
          <button onClick={() => { setIsAuthenticated(false); onClose(); }} className="flex items-center space-x-2 text-slate-400 hover:text-white w-full px-4 py-2">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
        
        {/* Enhanced Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm z-20 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-slate-500 hover:text-slate-700 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
               <h2 className="text-xl font-bold text-slate-800 capitalize leading-none">
                {activeTab === 'dashboard' ? 'Overview' : activeTab.replace('-', ' ')}
               </h2>
               <p className="text-xs text-slate-400 hidden sm:block mt-1">Welcome back, Admin</p>
            </div>
          </div>

          {/* Search Bar - Functional Appearance */}
          <div className="flex-1 max-w-lg mx-6 hidden md:block">
              <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  </div>
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 !bg-slate-50 !text-slate-900 placeholder-slate-400 focus:outline-none focus:!bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all sm:text-sm"
                      placeholder="Search for cases, risk reports, or users..."
                  />
              </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
             {/* Notifications Dropdown */}
             <div className="relative" ref={notificationRef}>
                <button 
                    onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
                    className={`p-2 rounded-full transition-all duration-200 relative ${isNotificationsOpen ? 'bg-brand-50 text-brand-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                >
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500 animate-pulse" />
                </button>

                {isNotificationsOpen && (
                    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl py-2 border border-slate-100 z-50 animate-in slide-in-from-top-2 fade-in duration-200 origin-top-right ring-1 ring-black ring-opacity-5">
                        <div className="px-5 py-3 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                            <span className="font-bold text-sm text-slate-800">Notifications</span>
                            <button className="text-xs text-brand-600 font-medium hover:text-brand-700">Mark all as read</button>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            <div className="px-5 py-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors group">
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-100 p-2.5 rounded-full text-red-600 mt-1 group-hover:bg-red-200 transition-colors">
                                        <ShieldAlert className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                           <p className="text-sm font-bold text-slate-800">High Risk Report Detected</p>
                                           <span className="text-[10px] text-slate-400 font-medium">Just now</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">System AI flagged Case #CASE-9921 for immediate review due to violent threats.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 py-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors group">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-2.5 rounded-full text-blue-600 mt-1 group-hover:bg-blue-200 transition-colors">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                           <p className="text-sm font-bold text-slate-800">New Volunteer Application</p>
                                           <span className="text-[10px] text-slate-400 font-medium">15m ago</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Sarah Khan requested to join as a legal counselor.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 border-t border-slate-50 bg-slate-50/50 rounded-b-2xl">
                            <button className="w-full py-2 text-xs text-slate-500 hover:text-brand-600 font-medium transition-colors rounded-lg hover:bg-white">View All Notifications</button>
                        </div>
                    </div>
                )}
             </div>

             {/* User Profile Dropdown */}
             <div className="relative pl-2 border-l border-slate-200" ref={profileRef}>
                <button 
                    onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
                    className={`flex items-center space-x-2 p-1.5 rounded-xl transition-all duration-200 border ${isProfileOpen ? 'bg-slate-50 border-slate-200' : 'border-transparent hover:bg-slate-50'}`}
                >
                    <div className="relative">
                       <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold shadow-md text-sm ring-2 ring-white">
                          AD
                       </div>
                       <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-500" />
                    </div>
                    <div className="hidden lg:block text-left mr-1">
                        <p className="text-sm font-bold text-slate-700 leading-none">Admin User</p>
                        <p className="text-[10px] text-slate-400 font-medium leading-none mt-1.5">Super Administrator</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 hidden lg:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl py-2 border border-slate-100 z-50 animate-in slide-in-from-top-2 fade-in duration-200 origin-top-right ring-1 ring-black ring-opacity-5">
                        <div className="px-5 py-4 border-b border-slate-50 mb-1 bg-slate-50/50 rounded-t-2xl">
                            <p className="text-sm font-bold text-slate-800">System Admin</p>
                            <p className="text-xs text-slate-500 truncate">admin@nirapad.digital</p>
                        </div>
                        
                        <div className="px-2 py-1">
                            <button className="w-full text-left px-3 py-2.5 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600 flex items-center rounded-lg transition-colors font-medium">
                                <User className="w-4 h-4 mr-3" /> My Profile
                            </button>
                            <button className="w-full text-left px-3 py-2.5 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600 flex items-center rounded-lg transition-colors font-medium">
                                <Settings className="w-4 h-4 mr-3" /> Account Settings
                            </button>
                            <button className="w-full text-left px-3 py-2.5 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600 flex items-center rounded-lg transition-colors font-medium">
                                <Mail className="w-4 h-4 mr-3" /> Inbox <span className="ml-auto bg-brand-100 text-brand-600 py-0.5 px-2 rounded-full text-[10px]">3</span>
                            </button>
                        </div>
                        
                        <div className="my-1 border-t border-slate-50 mx-2"></div>
                        
                        <div className="px-2 pb-1">
                            <button 
                                onClick={() => { setIsAuthenticated(false); onClose(); }} 
                                className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center rounded-lg transition-colors font-medium group"
                            >
                                <LogOut className="w-4 h-4 mr-3 group-hover:translate-x-1 transition-transform" /> Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 uppercase font-semibold">{t.totalCases}</p>
                      <p className="text-3xl font-bold text-slate-900 mt-1">{totalCases}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                      <BarChart2 className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                   <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 uppercase font-semibold">{t.pending}</p>
                      <p className="text-3xl font-bold text-yellow-600 mt-1">{pendingCases}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                   <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 uppercase font-semibold">{t.resolved}</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">{resolvedCases}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-slate-800">{t.recentReports}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                      <tr>
                        <th className="px-6 py-4">{t.id}</th>
                        <th className="px-6 py-4">{t.type}</th>
                        <th className="px-6 py-4">{t.risk}</th>
                        <th className="px-6 py-4">{t.status}</th>
                        <th className="px-6 py-4 text-right">{t.action}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cases.slice(0, 5).map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-mono text-sm text-slate-600">{c.id}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-800">{c.type}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${c.riskScore > 80 ? 'bg-red-100 text-red-700' : c.riskScore > 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                              {c.riskScore}%
                            </span>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${c.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                                c.status === 'investigating' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-brand-600 hover:text-brand-800 text-sm font-medium">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cases' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-800">Case Management</h1>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                    <Filter className="w-4 h-4" /> <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700">
                    <ArrowUpRight className="w-4 h-4" /> <span>Export</span>
                  </button>
                </div>
              </div>

               <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                      <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cases.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-mono text-sm text-slate-500">{c.id}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-800">{c.type}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-xs">{c.description}</td>
                          <td className="px-6 py-4 text-sm text-slate-500">{new Date(c.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <select 
                              value={c.status}
                              onChange={(e) => onUpdateStatus(c.id, e.target.value as any)}
                              className="text-xs border-none bg-slate-100 rounded-full px-3 py-1 font-medium focus:ring-0 cursor-pointer text-slate-800"
                            >
                              <option value="pending">Pending</option>
                              <option value="investigating">Investigating</option>
                              <option value="resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-slate-400 hover:text-brand-600 text-sm font-medium">Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-insights' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h1 className="text-2xl font-bold text-slate-800">AI Predictive Analysis</h1>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
                <Activity className="w-16 h-16 text-brand-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900">Harassment Pattern Detection</h3>
                <p className="text-slate-500 max-w-lg mx-auto mb-6">
                  The AI system is currently analyzing incoming reports for cross-platform patterns. 
                  Early warning system is active for Dhaka and Chittagong regions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-sm text-red-600 font-bold uppercase mb-1">High Risk Areas</p>
                    <p className="text-2xl font-bold text-slate-800">3</p>
                    <p className="text-xs text-slate-500 mt-2">University clusters identified</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-600 font-bold uppercase mb-1">Deepfake Surge</p>
                    <p className="text-2xl font-bold text-slate-800">+12%</p>
                    <p className="text-xs text-slate-500 mt-2">Increase from last week</p>
                  </div>
                   <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-sm text-green-600 font-bold uppercase mb-1">Auto-Flagged</p>
                    <p className="text-2xl font-bold text-slate-800">45</p>
                    <p className="text-xs text-slate-500 mt-2">Reports filtered as spam</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-300 pb-10">
              <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Navigation/General */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* General Configuration */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                       <h3 className="font-bold text-lg text-slate-800">General Configuration</h3>
                       <button className="text-brand-600 text-sm font-medium hover:underline flex items-center">
                        <Save className="w-4 h-4 mr-1" /> Save Changes
                       </button>
                    </div>
                    <div className="p-6 space-y-4">
                       <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">Maintenance Mode</p>
                            <p className="text-sm text-slate-500">Disable access for public users temporarily.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                          </label>
                       </div>
                       <hr className="border-slate-100" />
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name</label>
                          <input type="text" defaultValue="Nirapad Digital Admin" className="w-full !bg-slate-50 border-slate-300 rounded-lg p-2.5 text-slate-900" />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Support Contact Email</label>
                          <input type="email" defaultValue="support@nirapad.digital" className="w-full !bg-slate-50 border-slate-300 rounded-lg p-2.5 text-slate-900" />
                       </div>
                    </div>
                  </div>

                  {/* AI Configuration */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                     <div className="p-6 border-b border-slate-100">
                       <h3 className="font-bold text-lg text-slate-800 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-brand-600" />
                        AI Safety Thresholds
                       </h3>
                    </div>
                    <div className="p-6 space-y-6">
                       <div>
                          <div className="flex justify-between mb-2">
                             <label className="text-sm font-medium text-slate-700">High Risk Flagging Score</label>
                             <span className="text-sm font-bold text-brand-600">85%</span>
                          </div>
                          <input type="range" min="0" max="100" defaultValue="85" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600" />
                          <p className="text-xs text-slate-500 mt-2">Cases with risk score above this value will trigger immediate alerts.</p>
                       </div>
                       <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">Auto-Archive Spam</p>
                            <p className="text-sm text-slate-500">Automatically resolve cases with risk score &lt; 10%.</p>
                          </div>
                           <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                          </label>
                       </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: User/Security */}
                <div className="space-y-6">
                   <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                     <div className="p-6 border-b border-slate-100">
                       <h3 className="font-bold text-lg text-slate-800">My Account</h3>
                    </div>
                    <div className="p-6 space-y-4">
                       <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-600">AD</div>
                          <div>
                             <p className="font-bold text-slate-900">Admin User</p>
                             <p className="text-sm text-slate-500">Super Admin</p>
                          </div>
                       </div>
                       <button className="w-full border border-slate-300 rounded-lg py-2 text-sm font-medium hover:bg-slate-50 text-slate-700">Edit Profile</button>
                       <button className="w-full border border-slate-300 rounded-lg py-2 text-sm font-medium hover:bg-slate-50 text-slate-700">Change Password</button>
                    </div>
                   </div>

                   <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                     <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                       <h3 className="font-bold text-lg text-slate-800">Team Access</h3>
                       <button className="text-slate-400 hover:text-brand-600"><Plus className="w-5 h-5" /></button>
                    </div>
                    <div className="p-4">
                       <div className="space-y-3">
                          {['Sarah K. (Legal)', 'Rafiq M. (Police)', 'Tania A. (Support)'].map((name, i) => (
                             <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                                <div className="flex items-center space-x-3">
                                   <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold">
                                      {name.charAt(0)}
                                   </div>
                                   <span className="text-sm font-medium text-slate-700">{name}</span>
                                </div>
                                <span className="text-xs text-slate-400 group-hover:text-brand-600 font-medium">Edit</span>
                             </div>
                          ))}
                       </div>
                       <button className="mt-4 w-full bg-slate-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-slate-800 transition-colors">Add New User</button>
                    </div>
                   </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
