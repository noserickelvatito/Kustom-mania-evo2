import { createClient } from "@/lib/supabase/server"
import { OperationsTable } from "@/components/admin/operations-table"

export default async function OperationsPage() {
  const supabase = await createClient()

  const { data: motorcycles } = await supabase.from("motorcycles").select("*").order("created_at", { ascending: false })

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operaciones</h1>
        <p className="text-muted-foreground mt-2">Gestión completa de compras, ventas y márgenes de cada motocicleta</p>
      </div>

      <OperationsTable motorcycles={motorcycles || []} />
    </div>
  )
}
