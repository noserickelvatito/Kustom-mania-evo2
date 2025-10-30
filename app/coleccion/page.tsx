import { createClient } from "@/lib/supabase/server"
import { CollectionClient } from "@/components/collection-client"
import type { Motorcycle } from "@/lib/types"

export default async function ColeccionPage() {
  const supabase = await createClient()

  const { data: motorcycles } = await supabase
    .from("motorcycles")
    .select("*")
    .order("display_order", { ascending: true })

  // Get primary image for each motorcycle
  const motorcyclesWithImages = await Promise.all(
    (motorcycles || []).map(async (moto: Motorcycle) => {
      const { data: images } = await supabase
        .from("motorcycle_images")
        .select("*")
        .eq("motorcycle_id", moto.id)
        .order("is_primary", { ascending: false })
        .order("display_order", { ascending: true })
        .limit(1)

      return {
        ...moto,
        image: images && images.length > 0 ? images[0].image_url : null,
      }
    }),
  )

  const brands = Array.from(new Set(motorcycles?.map((m) => m.brand).filter(Boolean))) as string[]
  const types = Array.from(new Set(motorcycles?.map((m) => m.motorcycle_type).filter(Boolean))) as string[]

  return <CollectionClient motorcycles={motorcyclesWithImages} brands={brands} types={types} />
}
