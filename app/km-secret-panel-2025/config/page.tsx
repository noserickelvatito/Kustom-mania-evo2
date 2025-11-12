import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfigForm } from "@/components/admin/config-form"

export default async function ConfigAdminPage() {
  const supabase = await createClient()

  const { data: config } = await supabase.from("site_config").select("*").single()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración del Sitio</h1>
        <p className="text-muted-foreground">Edita los textos y configuración del sitio web</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajustes del Sitio</CardTitle>
          <CardDescription>Personaliza la información mostrada en el sitio público</CardDescription>
        </CardHeader>
        <CardContent>
          <ConfigForm config={config} />
        </CardContent>
      </Card>
    </div>
  )
}
