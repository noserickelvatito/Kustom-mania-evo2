import Image from "next/image"
import Link from "next/link"
import { Award, Heart, Shield, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Nosotros - 9+ Años de Experiencia | Kustom Mania Córdoba",
  description:
    "Conoce la historia de Kustom Mania. Más de 9 años liderando la compra venta de motos custom en Argentina. +130 motos vendidas. Showroom en Córdoba. Envíos a todo el país. Pasión, confianza y experiencia en cada transacción.",
  keywords: [
    "sobre Kustom Mania",
    "quienes somos Kustom Mania",
    "historia Kustom Mania",
    "empresa motos Córdoba",
    "experiencia motos custom",
    "concesionaria motos Córdoba",
    "showroom Córdoba",
    "vendedor motos confiable",
    "dealer motos Argentina",
    "equipo Kustom Mania",
    "valores empresa",
  ],
  openGraph: {
    title: "Nosotros - 9+ Años de Pasión | Kustom Mania Córdoba",
    description:
      "Más de 9 años conectando personas con sus motos ideales. +130 motos vendidas. Conoce nuestra historia, valores y showroom en Córdoba.",
    url: "/nosotros",
    type: "website",
    images: [
      {
        url: "/og-image-about.jpg",
        width: 1200,
        height: 630,
        alt: "Showroom Kustom Mania - Córdoba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros - Kustom Mania",
    description: "9+ años de experiencia en motos custom. Conoce nuestra historia.",
    images: ["/og-image-about.jpg"],
  },
  alternates: {
    canonical: "https://www.kustom-mania.com.ar/nosotros",
  },
}

export default function NosotrosPage() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Kustom Mania",
      description:
        "Empresa líder en compra y venta de motocicletas custom en Argentina con más de 9 años de experiencia",
      foundingDate: "2015",
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Córdoba",
          addressRegion: "Córdoba",
          addressCountry: "AR",
        },
      },
      knowsAbout: [
        "Motocicletas Custom",
        "Harley Davidson",
        "Choppers",
        "Bobbers",
        "Compra venta motos",
        "Café Racer",
        "Motos Clásicas",
      ],
    },
  }

  return (
    <main className="min-h-screen bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        <Image
          src="/motorcycle-garage-workshop-custom-bikes.jpg"
          alt="Kustom Mania Workshop"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-balance">
            Nuestra Historia - Kustom Mania Córdoba
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-balance">
            Pasión por las dos ruedas desde el primer día. Más de 9 años liderando el mercado de motos custom en
            Argentina desde Córdoba.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">
            Quiénes Somos - Líderes en Compra Venta de Motos Custom
          </h2>
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <p className="text-xl md:text-2xl text-[#b87333] font-serif">
              En Kustom Mania, vivimos y respiramos motocicletas. Somos tu concesionaria de confianza en Córdoba.
            </p>
            <p className="text-lg md:text-xl">
              Desde Córdoba, Argentina, somos más que un negocio de compra-venta de motos. Somos una comunidad de
              entusiastas que entiende que cada motocicleta tiene una historia, una personalidad, y un alma única.
              Nuestra misión es conectar a la gente de todo el país con la moto perfecta que refleje su estilo y pasión.
              Especializados en Harley Davidson, choppers custom, bobbers vintage y motos clásicas americanas.
            </p>
            <p className="text-lg md:text-xl">
              Con más de 9 años de experiencia en el mercado argentino, hemos construido una reputación sólida basada en
              la confianza, la transparencia y el amor genuino por las dos ruedas. Vendemos a todo Argentina con envíos
              seguros, facilitando que tu moto ideal llegue sin importar donde te encuentres. Cada motocicleta que pasa
              por nuestras manos es cuidadosamente seleccionada, inspeccionada mecánicamente y preparada para su próximo
              dueño. Más de 130 motos vendidas nos respaldan.
            </p>
            <p className="text-lg md:text-xl">
              No importa si buscas una custom clásica Harley Davidson, una chopper imponente, una bobber minimalista o
              una cafe racer elegante. En Kustom Mania encontrarás no solo una moto, sino una experiencia completa de
              compra respaldada por profesionales que realmente entienden lo que significa ser parte de la cultura
              motera argentina. Visitanos en nuestro showroom de Córdoba o consultanos por WhatsApp desde cualquier
              provincia. Ofrecemos financiación, aceptamos permutas y garantizamos calidad en cada venta.
            </p>
            <p className="text-lg md:text-xl">
              Nuestro equipo está formado por apasionados del motociclismo con décadas de experiencia combinada en
              mecánica, compra-venta y asesoramiento. Entendemos las particularidades del mercado argentino de motos
              custom: valuaciones realistas, verificación de documentación, estado real de los vehículos y tendencias de
              precios. Este conocimiento profundo nos permite ofrecer el mejor servicio tanto si buscas comprar tu
              próxima moto como si deseas vender la que ya tienes al mejor precio del mercado.
            </p>
            <p className="text-lg md:text-xl">
              En Kustom Mania creemos que comprar una moto debe ser una experiencia emocionante y sin complicaciones.
              Por eso facilitamos todo el proceso: desde la primera consulta por WhatsApp hasta la entrega final con
              toda la documentación en regla. Ofrecemos garantía extendida en nuestras unidades, opciones de
              financiación flexibles con las mejores tasas del mercado, y la posibilidad de tomar tu moto usada como
              parte de pago. Tu satisfacción es nuestra prioridad absoluta, reflejada en las excelentes reseñas de
              nuestros clientes en Google y redes sociales.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-white mb-16">
            Nuestros Valores y Compromiso
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl bg-black/30 border border-zinc-800 hover:border-[#b87333] transition-all duration-300 hover-lift group">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#b87333]/20 to-[#b87333]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-[#b87333]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#b87333] transition-colors">Pasión</h3>
              <p className="text-gray-400 leading-relaxed">
                Amamos lo que hacemos y se nota en cada detalle de nuestro servicio
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-black/30 border border-zinc-800 hover:border-[#b87333] transition-all duration-300 hover-lift group">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#b87333]/20 to-[#b87333]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-[#b87333]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#b87333] transition-colors">Confianza</h3>
              <p className="text-gray-400 leading-relaxed">
                Transparencia total en cada transacción y garantía de calidad
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-black/30 border border-zinc-800 hover:border-[#b87333] transition-all duration-300 hover-lift group">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#b87333]/20 to-[#b87333]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-[#b87333]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#b87333] transition-colors">Calidad</h3>
              <p className="text-gray-400 leading-relaxed">
                Solo trabajamos con motos que cumplen nuestros estándares más altos
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-black/30 border border-zinc-800 hover:border-[#b87333] transition-all duration-300 hover-lift group">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#b87333]/20 to-[#b87333]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-[#b87333]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#b87333] transition-colors">Experiencia</h3>
              <p className="text-gray-400 leading-relaxed">Años de conocimiento del mercado para asesorarte mejor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/motorcycle-collection-showroom.jpg"
              alt="Kustom Mania Collection"
              fill
              className="object-cover"
              loading="lazy"
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Nuestra Misión en el Mercado Argentino
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Desde nuestro showroom en Córdoba, facilitamos el encuentro perfecto entre la gente de todo Argentina y
              sus motos ideales, ofreciendo una experiencia de compra-venta transparente, profesional y apasionada, con
              envíos seguros a cualquier punto del país. Trabajamos con las mejores marcas y modelos custom del mercado.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Queremos ser el punto de referencia número uno para todos los amantes de las motocicletas en Argentina que
              buscan calidad certificada, amplia variedad de stock y un servicio excepcional. Compramos motos usadas al
              mejor precio y vendemos con garantía extendida.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 md:py-32 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-white mb-6">Nuestro Espacio</h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto text-balance">
            Un lugar donde la pasión por las motos se respira en cada rincón
          </p>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2 lg:row-span-2 relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden group">
              <Image
                src="/images/design-mode/6b254223-c588-4975-9460.jpg"
                alt="Kustom Mania - Nuestro equipo y showroom"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-serif font-bold">Donde la pasión cobra vida</p>
              </div>
            </div>

            <div className="relative h-[300px] md:h-[290px] rounded-2xl overflow-hidden group">
              <Image
                src="/images/design-mode/c8842b32-d0e3-4fdb-b89b.jpg"
                alt="Harley Davidson en showroom"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="relative h-[300px] md:h-[290px] rounded-2xl overflow-hidden group">
              <Image
                src="/images/design-mode/0819fcbb-d6c3-4d9b-a374.jpg"
                alt="Ambiente vintage del showroom"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="md:col-span-2 relative h-[300px] md:h-[290px] rounded-2xl overflow-hidden group">
              <Image
                src="/images/design-mode/2c658c15-fe25-4ae2-91cc.jpg"
                alt="Variedad de motocicletas en stock"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-serif font-bold">Amplia variedad en stock</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-balance">
            ¿Listo para encontrar tu próxima moto?
          </h2>
          <p className="text-xl text-gray-300 text-balance">
            Explora nuestra colección o contáctanos para asesoramiento personalizado
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/coleccion"
              className="px-8 py-4 bg-[#b87333] text-white font-semibold rounded-full hover:bg-[#a66329] transition-all duration-300 text-lg min-w-[200px] hover:scale-105 shadow-lg hover:shadow-[#b87333]/50"
            >
              Ver Colección
            </Link>
            <a
              href={`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass-effect text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 text-lg min-w-[200px] flex items-center justify-center gap-2 hover:scale-105 shadow-lg"
            >
              <Image
                src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="w-6 h-6 group-hover:rotate-12 transition-transform"
                loading="lazy"
              />
              Contactar
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
