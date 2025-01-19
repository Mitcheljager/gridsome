<script>
	import { levels } from "$lib/levels"
	import { getLevelColor } from "$lib/utils"
</script>

<h1>Levels</h1>

<nav class="levels">
  {#each levels as { id }, i}
    <a class="level" href="/levels/{id}" style:border-color={getLevelColor(id, 1.5)}>Level {i}</a>
  {/each}
</nav>

<style>
  h1 {
    margin: 2rem 0;
    text-align: center;
  }

  .levels {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 2rem 2rem;
  }

  .level {
    position: relative;
    display: block;
    padding: 1rem;
    outline: 2px solid transparent;
    border-left: 1rem solid white;
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
    border-radius: 0 0.5rem 0.5rem 0;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid white;
    border-left: 0;
    mix-blend-mode: overlay;
    z-index: -1;
  }

  .level:hover::before,
  .level:active::before {
    border-color: transparent;
  }
</style>
