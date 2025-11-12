import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DeleteLeadButton } from "@/components/admin/delete-lead-button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Target } from "lucide-react"

export default async function LeadsAdminPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

  // Get statistics
  const totalLeads = leads?.length || 0
  const leadsWithMotorcycle = leads?.filter((lead) => lead.motorcycle_id).length || 0
  const leadsThisMonth =
    leads?.filter((lead) => {
      const leadDate = new Date(lead.created_at)
      const now = new Date()
      return leadDate.getMonth() === now.getMonth() && leadDate.getFullYear() === now.getFullYear()
    }).length || 0

  // Group by motorcycle
  const leadsByMotorcycle = leads?.reduce(
    (acc, lead) => {
      if (lead.motorcycle_name) {
        acc[lead.motorcycle_name] = (acc[lead.motorcycle_name] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Consultas de WhatsApp</h1>
        <p className="text-muted-foreground">Analiza y gestiona los leads generados</p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">Todas las consultas recibidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              {leadsThisMonth > 0 && totalLeads > 0
                ? `${((leadsThisMonth / totalLeads) * 100).toFixed(0)}% del total`
                : "Sin consultas este mes"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Moto Específica</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadsWithMotorcycle}</div>
            <p className="text-xs text-muted-foreground">
              {leadsWithMotorcycle > 0 && totalLeads > 0
                ? `${((leadsWithMotorcycle / totalLeads) * 100).toFixed(0)}% del total`
                : "Sin consultas específicas"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Most Popular Motorcycles */}
      {leadsByMotorcycle && Object.keys(leadsByMotorcycle).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Motos Más Consultadas</CardTitle>
            <CardDescription>Top 5 motocicletas con más interés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(leadsByMotorcycle)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([name, count]) => (
                  <div key={name} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="font-medium">{name}</span>
                    <Badge variant="secondary">{count} consultas</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leads List */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Consultas</CardTitle>
          <CardDescription>Historial completo de consultas recibidas por WhatsApp</CardDescription>
        </CardHeader>
        <CardContent>
          {leads && leads.length > 0 ? (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-3 px-4 text-sm font-medium">Fecha</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Nombre</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Localidad</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Moto</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Origen</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">UTM</th>
                      <th className="text-right py-3 px-4 text-sm font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-sm">
                          {new Date(lead.created_at).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">{lead.name}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{lead.location}</td>
                        <td className="py-3 px-4 text-sm">
                          {lead.motorcycle_name ? (
                            <Badge variant="outline">{lead.motorcycle_name}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">Sin especificar</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {lead.origin_route || <span className="text-xs">-</span>}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {lead.utm_source || lead.utm_medium || lead.utm_campaign ? (
                            <div className="text-xs space-y-0.5">
                              {lead.utm_source && <div>S: {lead.utm_source}</div>}
                              {lead.utm_medium && <div>M: {lead.utm_medium}</div>}
                              {lead.utm_campaign && <div>C: {lead.utm_campaign}</div>}
                            </div>
                          ) : (
                            <span className="text-xs">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DeleteLeadButton leadId={lead.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay consultas registradas aún</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
