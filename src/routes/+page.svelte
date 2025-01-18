<script lang="ts">
	import { browser } from "$app/environment"
	import { solver } from "$lib/solver"
	import Controls from "./Controls.svelte"
	import Grid from "./Grid.svelte"
	import Matcher from "./Matcher.svelte"

  const gridSize = 2
  const maxCellValue = 10
  const goal = [1, 1, 2, 2]

  let cells = $state(Array(gridSize * gridSize).fill(0))
  let clientWidth = $state(0)

  if (browser) console.log(solver(gridSize, maxCellValue, [2, 2, 2, 2], [8, 8, 8, 8]))
</script>

<div style:--grid-size={gridSize}>
  <Matcher {gridSize} {cells} {goal} onmatch={(): void => console.log("Match!")} />

  <div class="board" style:--board-width="{clientWidth}px" bind:clientWidth>
    <Controls {gridSize} {maxCellValue} {cells} onchange={(value): void => { cells = value }} />
    <Grid {cells} {gridSize} />
  </div>
</div>

<style>
  .board {
    --cell-width: calc(var(--board-width) / (var(--grid-size) + 2));
    position: relative;
    padding: var(--cell-width);
  }
</style>
