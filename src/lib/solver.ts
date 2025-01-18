interface State {
  cells: number[]
  moves: string[]
}

/** Calculate the shortest possible solution using ChatGPT magic */
export function solver(
  gridSize: number,
  maxCellValue: number,
  initialCells: number[],
  targetCells: number[]
): string[] | null {
  const queue: State[] = [{ cells: [...initialCells], moves: [] }]
  const visited = new Set<string>()

  let appliedMoves = 0

  function applyMove(cells: number[], move: string, increment: number): number[] {
    const newCells = [...cells]

    if (move.startsWith("row")) {
      const row = parseInt(move.split(" ")[1], 10)
      for (let i = row * gridSize; i < (row + 1) * gridSize; i++) {
        newCells[i] = ((newCells[i] + increment - 1 + maxCellValue) % maxCellValue) + 1
      }
    } else if (move.startsWith("col")) {
      const col = parseInt(move.split(" ")[1], 10)
      for (let i = col; i < gridSize * gridSize; i += gridSize) {
        newCells[i] = ((newCells[i] + increment - 1 + maxCellValue) % maxCellValue) + 1
      }
    } else if (move === "diag main") {
      for (let i = 0; i < gridSize; i++) {
        newCells[i * (gridSize + 1)] = ((newCells[i * (gridSize + 1)] + increment - 1 + maxCellValue) % maxCellValue) + 1
      }
    } else if (move === "diag anti") {
      for (let i = 1; i <= gridSize; i++) {
        newCells[i * (gridSize - 1)] = ((newCells[i * (gridSize - 1)] + increment - 1 + maxCellValue) % maxCellValue) + 1
      }
    }

    appliedMoves++

    return newCells
  }

  while (queue.length > 0) {
    const { cells, moves } = queue.shift()!
    const stateKey = cells.join(",")

    if (stateKey === targetCells.join(",")) {
      console.log("applied moves", appliedMoves)
      return moves
    }

    if (visited.has(stateKey)) continue

    visited.add(stateKey)

    for (let i = 0; i < gridSize; i++) {
      queue.push({ cells: applyMove(cells, `row ${i}`, 1), moves: [...moves, `row ${i} +`] })
      queue.push({ cells: applyMove(cells, `row ${i}`, -1), moves: [...moves, `row ${i} -`] })

      queue.push({ cells: applyMove(cells, `col ${i}`, 1), moves: [...moves, `col ${i} +`] })
      queue.push({ cells: applyMove(cells, `col ${i}`, -1), moves: [...moves, `col ${i} -`] })
    }

    queue.push({ cells: applyMove(cells, "diag main", 1), moves: [...moves, "diag main +"] })
    queue.push({ cells: applyMove(cells, "diag main", -1), moves: [...moves, "diag main -"] })

    queue.push({ cells: applyMove(cells, "diag anti", 1), moves: [...moves, "diag anti +"] })
    queue.push({ cells: applyMove(cells, "diag anti", -1), moves: [...moves, "diag anti -"] })
  }

  console.log("applied moves", appliedMoves)
  return null
}
