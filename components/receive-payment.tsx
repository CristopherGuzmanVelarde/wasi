"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Copy, Share, Download, User, Phone, HelpCircle } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface ReceivePaymentProps {
  currentLanguage: Language
  userName: string
  userPhone: string
  currency: string
}

export function ReceivePayment({ currentLanguage, userName, userPhone, currency }: ReceivePaymentProps) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [showQR, setShowQR] = useState(false)
  const [qrGenerated, setQrGenerated] = useState(false)
  const t = useTranslation(currentLanguage)

  const generateQR = () => {
    if (amount) {
      setShowQR(true)
      setQrGenerated(true)
    }
  }

  const copyQRInfo = () => {
    const info = `${userName}\n${userPhone}\nMonto: ${currency} ${amount}\n${description ? `Concepto: ${description}` : ""}`
    navigator.clipboard.writeText(info)
  }

  const shareQR = () => {
    if (navigator.share) {
      navigator.share({
        title: "Código QR para pago",
        text: `Pagar ${currency} ${amount} a ${userName}${description ? ` - ${description}` : ""}`,
      })
    }
  }

  const downloadQR = () => {
    console.log("Descargando QR...")
  }

  const getReceiveTitle = () => {
    switch (currentLanguage) {
      case "qu":
        return "Qullqi Chaskiy"
      case "ay":
        return "Qullqi Katxaruña"
      case "cni":
        return "Patsani Chaskiy"
      case "agr":
        return "Kuichik Achiktin"
      default:
        return "Recibir Dinero"
    }
  }

  const getPaymentDetailsTitle = () => {
    switch (currentLanguage) {
      case "qu":
        return "Qullqi Chaskiy Willakuy"
      case "ay":
        return "Qullqi Katxaruñ Yatiyawi"
      case "cni":
        return "Patsani Chaskiy Willakuy"
      case "agr":
        return "Kuichik Achiktin Etseruk"
      default:
        return "Detalles del cobro"
    }
  }

  const getAmountLabel = () => {
    switch (currentLanguage) {
      case "qu":
        return `Hayka qullqi maskashanki (${currency})`
      case "ay":
        return `Qawqha qullqi munsta (${currency})`
      case "cni":
        return `Hayka patsani maskashanki (${currency})`
      case "agr":
        return `Mijan kuichik munajme (${currency})`
      default:
        return `Monto a solicitar (${currency})`
    }
  }

  const getDescriptionLabel = () => {
    switch (currentLanguage) {
      case "qu":
        return "Imapaq kasqanta willakuy (mana necesario)"
      case "ay":
        return "Kunataki ukham yatiyaña (janiw wakisiti)"
      case "cni":
        return "Imapaq kasqanta willakuy (mana necesario)"
      case "agr":
        return "Waruka najantai etseruk (atsa wakagmi)"
      default:
        return "Descripción (opcional)"
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            {getReceiveTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-emerald-100">
            {currentLanguage === "qu"
              ? "QR codigo ruraspa, pipas qullqita apachisunkiman"
              : currentLanguage === "ay"
                ? "QR codigo lurasa, khitix qullqi apayañ yatxañani"
                : currentLanguage === "cni"
                  ? "QR codigo ruraspa, pipas patsani apachisunkiman"
                  : currentLanguage === "agr"
                    ? "QR codigo najasa, aents kuichik susatinuitai"
                    : "Genera tu código QR para que te paguen fácilmente"}
          </p>
        </CardContent>
      </Card>

      {/* Payment Details Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{getPaymentDetailsTitle()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amount" className="text-sm">
              {getAmountLabel()}
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              {currentLanguage === "qu"
                ? "Ch'usaq saqispayki, pagaq hayka qullqitapas apachiyta atinki"
                : currentLanguage === "ay"
                  ? "Ch'usa jaytasa, qullqi apayiri qawqha munki uk apayañani"
                  : currentLanguage === "cni"
                    ? "Ch'usaq saqispayki, pagaq hayka patsanitapas apachiyta atinki"
                    : currentLanguage === "agr"
                      ? "Ch'usa jaytasa, susatiri mijan munajme uk susatinuitai"
                      : "Deja en blanco para que el pagador ingrese el monto"}
            </p>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm">
              {getDescriptionLabel()}
            </Label>
            <Input
              id="description"
              placeholder={
                currentLanguage === "qu"
                  ? "Imapaq kasqanta qillqay..."
                  : currentLanguage === "ay"
                    ? "Kunataki ukham qillqaña..."
                    : currentLanguage === "cni"
                      ? "Imapaq kasqanta qillqay..."
                      : currentLanguage === "agr"
                        ? "Waruka najantai aarma..."
                        : "Ej: Venta de productos, servicio, etc."
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button
            onClick={generateQR}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
            disabled={!amount}
          >
            <QrCode className="h-4 w-4 mr-2" />
            {currentLanguage === "qu"
              ? "QR codigo ruray"
              : currentLanguage === "ay"
                ? "QR codigo luraña"
                : currentLanguage === "cni"
                  ? "QR codigo ruray"
                  : currentLanguage === "agr"
                    ? "QR codigo najana"
                    : "Generar código QR"}
          </Button>
        </CardContent>
      </Card>

      {/* QR Code Display */}
      {showQR && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardHeader>
            <CardTitle className="text-base text-center text-emerald-800">
              {currentLanguage === "qu"
                ? "Qampa QR Codigo"
                : currentLanguage === "ay"
                  ? "Jumax QR Codigo"
                  : currentLanguage === "cni"
                    ? "Qampa QR Codigo"
                    : currentLanguage === "agr"
                      ? "Amesha QR Codigo"
                      : "Tu código QR"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-32 w-32 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">
                      {currentLanguage === "qu"
                        ? "QR Codigo"
                        : currentLanguage === "ay"
                          ? "QR Codigo"
                          : currentLanguage === "cni"
                            ? "QR Codigo"
                            : currentLanguage === "agr"
                              ? "QR Codigo"
                              : "Código QR"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <User className="h-4 w-4 text-emerald-600" />
                <span className="font-medium text-emerald-800">{userName}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-emerald-700">{userPhone}</span>
              </div>
              <div className="text-2xl font-bold text-emerald-800">
                {currency} {amount}
              </div>
              {description && <div className="text-sm text-emerald-700">{description}</div>}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={copyQRInfo} className="bg-white flex-col h-auto py-2 px-1">
                <Copy className="h-3 w-3 mb-1" />
                <span className="text-[10px] leading-tight">
                  {currentLanguage === "qu"
                    ? "Copiay"
                    : currentLanguage === "ay"
                      ? "Copiañ"
                      : currentLanguage === "cni"
                        ? "Copiay"
                        : currentLanguage === "agr"
                          ? "Copiay"
                          : "Copiar"}
                </span>
              </Button>
              <Button variant="outline" size="sm" onClick={shareQR} className="bg-white flex-col h-auto py-2 px-1">
                <Share className="h-3 w-3 mb-1" />
                <span className="text-[10px] leading-tight">
                  {currentLanguage === "qu"
                    ? "Rakiy"
                    : currentLanguage === "ay"
                      ? "Apthapiaña"
                      : currentLanguage === "cni"
                        ? "Rakiy"
                        : currentLanguage === "agr"
                          ? "Jukitai"
                          : "Compartir"}
                </span>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadQR} className="bg-white flex-col h-auto py-2 px-1">
                <Download className="h-3 w-3 mb-1" />
                <span className="text-[10px] leading-tight">
                  {currentLanguage === "qu"
                    ? "Chaskiy"
                    : currentLanguage === "ay"
                      ? "Apaqaña"
                      : currentLanguage === "cni"
                        ? "Chaskiy"
                        : currentLanguage === "agr"
                          ? "Achiktin"
                          : "Descargar"}
                </span>
              </Button>
            </div>

            <p className="text-xs text-center text-emerald-600">
              {currentLanguage === "qu"
                ? "Kay QR codigo-ta pipawan rakiy, chaynapi qullqita apachisunkiman"
                : currentLanguage === "ay"
                  ? "Aka QR codigo khitimpi apthapiaña, ukhamaw qullqi apayañani"
                  : currentLanguage === "cni"
                    ? "Kay QR codigo-ta pipawan rakiy, chaynapi patsani apachisunkiman"
                    : currentLanguage === "agr"
                      ? "Ju QR codigo aentjai jukitai, nuinkia kuichik susatinuitai"
                      : "Comparte este código QR con quien te va a pagar"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            {currentLanguage === "qu"
              ? "¿Imayna llamkan?"
              : currentLanguage === "ay"
                ? "¿Kunjams irnaqki?"
                : currentLanguage === "cni"
                  ? "¿Imayna llamkan?"
                  : currentLanguage === "agr"
                    ? "¿Itiur takakmau?"
                    : "¿Cómo funciona?"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">1.</span>
              {currentLanguage === "qu"
                ? "QR codigo-ta pipawan rakiy, chaynapi qullqita apachisunkiman"
                : currentLanguage === "ay"
                  ? "QR codigo khitimpi apthapiaña, qullqi apayañataki"
                  : currentLanguage === "cni"
                    ? "QR codigo-ta pipawan rakiy, chaynapi patsani apachisunkiman"
                    : currentLanguage === "agr"
                      ? "QR codigo aentjai jukitai, kuichik susatinuitai"
                      : "Comparte tu código QR con quien te va a pagar"}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">2.</span>
              {currentLanguage === "qu"
                ? "Payqa QR codigo-ta app-ninwan ñawinchanan"
                : currentLanguage === "ay"
                  ? "Jupax QR codigo app-ampi uñjañapa"
                  : currentLanguage === "cni"
                    ? "Payqa QR codigo-ta app-ninwan ñawinchanan"
                    : currentLanguage === "agr"
                      ? "Niisha QR codigo app-jainkia iinawai"
                      : "La otra persona escanea el código con su app"}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">3.</span>
              {currentLanguage === "qu"
                ? "Qullqi kikinmanta qullqi wasiykiman chayamunqa"
                : currentLanguage === "ay"
                  ? "Qullqi kikimanta qullqi utamar puriñani"
                  : currentLanguage === "cni"
                    ? "Patsani kikinmanta patsani wasiykiman chayamunqa"
                    : currentLanguage === "agr"
                      ? "Kuichik kikimanta kuichik jeamar jegatui"
                      : "El dinero llega automáticamente a tu billetera"}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
