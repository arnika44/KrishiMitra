// MarketPage.tsx
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
  villageName?: string;
  cityName?: string;
  districtName?: string;
  stateName?: string;
  pinCode?: string;
};

type MandiBase = {
  name: string;
  district: string;
  state: string;
  rate: number;
  marketType: string;
};

type Mandi = MandiBase & {
  id: string;
  distanceKm: number;
  transportPerQuintal: number;
  effectiveRate: number;
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
  quintal: string;
  grossAmount: string;
  totalTransport: string;
  estimatedEarning: string;
  save: string;
  saved: string;
  directions: string;
  availableCrop: string;
  netPerQuintal: string;
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
  marketDescription: "Indicative information for your crop. Verify the latest local mandi rate before selling.",
  cropLabel: "Crop",
  indicativePrice: "Indicative Price",
  marketTrend: "Market Trend",
  sellingAdvice: "💡 Selling Advice",
  nearbyMarket: "📍 Nearby Mandi & Markets",
  nearbyMarketDescription: "Compare mandis using rate, transport cost and effective earning.",
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
  marketType: "Market Type",
  apmc: "APMC Mandi",
  localMarket: "Local Market",
  noMandi: "No mandi data was found for this location. Showing available markets instead.",
  apiFailed: "Live mandi search is unavailable right now. Showing available market information.",
  indicativeNotice: "Mandi rates are indicative. Final rate must be verified at the mandi. Transport cost is estimated and may vary.",
  importantBeforeSelling: "⚠️ Important Before Selling",
  tip1: "Compare prices from more than one nearby mandi whenever possible.",
  tip2: "Crop quality, moisture and grading can affect the final selling price.",
  tip3: "Consider transportation cost before choosing a mandi with a slightly higher price.",
  tip4: "Verify the latest mandi rate before making a final selling decision.",
  bestMandi: "⭐ Best Mandi Recommendation",
  bestOption: "Best option",
  quantityCalculator: "💰 Quantity-wise Earning Calculator",
  quantity: "Quantity",
  quintal: "quintal",
  grossAmount: "Gross Amount",
  totalTransport: "Total Transport Cost",
  estimatedEarning: "Estimated Earning",
  save: "Save Mandi",
  saved: "Saved Mandi",
  directions: "📍 Directions",
  availableCrop: "Available Crop",
  netPerQuintal: "Net per quintal",
  seasonNames: { Kharif: "Kharif", Rabi: "Rabi", Zaid: "Zaid", Other: "Other" },
  trendStable: "Stable",
  trendModerate: "Moderate",
  trendVariable: "Variable",
  trendCheck: "Check local mandi",
  unknownPrice: "Market rate unavailable",
};

