"use client"

import { useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants"
import { trackGenerateLead } from "@/lib/analytics"

interface WhatsAppButtonProps {
  motorcycleName: string
  whatsappNumber: string
  motorcycleId: string
  motorcycleBrand?: string | null
  motorcycleType?: string | null
  motorcyclePrice?: number
}

export function WhatsAppButton({
  motorcycleName,
  whatsappNumber,
  motorcycleId,
  motorcycleBrand,
  motorcycleType,
  motorcyclePrice,
}: WhatsAppButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleWhatsAppClick = async () => {
    setIsLoading(true)

    try {
      // Track generate_lead event in GA4
      trackGenerateLead(
        {
          product_id: motorcycleId,
          product_name: motorcycleName,
          marca: motorcycleBrand,
          tipo_de_moto: motorcycleType,
          price: motorcyclePrice,
          currency: "ARS",
        },
        "whatsapp"
      )

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

      const formattedNumber = (whatsappNumber || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "")
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
      className="w-full py-4 px-6 sm:px-8 text-sm sm:text-base md:text-lg tracking-wider uppercase font-bold transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center gap-3"
      style={{
        background: "linear-gradient(135deg, #25D366, #20BA5A)",
        color: "white",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4), 0 0 40px rgba(37, 211, 102, 0.2)",
      }}
    >
      <Image
        src="/images/whatsapp-logo.svg"
        alt="WhatsApp"
        width={24}
        height={24}
        className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform relative z-10"
      />
      <span className="relative z-10">{isLoading ? "ENVIANDO..." : "CONSULTAR POR WHATSAPP"}</span>
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1ea952] to-[#128C7E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"
        style={{
          boxShadow: "0 0 30px rgba(30, 169, 82, 0.6)",
        }}
      />
    </button>
  )
}
