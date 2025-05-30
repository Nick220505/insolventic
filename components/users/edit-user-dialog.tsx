"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Phone, MapPin, Shield, CreditCard } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface EditUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: any
  onUpdateUser: (userData: any) => void
  roles: any[]
}

export function EditUserDialog({ open, onOpenChange, user, onUpdateUser, roles }: EditUserDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    professionalCard: "",
    status: "Activo",
    permissions: [] as string[],
  })

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || 0,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        role: user.role || "",
        professionalCard: user.professionalCard || "",
        status: user.status || "Activo",
        permissions: Array.isArray(user.permissions) ? user.permissions : [],
      })
    }
  }, [user])

  const handleSubmit = () => {
    const selectedRole = roles.find((r) => r.name === formData.role)
    const userData = {
      ...formData,
      permissions: selectedRole?.permissions || [],
      lastLogin: user?.lastLogin,
      casesAssigned: user?.casesAssigned,
      createdDate: user?.createdDate,
    }

    onUpdateUser(userData)
    onOpenChange(false)

    toast({
      title: "✅ Usuario actualizado exitosamente",
      description: `Los datos de ${userData.name} han sido actualizados.`,
      variant: "default",
    })
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>Modifique la información del usuario {user.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="professionalCard">Tarjeta Profesional</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="professionalCard"
                  value={formData.professionalCard}
                  onChange={(e) => setFormData((prev) => ({ ...prev, professionalCard: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

          {formData.role && (
            <div className="p-4 border rounded-lg bg-green-50">
              <h3 className="font-medium mb-2">Permisos del Rol: {formData.role}</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {roles
                  .find((r) => r.name === formData.role)
                  ?.permissions.map((permission: string, idx: number) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {permission}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="p-4 border rounded-lg bg-blue-50">
            <h3 className="font-medium mb-2">Información del Sistema</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Casos Asignados:</p>
                <p className="font-medium">{user.casesAssigned}</p>
              </div>
              <div>
                <p className="text-gray-600">Último Acceso:</p>
                <p className="font-medium">
                  {user.lastLogin === "Nunca" ? "Nunca" : new Date(user.lastLogin).toLocaleString("es-CO")}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Fecha de Creación:</p>
                <p className="font-medium">{new Date(user.createdDate).toLocaleDateString("es-CO")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar Cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
