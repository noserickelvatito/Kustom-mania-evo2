"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Motorcycle } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface SalesPipelineProps {
  motorcycles: Motorcycle[]
}

const stages = [
  { id: "stock", label: "En Stock", color: "bg-blue-500" },
  { id: "reserved", label: "Reservada", color: "bg-yellow-500" },
  { id: "sold", label: "Vendida", color: "bg-green-500" },
  { id: "delivered", label: "Entregada", color: "bg-purple-500" },
]

export function SalesPipeline({ motorcycles: initialMotorcycles }: SalesPipelineProps) {
  const [motorcycles, setMotorcycles] = useState(initialMotorcycles)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const router = useRouter()

  const updateStatus = async (motorcycleId: string, newStatus: string) => {
    setIsUpdating(motorcycleId)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("motorcycles").update({ status: newStatus }).eq("id", motorcycleId)

      if (error) throw error

      setMotorcycles((prev) =>
        prev.map((moto) => (moto.id === motorcycleId ? { ...moto, status: newStatus as any } : moto)),
      )
      router.refresh()
    } catch (error) {
      console.error("[v0] Error updating status:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  const getMotorcyclesByStage = (stageId: string) => {
    return motorcycles.filter((moto) => (moto.status || "stock") === stageId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stages.map((stage) => {
        const stageMotorcycles = getMotorcyclesByStage(stage.id)
        const totalValue = stageMotorcycles.reduce((sum, moto) => sum + (moto.price || 0), 0)

        return (
          <Card key={stage.id} className="flex flex-col">
            <CardHeader className={`${stage.color} text-white`}>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{stage.label}</span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {stageMotorcycles.length}
                </Badge>
              </CardTitle>
              <p className="text-sm opacity-90">Total: ${totalValue.toLocaleString()}</p>
            </CardHeader>

            <CardContent className="flex-1 p-4 space-y-3">
              {stageMotorcycles.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No hay motos en esta etapa</p>
              ) : (
                stageMotorcycles.map((moto) => (
                  <Card key={moto.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">{moto.name}</h4>

                      <div className="text-xs space-y-1 text-muted-foreground">
                        {moto.price && <p>Precio: ${moto.price.toLocaleString()}</p>}
                        {moto.purchase_date && <p>Compra: {new Date(moto.purchase_date).toLocaleDateString()}</p>}
                        {moto.purchase_price && moto.sale_price && (
                          <p className="text-green-600 font-semibold">
                            Ganancia: ${(moto.sale_price - moto.purchase_price - (moto.expenses || 0)).toLocaleString()}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/km-secret-panel-2025/motorcycles/${moto.id}/edit`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Editar
                          </Button>
                        </Link>

                        {stage.id !== "delivered" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="flex-1"
                            disabled={isUpdating === moto.id}
                            onClick={() => {
                              const currentIndex = stages.findIndex((s) => s.id === stage.id)
                              const nextStage = stages[currentIndex + 1]
                              if (nextStage) {
                                updateStatus(moto.id, nextStage.id)
                              }
                            }}
                          >
                            {isUpdating === moto.id ? "..." : "→"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
