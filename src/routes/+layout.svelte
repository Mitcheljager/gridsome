<script>
  import "$lib/global.css"
	import { setAlternativeFont, setReduceAnimations } from "$lib/settings"
	import { Capacitor } from "@capacitor/core"
	import { onMount } from "svelte"

  const { children } = $props()

  onMount(async() => {
    setAlternativeFont()
    setReduceAnimations()

    if (!Capacitor.isNativePlatform()) return

    const { SplashScreen } = await import("@capacitor/splash-screen")
    await SplashScreen.hide()

    const { StatusBar } = await import("@capacitor/status-bar")
    await StatusBar.hide()

    const { AndroidFullScreen } = await import("@awesome-cordova-plugins/android-full-screen")
    AndroidFullScreen.isImmersiveModeSupported().then(() => AndroidFullScreen.immersiveMode())
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
