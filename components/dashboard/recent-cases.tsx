"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function RecentCases() {
  const cases = [
    {
      id: "INS-2025-001",
      debtor: "María González Pérez",
      type: "Insolvencia",
      status: "En negociación",
      amount: "$45,000,000",
      date: "2025-01-15",
      creditors: 5,
    },
    {
      id: "CON-2025-002",
      debtor: "Carlos Rodríguez Silva",
      type: "Conciliación",
      status: "Audiencia programada",
      amount: "$28,500,000",
      date: "2025-01-14",
      creditors: 3,
    },
    {
      id: "ACU-2025-003",
      debtor: "Ana Martínez López",
      type: "Acuerdo de Apoyo",
      status: "Documentos pendientes",
      amount: "$15,200,000",
      date: "2025-01-13",
      creditors: 2,
    },
    {
      id: "INS-2025-004",
      debtor: "Luis Fernando Castro",
      type: "Insolvencia",
      status: "Admitido",
      amount: "$67,800,000",
      date: "2025-01-12",
      creditors: 8,
    },
    {
      id: "CON-2025-005",
      debtor: "Patricia Herrera Gómez",
      type: "Conciliación",
      status: "Completado",
      amount: "$22,100,000",
      date: "2025-01-11",
      creditors: 4,
    },
  ]

  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [showCaseDetails, setShowCaseDetails] = useState(false)
  const [showEditCase, setShowEditCase] = useState(false)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-100 text-green-800"
      case "En negociación":
        return "bg-blue-100 text-blue-800"
      case "Audiencia programada":
        return "bg-purple-100 text-purple-800"
      case "Documentos pendientes":
        return "bg-orange-100 text-orange-800"
      case "Admitido":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Insolvencia":
        return "bg-red-100 text-red-800"
      case "Conciliación":
        return "bg-blue-100 text-blue-800"
      case "Acuerdo de Apoyo":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewDetails = (case_: any) => {
    setSelectedCase(case_)
    setShowCaseDetails(true)
  }

  const handleEditCase = (case_: any) => {
    setSelectedCase(case_)
    setShowEditCase(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Casos Recientes</CardTitle>
        <CardDescription>Últimos casos ingresados al sistema con su estado actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Caso</TableHead>
                <TableHead>Deudor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Acreedores</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell className="font-medium">{case_.id}</TableCell>
                  <TableCell>{case_.debtor}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(case_.type)}>{case_.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                  </TableCell>
                  <TableCell>{case_.amount}</TableCell>
                  <TableCell>{case_.creditors}</TableCell>
                  <TableCell>{new Date(case_.date).toLocaleDateString("es-CO")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(case_)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditCase(case_)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* Case Details Dialog */}
      {showCaseDetails && selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Detalles del Caso</h2>
              <button onClick={() => setShowCaseDetails(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">ID Caso</label>
                  <p className="text-sm">{selectedCase.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tipo</label>
                  <p className="text-sm">{selectedCase.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Deudor</label>
                  <p className="text-sm">{selectedCase.debtor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Estado</label>
                  <p className="text-sm">{selectedCase.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Monto</label>
                  <p className="text-sm">{selectedCase.amount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Acreedores</label>
                  <p className="text-sm">{selectedCase.creditors}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Fecha</label>
                  <p className="text-sm">{new Date(selectedCase.date).toLocaleDateString("es-CO")}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowCaseDetails(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Case Dialog */}
      {showEditCase && selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Editar Caso</h2>
              <button onClick={() => setShowEditCase(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                toast({
                  title: "Caso actualizado",
                  description: "Los cambios se han guardado correctamente.",
                })
                setShowEditCase(false)
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Deudor</label>
                  <input
                    type="text"
                    defaultValue={selectedCase.debtor}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    defaultValue={selectedCase.type}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Insolvencia">Insolvencia</option>
                    <option value="Conciliación">Conciliación</option>
                    <option value="Acuerdo de Apoyo">Acuerdo de Apoyo</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Estado</label>
                  <select
                    defaultValue={selectedCase.status}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="En negociación">En negociación</option>
                    <option value="Audiencia programada">Audiencia programada</option>
                    <option value="Documentos pendientes">Documentos pendientes</option>
                    <option value="Admitido">Admitido</option>
                    <option value="Completado">Completado</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Monto</label>
                  <input
                    type="text"
                    defaultValue={selectedCase.amount}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditCase(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  )
}
