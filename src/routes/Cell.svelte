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
    width: 100%;
    aspect-ratio: 1 / 1;
    font-size: clamp(2rem - (0.25rem * var(--grid-size)), 5vw, 5rem - (1rem * var(--grid-size)));
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
    border-radius: 1rem;
    background: rebeccapurple;
    z-index: -1;
  }
</style>
