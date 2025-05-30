"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Share2, Printer, ZoomIn, ZoomOut, RotateCw } from "lucide-react"

interface DocumentViewerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: any
}

export function DocumentViewerDialog({ open, onOpenChange, document }: DocumentViewerDialogProps) {
  if (!document) return null

  const handleDownload = () => {
    alert(`📥 Descargando: ${document.name}`)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/documents/${document.id}`)
    alert("🔗 Enlace del documento copiado al portapapeles")
  }

  const handlePrint = () => {
    window.print()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Generado":
        return "bg-blue-100 text-blue-800"
      case "Enviado":
        return "bg-green-100 text-green-800"
      case "Firmado":
        return "bg-purple-100 text-purple-800"
      case "Subido":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{document.name}</DialogTitle>
              <DialogDescription>
                {document.type} • {document.caseId} • {document.debtorName}
              </DialogDescription>
            </div>
            <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-[70vh]">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">100%</span>
              <Button variant="outline" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
              <Button size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>
          </div>

          {/* Document Viewer */}
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                {/* Document Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">CENTRO DE CONCILIACIÓN Y ARBITRAJE</h1>
                  <h2 className="text-xl font-bold mb-2">CONSTRUCTORES DE PAZ</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Calle 74 No. 15-80 Interior 1 Oficina 308 Edificio Osaka Trade Center
                  </p>
                  <h3 className="text-lg font-bold text-blue-800">{document.type}</h3>
                </div>

                {/* Document Content */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Caso:</strong> {document.caseId}
                    </div>
                    <div>
                      <strong>Fecha:</strong> {new Date(document.createdDate).toLocaleDateString("es-CO")}
                    </div>
                    <div>
                      <strong>Deudor:</strong> {document.debtorName}
                    </div>
                    <div>
                      <strong>Operador:</strong> {document.createdBy}
                    </div>
                  </div>

                  <hr />

                  <div className="prose max-w-none">
                    <p className="text-justify leading-relaxed">
                      {document.type === "Auto de Admisión" && (
                        <>
                          <strong>AUTO DE ADMISIÓN</strong>
                          <br />
                          <br />
                          El suscrito Operador de Insolvencia de Persona Natural No Comerciante, debidamente autorizado
                          por el Ministerio de Justicia y del Derecho mediante Resolución Número 0001 del 02 de enero de
                          2014, procede a emitir el presente auto de admisión.
                          <br />
                          <br />
                          <strong>CONSIDERANDO:</strong>
                          <br />
                          <br />
                          Que el señor(a) {document.debtorName}, identificado(a) con cédula de ciudadanía número
                          [NÚMERO], presentó solicitud de insolvencia de persona natural no comerciante ante este Centro
                          de Conciliación.
                          <br />
                          <br />
                          Que se ha verificado el cumplimiento de los requisitos establecidos en el Decreto 2677 de 2012
                          y demás normas concordantes.
                          <br />
                          <br />
                          <strong>RESUELVE:</strong>
                          <br />
                          <br />
                          <strong>ARTÍCULO PRIMERO:</strong> ADMITIR la solicitud de insolvencia presentada por el
                          señor(a) {document.debtorName}.<br />
                          <br />
                          <strong>ARTÍCULO SEGUNDO:</strong> PROGRAMAR audiencia de negociación de deudas para el día
                          [FECHA] a las [HORA] horas, la cual se realizará de manera virtual a través de la plataforma
                          Zoom.
                          <br />
                          <br />
                          <strong>ARTÍCULO TERCERO:</strong> NOTIFICAR el presente auto a todos los acreedores
                          relacionados en la solicitud.
                          <br />
                        </>
                      )}

                      {document.type === "Notificación a Acreedores" && (
                        <>
                          <strong>NOTIFICACIÓN A ACREEDORES</strong>
                          <br />
                          <br />
                          En cumplimiento de lo dispuesto en el artículo 531 del Código General del Proceso, se notifica
                          a los acreedores del proceso de insolvencia iniciado por el señor(a)
                          {document.debtorName}.<br />
                          <br />
                          <strong>INFORMACIÓN DEL PROCESO:</strong>
                          <br />- Caso: {document.caseId}
                          <br />- Deudor: {document.debtorName}
                          <br />- Fecha de admisión: {new Date(document.createdDate).toLocaleDateString("es-CO")}
                          <br />- Operador: {document.createdBy}
                          <br />
                          <br />
                          Se convoca a audiencia de negociación de deudas que se realizará de manera virtual a través de
                          la plataforma Zoom con los siguientes datos de acceso:
                          <br />
                          <br />
                          <strong>DATOS DE CONEXIÓN:</strong>
                          <br />- ID de reunión: [ZOOM_ID]
                          <br />- Código de acceso: [ZOOM_PASSWORD]
                          <br />- Fecha: [FECHA_AUDIENCIA]
                          <br />- Hora: [HORA_AUDIENCIA]
                          <br />
                          <br />
                          Los acreedores que deseen participar en el proceso deberán presentar los documentos que
                          soporten sus créditos dentro de los términos legales establecidos.
                        </>
                      )}

                      {document.type === "Acuerdo de Pago" && (
                        <>
                          <strong>ACUERDO DE PAGO</strong>
                          <br />
                          <br />
                          En la ciudad de Bogotá D.C., siendo las [HORA] horas del día
                          {new Date(document.createdDate).toLocaleDateString("es-CO")}, se suscribe el presente acuerdo
                          de pago entre el deudor {document.debtorName}y sus acreedores.
                          <br />
                          <br />
                          <strong>TÉRMINOS DEL ACUERDO:</strong>
                          <br />- Plazo de pago: [PLAZO] meses
                          <br />- Cuota mensual: $[CUOTA_MENSUAL]
                          <br />- Fecha de inicio: [FECHA_INICIO]
                          <br />- Modalidad de pago: [MODALIDAD]
                          <br />
                          <br />
                          El presente acuerdo se suscribe de conformidad con las disposiciones del Decreto 2677 de 2012
                          y demás normas concordantes.
                        </>
                      )}

                      {!["Auto de Admisión", "Notificación a Acreedores", "Acuerdo de Pago"].includes(
                        document.type,
                      ) && (
                        <>
                          Este es el contenido del documento {document.type} para el caso {document.caseId}.<br />
                          <br />
                          {document.content}
                          <br />
                          <br />
                          Documento generado automáticamente por el sistema INSOLVENTIC el día
                          {new Date(document.createdDate).toLocaleDateString("es-CO")} por {document.createdBy}.
                        </>
                      )}
                    </p>
                  </div>

                  <hr />

                  {/* Document Footer */}
                  <div className="text-center text-sm text-gray-600 mt-8">
                    <p>
                      <strong>BEATRIZ HELENA MALAVERA LÓPEZ</strong>
                      <br />
                      Operadora de Insolvencia
                      <br />
                      Tarjeta Profesional No. 194.548
                      <br />
                      Centro de Conciliación y Arbitraje Constructores de Paz
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
