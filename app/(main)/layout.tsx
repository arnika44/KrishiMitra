
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const sidebarText: Record<
  string,
  {
    profile: string;
    userSelection: string;
    myCrop: string;
    addCrop: string;
    moreSettings: string;
    changePassword: string;
    logout: string;
  }
> = {
  hi: {
    profile: "प्रोफाइल",
    userSelection: "यूज़र बदलें",
    myCrop: "मेरी फसल",
    addCrop: "फसल जोड़ें",
    moreSettings: "और सेटिंग्स",
    changePassword: "पासवर्ड बदलें",
    logout: "लॉगआउट",
  },

  en: {
    profile: "Profile",
    userSelection: "Change User",
    myCrop: "My Crop",
    addCrop: "Add Crop",
    moreSettings: "More Settings",
    changePassword: "Change Password",
    logout: "Logout",
  },

  bn: {
    profile: "প্রোফাইল",
    userSelection: "ইউজার পরিবর্তন",
    myCrop: "আমার ফসল",
    addCrop: "ফসল যোগ করুন",
    moreSettings: "আরও সেটিংস",
    changePassword: "পাসওয়ার্ড পরিবর্তন",
    logout: "লগআউট",
  },

  mr: {
    profile: "प्रोफाइल",
    userSelection: "वापरकर्ता बदला",
    myCrop: "माझे पीक",
    addCrop: "पीक जोडा",
    moreSettings: "अधिक सेटिंग्ज",
    changePassword: "पासवर्ड बदला",
    logout: "लॉगआउट",
  },

  ta: {
    profile: "சுயவிவரம்",
    userSelection: "பயனரை மாற்று",
    myCrop: "என் பயிர்",
    addCrop: "பயிரைச் சேர்க்கவும்",
    moreSettings: "மேலும் அமைப்புகள்",
    changePassword: "கடவுச்சொல்லை மாற்று",
    logout: "வெளியேறு",
  },

  te: {
    profile: "ప్రొఫైల్",
    userSelection: "వినియోగదారుని మార్చండి",
    myCrop: "నా పంట",
    addCrop: "పంటను జోడించండి",
    moreSettings: "మరిన్ని సెట్టింగ్‌లు",
    changePassword: "పాస్‌వర్డ్ మార్చండి",
    logout: "లాగౌట్",
  },

  gu: {
    profile: "પ્રોફાઇલ",
    userSelection: "યુઝર બદલો",
    myCrop: "મારો પાક",
    addCrop: "પાક ઉમેરો",
    moreSettings: "વધુ સેટિંગ્સ",
    changePassword: "પાસવર્ડ બદલો",
    logout: "લોગઆઉટ",
  },

  kn: {
    profile: "ಪ್ರೊಫೈಲ್",
    userSelection: "ಬಳಕೆದಾರರನ್ನು ಬದಲಾಯಿಸಿ",
    myCrop: "ನನ್ನ ಬೆಳೆ",
    addCrop: "ಬೆಳೆ ಸೇರಿಸಿ",
    moreSettings: "ಹೆಚ್ಚಿನ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    changePassword: "ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ",
    logout: "ಲಾಗ್‌ಔಟ್",
  },

  ml: {
    profile: "പ്രൊഫൈൽ",
    userSelection: "യൂസറെ മാറ്റുക",
    myCrop: "എന്റെ വിള",
    addCrop: "വിള ചേർക്കുക",
    moreSettings: "കൂടുതൽ സെറ്റിംഗുകൾ",
    changePassword: "പാസ്‌വേഡ് മാറ്റുക",
    logout: "ലോഗൗട്ട്",
  },

  pa: {
    profile: "ਪ੍ਰੋਫਾਈਲ",
    userSelection: "ਯੂਜ਼ਰ ਬਦਲੋ",
    myCrop: "ਮੇਰੀ ਫਸਲ",
    addCrop: "ਫਸਲ ਸ਼ਾਮਲ ਕਰੋ",
    moreSettings: "ਹੋਰ ਸੈਟਿੰਗਾਂ",
    changePassword: "ਪਾਸਵਰਡ ਬਦਲੋ",
    logout: "ਲੌਗਆਉਟ",
  },

  or: {
    profile: "ପ୍ରୋଫାଇଲ୍",
    userSelection: "ୟୁଜର ବଦଳାନ୍ତୁ",
    myCrop: "ମୋ ଫସଲ",
    addCrop: "ଫସଲ ଯୋଡନ୍ତୁ",
    moreSettings: "ଅଧିକ ସେଟିଂସ୍",
    changePassword: "ପାସୱାର୍ଡ ବଦଳାନ୍ତୁ",
    logout: "ଲଗଆଉଟ୍",
  },

  as: {
    profile: "প্ৰফাইল",
    userSelection: "ইউজাৰ সলনি কৰক",
    myCrop: "মোৰ শস্য",
    addCrop: "শস্য যোগ কৰক",
    moreSettings: "অধিক ছেটিংছ",
    changePassword: "পাছৱৰ্ড সলনি কৰক",
    logout: "লগআউট",
  },

  ur: {
    profile: "پروفائل",
    userSelection: "صارف تبدیل کریں",
    myCrop: "میری فصل",
    addCrop: "فصل شامل کریں",
    moreSettings: "مزید ترتیبات",
    changePassword: "پاس ورڈ تبدیل کریں",
    logout: "لاگ آؤٹ",
  },
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
    const updateLanguage = () => {
      const savedLanguage = localStorage.getItem("selectedLanguage");

      if (savedLanguage && sidebarText[savedLanguage]) {
        setLanguage(savedLanguage);
      }
    };

    updateLanguage();

    window.addEventListener("storage", updateLanguage);

    return () => {
      window.removeEventListener("storage", updateLanguage);
    };
  }, []);

  const t = sidebarText[language] || sidebarText.en;

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/auth");
  };

  return (
    <div
      className="min-h-screen bg-green-50"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      {/* Sidebar Button */}
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

      {/* Dark Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/30 cursor-default"
          aria-label="Close Menu"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-5 py-5 border-b border-green-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌾</div>

            <div>
              <h2 className="text-xl font-bold text-green-800">
                KrishiMitra
              </h2>

              <p className="text-xs text-gray-500">
                {language === "ur"
                  ? "آپ کا ڈیجیٹل ساتھی"
                  : language === "hi"
                  ? "आपका डिजिटल साथी"
                  : "Your digital companion"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-600 text-2xl"
            aria-label="Close Menu"
          >
            ×
          </button>
        </div>

        {/* Menu */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-90px)]">
          {/* Profile */}
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

          {/* User Selection */}
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

          {/* My Crop */}
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

          {/* Add Crop */}
          <button
            type="button"
            onClick={() => {
              closeSidebar();
              router.push("/crops");
            }}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-green-50 text-left transition"
          >
            <span className="text-2xl">➕</span>

            <span className="font-semibold text-gray-800">
              {t.addCrop}
            </span>
          </button>

          <div className="my-3 border-t border-gray-100" />

          {/* More Settings */}
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

            <span
              className={`text-gray-500 transition-transform ${
                settingsOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* Settings Submenu */}
          {settingsOpen && (
            <div className="ml-6 mt-1 border-l-2 border-green-100 pl-2">
              {/* Change Password */}
              <button
                type="button"
                onClick={() => {
                  closeSidebar();
                  router.push("/profile");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-left transition"
              >
                <span>🔑</span>

                <span className="text-sm font-medium text-gray-700">
                  {t.changePassword}
                </span>
              </button>
            </div>
          )}

          <div className="my-3 border-t border-gray-100" />

          {/* Logout */}
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
      </aside>

      {/* Page Content */}
      {children}
    </div>
  );
}