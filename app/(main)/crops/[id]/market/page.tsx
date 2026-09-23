"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "../../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../../lib/language";
import NewLogisticsPage from "./newpage";

type Crop = {
  id?: string | number;
  crop?: string;
  name?: string;
  season?: string;
  land?: string;
};

type Profile = {
  name?: string;
  farmerName?: string;
  district?: string;
  state?: string;
  address?: string;
  village?: string;
  city?: string;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
};

type QuantityUnit = "kg" | "quintal" | "ton" | "bag";

type MandiBase = {
  id: string;
  name: string;
  district: string;
  state: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  ratePerKg: number;
  crops: string[];
};

type Mandi = MandiBase & {
  distanceKm: number;
  totalKg: number;
  estimatedAmount: number;
};

type Translation = {
  title: string;
  subtitle: string;
  cropDetails: string;
  selectedCrop: string;
  season: string;
  farmerLocation: string;
  locationNotAvailable: string;
  currentGps: string;
  profileCoordinates: string;
  district: string;
  useCurrentLocation: string;
  gettingLocation: string;
  currentLocationSet: string;
  locationNotSupported: string;
  locationFailed: string;
  indicativePrice: string;
  currentIndicativeRate: string;
  perKg: string;
  indicativeDemoPrice: string;
  priceBasis: string;
  yourQuantity: string;
  indicativeEstimatedValue: string;
  calculation: string;
  indicativeAmountNote: string;
  quantity: string;
  unit: string;
  enterQuantity: string;
  totalWeight: string;
  kilogram: string;
  quintal: string;
  ton: string;
  bag: string;
  note: string;
  nearbyMandiSearch: string;
  onlyMandis: string;
  findNearbyMandis: string;
  searching: string;
  clear: string;
  nearbyMandis: string;
  found: string;
  priceKg: string;
  totalQuantity: string;
  estimatedAmount: string;
  selectMandi: string;
  selected: string;
  directions: string;
  call: string;
  copy: string;
  addressCopied: string;
  selectedMandi: string;
  crop: string;
  continueLogistics: string;
  searchNearby: string;
  searchDescription: string;
  demoNote: string;
  staticDemoData: string;
  quantityRequired: string;
  profileLocationMissing: string;
  mandiSelected: string;
};

