import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LoginProps {
  onLogin: () => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      onLogin();
    } catch (err: any) {
      setError(err || "Invalid credentials");
    } finally {
      setLoading(false);
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
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white text-slate-900 border-slate-300 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2.5"
              placeholder="authority@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white text-slate-900 border-slate-300 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2.5"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 text-sm"
          >
            Return to Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
