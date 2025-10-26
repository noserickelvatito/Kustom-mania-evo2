import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
      <Link href="/" className="flex items-center gap-1 text-gray-400 hover:text-[#b87333] transition-colors">
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Inicio</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-600" />
          {item.href ? (
            <Link href={item.href} className="text-gray-400 hover:text-[#b87333] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#b87333] font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
