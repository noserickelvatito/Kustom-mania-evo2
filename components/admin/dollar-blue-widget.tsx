"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, RefreshCw, TrendingUp, TrendingDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DollarBlueData {
  compra: number
  venta: number
  casa: string
  nombre: string
  moneda: string
  fechaActualizacion: string
}

export function DollarBlueWidget() {
  const [data, setData] = useState<DollarBlueData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()

  const fetchDollarBlue = async () => {
    try {
      setRefreshing(true)
      const response = await fetch("https://dolarapi.com/v1/dolares/blue")

      if (!response.ok) {
        throw new Error("Error al obtener el precio del dólar")
      }

      const result = await response.json()
      setData(result)

      toast({
        title: "Precio actualizado",
        description: "Se actualizó el precio del dólar blue",
      })
    } catch (error) {
      console.error("[v0] Error fetching dollar blue:", error)
      toast({
        title: "Error",
        description: "No se pudo obtener el precio del dólar",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDollarBlue()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Dólar Blue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-600" />
            Dólar Blue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Error al cargar el precio</p>
          <Button onClick={fetchDollarBlue} variant="outline" size="sm" className="mt-4 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Dólar Blue
          </CardTitle>
          <CardDescription className="mt-1">Cotización en tiempo real</CardDescription>
        </div>
        <Button
          onClick={fetchDollarBlue}
          disabled={refreshing}
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Buy Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-blue-600" />
              Compra
            </div>
            <div className="text-3xl font-bold text-blue-600">${data.compra}</div>
          </div>

          {/* Sell Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Venta
            </div>
            <div className="text-3xl font-bold text-green-600">${data.venta}</div>
          </div>
        </div>

        {/* Last Update */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">Última actualización: {formatDate(data.fechaActualizacion)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
