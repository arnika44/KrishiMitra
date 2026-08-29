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

/*
 * Crop name translations
 *
 * IMPORTANT:
 * LocalStorage/database mein crop ka original
 * English value hi rahegi, jaise:
 *
 * wheat
 * rice
 * maize
 *
 * Sirf screen par selected language ke according
 * translated name dikhaya jayega.
 */

export const CROP_TRANSLATIONS = {
  en: {
    wheat: "Wheat",
    rice: "Rice",
    maize: "Maize",
    corn: "Corn",
    sugarcane: "Sugarcane",
    potato: "Potato",
    tomato: "Tomato",
    cotton: "Cotton",
    mustard: "Mustard",
    soybean: "Soybean",
    onion: "Onion",
    gram: "Gram",
  },

  hi: {
    wheat: "गेहूँ",
    rice: "धान",
    maize: "मक्का",
    corn: "मक्का",
    sugarcane: "गन्ना",
    potato: "आलू",
    tomato: "टमाटर",
    cotton: "कपास",
    mustard: "सरसों",
    soybean: "सोयाबीन",
    onion: "प्याज़",
    gram: "चना",
  },

  bn: {
    wheat: "গম",
    rice: "ধান",
    maize: "ভুট্টা",
    corn: "ভুট্টা",
    sugarcane: "আখ",
    potato: "আলু",
    tomato: "টমেটো",
    cotton: "তুলা",
    mustard: "সরিষা",
    soybean: "সয়াবিন",
    onion: "পেঁয়াজ",
    gram: "ছোলা",
  },

  mr: {
    wheat: "गहू",
    rice: "भात",
    maize: "मका",
    corn: "मका",
    sugarcane: "ऊस",
    potato: "बटाटा",
    tomato: "टोमॅटो",
    cotton: "कापूस",
    mustard: "मोहरी",
    soybean: "सोयाबीन",
    onion: "कांदा",
    gram: "हरभरा",
  },

  ta: {
    wheat: "கோதுமை",
    rice: "நெல்",
    maize: "மக்காச்சோளம்",
    corn: "மக்காச்சோளம்",
    sugarcane: "கரும்பு",
    potato: "உருளைக்கிழங்கு",
    tomato: "தக்காளி",
    cotton: "பருத்தி",
    mustard: "கடுகு",
    soybean: "சோயாபீன்",
    onion: "வெங்காயம்",
    gram: "கொண்டைக்கடலை",
  },

  te: {
    wheat: "గోధుమ",
    rice: "వరి",
    maize: "మొక్కజొన్న",
    corn: "మొక్కజొన్న",
    sugarcane: "చెరకు",
    potato: "బంగాళాదుంప",
    tomato: "టమాటా",
    cotton: "పత్తి",
    mustard: "ఆవాలు",
    soybean: "సోయాబీన్",
    onion: "ఉల్లిపాయ",
    gram: "శనగ",
  },

  gu: {
    wheat: "ઘઉં",
    rice: "ચોખા",
    maize: "મકાઈ",
    corn: "મકાઈ",
    sugarcane: "શેરડી",
    potato: "બટાકા",
    tomato: "ટામેટા",
    cotton: "કપાસ",
    mustard: "રાઈ",
    soybean: "સોયાબીન",
    onion: "ડુંગળી",
    gram: "ચણા",
  },

  kn: {
    wheat: "ಗೋಧಿ",
    rice: "ಭತ್ತ",
    maize: "ಮೆಕ್ಕೆಜೋಳ",
    corn: "ಮೆಕ್ಕೆಜೋಳ",
    sugarcane: "ಕಬ್ಬು",
    potato: "ಆಲೂಗಡ್ಡೆ",
    tomato: "ಟೊಮ್ಯಾಟೊ",
    cotton: "ಹತ್ತಿ",
    mustard: "ಸಾಸಿವೆ",
    soybean: "ಸೋಯಾಬೀನ್",
    onion: "ಈರುಳ್ಳಿ",
    gram: "ಕಡಲೆ",
  },

  ml: {
    wheat: "ഗോതമ്പ്",
    rice: "നെല്ല്",
    maize: "ചോളം",
    corn: "ചോളം",
    sugarcane: "കരിമ്പ്",
    potato: "ഉരുളക്കിഴങ്ങ്",
    tomato: "തക്കാളി",
    cotton: "പരുത്തി",
    mustard: "കടുക്",
    soybean: "സോയാബീൻ",
    onion: "ഉള്ളി",
    gram: "കടല",
  },

  pa: {
    wheat: "ਕਣਕ",
    rice: "ਝੋਨਾ",
    maize: "ਮੱਕੀ",
    corn: "ਮੱਕੀ",
    sugarcane: "ਗੰਨਾ",
    potato: "ਆਲੂ",
    tomato: "ਟਮਾਟਰ",
    cotton: "ਕਪਾਹ",
    mustard: "ਸਰ੍ਹੋਂ",
    soybean: "ਸੋਇਆਬੀਨ",
    onion: "ਪਿਆਜ਼",
    gram: "ਛੋਲੇ",
  },

  or: {
    wheat: "ଗହମ",
    rice: "ଧାନ",
    maize: "ମକା",
    corn: "ମକା",
    sugarcane: "ଆଖୁ",
    potato: "ଆଳୁ",
    tomato: "ଟମାଟୋ",
    cotton: "କପା",
    mustard: "ସୋରିଷ",
    soybean: "ସୋୟାବିନ",
    onion: "ପିଆଜ",
    gram: "ବୁଟ",
  },

  as: {
    wheat: "ঘেঁহু",
    rice: "ধান",
    maize: "মাকৈ",
    corn: "মাকৈ",
    sugarcane: "কুঁহিয়াৰ",
    potato: "আলু",
    tomato: "বিলাহী",
    cotton: "কপাহ",
    mustard: "সৰিয়হ",
    soybean: "ছয়াবিন",
    onion: "পিয়াঁজ",
    gram: "বুট",
  },

  ur: {
    wheat: "گندم",
    rice: "چاول",
    maize: "مکئی",
    corn: "مکئی",
    sugarcane: "گنا",
    potato: "آلو",
    tomato: "ٹماٹر",
    cotton: "کپاس",
    mustard: "سرسوں",
    soybean: "سویا بین",
    onion: "پیاز",
    gram: "چنا",
  },
} as const;

/*
 * Returns translated crop name according to
 * currently selected language.
 *
 * Example:
 *
 * getCropName("wheat", "en")
 * → Wheat
 *
 * getCropName("wheat", "hi")
 * → गेहूँ
 *
 * getCropName("wheat", "pa")
 * → ਕਣਕ
 */

export function getCropName(
  cropName: string,
  language: Language
): string {
  const cropKey = cropName.trim().toLowerCase();

  const languageCrops = CROP_TRANSLATIONS[language];

  if (cropKey in languageCrops) {
    return languageCrops[
      cropKey as keyof typeof languageCrops
    ];
  }

  return cropName;
}