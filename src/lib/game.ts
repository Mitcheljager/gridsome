import type { CompletedLevel } from "../types"
import { getStore, setStore } from "./settings"

export const completedLevelsKey = "completed-levels"

export async function getCompletedLevels(): Promise<CompletedLevel[]> {
  return JSON.parse(await getStore(completedLevelsKey) || "[]")
}

export async function completeLevel(id: string, numberOfMoves: number): Promise<void> {
  let completedLevels: CompletedLevel[] = await getCompletedLevels()

  const previousCompletedLevel = getCompletedLevel(completedLevels, id)
  const score = Math.min(previousCompletedLevel?.score || 9999, numberOfMoves)

  if (previousCompletedLevel) completedLevels = completedLevels.filter(l => l.id !== id)

  completedLevels.push({
    id,
    score
  })

  setStore(completedLevelsKey, JSON.stringify(completedLevels))
}

export function getCompletedLevel(completedLevels: CompletedLevel[], id: string): CompletedLevel | null {
  return completedLevels.find(l => l.id === id) || null
}
