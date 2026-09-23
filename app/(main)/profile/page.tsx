"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../lib/LanguageProvider";
import type { LanguageCode } from "../../lib/language";

type StateItem = {
  name: string;
  slug: string;
  districtCount?: number;
  officeCount?: number;
};

type DistrictItem = {
  name: string;
  slug: string;
  officeCount?: number;
};

type PostOffice = {
  Name: string;
  District?: string;
  State?: string;
  Block?: string;
  BranchType?: string;
  DeliveryStatus?: string;
  Pincode?: string;
  officeName?: string;
  officeType?: string;
  deliveryStatus?: string;
  circleName?: string;
  regionName?: string;
  divisionName?: string;
  pincode?: string;
};

type PinApiResponse = {
  state?: string;
  district?: string;
  offices?: PostOffice[];
  Message?: string;
  Status?: string;
  PostOffice?: PostOffice[] | null;
};

type Role =
  | "farmer"
  | "processor"
  | "buyer"
  | "logistics";

const BASE_URL =
  "https://aniket-thapa.github.io/india-pincode-api";

type Translation = {
  farmerTitle: string;
  processorTitle: string;
  buyerTitle: string;
  logisticsTitle: string;
  farmerSubtitle: string;
  processorSubtitle: string;
  buyerSubtitle: string;
  logisticsSubtitle: string;

  fullName: string;
  fullNamePlaceholder: string;
  mobile: string;
  mobilePlaceholder: string;

  pinCode: string;
  pinCodePlaceholder: string;
  village: string;
  villagePlaceholder: string;
  district: string;
  districtPlaceholder: string;
  state: string;
  statePlaceholder: string;

  businessName: string;
  businessNamePlaceholder: string;

  processingType: string;
  processingTypePlaceholder: string;
  materialRequired: string;
  materialRequiredPlaceholder: string;

  cropsInterested: string;
  cropsInterestedPlaceholder: string;
  requiredQuantity: string;
  requiredQuantityPlaceholder: string;
  buyingLocation: string;
  buyingLocationPlaceholder: string;

  vehicleType: string;
  vehicleTypePlaceholder: string;
  vehicleNumber: string;
  vehicleNumberPlaceholder: string;
  driverName: string;
  driverNamePlaceholder: string;
  driverPhone: string;
  driverPhonePlaceholder: string;
  serviceArea: string;
  serviceAreaPlaceholder: string;

  save: string;
  back: string;
  saved: string;
  searchingPin: string;
  pinFound: string;
  invalidPin: string;
  loadingStates: string;
  loadingDistricts: string;
  noSuggestions: string;
  selectSuggestion: string;
  enterPinFirst: string;
  districtAfterState: string;
  invalidMobile: string;
  locationHelp: string;
};

