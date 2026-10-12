import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import AdminApp from "@/admin/AdminApp";

// Pages
import Home from "@/pages/Home";
import EducationPage from "@/pages/EducationPage";
import LegalPage from "@/pages/LegalPage";
import NewsPage from "@/pages/NewsPage";
import ReportForm from "@/pages/ReportForm";
import AboutPage from "@/pages/AboutPage";
import PrivacyPage from "@/pages/PrivacyPage";
import VolunteerPage from "@/pages/VolunteerPage";
import HelpCenterPage from "@/pages/HelpCenterPage";
import TopicPage from "@/pages/TopicPage";
import ToolsPage from "@/pages/ToolsPage";
import HelplinesPage from "@/pages/HelplinesPage";
import TrackPage from "@/pages/TrackPage";
import CallbackPage from "@/pages/CallbackPage";

import { Navigate, Page } from "@/types";
import { TopicId } from "@/data/topics";

import { useLanguage } from "@/hooks/useLanguage";

function App() {
  const { currentLang, setCurrentLang } = useLanguage("bn");
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentTopic, setCurrentTopic] = useState<TopicId>("mental-health");

  // Lets CSS pick the right font for the script in use.
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleNavigation: Navigate = (page, topic) => {
    if (topic) setCurrentTopic(topic);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (window.location.pathname.startsWith("/admin")) {
    return <AdminApp />;
  }

  // Router Logic
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home currentLang={currentLang} onNavigate={handleNavigation} />;
      case "help":
        return <HelpCenterPage currentLang={currentLang} onNavigate={handleNavigation} />;
      case "topic":
        return <TopicPage currentLang={currentLang} topicId={currentTopic} onNavigate={handleNavigation} />;
      case "tools":
        return <ToolsPage currentLang={currentLang} />;
      case "helplines":
        return <HelplinesPage currentLang={currentLang} onNavigate={handleNavigation} />;
      case "problems":
        return <EducationPage currentLang={currentLang} />;
      case "legal":
        return <LegalPage currentLang={currentLang} />;
      case "news":
        return <NewsPage currentLang={currentLang} />;
      case "report":
        return <ReportForm currentLang={currentLang} onNavigate={handleNavigation} />;
      case "track":
        return <TrackPage currentLang={currentLang} onNavigate={handleNavigation} />;
      case "callback":
        return <CallbackPage currentLang={currentLang} onNavigate={handleNavigation} />;
      case "about":
        return <AboutPage currentLang={currentLang} />;
      case "privacy":
        return <PrivacyPage currentLang={currentLang} />;
      case "volunteer":
        return <VolunteerPage currentLang={currentLang} onNavigate={handleNavigation} />;
      default:
        return <Home currentLang={currentLang} onNavigate={handleNavigation} />;
    }
  };

  return (
    <Layout
      currentLang={currentLang}
      currentPage={currentPage}
      setLanguage={setCurrentLang}
      onAdminClick={() => window.location.assign("/admin")}
      onNavigate={handleNavigation}
    >
      <div key={currentPage + currentTopic} className="animate-fade-up">
        {renderPage()}
      </div>
    </Layout>
  );
}

export default App;
