"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Plus, Trash2, Edit } from "lucide-react"

interface EditCreditorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creditor: any
  onCreditorUpdated?: (creditor: any) => void
}

export function EditCreditorDialog({ open, onOpenChange, creditor, onCreditorUpdated }: EditCreditorDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    nit: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    department: "",
    representative: "",
    representativeId: "",
    representativeEmail: "",
    representativePhone: "",
    website: "",
    description: "",
    bankAccount: "",
    bankName: "",
    accountType: "",
    status: "Activo",
    contacts: [] as any[],
    documents: [] as any[],
  })

  const [newContact, setNewContact] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    department: "",
  })

  useEffect(() => {
    if (creditor) {
      setFormData({
        name: creditor.name || "",
        type: creditor.type || "",
        nit: creditor.nit || "",
        email: creditor.email || "",
        phone: creditor.phone || "",
        address: creditor.address || "",
        city: creditor.city || "",
        department: creditor.department || "",
        representative: creditor.representative || "",
        representativeId: creditor.representativeId || "",
        representativeEmail: creditor.representativeEmail || "",
        representativePhone: creditor.representativePhone || "",
        website: creditor.website || "",
        description: creditor.description || "",
        bankAccount: creditor.bankAccount || "",
        bankName: creditor.bankName || "",
        accountType: creditor.accountType || "",
        status: creditor.status || "Activo",
        contacts: creditor.contacts || [],
        documents: creditor.documents || [],
      })
    }
  }, [creditor])

  const creditorTypes = [
    "Entidad Financiera",
    "Cooperativa",
    "Financiera",
    "Fondo de Empleados",
    "Empresa de Servicios Públicos",
    "Empresa de Telecomunicaciones",
    "Entidad Gubernamental",
    "Proveedor",
    "Otro",
  ]

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

  const addContact = () => {
    if (newContact.name && newContact.email) {
      setFormData((prev) => ({
        ...prev,
        contacts: [...prev.contacts, { ...newContact, id: Date.now() }],
      }))
      setNewContact({ name: "", position: "", email: "", phone: "", department: "" })
    }
  }

  const removeContact = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((c) => c.id !== id),
    }))
  }

  const handleSubmit = () => {
    const updatedCreditor = {
      ...creditor,
      ...formData,
      lastUpdate: new Date().toISOString(),
    }

    console.log("Updating creditor:", updatedCreditor)
    onCreditorUpdated?.(updatedCreditor)
    onOpenChange(false)
  }

  if (!creditor) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Edit className="h-5 w-5 mr-2" />
            Editar Acreedor
          </DialogTitle>
          <DialogDescription>Modifique la información del acreedor {creditor.name}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Información Básica</TabsTrigger>
            <TabsTrigger value="representative">Representante</TabsTrigger>
            <TabsTrigger value="contacts">Contactos</TabsTrigger>
            <TabsTrigger value="financial">Información Financiera</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Datos de la Entidad</CardTitle>
                <CardDescription>Información básica del acreedor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la Entidad *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Nombre completo de la entidad"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Entidad *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {creditorTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nit">NIT *</Label>
                    <Input
                      id="nit"
                      value={formData.nit}
                      onChange={(e) => setFormData((prev) => ({ ...prev, nit: e.target.value }))}
                      placeholder="123.456.789-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                        <SelectItem value="Suspendido">Suspendido</SelectItem>
                      </SelectContent>
                    </Select>
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
                      placeholder="contacto@entidad.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+57 1 234-5678"
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

                <div className="space-y-2">
                  <Label htmlFor="website">Sitio Web</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                    placeholder="https://www.entidad.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción adicional de la entidad"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="representative" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Representante Legal</CardTitle>
                <CardDescription>Información del representante legal de la entidad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="representative">Nombre Completo *</Label>
                    <Input
                      id="representative"
                      value={formData.representative}
                      onChange={(e) => setFormData((prev) => ({ ...prev, representative: e.target.value }))}
                      placeholder="Nombre del representante legal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="representativeId">Cédula de Ciudadanía *</Label>
                    <Input
                      id="representativeId"
                      value={formData.representativeId}
                      onChange={(e) => setFormData((prev) => ({ ...prev, representativeId: e.target.value }))}
                      placeholder="Número de cédula"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="representativeEmail">Correo Electrónico</Label>
                    <Input
                      id="representativeEmail"
                      type="email"
                      value={formData.representativeEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, representativeEmail: e.target.value }))}
                      placeholder="representante@entidad.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="representativePhone">Teléfono</Label>
                    <Input
                      id="representativePhone"
                      value={formData.representativePhone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, representativePhone: e.target.value }))}
                      placeholder="+57 300 123-4567"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contactos Adicionales</CardTitle>
                <CardDescription>Gestione contactos adicionales de la entidad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Input
                    placeholder="Nombre"
                    value={newContact.name}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Cargo"
                    value={newContact.position}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, position: e.target.value }))}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, email: e.target.value }))}
                  />
                  <Input
                    placeholder="Teléfono"
                    value={newContact.phone}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                  <Button onClick={addContact}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.position}</p>
                        </div>
                        <div className="text-sm">
                          <p className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {contact.email}
                          </p>
                          <p className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeContact(contact.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información Financiera</CardTitle>
                <CardDescription>Datos bancarios y financieros de la entidad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ahorros">Ahorros</SelectItem>
                        <SelectItem value="Corriente">Corriente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bankAccount">Número de Cuenta</Label>
                    <Input
                      id="bankAccount"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bankAccount: e.target.value }))}
                      placeholder="Número de cuenta bancaria"
                    />
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
          <Button onClick={handleSubmit}>Actualizar Acreedor</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
