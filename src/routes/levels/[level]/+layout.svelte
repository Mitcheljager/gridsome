<script>
	import { page } from "$app/state"

  const { children } = $props()
</script>

{#key page.params.id}
  {@render children()}
{/key}
