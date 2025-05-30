"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Bell, Calendar, AlertTriangle, CheckCircle, Clock, FileText, Users, Mail, Settings } from "lucide-react"

export function NotificationManagement() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "audiencia",
      title: "Audiencia programada",
      message: "Caso INS-2025-001 - María González - Audiencia en 2 horas",
      time: "2025-01-29 08:00",
      priority: "high",
      read: false,
      icon: Calendar,
    },
    {
      id: 2,
      type: "documento",
      title: "Documentos pendientes",
      message: "Caso ACU-2025-003 requiere certificado REDAM",
      time: "2025-01-28 14:30",
      priority: "medium",
      read: false,
      icon: FileText,
    },
    {
      id: 3,
      type: "vencimiento",
      title: "Plazo próximo a vencer",
      message: "Respuesta acreedores - 3 días restantes",
      time: "2025-01-28 09:15",
      priority: "high",
      read: true,
      icon: AlertTriangle,
    },
    {
      id: 4,
      type: "completado",
      title: "Proceso completado",
      message: "Caso CON-2025-005 - Acuerdo exitoso",
      time: "2025-01-27 16:45",
      priority: "low",
      read: true,
      icon: CheckCircle,
    },
    {
      id: 5,
      type: "recordatorio",
      title: "Recordatorio",
      message: "Actualizar base de datos de acreedores",
      time: "2025-01-27 10:00",
      priority: "medium",
      read: false,
      icon: Clock,
    },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return "Normal"
    }
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const highPriorityCount = notifications.filter((n) => n.priority === "high" && !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Centro de Notificaciones</h1>
              <p className="text-gray-600">Gestione alertas y notificaciones del sistema</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar todas como leídas
              </Button>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">No Leídas</p>
                    <p className="text-2xl font-bold">{unreadCount}</p>
                  </div>
                  <Bell className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Alta Prioridad</p>
                    <p className="text-2xl font-bold">{highPriorityCount}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hoy</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total</p>
                    <p className="text-2xl font-bold">{notifications.length}</p>
                  </div>
                  <Bell className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="unread">No Leídas ({unreadCount})</TabsTrigger>
              <TabsTrigger value="high">Alta Prioridad</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Todas las Notificaciones</CardTitle>
                  <CardDescription>Lista completa de notificaciones del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                          notification.read ? "bg-gray-50" : "bg-white border-blue-200"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              notification.read ? "bg-gray-100" : "bg-blue-100"
                            }`}
                          >
                            <notification.icon
                              className={`h-5 w-5 ${notification.read ? "text-gray-600" : "text-blue-600"}`}
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className={`text-sm font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}
                            >
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(notification.priority)}>
                                {getPriorityText(notification.priority)}
                              </Badge>
                              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            </div>
                          </div>
                          <p className={`text-sm mb-2 ${notification.read ? "text-gray-600" : "text-gray-700"}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              {new Date(notification.time).toLocaleString("es-CO")}
                            </p>
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                Marcar como leída
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unread">
              <Card>
                <CardHeader>
                  <CardTitle>Notificaciones No Leídas</CardTitle>
                  <CardDescription>Notificaciones que requieren su atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications
                      .filter((n) => !n.read)
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start space-x-4 p-4 rounded-lg border bg-white border-blue-200"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <notification.icon className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {getPriorityText(notification.priority)}
                                </Badge>
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                {new Date(notification.time).toLocaleString("es-CO")}
                              </p>
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                Marcar como leída
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="high">
              <Card>
                <CardHeader>
                  <CardTitle>Notificaciones de Alta Prioridad</CardTitle>
                  <CardDescription>Notificaciones urgentes que requieren atención inmediata</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications
                      .filter((n) => n.priority === "high")
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start space-x-4 p-4 rounded-lg border bg-red-50 border-red-200"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                              <notification.icon className="h-5 w-5 text-red-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                              <Badge className="bg-red-100 text-red-800">URGENTE</Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                {new Date(notification.time).toLocaleString("es-CO")}
                              </p>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  Ver Detalles
                                </Button>
                                {!notification.read && (
                                  <Button size="sm" onClick={() => markAsRead(notification.id)}>
                                    Marcar como leída
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Notificaciones</CardTitle>
                    <CardDescription>Configure qué notificaciones desea recibir</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Audiencias programadas</p>
                        <p className="text-sm text-gray-600">Notificaciones de audiencias próximas</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Documentos pendientes</p>
                        <p className="text-sm text-gray-600">Alertas de documentos faltantes</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Vencimiento de plazos</p>
                        <p className="text-sm text-gray-600">Recordatorios de plazos próximos a vencer</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Procesos completados</p>
                        <p className="text-sm text-gray-600">Notificaciones de casos finalizados</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Canales de Notificación</CardTitle>
                    <CardDescription>Seleccione cómo desea recibir las notificaciones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Notificaciones en pantalla</p>
                          <p className="text-sm text-gray-600">Alertas dentro del sistema</p>
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Correo electrónico</p>
                          <p className="text-sm text-gray-600">Notificaciones por email</p>
                        </div>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Notificaciones push</p>
                          <p className="text-sm text-gray-600">Alertas del navegador</p>
                        </div>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
