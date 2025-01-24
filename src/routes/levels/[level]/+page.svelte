<script lang="ts">
	import { onDestroy, onMount } from "svelte"
	import { page } from "$app/state"
	import { completeLevel, getCompletedLevels } from "$lib/game"
	import { browser, getLevelColor } from "$lib/utils"
	import { levels } from "$lib/levels"
	import type { CompletedLevel, Level } from "../../../types"
	import Controls from "../../components/Controls.svelte"
	import Grid from "../../components/Grid.svelte"
	import Matcher from "../../components/Matcher.svelte"
	import MenuButton from "../../components/MenuButton.svelte"
	import CompleteScreen from "../../components/CompleteScreen.svelte"
	import RefreshButton from "../../components/RefreshButton.svelte"
	import Stars from "../../components/Stars.svelte"
	import { solver } from "$lib/solver"

  const { level } = page.params
  const { start, gridSize, maxCellValue, goal } = $derived(levels.find((l: Level) => l.id === level)!)

  // svelte-ignore state_referenced_locally
  let cells: number[] = $state(start)
  let clientWidth = $state(0)
  let moves = $state(0)
  let completedLevels: CompletedLevel[] = $state([])
  let completed = $state(false)

  const hasPreviousCompletedLevel = $derived(completedLevels.find(l => l.id === level))

  onMount(async() => {
    document.body.style.setProperty("--level-bg", getLevelColor(level))
    document.body.style.setProperty("--level-bg-light", getLevelColor(level, 1.35))

    completedLevels = await getCompletedLevels()

    console.log("Solving...")
    await new Promise(res => setTimeout(res))
    const solve = solver(gridSize, maxCellValue, start, goal)
    console.log(solve)
  })

  onDestroy(() => {
    if (!browser) return

    document.body.style.removeProperty("--level-bg")
    document.body.style.removeProperty("--level-bg-light")
  })

  function complete(): void {
    completeLevel(level, moves)
    completed = true
  }

  function reset(): void {
    cells = start
    moves = 0
  }

  function change(value: number[]): void {
    cells = value
    moves++
  }
</script>

{#if completed}
  <CompleteScreen currentLevelId={level} currentMoves={moves} />
{/if}

<div class="game" class:completed style:--grid-size={gridSize} aria-hidden={completed ? "true" : null}>
  <MenuButton />
  <RefreshButton onclick={reset} />
  <Matcher {gridSize} {cells} {goal} onmatch={complete} />

  {#if hasPreviousCompletedLevel}
    <div class="moves">
      <span class="current-moves">{moves} Move{moves === 1 ? "" : "s"}</span>
      <Stars currentLevelId={level} delay={500} />
    </div>
  {/if}

  <div class="board" class:push={!hasPreviousCompletedLevel} style:--board-width="{clientWidth}px" bind:clientWidth>
    <Controls {gridSize} {maxCellValue} {cells} onchange={(value): void => change(value)} />
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

  .moves {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: auto;
    padding: 0.5rem 0;
    line-height: 1.25;
  }

  .current-moves {
    mix-blend-mode: overlay;
    color: rgba(255, 255, 255, 0.75);
    font-size: clamp(1.35rem, 5vw, 1.5rem);
  }

  .board {
    --cell-width: calc(var(--board-width) / (var(--grid-size) + 2));
    position: relative;
    width: 100%;
    padding: var(--cell-width) var(--cell-width) calc(var(--cell-width) + env(safe-area-inset-bottom));
  }

  .push {
    margin-top: auto;
  }

  .completed .board {
    pointer-events: none;
  }
</style>
