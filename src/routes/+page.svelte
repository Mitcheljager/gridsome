<script lang="ts">
	import Grid from "./Grid.svelte"

  let gridSize = 2
  let cells = $state([0, 1, 1, 0])
</script>

<button onclick={() => cells = cells.map(c => c + 1)}>Add</button>
<button onclick={() => cells = cells.map(c => c - 1)}>Subtract</button>

<Grid {cells} size={gridSize} />
