<script lang="ts">
  interface Props { cell: number }

  const { cell } : Props = $props()
</script>

<div class="cell">{cell}</div>

<style>
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 1rem;
    background: rebeccapurple;
    font-size: clamp(2.5rem - (0.25rem * var(--grid-size)), 20vw, 5rem - (1rem * var(--grid-size)));
  }
</style>
