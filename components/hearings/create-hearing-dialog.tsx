"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Video, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreateHearingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateHearingDialog({ open, onOpenChange }: CreateHearingDialogProps) {
  const [formData, setFormData] = useState({
    caseId: "",
    hearingType: "",
    date: "",
    time: "",
    zoomId: "",
    zoomPassword: "",
    notes: "",
    operator: "Beatriz Helena Malavera",
  })

  const { toast } = useToast()

  const cases = [
    { id: "INS-2025-001", debtorName: "María González Pérez", type: "Insolvencia" },
    { id: "CON-2025-002", debtorName: "Carlos Rodríguez Silva", type: "Conciliación" },
    { id: "ACU-2025-003", debtorName: "Ana Martínez López", type: "Acuerdo de Apoyo" },
  ]

  const hearingTypes = [
    "Negociación de Deudas",
    "Conciliación",
    "Seguimiento de Acuerdo",
    "Reforma de Acuerdo",
    "Calificación y Graduación",
  ]

  const generateZoomCredentials = () => {
    const zoomId = Math.floor(Math.random() * 900000000) + 100000000
    const password = Math.random().toString(36).substring(2, 8)

    setFormData((prev) => ({
      ...prev,
      zoomId: zoomId.toString().replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"),
      zoomPassword: password,
    }))

    toast({
      title: "🎥 Credenciales generadas",
      description: "Se han generado las credenciales de Zoom automáticamente.",
    })
  }

  const handleSubmit = () => {
    if (!formData.caseId || !formData.hearingType || !formData.date || !formData.time) {
      toast({
        title: "❌ Campos incompletos",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    console.log("Creando audiencia:", formData)

    toast({
      title: "✅ Audiencia programada",
      description: `Audiencia para el caso ${formData.caseId} programada exitosamente.`,
    })

    onOpenChange(false)

    // Reset form
    setFormData({
      caseId: "",
      hearingType: "",
      date: "",
      time: "",
      zoomId: "",
      zoomPassword: "",
      notes: "",
      operator: "Beatriz Helena Malavera",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Programar Nueva Audiencia</DialogTitle>
          <DialogDescription>Configure los detalles para programar una nueva audiencia virtual</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="caseId">Caso *</Label>
              <Select
                value={formData.caseId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, caseId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar caso" />
                </SelectTrigger>
                <SelectContent>
                  {cases.map((case_) => (
                    <SelectItem key={case_.id} value={case_.id}>
                      {case_.id} - {case_.debtorName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hearingType">Tipo de Audiencia *</Label>
              <Select
                value={formData.hearingType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, hearingType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {hearingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">Configuración Zoom</h3>
              </div>
              <Button onClick={generateZoomCredentials} variant="outline" size="sm">
                Generar Credenciales
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zoomId">ID de Reunión</Label>
                <Input
                  id="zoomId"
                  placeholder="123 456 7890"
                  value={formData.zoomId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, zoomId: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zoomPassword">Código de Acceso</Label>
                <Input
                  id="zoomPassword"
                  placeholder="password123"
                  value={formData.zoomPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, zoomPassword: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="operator">Operador Asignado</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="operator"
                value={formData.operator}
                onChange={(e) => setFormData((prev) => ({ ...prev, operator: e.target.value }))}
                className="pl-10"
                readOnly
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Observaciones o instrucciones especiales para la audiencia..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Programar Audiencia</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
