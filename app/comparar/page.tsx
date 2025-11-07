import type { Metadata } from "next"
import CompararClientPage from "./comparar-client-page"

export const metadata: Metadata = {
  title: "Comparar Motos - Elige la Mejor Opción | Kustom Mania",
  description:
    "Herramienta profesional para comparar hasta 3 motocicletas custom lado a lado en Argentina. Analiza precios, especificaciones técnicas, cilindrada, año, kilometraje y características detalladas para tomar la mejor decisión de compra. Compara Harley Davidson, choppers, bobbers y motos clásicas de nuestro catálogo en Córdoba. Encuentra diferencias clave entre modelos, evalúa relación precio-prestaciones y elige tu moto ideal con información completa y transparente.",
  keywords: [
    // Primary - focus on comparison tool
    "comparar motos custom",
    "comparador motocicletas",
    "comparar Harley Davidson",
    "diferencias entre motos",
    "elegir moto custom",
    "comparar precios motos",
    "especificaciones técnicas motos",
    "comparar modelos",
    "análisis motos",
    "herramienta comparación",
  ],
  alternates: {
    canonical: "https://www.kustom-mania.com.ar/comparar",
  },
}

export default function CompararPage() {
  return (
    <>
      <div className="bg-zinc-950 py-16 px-4 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Comparador de Motocicletas Custom - Encuentra tu Moto Ideal
          </h1>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-lg">
              Utiliza nuestra herramienta profesional de comparación para analizar hasta tres motocicletas custom de
              forma simultánea y detallada. Este comparador te permite visualizar lado a lado las especificaciones
              técnicas, características, precios y condiciones de diferentes modelos de nuestro catálogo en Córdoba,
              facilitando enormemente tu decisión de compra. Ideal para evaluar opciones entre distintas Harley
              Davidson, comparar choppers personalizadas, analizar bobbers o elegir entre motos clásicas vintage de
              diferentes años y cilindradas.
            </p>
            <p className="text-lg">
              La comparación incluye información clave como precio en pesos argentinos, marca y modelo exacto, año de
              fabricación, kilometraje real, cilindrada del motor, tipo de moto (custom, chopper, bobber, café racer),
              estado general, y todas las características particulares de cada unidad. Podrás identificar rápidamente
              las diferencias entre modelos similares, evaluar la relación precio-prestaciones, y determinar cuál moto
              se ajusta mejor a tu presupuesto, necesidades y estilo personal. Desde Kustom Mania en Córdoba, esta
              herramienta está diseñada para brindarte total transparencia y ayudarte a tomar la mejor decisión con
              información completa y verificada de cada motocicleta en stock.
            </p>
            <p className="text-lg">
              Selecciona las motos que te interesan de nuestro amplio catálogo y compáralas fácilmente para descubrir
              cuál ofrece el mejor valor. Ya sea que busques una Harley Davidson clásica, una chopper de fabricación
              nacional o una bobber importada, nuestro sistema de comparación te mostrará todos los detalles relevantes
              en un formato claro y visual. Una vez hayas elegido tu moto favorita, contáctanos por WhatsApp para
              coordinar una visita a nuestro showroom en Córdoba, realizar videollamada en vivo para verla en detalle, o
              solicitar información adicional sobre financiación, permutas y envíos a todo Argentina. Hacemos simple el
              proceso de encontrar y adquirir tu próxima motocicleta custom con total confianza y respaldo profesional.
            </p>
          </div>
        </div>
      </div>
      <CompararClientPage />
    </>
  )
}
