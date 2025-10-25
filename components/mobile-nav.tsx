"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3x3, MessageSquare, MessageCircle } from "lucide-react"

interface MobileNavProps {
  whatsappNumber?: string
}

export function MobileNav({ whatsappNumber = "" }: MobileNavProps) {
  const pathname = usePathname()
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}` : "https://wa.me/"

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-4 mb-4 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex items-center justify-around px-6 py-4">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive("/") ? "text-[#b87333]" : "text-gray-400"
            }`}
          >
            <Home className="w-6 h-6" strokeWidth={isActive("/") ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wider uppercase">Inicio</span>
          </Link>

          <Link
            href="/coleccion"
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive("/coleccion") ? "text-[#b87333]" : "text-gray-400"
            }`}
          >
            <Grid3x3 className="w-6 h-6" strokeWidth={isActive("/coleccion") ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wider uppercase">Motos</span>
          </Link>

          <Link
            href="/contacto"
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive("/contacto") ? "text-[#b87333]" : "text-gray-400"
            }`}
          >
            <MessageSquare className="w-6 h-6" strokeWidth={isActive("/contacto") ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wider uppercase">Contacto</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#b87333] transition-all"
          >
            <MessageCircle className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-medium tracking-wider uppercase">WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