const translations: Record<string, Partial<T>> = {
  hi: {
    backTo: "वापस जाएँ", season: "मौसम", market: "बाज़ार", landArea: "जमीन का क्षेत्रफल",
    loadingTitle: "बाज़ार की जानकारी लोड हो रही है...", loadingText: "कृपया प्रतीक्षा करें।",
    cropNotFound: "फसल नहीं मिली", backToCrops: "फसलों पर वापस जाएँ",
    currentMarket: "📊 वर्तमान बाज़ार जानकारी",
    marketDescription: "आपकी फसल के लिए अनुमानित जानकारी। बेचने से पहले स्थानीय मंडी का नवीनतम भाव जाँचें।",
    cropLabel: "फसल", indicativePrice: "अनुमानित कीमत", marketTrend: "बाज़ार का रुझान",
    sellingAdvice: "💡 बिक्री की सलाह", nearbyMarket: "📍 नज़दीकी मंडी और बाज़ार",
    nearbyMarketDescription: "मंडी भाव, परिवहन खर्च और असली कमाई की तुलना करें।",
    profileLocation: "प्रोफाइल लोकेशन", usingProfileLocation: "प्रोफाइल में सेव की गई लोकेशन का उपयोग हो रहा है",
    village: "गाँव", district: "जिला", state: "राज्य", pincode: "पिनकोड",
    findMandi: "📍 नज़दीकी मंडी खोजें", refreshRates: "🔄 नवीनतम भाव रिफ्रेश करें", refreshing: "🔄 रिफ्रेश हो रहा है...",
    lastUpdated: "अंतिम अपडेट", searchingMandi: "🔎 मंडियाँ खोजी जा रही हैं...", tryAgain: "फिर से कोशिश करें",
    mandiFound: "मंडियाँ मिलीं", mandiRate: "मंडी भाव", distance: "दूरी",
    transportation: "अनुमानित परिवहन", effectiveRate: "असली प्रभावी भाव", perQuintal: "प्रति क्विंटल",
    marketType: "बाज़ार का प्रकार", apmc: "APMC मंडी", localMarket: "स्थानीय बाज़ार",
    noMandi: "इस लोकेशन के लिए मंडी डेटा नहीं मिला। उपलब्ध मंडियाँ दिखाई जा रही हैं।",
    apiFailed: "अभी लाइव मंडी खोज उपलब्ध नहीं है। उपलब्ध जानकारी दिखाई जा रही है।",
    indicativeNotice: "मंडी भाव अनुमानित हैं। अंतिम भाव मंडी में जरूर जाँचें। परिवहन खर्च अनुमानित है और बदल सकता है।",
    importantBeforeSelling: "⚠️ बेचने से पहले जरूरी बातें",
    tip1: "जहाँ संभव हो, एक से अधिक नज़दीकी मंडियों के भाव की तुलना करें।",
    tip2: "फसल की गुणवत्ता, नमी और ग्रेडिंग से अंतिम कीमत प्रभावित हो सकती है।",
    tip3: "थोड़ा अधिक भाव वाली मंडी चुनने से पहले परिवहन खर्च भी ध्यान में रखें।",
    tip4: "अंतिम बिक्री निर्णय से पहले नवीनतम मंडी भाव जरूर जाँचें।",
    bestMandi: "⭐ सबसे अच्छी मंडी की सलाह", bestOption: "सबसे अच्छा विकल्प",
    quantityCalculator: "💰 मात्रा के हिसाब से कमाई कैलकुलेटर", quantity: "मात्रा",
    quintal: "क्विंटल", grossAmount: "कुल बिक्री रकम", totalTransport: "कुल परिवहन खर्च",
    estimatedEarning: "अनुमानित कमाई", save: "मंडी सेव करें", saved: "सेव की गई मंडी",
    directions: "📍 रास्ता देखें", availableCrop: "उपलब्ध फसल", netPerQuintal: "प्रति क्विंटल शुद्ध भाव",
    seasonNames: { Kharif: "खरीफ", Rabi: "रबी", Zaid: "जायद", Other: "अन्य" },
    trendStable: "स्थिर", trendModerate: "मध्यम", trendVariable: "बदलता हुआ",
    trendCheck: "स्थानीय मंडी का भाव देखें", unknownPrice: "बाज़ार भाव उपलब्ध नहीं है",
  },
  mr: {
    backTo: "परत जा", season: "हंगाम", market: "बाजार", landArea: "जमिनीचे क्षेत्रफळ",
    currentMarket: "📊 सध्याची बाजार माहिती", cropLabel: "पीक", indicativePrice: "अंदाजे किंमत",
    marketTrend: "बाजाराचा कल", sellingAdvice: "💡 विक्रीचा सल्ला", nearbyMarket: "📍 जवळची बाजारपेठ",
    findMandi: "📍 जवळची बाजारपेठ शोधा", refreshRates: "🔄 नवीनतम दर रिफ्रेश करा",
    refreshing: "🔄 रिफ्रेश होत आहे...", lastUpdated: "शेवटचे अपडेट", mandiFound: "बाजारपेठा सापडल्या",
    mandiRate: "बाजार दर", distance: "अंतर", transportation: "अंदाजे वाहतूक",
    effectiveRate: "वाहतूक खर्चानंतरचा दर", perQuintal: "प्रति क्विंटल", marketType: "बाजाराचा प्रकार",
    apmc: "APMC बाजार", localMarket: "स्थानिक बाजार", bestMandi: "⭐ सर्वोत्तम बाजारपेठ",
    bestOption: "सर्वोत्तम पर्याय", quantityCalculator: "💰 प्रमाणानुसार कमाई कॅल्क्युलेटर",
    quantity: "प्रमाण", quintal: "क्विंटल", grossAmount: "एकूण रक्कम", totalTransport: "एकूण वाहतूक खर्च",
    estimatedEarning: "अंदाजे कमाई", save: "बाजार जतन करा", saved: "जतन केले", directions: "📍 मार्ग",
    availableCrop: "उपलब्ध पीक", netPerQuintal: "प्रति क्विंटल निव्वळ दर",
    indicativeNotice: "बाजार दर अंदाजे आहेत. अंतिम दर बाजारात तपासा. वाहतूक खर्च बदलू शकतो.",
  },
  bn: {
    backTo: "ফিরে যান", season: "মরসুম", market: "বাজার", landArea: "জমির পরিমাণ",
    currentMarket: "📊 বর্তমান বাজারের তথ্য", cropLabel: "ফসল", indicativePrice: "আনুমানিক দাম",
    marketTrend: "বাজারের প্রবণতা", sellingAdvice: "💡 বিক্রির পরামর্শ", nearbyMarket: "📍 কাছাকাছি মণ্ডি ও বাজার",
    findMandi: "📍 কাছাকাছি মণ্ডি খুঁজুন", refreshRates: "🔄 সর্বশেষ দাম রিফ্রেশ করুন",
    refreshing: "🔄 রিফ্রেশ হচ্ছে...", lastUpdated: "শেষ আপডেট", mandiFound: "টি মণ্ডি পাওয়া গেছে",
    mandiRate: "মণ্ডির দাম", distance: "দূরত্ব", transportation: "আনুমানিক পরিবহন",
    effectiveRate: "কার্যকর দাম", perQuintal: "প্রতি কুইন্টাল", bestMandi: "⭐ সেরা মণ্ডির পরামর্শ",
    bestOption: "সেরা বিকল্প", quantityCalculator: "💰 পরিমাণ অনুযায়ী আয় ক্যালকুলেটর",
    quantity: "পরিমাণ", quintal: "কুইন্টাল", grossAmount: "মোট বিক্রয়", totalTransport: "মোট পরিবহন খরচ",
    estimatedEarning: "আনুমানিক আয়", save: "মণ্ডি সংরক্ষণ করুন", saved: "সংরক্ষিত", directions: "📍 পথনির্দেশ",
    availableCrop: "উপলব্ধ ফসল", netPerQuintal: "প্রতি কুইন্টালে নিট দাম",
    indicativeNotice: "মণ্ডির দাম আনুমানিক। চূড়ান্ত দাম মণ্ডিতে যাচাই করুন। পরিবহন খরচ পরিবর্তিত হতে পারে।",
  },
  ta: {
    backTo: "திரும்ப", season: "பருவம்", market: "சந்தை", landArea: "நிலப்பரப்பு",
    currentMarket: "📊 தற்போதைய சந்தை தகவல்", cropLabel: "பயிர்", indicativePrice: "மதிப்பிடப்பட்ட விலை",
    marketTrend: "சந்தை நிலவரம்", sellingAdvice: "💡 விற்பனை ஆலோசனை", nearbyMarket: "📍 அருகிலுள்ள சந்தைகள்",
    findMandi: "📍 அருகிலுள்ள சந்தையை தேடு", refreshRates: "🔄 சமீபத்திய விலையை புதுப்பிக்கவும்",
    refreshing: "🔄 புதுப்பிக்கிறது...", lastUpdated: "கடைசி புதுப்பிப்பு", mandiFound: "சந்தைகள் கிடைத்தன",
    mandiRate: "சந்தை விலை", distance: "தூரம்", transportation: "மதிப்பிடப்பட்ட போக்குவரத்து",
    effectiveRate: "பயனுள்ள விலை", perQuintal: "ஒரு குவிண்டாலுக்கு", bestMandi: "⭐ சிறந்த சந்தை பரிந்துரை",
    bestOption: "சிறந்த தேர்வு", quantityCalculator: "💰 அளவுக்கேற்ப வருமான கணக்கீடு",
    quantity: "அளவு", quintal: "குவிண்டால்", grossAmount: "மொத்த தொகை", totalTransport: "மொத்த போக்குவரத்து செலவு",
    estimatedEarning: "மதிப்பிடப்பட்ட வருமானம்", save: "சந்தையை சேமிக்கவும்", saved: "சேமிக்கப்பட்டது",
    directions: "📍 வழி", availableCrop: "கிடைக்கும் பயிர்", netPerQuintal: "ஒரு குவிண்டாலுக்கான நிகர விலை",
    indicativeNotice: "சந்தை விலைகள் மதிப்பீடுகள். இறுதி விலையை சந்தையில் சரிபார்க்கவும். போக்குவரத்து செலவு மாறலாம்.",
  },
  te: {
    backTo: "వెనక్కి", season: "సీజన్", market: "మార్కెట్", landArea: "భూమి విస్తీర్ణం",
    currentMarket: "📊 ప్రస్తుత మార్కెట్ సమాచారం", cropLabel: "పంట", indicativePrice: "అంచనా ధర",
    marketTrend: "మార్కెట్ ధోరణి", sellingAdvice: "💡 అమ్మకం సలహా", nearbyMarket: "📍 సమీప మండీలు",
    findMandi: "📍 సమీప మండీని కనుగొనండి", refreshRates: "🔄 తాజా ధరలను రిఫ్రెష్ చేయండి",
    refreshing: "🔄 రిఫ్రెష్ అవుతోంది...", lastUpdated: "చివరి నవీకరణ", mandiFound: "మండీలు లభించాయి",
    mandiRate: "మండీ ధర", distance: "దూరం", transportation: "అంచనా రవాణా", effectiveRate: "ప్రభావవంతమైన ధర",
    perQuintal: "క్వింటాల్‌కు", bestMandi: "⭐ ఉత్తమ మండీ సిఫార్సు", bestOption: "ఉత్తమ ఎంపిక",
    quantityCalculator: "💰 పరిమాణం ఆధారంగా ఆదాయ లెక్కింపు", quantity: "పరిమాణం", quintal: "క్వింటాల్",
    grossAmount: "మొత్తం మొత్తం", totalTransport: "మొత్తం రవాణా ఖర్చు", estimatedEarning: "అంచనా ఆదాయం",
    save: "మండీని సేవ్ చేయండి", saved: "సేవ్ చేయబడింది", directions: "📍 దిశలు",
    availableCrop: "అందుబాటులో ఉన్న పంట", netPerQuintal: "క్వింటాల్‌కు నికర ధర",
    indicativeNotice: "మండీ ధరలు అంచనా మాత్రమే. తుది ధరను మండీలో నిర్ధారించండి. రవాణా ఖర్చు మారవచ్చు.",
  },
  gu: {
    backTo: "પાછા જાઓ", season: "મોસમ", market: "બજાર", landArea: "જમીન વિસ્તાર",
    currentMarket: "📊 વર્તમાન બજાર માહિતી", cropLabel: "પાક", indicativePrice: "અંદાજિત કિંમત",
    marketTrend: "બજાર વલણ", sellingAdvice: "💡 વેચાણ સલાહ", nearbyMarket: "📍 નજીકની મંડી",
    findMandi: "📍 નજીકની મંડી શોધો", refreshRates: "🔄 નવીનતમ ભાવ રિફ્રેશ કરો",
    refreshing: "🔄 રિફ્રેશ થઈ રહ્યું છે...", lastUpdated: "છેલ્લું અપડેટ", mandiFound: "મંડીઓ મળી",
    mandiRate: "મંડી ભાવ", distance: "અંતર", transportation: "અંદાજિત પરિવહન", effectiveRate: "અસરકારક ભાવ",
    perQuintal: "પ્રતિ ક્વિન્ટલ", bestMandi: "⭐ શ્રેષ્ઠ મંડી ભલામણ", bestOption: "શ્રેષ્ઠ વિકલ્પ",
    quantityCalculator: "💰 જથ્થા મુજબ કમાણી ગણતરી", quantity: "જથ્થો", quintal: "ક્વિન્ટલ",
    grossAmount: "કુલ રકમ", totalTransport: "કુલ પરિવહન ખર્ચ", estimatedEarning: "અંદાજિત કમાણી",
    save: "મંડી સાચવો", saved: "સાચવેલ", directions: "📍 દિશા", availableCrop: "ઉપલબ્ધ પાક",
    netPerQuintal: "પ્રતિ ક્વિન્ટલ ચોખ્ખો ભાવ",
    indicativeNotice: "મંડીના ભાવ અંદાજિત છે. અંતિમ ભાવ મંડીમાં તપાસો. પરિવહન ખર્ચ બદલાઈ શકે છે.",
  },
  kn: {
    backTo: "ಹಿಂದೆ", season: "ಋತು", market: "ಮಾರುಕಟ್ಟೆ", landArea: "ಭೂಮಿ ವಿಸ್ತೀರ್ಣ",
    currentMarket: "📊 ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ", cropLabel: "ಬೆಳೆ", indicativePrice: "ಅಂದಾಜು ಬೆಲೆ",
    marketTrend: "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿ", sellingAdvice: "💡 ಮಾರಾಟ ಸಲಹೆ", nearbyMarket: "📍 ಹತ್ತಿರದ ಮಂಡಿಗಳು",
    findMandi: "📍 ಹತ್ತಿರದ ಮಂಡಿ ಹುಡುಕಿ", refreshRates: "🔄 ಇತ್ತೀಚಿನ ದರಗಳನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ",
    refreshing: "🔄 ರಿಫ್ರೆಶ್ ಆಗುತ್ತಿದೆ...", lastUpdated: "ಕೊನೆಯ ಅಪ್‌ಡೇಟ್", mandiFound: "ಮಂಡಿಗಳು ಕಂಡುಬಂದಿವೆ",
    mandiRate: "ಮಂಡಿ ದರ", distance: "ದೂರ", transportation: "ಅಂದಾಜು ಸಾರಿಗೆ", effectiveRate: "ಪರಿಣಾಮಕಾರಿ ದರ",
    perQuintal: "ಪ್ರತಿ ಕ್ವಿಂಟಲ್", bestMandi: "⭐ ಅತ್ಯುತ್ತಮ ಮಂಡಿ ಶಿಫಾರಸು", bestOption: "ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ",
    quantityCalculator: "💰 ಪ್ರಮಾಣದ ಆಧಾರದ ಆದಾಯ ಲೆಕ್ಕಾಚಾರ", quantity: "ಪ್ರಮಾಣ", quintal: "ಕ್ವಿಂಟಲ್",
    grossAmount: "ಒಟ್ಟು ಮೊತ್ತ", totalTransport: "ಒಟ್ಟು ಸಾರಿಗೆ ವೆಚ್ಚ", estimatedEarning: "ಅಂದಾಜು ಆದಾಯ",
    save: "ಮಂಡಿ ಉಳಿಸಿ", saved: "ಉಳಿಸಲಾಗಿದೆ", directions: "📍 ದಾರಿ", availableCrop: "ಲಭ್ಯವಿರುವ ಬೆಳೆ",
    netPerQuintal: "ಪ್ರತಿ ಕ್ವಿಂಟಲ್ ನಿವ್ವಳ ದರ",
    indicativeNotice: "ಮಂಡಿ ದರಗಳು ಅಂದಾಜು. ಅಂತಿಮ ದರವನ್ನು ಮಂಡಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ. ಸಾರಿಗೆ ವೆಚ್ಚ ಬದಲಾಗಬಹುದು.",
  },
  ml: {
    backTo: "തിരികെ", season: "സീസൺ", market: "വിപണി", landArea: "ഭൂവിസ്തീർണ്ണം",
    currentMarket: "📊 നിലവിലെ വിപണി വിവരം", cropLabel: "വിള", indicativePrice: "അനുമാന വില",
    marketTrend: "വിപണി പ്രവണത", sellingAdvice: "💡 വിൽപ്പന ഉപദേശം", nearbyMarket: "📍 സമീപ വിപണികൾ",
    findMandi: "📍 സമീപ വിപണി കണ്ടെത്തുക", refreshRates: "🔄 പുതിയ നിരക്ക് പുതുക്കുക",
    refreshing: "🔄 പുതുക്കുന്നു...", lastUpdated: "അവസാന അപ്ഡേറ്റ്", mandiFound: "വിപണികൾ കണ്ടെത്തി",
    mandiRate: "വിപണി നിരക്ക്", distance: "ദൂരം", transportation: "അനുമാന ഗതാഗത ചെലവ്",
    effectiveRate: "ഫലപ്രദമായ നിരക്ക്", perQuintal: "ക്വിന്റലിന്", bestMandi: "⭐ മികച്ച വിപണി ശുപാർശ",
    bestOption: "മികച്ച തിരഞ്ഞെടുപ്പ്", quantityCalculator: "💰 അളവ് അനുസരിച്ചുള്ള വരുമാന കണക്കുകൂട്ടൽ",
    quantity: "അളവ്", quintal: "ക്വിന്റൽ", grossAmount: "മൊത്തം തുക", totalTransport: "മൊത്തം ഗതാഗത ചെലവ്",
    estimatedEarning: "അനുമാന വരുമാനം", save: "വിപണി സേവ് ചെയ്യുക", saved: "സേവ് ചെയ്തു",
    directions: "📍 വഴി", availableCrop: "ലഭ്യമായ വിള", netPerQuintal: "ക്വിന്റലിന് ശുദ്ധ നിരക്ക്",
    indicativeNotice: "വിപണി നിരക്കുകൾ അനുമാനമാണ്. അന്തിമ നിരക്ക് വിപണിയിൽ പരിശോധിക്കുക. ഗതാഗത ചെലവ് മാറാം.",
  },
  pa: {
    backTo: "ਵਾਪਸ", season: "ਮੌਸਮ", market: "ਮੰਡੀ", landArea: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰ",
    currentMarket: "📊 ਮੌਜੂਦਾ ਮੰਡੀ ਜਾਣਕਾਰੀ", cropLabel: "ਫਸਲ", indicativePrice: "ਅੰਦਾਜ਼ਨ ਕੀਮਤ",
    marketTrend: "ਮੰਡੀ ਰੁਝਾਨ", sellingAdvice: "💡 ਵਿਕਰੀ ਸਲਾਹ", nearbyMarket: "📍 ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ",
    findMandi: "📍 ਨੇੜਲੀ ਮੰਡੀ ਲੱਭੋ", refreshRates: "🔄 ਤਾਜ਼ਾ ਭਾਅ ਰਿਫ੍ਰੈਸ਼ ਕਰੋ",
    refreshing: "🔄 ਰਿਫ੍ਰੈਸ਼ ਹੋ ਰਿਹਾ ਹੈ...", lastUpdated: "ਆਖਰੀ ਅੱਪਡੇਟ", mandiFound: "ਮੰਡੀਆਂ ਮਿਲੀਆਂ",
    mandiRate: "ਮੰਡੀ ਭਾਅ", distance: "ਦੂਰੀ", transportation: "ਅੰਦਾਜ਼ਨ ਆਵਾਜਾਈ", effectiveRate: "ਅਸਲ ਭਾਅ",
    perQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ", bestMandi: "⭐ ਸਭ ਤੋਂ ਵਧੀਆ ਮੰਡੀ", bestOption: "ਸਭ ਤੋਂ ਵਧੀਆ ਚੋਣ",
    quantityCalculator: "💰 ਮਾਤਰਾ ਅਨੁਸਾਰ ਕਮਾਈ ਕੈਲਕੁਲੇਟਰ", quantity: "ਮਾਤਰਾ", quintal: "ਕੁਇੰਟਲ",
    grossAmount: "ਕੁੱਲ ਰਕਮ", totalTransport: "ਕੁੱਲ ਆਵਾਜਾਈ ਖਰਚ", estimatedEarning: "ਅੰਦਾਜ਼ਨ ਕਮਾਈ",
    save: "ਮੰਡੀ ਸੇਵ ਕਰੋ", saved: "ਸੇਵ ਕੀਤੀ", directions: "📍 ਰਸਤਾ", availableCrop: "ਉਪਲਬਧ ਫਸਲ",
    netPerQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਨੈੱਟ ਭਾਅ",
    indicativeNotice: "ਮੰਡੀ ਭਾਅ ਅੰਦਾਜ਼ਨ ਹਨ। ਅੰਤਿਮ ਭਾਅ ਮੰਡੀ ਵਿੱਚ ਪੱਕਾ ਕਰੋ। ਆਵਾਜਾਈ ਖਰਚ ਬਦਲ ਸਕਦਾ ਹੈ।",
  },
  or: {
    backTo: "ପଛକୁ", season: "ଋତୁ", market: "ବଜାର", landArea: "ଜମି ଅଞ୍ଚଳ",
    currentMarket: "📊 ବର୍ତ୍ତମାନ ବଜାର ସୂଚନା", cropLabel: "ଫସଲ", indicativePrice: "ଆନୁମାନିକ ମୂଲ୍ୟ",
    marketTrend: "ବଜାର ପ୍ରବଣତା", sellingAdvice: "💡 ବିକ୍ରୟ ପରାମର୍ଶ", nearbyMarket: "📍 ନିକଟସ୍ଥ ମଣ୍ଡି",
    findMandi: "📍 ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜନ୍ତୁ", refreshRates: "🔄 ନୂତନ ଦର ରିଫ୍ରେଶ କରନ୍ତୁ",
    refreshing: "🔄 ରିଫ୍ରେଶ ହେଉଛି...", lastUpdated: "ଶେଷ ଅପଡେଟ୍", mandiFound: "ମଣ୍ଡି ମିଳିଲା",
    mandiRate: "ମଣ୍ଡି ଦର", distance: "ଦୂରତା", transportation: "ଆନୁମାନିକ ପରିବହନ",
    effectiveRate: "ପ୍ରଭାବୀ ଦର", perQuintal: "ପ୍ରତି କ୍ୱିଣ୍ଟାଲ", bestMandi: "⭐ ସର୍ବୋତ୍ତମ ମଣ୍ଡି",
    bestOption: "ସର୍ବୋତ୍ତମ ବିକଳ୍ପ", quantityCalculator: "💰 ପରିମାଣ ଅନୁସାରେ ଆୟ ହିସାବ",
    quantity: "ପରିମାଣ", quintal: "କ୍ୱିଣ୍ଟାଲ", grossAmount: "ମୋଟ ରାଶି", totalTransport: "ମୋଟ ପରିବହନ ଖର୍ଚ୍ଚ",
    estimatedEarning: "ଆନୁମାନିକ ଆୟ", save: "ମଣ୍ଡି ସେଭ୍ କରନ୍ତୁ", saved: "ସେଭ୍ ହୋଇଛି",
    directions: "📍 ରାସ୍ତା", availableCrop: "ଉପଲବ୍ଧ ଫସଲ", netPerQuintal: "ପ୍ରତି କ୍ୱିଣ୍ଟାଲ ନିଟ୍ ଦର",
    indicativeNotice: "ମଣ୍ଡି ଦର ଆନୁମାନିକ। ଅନ୍ତିମ ଦର ମଣ୍ଡିରେ ଯାଞ୍ଚ କରନ୍ତୁ। ପରିବହନ ଖର୍ଚ୍ଚ ବଦଳିପାରେ।",
  },
  as: {
    backTo: "উভতি যাওক", season: "ঋতু", market: "বজাৰ", landArea: "মাটিৰ পৰিমাণ",
    currentMarket: "📊 বৰ্তমান বজাৰৰ তথ্য", cropLabel: "শস্য", indicativePrice: "আনুমানিক মূল্য",
    marketTrend: "বজাৰৰ ধাৰা", sellingAdvice: "💡 বিক্ৰীৰ পৰামৰ্শ", nearbyMarket: "📍 ওচৰৰ মণ্ডী",
    findMandi: "📍 ওচৰৰ মণ্ডী বিচাৰক", refreshRates: "🔄 শেহতীয়া দাম ৰিফ্ৰেছ কৰক",
    refreshing: "🔄 ৰিফ্ৰেছ হৈ আছে...", lastUpdated: "শেষ আপডেট", mandiFound: "খন মণ্ডী পোৱা গৈছে",
    mandiRate: "মণ্ডীৰ দাম", distance: "দূৰত্ব", transportation: "আনুমানিক পৰিবহণ",
    effectiveRate: "কাৰ্যকৰী দাম", perQuintal: "প্ৰতি কুইণ্টল", bestMandi: "⭐ সৰ্বোত্তম মণ্ডী",
    bestOption: "সৰ্বোত্তম বিকল্প", quantityCalculator: "💰 পৰিমাণ অনুসৰি উপাৰ্জন গণনা",
    quantity: "পৰিমাণ", quintal: "কুইণ্টল", grossAmount: "মুঠ ধন", totalTransport: "মুঠ পৰিবহণ খৰচ",
    estimatedEarning: "আনুমানিক উপাৰ্জন", save: "মণ্ডী সংৰক্ষণ কৰক", saved: "সংৰক্ষিত",
    directions: "📍 পথ", availableCrop: "উপলব্ধ শস্য", netPerQuintal: "প্ৰতি কুইণ্টল নিট দাম",
    indicativeNotice: "মণ্ডীৰ দাম আনুমানিক। চূড়ান্ত দাম মণ্ডীত নিশ্চিত কৰক। পৰিবহণ খৰচ সলনি হ'ব পাৰে।",
  },
  ur: {
    backTo: "واپس", season: "موسم", market: "منڈی", landArea: "زمین کا رقبہ",
    currentMarket: "📊 موجودہ منڈی کی معلومات", cropLabel: "فصل", indicativePrice: "تخمینی قیمت",
    marketTrend: "منڈی کا رجحان", sellingAdvice: "💡 فروخت کا مشورہ", nearbyMarket: "📍 قریبی منڈیاں",
    findMandi: "📍 قریبی منڈی تلاش کریں", refreshRates: "🔄 تازہ ترین ریٹ ریفریش کریں",
    refreshing: "🔄 ریفریش ہو رہا ہے...", lastUpdated: "آخری اپڈیٹ", mandiFound: "منڈیاں ملیں",
    mandiRate: "منڈی ریٹ", distance: "فاصلہ", transportation: "تخمینی ٹرانسپورٹ",
    effectiveRate: "مؤثر ریٹ", perQuintal: "فی کوئنٹل", bestMandi: "⭐ بہترین منڈی کی سفارش",
    bestOption: "بہترین آپشن", quantityCalculator: "💰 مقدار کے حساب سے کمائی کیلکولیٹر",
    quantity: "مقدار", quintal: "کوئنٹل", grossAmount: "کل رقم", totalTransport: "کل ٹرانسپورٹ خرچ",
    estimatedEarning: "تخمینی کمائی", save: "منڈی محفوظ کریں", saved: "محفوظ شدہ",
    directions: "📍 راستہ", availableCrop: "دستیاب فصل", netPerQuintal: "فی کوئنٹل خالص ریٹ",
    indicativeNotice: "منڈی ریٹس اندازاً ہیں۔ حتمی ریٹ منڈی میں ضرور چیک کریں۔ ٹرانسپورٹ خرچ بدل سکتا ہے۔",
  },
};

