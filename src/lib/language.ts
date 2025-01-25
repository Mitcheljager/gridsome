import { translations } from "./translations"

export const defaultLanguage = "en"
export const supportedLanguages = ["en", "nl"]

export let language = defaultLanguage

export function setLanguage(code: string): void {
  if (supportedLanguages.includes(code)) language = code
  else language = defaultLanguage
}

export function t(key: string): string {
  return translations[key]?.[language] || translations[key]?.[defaultLanguage] || key
}
