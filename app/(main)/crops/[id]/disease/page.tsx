"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function DiseasePage() {
  const params = useParams();
  const cropId = params?.id as string;

  return (
    <main className="min-h-screen bg-green-50 px-4 py-6">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          href={`/crop/${cropId}`}
          className="mb-6 inline-flex items-center rounded-xl bg-white px-4 py-2 font-medium text-green-700 shadow-sm"
        >
          ← Back to {cropId}
        </Link>

        {/* Header */}
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="text-5xl">🦠</div>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Disease & Pest Detection
          </h1>

          <p className="mt-2 text-gray-600">
            Learn how to identify common crop diseases, pests and visible
            damage.
          </p>
        </section>

        {/* Detection guide */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">
            🔍 What to Look For
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl bg-red-50 p-5">
              <div className="text-3xl">🍂</div>
              <h3 className="mt-2 font-bold text-red-800">
                Leaf Damage
              </h3>
              <p className="mt-2 text-sm text-red-700">
                Look for unusual spots, yellowing, curling, holes or drying
                leaves.
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-5">
              <div className="text-3xl">🐛</div>
              <h3 className="mt-2 font-bold text-yellow-800">
                Insect Damage
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                Check leaves and stems for insects, eggs, webbing, holes or
                feeding damage.
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5">
              <div className="text-3xl">🟤</div>
              <h3 className="mt-2 font-bold text-orange-800">
                Spots & Lesions
              </h3>
              <p className="mt-2 text-sm text-orange-700">
                Brown, black, yellow or unusual patches may indicate disease
                or other crop stress.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-5">
              <div className="text-3xl">💧</div>
              <h3 className="mt-2 font-bold text-blue-800">
                Moisture Problems
              </h3>
              <p className="mt-2 text-sm text-blue-700">
                Excess moisture can increase the risk of fungal and other
                disease problems.
              </p>
            </div>

          </div>
        </section>

        {/* Common problems */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">
            🌱 Common Crop Problems
          </h2>

          <div className="mt-4 space-y-3">

            <div className="flex gap-4 rounded-xl border p-4">
              <span className="text-2xl">🦠</span>
              <div>
                <h3 className="font-bold">Fungal Disease</h3>
                <p className="text-sm text-gray-600">
                  May appear as spots, patches, discoloration or fungal growth.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border p-4">
              <span className="text-2xl">🐜</span>
              <div>
                <h3 className="font-bold">Insect / Pest Attack</h3>
                <p className="text-sm text-gray-600">
                  Feeding damage, holes, curled leaves or visible insects may
                  indicate pest activity.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border p-4">
              <span className="text-2xl">🌡️</span>
              <div>
                <h3 className="font-bold">Environmental Stress</h3>
                <p className="text-sm text-gray-600">
                  Heat, cold, water stress or poor growing conditions can
                  produce symptoms similar to disease.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Steps */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">
            📋 What Should You Do?
          </h2>

          <div className="mt-4 space-y-3">

            {[
              "Inspect affected leaves, stems and crop parts carefully.",
              "Check whether the problem is spreading to nearby plants.",
              "Look for insects, eggs or other visible pest activity.",
              "Take a clear photo of the affected crop if possible.",
              "Avoid applying chemicals without correctly identifying the problem.",
              "Consult a local agriculture expert for serious or rapidly spreading problems.",
            ].map((step, index) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-xl bg-green-50 p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                  {index + 1}
                </span>

                <p className="text-sm leading-6 text-gray-700">
                  {step}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* AI CTA */}
        <section className="mt-6 rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white shadow-lg">
          <div className="text-4xl">🤖</div>

          <h2 className="mt-3 text-2xl font-bold">
            Want to check a crop image?
          </h2>

          <p className="mt-2 text-green-50">
            Use the AI Crop Detector to upload an image and get possible
            disease or damage information.
          </p>

          <Link
            href={`/crop/${cropId}/ai-detector`}
            className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-green-700"
          >
            Open AI Crop Detector →
          </Link>
        </section>

        {/* Warning */}
        <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <h3 className="font-bold text-yellow-900">
            ⚠️ Important
          </h3>

          <p className="mt-2 text-sm leading-6 text-yellow-800">
            Similar symptoms can have different causes. This page provides
            general guidance and should not be treated as a confirmed disease
            diagnosis.
          </p>
        </div>

      </div>
    </main>
  );
}