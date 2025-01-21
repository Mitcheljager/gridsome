<script lang="ts">
	import { conditionalAnimation } from "$lib/settings"
	import { fly, scale } from "svelte/transition"

  interface Props { cell: number, active?: boolean, maxCellValue?: number, animate?: boolean }

  const { cell, active = false, maxCellValue = 0, animate = false } : Props = $props()
  const transitionDuration = 50
  const changedBorderDuration = 300

  let isTransitioning = $state(false)
  let hasRecentlyChanged = $state(false)
  // eslint-disable-next-line no-undef
  let previousChangedTimeout: NodeJS.Timeout | number | null = null
  let previousCell = $state(cell)
  let previousDistance = 0

  function getTransitionDistance(): number {
    setRecentlyChanged()

    if (isTransitioning) return previousDistance

    const distance = Math.min(window.innerWidth / 20, 30)

    let direction = previousCell > cell ? 1 : -1

    if (previousCell === maxCellValue && cell === 1) direction = -1
    if (previousCell === 1 && cell === maxCellValue) direction = 1

    previousCell = cell
    previousDistance = distance * direction

    isTransitioning = true
    setTimeout(() => isTransitioning = false, transitionDuration)

    return distance * direction
  }

  function setRecentlyChanged(): void {
    if (previousChangedTimeout) clearTimeout(previousChangedTimeout)

    hasRecentlyChanged = true
    previousChangedTimeout = setTimeout(() => hasRecentlyChanged = false, changedBorderDuration)
  }
</script>

<div
  class="cell"
  class:active
  class:changing={hasRecentlyChanged}
  style:--cell={cell}
  in:scale|global={animate ? conditionalAnimation({ start: 0.5, duration: 200, delay: Math.random() * 500 }) : { duration: 0 }}>
  {#key cell}
    <span
      in:fly={conditionalAnimation({ y: -getTransitionDistance(), duration: transitionDuration })}
      out:fly={conditionalAnimation({ y: getTransitionDistance(), duration: transitionDuration })}>
      {cell}
    </span>
  {/key}
</div>

<style>
  span {
    grid-area: number;
  }

  .cell {
    position: relative;
    display: grid;
    grid-template: "number";
    align-items: center;
    justify-content: center;
    width: var(--cell-width);
    height: var(--cell-width);
    font-size: calc(var(--cell-width) * 0.5);
    line-height: 0.5em;
    text-align: center;
    overflow: hidden;
  }

  .cell::before {
    content: "";
    display: block;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);
    border-radius: calc(var(--cell-width) * 0.15);
    border: 0.25rem solid rgb(0, 255, 191, 0);
    background: hsl(calc(280 + var(--cell) * 18), 70%, 40%);
    z-index: -1;
    transition: background-color 200ms, border 200ms;
  }

  .changing:before {
    transition: background-color 200ms, border 50ms;
    border-color: rgb(255, 255, 255);
  }

  .active {
    color: black;
  }

  .active::before {
    border-color: var(--success);
    background: var(--success);
  }
</style>
