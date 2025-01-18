<script>
	import { levels } from "$lib/levels"
</script>

<nav class="levels">
  {#each levels as { id }, i}
    <a class="level" href="/levels/{id}">Level {i}</a>
  {/each}
</nav>

<style>
  .levels {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  }

  .level {
    position: relative;
    display: block;
    padding: 1rem;
    outline: 2px solid transparent;
    border-radius: 0.5rem;
    color: white;
    text-decoration: none;
    line-height: 1;
  }

  .level:hover,
  .level:active {
    outline: 2px solid white;
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
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid white;
    mix-blend-mode: overlay;
    z-index: -1;
  }

  .level:hover::before,
  .level:active::before {
    border-color: transparent;
  }
</style>
