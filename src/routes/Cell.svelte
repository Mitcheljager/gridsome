<script lang="ts">
  interface Props { cell: number }

  const { cell } : Props = $props()
</script>

<div class="cell">{cell}</div>

<style>
  .cell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--cell-width);
    height: var(--cell-width);
    font-size: calc(var(--cell-width) * 0.5);
    padding: 1rem;
  }

  .cell::before {
    content: "";
    display: block;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);
    border-radius: calc(var(--cell-width) * 0.15);
    background: rebeccapurple;
    z-index: -1;
  }
</style>
