
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const sidebarText: Record<
  string,
  {
    profile: string;
    changeUser: string;
    myCrop: string;
    moreSettings: string;
    language: string;
    changePassword: string;
    logout: string;
    companion: string;
  }
> = {
  hi: {
    profile: "प्रोफ़ाइल",
    changeUser: "यूज़र बदलें",
    myCrop: "मेरी फसल",
    moreSettings: "अधिक सेटिंग्स",
    language: "भाषा",
    changePassword: "पासवर्ड बदलें",
    logout: "लॉग आउट",
    companion: "आपका डिजिटल साथी",
  },

  en: {
    profile: "Profile",
    changeUser: "Change User",
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

export default function Sidebar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(true);
  const [language, setLanguage] = useState("en");

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

    // Dashboard aur sidebar dono selected language mein update honge
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/auth");
  };

  return (
    <>
      {/* Sidebar Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-5 z-50 w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
        aria-label="Open menu"
      >
        <span className="text-2xl">☰</span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        dir={language === "ur" ? "rtl" : "ltr"}
        className={`fixed top-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ${
          language === "ur"
            ? `right-0 ${
                open ? "translate-x-0" : "translate-x-full"
              }`
            : `left-0 ${
                open ? "translate-x-0" : "-translate-x-full"
              }`
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-7 py-6 border-b border-green-100 flex items-center justify-between">
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

          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-gray-500 hover:text-gray-800"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Menu */}
        <div className="px-5 py-5">

          {/* Profile */}
          <button
            onClick={() => {
              setOpen(false);
              router.push("/profile");
            }}
            className="w-full flex items-center gap-5 px-4 py-4 rounded-xl hover:bg-gray-50 text-left"
          >
            <span className="text-2xl">👤</span>

            <span className="text-lg font-semibold text-gray-800">
              {t.profile}
            </span>
          </button>

          {/* Change User */}
          <button
            onClick={() => {
              setOpen(false);
              router.push("/role");
            }}
            className="w-full flex items-center gap-5 px-4 py-4 rounded-xl hover:bg-gray-50 text-left"
          >
            <span className="text-2xl">🔄</span>

            <span className="text-lg font-semibold text-gray-800">
              {t.changeUser}
            </span>
          </button>

          {/* My Crop */}
          <button
            onClick={() => {
              setOpen(false);
              router.push("/crops");
            }}
            className="w-full flex items-center gap-5 px-4 py-4 rounded-xl hover:bg-gray-50 text-left"
          >
            <span className="text-2xl">🌱</span>

            <span className="text-lg font-semibold text-gray-800">
              {t.myCrop}
            </span>
          </button>

          {/* More Settings */}
          <div className="mt-3 border-t border-gray-100 pt-3">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="w-full flex items-center justify-between px-4 py-4 rounded-xl hover:bg-gray-50"
            >
              <div className="flex items-center gap-5">
                <span className="text-2xl">⚙️</span>

                <span className="text-lg font-semibold text-gray-800">
                  {t.moreSettings}
                </span>
              </div>

              <span className="text-gray-500">
                {moreOpen ? "▲" : "▼"}
              </span>
            </button>

            {moreOpen && (
              <div className="ml-10 pl-4 border-l border-green-200">

                {/* Language */}
                <div className="py-4">
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

                {/* Change Password */}
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push("/profile");
                  }}
                  className="w-full flex items-center gap-3 py-4 text-left text-gray-700 hover:text-green-700"
                >
                  <span>🔑</span>

                  <span>{t.changePassword}</span>
                </button>

              </div>
            )}
          </div>

          {/* Logout */}
          <div className="mt-3 border-t border-gray-100 pt-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-5 px-4 py-4 rounded-xl hover:bg-red-50 text-left"
            >
              <span className="text-2xl">🚪</span>

              <span className="text-lg font-semibold text-red-600">
                {t.logout}
              </span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}