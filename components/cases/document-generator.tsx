"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Download } from "lucide-react"

interface DocumentGeneratorProps {
  caseData?: any
}

export function DocumentGenerator({ caseData }: DocumentGeneratorProps) {
  const [selectedDocument, setSelectedDocument] = useState("")
  const [documentData, setDocumentData] = useState({
    hearingDate: "",
    hearingTime: "",
    zoomId: "",
    zoomPassword: "",
    additionalInfo: "",
    proposalDetails: "",
    paymentTerms: "",
    monthlyAmount: "",
  })

  const documentTemplates = [
    {
      id: "solicitud",
      name: "Solicitud de Insolvencia",
      description: "Solicitud inicial para proceso de insolvencia",
      category: "Inicial",
    },
    {
      id: "auto-admision",
      name: "Auto de Admisión",
      description: "Auto que admite el proceso de insolvencia",
      category: "Admisión",
    },
    {
      id: "edicto",
      name: "Edicto Emplazatorio",
      description: "Edicto para publicación en periódico",
      category: "Notificación",
    },
    {
      id: "notificacion-acreedores",
      name: "Notificación a Acreedores",
      description: "Notificación formal a los acreedores",
      category: "Notificación",
    },
    {
      id: "suspension-juzgados",
      name: "Suspensión Procesos Judiciales",
      description: "Comunicación para suspender procesos judiciales",
      category: "Suspensión",
    },
    {
      id: "suspension-pagador",
      name: "Suspensión de Pagos",
      description: "Notificación al pagador para suspender descuentos",
      category: "Suspensión",
    },
    {
      id: "suspension-garantia",
      name: "Suspensión Garantía Mobiliaria",
      description: "Suspensión proceso coactivo garantía mobiliaria",
      category: "Suspensión",
    },
    {
      id: "calificacion-graduacion",
      name: "Calificación y Graduación de Créditos",
      description: "Cuadro de calificación y graduación de créditos",
      category: "Calificación",
    },
    {
      id: "audiencia-negociacion",
      name: "Acta de Audiencia de Negociación",
      description: "Desarrollo de audiencia de negociación de deudas según Art. 550 CGP",
      category: "Audiencia",
    },
    {
      id: "sentido-voto",
      name: "Sentido del Voto",
      description: "Formato para registro de votación de acreedores",
      category: "Audiencia",
    },
    {
      id: "acuerdo-pago",
      name: "Acuerdo de Pago",
      description: "Acta de acuerdo de pago con acreedores",
      category: "Acuerdo",
    },
    {
      id: "reforma-acuerdo",
      name: "Reforma del Acuerdo de Pago",
      description: "Acta de reforma del acuerdo de pago existente",
      category: "Acuerdo",
    },
    {
      id: "acuerdo-bilateral",
      name: "Acuerdo Bilateral",
      description: "Acuerdo bilateral con acreedor específico",
      category: "Acuerdo",
    },
    {
      id: "auto-incumplimiento",
      name: "Auto por Incumplimiento",
      description: "Auto por incumplimiento de acuerdo",
      category: "Incumplimiento",
    },
    {
      id: "auto-reforma",
      name: "Auto Solicitud Reforma del Acuerdo",
      description: "Solicitud de audiencia para reforma del acuerdo",
      category: "Reforma",
    },
    {
      id: "auto-cierre",
      name: "Auto de Cierre",
      description: "Auto de cierre por inasistencia",
      category: "Cierre",
    },
    {
      id: "auto-desistimiento",
      name: "Auto de Desistimiento",
      description: "Auto de desistimiento del proceso",
      category: "Cierre",
    },
    {
      id: "fracaso-gastos",
      name: "Fracaso por Falta de Pago de Gastos",
      description: "Constancia de no acuerdo por falta de pago de gastos de administración",
      category: "Fracaso",
    },
    {
      id: "fracaso-fallecimiento",
      name: "Fracaso por Fallecimiento",
      description: "Constancia de no acuerdo por fallecimiento del deudor",
      category: "Fracaso",
    },
    {
      id: "fracaso-terminos",
      name: "Fracaso por Vencimiento de Términos",
      description: "Constancia de no acuerdo por vencimiento de términos",
      category: "Fracaso",
    },
    {
      id: "fracaso-votacion",
      name: "Fracaso por Votación Negativa",
      description: "Constancia de no acuerdo por votación negativa de acreedores",
      category: "Fracaso",
    },
    {
      id: "fracaso-quorum",
      name: "Fracaso por Falta de Quorum",
      description: "Constancia de no acuerdo por falta de asistencia de acreedores",
      category: "Fracaso",
    },
    {
      id: "fracaso-reforma",
      name: "Fracaso en Reforma de Acuerdo",
      description: "Constancia de no acuerdo en reforma del acuerdo de pago",
      category: "Fracaso",
    },
    {
      id: "remision-juzgado",
      name: "Remisión de Expediente a Juzgado",
      description: "Comunicación de remisión de expediente para liquidación patrimonial",
      category: "Finalización",
    },
    {
      id: "remision-resultado",
      name: "Remisión de Resultado",
      description: "Comunicación de resultado final",
      category: "Finalización",
    },
    {
      id: "hoja-ruta",
      name: "Hoja de Ruta",
      description: "Hoja guía para seguimiento del proceso",
      category: "Control",
    },
  ]

  const generateDocument = () => {
    if (!selectedDocument) {
      alert("Por favor seleccione un tipo de documento")
      return
    }

    const template = documentTemplates.find((doc) => doc.id === selectedDocument)
    console.log("Generando documento:", selectedDocument, "with data:", documentData)

    // Simular generación de documento
    setTimeout(() => {
      alert(`✅ Documento "${template?.name}" generado exitosamente`)
    }, 1000)
  }

  const previewDocument = () => {
    if (!selectedDocument) {
      alert("Por favor seleccione un tipo de documento")
      return
    }

    const template = documentTemplates.find((doc) => doc.id === selectedDocument)
    console.log("Previewing document:", selectedDocument)
    alert(`👁️ Vista previa del documento "${template?.name}"`)
  }

  const downloadTemplate = (templateId: string) => {
    const template = documentTemplates.find((doc) => doc.id === templateId)
    alert(`📥 Descargando plantilla: ${template?.name}`)
  }

  const categories = [...new Set(documentTemplates.map((doc) => doc.category))]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generador de Documentos Legales</CardTitle>
          <CardDescription>
            Genere documentos legales automáticamente basados en las plantillas del sistema INSOLVENTIC
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Documento</Label>
              <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar documento" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <div key={category}>
                      <div className="px-2 py-1 text-sm font-medium text-gray-500 bg-gray-50">{category}</div>
                      {documentTemplates
                        .filter((doc) => doc.category === category)
                        .map((doc) => (
                          <SelectItem key={doc.id} value={doc.id}>
                            {doc.name}
                          </SelectItem>
                        ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDocument && (
              <div className="space-y-2">
                <Label>Descripción</Label>
                <p className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  {documentTemplates.find((doc) => doc.id === selectedDocument)?.description}
                </p>
              </div>
            )}
          </div>

          {(selectedDocument === "auto-admision" || selectedDocument === "audiencia-negociacion") && (
            <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
              <h3 className="font-medium">Configuración de Audiencia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hearingDate">Fecha de Audiencia</Label>
                  <Input
                    id="hearingDate"
                    type="date"
                    value={documentData.hearingDate}
                    onChange={(e) => setDocumentData((prev) => ({ ...prev, hearingDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hearingTime">Hora de Audiencia</Label>
                  <Input
                    id="hearingTime"
                    type="time"
                    value={documentData.hearingTime}
                    onChange={(e) => setDocumentData((prev) => ({ ...prev, hearingTime: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoomId">ID de Reunión Zoom</Label>
                  <Input
                    id="zoomId"
                    placeholder="123 456 7890"
                    value={documentData.zoomId}
                    onChange={(e) => setDocumentData((prev) => ({ ...prev, zoomId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoomPassword">Código de Acceso</Label>
                  <Input
                    id="zoomPassword"
                    placeholder="password123"
                    value={documentData.zoomPassword}
                    onChange={(e) => setDocumentData((prev) => ({ ...prev, zoomPassword: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {(selectedDocument === "sentido-voto" ||
            selectedDocument === "acuerdo-pago" ||
            selectedDocument === "reforma-acuerdo") && (
            <div className="space-y-4 p-4 border rounded-lg bg-green-50">
              <h3 className="font-medium">Detalles de la Propuesta</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Plazo de Pago (meses)</Label>
                  <Input
                    id="paymentTerms"
                    type="number"
                    placeholder="24"
                    value={documentData.paymentTerms}
                    onChange={(e) => setDocumentData((prev) => ({ ...prev, paymentTerms: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyAmount">Cuota Mensual</Label>
                  <Input
                    id="monthlyAmount"
                    type="number"
                    placeholder="500000"
                    value={documentData.monthlyAmount}
                    onChange={(e) => setDocumentData((prev) => ({ ...prev, monthlyAmount: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposalDetails">Detalles de la Propuesta</Label>
                <Textarea
                  id="proposalDetails"
                  placeholder="Descripción detallada de la propuesta de pago..."
                  value={documentData.proposalDetails}
                  onChange={(e) => setDocumentData((prev) => ({ ...prev, proposalDetails: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
          )}

          {selectedDocument && (
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Información Adicional</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Información adicional para el documento..."
                value={documentData.additionalInfo}
                onChange={(e) => setDocumentData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                rows={3}
              />
            </div>
          )}

          {selectedDocument && (
            <div className="flex space-x-2">
              <Button onClick={previewDocument} variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              <Button onClick={generateDocument}>
                <FileText className="h-4 w-4 mr-2" />
                Generar Documento
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Biblioteca de Plantillas Legales</CardTitle>
          <CardDescription>Plantillas de documentos legales del sistema INSOLVENTIC</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{template.category}</Badge>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadTemplate(template.id)}
                        title="Descargar plantilla"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setSelectedDocument(template.id)}>
                    Seleccionar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
