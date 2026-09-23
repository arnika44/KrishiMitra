"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../lib/LanguageProvider";
import type { LanguageCode } from "../lib/language";

type AuthTranslation = {
  tagline: string;
  login: string;
  register: string;
  loginTitle: string;
  registerTitle: string;
  loginSubtitle: string;
  registerSubtitle: string;
  fullName: string;
  fullNamePlaceholder: string;
  mobile: string;
  password: string;
  passwordPlaceholder: string;
  loginButton: string;
  registerButton: string;
  invalidMobile: string;
  requiredName: string;
  registerFirst: string;
};

const authTranslations: Record<LanguageCode, AuthTranslation> = {
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
    registerFirst: "Please register first.",
  },

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
    registerFirst: "कृपया पहले रजिस्टर करें।",
  },

  bn: {
    tagline: "কৃষকদের জন্য আপনার ডিজিটাল সহায়ক",
    login: "লগইন",
    register: "রেজিস্টার",
    loginTitle: "আপনার অ্যাকাউন্টে লগইন করুন",
    registerTitle: "আপনার অ্যাকাউন্ট তৈরি করুন",
    loginSubtitle: "চালিয়ে যেতে আপনার তথ্য দিন",
    registerSubtitle: "শুরু করতে কয়েকটি তথ্য পূরণ করুন",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "আপনার পুরো নাম লিখুন",
    mobile: "মোবাইল নম্বর",
    password: "পাসওয়ার্ড",
    passwordPlaceholder: "আপনার পাসওয়ার্ড দিন",
    loginButton: "লগইন করুন",
    registerButton: "অ্যাকাউন্ট তৈরি করুন",
    invalidMobile: "দয়া করে সঠিক ১০ সংখ্যার মোবাইল নম্বর দিন।",
    requiredName: "দয়া করে আপনার নাম দিন।",
    registerFirst: "দয়া করে প্রথমে রেজিস্টার করুন।",
  },

  mr: {
    tagline: "शेतकऱ्यांसाठी तुमचा डिजिटल साथीदार",
    login: "लॉगिन",
    register: "नोंदणी",
    loginTitle: "तुमच्या अकाउंटमध्ये लॉगिन करा",
    registerTitle: "तुमचे अकाउंट तयार करा",
    loginSubtitle: "पुढे जाण्यासाठी तुमची माहिती भरा",
    registerSubtitle: "सुरुवात करण्यासाठी काही माहिती भरा",
    fullName: "पूर्ण नाव",
    fullNamePlaceholder: "तुमचे पूर्ण नाव लिहा",
    mobile: "मोबाइल नंबर",
    password: "पासवर्ड",
    passwordPlaceholder: "तुमचा पासवर्ड टाका",
    loginButton: "लॉगिन करा",
    registerButton: "अकाउंट तयार करा",
    invalidMobile: "कृपया योग्य १० अंकी मोबाइल नंबर टाका.",
    requiredName: "कृपया तुमचे नाव टाका.",
    registerFirst: "कृपया प्रथम नोंदणी करा.",
  },

  ta: {
    tagline: "விவசாயிகளுக்கான உங்கள் டிஜிட்டல் துணை",
    login: "உள்நுழைவு",
    register: "பதிவு",
    loginTitle: "உங்கள் கணக்கில் உள்நுழைக",
    registerTitle: "உங்கள் கணக்கை உருவாக்கவும்",
    loginSubtitle: "தொடர உங்கள் தகவல்களை உள்ளிடவும்",
    registerSubtitle: "தொடங்க சில தகவல்களை நிரப்பவும்",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
    mobile: "மொபைல் எண்",
    password: "கடவுச்சொல்",
    passwordPlaceholder: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
    loginButton: "உள்நுழைக",
    registerButton: "கணக்கை உருவாக்கவும்",
    invalidMobile: "சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.",
    requiredName: "உங்கள் பெயரை உள்ளிடவும்.",
    registerFirst: "முதலில் பதிவு செய்யவும்.",
  },

  te: {
    tagline: "రైతుల కోసం మీ డిజిటల్ సహాయకుడు",
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
    loginButton: "లాగిన్ అవ్వండి",
    registerButton: "ఖాతాను సృష్టించండి",
    invalidMobile: "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి.",
    requiredName: "దయచేసి మీ పేరును నమోదు చేయండి.",
    registerFirst: "దయచేసి ముందుగా నమోదు చేసుకోండి.",
  },

  gu: {
    tagline: "ખેડૂતો માટે તમારો ડિજિટલ સાથી",
    login: "લૉગિન",
    register: "નોંધણી",
    loginTitle: "તમારા અકાઉન્ટમાં લૉગિન કરો",
    registerTitle: "તમારું અકાઉન્ટ બનાવો",
    loginSubtitle: "આગળ વધવા માટે તમારી માહિતી દાખલ કરો",
    registerSubtitle: "શરૂ કરવા માટે થોડી માહિતી ભરો",
    fullName: "પૂરું નામ",
    fullNamePlaceholder: "તમારું પૂરું નામ લખો",
    mobile: "મોબાઇલ નંબર",
    password: "પાસવર્ડ",
    passwordPlaceholder: "તમારો પાસવર્ડ દાખલ કરો",
    loginButton: "લૉગિન કરો",
    registerButton: "અકાઉન્ટ બનાવો",
    invalidMobile: "કૃપા કરીને સાચો 10 અંકનો મોબાઇલ નંબર દાખલ કરો.",
    requiredName: "કૃપા કરીને તમારું નામ દાખલ કરો.",
    registerFirst: "કૃપા કરીને પહેલા નોંધણી કરો.",
  },

  kn: {
    tagline: "ರೈತರಿಗಾಗಿ ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಸಹಾಯಕ",
    login: "ಲಾಗಿನ್",
    register: "ನೋಂದಣಿ",
    loginTitle: "ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
    registerTitle: "ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    loginSubtitle: "ಮುಂದುವರಿಯಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
    registerSubtitle: "ಪ್ರಾರಂಭಿಸಲು ಕೆಲವು ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    fullNamePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    passwordPlaceholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
    loginButton: "ಲಾಗಿನ್ ಮಾಡಿ",
    registerButton: "ಖಾತೆ ರಚಿಸಿ",
    invalidMobile: "ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    requiredName: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    registerFirst: "ದಯವಿಟ್ಟು ಮೊದಲು ನೋಂದಣಿ ಮಾಡಿ.",
  },

  ml: {
    tagline: "കർഷകർക്കായുള്ള നിങ്ങളുടെ ഡിജിറ്റൽ സഹായി",
    login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ",
    loginTitle: "നിങ്ങളുടെ അക്കൗണ്ടിൽ ലോഗിൻ ചെയ്യുക",
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
    requiredName: "നിങ്ങളുടെ പേര് നൽകുക.",
    registerFirst: "ദയവായി ആദ്യം രജിസ്റ്റർ ചെയ്യുക.",
  },

  pa: {
    tagline: "ਕਿਸਾਨਾਂ ਲਈ ਤੁਹਾਡਾ ਡਿਜ਼ੀਟਲ ਸਾਥੀ",
    login: "ਲੌਗਇਨ",
    register: "ਰਜਿਸਟਰ",
    loginTitle: "ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਲੌਗਇਨ ਕਰੋ",
    registerTitle: "ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ",
    loginSubtitle: "ਜਾਰੀ ਰੱਖਣ ਲਈ ਆਪਣੀ ਜਾਣਕਾਰੀ ਦਿਓ",
    registerSubtitle: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਕੁਝ ਜਾਣਕਾਰੀ ਭਰੋ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    fullNamePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਲਿਖੋ",
    mobile: "ਮੋਬਾਈਲ ਨੰਬਰ",
    password: "ਪਾਸਵਰਡ",
    passwordPlaceholder: "ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
    loginButton: "ਲੌਗਇਨ ਕਰੋ",
    registerButton: "ਖਾਤਾ ਬਣਾਓ",
    invalidMobile: "ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ 10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਿਓ।",
    requiredName: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ ਦਿਓ।",
    registerFirst: "ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਰਜਿਸਟਰ ਕਰੋ।",
  },

  or: {
    tagline: "ଚାଷୀମାନଙ୍କ ପାଇଁ ଆପଣଙ୍କ ଡିଜିଟାଲ୍ ସାଥୀ",
    login: "ଲଗଇନ୍",
    register: "ପଞ୍ଜୀକରଣ",
    loginTitle: "ଆପଣଙ୍କ ଆକାଉଣ୍ଟରେ ଲଗଇନ୍ କରନ୍ତୁ",
    registerTitle: "ଆପଣଙ୍କ ଆକାଉଣ୍ଟ ତିଆରି କରନ୍ତୁ",
    loginSubtitle: "ଆଗକୁ ବଢିବା ପାଇଁ ଆପଣଙ୍କ ସୂଚନା ଦିଅନ୍ତୁ",
    registerSubtitle: "ଆରମ୍ଭ କରିବା ପାଇଁ କିଛି ସୂଚନା ଭରନ୍ତୁ",
    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    fullNamePlaceholder: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଲେଖନ୍ତୁ",
    mobile: "ମୋବାଇଲ୍ ନମ୍ବର",
    password: "ପାସୱାର୍ଡ",
    passwordPlaceholder: "ଆପଣଙ୍କ ପାସୱାର୍ଡ ଦିଅନ୍ତୁ",
    loginButton: "ଲଗଇନ୍ କରନ୍ତୁ",
    registerButton: "ଆକାଉଣ୍ଟ ତିଆରି କରନ୍ତୁ",
    invalidMobile: "ଦୟାକରି ସଠିକ୍ 10 ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ଦିଅନ୍ତୁ।",
    requiredName: "ଦୟାକରି ଆପଣଙ୍କ ନାମ ଦିଅନ୍ତୁ।",
    registerFirst: "ଦୟାକରି ପ୍ରଥମେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ।",
  },

  as: {
    tagline: "কৃষকসকলৰ বাবে আপোনাৰ ডিজিটেল সংগী",
    login: "লগইন",
    register: "পঞ্জীয়ন",
    loginTitle: "আপোনাৰ একাউণ্টত লগইন কৰক",
    registerTitle: "আপোনাৰ একাউণ্ট সৃষ্টি কৰক",
    loginSubtitle: "আগবাঢ়িবলৈ আপোনাৰ তথ্য দিয়ক",
    registerSubtitle: "আৰম্ভ কৰিবলৈ কিছু তথ্য পূৰণ কৰক",
    fullName: "সম্পূৰ্ণ নাম",
    fullNamePlaceholder: "আপোনাৰ সম্পূৰ্ণ নাম লিখক",
    mobile: "ম'বাইল নম্বৰ",
    password: "পাছৱৰ্ড",
    passwordPlaceholder: "আপোনাৰ পাছৱৰ্ড দিয়ক",
    loginButton: "লগইন কৰক",
    registerButton: "একাউণ্ট সৃষ্টি কৰক",
    invalidMobile: "অনুগ্ৰহ কৰি সঠিক 10 সংখ্যাৰ ম'বাইল নম্বৰ দিয়ক।",
    requiredName: "অনুগ্ৰহ কৰি আপোনাৰ নাম দিয়ক।",
    registerFirst: "অনুগ্ৰহ কৰি প্ৰথমে পঞ্জীয়ন কৰক।",
  },

  ur: {
    tagline: "کسانوں کے لیے آپ کا ڈیجیٹل ساتھی",
    login: "لاگ اِن",
    register: "رجسٹر",
    loginTitle: "اپنے اکاؤنٹ میں لاگ اِن کریں",
    registerTitle: "اپنا اکاؤنٹ بنائیں",
    loginSubtitle: "جاری رکھنے کے لیے اپنی معلومات درج کریں",
    registerSubtitle: "شروع کرنے کے لیے کچھ معلومات بھریں",
    fullName: "پورا نام",
    fullNamePlaceholder: "اپنا پورا نام لکھیں",
    mobile: "موبائل نمبر",
    password: "پاس ورڈ",
    passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
    loginButton: "لاگ اِن کریں",
    registerButton: "اکاؤنٹ بنائیں",
    invalidMobile: "براہ کرم درست 10 ہندسوں کا موبائل نمبر درج کریں۔",
    requiredName: "براہ کرم اپنا نام درج کریں۔",
    registerFirst: "براہ کرم پہلے رجسٹر کریں۔",
  },
};

