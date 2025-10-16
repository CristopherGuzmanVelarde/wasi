"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Heart, Star, Flower, Gift } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface PaymentCeremoniesProps {
  language: Language
  onCeremonyComplete: (points: number) => void
}

export function PaymentCeremonies({ language, onCeremonyComplete }: PaymentCeremoniesProps) {
  const [activeCeremony, setActiveCeremony] = useState<string | null>(null)
  const [ceremonyProgress, setCeremonyProgress] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const t = useTranslation(language)

  const ceremonies = [
    {
      name: language === "qu" ? "Ayni Raymi" : "Ceremonia de Reciprocidad",
      description: language === "qu" ? "Ayni ruway, yanapanakuy" : "Ritual de intercambio y ayuda mutua",
      points: 50,
      icon: Heart,
      color: "from-red-500 to-pink-500",
      steps: ["Ofrenda", "Intercambio", "Agradecimiento", "Bendición"],
      cultural: "Tradición andina de reciprocidad",
    },
    {
      name: language === "qu" ? "Qullqi Raymi" : "Ceremonia de Prosperidad",
      description: language === "qu" ? "Qullqi miray, sumaq kausay" : "Ritual para atraer abundancia económica",
      points: 75,
      icon: Sparkles,
      color: "from-green-500 to-emerald-500",
      steps: ["Convocatoria", "Trabajo", "Compartir", "Celebración"],
      cultural: "Trabajo colectivo para el bien común",
    },
  ]

  const startCeremony = (ceremonyId: string) => {
    setActiveCeremony(ceremonyId)
    setCeremonyProgress(0)

    // Simular progreso de ceremonia
    const interval = setInterval(() => {
      setCeremonyProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowCelebration(true)
          const ceremony = ceremonies.find((c) => c.name === ceremonyId)
          if (ceremony) {
            onCeremonyComplete(ceremony.points)
          }
          setTimeout(() => {
            setShowCelebration(false)
            setActiveCeremony(null)
          }, 3000)
          return 100
        }
        return prev + 25
      })
    }, 1000)
  }

  if (showCelebration) {
    const ceremony = ceremonies.find((c) => c.name === activeCeremony)
    return (
      <Card className={`bg-gradient-to-r ${ceremony?.color} text-white animate-pulse`}>
        <CardContent className="p-6 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="font-bold text-lg mb-2">
            {language === "qu" ? "¡Kusikuy! Raymikuy tukusqa!" : "¡Felicidades! Ceremonia completada!"}
          </h3>
          <p className="text-sm opacity-90 mb-4">{ceremony?.cultural}</p>
          <div className="flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-yellow-300" />
            <span className="font-semibold">+{ceremony?.points} puntos</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (activeCeremony) {
    const ceremony = ceremonies.find((c) => c.name === activeCeremony)
    const currentStep = Math.floor(ceremonyProgress / 25)

    return (
      <Card className={`bg-gradient-to-r ${ceremony?.color} text-white`}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso</span>
              <span>{ceremonyProgress}%</span>
            </div>
            <Progress value={ceremonyProgress} className="h-2 bg-white/20" />
          </div>

          <div className="space-y-2">
            {ceremony?.steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-2 rounded ${
                  index <= currentStep ? "bg-white/20" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    index < currentStep
                      ? "bg-green-300"
                      : index === currentStep
                        ? "bg-yellow-300 animate-pulse"
                        : "bg-white/50"
                  }`}
                />
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>

          <p className="text-xs opacity-80">{ceremony?.cultural}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {ceremonies.map((ceremony, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-r ${ceremony.color} rounded-full flex items-center justify-center`}
              >
                <ceremony.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{ceremony.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{ceremony.description}</p>
                <Button
                  size="sm"
                  onClick={() => startCeremony(ceremony.name)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Participar (+{ceremony.points} puntos)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Flower className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-yellow-800">
                {language === "qu" ? "Ñawpaq Yachay" : "Sabiduría Ancestral"}
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                {language === "qu"
                  ? "Raymikuna ruraspayki, ñawpaq yachaykunata chaninchaspa, aswan allin qullqi yachayta tarinki."
                  : "Al participar en ceremonias, honras las tradiciones ancestrales y obtienes mejor educación financiera."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
