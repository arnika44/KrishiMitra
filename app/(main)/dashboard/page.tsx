"use client"; 
 
import { useEffect, useState } from "react"; 
import { useRouter } from "next/navigation"; 
 
const languages: Record<string, string> = { 
  hi: "हिंदी", 
  en: "English", 
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
}; 
 
export default function DashboardPage() { 
  const router = useRouter(); 
 
  const [language, setLanguage] = useState("en"); 
 
  useEffect(() => { 
    const savedLanguage = localStorage.getItem("selectedLanguage"); 
 
    if (savedLanguage && dashboardText[savedLanguage]) { 
      setLanguage(savedLanguage); 
    } 
  }, []); 
 
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
                {languages[language] || "English"} 
              </p> 
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