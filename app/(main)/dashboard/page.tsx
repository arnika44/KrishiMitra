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
    addCrop: string;
    addCropDesc: string;
    talkAi: string;
  }
> = {
  hi: {
    welcome: "नमस्ते, किसान मित्र! 🌾",
    subtitle: "आज आपकी खेती में हम आपकी मदद कैसे करें?",
    ai: "AI कृषि मित्र",
    aiDesc: "खेती से जुड़े सवाल पूछें और अपनी भाषा में जवाब पाएँ।",
    addCrop: "फसल जोड़ें",
    addCropDesc:
      "अपनी फसल जोड़ें और फसल से जुड़ी सभी जानकारी एक जगह पाएँ।",
    talkAi: "AI से बात करें →",
  },

  en: {
    welcome: "Hello, Farmer Friend! 🌾",
    subtitle: "How can we help you with your farming today?",
    ai: "AI Krishi Mitra",
    aiDesc: "Ask farming questions and get answers in your language.",
    addCrop: "Add Crop",
    addCropDesc:
      "Add your crops and get all crop-related information in one place.",
    talkAi: "Talk to AI →",
  },

  bn: {
    welcome: "নমস্কার, কৃষক বন্ধু! 🌾",
    subtitle: "আজ আপনার কৃষিকাজে আমরা কীভাবে সাহায্য করতে পারি?",
    ai: "AI কৃষি মিত্র",
    aiDesc: "কৃষি সম্পর্কে প্রশ্ন করুন এবং নিজের ভাষায় উত্তর পান।",
    addCrop: "ফসল যোগ করুন",
    addCropDesc:
      "আপনার ফসল যোগ করুন এবং ফসল সম্পর্কিত সমস্ত তথ্য এক জায়গায় পান।",
    talkAi: "AI-এর সাথে কথা বলুন →",
  },

  mr: {
    welcome: "नमस्कार, शेतकरी मित्र! 🌾",
    subtitle: "आज शेतीमध्ये आम्ही तुमची कशी मदत करू?",
    ai: "AI कृषी मित्र",
    aiDesc: "शेतीशी संबंधित प्रश्न विचारा आणि तुमच्या भाषेत उत्तर मिळवा.",
    addCrop: "पीक जोडा",
    addCropDesc:
      "तुमची पिके जोडा आणि पिकांशी संबंधित सर्व माहिती एका ठिकाणी मिळवा.",
    talkAi: "AI शी बोला →",
  },

  ta: {
    welcome: "வணக்கம், விவசாய நண்பரே! 🌾",
    subtitle: "இன்று உங்கள் விவசாயத்தில் நாங்கள் எப்படி உதவலாம்?",
    ai: "AI கிருஷி மித்ரா",
    aiDesc:
      "விவசாய கேள்விகளைக் கேட்டு உங்கள் மொழியில் பதில் பெறுங்கள்.",
    addCrop: "பயிரைச் சேர்க்கவும்",
    addCropDesc:
      "உங்கள் பயிர்களைச் சேர்த்து, பயிர் தொடர்பான அனைத்து தகவல்களையும் ஒரே இடத்தில் பெறுங்கள்.",
    talkAi: "AI உடன் பேசுங்கள் →",
  },

  te: {
    welcome: "నమస్కారం, రైతు మిత్రమా! 🌾",
    subtitle: "ఈ రోజు మీ వ్యవసాయంలో మేము ఎలా సహాయం చేయగలం?",
    ai: "AI కృషి మిత్ర",
    aiDesc:
      "వ్యవసాయ ప్రశ్నలు అడిగి మీ భాషలో సమాధానాలు పొందండి.",
    addCrop: "పంటను జోడించండి",
    addCropDesc:
      "మీ పంటలను జోడించి పంటకు సంబంధించిన మొత్తం సమాచారాన్ని ఒకే చోట పొందండి.",
    talkAi: "AI తో మాట్లాడండి →",
  },

  gu: {
    welcome: "નમસ્તે, ખેડૂત મિત્ર! 🌾",
    subtitle: "આજે તમારી ખેતીમાં અમે કેવી રીતે મદદ કરી શકીએ?",
    ai: "AI કૃષિ મિત્ર",
    aiDesc:
      "ખેતી સંબંધિત પ્રશ્નો પૂછો અને તમારી ભાષામાં જવાબ મેળવો.",
    addCrop: "પાક ઉમેરો",
    addCropDesc:
      "તમારા પાક ઉમેરો અને પાક સંબંધિત તમામ માહિતી એક જ જગ્યાએ મેળવો.",
    talkAi: "AI સાથે વાત કરો →",
  },

  kn: {
    welcome: "ನಮಸ್ಕಾರ, ರೈತ ಮಿತ್ರ! 🌾",
    subtitle: "ಇಂದು ನಿಮ್ಮ ಕೃಷಿಯಲ್ಲಿ ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    ai: "AI ಕೃಷಿ ಮಿತ್ರ",
    aiDesc:
      "ಕೃಷಿಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರ ಪಡೆಯಿರಿ.",
    addCrop: "ಬೆಳೆ ಸೇರಿಸಿ",
    addCropDesc:
      "ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ಸೇರಿಸಿ ಮತ್ತು ಬೆಳೆ ಸಂಬಂಧಿತ ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಪಡೆಯಿರಿ.",
    talkAi: "AI ಜೊತೆ ಮಾತನಾಡಿ →",
  },

  ml: {
    welcome: "നമസ്കാരം, കർഷക സുഹൃത്തേ! 🌾",
    subtitle: "ഇന്ന് നിങ്ങളുടെ കൃഷിയിൽ ഞങ്ങൾ എങ്ങനെ സഹായിക്കാം?",
    ai: "AI കൃഷി മിത്ര",
    aiDesc:
      "കൃഷിയെക്കുറിച്ച് ചോദിച്ച് നിങ്ങളുടെ ഭാഷയിൽ ഉത്തരങ്ങൾ നേടുക.",
    addCrop: "വിള ചേർക്കുക",
    addCropDesc:
      "നിങ്ങളുടെ വിളകൾ ചേർത്ത് വിളയുമായി ബന്ധപ്പെട്ട എല്ലാ വിവരങ്ങളും ഒരിടത്ത് നേടുക.",
    talkAi: "AI-യോട് സംസാരിക്കുക →",
  },

  pa: {
    welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਕਿਸਾਨ ਮਿੱਤਰ! 🌾",
    subtitle: "ਅੱਜ ਅਸੀਂ ਤੁਹਾਡੀ ਖੇਤੀ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?",
    ai: "AI ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ",
    aiDesc:
      "ਖੇਤੀ ਨਾਲ ਸਬੰਧਤ ਸਵਾਲ ਪੁੱਛੋ ਅਤੇ ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਜਵਾਬ ਲਵੋ।",
    addCrop: "ਫਸਲ ਸ਼ਾਮਲ ਕਰੋ",
    addCropDesc:
      "ਆਪਣੀਆਂ ਫਸਲਾਂ ਸ਼ਾਮਲ ਕਰੋ ਅਤੇ ਫਸਲ ਨਾਲ ਸਬੰਧਤ ਸਾਰੀ ਜਾਣਕਾਰੀ ਇੱਕ ਥਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",
    talkAi: "AI ਨਾਲ ਗੱਲ ਕਰੋ →",
  },

  or: {
    welcome: "ନମସ୍କାର, ଚାଷୀ ବନ୍ଧୁ! 🌾",
    subtitle:
      "ଆଜି ଆପଣଙ୍କ ଚାଷରେ ଆମେ କିପରି ସାହାଯ୍ୟ କରିପାରିବା?",
    ai: "AI କୃଷି ମିତ୍ର",
    aiDesc:
      "ଚାଷ ସମ୍ପର୍କିତ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ ଏବଂ ନିଜ ଭାଷାରେ ଉତ୍ତର ପାଆନ୍ତୁ।",
    addCrop: "ଫସଲ ଯୋଡନ୍ତୁ",
    addCropDesc:
      "ଆପଣଙ୍କ ଫସଲ ଯୋଡନ୍ତୁ ଏବଂ ଫସଲ ସମ୍ପର୍କିତ ସମସ୍ତ ସୂଚନା ଗୋଟିଏ ସ୍ଥାନରେ ପାଆନ୍ତୁ।",
    talkAi: "AI ସହିତ କଥା ହୁଅନ୍ତୁ →",
  },

  as: {
    welcome: "নমস্কাৰ, কৃষক বন্ধু! 🌾",
    subtitle:
      "আজি আপোনাৰ কৃষিকাৰ্যত আমি কেনেকৈ সহায় কৰিব পাৰোঁ?",
    ai: "AI কৃষি মিত্ৰ",
    aiDesc:
      "কৃষিৰ বিষয়ে প্ৰশ্ন কৰক আৰু নিজৰ ভাষাত উত্তৰ লাভ কৰক।",
    addCrop: "শস্য যোগ কৰক",
    addCropDesc:
      "আপোনাৰ শস্য যোগ কৰক আৰু শস্য সম্পৰ্কীয় সকলো তথ্য একে ঠাইতে লাভ কৰক।",
    talkAi: "AI ৰ সৈতে কথা পাতক →",
  },

  ur: {
    welcome: "السلام علیکم، کسان دوست! 🌾",
    subtitle: "آج ہم آپ کی زراعت میں کیسے مدد کر سکتے ہیں؟",
    ai: "AI کرشی متر",
    aiDesc:
      "زراعت سے متعلق سوال پوچھیں اور اپنی زبان میں جواب حاصل کریں۔",
    addCrop: "فصل شامل کریں",
    addCropDesc:
      "اپنی فصلیں شامل کریں اور فصل سے متعلق تمام معلومات ایک جگہ حاصل کریں۔",
    talkAi: "AI سے بات کریں →",
  },
};

