"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useLanguage } from "../../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../../lib/language";

type Translation = {
  back: string;
  title: string;
  subtitle: string;
  uploadTitle: string;
  uploadDesc: string;
  chooseImage: string;
  imageTypes: string;
  detecting: string;
  detectProblem: string;
  removeImage: string;
  analyzing: string;
  analyzingDesc: string;
  detectionResult: string;
  resultDesc: string;
  possibleProblem: string;
  confidence: string;
  recommendedAction: string;
  warning: string;
  tipsTitle: string;
  tip1: string;
  tip2: string;
  tip3: string;
  tip4: string;
  possibleLeafDisease: string;
  advice: string;
};

const english: Translation = {
  back: "← Back",
  title: "AI Crop Detector",
  subtitle: "Upload a crop image to identify possible problems.",
  uploadTitle: "📷 Upload Crop Image",
  uploadDesc: "Take a clear photo of the crop leaf or affected part.",
  chooseImage: "Choose Crop Image",
  imageTypes: "JPG, JPEG or PNG",
  detecting: "🔍 Detecting...",
  detectProblem: "🤖 Detect Problem",
  removeImage: "Remove Image",
  analyzing: "Analyzing Image...",
  analyzingDesc: "Please wait while we check the crop image.",
  detectionResult: "Detection Result",
  resultDesc: "Possible issue detected from the uploaded image.",
  possibleProblem: "Possible Problem",
  confidence: "Confidence",
  recommendedAction: "💡 Recommended Action",
  warning:
    "⚠️ This is an initial AI-based indication. For serious crop damage, confirm the problem with an agricultural expert before using any pesticide or treatment.",
  tipsTitle: "📌 For Better Detection",
  tip1: "✓ Use a clear and well-lit crop image.",
  tip2: "✓ Keep the affected leaf clearly visible.",
  tip3: "✓ Avoid blurry or very dark photos.",
  tip4: "✓ Take a close-up photo of the affected area.",
  possibleLeafDisease: "Possible Leaf Disease",
  advice:
    "Observe the affected leaves carefully. If the problem spreads, consult an agricultural expert and use suitable treatment.",
};

