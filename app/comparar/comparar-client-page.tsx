"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { PricingDisplay } from "@/components/pricing-display"
import { X, Plus } from "lucide-react"
import type { Motorcycle } from "@/lib/types"

interface MotorcycleWithImage extends Motorcycle {
  image: string | null
}

export default function CompararClientPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [motorcycles, setMotorcycles] = useState<MotorcycleWithImage[]>([])
  const [selectedMotorcycles, setSelectedMotorcycles] = useState<MotorcycleWithImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMotorcycles()
  }, [])

  async function loadMotorcycles() {
    const supabase = createClient()
    const { data: motos } = await supabase.from("motorcycles").select("*").order("display_order", { ascending: true })

    if (motos) {
      const motosWithImages = await Promise.all(
        motos.map(async (moto: Motorcycle) => {
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
      setMotorcycles(motosWithImages)

      const ids = searchParams.get("ids")?.split(",").filter(Boolean) || []
      if (ids.length > 0) {
        const selected = motosWithImages.filter((m) => ids.includes(m.id))
        setSelectedMotorcycles(selected)
      }
    }
    setLoading(false)
  }

  function toggleMotorcycle(moto: MotorcycleWithImage) {
    const isSelected = selectedMotorcycles.some((m) => m.id === moto.id)

    let newSelected: MotorcycleWithImage[]
    if (isSelected) {
      newSelected = selectedMotorcycles.filter((m) => m.id !== moto.id)
    } else {
      if (selectedMotorcycles.length >= 3) {
        alert("Solo puedes comparar hasta 3 motocicletas")
        return
      }
      newSelected = [...selectedMotorcycles, moto]
    }

    setSelectedMotorcycles(newSelected)
    const ids = newSelected.map((m) => m.id).join(",")
    router.push(`/comparar${ids ? `?ids=${ids}` : ""}`, { scroll: false })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pb-24 md:pb-8 md:pt-24">
        <p className="text-gray-400">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pb-24 md:pb-8 md:pt-24">
      <section className="relative py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 tracking-wider"
            style={{
              fontFamily: 'Impact, "Arial Black", sans-serif',
              color: "#b87333",
              textShadow: "0 0 30px rgba(184, 115, 51, 0.5)",
            }}
          >
            COMPARAR MOTOCICLETAS
          </h1>

          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Selecciona hasta 3 motocicletas para comparar sus especificaciones, precios y características lado a lado.
          </p>

          {selectedMotorcycles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-8">No has seleccionado ninguna motocicleta para comparar.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {motorcycles.slice(0, 6).map((moto) => (
                  <button
                    key={moto.id}
                    onClick={() => toggleMotorcycle(moto)}
                    className="group relative overflow-hidden transition-all duration-300 hover:scale-105 text-left"
                    style={{
                      background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                      border: "2px solid #b87333",
                      boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 4px 20px rgba(184, 115, 51, 0.2)",
                    }}
                  >
                    <div className="relative h-48 overflow-hidden bg-black/50">
                      {moto.image ? (
                        <img
                          src={moto.image || "/placeholder.svg"}
                          alt={moto.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">Sin imagen</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[#b87333] mb-2 font-serif">{moto.name}</h3>
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Agregar para comparar</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Selected motorcycles chips */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {motorcycles.map((moto) => {
                  const isSelected = selectedMotorcycles.some((m) => m.id === moto.id)
                  return (
                    <button
                      key={moto.id}
                      onClick={() => toggleMotorcycle(moto)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-[#b87333] text-black"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {moto.name}
                      {isSelected && <X className="inline-block w-4 h-4 ml-2" />}
                    </button>
                  )
                })}
              </div>

              {/* Comparison table */}
              <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedMotorcycles.map((moto) => (
                      <div
                        key={moto.id}
                        className="relative"
                        style={{
                          background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                          border: "2px solid #b87333",
                          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 4px 20px rgba(184, 115, 51, 0.2)",
                        }}
                      >
                        <button
                          onClick={() => toggleMotorcycle(moto)}
                          className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="relative h-64 overflow-hidden bg-black/50">
                          {moto.image ? (
                            <img
                              src={moto.image || "/placeholder.svg"}
                              alt={moto.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                              Sin imagen
                            </div>
                          )}
                        </div>

                        <div className="p-6 space-y-4">
                          <h2 className="text-2xl font-bold text-[#b87333] font-serif mb-4">{moto.name}</h2>

                          <div className="space-y-3">
                            <div>
                              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Precio
                              </h3>
                              <PricingDisplay
                                priceARS={moto.price}
                                priceUSD={moto.price_usd}
                                offerPercentage={moto.offer_percentage}
                                size="small"
                              />
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Motor
                              </h3>
                              <p className="text-gray-300">{moto.engine || "No especificado"}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Escape
                              </h3>
                              <p className="text-gray-300">{moto.exhaust || "No especificado"}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Pintura
                              </h3>
                              <p className="text-gray-300">{moto.paint || "No especificado"}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Modificaciones
                              </h3>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {moto.modifications || "No especificado"}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Disponibilidad
                              </h3>
                              <p className="text-green-400 font-medium">Disponible</p>
                            </div>
                          </div>

                          <Link
                            href={`/coleccion/${moto.slug}`}
                            className="block w-full py-3 px-6 text-sm tracking-widest uppercase font-medium transition-all duration-300 relative overflow-hidden group/btn text-center mt-6"
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
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
