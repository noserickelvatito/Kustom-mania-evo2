import { createClient } from "@/lib/supabase/server"
import { CollectionClient } from "@/components/collection-client"
import type { Motorcycle } from "@/lib/types"
import type { Metadata } from "next"

export const revalidate = 120

export const metadata: Metadata = {
  title: "Catálogo de Motos Custom en Venta | Kustom Mania",
  description:
    "Catálogo completo de motos custom en Argentina. Harley Davidson, choppers, bobbers, cafe racer y motos clásicas. Stock actualizado, calidad garantizada, mejores precios del mercado. Showroom en Córdoba. Financiación y permutas disponibles.",
  keywords: [
    // Primary keywords - focus on catalog/collection
    "motos custom en venta",
    "catálogo motos custom",
    "comprar moto custom",
    "Harley Davidson en venta",
    // Types
    "choppers en venta",
    "bobbers Argentina",
    "cafe racer venta",
    "motos clásicas Argentina",
    // Transactional
    "stock motos custom",
    "motos usadas custom",
    "precio motos custom",
    "financiación motos",
    // Local
    "motos Córdoba",
    "showroom motos",
  ],
  openGraph: {
    title: "Catálogo de Motos Custom | Kustom Mania",
    description:
      "Descubre nuestra colección de +20 motos custom en stock. Harley Davidson, choppers, bobbers. Calidad garantizada y mejores precios.",
    url: "/coleccion",
    type: "website",
    images: [
      {
        url: "/og-image-collection.jpg",
        width: 1200,
        height: 630,
        alt: "Colección de motocicletas custom Kustom Mania - Showroom Córdoba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo Motos Custom | Kustom Mania",
    description: "Harley Davidson, choppers y bobbers en stock. Calidad garantizada.",
    images: ["/og-image-collection.jpg"],
  },
  alternates: {
    canonical: "https://www.kustom-mania.com.ar/coleccion",
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

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Motocicletas Custom en Venta",
    description: "Colección completa de motos custom disponibles en Kustom Mania",
    numberOfItems: motorcycles?.length || 0,
    itemListElement: motorcycles?.slice(0, 10).map((moto, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/coleccion/${moto.slug}`,
        name: moto.name,
        description: moto.description,
        image: moto.images?.[0]?.image_url,
        brand: {
          "@type": "Brand",
          name: moto.brand || "Custom",
        },
        offers: {
          "@type": "Offer",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/coleccion/${moto.slug}`,
          priceCurrency: "ARS",
          price: moto.price,
          availability: moto.status === "stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/UsedCondition",
        },
      },
    })),
  }

  return (
    <div className="min-h-screen bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <h1 className="sr-only">
        Catálogo Completo de Motos Custom en Venta - Harley Davidson, Choppers, Bobbers en Córdoba Argentina
      </h1>

      <CollectionClient motorcycles={motorcyclesWithImages} brands={brands} types={types} />
    </div>
  )
}
