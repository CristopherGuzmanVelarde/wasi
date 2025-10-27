# 🏗️ WASI - Diagramas de Arquitectura

<div align="center">

**Diagramas Detallados de Flujos y Arquitectura**

</div>

---

## 📊 Índice de Diagramas

1. [🏛️ Arquitectura General](#️-arquitectura-general)
2. [🔄 Flujo de Autenticación](#-flujo-de-autenticación)
3. [💸 Flujo de Transacciones](#-flujo-de-transacciones)
4. [👥 Gestión de Contactos](#-gestión-de-contactos)
5. [🌐 Cambio de Red](#-cambio-de-red)
6. [💾 Persistencia de Datos](#-persistencia-de-datos)

---

## 🏛️ Arquitectura General

### Vista de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USUARIO FINAL                              │
│                    (Browser + MetaMask Extension)                    │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    React Components                           │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │  │
│  │  │Dashboard │ │  Send    │ │ Receive  │ │ Contacts │       │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │  │
│  │  │ History  │ │ Network  │ │  Loans   │ │ Market   │       │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CAPA DE LÓGICA DE NEGOCIO                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Custom Hooks                               │  │
│  │  • useWallet()      • useTransactions()                      │  │
│  │  • useContacts()    • useNetwork()                           │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Business Logic                             │  │
│  │  • Validation       • Formatting                             │  │
│  │  • Calculations     • Error Handling                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   CAPA DE INTEGRACIÓN    │  │  CAPA DE PERSISTENCIA    │
│  ┌────────────────────┐  │  │  ┌────────────────────┐  │
│  │  MetaMask SDK      │  │  │  │  LocalStorage      │  │
│  │  • eth_accounts    │  │  │  │  • Contacts        │  │
│  │  • eth_sendTx      │  │  │  │  • Transactions    │  │
│  │  • eth_chainId     │  │  │  │  • Settings        │  │
│  └────────────────────┘  │  │  └────────────────────┘  │
└────────────┬─────────────┘  └──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         BLOCKCHAIN LAYER                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐              │
│  │ Ethereum │ │ Polygon  │ │   BSC    │ │ Avalanche│              │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```


---

## 🔄 Flujo de Autenticación

### Conexión con MetaMask

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLUJO DE AUTENTICACIÓN                            │
└─────────────────────────────────────────────────────────────────────┘

    👤 Usuario                 🖥️ App                 🦊 MetaMask
       │                        │                        │
       │  Click "Conectar"      │                        │
       ├───────────────────────►│                        │
       │                        │                        │
       │                        │  ¿MetaMask instalado?  │
       │                        ├───────────────────────►│
       │                        │                        │
       │                        │◄───────────────────────┤
       │                        │        Sí              │
       │                        │                        │
       │                        │  eth_requestAccounts   │
       │                        ├───────────────────────►│
       │                        │                        │
       │                        │                        │  ┌──────────┐
       │                        │                        │  │ Popup de │
       │                        │                        │  │ Conexión │
       │                        │                        │  └──────────┘
       │                        │                        │       │
       │  ◄──────────────────────────────────────────────────────┘
       │  "¿Conectar con WASI?"                         │
       │                        │                        │
       │  Acepta                │                        │
       ├───────────────────────────────────────────────►│
       │                        │                        │
       │                        │◄───────────────────────┤
       │                        │   [address]            │
       │                        │                        │
       │                        │  eth_getBalance        │
       │                        ├───────────────────────►│
       │                        │                        │
       │                        │◄───────────────────────┤
       │                        │   balance              │
       │                        │                        │
       │                        │  eth_chainId           │
       │                        ├───────────────────────►│
       │                        │                        │
       │                        │◄───────────────────────┤
       │                        │   chainId              │
       │                        │                        │
       │                        │  💾 Guardar estado     │
       │                        │  • address             │
       │                        │  • balance             │
       │                        │  • chainId             │
       │                        │                        │
       │◄───────────────────────┤                        │
       │  Mostrar Dashboard     │                        │
       │                        │                        │
```


---

## 💸 Flujo de Transacciones

### Envío de Criptomonedas

```
┌─────────────────────────────────────────────────────────────────────┐
│                  FLUJO DE ENVÍO DE TRANSACCIÓN                       │
└─────────────────────────────────────────────────────────────────────┘

┌──────────┐
│ INICIO   │
└────┬─────┘
     │
     ▼
┌─────────────────────┐
│ Usuario ingresa:    │
│ • Dirección destino │
│ • Monto             │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐      ❌
│ Validar formulario  ├──────────► Mostrar errores
└────┬────────────────┘
     │ ✅
     ▼
┌─────────────────────┐
│ ¿Es un contacto?    │
└────┬────────────────┘
     │
     ├─► Sí ──► Mostrar nombre del contacto
     │
     └─► No ──► Continuar
     │
     ▼
┌─────────────────────┐
│ Convertir ETH→Wei   │
│ value = amount *    │
│ 10^18               │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Estimar Gas         │
│ eth_estimateGas     │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Preparar TX params: │
│ {                   │
│   from: address,    │
│   to: recipient,    │
│   value: valueWei,  │
│   gas: estimated    │
│ }                   │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ eth_sendTransaction │
│ (MetaMask popup)    │
└────┬────────────────┘
     │
     ├─► Usuario rechaza ──► ❌ Cancelar
     │
     └─► Usuario firma ──────┐
                             │
                             ▼
                    ┌─────────────────────┐
                    │ Obtener TX hash     │
                    └────┬────────────────┘
                         │
                         ▼
                    ┌─────────────────────┐
                    │ Guardar en historial│
                    │ Status: PENDING     │
                    └────┬────────────────┘
                         │
                         ▼
                    ┌─────────────────────┐
                    │ Mostrar modal éxito │
                    │ con TX hash         │
                    └────┬────────────────┘
                         │
                         ▼
                    ┌─────────────────────┐
                    │ Polling cada 5s     │
                    │ eth_getTxReceipt    │
                    └────┬────────────────┘
                         │
                         ▼
                    ┌─────────────────────┐
                    │ ¿Confirmada?        │
                    └────┬────────────────┘
                         │
                         ├─► No ──► Continuar polling
                         │
                         └─► Sí ──┐
                                   │
                                   ▼
                              ┌─────────────────────┐
                              │ Actualizar status   │
                              │ Status: CONFIRMED   │
                              └────┬────────────────┘
                                   │
                                   ▼
                              ┌─────────────────────┐
                              │ Notificar usuario   │
                              │ ✅ Transacción OK   │
                              └────┬────────────────┘
                                   │
                                   ▼
                              ┌──────────┐
                              │   FIN    │
                              └──────────┘
```


---

## 👥 Gestión de Contactos

### Flujo Completo de Contactos

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SISTEMA DE CONTACTOS                              │
└─────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                         AGREGAR CONTACTO                            │
└────────────────────────────────────────────────────────────────────┘

    Usuario                    App                  LocalStorage
       │                        │                        │
       │  Click "Nuevo"         │                        │
       ├───────────────────────►│                        │
       │                        │                        │
       │                        │  Mostrar formulario    │
       │◄───────────────────────┤                        │
       │                        │                        │
       │  Llenar datos:         │                        │
       │  • Nombre              │                        │
       │  • Dirección 0x...     │                        │
       │  • Email (opcional)    │                        │
       │  • Nota (opcional)     │                        │
       ├───────────────────────►│                        │
       │                        │                        │
       │  Click "Guardar"       │                        │
       ├───────────────────────►│                        │
       │                        │                        │
       │                        │  Validar:              │
       │                        │  ✓ Nombre no vacío     │
       │                        │  ✓ Dirección válida    │
       │                        │  ✓ No duplicado        │
       │                        │                        │
       │                        │  Crear objeto:         │
       │                        │  {                     │
       │                        │    id: timestamp,      │
       │                        │    name: "...",        │
       │                        │    address: "0x...",   │
       │                        │    email: "...",       │
       │                        │    note: "...",        │
       │                        │    createdAt: now      │
       │                        │  }                     │
       │                        │                        │
       │                        │  Guardar               │
       │                        ├───────────────────────►│
       │                        │  wasi_contacts         │
       │                        │                        │
       │                        │◄───────────────────────┤
       │                        │  OK                    │
       │                        │                        │
       │◄───────────────────────┤                        │
       │  ✅ Contacto guardado  │                        │
       │                        │                        │

┌────────────────────────────────────────────────────────────────────┐
│                    BUSCAR EN HISTORIAL                              │
└────────────────────────────────────────────────────────────────────┘

    Historial              Contactos              Display
       │                        │                     │
       │  Cargar TX             │                     │
       │  {                     │                     │
       │    to: "0xABC..."      │                     │
       │  }                     │                     │
       │                        │                     │
       │  Buscar contacto       │                     │
       ├───────────────────────►│                     │
       │  por dirección         │                     │
       │                        │                     │
       │                        │  Buscar en array    │
       │                        │  contacts.find()    │
       │                        │                     │
       │◄───────────────────────┤                     │
       │  {                     │                     │
       │    name: "Juan",       │                     │
       │    email: "..."        │                     │
       │  }                     │                     │
       │                        │                     │
       │  Renderizar            │                     │
       ├────────────────────────────────────────────►│
       │  👤 Juan                                     │
       │  0xABC...DEF                                 │
       │  juan@email.com                              │
       │                                              │
```


---

## 🌐 Cambio de Red

### Flujo de Cambio de Blockchain

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CAMBIO DE RED BLOCKCHAIN                          │
└─────────────────────────────────────────────────────────────────────┘

    Usuario              App              MetaMask          Blockchain
       │                  │                   │                  │
       │  Selecciona red  │                   │                  │
       │  "Polygon"       │                   │                  │
       ├─────────────────►│                   │                  │
       │                  │                   │                  │
       │                  │  Obtener config   │                  │
       │                  │  chainId: 0x89    │                  │
       │                  │                   │                  │
       │                  │  wallet_switch    │                  │
       │                  │  EthereumChain    │                  │
       │                  ├──────────────────►│                  │
       │                  │                   │                  │
       │                  │                   │  ¿Red existe?    │
       │                  │                   │                  │
       │                  │                   ├─► Sí ──┐         │
       │                  │                   │        │         │
       │                  │                   │◄───────┘         │
       │                  │◄──────────────────┤                  │
       │                  │  Cambiado         │                  │
       │                  │                   │                  │
       │                  │                   │  Conectar        │
       │                  │                   ├─────────────────►│
       │                  │                   │                  │
       │                  │                   │◄─────────────────┤
       │                  │                   │  Conectado       │
       │                  │                   │                  │
       │                  │  Actualizar UI    │                  │
       │◄─────────────────┤                   │                  │
       │  🟣 Polygon      │                   │                  │
       │                  │                   │                  │
       │                  │  Cargar balance   │                  │
       │                  ├──────────────────►│                  │
       │                  │  eth_getBalance   │                  │
       │                  │                   │                  │
       │                  │◄──────────────────┤                  │
       │                  │  balance          │                  │
       │                  │                   │                  │
       │                  │  Cargar historial │                  │
       │                  │  de esta red      │                  │
       │                  │                   │                  │
       │◄─────────────────┤                   │                  │
       │  Mostrar datos   │                   │                  │
       │  de Polygon      │                   │                  │
       │                  │                   │                  │

┌────────────────────────────────────────────────────────────────────┐
│                    SI LA RED NO EXISTE                              │
└────────────────────────────────────────────────────────────────────┘

       │                  │                   │
       │                  │                   │  ¿Red existe?
       │                  │                   │
       │                  │                   ├─► No ──┐
       │                  │                   │        │
       │                  │◄──────────────────┤        │
       │                  │  Error 4902       │◄───────┘
       │                  │                   │
       │                  │  wallet_add       │
       │                  │  EthereumChain    │
       │                  ├──────────────────►│
       │                  │  {                │
       │                  │    chainId,       │
       │                  │    chainName,     │
       │                  │    rpcUrls,       │
       │                  │    blockExplorer  │
       │                  │  }                │
       │                  │                   │
       │                  │                   │  Popup agregar
       │                  │                   │  red
       │                  │                   │
       │  ◄───────────────────────────────────┤
       │  "¿Agregar Polygon?"                 │
       │                  │                   │
       │  Acepta          │                   │
       ├──────────────────────────────────────►│
       │                  │                   │
       │                  │◄──────────────────┤
       │                  │  Red agregada     │
       │                  │                   │
       │◄─────────────────┤                   │
       │  ✅ Red agregada │                   │
       │  y cambiada      │                   │
       │                  │                   │
```


---

## 💾 Persistencia de Datos

### Estructura de LocalStorage

```
┌─────────────────────────────────────────────────────────────────────┐
│                      LOCALSTORAGE SCHEMA                             │
└─────────────────────────────────────────────────────────────────────┘

localStorage
│
├─ wasi_contacts: Contact[]
│  └─ [
│      {
│        id: "1234567890",
│        name: "Juan Pérez",
│        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
│        email: "juan@email.com",
│        note: "Cliente frecuente",
│        createdAt: 1704067200000
│      },
│      { ... }
│    ]
│
├─ wasi_transactions_0x1: Transaction[]  (Ethereum Mainnet)
│  └─ [
│      {
│        hash: "0x123...",
│        from: "0xABC...",
│        to: "0xDEF...",
│        value: "0.5",
│        timestamp: 1704067200000,
│        chainId: "0x1",
│        networkName: "Ethereum Mainnet",
│        status: "confirmed",
│        blockNumber: "18500000",
│        gasUsed: "21000"
│      },
│      { ... }
│    ]
│
├─ wasi_transactions_0x89: Transaction[]  (Polygon)
│  └─ [ ... ]
│
├─ wasi_transactions_0xaa36a7: Transaction[]  (Sepolia)
│  └─ [ ... ]
│
├─ wasi_settings: Settings
│  └─ {
│      theme: "dark",
│      notifications: true,
│      autoConnect: false,
│      defaultNetwork: "0x1"
│    }
│
├─ wasi_language: Language
│  └─ "es"
│
└─ wasi_last_connected: string
   └─ "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
```

### Flujo de Sincronización

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SINCRONIZACIÓN DE DATOS                           │
└─────────────────────────────────────────────────────────────────────┘

    App Load              LocalStorage           MetaMask
       │                        │                    │
       │  Cargar datos          │                    │
       ├───────────────────────►│                    │
       │                        │                    │
       │◄───────────────────────┤                    │
       │  • Contactos           │                    │
       │  • Transacciones       │                    │
       │  • Settings            │                    │
       │                        │                    │
       │  Verificar conexión    │                    │
       ├────────────────────────────────────────────►│
       │                        │                    │
       │◄────────────────────────────────────────────┤
       │  Estado actual         │                    │
       │                        │                    │
       │  Comparar datos        │                    │
       │  Local vs Blockchain   │                    │
       │                        │                    │
       │  ¿Hay diferencias?     │                    │
       │                        │                    │
       ├─► Sí ──► Sincronizar ─┤                    │
       │           • Actualizar │                    │
       │           • Guardar    │                    │
       │                        │                    │
       └─► No ──► Continuar    │                    │
                                │                    │
```


---

## 🔄 Ciclo de Vida de Componentes

### Componente SendTransaction

```
┌─────────────────────────────────────────────────────────────────────┐
│              CICLO DE VIDA: SendTransaction Component                │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   MOUNT      │
└──────┬───────┘
       │
       ▼
┌─────────────────────┐
│ useEffect()         │
│ • Cargar contactos  │
│ • Inicializar state │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ RENDER INICIAL      │
│ • Formulario vacío  │
│ • Botones activos   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ USER INTERACTION    │
│ • onChange inputs   │
│ • onClick buttons   │
└──────┬──────────────┘
       │
       ├─► Seleccionar contacto
       │   └─► setState(address, name)
       │       └─► RE-RENDER
       │
       ├─► Ingresar monto
       │   └─► setState(amount)
       │       └─► RE-RENDER
       │
       └─► Click "Enviar"
           │
           ▼
       ┌─────────────────────┐
       │ handleSend()        │
       │ • Validar           │
       │ • setState(sending) │
       └──────┬──────────────┘
              │
              ▼ RE-RENDER (loading)
              │
       ┌─────────────────────┐
       │ sendTransaction()   │
       │ • MetaMask popup    │
       └──────┬──────────────┘
              │
              ├─► Success
              │   └─► setState(txHash, success)
              │       └─► RE-RENDER (success modal)
              │
              └─► Error
                  └─► setState(error)
                      └─► RE-RENDER (error message)
```


---

## 📊 Diagrama de Estados

### Estados de una Transacción

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ESTADOS DE TRANSACCIÓN                            │
└─────────────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │   INICIAL    │
                    │  (no existe) │
                    └──────┬───────┘
                           │
                           │ Usuario envía TX
                           │
                           ▼
                    ┌──────────────┐
                    │   PENDING    │◄──────┐
                    │  ⏳ Esperando│       │
                    └──────┬───────┘       │
                           │               │
                           │ Polling       │
                           │ cada 5s       │
                           │               │
                           ├───────────────┘
                           │
                           │ Receipt obtenido
                           │
                           ▼
                    ┌──────────────┐
                    │  ¿Status?    │
                    └──────┬───────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
         ┌──────────────┐      ┌──────────────┐
         │  CONFIRMED   │      │    FAILED    │
         │  ✅ Exitosa  │      │  ❌ Fallida  │
         └──────────────┘      └──────────────┘
                │                     │
                │                     │
                └──────────┬──────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   FINAL      │
                    │ (inmutable)  │
                    └──────────────┘
```

### Estados del Wallet

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ESTADOS DEL WALLET                              │
└─────────────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │ DISCONNECTED │
                    │  🔴 No       │
                    │  conectado   │
                    └──────┬───────┘
                           │
                           │ Click "Conectar"
                           │
                           ▼
                    ┌──────────────┐
                    │  CONNECTING  │
                    │  ⏳ Esperando│
                    │  MetaMask    │
                    └──────┬───────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
         ┌──────────────┐      ┌──────────────┐
         │  CONNECTED   │      │    ERROR     │
         │  ✅ Activo   │      │  ❌ Falló    │
         └──────┬───────┘      └──────┬───────┘
                │                     │
                │                     │ Reintentar
                │                     │
                │                     └──────────┐
                │                                │
                │ Cambio de red                  │
                │                                │
                ▼                                │
         ┌──────────────┐                       │
         │  SWITCHING   │                       │
         │  🔄 Cambiando│                       │
         │  red         │                       │
         └──────┬───────┘                       │
                │                                │
                └────────────────────────────────┘
                                │
                                ▼
                         ┌──────────────┐
                         │  CONNECTED   │
                         │  (nueva red) │
                         └──────────────┘
```


---

## 🎨 Arquitectura de UI

### Jerarquía de Componentes

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ÁRBOL DE COMPONENTES                            │
└─────────────────────────────────────────────────────────────────────┘

App (layout.tsx)
│
├─ ThemeProvider
│  │
│  └─ MainView
│     │
│     ├─ Navigation
│     │  ├─ Logo
│     │  ├─ LanguageSelector
│     │  ├─ NetworkSelector
│     │  └─ ConnectButton
│     │
│     ├─ WalletDashboard
│     │  ├─ BalanceCard
│     │  │  ├─ Balance
│     │  │  └─ Currency
│     │  │
│     │  ├─ NetworkInfo
│     │  │  ├─ ChainId
│     │  │  └─ NetworkName
│     │  │
│     │  └─ QuickActions
│     │     ├─ SendButton
│     │     ├─ ReceiveButton
│     │     └─ QRButton
│     │
│     ├─ SendTransaction
│     │  ├─ RecipientInput
│     │  │  └─ ContactSelector
│     │  │     └─ ContactList
│     │  │        └─ ContactCard[]
│     │  │
│     │  ├─ AmountInput
│     │  │  └─ QuickAmounts[]
│     │  │
│     │  ├─ SendButton
│     │  │
│     │  └─ SuccessDialog
│     │     ├─ TransactionHash
│     │     ├─ ExplorerLink
│     │     └─ StatusBadge
│     │
│     ├─ ReceivePayment
│     │  ├─ AmountInput
│     │  ├─ DescriptionInput
│     │  ├─ GenerateQRButton
│     │  └─ QRDisplay
│     │     ├─ QRCode
│     │     ├─ UserInfo
│     │     └─ ActionButtons
│     │
│     ├─ TransactionHistory
│     │  ├─ FilterBar
│     │  ├─ TransactionList
│     │  │  └─ TransactionCard[]
│     │  │     ├─ Icon
│     │  │     ├─ ContactName
│     │  │     ├─ Address
│     │  │     ├─ Amount
│     │  │     ├─ Date
│     │  │     ├─ StatusBadge
│     │  │     └─ ViewDetailsButton
│     │  │
│     │  └─ TransactionDetails (Dialog)
│     │     ├─ StatusCard
│     │     ├─ HashCard
│     │     ├─ AddressCards
│     │     │  ├─ FromCard
│     │     │  │  └─ ContactInfo
│     │     │  └─ ToCard
│     │     │     └─ ContactInfo
│     │     └─ MetadataCard
│     │
│     ├─ Contacts
│     │  ├─ SearchBar
│     │  ├─ AddButton
│     │  ├─ ContactList
│     │  │  └─ ContactCard[]
│     │  │     ├─ Avatar
│     │  │     ├─ Name
│     │  │     ├─ Address
│     │  │     ├─ Email
│     │  │     └─ Actions
│     │  │        ├─ SendButton
│     │  │        ├─ EditButton
│     │  │        └─ DeleteButton
│     │  │
│     │  ├─ AddContactDialog
│     │  │  ├─ NameInput
│     │  │  ├─ AddressInput
│     │  │  ├─ EmailInput
│     │  │  ├─ NoteInput
│     │  │  └─ SaveButton
│     │  │
│     │  └─ EditContactDialog
│     │     └─ (same as Add)
│     │
│     └─ BottomNavigation
│        ├─ HomeTab
│        ├─ SendTab
│        ├─ ReceiveTab
│        └─ ProfileTab
```


---

## 🔐 Flujo de Seguridad

### Validación y Sanitización

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PIPELINE DE SEGURIDAD                             │
└─────────────────────────────────────────────────────────────────────┘

User Input
    │
    ▼
┌─────────────────────┐
│ Client Validation   │
│ • Type checking     │
│ • Format validation │
│ • Length limits     │
└────┬────────────────┘
     │ ✅
     ▼
┌─────────────────────┐
│ Sanitization        │
│ • Trim whitespace   │
│ • Remove special    │
│ • Normalize         │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Schema Validation   │
│ (Zod)               │
│ • Type safety       │
│ • Business rules    │
└────┬────────────────┘
     │ ✅
     ▼
┌─────────────────────┐
│ Address Validation  │
│ • Checksum          │
│ • Format 0x[40hex]  │
│ • Not blacklisted   │
└────┬────────────────┘
     │ ✅
     ▼
┌─────────────────────┐
│ Amount Validation   │
│ • > 0               │
│ • <= balance        │
│ • Reasonable limit  │
└────┬────────────────┘
     │ ✅
     ▼
┌─────────────────────┐
│ MetaMask Signature  │
│ • User approval     │
│ • Private key sign  │
└────┬────────────────┘
     │ ✅
     ▼
┌─────────────────────┐
│ Blockchain          │
│ • Smart contract    │
│ • Consensus         │
└─────────────────────┘
```

---

## 📱 Responsive Breakpoints

### Diseño Adaptativo

```
┌─────────────────────────────────────────────────────────────────────┐
│                    RESPONSIVE DESIGN SYSTEM                          │
└─────────────────────────────────────────────────────────────────────┘

📱 MOBILE (< 640px)
┌──────────────────┐
│   Navigation     │
├──────────────────┤
│                  │
│   Card (full)    │
│                  │
├──────────────────┤
│   Card (full)    │
├──────────────────┤
│   Card (full)    │
├──────────────────┤
│                  │
│  Bottom Nav      │
└──────────────────┘
• 1 columna
• Stack vertical
• Touch-friendly
• Bottom navigation

📱 TABLET (640-1024px)
┌────────────────────────────┐
│      Navigation            │
├────────────────────────────┤
│           │                │
│  Card 1   │    Card 2      │
│           │                │
├────────────────────────────┤
│           │                │
│  Card 3   │    Card 4      │
│           │                │
└────────────────────────────┘
• 2 columnas
• Grid layout
• Sidebar opcional

💻 DESKTOP (1024-1536px)
┌──────────────────────────────────────┐
│         Navigation                   │
├────┬─────────────────────────────────┤
│    │        │        │               │
│ S  │ Card 1 │ Card 2 │   Card 3      │
│ i  │        │        │               │
│ d  ├────────┴────────┴───────────────┤
│ e  │        │        │               │
│ b  │ Card 4 │ Card 5 │   Card 6      │
│ a  │        │        │               │
│ r  │        │        │               │
└────┴────────┴────────┴───────────────┘
• 3-4 columnas
• Sidebar fijo
• Más información visible

🖥️ LARGE (> 1536px)
┌──────────────────────────────────────────────┐
│              Navigation                      │
├────┬─────────────────────────────────────────┤
│    │      │      │      │                    │
│ S  │ C1   │ C2   │ C3   │      C4            │
│ i  │      │      │      │                    │
│ d  ├──────┴──────┴──────┴────────────────────┤
│ e  │      │      │      │                    │
│ b  │ C5   │ C6   │ C7   │      C8            │
│ a  │      │      │      │                    │
│ r  │      │      │      │                    │
└────┴──────┴──────┴──────┴────────────────────┘
• 4-6 columnas
• Dashboard completo
• Máxima información
```


---

## 🚀 Performance Optimization

### Estrategias de Optimización

```
┌─────────────────────────────────────────────────────────────────────┐
│                    OPTIMIZATION PIPELINE                             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐
│   Initial Load      │
│   • HTML            │
│   • Critical CSS    │
│   • JS Bundle       │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│   Code Splitting    │
│   • Route-based     │
│   • Component-based │
│   • Lazy loading    │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│   Tree Shaking      │
│   • Remove unused   │
│   • Dead code elim. │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│   Minification      │
│   • Terser          │
│   • CSS minify      │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│   Compression       │
│   • Gzip            │
│   • Brotli          │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│   Caching           │
│   • Browser cache   │
│   • Service worker  │
│   • CDN             │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│   Runtime Opt.      │
│   • React.memo      │
│   • useMemo         │
│   • useCallback     │
│   • Debouncing      │
└─────────────────────┘
```

### Bundle Analysis

```
📦 Bundle Size Breakdown
┌─────────────────────────────────────┐
│                                     │
│  ████████████████████ 53.6 KB      │  chunks/fd9d1056
│  (React, Next.js core)              │
│                                     │
│  ████████████ 31.6 KB               │  chunks/117
│  (UI Components)                    │
│                                     │
│  ██ 1.87 KB                         │  Other chunks
│  (Utils, helpers)                   │
│                                     │
│  Total: 87.1 KB (shared)            │
│  + Page specific: ~89 KB            │
│  ─────────────────────────────────  │
│  Total First Load: ~176 KB          │
│                                     │
└─────────────────────────────────────┘
```

---

<div align="center">

## 🎉 Fin de la Documentación de Diagramas

**[⬆ Volver arriba](#-wasi---diagramas-de-arquitectura)**

Para más información, consulta:
- [README Principal](./README.md)
- [Documentación Técnica](./TECHNICAL_DOCS.md)

Desarrollado con 💜 por el equipo WASI

</div>
