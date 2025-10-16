"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Check, AlertCircle, Zap } from "lucide-react"
import { getRecommendedNetworks, getCurrentNetwork, switchToNetwork, type NetworkConfig } from "@/lib/metamask"
import type { Language } from "@/lib/i18n"

interface NetworkSelectorProps {
  currentLanguage: Language
  onNetworkChange?: () => void
}

export function NetworkSelector({ currentLanguage, onNetworkChange }: NetworkSelectorProps) {
  const [open, setOpen] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState<NetworkConfig | null>(null)
  const [switching, setSwitching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const networks = getRecommendedNetworks()

  useEffect(() => {
    loadCurrentNetwork()
  }, [])

  const loadCurrentNetwork = async () => {
    const result = await getCurrentNetwork()
    if (result.success) {
      const network = networks.find((n) => n.chainId === result.chainId)
      setCurrentNetwork(network || null)
    }
  }

  const handleSwitchNetwork = async (network: NetworkConfig) => {
    setSwitching(true)
    setError(null)

    try {
      await switchToNetwork(network.chainId)
      setCurrentNetwork(network)
      setOpen(false)
      onNetworkChange?.()
    } catch (err: any) {
      setError(err.message || "Failed to switch network")
    } finally {
      setSwitching(false)
    }
  }

  const getNetworkLabel = (network: NetworkConfig) => {
    if (currentLanguage === "es") {
      return network.name
    }
    return network.name
  }

  const getNetworkBadgeColor = (network: NetworkConfig) => {
    if (network.isTestnet) {
      return "bg-yellow-100 text-yellow-800"
    }
    return "bg-green-100 text-green-800"
  }

  const getCategoryNetworks = (category: "mainnet" | "testnet") => {
    return networks.filter((n) => (category === "testnet" ? n.isTestnet : !n.isTestnet))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentNetwork?.name || "Seleccionar Red"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {currentLanguage === "es" ? "Seleccionar Red Blockchain" : "Select Blockchain Network"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Network */}
          {currentNetwork && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {currentLanguage === "es" ? "Red Actual" : "Current Network"}
                      </p>
                      <p className="text-xs text-gray-600">{currentNetwork.name}</p>
                    </div>
                  </div>
                  <Badge className={getNetworkBadgeColor(currentNetwork)}>
                    {currentNetwork.isTestnet
                      ? currentLanguage === "es"
                        ? "Testnet"
                        : "Testnet"
                      : currentLanguage === "es"
                        ? "Mainnet"
                        : "Mainnet"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {error && (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Testnets */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-700">
              {currentLanguage === "es" ? "Redes de Prueba" : "Test Networks"}
            </h3>
            <div className="grid gap-2">
              {getCategoryNetworks("testnet").map((network) => (
                <Card
                  key={network.chainId}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentNetwork?.chainId === network.chainId ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => handleSwitchNetwork(network)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentNetwork?.chainId === network.chainId ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        >
                          <Globe
                            className={`h-5 w-5 ${currentNetwork?.chainId === network.chainId ? "text-white" : "text-gray-600"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{getNetworkLabel(network)}</p>
                          <p className="text-xs text-gray-500">
                            {network.currency} • {currentLanguage === "es" ? "Red de Prueba" : "Test Network"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getNetworkBadgeColor(network)}>
                          {network.currency}
                        </Badge>
                        {currentNetwork?.chainId === network.chainId && (
                          <Check className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mainnets */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-700">
              {currentLanguage === "es" ? "Redes Principales" : "Main Networks"}
            </h3>
            <div className="grid gap-2">
              {getCategoryNetworks("mainnet").map((network) => (
                <Card
                  key={network.chainId}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentNetwork?.chainId === network.chainId ? "border-green-500 bg-green-50" : ""
                  }`}
                  onClick={() => handleSwitchNetwork(network)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentNetwork?.chainId === network.chainId ? "bg-green-600" : "bg-gray-200"
                          }`}
                        >
                          <Globe
                            className={`h-5 w-5 ${currentNetwork?.chainId === network.chainId ? "text-white" : "text-gray-600"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{getNetworkLabel(network)}</p>
                          <p className="text-xs text-gray-500">
                            {network.currency} • {currentLanguage === "es" ? "Red Principal" : "Main Network"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getNetworkBadgeColor(network)}>
                          {network.currency}
                        </Badge>
                        {currentNetwork?.chainId === network.chainId && (
                          <Check className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Info */}
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-purple-900">
                  {currentLanguage === "es"
                    ? "Las redes de prueba (testnets) usan criptomonedas sin valor real. Úsalas para probar sin riesgo."
                    : "Test networks (testnets) use cryptocurrencies with no real value. Use them to test without risk."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
