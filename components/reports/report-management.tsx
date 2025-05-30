"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BarChart3, FileText, Download, TrendingUp, DollarSign, Clock } from "lucide-react"

export function ReportManagement() {
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const reportTypes = [
    {
      id: "cases-summary",
      name: "Resumen de Casos",
      description: "Reporte general de casos por período",
      category: "Casos",
    },
    {
      id: "creditors-analysis",
      name: "Análisis de Acreedores",
      description: "Estadísticas de acreedores y recuperación",
      category: "Acreedores",
    },
    {
      id: "agreements-report",
      name: "Reporte de Acuerdos",
      description: "Acuerdos exitosos y cumplimiento",
      category: "Acuerdos",
    },
    {
      id: "financial-analysis",
      name: "Análisis Financiero",
      description: "Montos, recuperación y eficiencia",
      category: "Financiero",
    },
    {
      id: "operator-performance",
      name: "Rendimiento de Operadores",
      description: "Productividad y eficiencia por operador",
      category: "Operadores",
    },
    {
      id: "legal-compliance",
      name: "Cumplimiento Legal",
      description: "Cumplimiento de términos y procedimientos",
      category: "Legal",
    },
  ]

  const quickStats = [
    {
      title: "Casos Este Mes",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Acuerdos Exitosos",
      value: "18",
      change: "+8%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Monto Recuperado",
      value: "$450M",
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Tiempo Promedio",
      value: "45 días",
      change: "-5%",
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  const generateReport = () => {
    if (!reportType) {
      alert("Por favor seleccione un tipo de reporte")
      return
    }

    console.log("Generando reporte:", {
      type: reportType,
      dateRange,
      startDate,
      endDate,
    })

    alert(`Generando reporte: ${reportTypes.find((r) => r.id === reportType)?.name}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reportes y Estadísticas</h1>
              <p className="text-gray-600">Genere reportes y analice estadísticas del sistema</p>
            </div>
            <Button onClick={generateReport}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {stat.change} vs mes anterior
                      </p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="generator" className="space-y-4">
            <TabsList>
              <TabsTrigger value="generator">Generador de Reportes</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuración del Reporte</CardTitle>
                      <CardDescription>Configure los parámetros para generar el reporte</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reportType">Tipo de Reporte</Label>
                        <Select value={reportType} onValueChange={setReportType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo de reporte" />
                          </SelectTrigger>
                          <SelectContent>
                            {reportTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateRange">Rango de Fechas</Label>
                        <Select value={dateRange} onValueChange={setDateRange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar período" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="today">Hoy</SelectItem>
                            <SelectItem value="week">Esta semana</SelectItem>
                            <SelectItem value="month">Este mes</SelectItem>
                            <SelectItem value="quarter">Este trimestre</SelectItem>
                            <SelectItem value="year">Este año</SelectItem>
                            <SelectItem value="custom">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {dateRange === "custom" && (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Fecha Inicio</Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endDate">Fecha Fin</Label>
                            <Input
                              id="endDate"
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      <Button onClick={generateReport} className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Generar Reporte
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tipos de Reportes Disponibles</CardTitle>
                      <CardDescription>Seleccione el tipo de reporte que desea generar</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reportTypes.map((type) => (
                          <Card
                            key={type.id}
                            className={`cursor-pointer transition-all ${
                              reportType === type.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                            }`}
                            onClick={() => setReportType(type.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{type.name}</h3>
                                <BarChart3 className="h-5 w-5 text-blue-600" />
                              </div>
                              <p className="text-sm text-gray-600">{type.description}</p>
                              <div className="mt-2">
                                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                  {type.category}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Casos por Estado</CardTitle>
                    <CardDescription>Distribución de casos según su estado actual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">En negociación</span>
                        <span className="font-medium">12 casos</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Acuerdo aprobado</span>
                        <span className="font-medium">8 casos</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "33%" }}></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Documentos pendientes</span>
                        <span className="font-medium">4 casos</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: "17%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tendencia Mensual</CardTitle>
                    <CardDescription>Casos nuevos por mes en el último año</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { month: "Enero", cases: 18 },
                        { month: "Febrero", cases: 22 },
                        { month: "Marzo", cases: 15 },
                        { month: "Abril", cases: 28 },
                        { month: "Mayo", cases: 24 },
                        { month: "Junio", cases: 31 },
                      ].map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{data.month}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${(data.cases / 31) * 100}%` }}
                              ></div>
                            </div>
                            <span className="font-medium text-sm w-8">{data.cases}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Eficiencia por Operador</CardTitle>
                    <CardDescription>Casos resueltos por operador este mes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Beatriz Helena Malavera</p>
                          <p className="text-sm text-gray-600">Operadora Principal</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">24 casos</p>
                          <p className="text-sm text-green-600">+15%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recuperación Financiera</CardTitle>
                    <CardDescription>Montos recuperados vs. deuda total</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Deuda Total</span>
                        <span className="font-medium">$1,250,000,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Monto Recuperado</span>
                        <span className="font-medium text-green-600">$450,000,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tasa de Recuperación</span>
                        <span className="font-bold text-green-600">36%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-600 h-3 rounded-full" style={{ width: "36%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Reportes</CardTitle>
                  <CardDescription>Reportes generados anteriormente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Resumen de Casos - Enero 2025",
                        type: "Casos",
                        date: "2025-01-31",
                        size: "2.4 MB",
                      },
                      {
                        name: "Análisis Financiero - Q4 2024",
                        type: "Financiero",
                        date: "2024-12-31",
                        size: "1.8 MB",
                      },
                      {
                        name: "Reporte de Acuerdos - Diciembre 2024",
                        type: "Acuerdos",
                        date: "2024-12-30",
                        size: "1.2 MB",
                      },
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-sm text-gray-600">
                              {report.type} • {new Date(report.date).toLocaleDateString("es-CO")} • {report.size}
                            </p>
                          </div>
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
          </Tabs>
        </div>
      </main>
    </div>
  )
}
