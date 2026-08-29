"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
};

type IrrigationAdvice = {
  water: string;
  frequency: string;
  bestTime: string;
  warning: string;
};

export default function IrrigationPage() {
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

  const getCropAdvice = (cropName: string): IrrigationAdvice => {
    const name = cropName?.toLowerCase() || "";

    if (name.includes("wheat")) {
      return {
        water:
          "Wheat generally needs careful irrigation during important growth stages.",
        frequency:
          "Check soil moisture regularly and avoid unnecessary irrigation.",
        bestTime:
          "Morning or evening is generally better for irrigation.",
        warning:
          "Avoid overwatering because excess water can damage wheat roots and affect crop growth.",
      };
    }

    if (name.includes("rice") || name.includes("paddy")) {
      return {
        water:
          "Rice requires more water than many other field crops.",
        frequency:
          "Maintain appropriate field moisture according to the crop growth stage.",
        bestTime:
          "Morning or evening irrigation can help reduce water loss.",
        warning:
          "Avoid wasting water through unnecessary continuous flooding.",
      };
    }

    if (name.includes("maize") || name.includes("corn")) {
      return {
        water:
          "Maize needs adequate soil moisture, especially during important growth stages.",
        frequency:
          "Irrigate when the soil starts becoming dry and monitor moisture regularly.",
        bestTime:
          "Morning or evening is generally suitable.",
        warning:
          "Avoid waterlogging because excess water can harm maize roots.",
      };
    }

    if (name.includes("sugarcane") || name.includes("ganna")) {
      return {
        water:
          "Sugarcane has relatively high water requirements and needs regular moisture.",
        frequency:
          "Irrigation frequency should depend on soil type, weather and crop stage.",
        bestTime:
          "Morning or evening can help reduce evaporation losses.",
        warning:
          "Avoid excessive standing water and maintain proper field drainage.",
      };
    }

    if (name.includes("potato") || name.includes("aloo")) {
      return {
        water:
          "Potato needs consistent soil moisture for healthy tuber development.",
        frequency:
          "Monitor soil moisture and provide irrigation when required.",
        bestTime:
          "Morning or evening is generally preferred.",
        warning:
          "Avoid excessive irrigation and waterlogging.",
      };
    }

    return {
      water:
        "Irrigation requirements depend on crop type, soil, weather and growth stage.",
      frequency:
        "Check soil moisture before irrigation instead of watering on a fixed schedule.",
      bestTime:
        "Morning or evening is generally better to reduce water loss.",
      warning:
        "Avoid overwatering because excessive moisture can damage roots and encourage crop problems.",
    };
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">💧</div>

          <h1 className="text-2xl font-bold text-green-800">
            Loading Irrigation...
          </h1>

          <p className="text-gray-500 mt-2">
            Please wait...
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

  const advice = getCropAdvice(crop.crop);

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

            <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-5xl">
              💧
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {crop.season} Season
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop} Irrigation
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

        {/* Main Recommendation */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            💧 Irrigation Recommendation
          </h2>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {advice.water}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

            {/* Frequency */}
            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                📅
              </div>

              <h3 className="text-lg font-bold text-green-800">
                When to Irrigate
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {advice.frequency}
              </p>
            </div>

            {/* Best Time */}
            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                🌅
              </div>

              <h3 className="text-lg font-bold text-green-800">
                Best Time
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {advice.bestTime}
              </p>
            </div>

          </div>
        </div>

        {/* Important Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7 mb-8">

          <div className="flex gap-4">

            <div className="text-4xl">
              ⚠️
            </div>

            <div>
              <h2 className="text-xl font-bold text-yellow-800">
                Avoid Overwatering
              </h2>

              <p className="text-yellow-900 mt-2 leading-relaxed">
                {advice.warning}
              </p>
            </div>

          </div>
        </div>

        {/* Practical Tips */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            🌱 Water Management Tips
          </h2>

          <div className="space-y-4 mt-6">

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">
              <div className="text-3xl">
                👆
              </div>

              <div>
                <h3 className="font-bold text-green-800">
                  Check Soil Moisture
                </h3>

                <p className="text-gray-600 mt-1">
                  Check the soil before irrigation. If enough
                  moisture is already present, unnecessary watering
                  can be avoided.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">
              <div className="text-3xl">
                🌧️
              </div>

              <div>
                <h3 className="font-bold text-green-800">
                  Check Rainfall
                </h3>

                <p className="text-gray-600 mt-1">
                  If rain is expected, consider reducing or delaying
                  irrigation to save water.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">
              <div className="text-3xl">
                💦
              </div>

              <div>
                <h3 className="font-bold text-green-800">
                  Avoid Water Wastage
                </h3>

                <p className="text-gray-600 mt-1">
                  Use efficient irrigation methods where possible
                  and prevent unnecessary water runoff.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">
              <div className="text-3xl">
                🌾
              </div>

              <div>
                <h3 className="font-bold text-green-800">
                  Consider Crop Stage
                </h3>

                <p className="text-gray-600 mt-1">
                  Water requirements can change as the crop grows.
                  Adjust irrigation according to the crop stage.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Crop Details */}
        <div className="bg-white rounded-3xl shadow-lg p-7">

          <h2 className="text-2xl font-bold text-green-800 mb-5">
            🌾 Crop Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Crop
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {crop.crop}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Season
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {crop.season}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Land Area
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {crop.land} acres
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}