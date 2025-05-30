"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Video, Users, Clock, FileText, CheckCircle, AlertTriangle } from "lucide-react"

interface HearingDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hearing: any
}

export function HearingDetailsDialog({ open, onOpenChange, hearing }: HearingDetailsDialogProps) {
  const [attendees, setAttendees] = useState([
    { name: "María González Pérez", role: "Deudor", status: "Presente", vote: "" },
    { name: "Banco Nacional", role: "Acreedor", status: "Presente", vote: "Positivo" },
    { name: "Cooperativa Financiera", role: "Acreedor", status: "Ausente", vote: "" },
    { name: "Tarjeta XYZ", role: "Acreedor", status: "Presente", vote: "Negativo" },
  ])

  const [hearingNotes, setHearingNotes] = useState("")
  const [hearingStatus, setHearingStatus] = useState("En curso")
  const [nextSteps, setNextSteps] = useState("")

  if (!hearing) return null

  const updateAttendeeStatus = (index: number, status: string) => {
    setAttendees((prev) => prev.map((attendee, i) => (i === index ? { ...attendee, status } : attendee)))
  }

  const updateAttendeeVote = (index: number, vote: string) => {
    setAttendees((prev) => prev.map((attendee, i) => (i === index ? { ...attendee, vote } : attendee)))
  }

  const saveHearingData = () => {
    console.log("Guardando datos de audiencia:", {
      hearing,
      attendees,
      notes: hearingNotes,
      status: hearingStatus,
      nextSteps,
    })
    alert("✅ Datos de audiencia guardados exitosamente")
  }

  const generateHearingDocument = () => {
    alert("📄 Generando acta de audiencia...")
  }

  const joinZoomMeeting = () => {
    window.open(`https://zoom.us/j/${hearing.zoomId.replace(/\s/g, "")}`, "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Audiencia - {hearing.debtorName}</DialogTitle>
          <DialogDescription>
            Caso {hearing.caseId} • {new Date(hearing.date).toLocaleDateString("es-CO")} • {hearing.time}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="attendees">Asistentes</TabsTrigger>
            <TabsTrigger value="voting">Votación</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información de la Audiencia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Fecha</Label>
                      <p className="text-sm font-medium">{new Date(hearing.date).toLocaleDateString("es-CO")}</p>
                    </div>
                    <div>
                      <Label>Hora</Label>
                      <p className="text-sm font-medium">{hearing.time}</p>
                    </div>
                    <div>
                      <Label>Tipo</Label>
                      <Badge variant="outline">{hearing.type}</Badge>
                    </div>
                    <div>
                      <Label>Estado</Label>
                      <Select value={hearingStatus} onValueChange={setHearingStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Programada">Programada</SelectItem>
                          <SelectItem value="En curso">En curso</SelectItem>
                          <SelectItem value="Suspendida">Suspendida</SelectItem>
                          <SelectItem value="Completada">Completada</SelectItem>
                          <SelectItem value="Cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Operador</Label>
                    <p className="text-sm font-medium">{hearing.operator}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas de la Audiencia</Label>
                    <Textarea
                      id="notes"
                      placeholder="Registre las observaciones y desarrollo de la audiencia..."
                      value={hearingNotes}
                      onChange={(e) => setHearingNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nextSteps">Próximos Pasos</Label>
                    <Textarea
                      id="nextSteps"
                      placeholder="Defina las acciones a seguir..."
                      value={nextSteps}
                      onChange={(e) => setNextSteps(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Acceso Virtual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Video className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium">Reunión Zoom</h3>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">ID de Reunión</Label>
                        <p className="font-mono text-sm">{hearing.zoomId}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Código de Acceso</Label>
                        <p className="font-mono text-sm">{hearing.zoomPassword}</p>
                      </div>
                      <Button onClick={joinZoomMeeting} className="w-full mt-3">
                        <Video className="h-4 w-4 mr-2" />
                        Unirse a la Reunión
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <Users className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                      <p className="text-sm font-medium">{hearing.creditors}</p>
                      <p className="text-xs text-gray-600">Acreedores</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <Clock className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                      <p className="text-sm font-medium">45 min</p>
                      <p className="text-xs text-gray-600">Duración est.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Control de Asistencia</CardTitle>
                <CardDescription>Registre la asistencia de los participantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium">{attendee.name}</p>
                          <p className="text-sm text-gray-600">{attendee.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select value={attendee.status} onValueChange={(value) => updateAttendeeStatus(index, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Presente">Presente</SelectItem>
                            <SelectItem value="Ausente">Ausente</SelectItem>
                            <SelectItem value="Tardío">Tardío</SelectItem>
                          </SelectContent>
                        </Select>
                        {attendee.status === "Presente" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Votación</CardTitle>
                <CardDescription>Registre el sentido del voto de cada acreedor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendees
                    .filter((a) => a.role === "Acreedor")
                    .map((attendee, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{attendee.name}</p>
                          <p className="text-sm text-gray-600">Acreedor</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select value={attendee.vote} onValueChange={(value) => updateAttendeeVote(index, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Voto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Positivo">Positivo</SelectItem>
                              <SelectItem value="Negativo">Negativo</SelectItem>
                              <SelectItem value="Abstención">Abstención</SelectItem>
                            </SelectContent>
                          </Select>
                          {attendee.vote === "Positivo" && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {attendee.vote === "Negativo" && <AlertTriangle className="h-5 w-5 text-red-600" />}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Resultado de la Votación</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {attendees.filter((a) => a.vote === "Positivo").length}
                      </p>
                      <p className="text-sm text-gray-600">Positivos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {attendees.filter((a) => a.vote === "Negativo").length}
                      </p>
                      <p className="text-sm text-gray-600">Negativos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-600">
                        {attendees.filter((a) => a.vote === "Abstención").length}
                      </p>
                      <p className="text-sm text-gray-600">Abstenciones</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos de la Audiencia</CardTitle>
                <CardDescription>Genere y gestione documentos relacionados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={generateHearingDocument} variant="outline" className="h-20">
                    <div className="text-center">
                      <FileText className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-sm">Acta de Audiencia</p>
                    </div>
                  </Button>
                  <Button onClick={() => alert("Generando formato de votación...")} variant="outline" className="h-20">
                    <div className="text-center">
                      <FileText className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-sm">Sentido del Voto</p>
                    </div>
                  </Button>
                  <Button onClick={() => alert("Generando lista de asistencia...")} variant="outline" className="h-20">
                    <div className="text-center">
                      <FileText className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-sm">Lista de Asistencia</p>
                    </div>
                  </Button>
                  <Button onClick={() => alert("Generando acuerdo de pago...")} variant="outline" className="h-20">
                    <div className="text-center">
                      <FileText className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-sm">Acuerdo de Pago</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button onClick={saveHearingData}>Guardar Cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
