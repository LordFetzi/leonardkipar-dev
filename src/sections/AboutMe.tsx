import '../css/about.css'
import { useLang } from '../components/LanguageContext'

export default function AboutMe() {
    const { t } = useLang();

    return (
        <>
            <div className="aboutWrapper">
                <div className='about'>
                    <h2>{t("nav.about")}</h2>
                    {t("about.text").split('\n').map((line, i) => (
                        <p key={`line${i}`}>{line}</p> 
                    ))}
                </div>
            </div>
        </>
    )
}