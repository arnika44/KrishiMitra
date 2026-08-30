"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

type LanguageCode = "en" | "hi";

type Crop = {
  id: number | string;
  crop: string;
  season: string;
  land: number | string;
};

type IrrigationAdvice = {
  water: string;
  frequency: string;
  bestTime: string;
  warning: string;
};

type Translation = {
  title: string;
  loading: string;
  loadingDesc: string;
  cropNotFound: string;
  backToCrops: string;
  backTo: string;
  season: string;
  landArea: string;
  irrigation: string;
  recommendation: string;
  whenToIrrigate: string;
  bestTime: string;
  avoidOverwatering: string;
  waterManagement: string;

  checkSoil: string;
  checkSoilDesc: string;

  checkRainfall: string;
  checkRainfallDesc: string;

  avoidWastage: string;
  avoidWastageDesc: string;

  cropStage: string;
  cropStageDesc: string;

  cropDetails: string;
  crop: string;
  acres: string;

  genericWater: string;
  genericFrequency: string;
  genericBestTime: string;
  genericWarning: string;
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations: Record<LanguageCode, Translation> = {
  en: {
    title: "Irrigation",
    loading: "Loading irrigation information...",
    loadingDesc: "Please wait...",
    cropNotFound: "Crop not found",
    backToCrops: "Back to crops",
    backTo: "Back to",
    season: "Season",
    landArea: "Land area",
    irrigation: "Irrigation",
    recommendation: "Irrigation Recommendation",
    whenToIrrigate: "When to Irrigate",
    bestTime: "Best Time",
    avoidOverwatering: "Avoid Overwatering",
    waterManagement: "Water Management Tips",

    checkSoil: "Check Soil Moisture",
    checkSoilDesc:
      "Check the soil moisture before irrigation. If the soil already has enough moisture, avoid unnecessary watering.",

    checkRainfall: "Check Rainfall",
    checkRainfallDesc:
      "If rain is expected, reduce or delay irrigation to avoid unnecessary water use.",

    avoidWastage: "Avoid Water Wastage",
    avoidWastageDesc:
      "Use efficient irrigation methods such as drip, sprinkler, furrow or other suitable methods where practical.",

    cropStage: "Consider Crop Stage",
    cropStageDesc:
      "Water requirements can change as the crop grows. Adjust irrigation according to the crop stage, soil and weather conditions.",

    cropDetails: "Crop Details",
    crop: "Crop",
    acres: "acres",

    genericWater:
      "Irrigation needs depend on the crop, soil type, weather, rainfall and crop growth stage. Maintain suitable soil moisture without keeping the field unnecessarily wet.",

    genericFrequency:
      "Do not depend only on a fixed schedule. Check soil moisture regularly and irrigate when the crop actually needs water.",

    genericBestTime:
      "Early morning or evening is generally a good time for irrigation because it can reduce water loss from evaporation.",

    genericWarning:
      "Avoid excessive irrigation and prolonged waterlogging. Too much moisture can reduce root health and may increase the risk of root diseases.",
  },

  hi: {
    title: "सिंचाई",
    loading: "सिंचाई की जानकारी लोड हो रही है...",
    loadingDesc: "कृपया प्रतीक्षा करें...",
    cropNotFound: "फसल नहीं मिली",
    backToCrops: "फसलों पर वापस जाएं",
    backTo: "वापस जाएं",
    season: "मौसम",
    landArea: "भूमि क्षेत्र",
    irrigation: "सिंचाई",
    recommendation: "सिंचाई की सलाह",
    whenToIrrigate: "सिंचाई कब करें",
    bestTime: "सबसे अच्छा समय",
    avoidOverwatering: "अधिक पानी देने से बचें",
    waterManagement: "जल प्रबंधन सुझाव",

    checkSoil: "मिट्टी की नमी जांचें",
    checkSoilDesc:
      "सिंचाई से पहले मिट्टी की नमी जांचें। यदि मिट्टी में पर्याप्त नमी है तो अनावश्यक पानी न दें।",

    checkRainfall: "बारिश की जांच करें",
    checkRainfallDesc:
      "यदि बारिश की संभावना है तो पानी बचाने के लिए सिंचाई कम करें या कुछ समय के लिए रोक दें।",

    avoidWastage: "पानी की बर्बादी रोकें",
    avoidWastageDesc:
      "जहां संभव हो, ड्रिप, स्प्रिंकलर, फरो या अन्य उपयुक्त सिंचाई विधियों का उपयोग करें।",

    cropStage: "फसल की अवस्था देखें",
    cropStageDesc:
      "फसल की वृद्धि के साथ पानी की आवश्यकता बदल सकती है। फसल की अवस्था, मिट्टी और मौसम के अनुसार सिंचाई करें।",

    cropDetails: "फसल की जानकारी",
    crop: "फसल",
    acres: "एकड़",

    genericWater:
      "सिंचाई की आवश्यकता फसल, मिट्टी, मौसम, बारिश और फसल की अवस्था पर निर्भर करती है। मिट्टी में उचित नमी बनाए रखें और खेत को अनावश्यक रूप से गीला न रखें।",

    genericFrequency:
      "केवल निश्चित समय-सारणी पर निर्भर न रहें। मिट्टी की नमी नियमित रूप से जांचें और जरूरत होने पर ही सिंचाई करें।",

    genericBestTime:
      "सुबह जल्दी या शाम को सिंचाई करना सामान्यतः अच्छा समय होता है क्योंकि इससे वाष्पीकरण से होने वाली पानी की हानि कम हो सकती है।",

    genericWarning:
      "अधिक सिंचाई और लंबे समय तक पानी जमा रहने से बचें। ज्यादा नमी जड़ों को नुकसान पहुंचा सकती है और जड़ संबंधी रोगों का खतरा बढ़ा सकती है।",
  },
};

/* =========================================================
   FALLBACK LANGUAGE
========================================================= */

const defaultLanguage: LanguageCode = "en";

/* =========================================================
   HELPER
========================================================= */

function getValidLanguage(value: string | null): LanguageCode {
  if (value === "en" || value === "hi") {
    return value;
  }

  return defaultLanguage;
}

/* =========================================================
   IRRIGATION PAGE
========================================================= */

export default function IrrigationPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] = useState<LanguageCode>("en");
  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD LANGUAGE
  ======================================================= */

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    setLanguage(getValidLanguage(savedLanguage));
  }, []);

  /* =======================================================
     LOAD CROP
  ======================================================= */

  useEffect(() => {
    const loadCrop = () => {
      try {
        const savedCrops = localStorage.getItem("crops");

        if (!savedCrops) {
          setCrop(null);
          setLoading(false);
          return;
        }

        const crops: Crop[] = JSON.parse(savedCrops);

        const cropId = params?.id;

        const foundCrop = crops.find(
          (item) => String(item.id) === String(cropId)
        );

        setCrop(foundCrop || null);
      } catch (error) {
        console.error("Error loading crop:", error);
        setCrop(null);
      } finally {
        setLoading(false);
      }
    };

    loadCrop();
  }, [params]);

  const t = translations[language];

  /* =======================================================
     GENERIC IRRIGATION ADVICE
  ======================================================= */

  const irrigationAdvice: IrrigationAdvice = {
    water: t.genericWater,
    frequency: t.genericFrequency,
    bestTime: t.genericBestTime,
    warning: t.genericWarning,
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">💧</div>

          <h1 className="text-2xl font-bold text-green-800">
            {t.loading}
          </h1>

          <p className="text-gray-500 mt-2">
            {t.loadingDesc}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     CROP NOT FOUND
  ======================================================= */

  if (!crop) {
    return (
      <main className="min-h-screen bg-green-50 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => router.push("/crops")}
            className="mb-6 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm text-green-700 font-semibold hover:bg-green-50"
          >
            ← {t.backToCrops}
          </button>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🌱</div>

            <h1 className="text-3xl font-bold text-gray-800">
              {t.cropNotFound}
            </h1>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-green-50 px-4 py-8 md:py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}

        <button
          type="button"
          onClick={() => router.push("/crops")}
          className="mb-6 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm text-green-700 font-semibold hover:bg-green-50 transition"
        >
          ← {t.backToCrops}
        </button>

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl">
              💧
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-green-800">
                {t.title}
              </h1>

              <p className="text-gray-500 mt-1">
                {t.recommendation}
              </p>
            </div>

          </div>
        </div>

        {/* Crop Details */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            🌾 {t.cropDetails}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-green-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                {t.crop}
              </p>

              <p className="text-lg font-bold text-green-800 mt-1">
                {crop.crop}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                {t.season}
              </p>

              <p className="text-lg font-bold text-green-800 mt-1">
                {crop.season}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                {t.landArea}
              </p>

              <p className="text-lg font-bold text-green-800 mt-1">
                {crop.land} {t.acres}
              </p>
            </div>

          </div>
        </div>

        {/* Main Recommendation */}

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-6">

          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">💦</span>

            <h2 className="text-2xl font-bold text-green-800">
              {t.recommendation}
            </h2>
          </div>

          {/* Water */}

          <div className="mb-6 p-5 rounded-2xl bg-blue-50 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-800 mb-2">
              💧 {t.irrigation}
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {irrigationAdvice.water}
            </p>
          </div>

          {/* Frequency */}

          <div className="mb-6 p-5 rounded-2xl bg-green-50 border border-green-100">
            <h3 className="text-lg font-bold text-green-800 mb-2">
              🌱 {t.whenToIrrigate}
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {irrigationAdvice.frequency}
            </p>
          </div>

          {/* Best Time */}

          <div className="mb-6 p-5 rounded-2xl bg-yellow-50 border border-yellow-100">
            <h3 className="text-lg font-bold text-yellow-800 mb-2">
              🌅 {t.bestTime}
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {irrigationAdvice.bestTime}
            </p>
          </div>

          {/* Warning */}

          <div className="p-5 rounded-2xl bg-red-50 border border-red-100">
            <h3 className="text-lg font-bold text-red-700 mb-2">
              ⚠️ {t.avoidOverwatering}
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {irrigationAdvice.warning}
            </p>
          </div>

        </div>

        {/* Water Management Tips */}

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">

          <h2 className="text-2xl font-bold text-green-800 mb-6">
            🌿 {t.waterManagement}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Soil */}

            <div className="p-5 rounded-2xl bg-green-50 border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌱</span>

                <h3 className="font-bold text-green-800">
                  {t.checkSoil}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.checkSoilDesc}
              </p>
            </div>

            {/* Rainfall */}

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌧️</span>

                <h3 className="font-bold text-blue-800">
                  {t.checkRainfall}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.checkRainfallDesc}
              </p>
            </div>

            {/* Water Wastage */}

            <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚰</span>

                <h3 className="font-bold text-yellow-800">
                  {t.avoidWastage}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.avoidWastageDesc}
              </p>
            </div>

            {/* Crop Stage */}

            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌾</span>

                <h3 className="font-bold text-purple-800">
                  {t.cropStage}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.cropStageDesc}
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}