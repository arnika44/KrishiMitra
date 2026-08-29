"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
};

type IrrigationAdvice = {
  water: string;
  frequency: string;
  bestTime: string;
  warning: string;
};

type LanguageCode =
  | "en"
  | "hi"
  | "bn"
  | "mr"
  | "ta"
  | "te"
  | "gu"
  | "kn"
  | "ml"
  | "pa"
  | "or"
  | "as"
  | "ur";

type Translation = {
  title: string;
  loading: string;
  loadingDesc: string;
  cropNotFound: string;
  backToCrops: string;
  backTo: string;
  season: string;
  landArea: string;
  irrigation: string;
  recommendation: string;
  whenToIrrigate: string;
  bestTime: string;
  avoidOverwatering: string;
  waterManagement: string;
  checkSoil: string;
  checkSoilDesc: string;
  checkRainfall: string;
  checkRainfallDesc: string;
  avoidWastage: string;
  avoidWastageDesc: string;
  cropStage: string;
  cropStageDesc: string;
  cropDetails: string;
  crop: string;
  acres: string;

  wheatWater: string;
  wheatFrequency: string;
  wheatBestTime: string;
  wheatWarning: string;

  riceWater: string;
  riceFrequency: string;
  riceBestTime: string;
  riceWarning: string;

  maizeWater: string;
  maizeFrequency: string;
  maizeBestTime: string;
  maizeWarning: string;

  sugarcaneWater: string;
  sugarcaneFrequency: string;
  sugarcaneBestTime: string;
  sugarcaneWarning: string;

  potatoWater: string;
  potatoFrequency: string;
  potatoBestTime: string;
  potatoWarning: string;

  generalWater: string;
  generalFrequency: string;
  generalBestTime: string;
  generalWarning: string;
};

