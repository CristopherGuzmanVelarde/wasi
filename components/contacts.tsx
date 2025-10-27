"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Plus,
  Trash2,
  Edit,
  Send,
  Copy,
  Check,
  Search,
  UserCircle,
  Mail,
  AlertCircle,
} from "lucide-react"
import { formatAddress } from "@/lib/metamask"
import { useTranslation, type Language } from "@/lib/i18n"

interface Contact {
  id: string
  name: string
  address: string
  email?: string
  note?: string
  createdAt: number
}

interface ContactsProps {
  currentLanguage: Language
  onSendToContact?: (address: string, name: string) => void
}

export function Contacts({ currentLanguage, onSendToContact }: ContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  // Form state
  const [formName, setFormName] = useState("")
  const [formAddress, setFormAddress] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formNote, setFormNote] = useState("")
  const [formError, setFormError] = useState("")

  const t = useTranslation(currentLanguage)

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

  const saveContacts = (newContacts: Contact[]) => {
    localStorage.setItem("wasi_contacts", JSON.stringify(newContacts))
    setContacts(newContacts)
  }

  const validateAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  const handleAddContact = () => {
    setFormError("")

    if (!formName.trim()) {
      setFormError(currentLanguage === "es" ? "El nombre es requerido" : "Name is required")
      return
    }

    if (!formAddress.trim()) {
      setFormError(currentLanguage === "es" ? "La dirección es requerida" : "Address is required")
      return
    }

    if (!validateAddress(formAddress)) {
      setFormError(
        currentLanguage === "es" ? "Dirección de Ethereum inválida" : "Invalid Ethereum address"
      )
      return
    }

    // Check for duplicate address
    if (contacts.some((c) => c.address.toLowerCase() === formAddress.toLowerCase())) {
      setFormError(
        currentLanguage === "es" ? "Esta dirección ya existe en tus contactos" : "This address already exists in your contacts"
      )
      return
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: formName.trim(),
      address: formAddress.trim(),
      email: formEmail.trim() || undefined,
      note: formNote.trim() || undefined,
      createdAt: Date.now(),
    }

    saveContacts([...contacts, newContact])
    resetForm()
    setShowAddDialog(false)
  }

  const handleEditContact = () => {
    if (!editingContact) return

    setFormError("")

    if (!formName.trim()) {
      setFormError(currentLanguage === "es" ? "El nombre es requerido" : "Name is required")
      return
    }

    if (!formAddress.trim()) {
      setFormError(currentLanguage === "es" ? "La dirección es requerida" : "Address is required")
      return
    }

    if (!validateAddress(formAddress)) {
      setFormError(
        currentLanguage === "es" ? "Dirección de Ethereum inválida" : "Invalid Ethereum address"
      )
      return
    }

    const updatedContacts = contacts.map((c) =>
      c.id === editingContact.id
        ? {
            ...c,
            name: formName.trim(),
            address: formAddress.trim(),
            email: formEmail.trim() || undefined,
            note: formNote.trim() || undefined,
          }
        : c
    )

    saveContacts(updatedContacts)
    resetForm()
    setShowEditDialog(false)
    setEditingContact(null)
  }

  const handleDeleteContact = (id: string) => {
    if (confirm(currentLanguage === "es" ? "¿Eliminar este contacto?" : "Delete this contact?")) {
      const updatedContacts = contacts.filter((c) => c.id !== id)
      saveContacts(updatedContacts)
    }
  }

  const openEditDialog = (contact: Contact) => {
    setEditingContact(contact)
    setFormName(contact.name)
    setFormAddress(contact.address)
    setFormEmail(contact.email || "")
    setFormNote(contact.note || "")
    setShowEditDialog(true)
  }

  const resetForm = () => {
    setFormName("")
    setFormAddress("")
    setFormEmail("")
    setFormNote("")
    setFormError("")
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase()
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.address.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query)
    )
  })

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {currentLanguage === "es" ? "Mis Contactos" : "My Contacts"}
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {contacts.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-100">
              {currentLanguage === "es"
                ? "Guarda direcciones para enviar pagos más rápido"
                : "Save addresses to send payments faster"}
            </p>
          </CardContent>
        </Card>

        {/* Search and Add */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={
                currentLanguage === "es" ? "Buscar contactos..." : "Search contacts..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => {
              resetForm()
              setShowAddDialog(true)
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            {currentLanguage === "es" ? "Nuevo" : "New"}
          </Button>
        </div>

        {/* Contacts List */}
        {filteredContacts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <UserCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">
                {searchQuery
                  ? currentLanguage === "es"
                    ? "No se encontraron contactos"
                    : "No contacts found"
                  : currentLanguage === "es"
                    ? "No tienes contactos guardados aún"
                    : "You don't have any saved contacts yet"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => {
                    resetForm()
                    setShowAddDialog(true)
                  }}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {currentLanguage === "es" ? "Agregar primer contacto" : "Add first contact"}
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserCircle className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          {contact.email && (
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Mail className="h-3 w-3" />
                              {contact.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                          {formatAddress(contact.address)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(contact.address, contact.id)}
                          className="h-7 w-7 p-0"
                        >
                          {copiedId === contact.id ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>

                      {contact.note && (
                        <p className="text-xs text-gray-600 mb-2 italic">{contact.note}</p>
                      )}

                      <div className="flex gap-2">
                        {onSendToContact && (
                          <Button
                            size="sm"
                            onClick={() => onSendToContact(contact.address, contact.name)}
                            className="bg-green-600 hover:bg-green-700 h-7 text-xs"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            {currentLanguage === "es" ? "Enviar" : "Send"}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(contact)}
                          className="h-7 text-xs"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          {currentLanguage === "es" ? "Editar" : "Edit"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteContact(contact.id)}
                          className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Contact Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md mx-4 w-[calc(100%-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Plus className="h-5 w-5" />
              {currentLanguage === "es" ? "Nuevo Contacto" : "New Contact"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">
                {currentLanguage === "es" ? "Nombre" : "Name"} *
              </Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder={
                  currentLanguage === "es" ? "Juan Pérez" : "John Doe"
                }
              />
            </div>

            <div>
              <Label htmlFor="address">
                {currentLanguage === "es" ? "Dirección Ethereum" : "Ethereum Address"} *
              </Label>
              <Input
                id="address"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
                placeholder="0x..."
                className="font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="email">
                {currentLanguage === "es" ? "Email (opcional)" : "Email (optional)"}
              </Label>
              <Input
                id="email"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="contact@example.com"
              />
            </div>

            <div>
              <Label htmlFor="note">
                {currentLanguage === "es" ? "Nota (opcional)" : "Note (optional)"}
              </Label>
              <Input
                id="note"
                value={formNote}
                onChange={(e) => setFormNote(e.target.value)}
                placeholder={
                  currentLanguage === "es" ? "Proveedor, amigo, familia..." : "Provider, friend, family..."
                }
              />
            </div>

            {formError && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-800">{formError}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              {currentLanguage === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button onClick={handleAddContact} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              {currentLanguage === "es" ? "Guardar Contacto" : "Save Contact"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Contact Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md mx-4 w-[calc(100%-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Edit className="h-5 w-5" />
              {currentLanguage === "es" ? "Editar Contacto" : "Edit Contact"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-name">
                {currentLanguage === "es" ? "Nombre" : "Name"} *
              </Label>
              <Input
                id="edit-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder={
                  currentLanguage === "es" ? "Juan Pérez" : "John Doe"
                }
              />
            </div>

            <div>
              <Label htmlFor="edit-address">
                {currentLanguage === "es" ? "Dirección Ethereum" : "Ethereum Address"} *
              </Label>
              <Input
                id="edit-address"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
                placeholder="0x..."
                className="font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="edit-email">
                {currentLanguage === "es" ? "Email (opcional)" : "Email (optional)"}
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="contact@example.com"
              />
            </div>

            <div>
              <Label htmlFor="edit-note">
                {currentLanguage === "es" ? "Nota (opcional)" : "Note (optional)"}
              </Label>
              <Input
                id="edit-note"
                value={formNote}
                onChange={(e) => setFormNote(e.target.value)}
                placeholder={
                  currentLanguage === "es" ? "Proveedor, amigo, familia..." : "Provider, friend, family..."
                }
              />
            </div>

            {formError && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-800">{formError}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false)
                setEditingContact(null)
                resetForm()
              }}
            >
              {currentLanguage === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button onClick={handleEditContact} className="bg-purple-600 hover:bg-purple-700">
              <Check className="h-4 w-4 mr-2" />
              {currentLanguage === "es" ? "Guardar Cambios" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
