<script>
	import { fly } from "svelte/transition"
</script>

<a href="/" aria-label="Return to main menu" in:fly={{ x: 20, duration: 300 }}>
  <div class="line top"></div>
  <div class="line bottom"></div>
</a>

<style>
  a {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: absolute;
    padding: 1rem;
    top: 0;
    left: -0.5rem;
    width: 4rem;
    height: 4rem;
    mix-blend-mode: overlay;
    transition: transform 50ms;
  }

  @media (min-width: 500px) {
    a {
      top: 1rem;
      left: 0;
      width: 5rem;
      height: 5rem;
    }
  }

  a:hover,
  a:active {
    mix-blend-mode: initial;
  }

  a:active {
    transform: translateX(-0.25rem);
  }

  .line {
    --offset: 3px;
    width: 100%;
    height: 1rem;
    border-radius: 0.25rem;
    background: white;
    transition: translate 100ms;
  }

  @media (min-width: 500px) {
    .line {
      --offset: -2px;
      border-radius: 0.35rem;
    }
  }

  .top {
    transform: rotate(-45deg) translateY(var(--offset));
  }

  .bottom {
    transform: rotate(-135deg) translateY(var(--offset));
  }
</style>
