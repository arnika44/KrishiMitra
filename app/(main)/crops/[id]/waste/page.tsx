"use client";

import Link from "next/link";

export default function WastePage() {
  return (
    <main className="min-h-screen bg-green-50 px-4 py-6">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          href=".."
          className="mb-6 inline-flex items-center text-green-700 font-medium"
        >
          ← Back to Crop Services
        </Link>

        {/* Header */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-green-100">
          <div className="text-5xl mb-3">♻️</div>

          <h1 className="text-3xl font-bold text-gray-900">
            Waste Utilization
          </h1>

          <p className="mt-2 text-gray-600">
            Learn how crop waste can be reused, recycled or converted
            into useful products.
          </p>
        </div>

        {/* Options */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <div className="text-3xl">🌾</div>
            <h2 className="mt-3 text-xl font-semibold">
              Crop Residue
            </h2>
            <p className="mt-2 text-gray-600">
              Learn how to manage leftover stalks, straw and other
              crop residues after harvesting.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <div className="text-3xl">🐄</div>
            <h2 className="mt-3 text-xl font-semibold">
              Animal Feed
            </h2>
            <p className="mt-2 text-gray-600">
              Some crop residues can be processed and used as
              livestock feed.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <div className="text-3xl">🌱</div>
            <h2 className="mt-3 text-xl font-semibold">
              Compost
            </h2>
            <p className="mt-2 text-gray-600">
              Convert suitable agricultural waste into compost
              and organic matter for the soil.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <div className="text-3xl">🔥</div>
            <h2 className="mt-3 text-xl font-semibold">
              Biomass & Energy
            </h2>
            <p className="mt-2 text-gray-600">
              Agricultural waste can be used for biomass,
              briquettes and other energy applications.
            </p>
          </div>

        </div>

        {/* Important */}
        <div className="mt-6 rounded-2xl bg-yellow-50 border border-yellow-200 p-5">
          <h2 className="font-bold text-yellow-900">
            ⚠️ Important
          </h2>

          <p className="mt-2 text-sm text-yellow-800">
            Do not burn crop residue unnecessarily. Consider
            composting, mulching, animal feed or other suitable
            waste-management options.
          </p>
        </div>

      </div>
    </main>
  );
}