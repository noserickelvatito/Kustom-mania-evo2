import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MotorcycleForm } from "@/components/admin/motorcycle-form"

export default async function NewMotorcyclePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
      }}
    >
      {/* Header */}
      <header className="border-b border-[#b87333]/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link href="/km-secret-panel-2025">
              <h1
                className="text-2xl sm:text-3xl font-black tracking-wider cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  color: "#b87333",
                  textShadow: "0 0 20px rgba(184, 115, 51, 0.5)",
                }}
              >
                KUSTOM MANIA
              </h1>
            </Link>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Nueva Motocicleta</p>
          </div>

          <Link href="/km-secret-panel-2025/motorcycles">
            <Button
              variant="outline"
              size="sm"
              className="border-[#b87333] text-[#b87333] hover:bg-[#b87333] hover:text-white bg-transparent"
            >
              ← Volver
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#b87333" }}>
            Crear Nueva Motocicleta
          </h2>
          <p className="text-gray-400">Completa los datos de la nueva moto</p>
        </div>

        <MotorcycleForm />
      </main>
    </div>
  )
}
