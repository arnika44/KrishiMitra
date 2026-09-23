"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../lib/language";

type WasteListing = {
  id: string;
  farmerName: string;
  wasteType: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  createdAt?: string;
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

type ProcessorProfile = {
  name?: string;
  businessName?: string;
  phone?: string;
  processingType?: string;
  materialRequired?: string;
  processingLocation?: string;
  buyingLocation?: string;
  state?: string;
  district?: string;
  village?: string;
};

const textData: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    welcome: string;
    wasteListings: string;
    wasteListingsDesc: string;
    requests: string;
    requestsDesc: string;
    orders: string;
    ordersDesc: string;
    profile: string;
    profileDesc: string;
    talkAi: string;
    talkAiDesc: string;
    browseWaste: string;
    viewRequests: string;
    viewOrders: string;
    editProfile: string;
    totalListings: string;
    totalRequests: string;
    activeOrders: string;
    pending: string;
    accepted: string;
    rejected: string;
    noListings: string;
    noRequests: string;
    noOrders: string;
    logout: string;
    business: string;
    location: string;
    phone: string;
  }
> = {
  en: {
    title: "Processor Dashboard",
    subtitle: "Manage agricultural waste purchases and processing",
    welcome: "Welcome",
    wasteListings: "Available Waste",
    wasteListingsDesc: "Browse agricultural waste listed by farmers",
    requests: "Purchase Requests",
    requestsDesc: "Track your waste purchase requests",
    orders: "My Orders",
    ordersDesc: "Track accepted purchases and logistics",
    profile: "Processor Profile",
    profileDesc: "Manage your processing business details",
    talkAi: "Talk to AI",
    talkAiDesc: "Ask KrishiMitra anything using voice",
    browseWaste: "Browse Waste",
    viewRequests: "View Requests",
    viewOrders: "View Orders",
    editProfile: "Edit Profile",
    totalListings: "Waste Listings",
    totalRequests: "Total Requests",
    activeOrders: "Active Orders",
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    noListings: "No waste listings available.",
    noRequests: "No purchase requests yet.",
    noOrders: "No orders yet.",
    logout: "Logout",
    business: "Business",
    location: "Location",
    phone: "Phone",
  },

  hi: {
    title: "प्रोसेसर डैशबोर्ड",
    subtitle: "कृषि अपशिष्ट खरीद और प्रोसेसिंग मैनेज करें",
    welcome: "स्वागत है",
    wasteListings: "उपलब्ध अपशिष्ट",
    wasteListingsDesc: "किसानों द्वारा लिस्ट किया गया कृषि अपशिष्ट देखें",
    requests: "खरीद रिक्वेस्ट",
    requestsDesc: "अपनी अपशिष्ट खरीद रिक्वेस्ट ट्रैक करें",
    orders: "मेरे ऑर्डर",
    ordersDesc: "स्वीकृत खरीद और लॉजिस्टिक्स ट्रैक करें",
    profile: "प्रोसेसर प्रोफाइल",
    profileDesc: "अपने प्रोसेसिंग बिजनेस की जानकारी मैनेज करें",
    talkAi: "AI से बात करें",
    talkAiDesc: "आवाज़ से KrishiMitra से सवाल पूछें",
    browseWaste: "अपशिष्ट देखें",
    viewRequests: "रिक्वेस्ट देखें",
    viewOrders: "ऑर्डर देखें",
    editProfile: "प्रोफाइल एडिट करें",
    totalListings: "अपशिष्ट लिस्टिंग",
    totalRequests: "कुल रिक्वेस्ट",
    activeOrders: "एक्टिव ऑर्डर",
    pending: "पेंडिंग",
    accepted: "स्वीकृत",
    rejected: "अस्वीकृत",
    noListings: "अभी कोई अपशिष्ट लिस्टिंग नहीं है।",
    noRequests: "अभी कोई खरीद रिक्वेस्ट नहीं है।",
    noOrders: "अभी कोई ऑर्डर नहीं है।",
    logout: "लॉगआउट",
    business: "बिजनेस",
    location: "स्थान",
    phone: "फोन",
  },

  bn: {
    title: "প্রসেসর ড্যাশবোর্ড",
    subtitle: "কৃষি বর্জ্য ক্রয় এবং প্রক্রিয়াকরণ পরিচালনা করুন",
    welcome: "স্বাগতম",
    wasteListings: "উপলব্ধ বর্জ্য",
    wasteListingsDesc: "কৃষকদের তালিকাভুক্ত কৃষি বর্জ্য দেখুন",
    requests: "ক্রয় অনুরোধ",
    requestsDesc: "আপনার বর্জ্য ক্রয় অনুরোধ ট্র্যাক করুন",
    orders: "আমার অর্ডার",
    ordersDesc: "অনুমোদিত ক্রয় এবং লজিস্টিক্স ট্র্যাক করুন",
    profile: "প্রসেসর প্রোফাইল",
    profileDesc: "প্রসেসিং ব্যবসার তথ্য পরিচালনা করুন",
    talkAi: "AI-এর সাথে কথা বলুন",
    talkAiDesc: "ভয়েস ব্যবহার করে KrishiMitra-কে প্রশ্ন করুন",
    browseWaste: "বর্জ্য দেখুন",
    viewRequests: "অনুরোধ দেখুন",
    viewOrders: "অর্ডার দেখুন",
    editProfile: "প্রোফাইল সম্পাদনা",
    totalListings: "বর্জ্য তালিকা",
    totalRequests: "মোট অনুরোধ",
    activeOrders: "সক্রিয় অর্ডার",
    pending: "অপেক্ষমাণ",
    accepted: "গৃহীত",
    rejected: "প্রত্যাখ্যাত",
    noListings: "কোনো বর্জ্য তালিকা নেই।",
    noRequests: "কোনো ক্রয় অনুরোধ নেই।",
    noOrders: "কোনো অর্ডার নেই।",
    logout: "লগআউট",
    business: "ব্যবসা",
    location: "অবস্থান",
    phone: "ফোন",
  },

  mr: {
    title: "प्रोसेसर डॅशबोर्ड",
    subtitle: "कृषी कचरा खरेदी आणि प्रक्रिया व्यवस्थापित करा",
    welcome: "स्वागत",
    wasteListings: "उपलब्ध कचरा",
    wasteListingsDesc: "शेतकऱ्यांनी सूचीबद्ध केलेला कृषी कचरा पहा",
    requests: "खरेदी विनंत्या",
    requestsDesc: "तुमच्या कचरा खरेदी विनंत्या ट्रॅक करा",
    orders: "माझे ऑर्डर",
    ordersDesc: "स्वीकृत खरेदी आणि लॉजिस्टिक्स ट्रॅक करा",
    profile: "प्रोसेसर प्रोफाइल",
    profileDesc: "प्रोसेसिंग व्यवसायाची माहिती व्यवस्थापित करा",
    talkAi: "AI शी बोला",
    talkAiDesc: "आवाजाने KrishiMitra ला प्रश्न विचारा",
    browseWaste: "कचरा पहा",
    viewRequests: "विनंत्या पहा",
    viewOrders: "ऑर्डर पहा",
    editProfile: "प्रोफाइल संपादित करा",
    totalListings: "कचरा लिस्टिंग",
    totalRequests: "एकूण विनंत्या",
    activeOrders: "सक्रिय ऑर्डर",
    pending: "प्रलंबित",
    accepted: "स्वीकृत",
    rejected: "नाकारले",
    noListings: "कचरा लिस्टिंग उपलब्ध नाही.",
    noRequests: "खरेदी विनंत्या नाहीत.",
    noOrders: "ऑर्डर नाहीत.",
    logout: "लॉगआउट",
    business: "व्यवसाय",
    location: "स्थान",
    phone: "फोन",
  },

  ta: {
    title: "செயலாக்க டாஷ்போர்டு",
    subtitle: "விவசாய கழிவு கொள்முதல் மற்றும் செயலாக்கத்தை நிர்வகிக்கவும்",
    welcome: "வரவேற்கிறோம்",
    wasteListings: "கிடைக்கும் கழிவுகள்",
    wasteListingsDesc: "விவசாயிகள் பட்டியலிட்ட கழிவுகளைப் பார்க்கவும்",
    requests: "கொள்முதல் கோரிக்கைகள்",
    requestsDesc: "கழிவு கொள்முதல் கோரிக்கைகளை கண்காணிக்கவும்",
    orders: "எனது ஆர்டர்கள்",
    ordersDesc: "ஏற்றுக்கொள்ளப்பட்ட கொள்முதல் மற்றும் லாஜிஸ்டிக்ஸைக் கண்காணிக்கவும்",
    profile: "செயலாக்க சுயவிவரம்",
    profileDesc: "செயலாக்க வணிக விவரங்களை நிர்வகிக்கவும்",
    talkAi: "AI உடன் பேசுங்கள்",
    talkAiDesc: "குரல் மூலம் KrishiMitra-விடம் கேளுங்கள்",
    browseWaste: "கழிவுகளைப் பார்க்கவும்",
    viewRequests: "கோரிக்கைகளைப் பார்க்கவும்",
    viewOrders: "ஆர்டர்களைப் பார்க்கவும்",
    editProfile: "சுயவிவரத்தைத் திருத்தவும்",
    totalListings: "கழிவு பட்டியல்கள்",
    totalRequests: "மொத்த கோரிக்கைகள்",
    activeOrders: "செயலில் உள்ள ஆர்டர்கள்",
    pending: "நிலுவையில்",
    accepted: "ஏற்றுக்கொள்ளப்பட்டது",
    rejected: "நிராகரிக்கப்பட்டது",
    noListings: "கழிவு பட்டியல்கள் இல்லை.",
    noRequests: "கொள்முதல் கோரிக்கைகள் இல்லை.",
    noOrders: "ஆர்டர்கள் இல்லை.",
    logout: "வெளியேறு",
    business: "வணிகம்",
    location: "இடம்",
    phone: "தொலைபேசி",
  },

  te: {
    title: "ప్రాసెసర్ డాష్‌బోర్డ్",
    subtitle: "వ్యవసాయ వ్యర్థాల కొనుగోలు మరియు ప్రాసెసింగ్ నిర్వహించండి",
    welcome: "స్వాగతం",
    wasteListings: "అందుబాటులో ఉన్న వ్యర్థాలు",
    wasteListingsDesc: "రైతులు జాబితా చేసిన వ్యవసాయ వ్యర్థాలను చూడండి",
    requests: "కొనుగోలు అభ్యర్థనలు",
    requestsDesc: "వ్యర్థాల కొనుగోలు అభ్యర్థనలను ట్రాక్ చేయండి",
    orders: "నా ఆర్డర్లు",
    ordersDesc: "ఆమోదించిన కొనుగోళ్లు మరియు లాజిస్టిక్స్ ట్రాక్ చేయండి",
    profile: "ప్రాసెసర్ ప్రొఫైల్",
    profileDesc: "ప్రాసెసింగ్ వ్యాపార వివరాలను నిర్వహించండి",
    talkAi: "AIతో మాట్లాడండి",
    talkAiDesc: "వాయిస్ ద్వారా KrishiMitraని అడగండి",
    browseWaste: "వ్యర్థాలను చూడండి",
    viewRequests: "అభ్యర్థనలు చూడండి",
    viewOrders: "ఆర్డర్లు చూడండి",
    editProfile: "ప్రొఫైల్ మార్చండి",
    totalListings: "వ్యర్థ లిస్టింగ్స్",
    totalRequests: "మొత్తం అభ్యర్థనలు",
    activeOrders: "యాక్టివ్ ఆర్డర్లు",
    pending: "పెండింగ్",
    accepted: "ఆమోదించబడింది",
    rejected: "తిరస్కరించబడింది",
    noListings: "వ్యర్థ లిస్టింగ్స్ లేవు.",
    noRequests: "కొనుగోలు అభ్యర్థనలు లేవు.",
    noOrders: "ఆర్డర్లు లేవు.",
    logout: "లాగ్ అవుట్",
    business: "వ్యాపారం",
    location: "స్థానం",
    phone: "ఫోన్",
  },

  gu: {
    title: "પ્રોસેસર ડેશબોર્ડ",
    subtitle: "કૃષિ કચરાની ખરીદી અને પ્રોસેસિંગ મેનેજ કરો",
    welcome: "સ્વાગત",
    wasteListings: "ઉપલબ્ધ કચરો",
    wasteListingsDesc: "ખેડૂતો દ્વારા સૂચિબદ્ધ કૃષિ કચરો જુઓ",
    requests: "ખરીદી વિનંતીઓ",
    requestsDesc: "કચરાની ખરીદીની વિનંતીઓ ટ્રેક કરો",
    orders: "મારા ઓર્ડર",
    ordersDesc: "સ્વીકૃત ખરીદી અને લોજિસ્ટિક્સ ટ્રેક કરો",
    profile: "પ્રોસેસર પ્રોફાઇલ",
    profileDesc: "પ્રોસેસિંગ વ્યવસાયની માહિતી મેનેજ કરો",
    talkAi: "AI સાથે વાત કરો",
    talkAiDesc: "અવાજથી KrishiMitra ને પ્રશ્ન પૂછો",
    browseWaste: "કચરો જુઓ",
    viewRequests: "વિનંતીઓ જુઓ",
    viewOrders: "ઓર્ડર જુઓ",
    editProfile: "પ્રોફાઇલ એડિટ કરો",
    totalListings: "કચરા લિસ્ટિંગ",
    totalRequests: "કુલ વિનંતીઓ",
    activeOrders: "સક્રિય ઓર્ડર",
    pending: "બાકી",
    accepted: "સ્વીકારેલ",
    rejected: "નકારેલ",
    noListings: "કોઈ કચરા લિસ્ટિંગ નથી.",
    noRequests: "કોઈ ખરીદી વિનંતી નથી.",
    noOrders: "કોઈ ઓર્ડર નથી.",
    logout: "લૉગઆઉટ",
    business: "વ્યવસાય",
    location: "સ્થાન",
    phone: "ફોન",
  },

  kn: {
    title: "ಪ್ರೊಸೆಸರ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    subtitle: "ಕೃಷಿ ತ್ಯಾಜ್ಯ ಖರೀದಿ ಮತ್ತು ಸಂಸ್ಕರಣೆಯನ್ನು ನಿರ್ವಹಿಸಿ",
    welcome: "ಸ್ವಾಗತ",
    wasteListings: "ಲಭ್ಯವಿರುವ ತ್ಯಾಜ್ಯ",
    wasteListingsDesc: "ರೈತರು ಪಟ್ಟಿ ಮಾಡಿದ ಕೃಷಿ ತ್ಯಾಜ್ಯವನ್ನು ನೋಡಿ",
    requests: "ಖರೀದಿ ವಿನಂತಿಗಳು",
    requestsDesc: "ತ್ಯಾಜ್ಯ ಖರೀದಿ ವಿನಂತಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    orders: "ನನ್ನ ಆರ್ಡರ್‌ಗಳು",
    ordersDesc: "ಸ್ವೀಕರಿಸಿದ ಖರೀದಿ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    profile: "ಪ್ರೊಸೆಸರ್ ಪ್ರೊಫೈಲ್",
    profileDesc: "ಸಂಸ್ಕರಣಾ ವ್ಯವಹಾರದ ವಿವರಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    talkAi: "AI ಜೊತೆ ಮಾತನಾಡಿ",
    talkAiDesc: "ಧ್ವನಿಯ ಮೂಲಕ KrishiMitra ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ",
    browseWaste: "ತ್ಯಾಜ್ಯ ನೋಡಿ",
    viewRequests: "ವಿನಂತಿಗಳನ್ನು ನೋಡಿ",
    viewOrders: "ಆರ್ಡರ್‌ಗಳನ್ನು ನೋಡಿ",
    editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    totalListings: "ತ್ಯಾಜ್ಯ ಲಿಸ್ಟಿಂಗ್‌ಗಳು",
    totalRequests: "ಒಟ್ಟು ವಿನಂತಿಗಳು",
    activeOrders: "ಸಕ್ರಿಯ ಆರ್ಡರ್‌ಗಳು",
    pending: "ಬಾಕಿ",
    accepted: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
    rejected: "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
    noListings: "ತ್ಯಾಜ್ಯ ಲಿಸ್ಟಿಂಗ್‌ಗಳು ಇಲ್ಲ.",
    noRequests: "ಖರೀದಿ ವಿನಂತಿಗಳು ಇಲ್ಲ.",
    noOrders: "ಆರ್ಡರ್‌ಗಳು ಇಲ್ಲ.",
    logout: "ಲಾಗ್‌ಔಟ್",
    business: "ವ್ಯವಹಾರ",
    location: "ಸ್ಥಳ",
    phone: "ಫೋನ್",
  },

  ml: {
    title: "പ്രോസസർ ഡാഷ്ബോർഡ്",
    subtitle: "കാർഷിക മാലിന്യ വാങ്ങലും പ്രോസസ്സിംഗും നിയന്ത്രിക്കുക",
    welcome: "സ്വാഗതം",
    wasteListings: "ലഭ്യമായ മാലിന്യം",
    wasteListingsDesc: "കർഷകർ ലിസ്റ്റ് ചെയ്ത കാർഷിക മാലിന്യങ്ങൾ കാണുക",
    requests: "വാങ്ങൽ അഭ്യർത്ഥനകൾ",
    requestsDesc: "മാലിന്യ വാങ്ങൽ അഭ്യർത്ഥനകൾ ട്രാക്ക് ചെയ്യുക",
    orders: "എന്റെ ഓർഡറുകൾ",
    ordersDesc: "അംഗീകരിച്ച വാങ്ങലുകളും ലോജിസ്റ്റിക്സും ട്രാക്ക് ചെയ്യുക",
    profile: "പ്രോസസർ പ്രൊഫൈൽ",
    profileDesc: "പ്രോസസ്സിംഗ് ബിസിനസ് വിവരങ്ങൾ നിയന്ത്രിക്കുക",
    talkAi: "AI-യോട് സംസാരിക്കുക",
    talkAiDesc: "വോയ്സ് ഉപയോഗിച്ച് KrishiMitra-യോട് ചോദിക്കുക",
    browseWaste: "മാലിന്യം കാണുക",
    viewRequests: "അഭ്യർത്ഥനകൾ കാണുക",
    viewOrders: "ഓർഡറുകൾ കാണുക",
    editProfile: "പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക",
    totalListings: "മാലിന്യ ലിസ്റ്റിംഗുകൾ",
    totalRequests: "മൊത്തം അഭ്യർത്ഥനകൾ",
    activeOrders: "സജീവ ഓർഡറുകൾ",
    pending: "തീർപ്പാക്കാത്തത്",
    accepted: "അംഗീകരിച്ചു",
    rejected: "നിരസിച്ചു",
    noListings: "മാലിന്യ ലിസ്റ്റിംഗുകൾ ഇല്ല.",
    noRequests: "വാങ്ങൽ അഭ്യർത്ഥനകൾ ഇല്ല.",
    noOrders: "ഓർഡറുകൾ ഇല്ല.",
    logout: "ലോഗൗട്ട്",
    business: "ബിസിനസ്",
    location: "സ്ഥലം",
    phone: "ഫോൺ",
  },

  pa: {
    title: "ਪ੍ਰੋਸੈਸਰ ਡੈਸ਼ਬੋਰਡ",
    subtitle: "ਖੇਤੀਬਾੜੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀ ਖਰੀਦ ਅਤੇ ਪ੍ਰੋਸੈਸਿੰਗ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ",
    welcome: "ਜੀ ਆਇਆਂ ਨੂੰ",
    wasteListings: "ਉਪਲਬਧ ਰਹਿੰਦ-ਖੂੰਹਦ",
    wasteListingsDesc: "ਕਿਸਾਨਾਂ ਵੱਲੋਂ ਲਿਸਟ ਕੀਤੀ ਖੇਤੀਬਾੜੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਵੇਖੋ",
    requests: "ਖਰੀਦ ਬੇਨਤੀਆਂ",
    requestsDesc: "ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀਆਂ ਖਰੀਦ ਬੇਨਤੀਆਂ ਟ੍ਰੈਕ ਕਰੋ",
    orders: "ਮੇਰੇ ਆਰਡਰ",
    ordersDesc: "ਮਨਜ਼ੂਰ ਖਰੀਦ ਅਤੇ ਲੌਜਿਸਟਿਕਸ ਟ੍ਰੈਕ ਕਰੋ",
    profile: "ਪ੍ਰੋਸੈਸਰ ਪ੍ਰੋਫਾਈਲ",
    profileDesc: "ਪ੍ਰੋਸੈਸਿੰਗ ਕਾਰੋਬਾਰ ਦੀ ਜਾਣਕਾਰੀ ਪ੍ਰਬੰਧਿਤ ਕਰੋ",
    talkAi: "AI ਨਾਲ ਗੱਲ ਕਰੋ",
    talkAiDesc: "ਆਵਾਜ਼ ਰਾਹੀਂ KrishiMitra ਨੂੰ ਪੁੱਛੋ",
    browseWaste: "ਰਹਿੰਦ-ਖੂੰਹਦ ਵੇਖੋ",
    viewRequests: "ਬੇਨਤੀਆਂ ਵੇਖੋ",
    viewOrders: "ਆਰਡਰ ਵੇਖੋ",
    editProfile: "ਪ੍ਰੋਫਾਈਲ ਸੋਧੋ",
    totalListings: "ਰਹਿੰਦ-ਖੂੰਹਦ ਲਿਸਟਿੰਗ",
    totalRequests: "ਕੁੱਲ ਬੇਨਤੀਆਂ",
    activeOrders: "ਸਰਗਰਮ ਆਰਡਰ",
    pending: "ਬਕਾਇਆ",
    accepted: "ਮਨਜ਼ੂਰ",
    rejected: "ਰੱਦ",
    noListings: "ਕੋਈ ਰਹਿੰਦ-ਖੂੰਹਦ ਲਿਸਟਿੰਗ ਨਹੀਂ ਹੈ।",
    noRequests: "ਕੋਈ ਖਰੀਦ ਬੇਨਤੀ ਨਹੀਂ ਹੈ।",
    noOrders: "ਕੋਈ ਆਰਡਰ ਨਹੀਂ ਹੈ।",
    logout: "ਲੌਗਆਉਟ",
    business: "ਕਾਰੋਬਾਰ",
    location: "ਟਿਕਾਣਾ",
    phone: "ਫੋਨ",
  },

  or: {
    title: "ପ୍ରୋସେସର ଡ୍ୟାସବୋର୍ଡ",
    subtitle: "କୃଷି ବର୍ଜ୍ୟ କ୍ରୟ ଏବଂ ପ୍ରକ୍ରିୟାକରଣ ପରିଚାଳନା କରନ୍ତୁ",
    welcome: "ସ୍ୱାଗତ",
    wasteListings: "ଉପଲବ୍ଧ ବର୍ଜ୍ୟ",
    wasteListingsDesc: "ଚାଷୀମାନଙ୍କ ଦ୍ୱାରା ତାଲିକାଭୁକ୍ତ ବର୍ଜ୍ୟ ଦେଖନ୍ତୁ",
    requests: "କ୍ରୟ ଅନୁରୋଧ",
    requestsDesc: "ବର୍ଜ୍ୟ କ୍ରୟ ଅନୁରୋଧ ଟ୍ରାକ୍ କରନ୍ତୁ",
    orders: "ମୋର ଅର୍ଡର",
    ordersDesc: "ସ୍ୱୀକୃତ କ୍ରୟ ଏବଂ ଲଜିଷ୍ଟିକ୍ସ ଟ୍ରାକ୍ କରନ୍ତୁ",
    profile: "ପ୍ରୋସେସର ପ୍ରୋଫାଇଲ୍",
    profileDesc: "ପ୍ରକ୍ରିୟାକରଣ ବ୍ୟବସାୟ ସୂଚନା ପରିଚାଳନା କରନ୍ତୁ",
    talkAi: "AI ସହିତ କଥା ହୁଅନ୍ତୁ",
    talkAiDesc: "ଭଏସ୍ ଦ୍ୱାରା KrishiMitra କୁ ପଚାରନ୍ତୁ",
    browseWaste: "ବର୍ଜ୍ୟ ଦେଖନ୍ତୁ",
    viewRequests: "ଅନୁରୋଧ ଦେଖନ୍ତୁ",
    viewOrders: "ଅର୍ଡର ଦେଖନ୍ତୁ",
    editProfile: "ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନା",
    totalListings: "ବର୍ଜ୍ୟ ତାଲିକା",
    totalRequests: "ମୋଟ ଅନୁରୋଧ",
    activeOrders: "ସକ୍ରିୟ ଅର୍ଡର",
    pending: "ଅପେକ୍ଷାରତ",
    accepted: "ଗ୍ରହଣ କରାଯାଇଛି",
    rejected: "ପ୍ରତ୍ୟାଖ୍ୟାନ",
    noListings: "କୌଣସି ବର୍ଜ୍ୟ ତାଲିକା ନାହିଁ।",
    noRequests: "କୌଣସି କ୍ରୟ ଅନୁରୋଧ ନାହିଁ।",
    noOrders: "କୌଣସି ଅର୍ଡର ନାହିଁ।",
    logout: "ଲଗଆଉଟ୍",
    business: "ବ୍ୟବସାୟ",
    location: "ସ୍ଥାନ",
    phone: "ଫୋନ",
  },

  as: {
    title: "প্ৰচেছৰ ড্যাশব'ৰ্ড",
    subtitle: "কৃষি আৱৰ্জনা ক্ৰয় আৰু প্ৰচেছিং পৰিচালনা কৰক",
    welcome: "স্বাগতম",
    wasteListings: "উপলব্ধ আৱৰ্জনা",
    wasteListingsDesc: "কৃষকে তালিকাভুক্ত কৰা কৃষি আৱৰ্জনা চাওক",
    requests: "ক্ৰয় অনুৰোধ",
    requestsDesc: "আৱৰ্জনা ক্ৰয় অনুৰোধ অনুসৰণ কৰক",
    orders: "মোৰ অৰ্ডাৰ",
    ordersDesc: "গ্ৰহণ কৰা ক্ৰয় আৰু লজিষ্টিক্স অনুসৰণ কৰক",
    profile: "প্ৰচেছৰ প্ৰফাইল",
    profileDesc: "প্ৰচেছিং ব্যৱসায়ৰ তথ্য পৰিচালনা কৰক",
    talkAi: "AI ৰ সৈতে কথা পাতক",
    talkAiDesc: "ভইচৰ জৰিয়তে KrishiMitra ক সোধক",
    browseWaste: "আৱৰ্জনা চাওক",
    viewRequests: "অনুৰোধ চাওক",
    viewOrders: "অৰ্ডাৰ চাওক",
    editProfile: "প্ৰফাইল সম্পাদনা কৰক",
    totalListings: "আৱৰ্জনা তালিকা",
    totalRequests: "মুঠ অনুৰোধ",
    activeOrders: "সক্ৰিয় অৰ্ডাৰ",
    pending: "অপেক্ষাৰত",
    accepted: "গ্ৰহণ কৰা হৈছে",
    rejected: "প্ৰত্যাখ্যান",
    noListings: "কোনো আৱৰ্জনা তালিকা নাই।",
    noRequests: "কোনো ক্ৰয় অনুৰোধ নাই।",
    noOrders: "কোনো অৰ্ডাৰ নাই।",
    logout: "লগআউট",
    business: "ব্যৱসায়",
    location: "স্থান",
    phone: "ফোন",
  },

  ur: {
    title: "پروسیسر ڈیش بورڈ",
    subtitle: "زرعی فضلہ خریداری اور پروسیسنگ کا انتظام کریں",
    welcome: "خوش آمدید",
    wasteListings: "دستیاب فضلہ",
    wasteListingsDesc: "کسانوں کی جانب سے درج زرعی فضلہ دیکھیں",
    requests: "خریداری کی درخواستیں",
    requestsDesc: "اپنی فضلہ خریداری کی درخواستیں ٹریک کریں",
    orders: "میرے آرڈرز",
    ordersDesc: "منظور شدہ خریداری اور لاجسٹکس ٹریک کریں",
    profile: "پروسیسر پروفائل",
    profileDesc: "اپنے پروسیسنگ کاروبار کی معلومات کا انتظام کریں",
    talkAi: "AI سے بات کریں",
    talkAiDesc: "آواز کے ذریعے KrishiMitra سے سوال کریں",
    browseWaste: "فضلہ دیکھیں",
    viewRequests: "درخواستیں دیکھیں",
    viewOrders: "آرڈرز دیکھیں",
    editProfile: "پروفائل میں ترمیم",
    totalListings: "فضلہ کی فہرستیں",
    totalRequests: "کل درخواستیں",
    activeOrders: "فعال آرڈرز",
    pending: "زیر التوا",
    accepted: "منظور شدہ",
    rejected: "مسترد",
    noListings: "کوئی فضلہ کی فہرست دستیاب نہیں۔",
    noRequests: "ابھی کوئی خریداری کی درخواست نہیں۔",
    noOrders: "ابھی کوئی آرڈر نہیں۔",
    logout: "لاگ آؤٹ",
    business: "کاروبار",
    location: "مقام",
    phone: "فون",
  },
};

