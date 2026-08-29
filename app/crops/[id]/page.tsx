"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
};

export default function CropsPage() {
  const router = useRouter();

  const [crops, setCrops] = useState<Crop[]>([]);
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [land, setLand] = useState("");

  // Controls whether Add Crop form is visible
  const [showAddForm, setShowAddForm] = useState(true);

  useEffect(() => {
    const savedCrops = localStorage.getItem("farmerCrops");

    if (savedCrops) {
      try {
        const parsedCrops = JSON.parse(savedCrops);

        setCrops(parsedCrops);

        // If crops already exist, hide form initially.
        // User can open it using Add Crop button.
        if (parsedCrops.length > 0) {
          setShowAddForm(false);
        } else {
          // First time farmer → show form automatically
          setShowAddForm(true);
        }
      } catch {
        setCrops([]);
        setShowAddForm(true);
      }
    } else {
      // No crop exists → first crop form should be visible
      setShowAddForm(true);
    }
  }, []);

  const addCrop = (e: React.FormEvent) => {
    e.preventDefault();

    if (!season || !crop || !land) {
      alert("Please fill all fields.");
      return;
    }

    const newCrop: Crop = {
      id: Date.now(),
      season,
      crop,
      land,
    };

    const updatedCrops = [...crops, newCrop];

    setCrops(updatedCrops);

    localStorage.setItem(
      "farmerCrops",
      JSON.stringify(updatedCrops)
    );

    // Clear form
    setSeason("");
    setCrop("");
    setLand("");

    // After adding crop, hide the form
    setShowAddForm(false);
  };

  const deleteCrop = (id: number) => {
    const updatedCrops = crops.filter(
      (item) => item.id !== id
    );

    setCrops(updatedCrops);

    localStorage.setItem(
      "farmerCrops",
      JSON.stringify(updatedCrops)
    );

    // If all crops are deleted, show the Add Crop form again
    if (updatedCrops.length === 0) {
      setShowAddForm(true);
    }
  };

  return (
    <main className="min-h-screen bg-green-50 px-5 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() => router.push("/profile")}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← Back to Profile
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">
            🌾
          </div>

          <h1 className="text-3xl font-bold text-green-800">
            My Crops
          </h1>

          <p className="text-gray-600 mt-2">
            Add your crops and land details for each season
          </p>
        </div>

        {/* ================================================= */}
        {/* ADD CROP FORM */}
        {/* ================================================= */}

        {showAddForm && (
          <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

            {/* Form Header */}
            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-green-800">
                Add Crop
              </h2>

              {/* Close button only appears when crops already exist */}
              {crops.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-800 font-semibold"
                >
                  ✕ Close
                </button>
              )}

            </div>

            <form onSubmit={addCrop}>

              {/* Season */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Season
                </label>

                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                >

                  <option value="">
                    Select Season
                  </option>

                  <option value="Kharif">
                    Kharif
                  </option>

                  <option value="Rabi">
                    Rabi
                  </option>

                  <option value="Zaid">
                    Zaid
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* Crop */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Crop
                </label>

                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  placeholder="Example: Rice, Wheat, Maize"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
                />

              </div>

              {/* Land */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Land Area (in acres)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={land}
                  onChange={(e) => setLand(e.target.value)}
                  placeholder="Example: 3"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
                />

              </div>

              {/* Add Crop */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
              >
                + Add Crop
              </button>

            </form>

          </div>
        )}

        {/* ================================================= */}
        {/* YOUR CROPS */}
        {/* ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7">

          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Your Crops
          </h2>

          {crops.length === 0 ? (

            <div className="text-center py-10 text-gray-500">

              <div className="text-5xl mb-3">
                🌱
              </div>

              <p>
                No crops added yet.
              </p>

              <p className="text-sm mt-1">
                Add your first crop above.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {crops.map((item) => (

                <div
                  key={item.id}
                  className="border border-green-100 rounded-2xl p-5 hover:shadow-md transition"
                >

                  <div className="flex items-center justify-between gap-4">

                    {/* Crop Details */}
                    <button
                      onClick={() =>
                        router.push(
                          `/crops/${item.id}`
                        )
                      }
                      className="flex-1 text-left"
                    >

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                          🌾
                        </div>

                        <div>

                          <h3 className="text-xl font-bold text-green-800">
                            {item.crop}
                          </h3>

                          <p className="text-gray-600">
                            {item.season} Season
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            Land: {item.land} acres
                          </p>

                        </div>

                      </div>

                    </button>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        deleteCrop(item.id)
                      }
                      className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

          {/* ================================================= */}
          {/* ADD ANOTHER CROP BUTTON */}
          {/* ================================================= */}

          {crops.length > 0 && !showAddForm && (

            <button
              onClick={() => setShowAddForm(true)}
              className="w-full mt-8 py-5 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-bold text-xl transition shadow-md"
            >
              + Add Another Crop
            </button>

          )}

        </div>

      </div>
    </main>
  );
}