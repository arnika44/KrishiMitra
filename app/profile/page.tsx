"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type LanguageCode =
  | "en"
  | "hi"
  | "mr"
  | "bn"
  | "ta"
  | "te"
  | "gu"
  | "kn"
  | "ml"
  | "pa"
  | "or"
  | "as"
  | "ur";

type StateItem = {
  name: string;
  slug: string;
};

type DistrictItem = {
  name: string;
  slug: string;
};

type PostOffice = {
  Name?: string;
  District?: string;
  State?: string;
  Block?: string;
  BranchType?: string;
  DeliveryStatus?: string;
};

type PinApiResponse = {
  Message?: string;
  Status?: string;
  PostOffice?: PostOffice[] | null;
};

const translations: Record<LanguageCode, any> = {
  en: {
    title: "Farmer Profile",
    subtitle: "Tell us about yourself",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    mobile: "Mobile Number",
    mobilePlaceholder: "9876543210",

    pinCode: "PIN Code",
    pinCodePlaceholder: "Enter 6-digit PIN code",

    village: "Village / City / Town",
    villagePlaceholder: "Enter or select village, city or town",

    district: "District",
    districtPlaceholder: "Start typing district",

    state: "State",
    statePlaceholder: "Start typing state",

    save: "Save Profile",
    back: "Back to Dashboard",
    saved: "Profile saved successfully!",

    searchingPin: "Finding location...",
    pinFound: "Location found",
    invalidPin: "PIN code not found. Please check the PIN code.",
    loadingStates: "Loading states...",
    loadingDistricts: "Loading districts...",
    noSuggestions: "No matching suggestions found.",
    selectSuggestion: "Select from suggestions",

    enterPinFirst: "Enter PIN code first",
    districtAfterState: "Select a state to see districts",
    locationHelp:
      "Enter your PIN code first. State, district and nearby postal locations will be suggested automatically.",
  },

  hi: {
    title: "किसान प्रोफाइल",
    subtitle: "अपने बारे में जानकारी दें",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    mobile: "मोबाइल नंबर",
    mobilePlaceholder: "9876543210",

    pinCode: "पिन कोड",
    pinCodePlaceholder: "6 अंकों का पिन कोड दर्ज करें",

    village: "गाँव / शहर / कस्बा",
    villagePlaceholder: "गाँव, शहर या कस्बा दर्ज करें",

    district: "जिला",
    districtPlaceholder: "जिले का नाम लिखें",

    state: "राज्य",
    statePlaceholder: "राज्य का नाम लिखें",

    save: "प्रोफाइल सेव करें",
    back: "डैशबोर्ड पर वापस जाएँ",
    saved: "प्रोफाइल सफलतापूर्वक सेव हो गई!",

    searchingPin: "स्थान खोजा जा रहा है...",
    pinFound: "स्थान मिल गया",
    invalidPin: "पिन कोड नहीं मिला। कृपया पिन कोड जाँचें।",
    loadingStates: "राज्य लोड हो रहे हैं...",
    loadingDistricts: "जिले लोड हो रहे हैं...",
    noSuggestions: "कोई मिलान नहीं मिला।",
    selectSuggestion: "सुझाव में से चुनें",

    enterPinFirst: "पहले पिन कोड दर्ज करें",
    districtAfterState: "जिले देखने के लिए पहले राज्य चुनें",
    locationHelp:
      "पहले पिन कोड दर्ज करें। राज्य, जिला और आसपास के स्थान अपने आप सुझाए जाएंगे।",
  },

  mr: {
    title: "शेतकरी प्रोफाइल",
    subtitle: "तुमच्याबद्दल माहिती द्या",
    fullName: "पूर्ण नाव",
    fullNamePlaceholder: "तुमचे पूर्ण नाव टाका",
    mobile: "मोबाईल नंबर",
    mobilePlaceholder: "9876543210",

    pinCode: "पिन कोड",
    pinCodePlaceholder: "6 अंकी पिन कोड टाका",

    village: "गाव / शहर / नगर",
    villagePlaceholder: "गाव, शहर किंवा नगर टाका",

    district: "जिल्हा",
    districtPlaceholder: "जिल्ह्याचे नाव टाका",

    state: "राज्य",
    statePlaceholder: "राज्याचे नाव टाका",

    save: "प्रोफाइल सेव्ह करा",
    back: "डॅशबोर्डवर परत जा",
    saved: "प्रोफाइल यशस्वीरित्या सेव्ह झाली!",

    searchingPin: "स्थान शोधत आहे...",
    pinFound: "स्थान सापडले",
    invalidPin: "पिन कोड सापडला नाही.",
    loadingStates: "राज्ये लोड होत आहेत...",
    loadingDistricts: "जिल्हे लोड होत आहेत...",
    noSuggestions: "कोणतेही जुळणारे पर्याय सापडले नाहीत.",
    selectSuggestion: "पर्यायामधून निवडा",

    enterPinFirst: "प्रथम पिन कोड टाका",
    districtAfterState: "जिल्हे पाहण्यासाठी राज्य निवडा",
    locationHelp:
      "प्रथम पिन कोड टाका. राज्य, जिल्हा आणि जवळची ठिकाणे आपोआप सुचवली जातील.",
  },

  bn: {
    title: "কৃষক প্রোফাইল",
    subtitle: "আপনার সম্পর্কে তথ্য দিন",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "আপনার পুরো নাম লিখুন",
    mobile: "মোবাইল নম্বর",
    mobilePlaceholder: "9876543210",

    pinCode: "পিন কোড",
    pinCodePlaceholder: "৬ সংখ্যার পিন কোড লিখুন",

    village: "গ্রাম / শহর / টাউন",
    villagePlaceholder: "গ্রাম, শহর বা টাউন লিখুন",

    district: "জেলা",
    districtPlaceholder: "জেলার নাম লিখুন",

    state: "রাজ্য",
    statePlaceholder: "রাজ্যের নাম লিখুন",

    save: "প্রোফাইল সংরক্ষণ করুন",
    back: "ড্যাশবোর্ডে ফিরে যান",
    saved: "প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!",

    searchingPin: "স্থান খোঁজা হচ্ছে...",
    pinFound: "স্থান পাওয়া গেছে",
    invalidPin: "পিন কোড পাওয়া যায়নি।",
    loadingStates: "রাজ্য লোড হচ্ছে...",
    loadingDistricts: "জেলা লোড হচ্ছে...",
    noSuggestions: "কোনও মিল পাওয়া যায়নি।",
    selectSuggestion: "পরামর্শ থেকে নির্বাচন করুন",

    enterPinFirst: "প্রথমে পিন কোড দিন",
    districtAfterState: "জেলা দেখতে রাজ্য নির্বাচন করুন",
    locationHelp:
      "প্রথমে পিন কোড দিন। রাজ্য, জেলা এবং কাছাকাছি স্থান স্বয়ংক্রিয়ভাবে সাজেস্ট হবে।",
  },

  ta: {
    title: "விவசாயி சுயவிவரம்",
    subtitle: "உங்களைப் பற்றிய தகவலை வழங்கவும்",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
    mobile: "மொபைல் எண்",
    mobilePlaceholder: "9876543210",

    pinCode: "பின் குறியீடு",
    pinCodePlaceholder: "6 இலக்க பின் குறியீட்டை உள்ளிடவும்",

    village: "கிராமம் / நகரம் / டவுன்",
    villagePlaceholder: "கிராமம், நகரம் அல்லது டவுனை உள்ளிடவும்",

    district: "மாவட்டம்",
    districtPlaceholder: "மாவட்டத்தின் பெயரை உள்ளிடவும்",

    state: "மாநிலம்",
    statePlaceholder: "மாநிலத்தின் பெயரை உள்ளிடவும்",

    save: "சுயவிவரத்தை சேமிக்கவும்",
    back: "டாஷ்போர்டுக்குத் திரும்பு",
    saved: "சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது!",

    searchingPin: "இடம் தேடப்படுகிறது...",
    pinFound: "இடம் கிடைத்தது",
    invalidPin: "பின் குறியீடு கிடைக்கவில்லை.",
    loadingStates: "மாநிலங்கள் ஏற்றப்படுகின்றன...",
    loadingDistricts: "மாவட்டங்கள் ஏற்றப்படுகின்றன...",
    noSuggestions: "பொருத்தமான பரிந்துரைகள் இல்லை.",
    selectSuggestion: "பரிந்துரையிலிருந்து தேர்ந்தெடுக்கவும்",

    enterPinFirst: "முதலில் பின் குறியீட்டை உள்ளிடவும்",
    districtAfterState: "மாவட்டங்களை பார்க்க மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    locationHelp:
      "முதலில் பின் குறியீட்டை உள்ளிடவும். மாநிலம், மாவட்டம் மற்றும் அருகிலுள்ள இடங்கள் தானாக பரிந்துரைக்கப்படும்.",
  },

  te: {
    title: "రైతు ప్రొఫైల్",
    subtitle: "మీ గురించి సమాచారం ఇవ్వండి",
    fullName: "పూర్తి పేరు",
    fullNamePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
    mobile: "మొబైల్ నంబర్",
    mobilePlaceholder: "9876543210",

    pinCode: "పిన్ కోడ్",
    pinCodePlaceholder: "6 అంకెల పిన్ కోడ్ నమోదు చేయండి",

    village: "గ్రామం / నగరం / పట్టణం",
    villagePlaceholder: "గ్రామం, నగరం లేదా పట్టణం నమోదు చేయండి",

    district: "జిల్లా",
    districtPlaceholder: "జిల్లా పేరు నమోదు చేయండి",

    state: "రాష్ట్రం",
    statePlaceholder: "రాష్ట్రం పేరు నమోదు చేయండి",

    save: "ప్రొఫైల్ సేవ్ చేయండి",
    back: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",
    saved: "ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!",

    searchingPin: "స్థానం వెతుకుతోంది...",
    pinFound: "స్థానం కనుగొనబడింది",
    invalidPin: "పిన్ కోడ్ కనుగొనబడలేదు.",
    loadingStates: "రాష్ట్రాలు లోడ్ అవుతున్నాయి...",
    loadingDistricts: "జిల్లాలు లోడ్ అవుతున్నాయి...",
    noSuggestions: "సరిపోలే సూచనలు లేవు.",
    selectSuggestion: "సూచనల నుండి ఎంచుకోండి",

    enterPinFirst: "ముందుగా పిన్ కోడ్ నమోదు చేయండి",
    districtAfterState: "జిల్లాలను చూడటానికి రాష్ట్రాన్ని ఎంచుకోండి",
    locationHelp:
      "ముందుగా పిన్ కోడ్ నమోదు చేయండి. రాష్ట్రం, జిల్లా మరియు సమీప ప్రాంతాలు ఆటోమేటిక్‌గా సూచించబడతాయి.",
  },

  gu: {
    title: "ખેડૂત પ્રોફાઇલ",
    subtitle: "તમારા વિશે માહિતી આપો",
    fullName: "પૂરું નામ",
    fullNamePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
    mobile: "મોબાઇલ નંબર",
    mobilePlaceholder: "9876543210",

    pinCode: "પિન કોડ",
    pinCodePlaceholder: "6 અંકનો પિન કોડ દાખલ કરો",

    village: "ગામ / શહેર / ટાઉન",
    villagePlaceholder: "ગામ, શહેર અથવા ટાઉન દાખલ કરો",

    district: "જિલ્લો",
    districtPlaceholder: "જિલ્લાનું નામ દાખલ કરો",

    state: "રાજ્ય",
    statePlaceholder: "રાજ્યનું નામ દાખલ કરો",

    save: "પ્રોફાઇલ સેવ કરો",
    back: "ડેશબોર્ડ પર પાછા જાઓ",
    saved: "પ્રોફાઇલ સફળતાપૂર્વક સેવ થઈ!",

    searchingPin: "સ્થાન શોધી રહ્યા છીએ...",
    pinFound: "સ્થાન મળી ગયું",
    invalidPin: "પિન કોડ મળ્યો નથી.",
    loadingStates: "રાજ્યો લોડ થઈ રહ્યા છે...",
    loadingDistricts: "જિલ્લાઓ લોડ થઈ રહ્યા છે...",
    noSuggestions: "કોઈ મેળ ખાતા વિકલ્પો મળ્યા નથી.",
    selectSuggestion: "સૂચનમાંથી પસંદ કરો",

    enterPinFirst: "પહેલા પિન કોડ દાખલ કરો",
    districtAfterState: "જિલ્લાઓ જોવા માટે રાજ્ય પસંદ કરો",
    locationHelp:
      "પહેલા પિન કોડ દાખલ કરો. રાજ્ય, જિલ્લો અને નજીકના સ્થળો આપમેળે સૂચવાશે.",
  },

  kn: {
    title: "ರೈತ ಪ್ರೊಫೈಲ್",
    subtitle: "ನಿಮ್ಮ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    fullNamePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    mobilePlaceholder: "9876543210",

    pinCode: "ಪಿನ್ ಕೋಡ್",
    pinCodePlaceholder: "6 ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ",

    village: "ಗ್ರಾಮ / ನಗರ / ಪಟ್ಟಣ",
    villagePlaceholder: "ಗ್ರಾಮ, ನಗರ ಅಥವಾ ಪಟ್ಟಣ ನಮೂದಿಸಿ",

    district: "ಜಿಲ್ಲೆ",
    districtPlaceholder: "ಜಿಲ್ಲೆಯ ಹೆಸರು ನಮೂದಿಸಿ",

    state: "ರಾಜ್ಯ",
    statePlaceholder: "ರಾಜ್ಯದ ಹೆಸರು ನಮೂದಿಸಿ",

    save: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ",
    back: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    saved: "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!",

    searchingPin: "ಸ್ಥಳ ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    pinFound: "ಸ್ಥಳ ಕಂಡುಬಂದಿದೆ",
    invalidPin: "ಪಿನ್ ಕೋಡ್ ಕಂಡುಬಂದಿಲ್ಲ.",
    loadingStates: "ರಾಜ್ಯಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    loadingDistricts: "ಜಿಲ್ಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    noSuggestions: "ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಯ ಸಲಹೆಗಳಿಲ್ಲ.",
    selectSuggestion: "ಸಲಹೆಯಿಂದ ಆಯ್ಕೆಮಾಡಿ",

    enterPinFirst: "ಮೊದಲು ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ",
    districtAfterState: "ಜಿಲ್ಲೆಗಳನ್ನು ನೋಡಲು ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    locationHelp:
      "ಮೊದಲು ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ. ರಾಜ್ಯ, ಜಿಲ್ಲೆ ಮತ್ತು ಹತ್ತಿರದ ಸ್ಥಳಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸೂಚಿಸಲಾಗುತ್ತದೆ.",
  },

  ml: {
    title: "കർഷക പ്രൊഫൈൽ",
    subtitle: "നിങ്ങളെക്കുറിച്ചുള്ള വിവരങ്ങൾ നൽകുക",
    fullName: "പൂർണ്ണ പേര്",
    fullNamePlaceholder: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക",
    mobile: "മൊബൈൽ നമ്പർ",
    mobilePlaceholder: "9876543210",

    pinCode: "പിൻ കോഡ്",
    pinCodePlaceholder: "6 അക്ക പിൻ കോഡ് നൽകുക",

    village: "ഗ്രാമം / നഗരം / ടൗൺ",
    villagePlaceholder: "ഗ്രാമം, നഗരം അല്ലെങ്കിൽ ടൗൺ നൽകുക",

    district: "ജില്ല",
    districtPlaceholder: "ജില്ലയുടെ പേര് നൽകുക",

    state: "സംസ്ഥാനം",
    statePlaceholder: "സംസ്ഥാനത്തിന്റെ പേര് നൽകുക",

    save: "പ്രൊഫൈൽ സേവ് ചെയ്യുക",
    back: "ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക",
    saved: "പ്രൊഫൈൽ വിജയകരമായി സേവ് ചെയ്തു!",

    searchingPin: "സ്ഥലം കണ്ടെത്തുന്നു...",
    pinFound: "സ്ഥലം കണ്ടെത്തി",
    invalidPin: "പിൻ കോഡ് കണ്ടെത്താനായില്ല.",
    loadingStates: "സംസ്ഥാനങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
    loadingDistricts: "ജില്ലകൾ ലോഡ് ചെയ്യുന്നു...",
    noSuggestions: "പൊരുത്തപ്പെടുന്ന നിർദ്ദേശങ്ങളില്ല.",
    selectSuggestion: "നിർദ്ദേശത്തിൽ നിന്ന് തിരഞ്ഞെടുക്കുക",

    enterPinFirst: "ആദ്യം പിൻ കോഡ് നൽകുക",
    districtAfterState: "ജില്ലകൾ കാണാൻ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    locationHelp:
      "ആദ്യം പിൻ കോഡ് നൽകുക. സംസ്ഥാനം, ജില്ല, സമീപ പ്രദേശങ്ങൾ എന്നിവ സ്വയം നിർദ്ദേശിക്കും.",
  },

  pa: {
    title: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ",
    subtitle: "ਆਪਣੇ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿਓ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    fullNamePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    mobile: "ਮੋਬਾਈਲ ਨੰਬਰ",
    mobilePlaceholder: "9876543210",

    pinCode: "ਪਿਨ ਕੋਡ",
    pinCodePlaceholder: "6 ਅੰਕਾਂ ਦਾ ਪਿਨ ਕੋਡ ਦਰਜ ਕਰੋ",

    village: "ਪਿੰਡ / ਸ਼ਹਿਰ / ਕਸਬਾ",
    villagePlaceholder: "ਪਿੰਡ, ਸ਼ਹਿਰ ਜਾਂ ਕਸਬਾ ਦਰਜ ਕਰੋ",

    district: "ਜ਼ਿਲ੍ਹਾ",
    districtPlaceholder: "ਜ਼ਿਲ੍ਹੇ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",

    state: "ਰਾਜ",
    statePlaceholder: "ਰਾਜ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",

    save: "ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ",
    back: "ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ ਜਾਓ",
    saved: "ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਸੇਵ ਹੋ ਗਈ!",

    searchingPin: "ਸਥਾਨ ਲੱਭਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    pinFound: "ਸਥਾਨ ਮਿਲ ਗਿਆ",
    invalidPin: "ਪਿਨ ਕੋਡ ਨਹੀਂ ਮਿਲਿਆ।",
    loadingStates: "ਰਾਜ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",
    loadingDistricts: "ਜ਼ਿਲ੍ਹੇ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",
    noSuggestions: "ਕੋਈ ਮਿਲਦਾ ਸੁਝਾਅ ਨਹੀਂ ਮਿਲਿਆ।",
    selectSuggestion: "ਸੁਝਾਅ ਵਿੱਚੋਂ ਚੁਣੋ",

    enterPinFirst: "ਪਹਿਲਾਂ ਪਿਨ ਕੋਡ ਦਰਜ ਕਰੋ",
    districtAfterState: "ਜ਼ਿਲ੍ਹੇ ਦੇਖਣ ਲਈ ਰਾਜ ਚੁਣੋ",
    locationHelp:
      "ਪਹਿਲਾਂ ਪਿਨ ਕੋਡ ਦਰਜ ਕਰੋ। ਰਾਜ, ਜ਼ਿਲ੍ਹਾ ਅਤੇ ਨੇੜਲੇ ਸਥਾਨ ਆਪਣੇ ਆਪ ਸੁਝਾਏ ਜਾਣਗੇ।",
  },

  or: {
    title: "ଚାଷୀ ପ୍ରୋଫାଇଲ୍",
    subtitle: "ଆପଣଙ୍କ ବିଷୟରେ ସୂଚନା ଦିଅନ୍ତୁ",
    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    fullNamePlaceholder: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଦିଅନ୍ତୁ",
    mobile: "ମୋବାଇଲ୍ ନମ୍ବର",
    mobilePlaceholder: "9876543210",

    pinCode: "ପିନ୍ କୋଡ୍",
    pinCodePlaceholder: "6 ଅଙ୍କର ପିନ୍ କୋଡ୍ ଦିଅନ୍ତୁ",

    village: "ଗାଁ / ସହର / ଟାଉନ୍",
    villagePlaceholder: "ଗାଁ, ସହର କିମ୍ବା ଟାଉନ୍ ଦିଅନ୍ତୁ",

    district: "ଜିଲ୍ଲା",
    districtPlaceholder: "ଜିଲ୍ଲାର ନାମ ଦିଅନ୍ତୁ",

    state: "ରାଜ୍ୟ",
    statePlaceholder: "ରାଜ୍ୟର ନାମ ଦିଅନ୍ତୁ",

    save: "ପ୍ରୋଫାଇଲ୍ ସେଭ୍ କରନ୍ତୁ",
    back: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    saved: "ପ୍ରୋଫାଇଲ୍ ସଫଳତାର ସହ ସେଭ୍ ହୋଇଛି!",

    searchingPin: "ସ୍ଥାନ ଖୋଜାଯାଉଛି...",
    pinFound: "ସ୍ଥାନ ମିଳିଲା",
    invalidPin: "ପିନ୍ କୋଡ୍ ମିଳିଲା ନାହିଁ।",
    loadingStates: "ରାଜ୍ୟ ଲୋଡ୍ ହେଉଛି...",
    loadingDistricts: "ଜିଲ୍ଲା ଲୋଡ୍ ହେଉଛି...",
    noSuggestions: "କୌଣସି ମେଳ ମିଳିଲା ନାହିଁ।",
    selectSuggestion: "ପରାମର୍ଶରୁ ବାଛନ୍ତୁ",

    enterPinFirst: "ପ୍ରଥମେ ପିନ୍ କୋଡ୍ ଦିଅନ୍ତୁ",
    districtAfterState: "ଜିଲ୍ଲା ଦେଖିବା ପାଇଁ ରାଜ୍ୟ ବାଛନ୍ତୁ",
    locationHelp:
      "ପ୍ରଥମେ ପିନ୍ କୋଡ୍ ଦିଅନ୍ତୁ। ରାଜ୍ୟ, ଜିଲ୍ଲା ଏବଂ ନିକଟସ୍ଥ ସ୍ଥାନ ସ୍ୱୟଂଚାଳିତ ଭାବେ ସୁପାରିଶ ହେବ।",
  },

  as: {
    title: "কৃষকৰ প্ৰফাইল",
    subtitle: "আপোনাৰ বিষয়ে তথ্য দিয়ক",
    fullName: "সম্পূৰ্ণ নাম",
    fullNamePlaceholder: "আপোনাৰ সম্পূৰ্ণ নাম লিখক",
    mobile: "ম'বাইল নম্বৰ",
    mobilePlaceholder: "9876543210",

    pinCode: "পিন কোড",
    pinCodePlaceholder: "6 সংখ্যাৰ পিন কোড লিখক",

    village: "গাঁও / চহৰ / টাউন",
    villagePlaceholder: "গাঁও, চহৰ বা টাউন লিখক",

    district: "জিলা",
    districtPlaceholder: "জিলাৰ নাম লিখক",

    state: "ৰাজ্য",
    statePlaceholder: "ৰাজ্যৰ নাম লিখক",

    save: "প্ৰফাইল সংৰক্ষণ কৰক",
    back: "ডেশ্বব'ৰ্ডলৈ উভতি যাওক",
    saved: "প্ৰফাইল সফলভাৱে সংৰক্ষণ কৰা হৈছে!",

    searchingPin: "স্থান বিচৰা হৈছে...",
    pinFound: "স্থান পোৱা গ'ল",
    invalidPin: "পিন কোড পোৱা নগ'ল।",
    loadingStates: "ৰাজ্যসমূহ লোড হৈ আছে...",
    loadingDistricts: "জিলাসমূহ লোড হৈ আছে...",
    noSuggestions: "কোনো মিল থকা পৰামৰ্শ পোৱা নগ'ল।",
    selectSuggestion: "পৰামৰ্শৰ পৰা বাছনি কৰক",

    enterPinFirst: "প্ৰথমে পিন কোড দিয়ক",
    districtAfterState: "জিলা চাবলৈ ৰাজ্য বাছনি কৰক",
    locationHelp:
      "প্ৰথমে পিন কোড দিয়ক। ৰাজ্য, জিলা আৰু ওচৰৰ স্থানসমূহ স্বয়ংক্ৰিয়ভাৱে পৰামৰ্শ দিয়া হ'ব।",
  },

  ur: {
    title: "کسان پروفائل",
    subtitle: "اپنے بارے میں معلومات دیں",
    fullName: "پورا نام",
    fullNamePlaceholder: "اپنا پورا نام درج کریں",
    mobile: "موبائل نمبر",
    mobilePlaceholder: "9876543210",

    pinCode: "پن کوڈ",
    pinCodePlaceholder: "6 ہندسوں کا پن کوڈ درج کریں",

    village: "گاؤں / شہر / قصبہ",
    villagePlaceholder: "گاؤں، شہر یا قصبہ درج کریں",

    district: "ضلع",
    districtPlaceholder: "ضلع کا نام درج کریں",

    state: "ریاست",
    statePlaceholder: "ریاست کا نام درج کریں",

    save: "پروفائل محفوظ کریں",
    back: "ڈیش بورڈ پر واپس جائیں",
    saved: "پروفائل کامیابی سے محفوظ ہو گیا!",

    searchingPin: "مقام تلاش کیا جا رہا ہے...",
    pinFound: "مقام مل گیا",
    invalidPin: "پن کوڈ نہیں ملا۔",
    loadingStates: "ریاستیں لوڈ ہو رہی ہیں...",
    loadingDistricts: "اضلاع لوڈ ہو رہے ہیں...",
    noSuggestions: "کوئی مماثل تجویز نہیں ملی۔",
    selectSuggestion: "تجویز میں سے منتخب کریں",

    enterPinFirst: "پہلے پن کوڈ درج کریں",
    districtAfterState: "اضلاع دیکھنے کے لیے ریاست منتخب کریں",
    locationHelp:
      "پہلے پن کوڈ درج کریں۔ ریاست، ضلع اور قریبی مقامات خودکار طور پر تجویز کیے جائیں گے۔",
  },
};

