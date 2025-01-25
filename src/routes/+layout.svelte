<script>
  import "$lib/global.css"
	import { setAlternativeFont, setHighContrast, setReduceAnimations } from "$lib/settings"
	import { Capacitor } from "@capacitor/core"
	import { onMount } from "svelte"

  const { children } = $props()

  onMount(async() => {
    setAlternativeFont()
    setReduceAnimations()
    setHighContrast()

    if (!Capacitor.isNativePlatform()) return

    const { AndroidFullScreen } = await import("@awesome-cordova-plugins/android-full-screen")
    AndroidFullScreen.isImmersiveModeSupported().then(() => AndroidFullScreen.immersiveMode())

    const { StatusBar } = await import("@capacitor/status-bar")
    await StatusBar.hide()

    const { ScreenOrientation } = await import("@capacitor/screen-orientation")
    await ScreenOrientation.lock({ orientation: "portrait" })

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
