import type { CompletedLevel } from "../types"

export const completedLevelsKey = "completed-levels"

export function getCompletedLevels(): CompletedLevel[] {
  return JSON.parse(localStorage.getItem(completedLevelsKey) || "[]")
}

export function completeLevel(id: string, numberOfMoves: number): void {
  let completedLevels: CompletedLevel[] = getCompletedLevels()

  const previousCompletedLevel = getCompletedLevel(id)
  const score = Math.min(previousCompletedLevel?.score || 9999, numberOfMoves)

  if (previousCompletedLevel) completedLevels = completedLevels.filter(l => l.id !== id)

  completedLevels.push({
    id,
    score
  })

  localStorage.setItem(completedLevelsKey, JSON.stringify(completedLevels))
}

export function getCompletedLevel(id: string): CompletedLevel | null {
  return getCompletedLevels().find(l => l.id === id) || null
}
