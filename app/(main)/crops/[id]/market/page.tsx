
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
  price: number;
  minPrice: number;
  maxPrice: number;
  transportCharge: number;
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

  detectingLocation: string;
  locationDenied: string;
  locationError: string;
  noMandiFound: string;

  distance: string;
  mandiRate: string;
  minRate: string;
  maxRate: string;
  modalRate: string;
  transport: string;
  effectiveRate: string;
  perQuintal: string;
  directions: string;
  refresh: string;

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
  unitQuintal: string;
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
      "Find nearby agricultural markets, compare prices, distance and transportation cost.",

    findMandi: "Find Nearby Mandi →",

    detectingLocation: "Detecting your location...",
    locationDenied:
      "Location permission was denied. Please allow location access and try again.",
    locationError:
      "Unable to detect your location. Please try again.",
    noMandiFound:
      "No nearby mandi was found in this area.",

    distance: "Distance",
    mandiRate: "Mandi Rate",
    minRate: "Minimum",
    maxRate: "Maximum",
    modalRate: "Modal",
    transport: "Estimated Transport",
    effectiveRate: "Effective Rate",
    perQuintal: "per quintal",
    directions: "Get Directions",
    refresh: "Refresh",

    importantBeforeSelling: "⚠️ Important Before Selling",

    tip1:
      "Compare prices from more than one nearby mandi whenever possible.",
    tip2:
      "Crop quality, moisture and grading can affect the final selling price.",
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
      "आस-पास की कृषि मंडियों को खोजें और भाव, दूरी तथा परिवहन खर्च की तुलना करें।",

    findMandi: "नज़दीकी मंडी खोजें →",

    detectingLocation: "आपकी लोकेशन खोजी जा रही है...",
    locationDenied:
      "लोकेशन की अनुमति नहीं मिली। कृपया लोकेशन की अनुमति देकर फिर कोशिश करें।",
    locationError:
      "आपकी लोकेशन नहीं मिल सकी। कृपया दोबारा कोशिश करें।",
    noMandiFound:
      "इस क्षेत्र में कोई नज़दीकी मंडी नहीं मिली।",

    distance: "दूरी",
    mandiRate: "मंडी भाव",
    minRate: "न्यूनतम",
    maxRate: "अधिकतम",
    modalRate: "मॉडल भाव",
    transport: "अनुमानित परिवहन खर्च",
    effectiveRate: "परिवहन के बाद प्रभावी भाव",
    perQuintal: "प्रति क्विंटल",
    directions: "रास्ता देखें",
    refresh: "फिर से खोजें",

    importantBeforeSelling: "⚠️ बेचने से पहले जरूरी बातें",

    tip1:
      "जहाँ संभव हो, एक से अधिक नज़दीकी मंडियों के भाव की तुलना करें।",
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
      "जवळच्या बाजारपेठा शोधा आणि दर, अंतर व वाहतूक खर्चाची तुलना करा.",

    findMandi: "जवळची बाजारपेठ शोधा →",

    detectingLocation: "तुमचे स्थान शोधत आहे...",
    locationDenied:
      "स्थानाची परवानगी मिळाली नाही. कृपया स्थानाची परवानगी देऊन पुन्हा प्रयत्न करा.",
    locationError: "तुमचे स्थान सापडले नाही. पुन्हा प्रयत्न करा.",
    noMandiFound: "या भागात जवळची बाजारपेठ सापडली नाही.",

    distance: "अंतर",
    mandiRate: "बाजारभाव",
    minRate: "किमान",
    maxRate: "कमाल",
    modalRate: "मॉडल",
    transport: "अंदाजे वाहतूक खर्च",
    effectiveRate: "वाहतूक वजा केल्यानंतरचा दर",
    perQuintal: "प्रति क्विंटल",
    directions: "मार्ग पहा",
    refresh: "पुन्हा शोधा",

    importantBeforeSelling: "⚠️ विक्रीपूर्वी महत्त्वाच्या गोष्टी",

    tip1:
      "शक्य असल्यास एकापेक्षा जास्त जवळच्या बाजारपेठांमधील दरांची तुलना करा.",
    tip2:
      "पिकाची गुणवत्ता, ओलावा आणि दर्जा अंतिम किंमतीवर परिणाम करू शकतो.",
    tip3:
      "थोडा जास्त दर असलेली बाजारपेठ निवडण्यापूर्वी वाहतूक खर्चाचा विचार करा.",
    tip4:
      "विक्रीचा अंतिम निर्णय घेण्यापूर्वी नवीनतम बाजारभाव तपासा.",

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
    loadingText: "অনুগ্রহ করে অপেক্ষা করুন।",

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
      "কাছাকাছি কৃষি বাজার খুঁজুন এবং দাম, দূরত্ব ও পরিবহন খরচ তুলনা করুন।",

    findMandi: "কাছাকাছি মণ্ডি খুঁজুন →",

    detectingLocation: "আপনার অবস্থান খোঁজা হচ্ছে...",
    locationDenied:
      "লোকেশন অনুমতি পাওয়া যায়নি। অনুগ্রহ করে অনুমতি দিয়ে আবার চেষ্টা করুন।",
    locationError: "আপনার অবস্থান পাওয়া যায়নি। আবার চেষ্টা করুন।",
    noMandiFound: "এই এলাকায় কোনো কাছাকাছি মণ্ডি পাওয়া যায়নি।",

    distance: "দূরত্ব",
    mandiRate: "মণ্ডির দাম",
    minRate: "সর্বনিম্ন",
    maxRate: "সর্বোচ্চ",
    modalRate: "মডাল",
    transport: "আনুমানিক পরিবহন খরচ",
    effectiveRate: "পরিবহন বাদ দেওয়ার পর কার্যকর দাম",
    perQuintal: "প্রতি কুইন্টাল",
    directions: "রাস্তা দেখুন",
    refresh: "আবার খুঁজুন",

    importantBeforeSelling: "⚠️ বিক্রির আগে গুরুত্বপূর্ণ বিষয়",

    tip1:
      "সম্ভব হলে একাধিক কাছাকাছি মণ্ডির দাম তুলনা করুন।",
    tip2:
      "ফসলের গুণমান, আর্দ্রতা এবং গ্রেডিং চূড়ান্ত দামকে প্রভাবিত করতে পারে।",
    tip3:
      "সামান্য বেশি দামের মণ্ডি বেছে নেওয়ার আগে পরিবহন খরচ বিবেচনা করুন।",
    tip4:
      "চূড়ান্ত বিক্রির সিদ্ধান্তের আগে সর্বশেষ মণ্ডির দাম যাচাই করুন।",

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
    loadingText: "தயவுசெய்து காத்திருக்கவும்.",

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
      "அருகிலுள்ள விவசாய சந்தைகளைக் கண்டறிந்து விலை, தூரம் மற்றும் போக்குவரத்து செலவை ஒப்பிடுங்கள்.",

    findMandi: "அருகிலுள்ள சந்தையைக் கண்டறியவும் →",

    detectingLocation: "உங்கள் இருப்பிடத்தை கண்டறிகிறது...",
    locationDenied:
      "இருப்பிட அனுமதி மறுக்கப்பட்டது. அனுமதி வழங்கி மீண்டும் முயற்சிக்கவும்.",
    locationError: "உங்கள் இருப்பிடம் கிடைக்கவில்லை. மீண்டும் முயற்சிக்கவும்.",
    noMandiFound: "இந்த பகுதியில் அருகிலுள்ள சந்தை கிடைக்கவில்லை.",

    distance: "தூரம்",
    mandiRate: "சந்தை விலை",
    minRate: "குறைந்தபட்சம்",
    maxRate: "அதிகபட்சம்",
    modalRate: "மாடல்",
    transport: "மதிப்பிடப்பட்ட போக்குவரத்து செலவு",
    effectiveRate: "போக்குவரத்து கழித்த பிறகு கிடைக்கும் விலை",
    perQuintal: "ஒரு குவிண்டாலுக்கு",
    directions: "வழியைப் பார்க்கவும்",
    refresh: "மீண்டும் தேடவும்",

    importantBeforeSelling: "⚠️ விற்பனைக்கு முன் முக்கியமானவை",

    tip1:
      "முடிந்தால் ஒன்றுக்கும் மேற்பட்ட அருகிலுள்ள சந்தைகளின் விலைகளை ஒப்பிடுங்கள்.",
    tip2:
      "பயிரின் தரம், ஈரப்பதம் மற்றும் தரப்படுத்தல் இறுதி விலையை பாதிக்கலாம்.",
    tip3:
      "சற்று அதிக விலை உள்ள சந்தையைத் தேர்ந்தெடுப்பதற்கு முன் போக்குவரத்து செலவைக் கருத்தில் கொள்ளுங்கள்.",
    tip4:
      "விற்பனை முடிவை எடுப்பதற்கு முன் சமீபத்திய சந்தை விலையை சரிபார்க்கவும்.",

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
    loadingText: "దయచేసి వేచి ఉండండి.",

    cropNotFound: "పంట కనుగొనబడలేదు",
    backToCrops: "పంటలకు తిరిగి వెళ్లండి",

    currentMarket: "📊 ప్రస్తుత మార్కెట్ సమాచారం",
    marketDescription:
      "మీ పంటకు సంబంధించిన అంచనా సమాచారం. అమ్మకానికి ముందు స్థానిక మార్కెట్ తాజా ధరను తనిఖీ చేయండి.",

    cropLabel: "పంట",
    indicativePrice: "అంచనా ధర",
    marketTrend: "మార్కెట్ ధోరణి",

    sellingAdvice: "💡 అమ్మకం సలహా",

    nearbyMarket: "📍 సమీప మార్కెట్లు",
    nearbyMarketDescription:
      "సమీప వ్యవసాయ మార్కెట్లను కనుగొని ధర, దూరం మరియు రవాణా ఖర్చును పోల్చండి.",

    findMandi: "సమీప మార్కెట్‌ను కనుగొనండి →",

    detectingLocation: "మీ లొకేషన్‌ను గుర్తిస్తోంది...",
    locationDenied:
      "లొకేషన్ అనుమతి లేదు. అనుమతి ఇచ్చి మళ్లీ ప్రయత్నించండి.",
    locationError:
      "మీ లొకేషన్ కనుగొనబడలేదు. మళ్లీ ప్రయత్నించండి.",
    noMandiFound:
      "ఈ ప్రాంతంలో సమీప మార్కెట్ కనుగొనబడలేదు.",

    distance: "దూరం",
    mandiRate: "మార్కెట్ ధర",
    minRate: "కనిష్టం",
    maxRate: "గరిష్టం",
    modalRate: "మోడల్",
    transport: "అంచనా రవాణా ఖర్చు",
    effectiveRate: "రవాణా ఖర్చు తీసివేసిన తర్వాత ధర",
    perQuintal: "క్వింటాల్‌కు",
    directions: "దారి చూడండి",
    refresh: "మళ్లీ వెతకండి",

    importantBeforeSelling: "⚠️ అమ్మకానికి ముందు ముఖ్యమైన విషయాలు",

    tip1:
      "సాధ్యమైనప్పుడు ఒకటి కంటే ఎక్కువ సమీప మార్కెట్ల ధరలను పోల్చండి.",
    tip2:
      "పంట నాణ్యత, తేమ మరియు గ్రేడింగ్ తుది ధరను ప్రభావితం చేయవచ్చు.",
    tip3:
      "కొంచెం ఎక్కువ ధర ఉన్న మార్కెట్‌ను ఎంచుకునే ముందు రవాణా ఖర్చును పరిగణించండి.",
    tip4:
      "చివరి అమ్మకం నిర్ణయం తీసుకునే ముందు తాజా మార్కెట్ ధరను తనిఖీ చేయండి.",

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
    loadingText: "કૃપા કરીને રાહ જુઓ.",

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
      "નજીકના કૃષિ બજારો શોધો અને ભાવ, અંતર તથા પરિવહન ખર્ચની તુલના કરો.",

    findMandi: "નજીકની મંડી શોધો →",

    detectingLocation: "તમારું સ્થાન શોધી રહ્યા છીએ...",
    locationDenied:
      "લોકેશનની પરવાનગી મળી નથી. પરવાનગી આપીને ફરી પ્રયાસ કરો.",
    locationError:
      "તમારું સ્થાન મળી શક્યું નથી. ફરી પ્રયાસ કરો.",
    noMandiFound:
      "આ વિસ્તારમાં નજીકની મંડી મળી નથી.",

    distance: "અંતર",
    mandiRate: "મંડી ભાવ",
    minRate: "ન્યૂનતમ",
    maxRate: "મહત્તમ",
    modalRate: "મોડલ",
    transport: "અંદાજિત પરિવહન ખર્ચ",
    effectiveRate: "પરિવહન બાદનો અસરકારક ભાવ",
    perQuintal: "પ્રતિ ક્વિન્ટલ",
    directions: "રસ્તો જુઓ",
    refresh: "ફરી શોધો",

    importantBeforeSelling: "⚠️ વેચાણ પહેલાં મહત્વપૂર્ણ બાબતો",

    tip1:
      "શક્ય હોય ત્યારે એક કરતાં વધુ નજીકની મંડીના ભાવની તુલના કરો.",
    tip2:
      "પાકની ગુણવત્તા, ભેજ અને ગ્રેડિંગ અંતિમ કિંમતને અસર કરી શકે છે.",
    tip3:
      "થોડી વધુ કિંમતવાળી મંડી પસંદ કરતા પહેલાં પરિવહન ખર્ચ ધ્યાનમાં લો.",
    tip4:
      "વેચાણનો અંતિમ નિર્ણય લેતા પહેલાં નવીનતમ મંડી ભાવ તપાસો.",

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
    loadingText: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ.",

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
      "ಹತ್ತಿರದ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ದರ, ದೂರ ಹಾಗೂ ಸಾರಿಗೆ ವೆಚ್ಚವನ್ನು ಹೋಲಿಸಿ.",

    findMandi: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ →",

    detectingLocation: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    locationDenied:
      "ಸ್ಥಳ ಅನುಮತಿ ಲಭ್ಯವಿಲ್ಲ. ಅನುಮತಿ ನೀಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    locationError:
      "ನಿಮ್ಮ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    noMandiFound:
      "ಈ ಪ್ರದೇಶದಲ್ಲಿ ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ ಕಂಡುಬಂದಿಲ್ಲ.",

    distance: "ದೂರ",
    mandiRate: "ಮಾರುಕಟ್ಟೆ ದರ",
    minRate: "ಕನಿಷ್ಠ",
    maxRate: "ಗರಿಷ್ಠ",
    modalRate: "ಮಾಡಲ್",
    transport: "ಅಂದಾಜು ಸಾರಿಗೆ ವೆಚ್ಚ",
    effectiveRate: "ಸಾರಿಗೆ ವೆಚ್ಚದ ನಂತರದ ದರ",
    perQuintal: "ಪ್ರತಿ ಕ್ವಿಂಟಲ್",
    directions: "ದಾರಿ ನೋಡಿ",
    refresh: "ಮತ್ತೆ ಹುಡುಕಿ",

    importantBeforeSelling: "⚠️ ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಮುಖ್ಯ ವಿಷಯಗಳು",

    tip1:
      "ಸಾಧ್ಯವಾದರೆ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳ ದರಗಳನ್ನು ಹೋಲಿಸಿ.",
    tip2:
      "ಬೆಳೆಯ ಗುಣಮಟ್ಟ, ತೇವಾಂಶ ಮತ್ತು ಗ್ರೇಡಿಂಗ್ ಅಂತಿಮ ಬೆಲೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಬಹುದು.",
    tip3:
      "ಸ್ವಲ್ಪ ಹೆಚ್ಚಿನ ಬೆಲೆ ಇರುವ ಮಾರುಕಟ್ಟೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡುವ ಮೊದಲು ಸಾರಿಗೆ ವೆಚ್ಚವನ್ನು ಪರಿಗಣಿಸಿ.",
    tip4:
      "ಅಂತಿಮ ಮಾರಾಟ ನಿರ್ಧಾರ ಮಾಡುವ ಮೊದಲು ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ದರವನ್ನು ಪರಿಶೀಲಿಸಿ.",

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
    loadingText: "ദയവായി കാത്തിരിക്കുക.",

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
      "സമീപത്തെ കാർഷിക വിപണികൾ കണ്ടെത്തി വില, ദൂരം, ഗതാഗത ചെലവ് എന്നിവ താരതമ്യം ചെയ്യുക.",

    findMandi: "സമീപത്തെ വിപണി കണ്ടെത്തുക →",

    detectingLocation: "നിങ്ങളുടെ സ്ഥാനം കണ്ടെത്തുന്നു...",
    locationDenied:
      "ലൊക്കേഷൻ അനുമതി ലഭിച്ചില്ല. അനുമതി നൽകി വീണ്ടും ശ്രമിക്കുക.",
    locationError:
      "നിങ്ങളുടെ സ്ഥാനം കണ്ടെത്താൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക.",
    noMandiFound:
      "ഈ പ്രദേശത്ത് സമീപത്തെ വിപണി കണ്ടെത്താനായില്ല.",

    distance: "ദൂരം",
    mandiRate: "വിപണി വില",
    minRate: "കുറഞ്ഞത്",
    maxRate: "കൂടിയത്",
    modalRate: "മോഡൽ",
    transport: "ഏകദേശ ഗതാഗത ചെലവ്",
    effectiveRate: "ഗതാഗത ചെലവ് കുറച്ച ശേഷമുള്ള വില",
    perQuintal: "ക്വിന്റലിന്",
    directions: "വഴി കാണുക",
    refresh: "വീണ്ടും തിരയുക",

    importantBeforeSelling: "⚠️ വിൽക്കുന്നതിന് മുമ്പ് ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ",

    tip1:
      "സാധ്യമെങ്കിൽ ഒന്നിലധികം സമീപ വിപണികളിലെ വില താരതമ്യം ചെയ്യുക.",
    tip2:
      "വിളയുടെ ഗുണനിലവാരം, ഈർപ്പം, ഗ്രേഡിംഗ് എന്നിവ അന്തിമ വിലയെ ബാധിക്കും.",
    tip3:
      "അൽപ്പം ഉയർന്ന വിലയുള്ള വിപണി തിരഞ്ഞെടുക്കുന്നതിന് മുമ്പ് ഗതാഗതച്ചെലവ് പരിഗണിക്കുക.",
    tip4:
      "അന്തിമ വിൽപ്പന തീരുമാനം എടുക്കുന്നതിന് മുമ്പ് ഏറ്റവും പുതിയ വിപണി വില പരിശോധിക്കുക.",

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
    loadingText: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ।",

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
      "ਨੇੜਲੇ ਖੇਤੀਬਾੜੀ ਬਾਜ਼ਾਰ ਲੱਭੋ ਅਤੇ ਭਾਅ, ਦੂਰੀ ਅਤੇ ਆਵਾਜਾਈ ਦੇ ਖਰਚੇ ਦੀ ਤੁਲਨਾ ਕਰੋ।",

    findMandi: "ਨੇੜਲੀ ਮੰਡੀ ਲੱਭੋ →",

    detectingLocation: "ਤੁਹਾਡੀ ਲੋਕੇਸ਼ਨ ਲੱਭੀ ਜਾ ਰਹੀ ਹੈ...",
    locationDenied:
      "ਲੋਕੇਸ਼ਨ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਮਿਲੀ। ਇਜਾਜ਼ਤ ਦੇ ਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    locationError:
      "ਤੁਹਾਡੀ ਲੋਕੇਸ਼ਨ ਨਹੀਂ ਮਿਲੀ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    noMandiFound:
      "ਇਸ ਇਲਾਕੇ ਵਿੱਚ ਕੋਈ ਨੇੜਲੀ ਮੰਡੀ ਨਹੀਂ ਮਿਲੀ।",

    distance: "ਦੂਰੀ",
    mandiRate: "ਮੰਡੀ ਭਾਅ",
    minRate: "ਘੱਟੋ-ਘੱਟ",
    maxRate: "ਵੱਧ ਤੋਂ ਵੱਧ",
    modalRate: "ਮਾਡਲ",
    transport: "ਅੰਦਾਜ਼ਨ ਆਵਾਜਾਈ ਖਰਚਾ",
    effectiveRate: "ਆਵਾਜਾਈ ਕੱਟਣ ਤੋਂ ਬਾਅਦ ਭਾਅ",
    perQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ",
    directions: "ਰਸਤਾ ਵੇਖੋ",
    refresh: "ਦੁਬਾਰਾ ਖੋਜੋ",

    importantBeforeSelling: "⚠️ ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਗੱਲਾਂ",

    tip1:
      "ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ, ਇੱਕ ਤੋਂ ਵੱਧ ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰੋ।",
    tip2:
      "ਫਸਲ ਦੀ ਗੁਣਵੱਤਾ, ਨਮੀ ਅਤੇ ਗ੍ਰੇਡਿੰਗ ਅੰਤਿਮ ਕੀਮਤ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੀ ਹੈ।",
    tip3:
      "ਥੋੜ੍ਹੇ ਵੱਧ ਭਾਅ ਵਾਲੀ ਮੰਡੀ ਚੁਣਨ ਤੋਂ ਪਹਿਲਾਂ ਆਵਾਜਾਈ ਦਾ ਖਰਚਾ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ।",
    tip4:
      "ਅੰਤਿਮ ਵਿਕਰੀ ਦਾ ਫੈਸਲਾ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਨਵਾਂ ਮੰਡੀ ਭਾਅ ਜ਼ਰੂਰ ਜਾਂਚੋ।",

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
    loadingText: "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ।",

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
      "ନିକଟସ୍ଥ କୃଷି ବଜାର ଖୋଜନ୍ତୁ ଏବଂ ଦର, ଦୂରତା ଓ ପରିବହନ ଖର୍ଚ୍ଚ ତୁଳନା କରନ୍ତୁ।",

    findMandi: "ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜନ୍ତୁ →",

    detectingLocation: "ଆପଣଙ୍କ ଲୋକେସନ୍ ଖୋଜାଯାଉଛି...",
    locationDenied:
      "ଲୋକେସନ୍ ଅନୁମତି ମିଳିଲା ନାହିଁ। ଅନୁମତି ଦେଇ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
    locationError: "ଆପଣଙ୍କ ଲୋକେସନ୍ ମିଳିଲା ନାହିଁ।",
    noMandiFound:
      "ଏହି ଅଞ୍ଚଳରେ ନିକଟସ୍ଥ ମଣ୍ଡି ମିଳିଲା ନାହିଁ।",

    distance: "ଦୂରତା",
    mandiRate: "ମଣ୍ଡି ଦର",
    minRate: "ସର୍ବନିମ୍ନ",
    maxRate: "ସର୍ବାଧିକ",
    modalRate: "ମଡାଲ୍",
    transport: "ଆନୁମାନିକ ପରିବହନ ଖର୍ଚ୍ଚ",
    effectiveRate: "ପରିବହନ ପରେ ପ୍ରଭାବୀ ଦର",
    perQuintal: "ପ୍ରତି କ୍ୱିଣ୍ଟାଲ",
    directions: "ରାସ୍ତା ଦେଖନ୍ତୁ",
    refresh: "ପୁଣି ଖୋଜନ୍ତୁ",

    importantBeforeSelling: "⚠️ ବିକ୍ରି ପୂର୍ବରୁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",

    tip1:
      "ସମ୍ଭବ ହେଲେ ଏକାଧିକ ନିକଟସ୍ଥ ମଣ୍ଡିର ଦର ତୁଳନା କରନ୍ତୁ।",
    tip2:
      "ଫସଲର ଗୁଣବତ୍ତା, ଆର୍ଦ୍ରତା ଏବଂ ଗ୍ରେଡିଂ ଶେଷ ମୂଲ୍ୟକୁ ପ୍ରଭାବିତ କରିପାରେ।",
    tip3:
      "ସାମାନ୍ୟ ଅଧିକ ଦର ଥିବା ମଣ୍ଡି ବାଛିବା ପୂର୍ବରୁ ପରିବହନ ଖର୍ଚ୍ଚ ବିଚାର କରନ୍ତୁ।",
    tip4:
      "ଶେଷ ବିକ୍ରି ନିଷ୍ପତ୍ତି ପୂର୍ବରୁ ନୂତନ ମଣ୍ଡି ଦର ଯାଞ୍ଚ କରନ୍ତୁ।",

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
    loadingText: "অনুগ্ৰহ কৰি অপেক্ষা কৰক।",

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
      "ওচৰৰ কৃষি বজাৰ বিচাৰি উলিয়াওক আৰু মূল্য, দূৰত্ব আৰু পৰিবহণ খৰচ তুলনা কৰক।",

    findMandi: "ওচৰৰ মণ্ডি বিচাৰক →",

    detectingLocation: "আপোনাৰ অৱস্থান বিচৰা হৈছে...",
    locationDenied:
      "লোকেচনৰ অনুমতি পোৱা নগ'ল। অনুমতি দি পুনৰ চেষ্টা কৰক।",
    locationError: "আপোনাৰ অৱস্থান পোৱা নগ'ল।",
    noMandiFound:
      "এই অঞ্চলত কোনো ওচৰৰ মণ্ডি পোৱা নগ'ল।",

    distance: "দূৰত্ব",
    mandiRate: "মণ্ডিৰ মূল্য",
    minRate: "সৰ্বনিম্ন",
    maxRate: "সৰ্বাধিক",
    modalRate: "মডেল",
    transport: "আনুমানিক পৰিবহণ খৰচ",
    effectiveRate: "পৰিবহণ বাদ দিয়াৰ পিছৰ মূল্য",
    perQuintal: "প্ৰতি কুইণ্টল",
    directions: "ৰাস্তা চাওক",
    refresh: "পুনৰ বিচাৰক",

    importantBeforeSelling: "⚠️ বিক্ৰীৰ আগতে গুৰুত্বপূৰ্ণ কথা",

    tip1:
      "সম্ভৱ হ'লে এটাতকৈ অধিক ওচৰৰ মণ্ডিৰ মূল্য তুলনা কৰক।",
    tip2:
      "শস্যৰ গুণগত মান, আৰ্দ্ৰতা আৰু গ্ৰেডিঙে চূড়ান্ত মূল্যত প্ৰভাৱ পেলাব পাৰে।",
    tip3:
      "অলপ বেছি মূল্য থকা মণ্ডি বাছনি কৰাৰ আগতে পৰিবহণৰ খৰচ বিবেচনা কৰক।",
    tip4:
      "চূড়ান্ত বিক্ৰীৰ সিদ্ধান্ত লোৱাৰ আগতে শেহতীয়া মণ্ডিৰ মূল্য পৰীক্ষা কৰক।",

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
    loadingText: "براہ کرم انتظار کریں۔",

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
      "قریبی زرعی منڈیوں کو تلاش کریں اور ریٹ، فاصلہ اور نقل و حمل کے اخراجات کا موازنہ کریں۔",

    findMandi: "قریبی منڈی تلاش کریں →",

    detectingLocation: "آپ کی لوکیشن تلاش کی جا رہی ہے...",
    locationDenied:
      "لوکیشن کی اجازت نہیں ملی۔ اجازت دے کر دوبارہ کوشش کریں۔",
    locationError:
      "آپ کی لوکیشن نہیں مل سکی۔ دوبارہ کوشش کریں۔",
    noMandiFound:
      "اس علاقے میں کوئی قریبی منڈی نہیں ملی۔",

    distance: "فاصلہ",
    mandiRate: "منڈی ریٹ",
    minRate: "کم از کم",
    maxRate: "زیادہ سے زیادہ",
    modalRate: "ماڈل",
    transport: "متوقع ٹرانسپورٹ خرچ",
    effectiveRate: "ٹرانسپورٹ کے بعد مؤثر ریٹ",
    perQuintal: "فی کوئنٹل",
    directions: "راستہ دیکھیں",
    refresh: "دوبارہ تلاش کریں",

    importantBeforeSelling: "⚠️ فروخت سے پہلے اہم باتیں",

    tip1:
      "جہاں ممکن ہو ایک سے زیادہ قریبی منڈیوں کے ریٹس کا موازنہ کریں۔",
    tip2:
      "فصل کا معیار، نمی اور گریڈنگ حتمی قیمت کو متاثر کر سکتے ہیں۔",
    tip3:
      "تھوڑی زیادہ قیمت والی منڈی منتخب کرنے سے پہلے نقل و حمل کے اخراجات کو مدنظر رکھیں۔",
    tip4:
      "حتمی فروخت کا فیصلہ کرنے سے پہلے تازہ ترین منڈی ریٹ ضرور چیک کریں۔",

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

