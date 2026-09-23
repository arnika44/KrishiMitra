"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../lib/language";

type CropListing = {
  id: string;
  farmerName: string;
  crop: string;
  quantity: number;
  unit: string;
  price: number;
  farmerLocation: string;
  createdAt: string;
};

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
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

type LogisticsOrder = {
  id: string;
  requestId: string;
  farmerName: string;
  buyerName: string;
  crop: string;
  quantity: number;
  unit: string;
  price: number;
  pickupLocation: string;
  deliveryType: "mandi" | "buyer" | "processor";
  deliveryName: string;
  deliveryLocation: string;
  vehicleType: string;
  driverName: string;
  driverPhone: string;
  status: string;
  createdAt: string;
};

const dashboardText: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    talkAi: string;
    talkAiDesc: string;
    cropListings: string;
    totalRequests: string;
    myOrders: string;
    availableCrops: string;
    buyRequests: string;
    browseCrops: string;
    viewRequests: string;
    noListings: string;
    noRequests: string;
    logout: string;
    quantity: string;
    farmer: string;
    location: string;
    price: string;
  }
> = {
  en: {
    title: "Welcome Common Buyer",
    subtitle: "Manage your crop purchases and orders",
    talkAi: "Talk to AI",
    talkAiDesc: "Ask KrishiMitra about crops, prices, buying and agriculture.",
    cropListings: "Crop Listings",
    totalRequests: "Total Requests",
    myOrders: "My Orders",
    availableCrops: "Available Crops",
    buyRequests: "My Buy Requests",
    browseCrops: "Browse Crops",
    viewRequests: "View Requests",
    noListings: "No crop listings available.",
    noRequests: "No buy requests yet.",
    logout: "Logout",
    quantity: "Quantity",
    farmer: "Farmer",
    location: "Location",
    price: "Price",
  },

  hi: {
    title: "स्वागत है Common Buyer",
    subtitle: "अपनी फसल खरीद और ऑर्डर मैनेज करें",
    talkAi: "AI से बात करें",
    talkAiDesc: "फसल, कीमत, खरीद और कृषि के बारे में KrishiMitra से पूछें।",
    cropListings: "फसल लिस्टिंग",
    totalRequests: "कुल अनुरोध",
    myOrders: "मेरे ऑर्डर",
    availableCrops: "उपलब्ध फसलें",
    buyRequests: "मेरे खरीद अनुरोध",
    browseCrops: "फसल देखें",
    viewRequests: "अनुरोध देखें",
    noListings: "कोई फसल लिस्टिंग उपलब्ध नहीं है।",
    noRequests: "अभी कोई खरीद अनुरोध नहीं है।",
    logout: "लॉगआउट",
    quantity: "मात्रा",
    farmer: "किसान",
    location: "स्थान",
    price: "कीमत",
  },

  bn: {
    title: "স্বাগতম Common Buyer",
    subtitle: "আপনার ফসল কেনা এবং অর্ডার পরিচালনা করুন",
    talkAi: "AI-এর সাথে কথা বলুন",
    talkAiDesc: "ফসল, দাম, কেনাকাটা এবং কৃষি সম্পর্কে KrishiMitra-কে জিজ্ঞাসা করুন।",
    cropListings: "ফসলের তালিকা",
    totalRequests: "মোট অনুরোধ",
    myOrders: "আমার অর্ডার",
    availableCrops: "উপলব্ধ ফসল",
    buyRequests: "আমার ক্রয় অনুরোধ",
    browseCrops: "ফসল দেখুন",
    viewRequests: "অনুরোধ দেখুন",
    noListings: "কোনও ফসলের তালিকা নেই।",
    noRequests: "এখনও কোনও ক্রয় অনুরোধ নেই।",
    logout: "লগআউট",
    quantity: "পরিমাণ",
    farmer: "কৃষক",
    location: "অবস্থান",
    price: "দাম",
  },

  mr: {
    title: "स्वागत आहे Common Buyer",
    subtitle: "तुमच्या पिकांची खरेदी आणि ऑर्डर व्यवस्थापित करा",
    talkAi: "AI शी बोला",
    talkAiDesc: "पिके, किंमती, खरेदी आणि शेतीबद्दल KrishiMitra ला विचारा.",
    cropListings: "पिकांची यादी",
    totalRequests: "एकूण विनंत्या",
    myOrders: "माझे ऑर्डर",
    availableCrops: "उपलब्ध पिके",
    buyRequests: "माझ्या खरेदी विनंत्या",
    browseCrops: "पिके पहा",
    viewRequests: "विनंत्या पहा",
    noListings: "पिकांची यादी उपलब्ध नाही.",
    noRequests: "अजून कोणतीही खरेदी विनंती नाही.",
    logout: "लॉगआउट",
    quantity: "प्रमाण",
    farmer: "शेतकरी",
    location: "स्थान",
    price: "किंमत",
  },

  ta: {
    title: "Common Buyer வரவேற்கிறோம்",
    subtitle: "உங்கள் பயிர் கொள்முதல் மற்றும் ஆர்டர்களை நிர்வகிக்கவும்",
    talkAi: "AI-யுடன் பேசுங்கள்",
    talkAiDesc: "பயிர்கள், விலைகள் மற்றும் விவசாயம் பற்றி KrishiMitra-விடம் கேளுங்கள்.",
    cropListings: "பயிர் பட்டியல்கள்",
    totalRequests: "மொத்த கோரிக்கைகள்",
    myOrders: "என் ஆர்டர்கள்",
    availableCrops: "கிடைக்கும் பயிர்கள்",
    buyRequests: "என் கொள்முதல் கோரிக்கைகள்",
    browseCrops: "பயிர்களைப் பார்க்கவும்",
    viewRequests: "கோரிக்கைகளைப் பார்க்கவும்",
    noListings: "பயிர் பட்டியல்கள் இல்லை.",
    noRequests: "இன்னும் கொள்முதல் கோரிக்கைகள் இல்லை.",
    logout: "வெளியேறு",
    quantity: "அளவு",
    farmer: "விவசாயி",
    location: "இடம்",
    price: "விலை",
  },

  te: {
    title: "Common Buyer కి స్వాగతం",
    subtitle: "మీ పంట కొనుగోళ్లు మరియు ఆర్డర్లను నిర్వహించండి",
    talkAi: "AI తో మాట్లాడండి",
    talkAiDesc: "పంటలు, ధరలు మరియు వ్యవసాయం గురించి KrishiMitra ని అడగండి.",
    cropListings: "పంట జాబితాలు",
    totalRequests: "మొత్తం అభ్యర్థనలు",
    myOrders: "నా ఆర్డర్లు",
    availableCrops: "అందుబాటులో ఉన్న పంటలు",
    buyRequests: "నా కొనుగోలు అభ్యర్థనలు",
    browseCrops: "పంటలను చూడండి",
    viewRequests: "అభ్యర్థనలను చూడండి",
    noListings: "పంట జాబితాలు అందుబాటులో లేవు.",
    noRequests: "ఇంకా కొనుగోలు అభ్యర్థనలు లేవు.",
    logout: "లాగ్ అవుట్",
    quantity: "పరిమాణం",
    farmer: "రైతు",
    location: "స్థానం",
    price: "ధర",
  },

  gu: {
    title: "Common Buyer માં આપનું સ્વાગત છે",
    subtitle: "તમારી પાક ખરીદી અને ઓર્ડર મેનેજ કરો",
    talkAi: "AI સાથે વાત કરો",
    talkAiDesc: "પાક, ભાવ અને ખેતી વિશે KrishiMitra ને પૂછો.",
    cropListings: "પાકની યાદી",
    totalRequests: "કુલ વિનંતીઓ",
    myOrders: "મારા ઓર્ડર",
    availableCrops: "ઉપલબ્ધ પાક",
    buyRequests: "મારી ખરીદી વિનંતીઓ",
    browseCrops: "પાક જુઓ",
    viewRequests: "વિનંતીઓ જુઓ",
    noListings: "કોઈ પાકની યાદી ઉપલબ્ધ નથી.",
    noRequests: "હજુ કોઈ ખરીદી વિનંતી નથી.",
    logout: "લૉગઆઉટ",
    quantity: "જથ્થો",
    farmer: "ખેડૂત",
    location: "સ્થળ",
    price: "કિંમત",
  },

  kn: {
    title: "Common Buyer ಗೆ ಸ್ವಾಗತ",
    subtitle: "ನಿಮ್ಮ ಬೆಳೆ ಖರೀದಿ ಮತ್ತು ಆರ್ಡರ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    talkAi: "AI ಜೊತೆ ಮಾತನಾಡಿ",
    talkAiDesc: "ಬೆಳೆಗಳು, ಬೆಲೆಗಳು ಮತ್ತು ಕೃಷಿಯ ಬಗ್ಗೆ KrishiMitra ಅನ್ನು ಕೇಳಿ.",
    cropListings: "ಬೆಳೆ ಪಟ್ಟಿಗಳು",
    totalRequests: "ಒಟ್ಟು ವಿನಂತಿಗಳು",
    myOrders: "ನನ್ನ ಆರ್ಡರ್‌ಗಳು",
    availableCrops: "ಲಭ್ಯವಿರುವ ಬೆಳೆಗಳು",
    buyRequests: "ನನ್ನ ಖರೀದಿ ವಿನಂತಿಗಳು",
    browseCrops: "ಬೆಳೆಗಳನ್ನು ನೋಡಿ",
    viewRequests: "ವಿನಂತಿಗಳನ್ನು ನೋಡಿ",
    noListings: "ಯಾವುದೇ ಬೆಳೆ ಪಟ್ಟಿಗಳು ಲಭ್ಯವಿಲ್ಲ.",
    noRequests: "ಇನ್ನೂ ಯಾವುದೇ ಖರೀದಿ ವಿನಂತಿಗಳಿಲ್ಲ.",
    logout: "ಲಾಗ್ ಔಟ್",
    quantity: "ಪ್ರಮಾಣ",
    farmer: "ರೈತ",
    location: "ಸ್ಥಳ",
    price: "ಬೆಲೆ",
  },

  ml: {
    title: "Common Buyer-ലേക്ക് സ്വാഗതം",
    subtitle: "നിങ്ങളുടെ വിള വാങ്ങലുകളും ഓർഡറുകളും നിയന്ത്രിക്കുക",
    talkAi: "AI-യുമായി സംസാരിക്കുക",
    talkAiDesc: "വിളകൾ, വിലകൾ, വാങ്ങൽ, കൃഷി എന്നിവയെക്കുറിച്ച് KrishiMitra-യോട് ചോദിക്കുക.",
    cropListings: "വിള ലിസ്റ്റിംഗുകൾ",
    totalRequests: "ആകെ അഭ്യർത്ഥനകൾ",
    myOrders: "എന്റെ ഓർഡറുകൾ",
    availableCrops: "ലഭ്യമായ വിളകൾ",
    buyRequests: "എന്റെ വാങ്ങൽ അഭ്യർത്ഥനകൾ",
    browseCrops: "വിളകൾ കാണുക",
    viewRequests: "അഭ്യർത്ഥനകൾ കാണുക",
    noListings: "വിള ലിസ്റ്റിംഗുകൾ ലഭ്യമല്ല.",
    noRequests: "ഇതുവരെ വാങ്ങൽ അഭ്യർത്ഥനകളില്ല.",
    logout: "ലോഗൗട്ട്",
    quantity: "അളവ്",
    farmer: "കർഷകൻ",
    location: "സ്ഥലം",
    price: "വില",
  },

  pa: {
    title: "Common Buyer ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    subtitle: "ਆਪਣੀ ਫਸਲ ਖਰੀਦ ਅਤੇ ਆਰਡਰ ਪ੍ਰਬੰਧਿਤ ਕਰੋ",
    talkAi: "AI ਨਾਲ ਗੱਲ ਕਰੋ",
    talkAiDesc: "ਫਸਲਾਂ, ਕੀਮਤਾਂ ਅਤੇ ਖੇਤੀ ਬਾਰੇ KrishiMitra ਨੂੰ ਪੁੱਛੋ।",
    cropListings: "ਫਸਲ ਸੂਚੀਆਂ",
    totalRequests: "ਕੁੱਲ ਬੇਨਤੀਆਂ",
    myOrders: "ਮੇਰੇ ਆਰਡਰ",
    availableCrops: "ਉਪਲਬਧ ਫਸਲਾਂ",
    buyRequests: "ਮੇਰੀਆਂ ਖਰੀਦ ਬੇਨਤੀਆਂ",
    browseCrops: "ਫਸਲਾਂ ਵੇਖੋ",
    viewRequests: "ਬੇਨਤੀਆਂ ਵੇਖੋ",
    noListings: "ਕੋਈ ਫਸਲ ਸੂਚੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",
    noRequests: "ਹਾਲੇ ਕੋਈ ਖਰੀਦ ਬੇਨਤੀ ਨਹੀਂ ਹੈ।",
    logout: "ਲੌਗਆਉਟ",
    quantity: "ਮਾਤਰਾ",
    farmer: "ਕਿਸਾਨ",
    location: "ਸਥਾਨ",
    price: "ਕੀਮਤ",
  },

  or: {
    title: "Common Buyer କୁ ସ୍ୱାଗତ",
    subtitle: "ଆପଣଙ୍କ ଫସଲ କିଣା ଏବଂ ଅର୍ଡର ପରିଚାଳନା କରନ୍ତୁ",
    talkAi: "AI ସହିତ କଥା ହୁଅନ୍ତୁ",
    talkAiDesc: "ଫସଲ, ମୂଲ୍ୟ ଏବଂ କୃଷି ବିଷୟରେ KrishiMitra କୁ ପଚାରନ୍ତୁ।",
    cropListings: "ଫସଲ ତାଲିକା",
    totalRequests: "ମୋଟ ଅନୁରୋଧ",
    myOrders: "ମୋର ଅର୍ଡର",
    availableCrops: "ଉପଲବ୍ଧ ଫସଲ",
    buyRequests: "ମୋର କ୍ରୟ ଅନୁରୋଧ",
    browseCrops: "ଫସଲ ଦେଖନ୍ତୁ",
    viewRequests: "ଅନୁରୋଧ ଦେଖନ୍ତୁ",
    noListings: "କୌଣସି ଫସଲ ତାଲିକା ନାହିଁ।",
    noRequests: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି କ୍ରୟ ଅନୁରୋଧ ନାହିଁ।",
    logout: "ଲଗଆଉଟ",
    quantity: "ପରିମାଣ",
    farmer: "ଚାଷୀ",
    location: "ସ୍ଥାନ",
    price: "ମୂଲ୍ୟ",
  },

  as: {
    title: "Common Buyer লৈ স্বাগতম",
    subtitle: "আপোনাৰ শস্য ক্ৰয় আৰু অৰ্ডাৰ পৰিচালনা কৰক",
    talkAi: "AI ৰ সৈতে কথা পাতক",
    talkAiDesc: "শস্য, মূল্য আৰু কৃষিৰ বিষয়ে KrishiMitra-ক সোধক।",
    cropListings: "শস্যৰ তালিকা",
    totalRequests: "মুঠ অনুৰোধ",
    myOrders: "মোৰ অৰ্ডাৰ",
    availableCrops: "উপলব্ধ শস্য",
    buyRequests: "মোৰ ক্ৰয় অনুৰোধ",
    browseCrops: "শস্য চাওক",
    viewRequests: "অনুৰোধ চাওক",
    noListings: "কোনো শস্যৰ তালিকা উপলব্ধ নহয়।",
    noRequests: "এতিয়ালৈ কোনো ক্ৰয় অনুৰোধ নাই।",
    logout: "লগআউট",
    quantity: "পৰিমাণ",
    farmer: "কৃষক",
    location: "স্থান",
    price: "মূল্য",
  },

  ur: {
    title: "Common Buyer میں خوش آمدید",
    subtitle: "اپنی فصل کی خرید اور آرڈر مینیج کریں",
    talkAi: "AI سے بات کریں",
    talkAiDesc: "فصل، قیمت اور زراعت کے بارے میں KrishiMitra سے پوچھیں۔",
    cropListings: "فصل کی فہرست",
    totalRequests: "کل درخواستیں",
    myOrders: "میرے آرڈرز",
    availableCrops: "دستیاب فصلیں",
    buyRequests: "میری خریداری کی درخواستیں",
    browseCrops: "فصلیں دیکھیں",
    viewRequests: "درخواستیں دیکھیں",
    noListings: "کوئی فصل کی فہرست دستیاب نہیں۔",
    noRequests: "ابھی کوئی خریداری کی درخواست نہیں۔",
    logout: "لاگ آؤٹ",
    quantity: "مقدار",
    farmer: "کسان",
    location: "مقام",
    price: "قیمت",
  },
};

