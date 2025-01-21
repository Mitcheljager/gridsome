export const alternativeFontKey = "use-alternative-font"
export const reduceAnimationsKey = "use-reduced-animations"

export function isUsingAlternativeFont(): boolean {
  return localStorage.getItem(alternativeFontKey) === "true"
}

export function isUsingReduceAnimations(): boolean {
  return localStorage.getItem(reduceAnimationsKey) === "true"
}

export function setAlternativeFont(): void {
  document.body.classList.toggle("alternative-font", isUsingAlternativeFont())
}

export function conditionalAnimation(params: Record<string, any>): Record<string, any> {
  if (isUsingReduceAnimations()) return { duration: 0 }
  return params
}
