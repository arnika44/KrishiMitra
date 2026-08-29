"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type LandUnit =
  | "Acre"
  | "Hectare"
  | "Bigha"
  | "Katha"
  | "Decimal"
  | "Square Meter"
  | "Square Feet";

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
  landUnit: LandUnit;
};

type Translation = {
  back: string;
  title: string;
  subtitle: string;
  addCrop: string;
  close: string;
  season: string;
  selectSeason: string;
  kharif: string;
  rabi: string;
  zaid: string;
  other: string;
  crop: string;
  cropPlaceholder: string;
  land: string;
  selectLandUnit: string;
  landAmount: string;
  landAmountPlaceholder: string;
  yourCrops: string;
  noCrops: string;
  firstCrop: string;
  landText: string;
  seasonText: string;
  delete: string;
  fillAll: string;
  invalidLand: string;
  acre: string;
  hectare: string;
  bigha: string;
  katha: string;
  decimal: string;
  squareMeter: string;
  squareFeet: string;
};

const translations: Record<string, Translation> = {
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
    land: "Land",
    selectLandUnit: "Select Land Unit",
    landAmount: "Land Area",
    landAmountPlaceholder: "Enter land area",
    yourCrops: "Your Crops",
    noCrops: "No crops added yet.",
    firstCrop: "Add your first crop above.",
    landText: "Land",
    seasonText: "Season",
    delete: "Delete",
    fillAll: "Please fill all fields.",
    invalidLand: "Please enter a valid land area greater than 0.",
    acre: "Acre",
    hectare: "Hectare",
    bigha: "Bigha",
    katha: "Katha",
    decimal: "Decimal",
    squareMeter: "Square Meter",
    squareFeet: "Square Feet",
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
    land: "जमीन",
    selectLandUnit: "जमीन की इकाई चुनें",
    landAmount: "जमीन का क्षेत्रफल",
    landAmountPlaceholder: "जमीन का क्षेत्रफल लिखें",
    yourCrops: "आपकी फसलें",
    noCrops: "अभी तक कोई फसल नहीं जोड़ी गई है।",
    firstCrop: "ऊपर अपनी पहली फसल जोड़ें।",
    landText: "जमीन",
    seasonText: "मौसम",
    delete: "हटाएँ",
    fillAll: "कृपया सभी जानकारी भरें।",
    invalidLand: "कृपया 0 से अधिक जमीन का सही क्षेत्रफल दर्ज करें।",
    acre: "एकड़",
    hectare: "हेक्टेयर",
    bigha: "बीघा",
    katha: "कट्ठा",
    decimal: "डिसमिल",
    squareMeter: "वर्ग मीटर",
    squareFeet: "वर्ग फुट",
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
    land: "जमीन",
    selectLandUnit: "जमिनीचे एकक निवडा",
    landAmount: "जमिनीचे क्षेत्रफळ",
    landAmountPlaceholder: "जमिनीचे क्षेत्रफळ लिहा",
    yourCrops: "तुमची पिके",
    noCrops: "अजून कोणतेही पीक जोडलेले नाही.",
    firstCrop: "वर तुमचे पहिले पीक जोडा.",
    landText: "जमीन",
    seasonText: "हंगाम",
    delete: "हटवा",
    fillAll: "कृपया सर्व माहिती भरा.",
    invalidLand: "कृपया 0 पेक्षा जास्त योग्य जमीन क्षेत्रफळ भरा.",
    acre: "एकर",
    hectare: "हेक्टर",
    bigha: "बिघा",
    katha: "कठ्ठा",
    decimal: "डेसिमल",
    squareMeter: "चौरस मीटर",
    squareFeet: "चौरस फूट",
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
    land: "জমি",
    selectLandUnit: "জমির একক নির্বাচন করুন",
    landAmount: "জমির পরিমাণ",
    landAmountPlaceholder: "জমির পরিমাণ লিখুন",
    yourCrops: "আপনার ফসল",
    noCrops: "এখনও কোনো ফসল যোগ করা হয়নি।",
    firstCrop: "উপরে আপনার প্রথম ফসল যোগ করুন।",
    landText: "জমি",
    seasonText: "মরসুম",
    delete: "মুছুন",
    fillAll: "অনুগ্রহ করে সব তথ্য পূরণ করুন।",
    invalidLand: "অনুগ্রহ করে ০-এর বেশি সঠিক জমির পরিমাণ লিখুন।",
    acre: "একর",
    hectare: "হেক্টর",
    bigha: "বিঘা",
    katha: "কাঠা",
    decimal: "ডেসিমেল",
    squareMeter: "বর্গমিটার",
    squareFeet: "বর্গফুট",
  },

  ta: {
    back: "டாஷ்போர்டுக்குத் திரும்பு",
    title: "எனது பயிர்கள்",
    subtitle:
      "ஒவ்வொரு பருவத்திற்கும் உங்கள் பயிர்கள் மற்றும் நில விவரங்களைச் சேர்க்கவும்",
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
    land: "நிலம்",
    selectLandUnit: "நில அலகைத் தேர்ந்தெடுக்கவும்",
    landAmount: "நிலப்பரப்பு",
    landAmountPlaceholder: "நிலப்பரப்பை உள்ளிடவும்",
    yourCrops: "உங்கள் பயிர்கள்",
    noCrops: "இதுவரை பயிர்கள் எதுவும் சேர்க்கப்படவில்லை.",
    firstCrop: "மேலே உங்கள் முதல் பயிரைச் சேர்க்கவும்.",
    landText: "நிலம்",
    seasonText: "பருவம்",
    delete: "நீக்கு",
    fillAll: "அனைத்து தகவல்களையும் நிரப்பவும்.",
    invalidLand: "0-க்கு அதிகமான சரியான நிலப்பரப்பை உள்ளிடவும்.",
    acre: "ஏக்கர்",
    hectare: "ஹெக்டேர்",
    bigha: "பிகா",
    katha: "கத்தா",
    decimal: "டெசிமல்",
    squareMeter: "சதுர மீட்டர்",
    squareFeet: "சதுர அடி",
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
    land: "భూమి",
    selectLandUnit: "భూమి కొలతను ఎంచుకోండి",
    landAmount: "భూమి విస్తీర్ణం",
    landAmountPlaceholder: "భూమి విస్తీర్ణాన్ని నమోదు చేయండి",
    yourCrops: "మీ పంటలు",
    noCrops: "ఇంకా పంటలు జోడించలేదు.",
    firstCrop: "పైన మీ మొదటి పంటను జోడించండి.",
    landText: "భూమి",
    seasonText: "సీజన్",
    delete: "తొలగించండి",
    fillAll: "దయచేసి అన్ని వివరాలను నమోదు చేయండి.",
    invalidLand: "0 కంటే ఎక్కువ సరైన భూమి విస్తీర్ణాన్ని నమోదు చేయండి.",
    acre: "ఎకరం",
    hectare: "హెక్టారు",
    bigha: "బిఘా",
    katha: "కథా",
    decimal: "డెసిమల్",
    squareMeter: "చదరపు మీటర్",
    squareFeet: "చదరపు అడుగు",
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
    land: "જમીન",
    selectLandUnit: "જમીનનું એકમ પસંદ કરો",
    landAmount: "જમીનનું ક્ષેત્રફળ",
    landAmountPlaceholder: "જમીનનું ક્ષેત્રફળ દાખલ કરો",
    yourCrops: "તમારા પાક",
    noCrops: "હજુ સુધી કોઈ પાક ઉમેરાયો નથી.",
    firstCrop: "ઉપર તમારો પહેલો પાક ઉમેરો.",
    landText: "જમીન",
    seasonText: "સિઝન",
    delete: "કાઢી નાખો",
    fillAll: "કૃપા કરીને બધી માહિતી ભરો.",
    invalidLand: "કૃપા કરીને 0 કરતાં વધુ જમીનનું યોગ્ય ક્ષેત્રફળ દાખલ કરો.",
    acre: "એકર",
    hectare: "હેક્ટર",
    bigha: "બીઘા",
    katha: "કઠ્ઠા",
    decimal: "ડેસિમલ",
    squareMeter: "ચોરસ મીટર",
    squareFeet: "ચોરસ ફૂટ",
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
    land: "ಜಮೀನು",
    selectLandUnit: "ಜಮೀನಿನ ಅಳತೆಯ ಏಕಕ ಆಯ್ಕೆಮಾಡಿ",
    landAmount: "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ",
    landAmountPlaceholder: "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣವನ್ನು ನಮೂದಿಸಿ",
    yourCrops: "ನಿಮ್ಮ ಬೆಳೆಗಳು",
    noCrops: "ಇನ್ನೂ ಯಾವುದೇ ಬೆಳೆ ಸೇರಿಸಲಾಗಿಲ್ಲ.",
    firstCrop: "ಮೇಲೆ ನಿಮ್ಮ ಮೊದಲ ಬೆಳೆಯನ್ನು ಸೇರಿಸಿ.",
    landText: "ಜಮೀನು",
    seasonText: "ಹಂಗಾಮು",
    delete: "ಅಳಿಸಿ",
    fillAll: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
    invalidLand: "ದಯವಿಟ್ಟು 0 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಸರಿಯಾದ ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣವನ್ನು ನಮೂದಿಸಿ.",
    acre: "ಎಕರೆ",
    hectare: "ಹೆಕ್ಟೇರ್",
    bigha: "ಬಿಘಾ",
    katha: "ಕಠಾ",
    decimal: "ಡೆಸಿಮಲ್",
    squareMeter: "ಚದರ ಮೀಟರ್",
    squareFeet: "ಚದರ ಅಡಿ",
  },

  ml: {
    back: "ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക",
    title: "എന്റെ വിളകൾ",
    subtitle:
      "ഓരോ സീസണിനും നിങ്ങളുടെ വിളകളുടെയും ഭൂമിയുടെയും വിവരങ്ങൾ ചേർക്കുക",
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
    land: "ഭൂമി",
    selectLandUnit: "ഭൂമിയുടെ അളവ് തിരഞ്ഞെടുക്കുക",
    landAmount: "ഭൂവിസ്തീർണ്ണം",
    landAmountPlaceholder: "ഭൂവിസ്തീർണ്ണം നൽകുക",
    yourCrops: "നിങ്ങളുടെ വിളകൾ",
    noCrops: "ഇതുവരെ വിളകളൊന്നും ചേർത്തിട്ടില്ല.",
    firstCrop: "മുകളിൽ നിങ്ങളുടെ ആദ്യ വിള ചേർക്കുക.",
    landText: "ഭൂമി",
    seasonText: "സീസൺ",
    delete: "ഇല്ലാതാക്കുക",
    fillAll: "ദയവായി എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക.",
    invalidLand: "0-ൽ കൂടുതലുള്ള ശരിയായ ഭൂവിസ്തീർണ്ണം നൽകുക.",
    acre: "ഏക്കർ",
    hectare: "ഹെക്ടർ",
    bigha: "ബിഗ",
    katha: "കഠ",
    decimal: "ഡെസിമൽ",
    squareMeter: "ചതുരശ്ര മീറ്റർ",
    squareFeet: "ചതുരശ്ര അടി",
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
    land: "ਜ਼ਮੀਨ",
    selectLandUnit: "ਜ਼ਮੀਨ ਦੀ ਇਕਾਈ ਚੁਣੋ",
    landAmount: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ",
    landAmountPlaceholder: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ ਦਰਜ ਕਰੋ",
    yourCrops: "ਤੁਹਾਡੀਆਂ ਫਸਲਾਂ",
    noCrops: "ਅਜੇ ਤੱਕ ਕੋਈ ਫਸਲ ਸ਼ਾਮਲ ਨਹੀਂ ਕੀਤੀ ਗਈ।",
    firstCrop: "ਉੱਪਰ ਆਪਣੀ ਪਹਿਲੀ ਫਸਲ ਸ਼ਾਮਲ ਕਰੋ।",
    landText: "ਜ਼ਮੀਨ",
    seasonText: "ਮੌਸਮ",
    delete: "ਮਿਟਾਓ",
    fillAll: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੀ ਜਾਣਕਾਰੀ ਭਰੋ।",
    invalidLand: "ਕਿਰਪਾ ਕਰਕੇ 0 ਤੋਂ ਵੱਧ ਸਹੀ ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ ਦਰਜ ਕਰੋ।",
    acre: "ਏਕੜ",
    hectare: "ਹੈਕਟੇਅਰ",
    bigha: "ਬੀਘਾ",
    katha: "ਕੱਠਾ",
    decimal: "ਡੈਸੀਮਲ",
    squareMeter: "ਵਰਗ ਮੀਟਰ",
    squareFeet: "ਵਰਗ ਫੁੱਟ",
  },

  or: {
    back: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    title: "ମୋର ଫସଲ",
    subtitle:
      "ପ୍ରତ୍ୟେକ ଋତୁ ପାଇଁ ଆପଣଙ୍କ ଫସଲ ଏବଂ ଜମିର ବିବରଣୀ ଯୋଡନ୍ତୁ",
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
    land: "ଜମି",
    selectLandUnit: "ଜମିର ଏକକ ବାଛନ୍ତୁ",
    landAmount: "ଜମିର କ୍ଷେତ୍ରଫଳ",
    landAmountPlaceholder: "ଜମିର କ୍ଷେତ୍ରଫଳ ଲେଖନ୍ତୁ",
    yourCrops: "ଆପଣଙ୍କ ଫସଲ",
    noCrops: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଫସଲ ଯୋଡାଯାଇନାହିଁ।",
    firstCrop: "ଉପରେ ଆପଣଙ୍କ ପ୍ରଥମ ଫସଲ ଯୋଡନ୍ତୁ।",
    landText: "ଜମି",
    seasonText: "ଋତୁ",
    delete: "ଡିଲିଟ୍ କରନ୍ତୁ",
    fillAll: "ଦୟାକରି ସମସ୍ତ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ।",
    invalidLand: "ଦୟାକରି 0 ଠାରୁ ଅଧିକ ସଠିକ ଜମିର କ୍ଷେତ୍ରଫଳ ଲେଖନ୍ତୁ।",
    acre: "ଏକର",
    hectare: "ହେକ୍ଟର",
    bigha: "ବିଘା",
    katha: "କଠା",
    decimal: "ଡେସିମାଲ",
    squareMeter: "ବର୍ଗ ମିଟର",
    squareFeet: "ବର୍ଗ ଫୁଟ",
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
    land: "মাটি",
    selectLandUnit: "মাটিৰ একক বাছনি কৰক",
    landAmount: "মাটিৰ পৰিমাণ",
    landAmountPlaceholder: "মাটিৰ পৰিমাণ লিখক",
    yourCrops: "আপোনাৰ শস্য",
    noCrops: "এতিয়ালৈকে কোনো শস্য যোগ কৰা হোৱা নাই।",
    firstCrop: "ওপৰত আপোনাৰ প্ৰথম শস্য যোগ কৰক।",
    landText: "মাটি",
    seasonText: "ঋতু",
    delete: "মচি পেলাওক",
    fillAll: "অনুগ্ৰহ কৰি সকলো তথ্য পূৰণ কৰক।",
    invalidLand: "অনুগ্ৰহ কৰি ০-তকৈ অধিক সঠিক মাটিৰ পৰিমাণ লিখক।",
    acre: "একৰ",
    hectare: "হেক্টৰ",
    bigha: "বিঘা",
    katha: "কঠা",
    decimal: "ডেচিমেল",
    squareMeter: "বৰ্গ মিটাৰ",
    squareFeet: "বৰ্গ ফুট",
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
    land: "زمین",
    selectLandUnit: "زمین کی اکائی منتخب کریں",
    landAmount: "زمین کا رقبہ",
    landAmountPlaceholder: "زمین کا رقبہ درج کریں",
    yourCrops: "آپ کی فصلیں",
    noCrops: "ابھی تک کوئی فصل شامل نہیں کی گئی۔",
    firstCrop: "اوپر اپنی پہلی فصل شامل کریں۔",
    landText: "زمین",
    seasonText: "موسم",
    delete: "حذف کریں",
    fillAll: "براہ کرم تمام معلومات درج کریں۔",
    invalidLand: "براہ کرم 0 سے زیادہ زمین کا درست رقبہ درج کریں۔",
    acre: "ایکڑ",
    hectare: "ہیکٹر",
    bigha: "بیگھا",
    katha: "کٹھا",
    decimal: "ڈیسمل",
    squareMeter: "مربع میٹر",
    squareFeet: "مربع فٹ",
  },
};

