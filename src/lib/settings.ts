import { Preferences } from "@capacitor/preferences"

export const alternativeFontKey = "use-alternative-font"
export const reduceAnimationsKey = "use-reduced-animations"
export const highContrastKey = "use-high-contrast"
export const disableAudioKey = "disable-audio"
export const disableHapticsKey = "disable-haptics"

export async function setStore(key: string, value: string): Promise<void> {
  Preferences.set({ key, value })
}

export async function getStore(key: string): Promise<string> {
  const result = await Preferences.get({ key })
  return result.value || ""
}

export async function isUsingAlternativeFont(): Promise<boolean> {
  return await getStore(alternativeFontKey) === "true"
}

export async function isUsingReduceAnimations(): Promise<boolean> {
  return await getStore(reduceAnimationsKey) === "true"
}

export async function isUsingHighContrast(): Promise<boolean> {
  return await getStore(highContrastKey) === "true"
}

export async function isUsingDisableAudio(): Promise<boolean> {
  return await getStore(disableAudioKey) === "true"
}

export async function isUsingDisableHaptics(): Promise<boolean> {
  return await getStore(disableHapticsKey) === "true"
}

export async function setAlternativeFont(): Promise<void> {
  document.body.classList.toggle("alternative-font", await isUsingAlternativeFont())
}

export async function setReduceAnimations(): Promise<void> {
  document.body.classList.toggle("reduce-animations", await isUsingReduceAnimations())
}

export async function setHighContrast(): Promise<void> {
  document.body.classList.toggle("high-contrast", await isUsingHighContrast())
}

export function conditionalAnimation(params: Record<string, any>): Record<string, any> {
  if (document.body.classList.contains("reduce-animations")) return { duration: 0 }
  return params
}
