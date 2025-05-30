"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Database {
  id: string
  name: string
  description: string
  icon: string
  color: string
  bgColor: string
}

const databases: Database[] = [
  {
    id: "armonia",
    name: "Armonia",
    description: "Base de datos principal de Armonia",
    icon: "/images/toucan.png",
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100",
  },
  {
    id: "constructores-paz",
    name: "Constructores de Paz",
    description: "Base de datos de Constructores de Paz",
    icon: "/images/dove-of-peace.png",
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100",
  },
]

export function DatabaseSelector() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDatabaseSelect = async (databaseId: string) => {
    setIsLoading(true)
    setSelectedDatabase(databaseId)

    // Simulate database connection
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store selected database in localStorage
    localStorage.setItem("selectedDatabase", databaseId)

    // Redirect to login with database context
    router.push(`/login?db=${databaseId}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src="/images/insolventic-logo.png"
                alt="INSOLVENTIC Logo"
                width={120}
                height={120}
                className="rounded-full shadow-lg"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">INSOLVENTIC</h1>
          <p className="text-xl text-gray-600 mb-2">Sistema de Gestión de Procesos de Insolvencia</p>
          <Badge variant="outline" className="text-sm">
            Selección de Base de Datos
          </Badge>
        </div>

        {/* Database Selection */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-gray-800">¿A qué Base de Datos quieres ir?</CardTitle>
            <CardDescription className="text-lg">Selecciona la organización para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {databases.map((database) => (
                <div
                  key={database.id}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    selectedDatabase === database.id ? "scale-105" : "hover:scale-102"
                  }`}
                  onClick={() => handleDatabaseSelect(database.id)}
                >
                  <Card
                    className={`h-full border-2 transition-all duration-300 ${
                      selectedDatabase === database.id
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    } ${database.bgColor}`}
                  >
                    <CardContent className="p-8 text-center">
                      {/* Loading overlay */}
                      {isLoading && selectedDatabase === database.id && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                            <p className="text-sm text-gray-600">Conectando...</p>
                          </div>
                        </div>
                      )}

                      {/* Database Icon */}
                      <div className="mb-6 flex justify-center">
                        <div className="relative">
                          <Image
                            src={database.icon || "/placeholder.svg"}
                            alt={`${database.name} Icon`}
                            width={80}
                            height={80}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      {/* Database Info */}
                      <h3 className={`text-xl font-bold mb-2 ${database.color}`}>{database.name}</h3>
                      <p className="text-gray-600 text-sm mb-6">{database.description}</p>

                      {/* Status Badge */}
                      <Badge variant="outline" className={`${database.color} border-current`}>
                        Disponible
                      </Badge>

                      {/* Selection Indicator */}
                      {selectedDatabase === database.id && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
                <h4 className="font-semibold text-blue-900 mb-2">Información Importante</h4>
                <p className="text-blue-800 text-sm">
                  Ambas bases de datos contienen la misma funcionalidad completa del sistema INSOLVENTIC. La selección
                  determina qué organización y datos específicos se mostrarán en el sistema.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">© 2025 INSOLVENTIC - Sistema de Gestión de Procesos de Insolvencia</p>
        </div>
      </div>
    </div>
  )
}
