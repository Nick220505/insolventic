"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Wand2 } from "lucide-react"

interface GenerateDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerateDocument: (documentData: any) => void
}

export function GenerateDocumentDialog({ open, onOpenChange, onGenerateDocument }: GenerateDocumentDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [formData, setFormData] = useState({
    caseId: "",
    customName: "",
    additionalInfo: "",
    hearingDate: "",
    hearingTime: "",
    zoomId: "",
    zoomPassword: "",
    paymentTerms: "",
    monthlyAmount: "",
  })

  const documentTemplates = [
    {
      id: "solicitud",
      name: "Solicitud de Insolvencia",
      description: "Solicitud inicial para proceso de insolvencia",
      category: "Inicial",
      requiredFields: ["caseId"],
    },
    {
      id: "auto-admision",
      name: "Auto de Admisión",
      description: "Auto que admite el proceso de insolvencia",
      category: "Admisión",
      requiredFields: ["caseId", "hearingDate", "hearingTime"],
    },
    {
      id: "edicto",
      name: "Edicto Emplazatorio",
      description: "Edicto para publicación en periódico",
      category: "Notificación",
      requiredFields: ["caseId"],
    },
    {
      id: "notificacion-acreedores",
      name: "Notificación a Acreedores",
      description: "Notificación formal a los acreedores",
      category: "Notificación",
      requiredFields: ["caseId"],
    },
    {
      id: "suspension-juzgados",
      name: "Suspensión Procesos Judiciales",
      description: "Comunicación para suspender procesos judiciales",
      category: "Suspensión",
      requiredFields: ["caseId"],
    },
    {
      id: "acuerdo-pago",
      name: "Acuerdo de Pago",
      description: "Acta de acuerdo de pago con acreedores",
      category: "Acuerdo",
      requiredFields: ["caseId", "paymentTerms", "monthlyAmount"],
    },
    {
      id: "tabla-amortizacion",
      name: "Tabla de Amortización",
      description: "Tabla de amortización del acuerdo de pago",
      category: "Cálculo",
      requiredFields: ["caseId", "paymentTerms", "monthlyAmount"],
    },
  ]

  const cases = [
    { id: "INS-2025-001", debtorName: "María González Pérez", type: "Insolvencia" },
    { id: "CON-2025-002", debtorName: "Carlos Rodríguez Silva", type: "Conciliación" },
    { id: "ACU-2025-003", debtorName: "Ana Martínez López", type: "Acuerdo de Apoyo" },
    { id: "INS-2025-004", debtorName: "Luis Fernando Castro", type: "Insolvencia" },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Inicial":
        return "bg-blue-100 text-blue-800"
      case "Admisión":
        return "bg-green-100 text-green-800"
      case "Notificación":
        return "bg-yellow-100 text-yellow-800"
      case "Suspensión":
        return "bg-red-100 text-red-800"
      case "Acuerdo":
        return "bg-purple-100 text-purple-800"
      case "Cálculo":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const selectedTemplateData = documentTemplates.find((t) => t.id === selectedTemplate)
  const selectedCase = cases.find((c) => c.id === formData.caseId)

  const requiresHearing = selectedTemplate === "auto-admision"
  const requiresPayment = ["acuerdo-pago", "tabla-amortizacion"].includes(selectedTemplate)

  const handleGenerate = () => {
    if (!selectedTemplate || !formData.caseId) {
      alert("Por favor seleccione una plantilla y un caso")
      return
    }

    const template = documentTemplates.find((t) => t.id === selectedTemplate)
    if (!template) return

    // Validate required fields
    const missingFields = template.requiredFields.filter((field) => {
      if (field === "caseId") return !formData.caseId
      if (field === "hearingDate") return !formData.hearingDate
      if (field === "hearingTime") return !formData.hearingTime
      if (field === "paymentTerms") return !formData.paymentTerms
      if (field === "monthlyAmount") return !formData.monthlyAmount
      return false
    })

    if (missingFields.length > 0) {
      alert(`Por favor complete los campos obligatorios: ${missingFields.join(", ")}`)
      return
    }

    const documentName = formData.customName || `${template.name} - ${formData.caseId}`

    const documentData = {
      name: documentName,
      type: template.name,
      caseId: formData.caseId,
      debtorName: selectedCase?.debtorName || "",
      category: template.category,
      size: `${Math.floor(Math.random() * 300) + 100} KB`,
      format: selectedTemplate === "tabla-amortizacion" ? "XLSX" : "PDF",
      content: `Documento generado: ${template.name}`,
      additionalInfo: formData.additionalInfo,
      hearingDate: formData.hearingDate,
      hearingTime: formData.hearingTime,
      zoomId: formData.zoomId,
      zoomPassword: formData.zoomPassword,
      paymentTerms: formData.paymentTerms,
      monthlyAmount: formData.monthlyAmount,
    }

    onGenerateDocument(documentData)
    onOpenChange(false)

    // Reset form
    setSelectedTemplate("")
    setFormData({
      caseId: "",
      customName: "",
      additionalInfo: "",
      hearingDate: "",
      hearingTime: "",
      zoomId: "",
      zoomPassword: "",
      paymentTerms: "",
      monthlyAmount: "",
    })

    alert("✅ Documento generado exitosamente")
  }

  const previewDocument = () => {
    if (!selectedTemplate) {
      alert("Por favor seleccione una plantilla")
      return
    }
    alert(`👁️ Vista previa del documento: ${selectedTemplateData?.name}`)
  }

  const generateZoomCredentials = () => {
    const zoomId = Math.floor(Math.random() * 900000000) + 100000000
    const password = Math.random().toString(36).substring(2, 8)

    setFormData((prev) => ({
      ...prev,
      zoomId: zoomId.toString().replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"),
      zoomPassword: password,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generar Documento Legal</DialogTitle>
          <DialogDescription>
            Seleccione una plantilla y configure los parámetros para generar un documento legal
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Seleccionar Plantilla</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplate === template.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-medium mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Configuration */}
          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Documento</CardTitle>
                <CardDescription>Configure los parámetros para: {selectedTemplateData?.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="caseId">Caso Asociado *</Label>
                    <Select
                      value={formData.caseId}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, caseId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar caso" />
                      </SelectTrigger>
                      <SelectContent>
                        {cases.map((case_) => (
                          <SelectItem key={case_.id} value={case_.id}>
                            {case_.id} - {case_.debtorName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customName">Nombre Personalizado</Label>
                    <Input
                      id="customName"
                      placeholder={`${selectedTemplateData?.name} - ${formData.caseId || "CASO"}`}
                      value={formData.customName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customName: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Hearing Configuration */}
                {requiresHearing && (
                  <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Configuración de Audiencia</h3>
                      <Button onClick={generateZoomCredentials} variant="outline" size="sm">
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generar Zoom
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hearingDate">Fecha de Audiencia *</Label>
                        <Input
                          id="hearingDate"
                          type="date"
                          value={formData.hearingDate}
                          onChange={(e) => setFormData((prev) => ({ ...prev, hearingDate: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hearingTime">Hora de Audiencia *</Label>
                        <Input
                          id="hearingTime"
                          type="time"
                          value={formData.hearingTime}
                          onChange={(e) => setFormData((prev) => ({ ...prev, hearingTime: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zoomId">ID de Reunión Zoom</Label>
                        <Input
                          id="zoomId"
                          placeholder="123 456 7890"
                          value={formData.zoomId}
                          onChange={(e) => setFormData((prev) => ({ ...prev, zoomId: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zoomPassword">Código de Acceso</Label>
                        <Input
                          id="zoomPassword"
                          placeholder="password123"
                          value={formData.zoomPassword}
                          onChange={(e) => setFormData((prev) => ({ ...prev, zoomPassword: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Configuration */}
                {requiresPayment && (
                  <div className="space-y-4 p-4 border rounded-lg bg-green-50">
                    <h3 className="font-medium">Configuración de Pago</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paymentTerms">Plazo de Pago (meses) *</Label>
                        <Input
                          id="paymentTerms"
                          type="number"
                          placeholder="24"
                          value={formData.paymentTerms}
                          onChange={(e) => setFormData((prev) => ({ ...prev, paymentTerms: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="monthlyAmount">Cuota Mensual *</Label>
                        <Input
                          id="monthlyAmount"
                          type="number"
                          placeholder="500000"
                          value={formData.monthlyAmount}
                          onChange={(e) => setFormData((prev) => ({ ...prev, monthlyAmount: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Información Adicional</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Información adicional para incluir en el documento..."
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Document Preview */}
          {selectedTemplate && formData.caseId && (
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa del Documento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">
                        {formData.customName || `${selectedTemplateData?.name} - ${formData.caseId}`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Caso: {formData.caseId} - {selectedCase?.debtorName}
                      </p>
                    </div>
                    <Badge className={getCategoryColor(selectedTemplateData?.category || "")}>
                      {selectedTemplateData?.category}
                    </Badge>
                  </div>

                  {requiresHearing && formData.hearingDate && (
                    <div className="mb-2">
                      <p className="text-sm">
                        <strong>Audiencia:</strong> {new Date(formData.hearingDate).toLocaleDateString("es-CO")}
                        {formData.hearingTime && ` a las ${formData.hearingTime}`}
                      </p>
                      {formData.zoomId && (
                        <p className="text-sm">
                          <strong>Zoom:</strong> {formData.zoomId}
                        </p>
                      )}
                    </div>
                  )}

                  {requiresPayment && formData.paymentTerms && (
                    <div className="mb-2">
                      <p className="text-sm">
                        <strong>Plazo:</strong> {formData.paymentTerms} meses
                      </p>
                      {formData.monthlyAmount && (
                        <p className="text-sm">
                          <strong>Cuota:</strong> ${Number(formData.monthlyAmount).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          {selectedTemplate && (
            <Button onClick={previewDocument} variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </Button>
          )}
          <Button onClick={handleGenerate} disabled={!selectedTemplate || !formData.caseId}>
            <FileText className="h-4 w-4 mr-2" />
            Generar Documento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
