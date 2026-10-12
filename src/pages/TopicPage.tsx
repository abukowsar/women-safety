import React from 'react';
import { ArrowLeft, AlertTriangle, Phone, Eye, ListChecks, HeartHandshake, Scale, FileText, PhoneCall } from 'lucide-react';
import { Language, Navigate } from '@/types';
import { pick, ui } from '@/data/i18n';
import { getTopic, topics, TopicId } from '@/data/topics';
import { helplines } from '@/data/helplines';
import { accents, topicIcons } from '@/components/support/topicStyles';
import HelplineCard from '@/components/support/HelplineCard';
import TopicCard from '@/components/support/TopicCard';
import BreathingExercise from '@/components/support/BreathingExercise';
import Grounding from '@/components/support/Grounding';

interface TopicPageProps {
  currentLang: Language;
  topicId: TopicId;
  onNavigate: Navigate;
}

const Block: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
    <h2 className="flex items-center gap-2.5 text-xl font-semibold text-slate-900">
      <Icon className="h-5 w-5 text-brand-600" /> {title}
    </h2>
    <div className="mt-5">{children}</div>
  </section>
);

const TopicPage: React.FC<TopicPageProps> = ({ currentLang, topicId, onNavigate }) => {
  const lang = currentLang;
  const topic = getTopic(topicId);
  const a = accents[topic.accent];
  const Icon = topicIcons[topic.id];
  const related = topics.filter((t) => t.id !== topic.id).slice(0, 4);
  const isMind = topic.id === 'mental-health' || topic.id === 'suicide-prevention';

  return (
    <>
      <section className={`relative overflow-hidden bg-gradient-to-b ${a.hero}`}>
        <div className="bg-grain absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
          <button
            onClick={() => onNavigate('help')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {pick(lang, ui.back)}
          </button>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
            <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-3xl ${a.icon}`}>
              <Icon className="h-8 w-8" />
            </span>
            <div>
              <h1 className="font-display text-4xl font-semibold text-brand-950 sm:text-5xl">{pick(lang, topic.title)}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">{pick(lang, topic.summary)}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-red-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-100 text-red-700">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <p className="flex-1 font-medium leading-relaxed text-slate-800">{pick(lang, topic.urgent)}</p>
            <div className="flex shrink-0 gap-2">
              <a href="tel:999" className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700">
                <Phone className="h-4 w-4" /> {lang === 'bn' ? '৯৯৯' : '999'}
              </a>
              {topic.helplines.filter((id) => id !== 'emergency' && helplines[id].number).slice(0, 1).map((id) => (
                <a
                  key={id}
                  href={`tel:${helplines[id].number}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-900"
                >
                  <Phone className="h-4 w-4" /> {pick(lang, helplines[id].display)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 pt-6 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-6 lg:col-span-8">
          {isMind && <BreathingExercise lang={lang} />}

          <Block icon={Eye} title={pick(lang, { en: 'Signs to look for', bn: 'যে লক্ষণগুলো খেয়াল করবেন' })}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {topic.signs.map((s, i) => (
                <li key={i} className={`flex gap-3 rounded-2xl p-4 text-sm leading-relaxed text-slate-700 ${a.soft}`}>
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.dot}`} />
                  {pick(lang, s)}
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={ListChecks} title={pick(lang, { en: 'What you can do', bn: 'আপনি যা করতে পারেন' })}>
            <ol className="space-y-4">
              {topic.steps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-800 text-sm font-semibold text-white">
                    {lang === 'bn' ? (i + 1).toLocaleString('bn-BD') : i + 1}
                  </span>
                  <p className="pt-1 leading-relaxed text-slate-700">{pick(lang, s)}</p>
                </li>
              ))}
            </ol>
          </Block>

          {isMind && <Grounding lang={lang} />}

          <Block icon={HeartHandshake} title={pick(lang, { en: 'If someone you know is affected', bn: 'পরিচিত কেউ আক্রান্ত হলে' })}>
            <ul className="space-y-3">
              {topic.helpOthers.map((s, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-slate-700">
                  <HeartHandshake className={`mt-1 h-4 w-4 shrink-0 ${a.text}`} />
                  {pick(lang, s)}
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={Scale} title={pick(lang, { en: 'Your rights under the law', bn: 'আইনে আপনার অধিকার' })}>
            <div className="space-y-4">
              {topic.rights.map((r, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-5">
                  <p className="font-semibold text-brand-800">{pick(lang, r.law)}</p>
                  <p className="mt-1.5 leading-relaxed text-slate-700">{pick(lang, r.text)}</p>
                </div>
              ))}
              <p className="text-xs text-slate-500">
                {pick(lang, {
                  en: 'General information only. For advice on your case, call free legal aid on 16430.',
                  bn: 'শুধুমাত্র সাধারণ তথ্য। আপনার নির্দিষ্ট বিষয়ে পরামর্শের জন্য বিনামূল্যে আইনগত সহায়তা ১৬৪৩০-এ কল করুন।',
                })}
              </p>
            </div>
          </Block>
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-4 lg:sticky lg:top-36">
            <h2 className="px-1 text-sm font-semibold uppercase tracking-wider text-slate-500">
              {pick(lang, { en: 'Who can help', bn: 'কারা সাহায্য করতে পারে' })}
            </h2>
            {topic.helplines.map((id) => (
              <HelplineCard key={id} helpline={helplines[id]} lang={lang} />
            ))}
            <button
              onClick={() => onNavigate('report')}
              className="flex w-full items-center gap-3 rounded-2xl bg-brand-950 p-5 text-left text-white hover:bg-brand-900"
            >
              <FileText className="h-5 w-5 shrink-0" />
              <span>
                <span className="block font-semibold">{pick(lang, ui.nav.report)}</span>
                <span className="text-sm text-brand-200">
                  {pick(lang, { en: 'Anonymous reporting is available', bn: 'পরিচয় গোপন রেখে অভিযোগ করা যায়' })}
                </span>
              </span>
            </button>
            <button
              onClick={() => onNavigate('callback')}
              className="flex w-full items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-left text-teal-900 hover:bg-teal-100"
            >
              <PhoneCall className="h-5 w-5 shrink-0" />
              <span>
                <span className="block font-semibold">{pick(lang, ui.nav.callback)}</span>
                <span className="text-sm text-teal-700">{pick(lang, { en: 'We call you at a safe time', bn: 'নিরাপদ সময়ে আমরা কল করব' })}</span>
              </span>
            </button>
          </div>
        </aside>
      </div>

      <section className="border-t border-slate-200/70 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl font-semibold text-brand-950">
            {pick(lang, { en: 'Other guides', bn: 'অন্যান্য গাইড' })}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((t) => (
              <TopicCard key={t.id} topic={t} lang={lang} onClick={() => onNavigate('topic', t.id)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TopicPage;
