import { useEffect } from 'react'

const useCardScrollAnimation = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
              } else {
                entry.target.classList.remove("visible");
              }
            });
          });
          
          document.querySelectorAll(".animation-card").forEach(card => {
            observer.observe(card);
          });
    }, [])
    
  return null;
}

export default useCardScrollAnimation
