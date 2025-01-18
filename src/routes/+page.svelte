<script lang="ts">
	import Controls from "./Controls.svelte"
	import Grid from "./Grid.svelte"

  const gridSize = 3
  const maxCellValue = 6

  let cells = $state(Array(gridSize * gridSize).fill(0))
  let clientWidth = $state(0)
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
