"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSavedLanguage, type LanguageCode } from "../../lib/language";
import { useLanguage } from "../../lib/LanguageProvider";

const translations: Record<
  LanguageCode,
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

  bn: {
    title: "আপনার ভূমিকা নির্বাচন করুন",
    subtitle: "আপনি কীভাবে KrishiMitra ব্যবহার করতে চান তা বেছে নিন",
    farmer: "কৃষক",
    farmerDesc:
      "আপনার কৃষিপণ্য, গুণমান, বাজার এবং কৃষি সংক্রান্ত সিদ্ধান্ত পরিচালনা করুন।",
    processor: "প্রসেসর",
    processorDesc:
      "প্রক্রিয়াকরণের জন্য কৃষিপণ্য খুঁজুন এবং কৃষকদের সাথে যোগাযোগ করুন।",
    buyer: "সাধারণ ক্রেতা",
    buyerDesc:
      "মানসম্পন্ন কৃষিপণ্য খুঁজুন এবং কিনুন।",
    logistics: "লজিস্টিক পার্টনার",
    logisticsDesc:
      "কৃষক ও ক্রেতাদের কৃষিপণ্য পরিবহনে সহায়তা করুন।",
    continue: "এগিয়ে যান →",
  },

  mr: {
    title: "तुमची भूमिका निवडा",
    subtitle: "तुम्हाला KrishiMitra कसे वापरायचे आहे ते निवडा",
    farmer: "शेतकरी",
    farmerDesc:
      "तुमचे उत्पादन, गुणवत्ता, बाजार आणि शेतीशी संबंधित निर्णय व्यवस्थापित करा.",
    processor: "प्रोसेसर",
    processorDesc:
      "प्रक्रियेसाठी कृषी उत्पादन शोधा आणि शेतकऱ्यांशी संपर्क साधा.",
    buyer: "सामान्य खरेदीदार",
    buyerDesc:
      "दर्जेदार कृषी उत्पादन शोधा आणि खरेदी करा.",
    logistics: "लॉजिस्टिक्स पार्टनर",
    logisticsDesc:
      "शेतकरी आणि खरेदीदारांना कृषी उत्पादन वाहतूक करण्यास मदत करा.",
    continue: "पुढे जा →",
  },

  ta: {
    title: "உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்",
    subtitle: "KrishiMitra-வை எவ்வாறு பயன்படுத்த விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும்",
    farmer: "விவசாயி",
    farmerDesc:
      "உங்கள் விளைபொருள், தரம், சந்தை மற்றும் விவசாய முடிவுகளை நிர்வகிக்கவும்.",
    processor: "செயலாக்குபவர்",
    processorDesc:
      "செயலாக்கத்திற்கான விவசாய விளைபொருட்களைக் கண்டறிந்து விவசாயிகளுடன் இணையுங்கள்.",
    buyer: "பொது வாங்குபவர்",
    buyerDesc:
      "தரமான விவசாய விளைபொருட்களைக் கண்டறிந்து வாங்குங்கள்.",
    logistics: "தளவாட கூட்டாளர்",
    logisticsDesc:
      "விவசாயிகள் மற்றும் வாங்குபவர்களுக்கு விவசாய விளைபொருட்களை கொண்டு செல்ல உதவுங்கள்.",
    continue: "தொடரவும் →",
  },

  te: {
    title: "మీ పాత్రను ఎంచుకోండి",
    subtitle: "మీరు KrishiMitra ను ఎలా ఉపయోగించాలనుకుంటున్నారో ఎంచుకోండి",
    farmer: "రైతు",
    farmerDesc:
      "మీ ఉత్పత్తి, నాణ్యత, మార్కెట్ మరియు వ్యవసాయ నిర్ణయాలను నిర్వహించండి.",
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
    subtitle: "તમે KrishiMitra નો ઉપયોગ કેવી રીતે કરવા માંગો છો તે પસંદ કરો",
    farmer: "ખેડૂત",
    farmerDesc:
      "તમારા ઉત્પાદન, ગુણવત્તા, બજાર અને ખેતી સંબંધિત નિર્ણયો મેનેજ કરો.",
    processor: "પ્રોસેસર",
    processorDesc:
      "પ્રોસેસિંગ માટે કૃષિ ઉત્પાદન શોધો અને ખેડૂતો સાથે જોડાઓ.",
    buyer: "સામાન્ય ખરીદદાર",
    buyerDesc:
      "ગુણવત્તાવાળું કૃષિ ઉત્પાદન શોધો અને ખરીદો.",
    logistics: "લોજિસ્ટિક્સ પાર્ટનર",
    logisticsDesc:
      "ખેડૂતો અને ખરીદદારોને કૃષિ ઉત્પાદનના પરિવહનમાં મદદ કરો.",
    continue: "આગળ વધો →",
  },

  kn: {
    title: "ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    subtitle: "ನೀವು KrishiMitra ಅನ್ನು ಹೇಗೆ ಬಳಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    farmer: "ರೈತ",
    farmerDesc:
      "ನಿಮ್ಮ ಉತ್ಪನ್ನ, ಗುಣಮಟ್ಟ, ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಕೃಷಿ ನಿರ್ಧಾರಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    processor: "ಪ್ರೊಸೆಸರ್",
    processorDesc:
      "ಸಂಸ್ಕರಣೆಗೆ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
    buyer: "ಸಾಮಾನ್ಯ ಖರೀದಿದಾರ",
    buyerDesc:
      "ಗುಣಮಟ್ಟದ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಖರೀದಿಸಿ.",
    logistics: "ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪಾಲುದಾರ",
    logisticsDesc:
      "ರೈತರು ಮತ್ತು ಖರೀದಿದಾರರಿಗೆ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಸಾಗಿಸಲು ಸಹಾಯ ಮಾಡಿ.",
    continue: "ಮುಂದುವರಿಸಿ →",
  },

  ml: {
    title: "നിങ്ങളുടെ റോൾ തിരഞ്ഞെടുക്കുക",
    subtitle: "KrishiMitra എങ്ങനെ ഉപയോഗിക്കണമെന്ന് തിരഞ്ഞെടുക്കുക",
    farmer: "കർഷകൻ",
    farmerDesc:
      "നിങ്ങളുടെ ഉൽപ്പന്നം, ഗുണനിലവാരം, വിപണി, കൃഷി തീരുമാനങ്ങൾ എന്നിവ നിയന്ത്രിക്കുക.",
    processor: "പ്രോസസർ",
    processorDesc:
      "സംസ്കരണത്തിനായി കാർഷിക ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തുകയും കർഷകരുമായി ബന്ധപ്പെടുകയും ചെയ്യുക.",
    buyer: "സാധാരണ വാങ്ങുന്നയാൾ",
    buyerDesc:
      "ഗുണമേന്മയുള്ള കാർഷിക ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തി വാങ്ങുക.",
    logistics: "ലോജിസ്റ്റിക്സ് പങ്കാളി",
    logisticsDesc:
      "കർഷകരെയും വാങ്ങുന്നവരെയും കാർഷിക ഉൽപ്പന്നങ്ങൾ കൊണ്ടുപോകാൻ സഹായിക്കുക.",
    continue: "തുടരുക →",
  },

  pa: {
    title: "ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ",
    subtitle: "ਚੁਣੋ ਕਿ ਤੁਸੀਂ KrishiMitra ਨੂੰ ਕਿਵੇਂ ਵਰਤਣਾ ਚਾਹੁੰਦੇ ਹੋ",
    farmer: "ਕਿਸਾਨ",
    farmerDesc:
      "ਆਪਣੀ ਉਪਜ, ਗੁਣਵੱਤਾ, ਮਾਰਕੀਟ ਅਤੇ ਖੇਤੀਬਾੜੀ ਦੇ ਫੈਸਲੇ ਸੰਭਾਲੋ।",
    processor: "ਪ੍ਰੋਸੈਸਰ",
    processorDesc:
      "ਪ੍ਰੋਸੈਸਿੰਗ ਲਈ ਖੇਤੀਬਾੜੀ ਉਤਪਾਦ ਲੱਭੋ ਅਤੇ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ।",
    buyer: "ਆਮ ਖਰੀਦਦਾਰ",
    buyerDesc:
      "ਗੁਣਵੱਤਾ ਵਾਲੀ ਖੇਤੀਬਾੜੀ ਉਪਜ ਲੱਭੋ ਅਤੇ ਖਰੀਦੋ।",
    logistics: "ਲੌਜਿਸਟਿਕਸ ਭਾਗੀਦਾਰ",
    logisticsDesc:
      "ਕਿਸਾਨਾਂ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਖੇਤੀਬਾੜੀ ਉਤਪਾਦਾਂ ਦੀ ਆਵਾਜਾਈ ਵਿੱਚ ਮਦਦ ਕਰੋ।",
    continue: "ਅੱਗੇ ਵਧੋ →",
  },

  or: {
    title: "ଆପଣଙ୍କ ଭୂମିକା ବାଛନ୍ତୁ",
    subtitle: "ଆପଣ KrishiMitra କୁ କିପରି ବ୍ୟବହାର କରିବେ ତାହା ବାଛନ୍ତୁ",
    farmer: "ଚାଷୀ",
    farmerDesc:
      "ଆପଣଙ୍କ ଉତ୍ପାଦ, ଗୁଣବତ୍ତା, ବଜାର ଏବଂ କୃଷି ନିଷ୍ପତ୍ତି ପରିଚାଳନା କରନ୍ତୁ।",
    processor: "ପ୍ରୋସେସର",
    processorDesc:
      "ପ୍ରକ୍ରିୟାକରଣ ପାଇଁ କୃଷି ଉତ୍ପାଦ ଖୋଜନ୍ତୁ ଏବଂ ଚାଷୀମାନଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    buyer: "ସାଧାରଣ କ୍ରେତା",
    buyerDesc:
      "ଗୁଣବତ୍ତାପୂର୍ଣ୍ଣ କୃଷି ଉତ୍ପାଦ ଖୋଜି କିଣନ୍ତୁ।",
    logistics: "ଲଜିଷ୍ଟିକ୍ସ ପାର୍ଟନର",
    logisticsDesc:
      "ଚାଷୀ ଏବଂ କ୍ରେତାମାନଙ୍କୁ କୃଷି ଉତ୍ପାଦ ପରିବହନରେ ସାହାଯ୍ୟ କରନ୍ତୁ।",
    continue: "ଆଗକୁ ବଢନ୍ତୁ →",
  },

  as: {
    title: "আপোনাৰ ভূমিকা বাছনি কৰক",
    subtitle: "আপুনি KrishiMitra কেনেদৰে ব্যৱহাৰ কৰিব বিচাৰে বাছনি কৰক",
    farmer: "কৃষক",
    farmerDesc:
      "আপোনাৰ উৎপাদন, গুণগত মান, বজাৰ আৰু কৃষি সিদ্ধান্ত পৰিচালনা কৰক।",
    processor: "প্ৰচেছৰ",
    processorDesc:
      "প্ৰচেছিঙৰ বাবে কৃষি উৎপাদন বিচাৰি কৃষকৰ সৈতে সংযোগ স্থাপন কৰক।",
    buyer: "সাধাৰণ ক্ৰেতা",
    buyerDesc:
      "গুণগত কৃষি উৎপাদন বিচাৰি ক্ৰয় কৰক।",
    logistics: "লজিষ্টিক্স অংশীদাৰ",
    logisticsDesc:
      "কৃষক আৰু ক্ৰেতাসকলক কৃষি উৎপাদন পৰিবহণত সহায় কৰক।",
    continue: "আগবাঢ়ক →",
  },

  ur: {
    title: "اپنا کردار منتخب کریں",
    subtitle: "منتخب کریں کہ آپ KrishiMitra کو کیسے استعمال کرنا چاہتے ہیں",
    farmer: "کسان",
    farmerDesc:
      "اپنی پیداوار، معیار، مارکیٹ اور زرعی فیصلوں کا انتظام کریں۔",
    processor: "پروسیسر",
    processorDesc:
      "پروسیسنگ کے لیے زرعی پیداوار تلاش کریں اور کسانوں سے رابطہ کریں۔",
    buyer: "عام خریدار",
    buyerDesc:
      "معیاری زرعی پیداوار تلاش کریں اور خریدیں۔",
    logistics: "لاجسٹکس پارٹنر",
    logisticsDesc:
      "کسانوں اور خریداروں کو زرعی پیداوار کی ترسیل میں مدد کریں۔",
    continue: "آگے بڑھیں →",
  },
};

