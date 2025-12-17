import { createContext, useContext, useState } from "react"
import translations from "../locales/lang.json"

type Language = "en" | "de"

const LanguageContext = createContext<{
  lang: Language
  setLang: (l: Language) => void
  t: (key: keyof typeof translations["de"] | string) => string
}>({
  lang: "de",
  setLang: () => {},
  t: (key) => key,
})

const getInitialLang = (): Language => {
  const stored = localStorage.getItem("lang")
  if (stored === "en" || stored === "de") return stored as Language

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith("de")) return "de"
  return "en"
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>(getInitialLang)

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem("lang", newLang)
  }

  const t = (key: keyof typeof translations["de"] | string) => {
    return translations[lang][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)