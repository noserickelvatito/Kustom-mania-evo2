"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-32 md:bottom-24 right-6 z-40 w-12 h-12 md:w-14 md:h-14 bg-[#b87333] hover:bg-[#d4a574] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group animate-fade-in"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:animate-bounce" />
        </button>
      )}
    </>
  )
}
