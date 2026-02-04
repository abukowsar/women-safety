import React from 'react';
import { Save, Shield, Plus } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
  setIsAuthenticated: (val: boolean) => void;
}

const SettingsTab: React.FC<SettingsProps> = ({ onClose, setIsAuthenticated }) => {
  return (
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
  );
};

export default SettingsTab;
