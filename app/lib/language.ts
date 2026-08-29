export type LanguageCode =
  | "hi"
  | "en"
  | "bn"
  | "mr"
  | "ta"
  | "te"
  | "gu"
  | "kn"
  | "ml"
  | "pa"
  | "or"
  | "as"
  | "ur";

export const languages = [
  { code: "hi", name: "हिंदी", englishName: "Hindi" },
  { code: "en", name: "English", englishName: "English" },
  { code: "bn", name: "বাংলা", englishName: "Bengali" },
  { code: "mr", name: "मराठी", englishName: "Marathi" },
  { code: "ta", name: "தமிழ்", englishName: "Tamil" },
  { code: "te", name: "తెలుగు", englishName: "Telugu" },
  { code: "gu", name: "ગુજરાતી", englishName: "Gujarati" },
  { code: "kn", name: "ಕನ್ನಡ", englishName: "Kannada" },
  { code: "ml", name: "മലയാളം", englishName: "Malayalam" },
  { code: "pa", name: "ਪੰਜਾਬੀ", englishName: "Punjabi" },
  { code: "or", name: "ଓଡ଼ିଆ", englishName: "Odia" },
  { code: "as", name: "অসমীয়া", englishName: "Assamese" },
  { code: "ur", name: "اردو", englishName: "Urdu" },
] as const;

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export function getSavedLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const saved = localStorage.getItem("selectedLanguage");

  const exists = languages.some((language) => language.code === saved);

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
  return language === "ur";
}