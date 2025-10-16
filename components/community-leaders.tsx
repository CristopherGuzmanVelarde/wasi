"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Crown, MessageCircle, Phone, MapPin, Star, Heart } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface CommunityLeadersProps {
  language: Language
}

export function CommunityLeaders({ language }: CommunityLeadersProps) {
  const [selectedLeader, setSelectedLeader] = useState<string | null>(null)
  const t = useTranslation(language)

  const communityLeaders = [
    {
      id: "leader1",
      name:
        language === "qu"
          ? "Tayta Carlos Quispe"
          : language === "ay"
            ? "Tata Carlos Quispe"
            : language === "cni"
              ? "Pinkatsari Carlos"
              : language === "agr"
                ? "Apu Carlos"
                : "Don Carlos Quispe",
      role:
        language === "qu"
          ? "Varayuq"
          : language === "ay"
            ? "Mallku"
            : language === "cni"
              ? "Pinkatsari"
              : language === "agr"
                ? "Apu"
                : "Líder Comunitario",
      community:
        language === "qu"
          ? "Cusco - Pisaq"
          : language === "ay"
            ? "Puno - Chucuito"
            : language === "cni"
              ? "Junín - Satipo"
              : language === "agr"
                ? "Amazonas - Condorcanqui"
                : "Cusco - Pisaq",
      languages:
        language === "qu"
          ? ["Runasimi", "Español"]
          : language === "ay"
            ? ["Aymar aru", "Español"]
            : language === "cni"
              ? ["Asháninka", "Español"]
              : language === "agr"
                ? ["Awajún", "Español"]
                : ["Quechua", "Español"],
      rating: 4.9,
      helpedFamilies: 156,
      specialties:
        language === "qu"
          ? ["Qullqi yachay", "Ayllu yanapay"]
          : language === "ay"
            ? ["Qullqi yatiña", "Jila yanapa"]
            : language === "cni"
              ? ["Patsani ayotero", "Noshinto yanapay"]
              : language === "agr"
                ? ["Kuichik unuimatin", "Shuara yaintin"]
                : ["Educación financiera", "Apoyo familiar"],
      available: true,
      avatar: "/placeholder.svg?height=40&width=40&text=CQ",
    },
    {
      id: "leader2",
      name:
        language === "qu"
          ? "Mama Rosa Condori"
          : language === "ay"
            ? "Mama Rosa Condori"
            : language === "cni"
              ? "Antari Rosa"
              : language === "agr"
                ? "Apach Rosa"
                : "Doña Rosa Condori",
      role:
        language === "qu"
          ? "Mama Varayuq"
          : language === "ay"
            ? "Mama T'alla"
            : language === "cni"
              ? "Antari"
              : language === "agr"
                ? "Apach"
                : "Lideresa Comunitaria",
      community:
        language === "qu"
          ? "Ayacucho - Huamanga"
          : language === "ay"
            ? "La Paz - Achacachi"
            : language === "cni"
              ? "Ucayali - Atalaya"
              : language === "agr"
                ? "Loreto - Datem del Marañón"
                : "Ayacucho - Huamanga",
      languages:
        language === "qu"
          ? ["Runasimi", "Español"]
          : language === "ay"
            ? ["Aymar aru", "Español"]
            : language === "cni"
              ? ["Asháninka", "Español"]
              : language === "agr"
                ? ["Awajún", "Español"]
                : ["Quechua", "Español"],
      rating: 4.8,
      helpedFamilies: 203,
      specialties:
        language === "qu"
          ? ["Warmi yanapay", "Qullqi waqaychay"]
          : language === "ay"
            ? ["Warmi yanapa", "Qullqi imaña"]
            : language === "cni"
              ? ["Tsinane yanapay", "Patsani imatantari"]
              : language === "agr"
                ? ["Nuwa yaintin", "Kuichik ipiatin"]
                : ["Empoderamiento femenino", "Ahorro familiar"],
      available: true,
      avatar: "/placeholder.svg?height=40&width=40&text=RC",
    },
    {
      id: "leader3",
      name:
        language === "qu"
          ? "Kuraka Miguel Huamán"
          : language === "ay"
            ? "Jilaqata Miguel Huamán"
            : language === "cni"
              ? "Ovayeri Miguel"
              : language === "agr"
                ? "Wishin Miguel"
                : "Profesor Miguel Huamán",
      role:
        language === "qu"
          ? "Yachachiq"
          : language === "ay"
            ? "Yatichiri"
            : language === "cni"
              ? "Ovayeri"
              : language === "agr"
                ? "Wishin"
                : "Educador Comunitario",
      community:
        language === "qu"
          ? "Huancavelica - Churcampa"
          : language === "ay"
            ? "Tacna - Candarave"
            : language === "cni"
              ? "Pasco - Oxapampa"
              : language === "agr"
                ? "San Martín - Alto Mayo"
                : "Huancavelica - Churcampa",
      languages:
        language === "qu"
          ? ["Runasimi", "Español"]
          : language === "ay"
            ? ["Aymar aru", "Español"]
            : language === "cni"
              ? ["Asháninka", "Español"]
              : language === "agr"
                ? ["Awajún", "Español"]
                : ["Quechua", "Español"],
      rating: 4.7,
      helpedFamilies: 89,
      specialties:
        language === "qu"
          ? ["Yachachiy", "Tecnología yanapay"]
          : language === "ay"
            ? ["Yatichañ", "Tecnología yanapa"]
            : language === "cni"
              ? ["Ovayeri", "Tecnología yanapay"]
              : language === "agr"
                ? ["Wishin", "Tecnología yaintin"]
                : ["Capacitación digital", "Soporte técnico"],
      available: false,
      avatar: "/placeholder.svg?height=40&width=40&text=MH",
    },
    {
      name: language === "qu" ? "Mama Rosa Quispe" : "Doña Rosa Quispe",
      role: language === "qu" ? "Llaqta Kamachiq" : "Líder Comunitaria",
      phone: "+51987123456",
      location: "San Juan de Lurigancho",
      specialty: language === "qu" ? "Qullqi yachachiq" : "Educación Financiera",
      available: true,
      avatar: "/placeholder.svg?height=40&width=40&text=MQ",
    },
    {
      name: language === "qu" ? "Tayta Carlos Mamani" : "Don Carlos Mamani",
      role: language === "qu" ? "Yachachiq" : "Facilitador",
      phone: "+51987654321",
      location: "Villa El Salvador",
      specialty: language === "qu" ? "Tecnologia yanapaykuq" : "Soporte Técnico",
      available: true,
      avatar: "/placeholder.svg?height=40&width=40&text=CM",
    },
  ]

  const getLeaderTitle = () => {
    switch (language) {
      case "qu":
        return "Llaqta Kamachiqkuna"
      case "ay":
        return "Marka Irpiri"
      case "cni":
        return "Kemisantsi Pinkatsari"
      case "agr":
        return "Aents Apu"
      default:
        return "Líderes Comunitarios"
    }
  }

  const getHelpText = () => {
    switch (language) {
      case "qu":
        return "yanapasqa ayllukuna"
      case "ay":
        return "yanapata jilanaka"
      case "cni":
        return "yanapantakero noshinto"
      case "agr":
        return "yaintinua shuara"
      default:
        return "familias ayudadas"
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-300" />
            <CardTitle className="text-base">{getLeaderTitle()}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-100">
            {language === "qu"
              ? "Llaqtaykip kamachiqkunawan rimanakuy, yanapakusunkiku qullqi yachaypi"
              : language === "ay"
                ? "Markamap irpirinakampi aruskipaña, qullqi yatiñan yanapapxañani"
                : language === "cni"
                  ? "Kemisantsi pinkatsarikuna rimaventero, patsani ayotero yanapantakero"
                  : language === "agr"
                    ? "Aents apujai chichasar, kuichik unuimatin yaintinuitai"
                    : "Conecta con líderes de tu comunidad para recibir apoyo en educación financiera"}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {communityLeaders.map((leader) => (
          <Card
            key={leader.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedLeader === leader.id ? "border-green-500 bg-green-50" : ""
            } ${!leader.available ? "opacity-60" : ""}`}
            onClick={() => setSelectedLeader(selectedLeader === leader.id ? null : leader.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={leader.avatar || "/placeholder.svg"} alt={leader.name} />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {leader.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{leader.name}</h3>
                    {leader.available ? (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {language === "qu"
                          ? "Kachkan"
                          : language === "ay"
                            ? "Utji"
                            : language === "cni"
                              ? "Ayotero"
                              : language === "agr"
                                ? "Aidau"
                                : "Disponible"}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        {language === "qu"
                          ? "Mana kachkan"
                          : language === "ay"
                            ? "Janiw utjiti"
                            : language === "cni"
                              ? "Tekatsi ayotero"
                              : language === "agr"
                                ? "Atsa aidau"
                                : "Ocupado"}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 mb-1">{leader.role}</p>

                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{leader.community}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{leader.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-red-500" />
                      <span>
                        {leader.helpedFamilies} {getHelpText()}
                      </span>
                    </div>
                  </div>

                  {selectedLeader === leader.id && (
                    <div className="mt-3 space-y-3 border-t pt-3">
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          {language === "qu"
                            ? "Rimaykuna:"
                            : language === "ay"
                              ? "Arunaka:"
                              : language === "cni"
                                ? "Rimaventero:"
                                : language === "agr"
                                  ? "Chichas:"
                                  : "Idiomas:"}
                        </p>
                        <div className="flex gap-1">
                          {leader.languages.map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          {language === "qu"
                            ? "Yachayninkunan:"
                            : language === "ay"
                              ? "Yatiñanaka:"
                              : language === "cni"
                                ? "Ayotero:"
                                : language === "agr"
                                  ? "Unuimatin:"
                                  : "Especialidades:"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {leader.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 text-xs" disabled={!leader.available}>
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {language === "qu"
                            ? "Rimanakuy"
                            : language === "ay"
                              ? "Aruskipaña"
                              : language === "cni"
                                ? "Rimaventero"
                                : language === "agr"
                                  ? "Chichasar"
                                  : "Chatear"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs bg-transparent"
                          disabled={!leader.available}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          {language === "qu"
                            ? "Waqyay"
                            : language === "ay"
                              ? "Jawsaña"
                              : language === "cni"
                                ? "Kemisantsi"
                                : language === "agr"
                                  ? "Untsumrar"
                                  : "Llamar"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-blue-800">
                {language === "qu"
                  ? "Llaqta Yanapay"
                  : language === "ay"
                    ? "Marka Yanapa"
                    : language === "cni"
                      ? "Kemisantsi Yanapay"
                      : language === "agr"
                        ? "Aents Yaintin"
                        : "Apoyo Comunitario"}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {language === "qu"
                  ? "Llaqtaykip kamachiqkunaqa yanapasunkiku qullqi yachaypi, mana qullqiyuq kaspaykipas."
                  : language === "ay"
                    ? "Markamap irpirinakax yanapapxañani qullqi yatiñan, janiw qullqinïkiti ukhamaraki."
                    : language === "cni"
                      ? "Kemisantsi pinkatsarikuna yanapantakero patsani ayotero, tekatsi patsani kametantsi."
                      : language === "agr"
                        ? "Aents apujai yaintinuitai kuichik unuimatin, atsa kuichik takakuisha."
                        : "Los líderes comunitarios te ayudan con educación financiera, incluso si no tienes dinero."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
