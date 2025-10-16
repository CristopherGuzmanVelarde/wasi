"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, RefreshCw, Network, ChevronDown, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  formatAddress,
  getBalance,
  getCurrentNetwork,
  getExplorerUrl,
  switchToNetwork,
  getRecommendedNetworks,
} from "@/lib/metamask"
import type { Language } from "@/lib/i18n"

interface WalletInfoProps {
  currentLanguage: Language
  walletAddress: string
  onNetworkChange: () => void
}

export function WalletInfo({ currentLanguage, walletAddress, onNetworkChange }: WalletInfoProps) {
  const [balance, setBalance] = useState("0")
  const [isLoading, setIsLoading] = useState(false)
  const [networkInfo, setNetworkInfo] = useState<any>(null)
  const [showNetworkSelector, setShowNetworkSelector] = useState(false)
  const [usdRate] = useState(3400) // ETH to USD aproximado
  const [solesRate] = useState(3.75) // USD to PEN

  useEffect(() => {
    if (walletAddress) {
      loadWalletData()
    }
  }, [walletAddress])

  const loadWalletData = async () => {
    setIsLoading(true)
    try {
      const balanceResult = await getBalance(walletAddress)
      if (balanceResult.success) {
        setBalance(balanceResult.balance)
      }

      const networkResult = await getCurrentNetwork()
      if (networkResult.success) {
        setNetworkInfo(networkResult)
      }
    } catch (error) {
      console.error("Error cargando datos de wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
  }

  const openInExplorer = () => {
    if (networkInfo?.chainId) {
      const explorerUrl = getExplorerUrl(networkInfo.chainId)
      if (explorerUrl) {
        window.open(`${explorerUrl}/address/${walletAddress}`, "_blank")
      }
    }
  }

  const handleNetworkSwitch = async (chainId: string) => {
    setIsLoading(true)
    try {
      const success = await switchToNetwork(chainId)
      if (success) {
        setTimeout(() => {
          loadWalletData()
          setShowNetworkSelector(false)
          onNetworkChange()
        }, 1000)
      }
    } catch (error) {
      console.error("Error cambiando red:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getBalanceInUSD = () => {
    const balanceNum = Number.parseFloat(balance)
    if (networkInfo?.currency === "ETH") {
      return (balanceNum * usdRate).toFixed(2)
    } else if (networkInfo?.currency === "MATIC") {
      return (balanceNum * 0.9).toFixed(2)
    } else if (networkInfo?.currency === "AVAX") {
      return (balanceNum * 35).toFixed(2)
    }
    return "0.00"
  }

  const getBalanceInSoles = () => {
    const usdAmount = Number.parseFloat(getBalanceInUSD())
    return (usdAmount * solesRate).toFixed(2)
  }

  const getNetworkColor = () => {
    const name = networkInfo?.networkName || ""
    if (name.includes("Ethereum") || name.includes("Holesky") || name.includes("Sepolia"))
      return "bg-blue-100 text-blue-700 border-blue-300"
    if (name.includes("Polygon")) return "bg-purple-100 text-purple-700 border-purple-300"
    if (name.includes("Avalanche")) return "bg-red-100 text-red-700 border-red-300"
    return "bg-gray-100 text-gray-700 border-gray-300"
  }

  if (!walletAddress) return null

  return (
    <div className="space-y-3">
      {/* Network Info Card */}
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-600 rounded-full">
                <Network className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-orange-900">
                  {currentLanguage === "es" ? "Red Blockchain" : "Blockchain Network"}
                </p>
                <Badge variant="outline" className={`${getNetworkColor()} text-xs mt-1`}>
                  {networkInfo?.networkName || "Loading..."}
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNetworkSelector(!showNetworkSelector)}
              className="text-xs"
            >
              <ChevronDown className="h-4 w-4 mr-1" />
              {currentLanguage === "es" ? "Cambiar" : "Change"}
            </Button>
          </div>

          {/* Balance Section */}
          <div className="space-y-2 pt-3 border-t border-orange-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-orange-700">{currentLanguage === "es" ? "Dirección:" : "Address:"}</span>
              <div className="flex items-center gap-1">
                <code className="text-xs font-mono text-orange-900">{formatAddress(walletAddress)}</code>
                <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0 hover:bg-orange-200">
                  <Copy className="h-3 w-3" />
                </Button>
                {networkInfo?.chainId && getExplorerUrl(networkInfo.chainId) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openInExplorer}
                    className="h-6 w-6 p-0 hover:bg-orange-200"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {currentLanguage === "es" ? "Balance:" : "Balance:"}
                </span>
                <Button variant="ghost" size="sm" onClick={loadWalletData} disabled={isLoading} className="h-6 w-6 p-0">
                  <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
              </div>

              {/* Crypto Balance */}
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? "..." : `${balance} ${networkInfo?.currency || "ETH"}`}
                </p>
              </div>

              {/* USD Conversion */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-gray-600">USD:</span>
                <span className="text-sm font-semibold text-gray-900">${getBalanceInUSD()}</span>
              </div>

              {/* Soles Conversion */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Soles (PEN):</span>
                <span className="text-sm font-semibold text-gray-900">S/ {getBalanceInSoles()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Selector Dialog */}
      <Dialog open={showNetworkSelector} onOpenChange={setShowNetworkSelector}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-600" />
              {currentLanguage === "es" ? "Seleccionar Red" : "Select Network"}
            </DialogTitle>
            <DialogDescription>
              {currentLanguage === "es"
                ? "Elige la red blockchain para realizar transacciones"
                : "Choose the blockchain network to perform transactions"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
            {getRecommendedNetworks().map((network) => (
              <Button
                key={network.chainId}
                variant="outline"
                size="lg"
                onClick={() => handleNetworkSwitch(network.chainId)}
                disabled={isLoading || networkInfo?.chainId === network.chainId}
                className={`w-full justify-between h-auto py-3 ${
                  networkInfo?.chainId === network.chainId
                    ? "border-2 border-blue-500 bg-blue-50 hover:bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{network.name}</span>
                    {networkInfo?.chainId === network.chainId && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {currentLanguage === "es" ? "Activa" : "Active"}
                      </Badge>
                    )}
                  </div>
                  {network.isTestnet && (
                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700 border-yellow-300">
                      Testnet
                    </Badge>
                  )}
                </div>
                <span className="text-gray-600 font-mono text-xs font-bold">{network.currency}</span>
              </Button>
            ))}
          </div>

          <div className="text-xs text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="font-semibold mb-1 flex items-center gap-1">
              💡 {currentLanguage === "es" ? "Consejo" : "Tip"}
            </p>
            <p className="text-blue-600">
              {currentLanguage === "es"
                ? "Cada red tiene su propio balance. Al cambiar de red, tu balance se actualizará automáticamente."
                : "Each network has its own balance. When you change networks, your balance will update automatically."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
