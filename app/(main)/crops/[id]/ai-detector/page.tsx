"use client";

import { useEffect, useState } from "react";

type LanguageCode = "en" | "hi";

const translations: Record<
  LanguageCode,
  {
    back: string;
    title: string;
    subtitle: string;
    uploadTitle: string;
    uploadDesc: string;
    chooseImage: string;
    imageTypes: string;
    detecting: string;
    detectProblem: string;
    removeImage: string;
    analyzing: string;
    analyzingDesc: string;
    detectionResult: string;
    resultDesc: string;
    possibleProblem: string;
    confidence: string;
    recommendedAction: string;
    warning: string;
    tipsTitle: string;
    tip1: string;
    tip2: string;
    tip3: string;
    tip4: string;
  }
> = {
  en: {
    back: "← Back",
    title: "AI Crop Detector",
    subtitle:
      "Upload a crop image to identify possible problems.",
    uploadTitle: "📷 Upload Crop Image",
    uploadDesc:
      "Take a clear photo of the crop leaf or affected part.",
    chooseImage: "Choose Crop Image",
    imageTypes: "JPG, JPEG or PNG",
    detecting: "🔍 Detecting...",
    detectProblem: "🤖 Detect Problem",
    removeImage: "Remove Image",
    analyzing: "Analyzing Image...",
    analyzingDesc:
      "Please wait while we check the crop image.",
    detectionResult: "Detection Result",
    resultDesc:
      "Possible issue detected from the uploaded image.",
    possibleProblem: "Possible Problem",
    confidence: "Confidence",
    recommendedAction: "💡 Recommended Action",
    warning:
      "⚠️ This is an initial AI-based indication. For serious crop damage, confirm the problem with an agricultural expert before using any pesticide or treatment.",
    tipsTitle: "📌 For Better Detection",
    tip1: "✓ Use a clear and well-lit crop image.",
    tip2: "✓ Keep the affected leaf clearly visible.",
    tip3: "✓ Avoid blurry or very dark photos.",
    tip4: "✓ Take a close-up photo of the affected area.",
  },

  hi: {
    back: "← वापस जाएं",
    title: "AI फसल डिटेक्टर",
    subtitle:
      "संभावित समस्याओं की पहचान करने के लिए फसल की तस्वीर अपलोड करें।",
    uploadTitle: "📷 फसल की तस्वीर अपलोड करें",
    uploadDesc:
      "फसल की पत्ती या प्रभावित हिस्से की साफ तस्वीर लें।",
    chooseImage: "फसल की तस्वीर चुनें",
    imageTypes: "JPG, JPEG या PNG",
    detecting: "🔍 जांच हो रही है...",
    detectProblem: "🤖 समस्या की पहचान करें",
    removeImage: "तस्वीर हटाएं",
    analyzing: "तस्वीर का विश्लेषण हो रहा है...",
    analyzingDesc:
      "कृपया प्रतीक्षा करें, हम फसल की तस्वीर की जांच कर रहे हैं।",
    detectionResult: "जांच का परिणाम",
    resultDesc:
      "अपलोड की गई तस्वीर से संभावित समस्या की पहचान हुई है।",
    possibleProblem: "संभावित समस्या",
    confidence: "विश्वसनीयता",
    recommendedAction: "💡 सुझाई गई कार्रवाई",
    warning:
      "⚠️ यह शुरुआती AI-आधारित जानकारी है। फसल को गंभीर नुकसान होने पर किसी कृषि विशेषज्ञ से समस्या की पुष्टि करें और उसके बाद ही कीटनाशक या उपचार का उपयोग करें।",
    tipsTitle: "📌 बेहतर पहचान के लिए",
    tip1: "✓ साफ और अच्छी रोशनी वाली फसल की तस्वीर का उपयोग करें।",
    tip2: "✓ प्रभावित पत्ती साफ दिखाई देनी चाहिए।",
    tip3: "✓ धुंधली या बहुत अंधेरी तस्वीरों से बचें।",
    tip4: "✓ प्रभावित हिस्से की नज़दीक से तस्वीर लें।",
  },
};

export default function AIDetectorPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");

  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    problem: string;
    confidence: string;
    advice: string;
  } | null>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage === "hi" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

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
        problem:
          language === "hi"
            ? "संभावित पत्ती रोग"
            : "Possible Leaf Disease",

        confidence: "78%",

        advice:
          language === "hi"
            ? "प्रभावित पत्तियों को ध्यान से देखें। समस्या अधिक फैलने पर कृषि विशेषज्ञ से सलाह लेकर उचित उपचार का उपयोग करें।"
            : "Affected leaves ko observe karein. Zyada spread hone par agricultural expert se salah lekar suitable treatment use karein.",
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
          {t.back}
        </button>

        {/* Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="text-4xl">🤖</div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t.title}
              </h1>

              <p className="text-sm text-gray-500">
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            {t.uploadTitle}
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            {t.uploadDesc}
          </p>

          {!image ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-green-300 bg-green-50 px-6 py-12 text-center transition hover:bg-green-100">
              <div className="mb-3 text-5xl">🌱</div>

              <div className="mb-1 font-semibold text-green-800">
                {t.chooseImage}
              </div>

              <div className="text-sm text-gray-500">
                {t.imageTypes}
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
                  {loading ? t.detecting : t.detectProblem}
                </button>

                <button
                  onClick={removeImage}
                  disabled={loading}
                  className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {t.removeImage}
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
              {t.analyzing}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {t.analyzingDesc}
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
                  {t.detectionResult}
                </h2>

                <p className="text-sm text-gray-500">
                  {t.resultDesc}
                </p>
              </div>
            </div>

            {/* Problem */}
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="text-sm font-medium text-gray-600">
                {t.possibleProblem}
              </p>

              <h3 className="mt-1 text-xl font-bold text-yellow-900">
                {result.problem}
              </h3>

              <div className="mt-4">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t.confidence}
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
                {t.recommendedAction}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                {result.advice}
              </p>
            </div>

            {/* Warning */}
            <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
              {t.warning}
            </div>
          </section>
        )}

        {/* Tips */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            {t.tipsTitle}
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <p>{t.tip1}</p>
            <p>{t.tip2}</p>
            <p>{t.tip3}</p>
            <p>{t.tip4}</p>
          </div>
        </section>
      </div>
    </main>
  );
}