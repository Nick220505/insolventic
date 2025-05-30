import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Casos Activos",
      value: "24",
      change: "+3 este mes",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Acreedores",
      value: "156",
      change: "+12 nuevos",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Pendientes",
      value: "8",
      change: "Requieren atención",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Completados",
      value: "42",
      change: "+5 esta semana",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "Audiencias Hoy",
      value: "3",
      change: "Próximas 2 horas",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Eficiencia",
      value: "94%",
      change: "+2% vs mes anterior",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
