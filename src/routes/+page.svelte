<script lang="ts">
	import { browser } from "$app/environment"
	import { solver } from "$lib/solver"
	import Controls from "./Controls.svelte"
	import Grid from "./Grid.svelte"

  const gridSize = 2
  const maxCellValue = 20

  let cells = $state([2, 2, 2, 2] || Array(gridSize * gridSize).fill(0))
  let clientWidth = $state(0)

  if (browser) console.log(solver(gridSize, maxCellValue, cells, [8, 20, 17, 9]))
</script>

<div class="board" style:--board-width="{clientWidth}px" style:--grid-size={gridSize} bind:clientWidth>
  <Controls {gridSize} {maxCellValue} {cells} onchange={(value): void => { cells = value }} />

  <Grid {cells} {gridSize} />
</div>

<style>
  .board {
    --cell-width: calc(var(--board-width) / (var(--grid-size) + 2));
    position: relative;
    padding: var(--cell-width);
  }
</style>