const translations: Record<LanguageCode, Translation> = {
  en: {
    title: "🌾 Mandi & Market",
    subtitle: "Find mandis within 60 KM of the farmer profile location.",
    cropDetails: "🌱 Crop Details",
    selectedCrop: "Selected Crop",
    season: "Season",
    farmerLocation: "📍 Farmer Location",
    locationNotAvailable: "Location not available",
    currentGps: "Current GPS",
    profileCoordinates: "Profile coordinates",
    district: "District",
    useCurrentLocation: "📍 Use Current Location",
    gettingLocation: "Getting location...",
    currentLocationSet: "Current location has been set.",
    locationNotSupported: "Geolocation is not supported by your browser.",
    locationFailed:
      "Could not get current location. Please check location permission.",
    indicativePrice: "💰 Indicative Price",
    currentIndicativeRate: "Current indicative market rate",
    perKg: "per KG",
    indicativeDemoPrice:
      "Indicative demo price based on the selected crop.",
    priceBasis: "📌 Price Basis",
    yourQuantity: "Your Quantity",
    indicativeEstimatedValue: "Indicative Estimated Value",
    calculation: "Calculation",
    indicativeAmountNote:
      "This amount is an indicative value based on the selected crop price. Use it to compare different mandi offers.",
    quantity: "📦 Quantity",
    unit: "Unit",
    enterQuantity: "Enter quantity",
    totalWeight: "Total Weight",
    kilogram: "Kilogram (KG)",
    quintal: "Quintal",
    ton: "Ton",
    bag: "Bag (50 KG)",
    note: "Note",
    nearbyMandiSearch: "🔎 Nearby Mandi Search",
    onlyMandis: "Only mandis within 60 KM will be shown.",
    findNearbyMandis: "🔎 Find Nearby Mandis",
    searching: "Searching...",
    clear: "Clear",
    nearbyMandis: "🏪 Nearby Mandis",
    found: "found",
    priceKg: "Price / KG",
    totalQuantity: "Total Quantity",
    estimatedAmount: "Estimated Amount",
    selectMandi: "Select Mandi",
    selected: "✓ Selected",
    directions: "🗺️ Directions",
    call: "📞 Call",
    copy: "📋 Copy",
    addressCopied: "Mandi address copied.",
    selectedMandi: "✓ Selected Mandi",
    crop: "Crop",
    continueLogistics: "Continue to Logistics →",
    searchNearby: "Search for nearby mandis",
    searchDescription:
      "Mandi results within 60 KM of the farmer location will appear here.",
    demoNote: "Demo Note:",
    staticDemoData:
      "The mandi list, prices and contact numbers in this prototype are static/indicative demo data. They are not live government market rates.",
    quantityRequired: "Please enter a quantity.",
    profileLocationMissing:
      "Farmer profile location was not found. Please save district/location in the profile.",
    mandiSelected: "has been selected.",
  },

  hi: {
    title: "🌾 मंडी और बाजार",
    subtitle: "किसान की प्रोफाइल लोकेशन से 60 KM के अंदर मंडियां खोजें।",
    cropDetails: "🌱 फसल की जानकारी",
    selectedCrop: "चयनित फसल",
    season: "सीजन",
    farmerLocation: "📍 किसान की लोकेशन",
    locationNotAvailable: "लोकेशन उपलब्ध नहीं है",
    currentGps: "वर्तमान GPS",
    profileCoordinates: "प्रोफाइल कोऑर्डिनेट्स",
    district: "जिला",
    useCurrentLocation: "📍 वर्तमान लोकेशन इस्तेमाल करें",
    gettingLocation: "लोकेशन प्राप्त हो रही है...",
    currentLocationSet: "वर्तमान लोकेशन सेट हो गई है।",
    locationNotSupported: "आपके ब्राउज़र में लोकेशन सपोर्ट नहीं है।",
    locationFailed:
      "वर्तमान लोकेशन नहीं मिल पाई। कृपया लोकेशन परमिशन चेक करें।",
    indicativePrice: "💰 अनुमानित कीमत",
    currentIndicativeRate: "वर्तमान अनुमानित बाजार भाव",
    perKg: "प्रति KG",
    indicativeDemoPrice:
      "चयनित फसल के आधार पर अनुमानित डेमो कीमत।",
    priceBasis: "📌 कीमत का आधार",
    yourQuantity: "आपकी मात्रा",
    indicativeEstimatedValue: "अनुमानित कुल मूल्य",
    calculation: "गणना",
    indicativeAmountNote:
      "यह राशि चयनित फसल की अनुमानित कीमत पर आधारित है। इसका उपयोग अलग-अलग मंडियों के ऑफर की तुलना करने के लिए करें।",
    quantity: "📦 मात्रा",
    unit: "इकाई",
    enterQuantity: "मात्रा दर्ज करें",
    totalWeight: "कुल वजन",
    kilogram: "किलोग्राम (KG)",
    quintal: "क्विंटल",
    ton: "टन",
    bag: "बैग (50 KG)",
    note: "नोट",
    nearbyMandiSearch: "🔎 नजदीकी मंडी खोज",
    onlyMandis: "केवल 60 KM के अंदर की मंडियां दिखाई जाएंगी।",
    findNearbyMandis: "🔎 नजदीकी मंडियां खोजें",
    searching: "खोज रहे हैं...",
    clear: "साफ करें",
    nearbyMandis: "🏪 नजदीकी मंडियां",
    found: "मिलीं",
    priceKg: "कीमत / KG",
    totalQuantity: "कुल मात्रा",
    estimatedAmount: "अनुमानित राशि",
    selectMandi: "मंडी चुनें",
    selected: "✓ चयनित",
    directions: "🗺️ रास्ता",
    call: "📞 कॉल",
    copy: "📋 कॉपी",
    addressCopied: "मंडी का पता कॉपी हो गया।",
    selectedMandi: "✓ चयनित मंडी",
    crop: "फसल",
    continueLogistics: "लॉजिस्टिक्स पर जाएँ →",
    searchNearby: "नजदीकी मंडियां खोजें",
    searchDescription:
      "किसान की लोकेशन से 60 KM के अंदर की मंडियां यहां दिखाई देंगी।",
    demoNote: "डेमो नोट:",
    staticDemoData:
      "इस प्रोटोटाइप में मंडी की सूची, कीमतें और संपर्क नंबर static/indicative demo data हैं। ये live government market rates नहीं हैं।",
    quantityRequired: "कृपया मात्रा दर्ज करें।",
    profileLocationMissing:
      "किसान की प्रोफाइल लोकेशन नहीं मिली। कृपया प्रोफाइल में जिला/लोकेशन सेव करें।",
    mandiSelected: "चयनित हो गई है।",
  },

  bn: {
    title: "🌾 মান্ডি ও বাজার",
    subtitle: "কৃষকের প্রোফাইল লোকেশন থেকে 60 KM-এর মধ্যে মান্ডি খুঁজুন।",
    cropDetails: "🌱 ফসলের তথ্য",
    selectedCrop: "নির্বাচিত ফসল",
    season: "মৌসুম",
    farmerLocation: "📍 কৃষকের অবস্থান",
    locationNotAvailable: "অবস্থান পাওয়া যায়নি",
    currentGps: "বর্তমান GPS",
    profileCoordinates: "প্রোফাইল কোঅর্ডিনেট",
    district: "জেলা",
    useCurrentLocation: "📍 বর্তমান অবস্থান ব্যবহার করুন",
    gettingLocation: "অবস্থান পাওয়া যাচ্ছে...",
    currentLocationSet: "বর্তমান অবস্থান সেট হয়েছে।",
    locationNotSupported: "আপনার ব্রাউজারে লোকেশন সাপোর্ট নেই।",
    locationFailed: "বর্তমান অবস্থান পাওয়া যায়নি। লোকেশন পারমিশন পরীক্ষা করুন।",
    indicativePrice: "💰 আনুমানিক মূল্য",
    currentIndicativeRate: "বর্তমান আনুমানিক বাজারদর",
    perKg: "প্রতি KG",
    indicativeDemoPrice: "নির্বাচিত ফসলের ভিত্তিতে ডেমো মূল্য।",
    priceBasis: "📌 মূল্যের ভিত্তি",
    yourQuantity: "আপনার পরিমাণ",
    indicativeEstimatedValue: "আনুমানিক মূল্য",
    calculation: "হিসাব",
    indicativeAmountNote:
      "এই মূল্যটি নির্বাচিত ফসলের আনুমানিক দামের উপর ভিত্তি করে। বিভিন্ন মান্ডির অফার তুলনা করতে ব্যবহার করুন।",
    quantity: "📦 পরিমাণ",
    unit: "একক",
    enterQuantity: "পরিমাণ লিখুন",
    totalWeight: "মোট ওজন",
    kilogram: "কিলোগ্রাম (KG)",
    quintal: "কুইন্টাল",
    ton: "টন",
    bag: "ব্যাগ (50 KG)",
    note: "নোট",
    nearbyMandiSearch: "🔎 কাছের মান্ডি অনুসন্ধান",
    onlyMandis: "শুধু 60 KM-এর মধ্যে মান্ডি দেখানো হবে।",
    findNearbyMandis: "🔎 কাছের মান্ডি খুঁজুন",
    searching: "খোঁজা হচ্ছে...",
    clear: "পরিষ্কার",
    nearbyMandis: "🏪 কাছের মান্ডি",
    found: "পাওয়া গেছে",
    priceKg: "দাম / KG",
    totalQuantity: "মোট পরিমাণ",
    estimatedAmount: "আনুমানিক পরিমাণ",
    selectMandi: "মান্ডি নির্বাচন করুন",
    selected: "✓ নির্বাচিত",
    directions: "🗺️ দিকনির্দেশ",
    call: "📞 কল",
    copy: "📋 কপি",
    addressCopied: "মান্ডির ঠিকানা কপি হয়েছে।",
    selectedMandi: "✓ নির্বাচিত মান্ডি",
    crop: "ফসল",
    continueLogistics: "লজিস্টিকসে যান →",
    searchNearby: "কাছের মান্ডি খুঁজুন",
    searchDescription: "কৃষকের অবস্থান থেকে 60 KM-এর মধ্যে মান্ডি এখানে দেখা যাবে।",
    demoNote: "ডেমো নোট:",
    staticDemoData:
      "এই প্রোটোটাইপের মান্ডি তালিকা, দাম এবং যোগাযোগ নম্বর static/indicative demo data। এগুলো live government market rates নয়।",
    quantityRequired: "অনুগ্রহ করে পরিমাণ লিখুন।",
    profileLocationMissing:
      "কৃষকের প্রোফাইল লোকেশন পাওয়া যায়নি। প্রোফাইলে জেলা/লোকেশন সেভ করুন।",
    mandiSelected: "নির্বাচিত হয়েছে।",
  },

  mr: {
    title: "🌾 मंडी आणि बाजार",
    subtitle: "शेतकऱ्याच्या प्रोफाइल लोकेशनपासून 60 KM मधील मंड्या शोधा.",
    cropDetails: "🌱 पिकाची माहिती",
    selectedCrop: "निवडलेले पीक",
    season: "हंगाम",
    farmerLocation: "📍 शेतकऱ्याचे स्थान",
    locationNotAvailable: "स्थान उपलब्ध नाही",
    currentGps: "सध्याचे GPS",
    profileCoordinates: "प्रोफाइल कोऑर्डिनेट्स",
    district: "जिल्हा",
    useCurrentLocation: "📍 सध्याचे स्थान वापरा",
    gettingLocation: "स्थान मिळवत आहे...",
    currentLocationSet: "सध्याचे स्थान सेट झाले आहे.",
    locationNotSupported: "तुमच्या ब्राउझरमध्ये लोकेशन सपोर्ट नाही.",
    locationFailed: "सध्याचे स्थान मिळाले नाही. लोकेशन परमिशन तपासा.",
    indicativePrice: "💰 अंदाजे किंमत",
    currentIndicativeRate: "सध्याचा अंदाजे बाजारभाव",
    perKg: "प्रति KG",
    indicativeDemoPrice: "निवडलेल्या पिकावर आधारित डेमो किंमत.",
    priceBasis: "📌 किंमतीचा आधार",
    yourQuantity: "तुमचे प्रमाण",
    indicativeEstimatedValue: "अंदाजे एकूण मूल्य",
    calculation: "गणना",
    indicativeAmountNote:
      "ही रक्कम निवडलेल्या पिकाच्या अंदाजे किमतीवर आधारित आहे. वेगवेगळ्या मंड्यांच्या ऑफरची तुलना करण्यासाठी वापरा.",
    quantity: "📦 प्रमाण",
    unit: "एकक",
    enterQuantity: "प्रमाण प्रविष्ट करा",
    totalWeight: "एकूण वजन",
    kilogram: "किलोग्रॅम (KG)",
    quintal: "क्विंटल",
    ton: "टन",
    bag: "बॅग (50 KG)",
    note: "टीप",
    nearbyMandiSearch: "🔎 जवळची मंडी शोध",
    onlyMandis: "फक्त 60 KM मधील मंड्या दाखवल्या जातील.",
    findNearbyMandis: "🔎 जवळच्या मंड्या शोधा",
    searching: "शोधत आहे...",
    clear: "साफ करा",
    nearbyMandis: "🏪 जवळच्या मंड्या",
    found: "सापडल्या",
    priceKg: "किंमत / KG",
    totalQuantity: "एकूण प्रमाण",
    estimatedAmount: "अंदाजे रक्कम",
    selectMandi: "मंडी निवडा",
    selected: "✓ निवडले",
    directions: "🗺️ दिशा",
    call: "📞 कॉल",
    copy: "📋 कॉपी",
    addressCopied: "मंडीचा पत्ता कॉपी झाला.",
    selectedMandi: "✓ निवडलेली मंडी",
    crop: "पीक",
    continueLogistics: "लॉजिस्टिक्सकडे जा →",
    searchNearby: "जवळच्या मंड्या शोधा",
    searchDescription: "शेतकऱ्याच्या स्थानापासून 60 KM मधील मंड्या येथे दिसतील.",
    demoNote: "डेमो टीप:",
    staticDemoData:
      "या प्रोटोटाइपमधील मंडी यादी, किंमती आणि संपर्क क्रमांक static/indicative demo data आहेत. हे live government market rates नाहीत.",
    quantityRequired: "कृपया प्रमाण प्रविष्ट करा.",
    profileLocationMissing:
      "शेतकऱ्याचे प्रोफाइल लोकेशन सापडले नाही. कृपया प्रोफाइलमध्ये जिल्हा/लोकेशन सेव्ह करा.",
    mandiSelected: "निवडली गेली आहे.",
  },

  ta: {
    title: "🌾 மண்டி மற்றும் சந்தை",
    subtitle: "விவசாயி சுயவிவர இருப்பிடத்திலிருந்து 60 KMக்குள் மண்டிகளை கண்டறியவும்.",
    cropDetails: "🌱 பயிர் விவரங்கள்",
    selectedCrop: "தேர்ந்தெடுக்கப்பட்ட பயிர்",
    season: "பருவம்",
    farmerLocation: "📍 விவசாயி இருப்பிடம்",
    locationNotAvailable: "இருப்பிடம் கிடைக்கவில்லை",
    currentGps: "தற்போதைய GPS",
    profileCoordinates: "சுயவிவர கோஆர்டினேட்கள்",
    district: "மாவட்டம்",
    useCurrentLocation: "📍 தற்போதைய இருப்பிடத்தைப் பயன்படுத்தவும்",
    gettingLocation: "இருப்பிடம் பெறப்படுகிறது...",
    currentLocationSet: "தற்போதைய இருப்பிடம் அமைக்கப்பட்டது.",
    locationNotSupported: "உங்கள் உலாவியில் இருப்பிட ஆதரவு இல்லை.",
    locationFailed: "தற்போதைய இருப்பிடத்தைப் பெற முடியவில்லை.",
    indicativePrice: "💰 மதிப்பிடப்பட்ட விலை",
    currentIndicativeRate: "தற்போதைய மதிப்பிடப்பட்ட சந்தை விலை",
    perKg: "ஒரு KG",
    indicativeDemoPrice: "தேர்ந்தெடுக்கப்பட்ட பயிரை அடிப்படையாகக் கொண்ட டெமோ விலை.",
    priceBasis: "📌 விலை அடிப்படை",
    yourQuantity: "உங்கள் அளவு",
    indicativeEstimatedValue: "மதிப்பிடப்பட்ட மதிப்பு",
    calculation: "கணக்கீடு",
    indicativeAmountNote:
      "இந்த தொகை தேர்ந்தெடுக்கப்பட்ட பயிரின் மதிப்பிடப்பட்ட விலையை அடிப்படையாகக் கொண்டது.",
    quantity: "📦 அளவு",
    unit: "அலகு",
    enterQuantity: "அளவை உள்ளிடவும்",
    totalWeight: "மொத்த எடை",
    kilogram: "கிலோகிராம் (KG)",
    quintal: "குவிண்டால்",
    ton: "டன்",
    bag: "பை (50 KG)",
    note: "குறிப்பு",
    nearbyMandiSearch: "🔎 அருகிலுள்ள மண்டி தேடல்",
    onlyMandis: "60 KMக்குள் உள்ள மண்டிகள் மட்டும் காட்டப்படும்.",
    findNearbyMandis: "🔎 அருகிலுள்ள மண்டிகளை கண்டறியவும்",
    searching: "தேடுகிறது...",
    clear: "அழி",
    nearbyMandis: "🏪 அருகிலுள்ள மண்டிகள்",
    found: "கண்டறியப்பட்டது",
    priceKg: "விலை / KG",
    totalQuantity: "மொத்த அளவு",
    estimatedAmount: "மதிப்பிடப்பட்ட தொகை",
    selectMandi: "மண்டியைத் தேர்ந்தெடுக்கவும்",
    selected: "✓ தேர்ந்தெடுக்கப்பட்டது",
    directions: "🗺️ வழிகள்",
    call: "📞 அழைப்பு",
    copy: "📋 நகலெடு",
    addressCopied: "மண்டி முகவரி நகலெடுக்கப்பட்டது.",
    selectedMandi: "✓ தேர்ந்தெடுக்கப்பட்ட மண்டி",
    crop: "பயிர்",
    continueLogistics: "லாஜிஸ்டிக்ஸுக்குச் செல்லவும் →",
    searchNearby: "அருகிலுள்ள மண்டிகளைத் தேடவும்",
    searchDescription: "விவசாயி இருப்பிடத்திலிருந்து 60 KMக்குள் உள்ள மண்டிகள் இங்கே தோன்றும்.",
    demoNote: "டெமோ குறிப்பு:",
    staticDemoData:
      "இந்த முன்மாதிரியில் உள்ள மண்டி பட்டியல், விலைகள் மற்றும் தொடர்பு எண்கள் static/indicative demo data ஆகும்.",
    quantityRequired: "தயவுசெய்து அளவை உள்ளிடவும்.",
    profileLocationMissing:
      "விவசாயி சுயவிவர இருப்பிடம் கிடைக்கவில்லை. சுயவிவரத்தில் மாவட்டம்/இருப்பிடத்தை சேமிக்கவும்.",
    mandiSelected: "தேர்ந்தெடுக்கப்பட்டது.",
  },

  te: {
    title: "🌾 మండీ & మార్కెట్",
    subtitle: "రైతు ప్రొఫైల్ లొకేషన్ నుండి 60 KM లోపు మండీలను కనుగొనండి.",
    cropDetails: "🌱 పంట వివరాలు",
    selectedCrop: "ఎంచుకున్న పంట",
    season: "సీజన్",
    farmerLocation: "📍 రైతు స్థానం",
    locationNotAvailable: "స్థానం అందుబాటులో లేదు",
    currentGps: "ప్రస్తుత GPS",
    profileCoordinates: "ప్రొఫైల్ కోఆర్డినేట్స్",
    district: "జిల్లా",
    useCurrentLocation: "📍 ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
    gettingLocation: "స్థానం పొందుతోంది...",
    currentLocationSet: "ప్రస్తుత స్థానం సెట్ అయింది.",
    locationNotSupported: "మీ బ్రౌజర్‌లో లొకేషన్ సపోర్ట్ లేదు.",
    locationFailed: "ప్రస్తుత స్థానాన్ని పొందలేకపోయాము.",
    indicativePrice: "💰 అంచనా ధర",
    currentIndicativeRate: "ప్రస్తుత అంచనా మార్కెట్ ధర",
    perKg: "ప్రతి KG",
    indicativeDemoPrice: "ఎంచుకున్న పంట ఆధారంగా డెమో ధర.",
    priceBasis: "📌 ధర ఆధారం",
    yourQuantity: "మీ పరిమాణం",
    indicativeEstimatedValue: "అంచనా విలువ",
    calculation: "లెక్కింపు",
    indicativeAmountNote:
      "ఈ మొత్తం ఎంచుకున్న పంట అంచనా ధర ఆధారంగా ఉంటుంది.",
    quantity: "📦 పరిమాణం",
    unit: "యూనిట్",
    enterQuantity: "పరిమాణాన్ని నమోదు చేయండి",
    totalWeight: "మొత్తం బరువు",
    kilogram: "కిలోగ్రామ్ (KG)",
    quintal: "క్వింటాల్",
    ton: "టన్",
    bag: "బ్యాగ్ (50 KG)",
    note: "గమనిక",
    nearbyMandiSearch: "🔎 సమీప మండీ శోధన",
    onlyMandis: "60 KM లోపు మండీలు మాత్రమే చూపబడతాయి.",
    findNearbyMandis: "🔎 సమీప మండీలను కనుగొనండి",
    searching: "వెతుకుతోంది...",
    clear: "క్లియర్",
    nearbyMandis: "🏪 సమీప మండీలు",
    found: "కనుగొనబడ్డాయి",
    priceKg: "ధర / KG",
    totalQuantity: "మొత్తం పరిమాణం",
    estimatedAmount: "అంచనా మొత్తం",
    selectMandi: "మండీని ఎంచుకోండి",
    selected: "✓ ఎంచుకోబడింది",
    directions: "🗺️ మార్గం",
    call: "📞 కాల్",
    copy: "📋 కాపీ",
    addressCopied: "మండీ చిరునామా కాపీ అయింది.",
    selectedMandi: "✓ ఎంచుకున్న మండీ",
    crop: "పంట",
    continueLogistics: "లాజిస్టిక్స్‌కు కొనసాగండి →",
    searchNearby: "సమీప మండీలను వెతకండి",
    searchDescription: "రైతు స్థానం నుండి 60 KM లోపు మండీలు ఇక్కడ కనిపిస్తాయి.",
    demoNote: "డెమో గమనిక:",
    staticDemoData:
      "ఈ ప్రోటోటైప్‌లోని మండీ జాబితా, ధరలు మరియు సంప్రదింపు నంబర్లు static/indicative demo data.",
    quantityRequired: "దయచేసి పరిమాణాన్ని నమోదు చేయండి.",
    profileLocationMissing:
      "రైతు ప్రొఫైల్ లొకేషన్ కనుగొనబడలేదు. ప్రొఫైల్‌లో జిల్లా/లొకేషన్ సేవ్ చేయండి.",
    mandiSelected: "ఎంచుకోబడింది.",
  },

  gu: {
    title: "🌾 મંડી અને બજાર",
    subtitle: "ખેડૂતના પ્રોફાઇલ સ્થાનથી 60 KMની અંદરની મંડી શોધો.",
    cropDetails: "🌱 પાકની વિગતો",
    selectedCrop: "પસંદ કરેલ પાક",
    season: "સીઝન",
    farmerLocation: "📍 ખેડૂતનું સ્થાન",
    locationNotAvailable: "સ્થાન ઉપલબ્ધ નથી",
    currentGps: "વર્તમાન GPS",
    profileCoordinates: "પ્રોફાઇલ કોઓર્ડિનેટ્સ",
    district: "જિલ્લો",
    useCurrentLocation: "📍 વર્તમાન સ્થાનનો ઉપયોગ કરો",
    gettingLocation: "સ્થાન મેળવી રહ્યા છીએ...",
    currentLocationSet: "વર્તમાન સ્થાન સેટ થઈ ગયું છે.",
    locationNotSupported: "તમારા બ્રાઉઝરમાં લોકેશન સપોર્ટ નથી.",
    locationFailed: "વર્તમાન સ્થાન મેળવી શકાયું નથી.",
    indicativePrice: "💰 અંદાજિત કિંમત",
    currentIndicativeRate: "વર્તમાન અંદાજિત બજાર ભાવ",
    perKg: "પ્રતિ KG",
    indicativeDemoPrice: "પસંદ કરેલા પાકના આધારે ડેમો કિંમત.",
    priceBasis: "📌 કિંમતનો આધાર",
    yourQuantity: "તમારો જથ્થો",
    indicativeEstimatedValue: "અંદાજિત મૂલ્ય",
    calculation: "ગણતરી",
    indicativeAmountNote:
      "આ રકમ પસંદ કરેલા પાકની અંદાજિત કિંમત પર આધારિત છે.",
    quantity: "📦 જથ્થો",
    unit: "એકમ",
    enterQuantity: "જથ્થો દાખલ કરો",
    totalWeight: "કુલ વજન",
    kilogram: "કિલોગ્રામ (KG)",
    quintal: "ક્વિન્ટલ",
    ton: "ટન",
    bag: "બેગ (50 KG)",
    note: "નોંધ",
    nearbyMandiSearch: "🔎 નજીકની મંડી શોધ",
    onlyMandis: "માત્ર 60 KMની અંદરની મંડી બતાવવામાં આવશે.",
    findNearbyMandis: "🔎 નજીકની મંડી શોધો",
    searching: "શોધી રહ્યા છીએ...",
    clear: "સાફ કરો",
    nearbyMandis: "🏪 નજીકની મંડી",
    found: "મળી",
    priceKg: "કિંમત / KG",
    totalQuantity: "કુલ જથ્થો",
    estimatedAmount: "અંદાજિત રકમ",
    selectMandi: "મંડી પસંદ કરો",
    selected: "✓ પસંદ કરેલ",
    directions: "🗺️ દિશાઓ",
    call: "📞 કોલ",
    copy: "📋 કૉપી",
    addressCopied: "મંડીનું સરનામું કૉપી થયું.",
    selectedMandi: "✓ પસંદ કરેલ મંડી",
    crop: "પાક",
    continueLogistics: "લોજિસ્ટિક્સ પર જાઓ →",
    searchNearby: "નજીકની મંડી શોધો",
    searchDescription: "ખેડૂતના સ્થાનથી 60 KMની અંદરની મંડી અહીં દેખાશે.",
    demoNote: "ડેમો નોંધ:",
    staticDemoData:
      "આ પ્રોટોટાઇપમાં મંડીની યાદી, કિંમતો અને સંપર્ક નંબર static/indicative demo data છે.",
    quantityRequired: "કૃપા કરીને જથ્થો દાખલ કરો.",
    profileLocationMissing:
      "ખેડૂતનું પ્રોફાઇલ સ્થાન મળ્યું નથી. પ્રોફાઇલમાં જિલ્લો/સ્થાન સેવ કરો.",
    mandiSelected: "પસંદ કરવામાં આવી છે.",
  },

  kn: {
    title: "🌾 ಮಂಡಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆ",
    subtitle: "ರೈತರ ಪ್ರೊಫೈಲ್ ಸ್ಥಳದಿಂದ 60 KM ಒಳಗಿನ ಮಂಡಿಗಳನ್ನು ಹುಡುಕಿ.",
    cropDetails: "🌱 ಬೆಳೆ ವಿವರಗಳು",
    selectedCrop: "ಆಯ್ಕೆ ಮಾಡಿದ ಬೆಳೆ",
    season: "ಋತು",
    farmerLocation: "📍 ರೈತರ ಸ್ಥಳ",
    locationNotAvailable: "ಸ್ಥಳ ಲಭ್ಯವಿಲ್ಲ",
    currentGps: "ಪ್ರಸ್ತುತ GPS",
    profileCoordinates: "ಪ್ರೊಫೈಲ್ ಕೋಆರ್ಡಿನೇಟ್‌ಗಳು",
    district: "ಜಿಲ್ಲೆ",
    useCurrentLocation: "📍 ಪ್ರಸ್ತುತ ಸ್ಥಳ ಬಳಸಿ",
    gettingLocation: "ಸ್ಥಳ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    currentLocationSet: "ಪ್ರಸ್ತುತ ಸ್ಥಳ ಸೆಟ್ ಆಗಿದೆ.",
    locationNotSupported: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಥಳ ಬೆಂಬಲವಿಲ್ಲ.",
    locationFailed: "ಪ್ರಸ್ತುತ ಸ್ಥಳ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    indicativePrice: "💰 ಅಂದಾಜು ಬೆಲೆ",
    currentIndicativeRate: "ಪ್ರಸ್ತುತ ಅಂದಾಜು ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
    perKg: "ಪ್ರತಿ KG",
    indicativeDemoPrice: "ಆಯ್ಕೆ ಮಾಡಿದ ಬೆಳೆಯ ಆಧಾರದ ಡೆಮೋ ಬೆಲೆ.",
    priceBasis: "📌 ಬೆಲೆಯ ಆಧಾರ",
    yourQuantity: "ನಿಮ್ಮ ಪ್ರಮಾಣ",
    indicativeEstimatedValue: "ಅಂದಾಜು ಮೌಲ್ಯ",
    calculation: "ಲೆಕ್ಕಾಚಾರ",
    indicativeAmountNote:
      "ಈ ಮೊತ್ತವು ಆಯ್ಕೆ ಮಾಡಿದ ಬೆಳೆಯ ಅಂದಾಜು ಬೆಲೆಯನ್ನು ಆಧರಿಸಿದೆ.",
    quantity: "📦 ಪ್ರಮಾಣ",
    unit: "ಘಟಕ",
    enterQuantity: "ಪ್ರಮಾಣ ನಮೂದಿಸಿ",
    totalWeight: "ಒಟ್ಟು ತೂಕ",
    kilogram: "ಕಿಲೋಗ್ರಾಂ (KG)",
    quintal: "ಕ್ವಿಂಟಲ್",
    ton: "ಟನ್",
    bag: "ಚೀಲ (50 KG)",
    note: "ಸೂಚನೆ",
    nearbyMandiSearch: "🔎 ಹತ್ತಿರದ ಮಂಡಿ ಹುಡುಕಾಟ",
    onlyMandis: "60 KM ಒಳಗಿನ ಮಂಡಿಗಳು ಮಾತ್ರ ತೋರಿಸಲಾಗುತ್ತದೆ.",
    findNearbyMandis: "🔎 ಹತ್ತಿರದ ಮಂಡಿಗಳನ್ನು ಹುಡುಕಿ",
    searching: "ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    clear: "ತೆರವು",
    nearbyMandis: "🏪 ಹತ್ತಿರದ ಮಂಡಿಗಳು",
    found: "ಕಂಡುಬಂದಿದೆ",
    priceKg: "ಬೆಲೆ / KG",
    totalQuantity: "ಒಟ್ಟು ಪ್ರಮಾಣ",
    estimatedAmount: "ಅಂದಾಜು ಮೊತ್ತ",
    selectMandi: "ಮಂಡಿ ಆಯ್ಕೆಮಾಡಿ",
    selected: "✓ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ",
    directions: "🗺️ ದಿಕ್ಕುಗಳು",
    call: "📞 ಕರೆ",
    copy: "📋 ನಕಲಿಸಿ",
    addressCopied: "ಮಂಡಿ ವಿಳಾಸ ನಕಲಿಸಲಾಗಿದೆ.",
    selectedMandi: "✓ ಆಯ್ಕೆ ಮಾಡಿದ ಮಂಡಿ",
    crop: "ಬೆಳೆ",
    continueLogistics: "ಲಾಜಿಸ್ಟಿಕ್ಸ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ →",
    searchNearby: "ಹತ್ತಿರದ ಮಂಡಿಗಳನ್ನು ಹುಡುಕಿ",
    searchDescription: "ರೈತರ ಸ್ಥಳದಿಂದ 60 KM ಒಳಗಿನ ಮಂಡಿಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
    demoNote: "ಡೆಮೋ ಸೂಚನೆ:",
    staticDemoData:
      "ಈ ಪ್ರೋಟೋಟೈಪ್‌ನ ಮಂಡಿ ಪಟ್ಟಿ, ಬೆಲೆಗಳು ಮತ್ತು ಸಂಪರ್ಕ ಸಂಖ್ಯೆಗಳು static/indicative demo data.",
    quantityRequired: "ದಯವಿಟ್ಟು ಪ್ರಮಾಣ ನಮೂದಿಸಿ.",
    profileLocationMissing:
      "ರೈತರ ಪ್ರೊಫೈಲ್ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ. ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಜಿಲ್ಲೆ/ಸ್ಥಳ ಉಳಿಸಿ.",
    mandiSelected: "ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ.",
  },

  ml: {
    title: "🌾 മണ്ടിയും മാർക്കറ്റും",
    subtitle: "കർഷകന്റെ പ്രൊഫൈൽ ലൊക്കേഷനിൽ നിന്ന് 60 KM ഉള്ളിലെ മണ്ടികൾ കണ്ടെത്തുക.",
    cropDetails: "🌱 വിള വിവരങ്ങൾ",
    selectedCrop: "തിരഞ്ഞെടുത്ത വിള",
    season: "സീസൺ",
    farmerLocation: "📍 കർഷകന്റെ സ്ഥലം",
    locationNotAvailable: "സ്ഥലം ലഭ്യമല്ല",
    currentGps: "നിലവിലെ GPS",
    profileCoordinates: "പ്രൊഫൈൽ കോർഡിനേറ്റുകൾ",
    district: "ജില്ല",
    useCurrentLocation: "📍 നിലവിലെ സ്ഥലം ഉപയോഗിക്കുക",
    gettingLocation: "സ്ഥലം ലഭ്യമാക്കുന്നു...",
    currentLocationSet: "നിലവിലെ സ്ഥലം സജ്ജീകരിച്ചു.",
    locationNotSupported: "നിങ്ങളുടെ ബ്രൗസറിൽ ലൊക്കേഷൻ പിന്തുണയില്ല.",
    locationFailed: "നിലവിലെ സ്ഥലം ലഭ്യമാക്കാൻ കഴിഞ്ഞില്ല.",
    indicativePrice: "💰 ഏകദേശ വില",
    currentIndicativeRate: "നിലവിലെ ഏകദേശ വിപണി വില",
    perKg: "ഒരു KG",
    indicativeDemoPrice: "തിരഞ്ഞെടുത്ത വിളയെ അടിസ്ഥാനമാക്കിയുള്ള ഡെമോ വില.",
    priceBasis: "📌 വിലയുടെ അടിസ്ഥാനം",
    yourQuantity: "നിങ്ങളുടെ അളവ്",
    indicativeEstimatedValue: "ഏകദേശ മൂല്യം",
    calculation: "കണക്കുകൂട്ടൽ",
    indicativeAmountNote:
      "ഈ തുക തിരഞ്ഞെടുത്ത വിളയുടെ ഏകദേശ വിലയെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്.",
    quantity: "📦 അളവ്",
    unit: "യൂണിറ്റ്",
    enterQuantity: "അളവ് നൽകുക",
    totalWeight: "മൊത്തം ഭാരം",
    kilogram: "കിലോഗ്രാം (KG)",
    quintal: "ക്വിന്റൽ",
    ton: "ടൺ",
    bag: "ബാഗ് (50 KG)",
    note: "കുറിപ്പ്",
    nearbyMandiSearch: "🔎 സമീപത്തെ മണ്ടി തിരയുക",
    onlyMandis: "60 KM ഉള്ളിലെ മണ്ടികൾ മാത്രം കാണിക്കും.",
    findNearbyMandis: "🔎 സമീപത്തെ മണ്ടികൾ കണ്ടെത്തുക",
    searching: "തിരയുന്നു...",
    clear: "മായ്ക്കുക",
    nearbyMandis: "🏪 സമീപത്തെ മണ്ടികൾ",
    found: "കണ്ടെത്തി",
    priceKg: "വില / KG",
    totalQuantity: "മൊത്തം അളവ്",
    estimatedAmount: "ഏകദേശ തുക",
    selectMandi: "മണ്ടി തിരഞ്ഞെടുക്കുക",
    selected: "✓ തിരഞ്ഞെടുത്തു",
    directions: "🗺️ വഴികൾ",
    call: "📞 വിളിക്കുക",
    copy: "📋 പകർത്തുക",
    addressCopied: "മണ്ടിയുടെ വിലാസം പകർത്തി.",
    selectedMandi: "✓ തിരഞ്ഞെടുത്ത മണ്ടി",
    crop: "വിള",
    continueLogistics: "ലോജിസ്റ്റിക്സിലേക്ക് തുടരുക →",
    searchNearby: "സമീപത്തെ മണ്ടികൾ തിരയുക",
    searchDescription: "കർഷകന്റെ സ്ഥലത്തിൽ നിന്ന് 60 KM ഉള്ളിലെ മണ്ടികൾ ഇവിടെ കാണിക്കും.",
    demoNote: "ഡെമോ കുറിപ്പ്:",
    staticDemoData:
      "ഈ പ്രോട്ടോടൈപ്പിലെ മണ്ടി ലിസ്റ്റ്, വിലകൾ, ഫോൺ നമ്പറുകൾ static/indicative demo data ആണ്.",
    quantityRequired: "ദയവായി അളവ് നൽകുക.",
    profileLocationMissing:
      "കർഷകന്റെ പ്രൊഫൈൽ ലൊക്കേഷൻ കണ്ടെത്തിയില്ല. പ്രൊഫൈലിൽ ജില്ല/ലൊക്കേഷൻ സേവ് ചെയ്യുക.",
    mandiSelected: "തിരഞ്ഞെടുത്തു.",
  },

  pa: {
    title: "🌾 ਮੰਡੀ ਅਤੇ ਬਾਜ਼ਾਰ",
    subtitle: "ਕਿਸਾਨ ਦੀ ਪ੍ਰੋਫਾਈਲ ਲੋਕੇਸ਼ਨ ਤੋਂ 60 KM ਦੇ ਅੰਦਰ ਮੰਡੀਆਂ ਲੱਭੋ।",
    cropDetails: "🌱 ਫਸਲ ਦੀ ਜਾਣਕਾਰੀ",
    selectedCrop: "ਚੁਣੀ ਹੋਈ ਫਸਲ",
    season: "ਸੀਜ਼ਨ",
    farmerLocation: "📍 ਕਿਸਾਨ ਦੀ ਲੋਕੇਸ਼ਨ",
    locationNotAvailable: "ਲੋਕੇਸ਼ਨ ਉਪਲਬਧ ਨਹੀਂ",
    currentGps: "ਮੌਜੂਦਾ GPS",
    profileCoordinates: "ਪ੍ਰੋਫਾਈਲ ਕੋਆਰਡੀਨੇਟ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    useCurrentLocation: "📍 ਮੌਜੂਦਾ ਲੋਕੇਸ਼ਨ ਵਰਤੋ",
    gettingLocation: "ਲੋਕੇਸ਼ਨ ਮਿਲ ਰਹੀ ਹੈ...",
    currentLocationSet: "ਮੌਜੂਦਾ ਲੋਕੇਸ਼ਨ ਸੈੱਟ ਹੋ ਗਈ ਹੈ।",
    locationNotSupported: "ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਲੋਕੇਸ਼ਨ ਸਪੋਰਟ ਨਹੀਂ ਹੈ।",
    locationFailed: "ਮੌਜੂਦਾ ਲੋਕੇਸ਼ਨ ਨਹੀਂ ਮਿਲ ਸਕੀ।",
    indicativePrice: "💰 ਅੰਦਾਜ਼ਨ ਕੀਮਤ",
    currentIndicativeRate: "ਮੌਜੂਦਾ ਅੰਦਾਜ਼ਨ ਬਾਜ਼ਾਰ ਭਾਅ",
    perKg: "ਪ੍ਰਤੀ KG",
    indicativeDemoPrice: "ਚੁਣੀ ਫਸਲ ਦੇ ਆਧਾਰ 'ਤੇ ਡੈਮੋ ਕੀਮਤ।",
    priceBasis: "📌 ਕੀਮਤ ਦਾ ਆਧਾਰ",
    yourQuantity: "ਤੁਹਾਡੀ ਮਾਤਰਾ",
    indicativeEstimatedValue: "ਅੰਦਾਜ਼ਨ ਮੁੱਲ",
    calculation: "ਗਣਨਾ",
    indicativeAmountNote:
      "ਇਹ ਰਕਮ ਚੁਣੀ ਫਸਲ ਦੀ ਅੰਦਾਜ਼ਨ ਕੀਮਤ 'ਤੇ ਆਧਾਰਿਤ ਹੈ।",
    quantity: "📦 ਮਾਤਰਾ",
    unit: "ਇਕਾਈ",
    enterQuantity: "ਮਾਤਰਾ ਦਰਜ ਕਰੋ",
    totalWeight: "ਕੁੱਲ ਭਾਰ",
    kilogram: "ਕਿਲੋਗ੍ਰਾਮ (KG)",
    quintal: "ਕੁਇੰਟਲ",
    ton: "ਟਨ",
    bag: "ਬੈਗ (50 KG)",
    note: "ਨੋਟ",
    nearbyMandiSearch: "🔎 ਨੇੜਲੀ ਮੰਡੀ ਖੋਜ",
    onlyMandis: "ਸਿਰਫ਼ 60 KM ਦੇ ਅੰਦਰ ਦੀਆਂ ਮੰਡੀਆਂ ਦਿਖਾਈਆਂ ਜਾਣਗੀਆਂ।",
    findNearbyMandis: "🔎 ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਲੱਭੋ",
    searching: "ਖੋਜ ਰਹੇ ਹਾਂ...",
    clear: "ਸਾਫ਼ ਕਰੋ",
    nearbyMandis: "🏪 ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ",
    found: "ਮਿਲੀਆਂ",
    priceKg: "ਕੀਮਤ / KG",
    totalQuantity: "ਕੁੱਲ ਮਾਤਰਾ",
    estimatedAmount: "ਅੰਦਾਜ਼ਨ ਰਕਮ",
    selectMandi: "ਮੰਡੀ ਚੁਣੋ",
    selected: "✓ ਚੁਣੀ ਹੋਈ",
    directions: "🗺️ ਰਸਤਾ",
    call: "📞 ਕਾਲ",
    copy: "📋 ਕਾਪੀ",
    addressCopied: "ਮੰਡੀ ਦਾ ਪਤਾ ਕਾਪੀ ਹੋ ਗਿਆ।",
    selectedMandi: "✓ ਚੁਣੀ ਹੋਈ ਮੰਡੀ",
    crop: "ਫਸਲ",
    continueLogistics: "ਲੌਜਿਸਟਿਕਸ ਵੱਲ ਜਾਓ →",
    searchNearby: "ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਲੱਭੋ",
    searchDescription: "ਕਿਸਾਨ ਦੀ ਲੋਕੇਸ਼ਨ ਤੋਂ 60 KM ਦੇ ਅੰਦਰ ਦੀਆਂ ਮੰਡੀਆਂ ਇੱਥੇ ਦਿਖਣਗੀਆਂ।",
    demoNote: "ਡੈਮੋ ਨੋਟ:",
    staticDemoData:
      "ਇਸ ਪ੍ਰੋਟੋਟਾਈਪ ਵਿੱਚ ਮੰਡੀ ਸੂਚੀ, ਕੀਮਤਾਂ ਅਤੇ ਸੰਪਰਕ ਨੰਬਰ static/indicative demo data ਹਨ।",
    quantityRequired: "ਕਿਰਪਾ ਕਰਕੇ ਮਾਤਰਾ ਦਰਜ ਕਰੋ।",
    profileLocationMissing:
      "ਕਿਸਾਨ ਦੀ ਪ੍ਰੋਫਾਈਲ ਲੋਕੇਸ਼ਨ ਨਹੀਂ ਮਿਲੀ। ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਜ਼ਿਲ੍ਹਾ/ਲੋਕੇਸ਼ਨ ਸੇਵ ਕਰੋ।",
    mandiSelected: "ਚੁਣੀ ਗਈ ਹੈ।",
  },

  or: {
    title: "🌾 ମଣ୍ଡି ଏବଂ ବଜାର",
    subtitle: "ଚାଷୀଙ୍କ ପ୍ରୋଫାଇଲ୍ ଲୋକେସନ୍ ଠାରୁ 60 KM ମଧ୍ୟରେ ମଣ୍ଡି ଖୋଜନ୍ତୁ।",
    cropDetails: "🌱 ଫସଲ ବିବରଣୀ",
    selectedCrop: "ଚୟନ କରାଯାଇଥିବା ଫସଲ",
    season: "ଋତୁ",
    farmerLocation: "📍 ଚାଷୀଙ୍କ ସ୍ଥାନ",
    locationNotAvailable: "ସ୍ଥାନ ଉପଲବ୍ଧ ନାହିଁ",
    currentGps: "ବର୍ତ୍ତମାନ GPS",
    profileCoordinates: "ପ୍ରୋଫାଇଲ୍ କୋଅର୍ଡିନେଟ୍",
    district: "ଜିଲ୍ଲା",
    useCurrentLocation: "📍 ବର୍ତ୍ତମାନ ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ",
    gettingLocation: "ସ୍ଥାନ ମିଳୁଛି...",
    currentLocationSet: "ବର୍ତ୍ତମାନ ସ୍ଥାନ ସେଟ୍ ହୋଇଛି।",
    locationNotSupported: "ଆପଣଙ୍କ ବ୍ରାଉଜରରେ ଲୋକେସନ୍ ସପୋର୍ଟ ନାହିଁ।",
    locationFailed: "ବର୍ତ୍ତମାନ ସ୍ଥାନ ମିଳିଲା ନାହିଁ।",
    indicativePrice: "💰 ଆନୁମାନିକ ମୂଲ୍ୟ",
    currentIndicativeRate: "ବର୍ତ୍ତମାନ ଆନୁମାନିକ ବଜାର ଦର",
    perKg: "ପ୍ରତି KG",
    indicativeDemoPrice: "ଚୟନ କରାଯାଇଥିବା ଫସଲ ଆଧାରିତ ଡେମୋ ମୂଲ୍ୟ।",
    priceBasis: "📌 ମୂଲ୍ୟ ଆଧାର",
    yourQuantity: "ଆପଣଙ୍କ ପରିମାଣ",
    indicativeEstimatedValue: "ଆନୁମାନିକ ମୂଲ୍ୟ",
    calculation: "ହିସାବ",
    indicativeAmountNote:
      "ଏହି ରାଶି ଚୟନ କରାଯାଇଥିବା ଫସଲର ଆନୁମାନିକ ମୂଲ୍ୟ ଉପରେ ଆଧାରିତ।",
    quantity: "📦 ପରିମାଣ",
    unit: "ଏକକ",
    enterQuantity: "ପରିମାଣ ଦିଅନ୍ତୁ",
    totalWeight: "ମୋଟ ଓଜନ",
    kilogram: "କିଲୋଗ୍ରାମ୍ (KG)",
    quintal: "କ୍ୱିଣ୍ଟାଲ୍",
    ton: "ଟନ୍",
    bag: "ବ୍ୟାଗ୍ (50 KG)",
    note: "ଟିପ୍ପଣୀ",
    nearbyMandiSearch: "🔎 ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜ",
    onlyMandis: "କେବଳ 60 KM ମଧ୍ୟରେ ଥିବା ମଣ୍ଡି ଦେଖାଯିବ।",
    findNearbyMandis: "🔎 ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜନ୍ତୁ",
    searching: "ଖୋଜୁଛି...",
    clear: "ସଫା କରନ୍ତୁ",
    nearbyMandis: "🏪 ନିକଟସ୍ଥ ମଣ୍ଡି",
    found: "ମିଳିଲା",
    priceKg: "ମୂଲ୍ୟ / KG",
    totalQuantity: "ମୋଟ ପରିମାଣ",
    estimatedAmount: "ଆନୁମାନିକ ରାଶି",
    selectMandi: "ମଣ୍ଡି ଚୟନ କରନ୍ତୁ",
    selected: "✓ ଚୟନ କରାଯାଇଛି",
    directions: "🗺️ ଦିଗ",
    call: "📞 କଲ୍",
    copy: "📋 କପି",
    addressCopied: "ମଣ୍ଡି ଠିକଣା କପି ହୋଇଛି।",
    selectedMandi: "✓ ଚୟନ କରାଯାଇଥିବା ମଣ୍ଡି",
    crop: "ଫସଲ",
    continueLogistics: "ଲଜିଷ୍ଟିକ୍ସକୁ ଯାଆନ୍ତୁ →",
    searchNearby: "ନିକଟସ୍ଥ ମଣ୍ଡି ଖୋଜନ୍ତୁ",
    searchDescription: "ଚାଷୀଙ୍କ ସ୍ଥାନରୁ 60 KM ମଧ୍ୟରେ ଥିବା ମଣ୍ଡି ଏଠାରେ ଦେଖାଯିବ।",
    demoNote: "ଡେମୋ ଟିପ୍ପଣୀ:",
    staticDemoData:
      "ଏହି ପ୍ରୋଟୋଟାଇପରେ ମଣ୍ଡି ତାଲିକା, ମୂଲ୍ୟ ଏବଂ ଯୋଗାଯୋଗ ନମ୍ବର static/indicative demo data।",
    quantityRequired: "ଦୟାକରି ପରିମାଣ ଦିଅନ୍ତୁ।",
    profileLocationMissing:
      "ଚାଷୀଙ୍କ ପ୍ରୋଫାଇଲ୍ ଲୋକେସନ୍ ମିଳିଲା ନାହିଁ। ପ୍ରୋଫାଇଲରେ ଜିଲ୍ଲା/ଲୋକେସନ୍ ସେଭ୍ କରନ୍ତୁ।",
    mandiSelected: "ଚୟନ କରାଯାଇଛି।",
  },

  as: {
    title: "🌾 মাণ্ডী আৰু বজাৰ",
    subtitle: "কৃষকৰ প্ৰফাইল স্থানৰ পৰা 60 KM ভিতৰত মাণ্ডী বিচাৰক।",
    cropDetails: "🌱 শস্যৰ বিৱৰণ",
    selectedCrop: "নিৰ্বাচিত শস্য",
    season: "ঋতু",
    farmerLocation: "📍 কৃষকৰ স্থান",
    locationNotAvailable: "স্থান উপলব্ধ নহয়",
    currentGps: "বৰ্তমান GPS",
    profileCoordinates: "প্ৰফাইল কোঅৰ্ডিনেট",
    district: "জিলা",
    useCurrentLocation: "📍 বৰ্তমান স্থান ব্যৱহাৰ কৰক",
    gettingLocation: "স্থান পোৱা গৈছে...",
    currentLocationSet: "বৰ্তমান স্থান ছেট কৰা হৈছে।",
    locationNotSupported: "আপোনাৰ ব্ৰাউজাৰত লোকেচন সমৰ্থন নাই।",
    locationFailed: "বৰ্তমান স্থান পোৱা নগ'ল।",
    indicativePrice: "💰 আনুমানিক মূল্য",
    currentIndicativeRate: "বৰ্তমান আনুমানিক বজাৰ মূল্য",
    perKg: "প্ৰতি KG",
    indicativeDemoPrice: "নিৰ্বাচিত শস্যৰ ওপৰত ভিত্তি কৰা ডেমো মূল্য।",
    priceBasis: "📌 মূল্যৰ ভিত্তি",
    yourQuantity: "আপোনাৰ পৰিমাণ",
    indicativeEstimatedValue: "আনুমানিক মূল্য",
    calculation: "গণনা",
    indicativeAmountNote:
      "এই ৰাশি নিৰ্বাচিত শস্যৰ আনুমানিক মূল্যৰ ওপৰত ভিত্তি কৰি দিয়া হৈছে।",
    quantity: "📦 পৰিমাণ",
    unit: "একক",
    enterQuantity: "পৰিমাণ লিখক",
    totalWeight: "মুঠ ওজন",
    kilogram: "কিলোগ্ৰাম (KG)",
    quintal: "কুইণ্টল",
    ton: "টন",
    bag: "বেগ (50 KG)",
    note: "টোকা",
    nearbyMandiSearch: "🔎 ওচৰৰ মাণ্ডী অনুসন্ধান",
    onlyMandis: "কেৱল 60 KM ভিতৰৰ মাণ্ডী দেখুওৱা হ'ব।",
    findNearbyMandis: "🔎 ওচৰৰ মাণ্ডী বিচাৰক",
    searching: "বিচাৰি আছে...",
    clear: "পৰিষ্কাৰ",
    nearbyMandis: "🏪 ওচৰৰ মাণ্ডী",
    found: "পোৱা গ'ল",
    priceKg: "মূল্য / KG",
    totalQuantity: "মুঠ পৰিমাণ",
    estimatedAmount: "আনুমানিক ৰাশি",
    selectMandi: "মাণ্ডী নিৰ্বাচন কৰক",
    selected: "✓ নিৰ্বাচিত",
    directions: "🗺️ দিশ",
    call: "📞 কল",
    copy: "📋 কপি",
    addressCopied: "মাণ্ডীৰ ঠিকনা কপি কৰা হৈছে।",
    selectedMandi: "✓ নিৰ্বাচিত মাণ্ডী",
    crop: "শস্য",
    continueLogistics: "লজিষ্টিক্সলৈ যাওক →",
    searchNearby: "ওচৰৰ মাণ্ডী বিচাৰক",
    searchDescription: "কৃষকৰ স্থানৰ পৰা 60 KM ভিতৰৰ মাণ্ডী ইয়াত দেখা যাব।",
    demoNote: "ডেমো টোকা:",
    staticDemoData:
      "এই প্ৰ'ট'টাইপৰ মাণ্ডী তালিকা, মূল্য আৰু যোগাযোগ নম্বৰ static/indicative demo data।",
    quantityRequired: "অনুগ্ৰহ কৰি পৰিমাণ লিখক।",
    profileLocationMissing:
      "কৃষকৰ প্ৰফাইল স্থান পোৱা নগ'ল। প্ৰফাইলত জিলা/স্থান সংৰক্ষণ কৰক।",
    mandiSelected: "নিৰ্বাচিত হৈছে।",
  },

  ur: {
    title: "🌾 منڈی اور بازار",
    subtitle: "کسان کے پروفائل مقام سے 60 KM کے اندر منڈیاں تلاش کریں۔",
    cropDetails: "🌱 فصل کی معلومات",
    selectedCrop: "منتخب فصل",
    season: "سیزن",
    farmerLocation: "📍 کسان کا مقام",
    locationNotAvailable: "مقام دستیاب نہیں",
    currentGps: "موجودہ GPS",
    profileCoordinates: "پروفائل کوآرڈینیٹس",
    district: "ضلع",
    useCurrentLocation: "📍 موجودہ مقام استعمال کریں",
    gettingLocation: "مقام حاصل کیا جا رہا ہے...",
    currentLocationSet: "موجودہ مقام سیٹ ہو گیا ہے۔",
    locationNotSupported: "آپ کے براؤزر میں لوکیشن سپورٹ نہیں ہے۔",
    locationFailed: "موجودہ مقام حاصل نہیں ہو سکا۔",
    indicativePrice: "💰 اندازاً قیمت",
    currentIndicativeRate: "موجودہ اندازاً مارکیٹ ریٹ",
    perKg: "فی KG",
    indicativeDemoPrice: "منتخب فصل کی بنیاد پر ڈیمو قیمت۔",
    priceBasis: "📌 قیمت کی بنیاد",
    yourQuantity: "آپ کی مقدار",
    indicativeEstimatedValue: "اندازاً کل قیمت",
    calculation: "حساب",
    indicativeAmountNote:
      "یہ رقم منتخب فصل کی اندازاً قیمت کی بنیاد پر ہے۔",
    quantity: "📦 مقدار",
    unit: "یونٹ",
    enterQuantity: "مقدار درج کریں",
    totalWeight: "کل وزن",
    kilogram: "کلوگرام (KG)",
    quintal: "کوئنٹل",
    ton: "ٹن",
    bag: "بیگ (50 KG)",
    note: "نوٹ",
    nearbyMandiSearch: "🔎 قریبی منڈی تلاش",
    onlyMandis: "صرف 60 KM کے اندر کی منڈیاں دکھائی جائیں گی۔",
    findNearbyMandis: "🔎 قریبی منڈیاں تلاش کریں",
    searching: "تلاش جاری ہے...",
    clear: "صاف کریں",
    nearbyMandis: "🏪 قریبی منڈیاں",
    found: "ملیں",
    priceKg: "قیمت / KG",
    totalQuantity: "کل مقدار",
    estimatedAmount: "اندازاً رقم",
    selectMandi: "منڈی منتخب کریں",
    selected: "✓ منتخب",
    directions: "🗺️ راستہ",
    call: "📞 کال",
    copy: "📋 کاپی",
    addressCopied: "منڈی کا پتہ کاپی ہو گیا۔",
    selectedMandi: "✓ منتخب منڈی",
    crop: "فصل",
    continueLogistics: "لاجسٹکس پر جائیں →",
    searchNearby: "قریبی منڈیاں تلاش کریں",
    searchDescription:
      "کسان کے مقام سے 60 KM کے اندر کی منڈیاں یہاں دکھائی جائیں گی۔",
    demoNote: "ڈیمو نوٹ:",
    staticDemoData:
      "اس پروٹوٹائپ میں منڈی کی فہرست، قیمتیں اور رابطہ نمبرز static/indicative demo data ہیں۔",
    quantityRequired: "براہ کرم مقدار درج کریں۔",
    profileLocationMissing:
      "کسان کی پروفائل لوکیشن نہیں ملی۔ براہ کرم پروفائل میں ضلع/لوکیشن محفوظ کریں۔",
    mandiSelected: "منتخب ہو گئی ہے۔",
  },
};

