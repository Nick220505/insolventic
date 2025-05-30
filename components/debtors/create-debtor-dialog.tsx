"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Plus, Trash2 } from "lucide-react"

interface CreateDebtorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDebtorCreated?: (debtor: any) => void
}

export function CreateDebtorDialog({ open, onOpenChange, onDebtorCreated }: CreateDebtorDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    idType: "CC",
    email: "",
    phone: "",
    address: "",
    city: "",
    department: "",
    birthDate: "",
    maritalStatus: "",
    occupation: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    dependents: "",
    educationLevel: "",
    totalDebt: "",
    status: "En proceso",
    emergencyContact: "",
    emergencyPhone: "",
    bankAccount: "",
    bankName: "",
    accountType: "",
    description: "",
    debts: [] as any[],
    assets: [] as any[],
  })

  const [newDebt, setNewDebt] = useState({
    creditor: "",
    amount: "",
    type: "",
    description: "",
  })

  const [newAsset, setNewAsset] = useState({
    type: "",
    description: "",
    value: "",
    location: "",
  })

  const idTypes = ["CC", "CE", "TI", "PP", "NIT"]
  const maritalStatuses = ["Soltero(a)", "Casado(a)", "Unión Libre", "Divorciado(a)", "Viudo(a)", "Separado(a)"]
  const educationLevels = ["Primaria", "Bachillerato", "Técnico", "Tecnológico", "Universitario", "Postgrado"]
  const occupations = ["Empleado", "Independiente", "Pensionado", "Estudiante", "Desempleado", "Ama de casa"]
  const debtTypes = ["Primera Clase", "Segunda Clase", "Tercera Clase", "Cuarta Clase", "Quinta Clase"]
  const assetTypes = ["Inmueble", "Vehículo", "Maquinaria", "Inversiones", "Otros"]

  const departments = [
    "Amazonas",
    "Antioquia",
    "Arauca",
    "Atlántico",
    "Bolívar",
    "Boyacá",
    "Caldas",
    "Caquetá",
    "Casanare",
    "Cauca",
    "Cesar",
    "Chocó",
    "Córdoba",
    "Cundinamarca",
    "Guainía",
    "Guaviare",
    "Huila",
    "La Guajira",
    "Magdalena",
    "Meta",
    "Nariño",
    "Norte de Santander",
    "Putumayo",
    "Quindío",
    "Risaralda",
    "San Andrés y Providencia",
    "Santander",
    "Sucre",
    "Tolima",
    "Valle del Cauca",
    "Vaupés",
    "Vichada",
  ]

  const addDebt = () => {
    if (newDebt.creditor && newDebt.amount) {
      setFormData((prev) => ({
        ...prev,
        debts: [...prev.debts, { ...newDebt, id: Date.now() }],
      }))
      setNewDebt({ creditor: "", amount: "", type: "", description: "" })
    }
  }

  const removeDebt = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      debts: prev.debts.filter((d) => d.id !== id),
    }))
  }

  const addAsset = () => {
    if (newAsset.type && newAsset.description) {
      setFormData((prev) => ({
        ...prev,
        assets: [...prev.assets, { ...newAsset, id: Date.now() }],
      }))
      setNewAsset({ type: "", description: "", value: "", location: "" })
    }
  }

  const removeAsset = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.filter((a) => a.id !== id),
    }))
  }

  const handleSubmit = () => {
    const newDebtor = {
      id: Date.now(),
      ...formData,
      totalDebt: formData.debts.reduce((sum, debt) => sum + Number.parseInt(debt.amount || "0"), 0),
      activeCases: 1,
      createdDate: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
    }

    console.log("Creating debtor:", newDebtor)
    onDebtorCreated?.(newDebtor)
    onOpenChange(false)

    // Reset form
    setFormData({
      name: "",
      idNumber: "",
      idType: "CC",
      email: "",
      phone: "",
      address: "",
      city: "",
      department: "",
      birthDate: "",
      maritalStatus: "",
      occupation: "",
      monthlyIncome: "",
      monthlyExpenses: "",
      dependents: "",
      educationLevel: "",
      totalDebt: "",
      status: "En proceso",
      emergencyContact: "",
      emergencyPhone: "",
      bankAccount: "",
      bankName: "",
      accountType: "",
      description: "",
      debts: [],
      assets: [],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Crear Nuevo Deudor
          </DialogTitle>
          <DialogDescription>Complete la información para registrar un nuevo deudor en el sistema</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Información Personal</TabsTrigger>
            <TabsTrigger value="financial">Información Financiera</TabsTrigger>
            <TabsTrigger value="debts">Deudas</TabsTrigger>
            <TabsTrigger value="assets">Bienes</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Datos Personales</CardTitle>
                <CardDescription>Información básica del deudor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Nombre completo del deudor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idType">Tipo de Documento *</Label>
                    <Select
                      value={formData.idType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, idType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {idTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">Número de Documento *</Label>
                    <Input
                      id="idNumber"
                      value={formData.idNumber}
                      onChange={(e) => setFormData((prev) => ({ ...prev, idNumber: e.target.value }))}
                      placeholder="Número de documento"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+57 300 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Dirección completa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      placeholder="Ciudad"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Estado Civil</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, maritalStatus: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {maritalStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="educationLevel">Nivel Educativo</Label>
                    <Select
                      value={formData.educationLevel}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, educationLevel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dependents">Personas a Cargo</Label>
                    <Input
                      id="dependents"
                      type="number"
                      value={formData.dependents}
                      onChange={(e) => setFormData((prev) => ({ ...prev, dependents: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                      placeholder="Nombre del contacto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Teléfono de Emergencia</Label>
                    <Input
                      id="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
                      placeholder="+57 300 123-4567"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información Financiera</CardTitle>
                <CardDescription>Datos económicos y laborales del deudor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Ocupación *</Label>
                    <Select
                      value={formData.occupation}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, occupation: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar ocupación" />
                      </SelectTrigger>
                      <SelectContent>
                        {occupations.map((occ) => (
                          <SelectItem key={occ} value={occ}>
                            {occ}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Estado del Caso</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="En proceso">En proceso</SelectItem>
                        <SelectItem value="Audiencia programada">Audiencia programada</SelectItem>
                        <SelectItem value="Documentos pendientes">Documentos pendientes</SelectItem>
                        <SelectItem value="Acuerdo aprobado">Acuerdo aprobado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Ingresos Mensuales *</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData((prev) => ({ ...prev, monthlyIncome: e.target.value }))}
                      placeholder="Ingresos mensuales"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyExpenses">Gastos Mensuales *</Label>
                    <Input
                      id="monthlyExpenses"
                      type="number"
                      value={formData.monthlyExpenses}
                      onChange={(e) => setFormData((prev) => ({ ...prev, monthlyExpenses: e.target.value }))}
                      placeholder="Gastos mensuales"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Banco</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bankName: e.target.value }))}
                      placeholder="Nombre del banco"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Tipo de Cuenta</Label>
                    <Select
                      value={formData.accountType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, accountType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ahorros">Ahorros</SelectItem>
                        <SelectItem value="Corriente">Corriente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankAccount">Número de Cuenta</Label>
                    <Input
                      id="bankAccount"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bankAccount: e.target.value }))}
                      placeholder="Número de cuenta"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Observaciones</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Observaciones adicionales sobre el deudor"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="debts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Deudas</CardTitle>
                <CardDescription>Agregue las deudas del deudor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Acreedor"
                    value={newDebt.creditor}
                    onChange={(e) => setNewDebt((prev) => ({ ...prev, creditor: e.target.value }))}
                  />
                  <Input
                    placeholder="Monto"
                    type="number"
                    value={newDebt.amount}
                    onChange={(e) => setNewDebt((prev) => ({ ...prev, amount: e.target.value }))}
                  />
                  <Select
                    value={newDebt.type}
                    onValueChange={(value) => setNewDebt((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de crédito" />
                    </SelectTrigger>
                    <SelectContent>
                      {debtTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addDebt}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.debts.map((debt) => (
                    <div key={debt.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{debt.creditor}</p>
                          <p className="text-sm text-gray-600">{debt.description}</p>
                        </div>
                        <Badge variant="outline">{debt.type}</Badge>
                        <p className="font-medium">${Number.parseInt(debt.amount).toLocaleString()}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeDebt(debt.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Total de deuda:</strong> $
                    {formData.debts.reduce((sum, d) => sum + Number.parseInt(d.amount || "0"), 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600">
                    <strong>Número de acreedores:</strong> {formData.debts.length}
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Select
                    value={newAsset.type}
                    onValueChange={(value) => setNewAsset((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de bien" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Descripción"
                    value={newAsset.description}
                    onChange={(e) => setNewAsset((prev) => ({ ...prev, description: e.target.value }))}
                  />
                  <Input
                    placeholder="Valor estimado"
                    type="number"
                    value={newAsset.value}
                    onChange={(e) => setNewAsset((prev) => ({ ...prev, value: e.target.value }))}
                  />
                  <Input
                    placeholder="Ubicación"
                    value={newAsset.location}
                    onChange={(e) => setNewAsset((prev) => ({ ...prev, location: e.target.value }))}
                  />
                  <Button onClick={addAsset}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.assets.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{asset.description}</p>
                          <p className="text-sm text-gray-600">{asset.location}</p>
                        </div>
                        <Badge variant="outline">{asset.type}</Badge>
                        <p className="font-medium">${Number.parseInt(asset.value || "0").toLocaleString()}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeAsset(asset.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Valor total de bienes:</strong> $
                    {formData.assets.reduce((sum, a) => sum + Number.parseInt(a.value || "0"), 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    <strong>Número de bienes:</strong> {formData.assets.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Crear Deudor</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
