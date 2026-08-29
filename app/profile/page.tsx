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

type Translation = {
  title: string;
  subtitle: string;
  fullName: string;
  fullNamePlaceholder: string;
  mobile: string;
  mobilePlaceholder: string;
  locationDetails: string;
  pinCode: string;
  pinCodePlaceholder: string;
  state: string;
  statePlaceholder: string;
  district: string;
  districtPlaceholder: string;
  villageCityTown: string;
  villageCityTownPlaceholder: string;
  save: string;
  back: string;
  saved: string;
  fetchingLocation: string;
  locationFound: string;
  locationNotFound: string;
  selectState: string;
  selectDistrict: string;
};

const translations: Record<LanguageCode, Translation> = {
  en: {
    title: "Farmer Profile",
    subtitle: "Tell us about yourself",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    mobile: "Mobile Number",
    mobilePlaceholder: "9876543210",
    locationDetails: "Location Details",
    pinCode: "PIN Code",
    pinCodePlaceholder: "Enter 6-digit PIN code",
    state: "State",
    statePlaceholder: "Type or select state",
    district: "District",
    districtPlaceholder: "Type or select district",
    villageCityTown: "Village / City / Town",
    villageCityTownPlaceholder: "Enter village, city or town",
    save: "Save Profile",
    back: "Back to Dashboard",
    saved: "Profile saved successfully!",
    fetchingLocation: "Finding your location...",
    locationFound: "Location found from PIN code",
    locationNotFound: "PIN code location not found. Please select state and district manually.",
    selectState: "Select State",
    selectDistrict: "Select District",
  },

  hi: {
    title: "किसान प्रोफाइल",
    subtitle: "अपने बारे में जानकारी दें",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    mobile: "मोबाइल नंबर",
    mobilePlaceholder: "9876543210",
    locationDetails: "स्थान की जानकारी",
    pinCode: "पिन कोड",
    pinCodePlaceholder: "6 अंकों का पिन कोड दर्ज करें",
    state: "राज्य",
    statePlaceholder: "राज्य टाइप या चुनें",
    district: "जिला",
    districtPlaceholder: "जिला टाइप या चुनें",
    villageCityTown: "गाँव / शहर / कस्बा",
    villageCityTownPlaceholder: "गाँव, शहर या कस्बे का नाम दर्ज करें",
    save: "प्रोफाइल सेव करें",
    back: "डैशबोर्ड पर वापस जाएँ",
    saved: "प्रोफाइल सफलतापूर्वक सेव हो गई!",
    fetchingLocation: "आपका स्थान खोजा जा रहा है...",
    locationFound: "पिन कोड से स्थान मिल गया",
    locationNotFound:
      "पिन कोड का स्थान नहीं मिला। कृपया राज्य और जिला मैन्युअली चुनें।",
    selectState: "राज्य चुनें",
    selectDistrict: "जिला चुनें",
  },

  mr: {
    title: "शेतकरी प्रोफाइल",
    subtitle: "तुमच्याबद्दल माहिती द्या",
    fullName: "पूर्ण नाव",
    fullNamePlaceholder: "तुमचे पूर्ण नाव टाका",
    mobile: "मोबाईल नंबर",
    mobilePlaceholder: "9876543210",
    locationDetails: "स्थानाची माहिती",
    pinCode: "पिन कोड",
    pinCodePlaceholder: "6 अंकी पिन कोड टाका",
    state: "राज्य",
    statePlaceholder: "राज्य टाइप करा किंवा निवडा",
    district: "जिल्हा",
    districtPlaceholder: "जिल्हा टाइप करा किंवा निवडा",
    villageCityTown: "गाव / शहर / नगर",
    villageCityTownPlaceholder: "गाव, शहर किंवा नगराचे नाव टाका",
    save: "प्रोफाइल सेव्ह करा",
    back: "डॅशबोर्डवर परत जा",
    saved: "प्रोफाइल यशस्वीरित्या सेव्ह झाली!",
    fetchingLocation: "तुमचे स्थान शोधत आहे...",
    locationFound: "पिन कोडवरून स्थान मिळाले",
    locationNotFound:
      "पिन कोडचे स्थान सापडले नाही. कृपया राज्य आणि जिल्हा निवडा.",
    selectState: "राज्य निवडा",
    selectDistrict: "जिल्हा निवडा",
  },

  bn: {
    title: "কৃষক প্রোফাইল",
    subtitle: "আপনার সম্পর্কে তথ্য দিন",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "আপনার পুরো নাম লিখুন",
    mobile: "মোবাইল নম্বর",
    mobilePlaceholder: "9876543210",
    locationDetails: "ঠিকানার তথ্য",
    pinCode: "পিন কোড",
    pinCodePlaceholder: "৬ সংখ্যার পিন কোড লিখুন",
    state: "রাজ্য",
    statePlaceholder: "রাজ্য লিখুন বা নির্বাচন করুন",
    district: "জেলা",
    districtPlaceholder: "জেলা লিখুন বা নির্বাচন করুন",
    villageCityTown: "গ্রাম / শহর / টাউন",
    villageCityTownPlaceholder: "গ্রাম, শহর বা টাউনের নাম লিখুন",
    save: "প্রোফাইল সংরক্ষণ করুন",
    back: "ড্যাশবোর্ডে ফিরে যান",
    saved: "প্রোফাইল সফলভাবে সংরক্ষণ করা হয়েছে!",
    fetchingLocation: "আপনার অবস্থান খোঁজা হচ্ছে...",
    locationFound: "পিন কোড থেকে অবস্থান পাওয়া গেছে",
    locationNotFound:
      "পিন কোডের অবস্থান পাওয়া যায়নি। রাজ্য ও জেলা নির্বাচন করুন।",
    selectState: "রাজ্য নির্বাচন করুন",
    selectDistrict: "জেলা নির্বাচন করুন",
  },

  ta: {
    title: "விவசாயி சுயவிவரம்",
    subtitle: "உங்களைப் பற்றிய தகவலை வழங்கவும்",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
    mobile: "மொபைல் எண்",
    mobilePlaceholder: "9876543210",
    locationDetails: "இருப்பிட விவரங்கள்",
    pinCode: "பின் குறியீடு",
    pinCodePlaceholder: "6 இலக்க பின் குறியீட்டை உள்ளிடவும்",
    state: "மாநிலம்",
    statePlaceholder: "மாநிலத்தை உள்ளிடவும் அல்லது தேர்ந்தெடுக்கவும்",
    district: "மாவட்டம்",
    districtPlaceholder: "மாவட்டத்தை உள்ளிடவும் அல்லது தேர்ந்தெடுக்கவும்",
    villageCityTown: "கிராமம் / நகரம் / டவுன்",
    villageCityTownPlaceholder:
      "கிராமம், நகரம் அல்லது டவுன் பெயரை உள்ளிடவும்",
    save: "சுயவிவரத்தை சேமிக்கவும்",
    back: "டாஷ்போர்டுக்குத் திரும்பு",
    saved: "சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது!",
    fetchingLocation: "உங்கள் இருப்பிடம் தேடப்படுகிறது...",
    locationFound: "PIN குறியீட்டிலிருந்து இருப்பிடம் கிடைத்தது",
    locationNotFound:
      "PIN குறியீட்டின் இருப்பிடம் கிடைக்கவில்லை. மாநிலம் மற்றும் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்.",
    selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
  },

  te: {
    title: "రైతు ప్రొఫైల్",
    subtitle: "మీ గురించి సమాచారం ఇవ్వండి",
    fullName: "పూర్తి పేరు",
    fullNamePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
    mobile: "మొబైల్ నంబర్",
    mobilePlaceholder: "9876543210",
    locationDetails: "ప్రాంత వివరాలు",
    pinCode: "పిన్ కోడ్",
    pinCodePlaceholder: "6 అంకెల పిన్ కోడ్ నమోదు చేయండి",
    state: "రాష్ట్రం",
    statePlaceholder: "రాష్ట్రాన్ని టైప్ చేయండి లేదా ఎంచుకోండి",
    district: "జిల్లా",
    districtPlaceholder: "జిల్లాను టైప్ చేయండి లేదా ఎంచుకోండి",
    villageCityTown: "గ్రామం / నగరం / పట్టణం",
    villageCityTownPlaceholder:
      "గ్రామం, నగరం లేదా పట్టణం పేరు నమోదు చేయండి",
    save: "ప్రొఫైల్ సేవ్ చేయండి",
    back: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",
    saved: "ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!",
    fetchingLocation: "మీ ప్రాంతాన్ని కనుగొంటున్నాము...",
    locationFound: "పిన్ కోడ్ ద్వారా ప్రాంతం కనుగొనబడింది",
    locationNotFound:
      "పిన్ కోడ్ ప్రాంతం కనుగొనబడలేదు. రాష్ట్రం మరియు జిల్లాను ఎంచుకోండి.",
    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    selectDistrict: "జిల్లాను ఎంచుకోండి",
  },

  gu: {
    title: "ખેડૂત પ્રોફાઇલ",
    subtitle: "તમારા વિશે માહિતી આપો",
    fullName: "પૂરું નામ",
    fullNamePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
    mobile: "મોબાઇલ નંબર",
    mobilePlaceholder: "9876543210",
    locationDetails: "સ્થાનની માહિતી",
    pinCode: "પિન કોડ",
    pinCodePlaceholder: "6 અંકનો પિન કોડ દાખલ કરો",
    state: "રાજ્ય",
    statePlaceholder: "રાજ્ય ટાઇપ કરો અથવા પસંદ કરો",
    district: "જિલ્લો",
    districtPlaceholder: "જિલ્લો ટાઇપ કરો અથવા પસંદ કરો",
    villageCityTown: "ગામ / શહેર / નગર",
    villageCityTownPlaceholder: "ગામ, શહેર અથવા નગરનું નામ દાખલ કરો",
    save: "પ્રોફાઇલ સેવ કરો",
    back: "ડેશબોર્ડ પર પાછા જાઓ",
    saved: "પ્રોફાઇલ સફળતાપૂર્વક સેવ થઈ!",
    fetchingLocation: "તમારું સ્થાન શોધી રહ્યા છીએ...",
    locationFound: "પિન કોડ પરથી સ્થાન મળ્યું",
    locationNotFound:
      "પિન કોડનું સ્થાન મળ્યું નથી. કૃપા કરીને રાજ્ય અને જિલ્લો પસંદ કરો.",
    selectState: "રાજ્ય પસંદ કરો",
    selectDistrict: "જિલ્લો પસંદ કરો",
  },

  kn: {
    title: "ರೈತ ಪ್ರೊಫೈಲ್",
    subtitle: "ನಿಮ್ಮ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    fullNamePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    mobilePlaceholder: "9876543210",
    locationDetails: "ಸ್ಥಳದ ವಿವರಗಳು",
    pinCode: "ಪಿನ್ ಕೋಡ್",
    pinCodePlaceholder: "6 ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ",
    state: "ರಾಜ್ಯ",
    statePlaceholder: "ರಾಜ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಆಯ್ಕೆಮಾಡಿ",
    district: "ಜಿಲ್ಲೆ",
    districtPlaceholder: "ಜಿಲ್ಲೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಆಯ್ಕೆಮಾಡಿ",
    villageCityTown: "ಗ್ರಾಮ / ನಗರ / ಪಟ್ಟಣ",
    villageCityTownPlaceholder:
      "ಗ್ರಾಮ, ನಗರ ಅಥವಾ ಪಟ್ಟಣದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    save: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ",
    back: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    saved: "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!",
    fetchingLocation: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    locationFound: "ಪಿನ್ ಕೋಡ್ ಮೂಲಕ ಸ್ಥಳ ಕಂಡುಬಂದಿದೆ",
    locationNotFound:
      "ಪಿನ್ ಕೋಡ್ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    selectState: "ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    selectDistrict: "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",
  },

  ml: {
    title: "കർഷക പ്രൊഫൈൽ",
    subtitle: "നിങ്ങളെക്കുറിച്ചുള്ള വിവരങ്ങൾ നൽകുക",
    fullName: "പൂർണ്ണ പേര്",
    fullNamePlaceholder: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക",
    mobile: "മൊബൈൽ നമ്പർ",
    mobilePlaceholder: "9876543210",
    locationDetails: "സ്ഥല വിവരങ്ങൾ",
    pinCode: "പിൻ കോഡ്",
    pinCodePlaceholder: "6 അക്ക പിൻ കോഡ് നൽകുക",
    state: "സംസ്ഥാനം",
    statePlaceholder: "സംസ്ഥാനം ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ തിരഞ്ഞെടുക്കുക",
    district: "ജില്ല",
    districtPlaceholder: "ജില്ല ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ തിരഞ്ഞെടുക്കുക",
    villageCityTown: "ഗ്രാമം / നഗരം / പട്ടണം",
    villageCityTownPlaceholder:
      "ഗ്രാമം, നഗരം അല്ലെങ്കിൽ പട്ടണത്തിന്റെ പേര് നൽകുക",
    save: "പ്രൊഫൈൽ സേവ് ചെയ്യുക",
    back: "ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക",
    saved: "പ്രൊഫൈൽ വിജയകരമായി സേവ് ചെയ്തു!",
    fetchingLocation: "നിങ്ങളുടെ സ്ഥലം കണ്ടെത്തുന്നു...",
    locationFound: "പിൻ കോഡ് ഉപയോഗിച്ച് സ്ഥലം കണ്ടെത്തി",
    locationNotFound:
      "പിൻ കോഡ് സ്ഥലം കണ്ടെത്താനായില്ല. സംസ്ഥാനം, ജില്ല എന്നിവ തിരഞ്ഞെടുക്കുക.",
    selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    selectDistrict: "ജില്ല തിരഞ്ഞെടുക്കുക",
  },

  pa: {
    title: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ",
    subtitle: "ਆਪਣੇ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿਓ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    fullNamePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    mobile: "ਮੋਬਾਈਲ ਨੰਬਰ",
    mobilePlaceholder: "9876543210",
    locationDetails: "ਸਥਾਨ ਦੀ ਜਾਣਕਾਰੀ",
    pinCode: "ਪਿਨ ਕੋਡ",
    pinCodePlaceholder: "6 ਅੰਕਾਂ ਦਾ ਪਿਨ ਕੋਡ ਦਰਜ ਕਰੋ",
    state: "ਰਾਜ",
    statePlaceholder: "ਰਾਜ ਟਾਈਪ ਜਾਂ ਚੁਣੋ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    districtPlaceholder: "ਜ਼ਿਲ੍ਹਾ ਟਾਈਪ ਜਾਂ ਚੁਣੋ",
    villageCityTown: "ਪਿੰਡ / ਸ਼ਹਿਰ / ਕਸਬਾ",
    villageCityTownPlaceholder:
      "ਪਿੰਡ, ਸ਼ਹਿਰ ਜਾਂ ਕਸਬੇ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    save: "ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ",
    back: "ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ ਜਾਓ",
    saved: "ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਸੇਵ ਹੋ ਗਈ!",
    fetchingLocation: "ਤੁਹਾਡਾ ਸਥਾਨ ਲੱਭਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    locationFound: "ਪਿਨ ਕੋਡ ਤੋਂ ਸਥਾਨ ਮਿਲ ਗਿਆ",
    locationNotFound:
      "ਪਿਨ ਕੋਡ ਦਾ ਸਥਾਨ ਨਹੀਂ ਮਿਲਿਆ। ਰਾਜ ਅਤੇ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ।",
    selectState: "ਰਾਜ ਚੁਣੋ",
    selectDistrict: "ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
  },

  or: {
    title: "ଚାଷୀ ପ୍ରୋଫାଇଲ୍",
    subtitle: "ଆପଣଙ୍କ ବିଷୟରେ ସୂଚନା ଦିଅନ୍ତୁ",
    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    fullNamePlaceholder: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଦିଅନ୍ତୁ",
    mobile: "ମୋବାଇଲ୍ ନମ୍ବର",
    mobilePlaceholder: "9876543210",
    locationDetails: "ସ୍ଥାନ ବିବରଣୀ",
    pinCode: "ପିନ୍ କୋଡ୍",
    pinCodePlaceholder: "6 ଅଙ୍କର ପିନ୍ କୋଡ୍ ଦିଅନ୍ତୁ",
    state: "ରାଜ୍ୟ",
    statePlaceholder: "ରାଜ୍ୟ ଲେଖନ୍ତୁ କିମ୍ବା ବାଛନ୍ତୁ",
    district: "ଜିଲ୍ଲା",
    districtPlaceholder: "ଜିଲ୍ଲା ଲେଖନ୍ତୁ କିମ୍ବା ବାଛନ୍ତୁ",
    villageCityTown: "ଗାଁ / ସହର / ଟାଉନ",
    villageCityTownPlaceholder: "ଗାଁ, ସହର କିମ୍ବା ଟାଉନର ନାମ ଦିଅନ୍ତୁ",
    save: "ପ୍ରୋଫାଇଲ୍ ସେଭ୍ କରନ୍ତୁ",
    back: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    saved: "ପ୍ରୋଫାଇଲ୍ ସଫଳତାର ସହ ସେଭ୍ ହୋଇଛି!",
    fetchingLocation: "ଆପଣଙ୍କ ସ୍ଥାନ ଖୋଜାଯାଉଛି...",
    locationFound: "ପିନ୍ କୋଡ୍ ଦ୍ୱାରା ସ୍ଥାନ ମିଳିଲା",
    locationNotFound:
      "ପିନ୍ କୋଡ୍ ସ୍ଥାନ ମିଳିଲା ନାହିଁ। ରାଜ୍ୟ ଏବଂ ଜିଲ୍ଲା ବାଛନ୍ତୁ।",
    selectState: "ରାଜ୍ୟ ବାଛନ୍ତୁ",
    selectDistrict: "ଜିଲ୍ଲା ବାଛନ୍ତୁ",
  },

  as: {
    title: "কৃষকৰ প্ৰফাইল",
    subtitle: "আপোনাৰ বিষয়ে তথ্য দিয়ক",
    fullName: "সম্পূৰ্ণ নাম",
    fullNamePlaceholder: "আপোনাৰ সম্পূৰ্ণ নাম লিখক",
    mobile: "ম'বাইল নম্বৰ",
    mobilePlaceholder: "9876543210",
    locationDetails: "স্থানৰ তথ্য",
    pinCode: "পিন কোড",
    pinCodePlaceholder: "6 সংখ্যাৰ পিন কোড লিখক",
    state: "ৰাজ্য",
    statePlaceholder: "ৰাজ্য লিখক বা বাছনি কৰক",
    district: "জিলা",
    districtPlaceholder: "জিলা লিখক বা বাছনি কৰক",
    villageCityTown: "গাঁও / চহৰ / নগৰ",
    villageCityTownPlaceholder: "গাঁও, চহৰ বা নগৰৰ নাম লিখক",
    save: "প্ৰফাইল সংৰক্ষণ কৰক",
    back: "ডেশ্বব'ৰ্ডলৈ উভতি যাওক",
    saved: "প্ৰফাইল সফলভাৱে সংৰক্ষণ কৰা হৈছে!",
    fetchingLocation: "আপোনাৰ স্থান বিচৰা হৈছে...",
    locationFound: "পিন কোডৰ পৰা স্থান পোৱা গৈছে",
    locationNotFound:
      "পিন কোডৰ স্থান পোৱা নগ'ল। ৰাজ্য আৰু জিলা বাছনি কৰক।",
    selectState: "ৰাজ্য বাছনি কৰক",
    selectDistrict: "জিলা বাছনি কৰক",
  },

  ur: {
    title: "کسان پروفائل",
    subtitle: "اپنے بارے میں معلومات دیں",
    fullName: "پورا نام",
    fullNamePlaceholder: "اپنا پورا نام درج کریں",
    mobile: "موبائل نمبر",
    mobilePlaceholder: "9876543210",
    locationDetails: "مقام کی معلومات",
    pinCode: "پن کوڈ",
    pinCodePlaceholder: "6 ہندسوں کا پن کوڈ درج کریں",
    state: "ریاست",
    statePlaceholder: "ریاست لکھیں یا منتخب کریں",
    district: "ضلع",
    districtPlaceholder: "ضلع لکھیں یا منتخب کریں",
    villageCityTown: "گاؤں / شہر / قصبہ",
    villageCityTownPlaceholder: "گاؤں، شہر یا قصبے کا نام درج کریں",
    save: "پروفائل محفوظ کریں",
    back: "ڈیش بورڈ پر واپس جائیں",
    saved: "پروفائل کامیابی سے محفوظ ہو گیا!",
    fetchingLocation: "آپ کا مقام تلاش کیا جا رہا ہے...",
    locationFound: "پن کوڈ سے مقام مل گیا",
    locationNotFound:
      "پن کوڈ کا مقام نہیں ملا۔ براہ کرم ریاست اور ضلع منتخب کریں۔",
    selectState: "ریاست منتخب کریں",
    selectDistrict: "ضلع منتخب کریں",
  },
};

