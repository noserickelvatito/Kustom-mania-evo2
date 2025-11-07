import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { SiteConfig, Motorcycle } from "@/lib/types"
import { ArrowRight, Wrench, Sparkles, CheckCircle2, Star } from "lucide-react"
import type { Metadata } from "next"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Kustom Mania | Compra Venta Motos Custom Argentina | Harley Davidson Buenos Aires",
  description:
    "Kustom Mania: Líderes en compra y venta de motos custom en Argentina. Harley Davidson, choppers, bobbers. +130 motos vendidas. Showroom en Buenos Aires. Mejor precio del mercado. Consultas por WhatsApp. Financiación y permutas disponibles.",
  keywords: [
    // Primary
    "kustom mania",
    "kustommania",
    "motos custom argentina",
    "comprar moto custom",
    "vender moto custom",
    "Harley Davidson Argentina",
    "Harley Davidson Buenos Aires",
    // Secondary
    "motos choppers",
    "motos bobbers",
    "motos vintage",
    "compra venta motos",
    "concesionaria motos custom",
    "showroom motos Buenos Aires",
    "motos usadas custom",
    "motos segunda mano",
    // Long-tail
    "donde comprar Harley Davidson Argentina",
    "vender mi Harley Davidson",
    "mejor precio motos custom",
    "motos custom con garantía",
    "permuta motos custom",
    "financiación motos",
  ],
  openGraph: {
    title: "Kustom Mania | Motos Custom y Harley Davidson - Showroom Buenos Aires",
    description:
      "Líderes en compra venta de motos custom. Harley Davidson, choppers y bobbers. +130 motos vendidas. Mejor precio garantizado. Consultas inmediatas por WhatsApp.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Kustom Mania Showroom - Motocicletas Custom y Harley Davidson en Buenos Aires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kustom Mania | Motos Custom y Harley Davidson Argentina",
    description: "Líderes en compra venta de motos custom. +130 motos vendidas. Showroom en Buenos Aires.",
    images: ["/og-image-home.jpg"],
  },
  alternates: {
    canonical: "/",
  },
}

