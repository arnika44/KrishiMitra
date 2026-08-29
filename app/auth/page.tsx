"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");
  const [mode, setMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const isHindi = language === "hi";

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-8">

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
            {isHindi
              ? "किसानों के लिए आपका डिजिटल साथी"
              : "Your digital companion for agriculture"}
          </p>

        </div>


        {/* Authentication Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">

          {/* Login / Register Tabs */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">

            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                mode === "login"
                  ? "bg-white text-green-700 shadow"
                  : "text-gray-500"
              }`}
            >
              {isHindi ? "लॉगिन" : "Login"}
            </button>

            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                mode === "register"
                  ? "bg-white text-green-700 shadow"
                  : "text-gray-500"
              }`}
            >
              {isHindi ? "रजिस्टर" : "Register"}
            </button>

          </div>


          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "login"
              ? isHindi
                ? "अपने अकाउंट में लॉगिन करें"
                : "Login to your account"
              : isHindi
              ? "अपना अकाउंट बनाएँ"
              : "Create your account"}
          </h2>

          <p className="text-gray-500 mt-2 mb-7">
            {mode === "login"
              ? isHindi
                ? "अपनी जानकारी दर्ज करें"
                : "Enter your details to continue"
              : isHindi
              ? "कुछ आसान जानकारी भरें"
              : "Fill in a few details to get started"}
          </p>


          {/* Register Name */}
          {mode === "register" && (
            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isHindi ? "पूरा नाम" : "Full Name"}
              </label>

              <input
                type="text"
                placeholder={
                  isHindi
                    ? "अपना पूरा नाम लिखें"
                    : "Enter your full name"
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>
          )}


          {/* Mobile Number */}
          <div className="mb-5">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {isHindi ? "मोबाइल नंबर" : "Mobile Number"}
            </label>

            <div className="flex">

              <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-l-xl text-gray-700">
                +91
              </div>

              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-xl outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

          </div>


          {/* Password */}
          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {isHindi ? "पासवर्ड" : "Password"}
            </label>

            <input
              type="password"
              placeholder={
                isHindi
                  ? "अपना पासवर्ड डालें"
                  : "Enter your password"
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>


          {/* Main Button */}
          <button
            className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
          >
            {mode === "login"
              ? isHindi
                ? "लॉगिन करें"
                : "Login"
              : isHindi
              ? "अकाउंट बनाएँ"
              : "Create Account"}
          </button>


          {/* Change Language */}
          <button
            onClick={() => router.push("/")}
            className="w-full mt-5 py-3 text-green-700 font-semibold hover:underline"
          >
            🌐 {isHindi ? "भाषा बदलें" : "Change Language"}
          </button>

        </div>

      </div>

    </main>
  );
}