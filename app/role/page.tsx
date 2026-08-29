
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const translations: Record<
  string,
  {
    title: string;
    subtitle: string;
    farmer: string;
    farmerDesc: string;
    processor: string;
    processorDesc: string;
    buyer: string;
    buyerDesc: string;
    logistics: string;
    logisticsDesc: string;
    continue: string;
  }
> = {
  en: {
    title: "Select Your Role",
    subtitle: "Choose how you want to use KrishiMitra",
    farmer: "Farmer",
    farmerDesc:
      "Manage your produce, quality, market and farming decisions.",
    processor: "Processor",
    processorDesc:
      "Find agricultural produce for processing and connect with farmers.",
    buyer: "Common Buyer",
    buyerDesc:
      "Discover and purchase quality agricultural produce.",
    logistics: "Logistics Partner",
    logisticsDesc:
      "Help farmers and buyers transport agricultural produce.",
    continue: "Continue →",
  },

  hi: {
    title: "अपनी भूमिका चुनें",
    subtitle:
      "चुनें कि आप KrishiMitra का उपयोग कैसे करना चाहते हैं",
    farmer: "किसान",
    farmerDesc:
      "अपनी उपज, गुणवत्ता, बाजार और खेती से जुड़े निर्णयों को manage करें।",
    processor: "प्रोसेसर",
    processorDesc:
      "प्रोसेसिंग के लिए कृषि उपज खोजें और किसानों से जुड़ें।",
    buyer: "सामान्य खरीदार",
    buyerDesc:
      "अच्छी गुणवत्ता वाली कृषि उपज खोजें और खरीदें।",
    logistics: "लॉजिस्टिक्स पार्टनर",
    logisticsDesc:
      "किसानों और खरीदारों तक कृषि उपज पहुँचाने में मदद करें।",
    continue: "आगे बढ़ें →",
  },

  mr: {
    title: "तुमची भूमिका निवडा",
    subtitle:
      "तुम्हाला KrishiMitra कसे वापरायचे आहे ते निवडा",
    farmer: "शेतकरी",
    farmerDesc:
      "तुमचे उत्पादन, गुणवत्ता, बाजार आणि शेतीशी संबंधित निर्णय व्यवस्थापित करा.",
    processor: "प्रोसेसर",
    processorDesc:
      "प्रक्रियेसाठी कृषी उत्पादन शोधा आणि शेतकऱ्यांशी जोडा.",
    buyer: "सामान्य खरेदीदार",
    buyerDesc:
      "चांगल्या गुणवत्तेचे कृषी उत्पादन शोधा आणि खरेदी करा.",
    logistics: "लॉजिस्टिक्स पार्टनर",
    logisticsDesc:
      "शेतकरी आणि खरेदीदारांपर्यंत कृषी उत्पादन पोहोचवण्यास मदत करा.",
    continue: "पुढे जा →",
  },

  bn: {
    title: "আপনার ভূমিকা নির্বাচন করুন",
    subtitle:
      "আপনি কীভাবে KrishiMitra ব্যবহার করতে চান তা নির্বাচন করুন",
    farmer: "কৃষক",
    farmerDesc:
      "আপনার কৃষিপণ্য, গুণমান, বাজার এবং কৃষি সংক্রান্ত সিদ্ধান্ত পরিচালনা করুন।",
    processor: "প্রসেসর",
    processorDesc:
      "প্রক্রিয়াকরণের জন্য কৃষিপণ্য খুঁজুন এবং কৃষকদের সাথে যোগাযোগ করুন।",
    buyer: "সাধারণ ক্রেতা",
    buyerDesc:
      "ভালো মানের কৃষিপণ্য খুঁজুন এবং কিনুন।",
    logistics: "লজিস্টিক পার্টনার",
    logisticsDesc:
      "কৃষক ও ক্রেতাদের কাছে কৃষিপণ্য পরিবহনে সহায়তা করুন।",
    continue: "এগিয়ে যান →",
  },

  ta: {
    title: "உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்",
    subtitle:
      "KrishiMitra-வை எவ்வாறு பயன்படுத்த விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும்",
    farmer: "விவசாயி",
    farmerDesc:
      "உங்கள் விளைபொருள், தரம், சந்தை மற்றும் விவசாய முடிவுகளை நிர்வகிக்கவும்.",
    processor: "செயலாக்குபவர்",
    processorDesc:
      "செயலாக்கத்திற்கான விவசாய விளைபொருட்களைக் கண்டறிந்து விவசாயிகளுடன் இணையுங்கள்.",
    buyer: "பொதுவான வாங்குபவர்",
    buyerDesc:
      "தரமான விவசாய விளைபொருட்களைக் கண்டறிந்து வாங்குங்கள்.",
    logistics: "தளவாட கூட்டாளர்",
    logisticsDesc:
      "விவசாயிகள் மற்றும் வாங்குபவர்களுக்கு விளைபொருட்களை கொண்டு செல்ல உதவுங்கள்.",
    continue: "தொடரவும் →",
  },

  te: {
    title: "మీ పాత్రను ఎంచుకోండి",
    subtitle:
      "మీరు KrishiMitra ను ఎలా ఉపయోగించాలనుకుంటున్నారో ఎంచుకోండి",
    farmer: "రైతు",
    farmerDesc:
      "మీ పంట, నాణ్యత, మార్కెట్ మరియు వ్యవసాయ నిర్ణయాలను నిర్వహించండి.",
    processor: "ప్రాసెసర్",
    processorDesc:
      "ప్రాసెసింగ్ కోసం వ్యవసాయ ఉత్పత్తులను కనుగొని రైతులతో కనెక్ట్ అవ్వండి.",
    buyer: "సాధారణ కొనుగోలుదారు",
    buyerDesc:
      "నాణ్యమైన వ్యవసాయ ఉత్పత్తులను కనుగొని కొనుగోలు చేయండి.",
    logistics: "లాజిస్టిక్స్ భాగస్వామి",
    logisticsDesc:
      "రైతులు మరియు కొనుగోలుదారులకు వ్యవసాయ ఉత్పత్తులను రవాణా చేయడంలో సహాయం చేయండి.",
    continue: "కొనసాగించండి →",
  },

  gu: {
    title: "તમારી ભૂમિકા પસંદ કરો",
    subtitle:
      "તમે KrishiMitra નો ઉપયોગ કેવી રીતે કરવા માંગો છો તે પસંદ કરો",
    farmer: "ખેડૂત",
    farmerDesc:
      "તમારી ઉપજ, ગુણવત્તા, બજાર અને ખેતી સંબંધિત નિર્ણયોનું સંચાલન કરો.",
    processor: "પ્રોસેસર",
    processorDesc:
      "પ્રોસેસિંગ માટે કૃષિ ઉપજ શોધો અને ખેડૂતો સાથે જોડાઓ.",
    buyer: "સામાન્ય ખરીદદાર",
    buyerDesc:
      "સારી ગુણવત્તાવાળી કૃષિ ઉપજ શોધો અને ખરીદો.",
    logistics: "લોજિસ્ટિક્સ પાર્ટનર",
    logisticsDesc:
      "ખેડૂતો અને ખરીદદારો સુધી કૃષિ ઉપજ પહોંચાડવામાં મદદ કરો.",
    continue: "આગળ વધો →",
  },

  kn: {
    title: "ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    subtitle:
      "ನೀವು KrishiMitra ಅನ್ನು ಹೇಗೆ ಬಳಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    farmer: "ರೈತ",
    farmerDesc:
      "ನಿಮ್ಮ ಉತ್ಪನ್ನ, ಗುಣಮಟ್ಟ, ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಕೃಷಿ ನಿರ್ಧಾರಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    processor: "ಪ್ರೊಸೆಸರ್",
    processorDesc:
      "ಸಂಸ್ಕರಣೆಗಾಗಿ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
    buyer: "ಸಾಮಾನ್ಯ ಖರೀದಿದಾರ",
    buyerDesc:
      "ಗುಣಮಟ್ಟದ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಖರೀದಿಸಿ.",
    logistics: "ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪಾಲುದಾರ",
    logisticsDesc:
      "ರೈತರು ಮತ್ತು ಖರೀದಿದಾರರಿಗೆ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಸಾಗಿಸಲು ಸಹಾಯ ಮಾಡಿ.",
    continue: "ಮುಂದುವರಿಸಿ →",
  },

  ml: {
    title: "നിങ്ങളുടെ പങ്ക് തിരഞ്ഞെടുക്കുക",
    subtitle:
      "KrishiMitra എങ്ങനെ ഉപയോഗിക്കണമെന്ന് തിരഞ്ഞെടുക്കുക",
    farmer: "കർഷകൻ",
    farmerDesc:
      "നിങ്ങളുടെ ഉൽപ്പന്നം, ഗുണനിലവാരം, വിപണി, കൃഷി തീരുമാനങ്ങൾ എന്നിവ നിയന്ത്രിക്കുക.",
    processor: "പ്രോസസർ",
    processorDesc:
      "സംസ്കരണത്തിനായി കാർഷിക ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തി കർഷകരുമായി ബന്ധപ്പെടുക.",
    buyer: "സാധാരണ വാങ്ങുന്നയാൾ",
    buyerDesc:
      "ഗുണമേന്മയുള്ള കാർഷിക ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തി വാങ്ങുക.",
    logistics: "ലോജിസ്റ്റിക്സ് പങ്കാളി",
    logisticsDesc:
      "കർഷകർക്കും വാങ്ങുന്നവർക്കും കാർഷിക ഉൽപ്പന്നങ്ങൾ എത്തിക്കാൻ സഹായിക്കുക.",
    continue: "തുടരുക →",
  },

  pa: {
    title: "ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ",
    subtitle:
      "ਚੁਣੋ ਕਿ ਤੁਸੀਂ KrishiMitra ਨੂੰ ਕਿਵੇਂ ਵਰਤਣਾ ਚਾਹੁੰਦੇ ਹੋ",
    farmer: "ਕਿਸਾਨ",
    farmerDesc:
      "ਆਪਣੀ ਉਪਜ, ਗੁਣਵੱਤਾ, ਮੰਡੀ ਅਤੇ ਖੇਤੀਬਾੜੀ ਦੇ ਫੈਸਲਿਆਂ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ।",
    processor: "ਪ੍ਰੋਸੈਸਰ",
    processorDesc:
      "ਪ੍ਰੋਸੈਸਿੰਗ ਲਈ ਖੇਤੀਬਾੜੀ ਉਤਪਾਦ ਲੱਭੋ ਅਤੇ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ।",
    buyer: "ਆਮ ਖਰੀਦਦਾਰ",
    buyerDesc:
      "ਵਧੀਆ ਗੁਣਵੱਤਾ ਵਾਲੀ ਖੇਤੀਬਾੜੀ ਉਪਜ ਲੱਭੋ ਅਤੇ ਖਰੀਦੋ।",
    logistics: "ਲੌਜਿਸਟਿਕਸ ਪਾਰਟਨਰ",
    logisticsDesc:
      "ਕਿਸਾਨਾਂ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਤੱਕ ਖੇਤੀਬਾੜੀ ਉਤਪਾਦ ਪਹੁੰਚਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰੋ।",
    continue: "ਅੱਗੇ ਵਧੋ →",
  },

  or: {
    title: "ଆପଣଙ୍କ ଭୂମିକା ବାଛନ୍ତୁ",
    subtitle:
      "ଆପଣ KrishiMitra କିପରି ବ୍ୟବହାର କରିବେ ତାହା ବାଛନ୍ତୁ",
    farmer: "ଚାଷୀ",
    farmerDesc:
      "ଆପଣଙ୍କ ଉତ୍ପାଦ, ଗୁଣବତ୍ତା, ବଜାର ଏବଂ ଚାଷ ସମ୍ପର୍କିତ ନିଷ୍ପତ୍ତି ପରିଚାଳନା କରନ୍ତୁ।",
    processor: "ପ୍ରୋସେସର",
    processorDesc:
      "ପ୍ରକ୍ରିୟାକରଣ ପାଇଁ କୃଷି ଉତ୍ପାଦ ଖୋଜନ୍ତୁ ଏବଂ ଚାଷୀଙ୍କ ସହିତ ଯୋଡି ହୁଅନ୍ତୁ।",
    buyer: "ସାଧାରଣ କ୍ରେତା",
    buyerDesc:
      "ଭଲ ଗୁଣବତ୍ତାର କୃଷି ଉତ୍ପାଦ ଖୋଜନ୍ତୁ ଏବଂ କିଣନ୍ତୁ।",
    logistics: "ଲଜିଷ୍ଟିକ୍ସ ପାର୍ଟନର",
    logisticsDesc:
      "ଚାଷୀ ଏବଂ କ୍ରେତାଙ୍କ ପାଖକୁ କୃଷି ଉତ୍ପାଦ ପହଞ୍ଚାଇବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ।",
    continue: "ଆଗକୁ ବଢନ୍ତୁ →",
  },

  as: {
    title: "আপোনাৰ ভূমিকা বাছনি কৰক",
    subtitle:
      "আপুনি KrishiMitra কেনেকৈ ব্যৱহাৰ কৰিব বিচাৰে বাছনি কৰক",
    farmer: "কৃষক",
    farmerDesc:
      "আপোনাৰ কৃষি উৎপাদন, গুণগত মান, বজাৰ আৰু কৃষি সিদ্ধান্ত পৰিচালনা কৰক।",
    processor: "প্ৰচেছৰ",
    processorDesc:
      "প্ৰক্ৰিয়াকৰণৰ বাবে কৃষি উৎপাদন বিচাৰি কৃষকৰ সৈতে সংযোগ স্থাপন কৰক।",
    buyer: "সাধাৰণ ক্ৰেতা",
    buyerDesc:
      "উচ্চমানৰ কৃষি উৎপাদন বিচাৰি ক্ৰয় কৰক।",
    logistics: "লজিষ্টিক্স অংশীদাৰ",
    logisticsDesc:
      "কৃষক আৰু ক্ৰেতালৈ কৃষি উৎপাদন পৰিবহণ কৰাত সহায় কৰক।",
    continue: "আগবাঢ়ক →",
  },

  ur: {
    title: "اپنا کردار منتخب کریں",
    subtitle:
      "منتخب کریں کہ آپ KrishiMitra کو کیسے استعمال کرنا چاہتے ہیں",
    farmer: "کسان",
    farmerDesc:
      "اپنی پیداوار، معیار، منڈی اور زرعی فیصلوں کا انتظام کریں۔",
    processor: "پروسیسر",
    processorDesc:
      "پروسیسنگ کے لیے زرعی پیداوار تلاش کریں اور کسانوں سے رابطہ کریں۔",
    buyer: "عام خریدار",
    buyerDesc:
      "معیاری زرعی پیداوار تلاش کریں اور خریدیں۔",
    logistics: "لاجسٹکس پارٹنر",
    logisticsDesc:
      "کسانوں اور خریداروں تک زرعی پیداوار پہنچانے میں مدد کریں۔",
    continue: "جاری رکھیں →",
  },
};

