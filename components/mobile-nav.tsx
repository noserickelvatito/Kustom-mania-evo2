"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3x3, Scale, Users } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <>
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
              href="/nosotros"
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive("/nosotros") ? "text-[#b87333]" : "text-gray-400"
              }`}
            >
              <Users className="w-6 h-6" strokeWidth={isActive("/nosotros") ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wider uppercase">Nosotros</span>
            </Link>

            <Link
              href="/comparar"
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive("/comparar") ? "text-[#b87333]" : "text-gray-400"
              }`}
            >
              <Scale className="w-6 h-6" strokeWidth={isActive("/comparar") ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wider uppercase">Comparar</span>
            </Link>
          </div>
        </div>
      </nav>

      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 pt-safe">
        <div className="mx-6 mt-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between px-8 py-4">
            <Link href="/" className="text-2xl font-serif font-bold text-[#b87333]">
              KUSTOM MANIA
            </Link>

            <div className="flex items-center gap-8">
              <Link
                href="/"
                className={`flex items-center gap-2 transition-all ${
                  isActive("/") ? "text-[#b87333]" : "text-gray-300 hover:text-[#b87333]"
                }`}
              >
                <Home className="w-5 h-5" strokeWidth={isActive("/") ? 2.5 : 2} />
                <span className="text-sm font-medium tracking-wider uppercase">Inicio</span>
              </Link>

              <Link
                href="/coleccion"
                className={`flex items-center gap-2 transition-all ${
                  isActive("/coleccion") ? "text-[#b87333]" : "text-gray-300 hover:text-[#b87333]"
                }`}
              >
                <Grid3x3 className="w-5 h-5" strokeWidth={isActive("/coleccion") ? 2.5 : 2} />
                <span className="text-sm font-medium tracking-wider uppercase">Colección</span>
              </Link>

              <Link
                href="/nosotros"
                className={`flex items-center gap-2 transition-all ${
                  isActive("/nosotros") ? "text-[#b87333]" : "text-gray-300 hover:text-[#b87333]"
                }`}
              >
                <Users className="w-5 h-5" strokeWidth={isActive("/nosotros") ? 2.5 : 2} />
                <span className="text-sm font-medium tracking-wider uppercase">Nosotros</span>
              </Link>

              <Link
                href="/comparar"
                className={`flex items-center gap-2 transition-all ${
                  isActive("/comparar") ? "text-[#b87333]" : "text-gray-300 hover:text-[#b87333]"
                }`}
              >
                <Scale className="w-5 h-5" strokeWidth={isActive("/comparar") ? 2.5 : 2} />
                <span className="text-sm font-medium tracking-wider uppercase">Comparar</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
