export const SUPPORTED_LANGUAGES = [
  "en",
  "hi",
  "bn",
  "mr",
  "ta",
  "te",
  "gu",
  "kn",
  "ml",
  "pa",
  "or",
  "as",
  "ur",
] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

export function getSelectedLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const savedLanguage = localStorage.getItem("selectedLanguage");

  if (
    savedLanguage &&
    SUPPORTED_LANGUAGES.includes(savedLanguage as Language)
  ) {
    return savedLanguage as Language;
  }

  return DEFAULT_LANGUAGE;
}

export function setSelectedLanguage(language: Language) {
  localStorage.setItem("selectedLanguage", language);
}