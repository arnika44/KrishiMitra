"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

type Language =
  | "en"
  | "hi"
  | "mr"
  | "bn"
  | "ta"
  | "te"
  | "gu"
  | "kn"
  | "ml"
  | "pa";

type Crop = {
  id?: number;
  name?: string;
  cropName?: string;
  season?: string;
  area?: number;
  landArea?: number;
  quantity?: number;
};

type Profile = {
  village?: string;
  villageName?: string;
  city?: string;
  cityName?: string;
  district?: string;
  districtName?: string;
  state?: string;
  stateName?: string;
  pincode?: string;
  pinCode?: string;
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations: Record<
  Language,
  {
    title: string;
    subtitle: string;
    marketSnapshot: string;
    todayRate: string;
    weeklyChange: string;
    demand: string;
    supply: string;
    strong: string;
    normal: string;
    limited: string;
    priceHistory: string;
    last7Days: string;
    forecast: string;
    nextDays: string;
    forecastText: string;
    sellDecision: string;
    sellNow: string;
    wait: string;
    reason: string;
    mandiCompare: string;
    market: string;
    rate: string;
    transport: string;
    netValue: string;
    better: string;
    sellStore: string;
    sellToday: string;
    store: string;
    storageCost: string;
    futureValue: string;
    estimatedGain: string;
    buyers: string;
    trader: string;
    processor: string;
    wholesaler: string;
    buyerRequirements: string;
    grade: string;
    moisture: string;
    quantity: string;
    alert: string;
    targetPrice: string;
    setAlert: string;
    alertSet: string;
    checklist: string;
    quality: string;
    weighing: string;
    receipt: string;
    payment: string;
    complete: string;
    crop: string;
    location: string;
    back: string;
    dashboard: string;
    disclaimer: string;
  }
> = {
  en: {
    title: "Market Intelligence",
    subtitle: "Smart market insights for your crop",
    marketSnapshot: "Market Snapshot",
    todayRate: "Today's Rate",
    weeklyChange: "7-Day Change",
    demand: "Demand",
    supply: "Supply",
    strong: "Strong",
    normal: "Normal",
    limited: "Limited",
    priceHistory: "Price History",
    last7Days: "Last 7 Days",
    forecast: "Price Forecast",
    nextDays: "Next 5 Days",
    forecastText: "Expected market movement based on current trend.",
    sellDecision: "Smart Sell Decision",
    sellNow: "Sell Now",
    wait: "Wait & Watch",
    reason: "Reason",
    mandiCompare: "Market Comparison",
    market: "Market",
    rate: "Rate",
    transport: "Transport",
    netValue: "Net Value",
    better: "Better option",
    sellStore: "Sell vs Store",
    sellToday: "Sell Today",
    store: "Store & Sell Later",
    storageCost: "Storage Cost",
    futureValue: "Expected Future Value",
    estimatedGain: "Estimated Gain",
    buyers: "Potential Buyers",
    trader: "Trader",
    processor: "Processor",
    wholesaler: "Wholesaler",
    buyerRequirements: "Buyer Requirements",
    grade: "Preferred Grade",
    moisture: "Moisture",
    quantity: "Minimum Quantity",
    alert: "Price Alert",
    targetPrice: "Target Price",
    setAlert: "Set Alert",
    alertSet: "Price alert saved successfully.",
    checklist: "Selling Checklist",
    quality: "Quality checked",
    weighing: "Weight verified",
    receipt: "Receipt collected",
    payment: "Payment confirmed",
    complete: "Complete",
    crop: "Crop",
    location: "Location",
    back: "Back",
    dashboard: "Dashboard",
    disclaimer:
      "Figures shown here are estimates for decision support and are not real-time quotations.",
  },

  hi: {
    title: "बाज़ार इंटेलिजेंस",
    subtitle: "आपकी फसल के लिए स्मार्ट बाज़ार जानकारी",
    marketSnapshot: "बाज़ार की स्थिति",
    todayRate: "आज का भाव",
    weeklyChange: "7 दिन का बदलाव",
    demand: "मांग",
    supply: "आपूर्ति",
    strong: "मज़बूत",
    normal: "सामान्य",
    limited: "सीमित",
    priceHistory: "भाव का इतिहास",
    last7Days: "पिछले 7 दिन",
    forecast: "भाव का अनुमान",
    nextDays: "अगले 5 दिन",
    forecastText: "वर्तमान रुझान के आधार पर संभावित बाज़ार बदलाव।",
    sellDecision: "स्मार्ट बिक्री निर्णय",
    sellNow: "अभी बेचें",
    wait: "इंतज़ार करें",
    reason: "कारण",
    mandiCompare: "बाज़ार तुलना",
    market: "बाज़ार",
    rate: "भाव",
    transport: "परिवहन",
    netValue: "शुद्ध मूल्य",
    better: "बेहतर विकल्प",
    sellStore: "बेचें या स्टोर करें",
    sellToday: "आज बेचें",
    store: "स्टोर करके बाद में बेचें",
    storageCost: "भंडारण लागत",
    futureValue: "भविष्य का अनुमानित मूल्य",
    estimatedGain: "अनुमानित लाभ",
    buyers: "संभावित खरीदार",
    trader: "व्यापारी",
    processor: "प्रोसेसर",
    wholesaler: "थोक खरीदार",
    buyerRequirements: "खरीदार की आवश्यकताएँ",
    grade: "पसंदीदा गुणवत्ता",
    moisture: "नमी",
    quantity: "न्यूनतम मात्रा",
    alert: "भाव अलर्ट",
    targetPrice: "लक्ष्य भाव",
    setAlert: "अलर्ट सेट करें",
    alertSet: "भाव अलर्ट सफलतापूर्वक सेव हो गया।",
    checklist: "बिक्री चेकलिस्ट",
    quality: "गुणवत्ता जाँच",
    weighing: "वजन सत्यापित",
    receipt: "रसीद ली",
    payment: "भुगतान की पुष्टि",
    complete: "पूरा",
    crop: "फसल",
    location: "स्थान",
    back: "वापस",
    dashboard: "डैशबोर्ड",
    disclaimer:
      "यहाँ दिखाए गए आँकड़े निर्णय सहायता के लिए अनुमान हैं, रियल-टाइम भाव नहीं।",
  },

  mr: {
    title: "बाजार माहिती",
    subtitle: "तुमच्या पिकासाठी स्मार्ट बाजार माहिती",
    marketSnapshot: "बाजार स्थिती",
    todayRate: "आजचा दर",
    weeklyChange: "7 दिवसांचा बदल",
    demand: "मागणी",
    supply: "पुरवठा",
    strong: "जोरदार",
    normal: "सामान्य",
    limited: "मर्यादित",
    priceHistory: "दर इतिहास",
    last7Days: "मागील 7 दिवस",
    forecast: "दर अंदाज",
    nextDays: "पुढील 5 दिवस",
    forecastText: "सध्याच्या ट्रेंडवर आधारित बाजार अंदाज.",
    sellDecision: "स्मार्ट विक्री निर्णय",
    sellNow: "आता विक्री करा",
    wait: "थांबा आणि पहा",
    reason: "कारण",
    mandiCompare: "बाजार तुलना",
    market: "बाजार",
    rate: "दर",
    transport: "वाहतूक",
    netValue: "निव्वळ मूल्य",
    better: "चांगला पर्याय",
    sellStore: "विका किंवा साठवा",
    sellToday: "आज विका",
    store: "साठवून नंतर विका",
    storageCost: "साठवण खर्च",
    futureValue: "भविष्यातील अंदाजित मूल्य",
    estimatedGain: "अंदाजित फायदा",
    buyers: "संभाव्य खरेदीदार",
    trader: "व्यापारी",
    processor: "प्रोसेसर",
    wholesaler: "घाऊक खरेदीदार",
    buyerRequirements: "खरेदीदाराच्या आवश्यकता",
    grade: "पसंतीची गुणवत्ता",
    moisture: "ओलावा",
    quantity: "किमान मात्रा",
    alert: "दर अलर्ट",
    targetPrice: "लक्ष्य दर",
    setAlert: "अलर्ट सेट करा",
    alertSet: "दर अलर्ट सेव्ह झाला.",
    checklist: "विक्री चेकलिस्ट",
    quality: "गुणवत्ता तपासली",
    weighing: "वजन तपासले",
    receipt: "पावती घेतली",
    payment: "पेमेंट निश्चित",
    complete: "पूर्ण",
    crop: "पीक",
    location: "स्थान",
    back: "मागे",
    dashboard: "डॅशबोर्ड",
    disclaimer: "हे आकडे निर्णयासाठी अंदाज आहेत, रिअल-टाइम भाव नाहीत.",
  },

  bn: {
    title: "বাজার তথ্য",
    subtitle: "আপনার ফসলের জন্য স্মার্ট বাজার তথ্য",
    marketSnapshot: "বাজারের অবস্থা",
    todayRate: "আজকের দাম",
    weeklyChange: "৭ দিনের পরিবর্তন",
    demand: "চাহিদা",
    supply: "সরবরাহ",
    strong: "শক্তিশালী",
    normal: "স্বাভাবিক",
    limited: "সীমিত",
    priceHistory: "দামের ইতিহাস",
    last7Days: "গত ৭ দিন",
    forecast: "দামের পূর্বাভাস",
    nextDays: "পরবর্তী ৫ দিন",
    forecastText: "বর্তমান প্রবণতার ভিত্তিতে সম্ভাব্য বাজার পরিবর্তন।",
    sellDecision: "স্মার্ট বিক্রির সিদ্ধান্ত",
    sellNow: "এখন বিক্রি করুন",
    wait: "অপেক্ষা করুন",
    reason: "কারণ",
    mandiCompare: "বাজার তুলনা",
    market: "বাজার",
    rate: "দাম",
    transport: "পরিবহন",
    netValue: "নিট মূল্য",
    better: "ভালো বিকল্প",
    sellStore: "বিক্রি না সংরক্ষণ",
    sellToday: "আজ বিক্রি",
    store: "সংরক্ষণ করে পরে বিক্রি",
    storageCost: "সংরক্ষণ খরচ",
    futureValue: "ভবিষ্যৎ মূল্য",
    estimatedGain: "সম্ভাব্য লাভ",
    buyers: "সম্ভাব্য ক্রেতা",
    trader: "ব্যবসায়ী",
    processor: "প্রসেসর",
    wholesaler: "পাইকার",
    buyerRequirements: "ক্রেতার প্রয়োজনীয়তা",
    grade: "পছন্দের মান",
    moisture: "আর্দ্রতা",
    quantity: "ন্যূনতম পরিমাণ",
    alert: "দাম সতর্কতা",
    targetPrice: "লক্ষ্য দাম",
    setAlert: "সতর্কতা সেট করুন",
    alertSet: "দাম সতর্কতা সফলভাবে সংরক্ষিত হয়েছে।",
    checklist: "বিক্রয় চেকলিস্ট",
    quality: "মান পরীক্ষা",
    weighing: "ওজন যাচাই",
    receipt: "রসিদ সংগ্রহ",
    payment: "পেমেন্ট নিশ্চিত",
    complete: "সম্পূর্ণ",
    crop: "ফসল",
    location: "স্থান",
    back: "ফিরে যান",
    dashboard: "ড্যাশবোর্ড",
    disclaimer: "এই তথ্য সিদ্ধান্ত সহায়তার জন্য আনুমানিক, রিয়েল-টাইম দাম নয়।",
  },

  ta: {
    title: "சந்தை தகவல்",
    subtitle: "உங்கள் பயிருக்கான ஸ்மார்ட் சந்தை தகவல்",
    marketSnapshot: "சந்தை நிலவரம்",
    todayRate: "இன்றைய விலை",
    weeklyChange: "7 நாள் மாற்றம்",
    demand: "தேவை",
    supply: "வழங்கல்",
    strong: "வலுவான",
    normal: "சாதாரண",
    limited: "குறைவு",
    priceHistory: "விலை வரலாறு",
    last7Days: "கடந்த 7 நாட்கள்",
    forecast: "விலை கணிப்பு",
    nextDays: "அடுத்த 5 நாட்கள்",
    forecastText: "தற்போதைய போக்கின் அடிப்படையிலான சந்தை கணிப்பு.",
    sellDecision: "ஸ்மார்ட் விற்பனை முடிவு",
    sellNow: "இப்போது விற்கவும்",
    wait: "காத்திருக்கவும்",
    reason: "காரணம்",
    mandiCompare: "சந்தை ஒப்பீடு",
    market: "சந்தை",
    rate: "விலை",
    transport: "போக்குவரத்து",
    netValue: "நிகர மதிப்பு",
    better: "சிறந்த தேர்வு",
    sellStore: "விற்கலாமா சேமிக்கலாமா",
    sellToday: "இன்று விற்கவும்",
    store: "சேமித்து பின்னர் விற்கவும்",
    storageCost: "சேமிப்பு செலவு",
    futureValue: "எதிர்பார்க்கப்படும் மதிப்பு",
    estimatedGain: "மதிப்பிடப்பட்ட லாபம்",
    buyers: "சாத்தியமான வாங்குபவர்கள்",
    trader: "வியாபாரி",
    processor: "செயலாக்குபவர்",
    wholesaler: "மொத்த விற்பனையாளர்",
    buyerRequirements: "வாங்குபவர் தேவைகள்",
    grade: "விருப்ப தரம்",
    moisture: "ஈரப்பதம்",
    quantity: "குறைந்தபட்ச அளவு",
    alert: "விலை எச்சரிக்கை",
    targetPrice: "இலக்கு விலை",
    setAlert: "எச்சரிக்கையை அமைக்கவும்",
    alertSet: "விலை எச்சரிக்கை சேமிக்கப்பட்டது.",
    checklist: "விற்பனை சரிபார்ப்பு",
    quality: "தரம் சரிபார்க்கப்பட்டது",
    weighing: "எடை சரிபார்க்கப்பட்டது",
    receipt: "ரசீது பெறப்பட்டது",
    payment: "பணம் உறுதி",
    complete: "முடிந்தது",
    crop: "பயிர்",
    location: "இடம்",
    back: "பின்னால்",
    dashboard: "டாஷ்போர்டு",
    disclaimer: "இவை முடிவு உதவிக்கான மதிப்பீடுகள்; நேரடி சந்தை விலைகள் அல்ல.",
  },

  te: {
    title: "మార్కెట్ సమాచారం",
    subtitle: "మీ పంట కోసం స్మార్ట్ మార్కెట్ సమాచారం",
    marketSnapshot: "మార్కెట్ పరిస్థితి",
    todayRate: "ఈరోజు ధర",
    weeklyChange: "7 రోజుల మార్పు",
    demand: "డిమాండ్",
    supply: "సరఫరా",
    strong: "బలమైన",
    normal: "సాధారణ",
    limited: "పరిమిత",
    priceHistory: "ధర చరిత్ర",
    last7Days: "గత 7 రోజులు",
    forecast: "ధర అంచనా",
    nextDays: "తదుపరి 5 రోజులు",
    forecastText: "ప్రస్తుత ట్రెండ్ ఆధారంగా మార్కెట్ అంచనా.",
    sellDecision: "స్మార్ట్ అమ్మకం నిర్ణయం",
    sellNow: "ఇప్పుడే అమ్మండి",
    wait: "వేచి చూడండి",
    reason: "కారణం",
    mandiCompare: "మార్కెట్ పోలిక",
    market: "మార్కెట్",
    rate: "ధర",
    transport: "రవాణా",
    netValue: "నికర విలువ",
    better: "మంచి ఎంపిక",
    sellStore: "అమ్మాలా నిల్వ చేయాలా",
    sellToday: "ఈరోజు అమ్మండి",
    store: "నిల్వ చేసి తరువాత అమ్మండి",
    storageCost: "నిల్వ ఖర్చు",
    futureValue: "భవిష్యత్ అంచనా విలువ",
    estimatedGain: "అంచనా లాభం",
    buyers: "సంభావ్య కొనుగోలుదారులు",
    trader: "వ్యాపారి",
    processor: "ప్రాసెసర్",
    wholesaler: "హోల్‌సేలర్",
    buyerRequirements: "కొనుగోలుదారు అవసరాలు",
    grade: "ఇష్టమైన నాణ్యత",
    moisture: "తేమ",
    quantity: "కనీస పరిమాణం",
    alert: "ధర అలర్ట్",
    targetPrice: "లక్ష్య ధర",
    setAlert: "అలర్ట్ సెట్ చేయండి",
    alertSet: "ధర అలర్ట్ విజయవంతంగా సేవ్ అయింది.",
    checklist: "అమ్మకం చెక్‌లిస్ట్",
    quality: "నాణ్యత తనిఖీ",
    weighing: "బరువు ధృవీకరణ",
    receipt: "రసీదు తీసుకున్నారు",
    payment: "చెల్లింపు నిర్ధారణ",
    complete: "పూర్తి",
    crop: "పంట",
    location: "స్థానం",
    back: "వెనుకకు",
    dashboard: "డాష్‌బోర్డ్",
    disclaimer: "ఇవి నిర్ణయ సహాయం కోసం అంచనాలు మాత్రమే; రియల్ టైమ్ ధరలు కావు.",
  },

  gu: {
    title: "બજાર માહિતી",
    subtitle: "તમારા પાક માટે સ્માર્ટ બજાર માહિતી",
    marketSnapshot: "બજાર સ્થિતિ",
    todayRate: "આજનો ભાવ",
    weeklyChange: "7 દિવસનો ફેરફાર",
    demand: "માંગ",
    supply: "પુરવઠો",
    strong: "મજબૂત",
    normal: "સામાન્ય",
    limited: "મર્યાદિત",
    priceHistory: "ભાવ ઇતિહાસ",
    last7Days: "છેલ્લા 7 દિવસ",
    forecast: "ભાવ અનુમાન",
    nextDays: "આગામી 5 દિવસ",
    forecastText: "હાલના ટ્રેન્ડના આધારે બજાર અનુમાન.",
    sellDecision: "સ્માર્ટ વેચાણ નિર્ણય",
    sellNow: "હમણાં વેચો",
    wait: "રાહ જુઓ",
    reason: "કારણ",
    mandiCompare: "બજાર સરખામણી",
    market: "બજાર",
    rate: "ભાવ",
    transport: "પરિવહન",
    netValue: "ચોખ્ખું મૂલ્ય",
    better: "સારો વિકલ્પ",
    sellStore: "વેચવું કે સંગ્રહ કરવો",
    sellToday: "આજે વેચો",
    store: "સંગ્રહ કરીને પછી વેચો",
    storageCost: "સંગ્રહ ખર્ચ",
    futureValue: "અંદાજિત ભવિષ્ય મૂલ્ય",
    estimatedGain: "અંદાજિત લાભ",
    buyers: "સંભવિત ખરીદદારો",
    trader: "વેપારી",
    processor: "પ્રોસેસર",
    wholesaler: "જથ્થાબંધ ખરીદદાર",
    buyerRequirements: "ખરીદદારની જરૂરિયાતો",
    grade: "પસંદ ગુણવત્તા",
    moisture: "ભેજ",
    quantity: "ન્યૂનતમ જથ્થો",
    alert: "ભાવ એલર્ટ",
    targetPrice: "લક્ષ્ય ભાવ",
    setAlert: "એલર્ટ સેટ કરો",
    alertSet: "ભાવ એલર્ટ સફળતાપૂર્વક સેવ થયું.",
    checklist: "વેચાણ ચેકલિસ્ટ",
    quality: "ગુણવત્તા તપાસી",
    weighing: "વજન ચકાસ્યું",
    receipt: "રસીદ મેળવી",
    payment: "ચુકવણી પુષ્ટિ",
    complete: "પૂર્ણ",
    crop: "પાક",
    location: "સ્થાન",
    back: "પાછા",
    dashboard: "ડેશબોર્ડ",
    disclaimer: "આ આંકડા નિર્ણય સહાય માટે અંદાજ છે, રિયલ-ટાઇમ ભાવ નથી.",
  },

  kn: {
    title: "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    subtitle: "ನಿಮ್ಮ ಬೆಳೆಗೆ ಸ್ಮಾರ್ಟ್ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    marketSnapshot: "ಮಾರುಕಟ್ಟೆ ಸ್ಥಿತಿ",
    todayRate: "ಇಂದಿನ ದರ",
    weeklyChange: "7 ದಿನಗಳ ಬದಲಾವಣೆ",
    demand: "ಬೇಡಿಕೆ",
    supply: "ಪೂರೈಕೆ",
    strong: "ಬಲವಾದ",
    normal: "ಸಾಮಾನ್ಯ",
    limited: "ಸೀಮಿತ",
    priceHistory: "ದರ ಇತಿಹಾಸ",
    last7Days: "ಕಳೆದ 7 ದಿನಗಳು",
    forecast: "ದರ ಅಂದಾಜು",
    nextDays: "ಮುಂದಿನ 5 ದಿನಗಳು",
    forecastText: "ಪ್ರಸ್ತುತ ಟ್ರೆಂಡ್ ಆಧಾರಿತ ಮಾರುಕಟ್ಟೆ ಅಂದಾಜು.",
    sellDecision: "ಸ್ಮಾರ್ಟ್ ಮಾರಾಟ ನಿರ್ಧಾರ",
    sellNow: "ಈಗ ಮಾರಾಟ ಮಾಡಿ",
    wait: "ಕಾಯಿರಿ",
    reason: "ಕಾರಣ",
    mandiCompare: "ಮಾರುಕಟ್ಟೆ ಹೋಲಿಕೆ",
    market: "ಮಾರುಕಟ್ಟೆ",
    rate: "ದರ",
    transport: "ಸಾರಿಗೆ",
    netValue: "ನಿವ್ವಳ ಮೌಲ್ಯ",
    better: "ಉತ್ತಮ ಆಯ್ಕೆ",
    sellStore: "ಮಾರಾಟ ಅಥವಾ ಸಂಗ್ರಹ",
    sellToday: "ಇಂದು ಮಾರಾಟ ಮಾಡಿ",
    store: "ಸಂಗ್ರಹಿಸಿ ನಂತರ ಮಾರಾಟ ಮಾಡಿ",
    storageCost: "ಸಂಗ್ರಹ ವೆಚ್ಚ",
    futureValue: "ಭವಿಷ್ಯದ ಅಂದಾಜು ಮೌಲ್ಯ",
    estimatedGain: "ಅಂದಾಜು ಲಾಭ",
    buyers: "ಸಂಭಾವ್ಯ ಖರೀದಿದಾರರು",
    trader: "ವ್ಯಾಪಾರಿ",
    processor: "ಪ್ರೊಸೆಸರ್",
    wholesaler: "ಸಗಟು ಖರೀದಿದಾರ",
    buyerRequirements: "ಖರೀದಿದಾರರ ಅವಶ್ಯಕತೆಗಳು",
    grade: "ಆದ್ಯತೆಯ ಗುಣಮಟ್ಟ",
    moisture: "ತೇವಾಂಶ",
    quantity: "ಕನಿಷ್ಠ ಪ್ರಮಾಣ",
    alert: "ದರ ಎಚ್ಚರಿಕೆ",
    targetPrice: "ಗುರಿ ದರ",
    setAlert: "ಎಚ್ಚರಿಕೆ ಹೊಂದಿಸಿ",
    alertSet: "ದರ ಎಚ್ಚರಿಕೆ ಉಳಿಸಲಾಗಿದೆ.",
    checklist: "ಮಾರಾಟ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
    quality: "ಗುಣಮಟ್ಟ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    weighing: "ತೂಕ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    receipt: "ರಸೀದಿ ಪಡೆದಿದೆ",
    payment: "ಪಾವತಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    complete: "ಪೂರ್ಣ",
    crop: "ಬೆಳೆ",
    location: "ಸ್ಥಳ",
    back: "ಹಿಂದೆ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    disclaimer: "ಇವು ನಿರ್ಧಾರ ಸಹಾಯಕ್ಕಾಗಿ ಅಂದಾಜುಗಳು; ರಿಯಲ್-ಟೈಮ್ ದರಗಳಲ್ಲ.",
  },

  ml: {
    title: "വിപണി വിവരങ്ങൾ",
    subtitle: "നിങ്ങളുടെ വിളയ്ക്കുള്ള സ്മാർട്ട് വിപണി വിവരങ്ങൾ",
    marketSnapshot: "വിപണി സ്ഥിതി",
    todayRate: "ഇന്നത്തെ വില",
    weeklyChange: "7 ദിവസത്തെ മാറ്റം",
    demand: "ആവശ്യം",
    supply: "വിതരണം",
    strong: "ശക്തം",
    normal: "സാധാരണ",
    limited: "പരിമിതം",
    priceHistory: "വില ചരിത്രം",
    last7Days: "കഴിഞ്ഞ 7 ദിവസം",
    forecast: "വില പ്രവചനം",
    nextDays: "അടുത്ത 5 ദിവസം",
    forecastText: "നിലവിലെ ട്രെൻഡിനെ അടിസ്ഥാനമാക്കിയുള്ള വിപണി പ്രവചനം.",
    sellDecision: "സ്മാർട്ട് വിൽപ്പന തീരുമാനം",
    sellNow: "ഇപ്പോൾ വിൽക്കുക",
    wait: "കാത്തിരിക്കുക",
    reason: "കാരണം",
    mandiCompare: "വിപണി താരതമ്യം",
    market: "വിപണി",
    rate: "വില",
    transport: "ഗതാഗതം",
    netValue: "ശുദ്ധ മൂല്യം",
    better: "മികച്ച ഓപ്ഷൻ",
    sellStore: "വിൽക്കണോ സംഭരിക്കണോ",
    sellToday: "ഇന്ന് വിൽക്കുക",
    store: "സംഭരിച്ച് പിന്നീട് വിൽക്കുക",
    storageCost: "സംഭരണ ചെലവ്",
    futureValue: "ഭാവിയിലെ പ്രതീക്ഷിത മൂല്യം",
    estimatedGain: "പ്രതീക്ഷിക്കുന്ന ലാഭം",
    buyers: "സാധ്യതയുള്ള വാങ്ങുന്നവർ",
    trader: "വ്യാപാരി",
    processor: "പ്രോസസർ",
    wholesaler: "മൊത്തവ്യാപാരി",
    buyerRequirements: "വാങ്ങുന്നവരുടെ ആവശ്യങ്ങൾ",
    grade: "ആവശ്യമായ ഗുണനിലവാരം",
    moisture: "ഈർപ്പം",
    quantity: "കുറഞ്ഞ അളവ്",
    alert: "വില അലർട്ട്",
    targetPrice: "ലക്ഷ്യ വില",
    setAlert: "അലർട്ട് സജ്ജമാക്കുക",
    alertSet: "വില അലർട്ട് വിജയകരമായി സേവ് ചെയ്തു.",
    checklist: "വിൽപ്പന ചെക്ക്ലിസ്റ്റ്",
    quality: "ഗുണനിലവാരം പരിശോധിച്ചു",
    weighing: "ഭാരം പരിശോധിച്ചു",
    receipt: "രസീത് ലഭിച്ചു",
    payment: "പേയ്മെന്റ് സ്ഥിരീകരിച്ചു",
    complete: "പൂർത്തിയായി",
    crop: "വിള",
    location: "സ്ഥലം",
    back: "തിരികെ",
    dashboard: "ഡാഷ്ബോർഡ്",
    disclaimer: "ഇവ തീരുമാന സഹായത്തിനുള്ള കണക്കുകൂട്ടലുകളാണ്; തത്സമയ വിലകളല്ല.",
  },

  pa: {
    title: "ਮਾਰਕੀਟ ਜਾਣਕਾਰੀ",
    subtitle: "ਤੁਹਾਡੀ ਫਸਲ ਲਈ ਸਮਾਰਟ ਮਾਰਕੀਟ ਜਾਣਕਾਰੀ",
    marketSnapshot: "ਮਾਰਕੀਟ ਸਥਿਤੀ",
    todayRate: "ਅੱਜ ਦਾ ਭਾਅ",
    weeklyChange: "7 ਦਿਨਾਂ ਦਾ ਬਦਲਾਅ",
    demand: "ਮੰਗ",
    supply: "ਸਪਲਾਈ",
    strong: "ਮਜ਼ਬੂਤ",
    normal: "ਸਧਾਰਣ",
    limited: "ਸੀਮਿਤ",
    priceHistory: "ਭਾਅ ਇਤਿਹਾਸ",
    last7Days: "ਪਿਛਲੇ 7 ਦਿਨ",
    forecast: "ਭਾਅ ਅਨੁਮਾਨ",
    nextDays: "ਅਗਲੇ 5 ਦਿਨ",
    forecastText: "ਮੌਜੂਦਾ ਰੁਝਾਨ ਦੇ ਆਧਾਰ 'ਤੇ ਮਾਰਕੀਟ ਅਨੁਮਾਨ।",
    sellDecision: "ਸਮਾਰਟ ਵਿਕਰੀ ਫੈਸਲਾ",
    sellNow: "ਹੁਣੇ ਵੇਚੋ",
    wait: "ਉਡੀਕ ਕਰੋ",
    reason: "ਕਾਰਨ",
    mandiCompare: "ਮਾਰਕੀਟ ਤੁਲਨਾ",
    market: "ਮਾਰਕੀਟ",
    rate: "ਭਾਅ",
    transport: "ਆਵਾਜਾਈ",
    netValue: "ਸ਼ੁੱਧ ਮੁੱਲ",
    better: "ਵਧੀਆ ਵਿਕਲਪ",
    sellStore: "ਵੇਚੋ ਜਾਂ ਸਟੋਰ ਕਰੋ",
    sellToday: "ਅੱਜ ਵੇਚੋ",
    store: "ਸਟੋਰ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਵੇਚੋ",
    storageCost: "ਸਟੋਰੇਜ ਖਰਚ",
    futureValue: "ਭਵਿੱਖੀ ਅਨੁਮਾਨਿਤ ਮੁੱਲ",
    estimatedGain: "ਅਨੁਮਾਨਿਤ ਲਾਭ",
    buyers: "ਸੰਭਾਵਿਤ ਖਰੀਦਦਾਰ",
    trader: "ਵਪਾਰੀ",
    processor: "ਪ੍ਰੋਸੈਸਰ",
    wholesaler: "ਥੋਕ ਖਰੀਦਦਾਰ",
    buyerRequirements: "ਖਰੀਦਦਾਰ ਦੀਆਂ ਲੋੜਾਂ",
    grade: "ਪਸੰਦੀਦਾ ਗੁਣਵੱਤਾ",
    moisture: "ਨਮੀ",
    quantity: "ਘੱਟੋ-ਘੱਟ ਮਾਤਰਾ",
    alert: "ਭਾਅ ਅਲਰਟ",
    targetPrice: "ਲਕਸ਼ ਭਾਅ",
    setAlert: "ਅਲਰਟ ਸੈੱਟ ਕਰੋ",
    alertSet: "ਭਾਅ ਅਲਰਟ ਸਫਲਤਾਪੂਰਵਕ ਸੇਵ ਹੋ ਗਿਆ।",
    checklist: "ਵਿਕਰੀ ਚੈਕਲਿਸਟ",
    quality: "ਗੁਣਵੱਤਾ ਜਾਂਚੀ",
    weighing: "ਵਜ਼ਨ ਜਾਂਚਿਆ",
    receipt: "ਰਸੀਦ ਲਈ",
    payment: "ਭੁਗਤਾਨ ਦੀ ਪੁਸ਼ਟੀ",
    complete: "ਪੂਰਾ",
    crop: "ਫਸਲ",
    location: "ਸਥਾਨ",
    back: "ਵਾਪਸ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    disclaimer: "ਇਹ ਅੰਕੜੇ ਫੈਸਲਾ ਲੈਣ ਲਈ ਅਨੁਮਾਨ ਹਨ, ਰੀਅਲ-ਟਾਈਮ ਭਾਅ ਨਹੀਂ।",
  },
};

/* =========================================================
   LANGUAGE LABELS
========================================================= */

const languageLabels: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  gu: "ગુજરાતી",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  pa: "ਪੰਜਾਬੀ",
};

