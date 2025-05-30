"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, LogOut, Database } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface DashboardUser {
  name: string
  email: string
  role: string
  database: string
}

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

export function DashboardHeader() {
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("selectedDatabase")
    router.push("/")
  }

  const handleSwitchDatabase = () => {
    localStorage.removeItem("selectedDatabase")
    router.push("/")
  }

  const handleNotificationsClick = () => {
    router.push("/notifications")
  }

  const currentDb = user?.database ? databaseInfo[user.database] : null

  if (!user || !currentDb) return null

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center space-x-3 cursor-pointer">
            <Image
              src="/images/insolventic-logo.png"
              alt="INSOLVENTIC Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">INSOLVENTIC</h1>
              <div className="flex items-center space-x-2">
                <Image
                  src={currentDb.icon || "/placeholder.svg"}
                  alt={`${currentDb.name} Icon`}
                  width={16}
                  height={16}
                />
                <Badge variant="outline" className={`${currentDb.color} border-current text-xs`}>
                  {currentDb.name}
                </Badge>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleNotificationsClick} aria-label="Notificaciones">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Image
                      src={currentDb.icon || "/placeholder.svg"}
                      alt={`${currentDb.name} Icon`}
                      width={12}
                      height={12}
                    />
                    <Badge variant="outline" className={`${currentDb.color} border-current text-xs`}>
                      {currentDb.name}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSwitchDatabase}>
                <Database className="mr-2 h-4 w-4" />
                <span>Cambiar Base de Datos</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
