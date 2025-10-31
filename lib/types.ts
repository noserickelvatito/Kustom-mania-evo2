export interface Motorcycle {
  id: string
  name: string
  slug: string
  description: string
  engine: string
  exhaust: string
  paint: string
  modifications: string
  price: number
  price_usd: number | null
  offer_percentage: number | null
  featured: boolean
  display_order: number
  brand: string | null
  motorcycle_type: string | null
  year: number | null
  purchase_price: number | null
  sale_price: number | null
  expenses: number | null
  purchase_date: string | null
  sale_date: string | null
  status: "stock" | "reserved" | "sold" | "delivered" | null
  notes: string | null
  trade_in_motorcycle_id: string | null
  trade_in_value: number | null
  cash_payment: number | null
  created_at: string
  updated_at: string
}

export interface MotorcycleImage {
  id: string
  motorcycle_id: string
  image_url: string
  display_order: number
  created_at: string
}

export interface Lead {
  id: string
  name: string
  dni: string | null
  consultation_reason: string | null
  interest_area: string | null
  specific_question: string | null
  location: string
  motorcycle_id: string | null
  motorcycle_name: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  origin_route: string | null
  created_at: string
}

export interface SiteConfig {
  id: string
  whatsapp_number: string
  hero_title: string
  hero_subtitle: string
  hero_description: string
  hero_button_text: string
  hero_background_url: string | null
  instagram_url: string | null
  facebook_url: string | null
  updated_at: string
}
