import '../css/projects.css'
import { useLang } from '../components/LanguageContext'
import { useEffect, useState } from 'react'
import json from '../locales/lang.json'

type Project = {
  title: string
  description: string
  image: string
  link: string
}

const projects:Project[] = []
const maxObjects = Object.keys(json.de).map(key => {
        const match = key.match(/^projects\.object\.(\d+)\./);
        return match ? parseInt(match[1], 10) : null;
    })
    .filter(n => n !== null)
    .reduce((max,current) => Math.max(max, current), 0);

for(let i = 1; i <= maxObjects; i++) {
    let project: Project = {
        title: `projects.object.${i}.title`,
        description: `projects.object.${i}.description`,
        image: `projects.object.${i}.image`,
        link: `projects.object.${i}.link`,
    }
    projects.push(project);
}

function openInNewTab(url: string) {
    if (url.includes(";")) {
        let urls: string[] = url.split(";");
        for(url of urls) {
            const newWindow = window.open(url, '_blank')
            if (newWindow) newWindow.opener = null
        }
    } else {
        const newWindow = window.open(url, '_blank')
        if (newWindow) newWindow.opener = null
    }
}

export default function Projects() {
    const {t} = useLang()
    const [current, setCurrent] = useState(0)

    const next = () => {
        setCurrent((prev) => (prev + 1) % projects.length)
    }

    const prev = () => {
        setCurrent((prev) => (prev - 1 + projects.length) % projects.length)
    }

    const handleKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") next()
        if (e.key === "ArrowLeft") prev()
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [])

    return (
        <>
            <div className="projectsWrapper">
               <div className="projects">
                    <h2>{t("nav.projects")}</h2>
                    <div className="projectsSlider">
                        <div className="projectBtn right">B1</div>
                        {projects.map((p, i) => (
                            <div className="project" key={`project${i}`}>
                                <img className="projectImage" src={t(p.image)} alt={p.title} onClick={() => openInNewTab(t(p.link))} />
                                <h3 className="projectTitle">{t(p.title)}</h3>
                                <p className="projectDesc">{t(p.description)}</p>
                            </div>
                        ))}
                        <div className="projectBtn left">B2</div>
                    </div>
                </div>
            </div>
        </>
    )
}