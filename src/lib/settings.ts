export const alternativeFontKey = "use-alternative-font"

export function isUsingAlternativeFont(): boolean {
  return localStorage.getItem(alternativeFontKey) === "true"
}

export function setAlternativeFont(): void {
  document.body.classList.toggle("alternative-font", isUsingAlternativeFont())
}
