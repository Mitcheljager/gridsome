import { fireEvent, render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"

import Control from "./Control.svelte"

describe("Control.svelte", () => {
  it("Should render given label and sign", async() => {
    const { getByLabelText, getByText } = render(Control, { label: "Some label", sign: "+", onclick: () => null })

    expect(getByText("+")).toBeTruthy()
    expect(getByLabelText("Some label")).toBeTruthy()
  })

  it("Should call given onclick function both on mousedown and touchdown", async() => {
    const onclick = vi.fn()
    const { getByRole } = render(Control, { label: "Some label", sign: "+", onclick })

    await fireEvent.mouseDown(getByRole("button"))
    expect(onclick).toHaveBeenCalledTimes(1)

    await fireEvent.touchStart(getByRole("button"))
    expect(onclick).toHaveBeenCalledTimes(2)
  })

  it("Should not call given onclick function twice when event was both mousedown and touchdown", async() => {
    const onclick = vi.fn()
    const { getByRole } = render(Control, { label: "Some label", sign: "+", onclick })

    await fireEvent.touchStart(getByRole("button"))
    await fireEvent.mouseDown(getByRole("button"))

    expect(onclick).toHaveBeenCalledTimes(1)
  })
})
