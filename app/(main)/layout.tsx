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
    companion: string;
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
    companion: "आपका डिजिटल साथी",
  },

  en: {
    profile: "Profile",
    userSelection: "Change User",
    myCrop: "My Crop",
    moreSettings: "More Settings",
    language: "Language",
    changePassword: "Change Password",
    logout: "Logout",
    companion: "Your digital companion",
  },
};

const languageNames: Record<string, string> = {
  hi: "हिंदी",
  en: "English",
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

  // ===============================
  // LOAD SAVED LANGUAGE
  // ===============================

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && sidebarText[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = sidebarText[language] || sidebarText.en;

  // ===============================
  // LANGUAGE CHANGE
  // ===============================

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = e.target.value;

    setLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);

    // Language ko poore app me refresh ke baad apply karne ke liye
    window.location.reload();
  };

  // ===============================
  // CLOSE SIDEBAR
  // ===============================

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/auth");
  };

  return (
    <div
      className="min-h-screen bg-green-50"
      dir="ltr"
    >
      {/* =====================================================
          MENU BUTTON
      ====================================================== */}

      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 z-50 w-11 h-11 rounded-xl bg-white border border-gray-200 shadow-md flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 transition left-4"
        aria-label="Open Menu"
      >
        <span className="block w-5 h-0.5 bg-gray-700 rounded" />
        <span className="block w-5 h-0.5 bg-gray-700 rounded" />
        <span className="block w-5 h-0.5 bg-gray-700 rounded" />
      </button>

      {/* =====================================================
          OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/30 cursor-default"
          aria-label="Close Menu"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        dir="ltr"
        className={`fixed top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 left-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* =================================================
            SIDEBAR HEADER
        ================================================== */}

        <div className="px-5 py-5 border-b border-green-100 flex items-center justify-between">
          {/* KrishiMitra Logo + Name */}

          <div className="flex items-center gap-3">
            <div className="text-3xl">🌾</div>

            <div>
              <h2 className="text-xl font-bold text-green-800">
                KrishiMitra
              </h2>

              <p className="text-xs text-gray-500">
                {t.companion}
              </p>
            </div>
          </div>

          {/* Close */}

          <button
            type="button"
            onClick={closeSidebar}
            className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-600 text-2xl flex items-center justify-center"
            aria-label="Close Menu"
          >
            ×
          </button>
        </div>

        {/* =================================================
            SIDEBAR MENU
        ================================================== */}

        <div className="p-4 overflow-y-auto h-[calc(100vh-90px)]">
          {/* =================================================
              PROFILE
          ================================================== */}

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

          {/* =================================================
              CHANGE USER
          ================================================== */}

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

          {/* =================================================
              MY CROP
          ================================================== */}

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

          {/* =================================================
              MORE SETTINGS
          ================================================== */}

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

              <span className="text-gray-500 text-sm">
                {settingsOpen ? "▲" : "▼"}
              </span>
            </button>

            {/* =================================================
                SETTINGS SUB MENU
            ================================================== */}

            {settingsOpen && (
              <div className="mt-1 border-green-100 ml-8 pl-4 border-l-2">
                {/* =================================================
                    LANGUAGE
                ================================================== */}

                <div className="py-3">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    🌐 {t.language}
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

                {/* =================================================
                    CHANGE PASSWORD
                ================================================== */}

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

          {/* =================================================
              LOGOUT
          ================================================== */}

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

      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}

      {children}
    </div>
  );
}