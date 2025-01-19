import { beforeEach, describe, expect, it } from "vitest"

import { getCompletedLevels, completedLevelsKey, completeLevel, getCompletedLevel } from "./game"

describe("game.ts", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("getCompletedLevels", () => {
    it("Should return empty array no localstorage item was found", () => {
      expect(getCompletedLevels()).toEqual([])
    })

    it("Should return empty array if localstorage item was found but is falsey", () => {
      localStorage.setItem(completedLevelsKey, "")
      expect(getCompletedLevels()).toEqual([])
    })

    it("Should return empty array if localstorage item was found and is empty array", () => {
      localStorage.setItem(completedLevelsKey, "[]")
      expect(getCompletedLevels()).toEqual([])
    })

    it("Should return array of CompletedLevel items when localstorage contains correct item", () => {
      localStorage.setItem(completedLevelsKey, "[{ \"id\": \"1\", \"score\": 0 }]")
      expect(getCompletedLevels()).toEqual([{ id: "1", score: 0 }])
    })
  })

  describe("completeLevel", () => {
    it("Should create new item and add given data if no localstorage item exists", () => {
      completeLevel("1", 2)
      expect(localStorage.getItem(completedLevelsKey)).toBe("[{\"id\":\"1\",\"score\":2}]")
    })

    it("Should use previous item score if it is lower than the newly given one", () => {
      completeLevel("1", 3)
      completeLevel("1", 5)

      expect(localStorage.getItem(completedLevelsKey)).toBe("[{\"id\":\"1\",\"score\":3}]")
    })

    it("Should leave other items intact", () => {
      completeLevel("2", 3)
      completeLevel("1", 5)

      expect(localStorage.getItem(completedLevelsKey)).toBe("[{\"id\":\"2\",\"score\":3},{\"id\":\"1\",\"score\":5}]")
    })
  })

  describe("getCompletedLevel", () => {
    it("Should return null when no completed level is found", () => {
      expect(getCompletedLevel("1")).toBeNull()
    })

    it("Should return null if it id is not in localstorage item", () => {
      localStorage.setItem(completedLevelsKey, "[{ \"id\": \"1\", \"score\": 0 }]")
      expect(getCompletedLevel("2")).toBeNull()
    })

    it("Should return completed level if it is in localstorage item", () => {
      localStorage.setItem(completedLevelsKey, "[{ \"id\": \"2\", \"score\": 0 }, { \"id\": \"1\", \"score\": 0 }]")
      expect(getCompletedLevel("1")).toEqual({ id: "1", score: 0 })
    })
  })
})
