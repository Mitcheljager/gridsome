import { describe, expect, it } from "vitest"

import { getLevelColor } from "./utils"

describe("utils.ts", () => {
  describe("getLevelColor.ts", () => {
    it("Should return the same color for the same given key", () => {
      expect(getLevelColor("a")).toEqual(getLevelColor("a"))
    })

    it("Should return different colors for different levels", () => {
      expect(getLevelColor("a")).not.toEqual(getLevelColor("b"))
    })
  })
})
