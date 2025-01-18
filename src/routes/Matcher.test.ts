import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"

import Matcher from "./Matcher.svelte"

describe("Matcher.svelte", () => {
  it("Should render given goal", () => {
    const { container, getByText } = render(Matcher, { cells: [1, 1, 1, 1], goal: [1, 2, 3, 4], gridSize: 2, onmatch: () => null })

    expect(container.querySelectorAll(".cell")).toHaveLength(4)
    expect(getByText(1)).toBeTruthy()
    expect(getByText(2)).toBeTruthy()
    expect(getByText(3)).toBeTruthy()
    expect(getByText(4)).toBeTruthy()
  })

  it("Should call onmatch function when cells and goal match", () => {
    const onmatch = vi.fn()
    render(Matcher, { cells: [1, 2, 3, 4], goal: [1, 2, 3, 4], gridSize: 2, onmatch })

    expect(onmatch).toHaveBeenCalled()
  })

  it("Should not call onmatch function when cells and goal do not match", () => {
    const onmatch = vi.fn()
    render(Matcher, { cells: [1, 2, 3, 4], goal: [1, 2, 3, 3], gridSize: 2, onmatch })

    expect(onmatch).not.toHaveBeenCalled()
  })
})
