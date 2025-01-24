<script lang="ts">
	import type { CompletedLevel } from "../../types"
	import { getCompletedLevels } from "$lib/game"
	import { onMount } from "svelte"
	import { levels } from "$lib/levels"
	import { conditionalAnimation } from "$lib/settings"
	import { elasticOut } from "svelte/easing"
	import { scale } from "svelte/transition"

  interface Props { currentLevelId: string, delay?: number }

  const { currentLevelId, delay = 0 } : Props = $props()

  let completedLevels: CompletedLevel[] = $state([])

  const stars: number[] = $derived(levels.find(l => l.id === currentLevelId)!.stars)
  const bestScore: number = $derived(completedLevels.find(l => l.id === currentLevelId)?.score || 0)

  onMount(async() => {
    completedLevels = await getCompletedLevels()
  })
</script>

<div class="stars">
  {#each stars as star, i}
    {@const active = bestScore && bestScore <= star}

    <div class="star" class:active in:scale|global={conditionalAnimation({ duration: 1000, delay: delay + 100 * i, start: 0.75, easing: elasticOut })}>
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="currentColor" />
      </svg>

      <span class="label">{star}</span>
    </div>
  {/each}
  </div>

<style>
  svg {
    position: relative;
    display: block;
    z-index: 0;
  }

  .stars {
    display: flex;
    gap: var(--stars-gap, 0.25rem);
  }

  .star {
    position: relative;
    height: 1em;
    width: 1em;
    font-size: var(--star-size, clamp(3rem, 12vw, 4rem));
    color: var(--star-color, var(--level-bg-light));
  }

  :global(.high-contrast) .star {
    color: #444;
  }

  .label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    margin-top: 0.1em;
    font-size: var(--star-label-size, clamp(1.5rem, 6vw, 2rem));
    z-index: 1;
    color: var(--star-label-color, white);
    mix-blend-mode: var(--star-label-mix-blend-mode, overlay);
  }

  .active:nth-child(1) {
    color: var(--star-active-color, #cd7f32);
  }

  .active:nth-child(2) {
    color: var(--star-active-color, #c0c0c0);
  }

  .active:nth-child(3) {
    color: var(--star-active-color, #ffd700);
  }

  .active svg,
  .active .label {
    mix-blend-mode: unset;
    text-shadow: var(--star-label-active-text-shadow, 2px 2px 0 var(--level-bg), -2px 2px 0 var(--level-bg), -2px -2px 0 var(--level-bg), 2px -2px 0 var(--level-bg));
  }

  .active .label {
    color: var(--star-label-active-color, white);
  }
</style>
