<script lang="ts">
	import { fade } from "svelte/transition"

  interface Props { onclick(): void }

  const { onclick } : Props = $props()

  let animate = $state(false)

  function refresh(): void {
    if (animate) return

    onclick()

    animate = true
    setTimeout(() => animate = false, 750)
  }
</script>

<button aria-label="Restart level" class:animate in:fade|global={{ duration: 300, delay: 200 }} onclick={refresh}>
  <svg width="60px" height="60px" viewBox="0 0 20 20">
    <path fill="white" d="M2.945 11.76a1 1 0 101.86-.736c-.892-2.256.024-4.967 2.316-6.29 1.987-1.147 4.354-.879 5.934.45l-2.49.295a1 1 0 10.234 1.986l4.31-.509a1 1 0 00.863-.793l.802-3.927a1 1 0 00-1.96-.4l-.385 1.889c-2.226-1.939-5.573-2.302-8.308-.723C3 4.803 1.675 8.549 2.945 11.76zm14.11-3.52a1 1 0 00-1.86.736c.892 2.256-.024 4.967-2.316 6.29-1.987 1.147-4.355.879-5.934-.45l2.49-.295a1 1 0 00-.234-1.986l-4.31.509a1 1 0 00-.863.793l-.802 3.927a1 1 0 001.96.4l.385-1.889c2.226 1.939 5.573 2.302 8.308.723 3.12-1.801 4.446-5.547 3.176-8.758z" />
  </svg>
</button>

<style>
  button {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: absolute;
    width: clamp(4rem, 15vw, 5rem);
    height: clamp(4rem, 15vw, 5rem);
    padding: 0.5rem;
    top: 0.125rem;
    left: 0;
    background: transparent;
    border: 0;
    mix-blend-mode: overlay;
    transition: transform 100ms, scale 50ms;
    cursor: pointer;
  }

  button:not(.animate):hover,
  button:not(.animate):active {
    mix-blend-mode: initial;
  }

  button:not(.animate):hover {
    transform: rotate(-15deg);
  }

  button:not(.animate):active {
    scale: 0.85;
  }

  svg {
    width: 95%;
    height: 95%;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  .animate {
    animation: rotate 400ms;
  }
</style>
