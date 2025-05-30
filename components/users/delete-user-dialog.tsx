"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: any | null
  onDeleteUser: (userId: number) => void
}

export function DeleteUserDialog({ open, onOpenChange, user, onDeleteUser }: DeleteUserDialogProps) {
  const { toast } = useToast()

  if (!user) return null

  const handleDelete = () => {
    onDeleteUser(user.id)
    onOpenChange(false)

    toast({
      title: "🗑️ Usuario eliminado",
      description: `${user.name} ha sido eliminado del sistema.`,
      variant: "destructive",
    })
  }

  const canDelete = user.role !== "Operadora de Insolvencia" && user.casesAssigned === 0

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Operadora de Insolvencia":
        return "bg-red-100 text-red-800"
      case "Abogado":
        return "bg-blue-100 text-blue-800"
      case "Asistente Legal":
        return "bg-green-100 text-green-800"
      case "Secretaria":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Eliminar Usuario</span>
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Información del usuario */}
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              {/* User icon here */}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                <span className="text-xs text-gray-500">{user.casesAssigned} casos asignados</span>
              </div>
            </div>
          </div>

          {/* Advertencias */}
          {!canDelete && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">No se puede eliminar este usuario</h4>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    {user.role === "Operadora de Insolvencia" && (
                      <li>• No se puede eliminar al operador principal del sistema</li>
                    )}
                    {user.casesAssigned > 0 && <li>• El usuario tiene {user.casesAssigned} casos asignados</li>}
                  </ul>
                  <p className="text-sm text-yellow-700 mt-2">Reasigne los casos o cambie el rol antes de eliminar.</p>
                </div>
              </div>
            </div>
          )}

          {canDelete && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Confirmar eliminación</h4>
                  <p className="text-sm text-red-700 mt-1">
                    ¿Está seguro de que desea eliminar a <strong>{user.name}</strong>? Esta acción eliminará
                    permanentemente:
                  </p>
                  <ul className="text-sm text-red-700 mt-2 space-y-1">
                    <li>• Toda la información del usuario</li>
                    <li>• Historial de actividad</li>
                    <li>• Permisos y configuraciones</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={!canDelete}>
            Eliminar Usuario
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
