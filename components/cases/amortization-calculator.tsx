"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calculator, FileSpreadsheet } from "lucide-react"

export function AmortizationCalculator() {
  const [loanData, setLoanData] = useState({
    principal: "",
    interestRate: "",
    term: "",
    gracePeriod: "0",
  })

  const [amortizationTable, setAmortizationTable] = useState<any[]>([])
  const [showTable, setShowTable] = useState(false)

  const calculateAmortization = () => {
    const principal = Number.parseFloat(loanData.principal)
    const monthlyRate = Number.parseFloat(loanData.interestRate) / 100 / 12
    const totalPayments = Number.parseInt(loanData.term)
    const gracePeriod = Number.parseInt(loanData.gracePeriod)

    if (!principal || !monthlyRate || !totalPayments) {
      alert("Por favor complete todos los campos")
      return
    }

    const table = []
    let balance = principal

    // Calculate monthly payment using PMT formula
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)

    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      balance = balance - principalPayment

      table.push({
        month,
        balance: Math.max(0, balance),
        principal: principalPayment,
        interest: interestPayment,
        payment: monthlyPayment,
        date: new Date(2025, month - 1, 28).toLocaleDateString("es-CO"),
      })

      if (balance <= 0) break
    }

    setAmortizationTable(table)
    setShowTable(true)
  }

  const exportToExcel = () => {
    // Here you would implement Excel export functionality
    alert("Exportando tabla de amortización a Excel...")
  }

  const totalInterest = amortizationTable.reduce((sum, row) => sum + row.interest, 0)
  const totalPayments = amortizationTable.reduce((sum, row) => sum + row.payment, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Amortización</CardTitle>
          <CardDescription>Calcule tablas de amortización para acuerdos de pago</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Monto del Crédito</Label>
              <Input
                id="principal"
                type="number"
                placeholder="670,000,000"
                value={loanData.principal}
                onChange={(e) => setLoanData((prev) => ({ ...prev, principal: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Tasa de Interés Anual (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                placeholder="10.8"
                value={loanData.interestRate}
                onChange={(e) => setLoanData((prev) => ({ ...prev, interestRate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Plazo (Meses)</Label>
              <Input
                id="term"
                type="number"
                placeholder="10"
                value={loanData.term}
                onChange={(e) => setLoanData((prev) => ({ ...prev, term: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gracePeriod">Período de Gracia (Meses)</Label>
              <Input
                id="gracePeriod"
                type="number"
                placeholder="0"
                value={loanData.gracePeriod}
                onChange={(e) => setLoanData((prev) => ({ ...prev, gracePeriod: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={calculateAmortization}>
              <Calculator className="h-4 w-4 mr-2" />
              Calcular Amortización
            </Button>
            {showTable && (
              <Button onClick={exportToExcel} variant="outline">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Exportar a Excel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {showTable && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tabla de Amortización</CardTitle>
                <CardDescription>Proyección de pagos mensuales</CardDescription>
              </div>
              <div className="text-right">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Capital</p>
                    <p className="font-bold">${Number.parseFloat(loanData.principal).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Intereses</p>
                    <p className="font-bold">${totalInterest.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total a Pagar</p>
                    <p className="font-bold">${totalPayments.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mes</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Saldo</TableHead>
                    <TableHead>Capital</TableHead>
                    <TableHead>Intereses</TableHead>
                    <TableHead>Cuota</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortizationTable.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>${row.balance.toLocaleString()}</TableCell>
                      <TableCell>${row.principal.toLocaleString()}</TableCell>
                      <TableCell>${row.interest.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">${row.payment.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
