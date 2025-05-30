"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react"

export function NotificationPanel() {
  const notifications = [
    {
      id: 1,
      type: "audiencia",
      title: "Audiencia programada",
      message: "Caso INS-2025-001 - María González",
      time: "2 horas",
      priority: "high",
      icon: Calendar,
    },
    {
      id: 2,
      type: "documento",
      title: "Documentos pendientes",
      message: "Caso ACU-2025-003 requiere certificado REDAM",
      time: "1 día",
      priority: "medium",
      icon: FileText,
    },
    {
      id: 3,
      type: "vencimiento",
      title: "Plazo próximo a vencer",
      message: "Respuesta acreedores - 3 días restantes",
      time: "3 días",
      priority: "high",
      icon: AlertTriangle,
    },
    {
      id: 4,
      type: "completado",
      title: "Proceso completado",
      message: "Caso CON-2025-005 - Acuerdo exitoso",
      time: "2 días",
      priority: "low",
      icon: CheckCircle,
    },
    {
      id: 5,
      type: "recordatorio",
      title: "Recordatorio",
      message: "Actualizar base de datos de acreedores",
      time: "1 semana",
      priority: "medium",
      icon: Clock,
    },
  ]

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Notificaciones</span>
        </CardTitle>
        <CardDescription>Alertas y recordatorios importantes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start space-x-3 p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <notification.icon className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">{notification.title}</h4>
                <Badge className={getPriorityColor(notification.priority)}>
                  {getPriorityText(notification.priority)}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
              <p className="text-xs text-gray-400">Hace {notification.time}</p>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/notifications")}>
          Ver todas las notificaciones
        </Button>
      </CardContent>
    </Card>
  )
}