/* =========================================================
   HELPERS
========================================================= */

function normalize(value: unknown) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

function getCropName(crop: Crop | null) {
  if (!crop) return "Crop";

  return (
    crop.name ||
    crop.cropName ||
    "Crop"
  );
}

function detectCropType(name: string) {
  const n = normalize(name);

  if (
    /wheat|गेहूं|गेहू|गहू|গম|கோதுமை|గోధుమ|ઘઉં|ಗೋಧಿ|ഗോതമ്പ്|ਕਣਕ/.test(
      n
    )
  ) {
    return "wheat";
  }

  if (
    /rice|paddy|धान|चावल|तांदूळ|ধান|அரிசி|நெல்|బియ్యం|వరి|ચોખા|ಅಕ್ಕಿ|നെല്ല്|ਝੋਨਾ|ਚੌਲ/.test(
      n
    )
  ) {
    return "rice";
  }

  if (
    /maize|corn|मक्का|मकई|मका|ভুট্টা|மக்காச்சோளம்|మొక్కజొన్న|મકાઈ|ಮೆಕ್ಕೆಜೋಳ|ചോളം|ਮੱਕੀ/.test(
      n
    )
  ) {
    return "maize";
  }

  if (
    /potato|aloo|आलू|बटाटा|আলু|உருளைக்கிழங்கு|బంగాళాదుంప|બટાકા|ಆಲೂಗಡ್ಡೆ|ഉരുളക്കിഴങ്ങ്|ਆਲੂ/.test(
      n
    )
  ) {
    return "potato";
  }

  if (
    /tomato|टमाटर|टोमॅटो|টমেটো|தக்காளி|టమాటా|ટામેટા|ಟೊಮೇಟೊ|തക്കാളി|ਟਮਾਟਰ/.test(
      n
    )
  ) {
    return "tomato";
  }

  return "other";
}

