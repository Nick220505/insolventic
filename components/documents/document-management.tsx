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
import { DocumentTemplateLibrary } from "./document-template-library"
import { UploadDocumentDialog } from "./upload-document-dialog"
import { GenerateDocumentDialog } from "./generate-document-dialog"
import { DocumentViewerDialog } from "./document-viewer-dialog"
import { DocumentDetailsDialog } from "./document-details-dialog"
import { Plus, Search, Filter, Eye, Download, FileText, Upload, Folder, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [showViewerDialog, setShowViewerDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Auto de Admisión - INS-2025-001",
      type: "Auto de Admisión",
      caseId: "INS-2025-001",
      debtorName: "María González Pérez",
      category: "Admisión",
      status: "Generado",
      createdDate: "2025-01-16",
      size: "245 KB",
      format: "PDF",
      createdBy: "Beatriz Helena Malavera",
      downloadCount: 3,
      lastAccessed: "2025-01-29 10:30",
      content: "Contenido del auto de admisión...",
    },
    {
      id: 2,
      name: "Notificación Acreedores - INS-2025-001",
      type: "Notificación a Acreedores",
      caseId: "INS-2025-001",
      debtorName: "María González Pérez",
      category: "Notificación",
      status: "Enviado",
      createdDate: "2025-01-17",
      size: "189 KB",
      format: "PDF",
      createdBy: "Beatriz Helena Malavera",
      downloadCount: 5,
      lastAccessed: "2025-01-29 09:15",
      content: "Contenido de la notificación...",
    },
    {
      id: 3,
      name: "Suspensión Procesos - INS-2025-001",
      type: "Suspensión Procesos Judiciales",
      caseId: "INS-2025-001",
      debtorName: "María González Pérez",
      category: "Suspensión",
      status: "Enviado",
      createdDate: "2025-01-18",
      size: "156 KB",
      format: "PDF",
      createdBy: "Beatriz Helena Malavera",
      downloadCount: 2,
      lastAccessed: "2025-01-28 14:20",
      content: "Contenido de suspensión...",
    },
    {
      id: 4,
      name: "Acuerdo de Pago - INS-2025-004",
      type: "Acuerdo de Pago",
      caseId: "INS-2025-004",
      debtorName: "Luis Fernando Castro",
      category: "Acuerdo",
      status: "Firmado",
      createdDate: "2025-01-25",
      size: "312 KB",
      format: "PDF",
      createdBy: "Beatriz Helena Malavera",
      downloadCount: 8,
      lastAccessed: "2025-01-29 08:45",
      content: "Contenido del acuerdo...",
    },
    {
      id: 5,
      name: "Tabla Amortización - INS-2025-004",
      type: "Tabla de Amortización",
      caseId: "INS-2025-004",
      debtorName: "Luis Fernando Castro",
      category: "Cálculo",
      status: "Generado",
      createdDate: "2025-01-25",
      size: "89 KB",
      format: "XLSX",
      createdBy: "Beatriz Helena Malavera",
      downloadCount: 4,
      lastAccessed: "2025-01-28 16:30",
      content: "Tabla de amortización...",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Generado":
        return "bg-blue-100 text-blue-800"
      case "Enviado":
        return "bg-green-100 text-green-800"
      case "Firmado":
        return "bg-purple-100 text-purple-800"
      case "Pendiente":
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

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.debtorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const openDocumentViewer = (document: any) => {
    setSelectedDocument(document)
    setShowViewerDialog(true)
  }

  const openDocumentDetails = (document: any) => {
    setSelectedDocument(document)
    setShowDetailsDialog(true)
  }

  const downloadDocument = (document: any) => {
    // Increment download count
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === document.id
          ? { ...doc, downloadCount: doc.downloadCount + 1, lastAccessed: new Date().toISOString() }
          : doc,
      ),
    )
    alert(`📥 Descargando: ${document.name}`)
  }

  const handleUploadDocument = (documentData: any) => {
    const newDocument = {
      ...documentData,
      id: documents.length + 1,
      createdDate: new Date().toISOString().split("T")[0],
      createdBy: "Beatriz Helena Malavera",
      downloadCount: 0,
      lastAccessed: new Date().toISOString(),
    }
    setDocuments([...documents, newDocument])
  }

  const handleGenerateDocument = (documentData: any) => {
    const newDocument = {
      ...documentData,
      id: documents.length + 1,
      createdDate: new Date().toISOString().split("T")[0],
      createdBy: "Beatriz Helena Malavera",
      downloadCount: 0,
      lastAccessed: new Date().toISOString(),
      status: "Generado",
    }
    setDocuments([...documents, newDocument])
  }

  const deleteDocument = (documentId: number) => {
    if (confirm("¿Está seguro de que desea eliminar este documento?")) {
      setDocuments(documents.filter((doc) => doc.id !== documentId))
      alert("✅ Documento eliminado exitosamente")
    }
  }

  const archiveDocument = (documentId: number) => {
    setDocuments((docs) => docs.map((doc) => (doc.id === documentId ? { ...doc, status: "Archivado" } : doc)))
    alert("📁 Documento archivado exitosamente")
  }

  const shareDocument = (document: any) => {
    navigator.clipboard.writeText(`${window.location.origin}/documents/${document.id}`)
    alert("🔗 Enlace del documento copiado al portapapeles")
  }

  const todayDocuments = documents.filter((doc) => doc.createdDate === new Date().toISOString().split("T")[0]).length

  const pendingDocuments = documents.filter((doc) => doc.status === "Pendiente").length

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Documentos</h1>
              <p className="text-gray-600">Administre documentos legales y expedientes del sistema</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Subir Documento
              </Button>
              <Button onClick={() => setShowGenerateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Generar Documento
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Documentos</p>
                    <p className="text-2xl font-bold">{documents.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Generados Hoy</p>
                    <p className="text-2xl font-bold">{todayDocuments}</p>
                  </div>
                  <Folder className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendientes</p>
                    <p className="text-2xl font-bold">{pendingDocuments}</p>
                  </div>
                  <FileText className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Plantillas</p>
                    <p className="text-2xl font-bold">22</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="documents" className="space-y-4">
            <TabsList>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
              <TabsTrigger value="archive">Archivo</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Documentos Generados</CardTitle>
                      <CardDescription>Lista de documentos creados en el sistema</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Buscar documentos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-80"
                        />
                      </div>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas las categorías</SelectItem>
                          <SelectItem value="Admisión">Admisión</SelectItem>
                          <SelectItem value="Notificación">Notificación</SelectItem>
                          <SelectItem value="Suspensión">Suspensión</SelectItem>
                          <SelectItem value="Acuerdo">Acuerdo</SelectItem>
                          <SelectItem value="Cálculo">Cálculo</SelectItem>
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
                          <TableHead>Documento</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Caso</TableHead>
                          <TableHead>Deudor</TableHead>
                          <TableHead>Categoría</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Tamaño</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocuments.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span className="font-medium">{doc.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.caseId}</TableCell>
                            <TableCell>{doc.debtorName}</TableCell>
                            <TableCell>
                              <Badge className={getCategoryColor(doc.category)}>{doc.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                            </TableCell>
                            <TableCell>{new Date(doc.createdDate).toLocaleDateString("es-CO")}</TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">
                                {doc.size} ({doc.format})
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openDocumentViewer(doc)}
                                  title="Ver documento"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => downloadDocument(doc)}
                                  title="Descargar documento"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => openDocumentDetails(doc)}>
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => shareDocument(doc)}>Compartir</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => archiveDocument(doc.id)}>
                                      Archivar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => deleteDocument(doc.id)} className="text-red-600">
                                      Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
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

            <TabsContent value="templates">
              <DocumentTemplateLibrary />
            </TabsContent>

            <TabsContent value="archive">
              <Card>
                <CardHeader>
                  <CardTitle>Archivo de Documentos</CardTitle>
                  <CardDescription>Documentos archivados y casos cerrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.filter((doc) => doc.status === "Archivado").length === 0 ? (
                      <div className="text-center py-8">
                        <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No hay documentos archivados</p>
                      </div>
                    ) : (
                      documents
                        .filter((doc) => doc.status === "Archivado")
                        .map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-gray-600" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-gray-600">
                                  {doc.type} • {doc.caseId}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => openDocumentViewer(doc)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => downloadDocument(doc)}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Dialogs */}
      <UploadDocumentDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        onUploadDocument={handleUploadDocument}
      />

      <GenerateDocumentDialog
        open={showGenerateDialog}
        onOpenChange={setShowGenerateDialog}
        onGenerateDocument={handleGenerateDocument}
      />

      <DocumentViewerDialog open={showViewerDialog} onOpenChange={setShowViewerDialog} document={selectedDocument} />

      <DocumentDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        document={selectedDocument}
        onDownload={downloadDocument}
        onShare={shareDocument}
        onArchive={archiveDocument}
        onDelete={deleteDocument}
      />
    </div>
  )
}
