
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
};

type Translation = {
  back: string;
  season: string;
  landArea: string;
  services: string;
  servicesDesc: string;
  loading: string;
  pleaseWait: string;
  notFound: string;
  backToCrops: string;
  explore: string;

  mandi: string;
  mandiDesc: string;

  waste: string;
  wasteDesc: string;

  storage: string;
  storageDesc: string;

  disease: string;
  diseaseDesc: string;

  aiDetector: string;
  aiDetectorDesc: string;

  irrigation: string;
  irrigationDesc: string;

  fertilizer: string;
  fertilizerDesc: string;

  weather: string;
  weatherDesc: string;

  price: string;
  priceDesc: string;

  alertMessage: string;
};

const translations: Record<string, Translation> = {
  en: {
    back: "← Back to My Crops",
    season: "Season",
    landArea: "Land Area",
    services: "Services",
    servicesDesc: "Everything you need to manage your crop.",
    loading: "Loading crop...",
    pleaseWait: "Please wait...",
    notFound: "Crop not found",
    backToCrops: "← Back to Crops",
    explore: "Explore →",

    mandi: "Mandi & Market",
    mandiDesc:
      "Check mandi information, nearby markets and selling opportunities.",

    waste: "Waste Utilization",
    wasteDesc:
      "Learn how crop waste can be reused, recycled or converted into useful products.",

    storage: "Preservation & Storage",
    storageDesc:
      "Get guidance on proper storage, preservation and post-harvest handling.",

    disease: "Disease & Pest Detection",
    diseaseDesc:
      "Identify possible crop diseases, pests and damage using AI-based detection.",

    aiDetector: "AI Crop Detector",
    aiDetectorDesc:
      "Upload a crop image to detect disease, damage and possible problems.",

    irrigation: "Irrigation",
    irrigationDesc:
      "Get irrigation guidance based on crop requirements and growing conditions.",

    fertilizer: "Fertilizer & Nutrients",
    fertilizerDesc:
      "Get crop-specific information about nutrients and fertilizer management.",

    weather: "Weather",
    weatherDesc:
      "View weather-related information useful for your crop management.",

    price: "Price Information",
    priceDesc:
      "Explore crop price information and market trends.",

    alertMessage: "will be connected next.",
  },

  hi: {
    back: "← मेरी फसलों पर वापस जाएँ",
    season: "सीजन",
    landArea: "जमीन का क्षेत्रफल",
    services: "सेवाएँ",
    servicesDesc:
      "आपकी फसल को बेहतर तरीके से संभालने के लिए सभी जरूरी सेवाएँ।",
    loading: "फसल लोड हो रही है...",
    pleaseWait: "कृपया प्रतीक्षा करें...",
    notFound: "फसल नहीं मिली",
    backToCrops: "← फसलों पर वापस जाएँ",
    explore: "जानें →",

    mandi: "मंडी और बाजार",
    mandiDesc:
      "मंडी की जानकारी, आसपास के बाजार और फसल बेचने के अवसर देखें।",

    waste: "फसल अवशेष प्रबंधन",
    wasteDesc:
      "जानें कि फसल के अवशेषों का दोबारा उपयोग, रीसाइक्लिंग या अन्य उपयोगी उत्पादों में कैसे किया जा सकता है।",

    storage: "भंडारण और संरक्षण",
    storageDesc:
      "फसल के सही भंडारण, संरक्षण और कटाई के बाद की देखभाल की जानकारी पाएँ।",

    disease: "रोग और कीट पहचान",
    diseaseDesc:
      "AI की मदद से फसल में संभावित रोग, कीट और नुकसान की पहचान करें।",

    aiDetector: "AI फसल पहचान",
    aiDetectorDesc:
      "फसल की फोटो अपलोड करके रोग, नुकसान और संभावित समस्याओं की पहचान करें।",

    irrigation: "सिंचाई",
    irrigationDesc:
      "फसल की जरूरत और खेती की स्थिति के अनुसार सिंचाई की जानकारी पाएँ।",

    fertilizer: "उर्वरक और पोषक तत्व",
    fertilizerDesc:
      "फसल के अनुसार पोषक तत्वों और उर्वरक प्रबंधन की जानकारी पाएँ।",

    weather: "मौसम",
    weatherDesc:
      "फसल प्रबंधन के लिए उपयोगी मौसम से जुड़ी जानकारी देखें।",

    price: "फसल मूल्य जानकारी",
    priceDesc:
      "फसल के बाजार भाव और कीमतों से जुड़ी जानकारी देखें।",

    alertMessage: "की सेवा जल्द जोड़ी जाएगी।",
  },
};

