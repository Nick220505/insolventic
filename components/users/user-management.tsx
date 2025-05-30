"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CreateUserDialog } from "./create-user-dialog"
import { EditUserDialog } from "./edit-user-dialog"
import { UserDetailsDialog } from "./user-details-dialog"
import { DeleteUserDialog } from "./delete-user-dialog"
import { RoleManagementDialog } from "./role-management-dialog"
import { Plus, Search, Filter, Eye, Edit, Shield, Users, UserCheck, Settings, Trash2, UserPlus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface User {
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

interface Role {
  name: string
  description: string
  permissions: string[]
  color: string
  users: number
}

export function UserManagement() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showRoleDialog, setShowRoleDialog] = useState(false)

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Beatriz Helena Malavera López",
      email: "beatriz.malavera@constructoresdepaz.com.co",
      role: "Operadora de Insolvencia",
      status: "Activo",
      lastLogin: "2025-01-29 08:30",
      casesAssigned: 24,
      permissions: ["Crear casos", "Generar documentos", "Programar audiencias", "Gestionar acreedores"],
      professionalCard: "194.548",
      phone: "+57 311 811 7520",
      address: "Calle 74 No. 15-80 Interior 1 Oficina 308",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Maximiliano Jaramillo Pérez",
      email: "maximiliano.jaramillo@constructoresdepaz.com.co",
      role: "Abogado",
      status: "Activo",
      lastLogin: "2025-01-29 07:45",
      casesAssigned: 12,
      permissions: ["Ver casos", "Generar reportes", "Consultar documentos"],
      professionalCard: "156.789",
      phone: "+57 300 123 4567",
      address: "Carrera 15 #45-67",
      createdDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Carlos Andrés Rodríguez",
      email: "carlos.rodriguez@constructoresdepaz.com.co",
      role: "Asistente Legal",
      status: "Activo",
      lastLogin: "2025-01-28 16:20",
      casesAssigned: 8,
      permissions: ["Ver casos", "Subir documentos", "Programar citas"],
      professionalCard: "N/A",
      phone: "+57 310 987 6543",
      address: "Avenida 68 #23-45",
      createdDate: "2024-03-10",
    },
    {
      id: 4,
      name: "María Fernanda González",
      email: "maria.gonzalez@constructoresdepaz.com.co",
      role: "Secretaria",
      status: "Inactivo",
      lastLogin: "2025-01-25 14:15",
      casesAssigned: 0,
      permissions: ["Ver casos", "Gestionar agenda"],
      professionalCard: "N/A",
      phone: "+57 320 456 7890",
      address: "Calle 80 #12-34",
      createdDate: "2024-04-05",
    },
  ])

  const roles: Role[] = [
    {
      name: "Operadora de Insolvencia",
      description: "Operador principal con todos los permisos",
      permissions: ["Todos los permisos del sistema"],
      color: "bg-red-100 text-red-800",
      users: 1,
    },
    {
      name: "Abogado",
      description: "Abogado con permisos de consulta y reportes",
      permissions: ["Ver casos", "Generar reportes", "Consultar documentos"],
      color: "bg-blue-100 text-blue-800",
      users: 1,
    },
    {
      name: "Asistente Legal",
      description: "Asistente con permisos limitados",
      permissions: ["Ver casos", "Subir documentos", "Programar citas"],
      color: "bg-green-100 text-green-800",
      users: 1,
    },
    {
      name: "Secretaria",
      description: "Personal administrativo",
      permissions: ["Ver casos", "Gestionar agenda"],
      color: "bg-gray-100 text-gray-800",
      users: 1,
    },
  ]

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
    const roleConfig = roles.find((r) => r.name === role)
    return roleConfig?.color || "bg-gray-100 text-gray-800"
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const openUserDetails = (user: User) => {
    setSelectedUser(user)
    setShowDetailsDialog(true)
  }

  const openEditUser = (user: User) => {
    setSelectedUser(user)
    setShowEditDialog(true)
  }

  const openDeleteUser = (user: User) => {
    setSelectedUser(user)
    setShowDeleteDialog(true)
  }

  const handleCreateUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: users.length + 1,
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "Secretaria",
      status: userData.status || "Activo",
      phone: userData.phone || "",
      address: userData.address || "",
      professionalCard: userData.professionalCard || "N/A",
      permissions: userData.permissions || [],
      lastLogin: "Nunca",
      casesAssigned: 0,
      createdDate: new Date().toISOString().split("T")[0],
    }
    setUsers([...users, newUser])

    toast({
      title: "✅ Usuario creado exitosamente",
      description: `${newUser.name} ha sido agregado como ${newUser.role}.`,
    })
  }

  const handleUpdateUser = (userData: User) => {
    setUsers(users.map((user) => (user.id === userData.id ? userData : user)))

    toast({
      title: "✅ Usuario actualizado exitosamente",
      description: `Los datos de ${userData.name} han sido actualizados.`,
    })
  }

  const handleDeleteUser = (userId: number) => {
    const userToDelete = users.find((user) => user.id === userId)
    setUsers(users.filter((user) => user.id !== userId))

    if (userToDelete) {
      toast({
        title: "🗑️ Usuario eliminado",
        description: `${userToDelete.name} ha sido eliminado del sistema.`,
        variant: "destructive",
      })
    }
  }

  const toggleUserStatus = (userId: number) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    const newStatus = user.status === "Activo" ? "Inactivo" : "Activo"
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)))

    toast({
      title: newStatus === "Activo" ? "✅ Usuario activado" : "⛔ Usuario desactivado",
      description: `${user.name} ahora está ${newStatus.toLowerCase()}.`,
    })
  }

  const resetUserPassword = (user: User) => {
    toast({
      title: "🔑 Contraseña restablecida",
      description: `Nueva contraseña temporal enviada por email a ${user.email}.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
              <p className="text-gray-600">Administre usuarios y permisos del sistema</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                    <p className="text-2xl font-bold">{users.filter((u) => u.status === "Activo").length}</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Operadores</p>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.role === "Operadora de Insolvencia").length}
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Casos Asignados</p>
                    <p className="text-2xl font-bold">{users.reduce((sum, u) => sum + u.casesAssigned, 0)}</p>
                  </div>
                  <Settings className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
              <TabsTrigger value="activity">Actividad</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Lista de Usuarios</CardTitle>
                      <CardDescription>Usuarios registrados en el sistema</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Buscar usuarios..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-80"
                        />
                      </div>
                      <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filtrar por rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los roles</SelectItem>
                          {roles.map((role) => (
                            <SelectItem key={role.name} value={role.name}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuario</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Casos Asignados</TableHead>
                          <TableHead>Último Acceso</TableHead>
                          <TableHead>Tarjeta Profesional</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                            </TableCell>
                            <TableCell>{user.casesAssigned}</TableCell>
                            <TableCell>
                              <span className="text-sm">
                                {user.lastLogin === "Nunca"
                                  ? "Nunca"
                                  : new Date(user.lastLogin).toLocaleString("es-CO")}
                              </span>
                            </TableCell>
                            <TableCell>{user.professionalCard}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openUserDetails(user)}
                                  title="Ver detalles"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditUser(user)}
                                  title="Editar usuario"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openDeleteUser(user)}
                                  title="Eliminar usuario"
                                  disabled={user.role === "Operadora de Insolvencia"}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Roles y Permisos</CardTitle>
                      <CardDescription>Configuración de roles y permisos del sistema</CardDescription>
                    </div>
                    <Button onClick={() => setShowRoleDialog(true)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Gestionar Roles
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roles.map((role, index) => (
                      <Card key={index} className="border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold">{role.name}</h3>
                              <p className="text-sm text-gray-600">{role.description}</p>
                            </div>
                            <div className="text-center">
                              <Badge className={role.color}>{role.users}</Badge>
                              <p className="text-xs text-gray-500 mt-1">usuarios</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">Permisos:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {role.permissions.map((permission, idx) => (
                                <li key={idx} className="flex items-center">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                  {permission}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setShowRoleDialog(true)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-2" />
                              Ver Usuarios
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad de Usuarios</CardTitle>
                  <CardDescription>Registro de actividad reciente en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        user: "Beatriz Helena Malavera",
                        action: "Generó Auto de Admisión",
                        case: "INS-2025-001",
                        time: "2025-01-29 08:30",
                        type: "document",
                      },
                      {
                        user: "Maximiliano Jaramillo",
                        action: "Consultó reporte financiero",
                        case: "Sistema",
                        time: "2025-01-29 07:45",
                        type: "report",
                      },
                      {
                        user: "Carlos Andrés Rodríguez",
                        action: "Subió documento REDAM",
                        case: "CON-2025-002",
                        time: "2025-01-28 16:20",
                        type: "upload",
                      },
                      {
                        user: "Beatriz Helena Malavera",
                        action: "Programó audiencia",
                        case: "INS-2025-001",
                        time: "2025-01-28 14:15",
                        type: "schedule",
                      },
                      {
                        user: "María Fernanda González",
                        action: "Inició sesión",
                        case: "Sistema",
                        time: "2025-01-25 14:15",
                        type: "login",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.user}</p>
                            <p className="text-sm text-gray-600">
                              {activity.action} - {activity.case}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">
                            {new Date(activity.time).toLocaleString("es-CO")}
                          </span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Dialogs */}
      <CreateUserDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateUser={handleCreateUser}
        roles={roles}
      />

      <EditUserDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
        roles={roles}
      />

      <UserDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        user={selectedUser}
        onToggleStatus={toggleUserStatus}
        onResetPassword={resetUserPassword}
      />

      <DeleteUserDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        user={selectedUser}
        onDeleteUser={handleDeleteUser}
      />

      <RoleManagementDialog open={showRoleDialog} onOpenChange={setShowRoleDialog} roles={roles} />
    </div>
  )
}
