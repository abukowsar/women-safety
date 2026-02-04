import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      alert('Invalid credentials. Use admin/admin');
    }
  };

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
};

export default Login;
