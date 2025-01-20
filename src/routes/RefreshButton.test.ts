import { fireEvent, render, waitFor } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"

import RefreshButton from "./RefreshButton.svelte"

describe("RefreshButton.svelte", () => {
  it("Should fire given onclick function when clicked", async() => {
    const onclick = vi.fn()
    const { getByRole } = render(RefreshButton, { onclick })

    await fireEvent.click(getByRole("button"))

    expect(onclick).toHaveBeenCalled()
  })

  it("Should apply and remove animate class after clicking", async() => {
    const { getByRole } = render(RefreshButton, { onclick: () => null })

    await fireEvent.click(getByRole("button"))

    expect(getByRole("button").classList).toContain("animate")

    await waitFor(() => {
      expect(getByRole("button").classList).not.toContain("animate")
    })
  })
})
