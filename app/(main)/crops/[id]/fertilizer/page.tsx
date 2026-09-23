"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "../../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../../lib/language";

const translations: Record<
  LanguageCode,
  {
    backTo: string;
    fertilizerNutrients: string;
    fertilizerGuide: string;
    description: string;
    important: string;
    importantText: string;
    majorNutrients: string;
    nitrogen: string;
    nitrogenDesc: string;
    nitrogenSources: string;
    phosphorus: string;
    phosphorusDesc: string;
    phosphorusSources: string;
    potassium: string;
    potassiumDesc: string;
    potassiumSources: string;
    commonTypes: string;
    urea: string;
    ureaDesc: string;
    dap: string;
    dapDesc: string;
    mop: string;
    mopDesc: string;
    organic: string;
    organicDesc: string;
    goodPractices: string;
    soilTesting: string;
    soilTestingDesc: string;
    avoidOver: string;
    avoidOverDesc: string;
    irrigation: string;
    irrigationDesc: string;
    cropStage: string;
    cropStageDesc: string;
    beforeApplying: string;
    checkSoil: string;
    useRecommended: string;
    dontMix: string;
    followLabel: string;
  }
> = {
  en: {
    backTo: "Back to",
    fertilizerNutrients: "Fertilizer & Nutrients",
    fertilizerGuide: "Fertilizer Guide",
    description:
      "Get simple guidance about nutrients, fertilizer types and application practices for your crop.",
    important: "Important",
    importantText:
      "Fertilizer requirement can vary according to soil condition, crop variety, crop age and previous fertilizer application. For exact dosage, follow your soil test report and local agricultural expert's recommendation.",
    majorNutrients: "Major Nutrients",
    nitrogen: "Nitrogen (N)",
    nitrogenDesc:
      "Supports healthy leaf growth and overall plant development.",
    nitrogenSources: "Common sources: Urea and nitrogen fertilizers",
    phosphorus: "Phosphorus (P)",
    phosphorusDesc:
      "Helps root development and supports flowering and crop establishment.",
    phosphorusSources: "Common sources: DAP and phosphorus fertilizers",
    potassium: "Potassium (K)",
    potassiumDesc:
      "Supports plant strength, water regulation and crop quality.",
    potassiumSources: "Common sources: MOP and potassium fertilizers",
    commonTypes: "Common Fertilizer Types",
    urea: "Urea",
    ureaDesc:
      "A nitrogen-rich fertilizer commonly used to support vegetative growth.",
    dap: "DAP",
    dapDesc:
      "Provides nitrogen and phosphorus and is commonly used during crop establishment.",
    mop: "MOP",
    mopDesc:
      "A potassium fertilizer used when potassium is required by the crop and soil.",
    organic: "Organic Manure / Compost",
    organicDesc:
      "Can improve soil organic matter and contribute nutrients when properly prepared and applied.",
    goodPractices: "Good Fertilizer Practices",
    soilTesting: "Prefer soil testing",
    soilTestingDesc:
      "Use soil-test information whenever available.",
    avoidOver: "Avoid over-application",
    avoidOverDesc:
      "Excess fertilizer can waste money and affect soil and water.",
    irrigation: "Consider irrigation",
    irrigationDesc:
      "Fertilizer application should be planned according to crop stage and available moisture.",
    cropStage: "Follow crop stage",
    cropStageDesc:
      "Nutrient needs change as the crop develops.",
    beforeApplying: "Before applying fertilizer",
    checkSoil: "Check your soil test report if available.",
    useRecommended: "Use the fertilizer recommended for your crop and soil.",
    dontMix: "Do not mix or apply fertilizers blindly.",
    followLabel: "Follow the product label and local agriculture advice.",
  },

  hi: {
    backTo: "वापस जाएँ",
    fertilizerNutrients: "उर्वरक और पोषक तत्व",
    fertilizerGuide: "उर्वरक गाइड",
    description:
      "अपनी फसल के लिए पोषक तत्वों, उर्वरक के प्रकार और उपयोग की सरल जानकारी प्राप्त करें।",
    important: "महत्वपूर्ण",
    importantText:
      "उर्वरक की आवश्यकता मिट्टी की स्थिति, फसल की किस्म, फसल की उम्र और पहले किए गए उर्वरक उपयोग के अनुसार अलग हो सकती है। सही मात्रा के लिए मिट्टी की जाँच रिपोर्ट और स्थानीय कृषि विशेषज्ञ की सलाह का पालन करें।",
    majorNutrients: "मुख्य पोषक तत्व",
    nitrogen: "नाइट्रोजन (N)",
    nitrogenDesc:
      "पत्तियों की स्वस्थ वृद्धि और पौधे के समग्र विकास में सहायता करता है।",
    nitrogenSources: "सामान्य स्रोत: यूरिया और नाइट्रोजन उर्वरक",
    phosphorus: "फॉस्फोरस (P)",
    phosphorusDesc:
      "जड़ों के विकास, फूल आने और फसल की स्थापना में सहायता करता है।",
    phosphorusSources: "सामान्य स्रोत: DAP और फॉस्फोरस उर्वरक",
    potassium: "पोटैशियम (K)",
    potassiumDesc:
      "पौधे की मजबूती, जल नियंत्रण और फसल की गुणवत्ता में सहायता करता है।",
    potassiumSources: "सामान्य स्रोत: MOP और पोटैशियम उर्वरक",
    commonTypes: "सामान्य उर्वरक के प्रकार",
    urea: "यूरिया",
    ureaDesc:
      "नाइट्रोजन युक्त उर्वरक जो पौधे की पत्तियों और vegetative growth में सहायता करता है।",
    dap: "DAP",
    dapDesc:
      "नाइट्रोजन और फॉस्फोरस प्रदान करता है और फसल की शुरुआती वृद्धि में उपयोग किया जाता है।",
    mop: "MOP",
    mopDesc:
      "पोटैशियम की आवश्यकता होने पर उपयोग किया जाने वाला पोटैशियम उर्वरक।",
    organic: "जैविक खाद / कम्पोस्ट",
    organicDesc:
      "सही तरीके से तैयार और उपयोग करने पर मिट्टी में जैविक पदार्थ और पोषक तत्व बढ़ाने में सहायता कर सकता है।",
    goodPractices: "अच्छी उर्वरक उपयोग विधियाँ",
    soilTesting: "मिट्टी की जाँच को प्राथमिकता दें",
    soilTestingDesc:
      "जहाँ उपलब्ध हो, मिट्टी की जाँच की जानकारी का उपयोग करें।",
    avoidOver: "अधिक उपयोग से बचें",
    avoidOverDesc:
      "अधिक उर्वरक से पैसे की बर्बादी हो सकती है और मिट्टी व पानी प्रभावित हो सकते हैं।",
    irrigation: "सिंचाई का ध्यान रखें",
    irrigationDesc:
      "उर्वरक का उपयोग फसल की अवस्था और उपलब्ध नमी के अनुसार करें।",
    cropStage: "फसल की अवस्था का पालन करें",
    cropStageDesc:
      "फसल के विकास के साथ पोषक तत्वों की आवश्यकता बदलती है।",
    beforeApplying: "उर्वरक डालने से पहले",
    checkSoil: "यदि उपलब्ध हो तो अपनी मिट्टी की जाँच रिपोर्ट देखें।",
    useRecommended: "अपनी फसल और मिट्टी के लिए अनुशंसित उर्वरक का उपयोग करें।",
    dontMix: "बिना जानकारी के उर्वरकों को मिलाएँ या उपयोग न करें।",
    followLabel: "उत्पाद के लेबल और स्थानीय कृषि सलाह का पालन करें।",
  },

  bn: {
    backTo: "ফিরে যান",
    fertilizerNutrients: "সার ও পুষ্টি উপাদান",
    fertilizerGuide: "সার নির্দেশিকা",
    description:
      "আপনার ফসলের জন্য পুষ্টি উপাদান, সারের ধরন এবং প্রয়োগ পদ্ধতি সম্পর্কে সহজ তথ্য পান।",
    important: "গুরুত্বপূর্ণ",
    importantText:
      "মাটির অবস্থা, ফসলের জাত, ফসলের বয়স এবং পূর্বে ব্যবহৃত সারের উপর সারের প্রয়োজনীয়তা নির্ভর করতে পারে। সঠিক মাত্রার জন্য মাটি পরীক্ষার রিপোর্ট এবং স্থানীয় কৃষি বিশেষজ্ঞের পরামর্শ অনুসরণ করুন।",
    majorNutrients: "প্রধান পুষ্টি উপাদান",
    nitrogen: "নাইট্রোজেন (N)",
    nitrogenDesc: "পাতার স্বাস্থ্যকর বৃদ্ধি ও উদ্ভিদের সামগ্রিক বিকাশে সহায়তা করে।",
    nitrogenSources: "সাধারণ উৎস: ইউরিয়া ও নাইট্রোজেন সার",
    phosphorus: "ফসফরাস (P)",
    phosphorusDesc: "মূলের বৃদ্ধি, ফুল আসা এবং ফসল প্রতিষ্ঠায় সহায়তা করে।",
    phosphorusSources: "সাধারণ উৎস: DAP ও ফসফরাস সার",
    potassium: "পটাশিয়াম (K)",
    potassiumDesc: "উদ্ভিদের শক্তি, জল নিয়ন্ত্রণ এবং ফসলের গুণমান বজায় রাখতে সহায়তা করে।",
    potassiumSources: "সাধারণ উৎস: MOP ও পটাশিয়াম সার",
    commonTypes: "সাধারণ সারের ধরন",
    urea: "ইউরিয়া",
    ureaDesc: "উদ্ভিদের vegetative growth-এ সহায়তা করার জন্য ব্যবহৃত নাইট্রোজেন সমৃদ্ধ সার।",
    dap: "DAP",
    dapDesc: "নাইট্রোজেন ও ফসফরাস সরবরাহ করে এবং ফসলের প্রাথমিক বৃদ্ধিতে ব্যবহৃত হয়।",
    mop: "MOP",
    mopDesc: "ফসল ও মাটিতে পটাশিয়ামের প্রয়োজন হলে ব্যবহৃত হয়।",
    organic: "জৈব সার / কম্পোস্ট",
    organicDesc: "সঠিকভাবে প্রস্তুত ও প্রয়োগ করলে মাটির জৈব পদার্থ ও পুষ্টি বাড়াতে সাহায্য করে।",
    goodPractices: "ভালো সার ব্যবহারের পদ্ধতি",
    soilTesting: "মাটি পরীক্ষা করুন",
    soilTestingDesc: "সম্ভব হলে মাটি পরীক্ষার তথ্য ব্যবহার করুন।",
    avoidOver: "অতিরিক্ত ব্যবহার এড়িয়ে চলুন",
    avoidOverDesc: "অতিরিক্ত সার অর্থের অপচয় করতে পারে এবং মাটি ও পানি প্রভাবিত করতে পারে।",
    irrigation: "সেচের বিষয়টি বিবেচনা করুন",
    irrigationDesc: "ফসলের পর্যায় ও উপলব্ধ আর্দ্রতা অনুযায়ী সার প্রয়োগ করুন।",
    cropStage: "ফসলের পর্যায় অনুসরণ করুন",
    cropStageDesc: "ফসলের বৃদ্ধির সাথে পুষ্টির প্রয়োজন পরিবর্তিত হয়।",
    beforeApplying: "সার প্রয়োগের আগে",
    checkSoil: "সম্ভব হলে মাটি পরীক্ষার রিপোর্ট দেখুন।",
    useRecommended: "ফসল ও মাটির জন্য সুপারিশকৃত সার ব্যবহার করুন।",
    dontMix: "অন্ধভাবে সার মেশাবেন বা প্রয়োগ করবেন না।",
    followLabel: "পণ্যের লেবেল এবং স্থানীয় কৃষি পরামর্শ অনুসরণ করুন।",
  },

  mr: {
    backTo: "परत जा",
    fertilizerNutrients: "खते आणि पोषक घटक",
    fertilizerGuide: "खत मार्गदर्शक",
    description:
      "तुमच्या पिकासाठी पोषक घटक, खतांचे प्रकार आणि वापर पद्धतीबद्दल सोपी माहिती मिळवा.",
    important: "महत्त्वाचे",
    importantText:
      "मातीची स्थिती, पिकाची जात, पिकाचे वय आणि आधी केलेल्या खताच्या वापरानुसार खताची गरज बदलू शकते. अचूक मात्रेसाठी माती परीक्षण अहवाल आणि स्थानिक कृषी तज्ज्ञांचा सल्ला घ्या.",
    majorNutrients: "मुख्य पोषक घटक",
    nitrogen: "नायट्रोजन (N)",
    nitrogenDesc: "पानांची निरोगी वाढ आणि वनस्पतीच्या एकूण विकासास मदत करते.",
    nitrogenSources: "सामान्य स्रोत: युरिया आणि नायट्रोजन खते",
    phosphorus: "फॉस्फरस (P)",
    phosphorusDesc: "मुळांची वाढ, फुलोरा आणि पिकाच्या सुरुवातीच्या वाढीस मदत करते.",
    phosphorusSources: "सामान्य स्रोत: DAP आणि फॉस्फरस खते",
    potassium: "पोटॅशियम (K)",
    potassiumDesc: "वनस्पतीची मजबुती, पाण्याचे नियमन आणि पिकाची गुणवत्ता राखण्यास मदत करते.",
    potassiumSources: "सामान्य स्रोत: MOP आणि पोटॅशियम खते",
    commonTypes: "सामान्य खतांचे प्रकार",
    urea: "युरिया",
    ureaDesc: "वनस्पतीच्या वाढीस मदत करणारे नायट्रोजनयुक्त खत.",
    dap: "DAP",
    dapDesc: "नायट्रोजन आणि फॉस्फरस पुरवते आणि पिकाच्या सुरुवातीच्या वाढीत वापरले जाते.",
    mop: "MOP",
    mopDesc: "पिकाला आणि मातीला पोटॅशियमची गरज असल्यास वापरले जाते.",
    organic: "सेंद्रिय खत / कंपोस्ट",
    organicDesc: "योग्य प्रकारे तयार करून वापरल्यास मातीतील सेंद्रिय पदार्थ आणि पोषक घटक वाढवण्यास मदत करते.",
    goodPractices: "चांगल्या खत वापराच्या पद्धती",
    soilTesting: "माती परीक्षणाला प्राधान्य द्या",
    soilTestingDesc: "शक्य असल्यास माती परीक्षणाची माहिती वापरा.",
    avoidOver: "अति वापर टाळा",
    avoidOverDesc: "जास्त खतामुळे पैशांचा अपव्यय होऊ शकतो आणि माती व पाण्यावर परिणाम होऊ शकतो.",
    irrigation: "सिंचनाचा विचार करा",
    irrigationDesc: "पिकाची अवस्था आणि उपलब्ध ओलाव्यानुसार खत द्या.",
    cropStage: "पिकाच्या अवस्थेनुसार वापरा",
    cropStageDesc: "पिकाच्या वाढीनुसार पोषक घटकांची गरज बदलते.",
    beforeApplying: "खत देण्यापूर्वी",
    checkSoil: "शक्य असल्यास माती परीक्षण अहवाल तपासा.",
    useRecommended: "पिकासाठी आणि मातीसाठी शिफारस केलेले खत वापरा.",
    dontMix: "अंदाजाने खते मिसळू नका किंवा वापरू नका.",
    followLabel: "उत्पादनाचे लेबल आणि स्थानिक कृषी सल्ल्याचे पालन करा.",
  },

  ta: {
    backTo: "திரும்பு",
    fertilizerNutrients: "உரங்கள் மற்றும் ஊட்டச்சத்துகள்",
    fertilizerGuide: "உர வழிகாட்டி",
    description:
      "உங்கள் பயிருக்கு தேவையான ஊட்டச்சத்துகள், உர வகைகள் மற்றும் பயன்பாட்டு முறைகள் பற்றிய எளிய தகவலைப் பெறுங்கள்.",
    important: "முக்கியம்",
    importantText:
      "மண் நிலை, பயிர் வகை, பயிரின் வயது மற்றும் முந்தைய உரப் பயன்பாட்டைப் பொறுத்து உரத் தேவை மாறலாம். சரியான அளவிற்கு மண் பரிசோதனை அறிக்கை மற்றும் உள்ளூர் வேளாண் நிபுணரின் ஆலோசனையைப் பின்பற்றவும்.",
    majorNutrients: "முக்கிய ஊட்டச்சத்துகள்",
    nitrogen: "நைட்ரஜன் (N)",
    nitrogenDesc: "இலை வளர்ச்சி மற்றும் தாவரத்தின் ஒட்டுமொத்த வளர்ச்சிக்கு உதவுகிறது.",
    nitrogenSources: "பொதுவான ஆதாரங்கள்: யூரியா மற்றும் நைட்ரஜன் உரங்கள்",
    phosphorus: "பாஸ்பரஸ் (P)",
    phosphorusDesc: "வேர் வளர்ச்சி, பூக்கும் நிலை மற்றும் பயிர் வளர்ச்சிக்கு உதவுகிறது.",
    phosphorusSources: "பொதுவான ஆதாரங்கள்: DAP மற்றும் பாஸ்பரஸ் உரங்கள்",
    potassium: "பொட்டாசியம் (K)",
    potassiumDesc: "தாவர வலிமை, நீர் கட்டுப்பாடு மற்றும் பயிர் தரத்திற்கு உதவுகிறது.",
    potassiumSources: "பொதுவான ஆதாரங்கள்: MOP மற்றும் பொட்டாசியம் உரங்கள்",
    commonTypes: "பொதுவான உர வகைகள்",
    urea: "யூரியா",
    ureaDesc: "தாவர வளர்ச்சிக்கு உதவும் நைட்ரஜன் நிறைந்த உரம்.",
    dap: "DAP",
    dapDesc: "நைட்ரஜன் மற்றும் பாஸ்பரஸ் வழங்குகிறது மற்றும் ஆரம்ப வளர்ச்சியில் பயன்படுத்தப்படுகிறது.",
    mop: "MOP",
    mopDesc: "பயிர் மற்றும் மண்ணுக்கு பொட்டாசியம் தேவைப்படும் போது பயன்படுத்தப்படுகிறது.",
    organic: "இயற்கை உரம் / கம்போஸ்ட்",
    organicDesc: "சரியாக தயாரித்து பயன்படுத்தினால் மண்ணின் கரிமப் பொருள் மற்றும் ஊட்டச்சத்துகளை மேம்படுத்த உதவும்.",
    goodPractices: "நல்ல உரப் பயன்பாட்டு முறைகள்",
    soilTesting: "மண் பரிசோதனைக்கு முன்னுரிமை அளிக்கவும்",
    soilTestingDesc: "கிடைக்கும் போது மண் பரிசோதனை தகவலைப் பயன்படுத்தவும்.",
    avoidOver: "அதிகப்படியான பயன்பாட்டைத் தவிர்க்கவும்",
    avoidOverDesc: "அதிக உரம் பண விரயத்தையும் மண் மற்றும் நீர் பாதிப்பையும் ஏற்படுத்தலாம்.",
    irrigation: "நீர்ப்பாசனத்தை கருத்தில் கொள்ளவும்",
    irrigationDesc: "பயிர் நிலை மற்றும் கிடைக்கும் ஈரப்பதத்திற்கு ஏற்ப உரம் பயன்படுத்தவும்.",
    cropStage: "பயிர் நிலையைப் பின்பற்றவும்",
    cropStageDesc: "பயிர் வளரும்போது ஊட்டச்சத்து தேவைகள் மாறும்.",
    beforeApplying: "உரம் பயன்படுத்துவதற்கு முன்",
    checkSoil: "கிடைத்தால் மண் பரிசோதனை அறிக்கையைப் பார்க்கவும்.",
    useRecommended: "பயிர் மற்றும் மண்ணுக்கு பரிந்துரைக்கப்பட்ட உரத்தைப் பயன்படுத்தவும்.",
    dontMix: "தெரியாமல் உரங்களை கலந்து பயன்படுத்த வேண்டாம்.",
    followLabel: "தயாரிப்பு லேபிள் மற்றும் உள்ளூர் வேளாண் ஆலோசனையைப் பின்பற்றவும்.",
  },

  te: {
    backTo: "వెనక్కి వెళ్లండి",
    fertilizerNutrients: "ఎరువులు & పోషకాలు",
    fertilizerGuide: "ఎరువుల మార్గదర్శిని",
    description:
      "మీ పంటకు అవసరమైన పోషకాలు, ఎరువుల రకాలు మరియు వినియోగ పద్ధతుల గురించి సరళమైన సమాచారాన్ని పొందండి.",
    important: "ముఖ్యమైనది",
    importantText:
      "నేల పరిస్థితి, పంట రకం, పంట వయస్సు మరియు గతంలో ఉపయోగించిన ఎరువుల ఆధారంగా ఎరువుల అవసరం మారవచ్చు. ఖచ్చితమైన మోతాదుకు నేల పరీక్ష నివేదిక మరియు స్థానిక వ్యవసాయ నిపుణుల సలహాను అనుసరించండి.",
    majorNutrients: "ప్రధాన పోషకాలు",
    nitrogen: "నైట్రోజన్ (N)",
    nitrogenDesc: "ఆరోగ్యకరమైన ఆకుల పెరుగుదల మరియు మొక్క మొత్తం అభివృద్ధికి సహాయపడుతుంది.",
    nitrogenSources: "సాధారణ వనరులు: యూరియా మరియు నైట్రోజన్ ఎరువులు",
    phosphorus: "ఫాస్ఫరస్ (P)",
    phosphorusDesc: "వేర్ల పెరుగుదల, పుష్పించడం మరియు పంట స్థాపనకు సహాయపడుతుంది.",
    phosphorusSources: "సాధారణ వనరులు: DAP మరియు ఫాస్ఫరస్ ఎరువులు",
    potassium: "పొటాషియం (K)",
    potassiumDesc: "మొక్క బలం, నీటి నియంత్రణ మరియు పంట నాణ్యతకు సహాయపడుతుంది.",
    potassiumSources: "సాధారణ వనరులు: MOP మరియు పొటాషియం ఎరువులు",
    commonTypes: "సాధారణ ఎరువుల రకాలు",
    urea: "యూరియా",
    ureaDesc: "మొక్కల పెరుగుదలకు సహాయపడే నైట్రోజన్ అధికంగా ఉన్న ఎరువు.",
    dap: "DAP",
    dapDesc: "నైట్రోజన్ మరియు ఫాస్ఫరస్ అందిస్తుంది మరియు పంట ప్రారంభ దశలో ఉపయోగిస్తారు.",
    mop: "MOP",
    mopDesc: "పంట మరియు నేలకు పొటాషియం అవసరమైనప్పుడు ఉపయోగిస్తారు.",
    organic: "సేంద్రియ ఎరువు / కంపోస్ట్",
    organicDesc: "సరిగ్గా తయారు చేసి ఉపయోగిస్తే నేలలో సేంద్రియ పదార్థం మరియు పోషకాలను మెరుగుపరచడంలో సహాయపడుతుంది.",
    goodPractices: "మంచి ఎరువుల వినియోగ పద్ధతులు",
    soilTesting: "నేల పరీక్షకు ప్రాధాన్యత ఇవ్వండి",
    soilTestingDesc: "అందుబాటులో ఉన్నప్పుడు నేల పరీక్ష సమాచారాన్ని ఉపయోగించండి.",
    avoidOver: "అధిక వినియోగాన్ని నివారించండి",
    avoidOverDesc: "అధిక ఎరువులు డబ్బు వృథా చేయడమే కాకుండా నేల మరియు నీటిని ప్రభావితం చేయవచ్చు.",
    irrigation: "నీటిపారుదలను పరిగణించండి",
    irrigationDesc: "పంట దశ మరియు అందుబాటులో ఉన్న తేమ ఆధారంగా ఎరువులు వేయండి.",
    cropStage: "పంట దశను అనుసరించండి",
    cropStageDesc: "పంట పెరుగుతున్న కొద్దీ పోషక అవసరాలు మారుతాయి.",
    beforeApplying: "ఎరువులు వేయడానికి ముందు",
    checkSoil: "అందుబాటులో ఉంటే నేల పరీక్ష నివేదికను చూడండి.",
    useRecommended: "మీ పంట మరియు నేలకు సిఫారసు చేసిన ఎరువును ఉపయోగించండి.",
    dontMix: "తెలియకుండా ఎరువులను కలపవద్దు లేదా ఉపయోగించవద్దు.",
    followLabel: "ఉత్పత్తి లేబుల్ మరియు స్థానిక వ్యవసాయ సలహాను అనుసరించండి.",
  },

  gu: {
    backTo: "પાછા જાઓ",
    fertilizerNutrients: "ખાતર અને પોષક તત્વો",
    fertilizerGuide: "ખાતર માર્ગદર્શિકા",
    description:
      "તમારા પાક માટે પોષક તત્વો, ખાતરના પ્રકારો અને ઉપયોગની પદ્ધતિ વિશે સરળ માહિતી મેળવો.",
    important: "મહત્વપૂર્ણ",
    importantText:
      "માટીની સ્થિતિ, પાકની જાત, પાકની ઉંમર અને અગાઉના ખાતરના ઉપયોગ અનુસાર ખાતરની જરૂરિયાત બદલાઈ શકે છે. ચોક્કસ માત્રા માટે માટી પરીક્ષણ રિપોર્ટ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ અનુસરો.",
    majorNutrients: "મુખ્ય પોષક તત્વો",
    nitrogen: "નાઇટ્રોજન (N)",
    nitrogenDesc: "પાંદડાની તંદુરસ્ત વૃદ્ધિ અને છોડના સમગ્ર વિકાસમાં મદદ કરે છે.",
    nitrogenSources: "સામાન્ય સ્ત્રોત: યુરિયા અને નાઇટ્રોજન ખાતરો",
    phosphorus: "ફોસ્ફરસ (P)",
    phosphorusDesc: "મૂળના વિકાસ, ફૂલ આવવા અને પાકની શરૂઆતમાં મદદ કરે છે.",
    phosphorusSources: "સામાન્ય સ્ત્રોત: DAP અને ફોસ્ફરસ ખાતરો",
    potassium: "પોટેશિયમ (K)",
    potassiumDesc: "છોડની મજબૂતી, પાણીનું નિયંત્રણ અને પાકની ગુણવત્તામાં મદદ કરે છે.",
    potassiumSources: "સામાન્ય સ્ત્રોત: MOP અને પોટેશિયમ ખાતરો",
    commonTypes: "સામાન્ય ખાતરના પ્રકારો",
    urea: "યુરિયા",
    ureaDesc: "છોડની વૃદ્ધિ માટે ઉપયોગમાં લેવાતું નાઇટ્રોજન સમૃદ્ધ ખાતર.",
    dap: "DAP",
    dapDesc: "નાઇટ્રોજન અને ફોસ્ફરસ આપે છે અને પાકની શરૂઆતની વૃદ્ધિમાં ઉપયોગ થાય છે.",
    mop: "MOP",
    mopDesc: "પાક અને માટીને પોટેશિયમની જરૂર હોય ત્યારે ઉપયોગમાં લેવાય છે.",
    organic: "સજીવ ખાતર / કમ્પોસ્ટ",
    organicDesc: "યોગ્ય રીતે તૈયાર અને ઉપયોગ કરવાથી માટીના સજીવ પદાર્થ અને પોષક તત્વોમાં સુધારો કરી શકે છે.",
    goodPractices: "સારી ખાતર ઉપયોગ પદ્ધતિઓ",
    soilTesting: "માટી પરીક્ષણને પ્રાથમિકતા આપો",
    soilTestingDesc: "ઉપલબ્ધ હોય ત્યારે માટી પરીક્ષણની માહિતીનો ઉપયોગ કરો.",
    avoidOver: "વધુ ઉપયોગ ટાળો",
    avoidOverDesc: "વધુ ખાતર પૈસાનો બગાડ કરી શકે છે અને માટી તથા પાણી પર અસર કરી શકે છે.",
    irrigation: "સિંચાઈનો વિચાર કરો",
    irrigationDesc: "પાકની અવસ્થા અને ઉપલબ્ધ ભેજ અનુસાર ખાતરનો ઉપયોગ કરો.",
    cropStage: "પાકની અવસ્થાનું પાલન કરો",
    cropStageDesc: "પાકના વિકાસ સાથે પોષક તત્વોની જરૂરિયાત બદલાય છે.",
    beforeApplying: "ખાતર નાખતા પહેલાં",
    checkSoil: "ઉપલબ્ધ હોય તો માટી પરીક્ષણ રિપોર્ટ તપાસો.",
    useRecommended: "તમારા પાક અને માટી માટે ભલામણ કરાયેલ ખાતરનો ઉપયોગ કરો.",
    dontMix: "અજાણતા ખાતરો ભેળવો અથવા ઉપયોગ ન કરો.",
    followLabel: "ઉત્પાદનનું લેબલ અને સ્થાનિક કૃષિ સલાહ અનુસરો.",
  },

  kn: {
    backTo: "ಹಿಂದೆ ಹೋಗಿ",
    fertilizerNutrients: "ರಸಗೊಬ್ಬರ ಮತ್ತು ಪೋಷಕಾಂಶಗಳು",
    fertilizerGuide: "ರಸಗೊಬ್ಬರ ಮಾರ್ಗದರ್ಶಿ",
    description:
      "ನಿಮ್ಮ ಬೆಳೆಗೆ ಅಗತ್ಯವಿರುವ ಪೋಷಕಾಂಶಗಳು, ರಸಗೊಬ್ಬರಗಳ ವಿಧಗಳು ಮತ್ತು ಬಳಕೆಯ ವಿಧಾನಗಳ ಬಗ್ಗೆ ಸರಳ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ.",
    important: "ಮುಖ್ಯ",
    importantText:
      "ಮಣ್ಣಿನ ಸ್ಥಿತಿ, ಬೆಳೆಯ ವಿಧ, ಬೆಳೆಯ ವಯಸ್ಸು ಮತ್ತು ಹಿಂದಿನ ರಸಗೊಬ್ಬರ ಬಳಕೆಯ ಆಧಾರದ ಮೇಲೆ ಅಗತ್ಯ ಬದಲಾಗಬಹುದು. ಸರಿಯಾದ ಪ್ರಮಾಣಕ್ಕಾಗಿ ಮಣ್ಣು ಪರೀಕ್ಷಾ ವರದಿ ಮತ್ತು ಸ್ಥಳೀಯ ಕೃಷಿ ತಜ್ಞರ ಸಲಹೆಯನ್ನು ಅನುಸರಿಸಿ.",
    majorNutrients: "ಮುಖ್ಯ ಪೋಷಕಾಂಶಗಳು",
    nitrogen: "ನೈಟ್ರೋಜನ್ (N)",
    nitrogenDesc: "ಆರೋಗ್ಯಕರ ಎಲೆಗಳ ಬೆಳವಣಿಗೆ ಮತ್ತು ಸಸ್ಯದ ಒಟ್ಟಾರೆ ಅಭಿವೃದ್ಧಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    nitrogenSources: "ಸಾಮಾನ್ಯ ಮೂಲಗಳು: ಯೂರಿಯಾ ಮತ್ತು ನೈಟ್ರೋಜನ್ ರಸಗೊಬ್ಬರಗಳು",
    phosphorus: "ಫಾಸ್ಫರಸ್ (P)",
    phosphorusDesc: "ಬೇರುಗಳ ಬೆಳವಣಿಗೆ, ಹೂಬಿಡುವಿಕೆ ಮತ್ತು ಬೆಳೆಯ ಸ್ಥಾಪನೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    phosphorusSources: "ಸಾಮಾನ್ಯ ಮೂಲಗಳು: DAP ಮತ್ತು ಫಾಸ್ಫರಸ್ ರಸಗೊಬ್ಬರಗಳು",
    potassium: "ಪೊಟ್ಯಾಸಿಯಂ (K)",
    potassiumDesc: "ಸಸ್ಯದ ಬಲ, ನೀರಿನ ನಿಯಂತ್ರಣ ಮತ್ತು ಬೆಳೆಯ ಗುಣಮಟ್ಟಕ್ಕೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    potassiumSources: "ಸಾಮಾನ್ಯ ಮೂಲಗಳು: MOP ಮತ್ತು ಪೊಟ್ಯಾಸಿಯಂ ರಸಗೊಬ್ಬರಗಳು",
    commonTypes: "ಸಾಮಾನ್ಯ ರಸಗೊಬ್ಬರಗಳ ವಿಧಗಳು",
    urea: "ಯೂರಿಯಾ",
    ureaDesc: "ಸಸ್ಯದ ಬೆಳವಣಿಗೆಗೆ ಸಹಾಯ ಮಾಡುವ ನೈಟ್ರೋಜನ್ ಸಮೃದ್ಧ ರಸಗೊಬ್ಬರ.",
    dap: "DAP",
    dapDesc: "ನೈಟ್ರೋಜನ್ ಮತ್ತು ಫಾಸ್ಫರಸ್ ಒದಗಿಸುತ್ತದೆ ಮತ್ತು ಬೆಳೆಯ ಆರಂಭಿಕ ಬೆಳವಣಿಗೆಯಲ್ಲಿ ಬಳಸಲಾಗುತ್ತದೆ.",
    mop: "MOP",
    mopDesc: "ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿಗೆ ಪೊಟ್ಯಾಸಿಯಂ ಅಗತ್ಯವಿದ್ದಾಗ ಬಳಸಲಾಗುತ್ತದೆ.",
    organic: "ಸಾವಯವ ಗೊಬ್ಬರ / ಕಾಂಪೋಸ್ಟ್",
    organicDesc: "ಸರಿಯಾಗಿ ತಯಾರಿಸಿ ಬಳಸಿದರೆ ಮಣ್ಣಿನ ಸಾವಯವ ಪದಾರ್ಥ ಮತ್ತು ಪೋಷಕಾಂಶಗಳನ್ನು ಸುಧಾರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    goodPractices: "ಉತ್ತಮ ರಸಗೊಬ್ಬರ ಬಳಕೆ ವಿಧಾನಗಳು",
    soilTesting: "ಮಣ್ಣು ಪರೀಕ್ಷೆಗೆ ಆದ್ಯತೆ ನೀಡಿ",
    soilTestingDesc: "ಲಭ್ಯವಿದ್ದಾಗ ಮಣ್ಣು ಪರೀಕ್ಷೆಯ ಮಾಹಿತಿಯನ್ನು ಬಳಸಿ.",
    avoidOver: "ಅತಿಯಾದ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ",
    avoidOverDesc: "ಹೆಚ್ಚಿನ ರಸಗೊಬ್ಬರ ಹಣ ವ್ಯರ್ಥವಾಗಲು ಮತ್ತು ಮಣ್ಣು ಹಾಗೂ ನೀರಿನ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಲು ಕಾರಣವಾಗಬಹುದು.",
    irrigation: "ನೀರಾವರಿಯನ್ನು ಪರಿಗಣಿಸಿ",
    irrigationDesc: "ಬೆಳೆಯ ಹಂತ ಮತ್ತು ಲಭ್ಯವಿರುವ ತೇವಾಂಶದ ಆಧಾರದ ಮೇಲೆ ರಸಗೊಬ್ಬರ ಬಳಸಿ.",
    cropStage: "ಬೆಳೆಯ ಹಂತವನ್ನು ಅನುಸರಿಸಿ",
    cropStageDesc: "ಬೆಳೆಯ ಬೆಳವಣಿಗೆಯೊಂದಿಗೆ ಪೋಷಕಾಂಶಗಳ ಅಗತ್ಯ ಬದಲಾಗುತ್ತದೆ.",
    beforeApplying: "ರಸಗೊಬ್ಬರ ಹಾಕುವ ಮೊದಲು",
    checkSoil: "ಲಭ್ಯವಿದ್ದರೆ ಮಣ್ಣು ಪರೀಕ್ಷಾ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    useRecommended: "ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿಗೆ ಶಿಫಾರಸು ಮಾಡಿದ ರಸಗೊಬ್ಬರವನ್ನು ಬಳಸಿ.",
    dontMix: "ತಿಳಿಯದೆ ರಸಗೊಬ್ಬರಗಳನ್ನು ಮಿಶ್ರಣ ಮಾಡಬೇಡಿ ಅಥವಾ ಬಳಸಬೇಡಿ.",
    followLabel: "ಉತ್ಪನ್ನದ ಲೇಬಲ್ ಮತ್ತು ಸ್ಥಳೀಯ ಕೃಷಿ ಸಲಹೆಯನ್ನು ಅನುಸರಿಸಿ.",
  },

  ml: {
    backTo: "തിരികെ പോകുക",
    fertilizerNutrients: "വളങ്ങളും പോഷകങ്ങളും",
    fertilizerGuide: "വള മാർഗ്ഗനിർദ്ദേശം",
    description:
      "നിങ്ങളുടെ വിളയ്ക്ക് ആവശ്യമായ പോഷകങ്ങൾ, വളങ്ങളുടെ തരങ്ങൾ, ഉപയോഗ രീതികൾ എന്നിവയെക്കുറിച്ചുള്ള ലളിതമായ വിവരങ്ങൾ നേടുക.",
    important: "പ്രധാനപ്പെട്ടത്",
    importantText:
      "മണ്ണിന്റെ അവസ്ഥ, വിളയുടെ ഇനം, വിളയുടെ പ്രായം, മുമ്പ് ഉപയോഗിച്ച വളങ്ങൾ എന്നിവ അനുസരിച്ച് വളത്തിന്റെ ആവശ്യം മാറാം. കൃത്യമായ അളവിനായി മണ്ണ് പരിശോധനാ റിപ്പോർട്ടും പ്രാദേശിക കാർഷിക വിദഗ്ധരുടെ നിർദ്ദേശവും പിന്തുടരുക.",
    majorNutrients: "പ്രധാന പോഷകങ്ങൾ",
    nitrogen: "നൈട്രജൻ (N)",
    nitrogenDesc: "ആരോഗ്യകരമായ ഇല വളർച്ചയ്ക്കും ചെടിയുടെ മൊത്തത്തിലുള്ള വളർച്ചയ്ക്കും സഹായിക്കുന്നു.",
    nitrogenSources: "സാധാരണ ഉറവിടങ്ങൾ: യൂറിയയും നൈട്രജൻ വളങ്ങളും",
    phosphorus: "ഫോസ്ഫറസ് (P)",
    phosphorusDesc: "വേരുകളുടെ വളർച്ച, പൂക്കൽ, വിളയുടെ സ്ഥാപനം എന്നിവയ്ക്ക് സഹായിക്കുന്നു.",
    phosphorusSources: "സാധാരണ ഉറവിടങ്ങൾ: DAP, ഫോസ്ഫറസ് വളങ്ങൾ",
    potassium: "പൊട്ടാസ്യം (K)",
    potassiumDesc: "ചെടിയുടെ ശക്തി, ജലനിയന്ത്രണം, വിളയുടെ ഗുണനിലവാരം എന്നിവയ്ക്ക് സഹായിക്കുന്നു.",
    potassiumSources: "സാധാരണ ഉറവിടങ്ങൾ: MOP, പൊട്ടാസ്യം വളങ്ങൾ",
    commonTypes: "സാധാരണ വളങ്ങളുടെ തരങ്ങൾ",
    urea: "യൂറിയ",
    ureaDesc: "ചെടിയുടെ വളർച്ചയെ സഹായിക്കുന്ന നൈട്രജൻ സമ്പന്നമായ വളം.",
    dap: "DAP",
    dapDesc: "നൈട്രജനും ഫോസ്ഫറസും നൽകുകയും വിളയുടെ പ്രാരംഭ വളർച്ചയിൽ ഉപയോഗിക്കുകയും ചെയ്യുന്നു.",
    mop: "MOP",
    mopDesc: "വിളയ്ക്കും മണ്ണിനും പൊട്ടാസ്യം ആവശ്യമായപ്പോൾ ഉപയോഗിക്കുന്നു.",
    organic: "ജൈവവളം / കമ്പോസ്റ്റ്",
    organicDesc: "ശരിയായി തയ്യാറാക്കി ഉപയോഗിച്ചാൽ മണ്ണിലെ ജൈവവസ്തുവും പോഷകങ്ങളും മെച്ചപ്പെടുത്താൻ സഹായിക്കും.",
    goodPractices: "നല്ല വളപ്രയോഗ രീതികൾ",
    soilTesting: "മണ്ണ് പരിശോധനയ്ക്ക് മുൻഗണന നൽകുക",
    soilTestingDesc: "ലഭ്യമാകുമ്പോൾ മണ്ണ് പരിശോധനാ വിവരങ്ങൾ ഉപയോഗിക്കുക.",
    avoidOver: "അമിത പ്രയോഗം ഒഴിവാക്കുക",
    avoidOverDesc: "അധിക വളം പണത്തിന്റെ പാഴ്‌ച്ചയ്ക്കും മണ്ണിനും വെള്ളത്തിനും ദോഷത്തിനും കാരണമാകാം.",
    irrigation: "ജലസേചനം പരിഗണിക്കുക",
    irrigationDesc: "വിളയുടെ ഘട്ടവും ലഭ്യമായ ഈർപ്പവും അനുസരിച്ച് വളം പ്രയോഗിക്കുക.",
    cropStage: "വിളയുടെ ഘട്ടം പിന്തുടരുക",
    cropStageDesc: "വിള വളരുന്നതിനനുസരിച്ച് പോഷക ആവശ്യങ്ങൾ മാറുന്നു.",
    beforeApplying: "വളം പ്രയോഗിക്കുന്നതിന് മുമ്പ്",
    checkSoil: "ലഭ്യമെങ്കിൽ മണ്ണ് പരിശോധനാ റിപ്പോർട്ട് പരിശോധിക്കുക.",
    useRecommended: "നിങ്ങളുടെ വിളയ്ക്കും മണ്ണിനും ശുപാർശ ചെയ്ത വളം ഉപയോഗിക്കുക.",
    dontMix: "അറിയാതെ വളങ്ങൾ കലർത്തുകയോ പ്രയോഗിക്കുകയോ ചെയ്യരുത്.",
    followLabel: "ഉൽപ്പന്ന ലേബലും പ്രാദേശിക കാർഷിക നിർദ്ദേശങ്ങളും പിന്തുടരുക.",
  },

  pa: {
    backTo: "ਵਾਪਸ ਜਾਓ",
    fertilizerNutrients: "ਖਾਦ ਅਤੇ ਪੋਸ਼ਕ ਤੱਤ",
    fertilizerGuide: "ਖਾਦ ਗਾਈਡ",
    description:
      "ਆਪਣੀ ਫਸਲ ਲਈ ਪੋਸ਼ਕ ਤੱਤਾਂ, ਖਾਦਾਂ ਦੀਆਂ ਕਿਸਮਾਂ ਅਤੇ ਵਰਤੋਂ ਬਾਰੇ ਸਧਾਰਨ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ।",
    important: "ਮਹੱਤਵਪੂਰਨ",
    importantText:
      "ਖਾਦ ਦੀ ਲੋੜ ਮਿੱਟੀ ਦੀ ਸਥਿਤੀ, ਫਸਲ ਦੀ ਕਿਸਮ, ਫਸਲ ਦੀ ਉਮਰ ਅਤੇ ਪਹਿਲਾਂ ਵਰਤੀ ਖਾਦ ਦੇ ਅਨੁਸਾਰ ਬਦਲ ਸਕਦੀ ਹੈ। ਸਹੀ ਮਾਤਰਾ ਲਈ ਮਿੱਟੀ ਟੈਸਟ ਰਿਪੋਰਟ ਅਤੇ ਸਥਾਨਕ ਖੇਤੀ ਮਾਹਿਰ ਦੀ ਸਲਾਹ ਮੰਨੋ।",
    majorNutrients: "ਮੁੱਖ ਪੋਸ਼ਕ ਤੱਤ",
    nitrogen: "ਨਾਈਟ੍ਰੋਜਨ (N)",
    nitrogenDesc: "ਪੱਤਿਆਂ ਦੀ ਸਿਹਤਮੰਦ ਵਾਧੇ ਅਤੇ ਪੌਦੇ ਦੇ ਸਮੁੱਚੇ ਵਿਕਾਸ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
    nitrogenSources: "ਆਮ ਸਰੋਤ: ਯੂਰੀਆ ਅਤੇ ਨਾਈਟ੍ਰੋਜਨ ਖਾਦਾਂ",
    phosphorus: "ਫਾਸਫੋਰਸ (P)",
    phosphorusDesc: "ਜੜ੍ਹਾਂ ਦੇ ਵਿਕਾਸ, ਫੁੱਲ ਆਉਣ ਅਤੇ ਫਸਲ ਦੀ ਸਥਾਪਨਾ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
    phosphorusSources: "ਆਮ ਸਰੋਤ: DAP ਅਤੇ ਫਾਸਫੋਰਸ ਖਾਦਾਂ",
    potassium: "ਪੋਟਾਸ਼ੀਅਮ (K)",
    potassiumDesc: "ਪੌਦੇ ਦੀ ਮਜ਼ਬੂਤੀ, ਪਾਣੀ ਦੇ ਨਿਯੰਤਰਣ ਅਤੇ ਫਸਲ ਦੀ ਗੁਣਵੱਤਾ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
    potassiumSources: "ਆਮ ਸਰੋਤ: MOP ਅਤੇ ਪੋਟਾਸ਼ੀਅਮ ਖਾਦਾਂ",
    commonTypes: "ਆਮ ਖਾਦਾਂ ਦੀਆਂ ਕਿਸਮਾਂ",
    urea: "ਯੂਰੀਆ",
    ureaDesc: "ਪੌਦੇ ਦੀ ਵਾਧੇ ਲਈ ਵਰਤੀ ਜਾਣ ਵਾਲੀ ਨਾਈਟ੍ਰੋਜਨ ਭਰਪੂਰ ਖਾਦ।",
    dap: "DAP",
    dapDesc: "ਨਾਈਟ੍ਰੋਜਨ ਅਤੇ ਫਾਸਫੋਰਸ ਦਿੰਦੀ ਹੈ ਅਤੇ ਫਸਲ ਦੀ ਸ਼ੁਰੂਆਤੀ ਵਾਧੇ ਵਿੱਚ ਵਰਤੀ ਜਾਂਦੀ ਹੈ।",
    mop: "MOP",
    mopDesc: "ਜਦੋਂ ਫਸਲ ਅਤੇ ਮਿੱਟੀ ਨੂੰ ਪੋਟਾਸ਼ੀਅਮ ਦੀ ਲੋੜ ਹੋਵੇ ਤਾਂ ਵਰਤੀ ਜਾਂਦੀ ਹੈ।",
    organic: "ਜੈਵਿਕ ਖਾਦ / ਕੰਪੋਸਟ",
    organicDesc: "ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਤਿਆਰ ਅਤੇ ਵਰਤੋਂ ਕਰਨ ਨਾਲ ਮਿੱਟੀ ਦੇ ਜੈਵਿਕ ਪਦਾਰਥ ਅਤੇ ਪੋਸ਼ਕ ਤੱਤਾਂ ਵਿੱਚ ਸੁਧਾਰ ਹੋ ਸਕਦਾ ਹੈ।",
    goodPractices: "ਚੰਗੀਆਂ ਖਾਦ ਵਰਤੋਂ ਦੀਆਂ ਪ੍ਰਥਾਵਾਂ",
    soilTesting: "ਮਿੱਟੀ ਟੈਸਟ ਨੂੰ ਤਰਜੀਹ ਦਿਓ",
    soilTestingDesc: "ਜਦੋਂ ਉਪਲਬਧ ਹੋਵੇ ਤਾਂ ਮਿੱਟੀ ਟੈਸਟ ਦੀ ਜਾਣਕਾਰੀ ਵਰਤੋ।",
    avoidOver: "ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਤੋਂ ਬਚੋ",
    avoidOverDesc: "ਜ਼ਿਆਦਾ ਖਾਦ ਪੈਸੇ ਦੀ ਬਰਬਾਦੀ ਅਤੇ ਮਿੱਟੀ ਤੇ ਪਾਣੀ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੀ ਹੈ।",
    irrigation: "ਸਿੰਚਾਈ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ",
    irrigationDesc: "ਫਸਲ ਦੀ ਅਵਸਥਾ ਅਤੇ ਉਪਲਬਧ ਨਮੀ ਅਨੁਸਾਰ ਖਾਦ ਵਰਤੋ।",
    cropStage: "ਫਸਲ ਦੀ ਅਵਸਥਾ ਅਨੁਸਾਰ ਚੱਲੋ",
    cropStageDesc: "ਫਸਲ ਦੇ ਵਿਕਾਸ ਨਾਲ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਲੋੜ ਬਦਲਦੀ ਹੈ।",
    beforeApplying: "ਖਾਦ ਪਾਉਣ ਤੋਂ ਪਹਿਲਾਂ",
    checkSoil: "ਜੇ ਉਪਲਬਧ ਹੋਵੇ ਤਾਂ ਮਿੱਟੀ ਟੈਸਟ ਰਿਪੋਰਟ ਵੇਖੋ।",
    useRecommended: "ਆਪਣੀ ਫਸਲ ਅਤੇ ਮਿੱਟੀ ਲਈ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਖਾਦ ਵਰਤੋ।",
    dontMix: "ਬਿਨਾਂ ਜਾਣਕਾਰੀ ਦੇ ਖਾਦਾਂ ਨੂੰ ਨਾ ਮਿਲਾਓ ਅਤੇ ਨਾ ਵਰਤੋ।",
    followLabel: "ਉਤਪਾਦ ਦੇ ਲੇਬਲ ਅਤੇ ਸਥਾਨਕ ਖੇਤੀਬਾੜੀ ਸਲਾਹ ਦੀ ਪਾਲਣਾ ਕਰੋ।",
  },

  or: {
    backTo: "ପଛକୁ ଯାଆନ୍ତୁ",
    fertilizerNutrients: "ସାର ଏବଂ ପୋଷକ ତତ୍ତ୍ୱ",
    fertilizerGuide: "ସାର ମାର୍ଗଦର୍ଶିକା",
    description:
      "ଆପଣଙ୍କ ଫସଲ ପାଇଁ ପୋଷକ ତତ୍ତ୍ୱ, ସାରର ପ୍ରକାର ଏବଂ ବ୍ୟବହାର ପଦ୍ଧତି ବିଷୟରେ ସରଳ ସୂଚନା ପାଆନ୍ତୁ।",
    important: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",
    importantText:
      "ମାଟିର ସ୍ଥିତି, ଫସଲର ପ୍ରକାର, ଫସଲର ବୟସ ଏବଂ ପୂର୍ବରୁ ବ୍ୟବହୃତ ସାର ଅନୁଯାୟୀ ସାରର ଆବଶ୍ୟକତା ବଦଳିପାରେ। ସଠିକ୍ ମାତ୍ରା ପାଇଁ ମାଟି ପରୀକ୍ଷା ରିପୋର୍ଟ ଏବଂ ସ୍ଥାନୀୟ କୃଷି ବିଶେଷଜ୍ଞଙ୍କ ପରାମର୍ଶ ଅନୁସରଣ କରନ୍ତୁ।",
    majorNutrients: "ମୁଖ୍ୟ ପୋଷକ ତତ୍ତ୍ୱ",
    nitrogen: "ନାଇଟ୍ରୋଜେନ (N)",
    nitrogenDesc: "ପତ୍ରର ସୁସ୍ଥ ବୃଦ୍ଧି ଏବଂ ଗଛର ସାମଗ୍ରିକ ବିକାଶରେ ସାହାଯ୍ୟ କରେ।",
    nitrogenSources: "ସାଧାରଣ ଉତ୍ସ: ୟୁରିଆ ଏବଂ ନାଇଟ୍ରୋଜେନ ସାର",
    phosphorus: "ଫସଫରସ (P)",
    phosphorusDesc: "ମୂଳ ବିକାଶ, ଫୁଲ ଆସିବା ଏବଂ ଫସଲ ସ୍ଥାପନରେ ସାହାଯ୍ୟ କରେ।",
    phosphorusSources: "ସାଧାରଣ ଉତ୍ସ: DAP ଏବଂ ଫସଫରସ ସାର",
    potassium: "ପୋଟାସିୟମ (K)",
    potassiumDesc: "ଗଛର ଶକ୍ତି, ଜଳ ନିୟନ୍ତ୍ରଣ ଏବଂ ଫସଲର ଗୁଣବତ୍ତାରେ ସାହାଯ୍ୟ କରେ।",
    potassiumSources: "ସାଧାରଣ ଉତ୍ସ: MOP ଏବଂ ପୋଟାସିୟମ ସାର",
    commonTypes: "ସାଧାରଣ ସାରର ପ୍ରକାର",
    urea: "ୟୁରିଆ",
    ureaDesc: "ଗଛର ବୃଦ୍ଧି ପାଇଁ ବ୍ୟବହୃତ ନାଇଟ୍ରୋଜେନ ଯୁକ୍ତ ସାର।",
    dap: "DAP",
    dapDesc: "ନାଇଟ୍ରୋଜେନ ଏବଂ ଫସଫରସ ପ୍ରଦାନ କରେ ଏବଂ ଫସଲର ପ୍ରାରମ୍ଭିକ ବୃଦ୍ଧିରେ ବ୍ୟବହୃତ ହୁଏ।",
    mop: "MOP",
    mopDesc: "ଫସଲ ଏବଂ ମାଟିକୁ ପୋଟାସିୟମ ଆବଶ୍ୟକ ହେଲେ ବ୍ୟବହୃତ ହୁଏ।",
    organic: "ଜୈବିକ ସାର / କମ୍ପୋଷ୍ଟ",
    organicDesc: "ଠିକ୍ ଭାବରେ ପ୍ରସ୍ତୁତ ଓ ବ୍ୟବହାର କଲେ ମାଟିର ଜୈବିକ ପଦାର୍ଥ ଓ ପୋଷକ ତତ୍ତ୍ୱ ବଢ଼ାଇବାରେ ସାହାଯ୍ୟ କରେ।",
    goodPractices: "ଭଲ ସାର ବ୍ୟବହାର ପଦ୍ଧତି",
    soilTesting: "ମାଟି ପରୀକ୍ଷାକୁ ପ୍ରାଥମିକତା ଦିଅନ୍ତୁ",
    soilTestingDesc: "ଉପଲବ୍ଧ ଥିଲେ ମାଟି ପରୀକ୍ଷାର ସୂଚନା ବ୍ୟବହାର କରନ୍ତୁ।",
    avoidOver: "ଅଧିକ ବ୍ୟବହାର ଏଡ଼ାନ୍ତୁ",
    avoidOverDesc: "ଅଧିକ ସାର ଟଙ୍କାର ଅପଚୟ କରିପାରେ ଏବଂ ମାଟି ଓ ପାଣିକୁ ପ୍ରଭାବିତ କରିପାରେ।",
    irrigation: "ଜଳସେଚନ ବିଚାର କରନ୍ତୁ",
    irrigationDesc: "ଫସଲର ଅବସ୍ଥା ଏବଂ ଉପଲବ୍ଧ ଆର୍ଦ୍ରତା ଅନୁଯାୟୀ ସାର ବ୍ୟବହାର କରନ୍ତୁ।",
    cropStage: "ଫସଲର ଅବସ୍ଥା ଅନୁସରଣ କରନ୍ତୁ",
    cropStageDesc: "ଫସଲ ବଢ଼ିବା ସହିତ ପୋଷକ ତତ୍ତ୍ୱର ଆବଶ୍ୟକତା ବଦଳିଥାଏ।",
    beforeApplying: "ସାର ପ୍ରୟୋଗ ପୂର୍ବରୁ",
    checkSoil: "ଉପଲବ୍ଧ ଥିଲେ ମାଟି ପରୀକ୍ଷା ରିପୋର୍ଟ ଦେଖନ୍ତୁ।",
    useRecommended: "ଆପଣଙ୍କ ଫସଲ ଏବଂ ମାଟି ପାଇଁ ସୁପାରିଶ କରାଯାଇଥିବା ସାର ବ୍ୟବହାର କରନ୍ତୁ।",
    dontMix: "ବିନା ଜାଣି ସାରକୁ ମିଶାନ୍ତୁ ନାହିଁ କିମ୍ବା ପ୍ରୟୋଗ କରନ୍ତୁ ନାହିଁ।",
    followLabel: "ଉତ୍ପାଦ ଲେବେଲ ଏବଂ ସ୍ଥାନୀୟ କୃଷି ପରାମର୍ଶ ଅନୁସରଣ କରନ୍ତୁ।",
  },

  as: {
    backTo: "উভতি যাওক",
    fertilizerNutrients: "সাৰ আৰু পুষ্টি উপাদান",
    fertilizerGuide: "সাৰ নিৰ্দেশিকা",
    description:
      "আপোনাৰ শস্যৰ বাবে পুষ্টি উপাদান, সাৰৰ প্ৰকাৰ আৰু প্ৰয়োগ পদ্ধতিৰ বিষয়ে সহজ তথ্য লাভ কৰক।",
    important: "গুৰুত্বপূৰ্ণ",
    importantText:
      "মাটিৰ অৱস্থা, শস্যৰ জাত, শস্যৰ বয়স আৰু পূৰ্বতে ব্যৱহাৰ কৰা সাৰৰ ওপৰত সাৰৰ প্ৰয়োজনীয়তা নিৰ্ভৰ কৰিব পাৰে। সঠিক মাত্ৰাৰ বাবে মাটি পৰীক্ষাৰ প্ৰতিবেদন আৰু স্থানীয় কৃষি বিশেষজ্ঞৰ পৰামৰ্শ অনুসৰণ কৰক।",
    majorNutrients: "মুখ্য পুষ্টি উপাদান",
    nitrogen: "নাইট্ৰজেন (N)",
    nitrogenDesc: "পাতৰ স্বাস্থ্যকৰ বৃদ্ধি আৰু গছৰ সামগ্ৰিক বিকাশত সহায় কৰে।",
    nitrogenSources: "সাধাৰণ উৎস: ইউৰিয়া আৰু নাইট্ৰজেন সাৰ",
    phosphorus: "ফছফৰাছ (P)",
    phosphorusDesc: "শিপাৰ বৃদ্ধি, ফুল ফুলা আৰু শস্য স্থাপনৰ ক্ষেত্ৰত সহায় কৰে।",
    phosphorusSources: "সাধাৰণ উৎস: DAP আৰু ফছফৰাছ সাৰ",
    potassium: "পটাছিয়াম (K)",
    potassiumDesc: "গছৰ শক্তি, পানী নিয়ন্ত্ৰণ আৰু শস্যৰ গুণগত মানত সহায় কৰে।",
    potassiumSources: "সাধাৰণ উৎস: MOP আৰু পটাছিয়াম সাৰ",
    commonTypes: "সাধাৰণ সাৰৰ প্ৰকাৰ",
    urea: "ইউৰিয়া",
    ureaDesc: "গছৰ বৃদ্ধিৰ বাবে ব্যৱহাৰ কৰা নাইট্ৰজেন সমৃদ্ধ সাৰ।",
    dap: "DAP",
    dapDesc: "নাইট্ৰজেন আৰু ফছফৰাছ প্ৰদান কৰে আৰু শস্যৰ আৰম্ভণিৰ বৃদ্ধিত ব্যৱহাৰ কৰা হয়।",
    mop: "MOP",
    mopDesc: "শস্য আৰু মাটিত পটাছিয়ামৰ প্ৰয়োজন হ'লে ব্যৱহাৰ কৰা হয়।",
    organic: "জৈৱিক সাৰ / কম্পোষ্ট",
    organicDesc: "সঠিকভাৱে প্ৰস্তুত আৰু প্ৰয়োগ কৰিলে মাটিৰ জৈৱিক পদাৰ্থ আৰু পুষ্টি উপাদান উন্নত কৰাত সহায় কৰিব পাৰে।",
    goodPractices: "ভাল সাৰ ব্যৱহাৰৰ পদ্ধতি",
    soilTesting: "মাটি পৰীক্ষাক অগ্ৰাধিকাৰ দিয়ক",
    soilTestingDesc: "উপলব্ধ হ'লে মাটি পৰীক্ষাৰ তথ্য ব্যৱহাৰ কৰক।",
    avoidOver: "অতিৰিক্ত প্ৰয়োগ এৰাই চলক",
    avoidOverDesc: "অতিৰিক্ত সাৰে ধনৰ অপচয় কৰিব পাৰে আৰু মাটি তথা পানীত প্ৰভাৱ পেলাব পাৰে।",
    irrigation: "জলসিঞ্চনৰ কথা বিবেচনা কৰক",
    irrigationDesc: "শস্যৰ পৰ্যায় আৰু উপলব্ধ আৰ্দ্ৰতাৰ ভিত্তিত সাৰ প্ৰয়োগ কৰক।",
    cropStage: "শস্যৰ পৰ্যায় অনুসৰণ কৰক",
    cropStageDesc: "শস্যৰ বিকাশৰ লগে লগে পুষ্টিৰ প্ৰয়োজনীয়তা সলনি হয়।",
    beforeApplying: "সাৰ প্ৰয়োগ কৰাৰ আগতে",
    checkSoil: "উপলব্ধ থাকিলে মাটি পৰীক্ষাৰ প্ৰতিবেদন চাওক।",
    useRecommended: "আপোনাৰ শস্য আৰু মাটিৰ বাবে পৰামৰ্শ দিয়া সাৰ ব্যৱহাৰ কৰক।",
    dontMix: "নজনাকৈ সাৰ মিহলি বা প্ৰয়োগ নকৰিব।",
    followLabel: "উৎপাদনৰ লেবেল আৰু স্থানীয় কৃষি পৰামৰ্শ অনুসৰণ কৰক।",
  },

  ur: {
    backTo: "واپس جائیں",
    fertilizerNutrients: "کھاد اور غذائی اجزاء",
    fertilizerGuide: "کھاد گائیڈ",
    description:
      "اپنی فصل کے لیے غذائی اجزاء، کھاد کی اقسام اور استعمال کے طریقوں کے بارے میں آسان معلومات حاصل کریں۔",
    important: "اہم",
    importantText:
      "کھاد کی ضرورت مٹی کی حالت، فصل کی قسم، فصل کی عمر اور پہلے استعمال کی گئی کھاد کے مطابق مختلف ہو سکتی ہے۔ درست مقدار کے لیے مٹی کے ٹیسٹ کی رپورٹ اور مقامی زرعی ماہر کی سفارش پر عمل کریں۔",
    majorNutrients: "اہم غذائی اجزاء",
    nitrogen: "نائٹروجن (N)",
    nitrogenDesc: "پتوں کی صحت مند نشوونما اور پودے کی مجموعی ترقی میں مدد کرتا ہے۔",
    nitrogenSources: "عام ذرائع: یوریا اور نائٹروجن کھادیں",
    phosphorus: "فاسفورس (P)",
    phosphorusDesc: "جڑوں کی نشوونما، پھول آنے اور فصل کے قیام میں مدد کرتا ہے۔",
    phosphorusSources: "عام ذرائع: DAP اور فاسفورس کھادیں",
    potassium: "پوٹاشیم (K)",
    potassiumDesc: "پودے کی مضبوطی، پانی کے انتظام اور فصل کے معیار میں مدد کرتا ہے۔",
    potassiumSources: "عام ذرائع: MOP اور پوٹاشیم کھادیں",
    commonTypes: "عام کھاد کی اقسام",
    urea: "یوریا",
    ureaDesc: "نائٹروجن سے بھرپور کھاد جو پودے کی نشوونما میں مدد دیتی ہے۔",
    dap: "DAP",
    dapDesc: "نائٹروجن اور فاسفورس فراہم کرتی ہے اور فصل کی ابتدائی نشوونما میں استعمال ہوتی ہے۔",
    mop: "MOP",
    mopDesc: "جب فصل اور مٹی کو پوٹاشیم کی ضرورت ہو تو استعمال کی جاتی ہے۔",
    organic: "نامیاتی کھاد / کمپوسٹ",
    organicDesc: "درست طریقے سے تیار اور استعمال کرنے پر مٹی کے نامیاتی مادے اور غذائی اجزاء کو بہتر بنانے میں مدد کر سکتی ہے۔",
    goodPractices: "کھاد کے استعمال کے اچھے طریقے",
    soilTesting: "مٹی کے ٹیسٹ کو ترجیح دیں",
    soilTestingDesc: "جب دستیاب ہو تو مٹی کے ٹیسٹ کی معلومات استعمال کریں۔",
    avoidOver: "زیادہ استعمال سے بچیں",
    avoidOverDesc: "زیادہ کھاد پیسے کا ضیاع کر سکتی ہے اور مٹی اور پانی کو متاثر کر سکتی ہے۔",
    irrigation: "آبپاشی کو مدنظر رکھیں",
    irrigationDesc: "فصل کی حالت اور دستیاب نمی کے مطابق کھاد استعمال کریں۔",
    cropStage: "فصل کی حالت کے مطابق استعمال کریں",
    cropStageDesc: "فصل کی نشوونما کے ساتھ غذائی ضروریات بدلتی رہتی ہیں۔",
    beforeApplying: "کھاد ڈالنے سے پہلے",
    checkSoil: "اگر دستیاب ہو تو مٹی کے ٹیسٹ کی رپورٹ دیکھیں۔",
    useRecommended: "اپنی فصل اور مٹی کے لیے تجویز کردہ کھاد استعمال کریں۔",
    dontMix: "بغیر معلومات کے کھادوں کو نہ ملائیں اور نہ استعمال کریں۔",
    followLabel: "مصنوعات کے لیبل اور مقامی زرعی مشورے پر عمل کریں۔",
  },
};