/* ---------------------------------------------------------
   DISTANCE CALCULATOR
--------------------------------------------------------- */

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/* ---------------------------------------------------------
   TRANSPORT ESTIMATE
--------------------------------------------------------- */

function calculateTransport(distanceKm: number) {
  /*
    Demo estimate:

    Tractor / local vehicle:
    ₹18 per km

    Minimum transport:
    ₹80

    Maximum shown here is only an estimate.

    IMPORTANT:
    Actual transport charge can differ according to:
    - vehicle
    - quantity
    - road
    - fuel
    - loading/unloading
    */

  return Math.max(80, Math.round(distanceKm * 18));
}

/* ---------------------------------------------------------
   DEMO MANDI DATABASE
   --------------------------------------------------------- */

const mandiDatabase = [
  {
    id: 1,
    name: "Local Krishi Mandi",
    address: "Nearby Agricultural Market",
    latOffset: 0.015,
    lngOffset: 0.012,
  },
  {
    id: 2,
    name: "Main Agricultural Mandi",
    address: "Main Market Yard",
    latOffset: -0.022,
    lngOffset: 0.018,
  },
  {
    id: 3,
    name: "APMC Mandi",
    address: "APMC Market Yard",
    latOffset: 0.028,
    lngOffset: -0.025,
  },
  {
    id: 4,
    name: "Grain Market",
    address: "Grain Market Area",
    latOffset: -0.035,
    lngOffset: -0.018,
  },
  {
    id: 5,
    name: "Farmers Market",
    address: "Agricultural Market",
    latOffset: 0.045,
    lngOffset: 0.035,
  },
];

