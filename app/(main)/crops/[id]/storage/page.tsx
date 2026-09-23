"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "../../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../../lib/language";

type Translation = {
  backTo: string;
  storageTitle: string;
  storageDescription: string;
  important: string;
  importantDescription: string;
  basicStorageRequirements: string;
  dryCropTitle: string;
  dryCropDescription: string;
  cleanStorageTitle: string;
  cleanStorageDescription: string;
  controlMoistureTitle: string;
  controlMoistureDescription: string;
  ventilationTitle: string;
  ventilationDescription: string;
  storageOptions: string;
  traditionalTitle: string;
  traditionalDescription: string;
  grainBagsTitle: string;
  grainBagsDescription: string;
  airtightTitle: string;
  airtightDescription: string;
  storageChecklist: string;
  checklistDry: string;
  checklistClean: string;
  checklistPests: string;
  checklistLeakage: string;
  checklistBags: string;
  checklistFloor: string;
  checklistRegular: string;
  storagePests: string;
  storagePestsDescription: string;
  bottomTitle: string;
  bottomDescription: string;
};

const english: Translation = {
  backTo: "Back to",
  storageTitle: "Storage & Preservation",
  storageDescription:
    "Store your harvested crop safely and reduce post-harvest losses.",
  important: "Important",
  importantDescription:
    "Proper drying, cleaning and storage conditions help protect the crop from moisture, insects, fungus and quality loss.",
  basicStorageRequirements: "Basic Storage Requirements",
  dryCropTitle: "Dry the Crop Properly",
  dryCropDescription:
    "Make sure harvested grain is properly dried before placing it into long-term storage.",
  cleanStorageTitle: "Clean Before Storage",
  cleanStorageDescription:
    "Remove damaged grains, plant material, dust and other unwanted material before storage.",
  controlMoistureTitle: "Control Moisture",
  controlMoistureDescription:
    "Keep stored grain protected from rain, humidity, leaks and ground moisture.",
  ventilationTitle: "Keep Storage Ventilated",
  ventilationDescription:
    "Good ventilation helps prevent excessive heat and moisture buildup inside the storage area.",
  storageOptions: "Storage Options",
  traditionalTitle: "Traditional Room / Godown",
  traditionalDescription:
    "Keep the storage room clean, dry and free from cracks or openings through which insects and rodents can enter.",
  grainBagsTitle: "Grain Bags",
  grainBagsDescription:
    "Use clean and suitable bags. Keep bags raised above the floor and away from walls to reduce moisture exposure.",
  airtightTitle: "Airtight Containers",
  airtightDescription:
    "Suitable airtight containers can help protect stored grain from insects and moisture when properly prepared and maintained.",
  storageChecklist: "Storage Checklist",
  checklistDry: "Crop is properly dried",
  checklistClean: "Storage area is clean",
  checklistPests: "No visible insects or pests",
  checklistLeakage: "No water leakage",
  checklistBags: "Bags/containers are clean",
  checklistFloor: "Crop is kept away from the floor",
  checklistRegular: "Storage area is checked regularly",
  storagePests: "Watch for Storage Pests",
  storagePestsDescription:
    "Regularly check for insects, rodents, unusual smell, damaged grains, moisture or fungal growth. If you notice a serious infestation, seek advice from a qualified agricultural expert before using any chemical treatment.",
  bottomTitle: "Good storage = Better crop quality + Less loss",
  bottomDescription:
    "Check your stored crop regularly throughout the storage period.",
};

