
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  languages,
  getSavedLanguage,
  saveLanguage,
  type LanguageCode,
} from "./lib/language";

export default function Home() {
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode | "">("");

  useEffect(() => {
    const savedLanguage = getSavedLanguage();
    setSelectedLanguage(savedLanguage);
  }, []);

  const handleContinue = () => {
    if (!selectedLanguage) {
      alert("कृपया अपनी भाषा चुनें / Please select your language");
      return;
    }

    saveLanguage(selectedLanguage);
    router.push("/auth");
  };

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">
            🌾
          </div>

          <h1 className="text-4xl font-bold text-green-800">
            KrishiMitra
          </h1>

          <p className="mt-2 text-gray-600">
            Smart Agriculture • Better Decisions • Less Waste
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              अपनी भाषा चुनें
            </h2>

            <p className="text-gray-500 mt-2">
              Choose your preferred language
            </p>
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() =>
                  setSelectedLanguage(language.code)
                }
                className={`
                  w-full p-4 rounded-2xl border-2
                  text-left transition-all
                  ${
                    selectedLanguage === language.code
                      ? "border-green-600 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-400"
                  }
                `}
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      {language.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {language.englishName}
                    </p>
                  </div>

                  {selectedLanguage === language.code && (
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
            आगे बढ़ें → Continue
          </button>

        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          🌱 Empowering Indian Agriculture
        </p>

      </div>
    </main>
  );
}