"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

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

  genericWater: string;
  genericFrequency: string;
  genericBestTime: string;
  genericWarning: string;
};

/* =========================================================
   TRANSLATIONS

   IMPORTANT:
   There are NO crop-specific keys here.

   That means:
   Wheat, Rice, Maize, Potato, Sugarcane,
   Tomato, Onion, Cotton, Pulses, Vegetables,
   Fruits, or ANY future crop will work.
========================================================= */

const translations: Record<LanguageCode, Translation> = {
  en: {
    title: "Irrigation",
    loading: "Loading irrigation information...",
    loadingDesc: "Please wait...",
    cropNotFound: "Crop not found",
    backToCrops: "Back to crops",
    backTo: "Back to",
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
    backTo: "वापस जाएं",
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
    backTo: "ফিরে যান",
    season: "মৌসুম",
    landArea: "জমির পরিমাণ",
    irrigation: "সেচ",
    recommendation: "সেচের পরামর্শ",
    whenToIrrigate: "কখন সেচ দেবেন",
    bestTime: "সেরা সময়",
    avoidOverwatering: "অতিরিক্ত পানি দেওয়া এড়িয়ে চলুন",
    waterManagement: "জল ব্যবস্থাপনা পরামর্শ",

    checkSoil: "মাটির আর্দ্রতা পরীক্ষা করুন",
    checkSoilDesc:
      "সেচ দেওয়ার আগে মাটির আর্দ্রতা পরীক্ষা করুন। পর্যাপ্ত আর্দ্রতা থাকলে অপ্রয়োজনীয় পানি দেবেন না।",

    checkRainfall: "বৃষ্টির সম্ভাবনা দেখুন",
    checkRainfallDesc:
      "বৃষ্টির সম্ভাবনা থাকলে পানি বাঁচাতে সেচ কমান বা কিছুটা পিছিয়ে দিন।",

    avoidWastage: "পানির অপচয় এড়ান",
    avoidWastageDesc:
      "সম্ভব হলে ড্রিপ, স্প্রিংকলার বা অন্যান্য উপযুক্ত দক্ষ সেচ পদ্ধতি ব্যবহার করুন।",

    cropStage: "ফসলের বৃদ্ধি পর্যায় বিবেচনা করুন",
    cropStageDesc:
      "ফসলের বৃদ্ধির সঙ্গে পানির প্রয়োজন পরিবর্তিত হতে পারে। ফসলের পর্যায়, মাটি ও আবহাওয়া অনুযায়ী সেচ দিন।",

    cropDetails: "ফসলের বিবরণ",
    crop: "ফসল",
    acres: "একর",

    genericWater:
      "সেচের প্রয়োজন ফসল, মাটি, আবহাওয়া, বৃষ্টিপাত এবং ফসলের বৃদ্ধির পর্যায়ের উপর নির্ভর করে।",

    genericFrequency:
      "শুধু নির্দিষ্ট সময়সূচির উপর নির্ভর করবেন না। নিয়মিত মাটির আর্দ্রতা পরীক্ষা করে প্রয়োজন অনুযায়ী সেচ দিন।",

    genericBestTime:
      "সকাল বা সন্ধ্যায় সেচ দেওয়া সাধারণত ভালো সময়, কারণ এতে বাষ্পীভবনের মাধ্যমে পানির ক্ষতি কমতে পারে।",

    genericWarning:
      "অতিরিক্ত সেচ এবং দীর্ঘ সময় জল জমে থাকা এড়িয়ে চলুন। অতিরিক্ত আর্দ্রতা শিকড়ের ক্ষতি করতে পারে।",
  },

  mr: {
    title: "सिंचन",
    loading: "सिंचनाची माहिती लोड होत आहे...",
    loadingDesc: "कृपया प्रतीक्षा करा...",
    cropNotFound: "पीक सापडले नाही",
    backToCrops: "पिकांकडे परत जा",
    backTo: "परत जा",
    season: "हंगाम",
    landArea: "जमिनीचे क्षेत्र",
    irrigation: "सिंचन",
    recommendation: "सिंचनाचा सल्ला",
    whenToIrrigate: "सिंचन कधी करावे",
    bestTime: "योग्य वेळ",
    avoidOverwatering: "जास्त पाणी देणे टाळा",
    waterManagement: "पाणी व्यवस्थापन सूचना",

    checkSoil: "मातीतील ओलावा तपासा",
    checkSoilDesc:
      "सिंचनापूर्वी मातीतील ओलावा तपासा. पुरेसा ओलावा असल्यास अनावश्यक पाणी देऊ नका.",

    checkRainfall: "पावसाची शक्यता तपासा",
    checkRainfallDesc:
      "पावसाची शक्यता असल्यास पाणी वाचवण्यासाठी सिंचन कमी करा किंवा पुढे ढकला.",

    avoidWastage: "पाण्याचा अपव्यय टाळा",
    avoidWastageDesc:
      "शक्य असल्यास ठिबक, तुषार किंवा इतर कार्यक्षम सिंचन पद्धती वापरा.",

    cropStage: "पिकाची अवस्था लक्षात घ्या",
    cropStageDesc:
      "पिकाच्या वाढीनुसार पाण्याची गरज बदलू शकते. पिकाची अवस्था, माती आणि हवामानानुसार सिंचन करा.",

    cropDetails: "पिकाची माहिती",
    crop: "पीक",
    acres: "एकर",

    genericWater:
      "सिंचनाची गरज पीक, माती, हवामान, पाऊस आणि पिकाच्या अवस्थेवर अवलंबून असते.",

    genericFrequency:
      "फक्त ठराविक वेळापत्रकावर अवलंबून राहू नका. मातीतील ओलावा नियमित तपासा आणि गरजेनुसार सिंचन करा.",

    genericBestTime:
      "सकाळी लवकर किंवा संध्याकाळी सिंचन करणे सामान्यतः चांगले असते.",

    genericWarning:
      "अति सिंचन आणि जास्त काळ पाणी साचणे टाळा. जास्त ओलाव्यामुळे मुळांना नुकसान होऊ शकते.",
  },

  ta: {
    title: "நீர்ப்பாசனம்",
    loading: "நீர்ப்பாசன தகவல் ஏற்றப்படுகிறது...",
    loadingDesc: "தயவுசெய்து காத்திருக்கவும்...",
    cropNotFound: "பயிர் கிடைக்கவில்லை",
    backToCrops: "பயிர்களுக்குத் திரும்பவும்",
    backTo: "திரும்பவும்",
    season: "பருவம்",
    landArea: "நிலப்பரப்பு",
    irrigation: "நீர்ப்பாசனம்",
    recommendation: "நீர்ப்பாசன ஆலோசனை",
    whenToIrrigate: "எப்போது நீர்ப்பாசனம் செய்ய வேண்டும்",
    bestTime: "சிறந்த நேரம்",
    avoidOverwatering: "அதிக நீர் வழங்குவதைத் தவிர்க்கவும்",
    waterManagement: "நீர் மேலாண்மை குறிப்புகள்",

    checkSoil: "மண் ஈரப்பதத்தை சரிபார்க்கவும்",
    checkSoilDesc:
      "நீர்ப்பாசனத்திற்கு முன் மண் ஈரப்பதத்தை சரிபார்க்கவும். போதுமான ஈரப்பதம் இருந்தால் தேவையற்ற நீரை வழங்க வேண்டாம்.",

    checkRainfall: "மழையை சரிபார்க்கவும்",
    checkRainfallDesc:
      "மழை பெய்யும் வாய்ப்பு இருந்தால் நீரை சேமிக்க நீர்ப்பாசனத்தை குறைக்கவும் அல்லது தாமதப்படுத்தவும்.",

    avoidWastage: "நீர் வீணாவதைத் தவிர்க்கவும்",
    avoidWastageDesc:
      "முடிந்தவரை சொட்டு நீர்ப்பாசனம், தெளிப்பு அல்லது பிற திறமையான முறைகளைப் பயன்படுத்தவும்.",

    cropStage: "பயிரின் வளர்ச்சி நிலையை கவனிக்கவும்",
    cropStageDesc:
      "பயிர் வளரும்போது நீர் தேவை மாறலாம். பயிர் நிலை, மண் மற்றும் வானிலைக்கு ஏற்ப நீர்ப்பாசனம் செய்யவும்.",

    cropDetails: "பயிர் விவரங்கள்",
    crop: "பயிர்",
    acres: "ஏக்கர்",

    genericWater:
      "நீர்ப்பாசனத் தேவை பயிர், மண், வானிலை, மழை மற்றும் பயிரின் வளர்ச்சி நிலையைப் பொறுத்தது.",

    genericFrequency:
      "நிலையான அட்டவணையை மட்டும் நம்ப வேண்டாம். மண் ஈரப்பதத்தை தொடர்ந்து சரிபார்த்து தேவைக்கேற்ப நீர்ப்பாசனம் செய்யவும்.",

    genericBestTime:
      "காலை அல்லது மாலை நீர்ப்பாசனம் செய்வது பொதுவாக நல்ல நேரமாகும்.",

    genericWarning:
      "அதிக நீர்ப்பாசனம் மற்றும் நீண்ட நேரம் நீர் தேங்கி நிற்பதைத் தவிர்க்கவும்.",
  },

  te: {
    title: "నీటిపారుదల",
    loading: "నీటిపారుదల సమాచారం లోడ్ అవుతోంది...",
    loadingDesc: "దయచేసి వేచి ఉండండి...",
    cropNotFound: "పంట కనుగొనబడలేదు",
    backToCrops: "పంటలకు తిరిగి వెళ్లండి",
    backTo: "తిరిగి వెళ్లండి",
    season: "కాలం",
    landArea: "భూమి విస్తీర్ణం",
    irrigation: "నీటిపారుదల",
    recommendation: "నీటిపారుదల సలహా",
    whenToIrrigate: "ఎప్పుడు నీరు పెట్టాలి",
    bestTime: "ఉత్తమ సమయం",
    avoidOverwatering: "అధిక నీరు పెట్టడం నివారించండి",
    waterManagement: "నీటి నిర్వహణ సూచనలు",

    checkSoil: "మట్టి తేమను తనిఖీ చేయండి",
    checkSoilDesc:
      "నీరు పెట్టే ముందు మట్టి తేమను తనిఖీ చేయండి. తగినంత తేమ ఉంటే అవసరం లేని నీటిని ఇవ్వకండి.",

    checkRainfall: "వర్షపాతం తనిఖీ చేయండి",
    checkRainfallDesc:
      "వర్షం వచ్చే అవకాశం ఉంటే నీటిని ఆదా చేయడానికి నీటిపారుదల తగ్గించండి లేదా ఆలస్యం చేయండి.",

    avoidWastage: "నీటి వృథాను నివారించండి",
    avoidWastageDesc:
      "సాధ్యమైన చోట డ్రిప్, స్ప్రింక్లర్ లేదా ఇతర సమర్థవంతమైన పద్ధతులను ఉపయోగించండి.",

    cropStage: "పంట దశను పరిగణించండి",
    cropStageDesc:
      "పంట పెరుగుతున్న కొద్దీ నీటి అవసరం మారవచ్చు. పంట దశ, మట్టి మరియు వాతావరణం ఆధారంగా నీరు పెట్టండి.",

    cropDetails: "పంట వివరాలు",
    crop: "పంట",
    acres: "ఎకరాలు",

    genericWater:
      "నీటిపారుదల అవసరం పంట, మట్టి, వాతావరణం, వర్షపాతం మరియు పంట దశపై ఆధారపడి ఉంటుంది.",

    genericFrequency:
      "స్థిరమైన షెడ్యూల్‌పై మాత్రమే ఆధారపడవద్దు. మట్టి తేమను క్రమం తప్పకుండా తనిఖీ చేసి అవసరమైనప్పుడు నీరు పెట్టండి.",

    genericBestTime:
      "ఉదయం లేదా సాయంత్రం నీరు పెట్టడం సాధారణంగా మంచి సమయం.",

    genericWarning:
      "అధిక నీటిపారుదల మరియు ఎక్కువసేపు నీరు నిల్వ ఉండటాన్ని నివారించండి.",
  },

  gu: {
    title: "સિંચાઈ",
    loading: "સિંચાઈની માહિતી લોડ થઈ રહી છે...",
    loadingDesc: "કૃપા કરીને રાહ જુઓ...",
    cropNotFound: "પાક મળ્યો નથી",
    backToCrops: "પાક તરફ પાછા જાઓ",
    backTo: "પાછા જાઓ",
    season: "મોસમ",
    landArea: "જમીન વિસ્તાર",
    irrigation: "સિંચાઈ",
    recommendation: "સિંચાઈની સલાહ",
    whenToIrrigate: "સિંચાઈ ક્યારે કરવી",
    bestTime: "સારો સમય",
    avoidOverwatering: "વધારે પાણી આપવાનું ટાળો",
    waterManagement: "પાણી વ્યવસ્થાપન સૂચનો",

    checkSoil: "માટીની ભેજ તપાસો",
    checkSoilDesc:
      "સિંચાઈ પહેલાં માટીની ભેજ તપાસો. પૂરતી ભેજ હોય તો બિનજરૂરી પાણી ન આપો.",

    checkRainfall: "વરસાદની શક્યતા તપાસો",
    checkRainfallDesc:
      "વરસાદની શક્યતા હોય તો પાણી બચાવવા સિંચાઈ ઘટાડો અથવા મુલતવી રાખો.",

    avoidWastage: "પાણીનો બગાડ ટાળો",
    avoidWastageDesc:
      "શક્ય હોય ત્યાં ડ્રિપ, સ્પ્રિંકલર અથવા અન્ય કાર્યક્ષમ સિંચાઈ પદ્ધતિઓનો ઉપયોગ કરો.",

    cropStage: "પાકની સ્થિતિ ધ્યાનમાં લો",
    cropStageDesc:
      "પાક વધે તેમ પાણીની જરૂરિયાત બદલાઈ શકે છે. પાકની સ્થિતિ, માટી અને હવામાન અનુસાર સિંચાઈ કરો.",

    cropDetails: "પાકની વિગતો",
    crop: "પાક",
    acres: "એકર",

    genericWater:
      "સિંચાઈની જરૂરિયાત પાક, માટી, હવામાન, વરસાદ અને પાકની વૃદ્ધિની સ્થિતિ પર આધારિત છે.",

    genericFrequency:
      "ફક્ત નક્કી સમયપત્રક પર આધાર રાખશો નહીં. માટીની ભેજ નિયમિત તપાસો અને જરૂર મુજબ સિંચાઈ કરો.",

    genericBestTime:
      "સવારે અથવા સાંજે સિંચાઈ કરવી સામાન્ય રીતે સારો સમય છે.",

    genericWarning:
      "વધારે સિંચાઈ અને લાંબા સમય સુધી પાણી ભરાઈ રહેવાનું ટાળો.",
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
    avoidOverwatering: "ಹೆಚ್ಚು ನೀರು ಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ",
    waterManagement: "ನೀರಿನ ನಿರ್ವಹಣೆ ಸಲಹೆಗಳು",

    checkSoil: "ಮಣ್ಣಿನ ತೇವಾಂಶ ಪರಿಶೀಲಿಸಿ",
    checkSoilDesc:
      "ನೀರಾವರಿ ಮಾಡುವ ಮೊದಲು ಮಣ್ಣಿನ ತೇವಾಂಶ ಪರಿಶೀಲಿಸಿ. ಸಾಕಷ್ಟು ತೇವಾಂಶವಿದ್ದರೆ ಅನಗತ್ಯ ನೀರು ಹಾಕಬೇಡಿ.",

    checkRainfall: "ಮಳೆಯ ಸಾಧ್ಯತೆ ಪರಿಶೀಲಿಸಿ",
    checkRainfallDesc:
      "ಮಳೆಯ ಸಾಧ್ಯತೆ ಇದ್ದರೆ ನೀರನ್ನು ಉಳಿಸಲು ನೀರಾವರಿ ಕಡಿಮೆ ಮಾಡಿ ಅಥವಾ ಮುಂದೂಡಿ.",

    avoidWastage: "ನೀರಿನ ವ್ಯರ್ಥವನ್ನು ತಪ್ಪಿಸಿ",
    avoidWastageDesc:
      "ಸಾಧ್ಯವಾದಲ್ಲಿ ಡ್ರಿಪ್, ಸ್ಪ್ರಿಂಕ್ಲರ್ ಅಥವಾ ಇತರ ಪರಿಣಾಮಕಾರಿ ನೀರಾವರಿ ವಿಧಾನಗಳನ್ನು ಬಳಸಿ.",

    cropStage: "ಬೆಳೆಯ ಹಂತವನ್ನು ಪರಿಗಣಿಸಿ",
    cropStageDesc:
      "ಬೆಳೆಯುವ ಹಂತದೊಂದಿಗೆ ನೀರಿನ ಅವಶ್ಯಕತೆ ಬದಲಾಗಬಹುದು. ಬೆಳೆ ಹಂತ, ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನೀರಾವರಿ ಮಾಡಿ.",

    cropDetails: "ಬೆಳೆ ವಿವರಗಳು",
    crop: "ಬೆಳೆ",
    acres: "ಎಕರೆ",

    genericWater:
      "ನೀರಾವರಿಯ ಅಗತ್ಯವು ಬೆಳೆ, ಮಣ್ಣು, ಹವಾಮಾನ, ಮಳೆ ಮತ್ತು ಬೆಳೆಯ ಹಂತವನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ.",

    genericFrequency:
      "ನಿಗದಿತ ವೇಳಾಪಟ್ಟಿಯ ಮೇಲೆ ಮಾತ್ರ ಅವಲಂಬಿಸಬೇಡಿ. ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಅಗತ್ಯವಿದ್ದಾಗ ನೀರು ಹಾಕಿ.",

    genericBestTime:
      "ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರು ಹಾಕುವುದು ಸಾಮಾನ್ಯವಾಗಿ ಉತ್ತಮ ಸಮಯ.",

    genericWarning:
      "ಅತಿಯಾದ ನೀರಾವರಿ ಮತ್ತು ದೀರ್ಘಕಾಲ ನೀರು ನಿಂತಿರುವುದನ್ನು ತಪ್ಪಿಸಿ.",
  },

  ml: {
    title: "ജലസേചനം",
    loading: "ജലസേചന വിവരങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
    loadingDesc: "ദയവായി കാത്തിരിക്കുക...",
    cropNotFound: "വിള കണ്ടെത്തിയില്ല",
    backToCrops: "വിളകളിലേക്ക് മടങ്ങുക",
    backTo: "തിരികെ പോകുക",
    season: "സീസൺ",
    landArea: "ഭൂവിസ്തീർണ്ണം",
    irrigation: "ജലസേചനം",
    recommendation: "ജലസേചന നിർദ്ദേശം",
    whenToIrrigate: "എപ്പോൾ ജലസേചനം നടത്തണം",
    bestTime: "നല്ല സമയം",
    avoidOverwatering: "അധിക വെള്ളം നൽകുന്നത് ഒഴിവാക്കുക",
    waterManagement: "ജല പരിപാലന നിർദ്ദേശങ്ങൾ",

    checkSoil: "മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക",
    checkSoilDesc:
      "ജലസേചനത്തിന് മുമ്പ് മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക. ആവശ്യത്തിന് ഈർപ്പം ഉണ്ടെങ്കിൽ അനാവശ്യമായി വെള്ളം നൽകരുത്.",

    checkRainfall: "മഴയുടെ സാധ്യത പരിശോധിക്കുക",
    checkRainfallDesc:
      "മഴയ്ക്ക് സാധ്യതയുണ്ടെങ്കിൽ വെള്ളം സംരക്ഷിക്കാൻ ജലസേചനം കുറയ്ക്കുകയോ വൈകിപ്പിക്കുകയോ ചെയ്യുക.",

    avoidWastage: "വെള്ളത്തിന്റെ പാഴാക്കൽ ഒഴിവാക്കുക",
    avoidWastageDesc:
      "സാധ്യമെങ്കിൽ ഡ്രിപ്പ്, സ്പ്രിങ്ക്ലർ തുടങ്ങിയ കാര്യക്ഷമമായ ജലസേചന രീതികൾ ഉപയോഗിക്കുക.",

    cropStage: "വിളയുടെ ഘട്ടം പരിഗണിക്കുക",
    cropStageDesc:
      "വിള വളരുന്നതിനനുസരിച്ച് വെള്ളത്തിന്റെ ആവശ്യം മാറാം. വിളയുടെ ഘട്ടം, മണ്ണ്, കാലാവസ്ഥ എന്നിവ അനുസരിച്ച് ജലസേചനം നടത്തുക.",

    cropDetails: "വിളയുടെ വിശദാംശങ്ങൾ",
    crop: "വിള",
    acres: "ഏക്കർ",

    genericWater:
      "ജലസേചനത്തിന്റെ ആവശ്യം വിള, മണ്ണ്, കാലാവസ്ഥ, മഴ, വിളയുടെ വളർച്ചാ ഘട്ടം എന്നിവയെ ആശ്രയിച്ചിരിക്കുന്നു.",

    genericFrequency:
      "സ്ഥിരമായ സമയക്രമത്തിൽ മാത്രം ആശ്രയിക്കരുത്. മണ്ണിലെ ഈർപ്പം പരിശോധിച്ച് ആവശ്യമായപ്പോൾ മാത്രം ജലസേചനം നടത്തുക.",

    genericBestTime:
      "രാവിലെയോ വൈകുന്നേരമോ ജലസേചനം നടത്തുന്നത് സാധാരണയായി നല്ല സമയമാണ്.",

    genericWarning:
      "അമിതമായ ജലസേചനവും ദീർഘനേരം വെള്ളം കെട്ടിനിൽക്കുന്നതും ഒഴിവാക്കുക.",
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
      "ਸਿੰਚਾਈ ਤੋਂ ਪਹਿਲਾਂ ਮਿੱਟੀ ਦੀ ਨਮੀ ਜਾਂਚੋ। ਜੇ ਕਾਫ਼ੀ ਨਮੀ ਹੈ ਤਾਂ ਬੇਲੋੜਾ ਪਾਣੀ ਨਾ ਦਿਓ।",

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

    genericWater:
      "ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਫਸਲ, ਮਿੱਟੀ, ਮੌਸਮ, ਮੀਂਹ ਅਤੇ ਫਸਲ ਦੀ ਅਵਸਥਾ 'ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।",

    genericFrequency:
      "ਨਿਸ਼ਚਿਤ ਸਮੇਂ ਦੀ ਬਜਾਏ ਸਿੰਚਾਈ ਤੋਂ ਪਹਿਲਾਂ ਮਿੱਟੀ ਦੀ ਨਮੀ ਜਾਂਚੋ।",

    genericBestTime:
      "ਪਾਣੀ ਦਾ ਨੁਕਸਾਨ ਘਟਾਉਣ ਲਈ ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਸਿੰਚਾਈ ਕਰੋ।",

    genericWarning:
      "ਜ਼ਿਆਦਾ ਪਾਣੀ ਦੇਣ ਅਤੇ ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਪਾਣੀ ਖੜ੍ਹਾ ਰਹਿਣ ਤੋਂ ਬਚੋ।",
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

    genericWater:
      "ଜଳସେଚନର ଆବଶ୍ୟକତା ଫସଲ, ମାଟି, ପାଣିପାଗ, ବର୍ଷା ଏବଂ ଫସଲର ଅବସ୍ଥା ଉପରେ ନିର୍ଭର କରେ।",

    genericFrequency:
      "ନିର୍ଦ୍ଧିଷ୍ଟ ସମୟ ଅନୁସାରେ ନୁହେଁ, ଜଳସେଚନ ପୂର୍ବରୁ ମାଟିର ଆର୍ଦ୍ରତା ଯାଞ୍ଚ କରନ୍ତୁ।",

    genericBestTime:
      "ପାଣି ଅପଚୟ କମାଇବା ପାଇଁ ସକାଳ କିମ୍ବା ସନ୍ଧ୍ୟା ଜଳସେଚନ କରନ୍ତୁ।",

    genericWarning:
      "ଅଧିକ ପାଣି ଦେବା ଏବଂ ଦୀର୍ଘ ସମୟ ପାଣି ଜମି ରହିବାକୁ ଏଡ଼ାନ୍ତୁ।",
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

    genericWater:
      "জলসিঞ্চনৰ প্ৰয়োজন শস্য, মাটি, বতৰ, বৰষুণ আৰু শস্যৰ অৱস্থাৰ ওপৰত নিৰ্ভৰ কৰে।",

    genericFrequency:
      "নিৰ্দিষ্ট সময়সূচীৰ পৰিৱৰ্তে জলসিঞ্চনৰ আগতে মাটিৰ আৰ্দ্ৰতা পৰীক্ষা কৰক।",

    genericBestTime:
      "পানীৰ অপচয় কমাবলৈ পুৱা বা সন্ধিয়া জলসিঞ্চন কৰক।",

    genericWarning:
      "অতিৰিক্ত পানী দিয়া আৰু দীঘলীয়া সময় পানী জমা হৈ থকাটো এৰাই চলক।",
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
      "اگر بارش متوقع ہو تو پانی بچانے کے لیے آبپاشی کم یا مؤخر کریں۔",

    avoidWastage: "پانی کا ضیاع روکیں",
    avoidWastageDesc:
      "جہاں ممکن ہو مؤثر آبپاشی کے طریقے استعمال کریں۔",

    cropStage: "فصل کی حالت دیکھیں",
    cropStageDesc:
      "فصل کے بڑھنے کے ساتھ پانی کی ضرورت بدل سکتی ہے۔ فصل کی حالت کے مطابق آبپاشی کریں۔",

    cropDetails: "فصل کی تفصیلات",
    crop: "فصل",
    acres: "ایکڑ",

    genericWater:
      "آبپاشی کی ضرورت فصل، مٹی، موسم، بارش اور فصل کی حالت پر منحصر ہوتی ہے۔",

    genericFrequency:
      "مقررہ شیڈول کے بجائے آبپاشی سے پہلے مٹی کی نمی چیک کریں اور ضرورت کے مطابق پانی دیں۔",

    genericBestTime:
      "پانی کے نقصان کو کم کرنے کے لیے صبح یا شام آبپاشی کرنا بہتر ہے۔",

    genericWarning:
      "زیادہ آبپاشی اور طویل وقت تک پانی کھڑا رہنے سے بچیں۔ زیادہ نمی جڑوں کو نقصان پہنچا سکتی ہے۔",
  },
};

