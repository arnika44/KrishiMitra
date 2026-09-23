"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../lib/LanguageProvider";
import type { LanguageCode } from "../../lib/language";

type WasteListing = {
  id: string;
  farmerName: string;
  wasteType: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
};

const translations: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    available: string;
    search: string;
    farmer: string;
    wasteType: string;
    quantity: string;
    price: string;
    location: string;
    buy: string;
    requestSent: string;
    noListings: string;
    kg: string;
    quintal: string;
  }
> = {
  en: {
    title: "Processor",
    subtitle: "Buy agricultural waste directly from farmers",
    available: "Available Waste",
    search: "Search waste...",
    farmer: "Farmer",
    wasteType: "Waste Type",
    quantity: "Quantity",
    price: "Price",
    location: "Location",
    buy: "Send Purchase Request",
    requestSent: "Purchase Request Sent",
    noListings: "No waste listings found",
    kg: "KG",
    quintal: "Quintal",
  },

  hi: {
    title: "प्रोसेसर",
    subtitle: "किसानों से सीधे कृषि अपशिष्ट खरीदें",
    available: "उपलब्ध अपशिष्ट",
    search: "अपशिष्ट खोजें...",
    farmer: "किसान",
    wasteType: "अपशिष्ट प्रकार",
    quantity: "मात्रा",
    price: "कीमत",
    location: "स्थान",
    buy: "खरीद अनुरोध भेजें",
    requestSent: "खरीद अनुरोध भेजा गया",
    noListings: "कोई अपशिष्ट लिस्टिंग नहीं मिली",
    kg: "किलो",
    quintal: "क्विंटल",
  },

  bn: {
    title: "প্রসেসর",
    subtitle: "কৃষকদের কাছ থেকে সরাসরি কৃষি বর্জ্য কিনুন",
    available: "উপলব্ধ বর্জ্য",
    search: "বর্জ্য খুঁজুন...",
    farmer: "কৃষক",
    wasteType: "বর্জ্যের ধরন",
    quantity: "পরিমাণ",
    price: "দাম",
    location: "স্থান",
    buy: "কেনার অনুরোধ পাঠান",
    requestSent: "কেনার অনুরোধ পাঠানো হয়েছে",
    noListings: "কোনও বর্জ্য তালিকা পাওয়া যায়নি",
    kg: "কেজি",
    quintal: "কুইন্টাল",
  },

  mr: {
    title: "प्रोसेसर",
    subtitle: "शेतकऱ्यांकडून थेट कृषी कचरा खरेदी करा",
    available: "उपलब्ध कचरा",
    search: "कचरा शोधा...",
    farmer: "शेतकरी",
    wasteType: "कचऱ्याचा प्रकार",
    quantity: "प्रमाण",
    price: "किंमत",
    location: "स्थान",
    buy: "खरेदी विनंती पाठवा",
    requestSent: "खरेदी विनंती पाठवली",
    noListings: "कोणतीही कचरा लिस्टिंग सापडली नाही",
    kg: "किलो",
    quintal: "क्विंटल",
  },

  ta: {
    title: "செயலாக்குபவர்",
    subtitle: "விவசாயிகளிடமிருந்து நேரடியாக வேளாண் கழிவுகளை வாங்குங்கள்",
    available: "கிடைக்கும் கழிவுகள்",
    search: "கழிவை தேடுங்கள்...",
    farmer: "விவசாயி",
    wasteType: "கழிவு வகை",
    quantity: "அளவு",
    price: "விலை",
    location: "இடம்",
    buy: "வாங்கும் கோரிக்கையை அனுப்பவும்",
    requestSent: "வாங்கும் கோரிக்கை அனுப்பப்பட்டது",
    noListings: "கழிவு பட்டியல் எதுவும் கிடைக்கவில்லை",
    kg: "கிலோ",
    quintal: "குவிண்டால்",
  },

  te: {
    title: "ప్రాసెసర్",
    subtitle: "రైతుల నుండి నేరుగా వ్యవసాయ వ్యర్థాలను కొనండి",
    available: "అందుబాటులో ఉన్న వ్యర్థాలు",
    search: "వ్యర్థాలను వెతకండి...",
    farmer: "రైతు",
    wasteType: "వ్యర్థాల రకం",
    quantity: "పరిమాణం",
    price: "ధర",
    location: "ప్రదేశం",
    buy: "కొనుగోలు అభ్యర్థన పంపండి",
    requestSent: "కొనుగోలు అభ్యర్థన పంపబడింది",
    noListings: "వ్యర్థాల లిస్టింగ్‌లు ఏవీ లభించలేదు",
    kg: "కిలో",
    quintal: "క్వింటల్",
  },

  gu: {
    title: "પ્રોસેસર",
    subtitle: "ખેડૂતો પાસેથી સીધો કૃષિ કચરો ખરીદો",
    available: "ઉપલબ્ધ કચરો",
    search: "કચરો શોધો...",
    farmer: "ખેડૂત",
    wasteType: "કચરાનો પ્રકાર",
    quantity: "જથ્થો",
    price: "કિંમત",
    location: "સ્થળ",
    buy: "ખરીદી વિનંતી મોકલો",
    requestSent: "ખરીદી વિનંતી મોકલવામાં આવી",
    noListings: "કોઈ કચરા લિસ્ટિંગ મળી નથી",
    kg: "કિલો",
    quintal: "ક્વિન્ટલ",
  },

  kn: {
    title: "ಪ್ರೊಸೆಸರ್",
    subtitle: "ರೈತರಿಂದ ನೇರವಾಗಿ ಕೃಷಿ ತ್ಯಾಜ್ಯವನ್ನು ಖರೀದಿಸಿ",
    available: "ಲಭ್ಯವಿರುವ ತ್ಯಾಜ್ಯ",
    search: "ತ್ಯಾಜ್ಯ ಹುಡುಕಿ...",
    farmer: "ರೈತ",
    wasteType: "ತ್ಯಾಜ್ಯದ ವಿಧ",
    quantity: "ಪ್ರಮಾಣ",
    price: "ಬೆಲೆ",
    location: "ಸ್ಥಳ",
    buy: "ಖರೀದಿ ವಿನಂತಿ ಕಳುಹಿಸಿ",
    requestSent: "ಖರೀದಿ ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ",
    noListings: "ಯಾವುದೇ ತ್ಯಾಜ್ಯ ಲಿಸ್ಟಿಂಗ್ ಕಂಡುಬಂದಿಲ್ಲ",
    kg: "ಕೆಜಿ",
    quintal: "ಕ್ವಿಂಟಲ್",
  },

  ml: {
    title: "പ്രോസസർ",
    subtitle: "കർഷകരിൽ നിന്ന് നേരിട്ട് കാർഷിക മാലിന്യം വാങ്ങുക",
    available: "ലഭ്യമായ മാലിന്യം",
    search: "മാലിന്യം തിരയുക...",
    farmer: "കർഷകൻ",
    wasteType: "മാലിന്യ തരം",
    quantity: "അളവ്",
    price: "വില",
    location: "സ്ഥലം",
    buy: "വാങ്ങൽ അഭ്യർത്ഥന അയയ്ക്കുക",
    requestSent: "വാങ്ങൽ അഭ്യർത്ഥന അയച്ചു",
    noListings: "മാലിന്യ ലിസ്റ്റിംഗുകൾ ഒന്നും കണ്ടെത്തിയില്ല",
    kg: "കിലോ",
    quintal: "ക്വിന്റൽ",
  },

  pa: {
    title: "ਪ੍ਰੋਸੈਸਰ",
    subtitle: "ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧਾ ਖੇਤੀਬਾੜੀ ਕਚਰਾ ਖਰੀਦੋ",
    available: "ਉਪਲਬਧ ਕਚਰਾ",
    search: "ਕਚਰਾ ਖੋਜੋ...",
    farmer: "ਕਿਸਾਨ",
    wasteType: "ਕਚਰੇ ਦੀ ਕਿਸਮ",
    quantity: "ਮਾਤਰਾ",
    price: "ਕੀਮਤ",
    location: "ਸਥਾਨ",
    buy: "ਖਰੀਦ ਬੇਨਤੀ ਭੇਜੋ",
    requestSent: "ਖਰੀਦ ਬੇਨਤੀ ਭੇਜੀ ਗਈ",
    noListings: "ਕੋਈ ਕਚਰਾ ਲਿਸਟਿੰਗ ਨਹੀਂ ਮਿਲੀ",
    kg: "ਕਿਲੋ",
    quintal: "ਕੁਇੰਟਲ",
  },

  or: {
    title: "ପ୍ରୋସେସର",
    subtitle: "ଚାଷୀଙ୍କଠାରୁ ସିଧାସଳଖ କୃଷି ବର୍ଜ୍ୟ କିଣନ୍ତୁ",
    available: "ଉପଲବ୍ଧ ବର୍ଜ୍ୟ",
    search: "ବର୍ଜ୍ୟ ଖୋଜନ୍ତୁ...",
    farmer: "ଚାଷୀ",
    wasteType: "ବର୍ଜ୍ୟ ପ୍ରକାର",
    quantity: "ପରିମାଣ",
    price: "ମୂଲ୍ୟ",
    location: "ସ୍ଥାନ",
    buy: "କ୍ରୟ ଅନୁରୋଧ ପଠାନ୍ତୁ",
    requestSent: "କ୍ରୟ ଅନୁରୋଧ ପଠାଯାଇଛି",
    noListings: "କୌଣସି ବର୍ଜ୍ୟ ଲିଷ୍ଟିଂ ମିଳିଲା ନାହିଁ",
    kg: "କିଲୋ",
    quintal: "କ୍ୱିଣ୍ଟାଲ",
  },

  as: {
    title: "প্ৰচেছৰ",
    subtitle: "কৃষকৰ পৰা পোনপটীয়াকৈ কৃষি আৱৰ্জনা কিনক",
    available: "উপলব্ধ আৱৰ্জনা",
    search: "আৱৰ্জনা বিচাৰক...",
    farmer: "কৃষক",
    wasteType: "আৱৰ্জনাৰ ধৰণ",
    quantity: "পৰিমাণ",
    price: "মূল্য",
    location: "স্থান",
    buy: "ক্ৰয় অনুৰোধ পঠিয়াওক",
    requestSent: "ক্ৰয় অনুৰোধ পঠিওৱা হৈছে",
    noListings: "কোনো আৱৰ্জনাৰ তালিকা পোৱা নগ'ল",
    kg: "কেজি",
    quintal: "কুইণ্টল",
  },

  ur: {
    title: "پروسیسر",
    subtitle: "کسانوں سے براہ راست زرعی فضلہ خریدیں",
    available: "دستیاب فضلہ",
    search: "فضلہ تلاش کریں...",
    farmer: "کسان",
    wasteType: "فضلے کی قسم",
    quantity: "مقدار",
    price: "قیمت",
    location: "مقام",
    buy: "خریداری کی درخواست بھیجیں",
    requestSent: "خریداری کی درخواست بھیج دی گئی",
    noListings: "کوئی فضلہ لسٹنگ نہیں ملی",
    kg: "کلو",
    quintal: "من",
  },
};

