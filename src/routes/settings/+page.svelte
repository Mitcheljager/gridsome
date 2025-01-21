<script lang="ts">
	import { fly, scale } from "svelte/transition"
	import BackButton from "../BackButton.svelte"
	import { browser } from "$app/environment"
	import { alternativeFontKey, isUsingAlternativeFont, setAlternativeFont } from "$lib/settings"

  let useAlternativeFont = $state(browser && isUsingAlternativeFont())

  function toggleAlternativeFont(): void {
    localStorage.setItem(alternativeFontKey, useAlternativeFont.toString())
    setAlternativeFont()
  }
</script>

<div class="layout">
  <BackButton />

  <h1 in:fly={{ y: -(Math.min(window.innerWidth / 20, 40)), duration: 300 }}>Settings</h1>

  <div class="checkbox" in:scale={{ duration: 100, delay: 200, start: 0.9 }}>
    <input type="checkbox" bind:checked={useAlternativeFont} onchange={toggleAlternativeFont} id="alternative-font" />
    <label for="alternative-font">Use alternative font</label>
  </div>
</div>

<style>
  h1 {
    margin: 0;
    padding: 4rem 0 2rem 0;
    text-align: center;
    font-size: clamp(4rem, 20vw, 7rem);
  }

  .layout {
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1rem;
  }

  .checkbox {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    font-size: clamp(1.5rem, 7vw, 2.5rem);
  }

  .checkbox input {
    --size: clamp(2rem, 10vw, 3.5rem);
    appearance: none;
    flex: 0 0 var(--size);
    width: var(--size);
    height: var(--size);
    border-radius: clamp(0.5rem, 3vw, 1rem);
    margin: 0;
    background: #325763;
    transition: background-color 50ms, box-shadow 50ms;
  }

  .checkbox input:checked {
    background: black;
    box-shadow: inset 0 0 0 clamp(0.5rem, 3vw, 1rem) var(--success);
  }

  .checkbox label {
    line-height: 1.5
  }
</style>