export default function BuyerDashboardPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const text = dashboardText[language];

  const [listings, setListings] = useState<CropListing[]>([]);
  const [requests, setRequests] = useState<BuyRequest[]>([]);
  const [orders, setOrders] = useState<LogisticsOrder[]>([]);

  useEffect(() => {
    try {
      const savedListings = localStorage.getItem("cropListings");
      const savedRequests = localStorage.getItem("buyRequests");
      const savedOrders = localStorage.getItem("logisticsOrders");
      const savedProfile = localStorage.getItem("buyerProfile");

      const buyerProfile = savedProfile
        ? JSON.parse(savedProfile)
        : null;

      const buyerName =
        buyerProfile?.businessName ||
        buyerProfile?.name ||
        "";

      if (savedListings) {
        const parsedListings = JSON.parse(savedListings);

        if (Array.isArray(parsedListings)) {
          setListings(parsedListings);
        }
      }

      if (savedRequests) {
        const parsedRequests = JSON.parse(savedRequests);

        if (Array.isArray(parsedRequests)) {
          const buyerRequests = parsedRequests.filter(
            (request: BuyRequest) =>
              !buyerName || request.buyerName === buyerName
          );

          setRequests(buyerRequests);
        }
      }

      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);

        if (Array.isArray(parsedOrders)) {
          const buyerOrders = parsedOrders.filter(
            (order: LogisticsOrder) =>
              !buyerName || order.buyerName === buyerName
          );

          setOrders(buyerOrders);
        }
      }
    } catch (error) {
      console.error("Buyer dashboard loading error:", error);
    }
  }, []);

  const recentListings = useMemo(
    () => listings.slice(0, 4),
    [listings]
  );

  const recentRequests = useMemo(
    () => requests.slice(0, 4),
    [requests]
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/auth");
  };

  return (
    <main
      className="min-h-screen bg-slate-50 px-4 py-6 md:px-8"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {text.title}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {text.subtitle}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            {text.logout}
          </button>
        </div>

        {/* TALK TO AI */}
        <button
          onClick={() => router.push("/ai")}
          className="group mb-5 flex w-full items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-5 py-4 text-white shadow-md transition hover:shadow-lg"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-xl">
            🎤
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold md:text-lg">
              {text.talkAi}
            </h2>

            <p className="mt-0.5 truncate text-xs text-white/85 md:text-sm">
              {text.talkAiDesc}
            </p>
          </div>

          <div className="text-xl transition group-hover:translate-x-1">
            →
          </div>
        </button>

        {/* STATS */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-blue-50" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                  🌾
                </div>

                <p className="text-sm font-medium text-slate-500">
                  {text.cropListings}
                </p>
              </div>

              <p className="text-3xl font-bold text-slate-900">
                {listings.length}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {text.availableCrops}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-amber-50" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg">
                  🛒
                </div>

                <p className="text-sm font-medium text-slate-500">
                  {text.totalRequests}
                </p>
              </div>

              <p className="text-3xl font-bold text-slate-900">
                {requests.length}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {text.buyRequests}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-emerald-50" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  📦
                </div>

                <p className="text-sm font-medium text-slate-500">
                  {text.myOrders}
                </p>
              </div>

              <p className="text-3xl font-bold text-slate-900">
                {orders.length}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {text.myOrders}
              </p>
            </div>
          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* AVAILABLE CROPS */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                    🌾
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      {text.availableCrops}
                    </h2>

                    <p className="text-xs text-slate-500">
                      {listings.length} {text.cropListings}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/buyer")}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                >
                  {text.browseCrops}
                </button>
              </div>
            </div>

            <div className="p-4">
              {recentListings.length === 0 ? (
                <div className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  {text.noListings}
                </div>
              ) : (
                <div className="space-y-2">
                  {recentListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="group rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-emerald-100 hover:bg-emerald-50/40"
                    >
                      <div className="flex items-center justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                            🌱
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-bold text-slate-900">
                              {listing.crop}
                            </h3>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {text.farmer}: {listing.farmerName}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="font-bold text-emerald-700">
                            ₹{listing.price}
                          </p>

                          <p className="text-[10px] text-slate-400">
                            / {listing.unit}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-2">
                        <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] text-slate-600">
                          📦 {listing.quantity} {listing.unit}
                        </span>

                        <span className="max-w-full truncate rounded-lg bg-white px-2.5 py-1 text-[11px] text-slate-600">
                          📍 {listing.farmerLocation}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>

          {/* MY BUY REQUESTS */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl">
                    🛒
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      {text.buyRequests}
                    </h2>

                    <p className="text-xs text-slate-500">
                      {requests.length} {text.totalRequests}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/buyer")}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  {text.viewRequests}
                </button>
              </div>
            </div>

            <div className="p-4">
              {recentRequests.length === 0 ? (
                <div className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  {text.noRequests}
                </div>
              ) : (
                <div className="space-y-2">
                  {recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                    >
                      <div className="flex items-center justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                            🛍️
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-bold text-slate-900">
                              {request.crop}
                            </h3>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {text.farmer}: {request.farmerName}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                            request.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : request.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {request.status}
                        </span>

                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-2">
                        <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] text-slate-600">
                          📦 {request.quantity} {request.unit}
                        </span>

                        <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                          ₹{request.price}
                        </span>

                        <span className="max-w-full truncate rounded-lg bg-white px-2.5 py-1 text-[11px] text-slate-600">
                          📍 {request.farmerLocation}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>

        </div>

      </div>
    </main>
  );
}