export default function RolePage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const savedLanguage = getSavedLanguage();
    setLanguage(savedLanguage);
  }, [setLanguage]);

  const currentTranslations =
    translations[language] || translations.en;

  const roles = [
    {
      key: "farmer",
      icon: "👨‍🌾",
      title: currentTranslations.farmer,
      description: currentTranslations.farmerDesc,
      route: "/profile",
    },
    {
      key: "processor",
      icon: "🏭",
      title: currentTranslations.processor,
      description: currentTranslations.processorDesc,
      route: "/dashboard/processor",
    },
    {
      key: "buyer",
      icon: "🛒",
      title: currentTranslations.buyer,
      description: currentTranslations.buyerDesc,
      route: "/dashboard/buyer",
    },
    {
      key: "logistics",
      icon: "🚚",
      title: currentTranslations.logistics,
      description: currentTranslations.logisticsDesc,
      route: "/dashboard/logistics",
    },
  ];

  const selectRole = (
    roleKey: string,
    route: string
  ) => {
    localStorage.setItem(
      "userRole",
      roleKey
    );

    if (roleKey === "farmer") {
      const savedProfile =
        localStorage.getItem(
          "farmerProfile"
        );

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
            {currentTranslations.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {currentTranslations.subtitle}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {roles.map((role) => (
            <button
              key={role.key}
              type="button"
              onClick={() =>
                selectRole(
                  role.key,
                  role.route
                )
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
                {currentTranslations.continue}
              </div>
            </button>
          ))}

        </div>

      </div>
    </main>
  );
}