
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const translations: Record<
  string,
  {
    title: string;
    subtitle: string;
    farmer: string;
    farmerDesc: string;
    processor: string;
    processorDesc: string;
    buyer: string;
    buyerDesc: string;
    logistics: string;
    logisticsDesc: string;
    continue: string;
  }
> = {
  en: {
    title: "Select Your Role",
    subtitle: "Choose how you want to use KrishiMitra",
    farmer: "Farmer",
    farmerDesc:
      "Manage your produce, quality, market and farming decisions.",
    processor: "Processor",
    processorDesc:
      "Find agricultural produce for processing and connect with farmers.",
    buyer: "Common Buyer",
    buyerDesc:
      "Discover and purchase quality agricultural produce.",
    logistics: "Logistics Partner",
    logisticsDesc:
      "Help farmers and buyers transport agricultural produce.",
    continue: "Continue →",
  },

  hi: {
    title: "अपनी भूमिका चुनें",
    subtitle:
      "चुनें कि आप KrishiMitra का उपयोग कैसे करना चाहते हैं",
    farmer: "किसान",
    farmerDesc:
      "अपनी उपज, गुणवत्ता, बाजार और खेती से जुड़े निर्णयों को manage करें।",
    processor: "प्रोसेसर",
    processorDesc:
      "प्रोसेसिंग के लिए कृषि उपज खोजें और किसानों से जुड़ें।",
    buyer: "सामान्य खरीदार",
    buyerDesc:
      "अच्छी गुणवत्ता वाली कृषि उपज खोजें और खरीदें।",
    logistics: "लॉजिस्टिक्स पार्टनर",
    logisticsDesc:
      "किसानों और खरीदारों तक कृषि उपज पहुँचाने में मदद करें।",
    continue: "आगे बढ़ें →",
  },
};

export default function RolePage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("selectedLanguage");

    if (
      savedLanguage &&
      translations[savedLanguage]
    ) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t =
    translations[language] || translations.en;

  const roles = [
    {
      key: "farmer",
      icon: "👨‍🌾",
      title: t.farmer,
      description: t.farmerDesc,
      route: "/profile",
    },
    {
      key: "processor",
      icon: "🏭",
      title: t.processor,
      description: t.processorDesc,
      route: "/dashboard/processor",
    },
    {
      key: "buyer",
      icon: "🛒",
      title: t.buyer,
      description: t.buyerDesc,
      route: "/dashboard/buyer",
    },
    {
      key: "logistics",
      icon: "🚚",
      title: t.logistics,
      description: t.logisticsDesc,
      route: "/dashboard/logistics",
    },
  ];

  const selectRole = (
    roleKey: string,
    route: string
  ) => {
    localStorage.setItem(
      "userRole",
      roleKey
    );

    if (roleKey === "farmer") {
      const savedProfile =
        localStorage.getItem(
          "farmerProfile"
        );

      if (savedProfile) {
        router.push("/crops");
      } else {
        router.push("/profile");
      }

      return;
    }

    router.push(route);
  };

  return (
    <main
      className="min-h-screen bg-green-50 flex items-center justify-center px-5 py-10"
      dir="ltr"
    >
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">
            🌾
          </div>

          <h1 className="text-4xl font-bold text-green-800">
            KrishiMitra
          </h1>

          <h2 className="text-2xl font-bold text-gray-900 mt-6">
            {t.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {t.subtitle}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {roles.map((role) => (
            <button
              key={role.key}
              type="button"
              onClick={() =>
                selectRole(
                  role.key,
                  role.route
                )
              }
              className="bg-white rounded-3xl p-7 text-left border-2 border-transparent hover:border-green-600 hover:shadow-xl transition"
            >
              <div className="text-5xl mb-5">
                {role.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                {role.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {role.description}
              </p>

              <div className="mt-6 text-green-700 font-bold">
                {t.continue}
              </div>
            </button>
          ))}

        </div>

      </div>
    </main>
  );
}
