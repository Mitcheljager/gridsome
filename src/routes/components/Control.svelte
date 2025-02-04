<script lang="ts">
	import { isUsingReduceAnimations } from "$lib/settings"
	import { onMount } from "svelte"
	import { haptics } from "../actions/haptics.svelte"
	import { tap } from "../actions/tap.svelte"

  interface Props { label: string, column?: number, row?: number, sign: "+" | "-", onclick(): void }

  const { label, column = 0, row = 0, sign, onclick } : Props = $props()

  let reduceAnimations = $state(false)
  let isDown = $state(false)
  let isTouchEvent = false

  onMount(async() => {
    reduceAnimations = await isUsingReduceAnimations()
  })

  function click(event: TouchEvent | MouseEvent): void {
    if (isTouchEvent && event.type === "mousedown") return
    isTouchEvent = event.type === "touchstart"

    isDown = true

    onclick()
  }

  function up(): void {
    isDown = false
  }
</script>

<button
  aria-label={label}
  onmousedown={click}
  ontouchstart={click}
  onmouseup={up}
  ontouchend={up}
  style:--column={column}
  style:--row={row}
  style:--animation-delay="{Math.round(Math.random() * 500)}ms"
  class:is-down={isDown}
  class:no-animations={reduceAnimations}
  use:tap
  use:haptics>
  {sign}
</button>

<style>
  @keyframes fade-in-color {
    from {
      color: transparent;
    }

    to {
      color: rgba(255, 255, 255, 0.85);
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    position: absolute;
    top: calc(var(--cell-width) * var(--row, 0));
    left: calc(var(--cell-width) * var(--column, 0));
    width: var(--cell-width);
    height: var(--cell-width);
    padding: 0;
    border: 0;
    background: transparent;
    color: transparent;
    font-size: calc(var(--cell-width) * 0.75);
    font-family: inherit;
    cursor: pointer;
    overflow: hidden;
    animation: fade-in-color 200ms var(--animation-delay) forwards;
    transition: color 50ms, font-size 50ms;
  }

  @keyframes pop-in {
    from {
      opacity: 0;
      transform: scale(0.75);
    }

    to {
      opactity: 1;
      transform: scale(1);
    }
  }

  button::before {
    content: "";
    display: block;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);
    border-radius: calc(var(--cell-width) * 0.15);
    background: rgba(255, 255, 255, 0.25);
    border: 0.25rem solid transparent;
    mix-blend-mode: overlay;
    transform: scale(0);
    animation: pop-in 200ms var(--animation-delay) forwards;
    transition: transform 50ms, background-color 50ms, border 50ms;
  }

  :global(.high-contrast) button::before {
    border: 0.25rem solid currentcolor;
    background: rgba(255, 255, 255, 0.05);
  }

  button:hover {
    color: white;
    animation-fill-mode: none;
  }

  button.is-down {
    font-size: calc(var(--cell-width) * 0.7);
  }

  button:hover::before {
    animation-fill-mode: none;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.025);
  }

  button.is-down::before {
    animation-fill-mode: none;
    transform: scale(0.9);
    background: rgba(255, 255, 255, 0.35);
    border: 0.25rem solid rgba(255, 255, 255, 0.5);
  }

  .no-animations,
  .no-animations::before {
    opacity: 1;
    animation: none;
    transform: none;
    color: white;
  }
</style>
