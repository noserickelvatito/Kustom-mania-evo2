import type { Metadata } from "next"
import CompararClientPage from "./comparar-client-page"

export const metadata: Metadata = {
  title: "Comparar Motos Custom | Kustom Mania Argentina",
  description:
    "Compara hasta 3 motocicletas custom lado a lado. Analiza precios, especificaciones y características para encontrar tu moto ideal en Kustom Mania.",
  alternates: {
    canonical: "https://www.kustom-mania.com.ar/comparar",
  },
}

export default function CompararPage() {
  return <CompararClientPage />
}
