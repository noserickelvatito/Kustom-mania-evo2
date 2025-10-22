"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

interface DeleteMotorcycleButtonProps {
  motorcycleId: string
  motorcycleName: string
}

export function DeleteMotorcycleButton({ motorcycleId, motorcycleName }: DeleteMotorcycleButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar "${motorcycleName}"? Esta acción no se puede deshacer.`)) {
      return
    }

    setIsDeleting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("motorcycles").delete().eq("id", motorcycleId)

      if (error) throw error

      router.refresh()
    } catch (err) {
      console.error("[v0] Error deleting motorcycle:", err)
      alert("Error al eliminar la motocicleta")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="outline"
      size="sm"
      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
    >
      {isDeleting ? "..." : "Eliminar"}
    </Button>
  )
}
