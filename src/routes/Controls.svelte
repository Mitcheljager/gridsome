<script lang="ts">
  interface Props { gridSize: number, maxCellValue: number, cells: number[], onchange(cells: number[]): void }

  // eslint-disable-next-line prefer-const
  let { gridSize, maxCellValue, cells, onchange } : Props = $props()

  function clampValue(value: number): number {
    if (value > maxCellValue) return 0
    if (value < 0) return maxCellValue

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
  <button onclick={() : void => setColumn(1, i)}>+</button>
{/each}

{#each { length: gridSize } as _, i}
  <button onclick={() : void => setColumn(-1, i)}>-</button>
{/each}

---

{#each { length: gridSize } as _, i}
  <button onclick={() : void => setRow(1, i)}>+</button>
{/each}

{#each { length: gridSize } as _, i}
  <button onclick={() : void => setRow(-1, i)}>-</button>
{/each}

---

<button onclick={() : void => setDiagonal(1, "main")}>+</button>
<button onclick={() : void => setDiagonal(-1, "main")}>-</button>

---

<button onclick={() : void => setDiagonal(1, "anti")}>+</button>
<button onclick={() : void => setDiagonal(-1, "anti")}>-</button>
