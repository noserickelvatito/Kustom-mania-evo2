"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ImageUploaderProps {
  motorcycles: Array<{ id: string; name: string; slug: string }>
}

export function ImageUploader({ motorcycles }: ImageUploaderProps) {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedMotorcycle, setSelectedMotorcycle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [displayOrder, setDisplayOrder] = useState("0")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("file")

  const uploadFileToStorage = async (file: File): Promise<string> => {
    const supabase = createClient()

    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${fileName}`

    console.log("[v0] Uploading file to Supabase Storage:", filePath)

    const { data, error } = await supabase.storage.from("motorcycle-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("[v0] Storage upload error:", error)
      throw error
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("motorcycle-images").getPublicUrl(filePath)

    console.log("[v0] File uploaded successfully:", publicUrl)
    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setError(null)

    try {
      if (!selectedMotorcycle) {
        throw new Error("Selecciona una motocicleta")
      }

      let finalImageUrl = imageUrl

      if (uploadMethod === "file") {
        if (!selectedFile) {
          throw new Error("Selecciona un archivo de imagen")
        }
        // Upload file and get URL
        finalImageUrl = await uploadFileToStorage(selectedFile)
      } else {
        if (!imageUrl) {
          throw new Error("Ingresa una URL de imagen")
        }
      }

      const supabase = createClient()

      const { error } = await supabase.from("motorcycle_images").insert({
        motorcycle_id: selectedMotorcycle,
        image_url: finalImageUrl,
        display_order: Number.parseInt(displayOrder) || 0,
      })

      if (error) throw error

      // Reset form
      setImageUrl("")
      setDisplayOrder("0")
      setSelectedMotorcycle("")
      setSelectedFile(null)

      router.refresh()
    } catch (err) {
      console.error("[v0] Error uploading image:", err)
      setError(err instanceof Error ? err.message : "Error al subir la imagen")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="motorcycle" className="text-gray-300">
          Motocicleta *
        </Label>
        <select
          id="motorcycle"
          value={selectedMotorcycle}
          onChange={(e) => setSelectedMotorcycle(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 bg-black/50 border-2 border-[#b87333] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#b87333]"
        >
          <option value="">Selecciona una moto</option>
          {motorcycles.map((moto) => (
            <option key={moto.id} value={moto.id}>
              {moto.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label className="text-gray-300">Método de subida</Label>
        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={() => setUploadMethod("file")}
            className={`px-4 py-2 rounded-md transition-colors ${
              uploadMethod === "file" ? "bg-[#b87333] text-white" : "bg-black/50 text-gray-400 border border-[#b87333]"
            }`}
          >
            Subir Archivo
          </button>
          <button
            type="button"
            onClick={() => setUploadMethod("url")}
            className={`px-4 py-2 rounded-md transition-colors ${
              uploadMethod === "url" ? "bg-[#b87333] text-white" : "bg-black/50 text-gray-400 border border-[#b87333]"
            }`}
          >
            Usar URL
          </button>
        </div>
      </div>

      {uploadMethod === "file" ? (
        <div>
          <Label htmlFor="imageFile" className="text-gray-300">
            Seleccionar Imagen *
          </Label>
          <Input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            required
            className="bg-black/50 border-[#b87333] text-white mt-2"
          />
          {selectedFile && <p className="text-xs text-gray-400 mt-1">Archivo seleccionado: {selectedFile.name}</p>}
        </div>
      ) : (
        <div>
          <Label htmlFor="imageUrl" className="text-gray-300">
            URL de la Imagen *
          </Label>
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="bg-black/50 border-[#b87333] text-white mt-2"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            Puedes usar imágenes de Vercel Blob, URLs públicas, o las imágenes ya generadas en /public
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="displayOrder" className="text-gray-300">
          Orden de visualización
        </Label>
        <Input
          id="displayOrder"
          type="number"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(e.target.value)}
          className="bg-black/50 border-[#b87333] text-white mt-2"
          placeholder="0"
        />
        <p className="text-xs text-gray-500 mt-1">Las imágenes se ordenan de menor a mayor</p>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500 rounded">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isUploading}
        className="w-full"
        style={{
          background: "#b87333",
          color: "white",
        }}
      >
        {isUploading ? "Subiendo..." : "Subir Imagen"}
      </Button>
    </form>
  )
}