export default function FertilizerPage() {
  const params = useParams();
  const cropId = params?.id as string;

  const { language } = useLanguage();

  const t = translations[language] || translations.en;

  const cropName =
    cropId?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Crop";

  return (
    <main
      className="min-h-screen bg-gray-50 px-4 py-6 md:px-8"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-5xl">

        <Link
          href={`/crop/${cropId}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
        >
          ← {t.backTo} {cropName}
        </Link>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-3 text-4xl">🌱</div>

          <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
            {t.fertilizerNutrients}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {cropName} {t.fertilizerGuide}
          </h1>

          <p className="mt-3 max-w-3xl text-gray-600">
            {t.description}
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <h2 className="font-bold text-yellow-900">
            ⚠️ {t.important}
          </h2>

          <p className="mt-2 text-sm leading-6 text-yellow-800">
            {t.importantText}
          </p>
        </div>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            🧪 {t.majorNutrients}
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl">🟢</div>

              <h3 className="mt-3 text-lg font-bold text-gray-900">
                {t.nitrogen}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.nitrogenDesc}
              </p>

              <p className="mt-3 text-sm font-semibold text-green-700">
                {t.nitrogenSources}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl">🟠</div>

              <h3 className="mt-3 text-lg font-bold text-gray-900">
                {t.phosphorus}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.phosphorusDesc}
              </p>

              <p className="mt-3 text-sm font-semibold text-orange-700">
                {t.phosphorusSources}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl">🔵</div>

              <h3 className="mt-3 text-lg font-bold text-gray-900">
                {t.potassium}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.potassiumDesc}
              </p>

              <p className="mt-3 text-sm font-semibold text-blue-700">
                {t.potassiumSources}
              </p>
            </div>

          </div>
        </section>

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            🌾 {t.commonTypes}
          </h2>

          <div className="space-y-4">

            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">
                {t.urea}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {t.ureaDesc}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">
                {t.dap}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {t.dapDesc}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">
                {t.mop}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {t.mopDesc}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">
                {t.organic}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {t.organicDesc}
              </p>
            </div>

          </div>
        </section>

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            ✅ {t.goodPractices}
          </h2>

          <div className="grid gap-3 md:grid-cols-2">

            <div className="rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-900">
                🧪 {t.soilTesting}
              </p>

              <p className="mt-1 text-sm text-green-800">
                {t.soilTestingDesc}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-900">
                ⚖️ {t.avoidOver}
              </p>

              <p className="mt-1 text-sm text-green-800">
                {t.avoidOverDesc}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-900">
                💧 {t.irrigation}
              </p>

              <p className="mt-1 text-sm text-green-800">
                {t.irrigationDesc}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-900">
                📅 {t.cropStage}
              </p>

              <p className="mt-1 text-sm text-green-800">
                {t.cropStageDesc}
              </p>
            </div>

          </div>
        </section>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-bold text-red-900">
            🚨 {t.beforeApplying}
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-red-800">
            <li>{t.checkSoil}</li>
            <li>{t.useRecommended}</li>
            <li>{t.dontMix}</li>
            <li>{t.followLabel}</li>
          </ul>
        </div>

      </div>
    </main>
  );
}