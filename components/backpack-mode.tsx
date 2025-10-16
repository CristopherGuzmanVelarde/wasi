"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Backpack,
  Target,
  PiggyBank,
  Plus,
  Minus,
  TrendingUp,
  Calendar,
  Home,
  GraduationCap,
  Heart,
  Smartphone,
  X,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface BackpackModeProps {
  currentLanguage: Language
  onSavingsChange: (amount: number) => void
}

export function BackpackMode({ currentLanguage, onSavingsChange }: BackpackModeProps) {
  const t = useTranslation(currentLanguage)
  const [showNewGoal, setShowNewGoal] = useState(false)
  const [newGoalName, setNewGoalName] = useState("")
  const [newGoalAmount, setNewGoalAmount] = useState("")
  const [selectedGoalType, setSelectedGoalType] = useState("general")

  const [savingsGoals, setSavingsGoals] = useState([
    {
      id: "goal1",
      name:
        currentLanguage === "qu"
          ? "Wasi rantiy"
          : currentLanguage === "ay"
            ? "Uta aljañ"
            : currentLanguage === "cni"
              ? "Wasi rantiy"
              : currentLanguage === "agr"
                ? "Jea suruki"
                : "Casa propia",
      targetAmount: 15000,
      currentAmount: 3250,
      type: "home",
      monthlyContribution: 200,
      estimatedMonths: 59,
      color: "from-green-500 to-green-600",
    },
    {
      id: "goal2",
      name:
        currentLanguage === "qu"
          ? "Yachay wasi"
          : currentLanguage === "ay"
            ? "Yatiqañ uta"
            : currentLanguage === "cni"
              ? "Yachay wasi"
              : currentLanguage === "agr"
                ? "Unuimatin jea"
                : "Educación hijos",
      targetAmount: 5000,
      currentAmount: 1800,
      type: "education",
      monthlyContribution: 150,
      estimatedMonths: 21,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "goal3",
      name:
        currentLanguage === "qu"
          ? "Emergencia"
          : currentLanguage === "ay"
            ? "Jank'ak"
            : currentLanguage === "cni"
              ? "Emergencia"
              : currentLanguage === "agr"
                ? "Jank'ak"
                : "Fondo emergencia",
      targetAmount: 2000,
      currentAmount: 850,
      type: "emergency",
      monthlyContribution: 100,
      estimatedMonths: 12,
      color: "from-red-500 to-red-600",
    },
  ])

  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const overallProgress = (totalSavings / totalTarget) * 100

  const goalTypes = [
    { id: "home", name: "Casa", icon: Home, color: "text-green-600" },
    { id: "education", name: "Educación", icon: GraduationCap, color: "text-blue-600" },
    { id: "emergency", name: "Emergencia", icon: Heart, color: "text-red-600" },
    { id: "technology", name: "Tecnología", icon: Smartphone, color: "text-purple-600" },
    { id: "general", name: "General", icon: Target, color: "text-gray-600" },
  ]

  const addToGoal = (goalId: string, amount: number) => {
    setSavingsGoals((goals) =>
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
          : goal,
      ),
    )
    onSavingsChange(-amount) // Restar del balance principal
  }

  const withdrawFromGoal = (goalId: string, amount: number) => {
    setSavingsGoals((goals) =>
      goals.map((goal) =>
        goal.id === goalId ? { ...goal, currentAmount: Math.max(goal.currentAmount - amount, 0) } : goal,
      ),
    )
    onSavingsChange(amount) // Sumar al balance principal
  }

  const createNewGoal = () => {
    if (!newGoalName || !newGoalAmount) return

    const newGoal = {
      id: `goal${Date.now()}`,
      name: newGoalName,
      targetAmount: Number.parseFloat(newGoalAmount),
      currentAmount: 0,
      type: selectedGoalType,
      monthlyContribution: 0,
      estimatedMonths: 0,
      color:
        goalTypes
          .find((t) => t.id === selectedGoalType)
          ?.color.replace("text-", "from-")
          .replace("-600", "-500 to-") +
          selectedGoalType +
          "-600" || "from-gray-500 to-gray-600",
    }

    setSavingsGoals([...savingsGoals, newGoal])
    setShowNewGoal(false)
    setNewGoalName("")
    setNewGoalAmount("")
    setSelectedGoalType("general")
  }

  const getBackpackTitle = () => {
    switch (currentLanguage) {
      case "qu":
        return "Qullqi Mochila"
      case "ay":
        return "Qullqi Mochila"
      case "cni":
        return "Patsani Mochila"
      case "agr":
        return "Kuichik Mochila"
      default:
        return "Modo Mochila"
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Backpack className="h-5 w-5" />
            {getBackpackTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-100 mb-4">
            {currentLanguage === "qu"
              ? "Qullqiykita waqaychay, metaykikunata hunt'ay"
              : currentLanguage === "ay"
                ? "Qullqim imaña, metanakam phuqhaña"
                : currentLanguage === "cni"
                  ? "Patsaniykita waqaychay, metaykikunata hunt'ay"
                  : currentLanguage === "agr"
                    ? "Kuichikmin ipiatin, metamin najantin"
                    : "Guarda tu dinero y cumple tus metas de ahorro"}
          </p>

          <div className="bg-purple-500/30 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">{currentLanguage === "qu" ? "Tukuy waqaychasqa" : "Total ahorrado"}</span>
              <span className="font-bold">S/ {totalSavings.toFixed(2)}</span>
            </div>
            <Progress value={overallProgress} className="h-2 bg-purple-400" />
            <p className="text-xs text-purple-100 mt-1">
              {overallProgress.toFixed(1)}% de S/ {totalTarget.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Savings Goals */}
      <div className="space-y-3">
        {savingsGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100
          const GoalIcon = goalTypes.find((t) => t.id === goal.type)?.icon || Target

          return (
            <Card key={goal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${goal.color}`}>
                    <GoalIcon className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{goal.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {progress >= 100 ? "¡Completado!" : `${progress.toFixed(0)}%`}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>S/ {goal.currentAmount.toFixed(2)}</span>
                        <span>S/ {goal.targetAmount.toFixed(2)}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-gray-500">
                        <p>Faltan: S/ {(goal.targetAmount - goal.currentAmount).toFixed(2)}</p>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => withdrawFromGoal(goal.id, 50)}
                          disabled={goal.currentAmount < 50}
                          className="h-7 w-7 p-0 bg-transparent"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => addToGoal(goal.id, 50)}
                          disabled={progress >= 100}
                          className="h-7 px-3 text-xs"
                        >
                          +S/50
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => addToGoal(goal.id, 100)}
                          disabled={progress >= 100}
                          className="h-7 px-3 text-xs"
                        >
                          +S/100
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add New Goal */}
      <Card>
        <CardContent className="p-4">
          {!showNewGoal ? (
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowNewGoal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {currentLanguage === "qu" ? "Musuq meta" : "Nueva meta de ahorro"}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Nueva Meta</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowNewGoal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <Label htmlFor="goal-name" className="text-sm">
                  Nombre de la meta
                </Label>
                <Input
                  id="goal-name"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  placeholder="Ej: Vacaciones familiares"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="goal-amount" className="text-sm">
                  Monto objetivo (S/)
                </Label>
                <Input
                  id="goal-amount"
                  type="number"
                  value={newGoalAmount}
                  onChange={(e) => setNewGoalAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Tipo de meta</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {goalTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedGoalType === type.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedGoalType(type.id)}
                      className="flex flex-col gap-1 h-auto py-2 text-xs bg-transparent"
                    >
                      <type.icon className="h-4 w-4" />
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={createNewGoal} className="w-full">
                Crear Meta
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Savings Tips */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <PiggyBank className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-yellow-800">
                {currentLanguage === "qu" ? "Waqaychay yachay" : "Consejo de ahorro"}
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                {currentLanguage === "qu"
                  ? "Sapa killa pisi pisita waqaychaspa, hatun metaykikunata hunt'anki."
                  : currentLanguage === "ay"
                    ? "Sapa phaxsi jisk'a jisk'a imasasa, jach'a metanakam phuqhañani."
                    : currentLanguage === "cni"
                      ? "Sapa killa pisi pisita waqaychaspa, hatun metaykikunata hunt'anki."
                      : currentLanguage === "agr"
                        ? "Sapa nantu ishichik ishichik ipiatasa, jintia metamin najantatui."
                        : "Ahorrando pequeñas cantidades cada mes, lograrás grandes metas. ¡La constancia es clave!"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Estadísticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{savingsGoals.length}</p>
              <p className="text-xs text-gray-500">Metas activas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {savingsGoals.filter((g) => g.currentAmount / g.targetAmount >= 1).length}
              </p>
              <p className="text-xs text-gray-500">Metas completadas</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Proyección mensual</span>
            </div>
            <p className="text-xs text-gray-600">
              Con tus aportes actuales, completarás todas tus metas en aproximadamente{" "}
              <span className="font-semibold">{Math.max(...savingsGoals.map((g) => g.estimatedMonths))} meses</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
