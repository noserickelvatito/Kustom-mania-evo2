import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { SiteConfig, Motorcycle } from "@/lib/types"
import { ArrowRight, ChevronDown, Search, MessageCircle, Eye, FileCheck } from "lucide-react"
import type { Metadata } from "next"
import { FAQSection } from "@/components/faq-section"
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants"
import {
  MotorcyclesSection,
  HowItWorksSection,
  FAQSectionWrapper,
  FinalCTASection,
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
      "Líderes en compra venta de motos custom. Harley Davidson, choppers y bobbers. +130 motos vendidas. Showroom en Córdoba. Envíos a todo el país. Mejor precio garantizado. Consultas inmediatas por WhatsApp.",
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

  const mobileBackgroundUrl = "https://kusyom-mania.s3.sa-east-1.amazonaws.com/background+kustom+pagina+%E2%80%90+Hecho+con+Clipchamp.mp4"
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

      {/* Hero Section - Enhanced */}
      <div className="relative h-screen w-screen overflow-hidden animated-gradient-bg">
        {/* Background Video/Image */}
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
              quality={95}
              sizes="100vw"
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
              quality={95}
              sizes="100vw"
            />
          )}

          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Decorative orbs */}
        <div className="orb orb-bronze w-[600px] h-[600px] -top-48 -left-48 animate-float-slow opacity-30" />
        <div className="orb orb-gold w-[400px] h-[400px] top-1/4 -right-32 animate-float-reverse opacity-20" />
        <div className="orb orb-bronze w-[300px] h-[300px] bottom-1/4 left-1/4 animate-pulse-soft opacity-25" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-overlay" />

        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(184, 115, 51, 0.03) 10px, rgba(184, 115, 51, 0.03) 20px)",
          }}
        />

        {/* Hero Content */}
        <main className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 pb-32 md:pb-0">
          <div className="text-center max-w-5xl w-full">
            {/* Decorative line above title */}
            <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#b87333]" />
              <div className="w-2 h-2 rotate-45 bg-[#b87333]" />
              <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#b87333]" />
            </div>

            {/* Main title */}
            <div
              className="hero-title font-black mb-6 sm:mb-8 animate-glow-pulse"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                color: "#b87333",
                textShadow: "0 0 30px rgba(184, 115, 51, 0.4), 0 0 60px rgba(184, 115, 51, 0.2)",
              }}
            >
              {siteConfig.hero_title}
            </div>

            {/* Subtitle with better styling */}
            <p
              className="hero-subtitle tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8 font-medium uppercase animate-fade-in"
              style={{
                color: "#d4a574",
                textShadow: "0 0 30px rgba(212, 165, 116, 0.5)",
                animationDelay: "0.3s",
              }}
            >
              {siteConfig.hero_subtitle}
            </p>

            {/* Decorative line */}
            <div className="decorative-line mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }} />

            {/* Description */}
            <p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 sm:mb-14 font-light tracking-wide px-4 animate-fade-in max-w-2xl mx-auto"
              style={{ animationDelay: "0.5s" }}
            >
              {siteConfig.hero_description}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-scale-in"
              style={{ animationDelay: "0.6s" }}
            >
              <Link
                href="/coleccion"
                className="btn-outline-enhanced group relative inline-flex items-center justify-center w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 text-sm sm:text-base tracking-widest uppercase font-bold rounded-xl overflow-hidden touch-manipulation"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-[#d4a574] group-hover:text-[#f5d5a8] transition-colors duration-300">
                  {siteConfig.hero_button_text}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-enhanced group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 text-sm sm:text-base tracking-widest uppercase font-bold rounded-xl touch-manipulation"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                }}
              >
                <Image
                  src="/images/whatsapp-logo.svg"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
                  priority
                />
                <span className="text-white">Consultar Ahora</span>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-indicator hidden md:flex">
            <span className="text-xs text-gray-500 tracking-widest uppercase">Descubrir</span>
            <ChevronDown className="w-6 h-6 text-[#b87333]" />
          </div>
        </main>
      </div>

      {motorcycles && motorcycles.length > 0 && (
        <MotorcyclesSection>
          <section className="relative bg-black py-24 md:py-36 overflow-hidden">
            {/* Background effects */}
            <div className="orb orb-gold w-[500px] h-[500px] -top-48 -left-48 animate-float-slow opacity-15" />
            <div className="orb orb-bronze w-[400px] h-[400px] bottom-0 right-0 animate-float-reverse opacity-20" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Section header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#b87333]/10 border border-[#b87333]/20 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#b87333] animate-pulse" />
                  <span className="text-sm text-[#d4a574] tracking-wider uppercase font-medium">Stock Disponible</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Últimas <span className="text-[#b87333]">Incorporaciones</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                  Motos custom, choppers y Harley Davidson en excelente estado. Stock permanente en Córdoba con envíos a
                  todo Argentina.
                </p>
                <div className="decorative-line mx-auto mt-8" />
              </div>

              {/* Motorcycles grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {motorcycles.map((moto: Motorcycle, index: number) => {
                  const primaryImage = moto.images?.find((img: any) => img.is_primary) || moto.images?.[0]
                  return (
                    <Link
                      key={moto.id}
                      href={`/coleccion/${moto.slug}`}
                      className="group card-glow overflow-hidden bg-zinc-900/80 rounded-2xl border border-zinc-800/50 backdrop-blur-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        {primaryImage ? (
                          <Image
                            src={primaryImage.image_url || "/placeholder.svg"}
                            alt={moto.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            loading="lazy"
                            quality={90}
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                            <span className="text-zinc-600">Sin imagen</span>
                          </div>
                        )}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#b87333]/90 text-black backdrop-blur-sm">
                            En Stock
                          </span>
                        </div>
                        
                        {/* Quick view indicator */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white font-semibold border border-white/20">
                            Ver Detalles
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#b87333] transition-colors duration-300">
                          {moto.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-5 line-clamp-2">{moto.description}</p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                          <div>
                            <span className="text-xs text-gray-500 block mb-1">Precio</span>
                            <span className="text-[#b87333] font-bold text-2xl">${moto.price?.toLocaleString()}</span>
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b87333]/20 to-[#d4a574]/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#b87333] group-hover:to-[#d4a574] transition-all duration-300 border border-[#b87333]/20 group-hover:border-transparent">
                            <ArrowRight className="w-5 h-5 text-[#b87333] group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-16">
                <Link
                  href="/coleccion"
                  className="btn-primary-enhanced group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-bold text-lg"
                  style={{
                    background: "linear-gradient(135deg, #b87333, #d4a574)",
                  }}
                >
                  <span className="text-black">Ver Toda la Colección</span>
                  <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-2 transition-transform" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-enhanced group inline-flex items-center justify-center gap-3 px-10 py-5 text-white font-bold rounded-xl text-lg touch-manipulation"
                  style={{
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                  }}
                >
                  <Image
                    src="/images/whatsapp-logo.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="w-6 h-6 group-hover:scale-110 transition-transform"
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
        <section className="relative bg-black py-24 md:py-36 overflow-hidden pattern-overlay">
          {/* Background decorative elements */}
          <div className="orb orb-bronze w-[400px] h-[400px] -top-32 -right-32 animate-float-slow opacity-20" />
          <div className="orb orb-gold w-[300px] h-[300px] bottom-0 -left-24 animate-float-reverse opacity-15" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#b87333]/10 border border-[#b87333]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#b87333] animate-pulse" />
                <span className="text-sm text-[#d4a574] tracking-wider uppercase font-medium">Proceso Simple</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Cómo <span className="text-[#b87333]">Funciona</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                Proceso simple y transparente desde Córdoba para todo Argentina.
              </p>
              <div className="decorative-line mx-auto mt-8" />
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  title: "Explorar",
                  description: "Navega nuestra colección de motos en stock",
                  icon: Search,
                },
                {
                  number: "02",
                  title: "Contactar",
                  description: "Comunícate por WhatsApp para consultas",
                  icon: MessageCircle,
                },
                {
                  number: "03",
                  title: "Inspeccionar",
                  description: "Ven a ver la moto en nuestro showroom",
                  icon: Eye,
                },
                {
                  number: "04",
                  title: "Adquirir",
                  description: "Completa la compra con documentación en regla",
                  icon: FileCheck,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  {/* Connection line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-16 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px">
                      <div className="w-full h-full bg-gradient-to-r from-[#b87333]/50 via-[#b87333]/30 to-transparent" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-[#b87333]/50" />
                    </div>
                  )}
                  
                  <div className="card-glow p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 group-hover:border-[#b87333]/50 transition-all duration-500 h-full">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#b87333]/20 to-[#d4a574]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-[#b87333]/20">
                      <step.icon className="w-8 h-8 text-[#b87333]" strokeWidth={1.5} />
                    </div>
                    
                    {/* Number */}
                    <div className="text-6xl font-black text-[#b87333]/10 group-hover:text-[#b87333]/20 transition-colors duration-500 mb-4 font-mono">
                      {step.number}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#b87333] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
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
        <section className="relative bg-zinc-950 py-24 md:py-36 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 animated-gradient-bg opacity-50" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 30% 30%, rgba(184, 115, 51, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(212, 165, 116, 0.1) 0%, transparent 50%)",
              }}
            />
          </div>
          
          {/* Decorative orbs */}
          <div className="orb orb-bronze w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft opacity-30" />
          
          {/* Border lines */}
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <div className="absolute bottom-0 left-0 right-0 section-divider" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#b87333]/10 border border-[#b87333]/30 mb-8 animate-border-glow">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-sm text-[#d4a574] tracking-wider uppercase font-medium">Respondemos en minutos</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              ¿Buscas Tu Próxima{" "}
              <span className="text-[#b87333]">Moto</span>?
            </h2>
            
            <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Explora nuestra colección completa.{" "}
              <span className="text-[#d4a574] font-semibold">Financiación</span>,{" "}
              <span className="text-[#d4a574] font-semibold">permutas</span> y{" "}
              <span className="text-[#d4a574] font-semibold">envíos a todo el país</span>.{" "}
              <span className="text-white">Showroom en Córdoba.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-enhanced group inline-flex items-center justify-center gap-4 px-12 py-6 text-white font-bold rounded-2xl text-lg touch-manipulation"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  boxShadow: "0 0 50px rgba(37, 211, 102, 0.4), 0 20px 40px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Image
                  src="/images/whatsapp-logo.svg"
                  alt="WhatsApp"
                  width={28}
                  height={28}
                  className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
                Contactar por WhatsApp
              </a>
              <Link
                href="/coleccion"
                className="btn-outline-enhanced group inline-flex items-center justify-center gap-3 px-12 py-6 font-bold rounded-2xl text-lg"
              >
                <span className="text-[#d4a574] group-hover:text-[#f5d5a8] transition-colors">Ver Colección</span>
                <ArrowRight className="w-6 h-6 text-[#d4a574] group-hover:text-[#f5d5a8] group-hover:translate-x-2 transition-all duration-300" />
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-14 pt-10 border-t border-zinc-800/50">
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#b87333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Documentación al día</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#b87333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm">Mejor precio garantizado</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#b87333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm">Envíos a todo el país</span>
              </div>
            </div>
          </div>
        </section>
      </FinalCTASection>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 md:bottom-8 right-4 md:right-6 z-[60] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 active:scale-90 group touch-manipulation"
        aria-label="Contactar por WhatsApp"
        style={{
          background: "linear-gradient(135deg, #25D366, #20BA5A)",
          boxShadow: "0 0 40px rgba(37, 211, 102, 0.6), 0 10px 30px rgba(0, 0, 0, 0.5)",
          animation: "pulse-glow 2s infinite, float 3s ease-in-out infinite",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 blur-xl animate-pulse"></div>
        <Image
          src="/images/whatsapp-logo.svg"
          alt="WhatsApp"
          width={32}
          height={32}
          className="relative z-10 w-9 h-9 md:w-11 md:h-11 group-hover:rotate-12 transition-transform"
          loading="lazy"
        />
        <span className="absolute -top-16 right-0 bg-gradient-to-r from-black via-black/95 to-black text-white text-xs md:text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-[#25D366]/50 shadow-glow font-bold pointer-events-none">
          ¡Chateá con nosotros! 💬
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full animate-bounce shadow-lg">
          <span className="absolute inset-0 rounded-full bg-red-400 animate-ping"></span>
        </span>
      </a>
    </div>
  )
}
