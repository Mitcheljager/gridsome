<script>
  import "$lib/global.css"

  const { children } = $props()
</script>

<main>
  {@render children()}
</main>

<style>
  main {
    max-width: 600px;
  }
</style>
