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
  return <CompararClientPage />
}