const translations: Record<LanguageCode, Translation> = {
  en: {
    farmerTitle: "Farmer Profile",
    processorTitle: "Processor Profile",
    buyerTitle: "Common Buyer Profile",
    logisticsTitle: "Logistics Partner Profile",

    farmerSubtitle: "Tell us about yourself",
    processorSubtitle: "Tell us about your processing business",
    buyerSubtitle: "Tell us about your buying requirements",
    logisticsSubtitle: "Tell us about your logistics service",

    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    mobile: "Mobile Number",
    mobilePlaceholder: "9876543210",

    pinCode: "PIN Code",
    pinCodePlaceholder: "Enter 6-digit PIN code",
    village: "Village / City / Town",
    villagePlaceholder: "Enter or select village, city or town",
    district: "District",
    districtPlaceholder: "Start typing district",
    state: "State",
    statePlaceholder: "Start typing state",

    businessName: "Business / Company Name",
    businessNamePlaceholder: "Enter business or company name",

    processingType: "Processing Type",
    processingTypePlaceholder:
      "Example: Food processing, oil extraction",
    materialRequired: "Material / Waste Required",
    materialRequiredPlaceholder:
      "Example: Wheat waste, rice husk, straw",

    cropsInterested: "Crops Interested In",
    cropsInterestedPlaceholder:
      "Example: Wheat, Rice, Maize",
    requiredQuantity: "Required Quantity",
    requiredQuantityPlaceholder:
      "Example: 1000 kg",
    buyingLocation: "Buying Location",
    buyingLocationPlaceholder:
      "Enter buying location",

    vehicleType: "Vehicle Type",
    vehicleTypePlaceholder:
      "Example: Tractor, Mini Truck, Truck",
    vehicleNumber: "Vehicle Number",
    vehicleNumberPlaceholder:
      "Example: BR01AB1234",
    driverName: "Driver Name",
    driverNamePlaceholder:
      "Enter driver name",
    driverPhone: "Driver Phone",
    driverPhonePlaceholder:
      "Enter driver phone number",
    serviceArea: "Service Area",
    serviceAreaPlaceholder:
      "Example: Bihar, Delhi, Haryana",

    save: "Save Profile",
    back: "Back",
    saved: "Profile saved successfully!",
    searchingPin: "Finding location...",
    pinFound: "Location found",
    invalidPin:
      "PIN code not found. Please check the PIN code.",
    loadingStates: "Loading states...",
    loadingDistricts: "Loading districts...",
    noSuggestions:
      "No matching suggestions found.",
    selectSuggestion: "Select from suggestions",
    enterPinFirst: "Enter PIN code first",
    districtAfterState:
      "Select a state to see districts",
    invalidMobile:
      "Please enter a valid 10-digit mobile number.",
    locationHelp:
      "Enter your PIN code first. State, district and nearby postal locations will be suggested automatically.",
  },

  hi: {
    farmerTitle: "किसान प्रोफाइल",
    processorTitle: "प्रोसेसर प्रोफाइल",
    buyerTitle: "सामान्य खरीदार प्रोफाइल",
    logisticsTitle: "लॉजिस्टिक्स पार्टनर प्रोफाइल",

    farmerSubtitle: "अपने बारे में जानकारी दें",
    processorSubtitle: "अपने प्रोसेसिंग व्यवसाय के बारे में जानकारी दें",
    buyerSubtitle: "अपनी खरीद आवश्यकताओं के बारे में जानकारी दें",
    logisticsSubtitle: "अपनी लॉजिस्टिक्स सेवा के बारे में जानकारी दें",

    fullName: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    mobile: "मोबाइल नंबर",
    mobilePlaceholder: "9876543210",

    pinCode: "पिन कोड",
    pinCodePlaceholder: "6 अंकों का पिन कोड दर्ज करें",
    village: "गाँव / शहर / कस्बा",
    villagePlaceholder: "गाँव, शहर या कस्बा दर्ज करें",
    district: "जिला",
    districtPlaceholder: "जिले का नाम लिखें",
    state: "राज्य",
    statePlaceholder: "राज्य का नाम लिखें",

    businessName: "व्यवसाय / कंपनी का नाम",
    businessNamePlaceholder:
      "व्यवसाय या कंपनी का नाम दर्ज करें",

    processingType: "प्रोसेसिंग का प्रकार",
    processingTypePlaceholder:
      "उदाहरण: खाद्य प्रोसेसिंग, तेल निकालना",
    materialRequired: "आवश्यक सामग्री / कृषि अपशिष्ट",
    materialRequiredPlaceholder:
      "उदाहरण: गेहूँ अपशिष्ट, धान की भूसी, पराली",

    cropsInterested: "किन फसलों में रुचि है",
    cropsInterestedPlaceholder:
      "उदाहरण: गेहूँ, चावल, मक्का",
    requiredQuantity: "आवश्यक मात्रा",
    requiredQuantityPlaceholder:
      "उदाहरण: 1000 किलो",
    buyingLocation: "खरीद स्थान",
    buyingLocationPlaceholder:
      "खरीद स्थान दर्ज करें",

    vehicleType: "वाहन का प्रकार",
    vehicleTypePlaceholder:
      "उदाहरण: ट्रैक्टर, मिनी ट्रक, ट्रक",
    vehicleNumber: "वाहन नंबर",
    vehicleNumberPlaceholder:
      "उदाहरण: BR01AB1234",
    driverName: "ड्राइवर का नाम",
    driverNamePlaceholder:
      "ड्राइवर का नाम दर्ज करें",
    driverPhone: "ड्राइवर का फोन",
    driverPhonePlaceholder:
      "ड्राइवर का फोन नंबर दर्ज करें",
    serviceArea: "सेवा क्षेत्र",
    serviceAreaPlaceholder:
      "उदाहरण: बिहार, दिल्ली, हरियाणा",

    save: "प्रोफाइल सेव करें",
    back: "वापस जाएँ",
    saved: "प्रोफाइल सफलतापूर्वक सेव हो गई!",
    searchingPin: "स्थान खोजा जा रहा है...",
    pinFound: "स्थान मिल गया",
    invalidPin:
      "पिन कोड नहीं मिला। कृपया पिन कोड जाँचें।",
    loadingStates: "राज्य लोड हो रहे हैं...",
    loadingDistricts: "जिले लोड हो रहे हैं...",
    noSuggestions: "कोई मिलान नहीं मिला।",
    selectSuggestion: "सुझाव में से चुनें",
    enterPinFirst: "पहले पिन कोड दर्ज करें",
    districtAfterState:
      "जिले देखने के लिए पहले राज्य चुनें",
    invalidMobile:
      "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
    locationHelp:
      "पहले पिन कोड दर्ज करें। राज्य, जिला और आसपास के स्थान अपने आप सुझाए जाएंगे।",
  },

  bn: {
    farmerTitle: "কৃষক প্রোফাইল",
    processorTitle: "প্রসেসর প্রোফাইল",
    buyerTitle: "সাধারণ ক্রেতা প্রোফাইল",
    logisticsTitle: "লজিস্টিক পার্টনার প্রোফাইল",

    farmerSubtitle: "আপনার সম্পর্কে তথ্য দিন",
    processorSubtitle: "আপনার প্রসেসিং ব্যবসা সম্পর্কে তথ্য দিন",
    buyerSubtitle: "আপনার ক্রয় প্রয়োজনীয়তা সম্পর্কে তথ্য দিন",
    logisticsSubtitle: "আপনার লজিস্টিক পরিষেবা সম্পর্কে তথ্য দিন",

    fullName: "পুরো নাম",
    fullNamePlaceholder: "আপনার পুরো নাম লিখুন",
    mobile: "মোবাইল নম্বর",
    mobilePlaceholder: "9876543210",

    pinCode: "পিন কোড",
    pinCodePlaceholder: "৬ সংখ্যার পিন কোড লিখুন",
    village: "গ্রাম / শহর / টাউন",
    villagePlaceholder: "গ্রাম, শহর বা টাউন লিখুন",
    district: "জেলা",
    districtPlaceholder: "জেলার নাম লিখুন",
    state: "রাজ্য",
    statePlaceholder: "রাজ্যের নাম লিখুন",

    businessName: "ব্যবসা / কোম্পানির নাম",
    businessNamePlaceholder: "ব্যবসা বা কোম্পানির নাম লিখুন",

    processingType: "প্রসেসিংয়ের ধরন",
    processingTypePlaceholder:
      "উদাহরণ: খাদ্য প্রসেসিং, তেল নিষ্কাশন",
    materialRequired: "প্রয়োজনীয় উপাদান / কৃষি বর্জ্য",
    materialRequiredPlaceholder:
      "উদাহরণ: গমের বর্জ্য, ধানের তুষ, খড়",

    cropsInterested: "আগ্রহের ফসল",
    cropsInterestedPlaceholder:
      "উদাহরণ: গম, চাল, ভুট্টা",
    requiredQuantity: "প্রয়োজনীয় পরিমাণ",
    requiredQuantityPlaceholder:
      "উদাহরণ: 1000 কেজি",
    buyingLocation: "ক্রয়ের স্থান",
    buyingLocationPlaceholder:
      "ক্রয়ের স্থান লিখুন",

    vehicleType: "গাড়ির ধরন",
    vehicleTypePlaceholder:
      "উদাহরণ: ট্রাক্টর, মিনি ট্রাক, ট্রাক",
    vehicleNumber: "গাড়ির নম্বর",
    vehicleNumberPlaceholder:
      "উদাহরণ: BR01AB1234",
    driverName: "ড্রাইভারের নাম",
    driverNamePlaceholder:
      "ড্রাইভারের নাম লিখুন",
    driverPhone: "ড্রাইভারের ফোন",
    driverPhonePlaceholder:
      "ড্রাইভারের ফোন নম্বর লিখুন",
    serviceArea: "পরিষেবা এলাকা",
    serviceAreaPlaceholder:
      "উদাহরণ: বিহার, দিল্লি, হরিয়ানা",

    save: "প্রোফাইল সংরক্ষণ করুন",
    back: "ফিরে যান",
    saved: "প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!",
    searchingPin: "অবস্থান খোঁজা হচ্ছে...",
    pinFound: "অবস্থান পাওয়া গেছে",
    invalidPin:
      "পিন কোড পাওয়া যায়নি। পিন কোড পরীক্ষা করুন।",
    loadingStates: "রাজ্য লোড হচ্ছে...",
    loadingDistricts: "জেলা লোড হচ্ছে...",
    noSuggestions: "কোনো মিল পাওয়া যায়নি।",
    selectSuggestion: "পরামর্শ থেকে নির্বাচন করুন",
    enterPinFirst: "প্রথমে পিন কোড লিখুন",
    districtAfterState:
      "জেলা দেখতে প্রথমে রাজ্য নির্বাচন করুন",
    invalidMobile:
      "সঠিক ১০ সংখ্যার মোবাইল নম্বর লিখুন।",
    locationHelp:
      "প্রথমে পিন কোড লিখুন। রাজ্য, জেলা এবং কাছাকাছি পোস্টাল অবস্থান স্বয়ংক্রিয়ভাবে দেখানো হবে।",
  },

  mr: {
    farmerTitle: "शेतकरी प्रोफाइल",
    processorTitle: "प्रोसेसर प्रोफाइल",
    buyerTitle: "सामान्य खरेदीदार प्रोफाइल",
    logisticsTitle: "लॉजिस्टिक्स पार्टनर प्रोफाइल",

    farmerSubtitle: "तुमच्याबद्दल माहिती द्या",
    processorSubtitle: "तुमच्या प्रोसेसिंग व्यवसायाबद्दल माहिती द्या",
    buyerSubtitle: "तुमच्या खरेदीच्या गरजांबद्दल माहिती द्या",
    logisticsSubtitle: "तुमच्या लॉजिस्टिक्स सेवेबद्दल माहिती द्या",

    fullName: "पूर्ण नाव",
    fullNamePlaceholder: "तुमचे पूर्ण नाव लिहा",
    mobile: "मोबाईल नंबर",
    mobilePlaceholder: "9876543210",

    pinCode: "पिन कोड",
    pinCodePlaceholder: "6 अंकी पिन कोड लिहा",
    village: "गाव / शहर / नगर",
    villagePlaceholder: "गाव, शहर किंवा नगर लिहा",
    district: "जिल्हा",
    districtPlaceholder: "जिल्ह्याचे नाव लिहा",
    state: "राज्य",
    statePlaceholder: "राज्याचे नाव लिहा",

    businessName: "व्यवसाय / कंपनीचे नाव",
    businessNamePlaceholder:
      "व्यवसाय किंवा कंपनीचे नाव लिहा",

    processingType: "प्रोसेसिंग प्रकार",
    processingTypePlaceholder:
      "उदाहरण: अन्न प्रक्रिया, तेल काढणे",
    materialRequired: "आवश्यक साहित्य / कृषी कचरा",
    materialRequiredPlaceholder:
      "उदाहरण: गव्हाचा कचरा, तांदळाची भूसी, पेंढा",

    cropsInterested: "स्वारस्य असलेली पिके",
    cropsInterestedPlaceholder:
      "उदाहरण: गहू, तांदूळ, मका",
    requiredQuantity: "आवश्यक मात्रा",
    requiredQuantityPlaceholder:
      "उदाहरण: 1000 किलो",
    buyingLocation: "खरेदीचे ठिकाण",
    buyingLocationPlaceholder:
      "खरेदीचे ठिकाण लिहा",

    vehicleType: "वाहनाचा प्रकार",
    vehicleTypePlaceholder:
      "उदाहरण: ट्रॅक्टर, मिनी ट्रक, ट्रक",
    vehicleNumber: "वाहन क्रमांक",
    vehicleNumberPlaceholder:
      "उदाहरण: BR01AB1234",
    driverName: "ड्रायव्हरचे नाव",
    driverNamePlaceholder:
      "ड्रायव्हरचे नाव लिहा",
    driverPhone: "ड्रायव्हरचा फोन",
    driverPhonePlaceholder:
      "ड्रायव्हरचा फोन नंबर लिहा",
    serviceArea: "सेवा क्षेत्र",
    serviceAreaPlaceholder:
      "उदाहरण: बिहार, दिल्ली, हरियाणा",

    save: "प्रोफाइल सेव्ह करा",
    back: "मागे जा",
    saved: "प्रोफाइल यशस्वीरित्या सेव्ह झाली!",
    searchingPin: "स्थान शोधले जात आहे...",
    pinFound: "स्थान सापडले",
    invalidPin:
      "पिन कोड सापडला नाही. कृपया पिन कोड तपासा.",
    loadingStates: "राज्य लोड होत आहेत...",
    loadingDistricts: "जिल्हे लोड होत आहेत...",
    noSuggestions: "जुळणारे पर्याय सापडले नाहीत.",
    selectSuggestion: "पर्यायांमधून निवडा",
    enterPinFirst: "प्रथम पिन कोड लिहा",
    districtAfterState:
      "जिल्हे पाहण्यासाठी प्रथम राज्य निवडा",
    invalidMobile:
      "कृपया योग्य 10 अंकी मोबाईल नंबर लिहा.",
    locationHelp:
      "प्रथम पिन कोड लिहा. राज्य, जिल्हा आणि जवळची पोस्टल ठिकाणे आपोआप सुचवली जातील.",
  },

  ta: {
    farmerTitle: "விவசாயி சுயவிவரம்",
    processorTitle: "செயலாக்குபவர் சுயவிவரம்",
    buyerTitle: "பொது வாங்குபவர் சுயவிவரம்",
    logisticsTitle: "தளவாட கூட்டாளர் சுயவிவரம்",

    farmerSubtitle: "உங்களைப் பற்றிய தகவல்களை வழங்கவும்",
    processorSubtitle: "உங்கள் செயலாக்க வணிகத்தைப் பற்றி கூறவும்",
    buyerSubtitle: "உங்கள் கொள்முதல் தேவைகளைப் பற்றி கூறவும்",
    logisticsSubtitle: "உங்கள் தளவாட சேவையைப் பற்றி கூறவும்",

    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
    mobile: "மொபைல் எண்",
    mobilePlaceholder: "9876543210",

    pinCode: "அஞ்சல் குறியீடு",
    pinCodePlaceholder: "6 இலக்க அஞ்சல் குறியீட்டை உள்ளிடவும்",
    village: "கிராமம் / நகரம் / பேரூராட்சி",
    villagePlaceholder:
      "கிராமம், நகரம் அல்லது பேரூராட்சியை உள்ளிடவும்",
    district: "மாவட்டம்",
    districtPlaceholder: "மாவட்டத்தின் பெயரை உள்ளிடவும்",
    state: "மாநிலம்",
    statePlaceholder: "மாநிலத்தின் பெயரை உள்ளிடவும்",

    businessName: "வணிகம் / நிறுவனத்தின் பெயர்",
    businessNamePlaceholder:
      "வணிகம் அல்லது நிறுவனத்தின் பெயரை உள்ளிடவும்",

    processingType: "செயலாக்க வகை",
    processingTypePlaceholder:
      "உதாரணம்: உணவு செயலாக்கம், எண்ணெய் பிரித்தெடுத்தல்",
    materialRequired: "தேவையான பொருள் / விவசாய கழிவு",
    materialRequiredPlaceholder:
      "உதாரணம்: கோதுமை கழிவு, அரிசி உமி, வைக்கோல்",

    cropsInterested: "விருப்பமான பயிர்கள்",
    cropsInterestedPlaceholder:
      "உதாரணம்: கோதுமை, அரிசி, மக்காச்சோளம்",
    requiredQuantity: "தேவையான அளவு",
    requiredQuantityPlaceholder:
      "உதாரணம்: 1000 கிலோ",
    buyingLocation: "வாங்கும் இடம்",
    buyingLocationPlaceholder:
      "வாங்கும் இடத்தை உள்ளிடவும்",

    vehicleType: "வாகன வகை",
    vehicleTypePlaceholder:
      "உதாரணம்: டிராக்டர், மினி டிரக், டிரக்",
    vehicleNumber: "வாகன எண்",
    vehicleNumberPlaceholder:
      "உதாரணம்: BR01AB1234",
    driverName: "ஓட்டுநர் பெயர்",
    driverNamePlaceholder:
      "ஓட்டுநரின் பெயரை உள்ளிடவும்",
    driverPhone: "ஓட்டுநர் தொலைபேசி",
    driverPhonePlaceholder:
      "ஓட்டுநரின் தொலைபேசி எண்ணை உள்ளிடவும்",
    serviceArea: "சேவை பகுதி",
    serviceAreaPlaceholder:
      "உதாரணம்: பீகார், டெல்லி, ஹரியானா",

    save: "சுயவிவரத்தை சேமிக்கவும்",
    back: "பின்செல்",
    saved: "சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது!",
    searchingPin: "இருப்பிடம் தேடப்படுகிறது...",
    pinFound: "இருப்பிடம் கிடைத்தது",
    invalidPin:
      "அஞ்சல் குறியீடு கிடைக்கவில்லை. தயவுசெய்து சரிபார்க்கவும்.",
    loadingStates: "மாநிலங்கள் ஏற்றப்படுகின்றன...",
    loadingDistricts: "மாவட்டங்கள் ஏற்றப்படுகின்றன...",
    noSuggestions: "பொருத்தமான பரிந்துரைகள் இல்லை.",
    selectSuggestion: "பரிந்துரைகளில் இருந்து தேர்ந்தெடுக்கவும்",
    enterPinFirst: "முதலில் அஞ்சல் குறியீட்டை உள்ளிடவும்",
    districtAfterState:
      "மாவட்டங்களைப் பார்க்க முதலில் மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    invalidMobile:
      "சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.",
    locationHelp:
      "முதலில் அஞ்சல் குறியீட்டை உள்ளிடவும். மாநிலம், மாவட்டம் மற்றும் அருகிலுள்ள அஞ்சல் இடங்கள் தானாக பரிந்துரைக்கப்படும்.",
  },

  te: {
    farmerTitle: "రైతు ప్రొఫైల్",
    processorTitle: "ప్రాసెసర్ ప్రొఫైల్",
    buyerTitle: "సాధారణ కొనుగోలుదారు ప్రొఫైల్",
    logisticsTitle: "లాజిస్టిక్స్ భాగస్వామి ప్రొఫైల్",

    farmerSubtitle: "మీ గురించి సమాచారం ఇవ్వండి",
    processorSubtitle: "మీ ప్రాసెసింగ్ వ్యాపారం గురించి సమాచారం ఇవ్వండి",
    buyerSubtitle: "మీ కొనుగోలు అవసరాల గురించి సమాచారం ఇవ్వండి",
    logisticsSubtitle: "మీ లాజిస్టిక్స్ సేవ గురించి సమాచారం ఇవ్వండి",

    fullName: "పూర్తి పేరు",
    fullNamePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
    mobile: "మొబైల్ నంబర్",
    mobilePlaceholder: "9876543210",

    pinCode: "పిన్ కోడ్",
    pinCodePlaceholder: "6 అంకెల పిన్ కోడ్ నమోదు చేయండి",
    village: "గ్రామం / నగరం / పట్టణం",
    villagePlaceholder:
      "గ్రామం, నగరం లేదా పట్టణాన్ని నమోదు చేయండి",
    district: "జిల్లా",
    districtPlaceholder: "జిల్లా పేరు నమోదు చేయండి",
    state: "రాష్ట్రం",
    statePlaceholder: "రాష్ట్రం పేరు నమోదు చేయండి",

    businessName: "వ్యాపారం / కంపెనీ పేరు",
    businessNamePlaceholder:
      "వ్యాపారం లేదా కంపెనీ పేరు నమోదు చేయండి",

    processingType: "ప్రాసెసింగ్ రకం",
    processingTypePlaceholder:
      "ఉదాహరణ: ఆహార ప్రాసెసింగ్, నూనె తయారీ",
    materialRequired: "అవసరమైన పదార్థం / వ్యవసాయ వ్యర్థం",
    materialRequiredPlaceholder:
      "ఉదాహరణ: గోధుమ వ్యర్థం, వరి పొట్టు, గడ్డి",

    cropsInterested: "ఆసక్తి ఉన్న పంటలు",
    cropsInterestedPlaceholder:
      "ఉదాహరణ: గోధుమ, బియ్యం, మొక్కజొన్న",
    requiredQuantity: "అవసరమైన పరిమాణం",
    requiredQuantityPlaceholder:
      "ఉదాహరణ: 1000 కిలోలు",
    buyingLocation: "కొనుగోలు స్థలం",
    buyingLocationPlaceholder:
      "కొనుగోలు స్థలాన్ని నమోదు చేయండి",

    vehicleType: "వాహనం రకం",
    vehicleTypePlaceholder:
      "ఉదాహరణ: ట్రాక్టర్, మినీ ట్రక్, ట్రక్",
    vehicleNumber: "వాహనం నంబర్",
    vehicleNumberPlaceholder:
      "ఉదాహరణ: BR01AB1234",
    driverName: "డ్రైవర్ పేరు",
    driverNamePlaceholder:
      "డ్రైవర్ పేరు నమోదు చేయండి",
    driverPhone: "డ్రైవర్ ఫోన్",
    driverPhonePlaceholder:
      "డ్రైవర్ ఫోన్ నంబర్ నమోదు చేయండి",
    serviceArea: "సేవా ప్రాంతం",
    serviceAreaPlaceholder:
      "ఉదాహరణ: బీహార్, ఢిల్లీ, హర్యానా",

    save: "ప్రొఫైల్ సేవ్ చేయండి",
    back: "వెనక్కి వెళ్లండి",
    saved: "ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!",
    searchingPin: "స్థానం వెతుకుతోంది...",
    pinFound: "స్థానం కనుగొనబడింది",
    invalidPin:
      "పిన్ కోడ్ కనుగొనబడలేదు. దయచేసి తనిఖీ చేయండి.",
    loadingStates: "రాష్ట్రాలు లోడ్ అవుతున్నాయి...",
    loadingDistricts: "జిల్లాలు లోడ్ అవుతున్నాయి...",
    noSuggestions: "సరిపోలే సూచనలు లేవు.",
    selectSuggestion: "సూచనల నుండి ఎంచుకోండి",
    enterPinFirst: "ముందుగా పిన్ కోడ్ నమోదు చేయండి",
    districtAfterState:
      "జిల్లాలను చూడటానికి ముందుగా రాష్ట్రాన్ని ఎంచుకోండి",
    invalidMobile:
      "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.",
    locationHelp:
      "ముందుగా పిన్ కోడ్ నమోదు చేయండి. రాష్ట్రం, జిల్లా మరియు సమీప పోస్టల్ ప్రాంతాలు ఆటోమేటిక్‌గా సూచించబడతాయి.",
  },

  gu: {
    farmerTitle: "ખેડૂત પ્રોફાઇલ",
    processorTitle: "પ્રોસેસર પ્રોફાઇલ",
    buyerTitle: "સામાન્ય ખરીદદાર પ્રોફાઇલ",
    logisticsTitle: "લોજિસ્ટિક્સ પાર્ટનર પ્રોફાઇલ",

    farmerSubtitle: "તમારા વિશે માહિતી આપો",
    processorSubtitle: "તમારા પ્રોસેસિંગ વ્યવસાય વિશે માહિતી આપો",
    buyerSubtitle: "તમારી ખરીદીની જરૂરિયાતો વિશે માહિતી આપો",
    logisticsSubtitle: "તમારી લોજિસ્ટિક્સ સેવા વિશે માહિતી આપો",

    fullName: "પૂરું નામ",
    fullNamePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
    mobile: "મોબાઇલ નંબર",
    mobilePlaceholder: "9876543210",

    pinCode: "પિન કોડ",
    pinCodePlaceholder: "6 અંકનો પિન કોડ દાખલ કરો",
    village: "ગામ / શહેર / નગર",
    villagePlaceholder: "ગામ, શહેર અથવા નગર દાખલ કરો",
    district: "જિલ્લો",
    districtPlaceholder: "જિલ્લાનું નામ દાખલ કરો",
    state: "રાજ્ય",
    statePlaceholder: "રાજ્યનું નામ દાખલ કરો",

    businessName: "વ્યવસાય / કંપનીનું નામ",
    businessNamePlaceholder:
      "વ્યવસાય અથવા કંપનીનું નામ દાખલ કરો",

    processingType: "પ્રોસેસિંગ પ્રકાર",
    processingTypePlaceholder:
      "ઉદાહરણ: ફૂડ પ્રોસેસિંગ, તેલ કાઢવું",
    materialRequired: "જરૂરી સામગ્રી / કૃષિ કચરો",
    materialRequiredPlaceholder:
      "ઉદાહરણ: ઘઉંનો કચરો, ચોખાની ભૂસી, પરાળ",

    cropsInterested: "રસ ધરાવતા પાક",
    cropsInterestedPlaceholder:
      "ઉદાહરણ: ઘઉં, ચોખા, મકાઈ",
    requiredQuantity: "જરૂરી જથ્થો",
    requiredQuantityPlaceholder:
      "ઉદાહરણ: 1000 કિલો",
    buyingLocation: "ખરીદીનું સ્થળ",
    buyingLocationPlaceholder:
      "ખરીદીનું સ્થળ દાખલ કરો",

    vehicleType: "વાહનનો પ્રકાર",
    vehicleTypePlaceholder:
      "ઉદાહરણ: ટ્રેક્ટર, મિની ટ્રક, ટ્રક",
    vehicleNumber: "વાહન નંબર",
    vehicleNumberPlaceholder:
      "ઉદાહરણ: BR01AB1234",
    driverName: "ડ્રાઇવરનું નામ",
    driverNamePlaceholder:
      "ડ્રાઇવરનું નામ દાખલ કરો",
    driverPhone: "ડ્રાઇવર ફોન",
    driverPhonePlaceholder:
      "ડ્રાઇવરનો ફોન નંબર દાખલ કરો",
    serviceArea: "સેવા વિસ્તાર",
    serviceAreaPlaceholder:
      "ઉદાહરણ: બિહાર, દિલ્હી, હરિયાણા",

    save: "પ્રોફાઇલ સેવ કરો",
    back: "પાછા જાઓ",
    saved: "પ્રોફાઇલ સફળતાપૂર્વક સેવ થઈ!",
    searchingPin: "સ્થાન શોધાઈ રહ્યું છે...",
    pinFound: "સ્થાન મળી ગયું",
    invalidPin:
      "પિન કોડ મળ્યો નથી. કૃપા કરીને તપાસો.",
    loadingStates: "રાજ્યો લોડ થઈ રહ્યા છે...",
    loadingDistricts: "જિલ્લાઓ લોડ થઈ રહ્યા છે...",
    noSuggestions: "કોઈ મેળ ખાતા સૂચનો મળ્યા નથી.",
    selectSuggestion: "સૂચનોમાંથી પસંદ કરો",
    enterPinFirst: "પહેલા પિન કોડ દાખલ કરો",
    districtAfterState:
      "જિલ્લા જોવા માટે પહેલા રાજ્ય પસંદ કરો",
    invalidMobile:
      "કૃપા કરીને યોગ્ય 10 અંકનો મોબાઇલ નંબર દાખલ કરો.",
    locationHelp:
      "પહેલા પિન કોડ દાખલ કરો. રાજ્ય, જિલ્લો અને નજીકના પોસ્ટલ સ્થળો આપમેળે સૂચવવામાં આવશે.",
  },

  kn: {
    farmerTitle: "ರೈತ ಪ್ರೊಫೈಲ್",
    processorTitle: "ಪ್ರೊಸೆಸರ್ ಪ್ರೊಫೈಲ್",
    buyerTitle: "ಸಾಮಾನ್ಯ ಖರೀದಿದಾರ ಪ್ರೊಫೈಲ್",
    logisticsTitle: "ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪಾಲುದಾರ ಪ್ರೊಫೈಲ್",

    farmerSubtitle: "ನಿಮ್ಮ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಿ",
    processorSubtitle: "ನಿಮ್ಮ ಸಂಸ್ಕರಣಾ ವ್ಯವಹಾರದ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಿ",
    buyerSubtitle: "ನಿಮ್ಮ ಖರೀದಿ ಅಗತ್ಯಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಿ",
    logisticsSubtitle: "ನಿಮ್ಮ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಸೇವೆಯ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಿ",

    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    fullNamePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    mobilePlaceholder: "9876543210",

    pinCode: "ಪಿನ್ ಕೋಡ್",
    pinCodePlaceholder: "6 ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ",
    village: "ಗ್ರಾಮ / ನಗರ / ಪಟ್ಟಣ",
    villagePlaceholder:
      "ಗ್ರಾಮ, ನಗರ ಅಥವಾ ಪಟ್ಟಣವನ್ನು ನಮೂದಿಸಿ",
    district: "ಜಿಲ್ಲೆ",
    districtPlaceholder: "ಜಿಲ್ಲೆಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    state: "ರಾಜ್ಯ",
    statePlaceholder: "ರಾಜ್ಯದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",

    businessName: "ವ್ಯಾಪಾರ / ಕಂಪನಿ ಹೆಸರು",
    businessNamePlaceholder:
      "ವ್ಯಾಪಾರ ಅಥವಾ ಕಂಪನಿ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",

    processingType: "ಸಂಸ್ಕರಣಾ ಪ್ರಕಾರ",
    processingTypePlaceholder:
      "ಉದಾಹರಣೆ: ಆಹಾರ ಸಂಸ್ಕರಣೆ, ಎಣ್ಣೆ ತಯಾರಿಕೆ",
    materialRequired: "ಅಗತ್ಯವಿರುವ ವಸ್ತು / ಕೃಷಿ ತ್ಯಾಜ್ಯ",
    materialRequiredPlaceholder:
      "ಉದಾಹರಣೆ: ಗೋಧಿ ತ್ಯಾಜ್ಯ, ಅಕ್ಕಿ ಹೊಟ್ಟು, ಹುಲ್ಲು",

    cropsInterested: "ಆಸಕ್ತಿ ಇರುವ ಬೆಳೆಗಳು",
    cropsInterestedPlaceholder:
      "ಉದಾಹರಣೆ: ಗೋಧಿ, ಅಕ್ಕಿ, ಜೋಳ",
    requiredQuantity: "ಅಗತ್ಯವಿರುವ ಪ್ರಮಾಣ",
    requiredQuantityPlaceholder:
      "ಉದಾಹರಣೆ: 1000 ಕೆಜಿ",
    buyingLocation: "ಖರೀದಿ ಸ್ಥಳ",
    buyingLocationPlaceholder:
      "ಖರೀದಿ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ",

    vehicleType: "ವಾಹನದ ಪ್ರಕಾರ",
    vehicleTypePlaceholder:
      "ಉದಾಹರಣೆ: ಟ್ರಾಕ್ಟರ್, ಮಿನಿ ಟ್ರಕ್, ಟ್ರಕ್",
    vehicleNumber: "ವಾಹನ ಸಂಖ್ಯೆ",
    vehicleNumberPlaceholder:
      "ಉದಾಹರಣೆ: BR01AB1234",
    driverName: "ಚಾಲಕನ ಹೆಸರು",
    driverNamePlaceholder:
      "ಚಾಲಕನ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    driverPhone: "ಚಾಲಕ ಫೋನ್",
    driverPhonePlaceholder:
      "ಚಾಲಕನ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
    serviceArea: "ಸೇವಾ ಪ್ರದೇಶ",
    serviceAreaPlaceholder:
      "ಉದಾಹರಣೆ: ಬಿಹಾರ, ದೆಹಲಿ, ಹರಿಯಾಣ",

    save: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ",
    back: "ಹಿಂದಕ್ಕೆ",
    saved: "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!",
    searchingPin: "ಸ್ಥಳ ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    pinFound: "ಸ್ಥಳ ಕಂಡುಬಂದಿದೆ",
    invalidPin:
      "ಪಿನ್ ಕೋಡ್ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ.",
    loadingStates: "ರಾಜ್ಯಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    loadingDistricts: "ಜಿಲ್ಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    noSuggestions:
      "ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಯ ಸಲಹೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    selectSuggestion: "ಸಲಹೆಗಳಿಂದ ಆಯ್ಕೆಮಾಡಿ",
    enterPinFirst: "ಮೊದಲು ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ",
    districtAfterState:
      "ಜಿಲ್ಲೆಗಳನ್ನು ನೋಡಲು ಮೊದಲು ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    invalidMobile:
      "ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    locationHelp:
      "ಮೊದಲು ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ. ರಾಜ್ಯ, ಜಿಲ್ಲೆ ಮತ್ತು ಹತ್ತಿರದ ಅಂಚೆ ಸ್ಥಳಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸೂಚಿಸಲಾಗುತ್ತದೆ.",
  },

  ml: {
    farmerTitle: "കർഷക പ്രൊഫൈൽ",
    processorTitle: "പ്രോസസർ പ്രൊഫൈൽ",
    buyerTitle: "സാധാരണ വാങ്ങുന്നയാൾ പ്രൊഫൈൽ",
    logisticsTitle: "ലോജിസ്റ്റിക്സ് പങ്കാളി പ്രൊഫൈൽ",

    farmerSubtitle: "നിങ്ങളെക്കുറിച്ചുള്ള വിവരങ്ങൾ നൽകുക",
    processorSubtitle: "നിങ്ങളുടെ പ്രോസസിംഗ് ബിസിനസിനെക്കുറിച്ച് നൽകുക",
    buyerSubtitle: "നിങ്ങളുടെ വാങ്ങൽ ആവശ്യങ്ങളെക്കുറിച്ച് നൽകുക",
    logisticsSubtitle: "നിങ്ങളുടെ ലോജിസ്റ്റിക്സ് സേവനത്തെക്കുറിച്ച് നൽകുക",

    fullName: "പൂർണ്ണ പേര്",
    fullNamePlaceholder: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക",
    mobile: "മൊബൈൽ നമ്പർ",
    mobilePlaceholder: "9876543210",

    pinCode: "പിൻ കോഡ്",
    pinCodePlaceholder: "6 അക്ക പിൻ കോഡ് നൽകുക",
    village: "ഗ്രാമം / നഗരം / പട്ടണം",
    villagePlaceholder:
      "ഗ്രാമം, നഗരം അല്ലെങ്കിൽ പട്ടണം നൽകുക",
    district: "ജില്ല",
    districtPlaceholder: "ജില്ലയുടെ പേര് നൽകുക",
    state: "സംസ്ഥാനം",
    statePlaceholder: "സംസ്ഥാനത്തിന്റെ പേര് നൽകുക",

    businessName: "ബിസിനസ് / കമ്പനിയുടെ പേര്",
    businessNamePlaceholder:
      "ബിസിനസ് അല്ലെങ്കിൽ കമ്പനിയുടെ പേര് നൽകുക",

    processingType: "പ്രോസസിംഗ് തരം",
    processingTypePlaceholder:
      "ഉദാഹരണം: ഭക്ഷ്യ സംസ്കരണം, എണ്ണ നിർമ്മാണം",
    materialRequired: "ആവശ്യമായ വസ്തു / കാർഷിക മാലിന്യം",
    materialRequiredPlaceholder:
      "ഉദാഹരണം: ഗോതമ്പ് മാലിന്യം, നെല്ല് തവിട്, വൈക്കോൽ",

    cropsInterested: "താൽപ്പര്യമുള്ള വിളകൾ",
    cropsInterestedPlaceholder:
      "ഉദാഹരണം: ഗോതമ്പ്, അരി, ചോളം",
    requiredQuantity: "ആവശ്യമായ അളവ്",
    requiredQuantityPlaceholder:
      "ഉദാഹരണം: 1000 കിലോ",
    buyingLocation: "വാങ്ങുന്ന സ്ഥലം",
    buyingLocationPlaceholder:
      "വാങ്ങുന്ന സ്ഥലം നൽകുക",

    vehicleType: "വാഹന തരം",
    vehicleTypePlaceholder:
      "ഉദാഹരണം: ട്രാക്ടർ, മിനി ട്രക്ക്, ട്രക്ക്",
    vehicleNumber: "വാഹന നമ്പർ",
    vehicleNumberPlaceholder:
      "ഉദാഹരണം: BR01AB1234",
    driverName: "ഡ്രൈവറുടെ പേര്",
    driverNamePlaceholder:
      "ഡ്രൈവറുടെ പേര് നൽകുക",
    driverPhone: "ഡ്രൈവർ ഫോൺ",
    driverPhonePlaceholder:
      "ഡ്രൈവറുടെ ഫോൺ നമ്പർ നൽകുക",
    serviceArea: "സേവന മേഖല",
    serviceAreaPlaceholder:
      "ഉദാഹരണം: ബീഹാർ, ഡൽഹി, ഹരിയാന",

    save: "പ്രൊഫൈൽ സേവ് ചെയ്യുക",
    back: "തിരികെ",
    saved: "പ്രൊഫൈൽ വിജയകരമായി സേവ് ചെയ്തു!",
    searchingPin: "സ്ഥലം കണ്ടെത്തുന്നു...",
    pinFound: "സ്ഥലം കണ്ടെത്തി",
    invalidPin:
      "പിൻ കോഡ് കണ്ടെത്താനായില്ല. ദയവായി പരിശോധിക്കുക.",
    loadingStates: "സംസ്ഥാനങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
    loadingDistricts: "ജില്ലകൾ ലോഡ് ചെയ്യുന്നു...",
    noSuggestions:
      "പൊരുത്തപ്പെടുന്ന നിർദ്ദേശങ്ങളൊന്നുമില്ല.",
    selectSuggestion:
      "നിർദ്ദേശങ്ങളിൽ നിന്ന് തിരഞ്ഞെടുക്കുക",
    enterPinFirst: "ആദ്യം പിൻ കോഡ് നൽകുക",
    districtAfterState:
      "ജില്ലകൾ കാണാൻ ആദ്യം സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    invalidMobile:
      "ശരിയായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.",
    locationHelp:
      "ആദ്യം പിൻ കോഡ് നൽകുക. സംസ്ഥാനം, ജില്ല, സമീപ പ്രദേശങ്ങൾ എന്നിവ സ്വയമേവ നിർദ്ദേശിക്കും.",
  },

  pa: {
    farmerTitle: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ",
    processorTitle: "ਪ੍ਰੋਸੈਸਰ ਪ੍ਰੋਫਾਈਲ",
    buyerTitle: "ਆਮ ਖਰੀਦਦਾਰ ਪ੍ਰੋਫਾਈਲ",
    logisticsTitle: "ਲੌਜਿਸਟਿਕਸ ਭਾਗੀਦਾਰ ਪ੍ਰੋਫਾਈਲ",

    farmerSubtitle: "ਆਪਣੇ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿਓ",
    processorSubtitle: "ਆਪਣੇ ਪ੍ਰੋਸੈਸਿੰਗ ਕਾਰੋਬਾਰ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿਓ",
    buyerSubtitle: "ਆਪਣੀਆਂ ਖਰੀਦ ਲੋੜਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿਓ",
    logisticsSubtitle: "ਆਪਣੀ ਲੌਜਿਸਟਿਕਸ ਸੇਵਾ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿਓ",

    fullName: "ਪੂਰਾ ਨਾਮ",
    fullNamePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    mobile: "ਮੋਬਾਈਲ ਨੰਬਰ",
    mobilePlaceholder: "9876543210",

    pinCode: "ਪਿੰਨ ਕੋਡ",
    pinCodePlaceholder: "6 ਅੰਕਾਂ ਦਾ ਪਿੰਨ ਕੋਡ ਦਰਜ ਕਰੋ",
    village: "ਪਿੰਡ / ਸ਼ਹਿਰ / ਕਸਬਾ",
    villagePlaceholder: "ਪਿੰਡ, ਸ਼ਹਿਰ ਜਾਂ ਕਸਬਾ ਦਰਜ ਕਰੋ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    districtPlaceholder: "ਜ਼ਿਲ੍ਹੇ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    state: "ਰਾਜ",
    statePlaceholder: "ਰਾਜ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",

    businessName: "ਕਾਰੋਬਾਰ / ਕੰਪਨੀ ਦਾ ਨਾਮ",
    businessNamePlaceholder:
      "ਕਾਰੋਬਾਰ ਜਾਂ ਕੰਪਨੀ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",

    processingType: "ਪ੍ਰੋਸੈਸਿੰਗ ਕਿਸਮ",
    processingTypePlaceholder:
      "ਉਦਾਹਰਨ: ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ, ਤੇਲ ਕੱਢਣਾ",
    materialRequired: "ਲੋੜੀਂਦੀ ਸਮੱਗਰੀ / ਖੇਤੀਬਾੜੀ ਰਹਿੰਦ-ਖੂੰਹਦ",
    materialRequiredPlaceholder:
      "ਉਦਾਹਰਨ: ਕਣਕ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ, ਚੌਲਾਂ ਦੀ ਭੂਸੀ, ਪਰਾਲੀ",

    cropsInterested: "ਦਿਲਚਸਪੀ ਵਾਲੀਆਂ ਫਸਲਾਂ",
    cropsInterestedPlaceholder:
      "ਉਦਾਹਰਨ: ਕਣਕ, ਚੌਲ, ਮੱਕੀ",
    requiredQuantity: "ਲੋੜੀਂਦੀ ਮਾਤਰਾ",
    requiredQuantityPlaceholder:
      "ਉਦਾਹਰਨ: 1000 ਕਿਲੋ",
    buyingLocation: "ਖਰੀਦ ਸਥਾਨ",
    buyingLocationPlaceholder:
      "ਖਰੀਦ ਸਥਾਨ ਦਰਜ ਕਰੋ",

    vehicleType: "ਵਾਹਨ ਦੀ ਕਿਸਮ",
    vehicleTypePlaceholder:
      "ਉਦਾਹਰਨ: ਟਰੈਕਟਰ, ਮਿੰਨੀ ਟਰੱਕ, ਟਰੱਕ",
    vehicleNumber: "ਵਾਹਨ ਨੰਬਰ",
    vehicleNumberPlaceholder:
      "ਉਦਾਹਰਨ: BR01AB1234",
    driverName: "ਡਰਾਈਵਰ ਦਾ ਨਾਮ",
    driverNamePlaceholder:
      "ਡਰਾਈਵਰ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    driverPhone: "ਡਰਾਈਵਰ ਫੋਨ",
    driverPhonePlaceholder:
      "ਡਰਾਈਵਰ ਦਾ ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ",
    serviceArea: "ਸੇਵਾ ਖੇਤਰ",
    serviceAreaPlaceholder:
      "ਉਦਾਹਰਨ: ਬਿਹਾਰ, ਦਿੱਲੀ, ਹਰਿਆਣਾ",

    save: "ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ",
    back: "ਵਾਪਸ ਜਾਓ",
    saved: "ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਸੇਵ ਹੋ ਗਈ!",
    searchingPin: "ਸਥਾਨ ਲੱਭਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    pinFound: "ਸਥਾਨ ਮਿਲ ਗਿਆ",
    invalidPin:
      "ਪਿੰਨ ਕੋਡ ਨਹੀਂ ਮਿਲਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਜਾਂਚ ਕਰੋ।",
    loadingStates: "ਰਾਜ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",
    loadingDistricts: "ਜ਼ਿਲ੍ਹੇ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",
    noSuggestions: "ਕੋਈ ਮਿਲਦੇ ਸੁਝਾਅ ਨਹੀਂ ਮਿਲੇ।",
    selectSuggestion: "ਸੁਝਾਵਾਂ ਵਿੱਚੋਂ ਚੁਣੋ",
    enterPinFirst: "ਪਹਿਲਾਂ ਪਿੰਨ ਕੋਡ ਦਰਜ ਕਰੋ",
    districtAfterState:
      "ਜ਼ਿਲ੍ਹੇ ਦੇਖਣ ਲਈ ਪਹਿਲਾਂ ਰਾਜ ਚੁਣੋ",
    invalidMobile:
      "ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ 10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ।",
    locationHelp:
      "ਪਹਿਲਾਂ ਪਿੰਨ ਕੋਡ ਦਰਜ ਕਰੋ। ਰਾਜ, ਜ਼ਿਲ੍ਹਾ ਅਤੇ ਨੇੜਲੇ ਡਾਕ ਸਥਾਨ ਆਪਣੇ ਆਪ ਸੁਝਾਏ ਜਾਣਗੇ।",
  },

  or: {
    farmerTitle: "କୃଷକ ପ୍ରୋଫାଇଲ୍",
    processorTitle: "ପ୍ରୋସେସର ପ୍ରୋଫାଇଲ୍",
    buyerTitle: "ସାଧାରଣ କ୍ରେତା ପ୍ରୋଫାଇଲ୍",
    logisticsTitle: "ଲଜିଷ୍ଟିକ୍ସ ପାର୍ଟନର ପ୍ରୋଫାଇଲ୍",

    farmerSubtitle: "ଆପଣଙ୍କ ବିଷୟରେ ସୂଚନା ଦିଅନ୍ତୁ",
    processorSubtitle:
      "ଆପଣଙ୍କ ପ୍ରୋସେସିଂ ବ୍ୟବସାୟ ବିଷୟରେ ସୂଚନା ଦିଅନ୍ତୁ",
    buyerSubtitle:
      "ଆପଣଙ୍କ କ୍ରୟ ଆବଶ୍ୟକତା ବିଷୟରେ ସୂଚନା ଦିଅନ୍ତୁ",
    logisticsSubtitle:
      "ଆପଣଙ୍କ ଲଜିଷ୍ଟିକ୍ସ ସେବା ବିଷୟରେ ସୂଚନା ଦିଅନ୍ତୁ",

    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    fullNamePlaceholder: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଦିଅନ୍ତୁ",
    mobile: "ମୋବାଇଲ୍ ନମ୍ବର",
    mobilePlaceholder: "9876543210",

    pinCode: "ପିନ୍ କୋଡ୍",
    pinCodePlaceholder: "6 ଅଙ୍କର ପିନ୍ କୋଡ୍ ଦିଅନ୍ତୁ",
    village: "ଗାଁ / ସହର / ଟାଉନ୍",
    villagePlaceholder: "ଗାଁ, ସହର କିମ୍ବା ଟାଉନ୍ ଦିଅନ୍ତୁ",
    district: "ଜିଲ୍ଲା",
    districtPlaceholder: "ଜିଲ୍ଲାର ନାମ ଦିଅନ୍ତୁ",
    state: "ରାଜ୍ୟ",
    statePlaceholder: "ରାଜ୍ୟର ନାମ ଦିଅନ୍ତୁ",

    businessName: "ବ୍ୟବସାୟ / କମ୍ପାନୀ ନାମ",
    businessNamePlaceholder:
      "ବ୍ୟବସାୟ କିମ୍ବା କମ୍ପାନୀ ନାମ ଦିଅନ୍ତୁ",

    processingType: "ପ୍ରୋସେସିଂ ପ୍ରକାର",
    processingTypePlaceholder:
      "ଉଦାହରଣ: ଖାଦ୍ୟ ପ୍ରକ୍ରିୟାକରଣ, ତେଲ ନିଷ୍କାସନ",
    materialRequired: "ଆବଶ୍ୟକ ସାମଗ୍ରୀ / କୃଷି ଅବଶିଷ୍ଟ",
    materialRequiredPlaceholder:
      "ଉଦାହରଣ: ଗହମ ଅବଶିଷ୍ଟ, ଧାନ ଚୋପା, ନଡ଼ା",

    cropsInterested: "ଆଗ୍ରହ ଥିବା ଫସଲ",
    cropsInterestedPlaceholder:
      "ଉଦାହରଣ: ଗହମ, ଚାଉଳ, ମକା",
    requiredQuantity: "ଆବଶ୍ୟକ ପରିମାଣ",
    requiredQuantityPlaceholder:
      "ଉଦାହରଣ: 1000 କିଲୋ",
    buyingLocation: "କ୍ରୟ ସ୍ଥାନ",
    buyingLocationPlaceholder:
      "କ୍ରୟ ସ୍ଥାନ ଦିଅନ୍ତୁ",

    vehicleType: "ଯାନ ପ୍ରକାର",
    vehicleTypePlaceholder:
      "ଉଦାହରଣ: ଟ୍ରାକ୍ଟର, ମିନି ଟ୍ରକ୍, ଟ୍ରକ୍",
    vehicleNumber: "ଯାନ ନମ୍ବର",
    vehicleNumberPlaceholder:
      "ଉଦାହରଣ: BR01AB1234",
    driverName: "ଡ୍ରାଇଭର ନାମ",
    driverNamePlaceholder:
      "ଡ୍ରାଇଭର ନାମ ଦିଅନ୍ତୁ",
    driverPhone: "ଡ୍ରାଇଭର ଫୋନ୍",
    driverPhonePlaceholder:
      "ଡ୍ରାଇଭର ଫୋନ୍ ନମ୍ବର ଦିଅନ୍ତୁ",
    serviceArea: "ସେବା ଅଞ୍ଚଳ",
    serviceAreaPlaceholder:
      "ଉଦାହରଣ: ବିହାର, ଦିଲ୍ଲୀ, ହରିୟାଣା",

    save: "ପ୍ରୋଫାଇଲ୍ ସେଭ୍ କରନ୍ତୁ",
    back: "ପଛକୁ ଯାଆନ୍ତୁ",
    saved: "ପ୍ରୋଫାଇଲ୍ ସଫଳତାର ସହିତ ସେଭ୍ ହୋଇଛି!",
    searchingPin: "ସ୍ଥାନ ଖୋଜାଯାଉଛି...",
    pinFound: "ସ୍ଥାନ ମିଳିଲା",
    invalidPin:
      "ପିନ୍ କୋଡ୍ ମିଳିଲା ନାହିଁ। ଦୟାକରି ଯାଞ୍ଚ କରନ୍ତୁ।",
    loadingStates: "ରାଜ୍ୟଗୁଡ଼ିକ ଲୋଡ୍ ହେଉଛି...",
    loadingDistricts: "ଜିଲ୍ଲାଗୁଡ଼ିକ ଲୋଡ୍ ହେଉଛି...",
    noSuggestions: "କୌଣସି ମେଳ ମିଳିଲା ନାହିଁ।",
    selectSuggestion: "ପରାମର୍ଶରୁ ବାଛନ୍ତୁ",
    enterPinFirst: "ପ୍ରଥମେ ପିନ୍ କୋଡ୍ ଦିଅନ୍ତୁ",
    districtAfterState:
      "ଜିଲ୍ଲା ଦେଖିବା ପାଇଁ ପ୍ରଥମେ ରାଜ୍ୟ ବାଛନ୍ତୁ",
    invalidMobile:
      "ଦୟାକରି ସଠିକ୍ 10 ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ଦିଅନ୍ତୁ।",
    locationHelp:
      "ପ୍ରଥମେ ପିନ୍ କୋଡ୍ ଦିଅନ୍ତୁ। ରାଜ୍ୟ, ଜିଲ୍ଲା ଏବଂ ନିକଟସ୍ଥ ଡାକ ସ୍ଥାନଗୁଡ଼ିକ ସ୍ୱୟଂଚାଳିତ ଭାବେ ସୁପାରିଶ ହେବ।",
  },

  as: {
    farmerTitle: "কৃষক প্ৰফাইল",
    processorTitle: "প্ৰচেছৰ প্ৰফাইল",
    buyerTitle: "সাধাৰণ ক্ৰেতা প্ৰফাইল",
    logisticsTitle: "লজিষ্টিক্স অংশীদাৰ প্ৰফাইল",

    farmerSubtitle: "আপোনাৰ বিষয়ে তথ্য দিয়ক",
    processorSubtitle: "আপোনাৰ প্ৰচেছিং ব্যৱসায়ৰ বিষয়ে তথ্য দিয়ক",
    buyerSubtitle: "আপোনাৰ ক্ৰয়ৰ প্ৰয়োজনীয়তাৰ বিষয়ে তথ্য দিয়ক",
    logisticsSubtitle: "আপোনাৰ লজিষ্টিক্স সেৱাৰ বিষয়ে তথ্য দিয়ক",

    fullName: "সম্পূৰ্ণ নাম",
    fullNamePlaceholder: "আপোনাৰ সম্পূৰ্ণ নাম লিখক",
    mobile: "ম'বাইল নম্বৰ",
    mobilePlaceholder: "9876543210",

    pinCode: "পিন কোড",
    pinCodePlaceholder: "৬ সংখ্যাৰ পিন কোড লিখক",
    village: "গাঁও / চহৰ / নগৰ",
    villagePlaceholder: "গাঁও, চহৰ বা নগৰ লিখক",
    district: "জিলা",
    districtPlaceholder: "জিলাৰ নাম লিখক",
    state: "ৰাজ্য",
    statePlaceholder: "ৰাজ্যৰ নাম লিখক",

    businessName: "ব্যৱসায় / কোম্পানীৰ নাম",
    businessNamePlaceholder:
      "ব্যৱসায় বা কোম্পানীৰ নাম লিখক",

    processingType: "প্ৰচেছিংৰ ধৰণ",
    processingTypePlaceholder:
      "উদাহৰণ: খাদ্য প্ৰচেছিং, তেল নিষ্কাশন",
    materialRequired: "প্ৰয়োজনীয় সামগ্ৰী / কৃষি আৱৰ্জনা",
    materialRequiredPlaceholder:
      "উদাহৰণ: ঘেঁহুৰ আৱৰ্জনা, ধানৰ ভূচি, খেৰ",

    cropsInterested: "আগ্ৰহ থকা শস্য",
    cropsInterestedPlaceholder:
      "উদাহৰণ: ঘেঁহু, চাউল, মাকৈ",
    requiredQuantity: "প্ৰয়োজনীয় পৰিমাণ",
    requiredQuantityPlaceholder:
      "উদাহৰণ: 1000 কিলোগ্ৰাম",
    buyingLocation: "ক্ৰয় স্থান",
    buyingLocationPlaceholder:
      "ক্ৰয় স্থান লিখক",

    vehicleType: "যানবাহনৰ ধৰণ",
    vehicleTypePlaceholder:
      "উদাহৰণ: ট্ৰেক্টৰ, মিনি ট্ৰাক, ট্ৰাক",
    vehicleNumber: "যানবাহনৰ নম্বৰ",
    vehicleNumberPlaceholder:
      "উদাহৰণ: BR01AB1234",
    driverName: "ড্ৰাইভাৰৰ নাম",
    driverNamePlaceholder:
      "ড্ৰাইভাৰৰ নাম লিখক",
    driverPhone: "ড্ৰাইভাৰৰ ফোন",
    driverPhonePlaceholder:
      "ড্ৰাইভাৰৰ ফোন নম্বৰ লিখক",
    serviceArea: "সেৱা এলেকা",
    serviceAreaPlaceholder:
      "উদাহৰণ: বিহাৰ, দিল্লী, হাৰিয়ানা",

    save: "প্ৰফাইল সংৰক্ষণ কৰক",
    back: "উভতি যাওক",
    saved: "প্ৰফাইল সফলভাৱে সংৰক্ষণ কৰা হৈছে!",
    searchingPin: "স্থান বিচৰা হৈছে...",
    pinFound: "স্থান পোৱা গ'ল",
    invalidPin:
      "পিন কোড পোৱা নগ'ল। অনুগ্ৰহ কৰি পৰীক্ষা কৰক।",
    loadingStates: "ৰাজ্যসমূহ লোড হৈ আছে...",
    loadingDistricts: "জিলাসমূহ লোড হৈ আছে...",
    noSuggestions:
      "কোনো মিল থকা পৰামৰ্শ পোৱা নগ'ল।",
    selectSuggestion: "পৰামৰ্শৰ পৰা বাছনি কৰক",
    enterPinFirst: "প্ৰথমে পিন কোড লিখক",
    districtAfterState:
      "জিলা চাবলৈ প্ৰথমে ৰাজ্য বাছনি কৰক",
    invalidMobile:
      "অনুগ্ৰহ কৰি সঠিক ১০ সংখ্যাৰ ম'বাইল নম্বৰ লিখক।",
    locationHelp:
      "প্ৰথমে পিন কোড লিখক। ৰাজ্য, জিলা আৰু ওচৰৰ ডাক স্থানসমূহ স্বয়ংক্ৰিয়ভাৱে পৰামৰ্শ দিয়া হ'ব।",
  },

  ur: {
    farmerTitle: "کسان پروفائل",
    processorTitle: "پروسیسر پروفائل",
    buyerTitle: "عام خریدار پروفائل",
    logisticsTitle: "لاجسٹکس پارٹنر پروفائل",

    farmerSubtitle: "اپنے بارے میں معلومات دیں",
    processorSubtitle: "اپنے پروسیسنگ کاروبار کے بارے میں معلومات دیں",
    buyerSubtitle: "اپنی خریداری کی ضروریات کے بارے میں معلومات دیں",
    logisticsSubtitle: "اپنی لاجسٹکس سروس کے بارے میں معلومات دیں",

    fullName: "پورا نام",
    fullNamePlaceholder: "اپنا پورا نام درج کریں",
    mobile: "موبائل نمبر",
    mobilePlaceholder: "9876543210",

    pinCode: "پن کوڈ",
    pinCodePlaceholder: "6 ہندسوں کا پن کوڈ درج کریں",
    village: "گاؤں / شہر / قصبہ",
    villagePlaceholder:
      "گاؤں، شہر یا قصبہ درج کریں",
    district: "ضلع",
    districtPlaceholder: "ضلع کا نام درج کریں",
    state: "ریاست",
    statePlaceholder: "ریاست کا نام درج کریں",

    businessName: "کاروبار / کمپنی کا نام",
    businessNamePlaceholder:
      "کاروبار یا کمپنی کا نام درج کریں",

    processingType: "پروسیسنگ کی قسم",
    processingTypePlaceholder:
      "مثال: فوڈ پروسیسنگ، تیل نکالنا",
    materialRequired: "ضروری مواد / زرعی فضلہ",
    materialRequiredPlaceholder:
      "مثال: گندم کا فضلہ، چاول کی بھوسی، بھوسہ",

    cropsInterested: "دلچسپی والی فصلیں",
    cropsInterestedPlaceholder:
      "مثال: گندم، چاول، مکئی",
    requiredQuantity: "ضروری مقدار",
    requiredQuantityPlaceholder:
      "مثال: 1000 کلو",
    buyingLocation: "خریداری کی جگہ",
    buyingLocationPlaceholder:
      "خریداری کی جگہ درج کریں",

    vehicleType: "گاڑی کی قسم",
    vehicleTypePlaceholder:
      "مثال: ٹریکٹر، منی ٹرک، ٹرک",
    vehicleNumber: "گاڑی نمبر",
    vehicleNumberPlaceholder:
      "مثال: BR01AB1234",
    driverName: "ڈرائیور کا نام",
    driverNamePlaceholder:
      "ڈرائیور کا نام درج کریں",
    driverPhone: "ڈرائیور فون",
    driverPhonePlaceholder:
      "ڈرائیور کا فون نمبر درج کریں",
    serviceArea: "سروس ایریا",
    serviceAreaPlaceholder:
      "مثال: بہار، دہلی، ہریانہ",

    save: "پروفائل محفوظ کریں",
    back: "واپس جائیں",
    saved: "پروفائل کامیابی سے محفوظ ہو گیا!",
    searchingPin: "مقام تلاش کیا جا رہا ہے...",
    pinFound: "مقام مل گیا",
    invalidPin:
      "پن کوڈ نہیں ملا۔ براہ کرم پن کوڈ چیک کریں۔",
    loadingStates: "ریاستیں لوڈ ہو رہی ہیں...",
    loadingDistricts: "اضلاع لوڈ ہو رہے ہیں...",
    noSuggestions:
      "کوئی مماثل تجاویز نہیں ملیں۔",
    selectSuggestion: "تجاویز میں سے منتخب کریں",
    enterPinFirst: "پہلے پن کوڈ درج کریں",
    districtAfterState:
      "اضلاع دیکھنے کے لیے پہلے ریاست منتخب کریں",
    invalidMobile:
      "براہ کرم درست 10 ہندسوں کا موبائل نمبر درج کریں۔",
    locationHelp:
      "پہلے پن کوڈ درج کریں۔ ریاست، ضلع اور قریبی ڈاک کے مقامات خودکار طور پر تجویز کیے جائیں گے۔",
  },
};

