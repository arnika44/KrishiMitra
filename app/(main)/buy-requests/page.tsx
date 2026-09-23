"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../lib/LanguageProvider";
import type { LanguageCode } from "../../lib/language";

type BuyRequest = {
  id: string;
  listingId: string;
  farmerName: string;
  crop: string;
  quantity: number;
  unit: string;
  price: number;
  farmerLocation: string;
  buyerName: string;
  buyerLocation: string;
  buyerPhone?: string;
  status: "pending" | "accepted" | "rejected";
  logisticsReady?: boolean;
  createdAt: string;
};

const translations: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    requests: string;
    buyer: string;
    crop: string;
    quantity: string;
    price: string;
    location: string;
    buyerLocation: string;
    accept: string;
    reject: string;
    accepted: string;
    rejected: string;
    pending: string;
    noRequests: string;
    kg: string;
    acceptedMessage: string;
    rejectedMessage: string;
  }
> = {
  en: {
    title: "Buy Requests",
    subtitle: "Manage crop purchase requests from buyers",
    requests: "Purchase Requests",
    buyer: "Buyer",
    crop: "Crop",
    quantity: "Quantity",
    price: "Price",
    location: "Farmer Location",
    buyerLocation: "Buyer Location",
    accept: "Accept",
    reject: "Reject",
    accepted: "Accepted",
    rejected: "Rejected",
    pending: "Pending",
    noRequests: "No buy requests available",
    kg: "KG",
    acceptedMessage: "Purchase request accepted",
    rejectedMessage: "Purchase request rejected",
  },

  hi: {
    title: "खरीद अनुरोध",
    subtitle: "खरीदारों के फसल खरीद अनुरोध प्रबंधित करें",
    requests: "खरीद अनुरोध",
    buyer: "खरीदार",
    crop: "फसल",
    quantity: "मात्रा",
    price: "कीमत",
    location: "किसान का स्थान",
    buyerLocation: "खरीदार का स्थान",
    accept: "स्वीकार करें",
    reject: "अस्वीकार करें",
    accepted: "स्वीकार किया गया",
    rejected: "अस्वीकार किया गया",
    pending: "लंबित",
    noRequests: "कोई खरीद अनुरोध उपलब्ध नहीं है",
    kg: "किलो",
    acceptedMessage: "खरीद अनुरोध स्वीकार किया गया",
    rejectedMessage: "खरीद अनुरोध अस्वीकार किया गया",
  },

  bn: {
    title: "ক্রয় অনুরোধ",
    subtitle: "ক্রেতাদের ফসল কেনার অনুরোধ পরিচালনা করুন",
    requests: "ক্রয় অনুরোধ",
    buyer: "ক্রেতা",
    crop: "ফসল",
    quantity: "পরিমাণ",
    price: "দাম",
    location: "কৃষকের স্থান",
    buyerLocation: "ক্রেতার স্থান",
    accept: "গ্রহণ করুন",
    reject: "প্রত্যাখ্যান করুন",
    accepted: "গৃহীত",
    rejected: "প্রত্যাখ্যাত",
    pending: "অপেক্ষমাণ",
    noRequests: "কোনও ক্রয় অনুরোধ নেই",
    kg: "কেজি",
    acceptedMessage: "ক্রয় অনুরোধ গ্রহণ করা হয়েছে",
    rejectedMessage: "ক্রয় অনুরোধ প্রত্যাখ্যান করা হয়েছে",
  },

  mr: {
    title: "खरेदी विनंत्या",
    subtitle: "खरेदीदारांच्या पीक खरेदी विनंत्या व्यवस्थापित करा",
    requests: "खरेदी विनंत्या",
    buyer: "खरेदीदार",
    crop: "पीक",
    quantity: "प्रमाण",
    price: "किंमत",
    location: "शेतकऱ्याचे स्थान",
    buyerLocation: "खरेदीदाराचे स्थान",
    accept: "स्वीकारा",
    reject: "नकार द्या",
    accepted: "स्वीकारले",
    rejected: "नाकारले",
    pending: "प्रलंबित",
    noRequests: "कोणतीही खरेदी विनंती उपलब्ध नाही",
    kg: "किलो",
    acceptedMessage: "खरेदी विनंती स्वीकारली",
    rejectedMessage: "खरेदी विनंती नाकारली",
  },

  ta: {
    title: "வாங்கும் கோரிக்கைகள்",
    subtitle: "வாங்குபவர்களின் பயிர் கொள்முதல் கோரிக்கைகளை நிர்வகிக்கவும்",
    requests: "கொள்முதல் கோரிக்கைகள்",
    buyer: "வாங்குபவர்",
    crop: "பயிர்",
    quantity: "அளவு",
    price: "விலை",
    location: "விவசாயியின் இடம்",
    buyerLocation: "வாங்குபவரின் இடம்",
    accept: "ஏற்கவும்",
    reject: "நிராகரிக்கவும்",
    accepted: "ஏற்கப்பட்டது",
    rejected: "நிராகரிக்கப்பட்டது",
    pending: "நிலுவையில்",
    noRequests: "கொள்முதல் கோரிக்கைகள் எதுவும் இல்லை",
    kg: "கிலோ",
    acceptedMessage: "கொள்முதல் கோரிக்கை ஏற்கப்பட்டது",
    rejectedMessage: "கொள்முதல் கோரிக்கை நிராகரிக்கப்பட்டது",
  },

  te: {
    title: "కొనుగోలు అభ్యర్థనలు",
    subtitle: "కొనుగోలుదారుల పంట కొనుగోలు అభ్యర్థనలను నిర్వహించండి",
    requests: "కొనుగోలు అభ్యర్థనలు",
    buyer: "కొనుగోలుదారు",
    crop: "పంట",
    quantity: "పరిమాణం",
    price: "ధర",
    location: "రైతు ప్రదేశం",
    buyerLocation: "కొనుగోలుదారు ప్రదేశం",
    accept: "అంగీకరించండి",
    reject: "తిరస్కరించండి",
    accepted: "అంగీకరించబడింది",
    rejected: "తిరస్కరించబడింది",
    pending: "పెండింగ్",
    noRequests: "కొనుగోలు అభ్యర్థనలు ఏవీ లేవు",
    kg: "కిలో",
    acceptedMessage: "కొనుగోలు అభ్యర్థన అంగీకరించబడింది",
    rejectedMessage: "కొనుగోలు అభ్యర్థన తిరస్కరించబడింది",
  },

  gu: {
    title: "ખરીદી વિનંતીઓ",
    subtitle: "ખરીદદારોની પાક ખરીદી વિનંતીઓ મેનેજ કરો",
    requests: "ખરીદી વિનંતીઓ",
    buyer: "ખરીદદાર",
    crop: "પાક",
    quantity: "જથ્થો",
    price: "કિંમત",
    location: "ખેડૂતનું સ્થળ",
    buyerLocation: "ખરીદદારનું સ્થળ",
    accept: "સ્વીકારો",
    reject: "નકારો",
    accepted: "સ્વીકારવામાં આવ્યું",
    rejected: "નકારવામાં આવ્યું",
    pending: "બાકી",
    noRequests: "કોઈ ખરીદી વિનંતી ઉપલબ્ધ નથી",
    kg: "કિલો",
    acceptedMessage: "ખરીદી વિનંતી સ્વીકારવામાં આવી",
    rejectedMessage: "ખરીદી વિનંતી નકારવામાં આવી",
  },

  kn: {
    title: "ಖರೀದಿ ವಿನಂತಿಗಳು",
    subtitle: "ಖರೀದಿದಾರರ ಬೆಳೆ ಖರೀದಿ ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    requests: "ಖರೀದಿ ವಿನಂತಿಗಳು",
    buyer: "ಖರೀದಿದಾರ",
    crop: "ಬೆಳೆ",
    quantity: "ಪ್ರಮಾಣ",
    price: "ಬೆಲೆ",
    location: "ರೈತನ ಸ್ಥಳ",
    buyerLocation: "ಖರೀದಿದಾರರ ಸ್ಥಳ",
    accept: "ಸ್ವೀಕರಿಸಿ",
    reject: "ತಿರಸ್ಕರಿಸಿ",
    accepted: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
    rejected: "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
    pending: "ಬಾಕಿ",
    noRequests: "ಯಾವುದೇ ಖರೀದಿ ವಿನಂತಿಗಳಿಲ್ಲ",
    kg: "ಕೆಜಿ",
    acceptedMessage: "ಖರೀದಿ ವಿನಂತಿಯನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
    rejectedMessage: "ಖರೀದಿ ವಿನಂತಿಯನ್ನು ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
  },

  ml: {
    title: "വാങ്ങൽ അഭ്യർത്ഥനകൾ",
    subtitle: "വാങ്ങുന്നവരുടെ വിള വാങ്ങൽ അഭ്യർത്ഥനകൾ നിയന്ത്രിക്കുക",
    requests: "വാങ്ങൽ അഭ്യർത്ഥനകൾ",
    buyer: "വാങ്ങുന്നയാൾ",
    crop: "വിള",
    quantity: "അളവ്",
    price: "വില",
    location: "കർഷകന്റെ സ്ഥലം",
    buyerLocation: "വാങ്ങുന്നയാളുടെ സ്ഥലം",
    accept: "അംഗീകരിക്കുക",
    reject: "നിരസിക്കുക",
    accepted: "അംഗീകരിച്ചു",
    rejected: "നിരസിച്ചു",
    pending: "തീർപ്പാക്കാത്തത്",
    noRequests: "വാങ്ങൽ അഭ്യർത്ഥനകൾ ഒന്നുമില്ല",
    kg: "കിലോ",
    acceptedMessage: "വാങ്ങൽ അഭ്യർത്ഥന അംഗീകരിച്ചു",
    rejectedMessage: "വാങ്ങൽ അഭ്യർത്ഥന നിരസിച്ചു",
  },

  pa: {
    title: "ਖਰੀਦ ਬੇਨਤੀਆਂ",
    subtitle: "ਖਰੀਦਦਾਰਾਂ ਦੀਆਂ ਫਸਲ ਖਰੀਦ ਬੇਨਤੀਆਂ ਨੂੰ ਸੰਭਾਲੋ",
    requests: "ਖਰੀਦ ਬੇਨਤੀਆਂ",
    buyer: "ਖਰੀਦਦਾਰ",
    crop: "ਫਸਲ",
    quantity: "ਮਾਤਰਾ",
    price: "ਕੀਮਤ",
    location: "ਕਿਸਾਨ ਦਾ ਸਥਾਨ",
    buyerLocation: "ਖਰੀਦਦਾਰ ਦਾ ਸਥਾਨ",
    accept: "ਸਵੀਕਾਰ ਕਰੋ",
    reject: "ਰੱਦ ਕਰੋ",
    accepted: "ਸਵੀਕਾਰ ਕੀਤਾ",
    rejected: "ਰੱਦ ਕੀਤਾ",
    pending: "ਲੰਬਿਤ",
    noRequests: "ਕੋਈ ਖਰੀਦ ਬੇਨਤੀ ਨਹੀਂ ਹੈ",
    kg: "ਕਿਲੋ",
    acceptedMessage: "ਖਰੀਦ ਬੇਨਤੀ ਸਵੀਕਾਰ ਕੀਤੀ ਗਈ",
    rejectedMessage: "ਖਰੀਦ ਬੇਨਤੀ ਰੱਦ ਕੀਤੀ ਗਈ",
  },

  or: {
    title: "କ୍ରୟ ଅନୁରୋଧ",
    subtitle: "କ୍ରେତାଙ୍କ ଫସଲ କ୍ରୟ ଅନୁରୋଧ ପରିଚାଳନା କରନ୍ତୁ",
    requests: "କ୍ରୟ ଅନୁରୋଧ",
    buyer: "କ୍ରେତା",
    crop: "ଫସଲ",
    quantity: "ପରିମାଣ",
    price: "ମୂଲ୍ୟ",
    location: "ଚାଷୀଙ୍କ ସ୍ଥାନ",
    buyerLocation: "କ୍ରେତାଙ୍କ ସ୍ଥାନ",
    accept: "ଗ୍ରହଣ କରନ୍ତୁ",
    reject: "ପ୍ରତ୍ୟାଖ୍ୟାନ କରନ୍ତୁ",
    accepted: "ଗ୍ରହଣ କରାଯାଇଛି",
    rejected: "ପ୍ରତ୍ୟାଖ୍ୟାନ କରାଯାଇଛି",
    pending: "ବିଚାରାଧୀନ",
    noRequests: "କୌଣସି କ୍ରୟ ଅନୁରୋଧ ନାହିଁ",
    kg: "କିଲୋ",
    acceptedMessage: "କ୍ରୟ ଅନୁରୋଧ ଗ୍ରହଣ କରାଯାଇଛି",
    rejectedMessage: "କ୍ରୟ ଅନୁରୋଧ ପ୍ରତ୍ୟାଖ୍ୟାନ କରାଯାଇଛି",
  },

  as: {
    title: "ক্ৰয় অনুৰোধ",
    subtitle: "ক্ৰেতাৰ শস্য ক্ৰয় অনুৰোধ পৰিচালনা কৰক",
    requests: "ক্ৰয় অনুৰোধ",
    buyer: "ক্ৰেতা",
    crop: "শস্য",
    quantity: "পৰিমাণ",
    price: "মূল্য",
    location: "কৃষকৰ স্থান",
    buyerLocation: "ক্ৰেতাৰ স্থান",
    accept: "গ্ৰহণ কৰক",
    reject: "প্ৰত্যাখ্যান কৰক",
    accepted: "গ্ৰহণ কৰা হৈছে",
    rejected: "প্ৰত্যাখ্যান কৰা হৈছে",
    pending: "অপেক্ষাৰত",
    noRequests: "কোনো ক্ৰয় অনুৰোধ নাই",
    kg: "কেজি",
    acceptedMessage: "ক্ৰয় অনুৰোধ গ্ৰহণ কৰা হৈছে",
    rejectedMessage: "ক্ৰয় অনুৰোধ প্ৰত্যাখ্যান কৰা হৈছে",
  },

  ur: {
    title: "خریداری کی درخواستیں",
    subtitle: "خریداروں کی فصل خریدنے کی درخواستوں کا انتظام کریں",
    requests: "خریداری کی درخواستیں",
    buyer: "خریدار",
    crop: "فصل",
    quantity: "مقدار",
    price: "قیمت",
    location: "کسان کا مقام",
    buyerLocation: "خریدار کا مقام",
    accept: "قبول کریں",
    reject: "مسترد کریں",
    accepted: "قبول کر لیا گیا",
    rejected: "مسترد کر دیا گیا",
    pending: "زیر التوا",
    noRequests: "کوئی خریداری کی درخواست موجود نہیں",
    kg: "کلو",
    acceptedMessage: "خریداری کی درخواست قبول کر لی گئی",
    rejectedMessage: "خریداری کی درخواست مسترد کر دی گئی",
  },
};

