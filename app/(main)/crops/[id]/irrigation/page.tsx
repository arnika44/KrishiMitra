"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "../../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../../lib/language";

/* =========================================================
   TYPES
========================================================= */

type Crop = {
  id: number | string;
  crop: string;
  season: string;
  land: number | string;
};

type IrrigationAdvice = {
  water: string;
  frequency: string;
  bestTime: string;
  warning: string;
};

type Translation = {
  title: string;
  loading: string;
  loadingDesc: string;
  cropNotFound: string;
  backToCrops: string;
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

  genericWater: string;
  genericFrequency: string;
  genericBestTime: string;
  genericWarning: string;
};

const translations: Record<LanguageCode, Translation> = {
  en: {
    title: "Irrigation",
    loading: "Loading irrigation information...",
    loadingDesc: "Please wait...",
    cropNotFound: "Crop not found",
    backToCrops: "Back to crops",
    season: "Season",
    landArea: "Land area",
    irrigation: "Irrigation",
    recommendation: "Irrigation Recommendation",
    whenToIrrigate: "When to Irrigate",
    bestTime: "Best Time",
    avoidOverwatering: "Avoid Overwatering",
    waterManagement: "Water Management Tips",

    checkSoil: "Check Soil Moisture",
    checkSoilDesc:
      "Check the soil moisture before irrigation. If the soil already has enough moisture, avoid unnecessary watering.",

    checkRainfall: "Check Rainfall",
    checkRainfallDesc:
      "If rain is expected, reduce or delay irrigation to avoid unnecessary water use.",

    avoidWastage: "Avoid Water Wastage",
    avoidWastageDesc:
      "Use efficient irrigation methods such as drip, sprinkler, furrow or other suitable methods where practical.",

    cropStage: "Consider Crop Stage",
    cropStageDesc:
      "Water requirements can change as the crop grows. Adjust irrigation according to the crop stage, soil and weather conditions.",

    cropDetails: "Crop Details",
    crop: "Crop",
    acres: "acres",

    genericWater:
      "Irrigation needs depend on the crop, soil type, weather, rainfall and crop growth stage. Maintain suitable soil moisture without keeping the field unnecessarily wet.",

    genericFrequency:
      "Do not depend only on a fixed schedule. Check soil moisture regularly and irrigate when the crop actually needs water.",

    genericBestTime:
      "Early morning or evening is generally a good time for irrigation because it can reduce water loss from evaporation.",

    genericWarning:
      "Avoid excessive irrigation and prolonged waterlogging. Too much moisture can reduce root health and may increase the risk of root diseases.",
  },

  hi: {
    title: "सिंचाई",
    loading: "सिंचाई की जानकारी लोड हो रही है...",
    loadingDesc: "कृपया प्रतीक्षा करें...",
    cropNotFound: "फसल नहीं मिली",
    backToCrops: "फसलों पर वापस जाएं",
    season: "मौसम",
    landArea: "भूमि क्षेत्र",
    irrigation: "सिंचाई",
    recommendation: "सिंचाई की सलाह",
    whenToIrrigate: "सिंचाई कब करें",
    bestTime: "सबसे अच्छा समय",
    avoidOverwatering: "अधिक पानी देने से बचें",
    waterManagement: "जल प्रबंधन सुझाव",

    checkSoil: "मिट्टी की नमी जांचें",
    checkSoilDesc:
      "सिंचाई से पहले मिट्टी की नमी जांचें। यदि मिट्टी में पर्याप्त नमी है तो अनावश्यक पानी न दें।",

    checkRainfall: "बारिश की जांच करें",
    checkRainfallDesc:
      "यदि बारिश की संभावना है तो पानी बचाने के लिए सिंचाई कम करें या कुछ समय के लिए रोक दें।",

    avoidWastage: "पानी की बर्बादी रोकें",
    avoidWastageDesc:
      "जहां संभव हो, ड्रिप, स्प्रिंकलर, फरो या अन्य उपयुक्त सिंचाई विधियों का उपयोग करें।",

    cropStage: "फसल की अवस्था देखें",
    cropStageDesc:
      "फसल की वृद्धि के साथ पानी की आवश्यकता बदल सकती है। फसल की अवस्था, मिट्टी और मौसम के अनुसार सिंचाई करें।",

    cropDetails: "फसल की जानकारी",
    crop: "फसल",
    acres: "एकड़",

    genericWater:
      "सिंचाई की आवश्यकता फसल, मिट्टी, मौसम, बारिश और फसल की अवस्था पर निर्भर करती है। मिट्टी में उचित नमी बनाए रखें और खेत को अनावश्यक रूप से गीला न रखें।",

    genericFrequency:
      "केवल निश्चित समय-सारणी पर निर्भर न रहें। मिट्टी की नमी नियमित रूप से जांचें और जरूरत होने पर ही सिंचाई करें।",

    genericBestTime:
      "सुबह जल्दी या शाम को सिंचाई करना सामान्यतः अच्छा समय होता है क्योंकि इससे वाष्पीकरण से होने वाली पानी की हानि कम हो सकती है।",

    genericWarning:
      "अधिक सिंचाई और लंबे समय तक पानी जमा रहने से बचें। ज्यादा नमी जड़ों को नुकसान पहुंचा सकती है और जड़ संबंधी रोगों का खतरा बढ़ा सकती है।",
  },

  bn: {
    title: "সেচ",
    loading: "সেচের তথ্য লোড হচ্ছে...",
    loadingDesc: "অনুগ্রহ করে অপেক্ষা করুন...",
    cropNotFound: "ফসল পাওয়া যায়নি",
    backToCrops: "ফসলে ফিরে যান",
    season: "মৌসুম",
    landArea: "জমির পরিমাণ",
    irrigation: "সেচ",
    recommendation: "সেচের পরামর্শ",
    whenToIrrigate: "কখন সেচ দেবেন",
    bestTime: "সেরা সময়",
    avoidOverwatering: "অতিরিক্ত সেচ এড়িয়ে চলুন",
    waterManagement: "জল ব্যবস্থাপনার পরামর্শ",

    checkSoil: "মাটির আর্দ্রতা পরীক্ষা করুন",
    checkSoilDesc:
      "সেচ দেওয়ার আগে মাটির আর্দ্রতা পরীক্ষা করুন। মাটিতে পর্যাপ্ত আর্দ্রতা থাকলে অপ্রয়োজনীয় পানি দেবেন না।",

    checkRainfall: "বৃষ্টিপাত পরীক্ষা করুন",
    checkRainfallDesc:
      "বৃষ্টির সম্ভাবনা থাকলে অপ্রয়োজনীয় পানি ব্যবহার এড়াতে সেচ কমিয়ে দিন বা পিছিয়ে দিন।",

    avoidWastage: "পানির অপচয় এড়িয়ে চলুন",
    avoidWastageDesc:
      "সম্ভব হলে ড্রিপ, স্প্রিংকলার, ফারো বা অন্যান্য উপযুক্ত সেচ পদ্ধতি ব্যবহার করুন।",

    cropStage: "ফসলের পর্যায় বিবেচনা করুন",
    cropStageDesc:
      "ফসলের বৃদ্ধির সাথে পানির প্রয়োজন পরিবর্তিত হতে পারে। ফসলের পর্যায়, মাটি এবং আবহাওয়া অনুযায়ী সেচ সামঞ্জস্য করুন।",

    cropDetails: "ফসলের বিবরণ",
    crop: "ফসল",
    acres: "একর",

    genericWater:
      "সেচের প্রয়োজন ফসল, মাটির ধরন, আবহাওয়া, বৃষ্টিপাত এবং ফসলের বৃদ্ধির পর্যায়ের উপর নির্ভর করে। উপযুক্ত মাটির আর্দ্রতা বজায় রাখুন এবং জমি অপ্রয়োজনীয়ভাবে ভেজা রাখবেন না।",

    genericFrequency:
      "শুধু নির্দিষ্ট সময়সূচির উপর নির্ভর করবেন না। নিয়মিত মাটির আর্দ্রতা পরীক্ষা করুন এবং ফসলের প্রয়োজন অনুযায়ী সেচ দিন।",

    genericBestTime:
      "সকাল বা সন্ধ্যায় সেচ দেওয়া সাধারণত ভালো সময়, কারণ এতে বাষ্পীভবনের মাধ্যমে পানির ক্ষতি কমতে পারে।",

    genericWarning:
      "অতিরিক্ত সেচ এবং দীর্ঘ সময় জলাবদ্ধতা এড়িয়ে চলুন। অতিরিক্ত আর্দ্রতা শিকড়ের স্বাস্থ্য কমাতে পারে এবং শিকড়ের রোগের ঝুঁকি বাড়াতে পারে।",
  },

  mr: {
    title: "सिंचन",
    loading: "सिंचनाची माहिती लोड होत आहे...",
    loadingDesc: "कृपया प्रतीक्षा करा...",
    cropNotFound: "पीक सापडले नाही",
    backToCrops: "पिकांकडे परत जा",
    season: "हंगाम",
    landArea: "जमिनीचे क्षेत्र",
    irrigation: "सिंचन",
    recommendation: "सिंचनाचा सल्ला",
    whenToIrrigate: "सिंचन कधी करावे",
    bestTime: "योग्य वेळ",
    avoidOverwatering: "जास्त पाणी देणे टाळा",
    waterManagement: "पाणी व्यवस्थापनाच्या सूचना",

    checkSoil: "मातीतील ओलावा तपासा",
    checkSoilDesc:
      "सिंचन करण्यापूर्वी मातीतील ओलावा तपासा. मातीमध्ये पुरेसा ओलावा असल्यास अनावश्यक पाणी देऊ नका.",

    checkRainfall: "पावसाची शक्यता तपासा",
    checkRainfallDesc:
      "पावसाची शक्यता असल्यास अनावश्यक पाणी वापर टाळण्यासाठी सिंचन कमी करा किंवा पुढे ढकला.",

    avoidWastage: "पाण्याचा अपव्यय टाळा",
    avoidWastageDesc:
      "शक्य असल्यास ठिबक, तुषार, सरी किंवा इतर योग्य सिंचन पद्धती वापरा.",

    cropStage: "पिकाची अवस्था लक्षात घ्या",
    cropStageDesc:
      "पिकाच्या वाढीसोबत पाण्याची गरज बदलू शकते. पिकाची अवस्था, माती आणि हवामानानुसार सिंचन करा.",

    cropDetails: "पिकाची माहिती",
    crop: "पीक",
    acres: "एकर",

    genericWater:
      "सिंचनाची गरज पीक, मातीचा प्रकार, हवामान, पाऊस आणि पिकाच्या वाढीच्या अवस्थेवर अवलंबून असते. योग्य मातीतील ओलावा ठेवा आणि शेत अनावश्यकपणे ओले ठेवू नका.",

    genericFrequency:
      "फक्त ठराविक वेळापत्रकावर अवलंबून राहू नका. मातीतील ओलावा नियमित तपासा आणि पिकाला गरज असेल तेव्हाच सिंचन करा.",

    genericBestTime:
      "सकाळी लवकर किंवा संध्याकाळी सिंचन करणे सामान्यतः चांगले असते कारण बाष्पीभवनामुळे होणारी पाण्याची हानी कमी होऊ शकते.",

    genericWarning:
      "अति सिंचन आणि दीर्घकाळ पाणी साचणे टाळा. जास्त ओलाव्यामुळे मुळांचे आरोग्य कमी होऊ शकते आणि मुळांच्या रोगांचा धोका वाढू शकतो.",
  },

  ta: {
    title: "நீர்ப்பாசனம்",
    loading: "நீர்ப்பாசன தகவல்கள் ஏற்றப்படுகின்றன...",
    loadingDesc: "தயவுசெய்து காத்திருக்கவும்...",
    cropNotFound: "பயிர் கிடைக்கவில்லை",
    backToCrops: "பயிர்களுக்குத் திரும்பு",
    season: "பருவம்",
    landArea: "நிலப்பரப்பு",
    irrigation: "நீர்ப்பாசனம்",
    recommendation: "நீர்ப்பாசன பரிந்துரை",
    whenToIrrigate: "எப்போது நீர்ப்பாசனம் செய்ய வேண்டும்",
    bestTime: "சிறந்த நேரம்",
    avoidOverwatering: "அதிக நீர்ப்பாசனத்தைத் தவிர்க்கவும்",
    waterManagement: "நீர் மேலாண்மை குறிப்புகள்",

    checkSoil: "மண் ஈரப்பதத்தை சரிபார்க்கவும்",
    checkSoilDesc:
      "நீர்ப்பாசனத்திற்கு முன் மண் ஈரப்பதத்தை சரிபார்க்கவும். போதுமான ஈரப்பதம் இருந்தால் தேவையற்ற நீரை வழங்க வேண்டாம்.",

    checkRainfall: "மழையை சரிபார்க்கவும்",
    checkRainfallDesc:
      "மழை எதிர்பார்க்கப்பட்டால் தேவையற்ற நீர் பயன்பாட்டைத் தவிர்க்க நீர்ப்பாசனத்தை குறைக்கவும் அல்லது தாமதப்படுத்தவும்.",

    avoidWastage: "நீர் வீணாவதைத் தவிர்க்கவும்",
    avoidWastageDesc:
      "சாத்தியமான இடங்களில் சொட்டு, தெளிப்பு, வாய்க்கால் அல்லது பிற பொருத்தமான நீர்ப்பாசன முறைகளைப் பயன்படுத்தவும்.",

    cropStage: "பயிர் நிலையை கருத்தில் கொள்ளவும்",
    cropStageDesc:
      "பயிர் வளரும்போது நீர் தேவை மாறலாம். பயிர் நிலை, மண் மற்றும் வானிலை நிலைக்கு ஏற்ப நீர்ப்பாசனத்தை மாற்றவும்.",

    cropDetails: "பயிர் விவரங்கள்",
    crop: "பயிர்",
    acres: "ஏக்கர்",

    genericWater:
      "நீர்ப்பாசனத் தேவை பயிர், மண் வகை, வானிலை, மழைப்பொழிவு மற்றும் பயிரின் வளர்ச்சி நிலையைப் பொறுத்தது. பொருத்தமான மண் ஈரப்பதத்தை பராமரித்து, வயலை தேவையில்லாமல் ஈரமாக வைத்திருக்க வேண்டாம்.",

    genericFrequency:
      "நிலையான அட்டவணையை மட்டும் சார்ந்திருக்க வேண்டாம். மண் ஈரப்பதத்தை தொடர்ந்து சரிபார்த்து, பயிருக்கு உண்மையில் நீர் தேவைப்படும் போது நீர்ப்பாசனம் செய்யவும்.",

    genericBestTime:
      "அதிகாலை அல்லது மாலை பொதுவாக நீர்ப்பாசனத்திற்கு நல்ல நேரமாகும், ஏனெனில் ஆவியாதலால் ஏற்படும் நீர் இழப்பை குறைக்கலாம்.",

    genericWarning:
      "அதிகப்படியான நீர்ப்பாசனம் மற்றும் நீண்ட நேர நீர் தேக்கத்தைத் தவிர்க்கவும். அதிக ஈரப்பதம் வேர் ஆரோக்கியத்தை குறைத்து வேர் நோய்களின் அபாயத்தை அதிகரிக்கலாம்.",
  },

  te: {
    title: "నీటిపారుదల",
    loading: "నీటిపారుదల సమాచారం లోడ్ అవుతోంది...",
    loadingDesc: "దయచేసి వేచి ఉండండి...",
    cropNotFound: "పంట కనుగొనబడలేదు",
    backToCrops: "పంటలకు తిరిగి వెళ్లండి",
    season: "కాలం",
    landArea: "భూమి విస్తీర్ణం",
    irrigation: "నీటిపారుదల",
    recommendation: "నీటిపారుదల సిఫార్సు",
    whenToIrrigate: "ఎప్పుడు నీటిపారుదల చేయాలి",
    bestTime: "ఉత్తమ సమయం",
    avoidOverwatering: "అధిక నీటిపారుదల నివారించండి",
    waterManagement: "నీటి నిర్వహణ సూచనలు",

    checkSoil: "నేల తేమను తనిఖీ చేయండి",
    checkSoilDesc:
      "నీటిపారుదల ముందు నేల తేమను తనిఖీ చేయండి. నేలలో తగినంత తేమ ఉంటే అనవసరంగా నీరు ఇవ్వవద్దు.",

    checkRainfall: "వర్షపాతాన్ని తనిఖీ చేయండి",
    checkRainfallDesc:
      "వర్షం వచ్చే అవకాశం ఉంటే అనవసర నీటి వినియోగాన్ని నివారించడానికి నీటిపారుదలను తగ్గించండి లేదా ఆలస్యం చేయండి.",

    avoidWastage: "నీటి వృథాను నివారించండి",
    avoidWastageDesc:
      "సాధ్యమైన చోట డ్రిప్, స్ప్రింక్లర్, ఫరో లేదా ఇతర అనుకూల నీటిపారుదల పద్ధతులను ఉపయోగించండి.",

    cropStage: "పంట దశను పరిగణించండి",
    cropStageDesc:
      "పంట పెరుగుతున్నప్పుడు నీటి అవసరాలు మారవచ్చు. పంట దశ, నేల మరియు వాతావరణ పరిస్థితులకు అనుగుణంగా నీటిపారుదలను మార్చండి.",

    cropDetails: "పంట వివరాలు",
    crop: "పంట",
    acres: "ఎకరాలు",

    genericWater:
      "నీటిపారుదల అవసరం పంట, నేల రకం, వాతావరణం, వర్షపాతం మరియు పంట పెరుగుదల దశపై ఆధారపడి ఉంటుంది. తగిన నేల తేమను ఉంచి పొలాన్ని అనవసరంగా తడిగా ఉంచవద్దు.",

    genericFrequency:
      "స్థిరమైన షెడ్యూల్‌పై మాత్రమే ఆధారపడవద్దు. నేల తేమను క్రమం తప్పకుండా తనిఖీ చేసి పంటకు నిజంగా నీరు అవసరమైనప్పుడు నీటిపారుదల చేయండి.",

    genericBestTime:
      "ఉదయం లేదా సాయంత్రం నీటిపారుదల చేయడం సాధారణంగా మంచిది, ఎందుకంటే ఆవిరీభవనం వల్ల నీటి నష్టాన్ని తగ్గించవచ్చు.",

    genericWarning:
      "అధిక నీటిపారుదల మరియు ఎక్కువసేపు నీరు నిల్వ ఉండటాన్ని నివారించండి. అధిక తేమ వేర్ల ఆరోగ్యాన్ని తగ్గించి వేరు సంబంధిత వ్యాధుల ప్రమాదాన్ని పెంచవచ్చు.",
  },

  gu: {
    title: "સિંચાઈ",
    loading: "સિંચાઈની માહિતી લોડ થઈ રહી છે...",
    loadingDesc: "કૃપા કરીને રાહ જુઓ...",
    cropNotFound: "પાક મળ્યો નથી",
    backToCrops: "પાક પર પાછા જાઓ",
    season: "મોસમ",
    landArea: "જમીનનું ક્ષેત્રફળ",
    irrigation: "સિંચાઈ",
    recommendation: "સિંચાઈની ભલામણ",
    whenToIrrigate: "સિંચાઈ ક્યારે કરવી",
    bestTime: "શ્રેષ્ઠ સમય",
    avoidOverwatering: "વધુ પાણી આપવાનું ટાળો",
    waterManagement: "પાણી વ્યવસ્થાપન સૂચનો",

    checkSoil: "માટીની ભેજ તપાસો",
    checkSoilDesc:
      "સિંચાઈ પહેલાં માટીની ભેજ તપાસો. જો માટીમાં પૂરતી ભેજ હોય તો બિનજરૂરી પાણી ન આપો.",

    checkRainfall: "વરસાદ તપાસો",
    checkRainfallDesc:
      "જો વરસાદની શક્યતા હોય તો બિનજરૂરી પાણીનો ઉપયોગ ટાળવા સિંચાઈ ઘટાડો અથવા મોડું કરો.",

    avoidWastage: "પાણીનો બગાડ ટાળો",
    avoidWastageDesc:
      "શક્ય હોય ત્યાં ડ્રિપ, સ્પ્રિંકલર, ફરો અથવા અન્ય યોગ્ય સિંચાઈ પદ્ધતિઓનો ઉપયોગ કરો.",

    cropStage: "પાકની અવસ્થા ધ્યાનમાં લો",
    cropStageDesc:
      "પાક વધે તેમ પાણીની જરૂરિયાત બદલાઈ શકે છે. પાકની અવસ્થા, માટી અને હવામાન અનુસાર સિંચાઈ ગોઠવો.",

    cropDetails: "પાકની વિગતો",
    crop: "પાક",
    acres: "એકર",

    genericWater:
      "સિંચાઈની જરૂરિયાત પાક, માટીનો પ્રકાર, હવામાન, વરસાદ અને પાકની વૃદ્ધિની અવસ્થા પર આધાર રાખે છે. યોગ્ય માટીની ભેજ જાળવો અને ખેતરને બિનજરૂરી રીતે ભીનું ન રાખો.",

    genericFrequency:
      "માત્ર નિશ્ચિત સમયપત્રક પર આધાર રાખશો નહીં. માટીની ભેજ નિયમિત તપાસો અને પાકને ખરેખર પાણીની જરૂર હોય ત્યારે જ સિંચાઈ કરો.",

    genericBestTime:
      "સવારે વહેલા અથવા સાંજે સિંચાઈ કરવી સામાન્ય રીતે સારો સમય છે કારણ કે તે બાષ્પીભવનથી થતું પાણીનું નુકસાન ઘટાડી શકે છે.",

    genericWarning:
      "વધુ પડતી સિંચાઈ અને લાંબા સમય સુધી પાણી ભરાવાથી બચો. વધારે ભેજ મૂળના સ્વાસ્થ્યને ઘટાડી શકે છે અને મૂળના રોગોનું જોખમ વધારી શકે છે.",
  },

  kn: {
    title: "ನೀರಾವರಿ",
    loading: "ನೀರಾವರಿ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    loadingDesc: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ...",
    cropNotFound: "ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ",
    backToCrops: "ಬೆಳೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    season: "ಋತು",
    landArea: "ಭೂಮಿ ವಿಸ್ತೀರ್ಣ",
    irrigation: "ನೀರಾವರಿ",
    recommendation: "ನೀರಾವರಿ ಶಿಫಾರಸು",
    whenToIrrigate: "ಯಾವಾಗ ನೀರಾವರಿ ಮಾಡಬೇಕು",
    bestTime: "ಉತ್ತಮ ಸಮಯ",
    avoidOverwatering: "ಅತಿಯಾದ ನೀರಾವರಿ ತಪ್ಪಿಸಿ",
    waterManagement: "ನೀರಿನ ನಿರ್ವಹಣಾ ಸಲಹೆಗಳು",

    checkSoil: "ಮಣ್ಣಿನ ತೇವಾಂಶ ಪರಿಶೀಲಿಸಿ",
    checkSoilDesc:
      "ನೀರಾವರಿ ಮಾಡುವ ಮೊದಲು ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಿ. ಸಾಕಷ್ಟು ತೇವಾಂಶವಿದ್ದರೆ ಅನಗತ್ಯವಾಗಿ ನೀರು ಹಾಕಬೇಡಿ.",

    checkRainfall: "ಮಳೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    checkRainfallDesc:
      "ಮಳೆಯ ನಿರೀಕ್ಷೆಯಿದ್ದರೆ ಅನಗತ್ಯ ನೀರಿನ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಲು ನೀರಾವರಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ ಅಥವಾ ಮುಂದೂಡಿ.",

    avoidWastage: "ನೀರಿನ ವ್ಯರ್ಥತೆಯನ್ನು ತಪ್ಪಿಸಿ",
    avoidWastageDesc:
      "ಸಾಧ್ಯವಾದಲ್ಲಿ ಡ್ರಿಪ್, ಸ್ಪ್ರಿಂಕ್ಲರ್, ಫರೋ ಅಥವಾ ಇತರ ಸೂಕ್ತ ನೀರಾವರಿ ವಿಧಾನಗಳನ್ನು ಬಳಸಿ.",

    cropStage: "ಬೆಳೆಯ ಹಂತವನ್ನು ಪರಿಗಣಿಸಿ",
    cropStageDesc:
      "ಬೆಳೆ ಬೆಳೆಯುವಾಗ ನೀರಿನ ಅಗತ್ಯ ಬದಲಾಗಬಹುದು. ಬೆಳೆಯ ಹಂತ, ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನೀರಾವರಿ ಮಾಡಿ.",

    cropDetails: "ಬೆಳೆ ವಿವರಗಳು",
    crop: "ಬೆಳೆ",
    acres: "ಎಕರೆ",

    genericWater:
      "ನೀರಾವರಿ ಅಗತ್ಯವು ಬೆಳೆ, ಮಣ್ಣಿನ ಪ್ರಕಾರ, ಹವಾಮಾನ, ಮಳೆ ಮತ್ತು ಬೆಳೆಯ ಬೆಳವಣಿಗೆಯ ಹಂತವನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ. ಸೂಕ್ತ ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಿ ಮತ್ತು ಹೊಲವನ್ನು ಅನಗತ್ಯವಾಗಿ ಒದ್ದೆಯಾಗಿಡಬೇಡಿ.",

    genericFrequency:
      "ನಿಗದಿತ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಮಾತ್ರ ಅವಲಂಬಿಸಬೇಡಿ. ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಬೆಳೆಗೆ ನಿಜವಾಗಿಯೂ ನೀರು ಬೇಕಾದಾಗ ನೀರಾವರಿ ಮಾಡಿ.",

    genericBestTime:
      "ಮುಂಜಾನೆ ಅಥವಾ ಸಂಜೆ ನೀರಾವರಿ ಮಾಡಲು ಸಾಮಾನ್ಯವಾಗಿ ಉತ್ತಮ ಸಮಯ, ಏಕೆಂದರೆ ಆವಿಯಾಗುವಿಕೆಯಿಂದ ಉಂಟಾಗುವ ನೀರಿನ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಬಹುದು.",

    genericWarning:
      "ಅತಿಯಾದ ನೀರಾವರಿ ಮತ್ತು ದೀರ್ಘಕಾಲದ ನೀರು ನಿಲ್ಲುವಿಕೆಯನ್ನು ತಪ್ಪಿಸಿ. ಹೆಚ್ಚಿನ ತೇವಾಂಶವು ಬೇರುಗಳ ಆರೋಗ್ಯವನ್ನು ಕಡಿಮೆ ಮಾಡಿ ಬೇರು ರೋಗಗಳ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸಬಹುದು.",
  },

  ml: {
    title: "ജലസേചനം",
    loading: "ജലസേചന വിവരങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
    loadingDesc: "ദയവായി കാത്തിരിക്കുക...",
    cropNotFound: "വിള കണ്ടെത്തിയില്ല",
    backToCrops: "വിളകളിലേക്ക് മടങ്ങുക",
    season: "കാലാവസ്ഥ",
    landArea: "ഭൂവിസ്തീർണ്ണം",
    irrigation: "ജലസേചനം",
    recommendation: "ജലസേചന ശുപാർശ",
    whenToIrrigate: "എപ്പോൾ ജലസേചനം നടത്തണം",
    bestTime: "മികച്ച സമയം",
    avoidOverwatering: "അമിത ജലസേചനം ഒഴിവാക്കുക",
    waterManagement: "ജല പരിപാലന നിർദ്ദേശങ്ങൾ",

    checkSoil: "മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക",
    checkSoilDesc:
      "ജലസേചനത്തിന് മുമ്പ് മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക. ആവശ്യത്തിന് ഈർപ്പം ഉണ്ടെങ്കിൽ അനാവശ്യമായി വെള്ളം നൽകരുത്.",

    checkRainfall: "മഴ പരിശോധിക്കുക",
    checkRainfallDesc:
      "മഴ പ്രതീക്ഷിക്കുന്നുണ്ടെങ്കിൽ അനാവശ്യ ജല ഉപയോഗം ഒഴിവാക്കാൻ ജലസേചനം കുറയ്ക്കുകയോ വൈകിപ്പിക്കുകയോ ചെയ്യുക.",

    avoidWastage: "ജല പാഴാക്കൽ ഒഴിവാക്കുക",
    avoidWastageDesc:
      "സാധ്യമാകുന്നിടത്ത് ഡ്രിപ്പ്, സ്പ്രിങ്ക്ലർ, ഫറോ അല്ലെങ്കിൽ മറ്റ് അനുയോജ്യമായ ജലസേചന രീതികൾ ഉപയോഗിക്കുക.",

    cropStage: "വിളയുടെ ഘട്ടം പരിഗണിക്കുക",
    cropStageDesc:
      "വിള വളരുന്നതിനനുസരിച്ച് ജലത്തിന്റെ ആവശ്യം മാറാം. വിളയുടെ ഘട്ടം, മണ്ണ്, കാലാവസ്ഥ എന്നിവ അനുസരിച്ച് ജലസേചനം ക്രമീകരിക്കുക.",

    cropDetails: "വിളയുടെ വിശദാംശങ്ങൾ",
    crop: "വിള",
    acres: "ഏക്കർ",

    genericWater:
      "ജലസേചനത്തിന്റെ ആവശ്യം വിള, മണ്ണിന്റെ തരം, കാലാവസ്ഥ, മഴ, വിളയുടെ വളർച്ചാ ഘട്ടം എന്നിവയെ ആശ്രയിച്ചിരിക്കുന്നു. അനുയോജ്യമായ മണ്ണിലെ ഈർപ്പം നിലനിർത്തുകയും വയൽ അനാവശ്യമായി നനഞ്ഞ നിലയിൽ വയ്ക്കാതിരിക്കുകയും ചെയ്യുക.",

    genericFrequency:
      "ഒരു നിശ്ചിത സമയക്രമത്തെ മാത്രം ആശ്രയിക്കരുത്. മണ്ണിലെ ഈർപ്പം സ്ഥിരമായി പരിശോധിച്ച് വിളയ്ക്ക് യഥാർത്ഥത്തിൽ വെള്ളം ആവശ്യമുള്ളപ്പോൾ ജലസേചനം നടത്തുക.",

    genericBestTime:
      "രാവിലെ നേരത്തെയോ വൈകുന്നേരമോ ജലസേചനം നടത്തുന്നത് സാധാരണയായി നല്ലതാണ്, കാരണം ബാഷ്പീകരണം മൂലമുള്ള ജലനഷ്ടം കുറയ്ക്കാൻ കഴിയും.",

    genericWarning:
      "അമിത ജലസേചനവും ദീർഘകാലം വെള്ളം കെട്ടിക്കിടക്കുന്നതും ഒഴിവാക്കുക. അധിക ഈർപ്പം വേരുകളുടെ ആരോഗ്യം കുറയ്ക്കുകയും വേരുരോഗങ്ങളുടെ സാധ്യത വർദ്ധിപ്പിക്കുകയും ചെയ്യാം.",
  },

  pa: {
    title: "ਸਿੰਚਾਈ",
    loading: "ਸਿੰਚਾਈ ਦੀ ਜਾਣਕਾਰੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
    loadingDesc: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...",
    cropNotFound: "ਫਸਲ ਨਹੀਂ ਮਿਲੀ",
    backToCrops: "ਫਸਲਾਂ ਵੱਲ ਵਾਪਸ ਜਾਓ",
    season: "ਮੌਸਮ",
    landArea: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰ",
    irrigation: "ਸਿੰਚਾਈ",
    recommendation: "ਸਿੰਚਾਈ ਦੀ ਸਿਫਾਰਸ਼",
    whenToIrrigate: "ਸਿੰਚਾਈ ਕਦੋਂ ਕਰਨੀ ਹੈ",
    bestTime: "ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ",
    avoidOverwatering: "ਜ਼ਿਆਦਾ ਪਾਣੀ ਦੇਣ ਤੋਂ ਬਚੋ",
    waterManagement: "ਪਾਣੀ ਪ੍ਰਬੰਧਨ ਸੁਝਾਅ",

    checkSoil: "ਮਿੱਟੀ ਦੀ ਨਮੀ ਜਾਂਚੋ",
    checkSoilDesc:
      "ਸਿੰਚਾਈ ਤੋਂ ਪਹਿਲਾਂ ਮਿੱਟੀ ਦੀ ਨਮੀ ਜਾਂਚੋ। ਜੇ ਮਿੱਟੀ ਵਿੱਚ ਕਾਫ਼ੀ ਨਮੀ ਹੈ ਤਾਂ ਬੇਲੋੜਾ ਪਾਣੀ ਨਾ ਦਿਓ।",

    checkRainfall: "ਮੀਂਹ ਦੀ ਜਾਂਚ ਕਰੋ",
    checkRainfallDesc:
      "ਜੇ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ ਤਾਂ ਬੇਲੋੜੇ ਪਾਣੀ ਦੀ ਵਰਤੋਂ ਤੋਂ ਬਚਣ ਲਈ ਸਿੰਚਾਈ ਘਟਾਓ ਜਾਂ ਦੇਰ ਨਾਲ ਕਰੋ।",

    avoidWastage: "ਪਾਣੀ ਦੀ ਬਰਬਾਦੀ ਤੋਂ ਬਚੋ",
    avoidWastageDesc:
      "ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ ਡ੍ਰਿਪ, ਸਪ੍ਰਿੰਕਲਰ, ਫਰੋ ਜਾਂ ਹੋਰ ਢੁਕਵੇਂ ਸਿੰਚਾਈ ਤਰੀਕੇ ਵਰਤੋ।",

    cropStage: "ਫਸਲ ਦੀ ਅਵਸਥਾ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ",
    cropStageDesc:
      "ਫਸਲ ਦੇ ਵਧਣ ਨਾਲ ਪਾਣੀ ਦੀ ਲੋੜ ਬਦਲ ਸਕਦੀ ਹੈ। ਫਸਲ ਦੀ ਅਵਸਥਾ, ਮਿੱਟੀ ਅਤੇ ਮੌਸਮ ਦੇ ਅਨੁਸਾਰ ਸਿੰਚਾਈ ਕਰੋ।",

    cropDetails: "ਫਸਲ ਦੇ ਵੇਰਵੇ",
    crop: "ਫਸਲ",
    acres: "ਏਕੜ",

    genericWater:
      "ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਫਸਲ, ਮਿੱਟੀ ਦੀ ਕਿਸਮ, ਮੌਸਮ, ਮੀਂਹ ਅਤੇ ਫਸਲ ਦੀ ਵਿਕਾਸ ਅਵਸਥਾ 'ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ। ਢੁਕਵੀਂ ਮਿੱਟੀ ਦੀ ਨਮੀ ਬਣਾਈ ਰੱਖੋ ਅਤੇ ਖੇਤ ਨੂੰ ਬੇਲੋੜਾ ਗਿੱਲਾ ਨਾ ਰੱਖੋ।",

    genericFrequency:
      "ਸਿਰਫ਼ ਇੱਕ ਨਿਰਧਾਰਤ ਸਮਾਂ-ਸਾਰਣੀ 'ਤੇ ਨਿਰਭਰ ਨਾ ਰਹੋ। ਮਿੱਟੀ ਦੀ ਨਮੀ ਨਿਯਮਿਤ ਜਾਂਚੋ ਅਤੇ ਫਸਲ ਨੂੰ ਜਦੋਂ ਅਸਲ ਵਿੱਚ ਪਾਣੀ ਦੀ ਲੋੜ ਹੋਵੇ ਤਾਂ ਸਿੰਚਾਈ ਕਰੋ।",

    genericBestTime:
      "ਸਵੇਰੇ ਜਲਦੀ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਸਿੰਚਾਈ ਕਰਨਾ ਆਮ ਤੌਰ 'ਤੇ ਚੰਗਾ ਸਮਾਂ ਹੁੰਦਾ ਹੈ ਕਿਉਂਕਿ ਇਸ ਨਾਲ ਵਾਸ਼ਪੀਕਰਨ ਕਾਰਨ ਪਾਣੀ ਦਾ ਨੁਕਸਾਨ ਘਟ ਸਕਦਾ ਹੈ।",

    genericWarning:
      "ਜ਼ਿਆਦਾ ਸਿੰਚਾਈ ਅਤੇ ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਪਾਣੀ ਖੜ੍ਹਾ ਰਹਿਣ ਤੋਂ ਬਚੋ। ਜ਼ਿਆਦਾ ਨਮੀ ਜੜ੍ਹਾਂ ਦੀ ਸਿਹਤ ਘਟਾ ਸਕਦੀ ਹੈ ਅਤੇ ਜੜ੍ਹਾਂ ਨਾਲ ਸਬੰਧਤ ਬਿਮਾਰੀਆਂ ਦਾ ਖਤਰਾ ਵਧਾ ਸਕਦੀ ਹੈ।",
  },

  or: {
    title: "ଜଳସେଚନ",
    loading: "ଜଳସେଚନ ସୂଚନା ଲୋଡ୍ ହେଉଛି...",
    loadingDesc: "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ...",
    cropNotFound: "ଫସଲ ମିଳିଲା ନାହିଁ",
    backToCrops: "ଫସଲକୁ ଫେରନ୍ତୁ",
    season: "ଋତୁ",
    landArea: "ଜମିର କ୍ଷେତ୍ରଫଳ",
    irrigation: "ଜଳସେଚନ",
    recommendation: "ଜଳସେଚନ ପରାମର୍ଶ",
    whenToIrrigate: "କେବେ ଜଳସେଚନ କରିବେ",
    bestTime: "ସର୍ବୋତ୍ତମ ସମୟ",
    avoidOverwatering: "ଅଧିକ ପାଣି ଦେବାରୁ ବଞ୍ଚନ୍ତୁ",
    waterManagement: "ଜଳ ପରିଚାଳନା ସୂଚନା",

    checkSoil: "ମାଟିର ଆର୍ଦ୍ରତା ଯାଞ୍ଚ କରନ୍ତୁ",
    checkSoilDesc:
      "ଜଳସେଚନ ପୂର୍ବରୁ ମାଟିର ଆର୍ଦ୍ରତା ଯାଞ୍ଚ କରନ୍ତୁ। ପର୍ଯ୍ୟାପ୍ତ ଆର୍ଦ୍ରତା ଥିଲେ ଅନାବଶ୍ୟକ ପାଣି ଦିଅନ୍ତୁ ନାହିଁ।",

    checkRainfall: "ବର୍ଷା ଯାଞ୍ଚ କରନ୍ତୁ",
    checkRainfallDesc:
      "ବର୍ଷାର ସମ୍ଭାବନା ଥିଲେ ଅନାବଶ୍ୟକ ପାଣି ବ୍ୟବହାର ଏଡ଼ାଇବା ପାଇଁ ଜଳସେଚନ କମାନ୍ତୁ କିମ୍ବା ବିଳମ୍ବ କରନ୍ତୁ।",

    avoidWastage: "ପାଣି ଅପଚୟ ଏଡ଼ାନ୍ତୁ",
    avoidWastageDesc:
      "ସମ୍ଭବ ହେଲେ ଡ୍ରିପ୍, ସ୍ପ୍ରିଙ୍କଲର, ଫରୋ କିମ୍ବା ଅନ୍ୟ ଉପଯୁକ୍ତ ଜଳସେଚନ ପଦ୍ଧତି ବ୍ୟବହାର କରନ୍ତୁ।",

    cropStage: "ଫସଲର ଅବସ୍ଥା ବିଚାର କରନ୍ତୁ",
    cropStageDesc:
      "ଫସଲ ବଢ଼ିବା ସହିତ ପାଣିର ଆବଶ୍ୟକତା ବଦଳିପାରେ। ଫସଲର ଅବସ୍ଥା, ମାଟି ଏବଂ ପାଣିପାଗ ଅନୁଯାୟୀ ଜଳସେଚନ କରନ୍ତୁ।",

    cropDetails: "ଫସଲ ବିବରଣୀ",
    crop: "ଫସଲ",
    acres: "ଏକର",

    genericWater:
      "ଜଳସେଚନର ଆବଶ୍ୟକତା ଫସଲ, ମାଟିର ପ୍ରକାର, ପାଣିପାଗ, ବର୍ଷା ଏବଂ ଫସଲର ବୃଦ୍ଧି ଅବସ୍ଥା ଉପରେ ନିର୍ଭର କରେ। ଉପଯୁକ୍ତ ମାଟି ଆର୍ଦ୍ରତା ରଖନ୍ତୁ ଏବଂ କ୍ଷେତକୁ ଅନାବଶ୍ୟକ ଭାବରେ ଓଦା ରଖନ୍ତୁ ନାହିଁ।",

    genericFrequency:
      "କେବଳ ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ ସମୟସୂଚୀ ଉପରେ ନିର୍ଭର କରନ୍ତୁ ନାହିଁ। ମାଟିର ଆର୍ଦ୍ରତା ନିୟମିତ ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ଫସଲକୁ ପ୍ରକୃତରେ ପାଣି ଆବଶ୍ୟକ ହେଲେ ଜଳସେଚନ କରନ୍ତୁ।",

    genericBestTime:
      "ସକାଳେ କିମ୍ବା ସନ୍ଧ୍ୟାରେ ଜଳସେଚନ କରିବା ସାଧାରଣତଃ ଭଲ ସମୟ, କାରଣ ବାଷ୍ପୀକରଣ ଯୋଗୁଁ ପାଣି ହାନି କମିପାରେ।",

    genericWarning:
      "ଅତ୍ୟଧିକ ଜଳସେଚନ ଏବଂ ଦୀର୍ଘ ସମୟ ପାଣି ଜମି ରହିବାକୁ ଏଡ଼ାନ୍ତୁ। ଅଧିକ ଆର୍ଦ୍ରତା ମୂଳର ସ୍ୱାସ୍ଥ୍ୟ କମାଇପାରେ ଏବଂ ମୂଳ ରୋଗର ଆଶଙ୍କା ବଢ଼ାଇପାରେ।",
  },

  as: {
    title: "জলসিঞ্চন",
    loading: "জলসিঞ্চনৰ তথ্য লোড হৈ আছে...",
    loadingDesc: "অনুগ্ৰহ কৰি অপেক্ষা কৰক...",
    cropNotFound: "শস্য পোৱা নগ'ল",
    backToCrops: "শস্যলৈ উভতি যাওক",
    season: "ঋতু",
    landArea: "মাটিৰ ক্ষেত্ৰফল",
    irrigation: "জলসিঞ্চন",
    recommendation: "জলসিঞ্চনৰ পৰামৰ্শ",
    whenToIrrigate: "কেতিয়া জলসিঞ্চন কৰিব",
    bestTime: "উত্তম সময়",
    avoidOverwatering: "অধিক পানী দিয়া এৰাই চলক",
    waterManagement: "পানী ব্যৱস্থাপনাৰ পৰামৰ্শ",

    checkSoil: "মাটিৰ আৰ্দ্ৰতা পৰীক্ষা কৰক",
    checkSoilDesc:
      "জলসিঞ্চনৰ আগতে মাটিৰ আৰ্দ্ৰতা পৰীক্ষা কৰক। মাটিত পৰ্যাপ্ত আৰ্দ্ৰতা থাকিলে অপ্রয়োজনীয় পানী নিদিব।",

    checkRainfall: "বৰষুণ পৰীক্ষা কৰক",
    checkRainfallDesc:
      "বৰষুণৰ সম্ভাৱনা থাকিলে অপ্রয়োজনীয় পানীৰ ব্যৱহাৰ এৰাবলৈ জলসিঞ্চন কমাওক বা পিছুৱাই দিয়ক।",

    avoidWastage: "পানীৰ অপচয় এৰাই চলক",
    avoidWastageDesc:
      "সম্ভৱ হ'লে ড্ৰিপ, স্প্ৰিংকলাৰ, ফাৰো বা অন্যান্য উপযুক্ত জলসিঞ্চন পদ্ধতি ব্যৱহাৰ কৰক।",

    cropStage: "শস্যৰ পৰ্যায় বিবেচনা কৰক",
    cropStageDesc:
      "শস্য বাঢ়ি অহাৰ লগে লগে পানীৰ প্ৰয়োজন সলনি হ'ব পাৰে। শস্যৰ পৰ্যায়, মাটি আৰু বতৰৰ অৱস্থা অনুসৰি জলসিঞ্চন সামঞ্জস্য কৰক।",

    cropDetails: "শস্যৰ বিৱৰণ",
    crop: "শস্য",
    acres: "একৰ",

    genericWater:
      "জলসিঞ্চনৰ প্ৰয়োজন শস্য, মাটিৰ প্ৰকাৰ, বতৰ, বৰষুণ আৰু শস্যৰ বৃদ্ধিৰ পৰ্যায়ৰ ওপৰত নিৰ্ভৰ কৰে। উপযুক্ত মাটিৰ আৰ্দ্ৰতা বজাই ৰাখক আৰু পথাৰখন অপ্রয়োজনীয়ভাৱে তিতা কৰি নাৰাখিব।",

    genericFrequency:
      "কেৱল এটা নিৰ্দিষ্ট সময়সূচীৰ ওপৰত নিৰ্ভৰ নকৰিব। মাটিৰ আৰ্দ্ৰতা নিয়মীয়াকৈ পৰীক্ষা কৰক আৰু শস্যক প্ৰকৃততে পানীৰ প্ৰয়োজন হ'লে জলসিঞ্চন কৰক।",

    genericBestTime:
      "পুৱা সোনকালে বা সন্ধিয়া জলসিঞ্চন কৰাটো সাধাৰণতে ভাল সময়, কাৰণ ইয়াৰ ফলত বাষ্পীভৱনৰ বাবে হোৱা পানীৰ ক্ষতি কমিব পাৰে।",

    genericWarning:
      "অত্যধিক জলসিঞ্চন আৰু দীৰ্ঘ সময় পানী জমা হৈ থকাটো এৰাই চলক। অধিক আৰ্দ্ৰতাই শিপাৰ স্বাস্থ্য হ্ৰাস কৰিব পাৰে আৰু শিপাৰ ৰোগৰ আশংকা বৃদ্ধি কৰিব পাৰে।",
  },

  ur: {
    title: "آبپاشی",
    loading: "آبپاشی کی معلومات لوڈ ہو رہی ہیں...",
    loadingDesc: "براہ کرم انتظار کریں...",
    cropNotFound: "فصل نہیں ملی",
    backToCrops: "فصلوں پر واپس جائیں",
    season: "موسم",
    landArea: "زمین کا رقبہ",
    irrigation: "آبپاشی",
    recommendation: "آبپاشی کی سفارش",
    whenToIrrigate: "آبپاشی کب کریں",
    bestTime: "بہترین وقت",
    avoidOverwatering: "زیادہ پانی دینے سے بچیں",
    waterManagement: "پانی کے انتظام کی تجاویز",

    checkSoil: "مٹی کی نمی چیک کریں",
    checkSoilDesc:
      "آبپاشی سے پہلے مٹی کی نمی چیک کریں۔ اگر مٹی میں کافی نمی موجود ہے تو غیر ضروری پانی نہ دیں۔",

    checkRainfall: "بارش چیک کریں",
    checkRainfallDesc:
      "اگر بارش متوقع ہو تو غیر ضروری پانی کے استعمال سے بچنے کے لیے آبپاشی کم کریں یا مؤخر کریں۔",

    avoidWastage: "پانی کے ضیاع سے بچیں",
    avoidWastageDesc:
      "جہاں ممکن ہو ڈرپ، اسپرنکلر، فارو یا دیگر مناسب آبپاشی کے طریقے استعمال کریں۔",

    cropStage: "فصل کی حالت کو مدنظر رکھیں",
    cropStageDesc:
      "فصل کے بڑھنے کے ساتھ پانی کی ضرورت بدل سکتی ہے۔ فصل کی حالت، مٹی اور موسم کے مطابق آبپاشی کریں۔",

    cropDetails: "فصل کی تفصیلات",
    crop: "فصل",
    acres: "ایکڑ",

    genericWater:
      "آبپاشی کی ضرورت فصل، مٹی کی قسم، موسم، بارش اور فصل کی نشوونما کے مرحلے پر منحصر ہے۔ مناسب مٹی کی نمی برقرار رکھیں اور کھیت کو غیر ضروری طور پر گیلا نہ رکھیں۔",

    genericFrequency:
      "صرف مقررہ شیڈول پر انحصار نہ کریں۔ مٹی کی نمی باقاعدگی سے چیک کریں اور فصل کو واقعی پانی کی ضرورت ہو تو آبپاشی کریں۔",

    genericBestTime:
      "صبح سویرے یا شام کو آبپاشی کرنا عام طور پر اچھا وقت ہے کیونکہ اس سے بخارات کے ذریعے پانی کے نقصان کو کم کیا جا سکتا ہے۔",

    genericWarning:
      "ضرورت سے زیادہ آبپاشی اور طویل عرصے تک پانی جمع رہنے سے بچیں۔ زیادہ نمی جڑوں کی صحت کو کم کر سکتی ہے اور جڑوں کی بیماریوں کا خطرہ بڑھا سکتی ہے۔",
  },
};

