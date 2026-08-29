"use client";

import { useEffect, useState } from "react";
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

type MarketInfo = {
  crop: string;
  price: string;
  unit: string;
  trend: string;
  advice: string;
};

type Mandi = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  distance: number;
  rate: string;
  transportPerQuintal: number;
  transportText: string;
  effectiveRate: string;
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

  findMandi: string;
  searchingMandi: string;

  profileLocation: string;
  locationNotFound: string;
  locationUsed: string;

  distance: string;
  km: string;

  mandiRate: string;
  transportCharge: string;
  estimatedTransport: string;

  effectivePrice: string;

  openMap: string;

  noMandiFound: string;
  mandiSearchError: string;

  importantBeforeSelling: string;

  tip1: string;
  tip2: string;
  tip3: string;
  tip4: string;

  estimateNote: string;

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

    findMandi: "Find Nearby Mandi →",
    searchingMandi: "Searching nearby mandis...",

    profileLocation: "Profile Location",
    locationNotFound:
      "Profile location was not found. Please add your village, city, district or pincode in your profile.",
    locationUsed: "Mandis are being searched around your profile location.",

    distance: "Distance",
    km: "km",

    mandiRate: "Mandi Rate",
    transportCharge: "Transport",
    estimatedTransport: "Estimated transport",

    effectivePrice: "Effective Price",

    openMap: "Open Map",

    noMandiFound:
      "No nearby mandi was found around your saved profile location.",

    mandiSearchError:
      "Unable to find nearby mandis right now. Please try again.",

    importantBeforeSelling: "⚠️ Important Before Selling",

    tip1:
      "Compare prices from more than one nearby mandi whenever possible.",

    tip2:
      "Crop quality, moisture and grading can affect the final selling price.",

    tip3:
      "Consider transportation cost before choosing a mandi with a slightly higher price.",

    tip4:
      "Verify the latest mandi rate before making a final selling decision.",

    estimateNote:
      "Mandi rates shown here are indicative. Transport is an estimated amount and may vary by vehicle, quantity, road condition and distance.",

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
      "आपके प्रोफाइल में सेव की गई जगह के आसपास की कृषि मंडियों को खोजें और बिक्री के विकल्पों की तुलना करें।",

    findMandi: "नज़दीकी मंडी खोजें →",
    searchingMandi: "नज़दीकी मंडियाँ खोजी जा रही हैं...",

    profileLocation: "प्रोफाइल की जगह",
    locationNotFound:
      "प्रोफाइल की लोकेशन नहीं मिली। कृपया अपनी प्रोफाइल में गाँव, शहर, जिला या पिनकोड जोड़ें।",
    locationUsed:
      "मंडी की खोज आपकी प्रोफाइल में सेव की गई लोकेशन के आसपास की जा रही है।",

    distance: "दूरी",
    km: "किमी",

    mandiRate: "मंडी भाव",
    transportCharge: "परिवहन",
    estimatedTransport: "अनुमानित परिवहन",

    effectivePrice: "परिवहन के बाद प्रभावी भाव",

    openMap: "मैप खोलें",

    noMandiFound:
      "आपकी प्रोफाइल लोकेशन के आसपास कोई नज़दीकी मंडी नहीं मिली।",

    mandiSearchError:
      "अभी नज़दीकी मंडियों की जानकारी नहीं मिल पा रही है। कृपया दोबारा कोशिश करें।",

    importantBeforeSelling: "⚠️ बेचने से पहले जरूरी बातें",

    tip1:
      "जहाँ संभव हो, एक से अधिक नज़दीकी मंडियों के भाव की तुलना करें।",

    tip2:
      "फसल की गुणवत्ता, नमी और ग्रेडिंग से अंतिम बिक्री कीमत प्रभावित हो सकती है।",

    tip3:
      "थोड़ा अधिक भाव वाली मंडी चुनने से पहले परिवहन का खर्च भी ध्यान में रखें।",

    tip4:
      "फसल बेचने का अंतिम निर्णय लेने से पहले नवीनतम मंडी भाव जरूर जाँचें।",

    estimateNote:
      "मंडी भाव अनुमानित हैं। परिवहन खर्च भी अनुमानित है और वाहन, मात्रा, सड़क की स्थिति तथा दूरी के अनुसार बदल सकता है।",

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
    loadingText:
      "कृपया थांबा, आम्ही बाजाराची माहिती तयार करत आहोत.",

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
      "तुमच्या प्रोफाइलमध्ये सेव्ह केलेल्या ठिकाणाजवळील कृषी बाजारपेठा शोधा.",

    findMandi: "जवळची बाजारपेठ शोधा →",
    searchingMandi: "जवळच्या बाजारपेठा शोधत आहे...",

    profileLocation: "प्रोफाइलचे ठिकाण",
    locationNotFound:
      "प्रोफाइलचे ठिकाण सापडले नाही. कृपया प्रोफाइलमध्ये गाव, शहर, जिल्हा किंवा पिनकोड जोडा.",

    locationUsed:
      "तुमच्या प्रोफाइलमध्ये सेव्ह केलेल्या ठिकाणाजवळ बाजारपेठा शोधल्या जात आहेत.",

    distance: "अंतर",
    km: "किमी",

    mandiRate: "बाजारभाव",
    transportCharge: "वाहतूक",
    estimatedTransport: "अंदाजे वाहतूक",

    effectivePrice: "वाहतूक वजा केल्यानंतरचा भाव",

    openMap: "नकाशा उघडा",

    noMandiFound:
      "तुमच्या प्रोफाइलच्या ठिकाणाजवळ बाजारपेठ सापडली नाही.",

    mandiSearchError:
      "सध्या जवळच्या बाजारपेठांची माहिती मिळत नाही. पुन्हा प्रयत्न करा.",

    importantBeforeSelling: "⚠️ विक्रीपूर्वी महत्त्वाच्या गोष्टी",

    tip1:
      "शक्य असल्यास एकापेक्षा जास्त जवळच्या बाजारपेठांमधील दरांची तुलना करा.",

    tip2:
      "पिकाची गुणवत्ता, ओलावा आणि दर्जा अंतिम किंमतीवर परिणाम करू शकतो.",

    tip3:
      "थोडा जास्त दर असलेली बाजारपेठ निवडण्यापूर्वी वाहतूक खर्चाचा विचार करा.",

    tip4:
      "विक्रीचा अंतिम निर्णय घेण्यापूर्वी नवीनतम बाजारभाव तपासा.",

    estimateNote:
      "बाजारभाव अंदाजे आहेत. वाहतूक खर्चही अंदाजे आहे आणि वाहन, प्रमाण, रस्ता व अंतरानुसार बदलू शकतो.",

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
    loadingText:
      "অনুগ্রহ করে অপেক্ষা করুন, আমরা বাজারের তথ্য প্রস্তুত করছি।",

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

    findMandi: "কাছাকাছি মণ্ডি খুঁজুন →",
    searchingMandi: "কাছাকাছি মণ্ডি খোঁজা হচ্ছে...",

    profileLocation: "প্রোফাইলের অবস্থান",
    locationNotFound:
      "প্রোফাইলের অবস্থান পাওয়া যায়নি। আপনার প্রোফাইলে গ্রাম, শহর, জেলা বা পিনকোড যোগ করুন।",

    locationUsed:
      "আপনার প্রোফাইলে সংরক্ষিত অবস্থানের আশেপাশে মণ্ডি খোঁজা হচ্ছে।",

    distance: "দূরত্ব",
    km: "কিমি",

    mandiRate: "মণ্ডির দাম",
    transportCharge: "পরিবহন",
    estimatedTransport: "আনুমানিক পরিবহন",

    effectivePrice: "পরিবহন বাদ দেওয়ার পর কার্যকর দাম",

    openMap: "ম্যাপ খুলুন",

    noMandiFound:
      "আপনার প্রোফাইলের অবস্থানের কাছাকাছি কোনো মণ্ডি পাওয়া যায়নি।",

    mandiSearchError:
      "এই মুহূর্তে কাছাকাছি মণ্ডির তথ্য পাওয়া যাচ্ছে না। আবার চেষ্টা করুন।",

    importantBeforeSelling: "⚠️ বিক্রির আগে গুরুত্বপূর্ণ বিষয়",

    tip1:
      "সম্ভব হলে একাধিক কাছাকাছি মণ্ডির দাম তুলনা করুন।",

    tip2:
      "ফসলের গুণমান, আর্দ্রতা এবং গ্রেডিং চূড়ান্ত দামকে প্রভাবিত করতে পারে।",

    tip3:
      "সামান্য বেশি দামের মণ্ডি বেছে নেওয়ার আগে পরিবহন খরচ বিবেচনা করুন।",

    tip4:
      "চূড়ান্ত বিক্রির সিদ্ধান্তের আগে সর্বশেষ মণ্ডির দাম যাচাই করুন।",

    estimateNote:
      "মণ্ডির দাম আনুমানিক। পরিবহন খরচও আনুমানিক এবং গাড়ি, পরিমাণ, রাস্তা ও দূরত্ব অনুযায়ী পরিবর্তিত হতে পারে।",

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
    loadingText:
      "சந்தை தகவலைத் தயாரிக்கிறோம். தயவுசெய்து காத்திருக்கவும்.",

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
      "உங்கள் சுயவிவரத்தில் சேமிக்கப்பட்ட இடத்திற்கு அருகிலுள்ள விவசாய சந்தைகளைத் தேடுங்கள்.",

    findMandi: "அருகிலுள்ள சந்தையைக் கண்டறியவும் →",
    searchingMandi: "அருகிலுள்ள சந்தைகளைத் தேடுகிறது...",

    profileLocation: "சுயவிவர இடம்",
    locationNotFound:
      "சுயவிவர இடம் கிடைக்கவில்லை. உங்கள் சுயவிவரத்தில் கிராமம், நகரம், மாவட்டம் அல்லது பின்கோடு சேர்க்கவும்.",

    locationUsed:
      "உங்கள் சுயவிவரத்தில் சேமிக்கப்பட்ட இடத்தைச் சுற்றி சந்தைகள் தேடப்படுகின்றன.",

    distance: "தூரம்",
    km: "கிமீ",

    mandiRate: "சந்தை விலை",
    transportCharge: "போக்குவரத்து",
    estimatedTransport: "மதிப்பிடப்பட்ட போக்குவரத்து",

    effectivePrice: "போக்குவரத்து கழித்த பின் விலை",

    openMap: "வரைபடத்தைத் திறக்கவும்",

    noMandiFound:
      "உங்கள் சுயவிவர இடத்திற்கு அருகில் சந்தை கிடைக்கவில்லை.",

    mandiSearchError:
      "தற்போது அருகிலுள்ள சந்தைகளைக் கண்டறிய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

    importantBeforeSelling: "⚠️ விற்பனைக்கு முன் முக்கியமானவை",

    tip1:
      "முடிந்தால் ஒன்றுக்கும் மேற்பட்ட அருகிலுள்ள சந்தைகளின் விலைகளை ஒப்பிடுங்கள்.",

    tip2:
      "பயிரின் தரம், ஈரப்பதம் மற்றும் தரப்படுத்தல் இறுதி விலையை பாதிக்கலாம்.",

    tip3:
      "சற்று அதிக விலை உள்ள சந்தையைத் தேர்ந்தெடுப்பதற்கு முன் போக்குவரத்து செலவைக் கருத்தில் கொள்ளுங்கள்.",

    tip4:
      "விற்பனை முடிவை எடுப்பதற்கு முன் சமீபத்திய சந்தை விலையை சரிபார்க்கவும்.",

    estimateNote:
      "சந்தை விலைகள் மதிப்பிடப்பட்டவை. போக்குவரத்து செலவும் மதிப்பிடப்பட்டதே; வாகனம், அளவு, சாலை மற்றும் தூரத்தைப் பொறுத்து மாறலாம்.",

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

    findMandi: "సమీప మార్కెట్‌ను కనుగొనండి →",
    searchingMandi: "సమీప మార్కెట్లను వెతుకుతోంది...",

    profileLocation: "ప్రొఫైల్ స్థానం",
    locationNotFound:
      "ప్రొఫైల్ స్థానం కనుగొనబడలేదు. మీ ప్రొఫైల్‌లో గ్రామం, నగరం, జిల్లా లేదా పిన్‌కోడ్‌ను జోడించండి.",

    locationUsed:
      "మీ ప్రొఫైల్‌లో సేవ్ చేసిన ప్రదేశం చుట్టూ మార్కెట్లను వెతుకుతున్నాము.",

    distance: "దూరం",
    km: "కి.మీ",

    mandiRate: "మార్కెట్ ధర",
    transportCharge: "రవాణా",
    estimatedTransport: "అంచనా రవాణా",

    effectivePrice: "రవాణా ఖర్చు తర్వాత ధర",

    openMap: "మ్యాప్ తెరవండి",

    noMandiFound:
      "మీ ప్రొఫైల్ స్థానం సమీపంలో మార్కెట్ కనుగొనబడలేదు.",

    mandiSearchError:
      "ప్రస్తుతం సమీప మార్కెట్లను కనుగొనలేకపోతున్నాము. మళ్లీ ప్రయత్నించండి.",

    importantBeforeSelling: "⚠️ అమ్మకానికి ముందు ముఖ్యమైన విషయాలు",

    tip1:
      "సాధ్యమైనప్పుడు ఒకటి కంటే ఎక్కువ సమీప మార్కెట్ల ధరలను పోల్చండి.",

    tip2:
      "పంట నాణ్యత, తేమ మరియు గ్రేడింగ్ తుది ధరను ప్రభావితం చేయవచ్చు.",

    tip3:
      "కొంచెం ఎక్కువ ధర ఉన్న మార్కెట్‌ను ఎంచుకునే ముందు రవాణా ఖర్చును పరిగణించండి.",

    tip4:
      "చివరి అమ్మకం నిర్ణయం తీసుకునే ముందు తాజా మార్కెట్ ధరను తనిఖీ చేయండి.",

    estimateNote:
      "మార్కెట్ ధరలు అంచనా మాత్రమే. రవాణా ఖర్చు కూడా అంచనా మాత్రమే మరియు వాహనం, పరిమాణం, రహదారి మరియు దూరాన్ని బట్టి మారవచ్చు.",

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

    findMandi: "નજીકની મંડી શોધો →",
    searchingMandi: "નજીકની મંડીઓ શોધી રહ્યા છીએ...",

    profileLocation: "પ્રોફાઇલનું સ્થાન",
    locationNotFound:
      "પ્રોફાઇલનું સ્થાન મળ્યું નથી. તમારી પ્રોફાઇલમાં ગામ, શહેર, જિલ્લો અથવા પિનકોડ ઉમેરો.",

    locationUsed:
      "તમારી પ્રોફાઇલમાં સેવ કરેલા સ્થાનની આસપાસ મંડીઓ શોધવામાં આવી રહી છે.",

    distance: "અંતર",
    km: "કિમી",

    mandiRate: "મંડી ભાવ",
    transportCharge: "પરિવહન",
    estimatedTransport: "અંદાજિત પરિવહન",

    effectivePrice: "પરિવહન બાદ અસરકારક ભાવ",

    openMap: "નકશો ખોલો",

    noMandiFound:
      "તમારી પ્રોફાઇલના સ્થાનની આસપાસ કોઈ નજીકની મંડી મળી નથી.",

    mandiSearchError:
      "હાલમાં નજીકની મંડી શોધી શકાતી નથી. ફરી પ્રયાસ કરો.",

    importantBeforeSelling: "⚠️ વેચાણ પહેલાં મહત્વપૂર્ણ બાબતો",

    tip1:
      "શક્ય હોય ત્યારે એક કરતાં વધુ નજીકની મંડીના ભાવની તુલના કરો.",

    tip2:
      "પાકની ગુણવત્તા, ભેજ અને ગ્રેડિંગ અંતિમ કિંમતને અસર કરી શકે છે.",

    tip3:
      "થોડી વધુ કિંમતવાળી મંડી પસંદ કરતા પહેલાં પરિવહન ખર્ચ ધ્યાનમાં લો.",

    tip4:
      "વેચાણનો અંતિમ નિર્ણય લેતા પહેલાં નવીનતમ મંડી ભાવ તપાસો.",

    estimateNote:
      "મંડીના ભાવ અંદાજિત છે. પરિવહન ખર્ચ પણ અંદાજિત છે અને વાહન, જથ્થો, રસ્તો અને અંતર પ્રમાણે બદલાઈ શકે છે.",

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
      "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಉಳಿಸಿದ ಸ್ಥಳದ ಸುತ್ತಲಿನ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಿ.",

    findMandi: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ →",
    searchingMandi: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",

    profileLocation: "ಪ್ರೊಫೈಲ್ ಸ್ಥಳ",
    locationNotFound:
      "ಪ್ರೊಫೈಲ್ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ. ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಗ್ರಾಮ, ನಗರ, ಜಿಲ್ಲೆ ಅಥವಾ ಪಿನ್‌ಕೋಡ್ ಸೇರಿಸಿ.",

    locationUsed:
      "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಉಳಿಸಿದ ಸ್ಥಳದ ಸುತ್ತ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ.",

    distance: "ದೂರ",
    km: "ಕಿ.ಮೀ",

    mandiRate: "ಮಾರುಕಟ್ಟೆ ದರ",
    transportCharge: "ಸಾರಿಗೆ",
    estimatedTransport: "ಅಂದಾಜು ಸಾರಿಗೆ",

    effectivePrice: "ಸಾರಿಗೆ ನಂತರದ ಪರಿಣಾಮಕಾರಿ ದರ",

    openMap: "ನಕ್ಷೆ ತೆರೆಯಿರಿ",

    noMandiFound:
      "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಸ್ಥಳದ ಹತ್ತಿರ ಮಾರುಕಟ್ಟೆ ಕಂಡುಬಂದಿಲ್ಲ.",

    mandiSearchError:
      "ಈಗ ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",

    importantBeforeSelling: "⚠️ ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಮುಖ್ಯ ವಿಷಯಗಳು",

    tip1:
      "ಸಾಧ್ಯವಾದರೆ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳ ದರಗಳನ್ನು ಹೋಲಿಸಿ.",

    tip2:
      "ಬೆಳೆಯ ಗುಣಮಟ್ಟ, ತೇವಾಂಶ ಮತ್ತು ಗ್ರೇಡಿಂಗ್ ಅಂತಿಮ ಬೆಲೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಬಹುದು.",

    tip3:
      "ಸ್ವಲ್ಪ ಹೆಚ್ಚಿನ ಬೆಲೆ ಇರುವ ಮಾರುಕಟ್ಟೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡುವ ಮೊದಲು ಸಾರಿಗೆ ವೆಚ್ಚವನ್ನು ಪರಿಗಣಿಸಿ.",

    tip4:
      "ಅಂತಿಮ ಮಾರಾಟ ನಿರ್ಧಾರ ಮಾಡುವ ಮೊದಲು ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ದರವನ್ನು ಪರಿಶೀಲಿಸಿ.",

    estimateNote:
      "ಮಾರುಕಟ್ಟೆ ದರಗಳು ಅಂದಾಜು. ಸಾರಿಗೆ ವೆಚ್ಚವೂ ಅಂದಾಜು ಮತ್ತು ವಾಹನ, ಪ್ರಮಾಣ, ರಸ್ತೆ ಹಾಗೂ ದೂರದ ಆಧಾರದ ಮೇಲೆ ಬದಲಾಗಬಹುದು.",

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
    loadingText:
      "ദയവായി കാത്തിരിക്കുക, വിപണി വിവരങ്ങൾ തയ്യാറാക്കുകയാണ്.",

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
      "നിങ്ങളുടെ പ്രൊഫൈലിൽ സംരക്ഷിച്ച സ്ഥലത്തിന് സമീപമുള്ള കാർഷിക വിപണികൾ കണ്ടെത്തുക.",

    findMandi: "സമീപത്തെ വിപണി കണ്ടെത്തുക →",
    searchingMandi: "സമീപത്തെ വിപണികൾ തിരയുന്നു...",

    profileLocation: "പ്രൊഫൈൽ സ്ഥലം",
    locationNotFound:
      "പ്രൊഫൈൽ സ്ഥലം കണ്ടെത്തിയില്ല. നിങ്ങളുടെ പ്രൊഫൈലിൽ ഗ്രാമം, നഗരം, ജില്ല അല്ലെങ്കിൽ പിൻകോഡ് ചേർക്കുക.",

    locationUsed:
      "നിങ്ങളുടെ പ്രൊഫൈലിൽ സംരക്ഷിച്ച സ്ഥലത്തിന് ചുറ്റുമുള്ള വിപണികൾ തിരയുന്നു.",

    distance: "ദൂരം",
    km: "കി.മീ",

    mandiRate: "വിപണി വില",
    transportCharge: "ഗതാഗതം",
    estimatedTransport: "ഏകദേശ ഗതാഗത ചെലവ്",

    effectivePrice: "ഗതാഗത ചെലവിന് ശേഷമുള്ള വില",

    openMap: "മാപ്പ് തുറക്കുക",

    noMandiFound:
      "നിങ്ങളുടെ പ്രൊഫൈൽ സ്ഥലത്തിന് സമീപം വിപണി കണ്ടെത്താനായില്ല.",

    mandiSearchError:
      "ഇപ്പോൾ സമീപത്തെ വിപണികൾ കണ്ടെത്താൻ കഴിയുന്നില്ല. വീണ്ടും ശ്രമിക്കുക.",

    importantBeforeSelling:
      "⚠️ വിൽക്കുന്നതിന് മുമ്പ് ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ",

    tip1:
      "സാധ്യമെങ്കിൽ ഒന്നിലധികം സമീപ വിപണികളിലെ വില താരതമ്യം ചെയ്യുക.",

    tip2:
      "വിളയുടെ ഗുണനിലവാരം, ഈർപ്പം, ഗ്രേഡിംഗ് എന്നിവ അന്തിമ വിലയെ ബാധിക്കും.",

    tip3:
      "അൽപ്പം ഉയർന്ന വിലയുള്ള വിപണി തിരഞ്ഞെടുക്കുന്നതിന് മുമ്പ് ഗതാഗതച്ചെലവ് പരിഗണിക്കുക.",

    tip4:
      "അന്തിമ വിൽപ്പന തീരുമാനം എടുക്കുന്നതിന് മുമ്പ് ഏറ്റവും പുതിയ വിപണി വില പരിശോധിക്കുക.",

    estimateNote:
      "വിപണി വിലകൾ ഏകദേശമാണ്. ഗതാഗത ചെലവും ഏകദേശമാണ്, വാഹനവും അളവും റോഡും ദൂരവും അനുസരിച്ച് മാറാം.",

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

    findMandi: "ਨੇੜਲੀ ਮੰਡੀ ਲੱਭੋ →",
    searchingMandi: "ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਲੱਭੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ...",

    profileLocation: "ਪ੍ਰੋਫਾਈਲ ਦੀ ਜਗ੍ਹਾ",
    locationNotFound:
      "ਪ੍ਰੋਫਾਈਲ ਦੀ ਜਗ੍ਹਾ ਨਹੀਂ ਮਿਲੀ। ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਪਿੰਡ, ਸ਼ਹਿਰ, ਜ਼ਿਲ੍ਹਾ ਜਾਂ ਪਿੰਨ ਕੋਡ ਜੋੜੋ।",

    locationUsed:
      "ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਕੀਤੀ ਜਗ੍ਹਾ ਦੇ ਆਸ-ਪਾਸ ਮੰਡੀਆਂ ਲੱਭੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ।",

    distance: "ਦੂਰੀ",
    km: "ਕਿ.ਮੀ.",

    mandiRate: "ਮੰਡੀ ਭਾਅ",
    transportCharge: "ਆਵਾਜਾਈ",
    estimatedTransport: "ਅੰਦਾਜ਼ਨ ਆਵਾਜਾਈ",

    effectivePrice: "ਆਵਾਜਾਈ ਤੋਂ ਬਾਅਦ ਪ੍ਰਭਾਵੀ ਭਾਅ",

    openMap: "ਨਕਸ਼ਾ ਖੋਲ੍ਹੋ",

    noMandiFound:
      "ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਦੀ ਜਗ੍ਹਾ ਦੇ ਨੇੜੇ ਕੋਈ ਮੰਡੀ ਨਹੀਂ ਮਿਲੀ।",

    mandiSearchError:
      "ਇਸ ਸਮੇਂ ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੀ ਜਾਣਕਾਰੀ ਨਹੀਂ ਮਿਲ ਰਹੀ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",

    importantBeforeSelling: "⚠️ ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਗੱਲਾਂ",

    tip1:
      "ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ, ਇੱਕ ਤੋਂ ਵੱਧ ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰੋ।",

    tip2:
      "ਫਸਲ ਦੀ ਗੁਣਵੱਤਾ, ਨਮੀ ਅਤੇ ਗ੍ਰੇਡਿੰਗ ਅੰਤਿਮ ਕੀਮਤ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੀ ਹੈ।",

    tip3:
      "ਥੋੜ੍ਹੇ ਵੱਧ ਭਾਅ ਵਾਲੀ ਮੰਡੀ ਚੁਣਨ ਤੋਂ ਪਹਿਲਾਂ ਆਵਾਜਾਈ ਦਾ ਖਰਚਾ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ।",

    tip4:
      "ਅੰਤਿਮ ਵਿਕਰੀ ਦਾ ਫੈਸਲਾ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਨਵਾਂ ਮੰਡੀ ਭਾਅ ਜ਼ਰੂਰ ਜਾਂਚੋ।",

    estimateNote:
      "ਮੰਡੀ ਦੇ ਭਾਅ ਅੰਦਾਜ਼ਨ ਹਨ। ਆਵਾਜਾਈ ਖਰਚਾ ਵੀ ਅੰਦਾਜ਼ਨ ਹੈ ਅਤੇ ਵਾਹਨ, ਮਾਤਰਾ, ਸੜਕ ਅਤੇ ਦੂਰੀ ਅਨੁਸਾਰ ਬਦਲ ਸਕਦਾ ਹੈ।",

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

    findMandi: "ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜନ୍ତୁ →",
    searchingMandi: "ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜାଯାଉଛି...",

    profileLocation: "ପ୍ରୋଫାଇଲ ସ୍ଥାନ",
    locationNotFound:
      "ପ୍ରୋଫାଇଲ ସ୍ଥାନ ମିଳିଲା ନାହିଁ। ପ୍ରୋଫାଇଲରେ ଗାଁ, ସହର, ଜିଲ୍ଲା କିମ୍ବା ପିନକୋଡ୍ ଯୋଡନ୍ତୁ।",

    locationUsed:
      "ଆପଣଙ୍କ ପ୍ରୋଫାଇଲରେ ସେଭ୍ ହୋଇଥିବା ସ୍ଥାନ ଚାରିପାଖରେ ମଣ୍ଡି ଖୋଜାଯାଉଛି।",

    distance: "ଦୂରତା",
    km: "କି.ମି.",

    mandiRate: "ମଣ୍ଡି ଦର",
    transportCharge: "ପରିବହନ",
    estimatedTransport: "ଆନୁମାନିକ ପରିବହନ",

    effectivePrice: "ପରିବହନ ପରେ ପ୍ରଭାବୀ ଦର",

    openMap: "ମାନଚିତ୍ର ଖୋଲନ୍ତୁ",

    noMandiFound:
      "ଆପଣଙ୍କ ପ୍ରୋଫାଇଲ ସ୍ଥାନ ନିକଟରେ କୌଣସି ମଣ୍ଡି ମିଳିଲା ନାହିଁ।",

    mandiSearchError:
      "ବର୍ତ୍ତମାନ ନିକଟସ୍ଥ ମଣ୍ଡି ସୂଚନା ମିଳୁନାହିଁ। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",

    importantBeforeSelling: "⚠️ ବିକ୍ରି ପୂର୍ବରୁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",

    tip1:
      "ସମ୍ଭବ ହେଲେ ଏକାଧିକ ନିକଟସ୍ଥ ମଣ୍ଡିର ଦର ତୁଳନା କରନ୍ତୁ।",

    tip2:
      "ଫସଲର ଗୁଣବତ୍ତା, ଆର୍ଦ୍ରତା ଏବଂ ଗ୍ରେଡିଂ ଶେଷ ମୂଲ୍ୟକୁ ପ୍ରଭାବିତ କରିପାରେ।",

    tip3:
      "ସାମାନ୍ୟ ଅଧିକ ଦର ଥିବା ମଣ୍ଡି ବାଛିବା ପୂର୍ବରୁ ପରିବହନ ଖର୍ଚ୍ଚ ବିଚାର କରନ୍ତୁ।",

    tip4:
      "ଶେଷ ବିକ୍ରି ନିଷ୍ପତ୍ତି ପୂର୍ବରୁ ନୂତନ ମଣ୍ଡି ଦର ଯାଞ୍ଚ କରନ୍ତୁ।",

    estimateNote:
      "ମଣ୍ଡି ଦର ଆନୁମାନିକ। ପରିବହନ ଖର୍ଚ୍ଚ ମଧ୍ୟ ଆନୁମାନିକ ଏବଂ ଯାନ, ପରିମାଣ, ରାସ୍ତା ଓ ଦୂରତା ଅନୁସାରେ ବଦଳିପାରେ।",

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

    findMandi: "ওচৰৰ মণ্ডি বিচাৰক →",
    searchingMandi: "ওচৰৰ মণ্ডি বিচাৰি থকা হৈছে...",

    profileLocation: "প্ৰফাইলৰ স্থান",
    locationNotFound:
      "প্ৰফাইলৰ স্থান পোৱা নগ'ল। প্ৰফাইলত গাঁও, চহৰ, জিলা বা পিনকোড যোগ কৰক।",

    locationUsed:
      "আপোনাৰ প্ৰফাইলত সংৰক্ষিত স্থানৰ চাৰিওফালে মণ্ডি বিচৰা হৈছে।",

    distance: "দূৰত্ব",
    km: "কিমি",

    mandiRate: "মণ্ডিৰ মূল্য",
    transportCharge: "পৰিবহণ",
    estimatedTransport: "আনুমানিক পৰিবহণ",

    effectivePrice: "পৰিবহণ বাদ দিয়াৰ পিছৰ মূল্য",

    openMap: "মানচিত্ৰ খোলক",

    noMandiFound:
      "আপোনাৰ প্ৰফাইলৰ স্থানৰ ওচৰত কোনো মণ্ডি পোৱা নগ'ল।",

    mandiSearchError:
      "এই মুহূৰ্তত ওচৰৰ মণ্ডিৰ তথ্য পোৱা নাই। পুনৰ চেষ্টা কৰক।",

    importantBeforeSelling: "⚠️ বিক্ৰীৰ আগতে গুৰুত্বপূৰ্ণ কথা",

    tip1:
      "সম্ভৱ হ'লে এটাতকৈ অধিক ওচৰৰ মণ্ডিৰ মূল্য তুলনা কৰক।",

    tip2:
      "শস্যৰ গুণগত মান, আৰ্দ্ৰতা আৰু গ্ৰেডিঙে চূড়ান্ত মূল্যত প্ৰভাৱ পেলাব পাৰে।",

    tip3:
      "অলপ বেছি মূল্য থকা মণ্ডি বাছনি কৰাৰ আগতে পৰিবহণৰ খৰচ বিবেচনা কৰক।",

    tip4:
      "চূড়ান্ত বিক্ৰীৰ সিদ্ধান্ত লোৱাৰ আগতে শেহতীয়া মণ্ডিৰ মূল্য পৰীক্ষা কৰক।",

    estimateNote:
      "মণ্ডিৰ মূল্য আনুমানিক। পৰিবহণৰ খৰচো আনুমানিক আৰু বাহন, পৰিমাণ, পথ আৰু দূৰত্বৰ ওপৰত নিৰ্ভৰ কৰি সলনি হ'ব পাৰে।",

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
      "آپ کے پروفائل میں محفوظ مقام کے قریب زرعی منڈیاں تلاش کریں۔",

    findMandi: "قریبی منڈی تلاش کریں →",
    searchingMandi: "قریبی منڈیاں تلاش کی جا رہی ہیں...",

    profileLocation: "پروفائل کا مقام",
    locationNotFound:
      "پروفائل کا مقام نہیں ملا۔ اپنے پروفائل میں گاؤں، شہر، ضلع یا پن کوڈ شامل کریں۔",

    locationUsed:
      "آپ کے پروفائل میں محفوظ مقام کے آس پاس منڈیاں تلاش کی جا رہی ہیں۔",

    distance: "فاصلہ",
    km: "کلومیٹر",

    mandiRate: "منڈی ریٹ",
    transportCharge: "ٹرانسپورٹ",
    estimatedTransport: "تخمینی ٹرانسپورٹ",

    effectivePrice: "ٹرانسپورٹ کے بعد مؤثر ریٹ",

    openMap: "نقشہ کھولیں",

    noMandiFound:
      "آپ کے پروفائل کے مقام کے قریب کوئی منڈی نہیں ملی۔",

    mandiSearchError:
      "اس وقت قریبی منڈیوں کی معلومات حاصل نہیں ہو رہی۔ دوبارہ کوشش کریں۔",

    importantBeforeSelling: "⚠️ فروخت سے پہلے اہم باتیں",

    tip1:
      "جہاں ممکن ہو ایک سے زیادہ قریبی منڈیوں کے ریٹس کا موازنہ کریں۔",

    tip2:
      "فصل کا معیار، نمی اور گریڈنگ حتمی قیمت کو متاثر کر سکتے ہیں۔",

    tip3:
      "تھوڑی زیادہ قیمت والی منڈی منتخب کرنے سے پہلے نقل و حمل کے اخراجات کو مدنظر رکھیں۔",

    tip4:
      "حتمی فروخت کا فیصلہ کرنے سے پہلے تازہ ترین منڈی ریٹ ضرور چیک کریں۔",

    estimateNote:
      "منڈی کے ریٹس اندازاً ہیں۔ ٹرانسپورٹ خرچ بھی اندازاً ہے اور گاڑی، مقدار، سڑک اور فاصلے کے مطابق بدل سکتا ہے۔",

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
   CROP MARKET DATA
