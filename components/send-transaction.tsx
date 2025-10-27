"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Send, ExternalLink, CheckCircle, AlertCircle, Loader2, Copy, Check, UserCircle } from "lucide-react"
import {
  sendTransaction,
  ethToWei,
  getTransactionReceipt,
  getCurrentNetwork,
  saveTransaction,
  updateTransactionStatus,
  getExplorerTransactionUrl,
  formatAddress,
  type Transaction,
} from "@/lib/metamask"
import type { Language } from "@/lib/i18n"

interface Contact {
  id: string
  name: string
  address: string
  email?: string
  note?: string
  createdAt: number
}

interface SendTransactionProps {
  currentLanguage: Language
  walletAddress: string
  currency: string
  onTransactionComplete?: () => void
}

export function SendTransaction({
  currentLanguage,
  walletAddress,
  currency,
  onTransactionComplete,
}: SendTransactionProps) {
  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [txStatus, setTxStatus] = useState<"pending" | "confirmed" | "failed" | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [copied, setCopied] = useState(false)
  const [chainId, setChainId] = useState<string>("")
  const [networkName, setNetworkName] = useState<string>("")
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showContactsDialog, setShowContactsDialog] = useState(false)
  const [selectedContactName, setSelectedContactName] = useState<string>("")

  const handleSend = async () => {
    if (!recipientAddress || !amount) {
      setError(currentLanguage === "es" ? "Por favor completa todos los campos" : "Please fill all fields")
      return
    }

    // Validate Ethereum address
    if (!recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError(
        currentLanguage === "es" ? "Dirección de Ethereum inválida" : "Invalid Ethereum address"
      )
      return
    }

    setSending(true)
    setError(null)
    setTxHash(null)
    setTxStatus(null)

    try {
      // Get current network
      const networkResult = await getCurrentNetwork()
      if (!networkResult.success) {
        throw new Error("Failed to get network information")
      }

      setChainId(networkResult.chainId)
      setNetworkName(networkResult.networkName)

      // Convert amount to wei
      const valueInWei = ethToWei(amount)

      // Send transaction
      const result = await sendTransaction({
        from: walletAddress,
        to: recipientAddress,
        value: valueInWei,
      })

      if (!result.success || !result.hash) {
        throw new Error(result.error || "Transaction failed")
      }

      setTxHash(result.hash)
      setTxStatus("pending")

      // Save transaction to history
      const transaction: Transaction = {
        hash: result.hash,
        from: walletAddress,
        to: recipientAddress,
        value: amount,
        timestamp: Date.now(),
        chainId: networkResult.chainId,
        networkName: networkResult.networkName,
        status: "pending",
      }

      saveTransaction(transaction)
      setShowSuccessDialog(true)

      // Wait for confirmation
      checkTransactionStatus(result.hash, networkResult.chainId)

      // Clear form
      setRecipientAddress("")
      setAmount("")
      setSelectedContactName("")
    } catch (err: any) {
      setError(err.message || "Transaction failed")
      setTxStatus("failed")
    } finally {
      setSending(false)
    }
  }

  const checkTransactionStatus = async (hash: string, chainId: string) => {
    let attempts = 0
    const maxAttempts = 60 // 5 minutes max

    const interval = setInterval(async () => {
      attempts++

      try {
        const receipt = await getTransactionReceipt(hash)

        if (receipt) {
          const status = receipt.status === "0x1" ? "confirmed" : "failed"
          setTxStatus(status)
          updateTransactionStatus(hash, chainId, status, receipt)
          clearInterval(interval)
          onTransactionComplete?.()
        }

        if (attempts >= maxAttempts) {
          clearInterval(interval)
        }
      } catch (error) {
        console.error("Error checking transaction status:", error)
      }
    }, 5000) // Check every 5 seconds
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openExplorer = () => {
    if (txHash && chainId) {
      const url = getExplorerTransactionUrl(chainId, txHash)
      if (url) {
        window.open(url, "_blank")
      }
    }
  }

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

  const handleSelectContact = (contact: Contact) => {
    setRecipientAddress(contact.address)
    setSelectedContactName(contact.name)
    setShowContactsDialog(false)
  }

  const quickAmounts = ["0.001", "0.01", "0.05", "0.1"]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Send className="h-5 w-5" />
            {currentLanguage === "es" ? "Enviar Criptomonedas" : "Send Cryptocurrency"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="recipient">
                {currentLanguage === "es" ? "Dirección del Destinatario" : "Recipient Address"}
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  loadContacts()
                  setShowContactsDialog(true)
                }}
                className="h-7 text-xs text-purple-600 hover:text-purple-700"
              >
                <UserCircle className="h-3 w-3 mr-1" />
                {currentLanguage === "es" ? "Contactos" : "Contacts"}
              </Button>
            </div>
            <Input
              id="recipient"
              value={recipientAddress}
              onChange={(e) => {
                setRecipientAddress(e.target.value)
                setSelectedContactName("")
              }}
              placeholder="0x..."
              disabled={sending}
            />
            {selectedContactName && (
              <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                <UserCircle className="h-3 w-3" />
                {selectedContactName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="amount">
              {currentLanguage === "es" ? "Cantidad" : "Amount"} ({currency})
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              disabled={sending}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                onClick={() => setAmount(quickAmount)}
                disabled={sending}
                className="text-xs"
              >
                {quickAmount}
              </Button>
            ))}
          </div>

          {error && (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {txHash && !showSuccessDialog && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center gap-2">
                  {txStatus === "pending" && <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />}
                  {txStatus === "confirmed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {txStatus === "failed" && <AlertCircle className="h-4 w-4 text-red-600" />}
                  <p className="text-sm font-medium">
                    {txStatus === "pending" &&
                      (currentLanguage === "es" ? "Transacción Pendiente" : "Transaction Pending")}
                    {txStatus === "confirmed" &&
                      (currentLanguage === "es" ? "Transacción Confirmada" : "Transaction Confirmed")}
                    {txStatus === "failed" &&
                      (currentLanguage === "es" ? "Transacción Fallida" : "Transaction Failed")}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 truncate flex-1">{txHash}</p>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(txHash)}>
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Button onClick={handleSend} disabled={sending} className="w-full bg-blue-600 hover:bg-blue-700">
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {currentLanguage === "es" ? "Enviando..." : "Sending..."}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {currentLanguage === "es" ? "Enviar Transacción" : "Send Transaction"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              {currentLanguage === "es" ? "¡Transacción Enviada!" : "Transaction Sent!"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">
                    {currentLanguage === "es" ? "Hash de Transacción" : "Transaction Hash"}
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-white p-2 rounded border flex-1 overflow-x-auto break-all">
                      {txHash}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => txHash && copyToClipboard(txHash)}
                      className="shrink-0"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1 font-medium">
                      {currentLanguage === "es" ? "Cantidad" : "Amount"}
                    </p>
                    <p className="font-semibold text-sm">
                      {amount} {currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1 font-medium">
                      {currentLanguage === "es" ? "Red" : "Network"}
                    </p>
                    <p className="font-semibold text-sm break-words">{networkName}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">
                    {currentLanguage === "es" ? "Estado" : "Status"}
                  </p>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {txStatus === "pending" && (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        {currentLanguage === "es" ? "Confirmando..." : "Confirming..."}
                      </>
                    )}
                    {txStatus === "confirmed" && (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {currentLanguage === "es" ? "Confirmada" : "Confirmed"}
                      </>
                    )}
                    {txStatus === "failed" && (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {currentLanguage === "es" ? "Fallida" : "Failed"}
                      </>
                    )}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Button onClick={openExplorer} variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              {currentLanguage === "es" ? "Ver en Block Explorer" : "View on Block Explorer"}
            </Button>

            <Button onClick={() => setShowSuccessDialog(false)} className="w-full bg-green-600 hover:bg-green-700">
              {currentLanguage === "es" ? "Cerrar" : "Close"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contacts Selector Dialog */}
      <Dialog open={showContactsDialog} onOpenChange={setShowContactsDialog}>
        <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <UserCircle className="h-6 w-6 text-purple-600" />
              {currentLanguage === "es" ? "Seleccionar Contacto" : "Select Contact"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            {contacts.length === 0 ? (
              <Card className="bg-gray-50">
                <CardContent className="p-6 text-center">
                  <UserCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    {currentLanguage === "es"
                      ? "No tienes contactos guardados aún"
                      : "You don't have any saved contacts yet"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              contacts.map((contact) => (
                <Card
                  key={contact.id}
                  className="cursor-pointer hover:shadow-md transition-all hover:border-purple-300"
                  onClick={() => handleSelectContact(contact)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm">{contact.name}</h3>
                        <code className="text-xs bg-gray-100 px-2 py-0.5 rounded block truncate mt-1">
                          {formatAddress(contact.address)}
                        </code>
                        {contact.note && (
                          <p className="text-xs text-gray-600 mt-1 italic">{contact.note}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => setShowContactsDialog(false)}
              className="w-full"
            >
              {currentLanguage === "es" ? "Cancelar" : "Cancel"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
