<script>
  import "$lib/global.css"
	import { setAlternativeFont } from "$lib/settings"
	import { browser } from "$lib/utils"
	import { Capacitor } from "@capacitor/core"
	import { onMount } from "svelte"

  const { children } = $props()

  if (browser) setAlternativeFont()

  onMount(async() => {
    if (!Capacitor.isNativePlatform()) return

    const { SplashScreen } = await import("@capacitor/splash-screen")
    await SplashScreen.hide()
  })
</script>

<main data-sveltekit-preload-code="viewport">
  {@render children()}
</main>

<style>
  main {
    height: 100vh;
    margin: 0 auto;
    padding-top: env(safe-area-inset-top);
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
