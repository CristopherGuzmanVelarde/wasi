"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  Send,
  BookOpen,
  History,
  Wifi,
  WifiOff,
  Star,
  LogOut,
  Menu,
  X,
  QrCode,
  Users,
  Store,
  Sparkles,
  Shield,
  Backpack,
  HandHeart,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { useState } from "react"

interface NavigationProps {
  currentView: string
  onViewChange: (view: string) => void
  isOnline: boolean
  userPoints: number
  userName: string
  currentLanguage: Language
  onLogout: () => void
  onShowQR: () => void
  onShowCommunity: () => void
  onShowMarketplace: () => void
  onShowCeremonies: () => void
  onShowGlossary: () => void
  onShowSecurity: () => void
  onShowAbout: () => void // Nueva prop
}

export function Navigation({
  currentView,
  onViewChange,
  isOnline,
  userPoints,
  userName,
  currentLanguage,
  onLogout,
  onShowQR,
  onShowCommunity,
  onShowMarketplace,
  onShowCeremonies,
  onShowGlossary,
  onShowSecurity,
  onShowAbout, // Agregar aquí
}: NavigationProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const t = useTranslation(currentLanguage)

  const navigationItems = [
    {
      id: "wallet",
      label: t.wallet,
      icon: Wallet,
      color: "text-blue-600",
      showInBottomNav: true,
    },
    {
      id: "payments",
      label: t.payments,
      icon: Send,
      color: "text-green-600",
      showInBottomNav: true,
    },
    {
      id: "education",
      label: t.education,
      icon: BookOpen,
      color: "text-orange-600",
      showInBottomNav: true,
    },
    {
      id: "history",
      label: t.history,
      icon: History,
      color: "text-gray-600",
      showInBottomNav: true,
    },
    {
      id: "backpack",
      label: t.backpack,
      icon: Backpack,
      color: "text-purple-600",
      showInBottomNav: false,
    },
    {
      id: "loans",
      label: t.loans,
      icon: HandHeart,
      color: "text-indigo-600",
      showInBottomNav: false,
    },
  ]

  const menuOptions = [
    {
      id: "community",
      label:
        currentLanguage === "qu"
          ? "Llaqta"
          : currentLanguage === "ay"
            ? "Marka"
            : currentLanguage === "cni"
              ? "Kemisantsi"
              : currentLanguage === "agr"
                ? "Aents"
                : "Comunidad",
      icon: Users,
      action: onShowCommunity,
    },
    {
      id: "marketplace",
      label:
        currentLanguage === "qu"
          ? "Ranqana"
          : currentLanguage === "ay"
            ? "Aljañ"
            : currentLanguage === "cni"
              ? "Ranqana"
              : currentLanguage === "agr"
                ? "Suruki"
                : "Mercado",
      icon: Store,
      action: onShowMarketplace,
    },
    {
      id: "ceremonies",
      label:
        currentLanguage === "qu"
          ? "Raymi"
          : currentLanguage === "ay"
            ? "Anata"
            : currentLanguage === "cni"
              ? "Ceremonia"
              : currentLanguage === "agr"
                ? "Ceremonia"
                : "Ritual",
      icon: Sparkles,
      action: onShowCeremonies,
    },
    {
      id: "glossary",
      label: "Glosario",
      icon: BookOpen,
      action: onShowGlossary,
    },
    {
      id: "security",
      label: "Seguridad",
      icon: Shield,
      action: onShowSecurity,
    },
    {
      id: "about",
      label:
        currentLanguage === "qu"
          ? "Riqsichiy"
          : currentLanguage === "ay"
            ? "Uñt'ayaña"
            : currentLanguage === "cni"
              ? "Yotagantsi"
              : currentLanguage === "agr"
                ? "Nekamu"
                : "Acerca de WASI",
      icon: BookOpen,
      action: onShowAbout,
    },
  ]

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              <div>
                <h1 className="text-lg font-bold">{t.appName}</h1>
                <p className="text-xs text-emerald-100 truncate">
                  {currentLanguage === "qu"
                    ? `Napaykullayki ${userName}`
                    : currentLanguage === "ay"
                      ? `Kamisaraki ${userName}`
                      : currentLanguage === "cni"
                        ? `Piarentsi ${userName}`
                        : currentLanguage === "agr"
                          ? `Yama ${userName}`
                          : `Hola ${userName}`}
                </p>
              </div>
            </div>

            {/* Status, QR and Menu */}
            <div className="flex items-center gap-2">
              <Badge variant={isOnline ? "secondary" : "destructive"} className="text-xs">
                {isOnline ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
                {isOnline ? t.online : t.offline}
              </Badge>

              <div className="flex items-center gap-1 text-xs bg-emerald-500/30 px-2 py-1 rounded">
                <Star className="h-3 w-3 text-yellow-300" />
                <span>{userPoints}</span>
              </div>

              {/* QR Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowQR}
                className="text-white hover:bg-emerald-500/30"
                title="Mi código QR"
              >
                <QrCode className="h-4 w-4" />
              </Button>

              {/* Menu Button - Ahora visible en todas las vistas */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-white hover:bg-emerald-500/30"
                title="Menú"
              >
                {showMobileMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Dropdown Menu - Funciona en móvil y desktop */}
          {showMobileMenu && (
            <div className="mt-3 pt-3 border-t border-emerald-500/30">
              {/* Navigation Items */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onViewChange(item.id)
                      setShowMobileMenu(false)
                    }}
                    className={`justify-start text-white hover:bg-emerald-500/30 ${
                      currentView === item.id ? "bg-white/20" : ""
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
              </div>

              {/* Menu Options */}
              <div className="border-t border-emerald-500/30 pt-3 mb-3">
                <p className="text-xs text-emerald-200 mb-2 px-2">Más opciones</p>
                <div className="grid grid-cols-2 gap-2">
                  {menuOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        option.action()
                        setShowMobileMenu(false)
                      }}
                      className="justify-start text-white hover:bg-emerald-500/30"
                    >
                      <option.icon className="h-4 w-4 mr-2" />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="w-full justify-start text-white hover:bg-emerald-500/30"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {currentLanguage === "qu"
                  ? "Lluqsiy"
                  : currentLanguage === "ay"
                    ? "Mistuña"
                    : currentLanguage === "cni"
                      ? "Lluqsiy"
                      : currentLanguage === "agr"
                        ? "Jiinkiar"
                        : "Salir"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation Tabs - Mantener las pestañas principales */}
      <div className="hidden md:block bg-white border-b sticky top-16 z-30">
        <div className="max-w-md mx-auto px-4">
          <div className="flex">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className={`flex-1 rounded-none border-b-2 ${
                  currentView === item.id
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <item.icon className="h-4 w-4 mr-1" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Solo 4 items principales */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-4 gap-0">
            {navigationItems
              .filter((item) => item.showInBottomNav)
              .map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange(item.id)}
                  className={`flex flex-col items-center gap-1 h-auto py-3 rounded-none border-0 ${
                    currentView === item.id ? "bg-emerald-50 text-emerald-700" : "text-gray-600"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${currentView === item.id ? "text-emerald-600" : "text-gray-500"}`}
                  />
                  <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                </Button>
              ))}
          </div>
        </div>
      </div>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {showMobileMenu && <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setShowMobileMenu(false)} />}
    </>
  )
}
