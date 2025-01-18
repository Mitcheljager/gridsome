import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"

import Cell from "./Cell.svelte"

describe("Cell.svelte", () => {
  it("Should display the given number reactively", () => {
    const { getByText } = render(Cell, { cell: 2 })

    expect(getByText(2)).toBeTruthy()
  })

  it("Should have active class when given", () => {
    const { getByText } = render(Cell, { cell: 2, active: true })

    expect(getByText(2).parentElement!.classList).toContain("active")
  })
})
