"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Filter, Eye, Download, Edit } from "lucide-react"

export function DocumentTemplateLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const templates = [
    {
      id: "solicitud",
      name: "Solicitud de Insolvencia",
      description: "Solicitud inicial para proceso de insolvencia",
      category: "Inicial",
      usage: 45,
      lastUpdated: "2025-01-10",
    },
    {
      id: "auto-admision",
      name: "Auto de Admisión",
      description: "Auto que admite el proceso de insolvencia",
      category: "Admisión",
      usage: 42,
      lastUpdated: "2025-01-08",
    },
    {
      id: "edicto",
      name: "Edicto Emplazatorio",
      description: "Edicto para publicación en periódico",
      category: "Notificación",
      usage: 38,
      lastUpdated: "2025-01-05",
    },
    {
      id: "notificacion-acreedores",
      name: "Notificación a Acreedores",
      description: "Notificación formal a los acreedores",
      category: "Notificación",
      usage: 41,
      lastUpdated: "2025-01-07",
    },
    {
      id: "suspension-juzgados",
      name: "Suspensión Procesos Judiciales",
      description: "Comunicación para suspender procesos judiciales",
      category: "Suspensión",
      usage: 35,
      lastUpdated: "2025-01-06",
    },
    {
      id: "suspension-pagador",
      name: "Suspensión de Pagos",
      description: "Notificación al pagador para suspender descuentos",
      category: "Suspensión",
      usage: 33,
      lastUpdated: "2025-01-04",
    },
    {
      id: "suspension-garantia",
      name: "Suspensión Garantía Mobiliaria",
      description: "Suspensión proceso coactivo garantía mobiliaria",
      category: "Suspensión",
      usage: 12,
      lastUpdated: "2025-01-03",
    },
    {
      id: "calificacion-graduacion",
      name: "Calificación y Graduación de Créditos",
      description: "Cuadro de calificación y graduación de créditos",
      category: "Calificación",
      usage: 40,
      lastUpdated: "2025-01-09",
    },
    {
      id: "acuerdo-pago",
      name: "Acuerdo de Pago",
      description: "Acta de acuerdo de pago con acreedores",
      category: "Acuerdo",
      usage: 28,
      lastUpdated: "2025-01-02",
    },
    {
      id: "acuerdo-bilateral",
      name: "Acuerdo Bilateral",
      description: "Acuerdo bilateral con acreedor específico",
      category: "Acuerdo",
      usage: 15,
      lastUpdated: "2025-01-01",
    },
    {
      id: "auto-incumplimiento",
      name: "Auto por Incumplimiento",
      description: "Auto por incumplimiento de acuerdo",
      category: "Incumplimiento",
      usage: 8,
      lastUpdated: "2024-12-28",
    },
    {
      id: "auto-reforma",
      name: "Auto Solicitud Reforma del Acuerdo",
      description: "Solicitud de audiencia para reforma del acuerdo",
      category: "Reforma",
      usage: 6,
      lastUpdated: "2024-12-25",
    },
    {
      id: "auto-cierre",
      name: "Auto de Cierre",
      description: "Auto de cierre por inasistencia",
      category: "Cierre",
      usage: 12,
      lastUpdated: "2024-12-20",
    },
    {
      id: "auto-desistimiento",
      name: "Auto de Desistimiento",
      description: "Auto de desistimiento del proceso",
      category: "Cierre",
      usage: 9,
      lastUpdated: "2024-12-18",
    },
    {
      id: "fracaso-gastos",
      name: "Fracaso por Falta de Pago de Gastos",
      description: "Constancia de no acuerdo por falta de pago de gastos de administración",
      category: "Fracaso",
      usage: 4,
      lastUpdated: "2024-12-15",
    },
    {
      id: "fracaso-fallecimiento",
      name: "Fracaso por Fallecimiento",
      description: "Constancia de no acuerdo por fallecimiento del deudor",
      category: "Fracaso",
      usage: 2,
      lastUpdated: "2024-12-10",
    },
    {
      id: "fracaso-terminos",
      name: "Fracaso por Vencimiento de Términos",
      description: "Constancia de no acuerdo por vencimiento de términos",
      category: "Fracaso",
      usage: 7,
      lastUpdated: "2024-12-08",
    },
    {
      id: "fracaso-votacion",
      name: "Fracaso por Votación Negativa",
      description: "Constancia de no acuerdo por votación negativa de acreedores",
      category: "Fracaso",
      usage: 11,
      lastUpdated: "2024-12-05",
    },
    {
      id: "fracaso-quorum",
      name: "Fracaso por Falta de Quorum",
      description: "Constancia de no acuerdo por falta de asistencia de acreedores",
      category: "Fracaso",
      usage: 5,
      lastUpdated: "2024-12-03",
    },
    {
      id: "fracaso-reforma",
      name: "Fracaso en Reforma de Acuerdo",
      description: "Constancia de no acuerdo en reforma del acuerdo de pago",
      category: "Fracaso",
      usage: 3,
      lastUpdated: "2024-12-01",
    },
    {
      id: "remision-resultado",
      name: "Remisión de Resultado",
      description: "Comunicación de resultado final",
      category: "Finalización",
      usage: 25,
      lastUpdated: "2024-11-28",
    },
    {
      id: "hoja-ruta",
      name: "Hoja de Ruta",
      description: "Hoja guía para seguimiento del proceso",
      category: "Control",
      usage: 30,
      lastUpdated: "2024-11-25",
    },
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
      case "Calificación":
        return "bg-purple-100 text-purple-800"
      case "Acuerdo":
        return "bg-emerald-100 text-emerald-800"
      case "Incumplimiento":
        return "bg-orange-100 text-orange-800"
      case "Reforma":
        return "bg-indigo-100 text-indigo-800"
      case "Cierre":
        return "bg-gray-100 text-gray-800"
      case "Fracaso":
        return "bg-red-100 text-red-800"
      case "Finalización":
        return "bg-teal-100 text-teal-800"
      case "Control":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(templates.map((t) => t.category))]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Biblioteca de Plantillas</CardTitle>
              <CardDescription>Plantillas de documentos legales disponibles en el sistema</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar plantillas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                    </div>
                    <span className="text-sm text-gray-500">{template.usage} usos</span>
                  </div>

                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>Actualizado: {new Date(template.lastUpdated).toLocaleDateString("es-CO")}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Vista Previa
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Plantillas Más Usadas</p>
                <p className="text-lg font-bold">Solicitud de Insolvencia</p>
                <p className="text-sm text-gray-500">45 usos este mes</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categoría Principal</p>
                <p className="text-lg font-bold">Notificación</p>
                <p className="text-sm text-gray-500">79 documentos generados</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plantillas</p>
                <p className="text-lg font-bold">{templates.length}</p>
                <p className="text-sm text-gray-500">Disponibles en el sistema</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
