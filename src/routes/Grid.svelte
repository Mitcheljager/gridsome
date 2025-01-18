<script lang="ts">
	import Cell from "./Cell.svelte"

  interface Props { gridSize: number, cells: number[] }

  const { gridSize, cells } : Props = $props()
</script>

<div class="grid">
  {#each { length: gridSize * gridSize } as _, i}
    <Cell cell={cells[i] || 0} />
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
