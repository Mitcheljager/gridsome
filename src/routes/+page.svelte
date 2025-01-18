<script lang="ts">
	import Controls from "./Controls.svelte"
	import Grid from "./Grid.svelte"

  const gridSize = 3
  const maxCellValue = 3

  let cells = $state(Array(gridSize * gridSize).fill(0))
</script>

<Controls {gridSize} {maxCellValue} {cells} onchange={(value): void => { cells = value }} />

<Grid {cells} {gridSize} />
