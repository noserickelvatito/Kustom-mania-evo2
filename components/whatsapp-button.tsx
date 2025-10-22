"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface WhatsAppButtonProps {
  motorcycleName: string
  whatsappNumber: string
  motorcycleId: string
}

export function WhatsAppButton({ motorcycleName, whatsappNumber, motorcycleId }: WhatsAppButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleWhatsAppClick = async () => {
    setIsLoading(true)

    try {
      // Get user location (optional)
      let location = "ubicación no especificada"
      if (navigator.geolocation) {
        // For now, we'll ask the user to provide location in the form
        location = "ubicación a confirmar"
      }

      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get("utm_source")
      const utmMedium = urlParams.get("utm_medium")
      const utmCampaign = urlParams.get("utm_campaign")

      // Save lead to database (no auth required due to RLS policy)
      const supabase = createClient()
      await supabase.from("leads").insert({
        name: "Consulta desde detalle",
        location: location,
        motorcycle_id: motorcycleId,
        motorcycle_name: motorcycleName,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        origin_route: window.location.pathname,
      })

      // Generate WhatsApp message
      const message = `Hola Kustom Mania, estoy interesado en la moto ${motorcycleName} desde ${location}. ¿Podrían darme más información?`

      const formattedNumber = whatsappNumber.replace(/\D/g, "")
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`

      // Open WhatsApp
      window.open(whatsappUrl, "_blank")
    } catch (error) {
      console.error("[v0] Error saving lead:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      disabled={isLoading}
      className="w-full py-4 px-8 text-base sm:text-lg tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: "#25D366",
        color: "white",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
      }}
    >
      <span className="relative z-10">{isLoading ? "ENVIANDO..." : "CONSULTAR POR WHATSAPP"}</span>
      <div
        className="absolute inset-0 bg-[#1ea952] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{
          boxShadow: "0 0 30px rgba(30, 169, 82, 0.6)",
        }}
      />
    </button>
  )
}
