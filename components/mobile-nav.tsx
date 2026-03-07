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
        <div className="mx-3 mb-3 rounded-3xl glass-effect shadow-2xl">
          <div className="flex items-center justify-around px-4 py-3">
            <Link
              href="/"
              className={`flex flex-col items-center gap-1.5 min-w-[60px] py-2 transition-all duration-300 ${
                isActive("/") ? "text-[#b87333] scale-110" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive("/") ? "bg-[#b87333]/10" : ""}`}>
                <Home className="w-6 h-6" strokeWidth={isActive("/") ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium tracking-wider uppercase">Inicio</span>
            </Link>

            <Link
              href="/coleccion"
              className={`flex flex-col items-center gap-1.5 min-w-[60px] py-2 transition-all duration-300 ${
                isActive("/coleccion") ? "text-[#b87333] scale-110" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive("/coleccion") ? "bg-[#b87333]/10" : ""}`}>
                <Grid3x3 className="w-6 h-6" strokeWidth={isActive("/coleccion") ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium tracking-wider uppercase">Motos</span>
            </Link>

            <Link
              href="/nosotros"
              className={`flex flex-col items-center gap-1.5 min-w-[60px] py-2 transition-all duration-300 ${
                isActive("/nosotros") ? "text-[#b87333] scale-110" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive("/nosotros") ? "bg-[#b87333]/10" : ""}`}>
                <Users className="w-6 h-6" strokeWidth={isActive("/nosotros") ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium tracking-wider uppercase">Nosotros</span>
            </Link>

            <Link
              href="/comparar"
              className={`flex flex-col items-center gap-1.5 min-w-[60px] py-2 transition-all duration-300 ${
                isActive("/comparar") ? "text-[#b87333] scale-110" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive("/comparar") ? "bg-[#b87333]/10" : ""}`}>
                <Scale className="w-6 h-6" strokeWidth={isActive("/comparar") ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium tracking-wider uppercase">Comparar</span>
            </Link>
          </div>
        </div>
      </nav>

      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 pt-safe">
        <div className="mx-4 lg:mx-6 mt-4 lg:mt-6 rounded-3xl glass-effect shadow-2xl">
          <div className="flex items-center justify-between px-6 lg:px-8 py-4">
            <Link href="/" className="text-xl lg:text-2xl font-serif font-bold text-[#b87333] hover:scale-105 transition-transform">
              KUSTOM MANIA
            </Link>

            <div className="flex items-center gap-4 lg:gap-8">
              <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive("/") 
                    ? "text-[#b87333] bg-[#b87333]/10" 
                    : "text-gray-300 hover:text-[#b87333] hover:bg-[#b87333]/5"
                }`}
              >
                <Home className="w-5 h-5" strokeWidth={isActive("/") ? 2.5 : 2} />
                <span className="text-sm font-medium tracking-wider uppercase hidden lg:inline">Inicio</span>
              </Link>

              <Link
                href="/coleccion"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive("/coleccion") 
                    ? "text-[#b87333] bg-[#b87333]/10" 
                    : "text-gray-300 hover:text-[#b87333] hover:bg-[#b87333]/5"
                }`}
              >
                <Grid3x3 className="w-5 h-5" strokeWidth={isActive("/coleccion") ? 2.5 : 2} />
                <span className="text-sm font-medium tracking-wider uppercase hidden lg:inline">Colección</span>
              </Link>

              <Link
                href="/nosotros"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive("/nosotros") 
                    ? "text-[#b87333] bg-[#b87333]/10" 
                    : "text-gray-300 hover:text-[#b87333] hover:bg-[#b87333]/5"
                }`}
              >
                <Users className="w-5 h-5" strokeWidth={isActive("/nosotros") ? 2.5 : 2} />
                <span className="text-sm font-medium tracking-wider uppercase hidden lg:inline">Nosotros</span>
              </Link>

              <Link
                href="/comparar"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive("/comparar") 
                    ? "text-[#b87333] bg-[#b87333]/10" 
                    : "text-gray-300 hover:text-[#b87333] hover:bg-[#b87333]/5"
                }`}
              >
                <Scale className="w-5 h-5" strokeWidth={isActive("/comparar") ? 2.5 : 2} />
                <span className="text-sm font-medium tracking-wider uppercase hidden lg:inline">Comparar</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
