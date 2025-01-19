<script lang="ts">
	import Grid from "./Grid.svelte"

  interface Props { cells: number[], goal: number[], gridSize: number, onmatch(): void }

  const { cells, goal, gridSize, onmatch } : Props = $props()

  $effect(() => {
    if (JSON.stringify(cells) === JSON.stringify(goal)) onmatch()
  })
</script>

<div class="matcher">
  <p>Match</p>

  <div class="goal">
    <Grid {gridSize} cells={goal} />
  </div>
</div>

<style>
  p {
    margin: 0;
  }

  .matcher {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.5;
  }

  .goal {
    --cell-width: 3rem;
    width: calc(var(--cell-width) * var(--grid-size));
  }
</style>
