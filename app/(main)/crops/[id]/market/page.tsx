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

type ProfileLocation = {
  village?: string;
  city?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
};

type MarketInfo = {
  crop: string;
  price: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: string;
  advice: string;
};

type Mandi = {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  distance: number;
  cropPrice: number;
  transportCost: number;
  netPrice: number;
  location: string;
};

type Translation = {
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
  searchingMandis: string;
  searchMandis: string;

  distance: string;
  mandiRate: string;
  transportCost: string;
  estimatedNetRate: string;
  perQuintal: string;

  kilometers: string;
  estimated: string;

  noMandis: string;
  locationMissing: string;
  locationMissingDescription: string;

  locationFromProfile: string;
  village: string;
  city: string;
  district: string;
  state: string;
  pincode: string;

  importantBeforeSelling: string;
  tip1: string;
  tip2: string;
  tip3: string;
  tip4: string;

  errorSearching: string;
  tryAgain: string;

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

  unitQuintal: string;
  unknownPrice: string;
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations: Record<string, Translation> = {
  en: {
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
      "Indicative information for your crop. Always verify the latest local mandi rate before selling.",

    cropLabel: "Crop",
    indicativePrice: "Indicative Price",
    marketTrend: "Market Trend",

    sellingAdvice: "💡 Selling Advice",

    nearbyMarket: "📍 Nearby Mandi & Markets",
    nearbyMarketDescription:
      "Find agricultural markets near your saved profile location and compare selling opportunities.",

    profileLocation: "Profile Location",
    searchingMandis: "Searching nearby mandis...",
    searchMandis: "Find Nearby Mandi →",

    distance: "Distance",
    mandiRate: "Mandi Rate",
    transportCost: "Estimated Transport",
    estimatedNetRate: "Estimated Net Rate",
    perQuintal: "per quintal",

    kilometers: "km",
    estimated: "Estimated",

    noMandis:
      "No nearby agricultural market was found around your saved profile location.",

    locationMissing: "Profile Location Not Found",
    locationMissingDescription:
      "Please add your village, city, district and state in your profile first.",

    locationFromProfile: "Using location saved in your profile",

    village: "Village",
    city: "City / Town",
    district: "District",
    state: "State",
    pincode: "Pincode",

    importantBeforeSelling: "⚠️ Important Before Selling",

    tip1:
      "Compare prices from more than one nearby mandi whenever possible.",

    tip2:
      "Crop quality, moisture and grading can affect the final selling price.",

    tip3:
      "Consider transportation cost before choosing a mandi with a slightly higher price.",

    tip4:
      "Verify the latest mandi rate before making a final selling decision.",

    errorSearching:
      "We could not search nearby markets right now. Please try again.",

    tryAgain: "Try Again",

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

    unitQuintal: "per quintal",
    unknownPrice: "Market rate unavailable",
  },

  hi: {
    backTo: "वापस जाएँ",
    season: "मौसम",
    market: "बाज़ार",
    landArea: "जमीन का क्षेत्रफल",

    loadingTitle: "बाज़ार की जानकारी लोड हो रही है...",
    loadingText:
      "कृपया प्रतीक्षा करें, हम बाज़ार की जानकारी तैयार कर रहे हैं।",

    cropNotFound: "फसल नहीं मिली",
    backToCrops: "फसलों पर वापस जाएँ",

    currentMarket: "📊 वर्तमान बाज़ार जानकारी",
    marketDescription:
      "आपकी फसल के लिए अनुमानित जानकारी। बेचने से पहले स्थानीय मंडी का नवीनतम भाव जरूर जाँचें।",

    cropLabel: "फसल",
    indicativePrice: "अनुमानित कीमत",
    marketTrend: "बाज़ार का रुझान",

    sellingAdvice: "💡 बिक्री की सलाह",

    nearbyMarket: "📍 नज़दीकी मंडी और बाज़ार",
    nearbyMarketDescription:
      "आपकी प्रोफ़ाइल में सेव स्थान के आसपास कृषि मंडियां खोजें और बिक्री के विकल्पों की तुलना करें।",

    profileLocation: "प्रोफ़ाइल का स्थान",
    searchingMandis: "नज़दीकी मंडियां खोजी जा रही हैं...",
    searchMandis: "नज़दीकी मंडी खोजें →",

    distance: "दूरी",
    mandiRate: "मंडी भाव",
    transportCost: "अनुमानित परिवहन",
    estimatedNetRate: "अनुमानित शुद्ध भाव",
    perQuintal: "प्रति क्विंटल",

    kilometers: "किमी",
    estimated: "अनुमानित",

    noMandis:
      "आपकी सेव की गई प्रोफ़ाइल लोकेशन के आसपास कोई कृषि मंडी नहीं मिली।",

    locationMissing: "प्रोफ़ाइल लोकेशन नहीं मिली",
    locationMissingDescription:
      "कृपया पहले अपनी प्रोफ़ाइल में गांव, शहर, जिला और राज्य जोड़ें।",

    locationFromProfile: "प्रोफ़ाइल में सेव स्थान का उपयोग किया जा रहा है",

    village: "गांव",
    city: "शहर / कस्बा",
    district: "जिला",
    state: "राज्य",
    pincode: "पिनकोड",

    importantBeforeSelling: "⚠️ बेचने से पहले जरूरी बातें",

    tip1:
      "जहाँ संभव हो, एक से अधिक नज़दीकी मंडियों के भाव की तुलना करें।",

    tip2:
      "फसल की गुणवत्ता, नमी और ग्रेडिंग से अंतिम बिक्री कीमत प्रभावित हो सकती है।",

    tip3:
      "थोड़ा अधिक भाव वाली मंडी चुनने से पहले परिवहन का खर्च भी ध्यान में रखें।",

    tip4:
      "फसल बेचने का अंतिम निर्णय लेने से पहले नवीनतम मंडी भाव जरूर जाँचें।",

    errorSearching:
      "अभी नज़दीकी मंडियों की जानकारी नहीं मिल पा रही है। कृपया दोबारा कोशिश करें।",

    tryAgain: "दोबारा कोशिश करें",

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

    unitQuintal: "प्रति क्विंटल",
    unknownPrice: "बाज़ार भाव उपलब्ध नहीं है",
  },

  mr: {
    backTo: "परत जा",
    season: "हंगाम",
    market: "बाजार",
    landArea: "जमिनीचे क्षेत्रफळ",

    loadingTitle: "बाजाराची माहिती लोड होत आहे...",
    loadingText: "कृपया थांबा, आम्ही बाजाराची माहिती तयार करत आहोत.",

    cropNotFound: "पीक सापडले नाही",
    backToCrops: "पिकांकडे परत जा",

    currentMarket: "📊 सध्याची बाजार माहिती",
    marketDescription:
      "तुमच्या पिकासाठी अंदाजे माहिती. विक्रीपूर्वी स्थानिक बाजारातील नवीनतम दर तपासा.",

    cropLabel: "पीक",
    indicativePrice: "अंदाजे किंमत",
    marketTrend: "बाजाराचा कल",

    sellingAdvice: "💡 विक्रीचा सल्ला",

    nearbyMarket: "📍 जवळची बाजारपेठ",
    nearbyMarketDescription:
      "तुमच्या प्रोफाइलमध्ये सेव केलेल्या ठिकाणाजवळील कृषी बाजारपेठा शोधा.",

    profileLocation: "प्रोफाइलचे ठिकाण",
    searchingMandis: "जवळच्या बाजारपेठा शोधत आहे...",
    searchMandis: "जवळची बाजारपेठ शोधा →",

    distance: "अंतर",
    mandiRate: "बाजारभाव",
    transportCost: "अंदाजे वाहतूक खर्च",
    estimatedNetRate: "अंदाजे निव्वळ दर",
    perQuintal: "प्रति क्विंटल",

    kilometers: "किमी",
    estimated: "अंदाजे",

    noMandis:
      "तुमच्या सेव केलेल्या प्रोफाइल ठिकाणाजवळ कोणतीही कृषी बाजारपेठ सापडली नाही.",

    locationMissing: "प्रोफाइलचे ठिकाण सापडले नाही",
    locationMissingDescription:
      "कृपया प्रथम प्रोफाइलमध्ये गाव, शहर, जिल्हा आणि राज्य जोडा.",

    locationFromProfile: "प्रोफाइलमध्ये सेव केलेले ठिकाण वापरले जात आहे",

    village: "गाव",
    city: "शहर / गाव",
    district: "जिल्हा",
    state: "राज्य",
    pincode: "पिनकोड",

    importantBeforeSelling: "⚠️ विक्रीपूर्वी महत्त्वाच्या गोष्टी",

    tip1:
      "शक्य असल्यास एकापेक्षा जास्त जवळच्या बाजारपेठांमधील दरांची तुलना करा.",

    tip2:
      "पिकाची गुणवत्ता, ओलावा आणि दर्जा अंतिम किंमतीवर परिणाम करू शकतो.",

    tip3:
      "थोडा जास्त दर असलेली बाजारपेठ निवडण्यापूर्वी वाहतूक खर्चाचा विचार करा.",

    tip4:
      "विक्रीचा अंतिम निर्णय घेण्यापूर्वी नवीनतम बाजारभाव तपासा.",

    errorSearching:
      "जवळच्या बाजारपेठांची माहिती मिळवता आली नाही. पुन्हा प्रयत्न करा.",

    tryAgain: "पुन्हा प्रयत्न करा",

    seasonNames: {
      Kharif: "खरीप",
      Rabi: "रब्बी",
      Zaid: "उन्हाळी",
      Other: "इतर",
    },

    trendStable: "स्थिर",
    trendModerate: "मध्यम",
    trendVariable: "बदलता",
    trendCheck: "स्थानिक बाजारभाव तपासा",

    unitQuintal: "प्रति क्विंटल",
    unknownPrice: "बाजारभाव उपलब्ध नाही",
  },

  bn: {
    backTo: "ফিরে যান",
    season: "মরসুম",
    market: "বাজার",
    landArea: "জমির পরিমাণ",

    loadingTitle: "বাজারের তথ্য লোড হচ্ছে...",
    loadingText: "অনুগ্রহ করে অপেক্ষা করুন, আমরা বাজারের তথ্য প্রস্তুত করছি।",

    cropNotFound: "ফসল পাওয়া যায়নি",
    backToCrops: "ফসলে ফিরে যান",

    currentMarket: "📊 বর্তমান বাজারের তথ্য",
    marketDescription:
      "আপনার ফসলের জন্য আনুমানিক তথ্য। বিক্রির আগে স্থানীয় মণ্ডির সর্বশেষ দাম যাচাই করুন।",

    cropLabel: "ফসল",
    indicativePrice: "আনুমানিক দাম",
    marketTrend: "বাজারের প্রবণতা",

    sellingAdvice: "💡 বিক্রির পরামর্শ",

    nearbyMarket: "📍 কাছাকাছি মণ্ডি ও বাজার",
    nearbyMarketDescription:
      "আপনার প্রোফাইলে সংরক্ষিত অবস্থানের কাছাকাছি কৃষি বাজার খুঁজুন।",

    profileLocation: "প্রোফাইলের অবস্থান",
    searchingMandis: "কাছাকাছি মণ্ডি খোঁজা হচ্ছে...",
    searchMandis: "কাছাকাছি মণ্ডি খুঁজুন →",

    distance: "দূরত্ব",
    mandiRate: "মণ্ডির দাম",
    transportCost: "আনুমানিক পরিবহন",
    estimatedNetRate: "আনুমানিক নিট দাম",
    perQuintal: "প্রতি কুইন্টাল",

    kilometers: "কিমি",
    estimated: "আনুমানিক",

    noMandis:
      "আপনার সংরক্ষিত প্রোফাইল অবস্থানের কাছে কোনো কৃষি মণ্ডি পাওয়া যায়নি।",

    locationMissing: "প্রোফাইলের অবস্থান পাওয়া যায়নি",
    locationMissingDescription:
      "অনুগ্রহ করে প্রথমে প্রোফাইলে গ্রাম, শহর, জেলা এবং রাজ্য যোগ করুন।",

    locationFromProfile: "প্রোফাইলে সংরক্ষিত অবস্থান ব্যবহার করা হচ্ছে",

    village: "গ্রাম",
    city: "শহর / টাউন",
    district: "জেলা",
    state: "রাজ্য",
    pincode: "পিনকোড",

    importantBeforeSelling: "⚠️ বিক্রির আগে গুরুত্বপূর্ণ বিষয়",

    tip1: "সম্ভব হলে একাধিক কাছাকাছি মণ্ডির দাম তুলনা করুন।",
    tip2: "ফসলের গুণমান, আর্দ্রতা এবং গ্রেডিং চূড়ান্ত দামকে প্রভাবিত করতে পারে।",
    tip3: "সামান্য বেশি দামের মণ্ডি বেছে নেওয়ার আগে পরিবহন খরচ বিবেচনা করুন।",
    tip4: "চূড়ান্ত বিক্রির সিদ্ধান্তের আগে সর্বশেষ মণ্ডির দাম যাচাই করুন।",

    errorSearching:
      "কাছাকাছি বাজারের তথ্য পাওয়া যায়নি। আবার চেষ্টা করুন।",

    tryAgain: "আবার চেষ্টা করুন",

    seasonNames: {
      Kharif: "খরিফ",
      Rabi: "রবি",
      Zaid: "জায়েদ",
      Other: "অন্যান্য",
    },

    trendStable: "স্থিতিশীল",
    trendModerate: "মাঝারি",
    trendVariable: "পরিবর্তনশীল",
    trendCheck: "স্থানীয় মণ্ডির দাম দেখুন",

    unitQuintal: "প্রতি কুইন্টাল",
    unknownPrice: "বাজারদর পাওয়া যায়নি",
  },

  ta: {
    backTo: "திரும்பு",
    season: "பருவம்",
    market: "சந்தை",
    landArea: "நிலப்பரப்பு",

    loadingTitle: "சந்தை தகவல் ஏற்றப்படுகிறது...",
    loadingText: "சந்தை தகவலைத் தயாரிக்கிறோம். தயவுசெய்து காத்திருக்கவும்.",

    cropNotFound: "பயிர் கிடைக்கவில்லை",
    backToCrops: "பயிர்களுக்கு திரும்பு",

    currentMarket: "📊 தற்போதைய சந்தை தகவல்",
    marketDescription:
      "உங்கள் பயிருக்கான மதிப்பிடப்பட்ட தகவல். விற்பனைக்கு முன் உள்ளூர் சந்தையின் சமீபத்திய விலையை சரிபார்க்கவும்.",

    cropLabel: "பயிர்",
    indicativePrice: "மதிப்பிடப்பட்ட விலை",
    marketTrend: "சந்தை நிலவரம்",

    sellingAdvice: "💡 விற்பனை ஆலோசனை",

    nearbyMarket: "📍 அருகிலுள்ள சந்தைகள்",
    nearbyMarketDescription:
      "உங்கள் சுயவிவரத்தில் சேமிக்கப்பட்ட இடத்திற்கு அருகிலுள்ள விவசாய சந்தைகளைக் கண்டறியவும்.",

    profileLocation: "சுயவிவர இடம்",
    searchingMandis: "அருகிலுள்ள சந்தைகள் தேடப்படுகின்றன...",
    searchMandis: "அருகிலுள்ள சந்தையைக் கண்டறியவும் →",

    distance: "தூரம்",
    mandiRate: "சந்தை விலை",
    transportCost: "மதிப்பிடப்பட்ட போக்குவரத்து",
    estimatedNetRate: "மதிப்பிடப்பட்ட நிகர விலை",
    perQuintal: "ஒரு குவிண்டாலுக்கு",

    kilometers: "கிமீ",
    estimated: "மதிப்பிடப்பட்டது",

    noMandis:
      "உங்கள் சேமிக்கப்பட்ட சுயவிவர இடத்திற்கு அருகில் விவசாய சந்தை கிடைக்கவில்லை.",

    locationMissing: "சுயவிவர இடம் கிடைக்கவில்லை",
    locationMissingDescription:
      "முதலில் உங்கள் சுயவிவரத்தில் கிராமம், நகரம், மாவட்டம் மற்றும் மாநிலத்தைச் சேர்க்கவும்.",

    locationFromProfile:
      "சுயவிவரத்தில் சேமிக்கப்பட்ட இடம் பயன்படுத்தப்படுகிறது",

    village: "கிராமம்",
    city: "நகரம் / ஊர்",
    district: "மாவட்டம்",
    state: "மாநிலம்",
    pincode: "அஞ்சல் குறியீடு",

    importantBeforeSelling: "⚠️ விற்பனைக்கு முன் முக்கியமானவை",

    tip1:
      "முடிந்தால் ஒன்றுக்கும் மேற்பட்ட அருகிலுள்ள சந்தைகளின் விலைகளை ஒப்பிடுங்கள்.",

    tip2:
      "பயிரின் தரம், ஈரப்பதம் மற்றும் தரப்படுத்தல் இறுதி விலையை பாதிக்கலாம்.",

    tip3:
      "சற்று அதிக விலை உள்ள சந்தையைத் தேர்ந்தெடுப்பதற்கு முன் போக்குவரத்து செலவைக் கருத்தில் கொள்ளுங்கள்.",

    tip4:
      "விற்பனை முடிவை எடுப்பதற்கு முன் சமீபத்திய சந்தை விலையை சரிபார்க்கவும்.",

    errorSearching:
      "அருகிலுள்ள சந்தை தகவலைப் பெற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

    tryAgain: "மீண்டும் முயற்சிக்கவும்",

    seasonNames: {
      Kharif: "கரீஃப்",
      Rabi: "ரபி",
      Zaid: "ஜயீத்",
      Other: "மற்றவை",
    },

    trendStable: "நிலையானது",
    trendModerate: "மிதமானது",
    trendVariable: "மாறுபடும்",
    trendCheck: "உள்ளூர் சந்தை விலையைப் பார்க்கவும்",

    unitQuintal: "ஒரு குவிண்டாலுக்கு",
    unknownPrice: "சந்தை விலை கிடைக்கவில்லை",
  },

  te: {
    backTo: "తిరిగి వెళ్లండి",
    season: "సీజన్",
    market: "మార్కెట్",
    landArea: "భూమి విస్తీర్ణం",

    loadingTitle: "మార్కెట్ సమాచారం లోడ్ అవుతోంది...",
    loadingText:
      "దయచేసి వేచి ఉండండి, మార్కెట్ సమాచారాన్ని సిద్ధం చేస్తున్నాము.",

    cropNotFound: "పంట కనుగొనబడలేదు",
    backToCrops: "పంటలకు తిరిగి వెళ్లండి",

    currentMarket: "📊 ప్రస్తుత మార్కెట్ సమాచారం",
    marketDescription:
      "మీ పంటకు సంబంధించిన అంచనా సమాచారం. అమ్మకానికి ముందు స్థానిక మార్కెట్ తాజా ధరను తప్పకుండా తనిఖీ చేయండి.",

    cropLabel: "పంట",
    indicativePrice: "అంచనా ధర",
    marketTrend: "మార్కెట్ ధోరణి",

    sellingAdvice: "💡 అమ్మకం సలహా",

    nearbyMarket: "📍 సమీప మార్కెట్లు",
    nearbyMarketDescription:
      "మీ ప్రొఫైల్‌లో సేవ్ చేసిన ప్రదేశానికి సమీపంలోని వ్యవసాయ మార్కెట్లను కనుగొనండి.",

    profileLocation: "ప్రొఫైల్ లొకేషన్",
    searchingMandis: "సమీప మార్కెట్లను వెతుకుతోంది...",
    searchMandis: "సమీప మార్కెట్‌ను కనుగొనండి →",

    distance: "దూరం",
    mandiRate: "మార్కెట్ ధర",
    transportCost: "అంచనా రవాణా ఖర్చు",
    estimatedNetRate: "అంచనా నికర ధర",
    perQuintal: "క్వింటాల్‌కు",

    kilometers: "కి.మీ",
    estimated: "అంచనా",

    noMandis:
      "మీ సేవ్ చేసిన ప్రొఫైల్ లొకేషన్ సమీపంలో వ్యవసాయ మార్కెట్ కనుగొనబడలేదు.",

    locationMissing: "ప్రొఫైల్ లొకేషన్ కనుగొనబడలేదు",
    locationMissingDescription:
      "ముందుగా మీ ప్రొఫైల్‌లో గ్రామం, నగరం, జిల్లా మరియు రాష్ట్రాన్ని జోడించండి.",

    locationFromProfile: "ప్రొఫైల్‌లో సేవ్ చేసిన లొకేషన్ ఉపయోగించబడుతోంది",

    village: "గ్రామం",
    city: "నగరం / పట్టణం",
    district: "జిల్లా",
    state: "రాష్ట్రం",
    pincode: "పిన్‌కోడ్",

    importantBeforeSelling: "⚠️ అమ్మకానికి ముందు ముఖ్యమైన విషయాలు",

    tip1:
      "సాధ్యమైనప్పుడు ఒకటి కంటే ఎక్కువ సమీప మార్కెట్ల ధరలను పోల్చండి.",

    tip2:
      "పంట నాణ్యత, తేమ మరియు గ్రేడింగ్ తుది ధరను ప్రభావితం చేయవచ్చు.",

    tip3:
      "కొంచెం ఎక్కువ ధర ఉన్న మార్కెట్‌ను ఎంచుకునే ముందు రవాణా ఖర్చును పరిగణించండి.",

    tip4:
      "చివరి అమ్మకం నిర్ణయం తీసుకునే ముందు తాజా మార్కెట్ ధరను తనిఖీ చేయండి.",

    errorSearching:
      "సమీప మార్కెట్ సమాచారాన్ని పొందలేకపోయాము. మళ్లీ ప్రయత్నించండి.",

    tryAgain: "మళ్లీ ప్రయత్నించండి",

    seasonNames: {
      Kharif: "ఖరీఫ్",
      Rabi: "రబీ",
      Zaid: "జైద్",
      Other: "ఇతర",
    },

    trendStable: "స్థిరంగా ఉంది",
    trendModerate: "మధ్యస్థం",
    trendVariable: "మారుతూ ఉంటుంది",
    trendCheck: "స్థానిక మార్కెట్ ధరను చూడండి",

    unitQuintal: "క్వింటాల్‌కు",
    unknownPrice: "మార్కెట్ ధర అందుబాటులో లేదు",
  },

  gu: {
    backTo: "પાછા જાઓ",
    season: "સિઝન",
    market: "બજાર",
    landArea: "જમીનનું ક્ષેત્રફળ",

    loadingTitle: "બજારની માહિતી લોડ થઈ રહી છે...",
    loadingText:
      "કૃપા કરીને રાહ જુઓ, અમે બજારની માહિતી તૈયાર કરી રહ્યા છીએ.",

    cropNotFound: "પાક મળ્યો નથી",
    backToCrops: "પાક પર પાછા જાઓ",

    currentMarket: "📊 વર્તમાન બજાર માહિતી",
    marketDescription:
      "તમારા પાક માટે અંદાજિત માહિતી. વેચાણ પહેલાં સ્થાનિક મંડીનો નવીનતમ ભાવ તપાસો.",

    cropLabel: "પાક",
    indicativePrice: "અંદાજિત કિંમત",
    marketTrend: "બજારનો ટ્રેન્ડ",

    sellingAdvice: "💡 વેચાણની સલાહ",

    nearbyMarket: "📍 નજીકની મંડી અને બજારો",
    nearbyMarketDescription:
      "તમારી પ્રોફાઇલમાં સેવ કરેલા સ્થળની આસપાસના કૃષિ બજારો શોધો.",

    profileLocation: "પ્રોફાઇલનું સ્થળ",
    searchingMandis: "નજીકની મંડી શોધી રહ્યા છીએ...",
    searchMandis: "નજીકની મંડી શોધો →",

    distance: "અંતર",
    mandiRate: "મંડી ભાવ",
    transportCost: "અંદાજિત પરિવહન",
    estimatedNetRate: "અંદાજિત નેટ ભાવ",
    perQuintal: "પ્રતિ ક્વિન્ટલ",

    kilometers: "કિમી",
    estimated: "અંદાજિત",

    noMandis:
      "તમારા સેવ કરેલા પ્રોફાઇલ સ્થળની આસપાસ કોઈ કૃષિ મંડી મળી નથી.",

    locationMissing: "પ્રોફાઇલનું સ્થળ મળ્યું નથી",
    locationMissingDescription:
      "કૃપા કરીને પહેલા પ્રોફાઇલમાં ગામ, શહેર, જિલ્લો અને રાજ્ય ઉમેરો.",

    locationFromProfile:
      "પ્રોફાઇલમાં સેવ કરેલું સ્થળ ઉપયોગમાં લેવામાં આવી રહ્યું છે",

    village: "ગામ",
    city: "શહેર / નગર",
    district: "જિલ્લો",
    state: "રાજ્ય",
    pincode: "પિનકોડ",

    importantBeforeSelling: "⚠️ વેચાણ પહેલાં મહત્વપૂર્ણ બાબતો",

    tip1: "શક્ય હોય ત્યારે એક કરતાં વધુ નજીકની મંડીના ભાવની તુલના કરો.",
    tip2: "પાકની ગુણવત્તા, ભેજ અને ગ્રેડિંગ અંતિમ કિંમતને અસર કરી શકે છે.",
    tip3:
      "થોડી વધુ કિંમતવાળી મંડી પસંદ કરતા પહેલાં પરિવહન ખર્ચ ધ્યાનમાં લો.",
    tip4: "વેચાણનો અંતિમ નિર્ણય લેતા પહેલાં નવીનતમ મંડી ભાવ તપાસો.",

    errorSearching:
      "નજીકની મંડીની માહિતી મળી શકી નથી. ફરી પ્રયાસ કરો.",

    tryAgain: "ફરી પ્રયાસ કરો",

    seasonNames: {
      Kharif: "ખરીફ",
      Rabi: "રબી",
      Zaid: "ઝાયદ",
      Other: "અન્ય",
    },

    trendStable: "સ્થિર",
    trendModerate: "મધ્યમ",
    trendVariable: "બદલાતો",
    trendCheck: "સ્થાનિક મંડીનો ભાવ જુઓ",

    unitQuintal: "પ્રતિ ક્વિન્ટલ",
    unknownPrice: "બજાર ભાવ ઉપલબ્ધ નથી",
  },

  kn: {
    backTo: "ಹಿಂದಿರುಗಿ",
    season: "ಹಂಗಾಮು",
    market: "ಮಾರುಕಟ್ಟೆ",
    landArea: "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ",

    loadingTitle: "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    loadingText:
      "ದಯವಿಟ್ಟು ಕಾಯಿರಿ, ನಾವು ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದ್ದೇವೆ.",

    cropNotFound: "ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ",
    backToCrops: "ಬೆಳೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",

    currentMarket: "📊 ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    marketDescription:
      "ನಿಮ್ಮ ಬೆಳೆಗೆ ಅಂದಾಜು ಮಾಹಿತಿ. ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಯ ಇತ್ತೀಚಿನ ದರವನ್ನು ಪರಿಶೀಲಿಸಿ.",

    cropLabel: "ಬೆಳೆ",
    indicativePrice: "ಅಂದಾಜು ಬೆಲೆ",
    marketTrend: "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿ",

    sellingAdvice: "💡 ಮಾರಾಟ ಸಲಹೆ",

    nearbyMarket: "📍 ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳು",
    nearbyMarketDescription:
      "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಉಳಿಸಿದ ಸ್ಥಳದ ಸಮೀಪದ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಿ.",

    profileLocation: "ಪ್ರೊಫೈಲ್ ಸ್ಥಳ",
    searchingMandis: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    searchMandis: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ →",

    distance: "ದೂರ",
    mandiRate: "ಮಾರುಕಟ್ಟೆ ದರ",
    transportCost: "ಅಂದಾಜು ಸಾರಿಗೆ",
    estimatedNetRate: "ಅಂದಾಜು ನಿವ್ವಳ ದರ",
    perQuintal: "ಪ್ರತಿ ಕ್ವಿಂಟಲ್",

    kilometers: "ಕಿಮೀ",
    estimated: "ಅಂದಾಜು",

    noMandis:
      "ನಿಮ್ಮ ಉಳಿಸಿದ ಪ್ರೊಫೈಲ್ ಸ್ಥಳದ ಸುತ್ತಮುತ್ತ ಯಾವುದೇ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಕಂಡುಬಂದಿಲ್ಲ.",

    locationMissing: "ಪ್ರೊಫೈಲ್ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ",
    locationMissingDescription:
      "ಮೊದಲು ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಗ್ರಾಮ, ನಗರ, ಜಿಲ್ಲೆ ಮತ್ತು ರಾಜ್ಯವನ್ನು ಸೇರಿಸಿ.",

    locationFromProfile:
      "ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಉಳಿಸಿದ ಸ್ಥಳವನ್ನು ಬಳಸಲಾಗುತ್ತಿದೆ",

    village: "ಗ್ರಾಮ",
    city: "ನಗರ / ಪಟ್ಟಣ",
    district: "ಜಿಲ್ಲೆ",
    state: "ರಾಜ್ಯ",
    pincode: "ಪಿನ್‌ಕೋಡ್",

    importantBeforeSelling: "⚠️ ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಮುಖ್ಯ ವಿಷಯಗಳು",

    tip1:
      "ಸಾಧ್ಯವಾದರೆ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳ ದರಗಳನ್ನು ಹೋಲಿಸಿ.",

    tip2:
      "ಬೆಳೆಯ ಗುಣಮಟ್ಟ, ತೇವಾಂಶ ಮತ್ತು ಗ್ರೇಡಿಂಗ್ ಅಂತಿಮ ಬೆಲೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಬಹುದು.",

    tip3:
      "ಸ್ವಲ್ಪ ಹೆಚ್ಚಿನ ಬೆಲೆ ಇರುವ ಮಾರುಕಟ್ಟೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡುವ ಮೊದಲು ಸಾರಿಗೆ ವೆಚ್ಚವನ್ನು ಪರಿಗಣಿಸಿ.",

    tip4:
      "ಅಂತಿಮ ಮಾರಾಟ ನಿರ್ಧಾರ ಮಾಡುವ ಮೊದಲು ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ದರವನ್ನು ಪರಿಶೀಲಿಸಿ.",

    errorSearching:
      "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",

    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",

    seasonNames: {
      Kharif: "ಖರೀಫ್",
      Rabi: "ರಬಿ",
      Zaid: "ಜೈದ್",
      Other: "ಇತರೆ",
    },

    trendStable: "ಸ್ಥಿರ",
    trendModerate: "ಮಧ್ಯಮ",
    trendVariable: "ಬದಲಾಗುವ",
    trendCheck: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ದರ ನೋಡಿ",

    unitQuintal: "ಪ್ರತಿ ಕ್ವಿಂಟಲ್",
    unknownPrice: "ಮಾರುಕಟ್ಟೆ ದರ ಲಭ್ಯವಿಲ್ಲ",
  },

  ml: {
    backTo: "തിരികെ പോകുക",
    season: "സീസൺ",
    market: "വിപണി",
    landArea: "ഭൂവിസ്തീർണ്ണം",

    loadingTitle: "വിപണി വിവരങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
    loadingText: "ദയവായി കാത്തിരിക്കുക, വിപണി വിവരങ്ങൾ തയ്യാറാക്കുകയാണ്.",

    cropNotFound: "വിള കണ്ടെത്തിയില്ല",
    backToCrops: "വിളകളിലേക്ക് മടങ്ങുക",

    currentMarket: "📊 നിലവിലെ വിപണി വിവരങ്ങൾ",
    marketDescription:
      "നിങ്ങളുടെ വിളയ്ക്കുള്ള ഏകദേശ വിവരങ്ങൾ. വിൽപ്പനയ്ക്ക് മുമ്പ് പ്രാദേശിക വിപണിയിലെ ഏറ്റവും പുതിയ വില പരിശോധിക്കുക.",

    cropLabel: "വിള",
    indicativePrice: "ഏകദേശ വില",
    marketTrend: "വിപണി പ്രവണത",

    sellingAdvice: "💡 വിൽപ്പന നിർദ്ദേശം",

    nearbyMarket: "📍 സമീപത്തെ വിപണികൾ",
    nearbyMarketDescription:
      "നിങ്ങളുടെ പ്രൊഫൈലിൽ സംരക്ഷിച്ചിരിക്കുന്ന സ്ഥലത്തിന് സമീപമുള്ള കാർഷിക വിപണികൾ കണ്ടെത്തുക.",

    profileLocation: "പ്രൊഫൈൽ സ്ഥലം",
    searchingMandis: "സമീപത്തെ വിപണികൾ തിരയുന്നു...",
    searchMandis: "സമീപത്തെ വിപണി കണ്ടെത്തുക →",

    distance: "ദൂരം",
    mandiRate: "വിപണി വില",
    transportCost: "ഏകദേശ ഗതാഗത ചെലവ്",
    estimatedNetRate: "ഏകദേശ നെറ്റ് വില",
    perQuintal: "ക്വിന്റലിന്",

    kilometers: "കിമീ",
    estimated: "ഏകദേശ",

    noMandis:
      "നിങ്ങളുടെ സംരക്ഷിച്ച പ്രൊഫൈൽ സ്ഥലത്തിന് സമീപം കാർഷിക വിപണി കണ്ടെത്താനായില്ല.",

    locationMissing: "പ്രൊഫൈൽ സ്ഥലം കണ്ടെത്തിയില്ല",
    locationMissingDescription:
      "ആദ്യം നിങ്ങളുടെ പ്രൊഫൈലിൽ ഗ്രാമം, നഗരം, ജില്ല, സംസ്ഥാനം എന്നിവ ചേർക്കുക.",

    locationFromProfile:
      "പ്രൊഫൈലിൽ സംരക്ഷിച്ച സ്ഥലം ഉപയോഗിക്കുന്നു",

    village: "ഗ്രാമം",
    city: "നഗരം / പട്ടണം",
    district: "ജില്ല",
    state: "സംസ്ഥാനം",
    pincode: "പിൻകോഡ്",

    importantBeforeSelling: "⚠️ വിൽക്കുന്നതിന് മുമ്പ് ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ",

    tip1: "സാധ്യമെങ്കിൽ ഒന്നിലധികം സമീപ വിപണികളിലെ വില താരതമ്യം ചെയ്യുക.",
    tip2: "വിളയുടെ ഗുണനിലവാരം, ഈർപ്പം, ഗ്രേഡിംഗ് എന്നിവ അന്തിമ വിലയെ ബാധിക്കും.",
    tip3:
      "അൽപ്പം ഉയർന്ന വിലയുള്ള വിപണി തിരഞ്ഞെടുക്കുന്നതിന് മുമ്പ് ഗതാഗതച്ചെലവ് പരിഗണിക്കുക.",
    tip4:
      "അന്തിമ വിൽപ്പന തീരുമാനം എടുക്കുന്നതിന് മുമ്പ് ഏറ്റവും പുതിയ വിപണി വില പരിശോധിക്കുക.",

    errorSearching:
      "സമീപത്തെ വിപണി വിവരങ്ങൾ ലഭ്യമാക്കാനായില്ല. വീണ്ടും ശ്രമിക്കുക.",

    tryAgain: "വീണ്ടും ശ്രമിക്കുക",

    seasonNames: {
      Kharif: "ഖരീഫ്",
      Rabi: "റാബി",
      Zaid: "സൈദ്",
      Other: "മറ്റുള്ളവ",
    },

    trendStable: "സ്ഥിരം",
    trendModerate: "മിതമായ",
    trendVariable: "മാറിക്കൊണ്ടിരിക്കുന്നു",
    trendCheck: "പ്രാദേശിക വിപണി വില പരിശോധിക്കുക",

    unitQuintal: "ക്വിന്റലിന്",
    unknownPrice: "വിപണി വില ലഭ്യമല്ല",
  },

  pa: {
    backTo: "ਵਾਪਸ ਜਾਓ",
    season: "ਮੌਸਮ",
    market: "ਬਾਜ਼ਾਰ",
    landArea: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ",

    loadingTitle: "ਬਾਜ਼ਾਰ ਦੀ ਜਾਣਕਾਰੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
    loadingText:
      "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ, ਅਸੀਂ ਬਾਜ਼ਾਰ ਦੀ ਜਾਣਕਾਰੀ ਤਿਆਰ ਕਰ ਰਹੇ ਹਾਂ।",

    cropNotFound: "ਫਸਲ ਨਹੀਂ ਮਿਲੀ",
    backToCrops: "ਫਸਲਾਂ ਤੇ ਵਾਪਸ ਜਾਓ",

    currentMarket: "📊 ਮੌਜੂਦਾ ਬਾਜ਼ਾਰ ਜਾਣਕਾਰੀ",
    marketDescription:
      "ਤੁਹਾਡੀ ਫਸਲ ਲਈ ਅੰਦਾਜ਼ਨ ਜਾਣਕਾਰੀ। ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਸਥਾਨਕ ਮੰਡੀ ਦਾ ਨਵਾਂ ਭਾਅ ਜ਼ਰੂਰ ਜਾਂਚੋ।",

    cropLabel: "ਫਸਲ",
    indicativePrice: "ਅੰਦਾਜ਼ਨ ਕੀਮਤ",
    marketTrend: "ਬਾਜ਼ਾਰ ਦਾ ਰੁਝਾਨ",

    sellingAdvice: "💡 ਵਿਕਰੀ ਦੀ ਸਲਾਹ",

    nearbyMarket: "📍 ਨੇੜਲੀ ਮੰਡੀ ਅਤੇ ਬਾਜ਼ਾਰ",
    nearbyMarketDescription:
      "ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਕੀਤੇ ਸਥਾਨ ਦੇ ਨੇੜੇ ਖੇਤੀਬਾੜੀ ਮੰਡੀਆਂ ਲੱਭੋ।",

    profileLocation: "ਪ੍ਰੋਫਾਈਲ ਦਾ ਸਥਾਨ",
    searchingMandis: "ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਲੱਭੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ...",
    searchMandis: "ਨੇੜਲੀ ਮੰਡੀ ਲੱਭੋ →",

    distance: "ਦੂਰੀ",
    mandiRate: "ਮੰਡੀ ਭਾਅ",
    transportCost: "ਅੰਦਾਜ਼ਨ ਆਵਾਜਾਈ",
    estimatedNetRate: "ਅੰਦਾਜ਼ਨ ਨੈੱਟ ਭਾਅ",
    perQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ",

    kilometers: "ਕਿਮੀ",
    estimated: "ਅੰਦਾਜ਼ਨ",

    noMandis:
      "ਤੁਹਾਡੇ ਸੇਵ ਕੀਤੇ ਪ੍ਰੋਫਾਈਲ ਸਥਾਨ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਕੋਈ ਖੇਤੀਬਾੜੀ ਮੰਡੀ ਨਹੀਂ ਮਿਲੀ।",

    locationMissing: "ਪ੍ਰੋਫਾਈਲ ਸਥਾਨ ਨਹੀਂ ਮਿਲਿਆ",
    locationMissingDescription:
      "ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਪਿੰਡ, ਸ਼ਹਿਰ, ਜ਼ਿਲ੍ਹਾ ਅਤੇ ਰਾਜ ਸ਼ਾਮਲ ਕਰੋ।",

    locationFromProfile:
      "ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਕੀਤਾ ਸਥਾਨ ਵਰਤਿਆ ਜਾ ਰਿਹਾ ਹੈ",

    village: "ਪਿੰਡ",
    city: "ਸ਼ਹਿਰ / ਕਸਬਾ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    state: "ਰਾਜ",
    pincode: "ਪਿੰਨਕੋਡ",

    importantBeforeSelling: "⚠️ ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਗੱਲਾਂ",

    tip1:
      "ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ, ਇੱਕ ਤੋਂ ਵੱਧ ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰੋ।",

    tip2:
      "ਫਸਲ ਦੀ ਗੁਣਵੱਤਾ, ਨਮੀ ਅਤੇ ਗ੍ਰੇਡਿੰਗ ਅੰਤਿਮ ਕੀਮਤ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੀ ਹੈ।",

    tip3:
      "ਥੋੜ੍ਹੇ ਵੱਧ ਭਾਅ ਵਾਲੀ ਮੰਡੀ ਚੁਣਨ ਤੋਂ ਪਹਿਲਾਂ ਆਵਾਜਾਈ ਦਾ ਖਰਚਾ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ।",

    tip4:
      "ਅੰਤਿਮ ਵਿਕਰੀ ਦਾ ਫੈਸਲਾ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਨਵਾਂ ਮੰਡੀ ਭਾਅ ਜ਼ਰੂਰ ਜਾਂਚੋ।",

    errorSearching:
      "ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੀ ਜਾਣਕਾਰੀ ਨਹੀਂ ਮਿਲ ਸਕੀ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",

    tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",

    seasonNames: {
      Kharif: "ਖਰੀਫ",
      Rabi: "ਰਬੀ",
      Zaid: "ਜ਼ਾਇਦ",
      Other: "ਹੋਰ",
    },

    trendStable: "ਸਥਿਰ",
    trendModerate: "ਦਰਮਿਆਨਾ",
    trendVariable: "ਬਦਲਦਾ",
    trendCheck: "ਸਥਾਨਕ ਮੰਡੀ ਦਾ ਭਾਅ ਦੇਖੋ",

    unitQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ",
    unknownPrice: "ਬਾਜ਼ਾਰ ਭਾਅ ਉਪਲਬਧ ਨਹੀਂ",
  },

  or: {
    backTo: "ଫେରନ୍ତୁ",
    season: "ଋତୁ",
    market: "ବଜାର",
    landArea: "ଜମିର କ୍ଷେତ୍ରଫଳ",

    loadingTitle: "ବଜାର ସୂଚନା ଲୋଡ୍ ହେଉଛି...",
    loadingText:
      "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ, ଆମେ ବଜାର ସୂଚନା ପ୍ରସ୍ତୁତ କରୁଛୁ।",

    cropNotFound: "ଫସଲ ମିଳିଲା ନାହିଁ",
    backToCrops: "ଫସଲକୁ ଫେରନ୍ତୁ",

    currentMarket: "📊 ବର୍ତ୍ତମାନ ବଜାର ସୂଚନା",
    marketDescription:
      "ଆପଣଙ୍କ ଫସଲ ପାଇଁ ଆନୁମାନିକ ସୂଚନା। ବିକ୍ରି ପୂର୍ବରୁ ସ୍ଥାନୀୟ ମଣ୍ଡିର ନୂତନ ଦର ଯାଞ୍ଚ କରନ୍ତୁ।",

    cropLabel: "ଫସଲ",
    indicativePrice: "ଆନୁମାନିକ ମୂଲ୍ୟ",
    marketTrend: "ବଜାର ପ୍ରବଣତା",

    sellingAdvice: "💡 ବିକ୍ରି ପରାମର୍ଶ",

    nearbyMarket: "📍 ନିକଟସ୍ଥ ମଣ୍ଡି ଓ ବଜାର",
    nearbyMarketDescription:
      "ଆପଣଙ୍କ ପ୍ରୋଫାଇଲରେ ସେଭ୍ ହୋଇଥିବା ସ୍ଥାନ ନିକଟରେ କୃଷି ବଜାର ଖୋଜନ୍ତୁ।",

    profileLocation: "ପ୍ରୋଫାଇଲ ସ୍ଥାନ",
    searchingMandis: "ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜାଯାଉଛି...",
    searchMandis: "ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜନ୍ତୁ →",

    distance: "ଦୂରତା",
    mandiRate: "ମଣ୍ଡି ଦର",
    transportCost: "ଆନୁମାନିକ ପରିବହନ",
    estimatedNetRate: "ଆନୁମାନିକ ନିଟ୍ ଦର",
    perQuintal: "ପ୍ରତି କ୍ୱିଣ୍ଟାଲ",

    kilometers: "କିମି",
    estimated: "ଆନୁମାନିକ",

    noMandis:
      "ଆପଣଙ୍କ ସେଭ୍ ହୋଇଥିବା ପ୍ରୋଫାଇଲ ସ୍ଥାନ ନିକଟରେ କୌଣସି କୃଷି ମଣ୍ଡି ମିଳିଲା ନାହିଁ।",

    locationMissing: "ପ୍ରୋଫାଇଲ ସ୍ଥାନ ମିଳିଲା ନାହିଁ",
    locationMissingDescription:
      "ଦୟାକରି ପ୍ରଥମେ ପ୍ରୋଫାଇଲରେ ଗାଁ, ସହର, ଜିଲ୍ଲା ଏବଂ ରାଜ୍ୟ ଯୋଡନ୍ତୁ।",

    locationFromProfile:
      "ପ୍ରୋଫାଇଲରେ ସେଭ୍ ହୋଇଥିବା ସ୍ଥାନ ବ୍ୟବହାର କରାଯାଉଛି",

    village: "ଗାଁ",
    city: "ସହର / ଟାଉନ୍",
    district: "ଜିଲ୍ଲା",
    state: "ରାଜ୍ୟ",
    pincode: "ପିନ୍ କୋଡ୍",

    importantBeforeSelling: "⚠️ ବିକ୍ରି ପୂର୍ବରୁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",

    tip1: "ସମ୍ଭବ ହେଲେ ଏକାଧିକ ନିକଟସ୍ଥ ମଣ୍ଡିର ଦର ତୁଳନା କରନ୍ତୁ।",
    tip2:
      "ଫସଲର ଗୁଣବତ୍ତା, ଆର୍ଦ୍ରତା ଏବଂ ଗ୍ରେଡିଂ ଶେଷ ମୂଲ୍ୟକୁ ପ୍ରଭାବିତ କରିପାରେ।",
    tip3:
      "ସାମାନ୍ୟ ଅଧିକ ଦର ଥିବା ମଣ୍ଡି ବାଛିବା ପୂର୍ବରୁ ପରିବହନ ଖର୍ଚ୍ଚ ବିଚାର କରନ୍ତୁ।",
    tip4:
      "ଶେଷ ବିକ୍ରି ନିଷ୍ପତ୍ତି ପୂର୍ବରୁ ନୂତନ ମଣ୍ଡି ଦର ଯାଞ୍ଚ କରନ୍ତୁ।",

    errorSearching:
      "ନିକଟସ୍ଥ ମଣ୍ଡି ସୂଚନା ମିଳିଲା ନାହିଁ। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",

    tryAgain: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",

    seasonNames: {
      Kharif: "ଖରିଫ",
      Rabi: "ରବି",
      Zaid: "ଜାୟଦ",
      Other: "ଅନ୍ୟାନ୍ୟ",
    },

    trendStable: "ସ୍ଥିର",
    trendModerate: "ମଧ୍ୟମ",
    trendVariable: "ପରିବର୍ତ୍ତନଶୀଳ",
    trendCheck: "ସ୍ଥାନୀୟ ମଣ୍ଡି ଦର ଦେଖନ୍ତୁ",

    unitQuintal: "ପ୍ରତି କ୍ୱିଣ୍ଟାଲ",
    unknownPrice: "ବଜାର ଦର ଉପଲବ୍ଧ ନାହିଁ",
  },

  as: {
    backTo: "উভতি যাওক",
    season: "ঋতু",
    market: "বজাৰ",
    landArea: "মাটিৰ পৰিমাণ",

    loadingTitle: "বজাৰৰ তথ্য লোড হৈ আছে...",
    loadingText:
      "অনুগ্ৰহ কৰি অপেক্ষা কৰক, আমি বজাৰৰ তথ্য প্ৰস্তুত কৰি আছোঁ।",

    cropNotFound: "শস্য পোৱা নগ'ল",
    backToCrops: "শস্যলৈ উভতি যাওক",

    currentMarket: "📊 বৰ্তমান বজাৰৰ তথ্য",
    marketDescription:
      "আপোনাৰ শস্যৰ বাবে আনুমানিক তথ্য। বিক্ৰী কৰাৰ আগতে স্থানীয় মণ্ডিৰ শেহতীয়া মূল্য পৰীক্ষা কৰক।",

    cropLabel: "শস্য",
    indicativePrice: "আনুমানিক মূল্য",
    marketTrend: "বজাৰৰ প্ৰৱণতা",

    sellingAdvice: "💡 বিক্ৰীৰ পৰামৰ্শ",

    nearbyMarket: "📍 ওচৰৰ মণ্ডি আৰু বজাৰ",
    nearbyMarketDescription:
      "আপোনাৰ প্ৰফাইলত সংৰক্ষিত স্থানৰ ওচৰৰ কৃষি বজাৰ বিচাৰি উলিয়াওক।",

    profileLocation: "প্ৰফাইলৰ স্থান",
    searchingMandis: "ওচৰৰ মণ্ডি বিচাৰি থকা হৈছে...",
    searchMandis: "ওচৰৰ মণ্ডি বিচাৰক →",

    distance: "দূৰত্ব",
    mandiRate: "মণ্ডিৰ মূল্য",
    transportCost: "আনুমানিক পৰিবহণ",
    estimatedNetRate: "আনুমানিক নেট মূল্য",
    perQuintal: "প্ৰতি কুইণ্টল",

    kilometers: "কিমি",
    estimated: "আনুমানিক",

    noMandis:
      "আপোনাৰ সংৰক্ষিত প্ৰফাইল স্থানৰ ওচৰত কোনো কৃষি মণ্ডি পোৱা নগ'ল।",

    locationMissing: "প্ৰফাইলৰ স্থান পোৱা নগ'ল",
    locationMissingDescription:
      "অনুগ্ৰহ কৰি প্ৰথমে প্ৰফাইলত গাঁও, চহৰ, জিলা আৰু ৰাজ্য যোগ কৰক।",

    locationFromProfile:
      "প্ৰফাইলত সংৰক্ষিত স্থান ব্যৱহাৰ কৰা হৈছে",

    village: "গাঁও",
    city: "চহৰ / নগৰ",
    district: "জিলা",
    state: "ৰাজ্য",
    pincode: "পিনকোড",

    importantBeforeSelling: "⚠️ বিক্ৰীৰ আগতে গুৰুত্বপূৰ্ণ কথা",

    tip1: "সম্ভৱ হ'লে এটাতকৈ অধিক ওচৰৰ মণ্ডিৰ মূল্য তুলনা কৰক।",
    tip2:
      "শস্যৰ গুণগত মান, আৰ্দ্ৰতা আৰু গ্ৰেডিঙে চূড়ান্ত মূল্যত প্ৰভাৱ পেলাব পাৰে।",
    tip3:
      "অলপ বেছি মূল্য থকা মণ্ডি বাছনি কৰাৰ আগতে পৰিবহণৰ খৰচ বিবেচনা কৰক।",
    tip4:
      "চূড়ান্ত বিক্ৰীৰ সিদ্ধান্ত লোৱাৰ আগতে শেহতীয়া মণ্ডিৰ মূল্য পৰীক্ষা কৰক।",

    errorSearching:
      "ওচৰৰ মণ্ডিৰ তথ্য পোৱা নগ'ল। পুনৰ চেষ্টা কৰক।",

    tryAgain: "পুনৰ চেষ্টা কৰক",

    seasonNames: {
      Kharif: "খৰিফ",
      Rabi: "ৰবি",
      Zaid: "জায়েদ",
      Other: "অন্যান্য",
    },

    trendStable: "স্থিৰ",
    trendModerate: "মধ্যম",
    trendVariable: "পৰিৱৰ্তনশীল",
    trendCheck: "স্থানীয় মণ্ডিৰ মূল্য চাওক",

    unitQuintal: "প্ৰতি কুইণ্টল",
    unknownPrice: "বজাৰৰ মূল্য উপলব্ধ নহয়",
  },

  ur: {
    backTo: "واپس جائیں",
    season: "موسم",
    market: "بازار",
    landArea: "زمین کا رقبہ",

    loadingTitle: "بازار کی معلومات لوڈ ہو رہی ہیں...",
    loadingText:
      "براہ کرم انتظار کریں، ہم بازار کی معلومات تیار کر رہے ہیں۔",

    cropNotFound: "فصل نہیں ملی",
    backToCrops: "فصلوں پر واپس جائیں",

    currentMarket: "📊 موجودہ بازار کی معلومات",
    marketDescription:
      "آپ کی فصل کے لیے اندازاً معلومات۔ فروخت سے پہلے مقامی منڈی کا تازہ ترین ریٹ ضرور چیک کریں۔",

    cropLabel: "فصل",
    indicativePrice: "متوقع قیمت",
    marketTrend: "بازار کا رجحان",

    sellingAdvice: "💡 فروخت کا مشورہ",

    nearbyMarket: "📍 قریبی منڈی اور بازار",
    nearbyMarketDescription:
      "آپ کی پروفائل میں محفوظ جگہ کے قریب زرعی منڈیوں کو تلاش کریں۔",

    profileLocation: "پروفائل کا مقام",
    searchingMandis: "قریبی منڈیاں تلاش کی جا رہی ہیں...",
    searchMandis: "قریبی منڈی تلاش کریں →",

    distance: "فاصلہ",
    mandiRate: "منڈی ریٹ",
    transportCost: "تخمینی نقل و حمل",
    estimatedNetRate: "تخمینی خالص ریٹ",
    perQuintal: "فی کوئنٹل",

    kilometers: "کلومیٹر",
    estimated: "تخمینی",

    noMandis:
      "آپ کی محفوظ پروفائل لوکیشن کے قریب کوئی زرعی منڈی نہیں ملی۔",

    locationMissing: "پروفائل لوکیشن نہیں ملی",
    locationMissingDescription:
      "براہ کرم پہلے اپنی پروفائل میں گاؤں، شہر، ضلع اور ریاست شامل کریں۔",

    locationFromProfile:
      "پروفائل میں محفوظ مقام استعمال کیا جا رہا ہے",

    village: "گاؤں",
    city: "شہر / قصبہ",
    district: "ضلع",
    state: "ریاست",
    pincode: "پن کوڈ",

    importantBeforeSelling: "⚠️ فروخت سے پہلے اہم باتیں",

    tip1:
      "جہاں ممکن ہو ایک سے زیادہ قریبی منڈیوں کے ریٹس کا موازنہ کریں۔",

    tip2:
      "فصل کا معیار، نمی اور گریڈنگ حتمی قیمت کو متاثر کر سکتے ہیں۔",

    tip3:
      "تھوڑی زیادہ قیمت والی منڈی منتخب کرنے سے پہلے نقل و حمل کے اخراجات کو مدنظر رکھیں۔",

    tip4:
      "حتمی فروخت کا فیصلہ کرنے سے پہلے تازہ ترین منڈی ریٹ ضرور چیک کریں۔",

    errorSearching:
      "قریبی منڈی کی معلومات حاصل نہیں ہو سکی۔ دوبارہ کوشش کریں۔",

    tryAgain: "دوبارہ کوشش کریں",

    seasonNames: {
      Kharif: "خریف",
      Rabi: "ربیع",
      Zaid: "زید",
      Other: "دیگر",
    },

    trendStable: "مستحکم",
    trendModerate: "درمیانہ",
    trendVariable: "متغیر",
    trendCheck: "مقامی منڈی کا ریٹ دیکھیں",

    unitQuintal: "فی کوئنٹل",
    unknownPrice: "بازار کا ریٹ دستیاب نہیں",
  },
};

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function normalize(value: unknown): string {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function safeNumber(value: unknown): number | undefined {
  const n = Number(value);

  if (Number.isFinite(n)) {
    return n;
  }

  return undefined;
}

function getProfileLocation(): ProfileLocation | null {
  const possibleKeys = [
    "farmerProfile",
    "profile",
    "farmer",
    "userProfile",
    "user",
    "profileData",
  ];

  for (const key of possibleKeys) {
    const raw = localStorage.getItem(key);

    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw);

      if (!parsed || typeof parsed !== "object") {
        continue;
      }

      const obj = parsed as Record<string, unknown>;

      const nested =
        obj.location && typeof obj.location === "object"
          ? (obj.location as Record<string, unknown>)
          : {};

      const result: ProfileLocation = {
        village: String(
          nested.village ||
            nested.villageName ||
            obj.village ||
            obj.villageName ||
            ""
        ),

        city: String(
          nested.city ||
            nested.cityName ||
            obj.city ||
            obj.cityName ||
            ""
        ),

        town: String(
          nested.town ||
            nested.townName ||
            obj.town ||
            obj.townName ||
            ""
        ),

        district: String(
          nested.district ||
            nested.districtName ||
            obj.district ||
            obj.districtName ||
            ""
        ),

        state: String(
          nested.state ||
            nested.stateName ||
            obj.state ||
            obj.stateName ||
            ""
        ),

        pincode: String(
          nested.pincode ||
            nested.pinCode ||
            nested.postalCode ||
            obj.pincode ||
            obj.pinCode ||
            obj.postalCode ||
            ""
        ),

        address: String(
          nested.address ||
            obj.address ||
            ""
        ),

        latitude:
          safeNumber(
            nested.latitude ||
              nested.lat ||
              obj.latitude ||
              obj.lat
          ),

        longitude:
          safeNumber(
            nested.longitude ||
              nested.lng ||
              nested.lon ||
              obj.longitude ||
              obj.lng ||
              obj.lon
          ),
      };

      const hasLocation =
        result.village ||
        result.city ||
        result.town ||
        result.district ||
        result.state ||
        result.pincode ||
        result.address ||
        (result.latitude !== undefined &&
          result.longitude !== undefined);

      if (hasLocation) {
        return result;
      }
    } catch {
      continue;
    }
  }

  return null;
}