/* =========================================================
   FALLBACK LANGUAGE
========================================================= */

const defaultLanguage: LanguageCode = "en";

/* =========================================================
   HELPER
========================================================= */

function getValidLanguage(value: string | null): LanguageCode {
  if (
    value &&
    Object.prototype.hasOwnProperty.call(
      translations,
      value
    )
  ) {
    return value as LanguageCode;
  }

  return defaultLanguage;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function IrrigationPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] =
    useState<LanguageCode>(defaultLanguage);

  const [crop, setCrop] = useState<Crop | null>(null);

  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD LANGUAGE + CROP
  ======================================================= */

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("selectedLanguage");

    const validLanguage =
      getValidLanguage(savedLanguage);

    setLanguage(validLanguage);

    const savedCrops =
      localStorage.getItem("farmerCrops");

    if (!savedCrops) {
      setCrop(null);
      setLoading(false);
      return;
    }

    try {
      const crops: Crop[] =
        JSON.parse(savedCrops);

      /*
        IMPORTANT:

        We do NOT filter by crop name.

        Any crop stored inside farmerCrops
        can open this page.
      */

      const selectedId =
        Array.isArray(params.id)
          ? params.id[0]
          : params.id;

      const selectedCrop =
        crops.find(
          (item) =>
            String(item.id) ===
            String(selectedId)
        );

      if (selectedCrop) {
        setCrop(selectedCrop);
      } else {
        setCrop(null);
      }
    } catch (error) {
      console.error(
        "Error reading farmerCrops:",
        error
      );

      setCrop(null);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  /* =======================================================
     TRANSLATION
  ======================================================= */

  const t = translations[language];

  /*
    IMPORTANT:

    NO crop-specific logic.

    No:
      wheat
      rice
      maize
      potato
      sugarcane
      tomato
      onion
      cotton
      etc.

    Every crop receives generic irrigation guidance.

    This means the page supports UNLIMITED crop names.
  */

  const getCropAdvice = (): IrrigationAdvice => {
    return {
      water: t.genericWater,
      frequency: t.genericFrequency,
      bestTime: t.genericBestTime,
      warning: t.genericWarning,
    };
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="text-6xl mb-4">
            💧
          </div>

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
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">
            🌱
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.cropNotFound}
          </h1>

          <button
            onClick={() =>
              router.push("/crops")
            }
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 transition"
          >
            ← {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     ADVICE
  ======================================================= */

  const advice = getCropAdvice();

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          onClick={() =>
            router.push(
              `/crops/${crop.id}`
            )
          }
          className="text-green-700 font-semibold mb-6 hover:text-green-900 transition"
        >
          ← {t.backTo} {crop.crop}
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-5xl shrink-0">
              💧
            </div>

            <div className="min-w-0">

              <p className="text-sm text-green-600 font-semibold">
                {crop.season} {t.season}
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1 break-words">
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

        {/* =================================================
            MAIN RECOMMENDATION
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            💧 {t.recommendation}
          </h2>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {advice.water}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

            {/* =============================================
                FREQUENCY
            ============================================= */}

            <div className="bg-green-50 rounded-2xl p-5">

              <div className="text-3xl mb-3">
                📅
              </div>

              <h3 className="text-lg font-bold text-green-800">
                {t.whenToIrrigate}
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {advice.frequency}
              </p>

            </div>

            {/* =============================================
                BEST TIME
            ============================================= */}

            <div className="bg-green-50 rounded-2xl p-5">

              <div className="text-3xl mb-3">
                🌅
              </div>

              <h3 className="text-lg font-bold text-green-800">
                {t.bestTime}
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {advice.bestTime}
              </p>

            </div>

          </div>
        </div>

        {/* =================================================
            WARNING
        ================================================= */}

        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7 mb-8">

          <div className="flex gap-4">

            <div className="text-4xl shrink-0">
              ⚠️
            </div>

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

        {/* =================================================
            PRACTICAL TIPS
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            🌱 {t.waterManagement}
          </h2>

          <div className="space-y-4 mt-6">

            {/* =============================================
                SOIL
            ============================================= */}

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">

              <div className="text-3xl shrink-0">
                👆
              </div>

              <div>

                <h3 className="font-bold text-green-800">
                  {t.checkSoil}
                </h3>

                <p className="text-gray-600 mt-1 leading-relaxed">
                  {t.checkSoilDesc}
                </p>

              </div>

            </div>

            {/* =============================================
                RAIN
            ============================================= */}

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">

              <div className="text-3xl shrink-0">
                🌧️
              </div>

              <div>

                <h3 className="font-bold text-green-800">
                  {t.checkRainfall}
                </h3>

                <p className="text-gray-600 mt-1 leading-relaxed">
                  {t.checkRainfallDesc}
                </p>

              </div>

            </div>

            {/* =============================================
                WATER WASTAGE
            ============================================= */}

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">

              <div className="text-3xl shrink-0">
                💦
              </div>

              <div>

                <h3 className="font-bold text-green-800">
                  {t.avoidWastage}
                </h3>

                <p className="text-gray-600 mt-1 leading-relaxed">
                  {t.avoidWastageDesc}
                </p>

              </div>

            </div>

            {/* =============================================
                CROP STAGE
            ============================================= */}

            <div className="flex gap-4 bg-green-50 rounded-2xl p-5">

              <div className="text-3xl shrink-0">
                🌾
              </div>

              <div>

                <h3 className="font-bold text-green-800">
                  {t.cropStage}
                </h3>

                <p className="text-gray-600 mt-1 leading-relaxed">
                  {t.cropStageDesc}
                </p>

              </div>

            </div>

          </div>
        </div>

        {/* =================================================
            CROP DETAILS
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7">

          <h2 className="text-2xl font-bold text-green-800 mb-5">
            🌾 {t.cropDetails}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* =============================================
                CROP
            ============================================= */}

            <div className="bg-green-50 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                {t.crop}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1 break-words">
                {crop.crop}
              </p>

            </div>

            {/* =============================================
                SEASON
            ============================================= */}

            <div className="bg-green-50 rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                {t.season}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1 break-words">
                {crop.season}
              </p>

            </div>

            {/* =============================================
                LAND
            ============================================= */}

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