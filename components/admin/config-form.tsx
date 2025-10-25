"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { SiteConfig } from "@/lib/types"

interface ConfigFormProps {
  config: SiteConfig | null
}

export function ConfigForm({ config }: ConfigFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    whatsapp_number: config?.whatsapp_number || "",
    hero_title: config?.hero_title || "KUSTOM MANIA",
    hero_subtitle: config?.hero_subtitle || "PASIÓN POR LAS DOS RUEDAS",
    hero_description: config?.hero_description || "Donde la personalidad se encuentra con el asfalto.",
    hero_button_text: config?.hero_button_text || "EXPLORAR LA COLECCIÓN",
    hero_background_url: config?.hero_background_url || "",
    instagram_url: config?.instagram_url || "",
    facebook_url: config?.facebook_url || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()

      const configData = {
        whatsapp_number: formData.whatsapp_number,
        hero_title: formData.hero_title,
        hero_subtitle: formData.hero_subtitle,
        hero_description: formData.hero_description,
        hero_button_text: formData.hero_button_text,
        hero_background_url: formData.hero_background_url || null,
        instagram_url: formData.instagram_url || null,
        facebook_url: formData.facebook_url || null,
        updated_at: new Date().toISOString(),
      }

      if (config) {
        // Update existing config
        const { error } = await supabase.from("site_config").update(configData).eq("id", config.id)

        if (error) throw error
      } else {
        // Create new config (shouldn't happen, but just in case)
        const { error } = await supabase.from("site_config").insert(configData)

        if (error) throw error
      }

      setSuccess(true)
      router.refresh()

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("[v0] Error saving config:", err)
      setError(err instanceof Error ? err.message : "Error al guardar la configuración")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* WhatsApp */}
      <div>
        <Label htmlFor="whatsapp_number" className="text-gray-300">
          Número de WhatsApp *
        </Label>
        <Input
          id="whatsapp_number"
          name="whatsapp_number"
          value={formData.whatsapp_number}
          onChange={handleChange}
          required
          className="bg-black/50 border-[#b87333] text-white mt-2"
          placeholder="+5491112345678"
        />
        <p className="text-xs text-gray-500 mt-1">Incluye el código de país (ej: +54 para Argentina)</p>
      </div>

      {/* Hero Section */}
      <div className="space-y-4 pt-4 border-t border-gray-800">
        <h3 className="text-lg font-semibold" style={{ color: "#b87333" }}>
          Sección Hero (Página Principal)
        </h3>

        <div>
          <Label htmlFor="hero_background_url" className="text-gray-300">
            URL de Fondo Hero (AWS S3)
          </Label>
          <Input
            id="hero_background_url"
            name="hero_background_url"
            type="url"
            value={formData.hero_background_url}
            onChange={handleChange}
            className="bg-black/50 border-[#b87333] text-white mt-2"
            placeholder="https://tu-bucket.s3.region.amazonaws.com/imagen.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">Soporta imágenes (.jpg, .png, .webp) y videos (.mp4, .webm)</p>
        </div>

        <div>
          <Label htmlFor="hero_title" className="text-gray-300">
            Título Principal *
          </Label>
          <Input
            id="hero_title"
            name="hero_title"
            value={formData.hero_title}
            onChange={handleChange}
            required
            className="bg-black/50 border-[#b87333] text-white mt-2"
            placeholder="KUSTOM MANIA"
          />
        </div>

        <div>
          <Label htmlFor="hero_subtitle" className="text-gray-300">
            Subtítulo *
          </Label>
          <Input
            id="hero_subtitle"
            name="hero_subtitle"
            value={formData.hero_subtitle}
            onChange={handleChange}
            required
            className="bg-black/50 border-[#b87333] text-white mt-2"
            placeholder="PASIÓN POR LAS DOS RUEDAS"
          />
        </div>

        <div>
          <Label htmlFor="hero_description" className="text-gray-300">
            Descripción *
          </Label>
          <Textarea
            id="hero_description"
            name="hero_description"
            value={formData.hero_description}
            onChange={handleChange}
            required
            rows={3}
            className="bg-black/50 border-[#b87333] text-white mt-2"
            placeholder="Donde la personalidad se encuentra con el asfalto."
          />
        </div>

        <div>
          <Label htmlFor="hero_button_text" className="text-gray-300">
            Texto del Botón *
          </Label>
          <Input
            id="hero_button_text"
            name="hero_button_text"
            value={formData.hero_button_text}
            onChange={handleChange}
            required
            className="bg-black/50 border-[#b87333] text-white mt-2"
            placeholder="EXPLORAR LA COLECCIÓN"
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4 pt-4 border-t border-gray-800">
        <h3 className="text-lg font-semibold" style={{ color: "#b87333" }}>
          Redes Sociales (Opcional)
        </h3>

        <div>
          <Label htmlFor="instagram_url" className="text-gray-300">
            Instagram URL
          </Label>
          <Input
            id="instagram_url"
            name="instagram_url"
            type="url"
            value={formData.instagram_url}
            onChange={handleChange}
            className="bg-black/50 border-[#b87333] text-white mt-2"
            placeholder="https://instagram.com/kustommania"
          />
        </div>

        <div>
          <Label htmlFor="facebook_url" className="text-gray-300">
            Facebook URL
          </Label>
          <Input
            id="facebook_url"
            name="facebook_url"
            type="url"
            value={formData.facebook_url}
            onChange={handleChange}
            className="bg-black/50 border-[#b87333] text-white mt-2"
            placeholder="https://facebook.com/kustommania"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500 rounded">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-900/30 border border-green-500 rounded">
          <p className="text-green-400 text-sm">Configuración guardada exitosamente</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1"
          style={{
            background: "#b87333",
            color: "white",
          }}
        >
          {isLoading ? "Guardando..." : "Guardar Configuración"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/km-secret-panel-2025")}
          disabled={isLoading}
          className="border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
