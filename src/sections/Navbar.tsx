import '../css/navbar.css'

import { useLang } from '../components/LanguageContext'
import { useDarkMode } from '../components/DarkmodeContext';
import { ReactComponent as AboutMe } from '../assets/about-me.svg';
import { ReactComponent as Mortarboard } from '../assets/mortarboard.svg';
import { ReactComponent as Stack } from '../assets/stack.svg';
import { ReactComponent as CodeFolder } from '../assets/code-folder.svg';
import { ReactComponent as Contact } from '../assets/contact.svg';
import { ReactComponent as Lang } from '../assets/lang.svg';
import { ReactComponent as Moon } from '../assets/moon.svg';
import { ReactComponent as Sun } from '../assets/sun.svg';

export default function Navbar() {
    const { t, setLang, lang } = useLang()
    const { theme, toggleTheme} = useDarkMode()

    return (
        <div className='navbar'>
        <a href="#about" className='navBtn'>
            <AboutMe className='navIcon' />  
            {t("nav.about")}
        </a>
        <a href="#career" className='navBtn'>
            <Mortarboard className='navIcon' />
            {t("nav.career")}
        </a>
        <a href="#skills" className='navBtn'>
            <Stack className='navIcon' />
            {t("nav.skills")}
        </a>
        <a href="#projects" className='navBtn'>
            <CodeFolder className='navIcon' />
            {t("nav.projects")}
        </a>
        <a href="#contact" className='navBtn'>
            <Contact className='navIcon' />
            {t("nav.contact")}
        </a>
        <hr />
        <a onClick={() => setLang(lang === "en" ? "de" : "en")} className='navBtn'>
            <Lang className='navIcon' />
            {t("nav.lang")}
        </a>
        <a onClick={toggleTheme} className='navBtn'>
            {theme === "dark" && (
                <>
                    <Moon className='navIcon' />
                    {t("nav.dark")}
                </>
            )}
            {theme === "light" && (
                <>
                    <Sun className='navIcon' />
                    {t("nav.light")}
                </>
            )}
        </a>
        </div>
    )
}