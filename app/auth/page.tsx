"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const translations: Record<string, any> = {
  hi: {
    tagline: "किसानों के लिए आपका डिजिटल साथी",
    login: "लॉगिन",
    register: "रजिस्टर",
    loginTitle: "अपने अकाउंट में लॉगिन करें",
    registerTitle: "अपना अकाउंट बनाएँ",
    loginSubtitle: "अपनी जानकारी दर्ज करें",
    registerSubtitle: "कुछ आसान जानकारी भरें",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम लिखें",
    mobile: "मोबाइल नंबर",
    password: "पासवर्ड",
    passwordPlaceholder: "अपना पासवर्ड डालें",
    loginButton: "लॉगिन करें",
    registerButton: "अकाउंट बनाएँ",
    invalidMobile: "कृपया सही 10 अंकों का मोबाइल नंबर डालें।",
    requiredName: "कृपया अपना नाम डालें।",
  },

  en: {
    tagline: "Your digital companion for agriculture",
    login: "Login",
    register: "Register",
    loginTitle: "Login to your account",
    registerTitle: "Create your account",
    loginSubtitle: "Enter your details to continue",
    registerSubtitle: "Fill in a few details to get started",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    mobile: "Mobile Number",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    loginButton: "Login",
    registerButton: "Create Account",
    invalidMobile: "Please enter a valid 10-digit mobile number.",
    requiredName: "Please enter your full name.",
  },

  bn: {
    tagline: "কৃষকদের জন্য আপনার ডিজিটাল সঙ্গী",
    login: "লগইন",
    register: "রেজিস্টার",
    loginTitle: "আপনার অ্যাকাউন্টে লগইন করুন",
    registerTitle: "আপনার অ্যাকাউন্ট তৈরি করুন",
    loginSubtitle: "চালিয়ে যেতে আপনার তথ্য দিন",
    registerSubtitle: "শুরু করতে কিছু তথ্য দিন",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "আপনার পুরো নাম লিখুন",
    mobile: "মোবাইল নম্বর",
    password: "পাসওয়ার্ড",
    passwordPlaceholder: "আপনার পাসওয়ার্ড লিখুন",
    loginButton: "লগইন করুন",
    registerButton: "অ্যাকাউন্ট তৈরি করুন",
    invalidMobile: "সঠিক ১০ সংখ্যার মোবাইল নম্বর দিন।",
    requiredName: "আপনার পুরো নাম দিন।",
  },

  mr: {
    tagline: "शेतकऱ्यांसाठी तुमचा डिजिटल साथीदार",
    login: "लॉगिन",
    register: "नोंदणी",
    loginTitle: "तुमच्या खात्यात लॉगिन करा",
    registerTitle: "तुमचे खाते तयार करा",
    loginSubtitle: "पुढे जाण्यासाठी तुमची माहिती भरा",
    registerSubtitle: "सुरुवात करण्यासाठी काही माहिती भरा",
    fullName: "पूर्ण नाव",
    fullNamePlaceholder: "तुमचे पूर्ण नाव लिहा",
    mobile: "मोबाइल नंबर",
    password: "पासवर्ड",
    passwordPlaceholder: "तुमचा पासवर्ड लिहा",
    loginButton: "लॉगिन करा",
    registerButton: "खाते तयार करा",
    invalidMobile: "कृपया योग्य 10 अंकी मोबाइल नंबर टाका.",
    requiredName: "कृपया तुमचे पूर्ण नाव टाका.",
  },

  ta: {
    tagline: "விவசாயிகளுக்கான உங்கள் டிஜிட்டல் துணை",
    login: "உள்நுழை",
    register: "பதிவு செய்க",
    loginTitle: "உங்கள் கணக்கில் உள்நுழைக",
    registerTitle: "உங்கள் கணக்கை உருவாக்குங்கள்",
    loginSubtitle: "தொடர உங்கள் தகவல்களை உள்ளிடுங்கள்",
    registerSubtitle: "தொடங்க சில தகவல்களை உள்ளிடுங்கள்",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடுங்கள்",
    mobile: "மொபைல் எண்",
    password: "கடவுச்சொல்",
    passwordPlaceholder: "உங்கள் கடவுச்சொல்லை உள்ளிடுங்கள்",
    loginButton: "உள்நுழைக",
    registerButton: "கணக்கை உருவாக்கு",
    invalidMobile: "சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.",
    requiredName: "உங்கள் முழு பெயரை உள்ளிடவும்.",
  },

  te: {
    tagline: "రైతుల కోసం మీ డిజిటల్ సహచరుడు",
    login: "లాగిన్",
    register: "నమోదు",
    loginTitle: "మీ ఖాతాలోకి లాగిన్ అవ్వండి",
    registerTitle: "మీ ఖాతాను సృష్టించండి",
    loginSubtitle: "కొనసాగడానికి మీ వివరాలను నమోదు చేయండి",
    registerSubtitle: "ప్రారంభించడానికి కొన్ని వివరాలను నమోదు చేయండి",
    fullName: "పూర్తి పేరు",
    fullNamePlaceholder: "మీ పూర్తి పేరును నమోదు చేయండి",
    mobile: "మొబైల్ నంబర్",
    password: "పాస్‌వర్డ్",
    passwordPlaceholder: "మీ పాస్‌వర్డ్‌ను నమోదు చేయండి",
    loginButton: "లాగిన్ చేయండి",
    registerButton: "ఖాతాను సృష్టించండి",
    invalidMobile: "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.",
    requiredName: "దయచేసి మీ పూర్తి పేరు నమోదు చేయండి.",
  },

  gu: {
    tagline: "ખેડૂતો માટે તમારો ડિજિટલ સાથી",
    login: "લોગિન",
    register: "રજીસ્ટર",
    loginTitle: "તમારા એકાઉન્ટમાં લોગિન કરો",
    registerTitle: "તમારું એકાઉન્ટ બનાવો",
    loginSubtitle: "આગળ વધવા માટે તમારી માહિતી દાખલ કરો",
    registerSubtitle: "શરૂ કરવા માટે થોડી માહિતી આપો",
    fullName: "પૂરું નામ",
    fullNamePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
    mobile: "મોબાઇલ નંબર",
    password: "પાસવર્ડ",
    passwordPlaceholder: "તમારો પાસવર્ડ દાખલ કરો",
    loginButton: "લોગિન કરો",
    registerButton: "એકાઉન્ટ બનાવો",
    invalidMobile: "કૃપા કરીને સાચો 10 અંકનો મોબાઇલ નંબર દાખલ કરો.",
    requiredName: "કૃપા કરીને તમારું પૂરું નામ દાખલ કરો.",
  },

  kn: {
    tagline: "ರೈತರಿಗಾಗಿ ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಸಂಗಾತಿ",
    login: "ಲಾಗಿನ್",
    register: "ನೋಂದಣಿ",
    loginTitle: "ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
    registerTitle: "ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    loginSubtitle: "ಮುಂದುವರಿಯಲು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ನಮೂದಿಸಿ",
    registerSubtitle: "ಪ್ರಾರಂಭಿಸಲು ಕೆಲವು ಮಾಹಿತಿಯನ್ನು ನೀಡಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    fullNamePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    passwordPlaceholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
    loginButton: "ಲಾಗಿನ್ ಮಾಡಿ",
    registerButton: "ಖಾತೆ ರಚಿಸಿ",
    invalidMobile: "ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    requiredName: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
  },

  ml: {
    tagline: "കർഷകർക്കായുള്ള നിങ്ങളുടെ ഡിജിറ്റൽ സഹായി",
    login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ",
    loginTitle: "നിങ്ങളുടെ അക്കൗണ്ടിലേക്ക് ലോഗിൻ ചെയ്യുക",
    registerTitle: "നിങ്ങളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    loginSubtitle: "തുടരാൻ നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക",
    registerSubtitle: "ആരംഭിക്കാൻ കുറച്ച് വിവരങ്ങൾ നൽകുക",
    fullName: "പൂർണ്ണ പേര്",
    fullNamePlaceholder: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക",
    mobile: "മൊബൈൽ നമ്പർ",
    password: "പാസ്‌വേഡ്",
    passwordPlaceholder: "നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക",
    loginButton: "ലോഗിൻ ചെയ്യുക",
    registerButton: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    invalidMobile: "ശരിയായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.",
    requiredName: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക.",
  },

  pa: {
    tagline: "ਕਿਸਾਨਾਂ ਲਈ ਤੁਹਾਡਾ ਡਿਜੀਟਲ ਸਾਥੀ",
    login: "ਲੌਗਇਨ",
    register: "ਰਜਿਸਟਰ",
    loginTitle: "ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਲੌਗਇਨ ਕਰੋ",
    registerTitle: "ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ",
    loginSubtitle: "ਜਾਰੀ ਰੱਖਣ ਲਈ ਆਪਣੀ ਜਾਣਕਾਰੀ ਭਰੋ",
    registerSubtitle: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਕੁਝ ਜਾਣਕਾਰੀ ਭਰੋ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    fullNamePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਲਿਖੋ",
    mobile: "ਮੋਬਾਈਲ ਨੰਬਰ",
    password: "ਪਾਸਵਰਡ",
    passwordPlaceholder: "ਆਪਣਾ ਪਾਸਵਰਡ ਲਿਖੋ",
    loginButton: "ਲੌਗਇਨ ਕਰੋ",
    registerButton: "ਖਾਤਾ ਬਣਾਓ",
    invalidMobile: "ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ 10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਿਓ।",
    requiredName: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਿਓ।",
  },

  or: {
    tagline: "ଚାଷୀମାନଙ୍କ ପାଇଁ ଆପଣଙ୍କର ଡିଜିଟାଲ ସାଥୀ",
    login: "ଲଗଇନ",
    register: "ପଞ୍ଜୀକରଣ",
    loginTitle: "ଆପଣଙ୍କ ଆକାଉଣ୍ଟରେ ଲଗଇନ କରନ୍ତୁ",
    registerTitle: "ଆପଣଙ୍କ ଆକାଉଣ୍ଟ ତିଆରି କରନ୍ତୁ",
    loginSubtitle: "ଆଗକୁ ବଢ଼ିବା ପାଇଁ ତଥ୍ୟ ଦିଅନ୍ତୁ",
    registerSubtitle: "ଆରମ୍ଭ କରିବା ପାଇଁ କିଛି ତଥ୍ୟ ଦିଅନ୍ତୁ",
    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    fullNamePlaceholder: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଲେଖନ୍ତୁ",
    mobile: "ମୋବାଇଲ ନମ୍ବର",
    password: "ପାସୱାର୍ଡ",
    passwordPlaceholder: "ଆପଣଙ୍କ ପାସୱାର୍ଡ ଲେଖନ୍ତୁ",
    loginButton: "ଲଗଇନ କରନ୍ତୁ",
    registerButton: "ଆକାଉଣ୍ଟ ତିଆରି କରନ୍ତୁ",
    invalidMobile: "ଦୟାକରି ସଠିକ୍ 10 ଅଙ୍କର ମୋବାଇଲ ନମ୍ବର ଦିଅନ୍ତୁ।",
    requiredName: "ଦୟାକରି ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଦିଅନ୍ତୁ।",
  },

  as: {
    tagline: "কৃষকৰ বাবে আপোনাৰ ডিজিটেল সংগী",
    login: "লগইন",
    register: "পঞ্জীয়ন",
    loginTitle: "আপোনাৰ একাউণ্টত লগইন কৰক",
    registerTitle: "আপোনাৰ একাউণ্ট সৃষ্টি কৰক",
    loginSubtitle: "আগবাঢ়িবলৈ আপোনাৰ তথ্য দিয়ক",
    registerSubtitle: "আৰম্ভ কৰিবলৈ কিছু তথ্য দিয়ক",
    fullName: "সম্পূৰ্ণ নাম",
    fullNamePlaceholder: "আপোনাৰ সম্পূৰ্ণ নাম লিখক",
    mobile: "মোবাইল নম্বৰ",
    password: "পাছৱৰ্ড",
    passwordPlaceholder: "আপোনাৰ পাছৱৰ্ড লিখক",
    loginButton: "লগইন কৰক",
    registerButton: "একাউণ্ট সৃষ্টি কৰক",
    invalidMobile: "অনুগ্ৰহ কৰি সঠিক 10 অংকৰ মোবাইল নম্বৰ দিয়ক।",
    requiredName: "অনুগ্ৰহ কৰি আপোনাৰ সম্পূৰ্ণ নাম দিয়ক।",
  },

  ur: {
    tagline: "کسانوں کے لیے آپ کا ڈیجیٹل ساتھی",
    login: "لاگ اِن",
    register: "رجسٹر",
    loginTitle: "اپنے اکاؤنٹ میں لاگ اِن کریں",
    registerTitle: "اپنا اکاؤنٹ بنائیں",
    loginSubtitle: "جاری رکھنے کے لیے اپنی معلومات درج کریں",
    registerSubtitle: "شروع کرنے کے لیے کچھ معلومات درج کریں",
    fullName: "پورا نام",
    fullNamePlaceholder: "اپنا پورا نام درج کریں",
    mobile: "موبائل نمبر",
    password: "پاس ورڈ",
    passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
    loginButton: "لاگ اِن کریں",
    registerButton: "اکاؤنٹ بنائیں",
    invalidMobile: "براہ کرم درست 10 ہندسوں کا موبائل نمبر درج کریں۔",
    requiredName: "براہ کرم اپنا پورا نام درج کریں۔",
  },
};

