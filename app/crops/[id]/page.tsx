"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
};

type Translation = {
  back: string;
  season: string;
  landArea: string;
  services: string;
  servicesDesc: string;
  loading: string;
  pleaseWait: string;
  notFound: string;
  backToCrops: string;
  explore: string;

  mandi: string;
  mandiDesc: string;

  waste: string;
  wasteDesc: string;

  storage: string;
  storageDesc: string;

  disease: string;
  diseaseDesc: string;

  aiDetector: string;
  aiDetectorDesc: string;

  irrigation: string;
  irrigationDesc: string;

  fertilizer: string;
  fertilizerDesc: string;

  weather: string;
  weatherDesc: string;

  price: string;
  priceDesc: string;

  alertMessage: string;
};

const translations: Record<string, Translation> = {
  en: {
    back: "← Back to My Crops",
    season: "Season",
    landArea: "Land Area",
    services: "Services",
    servicesDesc: "Everything you need to manage your crop.",
    loading: "Loading crop...",
    pleaseWait: "Please wait...",
    notFound: "Crop not found",
    backToCrops: "← Back to Crops",
    explore: "Explore →",

    mandi: "Mandi & Market",
    mandiDesc:
      "Check mandi information, nearby markets and selling opportunities.",

    waste: "Waste Utilization",
    wasteDesc:
      "Learn how crop waste can be reused, recycled or converted into useful products.",

    storage: "Preservation & Storage",
    storageDesc:
      "Get guidance on proper storage, preservation and post-harvest handling.",

    disease: "Disease & Pest Detection",
    diseaseDesc:
      "Identify possible crop diseases, pests and damage using AI-based detection.",

    aiDetector: "AI Crop Detector",
    aiDetectorDesc:
      "Upload a crop image to detect disease, damage and possible problems.",

    irrigation: "Irrigation",
    irrigationDesc:
      "Get irrigation guidance based on crop requirements and growing conditions.",

    fertilizer: "Fertilizer & Nutrients",
    fertilizerDesc:
      "Get crop-specific information about nutrients and fertilizer management.",

    weather: "Weather",
    weatherDesc:
      "View weather-related information useful for your crop management.",

    price: "Price Information",
    priceDesc:
      "Explore crop price information and market trends.",

    alertMessage: "will be connected next.",
  },

  hi: {
    back: "← मेरी फसलों पर वापस जाएँ",
    season: "सीजन",
    landArea: "जमीन का क्षेत्रफल",
    services: "सेवाएँ",
    servicesDesc: "आपकी फसल को बेहतर तरीके से संभालने के लिए सभी जरूरी सेवाएँ।",
    loading: "फसल लोड हो रही है...",
    pleaseWait: "कृपया प्रतीक्षा करें...",
    notFound: "फसल नहीं मिली",
    backToCrops: "← फसलों पर वापस जाएँ",
    explore: "जानें →",

    mandi: "मंडी और बाजार",
    mandiDesc:
      "मंडी की जानकारी, आसपास के बाजार और फसल बेचने के अवसर देखें।",

    waste: "फसल अवशेष प्रबंधन",
    wasteDesc:
      "जानें कि फसल के अवशेषों का दोबारा उपयोग, रीसाइक्लिंग या अन्य उपयोगी उत्पादों में कैसे किया जा सकता है।",

    storage: "भंडारण और संरक्षण",
    storageDesc:
      "फसल के सही भंडारण, संरक्षण और कटाई के बाद की देखभाल की जानकारी पाएँ।",

    disease: "रोग और कीट पहचान",
    diseaseDesc:
      "AI की मदद से फसल में संभावित रोग, कीट और नुकसान की पहचान करें।",

    aiDetector: "AI फसल पहचान",
    aiDetectorDesc:
      "फसल की फोटो अपलोड करके रोग, नुकसान और संभावित समस्याओं की पहचान करें।",

    irrigation: "सिंचाई",
    irrigationDesc:
      "फसल की जरूरत और खेती की स्थिति के अनुसार सिंचाई की जानकारी पाएँ।",

    fertilizer: "उर्वरक और पोषक तत्व",
    fertilizerDesc:
      "फसल के अनुसार पोषक तत्वों और उर्वरक प्रबंधन की जानकारी पाएँ।",

    weather: "मौसम",
    weatherDesc:
      "फसल प्रबंधन के लिए उपयोगी मौसम से जुड़ी जानकारी देखें।",

    price: "फसल मूल्य जानकारी",
    priceDesc:
      "फसल के बाजार भाव और कीमतों से जुड़ी जानकारी देखें।",

    alertMessage: "की सेवा जल्द जोड़ी जाएगी।",
  },

  bn: {
    back: "← আমার ফসলে ফিরে যান",
    season: "মরসুম",
    landArea: "জমির পরিমাণ",
    services: "পরিষেবা",
    servicesDesc: "আপনার ফসল পরিচালনার জন্য প্রয়োজনীয় সব পরিষেবা।",
    loading: "ফসল লোড হচ্ছে...",
    pleaseWait: "অনুগ্রহ করে অপেক্ষা করুন...",
    notFound: "ফসল পাওয়া যায়নি",
    backToCrops: "← ফসলে ফিরে যান",
    explore: "দেখুন →",

    mandi: "মাণ্ডি ও বাজার",
    mandiDesc:
      "মাণ্ডির তথ্য, কাছাকাছি বাজার এবং ফসল বিক্রির সুযোগ দেখুন।",

    waste: "ফসলের বর্জ্য ব্যবস্থাপনা",
    wasteDesc:
      "ফসলের অবশিষ্টাংশ কীভাবে পুনরায় ব্যবহার বা পুনর্ব্যবহার করা যায় তা জানুন।",

    storage: "সংরক্ষণ ও মজুত",
    storageDesc:
      "সঠিক সংরক্ষণ এবং ফসল কাটার পর ব্যবস্থাপনার নির্দেশনা পান।",

    disease: "রোগ ও কীট শনাক্তকরণ",
    diseaseDesc:
      "AI ব্যবহার করে ফসলের রোগ, কীট এবং ক্ষতি শনাক্ত করুন।",

    aiDetector: "AI ফসল শনাক্তকরণ",
    aiDetectorDesc:
      "ফসলের ছবি আপলোড করে রোগ, ক্ষতি এবং সম্ভাব্য সমস্যা শনাক্ত করুন।",

    irrigation: "সেচ",
    irrigationDesc:
      "ফসলের প্রয়োজন অনুযায়ী সেচের নির্দেশনা পান।",

    fertilizer: "সার ও পুষ্টি",
    fertilizerDesc:
      "ফসল অনুযায়ী পুষ্টি এবং সার ব্যবস্থাপনার তথ্য পান।",

    weather: "আবহাওয়া",
    weatherDesc:
      "ফসল ব্যবস্থাপনার জন্য দরকারী আবহাওয়ার তথ্য দেখুন।",

    price: "দাম সম্পর্কিত তথ্য",
    priceDesc:
      "ফসলের বাজার মূল্য এবং বাজারের প্রবণতা দেখুন।",

    alertMessage: "পরিষেবাটি শীঘ্রই যোগ করা হবে।",
  },

  mr: {
    back: "← माझ्या पिकांकडे परत जा",
    season: "हंगाम",
    landArea: "जमिनीचे क्षेत्रफळ",
    services: "सेवा",
    servicesDesc: "तुमचे पीक व्यवस्थापित करण्यासाठी आवश्यक सर्व सेवा.",
    loading: "पीक लोड होत आहे...",
    pleaseWait: "कृपया प्रतीक्षा करा...",
    notFound: "पीक सापडले नाही",
    backToCrops: "← पिकांकडे परत जा",
    explore: "पहा →",

    mandi: "बाजार आणि मंडी",
    mandiDesc:
      "मंडीची माहिती, जवळचे बाजार आणि पीक विक्रीच्या संधी पहा.",

    waste: "पीक अवशेष व्यवस्थापन",
    wasteDesc:
      "पीक अवशेषांचा पुनर्वापर किंवा पुनर्चक्रण कसे करावे ते जाणून घ्या.",

    storage: "साठवण आणि संरक्षण",
    storageDesc:
      "योग्य साठवण आणि काढणीनंतरच्या व्यवस्थापनाची माहिती मिळवा.",

    disease: "रोग आणि कीड ओळख",
    diseaseDesc:
      "AI च्या मदतीने पिकातील रोग, कीड आणि नुकसान ओळखा.",

    aiDetector: "AI पीक ओळख",
    aiDetectorDesc:
      "पिकाचा फोटो अपलोड करून रोग, नुकसान आणि समस्या ओळखा.",

    irrigation: "सिंचन",
    irrigationDesc:
      "पिकाच्या गरजेनुसार सिंचनाची माहिती मिळवा.",

    fertilizer: "खत आणि पोषक तत्त्वे",
    fertilizerDesc:
      "पिकानुसार पोषक तत्त्वे आणि खत व्यवस्थापनाची माहिती मिळवा.",

    weather: "हवामान",
    weatherDesc:
      "पीक व्यवस्थापनासाठी उपयुक्त हवामानाची माहिती पहा.",

    price: "किंमत माहिती",
    priceDesc:
      "पिकांच्या बाजारभावाची आणि बाजारातील कलाची माहिती पहा.",

    alertMessage: "सेवा लवकरच जोडली जाईल.",
  },

  ta: {
    back: "← எனது பயிர்களுக்கு திரும்பு",
    season: "பருவம்",
    landArea: "நிலப்பரப்பு",
    services: "சேவைகள்",
    servicesDesc: "உங்கள் பயிரை நிர்வகிக்க தேவையான அனைத்து சேவைகளும்.",
    loading: "பயிர் ஏற்றப்படுகிறது...",
    pleaseWait: "தயவுசெய்து காத்திருக்கவும்...",
    notFound: "பயிர் கிடைக்கவில்லை",
    backToCrops: "← பயிர்களுக்கு திரும்பு",
    explore: "பார்க்கவும் →",

    mandi: "சந்தை மற்றும் மண்டி",
    mandiDesc:
      "மண்டி தகவல், அருகிலுள்ள சந்தைகள் மற்றும் விற்பனை வாய்ப்புகளைப் பார்க்கவும்.",

    waste: "பயிர் கழிவு மேலாண்மை",
    wasteDesc:
      "பயிர் கழிவுகளை மீண்டும் பயன்படுத்துவது மற்றும் மறுசுழற்சி செய்வது எப்படி என்பதை அறியவும்.",

    storage: "சேமிப்பு மற்றும் பாதுகாப்பு",
    storageDesc:
      "சரியான சேமிப்பு மற்றும் அறுவடைக்குப் பிந்தைய மேலாண்மை வழிகாட்டுதலைப் பெறுங்கள்.",

    disease: "நோய் மற்றும் பூச்சி கண்டறிதல்",
    diseaseDesc:
      "AI மூலம் பயிர் நோய்கள், பூச்சிகள் மற்றும் சேதங்களை கண்டறியவும்.",

    aiDetector: "AI பயிர் கண்டறிதல்",
    aiDetectorDesc:
      "பயிரின் புகைப்படத்தை பதிவேற்றி நோய் மற்றும் சேதங்களை கண்டறியவும்.",

    irrigation: "நீர்ப்பாசனம்",
    irrigationDesc:
      "பயிரின் தேவைக்கேற்ப நீர்ப்பாசன வழிகாட்டுதலைப் பெறுங்கள்.",

    fertilizer: "உரம் மற்றும் ஊட்டச்சத்துக்கள்",
    fertilizerDesc:
      "பயிருக்கு தேவையான ஊட்டச்சத்துக்கள் மற்றும் உர மேலாண்மை பற்றிய தகவலைப் பெறுங்கள்.",

    weather: "வானிலை",
    weatherDesc:
      "பயிர் மேலாண்மைக்கு தேவையான வானிலை தகவல்களைப் பார்க்கவும்.",

    price: "விலை தகவல்",
    priceDesc:
      "பயிர்களின் சந்தை விலை மற்றும் சந்தை நிலவரங்களைப் பார்க்கவும்.",

    alertMessage: "சேவை விரைவில் இணைக்கப்படும்.",
  },

  te: {
    back: "← నా పంటలకు తిరిగి వెళ్లండి",
    season: "సీజన్",
    landArea: "భూమి విస్తీర్ణం",
    services: "సేవలు",
    servicesDesc: "మీ పంటను నిర్వహించడానికి అవసరమైన అన్ని సేవలు.",
    loading: "పంట లోడ్ అవుతోంది...",
    pleaseWait: "దయచేసి వేచి ఉండండి...",
    notFound: "పంట కనుగొనబడలేదు",
    backToCrops: "← పంటలకు తిరిగి వెళ్లండి",
    explore: "చూడండి →",

    mandi: "మార్కెట్ మరియు మండీ",
    mandiDesc:
      "మండీ సమాచారం, సమీప మార్కెట్లు మరియు పంట విక్రయ అవకాశాలను చూడండి.",

    waste: "పంట వ్యర్థాల నిర్వహణ",
    wasteDesc:
      "పంట వ్యర్థాలను తిరిగి ఉపయోగించడం మరియు రీసైకిల్ చేయడం గురించి తెలుసుకోండి.",

    storage: "నిల్వ మరియు సంరక్షణ",
    storageDesc:
      "సరైన నిల్వ మరియు పంట కోత తర్వాత నిర్వహణ గురించి మార్గదర్శకత్వం పొందండి.",

    disease: "వ్యాధి మరియు పురుగు గుర్తింపు",
    diseaseDesc:
      "AI సహాయంతో పంట వ్యాధులు, పురుగులు మరియు నష్టాలను గుర్తించండి.",

    aiDetector: "AI పంట గుర్తింపు",
    aiDetectorDesc:
      "పంట ఫోటోను అప్‌లోడ్ చేసి వ్యాధి, నష్టం మరియు సమస్యలను గుర్తించండి.",

    irrigation: "నీటిపారుదల",
    irrigationDesc:
      "పంట అవసరాలకు అనుగుణంగా నీటిపారుదల మార్గదర్శకత్వం పొందండి.",

    fertilizer: "ఎరువులు మరియు పోషకాలు",
    fertilizerDesc:
      "పంటకు అవసరమైన పోషకాలు మరియు ఎరువుల నిర్వహణ సమాచారం పొందండి.",

    weather: "వాతావరణం",
    weatherDesc:
      "పంట నిర్వహణకు ఉపయోగపడే వాతావరణ సమాచారాన్ని చూడండి.",

    price: "ధర సమాచారం",
    priceDesc:
      "పంట మార్కెట్ ధరలు మరియు మార్కెట్ పరిస్థితులను చూడండి.",

    alertMessage: "సేవ త్వరలో జోడించబడుతుంది.",
  },

  gu: {
    back: "← મારા પાક પર પાછા જાઓ",
    season: "મોસમ",
    landArea: "જમીન વિસ્તાર",
    services: "સેવાઓ",
    servicesDesc: "તમારા પાકનું સંચાલન કરવા માટે જરૂરી તમામ સેવાઓ.",
    loading: "પાક લોડ થઈ રહ્યો છે...",
    pleaseWait: "કૃપા કરીને રાહ જુઓ...",
    notFound: "પાક મળ્યો નથી",
    backToCrops: "← પાક પર પાછા જાઓ",
    explore: "જુઓ →",

    mandi: "મંડી અને બજાર",
    mandiDesc:
      "મંડીની માહિતી, નજીકના બજારો અને પાક વેચવાની તકો જુઓ.",

    waste: "પાક કચરો વ્યવસ્થાપન",
    wasteDesc:
      "પાકના અવશેષોનો પુનઃઉપયોગ અને રિસાયકલ કેવી રીતે કરવું તે જાણો.",

    storage: "સંગ્રહ અને સંરક્ષણ",
    storageDesc:
      "યોગ્ય સંગ્રહ અને લણણી પછીના સંચાલન અંગે માર્ગદર્શન મેળવો.",

    disease: "રોગ અને જીવાત ઓળખ",
    diseaseDesc:
      "AI દ્વારા પાકના રોગ, જીવાત અને નુકસાનને ઓળખો.",

    aiDetector: "AI પાક ઓળખ",
    aiDetectorDesc:
      "પાકનો ફોટો અપલોડ કરીને રોગ, નુકસાન અને સમસ્યાઓ ઓળખો.",

    irrigation: "સિંચાઈ",
    irrigationDesc:
      "પાકની જરૂરિયાત મુજબ સિંચાઈ અંગે માર્ગદર્શન મેળવો.",

    fertilizer: "ખાતર અને પોષક તત્વો",
    fertilizerDesc:
      "પાક અનુસાર પોષક તત્વો અને ખાતર વ્યવસ્થાપનની માહિતી મેળવો.",

    weather: "હવામાન",
    weatherDesc:
      "પાક વ્યવસ્થાપન માટે ઉપયોગી હવામાન માહિતી જુઓ.",

    price: "ભાવ માહિતી",
    priceDesc:
      "પાકના બજાર ભાવ અને બજારના વલણની માહિતી જુઓ.",

    alertMessage: "સેવા ટૂંક સમયમાં ઉમેરવામાં આવશે.",
  },

  kn: {
    back: "← ನನ್ನ ಬೆಳೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    season: "ಋತು",
    landArea: "ಭೂಮಿ ವಿಸ್ತೀರ್ಣ",
    services: "ಸೇವೆಗಳು",
    servicesDesc: "ನಿಮ್ಮ ಬೆಳೆ ನಿರ್ವಹಿಸಲು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಸೇವೆಗಳು.",
    loading: "ಬೆಳೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    pleaseWait: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ...",
    notFound: "ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ",
    backToCrops: "← ಬೆಳೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    explore: "ವೀಕ್ಷಿಸಿ →",

    mandi: "ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಮಂಡಿ",
    mandiDesc:
      "ಮಂಡಿ ಮಾಹಿತಿ, ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳು ಮತ್ತು ಮಾರಾಟದ ಅವಕಾಶಗಳನ್ನು ನೋಡಿ.",

    waste: "ಬೆಳೆ ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ",
    wasteDesc:
      "ಬೆಳೆ ತ್ಯಾಜ್ಯವನ್ನು ಮರುಬಳಕೆ ಮತ್ತು ಮರುಸಂಸ್ಕರಣೆ ಮಾಡುವುದು ಹೇಗೆ ಎಂದು ತಿಳಿಯಿರಿ.",

    storage: "ಸಂಗ್ರಹಣೆ ಮತ್ತು ಸಂರಕ್ಷಣೆ",
    storageDesc:
      "ಸರಿಯಾದ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಕೊಯ್ಲಿನ ನಂತರದ ನಿರ್ವಹಣೆಯ ಬಗ್ಗೆ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",

    disease: "ರೋಗ ಮತ್ತು ಕೀಟ ಪತ್ತೆ",
    diseaseDesc:
      "AI ಬಳಸಿ ಬೆಳೆ ರೋಗಗಳು, ಕೀಟಗಳು ಮತ್ತು ಹಾನಿಯನ್ನು ಗುರುತಿಸಿ.",

    aiDetector: "AI ಬೆಳೆ ಪತ್ತೆ",
    aiDetectorDesc:
      "ಬೆಳೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ರೋಗ, ಹಾನಿ ಮತ್ತು ಸಮಸ್ಯೆಗಳನ್ನು ಗುರುತಿಸಿ.",

    irrigation: "ನೀರಾವರಿ",
    irrigationDesc:
      "ಬೆಳೆಯ ಅಗತ್ಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನೀರಾವರಿ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",

    fertilizer: "ರಸಗೊಬ್ಬರ ಮತ್ತು ಪೋಷಕಾಂಶಗಳು",
    fertilizerDesc:
      "ಬೆಳೆಗೆ ಅಗತ್ಯವಿರುವ ಪೋಷಕಾಂಶಗಳು ಮತ್ತು ರಸಗೊಬ್ಬರ ನಿರ್ವಹಣೆ ಬಗ್ಗೆ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",

    weather: "ಹವಾಮಾನ",
    weatherDesc:
      "ಬೆಳೆ ನಿರ್ವಹಣೆಗೆ ಉಪಯುಕ್ತ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ನೋಡಿ.",

    price: "ಬೆಲೆ ಮಾಹಿತಿ",
    priceDesc:
      "ಬೆಳೆ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳನ್ನು ನೋಡಿ.",

    alertMessage: "ಸೇವೆಯನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುತ್ತದೆ.",
  },

  ml: {
    back: "← എന്റെ വിളകളിലേക്ക് മടങ്ങുക",
    season: "സീസൺ",
    landArea: "ഭൂവിസ്തീർണ്ണം",
    services: "സേവനങ്ങൾ",
    servicesDesc: "നിങ്ങളുടെ വിള നിയന്ത്രിക്കാൻ ആവശ്യമായ എല്ലാ സേവനങ്ങളും.",
    loading: "വിള ലോഡ് ചെയ്യുന്നു...",
    pleaseWait: "ദയവായി കാത്തിരിക്കുക...",
    notFound: "വിള കണ്ടെത്തിയില്ല",
    backToCrops: "← വിളകളിലേക്ക് മടങ്ങുക",
    explore: "കാണുക →",

    mandi: "മാർക്കറ്റും മണ്ഡിയും",
    mandiDesc:
      "മണ്ഡി വിവരങ്ങൾ, സമീപത്തെ മാർക്കറ്റുകൾ, വിൽപ്പന അവസരങ്ങൾ എന്നിവ കാണുക.",

    waste: "വിള അവശിഷ്ട മാനേജ്മെന്റ്",
    wasteDesc:
      "വിള അവശിഷ്ടങ്ങൾ പുനരുപയോഗിക്കാനും റീസൈക്കിൾ ചെയ്യാനും എങ്ങനെ കഴിയുമെന്ന് അറിയുക.",

    storage: "സംഭരണവും സംരക്ഷണവും",
    storageDesc:
      "ശരിയായ സംഭരണത്തിനും വിളവെടുപ്പിന് ശേഷമുള്ള പരിപാലനത്തിനും മാർഗനിർദ്ദേശം നേടുക.",

    disease: "രോഗവും കീടങ്ങളും കണ്ടെത്തൽ",
    diseaseDesc:
      "AI ഉപയോഗിച്ച് വിളയിലെ രോഗങ്ങളും കീടങ്ങളും നാശവും കണ്ടെത്തുക.",

    aiDetector: "AI വിള തിരിച്ചറിയൽ",
    aiDetectorDesc:
      "വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്ത് രോഗം, നാശം, പ്രശ്നങ്ങൾ എന്നിവ കണ്ടെത്തുക.",

    irrigation: "ജലസേചനം",
    irrigationDesc:
      "വിളയുടെ ആവശ്യകത അനുസരിച്ച് ജലസേചന മാർഗനിർദ്ദേശം നേടുക.",

    fertilizer: "വളവും പോഷകങ്ങളും",
    fertilizerDesc:
      "വിളയ്ക്ക് ആവശ്യമായ പോഷകങ്ങളും വള മാനേജ്മെന്റും സംബന്ധിച്ച വിവരങ്ങൾ നേടുക.",

    weather: "കാലാവസ്ഥ",
    weatherDesc:
      "വിള പരിപാലനത്തിന് ആവശ്യമായ കാലാവസ്ഥാ വിവരങ്ങൾ കാണുക.",

    price: "വില വിവരങ്ങൾ",
    priceDesc:
      "വിളയുടെ വിപണി വിലയും വിപണി പ്രവണതകളും പരിശോധിക്കുക.",

    alertMessage: "സേവനം ഉടൻ ചേർക്കുന്നതാണ്.",
  },

  pa: {
    back: "← ਮੇਰੀਆਂ ਫਸਲਾਂ ਤੇ ਵਾਪਸ ਜਾਓ",
    season: "ਸੀਜ਼ਨ",
    landArea: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ",
    services: "ਸੇਵਾਵਾਂ",
    servicesDesc: "ਤੁਹਾਡੀ ਫਸਲ ਨੂੰ ਸੰਭਾਲਣ ਲਈ ਲੋੜੀਂਦੀਆਂ ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ।",
    loading: "ਫਸਲ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
    pleaseWait: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...",
    notFound: "ਫਸਲ ਨਹੀਂ ਮਿਲੀ",
    backToCrops: "← ਫਸਲਾਂ ਤੇ ਵਾਪਸ ਜਾਓ",
    explore: "ਵੇਖੋ →",

    mandi: "ਮੰਡੀ ਅਤੇ ਬਾਜ਼ਾਰ",
    mandiDesc:
      "ਮੰਡੀ ਦੀ ਜਾਣਕਾਰੀ, ਨੇੜਲੇ ਬਾਜ਼ਾਰ ਅਤੇ ਫਸਲ ਵੇਚਣ ਦੇ ਮੌਕੇ ਵੇਖੋ।",

    waste: "ਫਸਲ ਰਹਿੰਦ-ਖੂੰਹਦ ਪ੍ਰਬੰਧਨ",
    wasteDesc:
      "ਫਸਲ ਦੇ ਰਹਿੰਦ-ਖੂੰਹਦ ਨੂੰ ਦੁਬਾਰਾ ਵਰਤਣ ਅਤੇ ਰੀਸਾਈਕਲ ਕਰਨ ਬਾਰੇ ਜਾਣੋ।",

    storage: "ਸਟੋਰੇਜ ਅਤੇ ਸੰਭਾਲ",
    storageDesc:
      "ਫਸਲ ਦੀ ਸਹੀ ਸਟੋਰੇਜ ਅਤੇ ਕਟਾਈ ਤੋਂ ਬਾਅਦ ਦੀ ਸੰਭਾਲ ਬਾਰੇ ਜਾਣਕਾਰੀ ਲਵੋ।",

    disease: "ਰੋਗ ਅਤੇ ਕੀੜੇ ਦੀ ਪਛਾਣ",
    diseaseDesc:
      "AI ਦੀ ਮਦਦ ਨਾਲ ਫਸਲ ਦੇ ਰੋਗ, ਕੀੜੇ ਅਤੇ ਨੁਕਸਾਨ ਦੀ ਪਛਾਣ ਕਰੋ।",

    aiDetector: "AI ਫਸਲ ਪਛਾਣ",
    aiDetectorDesc:
      "ਫਸਲ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰਕੇ ਰੋਗ, ਨੁਕਸਾਨ ਅਤੇ ਸਮੱਸਿਆਵਾਂ ਦੀ ਪਛਾਣ ਕਰੋ।",

    irrigation: "ਸਿੰਚਾਈ",
    irrigationDesc:
      "ਫਸਲ ਦੀ ਲੋੜ ਅਨੁਸਾਰ ਸਿੰਚਾਈ ਬਾਰੇ ਸਲਾਹ ਲਵੋ।",

    fertilizer: "ਖਾਦ ਅਤੇ ਪੋਸ਼ਕ ਤੱਤ",
    fertilizerDesc:
      "ਫਸਲ ਅਨੁਸਾਰ ਪੋਸ਼ਕ ਤੱਤਾਂ ਅਤੇ ਖਾਦ ਪ੍ਰਬੰਧਨ ਦੀ ਜਾਣਕਾਰੀ ਲਵੋ।",

    weather: "ਮੌਸਮ",
    weatherDesc:
      "ਫਸਲ ਪ੍ਰਬੰਧਨ ਲਈ ਲਾਭਦਾਇਕ ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਵੇਖੋ।",

    price: "ਕੀਮਤ ਜਾਣਕਾਰੀ",
    priceDesc:
      "ਫਸਲ ਦੇ ਬਾਜ਼ਾਰ ਭਾਅ ਅਤੇ ਬਾਜ਼ਾਰ ਦੇ ਰੁਝਾਨ ਵੇਖੋ।",

    alertMessage: "ਸੇਵਾ ਜਲਦੀ ਜੋੜੀ ਜਾਵੇਗੀ।",
  },

  or: {
    back: "← ମୋ ଫସଲକୁ ଫେରନ୍ତୁ",
    season: "ଋତୁ",
    landArea: "ଜମିର କ୍ଷେତ୍ରଫଳ",
    services: "ସେବା",
    servicesDesc: "ଆପଣଙ୍କ ଫସଲ ପରିଚାଳନା ପାଇଁ ଆବଶ୍ୟକ ସମସ୍ତ ସେବା।",
    loading: "ଫସଲ ଲୋଡ୍ ହେଉଛି...",
    pleaseWait: "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ...",
    notFound: "ଫସଲ ମିଳିଲା ନାହିଁ",
    backToCrops: "← ଫସଲକୁ ଫେରନ୍ତୁ",
    explore: "ଦେଖନ୍ତୁ →",

    mandi: "ମଣ୍ଡି ଏବଂ ବଜାର",
    mandiDesc:
      "ମଣ୍ଡି ସୂଚନା, ନିକଟସ୍ଥ ବଜାର ଏବଂ ବିକ୍ରୟ ସୁଯୋଗ ଦେଖନ୍ତୁ।",

    waste: "ଫସଲ ବର୍ଜ୍ୟ ପରିଚାଳନା",
    wasteDesc:
      "ଫସଲ ଅବଶିଷ୍ଟକୁ ପୁନଃବ୍ୟବହାର ଏବଂ ପୁନଃଚକ୍ରଣ କିପରି କରିବେ ଜାଣନ୍ତୁ।",

    storage: "ସଂରକ୍ଷଣ ଏବଂ ଷ୍ଟୋରେଜ୍",
    storageDesc:
      "ଠିକ୍ ଭାବରେ ସଂରକ୍ଷଣ ଏବଂ ଅମଳ ପରବର୍ତ୍ତୀ ପରିଚାଳନା ବିଷୟରେ ମାର୍ଗଦର୍ଶନ ପାଆନ୍ତୁ।",

    disease: "ରୋଗ ଏବଂ କୀଟ ଚିହ୍ନଟ",
    diseaseDesc:
      "AI ମାଧ୍ୟମରେ ଫସଲର ରୋଗ, କୀଟ ଏବଂ କ୍ଷତି ଚିହ୍ନଟ କରନ୍ତୁ।",

    aiDetector: "AI ଫସଲ ଚିହ୍ନଟ",
    aiDetectorDesc:
      "ଫସଲର ଫଟୋ ଅପଲୋଡ୍ କରି ରୋଗ, କ୍ଷତି ଏବଂ ସମସ୍ୟା ଚିହ୍ନଟ କରନ୍ତୁ।",

    irrigation: "ଜଳସେଚନ",
    irrigationDesc:
      "ଫସଲର ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ଜଳସେଚନ ମାର୍ଗଦର୍ଶନ ପାଆନ୍ତୁ।",

    fertilizer: "ସାର ଏବଂ ପୋଷକତତ୍ତ୍ୱ",
    fertilizerDesc:
      "ଫସଲ ଅନୁଯାୟୀ ପୋଷକତତ୍ତ୍ୱ ଏବଂ ସାର ପରିଚାଳନା ବିଷୟରେ ସୂଚନା ପାଆନ୍ତୁ।",

    weather: "ପାଣିପାଗ",
    weatherDesc:
      "ଫସଲ ପରିଚାଳନା ପାଇଁ ଉପଯୋଗୀ ପାଣିପାଗ ସୂଚନା ଦେଖନ୍ତୁ।",

    price: "ମୂଲ୍ୟ ସୂଚନା",
    priceDesc:
      "ଫସଲର ବଜାର ମୂଲ୍ୟ ଏବଂ ବଜାର ଧାରା ଦେଖନ୍ତୁ।",

    alertMessage: "ସେବା ଶୀଘ୍ର ଯୋଡାଯିବ।",
  },

  as: {
    back: "← মোৰ শস্যলৈ উভতি যাওক",
    season: "ঋতু",
    landArea: "মাটিৰ পৰিমাণ",
    services: "সেৱাসমূহ",
    servicesDesc: "আপোনাৰ শস্য পৰিচালনাৰ বাবে প্ৰয়োজনীয় সকলো সেৱা।",
    loading: "শস্য লোড হৈ আছে...",
    pleaseWait: "অনুগ্ৰহ কৰি অপেক্ষা কৰক...",
    notFound: "শস্য পোৱা নগ'ল",
    backToCrops: "← শস্যলৈ উভতি যাওক",
    explore: "চাওক →",

    mandi: "মাণ্ডী আৰু বজাৰ",
    mandiDesc:
      "মাণ্ডীৰ তথ্য, ওচৰৰ বজাৰ আৰু শস্য বিক্ৰীৰ সুযোগ চাওক।",

    waste: "শস্যৰ আৱৰ্জনা ব্যৱস্থাপনা",
    wasteDesc:
      "শস্যৰ অৱশিষ্ট কেনেকৈ পুনৰ ব্যৱহাৰ আৰু পুনঃচক্ৰণ কৰিব পাৰি জানক।",

    storage: "সংৰক্ষণ আৰু ষ্টোৰেজ",
    storageDesc:
      "সঠিক সংৰক্ষণ আৰু চপোৱাৰ পিছৰ ব্যৱস্থাপনাৰ বিষয়ে পৰামৰ্শ লাভ কৰক।",

    disease: "ৰোগ আৰু কীট চিনাক্তকৰণ",
    diseaseDesc:
      "AI ব্যৱহাৰ কৰি শস্যৰ ৰোগ, কীট-পতংগ আৰু ক্ষতি চিনাক্ত কৰক।",

    aiDetector: "AI শস্য চিনাক্তকৰণ",
    aiDetectorDesc:
      "শস্যৰ ফটো আপলোড কৰি ৰোগ, ক্ষতি আৰু সমস্যাবোৰ চিনাক্ত কৰক।",

    irrigation: "জলসিঞ্চন",
    irrigationDesc:
      "শস্যৰ প্ৰয়োজন অনুসৰি জলসিঞ্চনৰ পৰামৰ্শ লাভ কৰক।",

    fertilizer: "সাৰ আৰু পুষ্টি",
    fertilizerDesc:
      "শস্য অনুসৰি পুষ্টি আৰু সাৰ ব্যৱস্থাপনাৰ তথ্য লাভ কৰক।",

    weather: "বতৰ",
    weatherDesc:
      "শস্য ব্যৱস্থাপনাৰ বাবে উপযোগী বতৰৰ তথ্য চাওক।",

    price: "মূল্যৰ তথ্য",
    priceDesc:
      "শস্যৰ বজাৰ মূল্য আৰু বজাৰৰ ধাৰা চাওক।",

    alertMessage: "সেৱাটো সোনকালে যোগ কৰা হ'ব।",
  },

  ur: {
    back: "← میری فصلوں پر واپس جائیں",
    season: "موسم",
    landArea: "زمین کا رقبہ",
    services: "خدمات",
    servicesDesc: "آپ کی فصل کو سنبھالنے کے لیے تمام ضروری خدمات۔",
    loading: "فصل لوڈ ہو رہی ہے...",
    pleaseWait: "براہ کرم انتظار کریں...",
    notFound: "فصل نہیں ملی",
    backToCrops: "← فصلوں پر واپس جائیں",
    explore: "دیکھیں →",

    mandi: "منڈی اور بازار",
    mandiDesc:
      "منڈی کی معلومات، قریبی بازار اور فصل فروخت کرنے کے مواقع دیکھیں۔",

    waste: "فصل کے فضلے کا انتظام",
    wasteDesc:
      "فصل کے فضلے کو دوبارہ استعمال اور ری سائیکل کرنے کے طریقے جانیں۔",

    storage: "محفوظ کرنا اور ذخیرہ",
    storageDesc:
      "فصل کو صحیح طریقے سے ذخیرہ کرنے اور کٹائی کے بعد دیکھ بھال کی رہنمائی حاصل کریں۔",

    disease: "بیماری اور کیڑوں کی شناخت",
    diseaseDesc:
      "AI کی مدد سے فصل کی بیماریوں، کیڑوں اور نقصان کی شناخت کریں۔",

    aiDetector: "AI فصل شناخت",
    aiDetectorDesc:
      "فصل کی تصویر اپ لوڈ کرکے بیماری، نقصان اور مسائل کی شناخت کریں۔",

    irrigation: "آبپاشی",
    irrigationDesc:
      "فصل کی ضرورت کے مطابق آبپاشی کی رہنمائی حاصل کریں۔",

    fertilizer: "کھاد اور غذائی اجزاء",
    fertilizerDesc:
      "فصل کے مطابق غذائی اجزاء اور کھاد کے انتظام کی معلومات حاصل کریں۔",

    weather: "موسم",
    weatherDesc:
      "فصل کے انتظام کے لیے مفید موسم کی معلومات دیکھیں۔",

    price: "قیمت کی معلومات",
    priceDesc:
      "فصل کی مارکیٹ قیمت اور مارکیٹ کے رجحانات دیکھیں۔",

    alertMessage: "سروس جلد شامل کی جائے گی۔",
  },
};

