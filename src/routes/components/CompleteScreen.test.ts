import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"

import CompleteScreen from "./CompleteScreen.svelte"
import { levels } from "$lib/levels"

describe("CompleteScreen.svelte", () => {
  it("Should contain relevant links", () => {
    const { getByText } = render(CompleteScreen, { currentLevelId: levels[0].id, currentMoves: 1 })

    expect(getByText("Level select")).toBeTruthy()
    expect(getByText("Main menu")).toBeTruthy()
  })

  it("Should show link to level select if valid id was given", () => {
    const { getByText } = render(CompleteScreen, { currentLevelId: levels[0].id, currentMoves: 1 })

    expect(getByText("Next level")).toBeTruthy()
    expect((getByText("Next level") as HTMLAnchorElement).href).toContain(`/levels/${levels[1].id}`)
  })

  it("Should not show link to next level if current level is last level", () => {
    const { queryByText } = render(CompleteScreen, { currentLevelId: levels[levels.length - 1].id, currentMoves: 1 })

    expect(queryByText("Next level")).not.toBeTruthy()
  })

  it("Should not show link to next level if given id is not valid", () => {
    const { queryByText } = render(CompleteScreen, { currentLevelId: "", currentMoves: 1 })

    expect(queryByText("Next level")).not.toBeTruthy()
  })
})
