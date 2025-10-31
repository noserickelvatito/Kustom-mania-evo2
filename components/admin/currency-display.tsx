"use client"

import { useDollarBlue } from "@/hooks/use-dollar-blue"
import { Skeleton } from "@/components/ui/skeleton"

interface CurrencyDisplayProps {
  amountARS?: number | null
  amountUSD?: number | null
  showBoth?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export function CurrencyDisplay({
  amountARS,
  amountUSD,
  showBoth = true,
  className = "",
  size = "md",
}: CurrencyDisplayProps) {
  const { data: dollarData, loading, convertToUSD, convertToARS } = useDollarBlue()

  if (loading) {
    return <Skeleton className={`h-6 w-24 ${className}`} />
  }

  // Determine which amount to display
  const arsValue = amountARS ?? (amountUSD ? convertToARS(amountUSD) : 0)
  const usdValue = amountUSD ?? (amountARS ? convertToUSD(amountARS) : 0)

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg font-semibold",
  }

  if (showBoth) {
    return (
      <div className={`flex flex-col gap-0.5 ${className}`}>
        <div className={`${sizeClasses[size]} font-bold text-green-600`}>
          USD ${usdValue.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </div>
        <div className={`text-xs text-muted-foreground`}>
          ARS ${arsValue.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </div>
      </div>
    )
  }

  // Show only USD as primary
  return (
    <div className={`${sizeClasses[size]} font-bold text-green-600 ${className}`}>
      USD ${usdValue.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
    </div>
  )
}
