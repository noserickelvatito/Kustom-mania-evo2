"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    localidad: "",
    dni: "",
    modelo: "",
    motivoConsulta: "",
    interes: "",
    preguntaEspecifica: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState("")

  useEffect(() => {
    const fetchConfig = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("site_config").select("whatsapp_number").single()
      if (data) {
        setWhatsappNumber(data.whatsapp_number)
      }
    }
    fetchConfig()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Get UTM parameters
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get("utm_source")
      const utmMedium = urlParams.get("utm_medium")
      const utmCampaign = urlParams.get("utm_campaign")

      await supabase.from("leads").insert({
        name: formData.nombre,
        location: formData.localidad,
        dni: formData.dni || null,
        motorcycle_id: null,
        motorcycle_name: formData.modelo || null,
        consultation_reason: formData.motivoConsulta || null,
        interest_area: formData.interes || null,
        specific_question: formData.preguntaEspecifica || null,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        origin_route: window.location.pathname,
      })

      let message = `Hola Kustom Mania, soy ${formData.nombre} de ${formData.localidad}.`

      if (formData.dni) message += ` Mi DNI es ${formData.dni}.`
      if (formData.modelo) message += ` Estoy interesado en ${formData.modelo}.`
      if (formData.motivoConsulta) message += ` Motivo de consulta: ${formData.motivoConsulta}.`
      if (formData.interes) message += ` Me interesa: ${formData.interes}.`
      if (formData.preguntaEspecifica) message += ` Pregunta: ${formData.preguntaEspecifica}`

      const formattedNumber = whatsappNumber.replace(/\D/g, "")
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`

      window.open(whatsappUrl, "_blank")

      // Reset form
      setFormData({
        nombre: "",
        localidad: "",
        dni: "",
        modelo: "",
        motivoConsulta: "",
        interes: "",
        preguntaEspecifica: "",
      })
    } catch (error) {
      console.error("[v0] Error saving lead:", error)
      alert("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Header currentPage="contacto" whatsappNumber={whatsappNumber} />

      <div
        className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 md:px-8"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
        }}
      >
        {/* Metallic texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)",
          }}
        />

        <div className="relative z-10 w-full max-w-2xl">
          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-12 tracking-wider font-serif"
            style={{
              color: "#b87333",
              textShadow: "0 0 30px rgba(184, 115, 51, 0.5)",
            }}
          >
            CONTACTANOS POR WHATSAPP
          </h1>

          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 md:p-12 space-y-6"
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
              border: "2px solid #b87333",
              boxShadow: "0 0 50px rgba(184, 115, 51, 0.2)",
            }}
          >
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-gray-400 text-sm uppercase tracking-wider mb-3">
                Nombre *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-black/50 text-white text-base focus:outline-none transition-all duration-300 disabled:opacity-50"
                style={{ border: "2px solid #b87333" }}
                placeholder="Tu nombre completo"
              />
            </div>

            {/* Localidad */}
            <div>
              <label htmlFor="localidad" className="block text-gray-400 text-sm uppercase tracking-wider mb-3">
                Localidad *
              </label>
              <input
                type="text"
                id="localidad"
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-black/50 text-white text-base focus:outline-none transition-all duration-300 disabled:opacity-50"
                style={{ border: "2px solid #b87333" }}
                placeholder="Tu localidad"
              />
            </div>

            {/* DNI */}
            <div>
              <label htmlFor="dni" className="block text-gray-400 text-sm uppercase tracking-wider mb-3">
                DNI
              </label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-black/50 text-white text-base focus:outline-none transition-all duration-300 disabled:opacity-50"
                style={{ border: "2px solid #b87333" }}
                placeholder="Tu número de DNI"
              />
            </div>

            {/* Modelo */}
            <div>
              <label htmlFor="modelo" className="block text-gray-400 text-sm uppercase tracking-wider mb-3">
                Modelo de interés
              </label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-black/50 text-white text-base focus:outline-none transition-all duration-300 disabled:opacity-50"
                style={{ border: "2px solid #b87333" }}
                placeholder="Ej: Iron Custom 350"
              />
            </div>

            {/* Motivo de Consulta */}
            <div>
              <label htmlFor="motivoConsulta" className="block text-gray-400 text-sm uppercase tracking-wider mb-3">
                Motivo de consulta
              </label>
              <select
                id="motivoConsulta"
                name="motivoConsulta"
                value={formData.motivoConsulta}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-black/50 text-white text-base focus:outline-none transition-all duration-300 disabled:opacity-50"
                style={{ border: "2px solid #b87333" }}
              >
                <option value="">Selecciona una opción</option>
                <option value="Compra">Compra de motocicleta</option>
                <option value="Consulta técnica">Consulta técnica</option>
                <option value="Personalización">Personalización</option>
                <option value="Financiación">Financiación</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Qué te interesa */}
            <div>
              <label htmlFor="interes" className="block text-gray-400 text-sm uppercase tracking-wider mb-3">
                ¿Qué te interesa?
              </label>
              <input
                type="text"
                id="interes"
                name="interes"
                value={formData.interes}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-black/50 text-white text-base focus:outline-none transition-all duration-300 disabled:opacity-50"
                style={{ border: "2px solid #b87333" }}
                placeholder="Ej: Café racer, bobber, custom..."
              />
            </div>

            {/* Pregunta específica */}
            <div>
              <label htmlFor="preguntaEspecifica" className="block text-gray-400 text-sm uppercase tracking-wider mb-3">
                Pregunta específica sobre la moto
              </label>
              <textarea
                id="preguntaEspecifica"
                name="preguntaEspecifica"
                value={formData.preguntaEspecifica}
                onChange={handleChange}
                disabled={isLoading}
                rows={4}
                className="w-full px-4 py-3 bg-black/50 text-white text-base focus:outline-none transition-all duration-300 disabled:opacity-50 resize-none"
                style={{ border: "2px solid #b87333" }}
                placeholder="Escribe tu pregunta aquí..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-8 text-base sm:text-lg tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "#b87333",
                color: "white",
                boxShadow: "0 4px 20px rgba(184, 115, 51, 0.4)",
              }}
            >
              <span className="relative z-10">{isLoading ? "ENVIANDO..." : "ENVIAR POR WHATSAPP"}</span>
              <div
                className="absolute inset-0 bg-[#d4a574] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{
                  boxShadow: "0 0 30px rgba(212, 165, 116, 0.6)",
                }}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