export default function RolePage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language] || translations.en;

  const roles = [
    {
      key: "farmer",
      icon: "👨‍🌾",
      title: t.farmer,
      description: t.farmerDesc,
      route: "/profile",
    },
    {
      key: "processor",
      icon: "🏭",
      title: t.processor,
      description: t.processorDesc,
      route: "/dashboard/processor",
    },
    {
      key: "buyer",
      icon: "🛒",
      title: t.buyer,
      description: t.buyerDesc,
      route: "/dashboard/buyer",
    },
    {
      key: "logistics",
      icon: "🚚",
      title: t.logistics,
      description: t.logisticsDesc,
      route: "/dashboard/logistics",
    },
  ];

  const selectRole = (roleKey: string, route: string) => {
    localStorage.setItem("userRole", roleKey);

    if (roleKey === "farmer") {
      const savedProfile = localStorage.getItem("farmerProfile");

      if (savedProfile) {
        router.push("/crops");
      } else {
        router.push("/profile");
      }

      return;
    }

    router.push(route);
  };

  return (
    <main
      className="min-h-screen bg-green-50 flex items-center justify-center px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">
            🌾
          </div>

          <h1 className="text-4xl font-bold text-green-800">
            KrishiMitra
          </h1>

          <h2 className="text-2xl font-bold text-gray-900 mt-6">
            {t.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {t.subtitle}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {roles.map((role) => (
            <button
              key={role.key}
              type="button"
              onClick={() =>
                selectRole(role.key, role.route)
              }
              className="bg-white rounded-3xl p-7 text-left border-2 border-transparent hover:border-green-600 hover:shadow-xl transition"
            >
              <div className="text-5xl mb-5">
                {role.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                {role.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {role.description}
              </p>

              <div className="mt-6 text-green-700 font-bold">
                {t.continue}
              </div>
            </button>
          ))}

        </div>

      </div>
    </main>
  );
}