export default function FarmerProfile() {
  const router = useRouter();
  const { language } = useLanguage();

  const [role, setRole] = useState<Role>("farmer");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pinCode: "",
    state: "",
    district: "",
    village: "",

    businessName: "",
    processingType: "",
    materialRequired: "",

    cropsInterested: "",
    requiredQuantity: "",
    buyingLocation: "",

    vehicleType: "",
    vehicleNumber: "",
    driverName: "",
    driverPhone: "",
    serviceArea: "",
  });

  const [states, setStates] = useState<StateItem[]>([]);
  const [districts, setDistricts] = useState<DistrictItem[]>([]);
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [searchingPin, setSearchingPin] = useState(false);

  const [showStateSuggestions, setShowStateSuggestions] =
    useState(false);

  const [showDistrictSuggestions, setShowDistrictSuggestions] =
    useState(false);

  const [showVillageSuggestions, setShowVillageSuggestions] =
    useState(false);

  const [pinMessage, setPinMessage] = useState("");

  const t = translations[language] || translations.en;

  /* =========================================================
     ROLE
  ========================================================= */

  useEffect(() => {
    const savedRole =
      localStorage.getItem("userRole") as Role | null;

    if (
      savedRole === "farmer" ||
      savedRole === "processor" ||
      savedRole === "buyer" ||
      savedRole === "logistics"
    ) {
      setRole(savedRole);
    }
  }, []);

  /* =========================================================
     ROLE INFORMATION
  ========================================================= */

  const roleInfo = useMemo(() => {
    if (role === "processor") {
      return {
        title: t.processorTitle,
        subtitle: t.processorSubtitle,
        icon: "🏭",
        storageKey: "processorProfile",
        route: "/dashboard/processor",
      };
    }

    if (role === "buyer") {
      return {
        title: t.buyerTitle,
        subtitle: t.buyerSubtitle,
        icon: "🛒",
        storageKey: "buyerProfile",
        route: "/dashboard/buyer",
      };
    }

    if (role === "logistics") {
      return {
        title: t.logisticsTitle,
        subtitle: t.logisticsSubtitle,
        icon: "🚚",
        storageKey: "logisticsProfile",
        route: "/dashboard/logistics",
      };
    }

    return {
      title: t.farmerTitle,
      subtitle: t.farmerSubtitle,
      icon: "👨‍🌾",
      storageKey: "farmerProfile",
      route: "/crops",
    };
  }, [role, t]);

  /* =========================================================
     LOAD SAVED ROLE PROFILE
  ========================================================= */

  useEffect(() => {
    const savedProfile = localStorage.getItem(
      roleInfo.storageKey
    );

    if (!savedProfile) {
      return;
    }

    try {
      const profile = JSON.parse(savedProfile);

      setForm((prev) => ({
        ...prev,
        ...profile,
      }));
    } catch {
      console.error("Invalid saved profile");
    }
  }, [roleInfo.storageKey]);

  /* =========================================================
     LOAD STATES
  ========================================================= */

  useEffect(() => {
    const controller = new AbortController();

    const loadStates = async () => {
      try {
        setLoadingStates(true);

        const response = await fetch(
          `${BASE_URL}/states.json`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `State API error: ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid states response");
        }

        const cleanedStates: StateItem[] = data
          .map((item: any) => ({
            name: String(item?.name || "").trim(),
            slug: String(item?.slug || "").trim(),
            districtCount:
              Number(item?.districtCount) || 0,
            officeCount:
              Number(item?.officeCount) || 0,
          }))
          .filter(
            (item: StateItem) =>
              item.name && item.slug
          );

        setStates(cleanedStates);
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          console.error(
            "State loading error:",
            error
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingStates(false);
        }
      }
    };

    loadStates();

    return () => {
      controller.abort();
    };
  }, []);

  /* =========================================================
     SELECTED STATE
  ========================================================= */

  const selectedState = useMemo(() => {
    const stateName =
      form.state.trim().toLowerCase();

    if (!stateName) {
      return null;
    }

    return (
      states.find(
        (item) =>
          item.name.trim().toLowerCase() ===
          stateName
      ) || null
    );
  }, [states, form.state]);

  /* =========================================================
     LOAD DISTRICTS
  ========================================================= */

  useEffect(() => {
    if (!selectedState?.slug) {
      setDistricts([]);
      setLoadingDistricts(false);
      return;
    }

    const controller =
      new AbortController();

    const loadDistricts = async () => {
      try {
        setLoadingDistricts(true);

        const url =
          `${BASE_URL}/states/` +
          `${encodeURIComponent(
            selectedState.slug
          )}.json`;

        const response =
          await fetch(url, {
            signal: controller.signal,
            cache: "no-store",
          });

        if (!response.ok) {
          throw new Error(
            `District API error: ${response.status}`
          );
        }

        const data =
          await response.json();

        if (
          !data ||
          !Array.isArray(data.districts)
        ) {
          throw new Error(
            "Invalid district response"
          );
        }

        const districtList: DistrictItem[] =
          data.districts
            .map((item: any) => ({
              name: String(
                item?.name || ""
              ).trim(),
              slug: String(
                item?.slug || ""
              ).trim(),
              officeCount:
                Number(
                  item?.officeCount
                ) || 0,
            }))
            .filter(
              (item: DistrictItem) =>
                item.name &&
                item.slug
            );

        setDistricts(districtList);
      } catch (error: any) {
        if (
          error?.name !==
          "AbortError"
        ) {
          console.error(
            "District loading error:",
            error
          );
          setDistricts([]);
        }
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoadingDistricts(false);
        }
      }
    };

    loadDistricts();

    return () => {
      controller.abort();
    };
  }, [selectedState]);

  /* =========================================================
     PIN LOOKUP
  ========================================================= */

  useEffect(() => {
    const pin = form.pinCode.trim();

    if (!/^\d{6}$/.test(pin)) {
      setPostOffices([]);
      setPinMessage("");
      setSearchingPin(false);
      return;
    }

    const controller =
      new AbortController();

    const lookupPin = async () => {
      try {
        setSearchingPin(true);
        setPinMessage("");
        setPostOffices([]);

        const response =
          await fetch(
            `${BASE_URL}/pincodes/${pin}.json`,
            {
              signal: controller.signal,
              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            `PIN not found: ${response.status}`
          );
        }

        const data: PinApiResponse =
          await response.json();

        let offices: PostOffice[] =
          Array.isArray(data?.offices)
            ? data.offices
            : [];

        if (
          offices.length === 0 &&
          Array.isArray(data?.PostOffice)
        ) {
          offices = data.PostOffice;
        }

        if (!offices.length) {
          setPostOffices([]);
          setPinMessage(t.invalidPin);
          return;
        }

        const normalizedOffices =
          offices.map((office: any) => ({
            ...office,

            Name:
              office?.Name ||
              office?.officeName ||
              "",

            District:
              office?.District ||
              data?.district ||
              "",

            State:
              office?.State ||
              data?.state ||
              "",

            DeliveryStatus:
              office?.DeliveryStatus ||
              office?.deliveryStatus ||
              "",

            Pincode:
              office?.Pincode ||
              office?.pincode ||
              pin,
          }));

        setPostOffices(
          normalizedOffices
        );

        const detectedState =
          String(
            data?.state ||
              normalizedOffices[0]?.State ||
              ""
          ).trim();

        const detectedDistrict =
          String(
            data?.district ||
              normalizedOffices[0]?.District ||
              ""
          ).trim();

        if (
          detectedState ||
          detectedDistrict
        ) {
          setForm((prev) => ({
            ...prev,

            state:
              detectedState ||
              prev.state,

            district:
              detectedDistrict ||
              prev.district,
          }));
        }

        setPinMessage(t.pinFound);
      } catch (error: any) {
        if (
          error?.name ===
          "AbortError"
        ) {
          return;
        }

        console.error(
          "PIN lookup error:",
          error
        );

        setPostOffices([]);
        setPinMessage(t.invalidPin);
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setSearchingPin(false);
        }
      }
    };

    lookupPin();

    return () => {
      controller.abort();
    };
  }, [
    form.pinCode,
    t.invalidPin,
    t.pinFound,
  ]);

  /* =========================================================
     FILTERS
  ========================================================= */

  const filteredStates =
    useMemo(() => {
      const query =
        form.state
          .trim()
          .toLowerCase();

      if (!query) {
        return states.slice(0, 20);
      }

      return states
        .filter((item) =>
          item.name
            .toLowerCase()
            .includes(query)
        )
        .slice(0, 20);
    }, [states, form.state]);

  const filteredDistricts =
    useMemo(() => {
      const query =
        form.district
          .trim()
          .toLowerCase();

      if (!query) {
        return districts.slice(0, 30);
      }

      return districts
        .filter((item) =>
          item.name
            .toLowerCase()
            .includes(query)
        )
        .slice(0, 30);
    }, [districts, form.district]);

  const filteredPostOffices =
    useMemo(() => {
      const query =
        form.village
          .trim()
          .toLowerCase();

      const unique =
        new Map<string, PostOffice>();

      postOffices.forEach((office) => {
        const name =
          String(
            office?.Name ||
              office?.officeName ||
              ""
          ).trim();

        if (!name) {
          return;
        }

        if (
          !query ||
          name
            .toLowerCase()
            .includes(query)
        ) {
          unique.set(
            name.toLowerCase(),
            office
          );
        }
      });

      return Array.from(
        unique.values()
      ).slice(0, 30);
    }, [
      postOffices,
      form.village,
    ]);

  /* =========================================================
     CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = e.target;

    if (
      name === "phone" ||
      name === "driverPhone"
    ) {
      const numericValue =
        value
          .replace(/\D/g, "")
          .slice(0, 10);

      setForm((prev) => ({
        ...prev,
        [name]: numericValue,
      }));

      return;
    }

    if (name === "pinCode") {
      const numericValue =
        value
          .replace(/\D/g, "")
          .slice(0, 6);

      setForm((prev) => ({
        ...prev,
        pinCode: numericValue,
      }));

      if (
        numericValue.length < 6
      ) {
        setPinMessage("");
        setPostOffices([]);
      }

      return;
    }

    if (name === "state") {
      setForm((prev) => ({
        ...prev,
        state: value,
        district: "",
        village: "",
      }));

      setShowStateSuggestions(true);
      setShowDistrictSuggestions(false);
      setShowVillageSuggestions(false);

      return;
    }

    if (name === "district") {
      setForm((prev) => ({
        ...prev,
        district: value,
        village: "",
      }));

      setShowDistrictSuggestions(true);

      return;
    }

    if (name === "village") {
      setForm((prev) => ({
        ...prev,
        village: value,
      }));

      setShowVillageSuggestions(true);

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     SELECT STATE
  ========================================================= */

  const selectState = (
    stateName: string
  ) => {
    setForm((prev) => ({
      ...prev,
      state: stateName,
      district: "",
      village: "",
    }));

    setShowStateSuggestions(false);
    setShowDistrictSuggestions(false);
    setShowVillageSuggestions(false);
  };

  /* =========================================================
     SELECT DISTRICT
  ========================================================= */

  const selectDistrict = (
    districtName: string
  ) => {
    setForm((prev) => ({
      ...prev,
      district: districtName,
      village: "",
    }));

    setShowDistrictSuggestions(false);
  };

  /* =========================================================
     SELECT VILLAGE
  ========================================================= */

  const selectVillage = (
    office: PostOffice
  ) => {
    const name =
      String(
        office?.Name ||
          office?.officeName ||
          ""
      ).trim();

    const district =
      String(
        office?.District || ""
      ).trim();

    const state =
      String(
        office?.State || ""
      ).trim();

    setForm((prev) => ({
      ...prev,

      village:
        name || prev.village,

      district:
        district || prev.district,

      state:
        state || prev.state,
    }));

    setShowVillageSuggestions(false);
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert(t.fullNamePlaceholder);
      return;
    }

    if (
      !/^\d{10}$/.test(form.phone)
    ) {
      alert(t.invalidMobile);
      return;
    }

    if (
      !/^\d{6}$/.test(form.pinCode)
    ) {
      alert(t.pinCodePlaceholder);
      return;
    }

    if (!postOffices.length) {
      alert(t.invalidPin);
      return;
    }

    if (!form.state.trim()) {
      alert(t.statePlaceholder);
      return;
    }

    if (!form.district.trim()) {
      alert(t.districtPlaceholder);
      return;
    }

    if (!form.village.trim()) {
      alert(t.villagePlaceholder);
      return;
    }

    if (
      role === "processor" &&
      !form.businessName.trim()
    ) {
      alert(t.businessNamePlaceholder);
      return;
    }

    if (
      role === "processor" &&
      !form.processingType.trim()
    ) {
      alert(t.processingTypePlaceholder);
      return;
    }

    if (
      role === "buyer" &&
      !form.cropsInterested.trim()
    ) {
      alert(t.cropsInterestedPlaceholder);
      return;
    }

    if (
      role === "logistics" &&
      !form.vehicleType.trim()
    ) {
      alert(t.vehicleTypePlaceholder);
      return;
    }

    if (
      role === "logistics" &&
      !form.vehicleNumber.trim()
    ) {
      alert(t.vehicleNumberPlaceholder);
      return;
    }

    if (
      role === "logistics" &&
      !/^\d{10}$/.test(
        form.driverPhone
      )
    ) {
      alert(t.invalidMobile);
      return;
    }

    const profile = {
      ...form,
      role,
      address: `${form.village}, ${form.district}, ${form.state} - ${form.pinCode}`,
      updatedAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      roleInfo.storageKey,
      JSON.stringify(profile)
    );

    localStorage.setItem(
      "currentProfile",
      JSON.stringify(profile)
    );

    alert(t.saved);

    router.push(roleInfo.route);
  };

  /* =========================================================
     CLOSE
  ========================================================= */

  const closeSuggestions = () => {
    setShowStateSuggestions(false);
    setShowDistrictSuggestions(false);
    setShowVillageSuggestions(false);
  };

  /* =========================================================
     FIELD COMPONENT
  ========================================================= */

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400";

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={
        language === "ur"
          ? "rtl"
          : "ltr"
      }
    >
      <div className="max-w-3xl mx-auto">

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            router.back()
          }
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.back}
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-7">

          {/* HEADER */}

          <div className="text-center mb-8">

            <div className="text-6xl mb-3">
              {roleInfo.icon}
            </div>

            <h1 className="text-3xl font-bold text-green-800">
              {roleInfo.title}
            </h1>

            <p className="text-gray-600 mt-2">
              {roleInfo.subtitle}
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.fullName}
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder={
                  t.fullNamePlaceholder
                }
                required
                className={inputClass}
              />

            </div>

            {/* BUSINESS NAME */}

            {role !== "farmer" && (
              <div className="mb-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.businessName}
                </label>

                <input
                  name="businessName"
                  value={
                    form.businessName
                  }
                  onChange={handleChange}
                  type="text"
                  placeholder={
                    t.businessNamePlaceholder
                  }
                  className={inputClass}
                />

              </div>
            )}

            {/* MOBILE */}

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.mobile}
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                inputMode="numeric"
                placeholder={
                  t.mobilePlaceholder
                }
                maxLength={10}
                required
                className={inputClass}
              />

            </div>

            {/* PIN */}

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.pinCode}
              </label>

              <input
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder={
                  t.pinCodePlaceholder
                }
                required
                className={inputClass}
              />

              <p className="text-xs text-gray-500 mt-2">
                {t.locationHelp}
              </p>

              {searchingPin && (
                <p className="text-sm text-blue-600 mt-2 font-medium">
                  🔎 {t.searchingPin}
                </p>
              )}

              {!searchingPin &&
                pinMessage && (
                  <p
                    className={`text-sm mt-2 font-medium ${
                      pinMessage ===
                      t.pinFound
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {pinMessage ===
                    t.pinFound
                      ? "✓ "
                      : "⚠️ "}
                    {pinMessage}
                  </p>
                )}

            </div>

            {/* STATE */}

            <div className="mb-5 relative">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.state}
              </label>

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                onFocus={() =>
                  setShowStateSuggestions(
                    true
                  )
                }
                autoComplete="off"
                type="text"
                placeholder={
                  t.statePlaceholder
                }
                required
                className={inputClass}
              />

              {showStateSuggestions && (
                <div className="absolute z-30 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">

                  {loadingStates ? (
                    <div className="px-4 py-3 text-gray-500">
                      {t.loadingStates}
                    </div>
                  ) : filteredStates.length > 0 ? (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-400 border-b">
                        {t.selectSuggestion}
                      </div>

                      {filteredStates.map(
                        (item) => (
                          <button
                            type="button"
                            key={item.slug}
                            onMouseDown={(
                              e
                            ) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              selectState(
                                item.name
                              )
                            }
                            className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-800"
                          >
                            <div>
                              {item.name}
                            </div>

                            {item.districtCount ? (
                              <div className="text-xs text-gray-400 mt-1">
                                {
                                  item.districtCount
                                }{" "}
                                districts
                              </div>
                            ) : null}
                          </button>
                        )
                      )}
                    </>
                  ) : (
                    <div className="px-4 py-3 text-gray-500">
                      {t.noSuggestions}
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* DISTRICT */}

            <div className="mb-5 relative">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.district}
              </label>

              <input
                name="district"
                value={
                  form.district
                }
                onChange={handleChange}
                onFocus={() =>
                  setShowDistrictSuggestions(
                    true
                  )
                }
                autoComplete="off"
                type="text"
                placeholder={
                  form.state
                    ? t.districtPlaceholder
                    : t.districtAfterState
                }
                disabled={!form.state}
                required
                className={`${inputClass} disabled:bg-gray-100 disabled:cursor-not-allowed`}
              />

              {form.state &&
                showDistrictSuggestions && (
                  <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">

                    {loadingDistricts ? (
                      <div className="px-4 py-3 text-gray-500">
                        {t.loadingDistricts}
                      </div>
                    ) : filteredDistricts.length > 0 ? (
                      <>
                        <div className="px-4 py-2 text-xs text-gray-400 border-b">
                          {t.selectSuggestion}
                        </div>

                        {filteredDistricts.map(
                          (item) => (
                            <button
                              type="button"
                              key={item.slug}
                              onMouseDown={(
                                e
                              ) =>
                                e.preventDefault()
                              }
                              onClick={() =>
                                selectDistrict(
                                  item.name
                                )
                              }
                              className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-800"
                            >
                              {item.name}
                            </button>
                          )
                        )}
                      </>
                    ) : (
                      <div className="px-4 py-3 text-gray-500">
                        {t.noSuggestions}
                      </div>
                    )}

                  </div>
                )}

            </div>

            {/* VILLAGE */}

            <div className="mb-7 relative">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.village}
              </label>

              <input
                name="village"
                value={
                  form.village
                }
                onChange={handleChange}
                onFocus={() =>
                  setShowVillageSuggestions(
                    true
                  )
                }
                autoComplete="off"
                type="text"
                placeholder={
                  t.villagePlaceholder
                }
                required
                className={inputClass}
              />

              {postOffices.length > 0 &&
                showVillageSuggestions && (
                  <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">

                    <div className="px-4 py-2 text-xs text-gray-400 border-b">
                      {t.selectSuggestion}
                    </div>

                    {filteredPostOffices.length > 0 ? (
                      filteredPostOffices.map(
                        (
                          office,
                          index
                        ) => (
                          <button
                            type="button"
                            key={`${office.Name}-${index}`}
                            onMouseDown={(
                              e
                            ) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              selectVillage(
                                office
                              )
                            }
                            className="w-full text-left px-4 py-3 hover:bg-green-50"
                          >
                            <div className="font-semibold text-gray-800">
                              {office.Name}
                            </div>

                            <div className="text-xs text-gray-500 mt-1">
                              {office.District
                                ? `${office.District}, `
                                : ""}
                              {office.State}
                            </div>
                          </button>
                        )
                      )
                    ) : (
                      <div className="px-4 py-3 text-gray-500">
                        {t.noSuggestions}
                      </div>
                    )}

                  </div>
                )}

              {form.pinCode.length < 6 && (
                <p className="text-xs text-gray-400 mt-2">
                  {t.enterPinFirst}
                </p>
              )}

            </div>

            {/* =================================================
                PROCESSOR FIELDS
            ================================================= */}

            {role === "processor" && (
              <>
                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.processingType}
                  </label>

                  <input
                    name="processingType"
                    value={
                      form.processingType
                    }
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t.processingTypePlaceholder
                    }
                    className={inputClass}
                  />

                </div>

                <div className="mb-7">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.materialRequired}
                  </label>

                  <input
                    name="materialRequired"
                    value={
                      form.materialRequired
                    }
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t.materialRequiredPlaceholder
                    }
                    className={inputClass}
                  />

                </div>
              </>
            )}

            {/* =================================================
                BUYER FIELDS
            ================================================= */}

            {role === "buyer" && (
              <>
                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.cropsInterested}
                  </label>

                  <input
                    name="cropsInterested"
                    value={
                      form.cropsInterested
                    }
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t.cropsInterestedPlaceholder
                    }
                    className={inputClass}
                  />

                </div>

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.requiredQuantity}
                  </label>

                  <input
                    name="requiredQuantity"
                    value={
                      form.requiredQuantity
                    }
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t.requiredQuantityPlaceholder
                    }
                    className={inputClass}
                  />

                </div>

                <div className="mb-7">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.buyingLocation}
                  </label>

                  <input
                    name="buyingLocation"
                    value={
                      form.buyingLocation
                    }
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t.buyingLocationPlaceholder
                    }
                    className={inputClass}
                  />

                </div>
              </>
            )}

            {/* =================================================
                LOGISTICS FIELDS
            ================================================= */}

            {role === "logistics" && (
              <>
                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.vehicleType}
                  </label>

                  <input
                    name="vehicleType"
                    value={
                      form.vehicleType
                    }
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t.vehicleTypePlaceholder
                    }
                    className={inputClass}
                  />

                </div>

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.vehicleNumber}
                  </label>

                  <input
                    name="vehicleNumber"
                    value={
                      form.vehicleNumber
                    }
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t.vehicleNumberPlaceholder
                    }
                    className={inputClass}
                  />

                </div>

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.driverName}
                  </label>

                  <input
                    name="driverName"
                    value={
                      form.driverName
                    }
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t.driverNamePlaceholder
                    }
                    className={inputClass}
                  />

                </div>

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.driverPhone}
                  </label>

                  <input
                    name="driverPhone"
                    value={
                      form.driverPhone
                    }
                    onChange={handleChange}
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder={
                      t.driverPhonePlaceholder
                    }
                    className={inputClass}
                  />

                </div>

                <div className="mb-7">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.serviceArea}
                  </label>

                  <input
                    name="serviceArea"
                    value={
                      form.serviceArea
                    }
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t.serviceAreaPlaceholder
                    }
                    className={inputClass}
                  />

                </div>
              </>
            )}

            {/* SAVE */}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
            >
              {t.save}
            </button>

          </form>
        </div>
      </div>

      {/* CLOSE SUGGESTIONS */}

      <button
        type="button"
        aria-label="Close suggestions"
        className="fixed inset-0 -z-10 cursor-default"
        onClick={
          closeSuggestions
        }
      />

    </main>
  );
}