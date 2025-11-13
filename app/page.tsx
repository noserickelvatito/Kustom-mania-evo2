import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { SiteConfig, Motorcycle } from "@/lib/types"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { FAQSection } from "@/components/faq-section"
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants"
import { 
  StatsSection, 
  MotorcyclesSection, 
  HowItWorksSection, 
  FAQSectionWrapper,
  FinalCTASection 
} from "@/components/home-sections-client"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Kustom Mania | Motos Custom Córdoba - Envíos a todo Argentina",
  description:
    "Kustom Mania: Líderes en compra y venta de motos custom en Argentina. Harley Davidson, choppers, bobbers. +130 motos vendidas. Showroom en Córdoba. Envíos a todo el país. Mejor precio del mercado. Consultas por WhatsApp. Financiación y permutas disponibles.",
  keywords: [
    // Primary - focus on homepage as brand hub
    "kustom mania",
    "kustommania",
    "compra venta motos argentina",
    // Córdoba-specific keywords
    "motos Córdoba",
    "comprar moto Córdoba",
    "vender moto Córdoba",
    "showroom motos Córdoba",
    // Secondary
    "motos custom argentina",
    "Harley Davidson Argentina",
    "concesionaria motos custom",
    "envíos a todo Argentina",
    // Long-tail
    "mejor precio motos custom",
    "permuta motos custom",
    "financiación motos",
  ],
  openGraph: {
    title: "Kustom Mania | Motos Custom y Harley Davidson - Córdoba, Argentina",
    description:
      "Líderes en compra venta de motos custom. Harley Davidson, choppers y bobbers. +130 motos vendidas. Showroom en Córdoba. Envíos a todo Argentina. Mejor precio garantizado. Consultas inmediatas por WhatsApp.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Kustom Mania Showroom - Motocicletas Custom y Harley Davidson en Córdoba, Argentina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kustom Mania | Motos Custom y Harley Davidson - Córdoba, Argentina",
    description:
      "Líderes en compra venta de motos custom. +130 motos vendidas. Showroom en Córdoba. Envíos a todo el país.",
    images: ["/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://www.kustom-mania.com.ar/",
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

  const whatsappUrl = `https://wa.me/${(siteConfig.whatsapp_number || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "")}`

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
        Kustom Mania: Compra y Venta de Motos Custom, Harley Davidson, Choppers y Bobbers en Argentina - Showroom
        Córdoba
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
          <div className="text-center max-w-5xl w-full animate-fade-in-up">
            <div
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-wider mb-4 sm:mb-6 animate-glow-pulse"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                color: "#b87333",
                textShadow: "0 0 30px rgba(184, 115, 51, 0.5), 0 0 60px rgba(184, 115, 51, 0.3), 0 0 90px rgba(184, 115, 51, 0.2)",
                letterSpacing: "0.1em",
              }}
            >
              {siteConfig.hero_title}
            </div>

            <p
              className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] mb-8 sm:mb-10 md:mb-12 font-light animate-fade-in"
              style={{
                color: "#d4a574",
                textShadow: "0 0 20px rgba(212, 165, 116, 0.4), 0 0 40px rgba(212, 165, 116, 0.2)",
                animationDelay: "0.2s",
              }}
            >
              {siteConfig.hero_subtitle}
            </p>

            <p 
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 sm:mb-12 md:mb-16 font-light tracking-wide px-4 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {siteConfig.hero_description}
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in"
              style={{ animationDelay: "0.6s" }}
            >
              <Link
                href="/coleccion"
                className="group relative inline-block w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 text-xs sm:text-sm tracking-widest uppercase font-bold transition-all duration-300 hover:scale-110 rounded-lg overflow-hidden shadow-glow-hover"
                style={{
                  color: "#d4a574",
                  border: "2px solid #b87333",
                  background: "linear-gradient(135deg, rgba(184, 115, 51, 0.1), rgba(212, 165, 116, 0.1))",
                }}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                  {siteConfig.hero_button_text}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div
                  className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{
                    background: "linear-gradient(135deg, #b87333, #d4a574)",
                    boxShadow: "0 0 40px rgba(184, 115, 51, 0.8)",
                  }}
                />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 text-white text-xs sm:text-sm tracking-widest uppercase font-bold transition-all duration-300 rounded-lg shadow-glow hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #25D366, #20BA5A)",
                  boxShadow: "0 0 30px rgba(37, 211, 102, 0.5)",
                }}
              >
                <Image
                  src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform animate-float"
                  priority
                />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </main>
      </div>

      <StatsSection>
        <section className="relative bg-zinc-950 py-20 md:py-32 overflow-hidden">
          {/* Animated background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b87333]/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d4a574]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="sr-only">Estadísticas de Kustom Mania</h2>
            
            {/* New modern design - square cards layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {/* Stat 1 */}
              <div className="group relative animate-fade-in-up" style={{ animationDelay: "0s" }}>
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#b87333] to-[#d4a574] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Main card */}
                  <div className="relative rounded-xl bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border-2 border-[#b87333]/30 group-hover:border-[#b87333] transition-all duration-500 group-hover:scale-105 flex flex-col items-center justify-center shadow-2xl p-6 md:p-8 aspect-square">
                    <div className="text-4xl md:text-6xl font-black text-gradient animate-gradient"
                         style={{
                           background: "linear-gradient(135deg, #b87333 0%, #d4a574 50%, #b87333 100%)",
                           backgroundSize: "200% 200%",
                           WebkitBackgroundClip: "text",
                           WebkitTextFillColor: "transparent",
                           backgroundClip: "text"
                         }}>
                      9+
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold mt-2 text-center group-hover:text-[#d4a574] transition-colors">
                      Años
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="group relative animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#b87333] to-[#d4a574] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  <div className="relative rounded-xl bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border-2 border-[#b87333]/30 group-hover:border-[#b87333] transition-all duration-500 group-hover:scale-105 flex flex-col items-center justify-center shadow-2xl p-6 md:p-8 aspect-square">
                    <div className="text-4xl md:text-6xl font-black text-gradient animate-gradient"
                         style={{
                           background: "linear-gradient(135deg, #b87333 0%, #d4a574 50%, #b87333 100%)",
                           backgroundSize: "200% 200%",
                           WebkitBackgroundClip: "text",
                           WebkitTextFillColor: "transparent",
                           backgroundClip: "text",
                           animationDelay: "0.5s"
                         }}>
                      130+
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold mt-2 text-center group-hover:text-[#d4a574] transition-colors">
                      Vendidas
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="group relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#b87333] to-[#d4a574] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  <div className="relative rounded-xl bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border-2 border-[#b87333]/30 group-hover:border-[#b87333] transition-all duration-500 group-hover:scale-105 flex flex-col items-center justify-center shadow-2xl p-6 md:p-8 aspect-square">
                    <div className="text-4xl md:text-6xl font-black text-gradient animate-gradient"
                         style={{
                           background: "linear-gradient(135deg, #b87333 0%, #d4a574 50%, #b87333 100%)",
                           backgroundSize: "200% 200%",
                           WebkitBackgroundClip: "text",
                           WebkitTextFillColor: "transparent",
                           backgroundClip: "text",
                           animationDelay: "1s"
                         }}>
                      100%
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold mt-2 text-center group-hover:text-[#d4a574] transition-colors">
                      Satisfechos
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="group relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#b87333] to-[#d4a574] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  <div className="relative rounded-xl bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border-2 border-[#b87333]/30 group-hover:border-[#b87333] transition-all duration-500 group-hover:scale-105 flex flex-col items-center justify-center shadow-2xl p-6 md:p-8 aspect-square">
                    <div className="text-4xl md:text-6xl font-black text-gradient animate-gradient"
                         style={{
                           background: "linear-gradient(135deg, #b87333 0%, #d4a574 50%, #b87333 100%)",
                           backgroundSize: "200% 200%",
                           WebkitBackgroundClip: "text",
                           WebkitTextFillColor: "transparent",
                           backgroundClip: "text",
                           animationDelay: "1.5s"
                         }}>
                      20+
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold mt-2 text-center group-hover:text-[#d4a574] transition-colors">
                      En Stock
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </StatsSection>

      {motorcycles && motorcycles.length > 0 && (
        <MotorcyclesSection>
          <section className="relative bg-black py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Últimas <span className="text-[#b87333]">Incorporaciones</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Motos custom, choppers y Harley Davidson en excelente estado. Stock permanente en Córdoba con envíos a todo Argentina.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {motorcycles.map((moto: Motorcycle) => {
                const primaryImage = moto.images?.find((img: any) => img.is_primary) || moto.images?.[0]
                return (
                  <Link
                    key={moto.id}
                    href={`/coleccion/${moto.slug}`}
                    className="group relative overflow-hidden bg-zinc-900 rounded-xl border border-zinc-800 hover:border-[#b87333] transition-all duration-300 hover-lift"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      {primaryImage ? (
                        <Image
                          src={primaryImage.image_url || "/placeholder.svg"}
                          alt={moto.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                          quality={85}
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                          <span className="text-zinc-600">Sin imagen</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300" />
                      <div className="absolute top-4 right-4 bg-[#b87333] text-black px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Ver más
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#b87333] transition-colors duration-300">
                        {moto.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{moto.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#b87333] font-bold text-xl">${moto.price?.toLocaleString()}</span>
                        <div className="w-10 h-10 rounded-full bg-[#b87333]/10 flex items-center justify-center group-hover:bg-[#b87333] transition-colors duration-300">
                          <ArrowRight className="w-5 h-5 text-[#b87333] group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link
                href="/coleccion"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-glow-hover"
                style={{
                  background: "linear-gradient(135deg, #b87333, #d4a574)",
                  boxShadow: "0 0 30px rgba(184, 115, 51, 0.4)"
                }}
              >
                <span className="text-black">Ver Toda la Colección</span>
                <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #25D366, #20BA5A)",
                  boxShadow: "0 0 30px rgba(37, 211, 102, 0.4)"
                }}
              >
                <Image
                  src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-9 md:h-9 group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
                Consultar Disponibilidad
              </a>
            </div>
            </div>
          </section>
        </MotorcyclesSection>
      )}

<HowItWorksSection>
        <section className="relative bg-black py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Cómo <span className="text-[#b87333]">Funciona</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Proceso simple y transparente desde Córdoba para todo Argentina.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                number: "01",
                title: "Explorar",
                description: "Navega nuestra colección de motos en stock",
              },
              {
                number: "02",
                title: "Contactar",
                description: "Comunícate por WhatsApp para consultas",
              },
              {
                number: "03",
                title: "Inspeccionar",
                description: "Ven a ver la moto en nuestro showroom",
              },
              {
                number: "04",
                title: "Adquirir",
                description: "Completa la compra con documentación en regla",
              },
            ].map((step, index) => (
              <div key={index} className="relative p-6 rounded-xl bg-black/30 border border-zinc-800 hover:border-[#b87333] transition-all duration-300 hover-lift group">
                <div className="text-6xl md:text-7xl font-bold text-[#b87333]/20 group-hover:text-[#b87333]/30 transition-colors mb-4">{step.number}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#b87333] transition-colors">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{step.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-px bg-gradient-to-r from-[#b87333]/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
          </div>
        </section>
      </HowItWorksSection>

      <FAQSectionWrapper>
        <FAQSection />
      </FAQSectionWrapper>

      <FinalCTASection>
        <section className="relative bg-zinc-950 py-20 md:py-32 border-y border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(184, 115, 51, 0.3) 0%, transparent 70%)"
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            ¿Buscas Tu Próxima <span className="text-gradient animate-gradient" style={{
              background: "linear-gradient(135deg, #b87333 0%, #d4a574 50%, #b87333 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Moto</span>?
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto font-light">
            Explora nuestra colección completa. <span className="text-[#d4a574] font-semibold">Financiación</span>, <span className="text-[#d4a574] font-semibold">permutas</span> y <span className="text-[#d4a574] font-semibold">envíos a todo el país</span>. Showroom en Córdoba.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-white font-bold rounded-lg transition-all duration-300 hover:scale-110 text-lg"
              style={{
                background: "linear-gradient(135deg, #25D366, #20BA5A)",
                boxShadow: "0 0 40px rgba(37, 211, 102, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3)"
              }}
            >
              <Image
                src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform"
                loading="lazy"
              />
              Contactar por WhatsApp
            </a>
            <Link
              href="/coleccion"
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 border-2 font-bold rounded-lg transition-all duration-300 hover:scale-110 text-lg shadow-glow-hover backdrop-blur-sm"
              style={{
                borderColor: "#b87333",
                color: "#d4a574",
                background: "rgba(184, 115, 51, 0.1)"
              }}
            >
              Ver Colección
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          </div>
        </section>
      </FinalCTASection>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 md:bottom-8 right-6 z-[60] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 group"
        aria-label="Contactar por WhatsApp"
        style={{
          background: "linear-gradient(135deg, #25D366, #20BA5A)",
          boxShadow: "0 0 40px rgba(37, 211, 102, 0.6), 0 10px 30px rgba(0, 0, 0, 0.5)",
          animation: "pulse-glow 2s infinite, float 3s ease-in-out infinite"
        }}
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 blur-xl animate-pulse"></div>
        <Image
          src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
          alt="WhatsApp"
          width={32}
          height={32}
          className="relative z-10 w-9 h-9 md:w-11 md:h-11 group-hover:rotate-12 transition-transform"
          loading="lazy"
        />
        <span className="absolute -top-16 right-0 bg-gradient-to-r from-black via-black/95 to-black text-white text-xs md:text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-[#25D366]/50 shadow-glow font-bold">
          ¡Chateá con nosotros! 💬
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full animate-bounce shadow-lg">
          <span className="absolute inset-0 rounded-full bg-red-400 animate-ping"></span>
        </span>
      </a>
    </div>
  )
}