function getBasePrice(type: string) {
  switch (type) {
    case "wheat":
      return 2500;

    case "rice":
      return 2350;

    case "maize":
      return 2200;

    case "potato":
      return 1500;

    case "tomato":
      return 2100;

    default:
      return 2000;
  }
}

function getStorageCost(type: string) {
  switch (type) {
    case "potato":
      return 90;

    case "tomato":
      return 110;

    case "rice":
      return 65;

    case "wheat":
      return 60;

    case "maize":
      return 55;

    default:
      return 70;
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function NewMarketPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] =
    useState<Language>("en");

  const [crop, setCrop] =
    useState<Crop | null>(null);

  const [profile, setProfile] =
    useState<Profile>({});

  const [targetPrice, setTargetPrice] =
    useState("");

  const [alertMessage, setAlertMessage] =
    useState("");

  const [checklist, setChecklist] = useState({
    quality: false,
    weighing: false,
    receipt: false,
    payment: false,
  });

  /* =======================================================
     LOAD EXISTING APP DATA
  ======================================================= */

  useEffect(() => {
    try {
      const savedLanguage =
        localStorage.getItem(
          "selectedLanguage"
        ) as Language | null;

      if (
        savedLanguage &&
        translations[savedLanguage]
      ) {
        setLanguage(savedLanguage);
      }
    } catch {}

    try {
      const savedCrops =
        localStorage.getItem("farmerCrops");

      if (savedCrops) {
        const crops: Crop[] =
          JSON.parse(savedCrops);

        const selectedCrop = crops.find(
          (item) =>
            Number(item.id) ===
            Number(params?.id)
        );

        if (selectedCrop) {
          setCrop(selectedCrop);
        }
      }
    } catch {}

    try {
      const savedProfile =
        localStorage.getItem("farmerProfile");

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch {}
  }, [params]);

  const t =
    translations[language] ||
    translations.en;

  /* =======================================================
     CROP / MARKET DATA
  ======================================================= */

  const cropName = useMemo(
    () => getCropName(crop),
    [crop]
  );

  const cropType = useMemo(
    () => detectCropType(cropName),
    [cropName]
  );

  const basePrice = useMemo(
    () => getBasePrice(cropType),
    [cropType]
  );

  const quantity = useMemo(() => {
    const q =
      Number(crop?.quantity) ||
      Number(crop?.area) ||
      Number(crop?.landArea) ||
      10;

    return q > 0 ? q : 10;
  }, [crop]);

  /* =======================================================
     MARKET SNAPSHOT
  ======================================================= */

  const weeklyChange =
    cropType === "potato"
      ? 6.8
      : cropType === "tomato"
      ? -3.2
      : cropType === "rice"
      ? 4.4
      : 2.7;

  const demand =
    cropType === "potato" ||
    cropType === "tomato"
      ? t.strong
      : t.normal;

  const supply =
    cropType === "potato"
      ? t.limited
      : t.normal;

  /* =======================================================
     HISTORY
  ======================================================= */

  const history = useMemo(() => {
    const multipliers = [
      0.95,
      0.97,
      0.96,
      1.0,
      1.015,
      1.03,
      1,
    ];

    return multipliers.map(
      (m) =>
        Math.round(basePrice * m)
    );
  }, [basePrice]);

  const maxHistory = Math.max(
    ...history
  );

  const minHistory = Math.min(
    ...history
  );

  /* =======================================================
     FORECAST
  ======================================================= */

  const forecastValues = useMemo(() => {
    const direction =
      weeklyChange >= 0 ? 1 : -1;

    return [1, 2, 3, 4, 5].map(
      (day) =>
        Math.round(
          basePrice *
            (1 +
              direction *
                day *
                Math.abs(weeklyChange) /
                100 /
                8)
        )
    );
  }, [basePrice, weeklyChange]);

  const futureAverage = Math.round(
    forecastValues.reduce(
      (sum, value) => sum + value,
      0
    ) / forecastValues.length
  );

  /* =======================================================
     SMART DECISION
  ======================================================= */

  const shouldSell =
    futureAverage <= basePrice * 1.025;

  const decision = shouldSell
    ? t.sellNow
    : t.wait;

  const decisionReason = shouldSell
    ? t.forecastText
    : `${t.weeklyChange}: +${weeklyChange.toFixed(
        1
      )}%`;

  /* =======================================================
     MANDI / MARKET COMPARISON
  ======================================================= */

  const markets = [
    {
      name: "Local Market",
      rate: basePrice,
      transport: 120,
    },
    {
      name: "Regional Market",
      rate: Math.round(
        basePrice * 1.035
      ),
      transport: 280,
    },
    {
      name: "Wholesale Market",
      rate: Math.round(
        basePrice * 1.06
      ),
      transport: 420,
    },
  ].map((item) => ({
    ...item,
    net: item.rate - item.transport,
  }));

  const bestMarket = markets.reduce(
    (best, current) =>
      current.net > best.net
        ? current
        : best,
    markets[0]
  );

  /* =======================================================
     SELL VS STORE
  ======================================================= */

  const storageCost =
    getStorageCost(cropType);

  const futurePrice =
    futureAverage;

  const sellTodayValue =
    basePrice * quantity;

  const storeFutureValue =
    futurePrice * quantity -
    storageCost * quantity;

  const storageDifference =
    storeFutureValue -
    sellTodayValue;

  /* =======================================================
     BUYER REQUIREMENTS
  ======================================================= */

  const buyerRequirements = {
    grade:
      cropType === "wheat"
        ? "FAQ / Premium"
        : cropType === "rice"
        ? "Good milling quality"
        : "Clean & graded",

    moisture:
      cropType === "wheat"
        ? "≤ 14%"
        : cropType === "rice"
        ? "≤ 17%"
        : "≤ 14%",

    quantity:
      cropType === "potato" ||
      cropType === "tomato"
        ? "500 kg+"
        : "1 Ton+",
  };

  /* =======================================================
     ALERT
  ======================================================= */

  const saveAlert = () => {
    const price =
      Number(targetPrice);

    if (!price || price <= 0) {
      setAlertMessage(
        `${t.targetPrice} required`
      );
      return;
    }

    try {
      localStorage.setItem(
        `marketPriceAlert_${crop?.id || cropName}`,
        JSON.stringify({
          crop: cropName,
          targetPrice: price,
          createdAt:
            new Date().toISOString(),
        })
      );
    } catch {}

    setAlertMessage(t.alertSet);

    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  /* =======================================================
     CHECKLIST
  ======================================================= */

  const completedCount = Object.values(
    checklist
  ).filter(Boolean).length;

  const toggleChecklist = (
    key: keyof typeof checklist
  ) => {
    setChecklist((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  /* =======================================================
     LOCATION
  ======================================================= */

  const location = [
    profile.village ||
      profile.villageName,
    profile.city ||
      profile.cityName,
    profile.district ||
      profile.districtName,
    profile.state ||
      profile.stateName,
  ]
    .filter(Boolean)
    .join(", ");

  /* =======================================================
     LOADING / EMPTY
  ======================================================= */

  if (!crop) {
    return (
      <main className="min-h-screen bg-[#f6f8f5] p-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <button
            onClick={() => router.back()}
            className="mb-6 rounded-xl border px-4 py-2 text-sm"
          >
            ← {t.back}
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.marketSnapshot}
          </h1>

          <p className="mt-2 text-gray-500">
            Crop information could not be
            loaded.
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#f6f8f5] text-gray-900">
      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <button
              onClick={() =>
                router.back()
              }
              className="mb-1 text-sm text-gray-500 hover:text-gray-900"
            >
              ← {t.back}
            </button>

            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {t.title}
            </h1>

            <p className="text-sm text-gray-500">
              {t.subtitle}
            </p>
          </div>

          {/* LANGUAGE */}

          <select
            value={language}
            onChange={(e) => {
              const next =
                e.target.value as Language;

              setLanguage(next);

              try {
                localStorage.setItem(
                  "selectedLanguage",
                  next
                );
              } catch {}
            }}
            className="rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
          >
            {(
              Object.keys(
                languageLabels
              ) as Language[]
            ).map((key) => (
              <option
                key={key}
                value={key}
              >
                {languageLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">
        {/* CROP INFO */}

        <section className="rounded-3xl bg-gradient-to-r from-green-700 to-green-600 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-green-100">
                {t.crop}
              </p>

              <h2 className="mt-1 text-3xl font-black">
                {cropName}
              </h2>

              {location && (
                <p className="mt-2 text-sm text-green-100">
                  📍 {location}
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
              <p className="text-sm text-green-100">
                {t.todayRate}
              </p>

              <p className="text-3xl font-black">
                ₹
                {basePrice.toLocaleString(
                  "en-IN"
                )}
              </p>

              <p className="mt-1 text-sm text-green-100">
                {t.rate}
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            MARKET SNAPSHOT
        ================================================= */}

        <section>
          <SectionTitle
            title={t.marketSnapshot}
          />

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              icon="₹"
              title={t.todayRate}
              value={`₹${basePrice.toLocaleString(
                "en-IN"
              )}`}
              subtitle="/ unit"
            />

            <StatCard
              icon="↗"
              title={t.weeklyChange}
              value={`${
                weeklyChange >= 0
                  ? "+"
                  : ""
              }${weeklyChange.toFixed(
                1
              )}%`}
              subtitle={
                weeklyChange >= 0
                  ? t.strong
                  : t.limited
              }
            />

            <StatCard
              icon="●"
              title={t.demand}
              value={demand}
              subtitle={t.market}
            />

            <StatCard
              icon="◒"
              title={t.supply}
              value={supply}
              subtitle={t.market}
            />
          </div>
        </section>

        {/* =================================================
            PRICE HISTORY + FORECAST
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* HISTORY */}

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {t.priceHistory}
                </h2>

                <p className="text-sm text-gray-500">
                  {t.last7Days}
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {weeklyChange >= 0
                  ? `+${weeklyChange}%`
                  : `${weeklyChange}%`}
              </span>
            </div>

            <div className="flex h-56 items-end gap-2">
              {history.map(
                (price, index) => {
                  const range =
                    maxHistory -
                    minHistory ||
                    1;

                  const height =
                    35 +
                    ((price -
                      minHistory) /
                      range) *
                      55;

                  return (
                    <div
                      key={index}
                      className="group flex flex-1 flex-col items-center justify-end"
                    >
                      <div className="mb-2 opacity-0 transition group-hover:opacity-100">
                        <span className="rounded-lg bg-gray-900 px-2 py-1 text-[10px] text-white">
                          ₹
                          {price.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </div>

                      <div
                        style={{
                          height: `${height}%`,
                        }}
                        className="w-full rounded-t-xl bg-green-500 transition-all hover:bg-green-600"
                      />

                      <span className="mt-2 text-[10px] text-gray-400">
                        D{index + 1}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {/* FORECAST */}

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-bold">
                {t.forecast}
              </h2>

              <p className="text-sm text-gray-500">
                {t.nextDays}
              </p>
            </div>

            <div className="space-y-3">
              {forecastValues.map(
                (price, index) => {
                  const change =
                    ((price -
                      basePrice) /
                      basePrice) *
                    100;

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                    >
                      <div>
                        <p className="font-semibold">
                          Day {index + 1}
                        </p>

                        <p className="text-xs text-gray-500">
                          {t.forecast}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">
                          ₹
                          {price.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <p
                          className={`text-xs font-semibold ${
                            change >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {change >= 0
                            ? "+"
                            : ""}
                          {change.toFixed(
                            1
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>
        </div>

        {/* =================================================
            SMART SELL DECISION
        ================================================= */}

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b p-6">
            <SectionTitle
              title={t.sellDecision}
              noMargin
            />
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto]">
            <div>
              <div
                className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${
                  shouldSell
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {shouldSell
                  ? "✓"
                  : "◷"}{" "}
                {decision}
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                <strong>
                  {t.reason}:
                </strong>{" "}
                {decisionReason}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 md:min-w-[230px]">
              <p className="text-xs text-gray-500">
                {t.futureValue}
              </p>

              <p className="mt-1 text-2xl font-black">
                ₹
                {futureAverage.toLocaleString(
                  "en-IN"
                )}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {t.forecast}
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            MARKET COMPARISON
        ================================================= */}

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <SectionTitle
            title={t.mandiCompare}
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-3 py-3">
                    {t.market}
                  </th>

                  <th className="px-3 py-3">
                    {t.rate}
                  </th>

                  <th className="px-3 py-3">
                    {t.transport}
                  </th>

                  <th className="px-3 py-3">
                    {t.netValue}
                  </th>

                  <th className="px-3 py-3">
                    {t.better}
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map(
                  (market) => (
                    <tr
                      key={market.name}
                      className="border-b last:border-0"
                    >
                      <td className="px-3 py-4 font-semibold">
                        {market.name}
                      </td>

                      <td className="px-3 py-4">
                        ₹
                        {market.rate.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td className="px-3 py-4 text-gray-500">
                        ₹
                        {market.transport.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td className="px-3 py-4 font-bold">
                        ₹
                        {market.net.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td className="px-3 py-4">
                        {market.name ===
                        bestMarket.name ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                            ✓
                          </span>
                        ) : (
                          <span className="text-gray-300">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================
            SELL VS STORE
        ================================================= */}

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <SectionTitle
            title={t.sellStore}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <CompareCard
              title={t.sellToday}
              value={`₹${Math.round(
                sellTodayValue
              ).toLocaleString(
                "en-IN"
              )}`}
              label={t.todayRate}
              highlight={
                storageDifference <= 0
              }
            />

            <CompareCard
              title={t.store}
              value={`₹${Math.round(
                storeFutureValue
              ).toLocaleString(
                "en-IN"
              )}`}
              label={`${
                t.futureValue
              } − ${t.storageCost}`}
              highlight={
                storageDifference > 0
              }
            />
          </div>

          <div className="mt-5 rounded-2xl bg-gray-50 p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <MiniMetric
                label={t.storageCost}
                value={`₹${storageCost}/unit`}
              />

              <MiniMetric
                label={t.futureValue}
                value={`₹${futurePrice.toLocaleString(
                  "en-IN"
                )}`}
              />

              <MiniMetric
                label={t.estimatedGain}
                value={`${
                  storageDifference >=
                  0
                    ? "+"
                    : ""
                }₹${Math.round(
                  storageDifference
                ).toLocaleString(
                  "en-IN"
                )}`}
              />
            </div>
          </div>
        </section>

        {/* =================================================
            BUYERS
        ================================================= */}

        <section>
          <SectionTitle
            title={t.buyers}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <BuyerCard
              icon="🤝"
              title={t.trader}
              description="Local crop traders"
            />

            <BuyerCard
              icon="🏭"
              title={t.processor}
              description="Food & grain processors"
            />

            <BuyerCard
              icon="📦"
              title={t.wholesaler}
              description="Bulk market buyers"
            />
          </div>
        </section>

        {/* =================================================
            BUYER REQUIREMENTS
        ================================================= */}

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <SectionTitle
            title={t.buyerRequirements}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <RequirementCard
              label={t.grade}
              value={
                buyerRequirements.grade
              }
            />

            <RequirementCard
              label={t.moisture}
              value={
                buyerRequirements.moisture
              }
            />

            <RequirementCard
              label={t.quantity}
              value={
                buyerRequirements.quantity
              }
            />
          </div>
        </section>

        {/* =================================================
            PRICE ALERT
        ================================================= */}

        <section className="rounded-3xl bg-gray-900 p-6 text-white shadow-sm">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="text-xl font-bold">
                🔔 {t.alert}
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {t.targetPrice}
              </p>

              <div className="mt-4 flex max-w-md gap-3">
                <input
                  value={targetPrice}
                  onChange={(e) =>
                    setTargetPrice(
                      e.target.value
                    )
                  }
                  type="number"
                  min="0"
                  placeholder="₹ 3000"
                  className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-green-500"
                />

                <button
                  onClick={saveAlert}
                  className="whitespace-nowrap rounded-xl bg-green-500 px-5 py-3 font-bold text-white transition hover:bg-green-400"
                >
                  {t.setAlert}
                </button>
              </div>

              {alertMessage && (
                <p className="mt-3 text-sm text-green-400">
                  ✓ {alertMessage}
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-xs text-gray-400">
                {t.todayRate}
              </p>

              <p className="mt-1 text-2xl font-black">
                ₹
                {basePrice.toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            CHECKLIST
        ================================================= */}

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <SectionTitle
              title={t.checklist}
              noMargin
            />

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
              {completedCount}/4{" "}
              {t.complete}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ChecklistItem
              checked={
                checklist.quality
              }
              onClick={() =>
                toggleChecklist(
                  "quality"
                )
              }
              text={t.quality}
            />

            <ChecklistItem
              checked={
                checklist.weighing
              }
              onClick={() =>
                toggleChecklist(
                  "weighing"
                )
              }
              text={t.weighing}
            />

            <ChecklistItem
              checked={
                checklist.receipt
              }
              onClick={() =>
                toggleChecklist(
                  "receipt"
                )
              }
              text={t.receipt}
            />

            <ChecklistItem
              checked={
                checklist.payment
              }
              onClick={() =>
                toggleChecklist(
                  "payment"
                )
              }
              text={t.payment}
            />
          </div>
        </section>

        {/* DISCLAIMER */}

        <p className="pb-8 text-center text-xs leading-5 text-gray-400">
          {t.disclaimer}
        </p>
      </div>
    </main>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionTitle({
  title,
  noMargin = false,
}: {
  title: string;
  noMargin?: boolean;
}) {
  return (
    <h2
      className={`text-xl font-bold ${
        noMargin ? "" : "mb-5"
      }`}
    >
      {title}
    </h2>
  );
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: string;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-xl font-black md:text-2xl">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 font-bold text-green-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

function CompareCard({
  title,
  value,
  label,
  highlight,
}: {
  title: string;
  value: string;
  label: string;
  highlight: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        highlight
          ? "border-green-200 bg-green-50"
          : "border-gray-100 bg-gray-50"
      }`}
    >
      <p className="text-sm font-semibold text-gray-600">
        {title}
      </p>

      <p className="mt-3 text-3xl font-black">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {label}
      </p>
    </div>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-bold">
        {value}
      </p>
    </div>
  );
}

function BuyerCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <button className="group rounded-3xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-2xl">
        {icon}
      </div>

      <h3 className="mt-4 font-bold">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

      <p className="mt-4 text-xs font-bold text-green-600 opacity-0 transition group-hover:opacity-100">
        View →
      </p>
    </button>
  );
}

function RequirementCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-2 font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function ChecklistItem({
  checked,
  onClick,
  text,
}: {
  checked: boolean;
  onClick: () => void;
  text: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
        checked
          ? "border-green-200 bg-green-50"
          : "border-gray-100 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
          checked
            ? "border-green-500 bg-green-500 text-white"
            : "border-gray-300 bg-white text-transparent"
        }`}
      >
        ✓
      </span>

      <span
        className={
          checked
            ? "font-semibold text-green-800 line-through"
            : "font-medium text-gray-700"
        }
      >
        {text}
      </span>
    </button>
  );
}