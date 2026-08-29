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
  mandiAlert: string;

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
    loadingText:
      "Please wait while we prepare market information.",

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
      "Find nearby agricultural markets and compare available selling opportunities.",

    findMandi: "Find Nearby Mandi →",

    mandiAlert:
      "Nearby mandi search will be connected with location services next.",

    importantBeforeSelling:
      "⚠️ Important Before Selling",

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
      "नज़दीकी कृषि मंडियों की जानकारी प्राप्त करें और बिक्री के विकल्पों की तुलना करें।",

    findMandi: "नज़दीकी मंडी खोजें →",

    mandiAlert:
      "नज़दीकी मंडी खोजने की सुविधा जल्द ही लोकेशन सेवा से जोड़ी जाएगी।",

    importantBeforeSelling:
      "⚠️ बेचने से पहले जरूरी बातें",

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
      "जवळच्या कृषी बाजारपेठा शोधा आणि विक्रीच्या संधींची तुलना करा.",

    findMandi: "जवळची बाजारपेठ शोधा →",

    mandiAlert:
      "जवळची बाजारपेठ शोधण्याची सुविधा लवकरच लोकेशन सेवेशी जोडली जाईल.",

    importantBeforeSelling:
      "⚠️ विक्रीपूर्वी महत्त्वाच्या गोष्टी",

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
      "কাছাকাছি কৃষি বাজার খুঁজুন এবং বিক্রির সুযোগগুলির তুলনা করুন।",

    findMandi: "কাছাকাছি মণ্ডি খুঁজুন →",

    mandiAlert:
      "কাছাকাছি মণ্ডি খোঁজার সুবিধা শীঘ্রই লোকেশন পরিষেবার সঙ্গে যুক্ত হবে।",

    importantBeforeSelling:
      "⚠️ বিক্রির আগে গুরুত্বপূর্ণ বিষয়",

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
      "அருகிலுள்ள விவசாய சந்தைகளைக் கண்டறிந்து விற்பனை வாய்ப்புகளை ஒப்பிடுங்கள்.",

    findMandi: "அருகிலுள்ள சந்தையைக் கண்டறியவும் →",

    mandiAlert:
      "அருகிலுள்ள சந்தையைத் தேடும் வசதி விரைவில் இருப்பிட சேவையுடன் இணைக்கப்படும்.",

    importantBeforeSelling:
      "⚠️ விற்பனைக்கு முன் முக்கியமானவை",

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
      "సమీపంలోని వ్యవసాయ మార్కెట్లను కనుగొని అమ్మకం అవకాశాలను పోల్చండి.",

    findMandi: "సమీప మార్కెట్‌ను కనుగొనండి →",

    mandiAlert:
      "సమీప మార్కెట్‌ను కనుగొనే సదుపాయం త్వరలో లొకేషన్ సేవతో అనుసంధానం చేయబడుతుంది.",

    importantBeforeSelling:
      "⚠️ అమ్మకానికి ముందు ముఖ్యమైన విషయాలు",

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
      "નજીકના કૃષિ બજારો શોધો અને વેચાણની તકોની તુલના કરો.",

    findMandi: "નજીકની મંડી શોધો →",

    mandiAlert:
      "નજીકની મંડી શોધવાની સુવિધા ટૂંક સમયમાં લોકેશન સેવા સાથે જોડાશે.",

    importantBeforeSelling:
      "⚠️ વેચાણ પહેલાં મહત્વપૂર્ણ બાબતો",

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
      "ಹತ್ತಿರದ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಮಾರಾಟದ ಅವಕಾಶಗಳನ್ನು ಹೋಲಿಸಿ.",

    findMandi: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ →",

    mandiAlert:
      "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ ಹುಡುಕುವ ಸೌಲಭ್ಯವನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸ್ಥಳ ಸೇವೆಯೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತದೆ.",

    importantBeforeSelling:
      "⚠️ ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಮುಖ್ಯ ವಿಷಯಗಳು",

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
      "സമീപത്തെ കാർഷിക വിപണികൾ കണ്ടെത്തി വിൽപ്പന അവസരങ്ങൾ താരതമ്യം ചെയ്യുക.",

    findMandi: "സമീപത്തെ വിപണി കണ്ടെത്തുക →",

    mandiAlert:
      "സമീപത്തെ വിപണി കണ്ടെത്താനുള്ള സൗകര്യം ഉടൻ ലൊക്കേഷൻ സേവനവുമായി ബന്ധിപ്പിക്കും.",

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
      "ਨੇੜਲੇ ਖੇਤੀਬਾੜੀ ਬਾਜ਼ਾਰ ਲੱਭੋ ਅਤੇ ਵਿਕਰੀ ਦੇ ਮੌਕਿਆਂ ਦੀ ਤੁਲਨਾ ਕਰੋ।",

    findMandi: "ਨੇੜਲੀ ਮੰਡੀ ਲੱਭੋ →",

    mandiAlert:
      "ਨੇੜਲੀ ਮੰਡੀ ਲੱਭਣ ਦੀ ਸਹੂਲਤ ਜਲਦੀ ਹੀ ਲੋਕੇਸ਼ਨ ਸੇਵਾ ਨਾਲ ਜੋੜੀ ਜਾਵੇਗੀ।",

    importantBeforeSelling:
      "⚠️ ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਗੱਲਾਂ",

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
      "ନିକଟସ୍ଥ କୃଷି ବଜାର ଖୋଜନ୍ତୁ ଏବଂ ବିକ୍ରି ସୁଯୋଗର ତୁଳନା କରନ୍ତୁ।",

    findMandi: "ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜନ୍ତୁ →",

    mandiAlert:
      "ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜିବା ସୁବିଧା ଶୀଘ୍ର ଲୋକେସନ୍ ସେବା ସହିତ ଯୋଡାଯିବ।",

    importantBeforeSelling:
      "⚠️ ବିକ୍ରି ପୂର୍ବରୁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",

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
      "ওচৰৰ কৃষি বজাৰ বিচাৰি উলিয়াওক আৰু বিক্ৰীৰ সুযোগ তুলনা কৰক।",

    findMandi: "ওচৰৰ মণ্ডি বিচাৰক →",

    mandiAlert:
      "ওচৰৰ মণ্ডি বিচৰাৰ সুবিধা অতি সোনকালে লোকেচন সেৱাৰ সৈতে সংযোগ কৰা হ'ব।",

    importantBeforeSelling:
      "⚠️ বিক্ৰীৰ আগতে গুৰুত্বপূৰ্ণ কথা",

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
      "قریبی زرعی منڈیوں کو تلاش کریں اور فروخت کے مواقع کا موازنہ کریں۔",

    findMandi: "قریبی منڈی تلاش کریں →",

    mandiAlert:
      "قریبی منڈی تلاش کرنے کی سہولت جلد ہی لوکیشن سروس سے منسلک کی جائے گی۔",

    importantBeforeSelling:
      "⚠️ فروخت سے پہلے اہم باتیں",

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

