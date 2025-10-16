"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { MainView } from "@/components/main-view"
import { Login } from "@/components/login"
import { LandingPage } from "@/components/landing-page"
import { getCurrentNetwork, getBalance, setupMetaMaskListeners, removeMetaMaskListeners } from "@/lib/metamask"
import type { Language } from "@/lib/i18n"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLanding, setShowLanding] = useState(true)
  const [isInitializing, setIsInitializing] = useState(true)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [currentView, setCurrentView] = useState("wallet")
  const [currentLanguage, setCurrentLanguage] = useState<Language>("es")
  const [isOnline, setIsOnline] = useState(true)
  const [userLevel, setUserLevel] = useState(1)
  const [userPoints, setUserPoints] = useState(0)
  const [userName, setUserName] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [walletAddress, setWalletAddress] = useState<string>()
  const [isMetaMaskLogin, setIsMetaMaskLogin] = useState(false)
  const [currency, setCurrency] = useState("S/")
  const [balance, setBalance] = useState(1250.75)
  const [networkName, setNetworkName] = useState("BCRP Digital")

  // Overlay states - TODOS INICIAN EN FALSE
  const [showQR, setShowQR] = useState(false)
  const [showGlossary, setShowGlossary] = useState(false)
  const [showCommunity, setShowCommunity] = useState(false)
  const [showCeremonies, setShowCeremonies] = useState(false)
  const [showMarketplace, setShowMarketplace] = useState(false)

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn")
    
    // Si NO hay sesión activa, SIEMPRE mostrar landing page primero
    if (savedLogin !== "true") {
      setShowLanding(true)
      setIsLoggedIn(false)
      setIsInitializing(false)
      return
    }
    
    // Si hay sesión activa, no mostrar landing y restaurar sesión
    setShowLanding(false)
    
    const savedIsMetaMask = localStorage.getItem("isMetaMaskLogin")
    const savedWalletAddress = localStorage.getItem("walletAddress")
    const savedUserName = localStorage.getItem("userName")
    const savedUserPhone = localStorage.getItem("userPhone")

    setIsLoggedIn(true)
    if (savedUserName) setUserName(savedUserName)
    if (savedUserPhone) setUserPhone(savedUserPhone)

    if (savedIsMetaMask === "true" && savedWalletAddress) {
      setIsMetaMaskLogin(true)
      setWalletAddress(savedWalletAddress)
      loadMetaMaskData(savedWalletAddress)

      // Setup MetaMask listeners for network/account changes
      setupMetaMaskListeners({
        onAccountsChanged: (accounts) => {
          if (accounts.length === 0) {
            handleLogout()
          } else if (accounts[0] !== savedWalletAddress) {
            setWalletAddress(accounts[0])
            localStorage.setItem("walletAddress", accounts[0])
            loadMetaMaskData(accounts[0])
          }
        },
        onChainChanged: () => {
          if (savedWalletAddress) {
            loadMetaMaskData(savedWalletAddress)
          }
        },
      })
    } else {
      setCurrency("S/")
      setBalance(1250.75)
      setNetworkName("BCRP Digital")
    }
    
    setIsInitializing(false)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      removeMetaMaskListeners()
    }
  }, [])

  const loadMetaMaskData = async (address: string) => {
    try {
      const networkResult = await getCurrentNetwork()
      const balanceResult = await getBalance(address)

      if (networkResult.success) {
        setCurrency(networkResult.currency)
        setNetworkName(networkResult.networkName)
      }

      if (balanceResult.success) {
        setBalance(Number.parseFloat(balanceResult.balance))
      }
    } catch (error) {
      console.error("Error loading MetaMask data:", error)
    }
  }

  const handleLogin = (name: string, phone: string, address?: string) => {
    setUserName(name)
    setUserPhone(phone)
    setIsLoggedIn(true)

    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userName", name)
    localStorage.setItem("userPhone", phone)

    if (address) {
      setWalletAddress(address)
      setIsMetaMaskLogin(true)
      localStorage.setItem("isMetaMaskLogin", "true")
      localStorage.setItem("walletAddress", address)
      loadMetaMaskData(address)

      // Setup listeners when logging in with MetaMask
      setupMetaMaskListeners({
        onAccountsChanged: (accounts) => {
          if (accounts.length === 0) {
            handleLogout()
          } else if (accounts[0] !== address) {
            setWalletAddress(accounts[0])
            localStorage.setItem("walletAddress", accounts[0])
            loadMetaMaskData(accounts[0])
          }
        },
        onChainChanged: () => {
          loadMetaMaskData(address)
        },
      })
    } else {
      setIsMetaMaskLogin(false)
      setCurrency("S/")
      setBalance(1250.75)
      setNetworkName("BCRP Digital")
      localStorage.setItem("isMetaMaskLogin", "false")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
    setUserPhone("")
    setWalletAddress(undefined)
    setIsMetaMaskLogin(false)
    setCurrency("S/")
    setBalance(1250.75)
    setNetworkName("BCRP Digital")
    setCurrentView("wallet")

    // Cerrar todos los modales
    setShowQR(false)
    setShowGlossary(false)
    setShowCommunity(false)
    setShowCeremonies(false)
    setShowMarketplace(false)

    // Limpiar localStorage
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userName")
    localStorage.removeItem("userPhone")
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("isMetaMaskLogin")

    removeMetaMaskListeners()
    
    // Volver a mostrar landing page después de logout
    setShowLanding(true)
  }

  const handlePointsEarned = (points: number) => {
    setUserPoints((prev) => {
      const newPoints = prev + points
      if (Math.floor(newPoints / 100) > userLevel - 1) {
        handleLevelUp()
      }
      return newPoints
    })
  }

  const handleLevelUp = () => {
    setUserLevel((prev) => prev + 1)
  }

  const handleGetStarted = () => {
    setShowLanding(false)
    if (showAboutModal) {
      setShowAboutModal(false)
    }
  }

  const handleShowAbout = () => {
    setShowAboutModal(true)
  }

  const handleCloseAbout = () => {
    setShowAboutModal(false)
  }

  // Mostrar spinner de carga mientras se inicializa
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
          <p className="text-gray-600">Cargando WASI...</p>
        </div>
      </div>
    )
  }

  // Primera prioridad: Mostrar Landing Page si no ha visitado
  if (showLanding) {
    return (
      <LandingPage
        onGetStarted={handleGetStarted}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
    )
  }

  // Segunda prioridad: Mostrar Login si no está logueado
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
  }

  return (
    <>
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        isOnline={isOnline}
        userPoints={userPoints}
        userName={userName}
        currentLanguage={currentLanguage}
        onLogout={handleLogout}
        onShowQR={() => setShowQR(true)}
        onShowCommunity={() => setShowCommunity(true)}
        onShowMarketplace={() => setShowMarketplace(true)}
        onShowCeremonies={() => setShowCeremonies(true)}
        onShowGlossary={() => setShowGlossary(true)}
        onShowSecurity={() => setShowGlossary(true)}
        onShowAbout={handleShowAbout}
      />

      <MainView
        currentView={currentView}
        isOnline={isOnline}
        userLevel={userLevel}
        userPoints={userPoints}
        currentLanguage={currentLanguage}
        userName={userName}
        userPhone={userPhone}
        onPointsEarned={handlePointsEarned}
        onLevelUp={handleLevelUp}
        showQR={showQR}
        onCloseQR={() => setShowQR(false)}
        showGlossary={showGlossary}
        onCloseGlossary={() => setShowGlossary(false)}
        showCommunity={showCommunity}
        onCloseCommunity={() => setShowCommunity(false)}
        showCeremonies={showCeremonies}
        onCloseCeremonies={() => setShowCeremonies(false)}
        showMarketplace={showMarketplace}
        onCloseMarketplace={() => setShowMarketplace(false)}
        walletAddress={walletAddress}
        isMetaMaskLogin={isMetaMaskLogin}
        currency={currency}
        balance={balance}
        networkName={networkName}
        onNetworkChange={() => walletAddress && loadMetaMaskData(walletAddress)}
      />

      {showAboutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <LandingPage
            onGetStarted={handleGetStarted}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            showCloseButton={true}
            onClose={handleCloseAbout}
          />
        </div>
      )}
    </>
  )
}
