import { Language } from '@/types';

/** Bilingual text. Languages without their own copy fall back to English. */
export interface L {
  en: string;
  bn: string;
}

export const pick = (lang: Language, text: L): string =>
  lang === 'bn' ? text.bn : text.en;

export const pickList = (lang: Language, items: L[]): string[] =>
  items.map((item) => pick(lang, item));

/** Shared UI strings for the redesigned shell and support pages. */
export const ui = {
  brand: { en: 'Nirapad', bn: 'নিরাপদ' },
  tagline: { en: "South Asia Women's Safety Network", bn: 'দক্ষিণ এশিয়া নারী নিরাপত্তা নেটওয়ার্ক' },
  crisisPrompt: { en: 'In danger right now?', bn: 'এই মুহূর্তে বিপদে?' },
  emergency: { en: 'Emergency', bn: 'জরুরি' },
  womenHelpline: { en: 'Women & children', bn: 'নারী ও শিশু' },
  quickExit: { en: 'Quick exit', bn: 'দ্রুত বের হোন' },
  quickExitHint: {
    en: 'Leaves this site instantly. You can also press Esc twice.',
    bn: 'সাথে সাথে এই সাইট ছেড়ে যাবে। Esc দুবার চাপলেও কাজ করবে।',
  },
  nav: {
    home: { en: 'Home', bn: 'হোম' },
    help: { en: 'Get help', bn: 'সহায়তা' },
    tools: { en: 'Safety tools', bn: 'নিরাপত্তা টুল' },
    helplines: { en: 'Helplines', bn: 'হেল্পলাইন' },
    legal: { en: 'Your rights', bn: 'আপনার অধিকার' },
    more: { en: 'More', bn: 'আরও' },
    news: { en: 'News', bn: 'খবর' },
    about: { en: 'About us', bn: 'আমাদের সম্পর্কে' },
    volunteer: { en: 'Volunteer', bn: 'স্বেচ্ছাসেবী হন' },
    privacy: { en: 'Privacy', bn: 'গোপনীয়তা' },
    report: { en: 'Report safely', bn: 'নিরাপদে অভিযোগ' },
    track: { en: 'Track a report', bn: 'অভিযোগের অবস্থা' },
    callback: { en: 'Request a call back', bn: 'কল-ব্যাক চান' },
    admin: { en: 'Staff login', bn: 'স্টাফ লগইন' },
    language: { en: 'Language', bn: 'ভাষা' },
  },
  call: { en: 'Call', bn: 'কল করুন' },
  free: { en: 'Free', bn: 'বিনামূল্যে' },
  allDay: { en: '24/7', bn: '২৪/৭' },
  learnMore: { en: 'Read the guide', bn: 'গাইড পড়ুন' },
  back: { en: 'All topics', bn: 'সব বিষয়' },
  notYourFault: {
    en: 'What happened to you is not your fault.',
    bn: 'আপনার সাথে যা ঘটেছে তার জন্য আপনি দায়ী নন।',
  },
  confidential: {
    en: 'Confidential · No login needed · Leave any time',
    bn: 'গোপনীয় · লগইন লাগবে না · যেকোনো সময় বের হতে পারেন',
  },
};