export default async function Home() {
  const supabase = await createClient()

  const [configResult, motorcyclesResult] = await Promise.all([
    supabase.from("site_config").select("*").single(),
    supabase
      .from("motorcycles")
      .select(`
        *,
        images:motorcycle_images!inner(image_url, display_order, is_primary)
      `)
      .eq("status", "stock")
      .order("created_at", { ascending: false })
      .limit(3),
  ])

  const siteConfig: SiteConfig = configResult.data || {
    id: "",
    whatsapp_number: "",
    hero_title: "KUSTOM MANIA",
    hero_subtitle: "PASIÓN POR LAS DOS RUEDAS",
    hero_description: "Donde la personalidad se encuentra con el asfalto.",
    hero_button_text: "EXPLORAR LA COLECCIÓN",
    hero_background_url: null,
    instagram_url: null,
    facebook_url: null,
    updated_at: "",
  }

  const motorcycles = motorcyclesResult.data

  const backgroundUrl =
    siteConfig.hero_background_url || "https://kusyom-mania.s3.sa-east-1.amazonaws.com/background.mp4"
  const isVideo = /\.(mp4|webm|ogg)$/i.test(backgroundUrl)

  const mobileBackgroundUrl = "https://kusyom-mania.s3.sa-east-1.amazonaws.com/background-mobile.mp4"
  const isMobileVideo = /\.(mp4|webm|ogg)$/i.test(mobileBackgroundUrl)

  const whatsappUrl = siteConfig.whatsapp_number
    ? `https://wa.me/${siteConfig.whatsapp_number.replace(/\D/g, "")}`
    : "https://wa.me/"

  const productsSchema = motorcycles?.map((moto: Motorcycle) => ({
    "@context": "https://schema.org",
    "@type": "Product",
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
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Kustom Mania",
      },
    },
  }))

  return (
    <div className="min-h-screen bg-black">
      {productsSchema && productsSchema.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }} />
      )}

      <h1 className="sr-only">
        Kustom Mania: Compra y Venta de Motos Custom, Harley Davidson, Choppers y Bobbers en Argentina - Showroom Buenos
        Aires
      </h1>

      {/* Hero Section */}
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {isVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="hidden md:block w-full h-full object-cover"
            >
              <source src={backgroundUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={backgroundUrl || "/placeholder.svg"}
              alt="Kustom Mania Hero Background"
              fill
              className="hidden md:block object-cover"
              priority
              quality={90}
            />
          )}

          {isMobileVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="block md:hidden w-full h-full object-cover"
            >
              <source src={mobileBackgroundUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={mobileBackgroundUrl || backgroundUrl || "/placeholder.svg"}
              alt="Kustom Mania Hero Background Mobile"
              fill
              className="block md:hidden object-cover"
              priority
              quality={90}
            />
          )}

          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
          }}
        />

        {/* Hero Content */}
        <main className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 pb-32 md:pb-0">
          <div className="text-center max-w-5xl w-full">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-wider mb-4 sm:mb-6"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                color: "#b87333",
                textShadow: "0 0 30px rgba(184, 115, 51, 0.5), 0 0 60px rgba(184, 115, 51, 0.3)",
                letterSpacing: "0.1em",
              }}
            >
              {siteConfig.hero_title}
            </h1>

            <p
              className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] mb-8 sm:mb-10 md:mb-12 font-light"
              style={{
                color: "#d4a574",
                textShadow: "0 0 20px rgba(212, 165, 116, 0.4)",
              }}
            >
              {siteConfig.hero_subtitle}
            </p>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 sm:mb-12 md:mb-16 font-light tracking-wide px-4">
              {siteConfig.hero_description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/coleccion"
                className="group relative inline-block w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-xs sm:text-sm tracking-widest uppercase font-medium transition-all duration-300"
                style={{
                  color: "#d4a574",
                  border: "2px solid #b87333",
                }}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  {siteConfig.hero_button_text}
                </span>
                <div
                  className="absolute inset-0 bg-[#b87333] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{
                    boxShadow: "0 0 30px rgba(184, 115, 51, 0.6)",
                  }}
                />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm tracking-widest uppercase font-medium transition-all duration-300 rounded-lg shadow-lg hover:shadow-[#25D366]/50"
              >
                <Image
                  src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  priority
                />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </main>
      </div>

      <section className="relative bg-zinc-950 py-20 md:py-32 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-[#b87333] mb-2">9+</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-[#b87333] mb-2">130+</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Motos Vendidas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-[#b87333] mb-2">100%</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Clientes Satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-[#b87333] mb-2">20+</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Motos en Stock</div>
            </div>
          </div>
        </div>
      </section>

      {motorcycles && motorcycles.length > 0 && (
        <section className="relative bg-black py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Últimas <span className="text-[#b87333]">Incorporaciones</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Motos seleccionadas con pasión, cada una con su propia historia y personalidad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {motorcycles.map((moto: Motorcycle) => {
                const primaryImage = moto.images?.find((img: any) => img.is_primary) || moto.images?.[0]
                return (
                  <Link
                    key={moto.id}
                    href={`/coleccion/${moto.slug}`}
                    className="group relative overflow-hidden bg-zinc-900 rounded-lg border border-zinc-800 hover:border-[#b87333] transition-all duration-300"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      {primaryImage ? (
                        <Image
                          src={primaryImage.image_url || "/placeholder.svg"}
                          alt={moto.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          quality={85}
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                          <span className="text-zinc-600">Sin imagen</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#b87333] transition-colors">
                        {moto.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{moto.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#b87333] font-bold text-lg">${moto.price?.toLocaleString()}</span>
                        <ArrowRight className="w-5 h-5 text-[#b87333] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link
                href="/coleccion"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#b87333] text-black font-semibold rounded-lg hover:bg-[#d4a574] transition-colors"
              >
                Ver Toda la Colección
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#25D366]/50"
              >
                <Image
                  src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  loading="lazy"
                />
                Consultar Disponibilidad
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="relative bg-zinc-950 py-20 md:py-32 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              ¿Por Qué <span className="text-[#b87333]">Kustom Mania</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tu mejor opción para comprar y vender motocicletas con confianza y transparencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-black/50 rounded-lg border border-zinc-800 hover:border-[#b87333] transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#b87333]/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#b87333]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Calidad Garantizada</h3>
              <p className="text-gray-400">
                Cada moto es inspeccionada y verificada. Solo ofrecemos motocicletas en excelente estado
              </p>
            </div>

            <div className="text-center p-8 bg-black/50 rounded-lg border border-zinc-800 hover:border-[#b87333] transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#b87333]/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#b87333]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Amplia Variedad</h3>
              <p className="text-gray-400">
                Desde motos custom hasta deportivas y clásicas. Encuentra la moto perfecta para tu estilo
              </p>
            </div>

            <div className="text-center p-8 bg-black/50 rounded-lg border border-zinc-800 hover:border-[#b87333] transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#b87333]/10 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-[#b87333]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Precios Justos</h3>
              <p className="text-gray-400">
                Compramos y vendemos al mejor precio del mercado. Transparencia total en cada transacción
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-black py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Cómo <span className="text-[#b87333]">Funciona</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Comprar o vender tu moto es fácil y seguro</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Explorar",
                description: "Navega nuestra colección actualizada de motos disponibles en stock",
              },
              {
                number: "02",
                title: "Contactar",
                description: "Comunícate con nosotros por WhatsApp para consultas o agendar una visita",
              },
              {
                number: "03",
                title: "Inspeccionar",
                description: "Ven a ver la moto en persona, pruébala y verifica su estado",
              },
              {
                number: "04",
                title: "Adquirir",
                description: "Completa la compra con toda la documentación en regla y garantía",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl md:text-8xl font-bold text-[#b87333]/10 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#b87333] to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-zinc-950 py-20 md:py-32 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Lo Que Dicen <span className="text-[#b87333]">Nuestros Clientes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Rodríguez",
                text: "Compré mi primera moto custom con ellos. Excelente atención, transparencia total y la moto en perfecto estado.",
                rating: 5,
              },
              {
                name: "María González",
                text: "Vendí mi moto en menos de una semana. Precio justo y todo el proceso fue súper rápido y profesional.",
                rating: 5,
              },
              {
                name: "Juan Pérez",
                text: "La mejor experiencia comprando una moto. Me asesoraron en todo y la documentación impecable.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="p-8 bg-black/50 rounded-lg border border-zinc-800">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#b87333] text-[#b87333]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <p className="text-white font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-black py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Buscas Tu Próxima <span className="text-[#b87333]">Moto</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Explora nuestra colección o contáctanos si quieres vender tu moto. Estamos para ayudarte en cada paso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#25D366]/50"
            >
              <Image
                src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="w-6 h-6"
                loading="lazy"
              />
              Contactar por WhatsApp
            </a>
            <Link
              href="/coleccion"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#b87333] text-[#b87333] font-semibold rounded-lg hover:bg-[#b87333] hover:text-black transition-colors"
            >
              Ver Colección
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-6 z-40 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-2xl hover:shadow-[#25D366]/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Contactar por WhatsApp"
      >
        <Image
          src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
          alt="WhatsApp"
          width={32}
          height={32}
          className="w-8 h-8 md:w-9 md:h-9 group-hover:scale-110 transition-transform"
          loading="lazy"
        />
        <span className="absolute -top-12 right-0 bg-black/90 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          ¡Chateá con nosotros!
        </span>
      </a>
    </div>
  )
}
