"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const translations: Record<string, any> = {
  en: {
    title: "Farmer Profile",
    subtitle: "Tell us about yourself",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    mobile: "Mobile Number",
    mobilePlaceholder: "9876543210",
    village: "Village",
    villagePlaceholder: "Enter village name",
    district: "District",
    districtPlaceholder: "Enter district",
    state: "State",
    statePlaceholder: "Enter state",
    pinCode: "PIN Code",
    pinCodePlaceholder: "Enter 6-digit PIN code",
    save: "Save Profile",
    back: "Back to Dashboard",
    saved: "Profile saved successfully!",
  },

  hi: {
    title: "किसान प्रोफाइल",
    subtitle: "अपने बारे में जानकारी दें",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    mobile: "मोबाइल नंबर",
    mobilePlaceholder: "9876543210",
    village: "गाँव",
    villagePlaceholder: "गाँव का नाम दर्ज करें",
    district: "जिला",
    districtPlaceholder: "जिला दर्ज करें",
    state: "राज्य",
    statePlaceholder: "राज्य दर्ज करें",
    pinCode: "पिन कोड",
    pinCodePlaceholder: "6 अंकों का पिन कोड दर्ज करें",
    save: "प्रोफाइल सेव करें",
    back: "डैशबोर्ड पर वापस जाएँ",
    saved: "प्रोफाइल सफलतापूर्वक सेव हो गई!",
  },

  mr: {
    title: "शेतकरी प्रोफाइल",
    subtitle: "तुमच्याबद्दल माहिती द्या",
    fullName: "पूर्ण नाव",
    fullNamePlaceholder: "तुमचे पूर्ण नाव टाका",
    mobile: "मोबाईल नंबर",
    mobilePlaceholder: "9876543210",
    village: "गाव",
    villagePlaceholder: "गावाचे नाव टाका",
    district: "जिल्हा",
    districtPlaceholder: "जिल्हा टाका",
    state: "राज्य",
    statePlaceholder: "राज्य टाका",
    pinCode: "पिन कोड",
    pinCodePlaceholder: "6 अंकी पिन कोड टाका",
    save: "प्रोफाइल सेव्ह करा",
    back: "डॅशबोर्डवर परत जा",
    saved: "प्रोफाइल यशस्वीरित्या सेव्ह झाली!",
  },

  bn: {
    title: "কৃষক প্রোফাইল",
    subtitle: "আপনার সম্পর্কে তথ্য দিন",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "আপনার পুরো নাম লিখুন",
    mobile: "মোবাইল নম্বর",
    mobilePlaceholder: "9876543210",
    village: "গ্রাম",
    villagePlaceholder: "গ্রামের নাম লিখুন",
    district: "জেলা",
    districtPlaceholder: "জেলা লিখুন",
    state: "রাজ্য",
    statePlaceholder: "রাজ্য লিখুন",
    pinCode: "পিন কোড",
    pinCodePlaceholder: "৬ সংখ্যার পিন কোড লিখুন",
    save: "প্রোফাইল সংরক্ষণ করুন",
    back: "ড্যাশবোর্ডে ফিরে যান",
    saved: "প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!",
  },

  ta: {
    title: "விவசாயி சுயவிவரம்",
    subtitle: "உங்களைப் பற்றிய தகவலை வழங்கவும்",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
    mobile: "மொபைல் எண்",
    mobilePlaceholder: "9876543210",
    village: "கிராமம்",
    villagePlaceholder: "கிராமத்தின் பெயரை உள்ளிடவும்",
    district: "மாவட்டம்",
    districtPlaceholder: "மாவட்டத்தை உள்ளிடவும்",
    state: "மாநிலம்",
    statePlaceholder: "மாநிலத்தை உள்ளிடவும்",
    pinCode: "பின் குறியீடு",
    pinCodePlaceholder: "6 இலக்க பின் குறியீட்டை உள்ளிடவும்",
    save: "சுயவிவரத்தை சேமிக்கவும்",
    back: "டாஷ்போர்டுக்குத் திரும்பு",
    saved: "சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது!",
  },

  te: {
    title: "రైతు ప్రొఫైల్",
    subtitle: "మీ గురించి సమాచారం ఇవ్వండి",
    fullName: "పూర్తి పేరు",
    fullNamePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
    mobile: "మొబైల్ నంబర్",
    mobilePlaceholder: "9876543210",
    village: "గ్రామం",
    villagePlaceholder: "గ్రామం పేరు నమోదు చేయండి",
    district: "జిల్లా",
    districtPlaceholder: "జిల్లా నమోదు చేయండి",
    state: "రాష్ట్రం",
    statePlaceholder: "రాష్ట్రం నమోదు చేయండి",
    pinCode: "పిన్ కోడ్",
    pinCodePlaceholder: "6 అంకెల పిన్ కోడ్ నమోదు చేయండి",
    save: "ప్రొఫైల్ సేవ్ చేయండి",
    back: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",
    saved: "ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!",
  },

  gu: {
    title: "ખેડૂત પ્રોફાઇલ",
    subtitle: "તમારા વિશે માહિતી આપો",
    fullName: "પૂરું નામ",
    fullNamePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
    mobile: "મોબાઇલ નંબર",
    mobilePlaceholder: "9876543210",
    village: "ગામ",
    villagePlaceholder: "ગામનું નામ દાખલ કરો",
    district: "જિલ્લો",
    districtPlaceholder: "જિલ્લો દાખલ કરો",
    state: "રાજ્ય",
    statePlaceholder: "રાજ્ય દાખલ કરો",
    pinCode: "પિન કોડ",
    pinCodePlaceholder: "6 અંકનો પિન કોડ દાખલ કરો",
    save: "પ્રોફાઇલ સેવ કરો",
    back: "ડેશબોર્ડ પર પાછા જાઓ",
    saved: "પ્રોફાઇલ સફળતાપૂર્વક સેવ થઈ!",
  },

  kn: {
    title: "ರೈತ ಪ್ರೊಫೈಲ್",
    subtitle: "ನಿಮ್ಮ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    fullNamePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    mobilePlaceholder: "9876543210",
    village: "ಗ್ರಾಮ",
    villagePlaceholder: "ಗ್ರಾಮದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    district: "ಜಿಲ್ಲೆ",
    districtPlaceholder: "ಜಿಲ್ಲೆಯನ್ನು ನಮೂದಿಸಿ",
    state: "ರಾಜ್ಯ",
    statePlaceholder: "ರಾಜ್ಯವನ್ನು ನಮೂದಿಸಿ",
    pinCode: "ಪಿನ್ ಕೋಡ್",
    pinCodePlaceholder: "6 ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ",
    save: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ",
    back: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    saved: "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!",
  },

  ml: {
    title: "കർഷക പ്രൊഫൈൽ",
    subtitle: "നിങ്ങളെക്കുറിച്ചുള്ള വിവരങ്ങൾ നൽകുക",
    fullName: "പൂർണ്ണ പേര്",
    fullNamePlaceholder: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക",
    mobile: "മൊബൈൽ നമ്പർ",
    mobilePlaceholder: "9876543210",
    village: "ഗ്രാമം",
    villagePlaceholder: "ഗ്രാമത്തിന്റെ പേര് നൽകുക",
    district: "ജില്ല",
    districtPlaceholder: "ജില്ല നൽകുക",
    state: "സംസ്ഥാനം",
    statePlaceholder: "സംസ്ഥാനം നൽകുക",
    pinCode: "പിൻ കോഡ്",
    pinCodePlaceholder: "6 അക്ക പിൻ കോഡ് നൽകുക",
    save: "പ്രൊഫൈൽ സേവ് ചെയ്യുക",
    back: "ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക",
    saved: "പ്രൊഫൈൽ വിജയകരമായി സേവ് ചെയ്തു!",
  },

  pa: {
    title: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ",
    subtitle: "ਆਪਣੇ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿਓ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    fullNamePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    mobile: "ਮੋਬਾਈਲ ਨੰਬਰ",
    mobilePlaceholder: "9876543210",
    village: "ਪਿੰਡ",
    villagePlaceholder: "ਪਿੰਡ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    districtPlaceholder: "ਜ਼ਿਲ੍ਹਾ ਦਰਜ ਕਰੋ",
    state: "ਰਾਜ",
    statePlaceholder: "ਰਾਜ ਦਰਜ ਕਰੋ",
    pinCode: "ਪਿਨ ਕੋਡ",
    pinCodePlaceholder: "6 ਅੰਕਾਂ ਦਾ ਪਿਨ ਕੋਡ ਦਰਜ ਕਰੋ",
    save: "ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ",
    back: "ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ ਜਾਓ",
    saved: "ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਸੇਵ ਹੋ ਗਈ!",
  },

  or: {
    title: "ଚାଷୀ ପ୍ରୋଫାଇଲ୍",
    subtitle: "ଆପଣଙ୍କ ବିଷୟରେ ସୂଚନା ଦିଅନ୍ତୁ",
    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    fullNamePlaceholder: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଦିଅନ୍ତୁ",
    mobile: "ମୋବାଇଲ୍ ନମ୍ବର",
    mobilePlaceholder: "9876543210",
    village: "ଗାଁ",
    villagePlaceholder: "ଗାଁର ନାମ ଦିଅନ୍ତୁ",
    district: "ଜିଲ୍ଲା",
    districtPlaceholder: "ଜିଲ୍ଲା ଦିଅନ୍ତୁ",
    state: "ରାଜ୍ୟ",
    statePlaceholder: "ରାଜ୍ୟ ଦିଅନ୍ତୁ",
    pinCode: "ପିନ୍ କୋଡ୍",
    pinCodePlaceholder: "6 ଅଙ୍କର ପିନ୍ କୋଡ୍ ଦିଅନ୍ତୁ",
    save: "ପ୍ରୋଫାଇଲ୍ ସେଭ୍ କରନ୍ତୁ",
    back: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    saved: "ପ୍ରୋଫାଇଲ୍ ସଫଳତାର ସହ ସେଭ୍ ହୋଇଛି!",
  },

  as: {
    title: "কৃষকৰ প্ৰফাইল",
    subtitle: "আপোনাৰ বিষয়ে তথ্য দিয়ক",
    fullName: "সম্পূৰ্ণ নাম",
    fullNamePlaceholder: "আপোনাৰ সম্পূৰ্ণ নাম লিখক",
    mobile: "ম'বাইল নম্বৰ",
    mobilePlaceholder: "9876543210",
    village: "গাঁও",
    villagePlaceholder: "গাঁৱৰ নাম লিখক",
    district: "জিলা",
    districtPlaceholder: "জিলা লিখক",
    state: "ৰাজ্য",
    statePlaceholder: "ৰাজ্য লিখক",
    pinCode: "পিন কোড",
    pinCodePlaceholder: "6 সংখ্যাৰ পিন কোড লিখক",
    save: "প্ৰফাইল সংৰক্ষণ কৰক",
    back: "ডেশ্বব'ৰ্ডলৈ উভতি যাওক",
    saved: "প্ৰফাইল সফলভাৱে সংৰক্ষণ কৰা হৈছে!",
  },

  ur: {
    title: "کسان پروفائل",
    subtitle: "اپنے بارے میں معلومات دیں",
    fullName: "پورا نام",
    fullNamePlaceholder: "اپنا پورا نام درج کریں",
    mobile: "موبائل نمبر",
    mobilePlaceholder: "9876543210",
    village: "گاؤں",
    villagePlaceholder: "گاؤں کا نام درج کریں",
    district: "ضلع",
    districtPlaceholder: "ضلع درج کریں",
    state: "ریاست",
    statePlaceholder: "ریاست درج کریں",
    pinCode: "پن کوڈ",
    pinCodePlaceholder: "6 ہندسوں کا پن کوڈ درج کریں",
    save: "پروفائل محفوظ کریں",
    back: "ڈیش بورڈ پر واپس جائیں",
    saved: "پروفائل کامیابی سے محفوظ ہو گیا!",
  },
};

