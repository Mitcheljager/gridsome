<script>
	import { page } from "$app/state"

  const { children } = $props()
</script>

{#key page.params.level}
  {@render children()}
{/key}
