
// MarketPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
  landUnit?: string;
};

type Profile = {
  village?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;

  // Optional address fields used for accurate farmer-location lookup.
  address?: string;
  addressLine1?: string;
  addressLine2?: string;
  postOffice?: string;
  tehsil?: string;
  block?: string;

  villageName?: string;
  cityName?: string;
  districtName?: string;
  stateName?: string;
  pinCode?: string;
};

type QuantityUnit =
  | "gram"
  | "kg"
  | "quintal"
  | "ton"
  | "bag";

type MandiBase = {
  name: string;
  district: string;
  state: string;
  address?: string;

  /*
    IMPORTANT:
    rate is stored as ₹/quintal.
    This keeps all mandi rates comparable.
  */
  rate: number;

  marketType: string;

  lat?: number;
  lng?: number;

  /*
    Bag weight is optional.
    Example:
    bagWeightKg: 50 means 1 bag = 50 kg.
  */
  bagWeightKg?: number;

  /*
    Crops supported by this mandi.
    If omitted, mandi is considered generic.
  */
  crops?: string[];
};

type Mandi = MandiBase & {
  id: string;

  distanceKm: number;

  /*
    Transport is calculated for the user's actual quantity.
  */
  transportPerQuintal: number;
  totalTransport: number;

  effectiveRatePerQuintal: number;
  effectiveRatePerKg: number;

  grossAmount: number;
  estimatedEarning: number;

  isSameDistrict: boolean;
  isSameState: boolean;
};

type T = {
  backTo: string;
  season: string;
  market: string;
  landArea: string;

  loadingTitle: string;
  loadingText: string;

  cropNotFound: string;
  backToCrops: string;

  currentMarket: string;
  marketDescription: string;

  cropLabel: string;
  indicativePrice: string;
  marketTrend: string;
  sellingAdvice: string;

  nearbyMarket: string;
  nearbyMarketDescription: string;

  profileLocation: string;
  usingProfileLocation: string;

  village: string;
  district: string;
  state: string;
  pincode: string;

  findMandi: string;
  refreshRates: string;
  refreshing: string;

  lastUpdated: string;
  searchingMandi: string;
  tryAgain: string;

  mandiFound: string;
  mandiRate: string;
  distance: string;

  transportation: string;
  effectiveRate: string;
  perQuintal: string;
  perKg: string;

  marketType: string;
  apmc: string;
  localMarket: string;

  noMandi: string;
  apiFailed: string;

  indicativeNotice: string;

  importantBeforeSelling: string;
  tip1: string;
  tip2: string;
  tip3: string;
  tip4: string;

  bestMandi: string;
  bestOption: string;

  quantityCalculator: string;
  quantity: string;

  selectUnit: string;
  gram: string;
  kg: string;
  quintal: string;
  ton: string;
  bag: string;

  quantityEquivalent: string;
  totalKg: string;

  grossAmount: string;
  totalTransport: string;
  estimatedEarning: string;

  save: string;
  saved: string;

  directions: string;

  availableCrop: string;

  netPerQuintal: string;
  netPerKg: string;

  sameDistrict: string;
  nearbyDistrict: string;
  otherDistrict: string;

  locationSource: string;
  browserLocation: string;
  profileLocationSource: string;

  rankingNote: string;

  distanceLimit: string;

  invalidQuantity: string;

  rateUnitNote: string;

  seasonNames: {
    Kharif: string;
    Rabi: string;
    Zaid: string;
    Other: string;
  };

  trendStable: string;
  trendModerate: string;
  trendVariable: string;
  trendCheck: string;

  unknownPrice: string;
};

/* =========================================================
   ENGLISH
========================================================= */

