export const alternativeFontKey = "use-alternative-font"
export const reducedAnimationsKey = "use-reduced-animations"

export function isUsingAlternativeFont(): boolean {
  return localStorage.getItem(alternativeFontKey) === "true"
}

export function isUsingReduceAnimations(): boolean {
  return localStorage.getItem(alternativeFontKey) === "true"
}

export function setAlternativeFont(): void {
  document.body.classList.toggle("alternative-font", isUsingAlternativeFont())
}

export function setReduceAnimations(): void {
  document.body.classList.toggle("reduce-animations", isUsingReduceAnimations())
}

export function conditionalAnimation(params: Record<string, any>): Record<string, any> {
  if (isUsingReduceAnimations()) return { duration: 0 }
  return params
}
