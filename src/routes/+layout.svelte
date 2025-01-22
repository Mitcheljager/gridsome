<script>
  import "$lib/global.css"
	import { setAlternativeFont } from "$lib/settings"
	import { browser } from "$lib/utils"

  const { children } = $props()

  if (browser) setAlternativeFont()
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
