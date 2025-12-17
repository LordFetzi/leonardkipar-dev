import { useEffect, useRef } from 'react'
import { useSectionContext } from './SectionContext'

export default function CustomSnapScroll() {
  const { currentIndex, setActiveByIndex, sectionIds } = useSectionContext()
  const isScrolling = useRef(false)

  useEffect(() => {
    const lockTime = 800

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) {
        e.preventDefault()
        return
      }

      if (e.deltaY > 0 && currentIndex < sectionIds.length - 1) {
        triggerScroll(currentIndex + 1)
      } else if (e.deltaY < 0 && currentIndex > 0) {
        triggerScroll(currentIndex - 1)
      }
    }

    const handleKey = (e: KeyboardEvent) => {
      if (isScrolling.current) return

      if (e.key === 'ArrowDown' && currentIndex < sectionIds.length - 1) {
        e.preventDefault()
        triggerScroll(currentIndex + 1)
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault()
        triggerScroll(currentIndex - 1)
      }
    }

    const triggerScroll = (targetIndex: number) => {
      isScrolling.current = true
      lockScroll()

      setActiveByIndex(targetIndex)

      setTimeout(() => {
        isScrolling.current = false
        unlockScroll()
      }, lockTime)
    }

    const lockScroll = () => {
      document.body.classList.add('scroll-lock')
    }

    const unlockScroll = () => {
      document.body.classList.remove('scroll-lock')
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKey)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKey)
    }
  }, [currentIndex, setActiveByIndex, sectionIds])

  return null
}
