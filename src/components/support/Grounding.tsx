import React, { useState } from 'react';
import { Eye, Hand, Ear, Flower2, Sparkles, RotateCcw } from 'lucide-react';
import { Language } from '@/types';
import { pick } from '@/data/i18n';

const steps = [
  { n: 5, icon: Eye, text: { en: 'things you can see', bn: 'টি জিনিস যা আপনি দেখতে পাচ্ছেন' } },
  { n: 4, icon: Hand, text: { en: 'things you can touch', bn: 'টি জিনিস যা আপনি ছুঁতে পারছেন' } },
  { n: 3, icon: Ear, text: { en: 'things you can hear', bn: 'টি শব্দ যা আপনি শুনতে পাচ্ছেন' } },
  { n: 2, icon: Flower2, text: { en: 'things you can smell', bn: 'টি গন্ধ যা আপনি পাচ্ছেন' } },
  { n: 1, icon: Sparkles, text: { en: 'thing you can taste, or one kind thought about yourself', bn: 'টি স্বাদ, বা নিজের সম্পর্কে একটি ভালো কথা' } },
];

const bnDigits = ['০', '১', '২', '৩', '৪', '৫'];

const Grounding: React.FC<{ lang: Language }> = ({ lang }) => {
  const [done, setDone] = useState(0);

  return (
    <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-violet-800">
          {pick(lang, { en: '5-4-3-2-1 grounding', bn: '৫-৪-৩-২-১ গ্রাউন্ডিং' })}
        </h3>
        {done > 0 && (
          <button onClick={() => setDone(0)} className="text-violet-600 hover:text-violet-800" aria-label="Restart">
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-600">
        {pick(lang, {
          en: 'For panic, flashbacks or feeling far away. Tap each step when you have noticed them.',
          bn: 'আতঙ্ক, পুরনো স্মৃতি ফিরে আসা বা নিজেকে বিচ্ছিন্ন লাগলে। প্রতিটি ধাপ খেয়াল করা হলে ট্যাপ করুন।',
        })}
      </p>
      <ol className="mt-6 space-y-2.5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const complete = i < done;
          const active = i === done;
          return (
            <li key={s.n}>
              <button
                onClick={() => active && setDone(i + 1)}
                disabled={!active}
                className={`flex w-full items-center gap-4 rounded-2xl border p-3.5 text-left transition-all ${
                  complete
                    ? 'border-violet-200 bg-violet-100/60 text-violet-900'
                    : active
                    ? 'border-violet-300 bg-white shadow-md'
                    : 'border-transparent bg-white/60 text-slate-400'
                }`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-lg font-semibold ${complete || active ? 'bg-violet-600 text-white' : 'bg-slate-100'}`}>
                  {lang === 'bn' ? bnDigits[s.n] : s.n}
                </span>
                <span className="flex-1 text-sm font-medium">{pick(lang, s.text)}</span>
                <Icon className="h-5 w-5 shrink-0 opacity-70" />
              </button>
            </li>
          );
        })}
      </ol>
      {done === steps.length && (
        <p className="animate-fade-up mt-5 rounded-2xl bg-violet-600 p-4 text-sm text-white">
          {pick(lang, {
            en: 'Well done. You are here, in this moment. Take one more slow breath.',
            bn: 'খুব ভালো। আপনি এখানে, এই মুহূর্তে আছেন। আরও একবার ধীরে শ্বাস নিন।',
          })}
        </p>
      )}
    </div>
  );
};

export default Grounding;