/* =========================================================
   HELPER: NORMALIZE LANGUAGE
========================================================= */

function normalizeLanguage(value: string | null): string {
  if (!value) return "en";

  const lang = value.toLowerCase().trim();

  /*
    Agar app mein language ka naam save ho raha ho
    jaise "Hindi", "हिंदी", etc. to bhi Hindi chalegi.
  */

  if (
    lang === "hi" ||
    lang === "hindi" ||
    lang === "हिंदी"
  ) {
    return "hi";
  }

  if (
    lang === "mr" ||
    lang === "marathi" ||
    lang === "मराठी"
  ) {
    return "mr";
  }

  if (
    lang === "bn" ||
    lang === "bengali" ||
    lang === "বাংলা"
  ) {
    return "bn";
  }

  if (
    lang === "ta" ||
    lang === "tamil" ||
    lang === "தமிழ்"
  ) {
    return "ta";
  }

  if (
    lang === "te" ||
    lang === "telugu" ||
    lang === "తెలుగు"
  ) {
    return "te";
  }

  if (
    lang === "gu" ||
    lang === "gujarati" ||
    lang === "ગુજરાતી"
  ) {
    return "gu";
  }

  if (
    lang === "kn" ||
    lang === "kannada" ||
    lang === "ಕನ್ನಡ"
  ) {
    return "kn";
  }

  if (
    lang === "ml" ||
    lang === "malayalam" ||
    lang === "മലയാളം"
  ) {
    return "ml";
  }

  if (
    lang === "pa" ||
    lang === "punjabi" ||
    lang === "ਪੰਜਾਬੀ"
  ) {
    return "pa";
  }

  if (
    lang === "or" ||
    lang === "odia" ||
    lang === "ଓଡ଼ିଆ"
  ) {
    return "or";
  }

  if (
    lang === "as" ||
    lang === "assamese" ||
    lang === "অসমীয়া"
  ) {
    return "as";
  }

  if (
    lang === "ur" ||
    lang === "urdu" ||
    lang === "اردو"
  ) {
    return "ur";
  }

  return translations[lang] ? lang : "en";
}

