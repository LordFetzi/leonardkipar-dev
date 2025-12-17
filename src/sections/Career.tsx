import '../css/career.css'
import { useLang } from '../components/LanguageContext'
import json from '../locales/lang.json'

type Milestone = {
    date: string,
    title: string,
    text: string
}

const milestones:Milestone[] = []
const maxMilestone = Object.keys(json.de).map(key => {
        const match = key.match(/^career\.milestone\.(\d+)\./);
        return match ? parseInt(match[1], 10) : null;
    })
    .filter(n => n !== null)
    .reduce((max,current) => Math.max(max, current), 0);

for(let i = 1; i <= maxMilestone; i++) {
    let milestone: Milestone = {
        date:  `career.milestone.${i}.date`,
        title:  `career.milestone.${i}.title`,
        text:  `career.milestone.${i}.text`
    }
    milestones.push(milestone);
}

export default function Career() {
    const {t} = useLang()
    return (
        <>
            <div className="careerWrapper">
                <div className='career'>
                    <h2>{t("nav.career")}</h2>
                    <div className="timelineContainer">
                        <div className="timeline">
                            {milestones.map((obj, i) => (
                                <div className="milestone" key={`milestone${i}`}>
                                    <div className='infoBox'>
                                        <div className="animatedCareerBorder">
                                            <div className='careerBeam' />
                                        </div>
                                        <h3>{t(obj.title)}</h3>
                                        <p>{t(obj.text)}</p>
                                    </div>
                                    <div className="timelineDot">
                                         <p className={`timelineDate ${i % 2 === 0 ? 'top' : 'bottom'}`}>
                                            {t(obj.date)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}