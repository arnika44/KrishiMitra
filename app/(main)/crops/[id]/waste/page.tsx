"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
};

type WasteAnalysis = {
  wasteType: string;
  confidence: string;
  uses: string[];
  decomposition: string[];
  decompositionTime: string;
  avoid: string[];
  products: string[];
};

type Translation = {
  back: string;
  season: string;
  wasteTitle: string;
  land: string;
  identifyTitle: string;
  identifyDesc: string;
  tip: string;
  tipDesc: string;
  takePhoto: string;
  choosePhoto: string;
  yourPhoto: string;
  anotherPhoto: string;
  remove: string;
  analyzeWaste: string;
  analyzingWaste: string;
  analyzingTitle: string;
  analyzingDesc: string;
  loading: string;
  pleaseWait: string;
  cropNotFound: string;
  backToCrops: string;
  wasteIdentified: string;
  identification: string;
  whatCanYouDo: string;
  howToDecompose: string;
  decompositionDesc: string;
  estimatedTime: string;
  usefulProducts: string;
  thingsToAvoid: string;
  important: string;
  disclaimer: string;
  analyzeAnother: string;
  selectPhotoFirst: string;
  invalidImage: string;
  demoResult: string;
  wheatStraw: string;
  cropResidue: string;
  compost: string;
  mulch: string;
  animalBedding: string;
  biomass: string;
  briquettes: string;
  mushroom: string;
  organicManure: string;
  avoidBurning: string;
  avoidWater: string;
  avoidPlastic: string;
  avoidChemical: string;
  cutSmall: string;
  makeLayer: string;
  addCowDung: string;
  maintainMoisture: string;
  turnPile: string;
  avoidWaterLogging: string;
  decomposition45to90: string;
  decomposition45to90General: string;
  guideDisclaimer: string;
};

