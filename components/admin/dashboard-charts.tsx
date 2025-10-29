"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface AnalyticsData {
  id: string
  name: string
  purchase_price: number | null
  sale_price: number | null
  net_margin: number | null
  margin_percentage: number | null
  days_in_stock: number | null
  status: string
}

export function DashboardCharts({ analytics }: { analytics: AnalyticsData[] }) {
  // Prepare data for sold motorcycles
  const soldData = analytics
    .filter((m) => m.sale_price && m.purchase_price)
    .slice(0, 10)
    .map((m) => ({
      name: m.name.length > 15 ? m.name.substring(0, 15) + "..." : m.name,
      compra: m.purchase_price || 0,
      venta: m.sale_price || 0,
      margen: m.net_margin || 0,
    }))

  if (soldData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No hay datos de ventas disponibles
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={soldData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value: number) => `$${value.toLocaleString("es-AR")}`}
        />
        <Legend />
        <Bar dataKey="compra" fill="#ef4444" name="Precio Compra" radius={[4, 4, 0, 0]} />
        <Bar dataKey="venta" fill="#22c55e" name="Precio Venta" radius={[4, 4, 0, 0]} />
        <Bar dataKey="margen" fill="#b87333" name="Margen Neto" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
