import { createContext, useContext, useState } from 'react';
import { TX } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = (key) => TX[lang][key] || TX.en[key] || key;
  const toggleLang = () => setLang(l => l === 'en' ? 'te' : 'en');
  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
