"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { X, Upload, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ImageFile {
  file: File
  preview: string
  progress: number
  error: string | null
  uploaded: boolean
}

interface MultiImageUploaderProps {
  motorcycleId: string
  onUploadComplete?: () => void
}

export function MultiImageUploader({ motorcycleId, onUploadComplete }: MultiImageUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = document.createElement("img")
        img.onload = () => {
          const canvas = document.createElement("canvas")
          let width = img.width
          let height = img.height

          // Max dimensions
          const MAX_WIDTH = 1920
          const MAX_HEIGHT = 1920

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext("2d")
          ctx?.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
                resolve(compressedFile)
              } else {
                resolve(file)
              }
            },
            "image/jpeg",
            0.85,
          )
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    })
  }

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return

    const newImages: ImageFile[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith("image/")) continue

      const preview = URL.createObjectURL(file)
      newImages.push({
        file,
        preview,
        progress: 0,
        error: null,
        uploaded: false,
      })
    }

    setImages((prev) => [...prev, ...newImages])
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const uploadImage = async (imageFile: ImageFile, index: number): Promise<string> => {
    const supabase = createClient()

    // Compress image
    const compressedFile = await compressImage(imageFile.file)

    // Generate unique filename
    const fileExt = compressedFile.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from("motorcycle-images").upload(fileName, compressedFile, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) throw error

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("motorcycle-images").getPublicUrl(fileName)

    return publicUrl
  }

  const handleUploadAll = async () => {
    if (images.length === 0) return

    setIsUploading(true)

    for (let i = 0; i < images.length; i++) {
      if (images[i].uploaded) continue

      try {
        // Update progress
        setImages((prev) => {
          const newImages = [...prev]
          newImages[i].progress = 10
          return newImages
        })

        // Upload file
        const imageUrl = await uploadImage(images[i], i)

        // Update progress
        setImages((prev) => {
          const newImages = [...prev]
          newImages[i].progress = 50
          return newImages
        })

        // Save to database
        const supabase = createClient()
        const { error } = await supabase.from("motorcycle_images").insert({
          motorcycle_id: motorcycleId,
          image_url: imageUrl,
          display_order: i,
          is_primary: i === 0, // First image is primary by default
        })

        if (error) throw error

        // Mark as uploaded
        setImages((prev) => {
          const newImages = [...prev]
          newImages[i].progress = 100
          newImages[i].uploaded = true
          return newImages
        })
      } catch (err) {
        console.error("[v0] Error uploading image:", err)
        setImages((prev) => {
          const newImages = [...prev]
          newImages[i].error = err instanceof Error ? err.message : "Error al subir"
          return newImages
        })
      }
    }

    setIsUploading(false)

    // Clear uploaded images after a delay
    setTimeout(() => {
      setImages((prev) => prev.filter((img) => !img.uploaded))
      onUploadComplete?.()
    }, 1000)
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging ? "border-[#b87333] bg-[#b87333]/10" : "border-gray-600 hover:border-[#b87333]/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-300 mb-2">Arrastra imágenes aquí o haz clic para seleccionar</p>
        <p className="text-sm text-gray-500">
          Soporta múltiples archivos. Las imágenes se comprimirán automáticamente.
        </p>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">{images.length} imagen(es) seleccionada(s)</p>
            <Button
              onClick={handleUploadAll}
              disabled={isUploading || images.every((img) => img.uploaded)}
              style={{ background: "#b87333", color: "white" }}
            >
              {isUploading ? "Subiendo..." : "Subir Todas"}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden border border-gray-700"
                style={{ background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)" }}
              >
                {/* Image Preview */}
                <div className="aspect-square relative">
                  <img
                    src={image.preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Primary Badge */}
                  {index === 0 && !image.uploaded && (
                    <div className="absolute top-2 left-2 bg-[#b87333] text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Principal
                    </div>
                  )}

                  {/* Remove Button */}
                  {!image.uploaded && !isUploading && (
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {/* Upload Status */}
                  {image.uploaded && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <div className="bg-green-500 text-white text-xs px-3 py-1 rounded">✓ Subida</div>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {image.progress > 0 && !image.uploaded && (
                  <div className="p-2">
                    <Progress value={image.progress} className="h-1" />
                  </div>
                )}

                {/* Error Message */}
                {image.error && (
                  <div className="p-2 bg-red-900/30">
                    <p className="text-xs text-red-400">{image.error}</p>
                  </div>
                )}

                {/* File Info */}
                <div className="p-2">
                  <p className="text-xs text-gray-400 truncate">{image.file.name}</p>
                  <p className="text-xs text-gray-500">{(image.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