========================================================= */

function getMarketData(
  cropName: string,
  t: Translation,
  language: string
): MarketInfo {
  const name = cropName.toLowerCase();

  if (
    name.includes("wheat") ||
    name.includes("गेह") ||
    name.includes("गहू") ||
    name.includes("গম") ||
    name.includes("கோதுமை") ||
    name.includes("గోధుమ") ||
    name.includes("ઘઉં") ||
    name.includes("ಗೋಧಿ")
  ) {
    return {
      crop: cropName,
      price: "₹2,400 – ₹2,600",
      unit: t.unitQuintal,
      trend: t.trendStable,
      advice:
        language === "hi"
          ? "बेचने से पहले आसपास की मंडियों के भाव की तुलना करें। यदि स्थानीय भाव असामान्य रूप से कम है तो तुरंत बेचने से बचें।"
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
    name.includes("ಅಕ್ಕಿ")
  ) {
    return {
      crop: cropName,
      price: "₹2,200 – ₹2,500",
      unit: t.unitQuintal,
      trend: t.trendModerate,
      advice:
        language === "hi"
          ? "धान की गुणवत्ता की आवश्यकताओं को जाँचें और फसल मंडी ले जाने से पहले मंडी के भाव की तुलना करें।"
          : "Check rice quality requirements and compare mandi rates before taking your crop to market.",
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
    name.includes("ಮೆಕ್ಕೆಜೋಳ")
  ) {
    return {
      crop: cropName,
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
    name.includes("ಆಲೂಗಡ್ಡೆ")
  ) {
    return {
      crop: cropName,
      price: "₹1,200 – ₹1,800",
      unit: t.unitQuintal,
      trend: t.trendVariable,
      advice:
        language === "hi"
          ? "आलू के भाव जल्दी बदल सकते हैं। बेचने से पहले आज का स्थानीय भाव और भंडारण के विकल्प देखें।"
          : "Potato prices can change quickly. Compare today's local rates and storage options before selling.",
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
    name.includes("ಕಬ್ಬು")
  ) {
    return {
      crop: cropName,
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
    price: t.unknownPrice,
    unit: "",
    trend: t.trendCheck,
    advice:
      language === "hi"
        ? "इस फसल का नवीनतम भाव जानने के लिए अपनी नज़दीकी मंडी या कृषि बाजार से संपर्क करें।"
        : "Check your nearest mandi or agriculture market for the latest price of this crop.",
  };
}

/* =========================================================
   GET NUMERIC MARKET RATE
========================================================= */

function getAverageRate(price: string): number {
  const numbers = price.match(/\d[\d,]*/g);

  if (!numbers || numbers.length === 0) {
    return 0;
  }

  const values = numbers
    .map((value) => Number(value.replace(/,/g, "")))
    .filter((value) => !Number.isNaN(value));

  if (values.length === 0) {
    return 0;
  }

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length
  );
}

/* =========================================================
   PROFILE LOCATION
   IMPORTANT:
   NO GPS IS USED HERE.
========================================================= */

function getProfileLocation(): string {
  const profileKeys = [
    "farmerProfile",
    "userProfile",
    "profile",
    "farmer",
    "user",
  ];

  for (const key of profileKeys) {
    const raw = localStorage.getItem(key);

    if (!raw) continue;

    try {
      const data: unknown = JSON.parse(raw);

      /* Direct string */
      if (typeof data === "string") {
        const value = data.trim();

        if (value) {
          return value;
        }

        continue;
      }

      /* Object */
      if (data && typeof data === "object") {
        const obj = data as Record<string, unknown>;

        const locationParts = [
          obj.location,
          obj.profileLocation,
          obj.address,
          obj.village,
          obj.city,
          obj.district,
          obj.state,
          obj.pincode,
        ];

        const validParts = locationParts
          .filter(
            (value): value is string =>
              typeof value === "string" &&
              value.trim().length > 0
          )
          .map((value) => value.trim());

        if (validParts.length > 0) {
          return [...new Set(validParts)].join(", ");
        }
      }
    } catch {
      continue;
    }
  }

  /*
    Extra fallback:
    Kabhi profile alag-alag localStorage keys me save hoti hai.
  */

  const separateKeys = [
    "profileLocation",
    "location",
    "farmerLocation",
    "address",
    "village",
    "city",
    "district",
    "state",
    "pincode",
  ];

  const separateParts: string[] = [];

  for (const key of separateKeys) {
    const value = localStorage.getItem(key);

    if (value && value.trim()) {
      separateParts.push(value.trim());
    }
  }

  if (separateParts.length > 0) {
    return [...new Set(separateParts)].join(", ");
  }

  return "";
}

/* =========================================================
   GEOCODING
   Profile location -> Latitude / Longitude

   IMPORTANT:
   Browser geolocation / GPS is NOT used.
========================================================= */

type Coordinates = {
  lat: number;
  lon: number;
  displayName: string;
};

async function geocodeProfileLocation(
  location: string
): Promise<Coordinates | null> {
  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: location,
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

    const data = (await response.json()) as Array<{
      lat: string;
      lon: string;
      display_name: string;
    }>;

    if (!data || data.length === 0) {
      return null;
    }

    const first = data[0];

    return {
      lat: Number(first.lat),
      lon: Number(first.lon),
      displayName: first.display_name,
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
   OSM / OVERPASS MANDI SEARCH
========================================================= */

type OverpassElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: Record<string, string>;
};

async function searchNearbyMandis(
  lat: number,
  lon: number,
  cropRate: number
): Promise<Mandi[]> {
  /*
    50 km radius.
    Sirf market / marketplace / agricultural related places.
  */

  const radius = 50000;

  const query = `
    [out:json][timeout:25];

    (
      node["amenity"="marketplace"](around:${radius},${lat},${lon});
      way["amenity"="marketplace"](around:${radius},${lat},${lon});
      relation["amenity"="marketplace"](around:${radius},${lat},${lon});

      node["marketplace"="farm"](around:${radius},${lat},${lon});
      way["marketplace"="farm"](around:${radius},${lat},${lon});
      relation["marketplace"="farm"](around:${radius},${lat},${lon});

      node["name"~"mandi|Mandi|market|Market|bazar|Bazaar|agricultural|Agricultural",i](around:${radius},${lat},${lon});
      way["name"~"mandi|Mandi|market|Market|bazar|Bazaar|agricultural|Agricultural",i](around:${radius},${lat},${lon});
      relation["name"~"mandi|Mandi|market|Market|bazar|Bazaar|agricultural|Agricultural",i](around:${radius},${lat},${lon});
    );

    out center tags;
  `;

  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
  ];

  let elements: OverpassElement[] = [];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        body: query,
      });

      if (!response.ok) {
        continue;
      }

      const data = (await response.json()) as {
        elements?: OverpassElement[];
      };

      if (data.elements && data.elements.length > 0) {
        elements = data.elements;
        break;
      }
    } catch {
      continue;
    }
  }

  if (elements.length === 0) {
    return [];
  }

  const seen = new Set<string>();

  const mandis: Mandi[] = [];

  for (const element of elements) {
    const elementLat =
      element.lat ?? element.center?.lat;

    const elementLon =
      element.lon ?? element.center?.lon;

    if (
      typeof elementLat !== "number" ||
      typeof elementLon !== "number"
    ) {
      continue;
    }

    const tags = element.tags || {};

    const name =
      tags.name ||
      tags["name:en"] ||
      tags["name:hi"] ||
      "Agricultural Market";

    const key = `${name}-${elementLat.toFixed(
      4
    )}-${elementLon.toFixed(4)}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);

    const distance = calculateDistance(
      lat,
      lon,
      elementLat,
      elementLon
    );

    /*
      Estimated transport:
      ₹15 per km per quintal.

      This is intentionally shown as an estimate,
      not as an exact transport quotation.
    */

    const transportPerKm = 15;

    const transportCharge = Math.max(
      15,
      Math.round(distance * transportPerKm)
    );

    const effectiveRate =
      cropRate > 0
        ? Math.max(0, cropRate - transportCharge)
        : 0;

    const addressParts = [
      tags["addr:place"],
      tags["addr:village"],
      tags["addr:city"],
      tags["addr:district"],
      tags["addr:state"],
    ].filter(Boolean);

    const address =
      addressParts.length > 0
        ? addressParts.join(", ")
        : "Nearby agricultural market";

    mandis.push({
      id: `${element.type}-${element.id}`,
      name,
      address,
      lat: elementLat,
      lon: elementLon,
      distance,
      rate: cropRate > 0
        ? `₹${cropRate.toLocaleString("en-IN")}`
        : "Rate unavailable",
      transportPerQuintal: transportCharge,
      transportText:
        cropRate > 0
          ? `₹${transportCharge.toLocaleString("en-IN")}/quintal`
          : `₹${transportCharge.toLocaleString("en-IN")}`,
      effectiveRate:
        cropRate > 0
          ? `₹${effectiveRate.toLocaleString("en-IN")}`
          : "—",
    });
  }

  /*
    Nearest first.
  */

  mandis.sort(
    (a, b) => a.distance - b.distance
  );

  /*
    Show maximum 10 mandis.
  */

  return mandis.slice(0, 10);
}

/* =========================================================
   MAP
========================================================= */

function openMap(
  lat: number,
  lon: number,
  name: string
) {
  const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${lat},${lon}`) +
    "&query_place_id=" +
    encodeURIComponent(name);

  window.open(url, "_blank", "noopener,noreferrer");
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

  const [loading, setLoading] =
    useState(true);

  const [profileLocation, setProfileLocation] =
    useState("");

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [mandis, setMandis] =
    useState<Mandi[]>([]);

  const [mandiError, setMandiError] =
    useState("");

  /* =====================================================
     LOAD LANGUAGE + CROP
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

    if (!savedCrops) {
      setLoading(false);
      return;
    }

    try {
      const crops: Crop[] =
        JSON.parse(savedCrops);

      const selectedCrop = crops.find(
        (item: Crop) =>
          item.id === Number(params.id)
      );

      if (selectedCrop) {
        setCrop(selectedCrop);
      }
    } catch {
      setCrop(null);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  const t =
    translations[language] ||
    translations.en;

  /* =====================================================
     LOAD PROFILE LOCATION
  ===================================================== */

  useEffect(() => {
    if (loading) {
      return;
    }

    const location =
      getProfileLocation();

    setProfileLocation(location);
  }, [loading]);

  /* =====================================================
     SEASON NAME
  ===================================================== */

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

  /* =====================================================
     FIND MANDI
  ===================================================== */

  const handleFindMandi = async () => {
    setMandiError("");
    setMandis([]);

    const location =
      getProfileLocation();

    setProfileLocation(location);

    if (!location) {
      setMandiError(
        t.locationNotFound
      );

      return;
    }

    setLocationLoading(true);

    try {
      const coordinates =
        await geocodeProfileLocation(
          location
        );

      if (!coordinates) {
        setMandiError(
          t.mandiSearchError
        );

        return;
      }

      const market =
        getMarketData(
          crop?.crop || "",
          t,
          language
        );

      const cropRate =
        getAverageRate(
          market.price
        );

      const results =
        await searchNearbyMandis(
          coordinates.lat,
          coordinates.lon,
          cropRate
        );

      if (results.length === 0) {
        setMandiError(
          t.noMandiFound
        );

        return;
      }

      setMandis(results);
    } catch {
      setMandiError(
        t.mandiSearchError
      );
    } finally {
      setLocationLoading(false);
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

  if (!crop) {
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

  /* =====================================================
     MARKET INFO
  ===================================================== */

  const market =
    getMarketData(
      crop.crop,
      t,
      language
    );

  const landUnit =
    crop.landUnit || "acres";

  /* =====================================================
     UI
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

        {/* ================================================
            BACK
        ================================================= */}

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

        {/* ================================================
            HEADER
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl shrink-0">
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
                {crop.crop}{" "}
                {t.market}
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

        {/* ================================================
            CURRENT MARKET
        ================================================= */}

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

              {market.unit && (
                <p className="text-sm text-gray-500 mt-1">
                  {market.unit}
                </p>
              )}
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

        {/* ================================================
            SELLING ADVICE
        ================================================= */}

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

        {/* ================================================
            NEARBY MANDI
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.nearbyMarket}
          </h2>

          <p className="text-gray-600 mt-2">
            {t.nearbyMarketDescription}
          </p>

          {/* PROFILE LOCATION */}

          <div className="mt-5 rounded-2xl bg-blue-50 border border-blue-100 p-5">

            <div className="flex gap-3">

              <div className="text-2xl">
                📍
              </div>

              <div className="min-w-0">

                <p className="text-sm font-semibold text-blue-700">
                  {t.profileLocation}
                </p>

                {profileLocation ? (
                  <p className="font-semibold text-blue-900 mt-1 break-words">
                    {profileLocation}
                  </p>
                ) : (
                  <p className="text-red-700 mt-1">
                    {t.locationNotFound}
                  </p>
                )}

              </div>

            </div>

            {profileLocation && (
              <p className="text-sm text-blue-700 mt-3">
                ✓ {t.locationUsed}
              </p>
            )}

          </div>

          {/* FIND BUTTON */}

          <button
            onClick={
              handleFindMandi
            }
            disabled={
              locationLoading ||
              !profileLocation
            }
            className={`mt-6 px-6 py-3 rounded-xl text-white font-bold transition ${
              locationLoading ||
              !profileLocation
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {locationLoading
              ? `⏳ ${t.searchingMandi}`
              : t.findMandi}
          </button>

          {/* ERROR */}

          {mandiError && (
            <div className="mt-5 bg-red-50 border border-red-200 rounded-2xl p-5">
              <p className="text-red-800 font-semibold">
                ⚠️ {mandiError}
              </p>
            </div>
          )}

          {/* ============================================
              MANDI RESULTS
          ============================================ */}

          {mandis.length > 0 && (
            <div className="mt-8">

              <div className="flex items-center justify-between gap-3 mb-5">

                <h3 className="text-xl font-bold text-green-800">
                  🏪 {t.nearbyMarket}
                </h3>

                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                  {mandis.length}
                </span>

              </div>

              <div className="space-y-5">

                {mandis.map(
                  (
                    mandi,
                    index
                  ) => (
                    <div
                      key={
                        mandi.id
                      }
                      className="border border-green-100 rounded-3xl p-5 hover:shadow-md transition bg-gradient-to-br from-white to-green-50"
                    >

                      {/* HEADER */}

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                        <div className="flex gap-4">

                          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl shrink-0">
                            🏪
                          </div>

                          <div>

                            <p className="text-xs font-bold text-green-600">
                              #{index + 1}
                            </p>

                            <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                              {mandi.name}
                            </h4>

                            <p className="text-sm text-gray-500 mt-1">
                              {mandi.address}
                            </p>

                          </div>

                        </div>

                        <div className="bg-green-700 text-white rounded-2xl px-4 py-2 text-center shrink-0">

                          <p className="text-xs opacity-90">
                            {t.distance}
                          </p>

                          <p className="text-lg font-bold">
                            {mandi.distance.toFixed(
                              1
                            )}{" "}
                            {t.km}
                          </p>

                        </div>

                      </div>

                      {/* INFORMATION GRID */}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">

                        {/* RATE */}

                        <div className="bg-white rounded-2xl border border-green-100 p-4">

                          <p className="text-xs text-gray-500">
                            💰{" "}
                            {t.mandiRate}
                          </p>

                          <p className="text-xl font-bold text-green-800 mt-1">
                            {mandi.rate}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {t.unitQuintal}
                          </p>

                        </div>

                        {/* TRANSPORT */}

                        <div className="bg-white rounded-2xl border border-orange-100 p-4">

                          <p className="text-xs text-gray-500">
                            🚚{" "}
                            {t.transportCharge}
                          </p>

                          <p className="text-xl font-bold text-orange-700 mt-1">
                            ₹
                            {mandi.transportPerQuintal.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {t.estimatedTransport}{" "}
                            / quintal
                          </p>

                        </div>

                        {/* EFFECTIVE */}

                        <div className="bg-white rounded-2xl border border-blue-100 p-4">

                          <p className="text-xs text-gray-500">
                            📊{" "}
                            {t.effectivePrice}
                          </p>

                          <p className="text-xl font-bold text-blue-800 mt-1">
                            {
                              mandi.effectiveRate
                            }
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {t.unitQuintal}
                          </p>

                        </div>

                      </div>

                      {/* BUTTON */}

                      <button
                        onClick={() =>
                          openMap(
                            mandi.lat,
                            mandi.lon,
                            mandi.name
                          )
                        }
                        className="mt-5 w-full sm:w-auto px-5 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 transition"
                      >
                        📍{" "}
                        {t.openMap}
                      </button>

                    </div>
                  )
                )}

              </div>

            </div>
          )}

          {/* NOTE */}

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">

            <p className="text-sm text-yellow-900 leading-relaxed">
              ℹ️ {t.estimateNote}
            </p>

          </div>

        </div>

        {/* ================================================
            IMPORTANT TIPS
        ================================================= */}

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