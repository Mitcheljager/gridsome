<script>
	import { levels } from "$lib/levels"
	import { fly, scale } from "svelte/transition"
	import BackButton from "../BackButton.svelte"
</script>

<div class="layout">
  <BackButton />

  <h1 in:fly={{ y: -(Math.min(window.innerWidth / 20, 40)), duration: 300 }}>Levels</h1>

  <nav class="levels">
    {#each levels as { id }, i}
      {@const completed = Math.random() > 0.5}

      <a
        class="level"
        class:completed
        href="/levels/{id}"
        in:scale|global={{ duration: 200, delay: 150 + i * 50, start: 0.85 }}>
        {i + 1}
      </a>
    {/each}
  </nav>
</div>

<style>
  h1 {
    margin: 0;
    padding: 2rem 0;
    text-align: center;
    font-size: clamp(4rem, 20vw, 7rem);
  }

  .layout {
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1rem;
  }

  .levels {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 0 0 2rem;
  }

  .level {
    position: relative;
    display: flex;
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
    transition: transform 50ms;
  }

  .level:hover,
  .level:active {
    outline: 2px solid white;
  }

  .level:active {
    transform: scale(0.9);
  }

  .level::before {
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

  .level:hover::before,
  .level:active::before {
    border-color: transparent;
  }

  .completed {
    color: var(--success);
    color: black;
  }

  .completed::before {
    background: var(--success);
  }
</style>
