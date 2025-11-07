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
    default: "Kustom Mania - Compra y Venta de Motocicletas Custom | Motos Harley Davidson",
    template: "%s | Kustom Mania",
  },
  description:
    "Kustom Mania: Tu mejor opción para comprar y vender motocicletas custom en Argentina. Amplia variedad de Harley Davidson, choppers y motos clásicas. Calidad garantizada y precios justos.",
  keywords: [
    "motos custom",
    "Harley Davidson Argentina",
    "compra venta motos",
    "motos choppers",
    "motocicletas custom",
    "motos usadas",
    "motos clásicas",
    "Kustom Mania",
    "custom bikes",
    "motos personalizadas",
    "comprar moto custom",
    "vender moto",
  ],
  authors: [{ name: "Kustom Mania" }],
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
    url: "/",
    siteName: "Kustom Mania",
    title: "Kustom Mania - Compra y Venta de Motocicletas Custom",
    description:
      "Pasión por las dos ruedas. Amplia variedad de motos custom, Harley Davidson y choppers con calidad garantizada.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kustom Mania - Motocicletas Custom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kustom Mania - Compra y Venta de Motocicletas Custom",
    description: "Pasión por las dos ruedas. Amplia variedad de motos custom con calidad garantizada.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
  colorScheme: "dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google-site-verification-code", // Add your verification code
  },
  category: "automotive",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "Kustom Mania",
    description: "Compra y venta de motocicletas custom, Harley Davidson y choppers",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://kustommania.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kustommania.com"}/logo.png`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kustommania.com"}/og-image.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AR",
      addressLocality: "Argentina",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "100",
    },
    sameAs: [
      // Add your social media URLs
    ],
  }

  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`font-sans antialiased bg-black ${_playfair.className}`}>
        {children}
        <ConditionalNav />
        <Analytics />
      </body>
    </html>
  )
}
