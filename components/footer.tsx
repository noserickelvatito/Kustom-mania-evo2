import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gKE3p8zzYqmg4USibnN8qQjDWdFLFe.png"
              alt="Kustom Mania Logo"
              width={200}
              height={200}
              className="w-48 h-auto"
            />
            <p className="text-neutral-400 text-sm text-center md:text-left">
              Pasión por las dos ruedas.
              <br />
              Donde la personalidad se encuentra con el asfalto.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h3 className="text-[#b87333] font-bold text-lg mb-2">Enlaces Rápidos</h3>
            <Link href="/" className="text-neutral-300 hover:text-[#b87333] transition-colors">
              Inicio
            </Link>
            <Link href="/coleccion" className="text-neutral-300 hover:text-[#b87333] transition-colors">
              Colección
            </Link>
            <Link href="/nosotros" className="text-neutral-300 hover:text-[#b87333] transition-colors">
              Nosotros
            </Link>
            <Link href="/comparar" className="text-neutral-300 hover:text-[#b87333] transition-colors">
              Comparar Motos
            </Link>
          </div>

          {/* Social Media & Contact */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h3 className="text-[#b87333] font-bold text-lg mb-2">Conecta con Nosotros</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/kustomania_cba/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-[#b87333] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/kustommania"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-[#b87333] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
            <div className="text-neutral-400 text-sm mt-4 text-center md:text-left">
              <p className="font-semibold text-neutral-300">Córdoba, Argentina</p>
              <p className="mt-1">Envíos a todo el país</p>
              <p>+9 años en el mercado</p>
              <p>+130 motos vendidas</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Kustom Mania. Todos los derechos reservados.</p>
          <p className="mt-2">
            Compra y venta de motocicletas custom | Harley Davidson | Córdoba - Envíos a todo Argentina
          </p>
        </div>
      </div>
    </footer>
  )
}
