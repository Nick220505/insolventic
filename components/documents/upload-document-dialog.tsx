"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, X, CheckCircle } from "lucide-react"

interface UploadDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadDocument: (documentData: any) => void
}

export function UploadDocumentDialog({ open, onOpenChange, onUploadDocument }: UploadDocumentDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    caseId: "",
    category: "",
    description: "",
    tags: "",
  })

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)

  const documentTypes = [
    "Auto de Admisión",
    "Notificación a Acreedores",
    "Suspensión Procesos Judiciales",
    "Acuerdo de Pago",
    "Tabla de Amortización",
    "Certificado REDAM",
    "Extractos Bancarios",
    "Cédula de Ciudadanía",
    "Poder Notariado",
    "Otro",
  ]

  const categories = [
    "Admisión",
    "Notificación",
    "Suspensión",
    "Acuerdo",
    "Cálculo",
    "Identificación",
    "Financiero",
    "Legal",
    "Otro",
  ]

  const cases = [
    { id: "INS-2025-001", debtorName: "María González Pérez" },
    { id: "CON-2025-002", debtorName: "Carlos Rodríguez Silva" },
    { id: "ACU-2025-003", debtorName: "Ana Martínez López" },
    { id: "INS-2025-004", debtorName: "Luis Fernando Castro" },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setUploadedFiles([...uploadedFiles, ...files])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles([...uploadedFiles, ...files])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.caseId || uploadedFiles.length === 0) {
      alert("Por favor complete todos los campos obligatorios y seleccione al menos un archivo")
      return
    }

    const selectedCase = cases.find((c) => c.id === formData.caseId)
    const file = uploadedFiles[0]

    const documentData = {
      name: formData.name,
      type: formData.type,
      caseId: formData.caseId,
      debtorName: selectedCase?.debtorName || "",
      category: formData.category,
      status: "Subido",
      size: formatFileSize(file.size),
      format: file.name.split(".").pop()?.toUpperCase() || "PDF",
      description: formData.description,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      content: `Documento subido: ${file.name}`,
    }

    onUploadDocument(documentData)
    onOpenChange(false)

    // Reset form
    setFormData({
      name: "",
      type: "",
      caseId: "",
      category: "",
      description: "",
      tags: "",
    })
    setUploadedFiles([])

    alert("✅ Documento subido exitosamente")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subir Documento</DialogTitle>
          <DialogDescription>Suba documentos al expediente de un caso específico</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload Area */}
          <Card>
            <CardContent className="p-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-sm text-gray-600 mb-4">
                  Formatos soportados: PDF, DOCX, XLSX, JPG, PNG (Máximo 10MB)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Seleccionar Archivos
                  </label>
                </Button>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium">Archivos seleccionados:</h3>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Document Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Documento *</Label>
              <Input
                id="name"
                placeholder="Ej: Auto de Admisión - INS-2025-001"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Documento *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción opcional del documento..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Etiquetas</Label>
            <Input
              id="tags"
              placeholder="Separar con comas: urgente, revision, firmado"
              value={formData.tags}
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={uploadedFiles.length === 0}>
            <Upload className="h-4 w-4 mr-2" />
            Subir Documento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
