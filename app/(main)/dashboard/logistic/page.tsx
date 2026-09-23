"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../lib/language";

type BuyRequest = {
  id: string;
  listingId?: string;
  farmerName: string;
  crop: string;
  quantity: number;
  unit: string;
  price: number;
  farmerLocation: string;
  buyerName: string;
  buyerLocation: string;
  buyerPhone?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

type WasteBuyRequest = {
  id: string;
  wasteListingId: string;
  farmerName: string;
  wasteType: string;
  quantity: number;
  unit: string;
  price: number;
  farmerLocation: string;
  processorName: string;
  processorLocation: string;
  processorPhone?: string;
  status: "pending" | "accepted" | "rejected";
  logisticsReady?: boolean;
  createdAt: string;
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

type LogisticsProfile = {
  name?: string;
  businessName?: string;
  phone?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  serviceArea?: string;
  state?: string;
  district?: string;
  village?: string;
};

type LogisticsOrder = {
  id: string;
  requestId: string;
  farmerName: string;
  buyerName: string;
  crop: string;
  quantity: number;
  unit: string;
  price: number;
  pickupLocation: string;
  deliveryType: "mandi" | "buyer" | "processor";
  deliveryName: string;
  deliveryLocation: string;
  vehicleType: string;
  driverName: string;
  driverPhone: string;
  status: string;
  createdAt: string;
};

const textData: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    welcome: string;
    buyerRequests: string;
    buyerRequestsDesc: string;
    processorRequests: string;
    processorRequestsDesc: string;
    mandiDelivery: string;
    mandiDeliveryDesc: string;
    orders: string;
    ordersDesc: string;
    profile: string;
    profileDesc: string;
    talkAi: string;
    talkAiDesc: string;
    viewBuyerRequests: string;
    viewProcessorRequests: string;
    openLogistics: string;
    editProfile: string;
    totalRequests: string;
    activeOrders: string;
    mandi: string;
    noMandi: string;
    noBuyerRequests: string;
    noProcessorRequests: string;
    noOrders: string;
    farmer: string;
    buyer: string;
    processor: string;
    crop: string;
    waste: string;
    quantity: string;
    pickup: string;
    delivery: string;
    vehicle: string;
    driver: string;
    status: string;
    accepted: string;
    pending: string;
    logout: string;
    business: string;
    location: string;
    phone: string;
  }
> = {
  en: {
    title: "Logistics Dashboard",
    subtitle: "Manage transportation, deliveries and orders",
    welcome: "Welcome",
    buyerRequests: "Buyer Deliveries",
    buyerRequestsDesc:
      "Accepted crop purchase requests ready for transport",
    processorRequests: "Processor Deliveries",
    processorRequestsDesc:
      "Accepted agricultural waste purchases ready for transport",
    mandiDelivery: "Mandi Delivery",
    mandiDeliveryDesc: "Transport farmer crop to the selected mandi",
    orders: "Logistics Orders",
    ordersDesc: "Track all created transportation orders",
    profile: "Logistics Profile",
    profileDesc: "Manage your transport and driver details",
    talkAi: "Talk to AI",
    talkAiDesc: "Ask KrishiMitra anything using voice",
    viewBuyerRequests: "View Buyer Requests",
    viewProcessorRequests: "View Processor Requests",
    openLogistics: "Open Logistics",
    editProfile: "Edit Profile",
    totalRequests: "Total Requests",
    activeOrders: "Active Orders",
    mandi: "Mandi",
    noMandi: "No mandi selected yet.",
    noBuyerRequests: "No accepted buyer requests.",
    noProcessorRequests: "No accepted processor requests.",
    noOrders: "No logistics orders yet.",
    farmer: "Farmer",
    buyer: "Buyer",
    processor: "Processor",
    crop: "Crop",
    waste: "Waste",
    quantity: "Quantity",
    pickup: "Pickup",
    delivery: "Delivery",
    vehicle: "Vehicle",
    driver: "Driver",
    status: "Status",
    accepted: "Accepted",
    pending: "Pending",
    logout: "Logout",
    business: "Business",
    location: "Location",
    phone: "Phone",
  },

  hi: {
    title: "लॉजिस्टिक्स डैशबोर्ड",
    subtitle: "ट्रांसपोर्ट, डिलीवरी और ऑर्डर मैनेज करें",
    welcome: "स्वागत है",
    buyerRequests: "बायर डिलीवरी",
    buyerRequestsDesc:
      "स्वीकृत फसल खरीद रिक्वेस्ट जो ट्रांसपोर्ट के लिए तैयार हैं",
    processorRequests: "प्रोसेसर डिलीवरी",
    processorRequestsDesc:
      "स्वीकृत कृषि अपशिष्ट खरीद जो ट्रांसपोर्ट के लिए तैयार हैं",
    mandiDelivery: "मंडी डिलीवरी",
    mandiDeliveryDesc: "किसान की फसल को चयनित मंडी तक पहुंचाएं",
    orders: "लॉजिस्टिक्स ऑर्डर",
    ordersDesc: "सभी बनाए गए ट्रांसपोर्ट ऑर्डर ट्रैक करें",
    profile: "लॉजिस्टिक्स प्रोफाइल",
    profileDesc: "ट्रांसपोर्ट और ड्राइवर की जानकारी मैनेज करें",
    talkAi: "AI से बात करें",
    talkAiDesc: "आवाज़ से KrishiMitra से सवाल पूछें",
    viewBuyerRequests: "बायर रिक्वेस्ट देखें",
    viewProcessorRequests: "प्रोसेसर रिक्वेस्ट देखें",
    openLogistics: "लॉजिस्टिक्स खोलें",
    editProfile: "प्रोफाइल एडिट करें",
    totalRequests: "कुल रिक्वेस्ट",
    activeOrders: "एक्टिव ऑर्डर",
    mandi: "मंडी",
    noMandi: "अभी कोई मंडी चयनित नहीं है।",
    noBuyerRequests: "कोई स्वीकृत बायर रिक्वेस्ट नहीं है।",
    noProcessorRequests: "कोई स्वीकृत प्रोसेसर रिक्वेस्ट नहीं है।",
    noOrders: "अभी कोई लॉजिस्टिक्स ऑर्डर नहीं है।",
    farmer: "किसान",
    buyer: "बायर",
    processor: "प्रोसेसर",
    crop: "फसल",
    waste: "अपशिष्ट",
    quantity: "मात्रा",
    pickup: "पिकअप",
    delivery: "डिलीवरी",
    vehicle: "वाहन",
    driver: "ड्राइवर",
    status: "स्थिति",
    accepted: "स्वीकृत",
    pending: "पेंडिंग",
    logout: "लॉगआउट",
    business: "बिजनेस",
    location: "स्थान",
    phone: "फोन",
  },

  bn: {
    title: "লজিস্টিক্স ড্যাশবোর্ড",
    subtitle: "পরিবহন, ডেলিভারি এবং অর্ডার পরিচালনা করুন",
    welcome: "স্বাগতম",
    buyerRequests: "ক্রেতা ডেলিভারি",
    buyerRequestsDesc: "পরিবহনের জন্য প্রস্তুত অনুমোদিত ফসল ক্রয় অনুরোধ",
    processorRequests: "প্রসেসর ডেলিভারি",
    processorRequestsDesc:
      "পরিবহনের জন্য প্রস্তুত অনুমোদিত কৃষি বর্জ্য ক্রয়",
    mandiDelivery: "মাণ্ডি ডেলিভারি",
    mandiDeliveryDesc: "কৃষকের ফসল নির্বাচিত মাণ্ডিতে পৌঁছে দিন",
    orders: "লজিস্টিক্স অর্ডার",
    ordersDesc: "সমস্ত পরিবহন অর্ডার ট্র্যাক করুন",
    profile: "লজিস্টিক্স প্রোফাইল",
    profileDesc: "পরিবহন এবং ড্রাইভারের তথ্য পরিচালনা করুন",
    talkAi: "AI-এর সাথে কথা বলুন",
    talkAiDesc: "ভয়েস ব্যবহার করে KrishiMitra-কে প্রশ্ন করুন",
    viewBuyerRequests: "ক্রেতার অনুরোধ দেখুন",
    viewProcessorRequests: "প্রসেসরের অনুরোধ দেখুন",
    openLogistics: "লজিস্টিক্স খুলুন",
    editProfile: "প্রোফাইল সম্পাদনা",
    totalRequests: "মোট অনুরোধ",
    activeOrders: "সক্রিয় অর্ডার",
    mandi: "মাণ্ডি",
    noMandi: "কোনো মাণ্ডি নির্বাচিত হয়নি।",
    noBuyerRequests: "কোনো অনুমোদিত ক্রেতার অনুরোধ নেই।",
    noProcessorRequests: "কোনো অনুমোদিত প্রসেসরের অনুরোধ নেই।",
    noOrders: "কোনো লজিস্টিক্স অর্ডার নেই।",
    farmer: "কৃষক",
    buyer: "ক্রেতা",
    processor: "প্রসেসর",
    crop: "ফসল",
    waste: "বর্জ্য",
    quantity: "পরিমাণ",
    pickup: "পিকআপ",
    delivery: "ডেলিভারি",
    vehicle: "যানবাহন",
    driver: "চালক",
    status: "অবস্থা",
    accepted: "গৃহীত",
    pending: "অপেক্ষমাণ",
    logout: "লগআউট",
    business: "ব্যবসা",
    location: "অবস্থান",
    phone: "ফোন",
  },

  mr: {
    title: "लॉजिस्टिक्स डॅशबोर्ड",
    subtitle: "वाहतूक, डिलिव्हरी आणि ऑर्डर व्यवस्थापित करा",
    welcome: "स्वागत",
    buyerRequests: "खरेदीदार डिलिव्हरी",
    buyerRequestsDesc: "वाहतुकीसाठी तयार स्वीकृत पिकांच्या खरेदी विनंत्या",
    processorRequests: "प्रोसेसर डिलिव्हरी",
    processorRequestsDesc: "वाहतुकीसाठी तयार स्वीकृत कृषी कचरा खरेदी",
    mandiDelivery: "मंडी डिलिव्हरी",
    mandiDeliveryDesc: "शेतकऱ्यांचे पीक निवडलेल्या मंडीत पोहोचवा",
    orders: "लॉजिस्टिक्स ऑर्डर",
    ordersDesc: "सर्व वाहतूक ऑर्डर ट्रॅक करा",
    profile: "लॉजिस्टिक्स प्रोफाइल",
    profileDesc: "वाहतूक आणि ड्रायव्हरची माहिती व्यवस्थापित करा",
    talkAi: "AI शी बोला",
    talkAiDesc: "आवाजाने KrishiMitra ला प्रश्न विचारा",
    viewBuyerRequests: "खरेदीदार विनंत्या पहा",
    viewProcessorRequests: "प्रोसेसर विनंत्या पहा",
    openLogistics: "लॉजिस्टिक्स उघडा",
    editProfile: "प्रोफाइल संपादित करा",
    totalRequests: "एकूण विनंत्या",
    activeOrders: "सक्रिय ऑर्डर",
    mandi: "मंडी",
    noMandi: "अजून मंडी निवडलेली नाही.",
    noBuyerRequests: "स्वीकृत खरेदीदार विनंत्या नाहीत.",
    noProcessorRequests: "स्वीकृत प्रोसेसर विनंत्या नाहीत.",
    noOrders: "लॉजिस्टिक्स ऑर्डर नाहीत.",
    farmer: "शेतकरी",
    buyer: "खरेदीदार",
    processor: "प्रोसेसर",
    crop: "पीक",
    waste: "कचरा",
    quantity: "प्रमाण",
    pickup: "पिकअप",
    delivery: "डिलिव्हरी",
    vehicle: "वाहन",
    driver: "ड्रायव्हर",
    status: "स्थिती",
    accepted: "स्वीकृत",
    pending: "प्रलंबित",
    logout: "लॉगआउट",
    business: "व्यवसाय",
    location: "स्थान",
    phone: "फोन",
  },

  ta: {
    title: "லாஜிஸ்டிக்ஸ் டாஷ்போர்டு",
    subtitle: "போக்குவரத்து, டெலிவரி மற்றும் ஆர்டர்களை நிர்வகிக்கவும்",
    welcome: "வரவேற்கிறோம்",
    buyerRequests: "வாங்குபவர் டெலிவரிகள்",
    buyerRequestsDesc:
      "போக்குவரத்துக்கு தயாரான ஏற்றுக்கொள்ளப்பட்ட பயிர் கொள்முதல் கோரிக்கைகள்",
    processorRequests: "செயலாக்க டெலிவரிகள்",
    processorRequestsDesc:
      "போக்குவரத்துக்கு தயாரான விவசாய கழிவு கொள்முதல்",
    mandiDelivery: "மண்டி டெலிவரி",
    mandiDeliveryDesc:
      "விவசாயியின் பயிரை தேர்ந்தெடுக்கப்பட்ட மண்டிக்கு கொண்டு செல்லவும்",
    orders: "லாஜிஸ்டிக்ஸ் ஆர்டர்கள்",
    ordersDesc: "அனைத்து போக்குவரத்து ஆர்டர்களையும் கண்காணிக்கவும்",
    profile: "லாஜிஸ்டிக்ஸ் சுயவிவரம்",
    profileDesc: "போக்குவரத்து மற்றும் ஓட்டுநர் விவரங்களை நிர்வகிக்கவும்",
    talkAi: "AI உடன் பேசுங்கள்",
    talkAiDesc: "குரல் மூலம் KrishiMitra-விடம் கேளுங்கள்",
    viewBuyerRequests: "வாங்குபவர் கோரிக்கைகளைப் பார்க்கவும்",
    viewProcessorRequests: "செயலாக்க கோரிக்கைகளைப் பார்க்கவும்",
    openLogistics: "லாஜிஸ்டிக்ஸ் திறக்கவும்",
    editProfile: "சுயவிவரத்தைத் திருத்தவும்",
    totalRequests: "மொத்த கோரிக்கைகள்",
    activeOrders: "செயலில் உள்ள ஆர்டர்கள்",
    mandi: "மண்டி",
    noMandi: "மண்டி தேர்ந்தெடுக்கப்படவில்லை.",
    noBuyerRequests: "ஏற்றுக்கொள்ளப்பட்ட வாங்குபவர் கோரிக்கைகள் இல்லை.",
    noProcessorRequests: "ஏற்றுக்கொள்ளப்பட்ட செயலாக்க கோரிக்கைகள் இல்லை.",
    noOrders: "லாஜிஸ்டிக்ஸ் ஆர்டர்கள் இல்லை.",
    farmer: "விவசாயி",
    buyer: "வாங்குபவர்",
    processor: "செயலாக்கி",
    crop: "பயிர்",
    waste: "கழிவு",
    quantity: "அளவு",
    pickup: "பிக்கப்",
    delivery: "டெலிவரி",
    vehicle: "வாகனம்",
    driver: "ஓட்டுநர்",
    status: "நிலை",
    accepted: "ஏற்றுக்கொள்ளப்பட்டது",
    pending: "நிலுவையில்",
    logout: "வெளியேறு",
    business: "வணிகம்",
    location: "இடம்",
    phone: "தொலைபேசி",
  },

  te: {
    title: "లాజిస్టిక్స్ డాష్‌బోర్డ్",
    subtitle: "రవాణా, డెలివరీలు మరియు ఆర్డర్లను నిర్వహించండి",
    welcome: "స్వాగతం",
    buyerRequests: "కొనుగోలుదారు డెలివరీలు",
    buyerRequestsDesc:
      "రవాణాకు సిద్ధంగా ఉన్న ఆమోదిత పంట కొనుగోలు అభ్యర్థనలు",
    processorRequests: "ప్రాసెసర్ డెలివరీలు",
    processorRequestsDesc:
      "రవాణాకు సిద్ధంగా ఉన్న వ్యవసాయ వ్యర్థాల కొనుగోళ్లు",
    mandiDelivery: "మండి డెలివరీ",
    mandiDeliveryDesc: "రైతు పంటను ఎంచుకున్న మండికి రవాణా చేయండి",
    orders: "లాజిస్టిక్స్ ఆర్డర్లు",
    ordersDesc: "అన్ని రవాణా ఆర్డర్లను ట్రాక్ చేయండి",
    profile: "లాజిస్టిక్స్ ప్రొఫైల్",
    profileDesc: "రవాణా మరియు డ్రైవర్ వివరాలను నిర్వహించండి",
    talkAi: "AIతో మాట్లాడండి",
    talkAiDesc: "వాయిస్ ద్వారా KrishiMitraని అడగండి",
    viewBuyerRequests: "కొనుగోలుదారు అభ్యర్థనలు చూడండి",
    viewProcessorRequests: "ప్రాసెసర్ అభ్యర్థనలు చూడండి",
    openLogistics: "లాజిస్టిక్స్ తెరవండి",
    editProfile: "ప్రొఫైల్ మార్చండి",
    totalRequests: "మొత్తం అభ్యర్థనలు",
    activeOrders: "యాక్టివ్ ఆర్డర్లు",
    mandi: "మండి",
    noMandi: "మండి ఎంచుకోలేదు.",
    noBuyerRequests: "ఆమోదించిన కొనుగోలుదారు అభ్యర్థనలు లేవు.",
    noProcessorRequests: "ఆమోదించిన ప్రాసెసర్ అభ్యర్థనలు లేవు.",
    noOrders: "లాజిస్టిక్స్ ఆర్డర్లు లేవు.",
    farmer: "రైతు",
    buyer: "కొనుగోలుదారు",
    processor: "ప్రాసెసర్",
    crop: "పంట",
    waste: "వ్యర్థం",
    quantity: "పరిమాణం",
    pickup: "పికప్",
    delivery: "డెలివరీ",
    vehicle: "వాహనం",
    driver: "డ్రైవర్",
    status: "స్థితి",
    accepted: "ఆమోదించబడింది",
    pending: "పెండింగ్",
    logout: "లాగ్ అవుట్",
    business: "వ్యాపారం",
    location: "స్థానం",
    phone: "ఫోన్",
  },

  gu: {
    title: "લોજિસ્ટિક્સ ડેશબોર્ડ",
    subtitle: "પરિવહન, ડિલિવરી અને ઓર્ડર મેનેજ કરો",
    welcome: "સ્વાગત",
    buyerRequests: "બાયર ડિલિવરી",
    buyerRequestsDesc: "પરિવહન માટે તૈયાર સ્વીકૃત પાક ખરીદી વિનંતીઓ",
    processorRequests: "પ્રોસેસર ડિલિવરી",
    processorRequestsDesc: "પરિવહન માટે તૈયાર સ્વીકૃત કૃષિ કચરા ખરીદી",
    mandiDelivery: "મંડી ડિલિવરી",
    mandiDeliveryDesc: "ખેડૂતનો પાક પસંદ કરેલી મંડી સુધી પહોંચાડો",
    orders: "લોજિસ્ટિક્સ ઓર્ડર",
    ordersDesc: "બધા પરિવહન ઓર્ડર ટ્રેક કરો",
    profile: "લોજિસ્ટિક્સ પ્રોફાઇલ",
    profileDesc: "પરિવહન અને ડ્રાઇવર વિગતો મેનેજ કરો",
    talkAi: "AI સાથે વાત કરો",
    talkAiDesc: "અવાજથી KrishiMitra ને પ્રશ્ન પૂછો",
    viewBuyerRequests: "બાયર વિનંતીઓ જુઓ",
    viewProcessorRequests: "પ્રોસેસર વિનંતીઓ જુઓ",
    openLogistics: "લોજિસ્ટિક્સ ખોલો",
    editProfile: "પ્રોફાઇલ એડિટ કરો",
    totalRequests: "કુલ વિનંતીઓ",
    activeOrders: "સક્રિય ઓર્ડર",
    mandi: "મંડી",
    noMandi: "કોઈ મંડી પસંદ કરેલી નથી.",
    noBuyerRequests: "કોઈ સ્વીકૃત બાયર વિનંતી નથી.",
    noProcessorRequests: "કોઈ સ્વીકૃત પ્રોસેસર વિનંતી નથી.",
    noOrders: "કોઈ લોજિસ્ટિક્સ ઓર્ડર નથી.",
    farmer: "ખેડૂત",
    buyer: "બાયર",
    processor: "પ્રોસેસર",
    crop: "પાક",
    waste: "કચરો",
    quantity: "જથ્થો",
    pickup: "પિકઅપ",
    delivery: "ડિલિવરી",
    vehicle: "વાહન",
    driver: "ડ્રાઇવર",
    status: "સ્થિતિ",
    accepted: "સ્વીકારેલ",
    pending: "બાકી",
    logout: "લૉગઆઉટ",
    business: "વ્યવસાય",
    location: "સ્થાન",
    phone: "ફોન",
  },

  kn: {
    title: "ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    subtitle: "ಸಾರಿಗೆ, ಡೆಲಿವರಿ ಮತ್ತು ಆರ್ಡರ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    welcome: "ಸ್ವಾಗತ",
    buyerRequests: "ಖರೀದಿದಾರರ ಡೆಲಿವರಿಗಳು",
    buyerRequestsDesc:
      "ಸಾರಿಗೆಗೆ ಸಿದ್ಧವಾಗಿರುವ ಸ್ವೀಕರಿಸಿದ ಬೆಳೆ ಖರೀದಿ ವಿನಂತಿಗಳು",
    processorRequests: "ಪ್ರೊಸೆಸರ್ ಡೆಲಿವರಿಗಳು",
    processorRequestsDesc:
      "ಸಾರಿಗೆಗೆ ಸಿದ್ಧವಾಗಿರುವ ಕೃಷಿ ತ್ಯಾಜ್ಯ ಖರೀದಿಗಳು",
    mandiDelivery: "ಮಂಡಿ ಡೆಲಿವರಿ",
    mandiDeliveryDesc: "ರೈತರ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ ಮಂಡಿಗೆ ಸಾಗಿಸಿ",
    orders: "ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಆರ್ಡರ್‌ಗಳು",
    ordersDesc: "ಎಲ್ಲಾ ಸಾರಿಗೆ ಆರ್ಡರ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    profile: "ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪ್ರೊಫೈಲ್",
    profileDesc: "ಸಾರಿಗೆ ಮತ್ತು ಚಾಲಕರ ವಿವರಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    talkAi: "AI ಜೊತೆ ಮಾತನಾಡಿ",
    talkAiDesc: "ಧ್ವನಿಯ ಮೂಲಕ KrishiMitra ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ",
    viewBuyerRequests: "ಖರೀದಿದಾರರ ವಿನಂತಿಗಳನ್ನು ನೋಡಿ",
    viewProcessorRequests: "ಪ್ರೊಸೆಸರ್ ವಿನಂತಿಗಳನ್ನು ನೋಡಿ",
    openLogistics: "ಲಾಜಿಸ್ಟಿಕ್ಸ್ ತೆರೆಯಿರಿ",
    editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    totalRequests: "ಒಟ್ಟು ವಿನಂತಿಗಳು",
    activeOrders: "ಸಕ್ರಿಯ ಆರ್ಡರ್‌ಗಳು",
    mandi: "ಮಂಡಿ",
    noMandi: "ಮಂಡಿ ಆಯ್ಕೆ ಮಾಡಲಾಗಿಲ್ಲ.",
    noBuyerRequests: "ಸ್ವೀಕರಿಸಿದ ಖರೀದಿದಾರರ ವಿನಂತಿಗಳು ಇಲ್ಲ.",
    noProcessorRequests: "ಸ್ವೀಕರಿಸಿದ ಪ್ರೊಸೆಸರ್ ವಿನಂತಿಗಳು ಇಲ್ಲ.",
    noOrders: "ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಆರ್ಡರ್‌ಗಳು ಇಲ್ಲ.",
    farmer: "ರೈತ",
    buyer: "ಖರೀದಿದಾರ",
    processor: "ಪ್ರೊಸೆಸರ್",
    crop: "ಬೆಳೆ",
    waste: "ತ್ಯಾಜ್ಯ",
    quantity: "ಪ್ರಮಾಣ",
    pickup: "ಪಿಕಪ್",
    delivery: "ಡೆಲಿವರಿ",
    vehicle: "ವಾಹನ",
    driver: "ಚಾಲಕ",
    status: "ಸ್ಥಿತಿ",
    accepted: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
    pending: "ಬಾಕಿ",
    logout: "ಲಾಗ್‌ಔಟ್",
    business: "ವ್ಯವಹಾರ",
    location: "ಸ್ಥಳ",
    phone: "ಫೋನ್",
  },

  ml: {
    title: "ലോജിസ്റ്റിക്സ് ഡാഷ്ബോർഡ്",
    subtitle: "ഗതാഗതം, ഡെലിവറി, ഓർഡറുകൾ എന്നിവ നിയന്ത്രിക്കുക",
    welcome: "സ്വാഗതം",
    buyerRequests: "വാങ്ങുന്നയാളുടെ ഡെലിവറികൾ",
    buyerRequestsDesc:
      "ഗതാഗതത്തിന് തയ്യാറായ അംഗീകരിച്ച വിള വാങ്ങൽ അഭ്യർത്ഥനകൾ",
    processorRequests: "പ്രോസസർ ഡെലിവറികൾ",
    processorRequestsDesc: "ഗതാഗതത്തിന് തയ്യാറായ കാർഷിക മാലിന്യ വാങ്ങലുകൾ",
    mandiDelivery: "മണ്ടി ഡെലിവറി",
    mandiDeliveryDesc: "കർഷകന്റെ വിള തിരഞ്ഞെടുത്ത മണ്ടിയിലേക്ക് എത്തിക്കുക",
    orders: "ലോജിസ്റ്റിക്സ് ഓർഡറുകൾ",
    ordersDesc: "എല്ലാ ഗതാഗത ഓർഡറുകളും ട്രാക്ക് ചെയ്യുക",
    profile: "ലോജിസ്റ്റിക്സ് പ്രൊഫൈൽ",
    profileDesc: "ഗതാഗത, ഡ്രൈവർ വിവരങ്ങൾ നിയന്ത്രിക്കുക",
    talkAi: "AI-യോട് സംസാരിക്കുക",
    talkAiDesc: "വോയ്സ് ഉപയോഗിച്ച് KrishiMitra-യോട് ചോദിക്കുക",
    viewBuyerRequests: "വാങ്ങുന്നയാളുടെ അഭ്യർത്ഥനകൾ കാണുക",
    viewProcessorRequests: "പ്രോസസർ അഭ്യർത്ഥനകൾ കാണുക",
    openLogistics: "ലോജിസ്റ്റിക്സ് തുറക്കുക",
    editProfile: "പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക",
    totalRequests: "മൊത്തം അഭ്യർത്ഥനകൾ",
    activeOrders: "സജീവ ഓർഡറുകൾ",
    mandi: "മണ്ടി",
    noMandi: "മണ്ടി തിരഞ്ഞെടുത്തിട്ടില്ല.",
    noBuyerRequests: "അംഗീകരിച്ച വാങ്ങുന്നയാളുടെ അഭ്യർത്ഥനകൾ ഇല്ല.",
    noProcessorRequests: "അംഗീകരിച്ച പ്രോസസർ അഭ്യർത്ഥനകൾ ഇല്ല.",
    noOrders: "ലോജിസ്റ്റിക്സ് ഓർഡറുകൾ ഇല്ല.",
    farmer: "കർഷകൻ",
    buyer: "വാങ്ങുന്നയാൾ",
    processor: "പ്രോസസർ",
    crop: "വിള",
    waste: "മാലിന്യം",
    quantity: "അളവ്",
    pickup: "പിക്കപ്പ്",
    delivery: "ഡെലിവറി",
    vehicle: "വാഹനം",
    driver: "ഡ്രൈവർ",
    status: "നില",
    accepted: "അംഗീകരിച്ചു",
    pending: "തീർപ്പാക്കാത്തത്",
    logout: "ലോഗൗട്ട്",
    business: "ബിസിനസ്",
    location: "സ്ഥലം",
    phone: "ഫോൺ",
  },

  pa: {
    title: "ਲੌਜਿਸਟਿਕਸ ਡੈਸ਼ਬੋਰਡ",
    subtitle: "ਆਵਾਜਾਈ, ਡਿਲੀਵਰੀ ਅਤੇ ਆਰਡਰ ਪ੍ਰਬੰਧਿਤ ਕਰੋ",
    welcome: "ਜੀ ਆਇਆਂ ਨੂੰ",
    buyerRequests: "ਖਰੀਦਦਾਰ ਡਿਲੀਵਰੀ",
    buyerRequestsDesc: "ਆਵਾਜਾਈ ਲਈ ਤਿਆਰ ਮਨਜ਼ੂਰ ਫਸਲ ਖਰੀਦ ਬੇਨਤੀਆਂ",
    processorRequests: "ਪ੍ਰੋਸੈਸਰ ਡਿਲੀਵਰੀ",
    processorRequestsDesc:
      "ਆਵਾਜਾਈ ਲਈ ਤਿਆਰ ਮਨਜ਼ੂਰ ਖੇਤੀਬਾੜੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਖਰੀਦ",
    mandiDelivery: "ਮੰਡੀ ਡਿਲੀਵਰੀ",
    mandiDeliveryDesc: "ਕਿਸਾਨ ਦੀ ਫਸਲ ਚੁਣੀ ਹੋਈ ਮੰਡੀ ਤੱਕ ਪਹੁੰਚਾਓ",
    orders: "ਲੌਜਿਸਟਿਕਸ ਆਰਡਰ",
    ordersDesc: "ਸਾਰੇ ਆਵਾਜਾਈ ਆਰਡਰ ਟ੍ਰੈਕ ਕਰੋ",
    profile: "ਲੌਜਿਸਟਿਕਸ ਪ੍ਰੋਫਾਈਲ",
    profileDesc: "ਆਵਾਜਾਈ ਅਤੇ ਡਰਾਈਵਰ ਜਾਣਕਾਰੀ ਪ੍ਰਬੰਧਿਤ ਕਰੋ",
    talkAi: "AI ਨਾਲ ਗੱਲ ਕਰੋ",
    talkAiDesc: "ਆਵਾਜ਼ ਰਾਹੀਂ KrishiMitra ਨੂੰ ਪੁੱਛੋ",
    viewBuyerRequests: "ਖਰੀਦਦਾਰ ਬੇਨਤੀਆਂ ਵੇਖੋ",
    viewProcessorRequests: "ਪ੍ਰੋਸੈਸਰ ਬੇਨਤੀਆਂ ਵੇਖੋ",
    openLogistics: "ਲੌਜਿਸਟਿਕਸ ਖੋਲ੍ਹੋ",
    editProfile: "ਪ੍ਰੋਫਾਈਲ ਸੋਧੋ",
    totalRequests: "ਕੁੱਲ ਬੇਨਤੀਆਂ",
    activeOrders: "ਸਰਗਰਮ ਆਰਡਰ",
    mandi: "ਮੰਡੀ",
    noMandi: "ਕੋਈ ਮੰਡੀ ਨਹੀਂ ਚੁਣੀ ਗਈ।",
    noBuyerRequests: "ਕੋਈ ਮਨਜ਼ੂਰ ਖਰੀਦਦਾਰ ਬੇਨਤੀ ਨਹੀਂ।",
    noProcessorRequests: "ਕੋਈ ਮਨਜ਼ੂਰ ਪ੍ਰੋਸੈਸਰ ਬੇਨਤੀ ਨਹੀਂ।",
    noOrders: "ਕੋਈ ਲੌਜਿਸਟਿਕਸ ਆਰਡਰ ਨਹੀਂ।",
    farmer: "ਕਿਸਾਨ",
    buyer: "ਖਰੀਦਦਾਰ",
    processor: "ਪ੍ਰੋਸੈਸਰ",
    crop: "ਫਸਲ",
    waste: "ਰਹਿੰਦ-ਖੂੰਹਦ",
    quantity: "ਮਾਤਰਾ",
    pickup: "ਪਿਕਅੱਪ",
    delivery: "ਡਿਲੀਵਰੀ",
    vehicle: "ਵਾਹਨ",
    driver: "ਡਰਾਈਵਰ",
    status: "ਸਥਿਤੀ",
    accepted: "ਮਨਜ਼ੂਰ",
    pending: "ਬਕਾਇਆ",
    logout: "ਲੌਗਆਉਟ",
    business: "ਕਾਰੋਬਾਰ",
    location: "ਟਿਕਾਣਾ",
    phone: "ਫੋਨ",
  },

  or: {
    title: "ଲଜିଷ୍ଟିକ୍ସ ଡ୍ୟାସବୋର୍ଡ",
    subtitle: "ପରିବହନ, ଡେଲିଭରି ଏବଂ ଅର୍ଡର ପରିଚାଳନା କରନ୍ତୁ",
    welcome: "ସ୍ୱାଗତ",
    buyerRequests: "କ୍ରେତା ଡେଲିଭରି",
    buyerRequestsDesc:
      "ପରିବହନ ପାଇଁ ପ୍ରସ୍ତୁତ ସ୍ୱୀକୃତ ଫସଲ କ୍ରୟ ଅନୁରୋଧ",
    processorRequests: "ପ୍ରୋସେସର ଡେଲିଭରି",
    processorRequestsDesc: "ପରିବହନ ପାଇଁ ପ୍ରସ୍ତୁତ କୃଷି ବର୍ଜ୍ୟ କ୍ରୟ",
    mandiDelivery: "ମଣ୍ଡି ଡେଲିଭରି",
    mandiDeliveryDesc:
      "ଚାଷୀଙ୍କ ଫସଲକୁ ଚୟନ କରାଯାଇଥିବା ମଣ୍ଡିକୁ ନେଇଯାଆନ୍ତୁ",
    orders: "ଲଜିଷ୍ଟିକ୍ସ ଅର୍ଡର",
    ordersDesc: "ସମସ୍ତ ପରିବହନ ଅର୍ଡର ଟ୍ରାକ୍ କରନ୍ତୁ",
    profile: "ଲଜିଷ୍ଟିକ୍ସ ପ୍ରୋଫାଇଲ୍",
    profileDesc: "ପରିବହନ ଏବଂ ଡ୍ରାଇଭର ବିବରଣୀ ପରିଚାଳନା କରନ୍ତୁ",
    talkAi: "AI ସହିତ କଥା ହୁଅନ୍ତୁ",
    talkAiDesc: "ଭଏସ୍ ଦ୍ୱାରା KrishiMitra କୁ ପଚାରନ୍ତୁ",
    viewBuyerRequests: "କ୍ରେତା ଅନୁରୋଧ ଦେଖନ୍ତୁ",
    viewProcessorRequests: "ପ୍ରୋସେସର ଅନୁରୋଧ ଦେଖନ୍ତୁ",
    openLogistics: "ଲଜିଷ୍ଟିକ୍ସ ଖୋଲନ୍ତୁ",
    editProfile: "ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନା",
    totalRequests: "ମୋଟ ଅନୁରୋଧ",
    activeOrders: "ସକ୍ରିୟ ଅର୍ଡର",
    mandi: "ମଣ୍ଡି",
    noMandi: "କୌଣସି ମଣ୍ଡି ଚୟନ ହୋଇନାହିଁ।",
    noBuyerRequests: "କୌଣସି ସ୍ୱୀକୃତ କ୍ରେତା ଅନୁରୋଧ ନାହିଁ।",
    noProcessorRequests: "କୌଣସି ସ୍ୱୀକୃତ ପ୍ରୋସେସର ଅନୁରୋଧ ନାହିଁ।",
    noOrders: "କୌଣସି ଲଜିଷ୍ଟିକ୍ସ ଅର୍ଡର ନାହିଁ।",
    farmer: "ଚାଷୀ",
    buyer: "କ୍ରେତା",
    processor: "ପ୍ରୋସେସର",
    crop: "ଫସଲ",
    waste: "ବର୍ଜ୍ୟ",
    quantity: "ପରିମାଣ",
    pickup: "ପିକଅପ୍",
    delivery: "ଡେଲିଭରି",
    vehicle: "ଯାନ",
    driver: "ଡ୍ରାଇଭର",
    status: "ସ୍ଥିତି",
    accepted: "ଗ୍ରହଣ",
    pending: "ଅପେକ୍ଷାରତ",
    logout: "ଲଗଆଉଟ୍",
    business: "ବ୍ୟବସାୟ",
    location: "ସ୍ଥାନ",
    phone: "ଫୋନ",
  },

  as: {
    title: "লজিষ্টিক্স ড্যাশব'ৰ্ড",
    subtitle: "পৰিবহন, ডেলিভাৰী আৰু অৰ্ডাৰ পৰিচালনা কৰক",
    welcome: "স্বাগতম",
    buyerRequests: "ক্ৰেতা ডেলিভাৰী",
    buyerRequestsDesc: "পৰিবহনৰ বাবে সাজু অনুমোদিত শস্য ক্ৰয় অনুৰোধ",
    processorRequests: "প্ৰচেছৰ ডেলিভাৰী",
    processorRequestsDesc:
      "পৰিবহনৰ বাবে সাজু অনুমোদিত কৃষি আৱৰ্জনা ক্ৰয়",
    mandiDelivery: "মাণ্ডি ডেলিভাৰী",
    mandiDeliveryDesc: "কৃষকৰ শস্য নিৰ্বাচিত মাণ্ডিলৈ লৈ যাওক",
    orders: "লজিষ্টিক্স অৰ্ডাৰ",
    ordersDesc: "সকলো পৰিবহন অৰ্ডাৰ অনুসৰণ কৰক",
    profile: "লজিষ্টিক্স প্ৰফাইল",
    profileDesc: "পৰিবহন আৰু ড্ৰাইভাৰৰ তথ্য পৰিচালনা কৰক",
    talkAi: "AI ৰ সৈতে কথা পাতক",
    talkAiDesc: "ভইচৰ জৰিয়তে KrishiMitra ক সোধক",
    viewBuyerRequests: "ক্ৰেতাৰ অনুৰোধ চাওক",
    viewProcessorRequests: "প্ৰচেছৰৰ অনুৰোধ চাওক",
    openLogistics: "লজিষ্টিক্স খোলক",
    editProfile: "প্ৰফাইল সম্পাদনা কৰক",
    totalRequests: "মুঠ অনুৰোধ",
    activeOrders: "সক্ৰিয় অৰ্ডাৰ",
    mandi: "মাণ্ডি",
    noMandi: "কোনো মাণ্ডি নিৰ্বাচিত হোৱা নাই।",
    noBuyerRequests: "কোনো অনুমোদিত ক্ৰেতাৰ অনুৰোধ নাই।",
    noProcessorRequests: "কোনো অনুমোদিত প্ৰচেছৰৰ অনুৰোধ নাই।",
    noOrders: "কোনো লজিষ্টিক্স অৰ্ডাৰ নাই।",
    farmer: "কৃষক",
    buyer: "ক্ৰেতা",
    processor: "প্ৰচেছৰ",
    crop: "শস্য",
    waste: "আৱৰ্জনা",
    quantity: "পৰিমাণ",
    pickup: "পিকআপ",
    delivery: "ডেলিভাৰী",
    vehicle: "যান",
    driver: "ড্ৰাইভাৰ",
    status: "স্থিতি",
    accepted: "গ্ৰহণ কৰা হৈছে",
    pending: "অপেক্ষাৰত",
    logout: "লগআউট",
    business: "ব্যৱসায়",
    location: "স্থান",
    phone: "ফোন",
  },

  ur: {
    title: "لاجسٹکس ڈیش بورڈ",
    subtitle: "ٹرانسپورٹ، ڈیلیوری اور آرڈرز کا انتظام کریں",
    welcome: "خوش آمدید",
    buyerRequests: "خریدار ڈیلیوری",
    buyerRequestsDesc:
      "ٹرانسپورٹ کے لیے تیار منظور شدہ فصل خریداری کی درخواستیں",
    processorRequests: "پروسیسر ڈیلیوری",
    processorRequestsDesc:
      "ٹرانسپورٹ کے لیے تیار منظور شدہ زرعی فضلہ خریداری",
    mandiDelivery: "منڈی ڈیلیوری",
    mandiDeliveryDesc: "کسان کی فصل منتخب منڈی تک پہنچائیں",
    orders: "لاجسٹکس آرڈرز",
    ordersDesc: "تمام ٹرانسپورٹ آرڈرز ٹریک کریں",
    profile: "لاجسٹکس پروفائل",
    profileDesc: "ٹرانسپورٹ اور ڈرائیور کی معلومات کا انتظام کریں",
    talkAi: "AI سے بات کریں",
    talkAiDesc: "آواز کے ذریعے KrishiMitra سے سوال کریں",
    viewBuyerRequests: "خریدار درخواستیں دیکھیں",
    viewProcessorRequests: "پروسیسر درخواستیں دیکھیں",
    openLogistics: "لاجسٹکس کھولیں",
    editProfile: "پروفائل میں ترمیم",
    totalRequests: "کل درخواستیں",
    activeOrders: "فعال آرڈرز",
    mandi: "منڈی",
    noMandi: "ابھی کوئی منڈی منتخب نہیں کی گئی۔",
    noBuyerRequests: "کوئی منظور شدہ خریدار درخواست نہیں۔",
    noProcessorRequests: "کوئی منظور شدہ پروسیسر درخواست نہیں۔",
    noOrders: "ابھی کوئی لاجسٹکس آرڈر نہیں۔",
    farmer: "کسان",
    buyer: "خریدار",
    processor: "پروسیسر",
    crop: "فصل",
    waste: "فضلہ",
    quantity: "مقدار",
    pickup: "پک اپ",
    delivery: "ڈیلیوری",
    vehicle: "گاڑی",
    driver: "ڈرائیور",
    status: "حالت",
    accepted: "منظور شدہ",
    pending: "زیر التوا",
    logout: "لاگ آؤٹ",
    business: "کاروبار",
    location: "مقام",
    phone: "فون",
  },
};

export default function LogisticsDashboardPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const text = textData[language];

  const [profile, setProfile] = useState<LogisticsProfile>({});
  const [buyerRequests, setBuyerRequests] = useState<BuyRequest[]>([]);
  const [processorRequests, setProcessorRequests] = useState<
    WasteBuyRequest[]
  >([]);
  const [selectedMandi, setSelectedMandi] =
    useState<SelectedMandi | null>(null);
  const [orders, setOrders] = useState<LogisticsOrder[]>([]);

  useEffect(() => {
    const loadData = () => {
      try {
        const savedProfile =
          localStorage.getItem("logisticsProfile");

        const savedBuyerRequests =
          localStorage.getItem("buyRequests");

        const savedProcessorRequests =
          localStorage.getItem("wasteBuyRequests");

        const savedMandi =
          localStorage.getItem("selectedMandi");

        const savedOrders =
          localStorage.getItem("logisticsOrders");

        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }

        if (savedBuyerRequests) {
          const allRequests: BuyRequest[] =
            JSON.parse(savedBuyerRequests);

          setBuyerRequests(
            allRequests.filter(
              (request) => request.status === "accepted"
            )
          );
        }

        if (savedProcessorRequests) {
          const allRequests: WasteBuyRequest[] =
            JSON.parse(savedProcessorRequests);

          setProcessorRequests(
            allRequests.filter(
              (request) =>
                request.status === "accepted" &&
                request.logisticsReady !== false
            )
          );
        }

        if (savedMandi) {
          setSelectedMandi(JSON.parse(savedMandi));
        }

        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch {
        setProfile({});
        setBuyerRequests([]);
        setProcessorRequests([]);
        setSelectedMandi(null);
        setOrders([]);
      }
    };

    loadData();

    const interval = window.setInterval(loadData, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const logisticsName = useMemo(
    () => profile.businessName || profile.name || "Logistic",
    [profile]
  );

  const totalRequests =
    buyerRequests.length + processorRequests.length;

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "delivered" &&
      order.status !== "completed"
  ).length;

  const location =
    profile.serviceArea ||
    profile.village ||
    profile.district ||
    profile.state ||
    "—";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/auth");
  };

  return (
    <main
      dir={language === "ur" ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 text-sm font-bold text-green-700">
              KrishiMitra
            </div>

            <h1 className="text-2xl font-extrabold text-black sm:text-3xl">
              {text.welcome}, {logisticsName} 🚚
            </h1>

            <p className="mt-1 text-sm font-medium text-black">
              {text.subtitle}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => router.push("/profile")}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-black hover:bg-slate-50"
            >
              👤 {text.profile}
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
            >
              {text.logout}
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-3 text-3xl">📦</div>

            <p className="text-sm font-semibold text-black">
              {text.totalRequests}
            </p>

            <p className="mt-1 text-3xl font-extrabold text-black">
              {totalRequests}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-3 text-3xl">🚚</div>

            <p className="text-sm font-semibold text-black">
              {text.activeOrders}
            </p>

            <p className="mt-1 text-3xl font-extrabold text-black">
              {activeOrders}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-3 text-3xl">🌾</div>

            <p className="text-sm font-semibold text-black">
              {text.mandi}
            </p>

            <p className="mt-1 text-lg font-extrabold text-black">
              {selectedMandi?.name || "—"}
            </p>
          </div>

        </div>

        {/* TWO MAIN CARDS */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* BUYER DELIVERIES */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between gap-3">

              <div>
                <div className="mb-2 text-3xl">🛒🚚</div>

                <h2 className="text-xl font-extrabold text-black">
                  {text.buyerRequests}
                </h2>

                <p className="mt-1 text-sm font-medium text-black">
                  {text.buyerRequestsDesc}
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-blue-700">
                {buyerRequests.length}
              </span>

            </div>

            {buyerRequests.length > 0 && (
              <div className="mt-4 space-y-2">

                {buyerRequests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    className="rounded-2xl bg-slate-50 p-3 text-sm"
                  >
                    <p className="font-extrabold text-black">
                      {request.crop}
                    </p>

                    <p className="font-bold text-black">
                      {text.farmer}: {request.farmerName}
                    </p>

                    <p className="text-xs font-bold text-black">
                      {request.farmerLocation} →{" "}
                      {request.buyerLocation}
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-black">
                      {text.quantity}: {request.quantity}{" "}
                      {request.unit}
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-black">
                      Price: ₹{request.price}
                    </p>
                  </div>
                ))}

              </div>
            )}

            <button
              onClick={() => router.push("/logistic")}
              className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700"
            >
              {text.viewBuyerRequests} →
            </button>

          </section>

          {/* PROCESSOR DELIVERIES */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between gap-3">

              <div>
                <div className="mb-2 text-3xl">🏭🚚</div>

                <h2 className="text-xl font-extrabold text-black">
                  {text.processorRequests}
                </h2>

                <p className="mt-1 text-sm font-medium text-black">
                  {text.processorRequestsDesc}
                </p>
              </div>

              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-extrabold text-purple-700">
                {processorRequests.length}
              </span>

            </div>

            {processorRequests.length > 0 && (
              <div className="mt-4 space-y-2">

                {processorRequests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    className="rounded-2xl bg-slate-50 p-3 text-sm"
                  >
                    <p className="font-extrabold text-black">
                      {request.wasteType}
                    </p>

                    <p className="font-bold text-black">
                      {text.farmer}: {request.farmerName}
                    </p>

                    <p className="text-xs font-bold text-black">
                      {request.farmerLocation} →{" "}
                      {request.processorLocation}
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-black">
                      {text.quantity}: {request.quantity}{" "}
                      {request.unit}
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-black">
                      Price: ₹{request.price}
                    </p>
                  </div>
                ))}

              </div>
            )}

            <button
              onClick={() => router.push("/logistic")}
              className="mt-5 w-full rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-700"
            >
              {text.viewProcessorRequests} →
            </button>

          </section>

          {/* MANDI */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="mb-2 text-3xl">🌾🏪</div>

            <h2 className="text-xl font-extrabold text-black">
              {text.mandiDelivery}
            </h2>

            <p className="mt-1 text-sm font-medium text-black">
              {text.mandiDeliveryDesc}
            </p>

            {selectedMandi ? (
              <div className="mt-4 rounded-2xl bg-green-50 p-4">

                <p className="font-extrabold text-green-950">
                  {selectedMandi.name}
                </p>

                <p className="mt-1 text-sm font-bold text-green-950">
                  📍{" "}
                  {selectedMandi.address ||
                    `${selectedMandi.district || ""}, ${
                      selectedMandi.state || ""
                    }`}
                </p>

                {selectedMandi.crop && (
                  <p className="mt-1 text-sm font-extrabold text-green-950">
                    🌾 {selectedMandi.crop}
                  </p>
                )}

                {selectedMandi.quantity !== undefined && (
                  <p className="mt-1 text-sm font-extrabold text-green-950">
                    📦 {text.quantity}: {selectedMandi.quantity}{" "}
                    {selectedMandi.unit || ""}
                  </p>
                )}

              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-black">
                {text.noMandi}
              </div>
            )}

            <button
              onClick={() => router.push("/logistic")}
              className="mt-5 w-full rounded-xl bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700"
            >
              {text.openLogistics} →
            </button>

          </section>

          {/* PROFILE */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="mb-2 text-3xl">🚛</div>

            <h2 className="text-xl font-extrabold text-black">
              {text.profile}
            </h2>

            <p className="mt-1 text-sm font-medium text-black">
              {text.profileDesc}
            </p>

            <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 text-sm">

              <p className="font-semibold text-black">
                <span className="font-extrabold text-black">
                  {text.business}:{" "}
                </span>

                <span className="font-bold text-black">
                  {profile.businessName ||
                    profile.name ||
                    "—"}
                </span>
              </p>

              <p className="font-extrabold text-black">
                📍 {text.location}: {location}
              </p>

              <p className="font-extrabold text-black">
                🚛 {text.vehicle}:{" "}
                {profile.vehicleType || "—"}
              </p>

              <p className="font-extrabold text-black">
                👨‍✈️ {text.driver}:{" "}
                {profile.driverName || "—"}
              </p>

              <p className="font-extrabold text-black">
                📞 {text.phone}:{" "}
                {profile.phone ||
                  profile.driverPhone ||
                  "—"}
              </p>

            </div>

            <button
              onClick={() => router.push("/profile")}
              className="mt-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-black hover:bg-slate-50"
            >
              {text.editProfile} →
            </button>

          </section>

        </div>

        {/* AI */}
        <section className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-2 text-4xl">
                🤖🎤
              </div>

              <h2 className="text-2xl font-bold">
                {text.talkAi}
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-green-50">
                {text.talkAiDesc}
              </p>
            </div>

            <button
              onClick={() => router.push("/ai")}
              className="rounded-2xl bg-white px-6 py-3 font-bold text-green-700 shadow-sm hover:bg-green-50"
            >
              {text.talkAi} →
            </button>

          </div>

        </section>

        {/* ORDERS */}
        <section className="mt-5 rounded-3xl bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-xl font-extrabold text-black">
              {text.orders}
            </h2>

            <span className="text-sm font-extrabold text-black">
              {orders.length}
            </span>

          </div>

          {orders.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-6 text-center text-sm font-semibold text-black">
              {text.noOrders}
            </div>
          ) : (
            <div className="space-y-3">

              {orders.slice(0, 8).map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="font-extrabold text-black">
                        {order.crop}
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-black">
                        {text.farmer}: {order.farmerName}
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-black">
                        📦 {text.quantity}: {order.quantity}{" "}
                        {order.unit}
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-black">
                        💰 Price: ₹{order.price}
                      </p>

                      <p className="mt-1 text-xs font-extrabold text-black">
                        📍 {order.pickupLocation} →{" "}
                        {order.deliveryLocation}
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-black">
                        🚛 {text.vehicle}: {order.vehicleType}
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-black">
                        👨‍✈️ {text.driver}: {order.driverName}
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-black">
                        📞 {text.phone}: {order.driverPhone}
                      </p>

                    </div>

                    <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-extrabold text-orange-700">
                      {order.status || text.pending}
                    </span>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}