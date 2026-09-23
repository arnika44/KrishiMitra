"use client";

import { useLanguage } from "../../lib/LanguageProvider";
import type { LanguageCode } from "../../lib/language";
import { useRouter } from "next/navigation";

const languageNames: Record<LanguageCode, string> = {
  en: "English",
  hi: "हिंदी",
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
  LanguageCode,
  {
    welcome: string;
    subtitle: string;
    ai: string;
    aiDesc: string;
    addCrop: string;
    addCropDesc: string;
    talkAi: string;
    profile: string;
  }
> = {
  en: {
    welcome: "Hello, Farmer Friend! 🌾",
    subtitle: "How can we help you with your farming today?",
    ai: "AI Krishi Mitra",
    aiDesc: "Ask farming questions and get answers in your language.",
    addCrop: "Add Crop",
    addCropDesc:
      "Add your crops and get all crop-related information in one place.",
    talkAi: "Talk to AI →",
    profile: "Profile",
  },

  hi: {
    welcome: "नमस्ते, किसान मित्र! 🌾",
    subtitle: "आज आपकी खेती में हम आपकी मदद कैसे करें?",
    ai: "AI कृषि मित्र",
    aiDesc: "खेती से जुड़े सवाल पूछें और अपनी भाषा में जवाब पाएँ।",
    addCrop: "फसल जोड़ें",
    addCropDesc:
      "अपनी फसल जोड़ें और फसल से जुड़ी सभी जानकारी एक जगह पाएँ।",
    talkAi: "AI से बात करें →",
    profile: "प्रोफ़ाइल",
  },

  bn: {
    welcome: "নমস্কার, কৃষক বন্ধু! 🌾",
    subtitle: "আজ আপনার কৃষিকাজে আমরা কীভাবে সাহায্য করতে পারি?",
    ai: "AI কৃষি মিত্র",
    aiDesc: "কৃষি সম্পর্কিত প্রশ্ন করুন এবং আপনার ভাষায় উত্তর পান।",
    addCrop: "ফসল যোগ করুন",
    addCropDesc:
      "আপনার ফসল যোগ করুন এবং ফসল সম্পর্কিত সমস্ত তথ্য এক জায়গায় পান।",
    talkAi: "AI-এর সাথে কথা বলুন →",
    profile: "প্রোফাইল",
  },

  mr: {
    welcome: "नमस्कार, शेतकरी मित्र! 🌾",
    subtitle: "आज तुमच्या शेतीसाठी आम्ही तुम्हाला कशी मदत करू शकतो?",
    ai: "AI कृषी मित्र",
    aiDesc:
      "शेतीशी संबंधित प्रश्न विचारा आणि तुमच्या भाषेत उत्तरे मिळवा.",
    addCrop: "पीक जोडा",
    addCropDesc:
      "तुमची पिके जोडा आणि पिकांशी संबंधित सर्व माहिती एका ठिकाणी मिळवा.",
    talkAi: "AI शी बोला →",
    profile: "प्रोफाइल",
  },

  ta: {
    welcome: "வணக்கம், விவசாய நண்பரே! 🌾",
    subtitle: "இன்று உங்கள் விவசாயத்தில் நாங்கள் எவ்வாறு உதவலாம்?",
    ai: "AI விவசாய நண்பர்",
    aiDesc:
      "விவசாயம் தொடர்பான கேள்விகளைக் கேட்டு உங்கள் மொழியில் பதில்களைப் பெறுங்கள்.",
    addCrop: "பயிரைச் சேர்க்கவும்",
    addCropDesc:
      "உங்கள் பயிர்களைச் சேர்த்து பயிர் தொடர்பான அனைத்து தகவல்களையும் ஒரே இடத்தில் பெறுங்கள்.",
    talkAi: "AI உடன் பேசுங்கள் →",
    profile: "சுயவிவரம்",
  },

  te: {
    welcome: "నమస్కారం, రైతు మిత్రమా! 🌾",
    subtitle: "ఈ రోజు మీ వ్యవసాయంలో మేము మీకు ఎలా సహాయం చేయగలం?",
    ai: "AI వ్యవసాయ మిత్ర",
    aiDesc:
      "వ్యవసాయానికి సంబంధించిన ప్రశ్నలు అడిగి మీ భాషలో సమాధానాలు పొందండి.",
    addCrop: "పంటను జోడించండి",
    addCropDesc:
      "మీ పంటలను జోడించి పంటకు సంబంధించిన మొత్తం సమాచారాన్ని ఒకే చోట పొందండి.",
    talkAi: "AIతో మాట్లాడండి →",
    profile: "ప్రొఫైల్",
  },

  gu: {
    welcome: "નમસ્તે, ખેડૂત મિત્ર! 🌾",
    subtitle: "આજે અમે તમારી ખેતીમાં કેવી રીતે મદદ કરી શકીએ?",
    ai: "AI કૃષિ મિત્ર",
    aiDesc:
      "ખેતી સંબંધિત પ્રશ્નો પૂછો અને તમારી ભાષામાં જવાબ મેળવો.",
    addCrop: "પાક ઉમેરો",
    addCropDesc:
      "તમારા પાક ઉમેરો અને પાક સંબંધિત તમામ માહિતી એક જ જગ્યાએ મેળવો.",
    talkAi: "AI સાથે વાત કરો →",
    profile: "પ્રોફાઇલ",
  },

  kn: {
    welcome: "ನಮಸ್ಕಾರ, ರೈತ ಸ್ನೇಹಿತರೆ! 🌾",
    subtitle: "ಇಂದು ನಿಮ್ಮ ಕೃಷಿಯಲ್ಲಿ ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    ai: "AI ಕೃಷಿ ಮಿತ್ರ",
    aiDesc:
      "ಕೃಷಿಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.",
    addCrop: "ಬೆಳೆ ಸೇರಿಸಿ",
    addCropDesc:
      "ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ಸೇರಿಸಿ ಮತ್ತು ಬೆಳೆಗೆ ಸಂಬಂಧಿಸಿದ ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಪಡೆಯಿರಿ.",
    talkAi: "AI ಜೊತೆ ಮಾತನಾಡಿ →",
    profile: "ಪ್ರೊಫೈಲ್",
  },

  ml: {
    welcome: "നമസ്കാരം, കർഷക സുഹൃത്തേ! 🌾",
    subtitle: "ഇന്ന് നിങ്ങളുടെ കൃഷിയിൽ ഞങ്ങൾ എങ്ങനെ സഹായിക്കാം?",
    ai: "AI കൃഷി മിത്ര",
    aiDesc:
      "കൃഷിയുമായി ബന്ധപ്പെട്ട ചോദ്യങ്ങൾ ചോദിച്ച് നിങ്ങളുടെ ഭാഷയിൽ ഉത്തരങ്ങൾ നേടുക.",
    addCrop: "വിള ചേർക്കുക",
    addCropDesc:
      "നിങ്ങളുടെ വിളകൾ ചേർത്ത് വിളയുമായി ബന്ധപ്പെട്ട എല്ലാ വിവരങ്ങളും ഒരിടത്ത് നേടുക.",
    talkAi: "AI-യോട് സംസാരിക്കുക →",
    profile: "പ്രൊഫൈൽ",
  },

  pa: {
    welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਕਿਸਾਨ ਮਿੱਤਰ! 🌾",
    subtitle: "ਅੱਜ ਅਸੀਂ ਤੁਹਾਡੀ ਖੇਤੀ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?",
    ai: "AI ਖੇਤੀ ਮਿੱਤਰ",
    aiDesc:
      "ਖੇਤੀ ਨਾਲ ਜੁੜੇ ਸਵਾਲ ਪੁੱਛੋ ਅਤੇ ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ।",
    addCrop: "ਫਸਲ ਜੋੜੋ",
    addCropDesc:
      "ਆਪਣੀਆਂ ਫਸਲਾਂ ਜੋੜੋ ਅਤੇ ਫਸਲ ਨਾਲ ਜੁੜੀ ਸਾਰੀ ਜਾਣਕਾਰੀ ਇੱਕ ਥਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",
    talkAi: "AI ਨਾਲ ਗੱਲ ਕਰੋ →",
    profile: "ਪ੍ਰੋਫਾਈਲ",
  },

  or: {
    welcome: "ନମସ୍କାର, କୃଷକ ବନ୍ଧୁ! 🌾",
    subtitle: "ଆଜି ଆପଣଙ୍କ ଚାଷରେ ଆମେ କିପରି ସାହାଯ୍ୟ କରିପାରିବୁ?",
    ai: "AI କୃଷି ମିତ୍ର",
    aiDesc:
      "ଚାଷ ସମ୍ବନ୍ଧୀୟ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ ଏବଂ ନିଜ ଭାଷାରେ ଉତ୍ତର ପାଆନ୍ତୁ।",
    addCrop: "ଫସଲ ଯୋଡନ୍ତୁ",
    addCropDesc:
      "ଆପଣଙ୍କ ଫସଲ ଯୋଡନ୍ତୁ ଏବଂ ଫସଲ ସମ୍ବନ୍ଧୀୟ ସମସ୍ତ ସୂଚନା ଗୋଟିଏ ସ୍ଥାନରେ ପାଆନ୍ତୁ।",
    talkAi: "AI ସହିତ କଥା ହୁଅନ୍ତୁ →",
    profile: "ପ୍ରୋଫାଇଲ୍",
  },

  as: {
    welcome: "নমস্কাৰ, কৃষক বন্ধু! 🌾",
    subtitle: "আজি আপোনাৰ কৃষিকাৰ্যত আমি কেনেকৈ সহায় কৰিব পাৰোঁ?",
    ai: "AI কৃষি মিত্ৰ",
    aiDesc:
      "কৃষিৰ সৈতে জড়িত প্ৰশ্ন সোধক আৰু আপোনাৰ ভাষাত উত্তৰ লাভ কৰক।",
    addCrop: "শস্য যোগ কৰক",
    addCropDesc:
      "আপোনাৰ শস্য যোগ কৰক আৰু শস্য সম্পৰ্কীয় সকলো তথ্য একে ঠাইতে লাভ কৰক।",
    talkAi: "AI ৰ সৈতে কথা পাতক →",
    profile: "প্ৰ'ফাইল",
  },

  ur: {
    welcome: "السلام علیکم، کسان دوست! 🌾",
    subtitle: "آج ہم آپ کی کھیتی میں کس طرح مدد کر سکتے ہیں؟",
    ai: "AI زرعی دوست",
    aiDesc:
      "زراعت سے متعلق سوالات پوچھیں اور اپنی زبان میں جواب حاصل کریں۔",
    addCrop: "فصل شامل کریں",
    addCropDesc:
      "اپنی فصلیں شامل کریں اور فصل سے متعلق تمام معلومات ایک جگہ حاصل کریں۔",
    talkAi: "AI سے بات کریں →",
    profile: "پروفائل",
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const t = dashboardText[language] || dashboardText.en;

  return (
    <main
      className="min-h-screen bg-green-50"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-4xl">🌾</div>

            <div>
              <h1 className="text-2xl font-bold text-green-800">
                KrishiMitra
              </h1>

              <p className="text-xs text-gray-500">
                {languageNames[language] || "English"}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Profile */}
            <button
              onClick={() => router.push("/profile")}
              className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
              aria-label={t.profile}
              title={t.profile}
            >
              👤
            </button>

            {/* Avatar */}
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
                <div className="text-5xl mb-4">
                  🤖
                </div>

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

        {/* ONLY ADD CROP */}
        <button
          onClick={() => router.push("/crops")}
          className="w-full md:max-w-md bg-white rounded-3xl p-7 text-left border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
        >
          <div className="text-5xl mb-5">
            🌱
          </div>

          <h3 className="text-2xl font-bold text-gray-900">
            {t.addCrop}
          </h3>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {t.addCropDesc}
          </p>

          <div className="mt-5 text-green-700 font-bold text-lg">
            →
          </div>
        </button>

      </section>
    </main>
  );
}