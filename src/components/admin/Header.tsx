import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, ShieldAlert, Users, ChevronDown, User, Settings, Mail, LogOut } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
    activeTab: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, activeTab, onLogout }) => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

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

    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm z-20 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700 transition-colors">
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
                                onClick={onLogout} 
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
    );
};

export default Header;