function buildLocationText(location: ProfileLocation): string {
  return [
    location.village,
    location.city || location.town,
    location.district,
    location.state,
    location.pincode,
    location.address,
  ]
    .filter(Boolean)
    .join(", ");
}

/* =========================================================
   GEOCODING
========================================================= */

async function geocodeProfile(
  location: ProfileLocation
): Promise<{ latitude: number; longitude: number } | null> {
  if (
    location.latitude !== undefined &&
    location.longitude !== undefined
  ) {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  const query = buildLocationText(location);

  if (!query) {
    return null;
  }

  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: query,
        format: "json",
        limit: "1",
        countrycodes: "in",
      }).toString();

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const first = data[0];

    const latitude = Number(first.lat);
    const longitude = Number(first.lon);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return null;
    }

    return {
      latitude,
      longitude,
    };
  } catch {
    return null;
  }
}

/* =========================================================
   DISTANCE
========================================================= */

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

/* =========================================================
   TRANSPORT ESTIMATION
========================================================= */

function calculateTransport(distance: number): number {
  /*
    Simple indicative calculation.

    ₹12/km is used as a basic estimated transportation
    amount for a small farmer vehicle/trip.

    This is NOT an official transport quotation.
  */

  const baseCost = 80;
  const perKm = 12;

  return Math.round(baseCost + distance * perKm);
}