export default function ProcessorDashboardPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const text = textData[language];

  const [profile, setProfile] = useState<ProcessorProfile>({});
  const [listings, setListings] = useState<WasteListing[]>([]);
  const [requests, setRequests] = useState<WasteBuyRequest[]>([]);
  const [orders, setOrders] = useState<LogisticsOrder[]>([]);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("processorProfile");
      const savedListings = localStorage.getItem("wasteListings");
      const savedRequests = localStorage.getItem("wasteBuyRequests");
      const savedOrders = localStorage.getItem("logisticsOrders");

      let currentProfile: ProcessorProfile = {};

      if (savedProfile) {
        currentProfile = JSON.parse(savedProfile);
        setProfile(currentProfile);
      }

      if (savedListings) {
        setListings(JSON.parse(savedListings));
      }

      if (savedRequests) {
        const allRequests: WasteBuyRequest[] = JSON.parse(savedRequests);

        const processorName =
          currentProfile.businessName ||
          currentProfile.name ||
          "";

        setRequests(
          allRequests.filter(
            (request) =>
              request.processorName === processorName
          )
        );
      }

      if (savedOrders) {
        const allOrders: LogisticsOrder[] = JSON.parse(savedOrders);

        const processorName =
          currentProfile.businessName ||
          currentProfile.name ||
          "";

        setOrders(
          allOrders.filter(
            (order) =>
              order.deliveryType === "processor" &&
              order.deliveryName === processorName
          )
        );
      }
    } catch {
      setProfile({});
      setListings([]);
      setRequests([]);
      setOrders([]);
    }
  }, []);

  const processorName = useMemo(
    () => profile.businessName || profile.name || "Processor",
    [profile]
  );

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  ).length;

  const acceptedRequests = requests.filter(
    (request) => request.status === "accepted"
  ).length;

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "delivered" &&
      order.status !== "completed"
  ).length;

  const location =
    profile.processingLocation ||
    profile.buyingLocation ||
    profile.village ||
    profile.district ||
    profile.state ||
    "—";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/auth");
  };

  const statusLabel = (status: WasteBuyRequest["status"]) => {
    if (status === "accepted") return text.accepted;
    if (status === "rejected") return text.rejected;
    return text.pending;
  };

  return (
    <main
      dir={language === "ur" ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 text-sm font-semibold text-green-600">
              KrishiMitra
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {text.welcome}, {processorName} 👋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {text.subtitle}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => router.push("/profile")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              👤 {text.profile}
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {text.logout}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-3 text-3xl">♻️</div>
            <p className="text-sm text-slate-500">
              {text.totalListings}
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {listings.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-3 text-3xl">📩</div>
            <p className="text-sm text-slate-500">
              {text.totalRequests}
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {requests.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-3 text-3xl">🚚</div>
            <p className="text-sm text-slate-500">
              {text.activeOrders}
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {activeOrders}
            </p>
          </div>

        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Waste */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">

              <div>
                <div className="mb-2 text-3xl">♻️</div>

                <h2 className="text-xl font-bold text-slate-900">
                  {text.wasteListings}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {text.wasteListingsDesc}
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                {listings.length}
              </span>

            </div>

            <button
              onClick={() => router.push("/processor")}
              className="mt-5 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
            >
              {text.browseWaste} →
            </button>
          </section>

          {/* Requests */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between gap-3">

              <div>
                <div className="mb-2 text-3xl">📩</div>

                <h2 className="text-xl font-bold text-slate-900">
                  {text.requests}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {text.requestsDesc}
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                {pendingRequests}
              </span>

            </div>

            <div className="mt-4 flex gap-2 text-xs font-semibold">

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">
                {text.pending}: {pendingRequests}
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                {text.accepted}: {acceptedRequests}
              </span>

            </div>

            <button
              onClick={() => router.push("/waste-requests")}
              className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {text.viewRequests} →
            </button>

          </section>

          {/* Orders */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between gap-3">

              <div>
                <div className="mb-2 text-3xl">🚚</div>

                <h2 className="text-xl font-bold text-slate-900">
                  {text.orders}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {text.ordersDesc}
                </p>
              </div>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                {orders.length}
              </span>

            </div>

            <button
              onClick={() => router.push("/logistics")}
              className="mt-5 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600"
            >
              {text.viewOrders} →
            </button>

          </section>

          {/* Profile */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="mb-2 text-3xl">🏭</div>

            <h2 className="text-xl font-bold text-slate-900">
              {text.profile}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {text.profileDesc}
            </p>

            <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 text-sm">

              <p>
                <span className="font-semibold text-slate-700">
                  {text.business}:{" "}
                </span>
                {profile.businessName || profile.name || "—"}
              </p>

              <p className="text-slate-500">
                📍 {text.location}: {location}
              </p>

              <p className="text-slate-500">
                📞 {text.phone}: {profile.phone || "—"}
              </p>

            </div>

            <button
              onClick={() => router.push("/profile")}
              className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
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

        {/* Recent Requests */}
        <section className="mt-5 rounded-3xl bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-xl font-bold text-slate-900">
              {text.requests}
            </h2>

            <span className="text-sm text-slate-500">
              {requests.length}
            </span>

          </div>

          {requests.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
              {text.noRequests}
            </div>
          ) : (
            <div className="space-y-3">

              {requests.slice(0, 5).map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>

                    <p className="font-bold text-slate-900">
                      {request.wasteType}
                    </p>

                    <p className="text-sm text-slate-500">
                      {request.farmerName} • {request.quantity}{" "}
                      {request.unit}
                    </p>

                    <p className="text-xs text-slate-400">
                      📍 {request.farmerLocation}
                    </p>

                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                      request.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : request.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {statusLabel(request.status)}
                  </span>

                </div>
              ))}

            </div>
          )}

        </section>

        {/* Recent Orders */}
        <section className="mt-5 rounded-3xl bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-xl font-bold text-slate-900">
              {text.orders}
            </h2>

            <span className="text-sm text-slate-500">
              {orders.length}
            </span>

          </div>

          {orders.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
              {text.noOrders}
            </div>
          ) : (
            <div className="space-y-3">

              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="font-bold text-slate-900">
                        {order.crop}
                      </p>

                      <p className="text-sm text-slate-500">
                        {order.quantity} {order.unit} • ₹
                        {order.price}
                      </p>

                      <p className="text-xs text-slate-400">
                        📍 {order.pickupLocation} →{" "}
                        {order.deliveryLocation}
                      </p>

                    </div>

                    <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
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