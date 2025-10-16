export type Language = "es" | "en" | "qu" | "ay" | "cni" | "agr"

export interface Translation {
  // App General
  appName: string
  online: string
  offline: string
  points: string
  level: string

  // Landing Page
  landingTitle: string
  landingSubtitle: string
  startButton: string
  learnMoreButton: string

  // Description Section
  descriptionTitle: string
  descriptionText: string

  // Objectives Section
  objectivesTitle: string
  objective1Title: string
  objective1Text: string
  objective2Title: string
  objective2Text: string
  objective3Title: string
  objective3Text: string
  objective4Title: string
  objective4Text: string

  // Benefits Section
  benefitsTitle: string
  benefit1Title: string
  benefit1Text: string
  benefit2Title: string
  benefit2Text: string
  benefit3Title: string
  benefit3Text: string
  benefit4Title: string
  benefit4Text: string

  // Features Section
  featuresTitle: string
  feature1Title: string
  feature1Text: string
  feature2Title: string
  feature2Text: string
  feature3Title: string
  feature3Text: string
  feature4Title: string
  feature4Text: string
  feature5Title: string
  feature5Text: string
  feature6Title: string
  feature6Text: string

  // Team Section
  teamTitle: string
  teamSubtitle: string
  role1: string
  role2: string

  // Navigation
  wallet: string
  payments: string
  education: string
  history: string
  backpack: string
  loans: string

  // Wallet
  myWallet: string
  digitalSoles: string
  thisWeekReceived: string
  thisWeekSpent: string
  availablePayments: string
  personToPerson: string
  personToBusiness: string
  governmentToPerson: string
  active: string

  // Payments
  selectPaymentType: string
  makePayment: string
  phoneOrDni: string
  businessCode: string
  amount: string
  send: string
  scanQR: string
  governmentPayments: string
  subsidiesAvailable: string
  claimPayments: string
  quickPayments: string

  // Education
  myProgress: string
  lessonsCompleted: string
  whatIsCBDC: string
  firstPayment: string
  digitalSecurity: string
  digitalSaving: string
  tipOfDay: string

  // History
  totalReceived: string
  totalSent: string
  thisMonth: string
  searchTransactions: string
  all: string
  businesses: string
  government: string
  completed: string
  pending: string
  failed: string

  // Offline
  offlineModeActive: string
  availableOffline: string
  localTokens: string
  validFor: string
  days: string
  paymentMethods: string
  qrCode: string
  ussdCode: string
  bluetooth: string
  available: string
  pendingTransactions: string

  // Common
  back: string
  continue: string
  cancel: string
  accept: string
  close: string
  loading: string
  error: string
  success: string

  // Cultural
  greeting: string
  thanks: string
  family: string
  community: string
}

