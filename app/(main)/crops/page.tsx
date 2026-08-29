"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
};

const translations: Record<string, any> = {
  en: {
    back: "Back to Dashboard",
    title: "My Crops",
    subtitle: "Add your crops and land details for each season",
    addCrop: "Add Crop",
    close: "Close",
    season: "Season",
    selectSeason: "Select Season",
    kharif: "Kharif",
    rabi: "Rabi",
    zaid: "Zaid",
    other: "Other",
    crop: "Crop",
    cropPlaceholder: "Example: Rice, Wheat, Maize",
    land: "Land Area (in acres)",
    landPlaceholder: "Example: 3",
    yourCrops: "Your Crops",
    noCrops: "No crops added yet.",
    firstCrop: "Add your first crop above.",
    landText: "Land",
    seasonText: "Season",
    delete: "Delete",
    fillAll: "Please fill all fields.",
  },

  hi: {
    back: "डैशबोर्ड पर वापस जाएँ",
    title: "मेरी फसलें",
    subtitle: "हर मौसम के लिए अपनी फसल और जमीन की जानकारी जोड़ें",
    addCrop: "फसल जोड़ें",
    close: "बंद करें",
    season: "मौसम",
    selectSeason: "मौसम चुनें",
    kharif: "खरीफ",
    rabi: "रबी",
    zaid: "जायद",
    other: "अन्य",
    crop: "फसल",
    cropPlaceholder: "उदाहरण: चावल, गेहूँ, मक्का",
    land: "जमीन का क्षेत्रफल (एकड़ में)",
    landPlaceholder: "उदाहरण: 3",
    yourCrops: "आपकी फसलें",
    noCrops: "अभी तक कोई फसल नहीं जोड़ी गई है।",
    firstCrop: "ऊपर अपनी पहली फसल जोड़ें।",
    landText: "जमीन",
    seasonText: "मौसम",
    delete: "हटाएँ",
    fillAll: "कृपया सभी जानकारी भरें।",
  },

  mr: {
    back: "डॅशबोर्डवर परत जा",
    title: "माझी पिके",
    subtitle: "प्रत्येक हंगामासाठी तुमची पिके आणि जमिनीची माहिती जोडा",
    addCrop: "पीक जोडा",
    close: "बंद करा",
    season: "हंगाम",
    selectSeason: "हंगाम निवडा",
    kharif: "खरीप",
    rabi: "रब्बी",
    zaid: "उन्हाळी",
    other: "इतर",
    crop: "पीक",
    cropPlaceholder: "उदाहरण: तांदूळ, गहू, मका",
    land: "जमिनीचे क्षेत्रफळ (एकरमध्ये)",
    landPlaceholder: "उदाहरण: 3",
    yourCrops: "तुमची पिके",
    noCrops: "अजून कोणतेही पीक जोडलेले नाही.",
    firstCrop: "वर तुमचे पहिले पीक जोडा.",
    landText: "जमीन",
    seasonText: "हंगाम",
    delete: "हटवा",
    fillAll: "कृपया सर्व माहिती भरा.",
  },

  bn: {
    back: "ড্যাশবোর্ডে ফিরে যান",
    title: "আমার ফসল",
    subtitle: "প্রতিটি মরসুমের জন্য আপনার ফসল ও জমির তথ্য যোগ করুন",
    addCrop: "ফসল যোগ করুন",
    close: "বন্ধ করুন",
    season: "মরসুম",
    selectSeason: "মরসুম নির্বাচন করুন",
    kharif: "খরিফ",
    rabi: "রবি",
    zaid: "জায়েদ",
    other: "অন্যান্য",
    crop: "ফসল",
    cropPlaceholder: "উদাহরণ: ধান, গম, ভুট্টা",
    land: "জমির পরিমাণ (একর)",
    landPlaceholder: "উদাহরণ: 3",
    yourCrops: "আপনার ফসল",
    noCrops: "এখনও কোনো ফসল যোগ করা হয়নি।",
    firstCrop: "উপরে আপনার প্রথম ফসল যোগ করুন।",
    landText: "জমি",
    seasonText: "মরসুম",
    delete: "মুছুন",
    fillAll: "অনুগ্রহ করে সব তথ্য পূরণ করুন।",
  },

  ta: {
    back: "டாஷ்போர்டுக்குத் திரும்பு",
    title: "எனது பயிர்கள்",
    subtitle: "ஒவ்வொரு பருவத்திற்கும் உங்கள் பயிர்கள் மற்றும் நில விவரங்களைச் சேர்க்கவும்",
    addCrop: "பயிரைச் சேர்க்கவும்",
    close: "மூடுக",
    season: "பருவம்",
    selectSeason: "பருவத்தைத் தேர்ந்தெடுக்கவும்",
    kharif: "கரீஃப்",
    rabi: "ரபி",
    zaid: "ஜயீத்",
    other: "மற்றவை",
    crop: "பயிர்",
    cropPlaceholder: "உதாரணம்: அரிசி, கோதுமை, மக்காச்சோளம்",
    land: "நிலப்பரப்பு (ஏக்கரில்)",
    landPlaceholder: "உதாரணம்: 3",
    yourCrops: "உங்கள் பயிர்கள்",
    noCrops: "இதுவரை பயிர்கள் எதுவும் சேர்க்கப்படவில்லை.",
    firstCrop: "மேலே உங்கள் முதல் பயிரைச் சேர்க்கவும்.",
    landText: "நிலம்",
    seasonText: "பருவம்",
    delete: "நீக்கு",
    fillAll: "அனைத்து தகவல்களையும் நிரப்பவும்.",
  },

  te: {
    back: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",
    title: "నా పంటలు",
    subtitle: "ప్రతి సీజన్‌కు మీ పంటలు మరియు భూమి వివరాలను జోడించండి",
    addCrop: "పంటను జోడించండి",
    close: "మూసివేయండి",
    season: "సీజన్",
    selectSeason: "సీజన్ ఎంచుకోండి",
    kharif: "ఖరీఫ్",
    rabi: "రబీ",
    zaid: "జైద్",
    other: "ఇతర",
    crop: "పంట",
    cropPlaceholder: "ఉదాహరణ: వరి, గోధుమ, మొక్కజొన్న",
    land: "భూమి విస్తీర్ణం (ఎకరాల్లో)",
    landPlaceholder: "ఉదాహరణ: 3",
    yourCrops: "మీ పంటలు",
    noCrops: "ఇంకా పంటలు జోడించలేదు.",
    firstCrop: "పైన మీ మొదటి పంటను జోడించండి.",
    landText: "భూమి",
    seasonText: "సీజన్",
    delete: "తొలగించండి",
    fillAll: "దయచేసి అన్ని వివరాలను నమోదు చేయండి.",
  },

  gu: {
    back: "ડેશબોર્ડ પર પાછા જાઓ",
    title: "મારા પાક",
    subtitle: "દરેક સિઝન માટે તમારા પાક અને જમીનની વિગતો ઉમેરો",
    addCrop: "પાક ઉમેરો",
    close: "બંધ કરો",
    season: "સિઝન",
    selectSeason: "સિઝન પસંદ કરો",
    kharif: "ખરીફ",
    rabi: "રબી",
    zaid: "ઝાયદ",
    other: "અન્ય",
    crop: "પાક",
    cropPlaceholder: "ઉદાહરણ: ચોખા, ઘઉં, મકાઈ",
    land: "જમીનનું ક્ષેત્રફળ (એકરમાં)",
    landPlaceholder: "ઉદાહરણ: 3",
    yourCrops: "તમારા પાક",
    noCrops: "હજુ સુધી કોઈ પાક ઉમેરાયો નથી.",
    firstCrop: "ઉપર તમારો પહેલો પાક ઉમેરો.",
    landText: "જમીન",
    seasonText: "સિઝન",
    delete: "કાઢી નાખો",
    fillAll: "કૃપા કરીને બધી માહિતી ભરો.",
  },

  kn: {
    back: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    title: "ನನ್ನ ಬೆಳೆಗಳು",
    subtitle: "ಪ್ರತಿ ಹಂಗಾಮಿಗೆ ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಜಮೀನಿನ ವಿವರಗಳನ್ನು ಸೇರಿಸಿ",
    addCrop: "ಬೆಳೆ ಸೇರಿಸಿ",
    close: "ಮುಚ್ಚಿ",
    season: "ಹಂಗಾಮು",
    selectSeason: "ಹಂಗಾಮನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    kharif: "ಖರೀಫ್",
    rabi: "ರಬಿ",
    zaid: "ಜೈದ್",
    other: "ಇತರೆ",
    crop: "ಬೆಳೆ",
    cropPlaceholder: "ಉದಾಹರಣೆ: ಅಕ್ಕಿ, ಗೋಧಿ, ಮೆಕ್ಕೆಜೋಳ",
    land: "ಜಮೀನು ವಿಸ್ತೀರ್ಣ (ಎಕರೆಗಳಲ್ಲಿ)",
    landPlaceholder: "ಉದಾಹರಣೆ: 3",
    yourCrops: "ನಿಮ್ಮ ಬೆಳೆಗಳು",
    noCrops: "ಇನ್ನೂ ಯಾವುದೇ ಬೆಳೆ ಸೇರಿಸಲಾಗಿಲ್ಲ.",
    firstCrop: "ಮೇಲೆ ನಿಮ್ಮ ಮೊದಲ ಬೆಳೆಯನ್ನು ಸೇರಿಸಿ.",
    landText: "ಜಮೀನು",
    seasonText: "ಹಂಗಾಮು",
    delete: "ಅಳಿಸಿ",
    fillAll: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
  },

  ml: {
    back: "ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക",
    title: "എന്റെ വിളകൾ",
    subtitle: "ഓരോ സീസണിനും നിങ്ങളുടെ വിളകളുടെയും ഭൂമിയുടെയും വിവരങ്ങൾ ചേർക്കുക",
    addCrop: "വിള ചേർക്കുക",
    close: "അടയ്ക്കുക",
    season: "സീസൺ",
    selectSeason: "സീസൺ തിരഞ്ഞെടുക്കുക",
    kharif: "ഖരീഫ്",
    rabi: "റാബി",
    zaid: "സൈദ്",
    other: "മറ്റുള്ളവ",
    crop: "വിള",
    cropPlaceholder: "ഉദാഹരണം: അരി, ഗോതമ്പ്, ചോളം",
    land: "ഭൂവിസ്തീർണ്ണം (ഏക്കറിൽ)",
    landPlaceholder: "ഉദാഹരണം: 3",
    yourCrops: "നിങ്ങളുടെ വിളകൾ",
    noCrops: "ഇതുവരെ വിളകളൊന്നും ചേർത്തിട്ടില്ല.",
    firstCrop: "മുകളിൽ നിങ്ങളുടെ ആദ്യ വിള ചേർക്കുക.",
    landText: "ഭൂമി",
    seasonText: "സീസൺ",
    delete: "ഇല്ലാതാക്കുക",
    fillAll: "ദയവായി എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക.",
  },

  pa: {
    back: "ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ ਜਾਓ",
    title: "ਮੇਰੀਆਂ ਫਸਲਾਂ",
    subtitle: "ਹਰ ਮੌਸਮ ਲਈ ਆਪਣੀਆਂ ਫਸਲਾਂ ਅਤੇ ਜ਼ਮੀਨ ਦੀ ਜਾਣਕਾਰੀ ਸ਼ਾਮਲ ਕਰੋ",
    addCrop: "ਫਸਲ ਸ਼ਾਮਲ ਕਰੋ",
    close: "ਬੰਦ ਕਰੋ",
    season: "ਮੌਸਮ",
    selectSeason: "ਮੌਸਮ ਚੁਣੋ",
    kharif: "ਖਰੀਫ",
    rabi: "ਰਬੀ",
    zaid: "ਜ਼ਾਇਦ",
    other: "ਹੋਰ",
    crop: "ਫਸਲ",
    cropPlaceholder: "ਉਦਾਹਰਨ: ਚੌਲ, ਕਣਕ, ਮੱਕੀ",
    land: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ (ਏਕੜ ਵਿੱਚ)",
    landPlaceholder: "ਉਦਾਹਰਨ: 3",
    yourCrops: "ਤੁਹਾਡੀਆਂ ਫਸਲਾਂ",
    noCrops: "ਅਜੇ ਤੱਕ ਕੋਈ ਫਸਲ ਸ਼ਾਮਲ ਨਹੀਂ ਕੀਤੀ ਗਈ।",
    firstCrop: "ਉੱਪਰ ਆਪਣੀ ਪਹਿਲੀ ਫਸਲ ਸ਼ਾਮਲ ਕਰੋ।",
    landText: "ਜ਼ਮੀਨ",
    seasonText: "ਮੌਸਮ",
    delete: "ਮਿਟਾਓ",
    fillAll: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੀ ਜਾਣਕਾਰੀ ਭਰੋ।",
  },

  or: {
    back: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    title: "ମୋର ଫସଲ",
    subtitle: "ପ୍ରତ୍ୟେକ ଋତୁ ପାଇଁ ଆପଣଙ୍କ ଫସଲ ଏବଂ ଜମିର ବିବରଣୀ ଯୋଡନ୍ତୁ",
    addCrop: "ଫସଲ ଯୋଡନ୍ତୁ",
    close: "ବନ୍ଦ କରନ୍ତୁ",
    season: "ଋତୁ",
    selectSeason: "ଋତୁ ବାଛନ୍ତୁ",
    kharif: "ଖରିଫ",
    rabi: "ରବି",
    zaid: "ଜାୟଦ",
    other: "ଅନ୍ୟାନ୍ୟ",
    crop: "ଫସଲ",
    cropPlaceholder: "ଉଦାହରଣ: ଧାନ, ଗହମ, ମକା",
    land: "ଜମିର କ୍ଷେତ୍ରଫଳ (ଏକରରେ)",
    landPlaceholder: "ଉଦାହରଣ: 3",
    yourCrops: "ଆପଣଙ୍କ ଫସଲ",
    noCrops: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଫସଲ ଯୋଡାଯାଇନାହିଁ।",
    firstCrop: "ଉପରେ ଆପଣଙ୍କ ପ୍ରଥମ ଫସଲ ଯୋଡନ୍ତୁ।",
    landText: "ଜମି",
    seasonText: "ଋତୁ",
    delete: "ଡିଲିଟ୍ କରନ୍ତୁ",
    fillAll: "ଦୟାକରି ସମସ୍ତ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ।",
  },

  as: {
    back: "ডেশ্বব'ৰ্ডলৈ উভতি যাওক",
    title: "মোৰ শস্য",
    subtitle: "প্ৰতিটো ঋতুৰ বাবে আপোনাৰ শস্য আৰু মাটিৰ তথ্য যোগ কৰক",
    addCrop: "শস্য যোগ কৰক",
    close: "বন্ধ কৰক",
    season: "ঋতু",
    selectSeason: "ঋতু বাছনি কৰক",
    kharif: "খৰিফ",
    rabi: "ৰবি",
    zaid: "জায়েদ",
    other: "অন্যান্য",
    crop: "শস্য",
    cropPlaceholder: "উদাহৰণ: ধান, ঘেঁহু, মাকৈ",
    land: "মাটিৰ পৰিমাণ (একৰ)",
    landPlaceholder: "উদাহৰণ: 3",
    yourCrops: "আপোনাৰ শস্য",
    noCrops: "এতিয়ালৈকে কোনো শস্য যোগ কৰা হোৱা নাই।",
    firstCrop: "ওপৰত আপোনাৰ প্ৰথম শস্য যোগ কৰক।",
    landText: "মাটি",
    seasonText: "ঋতু",
    delete: "মচি পেলাওক",
    fillAll: "অনুগ্ৰহ কৰি সকলো তথ্য পূৰণ কৰক।",
  },

  ur: {
    back: "ڈیش بورڈ پر واپس جائیں",
    title: "میری فصلیں",
    subtitle: "ہر موسم کے لیے اپنی فصل اور زمین کی تفصیلات شامل کریں",
    addCrop: "فصل شامل کریں",
    close: "بند کریں",
    season: "موسم",
    selectSeason: "موسم منتخب کریں",
    kharif: "خریف",
    rabi: "ربیع",
    zaid: "زید",
    other: "دیگر",
    crop: "فصل",
    cropPlaceholder: "مثال: چاول، گندم، مکئی",
    land: "زمین کا رقبہ (ایکڑ میں)",
    landPlaceholder: "مثال: 3",
    yourCrops: "آپ کی فصلیں",
    noCrops: "ابھی تک کوئی فصل شامل نہیں کی گئی۔",
    firstCrop: "اوپر اپنی پہلی فصل شامل کریں۔",
    landText: "زمین",
    seasonText: "موسم",
    delete: "حذف کریں",
    fillAll: "براہ کرم تمام معلومات درج کریں۔",
  },
};

