import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import AdminDashboard from "@/components/AdminDashboard";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Home from "@/pages/Home";
import EducationPage from "@/pages/EducationPage";
import LegalPage from "@/pages/LegalPage";
import NewsPage from "@/pages/NewsPage";
import ReportForm from "@/pages/ReportForm";
import AboutPage from "@/pages/AboutPage";
import PrivacyPage from "@/pages/PrivacyPage";
import VolunteerPage from "@/pages/VolunteerPage";

import { Language, Case, ReportType, Page } from "@/types";

import { useLanguage } from "@/hooks/useLanguage";

function App() {
  const { currentLang, setCurrentLang } = useLanguage("bn");
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [showAdmin, setShowAdmin] = useState(false);

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showAdmin) {
    return (
      <AdminDashboard
        currentLang={currentLang}
        onClose={() => setShowAdmin(false)}
      />
    );
  }

  // Router Logic
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home currentLang={currentLang} onNavigate={handleNavigation} />;
      case "problems":
        return <EducationPage currentLang={currentLang} />;
      case "legal":
        return <LegalPage currentLang={currentLang} />;
      case "news":
        return <NewsPage currentLang={currentLang} />;
      case "report":
        return <ReportForm />;
      case "about":
        return <AboutPage currentLang={currentLang} />;
      case "privacy":
        return <PrivacyPage currentLang={currentLang} />;
      case "volunteer":
        return <VolunteerPage currentLang={currentLang} />;
      default:
        return <Home currentLang={currentLang} onNavigate={handleNavigation} />;
    }
  };

  return (
    <Layout
      currentLang={currentLang}
      setLanguage={setCurrentLang}
      onAdminClick={() => setShowAdmin(true)}
      onNavigate={handleNavigation}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
