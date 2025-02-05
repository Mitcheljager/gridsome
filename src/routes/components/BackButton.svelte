<script>
	import { t } from "$lib/language"
	import { conditionalAnimation } from "$lib/settings"
  import { fly } from "svelte/transition"
	import { haptics } from "../actions/haptics.svelte"
	import { tap } from "../actions/tap.svelte"
</script>

<a use:haptics use:tap href="/" aria-label={t("Return To Main Menu")} in:fly={conditionalAnimation({ x: 20, duration: 300 })}>
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
    top: var(--env-safe-area-inset-top, env(safe-area-inset-top, 0px));
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
