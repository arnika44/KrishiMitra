
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const languages: Record<string, string> = {
  hi: "हिंदी",
  en: "English",
  bn: "বাংলা",
  mr: "मराठी",
  ta: "தமிழ்",
  te: "తెలుగు",
  gu: "ગુજરાતી",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  pa: "ਪੰਜਾਬੀ",
  or: "ଓଡ଼ିଆ",
  as: "অসমীয়া",
  ur: "اردو",
};

const dashboardText: Record<
  string,
  {
    welcome: string;
    subtitle: string;
    ai: string;
    aiDesc: string;
    crop: string;
    cropDesc: string;
    disease: string;
    diseaseDesc: string;
    market: string;
    marketDesc: string;
    produce: string;
    produceDesc: string;
    profile: string;
    settings: string;
    talkAi: string;
  }
> = {
  hi: {
    welcome: "नमस्ते, किसान मित्र! 🌾",
    subtitle: "आज आपकी खेती में हम आपकी मदद कैसे करें?",
    ai: "AI कृषि मित्र",
    aiDesc: "खेती से जुड़े सवाल पूछें और अपनी भाषा में जवाब पाएँ।",
    crop: "फसल सलाह",
    cropDesc: "अपनी जमीन और मौसम के अनुसार फसल की सलाह पाएँ।",
    disease: "फसल रोग पहचान",
    diseaseDesc: "फसल की फोटो से बीमारी या कीट की जानकारी पाएँ।",
    market: "मंडी और बाजार",
    marketDesc: "अपनी कृषि उपज के बाजार और मंडी से जुड़ी जानकारी पाएँ।",
    produce: "उपज प्रबंधन",
    produceDesc: "अपनी उपज को manage, store और बेचने की योजना बनाएँ।",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    talkAi: "AI से बात करें →",
  },

  en: {
    welcome: "Hello, Farmer Friend! 🌾",
    subtitle: "How can we help you with your farming today?",
    ai: "AI Krishi Mitra",
    aiDesc: "Ask farming questions and get answers in your language.",
    crop: "Crop Advisory",
    cropDesc: "Get crop recommendations based on your land and weather.",
    disease: "Crop Disease Detection",
    diseaseDesc: "Identify crop diseases and pests using a photo.",
    market: "Mandi & Market",
    marketDesc: "Get useful information about markets and mandis.",
    produce: "Produce Management",
    produceDesc: "Manage, store and plan the sale of your produce.",
    profile: "Profile",
    settings: "Settings",
    talkAi: "Talk to AI →",
  },

  bn: {
    welcome: "নমস্কার, কৃষক বন্ধু! 🌾",
    subtitle: "আজ আপনার কৃষিকাজে আমরা কীভাবে সাহায্য করতে পারি?",
    ai: "AI কৃষি মিত্র",
    aiDesc: "কৃষি সম্পর্কে প্রশ্ন করুন এবং নিজের ভাষায় উত্তর পান।",
    crop: "ফসলের পরামর্শ",
    cropDesc: "জমি ও আবহাওয়ার ভিত্তিতে ফসলের পরামর্শ পান।",
    disease: "ফসলের রোগ শনাক্তকরণ",
    diseaseDesc: "ছবি ব্যবহার করে ফসলের রোগ ও কীট শনাক্ত করুন।",
    market: "মাণ্ডি ও বাজার",
    marketDesc: "কৃষিপণ্যের বাজার ও মাণ্ডি সম্পর্কে তথ্য পান।",
    produce: "ফসল ব্যবস্থাপনা",
    produceDesc: "আপনার ফসল সংরক্ষণ, পরিচালনা ও বিক্রির পরিকল্পনা করুন।",
    profile: "প্রোফাইল",
    settings: "সেটিংস",
    talkAi: "AI-এর সাথে কথা বলুন →",
  },

  mr: {
    welcome: "नमस्कार, शेतकरी मित्र! 🌾",
    subtitle: "आज शेतीमध्ये आम्ही तुमची कशी मदत करू?",
    ai: "AI कृषी मित्र",
    aiDesc: "शेतीशी संबंधित प्रश्न विचारा आणि तुमच्या भाषेत उत्तर मिळवा.",
    crop: "पीक सल्ला",
    cropDesc: "जमीन आणि हवामानानुसार पिकांचा सल्ला मिळवा.",
    disease: "पीक रोग ओळख",
    diseaseDesc: "फोटोद्वारे पिकांचे रोग आणि कीड ओळखा.",
    market: "बाजार आणि मंडी",
    marketDesc: "तुमच्या कृषी उत्पादनासाठी बाजाराची माहिती मिळवा.",
    produce: "उत्पादन व्यवस्थापन",
    produceDesc: "उत्पादनाचे व्यवस्थापन, साठवण आणि विक्रीचे नियोजन करा.",
    profile: "प्रोफाइल",
    settings: "सेटिंग्ज",
    talkAi: "AI शी बोला →",
  },

  ta: {
    welcome: "வணக்கம், விவசாய நண்பரே! 🌾",
    subtitle: "இன்று உங்கள் விவசாயத்தில் நாங்கள் எப்படி உதவலாம்?",
    ai: "AI கிருஷி மித்ரா",
    aiDesc: "விவசாய கேள்விகளைக் கேட்டு உங்கள் மொழியில் பதில் பெறுங்கள்.",
    crop: "பயிர் ஆலோசனை",
    cropDesc: "நிலம் மற்றும் வானிலைக்கு ஏற்ப பயிர் ஆலோசனை பெறுங்கள்.",
    disease: "பயிர் நோய் கண்டறிதல்",
    diseaseDesc: "புகைப்படம் மூலம் பயிர் நோய் மற்றும் பூச்சிகளை கண்டறியுங்கள்.",
    market: "சந்தை மற்றும் மண்டி",
    marketDesc: "விவசாய பொருட்களின் சந்தை தகவல்களைப் பெறுங்கள்.",
    produce: "விளைபொருள் மேலாண்மை",
    produceDesc: "உங்கள் விளைபொருட்களை நிர்வகித்து விற்பனை திட்டமிடுங்கள்.",
    profile: "சுயவிவரம்",
    settings: "அமைப்புகள்",
    talkAi: "AI உடன் பேசுங்கள் →",
  },

  te: {
    welcome: "నమస్కారం, రైతు మిత్రమా! 🌾",
    subtitle: "ఈ రోజు మీ వ్యవసాయంలో మేము ఎలా సహాయం చేయగలం?",
    ai: "AI కృషి మిత్ర",
    aiDesc: "వ్యవసాయ ప్రశ్నలు అడిగి మీ భాషలో సమాధానాలు పొందండి.",
    crop: "పంట సలహా",
    cropDesc: "మీ భూమి మరియు వాతావరణానికి అనుగుణంగా పంట సలహా పొందండి.",
    disease: "పంట వ్యాధి గుర్తింపు",
    diseaseDesc: "ఫోటో ద్వారా పంట వ్యాధులు మరియు పురుగులను గుర్తించండి.",
    market: "మార్కెట్ మరియు మండీ",
    marketDesc: "వ్యవసాయ ఉత్పత్తుల మార్కెట్ సమాచారం పొందండి.",
    produce: "ఉత్పత్తి నిర్వహణ",
    produceDesc: "మీ పంటను నిర్వహించి నిల్వ చేసి విక్రయించడానికి ప్లాన్ చేయండి.",
    profile: "ప్రొఫైల్",
    settings: "సెట్టింగ్స్",
    talkAi: "AI తో మాట్లాడండి →",
  },

  gu: {
    welcome: "નમસ્તે, ખેડૂત મિત્ર! 🌾",
    subtitle: "આજે તમારી ખેતીમાં અમે કેવી રીતે મદદ કરી શકીએ?",
    ai: "AI કૃષિ મિત્ર",
    aiDesc: "ખેતી સંબંધિત પ્રશ્નો પૂછો અને તમારી ભાષામાં જવાબ મેળવો.",
    crop: "પાક સલાહ",
    cropDesc: "જમીન અને હવામાન અનુસાર પાકની સલાહ મેળવો.",
    disease: "પાક રોગ ઓળખ",
    diseaseDesc: "ફોટા દ્વારા પાકના રોગ અને જીવાત ઓળખો.",
    market: "મંડી અને બજાર",
    marketDesc: "કૃષિ ઉત્પાદન માટે બજાર અને મંડીની માહિતી મેળવો.",
    produce: "ઉત્પાદન વ્યવસ્થાપન",
    produceDesc: "તમારા ઉત્પાદનનું સંચાલન, સંગ્રહ અને વેચાણનું આયોજન કરો.",
    profile: "પ્રોફાઇલ",
    settings: "સેટિંગ્સ",
    talkAi: "AI સાથે વાત કરો →",
  },

  kn: {
    welcome: "ನಮಸ್ಕಾರ, ರೈತ ಮಿತ್ರ! 🌾",
    subtitle: "ಇಂದು ನಿಮ್ಮ ಕೃಷಿಯಲ್ಲಿ ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    ai: "AI ಕೃಷಿ ಮಿತ್ರ",
    aiDesc: "ಕೃಷಿಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರ ಪಡೆಯಿರಿ.",
    crop: "ಬೆಳೆ ಸಲಹೆ",
    cropDesc: "ನಿಮ್ಮ ಭೂಮಿ ಮತ್ತು ಹವಾಮಾನಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಬೆಳೆ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    disease: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
    diseaseDesc: "ಫೋಟೋ ಮೂಲಕ ಬೆಳೆ ರೋಗಗಳು ಮತ್ತು ಕೀಟಗಳನ್ನು ಗುರುತಿಸಿ.",
    market: "ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಮಂಡಿ",
    marketDesc: "ಕೃಷಿ ಉತ್ಪನ್ನಗಳ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ.",
    produce: "ಉತ್ಪನ್ನ ನಿರ್ವಹಣೆ",
    produceDesc: "ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ನಿರ್ವಹಿಸಿ, ಸಂಗ್ರಹಿಸಿ ಮತ್ತು ಮಾರಾಟ ಯೋಜಿಸಿ.",
    profile: "ಪ್ರೊಫೈಲ್",
    settings: "ಸೆಟ್ಟಿಂಗ್ಸ್",
    talkAi: "AI ಜೊತೆ ಮಾತನಾಡಿ →",
  },

  ml: {
    welcome: "നമസ്കാരം, കർഷക സുഹൃത്തേ! 🌾",
    subtitle: "ഇന്ന് നിങ്ങളുടെ കൃഷിയിൽ ഞങ്ങൾ എങ്ങനെ സഹായിക്കാം?",
    ai: "AI കൃഷി മിത്ര",
    aiDesc: "കൃഷിയെക്കുറിച്ച് ചോദിച്ച് നിങ്ങളുടെ ഭാഷയിൽ ഉത്തരങ്ങൾ നേടുക.",
    crop: "വിള ഉപദേശം",
    cropDesc: "നിങ്ങളുടെ ഭൂമിക്കും കാലാവസ്ഥയ്ക്കും അനുയോജ്യമായ വിള ഉപദേശം നേടുക.",
    disease: "വിള രോഗ നിർണയം",
    diseaseDesc: "ഫോട്ടോ ഉപയോഗിച്ച് വിള രോഗങ്ങളും കീടങ്ങളും കണ്ടെത്തുക.",
    market: "മാർക്കറ്റും മണ്ഡിയും",
    marketDesc: "കാർഷിക ഉൽപ്പന്നങ്ങളുടെ വിപണി വിവരങ്ങൾ നേടുക.",
    produce: "ഉൽപ്പന്ന മാനേജ്മെന്റ്",
    produceDesc: "നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ നിയന്ത്രിക്കുകയും സംഭരിക്കുകയും വിൽപ്പന ആസൂത്രണം ചെയ്യുകയും ചെയ്യുക.",
    profile: "പ്രൊഫൈൽ",
    settings: "ക്രമീകരണങ്ങൾ",
    talkAi: "AI-യോട് സംസാരിക്കുക →",
  },

  pa: {
    welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਕਿਸਾਨ ਮਿੱਤਰ! 🌾",
    subtitle: "ਅੱਜ ਅਸੀਂ ਤੁਹਾਡੀ ਖੇਤੀ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?",
    ai: "AI ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ",
    aiDesc: "ਖੇਤੀ ਨਾਲ ਸਬੰਧਤ ਸਵਾਲ ਪੁੱਛੋ ਅਤੇ ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਜਵਾਬ ਲਵੋ।",
    crop: "ਫਸਲ ਸਲਾਹ",
    cropDesc: "ਜ਼ਮੀਨ ਅਤੇ ਮੌਸਮ ਦੇ ਅਨੁਸਾਰ ਫਸਲ ਦੀ ਸਲਾਹ ਲਵੋ।",
    disease: "ਫਸਲ ਰੋਗ ਪਛਾਣ",
    diseaseDesc: "ਫੋਟੋ ਰਾਹੀਂ ਫਸਲ ਦੇ ਰੋਗ ਅਤੇ ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ ਕਰੋ।",
    market: "ਮੰਡੀ ਅਤੇ ਬਾਜ਼ਾਰ",
    marketDesc: "ਖੇਤੀਬਾੜੀ ਉਤਪਾਦਾਂ ਲਈ ਮੰਡੀ ਅਤੇ ਬਾਜ਼ਾਰ ਦੀ ਜਾਣਕਾਰੀ ਲਵੋ।",
    produce: "ਉਤਪਾਦ ਪ੍ਰਬੰਧਨ",
    produceDesc: "ਆਪਣੀ ਉਪਜ ਦਾ ਪ੍ਰਬੰਧਨ, ਸਟੋਰੇਜ ਅਤੇ ਵਿਕਰੀ ਦੀ ਯੋਜਨਾ ਬਣਾਓ।",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    settings: "ਸੈਟਿੰਗਾਂ",
    talkAi: "AI ਨਾਲ ਗੱਲ ਕਰੋ →",
  },

  or: {
    welcome: "ନମସ୍କାର, ଚାଷୀ ବନ୍ଧୁ! 🌾",
    subtitle: "ଆଜି ଆପଣଙ୍କ ଚାଷରେ ଆମେ କିପରି ସାହାଯ୍ୟ କରିପାରିବା?",
    ai: "AI କୃଷି ମିତ୍ର",
    aiDesc: "ଚାଷ ସମ୍ପର୍କିତ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ ଏବଂ ନିଜ ଭାଷାରେ ଉତ୍ତର ପାଆନ୍ତୁ।",
    crop: "ଫସଲ ପରାମର୍ଶ",
    cropDesc: "ଜମି ଏବଂ ପାଣିପାଗ ଅନୁସାରେ ଫସଲ ପରାମର୍ଶ ପାଆନ୍ତୁ।",
    disease: "ଫସଲ ରୋଗ ଚିହ୍ନଟ",
    diseaseDesc: "ଫଟୋ ମାଧ୍ୟମରେ ଫସଲ ରୋଗ ଏବଂ କୀଟ ଚିହ୍ନଟ କରନ୍ତୁ।",
    market: "ମଣ୍ଡି ଏବଂ ବଜାର",
    marketDesc: "କୃଷି ଉତ୍ପାଦର ବଜାର ସୂଚନା ପାଆନ୍ତୁ।",
    produce: "ଉତ୍ପାଦ ପରିଚାଳନା",
    produceDesc: "ଆପଣଙ୍କ ଉତ୍ପାଦକୁ ପରିଚାଳନା, ସଂରକ୍ଷଣ ଏବଂ ବିକ୍ରୟ ଯୋଜନା କରନ୍ତୁ।",
    profile: "ପ୍ରୋଫାଇଲ",
    settings: "ସେଟିଂସ୍",
    talkAi: "AI ସହିତ କଥା ହୁଅନ୍ତୁ →",
  },

  as: {
    welcome: "নমস্কাৰ, কৃষক বন্ধু! 🌾",
    subtitle: "আজি আপোনাৰ কৃষিকাৰ্যত আমি কেনেকৈ সহায় কৰিব পাৰোঁ?",
    ai: "AI কৃষি মিত্ৰ",
    aiDesc: "কৃষিৰ বিষয়ে প্ৰশ্ন কৰক আৰু নিজৰ ভাষাত উত্তৰ লাভ কৰক।",
    crop: "শস্য পৰামৰ্শ",
    cropDesc: "মাটি আৰু বতৰৰ ওপৰত ভিত্তি কৰি শস্যৰ পৰামৰ্শ লাভ কৰক।",
    disease: "শস্য ৰোগ চিনাক্তকৰণ",
    diseaseDesc: "ফটোৰ জৰিয়তে শস্যৰ ৰোগ আৰু কীট-পতংগ চিনাক্ত কৰক।",
    market: "মাণ্ডী আৰু বজাৰ",
    marketDesc: "কৃষিজাত সামগ্ৰীৰ বজাৰৰ তথ্য লাভ কৰক।",
    produce: "উৎপাদন ব্যৱস্থাপনা",
    produceDesc: "আপোনাৰ উৎপাদন পৰিচালনা, সংৰক্ষণ আৰু বিক্ৰীৰ পৰিকল্পনা কৰক।",
    profile: "প্ৰফাইল",
    settings: "ছেটিংছ",
    talkAi: "AI ৰ সৈতে কথা পাতক →",
  },

  ur: {
    welcome: "السلام علیکم، کسان دوست! 🌾",
    subtitle: "آج ہم آپ کی زراعت میں کیسے مدد کر سکتے ہیں؟",
    ai: "AI کرشی متر",
    aiDesc: "زراعت سے متعلق سوال پوچھیں اور اپنی زبان میں جواب حاصل کریں۔",
    crop: "فصل کا مشورہ",
    cropDesc: "اپنی زمین اور موسم کے مطابق فصل کا مشورہ حاصل کریں۔",
    disease: "فصل کی بیماری کی شناخت",
    diseaseDesc: "تصویر کے ذریعے فصل کی بیماری اور کیڑوں کی شناخت کریں۔",
    market: "منڈی اور بازار",
    marketDesc: "اپنی زرعی پیداوار کے بازار کی معلومات حاصل کریں۔",
    produce: "پیداوار کا انتظام",
    produceDesc: "اپنی پیداوار کا انتظام، ذخیرہ اور فروخت کی منصوبہ بندی کریں۔",
    profile: "پروفائل",
    settings: "ترتیبات",
    talkAi: "AI سے بات کریں →",
  },
};

