"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Play, CheckCircle, Star, Lightbulb, Trophy } from "lucide-react"
import type { Translation } from "@/lib/i18n"

interface EducationModuleProps {
  userLevel: number
  userPoints: number
  onPointsEarned: (points: number) => void
  onLevelUp: () => void
  t: Translation
}

export function EducationModule({ userLevel, userPoints, onPointsEarned, onLevelUp, t }: EducationModuleProps) {
  const [completedLessons, setCompletedLessons] = useState([1, 2])

  const lessons = [
    {
      id: 1,
      title: t.whatIsCBDC,
      description: "Aprende los conceptos básicos de la moneda digital",
      duration: "5 min",
      points: 25,
      completed: true,
    },
    {
      id: 2,
      title: t.firstPayment,
      description: "Guía paso a paso para tu primera transacción",
      duration: "8 min",
      points: 30,
      completed: true,
    },
    {
      id: 3,
      title: t.digitalSecurity,
      description: "Mantén tu dinero seguro con estos consejos",
      duration: "6 min",
      points: 35,
      completed: false,
    },
    {
      id: 4,
      title: t.digitalSaving,
      description: "Estrategias para ahorrar con tu billetera digital",
      duration: "10 min",
      points: 40,
      completed: false,
    },
  ]

  const handleStartLesson = (lessonId: number, points: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId])
      onPointsEarned(points)

      if (completedLessons.length + 1 >= userLevel * 2) {
        onLevelUp()
      }
    }
  }

  const completionPercentage = (completedLessons.length / lessons.length) * 100

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {t.myProgress}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-100">{t.lessonsCompleted}</span>
              <span className="font-semibold">
                {completedLessons.length}/{lessons.length}
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2 bg-purple-500" />
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-300" />
              <span className="text-sm">{userPoints} puntos ganados</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons */}
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id)

          return (
            <Card
              key={lesson.id}
              className={`hover:shadow-md transition-shadow ${isCompleted ? "border-green-200 bg-green-50" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? "bg-green-600" : "bg-purple-600"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{lesson.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {lesson.duration}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs font-medium">{lesson.points}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>

                    <Button
                      size="sm"
                      onClick={() => handleStartLesson(lesson.id, lesson.points)}
                      disabled={isCompleted}
                      className={isCompleted ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completado
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Comenzar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tip of the Day */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-yellow-800">{t.tipOfDay}</p>
              <p className="text-xs text-yellow-700 mt-1">
                Siempre verifica el número de teléfono antes de enviar dinero. Una vez enviado, no se puede cancelar la
                transacción.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
