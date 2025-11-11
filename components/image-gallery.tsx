"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import type { MotorcycleImage } from "@/lib/types"
import { trackViewItemList } from "@/lib/analytics"

interface ImageGalleryProps {
  images: MotorcycleImage[]
  motorcycleName: string
  motorcycleId: string
  brand?: string | null
  type?: string | null
}

export function ImageGallery({ images, motorcycleName, motorcycleId, brand, type }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const trackedRef = useRef(false)

  // Track view_item_list when the gallery is viewed
  useEffect(() => {
    if (images.length > 1 && !trackedRef.current) {
      trackedRef.current = true
      trackViewItemList("Image Gallery", [
        {
          product_id: motorcycleId,
          product_name: motorcycleName,
          marca: brand,
          tipo_de_moto: type,
        },
      ])
    }
  }, [images.length, motorcycleId, motorcycleName, brand, type])

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
        <Image
          src={images[currentIndex].image_url || "/placeholder.svg"}
          alt={`${motorcycleName} - Imagen ${currentIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority={currentIndex === 0}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-[#b87333] transition-colors opacity-0 group-hover:opacity-100"
              style={{ minWidth: "44px", minHeight: "44px" }}
              aria-label="Imagen anterior"
            >
              <span className="text-white text-2xl">‹</span>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-[#b87333] transition-colors opacity-0 group-hover:opacity-100"
              style={{ minWidth: "44px", minHeight: "44px" }}
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
                minWidth: "44px",
                minHeight: "44px",
              }}
            >
              <Image
                src={image.image_url || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 640px) 25vw, 15vw"
                className="object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
