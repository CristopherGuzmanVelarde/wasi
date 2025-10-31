"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  Shield,
  Globe,
  Zap,
  Users,
  BookOpen,
  Heart,
  Sparkles,
  TrendingUp,
  Lock,
  Smartphone,
  QrCode,
  WifiOff,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  X,
} from "lucide-react"
import { type Language, useTranslation, languageFlags, languageNames } from "@/lib/i18n"
import { LanguageSelector } from "@/components/language-selector"

interface LandingPageProps {
  onGetStarted: () => void
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
  showCloseButton?: boolean
  onClose?: () => void
}

export function LandingPage({
  onGetStarted,
  currentLanguage,
  onLanguageChange,
  showCloseButton = false,
  onClose,
}: LandingPageProps) {
  const t = useTranslation(currentLanguage)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  const objectives = [
    {
      icon: Users,
      title: t.objective1Title,
      description: t.objective1Text,
      color: "bg-blue-500",
    },
    {
      icon: Shield,
      title: t.objective2Title,
      description: t.objective2Text,
      color: "bg-green-500",
    },
    {
      icon: Globe,
      title: t.objective3Title,
      description: t.objective3Text,
      color: "bg-purple-500",
    },
    {
      icon: Zap,
      title: t.objective4Title,
      description: t.objective4Text,
      color: "bg-orange-500",
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: t.benefit1Title,
      description: t.benefit1Text,
      color: "bg-emerald-500",
    },
    {
      icon: Zap,
      title: t.benefit2Title,
      description: t.benefit2Text,
      color: "bg-yellow-500",
    },
    {
      icon: WifiOff,
      title: t.benefit3Title,
      description: t.benefit3Text,
      color: "bg-indigo-500",
    },
    {
      icon: Lock,
      title: t.benefit4Title,
      description: t.benefit4Text,
      color: "bg-red-500",
    },
  ]

  const features = [
    {
      icon: Globe,
      title: t.feature1Title,
      description: t.feature1Text,
      badge: "6 idiomas",
    },
    {
      icon: Wallet,
      title: t.feature2Title,
      description: t.feature2Text,
      badge: "Web3",
    },
    {
      icon: Heart,
      title: t.feature3Title,
      description: t.feature3Text,
      badge: "Gamificado",
    },
    {
      icon: Users,
      title: t.feature4Title,
      description: t.feature4Text,
      badge: "P2P",
    },
    {
      icon: BookOpen,
      title: t.feature5Title,
      description: t.feature5Text,
      badge: "Gratis",
    },
    {
      icon: Sparkles,
      title: t.feature6Title,
      description: t.feature6Text,
      badge: "Cultural",
    },
  ]

  const team = [
    {
      name: "Cristopher Guzmán",
      role: t.role1,
      image: "https://images4.imagebam.com/05/3f/6b/ME16WZS9_o.png",
      github: "https://github.com/CristopherGuzmanVelarde",
      linkedin: "https://linkedin.com",
      email: "cristopher@wasi.pe",
    },
    {
      name: "Favio Huamán",
      role: t.role2,
      image: "https://images4.imagebam.com/ff/d2/8b/ME179A9O_o.PNG",
      github: "https://github.com/FaviohuamanVG",
      linkedin: "https://linkedin.com",
      email: "favio@wasi.pe",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-red-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">WASI</h1>
                <p className="text-xs text-gray-500">CBDC Perú</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
              {showCloseButton && onClose && (
                <Button onClick={onClose} variant="ghost" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  {currentLanguage === "es"
                    ? "Cerrar"
                    : currentLanguage === "en"
                      ? "Close"
                      : currentLanguage === "qu"
                        ? "Wichqay"
                        : currentLanguage === "ay"
                          ? "Jist'araña"
                          : currentLanguage === "cni"
                            ? "Tsipatantari"
                            : "Eretin"}
                </Button>
              )}
              <Button onClick={onGetStarted} className="bg-emerald-600 hover:bg-emerald-700">
                {t.startButton}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-emerald-100 text-emerald-800 border-emerald-200">
              {currentLanguage === "es" ? "Banco Central de Reserva del Perú" : "Central Reserve Bank of Peru"}
            </Badge>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.landingTitle}
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{t.landingSubtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={onGetStarted} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                {t.startButton}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => scrollToSection("description")}
                size="lg"
                variant="outline"
                className="text-lg px-8"
              >
                {t.learnMoreButton}
              </Button>
            </div>

            {/* Language Badges */}
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.entries(languageFlags).map(([code, flag]) => (
                <Badge key={code} variant="outline" className="text-sm">
                  {flag} {languageNames[code as Language]}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section id="description" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.descriptionTitle}</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">{t.descriptionText}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-emerald-500 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {currentLanguage === "es"
                    ? "Fácil de Usar"
                    : currentLanguage === "en"
                      ? "Easy to Use"
                      : currentLanguage === "qu"
                        ? "Mana Sasa"
                        : currentLanguage === "ay"
                          ? "Jani Ch'ama"
                          : currentLanguage === "cni"
                            ? "Mana Sasa"
                            : "Pénker Najánamu"}
                </h3>
                <p className="text-gray-600">
                  {currentLanguage === "es"
                    ? "Interfaz intuitiva diseñada para todos"
                    : currentLanguage === "en"
                      ? "Intuitive interface designed for everyone"
                      : currentLanguage === "qu"
                        ? "Llapanpaq rurasqa"
                        : currentLanguage === "ay"
                          ? "Taqpachar lurata"
                          : currentLanguage === "cni"
                            ? "Antamikipataki rurasqa"
                            : "Ashípataki najanamu"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-500 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {currentLanguage === "es"
                    ? "100% Seguro"
                    : currentLanguage === "en"
                      ? "100% Secure"
                      : currentLanguage === "qu"
                        ? "Hunt'a Waqaychasqa"
                        : currentLanguage === "ay"
                          ? "Taqpacha Jark'ata"
                          : currentLanguage === "cni"
                            ? "Antamiki Jark'ata"
                            : "Ashí Ayamprau"}
                </h3>
                <p className="text-gray-600">
                  {currentLanguage === "es"
                    ? "Tecnología blockchain del BCRP"
                    : currentLanguage === "en"
                      ? "BCRP blockchain technology"
                      : currentLanguage === "qu"
                        ? "BCRP tecnología"
                        : currentLanguage === "ay"
                          ? "BCRP tecnología"
                          : currentLanguage === "cni"
                            ? "BCRP tecnología"
                            : "BCRP tecnología"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-500 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {currentLanguage === "es"
                    ? "Funciona Offline"
                    : currentLanguage === "en"
                      ? "Works Offline"
                      : currentLanguage === "qu"
                        ? "Mana Internetwan"
                        : currentLanguage === "ay"
                          ? "Janiw Internetampi"
                          : currentLanguage === "cni"
                            ? "Tekatsi Internet"
                            : "Atsa Internet"}
                </h3>
                <p className="text-gray-600">
                  {currentLanguage === "es"
                    ? "QR, USSD y Bluetooth disponibles"
                    : currentLanguage === "en"
                      ? "QR, USSD and Bluetooth available"
                      : currentLanguage === "qu"
                        ? "QR, USSD, Bluetooth kanmi"
                        : currentLanguage === "ay"
                          ? "QR, USSD, Bluetooth utji"
                          : currentLanguage === "cni"
                            ? "QR, USSD, Bluetooth ayotero"
                            : "QR, USSD, Bluetooth aidau"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.objectivesTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 ${objective.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <objective.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{objective.title}</h3>
                      <p className="text-gray-600">{objective.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.benefitsTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.featuresTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-500"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.teamTitle}</h2>
            <p className="text-lg text-gray-600">{t.teamSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-blue-500">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-4">{member.role}</p>

                  <div className="flex justify-center gap-4">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 hover:bg-emerald-100 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Github className="h-5 w-5 text-gray-700" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-gray-700" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-gray-100 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Mail className="h-5 w-5 text-gray-700" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {currentLanguage === "es"
              ? "¿Listo para comenzar tu viaje financiero digital?"
              : currentLanguage === "en"
                ? "Ready to start your digital financial journey?"
                : currentLanguage === "qu"
                  ? "¿Listuchu digital qullqi ñanta qallayta?"
                  : currentLanguage === "ay"
                    ? "¿Wakicht'atati digital qullqi thakhi qalltañataki?"
                    : currentLanguage === "cni"
                      ? "¿Wakicht'atakari digital patsani ñan qallayta?"
                      : "¿Iwaku digital kuichik jinta jintiatniuka?"}
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            {currentLanguage === "es"
              ? "Únete a miles de peruanos que ya están usando WASI para sus pagos diarios"
              : currentLanguage === "en"
                ? "Join thousands of Peruvians already using WASI for their daily payments"
                : currentLanguage === "qu"
                  ? "Waranqa peruanokunanwan WASI-ta sapa p'unchay qullqi quykunapi"
                  : currentLanguage === "ay"
                    ? "Waranqa peruano jaqinakampi WASI sapa uru qullqi churañataki"
                    : currentLanguage === "cni"
                      ? "Waranqa peruano ashaninkapataki WASI sapa p'unchay patsani churañ"
                      : "Waranqa peruano aentspataki WASI sapa tsawan kuichik churañ"}
          </p>
          <Button onClick={onGetStarted} size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8">
            {t.startButton}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">WASI</h3>
                  <p className="text-xs text-gray-400">CBDC Perú</p>
                </div>
              </div>
              <p className="text-sm">
                {currentLanguage === "es"
                  ? "Billetera digital oficial del Banco Central de Reserva del Perú"
                  : currentLanguage === "en"
                    ? "Official digital wallet of the Central Reserve Bank of Peru"
                    : currentLanguage === "qu"
                      ? "BCRP-pa hunt'a digital qullqi wasi"
                      : currentLanguage === "ay"
                        ? "BCRP-an taqpacha digital qullqi uta"
                        : currentLanguage === "cni"
                          ? "BCRP-manta antamiki digital patsani wasi"
                          : "BCRP-manta ashí digital kuichik jea"}
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                {currentLanguage === "es"
                  ? "Enlaces"
                  : currentLanguage === "en"
                    ? "Links"
                    : currentLanguage === "qu"
                      ? "Tinkikuna"
                      : currentLanguage === "ay"
                        ? "Mayacht'awinaka"
                        : currentLanguage === "cni"
                          ? "Tinkikuna"
                          : "Irunmu"}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection("description")} className="hover:text-white transition-colors">
                    {t.descriptionTitle}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("objectives")} className="hover:text-white transition-colors">
                    {t.objectivesTitle}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("benefits")} className="hover:text-white transition-colors">
                    {t.benefitsTitle}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors">
                    {t.featuresTitle}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("team")} className="hover:text-white transition-colors">
                    {t.teamTitle}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                {currentLanguage === "es"
                  ? "Idiomas"
                  : currentLanguage === "en"
                    ? "Languages"
                    : currentLanguage === "qu"
                      ? "Simikuna"
                      : currentLanguage === "ay"
                        ? "Arunaka"
                        : currentLanguage === "cni"
                          ? "Simikuna"
                          : "Chicham"}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(languageFlags).map(([code, flag]) => (
                  <button
                    key={code}
                    onClick={() => onLanguageChange(code as Language)}
                    className={`text-left hover:text-white transition-colors ${
                      currentLanguage === code ? "text-emerald-400 font-semibold" : ""
                    }`}
                  >
                    {flag} {languageNames[code as Language]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>
              © 2025 WASI - Banco Central de Reserva del Perú.{" "}
              {currentLanguage === "es"
                ? "Todos los derechos reservados"
                : currentLanguage === "en"
                  ? "All rights reserved"
                  : currentLanguage === "qu"
                    ? "Tukuy derechokuna waqaychasqa"
                    : currentLanguage === "ay"
                      ? "Taqi derechonakaxa jark'ata"
                      : currentLanguage === "cni"
                        ? "Antamiki derechokuna jark'ata"
                        : "Ashí derechonakaxa ayamprau"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
