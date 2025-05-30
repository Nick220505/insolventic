"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Shield, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Role {
  name: string
  description: string
  permissions: string[]
  color: string
  users: number
}

interface RoleManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roles: Role[]
}

export function RoleManagementDialog({ open, onOpenChange, roles }: RoleManagementDialogProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("view")
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
    color: "bg-gray-100 text-gray-800",
  })

  const availablePermissions = [
    "Crear casos",
    "Editar casos",
    "Eliminar casos",
    "Ver casos",
    "Generar documentos",
    "Subir documentos",
    "Programar audiencias",
    "Gestionar acreedores",
    "Gestionar deudores",
    "Generar reportes",
    "Consultar documentos",
    "Administrar usuarios",
    "Gestionar agenda",
    "Configurar sistema",
    "Ver estadísticas",
    "Exportar datos",
  ]

  const colorOptions = [
    { value: "bg-red-100 text-red-800", label: "Rojo", preview: "bg-red-100" },
    { value: "bg-blue-100 text-blue-800", label: "Azul", preview: "bg-blue-100" },
    { value: "bg-green-100 text-green-800", label: "Verde", preview: "bg-green-100" },
    { value: "bg-yellow-100 text-yellow-800", label: "Amarillo", preview: "bg-yellow-100" },
    { value: "bg-purple-100 text-purple-800", label: "Morado", preview: "bg-purple-100" },
    { value: "bg-gray-100 text-gray-800", label: "Gris", preview: "bg-gray-100" },
  ]

  const handleCreateRole = () => {
    if (!formData.name.trim()) {
      toast({
        title: "❌ Error de validación",
        description: "El nombre del rol es obligatorio.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "✅ Rol creado exitosamente",
      description: `El rol "${formData.name}" ha sido creado con ${formData.permissions.length} permisos.`,
    })

    // Reset form
    setFormData({
      name: "",
      description: "",
      permissions: [],
      color: "bg-gray-100 text-gray-800",
    })
    setActiveTab("view")
  }

  const handleEditRole = (role: Role) => {
    setSelectedRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
      color: role.color,
    })
    setActiveTab("edit")
  }

  const handleUpdateRole = () => {
    if (!formData.name.trim()) {
      toast({
        title: "❌ Error de validación",
        description: "El nombre del rol es obligatorio.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "✅ Rol actualizado exitosamente",
      description: `El rol "${formData.name}" ha sido actualizado.`,
    })

    setActiveTab("view")
    setSelectedRole(null)
  }

  const handleDeleteRole = (role: Role) => {
    if (role.users > 0) {
      toast({
        title: "❌ No se puede eliminar",
        description: `El rol "${role.name}" tiene ${role.users} usuarios asignados.`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "🗑️ Rol eliminado",
      description: `El rol "${role.name}" ha sido eliminado del sistema.`,
      variant: "destructive",
    })
  }

  const togglePermission = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestión de Roles y Permisos</DialogTitle>
          <DialogDescription>Configure los roles del sistema y sus permisos asociados</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="view">Ver Roles</TabsTrigger>
            <TabsTrigger value="create">Crear Rol</TabsTrigger>
            <TabsTrigger value="edit">Editar Rol</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role, index) => (
                <Card key={index} className="border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                      </div>
                      <div className="text-center">
                        <Badge className={role.color}>{role.users}</Badge>
                        <p className="text-xs text-gray-500 mt-1">usuarios</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Permisos ({role.permissions.length}):</p>
                        <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                          {role.permissions.slice(0, 5).map((permission, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <Check className="h-3 w-3 text-green-500 mr-2" />
                              {permission}
                            </div>
                          ))}
                          {role.permissions.length > 5 && (
                            <p className="text-xs text-gray-500">+{role.permissions.length - 5} permisos más...</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteRole(role)}
                          disabled={role.users > 0}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crear Nuevo Rol</CardTitle>
                <CardDescription>Configure un nuevo rol con permisos específicos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Rol *</Label>
                    <Input
                      id="name"
                      placeholder="Ej: Coordinador Legal"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color del Badge</Label>
                    <div className="flex space-x-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className={`w-8 h-8 rounded-full border-2 ${color.preview} ${
                            formData.color === color.value ? "border-gray-800" : "border-gray-300"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                          title={color.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Descripción del rol y sus responsabilidades"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Permisos del Rol</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto border rounded-lg p-4">
                    {availablePermissions.map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission}
                          checked={formData.permissions.includes(permission)}
                          onCheckedChange={() => togglePermission(permission)}
                        />
                        <Label htmlFor={permission} className="text-sm">
                          {permission}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Seleccionados: {formData.permissions.length} permisos</p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setActiveTab("view")}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateRole}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Rol
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="edit" className="space-y-4">
            {selectedRole ? (
              <Card>
                <CardHeader>
                  <CardTitle>Editar Rol: {selectedRole.name}</CardTitle>
                  <CardDescription>Modifique la configuración del rol seleccionado</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Nombre del Rol *</Label>
                      <Input
                        id="edit-name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-color">Color del Badge</Label>
                      <div className="flex space-x-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            className={`w-8 h-8 rounded-full border-2 ${color.preview} ${
                              formData.color === color.value ? "border-gray-800" : "border-gray-300"
                            }`}
                            onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                            title={color.label}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Descripción</Label>
                    <Textarea
                      id="edit-description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Permisos del Rol</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto border rounded-lg p-4">
                      {availablePermissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <Checkbox
                            id={`edit-${permission}`}
                            checked={formData.permissions.includes(permission)}
                            onCheckedChange={() => togglePermission(permission)}
                          />
                          <Label htmlFor={`edit-${permission}`} className="text-sm">
                            {permission}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Seleccionados: {formData.permissions.length} permisos</p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setActiveTab("view")}>
                      Cancelar
                    </Button>
                    <Button onClick={handleUpdateRole}>
                      <Edit className="h-4 w-4 mr-2" />
                      Actualizar Rol
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Seleccione un rol para editar desde la pestaña "Ver Roles"</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
