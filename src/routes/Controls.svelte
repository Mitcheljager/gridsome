<script lang="ts">
	import Control from "./Control.svelte"

  interface Props { gridSize: number, maxCellValue: number, cells: number[], onchange(cells: number[]): void }

  // eslint-disable-next-line prefer-const
  let { gridSize, maxCellValue, cells, onchange } : Props = $props()

  function clampValue(value: number): number {
    if (value > maxCellValue) return 1
    if (value < 1) return maxCellValue

    return value
  }

  function setColumn(increment: number, column: number): void {
    const newCells = cells.map((cell, i) : number => {
      if (i % gridSize !== column) return cell
      return clampValue(cell + increment)
    })

    onchange(newCells)
  }

  function setRow(increment: number, row: number): void {
    const newCells = cells.map((cell, i): number => {
      const startIndex = row * gridSize
      const endIndex = startIndex + gridSize

      if (i < startIndex || i >= endIndex) return cell
      return clampValue(cell + increment)
    })

    onchange(newCells)
  }

  function setDiagonal(increment: number, type: "main" | "anti"): void {
    const newCells = cells.map((cell, i): number => {
      if (type === "main" && i % (gridSize + 1) === 0) return clampValue(cell + increment)
      if (type === "anti" && i % (gridSize - 1) === 0 && i !== 0 && i !== gridSize * gridSize - 1) return clampValue(cell + increment)

      return cell
    })

    onchange(newCells)
  }
</script>

{#each { length: gridSize } as _, i}
  <Control label="Add to column {i + 1}" onclick={() : void => setColumn(1, i)} sign="+" column={i + 1} />
{/each}

{#each { length: gridSize } as _, i}
  <Control label="Subtract from column {i + 1}" onclick={() : void => setColumn(-1, i)} column={i + 1} row={gridSize + 1} sign="-" />
{/each}

{#each { length: gridSize } as _, i}
  <Control label="Add to row {i + 1}" onclick={() : void => setRow(1, i)} row={i + 1} column={gridSize + 1} sign="+" />
{/each}

{#each { length: gridSize } as _, i}
  <Control label="Subtract from row {i + 1}" onclick={() : void => setRow(-1, i)} row={i + 1} sign="-" />
{/each}

<Control label="Add to main diagonal" onclick={() : void => setDiagonal(1, "main")} column={gridSize + 1} row={gridSize + 1} sign="+" />
<Control label="Subtract from main diagonal" onclick={() : void => setDiagonal(-1, "main")} sign="-" />

<Control label="Add to anti diagonal" onclick={() : void => setDiagonal(1, "anti")} column={gridSize + 1} sign="+" />
<Control label="Subtract from anti diagonal" onclick={() : void => setDiagonal(-1, "anti")} row={gridSize + 1} sign="-" />
