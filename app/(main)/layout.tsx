"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const sidebarText: Record<
  string,
  {
    profile: string;
    userSelection: string;
    myCrop: string;
    moreSettings: string;
    language: string;
    changePassword: string;
    logout: string;
  }
> = {
  hi: {
    profile: "प्रोफाइल",
    userSelection: "यूज़र बदलें",
    myCrop: "मेरी फसल",
    moreSettings: "और सेटिंग्स",
    language: "भाषा",
    changePassword: "पासवर्ड बदलें",
    logout: "लॉगआउट",
  },

  en: {
    profile: "Profile",
    userSelection: "Change User",
    myCrop: "My Crop",
    moreSettings: "More Settings",
    language: "Language",
    changePassword: "Change Password",
    logout: "Logout",
  },

  bn: {
    profile: "প্রোফাইল",
    userSelection: "ইউজার পরিবর্তন",
    myCrop: "আমার ফসল",
    moreSettings: "আরও সেটিংস",
    language: "ভাষা",
    changePassword: "পাসওয়ার্ড পরিবর্তন",
    logout: "লগআউট",
  },

  mr: {
    profile: "प्रोफाइल",
    userSelection: "वापरकर्ता बदला",
    myCrop: "माझे पीक",
    moreSettings: "अधिक सेटिंग्ज",
    language: "भाषा",
    changePassword: "पासवर्ड बदला",
    logout: "लॉगआउट",
  },

  ta: {
    profile: "சுயவிவரம்",
    userSelection: "பயனரை மாற்று",
    myCrop: "என் பயிர்",
    moreSettings: "மேலும் அமைப்புகள்",
    language: "மொழி",
    changePassword: "கடவுச்சொல்லை மாற்று",
    logout: "வெளியேறு",
  },

  te: {
    profile: "ప్రొఫైల్",
    userSelection: "వినియోగదారుని మార్చండి",
    myCrop: "నా పంట",
    moreSettings: "మరిన్ని సెట్టింగ్‌లు",
    language: "భాష",
    changePassword: "పాస్‌వర్డ్ మార్చండి",
    logout: "లాగౌట్",
  },

  gu: {
    profile: "પ્રોફાઇલ",
    userSelection: "યુઝર બદલો",
    myCrop: "મારો પાક",
    moreSettings: "વધુ સેટિંગ્સ",
    language: "ભાષા",
    changePassword: "પાસવર્ડ બદલો",
    logout: "લોગઆઉટ",
  },

  kn: {
    profile: "ಪ್ರೊಫೈಲ್",
    userSelection: "ಬಳಕೆದಾರರನ್ನು ಬದಲಾಯಿಸಿ",
    myCrop: "ನನ್ನ ಬೆಳೆ",
    moreSettings: "ಹೆಚ್ಚಿನ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    language: "ಭಾಷೆ",
    changePassword: "ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ",
    logout: "ಲಾಗ್‌ಔಟ್",
  },

  ml: {
    profile: "പ്രൊഫൈൽ",
    userSelection: "യൂസറെ മാറ്റുക",
    myCrop: "എന്റെ വിള",
    moreSettings: "കൂടുതൽ സെറ്റിംഗുകൾ",
    language: "ഭാഷ",
    changePassword: "പാസ്‌വേഡ് മാറ്റുക",
    logout: "ലോഗൗട്ട്",
  },

  pa: {
    profile: "ਪ੍ਰੋਫਾਈਲ",
    userSelection: "ਯੂਜ਼ਰ ਬਦਲੋ",
    myCrop: "ਮੇਰੀ ਫਸਲ",
    moreSettings: "ਹੋਰ ਸੈਟਿੰਗਾਂ",
    language: "ਭਾਸ਼ਾ",
    changePassword: "ਪਾਸਵਰਡ ਬਦਲੋ",
    logout: "ਲੌਗਆਊਟ",
  },

  or: {
    profile: "ପ୍ରୋଫାଇଲ୍",
    userSelection: "ୟୁଜର ବଦଳାନ୍ତୁ",
    myCrop: "ମୋ ଫସଲ",
    moreSettings: "ଅଧିକ ସେଟିଂସ୍",
    language: "ଭାଷା",
    changePassword: "ପାସୱାର୍ଡ ବଦଳାନ୍ତୁ",
    logout: "ଲଗଆଉଟ୍",
  },

  as: {
    profile: "প্ৰফাইল",
    userSelection: "ইউজাৰ সলনি কৰক",
    myCrop: "মোৰ শস্য",
    moreSettings: "অধিক ছেটিংছ",
    language: "ভাষা",
    changePassword: "পাছৱৰ্ড সলনি কৰক",
    logout: "লগআউট",
  },

  ur: {
    profile: "پروفائل",
    userSelection: "صارف تبدیل کریں",
    myCrop: "میری فصل",
    moreSettings: "مزید ترتیبات",
    language: "زبان",
    changePassword: "پاس ورڈ تبدیل کریں",
    logout: "لاگ آؤٹ",
  },
};

