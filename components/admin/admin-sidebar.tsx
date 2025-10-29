"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  { name: "Dashboard", href: "/km-secret-panel-2025", icon: LayoutDashboard },
  { name: "Operaciones", href: "/km-secret-panel-2025/operations", icon: DollarSign },
  { name: "Pipeline de Ventas", href: "/km-secret-panel-2025/pipeline", icon: TrendingUp },
  { name: "Gestionar Motos", href: "/km-secret-panel-2025/motorcycles", icon: Bike },
  { name: "Estadísticas", href: "/km-secret-panel-2025/analytics", icon: BarChart3 },
  { name: "Consultas", href: "/km-secret-panel-2025/leads", icon: MessageSquare },
  { name: "Imágenes", href: "/km-secret-panel-2025/images", icon: ImageIcon },
  { name: "Configuración", href: "/km-secret-panel-2025/config", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col w-64 border-r bg-card">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-black tracking-wider text-[#b87333]">KUSTOM MANIA</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Panel Admin</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
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
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 bg-transparent"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
        </Button>

        <Link href="/" target="_blank">
          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <ExternalLink className="h-5 w-5" />
            Ver Sitio
          </Button>
        </Link>
      </div>
    </div>
  )
}
