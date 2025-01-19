import { cleanup, fireEvent, render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"

import Controls from "./Controls.svelte"

describe("Controls.svelte", () => {
  it("Should display buttons relative to the grid size", () => {
    let { getAllByRole } = render(Controls, { gridSize: 1, maxCellValue: 1, cells: [], onchange: () => null })
    expect(getAllByRole("button")).toHaveLength(8)

    cleanup()

    ;({ getAllByRole } = render(Controls, { gridSize: 2, maxCellValue: 1, cells: [], onchange: () => null }))
    expect(getAllByRole("button")).toHaveLength(12)

    cleanup()

    ;({ getAllByRole } = render(Controls, { gridSize: 3, maxCellValue: 1, cells: [], onchange: () => null }))
    expect(getAllByRole("button")).toHaveLength(16)
  })

  it("Should call given onchange value when clicking any button", async() => {
    const mock = vi.fn()

    const { getAllByRole } = render(Controls, { gridSize: 1, maxCellValue: 1, cells: [1], onchange: mock })
    await fireEvent.mouseDown(getAllByRole("button")[0])

    expect(mock).toHaveBeenCalledWith([1])
  })

  describe("Should update cells with expected values per button", async() => {
    it("When adding to a column", async() => {
      let cells = [1, 1, 1, 1]
      const mock = (value: number[]): void => { cells = value }

      const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

      await fireEvent.mouseDown(getByLabelText("Add to column 1"))
      expect(cells).toEqual([2, 1, 2, 1])
    })

    it("When Subtracting from a column", async() => {
      let cells = [2, 2, 2, 2]
      const mock = (value: number[]): void => { cells = value }

      const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

      await fireEvent.mouseDown(getByLabelText("Subtract from column 1"))
      expect(cells).toEqual([1, 2, 1, 2])
    })

    it("When adding to a row", async() => {
      let cells = [1, 1, 1, 1]
      const mock = (value: number[]): void => { cells = value }

      const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

      await fireEvent.mouseDown(getByLabelText("Add to row 1"))
      expect(cells).toEqual([2, 2, 1, 1])
    })

    it("When subtracting from a row", async() => {
      let cells = [2, 2, 2, 2]
      const mock = (value: number[]): void => { cells = value }

      const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

      await fireEvent.mouseDown(getByLabelText("Subtract from row 1"))
      expect(cells).toEqual([1, 1, 2, 2])
    })

    it("When adding to main diagonal", async() => {
      let cells = [1, 1, 1, 1]
      const mock = (value: number[]): void => { cells = value }

      const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

      await fireEvent.mouseDown(getByLabelText("Add to main diagonal"))
      expect(cells).toEqual([2, 1, 1, 2])
    })

    it("When subtracting from main diagonal", async() => {
      let cells = [2, 2, 2, 2]
      const mock = (value: number[]): void => { cells = value }

      const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

      await fireEvent.mouseDown(getByLabelText("Subtract from main diagonal"))
      expect(cells).toEqual([1, 2, 2, 1])
    })

    it("When adding to anti diagonal", async() => {
      let cells = [1, 1, 1, 1]
      const mock = (value: number[]): void => { cells = value }

      const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

      await fireEvent.mouseDown(getByLabelText("Add to anti diagonal"))
      expect(cells).toEqual([1, 2, 2, 1])
    })

    it("When subtracting from anti diagonal", async() => {
      let cells = [2, 2, 2, 2]
      const mock = (value: number[]): void => { cells = value }

      const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

      await fireEvent.mouseDown(getByLabelText("Subtract from anti diagonal"))
      expect(cells).toEqual([2, 1, 1, 2])
    })
  })

  it("Should rollover when value is higher than maxCellValue", async() => {
    let cells = [3, 1, 1, 1]
    const mock = (value: number[]): void => { cells = value }

    const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

    await fireEvent.mouseDown(getByLabelText("Add to row 1"))
    expect(cells).toEqual([1, 2, 1, 1])
  })

  it("Should rollover when value is lower than 1", async() => {
    let cells = [1, 2, 1, 1]
    const mock = (value: number[]): void => { cells = value }

    const { getByLabelText } = render(Controls, { gridSize: 2, maxCellValue: 3, cells, onchange: mock })

    await fireEvent.mouseDown(getByLabelText("Subtract from row 1"))
    expect(cells).toEqual([3, 1, 1, 1])
  })
})
