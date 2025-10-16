"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle, XCircle, Eye } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { getTransactionHistory, getCurrentNetwork, formatAddress, type Transaction } from "@/lib/metamask"
import { TransactionDetails } from "@/components/transaction-details"

interface TransactionHistoryProps {
  currentLanguage: Language
  currency: string
  isMetaMaskLogin?: boolean
  walletAddress?: string
}

interface MockTransaction {
  id: string
  type: string
  amount: number
  from?: string
  to?: string
  date: string
  time: string
  status: string
  concept: string
}

export function TransactionHistory({ currentLanguage, currency, isMetaMaskLogin, walletAddress }: TransactionHistoryProps) {
  const t = useTranslation(currentLanguage)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentChainId, setCurrentChainId] = useState<string>("")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (isMetaMaskLogin) {
      loadTransactions()
    }
  }, [isMetaMaskLogin])

  const loadTransactions = async () => {
    const networkResult = await getCurrentNetwork()
    if (networkResult.success) {
      setCurrentChainId(networkResult.chainId)
      const txHistory = getTransactionHistory(networkResult.chainId)
      setTransactions(txHistory)
    }
  }

  const handleViewDetails = (tx: Transaction) => {
    setSelectedTransaction(tx)
    setShowDetails(true)
  }

  // Mock transactions for non-MetaMask users
  const mockTransactions: MockTransaction[] = [
    {
      id: "1",
      type: "received",
      amount: currency === "S/" ? 150.0 : 0.05,
      from: "María García",
      date: "2024-01-15",
      time: "14:30",
      status: "completed",
      concept: "Pago por servicios",
    },
    {
      id: "2",
      type: "sent",
      amount: currency === "S/" ? 50.0 : 0.02,
      to: "Juan Pérez",
      date: "2024-01-14",
      time: "10:15",
      status: "completed",
      concept: "Compra de productos",
    },
    {
      id: "3",
      type: "received",
      amount: currency === "S/" ? 380.0 : 0.12,
      from: "Gobierno - Bono Yanapay",
      date: "2024-01-13",
      time: "08:00",
      status: "completed",
      concept: "Subsidio familiar",
    },
    {
      id: "4",
      type: "sent",
      amount: currency === "S/" ? 25.0 : 0.01,
      to: "Tienda El Sol",
      date: "2024-01-12",
      time: "16:45",
      status: "pending",
      concept: "Compra local",
    },
  ]

  const getStatusBadge = (status: string) => {
    if (status === "completed" || status === "confirmed") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
          <CheckCircle className="h-3 w-3 mr-1" />
          {currentLanguage === "qu"
            ? "Tukusqa"
            : currentLanguage === "ay"
              ? "Tukuyata"
              : currentLanguage === "cni"
                ? "Tukusqa"
                : currentLanguage === "agr"
                  ? "Tukurina"
                  : "Completado"}
        </Badge>
      )
    } else if (status === "pending") {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
          <Clock className="h-3 w-3 mr-1" />
          {currentLanguage === "qu"
            ? "Suyaspa"
            : currentLanguage === "ay"
              ? "Suyt'asa"
              : currentLanguage === "cni"
                ? "Suyaspa"
                : currentLanguage === "agr"
                  ? "Nakumasa"
                  : "Confirmando"}
        </Badge>
      )
    } else if (status === "failed") {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
          <XCircle className="h-3 w-3 mr-1" />
          {currentLanguage === "qu"
            ? "Mana atisqa"
            : currentLanguage === "ay"
              ? "Jani atita"
              : currentLanguage === "cni"
                ? "Mana atisqa"
                : currentLanguage === "agr"
                  ? "Atsa atina"
                  : "Fallido"}
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-xs">
          <Clock className="h-3 w-3 mr-1" />
          {status}
        </Badge>
      )
    }
  }

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardHeader>
            <CardTitle className="text-base">
              {currentLanguage === "qu"
                ? "Rurasqaykuna"
                : currentLanguage === "ay"
                  ? "Luratawakunapa"
                  : currentLanguage === "cni"
                    ? "Rurasqaykuna"
                    : currentLanguage === "agr"
                      ? "Najatairamu"
                      : "Historial de Transacciones"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-100">
              {isMetaMaskLogin
                ? currentLanguage === "es"
                  ? `Transacciones filtradas por la red actual: ${currentChainId}`
                  : `Transactions filtered by current network: ${currentChainId}`
                : currentLanguage === "qu"
                  ? "Tukuy qullqi rurasqaykita kay-pi rikuy"
                  : currentLanguage === "ay"
                    ? "Taqi qullqi luratawakunama akan uñjaña"
                    : currentLanguage === "cni"
                      ? "Tukuy patsani rurasqaykita kay-pi rikuy"
                      : currentLanguage === "agr"
                        ? "Ashí kuichik najatairamuka ju-niaiti"
                        : "Revisa todas tus operaciones"}
            </p>
            <div className="mt-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {currentLanguage === "es" ? "Moneda:" : "Currency:"} {currency}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        {isMetaMaskLogin ? (
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">
                    {currentLanguage === "es"
                      ? "No hay transacciones en esta red aún"
                      : "No transactions on this network yet"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              transactions.map((transaction) => (
                <Card key={transaction.hash} className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <ArrowUpRight className="h-5 w-5 text-blue-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-800 truncate">
                              {currentLanguage === "es" ? "Para:" : "To:"} {formatAddress(transaction.to)}
                            </p>
                            <p className="text-xs text-gray-500">{transaction.networkName}</p>
                          </div>
                          <div className="text-right ml-2">
                            <p className="font-bold text-sm text-blue-600">
                              -{transaction.value} {currency}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500 truncate flex-1">
                            {new Date(transaction.timestamp).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(transaction.status)}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(transaction)}
                              className="h-7 w-7 p-0"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${transaction.type === "received" ? "bg-green-100" : "bg-red-100"}`}
                    >
                      {transaction.type === "received" ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-medium text-sm text-gray-800">
                            {transaction.type === "received" ? transaction.from : transaction.to}
                          </p>
                          <p className="text-xs text-gray-500">{transaction.concept}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold text-sm ${
                              transaction.type === "received" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.type === "received" ? "+" : "-"}
                            {currency} {transaction.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">
                          {transaction.date} • {transaction.time}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Card */}
        {!isMetaMaskLogin && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">
                    {currentLanguage === "qu"
                      ? "Tukuy chaskisqa"
                      : currentLanguage === "ay"
                        ? "Taqi katxaruta"
                        : currentLanguage === "cni"
                          ? "Tukuy chaskisqa"
                          : currentLanguage === "agr"
                            ? "Ashí achiktina"
                            : "Total recibido"}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    +{currency} {currency === "S/" ? "530.00" : "0.17"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">
                    {currentLanguage === "qu"
                      ? "Tukuy apachisqa"
                      : currentLanguage === "ay"
                        ? "Taqi apayata"
                        : currentLanguage === "cni"
                          ? "Tukuy apachisqa"
                          : currentLanguage === "agr"
                            ? "Ashí susatina"
                            : "Total enviado"}
                  </p>
                  <p className="text-lg font-bold text-red-600">
                    -{currency} {currency === "S/" ? "75.00" : "0.03"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetails
        transaction={selectedTransaction}
        open={showDetails}
        onClose={() => setShowDetails(false)}
        currentLanguage={currentLanguage}
      />
    </>
  )
}
