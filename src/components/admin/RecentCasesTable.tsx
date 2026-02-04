import React from "react";
import { Case } from "@/types";

interface RecentCasesTableProps {
  cases: Case[];
  t: any;
}

const RecentCasesTable: React.FC<RecentCasesTableProps> = ({ cases, t }) => {
  return (
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
              <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-slate-600">
                  {c.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  {c.type}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${c.riskScore > 80 ? "bg-red-100 text-red-700" : c.riskScore > 50 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                  >
                    {c.riskScore}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${
                      c.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : c.status === "investigating"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-600 hover:text-brand-800 text-sm font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCasesTable;
