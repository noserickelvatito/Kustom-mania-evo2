import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, MapPin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gKE3p8zzYqmg4USibnN8qQjDWdFLFe.png"
              alt="Kustom Mania Logo"
              width={200}
              height={200}
              className="w-40 md:w-48 h-auto"
            />
            <p className="text-neutral-400 text-sm text-center sm:text-left leading-relaxed">
              Pasión por las dos ruedas.
              <br />
              Donde la personalidad se encuentra con el asfalto.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start space-y-3">
            <h3 className="text-[#b87333] font-bold text-lg mb-2">Enlaces Rápidos</h3>
            <Link href="/" className="text-neutral-300 hover:text-[#b87333] transition-colors text-sm">
              Inicio
            </Link>
            <Link href="/coleccion" className="text-neutral-300 hover:text-[#b87333] transition-colors text-sm">
              Colección
            </Link>
            <Link href="/nosotros" className="text-neutral-300 hover:text-[#b87333] transition-colors text-sm">
              Nosotros
            </Link>
            <Link href="/comparar" className="text-neutral-300 hover:text-[#b87333] transition-colors text-sm">
              Comparar Motos
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start space-y-3">
            <h3 className="text-[#b87333] font-bold text-lg mb-2">Contacto</h3>
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <MapPin className="w-4 h-4 text-[#b87333]" />
              <span>Córdoba, Argentina</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <Phone className="w-4 h-4 text-[#b87333]" />
              <span>Consultas por WhatsApp</span>
            </div>
            <div className="text-neutral-400 text-sm mt-2">
              <p>Envíos a todo el país</p>
              <p className="mt-1">+9 años en el mercado</p>
              <p>+130 motos vendidas</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <h3 className="text-[#b87333] font-bold text-lg mb-2">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/kustomania_cba/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-[#b87333] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-neutral-300 hover:text-white" />
              </a>
              <a
                href="https://www.facebook.com/kustommania"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-[#b87333] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-neutral-300 hover:text-white" />
              </a>
            </div>
            <p className="text-neutral-400 text-sm text-center sm:text-left mt-4">
              Mantente actualizado con nuestras últimas motos y ofertas especiales
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-10 pt-8 text-center">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Kustom Mania. Todos los derechos reservados.
          </p>
          <p className="text-neutral-600 text-xs mt-2">
            Compra y venta de motocicletas custom | Harley Davidson | Córdoba - Envíos a todo Argentina
          </p>
        </div>
      </div>
    </footer>
  )
}