const MANDI_DATABASE: MandiBase[] = [
  { name: "Supaul APMC Mandi", district: "Supaul", state: "Bihar", rate: 2550, marketType: "APMC" },
  { name: "Birpur APMC Mandi", district: "Supaul", state: "Bihar", rate: 2500, marketType: "APMC" },
  { name: "Triveniganj APMC Mandi", district: "Supaul", state: "Bihar", rate: 2480, marketType: "APMC" },
  { name: "Saharsa APMC Mandi", district: "Saharsa", state: "Bihar", rate: 2520, marketType: "APMC" },
  { name: "Madhepura APMC Mandi", district: "Madhepura", state: "Bihar", rate: 2500, marketType: "APMC" },
  { name: "Araria APMC Mandi", district: "Araria", state: "Bihar", rate: 2470, marketType: "APMC" },
  { name: "Purnia APMC Mandi", district: "Purnia", state: "Bihar", rate: 2580, marketType: "APMC" },
  { name: "Forbesganj APMC Mandi", district: "Araria", state: "Bihar", rate: 2510, marketType: "APMC" },
  { name: "Darbhanga APMC Mandi", district: "Darbhanga", state: "Bihar", rate: 2560, marketType: "APMC" },
  { name: "Muzaffarpur APMC Mandi", district: "Muzaffarpur", state: "Bihar", rate: 2600, marketType: "APMC" },
  { name: "Patna APMC Mandi", district: "Patna", state: "Bihar", rate: 2580, marketType: "APMC" },
  { name: "Begusarai APMC Mandi", district: "Begusarai", state: "Bihar", rate: 2540, marketType: "APMC" },
  { name: "Gorakhpur Mandi", district: "Gorakhpur", state: "Uttar Pradesh", rate: 2600, marketType: "APMC" },
  { name: "Lucknow Mandi", district: "Lucknow", state: "Uttar Pradesh", rate: 2680, marketType: "APMC" },
  { name: "Varanasi Mandi", district: "Varanasi", state: "Uttar Pradesh", rate: 2650, marketType: "APMC" },
  { name: "Ayodhya Mandi", district: "Ayodhya", state: "Uttar Pradesh", rate: 2620, marketType: "APMC" },
  { name: "Siliguri Agricultural Market", district: "Darjeeling", state: "West Bengal", rate: 2550, marketType: "Local Market" },
  { name: "Malda Agricultural Market", district: "Malda", state: "West Bengal", rate: 2500, marketType: "Local Market" },
  { name: "Ranchi Agricultural Market", district: "Ranchi", state: "Jharkhand", rate: 2450, marketType: "APMC" },
  { name: "Deoghar Agricultural Market", district: "Deoghar", state: "Jharkhand", rate: 2480, marketType: "APMC" },
  { name: "Azadpur Mandi", district: "Delhi", state: "Delhi", rate: 2700, marketType: "APMC" },
  { name: "Ludhiana Mandi", district: "Ludhiana", state: "Punjab", rate: 2650, marketType: "APMC" },
  { name: "Amritsar Mandi", district: "Amritsar", state: "Punjab", rate: 2680, marketType: "APMC" },
  { name: "Karnal Mandi", district: "Karnal", state: "Haryana", rate: 2670, marketType: "APMC" },
  { name: "Hisar Mandi", district: "Hisar", state: "Haryana", rate: 2640, marketType: "APMC" },
  { name: "Indore Mandi", district: "Indore", state: "Madhya Pradesh", rate: 2550, marketType: "APMC" },
  { name: "Bhopal Mandi", district: "Bhopal", state: "Madhya Pradesh", rate: 2580, marketType: "APMC" },
];

