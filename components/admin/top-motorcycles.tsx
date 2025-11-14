"use client"

import { TrendingUp, Clock } from "lucide-react"

interface AnalyticsData {
  id: string
  name: string
  net_margin: number | null
  margin_percentage: number | null
  days_in_stock: number | null
  status: string
}

export function TopMotorcycles({ analytics }: { analytics: AnalyticsData[] }) {
  // Get top 5 by margin
  const topByMargin = [...analytics]
    .filter((m) => m.net_margin !== null && m.net_margin > 0)
    .sort((a, b) => (b.net_margin || 0) - (a.net_margin || 0))
    .slice(0, 5)

  if (topByMargin.length === 0) {
    return <div className="text-sm text-muted-foreground">No hay datos disponibles</div>
  }

  return (
    <div className="space-y-4">
      {topByMargin.map((moto, index) => (
        <div key={moto.id} className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#b87333]/10 text-[#b87333] font-bold">
            {index + 1}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{moto.name}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>{moto.margin_percentage?.toFixed(1)}% margen</span>
              {moto.days_in_stock !== null && (
                <>
                  <Clock className="h-3 w-3 ml-2" />
                  <span>{moto.days_in_stock} días</span>
                </>
              )}
            </div>
          </div>
          <div className="text-sm font-bold text-green-600">${moto.net_margin?.toLocaleString("es-AR")}</div>
        </div>
      ))}
    </div>
  )
}