const languageNames: Record<string, string> = {
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

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [language, setLanguage] = useState("en");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && sidebarText[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = sidebarText[language] || sidebarText.en;

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = e.target.value;

    setLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);

    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/auth");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-green-50"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      {/* MENU BUTTON */}

      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 w-11 h-11 rounded-xl bg-white border border-gray-200 shadow-md flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 transition"
        aria-label="Open Menu"
      >
        <span className="block w-5 h-0.5 bg-gray-700 rounded" />
        <span className="block w-5 h-0.5 bg-gray-700 rounded" />
        <span className="block w-5 h-0.5 bg-gray-700 rounded" />
      </button>

      {/* OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/30 cursor-default"
          aria-label="Close Menu"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 overflow-y-auto h-full">

          {/* PROFILE */}

          <button
            type="button"
            onClick={() => {
              closeSidebar();
              router.push("/profile");
            }}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-green-50 text-left transition"
          >
            <span className="text-2xl">👤</span>

            <span className="font-semibold text-gray-800">
              {t.profile}
            </span>
          </button>

          {/* CHANGE USER */}

          <button
            type="button"
            onClick={() => {
              closeSidebar();
              router.push("/role");
            }}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-green-50 text-left transition"
          >
            <span className="text-2xl">🔄</span>

            <span className="font-semibold text-gray-800">
              {t.userSelection}
            </span>
          </button>

          {/* MY CROP */}

          <button
            type="button"
            onClick={() => {
              closeSidebar();
              router.push("/crops");
            }}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-green-50 text-left transition"
          >
            <span className="text-2xl">🌱</span>

            <span className="font-semibold text-gray-800">
              {t.myCrop}
            </span>
          </button>

          {/* MORE SETTINGS */}

          <div className="mt-2">
            <button
              type="button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-full flex items-center justify-between px-4 py-4 rounded-xl hover:bg-green-50 transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">⚙️</span>

                <span className="font-semibold text-gray-800">
                  {t.moreSettings}
                </span>
              </div>

              <span className="text-gray-500">
                {settingsOpen ? "▲" : "▼"}
              </span>
            </button>

            {/* SUB MENU */}

            {settingsOpen && (
              <div className="ml-8 pl-4 border-l-2 border-green-100">

                {/* LANGUAGE */}

                <div className="py-3">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    {t.language}
                  </label>

                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {Object.entries(languageNames).map(
                      ([code, name]) => (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* CHANGE PASSWORD */}

                <button
                  type="button"
                  onClick={() => {
                    closeSidebar();
                    router.push("/profile");
                  }}
                  className="w-full flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-gray-50 text-left transition"
                >
                  <span>🔑</span>

                  <span className="text-sm font-medium text-gray-700">
                    {t.changePassword}
                  </span>
                </button>

              </div>
            )}
          </div>

          {/* LOGOUT */}

          <div className="mt-3 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-red-50 text-left transition"
            >
              <span className="text-2xl">🚪</span>

              <span className="font-semibold text-red-600">
                {t.logout}
              </span>
            </button>
          </div>

        </div>
      </aside>

      {/* PAGE */}

      {children}
    </div>
  );
}