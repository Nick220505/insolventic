"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Trash2, AlertTriangle, Building } from "lucide-react"

interface DeleteCreditorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creditor: any
  onCreditorDeleted?: (creditorId: number) => void
}

export function DeleteCreditorDialog({ open, onOpenChange, creditor, onCreditorDeleted }: DeleteCreditorDialogProps) {
  if (!creditor) return null

  const handleDelete = () => {
    console.log("Deleting creditor:", creditor.id)
    onCreditorDeleted?.(creditor.id)
    onOpenChange(false)
  }

  const hasActiveCases = creditor.activeCases > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <Trash2 className="h-5 w-5 mr-2" />
            Eliminar Acreedor
          </DialogTitle>
          <DialogDescription>Esta acción no se puede deshacer</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Building className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium">{creditor.name}</p>
                <p className="text-sm text-gray-600">{creditor.nit}</p>
                <Badge variant="outline" className="mt-1">
                  {creditor.type}
                </Badge>
              </div>
            </div>
          </div>

          {hasActiveCases && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Advertencia:</strong> Este acreedor tiene {creditor.activeCases} caso(s) activo(s). Al
                eliminarlo, estos casos podrían verse afectados.
              </AlertDescription>
            </Alert>
          )}

          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>¿Está seguro?</strong> Esta acción eliminará permanentemente toda la información del acreedor,
              incluyendo su historial y documentos asociados.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar Acreedor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
