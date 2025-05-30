"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Shield, CreditCard, Calendar, Clock, Key, Power } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface UserDetails {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
  casesAssigned: number
  permissions: string[]
  professionalCard: string
  phone: string
  address: string
  createdDate: string
}

interface UserDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserDetails | null
  onToggleStatus: (userId: number) => void
  onResetPassword: (user: UserDetails) => void
}

export function UserDetailsDialog({
  open,
  onOpenChange,
  user,
  onToggleStatus,
  onResetPassword,
}: UserDetailsDialogProps) {
  const { toast } = useToast()

  if (!user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800"
      case "Inactivo":
        return "bg-red-100 text-red-800"
      case "Suspendido":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  const handleToggleStatus = () => {
    onToggleStatus(user.id)
    toast({
      title: user.status === "Activo" ? "⛔ Usuario desactivado" : "✅ Usuario activado",
      description: `${user.name} ahora está ${user.status === "Activo" ? "inactivo" : "activo"}.`,
    })
  }

  const handleResetPassword = () => {
    onResetPassword(user)
    toast({
      title: "🔑 Contraseña restablecida",
      description: `Nueva contraseña temporal enviada por email a ${user.email}.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Usuario</DialogTitle>
          <DialogDescription>Información completa de {user.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header con información básica */}
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Power className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Información de Contacto</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Correo Electrónico</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium">{user.phone || "No especificado"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Dirección</p>
                  <p className="font-medium">{user.address || "No especificada"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Tarjeta Profesional</p>
                  <p className="font-medium">{user.professionalCard}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Información profesional */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Información Profesional</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Rol</p>
                  <p className="font-medium">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Casos Asignados</p>
                  <p className="font-medium">{user.casesAssigned}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Último Acceso</p>
                  <p className="font-medium">
                    {user.lastLogin === "Nunca" ? "Nunca" : new Date(user.lastLogin).toLocaleString("es-CO")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Permisos */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Permisos del Usuario</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {user.permissions.map((permission, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Información del sistema */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Información del Sistema</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Fecha de Creación</p>
                <p className="font-medium">{new Date(user.createdDate).toLocaleDateString("es-CO")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado de la Cuenta</p>
                <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap gap-2 pt-4">
            <Button variant="outline" onClick={handleToggleStatus} disabled={user.role === "Operadora de Insolvencia"}>
              <Power className="h-4 w-4 mr-2" />
              {user.status === "Activo" ? "Desactivar" : "Activar"} Usuario
            </Button>
            <Button variant="outline" onClick={handleResetPassword}>
              <Key className="h-4 w-4 mr-2" />
              Restablecer Contraseña
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