const translations: Record<string, Translation> = {
  en: {
    back: "← Back to",
    season: "Season",
    wasteTitle: "Waste Utilization",
    land: "acres",
    identifyTitle: "🌾 Identify Your Crop Waste",
    identifyDesc:
      "Take a clear photo of your crop waste. The system can analyze the waste and suggest useful ways to reuse, compost or decompose it.",
    tip: "📸 Tip",
    tipDesc:
      "Take the photo in good light and keep the crop waste clearly visible.",
    takePhoto: "📷 Take Photo",
    choosePhoto: "🖼️ Choose Photo",
    yourPhoto: "📸 Your Waste Photo",
    anotherPhoto: "📷 Take Another Photo",
    remove: "🗑️ Remove",
    analyzeWaste: "🔍 Analyze Waste",
    analyzingWaste: "🔍 Analyzing Waste...",
    analyzingTitle: "Analyzing Your Waste",
    analyzingDesc:
      "Please wait while we identify possible uses and decomposition methods.",
    loading: "Loading...",
    pleaseWait: "Please wait...",
    cropNotFound: "Crop not found",
    backToCrops: "← Back to Crops",
    wasteIdentified: "Waste Identified",
    identification: "ℹ️ Identification",
    whatCanYouDo: "💡 What Can You Do With It?",
    howToDecompose: "♻️ How To Decompose It",
    decompositionDesc:
      "Suggested compost/decomposition process:",
    estimatedTime: "⏱️ Estimated Decomposition Time",
    usefulProducts: "📦 Useful Products",
    thingsToAvoid: "⚠️ Things To Avoid",
    important: "ℹ️ Important",
    disclaimer:
      "Photo-based identification is only a guide. Before using crop residue for animal feed, compost, mushroom cultivation or commercial products, confirm that the material is suitable and free from chemicals, disease or contamination.",
    analyzeAnother: "📷 Analyze Another Waste Photo",
    selectPhotoFirst: "Please take or select a photo first.",
    invalidImage: "Please select an image.",
    demoResult: "Demo result",
    wheatStraw: "Wheat Straw / Crop Residue",
    cropResidue: "Crop Residue",
    compost: "Compost",
    mulch: "Mulch",
    animalBedding: "Animal Bedding",
    biomass: "Biomass",
    briquettes: "Briquettes",
    mushroom: "Mushroom Cultivation",
    organicManure: "Organic Manure",
    avoidBurning: "Do not burn the crop residue in the open.",
    avoidWater: "Do not add too much water and make it overly wet.",
    avoidPlastic: "Do not mix plastic or chemical waste with compost.",
    avoidChemical:
      "Do not mix plastic, metal or chemical waste with the residue.",
    cutSmall: "Cut the crop residue into small pieces.",
    makeLayer: "Place the residue in a 4–6 inch layer.",
    addCowDung:
      "Add a thin layer of cow dung or mature compost.",
    maintainMoisture:
      "Sprinkle a little water and maintain proper moisture.",
    turnPile:
      "Turn the compost pile every 15–20 days so that air can circulate.",
    avoidWaterLogging:
      "Do not allow too much water to collect in the pile.",
    decomposition45to90:
      "Approximately 45–90 days, depending on weather and moisture.",
    decomposition45to90General:
      "Approximately 45–90 days, depending on waste type and weather.",
    guideDisclaimer:
      "Photo-based identification is only a guide. Please verify the material before using it for animals, composting, mushroom cultivation or commercial purposes.",
  },

  hi: {
    back: "← वापस जाएँ",
    season: "सीजन",
    wasteTitle: "फसल अवशेष प्रबंधन",
    land: "एकड़",
    identifyTitle: "🌾 फसल के अवशेष की पहचान करें",
    identifyDesc:
      "फसल के अवशेष की साफ फोटो खींचें। सिस्टम फोटो के आधार पर इसके संभावित उपयोग, खाद बनाने और सड़ाने की जानकारी देगा।",
    tip: "📸 सुझाव",
    tipDesc:
      "अच्छी रोशनी में फोटो लें और फसल के अवशेष को साफ दिखाई देने दें।",
    takePhoto: "📷 फोटो खींचें",
    choosePhoto: "🖼️ फोटो चुनें",
    yourPhoto: "📸 आपके अवशेष की फोटो",
    anotherPhoto: "📷 दूसरी फोटो खींचें",
    remove: "🗑️ हटाएँ",
    analyzeWaste: "🔍 अवशेष की जाँच करें",
    analyzingWaste: "🔍 अवशेष की जाँच हो रही है...",
    analyzingTitle: "आपके फसल अवशेष की जाँच हो रही है",
    analyzingDesc:
      "कृपया प्रतीक्षा करें। हम इसके संभावित उपयोग और सड़ाने की विधि की जानकारी तैयार कर रहे हैं।",
    loading: "लोड हो रहा है...",
    pleaseWait: "कृपया प्रतीक्षा करें...",
    cropNotFound: "फसल नहीं मिली",
    backToCrops: "← फसलों पर वापस जाएँ",
    wasteIdentified: "अवशेष की पहचान",
    identification: "ℹ️ पहचान",
    whatCanYouDo: "💡 इसका क्या उपयोग किया जा सकता है?",
    howToDecompose: "♻️ इसे कैसे सड़ाएँ?",
    decompositionDesc:
      "खाद बनाने और सड़ाने की सुझाई गई प्रक्रिया:",
    estimatedTime: "⏱️ अनुमानित सड़ने का समय",
    usefulProducts: "📦 इससे बनने वाले उपयोगी उत्पाद",
    thingsToAvoid: "⚠️ किन चीजों से बचें",
    important: "ℹ️ महत्वपूर्ण जानकारी",
    disclaimer:
      "फोटो के आधार पर की गई पहचान केवल मार्गदर्शन के लिए है। पशु चारा, खाद, मशरूम उत्पादन या व्यावसायिक उपयोग से पहले यह सुनिश्चित करें कि सामग्री उपयुक्त हो और रसायन, रोग या किसी अन्य प्रदूषण से मुक्त हो।",
    analyzeAnother: "📷 किसी दूसरे अवशेष की फोटो जाँचें",
    selectPhotoFirst: "कृपया पहले फोटो खींचें या चुनें।",
    invalidImage: "कृपया फोटो चुनें।",
    demoResult: "डेमो परिणाम",
    wheatStraw: "गेहूँ का भूसा / फसल अवशेष",
    cropResidue: "फसल अवशेष",
    compost: "कम्पोस्ट खाद",
    mulch: "मल्च",
    animalBedding: "पशुओं के लिए बिछावन",
    biomass: "बायोमास",
    briquettes: "ब्रिकेट्स",
    mushroom: "मशरूम उत्पादन",
    organicManure: "जैविक खाद",
    avoidBurning: "फसल के अवशेष को खुले में जलाने से बचें।",
    avoidWater:
      "बहुत ज्यादा पानी डालकर अवशेष को अत्यधिक गीला न करें।",
    avoidPlastic:
      "प्लास्टिक या रासायनिक कचरे को कम्पोस्ट में न मिलाएँ।",
    avoidChemical:
      "प्लास्टिक, धातु या रासायनिक कचरे को अवशेष में न मिलाएँ।",
    cutSmall: "फसल के अवशेष को छोटे-छोटे टुकड़ों में काटें।",
    makeLayer:
      "अवशेष को 4–6 इंच की परत में एक जगह रखें।",
    addCowDung:
      "गोबर या तैयार कम्पोस्ट की एक पतली परत डालें।",
    maintainMoisture:
      "थोड़ा पानी छिड़कें और उचित नमी बनाए रखें।",
    turnPile:
      "हर 15–20 दिन में कम्पोस्ट के ढेर को पलटें ताकि हवा मिलती रहे।",
    avoidWaterLogging:
      "ढेर में बहुत ज्यादा पानी जमा न होने दें।",
    decomposition45to90:
      "लगभग 45–90 दिन, मौसम और नमी के अनुसार।",
    decomposition45to90General:
      "लगभग 45–90 दिन, अवशेष के प्रकार और मौसम पर निर्भर।",
    guideDisclaimer:
      "फोटो के आधार पर की गई पहचान केवल मार्गदर्शन है। पशुओं, खाद, मशरूम उत्पादन या व्यावसायिक उपयोग से पहले सामग्री की उपयुक्तता की पुष्टि करें।",
  },

  bn: {
    back: "← ফিরে যান",
    season: "মরসুম",
    wasteTitle: "ফসলের অবশিষ্টাংশ ব্যবস্থাপনা",
    land: "একর",
    identifyTitle: "🌾 আপনার ফসলের অবশিষ্টাংশ শনাক্ত করুন",
    identifyDesc:
      "ফসলের অবশিষ্টাংশের একটি পরিষ্কার ছবি তুলুন। সিস্টেম সম্ভাব্য ব্যবহার, কম্পোস্ট এবং পচন পদ্ধতি সম্পর্কে পরামর্শ দেবে।",
    tip: "📸 পরামর্শ",
    tipDesc:
      "ভালো আলোতে ছবি তুলুন এবং ফসলের অবশিষ্টাংশ পরিষ্কারভাবে দেখান।",
    takePhoto: "📷 ছবি তুলুন",
    choosePhoto: "🖼️ ছবি নির্বাচন করুন",
    yourPhoto: "📸 আপনার অবশিষ্টাংশের ছবি",
    anotherPhoto: "📷 আরেকটি ছবি তুলুন",
    remove: "🗑️ সরান",
    analyzeWaste: "🔍 অবশিষ্টাংশ বিশ্লেষণ করুন",
    analyzingWaste: "🔍 বিশ্লেষণ করা হচ্ছে...",
    analyzingTitle: "আপনার অবশিষ্টাংশ বিশ্লেষণ করা হচ্ছে",
    analyzingDesc:
      "সম্ভাব্য ব্যবহার ও পচন পদ্ধতি শনাক্ত করতে অনুগ্রহ করে অপেক্ষা করুন।",
    loading: "লোড হচ্ছে...",
    pleaseWait: "অনুগ্রহ করে অপেক্ষা করুন...",
    cropNotFound: "ফসল পাওয়া যায়নি",
    backToCrops: "← ফসলে ফিরে যান",
    wasteIdentified: "অবশিষ্টাংশ শনাক্ত হয়েছে",
    identification: "ℹ️ শনাক্তকরণ",
    whatCanYouDo: "💡 এটি কীভাবে ব্যবহার করা যায়?",
    howToDecompose: "♻️ কীভাবে পচাবেন?",
    decompositionDesc:
      "কম্পোস্ট বা পচনের প্রস্তাবিত পদ্ধতি:",
    estimatedTime: "⏱️ আনুমানিক পচনের সময়",
    usefulProducts: "📦 উপকারী পণ্য",
    thingsToAvoid: "⚠️ যেগুলো এড়িয়ে চলবেন",
    important: "ℹ️ গুরুত্বপূর্ণ",
    disclaimer:
      "ছবির ভিত্তিতে শনাক্তকরণ শুধুমাত্র নির্দেশনার জন্য। পশুখাদ্য, কম্পোস্ট, মাশরুম চাষ বা বাণিজ্যিক ব্যবহারের আগে উপাদানটি উপযুক্ত এবং রাসায়নিক, রোগ বা দূষণমুক্ত কিনা নিশ্চিত করুন।",
    analyzeAnother: "📷 অন্য অবশিষ্টাংশের ছবি বিশ্লেষণ করুন",
    selectPhotoFirst: "অনুগ্রহ করে প্রথমে একটি ছবি তুলুন বা নির্বাচন করুন।",
    invalidImage: "অনুগ্রহ করে একটি ছবি নির্বাচন করুন।",
    demoResult: "ডেমো ফলাফল",
    wheatStraw: "গমের খড় / ফসলের অবশিষ্টাংশ",
    cropResidue: "ফসলের অবশিষ্টাংশ",
    compost: "কম্পোস্ট",
    mulch: "মালচ",
    animalBedding: "পশুর বিছানা",
    biomass: "বায়োমাস",
    briquettes: "ব্রিকেট",
    mushroom: "মাশরুম চাষ",
    organicManure: "জৈব সার",
    avoidBurning: "ফসলের অবশিষ্টাংশ খোলা জায়গায় পোড়াবেন না।",
    avoidWater: "অতিরিক্ত পানি দিয়ে খুব ভিজিয়ে ফেলবেন না।",
    avoidPlastic: "প্লাস্টিক বা রাসায়নিক বর্জ্য কম্পোস্টে মেশাবেন না।",
    avoidChemical:
      "প্লাস্টিক, ধাতু বা রাসায়নিক বর্জ্য অবশিষ্টাংশের সঙ্গে মেশাবেন না।",
    cutSmall: "ফসলের অবশিষ্টাংশ ছোট ছোট টুকরো করুন।",
    makeLayer: "অবশিষ্টাংশ ৪–৬ ইঞ্চি পুরু স্তরে রাখুন।",
    addCowDung: "গোবর বা তৈরি কম্পোস্টের পাতলা স্তর দিন।",
    maintainMoisture: "অল্প পানি ছিটিয়ে সঠিক আর্দ্রতা বজায় রাখুন।",
    turnPile: "প্রতি ১৫–২০ দিনে স্তূপটি উল্টে দিন যাতে বাতাস চলাচল করতে পারে।",
    avoidWaterLogging: "স্তূপে অতিরিক্ত পানি জমতে দেবেন না।",
    decomposition45to90: "প্রায় ৪৫–৯০ দিন, আবহাওয়া ও আর্দ্রতার উপর নির্ভর করে।",
    decomposition45to90General:
      "প্রায় ৪৫–৯০ দিন, অবশিষ্টাংশের ধরন ও আবহাওয়ার উপর নির্ভর করে।",
    guideDisclaimer:
      "ছবির ভিত্তিতে শনাক্তকরণ শুধুমাত্র নির্দেশনা। পশু, কম্পোস্ট, মাশরুম চাষ বা বাণিজ্যিক ব্যবহারের আগে উপাদানের উপযুক্ততা নিশ্চিত করুন।",
  },

  mr: {
    back: "← परत जा",
    season: "हंगाम",
    wasteTitle: "पीक अवशेष व्यवस्थापन",
    land: "एकर",
    identifyTitle: "🌾 तुमच्या पीक अवशेषाची ओळख करा",
    identifyDesc:
      "पीक अवशेषाचा स्पष्ट फोटो काढा. प्रणाली त्याचा उपयोग, कंपोस्ट आणि विघटनाची पद्धत सुचवेल.",
    tip: "📸 सूचना",
    tipDesc:
      "चांगल्या प्रकाशात फोटो काढा आणि पीक अवशेष स्पष्ट दिसेल याची काळजी घ्या.",
    takePhoto: "📷 फोटो काढा",
    choosePhoto: "🖼️ फोटो निवडा",
    yourPhoto: "📸 तुमचा पीक अवशेष फोटो",
    anotherPhoto: "📷 दुसरा फोटो काढा",
    remove: "🗑️ काढा",
    analyzeWaste: "🔍 अवशेष तपासा",
    analyzingWaste: "🔍 अवशेष तपासला जात आहे...",
    analyzingTitle: "तुमच्या पीक अवशेषाची तपासणी होत आहे",
    analyzingDesc:
      "संभाव्य उपयोग आणि विघटन पद्धत शोधण्यासाठी कृपया प्रतीक्षा करा.",
    loading: "लोड होत आहे...",
    pleaseWait: "कृपया प्रतीक्षा करा...",
    cropNotFound: "पीक सापडले नाही",
    backToCrops: "← पिकांकडे परत जा",
    wasteIdentified: "अवशेष ओळखला गेला",
    identification: "ℹ️ ओळख",
    whatCanYouDo: "💡 याचा काय उपयोग करता येईल?",
    howToDecompose: "♻️ हे कसे कुजवावे?",
    decompositionDesc:
      "कंपोस्ट/विघटनाची सुचवलेली पद्धत:",
    estimatedTime: "⏱️ अंदाजे विघटन वेळ",
    usefulProducts: "📦 उपयोगी उत्पादने",
    thingsToAvoid: "⚠️ काय टाळावे",
    important: "ℹ️ महत्त्वाचे",
    disclaimer:
      "फोटोवर आधारित ओळख ही फक्त मार्गदर्शनासाठी आहे. पशुखाद्य, कंपोस्ट, मशरूम लागवड किंवा व्यावसायिक वापरापूर्वी सामग्री योग्य आणि रसायने, रोग किंवा दूषित पदार्थांपासून मुक्त असल्याची खात्री करा.",
    analyzeAnother: "📷 दुसऱ्या पीक अवशेषाचा फोटो तपासा",
    selectPhotoFirst: "कृपया आधी फोटो काढा किंवा निवडा.",
    invalidImage: "कृपया फोटो निवडा.",
    demoResult: "डेमो निकाल",
    wheatStraw: "गव्हाचा भुसा / पीक अवशेष",
    cropResidue: "पीक अवशेष",
    compost: "कंपोस्ट",
    mulch: "मल्च",
    animalBedding: "जनावरांसाठी अंथरूण",
    biomass: "बायोमास",
    briquettes: "ब्रिकेट्स",
    mushroom: "मशरूम लागवड",
    organicManure: "सेंद्रिय खत",
    avoidBurning: "पीक अवशेष उघड्यावर जाळू नका.",
    avoidWater: "खूप जास्त पाणी टाकून अवशेष खूप ओला करू नका.",
    avoidPlastic: "प्लास्टिक किंवा रासायनिक कचरा कंपोस्टमध्ये मिसळू नका.",
    avoidChemical:
      "प्लास्टिक, धातू किंवा रासायनिक कचरा अवशेषात मिसळू नका.",
    cutSmall: "पीक अवशेषाचे छोटे तुकडे करा.",
    makeLayer: "अवशेष ४–६ इंचाच्या थरात ठेवा.",
    addCowDung: "शेण किंवा तयार कंपोस्टचा पातळ थर द्या.",
    maintainMoisture: "थोडे पाणी शिंपडा आणि योग्य ओलावा ठेवा.",
    turnPile: "दर १५–२० दिवसांनी कंपोस्टचा ढीग उलटा.",
    avoidWaterLogging: "ढिगात जास्त पाणी साचू देऊ नका.",
    decomposition45to90: "साधारण ४५–९० दिवस, हवामान आणि ओलाव्यानुसार.",
    decomposition45to90General:
      "साधारण ४५–९० दिवस, अवशेषाचा प्रकार आणि हवामानावर अवलंबून.",
    guideDisclaimer:
      "फोटोवर आधारित ओळख ही फक्त मार्गदर्शन आहे. पशू, कंपोस्ट, मशरूम किंवा व्यावसायिक वापरापूर्वी सामग्री योग्य आहे याची खात्री करा.",
  },

  ta: {
    back: "← திரும்பு",
    season: "பருவம்",
    wasteTitle: "பயிர் கழிவு மேலாண்மை",
    land: "ஏக்கர்",
    identifyTitle: "🌾 உங்கள் பயிர் கழிவை கண்டறியுங்கள்",
    identifyDesc:
      "பயிர் கழிவின் தெளிவான புகைப்படத்தை எடுக்கவும். அதன் பயன்பாடு, உரமாக்கல் மற்றும் மக்கச் செய்வதற்கான வழிமுறைகளை அமைப்பு பரிந்துரைக்கும்.",
    tip: "📸 குறிப்பு",
    tipDesc:
      "நல்ல வெளிச்சத்தில் புகைப்படம் எடுத்து பயிர் கழிவு தெளிவாகத் தெரியுமாறு செய்யவும்.",
    takePhoto: "📷 புகைப்படம் எடுக்கவும்",
    choosePhoto: "🖼️ புகைப்படத்தைத் தேர்ந்தெடுக்கவும்",
    yourPhoto: "📸 உங்கள் கழிவு புகைப்படம்",
    anotherPhoto: "📷 மற்றொரு புகைப்படம்",
    remove: "🗑️ அகற்று",
    analyzeWaste: "🔍 கழிவை ஆய்வு செய்யவும்",
    analyzingWaste: "🔍 கழிவு ஆய்வு செய்யப்படுகிறது...",
    analyzingTitle: "உங்கள் பயிர் கழிவு ஆய்வு செய்யப்படுகிறது",
    analyzingDesc:
      "பயன்பாடுகள் மற்றும் மக்கும் முறைகளை கண்டறிய காத்திருக்கவும்.",
    loading: "ஏற்றப்படுகிறது...",
    pleaseWait: "தயவுசெய்து காத்திருக்கவும்...",
    cropNotFound: "பயிர் கிடைக்கவில்லை",
    backToCrops: "← பயிர்களுக்கு திரும்பு",
    wasteIdentified: "கழிவு கண்டறியப்பட்டது",
    identification: "ℹ️ அடையாளம்",
    whatCanYouDo: "💡 இதை எப்படி பயன்படுத்தலாம்?",
    howToDecompose: "♻️ இதை எப்படி மக்கச் செய்வது?",
    decompositionDesc:
      "பரிந்துரைக்கப்பட்ட உரமாக்கல்/மக்கும் முறை:",
    estimatedTime: "⏱️ மக்கும் காலம்",
    usefulProducts: "📦 பயனுள்ள பொருட்கள்",
    thingsToAvoid: "⚠️ தவிர்க்க வேண்டியவை",
    important: "ℹ️ முக்கியம்",
    disclaimer:
      "புகைப்பட அடிப்படையிலான அடையாளம் வழிகாட்டுதலுக்காக மட்டுமே. கால்நடை தீவனம், உரம், காளான் வளர்ப்பு அல்லது வணிகப் பயன்பாட்டிற்கு முன் பொருள் பாதுகாப்பானதா என்பதை உறுதி செய்யவும்.",
    analyzeAnother: "📷 மற்றொரு கழிவு புகைப்படத்தை ஆய்வு செய்யவும்",
    selectPhotoFirst: "முதலில் புகைப்படம் எடுக்கவும் அல்லது தேர்ந்தெடுக்கவும்.",
    invalidImage: "புகைப்படத்தைத் தேர்ந்தெடுக்கவும்.",
    demoResult: "டெமோ முடிவு",
    wheatStraw: "கோதுமை வைக்கோல் / பயிர் கழிவு",
    cropResidue: "பயிர் கழிவு",
    compost: "உரம்",
    mulch: "மல்ச்",
    animalBedding: "விலங்கு படுக்கை",
    biomass: "பயோமாஸ்",
    briquettes: "பிரிக்கெட்டுகள்",
    mushroom: "காளான் வளர்ப்பு",
    organicManure: "இயற்கை உரம்",
    avoidBurning: "பயிர் கழிவுகளை திறந்த வெளியில் எரிக்க வேண்டாம்.",
    avoidWater: "அதிகமாக தண்ணீர் ஊற்றி கழிவை மிகவும் ஈரமாக்க வேண்டாம்.",
    avoidPlastic: "பிளாஸ்டிக் அல்லது ரசாயன கழிவுகளை உரத்தில் கலக்க வேண்டாம்.",
    avoidChemical: "பிளாஸ்டிக், உலோகம் அல்லது ரசாயன கழிவுகளை கலக்க வேண்டாம்.",
    cutSmall: "பயிர் கழிவுகளை சிறிய துண்டுகளாக வெட்டவும்.",
    makeLayer: "கழிவுகளை 4–6 அங்குல அடுக்காக வைக்கவும்.",
    addCowDung: "மாட்டு சாணம் அல்லது தயாரான உரத்தின் மெல்லிய அடுக்கை சேர்க்கவும்.",
    maintainMoisture: "சிறிது தண்ணீர் தெளித்து ஈரப்பதத்தை பராமரிக்கவும்.",
    turnPile: "15–20 நாட்களுக்கு ஒருமுறை குவியலை திருப்பவும்.",
    avoidWaterLogging: "குவியலில் அதிக தண்ணீர் தேங்க விட வேண்டாம்.",
    decomposition45to90: "சுமார் 45–90 நாட்கள், காலநிலை மற்றும் ஈரப்பதத்தைப் பொறுத்து.",
    decomposition45to90General:
      "சுமார் 45–90 நாட்கள், கழிவு வகை மற்றும் காலநிலையைப் பொறுத்து.",
    guideDisclaimer:
      "புகைப்பட அடையாளம் வழிகாட்டுதலுக்காக மட்டுமே. பயன்பாட்டிற்கு முன் பொருளின் பொருத்தத்தை உறுதி செய்யவும்.",
  },

  te: {
    back: "← వెనక్కి",
    season: "సీజన్",
    wasteTitle: "పంట వ్యర్థాల నిర్వహణ",
    land: "ఎకరాలు",
    identifyTitle: "🌾 మీ పంట వ్యర్థాలను గుర్తించండి",
    identifyDesc:
      "పంట వ్యర్థం యొక్క స్పష్టమైన ఫోటో తీయండి. దాని ఉపయోగాలు, కంపోస్ట్ మరియు కుళ్ళించే విధానాన్ని సిస్టమ్ సూచిస్తుంది.",
    tip: "📸 సూచన",
    tipDesc:
      "మంచి వెలుతురులో ఫోటో తీసి పంట వ్యర్థం స్పష్టంగా కనిపించేలా చేయండి.",
    takePhoto: "📷 ఫోటో తీయండి",
    choosePhoto: "🖼️ ఫోటో ఎంచుకోండి",
    yourPhoto: "📸 మీ వ్యర్థం ఫోటో",
    anotherPhoto: "📷 మరో ఫోటో తీయండి",
    remove: "🗑️ తొలగించండి",
    analyzeWaste: "🔍 వ్యర్థాన్ని విశ్లేషించండి",
    analyzingWaste: "🔍 వ్యర్థాన్ని విశ్లేషిస్తోంది...",
    analyzingTitle: "మీ పంట వ్యర్థాన్ని విశ్లేషిస్తోంది",
    analyzingDesc:
      "ఉపయోగాలు మరియు కుళ్ళించే విధానాలను గుర్తించడానికి దయచేసి వేచి ఉండండి.",
    loading: "లోడ్ అవుతోంది...",
    pleaseWait: "దయచేసి వేచి ఉండండి...",
    cropNotFound: "పంట కనుగొనబడలేదు",
    backToCrops: "← పంటలకు తిరిగి వెళ్లండి",
    wasteIdentified: "వ్యర్థం గుర్తించబడింది",
    identification: "ℹ️ గుర్తింపు",
    whatCanYouDo: "💡 దీనిని ఎలా ఉపయోగించవచ్చు?",
    howToDecompose: "♻️ దీనిని ఎలా కుళ్ళించాలి?",
    decompositionDesc:
      "సూచించిన కంపోస్ట్/కుళ్ళించే విధానం:",
    estimatedTime: "⏱️ అంచనా కుళ్ళే సమయం",
    usefulProducts: "📦 ఉపయోగకరమైన ఉత్పత్తులు",
    thingsToAvoid: "⚠️ నివారించాల్సినవి",
    important: "ℹ️ ముఖ్యమైన సమాచారం",
    disclaimer:
      "ఫోటో ఆధారిత గుర్తింపు మార్గదర్శకత్వం కోసం మాత్రమే. పశువుల ఆహారం, కంపోస్ట్, పుట్టగొడుగుల పెంపకం లేదా వాణిజ్య ఉపయోగానికి ముందు పదార్థం అనుకూలంగా ఉందని నిర్ధారించండి.",
    analyzeAnother: "📷 మరో వ్యర్థ ఫోటోను విశ్లేషించండి",
    selectPhotoFirst: "ముందుగా ఫోటో తీయండి లేదా ఎంచుకోండి.",
    invalidImage: "దయచేసి ఫోటో ఎంచుకోండి.",
    demoResult: "డెమో ఫలితం",
    wheatStraw: "గోధుమ గడ్డి / పంట వ్యర్థం",
    cropResidue: "పంట వ్యర్థం",
    compost: "కంపోస్ట్",
    mulch: "మల్చ్",
    animalBedding: "పశువుల పరుపు",
    biomass: "బయోమాస్",
    briquettes: "బ్రికెట్లు",
    mushroom: "పుట్టగొడుగుల పెంపకం",
    organicManure: "సేంద్రీయ ఎరువు",
    avoidBurning: "పంట వ్యర్థాలను బహిరంగంగా కాల్చవద్దు.",
    avoidWater: "చాలా ఎక్కువ నీరు పోసి తడిగా చేయవద్దు.",
    avoidPlastic: "ప్లాస్టిక్ లేదా రసాయన వ్యర్థాలను కంపోస్ట్‌లో కలపవద్దు.",
    avoidChemical: "ప్లాస్టిక్, లోహం లేదా రసాయన వ్యర్థాలను కలపవద్దు.",
    cutSmall: "పంట వ్యర్థాలను చిన్న ముక్కలుగా కోయండి.",
    makeLayer: "వ్యర్థాన్ని 4–6 అంగుళాల పొరలో ఉంచండి.",
    addCowDung: "ఆవు పేడ లేదా తయారైన కంపోస్ట్ యొక్క పలుచని పొర వేయండి.",
    maintainMoisture: "కొద్దిగా నీరు చల్లి తేమను కాపాడండి.",
    turnPile: "ప్రతి 15–20 రోజులకు కంపోస్ట్ కుప్పను తిప్పండి.",
    avoidWaterLogging: "కుప్పలో ఎక్కువ నీరు నిల్వ ఉండనివ్వకండి.",
    decomposition45to90: "సుమారు 45–90 రోజులు, వాతావరణం మరియు తేమను బట్టి.",
    decomposition45to90General:
      "సుమారు 45–90 రోజులు, వ్యర్థ రకం మరియు వాతావరణాన్ని బట్టి.",
    guideDisclaimer:
      "ఫోటో ఆధారిత గుర్తింపు మార్గదర్శకత్వం కోసం మాత్రమే. ఉపయోగించే ముందు పదార్థం అనుకూలతను నిర్ధారించండి.",
  },

  gu: {
    back: "← પાછા જાઓ",
    season: "મોસમ",
    wasteTitle: "પાક કચરો વ્યવસ્થાપન",
    land: "એકર",
    identifyTitle: "🌾 તમારા પાકના અવશેષને ઓળખો",
    identifyDesc:
      "પાકના અવશેષનો સ્પષ્ટ ફોટો લો. સિસ્ટમ તેના ઉપયોગ, કમ્પોસ્ટ અને વિઘટનની રીત સૂચવશે.",
    tip: "📸 સૂચન",
    tipDesc:
      "સારા પ્રકાશમાં ફોટો લો અને પાકનો કચરો સ્પષ્ટ દેખાય તેની ખાતરી કરો.",
    takePhoto: "📷 ફોટો લો",
    choosePhoto: "🖼️ ફોટો પસંદ કરો",
    yourPhoto: "📸 તમારા પાકના કચરાનો ફોટો",
    anotherPhoto: "📷 બીજો ફોટો લો",
    remove: "🗑️ દૂર કરો",
    analyzeWaste: "🔍 કચરાનું વિશ્લેષણ કરો",
    analyzingWaste: "🔍 કચરાનું વિશ્લેષણ થઈ રહ્યું છે...",
    analyzingTitle: "તમારા પાકના કચરાનું વિશ્લેષણ થઈ રહ્યું છે",
    analyzingDesc:
      "સંભવિત ઉપયોગ અને વિઘટનની રીત શોધવા માટે કૃપા કરીને રાહ જુઓ.",
    loading: "લોડ થઈ રહ્યું છે...",
    pleaseWait: "કૃપા કરીને રાહ જુઓ...",
    cropNotFound: "પાક મળ્યો નથી",
    backToCrops: "← પાક પર પાછા જાઓ",
    wasteIdentified: "કચરો ઓળખાયો",
    identification: "ℹ️ ઓળખ",
    whatCanYouDo: "💡 તેનો શું ઉપયોગ કરી શકાય?",
    howToDecompose: "♻️ તેને કેવી રીતે સડાવવો?",
    decompositionDesc:
      "સૂચવેલી કમ્પોસ્ટ/વિઘટન પ્રક્રિયા:",
    estimatedTime: "⏱️ અંદાજિત વિઘટન સમય",
    usefulProducts: "📦 ઉપયોગી ઉત્પાદનો",
    thingsToAvoid: "⚠️ શું ટાળવું",
    important: "ℹ️ મહત્વપૂર્ણ",
    disclaimer:
      "ફોટો આધારિત ઓળખ માત્ર માર્ગદર્શન માટે છે. પશુ આહાર, કમ્પોસ્ટ, મશરૂમ ખેતી અથવા વ્યવસાયિક ઉપયોગ પહેલાં સામગ્રી યોગ્ય અને રસાયણો તથા દૂષણથી મુક્ત છે તેની ખાતરી કરો.",
    analyzeAnother: "📷 બીજા પાક કચરાનો ફોટો તપાસો",
    selectPhotoFirst: "કૃપા કરીને પહેલા ફોટો લો અથવા પસંદ કરો.",
    invalidImage: "કૃપા કરીને ફોટો પસંદ કરો.",
    demoResult: "ડેમો પરિણામ",
    wheatStraw: "ઘઉંનું ભૂસું / પાકનો અવશેષ",
    cropResidue: "પાકનો અવશેષ",
    compost: "કમ્પોસ્ટ",
    mulch: "મલ્ચ",
    animalBedding: "પશુ બિછાવણ",
    biomass: "બાયોમાસ",
    briquettes: "બ્રિકેટ્સ",
    mushroom: "મશરૂમ ખેતી",
    organicManure: "જૈવિક ખાતર",
    avoidBurning: "પાકના અવશેષને ખુલ્લામાં ન બાળો.",
    avoidWater: "ખૂબ વધારે પાણી નાખીને તેને ખૂબ ભીનું ન કરો.",
    avoidPlastic: "પ્લાસ્ટિક અથવા રાસાયણિક કચરો કમ્પોસ્ટમાં ન ભેળવો.",
    avoidChemical: "પ્લાસ્ટિક, ધાતુ અથવા રાસાયણિક કચરો ન ભેળવો.",
    cutSmall: "પાકના અવશેષને નાના ટુકડામાં કાપો.",
    makeLayer: "અવશેષને 4–6 ઇંચના સ્તરમાં રાખો.",
    addCowDung: "ગોબર અથવા તૈયાર કમ્પોસ્ટનું પાતળું સ્તર ઉમેરો.",
    maintainMoisture: "થોડું પાણી છાંટીને યોગ્ય ભેજ જાળવો.",
    turnPile: "દર 15–20 દિવસે કમ્પોસ્ટનો ઢગલો ફેરવો.",
    avoidWaterLogging: "ઢગલામાં વધારે પાણી ભરાવા ન દો.",
    decomposition45to90: "લગભગ 45–90 દિવસ, હવામાન અને ભેજ અનુસાર.",
    decomposition45to90General:
      "લગભગ 45–90 દિવસ, કચરાના પ્રકાર અને હવામાન પર આધારિત.",
    guideDisclaimer:
      "ફોટો આધારિત ઓળખ માત્ર માર્ગદર્શન છે. ઉપયોગ કરતા પહેલા સામગ્રીની યોગ્યતા ચકાસો.",
  },

  kn: {
    back: "← ಹಿಂತಿರುಗಿ",
    season: "ಋತು",
    wasteTitle: "ಬೆಳೆ ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ",
    land: "ಎಕರೆ",
    identifyTitle: "🌾 ನಿಮ್ಮ ಬೆಳೆ ತ್ಯಾಜ್ಯವನ್ನು ಗುರುತಿಸಿ",
    identifyDesc:
      "ಬೆಳೆ ತ್ಯಾಜ್ಯದ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ. ಅದರ ಬಳಕೆ, ಕಾಂಪೋಸ್ಟ್ ಮತ್ತು ಕೊಳೆಯುವ ವಿಧಾನವನ್ನು ವ್ಯವಸ್ಥೆ ಸೂಚಿಸುತ್ತದೆ.",
    tip: "📸 ಸಲಹೆ",
    tipDesc:
      "ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಫೋಟೋ ತೆಗೆದು ಬೆಳೆ ತ್ಯಾಜ್ಯ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣುವಂತೆ ಮಾಡಿ.",
    takePhoto: "📷 ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ",
    choosePhoto: "🖼️ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ",
    yourPhoto: "📸 ನಿಮ್ಮ ತ್ಯಾಜ್ಯದ ಫೋಟೋ",
    anotherPhoto: "📷 ಮತ್ತೊಂದು ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ",
    remove: "🗑️ ತೆಗೆದುಹಾಕಿ",
    analyzeWaste: "🔍 ತ್ಯಾಜ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ",
    analyzingWaste: "🔍 ತ್ಯಾಜ್ಯವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    analyzingTitle: "ನಿಮ್ಮ ಬೆಳೆ ತ್ಯಾಜ್ಯವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ",
    analyzingDesc:
      "ಸಂಭಾವ್ಯ ಬಳಕೆ ಮತ್ತು ಕೊಳೆಯುವ ವಿಧಾನಗಳನ್ನು ಗುರುತಿಸಲು ದಯವಿಟ್ಟು ಕಾಯಿರಿ.",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    pleaseWait: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ...",
    cropNotFound: "ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ",
    backToCrops: "← ಬೆಳೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    wasteIdentified: "ತ್ಯಾಜ್ಯ ಗುರುತಿಸಲಾಗಿದೆ",
    identification: "ℹ️ ಗುರುತು",
    whatCanYouDo: "💡 ಇದನ್ನು ಹೇಗೆ ಬಳಸಬಹುದು?",
    howToDecompose: "♻️ ಇದನ್ನು ಹೇಗೆ ಕೊಳೆಯಿಸಬೇಕು?",
    decompositionDesc: "ಸೂಚಿಸಲಾದ ಕಾಂಪೋಸ್ಟ್/ಕೊಳೆಯುವ ವಿಧಾನ:",
    estimatedTime: "⏱️ ಅಂದಾಜು ಕೊಳೆಯುವ ಸಮಯ",
    usefulProducts: "📦 ಉಪಯುಕ್ತ ಉತ್ಪನ್ನಗಳು",
    thingsToAvoid: "⚠️ ತಪ್ಪಿಸಬೇಕಾದವು",
    important: "ℹ️ ಪ್ರಮುಖ ಮಾಹಿತಿ",
    disclaimer:
      "ಫೋಟೋ ಆಧಾರಿತ ಗುರುತಿಸುವಿಕೆ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ. ಪ್ರಾಣಿಗಳ ಆಹಾರ, ಕಾಂಪೋಸ್ಟ್, ಅಣಬೆ ಬೆಳೆ ಅಥವಾ ವಾಣಿಜ್ಯ ಬಳಕೆಗೆ ಮೊದಲು ವಸ್ತು ಸೂಕ್ತವಾಗಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    analyzeAnother: "📷 ಮತ್ತೊಂದು ತ್ಯಾಜ್ಯದ ಫೋಟೋ ಪರಿಶೀಲಿಸಿ",
    selectPhotoFirst: "ದಯವಿಟ್ಟು ಮೊದಲು ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ಆಯ್ಕೆಮಾಡಿ.",
    invalidImage: "ದಯವಿಟ್ಟು ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ.",
    demoResult: "ಡೆಮೊ ಫಲಿತಾಂಶ",
    wheatStraw: "ಗೋಧಿ ಹುಲ್ಲು / ಬೆಳೆ ತ್ಯಾಜ್ಯ",
    cropResidue: "ಬೆಳೆ ತ್ಯಾಜ್ಯ",
    compost: "ಕಾಂಪೋಸ್ಟ್",
    mulch: "ಮಲ್ಚ್",
    animalBedding: "ಪ್ರಾಣಿಗಳ ಹಾಸಿಗೆ",
    biomass: "ಬಯೋಮಾಸ್",
    briquettes: "ಬ್ರಿಕೆಟ್‌ಗಳು",
    mushroom: "ಅಣಬೆ ಬೆಳೆ",
    organicManure: "ಸಾವಯವ ಗೊಬ್ಬರ",
    avoidBurning: "ಬೆಳೆ ತ್ಯಾಜ್ಯವನ್ನು ತೆರೆದ ಜಾಗದಲ್ಲಿ ಸುಡಬೇಡಿ.",
    avoidWater: "ಹೆಚ್ಚು ನೀರು ಹಾಕಿ ತುಂಬಾ ಒದ್ದೆ ಮಾಡಬೇಡಿ.",
    avoidPlastic: "ಪ್ಲಾಸ್ಟಿಕ್ ಅಥವಾ ರಾಸಾಯನಿಕ ತ್ಯಾಜ್ಯವನ್ನು ಕಾಂಪೋಸ್ಟ್‌ಗೆ ಸೇರಿಸಬೇಡಿ.",
    avoidChemical: "ಪ್ಲಾಸ್ಟಿಕ್, ಲೋಹ ಅಥವಾ ರಾಸಾಯನಿಕ ತ್ಯಾಜ್ಯವನ್ನು ಸೇರಿಸಬೇಡಿ.",
    cutSmall: "ಬೆಳೆ ತ್ಯಾಜ್ಯವನ್ನು ಸಣ್ಣ ತುಂಡುಗಳಾಗಿ ಕತ್ತರಿಸಿ.",
    makeLayer: "ತ್ಯಾಜ್ಯವನ್ನು 4–6 ಇಂಚಿನ ಪದರದಲ್ಲಿ ಇರಿಸಿ.",
    addCowDung: "ಹಸುವಿನ ಗೊಬ್ಬರ ಅಥವಾ ತಯಾರಾದ ಕಾಂಪೋಸ್ಟ್‌ನ ತೆಳುವಾದ ಪದರ ಹಾಕಿ.",
    maintainMoisture: "ಸ್ವಲ್ಪ ನೀರು ಸಿಂಪಡಿಸಿ ಸರಿಯಾದ ತೇವಾಂಶ ಕಾಪಾಡಿ.",
    turnPile: "ಪ್ರತಿ 15–20 ದಿನಗಳಿಗೊಮ್ಮೆ ಕಾಂಪೋಸ್ಟ್ ರಾಶಿಯನ್ನು ತಿರುಗಿಸಿ.",
    avoidWaterLogging: "ರಾಶಿಯಲ್ಲಿ ಹೆಚ್ಚು ನೀರು ಸಂಗ್ರಹವಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    decomposition45to90: "ಸುಮಾರು 45–90 ದಿನಗಳು, ಹವಾಮಾನ ಮತ್ತು ತೇವಾಂಶದ ಮೇಲೆ ಅವಲಂಬಿತ.",
    decomposition45to90General:
      "ಸುಮಾರು 45–90 ದಿನಗಳು, ತ್ಯಾಜ್ಯದ ವಿಧ ಮತ್ತು ಹವಾಮಾನದ ಮೇಲೆ ಅವಲಂಬಿತ.",
    guideDisclaimer:
      "ಫೋಟೋ ಆಧಾರಿತ ಗುರುತಿಸುವಿಕೆ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ. ಬಳಕೆಗೆ ಮೊದಲು ವಸ್ತುವಿನ ಸೂಕ್ತತೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
  },

  ml: {
    back: "← തിരികെ പോകുക",
    season: "സീസൺ",
    wasteTitle: "വിള അവശിഷ്ട മാനേജ്മെന്റ്",
    land: "ഏക്കർ",
    identifyTitle: "🌾 നിങ്ങളുടെ വിള അവശിഷ്ടം തിരിച്ചറിയുക",
    identifyDesc:
      "വിള അവശിഷ്ടത്തിന്റെ വ്യക്തമായ ഫോട്ടോ എടുക്കുക. അതിന്റെ ഉപയോഗം, കമ്പോസ്റ്റ്, അഴുകൽ എന്നിവയ്ക്കുള്ള നിർദ്ദേശങ്ങൾ സിസ്റ്റം നൽകും.",
    tip: "📸 നിർദ്ദേശം",
    tipDesc:
      "നല്ല വെളിച്ചത്തിൽ ഫോട്ടോ എടുക്കുകയും അവശിഷ്ടം വ്യക്തമായി കാണുകയും ചെയ്യുക.",
    takePhoto: "📷 ഫോട്ടോ എടുക്കുക",
    choosePhoto: "🖼️ ഫോട്ടോ തിരഞ്ഞെടുക്കുക",
    yourPhoto: "📸 നിങ്ങളുടെ അവശിഷ്ടത്തിന്റെ ഫോട്ടോ",
    anotherPhoto: "📷 മറ്റൊരു ഫോട്ടോ എടുക്കുക",
    remove: "🗑️ നീക്കം ചെയ്യുക",
    analyzeWaste: "🔍 അവശിഷ്ടം പരിശോധിക്കുക",
    analyzingWaste: "🔍 അവശിഷ്ടം പരിശോധിക്കുന്നു...",
    analyzingTitle: "നിങ്ങളുടെ വിള അവശിഷ്ടം പരിശോധിക്കുന്നു",
    analyzingDesc:
      "സാധ്യമായ ഉപയോഗങ്ങളും അഴുകൽ രീതികളും കണ്ടെത്താൻ കാത്തിരിക്കുക.",
    loading: "ലോഡ് ചെയ്യുന്നു...",
    pleaseWait: "ദയവായി കാത്തിരിക്കുക...",
    cropNotFound: "വിള കണ്ടെത്തിയില്ല",
    backToCrops: "← വിളകളിലേക്ക് മടങ്ങുക",
    wasteIdentified: "അവശിഷ്ടം തിരിച്ചറിഞ്ഞു",
    identification: "ℹ️ തിരിച്ചറിയൽ",
    whatCanYouDo: "💡 ഇത് എങ്ങനെ ഉപയോഗിക്കാം?",
    howToDecompose: "♻️ ഇത് എങ്ങനെ അഴുകിക്കാം?",
    decompositionDesc:
      "നിർദ്ദേശിച്ച കമ്പോസ്റ്റ്/അഴുകൽ രീതി:",
    estimatedTime: "⏱️ അഴുകാനുള്ള ഏകദേശ സമയം",
    usefulProducts: "📦 ഉപയോഗപ്രദമായ ഉൽപ്പന്നങ്ങൾ",
    thingsToAvoid: "⚠️ ഒഴിവാക്കേണ്ട കാര്യങ്ങൾ",
    important: "ℹ️ പ്രധാനപ്പെട്ടത്",
    disclaimer:
      "ഫോട്ടോ അടിസ്ഥാനമാക്കിയുള്ള തിരിച്ചറിയൽ മാർഗനിർദ്ദേശത്തിനായി മാത്രമാണ്. മൃഗങ്ങളുടെ തീറ്റ, കമ്പോസ്റ്റ്, കൂൺ കൃഷി അല്ലെങ്കിൽ വാണിജ്യ ഉപയോഗത്തിന് മുമ്പ് വസ്തു അനുയോജ്യമാണെന്ന് ഉറപ്പാക്കുക.",
    analyzeAnother: "📷 മറ്റൊരു അവശിഷ്ട ഫോട്ടോ പരിശോധിക്കുക",
    selectPhotoFirst: "ദയവായി ആദ്യം ഒരു ഫോട്ടോ എടുക്കുകയോ തിരഞ്ഞെടുക്കുകയോ ചെയ്യുക.",
    invalidImage: "ദയവായി ഒരു ഫോട്ടോ തിരഞ്ഞെടുക്കുക.",
    demoResult: "ഡെമോ ഫലം",
    wheatStraw: "ഗോതമ്പ് വൈക്കോൽ / വിള അവശിഷ്ടം",
    cropResidue: "വിള അവശിഷ്ടം",
    compost: "കമ്പോസ്റ്റ്",
    mulch: "മൾച്ച്",
    animalBedding: "മൃഗങ്ങളുടെ കിടക്ക",
    biomass: "ബയോമാസ്",
    briquettes: "ബ്രിക്കറ്റുകൾ",
    mushroom: "കൂൺ കൃഷി",
    organicManure: "ജൈവ വളം",
    avoidBurning: "വിള അവശിഷ്ടങ്ങൾ തുറസ്സായ സ്ഥലത്ത് കത്തിക്കരുത്.",
    avoidWater: "വളരെ അധികം വെള്ളം ചേർത്ത് നനയ്ക്കരുത്.",
    avoidPlastic: "പ്ലാസ്റ്റിക് അല്ലെങ്കിൽ രാസ മാലിന്യങ്ങൾ കമ്പോസ്റ്റിൽ ചേർക്കരുത്.",
    avoidChemical: "പ്ലാസ്റ്റിക്, ലോഹം അല്ലെങ്കിൽ രാസ മാലിന്യങ്ങൾ ചേർക്കരുത്.",
    cutSmall: "വിള അവശിഷ്ടങ്ങൾ ചെറിയ കഷണങ്ങളാക്കുക.",
    makeLayer: "അവശിഷ്ടങ്ങൾ 4–6 ഇഞ്ച് പാളിയായി വയ്ക്കുക.",
    addCowDung: "ചാണകം അല്ലെങ്കിൽ തയ്യാറായ കമ്പോസ്റ്റിന്റെ നേർത്ത പാളി ചേർക്കുക.",
    maintainMoisture: "അൽപം വെള്ളം തളിച്ച് ശരിയായ ഈർപ്പം നിലനിർത്തുക.",
    turnPile: "ഓരോ 15–20 ദിവസത്തിലും കമ്പോസ്റ്റ് കൂമ്പാരം മറിക്കുക.",
    avoidWaterLogging: "കൂമ്പാരത്തിൽ അധിക വെള്ളം കെട്ടിക്കിടക്കാൻ അനുവദിക്കരുത്.",
    decomposition45to90: "ഏകദേശം 45–90 ദിവസം, കാലാവസ്ഥയും ഈർപ്പവും അനുസരിച്ച്.",
    decomposition45to90General:
      "ഏകദേശം 45–90 ദിവസം, അവശിഷ്ടത്തിന്റെ തരവും കാലാവസ്ഥയും അനുസരിച്ച്.",
    guideDisclaimer:
      "ഫോട്ടോ അടിസ്ഥാനമാക്കിയുള്ള തിരിച്ചറിയൽ മാർഗനിർദ്ദേശം മാത്രമാണ്. ഉപയോഗിക്കുന്നതിന് മുമ്പ് വസ്തുവിന്റെ അനുയോജ്യത ഉറപ്പാക്കുക.",
  },

  pa: {
    back: "← ਵਾਪਸ ਜਾਓ",
    season: "ਸੀਜ਼ਨ",
    wasteTitle: "ਫਸਲ ਰਹਿੰਦ-ਖੂੰਹਦ ਪ੍ਰਬੰਧਨ",
    land: "ਏਕੜ",
    identifyTitle: "🌾 ਆਪਣੀ ਫਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਪਛਾਣੋ",
    identifyDesc:
      "ਫਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀ ਸਾਫ਼ ਤਸਵੀਰ ਖਿੱਚੋ। ਸਿਸਟਮ ਇਸ ਦੇ ਵਰਤੋਂ, ਖਾਦ ਬਣਾਉਣ ਅਤੇ ਗਲਾਉਣ ਦੇ ਤਰੀਕੇ ਦੱਸੇਗਾ।",
    tip: "📸 ਸੁਝਾਅ",
    tipDesc:
      "ਚੰਗੀ ਰੌਸ਼ਨੀ ਵਿੱਚ ਤਸਵੀਰ ਖਿੱਚੋ ਅਤੇ ਰਹਿੰਦ-ਖੂੰਹਦ ਨੂੰ ਸਾਫ਼ ਦਿਖਾਓ।",
    takePhoto: "📷 ਤਸਵੀਰ ਖਿੱਚੋ",
    choosePhoto: "🖼️ ਤਸਵੀਰ ਚੁਣੋ",
    yourPhoto: "📸 ਤੁਹਾਡੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀ ਤਸਵੀਰ",
    anotherPhoto: "📷 ਹੋਰ ਤਸਵੀਰ ਖਿੱਚੋ",
    remove: "🗑️ ਹਟਾਓ",
    analyzeWaste: "🔍 ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀ ਜਾਂਚ ਕਰੋ",
    analyzingWaste: "🔍 ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...",
    analyzingTitle: "ਤੁਹਾਡੀ ਫਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ",
    analyzingDesc:
      "ਸੰਭਾਵਿਤ ਵਰਤੋਂ ਅਤੇ ਗਲਾਉਣ ਦੇ ਤਰੀਕੇ ਲੱਭਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ।",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    pleaseWait: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...",
    cropNotFound: "ਫਸਲ ਨਹੀਂ ਮਿਲੀ",
    backToCrops: "← ਫਸਲਾਂ ਤੇ ਵਾਪਸ ਜਾਓ",
    wasteIdentified: "ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀ ਪਛਾਣ ਹੋ ਗਈ",
    identification: "ℹ️ ਪਛਾਣ",
    whatCanYouDo: "💡 ਇਸਦਾ ਕੀ ਉਪਯੋਗ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ?",
    howToDecompose: "♻️ ਇਸਨੂੰ ਕਿਵੇਂ ਗਲਾਉਣਾ ਹੈ?",
    decompositionDesc:
      "ਸੁਝਾਇਆ ਗਿਆ ਕੰਪੋਸਟ/ਗਲਾਉਣ ਦਾ ਤਰੀਕਾ:",
    estimatedTime: "⏱️ ਅੰਦਾਜ਼ਨ ਗਲਣ ਦਾ ਸਮਾਂ",
    usefulProducts: "📦 ਲਾਭਦਾਇਕ ਉਤਪਾਦ",
    thingsToAvoid: "⚠️ ਕੀ ਨਾ ਕਰੋ",
    important: "ℹ️ ਮਹੱਤਵਪੂਰਨ",
    disclaimer:
      "ਤਸਵੀਰ ਦੇ ਆਧਾਰ ਤੇ ਪਛਾਣ ਸਿਰਫ਼ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਹੈ। ਪਸ਼ੂ ਚਾਰੇ, ਕੰਪੋਸਟ, ਮਸ਼ਰੂਮ ਜਾਂ ਵਪਾਰਕ ਵਰਤੋਂ ਤੋਂ ਪਹਿਲਾਂ ਸਮੱਗਰੀ ਦੀ ਯੋਗਤਾ ਯਕੀਨੀ ਬਣਾਓ।",
    analyzeAnother: "📷 ਕਿਸੇ ਹੋਰ ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀ ਤਸਵੀਰ ਜਾਂਚੋ",
    selectPhotoFirst: "ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਤਸਵੀਰ ਖਿੱਚੋ ਜਾਂ ਚੁਣੋ।",
    invalidImage: "ਕਿਰਪਾ ਕਰਕੇ ਤਸਵੀਰ ਚੁਣੋ।",
    demoResult: "ਡੈਮੋ ਨਤੀਜਾ",
    wheatStraw: "ਕਣਕ ਦਾ ਭੂਸਾ / ਫਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ",
    cropResidue: "ਫਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ",
    compost: "ਕੰਪੋਸਟ",
    mulch: "ਮਲਚ",
    animalBedding: "ਪਸ਼ੂਆਂ ਲਈ ਬਿਛਾਵਨ",
    biomass: "ਬਾਇਓਮਾਸ",
    briquettes: "ਬ੍ਰਿਕੇਟ",
    mushroom: "ਮਸ਼ਰੂਮ ਦੀ ਖੇਤੀ",
    organicManure: "ਜੈਵਿਕ ਖਾਦ",
    avoidBurning: "ਫਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਨੂੰ ਖੁੱਲ੍ਹੇ ਵਿੱਚ ਨਾ ਸਾੜੋ।",
    avoidWater: "ਬਹੁਤ ਜ਼ਿਆਦਾ ਪਾਣੀ ਪਾ ਕੇ ਇਸਨੂੰ ਬਹੁਤ ਗਿੱਲਾ ਨਾ ਕਰੋ।",
    avoidPlastic: "ਪਲਾਸਟਿਕ ਜਾਂ ਰਸਾਇਣਕ ਕੂੜਾ ਕੰਪੋਸਟ ਵਿੱਚ ਨਾ ਮਿਲਾਓ।",
    avoidChemical: "ਪਲਾਸਟਿਕ, ਧਾਤ ਜਾਂ ਰਸਾਇਣਕ ਕੂੜਾ ਨਾ ਮਿਲਾਓ।",
    cutSmall: "ਫਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਨੂੰ ਛੋਟੇ ਟੁਕੜਿਆਂ ਵਿੱਚ ਕੱਟੋ।",
    makeLayer: "ਰਹਿੰਦ-ਖੂੰਹਦ ਨੂੰ 4–6 ਇੰਚ ਦੀ ਪਰਤ ਵਿੱਚ ਰੱਖੋ।",
    addCowDung: "ਗੋਬਰ ਜਾਂ ਤਿਆਰ ਕੰਪੋਸਟ ਦੀ ਪਤਲੀ ਪਰਤ ਪਾਓ।",
    maintainMoisture: "ਥੋੜ੍ਹਾ ਪਾਣੀ ਛਿੜਕ ਕੇ ਨਮੀ ਬਣਾਈ ਰੱਖੋ।",
    turnPile: "ਹਰ 15–20 ਦਿਨਾਂ ਬਾਅਦ ਢੇਰ ਨੂੰ ਪਲਟੋ।",
    avoidWaterLogging: "ਢੇਰ ਵਿੱਚ ਬਹੁਤ ਜ਼ਿਆਦਾ ਪਾਣੀ ਇਕੱਠਾ ਨਾ ਹੋਣ ਦਿਓ।",
    decomposition45to90: "ਲਗਭਗ 45–90 ਦਿਨ, ਮੌਸਮ ਅਤੇ ਨਮੀ ਦੇ ਅਨੁਸਾਰ।",
    decomposition45to90General:
      "ਲਗਭਗ 45–90 ਦਿਨ, ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀ ਕਿਸਮ ਅਤੇ ਮੌਸਮ ਉੱਤੇ ਨਿਰਭਰ।",
    guideDisclaimer:
      "ਤਸਵੀਰ ਆਧਾਰਿਤ ਪਛਾਣ ਸਿਰਫ਼ ਮਾਰਗਦਰਸ਼ਨ ਹੈ। ਵਰਤੋਂ ਤੋਂ ਪਹਿਲਾਂ ਸਮੱਗਰੀ ਦੀ ਯੋਗਤਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।",
  },

  or: {
    back: "← ପଛକୁ ଯାଆନ୍ତୁ",
    season: "ଋତୁ",
    wasteTitle: "ଫସଲ ବର୍ଜ୍ୟ ପରିଚାଳନା",
    land: "ଏକର",
    identifyTitle: "🌾 ଆପଣଙ୍କ ଫସଲ ଅବଶିଷ୍ଟ ଚିହ୍ନଟ କରନ୍ତୁ",
    identifyDesc:
      "ଫସଲ ଅବଶିଷ୍ଟର ଏକ ସ୍ପଷ୍ଟ ଫଟୋ ନିଅନ୍ତୁ। ସିଷ୍ଟମ୍ ଏହାର ବ୍ୟବହାର, କମ୍ପୋଷ୍ଟ ଏବଂ ପଚାଇବା ପଦ୍ଧତି ବିଷୟରେ ପରାମର୍ଶ ଦେବ।",
    tip: "📸 ପରାମର୍ଶ",
    tipDesc:
      "ଭଲ ଆଲୋକରେ ଫଟୋ ନିଅନ୍ତୁ ଏବଂ ଅବଶିଷ୍ଟ ସ୍ପଷ୍ଟ ଦେଖାଯାଉ।",
    takePhoto: "📷 ଫଟୋ ନିଅନ୍ତୁ",
    choosePhoto: "🖼️ ଫଟୋ ବାଛନ୍ତୁ",
    yourPhoto: "📸 ଆପଣଙ୍କ ଅବଶିଷ୍ଟ ଫଟୋ",
    anotherPhoto: "📷 ଆଉ ଏକ ଫଟୋ ନିଅନ୍ତୁ",
    remove: "🗑️ ହଟାନ୍ତୁ",
    analyzeWaste: "🔍 ଅବଶିଷ୍ଟ ଯାଞ୍ଚ କରନ୍ତୁ",
    analyzingWaste: "🔍 ଅବଶିଷ୍ଟ ଯାଞ୍ଚ ହେଉଛି...",
    analyzingTitle: "ଆପଣଙ୍କ ଫସଲ ଅବଶିଷ୍ଟ ଯାଞ୍ଚ ହେଉଛି",
    analyzingDesc:
      "ସମ୍ଭାବ୍ୟ ବ୍ୟବହାର ଏବଂ ପଚାଇବା ପଦ୍ଧତି ଜାଣିବା ପାଇଁ ଅପେକ୍ଷା କରନ୍ତୁ।",
    loading: "ଲୋଡ୍ ହେଉଛି...",
    pleaseWait: "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ...",
    cropNotFound: "ଫସଲ ମିଳିଲା ନାହିଁ",
    backToCrops: "← ଫସଲକୁ ଫେରନ୍ତୁ",
    wasteIdentified: "ଅବଶିଷ୍ଟ ଚିହ୍ନଟ ହୋଇଛି",
    identification: "ℹ️ ଚିହ୍ନଟ",
    whatCanYouDo: "💡 ଏହାକୁ କିପରି ବ୍ୟବହାର କରିପାରିବେ?",
    howToDecompose: "♻️ ଏହାକୁ କିପରି ପଚାଇବେ?",
    decompositionDesc:
      "ପ୍ରସ୍ତାବିତ କମ୍ପୋଷ୍ଟ/ପଚାଇବା ପଦ୍ଧତି:",
    estimatedTime: "⏱️ ଆନୁମାନିକ ପଚିବା ସମୟ",
    usefulProducts: "📦 ଉପଯୋଗୀ ଉତ୍ପାଦ",
    thingsToAvoid: "⚠️ ଯାହା ଏଡ଼ାଇବେ",
    important: "ℹ️ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",
    disclaimer:
      "ଫଟୋ ଆଧାରିତ ଚିହ୍ନଟ କେବଳ ମାର୍ଗଦର୍ଶନ ପାଇଁ। ପଶୁ ଖାଦ୍ୟ, କମ୍ପୋଷ୍ଟ, ଛତୁ ଚାଷ କିମ୍ବା ବାଣିଜ୍ୟିକ ବ୍ୟବହାର ପୂର୍ବରୁ ଉପାଦାନ ଉପଯୁକ୍ତ କି ନାହିଁ ନିଶ୍ଚିତ କରନ୍ତୁ।",
    analyzeAnother: "📷 ଅନ୍ୟ ଅବଶିଷ୍ଟର ଫଟୋ ଯାଞ୍ଚ କରନ୍ତୁ",
    selectPhotoFirst: "ଦୟାକରି ପ୍ରଥମେ ଫଟୋ ନିଅନ୍ତୁ କିମ୍ବା ବାଛନ୍ତୁ।",
    invalidImage: "ଦୟାକରି ଫଟୋ ବାଛନ୍ତୁ।",
    demoResult: "ଡେମୋ ଫଳାଫଳ",
    wheatStraw: "ଗହମ ନଡ଼ା / ଫସଲ ଅବଶିଷ୍ଟ",
    cropResidue: "ଫସଲ ଅବଶିଷ୍ଟ",
    compost: "କମ୍ପୋଷ୍ଟ",
    mulch: "ମଲ୍ଚ",
    animalBedding: "ପଶୁ ବିଛଣା",
    biomass: "ବାୟୋମାସ୍",
    briquettes: "ବ୍ରିକେଟ୍",
    mushroom: "ଛତୁ ଚାଷ",
    organicManure: "ଜୈବିକ ସାର",
    avoidBurning: "ଫସଲ ଅବଶିଷ୍ଟକୁ ଖୋଲାରେ ଜଳାନ୍ତୁ ନାହିଁ।",
    avoidWater: "ଅଧିକ ପାଣି ଦେଇ ଅତ୍ୟଧିକ ଓଦା କରନ୍ତୁ ନାହିଁ।",
    avoidPlastic: "ପ୍ଲାଷ୍ଟିକ କିମ୍ବା ରାସାୟନିକ ବର୍ଜ୍ୟକୁ କମ୍ପୋଷ୍ଟରେ ମିଶାନ୍ତୁ ନାହିଁ।",
    avoidChemical: "ପ୍ଲାଷ୍ଟିକ, ଧାତୁ କିମ୍ବା ରାସାୟନିକ ବର୍ଜ୍ୟ ମିଶାନ୍ତୁ ନାହିଁ।",
    cutSmall: "ଫସଲ ଅବଶିଷ୍ଟକୁ ଛୋଟ ଛୋଟ ଖଣ୍ଡ କରନ୍ତୁ।",
    makeLayer: "ଅବଶିଷ୍ଟକୁ ୪–୬ ଇଞ୍ଚ ମୋଟା ସ୍ତରରେ ରଖନ୍ତୁ।",
    addCowDung: "ଗୋବର କିମ୍ବା ପ୍ରସ୍ତୁତ କମ୍ପୋଷ୍ଟର ପତଳା ସ୍ତର ଦିଅନ୍ତୁ।",
    maintainMoisture: "ଅଳ୍ପ ପାଣି ଛିଞ୍ଚି ଆର୍ଦ୍ରତା ରଖନ୍ତୁ।",
    turnPile: "ପ୍ରତି ୧୫–୨୦ ଦିନରେ ଢେରକୁ ଓଲଟାନ୍ତୁ।",
    avoidWaterLogging: "ଢେରରେ ଅଧିକ ପାଣି ଜମିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ।",
    decomposition45to90: "ପ୍ରାୟ ୪୫–୯୦ ଦିନ, ପାଣିପାଗ ଓ ଆର୍ଦ୍ରତା ଅନୁଯାୟୀ।",
    decomposition45to90General:
      "ପ୍ରାୟ ୪୫–୯୦ ଦିନ, ଅବଶିଷ୍ଟର ପ୍ରକାର ଓ ପାଣିପାଗ ଉପରେ ନିର୍ଭର କରେ।",
    guideDisclaimer:
      "ଫଟୋ ଆଧାରିତ ଚିହ୍ନଟ କେବଳ ମାର୍ଗଦର୍ଶନ। ବ୍ୟବହାର ପୂର୍ବରୁ ଉପାଦାନର ଉପଯୁକ୍ତତା ନିଶ୍ଚିତ କରନ୍ତୁ।",
  },

  as: {
    back: "← পিছলৈ যাওক",
    season: "ঋতু",
    wasteTitle: "শস্যৰ আৱৰ্জনা ব্যৱস্থাপনা",
    land: "একৰ",
    identifyTitle: "🌾 আপোনাৰ শস্যৰ অৱশিষ্ট চিনাক্ত কৰক",
    identifyDesc:
      "শস্যৰ অৱশিষ্টৰ এখন স্পষ্ট ফটো তোলক। ব্যৱস্থাটোৱে ইয়াৰ ব্যৱহাৰ, কম্পোষ্ট আৰু পচন পদ্ধতিৰ পৰামৰ্শ দিব।",
    tip: "📸 পৰামৰ্শ",
    tipDesc:
      "ভাল পোহৰত ফটো তোলক আৰু অৱশিষ্ট স্পষ্টকৈ দেখা যাবলৈ দিয়ক।",
    takePhoto: "📷 ফটো তোলক",
    choosePhoto: "🖼️ ফটো বাছক",
    yourPhoto: "📸 আপোনাৰ অৱশিষ্টৰ ফটো",
    anotherPhoto: "📷 আন এখন ফটো তোলক",
    remove: "🗑️ আঁতৰাওক",
    analyzeWaste: "🔍 অৱশিষ্ট পৰীক্ষা কৰক",
    analyzingWaste: "🔍 অৱশিষ্ট পৰীক্ষা কৰা হৈছে...",
    analyzingTitle: "আপোনাৰ শস্যৰ অৱশিষ্ট পৰীক্ষা কৰা হৈছে",
    analyzingDesc:
      "সম্ভাৱ্য ব্যৱহাৰ আৰু পচন পদ্ধতি জানিবলৈ অনুগ্ৰহ কৰি অপেক্ষা কৰক।",
    loading: "লোড হৈ আছে...",
    pleaseWait: "অনুগ্ৰহ কৰি অপেক্ষা কৰক...",
    cropNotFound: "শস্য পোৱা নগ'ল",
    backToCrops: "← শস্যলৈ উভতি যাওক",
    wasteIdentified: "অৱশিষ্ট চিনাক্ত কৰা হৈছে",
    identification: "ℹ️ চিনাক্তকৰণ",
    whatCanYouDo: "💡 ইয়াক কেনেকৈ ব্যৱহাৰ কৰিব পাৰি?",
    howToDecompose: "♻️ ইয়াক কেনেকৈ পচাব পাৰি?",
    decompositionDesc:
      "পৰামৰ্শ দিয়া কম্পোষ্ট/পচন পদ্ধতি:",
    estimatedTime: "⏱️ আনুমানিক পচন সময়",
    usefulProducts: "📦 উপযোগী সামগ্ৰী",
    thingsToAvoid: "⚠️ কি কি এৰাই চলিব",
    important: "ℹ️ গুৰুত্বপূৰ্ণ",
    disclaimer:
      "ফটোৰ ওপৰত ভিত্তি কৰি কৰা চিনাক্তকৰণ কেৱল নিৰ্দেশনাৰ বাবে। পশুখাদ্য, কম্পোষ্ট, কাঠফুলা খেতি বা ব্যৱসায়িক ব্যৱহাৰৰ আগতে সামগ্ৰী উপযুক্ত নে নহয় নিশ্চিত কৰক।",
    analyzeAnother: "📷 আন এটা অৱশিষ্টৰ ফটো পৰীক্ষা কৰক",
    selectPhotoFirst: "অনুগ্ৰহ কৰি প্ৰথমে ফটো তোলক বা বাছক।",
    invalidImage: "অনুগ্ৰহ কৰি এখন ফটো বাছক।",
    demoResult: "ডেমো ফলাফল",
    wheatStraw: "ঘেঁহুৰ খেৰ / শস্যৰ অৱশিষ্ট",
    cropResidue: "শস্যৰ অৱশিষ্ট",
    compost: "কম্পোষ্ট",
    mulch: "মালচ",
    animalBedding: "পশুৰ বিছনা",
    biomass: "বায়োমাছ",
    briquettes: "ব্ৰিকেট",
    mushroom: "কাঠফুলা খেতি",
    organicManure: "জৈৱিক সাৰ",
    avoidBurning: "শস্যৰ অৱশিষ্ট মুকলি ঠাইত নুপুৰিব।",
    avoidWater: "অত্যাধিক পানী দি বেছিকৈ তিতি নকৰিব।",
    avoidPlastic: "প্লাষ্টিক বা ৰাসায়নিক আৱৰ্জনা কম্পোষ্টত মিহলাই নিদিব।",
    avoidChemical: "প্লাষ্টিক, ধাতু বা ৰাসায়নিক আৱৰ্জনা মিহলাই নিদিব।",
    cutSmall: "শস্যৰ অৱশিষ্ট সৰু সৰু টুকুৰাত কাটক।",
    makeLayer: "অৱশিষ্ট ৪–৬ ইঞ্চি ডাঠ স্তৰত ৰাখক।",
    addCowDung: "গোবৰ বা প্ৰস্তুত কম্পোষ্টৰ পাতল স্তৰ দিয়ক।",
    maintainMoisture: "অলপ পানী ছটিয়াই আৰ্দ্ৰতা বজাই ৰাখক।",
    turnPile: "প্ৰতি ১৫–২০ দিনত স্তূপটো ওলটাওক।",
    avoidWaterLogging: "স্তূপত অধিক পানী জমা হ'বলৈ নিদিব।",
    decomposition45to90: "প্ৰায় ৪৫–৯০ দিন, বতৰ আৰু আৰ্দ্ৰতাৰ ওপৰত নিৰ্ভৰ কৰি।",
    decomposition45to90General:
      "প্ৰায় ৪৫–৯০ দিন, অৱশিষ্টৰ প্ৰকাৰ আৰু বতৰৰ ওপৰত নিৰ্ভৰ কৰি।",
    guideDisclaimer:
      "ফটোৰ ওপৰত ভিত্তি কৰা চিনাক্তকৰণ কেৱল নিৰ্দেশনা। ব্যৱহাৰৰ আগতে সামগ্ৰীৰ উপযুক্ততা নিশ্চিত কৰক।",
  },

  ur: {
    back: "← واپس جائیں",
    season: "موسم",
    wasteTitle: "فصل کے فضلے کا انتظام",
    land: "ایکڑ",
    identifyTitle: "🌾 اپنی فصل کے فضلے کی شناخت کریں",
    identifyDesc:
      "فصل کے فضلے کی واضح تصویر لیں۔ سسٹم اس کے استعمال، کمپوسٹ اور گلنے کے طریقے کے بارے میں معلومات دے گا۔",
    tip: "📸 مشورہ",
    tipDesc:
      "اچھی روشنی میں تصویر لیں اور فصل کا فضلہ واضح نظر آنا چاہیے۔",
    takePhoto: "📷 تصویر لیں",
    choosePhoto: "🖼️ تصویر منتخب کریں",
    yourPhoto: "📸 آپ کے فضلے کی تصویر",
    anotherPhoto: "📷 دوسری تصویر لیں",
    remove: "🗑️ ہٹائیں",
    analyzeWaste: "🔍 فضلے کا تجزیہ کریں",
    analyzingWaste: "🔍 فضلے کا تجزیہ ہو رہا ہے...",
    analyzingTitle: "آپ کے فصل کے فضلے کا تجزیہ ہو رہا ہے",
    analyzingDesc:
      "ممکنہ استعمال اور گلنے کے طریقے معلوم کرنے کے لیے براہ کرم انتظار کریں۔",
    loading: "لوڈ ہو رہا ہے...",
    pleaseWait: "براہ کرم انتظار کریں...",
    cropNotFound: "فصل نہیں ملی",
    backToCrops: "← فصلوں پر واپس جائیں",
    wasteIdentified: "فضلے کی شناخت ہو گئی",
    identification: "ℹ️ شناخت",
    whatCanYouDo: "💡 اسے کیسے استعمال کیا جا سکتا ہے؟",
    howToDecompose: "♻️ اسے کیسے گلائیں؟",
    decompositionDesc:
      "کمپوسٹ/گلانے کا تجویز کردہ طریقہ:",
    estimatedTime: "⏱️ گلنے کا اندازاً وقت",
    usefulProducts: "📦 مفید مصنوعات",
    thingsToAvoid: "⚠️ کن چیزوں سے بچیں",
    important: "ℹ️ اہم معلومات",
    disclaimer:
      "تصویر کی بنیاد پر شناخت صرف رہنمائی کے لیے ہے۔ جانوروں کے چارے، کمپوسٹ، مشروم کی کاشت یا تجارتی استعمال سے پہلے یقینی بنائیں کہ مواد مناسب اور کیمیکل، بیماری یا آلودگی سے پاک ہے۔",
    analyzeAnother: "📷 کسی دوسرے فصل کے فضلے کی تصویر دیکھیں",
    selectPhotoFirst: "براہ کرم پہلے تصویر لیں یا منتخب کریں۔",
    invalidImage: "براہ کرم تصویر منتخب کریں۔",
    demoResult: "ڈیمو نتیجہ",
    wheatStraw: "گندم کا بھوسہ / فصل کا فضلہ",
    cropResidue: "فصل کا فضلہ",
    compost: "کمپوسٹ",
    mulch: "ملچ",
    animalBedding: "جانوروں کے لیے بچھونا",
    biomass: "بایوماس",
    briquettes: "بریکیٹس",
    mushroom: "مشروم کی کاشت",
    organicManure: "نامیاتی کھاد",
    avoidBurning: "فصل کے فضلے کو کھلے میں نہ جلائیں۔",
    avoidWater: "بہت زیادہ پانی ڈال کر اسے بہت گیلا نہ کریں۔",
    avoidPlastic: "پلاسٹک یا کیمیائی فضلہ کمپوسٹ میں نہ ملائیں۔",
    avoidChemical: "پلاسٹک، دھات یا کیمیائی فضلہ شامل نہ کریں۔",
    cutSmall: "فصل کے فضلے کو چھوٹے ٹکڑوں میں کاٹیں۔",
    makeLayer: "فضلے کو 4–6 انچ کی تہہ میں رکھیں۔",
    addCowDung: "گوبر یا تیار کمپوسٹ کی پتلی تہہ ڈالیں۔",
    maintainMoisture: "تھوڑا پانی چھڑک کر مناسب نمی برقرار رکھیں۔",
    turnPile: "ہر 15–20 دن بعد کمپوسٹ کے ڈھیر کو پلٹیں۔",
    avoidWaterLogging: "ڈھیر میں زیادہ پانی جمع نہ ہونے دیں۔",
    decomposition45to90: "تقریباً 45–90 دن، موسم اور نمی کے مطابق۔",
    decomposition45to90General:
      "تقریباً 45–90 دن، فضلے کی قسم اور موسم پر منحصر ہے۔",
    guideDisclaimer:
      "تصویر کی بنیاد پر شناخت صرف رہنمائی ہے۔ استعمال سے پہلے مواد کی موزونیت کی تصدیق کریں۔",
  },
};