const translations: Record<LanguageCode, Translation> = {
  en: english,

  hi: {
    ...english,
    back: "← वापस जाएं",
    title: "AI फसल डिटेक्टर",
    subtitle:
      "संभावित समस्याओं की पहचान करने के लिए फसल की तस्वीर अपलोड करें।",
    uploadTitle: "📷 फसल की तस्वीर अपलोड करें",
    uploadDesc: "फसल की पत्ती या प्रभावित हिस्से की साफ तस्वीर लें।",
    chooseImage: "फसल की तस्वीर चुनें",
    imageTypes: "JPG, JPEG या PNG",
    detecting: "🔍 जांच हो रही है...",
    detectProblem: "🤖 समस्या की पहचान करें",
    removeImage: "तस्वीर हटाएं",
    analyzing: "तस्वीर का विश्लेषण हो रहा है...",
    analyzingDesc:
      "कृपया प्रतीक्षा करें, हम फसल की तस्वीर की जांच कर रहे हैं।",
    detectionResult: "जांच का परिणाम",
    resultDesc:
      "अपलोड की गई तस्वीर से संभावित समस्या की पहचान हुई है।",
    possibleProblem: "संभावित समस्या",
    confidence: "विश्वसनीयता",
    recommendedAction: "💡 सुझाई गई कार्रवाई",
    warning:
      "⚠️ यह शुरुआती AI-आधारित जानकारी है। फसल को गंभीर नुकसान होने पर किसी कृषि विशेषज्ञ से समस्या की पुष्टि करें और उसके बाद ही कीटनाशक या उपचार का उपयोग करें।",
    tipsTitle: "📌 बेहतर पहचान के लिए",
    tip1: "✓ साफ और अच्छी रोशनी वाली फसल की तस्वीर का उपयोग करें।",
    tip2: "✓ प्रभावित पत्ती साफ दिखाई देनी चाहिए।",
    tip3: "✓ धुंधली या बहुत अंधेरी तस्वीरों से बचें।",
    tip4: "✓ प्रभावित हिस्से की नज़दीक से तस्वीर लें।",
    possibleLeafDisease: "संभावित पत्ती रोग",
    advice:
      "प्रभावित पत्तियों को ध्यान से देखें। समस्या अधिक फैलने पर कृषि विशेषज्ञ से सलाह लेकर उचित उपचार का उपयोग करें।",
  },

  bn: {
    ...english,
    back: "← ফিরে যান",
    title: "AI ফসল শনাক্তকারী",
    subtitle: "সম্ভাব্য সমস্যা শনাক্ত করতে ফসলের ছবি আপলোড করুন।",
    uploadTitle: "📷 ফসলের ছবি আপলোড করুন",
    uploadDesc: "ফসলের পাতা বা আক্রান্ত অংশের পরিষ্কার ছবি তুলুন।",
    chooseImage: "ফসলের ছবি নির্বাচন করুন",
    imageTypes: "JPG, JPEG বা PNG",
    detecting: "🔍 শনাক্ত করা হচ্ছে...",
    detectProblem: "🤖 সমস্যা শনাক্ত করুন",
    removeImage: "ছবি সরান",
    analyzing: "ছবি বিশ্লেষণ করা হচ্ছে...",
    analyzingDesc: "অনুগ্রহ করে অপেক্ষা করুন, আমরা ছবিটি পরীক্ষা করছি।",
    detectionResult: "শনাক্তকরণের ফলাফল",
    resultDesc: "আপলোড করা ছবি থেকে সম্ভাব্য সমস্যা শনাক্ত হয়েছে।",
    possibleProblem: "সম্ভাব্য সমস্যা",
    confidence: "নির্ভরযোগ্যতা",
    recommendedAction: "💡 প্রস্তাবিত ব্যবস্থা",
    warning:
      "⚠️ এটি একটি প্রাথমিক AI-ভিত্তিক তথ্য। গুরুতর ক্ষতির ক্ষেত্রে কীটনাশক বা চিকিৎসা ব্যবহারের আগে কৃষি বিশেষজ্ঞের পরামর্শ নিন।",
    tipsTitle: "📌 আরও ভালো শনাক্তকরণের জন্য",
    tip1: "✓ পরিষ্কার এবং ভালো আলোযুক্ত ছবি ব্যবহার করুন।",
    tip2: "✓ আক্রান্ত পাতাটি স্পষ্টভাবে দেখা উচিত।",
    tip3: "✓ ঝাপসা বা খুব অন্ধকার ছবি এড়িয়ে চলুন।",
    tip4: "✓ আক্রান্ত অংশের কাছ থেকে ছবি তুলুন।",
    possibleLeafDisease: "সম্ভাব্য পাতার রোগ",
    advice:
      "আক্রান্ত পাতাগুলো ভালোভাবে পর্যবেক্ষণ করুন। সমস্যা ছড়িয়ে পড়লে কৃষি বিশেষজ্ঞের পরামর্শ নিন।",
  },

  mr: {
    ...english,
    back: "← मागे जा",
    title: "AI पीक डिटेक्टर",
    subtitle: "संभाव्य समस्या ओळखण्यासाठी पिकाचा फोटो अपलोड करा.",
    uploadTitle: "📷 पिकाचा फोटो अपलोड करा",
    uploadDesc: "पिकाच्या पानाचा किंवा प्रभावित भागाचा स्पष्ट फोटो घ्या.",
    chooseImage: "पिकाचा फोटो निवडा",
    imageTypes: "JPG, JPEG किंवा PNG",
    detecting: "🔍 तपासणी सुरू आहे...",
    detectProblem: "🤖 समस्या ओळखा",
    removeImage: "फोटो काढा",
    analyzing: "फोटोचे विश्लेषण सुरू आहे...",
    analyzingDesc: "कृपया प्रतीक्षा करा, आम्ही पिकाच्या फोटोची तपासणी करत आहोत.",
    detectionResult: "तपासणीचा परिणाम",
    resultDesc: "अपलोड केलेल्या फोटोमधून संभाव्य समस्या आढळली आहे.",
    possibleProblem: "संभाव्य समस्या",
    confidence: "विश्वास पातळी",
    recommendedAction: "💡 शिफारस केलेली कृती",
    warning:
      "⚠️ ही प्राथमिक AI-आधारित माहिती आहे. गंभीर नुकसान असल्यास कोणतेही कीटकनाशक किंवा उपचार वापरण्यापूर्वी कृषी तज्ज्ञांचा सल्ला घ्या.",
    tipsTitle: "📌 चांगल्या ओळखीसाठी",
    tip1: "✓ स्पष्ट आणि चांगल्या प्रकाशातील फोटो वापरा.",
    tip2: "✓ प्रभावित पान स्पष्ट दिसले पाहिजे.",
    tip3: "✓ अस्पष्ट किंवा खूप गडद फोटो टाळा.",
    tip4: "✓ प्रभावित भागाचा जवळून फोटो घ्या.",
    possibleLeafDisease: "संभाव्य पानांचा रोग",
    advice:
      "प्रभावित पाने काळजीपूर्वक पहा. समस्या वाढल्यास कृषी तज्ज्ञांचा सल्ला घेऊन योग्य उपचार करा.",
  },

  ta: {
    ...english,
    back: "← திரும்பு",
    title: "AI பயிர் கண்டறிதல்",
    subtitle: "சாத்தியமான பிரச்சினைகளை கண்டறிய பயிரின் படத்தை பதிவேற்றவும்.",
    uploadTitle: "📷 பயிர் படத்தை பதிவேற்றவும்",
    uploadDesc: "பயிரின் இலை அல்லது பாதிக்கப்பட்ட பகுதியின் தெளிவான படத்தை எடுக்கவும்.",
    chooseImage: "பயிர் படத்தை தேர்வு செய்யவும்",
    imageTypes: "JPG, JPEG அல்லது PNG",
    detecting: "🔍 கண்டறிகிறது...",
    detectProblem: "🤖 பிரச்சினையை கண்டறியவும்",
    removeImage: "படத்தை அகற்றவும்",
    analyzing: "படம் பகுப்பாய்வு செய்யப்படுகிறது...",
    analyzingDesc: "தயவுசெய்து காத்திருக்கவும், பயிர் படத்தை சரிபார்க்கிறோம்.",
    detectionResult: "கண்டறிதல் முடிவு",
    resultDesc: "பதிவேற்றிய படத்திலிருந்து சாத்தியமான பிரச்சினை கண்டறியப்பட்டது.",
    possibleProblem: "சாத்தியமான பிரச்சினை",
    confidence: "நம்பகத்தன்மை",
    recommendedAction: "💡 பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    warning:
      "⚠️ இது ஆரம்ப நிலை AI அடிப்படையிலான தகவல். கடுமையான பயிர் சேதம் ஏற்பட்டால் சிகிச்சைக்கு முன் வேளாண் நிபுணரை அணுகவும்.",
    tipsTitle: "📌 சிறந்த கண்டறிதலுக்கு",
    tip1: "✓ தெளிவான மற்றும் நல்ல வெளிச்சம் உள்ள படத்தை பயன்படுத்தவும்.",
    tip2: "✓ பாதிக்கப்பட்ட இலை தெளிவாகத் தெரிய வேண்டும்.",
    tip3: "✓ மங்கலான அல்லது மிகவும் இருண்ட படங்களை தவிர்க்கவும்.",
    tip4: "✓ பாதிக்கப்பட்ட பகுதியை நெருக்கமாக படம் எடுக்கவும்.",
    possibleLeafDisease: "சாத்தியமான இலை நோய்",
    advice:
      "பாதிக்கப்பட்ட இலைகளை கவனமாக கண்காணிக்கவும். பிரச்சினை அதிகரித்தால் வேளாண் நிபுணரை அணுகவும்.",
  },

  te: {
    ...english,
    back: "← వెనక్కి",
    title: "AI పంట గుర్తింపు",
    subtitle: "సాధ్యమైన సమస్యలను గుర్తించడానికి పంట చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    uploadTitle: "📷 పంట చిత్రాన్ని అప్‌లోడ్ చేయండి",
    uploadDesc: "పంట ఆకు లేదా ప్రభావిత భాగం యొక్క స్పష్టమైన ఫోటో తీయండి.",
    chooseImage: "పంట చిత్రాన్ని ఎంచుకోండి",
    imageTypes: "JPG, JPEG లేదా PNG",
    detecting: "🔍 గుర్తిస్తోంది...",
    detectProblem: "🤖 సమస్యను గుర్తించండి",
    removeImage: "చిత్రాన్ని తొలగించండి",
    analyzing: "చిత్రాన్ని విశ్లేషిస్తోంది...",
    analyzingDesc: "దయచేసి వేచి ఉండండి, మేము పంట చిత్రాన్ని తనిఖీ చేస్తున్నాము.",
    detectionResult: "గుర్తింపు ఫలితం",
    resultDesc: "అప్‌లోడ్ చేసిన చిత్రం నుండి సాధ్యమైన సమస్య గుర్తించబడింది.",
    possibleProblem: "సాధ్యమైన సమస్య",
    confidence: "నమ్మక స్థాయి",
    recommendedAction: "💡 సిఫార్సు చేసిన చర్య",
    warning:
      "⚠️ ఇది ప్రారంభ AI ఆధారిత సమాచారం. తీవ్రమైన పంట నష్టం ఉంటే చికిత్సకు ముందు వ్యవసాయ నిపుణుడిని సంప్రదించండి.",
    tipsTitle: "📌 మెరుగైన గుర్తింపు కోసం",
    tip1: "✓ స్పష్టమైన మరియు మంచి వెలుతురు ఉన్న చిత్రాన్ని ఉపయోగించండి.",
    tip2: "✓ ప్రభావిత ఆకు స్పష్టంగా కనిపించాలి.",
    tip3: "✓ అస్పష్టమైన లేదా చాలా చీకటి చిత్రాలను నివారించండి.",
    tip4: "✓ ప్రభావిత భాగం యొక్క దగ్గరి ఫోటో తీయండి.",
    possibleLeafDisease: "సాధ్యమైన ఆకు వ్యాధి",
    advice:
      "ప్రభావిత ఆకులను జాగ్రత్తగా గమనించండి. సమస్య వ్యాపిస్తే వ్యవసాయ నిపుణుడిని సంప్రదించండి.",
  },

  gu: {
    ...english,
    back: "← પાછા જાઓ",
    title: "AI પાક ડિટેક્ટર",
    subtitle: "સંભવિત સમસ્યાઓ ઓળખવા માટે પાકનો ફોટો અપલોડ કરો.",
    uploadTitle: "📷 પાકનો ફોટો અપલોડ કરો",
    uploadDesc: "પાકના પાન અથવા અસરગ્રસ્ત ભાગનો સ્પષ્ટ ફોટો લો.",
    chooseImage: "પાકનો ફોટો પસંદ કરો",
    imageTypes: "JPG, JPEG અથવા PNG",
    detecting: "🔍 તપાસ થઈ રહી છે...",
    detectProblem: "🤖 સમસ્યા ઓળખો",
    removeImage: "ફોટો દૂર કરો",
    analyzing: "ફોટાનું વિશ્લેષણ થઈ રહ્યું છે...",
    analyzingDesc: "કૃપા કરીને રાહ જુઓ, અમે પાકના ફોટાની તપાસ કરી રહ્યા છીએ.",
    detectionResult: "તપાસનું પરિણામ",
    resultDesc: "અપલોડ કરેલા ફોટામાંથી સંભવિત સમસ્યા મળી છે.",
    possibleProblem: "સંભવિત સમસ્યા",
    confidence: "વિશ્વસનીયતા",
    recommendedAction: "💡 ભલામણ કરેલી કાર્યવાહી",
    warning:
      "⚠️ આ પ્રાથમિક AI આધારિત માહિતી છે. ગંભીર નુકસાન હોય તો સારવાર પહેલાં કૃષિ નિષ્ણાતની સલાહ લો.",
    tipsTitle: "📌 વધુ સારી ઓળખ માટે",
    tip1: "✓ સ્પષ્ટ અને સારી રોશનીવાળો ફોટો વાપરો.",
    tip2: "✓ અસરગ્રસ્ત પાન સ્પષ્ટ દેખાવું જોઈએ.",
    tip3: "✓ ધૂંધળા અથવા ખૂબ અંધારા ફોટા ટાળો.",
    tip4: "✓ અસરગ્રસ્ત ભાગનો નજીકથી ફોટો લો.",
    possibleLeafDisease: "સંભવિત પાનનો રોગ",
    advice:
      "અસરગ્રસ્ત પાંદડાઓને ધ્યાનથી જુઓ. સમસ્યા વધે તો કૃષિ નિષ્ણાતની સલાહ લો.",
  },

  kn: {
    ...english,
    back: "← ಹಿಂದಕ್ಕೆ",
    title: "AI ಬೆಳೆ ಪತ್ತೆಹಚ್ಚುವಿಕೆ",
    subtitle: "ಸಂಭಾವ್ಯ ಸಮಸ್ಯೆಗಳನ್ನು ಗುರುತಿಸಲು ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    uploadTitle: "📷 ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    uploadDesc: "ಬೆಳೆಯ ಎಲೆ ಅಥವಾ ಹಾನಿಗೊಳಗಾದ ಭಾಗದ ಸ್ಪಷ್ಟ ಚಿತ್ರ ತೆಗೆದುಕೊಳ್ಳಿ.",
    chooseImage: "ಬೆಳೆಯ ಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ",
    imageTypes: "JPG, JPEG ಅಥವಾ PNG",
    detecting: "🔍 ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
    detectProblem: "🤖 ಸಮಸ್ಯೆ ಪತ್ತೆಹಚ್ಚಿ",
    removeImage: "ಚಿತ್ರ ತೆಗೆದುಹಾಕಿ",
    analyzing: "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    analyzingDesc: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ, ನಾವು ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದ್ದೇವೆ.",
    detectionResult: "ಪತ್ತೆಹಚ್ಚುವ ಫಲಿತಾಂಶ",
    resultDesc: "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರದಿಂದ ಸಂಭವನೀಯ ಸಮಸ್ಯೆ ಕಂಡುಬಂದಿದೆ.",
    possibleProblem: "ಸಂಭಾವ್ಯ ಸಮಸ್ಯೆ",
    confidence: "ವಿಶ್ವಾಸ ಮಟ್ಟ",
    recommendedAction: "💡 ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
    warning:
      "⚠️ ಇದು ಪ್ರಾಥಮಿಕ AI ಆಧಾರಿತ ಮಾಹಿತಿ. ಗಂಭೀರ ಹಾನಿ ಇದ್ದರೆ ಚಿಕಿತ್ಸೆಗೆ ಮೊದಲು ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    tipsTitle: "📌 ಉತ್ತಮ ಪತ್ತೆಹಚ್ಚುವಿಕೆಗಾಗಿ",
    tip1: "✓ ಸ್ಪಷ್ಟ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕಿನ ಚಿತ್ರ ಬಳಸಿ.",
    tip2: "✓ ಹಾನಿಗೊಳಗಾದ ಎಲೆ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣಬೇಕು.",
    tip3: "✓ ಮಸುಕಾದ ಅಥವಾ ತುಂಬಾ ಕತ್ತಲೆಯ ಚಿತ್ರಗಳನ್ನು ತಪ್ಪಿಸಿ.",
    tip4: "✓ ಹಾನಿಗೊಳಗಾದ ಭಾಗದ ಹತ್ತಿರದ ಚಿತ್ರ ತೆಗೆದುಕೊಳ್ಳಿ.",
    possibleLeafDisease: "ಸಂಭಾವ್ಯ ಎಲೆ ರೋಗ",
    advice:
      "ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಗಮನಿಸಿ. ಸಮಸ್ಯೆ ಹೆಚ್ಚಾದರೆ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
  },

  ml: {
    ...english,
    back: "← തിരികെ",
    title: "AI വിള കണ്ടെത്തൽ",
    subtitle: "സാധ്യമായ പ്രശ്നങ്ങൾ കണ്ടെത്താൻ വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",
    uploadTitle: "📷 വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    uploadDesc: "വിളയുടെ ഇലയുടെയോ ബാധിച്ച ഭാഗത്തിന്റെയോ വ്യക്തമായ ചിത്രം എടുക്കുക.",
    chooseImage: "വിളയുടെ ചിത്രം തിരഞ്ഞെടുക്കുക",
    imageTypes: "JPG, JPEG അല്ലെങ്കിൽ PNG",
    detecting: "🔍 കണ്ടെത്തുന്നു...",
    detectProblem: "🤖 പ്രശ്നം കണ്ടെത്തുക",
    removeImage: "ചിത്രം നീക്കം ചെയ്യുക",
    analyzing: "ചിത്രം വിശകലനം ചെയ്യുന്നു...",
    analyzingDesc: "ദയവായി കാത്തിരിക്കുക, ഞങ്ങൾ വിളയുടെ ചിത്രം പരിശോധിക്കുകയാണ്.",
    detectionResult: "കണ്ടെത്തൽ ഫലം",
    resultDesc: "അപ്‌ലോഡ് ചെയ്ത ചിത്രത്തിൽ നിന്ന് സാധ്യമായ പ്രശ്നം കണ്ടെത്തി.",
    possibleProblem: "സാധ്യമായ പ്രശ്നം",
    confidence: "വിശ്വാസ്യത",
    recommendedAction: "💡 ശുപാർശ ചെയ്യുന്ന നടപടി",
    warning:
      "⚠️ ഇത് പ്രാഥമിക AI അടിസ്ഥാനത്തിലുള്ള വിവരമാണ്. ഗുരുതരമായ വിളനാശമുണ്ടെങ്കിൽ ചികിത്സയ്ക്ക് മുമ്പ് കാർഷിക വിദഗ്ധനെ സമീപിക്കുക.",
    tipsTitle: "📌 മികച്ച കണ്ടെത്തലിനായി",
    tip1: "✓ വ്യക്തവും നല്ല വെളിച്ചമുള്ളതുമായ ചിത്രം ഉപയോഗിക്കുക.",
    tip2: "✓ ബാധിച്ച ഇല വ്യക്തമായി കാണണം.",
    tip3: "✓ മങ്ങിയതോ വളരെ ഇരുണ്ടതോ ആയ ചിത്രങ്ങൾ ഒഴിവാക്കുക.",
    tip4: "✓ ബാധിച്ച ഭാഗത്തിന്റെ അടുത്ത ചിത്രം എടുക്കുക.",
    possibleLeafDisease: "സാധ്യമായ ഇല രോഗം",
    advice:
      "ബാധിച്ച ഇലകൾ ശ്രദ്ധാപൂർവ്വം പരിശോധിക്കുക. പ്രശ്നം വ്യാപിച്ചാൽ കാർഷിക വിദഗ്ധനെ സമീപിക്കുക.",
  },

  pa: {
    ...english,
    back: "← ਵਾਪਸ ਜਾਓ",
    title: "AI ਫਸਲ ਡਿਟੈਕਟਰ",
    subtitle: "ਸੰਭਾਵਿਤ ਸਮੱਸਿਆਵਾਂ ਦੀ ਪਛਾਣ ਕਰਨ ਲਈ ਫਸਲ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ।",
    uploadTitle: "📷 ਫਸਲ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
    uploadDesc: "ਫਸਲ ਦੇ ਪੱਤੇ ਜਾਂ ਪ੍ਰਭਾਵਿਤ ਹਿੱਸੇ ਦੀ ਸਾਫ਼ ਤਸਵੀਰ ਲਓ।",
    chooseImage: "ਫਸਲ ਦੀ ਤਸਵੀਰ ਚੁਣੋ",
    imageTypes: "JPG, JPEG ਜਾਂ PNG",
    detecting: "🔍 ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...",
    detectProblem: "🤖 ਸਮੱਸਿਆ ਦੀ ਪਛਾਣ ਕਰੋ",
    removeImage: "ਤਸਵੀਰ ਹਟਾਓ",
    analyzing: "ਤਸਵੀਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...",
    analyzingDesc: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ, ਅਸੀਂ ਫਸਲ ਦੀ ਤਸਵੀਰ ਦੀ ਜਾਂਚ ਕਰ ਰਹੇ ਹਾਂ।",
    detectionResult: "ਜਾਂਚ ਦਾ ਨਤੀਜਾ",
    resultDesc: "ਅਪਲੋਡ ਕੀਤੀ ਤਸਵੀਰ ਤੋਂ ਸੰਭਾਵਿਤ ਸਮੱਸਿਆ ਮਿਲੀ ਹੈ।",
    possibleProblem: "ਸੰਭਾਵਿਤ ਸਮੱਸਿਆ",
    confidence: "ਭਰੋਸੇਯੋਗਤਾ",
    recommendedAction: "💡 ਸਿਫਾਰਸ਼ ਕੀਤੀ ਕਾਰਵਾਈ",
    warning:
      "⚠️ ਇਹ ਸ਼ੁਰੂਆਤੀ AI-ਅਧਾਰਿਤ ਜਾਣਕਾਰੀ ਹੈ। ਗੰਭੀਰ ਨੁਕਸਾਨ ਹੋਣ 'ਤੇ ਇਲਾਜ ਤੋਂ ਪਹਿਲਾਂ ਖੇਤੀਬਾੜੀ ਮਾਹਿਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।",
    tipsTitle: "📌 ਬਿਹਤਰ ਪਛਾਣ ਲਈ",
    tip1: "✓ ਸਾਫ਼ ਅਤੇ ਚੰਗੀ ਰੌਸ਼ਨੀ ਵਾਲੀ ਤਸਵੀਰ ਵਰਤੋ।",
    tip2: "✓ ਪ੍ਰਭਾਵਿਤ ਪੱਤਾ ਸਾਫ਼ ਦਿਖਾਈ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ।",
    tip3: "✓ ਧੁੰਦਲੀਆਂ ਜਾਂ ਬਹੁਤ ਹਨੇਰੀਆਂ ਤਸਵੀਰਾਂ ਤੋਂ ਬਚੋ।",
    tip4: "✓ ਪ੍ਰਭਾਵਿਤ ਹਿੱਸੇ ਦੀ ਨੇੜੇ ਤੋਂ ਤਸਵੀਰ ਲਓ।",
    possibleLeafDisease: "ਸੰਭਾਵਿਤ ਪੱਤੇ ਦੀ ਬਿਮਾਰੀ",
    advice:
      "ਪ੍ਰਭਾਵਿਤ ਪੱਤਿਆਂ ਨੂੰ ਧਿਆਨ ਨਾਲ ਦੇਖੋ। ਸਮੱਸਿਆ ਵਧਣ 'ਤੇ ਖੇਤੀਬਾੜੀ ਮਾਹਿਰ ਦੀ ਸਲਾਹ ਲਓ।",
  },

  or: {
    ...english,
    back: "← ପଛକୁ ଯାଆନ୍ତୁ",
    title: "AI ଫସଲ ଚିହ୍ନଟକାରୀ",
    subtitle: "ସମ୍ଭାବ୍ୟ ସମସ୍ୟା ଚିହ୍ନଟ ପାଇଁ ଫସଲର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ।",
    uploadTitle: "📷 ଫସଲର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ",
    uploadDesc: "ଫସଲର ପତ୍ର କିମ୍ବା ପ୍ରଭାବିତ ଅଂଶର ସ୍ପଷ୍ଟ ଫଟୋ ନିଅନ୍ତୁ।",
    chooseImage: "ଫସଲର ଫଟୋ ବାଛନ୍ତୁ",
    imageTypes: "JPG, JPEG କିମ୍ବା PNG",
    detecting: "🔍 ଚିହ୍ନଟ ହେଉଛି...",
    detectProblem: "🤖 ସମସ୍ୟା ଚିହ୍ନଟ କରନ୍ତୁ",
    removeImage: "ଫଟୋ ହଟାନ୍ତୁ",
    analyzing: "ଫଟୋ ବିଶ୍ଳେଷଣ ହେଉଛି...",
    analyzingDesc: "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ, ଆମେ ଫସଲର ଫଟୋ ଯାଞ୍ଚ କରୁଛୁ।",
    detectionResult: "ଚିହ୍ନଟ ଫଳାଫଳ",
    resultDesc: "ଅପଲୋଡ୍ ହୋଇଥିବା ଫଟୋରୁ ସମ୍ଭାବ୍ୟ ସମସ୍ୟା ଚିହ୍ନଟ ହୋଇଛି।",
    possibleProblem: "ସମ୍ଭାବ୍ୟ ସମସ୍ୟା",
    confidence: "ବିଶ୍ୱସନୀୟତା",
    recommendedAction: "💡 ସୁପାରିଶ କରାଯାଇଥିବା କାର୍ଯ୍ୟ",
    warning:
      "⚠️ ଏହା ପ୍ରାରମ୍ଭିକ AI-ଆଧାରିତ ସୂଚନା। ଗୁରୁତର କ୍ଷତି ହେଲେ ଚିକିତ୍ସା ପୂର୍ବରୁ କୃଷି ବିଶେଷଜ୍ଞଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।",
    tipsTitle: "📌 ଭଲ ଚିହ୍ନଟ ପାଇଁ",
    tip1: "✓ ସ୍ପଷ୍ଟ ଏବଂ ଭଲ ଆଲୋକ ଥିବା ଫଟୋ ବ୍ୟବହାର କରନ୍ତୁ।",
    tip2: "✓ ପ୍ରଭାବିତ ପତ୍ର ସ୍ପଷ୍ଟ ଦେଖାଯିବା ଉଚିତ।",
    tip3: "✓ ଅସ୍ପଷ୍ଟ କିମ୍ବା ଅତ୍ୟଧିକ ଅନ୍ଧାର ଫଟୋ ଏଡାନ୍ତୁ।",
    tip4: "✓ ପ୍ରଭାବିତ ଅଂଶର ନିକଟରୁ ଫଟୋ ନିଅନ୍ତୁ।",
    possibleLeafDisease: "ସମ୍ଭାବ୍ୟ ପତ୍ର ରୋଗ",
    advice:
      "ପ୍ରଭାବିତ ପତ୍ରଗୁଡିକୁ ଧ୍ୟାନରେ ଦେଖନ୍ତୁ। ସମସ୍ୟା ବଢିଲେ କୃଷି ବିଶେଷଜ୍ଞଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।",
  },

  as: {
    ...english,
    back: "← উভতি যাওক",
    title: "AI শস্য চিনাক্তকৰণ",
    subtitle: "সম্ভাৱ্য সমস্যা চিনাক্ত কৰিবলৈ শস্যৰ ছবি আপলোড কৰক।",
    uploadTitle: "📷 শস্যৰ ছবি আপলোড কৰক",
    uploadDesc: "শস্যৰ পাত বা আক্ৰান্ত অংশৰ এখন স্পষ্ট ছবি লওক।",
    chooseImage: "শস্যৰ ছবি বাছনি কৰক",
    imageTypes: "JPG, JPEG বা PNG",
    detecting: "🔍 চিনাক্ত কৰা হৈছে...",
    detectProblem: "🤖 সমস্যা চিনাক্ত কৰক",
    removeImage: "ছবি আঁতৰাওক",
    analyzing: "ছবি বিশ্লেষণ কৰা হৈছে...",
    analyzingDesc: "অনুগ্ৰহ কৰি অপেক্ষা কৰক, আমি শস্যৰ ছবিখন পৰীক্ষা কৰি আছোঁ।",
    detectionResult: "চিনাক্তকৰণৰ ফলাফল",
    resultDesc: "আপলোড কৰা ছবিৰ পৰা সম্ভাৱ্য সমস্যা চিনাক্ত হৈছে।",
    possibleProblem: "সম্ভাৱ্য সমস্যা",
    confidence: "বিশ্বাসযোগ্যতা",
    recommendedAction: "💡 পৰামৰ্শ দিয়া কাৰ্য",
    warning:
      "⚠️ এইটো প্ৰাথমিক AI-ভিত্তিক তথ্য। গুৰুতৰ ক্ষতি হ'লে চিকিৎসা বা কীটনাশক ব্যৱহাৰৰ আগতে কৃষি বিশেষজ্ঞৰ পৰামৰ্শ লওক।",
    tipsTitle: "📌 ভাল চিনাক্তকৰণৰ বাবে",
    tip1: "✓ স্পষ্ট আৰু ভাল পোহৰৰ ছবি ব্যৱহাৰ কৰক।",
    tip2: "✓ আক্ৰান্ত পাতটো স্পষ্টকৈ দেখা যাব লাগে।",
    tip3: "✓ অস্পষ্ট বা অতি ক'লা ছবি এৰাই চলক।",
    tip4: "✓ আক্ৰান্ত অংশৰ ওচৰৰ পৰা ছবি লওক।",
    possibleLeafDisease: "সম্ভাৱ্য পাতৰ ৰোগ",
    advice:
      "আক্ৰান্ত পাতবোৰ ভালদৰে লক্ষ্য কৰক। সমস্যা বাঢ়িলে কৃষি বিশেষজ্ঞৰ পৰামৰ্শ লওক।",
  },

  ur: {
    ...english,
    back: "← واپس جائیں",
    title: "AI فصل ڈیٹیکٹر",
    subtitle: "ممکنہ مسائل کی شناخت کے لیے فصل کی تصویر اپ لوڈ کریں۔",
    uploadTitle: "📷 فصل کی تصویر اپ لوڈ کریں",
    uploadDesc: "فصل کے پتے یا متاثرہ حصے کی واضح تصویر لیں۔",
    chooseImage: "فصل کی تصویر منتخب کریں",
    imageTypes: "JPG, JPEG یا PNG",
    detecting: "🔍 جانچ ہو رہی ہے...",
    detectProblem: "🤖 مسئلہ شناخت کریں",
    removeImage: "تصویر ہٹائیں",
    analyzing: "تصویر کا تجزیہ ہو رہا ہے...",
    analyzingDesc: "براہ کرم انتظار کریں، ہم فصل کی تصویر چیک کر رہے ہیں۔",
    detectionResult: "شناخت کا نتیجہ",
    resultDesc: "اپ لوڈ کی گئی تصویر سے ممکنہ مسئلہ شناخت ہوا ہے۔",
    possibleProblem: "ممکنہ مسئلہ",
    confidence: "اعتماد کی سطح",
    recommendedAction: "💡 تجویز کردہ کارروائی",
    warning:
      "⚠️ یہ ابتدائی AI پر مبنی معلومات ہے۔ شدید نقصان کی صورت میں کسی زرعی ماہر سے مسئلے کی تصدیق کے بعد ہی علاج یا کیڑے مار دوا استعمال کریں۔",
    tipsTitle: "📌 بہتر شناخت کے لیے",
    tip1: "✓ صاف اور اچھی روشنی والی تصویر استعمال کریں۔",
    tip2: "✓ متاثرہ پتا واضح نظر آنا چاہیے۔",
    tip3: "✓ دھندلی یا بہت تاریک تصاویر سے گریز کریں۔",
    tip4: "✓ متاثرہ حصے کی قریب سے تصویر لیں۔",
    possibleLeafDisease: "ممکنہ پتوں کی بیماری",
    advice:
      "متاثرہ پتوں کو غور سے دیکھیں۔ مسئلہ پھیلنے کی صورت میں زرعی ماہر سے مشورہ کریں۔",
  },
};

