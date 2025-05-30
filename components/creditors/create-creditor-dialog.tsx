"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface CreateCreditorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreditorCreated?: (creditor: any) => void
}

export function CreateCreditorDialog({ open, onOpenChange, onCreditorCreated }: CreateCreditorDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    nit: "",
    email: "",
    phone: "",
    address: "",
    totalDebt: 0,
    activeCases: 0,
    status: "Activo",
    representative: "",
  })

  const { toast } = useToast()

  const creditorTypes = [
    "Entidad Financiera",
    "Cooperativa",
    "Financiera",
    "Fondo de Empleados",
    "Empresa de Servicios Públicos",
    "Entidad Gubernamental",
    "Proveedor",
    "Otro",
  ]

  const handleSubmit = () => {
    const newCreditor = {
      id: Date.now(),
      ...formData,
      createdDate: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
    }

    console.log("Creating creditor:", newCreditor)
    onCreditorCreated?.(newCreditor)
    onOpenChange(false)

    toast({
      title: "✅ Acreedor creado",
      description: `${formData.name} ha sido agregado exitosamente.`,
    })

    // Reset form
    setFormData({
      name: "",
      type: "",
      nit: "",
      email: "",
      phone: "",
      address: "",
      totalDebt: 0,
      activeCases: 0,
      status: "Activo",
      representative: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Acreedor</DialogTitle>
          <DialogDescription>Ingrese la información del nuevo acreedor.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nombre del acreedor"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {creditorTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT</Label>
            <Input
              id="nit"
              value={formData.nit}
              onChange={(e) => setFormData((prev) => ({ ...prev, nit: e.target.value }))}
              placeholder="123.456.789-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="representative">Representante</Label>
            <Input
              id="representative"
              value={formData.representative}
              onChange={(e) => setFormData((prev) => ({ ...prev, representative: e.target.value }))}
              placeholder="Nombre del representante"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="contacto@acreedor.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+57 1 234-5678"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="Dirección completa"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalDebt">Deuda Total</Label>
              <Input
                id="totalDebt"
                type="number"
                value={formData.totalDebt}
                onChange={(e) => setFormData((prev) => ({ ...prev, totalDebt: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activeCases">Casos Activos</Label>
              <Input
                id="activeCases"
                type="number"
                value={formData.activeCases}
                onChange={(e) => setFormData((prev) => ({ ...prev, activeCases: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
                <SelectItem value="Suspendido">Suspendido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Crear</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
