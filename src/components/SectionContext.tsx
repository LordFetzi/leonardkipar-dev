import { createContext, useContext, useState, useEffect } from 'react'

const sections = ['greet', 'about', 'career', 'skills', 'projects']

type SectionContextType = {
  active: string
  currentIndex: number
  setActiveByIndex: (index: number) => void
  sectionIds: string[]
}

const SectionContext = createContext<SectionContextType | null>(null)

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const setActiveByIndex = (i: number) => {
    if (i >= 0 && i < sections.length) {
      document.getElementById(sections[i])?.scrollIntoView({ behavior: 'smooth' })
      setCurrentIndex(i)
    }
  }

  // ⬇️ NEU: Observer hält Index immer aktuell
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const id = entry.target.id
            const index = sections.indexOf(id)
            if (index !== -1 && index !== currentIndex) {
              setCurrentIndex(index)
            }
          }
        }
      },
      { threshold: 0.6 }
    )

    const elements = sections.map((id) => document.getElementById(id)).filter(Boolean)
    elements.forEach((el) => observer.observe(el!))

    return () => observer.disconnect()
  }, [currentIndex])

  return (
    <SectionContext.Provider
      value={{
        active: sections[currentIndex],
        currentIndex,
        setActiveByIndex,
        sectionIds: sections,
      }}
    >
      {children}
    </SectionContext.Provider>
  )
}

export function useSectionContext() {
  const ctx = useContext(SectionContext)
  if (!ctx) throw new Error('useSectionContext must be used inside SectionProvider')
  return ctx
}