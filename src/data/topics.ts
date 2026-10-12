import { L } from './i18n';
import { HelplineId } from './helplines';

export type TopicId =
  | 'mental-health'
  | 'suicide-prevention'
  | 'sexual-violence'
  | 'domestic-violence'
  | 'dowry'
  | 'child-marriage'
  | 'harassment'
  | 'online-safety';

export type TopicAccent = 'teal' | 'sky' | 'rose' | 'orange' | 'amber' | 'violet' | 'fuchsia' | 'indigo';

export interface Topic {
  id: TopicId;
  accent: TopicAccent;
  title: L;
  short: L;
  summary: L;
  /** Shown first, in a highlighted box, for urgent situations. */
  urgent: L;
  signs: L[];
  steps: L[];
  helpOthers: L[];
  rights: { law: L; text: L }[];
  helplines: HelplineId[];
}

export const topics: Topic[] = [
  {
    id: 'mental-health',
    accent: 'teal',
    title: { en: 'Mental health', bn: 'মানসিক স্বাস্থ্য' },
    short: {
      en: 'Stress, anxiety, depression and trauma are common, and they can get better.',
      bn: 'মানসিক চাপ, উদ্বেগ, বিষণ্নতা ও ট্রমা খুবই সাধারণ, এবং এগুলো সেরে ওঠে।',
    },
    summary: {
      en: 'Many women carry heavy loads: family pressure, violence, money worries, loneliness. Feeling low, anxious or numb is not weakness. Talking to someone and small daily habits can make a real difference.',
      bn: 'অনেক নারী ভারী বোঝা বয়ে বেড়ান: পারিবারিক চাপ, সহিংসতা, অর্থকষ্ট, একাকীত্ব। মন খারাপ, উদ্বিগ্ন বা অনুভূতিহীন লাগা দুর্বলতা নয়। কারো সাথে কথা বলা এবং ছোট ছোট দৈনন্দিন অভ্যাস সত্যিই পরিবর্তন আনতে পারে।',
    },
    urgent: {
      en: 'If you are thinking about ending your life, please call 999 or reach out to an emotional support line now. You do not have to go through this alone.',
      bn: 'আপনি যদি জীবন শেষ করার কথা ভাবছেন, এখনই ৯৯৯-এ কল করুন বা কোনো মানসিক সহায়তা লাইনে যোগাযোগ করুন। এই সময়টা আপনাকে একা পার করতে হবে না।',
    },
    signs: [
      { en: 'Feeling sad, empty or hopeless most days for two weeks or more', bn: 'দুই সপ্তাহ বা তার বেশি সময় ধরে বেশিরভাগ দিন দুঃখী, শূন্য বা হতাশ লাগা' },
      { en: 'Losing interest in things you used to enjoy', bn: 'আগে যা ভালো লাগত তাতে আগ্রহ হারিয়ে ফেলা' },
      { en: 'Sleeping or eating much more or less than usual', bn: 'স্বাভাবিকের চেয়ে অনেক বেশি বা কম ঘুম বা খাওয়া' },
      { en: 'Constant worry, racing heart, or panic', bn: 'সারাক্ষণ দুশ্চিন্তা, বুক ধড়ফড় বা আতঙ্ক' },
      { en: 'Flashbacks or nightmares after something frightening', bn: 'ভয়ংকর কোনো ঘটনার পর বারবার সেই স্মৃতি বা দুঃস্বপ্ন' },
    ],
    steps: [
      { en: 'Tell one person you trust how you are really feeling.', bn: 'বিশ্বস্ত একজন মানুষকে খুলে বলুন আপনি আসলে কেমন বোধ করছেন।' },
      { en: 'Try a short breathing or grounding exercise when feelings get too big.', bn: 'অনুভূতি সামলাতে কষ্ট হলে একটি ছোট শ্বাস-প্রশ্বাস বা গ্রাউন্ডিং অনুশীলন করুন।' },
      { en: 'Keep a simple routine: regular sleep, meals, and a little movement or daylight.', bn: 'একটি সহজ রুটিন রাখুন: নিয়মিত ঘুম, খাবার এবং একটু হাঁটাচলা বা রোদে থাকা।' },
      { en: 'Call an emotional support line. Talking to a trained listener is free and confidential.', bn: 'মানসিক সহায়তা লাইনে কল করুন। প্রশিক্ষিত শ্রোতার সাথে কথা বলা বিনামূল্যে ও গোপনীয়।' },
      { en: 'See a doctor or psychologist if feelings last or affect daily life. Government hospitals have psychiatry departments.', bn: 'অনুভূতি দীর্ঘস্থায়ী হলে বা দৈনন্দিন জীবনে প্রভাব ফেললে ডাক্তার বা মনোবিদের কাছে যান। সরকারি হাসপাতালে মনোরোগ বিভাগ আছে।' },
    ],
    helpOthers: [
      { en: 'Listen without judging or rushing to give advice.', bn: 'বিচার না করে, তাড়াহুড়ো করে পরামর্শ না দিয়ে মন দিয়ে শুনুন।' },
      { en: 'Say "I am here for you" and check in again in a few days.', bn: 'বলুন "আমি তোমার পাশে আছি" এবং কয়েক দিন পর আবার খোঁজ নিন।' },
      { en: 'Offer to help them find or go to a counsellor.', bn: 'কাউন্সেলর খুঁজে দিতে বা সাথে যেতে প্রস্তাব দিন।' },
    ],
    rights: [
      {
        law: { en: 'Mental Health Act 2018', bn: 'মানসিক স্বাস্থ্য আইন ২০১৮' },
        text: {
          en: 'Protects the dignity and rights of people receiving mental health care, including consent and confidentiality.',
          bn: 'মানসিক স্বাস্থ্যসেবা গ্রহণকারীদের মর্যাদা ও অধিকার, সম্মতি এবং গোপনীয়তা রক্ষা করে।',
        },
      },
    ],
    helplines: ['emotional', 'emergency', 'women'],
  },
  {
    id: 'suicide-prevention',
    accent: 'sky',
    title: { en: 'Suicide prevention', bn: 'আত্মহত্যা প্রতিরোধ' },
    short: {
      en: 'If you are thinking about suicide, help is available right now.',
      bn: 'আত্মহত্যার কথা ভাবলে, এই মুহূর্তেই সাহায্য পাওয়া যায়।',
    },
    summary: {
      en: 'Thoughts of suicide often come when pain feels endless and there seems to be no way out. These feelings can pass, and people do recover. Reaching out is a brave first step.',
      bn: 'যখন কষ্ট অন্তহীন মনে হয় আর কোনো পথ খোলা নেই বলে মনে হয়, তখন প্রায়ই আত্মহত্যার চিন্তা আসে। এই অনুভূতি কেটে যেতে পারে, এবং মানুষ সত্যিই সেরে ওঠে। কারো কাছে হাত বাড়ানো একটি সাহসী প্রথম পদক্ষেপ।',
    },
    urgent: {
      en: 'If you might act on these thoughts, call 999 now or go to the nearest hospital emergency. Stay with someone you trust.',
      bn: 'আপনি যদি এই চিন্তা অনুযায়ী কিছু করে ফেলতে পারেন, এখনই ৯৯৯-এ কল করুন বা নিকটস্থ হাসপাতালের জরুরি বিভাগে যান। বিশ্বস্ত কারো সাথে থাকুন।',
    },
    signs: [
      { en: 'Talking about wanting to die, being a burden, or having no reason to live', bn: 'মরে যেতে চাওয়া, অন্যের বোঝা হওয়া বা বাঁচার কোনো কারণ না থাকার কথা বলা' },
      { en: 'Withdrawing from family and friends', bn: 'পরিবার ও বন্ধুদের থেকে নিজেকে গুটিয়ে নেওয়া' },
      { en: 'Giving away belongings or saying goodbye', bn: 'জিনিসপত্র দিয়ে দেওয়া বা বিদায় জানানোর মতো কথা বলা' },
      { en: 'Sudden calm after a long period of distress', bn: 'দীর্ঘ কষ্টের পর হঠাৎ অস্বাভাবিক শান্ত হয়ে যাওয়া' },
      { en: 'Recent violence, abuse, humiliation or a major loss', bn: 'সাম্প্রতিক সহিংসতা, নির্যাতন, অপমান বা বড় কোনো ক্ষতি' },
    ],
    steps: [
      { en: 'Tell someone now. A friend, family member, teacher or a support line.', bn: 'এখনই কাউকে বলুন। বন্ধু, পরিবারের সদস্য, শিক্ষক বা কোনো সহায়তা লাইন।' },
      { en: 'Move away from anything you could use to hurt yourself, or ask someone to keep it for you.', bn: 'নিজের ক্ষতি করতে পারেন এমন জিনিস থেকে দূরে সরে যান, বা কাউকে সেগুলো রেখে দিতে বলুন।' },
      { en: 'Get through the next few minutes: slow breathing, cold water on your face, a safe place.', bn: 'পরের কয়েক মিনিট পার করুন: ধীরে শ্বাস নিন, মুখে ঠান্ডা পানি দিন, নিরাপদ জায়গায় থাকুন।' },
      { en: 'Write down reasons to stay and people who would want to help.', bn: 'বেঁচে থাকার কারণগুলো এবং যারা সাহায্য করতে চাইবে তাদের নাম লিখে রাখুন।' },
      { en: 'Make an appointment with a doctor or counsellor for ongoing support.', bn: 'নিয়মিত সহায়তার জন্য ডাক্তার বা কাউন্সেলরের সাথে সাক্ষাতের সময় নিন।' },
    ],
    helpOthers: [
      { en: 'Ask directly: "Are you thinking about suicide?" Asking does not put the idea in their head.', bn: 'সরাসরি জিজ্ঞেস করুন: "তুমি কি আত্মহত্যার কথা ভাবছ?" জিজ্ঞেস করলে এই চিন্তা মাথায় ঢোকে না।' },
      { en: 'Listen, take them seriously, and do not leave them alone if they are at risk.', bn: 'মন দিয়ে শুনুন, গুরুত্ব দিন, এবং ঝুঁকিতে থাকলে তাকে একা রাখবেন না।' },
      { en: 'Remove or lock away medicines, pesticides and other dangerous items.', bn: 'ওষুধ, কীটনাশক ও অন্যান্য বিপজ্জনক জিনিস সরিয়ে ফেলুন বা তালাবদ্ধ করে রাখুন।' },
      { en: 'Help them contact a support line or go with them to a doctor.', bn: 'সহায়তা লাইনে যোগাযোগ করতে সাহায্য করুন বা সাথে করে ডাক্তারের কাছে নিয়ে যান।' },
    ],
    rights: [
      {
        law: { en: 'Abetment is a crime (Penal Code s.306)', bn: 'প্ররোচনা অপরাধ (দণ্ডবিধি ধারা ৩০৬)' },
        text: {
          en: 'Driving someone to suicide through abuse or harassment is a punishable offence. Women facing such abuse can seek protection and legal action.',
          bn: 'নির্যাতন বা হয়রানির মাধ্যমে কাউকে আত্মহত্যায় প্ররোচিত করা শাস্তিযোগ্য অপরাধ। এমন নির্যাতনের শিকার নারীরা সুরক্ষা ও আইনি পদক্ষেপ চাইতে পারেন।',
        },
      },
    ],
    helplines: ['emergency', 'emotional', 'women'],
  },
  {
    id: 'sexual-violence',
    accent: 'rose',
    title: { en: 'Rape & sexual violence', bn: 'ধর্ষণ ও যৌন সহিংসতা' },
    short: {
      en: 'It is never your fault. Medical care, legal help and support are available.',
      bn: 'এটা কখনোই আপনার দোষ নয়। চিকিৎসা, আইনি সহায়তা ও মানসিক সহায়তা পাওয়া যায়।',
    },
    summary: {
      en: 'Sexual violence is any sexual act without free consent, including by a husband, relative or someone you know. Whatever you wore, wherever you were, whatever you did to survive: you are not to blame.',
      bn: 'স্বাধীন সম্মতি ছাড়া যেকোনো যৌন আচরণই যৌন সহিংসতা, তা স্বামী, আত্মীয় বা পরিচিত কেউ করলেও। আপনি কী পরেছিলেন, কোথায় ছিলেন, বাঁচার জন্য কী করেছিলেন, তাতে কিছু যায় আসে না: আপনি দায়ী নন।',
    },
    urgent: {
      en: 'If it just happened: get to a safe place and call 999 or 109. Go to a One-Stop Crisis Centre within 72 hours if you can, for medicine that prevents pregnancy and HIV.',
      bn: 'যদি এইমাত্র ঘটে থাকে: নিরাপদ জায়গায় যান এবং ৯৯৯ বা ১০৯-এ কল করুন। সম্ভব হলে ৭২ ঘণ্টার মধ্যে ওয়ান-স্টপ ক্রাইসিস সেন্টারে যান, গর্ভধারণ ও HIV প্রতিরোধের ওষুধের জন্য।',
    },
    signs: [
      { en: 'Being forced, threatened or pressured into sexual acts', bn: 'জোর করে, হুমকি দিয়ে বা চাপ দিয়ে যৌন আচরণে বাধ্য করা' },
      { en: 'Sexual acts when you were asleep, drunk, drugged or unable to say no', bn: 'ঘুমন্ত, নেশাগ্রস্ত বা "না" বলতে অক্ষম অবস্থায় যৌন আচরণ' },
      { en: 'Unwanted touching, or being made to watch or do sexual things', bn: 'অনাকাঙ্ক্ষিত স্পর্শ, বা যৌন কিছু দেখতে বা করতে বাধ্য করা' },
      { en: 'Threats to share photos unless you agree to sex', bn: 'যৌন সম্পর্কে রাজি না হলে ছবি ছড়িয়ে দেওয়ার হুমকি' },
    ],
    steps: [
      { en: 'Go somewhere safe and contact someone you trust.', bn: 'নিরাপদ কোথাও যান এবং বিশ্বস্ত কারো সাথে যোগাযোগ করুন।' },
      { en: 'Get medical care quickly, even if you have no injuries. Emergency contraception and HIV prevention work best soon after.', bn: 'আঘাত না থাকলেও দ্রুত চিকিৎসা নিন। জরুরি গর্ভনিরোধক ও HIV প্রতিরোধক ওষুধ যত দ্রুত নেওয়া যায় তত ভালো কাজ করে।' },
      { en: 'If you may want to file a case, try not to bathe or change clothes before the medical exam. Keep clothes in a paper bag. This is your choice.', bn: 'মামলা করতে চাইলে মেডিকেল পরীক্ষার আগে গোসল বা কাপড় বদলানো এড়ানোর চেষ্টা করুন। কাপড় কাগজের ব্যাগে রাখুন। এটা সম্পূর্ণ আপনার সিদ্ধান্ত।' },
      { en: 'You can file a case at a police station or directly at the Nari-o-Shishu Nirjatan Daman Tribunal. Ask for a woman officer.', bn: 'থানায় বা সরাসরি নারী ও শিশু নির্যাতন দমন ট্রাইব্যুনালে মামলা করতে পারেন। নারী কর্মকর্তা চাইতে পারেন।' },
      { en: 'Ask for free legal aid and counselling. Healing takes time; support helps.', bn: 'বিনামূল্যে আইনি সহায়তা ও কাউন্সেলিং চান। সেরে উঠতে সময় লাগে; সহায়তা কাজে আসে।' },
    ],
    helpOthers: [
      { en: 'Believe her. Say "It is not your fault" and "I am glad you told me".', bn: 'তাকে বিশ্বাস করুন। বলুন "এটা তোমার দোষ নয়" এবং "তুমি আমাকে বলেছ বলে আমি খুশি"।' },
      { en: 'Let her make the decisions about police, family and medical care.', bn: 'পুলিশ, পরিবার ও চিকিৎসা নিয়ে সিদ্ধান্ত তাকেই নিতে দিন।' },
      { en: 'Never pressure her to marry the abuser or "settle" the matter.', bn: 'নির্যাতনকারীকে বিয়ে করতে বা বিষয়টি "মীমাংসা" করতে কখনো চাপ দেবেন না।' },
      { en: 'Protect her privacy. Do not share her name or photos.', bn: 'তার গোপনীয়তা রক্ষা করুন। নাম বা ছবি প্রকাশ করবেন না।' },
    ],
    rights: [
      {
        law: { en: 'Women & Children Repression Prevention Act 2000', bn: 'নারী ও শিশু নির্যাতন দমন আইন ২০০০' },
        text: {
          en: 'Rape is punishable by life imprisonment or death. Cases go to special tribunals and the survivor\'s identity must be protected.',
          bn: 'ধর্ষণের শাস্তি যাবজ্জীবন কারাদণ্ড বা মৃত্যুদণ্ড। মামলা বিশেষ ট্রাইব্যুনালে চলে এবং ভুক্তভোগীর পরিচয় গোপন রাখা বাধ্যতামূলক।',
        },
      },
      {
        law: { en: 'Free medical exam', bn: 'বিনামূল্যে মেডিকেল পরীক্ষা' },
        text: {
          en: 'Government hospitals and One-Stop Crisis Centres must examine and treat survivors free of charge.',
          bn: 'সরকারি হাসপাতাল ও ওয়ান-স্টপ ক্রাইসিস সেন্টার বিনামূল্যে ভুক্তভোগীর পরীক্ষা ও চিকিৎসা করতে বাধ্য।',
        },
      },
    ],
    helplines: ['emergency', 'women', 'occ', 'legal'],
  },
  {
    id: 'domestic-violence',
    accent: 'orange',
    title: { en: 'Domestic violence', bn: 'পারিবারিক সহিংসতা' },
    short: {
      en: 'Abuse by a husband, in-laws or family is a crime. You can get protection.',
      bn: 'স্বামী, শ্বশুরবাড়ি বা পরিবারের নির্যাতন অপরাধ। আপনি সুরক্ষা পেতে পারেন।',
    },
    summary: {
      en: 'Domestic violence is not only hitting. It includes threats, insults, controlling your money or movement, sexual abuse and cutting you off from family. It often gets worse over time.',
      bn: 'পারিবারিক সহিংসতা শুধু মারধর নয়। হুমকি, অপমান, টাকাপয়সা বা চলাফেরা নিয়ন্ত্রণ, যৌন নির্যাতন এবং পরিবার থেকে বিচ্ছিন্ন করাও এর মধ্যে পড়ে। সময়ের সাথে এটি প্রায়ই বাড়ে।',
    },
    urgent: {
      en: 'If you are being hurt or threatened right now, call 999. If you can, go to a neighbour, relative or any public place.',
      bn: 'এই মুহূর্তে আঘাত বা হুমকির শিকার হলে ৯৯৯-এ কল করুন। সম্ভব হলে প্রতিবেশী, আত্মীয় বা কোনো জনসমাগমের স্থানে চলে যান।',
    },
    signs: [
      { en: 'Hitting, pushing, burning or any physical harm', bn: 'মারধর, ধাক্কা, পুড়িয়ে দেওয়া বা যেকোনো শারীরিক ক্ষতি' },
      { en: 'Constant insults, threats or humiliation', bn: 'ক্রমাগত অপমান, হুমকি বা হেয় করা' },
      { en: 'Taking your income, phone or documents', bn: 'আপনার আয়, ফোন বা কাগজপত্র কেড়ে নেওয়া' },
      { en: 'Stopping you from seeing family, friends or a doctor', bn: 'পরিবার, বন্ধু বা ডাক্তারের সাথে দেখা করতে বাধা দেওয়া' },
      { en: 'Threatening divorce, taking the children, or throwing you out', bn: 'তালাক, সন্তান কেড়ে নেওয়া বা বাড়ি থেকে বের করে দেওয়ার হুমকি' },
    ],
    steps: [
      { en: 'Make a safety plan: a bag with ID, money, medicine and important numbers, kept somewhere safe.', bn: 'একটি নিরাপত্তা পরিকল্পনা করুন: পরিচয়পত্র, টাকা, ওষুধ ও জরুরি নম্বরসহ একটি ব্যাগ নিরাপদ জায়গায় রাখুন।' },
      { en: 'Agree a code word with someone you trust that means "call for help".', bn: 'বিশ্বস্ত কারো সাথে একটি সংকেত শব্দ ঠিক করুন যার অর্থ "সাহায্য ডাকো"।' },
      { en: 'Keep a record: dates, injuries, photos, medical slips. Store copies outside the house.', bn: 'রেকর্ড রাখুন: তারিখ, আঘাত, ছবি, চিকিৎসার কাগজ। কপি বাড়ির বাইরে রাখুন।' },
      { en: 'Call 109 for advice, shelter referrals and help applying for a protection order.', bn: 'পরামর্শ, আশ্রয়কেন্দ্রের রেফারেল এবং সুরক্ষা আদেশের আবেদনে সহায়তার জন্য ১০৯-এ কল করুন।' },
    ],
    helpOthers: [
      { en: 'Talk privately and tell her you are worried about her safety.', bn: 'একান্তে কথা বলুন এবং জানান যে তার নিরাপত্তা নিয়ে আপনি চিন্তিত।' },
      { en: 'Do not confront the abuser; it can put her at greater risk.', bn: 'নির্যাতনকারীর মুখোমুখি হবেন না; এতে তার ঝুঁকি বাড়তে পারে।' },
      { en: 'Offer a safe place to keep documents or to stay.', bn: 'কাগজপত্র রাখার বা থাকার জন্য নিরাপদ জায়গা দিন।' },
    ],
    rights: [
      {
        law: { en: 'Domestic Violence (Prevention & Protection) Act 2010', bn: 'পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন ২০১০' },
        text: {
          en: 'You can apply to court for a protection order, a residence order to stay in your home, and compensation.',
          bn: 'আপনি আদালতে সুরক্ষা আদেশ, নিজের বাড়িতে থাকার জন্য বসবাস আদেশ এবং ক্ষতিপূরণের আবেদন করতে পারেন।',
        },
      },
    ],
    helplines: ['emergency', 'women', 'legal'],
  },
  {
    id: 'dowry',
    accent: 'amber',
    title: { en: 'Dowry (Joutuk)', bn: 'যৌতুক' },
    short: {
      en: 'Asking for, giving or taking dowry is illegal. So is abuse over dowry.',
      bn: 'যৌতুক চাওয়া, দেওয়া বা নেওয়া বেআইনি। যৌতুকের জন্য নির্যাতনও অপরাধ।',
    },
    summary: {
      en: 'Dowry demands can start before marriage or years later, and often come with threats, beatings or being sent back to your parents. The law is on your side, and you or your family can take action.',
      bn: 'যৌতুকের দাবি বিয়ের আগে বা বহু বছর পরেও শুরু হতে পারে, এবং প্রায়ই হুমকি, মারধর বা বাবার বাড়িতে ফেরত পাঠানোর সাথে আসে। আইন আপনার পক্ষে, এবং আপনি বা আপনার পরিবার ব্যবস্থা নিতে পারেন।',
    },
    urgent: {
      en: 'If you are being beaten or threatened over dowry, call 999 or 109. Dowry violence can become life-threatening; do not wait.',
      bn: 'যৌতুকের জন্য মারধর বা হুমকির শিকার হলে ৯৯৯ বা ১০৯-এ কল করুন। যৌতুকের সহিংসতা প্রাণঘাতী হতে পারে; অপেক্ষা করবেন না।',
    },
    signs: [
      { en: 'Repeated demands for money, gold, a motorbike or land', bn: 'টাকা, সোনা, মোটরসাইকেল বা জমির জন্য বারবার দাবি' },
      { en: 'Being blamed, starved or beaten because your family has not paid', bn: 'পরিবার দাবি পূরণ করেনি বলে দোষারোপ, খেতে না দেওয়া বা মারধর' },
      { en: 'Threats of divorce or a second marriage', bn: 'তালাক বা দ্বিতীয় বিয়ের হুমকি' },
      { en: 'Being sent to your parents\' home until they pay', bn: 'দাবি পূরণ না হওয়া পর্যন্ত বাবার বাড়িতে পাঠিয়ে দেওয়া' },
    ],
    steps: [
      { en: 'Tell your family and a trusted local leader or women\'s organisation.', bn: 'পরিবার এবং বিশ্বস্ত স্থানীয় নেতা বা নারী সংগঠনকে জানান।' },
      { en: 'Keep evidence: messages, call recordings, witnesses, medical records of injuries.', bn: 'প্রমাণ রাখুন: মেসেজ, কল রেকর্ড, সাক্ষী, আঘাতের চিকিৎসা কাগজ।' },
      { en: 'Call 109 or legal aid (16430) to learn how to file a complaint.', bn: 'কীভাবে অভিযোগ করবেন জানতে ১০৯ বা আইনগত সহায়তা (১৬৪৩০)-এ কল করুন।' },
      { en: 'File a case at the police station or the Women & Children tribunal.', bn: 'থানায় বা নারী ও শিশু নির্যাতন দমন ট্রাইব্যুনালে মামলা করুন।' },
    ],
    helpOthers: [
      { en: 'Refuse to give or take dowry in your own family.', bn: 'নিজের পরিবারে যৌতুক দেওয়া-নেওয়া প্রত্যাখ্যান করুন।' },
      { en: 'Support a woman who speaks up instead of urging her to "adjust".', bn: 'যে নারী মুখ খোলেন তাকে "মানিয়ে নিতে" না বলে তার পাশে দাঁড়ান।' },
      { en: 'Report dowry violence you witness to 109.', bn: 'যৌতুকের সহিংসতা দেখলে ১০৯-এ জানান।' },
    ],
    rights: [
      {
        law: { en: 'Dowry Prohibition Act 2018', bn: 'যৌতুক নিরোধ আইন ২০১৮' },
        text: {
          en: 'Demanding, giving or taking dowry is punishable by imprisonment and a fine.',
          bn: 'যৌতুক দাবি, প্রদান বা গ্রহণ কারাদণ্ড ও অর্থদণ্ডে দণ্ডনীয়।',
        },
      },
      {
        law: { en: 'Women & Children Repression Prevention Act 2000, s.11', bn: 'নারী ও শিশু নির্যাতন দমন আইন ২০০০, ধারা ১১' },
        text: {
          en: 'Injuring or killing a woman over dowry carries severe punishment, up to the death penalty.',
          bn: 'যৌতুকের জন্য নারীকে আহত বা হত্যা করলে কঠোর শাস্তি, সর্বোচ্চ মৃত্যুদণ্ড।',
        },
      },
    ],
    helplines: ['women', 'emergency', 'legal'],
  },
  {
    id: 'child-marriage',
    accent: 'violet',
    title: { en: 'Child marriage', bn: 'বাল্যবিবাহ' },
    short: {
      en: 'Girls under 18 cannot legally marry. A planned child marriage can be stopped.',
      bn: '১৮ বছরের কম বয়সী মেয়ের বিয়ে বেআইনি। আসন্ন বাল্যবিবাহ থামানো যায়।',
    },
    summary: {
      en: 'Child marriage ends education, harms health and raises the risk of violence. If you or a girl you know is being pushed into marriage, help can reach you before the wedding day.',
      bn: 'বাল্যবিবাহ পড়াশোনা বন্ধ করে, স্বাস্থ্যের ক্ষতি করে এবং সহিংসতার ঝুঁকি বাড়ায়। আপনি বা পরিচিত কোনো মেয়েকে বিয়েতে বাধ্য করা হলে বিয়ের দিনের আগেই সাহায্য পৌঁছাতে পারে।',
    },
    urgent: {
      en: 'If a wedding is about to happen, call 999, 109, 1098 or 333 right away, or tell the Upazila Nirbahi Officer (UNO).',
      bn: 'বিয়ে যদি আসন্ন হয়, এখনই ৯৯৯, ১০৯, ১০৯৮ বা ৩৩৩-এ কল করুন, অথবা উপজেলা নির্বাহী কর্মকর্তা (ইউএনও)-কে জানান।',
    },
    signs: [
      { en: 'Family arranging a marriage for a girl under 18', bn: '১৮ বছরের কম বয়সী মেয়ের জন্য পরিবার বিয়ের আয়োজন করছে' },
      { en: 'Sudden end to schooling or talk of a "good proposal"', bn: 'হঠাৎ পড়াশোনা বন্ধ বা "ভালো প্রস্তাব"-এর কথা' },
      { en: 'Fake age on birth certificate or marriage papers', bn: 'জন্মনিবন্ধন বা বিয়ের কাগজে ভুয়া বয়স' },
    ],
    steps: [
      { en: 'Talk to a teacher, a trusted relative or a local girls\' club.', bn: 'শিক্ষক, বিশ্বস্ত আত্মীয় বা স্থানীয় কিশোরী ক্লাবের সাথে কথা বলুন।' },
      { en: 'Call 109, 1098 or 333. You can stay anonymous.', bn: '১০৯, ১০৯৮ বা ৩৩৩-এ কল করুন। আপনি পরিচয় গোপন রাখতে পারেন।' },
      { en: 'Inform the UNO or Union Parishad chairman, who can stop the marriage.', bn: 'ইউএনও বা ইউনিয়ন পরিষদ চেয়ারম্যানকে জানান, তারা বিয়ে থামাতে পারেন।' },
    ],
    helpOthers: [
      { en: 'Explain to parents the health and legal risks, kindly and privately.', bn: 'বাবা-মাকে একান্তে ও সহানুভূতির সাথে স্বাস্থ্য ও আইনি ঝুঁকি বুঝিয়ে বলুন।' },
      { en: 'Help her stay in school; ask about stipends and scholarships.', bn: 'তাকে স্কুলে রাখতে সাহায্য করুন; উপবৃত্তি ও বৃত্তির খোঁজ নিন।' },
      { en: 'Report it. Many marriages are stopped because a neighbour called.', bn: 'জানিয়ে দিন। প্রতিবেশীর একটি কলেই অনেক বিয়ে থেমে গেছে।' },
    ],
    rights: [
      {
        law: { en: 'Child Marriage Restraint Act 2017', bn: 'বাল্যবিবাহ নিরোধ আইন ২০১৭' },
        text: {
          en: 'The legal age is 18 for women and 21 for men. Parents, guardians and anyone who conducts or arranges a child marriage can be punished.',
          bn: 'বিয়ের আইনি বয়স নারীর ১৮ ও পুরুষের ২১। বাল্যবিবাহ আয়োজনকারী বা সম্পাদনকারী বাবা-মা, অভিভাবকসহ যে কেউ শাস্তি পেতে পারেন।',
        },
      },
    ],
    helplines: ['women', 'child', 'callcentre', 'emergency'],
  },
  {
    id: 'harassment',
    accent: 'fuchsia',
    title: { en: 'Sexual harassment', bn: 'যৌন হয়রানি' },
    short: {
      en: 'On the street, in transport, at work or at school. You have the right to feel safe.',
      bn: 'রাস্তায়, যানবাহনে, কর্মক্ষেত্রে বা শিক্ষাপ্রতিষ্ঠানে। নিরাপদ বোধ করা আপনার অধিকার।',
    },
    summary: {
      en: 'Eve-teasing, groping, stalking, sexual comments, and pressure for favours at work are all harassment. They are not jokes, and they are not your fault.',
      bn: 'ইভটিজিং, গায়ে হাত দেওয়া, পিছু নেওয়া, যৌন ইঙ্গিতপূর্ণ মন্তব্য এবং কর্মক্ষেত্রে সুবিধার বিনিময়ে চাপ, সবই হয়রানি। এগুলো ঠাট্টা নয়, এবং আপনার দোষও নয়।',
    },
    urgent: {
      en: 'If you are being followed or attacked, move towards people, shops or police, make noise, and call 999.',
      bn: 'কেউ পিছু নিলে বা আক্রমণ করলে মানুষ, দোকান বা পুলিশের দিকে যান, জোরে শব্দ করুন এবং ৯৯৯-এ কল করুন।',
    },
    signs: [
      { en: 'Unwanted touching or rubbing in crowds or transport', bn: 'ভিড়ে বা যানবাহনে অনাকাঙ্ক্ষিত স্পর্শ বা ঘষা' },
      { en: 'Sexual comments, whistling, or staring meant to intimidate', bn: 'যৌন মন্তব্য, শিস দেওয়া বা ভয় দেখানোর জন্য তাকিয়ে থাকা' },
      { en: 'A boss or teacher linking marks or a job to sexual favours', bn: 'বস বা শিক্ষক কর্তৃক নম্বর বা চাকরিকে যৌন সুবিধার সাথে যুক্ত করা' },
      { en: 'Being followed home or repeatedly contacted after saying no', bn: '"না" বলার পরও বাড়ি পর্যন্ত পিছু নেওয়া বা বারবার যোগাযোগ' },
    ],
    steps: [
      { en: 'Share your live location with a trusted person when travelling.', bn: 'চলাচলের সময় বিশ্বস্ত কারো সাথে লাইভ লোকেশন শেয়ার করুন।' },
      { en: 'Write down what happened, when, where, and any witnesses.', bn: 'কী, কখন, কোথায় ঘটেছে এবং কোনো সাক্ষী থাকলে লিখে রাখুন।' },
      { en: 'At work or school, complain to the sexual harassment complaint committee.', bn: 'কর্মক্ষেত্র বা শিক্ষাপ্রতিষ্ঠানে যৌন হয়রানি অভিযোগ কমিটিতে অভিযোগ করুন।' },
      { en: 'For stalking or assault, file a complaint with police or call 109.', bn: 'পিছু নেওয়া বা হামলার ক্ষেত্রে থানায় অভিযোগ করুন বা ১০৯-এ কল করুন।' },
    ],
    helpOthers: [
      { en: 'If safe, interrupt: stand near her, ask the time, or call out the behaviour.', bn: 'নিরাপদ হলে বাধা দিন: তার পাশে দাঁড়ান, সময় জিজ্ঞেস করুন, বা আচরণটির প্রতিবাদ করুন।' },
      { en: 'Afterwards, ask if she is okay and offer to be a witness.', bn: 'পরে জিজ্ঞেস করুন সে ঠিক আছে কিনা এবং সাক্ষী হওয়ার প্রস্তাব দিন।' },
    ],
    rights: [
      {
        law: { en: 'High Court guidelines 2009', bn: 'হাইকোর্টের নির্দেশনা ২০০৯' },
        text: {
          en: 'Every workplace and educational institution must have a complaint committee, led by a woman, to handle sexual harassment.',
          bn: 'প্রতিটি কর্মক্ষেত্র ও শিক্ষাপ্রতিষ্ঠানে যৌন হয়রানি মোকাবিলায় নারী নেতৃত্বাধীন অভিযোগ কমিটি থাকা বাধ্যতামূলক।',
        },
      },
      {
        law: { en: 'Women & Children Repression Prevention Act 2000, s.10', bn: 'নারী ও শিশু নির্যাতন দমন আইন ২০০০, ধারা ১০' },
        text: {
          en: 'Sexual assault, including unwanted touching, is punishable by imprisonment.',
          bn: 'অনাকাঙ্ক্ষিত স্পর্শসহ যৌন পীড়ন কারাদণ্ডে দণ্ডনীয়।',
        },
      },
    ],
    helplines: ['emergency', 'women', 'legal'],
  },
  {
    id: 'online-safety',
    accent: 'indigo',
    title: { en: 'Online abuse & blackmail', bn: 'অনলাইন নির্যাতন ও ব্ল্যাকমেইল' },
    short: {
      en: 'Leaked photos, deepfakes, fake accounts, stalking. Do not pay. Get help.',
      bn: 'ছবি ফাঁস, ডিপফেক, ভুয়া অ্যাকাউন্ট, নজরদারি। টাকা দেবেন না। সাহায্য নিন।',
    },
    summary: {
      en: 'Someone threatening to share your photos, making fake images of you, or tracking your phone is committing a crime. You are not to blame for trusting someone or for an image being faked.',
      bn: 'কেউ আপনার ছবি ছড়ানোর হুমকি দিলে, আপনার ভুয়া ছবি বানালে বা ফোন ট্র্যাক করলে সে অপরাধ করছে। কাউকে বিশ্বাস করার জন্য বা ছবি জাল হওয়ার জন্য আপনি দায়ী নন।',
    },
    urgent: {
      en: 'If someone is blackmailing you: do not pay or send more, do not delete the messages, and contact Police Cyber Support for Women or 999.',
      bn: 'কেউ ব্ল্যাকমেইল করলে: টাকা বা আর কিছু পাঠাবেন না, মেসেজ মুছবেন না, এবং পুলিশ সাইবার সাপোর্ট ফর উইমেন বা ৯৯৯-এ যোগাযোগ করুন।',
    },
    signs: [
      { en: 'Threats to share private photos or videos', bn: 'ব্যক্তিগত ছবি বা ভিডিও ছড়িয়ে দেওয়ার হুমকি' },
      { en: 'Fake or edited sexual images of you (deepfakes)', bn: 'আপনার ভুয়া বা এডিট করা যৌন ছবি (ডিপফেক)' },
      { en: 'Someone always knowing where you are or reading your messages', bn: 'কেউ সবসময় জানে আপনি কোথায় আছেন বা আপনার মেসেজ পড়ে' },
      { en: 'Fake accounts in your name or abusive comments', bn: 'আপনার নামে ভুয়া অ্যাকাউন্ট বা অপমানজনক মন্তব্য' },
    ],
    steps: [
      { en: 'Take screenshots showing the date, username and profile link before blocking.', bn: 'ব্লক করার আগে তারিখ, ইউজারনেম ও প্রোফাইল লিংকসহ স্ক্রিনশট নিন।' },
      { en: 'Change passwords, turn on two-step verification, and log out other devices.', bn: 'পাসওয়ার্ড বদলান, টু-স্টেপ ভেরিফিকেশন চালু করুন এবং অন্য ডিভাইস থেকে লগআউট করুন।' },
      { en: 'Report the content to the platform. StopNCII.org can help block intimate images from spreading.', bn: 'প্ল্যাটফর্মে কনটেন্ট রিপোর্ট করুন। StopNCII.org ব্যক্তিগত ছবি ছড়ানো আটকাতে সাহায্য করে।' },
      { en: 'Report to PCSW or file a complaint with our secure form.', bn: 'PCSW-তে জানান অথবা আমাদের নিরাপদ ফর্মে অভিযোগ করুন।' },
    ],
    helpOthers: [
      { en: 'Never forward or comment on leaked images. Report them instead.', bn: 'ফাঁস হওয়া ছবি কখনো ফরওয়ার্ড বা মন্তব্য করবেন না। বরং রিপোর্ট করুন।' },
      { en: 'Reassure her it is not her fault and help her save evidence.', bn: 'আশ্বস্ত করুন এটা তার দোষ নয় এবং প্রমাণ সংরক্ষণে সাহায্য করুন।' },
    ],
    rights: [
      {
        law: { en: 'Pornography Control Act 2012', bn: 'পর্নোগ্রাফি নিয়ন্ত্রণ আইন ২০১২' },
        text: {
          en: 'Recording, sharing or threatening to share someone\'s intimate images without consent is a crime.',
          bn: 'সম্মতি ছাড়া কারো অন্তরঙ্গ ছবি ধারণ, প্রচার বা প্রচারের হুমকি অপরাধ।',
        },
      },
      {
        law: { en: 'Cyber protection laws', bn: 'সাইবার সুরক্ষা আইন' },
        text: {
          en: 'Online harassment, identity theft and blackmail are punishable under Bangladesh\'s cyber laws.',
          bn: 'অনলাইন হয়রানি, পরিচয় চুরি ও ব্ল্যাকমেইল বাংলাদেশের সাইবার আইনে শাস্তিযোগ্য।',
        },
      },
    ],
    helplines: ['cyber', 'emergency', 'women'],
  },
];

export const getTopic = (id: TopicId): Topic =>
  topics.find((t) => t.id === id) ?? topics[0];
