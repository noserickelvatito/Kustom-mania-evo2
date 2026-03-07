import Link from "next/link"
import { Instagram, Facebook, MapPin, Phone, Clock, Shield, Truck, CreditCard } from "lucide-react"
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants"

export function Footer() {
  const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}`
  
  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800/50 mt-0 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "radial-gradient(circle at 20% 80%, rgba(184, 115, 51, 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(212, 165, 116, 0.2) 0%, transparent 40%)"
          }} 
        />
      </div>
      
      {/* Features bar */}
      <div className="relative border-b border-zinc-800/50 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#b87333]/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-[#b87333]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Envíos</p>
                <p className="text-gray-400 text-xs">A todo el país</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#b87333]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#b87333]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Garantía</p>
                <p className="text-gray-400 text-xs">Documentación al día</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#b87333]/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-[#b87333]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Financiación</p>
                <p className="text-gray-400 text-xs">Planes flexibles</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#b87333]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#b87333]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">+9 Años</p>
                <p className="text-gray-400 text-xs">De experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start space-y-6">
            <Link href="/" className="text-2xl font-serif font-bold text-[#b87333] hover:scale-105 transition-transform">
              KUSTOM MANIA
            </Link>
            <p className="text-gray-400 text-sm text-center sm:text-left leading-relaxed max-w-xs">
              Pasión por las dos ruedas. Donde la personalidad se encuentra con el asfalto. 
              <span className="text-[#b87333]"> +130 motos vendidas</span> y contando.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/kustomania_cba/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-zinc-800/50 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] flex items-center justify-center transition-all duration-300 hover:scale-110 border border-zinc-700/50 hover:border-transparent group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/kustommania"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-zinc-800/50 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 hover:scale-110 border border-zinc-700/50 hover:border-transparent group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-zinc-800/50 hover:bg-gradient-to-br hover:from-[#25D366] hover:to-[#128C7E] flex items-center justify-center transition-all duration-300 hover:scale-110 border border-zinc-700/50 hover:border-transparent group"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[#b87333] font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#b87333] to-transparent rounded-full" />
              Enlaces Rápidos
            </h3>
            <div className="space-y-4">
              <Link href="/" className="block text-gray-400 hover:text-[#b87333] transition-colors text-sm group">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#b87333] transition-colors" />
                  Inicio
                </span>
              </Link>
              <Link href="/coleccion" className="block text-gray-400 hover:text-[#b87333] transition-colors text-sm group">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#b87333] transition-colors" />
                  Colección
                </span>
              </Link>
              <Link href="/nosotros" className="block text-gray-400 hover:text-[#b87333] transition-colors text-sm group">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#b87333] transition-colors" />
                  Nosotros
                </span>
              </Link>
              <Link href="/comparar" className="block text-gray-400 hover:text-[#b87333] transition-colors text-sm group">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#b87333] transition-colors" />
                  Comparar Motos
                </span>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[#b87333] font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#b87333] to-transparent rounded-full" />
              Contacto
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400 text-sm group">
                <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b87333]/10 transition-colors">
                  <MapPin className="w-4 h-4 text-[#b87333]" />
                </div>
                <div>
                  <p className="text-white font-medium">Córdoba, Argentina</p>
                  <p className="text-xs text-gray-500">Showroom con cita previa</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm group">
                <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b87333]/10 transition-colors">
                  <Phone className="w-4 h-4 text-[#b87333]" />
                </div>
                <div>
                  <p className="text-white font-medium">Consultas por WhatsApp</p>
                  <p className="text-xs text-gray-500">Respondemos en minutos</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-zinc-800/50 w-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-[#b87333]">+130</p>
                  <p className="text-xs text-gray-500">Motos vendidas</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-[#b87333]">+9</p>
                  <p className="text-xs text-gray-500">Años experiencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[#b87333] font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#b87333] to-transparent rounded-full" />
              ¿Buscás tu moto?
            </h3>
            <p className="text-gray-400 text-sm mb-6 text-center sm:text-left">
              Contactanos ahora y encontrá la moto de tus sueños. Respuesta inmediata.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-enhanced w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 text-white font-bold rounded-xl text-sm"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-zinc-800/50 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Kustom Mania. Todos los derechos reservados.
            </p>
            <p className="text-gray-600 text-xs text-center md:text-right">
              Compra y venta de motocicletas custom | Harley Davidson | Córdoba - Envíos a todo Argentina
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
