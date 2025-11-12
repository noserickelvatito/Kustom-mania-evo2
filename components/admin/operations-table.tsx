"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Filter, TrendingUp, DollarSign } from "lucide-react"
import type { Motorcycle } from "@/lib/types"
import Link from "next/link"

interface OperationsTableProps {
  motorcycles: Motorcycle[]
}

export function OperationsTable({ motorcycles }: OperationsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredMotorcycles = useMemo(() => {
    return motorcycles.filter((moto) => {
      const matchesSearch = moto.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || moto.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [motorcycles, searchTerm, statusFilter])

  // Calculate summary statistics
  const summary = useMemo(() => {
    return filteredMotorcycles.reduce(
      (acc, moto) => {
        const purchasePrice = moto.purchase_price || 0
        const salePrice = moto.sale_price || 0
        const expenses = moto.expenses || 0
        const netProfit = salePrice - purchasePrice - expenses

        return {
          totalPurchase: acc.totalPurchase + purchasePrice,
          totalSale: acc.totalSale + salePrice,
          totalExpenses: acc.totalExpenses + expenses,
          totalProfit: acc.totalProfit + netProfit,
          count: acc.count + 1,
        }
      },
      { totalPurchase: 0, totalSale: 0, totalExpenses: 0, totalProfit: 0, count: 0 },
    )
  }, [filteredMotorcycles])

  const exportToCSV = () => {
    const headers = [
      "Nombre",
      "Estado",
      "Precio Compra",
      "Precio Venta",
      "Gastos",
      "Ganancia Neta",
      "Margen %",
      "Días en Stock",
    ]
    const rows = filteredMotorcycles.map((moto) => {
      const purchasePrice = moto.purchase_price || 0
      const salePrice = moto.sale_price || 0
      const expenses = moto.expenses || 0
      const netProfit = salePrice - purchasePrice - expenses
      const margin = salePrice > 0 ? ((netProfit / salePrice) * 100).toFixed(1) : "0"

      const daysInStock = moto.purchase_date
        ? Math.floor((new Date().getTime() - new Date(moto.purchase_date).getTime()) / (1000 * 60 * 60 * 24))
        : 0

      return [moto.name, moto.status || "stock", purchasePrice, salePrice, expenses, netProfit, margin, daysInStock]
    })

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `operaciones-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const getStatusBadge = (status: string | null) => {
    const statusMap = {
      stock: { label: "En Stock", variant: "default" as const },
      reserved: { label: "Reservada", variant: "secondary" as const },
      sold: { label: "Vendida", variant: "default" as const },
      delivered: { label: "Entregada", variant: "default" as const },
    }
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.stock
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inversión Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.totalPurchase.toLocaleString("es-AR")}</div>
            <p className="text-xs text-muted-foreground">En {summary.count} motos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.totalExpenses.toLocaleString("es-AR")}</div>
            <p className="text-xs text-muted-foreground">Restauración y mejoras</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.totalSale.toLocaleString("es-AR")}</div>
            <p className="text-xs text-muted-foreground">Ventas totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganancia Neta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${summary.totalProfit.toLocaleString("es-AR")}
            </div>
            <p className="text-xs text-muted-foreground">
              Margen:{" "}
              {summary.totalSale > 0 ? ((summary.totalProfit / summary.totalSale) * 100).toFixed(1) : "0"}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Operations Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Tabla de Operaciones</CardTitle>
              <CardDescription>Detalle financiero de cada motocicleta</CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar moto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="stock">En Stock</SelectItem>
                  <SelectItem value="reserved">Reservada</SelectItem>
                  <SelectItem value="sold">Vendida</SelectItem>
                  <SelectItem value="delivered">Entregada</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={exportToCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium text-sm">Moto</th>
                    <th className="text-left p-3 font-medium text-sm">Estado</th>
                    <th className="text-right p-3 font-medium text-sm">Compra</th>
                    <th className="text-right p-3 font-medium text-sm">Venta</th>
                    <th className="text-right p-3 font-medium text-sm">Gastos</th>
                    <th className="text-right p-3 font-medium text-sm">Ganancia</th>
                    <th className="text-right p-3 font-medium text-sm">Margen %</th>
                    <th className="text-right p-3 font-medium text-sm">Días</th>
                    <th className="text-center p-3 font-medium text-sm">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMotorcycles.map((moto) => {
                    const purchasePrice = moto.purchase_price || 0
                    const salePrice = moto.sale_price || 0
                    const expenses = moto.expenses || 0
                    const netProfit = salePrice - purchasePrice - expenses
                    const margin = salePrice > 0 ? ((netProfit / salePrice) * 100).toFixed(1) : "0"

                    const daysInStock = moto.purchase_date
                      ? Math.floor(
                          (new Date().getTime() - new Date(moto.purchase_date).getTime()) / (1000 * 60 * 60 * 24),
                        )
                      : 0

                    return (
                      <tr key={moto.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-medium">{moto.name}</td>
                        <td className="p-3">{getStatusBadge(moto.status)}</td>
                        <td className="p-3 text-right text-sm">${purchasePrice.toLocaleString("es-AR")}</td>
                        <td className="p-3 text-right text-sm">${salePrice.toLocaleString("es-AR")}</td>
                        <td className="p-3 text-right text-sm">${expenses.toLocaleString("es-AR")}</td>
                        <td
                          className={`p-3 text-right font-semibold text-sm ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ${netProfit.toLocaleString("es-AR")}
                        </td>
                        <td className="p-3 text-right font-semibold text-sm">{margin}%</td>
                        <td className="p-3 text-right text-sm text-muted-foreground">{daysInStock}</td>
                        <td className="p-3 text-center">
                          <Link href={`/km-secret-panel-2025/motorcycles/${moto.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {filteredMotorcycles.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">No se encontraron motocicletas</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
