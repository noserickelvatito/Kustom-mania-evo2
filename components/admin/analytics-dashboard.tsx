"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { Motorcycle } from "@/lib/types"
import { DollarSign, Package, Clock, Percent } from "lucide-react"

interface AnalyticsDashboardProps {
  motorcycles: Motorcycle[]
}

export function AnalyticsDashboard({ motorcycles }: AnalyticsDashboardProps) {
  const analytics = useMemo(() => {
    const sold = motorcycles.filter((m) => m.status === "sold" || m.status === "delivered")
    const inStock = motorcycles.filter((m) => m.status === "stock")

    const totalRevenue = sold.reduce((sum, m) => sum + (m.sale_price || 0), 0)
    const totalCost = sold.reduce((sum, m) => sum + (m.purchase_price || 0) + (m.expenses || 0), 0)
    const totalProfit = totalRevenue - totalCost
    const avgMargin =
      sold.length > 0
        ? sold.reduce((sum, m) => {
            const profit = (m.sale_price || 0) - (m.purchase_price || 0) - (m.expenses || 0)
            return sum + (m.sale_price ? (profit / m.sale_price) * 100 : 0)
          }, 0) / sold.length
        : 0

    const avgDaysToSell =
      sold
        .filter((m) => m.purchase_date && m.sale_date)
        .reduce((sum, m) => {
          const days = Math.floor(
            (new Date(m.sale_date!).getTime() - new Date(m.purchase_date!).getTime()) / (1000 * 60 * 60 * 24),
          )
          return sum + days
        }, 0) / sold.filter((m) => m.purchase_date && m.sale_date).length || 0

    const statusDistribution = [
      { name: "En Stock", value: motorcycles.filter((m) => m.status === "stock").length, color: "#3b82f6" },
      { name: "Reservada", value: motorcycles.filter((m) => m.status === "reserved").length, color: "#eab308" },
      { name: "Vendida", value: motorcycles.filter((m) => m.status === "sold").length, color: "#22c55e" },
      { name: "Entregada", value: motorcycles.filter((m) => m.status === "delivered").length, color: "#a855f7" },
    ]

    const monthlyData = sold
      .filter((m) => m.sale_date)
      .reduce(
        (acc, m) => {
          const month = new Date(m.sale_date!).toLocaleDateString("es-AR", { month: "short", year: "numeric" })
          if (!acc[month]) {
            acc[month] = { month, ventas: 0, ganancia: 0 }
          }
          acc[month].ventas += 1
          acc[month].ganancia += (m.sale_price || 0) - (m.purchase_price || 0) - (m.expenses || 0)
          return acc
        },
        {} as Record<string, { month: string; ventas: number; ganancia: number }>,
      )

    const monthlyChartData = Object.values(monthlyData).slice(-6)

    const topPerformers = sold
      .map((m) => ({
        name: m.name,
        profit: (m.sale_price || 0) - (m.purchase_price || 0) - (m.expenses || 0),
        margin: m.sale_price ? ((m.sale_price - (m.purchase_price || 0) - (m.expenses || 0)) / m.sale_price) * 100 : 0,
      }))
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 5)

    return {
      totalRevenue,
      totalProfit,
      avgMargin,
      avgDaysToSell,
      soldCount: sold.length,
      inStockCount: inStock.length,
      statusDistribution,
      monthlyChartData,
      topPerformers,
    }
  }, [motorcycles])

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ganancia Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${analytics.totalProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">De {analytics.soldCount} motos vendidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Margen Promedio</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#b87333]">{analytics.avgMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Rentabilidad promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Días Promedio Venta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analytics.avgDaysToSell)} días</div>
            <p className="text-xs text-muted-foreground mt-1">Tiempo en stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">En Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.inStockCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Motos disponibles</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventas y Ganancias Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#b87333" name="Ventas" />
                <Bar dataKey="ganancia" fill="#22c55e" name="Ganancia (ARS)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Motos Más Rentables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topPerformers.map((moto, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#b87333] text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{moto.name}</p>
                    <p className="text-sm text-muted-foreground">Margen: {moto.margin.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-500">${moto.profit.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Ganancia</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