export default function FarmerProfile() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "",
    pinCode: "",
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }

    const savedProfile = localStorage.getItem("farmerProfile");

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        setForm({
          name: profile.name || "",
          phone: profile.phone || "",
          village: profile.village || "",
          district: profile.district || "",
          state: profile.state || "",
          pinCode: profile.pinCode || "",
        });
      } catch {
        // Ignore invalid saved profile
      }
    }
  }, []);

  const t = translations[language] || translations.en;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pinCode)) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    localStorage.setItem(
      "farmerProfile",
      JSON.stringify(form)
    );

    alert(t.saved);

    router.push("/crops");
  };

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => router.push("/crops")}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.back}
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-7">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">👨‍🌾</div>

            <h1 className="text-3xl font-bold text-green-800">
              {t.title}
            </h1>

            <p className="text-gray-600 mt-2">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.fullName}
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder={t.fullNamePlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Mobile */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.mobile}
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                inputMode="numeric"
                placeholder={t.mobilePlaceholder}
                maxLength={10}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Village */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.village}
              </label>

              <input
                name="village"
                value={form.village}
                onChange={handleChange}
                type="text"
                placeholder={t.villagePlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* District */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.district}
              </label>

              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                type="text"
                placeholder={t.districtPlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* State */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.state}
              </label>

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                type="text"
                placeholder={t.statePlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* PIN Code */}
            <div className="mb-7">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.pinCode}
              </label>

              <input
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder={t.pinCodePlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Save */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
            >
              {t.save}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}