"use client"

import { Card, CardContent } from "@/components/ui/card"
import { WifiOff } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { WalletDashboard } from "@/components/wallet-dashboard"
import { PaymentModule } from "@/components/payment-module"
import { EducationModule } from "@/components/education-module"
import { TransactionHistory } from "@/components/transaction-history"
import { OfflineMode } from "@/components/offline-mode"
import { CulturalGreeting } from "@/components/cultural-greeting"
import { FinancialGlossary } from "@/components/financial-glossary"
import { CommunityLeaders } from "@/components/community-leaders"
import { PaymentCeremonies } from "@/components/payment-ceremonies"
import { LocalMarketplace } from "@/components/local-marketplace"
import { UserQRCode } from "@/components/user-qr-code"
import { BackpackMode } from "@/components/backpack-mode"
import { LoansModule } from "@/components/loans-module"
import { Contacts } from "@/components/contacts"

interface MainViewProps {
  currentView: string
  isOnline: boolean
  userLevel: number
  userPoints: number
  currentLanguage: Language
  userName: string
  userPhone: string
  onPointsEarned: (points: number) => void
  onLevelUp: () => void
  showQR: boolean
  onCloseQR: () => void
  showGlossary: boolean
  onCloseGlossary: () => void
  showCommunity: boolean
  onCloseCommunity: () => void
  showCeremonies: boolean
  onCloseCeremonies: () => void
  showMarketplace: boolean
  onCloseMarketplace: () => void
  walletAddress?: string
  isMetaMaskLogin: boolean
  currency: string
  balance: number
  networkName: string
  onNetworkChange: () => void
}

export function MainView({
  currentView,
  isOnline,
  userLevel,
  userPoints,
  currentLanguage,
  userName,
  userPhone,
  onPointsEarned,
  onLevelUp,
  showQR,
  onCloseQR,
  showGlossary,
  onCloseGlossary,
  showCommunity,
  onCloseCommunity,
  showCeremonies,
  onCloseCeremonies,
  showMarketplace,
  onCloseMarketplace,
  walletAddress,
  isMetaMaskLogin,
  currency,
  balance,
  networkName,
  onNetworkChange,
}: MainViewProps) {
  const t = useTranslation(currentLanguage)

  const handlePurchase = () => {
    onPointsEarned(25)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "wallet":
        return isOnline ? (
          <WalletDashboard
            currentLanguage={currentLanguage}
            userName={userName}
            isMetaMaskLogin={isMetaMaskLogin}
            currency={currency}
            balance={balance}
            networkName={networkName}
            userLevel={userLevel}
            userPoints={userPoints}
            walletAddress={walletAddress}
            onNetworkChange={onNetworkChange}
          />
        ) : (
          <OfflineMode t={t} />
        )

      case "payments":
        return <PaymentModule isOnline={isOnline} t={t} currentLanguage={currentLanguage} currency={currency} walletAddress={walletAddress} isMetaMaskLogin={isMetaMaskLogin} onTransactionComplete={onNetworkChange} />

      case "education":
        return (
          <EducationModule
            userLevel={userLevel}
            userPoints={userPoints}
            onPointsEarned={onPointsEarned}
            onLevelUp={onLevelUp}
            t={t}
          />
        )

      case "history":
        return <TransactionHistory currentLanguage={currentLanguage} currency={currency} isMetaMaskLogin={isMetaMaskLogin} walletAddress={walletAddress} />

      case "backpack":
        return (
          <BackpackMode
            currentLanguage={currentLanguage}
            onSavingsChange={(amount) => {
              console.log("Savings change:", amount)
            }}
          />
        )

      case "contacts":
        return <Contacts currentLanguage={currentLanguage} onSendToContact={(address, name) => {
          // This will be handled by switching to payments view with pre-filled data
          console.log("Send to contact:", address, name)
        }} />

      case "loans":
        return <LoansModule currentLanguage={currentLanguage} currency={currency} />

      default:
        return (
          <WalletDashboard
            currentLanguage={currentLanguage}
            userName={userName}
            isMetaMaskLogin={isMetaMaskLogin}
            currency={currency}
            balance={balance}
            networkName={networkName}
            userLevel={userLevel}
            userPoints={userPoints}
            walletAddress={walletAddress}
            onNetworkChange={onNetworkChange}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 pb-20 md:pb-4">
      <div className="max-w-md mx-auto p-4">
        {/* Offline Alert */}
        {!isOnline && (
          <Card className="mb-4 border-orange-200 bg-orange-50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-orange-700">
                <WifiOff className="h-4 w-4" />
                <span className="text-sm">{t.offlineModeActive}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cultural Greeting */}
        <CulturalGreeting language={currentLanguage} userName={userName} />

        {/* Main Content */}
        <div className="space-y-4">{renderCurrentView()}</div>
      </div>

      {/* User QR Code Modal */}
      <UserQRCode
        currentLanguage={currentLanguage}
        userName={userName}
        userPhone={userPhone}
        isOpen={showQR}
        onClose={onCloseQR}
        currency={currency}
      />

      {/* Community Leaders Overlay */}
      {showCommunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-md mt-4 mb-20">
            <div className="sticky top-0 bg-white border-b p-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {currentLanguage === "qu"
                  ? "Llaqta Kamachiqkuna"
                  : currentLanguage === "ay"
                    ? "Marka Irpiri"
                    : currentLanguage === "cni"
                      ? "Kemisantsi Pinkatsari"
                      : currentLanguage === "agr"
                        ? "Aents Apu"
                        : "Líderes Comunitarios"}
              </h2>
              <button
                onClick={onCloseCommunity}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none h-8 w-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <CommunityLeaders language={currentLanguage} />
            </div>
          </div>
        </div>
      )}

      {/* Payment Ceremonies Overlay */}
      {showCeremonies && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-md mt-4 mb-20">
            <div className="sticky top-0 bg-white border-b p-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {currentLanguage === "qu"
                  ? "Raymikuna"
                  : currentLanguage === "ay"
                    ? "Anatanaka"
                    : currentLanguage === "cni"
                      ? "Ceremonias"
                      : currentLanguage === "agr"
                        ? "Ceremonias"
                        : "Ceremonias de Pago"}
              </h2>
              <button
                onClick={onCloseCeremonies}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none h-8 w-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <PaymentCeremonies language={currentLanguage} onCeremonyComplete={onPointsEarned} />
            </div>
          </div>
        </div>
      )}

      {/* Local Marketplace Overlay */}
      {showMarketplace && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-md mt-4 mb-20">
            <div className="sticky top-0 bg-white border-b p-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {currentLanguage === "qu"
                  ? "Llaqta Ranqana"
                  : currentLanguage === "ay"
                    ? "Marka Aljañ"
                    : currentLanguage === "cni"
                      ? "Kemisantsi Ranqana"
                      : currentLanguage === "agr"
                        ? "Aents Suruki"
                        : "Mercado Local"}
              </h2>
              <button
                onClick={onCloseMarketplace}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none h-8 w-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <LocalMarketplace language={currentLanguage} onPurchase={handlePurchase} />
            </div>
          </div>
        </div>
      )}

      {/* Financial Glossary */}
      <FinancialGlossary language={currentLanguage} isOpen={showGlossary} onClose={onCloseGlossary} />
    </div>
  )
}
