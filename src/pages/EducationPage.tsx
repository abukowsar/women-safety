import React, { useEffect, useState } from "react";
import { Language } from "@/types";
import { translations } from "@/utils/translations";
import { contentService } from "@/services/contentService";

interface EducationPageProps {
  currentLang: Language;
}

const EducationCard: React.FC<{
  item: { title: string; content: string; category?: string };
}> = ({ item }) => (
  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-brand-200 hover:shadow-md transition-all">
    <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
    <p className="text-slate-600 text-sm mb-4">{item.content}</p>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between border-b border-slate-200 pb-1">
        <span className="text-slate-500">Category</span>
        <span className="font-medium text-blue-600">
          {item.category || "Awareness"}
        </span>
      </div>
    </div>
  </div>
);

const EducationPage: React.FC<EducationPageProps> = ({ currentLang }) => {
  const t = translations[currentLang].education;
  const [awarenessData, setAwarenessData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwareness = async () => {
      try {
        const res = await contentService.getAwareness();
        setAwarenessData(res.data);
      } catch (err) {
        console.error("Failed to fetch awareness content", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAwareness();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 text-xl text-slate-500">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {awarenessData.map((item, index) => (
          <EducationCard key={index} item={item} />
        ))}
      </div>

      <div className="mt-16 border-t border-slate-100 pt-16">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          {currentLang === "en"
            ? "Common Awareness Topics"
            : "সাধারণ সচেতনতামূলক বিষয়"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-80">
          {t.cards.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-slate-100"
            >
              <h4 className="font-bold text-slate-700 mb-2">{item.title}</h4>
              <p className="text-slate-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