/* =========================================================
   CROP MARKET INFORMATION
========================================================= */

function getMarketInfo(
  cropName: string,
  language: string,
  t: Translation
): MarketInfo {
  const name = normalize(cropName);

  if (
    name.includes("wheat") ||
    name.includes("गेह") ||
    name.includes("गहू") ||
    name.includes("গম") ||
    name.includes("கோதுமை") ||
    name.includes("గోధుమ") ||
    name.includes("ઘઉં") ||
    name.includes("ಗೋಧಿ") ||
    name.includes("ഗോതമ്പ്") ||
    name.includes("ਗੇਹੂੰ") ||
    name.includes("গেহু")
  ) {
    return {
      crop: cropName,
      minPrice: 2400,
      maxPrice: 2600,
      modalPrice: 2500,
      price: "₹2,400 – ₹2,600",
      unit: t.unitQuintal,
      trend: t.trendStable,

      advice:
        language === "hi"
          ? "बेचने से पहले आसपास की मंडियों के भाव की तुलना करें। यदि स्थानीय भाव असामान्य रूप से कम है तो तुरंत बेचने से बचें।"
          : language === "mr"
          ? "विक्रीपूर्वी जवळच्या बाजारपेठांमधील दरांची तुलना करा. स्थानिक दर खूप कमी असल्यास लगेच विक्री करणे टाळा."
          : language === "bn"
          ? "বিক্রির আগে কাছাকাছি মণ্ডির দাম তুলনা করুন। স্থানীয় দাম অস্বাভাবিকভাবে কম হলে সঙ্গে সঙ্গে বিক্রি করা এড়িয়ে চলুন।"
          : language === "ta"
          ? "விற்பனைக்கு முன் அருகிலுள்ள சந்தைகளின் விலைகளை ஒப்பிடுங்கள். உள்ளூர் விலை மிகவும் குறைவாக இருந்தால் உடனடியாக விற்பதைத் தவிர்க்கவும்."
          : language === "te"
          ? "అమ్మకానికి ముందు సమీప మార్కెట్ల ధరలను పోల్చండి. స్థానిక ధర అసాధారణంగా తక్కువగా ఉంటే వెంటనే అమ్మకండి."
          : language === "gu"
          ? "વેચાણ પહેલાં નજીકની મંડીઓના ભાવની તુલના કરો. સ્થાનિક ભાવ અસામાન્ય રીતે ઓછો હોય તો તરત વેચવાનું ટાળો."
          : language === "kn"
          ? "ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳ ದರಗಳನ್ನು ಹೋಲಿಸಿ. ಸ್ಥಳೀಯ ದರ ಅಸಾಮಾನ್ಯವಾಗಿ ಕಡಿಮೆಯಿದ್ದರೆ ತಕ್ಷಣ ಮಾರಾಟ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ."
          : language === "ml"
          ? "വിൽപ്പനയ്ക്ക് മുമ്പ് സമീപത്തെ വിപണികളിലെ വില താരതമ്യം ചെയ്യുക. പ്രാദേശിക വില വളരെ കുറവാണെങ്കിൽ ഉടൻ വിൽക്കുന്നത് ഒഴിവാക്കുക."
          : language === "pa"
          ? "ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰੋ। ਜੇ ਸਥਾਨਕ ਭਾਅ ਬਹੁਤ ਘੱਟ ਹੈ ਤਾਂ ਤੁਰੰਤ ਵੇਚਣ ਤੋਂ ਬਚੋ।"
          : language === "or"
          ? "ବିକ୍ରି ପୂର୍ବରୁ ନିକଟସ୍ଥ ମଣ୍ଡିର ଦର ତୁଳନା କରନ୍ତୁ। ସ୍ଥାନୀୟ ଦର ବହୁତ କମ୍ ଥିଲେ ତୁରନ୍ତ ବିକ୍ରି କରିବାରୁ ଦୂରେଇ ରୁହନ୍ତୁ।"
          : language === "as"
          ? "বিক্ৰী কৰাৰ আগতে ওচৰৰ মণ্ডিৰ মূল্য তুলনা কৰক। স্থানীয় মূল্য অস্বাভাৱিকভাৱে কম হ'লে তৎক্ষণাত বিক্ৰী নকৰিব।"
          : language === "ur"
          ? "فروخت سے پہلے قریبی منڈیوں کے ریٹس کا موازنہ کریں۔ اگر مقامی ریٹ غیر معمولی طور پر کم ہو تو فوراً فروخت کرنے سے گریز کریں۔"
          : "Compare prices from nearby mandis before selling. Avoid selling immediately if the local price is unusually low.",
    };
  }

  if (
    name.includes("rice") ||
    name.includes("paddy") ||
    name.includes("धान") ||
    name.includes("चावल") ||
    name.includes("तांदूळ") ||
    name.includes("ধান") ||
    name.includes("அரிசி") ||
    name.includes("వరి") ||
    name.includes("ચોખા") ||
    name.includes("ಅಕ್ಕಿ") ||
    name.includes("നെല്ല്") ||
    name.includes("ਝੋਨਾ")
  ) {
    return {
      crop: cropName,
      minPrice: 2200,
      maxPrice: 2500,
      modalPrice: 2350,
      price: "₹2,200 – ₹2,500",
      unit: t.unitQuintal,
      trend: t.trendModerate,
      advice:
        language === "hi"
          ? "धान की गुणवत्ता की आवश्यकताओं को जाँचें और फसल मंडी ले जाने से पहले मंडी के भाव की तुलना करें।"
          : "Check crop quality requirements and compare local mandi rates before taking your crop to market.",
    };
  }

  if (
    name.includes("maize") ||
    name.includes("corn") ||
    name.includes("मक्का") ||
    name.includes("मका") ||
    name.includes("ভুট্টা") ||
    name.includes("மக்காச்சோளம்") ||
    name.includes("మొక్కజొన్న") ||
    name.includes("મકાઈ") ||
    name.includes("ಮೆಕ್ಕೆಜೋಳ") ||
    name.includes("ചോളം") ||
    name.includes("ਮੱਕੀ")
  ) {
    return {
      crop: cropName,
      minPrice: 2000,
      maxPrice: 2400,
      modalPrice: 2200,
      price: "₹2,000 – ₹2,400",
      unit: t.unitQuintal,
      trend: t.trendStable,
      advice:
        language === "hi"
          ? "बेचने से पहले नमी और दाने की गुणवत्ता जाँचें, क्योंकि गुणवत्ता अंतिम कीमत को प्रभावित कर सकती है।"
          : "Check moisture and grain quality before selling because quality can affect the final price.",
    };
  }

  if (
    name.includes("potato") ||
    name.includes("aloo") ||
    name.includes("आलू") ||
    name.includes("बटाटा") ||
    name.includes("আলু") ||
    name.includes("உருளைக்கிழங்கு") ||
    name.includes("బంగాళాదుంప") ||
    name.includes("બટાકા") ||
    name.includes("ಆಲೂಗಡ್ಡೆ") ||
    name.includes("ഉരുളക്കിഴങ്ങ്") ||
    name.includes("ਆਲੂ")
  ) {
    return {
      crop: cropName,
      minPrice: 1200,
      maxPrice: 1800,
      modalPrice: 1500,
      price: "₹1,200 – ₹1,800",
      unit: t.unitQuintal,
      trend: t.trendVariable,
      advice:
        language === "hi"
          ? "आलू के भाव जल्दी बदल सकते हैं। बेचने से पहले स्थानीय भाव और भंडारण के विकल्प देखें।"
          : "Potato prices can change quickly. Compare local rates and storage options before selling.",
    };
  }

  if (
    name.includes("sugarcane") ||
    name.includes("ganna") ||
    name.includes("गन्ना") ||
    name.includes("ऊस") ||
    name.includes("আখ") ||
    name.includes("கரும்பு") ||
    name.includes("చెరకు") ||
    name.includes("શેરડી") ||
    name.includes("ಕಬ್ಬು") ||
    name.includes("കരിമ്പ്") ||
    name.includes("ਗੰਨਾ")
  ) {
    return {
      crop: cropName,
      minPrice: 350,
      maxPrice: 400,
      modalPrice: 375,
      price: "₹350 – ₹400",
      unit: t.unitQuintal,
      trend: t.trendStable,
      advice:
        language === "hi"
          ? "गन्ना ले जाने से पहले नवीनतम मिल खरीद दर और कटाई का समय जरूर जाँचें।"
          : "Check the latest mill procurement rate and harvesting schedule before transporting sugarcane.",
    };
  }

  return {
    crop: cropName,
    minPrice: 0,
    maxPrice: 0,
    modalPrice: 0,
    price: t.unknownPrice,
    unit: "",
    trend: t.trendCheck,

    advice:
      language === "hi"
        ? "इस फसल का नवीनतम भाव जानने के लिए अपनी नज़दीकी मंडी या कृषि बाजार से संपर्क करें।"
        : language === "mr"
        ? "या पिकाचा नवीनतम भाव जाणून घेण्यासाठी जवळच्या बाजारपेठेशी संपर्क करा."
        : language === "bn"
        ? "এই ফসলের সর্বশেষ দাম জানতে আপনার নিকটস্থ মণ্ডি বা কৃষি বাজারে যোগাযোগ করুন।"
        : language === "ta"
        ? "இந்த பயிரின் சமீபத்திய விலையை அறிய அருகிலுள்ள சந்தையைத் தொடர்பு கொள்ளுங்கள்."
        : language === "te"
        ? "ఈ పంట తాజా ధరను తెలుసుకోవడానికి సమీపంలోని మార్కెట్‌ను సంప్రదించండి."
        : language === "gu"
        ? "આ પાકનો નવીનતમ ભાવ જાણવા માટે તમારી નજીકની મંડી અથવા કૃષિ બજારનો સંપર્ક કરો."
        : language === "kn"
        ? "ಈ ಬೆಳೆಯ ಇತ್ತೀಚಿನ ದರವನ್ನು ತಿಳಿಯಲು ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ."
        : language === "ml"
        ? "ഈ വിളയുടെ ഏറ്റവും പുതിയ വില അറിയാൻ സമീപത്തെ വിപണിയുമായി ബന്ധപ്പെടുക."
        : language === "pa"
        ? "ਇਸ ਫਸਲ ਦਾ ਨਵਾਂ ਭਾਅ ਜਾਣਨ ਲਈ ਆਪਣੀ ਨੇੜਲੀ ਮੰਡੀ ਜਾਂ ਖੇਤੀਬਾੜੀ ਬਾਜ਼ਾਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।"
        : language === "or"
        ? "ଏହି ଫସଲର ନୂତନ ଦର ଜାଣିବା ପାଇଁ ନିକଟସ୍ଥ ମଣ୍ଡି କିମ୍ବା କୃଷି ବଜାର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।"
        : language === "as"
        ? "এই শস্যৰ শেহতীয়া মূল্য জানিবলৈ আপোনাৰ ওচৰৰ মণ্ডি বা কৃষি বজাৰৰ সৈতে যোগাযোগ কৰক।"
        : language === "ur"
        ? "اس فصل کا تازہ ترین ریٹ جاننے کے لیے اپنی قریبی منڈی یا زرعی بازار سے رابطہ کریں۔"
        : "Check your nearest mandi or agriculture market for the latest price of this crop.",
  };
}