const translations: Record<LanguageCode, Translation> = {
  en: english,

  hi: {
    ...english,
    backTo: "वापस जाएं",
    storageTitle: "भंडारण और संरक्षण",
    storageDescription:
      "अपनी कटाई की गई फसल को सुरक्षित रखें और कटाई के बाद होने वाले नुकसान को कम करें।",
    important: "महत्वपूर्ण",
    importantDescription:
      "उचित सुखाने, सफाई और भंडारण की स्थिति फसल को नमी, कीड़ों, फफूंद और गुणवत्ता में कमी से बचाने में मदद करती है।",
    basicStorageRequirements: "भंडारण की मूल आवश्यकताएं",
    dryCropTitle: "फसल को अच्छी तरह सुखाएं",
    dryCropDescription:
      "लंबे समय तक भंडारण में रखने से पहले सुनिश्चित करें कि कटाई किया गया अनाज अच्छी तरह सूखा हुआ हो।",
    cleanStorageTitle: "भंडारण से पहले सफाई करें",
    cleanStorageDescription:
      "भंडारण से पहले खराब अनाज, पौधों के अवशेष, धूल और अन्य अनचाही सामग्री को हटा दें।",
    controlMoistureTitle: "नमी नियंत्रित करें",
    controlMoistureDescription:
      "भंडारित अनाज को बारिश, नमी, पानी के रिसाव और जमीन की नमी से सुरक्षित रखें।",
    ventilationTitle: "भंडारण स्थान में हवा का आवागमन रखें",
    ventilationDescription:
      "अच्छा वेंटिलेशन भंडारण स्थान के अंदर अत्यधिक गर्मी और नमी जमा होने से बचाने में मदद करता है।",
    storageOptions: "भंडारण के विकल्प",
    traditionalTitle: "पारंपरिक कमरा / गोदाम",
    traditionalDescription:
      "भंडारण स्थान को साफ और सूखा रखें तथा ऐसी दरारें या खुले स्थान न हों जिनसे कीड़े और चूहे अंदर आ सकें।",
    grainBagsTitle: "अनाज की बोरियां",
    grainBagsDescription:
      "साफ और उपयुक्त बोरियों का उपयोग करें। बोरियों को जमीन से ऊपर और दीवारों से दूर रखें।",
    airtightTitle: "हवा बंद कंटेनर",
    airtightDescription:
      "उचित रूप से तैयार हवा बंद कंटेनर अनाज को कीड़ों और नमी से बचाने में मदद कर सकते हैं।",
    storageChecklist: "भंडारण चेकलिस्ट",
    checklistDry: "फसल अच्छी तरह सूखी हुई है",
    checklistClean: "भंडारण स्थान साफ है",
    checklistPests: "कोई दिखाई देने वाले कीड़े या कीट नहीं हैं",
    checklistLeakage: "पानी का कोई रिसाव नहीं है",
    checklistBags: "बोरियां/कंटेनर साफ हैं",
    checklistFloor: "फसल को जमीन से दूर रखा गया है",
    checklistRegular: "भंडारण स्थान की नियमित जांच की जाती है",
    storagePests: "भंडारण के कीड़ों से सावधान रहें",
    storagePestsDescription:
      "कीड़ों, चूहों, असामान्य गंध, खराब अनाज, नमी या फफूंद की नियमित जांच करें। गंभीर संक्रमण होने पर रासायनिक उपचार से पहले योग्य कृषि विशेषज्ञ से सलाह लें।",
    bottomTitle: "अच्छा भंडारण = बेहतर फसल गुणवत्ता + कम नुकसान",
    bottomDescription:
      "पूरे भंडारण समय के दौरान अपनी भंडारित फसल की नियमित जांच करते रहें।",
  },

  bn: {
    ...english,
    backTo: "ফিরে যান",
    storageTitle: "সংরক্ষণ ও সুরক্ষা",
    storageDescription:
      "কাটা ফসল নিরাপদে সংরক্ষণ করুন এবং ফসল কাটার পর ক্ষতি কমান।",
    important: "গুরুত্বপূর্ণ",
    importantDescription:
      "সঠিকভাবে শুকানো, পরিষ্কার করা এবং সংরক্ষণ করা ফসলকে আর্দ্রতা, পোকা, ছত্রাক ও গুণমানের ক্ষতি থেকে রক্ষা করে।",
    basicStorageRequirements: "সংরক্ষণের মৌলিক প্রয়োজনীয়তা",
    dryCropTitle: "ফসল ভালোভাবে শুকান",
    dryCropDescription:
      "দীর্ঘমেয়াদি সংরক্ষণের আগে শস্য ভালোভাবে শুকিয়ে নিন।",
    cleanStorageTitle: "সংরক্ষণের আগে পরিষ্কার করুন",
    cleanStorageDescription:
      "ক্ষতিগ্রস্ত শস্য, গাছের অংশ, ধুলো ও অন্যান্য অবাঞ্ছিত জিনিস সরিয়ে ফেলুন।",
    controlMoistureTitle: "আর্দ্রতা নিয়ন্ত্রণ করুন",
    controlMoistureDescription:
      "বৃষ্টি, আর্দ্রতা, পানি পড়া এবং মাটির আর্দ্রতা থেকে শস্যকে রক্ষা করুন।",
    ventilationTitle: "বাতাস চলাচল রাখুন",
    ventilationDescription:
      "ভালো বায়ু চলাচল অতিরিক্ত তাপ ও আর্দ্রতা জমতে বাধা দেয়।",
    storageOptions: "সংরক্ষণের বিকল্প",
    traditionalTitle: "প্রচলিত ঘর / গুদাম",
    traditionalDescription:
      "সংরক্ষণ স্থান পরিষ্কার ও শুকনো রাখুন এবং পোকা বা ইঁদুর ঢোকার মতো ফাটল বন্ধ রাখুন।",
    grainBagsTitle: "শস্যের বস্তা",
    grainBagsDescription:
      "পরিষ্কার ও উপযুক্ত বস্তা ব্যবহার করুন এবং মেঝে ও দেয়াল থেকে দূরে রাখুন।",
    airtightTitle: "বায়ুরোধী পাত্র",
    airtightDescription:
      "সঠিকভাবে প্রস্তুত বায়ুরোধী পাত্র শস্যকে পোকা ও আর্দ্রতা থেকে রক্ষা করতে পারে।",
    storageChecklist: "সংরক্ষণ চেকলিস্ট",
    checklistDry: "ফসল ভালোভাবে শুকানো হয়েছে",
    checklistClean: "সংরক্ষণ স্থান পরিষ্কার",
    checklistPests: "কোনো দৃশ্যমান পোকা নেই",
    checklistLeakage: "পানি পড়ার সমস্যা নেই",
    checklistBags: "বস্তা/পাত্র পরিষ্কার",
    checklistFloor: "ফসল মেঝে থেকে দূরে রাখা হয়েছে",
    checklistRegular: "সংরক্ষণ স্থান নিয়মিত পরীক্ষা করা হয়",
    storagePests: "সংরক্ষণের পোকামাকড় সম্পর্কে সতর্ক থাকুন",
    storagePestsDescription:
      "পোকা, ইঁদুর, অস্বাভাবিক গন্ধ, ক্ষতিগ্রস্ত শস্য, আর্দ্রতা বা ছত্রাক নিয়মিত পরীক্ষা করুন।",
    bottomTitle: "ভালো সংরক্ষণ = ভালো ফসলের গুণমান + কম ক্ষতি",
    bottomDescription: "সংরক্ষণের পুরো সময় নিয়মিত ফসল পরীক্ষা করুন।",
  },

  mr: {
    ...english,
    backTo: "परत जा",
    storageTitle: "साठवण आणि संरक्षण",
    storageDescription:
      "कापणी केलेले पीक सुरक्षित ठेवा आणि कापणीनंतरचे नुकसान कमी करा.",
    important: "महत्त्वाचे",
    importantDescription:
      "योग्य वाळवणे, स्वच्छता आणि साठवणूक पिकाला ओलावा, कीटक, बुरशी आणि गुणवत्तेच्या नुकसानीपासून वाचवते.",
    basicStorageRequirements: "साठवणीच्या मूलभूत आवश्यकता",
    dryCropTitle: "पीक योग्य प्रकारे वाळवा",
    dryCropDescription:
      "दीर्घकाळ साठवण्यापूर्वी धान्य पूर्णपणे वाळलेले असावे.",
    cleanStorageTitle: "साठवणीपूर्वी स्वच्छ करा",
    cleanStorageDescription:
      "खराब धान्य, वनस्पती अवशेष, धूळ आणि इतर अनावश्यक वस्तू काढा.",
    controlMoistureTitle: "ओलावा नियंत्रित करा",
    controlMoistureDescription:
      "पाऊस, आर्द्रता, गळती आणि जमिनीच्या ओलाव्यापासून धान्याचे संरक्षण करा.",
    ventilationTitle: "हवेचा योग्य प्रवाह ठेवा",
    ventilationDescription:
      "चांगले वायुवीजन जास्त उष्णता आणि ओलावा जमा होण्यापासून रोखते.",
    storageOptions: "साठवणीचे पर्याय",
    traditionalTitle: "पारंपरिक खोली / गोदाम",
    traditionalDescription:
      "साठवण जागा स्वच्छ आणि कोरडी ठेवा आणि कीटक किंवा उंदीर शिरतील अशा फटी बंद करा.",
    grainBagsTitle: "धान्याच्या पोत्या",
    grainBagsDescription:
      "स्वच्छ आणि योग्य पोत्या वापरा. पोत्या जमिनीपासून वर आणि भिंतीपासून दूर ठेवा.",
    airtightTitle: "हवाबंद कंटेनर",
    airtightDescription:
      "योग्य हवाबंद कंटेनर धान्याला कीटक आणि ओलाव्यापासून वाचवू शकतात.",
    storageChecklist: "साठवण चेकलिस्ट",
    checklistDry: "पीक योग्य प्रकारे वाळलेले आहे",
    checklistClean: "साठवण जागा स्वच्छ आहे",
    checklistPests: "दिसणारे कीटक नाहीत",
    checklistLeakage: "पाण्याची गळती नाही",
    checklistBags: "पोती/कंटेनर स्वच्छ आहेत",
    checklistFloor: "पीक जमिनीपासून दूर ठेवले आहे",
    checklistRegular: "साठवण जागेची नियमित तपासणी केली जाते",
    storagePests: "साठवणीतील कीटकांपासून सावध रहा",
    storagePestsDescription:
      "कीटक, उंदीर, खराब धान्य, ओलावा किंवा बुरशीची नियमित तपासणी करा.",
    bottomTitle: "चांगली साठवण = चांगली गुणवत्ता + कमी नुकसान",
    bottomDescription:
      "संपूर्ण साठवण कालावधीत पिकाची नियमित तपासणी करा.",
  },

  ta: {
    ...english,
    backTo: "திரும்பு",
    storageTitle: "சேமிப்பு மற்றும் பாதுகாப்பு",
    storageDescription:
      "அறுவடை செய்த பயிரை பாதுகாப்பாக சேமித்து, அறுவடைக்குப் பிந்தைய இழப்பைக் குறைக்கவும்.",
    important: "முக்கியம்",
    importantDescription:
      "சரியான உலர்த்தல், சுத்தம் மற்றும் சேமிப்பு பயிரை ஈரப்பதம், பூச்சிகள் மற்றும் பூஞ்சையிலிருந்து பாதுகாக்கும்.",
    basicStorageRequirements: "அடிப்படை சேமிப்பு தேவைகள்",
    dryCropTitle: "பயிரை நன்றாக உலர்த்தவும்",
    dryCropDescription:
      "நீண்ட கால சேமிப்பிற்கு முன் தானியத்தை நன்றாக உலர்த்தவும்.",
    cleanStorageTitle: "சேமிப்பிற்கு முன் சுத்தம் செய்யவும்",
    cleanStorageDescription:
      "சேதமடைந்த தானியங்கள், தூசி மற்றும் தேவையற்ற பொருட்களை அகற்றவும்.",
    controlMoistureTitle: "ஈரப்பதத்தை கட்டுப்படுத்தவும்",
    controlMoistureDescription:
      "மழை, ஈரப்பதம் மற்றும் தரை ஈரத்திலிருந்து தானியத்தை பாதுகாக்கவும்.",
    ventilationTitle: "காற்றோட்டம் இருக்கட்டும்",
    ventilationDescription:
      "நல்ல காற்றோட்டம் அதிக வெப்பம் மற்றும் ஈரப்பதம் சேர்வதைத் தடுக்கிறது.",
    storageOptions: "சேமிப்பு விருப்பங்கள்",
    traditionalTitle: "பாரம்பரிய அறை / கிடங்கு",
    traditionalDescription:
      "சேமிப்பு அறையை சுத்தமாகவும் உலர்ந்ததாகவும் வைத்திருக்கவும்.",
    grainBagsTitle: "தானிய பைகள்",
    grainBagsDescription:
      "சுத்தமான பைகளைப் பயன்படுத்தி தரை மற்றும் சுவரிலிருந்து உயரமாக வைக்கவும்.",
    airtightTitle: "காற்றுப்புகாத கொள்கலன்கள்",
    airtightDescription:
      "காற்றுப்புகாத கொள்கலன்கள் பூச்சிகள் மற்றும் ஈரப்பதத்திலிருந்து பாதுகாக்க உதவும்.",
    storageChecklist: "சேமிப்பு சரிபார்ப்பு பட்டியல்",
    checklistDry: "பயிர் நன்றாக உலர்த்தப்பட்டுள்ளது",
    checklistClean: "சேமிப்பு இடம் சுத்தமாக உள்ளது",
    checklistPests: "பூச்சிகள் இல்லை",
    checklistLeakage: "நீர் கசிவு இல்லை",
    checklistBags: "பைகள்/கொள்கலன்கள் சுத்தமாக உள்ளன",
    checklistFloor: "பயிர் தரையிலிருந்து உயரமாக உள்ளது",
    checklistRegular: "சேமிப்பு இடம் தொடர்ந்து பரிசோதிக்கப்படுகிறது",
    storagePests: "சேமிப்பு பூச்சிகளை கவனிக்கவும்",
    storagePestsDescription:
      "பூச்சிகள், எலிகள், ஈரப்பதம் மற்றும் பூஞ்சை வளர்ச்சியை தொடர்ந்து பரிசோதிக்கவும்.",
    bottomTitle: "நல்ல சேமிப்பு = சிறந்த தரம் + குறைந்த இழப்பு",
    bottomDescription:
      "சேமிப்பு காலம் முழுவதும் பயிரை தொடர்ந்து பரிசோதிக்கவும்.",
  },

  te: {
    ...english,
    backTo: "వెనక్కి",
    storageTitle: "నిల్వ & సంరక్షణ",
    storageDescription:
      "కోత తర్వాత పంటను సురక్షితంగా నిల్వ చేసి నష్టాన్ని తగ్గించండి.",
    important: "ముఖ్యమైనది",
    importantDescription:
      "సరైన ఎండబెట్టడం, శుభ్రపరచడం మరియు నిల్వ పంటను తేమ, పురుగులు మరియు శిలీంధ్రాల నుండి రక్షిస్తుంది.",
    basicStorageRequirements: "ప్రాథమిక నిల్వ అవసరాలు",
    dryCropTitle: "పంటను సరిగ్గా ఎండబెట్టండి",
    dryCropDescription:
      "దీర్ఘకాల నిల్వకు ముందు ధాన్యాన్ని పూర్తిగా ఎండబెట్టండి.",
    cleanStorageTitle: "నిల్వకు ముందు శుభ్రం చేయండి",
    cleanStorageDescription:
      "పాడైన ధాన్యం, దుమ్ము మరియు ఇతర అనవసర పదార్థాలను తొలగించండి.",
    controlMoistureTitle: "తేమను నియంత్రించండి",
    controlMoistureDescription:
      "వర్షం, తేమ మరియు నేల తేమ నుండి ధాన్యాన్ని రక్షించండి.",
    ventilationTitle: "గాలి ప్రసరణ ఉండేలా చూడండి",
    ventilationDescription:
      "మంచి గాలి ప్రసరణ అధిక వేడి మరియు తేమను నివారిస్తుంది.",
    storageOptions: "నిల్వ ఎంపికలు",
    traditionalTitle: "సాంప్రదాయ గది / గోదాం",
    traditionalDescription:
      "నిల్వ గదిని శుభ్రంగా, పొడిగా ఉంచండి మరియు పురుగులు లేదా ఎలుకలు ప్రవేశించే రంధ్రాలు లేకుండా చూడండి.",
    grainBagsTitle: "ధాన్యం సంచులు",
    grainBagsDescription:
      "శుభ్రమైన సంచులను ఉపయోగించి నేల మరియు గోడలకు దూరంగా ఉంచండి.",
    airtightTitle: "గాలి చొరబడని కంటైనర్లు",
    airtightDescription:
      "సరైన గాలి నిరోధక కంటైనర్లు ధాన్యాన్ని పురుగులు మరియు తేమ నుండి రక్షించగలవు.",
    storageChecklist: "నిల్వ చెక్‌లిస్ట్",
    checklistDry: "పంట సరిగ్గా ఎండబెట్టబడింది",
    checklistClean: "నిల్వ ప్రదేశం శుభ్రంగా ఉంది",
    checklistPests: "పురుగులు కనిపించడం లేదు",
    checklistLeakage: "నీటి లీకేజీ లేదు",
    checklistBags: "సంచులు/కంటైనర్లు శుభ్రంగా ఉన్నాయి",
    checklistFloor: "పంట నేల నుండి దూరంగా ఉంది",
    checklistRegular: "నిల్వ ప్రదేశం క్రమం తప్పకుండా తనిఖీ చేయబడుతుంది",
    storagePests: "నిల్వ పురుగులను గమనించండి",
    storagePestsDescription:
      "పురుగులు, ఎలుకలు, తేమ లేదా శిలీంధ్రాల కోసం క్రమం తప్పకుండా తనిఖీ చేయండి.",
    bottomTitle: "మంచి నిల్వ = మంచి నాణ్యత + తక్కువ నష్టం",
    bottomDescription:
      "నిల్వ కాలం మొత్తం పంటను క్రమం తప్పకుండా తనిఖీ చేయండి.",
  },

  gu: {
    ...english,
    backTo: "પાછા જાઓ",
    storageTitle: "સંગ્રહ અને સંરક્ષણ",
    storageDescription:
      "કાપણી કરેલા પાકને સુરક્ષિત રીતે સંગ્રહિત કરો અને કાપણી પછીનું નુકસાન ઘટાડો.",
    important: "મહત્વપૂર્ણ",
    importantDescription:
      "યોગ્ય રીતે સૂકવવું, સાફ કરવું અને સંગ્રહ કરવાથી પાકને ભેજ, જીવાત અને ફૂગથી બચાવવામાં મદદ મળે છે.",
    basicStorageRequirements: "મૂળભૂત સંગ્રહ જરૂરિયાતો",
    dryCropTitle: "પાકને સારી રીતે સૂકવો",
    dryCropDescription:
      "લાંબા સમય સુધી સંગ્રહ કરતા પહેલા અનાજને સારી રીતે સૂકવો.",
    cleanStorageTitle: "સંગ્રહ પહેલાં સાફ કરો",
    cleanStorageDescription:
      "ખરાબ અનાજ, ધૂળ અને અનિચ્છનીય વસ્તુઓ દૂર કરો.",
    controlMoistureTitle: "ભેજ નિયંત્રિત કરો",
    controlMoistureDescription:
      "વરસાદ, ભેજ અને જમીનની ભેજથી અનાજને સુરક્ષિત રાખો.",
    ventilationTitle: "હવાની અવરજવર રાખો",
    ventilationDescription:
      "સારું વેન્ટિલેશન વધારે ગરમી અને ભેજને રોકવામાં મદદ કરે છે.",
    storageOptions: "સંગ્રહ વિકલ્પો",
    traditionalTitle: "પરંપરાગત રૂમ / ગોડાઉન",
    traditionalDescription:
      "સંગ્રહ જગ્યા સ્વચ્છ અને સૂકી રાખો તથા જીવાત અને ઉંદરો માટેના રસ્તા બંધ કરો.",
    grainBagsTitle: "અનાજની બોરીઓ",
    grainBagsDescription:
      "સાફ બોરીઓનો ઉપયોગ કરો અને તેને જમીન અને દિવાલથી દૂર રાખો.",
    airtightTitle: "હવાબંધ કન્ટેનર",
    airtightDescription:
      "યોગ્ય હવાબંધ કન્ટેનર અનાજને જીવાત અને ભેજથી બચાવી શકે છે.",
    storageChecklist: "સંગ્રહ ચેકલિસ્ટ",
    checklistDry: "પાક સારી રીતે સૂકવેલો છે",
    checklistClean: "સંગ્રહ જગ્યા સ્વચ્છ છે",
    checklistPests: "દેખાતી જીવાત નથી",
    checklistLeakage: "પાણીનું લીકેજ નથી",
    checklistBags: "બોરીઓ/કન્ટેનર સ્વચ્છ છે",
    checklistFloor: "પાક જમીનથી દૂર છે",
    checklistRegular: "સંગ્રહ જગ્યા નિયમિત તપાસાય છે",
    storagePests: "સંગ્રહની જીવાતોથી સાવચેત રહો",
    storagePestsDescription:
      "જીવાતો, ઉંદરો, ભેજ અને ફૂગ માટે નિયમિત તપાસ કરો.",
    bottomTitle: "સારું સંગ્રહ = સારી ગુણવત્તા + ઓછું નુકસાન",
    bottomDescription: "સંગ્રહ દરમિયાન પાકની નિયમિત તપાસ કરતા રહો.",
  },

  kn: {
    ...english,
    backTo: "ಹಿಂದಕ್ಕೆ",
    storageTitle: "ಸಂಗ್ರಹಣೆ ಮತ್ತು ಸಂರಕ್ಷಣೆ",
    storageDescription:
      "ಕೊಯ್ಲು ಮಾಡಿದ ಬೆಳೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಿ ಮತ್ತು ಕೊಯ್ಲಿನ ನಂತರದ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಿ.",
    important: "ಮುಖ್ಯ",
    importantDescription:
      "ಸರಿಯಾದ ಒಣಗಿಸುವಿಕೆ, ಸ್ವಚ್ಛತೆ ಮತ್ತು ಸಂಗ್ರಹಣೆಯು ಬೆಳೆಯನ್ನು ತೇವಾಂಶ, ಕೀಟಗಳು ಮತ್ತು ಶಿಲೀಂಧ್ರಗಳಿಂದ ರಕ್ಷಿಸುತ್ತದೆ.",
    basicStorageRequirements: "ಮೂಲಭೂತ ಸಂಗ್ರಹಣೆ ಅಗತ್ಯಗಳು",
    dryCropTitle: "ಬೆಳೆಯನ್ನು ಸರಿಯಾಗಿ ಒಣಗಿಸಿ",
    dryCropDescription:
      "ದೀರ್ಘಕಾಲ ಸಂಗ್ರಹಿಸುವ ಮೊದಲು ಧಾನ್ಯವನ್ನು ಚೆನ್ನಾಗಿ ಒಣಗಿಸಿ.",
    cleanStorageTitle: "ಸಂಗ್ರಹಿಸುವ ಮೊದಲು ಸ್ವಚ್ಛಗೊಳಿಸಿ",
    cleanStorageDescription:
      "ಹಾನಿಗೊಳಗಾದ ಧಾನ್ಯ, ಧೂಳು ಮತ್ತು ಅನಗತ್ಯ ವಸ್ತುಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.",
    controlMoistureTitle: "ತೇವಾಂಶ ನಿಯಂತ್ರಿಸಿ",
    controlMoistureDescription:
      "ಮಳೆ, ತೇವಾಂಶ ಮತ್ತು ನೆಲದ ತೇವದಿಂದ ಧಾನ್ಯವನ್ನು ರಕ್ಷಿಸಿ.",
    ventilationTitle: "ಗಾಳಿಯ ಸಂಚಾರ ಇರಲಿ",
    ventilationDescription:
      "ಉತ್ತಮ ಗಾಳಿಯ ಸಂಚಾರ ಹೆಚ್ಚುವರಿ ಬಿಸಿ ಮತ್ತು ತೇವಾಂಶವನ್ನು ತಡೆಯುತ್ತದೆ.",
    storageOptions: "ಸಂಗ್ರಹಣೆ ಆಯ್ಕೆಗಳು",
    traditionalTitle: "ಸಾಂಪ್ರದಾಯಿಕ ಕೊಠಡಿ / ಗೋದಾಮು",
    traditionalDescription:
      "ಸಂಗ್ರಹಣೆ ಸ್ಥಳವನ್ನು ಸ್ವಚ್ಛ ಮತ್ತು ಒಣವಾಗಿರಿಸಿ ಹಾಗೂ ಕೀಟಗಳು ಮತ್ತು ಇಲಿಗಳು ಪ್ರವೇಶಿಸುವ ರಂಧ್ರಗಳನ್ನು ಮುಚ್ಚಿ.",
    grainBagsTitle: "ಧಾನ್ಯ ಚೀಲಗಳು",
    grainBagsDescription:
      "ಸ್ವಚ್ಛ ಚೀಲಗಳನ್ನು ಬಳಸಿ ಮತ್ತು ನೆಲ ಹಾಗೂ ಗೋಡೆಯಿಂದ ದೂರವಿಡಿ.",
    airtightTitle: "ಗಾಳಿಯಾಡದ ಪಾತ್ರೆಗಳು",
    airtightDescription:
      "ಸರಿಯಾದ ಗಾಳಿಯಾಡದ ಪಾತ್ರೆಗಳು ಧಾನ್ಯವನ್ನು ಕೀಟಗಳು ಮತ್ತು ತೇವಾಂಶದಿಂದ ರಕ್ಷಿಸಬಹುದು.",
    storageChecklist: "ಸಂಗ್ರಹಣೆ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
    checklistDry: "ಬೆಳೆ ಸರಿಯಾಗಿ ಒಣಗಿಸಲಾಗಿದೆ",
    checklistClean: "ಸಂಗ್ರಹಣೆ ಸ್ಥಳ ಸ್ವಚ್ಛವಾಗಿದೆ",
    checklistPests: "ಕೀಟಗಳು ಕಾಣುತ್ತಿಲ್ಲ",
    checklistLeakage: "ನೀರಿನ ಸೋರಿಕೆ ಇಲ್ಲ",
    checklistBags: "ಚೀಲಗಳು/ಪಾತ್ರೆಗಳು ಸ್ವಚ್ಛವಾಗಿವೆ",
    checklistFloor: "ಬೆಳೆ ನೆಲದಿಂದ ದೂರವಿದೆ",
    checklistRegular: "ಸಂಗ್ರಹಣೆ ಸ್ಥಳವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ",
    storagePests: "ಸಂಗ್ರಹಣೆ ಕೀಟಗಳ ಬಗ್ಗೆ ಎಚ್ಚರಿಕೆ",
    storagePestsDescription:
      "ಕೀಟಗಳು, ಇಲಿಗಳು, ತೇವಾಂಶ ಮತ್ತು ಶಿಲೀಂಧ್ರಗಳಿಗಾಗಿ ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
    bottomTitle: "ಉತ್ತಮ ಸಂಗ್ರಹಣೆ = ಉತ್ತಮ ಗುಣಮಟ್ಟ + ಕಡಿಮೆ ನಷ್ಟ",
    bottomDescription: "ಸಂಗ್ರಹಣೆ ಅವಧಿಯಲ್ಲಿ ಬೆಳೆಯನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
  },

  ml: {
    ...english,
    backTo: "തിരികെ",
    storageTitle: "സംഭരണവും സംരക്ഷണവും",
    storageDescription:
      "വിള സുരക്ഷിതമായി സംഭരിച്ച് വിളവെടുപ്പിന് ശേഷമുള്ള നഷ്ടം കുറയ്ക്കുക.",
    important: "പ്രധാനപ്പെട്ടത്",
    importantDescription:
      "ശരിയായ ഉണക്കൽ, വൃത്തിയാക്കൽ, സംഭരണം എന്നിവ ഈർപ്പം, കീടങ്ങൾ, പൂപ്പൽ എന്നിവയിൽ നിന്ന് വിളയെ സംരക്ഷിക്കുന്നു.",
    basicStorageRequirements: "അടിസ്ഥാന സംഭരണ ആവശ്യങ്ങൾ",
    dryCropTitle: "വിള നന്നായി ഉണക്കുക",
    dryCropDescription:
      "ദീർഘകാല സംഭരണത്തിന് മുമ്പ് ധാന്യം നന്നായി ഉണക്കുക.",
    cleanStorageTitle: "സംഭരണത്തിന് മുമ്പ് വൃത്തിയാക്കുക",
    cleanStorageDescription:
      "കേടായ ധാന്യം, പൊടി, അനാവശ്യ വസ്തുക്കൾ എന്നിവ നീക്കം ചെയ്യുക.",
    controlMoistureTitle: "ഈർപ്പം നിയന്ത്രിക്കുക",
    controlMoistureDescription:
      "മഴ, ഈർപ്പം, വെള്ളം ചോർച്ച, നിലത്തെ ഈർപ്പം എന്നിവയിൽ നിന്ന് ധാന്യം സംരക്ഷിക്കുക.",
    ventilationTitle: "വായുസഞ്ചാരം ഉറപ്പാക്കുക",
    ventilationDescription:
      "നല്ല വായുസഞ്ചാരം അധിക ചൂടും ഈർപ്പവും തടയുന്നു.",
    storageOptions: "സംഭരണ മാർഗങ്ങൾ",
    traditionalTitle: "പരമ്പരാഗത മുറി / ഗോഡൗൺ",
    traditionalDescription:
      "സംഭരണ സ്ഥലം വൃത്തിയും വരണ്ടതുമായി സൂക്ഷിക്കുക.",
    grainBagsTitle: "ധാന്യ ചാക്കുകൾ",
    grainBagsDescription:
      "വൃത്തിയുള്ള ചാക്കുകൾ ഉപയോഗിച്ച് നിലത്തുനിന്നും ചുവരിൽനിന്നും അകറ്റി വയ്ക്കുക.",
    airtightTitle: "വായു കടക്കാത്ത പാത്രങ്ങൾ",
    airtightDescription:
      "ശരിയായ വായു കടക്കാത്ത പാത്രങ്ങൾ കീടങ്ങളിൽ നിന്നും ഈർപ്പത്തിൽ നിന്നും ധാന്യത്തെ സംരക്ഷിക്കും.",
    storageChecklist: "സംഭരണ പരിശോധന പട്ടിക",
    checklistDry: "വിള നന്നായി ഉണക്കിയിട്ടുണ്ട്",
    checklistClean: "സംഭരണ സ്ഥലം വൃത്തിയാണ്",
    checklistPests: "കീടങ്ങൾ കാണുന്നില്ല",
    checklistLeakage: "വെള്ളം ചോർച്ചയില്ല",
    checklistBags: "ചാക്കുകൾ/പാത്രങ്ങൾ വൃത്തിയാണ്",
    checklistFloor: "വിള നിലത്തുനിന്നും അകലെ സൂക്ഷിച്ചിരിക്കുന്നു",
    checklistRegular: "സംഭരണ സ്ഥലം പതിവായി പരിശോധിക്കുന്നു",
    storagePests: "സംഭരണ കീടങ്ങളെ ശ്രദ്ധിക്കുക",
    storagePestsDescription:
      "കീടങ്ങൾ, എലികൾ, ഈർപ്പം, പൂപ്പൽ എന്നിവ പതിവായി പരിശോധിക്കുക.",
    bottomTitle: "നല്ല സംഭരണം = മികച്ച ഗുണനിലവാരം + കുറഞ്ഞ നഷ്ടം",
    bottomDescription: "സംഭരണ കാലയളവിൽ വിള പതിവായി പരിശോധിക്കുക.",
  },

  pa: {
    ...english,
    backTo: "ਵਾਪਸ ਜਾਓ",
    storageTitle: "ਸਟੋਰੇਜ ਅਤੇ ਸੰਭਾਲ",
    storageDescription:
      "ਕੱਟੀ ਹੋਈ ਫਸਲ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖੋ ਅਤੇ ਕਟਾਈ ਤੋਂ ਬਾਅਦ ਦਾ ਨੁਕਸਾਨ ਘਟਾਓ।",
    important: "ਮਹੱਤਵਪੂਰਨ",
    importantDescription:
      "ਸਹੀ ਸੁਕਾਈ, ਸਫਾਈ ਅਤੇ ਸਟੋਰੇਜ ਫਸਲ ਨੂੰ ਨਮੀ, ਕੀੜਿਆਂ ਅਤੇ ਫੰਗਸ ਤੋਂ ਬਚਾਉਂਦੇ ਹਨ।",
    basicStorageRequirements: "ਮੁੱਢਲੀਆਂ ਸਟੋਰੇਜ ਲੋੜਾਂ",
    dryCropTitle: "ਫਸਲ ਨੂੰ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁਕਾਓ",
    dryCropDescription:
      "ਲੰਬੇ ਸਮੇਂ ਲਈ ਰੱਖਣ ਤੋਂ ਪਹਿਲਾਂ ਅਨਾਜ ਨੂੰ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁਕਾਓ।",
    cleanStorageTitle: "ਸਟੋਰੇਜ ਤੋਂ ਪਹਿਲਾਂ ਸਫਾਈ ਕਰੋ",
    cleanStorageDescription:
      "ਖਰਾਬ ਅਨਾਜ, ਧੂੜ ਅਤੇ ਹੋਰ ਅਣਚਾਹੀਆਂ ਚੀਜ਼ਾਂ ਹਟਾਓ।",
    controlMoistureTitle: "ਨਮੀ ਨੂੰ ਕੰਟਰੋਲ ਕਰੋ",
    controlMoistureDescription:
      "ਮੀਂਹ, ਨਮੀ ਅਤੇ ਜ਼ਮੀਨ ਦੀ ਨਮੀ ਤੋਂ ਅਨਾਜ ਨੂੰ ਬਚਾਓ।",
    ventilationTitle: "ਹਵਾਦਾਰੀ ਰੱਖੋ",
    ventilationDescription:
      "ਚੰਗੀ ਹਵਾਦਾਰੀ ਵਾਧੂ ਗਰਮੀ ਅਤੇ ਨਮੀ ਨੂੰ ਰੋਕਦੀ ਹੈ।",
    storageOptions: "ਸਟੋਰੇਜ ਦੇ ਵਿਕਲਪ",
    traditionalTitle: "ਰਵਾਇਤੀ ਕਮਰਾ / ਗੋਦਾਮ",
    traditionalDescription:
      "ਸਟੋਰੇਜ ਸਥਾਨ ਨੂੰ ਸਾਫ਼ ਅਤੇ ਸੁੱਕਾ ਰੱਖੋ ਅਤੇ ਕੀੜਿਆਂ ਜਾਂ ਚੂਹਿਆਂ ਦੇ ਦਾਖਲੇ ਦੇ ਰਸਤੇ ਬੰਦ ਕਰੋ।",
    grainBagsTitle: "ਅਨਾਜ ਦੀਆਂ ਬੋਰੀਆਂ",
    grainBagsDescription:
      "ਸਾਫ਼ ਬੋਰੀਆਂ ਵਰਤੋ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜ਼ਮੀਨ ਅਤੇ ਕੰਧ ਤੋਂ ਦੂਰ ਰੱਖੋ।",
    airtightTitle: "ਹਵਾਬੰਦ ਕੰਟੇਨਰ",
    airtightDescription:
      "ਹਵਾਬੰਦ ਕੰਟੇਨਰ ਅਨਾਜ ਨੂੰ ਕੀੜਿਆਂ ਅਤੇ ਨਮੀ ਤੋਂ ਬਚਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ।",
    storageChecklist: "ਸਟੋਰੇਜ ਚੈੱਕਲਿਸਟ",
    checklistDry: "ਫਸਲ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁੱਕੀ ਹੈ",
    checklistClean: "ਸਟੋਰੇਜ ਸਥਾਨ ਸਾਫ਼ ਹੈ",
    checklistPests: "ਕੋਈ ਕੀੜੇ ਨਹੀਂ ਦਿਖ ਰਹੇ",
    checklistLeakage: "ਪਾਣੀ ਦੀ ਲੀਕੇਜ ਨਹੀਂ",
    checklistBags: "ਬੋਰੀਆਂ/ਕੰਟੇਨਰ ਸਾਫ਼ ਹਨ",
    checklistFloor: "ਫਸਲ ਜ਼ਮੀਨ ਤੋਂ ਦੂਰ ਹੈ",
    checklistRegular: "ਸਟੋਰੇਜ ਸਥਾਨ ਦੀ ਨਿਯਮਿਤ ਜਾਂਚ ਹੁੰਦੀ ਹੈ",
    storagePests: "ਸਟੋਰੇਜ ਦੇ ਕੀੜਿਆਂ ਤੋਂ ਸਾਵਧਾਨ ਰਹੋ",
    storagePestsDescription:
      "ਕੀੜਿਆਂ, ਚੂਹਿਆਂ, ਨਮੀ ਅਤੇ ਫੰਗਸ ਲਈ ਨਿਯਮਿਤ ਜਾਂਚ ਕਰੋ।",
    bottomTitle: "ਚੰਗੀ ਸਟੋਰੇਜ = ਚੰਗੀ ਗੁਣਵੱਤਾ + ਘੱਟ ਨੁਕਸਾਨ",
    bottomDescription:
      "ਸਟੋਰੇਜ ਦੇ ਪੂਰੇ ਸਮੇਂ ਦੌਰਾਨ ਫਸਲ ਦੀ ਨਿਯਮਿਤ ਜਾਂਚ ਕਰੋ।",
  },

  or: {
    ...english,
    backTo: "ପଛକୁ ଯାଆନ୍ତୁ",
    storageTitle: "ସଂରକ୍ଷଣ ଏବଂ ସୁରକ୍ଷା",
    storageDescription:
      "ଅମଳ ହୋଇଥିବା ଫସଲକୁ ସୁରକ୍ଷିତ ରଖନ୍ତୁ ଏବଂ ଅମଳ ପରବର୍ତ୍ତୀ କ୍ଷତି କମାନ୍ତୁ।",
    important: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",
    importantDescription:
      "ଉପଯୁକ୍ତ ଶୁଖାଇବା, ସଫା କରିବା ଏବଂ ସଂରକ୍ଷଣ ଫସଲକୁ ଆର୍ଦ୍ରତା, କୀଟ ଏବଂ ଫଙ୍ଗସରୁ ସୁରକ୍ଷା କରେ।",
    basicStorageRequirements: "ସଂରକ୍ଷଣର ମୌଳିକ ଆବଶ୍ୟକତା",
    dryCropTitle: "ଫସଲକୁ ଭଲ ଭାବେ ଶୁଖାନ୍ତୁ",
    dryCropDescription:
      "ଦୀର୍ଘ ସମୟ ସଂରକ୍ଷଣ ପୂର୍ବରୁ ଶସ୍ୟକୁ ଭଲ ଭାବେ ଶୁଖାନ୍ତୁ।",
    cleanStorageTitle: "ସଂରକ୍ଷଣ ପୂର୍ବରୁ ସଫା କରନ୍ତୁ",
    cleanStorageDescription:
      "ଖରାପ ଶସ୍ୟ, ଧୂଳି ଏବଂ ଅନାବଶ୍ୟକ ଜିନିଷ ହଟାନ୍ତୁ।",
    controlMoistureTitle: "ଆର୍ଦ୍ରତା ନିୟନ୍ତ୍ରଣ କରନ୍ତୁ",
    controlMoistureDescription:
      "ବର୍ଷା, ଆର୍ଦ୍ରତା ଏବଂ ମାଟିର ଆର୍ଦ୍ରତାରୁ ଶସ୍ୟକୁ ସୁରକ୍ଷା କରନ୍ତୁ।",
    ventilationTitle: "ବାୟୁ ଚଳାଚଳ ରଖନ୍ତୁ",
    ventilationDescription:
      "ଭଲ ବାୟୁ ଚଳାଚଳ ଅତ୍ୟଧିକ ଉତ୍ତାପ ଏବଂ ଆର୍ଦ୍ରତାକୁ ରୋକେ।",
    storageOptions: "ସଂରକ୍ଷଣ ବିକଳ୍ପ",
    traditionalTitle: "ପାରମ୍ପରିକ କୋଠରୀ / ଗୋଦାମ",
    traditionalDescription:
      "ସଂରକ୍ଷଣ ସ୍ଥାନକୁ ସଫା ଏବଂ ଶୁଖିଲା ରଖନ୍ତୁ।",
    grainBagsTitle: "ଶସ୍ୟ ବସ୍ତା",
    grainBagsDescription:
      "ସଫା ବସ୍ତା ବ୍ୟବହାର କରନ୍ତୁ ଏବଂ ଭୂମି ଓ କାନ୍ଥଠାରୁ ଦୂରରେ ରଖନ୍ତୁ।",
    airtightTitle: "ବାୟୁରୋଧୀ ପାତ୍ର",
    airtightDescription:
      "ଉପଯୁକ୍ତ ବାୟୁରୋଧୀ ପାତ୍ର ଶସ୍ୟକୁ କୀଟ ଏବଂ ଆର୍ଦ୍ରତାରୁ ରକ୍ଷା କରିପାରେ।",
    storageChecklist: "ସଂରକ୍ଷଣ ଯାଞ୍ଚ ତାଲିକା",
    checklistDry: "ଫସଲ ଭଲ ଭାବେ ଶୁଖାଯାଇଛି",
    checklistClean: "ସଂରକ୍ଷଣ ସ୍ଥାନ ସଫା",
    checklistPests: "କୀଟ ଦେଖାଯାଉନାହିଁ",
    checklistLeakage: "ପାଣି ଲିକ୍ ନାହିଁ",
    checklistBags: "ବସ୍ତା/ପାତ୍ର ସଫା",
    checklistFloor: "ଫସଲ ଭୂମିଠାରୁ ଦୂରରେ",
    checklistRegular: "ସଂରକ୍ଷଣ ସ୍ଥାନ ନିୟମିତ ଯାଞ୍ଚ ହୁଏ",
    storagePests: "ସଂରକ୍ଷଣ କୀଟଠାରୁ ସାବଧାନ ରୁହନ୍ତୁ",
    storagePestsDescription:
      "କୀଟ, ମୂଷା, ଆର୍ଦ୍ରତା ଏବଂ ଫଙ୍ଗସ ପାଇଁ ନିୟମିତ ଯାଞ୍ଚ କରନ୍ତୁ।",
    bottomTitle: "ଭଲ ସଂରକ୍ଷଣ = ଭଲ ଗୁଣବତ୍ତା + କମ୍ କ୍ଷତି",
    bottomDescription:
      "ସଂରକ୍ଷଣ ସମୟରେ ଫସଲକୁ ନିୟମିତ ଯାଞ୍ଚ କରନ୍ତୁ।",
  },

  as: {
    ...english,
    backTo: "উভতি যাওক",
    storageTitle: "সংৰক্ষণ আৰু সুৰক্ষা",
    storageDescription:
      "চপোৱা শস্য সুৰক্ষিতভাৱে সংৰক্ষণ কৰক আৰু চপোৱাৰ পিছৰ ক্ষতি কমাওক।",
    important: "গুৰুত্বপূৰ্ণ",
    importantDescription:
      "সঠিকভাৱে শুকোৱা, পৰিষ্কাৰ কৰা আৰু সংৰক্ষণে শস্যক আৰ্দ্ৰতা, পোক-পৰুৱা আৰু ভেঁকুৰৰ পৰা ৰক্ষা কৰে।",
    basicStorageRequirements: "মৌলিক সংৰক্ষণৰ প্ৰয়োজনীয়তা",
    dryCropTitle: "শস্য ভালদৰে শুকুৱাওক",
    dryCropDescription:
      "দীৰ্ঘদিন সংৰক্ষণৰ আগতে শস্য ভালদৰে শুকুৱাই লওক।",
    cleanStorageTitle: "সংৰক্ষণৰ আগতে পৰিষ্কাৰ কৰক",
    cleanStorageDescription:
      "নষ্ট শস্য, ধূলি আৰু অনাৱশ্যক বস্তু আঁতৰাওক।",
    controlMoistureTitle: "আৰ্দ্ৰতা নিয়ন্ত্ৰণ কৰক",
    controlMoistureDescription:
      "বৰষুণ, আৰ্দ্ৰতা আৰু মাটিৰ আৰ্দ্ৰতাৰ পৰা শস্য সুৰক্ষিত ৰাখক।",
    ventilationTitle: "বায়ু চলাচল ৰাখক",
    ventilationDescription:
      "ভাল বায়ু চলাচলে অতিৰিক্ত তাপ আৰু আৰ্দ্ৰতা ৰোধ কৰে।",
    storageOptions: "সংৰক্ষণৰ বিকল্প",
    traditionalTitle: "পৰম্পৰাগত কোঠা / গুদাম",
    traditionalDescription:
      "সংৰক্ষণ স্থান পৰিষ্কাৰ আৰু শুকান ৰাখক।",
    grainBagsTitle: "শস্যৰ বস্তা",
    grainBagsDescription:
      "পৰিষ্কাৰ বস্তা ব্যৱহাৰ কৰি মজিয়া আৰু বেৰৰ পৰা আঁতৰত ৰাখক।",
    airtightTitle: "বায়ুৰোধী পাত্ৰ",
    airtightDescription:
      "বায়ুৰোধী পাত্ৰই শস্যক পোক-পৰুৱা আৰু আৰ্দ্ৰতাৰ পৰা সুৰক্ষা দিব পাৰে।",
    storageChecklist: "সংৰক্ষণ পৰীক্ষা তালিকা",
    checklistDry: "শস্য ভালদৰে শুকোৱা হৈছে",
    checklistClean: "সংৰক্ষণ স্থান পৰিষ্কাৰ",
    checklistPests: "কোনো পোক-পৰুৱা দেখা নাযায়",
    checklistLeakage: "পানী লিক হোৱা নাই",
    checklistBags: "বস্তা/পাত্ৰ পৰিষ্কাৰ",
    checklistFloor: "শস্য মজিয়াৰ পৰা আঁতৰত",
    checklistRegular: "সংৰক্ষণ স্থান নিয়মিত পৰীক্ষা কৰা হয়",
    storagePests: "সংৰক্ষণৰ পোক-পৰুৱাৰ পৰা সাৱধান হওক",
    storagePestsDescription:
      "পোক-পৰুৱা, নিগনি, আৰ্দ্ৰতা আৰু ভেঁকুৰৰ বাবে নিয়মিত পৰীক্ষা কৰক।",
    bottomTitle: "ভাল সংৰক্ষণ = উন্নত গুণমান + কম ক্ষতি",
    bottomDescription:
      "সংৰক্ষণৰ সময়ছোৱাত শস্য নিয়মিত পৰীক্ষা কৰক।",
  },

  ur: {
    ...english,
    backTo: "واپس جائیں",
    storageTitle: "ذخیرہ اور تحفظ",
    storageDescription:
      "اپنی کٹی ہوئی فصل کو محفوظ رکھیں اور کٹائی کے بعد ہونے والے نقصان کو کم کریں۔",
    important: "اہم",
    importantDescription:
      "مناسب خشک کرنا، صفائی اور ذخیرہ فصل کو نمی، کیڑوں اور پھپھوندی سے محفوظ رکھنے میں مدد کرتا ہے۔",
    basicStorageRequirements: "ذخیرہ کرنے کی بنیادی ضروریات",
    dryCropTitle: "فصل کو اچھی طرح خشک کریں",
    dryCropDescription:
      "طویل مدتی ذخیرہ کرنے سے پہلے اناج کو اچھی طرح خشک کریں۔",
    cleanStorageTitle: "ذخیرہ کرنے سے پہلے صفائی کریں",
    cleanStorageDescription:
      "خراب اناج، دھول اور غیر ضروری مواد کو ہٹا دیں۔",
    controlMoistureTitle: "نمی کو کنٹرول کریں",
    controlMoistureDescription:
      "بارش، نمی اور زمین کی نمی سے اناج کو محفوظ رکھیں۔",
    ventilationTitle: "ہوا کی آمدورفت رکھیں",
    ventilationDescription:
      "اچھی ہوا کی آمدورفت زیادہ گرمی اور نمی کو جمع ہونے سے روکتی ہے۔",
    storageOptions: "ذخیرہ کرنے کے طریقے",
    traditionalTitle: "روایتی کمرہ / گودام",
    traditionalDescription:
      "ذخیرہ کرنے کی جگہ صاف اور خشک رکھیں اور کیڑوں یا چوہوں کے داخل ہونے کے راستے بند رکھیں۔",
    grainBagsTitle: "اناج کی بوریاں",
    grainBagsDescription:
      "صاف بوریاں استعمال کریں اور انہیں زمین اور دیوار سے دور رکھیں۔",
    airtightTitle: "ہوا بند کنٹینر",
    airtightDescription:
      "مناسب ہوا بند کنٹینر اناج کو کیڑوں اور نمی سے بچانے میں مدد کر سکتے ہیں۔",
    storageChecklist: "ذخیرہ چیک لسٹ",
    checklistDry: "فصل اچھی طرح خشک ہے",
    checklistClean: "ذخیرہ کرنے کی جگہ صاف ہے",
    checklistPests: "کوئی کیڑے نظر نہیں آ رہے",
    checklistLeakage: "پانی کا رساؤ نہیں ہے",
    checklistBags: "بوریاں/کنٹینر صاف ہیں",
    checklistFloor: "فصل زمین سے دور رکھی گئی ہے",
    checklistRegular: "ذخیرہ کرنے کی جگہ باقاعدگی سے چیک کی جاتی ہے",
    storagePests: "ذخیرہ کرنے والے کیڑوں سے محتاط رہیں",
    storagePestsDescription:
      "کیڑوں، چوہوں، نمی اور پھپھوندی کے لیے باقاعدگی سے چیک کریں۔",
    bottomTitle: "اچھا ذخیرہ = بہتر معیار + کم نقصان",
    bottomDescription:
      "ذخیرہ کرنے کے پورے عرصے میں فصل کو باقاعدگی سے چیک کریں۔",
  },
};

