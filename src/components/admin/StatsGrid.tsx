import React from 'react';
import { BarChart2, Clock, CheckCircle } from 'lucide-react';
import { Case } from '@/types';

interface StatsGridProps {
  cases: Case[];
  t: any; // Using any for translation object to avoid complex type duplication for now
}

const StatsGrid: React.FC<StatsGridProps> = ({ cases, t }) => {
  const totalCases = cases.length;
  const pendingCases = cases.filter(c => c.status === 'pending').length;
  const resolvedCases = cases.filter(c => c.status === 'resolved').length;

  return (
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
  );
};

export default StatsGrid;