export default function AuthPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");
  const [mode, setMode] = useState<"login" | "register">("login");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language] || translations.en;

  const handleSubmit = () => {
    // Validate mobile
    if (!/^\d{10}$/.test(phone)) {
      alert(t.invalidMobile);
      return;
    }

    // REGISTER FLOW
    if (mode === "register") {
      if (!name.trim()) {
        alert(t.requiredName);
        return;
      }

      /*
       * Save basic account information.
       * Profile will be completed after registration.
       */
      const account = {
        name: name.trim(),
        phone,
        password,
        registered: true,
      };

      localStorage.setItem(
        "farmerAccount",
        JSON.stringify(account)
      );

      // Mark that this is a newly registered user
      localStorage.setItem("isNewUser", "true");

      /*
       * IMPORTANT:
       * New user must complete profile first.
       */
      router.push("/role");

      return;
    }

    // LOGIN FLOW
    const savedProfile = localStorage.getItem("farmerProfile");

    /*
     * If profile already exists:
     * Login -> Dashboard
     */
    if (savedProfile) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
      return;
    }

    /*
     * If account exists but profile is not completed:
     * Login -> Profile setup
     */
    const savedAccount = localStorage.getItem("farmerAccount");

    if (savedAccount) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/role");
      return;
    }

    /*
     * No account/profile found.
     * Send user to registration.
     */
    alert("Please register first.");

    setMode("register");
  };

  return (
    <main
      className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-8"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">
            🌾
          </div>

          <h1 className="text-4xl font-bold text-green-800">
            KrishiMitra
          </h1>

          <p className="text-gray-600 mt-2">
            {t.tagline}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">

          {/* Login / Register Tabs */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">

            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                mode === "login"
                  ? "bg-white text-green-700 shadow"
                  : "text-gray-500"
              }`}
            >
              {t.login}
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                mode === "register"
                  ? "bg-white text-green-700 shadow"
                  : "text-gray-500"
              }`}
            >
              {t.register}
            </button>

          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "login"
              ? t.loginTitle
              : t.registerTitle}
          </h2>

          <p className="text-gray-500 mt-2 mb-7">
            {mode === "login"
              ? t.loginSubtitle
              : t.registerSubtitle}
          </p>

          {/* Name - Register Only */}
          {mode === "register" && (
            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.fullName}
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.fullNamePlaceholder}
                autoComplete="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

            </div>
          )}

          {/* Mobile */}
          <div className="mb-5">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.mobile}
            </label>

            <div className="flex">

              <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-l-xl text-gray-700">
                +91
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  setPhone(value);
                }}
                placeholder="9876543210"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
                className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

            </div>

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.password}
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              autoComplete={
                mode === "login"
                  ? "current-password"
                  : "new-password"
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
            />

          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
          >
            {mode === "login"
              ? t.loginButton
              : t.registerButton}
          </button>

        </div>
      </div>
    </main>
  );
}