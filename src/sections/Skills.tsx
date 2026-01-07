import '../css/skills.css'
import { useLang } from '../components/LanguageContext'
import json from '../locales/lang.json'
import { useState, type CSSProperties } from 'react'

const skillIcons = import.meta.glob('../assets/tech/*.svg', {
    eager: true,
    query: '?url',
    import: 'default',
}) as Record<string, string>

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

function resolveSkillLogo(logoFile: string) {
    if (logoFile.startsWith('http') || logoFile.startsWith('/')) {
        return logoFile
    }
    return skillIcons[`../assets/tech/${logoFile}`] ?? ''
}

export default function Skills() {
    const {t} = useLang()
    const [activeIndex, setActiveIndex] = useState(0)
    const activeSkill = skills[activeIndex] ?? skills[0]

    return (
        <div className="skillsWrapper">
            <div className='skills'>
                <h2>{t("nav.skills")}</h2>

                <div className='skillsSplit'>
                    <div className='skillsList'>
                        {skills.map((obj, i) => {
                            const isActive = i === activeIndex
                            return (
                                <div
                                    className={`skillBadge ${isActive ? 'active' : ''}`}
                                    key={`skill${i}`}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onFocus={() => setActiveIndex(i)}
                                    tabIndex={0}
                                    style={{
                                        '--accent-1': t(obj.skillC1),
                                        '--accent-2': t(obj.skillC2)
                                    } as CSSProperties}
                                >
                                    <div className="animatedSkillBadgeBorder">
                                        <span className="skillBadgeBeam" />
                                    </div>
                                    <span className='skillBadgeInner'>
                                        <span className='skillBadgeIcon'>
                                            <img className='skillImg' src={resolveSkillLogo(t(obj.logo))} alt={t(obj.name)} />
                                        </span>
                                        <span className='skillBadgeName'>{t(obj.name)}</span>
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <div className='skillDetail'>
                        {activeSkill && (
                            <div
                                key={activeSkill.name}
                                className='skillDetailCard'
                                style={{
                                    '--accent-1': t(activeSkill.skillC1),
                                    '--accent-2': t(activeSkill.skillC2)
                                } as CSSProperties}
                            >
                                <div className='skillDetailHeader'>
                                    <div className='skillDetailIcon'>
                                        <img className='skillImg' src={resolveSkillLogo(t(activeSkill.logo))} alt={t(activeSkill.name)} />
                                    </div>
                                    <div className='skillDetailTitle'>
                                        <p className='skillDetailLabel'>{t("nav.skills")}</p>
                                        <h3>{t(activeSkill.name)}</h3>
                                    </div>
                                </div>

                                <p className='skillDetailText'>{t(activeSkill.text)}</p>

                                <div className='skillConfidence'>
                                    <div className='skillConfidenceHeader'>
                                        <span className='confidenceText'>{t("skills.confidence")}</span>
                                        <span className='confidenceValue'>{t(activeSkill.confidence)}%</span>
                                    </div>
                                    <div className="skillProgressBG">
                                        <div
                                            className="skillProgress"
                                            style={{width: `${t(activeSkill.confidence)}%`}}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
