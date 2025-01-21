import { beforeEach, describe, expect, it } from "vitest"

import { alternativeFontKey, isUsingAlternativeFont, isUsingReduceAnimations, setAlternativeFont, conditionalAnimation, reduceAnimationsKey } from "./settings"

describe("settings.ts", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("isUsingAlternativeFont", () => {
    it("Should return false if no value is stored", () => {
      expect(isUsingAlternativeFont()).toBe(false)
    })

    it("Should true if stored value is true", () => {
      localStorage.setItem(alternativeFontKey, "true")
      expect(isUsingAlternativeFont()).toBe(true)
    })

    it("Should false if stored value is a value other than true", () => {
      localStorage.setItem(alternativeFontKey, "")
      expect(isUsingAlternativeFont()).toBe(false)

      localStorage.setItem(alternativeFontKey, "false")
      expect(isUsingAlternativeFont()).toBe(false)

      localStorage.setItem(alternativeFontKey, "test")
      expect(isUsingAlternativeFont()).toBe(false)
    })
  })

  describe("isUsingReduceAnimations", () => {
    it("Should return false if no value is stored", () => {
      expect(isUsingReduceAnimations()).toBe(false)
    })

    it("Should true if stored value is true", () => {
      localStorage.setItem(reduceAnimationsKey, "true")
      expect(isUsingReduceAnimations()).toBe(true)
    })

    it("Should false if stored value is a value other than true", () => {
      localStorage.setItem(reduceAnimationsKey, "")
      expect(isUsingReduceAnimations()).toBe(false)

      localStorage.setItem(reduceAnimationsKey, "false")
      expect(isUsingReduceAnimations()).toBe(false)

      localStorage.setItem(reduceAnimationsKey, "test")
      expect(isUsingReduceAnimations()).toBe(false)
    })
  })

  describe("setAlternativeFont", () => {
    it("Should set body class if isUsingAlternativeFont is true", () => {
      localStorage.setItem(alternativeFontKey, "true")
      setAlternativeFont()

      expect(document.body.classList).toContain("alternative-font")
    })

    it("Should not set body class if isUsingAlternativeFont is not true", () => {
      setAlternativeFont()

      expect(document.body.classList).not.toContain("alternative-font")
    })

    it("Should remove body class if isUsingAlternativeFont is not true after being true", () => {
      document.body.classList.add("alternative-font")

      localStorage.setItem(alternativeFontKey, "false")
      setAlternativeFont()

      expect(document.body.classList).not.toContain("alternative-font")
    })
  })

  describe("conditionalAnimation", () => {
    it("Should return fallback object if isUsingReduceAnimations is true", () => {
      localStorage.setItem(reduceAnimationsKey, "true")

      expect(conditionalAnimation({ key: "value" })).toEqual({ duration: 0 })
    })

    it("Should return given object if isUsingReduceAnimations is not", () => {
      expect(conditionalAnimation({ key: "value" })).toEqual({ key: "value" })
    })
  })
})
