<script>
  import "$lib/global.css"

  const { children } = $props()
</script>

<main>
  {@render children()}
</main>

<style>
  main {
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    padding-top: env(safe-area-inset-top);
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
