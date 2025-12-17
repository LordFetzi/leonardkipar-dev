import '../css/greet.css'
import { useLang } from '../components/LanguageContext'
import { ReactComponent as ArrowDown } from '../assets/arrow-down.svg';

export default function Greet() {
    const {t} = useLang()

    return (
        <>
            <div className="introWrapper">
                <div className='intro'>
                    <h2>Hey, {t("greet.iam")}</h2>
                    <h1>Leonard</h1>
                    <p>
                        {t("greet.text")}
                    </p>
                    <div className='introBtn'>
                        <a href="#about" className='introBtnText'>
                            {t("greet.more")}
                            <ArrowDown className='introIcon'/>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}