export default function DashboardPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && dashboardText[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = dashboardText[language] || dashboardText.en;

  const cards = [
    {
      icon: "🌱",
      title: t.crop,
      description: t.cropDesc,
      action: () => router.push("/crops"),
    },
    {
      icon: "🐛",
      title: t.disease,
      description: t.diseaseDesc,
      action: () => {},
    },
    {
      icon: "📈",
      title: t.market,
      description: t.marketDesc,
      action: () => {},
    },
    {
      icon: "📦",
      title: t.produce,
      description: t.produceDesc,
      action: () => {},
    },
  ];

  return (
    <main
      className="min-h-screen bg-green-50"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🌾</div>

            <div>
              <h1 className="text-2xl font-bold text-green-800">
                KrishiMitra
              </h1>

              <p className="text-xs text-gray-500">
                {languages[language] || "English"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/profile")}
              className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
            >
              👤
            </button>

            <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
              K
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="max-w-7xl mx-auto px-5 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t.welcome}
          </h2>

          <p className="text-gray-600 mt-3 text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* AI Main Card */}
        <button
          onClick={() => router.push("/ai")}
          className="w-full text-left mb-8"
        >
          <div className="bg-green-700 rounded-3xl p-7 md:p-9 text-white shadow-lg hover:shadow-xl transition">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="text-5xl mb-4">🤖</div>

                <h3 className="text-2xl md:text-3xl font-bold">
                  {t.ai}
                </h3>

                <p className="mt-3 text-green-50 max-w-2xl">
                  {t.aiDesc}
                </p>
              </div>

              <div className="hidden sm:block text-5xl">
                🎤
              </div>
            </div>

            <div className="mt-7 inline-flex px-5 py-3 rounded-xl bg-white text-green-700 font-bold">
              {t.talkAi}
            </div>
          </div>
        </button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={card.action}
              className="bg-white rounded-3xl p-6 text-left border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-5">
                {card.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {card.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {card.description}
              </p>

              <div className="mt-5 text-green-700 font-bold">
                →
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-10 bg-white rounded-3xl p-5 border border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => router.push("/profile")}
            className="text-gray-700 font-semibold"
          >
            👤 {t.profile}
          </button>
        </div>
      </section>
    </main>
  );
}
