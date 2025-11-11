import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants"
import { MotorcycleDetailClient } from "./motorcycle-detail-client"

export default async function MotorcycleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: motorcycle } = await supabase.from("motorcycles").select("*").eq("slug", slug).single()

  if (!motorcycle) {
    notFound()
  }

  const { data: images } = await supabase
    .from("motorcycle_images")
    .select("*")
    .eq("motorcycle_id", motorcycle.id)
    .order("display_order", { ascending: true })

  const { data: config } = await supabase.from("site_config").select("whatsapp_number").single()

  return (
    <MotorcycleDetailClient
      motorcycle={motorcycle}
      images={images || []}
      whatsappNumber={config?.whatsapp_number || DEFAULT_WHATSAPP_NUMBER}
    />
  )
}
