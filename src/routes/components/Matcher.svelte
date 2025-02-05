<script lang="ts">
	import { fly } from "svelte/transition"
	import Grid from "./Grid.svelte"
	import { conditionalAnimation } from "$lib/settings"
	import { t } from "$lib/language"

  interface Props { cells: number[], goal: number[], gridSize: number, onmatch(): void }

  const { cells, goal, gridSize, onmatch } : Props = $props()

  $effect(() => {
    if (JSON.stringify(cells) === JSON.stringify(goal)) onmatch()
  })
</script>

<div class="matcher" in:fly|global={conditionalAnimation({ y: 20, duration: 300 })}>
  <p>{t("Match")}</p>

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
    padding-top: env(safe-area-inset-top, 0px);
    line-height: 1.5;
  }

  .goal {
    --cell-width: clamp(3rem, 13vw, 5rem);
    width: calc(var(--cell-width) * var(--grid-size));
  }
</style>
