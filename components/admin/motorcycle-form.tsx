"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { Motorcycle } from "@/lib/types"

interface MotorcycleFormProps {
  motorcycle?: Motorcycle
}

export function MotorcycleForm({ motorcycle }: MotorcycleFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: motorcycle?.name || "",
    slug: motorcycle?.slug || "",
    description: motorcycle?.description || "",
    engine: motorcycle?.engine || "",
    exhaust: motorcycle?.exhaust || "",
    paint: motorcycle?.paint || "",
    modifications: motorcycle?.modifications || "",
    price: motorcycle?.price?.toString() || "",
    price_usd: motorcycle?.price_usd?.toString() || "",
    offer_percentage: motorcycle?.offer_percentage?.toString() || "",
    featured: motorcycle?.featured || false,
    display_order: motorcycle?.display_order?.toString() || "0",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")

    setFormData((prev) => ({ ...prev, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const motorcycleData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        engine: formData.engine,
        exhaust: formData.exhaust,
        paint: formData.paint,
        modifications: formData.modifications,
        price: Number.parseFloat(formData.price) || null,
        price_usd: Number.parseFloat(formData.price_usd) || null,
        offer_percentage: Number.parseFloat(formData.offer_percentage) || null,
        featured: formData.featured,
        display_order: Number.parseInt(formData.display_order) || 0,
        updated_at: new Date().toISOString(),
      }

      if (motorcycle) {
        // Update existing motorcycle
        const { error } = await supabase.from("motorcycles").update(motorcycleData).eq("id", motorcycle.id)

        if (error) throw error
      } else {
        // Create new motorcycle
        const { error } = await supabase.from("motorcycles").insert(motorcycleData)

        if (error) throw error
      }

      router.push("/km-secret-panel-2025/motorcycles")
      router.refresh()
    } catch (err) {
      console.error("[v0] Error saving motorcycle:", err)
      setError(err instanceof Error ? err.message : "Error al guardar la motocicleta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      style={{
        background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
        border: "2px solid #b87333",
      }}
    >
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-gray-300">
              Nombre *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-black/50 border-[#b87333] text-white mt-2"
              placeholder="Ej: Iron Custom 350"
            />
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug" className="text-gray-300">
              Slug (URL) *
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="bg-black/50 border-[#b87333] text-white flex-1"
                placeholder="iron-custom-350"
              />
              <Button
                type="button"
                onClick={generateSlug}
                variant="outline"
                className="border-[#b87333] text-[#b87333] hover:bg-[#b87333] hover:text-white bg-transparent"
              >
                Generar
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">URL: /coleccion/{formData.slug || "slug"}</p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-gray-300">
              Descripción *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="bg-black/50 border-[#b87333] text-white mt-2"
              placeholder="Descripción completa de la motocicleta..."
            />
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="engine" className="text-gray-300">
                Motor *
              </Label>
              <Input
                id="engine"
                name="engine"
                value={formData.engine}
                onChange={handleChange}
                required
                className="bg-black/50 border-[#b87333] text-white mt-2"
                placeholder="350cc monocilíndrico..."
              />
            </div>

            <div>
              <Label htmlFor="exhaust" className="text-gray-300">
                Escape *
              </Label>
              <Input
                id="exhaust"
                name="exhaust"
                value={formData.exhaust}
                onChange={handleChange}
                required
                className="bg-black/50 border-[#b87333] text-white mt-2"
                placeholder="Escape artesanal..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="paint" className="text-gray-300">
              Pintura *
            </Label>
            <Input
              id="paint"
              name="paint"
              value={formData.paint}
              onChange={handleChange}
              required
              className="bg-black/50 border-[#b87333] text-white mt-2"
              placeholder="Bronce metálico..."
            />
          </div>

          <div>
            <Label htmlFor="modifications" className="text-gray-300">
              Modificaciones *
            </Label>
            <Textarea
              id="modifications"
              name="modifications"
              value={formData.modifications}
              onChange={handleChange}
              required
              rows={3}
              className="bg-black/50 border-[#b87333] text-white mt-2"
              placeholder="Manillar bajo, asiento de cuero..."
            />
          </div>

          {/* Pricing and Offers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#b87333]">Precios y Ofertas</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price" className="text-gray-300">
                  Precio (ARS)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-black/50 border-[#b87333] text-white mt-2"
                  placeholder="4500000"
                />
              </div>

              <div>
                <Label htmlFor="price_usd" className="text-gray-300">
                  Precio (USD)
                </Label>
                <Input
                  id="price_usd"
                  name="price_usd"
                  type="number"
                  value={formData.price_usd}
                  onChange={handleChange}
                  className="bg-black/50 border-[#b87333] text-white mt-2"
                  placeholder="4350"
                />
              </div>

              <div>
                <Label htmlFor="offer_percentage" className="text-gray-300">
                  Descuento (%)
                </Label>
                <Input
                  id="offer_percentage"
                  name="offer_percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.offer_percentage}
                  onChange={handleChange}
                  className="bg-black/50 border-[#b87333] text-white mt-2"
                  placeholder="15"
                />
                <p className="text-xs text-gray-500 mt-1">Dejar vacío si no hay oferta</p>
              </div>
            </div>
          </div>

          {/* Display Order and Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="display_order" className="text-gray-300">
                Orden de visualización
              </Label>
              <Input
                id="display_order"
                name="display_order"
                type="number"
                value={formData.display_order}
                onChange={handleChange}
                className="bg-black/50 border-[#b87333] text-white mt-2"
                placeholder="0"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#b87333]"
                />
                <span className="text-gray-300">Destacada</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-900/30 border border-red-500 rounded">
              <p className="text-red-400 text-sm">{error}</p>
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
              {isLoading ? "Guardando..." : motorcycle ? "Actualizar Motocicleta" : "Crear Motocicleta"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/km-secret-panel-2025/motorcycles")}
              disabled={isLoading}
              className="border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
