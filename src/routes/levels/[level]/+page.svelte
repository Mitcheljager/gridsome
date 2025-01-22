<script lang="ts">
	import { onDestroy, onMount } from "svelte"
	import { page } from "$app/state"
	import { levels } from "$lib/levels"
	import { completeLevel } from "$lib/game"
	import { browser, getLevelColor } from "$lib/utils"
	import type { Level } from "../../../types"
	import Controls from "../../Controls.svelte"
	import Grid from "../../Grid.svelte"
	import Matcher from "../../Matcher.svelte"
	import MenuButton from "../../MenuButton.svelte"
	import CompleteScreen from "../../CompleteScreen.svelte"
	import RefreshButton from "../../RefreshButton.svelte"

  const { level } = page.params
  const { start, gridSize, maxCellValue, goal } = $derived(levels.find((l: Level) => l.id === level)!)

  // svelte-ignore state_referenced_locally
  let cells: number[] = $state(start)
  let clientWidth = $state(0)
  let completed = $state(false)

  onMount(async() => {
    document.body.style.backgroundColor = getLevelColor(level)

    // console.log("Solving...")
    // await new Promise(res => setTimeout(res))
    // const solve = solver(gridSize, maxCellValue, start, goal)
    // console.log(solve)
  })

  onDestroy(() => {
    if (browser) document.body.style.backgroundColor = ""
  })

  function complete(): void {
    completeLevel(level, 0)
    completed = true
  }

  function reset(): void {
    cells = start
  }
</script>

{#if completed}
  <CompleteScreen currentLevelId={level} />
{/if}

<div class="game" class:completed style:--grid-size={gridSize} aria-hidden={completed ? "true" : null}>
  <MenuButton />
  <RefreshButton onclick={reset} />
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
