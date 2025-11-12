import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/image-uploader"
import { ImageGalleryAdmin } from "@/components/admin/image-gallery-admin"
import { Images } from "lucide-react"

export default async function ImagesAdminPage() {
  const supabase = await createClient()

  const { data: motorcycles } = await supabase.from("motorcycles").select("id, name, slug").order("name")

  const { data: images } = await supabase
    .from("motorcycle_images")
    .select("*, motorcycles(name)")
    .order("created_at", { ascending: false })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Images className="h-8 w-8 text-[#b87333]" />
          Gestión de Imágenes
        </h1>
        <p className="text-muted-foreground">Sube y organiza las imágenes de las motocicletas</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Subir Nueva Imagen</CardTitle>
          <CardDescription>Selecciona una motocicleta y sube imágenes de alta calidad</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUploader motorcycles={motorcycles || []} />
        </CardContent>
      </Card>

      {/* Images Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Imágenes</CardTitle>
          <CardDescription>{images?.length || 0} imágenes en total</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageGalleryAdmin images={images || []} motorcycles={motorcycles || []} />
        </CardContent>
      </Card>
    </div>
  )
}