export default function DashboardPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");

  // SIDEBAR STATE
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && dashboardText[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = dashboardText[language] || dashboardText.en;

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <main
      className="min-h-screen bg-green-50"
      dir={language === "ur" ? "rtl" : "ltr"}
    >

      {/* ================= SIDEBAR ================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">

          <div className="flex items-center gap-3">
            <div className="text-3xl">
              🌾
            </div>

            <div>
              <h2 className="text-xl font-bold text-green-800">
                KrishiMitra
              </h2>

              <p className="text-xs text-gray-500">
                {languages[language] || "English"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-xl text-gray-600"
            aria-label="Close menu"
          >
            ✕
          </button>

        </div>

        {/* Sidebar Menu */}
        <nav className="p-4">

          {/* Profile */}
          <button
            type="button"
            onClick={() => {
              setSidebarOpen(false);
              router.push("/profile");
            }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-50 text-gray-700 transition"
          >
            <span className="text-2xl">👤</span>
            <span className="font-semibold">Profile</span>
          </button>

          {/* User Selection */}
          <button
            type="button"
            onClick={() => {
              setSidebarOpen(false);
              router.push("/role");
            }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-50 text-gray-700 transition"
          >
            <span className="text-2xl">👥</span>
            <span className="font-semibold">User Selection</span>
          </button>

          {/* My Crops */}
          <button
            type="button"
            onClick={() => {
              setSidebarOpen(false);
              router.push("/crops");
            }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-50 text-gray-700 transition"
          >
            <span className="text-2xl">🌱</span>
            <span className="font-semibold">My Crops</span>
          </button>

          {/* Change Password */}
          <button
            type="button"
            onClick={() => {
              setSidebarOpen(false);
              router.push("/change-password");
            }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-50 text-gray-700 transition"
          >
            <span className="text-2xl">🔐</span>
            <span className="font-semibold">Change Password</span>
          </button>

          {/* More Settings */}
          <button
            type="button"
            onClick={() => {
              setSidebarOpen(false);
              router.push("/settings");
            }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-50 text-gray-700 transition"
          >
            <span className="text-2xl">⚙️</span>
            <span className="font-semibold">More Settings</span>
          </button>

          {/* Divider */}
          <div className="border-t border-gray-100 my-4" />

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition"
          >
            <span className="text-2xl">🚪</span>
            <span className="font-semibold">Logout</span>
          </button>

        </nav>
      </aside>

      {/* ================= HEADER ================= */}

      <header className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

          {/* Left Side + Logo */}
          <div className="flex items-center gap-3">

            {/* HAMBURGER MENU */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center text-2xl transition"
              aria-label="Open menu"
            >
              ☰
            </button>

            {/* Logo */}
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

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Profile */}
            <button
              onClick={() => router.push("/profile")}
              className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
              aria-label="Profile"
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

      {/* ================= MAIN ================= */}

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