<script lang="ts">
	import type { Level } from "../../../types"
	import { page } from "$app/state"
	import { levels } from "$lib/levels"
	import Controls from "../../Controls.svelte"
	import Grid from "../../Grid.svelte"
	import Matcher from "../../Matcher.svelte"

  const { level } = page.params
  const { start, gridSize, maxCellValue, goal } = $derived(levels.find((l: Level) => l.id === level)!)

  // svelte-ignore state_referenced_locally
  let cells: number[] = $state(start)
  let clientWidth = $state(0)

  // eslint-disable-next-line svelte/valid-compile
  // if (browser) console.log(solver(gridSize, maxCellValue, start, goal))
</script>

<div class="game" style:--grid-size={gridSize}>
  <Matcher {gridSize} {cells} {goal} onmatch={(): void => console.log("Match!")} />

  <div class="board" style:--board-width="{clientWidth}px" bind:clientWidth>
    <Controls {gridSize} {maxCellValue} {cells} onchange={(value): void => { cells = value }} />
    <Grid {cells} {gridSize} {maxCellValue} {goal} />
  </div>
</div>

<style>
  .game {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .board {
    --cell-width: calc(var(--board-width) / (var(--grid-size) + 2));
    position: relative;
    padding: var(--cell-width);
    margin-top: auto;
  }
</style>
