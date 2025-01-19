<script lang="ts">
  // @ts-expect-error No types available
  import { prng_alea as seedrandom } from "esm-seedrandom"
	import type { Level } from "../../../types"
	import { page } from "$app/state"
	import { levels } from "$lib/levels"
	import Controls from "../../Controls.svelte"
	import Grid from "../../Grid.svelte"
	import Matcher from "../../Matcher.svelte"
	import { onDestroy, onMount } from "svelte"
	import { browser } from "$app/environment"

  const { level } = page.params
  const { start, gridSize, maxCellValue, goal } = $derived(levels.find((l: Level) => l.id === level)!)

  // svelte-ignore state_referenced_locally
  let cells: number[] = $state(start)
  let clientWidth = $state(0)

  onMount(() => {
    const random = seedrandom(level).quick()
    document.body.style.backgroundColor = `hsl(${random * 360}, 35%, 25%)`
  })

  onDestroy(() => {
    if (browser) document.body.style.backgroundColor = ""
  })

  // if (browser) console.log(solver(gridSize, maxCellValue, start, goal))
</script>

<div class="game" style:--grid-size={gridSize}>
  <Matcher {gridSize} {cells} {goal} onmatch={(): void => console.log("Match!")} />

  <div class="board" style:--board-width="{clientWidth}px" bind:clientWidth>
    <Controls {gridSize} {maxCellValue} {cells} onchange={(value): void => { cells = value }} />
    <Grid {cells} {gridSize} {maxCellValue} {goal} animate />
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
    padding: var(--cell-width) var(--cell-width) calc(var(--cell-width) + env(safe-area-inset-bottom));
    margin-top: auto;
  }
</style>
