import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]) {
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            let current = ''
            for (const id of sectionIds) {
                const el = document.getElementById(id)
                if (el) {
                    const top = el.offsetTop - 100
                    if (window.scrollY >= top) {
                        current = id
                    }
                }
            }
            setActiveId(current)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [sectionIds])

    return activeId
}
