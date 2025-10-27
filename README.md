
# WASI - Billetera Digital Comunitaria

<div align="center">


**Conectando Tradición y Tecnología Financiera**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MetaMask](https://img.shields.io/badge/MetaMask-Enabled-orange?style=for-the-badge&logo=metamask)](https://metamask.io/)

[🚀 Demo](#) • [📖 Documentación](./TECHNICAL_DOCS.md) • [🤝 Contribuir](#contribuir) • [📧 Contacto](#)

</div>

---

## 🌟 ¿Qué es WASI?

**WASI** (del quechua: "casa" o "hogar") es una **billetera digital Web3** revolucionaria que fusiona la tecnología blockchain con las necesidades de comunidades locales. Diseñada para ser **inclusiva, accesible y culturalmente relevante**, WASI democratiza el acceso a servicios financieros digitales.

### 🎯 Misión

Empoderar a comunidades mediante tecnología financiera descentralizada, preservando identidad cultural y promoviendo inclusión económica.

### 💡 Características Únicas

- 🌍 **Multilingüe**: Español, Quechua, Aymara, Asháninka y más
- 🔗 **Web3 Nativa**: Integración completa con MetaMask y redes blockchain
- 📱 **Mobile-First**: Diseño responsive optimizado para dispositivos móviles
- 🎨 **Culturalmente Sensible**: Ceremonias de pago y elementos tradicionales
- 🗣️ **Accesible**: Navegación por voz y diseño inclusivo
- 📡 **Modo Offline**: Funcionalidad básica sin conexión a internet

---

## ✨ Características Principales

### 💰 Gestión de Billetera

| Característica | Descripción | Estado |
|---------------|-------------|--------|
| 🏠 **Dashboard** | Panel principal con balance y resumen de actividad | ✅ Activo |
| 💸 **Enviar Crypto** | Transferencias a direcciones o contactos guardados | ✅ Activo |
| 📥 **Recibir Pagos** | Generación de códigos QR para recibir pagos | ✅ Activo |
| 📊 **Historial** | Registro completo de transacciones con nombres de contactos | ✅ Activo |
| 👥 **Contactos** | Gestión de direcciones con nombres, emails y notas | ✅ Activo |
| 🔗 **Multi-Red** | Soporte para Ethereum, Polygon, BSC, Avalanche y más | ✅ Activo |

### 🌐 Web3 & Blockchain

- **🦊 Integración MetaMask**: Conexión directa con tu wallet
- **⛓️ Multi-Chain**: Soporte para 10+ redes blockchain
- **🔐 Seguridad**: Transacciones firmadas y verificadas on-chain
- **📡 Explorador**: Enlaces directos a block explorers
- **⚡ Gas Optimization**: Estimación de gas y optimización de costos

### 🎨 Experiencia de Usuario

- **🌍 5 Idiomas**: ES, QU, AY, CNI, AGR
- **📱 Responsive**: Optimizado para móvil, tablet y desktop
- **🎭 Temas**: Modo claro y oscuro
- **🗣️ Voz**: Navegación por comandos de voz
- **♿ Accesibilidad**: WCAG 2.1 AA compliant

### 🏘️ Funcionalidades Comunitarias

- **🛍️ Mercado Local**: Marketplace para negocios locales
- **🏦 Préstamos**: Sistema de micro-créditos comunitarios
- **🎓 Educación**: Módulos de educación financiera
- **🤝 Líderes**: Conexión con líderes comunitarios
- **🎉 Ceremonias**: Pagos con significado cultural

---

## 🛠️ Stack Tecnológico

<table>
<tr>
<td width="50%">

### Frontend
- ⚛️ **Next.js 14.2** - React Framework
- 📘 **TypeScript 5** - Type Safety
- 🎨 **Tailwind CSS 3.4** - Styling
- 🧩 **Radix UI** - Componentes accesibles
- 🎭 **Shadcn/ui** - Component Library
- 📊 **Recharts** - Data Visualization

</td>
<td width="50%">

### Web3 & Blockchain
- 🦊 **MetaMask SDK** - Wallet Integration
- ⛓️ **Ethereum** - Smart Contracts
- 🔗 **Multi-Chain** - Cross-chain support
- 💎 **Web3.js** - Blockchain interaction
- 🔐 **Ethers.js** - Ethereum library

</td>
</tr>
<tr>
<td width="50%">

### Gestión de Estado
- 🪝 **React Hooks** - State management
- 📦 **LocalStorage** - Persistent data
- 🔄 **React Hook Form** - Form handling
- ✅ **Zod** - Schema validation

</td>
<td width="50%">

### Herramientas
- 📦 **npm/pnpm** - Package manager
- 🔧 **ESLint** - Code linting
- 🎨 **Prettier** - Code formatting
- 🐳 **Docker** - Containerization

</td>
</tr>
</table>

---

## 🚀 Inicio Rápido

### Prerrequisitos

- 📦 Node.js 18+ 
- 🦊 MetaMask instalado en tu navegador
- 💻 Git

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/wasi.git
cd wasi

# 2. Instalar dependencias (recomendado: pnpm)
npm install
# o
pnpm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

### Build para Producción

```bash
# Construir la aplicación
npm run build

# Iniciar servidor de producción
npm start
```

### 🐳 Docker

```bash
# Construir imagen
docker build -t wasi .

# Ejecutar contenedor
docker run -p 3000:3000 wasi
```

---

## 📁 Estructura del Proyecto

```
wasi/
├── 📂 app/                      # Next.js App Router
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página de inicio
│   └── globals.css             # Estilos globales
│
├── 📂 components/               # Componentes React
│   ├── 📂 ui/                  # Componentes base (Shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── wallet-dashboard.tsx    # 🏠 Dashboard principal
│   ├── send-transaction.tsx    # 💸 Enviar crypto
│   ├── receive-payment.tsx     # 📥 Recibir pagos
│   ├── transaction-history.tsx # 📊 Historial
│   ├── contacts.tsx            # 👥 Gestión de contactos
│   ├── network-selector.tsx    # 🔗 Selector de red
│   ├── payment-module.tsx      # 💳 Módulo de pagos
│   ├── loans-module.tsx        # 🏦 Préstamos
│   ├── local-marketplace.tsx   # 🛍️ Mercado local
│   ├── education-module.tsx    # 🎓 Educación
│   └── ...
│
├── 📂 lib/                      # Utilidades y lógica
│   ├── metamask.ts             # 🦊 Integración MetaMask
│   ├── i18n.ts                 # 🌍 Internacionalización
│   └── utils.ts                # 🔧 Utilidades
│
├── 📂 hooks/                    # Custom React Hooks
│   └── use-*.ts
│
├── 📂 public/                   # Archivos estáticos
│   └── assets/
│
├── 📂 styles/                   # Estilos adicionales
│
├── 📄 package.json             # Dependencias
├── 📄 tsconfig.json            # Config TypeScript
├── 📄 tailwind.config.ts       # Config Tailwind
├── 📄 next.config.mjs          # Config Next.js
└── 📄 README.md                # Este archivo
```

---

## 🎯 Casos de Uso

### 👤 Usuario Individual
1. **Conectar Wallet** → Vincular MetaMask
2. **Agregar Contactos** → Guardar direcciones frecuentes
3. **Enviar Crypto** → Transferir a contactos o direcciones
4. **Recibir Pagos** → Generar QR para cobros
5. **Ver Historial** → Revisar transacciones pasadas

### 🏪 Comerciante Local
1. **Generar QR de Cobro** → Con monto específico
2. **Recibir Pagos** → De clientes con crypto
3. **Gestionar Contactos** → Clientes frecuentes
4. **Marketplace** → Publicar productos/servicios

### 🏘️ Comunidad
1. **Préstamos Comunitarios** → Micro-créditos P2P
2. **Educación Financiera** → Aprender sobre crypto
3. **Ceremonias de Pago** → Transacciones culturales
4. **Líderes Comunitarios** → Coordinación y apoyo

---

## 🌐 Redes Soportadas

| Red | Chain ID | Moneda | Testnet | Estado |
|-----|----------|--------|---------|--------|
| Ethereum Mainnet | 0x1 | ETH | ❌ | ✅ |
| Sepolia | 0xaa36a7 | ETH | ✅ | ✅ |
| Holesky | 0x4268 | ETH | ✅ | ✅ |
| Polygon | 0x89 | MATIC | ❌ | ✅ |
| BSC | 0x38 | BNB | ❌ | ✅ |
| Avalanche | 0xa86a | AVAX | ❌ | ✅ |

---


## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. 🍴 Fork el proyecto
2. 🌿 Crea una rama (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🔃 Abre un Pull Request

### 📋 Guías de Contribución

- Sigue el estilo de código existente
- Escribe tests para nuevas funcionalidades
- Actualiza la documentación
- Usa commits semánticos

---

## 👥 Equipo

Desarrollado con ❤️ por el equipo WASI


<div align="center">

**[⬆ Volver arriba](#-wasi---billetera-digital-comunitaria)**

Hecho con 💜 para las comunidades

</div>

