"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Upload } from "lucide-react"

interface CreateCaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCaseDialog({ open, onOpenChange }: CreateCaseDialogProps) {
  const [formData, setFormData] = useState({
    debtorName: "",
    debtorId: "",
    debtorEmail: "",
    debtorPhone: "",
    debtorAddress: "",
    caseType: "",
    totalDebt: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    causes: [] as string[],
    creditors: [] as any[],
    assets: [] as any[],
    legalProcesses: [] as any[],
  })

  const [newCreditor, setNewCreditor] = useState({
    name: "",
    amount: "",
    type: "",
    email: "",
    address: "",
  })

  const insolvencyCauses = [
    "Sobreendeudamiento por falta de recursos",
    "Pérdida de empleo",
    "Divorcio",
    "Enfermedad",
    "Accidente",
    "Estafa",
    "Disminución de ingresos",
    "Falta de educación financiera",
    "Muerte de cónyuge",
    "Nuevos créditos para cubrir otros",
    "Mala inversión",
  ]

  const addCreditor = () => {
    if (newCreditor.name && newCreditor.amount) {
      setFormData((prev) => ({
        ...prev,
        creditors: [...prev.creditors, { ...newCreditor, id: Date.now() }],
      }))
      setNewCreditor({ name: "", amount: "", type: "", email: "", address: "" })
    }
  }

  const removeCreditor = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      creditors: prev.creditors.filter((c) => c.id !== id),
    }))
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Creating case with data:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      debtorName: "",
      debtorId: "",
      debtorEmail: "",
      debtorPhone: "",
      debtorAddress: "",
      caseType: "",
      totalDebt: "",
      monthlyIncome: "",
      monthlyExpenses: "",
      causes: [],
      creditors: [],
      assets: [],
      legalProcesses: [],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Caso</DialogTitle>
          <DialogDescription>Complete la información para crear un nuevo caso de insolvencia</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="debtor" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="debtor">Deudor</TabsTrigger>
            <TabsTrigger value="creditors">Acreedores</TabsTrigger>
            <TabsTrigger value="assets">Bienes</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="debtor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información del Deudor</CardTitle>
                <CardDescription>Datos personales y financieros del deudor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="debtorName">Nombre Completo</Label>
                    <Input
                      id="debtorName"
                      value={formData.debtorName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, debtorName: e.target.value }))}
                      placeholder="Nombre completo del deudor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="debtorId">Cédula de Ciudadanía</Label>
                    <Input
                      id="debtorId"
                      value={formData.debtorId}
                      onChange={(e) => setFormData((prev) => ({ ...prev, debtorId: e.target.value }))}
                      placeholder="Número de cédula"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="debtorEmail">Correo Electrónico</Label>
                    <Input
                      id="debtorEmail"
                      type="email"
                      value={formData.debtorEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, debtorEmail: e.target.value }))}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="debtorPhone">Teléfono</Label>
                    <Input
                      id="debtorPhone"
                      value={formData.debtorPhone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, debtorPhone: e.target.value }))}
                      placeholder="Número de teléfono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="debtorAddress">Dirección</Label>
                  <Input
                    id="debtorAddress"
                    value={formData.debtorAddress}
                    onChange={(e) => setFormData((prev) => ({ ...prev, debtorAddress: e.target.value }))}
                    placeholder="Dirección completa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="caseType">Tipo de Caso</Label>
                    <Select
                      value={formData.caseType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, caseType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="insolvencia">Insolvencia</SelectItem>
                        <SelectItem value="conciliacion">Conciliación</SelectItem>
                        <SelectItem value="acuerdo">Acuerdo de Apoyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Ingresos Mensuales</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData((prev) => ({ ...prev, monthlyIncome: e.target.value }))}
                      placeholder="Ingresos mensuales"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyExpenses">Gastos Mensuales</Label>
                    <Input
                      id="monthlyExpenses"
                      type="number"
                      value={formData.monthlyExpenses}
                      onChange={(e) => setFormData((prev) => ({ ...prev, monthlyExpenses: e.target.value }))}
                      placeholder="Gastos mensuales"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Causas de la Insolvencia</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {insolvencyCauses.map((cause, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`cause-${index}`}
                          checked={formData.causes.includes(cause)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({ ...prev, causes: [...prev.causes, cause] }))
                            } else {
                              setFormData((prev) => ({ ...prev, causes: prev.causes.filter((c) => c !== cause) }))
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`cause-${index}`} className="text-sm">
                          {cause}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creditors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Acreedores</CardTitle>
                <CardDescription>Agregue los acreedores del deudor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Input
                    placeholder="Nombre del acreedor"
                    value={newCreditor.name}
                    onChange={(e) => setNewCreditor((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Monto adeudado"
                    type="number"
                    value={newCreditor.amount}
                    onChange={(e) => setNewCreditor((prev) => ({ ...prev, amount: e.target.value }))}
                  />
                  <Select
                    value={newCreditor.type}
                    onValueChange={(value) => setNewCreditor((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de crédito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primera">Primera Clase</SelectItem>
                      <SelectItem value="segunda">Segunda Clase</SelectItem>
                      <SelectItem value="tercera">Tercera Clase</SelectItem>
                      <SelectItem value="cuarta">Cuarta Clase</SelectItem>
                      <SelectItem value="quinta">Quinta Clase</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={newCreditor.email}
                    onChange={(e) => setNewCreditor((prev) => ({ ...prev, email: e.target.value }))}
                  />
                  <Button onClick={addCreditor}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.creditors.map((creditor) => (
                    <div key={creditor.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{creditor.name}</p>
                          <p className="text-sm text-gray-600">{creditor.email}</p>
                        </div>
                        <Badge variant="outline">{creditor.type}</Badge>
                        <p className="font-medium">${Number.parseInt(creditor.amount).toLocaleString()}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeCreditor(creditor.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Total de deuda:</strong> $
                    {formData.creditors.reduce((sum, c) => sum + Number.parseInt(c.amount || "0"), 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600">
                    <strong>Número de acreedores:</strong> {formData.creditors.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventario de Bienes</CardTitle>
                <CardDescription>Registre los bienes del deudor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">Funcionalidad de gestión de bienes en desarrollo</p>
                  <Button variant="outline" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir Inventario
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos Requeridos</CardTitle>
                <CardDescription>Suba los documentos necesarios para el caso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Documentos Obligatorios</Label>
                    <div className="space-y-2">
                      {[
                        "Cédula de ciudadanía",
                        "Certificado REDAM",
                        "Certificado de ingresos",
                        "Extractos bancarios",
                        "Relación de acreedores",
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{doc}</span>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Documentos Opcionales</Label>
                    <div className="space-y-2">
                      {[
                        "Certificado de tradición y libertad",
                        "Constancia matrícula mercantil",
                        "Poder notariado",
                        "Gastos de manutención",
                        "Procesos judiciales",
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{doc}</span>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Crear Caso</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
