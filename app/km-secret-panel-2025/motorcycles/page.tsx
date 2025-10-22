import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteMotorcycleButton } from "@/components/admin/delete-motorcycle-button"

export default async function MotorcyclesAdminPage() {
  const supabase = await createClient()

  const { data: motorcycles } = await supabase
    .from("motorcycles")
    .select("*")
    .order("display_order", { ascending: true })

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
            <p className="text-xs text-gray-400 uppercase tracking-wider">Gestión de Motocicletas</p>
          </div>

          <Link href="/km-secret-panel-2025">
            <Button
              variant="outline"
              size="sm"
              className="border-[#b87333] text-[#b87333] hover:bg-[#b87333] hover:text-white bg-transparent"
            >
              ← Volver al Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#b87333" }}>
              Motocicletas
            </h2>
            <p className="text-gray-400">Gestiona el catálogo de motos</p>
          </div>

          <Link href="/km-secret-panel-2025/motorcycles/new">
            <Button
              style={{
                background: "#b87333",
                color: "white",
              }}
            >
              + Nueva Moto
            </Button>
          </Link>
        </div>

        {/* Motorcycles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motorcycles?.map((moto) => (
            <Card
              key={moto.id}
              style={{
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                border: "2px solid #b87333",
              }}
            >
              <CardHeader>
                <CardTitle style={{ color: "#b87333" }}>{moto.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span
                    className={`px-2 py-1 rounded text-xs ${moto.featured ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-400"}`}
                  >
                    {moto.featured ? "Destacada" : "Normal"}
                  </span>
                  <span className="text-xs">Orden: {moto.display_order}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{moto.description}</p>
                <div className="text-sm text-gray-400 mb-4">
                  <p>
                    <strong className="text-[#b87333]">Precio:</strong> ${moto.price?.toLocaleString("es-AR") || "N/A"}
                  </p>
                  <p>
                    <strong className="text-[#b87333]">Slug:</strong> {moto.slug}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link href={`/km-secret-panel-2025/motorcycles/${moto.id}/edit`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-[#b87333] text-[#b87333] hover:bg-[#b87333] hover:text-white bg-transparent"
                    >
                      Editar
                    </Button>
                  </Link>

                  <DeleteMotorcycleButton motorcycleId={moto.id} motorcycleName={moto.name} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!motorcycles || motorcycles.length === 0) && (
          <Card
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
              border: "2px solid #b87333",
            }}
          >
            <CardContent className="py-12 text-center">
              <p className="text-gray-400 mb-4">No hay motocicletas en el catálogo</p>
              <Link href="/km-secret-panel-2025/motorcycles/new">
                <Button
                  style={{
                    background: "#b87333",
                    color: "white",
                  }}
                >
                  Crear Primera Moto
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
