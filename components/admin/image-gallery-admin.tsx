"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ImageGalleryAdminProps {
  images: Array<{
    id: string
    motorcycle_id: string
    image_url: string
    display_order: number
    created_at: string
    motorcycles: { name: string } | null
  }>
  motorcycles: Array<{ id: string; name: string; slug: string }>
}

export function ImageGalleryAdmin({ images, motorcycles }: ImageGalleryAdminProps) {
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editOrder, setEditOrder] = useState("")
  const [editMotorcycle, setEditMotorcycle] = useState("")

  const handleDelete = async (imageId: string) => {
    if (!confirm("¿Estás seguro de eliminar esta imagen?")) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from("motorcycle_images").delete().eq("id", imageId)

      if (error) throw error

      router.refresh()
    } catch (err) {
      console.error("[v0] Error deleting image:", err)
      alert("Error al eliminar la imagen")
    }
  }

  const handleEdit = (image: (typeof images)[0]) => {
    setEditingId(image.id)
    setEditOrder(image.display_order.toString())
    setEditMotorcycle(image.motorcycle_id)
  }

  const handleSaveEdit = async (imageId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("motorcycle_images")
        .update({
          display_order: Number.parseInt(editOrder) || 0,
          motorcycle_id: editMotorcycle,
        })
        .eq("id", imageId)

      if (error) throw error

      setEditingId(null)
      router.refresh()
    } catch (err) {
      console.error("[v0] Error updating image:", err)
      alert("Error al actualizar la imagen")
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditOrder("")
    setEditMotorcycle("")
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No hay imágenes subidas aún</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #333, #1a1a1a)",
            border: "1px solid #b87333",
          }}
        >
          {/* Image */}
          <div className="relative h-48 bg-black/50">
            <img src={image.image_url || "/placeholder.svg"} alt="Motorcycle" className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="p-4 space-y-3">
            {editingId === image.id ? (
              <>
                <div>
                  <label className="text-xs text-gray-400">Motocicleta</label>
                  <select
                    value={editMotorcycle}
                    onChange={(e) => setEditMotorcycle(e.target.value)}
                    className="w-full mt-1 px-2 py-1 bg-black/50 border border-[#b87333] text-white text-sm rounded"
                  >
                    {motorcycles.map((moto) => (
                      <option key={moto.id} value={moto.id}>
                        {moto.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400">Orden</label>
                  <Input
                    type="number"
                    value={editOrder}
                    onChange={(e) => setEditOrder(e.target.value)}
                    className="bg-black/50 border-[#b87333] text-white mt-1"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleSaveEdit(image.id)}
                    size="sm"
                    className="flex-1"
                    style={{ background: "#b87333", color: "white" }}
                  >
                    Guardar
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent"
                  >
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-[#b87333] font-semibold">{image.motorcycles?.name || "Sin asignar"}</p>
                  <p className="text-xs text-gray-400">Orden: {image.display_order}</p>
                </div>

                <div className="text-xs text-gray-500 break-all">{image.image_url}</div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(image)}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-[#b87333] text-[#b87333] hover:bg-[#b87333] hover:text-white bg-transparent"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(image.id)}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                  >
                    Eliminar
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
