"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "../../../../lib/LanguageProvider";
import type { LanguageCode } from "../../../../lib/language";

type Translation = {
  backTo: string;
  title: string;
  subtitle: string;
  whatToLookFor: string;
  leafDamage: string;
  leafDamageDesc: string;
  insectDamage: string;
  insectDamageDesc: string;
  spotsLesions: string;
  spotsLesionsDesc: string;
  moistureProblems: string;
  moistureProblemsDesc: string;
  commonProblems: string;
  fungalDisease: string;
  fungalDiseaseDesc: string;
  pestAttack: string;
  pestAttackDesc: string;
  environmentalStress: string;
  environmentalStressDesc: string;
  whatShouldYouDo: string;
  steps: string[];
  aiTitle: string;
  aiDescription: string;
  openAi: string;
  important: string;
  warning: string;
};

const english: Translation = {
  backTo: "Back to",
  title: "Disease & Pest Detection",
  subtitle:
    "Learn how to identify common crop diseases, pests and visible damage.",
  whatToLookFor: "🔍 What to Look For",
  leafDamage: "Leaf Damage",
  leafDamageDesc:
    "Look for unusual spots, yellowing, curling, holes or drying leaves.",
  insectDamage: "Insect Damage",
  insectDamageDesc:
    "Check leaves and stems for insects, eggs, webbing, holes or feeding damage.",
  spotsLesions: "Spots & Lesions",
  spotsLesionsDesc:
    "Brown, black, yellow or unusual patches may indicate disease or other crop stress.",
  moistureProblems: "Moisture Problems",
  moistureProblemsDesc:
    "Excess moisture can increase the risk of fungal and other disease problems.",
  commonProblems: "🌱 Common Crop Problems",
  fungalDisease: "Fungal Disease",
  fungalDiseaseDesc:
    "May appear as spots, patches, discoloration or fungal growth.",
  pestAttack: "Insect / Pest Attack",
  pestAttackDesc:
    "Feeding damage, holes, curled leaves or visible insects may indicate pest activity.",
  environmentalStress: "Environmental Stress",
  environmentalStressDesc:
    "Heat, cold, water stress or poor growing conditions can produce symptoms similar to disease.",
  whatShouldYouDo: "📋 What Should You Do?",
  steps: [
    "Inspect affected leaves, stems and crop parts carefully.",
    "Check whether the problem is spreading to nearby plants.",
    "Look for insects, eggs or other visible pest activity.",
    "Take a clear photo of the affected crop if possible.",
    "Avoid applying chemicals without correctly identifying the problem.",
    "Consult a local agriculture expert for serious or rapidly spreading problems.",
  ],
  aiTitle: "Want to check a crop image?",
  aiDescription:
    "Use the AI Crop Detector to upload an image and get possible disease or damage information.",
  openAi: "Open AI Crop Detector →",
  important: "⚠️ Important",
  warning:
    "Similar symptoms can have different causes. This page provides general guidance and should not be treated as a confirmed disease diagnosis.",
};

