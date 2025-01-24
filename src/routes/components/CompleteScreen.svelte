<script lang="ts">
	import type { CompletedLevel } from "../../types"
	import { levels } from "$lib/levels"
	import { fade, scale } from "svelte/transition"
	import Stars from "./Stars.svelte"
	import { getCompletedLevels } from "$lib/game"
	import { onMount } from "svelte"
	import { conditionalAnimation } from "$lib/settings"

  interface Props { currentLevelId: string, currentMoves: number }

  const { currentLevelId, currentMoves } : Props = $props()

  let completedLevels: CompletedLevel[] = $state([])

  const currentLevelIndex = levels.findIndex(l => l.id === currentLevelId)
  const nextLevelId = currentLevelIndex === -1 ? null : (levels[currentLevelIndex + 1]?.id || null)
  const bestScore: number = $derived(completedLevels.find(l => l.id === currentLevelId)?.score || 0)

  onMount(async() => {
    completedLevels = await getCompletedLevels()
  })
</script>

<div class="screen" in:fade={conditionalAnimation({ duration: 200, delay: 1000 })}>
  <div class="dialog" role="dialog" in:scale={conditionalAnimation({ duration: 200, delay: 1100, start: 0.5 })}>
    <h1 in:scale={conditionalAnimation({ start: 0.8, duration: 200, delay: 1200 })}>Level complete</h1>

    <div class="moves">
      <div in:fade={conditionalAnimation({ duration: 300, delay: 1200 })}>
        <span>Moves: {currentMoves}</span><br>

        {#if bestScore}
          <span>Your best: {bestScore}</span>
        {/if}
      </div>

      {#if currentLevelId}
        <div class="stars">
          <Stars {currentLevelId} delay={1200} />
        </div>
      {/if}
    </div>

    <nav in:fade={conditionalAnimation({ duration: 500, delay: 1600 })}>
      {#if nextLevelId}
        <a href="/levels/{nextLevelId}">Next level</a>
      {/if}

      <a href="/levels">Level select</a>
      <a href="/">Main menu</a>
    </nav>
  </div>
</div>

<style>
  h1 {
    max-width: 400px;
    margin: 0 auto 2rem;
    font-size: clamp(3rem, 10vw, 5rem);
    line-height: 1;
  }

  nav {
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
    line-height: 1.25;
  }

  a {
    padding: 0.5rem;
    font-size: clamp(2rem, 8vw, 2.5rem);
    color: black;
    text-decoration: none;
    transition: transform 50ms;
  }

  a:hover {
    transform: scale(1.05);
  }

  a:active {
    transform: scale(0.95);
  }

  .screen {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 2rem;
    z-index: 10;
    backdrop-filter: blur(2rem);
  }

  @media (min-width: 600px) {
    .screen {
      padding: 4rem;
    }
  }

  .dialog {
    width: 100%;
    max-width: var(--max-width);
    padding: 1rem;
    border-radius: 1rem;
    background: var(--success);
    color: black;
    text-align: center;
  }

  .moves {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
  }

  .stars {
    --star-active-color: white;
    --star-label-color: rgba(255, 255, 255, 0.75);
    --star-label-active-color: black;
    --star-color: rgba(0, 0, 0, 0.35);
    --star-size: clamp(5rem, 20vw, 8rem);
    --star-label-size: clamp(2.5rem, 10vw, 4rem);
    --star-label-mix-blend-mode: initial;
    --star-label-active-text-shadow: none;
    margin-top: 1rem;
  }
</style>
