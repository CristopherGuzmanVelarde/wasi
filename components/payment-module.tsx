"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Send, QrCode, Smartphone, Building, Gift, Zap } from "lucide-react"
import type { Language, Translation } from "@/lib/i18n"
import { SendTransaction } from "@/components/send-transaction"

interface PaymentModuleProps {
  isOnline: boolean
  t: Translation
  currentLanguage: Language
  currency: string
  walletAddress?: string
  isMetaMaskLogin?: boolean
  onTransactionComplete?: () => void
}

export function PaymentModule({ isOnline, t, currentLanguage, currency, walletAddress, isMetaMaskLogin, onTransactionComplete }: PaymentModuleProps) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [businessCode, setBusinessCode] = useState("")

  const quickAmounts = [10, 20, 50, 100]

  const handleQuickPayment = (amount: number) => {
    setAmount(amount.toString())
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Send className="h-5 w-5" />
            {t.makePayment}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-100">{t.selectPaymentType}</p>
          <div className="mt-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {currentLanguage === "es" ? "Moneda:" : "Currency:"} {currency}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* SendTransaction Component for MetaMask users */}
      {isMetaMaskLogin && walletAddress && (
        <SendTransaction
          currentLanguage={currentLanguage}
          walletAddress={walletAddress}
          currency={currency}
          onTransactionComplete={onTransactionComplete}
        />
      )}

      <Tabs defaultValue="p2p" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="p2p" className="text-xs">
            P2P
          </TabsTrigger>
          <TabsTrigger value="business" className="text-xs">
            {currentLanguage === "es" ? "Comercio" : currentLanguage === "qu" ? "Ranqhay" : "Business"}
          </TabsTrigger>
          <TabsTrigger value="government" className="text-xs">
            {currentLanguage === "es" ? "Gobierno" : currentLanguage === "qu" ? "Gobierno" : "Government"}
          </TabsTrigger>
        </TabsList>

        {/* Person to Person */}
        <TabsContent value="p2p" className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <Label htmlFor="recipient">{t.phoneOrDni}</Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="987654321 o 12345678"
                />
              </div>

              <div>
                <Label htmlFor="amount">
                  {t.amount} ({currency})
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPayment(quickAmount)}
                    className="bg-transparent"
                  >
                    {currency === "S/" ? `S/${quickAmount}` : `${quickAmount}`}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700" disabled={!isOnline}>
                  <Send className="h-4 w-4 mr-2" />
                  {t.send}
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Payments */}
        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <Label htmlFor="business-code">{t.businessCode}</Label>
                <Input
                  id="business-code"
                  value={businessCode}
                  onChange={(e) => setBusinessCode(e.target.value)}
                  placeholder="TIENDA001"
                />
              </div>

              <div>
                <Label htmlFor="business-amount">
                  {t.amount} ({currency})
                </Label>
                <Input
                  id="business-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700" disabled={!isOnline}>
                <Building className="h-4 w-4 mr-2" />
                {currentLanguage === "es"
                  ? "Pagar a Comercio"
                  : currentLanguage === "qu"
                    ? "Ranqhayman quy"
                    : "Pay Business"}
              </Button>

              <Button variant="outline" className="w-full bg-transparent">
                <QrCode className="h-4 w-4 mr-2" />
                {t.scanQR}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Government Payments */}
        <TabsContent value="government" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Gift className="h-5 w-5" />
                {t.governmentPayments}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{t.subsidiesAvailable}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">
                      {currentLanguage === "es"
                        ? "Bono Yanapay"
                        : currentLanguage === "qu"
                          ? "Bono Yanapay"
                          : "Yanapay Bonus"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {currentLanguage === "es"
                        ? "Subsidio familiar"
                        : currentLanguage === "qu"
                          ? "Ayllu yanapay"
                          : "Family subsidy"}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {currency} 760
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">
                      {currentLanguage === "es" ? "Pensión 65" : currentLanguage === "qu" ? "Pensión 65" : "Pension 65"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {currentLanguage === "es"
                        ? "Adultos mayores"
                        : currentLanguage === "qu"
                          ? "Machula wawakunaq"
                          : "Seniors"}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {currency} 250
                  </Badge>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700" disabled={!isOnline}>
                <Gift className="h-4 w-4 mr-2" />
                {t.claimPayments}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {t.quickPayments}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4 bg-transparent">
              <Smartphone className="h-6 w-6" />
              <span className="text-xs">
                {currentLanguage === "es"
                  ? "Recargar Celular"
                  : currentLanguage === "qu"
                    ? "Celular hunt'achiy"
                    : "Top-up Phone"}
              </span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4 bg-transparent">
              <Zap className="h-6 w-6" />
              <span className="text-xs">
                {currentLanguage === "es" ? "Pagar Luz" : currentLanguage === "qu" ? "K'anchay quy" : "Pay Electricity"}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
