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
    font-size: clamp(1.5rem, 6vw, 2rem);
  }

  .matcher {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.5;
  }

  .goal {
    --cell-width: clamp(3rem, 13vw, 5rem);
    width: calc(var(--cell-width) * var(--grid-size));
  }
</style>
