<script lang="ts">
	import { onMount } from "svelte"
	import { fly, scale } from "svelte/transition"
	import { alternativeFontKey, conditionalAnimation, disableAudioKey, disableHapticsKey, highContrastKey, isUsingAlternativeFont, isUsingDisableAudio, isUsingDisableHaptics, isUsingHighContrast, isUsingReduceAnimations, reduceAnimationsKey, setAlternativeFont, setHighContrast, setReduceAnimations, setStore } from "$lib/settings"
	import { t } from "$lib/language"
	import BackButton from "../components/BackButton.svelte"
	import { haptics } from "../actions/haptics.svelte"
	import { tap } from "../actions/tap.svelte"

  let useAlternativeFont = $state(false)
  let useReduceAnimations = $state(false)
  let useHighContrast = $state(false)
  let useDisableAudio = $state(false)
  let useDisableHaptics = $state(false)

  onMount(async() => {
    useAlternativeFont = await isUsingAlternativeFont()
    useReduceAnimations = await isUsingReduceAnimations()
    useHighContrast = await isUsingHighContrast()
    useDisableAudio = await isUsingDisableAudio()
    useDisableHaptics = await isUsingDisableHaptics()
  })

  async function toggleAlternativeFont(): Promise<void> {
    await setStore(alternativeFontKey, useAlternativeFont.toString())
    setAlternativeFont()
  }

  async function toggleReduceAnimations(): Promise<void> {
    await setStore(reduceAnimationsKey, useReduceAnimations.toString())
    setReduceAnimations()
  }

  async function toggleHighContrast(): Promise<void> {
    await setStore(highContrastKey, useHighContrast.toString())
    setHighContrast()
  }

  async function toggleDisableAudio(): Promise<void> {
    await setStore(disableAudioKey, useDisableAudio.toString())
  }

  async function toggleDisableHaptics(): Promise<void> {
    await setStore(disableHapticsKey, useDisableHaptics.toString())
  }
</script>

<div class="layout">
  <BackButton />

  <h1
    class:small={t("Settings").length > 10}
    in:fly={conditionalAnimation({ y: -(Math.min(window.innerWidth / 20, 40)), duration: 300 })}>
    {t("Settings")}
  </h1>

  <div use:haptics use:tap={{ src: "/audio/tap-sharp.mp3" }} class="checkbox" in:scale={conditionalAnimation({ duration: 100, delay: 500, start: 0.9 })}>
    <input type="checkbox" bind:checked={useDisableAudio} onchange={toggleDisableAudio} id="disable-audio" />
    <label for="disable-audio">{t("Disable Audio")}</label>
  </div>

  <div use:haptics use:tap={{ src: "/audio/tap-sharp.mp3" }} class="checkbox" in:scale={conditionalAnimation({ duration: 100, delay: 500, start: 0.9 })}>
    <input type="checkbox" bind:checked={useDisableHaptics} onchange={toggleDisableHaptics} id="disable-haptics" />
    <label for="disable-haptics">{t("Disable Haptics")}</label>
  </div>

  <div use:haptics use:tap={{ src: "/audio/tap-sharp.mp3" }} class="checkbox" in:scale={conditionalAnimation({ duration: 100, delay: 200, start: 0.9 })}>
    <input type="checkbox" bind:checked={useAlternativeFont} onchange={toggleAlternativeFont} id="alternative-font" />
    <label for="alternative-font">{t("Use Alternative Font")}</label>
  </div>

  <div use:haptics use:tap={{ src: "/audio/tap-sharp.mp3" }} class="checkbox" in:scale={conditionalAnimation({ duration: 100, delay: 300, start: 0.9 })}>
    <input type="checkbox" bind:checked={useReduceAnimations} onchange={toggleReduceAnimations} id="reduce-animations" />
    <label for="reduce-animations">{t("Reduce Animations")}</label>
  </div>

  <div use:haptics use:tap={{ src: "/audio/tap-sharp.mp3" }} class="checkbox" in:scale={conditionalAnimation({ duration: 100, delay: 400, start: 0.9 })}>
    <input type="checkbox" bind:checked={useHighContrast} onchange={toggleHighContrast} id="high-contrast" />
    <label for="high-contrast">{t("Use High Contrast")}</label>
  </div>
</div>

<style>
  h1 {
    margin: 0;
    padding: 4rem 0 2rem 0;
    text-align: center;
    font-size: clamp(4rem, 20vw, 7rem);
  }

  h1.small {
    font-size: clamp(2.5rem, 10vw, 5rem);
  }

  .layout {
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--env-safe-area-inset-top, env(safe-area-inset-top, 0px)) 1rem;
  }

  .checkbox {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem
  }

  .checkbox input {
    --size: clamp(2rem, 8vw, 3rem);
    appearance: none;
    flex: 0 0 var(--size);
    width: var(--size);
    height: var(--size);
    border-radius: clamp(0.5rem, 3vw, 1rem);
    margin: 0;
    background: #325763;
    transition: background-color 50ms, box-shadow 50ms;
  }

  :global(.high-contrast) .checkbox input {
    background: #666;
  }

  .checkbox input:checked {
    background: black;
    box-shadow: inset 0 0 0 clamp(0.5rem, 3vw, 1rem) var(--success);
  }

  .checkbox label {
    margin-top: 0.125em;
    font-size: clamp(1.5rem, 5vw, 2rem);
    line-height: 1.15;
  }
</style>
