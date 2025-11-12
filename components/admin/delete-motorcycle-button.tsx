"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, Trash2 } from "lucide-react"

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
    const loadingToast = toast.loading("Eliminando motocicleta...")

    try {
      const supabase = createClient()
      const { error } = await supabase.from("motorcycles").delete().eq("id", motorcycleId)

      if (error) throw error

      toast.success("Motocicleta eliminada exitosamente", {
        id: loadingToast,
      })
      router.refresh()
    } catch (err) {
      console.error("[v0] Error deleting motorcycle:", err)
      toast.error("Error al eliminar la motocicleta", {
        id: loadingToast,
        description: "Por favor, intenta nuevamente",
      })
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
      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
    >
      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}
