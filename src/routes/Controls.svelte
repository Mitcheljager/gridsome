<script lang="ts">
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
  <button aria-label="Add to column {i + 1}" onclick={() : void => setColumn(1, i)} style:--column={i + 1} style:--animation-delay="{Math.random() * 500}ms">+</button>
{/each}

{#each { length: gridSize } as _, i}
  <button aria-label="Subtract from column {i + 1}" onclick={() : void => setColumn(-1, i)} style:--column={i + 1} style:--row={gridSize + 1} style:--animation-delay="{Math.random() * 500}ms">-</button>
{/each}

{#each { length: gridSize } as _, i}
  <button aria-label="Add to row {i + 1}" onclick={() : void => setRow(1, i)} style:--row={i + 1} style:--column={gridSize + 1} style:--animation-delay="{Math.random() * 500}ms">+</button>
{/each}

{#each { length: gridSize } as _, i}
  <button aria-label="Subtract from row {i + 1}" onclick={() : void => setRow(-1, i)} style:--row={i + 1} style:--animation-delay="{Math.random() * 500}ms">-</button>
{/each}

<button aria-label="Add to main diagonal" onclick={() : void => setDiagonal(1, "main")} style:--column={gridSize + 1} style:--row={gridSize + 1} style:--animation-delay="{Math.random() * 500}ms">+</button>
<button aria-label="Subtract from main diagonal" onclick={() : void => setDiagonal(-1, "main")} style:--animation-delay="{Math.random() * 500}ms">-</button>

<button aria-label="Add to anti diagonal" onclick={() : void => setDiagonal(1, "anti")} style:--column={gridSize + 1} style:--animation-delay="{Math.random() * 500}ms">+</button>
<button aria-label="Subtract from anti diagonal" onclick={() : void => setDiagonal(-1, "anti")} style:--row={gridSize + 1} style:--animation-delay="{Math.random() * 500}ms">-</button>

<style>
  @keyframes fade-in-color {
    from {
      color: transparent;
    }

    to {
      color: rgba(255, 255, 255, 0.85);
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    position: absolute;
    top: calc(var(--cell-width) * var(--row, 0));
    left: calc(var(--cell-width) * var(--column, 0));
    width: var(--cell-width);
    height: var(--cell-width);
    border: 0;
    background: transparent;
    color: transparent;
    font-size: calc(var(--cell-width) * 0.75);
    font-family: inherit;
    cursor: pointer;
    overflow: hidden;
    animation: fade-in-color 200ms var(--animation-delay) forwards;
    transition: color 50ms, font-size 50ms;
  }

  @keyframes pop-in {
    from {
      opacity: 0;
      transform: scale(0.75);
    }

    to {
      opactity: 1;
      transform: scale(1);
    }
  }

  button::before {
    content: "";
    display: block;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);
    border-radius: calc(var(--cell-width) * 0.15);
    background: rgba(255, 255, 255, 0.25);
    border: 0.25rem solid transparent;
    mix-blend-mode: overlay;
    z-index: -1;
    transform: scale(0);
    animation: pop-in 200ms var(--animation-delay) forwards;
    transition: transform 50ms, background-color 50ms, border 50ms;
  }

  button:hover,
  button:active {
    color: white;
  }

  button:active {
    font-size: calc(var(--cell-width) * 0.7);
  }

  button:hover::before {
    transform: scale(1.025);
  }

  button:active::before {
    transform: scale(0.9);
    background: rgba(255, 255, 255, 0.35);
    border: 0.25rem solid rgba(255, 255, 255, 0.5);
  }
</style>
