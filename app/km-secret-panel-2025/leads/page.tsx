import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteLeadButton } from "@/components/admin/delete-lead-button"

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
            <p className="text-xs text-gray-400 uppercase tracking-wider">Consultas de WhatsApp</p>
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#b87333" }}>
            Consultas de WhatsApp
          </h2>
          <p className="text-gray-400">Analiza y gestiona los leads generados</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
              border: "2px solid #b87333",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "#b87333" }}>Total Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{totalLeads}</p>
            </CardContent>
          </Card>

          <Card
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
              border: "2px solid #b87333",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "#b87333" }}>Este Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{leadsThisMonth}</p>
            </CardContent>
          </Card>

          <Card
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
              border: "2px solid #b87333",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "#b87333" }}>Con Moto Específica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{leadsWithMotorcycle}</p>
            </CardContent>
          </Card>
        </div>

        {/* Most Popular Motorcycles */}
        {leadsByMotorcycle && Object.keys(leadsByMotorcycle).length > 0 && (
          <Card
            className="mb-8"
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
              border: "2px solid #b87333",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "#b87333" }}>Motos Más Consultadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(leadsByMotorcycle)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([name, count]) => (
                    <div key={name} className="flex items-center justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-300">{name}</span>
                      <span className="text-[#b87333] font-bold">{count} consultas</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leads List */}
        <Card
          style={{
            background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
            border: "2px solid #b87333",
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: "#b87333" }}>Todas las Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            {leads && leads.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-2 text-[#b87333] text-sm">Fecha</th>
                      <th className="text-left py-3 px-2 text-[#b87333] text-sm">Nombre</th>
                      <th className="text-left py-3 px-2 text-[#b87333] text-sm">Localidad</th>
                      <th className="text-left py-3 px-2 text-[#b87333] text-sm">Moto</th>
                      <th className="text-left py-3 px-2 text-[#b87333] text-sm">Origen</th>
                      <th className="text-left py-3 px-2 text-[#b87333] text-sm">UTM</th>
                      <th className="text-right py-3 px-2 text-[#b87333] text-sm">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-800 hover:bg-black/30">
                        <td className="py-3 px-2 text-gray-400 text-sm">
                          {new Date(lead.created_at).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3 px-2 text-white text-sm">{lead.name}</td>
                        <td className="py-3 px-2 text-gray-400 text-sm">{lead.location}</td>
                        <td className="py-3 px-2 text-gray-400 text-sm">
                          {lead.motorcycle_name || <span className="text-gray-600">Sin especificar</span>}
                        </td>
                        <td className="py-3 px-2 text-gray-400 text-sm">
                          {lead.origin_route || <span className="text-gray-600">-</span>}
                        </td>
                        <td className="py-3 px-2 text-gray-400 text-sm">
                          {lead.utm_source || lead.utm_medium || lead.utm_campaign ? (
                            <div className="text-xs">
                              {lead.utm_source && <div>S: {lead.utm_source}</div>}
                              {lead.utm_medium && <div>M: {lead.utm_medium}</div>}
                              {lead.utm_campaign && <div>C: {lead.utm_campaign}</div>}
                            </div>
                          ) : (
                            <span className="text-gray-600">-</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <DeleteLeadButton leadId={lead.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No hay consultas registradas aún</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
