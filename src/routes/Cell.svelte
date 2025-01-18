<script lang="ts">
  interface Props { cell: number, active?: boolean }

  const { cell, active = false } : Props = $props()
</script>

<div class="cell" class:active style:--cell={cell}>{cell}</div>

<style>
  .cell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--cell-width);
    height: var(--cell-width);
    font-size: calc(var(--cell-width) * 0.5);
    line-height: 0.5em;
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
    border: 0.25rem solid rgb(0, 255, 191, 0);
    background: hsl(calc(280 + var(--cell) * 18), 70%, 40%);
    z-index: -1;
    transition: background-color 200ms, border 200ms;
  }

  .active {
    color: #00ffbf;
  }

  .active::before {
    border-color: rgb(0, 255, 191);
  }
</style>
