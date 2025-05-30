"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Phone, MapPin, Shield, CreditCard } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateUser: (userData: any) => void
  roles: any[]
}

export function CreateUserDialog({ open, onOpenChange, onCreateUser, roles }: CreateUserDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    professionalCard: "",
    password: "",
    confirmPassword: "",
    status: "Activo",
    sendWelcomeEmail: true,
    permissions: [] as string[],
  })

  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio"
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio"
    if (!formData.email.includes("@")) newErrors.email = "Email inválido"
    if (!formData.role) newErrors.role = "El rol es obligatorio"
    if (!formData.password) newErrors.password = "La contraseña es obligatoria"
    if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const selectedRole = roles.find((r) => r.name === formData.role)
    const userData = {
      ...formData,
      permissions: selectedRole?.permissions || [],
    }

    onCreateUser(userData)
    onOpenChange(false)

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "",
      professionalCard: "",
      password: "",
      confirmPassword: "",
      status: "Activo",
      sendWelcomeEmail: true,
      permissions: [],
    })
    setErrors({})

    toast({
      title: "✅ Usuario creado exitosamente",
      description: `${userData.name} ha sido agregado como ${userData.role}.`,
      variant: "default",
    })
  }

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase()
    setFormData((prev) => ({ ...prev, password, confirmPassword: password }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Usuario</DialogTitle>
          <DialogDescription>Complete la información para crear un nuevo usuario en el sistema</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                />
              </div>
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@constructoresdepaz.com.co"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  placeholder="+57 300 123 4567"
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
                  placeholder="123.456"
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
                placeholder="Dirección completa"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rol *</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
              >
                <SelectTrigger className={`pl-10 ${errors.role ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Seleccionar rol" />
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
            {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
            <h3 className="font-medium">Configuración de Acceso</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repetir contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <Button onClick={generatePassword} variant="outline" size="sm">
              Generar Contraseña Automática
            </Button>

            <div className="flex items-center space-x-2">
              <Switch
                id="sendWelcomeEmail"
                checked={formData.sendWelcomeEmail}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, sendWelcomeEmail: checked }))}
              />
              <Label htmlFor="sendWelcomeEmail">Enviar email de bienvenida con credenciales</Label>
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
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Crear Usuario</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
