"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

  // In case your profile uses different field names
  villageName?: string;
  cityName?: string;
  districtName?: string;
  stateName?: string;
  pinCode?: string;
};

type Mandi = {
  id: string;
  name: string;
  district: string;
  state: string;
  distance: string;
  rate: string;
  rateNumber: number;
  transport: number;
  effectiveRate: number;
  marketType: string;
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
  usingProfileLocation: string;

  village: string;
  district: string;
  state: string;
  pincode: string;

  findMandi: string;
  searchingMandi: string;
  tryAgain: string;

  mandiFound: string;
  mandiRate: string;
  distance: string;
  transportation: string;
  effectiveRate: string;
  perQuintal: string;

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
      "Find agricultural markets using your saved profile location. No minimum distance limit is applied.",

    profileLocation: "Profile Location",
    usingProfileLocation: "Using location saved in your profile",

    village: "Village",
    district: "District",
    state: "State",
    pincode: "Pincode",

    findMandi: "📍 Find Nearby Mandi",
    searchingMandi: "🔎 Searching mandis...",
    tryAgain: "Try Again",

    mandiFound: "mandis found",
    mandiRate: "Mandi Rate",
    distance: "Distance",
    transportation: "Estimated Transport",
    effectiveRate: "Effective Rate",
    perQuintal: "per quintal",

    marketType: "Market Type",
    apmc: "APMC Mandi",
    localMarket: "Local Market",

    noMandi:
      "No mandi data was found for this location. Showing available state-level markets instead.",
    apiFailed:
      "Live mandi search is unavailable right now. Showing available market information.",
    indicativeNotice:
      "Mandi rates are indicative. Transport cost is estimated and may vary according to vehicle, quantity, road condition and actual distance.",

    importantBeforeSelling: "⚠️ Important Before Selling",
    tip1: "Compare prices from more than one nearby mandi whenever possible.",
    tip2: "Crop quality, moisture and grading can affect the final selling price.",
    tip3:
      "Consider transportation cost before choosing a mandi with a slightly higher price.",
    tip4:
      "Verify the latest mandi rate before making a final selling decision.",

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
      "आपकी प्रोफाइल में सेव की गई जगह के आधार पर कृषि मंडियाँ खोजें। किसी न्यूनतम दूरी की सीमा नहीं है।",

    profileLocation: "प्रोफाइल लोकेशन",
    usingProfileLocation: "प्रोफाइल में सेव की गई लोकेशन का उपयोग हो रहा है",

    village: "गाँव",
    district: "जिला",
    state: "राज्य",
    pincode: "पिनकोड",

    findMandi: "📍 नज़दीकी मंडी खोजें",
    searchingMandi: "🔎 मंडियाँ खोजी जा रही हैं...",
    tryAgain: "फिर से कोशिश करें",

    mandiFound: "मंडियाँ मिलीं",
    mandiRate: "मंडी भाव",
    distance: "दूरी",
    transportation: "अनुमानित परिवहन",
    effectiveRate: "परिवहन के बाद भाव",
    perQuintal: "प्रति क्विंटल",

    marketType: "बाज़ार का प्रकार",
    apmc: "APMC मंडी",
    localMarket: "स्थानीय बाज़ार",

    noMandi:
      "इस लोकेशन के लिए सीधे मंडी डेटा नहीं मिला। उपलब्ध राज्य स्तर की मंडियाँ दिखाई जा रही हैं।",
    apiFailed:
      "अभी लाइव मंडी खोज उपलब्ध नहीं है। उपलब्ध बाज़ार जानकारी दिखाई जा रही है।",
    indicativeNotice:
      "मंडी भाव अनुमानित हैं। परिवहन खर्च वाहन, मात्रा, सड़क और वास्तविक दूरी के अनुसार बदल सकता है।",

    importantBeforeSelling: "⚠️ बेचने से पहले जरूरी बातें",
    tip1: "जहाँ संभव हो, एक से अधिक नज़दीकी मंडियों के भाव की तुलना करें।",
    tip2:
      "फसल की गुणवत्ता, नमी और ग्रेडिंग से अंतिम बिक्री कीमत प्रभावित हो सकती है।",
    tip3:
      "थोड़ा अधिक भाव वाली मंडी चुनने से पहले परिवहन का खर्च भी ध्यान में रखें।",
    tip4:
      "फसल बेचने का अंतिम निर्णय लेने से पहले नवीनतम मंडी भाव जरूर जाँचें।",

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
      "तुमच्या प्रोफाइलमध्ये सेव केलेल्या ठिकाणावरून बाजारपेठा शोधा. किमान अंतराची कोणतीही मर्यादा नाही.",
    profileLocation: "प्रोफाइल लोकेशन",
    usingProfileLocation: "प्रोफाइलमध्ये सेव केलेले स्थान वापरले जात आहे",
    village: "गाव",
    district: "जिल्हा",
    state: "राज्य",
    pincode: "पिनकोड",
    findMandi: "📍 जवळची बाजारपेठ शोधा",
    searchingMandi: "🔎 बाजारपेठा शोधत आहे...",
    tryAgain: "पुन्हा प्रयत्न करा",
    mandiFound: "बाजारपेठा सापडल्या",
    mandiRate: "बाजार दर",
    distance: "अंतर",
    transportation: "अंदाजे वाहतूक",
    effectiveRate: "वाहतूक खर्चानंतरचा दर",
    perQuintal: "प्रति क्विंटल",
    marketType: "बाजाराचा प्रकार",
    apmc: "APMC बाजार",
    localMarket: "स्थानिक बाजार",
    noMandi:
      "या ठिकाणासाठी थेट बाजार डेटा मिळाला नाही. उपलब्ध राज्यस्तरीय बाजारपेठा दाखवल्या जात आहेत.",
    apiFailed:
      "सध्या थेट बाजार शोध उपलब्ध नाही. उपलब्ध बाजार माहिती दाखवली जात आहे.",
    indicativeNotice:
      "बाजार दर अंदाजे आहेत. वाहतूक खर्च वाहन, प्रमाण, रस्ता आणि प्रत्यक्ष अंतरानुसार बदलू शकतो.",
    importantBeforeSelling: "⚠️ विक्रीपूर्वी महत्त्वाच्या गोष्टी",
    tip1: "शक्य असल्यास एकापेक्षा जास्त जवळच्या बाजारपेठांमधील दरांची तुलना करा.",
    tip2: "पिकाची गुणवत्ता, ओलावा आणि दर्जा अंतिम किंमतीवर परिणाम करू शकतो.",
    tip3:
      "थोडा जास्त दर असलेली बाजारपेठ निवडण्यापूर्वी वाहतूक खर्चाचा विचार करा.",
    tip4: "विक्रीचा अंतिम निर्णय घेण्यापूर्वी नवीनतम बाजारभाव तपासा.",
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
      "আপনার প্রোফাইলে সংরক্ষিত অবস্থান ব্যবহার করে বাজার খুঁজুন। কোনো ন্যূনতম দূরত্বের সীমা নেই।",
    profileLocation: "প্রোফাইল লোকেশন",
    usingProfileLocation: "প্রোফাইলে সংরক্ষিত লোকেশন ব্যবহার করা হচ্ছে",
    village: "গ্রাম",
    district: "জেলা",
    state: "রাজ্য",
    pincode: "পিনকোড",
    findMandi: "📍 কাছাকাছি মণ্ডি খুঁজুন",
    searchingMandi: "🔎 মণ্ডি খোঁজা হচ্ছে...",
    tryAgain: "আবার চেষ্টা করুন",
    mandiFound: "টি মণ্ডি পাওয়া গেছে",
    mandiRate: "মণ্ডির দাম",
    distance: "দূরত্ব",
    transportation: "আনুমানিক পরিবহন",
    effectiveRate: "পরিবহন বাদে কার্যকর দাম",
    perQuintal: "প্রতি কুইন্টাল",
    marketType: "বাজারের ধরন",
    apmc: "APMC মণ্ডি",
    localMarket: "স্থানীয় বাজার",
    noMandi:
      "এই লোকেশনের জন্য সরাসরি মণ্ডি তথ্য পাওয়া যায়নি। রাজ্য স্তরের উপলব্ধ বাজার দেখানো হচ্ছে।",
    apiFailed:
      "এই মুহূর্তে লাইভ মণ্ডি অনুসন্ধান উপলব্ধ নয়। উপলব্ধ বাজার তথ্য দেখানো হচ্ছে।",
    indicativeNotice:
      "মণ্ডির দাম আনুমানিক। পরিবহন খরচ গাড়ি, পরিমাণ, রাস্তা এবং প্রকৃত দূরত্ব অনুযায়ী পরিবর্তিত হতে পারে।",
    importantBeforeSelling: "⚠️ বিক্রির আগে গুরুত্বপূর্ণ বিষয়",
    tip1: "সম্ভব হলে একাধিক কাছাকাছি মণ্ডির দাম তুলনা করুন।",
    tip2: "ফসলের গুণমান, আর্দ্রতা এবং গ্রেডিং চূড়ান্ত দামকে প্রভাবিত করতে পারে।",
    tip3: "সামান্য বেশি দামের মণ্ডি বেছে নেওয়ার আগে পরিবহন খরচ বিবেচনা করুন।",
    tip4: "চূড়ান্ত বিক্রির সিদ্ধান্তের আগে সর্বশেষ মণ্ডির দাম যাচাই করুন।",
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
      "உங்கள் சுயவிவரத்தில் சேமிக்கப்பட்ட இடத்தைப் பயன்படுத்தி சந்தைகளைக் கண்டறியவும். குறைந்தபட்ச தூர வரம்பு இல்லை.",
    profileLocation: "சுயவிவர இடம்",
    usingProfileLocation: "சுயவிவரத்தில் சேமிக்கப்பட்ட இடம் பயன்படுத்தப்படுகிறது",
    village: "கிராமம்",
    district: "மாவட்டம்",
    state: "மாநிலம்",
    pincode: "அஞ்சல் குறியீடு",
    findMandi: "📍 அருகிலுள்ள சந்தையைக் கண்டறியவும்",
    searchingMandi: "🔎 சந்தைகளைத் தேடுகிறது...",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",
    mandiFound: "சந்தைகள் கிடைத்தன",
    mandiRate: "சந்தை விலை",
    distance: "தூரம்",
    transportation: "மதிப்பிடப்பட்ட போக்குவரத்து",
    effectiveRate: "போக்குவரத்துக்குப் பிறகு விலை",
    perQuintal: "ஒரு குவிண்டாலுக்கு",
    marketType: "சந்தை வகை",
    apmc: "APMC சந்தை",
    localMarket: "உள்ளூர் சந்தை",
    noMandi:
      "இந்த இடத்திற்கான நேரடி சந்தை தரவு கிடைக்கவில்லை. கிடைக்கக்கூடிய மாநில அளவிலான சந்தைகள் காட்டப்படுகின்றன.",
    apiFailed:
      "தற்போது நேரடி சந்தை தேடல் கிடைக்கவில்லை. கிடைக்கக்கூடிய சந்தை தகவல் காட்டப்படுகிறது.",
    indicativeNotice:
      "சந்தை விலைகள் மதிப்பீடுகள். போக்குவரத்து செலவு வாகனம், அளவு, சாலை மற்றும் உண்மையான தூரத்தைப் பொறுத்து மாறலாம்.",
    importantBeforeSelling: "⚠️ விற்பனைக்கு முன் முக்கியமானவை",
    tip1: "முடிந்தால் ஒன்றுக்கும் மேற்பட்ட அருகிலுள்ள சந்தைகளின் விலைகளை ஒப்பிடுங்கள்.",
    tip2: "பயிரின் தரம், ஈரப்பதம் மற்றும் தரப்படுத்தல் இறுதி விலையை பாதிக்கலாம்.",
    tip3:
      "சற்று அதிக விலை உள்ள சந்தையைத் தேர்ந்தெடுப்பதற்கு முன் போக்குவரத்து செலவைக் கருத்தில் கொள்ளுங்கள்.",
    tip4: "விற்பனை முடிவை எடுப்பதற்கு முன் சமீபத்திய சந்தை விலையை சரிபார்க்கவும்.",
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
    unknownPrice: "சந்தை விலை கிடைக்கவில்லை",
  },

  te: {
    backTo: "తిరిగి వెళ్లండి",
    season: "సీజన్",
    market: "మార్కెట్",
    landArea: "భూమి విస్తీర్ణం",
    loadingTitle: "మార్కెట్ సమాచారం లోడ్ అవుతోంది...",
    loadingText: "దయచేసి వేచి ఉండండి, మార్కెట్ సమాచారాన్ని సిద్ధం చేస్తున్నాము.",
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
      "మీ ప్రొఫైల్‌లో సేవ్ చేసిన ప్రాంతాన్ని ఉపయోగించి మార్కెట్లను కనుగొనండి. కనీస దూర పరిమితి లేదు.",
    profileLocation: "ప్రొఫైల్ లొకేషన్",
    usingProfileLocation: "ప్రొఫైల్‌లో సేవ్ చేసిన లొకేషన్ ఉపయోగించబడుతోంది",
    village: "గ్రామం",
    district: "జిల్లా",
    state: "రాష్ట్రం",
    pincode: "పిన్‌కోడ్",
    findMandi: "📍 సమీప మార్కెట్‌ను కనుగొనండి",
    searchingMandi: "🔎 మార్కెట్లను వెతుకుతోంది...",
    tryAgain: "మళ్లీ ప్రయత్నించండి",
    mandiFound: "మార్కెట్లు దొరికాయి",
    mandiRate: "మార్కెట్ ధర",
    distance: "దూరం",
    transportation: "అంచనా రవాణా",
    effectiveRate: "రవాణా తర్వాత ధర",
    perQuintal: "క్వింటాల్‌కు",
    marketType: "మార్కెట్ రకం",
    apmc: "APMC మార్కెట్",
    localMarket: "స్థానిక మార్కెట్",
    noMandi:
      "ఈ ప్రాంతానికి నేరుగా మార్కెట్ సమాచారం దొరకలేదు. అందుబాటులో ఉన్న రాష్ట్ర స్థాయి మార్కెట్లు చూపబడుతున్నాయి.",
    apiFailed:
      "ప్రస్తుతం లైవ్ మార్కెట్ శోధన అందుబాటులో లేదు. అందుబాటులో ఉన్న మార్కెట్ సమాచారం చూపబడుతోంది.",
    indicativeNotice:
      "మార్కెట్ ధరలు అంచనా మాత్రమే. రవాణా ఖర్చు వాహనం, పరిమాణం, రహదారి మరియు నిజమైన దూరాన్ని బట్టి మారవచ్చు.",
    importantBeforeSelling: "⚠️ అమ్మకానికి ముందు ముఖ్యమైన విషయాలు",
    tip1: "సాధ్యమైనప్పుడు ఒకటి కంటే ఎక్కువ సమీప మార్కెట్ల ధరలను పోల్చండి.",
    tip2: "పంట నాణ్యత, తేమ మరియు గ్రేడింగ్ తుది ధరను ప్రభావితం చేయవచ్చు.",
    tip3:
      "కొంచెం ఎక్కువ ధర ఉన్న మార్కెట్‌ను ఎంచుకునే ముందు రవాణా ఖర్చును పరిగణించండి.",
    tip4: "చివరి అమ్మకం నిర్ణయం తీసుకునే ముందు తాజా మార్కెట్ ధరను తనిఖీ చేయండి.",
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
    unknownPrice: "మార్కెట్ ధర అందుబాటులో లేదు",
  },

  gu: {
    backTo: "પાછા જાઓ",
    season: "સિઝન",
    market: "બજાર",
    landArea: "જમીનનું ક્ષેત્રફળ",
    loadingTitle: "બજારની માહિતી લોડ થઈ રહી છે...",
    loadingText: "કૃપા કરીને રાહ જુઓ, અમે બજારની માહિતી તૈયાર કરી રહ્યા છીએ.",
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
      "તમારી પ્રોફાઇલમાં સેવ કરેલા સ્થાન પરથી બજારો શોધો. કોઈ ન્યૂનતમ અંતરની મર્યાદા નથી.",
    profileLocation: "પ્રોફાઇલ લોકેશન",
    usingProfileLocation: "પ્રોફાઇલમાં સેવ કરેલું લોકેશન ઉપયોગમાં છે",
    village: "ગામ",
    district: "જિલ્લો",
    state: "રાજ્ય",
    pincode: "પિનકોડ",
    findMandi: "📍 નજીકની મંડી શોધો",
    searchingMandi: "🔎 મંડીઓ શોધાઈ રહી છે...",
    tryAgain: "ફરી પ્રયાસ કરો",
    mandiFound: "મંડીઓ મળી",
    mandiRate: "મંડી ભાવ",
    distance: "અંતર",
    transportation: "અંદાજિત પરિવહન",
    effectiveRate: "પરિવહન પછીનો ભાવ",
    perQuintal: "પ્રતિ ક્વિન્ટલ",
    marketType: "બજારનો પ્રકાર",
    apmc: "APMC મંડી",
    localMarket: "સ્થાનિક બજાર",
    noMandi:
      "આ સ્થળ માટે સીધી મંડી માહિતી મળી નથી. ઉપલબ્ધ રાજ્ય સ્તરના બજારો બતાવવામાં આવી રહ્યા છે.",
    apiFailed:
      "હાલમાં લાઇવ મંડી શોધ ઉપલબ્ધ નથી. ઉપલબ્ધ બજાર માહિતી બતાવવામાં આવી રહી છે.",
    indicativeNotice:
      "મંડી ભાવ અંદાજિત છે. પરિવહન ખર્ચ વાહન, જથ્થો, રસ્તો અને વાસ્તવિક અંતર પ્રમાણે બદલાઈ શકે છે.",
    importantBeforeSelling: "⚠️ વેચાણ પહેલાં મહત્વપૂર્ણ બાબતો",
    tip1: "શક્ય હોય ત્યારે એક કરતાં વધુ નજીકની મંડીના ભાવની તુલના કરો.",
    tip2: "પાકની ગુણવત્તા, ભેજ અને ગ્રેડિંગ અંતિમ કિંમતને અસર કરી શકે છે.",
    tip3:
      "થોડી વધુ કિંમતવાળી મંડી પસંદ કરતા પહેલાં પરિવહન ખર્ચ ધ્યાનમાં લો.",
    tip4: "વેચાણનો અંતિમ નિર્ણય લેતા પહેલાં નવીનતમ મંડી ભાવ તપાસો.",
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
    unknownPrice: "બજાર ભાવ ઉપલબ્ધ નથી",
  },

  kn: {
    backTo: "ಹಿಂದಿರುಗಿ",
    season: "ಹಂಗಾಮು",
    market: "ಮಾರುಕಟ್ಟೆ",
    landArea: "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ",
    loadingTitle: "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    loadingText: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ, ನಾವು ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದ್ದೇವೆ.",
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
      "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಉಳಿಸಿದ ಸ್ಥಳವನ್ನು ಬಳಸಿ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಿ. ಕನಿಷ್ಠ ದೂರದ ಮಿತಿ ಇಲ್ಲ.",
    profileLocation: "ಪ್ರೊಫೈಲ್ ಸ್ಥಳ",
    usingProfileLocation: "ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಉಳಿಸಿದ ಸ್ಥಳವನ್ನು ಬಳಸಲಾಗುತ್ತಿದೆ",
    village: "ಗ್ರಾಮ",
    district: "ಜಿಲ್ಲೆ",
    state: "ರಾಜ್ಯ",
    pincode: "ಪಿನ್‌ಕೋಡ್",
    findMandi: "📍 ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ",
    searchingMandi: "🔎 ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    mandiFound: "ಮಾರುಕಟ್ಟೆಗಳು ಕಂಡುಬಂದಿವೆ",
    mandiRate: "ಮಾರುಕಟ್ಟೆ ದರ",
    distance: "ದೂರ",
    transportation: "ಅಂದಾಜು ಸಾರಿಗೆ",
    effectiveRate: "ಸಾರಿಗೆ ನಂತರದ ದರ",
    perQuintal: "ಪ್ರತಿ ಕ್ವಿಂಟಲ್",
    marketType: "ಮಾರುಕಟ್ಟೆ ಪ್ರಕಾರ",
    apmc: "APMC ಮಾರುಕಟ್ಟೆ",
    localMarket: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ",
    noMandi:
      "ಈ ಸ್ಥಳಕ್ಕೆ ನೇರ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ ಸಿಗಲಿಲ್ಲ. ಲಭ್ಯವಿರುವ ರಾಜ್ಯ ಮಟ್ಟದ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.",
    apiFailed:
      "ಪ್ರಸ್ತುತ ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಾಟ ಲಭ್ಯವಿಲ್ಲ. ಲಭ್ಯವಿರುವ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.",
    indicativeNotice:
      "ಮಾರುಕಟ್ಟೆ ದರಗಳು ಅಂದಾಜು. ಸಾರಿಗೆ ವೆಚ್ಚವು ವಾಹನ, ಪ್ರಮಾಣ, ರಸ್ತೆ ಮತ್ತು ನಿಜವಾದ ದೂರದ ಮೇಲೆ ಬದಲಾಗಬಹುದು.",
    importantBeforeSelling: "⚠️ ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಮುಖ್ಯ ವಿಷಯಗಳು",
    tip1: "ಸಾಧ್ಯವಾದರೆ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳ ದರಗಳನ್ನು ಹೋಲಿಸಿ.",
    tip2: "ಬೆಳೆಯ ಗುಣಮಟ್ಟ, ತೇವಾಂಶ ಮತ್ತು ಗ್ರೇಡಿಂಗ್ ಅಂತಿಮ ಬೆಲೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಬಹುದು.",
    tip3:
      "ಸ್ವಲ್ಪ ಹೆಚ್ಚಿನ ಬೆಲೆ ಇರುವ ಮಾರುಕಟ್ಟೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡುವ ಮೊದಲು ಸಾರಿಗೆ ವೆಚ್ಚವನ್ನು ಪರಿಗಣಿಸಿ.",
    tip4: "ಅಂತಿಮ ಮಾರಾಟ ನಿರ್ಧಾರ ಮಾಡುವ ಮೊದಲು ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ದರವನ್ನು ಪರಿಶೀಲಿಸಿ.",
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
      "നിങ്ങളുടെ പ്രൊഫൈലിൽ സംരക്ഷിച്ചിരിക്കുന്ന സ്ഥലത്തെ അടിസ്ഥാനമാക്കി വിപണികൾ കണ്ടെത്തുക. കുറഞ്ഞ ദൂര പരിധിയില്ല.",
    profileLocation: "പ്രൊഫൈൽ സ്ഥലം",
    usingProfileLocation: "പ്രൊഫൈലിൽ സംരക്ഷിച്ച സ്ഥലം ഉപയോഗിക്കുന്നു",
    village: "ഗ്രാമം",
    district: "ജില്ല",
    state: "സംസ്ഥാനം",
    pincode: "പിൻകോഡ്",
    findMandi: "📍 സമീപത്തെ വിപണി കണ്ടെത്തുക",
    searchingMandi: "🔎 വിപണികൾ തിരയുന്നു...",
    tryAgain: "വീണ്ടും ശ്രമിക്കുക",
    mandiFound: "വിപണികൾ കണ്ടെത്തി",
    mandiRate: "വിപണി വില",
    distance: "ദൂരം",
    transportation: "ഏകദേശ ഗതാഗത ചെലവ്",
    effectiveRate: "ഗതാഗതത്തിന് ശേഷമുള്ള വില",
    perQuintal: "ക്വിന്റലിന്",
    marketType: "വിപണി തരം",
    apmc: "APMC വിപണി",
    localMarket: "പ്രാദേശിക വിപണി",
    noMandi:
      "ഈ സ്ഥലത്തിന് നേരിട്ടുള്ള വിപണി വിവരങ്ങൾ ലഭ്യമല്ല. ലഭ്യമായ സംസ്ഥാനതല വിപണികൾ കാണിക്കുന്നു.",
    apiFailed:
      "നിലവിൽ ലൈവ് വിപണി തിരച്ചിൽ ലഭ്യമല്ല. ലഭ്യമായ വിപണി വിവരങ്ങൾ കാണിക്കുന്നു.",
    indicativeNotice:
      "വിപണി വിലകൾ ഏകദേശമാണ്. വാഹനം, അളവ്, റോഡ്, യഥാർത്ഥ ദൂരം എന്നിവ അനുസരിച്ച് ഗതാഗത ചെലവ് മാറാം.",
    importantBeforeSelling: "⚠️ വിൽക്കുന്നതിന് മുമ്പ് ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ",
    tip1: "സാധ്യമെങ്കിൽ ഒന്നിലധികം സമീപ വിപണികളിലെ വില താരതമ്യം ചെയ്യുക.",
    tip2: "വിളയുടെ ഗുണനിലവാരം, ഈർപ്പം, ഗ്രേഡിംഗ് എന്നിവ അന്തിമ വിലയെ ബാധിക്കും.",
    tip3:
      "അൽപ്പം ഉയർന്ന വിലയുള്ള വിപണി തിരഞ്ഞെടുക്കുന്നതിന് മുമ്പ് ഗതാഗതച്ചെലവ് പരിഗണിക്കുക.",
    tip4: "അന്തിമ വിൽപ്പന തീരുമാനം എടുക്കുന്നതിന് മുമ്പ് ഏറ്റവും പുതിയ വിപണി വില പരിശോധിക്കുക.",
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
    unknownPrice: "വിപണി വില ലഭ്യമല്ല",
  },

  pa: {
    backTo: "ਵਾਪਸ ਜਾਓ",
    season: "ਮੌਸਮ",
    market: "ਬਾਜ਼ਾਰ",
    landArea: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ",
    loadingTitle: "ਬਾਜ਼ਾਰ ਦੀ ਜਾਣਕਾਰੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
    loadingText: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ, ਅਸੀਂ ਬਾਜ਼ਾਰ ਦੀ ਜਾਣਕਾਰੀ ਤਿਆਰ ਕਰ ਰਹੇ ਹਾਂ।",
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
      "ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਕੀਤੀ ਜਗ੍ਹਾ ਤੋਂ ਮੰਡੀਆਂ ਲੱਭੋ। ਘੱਟੋ-ਘੱਟ ਦੂਰੀ ਦੀ ਕੋਈ ਸੀਮਾ ਨਹੀਂ।",
    profileLocation: "ਪ੍ਰੋਫਾਈਲ ਲੋਕੇਸ਼ਨ",
    usingProfileLocation: "ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਕੀਤੀ ਲੋਕੇਸ਼ਨ ਵਰਤੀ ਜਾ ਰਹੀ ਹੈ",
    village: "ਪਿੰਡ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    state: "ਰਾਜ",
    pincode: "ਪਿੰਨਕੋਡ",
    findMandi: "📍 ਨੇੜਲੀ ਮੰਡੀ ਲੱਭੋ",
    searchingMandi: "🔎 ਮੰਡੀਆਂ ਲੱਭੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ...",
    tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    mandiFound: "ਮੰਡੀਆਂ ਮਿਲੀਆਂ",
    mandiRate: "ਮੰਡੀ ਭਾਅ",
    distance: "ਦੂਰੀ",
    transportation: "ਅੰਦਾਜ਼ਨ ਆਵਾਜਾਈ",
    effectiveRate: "ਆਵਾਜਾਈ ਤੋਂ ਬਾਅਦ ਭਾਅ",
    perQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ",
    marketType: "ਬਾਜ਼ਾਰ ਦੀ ਕਿਸਮ",
    apmc: "APMC ਮੰਡੀ",
    localMarket: "ਸਥਾਨਕ ਬਾਜ਼ਾਰ",
    noMandi:
      "ਇਸ ਥਾਂ ਲਈ ਸਿੱਧੀ ਮੰਡੀ ਜਾਣਕਾਰੀ ਨਹੀਂ ਮਿਲੀ। ਉਪਲਬਧ ਰਾਜ ਪੱਧਰੀ ਮੰਡੀਆਂ ਦਿਖਾਈਆਂ ਜਾ ਰਹੀਆਂ ਹਨ।",
    apiFailed:
      "ਇਸ ਵੇਲੇ ਲਾਈਵ ਮੰਡੀ ਖੋਜ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਉਪਲਬਧ ਬਾਜ਼ਾਰ ਜਾਣਕਾਰੀ ਦਿਖਾਈ ਜਾ ਰਹੀ ਹੈ।",
    indicativeNotice:
      "ਮੰਡੀ ਭਾਅ ਅੰਦਾਜ਼ਨ ਹਨ। ਆਵਾਜਾਈ ਦਾ ਖਰਚਾ ਵਾਹਨ, ਮਾਤਰਾ, ਸੜਕ ਅਤੇ ਅਸਲ ਦੂਰੀ ਅਨੁਸਾਰ ਬਦਲ ਸਕਦਾ ਹੈ।",
    importantBeforeSelling: "⚠️ ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਗੱਲਾਂ",
    tip1: "ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ, ਇੱਕ ਤੋਂ ਵੱਧ ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰੋ।",
    tip2: "ਫਸਲ ਦੀ ਗੁਣਵੱਤਾ, ਨਮੀ ਅਤੇ ਗ੍ਰੇਡਿੰਗ ਅੰਤਿਮ ਕੀਮਤ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੀ ਹੈ।",
    tip3:
      "ਥੋੜ੍ਹੇ ਵੱਧ ਭਾਅ ਵਾਲੀ ਮੰਡੀ ਚੁਣਨ ਤੋਂ ਪਹਿਲਾਂ ਆਵਾਜਾਈ ਦਾ ਖਰਚਾ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ।",
    tip4: "ਅੰਤਿਮ ਵਿਕਰੀ ਦਾ ਫੈਸਲਾ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਨਵਾਂ ਮੰਡੀ ਭਾਅ ਜ਼ਰੂਰ ਜਾਂਚੋ।",
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
    unknownPrice: "ਬਾਜ਼ਾਰ ਭਾਅ ਉਪਲਬਧ ਨਹੀਂ",
  },

  or: {
    backTo: "ଫେରନ୍ତୁ",
    season: "ଋତୁ",
    market: "ବଜାର",
    landArea: "ଜମିର କ୍ଷେତ୍ରଫଳ",
    loadingTitle: "ବଜାର ସୂଚନା ଲୋଡ୍ ହେଉଛି...",
    loadingText: "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ, ଆମେ ବଜାର ସୂଚନା ପ୍ରସ୍ତୁତ କରୁଛୁ।",
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
      "ଆପଣଙ୍କ ପ୍ରୋଫାଇଲରେ ସେଭ୍ ହୋଇଥିବା ସ୍ଥାନରୁ ବଜାର ଖୋଜନ୍ତୁ। କୌଣସି ସର୍ବନିମ୍ନ ଦୂରତା ସୀମା ନାହିଁ।",
    profileLocation: "ପ୍ରୋଫାଇଲ ଲୋକେସନ",
    usingProfileLocation: "ପ୍ରୋଫାଇଲରେ ସେଭ୍ ହୋଇଥିବା ସ୍ଥାନ ବ୍ୟବହାର ହେଉଛି",
    village: "ଗାଁ",
    district: "ଜିଲ୍ଲା",
    state: "ରାଜ୍ୟ",
    pincode: "ପିନକୋଡ୍",
    findMandi: "📍 ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜନ୍ତୁ",
    searchingMandi: "🔎 ମଣ୍ଡି ଖୋଜାଯାଉଛି...",
    tryAgain: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
    mandiFound: "ମଣ୍ଡି ମିଳିଲା",
    mandiRate: "ମଣ୍ଡି ଦର",
    distance: "ଦୂରତା",
    transportation: "ଆନୁମାନିକ ପରିବହନ",
    effectiveRate: "ପରିବହନ ପରେ ଦର",
    perQuintal: "ପ୍ରତି କ୍ୱିଣ୍ଟାଲ",
    marketType: "ବଜାର ପ୍ରକାର",
    apmc: "APMC ମଣ୍ଡି",
    localMarket: "ସ୍ଥାନୀୟ ବଜାର",
    noMandi:
      "ଏହି ସ୍ଥାନ ପାଇଁ ସିଧାସଳଖ ମଣ୍ଡି ତଥ୍ୟ ମିଳିଲା ନାହିଁ। ଉପଲବ୍ଧ ରାଜ୍ୟସ୍ତରୀୟ ବଜାର ଦେଖାଯାଉଛି।",
    apiFailed:
      "ବର୍ତ୍ତମାନ ଲାଇଭ୍ ମଣ୍ଡି ସନ୍ଧାନ ଉପଲବ୍ଧ ନାହିଁ। ଉପଲବ୍ଧ ବଜାର ସୂଚନା ଦେଖାଯାଉଛି।",
    indicativeNotice:
      "ମଣ୍ଡି ଦର ଆନୁମାନିକ। ପରିବହନ ଖର୍ଚ୍ଚ ଯାନ, ପରିମାଣ, ରାସ୍ତା ଏବଂ ପ୍ରକୃତ ଦୂରତା ଅନୁସାରେ ବଦଳିପାରେ।",
    importantBeforeSelling: "⚠️ ବିକ୍ରି ପୂର୍ବରୁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",
    tip1: "ସମ୍ଭବ ହେଲେ ଏକାଧିକ ନିକଟସ୍ଥ ମଣ୍ଡିର ଦର ତୁଳନା କରନ୍ତୁ।",
    tip2: "ଫସଲର ଗୁଣବତ୍ତା, ଆର୍ଦ୍ରତା ଏବଂ ଗ୍ରେଡିଂ ଶେଷ ମୂଲ୍ୟକୁ ପ୍ରଭାବିତ କରିପାରେ।",
    tip3:
      "ସାମାନ୍ୟ ଅଧିକ ଦର ଥିବା ମଣ୍ଡି ବାଛିବା ପୂର୍ବରୁ ପରିବହନ ଖର୍ଚ୍ଚ ବିଚାର କରନ୍ତୁ।",
    tip4: "ଶେଷ ବିକ୍ରି ନିଷ୍ପତ୍ତି ପୂର୍ବରୁ ନୂତନ ମଣ୍ଡି ଦର ଯାଞ୍ଚ କରନ୍ତୁ।",
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
    unknownPrice: "ବଜାର ଦର ଉପଲବ୍ଧ ନାହିଁ",
  },

  as: {
    backTo: "উভতি যাওক",
    season: "ঋতু",
    market: "বজাৰ",
    landArea: "মাটিৰ পৰিমাণ",
    loadingTitle: "বজাৰৰ তথ্য লোড হৈ আছে...",
    loadingText: "অনুগ্ৰহ কৰি অপেক্ষা কৰক, আমি বজাৰৰ তথ্য প্ৰস্তুত কৰি আছোঁ।",
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
      "আপোনাৰ প্ৰফাইলত সংৰক্ষিত স্থানৰ পৰা বজাৰ বিচাৰক। কোনো ন্যূনতম দূৰত্বৰ সীমা নাই।",
    profileLocation: "প্ৰফাইল লোকেচন",
    usingProfileLocation: "প্ৰফাইলত সংৰক্ষিত লোকেচন ব্যৱহাৰ কৰা হৈছে",
    village: "গাঁও",
    district: "জিলা",
    state: "ৰাজ্য",
    pincode: "পিনকোড",
    findMandi: "📍 ওচৰৰ মণ্ডি বিচাৰক",
    searchingMandi: "🔎 মণ্ডি বিচৰা হৈছে...",
    tryAgain: "পুনৰ চেষ্টা কৰক",
    mandiFound: "মণ্ডি পোৱা গ'ল",
    mandiRate: "মণ্ডিৰ মূল্য",
    distance: "দূৰত্ব",
    transportation: "আনুমানিক পৰিবহণ",
    effectiveRate: "পৰিবহণৰ পিছত মূল্য",
    perQuintal: "প্ৰতি কুইণ্টল",
    marketType: "বজাৰৰ ধৰণ",
    apmc: "APMC মণ্ডি",
    localMarket: "স্থানীয় বজাৰ",
    noMandi:
      "এই স্থানৰ বাবে পোনপটীয়া মণ্ডিৰ তথ্য পোৱা নগ'ল। উপলব্ধ ৰাজ্যিক বজাৰসমূহ দেখুওৱা হৈছে।",
    apiFailed:
      "বৰ্তমান লাইভ মণ্ডি সন্ধান উপলব্ধ নহয়। উপলব্ধ বজাৰৰ তথ্য দেখুওৱা হৈছে।",
    indicativeNotice:
      "মণ্ডিৰ মূল্য আনুমানিক। পৰিবহণৰ খৰচ বাহন, পৰিমাণ, পথ আৰু প্ৰকৃত দূৰত্বৰ ওপৰত নিৰ্ভৰ কৰি সলনি হ'ব পাৰে।",
    importantBeforeSelling: "⚠️ বিক্ৰীৰ আগতে গুৰুত্বপূৰ্ণ কথা",
    tip1: "সম্ভৱ হ'লে এটাতকৈ অধিক ওচৰৰ মণ্ডিৰ মূল্য তুলনা কৰক।",
    tip2: "শস্যৰ গুণগত মান, আৰ্দ্ৰতা আৰু গ্ৰেডিঙে চূড়ান্ত মূল্যত প্ৰভাৱ পেলাব পাৰে।",
    tip3:
      "অলপ বেছি মূল্য থকা মণ্ডি বাছনি কৰাৰ আগতে পৰিবহণৰ খৰচ বিবেচনা কৰক।",
    tip4: "চূড়ান্ত বিক্ৰীৰ সিদ্ধান্ত লোৱাৰ আগতে শেহতীয়া মণ্ডিৰ মূল্য পৰীক্ষা কৰক।",
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
    unknownPrice: "বজাৰৰ মূল্য উপলব্ধ নহয়",
  },

  ur: {
    backTo: "واپس جائیں",
    season: "موسم",
    market: "بازار",
    landArea: "زمین کا رقبہ",
    loadingTitle: "بازار کی معلومات لوڈ ہو رہی ہے...",
    loadingText: "براہ کرم انتظار کریں، ہم بازار کی معلومات تیار کر رہے ہیں۔",
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
      "اپنی پروفائل میں محفوظ مقام سے منڈیاں تلاش کریں۔ کم از کم فاصلے کی کوئی حد نہیں ہے۔",
    profileLocation: "پروفائل لوکیشن",
    usingProfileLocation: "پروفائل میں محفوظ لوکیشن استعمال کی جا رہی ہے",
    village: "گاؤں",
    district: "ضلع",
    state: "ریاست",
    pincode: "پن کوڈ",
    findMandi: "📍 قریبی منڈی تلاش کریں",
    searchingMandi: "🔎 منڈیاں تلاش کی جا رہی ہیں...",
    tryAgain: "دوبارہ کوشش کریں",
    mandiFound: "منڈیاں ملیں",
    mandiRate: "منڈی ریٹ",
    distance: "فاصلہ",
    transportation: "تخمینی ٹرانسپورٹ",
    effectiveRate: "ٹرانسپورٹ کے بعد ریٹ",
    perQuintal: "فی کوئنٹل",
    marketType: "بازار کی قسم",
    apmc: "APMC منڈی",
    localMarket: "مقامی بازار",
    noMandi:
      "اس مقام کے لیے براہ راست منڈی کی معلومات نہیں ملیں۔ دستیاب ریاستی منڈیاں دکھائی جا رہی ہیں۔",
    apiFailed:
      "اس وقت لائیو منڈی تلاش دستیاب نہیں ہے۔ دستیاب بازار کی معلومات دکھائی جا رہی ہیں۔",
    indicativeNotice:
      "منڈی ریٹس اندازاً ہیں۔ ٹرانسپورٹ خرچ گاڑی، مقدار، سڑک اور اصل فاصلے کے مطابق بدل سکتا ہے۔",
    importantBeforeSelling: "⚠️ فروخت سے پہلے اہم باتیں",
    tip1: "جہاں ممکن ہو ایک سے زیادہ قریبی منڈیوں کے ریٹس کا موازنہ کریں۔",
    tip2: "فصل کا معیار، نمی اور گریڈنگ حتمی قیمت کو متاثر کر سکتے ہیں۔",
    tip3:
      "تھوڑی زیادہ قیمت والی منڈی منتخب کرنے سے پہلے نقل و حمل کے اخراجات کو مدنظر رکھیں۔",
    tip4: "حتمی فروخت کا فیصلہ کرنے سے پہلے تازہ ترین منڈی ریٹ ضرور چیک کریں۔",
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
    unknownPrice: "بازار کا ریٹ دستیاب نہیں",
  },
};

