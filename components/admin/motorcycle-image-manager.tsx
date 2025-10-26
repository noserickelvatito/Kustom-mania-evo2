"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Star, Trash2, GripVertical } from "lucide-react"
import { MultiImageUploader } from "./multi-image-uploader"

interface MotorcycleImage {
  id: string
  image_url: string
  display_order: number
  is_primary: boolean
}

interface MotorcycleImageManagerProps {
  motorcycleId: string
}

export function MotorcycleImageManager({ motorcycleId }: MotorcycleImageManagerProps) {
  const [images, setImages] = useState<MotorcycleImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadImages = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("motorcycle_images")
        .select("*")
        .eq("motorcycle_id", motorcycleId)
        .order("display_order")

      if (error) throw error
      setImages(data || [])
    } catch (err) {
      console.error("[v0] Error loading images:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadImages()
  }, [motorcycleId])

  const handleSetPrimary = async (imageId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("motorcycle_images").update({ is_primary: true }).eq("id", imageId)

      if (error) throw error
      await loadImages()
    } catch (err) {
      console.error("[v0] Error setting primary image:", err)
      alert("Error al establecer imagen principal")
    }
  }

  const handleDelete = async (imageId: string) => {
    if (!confirm("¿Eliminar esta imagen?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("motorcycle_images").delete().eq("id", imageId)

      if (error) throw error
      await loadImages()
    } catch (err) {
      console.error("[v0] Error deleting image:", err)
      alert("Error al eliminar imagen")
    }
  }

  const handleReorder = async (imageId: string, newOrder: number) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("motorcycle_images").update({ display_order: newOrder }).eq("id", imageId)

      if (error) throw error
      await loadImages()
    } catch (err) {
      console.error("[v0] Error reordering image:", err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div>
        <h3 className="text-lg font-semibold text-[#b87333] mb-4">Subir Nuevas Imágenes</h3>
        <MultiImageUploader motorcycleId={motorcycleId} onUploadComplete={loadImages} />
      </div>

      {/* Existing Images */}
      <div>
        <h3 className="text-lg font-semibold text-[#b87333] mb-4">Imágenes Actuales ({images.length})</h3>

        {isLoading ? (
          <p className="text-gray-400">Cargando imágenes...</p>
        ) : images.length === 0 ? (
          <p className="text-gray-400">No hay imágenes. Sube algunas arriba.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative rounded-lg overflow-hidden border border-gray-700"
                style={{ background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)" }}
              >
                {/* Image */}
                <div className="aspect-square relative">
                  <img
                    src={image.image_url || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Primary Badge */}
                  {image.is_primary && (
                    <div className="absolute top-2 left-2 bg-[#b87333] text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Principal
                    </div>
                  )}

                  {/* Order Badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    #{image.display_order}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-2 space-y-2">
                  <div className="flex gap-2">
                    {!image.is_primary && (
                      <Button
                        onClick={() => handleSetPrimary(image.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#b87333] text-[#b87333] hover:bg-[#b87333] hover:text-white bg-transparent text-xs"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Principal
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(image.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Reorder */}
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={image.display_order}
                      onChange={(e) => handleReorder(image.id, Number.parseInt(e.target.value) || 0)}
                      className="flex-1 bg-black/50 border border-gray-600 text-white text-xs px-2 py-1 rounded"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
