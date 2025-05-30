"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface DatabaseInfo {
  id: string
  name: string
  icon: string
  color: string
}

const databaseInfo: Record<string, DatabaseInfo> = {
  armonia: {
    id: "armonia",
    name: "Armonia",
    icon: "/images/toucan.png",
    color: "text-orange-600",
  },
  "constructores-paz": {
    id: "constructores-paz",
    name: "Constructores de Paz",
    icon: "/images/dove-of-peace.png",
    color: "text-blue-600",
  },
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedDb, setSelectedDb] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const dbParam = searchParams.get("db")
    const storedDb = localStorage.getItem("selectedDatabase")

    if (dbParam && databaseInfo[dbParam]) {
      setSelectedDb(dbParam)
      localStorage.setItem("selectedDatabase", dbParam)
    } else if (storedDb && databaseInfo[storedDb]) {
      setSelectedDb(storedDb)
    } else {
      // Redirect back to database selector if no valid database
      router.push("/")
    }
  }, [searchParams, router])

  const currentDb = selectedDb ? databaseInfo[selectedDb] : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Demo credentials for both databases
      const validCredentials = [
        {
          email: "admin@constructoresdepaz.com.co",
          password: "admin123",
          role: "admin",
          name: "Beatriz Helena Malavera",
        },
        {
          email: "abogado@constructoresdepaz.com.co",
          password: "abogado123",
          role: "lawyer",
          name: "Maximiliano Jaramillo",
        },
        { email: "admin@armonia.com.co", password: "admin123", role: "admin", name: "Administrador Armonia" },
        { email: "abogado@armonia.com.co", password: "abogado123", role: "lawyer", name: "Abogado Armonia" },
      ]

      const user = validCredentials.find((cred) => cred.email === email && cred.password === password)

      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            database: selectedDb,
          }),
        )
        router.push("/dashboard")
      } else {
        setError("Credenciales inválidas. Verifique su correo y contraseña.")
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToSelector = () => {
    localStorage.removeItem("selectedDatabase")
    router.push("/")
  }

  if (!currentDb) {
    return <div>Cargando...</div>
  }

  return (
    <div className="w-full max-w-md">
      {/* Header with Database Info */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <Image
            src={currentDb.icon || "/placeholder.svg"}
            alt={`${currentDb.name} Icon`}
            width={60}
            height={60}
            className="mr-3"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">INSOLVENTIC</h1>
            <Badge variant="outline" className={`${currentDb.color} border-current mt-1`}>
              {currentDb.name}
            </Badge>
          </div>
        </div>
        <p className="text-gray-600">Sistema de Gestión de Procesos de Insolvencia</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Iniciar Sesión</CardTitle>
              <CardDescription>Acceso a la base de datos de {currentDb.name}</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToSelector}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Cambiar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico / Cédula</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="text"
                  placeholder="correo@ejemplo.com o 12345678"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="remember" className="text-sm">
                Recordar usuario
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-sm">
                ¿Olvidó su contraseña?
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Credenciales de prueba para {currentDb.name}:</p>
            {selectedDb === "constructores-paz" ? (
              <>
                <p className="text-xs text-blue-700">Admin: admin@constructoresdepaz.com.co / admin123</p>
                <p className="text-xs text-blue-700">Abogado: abogado@constructoresdepaz.com.co / abogado123</p>
              </>
            ) : (
              <>
                <p className="text-xs text-blue-700">Admin: admin@armonia.com.co / admin123</p>
                <p className="text-xs text-blue-700">Abogado: abogado@armonia.com.co / abogado123</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
