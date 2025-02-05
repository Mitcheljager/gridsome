<script lang="ts">
	import type { CompletedLevel } from "../../types"
	import { onMount } from "svelte"
	import { fly, scale } from "svelte/transition"
	import { getCompletedLevel, getCompletedLevels } from "$lib/game"
	import { conditionalAnimation, getStore, setStore } from "$lib/settings"
	import { levels } from "$lib/levels"
	import { t } from "$lib/language"
	import BackButton from "../components/BackButton.svelte"
	import Stars from "../components/Stars.svelte"
	import { haptics } from "../actions/haptics.svelte"
	import { tap } from "../actions/tap.svelte"

  const selectGridSizeKey = "last-selected-grid-size"

  let selectedGridSize = $state(2)
  let completedLevels: CompletedLevel[] = $state([])

  onMount(async() => {
    selectedGridSize = parseInt(await getStore(selectGridSizeKey)) || selectedGridSize
    completedLevels = await getCompletedLevels()
  })

  function selectGridSize(size: number): void {
    selectedGridSize = size
    setStore(selectGridSizeKey, size.toString())
  }
</script>

<div class="layout">
  <BackButton />

  <h1 in:fly={conditionalAnimation({ y: -(Math.min(window.innerWidth / 20, 40)), duration: 300 })}>{t("Levels")}</h1>

  <h2>{t("Type")}</h2>

  <nav class="options">
    {#each [2, 3] as option, i}
      <button
        class="tile option"
        class:active={option === selectedGridSize}
        onclick={(): void => { selectGridSize(option) }}
        use:haptics
        use:tap={{ src: "/audio/tap-sharp.mp3" }}
        in:scale|global={conditionalAnimation({ duration: 200, delay: 150 + i * 50, start: 0.85 })}>

        <div class="grid" style:--grid-size={option}>
          {#each { length: option * option } as _}
            <div class="cell"></div>
          {/each}
        </div>

        {option}x{option}
      </button>
    {/each}
  </nav>

  <h2>{t("Level")}</h2>

  <nav class="levels">
    {#each levels.filter(({ gridSize }) => selectedGridSize === gridSize) as { id }, i (id)}
      {@const completed = getCompletedLevel(completedLevels, id)}

      <a
        class="tile"
        class:completed
        href="/levels/{id}"
        use:haptics
        use:tap
        in:scale|global={conditionalAnimation({ duration: 200, delay: 150 + i * 50, start: 0.85 })}>
        {i + 1}

        {#if completed}
          <div class="stars">
            <Stars currentLevelId={id} delay={600 + i * 50} />
          </div>
        {/if}
      </a>
    {/each}
  </nav>
</div>

<style>
  h1 {
    margin: 0;
    padding: 4rem 0 2rem 0;
    text-align: center;
    font-size: clamp(4rem, 20vw, 7rem);
  }

  h2 {
    margin: 0;
    padding-bottom: clamp(1rem, 5vw, 2rem);
    text-align: center;
    font-size: clamp(2rem, 10vw, 3rem);
    line-height: 1;
  }

  .layout {
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--env-safe-area-inset-top, env(safe-area-inset-top, 0px)) 1rem env(safe-area-inset-bottom, 0px);
  }

  .levels {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 0 0 2rem;
  }

  .tile {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    padding: 1rem;
    outline: 2px solid transparent;
    border-radius: 0.5rem;
    color: white;
    text-decoration: none;
    line-height: 1;
    font-size: clamp(3rem, 13vw, 5rem);
    transition: transform 50ms, background-color 200ms;
  }

  :global(.high-contrast) .tile {
    color: black;
  }

  @media (hover: hover) {
    .tile:hover {
      outline: 2px solid white;
    }
  }

  .tile:active {
    outline: 2px solid white;
  }

  .tile:active {
    transform: scale(0.9);
  }

  .tile::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    background: #325763;
    z-index: -1;
  }

  :global(.high-contrast) .tile::before {
    background: white;
  }

  .tile:hover::before,
  .tile:active::before {
    border-color: transparent;
  }

  .completed {
    color: var(--success);
    color: black;
  }

  .completed::before {
    background: var(--success);
  }

  :global(.high-contrast) .completed,
  :global(.high-contrast) .completed::before {
    background: var(--success);
  }

  .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .option {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: clamp(1rem, 5vw, 2rem);
    appearance: none;
    background: transparent;
    border: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: clamp(1.5rem, 10vw, 2.5rem);
    line-height: 0.75;
    color: white;
    transition: color 200ms;
  }

  .option:active {
    transform: scale(0.95);
  }

  .option.active {
    color: black;
  }

  :global(.high-contrast) .option.active {
    background: var(--success);
  }

  .option.active::before {
    background: white;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-size), 1fr);
    gap: calc(clamp(0.5rem, 3vw, 1rem) / var(--grid-size));
    width: 50%;
    aspect-ratio: 1 / 1;
  }

  .cell {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: calc(clamp(0.25rem, 3vw, 1rem) / var(--grid-size));
    background: white;
    transition: background-color 200ms;
  }

  :global(.high-contrast) .cell,
  .active .cell {
    background: black;
  }

  .stars {
    --stars-gap: 0;
    --star-label-size: 0;
    --star-size: clamp(1rem, 5vw, 2rem);
    --star-color: rgba(0, 0, 0, 0.25);
    --star-active-color: white;
    position: absolute;
    bottom: clamp(0.5rem, 2vw, 1rem);
  }
</style>
