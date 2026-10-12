import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Language, Navigate } from '@/types';
import { pick } from '@/data/i18n';
import { topics } from '@/data/topics';
import PageHeader from '@/components/support/PageHeader';
import TopicCard from '@/components/support/TopicCard';

interface HelpCenterPageProps {
  currentLang: Language;
  onNavigate: Navigate;
}

const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ currentLang, onNavigate }) => {
  const lang = currentLang;
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const shown = q
    ? topics.filter((t) =>
        [t.title, t.short, t.summary].some((l) => l.en.toLowerCase().includes(q) || l.bn.includes(query.trim())),
      )
    : topics;

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, { en: 'Help center', bn: 'সহায়তা কেন্দ্র' })}
        title={pick(lang, { en: 'Find the support that fits what you are going through', bn: 'আপনি যা পার করছেন তার জন্য উপযুক্ত সহায়তা খুঁজুন' })}
        subtitle={pick(lang, {
          en: 'Every guide is written for survivors and the people who care about them. Read at your own pace.',
          bn: 'প্রতিটি গাইড ভুক্তভোগী এবং তাদের প্রিয়জনদের জন্য লেখা। নিজের গতিতে পড়ুন।',
        })}
      >
        <label className="relative mt-8 block max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={pick(lang, { en: 'Search, e.g. dowry, anxiety, blackmail', bn: 'খুঁজুন, যেমন যৌতুক, উদ্বেগ, ব্ল্যাকমেইল' })}
            className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-12 pr-5 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </label>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {shown.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((topic) => (
              <TopicCard key={topic.id} topic={topic} lang={lang} onClick={() => onNavigate('topic', topic.id)} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            {pick(lang, {
              en: 'No guide matches that search. You can still talk to someone on 109, any time.',
              bn: 'এই খোঁজের সাথে কোনো গাইড মেলেনি। তবুও যেকোনো সময় ১০৯-এ কারো সাথে কথা বলতে পারেন।',
            })}
          </p>
        )}
      </section>
    </>
  );
};

export default HelpCenterPage;
