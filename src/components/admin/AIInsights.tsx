import React from 'react';
import { Activity } from 'lucide-react';

const AIInsights: React.FC = () => {
  return (
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
  );
};

export default AIInsights;
