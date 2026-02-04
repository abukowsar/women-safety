import React from "react";
import {
  X,
  ExternalLink,
  Calendar,
  Shield,
  Phone,
  User,
  FileText,
} from "lucide-react";
import { Case } from "@/types";

interface CaseDetailModalProps {
  caseItem: Case;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Case["status"]) => void;
}

const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  caseItem,
  onClose,
  onUpdateStatus,
}) => {
  const backendUrl = "http://localhost:5000";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center">
              Case Details
              <span className="ml-3 px-2 py-0.5 bg-brand-100 text-brand-700 text-xs rounded-full font-mono uppercase">
                {caseItem.id}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Submitted on {new Date(caseItem.date).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Status Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <Shield className="w-4 h-4 mr-2" /> Current Status
              </h4>
              <select
                value={caseItem.status}
                onChange={(e) =>
                  onUpdateStatus(caseItem._id, e.target.value as any)
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:ring-2 focus:ring-brand-500 transition-all outline-none"
              >
                <option value="pending">Pending Review</option>
                <option value="investigating">Under Investigation</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Category
              </h4>
              <div className="p-3 bg-brand-50 border border-brand-100 rounded-xl text-brand-700 font-bold">
                {caseItem.type}
              </div>
            </div>
          </div>

          {/* Victim Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <User className="w-4 h-4 mr-2" /> Reporting Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Name</p>
                <p className="font-bold text-slate-800">
                  {caseItem.isAnonymous
                    ? "Anonymous User"
                    : caseItem.victimName || "Not Provided"}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Phone</p>
                <p className="font-bold text-slate-800">
                  {caseItem.isAnonymous
                    ? "N/A"
                    : caseItem.victimPhone || "Not Provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Incident Description */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <FileText className="w-4 h-4 mr-2" /> Incident Description
            </h4>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-wrap">
              {caseItem.description}
            </div>
          </div>

          {/* Evidence */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center">
              Evidence Attached ({caseItem.evidence?.length || 0})
            </h4>
            {caseItem.evidence && caseItem.evidence.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {caseItem.evidence.map((url, idx) => (
                  <a
                    key={idx}
                    href={`${backendUrl}${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 hover:border-brand-500 transition-all cursor-pointer"
                  >
                    <img
                      src={`${backendUrl}${url}`}
                      alt="Evidence"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                      <ExternalLink className="text-white w-6 h-6" />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                No evidence files provided.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailModal;
