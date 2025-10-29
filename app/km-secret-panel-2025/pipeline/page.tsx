import { createClient } from "@/lib/supabase/server"
import { SalesPipeline } from "@/components/admin/sales-pipeline"

export default async function PipelinePage() {
  const supabase = await createClient()

  const { data: motorcycles } = await supabase.from("motorcycles").select("*").order("created_at", { ascending: false })

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pipeline de Ventas</h1>
        <p className="text-muted-foreground mt-2">
          Visualiza y gestiona el estado de cada motocicleta en el proceso de venta
        </p>
      </div>

      <SalesPipeline motorcycles={motorcycles || []} />
    </div>
  )
}
