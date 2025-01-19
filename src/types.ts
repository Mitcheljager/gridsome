export interface Level {
  id: string,
  gridSize: number,
  start: number[],
  goal: number[],
  maxCellValue: number
}

export interface CompletedLevel {
  id: string,
  score: number
}