const en: T = {
  backTo: "Back to",
  season: "Season",
  market: "Market",
  landArea: "Land Area",

  loadingTitle: "Loading Market...",
  loadingText: "Please wait while we prepare market information.",

  cropNotFound: "Crop not found",
  backToCrops: "Back to Crops",

  currentMarket: "📊 Current Market Information",
  marketDescription:
    "Indicative information for your crop. Verify the latest local mandi rate before selling.",

  cropLabel: "Crop",
  indicativePrice: "Indicative Price",
  marketTrend: "Market Trend",
  sellingAdvice: "💡 Selling Advice",

  nearbyMarket: "📍 Nearby Mandi & Markets",
  nearbyMarketDescription:
    "Mandis are found around the farmer's saved profile address using its map coordinates. Nearby mandis from surrounding districts can also appear.",

  profileLocation: "Profile Location",
  usingProfileLocation: "Using location saved in your profile",

  village: "Village",
  district: "District",
  state: "State",
  pincode: "Pincode",

  findMandi: "📍 Find Nearby Mandi",
  refreshRates: "🔄 Refresh Latest Rates",
  refreshing: "🔄 Refreshing...",

  lastUpdated: "Last updated",
  searchingMandi: "🔎 Searching mandis...",
  tryAgain: "Try Again",

  mandiFound: "mandis found",
  mandiRate: "Mandi Rate",
  distance: "Distance",

  transportation: "Estimated Transport",
  effectiveRate: "Effective Rate",
  perQuintal: "per quintal",
  perKg: "per kg",

  marketType: "Market Type",
  apmc: "APMC Mandi",
  localMarket: "Local Market",

  noMandi:
    "No suitable nearby mandi was found for this location.",
  apiFailed:
    "Live mandi search is unavailable right now. Showing available market information.",

  indicativeNotice:
    "Mandi rates are indicative. Final rate must be verified at the mandi. Transport cost is estimated and may vary.",

  importantBeforeSelling: "⚠️ Important Before Selling",

  tip1:
    "Compare prices from more than one nearby mandi whenever possible.",

  tip2:
    "Crop quality, moisture and grading can affect the final selling price.",

  tip3:
    "Consider transportation cost before choosing a mandi with a slightly higher price.",

  tip4:
    "Verify the latest mandi rate before making a final selling decision.",

  bestMandi: "⭐ Best Mandi Recommendation",
  bestOption: "Best option",

  quantityCalculator: "💰 Quantity-wise Earning Calculator",
  quantity: "Amount to Sell",

  selectUnit: "Unit",

  gram: "Gram",
  kg: "Kilogram",
  quintal: "Quintal",
  ton: "Ton",
  bag: "Bag",

  quantityEquivalent: "Equivalent quantity",
  totalKg: "Total kg",

  grossAmount: "Gross Sale Amount",
  totalTransport: "Total Transport Cost",
  estimatedEarning: "Estimated Earning",

  save: "Save Mandi",
  saved: "Saved Mandi",

  directions: "📍 Directions",

  availableCrop: "Available Crop",

  netPerQuintal: "Net per quintal",
  netPerKg: "Net per kg",

  sameDistrict: "Same District",
  nearbyDistrict: "Nearby District",
  otherDistrict: "Other District",

  locationSource: "Location Source",
  browserLocation: "Browser Location",
  profileLocationSource: "Profile Location",

  rankingNote:
    "Ranking considers distance, district priority, transport cost and estimated earning.",

  distanceLimit: "Nearby distance limit",

  invalidQuantity:
    "Please enter a quantity greater than 0.",

  rateUnitNote:
    "Mandi rates are normalized to ₹/quintal for comparison.",

  seasonNames: {
    Kharif: "Kharif",
    Rabi: "Rabi",
    Zaid: "Zaid",
    Other: "Other",
  },

  trendStable: "Stable",
  trendModerate: "Moderate",
  trendVariable: "Variable",
  trendCheck: "Check local mandi",

  unknownPrice: "Market rate unavailable",
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations: Record<string, Partial<T>> = {
  hi: {
    backTo: "वापस जाएँ",
    season: "मौसम",
    market: "बाज़ार",
    landArea: "जमीन का क्षेत्रफल",

    loadingTitle: "बाज़ार की जानकारी लोड हो रही है...",
    loadingText: "कृपया प्रतीक्षा करें।",

    cropNotFound: "फसल नहीं मिली",
    backToCrops: "फसलों पर वापस जाएँ",

    currentMarket: "📊 वर्तमान बाज़ार जानकारी",
    marketDescription:
      "आपकी फसल के लिए अनुमानित जानकारी। बेचने से पहले स्थानीय मंडी का नवीनतम भाव जाँचें।",

    cropLabel: "फसल",
    indicativePrice: "अनुमानित कीमत",
    marketTrend: "बाज़ार का रुझान",
    sellingAdvice: "💡 बिक्री की सलाह",

    nearbyMarket: "📍 नज़दीकी मंडी और बाज़ार",
    nearbyMarketDescription:
      "आपके सेव किए गए पते के आसपास की मंडियाँ वास्तविक दूरी के आधार पर दिखाई जाएँगी। पास के दूसरे जिलों की मंडियाँ भी दिखाई जा सकती हैं।",

    profileLocation: "प्रोफाइल लोकेशन",
    usingProfileLocation:
      "प्रोफाइल में सेव की गई लोकेशन का उपयोग हो रहा है",

    village: "गाँव",
    district: "जिला",
    state: "राज्य",
    pincode: "पिनकोड",

    findMandi: "📍 नज़दीकी मंडी खोजें",
    refreshRates: "🔄 नवीनतम भाव रिफ्रेश करें",
    refreshing: "🔄 रिफ्रेश हो रहा है...",

    lastUpdated: "अंतिम अपडेट",
    searchingMandi: "🔎 मंडियाँ खोजी जा रही हैं...",
    tryAgain: "फिर से कोशिश करें",

    mandiFound: "मंडियाँ मिलीं",
    mandiRate: "मंडी भाव",
    distance: "दूरी",

    transportation: "अनुमानित परिवहन",
    effectiveRate: "प्रभावी भाव",
    perQuintal: "प्रति क्विंटल",
    perKg: "प्रति किलो",

    marketType: "बाज़ार का प्रकार",
    apmc: "APMC मंडी",
    localMarket: "स्थानीय बाज़ार",

    noMandi: "इस लोकेशन के आसपास उपयुक्त मंडी नहीं मिली।",

    indicativeNotice:
      "मंडी भाव अनुमानित हैं। अंतिम भाव मंडी में जरूर जाँचें। परिवहन खर्च अनुमानित है और बदल सकता है।",

    importantBeforeSelling: "⚠️ बेचने से पहले जरूरी बातें",

    tip1:
      "जहाँ संभव हो, एक से अधिक नज़दीकी मंडियों के भाव की तुलना करें।",

    tip2:
      "फसल की गुणवत्ता, नमी और ग्रेडिंग से अंतिम कीमत प्रभावित हो सकती है।",

    tip3:
      "थोड़ा अधिक भाव वाली मंडी चुनने से पहले परिवहन खर्च भी ध्यान में रखें।",

    tip4:
      "अंतिम बिक्री निर्णय से पहले नवीनतम मंडी भाव जरूर जाँचें।",

    bestMandi: "⭐ सबसे अच्छी मंडी की सलाह",
    bestOption: "सबसे अच्छा विकल्प",

    quantityCalculator: "💰 मात्रा के हिसाब से कमाई कैलकुलेटर",
    quantity: "बेचने की मात्रा",

    selectUnit: "इकाई",

    gram: "ग्राम",
    kg: "किलो",
    quintal: "क्विंटल",
    ton: "टन",
    bag: "बोरी",

    quantityEquivalent: "कुल मात्रा",
    totalKg: "कुल किलो",

    grossAmount: "कुल बिक्री रकम",
    totalTransport: "कुल परिवहन खर्च",
    estimatedEarning: "अनुमानित कमाई",

    save: "मंडी सेव करें",
    saved: "मंडी सेव है",

    directions: "📍 रास्ता देखें",

    availableCrop: "उपलब्ध फसल",

    netPerQuintal: "प्रति क्विंटल शुद्ध भाव",
    netPerKg: "प्रति किलो शुद्ध भाव",

    sameDistrict: "इसी जिले की मंडी",
    nearbyDistrict: "नज़दीकी जिले की मंडी",
    otherDistrict: "अन्य जिले की मंडी",

    locationSource: "लोकेशन स्रोत",
    browserLocation: "मोबाइल लोकेशन",
    profileLocationSource: "प्रोफाइल लोकेशन",

    rankingNote:
      "रैंकिंग में दूरी, जिला प्राथमिकता, परिवहन खर्च और अनुमानित कमाई को ध्यान में रखा गया है।",

    distanceLimit: "नज़दीकी दूरी सीमा",

    invalidQuantity:
      "कृपया 0 से अधिक मात्रा दर्ज करें।",

    rateUnitNote:
      "तुलना के लिए सभी मंडी भाव ₹/क्विंटल में normalize किए गए हैं।",

    seasonNames: {
      Kharif: "खरीफ",
      Rabi: "रबी",
      Zaid: "जायद",
      Other: "अन्य",
    },

    trendStable: "स्थिर",
    trendModerate: "मध्यम",
    trendVariable: "बदलता हुआ",
    trendCheck: "स्थानीय मंडी का भाव देखें",

    unknownPrice: "बाज़ार भाव उपलब्ध नहीं है",
  },

  mr: {
    backTo: "परत जा",
    season: "हंगाम",
    market: "बाजार",
    landArea: "जमिनीचे क्षेत्रफळ",

    currentMarket: "📊 सध्याची बाजार माहिती",
    marketDescription:
      "तुमच्या पिकासाठी अंदाजे बाजार माहिती. विक्रीपूर्वी स्थानिक बाजाराचा नवीनतम दर तपासा.",

    cropLabel: "पीक",
    indicativePrice: "अंदाजे किंमत",
    marketTrend: "बाजाराचा कल",
    sellingAdvice: "💡 विक्रीचा सल्ला",

    nearbyMarket: "📍 जवळच्या बाजारपेठा",
    nearbyMarketDescription:
      "प्रथम तुमच्या जिल्ह्यातील आणि जवळच्या जिल्ह्यांतील बाजारपेठा दाखवल्या जातील.",

    profileLocation: "प्रोफाइल लोकेशन",
    usingProfileLocation:
      "प्रोफाइलमध्ये सेव्ह केलेले लोकेशन वापरले जात आहे",

    village: "गाव",
    district: "जिल्हा",
    state: "राज्य",
    pincode: "पिनकोड",

    findMandi: "📍 जवळची बाजारपेठ शोधा",
    refreshRates: "🔄 नवीनतम दर रिफ्रेश करा",
    refreshing: "🔄 रिफ्रेश होत आहे...",

    lastUpdated: "शेवटचे अपडेट",
    searchingMandi: "🔎 बाजारपेठा शोधत आहे...",
    tryAgain: "पुन्हा प्रयत्न करा",

    mandiFound: "बाजारपेठा सापडल्या",
    mandiRate: "बाजार दर",
    distance: "अंतर",

    transportation: "अंदाजे वाहतूक",
    effectiveRate: "प्रभावी दर",
    perQuintal: "प्रति क्विंटल",
    perKg: "प्रति किलो",

    marketType: "बाजाराचा प्रकार",
    apmc: "APMC बाजार",
    localMarket: "स्थानिक बाजार",

    bestMandi: "⭐ सर्वोत्तम बाजारपेठ",
    bestOption: "सर्वोत्तम पर्याय",

    quantityCalculator:
      "💰 प्रमाणानुसार कमाई कॅल्क्युलेटर",

    quantity: "विक्रीचे प्रमाण",
    selectUnit: "एकक",

    gram: "ग्राम",
    kg: "किलो",
    quintal: "क्विंटल",
    ton: "टन",
    bag: "पोते",

    quantityEquivalent: "एकूण प्रमाण",
    totalKg: "एकूण किलो",

    grossAmount: "एकूण विक्री रक्कम",
    totalTransport: "एकूण वाहतूक खर्च",
    estimatedEarning: "अंदाजे कमाई",

    save: "बाजार जतन करा",
    saved: "जतन केले",
    directions: "📍 मार्ग",

    availableCrop: "उपलब्ध पीक",

    netPerQuintal: "प्रति क्विंटल निव्वळ दर",
    netPerKg: "प्रति किलो निव्वळ दर",

    sameDistrict: "त्याच जिल्ह्यातील बाजार",
    nearbyDistrict: "जवळच्या जिल्ह्यातील बाजार",
    otherDistrict: "इतर जिल्ह्यातील बाजार",

    locationSource: "लोकेशन स्रोत",
    browserLocation: "मोबाइल लोकेशन",
    profileLocationSource: "प्रोफाइल लोकेशन",

    rankingNote:
      "क्रमवारीत अंतर, जिल्हा, वाहतूक खर्च आणि अंदाजे कमाई विचारात घेतली जाते.",

    distanceLimit: "जवळची अंतर मर्यादा",

    invalidQuantity:
      "कृपया 0 पेक्षा जास्त प्रमाण टाका.",

    rateUnitNote:
      "तुलनेसाठी सर्व बाजार दर ₹/क्विंटलमध्ये रूपांतरित केले आहेत.",

    indicativeNotice:
      "बाजार दर अंदाजे आहेत. अंतिम दर बाजारात तपासा. वाहतूक खर्च बदलू शकतो.",
  },

  bn: {
    backTo: "ফিরে যান",
    season: "মরসুম",
    market: "বাজার",
    landArea: "জমির পরিমাণ",

    currentMarket: "📊 বর্তমান বাজারের তথ্য",
    cropLabel: "ফসল",
    indicativePrice: "আনুমানিক দাম",
    marketTrend: "বাজারের প্রবণতা",
    sellingAdvice: "💡 বিক্রির পরামর্শ",

    nearbyMarket: "📍 কাছাকাছি মণ্ডি ও বাজার",
    nearbyMarketDescription:
      "প্রথমে আপনার জেলা এবং কাছাকাছি জেলার বাজার দেখানো হবে।",

    profileLocation: "প্রোফাইল লোকেশন",
    usingProfileLocation:
      "প্রোফাইলে সংরক্ষিত লোকেশন ব্যবহার করা হচ্ছে",

    village: "গ্রাম",
    district: "জেলা",
    state: "রাজ্য",
    pincode: "পিনকোড",

    findMandi: "📍 কাছাকাছি মণ্ডি খুঁজুন",
    refreshRates: "🔄 সর্বশেষ দাম রিফ্রেশ করুন",
    refreshing: "🔄 রিফ্রেশ হচ্ছে...",

    lastUpdated: "শেষ আপডেট",
    searchingMandi: "🔎 মণ্ডি খোঁজা হচ্ছে...",
    tryAgain: "আবার চেষ্টা করুন",

    mandiFound: "টি মণ্ডি পাওয়া গেছে",
    mandiRate: "মণ্ডির দাম",
    distance: "দূরত্ব",

    transportation: "আনুমানিক পরিবহন",
    effectiveRate: "কার্যকর দাম",
    perQuintal: "প্রতি কুইন্টাল",
    perKg: "প্রতি কেজি",

    marketType: "বাজারের ধরন",
    apmc: "APMC মণ্ডি",
    localMarket: "স্থানীয় বাজার",

    bestMandi: "⭐ সেরা মণ্ডির পরামর্শ",
    bestOption: "সেরা বিকল্প",

    quantityCalculator:
      "💰 পরিমাণ অনুযায়ী আয় ক্যালকুলেটর",

    quantity: "বিক্রির পরিমাণ",
    selectUnit: "একক",

    gram: "গ্রাম",
    kg: "কেজি",
    quintal: "কুইন্টাল",
    ton: "টন",
    bag: "বস্তা",

    quantityEquivalent: "মোট পরিমাণ",
    totalKg: "মোট কেজি",

    grossAmount: "মোট বিক্রয়",
    totalTransport: "মোট পরিবহন খরচ",
    estimatedEarning: "আনুমানিক আয়",

    save: "মণ্ডি সংরক্ষণ করুন",
    saved: "সংরক্ষিত",
    directions: "📍 পথনির্দেশ",

    availableCrop: "উপলব্ধ ফসল",

    netPerQuintal: "প্রতি কুইন্টালে নিট দাম",
    netPerKg: "প্রতি কেজি নিট দাম",

    sameDistrict: "একই জেলার মণ্ডি",
    nearbyDistrict: "কাছের জেলার মণ্ডি",
    otherDistrict: "অন্য জেলার মণ্ডি",

    locationSource: "লোকেশন উৎস",
    browserLocation: "মোবাইল লোকেশন",
    profileLocationSource: "প্রোফাইল লোকেশন",

    rankingNote:
      "দূরত্ব, জেলা, পরিবহন খরচ এবং আনুমানিক আয়ের ভিত্তিতে র‍্যাঙ্ক করা হয়।",

    distanceLimit: "কাছাকাছি দূরত্ব সীমা",

    invalidQuantity:
      "অনুগ্রহ করে 0-এর বেশি পরিমাণ দিন।",

    rateUnitNote:
      "তুলনার জন্য সব বাজারদর ₹/কুইন্টালে রূপান্তর করা হয়েছে।",

    indicativeNotice:
      "মণ্ডির দাম আনুমানিক। চূড়ান্ত দাম মণ্ডিতে যাচাই করুন।",
  },

  ta: {
    backTo: "திரும்ப",
    season: "பருவம்",
    market: "சந்தை",
    landArea: "நிலப்பரப்பு",

    currentMarket: "📊 தற்போதைய சந்தை தகவல்",
    cropLabel: "பயிர்",
    indicativePrice: "மதிப்பிடப்பட்ட விலை",
    marketTrend: "சந்தை நிலவரம்",
    sellingAdvice: "💡 விற்பனை ஆலோசனை",

    nearbyMarket: "📍 அருகிலுள்ள சந்தைகள்",
    nearbyMarketDescription:
      "முதலில் உங்கள் மாவட்டம் மற்றும் அருகிலுள்ள மாவட்டங்களின் சந்தைகள் காட்டப்படும்.",

    profileLocation: "சுயவிவர இடம்",
    usingProfileLocation:
      "சுயவிவரத்தில் சேமிக்கப்பட்ட இடம் பயன்படுத்தப்படுகிறது",

    village: "கிராமம்",
    district: "மாவட்டம்",
    state: "மாநிலம்",
    pincode: "பின்கோடு",

    findMandi: "📍 அருகிலுள்ள சந்தையை தேடு",
    refreshRates: "🔄 சமீபத்திய விலையை புதுப்பிக்கவும்",
    refreshing: "🔄 புதுப்பிக்கிறது...",

    lastUpdated: "கடைசி புதுப்பிப்பு",
    searchingMandi: "🔎 சந்தைகளை தேடுகிறது...",
    tryAgain: "மீண்டும் முயற்சி",

    mandiFound: "சந்தைகள் கிடைத்தன",
    mandiRate: "சந்தை விலை",
    distance: "தூரம்",

    transportation: "மதிப்பிடப்பட்ட போக்குவரத்து",
    effectiveRate: "பயனுள்ள விலை",
    perQuintal: "ஒரு குவிண்டாலுக்கு",
    perKg: "ஒரு கிலோவுக்கு",

    marketType: "சந்தை வகை",
    apmc: "APMC சந்தை",
    localMarket: "உள்ளூர் சந்தை",

    bestMandi: "⭐ சிறந்த சந்தை பரிந்துரை",
    bestOption: "சிறந்த தேர்வு",

    quantityCalculator:
      "💰 அளவுக்கேற்ப வருமான கணக்கீடு",

    quantity: "விற்பனை அளவு",
    selectUnit: "அலகு",

    gram: "கிராம்",
    kg: "கிலோ",
    quintal: "குவிண்டால்",
    ton: "டன்",
    bag: "பை",

    quantityEquivalent: "மொத்த அளவு",
    totalKg: "மொத்த கிலோ",

    grossAmount: "மொத்த விற்பனை",
    totalTransport: "மொத்த போக்குவரத்து செலவு",
    estimatedEarning: "மதிப்பிடப்பட்ட வருமானம்",

    save: "சந்தையை சேமிக்கவும்",
    saved: "சேமிக்கப்பட்டது",
    directions: "📍 வழி",

    availableCrop: "கிடைக்கும் பயிர்",

    netPerQuintal: "ஒரு குவிண்டாலுக்கான நிகர விலை",
    netPerKg: "ஒரு கிலோவுக்கான நிகர விலை",

    sameDistrict: "அதே மாவட்ட சந்தை",
    nearbyDistrict: "அருகிலுள்ள மாவட்ட சந்தை",
    otherDistrict: "மற்ற மாவட்ட சந்தை",

    locationSource: "இட ஆதாரம்",
    browserLocation: "மொபைல் இடம்",
    profileLocationSource: "சுயவிவர இடம்",

    rankingNote:
      "தூரம், மாவட்டம், போக்குவரத்து செலவு மற்றும் வருமானத்தின் அடிப்படையில் தரவரிசை.",

    distanceLimit: "அருகிலுள்ள தூர வரம்பு",

    invalidQuantity:
      "0-ஐ விட அதிகமான அளவை உள்ளிடவும்.",

    rateUnitNote:
      "ஒப்பீட்டிற்காக அனைத்து சந்தை விலைகளும் ₹/குவிண்டாலாக மாற்றப்பட்டுள்ளன.",

    indicativeNotice:
      "சந்தை விலைகள் மதிப்பீடு மட்டுமே. இறுதி விலையை சந்தையில் சரிபார்க்கவும்.",
  },

  te: {
    backTo: "వెనక్కి",
    season: "సీజన్",
    market: "మార్కెట్",
    landArea: "భూమి విస్తీర్ణం",

    currentMarket: "📊 ప్రస్తుత మార్కెట్ సమాచారం",
    cropLabel: "పంట",
    indicativePrice: "అంచనా ధర",
    marketTrend: "మార్కెట్ ధోరణి",
    sellingAdvice: "💡 అమ్మకం సలహా",

    nearbyMarket: "📍 సమీప మండీలు",
    nearbyMarketDescription:
      "ముందుగా మీ జిల్లా మరియు సమీప జిల్లాల మండీలు చూపబడతాయి.",

    profileLocation: "ప్రొఫైల్ లొకేషన్",
    usingProfileLocation:
      "ప్రొఫైల్‌లో సేవ్ చేసిన లొకేషన్ ఉపయోగించబడుతోంది",

    village: "గ్రామం",
    district: "జిల్లా",
    state: "రాష్ట్రం",
    pincode: "పిన్‌కోడ్",

    findMandi: "📍 సమీప మండీని కనుగొనండి",
    refreshRates: "🔄 తాజా ధరలను రిఫ్రెష్ చేయండి",
    refreshing: "🔄 రిఫ్రెష్ అవుతోంది...",

    lastUpdated: "చివరి నవీకరణ",
    searchingMandi: "🔎 మండీలను వెతుకుతోంది...",
    tryAgain: "మళ్లీ ప్రయత్నించండి",

    mandiFound: "మండీలు లభించాయి",
    mandiRate: "మండీ ధర",
    distance: "దూరం",

    transportation: "అంచనా రవాణా",
    effectiveRate: "ప్రభావవంతమైన ధర",
    perQuintal: "క్వింటాల్‌కు",
    perKg: "కిలోకు",

    marketType: "మార్కెట్ రకం",
    apmc: "APMC మండీ",
    localMarket: "స్థానిక మార్కెట్",

    bestMandi: "⭐ ఉత్తమ మండీ సిఫార్సు",
    bestOption: "ఉత్తమ ఎంపిక",

    quantityCalculator:
      "💰 పరిమాణం ఆధారంగా ఆదాయ లెక్కింపు",

    quantity: "అమ్మే పరిమాణం",
    selectUnit: "యూనిట్",

    gram: "గ్రామ్",
    kg: "కిలో",
    quintal: "క్వింటాల్",
    ton: "టన్",
    bag: "బస్తా",

    quantityEquivalent: "మొత్తం పరిమాణం",
    totalKg: "మొత్తం కిలోలు",

    grossAmount: "మొత్తం అమ్మకపు మొత్తం",
    totalTransport: "మొత్తం రవాణా ఖర్చు",
    estimatedEarning: "అంచనా ఆదాయం",

    save: "మండీని సేవ్ చేయండి",
    saved: "సేవ్ చేయబడింది",
    directions: "📍 దిశలు",

    availableCrop: "అందుబాటులో ఉన్న పంట",

    netPerQuintal: "క్వింటాల్‌కు నికర ధర",
    netPerKg: "కిలోకు నికర ధర",

    sameDistrict: "అదే జిల్లా మండీ",
    nearbyDistrict: "సమీప జిల్లా మండీ",
    otherDistrict: "ఇతర జిల్లా మండీ",

    locationSource: "లొకేషన్ మూలం",
    browserLocation: "మొబైల్ లొకేషన్",
    profileLocationSource: "ప్రొఫైల్ లొకేషన్",

    rankingNote:
      "దూరం, జిల్లా, రవాణా ఖర్చు మరియు అంచనా ఆదాయం ఆధారంగా ర్యాంకింగ్.",

    distanceLimit: "సమీప దూర పరిమితి",

    invalidQuantity:
      "0 కంటే ఎక్కువ పరిమాణాన్ని నమోదు చేయండి.",

    rateUnitNote:
      "పోలిక కోసం అన్ని మండీ ధరలు ₹/క్వింటాల్‌గా మార్చబడ్డాయి.",

    indicativeNotice:
      "మండీ ధరలు అంచనా మాత్రమే. తుది ధరను మండీలో నిర్ధారించండి.",
  },

  gu: {
    backTo: "પાછા જાઓ",
    season: "મોસમ",
    market: "બજાર",
    landArea: "જમીન વિસ્તાર",

    currentMarket: "📊 વર્તમાન બજાર માહિતી",
    cropLabel: "પાક",
    indicativePrice: "અંદાજિત કિંમત",
    marketTrend: "બજાર વલણ",
    sellingAdvice: "💡 વેચાણ સલાહ",

    nearbyMarket: "📍 નજીકની મંડી",
    nearbyMarketDescription:
      "પહેલા તમારા જિલ્લા અને નજીકના જિલ્લાની મંડીઓ બતાવવામાં આવશે.",

    profileLocation: "પ્રોફાઇલ લોકેશન",
    usingProfileLocation:
      "પ્રોફાઇલમાં સેવ કરેલું લોકેશન ઉપયોગમાં છે",

    village: "ગામ",
    district: "જિલ્લો",
    state: "રાજ્ય",
    pincode: "પિનકોડ",

    findMandi: "📍 નજીકની મંડી શોધો",
    refreshRates: "🔄 નવીનતમ ભાવ રિફ્રેશ કરો",
    refreshing: "🔄 રિફ્રેશ થઈ રહ્યું છે...",

    lastUpdated: "છેલ્લું અપડેટ",
    searchingMandi: "🔎 મંડીઓ શોધી રહ્યા છીએ...",
    tryAgain: "ફરી પ્રયાસ કરો",

    mandiFound: "મંડીઓ મળી",
    mandiRate: "મંડી ભાવ",
    distance: "અંતર",

    transportation: "અંદાજિત પરિવહન",
    effectiveRate: "અસરકારક ભાવ",
    perQuintal: "પ્રતિ ક્વિન્ટલ",
    perKg: "પ્રતિ કિલો",

    marketType: "બજાર પ્રકાર",
    apmc: "APMC મંડી",
    localMarket: "સ્થાનિક બજાર",

    bestMandi: "⭐ શ્રેષ્ઠ મંડી ભલામણ",
    bestOption: "શ્રેષ્ઠ પસંદગી",

    quantityCalculator:
      "💰 જથ્થા મુજબ કમાણી ગણતરી",

    quantity: "વેચાણનો જથ્થો",
    selectUnit: "એકમ",

    gram: "ગ્રામ",
    kg: "કિલો",
    quintal: "ક્વિન્ટલ",
    ton: "ટન",
    bag: "બોરી",

    quantityEquivalent: "કુલ જથ્થો",
    totalKg: "કુલ કિલો",

    grossAmount: "કુલ વેચાણ રકમ",
    totalTransport: "કુલ પરિવહન ખર્ચ",
    estimatedEarning: "અંદાજિત કમાણી",

    save: "મંડી સાચવો",
    saved: "સાચવેલ",
    directions: "📍 દિશા",

    availableCrop: "ઉપલબ્ધ પાક",

    netPerQuintal: "પ્રતિ ક્વિન્ટલ ચોખ્ખો ભાવ",
    netPerKg: "પ્રતિ કિલો ચોખ્ખો ભાવ",

    sameDistrict: "એજ જિલ્લાના બજાર",
    nearbyDistrict: "નજીકના જિલ્લાના બજાર",
    otherDistrict: "અન્ય જિલ્લાના બજાર",

    locationSource: "લોકેશન સ્ત્રોત",
    browserLocation: "મોબાઇલ લોકેશન",
    profileLocationSource: "પ્રોફાઇલ લોકેશન",

    rankingNote:
      "અંતર, જિલ્લો, પરિવહન ખર્ચ અને અંદાજિત કમાણીના આધારે રેન્કિંગ.",

    distanceLimit: "નજીકની અંતર મર્યાદા",

    invalidQuantity:
      "કૃપા કરીને 0 કરતા વધારે જથ્થો દાખલ કરો.",

    rateUnitNote:
      "સરખામણી માટે તમામ મંડી ભાવ ₹/ક્વિન્ટલમાં રૂપાંતરિત કરવામાં આવ્યા છે.",

    indicativeNotice:
      "મંડીના ભાવ અંદાજિત છે. અંતિમ ભાવ મંડીમાં તપાસો.",
  },

  kn: {
    backTo: "ಹಿಂದೆ",
    season: "ಋತು",
    market: "ಮಾರುಕಟ್ಟೆ",
    landArea: "ಭೂಮಿ ವಿಸ್ತೀರ್ಣ",

    currentMarket: "📊 ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    cropLabel: "ಬೆಳೆ",
    indicativePrice: "ಅಂದಾಜು ಬೆಲೆ",
    marketTrend: "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿ",
    sellingAdvice: "💡 ಮಾರಾಟ ಸಲಹೆ",

    nearbyMarket: "📍 ಹತ್ತಿರದ ಮಂಡಿಗಳು",
    nearbyMarketDescription:
      "ಮೊದಲು ನಿಮ್ಮ ಜಿಲ್ಲೆ ಮತ್ತು ಹತ್ತಿರದ ಜಿಲ್ಲೆಗಳ ಮಂಡಿಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತದೆ.",

    profileLocation: "ಪ್ರೊಫೈಲ್ ಸ್ಥಳ",
    usingProfileLocation:
      "ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಉಳಿಸಿದ ಸ್ಥಳವನ್ನು ಬಳಸಲಾಗುತ್ತಿದೆ",

    village: "ಗ್ರಾಮ",
    district: "ಜಿಲ್ಲೆ",
    state: "ರಾಜ್ಯ",
    pincode: "ಪಿನ್‌ಕೋಡ್",

    findMandi: "📍 ಹತ್ತಿರದ ಮಂಡಿ ಹುಡುಕಿ",
    refreshRates: "🔄 ಇತ್ತೀಚಿನ ದರಗಳನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ",
    refreshing: "🔄 ರಿಫ್ರೆಶ್ ಆಗುತ್ತಿದೆ...",

    lastUpdated: "ಕೊನೆಯ ಅಪ್‌ಡೇಟ್",
    searchingMandi: "🔎 ಮಂಡಿಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",

    mandiFound: "ಮಂಡಿಗಳು ಕಂಡುಬಂದಿವೆ",
    mandiRate: "ಮಂಡಿ ದರ",
    distance: "ದೂರ",

    transportation: "ಅಂದಾಜು ಸಾರಿಗೆ",
    effectiveRate: "ಪರಿಣಾಮಕಾರಿ ದರ",
    perQuintal: "ಪ್ರತಿ ಕ್ವಿಂಟಲ್",
    perKg: "ಪ್ರತಿ ಕೆಜಿ",

    marketType: "ಮಾರುಕಟ್ಟೆ ಪ್ರಕಾರ",
    apmc: "APMC ಮಂಡಿ",
    localMarket: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ",

    bestMandi: "⭐ ಅತ್ಯುತ್ತಮ ಮಂಡಿ ಶಿಫಾರಸು",
    bestOption: "ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ",

    quantityCalculator:
      "💰 ಪ್ರಮಾಣದ ಆಧಾರದ ಆದಾಯ ಲೆಕ್ಕಾಚಾರ",

    quantity: "ಮಾರಾಟದ ಪ್ರಮಾಣ",
    selectUnit: "ಘಟಕ",

    gram: "ಗ್ರಾಂ",
    kg: "ಕೆಜಿ",
    quintal: "ಕ್ವಿಂಟಲ್",
    ton: "ಟನ್",
    bag: "ಚೀಲ",

    quantityEquivalent: "ಒಟ್ಟು ಪ್ರಮಾಣ",
    totalKg: "ಒಟ್ಟು ಕೆಜಿ",

    grossAmount: "ಒಟ್ಟು ಮಾರಾಟ ಮೊತ್ತ",
    totalTransport: "ಒಟ್ಟು ಸಾರಿಗೆ ವೆಚ್ಚ",
    estimatedEarning: "ಅಂದಾಜು ಆದಾಯ",

    save: "ಮಂಡಿ ಉಳಿಸಿ",
    saved: "ಉಳಿಸಲಾಗಿದೆ",
    directions: "📍 ದಾರಿ",

    availableCrop: "ಲಭ್ಯವಿರುವ ಬೆಳೆ",

    netPerQuintal: "ಪ್ರತಿ ಕ್ವಿಂಟಲ್ ನಿವ್ವಳ ದರ",
    netPerKg: "ಪ್ರತಿ ಕೆಜಿ ನಿವ್ವಳ ದರ",

    sameDistrict: "ಅದೇ ಜಿಲ್ಲೆಯ ಮಂಡಿ",
    nearbyDistrict: "ಹತ್ತಿರದ ಜಿಲ್ಲೆಯ ಮಂಡಿ",
    otherDistrict: "ಇತರ ಜಿಲ್ಲೆಯ ಮಂಡಿ",

    locationSource: "ಸ್ಥಳ ಮೂಲ",
    browserLocation: "ಮೊಬೈಲ್ ಸ್ಥಳ",
    profileLocationSource: "ಪ್ರೊಫೈಲ್ ಸ್ಥಳ",

    rankingNote:
      "ದೂರ, ಜಿಲ್ಲೆ, ಸಾರಿಗೆ ವೆಚ್ಚ ಮತ್ತು ಅಂದಾಜು ಆದಾಯದ ಆಧಾರದ ಮೇಲೆ ಕ್ರಮ.",

    distanceLimit: "ಹತ್ತಿರದ ದೂರ ಮಿತಿ",

    invalidQuantity:
      "ದಯವಿಟ್ಟು 0 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಪ್ರಮಾಣ ನಮೂದಿಸಿ.",

    rateUnitNote:
      "ಹೋಲಿಕೆಗಾಗಿ ಎಲ್ಲಾ ಮಂಡಿ ದರಗಳನ್ನು ₹/ಕ್ವಿಂಟಲ್ ಗೆ ಪರಿವರ್ತಿಸಲಾಗಿದೆ.",

    indicativeNotice:
      "ಮಂಡಿ ದರಗಳು ಅಂದಾಜು. ಅಂತಿಮ ದರವನ್ನು ಮಂಡಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",
  },

  ml: {
    backTo: "തിരികെ",
    season: "സീസൺ",
    market: "വിപണി",
    landArea: "ഭൂവിസ്തീർണ്ണം",

    currentMarket: "📊 നിലവിലെ വിപണി വിവരം",
    cropLabel: "വിള",
    indicativePrice: "അനുമാന വില",
    marketTrend: "വിപണി പ്രവണത",
    sellingAdvice: "💡 വിൽപ്പന ഉപദേശം",

    nearbyMarket: "📍 സമീപ വിപണികൾ",
    nearbyMarketDescription:
      "ആദ്യം നിങ്ങളുടെ ജില്ലയിലെയും സമീപ ജില്ലകളിലെയും വിപണികൾ കാണിക്കും.",

    profileLocation: "പ്രൊഫൈൽ ലൊക്കേഷൻ",
    usingProfileLocation:
      "പ്രൊഫൈലിൽ സേവ് ചെയ്ത ലൊക്കേഷൻ ഉപയോഗിക്കുന്നു",

    village: "ഗ്രാമം",
    district: "ജില്ല",
    state: "സംസ്ഥാനം",
    pincode: "പിൻകോഡ്",

    findMandi: "📍 സമീപ വിപണി കണ്ടെത്തുക",
    refreshRates: "🔄 പുതിയ നിരക്ക് പുതുക്കുക",
    refreshing: "🔄 പുതുക്കുന്നു...",

    lastUpdated: "അവസാന അപ്ഡേറ്റ്",
    searchingMandi: "🔎 വിപണികൾ തിരയുന്നു...",
    tryAgain: "വീണ്ടും ശ്രമിക്കുക",

    mandiFound: "വിപണികൾ കണ്ടെത്തി",
    mandiRate: "വിപണി നിരക്ക്",
    distance: "ദൂരം",

    transportation: "അനുമാന ഗതാഗത ചെലവ്",
    effectiveRate: "ഫലപ്രദമായ നിരക്ക്",
    perQuintal: "ക്വിന്റലിന്",
    perKg: "കിലോയ്ക്ക്",

    marketType: "വിപണി തരം",
    apmc: "APMC വിപണി",
    localMarket: "പ്രാദേശിക വിപണി",

    bestMandi: "⭐ മികച്ച വിപണി ശുപാർശ",
    bestOption: "മികച്ച തിരഞ്ഞെടുപ്പ്",

    quantityCalculator:
      "💰 അളവ് അനുസരിച്ചുള്ള വരുമാന കണക്കുകൂട്ടൽ",

    quantity: "വിൽപ്പന അളവ്",
    selectUnit: "യൂണിറ്റ്",

    gram: "ഗ്രാം",
    kg: "കിലോ",
    quintal: "ക്വിന്റൽ",
    ton: "ടൺ",
    bag: "ചാക്ക്",

    quantityEquivalent: "ആകെ അളവ്",
    totalKg: "ആകെ കിലോ",

    grossAmount: "മൊത്തം വിൽപ്പന തുക",
    totalTransport: "മൊത്തം ഗതാഗത ചെലവ്",
    estimatedEarning: "അനുമാന വരുമാനം",

    save: "വിപണി സേവ് ചെയ്യുക",
    saved: "സേവ് ചെയ്തു",
    directions: "📍 വഴി",

    availableCrop: "ലഭ്യമായ വിള",

    netPerQuintal: "ക്വിന്റലിന് ശുദ്ധ നിരക്ക്",
    netPerKg: "കിലോയ്ക്ക് ശുദ്ധ നിരക്ക്",

    sameDistrict: "അതേ ജില്ലയിലെ വിപണി",
    nearbyDistrict: "സമീപ ജില്ലയിലെ വിപണി",
    otherDistrict: "മറ്റ് ജില്ലയിലെ വിപണി",

    locationSource: "ലൊക്കേഷൻ ഉറവിടം",
    browserLocation: "മൊബൈൽ ലൊക്കേഷൻ",
    profileLocationSource: "പ്രൊഫൈൽ ലൊക്കേഷൻ",

    rankingNote:
      "ദൂരം, ജില്ല, ഗതാഗത ചെലവ്, അനുമാന വരുമാനം എന്നിവയുടെ അടിസ്ഥാനത്തിലാണ് റാങ്കിംഗ്.",

    distanceLimit: "സമീപ ദൂര പരിധി",

    invalidQuantity:
      "0-ൽ കൂടുതലുള്ള അളവ് നൽകുക.",

    rateUnitNote:
      "താരതമ്യത്തിനായി എല്ലാ വിപണി നിരക്കുകളും ₹/ക്വിന്റലായി മാറ്റിയിരിക്കുന്നു.",

    indicativeNotice:
      "വിപണി നിരക്കുകൾ അനുമാനമാണ്. അന്തിമ നിരക്ക് വിപണിയിൽ പരിശോധിക്കുക.",
  },

  pa: {
    backTo: "ਵਾਪਸ",
    season: "ਮੌਸਮ",
    market: "ਮੰਡੀ",
    landArea: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰ",

    currentMarket: "📊 ਮੌਜੂਦਾ ਮੰਡੀ ਜਾਣਕਾਰੀ",
    cropLabel: "ਫਸਲ",
    indicativePrice: "ਅੰਦਾਜ਼ਨ ਕੀਮਤ",
    marketTrend: "ਮੰਡੀ ਰੁਝਾਨ",
    sellingAdvice: "💡 ਵਿਕਰੀ ਸਲਾਹ",

    nearbyMarket: "📍 ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ",
    nearbyMarketDescription:
      "ਪਹਿਲਾਂ ਤੁਹਾਡੇ ਜ਼ਿਲ੍ਹੇ ਅਤੇ ਨੇੜਲੇ ਜ਼ਿਲ੍ਹਿਆਂ ਦੀਆਂ ਮੰਡੀਆਂ ਦਿਖਾਈਆਂ ਜਾਣਗੀਆਂ।",

    profileLocation: "ਪ੍ਰੋਫਾਈਲ ਲੋਕੇਸ਼ਨ",
    usingProfileLocation:
      "ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਕੀਤੀ ਲੋਕੇਸ਼ਨ ਵਰਤੀ ਜਾ ਰਹੀ ਹੈ",

    village: "ਪਿੰਡ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    state: "ਰਾਜ",
    pincode: "ਪਿੰਨਕੋਡ",

    findMandi: "📍 ਨੇੜਲੀ ਮੰਡੀ ਲੱਭੋ",
    refreshRates: "🔄 ਤਾਜ਼ਾ ਭਾਅ ਰਿਫ੍ਰੈਸ਼ ਕਰੋ",
    refreshing: "🔄 ਰਿਫ੍ਰੈਸ਼ ਹੋ ਰਿਹਾ ਹੈ...",

    lastUpdated: "ਆਖਰੀ ਅੱਪਡੇਟ",
    searchingMandi: "🔎 ਮੰਡੀਆਂ ਲੱਭੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ...",
    tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",

    mandiFound: "ਮੰਡੀਆਂ ਮਿਲੀਆਂ",
    mandiRate: "ਮੰਡੀ ਭਾਅ",
    distance: "ਦੂਰੀ",

    transportation: "ਅੰਦਾਜ਼ਨ ਆਵਾਜਾਈ",
    effectiveRate: "ਅਸਲ ਭਾਅ",
    perQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ",
    perKg: "ਪ੍ਰਤੀ ਕਿਲੋ",

    marketType: "ਮੰਡੀ ਦੀ ਕਿਸਮ",
    apmc: "APMC ਮੰਡੀ",
    localMarket: "ਸਥਾਨਕ ਮੰਡੀ",

    bestMandi: "⭐ ਸਭ ਤੋਂ ਵਧੀਆ ਮੰਡੀ",
    bestOption: "ਸਭ ਤੋਂ ਵਧੀਆ ਚੋਣ",

    quantityCalculator:
      "💰 ਮਾਤਰਾ ਅਨੁਸਾਰ ਕਮਾਈ ਕੈਲਕੁਲੇਟਰ",

    quantity: "ਵੇਚਣ ਦੀ ਮਾਤਰਾ",
    selectUnit: "ਇਕਾਈ",

    gram: "ਗ੍ਰਾਮ",
    kg: "ਕਿਲੋ",
    quintal: "ਕੁਇੰਟਲ",
    ton: "ਟਨ",
    bag: "ਬੋਰੀ",

    quantityEquivalent: "ਕੁੱਲ ਮਾਤਰਾ",
    totalKg: "ਕੁੱਲ ਕਿਲੋ",

    grossAmount: "ਕੁੱਲ ਰਕਮ",
    totalTransport: "ਕੁੱਲ ਆਵਾਜਾਈ ਖਰਚ",
    estimatedEarning: "ਅੰਦਾਜ਼ਨ ਕਮਾਈ",

    save: "ਮੰਡੀ ਸੇਵ ਕਰੋ",
    saved: "ਸੇਵ ਕੀਤੀ",
    directions: "📍 ਰਸਤਾ",

    availableCrop: "ਉਪਲਬਧ ਫਸਲ",

    netPerQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਨੈੱਟ ਭਾਅ",
    netPerKg: "ਪ੍ਰਤੀ ਕਿਲੋ ਨੈੱਟ ਭਾਅ",

    sameDistrict: "ਇਸੇ ਜ਼ਿਲ੍ਹੇ ਦੀ ਮੰਡੀ",
    nearbyDistrict: "ਨੇੜਲੇ ਜ਼ਿਲ੍ਹੇ ਦੀ ਮੰਡੀ",
    otherDistrict: "ਹੋਰ ਜ਼ਿਲ੍ਹੇ ਦੀ ਮੰਡੀ",

    locationSource: "ਲੋਕੇਸ਼ਨ ਸਰੋਤ",
    browserLocation: "ਮੋਬਾਈਲ ਲੋਕੇਸ਼ਨ",
    profileLocationSource: "ਪ੍ਰੋਫਾਈਲ ਲੋਕੇਸ਼ਨ",

    rankingNote:
      "ਦੂਰੀ, ਜ਼ਿਲ੍ਹਾ, ਆਵਾਜਾਈ ਖਰਚ ਅਤੇ ਅੰਦਾਜ਼ਨ ਕਮਾਈ ਦੇ ਆਧਾਰ 'ਤੇ ਰੈਂਕਿੰਗ ਹੁੰਦੀ ਹੈ।",

    distanceLimit: "ਨੇੜਲੀ ਦੂਰੀ ਸੀਮਾ",

    invalidQuantity:
      "ਕਿਰਪਾ ਕਰਕੇ 0 ਤੋਂ ਵੱਧ ਮਾਤਰਾ ਦਿਓ।",

    rateUnitNote:
      "ਤੁਲਨਾ ਲਈ ਸਾਰੇ ਮੰਡੀ ਭਾਅ ₹/ਕੁਇੰਟਲ ਵਿੱਚ ਬਦਲੇ ਗਏ ਹਨ।",

    indicativeNotice:
      "ਮੰਡੀ ਭਾਅ ਅੰਦਾਜ਼ਨ ਹਨ। ਅੰਤਿਮ ਭਾਅ ਮੰਡੀ ਵਿੱਚ ਪੱਕਾ ਕਰੋ।",
  },

  ur: {
    backTo: "واپس",
    season: "موسم",
    market: "منڈی",
    landArea: "زمین کا رقبہ",

    currentMarket: "📊 موجودہ منڈی کی معلومات",
    cropLabel: "فصل",
    indicativePrice: "تخمینی قیمت",
    marketTrend: "منڈی کا رجحان",
    sellingAdvice: "💡 فروخت کا مشورہ",

    nearbyMarket: "📍 قریبی منڈیاں",
    nearbyMarketDescription:
      "پہلے آپ کے ضلع اور قریبی اضلاع کی منڈیاں دکھائی جائیں گی۔",

    profileLocation: "پروفائل لوکیشن",
    usingProfileLocation:
      "پروفائل میں محفوظ لوکیشن استعمال ہو رہی ہے",

    village: "گاؤں",
    district: "ضلع",
    state: "ریاست",
    pincode: "پن کوڈ",

    findMandi: "📍 قریبی منڈی تلاش کریں",
    refreshRates: "🔄 تازہ ترین ریٹ ریفریش کریں",
    refreshing: "🔄 ریفریش ہو رہا ہے...",

    lastUpdated: "آخری اپڈیٹ",
    searchingMandi: "🔎 منڈیاں تلاش کی جا رہی ہیں...",
    tryAgain: "دوبارہ کوشش کریں",

    mandiFound: "منڈیاں ملیں",
    mandiRate: "منڈی ریٹ",
    distance: "فاصلہ",

    transportation: "تخمینی ٹرانسپورٹ",
    effectiveRate: "مؤثر ریٹ",
    perQuintal: "فی کوئنٹل",
    perKg: "فی کلو",

    marketType: "منڈی کی قسم",
    apmc: "APMC منڈی",
    localMarket: "مقامی منڈی",

    bestMandi: "⭐ بہترین منڈی کی سفارش",
    bestOption: "بہترین آپشن",

    quantityCalculator:
      "💰 مقدار کے حساب سے کمائی کیلکولیٹر",

    quantity: "فروخت کی مقدار",
    selectUnit: "یونٹ",

    gram: "گرام",
    kg: "کلو",
    quintal: "کوئنٹل",
    ton: "ٹن",
    bag: "بوری",

    quantityEquivalent: "کل مقدار",
    totalKg: "کل کلو",

    grossAmount: "کل فروخت رقم",
    totalTransport: "کل ٹرانسپورٹ خرچ",
    estimatedEarning: "تخمینی کمائی",

    save: "منڈی محفوظ کریں",
    saved: "محفوظ شدہ",
    directions: "📍 راستہ",

    availableCrop: "دستیاب فصل",

    netPerQuintal: "فی کوئنٹل خالص ریٹ",
    netPerKg: "فی کلو خالص ریٹ",

    sameDistrict: "اسی ضلع کی منڈی",
    nearbyDistrict: "قریبی ضلع کی منڈی",
    otherDistrict: "دوسرے ضلع کی منڈی",

    locationSource: "لوکیشن ذریعہ",
    browserLocation: "موبائل لوکیشن",
    profileLocationSource: "پروفائل لوکیشن",

    rankingNote:
      "فاصلہ، ضلع، ٹرانسپورٹ خرچ اور تخمینی کمائی کی بنیاد پر درجہ بندی کی جاتی ہے۔",

    distanceLimit: "قریبی فاصلے کی حد",

    invalidQuantity:
      "براہ کرم 0 سے زیادہ مقدار درج کریں۔",

    rateUnitNote:
      "موازنہ کے لیے تمام منڈی ریٹس ₹/کوئنٹل میں تبدیل کیے گئے ہیں۔",

    indicativeNotice:
      "منڈی ریٹس اندازاً ہیں۔ حتمی ریٹ منڈی میں ضرور چیک کریں۔",
  },

  or: {
    backTo: "ପଛକୁ",
    season: "ଋତୁ",
    market: "ବଜାର",
    landArea: "ଜମି ଅଞ୍ଚଳ",

    currentMarket: "📊 ବର୍ତ୍ତମାନ ବଜାର ସୂଚନା",
    cropLabel: "ଫସଲ",
    indicativePrice: "ଆନୁମାନିକ ମୂଲ୍ୟ",
    marketTrend: "ବଜାର ପ୍ରବଣତା",
    sellingAdvice: "💡 ବିକ୍ରୟ ପରାମର୍ଶ",

    nearbyMarket: "📍 ନିକଟସ୍ଥ ମଣ୍ଡି",
    nearbyMarketDescription:
      "ପ୍ରଥମେ ଆପଣଙ୍କ ଜିଲ୍ଲା ଏବଂ ନିକଟସ୍ଥ ଜିଲ୍ଲାର ମଣ୍ଡି ଦେଖାଯିବ।",

    profileLocation: "ପ୍ରୋଫାଇଲ ଲୋକେସନ",
    usingProfileLocation:
      "ପ୍ରୋଫାଇଲରେ ସେଭ ହୋଇଥିବା ଲୋକେସନ ବ୍ୟବହାର ହେଉଛି",

    village: "ଗାଁ",
    district: "ଜିଲ୍ଲା",
    state: "ରାଜ୍ୟ",
    pincode: "ପିନକୋଡ",

    findMandi: "📍 ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜନ୍ତୁ",
    refreshRates: "🔄 ନୂତନ ଦର ରିଫ୍ରେଶ କରନ୍ତୁ",
    refreshing: "🔄 ରିଫ୍ରେଶ ହେଉଛି...",

    lastUpdated: "ଶେଷ ଅପଡେଟ",
    searchingMandi: "🔎 ମଣ୍ଡି ଖୋଜାଯାଉଛି...",
    tryAgain: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",

    mandiFound: "ମଣ୍ଡି ମିଳିଲା",
    mandiRate: "ମଣ୍ଡି ଦର",
    distance: "ଦୂରତା",

    transportation: "ଆନୁମାନିକ ପରିବହନ",
    effectiveRate: "ପ୍ରଭାବୀ ଦର",
    perQuintal: "ପ୍ରତି କ୍ୱିଣ୍ଟାଲ",
    perKg: "ପ୍ରତି କିଲୋ",

    marketType: "ବଜାର ପ୍ରକାର",
    apmc: "APMC ମଣ୍ଡି",
    localMarket: "ସ୍ଥାନୀୟ ବଜାର",

    bestMandi: "⭐ ସର୍ବୋତ୍ତମ ମଣ୍ଡି",
    bestOption: "ସର୍ବୋତ୍ତମ ବିକଳ୍ପ",

    quantityCalculator: "💰 ପରିମାଣ ଅନୁସାରେ ଆୟ ହିସାବ",
    quantity: "ବିକ୍ରୟ ପରିମାଣ",
    selectUnit: "ଏକକ",

    gram: "ଗ୍ରାମ",
    kg: "କିଲୋ",
    quintal: "କ୍ୱିଣ୍ଟାଲ",
    ton: "ଟନ",
    bag: "ବସ୍ତା",

    quantityEquivalent: "ମୋଟ ପରିମାଣ",
    totalKg: "ମୋଟ କିଲୋ",

    grossAmount: "ମୋଟ ବିକ୍ରୟ ରାଶି",
    totalTransport: "ମୋଟ ପରିବହନ ଖର୍ଚ୍ଚ",
    estimatedEarning: "ଆନୁମାନିକ ଆୟ",

    save: "ମଣ୍ଡି ସେଭ କରନ୍ତୁ",
    saved: "ସେଭ ହୋଇଛି",
    directions: "📍 ରାସ୍ତା",

    availableCrop: "ଉପଲବ୍ଧ ଫସଲ",

    netPerQuintal: "ପ୍ରତି କ୍ୱିଣ୍ଟାଲ ନିଟ୍ ଦର",
    netPerKg: "ପ୍ରତି କିଲୋ ନିଟ୍ ଦର",

    sameDistrict: "ସେହି ଜିଲ୍ଲାର ମଣ୍ଡି",
    nearbyDistrict: "ନିକଟସ୍ଥ ଜିଲ୍ଲାର ମଣ୍ଡି",
    otherDistrict: "ଅନ୍ୟ ଜିଲ୍ଲାର ମଣ୍ଡି",

    locationSource: "ଲୋକେସନ ସ୍ରୋତ",
    browserLocation: "ମୋବାଇଲ ଲୋକେସନ",
    profileLocationSource: "ପ୍ରୋଫାଇଲ ଲୋକେସନ",

    rankingNote:
      "ଦୂରତା, ଜିଲ୍ଲା, ପରିବହନ ଖର୍ଚ୍ଚ ଏବଂ ଆନୁମାନିକ ଆୟ ଆଧାରରେ ର୍ୟାଙ୍କିଙ୍ଗ।",

    distanceLimit: "ନିକଟ ଦୂରତା ସୀମା",

    invalidQuantity:
      "ଦୟାକରି 0 ଠାରୁ ଅଧିକ ପରିମାଣ ଦିଅନ୍ତୁ।",

    rateUnitNote:
      "ତୁଳନା ପାଇଁ ସମସ୍ତ ମଣ୍ଡି ଦର ₹/କ୍ୱିଣ୍ଟାଲରେ ପରିବର୍ତ୍ତିତ।",

    indicativeNotice:
      "ମଣ୍ଡି ଦର ଆନୁମାନିକ। ଅନ୍ତିମ ଦର ମଣ୍ଡିରେ ଯାଞ୍ଚ କରନ୍ତୁ।",
  },

  as: {
    backTo: "উভতি যাওক",
    season: "ঋতু",
    market: "বজাৰ",
    landArea: "মাটিৰ পৰিমাণ",

    currentMarket: "📊 বৰ্তমান বজাৰৰ তথ্য",
    cropLabel: "শস্য",
    indicativePrice: "আনুমানিক মূল্য",
    marketTrend: "বজাৰৰ ধাৰা",
    sellingAdvice: "💡 বিক্ৰীৰ পৰামৰ্শ",

    nearbyMarket: "📍 ওচৰৰ মণ্ডী",
    nearbyMarketDescription:
      "প্ৰথমে আপোনাৰ জিলা আৰু ওচৰৰ জিলাৰ মণ্ডী দেখুওৱা হ'ব।",

    profileLocation: "প্ৰ'ফাইল লোকেচন",
    usingProfileLocation:
      "প্ৰ'ফাইলত সংৰক্ষিত লোকেচন ব্যৱহাৰ কৰা হৈছে",

    village: "গাঁও",
    district: "জিলা",
    state: "ৰাজ্য",
    pincode: "পিনকোড",

    findMandi: "📍 ওচৰৰ মণ্ডী বিচাৰক",
    refreshRates: "🔄 শেহতীয়া দাম ৰিফ্ৰেছ কৰক",
    refreshing: "🔄 ৰিফ্ৰেছ হৈ আছে...",

    lastUpdated: "শেষ আপডেট",
    searchingMandi: "🔎 মণ্ডী বিচৰা হৈছে...",
    tryAgain: "পুনৰ চেষ্টা কৰক",

    mandiFound: "খন মণ্ডী পোৱা গৈছে",
    mandiRate: "মণ্ডীৰ দাম",
    distance: "দূৰত্ব",

    transportation: "আনুমানিক পৰিবহণ",
    effectiveRate: "কাৰ্যকৰী দাম",
    perQuintal: "প্ৰতি কুইণ্টল",
    perKg: "প্ৰতি কিলো",

    marketType: "বজাৰৰ ধৰণ",
    apmc: "APMC মণ্ডী",
    localMarket: "স্থানীয় বজাৰ",

    bestMandi: "⭐ সৰ্বোত্তম মণ্ডী",
    bestOption: "সৰ্বোত্তম বিকল্প",

    quantityCalculator:
      "💰 পৰিমাণ অনুসৰি উপাৰ্জন গণনা",

    quantity: "বিক্ৰীৰ পৰিমাণ",
    selectUnit: "একক",

    gram: "গ্ৰাম",
    kg: "কিলোগ্ৰাম",
    quintal: "কুইণ্টল",
    ton: "টন",
    bag: "বস্তা",

    quantityEquivalent: "মুঠ পৰিমাণ",
    totalKg: "মুঠ কিলো",

    grossAmount: "মুঠ বিক্ৰী",
    totalTransport: "মুঠ পৰিবহণ খৰচ",
    estimatedEarning: "আনুমানিক উপাৰ্জন",

    save: "মণ্ডী সংৰক্ষণ কৰক",
    saved: "সংৰক্ষিত",
    directions: "📍 পথ",

    availableCrop: "উপলব্ধ শস্য",

    netPerQuintal: "প্ৰতি কুইণ্টল নিট দাম",
    netPerKg: "প্ৰতি কিলো নিট দাম",

    sameDistrict: "একেটা জিলাৰ মণ্ডী",
    nearbyDistrict: "ওচৰৰ জিলাৰ মণ্ডী",
    otherDistrict: "অন্য জিলাৰ মণ্ডী",

    locationSource: "লোকেচন উৎস",
    browserLocation: "ম'বাইল লোকেচন",
    profileLocationSource: "প্ৰ'ফাইল লোকেচন",

    rankingNote:
      "দূৰত্ব, জিলা, পৰিবহণ খৰচ আৰু আনুমানিক উপাৰ্জনৰ ভিত্তিত ৰেংক কৰা হয়।",

    distanceLimit: "ওচৰৰ দূৰত্বৰ সীমা",

    invalidQuantity:
      "অনুগ্ৰহ কৰি 0 তকৈ বেছি পৰিমাণ দিয়ক।",

    rateUnitNote:
      "তুলনাৰ বাবে সকলো মণ্ডীৰ দাম ₹/কুইণ্টললৈ ৰূপান্তৰ কৰা হৈছে।",

    indicativeNotice:
      "মণ্ডীৰ দাম আনুমানিক। চূড়ান্ত দাম মণ্ডীত নিশ্চিত কৰক।",
  },
};

/* =========================================================
   MANDI DATABASE

   NOTE:
   All rates are ₹/quintal.

   Later, this array can be replaced by:
   /api/mandis
   /api/mandis/nearby
   data.gov.in
   Agmarknet
   etc.

   Coordinates allow real distance calculation when
   browser GPS is available.
========================================================= */

const MANDI_DATABASE: MandiBase[] = [];

/* =========================================================
   HELPERS
========================================================= */

const normalize = (value: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

/*
  Crop name matching.
*/
function isCropMatch(
  cropName: string,
  mandi: MandiBase
): boolean {
  if (!mandi.crops || mandi.crops.length === 0) {
    return true;
  }

  const crop = normalize(cropName);

  const aliases: Record<string, string[]> = {
    wheat: [
      "wheat",
      "गेहूं",
      "गेहू",
      "गहू",
      "গম",
      "கோதுமை",
      "గోధుమ",
      "ઘઉં",
      "ಗೋಧಿ",
      "ഗോതമ്പ്",
      "ਗੇਹੂੰ",
      "گندم",
    ],

    rice: [
      "rice",
      "paddy",
      "धान",
      "चावल",
      "तांदूळ",
      "ধান",
      "அரிசி",
      "వరి",
      "ચોખા",
      "ಅಕ್ಕಿ",
      "അരി",
      "ਝੋਨਾ",
      "چاول",
    ],

    maize: [
      "maize",
      "corn",
      "मक्का",
      "मका",
      "ভুট্টা",
      "மக்காச்சோளம்",
      "మొక్కజొన్న",
      "મકાઈ",
      "ಮೆಕ್ಕೆಜೋಳ",
      "ചോളം",
      "ਮੱਕੀ",
      "مکئی",
    ],

    potato: [
      "potato",
      "aloo",
      "आलू",
      "बटाटा",
      "আলু",
      "உருளைக்கிழங்கு",
      "బంగాళాదుంప",
      "બટાકા",
      "ಆಲೂಗಡ್ಡೆ",
      "ഉരുളക്കിഴങ്ങ്",
      "ਆਲੂ",
      "آلو",
    ],
  };

  for (const [canonical, names] of Object.entries(aliases)) {
    if (
      names.some((name) =>
        crop.includes(normalize(name))
      )
    ) {
      return mandi.crops.some(
        (mCrop) => normalize(mCrop) === canonical
      );
    }
  }

  return true;
}

/*
  Convert entered quantity into kg.

  1 gram = 0.001 kg
  1 kg = 1 kg
  1 quintal = 100 kg
  1 ton = 1000 kg
  1 bag = 50 kg

  Bag default is 50 kg.
*/
function quantityToKg(
  quantity: number,
  unit: QuantityUnit
) {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return 0;
  }

  switch (unit) {
    case "gram":
      return quantity / 1000;

    case "kg":
      return quantity;

    case "quintal":
      return quantity * 100;

    case "ton":
      return quantity * 1000;

    case "bag":
      return quantity * 50;

    default:
      return 0;
  }
}

/*
  Convert kg to entered unit.
*/
function kgToEnteredUnit(
  kg: number,
  unit: QuantityUnit
) {
  switch (unit) {
    case "gram":
      return kg * 1000;

    case "kg":
      return kg;

    case "quintal":
      return kg / 100;

    case "ton":
      return kg / 1000;

    case "bag":
      return kg / 50;

    default:
      return kg;
  }
}

/*
  Haversine distance.
*/
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

/*
  Build the farmer's most specific saved address.
  The saved profile address is intentionally preferred over browser GPS.
*/
function buildProfileAddress(profileLocation: {
  village: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  address?: string;
  addressLine1?: string;
  addressLine2?: string;
  postOffice?: string;
  tehsil?: string;
  block?: string;
}) {
  return [
    profileLocation.address,
    profileLocation.addressLine1,
    profileLocation.addressLine2,
    profileLocation.village,
    profileLocation.postOffice,
    profileLocation.tehsil,
    profileLocation.block,
    profileLocation.city,
    profileLocation.district,
    profileLocation.state,
    profileLocation.pincode,
    "India",
  ]
    .filter(Boolean)
    .join(", ");
}

type GeocodedLocation = {
  lat: number;
  lng: number;
  displayName: string;
  village?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
};

async function geocodeFarmerAddress(
  address: string
): Promise<GeocodedLocation | null> {
  if (!address.trim()) return null;

  const cleaned = address.replace(/\s+/g, " ").trim();

  // Try the complete saved profile address first, then progressively
  // simpler variants. This keeps the search tied to the farmer's
  // saved address and works for locations anywhere in India.
  const parts = cleaned
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const queries = [
    `${cleaned}, India`,
    cleaned,
    parts.slice(-5).join(", "),
    parts.slice(-4).join(", "),
  ].filter(
    (value, index, list) =>
      value && list.indexOf(value) === index
  );

  for (const query of queries) {
    try {
      const url =
        "https://nominatim.openstreetmap.org/search?" +
        new URLSearchParams({
          format: "jsonv2",
          addressdetails: "1",
          limit: "1",
          countrycodes: "in",
          q: query,
        }).toString();

      const response = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) continue;

      const data = (await response.json()) as Array<{
        lat?: string;
        lon?: string;
        display_name?: string;
        address?: Record<string, string | undefined>;
      }>;

      const item = data?.[0];
      if (!item?.lat || !item?.lon) continue;

      const a = item.address || {};

      return {
        lat: Number(item.lat),
        lng: Number(item.lon),
        displayName: item.display_name || address,
        village:
          a.village ||
          a.hamlet ||
          a.suburb ||
          a.neighbourhood,
        city:
          a.city ||
          a.town ||
          a.municipality ||
          a.city_district,
        district:
          a.state_district ||
          a.district ||
          a.county,
        state: a.state,
        pincode: a.postcode,
      };
    } catch {
      // Try the next query variant.
    }
  }

  return null;
}

