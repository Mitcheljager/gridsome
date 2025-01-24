<script lang="ts">
	import { conditionalAnimation } from "$lib/settings"
	import { onMount } from "svelte"
	import { fade, scale } from "svelte/transition"

  let showContent = $state(false)

  onMount(() => {
    requestAnimationFrame(() => showContent = true)
  })
</script>

<div class="menu">
  {#if showContent}
    <h1 in:fade={conditionalAnimation({ duration: 500, delay: 500 })}>Gridsome</h1>

    <nav>
      <a href="/levels" in:scale={conditionalAnimation({ duration: 200, delay: 700, start: 0.85 })}>Play</a>
      <a href="/settings" in:scale={conditionalAnimation({ duration: 200, delay: 900, start: 0.85 })}>Settings</a>
    </nav>
  {/if}

  <div class="background">
    {#each { length: showContent ? Math.floor(window.innerHeight / 15) : 0 } as _}
      <div
        class="cell"
        style:opacity={1 - Math.random() * 0.75}
        in:scale|global={conditionalAnimation({ duration: 200, start: 0.5, delay: 500 * Math.random() })}></div>
    {/each}
  </div>
</div>

<style>
  h1 {
    margin: -10vh 0 2rem;
    background: linear-gradient(-45deg, #e09532, #e13ce7, #1b81bd, #36c7b6);
    background-size: 100% 100%;
    background-clip: text;
    font-size: clamp(4rem, 15vw, 8rem);
    text-align: center;
    -webkit-text-stroke: clamp(1rem, 3vw, 2rem) transparent;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  a {
    font-size: clamp(2.5rem, 10vw, 5rem);
    line-height: 1.5;
    color: white;
    text-decoration: none;
  }

  a:active {
    transform: scale(0.95);
  }

  .menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .background {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: clamp(0.5rem, 3vw, 2rem);
    position: absolute;
    top: 0;
    left: -100vw;
    width: 200vw;
    transform: rotate(-15deg);
    transform-origin: top left;
    z-index: -1;
  }

  @media (min-width: 500px) {
    .background {
      grid-template-columns: repeat(7, 1fr);
    }
  }

  @media (min-width: 1000px) {
    .background {
      grid-template-columns: repeat(10, 1fr);
    }
  }

  .cell {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(1rem, 2vw, 10rem);
    background: #30535f;
  }

  :global(.high-contrast) .cell {
    background: #222;
  }
</style>
