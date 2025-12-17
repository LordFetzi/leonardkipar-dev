import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ThreeBackground from './components/ThreeBackground.tsx'
import { LanguageProvider } from './components/LanguageContext.tsx'
import { DarkModeProvider } from './components/DarkmodeContext.tsx'
import Navbar from './sections/Navbar.tsx'
import Greet from './sections/Greet.tsx'
import { SectionProvider } from './components/SectionContext.tsx'
import SectionIndicator from './components/SectionIndicator.tsx'
import AboutMe from './sections/AboutMe.tsx'
import Career from './sections/Career.tsx'
import Skills from './sections/Skills.tsx'
import Projects from './sections/Projects.tsx'
import CustomSnapScroll from './components/CustomSnapScroll.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="gradient-blobs" />
    <div className="shader-overlay">
      <ThreeBackground />
    </div>
    <DarkModeProvider>
      <LanguageProvider>
         <SectionProvider>
          <Navbar />
          <SectionIndicator />
          <CustomSnapScroll />
          <main>
            <section id="greet">
              <Greet />
            </section>
            <section id="about">
              <AboutMe />
            </section>
            <section id="career">
              <Career />
            </section>
             <section id="skills">
              <Skills />
            </section>
            <section id="projects">
              <Projects />
            </section>
          </main>
        </SectionProvider>
      </LanguageProvider>
    </DarkModeProvider>
  </StrictMode>,
)