/*
  All Indian States + Union Territories.

  Districts are intentionally kept in a large local dataset so
  district suggestions work even when the PIN API is unavailable.

  PIN lookup will still provide the exact state/district whenever
  the external PIN API returns it.
*/
const INDIA_LOCATIONS: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Ananthapuramu",
    "Annamayya",
    "Bapatla",
    "Chittoor",
    "Dr. B. R. Ambedkar Konaseema",
    "East Godavari",
    "Eluru",
    "Guntur",
    "Kakinada",
    "Krishna",
    "Kurnool",
    "Nandyal",
    "NTR",
    "Palnadu",
    "Parvathipuram Manyam",
    "Prakasam",
    "SPSR Nellore",
    "Sri Sathya Sai",
    "Srikakulam",
    "Tirupati",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa",
  ],

  "Arunachal Pradesh": [
    "Anjaw",
    "Bichom",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Itanagar Capital Complex",
    "Kamle",
    "Keyi Panyor",
    "Kra Daadi",
    "Kurung Kumey",
    "Lepa Rada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang",
  ],

  Assam: [
    "Baksa",
    "Bajali",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Dima Hasao",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tamulpur",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
  ],

  Bihar: [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],

  Chhattisgarh: [
    "Balod",
    "Baloda Bazar",
    "Balrampur-Ramanujganj",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurela-Pendra-Marwahi",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Khairagarh-Chhuikhadan-Gandai",
    "Kondagaon",
    "Korba",
    "Korea",
    "Mahasamund",
    "Manendragarh-Chirmiri-Bharatpur",
    "Mohla-Manpur-Ambagarh Chowki",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sakti",
    "Sarangarh-Bilaigarh",
    "Sukma",
    "Surajpur",
    "Surguja",
  ],

  Goa: ["North Goa", "South Goa"],

  Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhumi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kachchh",
    "Kheda",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
  ],

  Haryana: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
  ],

  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
  ],

  Jharkhand: [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahibganj",
    "Seraikela Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],

  Karnataka: [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayanagara",
    "Vijayapura",
    "Yadgir",
  ],

  Kerala: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],

  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Maihar",
    "Mandla",
    "Mandsaur",
    "Mauganj",
    "Morena",
    "Narmadapuram",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Panna",
    "Pandhurna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ],

  Maharashtra: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Chhatrapati Sambhajinagar",
    "Dharashiv",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],

  Manipur: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],

  Meghalaya: [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "Eastern West Khasi Hills",
    "North Garo Hills",
    "Ri-Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
  ],

  Mizoram: [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Saitual",
    "Serchhip",
  ],

  Nagaland: [
    "Chumoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tuensang",
    "Tseminyu",
    "Wokha",
    "Zunheboto",
  ],

  Odisha: [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh",
  ],

  Punjab: [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sahibzada Ajit Singh Nagar",
    "Sangrur",
    "Shaheed Bhagat Singh Nagar",
    "Sri Muktsar Sahib",
    "Tarn Taran",
  ],

  Rajasthan: [
    "Ajmer",
    "Alwar",
    "Anupgarh",
    "Balotra",
    "Banswara",
    "Baran",
    "Barmer",
    "Beawar",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Deeg",
    "Dholpur",
    "Didwana-Kuchaman",
    "Dudu",
    "Dungarpur",
    "Gangapur City",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kekri",
    "Khairthal-Tijara",
    "Kota",
    "Kotputli-Behror",
    "Nagaur",
    "Neem Ka Thana",
    "Pali",
    "Phalodi",
    "Pratapgarh",
    "Rajsamand",
    "Salumbar",
    "Sawai Madhopur",
    "Shahpura",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur",
  ],

  Sikkim: [
    "Gangtok",
    "Gyalshing",
    "Mangan",
    "Namchi",
    "Pakyong",
    "Soreng",
  ],

  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],

  Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanamkonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahbubnagar",
    "Mancherial",
    "Medak",
    "Medchal-Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri",
  ],

  Tripura: [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura",
  ],

  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shravasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ],

  Uttarakhand: [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
  ],

  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Paschim Bardhaman",
    "Purba Bardhaman",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Maldah",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Medinipur",
    "Purba Medinipur",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ],

  "Andaman and Nicobar Islands": [
    "Nicobar",
    "North and Middle Andaman",
    "South Andaman",
  ],

  Chandigarh: ["Chandigarh"],

  "Dadra and Nagar Haveli and Daman and Diu": [
    "Dadra and Nagar Haveli",
    "Daman",
    "Diu",
  ],

  Delhi: [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ],

  "Jammu and Kashmir": [
    "Anantnag",
    "Bandipora",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur",
  ],

  Ladakh: ["Kargil", "Leh"],

  Lakshadweep: ["Lakshadweep"],

  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
};

