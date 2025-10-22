"use client"

import { useState } from "react"
import type { MotorcycleImage } from "@/lib/types"

interface ImageGalleryProps {
  images: MotorcycleImage[]
  motorcycleName: string
}

export function ImageGallery({ images, motorcycleName }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div
        className="w-full h-96 flex items-center justify-center text-gray-600"
        style={{
          background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
          border: "2px solid #b87333",
        }}
      >
        Sin imágenes disponibles
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative w-full h-96 sm:h-[500px] overflow-hidden group"
        style={{
          background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
          border: "2px solid #b87333",
          boxShadow: "0 4px 20px rgba(184, 115, 51, 0.3)",
        }}
      >
        <img
          src={images[currentIndex].image_url || "/placeholder.svg"}
          alt={`${motorcycleName} - Imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/70 hover:bg-[#b87333] transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Imagen anterior"
            >
              <span className="text-white text-2xl">‹</span>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/70 hover:bg-[#b87333] transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Siguiente imagen"
            >
              <span className="text-white text-2xl">›</span>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-20 sm:h-24 overflow-hidden transition-all ${
                index === currentIndex ? "ring-2 ring-[#b87333]" : "opacity-60 hover:opacity-100"
              }`}
              style={{
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                border: "1px solid #b87333",
              }}
            >
              <img
                src={image.image_url || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
