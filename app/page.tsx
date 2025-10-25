import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import type { SiteConfig } from "@/lib/types"

export default async function Home() {
  const supabase = await createClient()

  const { data: config } = await supabase.from("site_config").select("*").single()

  const siteConfig: SiteConfig = config || {
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

  const whatsappUrl = siteConfig.whatsapp_number
    ? `https://wa.me/${siteConfig.whatsapp_number.replace(/\D/g, "")}`
    : "https://wa.me/"

  const backgroundUrl =
    siteConfig.hero_background_url || "https://kusyom-mania.s3.sa-east-1.amazonaws.com/Home+Banner+V3.mp4"
  const isVideo = /\.(mp4|webm|ogg)$/i.test(backgroundUrl)

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {isVideo ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src={backgroundUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={backgroundUrl || "/placeholder.svg"}
              alt="Kustom Mania Hero Background"
              className="w-full h-full object-cover"
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

        <header className="hidden md:flex relative z-10 flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <nav className="flex items-center gap-6 md:gap-12">
            <Link href="/" className="text-sm tracking-widest text-[#b87333] transition-colors uppercase font-medium">
              INICIO
            </Link>
            <Link
              href="/coleccion"
              className="text-sm tracking-widest text-gray-300 hover:text-[#b87333] transition-colors uppercase font-medium"
            >
              COLECCIÓN
            </Link>
            <Link
              href="/contacto"
              className="text-sm tracking-widest text-gray-300 hover:text-[#b87333] transition-colors uppercase font-medium"
            >
              CONTACTO
            </Link>
          </nav>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-widest text-gray-300 hover:text-[#b87333] transition-colors uppercase font-medium"
          >
            WHATSAPP
          </a>
        </header>

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
          </div>
        </main>
      </div>
    </div>
  )
}
