import { createClient } from "@/lib/supabase/server"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const { data: motorcycles } = await supabase.from("motorcycles").select("*").order("created_at", { ascending: false })

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Estadísticas Detalladas</h1>
        <p className="text-muted-foreground mt-2">Análisis profundo del rendimiento comercial y métricas clave</p>
      </div>

      <AnalyticsDashboard motorcycles={motorcycles || []} />
    </div>
  )
}
