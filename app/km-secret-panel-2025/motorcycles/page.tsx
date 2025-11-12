import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteMotorcycleButton } from "@/components/admin/delete-motorcycle-button"
import { Badge } from "@/components/ui/badge"

export default async function MotorcyclesAdminPage() {
  const supabase = await createClient()

  const { data: motorcycles } = await supabase
    .from("motorcycles")
    .select("*")
    .order("display_order", { ascending: true })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Motocicletas</h1>
          <p className="text-muted-foreground">Gestiona el catálogo de motos</p>
        </div>

        <Link href="/km-secret-panel-2025/motorcycles/new">
          <Button className="bg-[#b87333] hover:bg-[#b87333]/90">+ Nueva Moto</Button>
        </Link>
      </div>

      {/* Motorcycles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {motorcycles?.map((moto) => (
          <Card key={moto.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{moto.name}</CardTitle>
                {moto.featured && <Badge className="bg-green-600">Destacada</Badge>}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">Orden: {moto.display_order}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{moto.description}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio:</span>
                  <span className="font-semibold">${moto.price?.toLocaleString("es-AR") || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slug:</span>
                  <span className="font-mono text-xs">{moto.slug}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/km-secret-panel-2025/motorcycles/${moto.id}/edit`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
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
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No hay motocicletas en el catálogo</p>
            <Link href="/km-secret-panel-2025/motorcycles/new">
              <Button className="bg-[#b87333] hover:bg-[#b87333]/90">Crear Primera Moto</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
