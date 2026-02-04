import { useState } from 'react';
import { Language } from '@/types';

export function useLanguage(initial: Language = 'bn') {
  const [currentLang, setCurrentLang] = useState<Language>(initial);
  const isRtl = ['ur', 'ps', 'dv'].includes(currentLang);
  
  return { 
    currentLang, 
    setCurrentLang, 
    isRtl 
  };
}
