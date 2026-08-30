export type LanguageCode = "hi" | "en";

export const languages = [
  {
    code: "hi",
    name: "हिंदी",
    englishName: "Hindi",
  },
  {
    code: "en",
    name: "English",
    englishName: "English",
  },
] as const;

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export function getSavedLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const saved = localStorage.getItem("selectedLanguage");

  const exists = languages.some(
    (language) => language.code === saved
  );

  if (exists) {
    return saved as LanguageCode;
  }

  return DEFAULT_LANGUAGE;
}

export function saveLanguage(language: LanguageCode): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedLanguage", language);
  }
}

export function isRTL(language: LanguageCode): boolean {
  return false;
}