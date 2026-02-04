import React, { useState, useEffect } from "react";
import { Case, Language } from "@/types";
import { translations } from "@/utils/translations";
import { useAuth } from "@/context/AuthContext";
import { complaintService } from "@/services/complaintService";
import Sidebar from "./admin/Sidebar";
import Header from "./admin/Header";
import Login from "./admin/Login";
import StatsGrid from "./admin/StatsGrid";
import RecentCasesTable from "./admin/RecentCasesTable";
import CaseManagement from "./admin/CaseManagement";
import AIInsights from "./admin/AIInsights";
import SettingsTab from "./admin/SettingsTab";

interface AdminDashboardProps {
  currentLang: Language;
  onClose: () => void;
}

type Tab = "dashboard" | "cases" | "ai-insights" | "settings";

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentLang,
  onClose,
}) => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [backendCases, setBackendCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[currentLang].admin;

  useEffect(() => {
    if (token) {
      const fetchCases = async () => {
        try {
          const res = await complaintService.getAll();
          setBackendCases(res.data);
        } catch (err) {
          console.error("Failed to fetch cases", err);
        } finally {
          setLoading(false);
        }
      };
      fetchCases();
    }
  }, [token]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await complaintService.updateStatus(id, status);
      setBackendCases((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c)),
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (!user) {
    return <Login onLogin={() => {}} onClose={onClose} />;
  }

  // Map backend structure to frontend structure if necessary
  const cases = backendCases.map((c) => ({
    id: c.trackingId,
    _id: c._id,
    type: c.type,
    description: c.description,
    status: c.status,
    date: c.createdAt,
    isAnonymous: c.isAnonymous,
    victimName: c.victimName,
    victimPhone: c.victimPhone,
    evidence: c.evidence || [],
    riskScore: 0, // AI insights can be calculated later
    evidenceCount: c.evidence?.length || 0,
  })) as any;

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex text-slate-900">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onClose}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
        <Header
          activeTab={activeTab}
          onMenuClick={() => setIsSidebarOpen(true)}
          onLogout={onClose}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-500 font-medium">
                Loading Dashboard Data...
              </p>
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h1 className="text-2xl font-bold text-slate-800">
                    {t.title}
                  </h1>
                  <StatsGrid cases={cases} t={t} />
                  <RecentCasesTable cases={cases} t={t} />
                </div>
              )}

              {activeTab === "cases" && (
                <CaseManagement
                  cases={cases}
                  onUpdateStatus={handleUpdateStatus}
                />
              )}

              {activeTab === "ai-insights" && <AIInsights />}

              {activeTab === "settings" && (
                <SettingsTab onClose={onClose} setIsAuthenticated={() => {}} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
