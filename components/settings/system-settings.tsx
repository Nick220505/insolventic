"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Settings, Save, Database, Shield, FileText, Bell, Users } from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    companyName: "Centro de Conciliación y Arbitraje CONSTRUCTORES DE PAZ",
    companyAddress: "Calle 74 No. 15-80 Interior 1 Oficina 308 Edificio Osaka Trade Center",
    companyPhone: "3118117520",
    companyEmail: "contacto@constructoresdepaz.com.co",
    companyWebsite: "www.constructoresdepaz.com.co",
    operatorName: "Beatriz Helena Malavera López",
    operatorCard: "194.548",
    operatorEmail: "beatriz.malavera@constructoresdepaz.com.co",
    bankAccount: "2061 399 5617",
    bankName: "BANCOLOMBIA",
    bankEntity: "ASOCIACION LONJA DE PROPIEDAD RAIZ Y AVALUADORES DE COLOMBIA",
    bankNit: "830.122.178-7",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    autoBackup: true,
    sessionTimeout: "30",
    maxFileSize: "10",
    allowedFormats: "PDF, DOCX, XLSX, JPG, PNG",
  })

  const handleSave = () => {
    console.log("Guardando configuración:", settings)
    alert("Configuración guardada exitosamente")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
              <p className="text-gray-600">Configure parámetros del sistema y preferencias</p>
            </div>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="operator">Operador</TabsTrigger>
              <TabsTrigger value="financial">Financiero</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Información General
                  </CardTitle>
                  <CardDescription>Configuración básica del centro de conciliación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nombre de la Empresa</Label>
                      <Input
                        id="companyName"
                        value={settings.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Teléfono</Label>
                      <Input
                        id="companyPhone"
                        value={settings.companyPhone}
                        onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">Dirección</Label>
                    <Textarea
                      id="companyAddress"
                      value={settings.companyAddress}
                      onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Correo Electrónico</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        value={settings.companyEmail}
                        onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Sitio Web</Label>
                      <Input
                        id="companyWebsite"
                        value={settings.companyWebsite}
                        onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operator" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Información del Operador
                  </CardTitle>
                  <CardDescription>Datos del operador de insolvencia principal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="operatorName">Nombre Completo</Label>
                      <Input
                        id="operatorName"
                        value={settings.operatorName}
                        onChange={(e) => handleInputChange("operatorName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="operatorCard">Tarjeta Profesional</Label>
                      <Input
                        id="operatorCard"
                        value={settings.operatorCard}
                        onChange={(e) => handleInputChange("operatorCard", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="operatorEmail">Correo Electrónico</Label>
                    <Input
                      id="operatorEmail"
                      type="email"
                      value={settings.operatorEmail}
                      onChange={(e) => handleInputChange("operatorEmail", e.target.value)}
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Autorización Legal</h3>
                    <p className="text-sm text-blue-800">
                      Autorizado por el Ministerio de Justicia y del Derecho mediante Resolución Número 0001 del 02 de
                      enero de 2014 para llevar a cabo los procesos de insolvencia de persona natural no comerciante y
                      de la pequeña comerciante.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Configuración Financiera
                  </CardTitle>
                  <CardDescription>Información bancaria para gastos de administración</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Banco</Label>
                      <Input
                        id="bankName"
                        value={settings.bankName}
                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Número de Cuenta</Label>
                      <Input
                        id="bankAccount"
                        value={settings.bankAccount}
                        onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankEntity">Entidad Titular</Label>
                    <Input
                      id="bankEntity"
                      value={settings.bankEntity}
                      onChange={(e) => handleInputChange("bankEntity", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankNit">NIT</Label>
                    <Input
                      id="bankNit"
                      value={settings.bankNit}
                      onChange={(e) => handleInputChange("bankNit", e.target.value)}
                    />
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Información de Consignación</h3>
                    <p className="text-sm text-green-800">
                      Esta información se incluirá automáticamente en los documentos que requieran el pago de gastos de
                      administración según el artículo 33 del Decreto 2677/2012.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Configuración de Notificaciones
                  </CardTitle>
                  <CardDescription>Configure las notificaciones del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificaciones por Email</h3>
                      <p className="text-sm text-gray-600">Recibir notificaciones importantes por correo electrónico</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificaciones SMS</h3>
                      <p className="text-sm text-gray-600">Recibir alertas urgentes por mensaje de texto</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificaciones Push</h3>
                      <p className="text-sm text-gray-600">Mostrar notificaciones en el navegador</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleInputChange("pushNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Configuración de Seguridad
                  </CardTitle>
                  <CardDescription>Parámetros de seguridad y respaldo del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Respaldo Automático</h3>
                      <p className="text-sm text-gray-600">Realizar respaldos automáticos de la base de datos</p>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleInputChange("autoBackup", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange("sessionTimeout", e.target.value)}
                    />
                    <p className="text-sm text-gray-600">
                      Tiempo después del cual se cerrará automáticamente la sesión por inactividad
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium text-yellow-900 mb-2">Política de Seguridad</h3>
                    <p className="text-sm text-yellow-800">
                      El sistema cumple con las normas de seguridad establecidas por el Ministerio de Justicia y del
                      Derecho para el manejo de información sensible en procesos de insolvencia.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Configuración de Documentos
                  </CardTitle>
                  <CardDescription>Parámetros para la gestión de documentos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Tamaño Máximo de Archivo (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={settings.maxFileSize}
                      onChange={(e) => handleInputChange("maxFileSize", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allowedFormats">Formatos Permitidos</Label>
                    <Input
                      id="allowedFormats"
                      value={settings.allowedFormats}
                      onChange={(e) => handleInputChange("allowedFormats", e.target.value)}
                    />
                    <p className="text-sm text-gray-600">Separar los formatos con comas</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-medium text-purple-900 mb-2">Plantillas de Documentos</h3>
                    <p className="text-sm text-purple-800 mb-3">
                      El sistema incluye 22 plantillas de documentos legales predefinidas según la normatividad vigente.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Gestionar Plantillas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
