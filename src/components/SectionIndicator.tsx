import '../css/indicator.css'
import { useSectionContext } from './SectionContext'

export default function SectionIndicator() {
  const { active, sectionIds, setActiveByIndex } = useSectionContext()

  return (
    <div className="sectionIndicator">
      {sectionIds.map((id, i) => (
        <a
          key={id}
          onClick={(e) => {
            e.preventDefault()
            setActiveByIndex(i)
          }}
          href={`#${id}`}
          className={`dot${active === id ? ' active' : ''}`}
        />
      ))}
    </div>
  )
}
