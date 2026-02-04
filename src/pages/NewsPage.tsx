import React, { useEffect, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Language } from "@/types";
import { translations } from "@/utils/translations";
import { mediaService } from "@/services/mediaService";

interface NewsPageProps {
  currentLang: Language;
}

const NewsPage: React.FC<NewsPageProps> = ({ currentLang }) => {
  const t = translations[currentLang].news;
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await mediaService.getNews();
        setNewsData(res.data);
      } catch (err) {
        console.error("Failed to fetch news content", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 text-xl text-slate-500">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsData.length > 0
          ? newsData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-slate-100"
              >
                <div className="h-48 bg-slate-200 relative">
                  <img
                    src={
                      item.image
                        ? `http://localhost:5000${item.image}`
                        : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-brand-600 text-white px-2 py-1 text-xs font-bold rounded shadow-lg">
                    {item.category || "News"}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-slate-400 text-xs mb-2">
                    <Calendar className="w-3 h-3 mr-1" />{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <h4 className="font-bold text-lg text-slate-800 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {item.content}
                  </p>
                  <button className="text-brand-600 text-sm font-medium hover:underline flex items-center">
                    {currentLang === "en" ? "Read More" : "বিস্তারিত"}{" "}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            ))
          : t.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-slate-100"
              >
                <div className="h-40 bg-slate-200 relative">
                  <img
                    src={`https://source.unsplash.com/random/400x200?news,technology,${index}`}
                    alt="News"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-brand-600 px-2 py-1 text-xs font-bold rounded">
                    {item.tag}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-slate-400 text-xs mb-2">
                    <Calendar className="w-3 h-3 mr-1" /> {item.date}
                  </div>
                  <h4 className="font-bold text-lg text-slate-800 mb-2">
                    {item.title}
                  </h4>
                  <button className="text-brand-600 text-sm font-medium hover:underline flex items-center">
                    {currentLang === "en" ? "Read More" : "বিস্তারিত"}{" "}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default NewsPage;
