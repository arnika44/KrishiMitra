"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

type LanguageCode = "en" | "hi";

type Translation = {
  backTo: string;
  storageTitle: string;
  storageDescription: string;

  important: string;
  importantDescription: string;

  basicStorageRequirements: string;

  dryCropTitle: string;
  dryCropDescription: string;

  cleanStorageTitle: string;
  cleanStorageDescription: string;

  controlMoistureTitle: string;
  controlMoistureDescription: string;

  ventilationTitle: string;
  ventilationDescription: string;

  storageOptions: string;

  traditionalTitle: string;
  traditionalDescription: string;

  grainBagsTitle: string;
  grainBagsDescription: string;

  airtightTitle: string;
  airtightDescription: string;

  storageChecklist: string;

  checklistDry: string;
  checklistClean: string;
  checklistPests: string;
  checklistLeakage: string;
  checklistBags: string;
  checklistFloor: string;
  checklistRegular: string;

  storagePests: string;
  storagePestsDescription: string;

  bottomTitle: string;
  bottomDescription: string;
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations: Record<LanguageCode, Translation> = {
  en: {
    backTo: "Back to",

    storageTitle: "Storage & Preservation",
    storageDescription:
      "Store your harvested crop safely and reduce post-harvest losses.",

    important: "Important",
    importantDescription:
      "Proper drying, cleaning and storage conditions help protect the crop from moisture, insects, fungus and quality loss.",

    basicStorageRequirements: "Basic Storage Requirements",

    dryCropTitle: "Dry the Crop Properly",
    dryCropDescription:
      "Make sure harvested grain is properly dried before placing it into long-term storage.",

    cleanStorageTitle: "Clean Before Storage",
    cleanStorageDescription:
      "Remove damaged grains, plant material, dust and other unwanted material before storage.",

    controlMoistureTitle: "Control Moisture",
    controlMoistureDescription:
      "Keep stored grain protected from rain, humidity, leaks and ground moisture.",

    ventilationTitle: "Keep Storage Ventilated",
    ventilationDescription:
      "Good ventilation helps prevent excessive heat and moisture buildup inside the storage area.",

    storageOptions: "Storage Options",

    traditionalTitle: "Traditional Room / Godown",
    traditionalDescription:
      "Keep the storage room clean, dry and free from cracks or openings through which insects and rodents can enter.",

    grainBagsTitle: "Grain Bags",
    grainBagsDescription:
      "Use clean and suitable bags. Keep bags raised above the floor and away from walls to reduce moisture exposure.",

    airtightTitle: "Airtight Containers",
    airtightDescription:
      "Suitable airtight containers can help protect stored grain from insects and moisture when properly prepared and maintained.",

    storageChecklist: "Storage Checklist",

    checklistDry: "Crop is properly dried",
    checklistClean: "Storage area is clean",
    checklistPests: "No visible insects or pests",
    checklistLeakage: "No water leakage",
    checklistBags: "Bags/containers are clean",
    checklistFloor: "Crop is kept away from the floor",
    checklistRegular: "Storage area is checked regularly",

    storagePests: "Watch for Storage Pests",
    storagePestsDescription:
      "Regularly check for insects, rodents, unusual smell, damaged grains, moisture or fungal growth. If you notice a serious infestation, seek advice from a qualified agricultural expert before using any chemical treatment.",

    bottomTitle: "Good storage = Better crop quality + Less loss",
    bottomDescription:
      "Check your stored crop regularly throughout the storage period.",
  },

  hi: {
    backTo: "वापस जाएं",

    storageTitle: "भंडारण और संरक्षण",
    storageDescription:
      "अपनी कटाई की गई फसल को सुरक्षित रखें और कटाई के बाद होने वाले नुकसान को कम करें।",

    important: "महत्वपूर्ण",
    importantDescription:
      "उचित सुखाने, सफाई और भंडारण की स्थिति फसल को नमी, कीड़ों, फफूंद और गुणवत्ता में कमी से बचाने में मदद करती है।",

    basicStorageRequirements: "भंडारण की मूल आवश्यकताएं",

    dryCropTitle: "फसल को अच्छी तरह सुखाएं",
    dryCropDescription:
      "लंबे समय तक भंडारण में रखने से पहले सुनिश्चित करें कि कटाई किया गया अनाज अच्छी तरह सूखा हुआ हो।",

    cleanStorageTitle: "भंडारण से पहले सफाई करें",
    cleanStorageDescription:
      "भंडारण से पहले खराब अनाज, पौधों के अवशेष, धूल और अन्य अनचाही सामग्री को हटा दें।",

    controlMoistureTitle: "नमी नियंत्रित करें",
    controlMoistureDescription:
      "भंडारित अनाज को बारिश, नमी, पानी के रिसाव और जमीन की नमी से सुरक्षित रखें।",

    ventilationTitle: "भंडारण स्थान में हवा का आवागमन रखें",
    ventilationDescription:
      "अच्छा वेंटिलेशन भंडारण स्थान के अंदर अत्यधिक गर्मी और नमी जमा होने से बचाने में मदद करता है।",

    storageOptions: "भंडारण के विकल्प",

    traditionalTitle: "पारंपरिक कमरा / गोदाम",
    traditionalDescription:
      "भंडारण स्थान को साफ और सूखा रखें तथा उसमें ऐसी दरारें या खुले स्थान न हों जिनसे कीड़े और चूहे अंदर आ सकें।",

    grainBagsTitle: "अनाज की बोरियां",
    grainBagsDescription:
      "साफ और उपयुक्त बोरियों का उपयोग करें। नमी से बचाने के लिए बोरियों को जमीन से ऊपर और दीवारों से दूर रखें।",

    airtightTitle: "हवा बंद कंटेनर",
    airtightDescription:
      "उचित रूप से तैयार और रखरखाव किए गए हवा बंद कंटेनर भंडारित अनाज को कीड़ों और नमी से बचाने में मदद कर सकते हैं।",

    storageChecklist: "भंडारण चेकलिस्ट",

    checklistDry: "फसल अच्छी तरह सूखी हुई है",
    checklistClean: "भंडारण स्थान साफ है",
    checklistPests: "कोई दिखाई देने वाले कीड़े या कीट नहीं हैं",
    checklistLeakage: "पानी का कोई रिसाव नहीं है",
    checklistBags: "बोरियां/कंटेनर साफ हैं",
    checklistFloor: "फसल को जमीन से दूर रखा गया है",
    checklistRegular: "भंडारण स्थान की नियमित जांच की जाती है",

    storagePests: "भंडारण के कीड़ों से सावधान रहें",
    storagePestsDescription:
      "कीड़ों, चूहों, असामान्य गंध, खराब अनाज, नमी या फफूंद की नियमित जांच करें। यदि गंभीर संक्रमण दिखाई दे तो किसी भी रासायनिक उपचार का उपयोग करने से पहले योग्य कृषि विशेषज्ञ से सलाह लें।",

    bottomTitle: "अच्छा भंडारण = बेहतर फसल गुणवत्ता + कम नुकसान",
    bottomDescription:
      "पूरे भंडारण समय के दौरान अपनी भंडारित फसल की नियमित जांच करते रहें।",
  },
};

/* =========================================================
   HELPER
========================================================= */

function getValidLanguage(value: string | null): LanguageCode {
  if (value === "en" || value === "hi") {
    return value;
  }

  return "en";
}

/* =========================================================
   COMPONENT
========================================================= */

export default function StoragePage() {
  const params = useParams();
  const cropId = params?.id as string;

  const [language, setLanguage] =
    useState<LanguageCode>("en");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("selectedLanguage");

    setLanguage(getValidLanguage(savedLanguage));
  }, []);

  const t = translations[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
      <div
        className="mx-auto max-w-5xl"
        dir={language === "hi" ? "ltr" : "ltr"}
      >

        {/* Back */}
        <Link
          href={`/crop/${cropId}`}
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm hover:bg-green-50"
        >
          ← {t.backTo} {cropId}
        </Link>

        {/* Header */}
        <section className="mb-6 rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white shadow-lg">
          <div className="mb-2 text-4xl">📦</div>

          <h1 className="text-3xl font-bold">
            {cropId} {t.storageTitle}
          </h1>

          <p className="mt-2 text-green-50">
            {t.storageDescription}
          </p>
        </section>

        {/* Important */}
        <section className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-yellow-800">
            ⚠️ {t.important}
          </h2>

          <p className="text-sm leading-6 text-yellow-900">
            {t.importantDescription}
          </p>
        </section>

        {/* Storage basics */}
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            🏠 {t.basicStorageRequirements}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">☀️</div>

              <h3 className="text-lg font-bold text-gray-800">
                {t.dryCropTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.dryCropDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">🧹</div>

              <h3 className="text-lg font-bold text-gray-800">
                {t.cleanStorageTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.cleanStorageDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">💧</div>

              <h3 className="text-lg font-bold text-gray-800">
                {t.controlMoistureTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.controlMoistureDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">🌬️</div>

              <h3 className="text-lg font-bold text-gray-800">
                {t.ventilationTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.ventilationDescription}
              </p>
            </div>

          </div>
        </section>

        {/* Storage options */}
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            📦 {t.storageOptions}
          </h2>

          <div className="space-y-4">

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                🏠 {t.traditionalTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.traditionalDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                🛍️ {t.grainBagsTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.grainBagsDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                🛢️ {t.airtightTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.airtightDescription}
              </p>
            </div>

          </div>
        </section>

        {/* Checklist */}
        <section className="mb-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            ✅ {t.storageChecklist}
          </h2>

          <div className="space-y-3">

            {[
              t.checklistDry,
              t.checklistClean,
              t.checklistPests,
              t.checklistLeakage,
              t.checklistBags,
              t.checklistFloor,
              t.checklistRegular,
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-green-50 p-3"
              >
                <span className="text-green-600">
                  ✓
                </span>

                <span className="text-sm font-medium text-gray-700">
                  {item}
                </span>
              </div>
            ))}

          </div>
        </section>

        {/* Pest warning */}
        <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-red-700">
            🐀 {t.storagePests}
          </h2>

          <p className="text-sm leading-6 text-red-800">
            {t.storagePestsDescription}
          </p>
        </section>

        {/* Bottom */}
        <div className="rounded-2xl bg-green-100 p-5 text-center">
          <p className="font-semibold text-green-800">
            🌾 {t.bottomTitle}
          </p>

          <p className="mt-1 text-sm text-green-700">
            {t.bottomDescription}
          </p>
        </div>

      </div>
    </main>
  );
}