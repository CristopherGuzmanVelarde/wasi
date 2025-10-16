"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, X, Upload, AlertCircle, CheckCircle, User, Phone, Store } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface QRScannerProps {
  currentLanguage: Language
  isOpen: boolean
  onClose: () => void
  onQRScanned: (data: any) => void
  paymentType: "p2p" | "p2b"
}

export function QRScanner({ currentLanguage, isOpen, onClose, onQRScanned, paymentType }: QRScannerProps) {
  const t = useTranslation(currentLanguage)
  const [scanMode, setScanMode] = useState<"camera" | "upload" | "manual">("camera")
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<any>(null)
  const [manualCode, setManualCode] = useState("")
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen && scanMode === "camera") {
      startCamera()
    }
    return () => {
      stopCamera()
    }
  }, [isOpen, scanMode])

  const startCamera = async () => {
    try {
      setIsScanning(true)
      setError("")

      // Simular acceso a la cámara (en una app real usarías getUserMedia)
      // Por ahora simularemos el escaneo
      setTimeout(() => {
        simulateQRScan()
      }, 2000)
    } catch (err) {
      setError("No se pudo acceder a la cámara")
      setIsScanning(false)
    }
  }

  const stopCamera = () => {
    setIsScanning(false)
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
  }

  const parseQRData = (qrText: string) => {
    // Intentar parsear el formato natural del QR
    const lines = qrText.trim().split("\n")

    // Si contiene "Pagos Perú CBDC", es un QR de usuario
    if (lines.some((line) => line.includes("Pagos Perú CBDC"))) {
      const name = lines[0]?.trim()
      const phone = lines[1]?.trim()

      if (name && phone) {
        return {
          type: "user_payment",
          name: name,
          phone: phone,
          app: "PagosPeruCBDC",
          isValidUser: true,
        }
      }
    }

    // Si es un número de teléfono simple (9 dígitos que empiecen con 9)
    if (/^9\d{8}$/.test(qrText.trim())) {
      return {
        type: "phone_number",
        phone: qrText.trim(),
        name: `Usuario ${qrText.trim()}`,
        isValidUser: false,
      }
    }

    // Si es un código de comercio (formato COM-XXXXX)
    if (/^COM-\d{5}$/.test(qrText.trim())) {
      return {
        type: "business_code",
        businessCode: qrText.trim(),
        name: `Comercio ${qrText.trim()}`,
        isValidUser: false,
      }
    }

    // Si es un DNI (8 dígitos)
    if (/^\d{8}$/.test(qrText.trim())) {
      return {
        type: "dni",
        dni: qrText.trim(),
        name: `Usuario DNI ${qrText.trim()}`,
        isValidUser: false,
      }
    }

    // Formato desconocido, tratar como texto simple
    return {
      type: "unknown",
      value: qrText.trim(),
      name: qrText.trim(),
      isValidUser: false,
    }
  }

  const simulateQRScan = () => {
    // Simular diferentes tipos de QR según el tipo de pago
    let mockQRText = ""

    if (paymentType === "p2p") {
      // Simular QR de usuario con formato natural
      mockQRText = `María García Flores
987654321
Pagos Perú CBDC`
    } else {
      // Simular QR de comercio
      mockQRText = `Bodega San Juan
COM-12345
Pagos Perú CBDC`
    }

    const parsedData = parseQRData(mockQRText)
    setScannedData(parsedData)
    setIsScanning(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setError("")
      // En una app real, aquí usarías una librería como jsQR para leer el QR de la imagen
      // Por ahora simularemos la lectura
      setTimeout(() => {
        simulateQRScan()
      }, 1000)
    } catch (err) {
      setError("No se pudo leer el código QR de la imagen")
    }
  }

  const handleManualEntry = () => {
    if (!manualCode.trim()) {
      setError("Ingresa un código válido")
      return
    }

    try {
      const parsedData = parseQRData(manualCode)
      setScannedData(parsedData)
      setError("")
    } catch (err) {
      setError("Formato de código no válido")
    }
  }

  const handleConfirm = () => {
    if (scannedData) {
      onQRScanned(scannedData)
      onClose()
    }
  }

  const handleRetry = () => {
    setScannedData(null)
    setError("")
    setManualCode("")
    if (scanMode === "camera") {
      startCamera()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              {currentLanguage === "qu"
                ? "QR Codigo Ñawinchay"
                : currentLanguage === "ay"
                  ? "QR Codigo Uñjaña"
                  : currentLanguage === "cni"
                    ? "QR Codigo Ñawinchay"
                    : currentLanguage === "agr"
                      ? "QR Codigo Iinin"
                      : "Escanear Código QR"}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!scannedData && (
            <>
              {/* Scan Mode Selector */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={scanMode === "camera" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScanMode("camera")}
                  className="text-xs"
                >
                  <Camera className="h-3 w-3 mr-1" />
                  Cámara
                </Button>
                <Button
                  variant={scanMode === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScanMode("upload")}
                  className="text-xs"
                >
                  <Upload className="h-3 w-3 mr-1" />
                  Imagen
                </Button>
                <Button
                  variant={scanMode === "manual" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScanMode("manual")}
                  className="text-xs"
                >
                  Manual
                </Button>
              </div>

              {/* Camera Mode */}
              {scanMode === "camera" && (
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    {isScanning ? (
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">
                          {currentLanguage === "qu"
                            ? "QR codigo maskaspa..."
                            : currentLanguage === "ay"
                              ? "QR codigo thaqhasa..."
                              : currentLanguage === "cni"
                                ? "QR codigo maskaspa..."
                                : currentLanguage === "agr"
                                  ? "QR codigo shiirme..."
                                  : "Buscando código QR..."}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {currentLanguage === "qu"
                            ? "QR codigo ñawinchay"
                            : currentLanguage === "ay"
                              ? "QR codigo uñjaña"
                              : currentLanguage === "cni"
                                ? "QR codigo ñawinchay"
                                : currentLanguage === "agr"
                                  ? "QR codigo iinin"
                                  : "Apunta al código QR"}
                        </p>
                        <Button size="sm" onClick={startCamera} className="mt-2">
                          {currentLanguage === "qu"
                            ? "Qallariy"
                            : currentLanguage === "ay"
                              ? "Qalltaña"
                              : currentLanguage === "cni"
                                ? "Qallariy"
                                : currentLanguage === "agr"
                                  ? "Iniakui"
                                  : "Iniciar"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Upload Mode */}
              {scanMode === "upload" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {currentLanguage === "qu"
                        ? "QR codigo suyuta akllay"
                        : currentLanguage === "ay"
                          ? "QR codigo salta ajlliña"
                          : currentLanguage === "cni"
                            ? "QR codigo suyuta akllay"
                            : currentLanguage === "agr"
                              ? "QR codigo aintsan ajlliña"
                              : "Selecciona una imagen con código QR"}
                    </p>
                    <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                      {currentLanguage === "qu"
                        ? "Suyu akllay"
                        : currentLanguage === "ay"
                          ? "Salta ajlliña"
                          : currentLanguage === "cni"
                            ? "Suyu akllay"
                            : currentLanguage === "agr"
                              ? "Aintsan ajlliña"
                              : "Seleccionar imagen"}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {/* Manual Mode */}
              {scanMode === "manual" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="manual-code">
                      {paymentType === "p2p"
                        ? currentLanguage === "qu"
                          ? "Telefono yupay utaq QR codigo"
                          : currentLanguage === "ay"
                            ? "Telefono jakhu jan ukax QR codigo"
                            : currentLanguage === "cni"
                              ? "Telefono yupay utaq QR codigo"
                              : currentLanguage === "agr"
                                ? "Telefono yupay ataksha QR codigo"
                                : "Número de teléfono o código QR"
                        : currentLanguage === "qu"
                          ? "Ranqana codigo utaq QR codigo"
                          : currentLanguage === "ay"
                            ? "Aljañ codigo jan ukax QR codigo"
                            : currentLanguage === "cni"
                              ? "Ranqana codigo utaq QR codigo"
                              : currentLanguage === "agr"
                                ? "Suruki codigo ataksha QR codigo"
                                : "Código de comercio o código QR"}
                    </Label>
                    <Input
                      id="manual-code"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder={paymentType === "p2p" ? "987654321 o texto del QR" : "COM-12345 o texto del QR"}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">También puedes pegar el texto completo del código QR</p>
                  </div>
                  <Button onClick={handleManualEntry} className="w-full">
                    {currentLanguage === "qu"
                      ? "Chaskiy"
                      : currentLanguage === "ay"
                        ? "Katxaruña"
                        : currentLanguage === "cni"
                          ? "Chaskiy"
                          : currentLanguage === "agr"
                            ? "Achiktin"
                            : "Confirmar"}
                  </Button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </>
          )}

          {/* Scanned Data Display */}
          {scannedData && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-700 font-medium">
                  {currentLanguage === "qu"
                    ? "QR codigo ñawinchana tukusqa!"
                    : currentLanguage === "ay"
                      ? "QR codigo uñjañ tukuyata!"
                      : currentLanguage === "cni"
                        ? "QR codigo ñawinchana tukusqa!"
                        : currentLanguage === "agr"
                          ? "QR codigo iinin najantin!"
                          : "¡Código QR escaneado exitosamente!"}
                </p>
              </div>

              {/* Display scanned information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  {scannedData.type === "user_payment" ||
                  scannedData.type === "phone_number" ||
                  scannedData.type === "dni" ? (
                    <User className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Store className="h-5 w-5 text-green-600" />
                  )}
                  <div>
                    <p className="font-medium">{scannedData.name}</p>
                    {scannedData.phone && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        {scannedData.phone}
                      </div>
                    )}
                    {scannedData.businessCode && (
                      <p className="text-sm text-gray-600">Código: {scannedData.businessCode}</p>
                    )}
                    {scannedData.dni && <p className="text-sm text-gray-600">DNI: {scannedData.dni}</p>}
                    {scannedData.isValidUser && (
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600">Usuario verificado de Pagos Perú</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleRetry} variant="outline" className="flex-1 bg-transparent">
                  {currentLanguage === "qu"
                    ? "Huk kaq"
                    : currentLanguage === "ay"
                      ? "Mayamp"
                      : currentLanguage === "cni"
                        ? "Huk kaq"
                        : currentLanguage === "agr"
                          ? "Ataksha"
                          : "Otro"}
                </Button>
                <Button onClick={handleConfirm} className="flex-1">
                  {currentLanguage === "qu"
                    ? "Chaskiy"
                    : currentLanguage === "ay"
                      ? "Katxaruña"
                      : currentLanguage === "cni"
                        ? "Chaskiy"
                        : currentLanguage === "agr"
                          ? "Achiktin"
                          : "Confirmar"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
