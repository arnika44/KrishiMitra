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