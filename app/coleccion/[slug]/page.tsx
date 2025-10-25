import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ImageGallery } from "@/components/image-gallery"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PricingDisplay } from "@/components/pricing-display"

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
    <div className="min-h-screen bg-black pb-24 md:pb-8 md:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/coleccion"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#b87333] transition-colors mb-8 text-sm uppercase tracking-wider"
        >
          ← Volver a la colección
        </Link>

        <div
          className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8"
          style={{
            background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)",
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <ImageGallery images={images || []} motorcycleName={motorcycle.name} />

              {/* Details */}
              <div>
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-wide"
                  style={{
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                    color: "#b87333",
                    textShadow: "0 0 30px rgba(184, 115, 51, 0.5)",
                  }}
                >
                  {motorcycle.name}
                </h1>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">{motorcycle.description}</p>

                {/* Technical Specifications */}
                <div
                  className="p-6 mb-8"
                  style={{
                    background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                    border: "2px solid #b87333",
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-4 tracking-wide"
                    style={{
                      color: "#b87333",
                    }}
                  >
                    ESPECIFICACIONES TÉCNICAS
                  </h2>

                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm uppercase tracking-wider">Motor:</span>
                      <p className="text-white text-base mt-1">{motorcycle.engine}</p>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm uppercase tracking-wider">Escape:</span>
                      <p className="text-white text-base mt-1">{motorcycle.exhaust}</p>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm uppercase tracking-wider">Pintura:</span>
                      <p className="text-white text-base mt-1">{motorcycle.paint}</p>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm uppercase tracking-wider">Modificaciones:</span>
                      <p className="text-white text-base mt-1">{motorcycle.modifications}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <PricingDisplay
                    priceARS={motorcycle.price}
                    priceUSD={motorcycle.price_usd}
                    offerPercentage={motorcycle.offer_percentage}
                    size="large"
                  />
                </div>

                {/* WhatsApp Button */}
                <WhatsAppButton
                  motorcycleName={motorcycle.name}
                  whatsappNumber={config?.whatsapp_number || ""}
                  motorcycleId={motorcycle.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
