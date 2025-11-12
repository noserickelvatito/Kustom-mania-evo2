"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "next-themes"
import {
  LayoutDashboard,
  Bike,
  DollarSign,
  TrendingUp,
  MessageSquare,
  ImageIcon,
  Settings,
  Moon,
  Sun,
  ExternalLink,
  BarChart3,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/km-secret-panel-2025", icon: LayoutDashboard, group: "Principal" },
  { name: "Operaciones", href: "/km-secret-panel-2025/operations", icon: DollarSign, group: "Gestión" },
  { name: "Pipeline de Ventas", href: "/km-secret-panel-2025/pipeline", icon: TrendingUp, group: "Gestión" },
  { name: "Gestionar Motos", href: "/km-secret-panel-2025/motorcycles", icon: Bike, group: "Gestión" },
  { name: "Estadísticas", href: "/km-secret-panel-2025/analytics", icon: BarChart3, group: "Análisis" },
  { name: "Consultas", href: "/km-secret-panel-2025/leads", icon: MessageSquare, group: "Análisis" },
  { name: "Imágenes", href: "/km-secret-panel-2025/images", icon: ImageIcon, group: "Contenido" },
  { name: "Configuración", href: "/km-secret-panel-2025/config", icon: Settings, group: "Sistema" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const groupedNav = navigation.reduce(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = []
      acc[item.group].push(item)
      return acc
    },
    {} as Record<string, typeof navigation>,
  )

  return (
    <div className="flex flex-col w-64 border-r bg-card">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-black tracking-wider text-[#b87333]">KUSTOM MANIA</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Panel Admin</p>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-4">
          {Object.entries(groupedNav).map(([group, items]) => (
            <div key={group}>
              <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group}
              </h4>
              <div className="space-y-1">
                {items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3",
                          isActive && "bg-[#b87333]/10 text-[#b87333] hover:bg-[#b87333]/20",
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm">{item.name}</span>
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-3"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="text-sm">{theme === "dark" ? "Modo Claro" : "Modo Oscuro"}</span>
        </Button>

        <Link href="/" target="_blank">
          <Button variant="outline" size="sm" className="w-full justify-start gap-3">
            <ExternalLink className="h-4 w-4" />
            <span className="text-sm">Ver Sitio</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