export default function CropDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }

    const savedCrops = localStorage.getItem("farmerCrops");

    if (!savedCrops) {
      setLoading(false);
      return;
    }

    try {
      const crops: Crop[] = JSON.parse(savedCrops);

      const selectedCrop = crops.find(
        (item) => item.id === Number(params.id)
      );

      if (selectedCrop) {
        setCrop(selectedCrop);
      }
    } catch {
      setCrop(null);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  const t = translations[language] || translations.en;

  const handleFeatureClick = (key: string) => {
    if (!crop) return;

    if (key === "Mandi") {
      router.push(`/crops/${crop.id}/market`);
      return;
    }

    if (key === "Weather") {
      router.push(`/crops/${crop.id}/weather`);
      return;
    }

    if (key === "Irrigation") {
      router.push(`/crops/${crop.id}/irrigation`);
      return;
    }

    if (key === "Waste") {
      router.push(`/crops/${crop.id}/waste`);
      return;
    }

    if (key === "Storage") {
      router.push(`/crops/${crop.id}/storage`);
      return;
    }

    if (key === "Disease") {
      router.push(`/crops/${crop.id}/disease`);
      return;
    }

    if (key === "AI Crop Detector") {
      router.push(`/crops/${crop.id}/ai-detector`);
      return;
    }

    if (key === "Fertilizer") {
      router.push(`/crops/${crop.id}/fertilizer`);
      return;
    }

    if (key === "Price") {
      alert(
        language === "en"
          ? `${key} for ${crop.crop} ${t.alertMessage}`
          : `${key} - ${crop.crop} ${t.alertMessage}`
      );
    }
  };

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "hi" ? "ltr" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🌱</div>

          <h1 className="text-2xl font-bold text-green-800">
            {t.loading}
          </h1>

          <p className="text-gray-500 mt-2">
            {t.pleaseWait}
          </p>
        </div>
      </main>
    );
  }

  if (!crop) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir="ltr"
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🌱</div>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.notFound}
          </h1>

          <button
            onClick={() => router.push("/crops")}
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold"
          >
            {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  const features = [
    {
      icon: "🏪",
      title: t.mandi,
      key: "Mandi",
      description: t.mandiDesc,
    },
    {
      icon: "♻️",
      title: t.waste,
      key: "Waste",
      description: t.wasteDesc,
    },
    {
      icon: "📦",
      title: t.storage,
      key: "Storage",
      description: t.storageDesc,
    },
    {
      icon: "🦠",
      title: t.disease,
      key: "Disease",
      description: t.diseaseDesc,
    },
    {
      icon: "🤖",
      title: t.aiDetector,
      key: "AI Crop Detector",
      description: t.aiDetectorDesc,
    },
    {
      icon: "💧",
      title: t.irrigation,
      key: "Irrigation",
      description: t.irrigationDesc,
    },
    {
      icon: "🌱",
      title: t.fertilizer,
      key: "Fertilizer",
      description: t.fertilizerDesc,
    },
    {
      icon: "🌦️",
      title: t.weather,
      key: "Weather",
      description: t.weatherDesc,
    },
    {
      icon: "💰",
      title: t.price,
      key: "Price",
      description: t.priceDesc,
    },
  ];

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir="ltr"
    >
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => router.push("/crops")}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          {t.back}
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">
              🌾
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {crop.season} {t.season}
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop}
              </h1>

              <p className="text-gray-600 mt-2">
                {t.landArea}:{" "}
                <span className="font-semibold">
                  {crop.land} acres
                </span>
              </p>
            </div>

          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-800">
            {crop.crop} {t.services}
          </h2>

          <p className="text-gray-600 mt-2">
            {t.servicesDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {features.map((feature) => (
            <button
              key={feature.key}
              onClick={() => handleFeatureClick(feature.key)}
              className="bg-white rounded-3xl p-6 text-left border-2 border-transparent hover:border-green-500 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-5 text-green-700 font-bold">
                {t.explore}
              </div>
            </button>
          ))}

        </div>

      </div>
    </main>
  );
}