export default function CropDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

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

  const handleFeatureClick = (title: string) => {
    if (!crop) return;

    if (title === "Weather") {
      router.push(`/crops/${crop.id}/weather`);
      return;
    }

    if (title === "Irrigation") {
      router.push(`/crops/${crop.id}/irrigation`);
      return;
    }

    alert(
      language === "en"
        ? `${title} for ${crop.crop} ${t.alertMessage}`
        : `${title} - ${crop.crop} ${t.alertMessage}`
    );
  };

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🌱</div>

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
            {t.notFound}
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

  const features = [
    {
      icon: "🏪",
      title: t.mandi,
      key: "Mandi",
      description: t.mandiDesc,
    },
    {
      icon: "♻️",
      title: t.waste,
      key: "Waste",
      description: t.wasteDesc,
    },
    {
      icon: "📦",
      title: t.storage,
      key: "Storage",
      description: t.storageDesc,
    },
    {
      icon: "🦠",
      title: t.disease,
      key: "Disease",
      description: t.diseaseDesc,
    },
    {
      icon: "🤖",
      title: t.aiDetector,
      key: "AI Crop Detector",
      description: t.aiDetectorDesc,
    },
    {
      icon: "💧",
      title: t.irrigation,
      key: "Irrigation",
      description: t.irrigationDesc,
    },
    {
      icon: "🌱",
      title: t.fertilizer,
      key: "Fertilizer",
      description: t.fertilizerDesc,
    },
    {
      icon: "🌦️",
      title: t.weather,
      key: "Weather",
      description: t.weatherDesc,
    },
    {
      icon: "💰",
      title: t.price,
      key: "Price",
      description: t.priceDesc,
    },
  ];

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => router.push("/crops")}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          {t.back}
        </button>

        {/* Crop Header */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">
              🌾
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {crop.season} {t.season}
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop}
              </h1>

              <p className="text-gray-600 mt-2">
                {t.landArea}:{" "}
                <span className="font-semibold">
                  {crop.land} acres
                </span>
              </p>
            </div>

          </div>
        </div>

        {/* Services Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-800">
            {crop.crop} {t.services}
          </h2>

          <p className="text-gray-600 mt-2">
            {t.servicesDesc}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {features.map((feature) => (
            <button
              key={feature.key}
              onClick={() => handleFeatureClick(feature.key)}
              className="bg-white rounded-3xl p-6 text-left border-2 border-transparent hover:border-green-500 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-5 text-green-700 font-bold">
                {t.explore}
              </div>
            </button>
          ))}

        </div>

      </div>
    </main>
  );
}