/* ---------------------------------------------------------
   MARKET PAGE
--------------------------------------------------------- */

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] = useState("en");

  const [crop, setCrop] = useState<Crop | null>(null);

  const [loading, setLoading] = useState(true);

  const [mandiLoading, setMandiLoading] = useState(false);

  const [mandis, setMandis] = useState<Mandi[]>([]);

  const [locationError, setLocationError] = useState("");

  const [showMandis, setShowMandis] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }

    const savedCrops = localStorage.getItem("farmerCrops");

    if (!savedCrops) {
      setLoading(false);
      return;
    }

    try {
      const crops: Crop[] = JSON.parse(savedCrops);

      const selectedCrop = crops.find(
        (item: Crop) => item.id === Number(params.id)
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

  const t = translations[language] || translations.en;

  /* -------------------------------------------------------
     SEASON
  ------------------------------------------------------- */

  const getSeasonName = (season: string) => {
    if (season === "Kharif") return t.seasonNames.Kharif;
    if (season === "Rabi") return t.seasonNames.Rabi;
    if (season === "Zaid") return t.seasonNames.Zaid;
    if (season === "Other") return t.seasonNames.Other;

    return season;
  };

  /* -------------------------------------------------------
     MARKET INFO
  ------------------------------------------------------- */

  const getMarketInfo = (cropName: string): MarketInfo => {
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
  };

  /* -------------------------------------------------------
     GET PRICE FOR CROP
  ------------------------------------------------------- */

  const getMandiBasePrice = (cropName: string) => {
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
      return 2500;
    }

    if (
      name.includes("rice") ||
      name.includes("paddy") ||
      name.includes("धान") ||
      name.includes("चावल")
    ) {
      return 2350;
    }

    if (
      name.includes("maize") ||
      name.includes("corn") ||
      name.includes("मक्का")
    ) {
      return 2200;
    }

    if (
      name.includes("potato") ||
      name.includes("aloo") ||
      name.includes("आलू")
    ) {
      return 1500;
    }

    return 2000;
  };

  /* -------------------------------------------------------
     FIND NEARBY MANDIS
  ------------------------------------------------------- */

  const findNearbyMandis = () => {
    setMandiLoading(true);
    setLocationError("");
    setShowMandis(true);

    if (!navigator.geolocation) {
      setLocationError(t.locationError);
      setMandiLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const basePrice = getMandiBasePrice(crop?.crop || "");

        const results: Mandi[] = mandiDatabase
          .map((mandi) => {
            const lat = userLat + mandi.latOffset;
            const lng = userLng + mandi.lngOffset;

            const distance = calculateDistance(
              userLat,
              userLng,
              lat,
              lng
            );

            const transportCharge = calculateTransport(distance);

            /*
              Different mandis can have different rates.
              This creates realistic demo variation.
              
              IMPORTANT:
              For production, replace this with actual
              data.gov.in / Agmarknet API response.
            */

            const variation =
              mandi.id === 1
                ? 0
                : mandi.id === 2
                ? 35
                : mandi.id === 3
                ? -20
                : mandi.id === 4
                ? 55
                : -45;

            const modalPrice = basePrice + variation;

            const minPrice = modalPrice - 100;
            const maxPrice = modalPrice + 100;

            return {
              id: mandi.id,
              name: mandi.name,
              address: mandi.address,
              lat,
              lng,
              distance,
              price: modalPrice,
              minPrice,
              maxPrice,
              transportCharge,
            };
          })
          .filter((mandi) => mandi.distance <= 15)
          .sort((a, b) => a.distance - b.distance);

        setMandis(results);

        if (results.length === 0) {
          setLocationError(t.noMandiFound);
        }

        setMandiLoading(false);
      },
      () => {
        setLocationError(t.locationDenied);
        setMandiLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  };

  /* -------------------------------------------------------
     GOOGLE MAPS
  ------------------------------------------------------- */

  const openDirections = (mandi: Mandi) => {
    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${mandi.lat},${mandi.lng}`;

    window.open(url, "_blank");
  };

  /* -------------------------------------------------------
     LOADING
  ------------------------------------------------------- */

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

          <p className="text-gray-500 mt-2">{t.loadingText}</p>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------------
     CROP NOT FOUND
  ------------------------------------------------------- */

  if (!crop) {
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

  const market = getMarketInfo(crop.crop);

  const landUnit = crop.landUnit || "acres";

  /* -------------------------------------------------------
     PAGE
  ------------------------------------------------------- */

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => router.push(`/crops/${crop.id}`)}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.backTo} {crop.crop}
        </button>

        {/* HEADER */}
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

        {/* CURRENT MARKET */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

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

        {/* SELLING ADVICE */}
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

        {/* -------------------------------------------------
             NEARBY MANDI
        ------------------------------------------------- */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold text-green-800">
                {t.nearbyMarket}
              </h2>

              <p className="text-gray-600 mt-2">
                {t.nearbyMarketDescription}
              </p>
            </div>

            <button
              onClick={findNearbyMandis}
              disabled={mandiLoading}
              className="px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 disabled:opacity-60 transition"
            >
              {mandiLoading ? t.detectingLocation : t.findMandi}
            </button>

          </div>

          {/* ERROR */}
          {locationError && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
              {locationError}
            </div>
          )}

          {/* LOADING */}
          {mandiLoading && (
            <div className="mt-6 bg-green-50 rounded-2xl p-8 text-center">

              <div className="text-5xl mb-3">
                📍
              </div>

              <p className="font-semibold text-green-800">
                {t.detectingLocation}
              </p>

              <p className="text-gray-500 mt-2">
                {language === "hi"
                  ? "आपके आसपास की मंडियां खोजी जा रही हैं..."
                  : "Searching agricultural markets around you..."}
              </p>

            </div>
          )}

          {/* MANDI LIST */}
          {showMandis && !mandiLoading && mandis.length > 0 && (
            <div className="mt-7 space-y-5">

              {mandis.map((mandi, index) => {

                const effectiveRate =
                  mandi.price - mandi.transportCharge;

                return (
                  <div
                    key={mandi.id}
                    className="border border-green-100 rounded-3xl p-6 hover:shadow-md transition"
                  >

                    {/* TOP */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                      <div>

                        <div className="flex items-center gap-3">

                          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                            🏪
                          </div>

                          <div>

                            <div className="flex items-center gap-2 flex-wrap">

                              <h3 className="text-xl font-bold text-green-800">
                                {mandi.name}
                              </h3>

                              {index === 0 && (
                                <span className="text-xs font-bold bg-green-700 text-white px-3 py-1 rounded-full">
                                  {language === "hi"
                                    ? "सबसे पास"
                                    : "Nearest"}
                                </span>
                              )}

                            </div>

                            <p className="text-sm text-gray-500 mt-1">
                              {mandi.address}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* DISTANCE */}
                      <div className="bg-green-50 rounded-2xl px-5 py-3">

                        <p className="text-xs text-gray-500">
                          {t.distance}
                        </p>

                        <p className="text-lg font-bold text-green-800">
                          {mandi.distance.toFixed(1)} km
                        </p>

                      </div>

                    </div>

                    {/* PRICE GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                      {/* MODAL */}
                      <div className="bg-green-50 rounded-2xl p-4">

                        <p className="text-xs text-gray-500">
                          {t.modalRate}
                        </p>

                        <p className="text-xl font-bold text-green-800 mt-1">
                          ₹{mandi.price.toLocaleString("en-IN")}
                        </p>

                        <p className="text-xs text-gray-500">
                          {t.perQuintal}
                        </p>

                      </div>

                      {/* MIN */}
                      <div className="bg-gray-50 rounded-2xl p-4">

                        <p className="text-xs text-gray-500">
                          {t.minRate}
                        </p>

                        <p className="text-lg font-bold text-gray-800 mt-1">
                          ₹{mandi.minPrice.toLocaleString("en-IN")}
                        </p>

                        <p className="text-xs text-gray-500">
                          {t.perQuintal}
                        </p>

                      </div>

                      {/* MAX */}
                      <div className="bg-gray-50 rounded-2xl p-4">

                        <p className="text-xs text-gray-500">
                          {t.maxRate}
                        </p>

                        <p className="text-lg font-bold text-gray-800 mt-1">
                          ₹{mandi.maxPrice.toLocaleString("en-IN")}
                        </p>

                        <p className="text-xs text-gray-500">
                          {t.perQuintal}
                        </p>

                      </div>

                      {/* TRANSPORT */}
                      <div className="bg-orange-50 rounded-2xl p-4">

                        <p className="text-xs text-gray-500">
                          {t.transport}
                        </p>

                        <p className="text-lg font-bold text-orange-700 mt-1">
                          ₹{mandi.transportCharge}
                        </p>

                        <p className="text-xs text-gray-500">
                          {t.perQuintal}
                        </p>

                      </div>

                    </div>

                    {/* EFFECTIVE RATE */}
                    <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-5">

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                          <p className="text-sm text-blue-700 font-semibold">
                            💰 {t.effectiveRate}
                          </p>

                          <p className="text-3xl font-bold text-blue-900 mt-1">
                            ₹{effectiveRate.toLocaleString("en-IN")}
                          </p>

                          <p className="text-xs text-blue-600 mt-1">
                            {t.perQuintal}
                          </p>

                        </div>

                        <div className="text-sm text-blue-800">

                          <p>
                            {language === "hi"
                              ? "मंडी भाव"
                              : "Mandi price"}{" "}
                            ₹{mandi.price}
                          </p>

                          <p>
                            −{" "}
                            {language === "hi"
                              ? "परिवहन"
                              : "Transport"}{" "}
                            ₹{mandi.transportCharge}
                          </p>

                          <p className="font-bold mt-1">
                            = ₹{effectiveRate}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* BUTTON */}
                    <div className="mt-5 flex flex-col sm:flex-row gap-3">

                      <button
                        onClick={() => openDirections(mandi)}
                        className="flex-1 px-5 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 transition"
                      >
                        🗺️ {t.directions}
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

          {/* REFRESH */}
          {showMandis && !mandiLoading && mandis.length > 0 && (
            <button
              onClick={findNearbyMandis}
              className="mt-6 text-green-700 font-bold hover:text-green-900"
            >
              🔄 {t.refresh}
            </button>
          )}

        </div>

        {/* IMPORTANT TIPS */}
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