import { beforeEach, describe, expect, it } from "vitest"

import { getStore, alternativeFontKey, isUsingAlternativeFont, isUsingReduceAnimations, setAlternativeFont, conditionalAnimation, reduceAnimationsKey, setStore, setReduceAnimations, highContrastKey, setHighContrast } from "./settings"

describe("settings.ts", () => {
  beforeEach(() => {
    localStorage.clear()
    document.body.setAttribute("class", "")
  })

  describe("setStore", () => {
    it("Should set the given key with value to localStorage", async() => {
      await setStore("Some key", "Some value")
      expect(await getStore("Some key")).toBe("Some value")
    })
  })

  describe("getStore", () => {
    it("Should return the value matching the given key", async() => {
      await setStore("Some key", "Some value")
      expect(await getStore("Some key")).toBe("Some value")
    })

    it("Should return an empty string if key was not found", async() => {
      expect(await getStore("Some key")).toBe("")
    })
  })

  describe("isUsingAlternativeFont", () => {
    it("Should return false if no value is stored", async() => {
      expect(await isUsingAlternativeFont()).toBe(false)
    })

    it("Should true if stored value is true", async() => {
      setStore(alternativeFontKey, "true")
      expect(await isUsingAlternativeFont()).toBe(true)
    })

    it("Should false if stored value is a value other than true", async() => {
      setStore(alternativeFontKey, "")
      expect(await isUsingAlternativeFont()).toBe(false)

      setStore(alternativeFontKey, "false")
      expect(await isUsingAlternativeFont()).toBe(false)

      setStore(alternativeFontKey, "test")
      expect(await isUsingAlternativeFont()).toBe(false)
    })
  })

  describe("isUsingReduceAnimations", () => {
    it("Should return false if no value is stored", async() => {
      expect(await isUsingReduceAnimations()).toBe(false)
    })

    it("Should true if stored value is true", async() => {
      setStore(reduceAnimationsKey, "true")
      expect(await isUsingReduceAnimations()).toBe(true)
    })

    it("Should false if stored value is a value other than true", async() => {
      setStore(reduceAnimationsKey, "")
      expect(await isUsingReduceAnimations()).toBe(false)

      setStore(reduceAnimationsKey, "false")
      expect(await isUsingReduceAnimations()).toBe(false)

      setStore(reduceAnimationsKey, "test")
      expect(await isUsingReduceAnimations()).toBe(false)
    })
  })

  describe("setAlternativeFont", () => {
    it("Should set body class if isUsingAlternativeFont is true", async() => {
      await setStore(alternativeFontKey, "true")
      await setAlternativeFont()

      expect(document.body.classList).toContain("alternative-font")
    })

    it("Should not set body class if isUsingAlternativeFont is not true", async() => {
      await setAlternativeFont()

      expect(document.body.classList).not.toContain("alternative-font")
    })

    it("Should remove body class if isUsingAlternativeFont is not true after being true", async() => {
      document.body.classList.add("alternative-font")

      await setStore(alternativeFontKey, "false")
      await setAlternativeFont()

      expect(document.body.classList).not.toContain("alternative-font")
    })
  })

  describe("setReduceAnimations", () => {
    it("Should set body class if isUsingReduceAnimations is true", async() => {
      await setStore(reduceAnimationsKey, "true")
      await setReduceAnimations()

      expect(document.body.classList).toContain("reduce-animations")
    })

    it("Should not set body class if isUsingReduceAnimations is not true", async() => {
      await setReduceAnimations()

      expect(document.body.classList).not.toContain("reduce-animations")
    })

    it("Should remove body class if isUsingReduceAnimations is not true after being true", async() => {
      document.body.classList.add("reduce-animations")

      await setStore(reduceAnimationsKey, "false")
      await setReduceAnimations()

      expect(document.body.classList).not.toContain("reduce-animations")
    })
  })

  describe("setHighContrast", () => {
    it("Should set body class if isUsingHighContrast is true", async() => {
      await setStore(highContrastKey, "true")
      await setHighContrast()

      expect(document.body.classList).toContain("high-contrast")
    })

    it("Should not set body class if isUsingHighContrast is not true", async() => {
      await setHighContrast()

      expect(document.body.classList).not.toContain("high-contrast")
    })

    it("Should remove body class if isUsingHighContrast is not true after being true", async() => {
      document.body.classList.add("high-contrast")

      await setStore(highContrastKey, "false")
      await setHighContrast()

      expect(document.body.classList).not.toContain("high-contrast")
    })
  })

  describe("conditionalAnimation", () => {
    it("Should return fallback object if isUsingReduceAnimations is true", async() => {
      await setStore(reduceAnimationsKey, "true")
      await setReduceAnimations()

      expect(conditionalAnimation({ key: "value" })).toEqual({ duration: 0 })
    })

    it("Should return given object if isUsingReduceAnimations is not true", () => {
      expect(conditionalAnimation({ key: "value" })).toEqual({ key: "value" })
    })
  })
})