const MAX_DISTANCE_KM = 60;

const MANDI_DATABASE: MandiBase[] = [
  // ================= BIHAR =================
  {
    id: "bihar-gulabbagh",
    name: "Gulabbagh Mandi",
    district: "Purnia",
    state: "Bihar",
    address: "Gulabbagh, Purnia, Bihar",
    phone: "06454-242100",
    lat: 25.7771,
    lng: 87.4753,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Maize", "Corn"],
  },
  {
    id: "bihar-saharsa",
    name: "Saharsa Mandi",
    district: "Saharsa",
    state: "Bihar",
    address: "Saharsa, Bihar",
    phone: "06478-222100",
    lat: 25.883,
    lng: 86.599,
    ratePerKg: 23,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "bihar-supaul",
    name: "Supaul Mandi",
    district: "Supaul",
    state: "Bihar",
    address: "Supaul, Bihar",
    phone: "06473-222100",
    lat: 26.126,
    lng: 86.605,
    ratePerKg: 22,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "bihar-darbhanga",
    name: "Darbhanga Mandi",
    district: "Darbhanga",
    state: "Bihar",
    address: "Darbhanga, Bihar",
    phone: "06272-222100",
    lat: 26.1542,
    lng: 85.8918,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Mustard"],
  },
  {
    id: "bihar-muzaffarpur",
    name: "Muzaffarpur Mandi",
    district: "Muzaffarpur",
    state: "Bihar",
    address: "Muzaffarpur, Bihar",
    phone: "0621-222100",
    lat: 26.1197,
    lng: 85.391,
    ratePerKg: 25,
    crops: ["Wheat", "Rice", "Maize", "Potato"],
  },
  {
    id: "bihar-samastipur",
    name: "Samastipur Mandi",
    district: "Samastipur",
    state: "Bihar",
    address: "Samastipur, Bihar",
    phone: "06274-222100",
    lat: 25.8629,
    lng: 85.781,
    ratePerKg: 23,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "bihar-begusarai",
    name: "Begusarai Mandi",
    district: "Begusarai",
    state: "Bihar",
    address: "Begusarai, Bihar",
    phone: "06243-222100",
    lat: 25.4182,
    lng: 86.1272,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "bihar-patna",
    name: "Patna Mandi",
    district: "Patna",
    state: "Bihar",
    address: "Patna, Bihar",
    phone: "0612-222100",
    lat: 25.5941,
    lng: 85.1376,
    ratePerKg: 26,
    crops: ["Wheat", "Rice", "Potato", "Onion"],
  },
  {
    id: "bihar-gaya",
    name: "Gaya Mandi",
    district: "Gaya",
    state: "Bihar",
    address: "Gaya, Bihar",
    phone: "0631-222100",
    lat: 24.7914,
    lng: 84.9994,
    ratePerKg: 25,
    crops: ["Wheat", "Rice", "Mustard"],
  },
  {
    id: "bihar-bhagalpur",
    name: "Bhagalpur Mandi",
    district: "Bhagalpur",
    state: "Bihar",
    address: "Bhagalpur, Bihar",
    phone: "0641-222100",
    lat: 25.2425,
    lng: 86.9842,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Maize"],
  },

  // ================= DELHI =================
  {
    id: "delhi-azadpur",
    name: "Azadpur Mandi",
    district: "North Delhi",
    state: "Delhi",
    address: "Azadpur, Delhi",
    phone: "011-27673521",
    lat: 28.7041,
    lng: 77.1819,
    ratePerKg: 28,
    crops: ["Potato", "Onion", "Rice", "Wheat"],
  },
  {
    id: "delhi-ghazipur",
    name: "Ghazipur Mandi",
    district: "East Delhi",
    state: "Delhi",
    address: "Ghazipur, Delhi",
    phone: "011-22151500",
    lat: 28.625,
    lng: 77.318,
    ratePerKg: 27,
    crops: ["Potato", "Onion", "Rice"],
  },
  {
    id: "delhi-keshopur",
    name: "Keshopur Mandi",
    district: "West Delhi",
    state: "Delhi",
    address: "Keshopur, Delhi",
    phone: "011-25173600",
    lat: 28.647,
    lng: 77.083,
    ratePerKg: 26,
    crops: ["Potato", "Onion", "Wheat"],
  },
  {
    id: "delhi-okhla",
    name: "Okhla Mandi",
    district: "South Delhi",
    state: "Delhi",
    address: "Okhla, Delhi",
    phone: "011-26834100",
    lat: 28.5355,
    lng: 77.264,
    ratePerKg: 27,
    crops: ["Rice", "Wheat", "Onion"],
  },

  // ================= HARYANA =================
  {
    id: "haryana-gurugram",
    name: "Gurugram Mandi",
    district: "Gurugram",
    state: "Haryana",
    address: "Gurugram, Haryana",
    phone: "0124-2321000",
    lat: 28.4595,
    lng: 77.0266,
    ratePerKg: 25,
    crops: ["Wheat", "Mustard", "Potato"],
  },
  {
    id: "haryana-faridabad",
    name: "Faridabad Mandi",
    district: "Faridabad",
    state: "Haryana",
    address: "Faridabad, Haryana",
    phone: "0129-2411000",
    lat: 28.4089,
    lng: 77.3178,
    ratePerKg: 26,
    crops: ["Wheat", "Rice", "Potato"],
  },
  {
    id: "haryana-sonipat",
    name: "Sonipat Mandi",
    district: "Sonipat",
    state: "Haryana",
    address: "Sonipat, Haryana",
    phone: "0130-2201000",
    lat: 28.9931,
    lng: 77.0151,
    ratePerKg: 24,
    crops: ["Wheat", "Mustard", "Rice"],
  },
  {
    id: "haryana-panipat",
    name: "Panipat Mandi",
    district: "Panipat",
    state: "Haryana",
    address: "Panipat, Haryana",
    phone: "0180-2631000",
    lat: 29.3909,
    lng: 76.9635,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Mustard"],
  },
  {
    id: "haryana-rohtak",
    name: "Rohtak Mandi",
    district: "Rohtak",
    state: "Haryana",
    address: "Rohtak, Haryana",
    phone: "01262-251000",
    lat: 28.8955,
    lng: 76.6066,
    ratePerKg: 23,
    crops: ["Wheat", "Mustard", "Rice"],
  },
  {
    id: "haryana-hisar",
    name: "Hisar Mandi",
    district: "Hisar",
    state: "Haryana",
    address: "Hisar, Haryana",
    phone: "01662-233000",
    lat: 29.1492,
    lng: 75.7217,
    ratePerKg: 24,
    crops: ["Wheat", "Mustard", "Maize"],
  },

  // ================= UTTAR PRADESH =================
  {
    id: "up-ghaziabad",
    name: "Ghaziabad Mandi",
    district: "Ghaziabad",
    state: "Uttar Pradesh",
    address: "Ghaziabad, Uttar Pradesh",
    phone: "0120-2821000",
    lat: 28.6692,
    lng: 77.4538,
    ratePerKg: 25,
    crops: ["Wheat", "Rice", "Potato"],
  },
  {
    id: "up-noida",
    name: "Noida Mandi",
    district: "Gautam Buddha Nagar",
    state: "Uttar Pradesh",
    address: "Noida, Uttar Pradesh",
    phone: "0120-2511000",
    lat: 28.5355,
    lng: 77.391,
    ratePerKg: 27,
    crops: ["Wheat", "Rice", "Potato", "Onion"],
  },
  {
    id: "up-meerut",
    name: "Meerut Mandi",
    district: "Meerut",
    state: "Uttar Pradesh",
    address: "Meerut, Uttar Pradesh",
    phone: "0121-2661000",
    lat: 28.9845,
    lng: 77.7064,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Mustard"],
  },
  {
    id: "up-lucknow",
    name: "Lucknow Mandi",
    district: "Lucknow",
    state: "Uttar Pradesh",
    address: "Lucknow, Uttar Pradesh",
    phone: "0522-2221000",
    lat: 26.8467,
    lng: 80.9462,
    ratePerKg: 26,
    crops: ["Wheat", "Rice", "Potato", "Onion"],
  },

  // ================= JHARKHAND =================
  {
    id: "jharkhand-ranchi",
    name: "Ranchi Mandi",
    district: "Ranchi",
    state: "Jharkhand",
    address: "Ranchi, Jharkhand",
    phone: "0651-2221000",
    lat: 23.3441,
    lng: 85.3096,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "jharkhand-dhanbad",
    name: "Dhanbad Mandi",
    district: "Dhanbad",
    state: "Jharkhand",
    address: "Dhanbad, Jharkhand",
    phone: "0326-2221000",
    lat: 23.7957,
    lng: 86.4304,
    ratePerKg: 23,
    crops: ["Wheat", "Rice", "Maize"],
  },
];

