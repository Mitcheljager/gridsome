<script>
	import { fade, scale } from "svelte/transition"
</script>

<div class="screen" in:fade={{ duration: 200, delay: 1000 }}>
  <div class="dialog" role="dialog" in:scale={{ duration: 200, delay: 1100, start: 0.5 }}>
    <h1>Level complete</h1>
    <h2>Awesome</h2>

    <nav>
      <a href="/levels/1">Next level</a>
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

  h2 {
    margin: 0 0 2rem;
    font-size: clamp(2.5rem, 10vw, 4rem);
    line-height: 1;
    color: white;
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
    background: rgba(0, 0, 0, 0.25);
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
</style>
