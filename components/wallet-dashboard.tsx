"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, TrendingUp, TrendingDown, Wallet, CreditCard, Zap, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"
import { useTranslation, type Language } from "@/lib/i18n"
import { WalletInfo } from "@/components/wallet-info"

interface WalletDashboardProps {
  currentLanguage: Language
  userName: string
  isMetaMaskLogin: boolean
  currency: string
  balance: number
  networkName: string
  userLevel: number
  userPoints: number
  walletAddress?: string
  onNetworkChange?: () => void
}

export function WalletDashboard({
  currentLanguage,
  userName,
  isMetaMaskLogin,
  currency,
  balance,
  networkName,
  userLevel,
  userPoints,
  walletAddress,
  onNetworkChange,
}: WalletDashboardProps) {
  const [showBalance, setShowBalance] = useState(true)
  const t = useTranslation(currentLanguage)

  const formatBalance = () => {
    if (isMetaMaskLogin) {
      return balance.toFixed(4)
    }
    return balance.toFixed(2)
  }

  const weeklyReceived = isMetaMaskLogin ? (balance * 0.3).toFixed(4) : "320.5"
  const weeklySpent = isMetaMaskLogin ? (balance * 0.2).toFixed(4) : "180.25"

  return (
    <div className="space-y-4">
      {/* MetaMask Wallet Info with Network Selector - SOLO PARA METAMASK */}
      {isMetaMaskLogin && walletAddress && onNetworkChange && (
        <WalletInfo
          currentLanguage={currentLanguage}
          walletAddress={walletAddress}
          onNetworkChange={onNetworkChange}
        />
      )}

      {/* Main Balance */}
      <Card
        className={`${isMetaMaskLogin ? "bg-gradient-to-r from-purple-600 to-blue-700" : "bg-gradient-to-r from-emerald-600 to-emerald-700"} text-white`}
      >
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              {isMetaMaskLogin ? (currentLanguage === "es" ? "Billetera Blockchain" : "Blockchain Wallet") : t.myWallet}
            </div>
            <button onClick={() => setShowBalance(!showBalance)} className="hover:bg-white/10 rounded p-1">
              {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-90">
                {isMetaMaskLogin ? (currentLanguage === "es" ? "Balance en Red" : "Network Balance") : t.digitalSoles}
              </p>
              <p className="text-3xl font-bold">{showBalance ? `${currency} ${formatBalance()}` : "••••••"}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                  {isMetaMaskLogin ? (
                    <>
                      <Zap className="h-3 w-3 mr-1" />
                      {networkName}
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-3 w-3 mr-1" />
                      BCRP Digital
                    </>
                  )}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`${isMetaMaskLogin ? "bg-purple-500/30" : "bg-emerald-500/30"} p-3 rounded-lg`}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className={`h-4 w-4 ${isMetaMaskLogin ? "text-purple-200" : "text-emerald-200"}`} />
                  <span className={`text-xs ${isMetaMaskLogin ? "text-purple-100" : "text-emerald-100"}`}>
                    {t.thisWeekReceived}
                  </span>
                </div>
                <p className="font-semibold">
                  {currency} {weeklyReceived}
                </p>
              </div>

              <div className={`${isMetaMaskLogin ? "bg-purple-500/30" : "bg-emerald-500/30"} p-3 rounded-lg`}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className={`h-4 w-4 ${isMetaMaskLogin ? "text-purple-200" : "text-emerald-200"}`} />
                  <span className={`text-xs ${isMetaMaskLogin ? "text-purple-100" : "text-emerald-100"}`}>
                    {t.thisWeekSpent}
                  </span>
                </div>
                <p className="font-semibold">
                  {currency} {weeklySpent}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold text-sm">
                {t.level} {userLevel}
              </p>
              <p className="text-xs text-gray-500">
                {userPoints} {t.points}
              </p>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Intermedio
            </Badge>
          </div>
          <Progress value={(userPoints % 200) / 2} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">{200 - (userPoints % 200)} puntos para el siguiente nivel</p>
        </CardContent>
      </Card>

      {/* Payment Types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.availablePayments}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.personToPerson}</p>
                <p className="text-xs text-gray-500">Envía a familiares y amigos</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              {t.active}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.personToBusiness}</p>
                <p className="text-xs text-gray-500">Paga en tiendas y comercios</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              {t.active}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.governmentToPerson}</p>
                <p className="text-xs text-gray-500">Recibe subsidios y bonos</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
              Próximamente
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Info Message */}
      {isMetaMaskLogin && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-3">
            <div className="flex gap-2">
              <Zap className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-purple-900">
                {currentLanguage === "es"
                  ? "Conectado a blockchain. Los balances se muestran en la moneda nativa de la red."
                  : "Connected to blockchain. Balances are shown in the network's native currency."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {!isMetaMaskLogin && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3">
            <div className="flex gap-2">
              <CreditCard className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-green-800">
                {currentLanguage === "es"
                  ? "Usando soles peruanos (S/). Tu dinero está respaldado por el BCRP."
                  : "Using Peruvian soles (S/). Your money is backed by BCRP."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
