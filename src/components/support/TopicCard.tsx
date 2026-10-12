import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '@/types';
import { Topic } from '@/data/topics';
import { pick, ui } from '@/data/i18n';
import { accents, topicIcons } from './topicStyles';

interface TopicCardProps {
  topic: Topic;
  lang: Language;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, lang, onClick }) => {
  const Icon = topicIcons[topic.id];
  const a = accents[topic.accent];

  return (
    <button
      onClick={onClick}
      className={`group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/5 ${a.ring}`}
    >
      <span className={`grid h-12 w-12 place-items-center rounded-2xl ${a.icon}`}>
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-slate-900">{pick(lang, topic.title)}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{pick(lang, topic.short)}</p>
      <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${a.text}`}>
        {pick(lang, ui.learnMore)}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
      </span>
    </button>
  );
};

export default TopicCard;
