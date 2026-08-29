
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
};

type MarketInfo = {
  crop: string;
  price: string;
  unit: string;
  trend: string;
  advice: string;
};

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();

  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCrops = localStorage.getItem("farmerCrops");

    if (!savedCrops) {
      setLoading(false);
      return;
    }

    try {
      const crops: Crop[] = JSON.parse(savedCrops);

      const selectedCrop = crops.find(
        (item: Crop) => item.id === Number(params.id)
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

  const getMarketInfo = (cropName: string): MarketInfo => {
    const name = cropName.toLowerCase();

    if (name.includes("wheat")) {
      return {
        crop: "Wheat",
        price: "₹2,400 – ₹2,600",
        unit: "per quintal",
        trend: "Stable",
        advice:
          "Compare prices from nearby mandis before selling. Avoid selling immediately if the local price is unusually low.",
      };
    }

    if (name.includes("rice") || name.includes("paddy")) {
      return {
        crop: "Rice",
        price: "₹2,200 – ₹2,500",
        unit: "per quintal",
        trend: "Moderate",
        advice:
          "Check paddy quality requirements and compare mandi rates before taking your crop to market.",
      };
    }

    if (name.includes("maize") || name.includes("corn")) {
      return {
        crop: "Maize",
        price: "₹2,000 – ₹2,400",
        unit: "per quintal",
        trend: "Stable",
        advice:
          "Check moisture and grain quality before selling because quality can affect the final price.",
      };
    }

    if (name.includes("potato") || name.includes("aloo")) {
      return {
        crop: "Potato",
        price: "₹1,200 – ₹1,800",
        unit: "per quintal",
        trend: "Variable",
        advice:
          "Potato prices can change quickly. Compare today's local rates and storage options before selling.",
      };
    }

    if (name.includes("sugarcane") || name.includes("ganna")) {
      return {
        crop: "Sugarcane",
        price: "₹350 – ₹400",
        unit: "per quintal",
        trend: "Stable",
        advice:
          "Check the latest mill procurement rate and harvesting schedule before transporting sugarcane.",
      };
    }

    return {
      crop: cropName,
      price: "Market rate unavailable",
      unit: "",
      trend: "Check local mandi",
      advice:
        "Check your nearest mandi or agriculture market for the latest price of this crop.",
    };
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🏪</div>

          <h1 className="text-2xl font-bold text-green-800">
            Loading Market...
          </h1>

          <p className="text-gray-500 mt-2">
            Please wait while we prepare market information.
          </p>
        </div>
      </main>
    );
  }

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

  const market = getMarketInfo(crop.crop);

  return (
    <main className="min-h-screen bg-green-50 px-5 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => router.push(`/crops/${crop.id}`)}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← Back to {crop.crop}
        </button>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">
              🏪
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {crop.season} Season
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop} Market
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

        {/* Current Market Price */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            📊 Current Market Information
          </h2>

          <p className="text-gray-600 mt-2">
            Indicative information for your crop. Always verify the latest
            local mandi rate before selling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                🌾
              </div>

              <p className="text-sm text-gray-500">
                Crop
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.crop}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                💰
              </div>

              <p className="text-sm text-gray-500">
                Indicative Price
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.price}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {market.unit}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                📈
              </div>

              <p className="text-sm text-gray-500">
                Market Trend
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.trend}
              </p>
            </div>

          </div>
        </div>

        {/* Selling Advice */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            💡 Selling Advice
          </h2>

          <div className="bg-green-50 rounded-2xl p-6 mt-5">

            <p className="text-gray-700 leading-relaxed">
              {market.advice}
            </p>

          </div>
        </div>

        {/* Nearby Market */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            📍 Nearby Mandi & Markets
          </h2>

          <p className="text-gray-600 mt-2">
            Find nearby agricultural markets and compare available selling
            opportunities.
          </p>

          <button
            onClick={() => {
              alert(
                "Nearby mandi search will be connected with location services next."
              );
            }}
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 transition"
          >
            Find Nearby Mandi →
          </button>
        </div>

        {/* Important Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7">

          <h2 className="text-2xl font-bold text-yellow-800">
            ⚠️ Important Before Selling
          </h2>

          <div className="space-y-4 mt-5">

            <div className="flex gap-4">
              <div className="text-2xl">📊</div>

              <p className="text-yellow-900">
                Compare prices from more than one nearby mandi whenever
                possible.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">🌾</div>

              <p className="text-yellow-900">
                Crop quality, moisture and grading can affect the final
                selling price.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">🚚</div>

              <p className="text-yellow-900">
                Consider transportation cost before choosing a mandi with a
                slightly higher price.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">💰</div>

              <p className="text-yellow-900">
                Verify the latest mandi rate before making a final selling
                decision.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