export default function AuthPage() {
  const router = useRouter();

  // Global selected language
  const { language } = useLanguage();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const currentLanguage =
    authTranslations[language] || authTranslations.en;

  const handleSubmit = () => {
    // Validate mobile
    if (!/^\d{10}$/.test(phone)) {
      alert(currentLanguage.invalidMobile);
      return;
    }

    // REGISTER FLOW
    if (mode === "register") {
      if (!name.trim()) {
        alert(currentLanguage.requiredName);
        return;
      }

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

      localStorage.setItem("isNewUser", "true");

      // New user completes role/profile flow
      router.push("/role");

      return;
    }

    // LOGIN FLOW
    const savedProfile = localStorage.getItem("farmerProfile");

    // Profile already exists
    if (savedProfile) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
      return;
    }

    // Account exists but profile is incomplete
    const savedAccount = localStorage.getItem("farmerAccount");

    if (savedAccount) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/role");
      return;
    }

    // No account found
    alert(currentLanguage.registerFirst);
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
            {currentLanguage.tagline}
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
              {currentLanguage.login}
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
              {currentLanguage.register}
            </button>

          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "login"
              ? currentLanguage.loginTitle
              : currentLanguage.registerTitle}
          </h2>

          <p className="text-gray-500 mt-2 mb-7">
            {mode === "login"
              ? currentLanguage.loginSubtitle
              : currentLanguage.registerSubtitle}
          </p>

          {/* Name - Register Only */}
          {mode === "register" && (
            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {currentLanguage.fullName}
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={currentLanguage.fullNamePlaceholder}
                autoComplete="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

            </div>
          )}

          {/* Mobile */}
          <div className="mb-5">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {currentLanguage.mobile}
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
              {currentLanguage.password}
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={currentLanguage.passwordPlaceholder}
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
              ? currentLanguage.loginButton
              : currentLanguage.registerButton}
          </button>

        </div>
      </div>
    </main>
  );
}