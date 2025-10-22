import Link from "next/link"

interface HeaderProps {
  currentPage?: "inicio" | "coleccion" | "contacto"
  whatsappNumber?: string
}

export function Header({ currentPage = "inicio", whatsappNumber = "" }: HeaderProps) {
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}` : "https://wa.me/"

  return (
    <header className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6 gap-4 sm:gap-0 bg-black/80 backdrop-blur-sm">
      <nav className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-12">
        <Link
          href="/"
          className={`text-xs sm:text-sm tracking-widest transition-colors uppercase font-medium ${
            currentPage === "inicio" ? "text-[#b87333]" : "text-gray-300 hover:text-[#b87333]"
          }`}
        >
          INICIO
        </Link>
        <Link
          href="/coleccion"
          className={`text-xs sm:text-sm tracking-widest transition-colors uppercase font-medium ${
            currentPage === "coleccion" ? "text-[#b87333]" : "text-gray-300 hover:text-[#b87333]"
          }`}
        >
          COLECCIÓN
        </Link>
        <Link
          href="/contacto"
          className={`text-xs sm:text-sm tracking-widest transition-colors uppercase font-medium ${
            currentPage === "contacto" ? "text-[#b87333]" : "text-gray-300 hover:text-[#b87333]"
          }`}
        >
          CONTACTO
        </Link>
      </nav>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs sm:text-sm tracking-widest text-gray-300 hover:text-[#b87333] transition-colors uppercase font-medium"
      >
        WHATSAPP
      </a>
    </header>
  )
}