const translations: Record<LanguageCode, Translation> = {
  en: {
    title: "Irrigation",
    loading: "Loading Irrigation...",
    loadingDesc: "Please wait...",
    cropNotFound: "Crop not found",
    backToCrops: "Back to Crops",
    backTo: "Back to",
    season: "Season",
    landArea: "Land Area",
    irrigation: "Irrigation",
    recommendation: "Irrigation Recommendation",
    whenToIrrigate: "When to Irrigate",
    bestTime: "Best Time",
    avoidOverwatering: "Avoid Overwatering",
    waterManagement: "Water Management Tips",
    checkSoil: "Check Soil Moisture",
    checkSoilDesc:
      "Check the soil before irrigation. If enough moisture is already present, unnecessary watering can be avoided.",
    checkRainfall: "Check Rainfall",
    checkRainfallDesc:
      "If rain is expected, consider reducing or delaying irrigation to save water.",
    avoidWastage: "Avoid Water Wastage",
    avoidWastageDesc:
      "Use efficient irrigation methods where possible and prevent unnecessary water runoff.",
    cropStage: "Consider Crop Stage",
    cropStageDesc:
      "Water requirements can change as the crop grows. Adjust irrigation according to the crop stage.",
    cropDetails: "Crop Details",
    crop: "Crop",
    acres: "acres",

    wheatWater:
      "Wheat generally needs careful irrigation during important growth stages.",
    wheatFrequency:
      "Check soil moisture regularly and avoid unnecessary irrigation.",
    wheatBestTime:
      "Morning or evening is generally better for irrigation.",
    wheatWarning:
      "Avoid overwatering because excess water can damage wheat roots and affect crop growth.",

    riceWater:
      "Rice requires more water than many other field crops.",
    riceFrequency:
      "Maintain appropriate field moisture according to the crop growth stage.",
    riceBestTime:
      "Morning or evening irrigation can help reduce water loss.",
    riceWarning:
      "Avoid wasting water through unnecessary continuous flooding.",

    maizeWater:
      "Maize needs adequate soil moisture, especially during important growth stages.",
    maizeFrequency:
      "Irrigate when the soil starts becoming dry and monitor moisture regularly.",
    maizeBestTime:
      "Morning or evening is generally suitable.",
    maizeWarning:
      "Avoid waterlogging because excess water can harm maize roots.",

    sugarcaneWater:
      "Sugarcane has relatively high water requirements and needs regular moisture.",
    sugarcaneFrequency:
      "Irrigation frequency should depend on soil type, weather and crop stage.",
    sugarcaneBestTime:
      "Morning or evening can help reduce evaporation losses.",
    sugarcaneWarning:
      "Avoid excessive standing water and maintain proper field drainage.",

    potatoWater:
      "Potato needs consistent soil moisture for healthy tuber development.",
    potatoFrequency:
      "Monitor soil moisture and provide irrigation when required.",
    potatoBestTime:
      "Morning or evening is generally preferred.",
    potatoWarning:
      "Avoid excessive irrigation and waterlogging.",

    generalWater:
      "Irrigation requirements depend on crop type, soil, weather and growth stage.",
    generalFrequency:
      "Check soil moisture before irrigation instead of watering on a fixed schedule.",
    generalBestTime:
      "Morning or evening is generally better to reduce water loss.",
    generalWarning:
      "Avoid overwatering because excessive moisture can damage roots and encourage crop problems.",
  },

  hi: {
    title: "सिंचाई",
    loading: "सिंचाई जानकारी लोड हो रही है...",
    loadingDesc: "कृपया प्रतीक्षा करें...",
    cropNotFound: "फसल नहीं मिली",
    backToCrops: "फसलों पर वापस जाएं",
    backTo: "वापस जाएं",
    season: "मौसम",
    landArea: "भूमि क्षेत्र",
    irrigation: "सिंचाई",
    recommendation: "सिंचाई की सलाह",
    whenToIrrigate: "कब सिंचाई करें",
    bestTime: "सही समय",
    avoidOverwatering: "अधिक पानी देने से बचें",
    waterManagement: "जल प्रबंधन सुझाव",
    checkSoil: "मिट्टी की नमी जांचें",
    checkSoilDesc:
      "सिंचाई से पहले मिट्टी की नमी जांचें। यदि मिट्टी में पर्याप्त नमी है तो अनावश्यक पानी देने से बचें।",
    checkRainfall: "बारिश की स्थिति जांचें",
    checkRainfallDesc:
      "यदि बारिश होने की संभावना है तो पानी बचाने के लिए सिंचाई कम या कुछ समय के लिए रोकने पर विचार करें।",
    avoidWastage: "पानी की बर्बादी रोकें",
    avoidWastageDesc:
      "जहां संभव हो कुशल सिंचाई विधियों का उपयोग करें और अनावश्यक पानी बहने से रोकें।",
    cropStage: "फसल की अवस्था देखें",
    cropStageDesc:
      "फसल बढ़ने के साथ पानी की आवश्यकता बदल सकती है। फसल की अवस्था के अनुसार सिंचाई करें।",
    cropDetails: "फसल की जानकारी",
    crop: "फसल",
    acres: "एकड़",

    wheatWater:
      "गेहूं को फसल की महत्वपूर्ण अवस्थाओं में सावधानीपूर्वक सिंचाई की आवश्यकता होती है।",
    wheatFrequency:
      "मिट्टी की नमी नियमित रूप से जांचें और अनावश्यक सिंचाई से बचें।",
    wheatBestTime:
      "सुबह या शाम सिंचाई के लिए सामान्यतः बेहतर समय है।",
    wheatWarning:
      "अधिक पानी देने से बचें क्योंकि अतिरिक्त पानी गेहूं की जड़ों को नुकसान पहुंचा सकता है।",

    riceWater:
      "धान को कई अन्य खेत की फसलों की तुलना में अधिक पानी की आवश्यकता होती है।",
    riceFrequency:
      "फसल की अवस्था के अनुसार खेत में उचित नमी बनाए रखें।",
    riceBestTime:
      "सुबह या शाम सिंचाई करने से पानी की बर्बादी कम हो सकती है।",
    riceWarning:
      "अनावश्यक रूप से खेत में लगातार पानी भरकर रखने से बचें।",

    maizeWater:
      "मक्का को पर्याप्त मिट्टी की नमी चाहिए, खासकर फसल की महत्वपूर्ण अवस्थाओं में।",
    maizeFrequency:
      "मिट्टी सूखने लगे तो सिंचाई करें और नमी की नियमित जांच करें।",
    maizeBestTime:
      "सुबह या शाम सिंचाई के लिए उपयुक्त समय है।",
    maizeWarning:
      "खेत में पानी जमा होने से बचें क्योंकि अतिरिक्त पानी मक्का की जड़ों को नुकसान पहुंचा सकता है।",

    sugarcaneWater:
      "गन्ने को अपेक्षाकृत अधिक पानी की आवश्यकता होती है और नियमित नमी जरूरी है।",
    sugarcaneFrequency:
      "सिंचाई की आवृत्ति मिट्टी, मौसम और फसल की अवस्था पर निर्भर होनी चाहिए।",
    sugarcaneBestTime:
      "सुबह या शाम सिंचाई करने से पानी का वाष्पीकरण कम हो सकता है।",
    sugarcaneWarning:
      "खेत में बहुत अधिक पानी जमा न होने दें और उचित जल निकासी रखें।",

    potatoWater:
      "आलू के स्वस्थ कंद विकास के लिए मिट्टी में लगातार उचित नमी जरूरी है।",
    potatoFrequency:
      "मिट्टी की नमी जांचें और आवश्यकता होने पर सिंचाई करें।",
    potatoBestTime:
      "सुबह या शाम सिंचाई के लिए सामान्यतः बेहतर समय है।",
    potatoWarning:
      "अधिक सिंचाई और खेत में पानी जमा होने से बचें।",

    generalWater:
      "सिंचाई की आवश्यकता फसल, मिट्टी, मौसम और फसल की अवस्था पर निर्भर करती है।",
    generalFrequency:
      "निश्चित समय-सारणी के बजाय सिंचाई से पहले मिट्टी की नमी जांचें।",
    generalBestTime:
      "पानी की बर्बादी कम करने के लिए सुबह या शाम सिंचाई करना बेहतर है।",
    generalWarning:
      "अधिक पानी देने से बचें क्योंकि अत्यधिक नमी जड़ों को नुकसान पहुंचा सकती है और फसल में समस्या पैदा कर सकती है।",
  },

  bn: {
    title: "সেচ",
    loading: "সেচের তথ্য লোড হচ্ছে...",
    loadingDesc: "অনুগ্রহ করে অপেক্ষা করুন...",
    cropNotFound: "ফসল পাওয়া যায়নি",
    backToCrops: "ফসলে ফিরে যান",
    backTo: "ফিরে যান",
    season: "মৌসুম",
    landArea: "জমির পরিমাণ",
    irrigation: "সেচ",
    recommendation: "সেচের পরামর্শ",
    whenToIrrigate: "কখন সেচ দেবেন",
    bestTime: "সেরা সময়",
    avoidOverwatering: "অতিরিক্ত জল দেওয়া এড়িয়ে চলুন",
    waterManagement: "জল ব্যবস্থাপনার পরামর্শ",
    checkSoil: "মাটির আর্দ্রতা পরীক্ষা করুন",
    checkSoilDesc:
      "সেচ দেওয়ার আগে মাটির আর্দ্রতা পরীক্ষা করুন। পর্যাপ্ত আর্দ্রতা থাকলে অপ্রয়োজনীয় জল দেওয়া এড়িয়ে চলুন।",
    checkRainfall: "বৃষ্টির সম্ভাবনা পরীক্ষা করুন",
    checkRainfallDesc:
      "বৃষ্টির সম্ভাবনা থাকলে জল বাঁচাতে সেচ কমানো বা কিছু সময়ের জন্য পিছিয়ে দেওয়ার কথা বিবেচনা করুন।",
    avoidWastage: "জলের অপচয় এড়িয়ে চলুন",
    avoidWastageDesc:
      "সম্ভব হলে দক্ষ সেচ পদ্ধতি ব্যবহার করুন এবং অপ্রয়োজনীয় জল প্রবাহ বন্ধ করুন।",
    cropStage: "ফসলের পর্যায় বিবেচনা করুন",
    cropStageDesc:
      "ফসল বৃদ্ধির সঙ্গে জলের প্রয়োজন পরিবর্তিত হতে পারে। ফসলের পর্যায় অনুযায়ী সেচ সামঞ্জস্য করুন।",
    cropDetails: "ফসলের তথ্য",
    crop: "ফসল",
    acres: "একর",

    wheatWater:
      "গমের গুরুত্বপূর্ণ বৃদ্ধির পর্যায়ে সতর্কভাবে সেচ প্রয়োজন।",
    wheatFrequency:
      "নিয়মিত মাটির আর্দ্রতা পরীক্ষা করুন এবং অপ্রয়োজনীয় সেচ এড়িয়ে চলুন।",
    wheatBestTime:
      "সকাল বা সন্ধ্যা সাধারণত সেচের জন্য ভালো সময়।",
    wheatWarning:
      "অতিরিক্ত জল দেওয়া এড়িয়ে চলুন কারণ অতিরিক্ত জল গমের শিকড়ের ক্ষতি করতে পারে।",

    riceWater:
      "ধানের অনেক অন্যান্য ফসলের তুলনায় বেশি জলের প্রয়োজন হয়।",
    riceFrequency:
      "ফসলের বৃদ্ধির পর্যায় অনুযায়ী জমিতে উপযুক্ত আর্দ্রতা বজায় রাখুন।",
    riceBestTime:
      "সকাল বা সন্ধ্যায় সেচ দিলে জলের অপচয় কমানো যায়।",
    riceWarning:
      "অপ্রয়োজনীয়ভাবে জমিতে সবসময় জল জমিয়ে রাখবেন না।",

    maizeWater:
      "ভুট্টার পর্যাপ্ত মাটির আর্দ্রতা প্রয়োজন, বিশেষ করে গুরুত্বপূর্ণ বৃদ্ধির সময়।",
    maizeFrequency:
      "মাটি শুকাতে শুরু করলে সেচ দিন এবং নিয়মিত আর্দ্রতা পরীক্ষা করুন।",
    maizeBestTime:
      "সকাল বা সন্ধ্যা সাধারণত উপযুক্ত।",
    maizeWarning:
      "জল জমে থাকা এড়িয়ে চলুন কারণ অতিরিক্ত জল ভুট্টার শিকড়ের ক্ষতি করতে পারে।",

    sugarcaneWater:
      "আখের তুলনামূলকভাবে বেশি জলের প্রয়োজন এবং নিয়মিত আর্দ্রতা দরকার।",
    sugarcaneFrequency:
      "মাটির ধরন, আবহাওয়া এবং ফসলের পর্যায় অনুযায়ী সেচের সময় নির্ধারণ করুন।",
    sugarcaneBestTime:
      "সকাল বা সন্ধ্যায় সেচ দিলে বাষ্পীভবনের ক্ষতি কমে।",
    sugarcaneWarning:
      "অতিরিক্ত জল জমতে দেবেন না এবং ভালো নিষ্কাশন ব্যবস্থা রাখুন।",

    potatoWater:
      "আলুর সুস্থ কন্দ বৃদ্ধির জন্য মাটিতে নিয়মিত আর্দ্রতা প্রয়োজন।",
    potatoFrequency:
      "মাটির আর্দ্রতা পরীক্ষা করুন এবং প্রয়োজন অনুযায়ী সেচ দিন।",
    potatoBestTime:
      "সকাল বা সন্ধ্যা সাধারণত ভালো।",
    potatoWarning:
      "অতিরিক্ত সেচ এবং জল জমে থাকা এড়িয়ে চলুন।",

    generalWater:
      "সেচের প্রয়োজন ফসল, মাটি, আবহাওয়া এবং বৃদ্ধির পর্যায়ের উপর নির্ভর করে।",
    generalFrequency:
      "নির্দিষ্ট সময়সূচির পরিবর্তে সেচের আগে মাটির আর্দ্রতা পরীক্ষা করুন।",
    generalBestTime:
      "জলের অপচয় কমাতে সকাল বা সন্ধ্যায় সেচ দেওয়া ভালো।",
    generalWarning:
      "অতিরিক্ত জল দেওয়া এড়িয়ে চলুন কারণ অতিরিক্ত আর্দ্রতা শিকড়ের ক্ষতি করতে পারে।",
  },

  mr: {
    title: "सिंचन",
    loading: "सिंचन माहिती लोड होत आहे...",
    loadingDesc: "कृपया प्रतीक्षा करा...",
    cropNotFound: "पीक सापडले नाही",
    backToCrops: "पिकांकडे परत जा",
    backTo: "परत जा",
    season: "हंगाम",
    landArea: "जमिनीचे क्षेत्रफळ",
    irrigation: "सिंचन",
    recommendation: "सिंचनाचा सल्ला",
    whenToIrrigate: "सिंचन कधी करावे",
    bestTime: "योग्य वेळ",
    avoidOverwatering: "अति पाणी देणे टाळा",
    waterManagement: "पाणी व्यवस्थापन टिप्स",
    checkSoil: "मातीतील ओलावा तपासा",
    checkSoilDesc:
      "सिंचनापूर्वी मातीतील ओलावा तपासा. पुरेसा ओलावा असल्यास अनावश्यक पाणी देणे टाळा.",
    checkRainfall: "पावसाची शक्यता तपासा",
    checkRainfallDesc:
      "पावसाची शक्यता असल्यास पाणी वाचवण्यासाठी सिंचन कमी किंवा पुढे ढकलण्याचा विचार करा.",
    avoidWastage: "पाण्याची नासाडी टाळा",
    avoidWastageDesc:
      "शक्य असल्यास कार्यक्षम सिंचन पद्धती वापरा आणि अनावश्यक पाण्याचा निचरा टाळा.",
    cropStage: "पिकाची अवस्था लक्षात घ्या",
    cropStageDesc:
      "पीक वाढत असताना पाण्याची गरज बदलू शकते. पिकाच्या अवस्थेनुसार सिंचन करा.",
    cropDetails: "पिकाची माहिती",
    crop: "पीक",
    acres: "एकर",

    wheatWater:
      "गव्हाला महत्त्वाच्या वाढीच्या अवस्थांमध्ये काळजीपूर्वक सिंचनाची गरज असते.",
    wheatFrequency:
      "मातीतील ओलावा नियमित तपासा आणि अनावश्यक सिंचन टाळा.",
    wheatBestTime:
      "सकाळी किंवा संध्याकाळी सिंचन करणे चांगले असते.",
    wheatWarning:
      "अति पाणी देणे टाळा कारण जास्त पाण्यामुळे गव्हाच्या मुळांना नुकसान होऊ शकते.",

    riceWater:
      "भाताला इतर अनेक पिकांपेक्षा जास्त पाण्याची गरज असते.",
    riceFrequency:
      "पिकाच्या अवस्थेनुसार शेतातील योग्य ओलावा कायम ठेवा.",
    riceBestTime:
      "सकाळी किंवा संध्याकाळी सिंचन केल्याने पाण्याची नासाडी कमी होऊ शकते.",
    riceWarning:
      "अनावश्यकपणे शेतात सतत पाणी साचवणे टाळा.",

    maizeWater:
      "मक्याला पुरेशी मातीतील ओलावा आवश्यक असतो, विशेषतः महत्त्वाच्या वाढीच्या अवस्थांमध्ये.",
    maizeFrequency:
      "माती कोरडी होऊ लागल्यावर सिंचन करा आणि ओलावा नियमित तपासा.",
    maizeBestTime:
      "सकाळी किंवा संध्याकाळी सिंचन करणे योग्य आहे.",
    maizeWarning:
      "शेतात पाणी साचू देऊ नका कारण जास्त पाणी मक्याच्या मुळांना नुकसान करू शकते.",

    sugarcaneWater:
      "उसाला तुलनेने जास्त पाण्याची गरज असते आणि नियमित ओलावा आवश्यक असतो.",
    sugarcaneFrequency:
      "माती, हवामान आणि पिकाच्या अवस्थेनुसार सिंचनाची वारंवारता ठरवा.",
    sugarcaneBestTime:
      "सकाळी किंवा संध्याकाळी सिंचन केल्याने बाष्पीभवन कमी होते.",
    sugarcaneWarning:
      "अति पाणी साचू देऊ नका आणि योग्य निचरा ठेवा.",

    potatoWater:
      "बटाट्याच्या निरोगी कंद वाढीसाठी मातीमध्ये सातत्यपूर्ण ओलावा आवश्यक असतो.",
    potatoFrequency:
      "मातीतील ओलावा तपासा आणि गरजेनुसार सिंचन करा.",
    potatoBestTime:
      "सकाळी किंवा संध्याकाळी सिंचन करणे योग्य आहे.",
    potatoWarning:
      "अति सिंचन आणि पाणी साचणे टाळा.",

    generalWater:
      "सिंचनाची गरज पीक, माती, हवामान आणि पिकाच्या अवस्थेवर अवलंबून असते.",
    generalFrequency:
      "ठराविक वेळापत्रकाऐवजी सिंचनापूर्वी मातीतील ओलावा तपासा.",
    generalBestTime:
      "पाण्याची नासाडी कमी करण्यासाठी सकाळी किंवा संध्याकाळी सिंचन करा.",
    generalWarning:
      "अति पाणी देणे टाळा कारण जास्त ओलाव्यामुळे मुळांना नुकसान होऊ शकते.",
  },

  ta: {
    title: "நீர்ப்பாசனம்",
    loading: "நீர்ப்பாசன தகவல் ஏற்றப்படுகிறது...",
    loadingDesc: "தயவுசெய்து காத்திருக்கவும்...",
    cropNotFound: "பயிர் கிடைக்கவில்லை",
    backToCrops: "பயிர்களுக்கு திரும்பவும்",
    backTo: "திரும்பவும்",
    season: "பருவம்",
    landArea: "நிலப்பரப்பு",
    irrigation: "நீர்ப்பாசனம்",
    recommendation: "நீர்ப்பாசன பரிந்துரை",
    whenToIrrigate: "எப்போது நீர்ப்பாசனம் செய்ய வேண்டும்",
    bestTime: "சிறந்த நேரம்",
    avoidOverwatering: "அதிக நீர்ப்பாசனத்தை தவிர்க்கவும்",
    waterManagement: "நீர் மேலாண்மை குறிப்புகள்",
    checkSoil: "மண் ஈரப்பதத்தை சரிபார்க்கவும்",
    checkSoilDesc:
      "நீர்ப்பாசனத்திற்கு முன் மண்ணின் ஈரப்பதத்தை சரிபார்க்கவும். போதுமான ஈரப்பதம் இருந்தால் தேவையற்ற நீர்ப்பாசனத்தை தவிர்க்கவும்.",
    checkRainfall: "மழையை சரிபார்க்கவும்",
    checkRainfallDesc:
      "மழை எதிர்பார்க்கப்பட்டால் நீரை சேமிக்க நீர்ப்பாசனத்தை குறைக்கவும் அல்லது தாமதப்படுத்தவும்.",
    avoidWastage: "நீர் வீணாவதை தவிர்க்கவும்",
    avoidWastageDesc:
      "முடிந்தவரை திறமையான நீர்ப்பாசன முறைகளை பயன்படுத்தி தேவையற்ற நீர் ஓட்டத்தை தடுக்கவும்.",
    cropStage: "பயிர் நிலையை கருத்தில் கொள்ளவும்",
    cropStageDesc:
      "பயிர் வளரும்போது நீர் தேவை மாறலாம். பயிரின் வளர்ச்சி நிலைக்கு ஏற்ப நீர்ப்பாசனத்தை மாற்றவும்.",
    cropDetails: "பயிர் விவரங்கள்",
    crop: "பயிர்",
    acres: "ஏக்கர்",

    wheatWater:
      "கோதுமைக்கு முக்கியமான வளர்ச்சி நிலைகளில் கவனமான நீர்ப்பாசனம் தேவை.",
    wheatFrequency:
      "மண் ஈரப்பதத்தை தொடர்ந்து சரிபார்த்து தேவையற்ற நீர்ப்பாசனத்தை தவிர்க்கவும்.",
    wheatBestTime:
      "காலை அல்லது மாலை நீர்ப்பாசனத்திற்கு சிறந்த நேரம்.",
    wheatWarning:
      "அதிக நீர்ப்பாசனம் கோதுமையின் வேர்களை பாதிக்கக்கூடும்.",

    riceWater:
      "நெற்பயிருக்கு பல பயிர்களை விட அதிக நீர் தேவைப்படுகிறது.",
    riceFrequency:
      "பயிரின் வளர்ச்சி நிலைக்கு ஏற்ப சரியான ஈரப்பதத்தை பராமரிக்கவும்.",
    riceBestTime:
      "காலை அல்லது மாலை நீர்ப்பாசனம் செய்வதால் நீர் இழப்பு குறையும்.",
    riceWarning:
      "தேவையில்லாமல் வயலில் தொடர்ந்து தண்ணீர் தேங்குவதை தவிர்க்கவும்.",

    maizeWater:
      "மக்காச்சோளத்திற்கு போதுமான மண் ஈரப்பதம் தேவை.",
    maizeFrequency:
      "மண் உலரத் தொடங்கும்போது நீர்ப்பாசனம் செய்து ஈரப்பதத்தை கண்காணிக்கவும்.",
    maizeBestTime:
      "காலை அல்லது மாலை ஏற்ற நேரமாகும்.",
    maizeWarning:
      "நீர் தேங்குவதை தவிர்க்கவும்.",

    sugarcaneWater:
      "கரும்புக்கு அதிக நீர் தேவைப்படுகிறது மற்றும் தொடர்ந்து ஈரப்பதம் அவசியம்.",
    sugarcaneFrequency:
      "மண், வானிலை மற்றும் பயிர் நிலைக்கு ஏற்ப நீர்ப்பாசனத்தை திட்டமிடவும்.",
    sugarcaneBestTime:
      "காலை அல்லது மாலை நீர்ப்பாசனம் செய்வதால் ஆவியாதல் குறையும்.",
    sugarcaneWarning:
      "அதிக நீர் தேங்குவதை தவிர்த்து நல்ல வடிகால் அமைப்பை வைத்திருக்கவும்.",

    potatoWater:
      "உருளைக்கிழங்கின் நல்ல கிழங்கு வளர்ச்சிக்கு தொடர்ந்து மண் ஈரப்பதம் தேவை.",
    potatoFrequency:
      "மண் ஈரப்பதத்தை கண்காணித்து தேவையான போது நீர்ப்பாசனம் செய்யவும்.",
    potatoBestTime:
      "காலை அல்லது மாலை சிறந்த நேரம்.",
    potatoWarning:
      "அதிக நீர்ப்பாசனம் மற்றும் நீர் தேங்குவதை தவிர்க்கவும்.",

    generalWater:
      "நீர்ப்பாசனத் தேவை பயிர், மண், வானிலை மற்றும் வளர்ச்சி நிலையைப் பொறுத்தது.",
    generalFrequency:
      "நிலையான அட்டவணைக்கு பதிலாக நீர்ப்பாசனத்திற்கு முன் மண் ஈரப்பதத்தை சரிபார்க்கவும்.",
    generalBestTime:
      "நீர் இழப்பை குறைக்க காலை அல்லது மாலை நீர்ப்பாசனம் செய்யவும்.",
    generalWarning:
      "அதிக நீர்ப்பாசனத்தை தவிர்க்கவும்; அதிக ஈரப்பதம் வேர்களை பாதிக்கலாம்.",
  },

  te: {
    title: "నీటిపారుదల",
    loading: "నీటిపారుదల సమాచారం లోడ్ అవుతోంది...",
    loadingDesc: "దయచేసి వేచి ఉండండి...",
    cropNotFound: "పంట కనబడలేదు",
    backToCrops: "పంటలకు తిరిగి వెళ్లండి",
    backTo: "తిరిగి వెళ్లండి",
    season: "కాలం",
    landArea: "భూమి విస్తీర్ణం",
    irrigation: "నీటిపారుదల",
    recommendation: "నీటిపారుదల సలహా",
    whenToIrrigate: "ఎప్పుడు నీరు పెట్టాలి",
    bestTime: "మంచి సమయం",
    avoidOverwatering: "అధిక నీరు పెట్టడం నివారించండి",
    waterManagement: "నీటి నిర్వహణ సూచనలు",
    checkSoil: "మట్టి తేమను తనిఖీ చేయండి",
    checkSoilDesc:
      "నీరు పెట్టే ముందు మట్టి తేమను తనిఖీ చేయండి. తగినంత తేమ ఉంటే అనవసరంగా నీరు పెట్టవద్దు.",
    checkRainfall: "వర్షపాతం తనిఖీ చేయండి",
    checkRainfallDesc:
      "వర్షం వచ్చే అవకాశం ఉంటే నీటిని ఆదా చేయడానికి నీటిపారుదలను తగ్గించండి లేదా ఆలస్యం చేయండి.",
    avoidWastage: "నీటి వృథాను నివారించండి",
    avoidWastageDesc:
      "సాధ్యమైనప్పుడు సమర్థవంతమైన నీటిపారుదల పద్ధతులను ఉపయోగించండి.",
    cropStage: "పంట దశను పరిగణించండి",
    cropStageDesc:
      "పంట పెరుగుతున్నప్పుడు నీటి అవసరం మారవచ్చు. పంట దశకు అనుగుణంగా నీటిపారుదల చేయండి.",
    cropDetails: "పంట వివరాలు",
    crop: "పంట",
    acres: "ఎకరాలు",

    wheatWater:
      "గోధుమలకు ముఖ్యమైన పెరుగుదల దశల్లో జాగ్రత్తగా నీటిపారుదల అవసరం.",
    wheatFrequency:
      "మట్టి తేమను క్రమం తప్పకుండా తనిఖీ చేసి అనవసర నీటిపారుదలను నివారించండి.",
    wheatBestTime:
      "ఉదయం లేదా సాయంత్రం నీరు పెట్టడం మంచిది.",
    wheatWarning:
      "అధిక నీరు గోధుమ వేర్లకు నష్టం కలిగించవచ్చు.",

    riceWater:
      "వరి పంటకు అనేక ఇతర పంటల కంటే ఎక్కువ నీరు అవసరం.",
    riceFrequency:
      "పంట దశకు అనుగుణంగా తగిన తేమను నిర్వహించండి.",
    riceBestTime:
      "ఉదయం లేదా సాయంత్రం నీరు పెట్టడం వల్ల నీటి నష్టం తగ్గుతుంది.",
    riceWarning:
      "అవసరం లేకుండా పొలంలో నిరంతరం నీరు నిల్వ ఉంచవద్దు.",

    maizeWater:
      "మొక్కజొన్నకు తగిన మట్టి తేమ అవసరం.",
    maizeFrequency:
      "మట్టి ఎండిపోవడం ప్రారంభించినప్పుడు నీరు పెట్టండి.",
    maizeBestTime:
      "ఉదయం లేదా సాయంత్రం అనుకూలమైన సమయం.",
    maizeWarning:
      "నీరు నిలిచిపోకుండా చూసుకోండి.",

    sugarcaneWater:
      "చెరకు పంటకు ఎక్కువ నీరు అవసరం మరియు నిరంతర తేమ అవసరం.",
    sugarcaneFrequency:
      "మట్టి, వాతావరణం మరియు పంట దశను బట్టి నీటిపారుదల చేయండి.",
    sugarcaneBestTime:
      "ఉదయం లేదా సాయంత్రం నీరు పెట్టడం వల్ల ఆవిరీభవనం తగ్గుతుంది.",
    sugarcaneWarning:
      "అధిక నీరు నిల్వ ఉండకుండా మంచి డ్రైనేజీని నిర్వహించండి.",

    potatoWater:
      "బంగాళాదుంపల మంచి పెరుగుదలకు మట్టి తేమ అవసరం.",
    potatoFrequency:
      "మట్టి తేమను తనిఖీ చేసి అవసరమైనప్పుడు నీరు పెట్టండి.",
    potatoBestTime:
      "ఉదయం లేదా సాయంత్రం మంచిది.",
    potatoWarning:
      "అధిక నీటిపారుదల మరియు నీరు నిలవడాన్ని నివారించండి.",

    generalWater:
      "నీటిపారుదల అవసరం పంట, మట్టి, వాతావరణం మరియు పంట దశపై ఆధారపడి ఉంటుంది.",
    generalFrequency:
      "స్థిరమైన షెడ్యూల్‌కు బదులుగా నీరు పెట్టే ముందు మట్టి తేమను తనిఖీ చేయండి.",
    generalBestTime:
      "నీటి నష్టాన్ని తగ్గించడానికి ఉదయం లేదా సాయంత్రం నీరు పెట్టండి.",
    generalWarning:
      "అధిక నీరు పెట్టవద్దు. అధిక తేమ వేర్లను దెబ్బతీయవచ్చు.",
  },

  gu: {
    title: "સિંચાઈ",
    loading: "સિંચાઈ માહિતી લોડ થઈ રહી છે...",
    loadingDesc: "કૃપા કરીને રાહ જુઓ...",
    cropNotFound: "પાક મળ્યો નથી",
    backToCrops: "પાક પર પાછા જાઓ",
    backTo: "પાછા જાઓ",
    season: "મોસમ",
    landArea: "જમીન વિસ્તાર",
    irrigation: "સિંચાઈ",
    recommendation: "સિંચાઈની સલાહ",
    whenToIrrigate: "ક્યારે સિંચાઈ કરવી",
    bestTime: "યોગ્ય સમય",
    avoidOverwatering: "વધુ પાણી આપવાનું ટાળો",
    waterManagement: "પાણી વ્યવસ્થાપન સૂચનો",
    checkSoil: "માટીની ભેજ તપાસો",
    checkSoilDesc:
      "સિંચાઈ પહેલાં માટીની ભેજ તપાસો. પૂરતી ભેજ હોય તો બિનજરૂરી પાણી આપવાનું ટાળો.",
    checkRainfall: "વરસાદ તપાસો",
    checkRainfallDesc:
      "વરસાદની શક્યતા હોય તો પાણી બચાવવા સિંચાઈ ઘટાડવા અથવા મોડું કરવાની વિચારણા કરો.",
    avoidWastage: "પાણીનો બગાડ ટાળો",
    avoidWastageDesc:
      "શક્ય હોય ત્યાં કાર્યક્ષમ સિંચાઈ પદ્ધતિઓનો ઉપયોગ કરો અને પાણીનો બિનજરૂરી પ્રવાહ રોકો.",
    cropStage: "પાકની અવસ્થા ધ્યાનમાં લો",
    cropStageDesc:
      "પાક વધે તેમ પાણીની જરૂરિયાત બદલાઈ શકે છે. પાકની અવસ્થા અનુસાર સિંચાઈ કરો.",
    cropDetails: "પાકની વિગતો",
    crop: "પાક",
    acres: "એકર",

    wheatWater:
      "ઘઉંને મહત્વની વૃદ્ધિ અવસ્થામાં સાવચેતીપૂર્વક સિંચાઈની જરૂર પડે છે.",
    wheatFrequency:
      "માટીની ભેજ નિયમિત તપાસો અને બિનજરૂરી સિંચાઈ ટાળો.",
    wheatBestTime:
      "સવારે અથવા સાંજે સિંચાઈ કરવી વધુ યોગ્ય છે.",
    wheatWarning:
      "વધુ પાણી આપવાનું ટાળો કારણ કે તે ઘઉંના મૂળને નુકસાન કરી શકે છે.",

    riceWater:
      "ચોખાના પાકને અન્ય ઘણા પાક કરતાં વધુ પાણીની જરૂર પડે છે.",
    riceFrequency:
      "પાકની અવસ્થા અનુસાર યોગ્ય ભેજ જાળવો.",
    riceBestTime:
      "સવારે અથવા સાંજે સિંચાઈ કરવાથી પાણીનો બગાડ ઓછો થાય છે.",
    riceWarning:
      "બિનજરૂરી રીતે ખેતરમાં સતત પાણી ભરેલું ન રાખો.",

    maizeWater:
      "મકાઈને પૂરતી માટીની ભેજની જરૂર પડે છે.",
    maizeFrequency:
      "માટી સૂકાવા લાગે ત્યારે સિંચાઈ કરો.",
    maizeBestTime:
      "સવારે અથવા સાંજે યોગ્ય સમય છે.",
    maizeWarning:
      "ખેતરમાં પાણી ભરાવા ન દો.",

    sugarcaneWater:
      "શેરડીને પ્રમાણમાં વધુ પાણીની જરૂર પડે છે.",
    sugarcaneFrequency:
      "માટી, હવામાન અને પાકની અવસ્થા અનુસાર સિંચાઈ કરો.",
    sugarcaneBestTime:
      "સવારે અથવા સાંજે સિંચાઈ કરવાથી બાષ્પીભવન ઓછું થાય છે.",
    sugarcaneWarning:
      "વધુ પાણી ભરાવા ન દો અને યોગ્ય ડ્રેનેજ રાખો.",

    potatoWater:
      "બટાકાના સારા વિકાસ માટે માટીમાં સતત ભેજ જરૂરી છે.",
    potatoFrequency:
      "માટીની ભેજ તપાસો અને જરૂર મુજબ સિંચાઈ કરો.",
    potatoBestTime:
      "સવારે અથવા સાંજે યોગ્ય સમય છે.",
    potatoWarning:
      "વધુ સિંચાઈ અને પાણી ભરાવાથી બચો.",

    generalWater:
      "સિંચાઈની જરૂરિયાત પાક, માટી, હવામાન અને પાકની અવસ્થા પર આધારિત છે.",
    generalFrequency:
      "નક્કી સમયપત્રક કરતાં સિંચાઈ પહેલાં માટીની ભેજ તપાસો.",
    generalBestTime:
      "પાણીનો બગાડ ઘટાડવા સવારે અથવા સાંજે સિંચાઈ કરો.",
    generalWarning:
      "વધુ પાણી આપવાનું ટાળો કારણ કે વધારે ભેજ મૂળને નુકસાન કરી શકે છે.",
  },

  kn: {
    title: "ನೀರಾವರಿ",
    loading: "ನೀರಾವರಿ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    loadingDesc: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ...",
    cropNotFound: "ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ",
    backToCrops: "ಬೆಳೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    backTo: "ಹಿಂತಿರುಗಿ",
    season: "ಋತು",
    landArea: "ಭೂಮಿ ವಿಸ್ತೀರ್ಣ",
    irrigation: "ನೀರಾವರಿ",
    recommendation: "ನೀರಾವರಿ ಸಲಹೆ",
    whenToIrrigate: "ಯಾವಾಗ ನೀರು ಹಾಕಬೇಕು",
    bestTime: "ಉತ್ತಮ ಸಮಯ",
    avoidOverwatering: "ಅತಿಯಾದ ನೀರು ಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ",
    waterManagement: "ನೀರು ನಿರ್ವಹಣೆ ಸಲಹೆಗಳು",
    checkSoil: "ಮಣ್ಣಿನ ತೇವಾಂಶ ಪರಿಶೀಲಿಸಿ",
    checkSoilDesc:
      "ನೀರಾವರಿ ಮಾಡುವ ಮೊದಲು ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಿ. ಸಾಕಷ್ಟು ತೇವಾಂಶ ಇದ್ದರೆ ಅನಗತ್ಯ ನೀರು ಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ.",
    checkRainfall: "ಮಳೆಯ ಸಾಧ್ಯತೆ ಪರಿಶೀಲಿಸಿ",
    checkRainfallDesc:
      "ಮಳೆಯ ಸಾಧ್ಯತೆ ಇದ್ದರೆ ನೀರನ್ನು ಉಳಿಸಲು ನೀರಾವರಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ ಅಥವಾ ಮುಂದೂಡಿ.",
    avoidWastage: "ನೀರಿನ ವ್ಯರ್ಥ ತಪ್ಪಿಸಿ",
    avoidWastageDesc:
      "ಸಾಧ್ಯವಾದಲ್ಲಿ ಪರಿಣಾಮಕಾರಿ ನೀರಾವರಿ ವಿಧಾನಗಳನ್ನು ಬಳಸಿ.",
    cropStage: "ಬೆಳೆಯ ಹಂತವನ್ನು ಪರಿಗಣಿಸಿ",
    cropStageDesc:
      "ಬೆಳೆ ಬೆಳೆಯುತ್ತಿದ್ದಂತೆ ನೀರಿನ ಅಗತ್ಯ ಬದಲಾಗಬಹುದು. ಬೆಳೆಯ ಹಂತಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನೀರಾವರಿ ಮಾಡಿ.",
    cropDetails: "ಬೆಳೆ ವಿವರಗಳು",
    crop: "ಬೆಳೆ",
    acres: "ಎಕರೆ",

    wheatWater:
      "ಗೋಧಿಗೆ ಪ್ರಮುಖ ಬೆಳವಣಿಗೆಯ ಹಂತಗಳಲ್ಲಿ ಎಚ್ಚರಿಕೆಯಿಂದ ನೀರಾವರಿ ಅಗತ್ಯ.",
    wheatFrequency:
      "ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
    wheatBestTime:
      "ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರು ಹಾಕುವುದು ಉತ್ತಮ.",
    wheatWarning:
      "ಅತಿಯಾದ ನೀರು ಗೋಧಿಯ ಬೇರುಗಳಿಗೆ ಹಾನಿ ಮಾಡಬಹುದು.",

    riceWater:
      "ಭತ್ತಕ್ಕೆ ಇತರ ಅನೇಕ ಬೆಳೆಗಳಿಗಿಂತ ಹೆಚ್ಚು ನೀರು ಬೇಕಾಗುತ್ತದೆ.",
    riceFrequency:
      "ಬೆಳೆಯ ಹಂತಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಸರಿಯಾದ ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಿ.",
    riceBestTime:
      "ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರಾವರಿ ಮಾಡುವುದರಿಂದ ನೀರಿನ ನಷ್ಟ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
    riceWarning:
      "ಅಗತ್ಯವಿಲ್ಲದೆ ಹೊಲದಲ್ಲಿ ನಿರಂತರವಾಗಿ ನೀರು ನಿಲ್ಲಿಸಬೇಡಿ.",

    maizeWater:
      "ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ ಸಾಕಷ್ಟು ಮಣ್ಣಿನ ತೇವಾಂಶ ಅಗತ್ಯ.",
    maizeFrequency:
      "ಮಣ್ಣು ಒಣಗಲು ಪ್ರಾರಂಭಿಸಿದಾಗ ನೀರು ಹಾಕಿ.",
    maizeBestTime:
      "ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ಸೂಕ್ತ ಸಮಯ.",
    maizeWarning:
      "ನೀರು ನಿಲ್ಲುವುದನ್ನು ತಪ್ಪಿಸಿ.",

    sugarcaneWater:
      "ಕಬ್ಬಿಗೆ ಹೆಚ್ಚು ನೀರು ಬೇಕಾಗುತ್ತದೆ ಮತ್ತು ನಿಯಮಿತ ತೇವಾಂಶ ಅಗತ್ಯ.",
    sugarcaneFrequency:
      "ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಬೆಳೆಯ ಹಂತಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನೀರಾವರಿ ಮಾಡಿ.",
    sugarcaneBestTime:
      "ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರು ಹಾಕುವುದರಿಂದ ಆವಿಯಾಗುವಿಕೆ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
    sugarcaneWarning:
      "ಅತಿಯಾದ ನೀರು ನಿಲ್ಲದಂತೆ ಉತ್ತಮ ಒಳಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಇರಲಿ.",

    potatoWater:
      "ಆಲೂಗಡ್ಡೆಯ ಉತ್ತಮ ಬೆಳವಣಿಗೆಗೆ ಮಣ್ಣಿನಲ್ಲಿ ನಿರಂತರ ತೇವಾಂಶ ಅಗತ್ಯ.",
    potatoFrequency:
      "ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಿ ಅಗತ್ಯವಿದ್ದಾಗ ನೀರು ಹಾಕಿ.",
    potatoBestTime:
      "ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ಉತ್ತಮ ಸಮಯ.",
    potatoWarning:
      "ಅತಿಯಾದ ನೀರಾವರಿ ಮತ್ತು ನೀರು ನಿಲ್ಲುವುದನ್ನು ತಪ್ಪಿಸಿ.",

    generalWater:
      "ನೀರಾವರಿ ಅಗತ್ಯವು ಬೆಳೆ, ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಬೆಳೆಯ ಹಂತವನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ.",
    generalFrequency:
      "ನಿಗದಿತ ವೇಳಾಪಟ್ಟಿಗಿಂತ ಮೊದಲು ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಿ.",
    generalBestTime:
      "ನೀರಿನ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರು ಹಾಕಿ.",
    generalWarning:
      "ಅತಿಯಾದ ನೀರು ಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ.",
  },

  ml: {
    title: "ജലസേചനം",
    loading: "ജലസേചന വിവരം ലോഡ് ചെയ്യുന്നു...",
    loadingDesc: "ദയവായി കാത്തിരിക്കുക...",
    cropNotFound: "വിള കണ്ടെത്തിയില്ല",
    backToCrops: "വിളകളിലേക്ക് മടങ്ങുക",
    backTo: "തിരികെ",
    season: "കാലം",
    landArea: "ഭൂമി വിസ്തീർണ്ണം",
    irrigation: "ജലസേചനം",
    recommendation: "ജലസേചന ഉപദേശം",
    whenToIrrigate: "എപ്പോൾ ജലസേചനം നടത്തണം",
    bestTime: "മികച്ച സമയം",
    avoidOverwatering: "അധികം വെള്ളം നൽകുന്നത് ഒഴിവാക്കുക",
    waterManagement: "ജല മാനേജ്മെന്റ് നിർദ്ദേശങ്ങൾ",
    checkSoil: "മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക",
    checkSoilDesc:
      "ജലസേചനത്തിന് മുമ്പ് മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക. ആവശ്യത്തിന് ഈർപ്പം ഉണ്ടെങ്കിൽ അനാവശ്യമായി വെള്ളം നൽകരുത്.",
    checkRainfall: "മഴ പരിശോധിക്കുക",
    checkRainfallDesc:
      "മഴ പ്രതീക്ഷിക്കുന്നുണ്ടെങ്കിൽ വെള്ളം ലാഭിക്കാൻ ജലസേചനം കുറയ്ക്കുകയോ വൈകിപ്പിക്കുകയോ ചെയ്യുക.",
    avoidWastage: "വെള്ളം പാഴാക്കുന്നത് ഒഴിവാക്കുക",
    avoidWastageDesc:
      "സാധ്യമെങ്കിൽ കാര്യക്ഷമമായ ജലസേചന രീതികൾ ഉപയോഗിക്കുക.",
    cropStage: "വിളയുടെ ഘട്ടം പരിഗണിക്കുക",
    cropStageDesc:
      "വിള വളരുന്നതിനനുസരിച്ച് വെള്ളത്തിന്റെ ആവശ്യം മാറാം. വിളയുടെ ഘട്ടത്തിന് അനുസരിച്ച് ജലസേചനം ക്രമീകരിക്കുക.",
    cropDetails: "വിള വിവരങ്ങൾ",
    crop: "വിള",
    acres: "ഏക്കർ",

    wheatWater:
      "ഗോതമ്പിന് പ്രധാന വളർച്ചാ ഘട്ടങ്ങളിൽ ശ്രദ്ധാപൂർവ്വമായ ജലസേചനം ആവശ്യമാണ്.",
    wheatFrequency:
      "മണ്ണിലെ ഈർപ്പം പതിവായി പരിശോധിക്കുക.",
    wheatBestTime:
      "രാവിലെയോ വൈകുന്നേരമോ ജലസേചനത്തിന് നല്ല സമയമാണ്.",
    wheatWarning:
      "അധിക വെള്ളം ഗോതമ്പിന്റെ വേരുകൾക്ക് കേടുപാടുകൾ വരുത്താം.",

    riceWater:
      "നെല്ലിന് മറ്റ് പല വിളകളേക്കാളും കൂടുതൽ വെള്ളം ആവശ്യമാണ്.",
    riceFrequency:
      "വിളയുടെ ഘട്ടത്തിന് അനുസരിച്ച് ആവശ്യമായ ഈർപ്പം നിലനിർത്തുക.",
    riceBestTime:
      "രാവിലെയോ വൈകുന്നേരമോ ജലസേചനം ചെയ്യുന്നത് വെള്ളനഷ്ടം കുറയ്ക്കും.",
    riceWarning:
      "ആവശ്യമില്ലാതെ വയലിൽ തുടർച്ചയായി വെള്ളം കെട്ടിനിൽക്കുന്നത് ഒഴിവാക്കുക.",

    maizeWater:
      "ചോളത്തിന് ആവശ്യമായ മണ്ണിലെ ഈർപ്പം വേണം.",
    maizeFrequency:
      "മണ്ണ് ഉണങ്ങാൻ തുടങ്ങുമ്പോൾ ജലസേചനം നടത്തുക.",
    maizeBestTime:
      "രാവിലെയോ വൈകുന്നേരമോ നല്ല സമയമാണ്.",
    maizeWarning:
      "വെള്ളം കെട്ടിനിൽക്കുന്നത് ഒഴിവാക്കുക.",

    sugarcaneWater:
      "കരിമ്പിന് കൂടുതൽ വെള്ളം ആവശ്യമാണ്.",
    sugarcaneFrequency:
      "മണ്ണ്, കാലാവസ്ഥ, വിളയുടെ ഘട്ടം എന്നിവ അനുസരിച്ച് ജലസേചനം നടത്തുക.",
    sugarcaneBestTime:
      "രാവിലെയോ വൈകുന്നേരമോ ജലസേചനം ചെയ്യുന്നത് ബാഷ്പീകരണം കുറയ്ക്കും.",
    sugarcaneWarning:
      "അധിക വെള്ളം കെട്ടിനിൽക്കാതിരിക്കാൻ നല്ല ഡ്രെയിനേജ് ഉറപ്പാക്കുക.",

    potatoWater:
      "ഉരുളക്കിഴങ്ങിന്റെ നല്ല വളർച്ചയ്ക്ക് മണ്ണിൽ സ്ഥിരമായ ഈർപ്പം ആവശ്യമാണ്.",
    potatoFrequency:
      "മണ്ണിലെ ഈർപ്പം പരിശോധിച്ച് ആവശ്യത്തിന് ജലസേചനം നടത്തുക.",
    potatoBestTime:
      "രാവിലെയോ വൈകുന്നേരമോ നല്ല സമയമാണ്.",
    potatoWarning:
      "അധിക ജലസേചനവും വെള്ളക്കെട്ടും ഒഴിവാക്കുക.",

    generalWater:
      "ജലസേചനത്തിന്റെ ആവശ്യം വിള, മണ്ണ്, കാലാവസ്ഥ, വിളയുടെ ഘട്ടം എന്നിവയെ ആശ്രയിച്ചിരിക്കുന്നു.",
    generalFrequency:
      "സ്ഥിരമായ സമയക്രമത്തിന് പകരം ജലസേചനത്തിന് മുമ്പ് മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക.",
    generalBestTime:
      "വെള്ളനഷ്ടം കുറയ്ക്കാൻ രാവിലെയോ വൈകുന്നേരമോ ജലസേചനം നടത്തുക.",
    generalWarning:
      "അധികം വെള്ളം നൽകരുത്. അമിതമായ ഈർപ്പം വേരുകൾക്ക് കേടുപാടുകൾ വരുത്താം.",
  },

  pa: {
    title: "ਸਿੰਚਾਈ",
    loading: "ਸਿੰਚਾਈ ਜਾਣਕਾਰੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
    loadingDesc: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...",
    cropNotFound: "ਫਸਲ ਨਹੀਂ ਮਿਲੀ",
    backToCrops: "ਫਸਲਾਂ ਵੱਲ ਵਾਪਸ ਜਾਓ",
    backTo: "ਵਾਪਸ ਜਾਓ",
    season: "ਮੌਸਮ",
    landArea: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰ",
    irrigation: "ਸਿੰਚਾਈ",
    recommendation: "ਸਿੰਚਾਈ ਦੀ ਸਲਾਹ",
    whenToIrrigate: "ਕਦੋਂ ਸਿੰਚਾਈ ਕਰਨੀ ਹੈ",
    bestTime: "ਵਧੀਆ ਸਮਾਂ",
    avoidOverwatering: "ਜ਼ਿਆਦਾ ਪਾਣੀ ਦੇਣ ਤੋਂ ਬਚੋ",
    waterManagement: "ਪਾਣੀ ਪ੍ਰਬੰਧਨ ਸੁਝਾਅ",
    checkSoil: "ਮਿੱਟੀ ਦੀ ਨਮੀ ਜਾਂਚੋ",
    checkSoilDesc:
      "ਸਿੰਚਾਈ ਤੋਂ ਪਹਿਲਾਂ ਮਿੱਟੀ ਦੀ ਨਮੀ ਜਾਂਚੋ। ਜੇ ਕਾਫ਼ੀ ਨਮੀ ਹੈ ਤਾਂ ਬੇਲੋੜਾ ਪਾਣੀ ਦੇਣ ਤੋਂ ਬਚੋ।",
    checkRainfall: "ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਜਾਂਚੋ",
    checkRainfallDesc:
      "ਜੇ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ ਤਾਂ ਪਾਣੀ ਬਚਾਉਣ ਲਈ ਸਿੰਚਾਈ ਘਟਾਓ ਜਾਂ ਦੇਰੀ ਕਰੋ।",
    avoidWastage: "ਪਾਣੀ ਦੀ ਬਰਬਾਦੀ ਰੋਕੋ",
    avoidWastageDesc:
      "ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ ਕੁਸ਼ਲ ਸਿੰਚਾਈ ਤਰੀਕੇ ਵਰਤੋ।",
    cropStage: "ਫਸਲ ਦੀ ਅਵਸਥਾ ਦੇਖੋ",
    cropStageDesc:
      "ਫਸਲ ਦੇ ਵਧਣ ਨਾਲ ਪਾਣੀ ਦੀ ਲੋੜ ਬਦਲ ਸਕਦੀ ਹੈ। ਫਸਲ ਦੀ ਅਵਸਥਾ ਅਨੁਸਾਰ ਸਿੰਚਾਈ ਕਰੋ।",
    cropDetails: "ਫਸਲ ਦੀ ਜਾਣਕਾਰੀ",
    crop: "ਫਸਲ",
    acres: "ਏਕੜ",

    wheatWater:
      "ਕਣਕ ਨੂੰ ਮਹੱਤਵਪੂਰਨ ਵਾਧੇ ਦੀਆਂ ਅਵਸਥਾਵਾਂ ਵਿੱਚ ਧਿਆਨ ਨਾਲ ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।",
    wheatFrequency:
      "ਮਿੱਟੀ ਦੀ ਨਮੀ ਨਿਯਮਿਤ ਜਾਂਚੋ ਅਤੇ ਬੇਲੋੜੀ ਸਿੰਚਾਈ ਤੋਂ ਬਚੋ।",
    wheatBestTime:
      "ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਸਿੰਚਾਈ ਲਈ ਵਧੀਆ ਸਮਾਂ ਹੈ।",
    wheatWarning:
      "ਜ਼ਿਆਦਾ ਪਾਣੀ ਕਣਕ ਦੀਆਂ ਜੜ੍ਹਾਂ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾ ਸਕਦਾ ਹੈ।",

    riceWater:
      "ਝੋਨੇ ਨੂੰ ਕਈ ਹੋਰ ਫਸਲਾਂ ਨਾਲੋਂ ਵੱਧ ਪਾਣੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।",
    riceFrequency:
      "ਫਸਲ ਦੀ ਅਵਸਥਾ ਅਨੁਸਾਰ ਢੁਕਵੀਂ ਨਮੀ ਬਣਾਈ ਰੱਖੋ।",
    riceBestTime:
      "ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਸਿੰਚਾਈ ਕਰਨ ਨਾਲ ਪਾਣੀ ਦਾ ਨੁਕਸਾਨ ਘਟ ਸਕਦਾ ਹੈ।",
    riceWarning:
      "ਬੇਲੋੜੇ ਤੌਰ 'ਤੇ ਖੇਤ ਵਿੱਚ ਲਗਾਤਾਰ ਪਾਣੀ ਨਾ ਖੜ੍ਹਾ ਰੱਖੋ।",

    maizeWater:
      "ਮੱਕੀ ਨੂੰ ਲੋੜੀਂਦੀ ਮਿੱਟੀ ਦੀ ਨਮੀ ਦੀ ਜ਼ਰੂਰਤ ਹੁੰਦੀ ਹੈ।",
    maizeFrequency:
      "ਮਿੱਟੀ ਸੁੱਕਣ ਲੱਗੇ ਤਾਂ ਸਿੰਚਾਈ ਕਰੋ।",
    maizeBestTime:
      "ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਢੁਕਵਾਂ ਸਮਾਂ ਹੈ।",
    maizeWarning:
      "ਪਾਣੀ ਖੜ੍ਹਾ ਹੋਣ ਤੋਂ ਬਚੋ।",

    sugarcaneWater:
      "ਗੰਨੇ ਨੂੰ ਵੱਧ ਪਾਣੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ ਅਤੇ ਨਿਯਮਿਤ ਨਮੀ ਜ਼ਰੂਰੀ ਹੈ।",
    sugarcaneFrequency:
      "ਮਿੱਟੀ, ਮੌਸਮ ਅਤੇ ਫਸਲ ਦੀ ਅਵਸਥਾ ਅਨੁਸਾਰ ਸਿੰਚਾਈ ਕਰੋ।",
    sugarcaneBestTime:
      "ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਸਿੰਚਾਈ ਕਰਨ ਨਾਲ ਬਾਫ਼ ਬਣਨ ਦਾ ਨੁਕਸਾਨ ਘਟਦਾ ਹੈ।",
    sugarcaneWarning:
      "ਜ਼ਿਆਦਾ ਪਾਣੀ ਖੜ੍ਹਾ ਨਾ ਹੋਣ ਦਿਓ ਅਤੇ ਵਧੀਆ ਨਿਕਾਸ ਰੱਖੋ।",

    potatoWater:
      "ਆਲੂ ਦੇ ਚੰਗੇ ਵਿਕਾਸ ਲਈ ਮਿੱਟੀ ਵਿੱਚ ਲਗਾਤਾਰ ਨਮੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।",
    potatoFrequency:
      "ਮਿੱਟੀ ਦੀ ਨਮੀ ਜਾਂਚੋ ਅਤੇ ਲੋੜ ਅਨੁਸਾਰ ਸਿੰਚਾਈ ਕਰੋ।",
    potatoBestTime:
      "ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਵਧੀਆ ਸਮਾਂ ਹੈ।",
    potatoWarning:
      "ਜ਼ਿਆਦਾ ਸਿੰਚਾਈ ਅਤੇ ਪਾਣੀ ਖੜ੍ਹਾ ਹੋਣ ਤੋਂ ਬਚੋ।",

    generalWater:
      "ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਫਸਲ, ਮਿੱਟੀ, ਮੌਸਮ ਅਤੇ ਫਸਲ ਦੀ ਅਵਸਥਾ 'ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।",
    generalFrequency:
      "ਨਿਸ਼ਚਿਤ ਸਮੇਂ ਦੀ ਬਜਾਏ ਸਿੰਚਾਈ ਤੋਂ ਪਹਿਲਾਂ ਮਿੱਟੀ ਦੀ ਨਮੀ ਜਾਂਚੋ।",
    generalBestTime:
      "ਪਾਣੀ ਦਾ ਨੁਕਸਾਨ ਘਟਾਉਣ ਲਈ ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਸਿੰਚਾਈ ਕਰੋ।",
    generalWarning:
      "ਜ਼ਿਆਦਾ ਪਾਣੀ ਦੇਣ ਤੋਂ ਬਚੋ ਕਿਉਂਕਿ ਵੱਧ ਨਮੀ ਜੜ੍ਹਾਂ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾ ਸਕਦੀ ਹੈ।",
  },

  or: {
    title: "ଜଳସେଚନ",
    loading: "ଜଳସେଚନ ସୂଚନା ଲୋଡ୍ ହେଉଛି...",
    loadingDesc: "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ...",
    cropNotFound: "ଫସଲ ମିଳିଲା ନାହିଁ",
    backToCrops: "ଫସଲକୁ ଫେରନ୍ତୁ",
    backTo: "ପଛକୁ ଯାଆନ୍ତୁ",
    season: "ଋତୁ",
    landArea: "ଜମି କ୍ଷେତ୍ର",
    irrigation: "ଜଳସେଚନ",
    recommendation: "ଜଳସେଚନ ପରାମର୍ଶ",
    whenToIrrigate: "କେବେ ଜଳସେଚନ କରିବେ",
    bestTime: "ଭଲ ସମୟ",
    avoidOverwatering: "ଅଧିକ ପାଣି ଦେବାରୁ ବଞ୍ଚନ୍ତୁ",
    waterManagement: "ଜଳ ପରିଚାଳନା ସୁପାରିଶ",
    checkSoil: "ମାଟିର ଆର୍ଦ୍ରତା ଯାଞ୍ଚ କରନ୍ତୁ",
    checkSoilDesc:
      "ଜଳସେଚନ ପୂର୍ବରୁ ମାଟିର ଆର୍ଦ୍ରତା ଯାଞ୍ଚ କରନ୍ତୁ। ପର୍ଯ୍ୟାପ୍ତ ଆର୍ଦ୍ରତା ଥିଲେ ଅନାବଶ୍ୟକ ପାଣି ଦିଅନ୍ତୁ ନାହିଁ।",
    checkRainfall: "ବର୍ଷା ଯାଞ୍ଚ କରନ୍ତୁ",
    checkRainfallDesc:
      "ବର୍ଷା ହେବାର ସମ୍ଭାବନା ଥିଲେ ପାଣି ବଞ୍ଚାଇବା ପାଇଁ ଜଳସେଚନ କମାନ୍ତୁ କିମ୍ବା ବିଳମ୍ବ କରନ୍ତୁ।",
    avoidWastage: "ପାଣି ଅପଚୟ ରୋକନ୍ତୁ",
    avoidWastageDesc:
      "ସମ୍ଭବ ହେଲେ ଦକ୍ଷ ଜଳସେଚନ ପ୍ରଣାଳୀ ବ୍ୟବହାର କରନ୍ତୁ।",
    cropStage: "ଫସଲର ଅବସ୍ଥା ବିଚାର କରନ୍ତୁ",
    cropStageDesc:
      "ଫସଲ ବଢ଼ିବା ସହିତ ପାଣିର ଆବଶ୍ୟକତା ବଦଳିପାରେ। ଫସଲର ଅବସ୍ଥା ଅନୁସାରେ ଜଳସେଚନ କରନ୍ତୁ।",
    cropDetails: "ଫସଲ ବିବରଣୀ",
    crop: "ଫସଲ",
    acres: "ଏକର",

    wheatWater:
      "ଗହମକୁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ବୃଦ୍ଧି ଅବସ୍ଥାରେ ସାବଧାନତାର ସହ ଜଳସେଚନ ଆବଶ୍ୟକ।",
    wheatFrequency:
      "ମାଟିର ଆର୍ଦ୍ରତା ନିୟମିତ ଯାଞ୍ଚ କରନ୍ତୁ।",
    wheatBestTime:
      "ସକାଳ କିମ୍ବା ସନ୍ଧ୍ୟା ଜଳସେଚନ ପାଇଁ ଭଲ ସମୟ।",
    wheatWarning:
      "ଅଧିକ ପାଣି ଗହମର ମୂଳକୁ କ୍ଷତି କରିପାରେ।",

    riceWater:
      "ଧାନକୁ ଅନ୍ୟାନ୍ୟ ଫସଲ ତୁଳନାରେ ଅଧିକ ପାଣି ଆବଶ୍ୟକ।",
    riceFrequency:
      "ଫସଲର ଅବସ୍ଥା ଅନୁସାରେ ଉପଯୁକ୍ତ ଆର୍ଦ୍ରତା ରଖନ୍ତୁ।",
    riceBestTime:
      "ସକାଳ କିମ୍ବା ସନ୍ଧ୍ୟା ଜଳସେଚନ କଲେ ପାଣି ଅପଚୟ କମିପାରେ।",
    riceWarning:
      "ଅନାବଶ୍ୟକ ଭାବେ ଜମିରେ ସବୁବେଳେ ପାଣି ଜମାଇ ରଖନ୍ତୁ ନାହିଁ।",

    maizeWater:
      "ମକାକୁ ପର୍ଯ୍ୟାପ୍ତ ମାଟି ଆର୍ଦ୍ରତା ଆବଶ୍ୟକ।",
    maizeFrequency:
      "ମାଟି ଶୁଖିବା ଆରମ୍ଭ କଲେ ଜଳସେଚନ କରନ୍ତୁ।",
    maizeBestTime:
      "ସକାଳ କିମ୍ବା ସନ୍ଧ୍ୟା ଉପଯୁକ୍ତ ସମୟ।",
    maizeWarning:
      "ଜମିରେ ପାଣି ଜମିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ।",

    sugarcaneWater:
      "ଆଖୁକୁ ଅଧିକ ପାଣି ଆବଶ୍ୟକ ଏବଂ ନିୟମିତ ଆର୍ଦ୍ରତା ଦରକାର।",
    sugarcaneFrequency:
      "ମାଟି, ପାଣିପାଗ ଏବଂ ଫସଲର ଅବସ୍ଥା ଅନୁସାରେ ଜଳସେଚନ କରନ୍ତୁ।",
    sugarcaneBestTime:
      "ସକାଳ କିମ୍ବା ସନ୍ଧ୍ୟା ଜଳସେଚନ କଲେ ବାଷ୍ପୀଭବନ କମେ।",
    sugarcaneWarning:
      "ଅଧିକ ପାଣି ଜମା ହେବାକୁ ଦିଅନ୍ତୁ ନାହିଁ।",

    potatoWater:
      "ଆଳୁର ଭଲ ବୃଦ୍ଧି ପାଇଁ ମାଟିରେ ନିୟମିତ ଆର୍ଦ୍ରତା ଆବଶ୍ୟକ।",
    potatoFrequency:
      "ମାଟିର ଆର୍ଦ୍ରତା ଯାଞ୍ଚ କରି ଆବଶ୍ୟକତା ଅନୁସାରେ ଜଳସେଚନ କରନ୍ତୁ।",
    potatoBestTime:
      "ସକାଳ କିମ୍ବା ସନ୍ଧ୍ୟା ଭଲ ସମୟ।",
    potatoWarning:
      "ଅଧିକ ଜଳସେଚନ ଏବଂ ପାଣି ଜମିବାକୁ ଏଡ଼ାନ୍ତୁ।",

    generalWater:
      "ଜଳସେଚନର ଆବଶ୍ୟକତା ଫସଲ, ମାଟି, ପାଣିପାଗ ଏବଂ ଫସଲର ଅବସ୍ଥା ଉପରେ ନିର୍ଭର କରେ।",
    generalFrequency:
      "ନିର୍ଦ୍ଧିଷ୍ଟ ସମୟ ଅନୁସାରେ ନୁହେଁ, ଜଳସେଚନ ପୂର୍ବରୁ ମାଟିର ଆର୍ଦ୍ରତା ଯାଞ୍ଚ କରନ୍ତୁ।",
    generalBestTime:
      "ପାଣି ଅପଚୟ କମାଇବା ପାଇଁ ସକାଳ କିମ୍ବା ସନ୍ଧ୍ୟା ଜଳସେଚନ କରନ୍ତୁ।",
    generalWarning:
      "ଅଧିକ ପାଣି ଦେବାରୁ ବଞ୍ଚନ୍ତୁ। ଅଧିକ ଆର୍ଦ୍ରତା ମୂଳକୁ କ୍ଷତି କରିପାରେ।",
  },

  as: {
    title: "জলসিঞ্চন",
    loading: "জলসিঞ্চনৰ তথ্য লোড হৈ আছে...",
    loadingDesc: "অনুগ্ৰহ কৰি অপেক্ষা কৰক...",
    cropNotFound: "শস্য পোৱা নগ'ল",
    backToCrops: "শস্যলৈ উভতি যাওক",
    backTo: "উভতি যাওক",
    season: "ঋতু",
    landArea: "মাটিৰ পৰিমাণ",
    irrigation: "জলসিঞ্চন",
    recommendation: "জলসিঞ্চনৰ পৰামৰ্শ",
    whenToIrrigate: "কেতিয়া জলসিঞ্চন কৰিব",
    bestTime: "উপযুক্ত সময়",
    avoidOverwatering: "অতিৰিক্ত পানী দিয়া এৰাই চলক",
    waterManagement: "পানী ব্যৱস্থাপনা পৰামৰ্শ",
    checkSoil: "মাটিৰ আৰ্দ্ৰতা পৰীক্ষা কৰক",
    checkSoilDesc:
      "জলসিঞ্চনৰ আগতে মাটিৰ আৰ্দ্ৰতা পৰীক্ষা কৰক। যথেষ্ট আৰ্দ্ৰতা থাকিলে অপ্ৰয়োজনীয় পানী নিদিব।",
    checkRainfall: "বৰষুণ পৰীক্ষা কৰক",
    checkRainfallDesc:
      "বৰষুণৰ সম্ভাৱনা থাকিলে পানী সংৰক্ষণৰ বাবে জলসিঞ্চন কমাওক বা পিছুৱাই দিয়ক।",
    avoidWastage: "পানীৰ অপচয় ৰোধ কৰক",
    avoidWastageDesc:
      "সম্ভৱ হ'লে দক্ষ জলসিঞ্চন পদ্ধতি ব্যৱহাৰ কৰক।",
    cropStage: "শস্যৰ অৱস্থা বিবেচনা কৰক",
    cropStageDesc:
      "শস্য বৃদ্ধি হোৱাৰ লগে লগে পানীৰ প্ৰয়োজন সলনি হ'ব পাৰে। শস্যৰ অৱস্থা অনুসৰি জলসিঞ্চন কৰক।",
    cropDetails: "শস্যৰ বিৱৰণ",
    crop: "শস্য",
    acres: "একৰ",

    wheatWater:
      "ঘেঁহুক গুৰুত্বপূৰ্ণ বৃদ্ধিৰ সময়ত সাৱধানতাৰে জলসিঞ্চনৰ প্ৰয়োজন।",
    wheatFrequency:
      "মাটিৰ আৰ্দ্ৰতা নিয়মিতভাৱে পৰীক্ষা কৰক।",
    wheatBestTime:
      "পুৱা বা সন্ধিয়া জলসিঞ্চনৰ বাবে ভাল সময়।",
    wheatWarning:
      "অতিৰিক্ত পানীয়ে ঘেঁহুৰ শিপাৰ ক্ষতি কৰিব পাৰে।",

    riceWater:
      "ধানক আন বহুতো শস্যতকৈ অধিক পানীৰ প্ৰয়োজন হয়।",
    riceFrequency:
      "শস্যৰ অৱস্থা অনুসৰি উপযুক্ত আৰ্দ্ৰতা বজাই ৰাখক।",
    riceBestTime:
      "পুৱা বা সন্ধিয়া জলসিঞ্চন কৰিলে পানীৰ অপচয় কমিব পাৰে।",
    riceWarning:
      "অপ্ৰয়োজনীয়ভাৱে পথাৰত সদায় পানী জমা কৰি নাৰাখিব।",

    maizeWater:
      "মাকৈক পৰ্যাপ্ত মাটিৰ আৰ্দ্ৰতা প্ৰয়োজন।",
    maizeFrequency:
      "মাটি শুকাবলৈ আৰম্ভ কৰিলে জলসিঞ্চন কৰক।",
    maizeBestTime:
      "পুৱা বা সন্ধিয়া উপযুক্ত সময়।",
    maizeWarning:
      "পানী জমা হ'বলৈ নিদিব।",

    sugarcaneWater:
      "কুঁহিয়াৰক অধিক পানীৰ প্ৰয়োজন আৰু নিয়মিত আৰ্দ্ৰতা আৱশ্যক।",
    sugarcaneFrequency:
      "মাটি, বতৰ আৰু শস্যৰ অৱস্থা অনুসৰি জলসিঞ্চন কৰক।",
    sugarcaneBestTime:
      "পুৱা বা সন্ধিয়া জলসিঞ্চন কৰিলে বাষ্পীভৱন কমে।",
    sugarcaneWarning:
      "অতিৰিক্ত পানী জমা হ'বলৈ নিদিব।",

    potatoWater:
      "আলুৰ ভাল বৃদ্ধিৰ বাবে মাটিত নিয়মিত আৰ্দ্ৰতা প্ৰয়োজন।",
    potatoFrequency:
      "মাটিৰ আৰ্দ্ৰতা পৰীক্ষা কৰি প্ৰয়োজন অনুসৰি জলসিঞ্চন কৰক।",
    potatoBestTime:
      "পুৱা বা সন্ধিয়া ভাল সময়।",
    potatoWarning:
      "অতিৰিক্ত জলসিঞ্চন আৰু পানী জমা হোৱা এৰাই চলক।",

    generalWater:
      "জলসিঞ্চনৰ প্ৰয়োজন শস্য, মাটি, বতৰ আৰু শস্যৰ অৱস্থাৰ ওপৰত নিৰ্ভৰ কৰে।",
    generalFrequency:
      "নিৰ্দিষ্ট সময়সূচীৰ পৰিৱৰ্তে জলসিঞ্চনৰ আগতে মাটিৰ আৰ্দ্ৰতা পৰীক্ষা কৰক।",
    generalBestTime:
      "পানীৰ অপচয় কমাবলৈ পুৱা বা সন্ধিয়া জলসিঞ্চন কৰক।",
    generalWarning:
      "অতিৰিক্ত পানী দিয়াৰ পৰা বিৰত থাকক।",
  },

  ur: {
    title: "آبپاشی",
    loading: "آبپاشی کی معلومات لوڈ ہو رہی ہیں...",
    loadingDesc: "براہ کرم انتظار کریں...",
    cropNotFound: "فصل نہیں ملی",
    backToCrops: "فصلوں پر واپس جائیں",
    backTo: "واپس جائیں",
    season: "موسم",
    landArea: "زمین کا رقبہ",
    irrigation: "آبپاشی",
    recommendation: "آبپاشی کا مشورہ",
    whenToIrrigate: "آبپاشی کب کریں",
    bestTime: "بہترین وقت",
    avoidOverwatering: "زیادہ پانی دینے سے بچیں",
    waterManagement: "پانی کے انتظام کی تجاویز",
    checkSoil: "مٹی کی نمی چیک کریں",
    checkSoilDesc:
      "آبپاشی سے پہلے مٹی کی نمی چیک کریں۔ اگر کافی نمی موجود ہو تو غیر ضروری پانی دینے سے گریز کریں۔",
    checkRainfall: "بارش چیک کریں",
    checkRainfallDesc:
      "اگر بارش متوقع ہو تو پانی بچانے کے لیے آبپاشی کم یا مؤخر کرنے پر غور کریں۔",
    avoidWastage: "پانی کا ضیاع روکیں",
    avoidWastageDesc:
      "جہاں ممکن ہو مؤثر آبپاشی کے طریقے استعمال کریں۔",
    cropStage: "فصل کی حالت دیکھیں",
    cropStageDesc:
      "فصل کے بڑھنے کے ساتھ پانی کی ضرورت بدل سکتی ہے۔ فصل کی حالت کے مطابق آبپاشی کریں۔",
    cropDetails: "فصل کی تفصیلات",
    crop: "فصل",
    acres: "ایکڑ",

    wheatWater:
      "گندم کو اہم نشوونما کے مراحل میں محتاط آبپاشی کی ضرورت ہوتی ہے۔",
    wheatFrequency:
      "مٹی کی نمی باقاعدگی سے چیک کریں اور غیر ضروری آبپاشی سے بچیں۔",
    wheatBestTime:
      "صبح یا شام آبپاشی کے لیے بہتر وقت ہے۔",
    wheatWarning:
      "زیادہ پانی گندم کی جڑوں کو نقصان پہنچا سکتا ہے۔",

    riceWater:
      "چاول کو کئی دوسری فصلوں کے مقابلے میں زیادہ پانی کی ضرورت ہوتی ہے۔",
    riceFrequency:
      "فصل کی حالت کے مطابق مناسب نمی برقرار رکھیں۔",
    riceBestTime:
      "صبح یا شام آبپاشی کرنے سے پانی کا نقصان کم ہو سکتا ہے۔",
    riceWarning:
      "غیر ضروری طور پر کھیت میں مسلسل پانی کھڑا نہ رکھیں۔",

    maizeWater:
      "مکئی کو مناسب مٹی کی نمی کی ضرورت ہوتی ہے۔",
    maizeFrequency:
      "مٹی خشک ہونے لگے تو آبپاشی کریں۔",
    maizeBestTime:
      "صبح یا شام مناسب وقت ہے۔",
    maizeWarning:
      "پانی کھڑا ہونے سے بچیں۔",

    sugarcaneWater:
      "گنے کو زیادہ پانی کی ضرورت ہوتی ہے اور باقاعدہ نمی ضروری ہے۔",
    sugarcaneFrequency:
      "مٹی، موسم اور فصل کی حالت کے مطابق آبپاشی کریں۔",
    sugarcaneBestTime:
      "صبح یا شام آبپاشی کرنے سے بخارات کا نقصان کم ہوتا ہے۔",
    sugarcaneWarning:
      "زیادہ پانی کھڑا نہ ہونے دیں اور مناسب نکاسی آب رکھیں۔",

    potatoWater:
      "آلو کی اچھی نشوونما کے لیے مٹی میں مسلسل نمی ضروری ہے۔",
    potatoFrequency:
      "مٹی کی نمی چیک کریں اور ضرورت کے مطابق آبپاشی کریں۔",
    potatoBestTime:
      "صبح یا شام بہتر وقت ہے۔",
    potatoWarning:
      "زیادہ آبپاشی اور پانی کھڑا ہونے سے بچیں۔",

    generalWater:
      "آبپاشی کی ضرورت فصل، مٹی، موسم اور فصل کی حالت پر منحصر ہوتی ہے۔",
    generalFrequency:
      "مقررہ شیڈول کے بجائے آبپاشی سے پہلے مٹی کی نمی چیک کریں۔",
    generalBestTime:
      "پانی کے نقصان کو کم کرنے کے لیے صبح یا شام آبپاشی کریں۔",
    generalWarning:
      "زیادہ پانی دینے سے بچیں کیونکہ زیادہ نمی جڑوں کو نقصان پہنچا سکتی ہے۔",
  },
};

