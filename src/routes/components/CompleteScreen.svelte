<script lang="ts">
	import { fade, scale } from "svelte/transition"
	import { onMount } from "svelte"
	import type { CompletedLevel } from "../../types"
	import { levels } from "$lib/levels"
	import { getCompletedLevels } from "$lib/game"
	import { t } from "$lib/language"
	import { conditionalAnimation } from "$lib/settings"
	import Stars from "./Stars.svelte"
	import { haptics } from "../actions/haptics.svelte"
	import { playAudio } from "$lib/audio"
	import { tap } from "../actions/tap.svelte"

  interface Props { currentLevelId: string, currentMoves: number }

  const { currentLevelId, currentMoves } : Props = $props()

  const delay = 1000

  let completedLevels: CompletedLevel[] = $state([])

  const currentLevelIndex = levels.findIndex(l => l.id === currentLevelId)
  const nextLevelId = currentLevelIndex === -1 ? null : (levels[currentLevelIndex + 1]?.id || null)
  const storedScore: number = $derived(completedLevels.find(l => l.id === currentLevelId)?.score || 0)

  onMount(async() => {
    completedLevels = await getCompletedLevels()

    setTimeout(() => playAudio("/audio/success.mp3", 0.75), delay + 50)
  })
</script>

<div class="screen" in:fade={{ duration: 200, delay }}>
  <div class="dialog" role="dialog" in:scale={conditionalAnimation({ duration: 200, delay: 1100, start: 0.5 })}>
    <h1
      class:small={t("Level Complete").split(" ").some(word => word.length > 8)}
      in:scale={conditionalAnimation({ start: 0.8, duration: 200, delay: 1200 })}>
      {t("Level Complete")}
    </h1>

    <div class="moves">
      <div in:fade={conditionalAnimation({ duration: 300, delay: 1200 })}>
        <span>{t("Moves")}: {currentMoves}</span><br>

        {#if storedScore}
          <span>{t("Your Best")}: {Math.min(storedScore, currentMoves)}</span>
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
        <a use:haptics use:tap href="/levels/{nextLevelId}">{t("Next Level")}</a>
      {/if}

      <a use:haptics use:tap href="/levels">{t("Level Select")}</a>
      <a use:haptics use:tap href="/">{t("Main Menu")}</a>
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

  h1.small {
    max-width: 500px;
    font-size: clamp(2rem, 7vw, 3.5rem);
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
    --star-label-color: rgba(255, 255, 255, 0.65);
    --star-label-active-color: black;
    --star-color: rgba(0, 0, 0, 0.35);
    --star-size: clamp(5rem, 20vw, 8rem);
    --star-label-size: clamp(2.5rem, 10vw, 4rem);
    --star-label-mix-blend-mode: normal;
    --star-label-active-text-shadow: none;
    margin-top: 1rem;
  }
</style>
