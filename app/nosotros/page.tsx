import Image from "next/image"
import Link from "next/link"
import { Award, Heart, Shield, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Nosotros - Historia de Kustom Mania | 9+ Años en Motos Custom Argentina",
  description:
    "Conoce la historia de Kustom Mania. Más de 9 años liderando la compra venta de motos custom en Argentina. +130 motos vendidas. Showroom en Buenos Aires. Pasión, confianza y experiencia en cada transacción. Conoce nuestro equipo y valores.",
  keywords: [
    "Kustom Mania historia",
    "sobre Kustom Mania",
    "quienes somos Kustom Mania",
    "empresa motos custom Argentina",
    "compraventa motos Buenos Aires",
    "showroom motos custom",
    "vendedor motos confiable",
    "experiencia motos custom",
    "dealer motos Argentina",
    "concesionaria motos custom",
    "equipo Kustom Mania",
    "valores empresa motos",
  ],
  openGraph: {
    title: "Nosotros - Kustom Mania | 9+ Años de Pasión por las Motos Custom",
    description:
      "Más de 9 años conectando personas con sus motos ideales. +130 motos vendidas. Conoce nuestra historia, valores y showroom en Buenos Aires.",
    url: "/nosotros",
    type: "website",
    images: [
      {
        url: "/og-image-about.jpg",
        width: 1200,
        height: 630,
        alt: "Showroom Kustom Mania - Buenos Aires",
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
    canonical: "/nosotros",
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
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: "5-10",
      },
      slogan: "Pasión por las dos ruedas. Donde la personalidad se encuentra con el asfalto.",
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
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-balance">Nuestra Historia</h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-balance">
            Pasión por las dos ruedas desde el primer día
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <p className="text-xl md:text-2xl text-[#b87333] font-serif">
              En Kustom Mania, vivimos y respiramos motocicletas.
            </p>
            <p className="text-lg md:text-xl">
              Somos más que un negocio de compra-venta de motos. Somos una comunidad de entusiastas que entiende que
              cada motocicleta tiene una historia, una personalidad, y un alma única. Nuestra misión es conectar a la
              gente con la moto perfecta que refleje su estilo y pasión.
            </p>
            <p className="text-lg md:text-xl">
              Con años de experiencia en el mercado, hemos construido una reputación basada en la confianza, la
              transparencia y el amor genuino por las dos ruedas. Cada moto que pasa por nuestras manos es
              cuidadosamente seleccionada, inspeccionada y preparada para su próximo dueño.
            </p>
            <p className="text-lg md:text-xl">
              No importa si buscas una custom clásica, una chopper imponente, o una cafe racer elegante. En Kustom Mania
              encontrarás no solo una moto, sino una experiencia completa de compra respaldada por profesionales que
              realmente entienden lo que significa ser parte de la cultura motera.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-white mb-16">Nuestros Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#b87333]/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-[#b87333]" />
              </div>
              <h3 className="text-xl font-bold text-white">Pasión</h3>
              <p className="text-gray-400 leading-relaxed">
                Amamos lo que hacemos y se nota en cada detalle de nuestro servicio
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#b87333]/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#b87333]" />
              </div>
              <h3 className="text-xl font-bold text-white">Confianza</h3>
              <p className="text-gray-400 leading-relaxed">
                Transparencia total en cada transacción y garantía de calidad
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#b87333]/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#b87333]" />
              </div>
              <h3 className="text-xl font-bold text-white">Calidad</h3>
              <p className="text-gray-400 leading-relaxed">
                Solo trabajamos con motos que cumplen nuestros estándares más altos
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#b87333]/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-[#b87333]" />
              </div>
              <h3 className="text-xl font-bold text-white">Experiencia</h3>
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Nuestra Misión</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Facilitar el encuentro perfecto entre la gente y sus motos ideales, ofreciendo una experiencia de
              compra-venta transparente, profesional y apasionada.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Queremos ser el punto de referencia para todos los amantes de las motocicletas que buscan calidad,
              variedad y un servicio excepcional.
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
              className="px-8 py-4 bg-[#b87333] text-white font-semibold rounded-full hover:bg-[#a66329] transition-all text-lg min-w-[200px]"
            >
              Ver Colección
            </Link>
            <a
              href="https://wa.me/5491234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20 text-lg min-w-[200px] flex items-center justify-center gap-2"
            >
              <Image
                src="/images/design-mode/f02e4899-1184-46a0-b3e6-60ad81b82123.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="w-6 h-6"
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
