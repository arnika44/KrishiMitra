"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../lib/LanguageProvider";
import type { LanguageCode } from "../../lib/language";

type LogisticsProvider = {
  id: string;
  name: string;
  vehicleType: string;
  charge: number;
  phone: string;
  rating: number;
  eta: string;
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
  village?: string;
  district?: string;
  state?: string;
  pin?: string;
};

type BuyRequest = {
  id: string;
  buyerName?: string;
  farmerName?: string;
  crop?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  buyerLocation?: string;
  farmerLocation?: string;
  status?: string;
  logisticsReady?: boolean;
};

type WasteBuyRequest = {
  id: string;
  wasteListingId?: string;
  processorName?: string;
  farmerName?: string;
  wasteType?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  farmerLocation?: string;
  processorLocation?: string;
  status?: string;
  logisticsReady?: boolean;
};

type TransportRequest = {
  id: string;
  sourceType: "mandi" | "buyer" | "processor";

  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;

  destinationName: string;
  destinationLocation: string;

  crop?: string;
  quantity?: number;
  unit?: string;

  wasteType?: string;

  providerId: string;
  providerName: string;
  vehicleType: string;
  transportCharge: number;
  providerPhone: string;

  status: "pending";
  createdAt: string;
};

const providers: LogisticsProvider[] = [
  {
    id: "logistics-1",
    name: "Sharma Transport",
    vehicleType: "Mini Truck",
    charge: 2200,
    phone: "9876543210",
    rating: 4.7,
    eta: "30–45 min",
  },
  {
    id: "logistics-2",
    name: "Kisan Logistics",
    vehicleType: "Tractor",
    charge: 2500,
    phone: "9876543211",
    rating: 4.6,
    eta: "40–55 min",
  },
  {
    id: "logistics-3",
    name: "Green Transport",
    vehicleType: "Truck",
    charge: 2800,
    phone: "9876543212",
    rating: 4.8,
    eta: "35–50 min",
  },
  {
    id: "logistics-4",
    name: "Bharat Agro Logistics",
    vehicleType: "Pickup",
    charge: 1900,
    phone: "9876543213",
    rating: 4.5,
    eta: "45–60 min",
  },
  {
    id: "logistics-5",
    name: "Kisan Seva Transport",
    vehicleType: "Mini Truck",
    charge: 2400,
    phone: "9876543214",
    rating: 4.7,
    eta: "30–50 min",
  },
  {
    id: "logistics-6",
    name: "FarmMove Logistics",
    vehicleType: "Truck",
    charge: 3000,
    phone: "9876543215",
    rating: 4.9,
    eta: "40–55 min",
  },
];

const text: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    back: string;
    pickup: string;
    destination: string;
    farmerLocation: string;
    selectTransport: string;
    chooseProvider: string;
    vehicle: string;
    charge: string;
    rating: string;
    eta: string;
    select: string;
    selected: string;
    sendRequest: string;
    requestSent: string;
    requestInfo: string;
    mandi: string;
    buyer: string;
    processor: string;
    crop: string;
    quantity: string;
    waste: string;
    noDestination: string;
    noProfile: string;
    transportCharge: string;
    pending: string;
    requestTo: string;
    confirm: string;
  }
