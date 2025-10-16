"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import type { Language } from "@/lib/i18n"

interface VoiceNavigationProps {
  currentLanguage: Language
  onCommand: (command: string) => void
}

export function VoiceNavigation({ currentLanguage, onCommand }: VoiceNavigationProps) {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition()
      speechRecognition.continuous = false
      speechRecognition.interimResults = false
      speechRecognition.lang = currentLanguage === "es" ? "es-PE" : "es-PE"

      speechRecognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        handleVoiceCommand(transcript)
        setIsListening(false)
      }

      speechRecognition.onerror = () => {
        setIsListening(false)
      }

      speechRecognition.onend = () => {
        setIsListening(false)
      }

      setRecognition(speechRecognition)
    }
  }, [currentLanguage])

  const handleVoiceCommand = (transcript: string) => {
    if (transcript.includes("billetera") || transcript.includes("wallet")) {
      onCommand("wallet")
    } else if (transcript.includes("pago") || transcript.includes("enviar")) {
      onCommand("payments")
    } else if (transcript.includes("aprender") || transcript.includes("educación")) {
      onCommand("education")
    } else if (transcript.includes("historial") || transcript.includes("transacciones")) {
      onCommand("history")
    } else if (transcript.includes("mochila") || transcript.includes("ahorro")) {
      onCommand("backpack")
    } else if (transcript.includes("préstamo") || transcript.includes("mañakuy")) {
      onCommand("loans")
    }
  }

  const toggleListening = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  if (!recognition) return null

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-4">
      <Button
        onClick={toggleListening}
        className={`w-12 h-12 rounded-full shadow-lg ${
          isListening ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>
    </div>
  )
}
