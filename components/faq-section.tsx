"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

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
    <section className="relative bg-black py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Preguntas <span className="text-[#b87333]">Frecuentes</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Respuestas a las dudas más comunes sobre nuestros servicios
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#b87333] transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
              >
                <h3 className="text-lg md:text-xl font-semibold text-white pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-[#b87333] transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
