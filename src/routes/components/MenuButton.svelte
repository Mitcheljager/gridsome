<script>
	import { t } from "$lib/language"
	import { conditionalAnimation } from "$lib/settings"
  import { fade } from "svelte/transition"
	import { haptics } from "../actions/haptics.svelte"
	import { tap } from "../actions/tap.svelte"
</script>

<a use:haptics use:tap href="/" aria-label={t("Return To Main Menu")} in:fade|global={conditionalAnimation({ duration: 300, delay: 200 })}>
  <div class="line"></div>
  <div class="line"></div>
  <div class="line"></div>
</a>

<style>
  a {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: absolute;
    padding: 1rem;
    top: var(--env-safe-area-inset-top, env(safe-area-inset-top, 0px));
    right: 0;
    width: clamp(4rem, 15vw, 5rem);
    height: clamp(4rem, 15vw, 5rem);
    mix-blend-mode: overlay;
  }

  a:hover,
  a:active {
    mix-blend-mode: initial;
  }

  .line {
    width: 100%;
    height: 1rem;
    border-radius: clamp(0.15rem, 0.75vw, 0.25rem);
    background: white;
    transition: translate 100ms;
  }

  a:active .line {
    transform: scale(0.85);
  }
</style>
