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
import { CreateCaseDialog } from "./create-case-dialog"
import { CaseDetailsDialog } from "./case-details-dialog"
import { Plus, Search, Filter, Eye, Edit, FileText, Calendar, Users, Download, CheckCircle } from "lucide-react"

export function CaseManagement() {
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const cases = [
    {
      id: "INS-2025-001",
      debtorName: "María González Pérez",
      debtorId: "52.123.456",
      type: "Insolvencia",
      status: "En negociación",
      totalDebt: 45000000,
      creditors: 5,
      createdDate: "2025-01-15",
      hearingDate: "2025-02-15",
      operator: "Beatriz Helena Malavera",
      documents: ["Solicitud", "Auto Admisión", "Notificaciones"],
      phase: "Audiencia programada",
    },
    {
      id: "CON-2025-002",
      debtorName: "Carlos Rodríguez Silva",
      debtorId: "80.987.654",
      type: "Conciliación",
      status: "Audiencia programada",
      totalDebt: 28500000,
      creditors: 3,
      createdDate: "2025-01-14",
      hearingDate: "2025-02-10",
      operator: "Beatriz Helena Malavera",
      documents: ["Solicitud", "Auto Admisión"],
      phase: "Documentos pendientes",
    },
    {
      id: "ACU-2025-003",
      debtorName: "Ana Martínez López",
      debtorId: "41.234.567",
      type: "Acuerdo de Apoyo",
      status: "Documentos pendientes",
      totalDebt: 15200000,
      creditors: 2,
      createdDate: "2025-01-13",
      hearingDate: null,
      operator: "Beatriz Helena Malavera",
      documents: ["Solicitud"],
      phase: "Control de legalidad",
    },
    {
      id: "INS-2025-004",
      debtorName: "Luis Fernando Castro",
      debtorId: "19.876.543",
      type: "Insolvencia",
      status: "Acuerdo aprobado",
      totalDebt: 67800000,
      creditors: 8,
      createdDate: "2025-01-12",
      hearingDate: "2025-01-25",
      operator: "Beatriz Helena Malavera",
      documents: ["Solicitud", "Auto Admisión", "Acuerdo de Pago", "Tabla Amortización"],
      phase: "Cumplimiento",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Acuerdo aprobado":
        return "bg-green-100 text-green-800"
      case "En negociación":
        return "bg-blue-100 text-blue-800"
      case "Audiencia programada":
        return "bg-purple-100 text-purple-800"
      case "Documentos pendientes":
        return "bg-orange-100 text-orange-800"
      case "Admitido":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Insolvencia":
        return "bg-red-100 text-red-800"
      case "Conciliación":
        return "bg-blue-100 text-blue-800"
      case "Acuerdo de Apoyo":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.debtorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.debtorId.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openCaseDetails = (case_: any) => {
    setSelectedCase(case_)
    setShowDetailsDialog(true)
  }

  const editCase = (case_: any) => {
    alert(`Editando caso ${case_.id} - ${case_.debtorName}`)
  }

  const generateDocument = (case_: any) => {
    alert(`Generando documento para caso ${case_.id}`)
  }

  const downloadCaseFile = (case_: any) => {
    alert(`Descargando expediente del caso ${case_.id}`)
  }

  const markAsCompleted = (case_: any) => {
    alert(`Marcando caso ${case_.id} como completado`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Casos</h1>
              <p className="text-gray-600">Administre casos de insolvencia, conciliación y acuerdos de apoyo</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Caso
            </Button>
          </div>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">Lista de Casos</TabsTrigger>
              <TabsTrigger value="calendar">Calendario</TabsTrigger>
              <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Casos Activos</CardTitle>
                      <CardDescription>Lista completa de casos en el sistema</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Buscar por nombre, ID o cédula..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-80"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los estados</SelectItem>
                          <SelectItem value="En negociación">En negociación</SelectItem>
                          <SelectItem value="Audiencia programada">Audiencia programada</SelectItem>
                          <SelectItem value="Documentos pendientes">Documentos pendientes</SelectItem>
                          <SelectItem value="Acuerdo aprobado">Acuerdo aprobado</SelectItem>
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
                          <TableHead>ID Caso</TableHead>
                          <TableHead>Deudor</TableHead>
                          <TableHead>Cédula</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Monto Total</TableHead>
                          <TableHead>Acreedores</TableHead>
                          <TableHead>Próxima Audiencia</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCases.map((case_) => (
                          <TableRow key={case_.id}>
                            <TableCell className="font-medium">{case_.id}</TableCell>
                            <TableCell>{case_.debtorName}</TableCell>
                            <TableCell>{case_.debtorId}</TableCell>
                            <TableCell>
                              <Badge className={getTypeColor(case_.type)}>{case_.type}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                            </TableCell>
                            <TableCell>${case_.totalDebt.toLocaleString()}</TableCell>
                            <TableCell>{case_.creditors}</TableCell>
                            <TableCell>
                              {case_.hearingDate
                                ? new Date(case_.hearingDate).toLocaleDateString("es-CO")
                                : "No programada"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openCaseDetails(case_)}
                                  title="Ver detalles"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => editCase(case_)} title="Editar caso">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => generateDocument(case_)}
                                  title="Generar documento"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => downloadCaseFile(case_)}
                                  title="Descargar expediente"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                {case_.status !== "Acuerdo aprobado" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsCompleted(case_)}
                                    title="Marcar como completado"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                )}
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

            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Calendario de Audiencias</CardTitle>
                  <CardDescription>Vista de calendario con audiencias programadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cases
                      .filter((c) => c.hearingDate)
                      .map((case_) => (
                        <Card
                          key={case_.id}
                          className="border-l-4 border-l-blue-500 cursor-pointer hover:shadow-md"
                          onClick={() => openCaseDetails(case_)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className={getTypeColor(case_.type)}>{case_.type}</Badge>
                              <span className="text-sm text-gray-500">{case_.id}</span>
                            </div>
                            <h3 className="font-medium">{case_.debtorName}</h3>
                            <div className="flex items-center mt-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(case_.hearingDate!).toLocaleDateString("es-CO")}
                            </div>
                            <div className="flex items-center mt-1 text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              {case_.creditors} acreedores
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Casos</p>
                        <p className="text-2xl font-bold">{cases.length}</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">En Negociación</p>
                        <p className="text-2xl font-bold">
                          {cases.filter((c) => c.status === "En negociación").length}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Acuerdos Aprobados</p>
                        <p className="text-2xl font-bold">
                          {cases.filter((c) => c.status === "Acuerdo aprobado").length}
                        </p>
                      </div>
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Monto Total</p>
                        <p className="text-2xl font-bold">
                          ${cases.reduce((sum, c) => sum + c.totalDebt, 0).toLocaleString()}
                        </p>
                      </div>
                      <FileText className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <CreateCaseDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
      <CaseDetailsDialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog} case={selectedCase} />
    </div>
  )
}