> = {
  en: {
    title: "Logistics",
    subtitle: "Choose a transport provider for your delivery",
    back: "Back",
    pickup: "Pickup",
    destination: "Destination",
    farmerLocation: "Farmer Location",
    selectTransport: "Available Transport Providers",
    chooseProvider: "Choose one logistics provider",
    vehicle: "Vehicle",
    charge: "Transport Charge",
    rating: "Rating",
    eta: "Estimated Arrival",
    select: "Select",
    selected: "Selected",
    sendRequest: "Send Transport Request",
    requestSent: "Request Sent",
    requestInfo:
      "Your request will be sent only to the selected logistics provider.",
    mandi: "Mandi",
    buyer: "Buyer",
    processor: "Processor",
    crop: "Crop",
    quantity: "Quantity",
    waste: "Waste",
    noDestination: "No destination selected yet.",
    noProfile: "Farmer profile not found.",
    transportCharge: "Transport Charge",
    pending: "Pending",
    requestTo: "Request sent to",
    confirm: "Confirm",
  },

  hi: {
    title: "लॉजिस्टिक्स",
    subtitle: "डिलीवरी के लिए ट्रांसपोर्ट प्रोवाइडर चुनें",
    back: "वापस",
    pickup: "पिकअप",
    destination: "गंतव्य",
    farmerLocation: "किसान का स्थान",
    selectTransport: "उपलब्ध ट्रांसपोर्ट प्रोवाइडर",
    chooseProvider: "एक लॉजिस्टिक्स प्रोवाइडर चुनें",
    vehicle: "वाहन",
    charge: "ट्रांसपोर्ट शुल्क",
    rating: "रेटिंग",
    eta: "अनुमानित आगमन",
    select: "चुनें",
    selected: "चयनित",
    sendRequest: "ट्रांसपोर्ट रिक्वेस्ट भेजें",
    requestSent: "रिक्वेस्ट भेज दी गई",
    requestInfo:
      "आपकी रिक्वेस्ट केवल चुने गए लॉजिस्टिक्स प्रोवाइडर को भेजी जाएगी।",
    mandi: "मंडी",
    buyer: "खरीदार",
    processor: "प्रोसेसर",
    crop: "फसल",
    quantity: "मात्रा",
    waste: "कृषि अपशिष्ट",
    noDestination: "अभी कोई गंतव्य चयनित नहीं है।",
    noProfile: "किसान प्रोफाइल नहीं मिली।",
    transportCharge: "ट्रांसपोर्ट शुल्क",
    pending: "पेंडिंग",
    requestTo: "रिक्वेस्ट भेजी गई",
    confirm: "कन्फर्म",
  },

  bn: {
    title: "লজিস্টিক্স",
    subtitle: "ডেলিভারির জন্য একটি পরিবহন প্রদানকারী নির্বাচন করুন",
    back: "ফিরে যান",
    pickup: "পিকআপ",
    destination: "গন্তব্য",
    farmerLocation: "কৃষকের অবস্থান",
    selectTransport: "উপলব্ধ পরিবহন প্রদানকারী",
    chooseProvider: "একজন লজিস্টিক্স প্রদানকারী নির্বাচন করুন",
    vehicle: "যানবাহন",
    charge: "পরিবহন চার্জ",
    rating: "রেটিং",
    eta: "আনুমানিক আগমন",
    select: "নির্বাচন",
    selected: "নির্বাচিত",
    sendRequest: "পরিবহন অনুরোধ পাঠান",
    requestSent: "অনুরোধ পাঠানো হয়েছে",
    requestInfo: "আপনার অনুরোধ শুধুমাত্র নির্বাচিত প্রদানকারীর কাছে যাবে।",
    mandi: "মন্ডি",
    buyer: "ক্রেতা",
    processor: "প্রসেসর",
    crop: "ফসল",
    quantity: "পরিমাণ",
    waste: "কৃষি বর্জ্য",
    noDestination: "কোনও গন্তব্য নির্বাচন করা হয়নি।",
    noProfile: "কৃষকের প্রোফাইল পাওয়া যায়নি।",
    transportCharge: "পরিবহন চার্জ",
    pending: "অপেক্ষমাণ",
    requestTo: "অনুরোধ পাঠানো হয়েছে",
    confirm: "নিশ্চিত",
  },

  mr: {
    title: "लॉजिस्टिक्स",
    subtitle: "डिलिव्हरीसाठी ट्रान्सपोर्ट प्रोव्हायडर निवडा",
    back: "मागे",
    pickup: "पिकअप",
    destination: "गंतव्य",
    farmerLocation: "शेतकऱ्याचे ठिकाण",
    selectTransport: "उपलब्ध ट्रान्सपोर्ट प्रोव्हायडर",
    chooseProvider: "एक लॉजिस्टिक्स प्रोव्हायडर निवडा",
    vehicle: "वाहन",
    charge: "ट्रान्सपोर्ट शुल्क",
    rating: "रेटिंग",
    eta: "अंदाजे आगमन",
    select: "निवडा",
    selected: "निवडले",
    sendRequest: "ट्रान्सपोर्ट रिक्वेस्ट पाठवा",
    requestSent: "रिक्वेस्ट पाठवली",
    requestInfo: "तुमची रिक्वेस्ट फक्त निवडलेल्या प्रोव्हायडरकडे जाईल.",
    mandi: "मंडी",
    buyer: "खरेदीदार",
    processor: "प्रोसेसर",
    crop: "पीक",
    quantity: "प्रमाण",
    waste: "कृषी कचरा",
    noDestination: "गंतव्य निवडलेले नाही.",
    noProfile: "शेतकरी प्रोफाइल सापडली नाही.",
    transportCharge: "ट्रान्सपोर्ट शुल्क",
    pending: "प्रलंबित",
    requestTo: "रिक्वेस्ट पाठवली",
    confirm: "कन्फर्म",
  },

  ta: {
    title: "லாஜிஸ்டிக்ஸ்",
    subtitle: "டெலிவரிக்கான போக்குவரத்து வழங்குநரை தேர்வு செய்யவும்",
    back: "பின்",
    pickup: "பிக்கப்",
    destination: "இலக்கு",
    farmerLocation: "விவசாயி இடம்",
    selectTransport: "கிடைக்கும் போக்குவரத்து வழங்குநர்கள்",
    chooseProvider: "ஒரு லாஜிஸ்டிக்ஸ் வழங்குநரை தேர்வு செய்யவும்",
    vehicle: "வாகனம்",
    charge: "போக்குவரத்து கட்டணம்",
    rating: "மதிப்பீடு",
    eta: "வருகை நேரம்",
    select: "தேர்வு",
    selected: "தேர்ந்தெடுக்கப்பட்டது",
    sendRequest: "போக்குவரத்து கோரிக்கை அனுப்பவும்",
    requestSent: "கோரிக்கை அனுப்பப்பட்டது",
    requestInfo: "உங்கள் கோரிக்கை தேர்ந்தெடுத்த வழங்குநருக்கு மட்டுமே செல்லும்.",
    mandi: "மண்டி",
    buyer: "வாங்குபவர்",
    processor: "செயலாக்குநர்",
    crop: "பயிர்",
    quantity: "அளவு",
    waste: "விவசாய கழிவு",
    noDestination: "இலக்கு தேர்வு செய்யப்படவில்லை.",
    noProfile: "விவசாயி சுயவிவரம் கிடைக்கவில்லை.",
    transportCharge: "போக்குவரத்து கட்டணம்",
    pending: "நிலுவையில்",
    requestTo: "கோரிக்கை அனுப்பப்பட்டது",
    confirm: "உறுதிப்படுத்து",
  },

  te: {
    title: "లాజిస్టిక్స్",
    subtitle: "డెలివరీ కోసం రవాణా ప్రొవైడర్‌ను ఎంచుకోండి",
    back: "వెనుకకు",
    pickup: "పికప్",
    destination: "గమ్యం",
    farmerLocation: "రైతు స్థానం",
    selectTransport: "అందుబాటులో ఉన్న రవాణా ప్రొవైడర్లు",
    chooseProvider: "ఒక లాజిస్టిక్స్ ప్రొవైడర్‌ను ఎంచుకోండి",
    vehicle: "వాహనం",
    charge: "రవాణా ఛార్జ్",
    rating: "రేటింగ్",
    eta: "అంచనా రాక",
    select: "ఎంచుకోండి",
    selected: "ఎంచుకున్నారు",
    sendRequest: "రవాణా అభ్యర్థన పంపండి",
    requestSent: "అభ్యర్థన పంపబడింది",
    requestInfo: "మీ అభ్యర్థన ఎంపిక చేసిన ప్రొవైడర్‌కు మాత్రమే వెళ్తుంది.",
    mandi: "మండి",
    buyer: "కొనుగోలుదారు",
    processor: "ప్రాసెసర్",
    crop: "పంట",
    quantity: "పరిమాణం",
    waste: "వ్యవసాయ వ్యర్థాలు",
    noDestination: "గమ్యం ఎంచుకోలేదు.",
    noProfile: "రైతు ప్రొఫైల్ కనుగొనబడలేదు.",
    transportCharge: "రవాణా ఛార్జ్",
    pending: "పెండింగ్",
    requestTo: "అభ్యర్థన పంపబడింది",
    confirm: "నిర్ధారించండి",
  },

  gu: {
    title: "લોજિસ્ટિક્સ",
    subtitle: "ડિલિવરી માટે ટ્રાન્સપોર્ટ પ્રોવાઇડર પસંદ કરો",
    back: "પાછા",
    pickup: "પિકઅપ",
    destination: "ગંતવ્ય",
    farmerLocation: "ખેડૂતનું સ્થાન",
    selectTransport: "ઉપલબ્ધ ટ્રાન્સપોર્ટ પ્રોવાઇડર્સ",
    chooseProvider: "એક લોજિસ્ટિક્સ પ્રોવાઇડર પસંદ કરો",
    vehicle: "વાહન",
    charge: "ટ્રાન્સપોર્ટ ચાર્જ",
    rating: "રેટિંગ",
    eta: "અંદાજિત આગમન",
    select: "પસંદ કરો",
    selected: "પસંદ કરેલ",
    sendRequest: "ટ્રાન્સપોર્ટ રિક્વેસ્ટ મોકલો",
    requestSent: "રિક્વેસ્ટ મોકલવામાં આવી",
    requestInfo: "તમારી રિક્વેસ્ટ માત્ર પસંદ કરેલા પ્રોવાઇડરને જશે.",
    mandi: "મંડી",
    buyer: "ખરીદદાર",
    processor: "પ્રોસેસર",
    crop: "પાક",
    quantity: "જથ્થો",
    waste: "કૃષિ કચરો",
    noDestination: "કોઈ ગંતવ્ય પસંદ કરેલ નથી.",
    noProfile: "ખેડૂત પ્રોફાઇલ મળી નથી.",
    transportCharge: "ટ્રાન્સપોર્ટ ચાર્જ",
    pending: "પેન્ડિંગ",
    requestTo: "રિક્વેસ્ટ મોકલાઈ",
    confirm: "કન્ફર્મ",
  },

  kn: {
    title: "ಲಾಜಿಸ್ಟಿಕ್ಸ್",
    subtitle: "ವಿತರಣೆಗೆ ಸಾರಿಗೆ ಪೂರೈಕೆದಾರರನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    back: "ಹಿಂದೆ",
    pickup: "ಪಿಕಪ್",
    destination: "ಗಮ್ಯಸ್ಥಾನ",
    farmerLocation: "ರೈತರ ಸ್ಥಳ",
    selectTransport: "ಲಭ್ಯವಿರುವ ಸಾರಿಗೆ ಪೂರೈಕೆದಾರರು",
    chooseProvider: "ಒಬ್ಬ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪೂರೈಕೆದಾರರನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    vehicle: "ವಾಹನ",
    charge: "ಸಾರಿಗೆ ಶುಲ್ಕ",
    rating: "ರೇಟಿಂಗ್",
    eta: "ಅಂದಾಜು ಆಗಮನ",
    select: "ಆಯ್ಕೆ",
    selected: "ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ",
    sendRequest: "ಸಾರಿಗೆ ವಿನಂತಿ ಕಳುಹಿಸಿ",
    requestSent: "ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ",
    requestInfo: "ನಿಮ್ಮ ವಿನಂತಿ ಆಯ್ಕೆ ಮಾಡಿದ ಪೂರೈಕೆದಾರರಿಗೆ ಮಾತ್ರ ಹೋಗುತ್ತದೆ.",
    mandi: "ಮಂಡಿ",
    buyer: "ಖರೀದಿದಾರ",
    processor: "ಪ್ರೊಸೆಸರ್",
    crop: "ಬೆಳೆ",
    quantity: "ಪ್ರಮಾಣ",
    waste: "ಕೃಷಿ ತ್ಯಾಜ್ಯ",
    noDestination: "ಯಾವುದೇ ಗಮ್ಯಸ್ಥಾನ ಆಯ್ಕೆ ಮಾಡಿಲ್ಲ.",
    noProfile: "ರೈತರ ಪ್ರೊಫೈಲ್ ಕಂಡುಬಂದಿಲ್ಲ.",
    transportCharge: "ಸಾರಿಗೆ ಶುಲ್ಕ",
    pending: "ಬಾಕಿ",
    requestTo: "ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ",
    confirm: "ದೃಢೀಕರಿಸಿ",
  },

  ml: {
    title: "ലോജിസ്റ്റിക്സ്",
    subtitle: "ഡെലിവറിക്കായി ഒരു ട്രാൻസ്പോർട്ട് പ്രൊവൈഡറെ തിരഞ്ഞെടുക്കുക",
    back: "തിരികെ",
    pickup: "പിക്കപ്പ്",
    destination: "ലക്ഷ്യസ്ഥാനം",
    farmerLocation: "കർഷകന്റെ സ്ഥലം",
    selectTransport: "ലഭ്യമായ ട്രാൻസ്പോർട്ട് പ്രൊവൈഡർമാർ",
    chooseProvider: "ഒരു ലോജിസ്റ്റിക്സ് പ്രൊവൈഡറെ തിരഞ്ഞെടുക്കുക",
    vehicle: "വാഹനം",
    charge: "ട്രാൻസ്പോർട്ട് ചാർജ്",
    rating: "റേറ്റിംഗ്",
    eta: "പ്രതീക്ഷിക്കുന്ന വരവ്",
    select: "തിരഞ്ഞെടുക്കുക",
    selected: "തിരഞ്ഞെടുത്തു",
    sendRequest: "ട്രാൻസ്പോർട്ട് അഭ്യർത്ഥന അയയ്ക്കുക",
    requestSent: "അഭ്യർത്ഥന അയച്ചു",
    requestInfo: "നിങ്ങളുടെ അഭ്യർത്ഥന തിരഞ്ഞെടുത്ത പ്രൊവൈഡറിലേക്ക് മാത്രം പോകും.",
    mandi: "മണ്ടി",
    buyer: "വാങ്ങുന്നയാൾ",
    processor: "പ്രോസസർ",
    crop: "വിള",
    quantity: "അളവ്",
    waste: "കാർഷിക മാലിന്യം",
    noDestination: "ലക്ഷ്യസ്ഥാനം തിരഞ്ഞെടുത്തിട്ടില്ല.",
    noProfile: "കർഷക പ്രൊഫൈൽ കണ്ടെത്തിയില്ല.",
    transportCharge: "ട്രാൻസ്പോർട്ട് ചാർജ്",
    pending: "തീർപ്പാക്കാത്തത്",
    requestTo: "അഭ്യർത്ഥന അയച്ചു",
    confirm: "സ്ഥിരീകരിക്കുക",
  },

  pa: {
    title: "ਲੌਜਿਸਟਿਕਸ",
    subtitle: "ਡਿਲਿਵਰੀ ਲਈ ਟਰਾਂਸਪੋਰਟ ਪ੍ਰੋਵਾਈਡਰ ਚੁਣੋ",
    back: "ਵਾਪਸ",
    pickup: "ਪਿਕਅੱਪ",
    destination: "ਮੰਜ਼ਿਲ",
    farmerLocation: "ਕਿਸਾਨ ਦਾ ਸਥਾਨ",
    selectTransport: "ਉਪਲਬਧ ਟਰਾਂਸਪੋਰਟ ਪ੍ਰੋਵਾਈਡਰ",
    chooseProvider: "ਇੱਕ ਲੌਜਿਸਟਿਕਸ ਪ੍ਰੋਵਾਈਡਰ ਚੁਣੋ",
    vehicle: "ਵਾਹਨ",
    charge: "ਟਰਾਂਸਪੋਰਟ ਚਾਰਜ",
    rating: "ਰੇਟਿੰਗ",
    eta: "ਅੰਦਾਜ਼ਨ ਪਹੁੰਚ",
    select: "ਚੁਣੋ",
    selected: "ਚੁਣਿਆ ਗਿਆ",
    sendRequest: "ਟਰਾਂਸਪੋਰਟ ਬੇਨਤੀ ਭੇਜੋ",
    requestSent: "ਬੇਨਤੀ ਭੇਜੀ ਗਈ",
    requestInfo: "ਤੁਹਾਡੀ ਬੇਨਤੀ ਸਿਰਫ਼ ਚੁਣੇ ਪ੍ਰੋਵਾਈਡਰ ਨੂੰ ਜਾਵੇਗੀ।",
    mandi: "ਮੰਡੀ",
    buyer: "ਖਰੀਦਦਾਰ",
    processor: "ਪ੍ਰੋਸੈਸਰ",
    crop: "ਫਸਲ",
    quantity: "ਮਾਤਰਾ",
    waste: "ਖੇਤੀਬਾੜੀ ਰਹਿੰਦ-ਖੂੰਹਦ",
    noDestination: "ਕੋਈ ਮੰਜ਼ਿਲ ਨਹੀਂ ਚੁਣੀ ਗਈ।",
    noProfile: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ ਨਹੀਂ ਮਿਲੀ।",
    transportCharge: "ਟਰਾਂਸਪੋਰਟ ਚਾਰਜ",
    pending: "ਪੈਂਡਿੰਗ",
    requestTo: "ਬੇਨਤੀ ਭੇਜੀ ਗਈ",
    confirm: "ਪੁਸ਼ਟੀ ਕਰੋ",
  },

  or: {
    title: "ଲଜିଷ୍ଟିକ୍ସ",
    subtitle: "ଡେଲିଭରୀ ପାଇଁ ପରିବହନ ପ୍ରଦାନକାରୀ ବାଛନ୍ତୁ",
    back: "ପଛକୁ",
    pickup: "ପିକଅପ୍",
    destination: "ଗନ୍ତବ୍ୟ",
    farmerLocation: "ଚାଷୀଙ୍କ ସ୍ଥାନ",
    selectTransport: "ଉପଲବ୍ଧ ପରିବହନ ପ୍ରଦାନକାରୀ",
    chooseProvider: "ଗୋଟିଏ ଲଜିଷ୍ଟିକ୍ସ ପ୍ରଦାନକାରୀ ବାଛନ୍ତୁ",
    vehicle: "ଯାନ",
    charge: "ପରିବହନ ଶୁଳ୍କ",
    rating: "ରେଟିଂ",
    eta: "ଆନୁମାନିକ ଆଗମନ",
    select: "ବାଛନ୍ତୁ",
    selected: "ବଛାଯାଇଛି",
    sendRequest: "ପରିବହନ ଅନୁରୋଧ ପଠାନ୍ତୁ",
    requestSent: "ଅନୁରୋଧ ପଠାଯାଇଛି",
    requestInfo: "ଆପଣଙ୍କ ଅନୁରୋଧ କେବଳ ବଛାଯାଇଥିବା ପ୍ରଦାନକାରୀଙ୍କୁ ଯିବ।",
    mandi: "ମଣ୍ଡି",
    buyer: "କ୍ରେତା",
    processor: "ପ୍ରୋସେସର",
    crop: "ଫସଲ",
    quantity: "ପରିମାଣ",
    waste: "କୃଷି ଆବର୍ଜନା",
    noDestination: "କୌଣସି ଗନ୍ତବ୍ୟ ବଛାଯାଇନାହିଁ।",
    noProfile: "ଚାଷୀ ପ୍ରୋଫାଇଲ୍ ମିଳିଲା ନାହିଁ।",
    transportCharge: "ପରିବହନ ଶୁଳ୍କ",
    pending: "ଅପେକ୍ଷାରତ",
    requestTo: "ଅନୁରୋଧ ପଠାଯାଇଛି",
    confirm: "ନିଶ୍ଚିତ କରନ୍ତୁ",
  },

  as: {
    title: "লজিষ্টিক্স",
    subtitle: "ডেলিভাৰীৰ বাবে পৰিবহণ প্ৰদানকাৰী বাছক",
    back: "পিছলৈ",
    pickup: "পিকআপ",
    destination: "গন্তব্য",
    farmerLocation: "কৃষকৰ স্থান",
    selectTransport: "উপলব্ধ পৰিবহণ প্ৰদানকাৰী",
    chooseProvider: "এজন লজিষ্টিক্স প্ৰদানকাৰী বাছক",
    vehicle: "যানবাহন",
    charge: "পৰিবহণ মাচুল",
    rating: "ৰেটিং",
    eta: "আনুমানিক আগমন",
    select: "বাছক",
    selected: "বাছনি কৰা হৈছে",
    sendRequest: "পৰিবহণ অনুৰোধ পঠিয়াওক",
    requestSent: "অনুৰোধ পঠিওৱা হৈছে",
    requestInfo: "আপোনাৰ অনুৰোধ কেৱল বাছনি কৰা প্ৰদানকাৰীলৈ যাব।",
    mandi: "মাণ্ডি",
    buyer: "ক্ৰেতা",
    processor: "প্ৰচেছৰ",
    crop: "শস্য",
    quantity: "পৰিমাণ",
    waste: "কৃষি আৱৰ্জনা",
    noDestination: "কোনো গন্তব্য বাছনি কৰা হোৱা নাই।",
    noProfile: "কৃষকৰ প্ৰফাইল পোৱা নগ'ল।",
    transportCharge: "পৰিবহণ মাচুল",
    pending: "অপেক্ষাৰত",
    requestTo: "অনুৰোধ পঠিওৱা হৈছে",
    confirm: "নিশ্চিত কৰক",
  },

  ur: {
    title: "لاجسٹکس",
    subtitle: "ڈیلیوری کے لیے ٹرانسپورٹ فراہم کنندہ منتخب کریں",
    back: "واپس",
    pickup: "پک اپ",
    destination: "منزل",
    farmerLocation: "کسان کا مقام",
    selectTransport: "دستیاب ٹرانسپورٹ فراہم کنندگان",
    chooseProvider: "ایک لاجسٹکس فراہم کنندہ منتخب کریں",
    vehicle: "گاڑی",
    charge: "ٹرانسپورٹ چارج",
    rating: "ریٹنگ",
    eta: "متوقع آمد",
    select: "منتخب کریں",
    selected: "منتخب شدہ",
    sendRequest: "ٹرانسپورٹ درخواست بھیجیں",
    requestSent: "درخواست بھیج دی گئی",
    requestInfo:
      "آپ کی درخواست صرف منتخب کیے گئے لاجسٹکس فراہم کنندہ کو بھیجی جائے گی۔",
    mandi: "منڈی",
    buyer: "خریدار",
    processor: "پروسیسر",
    crop: "فصل",
    quantity: "مقدار",
    waste: "زرعی فضلہ",
    noDestination: "ابھی کوئی منزل منتخب نہیں کی گئی۔",
    noProfile: "کسان کی پروفائل نہیں ملی۔",
    transportCharge: "ٹرانسپورٹ چارج",
    pending: "زیر التوا",
    requestTo: "درخواست بھیجی گئی",
    confirm: "تصدیق کریں",
  },
};

