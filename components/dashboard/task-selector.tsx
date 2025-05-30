"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Calendar, Settings, Database, BarChart3, Bell, UserCheck } from "lucide-react"

export function TaskSelector() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const router = useRouter()

  const tasks = [
    {
      id: "cases",
      title: "Gestión de Casos",
      description: "Administrar casos de insolvencia y conciliación",
      icon: FileText,
      color: "bg-blue-100 text-blue-700",
      count: 24,
      route: "/cases",
    },
    {
      id: "creditors",
      title: "Gestión de Acreedores",
      description: "Administrar información de acreedores y deudores",
      icon: Users,
      color: "bg-green-100 text-green-700",
      count: 156,
      route: "/creditors",
    },
    {
      id: "hearings",
      title: "Audiencias",
      description: "Programar y gestionar audiencias de negociación",
      icon: Calendar,
      color: "bg-purple-100 text-purple-700",
      count: 8,
      route: "/hearings",
    },
    {
      id: "documents",
      title: "Documentos",
      description: "Gestionar documentos legales y expedientes",
      icon: Database,
      color: "bg-orange-100 text-orange-700",
      count: 342,
      route: "/documents",
    },
    {
      id: "reports",
      title: "Reportes",
      description: "Generar reportes y estadísticas del sistema",
      icon: BarChart3,
      color: "bg-indigo-100 text-indigo-700",
      count: 12,
      route: "/reports",
    },
    {
      id: "notifications",
      title: "Notificaciones",
      description: "Gestionar alertas y notificaciones del sistema",
      icon: Bell,
      color: "bg-red-100 text-red-700",
      count: 5,
      route: "/notifications",
    },
    {
      id: "users",
      title: "Gestión de Usuarios",
      description: "Administrar usuarios y permisos del sistema",
      icon: UserCheck,
      color: "bg-teal-100 text-teal-700",
      count: 18,
      route: "/users",
    },
    {
      id: "settings",
      title: "Configuración",
      description: "Configurar parámetros del sistema y preferencias",
      icon: Settings,
      color: "bg-gray-100 text-gray-700",
      count: 0,
      route: "/settings",
    },
  ]

  const handleTaskClick = (task: any) => {
    setSelectedTask(task.id)
    router.push(task.route)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selector de Tareas</CardTitle>
        <CardDescription>Seleccione la tarea que desea realizar según su rol y permisos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="relative">
              <Button
                variant={selectedTask === task.id ? "default" : "outline"}
                className="w-full h-full p-4 flex flex-col items-start space-y-3 min-h-[120px] text-left overflow-hidden"
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2 rounded-lg ${task.color} flex-shrink-0`}>
                    <task.icon className="h-4 w-4" />
                  </div>
                  {task.count > 0 && (
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {task.count}
                    </Badge>
                  )}
                </div>
                <div className="w-full overflow-hidden">
                  <h3 className="text-sm font-semibold leading-tight mb-1 truncate">{task.title}</h3>
                  <p className="text-xs text-gray-500 leading-tight break-words hyphens-auto">
                    <span className="line-clamp-2 block">{task.description}</span>
                  </p>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
