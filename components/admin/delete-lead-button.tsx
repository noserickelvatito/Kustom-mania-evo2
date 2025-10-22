"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

interface DeleteLeadButtonProps {
  leadId: string
}

export function DeleteLeadButton({ leadId }: DeleteLeadButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar esta consulta?")) {
      return
    }

    setIsDeleting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("leads").delete().eq("id", leadId)

      if (error) throw error

      router.refresh()
    } catch (err) {
      console.error("[v0] Error deleting lead:", err)
      alert("Error al eliminar la consulta")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="ghost"
      size="sm"
      className="text-red-500 hover:text-red-400 hover:bg-red-900/20"
    >
      {isDeleting ? "..." : "Eliminar"}
    </Button>
  )
}
