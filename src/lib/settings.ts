import { browser } from "$app/environment"

export const alternativeFontKey = "use-alternative-font"
export const reduceAnimationsKey = "use-reduced-animations"

export function isUsingAlternativeFont(): boolean {
  if (!browser) return false
  return localStorage.getItem(alternativeFontKey) === "true"
}

export function isUsingReduceAnimations(): boolean {
  if (!browser) return false
  return localStorage.getItem(reduceAnimationsKey) === "true"
}

export function setAlternativeFont(): void {
  document.body.classList.toggle("alternative-font", isUsingAlternativeFont())
}

export function conditionalAnimation(params: Record<string, any>): Record<string, any> {
  if (isUsingReduceAnimations()) return { duration: 0 }
  return params
}
