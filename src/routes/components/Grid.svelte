<script lang="ts">
	import Cell from "./Cell.svelte"

  interface Props { gridSize: number, cells: number[], goal?: number[], maxCellValue?: number, animate?: boolean }

  const { gridSize, cells, goal = [], maxCellValue = 0, animate = false } : Props = $props()
</script>

<div class="grid">
  {#each { length: gridSize * gridSize } as _, i}
    <Cell cell={cells[i] || 0} active={cells[i] === goal[i]} {maxCellValue} {animate} />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-size), 1fr);
    grid-template-rows: repeat(var(--grid-size), 1fr);
    width: 100%;
  }
</style>
