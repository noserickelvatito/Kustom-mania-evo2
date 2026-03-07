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
      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <div className="mx-3 mb-3 rounded-3xl glass-effect-enhanced shadow-2xl">
          <div className="flex items-center justify-around px-2 py-2">
            <Link
              href="/"
              className={`flex flex-col items-center gap-1 min-w-[70px] py-3 px-2 rounded-2xl transition-all duration-300 ${
                isActive("/") 
                  ? "text-[#b87333] bg-[#b87333]/10 scale-105" 
                  : "text-gray-400 hover:text-gray-300 active:scale-95"
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                isActive("/") 
                  ? "bg-gradient-to-br from-[#b87333]/20 to-[#d4a574]/10 shadow-lg shadow-[#b87333]/20" 
                  : ""
              }`}>
                <Home className="w-6 h-6" strokeWidth={isActive("/") ? 2.5 : 1.5} />
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase">Inicio</span>
            </Link>

            <Link
              href="/coleccion"
              className={`flex flex-col items-center gap-1 min-w-[70px] py-3 px-2 rounded-2xl transition-all duration-300 ${
                isActive("/coleccion") 
                  ? "text-[#b87333] bg-[#b87333]/10 scale-105" 
                  : "text-gray-400 hover:text-gray-300 active:scale-95"
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                isActive("/coleccion") 
                  ? "bg-gradient-to-br from-[#b87333]/20 to-[#d4a574]/10 shadow-lg shadow-[#b87333]/20" 
                  : ""
              }`}>
                <Grid3x3 className="w-6 h-6" strokeWidth={isActive("/coleccion") ? 2.5 : 1.5} />
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase">Motos</span>
            </Link>

            <Link
              href="/nosotros"
              className={`flex flex-col items-center gap-1 min-w-[70px] py-3 px-2 rounded-2xl transition-all duration-300 ${
                isActive("/nosotros") 
                  ? "text-[#b87333] bg-[#b87333]/10 scale-105" 
                  : "text-gray-400 hover:text-gray-300 active:scale-95"
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                isActive("/nosotros") 
                  ? "bg-gradient-to-br from-[#b87333]/20 to-[#d4a574]/10 shadow-lg shadow-[#b87333]/20" 
                  : ""
              }`}>
                <Users className="w-6 h-6" strokeWidth={isActive("/nosotros") ? 2.5 : 1.5} />
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase">Nosotros</span>
            </Link>

            <Link
              href="/comparar"
              className={`flex flex-col items-center gap-1 min-w-[70px] py-3 px-2 rounded-2xl transition-all duration-300 ${
                isActive("/comparar") 
                  ? "text-[#b87333] bg-[#b87333]/10 scale-105" 
                  : "text-gray-400 hover:text-gray-300 active:scale-95"
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                isActive("/comparar") 
                  ? "bg-gradient-to-br from-[#b87333]/20 to-[#d4a574]/10 shadow-lg shadow-[#b87333]/20" 
                  : ""
              }`}>
                <Scale className="w-6 h-6" strokeWidth={isActive("/comparar") ? 2.5 : 1.5} />
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase">Comparar</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Desktop top navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 pt-safe">
        <div className="mx-4 lg:mx-8 mt-4 lg:mt-6 rounded-2xl glass-effect-enhanced shadow-2xl">
          <div className="flex items-center justify-between px-6 lg:px-10 py-4">
            {/* Logo */}
            <Link 
              href="/" 
              className="group flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b87333] to-[#d4a574] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#b87333]/30">
                <span className="text-black font-black text-lg">K</span>
              </div>
              <span className="text-xl lg:text-2xl font-serif font-bold text-shimmer">
                KUSTOM MANIA
              </span>
            </Link>

            {/* Navigation links */}
            <div className="flex items-center gap-2 lg:gap-4">
              <Link
                href="/"
                className={`group flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/") 
                    ? "text-[#b87333] bg-[#b87333]/10 shadow-inner" 
                    : "text-gray-300 hover:text-[#b87333] hover:bg-[#b87333]/5"
                }`}
              >
                <Home className="w-5 h-5" strokeWidth={isActive("/") ? 2.5 : 1.5} />
                <span className="text-sm font-medium tracking-wider uppercase hidden lg:inline">Inicio</span>
                {isActive("/") && <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] animate-pulse ml-1" />}
              </Link>

              <Link
                href="/coleccion"
                className={`group flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/coleccion") 
                    ? "text-[#b87333] bg-[#b87333]/10 shadow-inner" 
                    : "text-gray-300 hover:text-[#b87333] hover:bg-[#b87333]/5"
                }`}
              >
                <Grid3x3 className="w-5 h-5" strokeWidth={isActive("/coleccion") ? 2.5 : 1.5} />
                <span className="text-sm font-medium tracking-wider uppercase hidden lg:inline">Colección</span>
                {isActive("/coleccion") && <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] animate-pulse ml-1" />}
              </Link>

              <Link
                href="/nosotros"
                className={`group flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/nosotros") 
                    ? "text-[#b87333] bg-[#b87333]/10 shadow-inner" 
                    : "text-gray-300 hover:text-[#b87333] hover:bg-[#b87333]/5"
                }`}
              >
                <Users className="w-5 h-5" strokeWidth={isActive("/nosotros") ? 2.5 : 1.5} />
                <span className="text-sm font-medium tracking-wider uppercase hidden lg:inline">Nosotros</span>
                {isActive("/nosotros") && <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] animate-pulse ml-1" />}
              </Link>

              <Link
                href="/comparar"
                className={`group flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/comparar") 
                    ? "text-[#b87333] bg-[#b87333]/10 shadow-inner" 
                    : "text-gray-300 hover:text-[#b87333] hover:bg-[#b87333]/5"
                }`}
              >
                <Scale className="w-5 h-5" strokeWidth={isActive("/comparar") ? 2.5 : 1.5} />
                <span className="text-sm font-medium tracking-wider uppercase hidden lg:inline">Comparar</span>
                {isActive("/comparar") && <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] animate-pulse ml-1" />}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
