
import { Language } from '../types';

export const translations = {
  bn: {
    nav: { home: 'হোম', problems: 'সমস্যা ও সমাধান', legal: 'আইন', news: 'খবর', report: 'অভিযোগ করুন', admin: 'অ্যাডমিন' },
    hero: {
      title: 'ডিজিটাল ভবিষ্যৎ হোক',
      highlight: 'নারীদের জন্য নিরাপদ',
      subtitle: 'অনলাইন সহিংসতা, সাইবারস্টকিং ও ডিপফেকের বিরুদ্ধে বাংলাদেশ। আমরা আপনার পাশে আছি আইনি এবং মানসিক সহায়তা নিয়ে।',
      ctaReport: 'অভিযোগ করুন',
      ctaHelp: 'সহায়তা নিন',
    },
    features: {
      cyberstalking: { title: 'সাইবারস্টকিং', desc: 'অনলাইনে কাউকে অনুসরণ করা বা নজরদারি করা।' },
      deepfake: { title: 'ডিপফেক', desc: 'AI ব্যবহার করে ভুয়া ভিডিও তৈরি।' },
      imageAbuse: { title: 'ছবি অপব্যবহার', desc: 'অনুমতি ছাড়া ব্যক্তিগত ছবি শেয়ার করা।' },
      harassment: { title: 'অনলাইন হয়রানি', desc: 'সোশ্যাল মিডিয়ায় অপমানজনক মন্তব্য বা হুমকি।' },
      more: 'আরও জানুন'
    },
    campaign: {
      title: '১৬ দিনের নারীবাদী কর্মসূচি',
      subtitle: 'নারীর প্রতি সহিংসতার বিরুদ্ধে আমাদের ১৬ দিনের কর্মসূচি',
      bannerTitle: 'নারী ও কন্যাশিশুর নিরাপত্তা',
      bannerDesc: 'আমাদের সাথে যোগ দিন। স্কুল, কলেজ এবং কর্মক্ষেত্রে ডিজিটাল লিটারেসি ও সচেতনতা বৃদ্ধির লক্ষ্যে আমাদের বিশেষ ক্যাম্পেইন।',
      btnEvents: 'ইভেন্ট দেখুন',
      btnPartner: 'অংশীদার হন',
      partners: 'সহযোগিতায়'
    },
    education: {
      title: 'ডিজিটাল সহিংসতার ধরন',
      subtitle: 'নিরাপদ থাকতে সমস্যাগুলো সম্পর্কে জানুন',
      cards: [
        { title: 'সাইবারবুলিং', desc: 'অনলাইনে অপমান বা হুমকি দেওয়া।', impact: 'মানসিক ট্রমা', legal: 'DSA 2018', action: 'ব্লক ও রিপোর্ট' },
        { title: 'ডিপফেক', desc: 'AI দিয়ে তৈরি নকল ভিডিও/ছবি।', impact: 'সম্মানহানি', legal: 'PCA 2012', action: 'প্রমাণ রাখুন' },
        { title: 'আইডেন্টিটি থেফট', desc: 'অন্যের নাম ও ছবি ব্যবহার করা।', impact: 'বিশ্বাসভঙ্গ', legal: 'DSA 2018', action: 'জিডি করুন' },
        { title: 'অনলাইন হুমকি', desc: 'শারীরিক ক্ষতির ভয় দেখানো।', impact: 'নিরাপত্তাহীনতা', legal: 'দণ্ডবিধি ৫০৬', action: '৯৯৯-এ কল করুন' }
      ]
    },
    legal: {
      title: 'আইন ও সহায়তা',
      subtitle: 'আইনি সুরক্ষা ও এভিডেন্স গাইড',
      lawsTitle: 'বিদ্যমান সাইবার আইন',
      dsa: { badge: 'DSA 2018', text: 'ডিজিটাল নিরাপত্তা আইন - অনলাইনে মানহানি ও মিথ্যা তথ্যের বিরুদ্ধে ব্যবস্থা।' },
      pca: { badge: 'PCA 2012', text: 'পর্নোগ্রাফি নিয়ন্ত্রণ আইন - অনুমতি ছাড়া ছবি/ভিডিও ধারণ ও প্রচার দণ্ডনীয় অপরাধ।' },
      tip: { badge: 'পরামর্শ', text: 'ব্যারিস্টার তাসনুভা শেলি: "প্রমাণ সংরক্ষণ করা অত্যন্ত গুরুত্বপূর্ণ। স্ক্রিনশট এবং ইউআরএল সেভ রাখুন।"' },
      evidenceTitle: 'ডিজিটাল এভিডেন্স গাইড',
      evidenceDesc: 'মামলা করার জন্য সঠিক প্রমাণ প্রয়োজন। নিচের গাইডলাইন অনুসরণ করুন:',
      step1: 'পোস্ট বা মেসেজ ডিলিট করবেন না।',
      step2: 'সম্পূর্ণ স্ক্রিনশট নিন (তারিখ সহ)।',
      step3: 'প্রোফাইল বা পেজের লিঙ্ক (URL) কপি করুন।'
    },
    regional: {
      title: 'আঞ্চলিক সহযোগিতা',
      subtitle: 'দক্ষিণ এশিয়া জুড়ে আমাদের নেটওয়ার্ক',
      collabTitle: 'বাংলাদেশ – মালদ্বীপ কোলাবোরেশন',
      collabDesc: 'আমরা প্রতিবেশী দেশগুলোর সাথে তথ্য ও প্রযুক্তি বিনিময় করছি যাতে সাইবার অপরাধীরা সীমান্তের ওপারে গিয়েও পার না পায়।',
      trainingTitle: 'ট্রেনিং প্রোগ্রাম',
      trainingDesc: 'আইন শৃঙ্খলা রক্ষাকারী বাহিনীর জন্য বিশেষ সাইবার ফরেনসিক ট্রেনিং।',
      countries: ['আফগানিস্তান', 'বাংলাদেশ', 'ভুটান', 'ভারত', 'মালদ্বীপ', 'নেপাল', 'পাকিস্তান', 'শ্রীলঙ্কা']
    },
    news: {
      title: 'খবর ও মিডিয়া',
      subtitle: 'সাম্প্রতিক সংবাদ',
      items: [
        { title: 'সাইবার নিরাপত্তা গোলটেবিল', date: '১২ মার্চ ২০২৪', tag: 'ইভেন্ট' },
        { title: 'নতুন এআই টুল চালু', date: '১০ মার্চ ২০২৪', tag: 'প্রযুক্তি' },
        { title: 'স্কুল ক্যাম্পেইন শুরু', date: '০৫ মার্চ ২০২৪', tag: 'ক্যাম্পেইন' }
      ]
    },
    footer: {
      desc: 'নারীদের জন্য একটি নিরাপদ ডিজিটাল দুনিয়া গড়ার লক্ষ্যে আমাদের প্রচেষ্টা।',
      emergency: 'জরুরি যোগাযোগ',
      police: 'পুলিশ: ৯৯৯',
      women: 'নারী সহায়তা: ১০৯',
      mental: 'মানसिक স্বাস্থ্য: ০১৭...',
      links: 'লিঙ্ক',
      about: 'আমাদের সম্পর্কে',
      privacy: 'গোপনীয়তা নীতি',
      volunteer: 'স্বেচ্ছাসেবী হন',
      rights: 'সর্বস্বত্ব সংরক্ষিত।'
    },
    admin: { title: 'অ্যাডমিন ড্যাশবোর্ড', totalCases: 'মোট মামলা', pending: 'অপেক্ষমান', resolved: 'নিষ্পন্ন', recentReports: 'সাম্প্রতিক অভিযোগ', id: 'আইডি', type: 'ধরন', risk: 'ঝুঁকি', status: 'অবস্থা', action: 'পদক্ষেপ' },
    pages: {
        about: { title: 'আমাদের সম্পর্কে', content: 'নিরাপদ ডিজিটাল একটি অলাভজনক উদ্যোগ যা দক্ষিণ এশিয়ার নারীদের জন্য অনলাইন জগতকে নিরাপদ করতে কাজ করছে। আমাদের লক্ষ্য হলো ডিজিটাল সাক্ষरতা বৃদ্ধি এবং আইনি সহায়তা প্রদান।' },
        privacy: { title: 'গোপনীয়তা নীতি', content: 'আপনার তথ্য আমাদের কাছে নিরাপদ। আমরা কোনো অবস্থাতেই অভিযোগকারীর পরিচয় প্রকাশ করি না। সকল তথ্য এনক্রিপ্ট করা থাকে।' },
        volunteer: { title: 'স্বেচ্ছাসেবী হন', content: 'আমাদের সাথে যোগ দিন। আপনার দক্ষতা দিয়ে নারীদের সাইবার নিরাপত্তা নিশ্চিত করতে সাহায্য করুন।' }
    }
  },
  en: {
    nav: { home: 'Home', problems: 'Problems', legal: 'Legal', news: 'News', report: 'Report', admin: 'Admin' },
    hero: {
      title: 'Make Digital Future',
      highlight: 'Safe for Women',
      subtitle: 'Standing against online violence, cyberstalking, and deepfakes across South Asia. Legal and emotional support available.',
      ctaReport: 'File Complaint',
      ctaHelp: 'Get Help',
    },
    features: {
      cyberstalking: { title: 'Cyberstalking', desc: 'Monitoring someone online.' },
      deepfake: { title: 'Deepfake', desc: 'Fake AI-generated videos.' },
      imageAbuse: { title: 'Image Abuse', desc: 'Non-consensual image sharing.' },
      harassment: { title: 'Harassment', desc: 'Abusive comments or threats.' },
      more: 'Learn More'
    },
    campaign: {
      title: '16 Days of Activism',
      subtitle: 'Campaign against gender-based violence',
      bannerTitle: 'Safety for Women & Girls',
      bannerDesc: 'Join our digital literacy campaign for schools and workplaces.',
      btnEvents: 'View Events',
      btnPartner: 'Partner With Us',
      partners: 'In Collaboration With'
    },
    education: {
      title: 'Digital Violence Types',
      subtitle: 'Learn the threats to stay safe',
      cards: [
        { title: 'Cyberbullying', desc: 'Insults or threats.', impact: 'Trauma', legal: 'Cyber Laws', action: 'Block & Report' },
        { title: 'Deepfake', desc: 'AI fake media.', impact: 'Defamation', legal: 'Privacy Act', action: 'Save Evidence' },
        { title: 'Identity Theft', desc: 'Impersonation.', impact: 'Trust Loss', legal: 'Fraud Act', action: 'File Report' },
        { title: 'Online Threats', desc: 'Physical threats.', impact: 'Insecurity', legal: 'Penal Code', action: 'Call Police' }
      ]
    },
    legal: {
      title: 'Law & Support',
      subtitle: 'Legal protection guide',
      lawsTitle: 'Existing Cyber Laws',
      dsa: { badge: 'Act 2018', text: 'Digital Security Act - Action against defamation and fake news.' },
      pca: { badge: 'Act 2012', text: 'Pornography Control Act - Recording without consent is punishable.' },
      tip: { badge: 'Tip', text: 'Legal Expert: "Preserving evidence is crucial. Save screenshots and URLs."' },
      evidenceTitle: 'Evidence Guide',
      evidenceDesc: 'Proper evidence is needed to file a case:',
      step1: 'Do not delete posts/messages.',
      step2: 'Take full screenshots.',
      step3: 'Copy profile URLs.'
    },
    regional: {
      title: 'Regional Collaboration',
      subtitle: 'South Asia Network',
      collabTitle: 'Cross-Border Cooperation',
      collabDesc: 'Exchanging tech & intel with neighboring countries to stop cross-border cybercrime.',
      trainingTitle: 'Training Program',
      trainingDesc: 'Joint cyber forensic training for law enforcement.',
      countries: ['Afghanistan', 'Bangladesh', 'Bhutan', 'India', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka']
    },
    news: {
      title: 'News & Media',
      subtitle: 'Recent Updates',
      items: [
        { title: 'Cyber Safety Roundtable', date: 'March 12', tag: 'Event' },
        { title: 'New AI Tool Launched', date: 'March 10', tag: 'Tech' },
        { title: 'School Campaign Starts', date: 'March 05', tag: 'Campaign' }
      ]
    },
    footer: {
      desc: 'Building a safe digital world for women across South Asia.',
      emergency: 'Emergency',
      police: 'Police: 999/100',
      women: 'Helpline: 109',
      mental: 'Mental Health: Support',
      links: 'Links',
      about: 'About Us',
      privacy: 'Privacy Policy',
      volunteer: 'Volunteer',
      rights: 'All rights reserved.'
    },
    admin: { title: 'Admin Dashboard', totalCases: 'Total Cases', pending: 'Pending', resolved: 'Resolved', recentReports: 'Recent Reports', id: 'ID', type: 'Type', risk: 'Risk', status: 'Status', action: 'Action' },
    pages: {
        about: { title: 'About Us', content: 'Nirapad Digital is a non-profit initiative dedicated to making the online world safer for women in South Asia.' },
        privacy: { title: 'Privacy Policy', content: 'Your data is safe with us. We never disclose the identity of the complainant. All data is encrypted.' },
        volunteer: { title: 'Volunteer', content: 'Join us. Use your skills to help ensure women\'s cyber safety.' }
    }
  },
  // Fallbacks for other languages using English content for new pages for simplicity in this demo
  hi: {
    nav: { home: 'होम', problems: 'समस्याएं', legal: 'कानून', news: 'समाचार', report: 'रिपोर्ट', admin: 'एडमिन' },
    hero: {
        title: 'डिजिटल भविष्य हो',
        highlight: 'सुरक्षित',
        subtitle: 'ऑनलाइन हिंसा और डीपफेक के खिलाफ दक्षिण एशिया। हम आपके साथ हैं।',
        ctaReport: 'शिकायत दर्ज करें',
        ctaHelp: 'मदद लें',
      },
      features: {
        cyberstalking: { title: 'साइबरस्टॉकिंग', desc: 'ऑनलाइन पीछा करना।' },
        deepfake: { title: 'डीपफेक', desc: 'AI से बने नकली वीडियो।' },
        imageAbuse: { title: 'छवि दुरुपयोग', desc: 'निजी तस्वीरें साझा करना।' },
        harassment: { title: 'उत्पीड़न', desc: 'अपमानजनक टिप्पणियां।' },
        more: 'और जानें'
      },
      campaign: {
        title: 'जागरूकता अभियान',
        subtitle: 'महिलाओं के खिलाफ हिंसा के विरुद्ध अभियान',
        bannerTitle: 'महिला सुरक्षा',
        bannerDesc: 'डिजिटल साक्षरता के लिए हमारे साथ जुड़ें।',
        btnEvents: 'इवेंट देखें',
        btnPartner: 'साझेदार बनें',
        partners: 'सहयोग से'
      },
      education: {
        title: 'डिजिटल हिंसा के प्रकार',
        subtitle: 'खतरों के बारे में जानें',
        cards: [
          { title: 'साइबरबुलिंग', desc: 'ऑनलाइन अपमान।', impact: 'आघात', legal: 'IT Act', action: 'ब्लॉक करें' },
          { title: 'डीपफेक', desc: 'नकली मीडिया।', impact: 'बदनामी', legal: 'Privacy', action: 'सबूत रखें' },
          { title: 'पहचान चोरी', desc: 'प्रतिरूपण।', impact: 'धोखाधड़ी', legal: 'Fraud', action: 'रिपोर्ट करें' },
          { title: 'धमकियां', desc: 'शारीरिक धमकी।', impact: 'डर', legal: 'IPC', action: 'पुलिस को बुलाएं' }
        ]
      },
      legal: {
        title: 'कानून और सहायता',
        subtitle: 'कानूनी सुरक्षा गाइड',
        lawsTitle: 'साइबर कानून',
        dsa: { badge: 'IT Act', text: 'ऑनलाइन मानहानि और फेक न्यूज के खिलाफ कार्रवाई।' },
        pca: { badge: 'IPC', text: 'सहमति के बिना रिकॉर्डिंग दंडनीय है।' },
        tip: { badge: 'सुझाव', text: 'सबूत सुरक्षित रखें। स्क्रीनशॉट लें।' },
        evidenceTitle: 'साक्ष्य गाइड',
        evidenceDesc: 'मामला दर्ज करने के लिए सबूत चाहिए:',
        step1: 'मैसेज डिलीट न करें।',
        step2: 'स्क्रीनशॉट लें।',
        step3: 'URL कॉपी करें।'
      },
      regional: {
        title: 'क्षेत्रीय सहयोग',
        subtitle: 'दक्षिण एशिया नेटवर्क',
        collabTitle: 'सीमा पार सहयोग',
        collabDesc: 'पड़ोसी देशों के साथ तकनीक साझा करना।',
        trainingTitle: 'प्रशिक्षण',
        trainingDesc: 'पुलिस के लिए साइबर फोरेंसिक।',
        countries: ['अफगानिस्तान', 'बांग्लादेश', 'भूटान', 'भारत', 'मालदीव', 'नेपाल', 'पाकिस्तान', 'श्रीलंका']
      },
      news: {
        title: 'समाचार',
        subtitle: 'ताज़ा अपडेट',
        items: [
          { title: 'सुरक्षा सम्मेलन', date: '12 मार्च', tag: 'इवेंट' },
          { title: 'नया AI टूल', date: '10 मार्च', tag: 'टेक' },
          { title: 'स्कूल अभियान', date: '05 मार्च', tag: 'अभियान' }
        ]
      },
      footer: {
        desc: 'महिलाओं के लिए सुरक्षित डिजिटल दुनिया।',
        emergency: 'आपातकालीन',
        police: 'पुलिस: 100/112',
        women: 'हेल्पलाइन: 1091',
        mental: 'मानसिक स्वास्थ्य',
        links: 'लिंक',
        about: 'हमारे बारे में',
        privacy: 'गोपनीयता',
        volunteer: 'स्वयंसेवक',
        rights: 'सर्वाधिकार सुरक्षित।'
      },
      admin: { title: 'एडमिन डैशबोर्ड', totalCases: 'कुल मामले', pending: 'लंबित', resolved: 'हल', recentReports: 'हाल की रिपोर्ट', id: 'आईडी', type: 'प्रकार', risk: 'जोखिम', status: 'स्थिति', action: 'कार्रवाई' },
      pages: {
          about: { title: 'हमारे बारे में', content: 'निरापद डिजिटल दक्षिण एशिया में महिलाओं के लिए ऑनलाइन दुनिया को सुरक्षित बनाने के लिए समर्पित एक गैर-लाभकारी पहल है।' },
          privacy: { title: 'गोपनीयता नीति', content: 'आपका डेटा हमारे पास सुरक्षित है। हम कभी भी शिकायतकर्ता की पहचान उजागर नहीं करते हैं। सभी डेटा एन्क्रिप्टेड है।' },
          volunteer: { title: 'स्वयंसेवक बनें', content: 'हमारे साथ जुड़ें। महिलाओं की साइबर सुरक्षा सुनिश्चित करने में मदद के लिए अपने कौशल का उपयोग करें।' }
      }
  },
  // Keeping other languages with basic English fallback for new pages to save space, but ensuring keys exist
  ur: {
      nav: { home: 'ہوم', problems: 'مسائل', legal: 'قانون', news: 'خبریں', report: 'رپورٹ کریں', admin: 'ایڈمن' },
      hero: { title: 'محفوظ ڈیجیٹل مستقبل', highlight: 'خواتین کے لیے', subtitle: 'آن لائن تشدد اور سائبر ہراسانی کے خلاف جنوبی ایشیا۔ ہم آپ کے ساتھ ہیں۔', ctaReport: 'شکایت درج کریں', ctaHelp: 'مدد حاصل کریں' },
      features: { cyberstalking: { title: 'سائبر اسٹاکنگ', desc: 'آن لائن پیچھا کرنا۔' }, deepfake: { title: 'ڈیپ فیک', desc: 'AI سے بنی جعلی ویڈیوز۔' }, imageAbuse: { title: 'تصاویر کا غلط استعمال', desc: 'اجازت کے بغیر تصاویر شیئر کرنا۔' }, harassment: { title: 'آن لائن ہراسانی', desc: 'توہین آمیز تبصرے۔' }, more: 'مزید جانیں' },
      campaign: { title: 'آگاہی مہم', subtitle: 'خواتین پر تشدد کے خلاف 16 دن', bannerTitle: 'خواتین کی حفاظت', bannerDesc: 'ڈیجیٹل آگاہی کے لیے ہمارے ساتھ شامل ہوں۔', btnEvents: 'تقریبات', btnPartner: 'پارٹنر بنیں', partners: 'تعاون' },
      education: { title: 'ڈیجیٹل تشدد کی اقسام', subtitle: 'محفوظ رہنے کے طریقے', cards: [{ title: 'سائبر دھمکیاں', desc: 'آن لائن توہین۔', impact: 'صدمہ', legal: 'PECA Act', action: 'بلاک کریں' }, { title: 'ڈیپ فیک', desc: 'جعلي میڈیا۔', impact: 'بدنامی', legal: 'Privacy', action: 'ثبوت رکھیں' }, { title: 'شناخت کی چوری', desc: 'دوسرے کا روپ دھارنا۔', impact: 'فراڈ', legal: 'Fraud', action: 'رپورٹ کریں' }, { title: 'دھمکیاں', desc: 'جسمانی نقصان۔', impact: 'خوف', legal: 'PPC', action: 'پولیس کو بلائیں' }] },
      legal: { title: 'قانون اور مدد', subtitle: 'قانونی رہنمائی', lawsTitle: 'سائبر قوانین', dsa: { badge: 'PECA 2016', text: 'سائبر کرائم ایکٹ - آن لائن ہراسانی کے خلاف۔' }, pca: { badge: 'PPC', text: 'بغیر اجازت ریکارڈنگ جرم ہے۔' }, tip: { badge: 'مشورہ', text: 'ثبوت محفوظ رکھیں۔ اسکرین شاٹس لیں۔' }, evidenceTitle: 'ثبوت گائیڈ', evidenceDesc: 'کیس فائل کرنے کے لیے:', step1: 'پیغامات ڈیلیٹ نہ کریں۔', step2: 'اسکرین شاٹس لیں۔', step3: 'لنک کاپی کریں۔' },
      regional: { title: 'علاقائی تعاون', subtitle: 'جنوبی ایشیا نیٹ ورک', collabTitle: 'سرحد پار تعاون', collabDesc: 'پڑوسی ممالک کے ساتھ معلومات کا تبادلہ۔', trainingTitle: 'تربیت', trainingDesc: 'پولیس کے لیے سائبر فارنسک۔', countries: ['افغانستان', 'بنگلہ دیش', 'بھوٹان', 'بھارت', 'مالدیپ', 'نیپال', 'پاکستان', 'سری لنکا'] },
      news: { title: 'خبریں', subtitle: 'تازہ ترین', items: [{ title: 'سیفٹی کانفرنس', date: '12 مارچ', tag: 'ایونٹ' }, { title: 'نیا AI ٹول', date: '10 مارچ', tag: 'ٹیک' }, { title: 'اسکول مہم', date: '05 مارچ', tag: 'مہم' }] },
      footer: { desc: 'خواتین کے لیے محفوظ انٹرنیٹ۔', emergency: 'ایمرجنسی', police: 'پولیس: 15', women: 'ہیلپ لائن: 1043', mental: 'ذہنی صحت', links: 'لنکس', about: 'ہمارے بارے میں', privacy: 'پرائیویسی', volunteer: 'رضاکار', rights: 'جملہ حقوق محفوظ ہیں۔' },
      admin: { title: 'ایڈمن ڈیش بورڈ', totalCases: 'کل کیسز', pending: 'زیر التواء', resolved: 'حل شدہ', recentReports: 'حالیہ رپورٹس', id: 'آئی ڈی', type: 'قسم', risk: 'رسک', status: 'حیثیت', action: 'عمل' },
      pages: { about: { title: 'ہمارے بارے میں', content: 'Nirapad Digital...' }, privacy: { title: 'پرائیویسی پالیسی', content: 'آپ کا ڈیٹا محفوظ ہے۔' }, volunteer: { title: 'رضاکار', content: 'ہمارے ساتھ شامل ہوں۔' } }
  },
  ne: {
      nav: { home: 'गृहपृष्ठ', problems: 'समस्याहरू', legal: 'कानून', news: 'समाचार', report: 'उजुरी', admin: 'एडमिन' },
      hero: { title: 'डिजिटल भविष्य', highlight: 'सुरक्षित बनाऔं', subtitle: 'अनलाइन हिंसा र साइबर अपराध विरुद्ध दक्षिण एशिया। हामी साथमा छौं।', ctaReport: 'उजुरी गर्नुहोस', ctaHelp: 'सहयोग लिनुहोस' },
      features: { cyberstalking: { title: 'साइबर स्टकिङ', desc: 'अनलाइन पिछा गर्नु।' }, deepfake: { title: 'डिपफेक', desc: 'AI नक्कली भिडियो।' }, imageAbuse: { title: 'फोटो दुरुपयोग', desc: 'अनुमति बिना फोटो शेयर।' }, harassment: { title: 'हैरानी', desc: 'अपमानजनक टिप्पणी।' }, more: 'थप जान्नुहोस्' },
      campaign: { title: 'जागरूकता अभियान', subtitle: 'महिला हिंसा विरुद्ध १६ दिन', bannerTitle: 'महिला सुरक्षा', bannerDesc: 'डिजिटल साक्षरता अभियानमा सामेल हुनुहोस्।', btnEvents: 'कार्यक्रम', btnPartner: 'साझेदार', partners: 'सहकार्य' },
      education: { title: 'डिजिटल हिंसाका प्रकार', subtitle: 'सुरक्षित रहन जान्नुहोस्', cards: [{ title: 'साइबर बुलिङ', desc: 'अनलाइन धम्की।', impact: 'तनाव', legal: 'ETA Act', action: 'ब्लक' }, { title: 'डिपफेक', desc: 'नक्कली मिडिया।', impact: 'बेइज्जत', legal: 'Privacy', action: 'प्रमाण राख्नुहोस्' }, { title: 'पहिचान चोरी', desc: 'अरूको नाम प्रयोग।', impact: 'धोका', legal: 'Fraud', action: 'रिपोर्ट' }, { title: 'धम्की', desc: 'शारीरिक हानी।', impact: 'डर', legal: 'Crime Code', action: 'प्रहरी' }] },
      legal: { title: 'कानून र सहयोग', subtitle: 'कानूनी सुरक्षा', lawsTitle: 'साइबर कानून', dsa: { badge: 'ETA', text: 'विद्युतीय कारोबार ऐन - साइबर अपराध विरुद्ध।' }, pca: { badge: 'Code', text: 'गोपनीयता विरुद्धको कसुर।' }, tip: { badge: 'सुझाव', text: 'प्रमाण सुरक्षित राख्नुहोस्। स्क्रिनसट लिनुहोस्।' }, evidenceTitle: 'प्रमाण गाइड', evidenceDesc: 'मुद्दा दर्ता गर्न:', step1: 'म्यासेज नहटाउनुहोस्।', step2: 'स्क्रिनसट लिनुहोस्।', step3: 'लिंक कपि गर्नुहोस्।' },
      regional: { title: 'क्षेत्रीय सहयोग', subtitle: 'दक्षिण एशिया नेटवर्क', collabTitle: 'अन्तरदेशीय सहयोग', collabDesc: 'छिमेकी राष्ट्रहरूसँग सहकार्य।', trainingTitle: 'तालिम', trainingDesc: 'प्रहरीका लागि साइबर तालिम।', countries: ['अफगानिस्तान', 'बंगलादेश', 'भुटान', 'भारत', 'माल्दिभ्स', 'नेपाल', 'पाकिस्तान', 'श्रीलंका'] },
      news: { title: 'समाचार', subtitle: 'ताजा अपडेट', items: [{ title: 'सुरक्षा सम्मेलन', date: '१२ मार्च', tag: 'कार्यक्रम' }, { title: 'नयाँ AI टुल', date: '१० मार्च', tag: 'प्रविधि' }, { title: 'स्कुल अभियान', date: '०५ मार्च', tag: 'अभियान' }] },
      footer: { desc: 'महिलाहरूको लागि सुरक्षित डिजिटल संसार।', emergency: 'आपतकालीन', police: 'प्रहरी: १००', women: 'हेल्पलाइन: ११४५', mental: 'मानसिक स्वास्थ्य', links: 'लिंक', about: 'हाम्रो बारेमा', privacy: 'गोपनीयता', volunteer: 'स्वयंसेवक', rights: 'सर्वाधिकार सुरक्षित।' },
      admin: { title: 'एडमिन ड्यासबोर्ड', totalCases: 'कुल केस', pending: 'बाँकी', resolved: 'समाधान', recentReports: 'हालको रिपोर्ट', id: 'ID', type: 'प्रकार', risk: 'जोखिम', status: 'अवस्था', action: 'कार्य' },
      pages: { about: { title: 'हाम्रो बारेमा', content: 'Nirapad Digital...' }, privacy: { title: 'गोपनीयता नीति', content: '...' }, volunteer: { title: 'स्वयंसेवक', content: '...' } }
  },
  si: {
      nav: { home: 'මුල් පිටුව', problems: 'ගැටළු', legal: 'නීති', news: 'පුවත්', report: 'පැමිණිලි', admin: 'පරිපාලක' },
      hero: { title: 'ඩිජිටල් අනාගතය', highlight: 'සුරක්ෂිත කරමු', subtitle: 'දකුණු ආසියාව පුරා කාන්තාවන් සයිබර් හිංසනයෙන් ආරක්ෂා කිරීම.', ctaReport: 'පැමිණිලි කරන්න', ctaHelp: 'උදව් ලබාගන්න' },
      features: { cyberstalking: { title: 'සයිබර් ලුහුබැඳීම', desc: 'අන්තර්ජාලය හරහා ලුහුබැඳීම.' }, deepfake: { title: 'Deepfake', desc: 'AI මගින් සැකසූ ව්‍යාජ වීඩියෝ.' }, imageAbuse: { title: 'පින්තූර අවභාවිතය', desc: 'අවසර නැතිව පින්තූර බෙදාහැරීම.' }, harassment: { title: 'හිංසනය', desc: 'අපහාසාත්මක පණිවිඩ.' }, more: 'තව දැනගන්න' },
      campaign: { title: 'දින 16 වැඩසටහන', subtitle: 'හිංසනයට එරෙහිව', bannerTitle: 'කාන්තා ආරක්ෂාව', bannerDesc: 'ඩිජිටල් සාක්ෂරතාවය සඳහා අප හා එක්වන්න.', btnEvents: 'සිදුවීම්', btnPartner: 'හවුල්කරුවන්', partners: 'සහයෝගයෙන්' },
      education: { title: 'හිංසන වර්ග', subtitle: 'ආරක්ෂිත වීමට දැනගන්න', cards: [{ title: 'සයිබර් බුලිං', desc: 'අපහාස කිරීම.', impact: 'මානසික පීඩනය', legal: 'CS Act', action: 'බ්ලොක් කරන්න' }, { title: 'Deepfake', desc: 'ව්‍යාජ මාධ්‍ය.', impact: 'අපහාසය', legal: 'Privacy', action: 'සාක්ෂි තබන්න' }, { title: 'Identity Theft', desc: 'අනන්‍යතාවය සොරකම්.', impact: 'වංචාව', legal: 'Fraud', action: 'වාර්තා කරන්න' }, { title: 'තර්ජන', desc: 'ශාරීරික තර්ජන.', impact: 'බිය', legal: 'Penal Code', action: 'පොලිසිය' }] },
      legal: { title: 'නීති සහ සහාය', subtitle: 'නීතිමය ආරක්ෂාව', lawsTitle: 'සයිබර් නීති', dsa: { badge: 'CS Act', text: 'පරිගණක අපරාධ පනත.' }, pca: { badge: 'Obscenity', text: 'අසැබි දේ බෙදාහැරීම දඬුවම් ලැබිය හැකිය.' }, tip: { badge: 'උපදෙස්', text: 'සාක්ෂි ආරක්ෂා කරන්න. තිරපිටපත් (Screenshots) ගන්න.' }, evidenceTitle: 'සාක්ෂි මාර්ගෝපදේශ', evidenceDesc: 'නඩු පැවරීමට:', step1: 'පණිවිඩ මකන්න එපා.', step2: 'Screenshots ගන්න.', step3: 'URL පිටපත් කරන්න.' },
      regional: { title: 'කලාපීය සහයෝගීතාව', subtitle: 'දකුණු ආසියානු ජාලය', collabTitle: 'දේශසීමා සහයෝගීතාව', collabDesc: 'අසල්වැසි රටවල් සමඟ තාක්ෂණය හුවමාරු කිරීම.', trainingTitle: 'පුහුණුව', trainingDesc: 'පොලිසිය සඳහා සයිබර් පුහුණුව.', countries: ['ඇෆ්ගනිස්ථානය', 'බංග්ලාදේශය', 'භූතානය', 'ඉන්දියාව', 'මාලදිවයින', 'නේපාලය', 'පාකිස්තානය', 'ශ්‍රී ලංකාව'] },
      news: { title: 'පුවත්', subtitle: 'යාවත්කාලීන', items: [{ title: 'ආරක්ෂක සමුළුව', date: 'මාර්තු 12', tag: 'Event' }, { title: 'නව AI මෙවලම', date: 'මාර්තු 10', tag: 'Tech' }, { title: 'පාසල් වැඩසටහන', date: 'මාර්තු 05', tag: 'Campaign' }] },
      footer: { desc: 'කාන්තාවන් සඳහා සුරක්ෂිත ඩිජිටල් ලෝකයක්.', emergency: 'හදිසි ඇමතුම්', police: 'පොලිසිය: 119', women: 'කාන්තා පිහිට: 1938', mental: 'මානසික සෞඛ්‍ය', links: 'සබැඳි', about: 'අපි ගැන', privacy: 'ප්‍රතිපත්ති', volunteer: 'ස්වේච්ඡා', rights: 'සියලුම හිමිකම් ඇවිරිණි.' },
      admin: { title: 'පරිපාලක පුවරුව', totalCases: 'මුළු පැමිණිලි', pending: 'විසඳීමට ඇති', resolved: 'විසඳූ', recentReports: 'මෑත වාර්තා', id: 'ID', type: 'වර්ගය', risk: 'අවදානම', status: 'තත්ත්වය', action: 'ක්‍රියාමාර්ග' },
      pages: { about: { title: 'අපි ගැන', content: '...' }, privacy: { title: 'ප්‍රතිපත්ති', content: '...' }, volunteer: { title: 'ස්වේච්ඡා', content: '...' } }
  },
  ps: {
      nav: { home: 'کور', problems: 'ستونزې', legal: 'قانون', news: 'خبرونه', report: 'راپور', admin: 'ادمین' },
      hero: { title: 'خوندي ډیجیټل راتلونکی', highlight: 'د ښځو لپاره', subtitle: 'د آنلاین تاوتریخوالي او سایبر ځورونې پر وړاندې سویلي آسیا. موږ ستاسو سره یو.', ctaReport: 'شکایت وکړئ', ctaHelp: 'مرسته ترلاسه کړئ' },
      features: { cyberstalking: { title: 'سایبر تعقیب', desc: 'آنلاین څوک تعقیب کول.' }, deepfake: { title: 'ډیپ فیک', desc: 'جعلي ویډیوګانې.' }, imageAbuse: { title: 'د عکس ناوړه ګټه', desc: 'بغیر اجازې عکس شریکول.' }, harassment: { title: 'ځورونه', desc: 'سپکاوی کوونکي تبصرې.' }, more: 'نور زده کړئ' },
      campaign: { title: 'د پوهاوي کمپاین', subtitle: 'د ښځو پر وړاندې د تاوتریخوالي ضد ۱۶ ورځې', bannerTitle: 'د ښځو خوندیتوب', bannerDesc: 'ډیجیټل سواد لپاره موږ سره یوځای شئ.', btnEvents: 'پیښې', btnPartner: 'ملګري شئ', partners: 'په همکارۍ' },
      education: { title: 'ډیجیټل تاوتریخوالی', subtitle: 'ځان ساتلو لپاره زده کړه', cards: [{ title: 'سایبر ځورونه', desc: 'سپکاوی.', impact: 'صدمه', legal: 'Cyber Law', action: 'بلاک' }, { title: 'ډیپ فیک', desc: 'جعلي میډیا.', impact: 'بدنامي', legal: 'Privacy', action: 'ثبوت وساتئ' }, { title: 'پیژند غلا', desc: 'د بل چا نوم کارول.', impact: 'فراډ', legal: 'Fraud', action: 'راپور' }, { title: 'ګواښونه', desc: 'فزیکي ګواښ.', impact: 'ویره', legal: 'Penal Code', action: 'پولیس' }] },
      legal: { title: 'قانون او ملاتړ', subtitle: 'قانوني لارښود', lawsTitle: 'سایبر قوانین', dsa: { badge: 'Law', text: 'د سایبر جرمونو قانون.' }, pca: { badge: 'Code', text: 'بغیر اجازې ثبت کول جرم دی.' }, tip: { badge: 'لارښوونه', text: 'ثبوت وساتئ. سکرین شاټ واخلئ.' }, evidenceTitle: 'د ثبوت لارښود', evidenceDesc: 'د قضیې ثبتولو لپاره:', step1: 'پیغامونه مه ړنګوئ.', step2: 'سکرین شاټ واخلئ.', step3: 'لینک کاپي کړئ.' },
      regional: { title: 'سیمه ایز همکاري', subtitle: 'د سویلي آسیا شبکه', collabTitle: 'سرحدي همکاري', collabDesc: 'د ګاونډیو هیوادونو سره تخنیکي تبادله.', trainingTitle: 'روزنه', trainingDesc: 'د پولیسو لپاره سایبر روزنه.', countries: ['افغانستان', 'بنگله دیش', 'بوټان', 'هند', 'مالدیپ', 'نیپال', 'پاکستان', 'سریلانکا'] },
      news: { title: 'خبرونه', subtitle: 'تازه', items: [{ title: 'امنیتي کنفرانس', date: '۱۲ مارچ', tag: 'پیښه' }, { title: 'نوی AI اوزار', date: '۱۰ مارچ', tag: 'ټیک' }, { title: 'د ښوونځي کمپاین', date: '۰۵ مارچ', tag: 'کمپاین' }] },
      footer: { desc: 'د ښځو لپاره خوندي انټرنیټ.', emergency: 'بیړنۍ', police: 'پولیس: ۱۱۹', women: 'مرسته: ۱۲۰', mental: 'رواني روغتیا', links: 'لینکونه', about: 'زموږ په اړه', privacy: 'تګلاره', volunteer: 'رضاکار', rights: 'ټول حقونه خوندي دي.' },
      admin: { title: 'ادمین ډشبورډ', totalCases: 'ټولې قضیې', pending: 'پاتې', resolved: 'حل شوی', recentReports: 'وروستي راپورونه', id: 'ID', type: 'ډول', risk: 'خطر', status: 'حالت', action: 'عمل' },
      pages: { about: { title: 'زموږ په اړه', content: '...' }, privacy: { title: 'تګلاره', content: '...' }, volunteer: { title: 'رضاکار', content: '...' } }
  },
  dv: {
      nav: { home: 'ހޯމް', problems: 'މައްސަލަތައް', legal: 'ޤާނޫނު', news: 'ޚަބަރު', report: 'ރިޕޯޓް', admin: 'އެޑްމިން' },
      hero: { title: 'ރައްކާތެރި ޑިޖިޓަލް', highlight: 'އަންހެނުންނަށް', subtitle: 'އޮންލައިން އަނިޔާއާ ދެކޮޅަށް ދެކުނު އޭޝިއާ. އަޅުގަނޑުމެން ތިބީ ތިޔަބޭފުޅުންނާއެކު.', ctaReport: 'ޝަކުވާ ހުށަހެޅުން', ctaHelp: 'އެހީ ހޯދުން' },
      features: { cyberstalking: { title: 'ސައިބަރ ސްޓޯކިންގ', desc: 'އޮންލައިންކޮށް ފާރަލުން.' }, deepfake: { title: 'ޑީޕްފޭކް', desc: 'AI ބޭނުންކޮށްގެން ހަދާ ފޭކް ވީޑިއޯ.' }, imageAbuse: { title: 'ފޮޓޯ ނަހަމަގޮތުގައި ބޭނުންކުރުން', desc: 'ހުއްދަނެތި ފޮޓޯ ޝެއަރކުރުން.' }, harassment: { title: 'ފުރައްސާރަ', desc: 'ބޭއަދަބީ މެސެޖު.' }, more: 'އިތުރަށް' },
      campaign: { title: 'ހޭލުންތެރިކުރުމުގެ ކެމްޕެއިން', subtitle: 'އަނިޔާއާ ދެކޮޅަށް 16 ދުވަސް', bannerTitle: 'އަންހެނުންގެ ރައްކާތެރިކަން', bannerDesc: 'ޑިޖިޓަލް ހޭލުންތެރިކަމަށް އަޅުގަނޑުމެންނާ ގުޅިވަޑައިގަންނަވާ.', btnEvents: 'އިވެންޓްތައް', btnPartner: 'ބައިވެރިވުން', partners: 'ގުޅިގެން' },
      education: { title: 'ޑިޖިޓަލް އަނިޔާގެ ބާވަތްތައް', subtitle: 'ރައްކާތެރިވުމަށް ދަސްކުރައްވާ', cards: [{ title: 'ސައިބަރ ބުލީ', desc: 'ފުރައްސާރަ ކުރުން.', impact: 'ނަފްސާނީ ގެއްލުން', legal: 'Cyber Act', action: 'ބްލޮކް' }, { title: 'ޑީޕްފޭކް', desc: 'ފޭކް މީޑިއާ.', impact: 'އަބުރު ގެއްލުން', legal: 'Privacy', action: 'ހެކި' }, { title: 'އައިޑެންޓިޓީ ވަގަށްނެގުން', desc: 'އެހެން މީހެއްގެ ނަން ބޭނުންކުރުން.', impact: 'އޮޅުވާލުން', legal: 'Fraud', action: 'ރިޕޯޓް' }, { title: 'ބިރުދެއްކުން', desc: 'އަނިޔާކުރާނެކަމުގެ ބިރު.', impact: 'ބިރުވެރިކަން', legal: 'Penal Code', action: 'ޕޮލިސް' }] },
      legal: { title: 'ޤާނޫނާއި އެހީ', subtitle: 'ޤާނޫނީ ރައްކާތެރިކަން', lawsTitle: 'ސައިބަރ ޤާނޫނުތައް', dsa: { badge: 'Act', text: 'ސައިބަރ ކުށްތަކާ ދެކޮޅަށް.' }, pca: { badge: 'Code', text: 'ހުއްދަނެތި ރެކޯޑްކުރުމަކީ ކުށެއް.' }, tip: { badge: 'ލަފާ', text: 'ހެކި ރައްކާކުރައްވާ. ސްކްރީންޝޮޓް ނަގާ.' }, evidenceTitle: 'ހެކި ގައިޑް', evidenceDesc: 'މައްސަލަ ހުށަހެޅުމަށް:', step1: 'މެސެޖު ޑިލީޓް ނުކުރައްވާ.', step2: 'ސްކްރީންޝޮޓް ނަގާ.', step3: 'ލިންކް ކޮޕީކުރައްވާ.' },
      regional: { title: 'ސަރަހައްދީ ގުޅުން', subtitle: 'ދެކުނު އޭޝިއާ ނެޓްވޯކް', collabTitle: 'ބޯޑަރު ހުރަސްކޮށް', collabDesc: 'އަވަށްޓެރި ޤައުމުތަކާއެކު މަޢުލޫމާތު ބަދަލުކުރުން.', trainingTitle: 'ތަމްރީނު', trainingDesc: 'ފުލުހުންނަށް ޚާއްޞަ ތަމްރީނު.', countries: ['އަފްޣާނިސްތާން', 'ބަންގްލަދޭޝް', 'ބޫޓާން', 'އިންޑިއާ', 'ދިވެހިރާއްޖެ', 'ނޭޕާލް', 'ޕާކިސްތާން', 'ސްރީލަންކާ'] },
      news: { title: 'ޚަބަރު', subtitle: 'އެންމެ ފަހުގެ', items: [{ title: 'ސޭފްޓީ ކޮންފަރެންސް', date: '12 މާރޗް', tag: 'އިވެންޓް' }, { title: 'އައު AI ޓޫލް', date: '10 މާރޗް', tag: 'ޓެކް' }, { title: 'ސްކޫލް ކެމްޕެއިން', date: '05 މާރޗް', tag: 'ކެމްޕެއިން' }] },
      footer: { desc: 'އަންހެނުންނަށް ރައްކާތެރި ޑިޖިޓަލް ދުނިޔެއެއް.', emergency: 'އިމަޖެންސީ', police: 'ޕޮލިސް: 119', women: 'ހެލްޕްލައިން: 1412', mental: 'ނަފްސާނީ އެހީ', links: 'ލިންކްތައް', about: 'އަޅުގަނޑުމެންނާ ބެހޭ', privacy: 'ޕްރައިވެސީ', volunteer: 'ވޮލަންޓިއަރ', rights: 'ހުރިހާ ޙައްޤެއް ރައްކާތެރިކުރެވިފައި.' },
      admin: { title: 'އެޑްމިން ޑޭޝްބޯޑް', totalCases: 'ޖުމްލަ މައްސަލަ', pending: 'ނުނިމި', resolved: 'ނިމިފައި', recentReports: 'ފަހުގެ ރިޕޯޓްތައް', id: 'އައިޑީ', type: 'ބާވަތް', risk: 'ރިސްކް', status: 'ސްޓޭޓަސް', action: 'ފިޔަވަޅު' },
      pages: { about: { title: 'އަޅުގަނޑުމެންނާ ބެހޭ', content: '...' }, privacy: { title: 'ޕްރައިވެސީ', content: '...' }, volunteer: { title: 'ވޮލަންޓިއަރ', content: '...' } }
  },
  dz: {
      nav: { home: 'གདོང་ཤོག', problems: 'དཀའ་ངལ།', legal: 'ཁྲིམས་ལུགས།', news: 'གནས་ཚུལ།', report: 'སྙན་ཞུ།', admin: 'བདག་སྐྱོང་།' },
      hero: { title: 'ཌི་ཇི་ཊཱལ་', highlight: 'ཉེན་སྲུང་།', subtitle: 'ལྷོ་ཨེ་ཤི་ཡ་ནང་ དྲ་ཐོག་དྲག་སྤྱོད་དང་ གཟུགས་བརྙན་རྫུན་མའི་འགོག་རྒོལ།', ctaReport: 'སྙན་ཞུ་འབད།', ctaHelp: 'གྲོགས་རོམ་ལེན།' },
      features: { cyberstalking: { title: 'དྲ་ཐོག་བслежи།', desc: 'དྲ་ཐོག་ལས་ མི་གཞན་ལུ་བལྟ་བ།' }, deepfake: { title: 'Deepfake', desc: 'AI བཟོས་པའི་ བརྙན་རྫུན།' }, imageAbuse: { title: 'པར་རིས་ངན་སྤྱོད།', desc: 'གནང་བ་མེད་པར་ པར་རིས་བགོ་བཤའ།' }, harassment: { title: 'བརྙས་བཅོས།', desc: 'དམའ་འབེབས་ཚིག་ངན།' }, more: 'ཁ་ གསལ།' },
      campaign: { title: 'གོ་རྟོགས་ལས་རིམ།', subtitle: 'དྲག་སྤྱོད་འགོག་རྒོལ།', bannerTitle: 'ཨམ་སྲུ་ཚུ་གི་ཉེན་སྲུང་།', bannerDesc: 'ཌི་ཇི་ཊཱལ་ཤེས་ཡོན་གྱི་དོན་ལུ་ ང་བཅས་དང་མཉམ་རུབ་འབད།', btnEvents: 'ལས་རིམ།', btnPartner: 'ཟླ་བོ།', partners: 'མཉམ་འབྲེལ་ཐོག་ལས།' },
      education: { title: 'དྲག་སྤྱོད་ཀྱི་རིགས།', subtitle: 'ཉེན་སྲུང་གི་དོན་ལུ་ ཤེས་དགོཔ།', cards: [{ title: 'དྲ་ཐོག་བརྙས་བཅོས།', desc: 'ཚིག་ངན་སླབ་ནི།', impact: 'སེམས་ཁྲལ།', legal: 'IT Act', action: 'བཀག་འཛིན།' }, { title: 'Deepfake', desc: 'བརྙན་རྫུན།', impact: 'མིང་ཤོས།', legal: 'Privacy', action: 'སྒྲུབ་བྱེད་བཞག' }, { title: 'ངོ་རྟགས་རྐུ་འཁྱེར།', desc: 'གཞན་གྱི་མིང་སྤྱོད་ནི།', impact: 'མགོ་སྐོར།', legal: 'Fraud', action: 'སྙན་ཞུ།' }, { title: 'ཉེན་བརྡ།', desc: 'གནོད་འཚེའི་ཉེན་བརྡ།', impact: 'འཇིགས་སྣང་།', legal: 'Penal Code', action: 'ཁྲིམས་སྲུང་།' }] },
      legal: { title: 'ཁྲིམས་དང་གྲོགས་རམ།', subtitle: 'ཁྲིམས་ཀྱི་རྒྱབ་སྐྱོར།', lawsTitle: 'དྲ་ཐོག་ཁྲིམས་ལུགས།', dsa: { badge: 'Act', text: 'དྲ་ཐོག་ཉེས་ལས་བཅའ་ཁྲིམས།' }, pca: { badge: 'Code', text: 'གནང་བ་མེད་པར་ པར་ལེན་འབད་ནི་ ཉེས་ཁྲིམས་ཕོག' }, tip: { badge: 'གྲོས་འདེབས།', text: 'སྒྲུབ་བྱེད་བདག་འཛིན་འབད། Screenshots ལེན།' }, evidenceTitle: 'སྒྲུབ་བྱེད་ལམ་སྟོན།', evidenceDesc: 'ཁྲིམས་གཏུགས་འབད་ནིའི་དོན་ལུ:', step1: 'འཕྲིན་ཡིག་ མ་བསུབ།', step2: 'Screenshots ལེན།', step3: 'URL འདྲ་བཤུས་འབད།' },
      regional: { title: 'ལུང་ཕྱོགས་མཉམ་འབྲེལ།', subtitle: 'ལྷོ་ཨེ་ཤི་ཡའི་འབྲེལ་མཐུད།', collabTitle: 'ས་མཚམས་མཉམ་འབྲེལ།', collabDesc: 'ཁྱིམ་ཚེས་རྒྱལ་ཁབ་ཚུ་དང་གཅིག་ཁར་ འཕྲུལ་རིག་བརྗེ་སོར།', trainingTitle: 'སྦྱོང་བརྡར།', trainingDesc: 'ཁྲིམས་སྲུང་འགག་པ་ལུ་ སྦྱོང་བརྡར།', countries: ['ཨཕ་གྷ་ནིསི་ཏཱན།', 'བངྒ་ལ་དེཤ།', 'འབྲུག', 'རྒྱ་གར།', 'མལ་དིབས།', 'ནེ་པཱལ།', 'པ་ཀིསི་ཏཱན།', 'ཤྲཱི་ལངྐ།'] },
      news: { title: 'གནས་ཚུལ།', subtitle: 'གསར་ཤོས།', items: [{ title: 'ཉེན་སྲུང་ཚོགས་འདུ།', date: 'མཱཅ་ ༡༢', tag: 'ལས་རིམ།' }, { title: 'AI ལག་ཆ་གསརཔ།', date: 'མཱཅ་ ༡༠', tag: 'འཕྲུལ་རིག' }, { title: 'སློབ་གྲྭའི་ལས་རིམ།', date: 'མཱཅ་ ༥', tag: 'ལས་འགུལ།' }] },
      footer: { desc: 'ཨམ་སྲུ་ཚུ་གི་དོན་ལུ་ ཉེན་སྲུང་ཅན་གྱི་ ཌི་ཇི་ཊཱལ་འཛམ་གླིང་།', emergency: 'ཛ་དྲག', police: 'ཁྲིམས་སྲུང་: ༡༡༣', women: 'གྲོགས་རམ་: ༡༠༩༨', mental: 'སེམས་ཁམས་འཕྲོད་བསྟེན།', links: 'འབྲེལ་མཐུད།', about: 'ང་བཅས་ཀྱི་སྐོར།', privacy: 'སྒེར་གསང་།', volunteer: 'དང་བླངསཔ།', rights: 'ཐོབ་དབང་ཡོད།' },
      admin: { title: 'བདག་སྐྱོང་ ཌེཤ་བོཌ།', totalCases: 'གནད་དོན་ཡོངས་བསྡོམས།', pending: 'བསྒུག་བཞིན།', resolved: 'སེལ་ཟིན་པ།', recentReports: 'ཉེ་བའི་སྙན་ཞུ།', id: 'ངོ་རྟགས།', type: 'དབྱེ་བ།', risk: 'ཉེན་ཁ།', status: 'གནས་སྟངས།', action: 'བྱ་བ།' },
      pages: { about: { title: 'ང་བཅས་ཀྱི་སྐོར།', content: '...' }, privacy: { title: 'སྒེར་གསང་།', content: '...' }, volunteer: { title: 'དང་བླངསཔ།', content: '...' } }
  }
};
