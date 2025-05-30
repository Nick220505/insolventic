"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DocumentGenerator } from "./document-generator"
import { AmortizationCalculator } from "./amortization-calculator"
import { FileText, Download, Calendar, Users, DollarSign, Clock } from "lucide-react"

interface CaseDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  case: any
}

export function CaseDetailsDialog({ open, onOpenChange, case: caseData }: CaseDetailsDialogProps) {
  if (!caseData) return null

  const mockCreditors = [
    { name: "Banco Nacional", amount: 25000000, type: "Segunda Clase", status: "Notificado" },
    { name: "Cooperativa Financiera", amount: 15000000, type: "Segunda Clase", status: "Pendiente" },
    { name: "Tarjeta de Crédito XYZ", amount: 5000000, type: "Quinta Clase", status: "Notificado" },
  ]

  const mockTimeline = [
    { date: "2025-01-15", event: "Solicitud radicada", status: "completed" },
    { date: "2025-01-16", event: "Control de legalidad", status: "completed" },
    { date: "2025-01-17", event: "Auto de admisión", status: "completed" },
    { date: "2025-01-18", event: "Notificación a acreedores", status: "completed" },
    { date: "2025-02-15", event: "Audiencia de negociación", status: "pending" },
    { date: "TBD", event: "Acuerdo de pago", status: "future" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Caso {caseData.id}</DialogTitle>
          <DialogDescription>Información completa del caso de {caseData.debtorName}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="creditors">Acreedores</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="timeline">Cronología</TabsTrigger>
            <TabsTrigger value="calculator">Calculadora</TabsTrigger>
            <TabsTrigger value="generator">Generar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monto Total</p>
                      <p className="text-2xl font-bold">${caseData.totalDebt.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Acreedores</p>
                      <p className="text-2xl font-bold">{caseData.creditors}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Días Activo</p>
                      <p className="text-2xl font-bold">
                        {Math.floor(
                          (new Date().getTime() - new Date(caseData.createdDate).getTime()) / (1000 * 60 * 60 * 24),
                        )}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Documentos</p>
                      <p className="text-2xl font-bold">{caseData.documents.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Información del Deudor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nombre Completo</p>
                    <p className="text-lg">{caseData.debtorName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cédula</p>
                    <p className="text-lg">{caseData.debtorId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tipo de Caso</p>
                    <Badge className="mt-1">{caseData.type}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Estado Actual</p>
                    <Badge className="mt-1">{caseData.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Operador Asignado</p>
                    <p className="text-lg">{caseData.operator}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Próxima Audiencia</p>
                    <p className="text-lg">
                      {caseData.hearingDate
                        ? new Date(caseData.hearingDate).toLocaleDateString("es-CO")
                        : "No programada"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creditors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Acreedores</CardTitle>
                <CardDescription>Acreedores registrados en el caso</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Acreedor</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Clase</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCreditors.map((creditor, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{creditor.name}</TableCell>
                        <TableCell>${creditor.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{creditor.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              creditor.status === "Notificado"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }
                          >
                            {creditor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos del Caso</CardTitle>
                <CardDescription>Documentos generados y subidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseData.documents.map((doc: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span>{doc}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cronología del Caso</CardTitle>
                <CardDescription>Historial de eventos y próximos pasos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTimeline.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          event.status === "completed"
                            ? "bg-green-500"
                            : event.status === "pending"
                              ? "bg-orange-500"
                              : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                      <Badge
                        variant={
                          event.status === "completed"
                            ? "default"
                            : event.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {event.status === "completed"
                          ? "Completado"
                          : event.status === "pending"
                            ? "Pendiente"
                            : "Futuro"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator">
            <AmortizationCalculator />
          </TabsContent>

          <TabsContent value="generator">
            <DocumentGenerator caseData={caseData} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Programar Audiencia
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