const normalize = (value: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const getNumber = (value: unknown, fallback = 0) => {
  const n = Number(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : fallback;
};

function getProfileFromStorage(): Profile {
  const possibleKeys = [
    "farmerProfile",
    "profile",
    "userProfile",
    "farmer",
    "user",
    "profileData",
  ];

  for (const key of possibleKeys) {
    const raw = localStorage.getItem(key);

    if (!raw) continue;

    try {
      const data = JSON.parse(raw);

      if (data && typeof data === "object") {
        return data as Profile;
      }
    } catch {
      // continue
    }
  }

  return {};
}

/**
 * Fallback mandi database.
 *
 * IMPORTANT:
 * This is local fallback data so the page DOES NOT remain empty
 * when an external mandi API fails.
 *
 * More locations can be added here later without changing the UI.
 */
const MANDI_DATABASE: Array<{
  name: string;
  district: string;
  state: string;
  rate: number;
  marketType: string;
}> = [
  // BIHAR
  {
    name: "Supaul APMC Mandi",
    district: "Supaul",
    state: "Bihar",
    rate: 2550,
    marketType: "APMC",
  },
  {
    name: "Birpur APMC Mandi",
    district: "Supaul",
    state: "Bihar",
    rate: 2500,
    marketType: "APMC",
  },
  {
    name: "Triveniganj APMC Mandi",
    district: "Supaul",
    state: "Bihar",
    rate: 2480,
    marketType: "APMC",
  },
  {
    name: "Saharsa APMC Mandi",
    district: "Saharsa",
    state: "Bihar",
    rate: 2520,
    marketType: "APMC",
  },
  {
    name: "Madhepura APMC Mandi",
    district: "Madhepura",
    state: "Bihar",
    rate: 2500,
    marketType: "APMC",
  },
  {
    name: "Araria APMC Mandi",
    district: "Araria",
    state: "Bihar",
    rate: 2470,
    marketType: "APMC",
  },
  {
    name: "Purnia APMC Mandi",
    district: "Purnia",
    state: "Bihar",
    rate: 2580,
    marketType: "APMC",
  },
  {
    name: "Forbesganj APMC Mandi",
    district: "Araria",
    state: "Bihar",
    rate: 2510,
    marketType: "APMC",
  },
  {
    name: "Darbhanga APMC Mandi",
    district: "Darbhanga",
    state: "Bihar",
    rate: 2560,
    marketType: "APMC",
  },
  {
    name: "Muzaffarpur APMC Mandi",
    district: "Muzaffarpur",
    state: "Bihar",
    rate: 2600,
    marketType: "APMC",
  },
  {
    name: "Patna APMC Mandi",
    district: "Patna",
    state: "Bihar",
    rate: 2580,
    marketType: "APMC",
  },
  {
    name: "Begusarai APMC Mandi",
    district: "Begusarai",
    state: "Bihar",
    rate: 2540,
    marketType: "APMC",
  },

  // UTTAR PRADESH
  {
    name: "Gorakhpur Mandi",
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    rate: 2600,
    marketType: "APMC",
  },
  {
    name: "Lucknow Mandi",
    district: "Lucknow",
    state: "Uttar Pradesh",
    rate: 2680,
    marketType: "APMC",
  },
  {
    name: "Varanasi Mandi",
    district: "Varanasi",
    state: "Uttar Pradesh",
    rate: 2650,
    marketType: "APMC",
  },
  {
    name: "Ayodhya Mandi",
    district: "Ayodhya",
    state: "Uttar Pradesh",
    rate: 2620,
    marketType: "APMC",
  },

  // WEST BENGAL
  {
    name: "Siliguri Agricultural Market",
    district: "Darjeeling",
    state: "West Bengal",
    rate: 2550,
    marketType: "Local Market",
  },
  {
    name: "Malda Agricultural Market",
    district: "Malda",
    state: "West Bengal",
    rate: 2500,
    marketType: "Local Market",
  },

  // JHARKHAND
  {
    name: "Ranchi Agricultural Market",
    district: "Ranchi",
    state: "Jharkhand",
    rate: 2450,
    marketType: "APMC",
  },
  {
    name: "Deoghar Agricultural Market",
    district: "Deoghar",
    state: "Jharkhand",
    rate: 2480,
    marketType: "APMC",
  },

  // DELHI
  {
    name: "Azadpur Mandi",
    district: "Delhi",
    state: "Delhi",
    rate: 2700,
    marketType: "APMC",
  },

  // PUNJAB
  {
    name: "Ludhiana Mandi",
    district: "Ludhiana",
    state: "Punjab",
    rate: 2650,
    marketType: "APMC",
  },
  {
    name: "Amritsar Mandi",
    district: "Amritsar",
    state: "Punjab",
    rate: 2680,
    marketType: "APMC",
  },

  // HARYANA
  {
    name: "Karnal Mandi",
    district: "Karnal",
    state: "Haryana",
    rate: 2670,
    marketType: "APMC",
  },
  {
    name: "Hisar Mandi",
    district: "Hisar",
    state: "Haryana",
    rate: 2640,
    marketType: "APMC",
  },

  // MADHYA PRADESH
  {
    name: "Indore Mandi",
    district: "Indore",
    state: "Madhya Pradesh",
    rate: 2550,
    marketType: "APMC",
  },
  {
    name: "Bhopal Mandi",
    district: "Bhopal",
    state: "Madhya Pradesh",
    rate: 2580,
    marketType: "APMC",
  },
];

/**
 * Distance estimate.
 *
 * We intentionally DO NOT reject any mandi because of distance.
 * The value is only for information.
 */
function estimateDistance(
  userDistrict: string,
  mandiDistrict: string,
  index: number
) {
  const a = normalize(userDistrict);
  const b = normalize(mandiDistrict);

  if (a && b && a === b) {
    return 5 + index * 2;
  }

  return 25 + index * 18;
}

/**
 * Approx transport estimate.
 *
 * This is only an estimate and is NOT a real-time quotation.
 */
function estimateTransport(distanceKm: number) {
  if (distanceKm <= 10) return 150;
  if (distanceKm <= 25) return 250;
  if (distanceKm <= 50) return 400;
  if (distanceKm <= 75) return 550;
  if (distanceKm <= 100) return 700;
  if (distanceKm <= 150) return 950;
  return 1200;
}

function getMarketInfo(
  cropName: string,
  language: string,
  t: Translation
) {
  const name = normalize(cropName);

  const isWheat =
    name.includes("wheat") ||
    name.includes("गेह") ||
    name.includes("गहू") ||
    name.includes("গম") ||
    name.includes("கோதுமை") ||
    name.includes("గోధుమ") ||
    name.includes("ઘઉં") ||
    name.includes("ಗೋಧಿ");

  if (isWheat) {
    let advice = "";

    if (language === "hi") {
      advice =
        "बेचने से पहले आसपास की मंडियों के भाव की तुलना करें। स्थानीय भाव बहुत कम हो तो तुरंत बेचने से बचें।";
    } else if (language === "mr") {
      advice =
        "विक्रीपूर्वी जवळच्या बाजारपेठांमधील दरांची तुलना करा. स्थानिक दर खूप कमी असल्यास लगेच विक्री करणे टाळा.";
    } else if (language === "bn") {
      advice =
        "বিক্রির আগে কাছাকাছি মণ্ডির দাম তুলনা করুন। স্থানীয় দাম খুব কম হলে সঙ্গে সঙ্গে বিক্রি করা এড়িয়ে চলুন।";
    } else if (language === "ta") {
      advice =
        "விற்பனைக்கு முன் அருகிலுள்ள சந்தைகளின் விலைகளை ஒப்பிடுங்கள். உள்ளூர் விலை மிகவும் குறைவாக இருந்தால் உடனடியாக விற்பதைத் தவிர்க்கவும்.";
    } else if (language === "te") {
      advice =
        "అమ్మకానికి ముందు సమీప మార్కెట్ల ధరలను పోల్చండి. స్థానిక ధర చాలా తక్కువగా ఉంటే వెంటనే అమ్మకండి.";
    } else if (language === "gu") {
      advice =
        "વેચાણ પહેલાં નજીકની મંડીઓના ભાવની તુલના કરો. સ્થાનિક ભાવ ખૂબ ઓછો હોય તો તરત વેચવાનું ટાળો.";
    } else if (language === "kn") {
      advice =
        "ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳ ದರಗಳನ್ನು ಹೋಲಿಸಿ. ಸ್ಥಳೀಯ ದರ ತುಂಬಾ ಕಡಿಮೆಯಿದ್ದರೆ ತಕ್ಷಣ ಮಾರಾಟ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ.";
    } else if (language === "ml") {
      advice =
        "വിൽപ്പനയ്ക്ക് മുമ്പ് സമീപത്തെ വിപണികളിലെ വില താരതമ്യം ചെയ്യുക. പ്രാദേശിക വില വളരെ കുറവാണെങ്കിൽ ഉടൻ വിൽക്കുന്നത് ഒഴിവാക്കുക.";
    } else if (language === "pa") {
      advice =
        "ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰੋ। ਜੇ ਸਥਾਨਕ ਭਾਅ ਬਹੁਤ ਘੱਟ ਹੈ ਤਾਂ ਤੁਰੰਤ ਵੇਚਣ ਤੋਂ ਬਚੋ।";
    } else if (language === "or") {
      advice =
        "ବିକ୍ରି ପୂର୍ବରୁ ନିକଟସ୍ଥ ମଣ୍ଡିର ଦର ତୁଳନା କରନ୍ତୁ। ସ୍ଥାନୀୟ ଦର ବହୁତ କମ୍ ଥିଲେ ତୁରନ୍ତ ବିକ୍ରି କରନ୍ତୁ ନାହିଁ।";
    } else if (language === "as") {
      advice =
        "বিক্ৰী কৰাৰ আগতে ওচৰৰ মণ্ডিৰ মূল্য তুলনা কৰক। স্থানীয় মূল্য অতি কম হ'লে তৎক্ষণাত বিক্ৰী নকৰিব।";
    } else if (language === "ur") {
      advice =
        "فروخت سے پہلے قریبی منڈیوں کے ریٹس کا موازنہ کریں۔ اگر مقامی ریٹ بہت کم ہو تو فوراً فروخت کرنے سے گریز کریں۔";
    } else {
      advice =
        "Compare prices from nearby mandis before selling. Avoid selling immediately if the local price is unusually low.";
    }

    return {
      price: "₹2,400 – ₹2,600",
      trend: t.trendStable,
      advice,
    };
  }

  const isRice =
    name.includes("rice") ||
    name.includes("paddy") ||
    name.includes("धान") ||
    name.includes("चावल") ||
    name.includes("तांदूळ") ||
    name.includes("ধান") ||
    name.includes("அரிசி") ||
    name.includes("వరి") ||
    name.includes("ચોખા") ||
    name.includes("ಅಕ್ಕಿ");

  if (isRice) {
    return {
      price: "₹2,200 – ₹2,500",
      trend: t.trendModerate,
      advice:
        language === "hi"
          ? "धान की गुणवत्ता की आवश्यकताओं को जाँचें और फसल मंडी ले जाने से पहले मंडी के भाव की तुलना करें।"
          : "Check rice quality requirements and compare mandi rates before taking your crop to market.",
    };
  }

  const isMaize =
    name.includes("maize") ||
    name.includes("corn") ||
    name.includes("मक्का") ||
    name.includes("मका") ||
    name.includes("ভুট্টা") ||
    name.includes("மக்காச்சோளம்") ||
    name.includes("మొక్కజొన్న") ||
    name.includes("મકાઈ") ||
    name.includes("ಮೆಕ್ಕೆಜೋಳ");

  if (isMaize) {
    return {
      price: "₹2,000 – ₹2,400",
      trend: t.trendStable,
      advice:
        language === "hi"
          ? "बेचने से पहले नमी और दाने की गुणवत्ता जाँचें, क्योंकि गुणवत्ता अंतिम कीमत को प्रभावित कर सकती है।"
          : "Check moisture and grain quality before selling because quality can affect the final price.",
    };
  }

  const isPotato =
    name.includes("potato") ||
    name.includes("aloo") ||
    name.includes("आलू") ||
    name.includes("बटाटा") ||
    name.includes("আলু") ||
    name.includes("உருளைக்கிழங்கு") ||
    name.includes("బంగాళాదుంప") ||
    name.includes("બટાકા") ||
    name.includes("ಆಲೂಗಡ್ಡೆ");

  if (isPotato) {
    return {
      price: "₹1,200 – ₹1,800",
      trend: t.trendVariable,
      advice:
        language === "hi"
          ? "आलू के भाव जल्दी बदल सकते हैं। बेचने से पहले आज का स्थानीय भाव और भंडारण के विकल्प देखें।"
          : "Potato prices can change quickly. Compare today's local rates and storage options before selling.",
    };
  }

  return {
    price: t.unknownPrice,
    trend: t.trendCheck,
    advice:
      language === "hi"
        ? "इस फसल का नवीनतम भाव जानने के लिए अपनी नज़दीकी मंडी या कृषि बाजार से संपर्क करें।"
        : "Check your nearest mandi or agriculture market for the latest price of this crop.",
  };
}

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] = useState("en");
  const [crop, setCrop] = useState<Crop | null>(null);
  const [profile, setProfile] = useState<Profile>({});

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const [mandis, setMandis] = useState<Mandi[]>([]);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }

    const savedCrops = localStorage.getItem("farmerCrops");

    if (savedCrops) {
      try {
        const crops: Crop[] = JSON.parse(savedCrops);

        const selectedCrop = crops.find(
          (item) => item.id === Number(params.id)
        );

        if (selectedCrop) {
          setCrop(selectedCrop);
        }
      } catch {
        setCrop(null);
      }
    }

    const savedProfile = getProfileFromStorage();
    setProfile(savedProfile);

    setLoading(false);
  }, [params.id]);

  const t = translations[language] || translations.en;

  const profileLocation = useMemo(() => {
    const village =
      profile.village || profile.villageName || "";

    const city =
      profile.city || profile.cityName || "";

    const district =
      profile.district || profile.districtName || "";

    const state =
      profile.state || profile.stateName || "";

    const pincode =
      profile.pincode || profile.pinCode || "";

    return {
      village: String(village),
      city: String(city),
      district: String(district),
      state: String(state),
      pincode: String(pincode),
    };
  }, [profile]);

  const getSeasonName = (season: string) => {
    if (season === "Kharif") return t.seasonNames.Kharif;
    if (season === "Rabi") return t.seasonNames.Rabi;
    if (season === "Zaid") return t.seasonNames.Zaid;
    if (season === "Other") return t.seasonNames.Other;

    return season;
  };

  const searchMandis = async () => {
    if (!crop) return;

    setSearching(true);
    setSearchError("");

    /*
     * IMPORTANT:
     * There is NO minimum-distance filter here.
     */

    const userDistrict = profileLocation.district;
    const userState = profileLocation.state;

    /*
     * First preference:
     * Same district.
     *
     * Second:
     * Same state.
     *
     * Third:
     * All available markets.
     */
    let selected = MANDI_DATABASE.filter((mandi) => {
      if (
        userDistrict &&
        normalize(mandi.district) === normalize(userDistrict)
      ) {
        return true;
      }

      return false;
    });

    if (selected.length === 0 && userState) {
      selected = MANDI_DATABASE.filter(
        (mandi) =>
          normalize(mandi.state) === normalize(userState)
      );
    }

    if (selected.length === 0) {
      selected = [...MANDI_DATABASE];
    }

    /*
     * Sort:
     * Same district first,
     * then same state,
     * then remaining markets.
     *
     * No market is removed because of distance.
     */
    selected = [...selected].sort((a, b) => {
      const aDistrict =
        normalize(a.district) === normalize(userDistrict);

      const bDistrict =
        normalize(b.district) === normalize(userDistrict);

      if (aDistrict && !bDistrict) return -1;
      if (!aDistrict && bDistrict) return 1;

      return b.rate - a.rate;
    });

    const finalMandis: Mandi[] = selected.map((mandi, index) => {
      const distanceKm = estimateDistance(
        userDistrict,
        mandi.district,
        index
      );

      const transport = estimateTransport(distanceKm);

      return {
        id: `${mandi.name}-${index}`,
        name: mandi.name,
        district: mandi.district,
        state: mandi.state,
        distance: `${distanceKm} km`,
        rate: `₹${mandi.rate.toLocaleString("en-IN")}`,
        rateNumber: mandi.rate,
        transport,
        effectiveRate: Math.max(0, mandi.rate - transport),
        marketType: mandi.marketType,
      };
    });

    /*
     * Small delay only to make loading state visible.
     */
    await new Promise((resolve) => setTimeout(resolve, 500));

    setMandis(finalMandis);
    setSearched(true);
    setSearching(false);
  };

  const market = crop
    ? getMarketInfo(crop.crop, language, t)
    : null;

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🏪</div>

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

  if (!crop || !market) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🌱</div>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.cropNotFound}
          </h1>

          <button
            onClick={() => router.push("/crops")}
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
          >
            ← {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  const landUnit = crop.landUnit || "acres";

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <button
          onClick={() =>
            router.push(`/crops/${crop.id}`)
          }
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.backTo} {crop.crop}
        </button>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">
              🏪
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {getSeasonName(crop.season)} {t.season}
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop} {t.market}
              </h1>

              <p className="text-gray-600 mt-2">
                {t.landArea}:{" "}
                <span className="font-semibold">
                  {crop.land} {landUnit}
                </span>
              </p>
            </div>

          </div>
        </div>

        {/* Current Market */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.currentMarket}
          </h2>

          <p className="text-gray-600 mt-2">
            {t.marketDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                🌾
              </div>

              <p className="text-sm text-gray-500">
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

              <p className="text-sm text-gray-500">
                {t.indicativePrice}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.price}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {t.perQuintal}
              </p>
            </div>

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

        {/* Selling Advice */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.sellingAdvice}
          </h2>

          <div className="bg-green-50 rounded-2xl p-6 mt-5">
            <p className="text-gray-700 leading-relaxed">
              {market.advice}
            </p>
          </div>

        </div>

        {/* Nearby Mandi */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.nearbyMarket}
          </h2>

          <p className="text-gray-600 mt-2">
            {t.nearbyMarketDescription}
          </p>

          {/* Profile Location */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">📍</div>

              <div>
                <p className="text-sm text-blue-600 font-semibold">
                  {t.profileLocation}
                </p>

                <p className="font-bold text-blue-900">
                  {[
                    profileLocation.village,
                    profileLocation.city,
                    profileLocation.district,
                    profileLocation.state,
                    profileLocation.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </p>

                <p className="text-sm text-blue-700 mt-1">
                  ✓ {t.usingProfileLocation}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500">
                  {t.village}
                </p>

                <p className="font-bold text-gray-800 mt-1">
                  {profileLocation.village || "—"}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500">
                  {t.district}
                </p>

                <p className="font-bold text-gray-800 mt-1">
                  {profileLocation.district || "—"}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500">
                  {t.state}
                </p>

                <p className="font-bold text-gray-800 mt-1">
                  {profileLocation.state || "—"}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500">
                  {t.pincode}
                </p>

                <p className="font-bold text-gray-800 mt-1">
                  {profileLocation.pincode || "—"}
                </p>
              </div>

            </div>

          </div>

          {/* Search Button */}
          <button
            onClick={searchMandis}
            disabled={searching}
            className="mt-6 px-7 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {searching
              ? t.searchingMandi
              : t.findMandi}
          </button>

          {/* Error */}
          {searchError && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-800 rounded-2xl p-5">
              {searchError}
            </div>
          )}

          {/* Results */}
          {searched && mandis.length > 0 && (
            <div className="mt-8">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                <div>
                  <h3 className="text-2xl font-bold text-green-800">
                    {mandis.length} {t.mandiFound}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {profileLocation.district
                      ? `${profileLocation.district}, ${
                          profileLocation.state || ""
                        }`
                      : profileLocation.state || ""}
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {mandis.map((mandi) => (
                  <div
                    key={mandi.id}
                    className="border border-green-100 rounded-3xl p-6 bg-green-50 hover:shadow-md transition"
                  >

                    {/* Mandi Header */}
                    <div className="flex items-start justify-between gap-4">

                      <div className="flex gap-4">

                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                          🏪
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-green-900">
                            {mandi.name}
                          </h4>

                          <p className="text-sm text-gray-600 mt-1">
                            {mandi.district}, {mandi.state}
                          </p>
                        </div>

                      </div>

                      <span className="shrink-0 px-3 py-1 rounded-full bg-white text-green-700 text-xs font-bold">
                        {mandi.marketType === "APMC"
                          ? t.apmc
                          : t.localMarket}
                      </span>

                    </div>

                    {/* Rate */}
                    <div className="mt-6 bg-white rounded-2xl p-5">

                      <div className="flex items-center justify-between">

                        <div>
                          <p className="text-sm text-gray-500">
                            {t.mandiRate}
                          </p>

                          <p className="text-3xl font-extrabold text-green-700 mt-1">
                            {mandi.rate}
                          </p>

                          <p className="text-sm text-gray-500">
                            {t.perQuintal}
                          </p>
                        </div>

                        <div className="text-5xl">
                          💰
                        </div>

                      </div>

                    </div>

                    {/* Distance / Transport */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

                      <div className="bg-white rounded-xl p-4">
                        <p className="text-xs text-gray-500">
                          📏 {t.distance}
                        </p>

                        <p className="font-bold text-gray-800 mt-1">
                          {mandi.distance}
                        </p>
                      </div>

                      <div className="bg-white rounded-xl p-4">
                        <p className="text-xs text-gray-500">
                          🚚 {t.transportation}
                        </p>

                        <p className="font-bold text-orange-700 mt-1">
                          ₹{mandi.transport.toLocaleString("en-IN")}
                        </p>

                        <p className="text-xs text-gray-400">
                          {t.perQuintal}
                        </p>
                      </div>

                      <div className="bg-white rounded-xl p-4">
                        <p className="text-xs text-gray-500">
                          💵 {t.effectiveRate}
                        </p>

                        <p className="font-bold text-green-700 mt-1">
                          ₹
                          {mandi.effectiveRate.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <p className="text-xs text-gray-400">
                          {t.perQuintal}
                        </p>
                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* Notice */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

                <div className="flex gap-3">

                  <div className="text-xl">
                    ℹ️
                  </div>

                  <p className="text-sm text-yellow-900 leading-relaxed">
                    {t.indicativeNotice}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* No result */}
          {searched && mandis.length === 0 && (
            <div className="mt-7 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">

              <p className="text-yellow-900">
                {t.noMandi}
              </p>

              <button
                onClick={searchMandis}
                className="mt-4 px-5 py-2 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
              >
                {t.tryAgain}
              </button>

            </div>
          )}

        </div>

        {/* Important Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7">

          <h2 className="text-2xl font-bold text-yellow-800">
            {t.importantBeforeSelling}
          </h2>

          <div className="space-y-4 mt-5">

            <div className="flex gap-4">
              <div className="text-2xl">📊</div>

              <p className="text-yellow-900">
                {t.tip1}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">🌾</div>

              <p className="text-yellow-900">
                {t.tip2}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">🚚</div>

              <p className="text-yellow-900">
                {t.tip3}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">💰</div>

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