const CROP_RATE_FACTOR: Record<string, number> = {
  rice: 1,
  paddy: 1,
  wheat: 1,
  maize: 0.95,
  corn: 0.95,
  mustard: 1.08,
  potato: 0.8,
  onion: 0.9,
};

function normalizeCropName(value: string) {
  return value.trim().toLowerCase();
}

function getCropFactor(cropName: string) {
  return (
    CROP_RATE_FACTOR[normalizeCropName(cropName)] ?? 1
  );
}

function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const earthRadius = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLng =
    ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
}

function getTotalKg(
  quantity: number,
  unit: QuantityUnit
) {
  if (unit === "kg") return quantity;
  if (unit === "quintal") return quantity * 100;
  if (unit === "ton") return quantity * 1000;
  if (unit === "bag") return quantity * 50;

  return quantity;
}

function getProfileLocation(
  profile: Profile | null
) {
  if (!profile) return null;

  const lat =
    typeof profile.lat === "number"
      ? profile.lat
      : typeof profile.latitude === "number"
      ? profile.latitude
      : null;

  const lng =
    typeof profile.lng === "number"
      ? profile.lng
      : typeof profile.longitude === "number"
      ? profile.longitude
      : null;

  if (lat !== null && lng !== null) {
    return {
      lat,
      lng,
      source: "profile",
    };
  }

  return null;
}

