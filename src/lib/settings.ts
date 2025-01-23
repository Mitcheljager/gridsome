import { Capacitor } from "@capacitor/core"

export const alternativeFontKey = "use-alternative-font"
export const reduceAnimationsKey = "use-reduced-animations"

let reduceAnimations = false

export async function setStore(key: string, value: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    try {
      const { Preferences } = await import("@capacitor/preferences")
      Preferences.set({ key, value })
      return
    } catch(error) {
      document.body.insertAdjacentText("afterbegin", JSON.stringify(error))
    }
  }

  localStorage.setItem(key, value)
}

export async function getStore(key: string): Promise<string> {
  if (Capacitor.isNativePlatform()) {
    try {
      const { Preferences } = await import("@capacitor/preferences")
      const result = await Preferences.get({ key })
      return result.toString()
    } catch(error) {
      document.body.insertAdjacentText("afterbegin", JSON.stringify(error))
    }
  }

  return localStorage.getItem(key) || ""
}

export async function isUsingAlternativeFont(): Promise<boolean> {
  return await getStore(alternativeFontKey) === "true"
}

export async function isUsingReduceAnimations(): Promise<boolean> {
  reduceAnimations = await getStore(reduceAnimationsKey) === "true"
  return reduceAnimations
}

export async function setAlternativeFont(): Promise<void> {
  document.body.classList.toggle("alternative-font", await isUsingAlternativeFont())
}

export function conditionalAnimation(params: Record<string, any>): Record<string, any> {
  if (reduceAnimations) return { duration: 0 }
  return params
}