/* =========================================================
   SEARCH NEARBY MARKETS USING OPENSTREETMAP OVERPASS
========================================================= */

async function searchNearbyMandis(
  latitude: number,
  longitude: number,
  marketInfo: MarketInfo
): Promise<Mandi[]> {
  const radius = 100000;

  const query = `
    [out:json][timeout:25];

    (
      node["amenity"="marketplace"](around:${radius},${latitude},${longitude});
      way["amenity"="marketplace"](around:${radius},${latitude},${longitude});
      relation["amenity"="marketplace"](around:${radius},${latitude},${longitude});

      node["shop"="agrarian"](around:${radius},${latitude},${longitude});
      way["shop"="agrarian"](around:${radius},${latitude},${longitude});

      node["name"~"mandi|Mandi|APMC|market|Market|बाजार|मंडी",i](around:${radius},${latitude},${longitude});
    );

    out center tags;
  `;

  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: query,
    }
  );

  if (!response.ok) {
    throw new Error("Mandi search failed");
  }

  const data = await response.json();

  if (!data?.elements || !Array.isArray(data.elements)) {
    return [];
  }

  const results: Mandi[] = [];

  for (const item of data.elements) {
    const lat =
      Number(item.lat) ||
      Number(item.center?.lat);

    const lon =
      Number(item.lon) ||
      Number(item.center?.lon);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lon)
    ) {
      continue;
    }

    const tags = item.tags || {};

    const name =
      tags.name ||
      tags["name:en"] ||
      tags["name:hi"] ||
      "Agricultural Market";

    const distance = calculateDistance(
      latitude,
      longitude,
      lat,
      lon
    );

    if (distance > 100) {
      continue;
    }

    const transportCost =
      calculateTransport(distance);

    const cropPrice =
      marketInfo.modalPrice;

    const netPrice =
      cropPrice > 0
        ? Math.max(cropPrice - transportCost, 0)
        : 0;

    results.push({
      id: String(
        item.id || `${lat}-${lon}-${name}`
      ),

      name,

      type:
        tags.amenity === "marketplace"
          ? "Agricultural Market"
          : "Mandi / Market",

      latitude: lat,
      longitude: lon,

      distance,

      cropPrice,

      transportCost,

      netPrice,

      location:
        tags["addr:city"] ||
        tags["addr:district"] ||
        tags["addr:state"] ||
        tags["addr:place"] ||
        "",
    });
  }

  const unique = new Map<string, Mandi>();

  for (const mandi of results) {
    const key =
      `${mandi.name.toLowerCase()}-${mandi.latitude.toFixed(3)}-${mandi.longitude.toFixed(3)}`;

    if (!unique.has(key)) {
      unique.set(key, mandi);
    }
  }

  return Array.from(unique.values())
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 15);
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] = useState("en");

  const [crop, setCrop] =
    useState<Crop | null>(null);

  const [profileLocation, setProfileLocation] =
    useState<ProfileLocation | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [searchingMandis, setSearchingMandis] =
    useState(false);

  const [mandis, setMandis] =
    useState<Mandi[]>([]);

  const [searchError, setSearchError] =
    useState(false);

  /* =====================================================
     LOAD DATA
  ===================================================== */

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("selectedLanguage");

    if (
      savedLanguage &&
      translations[savedLanguage]
    ) {
      setLanguage(savedLanguage);
    }

    const savedCrops =
      localStorage.getItem("farmerCrops");

    if (savedCrops) {
      try {
        const crops: Crop[] =
          JSON.parse(savedCrops);

        const selectedCrop =
          crops.find(
            (item) =>
              item.id === Number(params.id)
          );

        if (selectedCrop) {
          setCrop(selectedCrop);
        }
      } catch {
        setCrop(null);
      }
    }

    const location =
      getProfileLocation();

    setProfileLocation(location);

    setLoading(false);
  }, [params.id]);

  /* =====================================================
     TRANSLATION
  ===================================================== */

  const t =
    translations[language] ||
    translations.en;

  /* =====================================================
     MARKET
  ===================================================== */

  const market = useMemo(() => {
    if (!crop) return null;

    return getMarketInfo(
      crop.crop,
      language,
      t
    );
  }, [crop, language, t]);

  /* =====================================================
     SEASON
  ===================================================== */

  const getSeasonName = (
    season: string
  ) => {
    if (season === "Kharif")
      return t.seasonNames.Kharif;

    if (season === "Rabi")
      return t.seasonNames.Rabi;

    if (season === "Zaid")
      return t.seasonNames.Zaid;

    if (season === "Other")
      return t.seasonNames.Other;

    return season;
  };

  /* =====================================================
     FIND MANDIS
  ===================================================== */

  const findNearbyMandis = async () => {
    if (!profileLocation || !market) {
      return;
    }

    setSearchingMandis(true);
    setSearchError(false);
    setMandis([]);

    try {
      const coordinates =
        await geocodeProfile(
          profileLocation
        );

      if (!coordinates) {
        setSearchError(true);
        setSearchingMandis(false);
        return;
      }

      const results =
        await searchNearbyMandis(
          coordinates.latitude,
          coordinates.longitude,
          market
        );

      setMandis(results);
    } catch (error) {
      console.error(
        "Mandi search error:",
        error
      );

      setSearchError(true);
    } finally {
      setSearchingMandis(false);
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={
          language === "ur"
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

          <p className="text-gray-500 mt-2">
            {t.loadingText}
          </p>
        </div>
      </main>
    );
  }

  /* =====================================================
     CROP NOT FOUND
  ===================================================== */

  if (!crop || !market) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={
          language === "ur"
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
              router.push("/crops")
            }
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
          >
            ← {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  const landUnit =
    crop.landUnit || "acres";

  const locationText =
    profileLocation
      ? buildLocationText(
          profileLocation
        )
      : "";

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main
      className="min-h-screen bg-green-50 px-4 sm:px-5 py-8 sm:py-10"
      dir={
        language === "ur"
          ? "rtl"
          : "ltr"
      }
    >
      <div className="max-w-5xl mx-auto">

        {/* =============================================
            BACK
        ============================================= */}

        <button
          onClick={() =>
            router.push(
              `/crops/${crop.id}`
            )
          }
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.backTo} {crop.crop}
        </button>

        {/* =============================================
            HEADER
        ============================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">
              🏪
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {getSeasonName(
                  crop.season
                )}{" "}
                {t.season}
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop} {t.market}
              </h1>

              <p className="text-gray-600 mt-2">
                {t.landArea}:{" "}
                <span className="font-semibold">
                  {crop.land}{" "}
                  {landUnit}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* =============================================
            CURRENT MARKET
        ============================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.currentMarket}
          </h2>

          <p className="text-gray-600 mt-2">
            {t.marketDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

            {/* CROP */}

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                🌾
              </div>

              <p className="text-sm text-gray-500">
                {t.cropLabel}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.crop}
              </p>
            </div>

            {/* PRICE */}

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                💰
              </div>

              <p className="text-sm text-gray-500">
                {t.indicativePrice}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.price}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {market.unit}
              </p>
            </div>

            {/* TREND */}

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                📈
              </div>

              <p className="text-sm text-gray-500">
                {t.marketTrend}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.trend}
              </p>
            </div>

          </div>
        </div>

        {/* =============================================
            SELLING ADVICE
        ============================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.sellingAdvice}
          </h2>

          <div className="bg-green-50 rounded-2xl p-6 mt-5">
            <p className="text-gray-700 leading-relaxed">
              {market.advice}
            </p>
          </div>

        </div>

        {/* =============================================
            NEARBY MANDI
        ============================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.nearbyMarket}
          </h2>

          <p className="text-gray-600 mt-2">
            {t.nearbyMarketDescription}
          </p>

          {/* PROFILE LOCATION */}

          <div className="mt-5 bg-green-50 border border-green-100 rounded-2xl p-5">

            <div className="flex items-start gap-4">

              <div className="text-3xl">
                📍
              </div>

              <div className="min-w-0">

                <p className="text-sm font-semibold text-green-700">
                  {t.profileLocation}
                </p>

                {profileLocation ? (
                  <>
                    <p className="font-bold text-green-900 mt-1 break-words">
                      {locationText ||
                        "Saved profile location"}
                    </p>

                    <p className="text-xs text-green-700 mt-2">
                      ✓{" "}
                      {t.locationFromProfile}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-red-700 mt-1">
                      {t.locationMissing}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {
                        t.locationMissingDescription
                      }
                    </p>
                  </>
                )}

              </div>
            </div>

            {/* LOCATION DETAILS */}

            {profileLocation && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

                {profileLocation.village && (
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">
                      {t.village}
                    </p>

                    <p className="font-semibold text-gray-800">
                      {
                        profileLocation.village
                      }
                    </p>
                  </div>
                )}

                {(profileLocation.city ||
                  profileLocation.town) && (
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">
                      {t.city}
                    </p>

                    <p className="font-semibold text-gray-800">
                      {profileLocation.city ||
                        profileLocation.town}
                    </p>
                  </div>
                )}

                {profileLocation.district && (
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">
                      {t.district}
                    </p>

                    <p className="font-semibold text-gray-800">
                      {
                        profileLocation.district
                      }
                    </p>
                  </div>
                )}

                {profileLocation.state && (
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">
                      {t.state}
                    </p>

                    <p className="font-semibold text-gray-800">
                      {profileLocation.state}
                    </p>
                  </div>
                )}

                {profileLocation.pincode && (
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">
                      {t.pincode}
                    </p>

                    <p className="font-semibold text-gray-800">
                      {profileLocation.pincode}
                    </p>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* SEARCH BUTTON */}

          <button
            disabled={
              !profileLocation ||
              searchingMandis
            }
            onClick={findNearbyMandis}
            className={`mt-6 px-6 py-3 rounded-xl font-bold transition ${
              !profileLocation ||
              searchingMandis
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
          >
            {searchingMandis
              ? `⏳ ${t.searchingMandis}`
              : `📍 ${t.searchMandis}`}
          </button>

          {/* ==========================================
              ERROR
          ========================================== */}

          {searchError && (
            <div className="mt-5 bg-red-50 border border-red-200 rounded-2xl p-5">

              <p className="text-red-800 font-semibold">
                ⚠️ {t.errorSearching}
              </p>

              <button
                onClick={findNearbyMandis}
                className="mt-3 px-4 py-2 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800"
              >
                {t.tryAgain}
              </button>

            </div>
          )}

          {/* ==========================================
              MANDI RESULTS
          ========================================== */}

          {mandis.length > 0 && (
            <div className="mt-7 space-y-5">

              {mandis.map((mandi) => (
                <div
                  key={mandi.id}
                  className="border border-green-100 rounded-2xl p-5 hover:shadow-md transition bg-white"
                >

                  {/* NAME */}

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

                    <div>
                      <div className="flex items-start gap-3">

                        <div className="text-3xl">
                          🏪
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-green-800">
                            {mandi.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {mandi.type}
                          </p>

                          {mandi.location && (
                            <p className="text-sm text-gray-500 mt-1">
                              📍 {mandi.location}
                            </p>
                          )}
                        </div>

                      </div>
                    </div>

                    {/* DISTANCE */}

                    <div className="bg-green-50 rounded-xl px-4 py-3 text-center min-w-[110px]">

                      <p className="text-xs text-gray-500">
                        {t.distance}
                      </p>

                      <p className="text-xl font-bold text-green-800">
                        {mandi.distance.toFixed(
                          1
                        )}{" "}
                        {t.kilometers}
                      </p>

                    </div>

                  </div>

                  {/* MARKET DATA */}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                    {/* RATE */}

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        💰 {t.mandiRate}
                      </p>

                      {mandi.cropPrice > 0 ? (
                        <p className="text-lg font-bold text-green-800 mt-1">
                          ₹
                          {mandi.cropPrice.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-gray-500 mt-1">
                          {t.unknownPrice}
                        </p>
                      )}

                      {mandi.cropPrice >
                        0 && (
                        <p className="text-xs text-gray-500">
                          {t.perQuintal}
                        </p>
                      )}

                    </div>

                    {/* TRANSPORT */}

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        🚚 {t.transportCost}
                      </p>

                      <p className="text-lg font-bold text-orange-700 mt-1">
                        ₹
                        {mandi.transportCost.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <p className="text-xs text-gray-500">
                        {t.estimated}
                      </p>

                    </div>

                    {/* NET */}

                    <div className="bg-green-50 rounded-xl p-4">

                      <p className="text-xs text-gray-600">
                        💰{" "}
                        {t.estimatedNetRate}
                      </p>

                      {mandi.netPrice >
                      0 ? (
                        <>
                          <p className="text-lg font-bold text-green-900 mt-1">
                            ₹
                            {mandi.netPrice.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <p className="text-xs text-gray-600">
                            {t.perQuintal}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-semibold text-gray-600 mt-1">
                          {t.unknownPrice}
                        </p>
                      )}

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

          {/* ==========================================
              NO RESULTS
          ========================================== */}

          {!searchingMandis &&
            !searchError &&
            mandis.length === 0 &&
            profileLocation && (
              <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

                <p className="text-yellow-900 font-semibold">
                  ⚠️ {t.noMandis}
                </p>

                <p className="text-sm text-yellow-800 mt-2">
                  ℹ️ Mandi data may vary depending on
                  available map and market records.
                  Transport is only an estimate and may
                  vary by vehicle, quantity, road condition
                  and actual route.
                </p>

              </div>
            )}

        </div>

        {/* =============================================
            IMPORTANT TIPS
        ============================================= */}

        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 sm:p-7">

          <h2 className="text-2xl font-bold text-yellow-800">
            {t.importantBeforeSelling}
          </h2>

          <div className="space-y-4 mt-5">

            <div className="flex gap-4">
              <div className="text-2xl">
                📊
              </div>

              <p className="text-yellow-900">
                {t.tip1}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">
                🌾
              </div>

              <p className="text-yellow-900">
                {t.tip2}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">
                🚚
              </div>

              <p className="text-yellow-900">
                {t.tip3}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">
                💰
              </div>

              <p className="text-yellow-900">
                {t.tip4}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}