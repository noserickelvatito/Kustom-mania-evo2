"use client"

import { useState, useEffect } from "react"

interface DollarBlueData {
  compra: number
  venta: number
  casa: string
  nombre: string
  moneda: string
  fechaActualizacion: string
}

export function useDollarBlue() {
  const [data, setData] = useState<DollarBlueData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDollarBlue = async () => {
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares/blue")

      if (!response.ok) {
        throw new Error("Error al obtener el precio del dólar")
      }

      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      console.error("[v0] Error fetching dollar blue:", err)
      setError(err instanceof Error ? err : new Error("Error desconocido"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDollarBlue()
    // Refresh every 5 minutes
    const interval = setInterval(fetchDollarBlue, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const convertToUSD = (arsAmount: number): number => {
    if (!data) return 0
    return arsAmount / data.venta
  }

  const convertToARS = (usdAmount: number): number => {
    if (!data) return 0
    return usdAmount * data.venta
  }

  return {
    data,
    loading,
    error,
    convertToUSD,
    convertToARS,
    refresh: fetchDollarBlue,
  }
}