async function findNearbyIndianMandis(
  location: GeocodedLocation,
  radiusKm: number
): Promise<MandiBase[]> {
  const radiusMeters = Math.round(radiusKm * 1000);
  const { lat, lng } = location;

  const query = `
[out:json][timeout:45];
(
  nwr["amenity"="marketplace"](around:${radiusMeters},${lat},${lng});
  nwr["shop"="agrarian"](around:${radiusMeters},${lat},${lng});
  nwr["name"~"mandi|apmc|agricultural market|agriculture market|krishi bazar|krishi market|kisan market|कृषि बाजार|कृषि मंडी|मंडी|बाजार|बाज़ार",i](around:${radiusMeters},${lat},${lng});
);
out center tags;
`;

  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          Accept: "application/json",
        },
        body: query,
      });

      if (!response.ok) continue;

      const raw = (await response.json()) as {
        elements?: Array<{
          type: string;
          id: number;
          lat?: number;
          lon?: number;
          center?: { lat?: number; lon?: number };
          tags?: Record<string, string | undefined>;
        }>;
      };

      if (!raw.elements?.length) continue;

      const seen = new Set<string>();
      const result: MandiBase[] = [];

      for (const element of raw.elements) {
        const tags = element.tags || {};
        const name =
          tags.name ||
          tags["name:en"] ||
          tags["name:hi"] ||
          "Agricultural Market";

        const elementLat =
          typeof element.lat === "number"
            ? element.lat
            : element.center?.lat;
        const elementLng =
          typeof element.lon === "number"
            ? element.lon
            : element.center?.lon;

        if (
          typeof elementLat !== "number" ||
          typeof elementLng !== "number"
        ) continue;

        const key = `${element.type}-${element.id}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const address = [
          tags["addr:housenumber"],
          tags["addr:street"],
          tags["addr:suburb"],
          tags["addr:city"],
          tags["addr:district"],
          tags["addr:state"],
          tags["addr:postcode"],
        ]
          .filter(Boolean)
          .join(", ");

        result.push({
          name,
          district:
            tags["addr:district"] ||
            tags["is_in:district"] ||
            tags.district ||
            "",
          state:
            tags["addr:state"] ||
            tags.state ||
            "",
          address:
            address ||
            tags["addr:full"] ||
            undefined,
          rate: 0,
          marketType:
            /apmc|mandi/i.test(name) ||
            /apmc|mandi/i.test(tags.operator || "")
              ? "APMC"
              : "Local Market",
          lat: elementLat,
          lng: elementLng,
        });
      }

      return result;
    } catch {
      // Try the backup Overpass server.
    }
  }

  return [];
}

function getIndicativeRateForMandi(
  mandi: MandiBase,
  cropName: string,
  market: { price: string }
) {
  const known = MANDI_DATABASE.find((item) => {
    const sameName =
      normalize(item.name) === normalize(mandi.name);
    const sameArea =
      normalize(item.district) !== "" &&
      normalize(item.district) === normalize(mandi.district) &&
      normalize(item.state) === normalize(mandi.state);
    return sameName || sameArea;
  });

  if (known) return known.rate;

  const numbers = market.price.match(/[0-9][0-9,]*/g);
  if (numbers?.length) {
    const values = numbers
      .map((value) => Number(value.replace(/,/g, "")))
      .filter((value) => Number.isFinite(value));

    if (values.length) {
      return Math.round(
        values.reduce((sum, value) => sum + value, 0) /
          values.length
      );
    }
  }

  const cropKey = normalize(cropName);
  if (cropKey.includes("wheat") || cropKey.includes("गेहूं")) return 2500;
  if (cropKey.includes("rice") || cropKey.includes("धान")) return 2350;
  if (cropKey.includes("maize") || cropKey.includes("मक्का")) return 2200;
  if (cropKey.includes("potato") || cropKey.includes("आलू")) return 1500;

  return 0;
}

/*
  Transport estimate per quintal.
*/
function estimateTransport(
  distanceKm: number
) {
  if (distanceKm <= 10) return 120;
  if (distanceKm <= 25) return 220;
  if (distanceKm <= 50) return 350;
  if (distanceKm <= 75) return 500;
  if (distanceKm <= 100) return 650;
  if (distanceKm <= 150) return 850;
  if (distanceKm <= 200) return 1050;

  return 1300;
}

/*
  Location from localStorage.
*/
function getProfileFromStorage(): Profile {
  if (typeof window === "undefined") {
    return {};
  }

  const keys = [
    "farmerProfile",
    "profile",
    "userProfile",
    "farmer",
    "user",
    "profileData",
  ];

  for (const key of keys) {
    const raw = localStorage.getItem(key);

    if (!raw) continue;

    try {
      const data = JSON.parse(raw);

      if (
        data &&
        typeof data === "object"
      ) {
        return data as Profile;
      }
    } catch {
      // ignore
    }
  }

  return {};
}

/* =========================================================
   MARKET INFO
========================================================= */

function getMarketInfo(
  cropName: string,
  language: string,
  t: T
) {
  const name = normalize(cropName);

  const isWheat =
    /wheat|गेहूं|गेहू|गहू|গম|கோதுமை|గోధుమ|ઘઉં|ಗೋಧಿ|ഗോതമ്പ്|ਗੇਹੂੰ|گندم/.test(
      name
    );

  const isRice =
    /rice|paddy|धान|चावल|तांदूळ|ধান|அரிசி|వరి|ચોખા|ಅಕ್ಕಿ|അരി|ਝੋਨਾ|چاول/.test(
      name
    );

  const isMaize =
    /maize|corn|मक्का|मका|ভুট্টা|மக்காச்சோளம்|మొక్కజొన్న|મકાઈ|ಮೆಕ್ಕೆಜೋಳ|ചോളം|ਮੱਕੀ|مکئی/.test(
      name
    );

  const isPotato =
    /potato|aloo|आलू|बटाटा|আলু|உருளைக்கிழங்கு|బంగాళాదుంప|બટાકા|ಆಲೂಗಡ್ಡೆ|ഉരുളക്കിഴങ്ങ്|ਆਲੂ|آلو/.test(
      name
    );

  if (isWheat) {
    return {
      price: "₹2,400 – ₹2,600",
      trend: t.trendStable,

      advice:
        language === "hi"
          ? "बेचने से पहले आसपास की मंडियों के भाव की तुलना करें। स्थानीय भाव बहुत कम हो तो तुरंत बेचने से बचें।"
          : "Compare nearby mandi prices before selling.",
    };
  }

  if (isRice) {
    return {
      price: "₹2,200 – ₹2,500",
      trend: t.trendModerate,

      advice:
        language === "hi"
          ? "धान की गुणवत्ता और मंडी भाव की तुलना करें।"
          : "Check rice quality requirements and compare mandi rates before selling.",
    };
  }

  if (isMaize) {
    return {
      price: "₹2,000 – ₹2,400",
      trend: t.trendStable,

      advice:
        language === "hi"
          ? "नमी और दाने की गुणवत्ता जाँचें।"
          : "Check moisture and grain quality before selling.",
    };
  }

  if (isPotato) {
    return {
      price: "₹1,200 – ₹1,800",
      trend: t.trendVariable,

      advice:
        language === "hi"
          ? "आज के स्थानीय भाव और भंडारण विकल्प की तुलना करें।"
          : "Compare today's local rates and storage options.",
    };
  }

  return {
    price: t.unknownPrice,
    trend: t.trendCheck,

    advice:
      language === "hi"
        ? "इस फसल का नवीनतम भाव जानने के लिए अपनी नज़दीकी मंडी से संपर्क करें।"
        : "Check your nearest mandi for the latest price.",
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] =
    useState("en");

  const [crop, setCrop] =
    useState<Crop | null>(null);

  const [profile, setProfile] =
    useState<Profile>({});

  const [loading, setLoading] =
    useState(true);

  const [searching, setSearching] =
    useState(false);

  const [searched, setSearched] =
    useState(false);

  const [mandis, setMandis] =
    useState<Mandi[]>([]);

  /*
    IMPORTANT:
    Quantity is controlled by user.
  */
  const [quantity, setQuantity] =
    useState("20");

  const [quantityUnit, setQuantityUnit] =
    useState<QuantityUnit>("quintal");

  const [lastUpdated, setLastUpdated] =
    useState("");

  const [favorites, setFavorites] =
    useState<string[]>([]);

  /*
    Browser GPS.
  */
  const [browserCoords, setBrowserCoords] =
    useState<{
      lat: number;
      lng: number;
    } | null>(null);

  const [locationSource, setLocationSource] =
    useState<
      "browser" | "profile"
    >("profile");

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "selectedLanguage"
      );

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const savedCrops =
      localStorage.getItem(
        "farmerCrops"
      );

    if (savedCrops) {
      try {
        const crops: Crop[] =
          JSON.parse(savedCrops);

        const selected = crops.find(
          (item) =>
            item.id ===
            Number(params.id)
        );

        if (selected) {
          setCrop(selected);
        }
      } catch {
        // ignore
      }
    }

    setProfile(
      getProfileFromStorage()
    );

    try {
      const savedFavs =
        JSON.parse(
          localStorage.getItem(
            "favoriteMandis"
          ) || "[]"
        );

      if (Array.isArray(savedFavs)) {
        setFavorites(savedFavs);
      }
    } catch {
      // ignore
    }

    // Do NOT request browser/live GPS here.
    // Mandi search must always use the farmer's saved profile location.
    setLocationSource("profile");

    setLoading(false);
  }, [params.id]);

  /* =======================================================
     TRANSLATION
  ======================================================= */

  const t: T = {
    ...en,
    ...(translations[language] ||
      {}),
  };

  const isRTL =
    language === "ur";

  /* =======================================================
     PROFILE LOCATION
  ======================================================= */

  const profileLocation =
    useMemo(
      () => ({
        village: String(
          profile.village ||
            profile.villageName ||
            ""
        ),

        city: String(
          profile.city ||
            profile.cityName ||
            ""
        ),

        district: String(
          profile.district ||
            profile.districtName ||
            ""
        ),

        state: String(
          profile.state ||
            profile.stateName ||
            ""
        ),

        pincode: String(
          profile.pincode ||
            profile.pinCode ||
            ""
        ),

        address: String(profile.address || ""),
        addressLine1: String(profile.addressLine1 || ""),
        addressLine2: String(profile.addressLine2 || ""),
        postOffice: String(profile.postOffice || ""),
        tehsil: String(profile.tehsil || ""),
        block: String(profile.block || ""),
      }),
      [profile]
    );

  /* =======================================================
     SEASON
  ======================================================= */

  const getSeasonName = (
    season: string
  ) => {
    if (season === "Kharif") {
      return t.seasonNames.Kharif;
    }

    if (season === "Rabi") {
      return t.seasonNames.Rabi;
    }

    if (season === "Zaid") {
      return t.seasonNames.Zaid;
    }

    if (season === "Other") {
      return t.seasonNames.Other;
    }

    return season;
  };

  /* =======================================================
     USER QUANTITY
  ======================================================= */

  const parsedQuantity =
    Number(quantity);

  const safeQuantity =
    Number.isFinite(
      parsedQuantity
    ) &&
    parsedQuantity > 0
      ? parsedQuantity
      : 0;

  const totalKg =
    quantityToKg(
      safeQuantity,
      quantityUnit
    );

  const enteredQuantityLabel =
    `${safeQuantity || 0} ${
      quantityUnit === "gram"
        ? t.gram
        : quantityUnit === "kg"
        ? t.kg
        : quantityUnit === "quintal"
        ? t.quintal
        : quantityUnit === "ton"
        ? t.ton
        : t.bag
    }`;

  /* =======================================================
     MARKET
  ======================================================= */

  const market = crop
    ? getMarketInfo(
        crop.crop,
        language,
        t
      )
    : null;

  /* =======================================================
     SEARCH MANDIS
  ======================================================= */

  const searchMandis = async () => {
    if (!crop) return;

    if (totalKg <= 0) {
      setSearched(true);
      setMandis([]);
      return;
    }

    setSearching(true);
    setSearched(false);

    try {
      /* IMPORTANT: Mandi search ALWAYS uses the farmer's saved profile address.
         Browser/live GPS is deliberately NOT used for mandi search. */
      const savedAddress = buildProfileAddress(profileLocation);
      let searchLocation: GeocodedLocation | null = null;

      if (savedAddress) {
        searchLocation = await geocodeFarmerAddress(savedAddress);
      }

      if (searchLocation) {
        setLocationSource("profile");
      }

      if (!searchLocation) {
        setMandis([]);
        setSearched(true);
        return;
      }

      /*
        75 km catches border-area cases (for example Panchgachia/Supaul)
        where mandis from both Supaul and Saharsa can genuinely be nearby.
      */
      let nearby = await findNearbyIndianMandis(
        searchLocation,
        100
      );

      if (nearby.length < 5) {
        nearby = await findNearbyIndianMandis(
          searchLocation,
          180
        );
      }

      const quantityQuintal = totalKg / 100;

      const finalMandis: Mandi[] = nearby
        .map((mandi, index) => {
          if (
            typeof mandi.lat !== "number" ||
            typeof mandi.lng !== "number"
          ) return null;

          const distanceKm = haversineDistance(
            searchLocation!.lat,
            searchLocation!.lng,
            mandi.lat,
            mandi.lng
          );

          if (distanceKm > 100) return null;

          const resolvedDistrict =
            mandi.district ||
            searchLocation!.district ||
            profileLocation.district;

          const resolvedState =
            mandi.state ||
            searchLocation!.state ||
            profileLocation.state;

          const isSameDistrict =
            normalize(resolvedDistrict) !== "" &&
            normalize(resolvedDistrict) ===
              normalize(
                searchLocation!.district ||
                  profileLocation.district
              );

          const isSameState =
            normalize(resolvedState) !== "" &&
            normalize(resolvedState) ===
              normalize(
                searchLocation!.state ||
                  profileLocation.state
              );

          const rate = getIndicativeRateForMandi(
            mandi,
            crop.crop,
            market || { price: "" }
          );

          const transportPerQuintal =
            estimateTransport(distanceKm);
          const grossAmount =
            rate * quantityQuintal;
          const totalTransport =
            transportPerQuintal * quantityQuintal;
          const estimatedEarning = Math.max(
            0,
            grossAmount - totalTransport
          );
          const effectiveRatePerQuintal = Math.max(
            0,
            rate - transportPerQuintal
          );

          return {
            ...mandi,
            district: resolvedDistrict,
            state: resolvedState,
            rate,
            id: `osm-${index}-${mandi.name}-${mandi.district}-${mandi.state}`,
            distanceKm:
              Math.round(distanceKm * 10) / 10,
            transportPerQuintal,
            totalTransport,
            effectiveRatePerQuintal,
            effectiveRatePerKg:
              effectiveRatePerQuintal / 100,
            grossAmount,
            estimatedEarning,
            isSameDistrict,
            isSameState,
          };
        })
        .filter(
          (item): item is Mandi => item !== null
        );

      /* Real distance is the primary ranking factor. */
      finalMandis.sort((a, b) => {
        if (Math.abs(a.distanceKm - b.distanceKm) > 2) {
          return a.distanceKm - b.distanceKm;
        }
        if (a.isSameDistrict !== b.isSameDistrict) {
          return a.isSameDistrict ? -1 : 1;
        }
        if (a.isSameState !== b.isSameState) {
          return a.isSameState ? -1 : 1;
        }
        return b.estimatedEarning - a.estimatedEarning;
      });

      setMandis(finalMandis.slice(0, 12));
      setSearched(true);
      setLastUpdated(new Date().toLocaleString("en-IN"));
    } catch (error) {
      console.error("Nearby mandi search failed:", error);
      setMandis([]);
      setSearched(true);
    } finally {
      setSearching(false);
    }
  };

  /* =======================================================
     LIVE RECALCULATION

     If user changes quantity/unit after searching,
     all mandi calculations are recalculated immediately.
  ======================================================= */

  const recalculatedMandis =
    useMemo(() => {
      if (!mandis.length) {
        return [];
      }

      const quantityQuintal =
        totalKg / 100;

      return mandis.map(
        (mandi) => {
          const grossAmount =
            mandi.rate *
            quantityQuintal;

          const totalTransport =
            mandi.transportPerQuintal *
            quantityQuintal;

          const estimatedEarning =
            Math.max(
              0,
              grossAmount -
                totalTransport
            );

          return {
            ...mandi,
            grossAmount,
            totalTransport,
            estimatedEarning,
          };
        }
      );
    }, [mandis, totalKg]);

  const bestMandi =
    recalculatedMandis[0] ||
    null;

  /* =======================================================
     FAVORITE
  ======================================================= */

  const toggleFavorite = (
    mandi: Mandi
  ) => {
    const next =
      favorites.includes(
        mandi.id
      )
        ? favorites.filter(
            (id) =>
              id !== mandi.id
          )
        : [
            ...favorites,
            mandi.id,
          ];

    setFavorites(next);

    localStorage.setItem(
      "favoriteMandis",
      JSON.stringify(next)
    );
  };

  /* =======================================================
     DIRECTIONS
  ======================================================= */

  const openDirections = (
    mandi: Mandi
  ) => {
    const origin =
      buildProfileAddress(profileLocation) ||
      (browserCoords
        ? `${browserCoords.lat},${browserCoords.lng}`
        : "India");

    const destination = [
      mandi.name,
      mandi.address,
      mandi.district,
      mandi.state,
      "India",
    ]
      .filter(Boolean)
      .join(", ");

    const url =
      `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        origin
      )}&destination=${encodeURIComponent(
        destination
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={
          isRTL
            ? "rtl"
            : "ltr"
        }
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">
            🏪
          </div>

          <h1 className="text-2xl font-bold text-green-800">
            {t.loadingTitle}
          </h1>

          <p className="text-gray-900 mt-2">
            {t.loadingText}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     CROP NOT FOUND
  ======================================================= */

  if (!crop || !market) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={
          isRTL
            ? "rtl"
            : "ltr"
        }
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">
            🌱
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.cropNotFound}
          </h1>

          <button
            onClick={() =>
              router.push(
                "/crops"
              )
            }
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
          >
            ← {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={
        isRTL
          ? "rtl"
          : "ltr"
      }
    >
      <div className="max-w-6xl mx-auto">

        {/* BACK */}
        <button
          onClick={() =>
            router.push(
              `/crops/${crop.id}`
            )
          }
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.backTo}{" "}
          {crop.crop}
        </button>

        {/* =================================================
            CROP HEADER
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">
              🌾
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {getSeasonName(
                  crop.season
                )}{" "}
                {t.season}
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop}{" "}
                {t.market}
              </h1>

              <p className="text-gray-900 mt-2">
                {t.landArea}:{" "}
                <span className="font-semibold">
                  {crop.land}{" "}
                  {crop.landUnit ||
                    "acres"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            CURRENT MARKET
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <h2 className="text-2xl font-bold text-green-800">
            {t.currentMarket}
          </h2>

          <p className="text-gray-900 mt-2">
            {t.marketDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                🌾
              </div>

              <p className="text-sm text-gray-900">
                {t.cropLabel}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {crop.crop}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                💰
              </div>

              <p className="text-sm text-gray-900">
                {t.indicativePrice}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.price}
              </p>

              <p className="text-sm text-gray-900 mt-1">
                {t.perQuintal}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                📈
              </div>

              <p className="text-sm text-gray-900">
                {t.marketTrend}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.trend}
              </p>
            </div>

          </div>

          <div className="mt-5 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-900">
              ℹ️ {t.rateUnitNote}
            </p>
          </div>
        </div>

        {/* =================================================
            SELLING ADVICE
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <h2 className="text-2xl font-bold text-green-800">
            {t.sellingAdvice}
          </h2>

          <div className="bg-green-50 rounded-2xl p-6 mt-5">
            <p className="text-gray-900 leading-relaxed">
              {market.advice}
            </p>
          </div>
        </div>

        {/* =================================================
            NEARBY MANDI
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.nearbyMarket}
          </h2>

          <p className="text-gray-900 mt-2">
            {t.nearbyMarketDescription}
          </p>

          {/* LOCATION CARD */}

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <div className="text-3xl">
                📍
              </div>

              <div>

                <p className="text-sm text-blue-600 font-semibold">
                  {t.profileLocation}
                </p>

                <p className="font-bold text-blue-900">
                  {buildProfileAddress(profileLocation) ||
                    (browserCoords
                      ? `${browserCoords.lat.toFixed(5)}, ${browserCoords.lng.toFixed(5)}`
                      : "—")}
                </p>

                <p className="text-sm text-blue-700 mt-1">
                  ✓{" "}
                  {locationSource === "browser"
                    ? t.browserLocation
                    : t.usingProfileLocation}
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {[
                [
                  t.village,
                  profileLocation.village,
                ],

                [
                  t.district,
                  profileLocation.district,
                ],

                [
                  t.state,
                  profileLocation.state,
                ],

                [
                  t.pincode,
                  profileLocation.pincode,
                ],
              ].map(
                ([label, value]) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl p-3"
                  >
                    <p className="text-xs text-gray-900">
                      {label}
                    </p>

                    <p className="font-bold text-gray-800 mt-1">
                      {value ||
                        "—"}
                    </p>
                  </div>
                )
              )}

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              <span className="px-3 py-1 rounded-full bg-white border text-xs font-semibold text-gray-900">
                {t.locationSource}:{" "}
                {locationSource ===
                "browser"
                  ? `📱 ${t.browserLocation}`
                  : `👤 ${t.profileLocationSource}`}
              </span>

              <span className="px-3 py-1 rounded-full bg-white border text-xs font-semibold text-gray-900">
                {t.distanceLimit}:{" "}
                {browserCoords
                  ? "180 km"
                  : "220 km"}
              </span>

            </div>

          </div>

          {/* =================================================
              QUANTITY INPUT
          ================================================= */}

          <div className="mt-7 bg-green-50 border border-green-200 rounded-3xl p-6">

            <h3 className="text-xl font-bold text-green-900">
              {t.quantityCalculator}
            </h3>

            <p className="text-sm text-green-800 mt-1">
              {t.quantity}:{" "}
              <strong>
                {enteredQuantityLabel}
              </strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

              {/* QUANTITY */}

              <div>

                <label className="text-sm font-semibold text-gray-900">
                  {t.quantity}
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.001"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="20"
                />

              </div>

              {/* UNIT */}

              <div>

                <label className="text-sm font-semibold text-gray-900">
                  {t.selectUnit}
                </label>

                <select
                  value={
                    quantityUnit
                  }
                  onChange={(e) =>
                    setQuantityUnit(
                      e.target
                        .value as QuantityUnit
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-green-400"
                >

                  <option value="gram">
                    {t.gram}
                  </option>

                  <option value="kg">
                    {t.kg}
                  </option>

                  <option value="quintal">
                    {t.quintal}
                  </option>

                  <option value="ton">
                    {t.ton}
                  </option>

                  <option value="bag">
                    {t.bag} — 50 kg
                  </option>

                </select>

              </div>

            </div>

            {/* QUANTITY CONVERSION */}

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-white rounded-2xl p-4 border border-green-100">

                <p className="text-xs text-gray-900">
                  {t.quantityEquivalent}
                </p>

                <p className="text-xl font-extrabold text-green-800 mt-1">
                  {totalKg.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 3,
                    }
                  )}{" "}
                  {t.kg}
                </p>

              </div>

              <div className="bg-white rounded-2xl p-4 border border-green-100">

                <p className="text-xs text-gray-900">
                  {t.quantity}
                </p>

                <p className="text-xl font-extrabold text-green-800 mt-1">
                  {enteredQuantityLabel}
                </p>

              </div>

            </div>

            {safeQuantity <=
              0 && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-700 font-semibold">
                  {t.invalidQuantity}
                </p>
              </div>
            )}

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex flex-wrap gap-3 mt-6">

            <button
              onClick={
                searchMandis
              }
              disabled={
                searching ||
                totalKg <= 0
              }
              className="px-7 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 disabled:opacity-60 transition"
            >
              {searching
                ? t.searchingMandi
                : t.findMandi}
            </button>

            {searched && (
              <button
                onClick={
                  searchMandis
                }
                disabled={
                  searching ||
                  totalKg <= 0
                }
                className="px-7 py-3 rounded-xl bg-white border-2 border-green-700 text-green-700 font-bold hover:bg-green-50 disabled:opacity-60 transition"
              >
                {searching
                  ? t.refreshing
                  : t.refreshRates}
              </button>
            )}

          </div>

          {lastUpdated && (
            <p className="text-sm text-gray-900 mt-3">
              🕒{" "}
              {t.lastUpdated}:{" "}
              {lastUpdated}
            </p>
          )}

          {/* =================================================
              RANKING INFO
          ================================================= */}

          {searched && (
            <div className="mt-5 bg-gray-50 rounded-2xl p-4">
              <p className="text-sm text-gray-900">
                ℹ️{" "}
                {t.rankingNote}
              </p>
            </div>
          )}

          {/* =================================================
              BEST MANDI
          ================================================= */}

          {searched &&
            bestMandi && (
              <div className="mt-7 bg-green-700 text-white rounded-3xl p-6 shadow-md">

                <p className="font-bold text-lg">
                  {t.bestMandi}
                </p>

                <h3 className="text-2xl font-extrabold mt-2">
                  ⭐{" "}
                  {t.bestOption}:{" "}
                  {bestMandi.name}
                </h3>

                <p className="mt-2">
                  {t.estimatedEarning}:{" "}
                  <strong>
                    ₹
                    {bestMandi.estimatedEarning.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                  </strong>
                </p>

                <p className="text-sm text-green-100 mt-2">
                  {t.mandiRate}: ₹
                  {bestMandi.rate.toLocaleString(
                    "en-IN"
                  )}{" "}
                  {t.perQuintal}
                </p>

                <p className="text-sm text-green-100 mt-1">
                  {t.distance}:{" "}
                  {bestMandi.distanceKm}{" "}
                  km
                </p>

                <p className="text-sm text-green-100 mt-1">
                  {t.totalTransport}: ₹
                  {bestMandi.totalTransport.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </p>

              </div>
            )}

          {/* =================================================
              MANDI LIST
          ================================================= */}

          {searched &&
            recalculatedMandis.length >
              0 && (
              <div className="mt-8">

                <h3 className="text-2xl font-bold text-green-800">
                  {
                    recalculatedMandis.length
                  }{" "}
                  {t.mandiFound}
                </h3>

                <p className="text-gray-900 text-sm mt-1">
                  {profileLocation.district ||
                    profileLocation.state ||
                    "Nearby"}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

                  {recalculatedMandis.map(
                    (
                      mandi,
                      index
                    ) => {

                      const isFavorite =
                        favorites.includes(
                          mandi.id
                        );

                      const areaLabel =
                        mandi.isSameDistrict
                          ? t.sameDistrict
                          : mandi.isSameState
                          ? t.nearbyDistrict
                          : t.otherDistrict;

                      return (
                        <div
                          key={
                            mandi.id
                          }
                          className={`border rounded-3xl p-6 bg-green-50 hover:shadow-md transition ${
                            index === 0
                              ? "border-green-400 ring-2 ring-green-100"
                              : "border-green-100"
                          }`}
                        >

                          {/* HEADER */}

                          <div className="flex items-start justify-between gap-4">

                            <div className="flex gap-4">

                              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                                🏪
                              </div>

                              <div>

                                <h4 className="text-xl font-bold text-green-900">
                                  {index ===
                                    0 &&
                                    "⭐ "}
                                  {
                                    mandi.name
                                  }
                                </h4>

                                <p className="text-sm text-gray-900 mt-1">
                                  {mandi.district || ""}
                                  {mandi.district && mandi.state ? ", " : ""}
                                  {mandi.state || ""}
                                </p>

                                {mandi.address && (
                                  <p className="text-sm text-gray-900 mt-1 leading-relaxed">
                                    📍 {mandi.address}
                                  </p>
                                )}

                                <div className="flex flex-wrap gap-2 mt-2">

                                  <span className="text-xs px-2 py-1 rounded-full bg-white border font-semibold text-gray-900">
                                    {
                                      mandi.marketType ===
                                      "APMC"
                                        ? t.apmc
                                        : t.localMarket
                                    }
                                  </span>

                                  <span className="text-xs px-2 py-1 rounded-full bg-white border font-semibold text-green-700">
                                    {
                                      areaLabel
                                    }
                                  </span>

                                </div>

                              </div>

                            </div>

                            <button
                              onClick={() =>
                                toggleFavorite(
                                  mandi
                                )
                              }
                              className="shrink-0 px-3 py-2 rounded-xl bg-white border text-sm font-bold hover:bg-yellow-50"
                              title={
                                isFavorite
                                  ? t.saved
                                  : t.save
                              }
                            >
                              {isFavorite
                                ? "❤️"
                                : "🤍"}
                            </button>

                          </div>

                          {/* RATE */}

                          <div className="mt-6 bg-white rounded-2xl p-5">

                            <div className="flex items-center justify-between">

                              <div>

                                <p className="text-sm text-gray-900">
                                  {
                                    t.mandiRate
                                  }
                                </p>

                                <p className="text-3xl font-extrabold text-green-700 mt-1">
                                  ₹
                                  {mandi.rate.toLocaleString(
                                    "en-IN"
                                  )}
                                </p>

                                <p className="text-sm text-gray-900">
                                  {
                                    t.perQuintal
                                  }
                                </p>

                              </div>

                              <div className="text-5xl">
                                💰
                              </div>

                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">

                              <div className="bg-green-50 rounded-xl p-3">
                                <p className="text-xs text-gray-900">
                                  {
                                    t.perKg
                                  }
                                </p>

                                <p className="font-bold text-green-700 mt-1">
                                  ₹
                                  {(
                                    mandi.rate /
                                    100
                                  ).toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </p>
                              </div>

                              <div className="bg-green-50 rounded-xl p-3">
                                <p className="text-xs text-gray-900">
                                  {
                                    t.netPerKg
                                  }
                                </p>

                                <p className="font-bold text-green-700 mt-1">
                                  ₹
                                  {mandi.effectiveRatePerKg.toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </p>
                              </div>

                            </div>

                          </div>

                          {/* DISTANCE / TRANSPORT / EFFECTIVE RATE */}

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

                            <div className="bg-white rounded-xl p-4">

                              <p className="text-xs text-gray-900">
                                📏{" "}
                                {
                                  t.distance
                                }
                              </p>

                              <p className="font-bold text-gray-800 mt-1">
                                {
                                  mandi.distanceKm
                                }{" "}
                                km
                              </p>

                            </div>

                            <div className="bg-white rounded-xl p-4">

                              <p className="text-xs text-gray-900">
                                🚚{" "}
                                {
                                  t.transportation
                                }
                              </p>

                              <p className="font-bold text-orange-700 mt-1">
                                ₹
                                {mandi.transportPerQuintal.toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                              <p className="text-xs text-gray-900">
                                {
                                  t.perQuintal
                                }
                              </p>

                            </div>

                            <div className="bg-white rounded-xl p-4">

                              <p className="text-xs text-gray-900">
                                💵{" "}
                                {
                                  t.effectiveRate
                                }
                              </p>

                              <p className="font-bold text-green-700 mt-1">
                                ₹
                                {mandi.effectiveRatePerQuintal.toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                              <p className="text-xs text-gray-900">
                                {
                                  t.perQuintal
                                }
                              </p>

                            </div>

                          </div>

                          {/* =================================================
                              EXACT QUANTITY CALCULATION
                          ================================================= */}

                          <div className="mt-4 bg-green-100 rounded-2xl p-5">

                            <p className="font-bold text-green-900">
                              {
                                t.quantityCalculator
                              }
                            </p>

                            <p className="text-sm text-green-800 mt-1">
                              {t.quantity}:{" "}
                              <strong>
                                {
                                  enteredQuantityLabel
                                }
                              </strong>
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

                              <div className="bg-white rounded-xl p-4">

                                <p className="text-xs text-gray-900">
                                  {
                                    t.grossAmount
                                  }
                                </p>

                                <p className="font-bold text-blue-700 mt-1">
                                  ₹
                                  {mandi.grossAmount.toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )}
                                </p>

                                <p className="text-xs text-gray-900 mt-1">
                                  {enteredQuantityLabel}
                                </p>

                              </div>

                              <div className="bg-white rounded-xl p-4">

                                <p className="text-xs text-gray-900">
                                  {
                                    t.totalTransport
                                  }
                                </p>

                                <p className="font-bold text-orange-700 mt-1">
                                  ₹
                                  {mandi.totalTransport.toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )}
                                </p>

                                <p className="text-xs text-gray-900 mt-1">
                                  {enteredQuantityLabel}
                                </p>

                              </div>

                              <div className="bg-white rounded-xl p-4">

                                <p className="text-xs text-gray-900">
                                  {
                                    t.estimatedEarning
                                  }
                                </p>

                                <p className="font-extrabold text-green-700 mt-1">
                                  ₹
                                  {mandi.estimatedEarning.toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )}
                                </p>

                                <p className="text-xs text-gray-900 mt-1">
                                  {enteredQuantityLabel}
                                </p>

                              </div>

                            </div>

                            {/* FORMULA */}

                            <div className="mt-4 bg-white rounded-xl p-4">

                              <p className="text-xs text-gray-900">
                                Calculation
                              </p>

                              <p className="text-sm text-gray-900 mt-1">

                                {totalKg.toLocaleString(
                                  "en-IN",
                                  {
                                    maximumFractionDigits: 3,
                                  }
                                )}{" "}
                                kg × ₹
                                {(
                                  mandi.rate /
                                  100
                                ).toLocaleString(
                                  "en-IN",
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                )}
                                /kg = ₹
                                {mandi.grossAmount.toLocaleString(
                                  "en-IN",
                                  {
                                    maximumFractionDigits: 0,
                                  }
                                )}

                              </p>

                            </div>

                          </div>

                          {/* AVAILABLE CROP */}

                          <div className="mt-4 bg-white rounded-2xl p-5">

                            <div className="grid grid-cols-2 gap-3">

                              <div>

                                <p className="text-xs text-gray-900">
                                  {
                                    t.availableCrop
                                  }
                                </p>

                                <p className="font-bold mt-1">
                                  {
                                    crop.crop
                                  }
                                </p>

                              </div>

                              <div>

                                <p className="text-xs text-gray-900">
                                  {
                                    t.netPerQuintal
                                  }
                                </p>

                                <p className="font-bold text-green-700 mt-1">
                                  ₹
                                  {mandi.effectiveRatePerQuintal.toLocaleString(
                                    "en-IN"
                                  )}
                                </p>

                              </div>

                            </div>

                            <button
                              onClick={() =>
                                openDirections(
                                  mandi
                                )
                              }
                              className="mt-4 w-full px-4 py-3 rounded-xl border-2 border-green-700 text-green-700 font-bold hover:bg-green-50"
                            >
                              {
                                t.directions
                              }
                            </button>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

                {/* NOTICE */}

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

                  <p className="text-sm text-yellow-900 leading-relaxed">
                    ⚠️{" "}
                    {
                      t.indicativeNotice
                    }
                  </p>

                </div>

              </div>
            )}

          {/* NO MANDI */}

          {searched &&
            recalculatedMandis.length ===
              0 && (
              <div className="mt-7 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">

                <p className="text-yellow-900">
                  {t.noMandi}
                </p>

                <button
                  onClick={
                    searchMandis
                  }
                  className="mt-4 px-5 py-2 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
                >
                  {t.tryAgain}
                </button>

              </div>
            )}

        </div>

        {/* =================================================
            IMPORTANT BEFORE SELLING
        ================================================= */}

        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7">

          <h2 className="text-2xl font-bold text-yellow-800">
            {
              t.importantBeforeSelling
            }
          </h2>

          <div className="space-y-4 mt-5">

            {[
              [
                "📊",
                t.tip1,
              ],
              [
                "🌾",
                t.tip2,
              ],
              [
                "🚚",
                t.tip3,
              ],
              [
                "💰",
                t.tip4,
              ],
            ].map(
              ([icon, text]) => (
                <div
                  className="flex gap-4"
                  key={text}
                >
                  <div className="text-2xl">
                    {icon}
                  </div>

                  <p className="text-yellow-900">
                    {text}
                  </p>
                </div>
              )
            )}

          </div>

        </div>

      </div>
    </main>
  );
}