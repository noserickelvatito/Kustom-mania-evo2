import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Kustom Mania",
  description: "Pasión por las dos ruedas",
  generator: "v0.app",
  themeColor: "#000000",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`font-sans antialiased ${_playfair.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