const landUnits: LandUnit[] = [
  "Acre",
  "Hectare",
  "Bigha",
  "Katha",
  "Decimal",
  "Square Meter",
  "Square Feet",
];

export default function CropsPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");
  const [crops, setCrops] = useState<Crop[]>([]);

  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [landUnit, setLandUnit] = useState<LandUnit | "">("");
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
      const parsedCrops = JSON.parse(savedCrops);

      if (Array.isArray(parsedCrops)) {
        // Old data compatibility:
        // Agar purane crop data mein landUnit nahi hai,
        // to default Acre use hoga.
        const fixedCrops: Crop[] = parsedCrops.map((item) => ({
          ...item,
          landUnit: item.landUnit || "Acre",
        }));

        setCrops(fixedCrops);
        setShowAddForm(fixedCrops.length === 0);
      } else {
        setCrops([]);
        setShowAddForm(true);
      }
    } catch {
      setCrops([]);
      setShowAddForm(true);
    }
  }, []);

  const t = translations[language] || translations.en;

  const getSeasonName = (value: string) => {
    if (value === "Kharif") return t.kharif;
    if (value === "Rabi") return t.rabi;
    if (value === "Zaid") return t.zaid;
    if (value === "Other") return t.other;

    return value;
  };

  const getLandUnitName = (value: LandUnit) => {
    switch (value) {
      case "Acre":
        return t.acre;

      case "Hectare":
        return t.hectare;

      case "Bigha":
        return t.bigha;

      case "Katha":
        return t.katha;

      case "Decimal":
        return t.decimal;

      case "Square Meter":
        return t.squareMeter;

      case "Square Feet":
        return t.squareFeet;

      default:
        return value;
    }
  };

  const addCrop = (e: React.FormEvent) => {
    e.preventDefault();

    if (!season || !crop.trim() || !landUnit || !land) {
      alert(t.fillAll);
      return;
    }

    const landNumber = Number(land);

    if (!Number.isFinite(landNumber) || landNumber <= 0) {
      alert(t.invalidLand);
      return;
    }

    const newCrop: Crop = {
      id: Date.now(),
      season,
      crop: crop.trim(),
      land: land,
      landUnit,
    };

    const updatedCrops = [...crops, newCrop];

    setCrops(updatedCrops);

    localStorage.setItem(
      "farmerCrops",
      JSON.stringify(updatedCrops)
    );

    setSeason("");
    setCrop("");
    setLandUnit("");
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

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() => router.push("/dashboard")}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.back}
        </button>

        {/* Header */}
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

        {/* Add Crop Form */}
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

              {/* Season */}
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

              {/* Crop */}
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

              {/* Land Unit */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.land}
                </label>

                <select
                  value={landUnit}
                  onChange={(e) =>
                    setLandUnit(e.target.value as LandUnit)
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                >

                  <option value="">
                    {t.selectLandUnit}
                  </option>

                  {landUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {getLandUnitName(unit)}
                    </option>
                  ))}

                </select>

              </div>

              {/* Land Amount */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.landAmount}
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={land}
                  onChange={(e) => setLand(e.target.value)}
                  placeholder={t.landAmountPlaceholder}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
                />

                {landUnit && (
                  <p className="text-sm text-gray-500 mt-2">
                    {getLandUnitName(landUnit)}
                  </p>
                )}

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
              >
                + {t.addCrop}
              </button>

            </form>

          </div>
        )}

        {/* Crop List */}
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

                    {/* Crop Details */}
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
                            {getSeasonName(item.season)}{" "}
                            {t.seasonText}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            {t.landText}: {item.land}{" "}
                            {getLandUnitName(
                              item.landUnit || "Acre"
                            )}
                          </p>

                        </div>

                      </div>

                    </button>

                    {/* Delete */}
                    <button
                      type="button"
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

          {/* Add Another Crop */}
          {crops.length > 0 && !showAddForm && (
            <button
              type="button"
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