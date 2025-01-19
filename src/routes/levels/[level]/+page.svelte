<script lang="ts">
	import { onDestroy, onMount } from "svelte"
	import { page } from "$app/state"
	import { browser } from "$app/environment"
	import { levels } from "$lib/levels"
	import { completeLevel } from "$lib/game"
	import { getLevelColor } from "$lib/utils"
	import type { Level } from "../../../types"
	import Controls from "../../Controls.svelte"
	import Grid from "../../Grid.svelte"
	import Matcher from "../../Matcher.svelte"
	import MenuButton from "../../MenuButton.svelte"

  const { level } = page.params
  const { start, gridSize, maxCellValue, goal } = $derived(levels.find((l: Level) => l.id === level)!)

  // svelte-ignore state_referenced_locally
  let cells: number[] = $state(start)
  let clientWidth = $state(0)
  let completed = $state(false)

  onMount(() => {
    document.body.style.backgroundColor = getLevelColor(level)
  })

  onDestroy(() => {
    if (browser) document.body.style.backgroundColor = ""
  })

  function complete(): void {
    completed = true
    completeLevel(level, 0)
  }

  // if (browser) console.log(solver(gridSize, maxCellValue, start, goal))
</script>

<div class="game" class:completed style:--grid-size={gridSize}>
  <MenuButton />
  <Matcher {gridSize} {cells} {goal} onmatch={complete} />

  <div class="board" style:--board-width="{clientWidth}px" bind:clientWidth>
    <Controls {gridSize} {maxCellValue} {cells} onchange={(value): void => { cells = value }} />
    <Grid {cells} {gridSize} {maxCellValue} {goal} animate />
  </div>
</div>

<style>
  .game {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 0.75rem 0.75rem;
  }

  .board {
    --cell-width: calc(var(--board-width) / (var(--grid-size) + 2));
    position: relative;
    width: 100%;
    padding: var(--cell-width) var(--cell-width) calc(var(--cell-width) + env(safe-area-inset-bottom));
    margin-top: auto;
  }

  .completed .board {
    pointer-events: none;
  }
</style>
