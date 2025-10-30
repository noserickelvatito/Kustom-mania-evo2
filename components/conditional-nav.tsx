"use client"

import { usePathname } from "next/navigation"
import { MobileNav } from "./mobile-nav"

export function ConditionalNav() {
  const pathname = usePathname()

  if (pathname.startsWith("/km-secret-panel-2025")) {
    return null
  }

  return <MobileNav />
}
