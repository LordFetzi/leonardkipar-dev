import '../css/skills.css'
import { useLang } from '../components/LanguageContext'
import json from '../locales/lang.json'

type Skill = {
    name: string,
    logo: string,
    text: string,
    confidence: string,
    skillC1: string,
    skillC2: string
}

const skills:Skill[] = []
const maxObjects = Object.keys(json.de).map(key => {
        const match = key.match(/^skills\.object\.(\d+)\./);
        return match ? parseInt(match[1], 10) : null;
    })
    .filter(n => n !== null)
    .reduce((max,current) => Math.max(max, current), 0);

for(let i = 1; i <= maxObjects; i++) {
    let skill: Skill = {
        name:  `skills.object.${i}.name`,
        logo: `skills.object.${i}.logo`,
        text:  `skills.object.${i}.text`,
        confidence: `skills.object.${i}.confidence`,
        skillC1: `skills.object.${i}.c1`,
        skillC2: `skills.object.${i}.c2`
    }
    skills.push(skill);
}

export default function Skills() {
    const {t} = useLang()
    return (
        <>
            <div className="skillsWrapper">
                <div className='skills'>
                    <h2>{t("nav.skills")}</h2>
                    <div className='skillsContainer'>
                        {skills.map((obj, i) => (
                            <div className="skill" key={`skill${i}`}>
                                <div className="animatedSkillBorder">
                                    <div className='skillBeam' style={{background: `linear-gradient(45deg, transparent 0, ${t(obj.skillC2)} 50%, ${t(obj.skillC1)} 70%, transparent 100%)`}} />
                                </div>
                                <div className="skillPreview">
                                    <img className='skillImg' src={'src/assets/tech/'+t(obj.logo)}></img>
                                    <h3>{t(obj.name)}</h3>
                                </div>
                                <div className="skillInfo">
                                    <p>{t(obj.text)}</p>
                                    <div className="skillConfidence">
                                        <p className="confidenceText">{t("skills.confidence")}</p>
                                        <div className="skillProgressBG">
                                            <div className="skillProgress" style={{width: `${t(obj.confidence)}%`, background: `linear-gradient(to right, ${t(obj.skillC2)}, ${t(obj.skillC1)}`}}><p>{t(obj.confidence)}%</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}