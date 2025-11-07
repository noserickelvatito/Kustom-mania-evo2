import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ConditionalNav } from "@/components/conditional-nav"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kustommania.com"),
  title: {
    default: "Kustom Mania | Compra Venta Motos Custom Argentina | Harley Davidson Buenos Aires",
    template: "%s | Kustom Mania - Motos Custom Argentina",
  },
  description:
    "Kustom Mania: Líderes en compra y venta de motos custom en Argentina. Harley Davidson, choppers, bobbers y motos clásicas. +130 motos vendidas. Showroom en Buenos Aires. Mejor precio garantizado. WhatsApp: consultas inmediatas.",
  keywords: [
    // Primary keywords
    "kustom mania",
    "kustommania",
    "motos custom",
    "motos custom argentina",
    "compra venta motos",
    "comprar moto custom",
    "vender moto custom",

    // Brand-specific
    "Harley Davidson Argentina",
    "Harley Davidson Buenos Aires",
    "Harley Davidson usadas",
    "comprar Harley Davidson",
    "vender Harley Davidson",

    // Motorcycle types
    "motos choppers",
    "motos bobbers",
    "motos cafe racer",
    "motos clásicas",
    "motos vintage",
    "motocicletas custom",
    "custom bikes Argentina",

    // Local keywords
    "motos Buenos Aires",
    "compra venta motos Buenos Aires",
    "concesionaria motos custom",
    "showroom motos",

    // Transaction keywords
    "motos usadas",
    "motos segunda mano",
    "motos en venta",
    "venta motos custom",
    "permuta motos",
    "financiación motos",

    // Long-tail keywords
    "donde comprar moto custom Argentina",
    "mejor precio Harley Davidson",
    "vender mi moto rápido",
    "motos custom con garantía",
  ],
  authors: [{ name: "Kustom Mania", url: "https://kustommania.com" }],
  creator: "Kustom Mania",
  publisher: "Kustom Mania",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["es_ES", "es_MX"],
    url: "/",
    siteName: "Kustom Mania - Motos Custom Argentina",
    title: "Kustom Mania | Compra Venta Motos Custom y Harley Davidson en Argentina",
    description:
      "Tu lugar para comprar y vender motos custom. Harley Davidson, choppers y bobbers. +130 motos vendidas. Showroom en Buenos Aires. Mejor precio garantizado.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kustom Mania - Showroom de Motocicletas Custom en Buenos Aires",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Kustom Mania Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kustommania",
    creator: "@kustommania",
    title: "Kustom Mania | Motos Custom y Harley Davidson Argentina",
    description: "Líderes en compra venta de motos custom. +130 motos vendidas. Showroom en Buenos Aires.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
  applicationName: "Kustom Mania",
  referrer: "origin-when-cross-origin",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/",
      es: "/",
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    other: {
      "facebook-domain-verification": "facebook-verification-code",
    },
  },
  category: "automotive",
  classification: "Motorcycle Dealer",
  other: {
    "msapplication-TileColor": "#b87333",
    "msapplication-TileImage": "/mstile-144x144.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kustommania.com"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${baseUrl}/#organization`,
    name: "Kustom Mania",
    alternateName: ["KustomMania", "Kustom Mania Motos"],
    description: "Compra y venta de motocicletas custom, Harley Davidson, choppers y motos clásicas en Argentina",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      "@id": `${baseUrl}/#logo`,
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
      caption: "Kustom Mania Logo",
    },
    image: {
      "@type": "ImageObject",
      "@id": `${baseUrl}/#image`,
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
      caption: "Kustom Mania Showroom",
    },
    telephone: "+54-9-11-XXXX-XXXX",
    priceRange: "$$-$$$",
    currenciesAccepted: "ARS, USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, Cryptocurrency",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AR",
      addressRegion: "Buenos Aires",
      addressLocality: "Buenos Aires",
      streetAddress: "Dirección del Showroom",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-34.6037",
      longitude: "-58.3816",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Argentina",
      },
      {
        "@type": "State",
        name: "Buenos Aires",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "132",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.instagram.com/kustomania_cba/",
      "https://www.facebook.com/kustommania",
      "https://wa.me/XXXXXXXXXXX",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    potentialAction: {
      "@type": "TradeAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/coleccion`,
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Kustom Mania",
    description: "Compra y venta de motos custom en Argentina",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/coleccion?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "es-AR",
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Colección",
        item: `${baseUrl}/coleccion`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Nosotros",
        item: `${baseUrl}/nosotros`,
      },
    ],
  }

  return (
    <html lang="es-AR">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kustom Mania" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="geo.region" content="AR-B" />
        <meta name="geo.placename" content="Buenos Aires" />
        <meta name="geo.position" content="-34.6037;-58.3816" />
        <meta name="ICBM" content="-34.6037, -58.3816" />
        <meta name="language" content="Spanish" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="1 days" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-152x152.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-120x120.png" sizes="120x120" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </head>
      <body className={`font-sans antialiased bg-black ${_playfair.className}`}>
        {children}
        <ConditionalNav />
        <Analytics />
      </body>
    </html>
  )
}
