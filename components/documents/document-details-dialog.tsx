"use client"

import { CardDescription } from "@/components/ui/card"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Share2, Archive, Trash2, Eye, User, HardDrive, Clock, BarChart3 } from "lucide-react"

interface DocumentDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: any
  onDownload: (document: any) => void
  onShare: (document: any) => void
  onArchive: (documentId: number) => void
  onDelete: (documentId: number) => void
}

export function DocumentDetailsDialog({
  open,
  onOpenChange,
  document,
  onDownload,
  onShare,
  onArchive,
  onDelete,
}: DocumentDetailsDialogProps) {
  if (!document) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Generado":
        return "bg-blue-100 text-blue-800"
      case "Enviado":
        return "bg-green-100 text-green-800"
      case "Firmado":
        return "bg-purple-100 text-purple-800"
      case "Subido":
        return "bg-orange-100 text-orange-800"
      case "Archivado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Admisión":
        return "bg-blue-100 text-blue-800"
      case "Notificación":
        return "bg-yellow-100 text-yellow-800"
      case "Suspensión":
        return "bg-red-100 text-red-800"
      case "Acuerdo":
        return "bg-green-100 text-green-800"
      case "Cálculo":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const activityLog = [
    {
      action: "Documento creado",
      user: document.createdBy,
      date: document.createdDate,
      details: `Documento ${document.type} generado para el caso ${document.caseId}`,
    },
    {
      action: "Documento descargado",
      user: "Maximiliano Jaramillo",
      date: "2025-01-28",
      details: "Descarga realizada para revisión legal",
    },
    {
      action: "Documento compartido",
      user: document.createdBy,
      date: "2025-01-27",
      details: "Enlace compartido con acreedores",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Documento</DialogTitle>
          <DialogDescription>Información completa y estadísticas del documento</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Header */}
          <div className="flex items-start justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{document.name}</h2>
                <p className="text-gray-600">{document.type}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
                  <Badge className={getCategoryColor(document.category)}>{document.category}</Badge>
                  <Badge variant="outline">{document.format}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Tamaño</p>
              <p className="text-lg font-semibold">{document.size}</p>
            </div>
          </div>

          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
              <TabsTrigger value="activity">Actividad</TabsTrigger>
              <TabsTrigger value="actions">Acciones</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Información del Documento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Nombre</p>
                        <p className="font-medium">{document.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tipo</p>
                        <p className="font-medium">{document.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Formato</p>
                        <p className="font-medium">{document.format}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tamaño</p>
                        <p className="font-medium">{document.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Estado</p>
                        <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Categoría</p>
                        <Badge className={getCategoryColor(document.category)}>{document.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Información del Caso
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Caso ID</p>
                        <p className="font-medium">{document.caseId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Deudor</p>
                        <p className="font-medium">{document.debtorName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Creado por</p>
                        <p className="font-medium">{document.createdBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fecha de creación</p>
                        <p className="font-medium">{new Date(document.createdDate).toLocaleDateString("es-CO")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Último acceso</p>
                        <p className="font-medium">{new Date(document.lastAccessed).toLocaleString("es-CO")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Descargas</p>
                        <p className="text-2xl font-bold">{document.downloadCount}</p>
                      </div>
                      <Download className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Visualizaciones</p>
                        <p className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 5}</p>
                      </div>
                      <Eye className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Compartidos</p>
                        <p className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 1}</p>
                      </div>
                      <Share2 className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Estadísticas de Uso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Descargas esta semana</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <span className="text-sm font-medium">3</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Visualizaciones este mes</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-sm font-medium">12</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compartidos este año</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                        <span className="text-sm font-medium">2</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Registro de Actividad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityLog.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{activity.action}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(activity.date).toLocaleDateString("es-CO")}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{activity.details}</p>
                          <p className="text-xs text-gray-500">Por: {activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Acciones Disponibles</CardTitle>
                  <CardDescription>Operaciones que puede realizar con este documento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => onDownload(document)}
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <Download className="h-6 w-6 mb-2" />
                      Descargar Documento
                    </Button>
                    <Button
                      onClick={() => onShare(document)}
                      variant="outline"
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <Share2 className="h-6 w-6 mb-2" />
                      Compartir Enlace
                    </Button>
                    <Button
                      onClick={() => onArchive(document.id)}
                      variant="outline"
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <Archive className="h-6 w-6 mb-2" />
                      Archivar Documento
                    </Button>
                    <Button
                      onClick={() => onDelete(document.id)}
                      variant="destructive"
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <Trash2 className="h-6 w-6 mb-2" />
                      Eliminar Documento
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HardDrive className="h-5 w-5 mr-2" />
                    Información Técnica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">ID del documento:</p>
                      <p className="font-mono">{document.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Checksum:</p>
                      <p className="font-mono">SHA256: abc123...</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Versión:</p>
                      <p className="font-mono">1.0</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Ubicación:</p>
                      <p className="font-mono">/documents/{document.caseId}/</p>
                    </div>
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