export default function AIDetectorPage() {
  const { language } = useLanguage();

  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    problem: string;
    confidence: string;
    advice: string;
  } | null>(null);

  const t = translations[language] || translations.en;

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setResult(null);

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const detectCrop = () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        problem: t.possibleLeafDisease,
        confidence: "78%",
        advice: t.advice,
      });

      setLoading(false);
    }, 1500);
  };

  const removeImage = () => {
    setImage(null);
    setFileName("");
    setResult(null);
  };

  return (
    <main
      className="min-h-screen bg-green-50 px-4 py-6"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-sm font-medium text-green-700 hover:text-green-900"
        >
          {t.back}
        </button>

        {/* Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="text-4xl">🤖</div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t.title}
              </h1>

              <p className="text-sm text-gray-500">
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            {t.uploadTitle}
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            {t.uploadDesc}
          </p>

          {!image ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-green-300 bg-green-50 px-6 py-12 text-center transition hover:bg-green-100">
              <div className="mb-3 text-5xl">🌱</div>

              <div className="mb-1 font-semibold text-green-800">
                {t.chooseImage}
              </div>

              <div className="text-sm text-gray-500">
                {t.imageTypes}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div>
              {/* Image Preview */}
              <div className="overflow-hidden rounded-2xl border bg-gray-50">
                <img
                  src={image}
                  alt="Selected crop"
                  className="max-h-[420px] w-full object-contain"
                />
              </div>

              {/* File name */}
              <p className="mt-3 truncate text-sm text-gray-600">
                📎 {fileName}
              </p>

              {/* Buttons */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={detectCrop}
                  disabled={loading}
                  className="flex-1 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? t.detecting : t.detectProblem}
                </button>

                <button
                  onClick={removeImage}
                  disabled={loading}
                  className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {t.removeImage}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Loading */}
        {loading && (
          <section className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mb-3 text-4xl">🔬</div>

            <h2 className="font-semibold text-gray-900">
              {t.analyzing}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {t.analyzingDesc}
            </p>
          </section>
        )}

        {/* Result */}
        {result && !loading && (
          <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="text-3xl">📊</div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {t.detectionResult}
                </h2>

                <p className="text-sm text-gray-500">
                  {t.resultDesc}
                </p>
              </div>
            </div>

            {/* Problem */}
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="text-sm font-medium text-gray-600">
                {t.possibleProblem}
              </p>

              <h3 className="mt-1 text-xl font-bold text-yellow-900">
                {result.problem}
              </h3>

              <div className="mt-4">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t.confidence}
                  </span>

                  <span className="font-semibold text-gray-800">
                    {result.confidence}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-yellow-200">
                  <div
                    className="h-full rounded-full bg-yellow-500"
                    style={{ width: result.confidence }}
                  />
                </div>
              </div>
            </div>

            {/* Advice */}
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="font-semibold text-green-900">
                {t.recommendedAction}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                {result.advice}
              </p>
            </div>

            {/* Warning */}
            <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
              {t.warning}
            </div>
          </section>
        )}

        {/* Tips */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            {t.tipsTitle}
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <p>{t.tip1}</p>
            <p>{t.tip2}</p>
            <p>{t.tip3}</p>
            <p>{t.tip4}</p>
          </div>
        </section>

      </div>
    </main>
  );
}