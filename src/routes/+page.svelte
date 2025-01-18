<script lang="ts">
	import { onMount } from "svelte"
	import Controls from "./Controls.svelte"
	import Grid from "./Grid.svelte"

  const gridSize = 3
  const maxCellValue = 6

  let cells = $state(Array(gridSize * gridSize).fill(0))
  let cellWidth = $state(0)

  onMount(setCellWidth)

  function setCellWidth(): void {
    cellWidth = document.querySelector(".cell")!.getBoundingClientRect().width
  }
</script>

<svelte:window on:resize={setCellWidth} />

<div class="board" style:--cell-width="{cellWidth}px">
  <Controls {gridSize} {maxCellValue} {cells} onchange={(value): void => { cells = value }} />

  <Grid {cells} {gridSize} />
</div>

<style>
  .board {
    position: relative;
    padding: var(--cell-width);
  }
</style>
