"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  languages,
  getSavedLanguage,
  saveLanguage,
  type LanguageCode,
} from "./lib/language";
import { useLanguage } from "./lib/LanguageProvider";
import { t } from "./lib/translations";

export default function Home() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode | "">("");

  useEffect(() => {
    const savedLanguage = getSavedLanguage();
    setSelectedLanguage(savedLanguage);
    setLanguage(savedLanguage);
  }, [setLanguage]);

  const handleContinue = () => {
    if (!selectedLanguage) {
      alert("कृपया अपनी भाषा चुनें / Please select your language");
      return;
    }

    saveLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
    router.push("/auth");
  };

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🌾</div>
          <h1 className="text-4xl font-bold text-green-800">KrishiMitra</h1>
          <p className="mt-2 text-gray-600">
            Smart Agriculture • Better Decisions • Less Waste
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {t(language, "chooseLanguage")}
            </h2>
            <p className="text-gray-500 mt-2">
              Choose your preferred language
            </p>
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languages.map((languageItem) => (
              <button
                key={languageItem.code}
                type="button"
                onClick={() => {
                  setSelectedLanguage(languageItem.code);
                  setLanguage(languageItem.code);
                  saveLanguage(languageItem.code);
                }}
                className={`
                  w-full p-4 rounded-2xl border-2
                  text-left transition-all
                  ${
                    selectedLanguage === languageItem.code
                      ? "border-green-600 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-400"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      {languageItem.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {languageItem.englishName}
                    </p>
                  </div>

                  {selectedLanguage === languageItem.code && (
                    <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center">
                      ✓
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Continue */}
          <button
            type="button"
            onClick={handleContinue}
            className="w-full mt-8 py-4 rounded-2xl bg-green-700 hover:bg-green-800 text-white text-lg font-bold transition"
          >
            {t(language, "continue")} →
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          🌱 Empowering Indian Agriculture
        </p>
      </div>
    </main>
  );
}