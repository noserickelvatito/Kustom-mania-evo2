"use client"

import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { MessageSquare } from "lucide-react"

interface Lead {
  id: string
  name: string
  motorcycle_name: string | null
  created_at: string
}

export function RecentActivity({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return <div className="text-sm text-muted-foreground">No hay actividad reciente</div>
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <div key={lead.id} className="flex items-start gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500/10">
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {lead.name} consultó por {lead.motorcycle_name || "una moto"}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(lead.created_at), {
                addSuffix: true,
                locale: es,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
