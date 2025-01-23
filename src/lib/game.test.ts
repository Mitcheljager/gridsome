import { beforeEach, describe, expect, it } from "vitest"

import { getCompletedLevels, completedLevelsKey, completeLevel, getCompletedLevel } from "./game"
import { getStore, setStore } from "./settings"

describe("game.ts", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("getCompletedLevels", () => {
    it("Should return empty array if no localstorage item was found", async() => {
      expect(await getCompletedLevels()).toEqual([])
    })

    it("Should return empty array if localstorage item was found but is falsey", async() => {
      setStore(completedLevelsKey, "")
      expect(await getCompletedLevels()).toEqual([])
    })

    it("Should return empty array if localstorage item was found and is empty array", async() => {
      setStore(completedLevelsKey, "[]")
      expect(await getCompletedLevels()).toEqual([])
    })

    it("Should return array of CompletedLevel items when localstorage contains correct item", async() => {
      setStore(completedLevelsKey, "[{ \"id\": \"1\", \"score\": 0 }]")
      expect(await getCompletedLevels()).toEqual([{ id: "1", score: 0 }])
    })
  })

  describe("completeLevel", () => {
    it("Should create new item and add given data if no localstorage item exists", async() => {
      await completeLevel("1", 2)
      expect(await getStore(completedLevelsKey)).toBe("[{\"id\":\"1\",\"score\":2}]")
    })

    it("Should use previous item score if it is lower than the newly given one", async() => {
      await completeLevel("1", 3)
      await completeLevel("1", 5)

      expect(await getStore(completedLevelsKey)).toBe("[{\"id\":\"1\",\"score\":3}]")
    })

    it("Should leave other items intact", async() => {
      await completeLevel("2", 3)
      await completeLevel("1", 5)

      expect(await getStore(completedLevelsKey)).toBe("[{\"id\":\"2\",\"score\":3},{\"id\":\"1\",\"score\":5}]")
    })
  })

  describe("getCompletedLevel", () => {
    it("Should return null when no completed level is found", () => {
      expect(getCompletedLevel([], "1")).toBeNull()
    })

    it("Should return null if it id is not in localstorage item", () => {
      expect(getCompletedLevel([{ id: "1", score: 0 }], "2")).toBeNull()
    })

    it("Should return completed level if it is in localstorage item", () => {
      expect(getCompletedLevel([{ id: "2", score: 0 }, { id: "1", "score": 0 }], "1")).toEqual({ id: "1", score: 0 })
    })
  })
})
