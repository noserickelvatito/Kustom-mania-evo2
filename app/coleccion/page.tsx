import { createClient } from "@/lib/supabase/server"
import { CollectionClient } from "@/components/collection-client"
import type { Motorcycle } from "@/lib/types"
import type { Metadata } from "next"

export const revalidate = 120

export const metadata: Metadata = {
  title: "Colección de Motos Custom | Harley Davidson y Choppers en Venta",
  description:
    "Explora nuestra colección de motocicletas custom, Harley Davidson, choppers y motos clásicas. Todas inspeccionadas y garantizadas. Precios competitivos y amplia variedad en stock.",
  keywords: [
    "motos custom en venta",
    "Harley Davidson usadas",
    "choppers Argentina",
    "motos clásicas venta",
    "catálogo motos custom",
    "motos segunda mano",
    "comprar Harley Davidson",
  ],
  openGraph: {
    title: "Colección de Motos Custom | Kustom Mania",
    description:
      "Descubre nuestra selección de motocicletas custom con calidad garantizada. Harley Davidson, choppers y más.",
    url: "/coleccion",
    images: [
      {
        url: "/og-image-collection.jpg",
        width: 1200,
        height: 630,
        alt: "Colección de motos custom Kustom Mania",
      },
    ],
  },
  alternates: {
    canonical: "/coleccion",
  },
}

export default async function ColeccionPage() {
  const supabase = await createClient()

  const { data: motorcycles } = await supabase
    .from("motorcycles")
    .select(
      `
      *,
      images:motorcycle_images!inner(image_url, is_primary, display_order)
    `,
    )
    .order("display_order", { ascending: true })

  const motorcyclesWithImages = (motorcycles || []).map((moto: Motorcycle) => {
    const primaryImage = moto.images?.find((img: any) => img.is_primary)
    const firstImage = moto.images?.[0]
    return {
      ...moto,
      image: primaryImage?.image_url || firstImage?.image_url || null,
    }
  })

  const brands = Array.from(new Set(motorcycles?.map((m) => m.brand).filter(Boolean))) as string[]
  const types = Array.from(new Set(motorcycles?.map((m) => m.motorcycle_type).filter(Boolean))) as string[]

  return <CollectionClient motorcycles={motorcyclesWithImages} brands={brands} types={types} />
}
