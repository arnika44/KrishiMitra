"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useLanguage } from "../../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../../lib/language";

type LogisticsProvider = {
  id: string;
  name: string;
  vehicle: string;
  charge: number;
  phone: string;
  rating: number;
  capacity: string;
  estimatedTime: string;
};

type SelectedMandi = {
  id?: string;
  name?: string;
  district?: string;
  state?: string;
  address?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  crop?: string;
  quantity?: number;
  unit?: string;
  totalKg?: number;
  estimatedAmount?: number;
};

type FarmerProfile = {
  name?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  village?: string;
  district?: string;
  state?: string;
  pin?: string;
};

const logisticsProviders: LogisticsProvider[] = [
  {
    id: "log-1",
    name: "Sharma Transport",
    vehicle: "Mini Truck",
    charge: 2200,
    phone: "9876543210",
    rating: 4.7,
    capacity: "2–3 Ton",
    estimatedTime: "2–3 Hours",
  },
  {
    id: "log-2",
    name: "Kisan Logistics",
    vehicle: "Tractor",
    charge: 2500,
    phone: "9876543211",
    rating: 4.6,
    capacity: "3–4 Ton",
    estimatedTime: "2–4 Hours",
  },
  {
    id: "log-3",
    name: "Green Transport",
    vehicle: "Truck",
    charge: 2800,
    phone: "9876543212",
    rating: 4.8,
    capacity: "5–7 Ton",
    estimatedTime: "2–3 Hours",
  },
  {
    id: "log-4",
    name: "Bharat Logistics",
    vehicle: "Pickup",
    charge: 2400,
    phone: "9876543213",
    rating: 4.5,
    capacity: "1–2 Ton",
    estimatedTime: "2–4 Hours",
  },
  {
    id: "log-5",
    name: "FarmMove Transport",
    vehicle: "Heavy Pickup",
    charge: 2600,
    phone: "9876543214",
    rating: 4.6,
    capacity: "2–3 Ton",
    estimatedTime: "3–4 Hours",
  },
  {
    id: "log-6",
    name: "Agro Express",
    vehicle: "Truck",
    charge: 3000,
    phone: "9876543215",
    rating: 4.7,
    capacity: "5–8 Ton",
    estimatedTime: "2–3 Hours",
  },
  {
    id: "log-7",
    name: "Kisan Vahan Services",
    vehicle: "Pickup",
    charge: 2100,
    phone: "9876543216",
    rating: 4.4,
    capacity: "1–2 Ton",
    estimatedTime: "3–4 Hours",
  },
  {
    id: "log-8",
    name: "GreenField Movers",
    vehicle: "Mini Truck",
    charge: 2300,
    phone: "9876543217",
    rating: 4.5,
    capacity: "2–3 Ton",
    estimatedTime: "2–4 Hours",
  },
  {
    id: "log-9",
    name: "Agri Haulers",
    vehicle: "Truck",
    charge: 3200,
    phone: "9876543218",
    rating: 4.8,
    capacity: "6–8 Ton",
    estimatedTime: "2–3 Hours",
  },
  {
    id: "log-10",
    name: "Rural Transport Hub",
    vehicle: "Tractor",
    charge: 2000,
    phone: "9876543219",
    rating: 4.3,
    capacity: "2–3 Ton",
    estimatedTime: "3–5 Hours",
  },
  {
    id: "log-11",
    name: "FarmLink Logistics",
    vehicle: "Pickup",
    charge: 2350,
    phone: "9876543220",
    rating: 4.6,
    capacity: "1–2 Ton",
    estimatedTime: "2–4 Hours",
  },
  {
    id: "log-12",
    name: "Harvest Movers",
    vehicle: "Heavy Truck",
    charge: 3500,
    phone: "9876543221",
    rating: 4.7,
    capacity: "7–10 Ton",
    estimatedTime: "2–3 Hours",
  },
];

const text: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    selectedMandi: string;
    pickup: string;
    delivery: string;
    crop: string;
    quantity: string;
    estimatedValue: string;
    available: string;
    choose: string;
    selected: string;
    sendRequest: string;
    requestSent: string;
    charge: string;
    vehicle: string;
    capacity: string;
    rating: string;
    time: string;
    phone: string;
    noMandi: string;
    back: string;
    demo: string;
  }