/*
  These are all keys from INDIA_LOCATIONS.
*/
const STATES = Object.keys(INDIA_LOCATIONS).sort();

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

  const [stateQuery, setStateQuery] = useState("");
  const [districtQuery, setDistrictQuery] = useState("");

  const [showStateSuggestions, setShowStateSuggestions] =
    useState(false);

  const [showDistrictSuggestions, setShowDistrictSuggestions] =
    useState(false);

  const [fetchingLocation, setFetchingLocation] = useState(false);

  const [locationMessage, setLocationMessage] = useState("");

  const t = translations[language] || translations.en;

  /*
    Load language and previously saved farmer profile.
  */
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (
      savedLanguage &&
      Object.prototype.hasOwnProperty.call(translations, savedLanguage)
    ) {
      setLanguage(savedLanguage as LanguageCode);
    }

    const savedProfile = localStorage.getItem("farmerProfile");

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        const savedState = profile.state || "";
        const savedDistrict = profile.district || "";

        setForm({
          name: profile.name || "",
          phone: profile.phone || "",
          pinCode: profile.pinCode || "",
          state: savedState,
          district: savedDistrict,
          village: profile.village || "",
        });

        setStateQuery(savedState);
        setDistrictQuery(savedDistrict);
      } catch {
        // Ignore invalid saved profile
      }
    }
  }, []);

  /*
    PIN CODE LOOKUP

    Uses India Post PIN API:
    https://api.postalpincode.in/pincode/{PIN}

    Example:
    244901 -> State + District will be filled automatically
  */
  useEffect(() => {
    const pin = form.pinCode;

    if (!/^\d{6}$/.test(pin)) {
      setLocationMessage("");
      setFetchingLocation(false);
      return;
    }

    let cancelled = false;

    const fetchPinLocation = async () => {
      try {
        setFetchingLocation(true);
        setLocationMessage("");

        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pin}`
        );

        if (!response.ok) {
          throw new Error("PIN lookup failed");
        }

        const data = await response.json();

        if (cancelled) return;

        const result = data?.[0];

        if (
          result?.Status === "Success" &&
          Array.isArray(result?.PostOffice) &&
          result.PostOffice.length > 0
        ) {
          const postOffice = result.PostOffice[0];

          const apiState = String(postOffice?.State || "").trim();
          const apiDistrict = String(postOffice?.District || "").trim();

          setForm((prev) => ({
            ...prev,
            state: apiState || prev.state,
            district: apiDistrict || prev.district,
          }));

          setStateQuery(apiState);
          setDistrictQuery(apiDistrict);

          setLocationMessage(t.locationFound);
        } else {
          setLocationMessage(t.locationNotFound);
        }
      } catch {
        if (!cancelled) {
          setLocationMessage(t.locationNotFound);
        }
      } finally {
        if (!cancelled) {
          setFetchingLocation(false);
        }
      }
    };

    fetchPinLocation();

    return () => {
      cancelled = true;
    };
  }, [form.pinCode, t.locationFound, t.locationNotFound]);

  /*
    STATE SUGGESTIONS
  */
  const filteredStates = useMemo(() => {
    const query = stateQuery.trim().toLowerCase();

    if (!query) {
      return STATES.slice(0, 12);
    }

    return STATES.filter((state) =>
      state.toLowerCase().includes(query)
    ).slice(0, 12);
  }, [stateQuery]);

  /*
    DISTRICT SUGGESTIONS

    IMPORTANT:
    District list comes ONLY from selected state.
  */
  const filteredDistricts = useMemo(() => {
    const districts = INDIA_LOCATIONS[form.state] || [];
    const query = districtQuery.trim().toLowerCase();

    if (!query) {
      return districts.slice(0, 15);
    }

    return districts
      .filter((district) =>
        district.toLowerCase().includes(query)
      )
      .slice(0, 15);
  }, [form.state, districtQuery]);

  /*
    Generic form change.
  */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);

      setForm((prev) => ({
        ...prev,
        phone: onlyNumbers,
      }));

      return;
    }

    if (name === "pinCode") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 6);

      setForm((prev) => ({
        ...prev,
        pinCode: onlyNumbers,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
    State typing.
  */
  const handleStateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setStateQuery(value);
    setShowStateSuggestions(true);

    /*
      If farmer changes state manually,
      district should be cleared because the old district
      may belong to another state.
    */
    setForm((prev) => ({
      ...prev,
      state: value,
      district: "",
    }));

    setDistrictQuery("");
  };

  /*
    State selection.
  */
  const selectState = (state: string) => {
    setForm((prev) => ({
      ...prev,
      state,
      district: "",
    }));

    setStateQuery(state);
    setDistrictQuery("");

    setShowStateSuggestions(false);
    setShowDistrictSuggestions(false);
  };

  /*
    District typing.
  */
  const handleDistrictChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setDistrictQuery(value);

    setForm((prev) => ({
      ...prev,
      district: value,
    }));

    setShowDistrictSuggestions(true);
  };

  /*
    District selection.
  */
  const selectDistrict = (district: string) => {
    setForm((prev) => ({
      ...prev,
      district,
    }));

    setDistrictQuery(district);
    setShowDistrictSuggestions(false);
  };

  /*
    Save profile.
  */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pinCode)) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    if (!form.state.trim()) {
      alert("Please select or enter your state.");
      return;
    }

    if (!form.district.trim()) {
      alert("Please select or enter your district.");
      return;
    }

    if (!form.village.trim()) {
      alert("Please enter village, city or town.");
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

        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/crops")}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.back}
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-7">

          {/* Header */}
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

            {/* ================= FULL NAME ================= */}
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

            {/* ================= MOBILE ================= */}
            <div className="mb-7">
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

            {/* ================= LOCATION SECTION ================= */}
            <div className="border-t border-gray-200 pt-7 mb-7">

              <h2 className="text-xl font-bold text-green-800 mb-5">
                📍 {t.locationDetails}
              </h2>

              {/* ================= PIN CODE FIRST ================= */}
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

                {/* Loading */}
                {fetchingLocation && (
                  <p className="text-sm text-blue-600 mt-2">
                    🔎 {t.fetchingLocation}
                  </p>
                )}

                {/* Success / Error */}
                {!fetchingLocation &&
                  locationMessage && (
                    <p
                      className={`text-sm mt-2 ${
                        locationMessage === t.locationFound
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {locationMessage === t.locationFound
                        ? "✓ "
                        : "⚠️ "}
                      {locationMessage}
                    </p>
                  )}
              </div>

              {/* ================= STATE ================= */}
              <div className="mb-5 relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.state}
                </label>

                <input
                  name="state"
                  value={stateQuery}
                  onChange={handleStateChange}
                  onFocus={() =>
                    setShowStateSuggestions(true)
                  }
                  autoComplete="off"
                  type="text"
                  placeholder={t.statePlaceholder}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
                />

                {/* State dropdown */}
                {showStateSuggestions &&
                  filteredStates.length > 0 && (
                    <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-64 overflow-y-auto">

                      {filteredStates.map((state) => (
                        <button
                          type="button"
                          key={state}
                          onMouseDown={(e) =>
                            e.preventDefault()
                          }
                          onClick={() =>
                            selectState(state)
                          }
                          className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-800 border-b border-gray-100 last:border-b-0"
                        >
                          {state}
                        </button>
                      ))}
                    </div>
                  )}
              </div>

              {/* ================= DISTRICT ================= */}
              <div className="mb-5 relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.district}
                </label>

                <input
                  name="district"
                  value={districtQuery}
                  onChange={handleDistrictChange}
                  onFocus={() =>
                    setShowDistrictSuggestions(true)
                  }
                  autoComplete="off"
                  type="text"
                  placeholder={
                    form.state
                      ? t.districtPlaceholder
                      : "First select a state"
                  }
                  required
                  disabled={!form.state}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 ${
                    !form.state
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-white"
                  }`}
                />

                {/* District dropdown */}
                {showDistrictSuggestions &&
                  form.state &&
                  filteredDistricts.length > 0 && (
                    <div className="absolute z-40 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-64 overflow-y-auto">

                      {filteredDistricts.map((district) => (
                        <button
                          type="button"
                          key={district}
                          onMouseDown={(e) =>
                            e.preventDefault()
                          }
                          onClick={() =>
                            selectDistrict(district)
                          }
                          className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-800 border-b border-gray-100 last:border-b-0"
                        >
                          {district}
                        </button>
                      ))}
                    </div>
                  )}
              </div>

              {/* ================= VILLAGE / CITY / TOWN ================= */}
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.villageCityTown}
                </label>

                <input
                  name="village"
                  value={form.village}
                  onChange={handleChange}
                  type="text"
                  placeholder={t.villageCityTownPlaceholder}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
                />
              </div>

            </div>

            {/* ================= SAVE ================= */}
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