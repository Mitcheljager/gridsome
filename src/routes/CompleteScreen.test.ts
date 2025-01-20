import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"

import CompleteScreen from "./CompleteScreen.svelte"

describe("CompleteScreen.svelte", () => {
  it("Should contain relevant links", () => {
    const { getByText } = render(CompleteScreen)

    expect(getByText("Next level")).toBeTruthy()
    expect(getByText("Level select")).toBeTruthy()
    expect(getByText("Main menu")).toBeTruthy()
  })
})
