"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WifiOff, Smartphone, Bluetooth, QrCode, Clock } from "lucide-react"
import type { Translation } from "@/lib/i18n"

interface OfflineModeProps {
  t: Translation
}

export function OfflineMode({ t }: OfflineModeProps) {
  const offlineBalance = 250.0
  const validDays = 7

  return (
    <div className="space-y-4">
      {/* Offline Status */}
      <Card className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <WifiOff className="h-5 w-5" />
            {t.offlineModeActive}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-orange-100">{t.availableOffline}</p>
              <p className="text-2xl font-bold">S/ {offlineBalance.toFixed(2)}</p>
            </div>
            <div className="bg-orange-500/30 p-3 rounded-lg">
              <p className="text-sm text-orange-100">{t.localTokens}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {t.validFor} {validDays} {t.days}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.paymentMethods}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <QrCode className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.qrCode}</p>
                <p className="text-xs text-gray-500">Escanea para pagar</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              {t.available}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.ussdCode}</p>
                <p className="text-xs text-gray-500">*123# desde tu celular</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              {t.available}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Bluetooth className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.bluetooth}</p>
                <p className="text-xs text-gray-500">Pago entre dispositivos</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              {t.available}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pending Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.pendingTransactions}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Pago a Bodega Central</p>
                <p className="text-xs text-gray-500">Esperando conexión</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600">S/ 45.00</p>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                  Pendiente
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Recarga celular</p>
                <p className="text-xs text-gray-500">Esperando conexión</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600">S/ 20.00</p>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                  Pendiente
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Button */}
      <Button className="w-full" disabled>
        <WifiOff className="h-4 w-4 mr-2" />
        Sincronizar cuando haya conexión
      </Button>
    </div>
  )
}