/* =========================================================
   CROP NAME DETECTION
========================================================= */

function isWheat(name: string) {
  const value = name.toLowerCase();

  return (
    value.includes("wheat") ||
    value.includes("गेह") ||
    value.includes("गहू") ||
    value.includes("গম") ||
    value.includes("கோதுமை") ||
    value.includes("గోధుమ") ||
    value.includes("ઘઉં") ||
    value.includes("ಗೋಧಿ") ||
    value.includes("गेहूं")
  );
}

function isRice(name: string) {
  const value = name.toLowerCase();

  return (
    value.includes("rice") ||
    value.includes("paddy") ||
    value.includes("धान") ||
    value.includes("चावल") ||
    value.includes("तांदूळ") ||
    value.includes("ধান") ||
    value.includes("அரிசி") ||
    value.includes("వరి") ||
    value.includes("చెట్టు") ||
    value.includes("ચોખા") ||
    value.includes("ಅಕ್ಕಿ")
  );
}

function isMaize(name: string) {
  const value = name.toLowerCase();

  return (
    value.includes("maize") ||
    value.includes("corn") ||
    value.includes("मक्का") ||
    value.includes("मका") ||
    value.includes("ভুট্টা") ||
    value.includes("மக்காச்சோளம்") ||
    value.includes("మొక్కజొన్న") ||
    value.includes("મકાઈ") ||
    value.includes("ಮೆಕ್ಕೆಜೋಳ")
  );
}

function isPotato(name: string) {
  const value = name.toLowerCase();

  return (
    value.includes("potato") ||
    value.includes("aloo") ||
    value.includes("आलू") ||
    value.includes("बटाटा") ||
    value.includes("আলু") ||
    value.includes("உருளைக்கிழங்கு") ||
    value.includes("బంగాళాదుంప") ||
    value.includes("બટાકા") ||
    value.includes("ಆಲೂಗಡ್ಡೆ")
  );
}