> = {
  en: {
    title: "Logistics",
    subtitle: "Choose a transport provider for your selected mandi",
    selectedMandi: "Selected Mandi",
    pickup: "Pickup Location",
    delivery: "Delivery Location",
    crop: "Crop",
    quantity: "Quantity",
    estimatedValue: "Estimated Crop Value",
    available: "Available Logistics Providers",
    choose: "Choose",
    selected: "Selected",
    sendRequest: "Send Request",
    requestSent: "Request Sent",
    charge: "Transport Charge",
    vehicle: "Vehicle",
    capacity: "Capacity",
    rating: "Rating",
    time: "Estimated Time",
    phone: "Phone",
    noMandi: "No mandi has been selected yet.",
    back: "Back",
    demo: "Demo transport rates",
  },

  hi: {
    title: "लॉजिस्टिक्स",
    subtitle: "चयनित मंडी के लिए ट्रांसपोर्ट प्रोवाइडर चुनें",
    selectedMandi: "चयनित मंडी",
    pickup: "पिकअप स्थान",
    delivery: "डिलीवरी स्थान",
    crop: "फसल",
    quantity: "मात्रा",
    estimatedValue: "अनुमानित फसल मूल्य",
    available: "उपलब्ध लॉजिस्टिक्स प्रोवाइडर",
    choose: "चुनें",
    selected: "चयनित",
    sendRequest: "रिक्वेस्ट भेजें",
    requestSent: "रिक्वेस्ट भेज दी गई",
    charge: "ट्रांसपोर्ट चार्ज",
    vehicle: "वाहन",
    capacity: "क्षमता",
    rating: "रेटिंग",
    time: "अनुमानित समय",
    phone: "फोन",
    noMandi: "अभी कोई मंडी चयनित नहीं है।",
    back: "वापस",
    demo: "डेमो ट्रांसपोर्ट रेट",
  },

  mr: {
    title: "लॉजिस्टिक्स",
    subtitle: "निवडलेल्या मंडीसाठी ट्रान्सपोर्ट प्रोव्हायडर निवडा",
    selectedMandi: "निवडलेली मंडी",
    pickup: "पिकअप स्थान",
    delivery: "डिलिव्हरी स्थान",
    crop: "पीक",
    quantity: "प्रमाण",
    estimatedValue: "अंदाजे पीक मूल्य",
    available: "उपलब्ध लॉजिस्टिक्स प्रोव्हायडर",
    choose: "निवडा",
    selected: "निवडले",
    sendRequest: "विनंती पाठवा",
    requestSent: "विनंती पाठवली",
    charge: "ट्रान्सपोर्ट चार्ज",
    vehicle: "वाहन",
    capacity: "क्षमता",
    rating: "रेटिंग",
    time: "अंदाजे वेळ",
    phone: "फोन",
    noMandi: "अजून मंडी निवडलेली नाही.",
    back: "मागे",
    demo: "डेमो ट्रान्सपोर्ट रेट",
  },

  bn: {
    title: "লজিস্টিক্স",
    subtitle: "নির্বাচিত মান্ডির জন্য পরিবহন প্রদানকারী বেছে নিন",
    selectedMandi: "নির্বাচিত মান্ডি",
    pickup: "পিকআপ স্থান",
    delivery: "ডেলিভারি স্থান",
    crop: "ফসল",
    quantity: "পরিমাণ",
    estimatedValue: "আনুমানিক ফসলের মূল্য",
    available: "উপলব্ধ লজিস্টিক্স প্রদানকারী",
    choose: "নির্বাচন করুন",
    selected: "নির্বাচিত",
    sendRequest: "অনুরোধ পাঠান",
    requestSent: "অনুরোধ পাঠানো হয়েছে",
    charge: "পরিবহন চার্জ",
    vehicle: "যানবাহন",
    capacity: "ক্ষমতা",
    rating: "রেটিং",
    time: "আনুমানিক সময়",
    phone: "ফোন",
    noMandi: "এখনও কোনো মান্ডি নির্বাচন করা হয়নি।",
    back: "ফিরে যান",
    demo: "ডেমো পরিবহন রেট",
  },

  ta: {
    title: "லாஜிஸ்டிக்ஸ்",
    subtitle:
      "தேர்ந்தெடுத்த மண்டிக்கான போக்குவரத்து வழங்குநரை தேர்வு செய்யவும்",
    selectedMandi: "தேர்ந்தெடுத்த மண்டி",
    pickup: "பிக்கப் இடம்",
    delivery: "டெலிவரி இடம்",
    crop: "பயிர்",
    quantity: "அளவு",
    estimatedValue: "மதிப்பிடப்பட்ட பயிர் மதிப்பு",
    available: "கிடைக்கும் லாஜிஸ்டிக்ஸ் வழங்குநர்கள்",
    choose: "தேர்வு",
    selected: "தேர்ந்தெடுக்கப்பட்டது",
    sendRequest: "கோரிக்கை அனுப்பவும்",
    requestSent: "கோரிக்கை அனுப்பப்பட்டது",
    charge: "போக்குவரத்து கட்டணம்",
    vehicle: "வாகனம்",
    capacity: "திறன்",
    rating: "மதிப்பீடு",
    time: "மதிப்பிடப்பட்ட நேரம்",
    phone: "தொலைபேசி",
    noMandi: "மண்டி இன்னும் தேர்ந்தெடுக்கப்படவில்லை.",
    back: "பின்",
    demo: "டெமோ போக்குவரத்து விலை",
  },

  te: {
    title: "లాజిస్టిక్స్",
    subtitle: "ఎంచుకున్న మండీకి రవాణా ప్రొవైడర్‌ను ఎంచుకోండి",
    selectedMandi: "ఎంచుకున్న మండీ",
    pickup: "పికప్ స్థానం",
    delivery: "డెలివరీ స్థానం",
    crop: "పంట",
    quantity: "పరిమాణం",
    estimatedValue: "అంచనా పంట విలువ",
    available: "అందుబాటులో ఉన్న లాజిస్టిక్స్ ప్రొవైడర్లు",
    choose: "ఎంచుకోండి",
    selected: "ఎంచుకున్నారు",
    sendRequest: "రిక్వెస్ట్ పంపండి",
    requestSent: "రిక్వెస్ట్ పంపబడింది",
    charge: "రవాణా ఛార్జ్",
    vehicle: "వాహనం",
    capacity: "సామర్థ్యం",
    rating: "రేటింగ్",
    time: "అంచనా సమయం",
    phone: "ఫోన్",
    noMandi: "ఇంకా మండీ ఎంచుకోలేదు.",
    back: "వెనుకకు",
    demo: "డెమో రవాణా రేటు",
  },

  gu: {
    title: "લોજિસ્ટિક્સ",
    subtitle: "પસંદ કરેલી મંડી માટે ટ્રાન્સપોર્ટ પ્રોવાઇડર પસંદ કરો",
    selectedMandi: "પસંદ કરેલી મંડી",
    pickup: "પિકઅપ સ્થાન",
    delivery: "ડિલિવરી સ્થાન",
    crop: "પાક",
    quantity: "જથ્થો",
    estimatedValue: "અંદાજિત પાક મૂલ્ય",
    available: "ઉપલબ્ધ લોજિસ્ટિક્સ પ્રોવાઇડર્સ",
    choose: "પસંદ કરો",
    selected: "પસંદ કરેલ",
    sendRequest: "રિક્વેસ્ટ મોકલો",
    requestSent: "રિક્વેસ્ટ મોકલવામાં આવી",
    charge: "ટ્રાન્સપોર્ટ ચાર્જ",
    vehicle: "વાહન",
    capacity: "ક્ષમતા",
    rating: "રેટિંગ",
    time: "અંદાજિત સમય",
    phone: "ફોન",
    noMandi: "હજુ સુધી મંડી પસંદ કરવામાં આવી નથી.",
    back: "પાછળ",
    demo: "ડેમો ટ્રાન્સપોર્ટ રેટ",
  },

  kn: {
    title: "ಲಾಜಿಸ್ಟಿಕ್ಸ್",
    subtitle: "ಆಯ್ಕೆ ಮಾಡಿದ ಮಂಡಿಗೆ ಸಾರಿಗೆ ಪೂರೈಕೆದಾರರನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    selectedMandi: "ಆಯ್ಕೆ ಮಾಡಿದ ಮಂಡಿ",
    pickup: "ಪಿಕಪ್ ಸ್ಥಳ",
    delivery: "ಡೆಲಿವರಿ ಸ್ಥಳ",
    crop: "ಬೆಳೆ",
    quantity: "ಪ್ರಮಾಣ",
    estimatedValue: "ಅಂದಾಜು ಬೆಳೆ ಮೌಲ್ಯ",
    available: "ಲಭ್ಯವಿರುವ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪೂರೈಕೆದಾರರು",
    choose: "ಆಯ್ಕೆಮಾಡಿ",
    selected: "ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ",
    sendRequest: "ವಿನಂತಿ ಕಳುಹಿಸಿ",
    requestSent: "ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ",
    charge: "ಸಾರಿಗೆ ಶುಲ್ಕ",
    vehicle: "ವಾಹನ",
    capacity: "ಸಾಮರ್ಥ್ಯ",
    rating: "ರೇಟಿಂಗ್",
    time: "ಅಂದಾಜು ಸಮಯ",
    phone: "ಫೋನ್",
    noMandi: "ಇನ್ನೂ ಮಂಡಿ ಆಯ್ಕೆ ಮಾಡಲಾಗಿಲ್ಲ.",
    back: "ಹಿಂದೆ",
    demo: "ಡೆಮೋ ಸಾರಿಗೆ ದರ",
  },

  ml: {
    title: "ലോജിസ്റ്റിക്സ്",
    subtitle:
      "തിരഞ്ഞെടുത്ത മണ്ഡിക്കായി ഗതാഗത സേവനദാതാവിനെ തിരഞ്ഞെടുക്കുക",
    selectedMandi: "തിരഞ്ഞെടുത്ത മണ്ഡി",
    pickup: "പിക്കപ്പ് സ്ഥലം",
    delivery: "ഡെലിവറി സ്ഥലം",
    crop: "വിള",
    quantity: "അളവ്",
    estimatedValue: "അനുമാനിച്ച വിള മൂല്യം",
    available: "ലഭ്യമായ ലോജിസ്റ്റിക്സ് സേവനദാതാക്കൾ",
    choose: "തിരഞ്ഞെടുക്കുക",
    selected: "തിരഞ്ഞെടുത്തു",
    sendRequest: "അഭ്യർത്ഥന അയയ്ക്കുക",
    requestSent: "അഭ്യർത്ഥന അയച്ചു",
    charge: "ഗതാഗത ചാർജ്",
    vehicle: "വാഹനം",
    capacity: "ശേഷി",
    rating: "റേറ്റിംഗ്",
    time: "അനുമാനിച്ച സമയം",
    phone: "ഫോൺ",
    noMandi: "ഇതുവരെ മണ്ഡി തിരഞ്ഞെടുത്തിട്ടില്ല.",
    back: "തിരികെ",
    demo: "ഡെമോ ഗതാഗത നിരക്ക്",
  },

  pa: {
    title: "ਲੌਜਿਸਟਿਕਸ",
    subtitle: "ਚੁਣੀ ਹੋਈ ਮੰਡੀ ਲਈ ਟ੍ਰਾਂਸਪੋਰਟ ਪ੍ਰੋਵਾਈਡਰ ਚੁਣੋ",
    selectedMandi: "ਚੁਣੀ ਹੋਈ ਮੰਡੀ",
    pickup: "ਪਿਕਅੱਪ ਸਥਾਨ",
    delivery: "ਡਿਲੀਵਰੀ ਸਥਾਨ",
    crop: "ਫਸਲ",
    quantity: "ਮਾਤਰਾ",
    estimatedValue: "ਅਨੁਮਾਨਿਤ ਫਸਲ ਮੁੱਲ",
    available: "ਉਪਲਬਧ ਲੌਜਿਸਟਿਕਸ ਪ੍ਰੋਵਾਈਡਰ",
    choose: "ਚੁਣੋ",
    selected: "ਚੁਣਿਆ",
    sendRequest: "ਬੇਨਤੀ ਭੇਜੋ",
    requestSent: "ਬੇਨਤੀ ਭੇਜੀ ਗਈ",
    charge: "ਟ੍ਰਾਂਸਪੋਰਟ ਚਾਰਜ",
    vehicle: "ਵਾਹਨ",
    capacity: "ਸਮਰੱਥਾ",
    rating: "ਰੇਟਿੰਗ",
    time: "ਅਨੁਮਾਨਿਤ ਸਮਾਂ",
    phone: "ਫੋਨ",
    noMandi: "ਅਜੇ ਤੱਕ ਕੋਈ ਮੰਡੀ ਨਹੀਂ ਚੁਣੀ ਗਈ।",
    back: "ਵਾਪਸ",
    demo: "ਡੈਮੋ ਟ੍ਰਾਂਸਪੋਰਟ ਰੇਟ",
  },

  or: {
    title: "ଲଜିଷ୍ଟିକ୍ସ",
    subtitle:
      "ଚୟନ କରାଯାଇଥିବା ମଣ୍ଡି ପାଇଁ ପରିବହନ ପ୍ରଦାନକାରୀ ବାଛନ୍ତୁ",
    selectedMandi: "ଚୟନିତ ମଣ୍ଡି",
    pickup: "ପିକଅପ୍ ସ୍ଥାନ",
    delivery: "ଡେଲିଭରି ସ୍ଥାନ",
    crop: "ଫସଲ",
    quantity: "ପରିମାଣ",
    estimatedValue: "ଆନୁମାନିକ ଫସଲ ମୂଲ୍ୟ",
    available: "ଉପଲବ୍ଧ ଲଜିଷ୍ଟିକ୍ସ ପ୍ରଦାନକାରୀ",
    choose: "ବାଛନ୍ତୁ",
    selected: "ଚୟନିତ",
    sendRequest: "ଅନୁରୋଧ ପଠାନ୍ତୁ",
    requestSent: "ଅନୁରୋଧ ପଠାଯାଇଛି",
    charge: "ପରିବହନ ଚାର୍ଜ",
    vehicle: "ଯାନ",
    capacity: "କ୍ଷମତା",
    rating: "ରେଟିଂ",
    time: "ଆନୁମାନିକ ସମୟ",
    phone: "ଫୋନ",
    noMandi: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ମଣ୍ଡି ଚୟନ କରାଯାଇନାହିଁ।",
    back: "ପଛକୁ",
    demo: "ଡେମୋ ପରିବହନ ହାର",
  },

  as: {
    title: "লজিষ্টিক্স",
    subtitle: "নিৰ্বাচিত মাণ্ডিৰ বাবে পৰিবহণ সেৱা বাছনি কৰক",
    selectedMandi: "নিৰ্বাচিত মাণ্ডি",
    pickup: "পিকআপ স্থান",
    delivery: "ডেলিভাৰী স্থান",
    crop: "শস্য",
    quantity: "পৰিমাণ",
    estimatedValue: "আনুমানিক শস্য মূল্য",
    available: "উপলব্ধ লজিষ্টিক্স সেৱা",
    choose: "বাছনি কৰক",
    selected: "নিৰ্বাচিত",
    sendRequest: "অনুৰোধ পঠিয়াওক",
    requestSent: "অনুৰোধ পঠিওৱা হৈছে",
    charge: "পৰিবহণ মাচুল",
    vehicle: "যান",
    capacity: "ক্ষমতা",
    rating: "ৰেটিং",
    time: "আনুমানিক সময়",
    phone: "ফোন",
    noMandi: "এতিয়ালৈ কোনো মাণ্ডি নিৰ্বাচন কৰা হোৱা নাই।",
    back: "পিছলৈ",
    demo: "ডেমো পৰিবহণ হাৰ",
  },

  ur: {
    title: "لاجسٹکس",
    subtitle: "منتخب منڈی کے لیے ٹرانسپورٹ فراہم کنندہ منتخب کریں",
    selectedMandi: "منتخب منڈی",
    pickup: "پک اپ مقام",
    delivery: "ڈیلیوری مقام",
    crop: "فصل",
    quantity: "مقدار",
    estimatedValue: "متوقع فصل کی قیمت",
    available: "دستیاب لاجسٹکس فراہم کنندگان",
    choose: "منتخب کریں",
    selected: "منتخب شدہ",
    sendRequest: "درخواست بھیجیں",
    requestSent: "درخواست بھیج دی گئی",
    charge: "ٹرانسپورٹ چارج",
    vehicle: "گاڑی",
    capacity: "صلاحیت",
    rating: "ریٹنگ",
    time: "متوقع وقت",
    phone: "فون",
    noMandi: "ابھی تک کوئی منڈی منتخب نہیں کی گئی۔",
    back: "واپس",
    demo: "ڈیمو ٹرانسپورٹ ریٹ",
  },
};