const DISTRICT_COORDINATES: Record<
  string,
  { lat: number; lng: number }
> = {
  purnia: { lat: 25.7771, lng: 87.4753 },
  saharsa: { lat: 25.883, lng: 86.599 },
  supaul: { lat: 26.126, lng: 86.605 },
  darbhanga: { lat: 26.1542, lng: 85.8918 },
  muzaffarpur: { lat: 26.1197, lng: 85.391 },
  samastipur: { lat: 25.8629, lng: 85.781 },
  begusarai: { lat: 25.4182, lng: 86.1272 },
  patna: { lat: 25.5941, lng: 85.1376 },
  gaya: { lat: 24.7914, lng: 84.9994 },
  bhagalpur: { lat: 25.2425, lng: 86.9842 },
  "north delhi": { lat: 28.7041, lng: 77.1819 },
  "east delhi": { lat: 28.625, lng: 77.318 },
  "west delhi": { lat: 28.647, lng: 77.083 },
  "south delhi": { lat: 28.5355, lng: 77.264 },
  gurugram: { lat: 28.4595, lng: 77.0266 },
  faridabad: { lat: 28.4089, lng: 77.3178 },
  sonipat: { lat: 28.9931, lng: 77.0151 },
  panipat: { lat: 29.3909, lng: 76.9635 },
  rohtak: { lat: 28.8955, lng: 76.6066 },
  hisar: { lat: 29.1492, lng: 75.7217 },
  ghaziabad: { lat: 28.6692, lng: 77.4538 },
  "gautam buddha nagar": {
    lat: 28.5355,
    lng: 77.391,
  },
  meerut: { lat: 28.9845, lng: 77.7064 },
  lucknow: { lat: 26.8467, lng: 80.9462 },
  ranchi: { lat: 23.3441, lng: 85.3096 },
  dhanbad: { lat: 23.7957, lng: 86.4304 },
};

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();

  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [crop, setCrop] =
    useState<Crop | null>(null);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [quantity, setQuantity] =
    useState<number | "">("");

  const [unit, setUnit] =
    useState<QuantityUnit>("quintal");

  const [mandis, setMandis] =
    useState<Mandi[]>([]);

  const [selectedMandi, setSelectedMandi] =
    useState<Mandi | null>(null);

  const [showLogistics, setShowLogistics] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [profileLocation, setProfileLocation] =
    useState<{
      lat: number;
      lng: number;
      source: string;
    } | null>(null);

  const cropId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  useEffect(() => {
    try {
      const possibleProfileKeys = [
        "farmerProfile",
        "profile",
        "userProfile",
        "farmer",
        "user",
        "profileData",
      ];

      let foundProfile: Profile | null = null;

      for (const key of possibleProfileKeys) {
        const stored =
          localStorage.getItem(key);

        if (stored) {
          try {
            const parsed =
              JSON.parse(stored);

            if (
              parsed &&
              typeof parsed === "object"
            ) {
              foundProfile = parsed;
              break;
            }
          } catch {
            // Ignore invalid profile
          }
        }
      }

      if (foundProfile) {
        setProfile(foundProfile);

        const exactLocation =
          getProfileLocation(foundProfile);

        if (exactLocation) {
          setProfileLocation(exactLocation);
        } else {
          const district = (
            foundProfile.district ||
            foundProfile.city ||
            ""
          )
            .trim()
            .toLowerCase();

          const fallback =
            DISTRICT_COORDINATES[district];

          if (fallback) {
            setProfileLocation({
              ...fallback,
              source: "district",
            });
          }
        }
      }

      const cropData =
        localStorage.getItem("farmerCrops");

      if (cropData) {
        try {
          const parsedCrops =
            JSON.parse(cropData);

          if (Array.isArray(parsedCrops)) {
            const foundCrop =
              parsedCrops.find(
                (item: Crop) =>
                  String(item.id) ===
                  String(cropId)
              );

            if (foundCrop) {
              setCrop(foundCrop);
            } else if (
              parsedCrops.length > 0
            ) {
              setCrop(parsedCrops[0]);
            }
          }
        } catch {
          // Ignore invalid crop data
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [cropId]);

  const cropName = useMemo(() => {
    return (
      crop?.crop ||
      crop?.name ||
      "Wheat"
    );
  }, [crop]);

  const totalKg = useMemo(() => {
    if (quantity === "") {
      return 0;
    }

    return getTotalKg(
      Number(quantity),
      unit
    );
  }, [quantity, unit]);

  const cropFactor = useMemo(() => {
    return getCropFactor(cropName);
  }, [cropName]);

  const getMandiRate = (
    baseRate: number
  ) => {
    return Number(
      (baseRate * cropFactor).toFixed(2)
    );
  };

  const indicativePricePerKg =
    useMemo(() => {
      const cropLower =
        normalizeCropName(cropName);

      const matchingMandis =
        MANDI_DATABASE.filter(
          (mandi) =>
            mandi.crops.some(
              (item) => {
                const itemLower =
                  normalizeCropName(item);

                return (
                  itemLower === cropLower ||
                  (cropLower === "paddy" &&
                    itemLower === "rice") ||
                  (cropLower === "corn" &&
                    itemLower === "maize")
                );
              }
            )
        );

      if (
        matchingMandis.length === 0
      ) {
        return 0;
      }

      const total =
        matchingMandis.reduce(
          (sum, mandi) =>
            sum +
            getMandiRate(
              mandi.ratePerKg
            ),
          0
        );

      return Number(
        (
          total /
          matchingMandis.length
        ).toFixed(2)
      );
    }, [cropName, cropFactor]);

  const indicativeEstimatedValue =
    useMemo(() => {
      if (
        !indicativePricePerKg ||
        !totalKg
      ) {
        return 0;
      }

      return (
        indicativePricePerKg *
        totalKg
      );
    }, [
      indicativePricePerKg,
      totalKg,
    ]);

  const searchMandis = () => {
    if (
      quantity === "" ||
      Number(quantity) <= 0
    ) {
      alert(t.quantityRequired);
      return;
    }

    if (!profileLocation) {
      alert(t.profileLocationMissing);
      return;
    }

    setLoading(true);

    const cropLower =
      normalizeCropName(cropName);

    const results: Mandi[] =
      MANDI_DATABASE
        .filter((mandi) => {
          if (
            !mandi.crops ||
            mandi.crops.length === 0
          ) {
            return true;
          }

          return mandi.crops.some(
            (item) => {
              const itemLower =
                normalizeCropName(item);

              return (
                itemLower === cropLower ||
                (cropLower === "paddy" &&
                  itemLower === "rice") ||
                (cropLower === "corn" &&
                  itemLower === "maize")
              );
            }
          );
        })
        .map((mandi) => {
          const distanceKm =
            getDistanceKm(
              profileLocation.lat,
              profileLocation.lng,
              mandi.lat,
              mandi.lng
            );

          const ratePerKg =
            getMandiRate(
              mandi.ratePerKg
            );

          return {
            ...mandi,
            ratePerKg,
            distanceKm,
            totalKg,
            estimatedAmount:
              ratePerKg * totalKg,
          };
        })
        .filter(
          (mandi) =>
            mandi.distanceKm <=
            MAX_DISTANCE_KM
        )
        .sort((a, b) => {
          if (
            a.distanceKm !==
            b.distanceKm
          ) {
            return (
              a.distanceKm -
              b.distanceKm
            );
          }

          return (
            b.ratePerKg -
            a.ratePerKg
          );
        });

    setMandis(results);
    setSelectedMandi(null);
    setLoading(false);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(t.locationNotSupported);
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat:
            position.coords.latitude,
          lng:
            position.coords.longitude,
          source: "gps",
        };

        setProfileLocation(location);
        setLocationLoading(false);

        alert(t.currentLocationSet);
      },
      () => {
        setLocationLoading(false);
        alert(t.locationFailed);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const selectMandi = (
    mandi: Mandi
  ) => {
    setSelectedMandi(mandi);

    const dataToSave = {
      id: mandi.id,
      name: mandi.name,
      district: mandi.district,
      state: mandi.state,
      address: mandi.address,
      phone: mandi.phone,
      lat: mandi.lat,
      lng: mandi.lng,
      ratePerKg: mandi.ratePerKg,
      crop: cropName,
      quantity: Number(quantity),
      unit,
      totalKg,
      estimatedAmount:
        mandi.estimatedAmount,
    };

    localStorage.setItem(
      "selectedMandi",
      JSON.stringify(dataToSave)
    );

    alert(
      `${mandi.name} ${t.mandiSelected}`
    );
  };

  const openDirections = (
    mandi: Mandi
  ) => {
    let origin = "";

    if (profileLocation) {
      origin = `${profileLocation.lat},${profileLocation.lng}`;
    } else if (profile?.address) {
      origin = profile.address;
    } else {
      origin =
        `${profile?.district || ""}, ` +
        `${profile?.state || ""}`;
    }

    const destination =
      `${mandi.lat},${mandi.lng}`;

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${encodeURIComponent(origin)}` +
      `&destination=${encodeURIComponent(destination)}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const callMandi = (
    phone: string
  ) => {
    window.location.href =
      `tel:${phone}`;
  };

  const clearResults = () => {
    setMandis([]);
    setSelectedMandi(null);
  };
  if (showLogistics) {
    return <NewLogisticsPage />;
  }

  return (
    <div
      className="min-h-screen bg-gray-50 px-4 py-6"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-green-700">
              {t.title}
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              {t.subtitle}
            </p>
          </div>

        </div>

        {/* CROP + PROFILE */}
        <div className="mb-6 grid gap-5 md:grid-cols-2">

          {/* CROP */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-gray-800">
              {t.cropDetails}
            </h2>

            <div className="rounded-xl bg-green-50 p-4">

              <p className="text-sm text-gray-500">
                {t.selectedCrop}
              </p>

              <p className="mt-1 text-xl font-bold capitalize text-green-700">
                {cropName}
              </p>

              {crop?.season && (
                <p className="mt-1 text-sm text-gray-600">
                  {t.season}: {crop.season}
                </p>
              )}

            </div>
          </div>

          {/* FARMER LOCATION */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-gray-800">
              {t.farmerLocation}
            </h2>

            <div className="rounded-xl bg-blue-50 p-4">

              <p className="font-semibold uppercase text-gray-800">
                {profile?.district ||
                  profile?.city ||
                  t.locationNotAvailable}

                {profile?.state
                  ? `, ${profile.state}`
                  : ""}
              </p>

              {profile?.address && (
                <p className="mt-1 text-sm text-gray-600">
                  {profile.address}
                </p>
              )}

              {profileLocation && (
                <p className="mt-2 text-xs text-gray-500">
                  {profileLocation.source ===
                  "gps"
                    ? t.currentGps
                    : profileLocation.source ===
                      "profile"
                    ? t.profileCoordinates
                    : t.district}
                </p>
              )}

              <button
                onClick={useCurrentLocation}
                disabled={locationLoading}
                className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {locationLoading
                  ? t.gettingLocation
                  : t.useCurrentLocation}
              </button>

            </div>
          </div>
        </div>

        {/* PRICE SECTION */}
        <div className="mb-6 grid gap-5 md:grid-cols-2">

          {/* INDICATIVE PRICE */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-gray-800">
              {t.indicativePrice}
            </h2>

            <div className="rounded-xl bg-green-50 p-5">

              <p className="text-sm font-medium text-gray-600">
                {t.currentIndicativeRate}
              </p>

              <div className="mt-2 flex items-end gap-2">

                <p className="text-3xl font-bold text-green-700">
                  ₹
                  {indicativePricePerKg > 0
                    ? indicativePricePerKg
                    : "--"}
                </p>

                <p className="mb-1 text-base font-semibold text-gray-700">
                  {t.perKg}
                </p>

              </div>

              <p className="mt-2 text-xs text-gray-500">
                {t.indicativeDemoPrice}
              </p>

            </div>
          </div>

          {/* PRICE BASIS */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-gray-800">
              {t.priceBasis}
            </h2>

            <div className="rounded-xl bg-blue-50 p-5">

              <div className="flex items-center justify-between">

                <span className="text-sm font-medium text-gray-600">
                  {t.indicativePrice}
                </span>

                <span className="text-xl font-bold text-blue-700">
                  ₹
                  {indicativePricePerKg > 0
                    ? indicativePricePerKg
                    : "--"}

                  <span className="ml-1 text-sm font-medium text-gray-600">
                    / KG
                  </span>
                </span>

              </div>

              <div className="mt-3 flex items-center justify-between border-t border-blue-200 pt-3">

                <span className="text-sm font-medium text-gray-600">
                  {t.yourQuantity}
                </span>

                <span className="font-bold text-gray-800">
                  {totalKg.toLocaleString()} KG
                </span>

              </div>

              <div className="mt-3 rounded-lg bg-white p-3">

                <p className="text-sm text-gray-600">
                  {t.indicativeEstimatedValue}
                </p>

                <p className="mt-1 text-2xl font-bold text-green-700">
                  ₹
                  {indicativeEstimatedValue.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {t.calculation}: ₹
                  {indicativePricePerKg || 0} ×{" "}
                  {totalKg.toLocaleString()} KG
                </p>

              </div>

              <p className="mt-3 text-xs text-gray-500">
                {t.indicativeAmountNote}
              </p>

            </div>
          </div>

        </div>

        {/* QUANTITY */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-lg font-bold text-gray-800">
            {t.quantity}
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            {/* QUANTITY INPUT */}
            <div>

              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t.quantity}
              </label>

              <input
                type="number"
                min="0"
                placeholder={t.enterQuantity}
                value={quantity}
                onChange={(e) => {
                  const value =
                    e.target.value;

                  if (value === "") {
                    setQuantity("");
                  } else {
                    setQuantity(Number(value));
                  }
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />

            </div>

            {/* UNIT */}
            <div>

              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t.unit}
              </label>

              <select
                value={unit}
                onChange={(e) =>
                  setUnit(
                    e.target.value as QuantityUnit
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              >

                <option value="kg">
                  {t.kilogram}
                </option>

                <option value="quintal">
                  {t.quintal}
                </option>

                <option value="ton">
                  {t.ton}
                </option>

                <option value="bag">
                  {t.bag}
                </option>

              </select>

            </div>

            {/* TOTAL WEIGHT */}
            <div className="rounded-lg bg-yellow-50 p-3">

              <p className="text-sm text-gray-600">
                {t.totalWeight}
              </p>

              <p className="text-xl font-bold text-yellow-700">
                {totalKg.toLocaleString()} KG
              </p>

            </div>

          </div>

          <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
            <strong>{t.note}:</strong>{" "}
            1 Quintal = 100 KG, 1 Ton = 1000 KG, 1 Bag = 50 KG
          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-lg font-bold text-gray-800">
                {t.nearbyMandiSearch}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {t.onlyMandis}
              </p>

            </div>

            <div className="flex gap-2">

              <button
                onClick={searchMandis}
                disabled={loading}
                className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {loading
                  ? t.searching
                  : t.findNearbyMandis}
              </button>

              {mandis.length > 0 && (
                <button
                  onClick={clearResults}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  {t.clear}
                </button>
              )}

            </div>

          </div>

        </div>

        {/* RESULTS */}
        {mandis.length > 0 && (
          <div className="mb-6">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-xl font-bold text-gray-800">
                {t.nearbyMandis}
              </h2>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {mandis.length} {t.found}
              </span>

            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {mandis.map((mandi) => (
                <div
                  key={mandi.id}
                  className={`rounded-2xl bg-white p-5 shadow-sm transition ${
                    selectedMandi?.id === mandi.id
                      ? "ring-2 ring-green-600"
                      : ""
                  }`}
                >

                  {/* MANDI NAME */}
                  <div className="mb-3 flex items-start justify-between gap-2">

                    <div>

                      <h3 className="text-lg font-bold text-gray-800">
                        {mandi.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {mandi.district},{" "}
                        {mandi.state}
                      </p>

                    </div>

                    <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                      {mandi.distanceKm.toFixed(1)} KM
                    </span>

                  </div>

                  {/* PRICE */}
                  <div className="mb-4 rounded-xl bg-green-50 p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-gray-600">
                        {t.priceKg}
                      </span>

                      <span className="text-xl font-bold text-green-700">
                        ₹{mandi.ratePerKg}
                      </span>

                    </div>

                    <div className="mt-2 flex items-center justify-between">

                      <span className="text-sm text-gray-600">
                        {t.totalQuantity}
                      </span>

                      <span className="font-semibold text-gray-800">
                        {mandi.totalKg.toLocaleString()} KG
                      </span>

                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-green-200 pt-2">

                      <span className="text-sm font-medium text-gray-700">
                        {t.estimatedAmount}
                      </span>

                      <span className="text-lg font-bold text-green-800">
                        ₹
                        {mandi.estimatedAmount.toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}
                      </span>

                    </div>

                  </div>

                  {/* ADDRESS */}
                  <div className="mb-4 space-y-2 text-sm text-gray-600">

                    <p>
                      📍 {mandi.address}
                    </p>

                    <p>
                      📞 {mandi.phone}
                    </p>

                  </div>

                  {/* BUTTONS */}
                  <div className="grid grid-cols-2 gap-2">

                    <button
                      onClick={() =>
                        selectMandi(mandi)
                      }
                      className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                        selectedMandi?.id ===
                        mandi.id
                          ? "bg-green-700 text-white"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {selectedMandi?.id ===
                      mandi.id
                        ? t.selected
                        : t.selectMandi}
                    </button>

                    <button
                      onClick={() =>
                        openDirections(mandi)
                      }
                      className="rounded-lg border border-blue-600 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      {t.directions}
                    </button>

                    <button
                      onClick={() =>
                        callMandi(mandi.phone)
                      }
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      {t.call}
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(
                          `${mandi.name}, ${mandi.address}`
                        );

                        alert(t.addressCopied);
                      }}
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      {t.copy}
                    </button>

                  </div>

                </div>
              ))}

            </div>
          </div>
        )}

        {/* NO RESULTS */}
        {!loading &&
          mandis.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

              <div className="text-5xl">
                🏪
              </div>

              <h3 className="mt-3 text-lg font-bold text-gray-800">
                {t.searchNearby}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {t.searchDescription}
              </p>

            </div>
          )}

        {/* SELECTED MANDI */}
        {selectedMandi && (
          <div className="mt-6 rounded-2xl border-2 border-green-500 bg-green-50 p-5">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-sm font-semibold text-green-700">
                  {t.selectedMandi}
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-800">
                  {selectedMandi.name}
                </h2>

                <p className="text-sm text-gray-600">
                  {selectedMandi.address}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {t.crop}:{" "}
                  <strong>{cropName}</strong>{" "}
                  | {t.quantity}:{" "}
                  <strong>
                    {totalKg.toLocaleString()} KG
                  </strong>
                </p>

              </div>

              <button
                onClick={() => {
                  localStorage.setItem(
                    "selectedMandi",
                    JSON.stringify({
                      id: selectedMandi.id,
                      name: selectedMandi.name,
                      district:
                        selectedMandi.district,
                      state:
                        selectedMandi.state,
                      address:
                        selectedMandi.address,
                      phone:
                        selectedMandi.phone,
                      lat:
                        selectedMandi.lat,
                      lng:
                        selectedMandi.lng,
                      ratePerKg:
                        selectedMandi.ratePerKg,
                      crop: cropName,
                      quantity:
                        Number(quantity),
                      unit,
                      totalKg,
                      estimatedAmount:
                        selectedMandi.estimatedAmount,
                    })
                  );

                  setShowLogistics(true);
                }}
                className="rounded-lg bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
              >
                {t.continueLogistics}
              </button>

            </div>
          </div>
        )}

        {/* DEMO NOTE */}
        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          <strong>{t.demoNote}</strong>{" "}
          {t.staticDemoData}
        </div>

      </div>
    </div>
  );
}