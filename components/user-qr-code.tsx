"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, QrCode, User, Phone } from "lucide-react"
import type { Language } from "@/lib/i18n"

interface UserQRCodeProps {
  currentLanguage: Language
  userName: string
  userPhone: string
  isOpen: boolean
  onClose: () => void
  currency?: string
}

export function UserQRCode({
  currentLanguage,
  userName,
  userPhone,
  isOpen,
  onClose,
  currency = "S/",
}: UserQRCodeProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <QrCode className="h-5 w-5" />
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
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-gray-200">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
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
              <User className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-gray-800">{userName}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-600">{userPhone}</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800 text-center">
              {currentLanguage === "qu"
                ? "Kay QR codigo-ta pipawan rakiy, chaynapi qullqita apachisunkiman"
                : currentLanguage === "ay"
                  ? "Aka QR codigo khitimpi apthapiaña, ukhamaw qullqi apayañani"
                  : currentLanguage === "cni"
                    ? "Kay QR codigo-ta pipawan rakiy, chaynapi patsani apachisunkiman"
                    : currentLanguage === "agr"
                      ? "Ju QR codigo aentjai jukitai, nuinkia kuichik susatinuitai"
                      : `Comparte este código QR para recibir pagos en ${currency}`}
            </p>
          </div>

          <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
            {currentLanguage === "qu"
              ? "Wisq'ay"
              : currentLanguage === "ay"
                ? "Jist'antaña"
                : currentLanguage === "cni"
                  ? "Wisq'ay"
                  : currentLanguage === "agr"
                    ? "Tsapiktin"
                    : "Cerrar"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
