<script>
	import { browser } from "$app/environment"
	import { scale } from "svelte/transition"
</script>

<div class="menu">
  <h1>Gridsome</h1>

  <nav>
    <a href="/levels">Play</a>
    <a href="/levels">Settings</a>
  </nav>

  <div class="background">
    {#each { length: browser ? Math.floor(window.innerHeight / 20) : 0 } as _}
      <div
        class="cell"
        style:opacity={1 - Math.random() * 0.75}
        in:scale|global={{ duration: 200, start: 0.5, delay: 500 * Math.random() }}></div>
    {/each}
  </div>
</div>

<style>
  h1 {
    margin: 2rem 0;
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

  .menu {
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
    border-radius: 1rem;
    background: #30535f;
  }
</style>
