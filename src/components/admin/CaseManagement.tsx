import React, { useState } from "react";
import { Filter, ArrowUpRight } from "lucide-react";
import { Case } from "@/types";
import CaseDetailModal from "./CaseDetailModal";

interface CaseManagementProps {
  cases: Case[];
  onUpdateStatus: (id: string, status: Case["status"]) => void;
}

const CaseManagement: React.FC<CaseManagementProps> = ({
  cases,
  onUpdateStatus,
}) => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  return (
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
                <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-slate-500">
                    {c.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {c.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-xs">
                    {c.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(c.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={c.status}
                      onChange={(e) =>
                        onUpdateStatus(c._id, e.target.value as any)
                      }
                      className="text-xs border-none bg-slate-100 rounded-full px-3 py-1 font-medium focus:ring-0 cursor-pointer text-slate-800"
                    >
                      <option value="pending">Pending</option>
                      <option value="investigating">Investigating</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedCase(c)}
                      className="text-brand-600 hover:text-brand-800 text-sm font-bold bg-brand-50 px-3 py-1 rounded-lg transition-colors"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCase && (
        <CaseDetailModal
          caseItem={selectedCase}
          onClose={() => setSelectedCase(null)}
          onUpdateStatus={(id, status) => {
            onUpdateStatus(id, status);
            setSelectedCase((prev) => (prev ? { ...prev, status } : null));
          }}
        />
      )}
    </div>
  );
};

export default CaseManagement;
