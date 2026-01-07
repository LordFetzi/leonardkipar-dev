import '../css/projects.css'
import { useLang } from '../components/LanguageContext'
import json from '../locales/lang.json'
import { ReactComponent as Link } from '../assets/link.svg';
import { useEffect, useRef } from 'react'

const projectImages = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg}', {
    eager: true,
    query: '?url',
    import: 'default',
}) as Record<string, string>

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

const carouselProjects = [...projects, ...projects]

function resolveProjectImage(imageFile: string) {
    if (imageFile.startsWith('http') || imageFile.startsWith('/')) {
        return imageFile
    }
    return projectImages[`../assets/${imageFile}`] ?? ''
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
    const carouselRef = useRef<HTMLDivElement | null>(null)
    const trackRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const carousel = carouselRef.current
        const track = trackRef.current
        if (!carousel || !track) return

        let frameId = 0
        const cards = Array.from(track.querySelectorAll<HTMLElement>('.projectCard'))

        // Fade cards near the carousel edges without using parent masks (keeps backdrop blur working).
        const updateFade = () => {
            const carouselRect = carousel.getBoundingClientRect()
            const carouselLeft = carouselRect.left
            const carouselRight = carouselRect.right
            const trackStyle = window.getComputedStyle(track)
            const gapValue = trackStyle.columnGap || trackStyle.gap || '0'
            const gapPx = Number.isFinite(parseFloat(gapValue)) ? parseFloat(gapValue) : 0

            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect()
                const cardLeft = cardRect.left
                const cardWidth = Math.max(1, cardRect.width)
                const leftBoundary = Math.min(cardWidth, Math.max(0, carouselLeft - cardLeft))
                const rightBoundary = Math.min(cardWidth, Math.max(0, carouselRight - cardLeft))
                const visibleWidth = rightBoundary - leftBoundary

                if (visibleWidth <= 0) {
                    card.style.setProperty('--mask-left', '0px')
                    card.style.setProperty('--mask-left-end', '0px')
                    card.style.setProperty('--mask-right-start', '0px')
                    card.style.setProperty('--mask-right', '0px')
                    return
                }

                const maxFade = cardWidth * 0.5
                const gapBuffer = Math.min(cardWidth, gapPx)
                let leftFadeSize = leftBoundary > 0 ? Math.min(maxFade, leftBoundary + gapBuffer) : 0
                let rightFadeSize = rightBoundary < cardWidth ? Math.min(maxFade, (cardWidth - rightBoundary) + gapBuffer) : 0
                const totalFade = leftFadeSize + rightFadeSize

                if (totalFade > visibleWidth) {
                    const scale = visibleWidth / totalFade
                    leftFadeSize *= scale
                    rightFadeSize *= scale
                }

                const leftFadeEnd = leftBoundary + leftFadeSize
                const rightFadeStart = rightBoundary - rightFadeSize

                card.style.setProperty('--mask-left', `${leftBoundary.toFixed(2)}px`)
                card.style.setProperty('--mask-left-end', `${leftFadeEnd.toFixed(2)}px`)
                card.style.setProperty('--mask-right-start', `${rightFadeStart.toFixed(2)}px`)
                card.style.setProperty('--mask-right', `${rightBoundary.toFixed(2)}px`)
            })

            frameId = requestAnimationFrame(updateFade)
        }

        frameId = requestAnimationFrame(updateFade)
        return () => {
            cancelAnimationFrame(frameId)
        }
    }, [])

    return (
        <div className='projectsWrapper'>
            <div className='projects'>
                <h2>{t("nav.projects")}</h2>
                <div className='projectCarousel' data-mask ref={carouselRef}>
                    <div className='projectTrack' ref={trackRef}>
                        {carouselProjects.map((obj, i) => {
                            return (
                                <div 
                                    className='projectCard'
                                    key={`project${i}`}
                                >
                                    <img src={resolveProjectImage(t(obj.image))} alt={t(obj.title)} />
                                    <h3>{t(obj.title)}</h3>
                                    <p>{t(obj.description)}</p>
                                    <a onClick={() => openInNewTab(t(obj.link))}>{t("projects.button")}<Link className='linkIcon'/></a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