/* =========================================================
   IRRIGATION PAGE
========================================================= */

export default function IrrigationPage() {
  const params = useParams();
  const router = useRouter();

  const { language } = useLanguage();

  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD CROP
  ======================================================= */

  useEffect(() => {
    const loadCrop = () => {
      try {
        const savedCrops = localStorage.getItem("crops");

        if (!savedCrops) {
          setCrop(null);
          setLoading(false);
          return;
        }

        const crops: Crop[] = JSON.parse(savedCrops);

        const cropId = params?.id;

        const foundCrop = crops.find(
          (item) => String(item.id) === String(cropId)
        );

        setCrop(foundCrop || null);
      } catch (error) {
        console.error("Error loading crop:", error);
        setCrop(null);
      } finally {
        setLoading(false);
      }
    };

    loadCrop();
  }, [params]);

  const t = translations[language] || translations.en;

  /* =======================================================
     GENERIC IRRIGATION ADVICE
  ======================================================= */

  const irrigationAdvice: IrrigationAdvice = {
    water: t.genericWater,
    frequency: t.genericFrequency,
    bestTime: t.genericBestTime,
    warning: t.genericWarning,
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-4"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">💧</div>

          <h1 className="text-2xl font-bold text-green-800">
            {t.loading}
          </h1>

          <p className="text-gray-500 mt-2">
            {t.loadingDesc}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     CROP NOT FOUND
  ======================================================= */

  if (!crop) {
    return (
      <main
        className="min-h-screen bg-green-50 px-4 py-10"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => router.push("/crops")}
            className="mb-6 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm text-green-700 font-semibold hover:bg-green-50"
          >
            ← {t.backToCrops}
          </button>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🌱</div>

            <h1 className="text-3xl font-bold text-gray-800">
              {t.cropNotFound}
            </h1>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <main
      className="min-h-screen bg-green-50 px-4 py-8 md:py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}

        <button
          type="button"
          onClick={() => router.push("/crops")}
          className="mb-6 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm text-green-700 font-semibold hover:bg-green-50 transition"
        >
          ← {t.backToCrops}
        </button>

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl">
              💧
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-green-800">
                {t.title}
              </h1>

              <p className="text-gray-500 mt-1">
                {t.recommendation}
              </p>
            </div>

          </div>
        </div>

        {/* Crop Details */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            🌾 {t.cropDetails}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-green-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                {t.crop}
              </p>

              <p className="text-lg font-bold text-green-800 mt-1">
                {crop.crop}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                {t.season}
              </p>

              <p className="text-lg font-bold text-green-800 mt-1">
                {crop.season}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                {t.landArea}
              </p>

              <p className="text-lg font-bold text-green-800 mt-1">
                {crop.land} {t.acres}
              </p>
            </div>

          </div>
        </div>

        {/* Main Recommendation */}

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-6">

          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">💦</span>

            <h2 className="text-2xl font-bold text-green-800">
              {t.recommendation}
            </h2>
          </div>

          {/* Water */}

          <div className="mb-6 p-5 rounded-2xl bg-blue-50 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-800 mb-2">
              💧 {t.irrigation}
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {irrigationAdvice.water}
            </p>
          </div>

          {/* Frequency */}

          <div className="mb-6 p-5 rounded-2xl bg-green-50 border border-green-100">
            <h3 className="text-lg font-bold text-green-800 mb-2">
              🌱 {t.whenToIrrigate}
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {irrigationAdvice.frequency}
            </p>
          </div>

          {/* Best Time */}

          <div className="mb-6 p-5 rounded-2xl bg-yellow-50 border border-yellow-100">
            <h3 className="text-lg font-bold text-yellow-800 mb-2">
              🌅 {t.bestTime}
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {irrigationAdvice.bestTime}
            </p>
          </div>

          {/* Warning */}

          <div className="p-5 rounded-2xl bg-red-50 border border-red-100">
            <h3 className="text-lg font-bold text-red-700 mb-2">
              ⚠️ {t.avoidOverwatering}
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {irrigationAdvice.warning}
            </p>
          </div>

        </div>

        {/* Water Management Tips */}

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">

          <h2 className="text-2xl font-bold text-green-800 mb-6">
            🌿 {t.waterManagement}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Soil */}

            <div className="p-5 rounded-2xl bg-green-50 border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌱</span>

                <h3 className="font-bold text-green-800">
                  {t.checkSoil}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.checkSoilDesc}
              </p>
            </div>

            {/* Rainfall */}

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌧️</span>

                <h3 className="font-bold text-blue-800">
                  {t.checkRainfall}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.checkRainfallDesc}
              </p>
            </div>

            {/* Water Wastage */}

            <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚰</span>

                <h3 className="font-bold text-yellow-800">
                  {t.avoidWastage}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.avoidWastageDesc}
              </p>
            </div>

            {/* Crop Stage */}

            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌾</span>

                <h3 className="font-bold text-purple-800">
                  {t.cropStage}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.cropStageDesc}
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}