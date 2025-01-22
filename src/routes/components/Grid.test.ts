import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"

import Grid from "./Grid.svelte"

describe("Grid.svelte", () => {
  it("Should render the correct number of cells for a grid size of 2", () => {
    const { container } = render(Grid, { gridSize: 2, cells: [] })
    expect(container.querySelectorAll(".cell")).toHaveLength(4)
  })

  it("Should render the correct number of cells for a grid size of 3", () => {
    const { container } = render(Grid, { gridSize: 3, cells: [] })
    expect(container.querySelectorAll(".cell")).toHaveLength(9)
  })

  it("Should render the correct number of cells for a grid size of 4", () => {
    const { container } = render(Grid, { gridSize: 4, cells: [] })
    expect(container.querySelectorAll(".cell")).toHaveLength(16)
  })

  it("Should highlight cells that match the goal", () => {
    const { container } = render(Grid, { gridSize: 2, cells: [1, 2, 3, 4], goal: [1, 1, 1, 4] })
    expect(container.querySelectorAll(".cell.active")).toHaveLength(2)
  })
})