export default function StoragePage() {
  const params = useParams();
  const cropId = params?.id as string;

  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-5xl">

        <Link
          href={`/crops/${cropId}`}
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm hover:bg-green-50"
        >
          ← {t.backTo} {cropId}
        </Link>

        <section className="mb-6 rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white shadow-lg">
          <div className="mb-2 text-4xl">📦</div>

          <h1 className="text-3xl font-bold">
            {cropId} {t.storageTitle}
          </h1>

          <p className="mt-2 text-green-50">
            {t.storageDescription}
          </p>
        </section>

        <section className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-yellow-800">
            ⚠️ {t.important}
          </h2>

          <p className="text-sm leading-6 text-yellow-900">
            {t.importantDescription}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            🏠 {t.basicStorageRequirements}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">☀️</div>
              <h3 className="text-lg font-bold text-gray-800">
                {t.dryCropTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.dryCropDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">🧹</div>
              <h3 className="text-lg font-bold text-gray-800">
                {t.cleanStorageTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.cleanStorageDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">💧</div>
              <h3 className="text-lg font-bold text-gray-800">
                {t.controlMoistureTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.controlMoistureDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 text-3xl">🌬️</div>
              <h3 className="text-lg font-bold text-gray-800">
                {t.ventilationTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.ventilationDescription}
              </p>
            </div>

          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            📦 {t.storageOptions}
          </h2>

          <div className="space-y-4">

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                🏠 {t.traditionalTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.traditionalDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                🛍️ {t.grainBagsTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.grainBagsDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                🛢️ {t.airtightTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.airtightDescription}
              </p>
            </div>

          </div>
        </section>

        <section className="mb-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            ✅ {t.storageChecklist}
          </h2>

          <div className="space-y-3">
            {[
              t.checklistDry,
              t.checklistClean,
              t.checklistPests,
              t.checklistLeakage,
              t.checklistBags,
              t.checklistFloor,
              t.checklistRegular,
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-green-50 p-3"
              >
                <span className="text-green-600">✓</span>

                <span className="text-sm font-medium text-gray-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-red-700">
            🐀 {t.storagePests}
          </h2>

          <p className="text-sm leading-6 text-red-800">
            {t.storagePestsDescription}
          </p>
        </section>

        <div className="rounded-2xl bg-green-100 p-5 text-center">
          <p className="font-semibold text-green-800">
            🌾 {t.bottomTitle}
          </p>

          <p className="mt-1 text-sm text-green-700">
            {t.bottomDescription}
          </p>
        </div>

      </div>
    </main>
  );
}