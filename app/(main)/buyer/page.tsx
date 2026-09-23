"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../lib/LanguageProvider";
import type { LanguageCode } from "../../lib/language";

type CropListing = {
  id: string;
  farmerName: string;
  crop: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
};

const buyerText: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    search: string;
    available: string;
    quantity: string;
    price: string;
    location: string;
    farmer: string;
    buy: string;
    requestSent: string;
    noListings: string;
    kg: string;
    quintal: string;
  }
> = {
  en: {
    title: "Common Buyer",
    subtitle: "Buy crops directly from farmers",
    search: "Search crop...",
    available: "Available Crops",
    quantity: "Quantity",
    price: "Price",
    location: "Location",
    farmer: "Farmer",
    buy: "Send Buy Request",
    requestSent: "Buy Request Sent",
    noListings: "No crop listings found",
    kg: "KG",
    quintal: "Quintal",
  },

  hi: {
    title: "कॉमन बायर",
    subtitle: "किसानों से सीधे फसल खरीदें",
    search: "फसल खोजें...",
    available: "उपलब्ध फसलें",
    quantity: "मात्रा",
    price: "कीमत",
    location: "स्थान",
    farmer: "किसान",
    buy: "खरीद अनुरोध भेजें",
    requestSent: "खरीद अनुरोध भेजा गया",
    noListings: "कोई फसल लिस्टिंग नहीं मिली",
    kg: "किलो",
    quintal: "क्विंटल",
  },

  bn: {
    title: "কমন বায়ার",
    subtitle: "কৃষকদের কাছ থেকে সরাসরি ফসল কিনুন",
    search: "ফসল খুঁজুন...",
    available: "উপলব্ধ ফসল",
    quantity: "পরিমাণ",
    price: "দাম",
    location: "স্থান",
    farmer: "কৃষক",
    buy: "কেনার অনুরোধ পাঠান",
    requestSent: "কেনার অনুরোধ পাঠানো হয়েছে",
    noListings: "কোনও ফসলের তালিকা পাওয়া যায়নি",
    kg: "কেজি",
    quintal: "কুইন্টাল",
  },

  mr: {
    title: "कॉमन बायर",
    subtitle: "शेतकऱ्यांकडून थेट पिके खरेदी करा",
    search: "पीक शोधा...",
    available: "उपलब्ध पिके",
    quantity: "प्रमाण",
    price: "किंमत",
    location: "स्थान",
    farmer: "शेतकरी",
    buy: "खरेदी विनंती पाठवा",
    requestSent: "खरेदी विनंती पाठवली",
    noListings: "कोणतीही पीक लिस्टिंग सापडली नाही",
    kg: "किलो",
    quintal: "क्विंटल",
  },

  ta: {
    title: "பொது வாங்குபவர்",
    subtitle: "விவசாயிகளிடமிருந்து நேரடியாக பயிர்களை வாங்குங்கள்",
    search: "பயிரை தேடுங்கள்...",
    available: "கிடைக்கும் பயிர்கள்",
    quantity: "அளவு",
    price: "விலை",
    location: "இடம்",
    farmer: "விவசாயி",
    buy: "வாங்கும் கோரிக்கையை அனுப்பவும்",
    requestSent: "வாங்கும் கோரிக்கை அனுப்பப்பட்டது",
    noListings: "பயிர் பட்டியல் எதுவும் கிடைக்கவில்லை",
    kg: "கிலோ",
    quintal: "குவிண்டால்",
  },

  te: {
    title: "కామన్ బయ్యర్",
    subtitle: "రైతుల నుండి నేరుగా పంటలను కొనండి",
    search: "పంటను వెతకండి...",
    available: "అందుబాటులో ఉన్న పంటలు",
    quantity: "పరిమాణం",
    price: "ధర",
    location: "ప్రదేశం",
    farmer: "రైతు",
    buy: "కొనుగోలు అభ్యర్థన పంపండి",
    requestSent: "కొనుగోలు అభ్యర్థన పంపబడింది",
    noListings: "పంట లిస్టింగ్‌లు ఏవీ లభించలేదు",
    kg: "కిలో",
    quintal: "క్వింటల్",
  },

  gu: {
    title: "કોમન બાયર",
    subtitle: "ખેડૂતો પાસેથી સીધા પાક ખરીદો",
    search: "પાક શોધો...",
    available: "ઉપલબ્ધ પાક",
    quantity: "જથ્થો",
    price: "કિંમત",
    location: "સ્થળ",
    farmer: "ખેડૂત",
    buy: "ખરીદી વિનંતી મોકલો",
    requestSent: "ખરીદી વિનંતી મોકલવામાં આવી",
    noListings: "કોઈ પાક લિસ્ટિંગ મળી નથી",
    kg: "કિલો",
    quintal: "ક્વિન્ટલ",
  },

  kn: {
    title: "ಕಾಮನ್ ಬೈಯರ್",
    subtitle: "ರೈತರಿಂದ ನೇರವಾಗಿ ಬೆಳೆಗಳನ್ನು ಖರೀದಿಸಿ",
    search: "ಬೆಳೆ ಹುಡುಕಿ...",
    available: "ಲಭ್ಯವಿರುವ ಬೆಳೆಗಳು",
    quantity: "ಪ್ರಮಾಣ",
    price: "ಬೆಲೆ",
    location: "ಸ್ಥಳ",
    farmer: "ರೈತ",
    buy: "ಖರೀದಿ ವಿನಂತಿ ಕಳುಹಿಸಿ",
    requestSent: "ಖರೀದಿ ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ",
    noListings: "ಯಾವುದೇ ಬೆಳೆ ಲಿಸ್ಟಿಂಗ್ ಕಂಡುಬಂದಿಲ್ಲ",
    kg: "ಕೆಜಿ",
    quintal: "ಕ್ವಿಂಟಲ್",
  },

  ml: {
    title: "കോമൺ ബയർ",
    subtitle: "കർഷകരിൽ നിന്ന് നേരിട്ട് വിളകൾ വാങ്ങുക",
    search: "വിള തിരയുക...",
    available: "ലഭ്യമായ വിളകൾ",
    quantity: "അളവ്",
    price: "വില",
    location: "സ്ഥലം",
    farmer: "കർഷകൻ",
    buy: "വാങ്ങൽ അഭ്യർത്ഥന അയയ്ക്കുക",
    requestSent: "വാങ്ങൽ അഭ്യർത്ഥന അയച്ചു",
    noListings: "വിള ലിസ്റ്റിംഗുകൾ ഒന്നും കണ്ടെത്തിയില്ല",
    kg: "കിലോ",
    quintal: "ക്വിന്റൽ",
  },

  pa: {
    title: "ਕਾਮਨ ਬਾਇਰ",
    subtitle: "ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧੀਆਂ ਫਸਲਾਂ ਖਰੀਦੋ",
    search: "ਫਸਲ ਖੋਜੋ...",
    available: "ਉਪਲਬਧ ਫਸਲਾਂ",
    quantity: "ਮਾਤਰਾ",
    price: "ਕੀਮਤ",
    location: "ਸਥਾਨ",
    farmer: "ਕਿਸਾਨ",
    buy: "ਖਰੀਦ ਬੇਨਤੀ ਭੇਜੋ",
    requestSent: "ਖਰੀਦ ਬੇਨਤੀ ਭੇਜੀ ਗਈ",
    noListings: "ਕੋਈ ਫਸਲ ਲਿਸਟਿੰਗ ਨਹੀਂ ਮਿਲੀ",
    kg: "ਕਿਲੋ",
    quintal: "ਕੁਇੰਟਲ",
  },

  or: {
    title: "କମନ୍ ବାୟର",
    subtitle: "ଚାଷୀଙ୍କଠାରୁ ସିଧାସଳଖ ଫସଲ କିଣନ୍ତୁ",
    search: "ଫସଲ ଖୋଜନ୍ତୁ...",
    available: "ଉପଲବ୍ଧ ଫସଲ",
    quantity: "ପରିମାଣ",
    price: "ମୂଲ୍ୟ",
    location: "ସ୍ଥାନ",
    farmer: "ଚାଷୀ",
    buy: "କ୍ରୟ ଅନୁରୋଧ ପଠାନ୍ତୁ",
    requestSent: "କ୍ରୟ ଅନୁରୋଧ ପଠାଯାଇଛି",
    noListings: "କୌଣସି ଫସଲ ଲିଷ୍ଟିଂ ମିଳିଲା ନାହିଁ",
    kg: "କିଲୋ",
    quintal: "କ୍ୱିଣ୍ଟାଲ",
  },

  as: {
    title: "কমন বায়াৰ",
    subtitle: "কৃষকৰ পৰা পোনপটীয়াকৈ শস্য কিনক",
    search: "শস্য বিচাৰক...",
    available: "উপলব্ধ শস্য",
    quantity: "পৰিমাণ",
    price: "মূল্য",
    location: "স্থান",
    farmer: "কৃষক",
    buy: "ক্ৰয় অনুৰোধ পঠিয়াওক",
    requestSent: "ক্ৰয় অনুৰোধ পঠিওৱা হৈছে",
    noListings: "কোনো শস্যৰ তালিকা পোৱা নগ'ল",
    kg: "কেজি",
    quintal: "কুইণ্টল",
  },

  ur: {
    title: "کامن بائر",
    subtitle: "کسانوں سے براہ راست فصل خریدیں",
    search: "فصل تلاش کریں...",
    available: "دستیاب فصلیں",
    quantity: "مقدار",
    price: "قیمت",
    location: "مقام",
    farmer: "کسان",
    buy: "خریداری کی درخواست بھیجیں",
    requestSent: "خریداری کی درخواست بھیج دی گئی",
    noListings: "کوئی فصل لسٹنگ نہیں ملی",
    kg: "کلو",
    quintal: "من",
  },
};

