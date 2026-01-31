import React, { useEffect, useState } from 'react'

const useParallax = (bgRef: React.RefObject<HTMLDivElement | null>) => {

    const [offsetY, setOffsetY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
          if (!bgRef.current) return
          const scrollY = window.scrollY
          const speed = 0.4 
          setOffsetY(scrollY * speed)
        }
    
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
      }, [bgRef])
      
  return { offsetY }
}

export default useParallax
