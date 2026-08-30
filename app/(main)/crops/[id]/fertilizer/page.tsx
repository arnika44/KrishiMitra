"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function FertilizerPage() {
  const params = useParams();
  const cropId = params?.id as string;

  const cropName =
    cropId?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Crop";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <Link
          href={`/crop/${cropId}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
        >
          ← Back to {cropName}
        </Link>

        {/* Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-3 text-4xl">🌱</div>

          <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
            Fertilizer & Nutrients
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {cropName} Fertilizer Guide
          </h1>

          <p className="mt-3 max-w-3xl text-gray-600">
            Get simple guidance about nutrients, fertilizer types and
            application practices for your crop.
          </p>
        </div>

        {/* Important note */}
        <div className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <h2 className="font-bold text-yellow-900">
            ⚠️ Important
          </h2>
          <p className="mt-2 text-sm leading-6 text-yellow-800">
            Fertilizer requirement can vary according to soil condition,
            crop variety, crop age and previous fertilizer application.
            For exact dosage, follow your soil test report and local
            agricultural expert's recommendation.
          </p>
        </div>

        {/* Nutrients */}
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            🧪 Major Nutrients
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl">🟢</div>
              <h3 className="mt-3 text-lg font-bold text-gray-900">
                Nitrogen (N)
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Supports healthy leaf growth and overall plant development.
              </p>
              <p className="mt-3 text-sm font-semibold text-green-700">
                Common sources: Urea and nitrogen fertilizers
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl">🟠</div>
              <h3 className="mt-3 text-lg font-bold text-gray-900">
                Phosphorus (P)
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Helps root development and supports flowering and crop
                establishment.
              </p>
              <p className="mt-3 text-sm font-semibold text-orange-700">
                Common sources: DAP and phosphorus fertilizers
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl">🔵</div>
              <h3 className="mt-3 text-lg font-bold text-gray-900">
                Potassium (K)
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Supports plant strength, water regulation and crop quality.
              </p>
              <p className="mt-3 text-sm font-semibold text-blue-700">
                Common sources: MOP and potassium fertilizers
              </p>
            </div>
          </div>
        </section>

        {/* Fertilizer types */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            🌾 Common Fertilizer Types
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">
                Urea
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                A nitrogen-rich fertilizer commonly used to support vegetative
                growth.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">
                DAP
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Provides nitrogen and phosphorus and is commonly used during
                crop establishment.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">
                MOP
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                A potassium fertilizer used when potassium is required by the
                crop and soil.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">
                Organic Manure / Compost
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Can improve soil organic matter and contribute nutrients when
                properly prepared and applied.
              </p>
            </div>
          </div>
        </section>

        {/* Good practices */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            ✅ Good Fertilizer Practices
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-900">
                🧪 Prefer soil testing
              </p>
              <p className="mt-1 text-sm text-green-800">
                Use soil-test information whenever available.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-900">
                ⚖️ Avoid over-application
              </p>
              <p className="mt-1 text-sm text-green-800">
                Excess fertilizer can waste money and affect soil and water.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-900">
                💧 Consider irrigation
              </p>
              <p className="mt-1 text-sm text-green-800">
                Fertilizer application should be planned according to crop
                stage and available moisture.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-900">
                📅 Follow crop stage
              </p>
              <p className="mt-1 text-sm text-green-800">
                Nutrient needs change as the crop develops.
              </p>
            </div>
          </div>
        </section>

        {/* Warning */}
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-bold text-red-900">
            🚨 Before applying fertilizer
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-red-800">
            <li>Check your soil test report if available.</li>
            <li>Use the fertilizer recommended for your crop and soil.</li>
            <li>Do not mix or apply fertilizers blindly.</li>
            <li>Follow the product label and local agriculture advice.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}