export default function FarmerProfile() {
  const router = useRouter();

  const [language, setLanguage] = useState<LanguageCode>("en");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pinCode: "",
    state: "",
    district: "",
    village: "",
  });

  const [states, setStates] = useState<StateItem[]>([]);
  const [districts, setDistricts] = useState<DistrictItem[]>([]);
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [searchingPin, setSearchingPin] = useState(false);

  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [showDistrictSuggestions, setShowDistrictSuggestions] =
    useState(false);
  const [showVillageSuggestions, setShowVillageSuggestions] =
    useState(false);

  const [pinMessage, setPinMessage] = useState("");

  const t = translations[language] || translations.en;

  /* ---------------------------------------------------------
     LOAD LANGUAGE + SAVED PROFILE
  --------------------------------------------------------- */

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "selectedLanguage"
    ) as LanguageCode | null;

    if (
      savedLanguage &&
      Object.prototype.hasOwnProperty.call(
        translations,
        savedLanguage
      )
    ) {
      setLanguage(savedLanguage);
    }

    const savedProfile = localStorage.getItem("farmerProfile");

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        setForm({
          name: profile.name || "",
          phone: profile.phone || "",
          pinCode: profile.pinCode || "",
          state: profile.state || "",
          district: profile.district || "",
          village: profile.village || "",
        });
      } catch {
        // Ignore invalid saved profile
      }
    }
  }, []);

  /* ---------------------------------------------------------
     LOAD ALL STATES
  --------------------------------------------------------- */

  useEffect(() => {
    const loadStates = async () => {
      try {
        setLoadingStates(true);

        const response = await fetch(
          "https://aniket-thapa.github.io/india-pincode-api/states.json"
        );

        if (!response.ok) {
          throw new Error("Failed to load states");
        }

        const data = await response.json();

        const cleanedStates: StateItem[] = Array.isArray(data)
          ? data.map((item: any) => ({
              name: String(item.name || "").trim(),
              slug: String(item.slug || "").trim(),
            }))
          : [];

        setStates(cleanedStates);
      } catch (error) {
        console.error("State loading error:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    loadStates();
  }, []);

  /* ---------------------------------------------------------
     FETCH DISTRICTS WHEN STATE CHANGES
  --------------------------------------------------------- */

  useEffect(() => {
    const selectedState = states.find(
      (item) =>
        item.name.toLowerCase() ===
        form.state.trim().toLowerCase()
    );

    if (!selectedState) {
      setDistricts([]);
      return;
    }

    const loadDistricts = async () => {
      try {
        setLoadingDistricts(true);

        const response = await fetch(
          `https://aniket-thapa.github.io/india-pincode-api/states/${selectedState.slug}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to load districts");
        }

        const data = await response.json();

        const districtList: DistrictItem[] = Array.isArray(
          data?.districts
        )
          ? data.districts.map((item: any) => ({
              name: String(item.name || "").trim(),
              slug: String(item.slug || "").trim(),
            }))
          : [];

        setDistricts(districtList);
      } catch (error) {
        console.error("District loading error:", error);
        setDistricts([]);
      } finally {
        setLoadingDistricts(false);
      }
    };

    loadDistricts();
  }, [form.state, states]);

  /* ---------------------------------------------------------
     PIN CODE LOOKUP
  --------------------------------------------------------- */

  useEffect(() => {
    const pin = form.pinCode.trim();

    if (!/^\d{6}$/.test(pin)) {
      setPostOffices([]);
      setPinMessage("");
      return;
    }

    const controller = new AbortController();

    const lookupPin = async () => {
      try {
        setSearchingPin(true);
        setPinMessage("");

        const response = await fetch(
          `https://api.pincodeapi.in/api/v1/pincode/${pin}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("PIN lookup failed");
        }

        const data: PinApiResponse | any = await response.json();

        /*
          API formats can differ slightly.
          We support both:
          { PostOffice: [...] }
          and direct arrays.
        */

        let offices: PostOffice[] = [];

        if (Array.isArray(data)) {
          offices = data;
        } else if (Array.isArray(data?.PostOffice)) {
          offices = data.PostOffice;
        } else if (Array.isArray(data?.data)) {
          offices = data.data;
        }

        if (!offices.length) {
          setPostOffices([]);
          setPinMessage(t.invalidPin);
          return;
        }

        setPostOffices(offices);

        const firstOffice = offices[0];

        const detectedState =
          firstOffice?.State?.trim() || "";

        const detectedDistrict =
          firstOffice?.District?.trim() || "";

        if (detectedState) {
          setForm((prev) => ({
            ...prev,
            state: detectedState,
            district: detectedDistrict || prev.district,
          }));
        } else if (detectedDistrict) {
          setForm((prev) => ({
            ...prev,
            district: detectedDistrict,
          }));
        }

        setPinMessage(t.pinFound);
      } catch (error: any) {
        if (error?.name === "AbortError") {
          return;
        }

        console.error("PIN lookup error:", error);

        setPostOffices([]);
        setPinMessage(t.invalidPin);
      } finally {
        setSearchingPin(false);
      }
    };

    lookupPin();

    return () => controller.abort();
  }, [form.pinCode, t.invalidPin, t.pinFound]);

  /* ---------------------------------------------------------
     STATE SUGGESTIONS
  --------------------------------------------------------- */

  const filteredStates = useMemo(() => {
    const query = form.state.trim().toLowerCase();

    if (!query) {
      return states.slice(0, 15);
    }

    return states
      .filter((item) =>
        item.name.toLowerCase().startsWith(query)
      )
      .slice(0, 15);
  }, [states, form.state]);

  /* ---------------------------------------------------------
     DISTRICT SUGGESTIONS
  --------------------------------------------------------- */

  const filteredDistricts = useMemo(() => {
    const query = form.district.trim().toLowerCase();

    if (!query) {
      return districts.slice(0, 20);
    }

    return districts
      .filter((item) =>
        item.name.toLowerCase().startsWith(query)
      )
      .slice(0, 20);
  }, [districts, form.district]);

  /* ---------------------------------------------------------
     VILLAGE / CITY / TOWN SUGGESTIONS
  --------------------------------------------------------- */

  const filteredPostOffices = useMemo(() => {
    const query = form.village.trim().toLowerCase();

    const unique = new Map<string, PostOffice>();

    postOffices.forEach((office) => {
      const name = String(office.Name || "").trim();

      if (!name) return;

      if (
        !query ||
        name.toLowerCase().startsWith(query)
      ) {
        unique.set(name.toLowerCase(), office);
      }
    });

    return Array.from(unique.values()).slice(0, 20);
  }, [postOffices, form.village]);

  /* ---------------------------------------------------------
     CHANGE HANDLER
  --------------------------------------------------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setForm((prev) => ({
        ...prev,
        phone: numericValue,
      }));

      return;
    }

    if (name === "pinCode") {
      const numericValue = value
        .replace(/\D/g, "")
        .slice(0, 6);

      setForm((prev) => ({
        ...prev,
        pinCode: numericValue,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "state") {
      setShowStateSuggestions(true);

      /*
        When user manually changes state,
        old district may no longer belong to it.
      */
      setForm((prev) => ({
        ...prev,
        state: value,
        district: "",
      }));
    }

    if (name === "district") {
      setShowDistrictSuggestions(true);
    }

    if (name === "village") {
      setShowVillageSuggestions(true);
    }
  };

  /* ---------------------------------------------------------
     STATE SELECT
  --------------------------------------------------------- */

  const selectState = (stateName: string) => {
    setForm((prev) => ({
      ...prev,
      state: stateName,
      district: "",
      village: "",
    }));

    setShowStateSuggestions(false);
    setShowDistrictSuggestions(false);
  };

  /* ---------------------------------------------------------
     DISTRICT SELECT
  --------------------------------------------------------- */

  const selectDistrict = (districtName: string) => {
    setForm((prev) => ({
      ...prev,
      district: districtName,
    }));

    setShowDistrictSuggestions(false);
  };

  /* ---------------------------------------------------------
     VILLAGE / CITY / TOWN SELECT
  --------------------------------------------------------- */

  const selectVillage = (office: PostOffice) => {
    const name = String(office.Name || "").trim();

    setForm((prev) => ({
      ...prev,
      village: name,
      district:
        office.District?.trim() || prev.district,
      state:
        office.State?.trim() || prev.state,
    }));

    setShowVillageSuggestions(false);
  };

  /* ---------------------------------------------------------
     SUBMIT
  --------------------------------------------------------- */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert(t.fullNamePlaceholder);
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pinCode)) {
      alert(t.pinCodePlaceholder);
      return;
    }

    if (!form.state.trim()) {
      alert(t.statePlaceholder);
      return;
    }

    if (!form.district.trim()) {
      alert(t.districtPlaceholder);
      return;
    }

    if (!form.village.trim()) {
      alert(t.villagePlaceholder);
      return;
    }

    localStorage.setItem(
      "farmerProfile",
      JSON.stringify(form)
    );

    alert(t.saved);

    router.push("/crops");
  };

  /* ---------------------------------------------------------
     UI
  --------------------------------------------------------- */

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-3xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => router.push("/crops")}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.back}
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-7">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">
              👨‍🌾
            </div>

            <h1 className="text-3xl font-bold text-green-800">
              {t.title}
            </h1>

            <p className="text-gray-600 mt-2">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* =================================================
                FULL NAME
            ================================================= */}

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

            {/* =================================================
                MOBILE
            ================================================= */}

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

            {/* =================================================
                PIN CODE — FIRST LOCATION FIELD
            ================================================= */}

            <div className="mb-5">
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

              <p className="text-xs text-gray-500 mt-2">
                {t.locationHelp}
              </p>

              {searchingPin && (
                <p className="text-sm text-blue-600 mt-2 font-medium">
                  🔎 {t.searchingPin}
                </p>
              )}

              {!searchingPin && pinMessage && (
                <p
                  className={`text-sm mt-2 font-medium ${
                    pinMessage === t.pinFound
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {pinMessage === t.pinFound
                    ? "✓ "
                    : "⚠️ "}
                  {pinMessage}
                </p>
              )}
            </div>

            {/* =================================================
                STATE
            ================================================= */}

            <div className="mb-5 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.state}
              </label>

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                onFocus={() =>
                  setShowStateSuggestions(true)
                }
                autoComplete="off"
                type="text"
                placeholder={t.statePlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

              {showStateSuggestions && (
                <div className="absolute z-30 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">

                  {loadingStates ? (
                    <div className="px-4 py-3 text-gray-500">
                      {t.loadingStates}
                    </div>
                  ) : filteredStates.length > 0 ? (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-400 border-b">
                        {t.selectSuggestion}
                      </div>

                      {filteredStates.map((item) => (
                        <button
                          type="button"
                          key={item.slug}
                          onMouseDown={(e) =>
                            e.preventDefault()
                          }
                          onClick={() =>
                            selectState(item.name)
                          }
                          className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-800"
                        >
                          {item.name}
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-3 text-gray-500">
                      {t.noSuggestions}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                DISTRICT
            ================================================= */}

            <div className="mb-5 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.district}
              </label>

              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                onFocus={() =>
                  setShowDistrictSuggestions(true)
                }
                autoComplete="off"
                type="text"
                placeholder={
                  form.state
                    ? t.districtPlaceholder
                    : t.districtAfterState
                }
                disabled={!form.state}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

              {form.state &&
                showDistrictSuggestions && (
                  <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">

                    {loadingDistricts ? (
                      <div className="px-4 py-3 text-gray-500">
                        {t.loadingDistricts}
                      </div>
                    ) : filteredDistricts.length > 0 ? (
                      <>
                        <div className="px-4 py-2 text-xs text-gray-400 border-b">
                          {t.selectSuggestion}
                        </div>

                        {filteredDistricts.map((item) => (
                          <button
                            type="button"
                            key={item.slug}
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              selectDistrict(item.name)
                            }
                            className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-800"
                          >
                            {item.name}
                          </button>
                        ))}
                      </>
                    ) : (
                      <div className="px-4 py-3 text-gray-500">
                        {t.noSuggestions}
                      </div>
                    )}
                  </div>
                )}
            </div>

            {/* =================================================
                VILLAGE / CITY / TOWN
            ================================================= */}

            <div className="mb-7 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.village}
              </label>

              <input
                name="village"
                value={form.village}
                onChange={handleChange}
                onFocus={() =>
                  setShowVillageSuggestions(true)
                }
                autoComplete="off"
                type="text"
                placeholder={t.villagePlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

              {/* Only show location suggestions after PIN */}
              {postOffices.length > 0 &&
                showVillageSuggestions && (
                  <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">

                    <div className="px-4 py-2 text-xs text-gray-400 border-b">
                      {t.selectSuggestion}
                    </div>

                    {filteredPostOffices.length > 0 ? (
                      filteredPostOffices.map(
                        (office, index) => (
                          <button
                            type="button"
                            key={`${office.Name}-${index}`}
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              selectVillage(office)
                            }
                            className="w-full text-left px-4 py-3 hover:bg-green-50"
                          >
                            <div className="font-semibold text-gray-800">
                              {office.Name}
                            </div>

                            <div className="text-xs text-gray-500 mt-1">
                              {office.District
                                ? `${office.District}, `
                                : ""}
                              {office.State || ""}
                            </div>
                          </button>
                        )
                      )
                    ) : (
                      <div className="px-4 py-3 text-gray-500">
                        {t.noSuggestions}
                      </div>
                    )}
                  </div>
                )}

              {form.pinCode.length < 6 && (
                <p className="text-xs text-gray-400 mt-2">
                  {t.enterPinFirst}
                </p>
              )}
            </div>

            {/* =================================================
                SAVE
            ================================================= */}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
            >
              {t.save}
            </button>

          </form>
        </div>
      </div>

      {/* =====================================================
          CLOSE SUGGESTIONS WHEN CLICKING OUTSIDE
      ===================================================== */}

      <div
        className="fixed inset-0 -z-10"
        onClick={() => {
          setShowStateSuggestions(false);
          setShowDistrictSuggestions(false);
          setShowVillageSuggestions(false);
        }}
      />
    </main>
  );
}