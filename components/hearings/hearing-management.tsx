"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { HearingDetailsDialog } from "./hearing-details-dialog"
import { CreateHearingDialog } from "./create-hearing-dialog"
import { Calendar, Clock, Users, Video, Plus, Search, Edit, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function HearingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHearing, setSelectedHearing] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { toast } = useToast()

  const hearings = [
    {
      id: 1,
      caseId: "INS-2025-001",
      debtorName: "María González Pérez",
      date: "2025-02-15",
      time: "10:00",
      type: "Negociación de Deudas",
      status: "Programada",
      creditors: 5,
      zoomId: "123 456 7890",
      zoomPassword: "insol2025",
      operator: "Beatriz Helena Malavera",
      notes: "Primera audiencia de negociación",
    },
    {
      id: 2,
      caseId: "CON-2025-002",
      debtorName: "Carlos Rodríguez Silva",
      date: "2025-02-10",
      time: "14:30",
      type: "Conciliación",
      status: "Programada",
      creditors: 3,
      zoomId: "987 654 3210",
      zoomPassword: "concil2025",
      operator: "Beatriz Helena Malavera",
      notes: "Audiencia de conciliación con acreedores principales",
    },
    {
      id: 3,
      caseId: "INS-2025-004",
      debtorName: "Luis Fernando Castro",
      date: "2025-01-25",
      time: "09:00",
      type: "Seguimiento de Acuerdo",
      status: "Completada",
      creditors: 8,
      zoomId: "456 789 0123",
      zoomPassword: "seguim2025",
      operator: "Beatriz Helena Malavera",
      notes: "Seguimiento del cumplimiento del acuerdo de pago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Programada":
        return "bg-blue-100 text-blue-800"
      case "En curso":
        return "bg-green-100 text-green-800"
      case "Completada":
        return "bg-gray-100 text-gray-800"
      case "Cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Negociación de Deudas":
        return "bg-purple-100 text-purple-800"
      case "Conciliación":
        return "bg-blue-100 text-blue-800"
      case "Seguimiento de Acuerdo":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredHearings = hearings.filter(
    (hearing) =>
      hearing.debtorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hearing.caseId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const upcomingHearings = hearings.filter((h) => h.status === "Programada")
  const todayHearings = hearings.filter((h) => h.date === new Date().toISOString().split("T")[0])

  const openHearingDetails = (hearing: any) => {
    setSelectedHearing(hearing)
    setShowDetailsDialog(true)
  }

  const joinZoomMeeting = (hearing: any) => {
    window.open(`https://zoom.us/j/${hearing.zoomId.replace(/\s/g, "")}`, "_blank")
    toast({
      title: "🎥 Uniendo a reunión",
      description: `Abriendo Zoom para la audiencia de ${hearing.debtorName}`,
    })
  }

  const rescheduleHearing = (hearing: any) => {
    toast({
      title: "📅 Reprogramar audiencia",
      description: `Funcionalidad de reprogramación para ${hearing.debtorName} en desarrollo`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Audiencias</h1>
              <p className="text-gray-600">Programar y gestionar audiencias de negociación</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Audiencia
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Audiencias Hoy</p>
                    <p className="text-2xl font-bold">{todayHearings.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Próximas</p>
                    <p className="text-2xl font-bold">{upcomingHearings.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Audiencias</p>
                    <p className="text-2xl font-bold">{hearings.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Virtuales</p>
                    <p className="text-2xl font-bold">{hearings.length}</p>
                  </div>
                  <Video className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">Lista de Audiencias</TabsTrigger>
              <TabsTrigger value="calendar">Vista Calendario</TabsTrigger>
              <TabsTrigger value="today">Audiencias de Hoy</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Todas las Audiencias</CardTitle>
                      <CardDescription>Lista completa de audiencias programadas</CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar audiencias..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-80"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredHearings.map((hearing) => (
                      <Card key={hearing.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div>
                                <h3 className="font-semibold text-lg">{hearing.debtorName}</h3>
                                <p className="text-sm text-gray-600">Caso: {hearing.caseId}</p>
                              </div>
                              <Badge className={getTypeColor(hearing.type)}>{hearing.type}</Badge>
                              <Badge className={getStatusColor(hearing.status)}>{hearing.status}</Badge>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{new Date(hearing.date).toLocaleDateString("es-CO")}</p>
                              <p className="text-sm text-gray-600">{hearing.time}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{hearing.creditors} acreedores</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Video className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">ID: {hearing.zoomId}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{hearing.operator}</span>
                            </div>
                          </div>

                          {hearing.notes && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                <strong>Notas:</strong> {hearing.notes}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => joinZoomMeeting(hearing)}>
                                <Video className="h-4 w-4 mr-2" />
                                Unirse a Zoom
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => rescheduleHearing(hearing)}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Reprogramar
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => openHearingDetails(hearing)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalles
                              </Button>
                            </div>
                            <div className="text-sm text-gray-500">Código: {hearing.zoomPassword}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Vista de Calendario</CardTitle>
                  <CardDescription>Audiencias organizadas por fecha</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hearings.map((hearing) => (
                      <Card
                        key={hearing.id}
                        className="border-l-4 border-l-purple-500 cursor-pointer hover:shadow-md"
                        onClick={() => openHearingDetails(hearing)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={getStatusColor(hearing.status)}>{hearing.status}</Badge>
                            <span className="text-sm text-gray-500">{hearing.time}</span>
                          </div>
                          <h3 className="font-medium mb-1">{hearing.debtorName}</h3>
                          <p className="text-sm text-gray-600 mb-2">{hearing.caseId}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {hearing.type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(hearing.date).toLocaleDateString("es-CO")}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="today">
              <Card>
                <CardHeader>
                  <CardTitle>Audiencias de Hoy</CardTitle>
                  <CardDescription>Audiencias programadas para hoy</CardDescription>
                </CardHeader>
                <CardContent>
                  {todayHearings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No hay audiencias programadas para hoy</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {todayHearings.map((hearing) => (
                        <Card key={hearing.id} className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">{hearing.debtorName}</h3>
                                <p className="text-sm text-gray-600">
                                  {hearing.caseId} - {hearing.type}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{hearing.time}</p>
                                <div className="flex space-x-2 mt-2">
                                  <Button size="sm" onClick={() => joinZoomMeeting(hearing)}>
                                    <Video className="h-4 w-4 mr-2" />
                                    Iniciar
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => openHearingDetails(hearing)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <HearingDetailsDialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog} hearing={selectedHearing} />

      <CreateHearingDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