const demoListings: WasteListing[] = [
  {
    id: "waste-001",
    farmerName: "Rajesh Kumar",
    wasteType: "Wheat Straw",
    quantity: 1500,
    unit: "KG",
    price: 5,
    location: "Sonipat, Haryana",
  },
  {
    id: "waste-002",
    farmerName: "Suresh Yadav",
    wasteType: "Rice Husk",
    quantity: 2200,
    unit: "KG",
    price: 6,
    location: "Patna, Bihar",
  },
  {
    id: "waste-003",
    farmerName: "Amit Singh",
    wasteType: "Maize Residue",
    quantity: 1200,
    unit: "KG",
    price: 7,
    location: "Gurugram, Haryana",
  },
  {
    id: "waste-004",
    farmerName: "Ravi Sharma",
    wasteType: "Mustard Residue",
    quantity: 900,
    unit: "KG",
    price: 8,
    location: "Rohtak, Haryana",
  },
];

export default function ProcessorPage() {
  const { language } = useLanguage();

  const t =
    translations[language] ||
    translations.en;

  const [listings, setListings] =
    useState<WasteListing[]>(
      demoListings
    );

  const [search, setSearch] =
    useState("");

  const [requestedIds, setRequestedIds] =
    useState<string[]>([]);

  useEffect(() => {
    try {
      const savedRequests =
        JSON.parse(
          localStorage.getItem(
            "processorRequests"
          ) || "[]"
        );

      if (Array.isArray(savedRequests)) {
        setRequestedIds(savedRequests);
      }
    } catch {
      setRequestedIds([]);
    }

    try {
      const savedListings =
        JSON.parse(
          localStorage.getItem(
            "wasteListings"
          ) || "[]"
        );

      if (
        Array.isArray(savedListings) &&
        savedListings.length > 0
      ) {
        setListings(savedListings);
      }
    } catch {
      setListings(demoListings);
    }
  }, []);

  const filteredListings =
    listings.filter((item) => {
      const value =
        search.toLowerCase();

      return (
        item.wasteType
          .toLowerCase()
          .includes(value) ||
        item.farmerName
          .toLowerCase()
          .includes(value) ||
        item.location
          .toLowerCase()
          .includes(value)
      );
    });

  const sendPurchaseRequest = (
    listing: WasteListing
  ) => {
    if (
      requestedIds.includes(listing.id)
    ) {
      return;
    }

    const updatedRequestedIds = [
      ...requestedIds,
      listing.id,
    ];

    setRequestedIds(
      updatedRequestedIds
    );

    localStorage.setItem(
      "processorRequests",
      JSON.stringify(
        updatedRequestedIds
      )
    );

    let processorProfile: {
      name?: string;
      businessName?: string;
      phone?: string;
      village?: string;
      district?: string;
      state?: string;
      buyingLocation?: string;
      processingLocation?: string;
    } = {};

    try {
      processorProfile =
        JSON.parse(
          localStorage.getItem(
            "processorProfile"
          ) || "{}"
        );
    } catch {
      processorProfile = {};
    }

    const processorName =
      processorProfile.businessName ||
      processorProfile.name ||
      "Processor";

    const processorLocation =
      processorProfile.processingLocation ||
      processorProfile.buyingLocation ||
      [
        processorProfile.village,
        processorProfile.district,
        processorProfile.state,
      ]
        .filter(Boolean)
        .join(", ") ||
      "Processor Location";

    let existingRequests: unknown[] =
      [];

    try {
      existingRequests =
        JSON.parse(
          localStorage.getItem(
            "wasteBuyRequests"
          ) || "[]"
        );

      if (
        !Array.isArray(
          existingRequests
        )
      ) {
        existingRequests = [];
      }
    } catch {
      existingRequests = [];
    }

    const newRequest = {
      id: `waste-request-${Date.now()}`,

      wasteListingId:
        listing.id,

      farmerName:
        listing.farmerName,

      wasteType:
        listing.wasteType,

      quantity:
        listing.quantity,

      unit:
        listing.unit,

      price:
        listing.price,

      farmerLocation:
        listing.location,

      processorName,

      processorLocation,

      processorPhone:
        processorProfile.phone ||
        "",

      status:
        "pending",

      logisticsReady:
        false,

      createdAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "wasteBuyRequests",
      JSON.stringify([
        ...existingRequests,
        newRequest,
      ])
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

        {/* Header */}
        <div className="mb-8">

          <div className="rounded-3xl bg-gradient-to-r from-[#006b35] to-[#00a651] p-7 text-white shadow-lg">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

              <div>

                <h1 className="text-3xl font-bold">
                  🏭 {t.title}
                </h1>

                <p className="mt-2 text-green-50">
                  {t.subtitle}
                </p>

              </div>

              <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">

                <p className="text-sm text-green-50">
                  {t.available}
                </p>

                <p className="text-3xl font-bold">
                  {
                    filteredListings.length
                  }
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
              setSearch(
                e.target.value
              )
            }
            placeholder={t.search}
            className="w-full rounded-2xl border border-green-100 bg-white px-5 py-4 shadow-sm outline-none focus:border-green-500"
          />

        </div>

        {/* Listings */}
        <section>

          <h2 className="mb-5 text-2xl font-bold text-[#063b2a]">
            ♻️ {t.available}
          </h2>

          {filteredListings.length ===
          0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

              <p className="text-gray-500">
                {t.noListings}
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
                            ♻️{" "}
                            {
                              listing.wasteType
                            }
                          </div>

                          <h3 className="text-xl font-bold text-[#063b2a]">
                            {
                              listing.wasteType
                            }
                          </h3>

                        </div>

                        <div className="text-right">

                          <p className="text-2xl font-bold text-green-700">
                            ₹
                            {
                              listing.price
                            }
                          </p>

                          <p className="text-sm text-gray-500">
                            / {t.kg}
                          </p>

                        </div>

                      </div>

                      <div className="space-y-3 rounded-2xl bg-[#f6fcf8] p-4">

                        <div className="flex justify-between gap-4">

                          <span className="text-gray-500">
                            {t.farmer}
                          </span>

                          <span className="font-semibold text-gray-800">
                            {
                              listing.farmerName
                            }
                          </span>

                        </div>

                        <div className="flex justify-between gap-4">

                          <span className="text-gray-500">
                            {t.wasteType}
                          </span>

                          <span className="font-semibold text-gray-800">
                            {
                              listing.wasteType
                            }
                          </span>

                        </div>

                        <div className="flex justify-between gap-4">

                          <span className="text-gray-500">
                            {t.quantity}
                          </span>

                          <span className="font-semibold text-gray-800">
                            {
                              listing.quantity.toLocaleString()
                            }{" "}
                            {listing.unit ===
                            "KG"
                              ? t.kg
                              : t.quintal}
                          </span>

                        </div>

                        <div className="flex justify-between gap-4">

                          <span className="text-gray-500">
                            {t.price}
                          </span>

                          <span className="font-semibold text-gray-800">
                            ₹
                            {
                              listing.price
                            }{" "}
                            / {t.kg}
                          </span>

                        </div>

                        <div className="flex justify-between gap-4">

                          <span className="text-gray-500">
                            {t.location}
                          </span>

                          <span className="text-right font-semibold text-gray-800">
                            📍{" "}
                            {
                              listing.location
                            }
                          </span>

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          sendPurchaseRequest(
                            listing
                          )
                        }
                        disabled={
                          requested
                        }
                        className={`mt-5 w-full rounded-xl px-5 py-3 font-bold transition ${
                          requested
                            ? "bg-gray-200 text-gray-600"
                            : "bg-[#008c3a] text-white hover:bg-[#007832]"
                        }`}
                      >
                        {requested
                          ? `✓ ${t.requestSent}`
                          : `🏭 ${t.buy}`}
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