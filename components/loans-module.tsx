"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins, TrendingUp, Clock, CheckCircle, AlertCircle, Users } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface LoansModuleProps {
  currentLanguage: Language
  currency: string
}

export function LoansModule({ currentLanguage, currency }: LoansModuleProps) {
  const t = useTranslation(currentLanguage)
  const [activeTab, setActiveTab] = useState<"microloans" | "community">("microloans")

  const currentLoan = {
    amount: currency === "S/" ? 500 : 0.15,
    paid: currency === "S/" ? 200 : 0.06,
    nextPayment: currency === "S/" ? 50 : 0.015,
    dueDate: "2024-02-01",
    interestRate: 2.5,
    term: 10,
  }

  const progress = (currentLoan.paid / currentLoan.amount) * 100

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Coins className="h-5 w-5" />
            {currentLanguage === "qu"
              ? "Mañakuy Qullqi"
              : currentLanguage === "ay"
                ? "Mayiña Qullqi"
                : currentLanguage === "cni"
                  ? "Mañakuy Patsani"
                  : currentLanguage === "agr"
                    ? "Seakur Kuichik"
                    : "Microcréditos"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-indigo-100">
            {currentLanguage === "qu"
              ? "Huch'uy qullqita mañakuy, aswan allin wiñanapaq"
              : currentLanguage === "ay"
                ? "Jisk'a qullqi mayiña, aswan sum wiñañataki"
                : currentLanguage === "cni"
                  ? "Huch'uy patsanita mañakuy, aswan allin wiñanapaq"
                  : currentLanguage === "agr"
                    ? "Uchich kuichik seakur, aswan pujut tsapaktin"
                    : "Accede a préstamos para hacer crecer tu negocio"}
          </p>
          <div className="mt-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {currentLanguage === "es" ? "Moneda:" : "Currency:"} {currency}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "microloans" ? "default" : "outline"}
          onClick={() => setActiveTab("microloans")}
          className="flex-1"
        >
          <Coins className="h-4 w-4 mr-2" />
          {currentLanguage === "es" ? "Mis Préstamos" : currentLanguage === "qu" ? "Mañakuyniykuna" : "My Loans"}
        </Button>
        <Button
          variant={activeTab === "community" ? "default" : "outline"}
          onClick={() => setActiveTab("community")}
          className="flex-1"
        >
          <Users className="h-4 w-4 mr-2" />
          {currentLanguage === "es" ? "Comunitario" : currentLanguage === "qu" ? "Ayllu" : "Community"}
        </Button>
      </div>

      {activeTab === "microloans" && (
        <>
          {/* Current Loan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>
                  {currentLanguage === "qu"
                    ? "Kunan mañakuy"
                    : currentLanguage === "ay"
                      ? "Jichha mayiña"
                      : currentLanguage === "cni"
                        ? "Kunan mañakuy"
                        : currentLanguage === "agr"
                          ? "Yamaikia seakur"
                          : "Préstamo actual"}
                </span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {currentLanguage === "qu"
                    ? "Llamkachkaspa"
                    : currentLanguage === "ay"
                      ? "Irnaqasa"
                      : currentLanguage === "cni"
                        ? "Llamkachkaspa"
                        : currentLanguage === "agr"
                          ? "Takakmau"
                          : "Activo"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {currentLanguage === "qu"
                      ? "Qullqi mañasqa"
                      : currentLanguage === "ay"
                        ? "Qullqi mayita"
                        : currentLanguage === "cni"
                          ? "Patsani mañasqa"
                          : currentLanguage === "agr"
                            ? "Kuichik seakurma"
                            : "Monto prestado"}
                  </span>
                  <span className="font-bold">
                    {currency} {currentLoan.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {currentLanguage === "qu"
                      ? "Qusqa"
                      : currentLanguage === "ay"
                        ? "Qullqiruta"
                        : currentLanguage === "cni"
                          ? "Qusqa"
                          : currentLanguage === "agr"
                            ? "Akupkama"
                            : "Pagado"}
                  </span>
                  <span className="font-bold text-green-600">
                    {currency} {currentLoan.paid.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {currentLanguage === "qu"
                      ? "Qipaykuq quy"
                      : currentLanguage === "ay"
                        ? "Jutir qullqitapa"
                        : currentLanguage === "cni"
                          ? "Qipaykuq quy"
                          : currentLanguage === "agr"
                            ? "Ukunam akupkatin"
                            : "Próximo pago"}
                  </span>
                  <span className="font-bold">
                    {currency} {currentLoan.nextPayment.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>
                    {currentLanguage === "qu"
                      ? "Ñawpaqman"
                      : currentLanguage === "ay"
                        ? "Nayraqataru"
                        : currentLanguage === "cni"
                          ? "Ñawpaqman"
                          : currentLanguage === "agr"
                            ? "Yakat"
                            : "Progreso"}
                  </span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-yellow-800">
                    {currentLanguage === "qu"
                      ? "Qipaykuq quy p'unchaw"
                      : currentLanguage === "ay"
                        ? "Jutir qullqitañ uru"
                        : currentLanguage === "cni"
                          ? "Qipaykuq quy p'unchaw"
                          : currentLanguage === "agr"
                            ? "Ukunam akupkatin tsawan"
                            : "Fecha de próximo pago"}
                  </p>
                  <p className="text-sm font-bold text-yellow-900">{currentLoan.dueDate}</p>
                </div>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                {currentLanguage === "qu"
                  ? "Quy kunan"
                  : currentLanguage === "ay"
                    ? "Qullqitaña jichha"
                    : currentLanguage === "cni"
                      ? "Quy kunan"
                      : currentLanguage === "agr"
                        ? "Akupkata yamaikia"
                        : "Pagar ahora"}
              </Button>
            </CardContent>
          </Card>

          {/* Loan Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                {currentLanguage === "qu"
                  ? "Willakuykuna"
                  : currentLanguage === "ay"
                    ? "Yatiyawinaka"
                    : currentLanguage === "cni"
                      ? "Willakuykuna"
                      : currentLanguage === "agr"
                        ? "Etseramu"
                        : "Detalles del préstamo"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {currentLanguage === "qu"
                    ? "Interes"
                    : currentLanguage === "ay"
                      ? "Interes"
                      : currentLanguage === "cni"
                        ? "Interes"
                        : currentLanguage === "agr"
                          ? "Interes"
                          : "Tasa de interés"}
                </span>
                <span className="font-medium">{currentLoan.interestRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {currentLanguage === "qu"
                    ? "Killakuna"
                    : currentLanguage === "ay"
                      ? "Phaxsinaka"
                      : currentLanguage === "cni"
                        ? "Killakuna"
                        : currentLanguage === "agr"
                          ? "Nantinkuna"
                          : "Plazo"}
                </span>
                <span className="font-medium">
                  {currentLoan.term}{" "}
                  {currentLanguage === "qu"
                    ? "killa"
                    : currentLanguage === "ay"
                      ? "phaxsi"
                      : currentLanguage === "cni"
                        ? "killa"
                        : currentLanguage === "agr"
                          ? "nantin"
                          : "meses"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {currentLanguage === "qu"
                    ? "Sapa killa quy"
                    : currentLanguage === "ay"
                      ? "Sapa phaxsi qullqitañ"
                      : currentLanguage === "cni"
                        ? "Sapa killa quy"
                        : currentLanguage === "agr"
                          ? "Mai nantin akupkatin"
                          : "Cuota mensual"}
                </span>
                <span className="font-medium">
                  {currency} {currentLoan.nextPayment.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "community" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-5 w-5" />
                {currentLanguage === "qu"
                  ? "Ayllu Qullqi"
                  : currentLanguage === "ay"
                    ? "Ayllu Qullqi"
                    : currentLanguage === "cni"
                      ? "Ayllu Patsani"
                      : currentLanguage === "agr"
                        ? "Aents Kuichik"
                        : "Círculo de ahorro comunitario"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                {currentLanguage === "qu"
                  ? "Aylluykiwan kuska qullqita waqaychay, qullqitapas mañakuy"
                  : currentLanguage === "ay"
                    ? "Ayllumax mayachasa qullqi imañaña, qullqix mayisiñataki"
                    : currentLanguage === "cni"
                      ? "Aylluykiwan kuska patsanita waqaychay, patsanitapas mañakuy"
                      : currentLanguage === "agr"
                        ? "Aentsjai mayai kuichik imatai, kuichiksha seaktin"
                        : "Ahorra y accede a préstamos con tu comunidad"}
              </p>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-900">
                      {currentLanguage === "qu"
                        ? "Waqaychasqa qullqi"
                        : currentLanguage === "ay"
                          ? "Imata qullqi"
                          : currentLanguage === "cni"
                            ? "Waqaychasqa patsani"
                            : currentLanguage === "agr"
                              ? "Imatai kuichik"
                              : "Total ahorrado"}
                    </p>
                    <p className="text-2xl font-bold text-green-800">
                      {currency} {currency === "S/" ? "2,450.00" : "0.75"}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-green-700">
                  {currentLanguage === "qu"
                    ? "15 runakuna kay ayllu waqaychaypi"
                    : currentLanguage === "ay"
                      ? "15 jaqinaka aka ayllu imañan uñstapxi"
                      : currentLanguage === "cni"
                        ? "15 runakuna kay ayllu waqaychaypi"
                        : currentLanguage === "agr"
                          ? "15 aents ju aents imatai ukunam"
                          : "15 miembros en este círculo"}
                </p>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Coins className="h-4 w-4 mr-2" />
                {currentLanguage === "qu"
                  ? "Mañakuy ayllu qullqita"
                  : currentLanguage === "ay"
                    ? "Mayiña ayllu qullqi"
                    : currentLanguage === "cni"
                      ? "Mañakuy ayllu patsanita"
                      : currentLanguage === "agr"
                        ? "Seakur aents kuichik"
                        : "Solicitar préstamo comunitario"}
              </Button>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                  <p className="text-xs text-blue-800">
                    {currentLanguage === "qu"
                      ? "Ayllu qullqiqa aswan pisi intereswan, wakinpas yanapakunankupaq"
                      : currentLanguage === "ay"
                        ? "Ayllu qullqix jisk'a interesnimpi, mayinakax yanapt'añataki"
                        : currentLanguage === "cni"
                          ? "Ayllu patsaniqa aswan pisi intereswan, wakinpas yanapakunankupaq"
                          : currentLanguage === "agr"
                            ? "Aents kuichikka uchich interesnumia, chikichkesh yanapin"
                            : "Los préstamos comunitarios tienen tasas más bajas y ayudan a tu comunidad"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
