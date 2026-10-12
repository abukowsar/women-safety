import { L } from './i18n';

export type HelplineId =
  | 'emergency'
  | 'women'
  | 'child'
  | 'legal'
  | 'callcentre'
  | 'emotional'
  | 'cyber'
  | 'occ';

export type HelplineCategory = 'emergency' | 'violence' | 'mental' | 'legal' | 'cyber';

export interface Helpline {
  id: HelplineId;
  name: L;
  number?: string; // dialable form; omitted for walk-in services
  display: L;
  desc: L;
  category: HelplineCategory;
  hours: L;
  free?: boolean;
}

// Bangladesh services. Numbers marked VERIFY should be re-checked with the
// provider before publishing, as they change more often than the national lines.
export const helplines: Record<HelplineId, Helpline> = {
  emergency: {
    id: 'emergency',
    name: { en: 'National Emergency Service', bn: 'জাতীয় জরুরি সেবা' },
    number: '999',
    display: { en: '999', bn: '৯৯৯' },
    desc: {
      en: 'Police, ambulance and fire service. Call if you or someone else is in immediate danger.',
      bn: 'পুলিশ, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস। আপনি বা অন্য কেউ তাৎক্ষণিক বিপদে থাকলে কল করুন।',
    },
    category: 'emergency',
    hours: { en: '24/7', bn: '২৪ ঘণ্টা' },
    free: true,
  },
  women: {
    id: 'women',
    name: {
      en: 'Helpline for Violence Against Women & Children',
      bn: 'নারী ও শিশু নির্যাতন প্রতিরোধ হেল্পলাইন',
    },
    number: '109',
    display: { en: '109', bn: '১০৯' },
    desc: {
      en: 'Government helpline for rape, domestic violence, dowry abuse, child marriage and harassment. Advice, referrals and rescue.',
      bn: 'ধর্ষণ, পারিবারিক সহিংসতা, যৌতুক, বাল্যবিবাহ ও হয়রানির জন্য সরকারি হেল্পলাইন। পরামর্শ, রেফারেল ও উদ্ধার সহায়তা।',
    },
    category: 'violence',
    hours: { en: '24/7', bn: '২৪ ঘণ্টা' },
    free: true,
  },
  child: {
    id: 'child',
    name: { en: 'Child Helpline', bn: 'চাইল্ড হেল্পলাইন' },
    number: '1098',
    display: { en: '1098', bn: '১০৯৮' },
    desc: {
      en: 'For children and young people at risk, and adults worried about a child.',
      bn: 'ঝুঁকিতে থাকা শিশু-কিশোর এবং কোনো শিশুকে নিয়ে চিন্তিত প্রাপ্তবয়স্কদের জন্য।',
    },
    category: 'violence',
    hours: { en: '24/7', bn: '২৪ ঘণ্টা' },
    free: true,
  },
  legal: {
    id: 'legal',
    name: { en: 'Government Legal Aid', bn: 'সরকারি আইনগত সহায়তা' },
    number: '16430',
    display: { en: '16430', bn: '১৬৪৩০' },
    desc: {
      en: 'Free legal advice and lawyers for people who cannot afford one (NLASO).',
      bn: 'যাদের আইনজীবী রাখার সামর্থ্য নেই তাদের জন্য বিনামূল্যে আইনি পরামর্শ ও আইনজীবী (জাতীয় আইনগত সহায়তা প্রদান সংস্থা)।',
    },
    category: 'legal',
    hours: { en: 'Daily', bn: 'প্রতিদিন' },
    free: true,
  },
  callcentre: {
    id: 'callcentre',
    name: { en: 'National Call Centre', bn: 'জাতীয় কল সেন্টার' },
    number: '333',
    display: { en: '333', bn: '৩৩৩' },
    desc: {
      en: 'Government information line. You can report a planned child marriage here.',
      bn: 'সরকারি তথ্যসেবা। আসন্ন বাল্যবিবাহের খবরও এখানে জানাতে পারেন।',
    },
    category: 'legal',
    hours: { en: '24/7', bn: '২৪ ঘণ্টা' },
  },
  emotional: {
    id: 'emotional',
    name: { en: 'Kaan Pete Roi (emotional support)', bn: 'কান পেতে রই (মানসিক সহায়তা)' },
    number: '09612119911', // VERIFY
    display: { en: '09612-119911', bn: '০৯৬১২-১১৯৯১১' },
    desc: {
      en: 'Confidential listening for anyone feeling hopeless, overwhelmed or thinking about suicide.',
      bn: 'হতাশ, ভারাক্রান্ত বা আত্মহত্যার কথা ভাবছেন এমন যে কারো জন্য গোপনীয়ভাবে কথা শোনার সেবা।',
    },
    category: 'mental',
    hours: { en: 'See provider for hours', bn: 'সময়সূচি সংস্থা থেকে জেনে নিন' },
  },
  cyber: {
    id: 'cyber',
    name: { en: 'Police Cyber Support for Women (PCSW)', bn: 'পুলিশ সাইবার সাপোর্ট ফর উইমেন (PCSW)' },
    number: '01320000888', // VERIFY
    display: { en: '01320-000888', bn: '০১৩২০-০০০৮৮৮' },
    desc: {
      en: 'Bangladesh Police unit for online harassment, blackmail and image abuse. Run by women officers.',
      bn: 'অনলাইন হয়রানি, ব্ল্যাকমেইল ও ছবি অপব্যবহারের জন্য বাংলাদেশ পুলিশের ইউনিট। নারী কর্মকর্তারা পরিচালনা করেন।',
    },
    category: 'cyber',
    hours: { en: 'See provider for hours', bn: 'সময়সূচি সংস্থা থেকে জেনে নিন' },
  },
  occ: {
    id: 'occ',
    name: { en: 'One-Stop Crisis Centre (OCC)', bn: 'ওয়ান-স্টপ ক্রাইসিস সেন্টার (OCC)' },
    display: { en: 'Walk in', bn: 'সরাসরি যান' },
    desc: {
      en: 'At government medical college hospitals. Medical care, forensic exam, police and legal help, and counselling in one place.',
      bn: 'সরকারি মেডিকেল কলেজ হাসপাতালে অবস্থিত। চিকিৎসা, ফরেনসিক পরীক্ষা, পুলিশ ও আইনি সহায়তা এবং কাউন্সেলিং এক জায়গায়।',
    },
    category: 'violence',
    hours: { en: '24/7', bn: '২৪ ঘণ্টা' },
    free: true,
  },
};

export const helplineCategories: { id: HelplineCategory; label: L }[] = [
  { id: 'emergency', label: { en: 'Emergency', bn: 'জরুরি' } },
  { id: 'violence', label: { en: 'Violence & abuse', bn: 'সহিংসতা ও নির্যাতন' } },
  { id: 'mental', label: { en: 'Mental health', bn: 'মানসিক স্বাস্থ্য' } },
  { id: 'legal', label: { en: 'Legal help', bn: 'আইনি সহায়তা' } },
  { id: 'cyber', label: { en: 'Online abuse', bn: 'অনলাইন নির্যাতন' } },
];