export const translations: Record<Language, Translation> = {
  es: {
    // App General
    appName: "WASI",
    online: "En línea",
    offline: "Sin conexión",
    points: "puntos",
    level: "Nivel",

    // Landing Page
    landingTitle: "Billetera Digital CBDC para Todos los Peruanos",
    landingSubtitle: "Inclusión financiera con tecnología blockchain del Banco Central de Reserva del Perú",
    startButton: "Comenzar Ahora",
    learnMoreButton: "Conocer Más",

    // Description
    descriptionTitle: "¿Qué es WASI?",
    descriptionText:
      "WASI es una billetera digital innovadora que implementa la Moneda Digital del Banco Central (CBDC) del Perú. Diseñada para promover la inclusión financiera, WASI permite a todos los peruanos acceder a servicios financieros digitales de manera segura, rápida y sin barreras. Con soporte para comunidades remotas, idiomas nativos y funcionamiento offline, WASI está revolucionando el acceso al sistema financiero en todo el país.",

    // Objectives
    objectivesTitle: "Nuestros Objetivos",
    objective1Title: "Inclusión Financiera Universal",
    objective1Text:
      "Proporcionar acceso a servicios financieros digitales a todos los peruanos, especialmente en áreas rurales y comunidades indígenas.",
    objective2Title: "Seguridad y Transparencia",
    objective2Text:
      "Implementar tecnología blockchain para garantizar transacciones seguras, transparentes y trazables respaldadas por el BCRP.",
    objective3Title: "Accesibilidad Cultural",
    objective3Text:
      "Ofrecer la plataforma en español, inglés, quechua, aymara, asháninka y awajún para servir a todas las comunidades del Perú.",
    objective4Title: "Resiliencia Tecnológica",
    objective4Text:
      "Permitir operaciones offline y mediante diferentes tecnologías (QR, USSD, Bluetooth) para funcionar en cualquier contexto.",

    // Benefits
    benefitsTitle: "Beneficios de WASI",
    benefit1Title: "Sin Comisiones Bancarias",
    benefit1Text:
      "Realiza transferencias y pagos sin las altas comisiones de los bancos tradicionales. Tu dinero es tuyo.",
    benefit2Title: "Pagos Instantáneos",
    benefit2Text: "Envía y recibe dinero en segundos, las 24 horas del día, los 7 días de la semana, sin esperas.",
    benefit3Title: "Funciona Sin Internet",
    benefit3Text:
      "Realiza transacciones incluso sin conexión a internet mediante códigos QR, USSD (*123#) o Bluetooth.",
    benefit4Title: "Respaldo del BCRP",
    benefit4Text:
      "Cada Sol Digital está respaldado 1:1 por el Banco Central de Reserva del Perú, garantizando su valor.",

    // Features
    featuresTitle: "Características Principales",
    feature1Title: "Multiidioma Nativo",
    feature1Text: "Interfaz completa en 6 idiomas: Español, English, Quechua, Aymara, Asháninka y Awajún.",
    feature2Title: "Integración MetaMask",
    feature2Text: "Conecta tu billetera MetaMask y gestiona tus activos en múltiples redes blockchain.",
    feature3Title: "Modo Mochila",
    feature3Text: "Sistema de ahorro gamificado que te ayuda a alcanzar tus metas financieras de manera divertida.",
    feature4Title: "Préstamos Comunitarios",
    feature4Text: "Accede a microcréditos y préstamos peer-to-peer con tasas justas y procesos simples.",
    feature5Title: "Educación Financiera",
    feature5Text: "Aprende sobre finanzas digitales con lecciones interactivas y gana recompensas por tu progreso.",
    feature6Title: "Ceremonias Culturales",
    feature6Text: "Celebra pagos importantes con rituales tradicionales de las comunidades andinas y amazónicas.",

    // Team
    teamTitle: "Nuestro Equipo",
    teamSubtitle: "Desarrolladores comprometidos con la inclusión financiera en el Perú",
    role1: "Desarrollador Full Stack & Blockchain",
    role2: "Desarrollador Full Stack & UX Designer",

    // Navigation
    wallet: "Billetera",
    payments: "Pagos",
    education: "Aprender",
    history: "Historial",
    backpack: "Mochila",
    loans: "Préstamos",

    // Wallet
    myWallet: "Mi Billetera CBDC",
    digitalSoles: "Soles Digitales del BCRP",
    thisWeekReceived: "Esta semana recibí",
    thisWeekSpent: "Esta semana gasté",
    availablePayments: "Tipos de Pago Disponibles",
    personToPerson: "Persona a Persona (P2P)",
    personToBusiness: "Persona a Comercio (P2B)",
    governmentToPerson: "Gobierno a Persona (G2P)",
    active: "Activo",

    // Payments
    selectPaymentType: "Selecciona el tipo de pago",
    makePayment: "Realizar Pago",
    phoneOrDni: "Número de teléfono o DNI",
    businessCode: "Código del comercio",
    amount: "Monto (S/)",
    send: "Enviar",
    scanQR: "Escanear QR",
    governmentPayments: "Pagos del Gobierno",
    subsidiesAvailable: "Subsidios y programas sociales disponibles",
    claimPayments: "Reclamar pagos disponibles",
    quickPayments: "Pagos Rápidos",

    // Education
    myProgress: "Mi Progreso",
    lessonsCompleted: "Lecciones completadas",
    whatIsCBDC: "¿Qué es la moneda digital?",
    firstPayment: "Cómo hacer tu primer pago",
    digitalSecurity: "Seguridad en pagos digitales",
    digitalSaving: "Ahorro con billetera digital",
    tipOfDay: "Tip del día",

    // History
    totalReceived: "Total recibido",
    totalSent: "Total enviado",
    thisMonth: "Este mes",
    searchTransactions: "Buscar transacciones...",
    all: "Todas",
    businesses: "Comercios",
    government: "Gobierno",
    completed: "Completado",
    pending: "Pendiente",
    failed: "Fallido",

    // Offline
    offlineModeActive: "Modo sin conexión activo",
    availableOffline: "Saldo disponible offline",
    localTokens: "Tokens digitales locales",
    validFor: "Válido por",
    days: "días",
    paymentMethods: "Métodos de pago disponibles",
    qrCode: "Código QR",
    ussdCode: "Código USSD",
    bluetooth: "Bluetooth",
    available: "Disponible",
    pendingTransactions: "Transacciones pendientes",

    // Common
    back: "Volver",
    continue: "Continuar",
    cancel: "Cancelar",
    accept: "Aceptar",
    close: "Cerrar",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",

    // Cultural
    greeting: "¡Hola!",
    thanks: "Gracias",
    family: "Familia",
    community: "Comunidad",
  },

  en: {
    // App General
    appName: "WASI",
    online: "Online",
    offline: "Offline",
    points: "points",
    level: "Level",

    // Landing Page
    landingTitle: "CBDC Digital Wallet for All Peruvians",
    landingSubtitle: "Financial inclusion with blockchain technology from the Central Reserve Bank of Peru",
    startButton: "Get Started",
    learnMoreButton: "Learn More",

    // Description
    descriptionTitle: "What is WASI?",
    descriptionText:
      "WASI is an innovative digital wallet that implements Peru's Central Bank Digital Currency (CBDC). Designed to promote financial inclusion, WASI allows all Peruvians to access digital financial services securely, quickly, and without barriers. With support for remote communities, native languages, and offline functionality, WASI is revolutionizing access to the financial system throughout the country.",

    // Objectives
    objectivesTitle: "Our Objectives",
    objective1Title: "Universal Financial Inclusion",
    objective1Text:
      "Provide access to digital financial services to all Peruvians, especially in rural areas and indigenous communities.",
    objective2Title: "Security and Transparency",
    objective2Text:
      "Implement blockchain technology to ensure secure, transparent, and traceable transactions backed by the BCRP.",
    objective3Title: "Cultural Accessibility",
    objective3Text:
      "Offer the platform in Spanish, English, Quechua, Aymara, Asháninka, and Awajún to serve all communities in Peru.",
    objective4Title: "Technological Resilience",
    objective4Text:
      "Enable offline operations through different technologies (QR, USSD, Bluetooth) to work in any context.",

    // Benefits
    benefitsTitle: "WASI Benefits",
    benefit1Title: "No Banking Fees",
    benefit1Text: "Make transfers and payments without the high fees of traditional banks. Your money is yours.",
    benefit2Title: "Instant Payments",
    benefit2Text: "Send and receive money in seconds, 24/7, without waiting.",
    benefit3Title: "Works Without Internet",
    benefit3Text: "Make transactions even without internet connection through QR codes, USSD (*123#), or Bluetooth.",
    benefit4Title: "BCRP Backing",
    benefit4Text: "Each Digital Sol is backed 1:1 by the Central Reserve Bank of Peru, guaranteeing its value.",

    // Features
    featuresTitle: "Key Features",
    feature1Title: "Native Multilanguage",
    feature1Text: "Complete interface in 6 languages: Spanish, English, Quechua, Aymara, Asháninka, and Awajún.",
    feature2Title: "MetaMask Integration",
    feature2Text: "Connect your MetaMask wallet and manage your assets across multiple blockchain networks.",
    feature3Title: "Backpack Mode",
    feature3Text: "Gamified savings system that helps you reach your financial goals in a fun way.",
    feature4Title: "Community Loans",
    feature4Text: "Access microloans and peer-to-peer loans with fair rates and simple processes.",
    feature5Title: "Financial Education",
    feature5Text: "Learn about digital finance with interactive lessons and earn rewards for your progress.",
    feature6Title: "Cultural Ceremonies",
    feature6Text: "Celebrate important payments with traditional rituals from Andean and Amazonian communities.",

    // Team
    teamTitle: "Our Team",
    teamSubtitle: "Developers committed to financial inclusion in Peru",
    role1: "Full Stack & Blockchain Developer",
    role2: "Full Stack Developer & UX Designer",

    // Navigation
    wallet: "Wallet",
    payments: "Payments",
    education: "Learn",
    history: "History",
    backpack: "Backpack",
    loans: "Loans",

    // Wallet
    myWallet: "My CBDC Wallet",
    digitalSoles: "BCRP Digital Soles",
    thisWeekReceived: "This week received",
    thisWeekSpent: "This week spent",
    availablePayments: "Available Payment Types",
    personToPerson: "Person to Person (P2P)",
    personToBusiness: "Person to Business (P2B)",
    governmentToPerson: "Government to Person (G2P)",
    active: "Active",

    // Payments
    selectPaymentType: "Select payment type",
    makePayment: "Make Payment",
    phoneOrDni: "Phone number or ID",
    businessCode: "Business code",
    amount: "Amount (S/)",
    send: "Send",
    scanQR: "Scan QR",
    governmentPayments: "Government Payments",
    subsidiesAvailable: "Available subsidies and social programs",
    claimPayments: "Claim available payments",
    quickPayments: "Quick Payments",

    // Education
    myProgress: "My Progress",
    lessonsCompleted: "Lessons completed",
    whatIsCBDC: "What is digital currency?",
    firstPayment: "How to make your first payment",
    digitalSecurity: "Digital payment security",
    digitalSaving: "Saving with digital wallet",
    tipOfDay: "Tip of the day",

    // History
    totalReceived: "Total received",
    totalSent: "Total sent",
    thisMonth: "This month",
    searchTransactions: "Search transactions...",
    all: "All",
    businesses: "Businesses",
    government: "Government",
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",

    // Offline
    offlineModeActive: "Offline mode active",
    availableOffline: "Available offline balance",
    localTokens: "Local digital tokens",
    validFor: "Valid for",
    days: "days",
    paymentMethods: "Available payment methods",
    qrCode: "QR Code",
    ussdCode: "USSD Code",
    bluetooth: "Bluetooth",
    available: "Available",
    pendingTransactions: "Pending transactions",

    // Common
    back: "Back",
    continue: "Continue",
    cancel: "Cancel",
    accept: "Accept",
    close: "Close",
    loading: "Loading...",
    error: "Error",
    success: "Success",

    // Cultural
    greeting: "Hello!",
    thanks: "Thank you",
    family: "Family",
    community: "Community",
  },

  qu: {
    // App General (Quechua)
    appName: "WASI",
    online: "Tinkisqa",
    offline: "Mana tinkisqa",
    points: "puntos",
    level: "Nivel",

    // Landing Page
    landingTitle: "Llapa Peruanopaq CBDC Digital Qullqi Wasi",
    landingSubtitle: "BCRP-manta blockchain tecnologiawan qullqi yanapakuy",
    startButton: "Qallariy",
    learnMoreButton: "Astawan Yachay",

    // Description
    descriptionTitle: "¿Ima WASI?",
    descriptionText:
      "WASI nisqaqa huk musuq digital qullqi wasi, Perú Banco Central nisqap Digital Qullqinta (CBDC) ruwan. Tukuy peruanokunapaq qullqi yanapakuyta qun, waqaychasqa, utqaylla hinaspa mana hark'aykunawan. Karu llaqtakunapaq, mama simikunapaq hinaspa mana internetwan llamk'anantapas yanapan.",

    // Objectives
    objectivesTitle: "Ruwayninchikkuna",
    objective1Title: "Tukuypaq Qullqi Yanapakuy",
    objective1Text:
      "Tukuy peruanokunapaq digital qullqi yanapakuyta quy, aswanta chakra llaqtakunapi hinaspa ayllu llaqtakunapi.",
    objective2Title: "Amachay hinaspa Sut'inchay",
    objective2Text: "Blockchain tecnologiata churay waqaychasqa, sut'i hinaspa qatipana ruwaykuna kananpaq.",
    objective3Title: "Kawsay Yaykuy",
    objective3Text: "Plataformata 6 simikunapi quy: Español, English, Quechua, Aymara, Asháninka, Awajún.",
    objective4Title: "Tecnología Kallpayuq",
    objective4Text: "Mana internetwan llamk'ayta atiy QR, USSD, Bluetooth nisqawanpas.",

    // Benefits
    benefitsTitle: "WASI Allinninku na",
    benefit1Title: "Mana Banco Qullqi",
    benefit1Text: "Qullqita apachiy hinaspa quy mana hatun banco qullqiwan. Qullqiykiqa qampa.",
    benefit2Title: "Utqaylla Qullqi Apay",
    benefit2Text: "Qullqita kachay hinaspa chaskiy segundokunapi, 24 horaspi, 7 p'unchawpi.",
    benefit3Title: "Mana Internetwan Llamk'an",
    benefit3Text: "Qullqi apayta ruway mana internetwanpas QR, USSD (*123#) utaq Bluetooth nisqawan.",
    benefit4Title: "BCRP Yanapan",
    benefit4Text: "Sapa Digital Sol nisqaqa BCRP-wan 1:1 yanapasqa, chaninninwan.",

    // Features
    featuresTitle: "Hatun Ruwayninkunа",
    feature1Title: "Achka Simi",
    feature1Text: "Hunt'a interfaz 6 simikunapi: Español, English, Quechua, Aymara, Asháninka, Awajún.",
    feature2Title: "MetaMask Tinkiy",
    feature2Text: "MetaMask qullqi wasiykita tinkiy hinaspa achka blockchain ñankunapi qullqiykita kamachiy.",
    feature3Title: "Mochila Modo",
    feature3Text: "Pukllay waqaychay sistema musuq qullqi puntaykikunaman chayanapaq.",
    feature4Title: "Ayllu Mañakuykuna",
    feature4Text: "Huch'uy mañakuykunaman yaykuy chanin qullqiwan hinaspa mana sasa ruwaykunawan.",
    feature5Title: "Qullqi Yachay",
    feature5Text:
      "Digital qullqimanta yachay pukllay yachaykunawan hinaspa ñawpaqman purisqaykimanta premiokuna tariy.",
    feature6Title: "Kawsay Raymikuna",
    feature6Text: "Hatun qullqi quykunata raymichay ñawpa ruwaykunawan.",

    // Team
    teamTitle: "Equiponchik",
    teamSubtitle: "Perúpi qullqi yanapakuypaq compromiso nisqa ruwaqkuna",
    role1: "Full Stack & Blockchain Ruwaq",
    role2: "Full Stack Ruwaq & UX Diseñador",

    // Navigation
    wallet: "Qullqi wasi",
    payments: "Qullqi apay",
    education: "Yachay",
    history: "Ñawpaq rurasqakuna",
    backpack: "Mochila",
    loans: "Mañakuy",

    // Wallet
    myWallet: "Ñuqap Qullqi Wasin CBDC",
    digitalSoles: "BCRP-pa Digital Qullqin",
    thisWeekReceived: "Kay semanapi chaskisqani",
    thisWeekSpent: "Kay semanapi gastasqani",
    availablePayments: "Qullqi Apay Rikchakuna",
    personToPerson: "Runapa Runaman (P2P)",
    personToBusiness: "Runapa Ranqanaman (P2B)",
    governmentToPerson: "Gobiernopa Runaman (G2P)",
    active: "Llamkachkan",

    // Payments
    selectPaymentType: "Qullqi apay laya akllay",
    makePayment: "Qullqi Apay",
    phoneOrDni: "Telefono utaq DNI yupay",
    businessCode: "Ranqana codigo",
    amount: "Hayka qullqi (S/)",
    send: "Apachiy",
    scanQR: "QR ñawinchay",
    governmentPayments: "Gobiernopa Qullqin",
    subsidiesAvailable: "Yanapakuy programakuna",
    claimPayments: "Qullqita chaskiy",
    quickPayments: "Utqaylla Qullqi Apay",

    // Education
    myProgress: "Ñuqap Ñanin",
    lessonsCompleted: "Yachaykuna tukusqa",
    whatIsCBDC: "¿Ima digital qullqi?",
    firstPayment: "Ñawpaq qullqi apayta yachay",
    digitalSecurity: "Digital qullqi waqaychay",
    digitalSaving: "Digital qullqiwan waqaychay",
    tipOfDay: "Kunanpa yachaynin",

    // History
    totalReceived: "Tukuy chaskisqa",
    totalSent: "Tukuy apasqa",
    thisMonth: "Kay killa",
    searchTransactions: "Qullqi apayta maskay...",
    all: "Tukuy",
    businesses: "Ranqanakuna",
    government: "Gobierno",
    completed: "Tukusqa",
    pending: "Suyaspa",
    failed: "Mana atisqa",

    // Offline
    offlineModeActive: "Mana tinkisqa ruway llamkachkan",
    availableOffline: "Mana tinkisqapi qullqi",
    localTokens: "Kaypi digital qullqi",
    validFor: "Allin",
    days: "punchawkuna",
    paymentMethods: "Qullqi apay ñankuna",
    qrCode: "QR Codigo",
    ussdCode: "USSD Codigo",
    bluetooth: "Bluetooth",
    available: "Kanmi",
    pendingTransactions: "Suyaspa qullqi apay",

    // Common
    back: "Kutiy",
    continue: "Puririy",
    cancel: "Saqiy",
    accept: "Chaskiy",
    close: "Wichqay",
    loading: "Cargando...",
    error: "Pantay",
    success: "Allin",

    // Cultural
    greeting: "¡Napaykullayki!",
    thanks: "Sulpayki",
    family: "Ayllu",
    community: "Llaqta",
  },

  ay: {
    // App General (Aymara)
    appName: "WASI",
    online: "Mayacht'ata",
    offline: "Janiw mayacht'ati",
    points: "puntos",
    level: "Nivel",

    // Landing Page
    landingTitle: "Taqi Peruano Jaqinakataki CBDC Digital Qullqi Uta",
    landingSubtitle: "BCRP-manta blockchain tecnologiampi qullqi yanapt'awi",
    startButton: "Qalltawi",
    learnMoreButton: "Juk'amp Yatiqawi",

    // Description
    descriptionTitle: "¿Kuna WASI?",
    descriptionText:
      "WASI ukax mä machaq digital qullqi uta, Perú Banco Central ukat Digital Qullqipa (CBDC) luraw i. Taqi peruano jaqinakatakix qullqi yanapt'awi churani, jark'ata, jank'ak ukat jan jark'aqanakanïñat. Jaya markanakat, jilïr arunakat ukhamarak jan internet ukamp irnaqañ yanapt'i.",

    // Objectives
    objectivesTitle: "Lurañ Amtawinakasa",
    objective1Title: "Taqpachar Qullqi Yanapt'awi",
    objective1Text:
      "Taqi peruano jaqinakatakix digital qullqi yanapt'awi churañ a, juk'amp chakra markanakampi ukhamarak ayllu markanakampi.",
    objective2Title: "Jark'añ ukat Sut'inchañ",
    objective2Text: "Blockchain tecnologia churañ a jark'at, sut'i ukhamarak qatipasiñ luräwinak utjañapataki.",
    objective3Title: "Jakawi Mantañ",
    objective3Text: "Plataforma 6 arunakamp churañ a: Español, English, Quechua, Aymara, Asháninka, Awajún.",
    objective4Title: "Tecnología Ch'aman",
    objective4Text: "Jan internet ukampiw irnaqañ yatiña QR, USSD, Bluetooth ukanakapampiw.",

    // Benefits
    benefitsTitle: "WASI Askichawinakapa",
    benefit1Title: "Janïr Banco Qullqi",
    benefit1Text: "Qullqi apayañ ukat qullqi churañ janïr jach'a banco qullqimpi. Qullqimaj jumaw.",
    benefit2Title: "Jank'ak Qullqi Apayañ",
    benefit2Text: "Qullqi apayañ ukat katxaruñ segundunakanw, 24 horanakaw, 7 urunakanw.",
    benefit3Title: "Janïr Internet ukamp Irnaqañ",
    benefit3Text: "Qullqi apayañ lurañ a janïr internet ukampiw QR, USSD (*123#) jani ukax Bluetooth ukanakapamp.",
    benefit4Title: "BCRP Yanapt'i",
    benefit4Text: "Sapa Digital Sol ukax BCRP-mp 1:1 yanapt'at, chanipaamp.",

    // Features
    featuresTitle: "Jach'a Lurañanakasa",
    feature1Title: "Walja Aru",
    feature1Text: "Taqpacha interfaz 6 arunakamp: Español, English, Quechua, Aymara, Asháninka, Awajún.",
    feature2Title: "MetaMask Mayacht'awi",
    feature2Text: "MetaMask qullqi utam mayacht'ayañ ukat walja blockchain ñanakan qullqim kamachañ.",
    feature3Title: "Mochila Modo",
    feature3Text: "Anatasiñ qullqi imaña sistema machaq qullqi amtam puriñapataki.",
    feature4Title: "Marka Mayiñanaka",
    feature4Text: "Jisk'a mayiñanak mantañ chani qullqimpi ukhamarak janïr ch'am lurawinakampi.",
    feature5Title: "Qullqi Yatiqawi",
    feature5Text: "Digital qullqit yatiqañ a anatasiñ yatiñanakamp ukhamarak nayrar sarawim premiokun jikxatañ.",
    feature6Title: "Jakawi Anatañanaka",
    feature6Text: "Jach'a qullqi churañanak anatañ nayra lurawinakamp.",

    // Team
    teamTitle: "Qullir Tantanakasa",
    teamSubtitle: "Perúnx qullqi yanapt'äwipataki compromiso lurawinakasa",
    role1: "Full Stack & Blockchain Luriri",
    role2: "Full Stack Luriri & UX Diseñador",

    // Navigation
    wallet: "Qullqi uta",
    payments: "Qullqi apayaña",
    education: "Yatiña",
    history: "Nayra lurawinaka",
    backpack: "Mochila",
    loans: "Mayiña",

    // Wallet
    myWallet: "Nayax Qullqi Utan CBDC",
    digitalSoles: "BCRP-an Digital Qullqipa",
    thisWeekReceived: "Aka semanan katxaruxa",
    thisWeekSpent: "Aka semanan apayaruxa",
    availablePayments: "Qullqi Apayañ Uñtawinaka",
    personToPerson: "Jaqin Jaqiru (P2P)",
    personToBusiness: "Jaqin Aljañutakiru (P2B)",
    governmentToPerson: "Gobiernon Jaqiru (G2P)",
    active: "Irnaqki",

    // Payments
    selectPaymentType: "Qullqi apayañ kasta ajlliña",
    makePayment: "Qullqi Apayaña",
    phoneOrDni: "Telefono jan ukax DNI jakhu",
    businessCode: "Aljañ codigo",
    amount: "Qawqha qullqi (S/)",
    send: "Apayaña",
    scanQR: "QR uñjaña",
    governmentPayments: "Gobiernon Qullqipa",
    subsidiesAvailable: "Yanap programanaka",
    claimPayments: "Qullqi katxaruña",
    quickPayments: "Jank'ak Qullqi Apayaña",

    // Education
    myProgress: "Nayax Sarnaqawi",
    lessonsCompleted: "Yatiñanaka tukuyata",
    whatIsCBDC: "¿Kuna digital qullqi?",
    firstPayment: "Nayrïr qullqi apayaña yatiña",
    digitalSecurity: "Digital qullqi jark'aña",
    digitalSaving: "Digital qullqimpi imaña",
    tipOfDay: "Jichhax yatiña",

    // History
    totalReceived: "Taqi katxarata",
    totalSent: "Taqi apayata",
    thisMonth: "Aka phaxsi",
    searchTransactions: "Qullqi apayaña thaqhaña...",
    all: "Taqi",
    businesses: "Aljañanaka",
    government: "Gobierno",
    completed: "Tukuyata",
    pending: "Suyt'ki",
    failed: "Janiw yatiqkanti",

    // Offline
    offlineModeActive: "Janiw mayacht'añ irnaqawi",
    availableOffline: "Janiw mayacht'an qullqi",
    localTokens: "Akankir digital qullqi",
    validFor: "Suma",
    days: "urunaxa",
    paymentMethods: "Qullqi apayañ thakhinaka",
    qrCode: "QR Codigo",
    ussdCode: "USSD Codigo",
    bluetooth: "Bluetooth",
    available: "Utji",
    pendingTransactions: "Suyt'askir qullqi apayaña",

    // Common
    back: "Kutt'aña",
    continue: "Saraña",
    cancel: "Jaytaña",
    accept: "Katxaruña",
    close: "Jist'araña",
    loading: "Cargando...",
    error: "Pantjata",
    success: "Suma",

    // Cultural
    greeting: "¡Kamisaraki!",
    thanks: "Yuspajarama",
    family: "Jila",
    community: "Marka",
  },

  cni: {
    // App General (Asháninka)
    appName: "WASI",
    online: "Ayotero",
    offline: "Tekatsi ayotero",
    points: "puntos",
    level: "Nivel",

    // Landing Page
    landingTitle: "Antamiki Peruano Ashaninkapataki CBDC Digital Patsani Wasi",
    landingSubtitle: "BCRP-manta blockchain tecnologiampi patsani yanapt'awi",
    startButton: "Okaratzi",
    learnMoreButton: "Aswan Yotagantsi",

    // Description
    descriptionTitle: "¿Jaka WASI?",
    descriptionText:
      "WASI okax mä machaq digital patsani wasi, Perú Banco Central nisqamanta Digital Patsani (CBDC) ruwan. Antamiki peruano ashaninkapataki patsani yanapt'awi qun, jark'ata, jank'ak hinaspa mana hark'aykunawan. Jaya kemisantsinakataki, mama simikunataki ukhamarak mana internet ukamp irnaqañ yanapt'i.",

    // Objectives
    objectivesTitle: "Ruwayninchikkuna",
    objective1Title: "Antamikipataki Patsani Yanapt'awi",
    objective1Text:
      "Antamiki peruano ashaninkapataki digital patsani yanapt'awi quy, aswanta chakra kemisantsinakapi hinaspa ayllu kemisantsinakapi.",
    objective2Title: "Jark'añ hinaspa Sut'inchay",
    objective2Text: "Blockchain tecnologiata churay jark'asqa, sut'i hinaspa qatipana ruwaykuna kananpaq.",
    objective3Title: "Matsigenka Yaykuy",
    objective3Text: "Plataformata 6 simikunapi quy: Español, English, Quechua, Aymara, Asháninka, Awajún.",
    objective4Title: "Tecnología Kallpayuq",
    objective4Text: "Mana internetwan llamk'ayta atiy QR, USSD, Bluetooth nisqawanpas.",

    // Benefits
    benefitsTitle: "WASI Allinninkunа",
    benefit1Title: "Tekatsi Banco Patsani",
    benefit1Text: "Patsani apanakotantsi hinaspa churantsi tekatsi jach'a banco patsan impi. Patsanim jumawa.",
    benefit2Title: "Jank'ak Patsani Apanakotantsi",
    benefit2Text: "Patsani apanakotantsi hinaspa antakotantsi segundokunapi, 24 horaspi, 7 p'unchawpi.",
    benefit3Title: "Tekatsi Internet ukamp Irnaqañ",
    benefit3Text: "Patsani apanakotantsi tekatsi internet ukampi QR, USSD (*123#) jani ukax Bluetooth ukanakapamp.",
    benefit4Title: "BCRP Yanapt'i",
    benefit4Text: "Sapa Digital Sol nisqaqa BCRP-wan 1:1 yanapt'asqa, chaninninwan.",

    // Features
    featuresTitle: "Jach'a Ruwayninkunа",
    feature1Title: "Walja Aru",
    feature1Text: "Hunt'a interfaz 6 simikunapi: Español, English, Quechua, Aymara, Asháninka, Awajún.",
    feature2Title: "MetaMask Tinkiy",
    feature2Text: "MetaMask patsani wasim tinkiy hinaspa achka blockchain ñankunapi patsan iykita kamachiy.",
    feature3Title: "Mochila Modo",
    feature3Text: "Pukllay waqaychay sistema musuq patsani puntaykikunaman chayanapaq.",
    feature4Title: "Kemisantsi Mañakuykuna",
    feature4Text: "Huch'uy mañakuykunaman yaykuy chanin patsanimpi hinaspa mana sasa ruwaykunawan.",
    feature5Title: "Patsani Yotagantsi",
    feature5Text:
      "Digital patsanimanta yachay pukllay yachaykunawan hinaspa ñawpaqman purisqaykimanta premiokuna tariy.",
    feature6Title: "Matsigenka Ceremonias",
    feature6Text: "Hatun patsani quykunata raymichay ñawpa ruwaykunawan.",

    // Team
    teamTitle: "Equiponchik",
    teamSubtitle: "Perúpi patsani yanapt'äwipataki compromiso nisqa ruwaqkuna",
    role1: "Full Stack & Blockchain Ruwaq",
    role2: "Full Stack Ruwaq & UX Diseñador",

    // Navigation
    wallet: "Patsani",
    payments: "Patsani ashitantyari",
    education: "Ayotero",
    history: "Okanta",
    backpack: "Mochila",
    loans: "Mañakuy",

    // Wallet
    myWallet: "Nopatsani CBDC",
    digitalSoles: "BCRP patsani digital",
    thisWeekReceived: "Oka semana noshiyetakero",
    thisWeekSpent: "Oka semana nashitantakero",
    availablePayments: "Patsani Ashitantari",
    personToPerson: "Asháninka Asháninkani (P2P)",
    personToBusiness: "Asháninka Kemisantsi (P2B)",
    governmentToPerson: "Gobierno Asháninkani (G2P)",
    active: "Ayotero",

    // Payments
    selectPaymentType: "Patsani ashitantari akantero",
    makePayment: "Patsani Ashitantari",
    phoneOrDni: "Telefono o DNI",
    businessCode: "Kemisantsi codigo",
    amount: "Jaka patsani (S/)",
    send: "Ashitantari",
    scanQR: "QR akantero",
    governmentPayments: "Gobierno Patsani",
    subsidiesAvailable: "Ayotantari programas",
    claimPayments: "Patsani shiyetari",
    quickPayments: "Tsame Patsani Ashitantari",

    // Education
    myProgress: "Noyotero",
    lessonsCompleted: "Ayotantari tsonkantsi",
    whatIsCBDC: "¿Jaka digital patsani?",
    firstPayment: "Nairi patsani ashitantari",
    digitalSecurity: "Digital patsani kametantari",
    digitalSaving: "Digital patsani imatantari",
    tipOfDay: "Jiroka ayotantari",

    // History
    totalReceived: "Antamiki shiyetantakero",
    totalSent: "Antamiki ashitantakero",
    thisMonth: "Oka killa",
    searchTransactions: "Patsani ashitantari shirontari...",
    all: "Antamiki",
    businesses: "Kemisantsikuna",
    government: "Gobierno",
    completed: "Tsonkantsi",
    pending: "Ayotero",
    failed: "Tekatsi yotantakero",

    // Offline
    offlineModeActive: "Tekatsi ayotero llamkachkan",
    availableOffline: "Tekatsi ayotero patsani",
    localTokens: "Okantsi digital patsani",
    validFor: "Kametantsi",
    days: "killa",
    paymentMethods: "Patsani ashitantari ñani",
    qrCode: "QR Codigo",
    ussdCode: "USSD Codigo",
    bluetooth: "Bluetooth",
    available: "Ayotero",
    pendingTransactions: "Ayotero patsani ashitantari",

    // Common
    back: "Kityongantari",
    continue: "Ayotero",
    cancel: "Jaytari",
    accept: "Shiyetari",
    close: "Tsipatantari",
    loading: "Cargando...",
    error: "Tekatsi",
    success: "Kametantsi",

    // Cultural
    greeting: "¡Piarentsi!",
    thanks: "Piarentsi",
    family: "Noshinto",
    community: "Kemisantsi",
  },

  agr: {
    // App General (Awajún)
    appName: "WASI",
    online: "Etserin",
    offline: "Atsa etserin",
    points: "puntos",
    level: "Nivel",

    // Landing Page
    landingTitle: "Ashí Peruano Aentspataki CBDC Digital Kuichik Jea",
    landingSubtitle: "BCRP-manta blockchain tecnologiampi kuichik yanapt'awi",
    startButton: "Jintia",
    learnMoreButton: "Juk'at Unuimiau",

    // Description
    descriptionTitle: "¿Waruka WASI?",
    descriptionText:
      "WASI ukax mä machaq digital kuichik jea, Perú Banco Central ukat Digital Kuichik (CBDC) luraw i. Ashí peruano aentspatakix kuichik yanapt'awi churani, ayamprau, yamaram ukat jan jark'aqanakanïñat. Jaya aentsnakataki, jilïr arunakat ukhamarak jan internet ukamp irnaqañ yanapt'i.",

    // Objectives
    objectivesTitle: "Najanamu Amtawinakasa",
    objective1Title: "Ashípataki Kuichik Yanapt'awi",
    objective1Text:
      "Ashí peruano aentspatakix digital kuichik yanapt'awi churañ a, juk'amp wampis aentsnampi ukhamarak shuara aentsnampi.",
    objective2Title: "Ayamprau ukat Sut'inchañ",
    objective2Text: "Blockchain tecnologia churañ a ayamprau, sut'i ukhamarak qatipasiñ najanamu utjañapataki.",
    objective3Title: "Aents Mantañ",
    objective3Text: "Plataforma 6 arunakamp churañ a: Español, English, Quechua, Aymara, Asháninka, Awajún.",
    objective4Title: "Tecnología Kakaram",
    objective4Text: "Atsa internet ukampiw irnaqañ yatiña QR, USSD, Bluetooth ukanakapampiw.",

    // Benefits
    benefitsTitle: "WASI Penker Najanamu",
    benefit1Title: "Atsa Banco Kuichik",
    benefit1Text: "Kuichik akupkamu hinaspa quy atsa jach'a banco kuichikwan. Kuichkim jumawa.",
    benefit2Title: "Yamaram Kuichik Akupkamu",
    benefit2Text: "Kuichik akupkamu hinaspa jukimiau segundunakanw, 24 horanakaw, 7 tsawannakaw.",
    benefit3Title: "Atsa Internet ukamp Irnaqañ",
    benefit3Text: "Kuichik akupkamu atsa internet ukampiw QR, USSD (*123#) jani ukax Bluetooth ukanakapamp.",
    benefit4Title: "BCRP Yanapt'i",
    benefit4Text: "Sapa Digital Sol ukax BCRP-mp 1:1 yanapt'at, chanipaamp.",

    // Features
    featuresTitle: "Uunt Najanamu",
    feature1Title: "Walja Chicham",
    feature1Text: "Ashí interfaz 6 chichamnampi: Español, English, Quechua, Aymara, Asháninka, Awajún.",
    feature2Title: "MetaMask Irunu",
    feature2Text: "MetaMask kuichik jeam irunu hinaspa walja blockchain jintan kuichkim kamachañ.",
    feature3Title: "Mochila Modo",
    feature3Text: "Pukllay ikiau sistema machaq kuichik amtam weañapataki.",
    feature4Title: "Aents Seaktin",
    feature4Text: "Uchich seaktin mantañ penker kuichikwan ukhamarak atsa ch'am najanamu.",
    feature5Title: "Kuichik Unuimiau",
    feature5Text: "Digital kuichik unuimiau pukllay unuimiaunakanampi ukhamarak weamu premiokun jikxatañ.",
    feature6Title: "Aents Nampet",
    feature6Text: "Uunt kuichik churañanak nampetjai nayra najanamu.",

    // Team
    teamTitle: "Ii Tantanakasa",
    teamSubtitle: "Perúnx kuichik yanapt'äwipataki compromiso najanamu",
    role1: "Full Stack & Blockchain Najanatai",
    role2: "Full Stack Najanatai & UX Diseñador",

    // Navigation
    wallet: "Kuichik",
    payments: "Kuichik susatin",
    education: "Unuimatin",
    history: "Yaunchu",
    backpack: "Mochila",
    loans: "Seaktin",

    // Wallet
    myWallet: "Wina kuichik CBDC",
    digitalSoles: "BCRP kuichik digital",
    thisWeekReceived: "Ju tsawan achiktin",
    thisWeekSpent: "Ju tsawan susatin",
    availablePayments: "Kuichik Susatin",
    personToPerson: "Aents Aentsun (P2P)",
    personToBusiness: "Aents Surukin (P2B)",
    governmentToPerson: "Gobierno Aentsun (G2P)",
    active: "Takakui",

    // Payments
    selectPaymentType: "Kuichik susatin akantin",
    makePayment: "Kuichik Susatin",
    phoneOrDni: "Telefono wa DNI",
    businessCode: "Suruki codigo",
    amount: "Mijan kuichik (S/)",
    send: "Susatin",
    scanQR: "QR iinin",
    governmentPayments: "Gobierno Kuichik",
    subsidiesAvailable: "Yaintin programas",
    claimPayments: "Kuichik achiktin",
    quickPayments: "Yamaram Kuichik Susatin",

    // Education
    myProgress: "Wina jintin",
    lessonsCompleted: "Unuimatin najantin",
    whatIsCBDC: "¿Waruka digital kuichik?",
    firstPayment: "Emka kuichik susatin",
    digitalSecurity: "Digital kuichik ayampratin",
    digitalSaving: "Digital kuichik ipiatin",
    tipOfDay: "Yamaikia unuimatin",

    // History
    totalReceived: "Ashí achiktinua",
    totalSent: "Ashí susatinua",
    thisMonth: "Ju nantu",
    searchTransactions: "Kuichik susatin shiir...",
    all: "Ashí",
    businesses: "Surukia",
    government: "Gobierno",
    completed: "Najantin",
    pending: "Nagkamatin",
    failed: "Atsa najantin",

    // Offline
    offlineModeActive: "Atsa etserin takakui",
    availableOffline: "Atsa etserin kuichik",
    localTokens: "Juju digital kuichik",
    validFor: "Pujut",
    days: "tsawan",
    paymentMethods: "Kuichik susatin jinta",
    qrCode: "QR Codigo",
    ussdCode: "USSD Codigo",
    bluetooth: "Bluetooth",
    available: "Aidau",
    pendingTransactions: "Nagkamatin kuichik susatin",

    // Common
    back: "Waketkin",
    continue: "Waketkatin",
    cancel: "Ukutin",
    accept: "Achiktin",
    close: "Eretin",
    loading: "Cargando...",
    error: "Tsekeamu",
    success: "Pujut",

    // Cultural
    greeting: "¡Yama!",
    thanks: "Yainmek",
    family: "Shuara",
    community: "Aents",
  },
}

export function useTranslation(language: Language = "es") {
  return translations[language]
}

export const languageNames: Record<Language, string> = {
  es: "Español",
  en: "English",
  qu: "Runasimi",
  ay: "Aymar aru",
  cni: "Asháninka",
  agr: "Awajún",
}

export const languageFlags: Record<Language, string> = {
  es: "🇵🇪",
  en: "🇺🇸",
  qu: "🏔️",
  ay: "🌄",
  cni: "🌿",
  agr: "🦜",
}
