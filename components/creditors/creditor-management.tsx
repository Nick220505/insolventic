"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Plus, Search, Filter, Eye, Edit, Mail, Phone, MapPin, Building, Users, Download, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Define types for Creditor and Debtor
type Creditor = {
  id: number
  name: string
  type: string
  email: string
  phone: string
  address: string
  totalDebt: number
  activeCases: number
  status: string
  representative: string
  nit: string
}

type Debtor = {
  id: number
  name: string
  idNumber: string
  email: string
  phone: string
  address: string
  totalDebt: number
  activeCases: number
  status: string
  occupation: string
  monthlyIncome: number
}

export function CreditorManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const { toast } = useToast()

  const [creditors, setCreditors] = useState<Creditor[]>([
    {
      id: 1,
      name: "Banco Nacional de Colombia",
      type: "Entidad Financiera",
      email: "cobranzas@banconal.com.co",
      phone: "+57 1 234-5678",
      address: "Carrera 7 #32-16, Bogotá",
      totalDebt: 450000000,
      activeCases: 12,
      status: "Activo",
      representative: "María García",
      nit: "860.002.964-4",
    },
    {
      id: 2,
      name: "Cooperativa Financiera del Valle",
      type: "Cooperativa",
      email: "juridica@coopvalle.com.co",
      phone: "+57 2 345-6789",
      address: "Avenida 6N #25-45, Cali",
      totalDebt: 280000000,
      activeCases: 8,
      status: "Activo",
      representative: "Carlos Rodríguez",
      nit: "890.300.567-8",
    },
    {
      id: 3,
      name: "Tarjetas de Crédito XYZ",
      type: "Entidad Financiera",
      email: "recuperacion@tarjetasxyz.com",
      phone: "+57 4 456-7890",
      address: "Calle 50 #45-30, Medellín",
      totalDebt: 125000000,
      activeCases: 15,
      status: "Activo",
      representative: "Ana Martínez",
      nit: "900.123.456-7",
    },
    {
      id: 4,
      name: "Financiera Popular",
      type: "Financiera",
      email: "cobranza@finpopular.com.co",
      phone: "+57 5 567-8901",
      address: "Carrera 54 #72-15, Barranquilla",
      totalDebt: 95000000,
      activeCases: 6,
      status: "Inactivo",
      representative: "Luis Fernández",
      nit: "800.456.789-1",
    },
  ])
  const [debtors, setDebtors] = useState<Debtor[]>([
    {
      id: 1,
      name: "María González Pérez",
      idNumber: "52.123.456",
      email: "maria.gonzalez@email.com",
      phone: "+57 300 123-4567",
      address: "Calle 45 #12-34, Bogotá",
      totalDebt: 45000000,
      activeCases: 1,
      status: "En proceso",
      occupation: "Empleada",
      monthlyIncome: 2500000,
    },
    {
      id: 2,
      name: "Carlos Rodríguez Silva",
      idNumber: "80.987.654",
      email: "carlos.rodriguez@email.com",
      phone: "+57 310 987-6543",
      address: "Carrera 15 #67-89, Medellín",
      totalDebt: 28500000,
      activeCases: 1,
      status: "Audiencia programada",
      occupation: "Independiente",
      monthlyIncome: 1800000,
    },
    {
      id: 3,
      name: "Ana Martínez López",
      idNumber: "41.234.567",
      email: "ana.martinez@email.com",
      phone: "+57 320 234-5678",
      address: "Avenida 80 #45-12, Cali",
      totalDebt: 15200000,
      activeCases: 1,
      status: "Documentos pendientes",
      occupation: "Pensionada",
      monthlyIncome: 1200000,
    },
  ])

  // State variables for managing dialogs
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const [openViewDebtorDialog, setOpenViewDebtorDialog] = useState(false)
  const [openEditDebtorDialog, setOpenEditDebtorDialog] = useState(false)
  const [selectedDebtor, setSelectedDebtor] = useState<Debtor | null>(null)

  // State variable for the currently selected creditor
  const [selectedCreditor, setSelectedCreditor] = useState<Creditor | null>(null)

  // Handlers for CRUD operations
  const handleCreateCreditor = (newCreditor: Omit<Creditor, "id">) => {
    const id = creditors.length > 0 ? creditors[creditors.length - 1].id + 1 : 1
    setCreditors([...creditors, { id, ...newCreditor }])
    setOpenCreateDialog(false)
    toast({
      title: "✅ Acreedor creado",
      description: "El acreedor se ha creado exitosamente.",
    })
  }

  const handleEditCreditor = (editedCreditor: Creditor) => {
    const updatedCreditors = creditors.map((creditor) =>
      creditor.id === editedCreditor.id ? editedCreditor : creditor,
    )
    setCreditors(updatedCreditors)
    setOpenEditDialog(false)
    setSelectedCreditor(null)
    toast({
      title: "✅ Acreedor actualizado",
      description: "Los cambios se han guardado correctamente.",
    })
  }

  const handleDeleteCreditor = (id: number) => {
    const creditor = creditors.find((c) => c.id === id)
    const updatedCreditors = creditors.filter((creditor) => creditor.id !== id)
    setCreditors(updatedCreditors)
    setOpenDeleteDialog(false)
    setSelectedCreditor(null)
    toast({
      title: "🗑️ Acreedor eliminado",
      description: `${creditor?.name} ha sido eliminado del sistema.`,
      variant: "destructive",
    })
  }

  const handleViewCreditor = (creditor: Creditor) => {
    setSelectedCreditor(creditor)
    setOpenViewDialog(true)
  }

  const handleOpenEditDialog = (creditor: Creditor) => {
    setSelectedCreditor(creditor)
    setOpenEditDialog(true)
  }

  const handleOpenDeleteDialog = (creditor: Creditor) => {
    setSelectedCreditor(creditor)
    setOpenDeleteDialog(true)
  }

  const handleViewDebtor = (debtor: Debtor) => {
    setSelectedDebtor(debtor)
    setOpenViewDebtorDialog(true)
  }

  const handleOpenEditDebtorDialog = (debtor: Debtor) => {
    setSelectedDebtor(debtor)
    setOpenEditDebtorDialog(true)
  }

  const handleEditDebtor = (editedDebtor: Debtor) => {
    const updatedDebtors = debtors.map((debtor) => (debtor.id === editedDebtor.id ? editedDebtor : debtor))
    setDebtors(updatedDebtors)
    setOpenEditDebtorDialog(false)
    setSelectedDebtor(null)
    toast({
      title: "✅ Deudor actualizado",
      description: "Los cambios se han guardado correctamente.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
      case "En proceso":
        return "bg-green-100 text-green-800"
      case "Inactivo":
        return "bg-red-100 text-red-800"
      case "Audiencia programada":
        return "bg-blue-100 text-blue-800"
      case "Documentos pendientes":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredCreditors = creditors.filter((creditor) => {
    const matchesSearch =
      creditor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creditor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creditor.nit.includes(searchTerm)
    const matchesType = typeFilter === "all" || creditor.type === typeFilter
    return matchesSearch && matchesType
  })

  const filteredDebtors = debtors.filter((debtor) => {
    const matchesSearch =
      debtor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debtor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debtor.idNumber.includes(searchTerm)
    return matchesSearch
  })

  // Function to export data to CSV format
  const exportToCSV = (data: any[], filename: string) => {
    const csvRows = []

    // Get headers
    const headers = Object.keys(data[0])
    csvRows.push(headers.join(","))

    // Get values
    for (const row of data) {
      const values = headers.map((header) => {
        const cellValue = row[header]
        return typeof cellValue === "string" ? `"${cellValue.replace(/"/g, '""')}"` : cellValue
      })
      csvRows.push(values.join(","))
    }

    // Create CSV file
    const csvData = csvRows.join("\n")
    const blob = new Blob([csvData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", filename)
    a.click()

    toast({
      title: "📥 Exportación completada",
      description: `Los datos se han exportado a ${filename}`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Acreedores y Deudores</h1>
              <p className="text-gray-600">Administre la información de acreedores y deudores del sistema</p>
            </div>
            <Button onClick={() => setOpenCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Registro
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Acreedores</p>
                    <p className="text-2xl font-bold">{creditors.length}</p>
                  </div>
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Deudores</p>
                    <p className="text-2xl font-bold">{debtors.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Deuda Total</p>
                    <p className="text-2xl font-bold">
                      ${creditors.reduce((sum, c) => sum + c.totalDebt, 0).toLocaleString()}
                    </p>
                  </div>
                  <Building className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Casos Activos</p>
                    <p className="text-2xl font-bold">{creditors.reduce((sum, c) => sum + c.activeCases, 0)}</p>
                  </div>
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="creditors" className="space-y-4">
            <TabsList>
              <TabsTrigger value="creditors">Acreedores</TabsTrigger>
              <TabsTrigger value="debtors">Deudores</TabsTrigger>
            </TabsList>

            <TabsContent value="creditors" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Lista de Acreedores</CardTitle>
                      <CardDescription>Entidades financieras y acreedores registrados</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Buscar acreedores..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-80"
                        />
                      </div>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los tipos</SelectItem>
                          <SelectItem value="Entidad Financiera">Entidad Financiera</SelectItem>
                          <SelectItem value="Cooperativa">Cooperativa</SelectItem>
                          <SelectItem value="Financiera">Financiera</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" onClick={() => exportToCSV(creditors, "creditors.csv")}>
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Acreedor</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>NIT</TableHead>
                          <TableHead>Representante</TableHead>
                          <TableHead>Contacto</TableHead>
                          <TableHead>Casos Activos</TableHead>
                          <TableHead>Deuda Total</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCreditors.map((creditor) => (
                          <TableRow key={creditor.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{creditor.name}</p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {creditor.address}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{creditor.type}</Badge>
                            </TableCell>
                            <TableCell>{creditor.nit}</TableCell>
                            <TableCell>{creditor.representative}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="text-sm flex items-center">
                                  <Mail className="h-3 w-3 mr-1" />
                                  {creditor.email}
                                </p>
                                <p className="text-sm flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {creditor.phone}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{creditor.activeCases}</TableCell>
                            <TableCell>${creditor.totalDebt.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(creditor.status)}>{creditor.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewCreditor(creditor)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleOpenEditDialog(creditor)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleOpenDeleteDialog(creditor)}>
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

            <TabsContent value="debtors" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Lista de Deudores</CardTitle>
                      <CardDescription>Personas naturales en proceso de insolvencia</CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar deudores..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-80"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Deudor</TableHead>
                          <TableHead>Cédula</TableHead>
                          <TableHead>Contacto</TableHead>
                          <TableHead>Ocupación</TableHead>
                          <TableHead>Ingresos</TableHead>
                          <TableHead>Deuda Total</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDebtors.map((debtor) => (
                          <TableRow key={debtor.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{debtor.name}</p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {debtor.address}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{debtor.idNumber}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="text-sm flex items-center">
                                  <Mail className="h-3 w-3 mr-1" />
                                  {debtor.email}
                                </p>
                                <p className="text-sm flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {debtor.phone}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{debtor.occupation}</TableCell>
                            <TableCell>${debtor.monthlyIncome.toLocaleString()}</TableCell>
                            <TableCell>${debtor.totalDebt.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(debtor.status)}>{debtor.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewDebtor(debtor)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleOpenEditDebtorDialog(debtor)}>
                                  <Edit className="h-4 w-4" />
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
          </Tabs>
        </div>
      </main>

      {/* Dialogs */}
      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Acreedor</DialogTitle>
            <DialogDescription>Ingrese la información del nuevo acreedor.</DialogDescription>
          </DialogHeader>
          <CreateCreditorForm onCreate={handleCreateCreditor} onCancel={() => setOpenCreateDialog(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Acreedor</DialogTitle>
            <DialogDescription>Modifique la información del acreedor.</DialogDescription>
          </DialogHeader>
          {selectedCreditor && (
            <EditCreditorForm
              creditor={selectedCreditor}
              onEdit={handleEditCreditor}
              onCancel={() => {
                setOpenEditDialog(false)
                setSelectedCreditor(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ver Detalles del Acreedor</DialogTitle>
            <DialogDescription>Información detallada del acreedor.</DialogDescription>
          </DialogHeader>
          {selectedCreditor && (
            <ViewCreditorDetails creditor={selectedCreditor} onClose={() => setOpenViewDialog(false)} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Eliminar Acreedor</DialogTitle>
          </DialogHeader>
          {selectedCreditor && (
            <DeleteConfirmation
              creditor={selectedCreditor}
              onDelete={handleDeleteCreditor}
              onCancel={() => {
                setOpenDeleteDialog(false)
                setSelectedCreditor(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Debtor Dialogs */}
      <Dialog open={openViewDebtorDialog} onOpenChange={setOpenViewDebtorDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ver Detalles del Deudor</DialogTitle>
            <DialogDescription>Información detallada del deudor.</DialogDescription>
          </DialogHeader>
          {selectedDebtor && (
            <ViewDebtorDetails debtor={selectedDebtor} onClose={() => setOpenViewDebtorDialog(false)} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDebtorDialog} onOpenChange={setOpenEditDebtorDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Deudor</DialogTitle>
            <DialogDescription>Modifique la información del deudor.</DialogDescription>
          </DialogHeader>
          {selectedDebtor && (
            <EditDebtorForm
              debtor={selectedDebtor}
              onEdit={handleEditDebtor}
              onCancel={() => {
                setOpenEditDebtorDialog(false)
                setSelectedDebtor(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Create Creditor Form Component
interface CreateCreditorFormProps {
  onCreate: (creditor: Omit<Creditor, "id">) => void
  onCancel: () => void
}

const CreateCreditorForm: React.FC<CreateCreditorFormProps> = ({ onCreate, onCancel }) => {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [totalDebt, setTotalDebt] = useState(0)
  const [activeCases, setActiveCases] = useState(0)
  const [status, setStatus] = useState("")
  const [representative, setRepresentative] = useState("")
  const [nit, setNit] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCreditor = {
      name,
      type,
      email,
      phone,
      address,
      totalDebt,
      activeCases,
      status,
      representative,
      nit,
    }
    onCreate(newCreditor)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">Tipo</Label>
        <Input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="nit">NIT</Label>
        <Input type="text" id="nit" value={nit} onChange={(e) => setNit(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="representative">Representante</Label>
        <Input
          type="text"
          id="representative"
          value={representative}
          onChange={(e) => setRepresentative(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Dirección</Label>
        <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="totalDebt">Deuda Total</Label>
        <Input type="number" id="totalDebt" value={totalDebt} onChange={(e) => setTotalDebt(Number(e.target.value))} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="activeCases">Casos Activos</Label>
        <Input
          type="number"
          id="activeCases"
          value={activeCases}
          onChange={(e) => setActiveCases(Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Estado</Label>
        <Input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Crear</Button>
      </div>
    </form>
  )
}

// Edit Creditor Form Component
interface EditCreditorFormProps {
  creditor: Creditor
  onEdit: (creditor: Creditor) => void
  onCancel: () => void
}

const EditCreditorForm: React.FC<EditCreditorFormProps> = ({ creditor, onEdit, onCancel }) => {
  const [name, setName] = useState(creditor.name)
  const [type, setType] = useState(creditor.type)
  const [email, setEmail] = useState(creditor.email)
  const [phone, setPhone] = useState(creditor.phone)
  const [address, setAddress] = useState(creditor.address)
  const [totalDebt, setTotalDebt] = useState(creditor.totalDebt)
  const [activeCases, setActiveCases] = useState(creditor.activeCases)
  const [status, setStatus] = useState(creditor.status)
  const [representative, setRepresentative] = useState(creditor.representative)
  const [nit, setNit] = useState(creditor.nit)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedCreditor = {
      ...creditor,
      name,
      type,
      email,
      phone,
      address,
      totalDebt,
      activeCases,
      status,
      representative,
      nit,
    }
    onEdit(updatedCreditor)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">Tipo</Label>
        <Input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="nit">NIT</Label>
        <Input type="text" id="nit" value={nit} onChange={(e) => setNit(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="representative">Representante</Label>
        <Input
          type="text"
          id="representative"
          value={representative}
          onChange={(e) => setRepresentative(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Dirección</Label>
        <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="totalDebt">Deuda Total</Label>
        <Input type="number" id="totalDebt" value={totalDebt} onChange={(e) => setTotalDebt(Number(e.target.value))} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="activeCases">Casos Activos</Label>
        <Input
          type="number"
          id="activeCases"
          value={activeCases}
          onChange={(e) => setActiveCases(Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Estado</Label>
        <Input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  )
}

// View Creditor Details Component
interface ViewCreditorDetailsProps {
  creditor: Creditor
  onClose: () => void
}

const ViewCreditorDetails: React.FC<ViewCreditorDetailsProps> = ({ creditor, onClose }) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label>Nombre</Label>
        <Input type="text" value={creditor.name} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Tipo</Label>
        <Input type="text" value={creditor.type} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>NIT</Label>
        <Input type="text" value={creditor.nit} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Representante</Label>
        <Input type="text" value={creditor.representative} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input type="email" value={creditor.email} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Teléfono</Label>
        <Input type="tel" value={creditor.phone} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Dirección</Label>
        <Input type="text" value={creditor.address} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Deuda Total</Label>
        <Input type="number" value={creditor.totalDebt} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Casos Activos</Label>
        <Input type="number" value={creditor.activeCases} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Estado</Label>
        <Input type="text" value={creditor.status} readOnly />
      </div>
      <div className="flex justify-end">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  )
}

// Delete Confirmation Component
interface DeleteConfirmationProps {
  creditor: Creditor
  onDelete: (id: number) => void
  onCancel: () => void
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ creditor, onDelete, onCancel }) => {
  return (
    <div className="grid gap-4">
      <p>¿Está seguro de que desea eliminar a {creditor.name}?</p>
      <div className="flex justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" variant="destructive" onClick={() => onDelete(creditor.id)}>
          Eliminar
        </Button>
      </div>
    </div>
  )
}

// View Debtor Details Component
interface ViewDebtorDetailsProps {
  debtor: Debtor
  onClose: () => void
}

const ViewDebtorDetails: React.FC<ViewDebtorDetailsProps> = ({ debtor, onClose }) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label>Nombre</Label>
        <Input type="text" value={debtor.name} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Número de Documento</Label>
        <Input type="text" value={debtor.idNumber} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input type="email" value={debtor.email} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Teléfono</Label>
        <Input type="tel" value={debtor.phone} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Dirección</Label>
        <Input type="text" value={debtor.address} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Ocupación</Label>
        <Input type="text" value={debtor.occupation} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Ingresos Mensuales</Label>
        <Input type="number" value={debtor.monthlyIncome} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Deuda Total</Label>
        <Input type="number" value={debtor.totalDebt} readOnly />
      </div>
      <div className="grid gap-2">
        <Label>Estado</Label>
        <Input type="text" value={debtor.status} readOnly />
      </div>
      <div className="flex justify-end">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  )
}

// Edit Debtor Form Component
interface EditDebtorFormProps {
  debtor: Debtor
  onEdit: (debtor: Debtor) => void
  onCancel: () => void
}

const EditDebtorForm: React.FC<EditDebtorFormProps> = ({ debtor, onEdit, onCancel }) => {
  const [name, setName] = useState(debtor.name)
  const [idNumber, setIdNumber] = useState(debtor.idNumber)
  const [email, setEmail] = useState(debtor.email)
  const [phone, setPhone] = useState(debtor.phone)
  const [address, setAddress] = useState(debtor.address)
  const [occupation, setOccupation] = useState(debtor.occupation)
  const [monthlyIncome, setMonthlyIncome] = useState(debtor.monthlyIncome)
  const [totalDebt, setTotalDebt] = useState(debtor.totalDebt)
  const [status, setStatus] = useState(debtor.status)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedDebtor = {
      ...debtor,
      name,
      idNumber,
      email,
      phone,
      address,
      occupation,
      monthlyIncome,
      totalDebt,
      status,
    }
    onEdit(updatedDebtor)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="idNumber">Número de Documento</Label>
        <Input type="text" id="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Dirección</Label>
        <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="occupation">Ocupación</Label>
        <Input type="text" id="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="monthlyIncome">Ingresos Mensuales</Label>
        <Input
          type="number"
          id="monthlyIncome"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="totalDebt">Deuda Total</Label>
        <Input type="number" id="totalDebt" value={totalDebt} onChange={(e) => setTotalDebt(Number(e.target.value))} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Estado</Label>
        <Input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  )
}