export default function WasteUtilizationPage() {
  const router = useRouter();
  const params = useParams();

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  const [photo, setPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);

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
        (item) => item.id === Number(params.id)
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

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(t.invalidImage);
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPhoto(imageUrl);
    setAnalysis(null);
  };

  const removePhoto = () => {
    setPhoto(null);
    setAnalysis(null);

    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }

    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  };

  const analyzeWaste = async () => {
    if (!photo) {
      alert(t.selectPhotoFirst);
      return;
    }

    setAnalyzing(true);
    setAnalysis(null);

    await new Promise((resolve) => setTimeout(resolve, 1800));

    const cropName = crop?.crop?.toLowerCase() || "";

    let result: WasteAnalysis;

    if (
      cropName.includes("wheat") ||
      cropName.includes("गेहूं") ||
      cropName.includes("gahu") ||
      cropName.includes("গম") ||
      cropName.includes("गहू") ||
      cropName.includes("கோதுமை") ||
      cropName.includes("గోధుమ") ||
      cropName.includes("ઘઉં") ||
      cropName.includes("ಗೋಧಿ") ||
      cropName.includes("ഗോതമ്പ്") ||
      cropName.includes("ਕਣਕ") ||
      cropName.includes("ଗହମ") ||
      cropName.includes("ঘেঁহু") ||
      cropName.includes("گندم")
    ) {
      result = {
        wasteType: t.wheatStraw,
        confidence: t.demoResult,
        uses: [
          `${t.compost} बनाने में उपयोग किया जा सकता है।`,
          `${t.mulch} के लिए खेत में इस्तेमाल किया जा सकता है।`,
          `${t.animalBedding} के रूप में उपयोग किया जा सकता है।`,
          `${t.biomass} / ${t.briquettes} बनाने में उपयोग हो सकता है।`,
          `${t.mushroom} में कुछ परिस्थितियों में उपयोग किया जा सकता है।`,
        ],
        decomposition: [
          t.cutSmall,
          t.makeLayer,
          t.addCowDung,
          t.maintainMoisture,
          t.turnPile,
          t.avoidWaterLogging,
        ],
        decompositionTime: t.decomposition45to90,
        avoid: [
          t.avoidBurning,
          t.avoidWater,
          t.avoidPlastic,
        ],
        products: [
          t.compost,
          t.organicManure,
          t.mulch,
          t.biomass,
          t.briquettes,
        ],
      };
    } else {
      result = {
        wasteType: t.cropResidue,
        confidence: t.demoResult,
        uses: [
          `${t.compost} बनाने में उपयोग किया जा सकता है।`,
          `${t.mulch} के लिए इस्तेमाल किया जा सकता है।`,
          `${t.organicManure} बनाने में उपयोग किया जा सकता है।`,
          `${t.biomass} के रूप में उपयोग किया जा सकता है।`,
        ],
        decomposition: [
          t.cutSmall,
          t.makeLayer,
          t.addCowDung,
          t.maintainMoisture,
          t.turnPile,
        ],
        decompositionTime: t.decomposition45to90General,
        avoid: [
          t.avoidBurning,
          t.avoidChemical,
          t.avoidWaterLogging,
        ],
        products: [
          t.compost,
          t.organicManure,
          t.mulch,
          t.biomass,
        ],
      };
    }

    setAnalysis(result);
    setAnalyzing(false);
  };

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">♻️</div>

          <h1 className="text-2xl font-bold text-green-800">
            {t.loading}
          </h1>

          <p className="text-gray-500 mt-2">
            {t.pleaseWait}
          </p>
        </div>
      </main>
    );
  }

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
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold"
          >
            {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-8"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() =>
            router.push(`/crops/${crop.id}`)
          }
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          {t.back} {crop.crop}
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-7">
          <div className="flex items-center gap-5">

            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">
              ♻️
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {crop.season} {t.season}
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {t.wasteTitle}
              </h1>

              <p className="text-gray-600 mt-2">
                {crop.crop} • {crop.land} {t.land}
              </p>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-7 mb-7">

          <h2 className="text-2xl font-bold text-green-800">
            {t.identifyTitle}
          </h2>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {t.identifyDesc}
          </p>

          <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4">

            <p className="text-green-800 font-semibold">
              {t.tip}
            </p>

            <p className="text-green-700 text-sm mt-1">
              {t.tipDesc}
            </p>

          </div>

        </div>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePhotoChange}
          className="hidden"
        />

        <input
          ref={uploadInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />

        <div className="bg-white rounded-3xl shadow-md p-7 mb-7">

          {!photo ? (
            <div className="border-2 border-dashed border-green-300 rounded-3xl p-10 text-center bg-green-50">

              <div className="text-6xl mb-5">
                📷
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                {t.takePhoto}
              </h2>

              <p className="text-gray-500 mt-2">
                {t.tipDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-7">

                <button
                  onClick={() =>
                    cameraInputRef.current?.click()
                  }
                  className="px-6 py-4 rounded-2xl bg-green-700 text-white font-bold text-lg hover:bg-green-800 transition shadow-md"
                >
                  {t.takePhoto}
                </button>

                <button
                  onClick={() =>
                    uploadInputRef.current?.click()
                  }
                  className="px-6 py-4 rounded-2xl bg-white border-2 border-green-600 text-green-700 font-bold text-lg hover:bg-green-50 transition"
                >
                  {t.choosePhoto}
                </button>

              </div>

            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-green-800 mb-5">
                {t.yourPhoto}
              </h2>

              <div className="relative rounded-3xl overflow-hidden bg-gray-100">

                <img
                  src={photo}
                  alt="Crop waste"
                  className="w-full max-h-[500px] object-contain bg-gray-100"
                />

              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-5">

                <button
                  onClick={() =>
                    cameraInputRef.current?.click()
                  }
                  className="flex-1 px-5 py-4 rounded-2xl bg-green-700 text-white font-bold hover:bg-green-800 transition"
                >
                  {t.anotherPhoto}
                </button>

                <button
                  onClick={removePhoto}
                  className="px-5 py-4 rounded-2xl bg-red-50 text-red-700 font-bold border border-red-200 hover:bg-red-100 transition"
                >
                  {t.remove}
                </button>

              </div>

              <button
                onClick={analyzeWaste}
                disabled={analyzing}
                className="w-full mt-5 px-6 py-5 rounded-2xl bg-green-800 text-white font-bold text-xl hover:bg-green-900 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg"
              >
                {analyzing
                  ? t.analyzingWaste
                  : t.analyzeWaste}
              </button>

            </>
          )}

        </div>

        {analyzing && (
          <div className="bg-white rounded-3xl shadow-md p-8 mb-7 text-center">

            <div className="text-5xl animate-pulse">
              🤖
            </div>

            <h2 className="text-2xl font-bold text-green-800 mt-4">
              {t.analyzingTitle}
            </h2>

            <p className="text-gray-600 mt-2">
              {t.analyzingDesc}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 mt-6 overflow-hidden">
              <div className="bg-green-600 h-3 rounded-full w-2/3 animate-pulse" />
            </div>

          </div>
        )}

        {analysis && !analyzing && (
          <div className="space-y-6">

            <div className="bg-white rounded-3xl shadow-md p-7">

              <div className="flex items-center gap-3">

                <span className="text-4xl">
                  🌾
                </span>

                <div>

                  <p className="text-sm text-green-600 font-semibold">
                    {t.wasteIdentified}
                  </p>

                  <h2 className="text-2xl font-bold text-green-800">
                    {analysis.wasteType}
                  </h2>

                </div>

              </div>

              <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4">

                <p className="text-green-800 font-semibold">
                  {t.identification}
                </p>

                <p className="text-green-700 text-sm mt-1">
                  {analysis.confidence}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-md p-7">

              <h2 className="text-2xl font-bold text-green-800">
                {t.whatCanYouDo}
              </h2>

              <div className="space-y-3 mt-5">

                {analysis.uses.map((use, index) => (
                  <div
                    key={index}
                    className="flex gap-3 bg-green-50 rounded-2xl p-4"
                  >
                    <span className="text-xl">
                      ✓
                    </span>

                    <p className="text-gray-700">
                      {use}
                    </p>
                  </div>
                ))}

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-md p-7">

              <h2 className="text-2xl font-bold text-green-800">
                {t.howToDecompose}
              </h2>

              <p className="text-gray-600 mt-2">
                {t.decompositionDesc}
              </p>

              <div className="space-y-3 mt-5">

                {analysis.decomposition.map(
                  (step, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start"
                    >
                      <div className="min-w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>

                      <p className="text-gray-700 pt-1 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  )
                )}

              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

                <p className="font-bold text-yellow-800">
                  {t.estimatedTime}
                </p>

                <p className="text-yellow-700 mt-1">
                  {analysis.decompositionTime}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-md p-7">

              <h2 className="text-2xl font-bold text-green-800">
                {t.usefulProducts}
              </h2>

              <div className="flex flex-wrap gap-3 mt-5">

                {analysis.products.map(
                  (product, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold"
                    >
                      🌱 {product}
                    </span>
                  )
                )}

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-md p-7">

              <h2 className="text-2xl font-bold text-red-700">
                {t.thingsToAvoid}
              </h2>

              <div className="space-y-3 mt-5">

                {analysis.avoid.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 bg-red-50 border border-red-100 rounded-2xl p-4"
                    >
                      <span className="text-xl">
                        ⚠️
                      </span>

                      <p className="text-gray-700">
                        {item}
                      </p>
                    </div>
                  )
                )}

              </div>

            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6">

              <p className="font-bold text-blue-800">
                {t.important}
              </p>

              <p className="text-blue-700 text-sm mt-2 leading-relaxed">
                {t.disclaimer}
              </p>

            </div>

            <button
              onClick={() => {
                setAnalysis(null);
                setPhoto(null);

                if (cameraInputRef.current) {
                  cameraInputRef.current.value = "";
                }

                if (uploadInputRef.current) {
                  uploadInputRef.current.value = "";
                }
              }}
              className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-green-700 text-green-700 font-bold hover:bg-green-50 transition"
            >
              {t.analyzeAnother}
            </button>

          </div>
        )}

      </div>
    </main>
  );
}