const translations: Record<LanguageCode, Translation> = {
  en: english,

  hi: {
    ...english,
    backTo: "वापस जाएँ",
    title: "फसल रोग और कीट पहचान",
    subtitle:
      "फसल में होने वाले सामान्य रोग, कीट और दिखाई देने वाले नुकसान को पहचानने के तरीके जानें।",
    whatToLookFor: "🔍 किन चीज़ों पर ध्यान दें",
    leafDamage: "पत्तियों का नुकसान",
    leafDamageDesc:
      "पत्तियों पर असामान्य धब्बे, पीलापन, मुड़ना, छेद या सूखापन देखें।",
    insectDamage: "कीटों से नुकसान",
    insectDamageDesc:
      "पत्तियों और तनों पर कीट, अंडे, जाला, छेद या खाने के निशान देखें।",
    spotsLesions: "धब्बे और घाव",
    spotsLesionsDesc:
      "भूरे, काले, पीले या असामान्य धब्बे रोग या फसल में किसी अन्य समस्या का संकेत हो सकते हैं।",
    moistureProblems: "नमी की समस्या",
    moistureProblemsDesc:
      "बहुत अधिक नमी से फफूंद और अन्य रोगों का खतरा बढ़ सकता है।",
    commonProblems: "🌱 फसल की सामान्य समस्याएँ",
    fungalDisease: "फफूंद रोग",
    fungalDiseaseDesc:
      "यह धब्बे, पैच, रंग बदलने या फफूंद की वृद्धि के रूप में दिखाई दे सकता है।",
    pestAttack: "कीट / रोग-कीट हमला",
    pestAttackDesc:
      "पत्तियों पर खाने के निशान, छेद, मुड़ना या दिखाई देने वाले कीट कीटों की गतिविधि का संकेत हो सकते हैं।",
    environmentalStress: "मौसम और वातावरण का तनाव",
    environmentalStressDesc:
      "गर्मी, ठंड, पानी की कमी या अधिक पानी और खराब बढ़ने की स्थिति से भी रोग जैसे लक्षण दिखाई दे सकते हैं।",
    whatShouldYouDo: "📋 आपको क्या करना चाहिए?",
    steps: [
      "प्रभावित पत्तियों, तनों और फसल के अन्य हिस्सों को ध्यान से देखें।",
      "जाँच करें कि समस्या आसपास के पौधों में भी फैल रही है या नहीं।",
      "कीट, अंडे या अन्य दिखाई देने वाली कीट गतिविधि देखें।",
      "यदि संभव हो तो प्रभावित फसल की साफ फोटो लें।",
      "समस्या की सही पहचान किए बिना रसायन या कीटनाशक का प्रयोग न करें।",
      "गंभीर या तेजी से फैलने वाली समस्या होने पर स्थानीय कृषि विशेषज्ञ से सलाह लें।",
    ],
    aiTitle: "फसल की फोटो चेक करना चाहते हैं?",
    aiDescription:
      "AI Crop Detector का उपयोग करके फोटो अपलोड करें और संभावित रोग या फसल के नुकसान की जानकारी प्राप्त करें।",
    openAi: "AI Crop Detector खोलें →",
    important: "⚠️ महत्वपूर्ण",
    warning:
      "एक जैसे लक्षण अलग-अलग कारणों से हो सकते हैं। यह पेज केवल सामान्य जानकारी देता है और इसे किसी निश्चित रोग की पुष्टि या कृषि निदान नहीं माना जाना चाहिए।",
  },

  bn: {
    ...english,
    backTo: "ফিরে যান",
    title: "ফসলের রোগ ও কীটপতঙ্গ শনাক্তকরণ",
    subtitle:
      "সাধারণ ফসলের রোগ, কীটপতঙ্গ এবং দৃশ্যমান ক্ষতি শনাক্ত করার উপায় জানুন।",
    whatToLookFor: "🔍 কী কী লক্ষ্য করবেন",
    leafDamage: "পাতার ক্ষতি",
    leafDamageDesc:
      "পাতায় অস্বাভাবিক দাগ, হলুদ হয়ে যাওয়া, কুঁকড়ে যাওয়া, ছিদ্র বা শুকিয়ে যাওয়া দেখুন।",
    insectDamage: "কীটপতঙ্গের ক্ষতি",
    insectDamageDesc:
      "পাতা ও কাণ্ডে কীটপতঙ্গ, ডিম, জাল, ছিদ্র বা খাওয়ার দাগ দেখুন।",
    spotsLesions: "দাগ ও ক্ষত",
    spotsLesionsDesc:
      "বাদামী, কালো, হলুদ বা অস্বাভাবিক দাগ রোগ বা ফসলের অন্য সমস্যার ইঙ্গিত হতে পারে।",
    moistureProblems: "আর্দ্রতার সমস্যা",
    moistureProblemsDesc:
      "অতিরিক্ত আর্দ্রতা ছত্রাক ও অন্যান্য রোগের ঝুঁকি বাড়াতে পারে।",
    commonProblems: "🌱 সাধারণ ফসলের সমস্যা",
    fungalDisease: "ছত্রাকজনিত রোগ",
    fungalDiseaseDesc:
      "দাগ, প্যাচ, রঙ পরিবর্তন বা ছত্রাকের বৃদ্ধির মাধ্যমে দেখা দিতে পারে।",
    pestAttack: "কীটপতঙ্গের আক্রমণ",
    pestAttackDesc:
      "পাতায় খাওয়ার দাগ, ছিদ্র, কুঁকড়ে যাওয়া বা দৃশ্যমান কীটপতঙ্গ আক্রমণের ইঙ্গিত হতে পারে।",
    environmentalStress: "পরিবেশগত চাপ",
    environmentalStressDesc:
      "গরম, ঠান্ডা, পানির চাপ বা খারাপ বৃদ্ধির পরিবেশ রোগের মতো উপসর্গ তৈরি করতে পারে।",
    whatShouldYouDo: "📋 আপনার কী করা উচিত?",
    steps: [
      "আক্রান্ত পাতা, কাণ্ড এবং ফসলের অংশগুলো ভালোভাবে পরীক্ষা করুন।",
      "সমস্যাটি আশেপাশের গাছেও ছড়াচ্ছে কিনা দেখুন।",
      "কীটপতঙ্গ, ডিম বা অন্যান্য দৃশ্যমান কার্যকলাপ দেখুন।",
      "সম্ভব হলে আক্রান্ত ফসলের পরিষ্কার ছবি তুলুন।",
      "সমস্যা সঠিকভাবে শনাক্ত না করে রাসায়নিক বা কীটনাশক ব্যবহার করবেন না।",
      "গুরুতর বা দ্রুত ছড়ানো সমস্যা হলে স্থানীয় কৃষি বিশেষজ্ঞের পরামর্শ নিন।",
    ],
    aiTitle: "ফসলের ছবি পরীক্ষা করতে চান?",
    aiDescription:
      "AI Crop Detector ব্যবহার করে ছবি আপলোড করুন এবং সম্ভাব্য রোগ বা ক্ষতির তথ্য পান।",
    openAi: "AI Crop Detector খুলুন →",
    important: "⚠️ গুরুত্বপূর্ণ",
    warning:
      "একই ধরনের উপসর্গের বিভিন্ন কারণ থাকতে পারে। এই পৃষ্ঠাটি সাধারণ নির্দেশনা দেয় এবং নিশ্চিত রোগ নির্ণয় হিসেবে বিবেচনা করা উচিত নয়।",
  },

  mr: {
    ...english,
    backTo: "मागे जा",
    title: "पीक रोग आणि कीड ओळख",
    subtitle:
      "सामान्य पीक रोग, किडी आणि दिसणारे नुकसान ओळखण्याचे मार्ग जाणून घ्या.",
    whatToLookFor: "🔍 कोणत्या गोष्टींकडे लक्ष द्यावे",
    leafDamage: "पानांचे नुकसान",
    leafDamageDesc:
      "पानांवर असामान्य डाग, पिवळेपणा, वाकणे, छिद्रे किंवा कोरडेपणा पहा.",
    insectDamage: "किडीमुळे नुकसान",
    insectDamageDesc:
      "पाने आणि खोडांवर कीटक, अंडी, जाळे, छिद्रे किंवा खाण्याच्या खुणा पहा.",
    spotsLesions: "डाग आणि जखमा",
    spotsLesionsDesc:
      "तपकिरी, काळे, पिवळे किंवा असामान्य डाग रोग किंवा पिकातील इतर समस्यांचे संकेत असू शकतात.",
    moistureProblems: "ओलाव्याची समस्या",
    moistureProblemsDesc:
      "अतिरिक्त ओलाव्यामुळे बुरशीजन्य आणि इतर रोगांचा धोका वाढू शकतो.",
    commonProblems: "🌱 पिकाच्या सामान्य समस्या",
    fungalDisease: "बुरशीजन्य रोग",
    fungalDiseaseDesc:
      "डाग, पॅच, रंग बदलणे किंवा बुरशीची वाढ यासारखे लक्षण दिसू शकते.",
    pestAttack: "कीड / कीटकांचा हल्ला",
    pestAttackDesc:
      "पानांवरील खाण्याच्या खुणा, छिद्रे, वाकलेली पाने किंवा दिसणारे कीटक हे किडीच्या हालचालीचे संकेत असू शकतात.",
    environmentalStress: "वातावरणाचा ताण",
    environmentalStressDesc:
      "उष्णता, थंडी, पाण्याचा ताण किंवा खराब वाढीच्या परिस्थितीमुळे रोगासारखी लक्षणे दिसू शकतात.",
    whatShouldYouDo: "📋 तुम्ही काय करावे?",
    steps: [
      "प्रभावित पाने, खोड आणि पिकाचे इतर भाग काळजीपूर्वक तपासा.",
      "समस्या आसपासच्या झाडांमध्येही पसरत आहे का ते तपासा.",
      "कीटक, अंडी किंवा इतर दिसणारी कीड क्रिया पहा.",
      "शक्य असल्यास प्रभावित पिकाचा स्पष्ट फोटो घ्या.",
      "समस्या योग्यरित्या ओळखल्याशिवाय रसायने किंवा कीटकनाशक वापरू नका.",
      "गंभीर किंवा वेगाने पसरणारी समस्या असल्यास स्थानिक कृषी तज्ज्ञांचा सल्ला घ्या.",
    ],
    aiTitle: "पिकाचा फोटो तपासायचा आहे?",
    aiDescription:
      "AI Crop Detector वापरून फोटो अपलोड करा आणि संभाव्य रोग किंवा नुकसानाची माहिती मिळवा.",
    openAi: "AI Crop Detector उघडा →",
    important: "⚠️ महत्त्वाचे",
    warning:
      "सारखी लक्षणे वेगवेगळ्या कारणांमुळे होऊ शकतात. हे पृष्ठ सामान्य मार्गदर्शन देते आणि निश्चित रोग निदान मानले जाऊ नये.",
  },

  ta: {
    ...english,
    backTo: "திரும்பு",
    title: "பயிர் நோய் மற்றும் பூச்சி கண்டறிதல்",
    subtitle:
      "பொதுவான பயிர் நோய்கள், பூச்சிகள் மற்றும் காணக்கூடிய சேதங்களை கண்டறியும் வழிகளை அறியவும்.",
    whatToLookFor: "🔍 எதை கவனிக்க வேண்டும்",
    leafDamage: "இலை சேதம்",
    leafDamageDesc:
      "இலைகளில் அசாதாரண புள்ளிகள், மஞ்சள் நிறம், சுருட்டல், துளைகள் அல்லது உலர்தலை கவனிக்கவும்.",
    insectDamage: "பூச்சி சேதம்",
    insectDamageDesc:
      "இலைகள் மற்றும் தண்டுகளில் பூச்சிகள், முட்டைகள், வலைகள், துளைகள் அல்லது உண்ணும் தடயங்களை பார்க்கவும்.",
    spotsLesions: "புள்ளிகள் மற்றும் காயங்கள்",
    spotsLesionsDesc:
      "பழுப்பு, கருப்பு, மஞ்சள் அல்லது அசாதாரண புள்ளிகள் நோய் அல்லது பயிர் அழுத்தத்தைக் குறிக்கலாம்.",
    moistureProblems: "ஈரப்பத பிரச்சினைகள்",
    moistureProblemsDesc:
      "அதிக ஈரப்பதம் பூஞ்சை மற்றும் பிற நோய்களின் அபாயத்தை அதிகரிக்கலாம்.",
    commonProblems: "🌱 பொதுவான பயிர் பிரச்சினைகள்",
    fungalDisease: "பூஞ்சை நோய்",
    fungalDiseaseDesc:
      "புள்ளிகள், திட்டுகள், நிறமாற்றம் அல்லது பூஞ்சை வளர்ச்சி போன்றவற்றாக தோன்றலாம்.",
    pestAttack: "பூச்சி தாக்குதல்",
    pestAttackDesc:
      "உண்ணும் தடயங்கள், துளைகள், சுருண்ட இலைகள் அல்லது தெரியும் பூச்சிகள் பூச்சி தாக்குதலைக் குறிக்கலாம்.",
    environmentalStress: "சுற்றுச்சூழல் அழுத்தம்",
    environmentalStressDesc:
      "வெப்பம், குளிர், நீர் பற்றாக்குறை அல்லது மோசமான வளர்ச்சி நிலைகள் நோய் போன்ற அறிகுறிகளை ஏற்படுத்தலாம்.",
    whatShouldYouDo: "📋 நீங்கள் என்ன செய்ய வேண்டும்?",
    steps: [
      "பாதிக்கப்பட்ட இலைகள், தண்டுகள் மற்றும் பயிர் பகுதிகளை கவனமாக பரிசோதிக்கவும்.",
      "பிரச்சினை அருகிலுள்ள செடிகளுக்கும் பரவுகிறதா என்பதை பார்க்கவும்.",
      "பூச்சிகள், முட்டைகள் அல்லது பிற பூச்சி செயல்பாடுகளை கவனிக்கவும்.",
      "முடிந்தால் பாதிக்கப்பட்ட பயிரின் தெளிவான புகைப்படத்தை எடுக்கவும்.",
      "பிரச்சினையை சரியாக கண்டறியாமல் ரசாயனங்கள் அல்லது பூச்சிக்கொல்லிகளை பயன்படுத்த வேண்டாம்.",
      "கடுமையான அல்லது வேகமாக பரவும் பிரச்சினைக்கு உள்ளூர் வேளாண் நிபுணரை அணுகவும்.",
    ],
    aiTitle: "பயிர் படத்தை சரிபார்க்க விரும்புகிறீர்களா?",
    aiDescription:
      "AI Crop Detector மூலம் படத்தை பதிவேற்றி சாத்தியமான நோய் அல்லது சேதம் பற்றிய தகவலைப் பெறுங்கள்.",
    openAi: "AI Crop Detector திறக்கவும் →",
    important: "⚠️ முக்கியமானது",
    warning:
      "ஒரே மாதிரியான அறிகுறிகளுக்கு வெவ்வேறு காரணங்கள் இருக்கலாம். இந்த பக்கம் பொதுவான வழிகாட்டுதலை மட்டுமே வழங்குகிறது.",
  },

  te: {
    ...english,
    backTo: "వెనక్కి వెళ్లండి",
    title: "పంట వ్యాధి మరియు పురుగు గుర్తింపు",
    subtitle:
      "సాధారణ పంట వ్యాధులు, పురుగులు మరియు కనిపించే నష్టాలను గుర్తించే విధానాలను తెలుసుకోండి.",
    whatToLookFor: "🔍 ఏమి గమనించాలి",
    leafDamage: "ఆకు నష్టం",
    leafDamageDesc:
      "ఆకులపై అసాధారణ మచ్చలు, పసుపు రంగు, ముడుచుకోవడం, రంధ్రాలు లేదా ఎండిపోవడం చూడండి.",
    insectDamage: "పురుగు నష్టం",
    insectDamageDesc:
      "ఆకులు మరియు కాండాలపై పురుగులు, గుడ్లు, వలలు, రంధ్రాలు లేదా తినే గుర్తులను చూడండి.",
    spotsLesions: "మచ్చలు మరియు గాయాలు",
    spotsLesionsDesc:
      "గోధుమ, నలుపు, పసుపు లేదా అసాధారణ మచ్చలు వ్యాధి లేదా పంట ఒత్తిడిని సూచించవచ్చు.",
    moistureProblems: "తేమ సమస్యలు",
    moistureProblemsDesc:
      "అధిక తేమ వల్ల ఫంగస్ మరియు ఇతర వ్యాధుల ప్రమాదం పెరుగుతుంది.",
    commonProblems: "🌱 సాధారణ పంట సమస్యలు",
    fungalDisease: "ఫంగస్ వ్యాధి",
    fungalDiseaseDesc:
      "మచ్చలు, ప్యాచ్‌లు, రంగు మారడం లేదా ఫంగస్ పెరుగుదల రూపంలో కనిపించవచ్చు.",
    pestAttack: "పురుగు దాడి",
    pestAttackDesc:
      "తినే గుర్తులు, రంధ్రాలు, ముడుచుకున్న ఆకులు లేదా కనిపించే పురుగులు పురుగు దాడిని సూచించవచ్చు.",
    environmentalStress: "పర్యావరణ ఒత్తిడి",
    environmentalStressDesc:
      "వేడి, చలి, నీటి ఒత్తిడి లేదా సరైన పెరుగుదల పరిస్థితులు వ్యాధి వంటి లక్షణాలను కలిగించవచ్చు.",
    whatShouldYouDo: "📋 మీరు ఏమి చేయాలి?",
    steps: [
      "ప్రభావిత ఆకులు, కాండాలు మరియు పంట భాగాలను జాగ్రత్తగా పరిశీలించండి.",
      "సమస్య సమీపంలోని మొక్కలకు కూడా వ్యాపిస్తుందో చూడండి.",
      "పురుగులు, గుడ్లు లేదా ఇతర కనిపించే పురుగు కార్యకలాపాలను చూడండి.",
      "సాధ్యమైతే ప్రభావిత పంటకు స్పష్టమైన ఫోటో తీయండి.",
      "సమస్యను సరిగ్గా గుర్తించకుండా రసాయనాలు లేదా పురుగుమందులు ఉపయోగించవద్దు.",
      "తీవ్రమైన లేదా వేగంగా వ్యాపించే సమస్యల కోసం స్థానిక వ్యవసాయ నిపుణుడిని సంప్రదించండి.",
    ],
    aiTitle: "పంట చిత్రాన్ని తనిఖీ చేయాలనుకుంటున్నారా?",
    aiDescription:
      "AI Crop Detector ఉపయోగించి చిత్రాన్ని అప్‌లోడ్ చేసి సాధ్యమైన వ్యాధి లేదా నష్టం గురించి సమాచారాన్ని పొందండి.",
    openAi: "AI Crop Detector తెరవండి →",
    important: "⚠️ ముఖ్యమైనది",
    warning:
      "ఒకే విధమైన లక్షణాలకు వేర్వేరు కారణాలు ఉండవచ్చు. ఈ పేజీ సాధారణ మార్గదర్శకాన్ని మాత్రమే అందిస్తుంది.",
  },

  gu: {
    ...english,
    backTo: "પાછા જાઓ",
    title: "પાક રોગ અને જીવાત ઓળખ",
    subtitle:
      "સામાન્ય પાકના રોગો, જીવાતો અને દેખાતા નુકસાનને ઓળખવાની રીતો જાણો.",
    whatToLookFor: "🔍 શું ધ્યાનમાં રાખવું",
    leafDamage: "પાંદડાનું નુકસાન",
    leafDamageDesc:
      "પાંદડા પર અસામાન્ય ડાઘ, પીળાશ, વળાંક, છિદ્રો અથવા સુકાઈ જવું જુઓ.",
    insectDamage: "જીવાતથી નુકસાન",
    insectDamageDesc:
      "પાંદડા અને દાંડી પર જીવાતો, ઇંડા, જાળાં, છિદ્રો અથવા ખાવાના નિશાન જુઓ.",
    spotsLesions: "ડાઘ અને ઘા",
    spotsLesionsDesc:
      "ભૂરા, કાળા, પીળા અથવા અસામાન્ય ડાઘ રોગ અથવા પાકના તણાવનો સંકેત હોઈ શકે છે.",
    moistureProblems: "ભેજની સમસ્યા",
    moistureProblemsDesc:
      "વધુ પડતો ભેજ ફૂગ અને અન્ય રોગોના જોખમને વધારી શકે છે.",
    commonProblems: "🌱 પાકની સામાન્ય સમસ્યાઓ",
    fungalDisease: "ફૂગનો રોગ",
    fungalDiseaseDesc:
      "ડાઘ, પેચ, રંગ બદલાવ અથવા ફૂગની વૃદ્ધિ તરીકે દેખાઈ શકે છે.",
    pestAttack: "જીવાતનો હુમલો",
    pestAttackDesc:
      "ખાવાના નિશાન, છિદ્રો, વળેલા પાંદડા અથવા દેખાતી જીવાતો જીવાતના હુમલાનો સંકેત હોઈ શકે છે.",
    environmentalStress: "પર્યાવરણીય તણાવ",
    environmentalStressDesc:
      "ગરમી, ઠંડી, પાણીનો તણાવ અથવા ખરાબ વૃદ્ધિની સ્થિતિ રોગ જેવા લક્ષણો પેદા કરી શકે છે.",
    whatShouldYouDo: "📋 તમારે શું કરવું જોઈએ?",
    steps: [
      "અસરગ્રસ્ત પાંદડા, દાંડી અને પાકના ભાગોને કાળજીપૂર્વક તપાસો.",
      "સમસ્યા આસપાસના છોડમાં પણ ફેલાઈ રહી છે કે નહીં તે તપાસો.",
      "જીવાતો, ઇંડા અથવા અન્ય દેખાતી જીવાત પ્રવૃત્તિ જુઓ.",
      "શક્ય હોય તો અસરગ્રસ્ત પાકનો સ્પષ્ટ ફોટો લો.",
      "સમસ્યાને યોગ્ય રીતે ઓળખ્યા વિના રસાયણો અથવા જંતુનાશકોનો ઉપયોગ ન કરો.",
      "ગંભીર અથવા ઝડપથી ફેલાતી સમસ્યા માટે સ્થાનિક કૃષિ નિષ્ણાતની સલાહ લો.",
    ],
    aiTitle: "પાકનો ફોટો ચેક કરવા માંગો છો?",
    aiDescription:
      "AI Crop Detector નો ઉપયોગ કરીને ફોટો અપલોડ કરો અને સંભવિત રોગ અથવા નુકસાનની માહિતી મેળવો.",
    openAi: "AI Crop Detector ખોલો →",
    important: "⚠️ મહત્વપૂર્ણ",
    warning:
      "સમાન લક્ષણોના અલગ અલગ કારણો હોઈ શકે છે. આ પેજ માત્ર સામાન્ય માર્ગદર્શન આપે છે અને તેને નિશ્ચિત રોગ નિદાન માનવું જોઈએ નહીં.",
  },

  kn: {
    ...english,
    backTo: "ಹಿಂದಕ್ಕೆ",
    title: "ಬೆಳೆ ರೋಗ ಮತ್ತು ಕೀಟ ಪತ್ತೆ",
    subtitle:
      "ಸಾಮಾನ್ಯ ಬೆಳೆ ರೋಗಗಳು, ಕೀಟಗಳು ಮತ್ತು ಕಾಣುವ ಹಾನಿಯನ್ನು ಗುರುತಿಸುವ ವಿಧಾನಗಳನ್ನು ತಿಳಿಯಿರಿ.",
    whatToLookFor: "🔍 ಏನು ಗಮನಿಸಬೇಕು",
    leafDamage: "ಎಲೆಯ ಹಾನಿ",
    leafDamageDesc:
      "ಎಲೆಗಳಲ್ಲಿ ಅಸಾಮಾನ್ಯ ಕಲೆಗಳು, ಹಳದಿ ಬಣ್ಣ, ಮುದುಡಿಕೆ, ರಂಧ್ರಗಳು ಅಥವಾ ಒಣಗುವಿಕೆಯನ್ನು ನೋಡಿ.",
    insectDamage: "ಕೀಟ ಹಾನಿ",
    insectDamageDesc:
      "ಎಲೆಗಳು ಮತ್ತು ಕಾಂಡಗಳಲ್ಲಿ ಕೀಟಗಳು, ಮೊಟ್ಟೆಗಳು, ಜಾಲಗಳು, ರಂಧ್ರಗಳು ಅಥವಾ ತಿನ್ನುವ ಗುರುತುಗಳನ್ನು ನೋಡಿ.",
    spotsLesions: "ಕಲೆಗಳು ಮತ್ತು ಗಾಯಗಳು",
    spotsLesionsDesc:
      "ಕಂದು, ಕಪ್ಪು, ಹಳದಿ ಅಥವಾ ಅಸಾಮಾನ್ಯ ಕಲೆಗಳು ರೋಗ ಅಥವಾ ಬೆಳೆ ಒತ್ತಡವನ್ನು ಸೂಚಿಸಬಹುದು.",
    moistureProblems: "ತೇವಾಂಶದ ಸಮಸ್ಯೆಗಳು",
    moistureProblemsDesc:
      "ಹೆಚ್ಚಿನ ತೇವಾಂಶವು ಶಿಲೀಂಧ್ರ ಮತ್ತು ಇತರ ರೋಗಗಳ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸಬಹುದು.",
    commonProblems: "🌱 ಸಾಮಾನ್ಯ ಬೆಳೆ ಸಮಸ್ಯೆಗಳು",
    fungalDisease: "ಶಿಲೀಂಧ್ರ ರೋಗ",
    fungalDiseaseDesc:
      "ಕಲೆಗಳು, ಪ್ಯಾಚ್‌ಗಳು, ಬಣ್ಣ ಬದಲಾವಣೆ ಅಥವಾ ಶಿಲೀಂಧ್ರ ಬೆಳವಣಿಗೆಯ ರೂಪದಲ್ಲಿ ಕಾಣಿಸಬಹುದು.",
    pestAttack: "ಕೀಟ ದಾಳಿ",
    pestAttackDesc:
      "ತಿನ್ನುವ ಗುರುತುಗಳು, ರಂಧ್ರಗಳು, ಮುದುಡಿದ ಎಲೆಗಳು ಅಥವಾ ಕಾಣುವ ಕೀಟಗಳು ಕೀಟದ ದಾಳಿಯನ್ನು ಸೂಚಿಸಬಹುದು.",
    environmentalStress: "ಪರಿಸರ ಒತ್ತಡ",
    environmentalStressDesc:
      "ಬಿಸಿ, ಚಳಿ, ನೀರಿನ ಒತ್ತಡ ಅಥವಾ ಕೆಟ್ಟ ಬೆಳವಣಿಗೆಯ ಪರಿಸ್ಥಿತಿಗಳು ರೋಗದಂತಹ ಲಕ್ಷಣಗಳನ್ನು ಉಂಟುಮಾಡಬಹುದು.",
    whatShouldYouDo: "📋 ನೀವು ಏನು ಮಾಡಬೇಕು?",
    steps: [
      "ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳು, ಕಾಂಡಗಳು ಮತ್ತು ಬೆಳೆ ಭಾಗಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಪರಿಶೀಲಿಸಿ.",
      "ಸಮಸ್ಯೆ ಹತ್ತಿರದ ಸಸ್ಯಗಳಿಗೆ ಹರಡುತ್ತಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
      "ಕೀಟಗಳು, ಮೊಟ್ಟೆಗಳು ಅಥವಾ ಇತರ ಕಾಣುವ ಕೀಟ ಚಟುವಟಿಕೆಗಳನ್ನು ನೋಡಿ.",
      "ಸಾಧ್ಯವಾದರೆ ಹಾನಿಗೊಳಗಾದ ಬೆಳೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
      "ಸಮಸ್ಯೆಯನ್ನು ಸರಿಯಾಗಿ ಗುರುತಿಸದೆ ರಾಸಾಯನಿಕಗಳು ಅಥವಾ ಕೀಟನಾಶಕಗಳನ್ನು ಬಳಸಬೇಡಿ.",
      "ಗಂಭೀರ ಅಥವಾ ವೇಗವಾಗಿ ಹರಡುವ ಸಮಸ್ಯೆಗಳಿಗೆ ಸ್ಥಳೀಯ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    ],
    aiTitle: "ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಪರಿಶೀಲಿಸಲು ಬಯಸುವಿರಾ?",
    aiDescription:
      "AI Crop Detector ಬಳಸಿ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಸಂಭವನೀಯ ರೋಗ ಅಥವಾ ಹಾನಿಯ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ.",
    openAi: "AI Crop Detector ತೆರೆಯಿರಿ →",
    important: "⚠️ ಪ್ರಮುಖ",
    warning:
      "ಒಂದೇ ರೀತಿಯ ಲಕ್ಷಣಗಳಿಗೆ ವಿಭಿನ್ನ ಕಾರಣಗಳಿರಬಹುದು. ಈ ಪುಟವು ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನವನ್ನು ಮಾತ್ರ ನೀಡುತ್ತದೆ.",
  },

  ml: {
    ...english,
    backTo: "തിരികെ പോകുക",
    title: "വിള രോഗവും കീട തിരിച്ചറിയലും",
    subtitle:
      "സാധാരണ വിള രോഗങ്ങൾ, കീടങ്ങൾ, കാണാവുന്ന നാശനഷ്ടങ്ങൾ എന്നിവ തിരിച്ചറിയാനുള്ള മാർഗങ്ങൾ അറിയുക.",
    whatToLookFor: "🔍 എന്താണ് ശ്രദ്ധിക്കേണ്ടത്",
    leafDamage: "ഇലയുടെ നാശം",
    leafDamageDesc:
      "ഇലകളിലെ അസാധാരണ പാടുകൾ, മഞ്ഞനിറം, ചുരുളൽ, ദ്വാരങ്ങൾ അല്ലെങ്കിൽ ഉണങ്ങൽ ശ്രദ്ധിക്കുക.",
    insectDamage: "കീട നാശം",
    insectDamageDesc:
      "ഇലകളിലും തണ്ടുകളിലും കീടങ്ങൾ, മുട്ടകൾ, വലകൾ, ദ്വാരങ്ങൾ അല്ലെങ്കിൽ തീറ്റയുടെ അടയാളങ്ങൾ പരിശോധിക്കുക.",
    spotsLesions: "പാടുകളും മുറിവുകളും",
    spotsLesionsDesc:
      "തവിട്ട്, കറുപ്പ്, മഞ്ഞ അല്ലെങ്കിൽ അസാധാരണ പാടുകൾ രോഗത്തെയോ വിളയുടെ സമ്മർദ്ദത്തെയോ സൂചിപ്പിക്കാം.",
    moistureProblems: "ഈർപ്പ പ്രശ്നങ്ങൾ",
    moistureProblemsDesc:
      "അമിതമായ ഈർപ്പം ഫംഗസ്, മറ്റ് രോഗങ്ങൾ എന്നിവയുടെ സാധ്യത വർധിപ്പിക്കും.",
    commonProblems: "🌱 സാധാരണ വിള പ്രശ്നങ്ങൾ",
    fungalDisease: "ഫംഗസ് രോഗം",
    fungalDiseaseDesc:
      "പാടുകൾ, പാച്ചുകൾ, നിറമാറ്റം അല്ലെങ്കിൽ ഫംഗസ് വളർച്ചയായി കാണപ്പെടാം.",
    pestAttack: "കീട ആക്രമണം",
    pestAttackDesc:
      "തീറ്റയുടെ അടയാളങ്ങൾ, ദ്വാരങ്ങൾ, ചുരുണ്ട ഇലകൾ അല്ലെങ്കിൽ കാണാവുന്ന കീടങ്ങൾ കീട ആക്രമണത്തെ സൂചിപ്പിക്കാം.",
    environmentalStress: "പരിസ്ഥിതി സമ്മർദ്ദം",
    environmentalStressDesc:
      "ചൂട്, തണുപ്പ്, ജല സമ്മർദ്ദം അല്ലെങ്കിൽ മോശം വളർച്ചാ സാഹചര്യങ്ങൾ രോഗത്തിന് സമാനമായ ലക്ഷണങ്ങൾ ഉണ്ടാക്കാം.",
    whatShouldYouDo: "📋 നിങ്ങൾ എന്ത് ചെയ്യണം?",
    steps: [
      "ബാധിച്ച ഇലകൾ, തണ്ടുകൾ, വിളയുടെ മറ്റ് ഭാഗങ്ങൾ എന്നിവ ശ്രദ്ധാപൂർവ്വം പരിശോധിക്കുക.",
      "പ്രശ്നം സമീപത്തെ ചെടികളിലേക്കും പടരുന്നുണ്ടോ എന്ന് പരിശോധിക്കുക.",
      "കീടങ്ങൾ, മുട്ടകൾ അല്ലെങ്കിൽ മറ്റ് കീട പ്രവർത്തനങ്ങൾ ശ്രദ്ധിക്കുക.",
      "സാധ്യമെങ്കിൽ ബാധിച്ച വിളയുടെ വ്യക്തമായ ചിത്രം എടുക്കുക.",
      "പ്രശ്നം ശരിയായി തിരിച്ചറിയാതെ രാസവസ്തുക്കളോ കീടനാശിനികളോ ഉപയോഗിക്കരുത്.",
      "ഗുരുതരമായ അല്ലെങ്കിൽ വേഗത്തിൽ പടരുന്ന പ്രശ്നങ്ങൾക്ക് പ്രാദേശിക കാർഷിക വിദഗ്ധനെ സമീപിക്കുക.",
    ],
    aiTitle: "വിളയുടെ ചിത്രം പരിശോധിക്കണോ?",
    aiDescription:
      "AI Crop Detector ഉപയോഗിച്ച് ചിത്രം അപ്‌ലോഡ് ചെയ്ത് സാധ്യതയുള്ള രോഗം അല്ലെങ്കിൽ നാശനഷ്ടത്തെക്കുറിച്ചുള്ള വിവരങ്ങൾ നേടുക.",
    openAi: "AI Crop Detector തുറക്കുക →",
    important: "⚠️ പ്രധാനപ്പെട്ടത്",
    warning:
      "സമാന ലക്ഷണങ്ങൾക്ക് വ്യത്യസ്ത കാരണങ്ങൾ ഉണ്ടാകാം. ഈ പേജ് പൊതുവായ മാർഗനിർദ്ദേശം മാത്രമാണ് നൽകുന്നത്.",
  },

  pa: {
    ...english,
    backTo: "ਵਾਪਸ ਜਾਓ",
    title: "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਅਤੇ ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ",
    subtitle:
      "ਆਮ ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ, ਕੀੜਿਆਂ ਅਤੇ ਦਿਖਾਈ ਦੇਣ ਵਾਲੇ ਨੁਕਸਾਨ ਦੀ ਪਛਾਣ ਕਰਨ ਦੇ ਤਰੀਕੇ ਜਾਣੋ।",
    whatToLookFor: "🔍 ਕੀ ਧਿਆਨ ਦੇਣਾ ਹੈ",
    leafDamage: "ਪੱਤਿਆਂ ਦਾ ਨੁਕਸਾਨ",
    leafDamageDesc:
      "ਪੱਤਿਆਂ 'ਤੇ ਅਸਧਾਰਨ ਧੱਬੇ, ਪੀਲਾਪਣ, ਮੁੜਨਾ, ਛੇਦ ਜਾਂ ਸੁੱਕਣਾ ਦੇਖੋ।",
    insectDamage: "ਕੀੜਿਆਂ ਦਾ ਨੁਕਸਾਨ",
    insectDamageDesc:
      "ਪੱਤਿਆਂ ਅਤੇ ਤਣਿਆਂ 'ਤੇ ਕੀੜੇ, ਅੰਡੇ, ਜਾਲੇ, ਛੇਦ ਜਾਂ ਖਾਣ ਦੇ ਨਿਸ਼ਾਨ ਦੇਖੋ।",
    spotsLesions: "ਧੱਬੇ ਅਤੇ ਜ਼ਖਮ",
    spotsLesionsDesc:
      "ਭੂਰੇ, ਕਾਲੇ, ਪੀਲੇ ਜਾਂ ਅਸਧਾਰਨ ਧੱਬੇ ਬਿਮਾਰੀ ਜਾਂ ਫਸਲ ਦੇ ਤਣਾਅ ਦਾ ਸੰਕੇਤ ਹੋ ਸਕਦੇ ਹਨ।",
    moistureProblems: "ਨਮੀ ਦੀ ਸਮੱਸਿਆ",
    moistureProblemsDesc:
      "ਜ਼ਿਆਦਾ ਨਮੀ ਨਾਲ ਫੰਗਸ ਅਤੇ ਹੋਰ ਬਿਮਾਰੀਆਂ ਦਾ ਖਤਰਾ ਵੱਧ ਸਕਦਾ ਹੈ।",
    commonProblems: "🌱 ਫਸਲ ਦੀਆਂ ਆਮ ਸਮੱਸਿਆਵਾਂ",
    fungalDisease: "ਫੰਗਸ ਦੀ ਬਿਮਾਰੀ",
    fungalDiseaseDesc:
      "ਧੱਬਿਆਂ, ਪੈਚਾਂ, ਰੰਗ ਬਦਲਣ ਜਾਂ ਫੰਗਸ ਦੇ ਵਾਧੇ ਵਜੋਂ ਦਿਖਾਈ ਦੇ ਸਕਦੀ ਹੈ।",
    pestAttack: "ਕੀੜਿਆਂ ਦਾ ਹਮਲਾ",
    pestAttackDesc:
      "ਖਾਣ ਦੇ ਨਿਸ਼ਾਨ, ਛੇਦ, ਮੁੜੇ ਹੋਏ ਪੱਤੇ ਜਾਂ ਦਿਖਾਈ ਦੇਣ ਵਾਲੇ ਕੀੜੇ ਹਮਲੇ ਦਾ ਸੰਕੇਤ ਹੋ ਸਕਦੇ ਹਨ।",
    environmentalStress: "ਵਾਤਾਵਰਣਕ ਤਣਾਅ",
    environmentalStressDesc:
      "ਗਰਮੀ, ਠੰਢ, ਪਾਣੀ ਦੀ ਕਮੀ ਜਾਂ ਮਾੜੀਆਂ ਵਧਣ ਵਾਲੀਆਂ ਸਥਿਤੀਆਂ ਬਿਮਾਰੀ ਵਰਗੇ ਲੱਛਣ ਪੈਦਾ ਕਰ ਸਕਦੀਆਂ ਹਨ।",
    whatShouldYouDo: "📋 ਤੁਹਾਨੂੰ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?",
    steps: [
      "ਪ੍ਰਭਾਵਿਤ ਪੱਤਿਆਂ, ਤਣਿਆਂ ਅਤੇ ਫਸਲ ਦੇ ਹਿੱਸਿਆਂ ਦੀ ਧਿਆਨ ਨਾਲ ਜਾਂਚ ਕਰੋ।",
      "ਜਾਂਚ ਕਰੋ ਕਿ ਸਮੱਸਿਆ ਨੇੜਲੇ ਪੌਦਿਆਂ ਵਿੱਚ ਵੀ ਫੈਲ ਰਹੀ ਹੈ ਜਾਂ ਨਹੀਂ।",
      "ਕੀੜੇ, ਅੰਡੇ ਜਾਂ ਹੋਰ ਦਿਖਾਈ ਦੇਣ ਵਾਲੀ ਕੀੜਿਆਂ ਦੀ ਗਤੀਵਿਧੀ ਦੇਖੋ।",
      "ਜੇ ਸੰਭਵ ਹੋਵੇ ਤਾਂ ਪ੍ਰਭਾਵਿਤ ਫਸਲ ਦੀ ਸਾਫ਼ ਤਸਵੀਰ ਲਓ।",
      "ਸਮੱਸਿਆ ਦੀ ਸਹੀ ਪਛਾਣ ਕੀਤੇ ਬਿਨਾਂ ਰਸਾਇਣ ਜਾਂ ਕੀਟਨਾਸ਼ਕ ਨਾ ਵਰਤੋ।",
      "ਗੰਭੀਰ ਜਾਂ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲ ਰਹੀ ਸਮੱਸਿਆ ਲਈ ਸਥਾਨਕ ਖੇਤੀਬਾੜੀ ਮਾਹਿਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।",
    ],
    aiTitle: "ਫਸਲ ਦੀ ਤਸਵੀਰ ਚੈੱਕ ਕਰਨੀ ਹੈ?",
    aiDescription:
      "AI Crop Detector ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਸੰਭਾਵਿਤ ਬਿਮਾਰੀ ਜਾਂ ਨੁਕਸਾਨ ਦੀ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ।",
    openAi: "AI Crop Detector ਖੋਲ੍ਹੋ →",
    important: "⚠️ ਮਹੱਤਵਪੂਰਨ",
    warning:
      "ਇੱਕੋ ਜਿਹੇ ਲੱਛਣਾਂ ਦੇ ਵੱਖ-ਵੱਖ ਕਾਰਨ ਹੋ ਸਕਦੇ ਹਨ। ਇਹ ਪੰਨਾ ਸਿਰਫ਼ ਆਮ ਜਾਣਕਾਰੀ ਦਿੰਦਾ ਹੈ।",
  },

  or: {
    ...english,
    backTo: "ପଛକୁ ଯାଆନ୍ତୁ",
    title: "ଫସଲ ରୋଗ ଏବଂ କୀଟ ଚିହ୍ନଟ",
    subtitle:
      "ସାଧାରଣ ଫସଲ ରୋଗ, କୀଟ ଏବଂ ଦୃଶ୍ୟମାନ କ୍ଷତି ଚିହ୍ନଟ କରିବାର ଉପାୟ ଜାଣନ୍ତୁ।",
    whatToLookFor: "🔍 କ’ଣ ଧ୍ୟାନ ଦେବେ",
    leafDamage: "ପତ୍ରର କ୍ଷତି",
    leafDamageDesc:
      "ପତ୍ରରେ ଅସାଧାରଣ ଦାଗ, ହଳଦିଆ ହେବା, ମୋଡ଼ିବା, ଛିଦ୍ର କିମ୍ବା ଶୁଖିଯିବା ଦେଖନ୍ତୁ।",
    insectDamage: "କୀଟ କ୍ଷତି",
    insectDamageDesc:
      "ପତ୍ର ଏବଂ ଡାଳରେ କୀଟ, ଅଣ୍ଡା, ଜାଲ, ଛିଦ୍ର କିମ୍ବା ଖାଇବାର ଚିହ୍ନ ଦେଖନ୍ତୁ।",
    spotsLesions: "ଦାଗ ଏବଂ କ୍ଷତ",
    spotsLesionsDesc:
      "ବାଦାମୀ, କଳା, ହଳଦିଆ କିମ୍ବା ଅସାଧାରଣ ଦାଗ ରୋଗ କିମ୍ବା ଫସଲର ଚାପର ସଙ୍କେତ ହୋଇପାରେ।",
    moistureProblems: "ଆର୍ଦ୍ରତା ସମସ୍ୟା",
    moistureProblemsDesc:
      "ଅଧିକ ଆର୍ଦ୍ରତା ଫଙ୍ଗସ୍ ଏବଂ ଅନ୍ୟ ରୋଗର ଆଶଙ୍କା ବଢ଼ାଇପାରେ।",
    commonProblems: "🌱 ସାଧାରଣ ଫସଲ ସମସ୍ୟା",
    fungalDisease: "ଫଙ୍ଗସ୍ ରୋଗ",
    fungalDiseaseDesc:
      "ଦାଗ, ପ୍ୟାଚ୍, ରଙ୍ଗ ପରିବର୍ତ୍ତନ କିମ୍ବା ଫଙ୍ଗସ୍ ବୃଦ୍ଧି ଭାବରେ ଦେଖାଯାଇପାରେ।",
    pestAttack: "କୀଟ ଆକ୍ରମଣ",
    pestAttackDesc:
      "ଖାଇବାର ଚିହ୍ନ, ଛିଦ୍ର, ମୋଡ଼ିଥିବା ପତ୍ର କିମ୍ବା ଦେଖାଯାଉଥିବା କୀଟ କୀଟ ଆକ୍ରମଣର ସଙ୍କେତ ହୋଇପାରେ।",
    environmentalStress: "ପରିବେଶ ଚାପ",
    environmentalStressDesc:
      "ଗରମ, ଥଣ୍ଡା, ପାଣିର ଅଭାବ କିମ୍ବା ଖରାପ ବୃଦ୍ଧି ପରିସ୍ଥିତି ରୋଗ ପରି ଲକ୍ଷଣ ସୃଷ୍ଟି କରିପାରେ।",
    whatShouldYouDo: "📋 ଆପଣ କ’ଣ କରିବେ?",
    steps: [
      "ପ୍ରଭାବିତ ପତ୍ର, ଡାଳ ଏବଂ ଫସଲର ଅନ୍ୟ ଅଂଶକୁ ଭଲଭାବେ ଯାଞ୍ଚ କରନ୍ତୁ।",
      "ସମସ୍ୟା ନିକଟସ୍ଥ ଗଛଗୁଡ଼ିକୁ ମଧ୍ୟ ବ୍ୟାପୁଛି କି ନାହିଁ ଦେଖନ୍ତୁ।",
      "କୀଟ, ଅଣ୍ଡା କିମ୍ବା ଅନ୍ୟ ଦୃଶ୍ୟମାନ କୀଟ କାର୍ଯ୍ୟକଳାପ ଦେଖନ୍ତୁ।",
      "ସମ୍ଭବ ହେଲେ ପ୍ରଭାବିତ ଫସଲର ସ୍ପଷ୍ଟ ଫଟୋ ନିଅନ୍ତୁ।",
      "ସମସ୍ୟା ସଠିକ ଭାବେ ଚିହ୍ନଟ ନକରି ରାସାୟନିକ କିମ୍ବା କୀଟନାଶକ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।",
      "ଗୁରୁତର କିମ୍ବା ଶୀଘ୍ର ବ୍ୟାପୁଥିବା ସମସ୍ୟା ପାଇଁ ସ୍ଥାନୀୟ କୃଷି ବିଶେଷଜ୍ଞଙ୍କୁ ପଚାରନ୍ତୁ।",
    ],
    aiTitle: "ଫସଲର ଫଟୋ ଯାଞ୍ଚ କରିବାକୁ ଚାହୁଁଛନ୍ତି?",
    aiDescription:
      "AI Crop Detector ବ୍ୟବହାର କରି ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ ଏବଂ ସମ୍ଭାବ୍ୟ ରୋଗ କିମ୍ବା କ୍ଷତି ବିଷୟରେ ସୂଚନା ପାଆନ୍ତୁ।",
    openAi: "AI Crop Detector ଖୋଲନ୍ତୁ →",
    important: "⚠️ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",
    warning:
      "ସମାନ ଲକ୍ଷଣର ଭିନ୍ନ କାରଣ ଥାଇପାରେ। ଏହି ପୃଷ୍ଠା କେବଳ ସାଧାରଣ ମାର୍ଗଦର୍ଶନ ଦିଏ।",
  },

  as: {
    ...english,
    backTo: "উভতি যাওক",
    title: "শস্যৰ ৰোগ আৰু কীট-পতংগ চিনাক্তকৰণ",
    subtitle:
      "সাধাৰণ শস্যৰ ৰোগ, কীট-পতংগ আৰু দৃশ্যমান ক্ষতি চিনাক্ত কৰাৰ উপায় জানক।",
    whatToLookFor: "🔍 কি কি লক্ষ্য কৰিব",
    leafDamage: "পাতৰ ক্ষতি",
    leafDamageDesc:
      "পাতত অস্বাভাৱিক দাগ, হালধীয়া হোৱা, মোহাৰি যোৱা, ফুটা বা শুকাই যোৱা লক্ষ্য কৰক।",
    insectDamage: "কীট-পতংগৰ ক্ষতি",
    insectDamageDesc:
      "পাত আৰু কাণ্ডত কীট-পতংগ, কণী, জাল, ফুটা বা খোৱাৰ চিন চাওক।",
    spotsLesions: "দাগ আৰু ঘা",
    spotsLesionsDesc:
      "বাদামী, ক'লা, হালধীয়া বা অস্বাভাৱিক দাগে ৰোগ বা শস্যৰ চাপৰ ইংগিত দিব পাৰে।",
    moistureProblems: "আৰ্দ্ৰতাৰ সমস্যা",
    moistureProblemsDesc:
      "অতিৰিক্ত আৰ্দ্ৰতাই ফাংগাছ আৰু অন্যান্য ৰোগৰ আশংকা বৃদ্ধি কৰিব পাৰে।",
    commonProblems: "🌱 সাধাৰণ শস্যৰ সমস্যা",
    fungalDisease: "ফাংগাছৰ ৰোগ",
    fungalDiseaseDesc:
      "দাগ, পেচ, ৰঙৰ পৰিৱৰ্তন বা ফাংগাছৰ বৃদ্ধিৰ ৰূপত দেখা দিব পাৰে।",
    pestAttack: "কীট-পতংগৰ আক্ৰমণ",
    pestAttackDesc:
      "খোৱাৰ চিন, ফুটা, মোহাৰি যোৱা পাত বা দেখা পোৱা কীট-পতংগই আক্ৰমণৰ ইংগিত দিব পাৰে।",
    environmentalStress: "পৰিৱেশগত চাপ",
    environmentalStressDesc:
      "গৰম, ঠাণ্ডা, পানীৰ চাপ বা বেয়া বৃদ্ধিৰ পৰিস্থিতিয়ে ৰোগৰ দৰে লক্ষণ সৃষ্টি কৰিব পাৰে।",
    whatShouldYouDo: "📋 আপুনি কি কৰিব লাগে?",
    steps: [
      "আক্ৰান্ত পাত, কাণ্ড আৰু শস্যৰ অংশবোৰ ভালদৰে পৰীক্ষা কৰক।",
      "সমস্যাটো ওচৰৰ গছবোৰলৈও বিয়পি আছে নেকি চাওক।",
      "কীট-পতংগ, কণী বা অন্য দৃশ্যমান কীট-পতংগৰ কাৰ্যকলাপ চাওক।",
      "সম্ভৱ হ'লে আক্ৰান্ত শস্যৰ এখন স্পষ্ট ছবি লওক।",
      "সমস্যাটো সঠিকভাৱে চিনাক্ত নকৰাকৈ ৰাসায়নিক বা কীটনাশক ব্যৱহাৰ নকৰিব।",
      "গুৰুতৰ বা দ্ৰুতভাৱে বিয়পি পৰা সমস্যাৰ বাবে স্থানীয় কৃষি বিশেষজ্ঞৰ পৰামৰ্শ লওক।",
    ],
    aiTitle: "শস্যৰ ছবি পৰীক্ষা কৰিব বিচাৰে?",
    aiDescription:
      "AI Crop Detector ব্যৱহাৰ কৰি ছবি আপলোড কৰক আৰু সম্ভাৱ্য ৰোগ বা ক্ষতিৰ তথ্য লাভ কৰক।",
    openAi: "AI Crop Detector খোলক →",
    important: "⚠️ গুৰুত্বপূৰ্ণ",
    warning:
      "একেধৰণৰ লক্ষণৰ বিভিন্ন কাৰণ থাকিব পাৰে। এই পৃষ্ঠাই কেৱল সাধাৰণ নিৰ্দেশনা প্ৰদান কৰে।",
  },

  ur: {
    ...english,
    backTo: "واپس جائیں",
    title: "فصل کی بیماری اور کیڑوں کی شناخت",
    subtitle:
      "عام فصل کی بیماریوں، کیڑوں اور نظر آنے والے نقصان کی شناخت کے طریقے جانیں۔",
    whatToLookFor: "🔍 کن چیزوں پر توجہ دیں",
    leafDamage: "پتوں کا نقصان",
    leafDamageDesc:
      "پتوں پر غیر معمولی دھبے، پیلا پن، مڑنا، سوراخ یا سوکھنے کی علامات دیکھیں۔",
    insectDamage: "کیڑوں سے نقصان",
    insectDamageDesc:
      "پتوں اور تنوں پر کیڑے، انڈے، جالے، سوراخ یا کھانے کے نشانات دیکھیں۔",
    spotsLesions: "دھبے اور زخم",
    spotsLesionsDesc:
      "بھورے، کالے، پیلے یا غیر معمولی دھبے بیماری یا فصل کے دباؤ کی علامت ہو سکتے ہیں۔",
    moistureProblems: "نمی کے مسائل",
    moistureProblemsDesc:
      "زیادہ نمی فنگس اور دیگر بیماریوں کے خطرے کو بڑھا سکتی ہے۔",
    commonProblems: "🌱 فصل کے عام مسائل",
    fungalDisease: "فنگس کی بیماری",
    fungalDiseaseDesc:
      "دھبوں، پیچز، رنگ کی تبدیلی یا فنگس کی افزائش کی صورت میں ظاہر ہو سکتی ہے۔",
    pestAttack: "کیڑوں کا حملہ",
    pestAttackDesc:
      "کھانے کے نشانات، سوراخ، مڑے ہوئے پتے یا نظر آنے والے کیڑے کیڑوں کے حملے کی علامت ہو سکتے ہیں۔",
    environmentalStress: "ماحولیاتی دباؤ",
    environmentalStressDesc:
      "گرمی، سردی، پانی کی کمی یا خراب نشوونما کی صورتحال بیماری جیسی علامات پیدا کر سکتی ہے۔",
    whatShouldYouDo: "📋 آپ کو کیا کرنا چاہیے؟",
    steps: [
      "متاثرہ پتوں، تنوں اور فصل کے حصوں کو احتیاط سے دیکھیں۔",
      "چیک کریں کہ مسئلہ قریبی پودوں تک بھی پھیل رہا ہے یا نہیں۔",
      "کیڑے، انڈے یا دیگر نظر آنے والی کیڑوں کی سرگرمی دیکھیں۔",
      "اگر ممکن ہو تو متاثرہ فصل کی واضح تصویر لیں۔",
      "مسئلے کی درست شناخت کے بغیر کیمیکل یا کیڑے مار دوا استعمال نہ کریں۔",
      "سنگین یا تیزی سے پھیلنے والے مسئلے کے لیے مقامی زرعی ماہر سے مشورہ کریں۔",
    ],
    aiTitle: "فصل کی تصویر چیک کرنا چاہتے ہیں؟",
    aiDescription:
      "AI Crop Detector استعمال کرکے تصویر اپ لوڈ کریں اور ممکنہ بیماری یا نقصان کی معلومات حاصل کریں۔",
    openAi: "AI Crop Detector کھولیں →",
    important: "⚠️ اہم",
    warning:
      "ایک جیسی علامات کی مختلف وجوہات ہو سکتی ہیں۔ یہ صفحہ صرف عمومی رہنمائی فراہم کرتا ہے اور حتمی بیماری کی تشخیص نہیں ہے۔",
  },
};

export default function DiseasePage() {
  const params = useParams();
  const cropId = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string);

  const { language } = useLanguage();

  const text = translations[language] || translations.en;

  return (
    <main
      className="min-h-screen bg-green-50 px-4 py-6"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          href={`/crops/${cropId}`}
          className="mb-6 inline-flex items-center rounded-xl bg-white px-4 py-2 font-bold text-green-900 shadow-sm"
        >
          ← {text.backTo} {cropId}
        </Link>

        {/* Header */}
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="text-5xl">🦠</div>

          <h1 className="mt-3 text-3xl font-bold text-gray-950">
            {text.title}
          </h1>

          <p className="mt-2 text-gray-900">
            {text.subtitle}
          </p>
        </section>

        {/* Detection guide */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950">
            {text.whatToLookFor}
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">

            {/* Leaf Damage */}
            <div className="rounded-2xl bg-red-50 p-5">
              <div className="text-3xl">🍂</div>

              <h3 className="mt-2 font-bold text-red-950">
                {text.leafDamage}
              </h3>

              <p className="mt-2 text-sm font-medium text-red-950">
                {text.leafDamageDesc}
              </p>
            </div>

            {/* Insect Damage */}
            <div className="rounded-2xl bg-yellow-50 p-5">
              <div className="text-3xl">🐛</div>

              <h3 className="mt-2 font-bold text-yellow-950">
                {text.insectDamage}
              </h3>

              <p className="mt-2 text-sm font-medium text-yellow-950">
                {text.insectDamageDesc}
              </p>
            </div>

            {/* Spots */}
            <div className="rounded-2xl bg-orange-50 p-5">
              <div className="text-3xl">🟤</div>

              <h3 className="mt-2 font-bold text-orange-950">
                {text.spotsLesions}
              </h3>

              <p className="mt-2 text-sm font-medium text-orange-950">
                {text.spotsLesionsDesc}
              </p>
            </div>

            {/* Moisture */}
            <div className="rounded-2xl bg-blue-50 p-5">
              <div className="text-3xl">💧</div>

              <h3 className="mt-2 font-bold text-blue-950">
                {text.moistureProblems}
              </h3>

              <p className="mt-2 text-sm font-medium text-blue-950">
                {text.moistureProblemsDesc}
              </p>
            </div>

          </div>
        </section>

        {/* Common problems */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950">
            {text.commonProblems}
          </h2>

          <div className="mt-4 space-y-3">

            {/* Fungal Disease */}
            <div className="flex gap-4 rounded-xl border border-gray-300 p-4">
              <span className="text-2xl">🦠</span>

              <div>
                <h3 className="font-bold text-gray-950">
                  {text.fungalDisease}
                </h3>

                <p className="text-sm font-medium text-gray-900">
                  {text.fungalDiseaseDesc}
                </p>
              </div>
            </div>

            {/* Pest Attack */}
            <div className="flex gap-4 rounded-xl border border-gray-300 p-4">
              <span className="text-2xl">🐜</span>

              <div>
                <h3 className="font-bold text-gray-950">
                  {text.pestAttack}
                </h3>

                <p className="text-sm font-medium text-gray-900">
                  {text.pestAttackDesc}
                </p>
              </div>
            </div>

            {/* Environmental Stress */}
            <div className="flex gap-4 rounded-xl border border-gray-300 p-4">
              <span className="text-2xl">🌡️</span>

              <div>
                <h3 className="font-bold text-gray-950">
                  {text.environmentalStress}
                </h3>

                <p className="text-sm font-medium text-gray-900">
                  {text.environmentalStressDesc}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Steps */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950">
            {text.whatShouldYouDo}
          </h2>

          <div className="mt-4 space-y-3">

            {text.steps.map((step, index) => (
              <div
                key={`${language}-${index}`}
                className="flex items-start gap-3 rounded-xl bg-green-50 p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                  {index + 1}
                </span>

                <p className="text-sm font-medium leading-6 text-gray-950">
                  {step}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* AI CTA */}
        <section className="mt-6 rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white shadow-lg">
          <div className="text-4xl">🤖</div>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {text.aiTitle}
          </h2>

          <p className="mt-2 font-medium text-white">
            {text.aiDescription}
          </p>

          <Link
            href={`/crops/${cropId}/ai-detector`}
            className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-green-900"
          >
            {text.openAi}
          </Link>
        </section>

        {/* Warning */}
        <div className="mt-6 rounded-2xl border border-yellow-300 bg-yellow-50 p-5">
          <h3 className="font-bold text-yellow-950">
            {text.important}
          </h3>

          <p className="mt-2 text-sm font-medium leading-6 text-yellow-950">
            {text.warning}
          </p>
        </div>

      </div>
    </main>
  );
}