export default function IrrigationPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] = useState<LanguageCode>("en");
  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (
      savedLanguage &&
      Object.prototype.hasOwnProperty.call(translations, savedLanguage)
    ) {
      setLanguage(savedLanguage as LanguageCode);
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

  const t = translations[language];

  const getCropAdvice = (cropName: string): IrrigationAdvice => {
    const name = cropName.toLowerCase();

    if (name.includes("wheat") || name.includes("गेहूं")) {
      return {
        water: t.wheatWater,
        frequency: t.wheatFrequency,
        bestTime: t.wheatBestTime,
        warning: t.wheatWarning,
      };
    }

    if (
      name.includes("rice") ||
      name.includes("paddy") ||
      name.includes("धान")
    ) {
      return {
        water: t.riceWater,
        frequency: t.riceFrequency,
        bestTime: t.riceBestTime,
        warning: t.riceWarning,
      };
    }

    if (
      name.includes("maize") ||
      name.includes("corn") ||
      name.includes("मक्का")
    ) {
      return {
        water: t.maizeWater,
        frequency: t.maizeFrequency,
        bestTime: t.maizeBestTime,
        warning: t.maizeWarning,
      };
    }

    if (
      name.includes("sugarcane") ||
      name.includes("ganna") ||
      name.includes("गन्ना")
    ) {
      return {
        water: t.sugarcaneWater,
        frequency: t.sugarcaneFrequency,
        bestTime: t.sugarcaneBestTime,
        warning: t.sugarcaneWarning,
      };
    }

    if (
      name.includes("potato") ||
      name.includes("aloo") ||
      name.includes("आलू")
    ) {
      return {
        water: t.potatoWater,
        frequency: t.potatoFrequency,
        bestTime: t.potatoBestTime,
        warning: t.potatoWarning,
      };
    }

    return {
      water: t.generalWater,
      frequency: t.generalFrequency,
      bestTime: t.generalBestTime,
      warning: t.generalWarning,
    };
  };

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">💧</div>

          <h1 className="text-2xl font-bold text-green-800">
            {t.loading}
          </h1>

          <p className="text-gray-500 mt-2">{t.loadingDesc}</p>
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
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
          >
            ← {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  const advice = getCropAdvice(crop.crop);

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => router.push(`/crops/${crop.id}`)}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.backTo} {crop.crop}
        </button>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-5xl">
              💧
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {crop.season} {t.season}
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop} {t.irrigation}
              </h1>

              <p className="text-gray-600 mt-2">
                {t.landArea}:{" "}
                <span className="font-semibold">
                  {crop.land} {t.acres}
                </span>
              </p>
            </div>

          </div>
        </div>

        {/* Main Recommendation */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            💧 {t.recommendation}
          </h2>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {advice.water}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

            {/* Frequency */}
            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">📅</div>

              <h3 className="text-lg font-bold text-green-800">
                {t.whenToIrrigate}
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {advice.frequency}
              </p>
            </div>

            {/* Best Time */}
            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">🌅</div>

              <h3 className="text-lg font-bold text-green-800">
                {t.bestTime}
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {advice.bestTime}
              </p>
            </div>

          </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7 mb-8">

          <div className="flex gap-4">

            <div className="text-4xl">⚠️</div>

            <div>
              <h2 className="text-xl font-bold text-yellow-800">
                {t.avoidOverwatering}
              </h2>

              <p className="text-yellow-900 mt-2 leading-relaxed">
                {advice.warning}
              </p>
            </div>

          </div>
        </div>

        {/* Practical Tips */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            🌱 {t.waterManagement}
          </h2>

          <div className="space-y-4 mt-6">

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">
              <div className="text-3xl">👆</div>

              <div>
                <h3 className="font-bold text-green-800">
                  {t.checkSoil}
                </h3>

                <p className="text-gray-600 mt-1">
                  {t.checkSoilDesc}
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">
              <div className="text-3xl">🌧️</div>

              <div>
                <h3 className="font-bold text-green-800">
                  {t.checkRainfall}
                </h3>

                <p className="text-gray-600 mt-1">
                  {t.checkRainfallDesc}
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">
              <div className="text-3xl">💦</div>

              <div>
                <h3 className="font-bold text-green-800">
                  {t.avoidWastage}
                </h3>

                <p className="text-gray-600 mt-1">
                  {t.avoidWastageDesc}
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">
              <div className="text-3xl">🌾</div>

              <div>
                <h3 className="font-bold text-green-800">
                  {t.cropStage}
                </h3>

                <p className="text-gray-600 mt-1">
                  {t.cropStageDesc}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Crop Details */}
        <div className="bg-white rounded-3xl shadow-lg p-7">

          <h2 className="text-2xl font-bold text-green-800 mb-5">
            🌾 {t.cropDetails}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                {t.crop}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {crop.crop}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                {t.season}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {crop.season}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                {t.landArea}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {crop.land} {t.acres}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}