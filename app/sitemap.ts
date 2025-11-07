import { createClient } from "@/lib/supabase/server"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kustommania.com"
  const supabase = await createClient()

  // Get all motorcycles for dynamic routes
  const { data: motorcycles } = await supabase.from("motorcycles").select("slug, updated_at").eq("status", "stock")

  const motorcycleUrls = (motorcycles || []).map((moto) => ({
    url: `${baseUrl}/coleccion/${moto.slug}`,
    lastModified: new Date(moto.updated_at),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/coleccion`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/comparar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...motorcycleUrls,
  ]
}
