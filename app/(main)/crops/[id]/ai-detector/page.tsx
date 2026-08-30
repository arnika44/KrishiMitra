"use client";

import { useState } from "react";

export default function AIDetectorPage() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    problem: string;
    confidence: string;
    advice: string;
  } | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setResult(null);

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const detectCrop = () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    // Demo detection
    // Baad me yahan AI API connect kar sakte ho.
    setTimeout(() => {
      setResult({
        problem: "Possible Leaf Disease",
        confidence: "78%",
        advice:
          "Affected leaves ko observe karein. Zyada spread hone par agricultural expert se salah lekar suitable treatment use karein.",
      });

      setLoading(false);
    }, 1500);
  };

  const removeImage = () => {
    setImage(null);
    setFileName("");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-green-50 px-4 py-6">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-sm font-medium text-green-700 hover:text-green-900"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="text-4xl">🤖</div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Crop Detector
              </h1>

              <p className="text-sm text-gray-500">
                Upload a crop image to identify possible problems.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            📷 Upload Crop Image
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            Take a clear photo of the crop leaf or affected part.
          </p>

          {!image ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-green-300 bg-green-50 px-6 py-12 text-center transition hover:bg-green-100">
              <div className="mb-3 text-5xl">🌱</div>

              <div className="mb-1 font-semibold text-green-800">
                Choose Crop Image
              </div>

              <div className="text-sm text-gray-500">
                JPG, JPEG or PNG
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div>
              {/* Image Preview */}
              <div className="overflow-hidden rounded-2xl border bg-gray-50">
                <img
                  src={image}
                  alt="Selected crop"
                  className="max-h-[420px] w-full object-contain"
                />
              </div>

              {/* File name */}
              <p className="mt-3 truncate text-sm text-gray-600">
                📎 {fileName}
              </p>

              {/* Buttons */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={detectCrop}
                  disabled={loading}
                  className="flex-1 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "🔍 Detecting..." : "🤖 Detect Problem"}
                </button>

                <button
                  onClick={removeImage}
                  disabled={loading}
                  className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Remove Image
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Loading */}
        {loading && (
          <section className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mb-3 text-4xl">🔬</div>

            <h2 className="font-semibold text-gray-900">
              Analyzing Image...
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Please wait while we check the crop image.
            </p>
          </section>
        )}

        {/* Result */}
        {result && !loading && (
          <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="text-3xl">📊</div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Detection Result
                </h2>

                <p className="text-sm text-gray-500">
                  Possible issue detected from the uploaded image.
                </p>
              </div>
            </div>

            {/* Problem */}
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="text-sm font-medium text-gray-600">
                Possible Problem
              </p>

              <h3 className="mt-1 text-xl font-bold text-yellow-900">
                {result.problem}
              </h3>

              <div className="mt-4">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-600">
                    Confidence
                  </span>

                  <span className="font-semibold text-gray-800">
                    {result.confidence}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-yellow-200">
                  <div
                    className="h-full rounded-full bg-yellow-500"
                    style={{ width: result.confidence }}
                  />
                </div>
              </div>
            </div>

            {/* Advice */}
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="font-semibold text-green-900">
                💡 Recommended Action
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                {result.advice}
              </p>
            </div>

            {/* Warning */}
            <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
              ⚠️ This is an initial AI-based indication. For serious
              crop damage, confirm the problem with an agricultural
              expert before using any pesticide or treatment.
            </div>
          </section>
        )}

        {/* Tips */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            📌 For Better Detection
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <p>✓ Use a clear and well-lit crop image.</p>
            <p>✓ Keep the affected leaf clearly visible.</p>
            <p>✓ Avoid blurry or very dark photos.</p>
            <p>✓ Take a close-up photo of the affected area.</p>
          </div>
        </section>
      </div>
    </main>
  );
}