"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sun, Moon, Heart } from "lucide-react"
import type { Language } from "@/lib/i18n"

interface CulturalGreetingProps {
  language: Language
  userName: string
}

export function CulturalGreeting({ language, userName }: CulturalGreetingProps) {
  const hour = new Date().getHours()
  const isEvening = hour >= 18
  const isMorning = hour < 12

  const getGreeting = () => {
    switch (language) {
      case "qu":
        if (isMorning) return `Allin punchaw, ${userName}!`
        if (isEvening) return `Allin tuta, ${userName}!`
        return `Allin chishi, ${userName}!`
      case "ay":
        if (isMorning) return `Suma uru, ${userName}!`
        if (isEvening) return `Suma aruma, ${userName}!`
        return `Suma jayp'u, ${userName}!`
      case "cni":
        if (isMorning) return `Kametsa asaiki, ${userName}!`
        if (isEvening) return `Kametsa kashiri, ${userName}!`
        return `Kametsa, ${userName}!`
      case "agr":
        if (isMorning) return `Yama tsawan, ${userName}!`
        if (isEvening) return `Yama kashi, ${userName}!`
        return `Yama, ${userName}!`
      default:
        if (isMorning) return `¡Buenos días, ${userName}!`
        if (isEvening) return `¡Buenas noches, ${userName}!`
        return `¡Buenas tardes, ${userName}!`
    }
  }

  const getBlessings = () => {
    switch (language) {
      case "qu":
        return "Sumaq p'unchaywan kachun"
      case "ay":
        return "Suma urunakaxa utjañapa"
      case "cni":
        return "Kametsa asaiki kara"
      case "agr":
        return "Pujut tsawan aidau"
      default:
        return "Que tengas un día próspero"
    }
  }

  return (
    <Card className="mb-4 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
            {isMorning ? (
              <Sun className="h-5 w-5 text-white" />
            ) : isEvening ? (
              <Moon className="h-5 w-5 text-white" />
            ) : (
              <Heart className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <p className="font-semibold text-emerald-800">{getGreeting()}</p>
            <p className="text-sm text-emerald-600">{getBlessings()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
