import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { PricingDisplay } from "@/components/pricing-display"
import type { Motorcycle } from "@/lib/types"

export default async function ColeccionPage() {
  const supabase = await createClient()

  const { data: motorcycles } = await supabase
    .from("motorcycles")
    .select("*")
    .order("display_order", { ascending: true })

  const { data: config } = await supabase.from("site_config").select("whatsapp_number").single()

  // Get first image for each motorcycle
  const motorcyclesWithImages = await Promise.all(
    (motorcycles || []).map(async (moto: Motorcycle) => {
      const { data: images } = await supabase
        .from("motorcycle_images")
        .select("*")
        .eq("motorcycle_id", moto.id)
        .order("display_order", { ascending: true })
        .limit(1)

      return {
        ...moto,
        image: images && images.length > 0 ? images[0].image_url : null,
      }
    }),
  )

  return (
    <div className="min-h-screen bg-black">
      <Header currentPage="coleccion" whatsappNumber={config?.whatsapp_number} />

      <section
        className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
        }}
      >
        {/* Metallic texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-12 sm:mb-16 md:mb-20 tracking-wider"
            style={{
              fontFamily: 'Impact, "Arial Black", sans-serif',
              color: "#b87333",
              textShadow: "0 0 30px rgba(184, 115, 51, 0.5)",
            }}
          >
            NUESTRA COLECCIÓN
          </h1>

          {/* Motorcycle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {motorcyclesWithImages.map((moto) => (
              <div
                key={moto.id}
                className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                  border: "2px solid #b87333",
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 4px 20px rgba(184, 115, 51, 0.2)",
                }}
              >
                {/* Motorcycle Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-black/50">
                  {moto.image ? (
                    <img
                      src={moto.image || "/placeholder.svg"}
                      alt={moto.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">Sin imagen</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-3 tracking-wide font-serif"
                    style={{
                      color: "#b87333",
                      textShadow: "0 0 15px rgba(184, 115, 51, 0.4)",
                    }}
                  >
                    {moto.name}
                  </h2>

                  <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
                    {moto.description}
                  </p>

                  <div className="mb-6">
                    <PricingDisplay
                      priceARS={moto.price}
                      priceUSD={moto.price_usd}
                      offerPercentage={moto.offer_percentage}
                      size="small"
                    />
                  </div>

                  <Link
                    href={`/coleccion/${moto.slug}`}
                    className="block w-full py-3 px-6 text-sm tracking-widest uppercase font-medium transition-all duration-300 relative overflow-hidden group/btn text-center"
                    style={{
                      color: "#d4a574",
                      border: "1px solid #b87333",
                    }}
                  >
                    <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                      VER DETALLES
                    </span>
                    <div
                      className="absolute inset-0 bg-[#b87333] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"
                      style={{
                        boxShadow: "0 0 20px rgba(184, 115, 51, 0.5)",
                      }}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {motorcyclesWithImages.length === 0 && (
            <p className="text-center text-gray-400 text-lg">No hay motocicletas disponibles en este momento.</p>
          )}
        </div>
      </section>
    </div>
  )
}