export default function BuyRequestsPage() {
  const { language } = useLanguage();

  const t = translations[language] || translations.en;

  const [requests, setRequests] =
    useState<BuyRequest[]>([]);

  useEffect(() => {
    const loadRequests = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem(
            "buyRequests"
          ) || "[]"
        );

        if (Array.isArray(saved)) {
          setRequests(saved);
        } else {
          setRequests([]);
        }
      } catch {
        setRequests([]);
      }
    };

    loadRequests();

    const interval = setInterval(
      loadRequests,
      1000
    );

    return () =>
      clearInterval(interval);
  }, []);

  const updateRequest = (
    requestId: string,
    status: "accepted" | "rejected"
  ) => {
    const updated = requests.map(
      (request) => {
        if (request.id !== requestId) {
          return request;
        }

        if (status === "accepted") {
          return {
            ...request,
            status: "accepted" as const,
            logisticsReady: true,
          };
        }

        return {
          ...request,
          status: "rejected" as const,
          logisticsReady: false,
        };
      }
    );

    setRequests(updated);

    localStorage.setItem(
      "buyRequests",
      JSON.stringify(updated)
    );
  };

  return (
    <main
      className="min-h-screen bg-[#f3fff7] px-4 py-6 md:px-8"
      dir={
        language === "ur"
          ? "rtl"
          : "ltr"
      }
    >
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#006b35] to-[#00a651] p-7 text-white shadow-lg">

          <h1 className="text-3xl font-bold">
            📩 {t.title}
          </h1>

          <p className="mt-2 text-green-50">
            {t.subtitle}
          </p>

        </div>

        <h2 className="mb-5 text-2xl font-bold text-[#063b2a]">
          🛒 {t.requests}
        </h2>

        {requests.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <div className="mb-4 text-5xl">
              📭
            </div>

            <p className="text-gray-500">
              {t.noRequests}
            </p>

          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">

            {requests.map(
              (request) => (
                <div
                  key={request.id}
                  className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm"
                >

                  <div className="mb-5 flex items-start justify-between gap-4">

                    <div>

                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        🌾 {request.crop}
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-[#063b2a]">
                        {request.crop}
                      </h3>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        request.status ===
                        "accepted"
                          ? "bg-green-100 text-green-700"
                          : request.status ===
                            "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {request.status ===
                      "accepted"
                        ? t.accepted
                        : request.status ===
                          "rejected"
                        ? t.rejected
                        : t.pending}
                    </span>

                  </div>

                  <div className="space-y-3 rounded-2xl bg-[#f6fcf8] p-4">

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        {t.buyer}
                      </span>

                      <span className="font-semibold text-gray-800">
                        {request.buyerName}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        {t.crop}
                      </span>

                      <span className="font-semibold text-gray-800">
                        {request.crop}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        {t.quantity}
                      </span>

                      <span className="font-semibold text-gray-800">
                        {request.quantity.toLocaleString()}{" "}
                        {request.unit === "KG"
                          ? t.kg
                          : request.unit}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        {t.price}
                      </span>

                      <span className="font-semibold text-gray-800">
                        ₹{request.price} /{" "}
                        {t.kg}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        {t.location}
                      </span>

                      <span className="text-right font-semibold text-gray-800">
                        📍{" "}
                        {request.farmerLocation}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        {t.buyerLocation}
                      </span>

                      <span className="text-right font-semibold text-gray-800">
                        📍{" "}
                        {request.buyerLocation}
                      </span>
                    </div>

                  </div>

                  {request.status ===
                    "pending" && (
                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          updateRequest(
                            request.id,
                            "accepted"
                          )
                        }
                        className="rounded-xl bg-[#008c3a] px-4 py-3 font-bold text-white hover:bg-[#007832]"
                      >
                        ✓ {t.accept}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateRequest(
                            request.id,
                            "rejected"
                          )
                        }
                        className="rounded-xl bg-red-500 px-4 py-3 font-bold text-white hover:bg-red-600"
                      >
                        ✕ {t.reject}
                      </button>

                    </div>
                  )}

                </div>
              )
            )}

          </div>
        )}

      </div>
    </main>
  );
}