"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
};

export default function CropDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const [crop, setCrop] = useState<Crop | null>(null);

  useEffect(() => {
    const savedCrops = localStorage.getItem("farmerCrops");

    if (!savedCrops) return;

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
    }
  }, [params.id]);

  if (!crop) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🌱</div>

          <h1 className="text-2xl font-bold text-gray-900">
            Crop not found
          </h1>

          <button
            onClick={() => router.push("/crops")}
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold"
          >
            ← Back to Crops
          </button>
        </div>
      </main>
    );
  }

  const features = [
    {
      icon: "🏪",
      title: "Mandi & Market",
      description:
        "Check mandi information, nearby markets and selling opportunities.",
    },
    {
      icon: "♻️",
      title: "Waste Utilization",
      description:
        "Learn how crop waste can be reused, recycled or converted into useful products.",
    },
    {
      icon: "📦",
      title: "Preservation & Storage",
      description:
        "Get guidance on proper storage, preservation and post-harvest handling.",
    },
    {
      icon: "🦠",
      title: "Disease & Pest Detection",
      description:
        "Identify possible crop diseases, pests and damage using AI-based detection.",
    },
    {
      icon: "🤖",
      title: "AI Crop Detector",
      description:
        "Upload a crop image to detect disease, damage and possible problems.",
    },
    {
      icon: "💧",
      title: "Irrigation",
      description:
        "Get irrigation guidance based on crop requirements and growing conditions.",
    },
    {
      icon: "🌱",
      title: "Fertilizer & Nutrients",
      description:
        "Get crop-specific information about nutrients and fertilizer management.",
    },
    {
      icon: "🌦️",
      title: "Weather",
      description:
        "View weather-related information useful for your crop management.",
    },
    {
      icon: "💰",
      title: "Price Information",
      description:
        "Explore crop price information and market trends.",
    },
  ];

  return (
    <main className="min-h-screen bg-green-50 px-5 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => router.push("/crops")}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← Back to My Crops
        </button>

        {/* Crop Header */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">
              🌾
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {crop.season} Season
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop}
              </h1>

              <p className="text-gray-600 mt-2">
                Land Area:{" "}
                <span className="font-semibold">
                  {crop.land} acres
                </span>
              </p>
            </div>

          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-800">
            {crop.crop} Services
          </h2>

          <p className="text-gray-600 mt-2">
            Everything you need to manage your crop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {features.map((feature) => (
            <button
              key={feature.title}
              onClick={() => {
                alert(
                  `${feature.title} for ${crop.crop} will be connected next.`
                );
              }}
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
                Explore →
              </div>
            </button>
          ))}

        </div>

      </div>
    </main>
  );
}