export default function LogisticsPage() {
  const router = useRouter();
  const params = useParams();
  const { language } = useLanguage();

  const [selectedMandi, setSelectedMandi] =
    useState<SelectedMandi | null>(null);

  const [farmerProfile, setFarmerProfile] =
    useState<FarmerProfile | null>(null);

  const [selectedProvider, setSelectedProvider] =
    useState<string | null>(null);

  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    try {
      const mandiData = localStorage.getItem("selectedMandi");

      if (mandiData) {
        setSelectedMandi(JSON.parse(mandiData));
      }

      const profileData = localStorage.getItem("farmerProfile");

      if (profileData) {
        setFarmerProfile(JSON.parse(profileData));
      }
    } catch (error) {
      console.error("Failed to load logistics data:", error);
    }
  }, [params]);

  const currentText = text[language] || text.en;

  const farmerLocation = useMemo(() => {
    if (!farmerProfile) return "Farmer Location";

    return [
      farmerProfile.address,
      farmerProfile.village,
      farmerProfile.district,
      farmerProfile.state,
      farmerProfile.pin,
    ]
      .filter(Boolean)
      .join(", ");
  }, [farmerProfile]);

  const cropName = selectedMandi?.crop || "Wheat";

  const quantity =
    selectedMandi?.quantity !== undefined
      ? `${selectedMandi.quantity} ${selectedMandi.unit || "KG"}`
      : selectedMandi?.totalKg
        ? `${selectedMandi.totalKg} KG`
        : "—";

  const handleSendRequest = (provider: LogisticsProvider) => {
    if (!selectedMandi || requestSent) return;

    const deliveryAddress =
      selectedMandi.address ||
      `${selectedMandi.district || ""}, ${selectedMandi.state || ""}`;

    const request = {
      id: `logistics-request-${Date.now()}`,

      providerId: provider.id,
      providerName: provider.name,
      vehicle: provider.vehicle,
      providerPhone: provider.phone,
      transportCharge: provider.charge,
      providerRating: provider.rating,
      providerCapacity: provider.capacity,
      estimatedTime: provider.estimatedTime,

      farmerName:
        farmerProfile?.fullName ||
        farmerProfile?.name ||
        "Farmer",

      farmerPhone: farmerProfile?.phone || "",

      farmerLocation,

      farmerPickupAddress:
        farmerProfile?.address ||
        [
          farmerProfile?.village,
          farmerProfile?.district,
          farmerProfile?.state,
          farmerProfile?.pin,
        ]
          .filter(Boolean)
          .join(", "),

      mandiId: selectedMandi.id || "",
      mandiName: selectedMandi.name || "",
      mandiDistrict: selectedMandi.district || "",
      mandiState: selectedMandi.state || "",

      mandiAddress: deliveryAddress,

      deliveryAddress,

      mandiLat: selectedMandi.lat,
      mandiLng: selectedMandi.lng,

      crop: cropName,
      quantity,
      quantityValue: selectedMandi.quantity || 0,
      quantityUnit: selectedMandi.unit || "KG",
      totalKg: selectedMandi.totalKg || 0,

      estimatedAmount:
        selectedMandi.estimatedAmount || 0,

      status: "pending",
      logisticsStatus: "request_sent",

      createdAt: new Date().toISOString(),
    };

    try {
      const existingRequests = JSON.parse(
        localStorage.getItem("logisticsRequests") || "[]",
      );

      const updatedRequests = [
        ...existingRequests.filter(
          (item: {
            providerId?: string;
            mandiId?: string;
          }) =>
            !(
              item.mandiId === selectedMandi.id
            ),
        ),
        request,
      ];

      localStorage.setItem(
        "logisticsRequests",
        JSON.stringify(updatedRequests),
      );

      localStorage.setItem(
        "selectedLogisticsProvider",
        JSON.stringify(request),
      );

      setSelectedProvider(provider.id);
      setRequestSent(true);
    } catch (error) {
      console.error(
        "Failed to send logistics request:",
        error,
      );
    }
  };

  return (
    <main
      className="min-h-screen bg-slate-50"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-green-700">
              🚚 {currentText.title}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {currentText.subtitle}
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            ← {currentText.back}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">

        {/* SELECTED MANDI */}
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              📍 {currentText.selectedMandi}
            </h2>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              {currentText.demo}
            </span>
          </div>

          {!selectedMandi ? (
            <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
              {currentText.noMandi}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">

              {/* DELIVERY */}
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs font-medium text-green-700">
                  {currentText.delivery}
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {selectedMandi.name || "Selected Mandi"}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {selectedMandi.address ||
                    `${selectedMandi.district || ""}, ${
                      selectedMandi.state || ""
                    }`}
                </p>
              </div>

              {/* PICKUP */}
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-700">
                  {currentText.pickup}
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {farmerProfile?.fullName ||
                    farmerProfile?.name ||
                    "Farmer"}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {farmerLocation}
                </p>
              </div>

              {/* CROP */}
              <div className="rounded-xl border p-4">
                <p className="text-xs text-gray-500">
                  {currentText.crop}
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {cropName}
                </p>
              </div>

              {/* QUANTITY */}
              <div className="rounded-xl border p-4">
                <p className="text-xs text-gray-500">
                  {currentText.quantity}
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {quantity}
                </p>
              </div>

            </div>
          )}
        </section>

        {/* PROVIDERS */}
        {selectedMandi && (
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                🚛 {currentText.available}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select one logistics provider. Your request will be sent only
                to the provider you choose.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {logisticsProviders.map((provider) => {
                const isSelected =
                  selectedProvider === provider.id;

                const anotherProviderAlreadySelected =
                  requestSent &&
                  selectedProvider !== provider.id;

                return (
                  <div
                    key={provider.id}
                    className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                      isSelected
                        ? "border-green-500 ring-2 ring-green-100"
                        : "hover:-translate-y-1 hover:shadow-md"
                    }`}
                  >

                    {/* PROVIDER NAME */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {provider.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          🚚 {provider.vehicle}
                        </p>
                      </div>

                      <div className="rounded-lg bg-yellow-50 px-2 py-1 text-sm font-semibold text-yellow-700">
                        ⭐ {provider.rating}
                      </div>
                    </div>

                    {/* TRANSPORT CHARGE */}
                    <div className="mt-5 rounded-xl bg-green-50 p-4">
                      <p className="text-xs text-green-700">
                        {currentText.charge}
                      </p>

                      <p className="mt-1 text-2xl font-bold text-green-700">
                        ₹{provider.charge.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* DETAILS */}
                    <div className="mt-4 space-y-2 text-sm text-gray-600">

                      <div className="flex justify-between">
                        <span>
                          {currentText.vehicle}
                        </span>

                        <span className="font-medium text-gray-900">
                          {provider.vehicle}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>
                          {currentText.capacity}
                        </span>

                        <span className="font-medium text-gray-900">
                          {provider.capacity}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>
                          {currentText.time}
                        </span>

                        <span className="font-medium text-gray-900">
                          {provider.estimatedTime}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>
                          {currentText.phone}
                        </span>

                        <span className="font-medium text-gray-900">
                          {provider.phone}
                        </span>
                      </div>

                    </div>

                    {/* SELECT PROVIDER */}
                    <button
                      onClick={() =>
                        handleSendRequest(provider)
                      }
                      disabled={
                        isSelected ||
                        anotherProviderAlreadySelected
                      }
                      className={`mt-5 w-full rounded-xl px-4 py-3 font-semibold transition ${
                        isSelected
                          ? "cursor-default bg-green-100 text-green-700"
                          : anotherProviderAlreadySelected
                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                            : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {isSelected
                        ? `✓ ${currentText.requestSent}`
                        : `${currentText.choose} →`}
                    </button>

                  </div>
                );
              })}

            </div>
          </section>
        )}

        {/* REQUEST SUCCESS */}
        {requestSent && selectedProvider && (
          <section className="rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-start gap-3">

              <div className="text-2xl">
                ✅
              </div>

              <div>
                <h3 className="font-bold text-green-800">
                  {currentText.requestSent}
                </h3>

                <p className="mt-1 text-sm text-green-700">
                  Your selected logistics provider has received the request.
                  The provider can now accept or reject it from the Logistics
                  Dashboard.
                </p>

              </div>

            </div>
          </section>
        )}

      </div>
    </main>
  );
}