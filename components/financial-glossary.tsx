"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, X } from "lucide-react"
import { useState } from "react"
import type { Language } from "@/lib/i18n"

interface FinancialGlossaryProps {
  language: Language
  isOpen: boolean
  onClose: () => void
}

export function FinancialGlossary({ language, isOpen, onClose }: FinancialGlossaryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const glossaryTerms = [
    {
      term: "CBDC",
      definition:
        language === "qu"
          ? "Central Bank Digital Currency - Banco Centralpa digital qullqin"
          : language === "ay"
            ? "Central Bank Digital Currency - Banco Centralan digital qullqipa"
            : "Moneda Digital del Banco Central - dinero digital oficial del país",
    },
    {
      term: "QR",
      definition:
        language === "qu"
          ? "Quick Response - Utqaylla kutichiy codigo, qullqi apaypaq"
          : language === "ay"
            ? "Quick Response - Jank'ak kutichañ codigo, qullqi apayañataki"
            : "Código de respuesta rápida para realizar pagos",
    },
    {
      term: "P2P",
      definition:
        language === "qu"
          ? "Person to Person - Runapa runaman qullqi apay"
          : language === "ay"
            ? "Person to Person - Jaqin jaqiru qullqi apayaña"
            : "Pago de persona a persona",
    },
  ]

  const filteredTerms = glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-md mt-4 mb-20">
        <div className="sticky top-0 bg-white border-b p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Glosario Financiero
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar términos..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="p-4 space-y-4">
          {filteredTerms.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-emerald-700 mb-2">{item.term}</h3>
                <p className="text-sm text-gray-600">{item.definition}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
