"use client"

import type React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  Calendar,
  DollarSign,
  Globe,
  Users,
  Activity,
  Eye,
} from "lucide-react"

interface CreditorDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creditor: any
}

export function CreditorDetailsDialog({ open, onOpenChange, creditor }: CreditorDetailsDialogProps) {
  if (!creditor) return null

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Entidad Financiera":
        return "bg-blue-100 text-blue-800"
      case "Cooperativa":
        return "bg-green-100 text-green-800"
      case "Financiera":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Mock data for cases and activity
  const recentCases = [
    {
      id: "INS-2025-001",
      debtor: "María González Pérez",
      amount: 15000000,
      status: "En negociación",
      date: "2025-01-15",
    },
    {
      id: "CON-2025-002",
      debtor: "Carlos Rodríguez Silva",
      amount: 8500000,
      status: "Audiencia programada",
      date: "2025-01-14",
    },
  ]

  const activityLog = [
    {
      date: "2025-01-20",
      action: "Actualización de información de contacto",
      user: "Beatriz Helena Malavera",
    },
    {
      date: "2025-01-15",
      action: "Nuevo caso asignado: INS-2025-001",
      user: "Sistema",
    },
    {
      date: "2025-01-10",
      action: "Verificación de datos completada",
      user: "Beatriz Helena Malavera",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Detalles del Acreedor
          </DialogTitle>
          <DialogDescription>Información completa de {creditor.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with basic info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{creditor.name}</h2>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {creditor.address}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getTypeColor(creditor.type)}>{creditor.type}</Badge>
                      <Badge className={getStatusColor(creditor.status)}>{creditor.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">NIT</p>
                  <p className="font-medium">{creditor.nit}</p>
                  <p className="text-sm text-gray-600 mt-2">Casos Activos</p>
                  <p className="text-2xl font-bold text-blue-600">{creditor.activeCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="representative">Representante</TabsTrigger>
              <TabsTrigger value="contacts">Contactos</TabsTrigger>
              <TabsTrigger value="cases">Casos</TabsTrigger>
              <TabsTrigger value="activity">Actividad</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      Información de la Entidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <Badge className={getTypeColor(creditor.type)}>{creditor.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <Badge className={getStatusColor(creditor.status)}>{creditor.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">NIT:</span>
                      <span className="font-medium">{creditor.nit}</span>
                    </div>
                    {creditor.website && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Sitio Web:</span>
                        <a
                          href={creditor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          Visitar
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="h-5 w-5 mr-2" />
                      Información de Contacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{creditor.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{creditor.phone}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <p>{creditor.address}</p>
                        <p className="text-sm text-gray-600">
                          {creditor.city}, {creditor.department}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Información Financiera
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Deuda Total:</span>
                      <span className="font-bold text-lg">${creditor.totalDebt?.toLocaleString() || "0"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Casos Activos:</span>
                      <span className="font-medium">{creditor.activeCases}</span>
                    </div>
                    {creditor.bankName && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Banco:</span>
                        <span className="font-medium">{creditor.bankName}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Fechas Importantes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Fecha de Registro:</span>
                      <span>{new Date(creditor.createdDate || Date.now()).toLocaleDateString("es-CO")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Última Actualización:</span>
                      <span>{new Date(creditor.lastUpdate || Date.now()).toLocaleDateString("es-CO")}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {creditor.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>Descripción</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{creditor.description}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="representative" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Representante Legal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Nombre Completo</Label>
                      <p className="font-medium">{creditor.representative || "No especificado"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Cédula</Label>
                      <p className="font-medium">{creditor.representativeId || "No especificado"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Correo Electrónico</Label>
                      <p className="font-medium">{creditor.representativeEmail || "No especificado"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Teléfono</Label>
                      <p className="font-medium">{creditor.representativePhone || "No especificado"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Contactos Adicionales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {creditor.contacts && creditor.contacts.length > 0 ? (
                    <div className="space-y-3">
                      {creditor.contacts.map((contact: any, index: number) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-gray-600">{contact.position}</p>
                            </div>
                            <div className="text-right text-sm">
                              <p className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {contact.email}
                              </p>
                              <p className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {contact.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No hay contactos adicionales registrados</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cases" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Casos Relacionados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Caso</TableHead>
                        <TableHead>Deudor</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentCases.map((case_) => (
                        <TableRow key={case_.id}>
                          <TableCell className="font-medium">{case_.id}</TableCell>
                          <TableCell>{case_.debtor}</TableCell>
                          <TableCell>${case_.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{case_.status}</Badge>
                          </TableCell>
                          <TableCell>{new Date(case_.date).toLocaleDateString("es-CO")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Registro de Actividad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activityLog.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 border-l-2 border-blue-200">
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">Por: {activity.user}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString("es-CO")}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
