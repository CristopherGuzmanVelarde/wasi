"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Calendar,
  Hash,
  Network,
} from "lucide-react"
import { getExplorerTransactionUrl, getExplorerAddressUrl, formatAddress, type Transaction } from "@/lib/metamask"
import type { Language } from "@/lib/i18n"

interface Contact {
  id: string
  name: string
  address: string
  email?: string
  note?: string
  createdAt: number
}

interface TransactionDetailsProps {
  transaction: Transaction | null
  open: boolean
  onClose: () => void
  currentLanguage: Language
}

export function TransactionDetails({ transaction, open, onClose, currentLanguage }: TransactionDetailsProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = () => {
    if (typeof window === "undefined") return

    const stored = localStorage.getItem("wasi_contacts")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setContacts(parsed)
      } catch (error) {
        console.error("Error loading contacts:", error)
      }
    }
  }

  const getContactName = (address: string): string | null => {
    const contact = contacts.find(
      (c) => c.address.toLowerCase() === address.toLowerCase()
    )
    return contact ? contact.name : null
  }

  const getContactInfo = (address: string): Contact | null => {
    return contacts.find(
      (c) => c.address.toLowerCase() === address.toLowerCase()
    ) || null
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const openExplorer = (type: "tx" | "address", value: string) => {
    if (!transaction) return

    const url =
      type === "tx"
        ? getExplorerTransactionUrl(transaction.chainId, value)
        : getExplorerAddressUrl(transaction.chainId, value)

    if (url) {
      window.open(url, "_blank")
    }
  }

  const getStatusBadge = (status: string) => {
    if (status === "confirmed") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          {currentLanguage === "es" ? "Confirmada" : "Confirmed"}
        </Badge>
      )
    } else if (status === "pending") {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          {currentLanguage === "es" ? "Pendiente" : "Pending"}
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          {currentLanguage === "es" ? "Fallida" : "Failed"}
        </Badge>
      )
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString(currentLanguage === "es" ? "es-PE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!transaction) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto mx-4 w-[calc(100%-2rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Hash className="h-5 w-5" />
            {currentLanguage === "es" ? "Detalles de Transacción" : "Transaction Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{currentLanguage === "es" ? "Estado" : "Status"}</p>
                  {getStatusBadge(transaction.status)}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">{currentLanguage === "es" ? "Cantidad" : "Amount"}</p>
                  <p className="text-2xl font-bold text-blue-600">{transaction.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Hash */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">
                  {currentLanguage === "es" ? "Hash de Transacción" : "Transaction Hash"}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(transaction.hash, "hash")}
                  className="h-8"
                >
                  {copied === "hash" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto break-all">{transaction.hash}</code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openExplorer("tx", transaction.hash)}
                className="w-full"
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                {currentLanguage === "es" ? "Ver en Explorer" : "View on Explorer"}
              </Button>
            </CardContent>
          </Card>

          {/* From & To */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-700">
                      {currentLanguage === "es" ? "De" : "From"}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction.from, "from")}
                      className="h-8"
                    >
                      {copied === "from" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  {getContactName(transaction.from) && (
                    <div className="mb-2 p-2 bg-purple-50 rounded border border-purple-200">
                      <p className="text-sm font-medium text-purple-900">{getContactName(transaction.from)}</p>
                      {getContactInfo(transaction.from)?.email && (
                        <p className="text-xs text-purple-700">{getContactInfo(transaction.from)?.email}</p>
                      )}
                    </div>
                  )}
                  <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto break-all">{transaction.from}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openExplorer("address", transaction.from)}
                    className="mt-1"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {currentLanguage === "es" ? "Ver dirección" : "View address"}
                  </Button>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-700">{currentLanguage === "es" ? "Para" : "To"}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction.to, "to")}
                      className="h-8"
                    >
                      {copied === "to" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  {getContactName(transaction.to) && (
                    <div className="mb-2 p-2 bg-purple-50 rounded border border-purple-200">
                      <p className="text-sm font-medium text-purple-900">{getContactName(transaction.to)}</p>
                      {getContactInfo(transaction.to)?.email && (
                        <p className="text-xs text-purple-700">{getContactInfo(transaction.to)?.email}</p>
                      )}
                    </div>
                  )}
                  <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto break-all">{transaction.to}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openExplorer("address", transaction.to)}
                    className="mt-1"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {currentLanguage === "es" ? "Ver dirección" : "View address"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{currentLanguage === "es" ? "Red" : "Network"}</p>
                </div>
                <p className="text-sm font-semibold">{transaction.networkName}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{currentLanguage === "es" ? "Fecha" : "Date"}</p>
                </div>
                <p className="text-sm font-semibold">{formatDate(transaction.timestamp)}</p>
              </div>

              {transaction.blockNumber && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{currentLanguage === "es" ? "Bloque" : "Block"}</p>
                  </div>
                  <p className="text-sm font-semibold">{Number.parseInt(transaction.blockNumber, 16)}</p>
                </div>
              )}

              {transaction.gasUsed && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{currentLanguage === "es" ? "Gas Usado" : "Gas Used"}</p>
                  <p className="text-sm font-semibold">{Number.parseInt(transaction.gasUsed, 16)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Close Button */}
          <Button onClick={onClose} className="w-full">
            {currentLanguage === "es" ? "Cerrar" : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
