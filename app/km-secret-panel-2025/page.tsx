import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get statistics
  const { count: motorcyclesCount } = await supabase.from("motorcycles").select("*", { count: "exact", head: true })

  const { count: leadsCount } = await supabase.from("leads").select("*", { count: "exact", head: true })

  const { count: imagesCount } = await supabase.from("motorcycle_images").select("*", { count: "exact", head: true })

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
            <h1
              className="text-2xl sm:text-3xl font-black tracking-wider"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                color: "#b87333",
                textShadow: "0 0 20px rgba(184, 115, 51, 0.5)",
              }}
            >
              KUSTOM MANIA
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Panel de Administración</p>
          </div>

          <Link href="/" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="border-[#b87333] text-[#b87333] hover:bg-[#b87333] hover:text-white bg-transparent"
            >
              Ver Sitio
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#b87333" }}>
            Panel de Control
          </h2>
          <p className="text-gray-400">Gestiona tu sitio web de motocicletas personalizadas</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
              border: "2px solid #b87333",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "#b87333" }}>Motocicletas</CardTitle>
              <CardDescription className="text-gray-400">Total en catálogo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{motorcyclesCount || 0}</p>
            </CardContent>
          </Card>

          <Card
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
              border: "2px solid #b87333",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "#b87333" }}>Consultas</CardTitle>
              <CardDescription className="text-gray-400">Leads de WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{leadsCount || 0}</p>
            </CardContent>
          </Card>

          <Card
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
              border: "2px solid #b87333",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "#b87333" }}>Imágenes</CardTitle>
              <CardDescription className="text-gray-400">Total subidas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{imagesCount || 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/km-secret-panel-2025/motorcycles">
            <Card
              className="hover:scale-105 transition-transform cursor-pointer"
              style={{
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                border: "2px solid #b87333",
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg" style={{ color: "#b87333" }}>
                  Gestionar Motos
                </CardTitle>
                <CardDescription className="text-gray-400">Crear, editar y eliminar</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/km-secret-panel-2025/leads">
            <Card
              className="hover:scale-105 transition-transform cursor-pointer"
              style={{
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                border: "2px solid #b87333",
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg" style={{ color: "#b87333" }}>
                  Ver Consultas
                </CardTitle>
                <CardDescription className="text-gray-400">Leads y estadísticas</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/km-secret-panel-2025/images">
            <Card
              className="hover:scale-105 transition-transform cursor-pointer"
              style={{
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                border: "2px solid #b87333",
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg" style={{ color: "#b87333" }}>
                  Gestionar Imágenes
                </CardTitle>
                <CardDescription className="text-gray-400">Subir y organizar</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/km-secret-panel-2025/config">
            <Card
              className="hover:scale-105 transition-transform cursor-pointer"
              style={{
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                border: "2px solid #b87333",
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg" style={{ color: "#b87333" }}>
                  Configuración
                </CardTitle>
                <CardDescription className="text-gray-400">Ajustes del sitio</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