const demoListings: CropListing[] = [
  {
    id: "crop-001",
    farmerName: "Rajesh Kumar",
    crop: "Wheat",
    quantity: 2000,
    unit: "KG",
    price: 24,
    location: "Sonipat, Haryana",
  },
  {
    id: "crop-002",
    farmerName: "Suresh Yadav",
    crop: "Rice",
    quantity: 3500,
    unit: "KG",
    price: 31,
    location: "Patna, Bihar",
  },
  {
    id: "crop-003",
    farmerName: "Amit Singh",
    crop: "Maize",
    quantity: 1800,
    unit: "KG",
    price: 22,
    location: "Gurugram, Haryana",
  },
  {
    id: "crop-004",
    farmerName: "Ravi Sharma",
    crop: "Mustard",
    quantity: 1200,
    unit: "KG",
    price: 48,
    location: "Rohtak, Haryana",
  },
];

export default function BuyerPage() {
  const { language } = useLanguage();

  const ui = buyerText[language] || buyerText.en;

  const [listings, setListings] =
    useState<CropListing[]>(demoListings);

  const [search, setSearch] = useState("");

  const [requestedIds, setRequestedIds] =
    useState<string[]>([]);

  useEffect(() => {
    // Load existing buyer requests
    const savedRequests =
      localStorage.getItem("buyerRequests");

    if (savedRequests) {
      try {
        setRequestedIds(
          JSON.parse(savedRequests)
        );
      } catch {
        setRequestedIds([]);
      }
    }

    // Load real farmer crop listings if available
    const savedListings =
      localStorage.getItem("cropListings");

    if (savedListings) {
      try {
        const parsedListings =
          JSON.parse(savedListings);

        if (
          Array.isArray(parsedListings) &&
          parsedListings.length > 0
        ) {
          setListings(parsedListings);
        }
      } catch {
        setListings(demoListings);
      }
    }
  }, []);

  const filteredListings = listings.filter(
    (item) =>
      item.crop
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.farmerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.location
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const sendBuyRequest = (
    listing: CropListing
  ) => {
    // Prevent duplicate request
    if (requestedIds.includes(listing.id)) {
      return;
    }

    const updatedRequests = [
      ...requestedIds,
      listing.id,
    ];

    setRequestedIds(updatedRequests);

    localStorage.setItem(
      "buyerRequests",
      JSON.stringify(updatedRequests)
    );

    // Read buyer role-specific profile
    let buyerProfile: {
      name?: string;
      businessName?: string;
      phone?: string;
      village?: string;
      district?: string;
      state?: string;
      pinCode?: string;
      buyingLocation?: string;
    } = {};

    try {
      buyerProfile = JSON.parse(
        localStorage.getItem(
          "buyerProfile"
        ) || "{}"
      );
    } catch {
      buyerProfile = {};
    }

    const buyerName =
      buyerProfile.businessName ||
      buyerProfile.name ||
      "Common Buyer";

    const buyerLocation =
      buyerProfile.buyingLocation ||
      [
        buyerProfile.village,
        buyerProfile.district,
        buyerProfile.state,
      ]
        .filter(Boolean)
        .join(", ") ||
      "Buyer Location";

    // Existing requests
    let existingOrders: unknown[] = [];

    try {
      existingOrders = JSON.parse(
        localStorage.getItem(
          "buyRequests"
        ) || "[]"
      );

      if (!Array.isArray(existingOrders)) {
        existingOrders = [];
      }
    } catch {
      existingOrders = [];
    }

    // New request
    const newRequest = {
      id: `request-${Date.now()}`,

      listingId: listing.id,

      farmerName: listing.farmerName,

      crop: listing.crop,

      quantity: listing.quantity,

      unit: listing.unit,

      price: listing.price,

      farmerLocation: listing.location,

      buyerName,

      buyerLocation,

      buyerPhone:
        buyerProfile.phone || "",

      status: "pending",

      createdAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "buyRequests",
      JSON.stringify([
        ...existingOrders,
        newRequest,
      ])
    );
  };

  return (
    <main
      className="min-h-screen bg-[#f3fff7] px-4 py-6 md:px-8"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#006b35] to-[#00a651] p-7 text-white shadow-lg">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

              <div>
                <h1 className="text-3xl font-bold">
                  🛒 {ui.title}
                </h1>

                <p className="mt-2 text-green-50">
                  {ui.subtitle}
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
                <p className="text-sm text-green-50">
                  {ui.available}
                </p>

                <p className="text-3xl font-bold">
                  {filteredListings.length}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-7">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder={ui.search}
            className="w-full rounded-2xl border border-green-100 bg-white px-5 py-4 shadow-sm outline-none focus:border-green-500"
          />
        </div>

        {/* Listings */}
        <section>

          <h2 className="mb-5 text-2xl font-bold text-[#063b2a]">
            🌾 {ui.available}
          </h2>

          {filteredListings.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

              <p className="text-gray-500">
                {ui.noListings}
              </p>

            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">

              {filteredListings.map(
                (listing) => {

                  const requested =
                    requestedIds.includes(
                      listing.id
                    );

                  return (
                    <div
                      key={listing.id}
                      className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >

                      <div className="mb-5 flex items-start justify-between gap-4">

                        <div>

                          <div className="mb-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                            🌱 {listing.crop}
                          </div>

                          <h3 className="text-xl font-bold text-[#063b2a]">
                            {listing.crop}
                          </h3>

                        </div>

                        <div className="text-right">

                          <p className="text-2xl font-bold text-green-700">
                            ₹{listing.price}
                          </p>

                          <p className="text-sm text-gray-500">
                            / {ui.kg}
                          </p>

                        </div>

                      </div>

                      <div className="space-y-3 rounded-2xl bg-[#f6fcf8] p-4">

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">
                            {ui.farmer}
                          </span>

                          <span className="font-semibold text-gray-800">
                            {listing.farmerName}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">
                            {ui.quantity}
                          </span>

                          <span className="font-semibold text-gray-800">
                            {listing.quantity.toLocaleString()}{" "}
                            {listing.unit === "KG"
                              ? ui.kg
                              : ui.quintal}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">
                            {ui.price}
                          </span>

                          <span className="font-semibold text-gray-800">
                            ₹{listing.price} /{" "}
                            {ui.kg}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">
                            {ui.location}
                          </span>

                          <span className="font-semibold text-gray-800">
                            📍 {listing.location}
                          </span>
                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          sendBuyRequest(
                            listing
                          )
                        }
                        disabled={requested}
                        className={`mt-5 w-full rounded-xl px-5 py-3 font-bold transition ${
                          requested
                            ? "bg-gray-200 text-gray-600"
                            : "bg-[#008c3a] text-white hover:bg-[#007832]"
                        }`}
                      >
                        {requested
                          ? `✓ ${ui.requestSent}`
                          : `🛒 ${ui.buy}`}
                      </button>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}