"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants"

const faqs = [
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Sí, realizamos envíos a todo Argentina. Trabajamos con transportes especializados en motocicletas para garantizar que tu moto llegue en perfectas condiciones. El costo de envío varía según la distancia y el tipo de moto.",
  },
  {
    question: "¿Aceptan permutas?",
    answer:
      "Sí, aceptamos permutas. Evaluamos tu moto actual y te ofrecemos el mejor valor del mercado. Podés permutar por una moto de mayor, menor o igual valor ajustando la diferencia.",
  },
  {
    question: "¿Ofrecen financiación?",
    answer:
      "Sí, ofrecemos diferentes opciones de financiación. Trabajamos con entidades bancarias y también podemos coordinar planes de pago personalizados. Consultanos por WhatsApp para más información.",
  },
  {
    question: "¿Las motos tienen garantía?",
    answer:
      "Todas nuestras motos son inspeccionadas antes de la venta. Además, entregamos toda la documentación al día y podemos coordinar una verificación mecánica si lo deseas.",
  },
  {
    question: "¿Puedo ver la moto antes de comprar?",
    answer:
      "¡Por supuesto! Te invitamos a visitar nuestro showroom en Córdoba para ver la moto en persona, probarla y resolver todas tus dudas. También podemos coordinar videollamadas para mostrarte la moto en detalle si estás en otra provincia.",
  },
  {
    question: "¿Qué marcas de motos manejan?",
    answer:
      "Nos especializamos en motos custom, principalmente Harley Davidson, choppers, bobbers, cafe racers y motos clásicas. También manejamos otras marcas según disponibilidad del stock.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative bg-zinc-950 py-24 md:py-36 overflow-hidden">
      {/* Background effects */}
      <div className="orb orb-bronze w-[400px] h-[400px] top-1/4 -left-32 animate-float-slow opacity-15" />
      <div className="orb orb-gold w-[300px] h-[300px] bottom-1/4 -right-24 animate-float-reverse opacity-10" />
      
      {/* Section dividers */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#b87333]/10 border border-[#b87333]/20 mb-6">
            <HelpCircle className="w-4 h-4 text-[#b87333]" />
            <span className="text-sm text-[#d4a574] tracking-wider uppercase font-medium">Preguntas Frecuentes</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Preguntas <span className="text-[#b87333]">Frecuentes</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Respuestas a las dudas más comunes sobre nuestros servicios
          </p>
          <div className="decorative-line mx-auto mt-8" />
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl bg-zinc-900/50 border transition-all duration-500 overflow-hidden backdrop-blur-sm ${
                openIndex === index 
                  ? "border-[#b87333]/50 shadow-lg shadow-[#b87333]/10" 
                  : "border-zinc-800/50 hover:border-zinc-700"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    openIndex === index 
                      ? "bg-[#b87333] text-black" 
                      : "bg-zinc-800/50 text-[#b87333] group-hover:bg-zinc-800"
                  }`}>
                    <span className="font-bold text-sm">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                    openIndex === index ? "text-[#b87333]" : "text-white group-hover:text-gray-200"
                  }`}>
                    {faq.question}
                  </h3>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ml-4 ${
                  openIndex === index 
                    ? "bg-[#b87333]/20 rotate-180" 
                    : "bg-zinc-800/50 group-hover:bg-zinc-800"
                }`}>
                  <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                    openIndex === index ? "text-[#b87333]" : "text-gray-400"
                  }`} />
                </div>
              </button>
              <div
                className={`transition-all duration-500 ease-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                  <div className="pl-14 border-l-2 border-[#b87333]/30 ml-5">
                    <p className="text-gray-400 leading-relaxed text-base md:text-lg">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">¿Tenés otra pregunta?</p>
          <a
            href={`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#20BA5A] transition-colors font-semibold"
          >
            <span>Contactanos por WhatsApp</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
