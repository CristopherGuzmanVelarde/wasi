"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Leaf, Fish, Shirt, Home, Search, MapPin, Star, Truck } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface LocalMarketplaceProps {
  language: Language
  onPurchase: (item: any) => void
}

export function LocalMarketplace({ language, onPurchase }: LocalMarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const t = useTranslation(language)

  const categories = {
    es: [
      { id: "all", name: "Todo", icon: Store },
      { id: "food", name: "Alimentos", icon: Leaf },
      { id: "fish", name: "Pescado", icon: Fish },
      { id: "clothes", name: "Ropa", icon: Shirt },
      { id: "home", name: "Hogar", icon: Home },
    ],
    qu: [
      { id: "all", name: "Tukuy", icon: Store },
      { id: "food", name: "Mikhuy", icon: Leaf },
      { id: "fish", name: "Challwa", icon: Fish },
      { id: "clothes", name: "P'acha", icon: Shirt },
      { id: "home", name: "Wasi", icon: Home },
    ],
    ay: [
      { id: "all", name: "Taqi", icon: Store },
      { id: "food", name: "Manq'aña", icon: Leaf },
      { id: "fish", name: "Challwa", icon: Fish },
      { id: "clothes", name: "Isi", icon: Shirt },
      { id: "home", name: "Uta", icon: Home },
    ],
    cni: [
      { id: "all", name: "Antamiki", icon: Store },
      { id: "food", name: "Tsomiri", icon: Leaf },
      { id: "fish", name: "Shima", icon: Fish },
      { id: "clothes", name: "Cushma", icon: Shirt },
      { id: "home", name: "Uta", icon: Home },
    ],
    agr: [
      { id: "all", name: "Ashí", icon: Store },
      { id: "food", name: "Yurumak", icon: Leaf },
      { id: "fish", name: "Namak", icon: Fish },
      { id: "clothes", name: "Pushik", icon: Shirt },
      { id: "home", name: "Jea", icon: Home },
    ],
  }

  const products = [
    {
      id: "prod1",
      name:
        language === "qu"
          ? "Papa wañusqa"
          : language === "ay"
            ? "Ch'uñu"
            : language === "cni"
              ? "Papa seca"
              : language === "agr"
                ? "Papa wañusqa"
                : "Papas deshidratadas",
      seller:
        language === "qu"
          ? "Mama Juana - Pisaq"
          : language === "ay"
            ? "Mama Juana - Chucuito"
            : language === "cni"
              ? "Antari Juana - Satipo"
              : language === "agr"
                ? "Apach Juana - Condorcanqui"
                : "Doña Juana - Pisaq",
      price: 15.5,
      category: "food",
      rating: 4.8,
      distance: "2.3 km",
      delivery:
        language === "qu"
          ? "Paqarin chayamun"
          : language === "ay"
            ? "Qharuru puriñani"
            : language === "cni"
              ? "Qharuru chayamun"
              : language === "agr"
                ? "Kashin tsawan"
                : "Entrega mañana",
      image: "/placeholder.svg?height=80&width=80&text=Papa",
      inStock: true,
      cultural:
        language === "qu"
          ? "Ñawpaq mikhuy, sumaq kallpayuq"
          : language === "ay"
            ? "Nayra manq'aña, suma ch'ama"
            : language === "cni"
              ? "Okanta tsomiri, allin kallpayuq"
              : language === "agr"
                ? "Yaunchu yurumak, pujut kakaram"
                : "Alimento ancestral, muy nutritivo",
    },
    {
      id: "prod2",
      name:
        language === "qu"
          ? "Quinua"
          : language === "ay"
            ? "Quinua"
            : language === "cni"
              ? "Quinua"
              : language === "agr"
                ? "Quinua"
                : "Quinua orgánica",
      seller:
        language === "qu"
          ? "Tayta Carlos - Cusco"
          : language === "ay"
            ? "Tata Carlos - Puno"
            : language === "cni"
              ? "Pinkatsari Carlos - Junín"
              : language === "agr"
                ? "Apu Carlos - Amazonas"
                : "Don Carlos - Cusco",
      price: 8.0,
      category: "food",
      rating: 4.9,
      distance: "1.8 km",
      delivery:
        language === "qu"
          ? "Kunan p'unchay"
          : language === "ay"
            ? "Jichhax uru"
            : language === "cni"
              ? "Jiroka"
              : language === "agr"
                ? "Yamaikia tsawan"
                : "Hoy mismo",
      image: "/placeholder.svg?height=80&width=80&text=Quinua",
      inStock: true,
      cultural:
        language === "qu"
          ? "Chisiya mama, inka mikhuy"
          : language === "ay"
            ? "Juyra mama, inka manq'aña"
            : language === "cni"
              ? "Chisiya mama, inka tsomiri"
              : language === "agr"
                ? "Chisiya mama, inka yurumak"
                : "Grano de oro, alimento de los incas",
    },
    {
      id: "prod3",
      name:
        language === "qu"
          ? "Challwa ch'arki"
          : language === "ay"
            ? "Challwa ch'arki"
            : language === "cni"
              ? "Shima ch'arki"
              : language === "agr"
                ? "Namak ch'arki"
                : "Pescado seco",
      seller:
        language === "qu"
          ? "Mama Rosa - Titicaca"
          : language === "ay"
            ? "Mama Rosa - Titicaca"
            : language === "cni"
              ? "Antari Rosa - Ucayali"
              : language === "agr"
                ? "Apach Rosa - Marañón"
                : "Doña Rosa - Titicaca",
      price: 25.0,
      category: "fish",
      rating: 4.7,
      distance: "5.2 km",
      delivery:
        language === "qu"
          ? "Iskay p'unchay"
          : language === "ay"
            ? "Paya uru"
            : language === "cni"
              ? "Paya killa"
              : language === "agr"
                ? "Jimiara tsawan"
                : "2 días",
      image: "/placeholder.svg?height=80&width=80&text=Pescado",
      inStock: true,
      cultural:
        language === "qu"
          ? "Qucha mikhuy, sumaq aycha"
          : language === "ay"
            ? "Quta manq'aña, suma aycha"
            : language === "cni"
              ? "Paro tsomiri, allin aycha"
              : language === "agr"
                ? "Entsa yurumak, pujut aycha"
                : "Del lago sagrado, proteína pura",
    },
    {
      id: "prod4",
      name:
        language === "qu"
          ? "Llama p'acha"
          : language === "ay"
            ? "Qarwa isi"
            : language === "cni"
              ? "Llama cushma"
              : language === "agr"
                ? "Llama pushik"
                : "Tejido de llama",
      seller:
        language === "qu"
          ? "Mama Elena - Huancavelica"
          : language === "ay"
            ? "Mama Elena - La Paz"
            : language === "cni"
              ? "Antari Elena - Pasco"
              : language === "agr"
                ? "Apach Elena - San Martín"
                : "Doña Elena - Huancavelica",
      price: 120.0,
      category: "clothes",
      rating: 5.0,
      distance: "12.5 km",
      delivery:
        language === "qu"
          ? "Semana kaq"
          : language === "ay"
            ? "Semana qhipa"
            : language === "cni"
              ? "Semana qhipa"
              : language === "agr"
                ? "Semana nantu"
                : "1 semana",
      image: "/placeholder.svg?height=80&width=80&text=Tejido",
      inStock: false,
      cultural:
        language === "qu"
          ? "Makiwan away, sumaq llama millma"
          : language === "ay"
            ? "Amparmpi away, suma qarwa millma"
            : language === "cni"
              ? "Makiwan away, allin llama millma"
              : language === "agr"
                ? "Uwejjai away, pujut llama millma"
                : "Tejido a mano, lana de llama pura",
    },
    {
      id: "prod5",
      name: language === "qu" ? "Papa" : "Papas",
      seller: language === "qu" ? "Mama Juana" : "Doña Juana",
      price: 8.5,
      category: language === "qu" ? "Mikhuy" : "Alimentos",
      rating: 4.8,
      distance: "2.3 km",
      delivery: language === "qu" ? "Paqarin chayamun" : "Entrega mañana",
      image: "/placeholder.svg?height=80&width=80&text=Papa",
      inStock: true,
      cultural: language === "qu" ? "Ñawpaq mikhuy, sumaq kallpayuq" : "Alimento ancestral, muy nutritivo",
    },
    {
      id: "prod6",
      name: language === "qu" ? "Chuño" : "Chuño",
      seller: language === "qu" ? "Tayta Pedro" : "Don Pedro",
      price: 12.0,
      category: language === "qu" ? "Mikhuy" : "Alimentos",
      rating: 4.9,
      distance: "1.8 km",
      delivery: language === "qu" ? "Kunan p'unchay" : "Hoy mismo",
      image: "/placeholder.svg?height=80&width=80&text=Quinua",
      inStock: true,
      cultural: language === "qu" ? "Chisiya mama, inka mikhuy" : "Grano de oro, alimento de los incas",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getMarketplaceTitle = () => {
    switch (language) {
      case "qu":
        return "Llaqta Ranqana"
      case "ay":
        return "Marka Aljañ"
      case "cni":
        return "Kemisantsi Ranqana"
      case "agr":
        return "Aents Suruki"
      default:
        return "Mercado Local"
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Store className="h-5 w-5" />
            {getMarketplaceTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-emerald-100">
            {language === "qu"
              ? "Llaqtaykip ranqanakuna, CBDC qullqiwan rantiy"
              : language === "ay"
                ? "Markamap aljañanaka, CBDC qullqimpi aljañ"
                : language === "cni"
                  ? "Kemisantsi ranqanakuna, CBDC patsaniwan rantiy"
                  : language === "agr"
                    ? "Aents surukia, CBDC kuichikjai suruki"
                    : "Productos locales de tu comunidad, paga con CBDC"}
          </p>
        </CardContent>
      </Card>

      {/* Search and Categories */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={
                language === "qu"
                  ? "Imata maskashanki?"
                  : language === "ay"
                    ? "Kuna thaqhta?"
                    : language === "cni"
                      ? "Ima maskashanki?"
                      : language === "agr"
                        ? "Waruka shiirme?"
                        : "¿Qué buscas?"
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories[language].map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <category.icon className="h-3 w-3" />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Products */}
      <div className="space-y-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                      <p className="text-xs text-gray-600 truncate">{product.seller}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">S/ {product.price.toFixed(2)}</p>
                      {!product.inStock && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {language === "qu"
                            ? "Mana kachkan"
                            : language === "ay"
                              ? "Janiw utjiti"
                              : language === "cni"
                                ? "Tekatsi kachkan"
                                : language === "agr"
                                  ? "Atsa aidau"
                                  : "Agotado"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-blue-600 mb-2 italic">{product.cultural}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{product.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      <span>{product.delivery}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => onPurchase(product)}
                      disabled={!product.inStock}
                    >
                      {language === "qu"
                        ? "Rantiy"
                        : language === "ay"
                          ? "Aljañ"
                          : language === "cni"
                            ? "Rantiy"
                            : language === "agr"
                              ? "Suruki"
                              : "Comprar"}
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      {language === "qu"
                        ? "Willakuy"
                        : language === "ay"
                          ? "Yatiyaña"
                          : language === "cni"
                            ? "Willakuy"
                            : language === "agr"
                              ? "Etseruk"
                              : "Contactar"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600">
              {language === "qu"
                ? "Mana imapas tarisqa. Huk maskay ruway."
                : language === "ay"
                  ? "Janiw kuna jikxatati. Yaqha thaqhaña luraña."
                  : language === "cni"
                    ? "Mana imapas tarisqa. Huk maskay ruway."
                    : language === "agr"
                      ? "Atsa waruka jikiar. Chikichik shiir."
                      : "No se encontraron productos. Intenta otra búsqueda."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Local Commerce Info */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Leaf className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-green-800">
                {language === "qu"
                  ? "Llaqta Ranqay"
                  : language === "ay"
                    ? "Marka Aljañ"
                    : language === "cni"
                      ? "Kemisantsi Ranqay"
                      : language === "agr"
                        ? "Aents Suruki"
                        : "Comercio Local"}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {language === "qu"
                  ? "Llaqtaykip runakunawan ranqaspa, aylluykita yanapanki, sumaq mikhuykunata tarinki."
                  : language === "ay"
                    ? "Markamap jaqinakampi aljasasa, jilamar yanapapxta, suma manq'añanak jikxatasma."
                    : language === "cni"
                      ? "Kemisantsi runakunawan ranqaspa, noshinto yanapanki, allin tsomiri tarinki."
                      : language === "agr"
                        ? "Aents jintinjai surukisam, shuara yaintinuitai, pujut yurumak jikiuitai."
                        : "Comprando local apoyas a tu comunidad y encuentras productos frescos y auténticos."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
