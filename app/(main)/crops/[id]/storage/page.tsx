"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function StoragePage() {
  const params = useParams();
  const cropId = params?.id as string;

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          href={`/crop/${cropId}`}
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm hover:bg-green-50"
        >
          ← Back to {cropId}
        </Link>

        {/* Header */}
        <section className="mb-6 rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white shadow-lg">
          <div className="mb-2 text-4xl">📦</div>

          <h1 className="text-3xl font-bold">
            {cropId} Storage & Preservation
          </h1>

          <p className="mt-2 text-green-50">
            Store your harvested crop safely and reduce post-harvest losses.
          </p>
        </section>

        {/* Important */}
        <section className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-yellow-800">
            ⚠️ Important
          </h2>
          <p className="text-sm leading-6 text-yellow-900">
            Proper drying, cleaning and storage conditions help protect the
            crop from moisture, insects, fungus and quality loss.
          </p>
        </section>

        {/* Storage basics */}
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            🏠 Basic Storage Requirements
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">☀️</div>
              <h3 className="text-lg font-bold text-gray-800">
                Dry the Crop Properly
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Make sure harvested grain is properly dried before placing it
                into long-term storage.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">🧹</div>
              <h3 className="text-lg font-bold text-gray-800">
                Clean Before Storage
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Remove damaged grains, plant material, dust and other unwanted
                material before storage.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">💧</div>
              <h3 className="text-lg font-bold text-gray-800">
                Control Moisture
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Keep stored grain protected from rain, humidity, leaks and
                ground moisture.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">🌬️</div>
              <h3 className="text-lg font-bold text-gray-800">
                Keep Storage Ventilated
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Good ventilation helps prevent excessive heat and moisture
                buildup inside the storage area.
              </p>
            </div>

          </div>
        </section>

        {/* Storage options */}
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            📦 Storage Options
          </h2>

          <div className="space-y-4">

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                🏠 Traditional Room / Godown
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Keep the storage room clean, dry and free from cracks or
                openings through which insects and rodents can enter.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                🛍️ Grain Bags
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Use clean and suitable bags. Keep bags raised above the floor
                and away from walls to reduce moisture exposure.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                🛢️ Airtight Containers
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Suitable airtight containers can help protect stored grain from
                insects and moisture when properly prepared and maintained.
              </p>
            </div>

          </div>
        </section>

        {/* Checklist */}
        <section className="mb-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            ✅ Storage Checklist
          </h2>

          <div className="space-y-3">

            {[
              "Crop is properly dried",
              "Storage area is clean",
              "No visible insects or pests",
              "No water leakage",
              "Bags/containers are clean",
              "Crop is kept away from the floor",
              "Storage area is checked regularly",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-green-50 p-3"
              >
                <span className="text-green-600">✓</span>
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
            🐀 Watch for Storage Pests
          </h2>

          <p className="text-sm leading-6 text-red-800">
            Regularly check for insects, rodents, unusual smell, damaged
            grains, moisture or fungal growth. If you notice a serious
            infestation, seek advice from a qualified agricultural expert
            before using any chemical treatment.
          </p>
        </section>

        {/* Bottom */}
        <div className="rounded-2xl bg-green-100 p-5 text-center">
          <p className="font-semibold text-green-800">
            🌾 Good storage = Better crop quality + Less loss
          </p>

          <p className="mt-1 text-sm text-green-700">
            Check your stored crop regularly throughout the storage period.
          </p>
        </div>

      </div>
    </main>
  );
}