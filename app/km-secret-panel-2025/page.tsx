import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Package, AlertCircle, Clock } from "lucide-react"
import { DashboardCharts } from "@/components/admin/dashboard-charts"
import { RecentActivity } from "@/components/admin/recent-activity"
import { TopMotorcycles } from "@/components/admin/top-motorcycles"
import { DollarBlueWidget } from "@/components/admin/dollar-blue-widget"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: analytics } = await supabase.from("motorcycle_analytics").select("*")

  const { data: motorcycles } = await supabase.from("motorcycles").select("*").order("created_at", { ascending: false })

  const { data: leads } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(10)

  // Calculate key metrics
  const totalMotorcycles = motorcycles?.length || 0
  const inStock = motorcycles?.filter((m) => m.status === "stock" || m.status === "published").length || 0
  const sold = motorcycles?.filter((m) => m.status === "sold" || m.status === "delivered").length || 0

  // Calculate financial metrics
  const totalRevenue =
    analytics?.reduce((sum, m) => {
      return sum + (m.sale_price || 0)
    }, 0) || 0

  const totalCosts =
    analytics?.reduce((sum, m) => {
      return sum + (m.purchase_price || 0) + (m.expenses || 0)
    }, 0) || 0

  const netProfit = totalRevenue - totalCosts
  const grossProfit = analytics?.reduce((sum, m) => sum + (m.net_margin || 0), 0) || 0

  // Calculate average margin
  const soldMotorcycles = analytics?.filter((m) => m.sale_price && m.purchase_price) || []
  const avgMargin =
    soldMotorcycles.length > 0
      ? soldMotorcycles.reduce((sum, m) => sum + (m.margin_percentage || 0), 0) / soldMotorcycles.length
      : 0

  // Calculate average days in stock
  const avgDaysInStock =
    soldMotorcycles.length > 0
      ? soldMotorcycles.reduce((sum, m) => sum + (m.days_in_stock || 0), 0) / soldMotorcycles.length
      : 0

  // Find motorcycles with alerts (low margin or slow rotation)
  const alerts =
    analytics?.filter((m) => {
      const lowMargin = m.margin_percentage !== null && m.margin_percentage < 15
      const slowRotation = m.days_in_stock !== null && m.days_in_stock > 90 && m.status !== "sold"
      return lowMargin || slowRotation
    }) || []

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Resumen de tu negocio y métricas clave</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <DollarBlueWidget />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganancia Neta</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${netProfit.toLocaleString("es-AR")}</div>
            <p className="text-xs text-muted-foreground">Ingresos - Costos totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margen Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{avgMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">En motos vendidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStock}</div>
            <p className="text-xs text-muted-foreground">De {totalMotorcycles} motos totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Días Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDaysInStock.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Tiempo hasta venta</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card className="border-orange-500/50 bg-orange-500/5 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <AlertCircle className="h-5 w-5" />
              Alertas ({alerts.length})
            </CardTitle>
            <CardDescription>Motos que requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.slice(0, 5).map((moto) => (
                <div
                  key={moto.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background border hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-medium">{moto.name}</p>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm">
                      {moto.margin_percentage !== null && moto.margin_percentage < 15 && (
                        <span className="text-orange-600 dark:text-orange-400 flex items-center gap-1">
                          ⚠️ Margen bajo: {moto.margin_percentage.toFixed(1)}%
                        </span>
                      )}
                      {moto.days_in_stock !== null && moto.days_in_stock > 90 && moto.status !== "sold" && (
                        <span className="text-orange-600 dark:text-orange-400 flex items-center gap-1">
                          🐌 Rotación lenta: {moto.days_in_stock} días
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts and Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Análisis de Ventas</CardTitle>
            <CardDescription>Evolución de ventas y márgenes</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardCharts analytics={analytics || []} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Motos</CardTitle>
            <CardDescription>Más rentables y con mejor rotación</CardDescription>
          </CardHeader>
          <CardContent>
            <TopMotorcycles analytics={analytics || []} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas consultas y movimientos</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentActivity leads={leads || []} />
        </CardContent>
      </Card>
    </div>
  )
}
