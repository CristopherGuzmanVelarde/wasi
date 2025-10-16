"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WalletIcon, Smartphone, User, AlertCircle, ExternalLink } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import {
  connectMetaMask,
  isMetaMaskInstalled,
  formatAddress,
  getConnectedAccounts,
  setupMetaMaskListeners,
  removeMetaMaskListeners,
  signMessage,
} from "@/lib/metamask"

interface LoginProps {
  onLogin: (name: string, phone: string, address?: string) => void
  currentLanguage: Language
  onLanguageChange?: (lang: Language) => void
}

export function Login({ onLogin, currentLanguage, onLanguageChange }: LoginProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [walletError, setWalletError] = useState("")
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false)
  const [showWalletLogin, setShowWalletLogin] = useState(false)
  const t = useTranslation(currentLanguage)

  useEffect(() => {
    // Detectar MetaMask
    setIsMetaMaskAvailable(isMetaMaskInstalled())

    // Verificar si ya hay una conexión
    checkExistingConnection()

    // Configurar listeners
    setupMetaMaskListeners({
      onAccountsChanged: (accounts) => {
        if (accounts.length === 0) {
          setWalletAddress("")
        } else {
          setWalletAddress(accounts[0])
        }
      },
      onChainChanged: () => {
        // Recargar la página cuando cambie la red
        window.location.reload()
      },
    })

    return () => {
      removeMetaMaskListeners()
    }
  }, [])

  const checkExistingConnection = async () => {
    try {
      const accounts = await getConnectedAccounts()
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
      }
    } catch (error) {
      console.error("Error verificando conexión existente:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && phone) {
      onLogin(name, phone)
    }
  }

  const handleMetaMaskConnect = async () => {
    setIsConnecting(true)
    setWalletError("")

    try {
      const result = await connectMetaMask()

      if (result.success) {
        setWalletAddress(result.address)

        // Generar mensaje para firmar
        const message = `Iniciar sesión en ${t.appName}\nFecha: ${new Date().toISOString()}\nDirección: ${result.address}`

        // Solicitar firma
        const signResult = await signMessage(message, result.address)

        if (signResult.success) {
          // Crear nombre de usuario basado en la dirección
          const userName = `Usuario ${formatAddress(result.address)}`
          // Pasar la dirección como tercer parámetro (address), no como phone
          onLogin(userName, "", result.address)
        } else {
          setWalletError(signResult.error || "Error al firmar mensaje")
        }
      } else {
        setWalletError(result.error || "Error conectando MetaMask")
      }
    } catch (error: any) {
      setWalletError(error.message || "Error inesperado")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleInstallMetaMask = () => {
    window.open("https://metamask.io/download/", "_blank")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mb-4">
            <WalletIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t.appName}</h1>
          <p className="text-gray-600 mt-2">
            {currentLanguage === "qu"
              ? "Digital qullqi wasi"
              : currentLanguage === "ay"
                ? "Digital qullqi uta"
                : currentLanguage === "cni"
                  ? "Digital patsani wasi"
                  : currentLanguage === "agr"
                    ? "Digital kuichik jea"
                    : "Billetera Digital del BCRP"}
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {currentLanguage === "qu"
                ? "Yaykuy"
                : currentLanguage === "ay"
                  ? "Mantaña"
                  : currentLanguage === "cni"
                    ? "Yaykuy"
                    : currentLanguage === "agr"
                      ? "Wayawai"
                      : "Iniciar Sesión"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {currentLanguage === "qu"
                    ? "Sutiyki"
                    : currentLanguage === "ay"
                      ? "Sutima"
                      : currentLanguage === "cni"
                        ? "Tsitantsi"
                        : currentLanguage === "agr"
                          ? "Naari"
                          : "Tu nombre"}
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    currentLanguage === "qu"
                      ? "Sutiykita qillqay"
                      : currentLanguage === "ay"
                        ? "Sutima qillqt'aña"
                        : currentLanguage === "cni"
                          ? "Tsitantsi qillqay"
                          : currentLanguage === "agr"
                            ? "Naari aartarum"
                            : "Escribe tu nombre"
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  {currentLanguage === "qu"
                    ? "Telefono"
                    : currentLanguage === "ay"
                      ? "Telefono"
                      : currentLanguage === "cni"
                        ? "Telefono"
                        : currentLanguage === "agr"
                          ? "Telefono"
                          : "Teléfono"}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+51 987 654 321"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                {currentLanguage === "qu"
                  ? "Yaykuy"
                  : currentLanguage === "ay"
                    ? "Mantaña"
                    : currentLanguage === "cni"
                      ? "Yaykuy"
                      : currentLanguage === "agr"
                        ? "Wayawai"
                        : "Ingresar"}
              </Button>

              {/* MetaMask Login */}
              {isMetaMaskAvailable ? (
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        {currentLanguage === "qu"
                          ? "Utaq"
                          : currentLanguage === "ay"
                            ? "Jan ukax"
                            : currentLanguage === "cni"
                              ? "Ataksha"
                              : currentLanguage === "agr"
                                ? "Ataksha"
                                : "O"}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600 hover:from-orange-600 hover:to-orange-700"
                    onClick={handleMetaMaskConnect}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {currentLanguage === "qu"
                          ? "Tinkichkan..."
                          : currentLanguage === "ay"
                            ? "Mayacht'asa..."
                            : currentLanguage === "cni"
                              ? "Tinkichkan..."
                              : currentLanguage === "agr"
                                ? "Etserin..."
                                : "Conectando..."}
                      </div>
                    ) : (
                      <>
                        <WalletIcon className="h-4 w-4 mr-2" />
                        {currentLanguage === "qu"
                          ? "MetaMask-wan yaykuy"
                          : currentLanguage === "ay"
                            ? "MetaMask-ampi mantaña"
                            : currentLanguage === "cni"
                              ? "MetaMask-wan yaykuy"
                              : currentLanguage === "agr"
                                ? "MetaMask-jai wayawai"
                                : "Conectar con MetaMask"}
                      </>
                    )}
                  </Button>

                  {walletError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <p className="text-sm text-red-700">{walletError}</p>
                    </div>
                  )}

                  {walletAddress && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <WalletIcon className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Wallet conectada</p>
                        <p className="text-xs text-green-600 font-mono">{formatAddress(walletAddress)}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        {currentLanguage === "qu"
                          ? "Utaq"
                          : currentLanguage === "ay"
                            ? "Jan ukax"
                            : currentLanguage === "cni"
                              ? "Ataksha"
                              : currentLanguage === "agr"
                                ? "Ataksha"
                                : "O"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-3">
                      <WalletIcon className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-orange-800">
                          {currentLanguage === "qu"
                            ? "MetaMask mana kachkan"
                            : currentLanguage === "ay"
                              ? "MetaMask janiw utjiti"
                              : currentLanguage === "cni"
                                ? "MetaMask tekatsi kachkan"
                                : currentLanguage === "agr"
                                  ? "MetaMask atsa aidau"
                                  : "MetaMask no detectado"}
                        </p>
                        <p className="text-xs text-orange-700 mt-1">
                          {currentLanguage === "qu"
                            ? "Crypto qullqiwan yaykuypaq MetaMask churay"
                            : currentLanguage === "ay"
                              ? "Crypto qullqimpi mantañataki MetaMask uchaña"
                              : currentLanguage === "cni"
                                ? "Crypto patsaniwan yaykuypaq MetaMask churay"
                                : currentLanguage === "agr"
                                  ? "Crypto kuichikjai wayawaipat MetaMask uchik"
                                  : "Instala MetaMask para usar tu wallet crypto"}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 bg-transparent border-orange-300 text-orange-700 hover:bg-orange-100"
                          onClick={handleInstallMetaMask}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {currentLanguage === "qu"
                            ? "MetaMask churay"
                            : currentLanguage === "ay"
                              ? "MetaMask uchaña"
                              : currentLanguage === "cni"
                                ? "MetaMask churay"
                                : currentLanguage === "agr"
                                  ? "MetaMask uchik"
                                  : "Instalar MetaMask"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 gap-3 text-center text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>
              {currentLanguage === "qu"
                ? "Mana internetwan llamkay"
                : currentLanguage === "ay"
                  ? "Janiw internetampi irnaqaña"
                  : currentLanguage === "cni"
                    ? "Mana internetwan llamkay"
                    : currentLanguage === "agr"
                      ? "Internet atsau takakmau"
                      : "Funciona sin internet"}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>
              {currentLanguage === "qu"
                ? "Tukuy rimaykuna"
                : currentLanguage === "ay"
                  ? "Taqi arunaka"
                  : currentLanguage === "cni"
                    ? "Tukuy rimaykuna"
                    : currentLanguage === "agr"
                      ? "Ashí chicham"
                      : "Todos los idiomas"}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>
              {currentLanguage === "qu"
                ? "Waqaychasqa qullqi"
                : currentLanguage === "ay"
                  ? "Imasir qullqi"
                  : currentLanguage === "cni"
                    ? "Waqaychasqa patsani"
                    : currentLanguage === "agr"
                      ? "Ipiamtai kuichik"
                      : "100% seguro"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