function formatLocation(profile: FarmerProfile | null) {
  if (!profile) return "";

  return [
    profile.village,
    profile.district,
    profile.state,
    profile.pin,
  ]
    .filter(Boolean)
    .join(", ");
}

export default function LogisticsMainPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const currentText = text[language] || text.en;

  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [selectedMandi, setSelectedMandi] = useState<SelectedMandi | null>(
    null
  );

  const [buyRequests, setBuyRequests] = useState<BuyRequest[]>([]);
  const [wasteBuyRequests, setWasteBuyRequests] = useState<
    WasteBuyRequest[]
  >([]);

  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
    null
  );

  const [sourceType, setSourceType] = useState<
    "mandi" | "buyer" | "processor" | null
  >(null);

  const [destinationName, setDestinationName] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");

  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState<number | undefined>(
    undefined
  );
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedWasteType, setSelectedWasteType] = useState("");

  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    try {
      const farmerData = localStorage.getItem("farmerProfile");

      if (farmerData) {
        setProfile(JSON.parse(farmerData));
      }

      const mandiData = localStorage.getItem("selectedMandi");

      if (mandiData) {
        const mandi = JSON.parse(mandiData) as SelectedMandi;

        setSelectedMandi(mandi);

        if (mandi.name) {
          setSourceType("mandi");
          setDestinationName(mandi.name);
        }

        setDestinationLocation(
          [
            mandi.address,
            mandi.district,
            mandi.state,
          ]
            .filter(Boolean)
            .join(", ")
        );

        setSelectedCrop(mandi.crop || "");
        setSelectedQuantity(mandi.totalKg);
        setSelectedUnit(mandi.unit || "KG");
      }

      const storedBuyRequests = localStorage.getItem("buyRequests");

      if (storedBuyRequests) {
        const parsed = JSON.parse(storedBuyRequests);

        if (Array.isArray(parsed)) {
          setBuyRequests(parsed);
        }
      }

      const storedWasteRequests = localStorage.getItem("wasteBuyRequests");

      if (storedWasteRequests) {
        const parsed = JSON.parse(storedWasteRequests);

        if (Array.isArray(parsed)) {
          setWasteBuyRequests(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load logistics data:", error);
    }
  }, []);

  const farmerLocation = useMemo(
    () => formatLocation(profile),
    [profile]
  );

  const acceptedBuyerRequests = useMemo(() => {
    return buyRequests.filter(
      (request) =>
        request.status === "accepted" && request.logisticsReady === true
    );
  }, [buyRequests]);

  const acceptedWasteRequests = useMemo(() => {
    return wasteBuyRequests.filter(
      (request) =>
        request.status === "accepted" && request.logisticsReady === true
    );
  }, [wasteBuyRequests]);

  const selectedProvider = providers.find(
    (provider) => provider.id === selectedProviderId
  );

  function chooseMandiTransport() {
    if (!selectedMandi?.name) {
      alert(currentText.noDestination);
      return;
    }

    setSourceType("mandi");
    setDestinationName(selectedMandi.name);

    setDestinationLocation(
      [
        selectedMandi.address,
        selectedMandi.district,
        selectedMandi.state,
      ]
        .filter(Boolean)
        .join(", ")
    );

    setSelectedCrop(selectedMandi.crop || "");
    setSelectedQuantity(selectedMandi.totalKg);
    setSelectedUnit(selectedMandi.unit || "KG");
    setSelectedWasteType("");
    setRequestSent(false);
  }

  function chooseBuyerRequest(request: BuyRequest) {
    setSourceType("buyer");
    setDestinationName(request.buyerName || currentText.buyer);
    setDestinationLocation(request.buyerLocation || "");
    setSelectedCrop(request.crop || "");
    setSelectedQuantity(request.quantity);
    setSelectedUnit(request.unit || "");
    setSelectedWasteType("");
    setRequestSent(false);
  }

  function chooseProcessorRequest(request: WasteBuyRequest) {
    setSourceType("processor");
    setDestinationName(
      request.processorName || currentText.processor
    );
    setDestinationLocation(request.processorLocation || "");
    setSelectedCrop("");
    setSelectedQuantity(request.quantity);
    setSelectedUnit(request.unit || "");
    setSelectedWasteType(request.wasteType || "");
    setRequestSent(false);
  }

  function sendTransportRequest() {
    if (!selectedProvider) {
      alert(currentText.chooseProvider);
      return;
    }

    if (!sourceType || !destinationName) {
      alert(currentText.noDestination);
      return;
    }

    if (!profile) {
      alert(currentText.noProfile);
      return;
    }

    const request: TransportRequest = {
      id: `transport-request-${Date.now()}`,

      sourceType,

      farmerName:
        profile.fullName ||
        profile.name ||
        "Farmer",

      farmerPhone: profile.phone || "",
      farmerLocation,

      destinationName,
      destinationLocation,

      crop: selectedCrop || undefined,
      quantity: selectedQuantity,
      unit: selectedUnit || undefined,

      wasteType: selectedWasteType || undefined,

      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      vehicleType: selectedProvider.vehicleType,
      transportCharge: selectedProvider.charge,
      providerPhone: selectedProvider.phone,

      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const existingRequests = JSON.parse(
        localStorage.getItem("logisticsTransportRequests") || "[]"
      );

      const updatedRequests = [
        ...(Array.isArray(existingRequests) ? existingRequests : []),
        request,
      ];

      localStorage.setItem(
        "logisticsTransportRequests",
        JSON.stringify(updatedRequests)
      );

      localStorage.setItem(
        "selectedLogisticsProvider",
        JSON.stringify({
          ...selectedProvider,
          selectedAt: new Date().toISOString(),
          requestId: request.id,
        })
      );

      setRequestSent(true);
    } catch (error) {
      console.error("Failed to send logistics request:", error);
      alert("Unable to send logistics request.");
    }
  }

  const isProviderSelected = Boolean(selectedProviderId);

  return (
    <main
      dir={language === "ur" ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b bg-white">
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

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* ROUTE CARD */}
        <section className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {currentText.destination}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {currentText.chooseProvider}
              </p>
            </div>

            {sourceType && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {sourceType === "mandi"
                  ? currentText.mandi
                  : sourceType === "buyer"
                  ? currentText.buyer
                  : currentText.processor}
              </span>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* PICKUP */}
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase text-gray-500">
                {currentText.pickup}
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                {profile?.fullName || profile?.name || "Farmer"}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {farmerLocation || currentText.noProfile}
              </p>
            </div>

            {/* DESTINATION */}
            <div className="rounded-xl border bg-green-50 p-4">
              <p className="text-xs font-semibold uppercase text-green-700">
                {currentText.destination}
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                {destinationName || currentText.noDestination}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {destinationLocation || "—"}
              </p>
            </div>
          </div>

          {/* MANDI */}
          {selectedMandi?.name && (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-green-700">
                    {currentText.mandi}
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {selectedMandi.name}
                  </p>

                  <p className="text-sm text-gray-600">
                    {[
                      selectedMandi.district,
                      selectedMandi.state,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>

                <button
                  onClick={chooseMandiTransport}
                  className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  {currentText.select}
                </button>
              </div>
            </div>
          )}

          {/* BUYER REQUESTS */}
          {acceptedBuyerRequests.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-3 font-bold text-gray-900">
                {currentText.buyer} — {currentText.destination}
              </h3>

              <div className="space-y-3">
                {acceptedBuyerRequests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-xl border p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-bold">
                          {request.buyerName || currentText.buyer}
                        </p>

                        <p className="text-sm text-gray-600">
                          {request.buyerLocation || "—"}
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                          {request.crop || "Crop"} •{" "}
                          {request.quantity ?? "—"}{" "}
                          {request.unit || ""}
                        </p>
                      </div>

                      <button
                        onClick={() => chooseBuyerRequest(request)}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        {currentText.select}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROCESSOR REQUESTS */}
          {acceptedWasteRequests.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-3 font-bold text-gray-900">
                {currentText.processor} — {currentText.destination}
              </h3>

              <div className="space-y-3">
                {acceptedWasteRequests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-xl border p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-bold">
                          {request.processorName ||
                            currentText.processor}
                        </p>

                        <p className="text-sm text-gray-600">
                          {request.processorLocation || "—"}
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                          {request.wasteType ||
                            currentText.waste}{" "}
                          • {request.quantity ?? "—"}{" "}
                          {request.unit || ""}
                        </p>
                      </div>

                      <button
                        onClick={() => chooseProcessorRequest(request)}
                        className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
                      >
                        {currentText.select}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SELECTED ORDER SUMMARY */}
        {sourceType && destinationName && (
          <section className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              {currentText.destination}
            </h2>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  {currentText.destination}
                </p>
                <p className="mt-1 font-semibold">
                  {destinationName}
                </p>
              </div>

              {selectedCrop && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    {currentText.crop}
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedCrop}
                  </p>
                </div>
              )}

              {selectedWasteType && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    {currentText.waste}
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedWasteType}
                  </p>
                </div>
              )}

              {selectedQuantity !== undefined && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    {currentText.quantity}
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedQuantity} {selectedUnit}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PROVIDERS */}
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              {currentText.selectTransport}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {currentText.chooseProvider}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {providers.map((provider) => {
              const selected = selectedProviderId === provider.id;

              return (
                <div
                  key={provider.id}
                  className={`rounded-2xl border-2 p-5 transition ${
                    selected
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {provider.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        🚚 {provider.vehicleType}
                      </p>
                    </div>

                    {selected && (
                      <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                        ✓ {currentText.selected}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        {currentText.charge}
                      </p>

                      <p className="mt-1 font-bold text-green-700">
                        ₹{provider.charge.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        {currentText.rating}
                      </p>

                      <p className="mt-1 font-bold">
                        ⭐ {provider.rating}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        {currentText.eta}
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {provider.eta}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      {currentText.transportCharge}
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      ₹{provider.charge.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProviderId(provider.id);
                      setRequestSent(false);
                    }}
                    className={`mt-4 w-full rounded-xl px-4 py-3 font-semibold ${
                      selected
                        ? "bg-green-600 text-white"
                        : "border border-green-600 text-green-700 hover:bg-green-50"
                    }`}
                  >
                    {selected
                      ? `✓ ${currentText.selected}`
                      : currentText.select}
                  </button>
                </div>
              );
            })}
          </div>

          {/* REQUEST AREA */}
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
            {selectedProvider ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-green-700">
                      {currentText.requestTo}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {selectedProvider.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {selectedProvider.vehicleType} • ₹
                      {selectedProvider.charge.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <button
                    onClick={sendTransportRequest}
                    disabled={requestSent}
                    className={`rounded-xl px-6 py-3 font-bold text-white ${
                      requestSent
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {requestSent
                      ? `✓ ${currentText.requestSent}`
                      : currentText.sendRequest}
                  </button>
                </div>

                <p className="mt-4 text-sm text-green-800">
                  ℹ️ {currentText.requestInfo}
                </p>

                {requestSent && (
                  <div className="mt-4 rounded-xl border border-green-300 bg-white p-4">
                    <p className="font-bold text-green-700">
                      ✓ {currentText.requestSent}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {selectedProvider.name} —{" "}
                      {selectedProvider.vehicleType} — ₹
                      {selectedProvider.charge.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      {currentText.pending}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-sm font-medium text-green-800">
                {currentText.chooseProvider}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}