const normalize = (v: unknown) => String(v ?? "").trim().toLowerCase();

function estimateDistance(userDistrict: string, mandiDistrict: string, index: number) {
  if (normalize(userDistrict) && normalize(userDistrict) === normalize(mandiDistrict)) {
    return 5 + index * 2;
  }
  return 25 + index * 18;
}

function estimateTransport(distanceKm: number) {
  if (distanceKm <= 10) return 150;
  if (distanceKm <= 25) return 250;
  if (distanceKm <= 50) return 400;
  if (distanceKm <= 75) return 550;
  if (distanceKm <= 100) return 700;
  if (distanceKm <= 150) return 950;
  return 1200;
}

function getProfileFromStorage(): Profile {
  for (const key of ["farmerProfile", "profile", "userProfile", "farmer", "user", "profileData"]) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const data = JSON.parse(raw);
      if (data && typeof data === "object") return data as Profile;
    } catch {}
  }
  return {};
}

function getMarketInfo(cropName: string, language: string, t: T) {
  const name = normalize(cropName);
  const isWheat = /wheat|गेह|गहू|গম|கோதுமை|గోధుమ|ઘઉં|ಗೋಧಿ/.test(name);
  const isRice = /rice|paddy|धान|चावल|तांदूळ|ধান|அரிசி|వరి|ચોખા|ಅಕ್ಕಿ/.test(name);
  const isMaize = /maize|corn|मक्का|मका|ভুট্টা|மக்காச்சோளம்|మొక్కజొన్న|મકાઈ|ಮೆಕ್ಕೆಜೋಳ/.test(name);
  const isPotato = /potato|aloo|आलू|बटाटा|আলু|உருளைக்கிழங்கு|బంగాళాదుంప|બટાકા|ಆಲೂಗಡ್ಡೆ/.test(name);

  if (isWheat) {
    const adviceByLang: Record<string, string> = {
      hi: "बेचने से पहले आसपास की मंडियों के भाव की तुलना करें। स्थानीय भाव बहुत कम हो तो तुरंत बेचने से बचें।",
      mr: "विक्रीपूर्वी जवळच्या बाजारपेठांमधील दरांची तुलना करा. स्थानिक दर खूप कमी असल्यास लगेच विक्री टाळा.",
      bn: "বিক্রির আগে কাছাকাছি মণ্ডির দাম তুলনা করুন। স্থানীয় দাম খুব কম হলে সঙ্গে সঙ্গে বিক্রি এড়িয়ে চলুন।",
      ta: "விற்பனைக்கு முன் அருகிலுள்ள சந்தைகளின் விலைகளை ஒப்பிடுங்கள். உள்ளூர் விலை மிகவும் குறைவாக இருந்தால் உடனடியாக விற்பதைத் தவிர்க்கவும்.",
    };
    return { price: "₹2,400 – ₹2,600", trend: t.trendStable, advice: adviceByLang[language] || "Compare nearby mandi prices before selling." };
  }
  if (isRice) return { price: "₹2,200 – ₹2,500", trend: t.trendModerate, advice: language === "hi" ? "धान की गुणवत्ता और मंडी भाव की तुलना करें।" : "Check rice quality requirements and compare mandi rates before selling." };
  if (isMaize) return { price: "₹2,000 – ₹2,400", trend: t.trendStable, advice: language === "hi" ? "नमी और दाने की गुणवत्ता जाँचें।" : "Check moisture and grain quality before selling." };
  if (isPotato) return { price: "₹1,200 – ₹1,800", trend: t.trendVariable, advice: language === "hi" ? "आज के स्थानीय भाव और भंडारण विकल्प की तुलना करें।" : "Compare today's local rates and storage options before selling." };
  return { price: t.unknownPrice, trend: t.trendCheck, advice: language === "hi" ? "इस फसल का नवीनतम भाव जानने के लिए अपनी नज़दीकी मंडी से संपर्क करें।" : "Check your nearest mandi for the latest price of this crop." };
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
  const [quantity, setQuantity] = useState("20");
  const [lastUpdated, setLastUpdated] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) setLanguage(savedLanguage);

    const savedCrops = localStorage.getItem("farmerCrops");
    if (savedCrops) {
      try {
        const crops: Crop[] = JSON.parse(savedCrops);
        const selected = crops.find((item) => item.id === Number(params.id));
        if (selected) setCrop(selected);
      } catch {}
    }

    setProfile(getProfileFromStorage());

    try {
      const savedFavs = JSON.parse(localStorage.getItem("favoriteMandis") || "[]");
      if (Array.isArray(savedFavs)) setFavorites(savedFavs);
    } catch {}

    setLoading(false);
  }, [params.id]);

  const t: T = { ...en, ...(translations[language] || {}) };
  const isRTL = language === "ur";

  const profileLocation = useMemo(() => ({
    village: String(profile.village || profile.villageName || ""),
    city: String(profile.city || profile.cityName || ""),
    district: String(profile.district || profile.districtName || ""),
    state: String(profile.state || profile.stateName || ""),
    pincode: String(profile.pincode || profile.pinCode || ""),
  }), [profile]);

  const getSeasonName = (season: string) =>
    season === "Kharif" ? t.seasonNames.Kharif :
    season === "Rabi" ? t.seasonNames.Rabi :
    season === "Zaid" ? t.seasonNames.Zaid :
    season === "Other" ? t.seasonNames.Other : season;

  const searchMandis = async () => {
    if (!crop) return;
    setSearching(true);

    const userDistrict = profileLocation.district;
    const userState = profileLocation.state;

    // IMPORTANT: Keep ALL existing mandi locations visible.
    // Do not remove mandis just because they are outside the farmer's district/state.
    // The complete available mandi database is shown and ranked by effective rate.
    const selected = [...MANDI_DATABASE];

    const finalMandis: Mandi[] = selected.map((m, index) => {
      const distanceKm = estimateDistance(userDistrict, m.district, index);
      const transportPerQuintal = estimateTransport(distanceKm);
      return {
        ...m,
        id: `${m.name}-${index}`,
        distanceKm,
        transportPerQuintal,
        effectiveRate: Math.max(0, m.rate - transportPerQuintal),
      };
    });

    // Most profitable mandi first.
    finalMandis.sort((a, b) => b.effectiveRate - a.effectiveRate);

    await new Promise((resolve) => setTimeout(resolve, 350));
    setMandis(finalMandis);
    setSearched(true);
    setSearching(false);
    setLastUpdated(new Date().toLocaleString("en-IN"));
  };

  const market = crop ? getMarketInfo(crop.crop, language, t) : null;
  const qty = Math.max(0, Number(quantity) || 0);
  const bestMandi = mandis[0] || null;

  const toggleFavorite = (mandi: Mandi) => {
    const next = favorites.includes(mandi.id)
      ? favorites.filter((id) => id !== mandi.id)
      : [...favorites, mandi.id];
    setFavorites(next);
    localStorage.setItem("favoriteMandis", JSON.stringify(next));
  };

  const openDirections = (mandi: Mandi) => {
    const origin = [profileLocation.village, profileLocation.city, profileLocation.district, profileLocation.state]
      .filter(Boolean).join(", ");
    const destination = `${mandi.name}, ${mandi.district}, ${mandi.state}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center px-5" dir={isRTL ? "rtl" : "ltr"}>
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h1 className="text-2xl font-bold text-green-800">{t.loadingTitle}</h1>
          <p className="text-gray-500 mt-2">{t.loadingText}</p>
        </div>
      </main>
    );
  }

  if (!crop || !market) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center px-5" dir={isRTL ? "rtl" : "ltr"}>
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🌱</div>
          <h1 className="text-2xl font-bold text-gray-900">{t.cropNotFound}</h1>
          <button onClick={() => router.push("/crops")} className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800">
            ← {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-green-50 px-5 py-10" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        <button onClick={() => router.push(`/crops/${crop.id}`)} className="text-green-700 font-semibold mb-6 hover:text-green-900">
          ← {t.backTo} {crop.crop}
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">🏪</div>
            <div>
              <p className="text-sm text-green-600 font-semibold">{getSeasonName(crop.season)} {t.season}</p>
              <h1 className="text-3xl font-bold text-green-800 mt-1">{crop.crop} {t.market}</h1>
              <p className="text-gray-600 mt-2">{t.landArea}: <span className="font-semibold">{crop.land} {crop.landUnit || "acres"}</span></p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <h2 className="text-2xl font-bold text-green-800">{t.currentMarket}</h2>
          <p className="text-gray-600 mt-2">{t.marketDescription}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">🌾</div>
              <p className="text-sm text-gray-500">{t.cropLabel}</p>
              <p className="text-xl font-bold text-green-800 mt-1">{crop.crop}</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">💰</div>
              <p className="text-sm text-gray-500">{t.indicativePrice}</p>
              <p className="text-xl font-bold text-green-800 mt-1">{market.price}</p>
              <p className="text-sm text-gray-500 mt-1">{t.perQuintal}</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">📈</div>
              <p className="text-sm text-gray-500">{t.marketTrend}</p>
              <p className="text-xl font-bold text-green-800 mt-1">{market.trend}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <h2 className="text-2xl font-bold text-green-800">{t.sellingAdvice}</h2>
          <div className="bg-green-50 rounded-2xl p-6 mt-5">
            <p className="text-gray-700 leading-relaxed">{market.advice}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <h2 className="text-2xl font-bold text-green-800">{t.nearbyMarket}</h2>
          <p className="text-gray-600 mt-2">{t.nearbyMarketDescription}</p>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">📍</div>
              <div>
                <p className="text-sm text-blue-600 font-semibold">{t.profileLocation}</p>
                <p className="font-bold text-blue-900">
                  {[profileLocation.village, profileLocation.city, profileLocation.district, profileLocation.state, profileLocation.pincode]
                    .filter(Boolean).join(", ") || "—"}
                </p>
                <p className="text-sm text-blue-700 mt-1">✓ {t.usingProfileLocation}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                [t.village, profileLocation.village],
                [t.district, profileLocation.district],
                [t.state, profileLocation.state],
                [t.pincode, profileLocation.pincode],
              ].map(([label, value]) => (
                <div key={label} className="bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="font-bold text-gray-800 mt-1">{value || "—"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={searchMandis}
              disabled={searching}
              className="px-7 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 disabled:opacity-60 transition"
            >
              {searching ? t.searchingMandi : t.findMandi}
            </button>

            {searched && (
              <button
                onClick={searchMandis}
                disabled={searching}
                className="px-7 py-3 rounded-xl bg-white border-2 border-green-700 text-green-700 font-bold hover:bg-green-50 disabled:opacity-60 transition"
              >
                {searching ? t.refreshing : t.refreshRates}
              </button>
            )}
          </div>

          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-3">
              🕒 {t.lastUpdated}: {lastUpdated}
            </p>
          )}

          {searched && bestMandi && (
            <div className="mt-7 bg-green-700 text-white rounded-3xl p-6 shadow-md">
              <p className="font-bold text-lg">{t.bestMandi}</p>
              <h3 className="text-2xl font-extrabold mt-2">
                ⭐ {t.bestOption}: {bestMandi.name}
              </h3>
              <p className="mt-2">
                {t.effectiveRate}: <strong>₹{bestMandi.effectiveRate.toLocaleString("en-IN")}</strong> {t.perQuintal}
              </p>
              <p className="text-sm text-green-100 mt-1">
                {t.mandiRate}: ₹{bestMandi.rate.toLocaleString("en-IN")} − ₹{bestMandi.transportPerQuintal.toLocaleString("en-IN")} {t.perQuintal}
              </p>
            </div>
          )}

          {searched && mandis.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-green-800">{mandis.length} {t.mandiFound}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {[profileLocation.district, profileLocation.state].filter(Boolean).join(", ")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                {mandis.map((mandi, index) => {
                  const gross = mandi.rate * qty;
                  const totalTransport = mandi.transportPerQuintal * qty;
                  const earning = Math.max(0, gross - totalTransport);
                  const isFavorite = favorites.includes(mandi.id);

                  return (
                    <div key={mandi.id} className={`border rounded-3xl p-6 bg-green-50 hover:shadow-md transition ${index === 0 ? "border-green-400 ring-2 ring-green-100" : "border-green-100"}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">🏪</div>
                          <div>
                            <h4 className="text-xl font-bold text-green-900">{mandi.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{mandi.district}, {mandi.state}</p>
                            <p className="text-xs text-gray-500 mt-1">{mandi.marketType === "APMC" ? t.apmc : t.localMarket}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleFavorite(mandi)}
                          className="shrink-0 px-3 py-2 rounded-xl bg-white border text-sm font-bold hover:bg-yellow-50"
                          title={isFavorite ? t.saved : t.save}
                        >
                          {isFavorite ? "❤️" : "🤍"}
                        </button>
                      </div>

                      <div className="mt-6 bg-white rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">{t.mandiRate}</p>
                            <p className="text-3xl font-extrabold text-green-700 mt-1">₹{mandi.rate.toLocaleString("en-IN")}</p>
                            <p className="text-sm text-gray-500">{t.perQuintal}</p>
                          </div>
                          <div className="text-5xl">💰</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                        <div className="bg-white rounded-xl p-4">
                          <p className="text-xs text-gray-500">📏 {t.distance}</p>
                          <p className="font-bold text-gray-800 mt-1">{mandi.distanceKm} km</p>
                        </div>
                        <div className="bg-white rounded-xl p-4">
                          <p className="text-xs text-gray-500">🚚 {t.transportation}</p>
                          <p className="font-bold text-orange-700 mt-1">₹{mandi.transportPerQuintal.toLocaleString("en-IN")}</p>
                          <p className="text-xs text-gray-400">{t.perQuintal}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4">
                          <p className="text-xs text-gray-500">💵 {t.effectiveRate}</p>
                          <p className="font-bold text-green-700 mt-1">₹{mandi.effectiveRate.toLocaleString("en-IN")}</p>
                          <p className="text-xs text-gray-400">{t.perQuintal}</p>
                        </div>
                      </div>

                      <div className="mt-4 bg-white rounded-2xl p-5">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500">{t.availableCrop}</p>
                            <p className="font-bold mt-1">{crop.crop}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">{t.netPerQuintal}</p>
                            <p className="font-bold text-green-700 mt-1">₹{mandi.effectiveRate.toLocaleString("en-IN")}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => openDirections(mandi)}
                          className="mt-4 w-full px-4 py-2 rounded-xl border-2 border-green-700 text-green-700 font-bold hover:bg-green-50"
                        >
                          {t.directions}
                        </button>
                      </div>

                      <div className="mt-4 bg-green-100 rounded-2xl p-4">
                        <p className="font-bold text-green-900">{t.quantityCalculator}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <label className="text-sm font-semibold">{t.quantity}</label>
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-28 rounded-xl border border-green-200 bg-white px-3 py-2 font-bold outline-none focus:ring-2 focus:ring-green-400"
                          />
                          <span className="text-sm">{t.quintal}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                          <div className="bg-white rounded-xl p-3">
                            <p className="text-xs text-gray-500">{t.grossAmount}</p>
                            <p className="font-bold text-blue-700 mt-1">₹{gross.toLocaleString("en-IN")}</p>
                          </div>
                          <div className="bg-white rounded-xl p-3">
                            <p className="text-xs text-gray-500">{t.totalTransport}</p>
                            <p className="font-bold text-orange-700 mt-1">₹{totalTransport.toLocaleString("en-IN")}</p>
                          </div>
                          <div className="bg-white rounded-xl p-3">
                            <p className="text-xs text-gray-500">{t.estimatedEarning}</p>
                            <p className="font-extrabold text-green-700 mt-1">₹{earning.toLocaleString("en-IN")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                <p className="text-sm text-yellow-900 leading-relaxed">⚠️ {t.indicativeNotice}</p>
              </div>
            </div>
          )}

          {searched && mandis.length === 0 && (
            <div className="mt-7 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <p className="text-yellow-900">{t.noMandi}</p>
              <button onClick={searchMandis} className="mt-4 px-5 py-2 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800">
                {t.tryAgain}
              </button>
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7">
          <h2 className="text-2xl font-bold text-yellow-800">{t.importantBeforeSelling}</h2>
          <div className="space-y-4 mt-5">
            {[
              ["📊", t.tip1],
              ["🌾", t.tip2],
              ["🚚", t.tip3],
              ["💰", t.tip4],
            ].map(([icon, text]) => (
              <div className="flex gap-4" key={text}>
                <div className="text-2xl">{icon}</div>
                <p className="text-yellow-900">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