function isSugarcane(name: string) {
  const value = name.toLowerCase();

  return (
    value.includes("sugarcane") ||
    value.includes("ganna") ||
    value.includes("गन्ना") ||
    value.includes("ऊस") ||
    value.includes("আখ") ||
    value.includes("கரும்பு") ||
    value.includes("చెరకు") ||
    value.includes("શેરડી") ||
    value.includes("ಕಬ್ಬು")
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] = useState("en");
  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD LANGUAGE + CROP
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    try {
      /* -----------------------------
         LANGUAGE
      ----------------------------- */

      const savedLanguage =
        localStorage.getItem("selectedLanguage");

      const finalLanguage =
        normalizeLanguage(savedLanguage);

      if (mounted) {
        setLanguage(finalLanguage);
      }

      /* -----------------------------
         CROP
      ----------------------------- */

      const savedCrops =
        localStorage.getItem("farmerCrops");

      if (!savedCrops) {
        if (mounted) {
          setCrop(null);
          setLoading(false);
        }

        return;
      }

      const crops: Crop[] = JSON.parse(savedCrops);

      const cropId = Number(params.id);

      const selectedCrop = crops.find(
        (item) => Number(item.id) === cropId
      );

      if (mounted) {
        setCrop(selectedCrop || null);
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Market page loading error:",
        error
      );

      if (mounted) {
        setCrop(null);
        setLoading(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [params.id]);

  const t =
    translations[language] || translations.en;

  /* =======================================================
     SEASON
  ======================================================= */

  const getSeasonName = (season: string) => {
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
     MARKET INFO
  ======================================================= */

  const getMarketInfo = (
    cropName: string
  ): MarketInfo => {
    /* -----------------------------
       WHEAT
    ----------------------------- */

    if (isWheat(cropName)) {
      let advice =
        "Compare prices from nearby mandis before selling. Avoid selling immediately if the local price is unusually low.";

      if (language === "hi") {
        advice =
          "बेचने से पहले आसपास की मंडियों के भाव की तुलना करें। यदि स्थानीय भाव असामान्य रूप से कम है तो तुरंत बेचने से बचें।";
      } else if (language === "mr") {
        advice =
          "विक्रीपूर्वी जवळच्या बाजारपेठांमधील दरांची तुलना करा. स्थानिक दर खूप कमी असल्यास लगेच विक्री करणे टाळा.";
      } else if (language === "bn") {
        advice =
          "বিক্রির আগে কাছাকাছি মণ্ডির দাম তুলনা করুন। স্থানীয় দাম অস্বাভাবিকভাবে কম হলে সঙ্গে সঙ্গে বিক্রি করা এড়িয়ে চলুন।";
      } else if (language === "ta") {
        advice =
          "விற்பனைக்கு முன் அருகிலுள்ள சந்தைகளின் விலைகளை ஒப்பிடுங்கள். உள்ளூர் விலை மிகவும் குறைவாக இருந்தால் உடனடியாக விற்பதைத் தவிர்க்கவும்.";
      } else if (language === "te") {
        advice =
          "అమ్మకానికి ముందు సమీప మార్కెట్ల ధరలను పోల్చండి. స్థానిక ధర అసాధారణంగా తక్కువగా ఉంటే వెంటనే అమ్మకండి.";
      } else if (language === "gu") {
        advice =
          "વેચાણ પહેલાં નજીકની મંડીઓના ભાવની તુલના કરો. સ્થાનિક ભાવ અસામાન્ય રીતે ઓછો હોય તો તરત વેચવાનું ટાળો.";
      } else if (language === "kn") {
        advice =
          "ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳ ದರಗಳನ್ನು ಹೋಲಿಸಿ. ಸ್ಥಳೀಯ ದರ ಅಸಾಮಾನ್ಯವಾಗಿ ಕಡಿಮೆಯಿದ್ದರೆ ತಕ್ಷಣ ಮಾರಾಟ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ.";
      } else if (language === "ml") {
        advice =
          "വിൽപ്പനയ്ക്ക് മുമ്പ് സമീപത്തെ വിപണികളിലെ വില താരതമ്യം ചെയ്യുക. പ്രാദേശിക വില വളരെ കുറവാണെങ്കിൽ ഉടൻ വിൽക്കുന്നത് ഒഴിവാക്കുക.";
      } else if (language === "pa") {
        advice =
          "ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰੋ। ਜੇ ਸਥਾਨਕ ਭਾਅ ਬਹੁਤ ਘੱਟ ਹੈ ਤਾਂ ਤੁਰੰਤ ਵੇਚਣ ਤੋਂ ਬਚੋ।";
      } else if (language === "or") {
        advice =
          "ବିକ୍ରି ପୂର୍ବରୁ ନିକଟସ୍ଥ ମଣ୍ଡିର ଦର ତୁଳନା କରନ୍ତୁ। ସ୍ଥାନୀୟ ଦର ବହୁତ କମ୍ ଥିଲେ ତୁରନ୍ତ ବିକ୍ରି କରିବାରୁ ଦୂରେଇ ରୁହନ୍ତୁ।";
      } else if (language === "as") {
        advice =
          "বিক্ৰী কৰাৰ আগতে ওচৰৰ মণ্ডিৰ মূল্য তুলনা কৰক। স্থানীয় মূল্য অস্বাভাৱিকভাৱে কম হ'লে তৎক্ষণাত বিক্ৰী নকৰিব।";
      } else if (language === "ur") {
        advice =
          "فروخت سے پہلے قریبی منڈیوں کے ریٹس کا موازنہ کریں۔ اگر مقامی ریٹ غیر معمولی طور پر کم ہو تو فوراً فروخت کرنے سے گریز کریں۔";
      }

      return {
        crop: cropName,
        price: "₹2,400 – ₹2,600",
        unit: t.unitQuintal,
        trend: t.trendStable,
        advice,
      };
    }

    /* -----------------------------
       RICE
    ----------------------------- */

    if (isRice(cropName)) {
      let advice =
        "Check rice quality requirements and compare mandi rates before taking your crop to market.";

      if (language === "hi") {
        advice =
          "धान की गुणवत्ता की आवश्यकताओं को जाँचें और फसल मंडी ले जाने से पहले मंडी के भाव की तुलना करें।";
      } else if (language === "mr") {
        advice =
          "तांदळाच्या गुणवत्तेच्या आवश्यकतांची तपासणी करा आणि पीक बाजारात नेण्यापूर्वी बाजारभावाची तुलना करा.";
      } else if (language === "bn") {
        advice =
          "ধানের মানের প্রয়োজনীয়তা পরীক্ষা করুন এবং বাজারে নিয়ে যাওয়ার আগে মণ্ডির দাম তুলনা করুন।";
      } else if (language === "ta") {
        advice =
          "நெல் தரத் தேவைகளை சரிபார்த்து, பயிரை சந்தைக்கு எடுத்துச் செல்வதற்கு முன் சந்தை விலைகளை ஒப்பிடுங்கள்.";
      } else if (language === "te") {
        advice =
          "వరి నాణ్యత అవసరాలను తనిఖీ చేసి, పంటను మార్కెట్‌కు తీసుకెళ్లే ముందు ధరలను పోల్చండి.";
      } else if (language === "gu") {
        advice =
          "ચોખાની ગુણવત્તાની જરૂરિયાતો તપાસો અને પાક બજારમાં લઈ જતાં પહેલાં મંડીઓના ભાવની તુલના કરો.";
      } else if (language === "kn") {
        advice =
          "ಭತ್ತದ ಗುಣಮಟ್ಟದ ಅವಶ್ಯಕತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಬೆಳೆಯನ್ನು ಮಾರುಕಟ್ಟೆಗೆ ತೆಗೆದುಕೊಂಡು ಹೋಗುವ ಮೊದಲು ದರಗಳನ್ನು ಹೋಲಿಸಿ.";
      } else if (language === "ml") {
        advice =
          "നെല്ലിന്റെ ഗുണനിലവാര ആവശ്യകതകൾ പരിശോധിക്കുകയും വിള വിപണിയിലെത്തിക്കുന്നതിന് മുമ്പ് വിലകൾ താരതമ്യം ചെയ്യുകയും ചെയ്യുക.";
      } else if (language === "pa") {
        advice =
          "ਝੋਨੇ ਦੀ ਗੁਣਵੱਤਾ ਦੀਆਂ ਲੋੜਾਂ ਜਾਂਚੋ ਅਤੇ ਫਸਲ ਮੰਡੀ ਲੈ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰੋ।";
      } else if (language === "or") {
        advice =
          "ଧାନର ଗୁଣବତ୍ତା ଆବଶ୍ୟକତା ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ଫସଲ ବଜାରକୁ ନେବା ପୂର୍ବରୁ ଦର ତୁଳନା କରନ୍ତୁ।";
      } else if (language === "as") {
        advice =
          "ধানৰ গুণগত মানৰ প্ৰয়োজনীয়তা পৰীক্ষা কৰক আৰু শস্য বজাৰলৈ নিয়াৰ আগতে মণ্ডিৰ মূল্য তুলনা কৰক।";
      } else if (language === "ur") {
        advice =
          "چاول کے معیار کی ضروریات چیک کریں اور فصل منڈی لے جانے سے پہلے منڈی کے ریٹس کا موازنہ کریں۔";
      }

      return {
        crop: cropName,
        price: "₹2,200 – ₹2,500",
        unit: t.unitQuintal,
        trend: t.trendModerate,
        advice,
      };
    }

    /* -----------------------------
       MAIZE
    ----------------------------- */

    if (isMaize(cropName)) {
      let advice =
        "Check moisture and grain quality before selling because quality can affect the final price.";

      if (language === "hi") {
        advice =
          "बेचने से पहले नमी और दाने की गुणवत्ता जाँचें, क्योंकि गुणवत्ता अंतिम कीमत को प्रभावित कर सकती है।";
      } else if (language === "mr") {
        advice =
          "विक्रीपूर्वी ओलावा आणि दाण्याची गुणवत्ता तपासा, कारण गुणवत्तेमुळे अंतिम किंमत बदलू शकते.";
      } else if (language === "bn") {
        advice =
          "বিক্রির আগে আর্দ্রতা এবং শস্যের গুণমান পরীক্ষা করুন, কারণ গুণমান চূড়ান্ত দামকে প্রভাবিত করতে পারে।";
      } else if (language === "ta") {
        advice =
          "விற்பனைக்கு முன் ஈரப்பதம் மற்றும் தானியத்தின் தரத்தை சரிபார்க்கவும், ஏனெனில் தரம் இறுதி விலையை பாதிக்கலாம்.";
      } else if (language === "te") {
        advice =
          "అమ్మకానికి ముందు తేమ మరియు గింజల నాణ్యతను తనిఖీ చేయండి. నాణ్యత తుది ధరను ప్రభావితం చేయవచ్చు.";
      } else if (language === "gu") {
        advice =
          "વેચાણ પહેલાં ભેજ અને દાણાની ગુણવત્તા તપાસો, કારણ કે ગુણવત્તા અંતિમ ભાવને અસર કરી શકે છે.";
      } else if (language === "kn") {
        advice =
          "ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ತೇವಾಂಶ ಮತ್ತು ಧಾನ್ಯದ ಗುಣಮಟ್ಟವನ್ನು ಪರಿಶೀಲಿಸಿ. ಗುಣಮಟ್ಟವು ಅಂತಿಮ ಬೆಲೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಬಹುದು.";
      } else if (language === "ml") {
        advice =
          "വിൽപ്പനയ്ക്ക് മുമ്പ് ഈർപ്പവും ധാന്യത്തിന്റെ ഗുണനിലവാരവും പരിശോധിക്കുക. ഗുണനിലവാരം അന്തിമ വിലയെ ബാധിക്കും.";
      } else if (language === "pa") {
        advice =
          "ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਨਮੀ ਅਤੇ ਦਾਣੇ ਦੀ ਗੁਣਵੱਤਾ ਜਾਂਚੋ, ਕਿਉਂਕਿ ਗੁਣਵੱਤਾ ਅੰਤਿਮ ਕੀਮਤ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੀ ਹੈ।";
      } else if (language === "or") {
        advice =
          "ବିକ୍ରି ପୂର୍ବରୁ ଆର୍ଦ୍ରତା ଏବଂ ଶସ୍ୟର ଗୁଣବତ୍ତା ଯାଞ୍ଚ କରନ୍ତୁ, କାରଣ ଗୁଣବତ୍ତା ଶେଷ ମୂଲ୍ୟକୁ ପ୍ରଭାବିତ କରିପାରେ।";
      } else if (language === "as") {
        advice =
          "বিক্ৰী কৰাৰ আগতে আৰ্দ্ৰতা আৰু শস্যৰ গুণগত মান পৰীক্ষা কৰক, কাৰণ গুণগত মানে চূড়ান্ত মূল্যত প্ৰভাৱ পেলাব পাৰে।";
      } else if (language === "ur") {
        advice =
          "فروخت سے پہلے نمی اور دانے کے معیار کو چیک کریں، کیونکہ معیار حتمی قیمت کو متاثر کر سکتا ہے۔";
      }

      return {
        crop: cropName,
        price: "₹2,000 – ₹2,400",
        unit: t.unitQuintal,
        trend: t.trendStable,
        advice,
      };
    }

    /* -----------------------------
       POTATO
    ----------------------------- */

    if (isPotato(cropName)) {
      let advice =
        "Potato prices can change quickly. Compare today's local rates and storage options before selling.";

      if (language === "hi") {
        advice =
          "आलू के भाव जल्दी बदल सकते हैं। बेचने से पहले आज का स्थानीय भाव और भंडारण के विकल्प देखें।";
      }

      return {
        crop: cropName,
        price: "₹1,200 – ₹1,800",
        unit: t.unitQuintal,
        trend: t.trendVariable,
        advice,
      };
    }

    /* -----------------------------
       SUGARCANE
    ----------------------------- */

    if (isSugarcane(cropName)) {
      let advice =
        "Check the latest mill procurement rate and harvesting schedule before transporting sugarcane.";

      if (language === "hi") {
        advice =
          "गन्ना ले जाने से पहले नवीनतम मिल खरीद दर और कटाई का समय जरूर जाँचें।";
      }

      return {
        crop: cropName,
        price: "₹350 – ₹400",
        unit: t.unitQuintal,
        trend: t.trendStable,
        advice,
      };
    }

    /* -----------------------------
       UNKNOWN CROP
    ----------------------------- */

    let unknownAdvice =
      "Check your nearest mandi or agriculture market for the latest price of this crop.";

    if (language === "hi") {
      unknownAdvice =
        "इस फसल का नवीनतम भाव जानने के लिए अपनी नज़दीकी मंडी या कृषि बाजार से संपर्क करें।";
    } else if (language === "mr") {
      unknownAdvice =
        "या पिकाचा नवीनतम भाव जाणून घेण्यासाठी जवळच्या बाजारपेठेशी संपर्क करा.";
    } else if (language === "bn") {
      unknownAdvice =
        "এই ফসলের সর্বশেষ দাম জানতে আপনার নিকটস্থ মণ্ডি বা কৃষি বাজারে যোগাযোগ করুন।";
    } else if (language === "ta") {
      unknownAdvice =
        "இந்த பயிரின் சமீபத்திய விலையை அறிய அருகிலுள்ள சந்தையைத் தொடர்பு கொள்ளுங்கள்.";
    } else if (language === "te") {
      unknownAdvice =
        "ఈ పంట తాజా ధరను తెలుసుకోవడానికి సమీపంలోని మార్కెట్‌ను సంప్రదించండి.";
    } else if (language === "gu") {
      unknownAdvice =
        "આ પાકનો નવીનતમ ભાવ જાણવા માટે તમારી નજીકની મંડી અથવા કૃષિ બજારનો સંપર્ક કરો.";
    } else if (language === "kn") {
      unknownAdvice =
        "ಈ ಬೆಳೆಯ ಇತ್ತೀಚಿನ ದರವನ್ನು ತಿಳಿಯಲು ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    } else if (language === "ml") {
      unknownAdvice =
        "ഈ വിളയുടെ ഏറ്റവും പുതിയ വില അറിയാൻ സമീപത്തെ വിപണിയുമായി ബന്ധപ്പെടുക.";
    } else if (language === "pa") {
      unknownAdvice =
        "ਇਸ ਫਸਲ ਦਾ ਨਵਾਂ ਭਾਅ ਜਾਣਨ ਲਈ ਆਪਣੀ ਨੇੜਲੀ ਮੰਡੀ ਜਾਂ ਖੇਤੀਬਾੜੀ ਬਾਜ਼ਾਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।";
    } else if (language === "or") {
      unknownAdvice =
        "ଏହି ଫସଲର ନୂତନ ଦର ଜାଣିବା ପାଇଁ ନିକଟସ୍ଥ ମଣ୍ଡି କିମ୍ବା କୃଷି ବଜାର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।";
    } else if (language === "as") {
      unknownAdvice =
        "এই শস্যৰ শেহতীয়া মূল্য জানিবলৈ আপোনাৰ ওচৰৰ মণ্ডি বা কৃষি বজাৰৰ সৈতে যোগাযোগ কৰক।";
    } else if (language === "ur") {
      unknownAdvice =
        "اس فصل کا تازہ ترین ریٹ جاننے کے لیے اپنی قریبی منڈی یا زرعی بازار سے رابطہ کریں۔";
    }

    return {
      crop: cropName,
      price: t.unknownPrice,
      unit: "",
      trend: t.trendCheck,
      advice: unknownAdvice,
    };
  };

  /* =======================================================
     LOADING SCREEN
  ======================================================= */

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md w-full">
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

  /* =======================================================
     CROP NOT FOUND
  ======================================================= */

  if (!crop) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">
            🌱
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.cropNotFound}
          </h1>

          <button
            onClick={() => router.push("/crops")}
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 transition"
          >
            ← {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     MARKET
  ======================================================= */

  const market = getMarketInfo(crop.crop);

  const landUnit =
    crop.landUnit || "acres";

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          onClick={() =>
            router.push(`/crops/${crop.id}`)
          }
          className="text-green-700 font-semibold mb-6 hover:text-green-900 transition"
        >
          ← {t.backTo} {crop.crop}
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl shrink-0">
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

        {/* =================================================
            CURRENT MARKET
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.currentMarket}
          </h2>

          <p className="text-gray-600 mt-2 leading-relaxed">
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

        {/* =================================================
            SELLING ADVICE
        ================================================= */}

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

        {/* =================================================
            NEARBY MANDI
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.nearbyMarket}
          </h2>

          <p className="text-gray-600 mt-2 leading-relaxed">
            {t.nearbyMarketDescription}
          </p>

          <button
            onClick={() => {
              alert(t.mandiAlert);
            }}
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 transition"
          >
            {t.findMandi}
          </button>

        </div>

        {/* =================================================
            IMPORTANT TIPS
        ================================================= */}

        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7">

          <h2 className="text-2xl font-bold text-yellow-800">
            {t.importantBeforeSelling}
          </h2>

          <div className="space-y-4 mt-5">

            {/* TIP 1 */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl shrink-0">
                📊
              </div>

              <p className="text-yellow-900 leading-relaxed">
                {t.tip1}
              </p>
            </div>

            {/* TIP 2 */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl shrink-0">
                🌾
              </div>

              <p className="text-yellow-900 leading-relaxed">
                {t.tip2}
              </p>
            </div>

            {/* TIP 3 */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl shrink-0">
                🚚
              </div>

              <p className="text-yellow-900 leading-relaxed">
                {t.tip3}
              </p>
            </div>

            {/* TIP 4 */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl shrink-0">
                💰
              </div>

              <p className="text-yellow-900 leading-relaxed">
                {t.tip4}
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}