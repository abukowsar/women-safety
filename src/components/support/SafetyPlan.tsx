import React, { useState } from 'react';
import { ClipboardList, Check, Printer, Lock } from 'lucide-react';
import { Language } from '@/types';
import { L, pick } from '@/data/i18n';

const groups: { title: L; items: L[] }[] = [
  {
    title: { en: 'Prepare', bn: 'প্রস্তুতি' },
    items: [
      { en: 'Memorise 999 and 109, and one trusted person\'s number', bn: '৯৯৯, ১০৯ এবং একজন বিশ্বস্ত মানুষের নম্বর মুখস্থ রাখুন' },
      { en: 'Agree a code word that means "come now" or "call police"', bn: 'একটি সংকেত শব্দ ঠিক করুন যার অর্থ "এখনই আসো" বা "পুলিশ ডাকো"' },
      { en: 'Keep your phone charged, with some balance or data', bn: 'ফোনে চার্জ এবং কিছু ব্যালেন্স বা ডেটা রাখুন' },
    ],
  },
  {
    title: { en: 'Pack (keep with someone you trust)', bn: 'গুছিয়ে রাখুন (বিশ্বস্ত কারো কাছে)' },
    items: [
      { en: 'NID, birth certificate, marriage papers, children\'s documents', bn: 'এনআইডি, জন্মনিবন্ধন, বিয়ের কাগজ, সন্তানদের কাগজপত্র' },
      { en: 'Some cash, a spare key, and essential medicines', bn: 'কিছু নগদ টাকা, একটি অতিরিক্ত চাবি ও জরুরি ওষুধ' },
      { en: 'Copies of evidence: photos, medical slips, messages', bn: 'প্রমাণের কপি: ছবি, চিকিৎসার কাগজ, মেসেজ' },
    ],
  },
  {
    title: { en: 'If you need to leave', bn: 'বের হতে হলে' },
    items: [
      { en: 'Know the safest exit and where you would go first', bn: 'সবচেয়ে নিরাপদ পথ এবং প্রথমে কোথায় যাবেন তা জেনে রাখুন' },
      { en: 'Avoid rooms with weapons or no way out (kitchen, bathroom)', bn: 'অস্ত্র আছে বা বের হওয়ার পথ নেই এমন ঘর এড়িয়ে চলুন (রান্নাঘর, বাথরুম)' },
      { en: 'Ask 109 about shelters and protection orders', bn: 'আশ্রয়কেন্দ্র ও সুরক্ষা আদেশ সম্পর্কে ১০৯-এ জানুন' },
    ],
  },
  {
    title: { en: 'Stay safe online', bn: 'অনলাইনে নিরাপদ থাকুন' },
    items: [
      { en: 'Change passwords and turn on two-step verification', bn: 'পাসওয়ার্ড বদলান ও টু-স্টেপ ভেরিফিকেশন চালু করুন' },
      { en: 'Turn off location sharing and check for unknown apps', bn: 'লোকেশন শেয়ারিং বন্ধ করুন ও অপরিচিত অ্যাপ আছে কিনা দেখুন' },
      { en: 'Clear browser history after visiting support sites', bn: 'সহায়তা সাইট দেখার পর ব্রাউজার হিস্টোরি মুছে ফেলুন' },
    ],
  },
];

const SafetyPlan: React.FC<{ lang: Language }> = ({ lang }) => {
  // Kept in memory only: nothing is saved to the device or sent anywhere.
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-700">
            <ClipboardList className="h-5 w-5" />
            <h3 className="font-semibold">{pick(lang, { en: 'My safety plan', bn: 'আমার নিরাপত্তা পরিকল্পনা' })}</h3>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            {pick(lang, {
              en: 'Nothing you tick is saved or sent. It clears when you leave.',
              bn: 'আপনার টিক দেওয়া কিছুই সংরক্ষণ বা পাঠানো হয় না। পেজ ছাড়লে মুছে যায়।',
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-brand-700">
            {checked.size}/{total}
          </span>
          <button
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Printer className="h-4 w-4" /> {pick(lang, { en: 'Print', bn: 'প্রিন্ট' })}
          </button>
        </div>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${(checked.size / total) * 100}%` }} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {groups.map((g, gi) => (
          <div key={gi}>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">{pick(lang, g.title)}</h4>
            <ul className="space-y-2">
              {g.items.map((item, ii) => {
                const key = `${gi}-${ii}`;
                const on = checked.has(key);
                return (
                  <li key={key}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-slate-50">
                      <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(key)} />
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                          on ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {on && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span className={`text-sm leading-relaxed ${on ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        {pick(lang, item)}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyPlan;