export default function CropsPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");
  const [crops, setCrops] = useState<Crop[]>([]);
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [land, setLand] = useState("");
  const [showAddForm, setShowAddForm] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }

    const savedCrops = localStorage.getItem("farmerCrops");

    if (!savedCrops) {
      setCrops([]);
      setShowAddForm(true);
      return;
    }

    try {
      const parsedCrops: Crop[] = JSON.parse(savedCrops);

      setCrops(parsedCrops);
      setShowAddForm(parsedCrops.length === 0);
    } catch {
      setCrops([]);
      setShowAddForm(true);
    }
  }, []);

  const t = translations[language] || translations.en;

  const addCrop = (e: React.FormEvent) => {
    e.preventDefault();

    if (!season || !crop || !land) {
      alert(t.fillAll);
      return;
    }

    const newCrop: Crop = {
      id: Date.now(),
      season,
      crop,
      land,
    };

    const updatedCrops = [...crops, newCrop];

    setCrops(updatedCrops);

    localStorage.setItem(
      "farmerCrops",
      JSON.stringify(updatedCrops)
    );

    setSeason("");
    setCrop("");
    setLand("");
    setShowAddForm(false);
  };

  const deleteCrop = (id: number) => {
    const updatedCrops = crops.filter(
      (item) => item.id !== id
    );

    setCrops(updatedCrops);

    localStorage.setItem(
      "farmerCrops",
      JSON.stringify(updatedCrops)
    );

    if (updatedCrops.length === 0) {
      setShowAddForm(true);
    }
  };

  const openAddCropForm = () => {
    setShowAddForm(true);
  };

  const getSeasonName = (value: string) => {
    if (value === "Kharif") return t.kharif;
    if (value === "Rabi") return t.rabi;
    if (value === "Zaid") return t.zaid;
    if (value === "Other") return t.other;
    return value;
  };

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => router.push("/dashboard")}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.back}
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-3">
            🌾
          </div>

          <h1 className="text-3xl font-bold text-green-800">
            {t.title}
          </h1>

          <p className="text-gray-600 mt-2">
            {t.subtitle}
          </p>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-green-800">
                {t.addCrop}
              </h2>

              {crops.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-800 font-semibold"
                >
                  ✕ {t.close}
                </button>
              )}

            </div>

            <form onSubmit={addCrop}>

              <div className="mb-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.season}
                </label>

                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                >
                  <option value="">
                    {t.selectSeason}
                  </option>

                  <option value="Kharif">
                    {t.kharif}
                  </option>

                  <option value="Rabi">
                    {t.rabi}
                  </option>

                  <option value="Zaid">
                    {t.zaid}
                  </option>

                  <option value="Other">
                    {t.other}
                  </option>
                </select>

              </div>

              <div className="mb-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.crop}
                </label>

                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  placeholder={t.cropPlaceholder}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
                />

              </div>

              <div className="mb-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.land}
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={land}
                  onChange={(e) => setLand(e.target.value)}
                  placeholder={t.landPlaceholder}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
                />

              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
              >
                + {t.addCrop}
              </button>

            </form>

          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg p-7">

          <h2 className="text-2xl font-bold text-green-800 mb-6">
            {t.yourCrops}
          </h2>

          {crops.length === 0 ? (

            <div className="text-center py-10 text-gray-500">

              <div className="text-5xl mb-3">
                🌱
              </div>

              <p>
                {t.noCrops}
              </p>

              <p className="text-sm mt-1">
                {t.firstCrop}
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {crops.map((item) => (

                <div
                  key={item.id}
                  className="border border-green-100 rounded-2xl p-5 hover:shadow-md transition"
                >

                  <div className="flex items-center justify-between gap-4">

                    <button
                      onClick={() =>
                        router.push(`/crops/${item.id}`)
                      }
                      className="flex-1 text-left"
                    >

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                          🌾
                        </div>

                        <div>

                          <h3 className="text-xl font-bold text-green-800">
                            {item.crop}
                          </h3>

                          <p className="text-gray-600">
                            {getSeasonName(item.season)} {t.seasonText}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            {t.landText}: {item.land} acres
                          </p>

                        </div>

                      </div>

                    </button>

                    <button
                      onClick={() => deleteCrop(item.id)}
                      className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100"
                    >
                      {t.delete}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

          {crops.length > 0 && !showAddForm && (
            <button
              onClick={openAddCropForm}
              className="w-full mt-6 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
            >
              + {t.addCrop}
            </button>
          )}

        </div>

      </div>
    </main>
  );
}