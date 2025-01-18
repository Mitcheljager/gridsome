<script>
  import "$lib/global.css"

  const { children } = $props()

    // afterNavigate(({ from }) => {
    //   if (browser && from) document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 20%, 12%)`
    // })
</script>

<main>
  {@render children()}
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
