"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Language = "hi" | "en";

export default function DiseasePage() {
  const params = useParams();
  const cropId = params?.id as string;

  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage === "hi" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    } else {
      setLanguage("en");
    }

    // If language is changed from another component/page
    const handleStorageChange = () => {
      const updatedLanguage = localStorage.getItem("selectedLanguage");

      if (updatedLanguage === "hi" || updatedLanguage === "en") {
        setLanguage(updatedLanguage);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isHindi = language === "hi";

  const text = {
    backTo: isHindi ? "वापस जाएँ" : "Back to",

    title: isHindi
      ? "फसल रोग और कीट पहचान"
      : "Disease & Pest Detection",

    subtitle: isHindi
      ? "फसल में होने वाले सामान्य रोग, कीट और दिखाई देने वाले नुकसान को पहचानने के तरीके जानें।"
      : "Learn how to identify common crop diseases, pests and visible damage.",

    whatToLookFor: isHindi
      ? "🔍 किन चीज़ों पर ध्यान दें"
      : "🔍 What to Look For",

    leafDamage: isHindi ? "पत्तियों का नुकसान" : "Leaf Damage",

    leafDamageDesc: isHindi
      ? "पत्तियों पर असामान्य धब्बे, पीलापन, मुड़ना, छेद या सूखापन देखें।"
      : "Look for unusual spots, yellowing, curling, holes or drying leaves.",

    insectDamage: isHindi ? "कीटों से नुकसान" : "Insect Damage",

    insectDamageDesc: isHindi
      ? "पत्तियों और तनों पर कीट, अंडे, जाला, छेद या खाने के निशान देखें।"
      : "Check leaves and stems for insects, eggs, webbing, holes or feeding damage.",

    spotsLesions: isHindi ? "धब्बे और घाव" : "Spots & Lesions",

    spotsLesionsDesc: isHindi
      ? "भूरे, काले, पीले या असामान्य धब्बे रोग या फसल में किसी अन्य समस्या का संकेत हो सकते हैं।"
      : "Brown, black, yellow or unusual patches may indicate disease or other crop stress.",

    moistureProblems: isHindi ? "नमी की समस्या" : "Moisture Problems",

    moistureProblemsDesc: isHindi
      ? "बहुत अधिक नमी से फफूंद और अन्य रोगों का खतरा बढ़ सकता है।"
      : "Excess moisture can increase the risk of fungal and other disease problems.",

    commonProblems: isHindi
      ? "🌱 फसल की सामान्य समस्याएँ"
      : "🌱 Common Crop Problems",

    fungalDisease: isHindi ? "फफूंद रोग" : "Fungal Disease",

    fungalDiseaseDesc: isHindi
      ? "यह धब्बे, पैच, रंग बदलने या फफूंद की वृद्धि के रूप में दिखाई दे सकता है।"
      : "May appear as spots, patches, discoloration or fungal growth.",

    pestAttack: isHindi
      ? "कीट / रोग-कीट हमला"
      : "Insect / Pest Attack",

    pestAttackDesc: isHindi
      ? "पत्तियों पर खाने के निशान, छेद, मुड़ना या दिखाई देने वाले कीट कीटों की गतिविधि का संकेत हो सकते हैं।"
      : "Feeding damage, holes, curled leaves or visible insects may indicate pest activity.",

    environmentalStress: isHindi
      ? "मौसम और वातावरण का तनाव"
      : "Environmental Stress",

    environmentalStressDesc: isHindi
      ? "गर्मी, ठंड, पानी की कमी या अधिक पानी और खराब बढ़ने की स्थिति से भी रोग जैसे लक्षण दिखाई दे सकते हैं।"
      : "Heat, cold, water stress or poor growing conditions can produce symptoms similar to disease.",

    whatShouldYouDo: isHindi
      ? "📋 आपको क्या करना चाहिए?"
      : "📋 What Should You Do?",

    steps: isHindi
      ? [
          "प्रभावित पत्तियों, तनों और फसल के अन्य हिस्सों को ध्यान से देखें।",
          "जाँच करें कि समस्या आसपास के पौधों में भी फैल रही है या नहीं।",
          "कीट, अंडे या अन्य दिखाई देने वाली कीट गतिविधि देखें।",
          "यदि संभव हो तो प्रभावित फसल की साफ फोटो लें।",
          "समस्या की सही पहचान किए बिना रसायन या कीटनाशक का प्रयोग न करें।",
          "गंभीर या तेजी से फैलने वाली समस्या होने पर स्थानीय कृषि विशेषज्ञ से सलाह लें।",
        ]
      : [
          "Inspect affected leaves, stems and crop parts carefully.",
          "Check whether the problem is spreading to nearby plants.",
          "Look for insects, eggs or other visible pest activity.",
          "Take a clear photo of the affected crop if possible.",
          "Avoid applying chemicals without correctly identifying the problem.",
          "Consult a local agriculture expert for serious or rapidly spreading problems.",
        ],

    aiTitle: isHindi
      ? "फसल की फोटो चेक करना चाहते हैं?"
      : "Want to check a crop image?",

    aiDescription: isHindi
      ? "AI Crop Detector का उपयोग करके फोटो अपलोड करें और संभावित रोग या फसल के नुकसान की जानकारी प्राप्त करें।"
      : "Use the AI Crop Detector to upload an image and get possible disease or damage information.",

    openAi: isHindi
      ? "AI Crop Detector खोलें →"
      : "Open AI Crop Detector →",

    important: isHindi ? "⚠️ महत्वपूर्ण" : "⚠️ Important",

    warning: isHindi
      ? "एक जैसे लक्षण अलग-अलग कारणों से हो सकते हैं। यह पेज केवल सामान्य जानकारी देता है और इसे किसी निश्चित रोग की पुष्टि या चिकित्सा/कृषि निदान नहीं माना जाना चाहिए।"
      : "Similar symptoms can have different causes. This page provides general guidance and should not be treated as a confirmed disease diagnosis.",
  };

  return (
    <main className="min-h-screen bg-green-50 px-4 py-6">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          href={`/crop/${cropId}`}
          className="mb-6 inline-flex items-center rounded-xl bg-white px-4 py-2 font-bold text-green-900 shadow-sm"
        >
          ← {text.backTo} {cropId}
        </Link>

        {/* Header */}
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="text-5xl">🦠</div>

          <h1 className="mt-3 text-3xl font-bold text-gray-950">
            {text.title}
          </h1>

          <p className="mt-2 text-gray-900">
            {text.subtitle}
          </p>
        </section>

        {/* Detection guide */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950">
            {text.whatToLookFor}
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">

            {/* Leaf Damage */}
            <div className="rounded-2xl bg-red-50 p-5">
              <div className="text-3xl">🍂</div>

              <h3 className="mt-2 font-bold text-red-950">
                {text.leafDamage}
              </h3>

              <p className="mt-2 text-sm font-medium text-red-950">
                {text.leafDamageDesc}
              </p>
            </div>

            {/* Insect Damage */}
            <div className="rounded-2xl bg-yellow-50 p-5">
              <div className="text-3xl">🐛</div>

              <h3 className="mt-2 font-bold text-yellow-950">
                {text.insectDamage}
              </h3>

              <p className="mt-2 text-sm font-medium text-yellow-950">
                {text.insectDamageDesc}
              </p>
            </div>

            {/* Spots */}
            <div className="rounded-2xl bg-orange-50 p-5">
              <div className="text-3xl">🟤</div>

              <h3 className="mt-2 font-bold text-orange-950">
                {text.spotsLesions}
              </h3>

              <p className="mt-2 text-sm font-medium text-orange-950">
                {text.spotsLesionsDesc}
              </p>
            </div>

            {/* Moisture */}
            <div className="rounded-2xl bg-blue-50 p-5">
              <div className="text-3xl">💧</div>

              <h3 className="mt-2 font-bold text-blue-950">
                {text.moistureProblems}
              </h3>

              <p className="mt-2 text-sm font-medium text-blue-950">
                {text.moistureProblemsDesc}
              </p>
            </div>

          </div>
        </section>

        {/* Common problems */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950">
            {text.commonProblems}
          </h2>

          <div className="mt-4 space-y-3">

            {/* Fungal Disease */}
            <div className="flex gap-4 rounded-xl border border-gray-300 p-4">
              <span className="text-2xl">🦠</span>

              <div>
                <h3 className="font-bold text-gray-950">
                  {text.fungalDisease}
                </h3>

                <p className="text-sm font-medium text-gray-900">
                  {text.fungalDiseaseDesc}
                </p>
              </div>
            </div>

            {/* Pest Attack */}
            <div className="flex gap-4 rounded-xl border border-gray-300 p-4">
              <span className="text-2xl">🐜</span>

              <div>
                <h3 className="font-bold text-gray-950">
                  {text.pestAttack}
                </h3>

                <p className="text-sm font-medium text-gray-900">
                  {text.pestAttackDesc}
                </p>
              </div>
            </div>

            {/* Environmental Stress */}
            <div className="flex gap-4 rounded-xl border border-gray-300 p-4">
              <span className="text-2xl">🌡️</span>

              <div>
                <h3 className="font-bold text-gray-950">
                  {text.environmentalStress}
                </h3>

                <p className="text-sm font-medium text-gray-900">
                  {text.environmentalStressDesc}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Steps */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950">
            {text.whatShouldYouDo}
          </h2>

          <div className="mt-4 space-y-3">

            {text.steps.map((step, index) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-xl bg-green-50 p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                  {index + 1}
                </span>

                <p className="text-sm font-medium leading-6 text-gray-950">
                  {step}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* AI CTA */}
        <section className="mt-6 rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white shadow-lg">
          <div className="text-4xl">🤖</div>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {text.aiTitle}
          </h2>

          <p className="mt-2 font-medium text-white">
            {text.aiDescription}
          </p>

          <Link
            href={`/crop/${cropId}/ai-detector`}
            className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-green-900"
          >
            {text.openAi}
          </Link>
        </section>

        {/* Warning */}
        <div className="mt-6 rounded-2xl border border-yellow-300 bg-yellow-50 p-5">
          <h3 className="font-bold text-yellow-950">
            {text.important}
          </h3>

          <p className="mt-2 text-sm font-medium leading-6 text-yellow-950">
            {text.warning}
          </p>
        </div>

      </div>
    </main>
  );
}