"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const translations = {
  en: {
    title: "Weather",
    subtitle: "Current weather information for your farming area.",
    loading: "Loading Weather...",
    loadingDesc: "Please wait while we fetch the latest weather.",
    unavailable: "Weather Unavailable",
    unavailableDesc: "Weather information could not be loaded.",
    tryAgain: "Try Again",
    back: "Back",
    currentConditions: "Current Conditions",
    feelsLike: "Feels like",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    rainProbability: "Rain Probability",
    farmingAdvice: "Farming Advice",
    irrigation: "Irrigation",
    irrigationDesc:
      "Check rainfall conditions before irrigation. Avoid unnecessary watering when rain is expected.",
    cropCare: "Crop Care",
    cropCareDesc:
      "Monitor temperature, humidity and rainfall conditions regularly for better crop management.",
    rainAlert: "Rain Alert",
    rainAlertDesc:
      "Keep an eye on rainfall probability before spraying fertilizers or pesticides.",
    forecast: "7-Day Forecast",
    rain: "Rain",
    clearSky: "Clear Sky",
    partlyCloudy: "Partly Cloudy",
    foggy: "Foggy",
    drizzle: "Drizzle",
    rainText: "Rain",
    snow: "Snow",
    rainShowers: "Rain Showers",
    thunderstorm: "Thunderstorm",
    unknown: "Unknown",
    location: "Location",
    coordinates: "Coordinates",
  },

  hi: {
    title: "मौसम",
    subtitle: "आपके खेती क्षेत्र की वर्तमान मौसम जानकारी।",
    loading: "मौसम लोड हो रहा है...",
    loadingDesc: "नवीनतम मौसम जानकारी प्राप्त की जा रही है।",
    unavailable: "मौसम उपलब्ध नहीं है",
    unavailableDesc: "मौसम की जानकारी लोड नहीं हो सकी।",
    tryAgain: "फिर कोशिश करें",
    back: "वापस",
    currentConditions: "वर्तमान मौसम",
    feelsLike: "महसूस हो रहा है",
    humidity: "नमी",
    windSpeed: "हवा की गति",
    rainProbability: "बारिश की संभावना",
    farmingAdvice: "खेती की सलाह",
    irrigation: "सिंचाई",
    irrigationDesc:
      "सिंचाई से पहले बारिश की स्थिति देखें। बारिश होने की संभावना हो तो अनावश्यक पानी देने से बचें।",
    cropCare: "फसल की देखभाल",
    cropCareDesc:
      "बेहतर फसल प्रबंधन के लिए तापमान, नमी और बारिश की स्थिति पर नियमित रूप से नजर रखें।",
    rainAlert: "बारिश की चेतावनी",
    rainAlertDesc:
      "खाद या कीटनाशक का छिड़काव करने से पहले बारिश की संभावना जरूर देखें।",
    forecast: "7 दिनों का मौसम पूर्वानुमान",
    rain: "बारिश",
    clearSky: "साफ आसमान",
    partlyCloudy: "आंशिक बादल",
    foggy: "कोहरा",
    drizzle: "बूंदाबांदी",
    rainText: "बारिश",
    snow: "बर्फबारी",
    rainShowers: "बारिश की बौछार",
    thunderstorm: "आंधी-तूफान",
    unknown: "अज्ञात",
    location: "स्थान",
    coordinates: "निर्देशांक",
  },

  bn: {
    title: "আবহাওয়া",
    subtitle: "আপনার কৃষি এলাকার বর্তমান আবহাওয়ার তথ্য।",
    loading: "আবহাওয়া লোড হচ্ছে...",
    loadingDesc: "সর্বশেষ আবহাওয়ার তথ্য সংগ্রহ করা হচ্ছে।",
    unavailable: "আবহাওয়া পাওয়া যাচ্ছে না",
    unavailableDesc: "আবহাওয়ার তথ্য লোড করা যায়নি।",
    tryAgain: "আবার চেষ্টা করুন",
    back: "ফিরে যান",
    currentConditions: "বর্তমান আবহাওয়া",
    feelsLike: "অনুভূত হচ্ছে",
    humidity: "আর্দ্রতা",
    windSpeed: "বাতাসের গতি",
    rainProbability: "বৃষ্টির সম্ভাবনা",
    farmingAdvice: "কৃষি পরামর্শ",
    irrigation: "সেচ",
    irrigationDesc:
      "সেচ দেওয়ার আগে বৃষ্টির সম্ভাবনা পরীক্ষা করুন। বৃষ্টির সম্ভাবনা থাকলে অপ্রয়োজনীয় জল দেওয়া এড়িয়ে চলুন।",
    cropCare: "ফসলের যত্ন",
    cropCareDesc:
      "ভালো ফসল ব্যবস্থাপনার জন্য তাপমাত্রা, আর্দ্রতা এবং বৃষ্টির পরিস্থিতি নিয়মিত পর্যবেক্ষণ করুন।",
    rainAlert: "বৃষ্টি সতর্কতা",
    rainAlertDesc:
      "সার বা কীটনাশক স্প্রে করার আগে বৃষ্টির সম্ভাবনা পরীক্ষা করুন।",
    forecast: "৭ দিনের পূর্বাভাস",
    rain: "বৃষ্টি",
    clearSky: "পরিষ্কার আকাশ",
    partlyCloudy: "আংশিক মেঘলা",
    foggy: "কুয়াশাচ্ছন্ন",
    drizzle: "গুঁড়ি গুঁড়ি বৃষ্টি",
    rainText: "বৃষ্টি",
    snow: "তুষারপাত",
    rainShowers: "বৃষ্টির ঝাপটা",
    thunderstorm: "বজ্রঝড়",
    unknown: "অজানা",
    location: "অবস্থান",
    coordinates: "স্থানাঙ্ক",
  },

  mr: {
    title: "हवामान",
    subtitle: "तुमच्या शेती क्षेत्रातील सध्याची हवामान माहिती.",
    loading: "हवामान लोड होत आहे...",
    loadingDesc: "नवीनतम हवामान माहिती मिळवली जात आहे.",
    unavailable: "हवामान उपलब्ध नाही",
    unavailableDesc: "हवामानाची माहिती लोड करता आली नाही.",
    tryAgain: "पुन्हा प्रयत्न करा",
    back: "मागे",
    currentConditions: "सध्याचे हवामान",
    feelsLike: "जाणवत आहे",
    humidity: "आर्द्रता",
    windSpeed: "वाऱ्याचा वेग",
    rainProbability: "पावसाची शक्यता",
    farmingAdvice: "शेती सल्ला",
    irrigation: "सिंचन",
    irrigationDesc:
      "सिंचन करण्यापूर्वी पावसाची शक्यता तपासा. पाऊस अपेक्षित असल्यास अनावश्यक पाणी देणे टाळा.",
    cropCare: "पिकांची काळजी",
    cropCareDesc:
      "चांगल्या पीक व्यवस्थापनासाठी तापमान, आर्द्रता आणि पावसाच्या परिस्थितीवर नियमित लक्ष ठेवा.",
    rainAlert: "पावसाचा इशारा",
    rainAlertDesc:
      "खते किंवा कीटकनाशकांची फवारणी करण्यापूर्वी पावसाची शक्यता तपासा.",
    forecast: "७ दिवसांचा अंदाज",
    rain: "पाऊस",
    clearSky: "स्वच्छ आकाश",
    partlyCloudy: "अंशतः ढगाळ",
    foggy: "धुके",
    drizzle: "रिमझिम पाऊस",
    rainText: "पाऊस",
    snow: "हिमवृष्टी",
    rainShowers: "पावसाच्या सरी",
    thunderstorm: "वादळ",
    unknown: "अज्ञात",
    location: "स्थान",
    coordinates: "निर्देशांक",
  },

  ta: {
    title: "வானிலை",
    subtitle: "உங்கள் விவசாயப் பகுதியின் தற்போதைய வானிலை தகவல்.",
    loading: "வானிலை ஏற்றப்படுகிறது...",
    loadingDesc: "சமீபத்திய வானிலை தகவலைப் பெறுகிறோம்.",
    unavailable: "வானிலை கிடைக்கவில்லை",
    unavailableDesc: "வானிலை தகவலை ஏற்ற முடியவில்லை.",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",
    back: "பின்செல்",
    currentConditions: "தற்போதைய வானிலை",
    feelsLike: "உணரப்படுகிறது",
    humidity: "ஈரப்பதம்",
    windSpeed: "காற்றின் வேகம்",
    rainProbability: "மழை வாய்ப்பு",
    farmingAdvice: "விவசாய ஆலோசனை",
    irrigation: "நீர்ப்பாசனம்",
    irrigationDesc:
      "நீர்ப்பாசனம் செய்வதற்கு முன் மழை நிலையை சரிபார்க்கவும். மழை எதிர்பார்க்கப்பட்டால் தேவையற்ற நீர்ப்பாசனத்தை தவிர்க்கவும்.",
    cropCare: "பயிர் பராமரிப்பு",
    cropCareDesc:
      "சிறந்த பயிர் மேலாண்மைக்காக வெப்பநிலை, ஈரப்பதம் மற்றும் மழை நிலையை தொடர்ந்து கண்காணிக்கவும்.",
    rainAlert: "மழை எச்சரிக்கை",
    rainAlertDesc:
      "உரம் அல்லது பூச்சிக்கொல்லி தெளிப்பதற்கு முன் மழை வாய்ப்பை சரிபார்க்கவும்.",
    forecast: "7 நாள் வானிலை முன்னறிவிப்பு",
    rain: "மழை",
    clearSky: "தெளிவான வானம்",
    partlyCloudy: "பகுதி மேகமூட்டம்",
    foggy: "மூடுபனி",
    drizzle: "தூறல்",
    rainText: "மழை",
    snow: "பனிப்பொழிவு",
    rainShowers: "மழைத்தூறல்",
    thunderstorm: "இடியுடன் கூடிய மழை",
    unknown: "தெரியவில்லை",
    location: "இடம்",
    coordinates: "ஆயத்தொலைவுகள்",
  },

  te: {
    title: "వాతావరణం",
    subtitle: "మీ వ్యవసాయ ప్రాంతంలోని ప్రస్తుత వాతావరణ సమాచారం.",
    loading: "వాతావరణం లోడ్ అవుతోంది...",
    loadingDesc: "తాజా వాతావరణ సమాచారాన్ని పొందుతున్నాము.",
    unavailable: "వాతావరణ సమాచారం అందుబాటులో లేదు",
    unavailableDesc: "వాతావరణ సమాచారాన్ని లోడ్ చేయలేకపోయాము.",
    tryAgain: "మళ్లీ ప్రయత్నించండి",
    back: "వెనక్కి",
    currentConditions: "ప్రస్తుత వాతావరణం",
    feelsLike: "అనిపిస్తోంది",
    humidity: "తేమ",
    windSpeed: "గాలి వేగం",
    rainProbability: "వర్షం అవకాశం",
    farmingAdvice: "వ్యవసాయ సలహా",
    irrigation: "నీటిపారుదల",
    irrigationDesc:
      "నీటిపారుదల ముందు వర్షం పరిస్థితిని పరిశీలించండి. వర్షం వచ్చే అవకాశం ఉంటే అనవసరంగా నీరు పెట్టవద్దు.",
    cropCare: "పంట సంరక్షణ",
    cropCareDesc:
      "మంచి పంట నిర్వహణ కోసం ఉష్ణోగ్రత, తేమ మరియు వర్షపాతాన్ని క్రమం తప్పకుండా గమనించండి.",
    rainAlert: "వర్షం హెచ్చరిక",
    rainAlertDesc:
      "ఎరువులు లేదా పురుగుమందులు పిచికారీ చేసే ముందు వర్షం అవకాశాన్ని పరిశీలించండి.",
    forecast: "7 రోజుల వాతావరణ అంచనా",
    rain: "వర్షం",
    clearSky: "స్పష్టమైన ఆకాశం",
    partlyCloudy: "పాక్షికంగా మేఘావృతం",
    foggy: "పొగమంచు",
    drizzle: "చినుకులు",
    rainText: "వర్షం",
    snow: "మంచు",
    rainShowers: "వర్షపు జల్లులు",
    thunderstorm: "ఉరుములతో కూడిన వర్షం",
    unknown: "తెలియదు",
    location: "స్థానం",
    coordinates: "కోఆర్డినేట్లు",
  },

  gu: {
    title: "હવામાન",
    subtitle: "તમારા ખેતી વિસ્તારની વર્તમાન હવામાન માહિતી.",
    loading: "હવામાન લોડ થઈ રહ્યું છે...",
    loadingDesc: "નવીનતમ હવામાન માહિતી મેળવી રહ્યા છીએ.",
    unavailable: "હવામાન ઉપલબ્ધ નથી",
    unavailableDesc: "હવામાન માહિતી લોડ થઈ શકી નથી.",
    tryAgain: "ફરી પ્રયાસ કરો",
    back: "પાછા",
    currentConditions: "વર્તમાન હવામાન",
    feelsLike: "લાગે છે",
    humidity: "ભેજ",
    windSpeed: "પવનની ઝડપ",
    rainProbability: "વરસાદની શક્યતા",
    farmingAdvice: "ખેતીની સલાહ",
    irrigation: "સિંચાઈ",
    irrigationDesc:
      "સિંચાઈ પહેલાં વરસાદની સ્થિતિ તપાસો. વરસાદની શક્યતા હોય ત્યારે બિનજરૂરી પાણી આપવાનું ટાળો.",
    cropCare: "પાકની સંભાળ",
    cropCareDesc:
      "સારા પાક વ્યવસ્થાપન માટે તાપમાન, ભેજ અને વરસાદની સ્થિતિનું નિયમિત નિરીક્ષણ કરો.",
    rainAlert: "વરસાદની ચેતવણી",
    rainAlertDesc:
      "ખાતર અથવા જંતુનાશક દવાનો છંટકાવ કરતા પહેલાં વરસાદની શક્યતા તપાસો.",
    forecast: "7 દિવસનું અનુમાન",
    rain: "વરસાદ",
    clearSky: "સ્વચ્છ આકાશ",
    partlyCloudy: "આંશિક વાદળછાયું",
    foggy: "ધુમ્મસ",
    drizzle: "ઝરમર વરસાદ",
    rainText: "વરસાદ",
    snow: "બરફવર્ષા",
    rainShowers: "વરસાદની ઝાપટ",
    thunderstorm: "વાવાઝોડું",
    unknown: "અજ્ઞાત",
    location: "સ્થળ",
    coordinates: "કોઓર્ડિનેટ્સ",
  },

  kn: {
    title: "ಹವಾಮಾನ",
    subtitle: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರದೇಶದ ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಮಾಹಿತಿ.",
    loading: "ಹವಾಮಾನ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    loadingDesc: "ಇತ್ತೀಚಿನ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ.",
    unavailable: "ಹವಾಮಾನ ಲಭ್ಯವಿಲ್ಲ",
    unavailableDesc: "ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    back: "ಹಿಂದೆ",
    currentConditions: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ",
    feelsLike: "ಅನುಭವವಾಗುತ್ತಿದೆ",
    humidity: "ಆರ್ದ್ರತೆ",
    windSpeed: "ಗಾಳಿಯ ವೇಗ",
    rainProbability: "ಮಳೆಯ ಸಾಧ್ಯತೆ",
    farmingAdvice: "ಕೃಷಿ ಸಲಹೆ",
    irrigation: "ನೀರಾವರಿ",
    irrigationDesc:
      "ನೀರಾವರಿ ಮಾಡುವ ಮೊದಲು ಮಳೆಯ ಪರಿಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ. ಮಳೆಯ ಸಾಧ್ಯತೆ ಇದ್ದರೆ ಅನಗತ್ಯ ನೀರು ಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ.",
    cropCare: "ಬೆಳೆ ಆರೈಕೆ",
    cropCareDesc:
      "ಉತ್ತಮ ಬೆಳೆ ನಿರ್ವಹಣೆಗಾಗಿ ತಾಪಮಾನ, ಆರ್ದ್ರತೆ ಮತ್ತು ಮಳೆಯ ಪರಿಸ್ಥಿತಿಯನ್ನು ನಿಯಮಿತವಾಗಿ ಗಮನಿಸಿ.",
    rainAlert: "ಮಳೆ ಎಚ್ಚರಿಕೆ",
    rainAlertDesc:
      "ಗೊಬ್ಬರ ಅಥವಾ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸುವ ಮೊದಲು ಮಳೆಯ ಸಾಧ್ಯತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    forecast: "7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
    rain: "ಮಳೆ",
    clearSky: "ಸ್ಪಷ್ಟ ಆಕಾಶ",
    partlyCloudy: "ಭಾಗಶಃ ಮೋಡ",
    foggy: "ಮಂಜು",
    drizzle: "ತುಂತುರು ಮಳೆ",
    rainText: "ಮಳೆ",
    snow: "ಹಿಮಪಾತ",
    rainShowers: "ಮಳೆಯ ತುಂತುರು",
    thunderstorm: "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
    unknown: "ತಿಳಿದಿಲ್ಲ",
    location: "ಸ್ಥಳ",
    coordinates: "ನಿರ್ದೇಶಾಂಕಗಳು",
  },

  ml: {
    title: "കാലാവസ്ഥ",
    subtitle: "നിങ്ങളുടെ കൃഷി പ്രദേശത്തെ നിലവിലെ കാലാവസ്ഥാ വിവരം.",
    loading: "കാലാവസ്ഥ ലോഡ് ചെയ്യുന്നു...",
    loadingDesc: "ഏറ്റവും പുതിയ കാലാവസ്ഥാ വിവരം ലഭ്യമാക്കുന്നു.",
    unavailable: "കാലാവസ്ഥ ലഭ്യമല്ല",
    unavailableDesc: "കാലാവസ്ഥാ വിവരം ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല.",
    tryAgain: "വീണ്ടും ശ്രമിക്കുക",
    back: "തിരികെ",
    currentConditions: "നിലവിലെ കാലാവസ്ഥ",
    feelsLike: "അനുഭവപ്പെടുന്നു",
    humidity: "ഈർപ്പം",
    windSpeed: "കാറ്റിന്റെ വേഗത",
    rainProbability: "മഴയ്ക്കുള്ള സാധ്യത",
    farmingAdvice: "കൃഷി ഉപദേശം",
    irrigation: "ജലസേചനം",
    irrigationDesc:
      "ജലസേചനത്തിന് മുമ്പ് മഴയുടെ സാഹചര്യം പരിശോധിക്കുക. മഴ പ്രതീക്ഷിക്കുന്നുണ്ടെങ്കിൽ അനാവശ്യമായി വെള്ളം നൽകുന്നത് ഒഴിവാക്കുക.",
    cropCare: "വിള പരിപാലനം",
    cropCareDesc:
      "നല്ല വിള പരിപാലനത്തിനായി താപനില, ഈർപ്പം, മഴ എന്നിവ നിരന്തരം നിരീക്ഷിക്കുക.",
    rainAlert: "മഴ മുന്നറിയിപ്പ്",
    rainAlertDesc:
      "വളം അല്ലെങ്കിൽ കീടനാശിനി തളിക്കുന്നതിന് മുമ്പ് മഴയുടെ സാധ്യത പരിശോധിക്കുക.",
    forecast: "7 ദിവസത്തെ പ്രവചനം",
    rain: "മഴ",
    clearSky: "തെളിഞ്ഞ ആകാശം",
    partlyCloudy: "ഭാഗികമായി മേഘാവൃതം",
    foggy: "മൂടൽമഞ്ഞ്",
    drizzle: "ചാറ്റൽ മഴ",
    rainText: "മഴ",
    snow: "മഞ്ഞുവീഴ്ച",
    rainShowers: "മഴച്ചാറ്റൽ",
    thunderstorm: "ഇടിമിന്നലോടുകൂടിയ മഴ",
    unknown: "അജ്ഞാതം",
    location: "സ്ഥലം",
    coordinates: "കോർഡിനേറ്റുകൾ",
  },

  pa: {
    title: "ਮੌਸਮ",
    subtitle: "ਤੁਹਾਡੇ ਖੇਤੀ ਖੇਤਰ ਦੀ ਮੌਜੂਦਾ ਮੌਸਮ ਜਾਣਕਾਰੀ।",
    loading: "ਮੌਸਮ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    loadingDesc: "ਤਾਜ਼ਾ ਮੌਸਮ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ।",
    unavailable: "ਮੌਸਮ ਉਪਲਬਧ ਨਹੀਂ",
    unavailableDesc: "ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਲੋਡ ਨਹੀਂ ਹੋ ਸਕੀ।",
    tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    back: "ਵਾਪਸ",
    currentConditions: "ਮੌਜੂਦਾ ਮੌਸਮ",
    feelsLike: "ਮਹਿਸੂਸ ਹੋ ਰਿਹਾ ਹੈ",
    humidity: "ਨਮੀ",
    windSpeed: "ਹਵਾ ਦੀ ਗਤੀ",
    rainProbability: "ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ",
    farmingAdvice: "ਖੇਤੀ ਸਲਾਹ",
    irrigation: "ਸਿੰਚਾਈ",
    irrigationDesc:
      "ਸਿੰਚਾਈ ਤੋਂ ਪਹਿਲਾਂ ਮੀਂਹ ਦੀ ਸਥਿਤੀ ਜਾਂਚੋ। ਜੇ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੋਵੇ ਤਾਂ ਬੇਲੋੜਾ ਪਾਣੀ ਦੇਣ ਤੋਂ ਬਚੋ।",
    cropCare: "ਫਸਲ ਦੀ ਦੇਖਭਾਲ",
    cropCareDesc:
      "ਚੰਗੀ ਫਸਲ ਪ੍ਰਬੰਧਨ ਲਈ ਤਾਪਮਾਨ, ਨਮੀ ਅਤੇ ਮੀਂਹ ਦੀ ਸਥਿਤੀ ਦੀ ਨਿਯਮਿਤ ਨਿਗਰਾਨੀ ਕਰੋ।",
    rainAlert: "ਮੀਂਹ ਚੇਤਾਵਨੀ",
    rainAlertDesc:
      "ਖਾਦ ਜਾਂ ਕੀਟਨਾਸ਼ਕ ਛਿੜਕਣ ਤੋਂ ਪਹਿਲਾਂ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਜ਼ਰੂਰ ਜਾਂਚੋ।",
    forecast: "7 ਦਿਨਾਂ ਦਾ ਅਨੁਮਾਨ",
    rain: "ਮੀਂਹ",
    clearSky: "ਸਾਫ਼ ਆਸਮਾਨ",
    partlyCloudy: "ਅੰਸ਼ਕ ਬੱਦਲ",
    foggy: "ਧੁੰਦ",
    drizzle: "ਬੂੰਦਾਬਾਂਦੀ",
    rainText: "ਮੀਂਹ",
    snow: "ਬਰਫ਼ਬਾਰੀ",
    rainShowers: "ਮੀਂਹ ਦੀਆਂ ਛਿੱਟਾਂ",
    thunderstorm: "ਤੂਫ਼ਾਨ",
    unknown: "ਅਣਜਾਣ",
    location: "ਸਥਾਨ",
    coordinates: "ਕੋਆਰਡੀਨੇਟ",
  },

  or: {
    title: "ପାଣିପାଗ",
    subtitle: "ଆପଣଙ୍କ ଚାଷ ଅଞ୍ଚଳର ବର୍ତ୍ତମାନ ପାଣିପାଗ ସୂଚନା।",
    loading: "ପାଣିପାଗ ଲୋଡ୍ ହେଉଛି...",
    loadingDesc: "ସର୍ବଶେଷ ପାଣିପାଗ ସୂଚନା ଆଣୁଛୁ।",
    unavailable: "ପାଣିପାଗ ଉପଲବ୍ଧ ନାହିଁ",
    unavailableDesc: "ପାଣିପାଗ ସୂଚନା ଲୋଡ୍ ହୋଇପାରିଲା ନାହିଁ।",
    tryAgain: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
    back: "ପଛକୁ",
    currentConditions: "ବର୍ତ୍ତମାନ ପାଣିପାଗ",
    feelsLike: "ଅନୁଭବ ହେଉଛି",
    humidity: "ଆର୍ଦ୍ରତା",
    windSpeed: "ପବନର ବେଗ",
    rainProbability: "ବର୍ଷା ସମ୍ଭାବନା",
    farmingAdvice: "ଚାଷ ପରାମର୍ଶ",
    irrigation: "ଜଳସେଚନ",
    irrigationDesc:
      "ଜଳସେଚନ ପୂର୍ବରୁ ବର୍ଷାର ସମ୍ଭାବନା ଯାଞ୍ଚ କରନ୍ତୁ। ବର୍ଷା ହେବାର ସମ୍ଭାବନା ଥିଲେ ଅନାବଶ୍ୟକ ପାଣି ଦେବାରୁ ବଞ୍ଚନ୍ତୁ।",
    cropCare: "ଫସଲ ଯତ୍ନ",
    cropCareDesc:
      "ଭଲ ଫସଲ ପରିଚାଳନା ପାଇଁ ତାପମାତ୍ରା, ଆର୍ଦ୍ରତା ଏବଂ ବର୍ଷାର ସ୍ଥିତି ନିୟମିତ ଯାଞ୍ଚ କରନ୍ତୁ।",
    rainAlert: "ବର୍ଷା ସତର୍କତା",
    rainAlertDesc:
      "ସାର କିମ୍ବା କୀଟନାଶକ ସ୍ପ୍ରେ କରିବା ପୂର୍ବରୁ ବର୍ଷାର ସମ୍ଭାବନା ଯାଞ୍ଚ କରନ୍ତୁ।",
    forecast: "7 ଦିନର ପୂର୍ବାନୁମାନ",
    rain: "ବର୍ଷା",
    clearSky: "ସ୍ୱଚ୍ଛ ଆକାଶ",
    partlyCloudy: "ଆଂଶିକ ମେଘୁଆ",
    foggy: "କୁହୁଡ଼ି",
    drizzle: "ଝିପିଝିପି ବର୍ଷା",
    rainText: "ବର୍ଷା",
    snow: "ତୁଷାରପାତ",
    rainShowers: "ବର୍ଷା ଛିଟା",
    thunderstorm: "ଘଡ଼ଘଡ଼ି ସହ ବର୍ଷା",
    unknown: "ଅଜ୍ଞାତ",
    location: "ସ୍ଥାନ",
    coordinates: "ସ୍ଥାନାଙ୍କ",
  },

  as: {
    title: "বতৰ",
    subtitle: "আপোনাৰ কৃষি অঞ্চলৰ বৰ্তমান বতৰৰ তথ্য।",
    loading: "বতৰ লোড হৈ আছে...",
    loadingDesc: "শেহতীয়া বতৰৰ তথ্য সংগ্ৰহ কৰা হৈছে।",
    unavailable: "বতৰ উপলব্ধ নহয়",
    unavailableDesc: "বতৰৰ তথ্য লোড কৰিব পৰা নগ'ল।",
    tryAgain: "পুনৰ চেষ্টা কৰক",
    back: "পিছলৈ",
    currentConditions: "বৰ্তমান বতৰ",
    feelsLike: "অনুভৱ হৈছে",
    humidity: "আৰ্দ্ৰতা",
    windSpeed: "বতাহৰ গতি",
    rainProbability: "বৰষুণৰ সম্ভাৱনা",
    farmingAdvice: "কৃষি পৰামৰ্শ",
    irrigation: "জলসিঞ্চন",
    irrigationDesc:
      "জলসিঞ্চনৰ আগতে বৰষুণৰ সম্ভাৱনা পৰীক্ষা কৰক। বৰষুণৰ সম্ভাৱনা থাকিলে অপ্ৰয়োজনীয় পানী নিদিব।",
    cropCare: "শস্যৰ যত্ন",
    cropCareDesc:
      "ভাল শস্য ব্যৱস্থাপনাৰ বাবে উষ্ণতা, আৰ্দ্ৰতা আৰু বৰষুণৰ পৰিস্থিতি নিয়মিতভাৱে লক্ষ্য কৰক।",
    rainAlert: "বৰষুণৰ সতৰ্কবাণী",
    rainAlertDesc:
      "সাৰ বা কীটনাশক ছটিয়োৱাৰ আগতে বৰষুণৰ সম্ভাৱনা পৰীক্ষা কৰক।",
    forecast: "৭ দিনৰ পূৰ্বানুমান",
    rain: "বৰষুণ",
    clearSky: "পৰিষ্কাৰ আকাশ",
    partlyCloudy: "আংশিক ডাৱৰীয়া",
    foggy: "কুঁৱলী",
    drizzle: "গাজনি বৰষুণ",
    rainText: "বৰষুণ",
    snow: "তুষাৰপাত",
    rainShowers: "বৰষুণৰ চিটিকনি",
    thunderstorm: "বজ্ৰপাত",
    unknown: "অজ্ঞাত",
    location: "স্থান",
    coordinates: "স্থানাংক",
  },

  ur: {
    title: "موسم",
    subtitle: "آپ کے کھیتی کے علاقے کی موجودہ موسمی معلومات۔",
    loading: "موسم لوڈ ہو رہا ہے...",
    loadingDesc: "تازہ ترین موسمی معلومات حاصل کی جا رہی ہیں۔",
    unavailable: "موسم دستیاب نہیں",
    unavailableDesc: "موسم کی معلومات لوڈ نہیں ہو سکیں۔",
    tryAgain: "دوبارہ کوشش کریں",
    back: "واپس",
    currentConditions: "موجودہ موسم",
    feelsLike: "محسوس ہو رہا ہے",
    humidity: "نمی",
    windSpeed: "ہوا کی رفتار",
    rainProbability: "بارش کا امکان",
    farmingAdvice: "زرعی مشورہ",
    irrigation: "آبپاشی",
    irrigationDesc:
      "آبپاشی سے پہلے بارش کی صورتحال چیک کریں۔ بارش متوقع ہو تو غیر ضروری پانی دینے سے گریز کریں۔",
    cropCare: "فصل کی دیکھ بھال",
    cropCareDesc:
      "بہتر فصل کے انتظام کے لیے درجہ حرارت، نمی اور بارش کی صورتحال پر باقاعدگی سے نظر رکھیں۔",
    rainAlert: "بارش کا انتباہ",
    rainAlertDesc:
      "کھاد یا کیڑے مار دوا چھڑکنے سے پہلے بارش کے امکان کو ضرور دیکھیں۔",
    forecast: "7 دن کی پیش گوئی",
    rain: "بارش",
    clearSky: "صاف آسمان",
    partlyCloudy: "جزوی طور پر ابر آلود",
    foggy: "دھند",
    drizzle: "بوندا باندی",
    rainText: "بارش",
    snow: "برف باری",
    rainShowers: "بارش کی بوچھاڑ",
    thunderstorm: "گرج چمک کے ساتھ بارش",
    unknown: "نامعلوم",
    location: "مقام",
    coordinates: "مقام کے نقاط",
  },
} as const;

type Language = keyof typeof translations;

type WeatherData = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

type Coordinates = {
  latitude: number;
  longitude: number;
  name: string;
};

type FarmerProfile = {
  name?: string;
  phone?: string;
  village?: string;
  district?: string;
  state?: string;
  pinCode?: string;
};

const localeMap: Record<Language, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
  mr: "mr-IN",
  ta: "ta-IN",
  te: "te-IN",
  gu: "gu-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  pa: "pa-IN",
  or: "or-IN",
  as: "as-IN",
  ur: "ur-IN",
};

/*
 * Get farmer profile directly from localStorage.
 *
 * Your profile page saves the data using:
 *
 * localStorage.setItem(
 *   "farmerProfile",
 *   JSON.stringify(form)
 * );
 */
function getFarmerProfile(): FarmerProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedProfile = localStorage.getItem("farmerProfile");

  if (!savedProfile) {
    return null;
  }

  try {
    const profile = JSON.parse(savedProfile);

    if (!profile || typeof profile !== "object") {
      return null;
    }

    return profile as FarmerProfile;
  } catch {
    return null;
  }
}

/*
 * Get coordinates from PIN code.
 *
 * We first try the PIN because it is much more reliable
 * than sending village + district + state as one long name.
 */
async function getCoordinatesFromPin(
  pinCode: string
): Promise<Coordinates | null> {
  if (!pinCode) {
    return null;
  }

  const cleanPin = pinCode.trim();

  if (!/^\d{6}$/.test(cleanPin)) {
    return null;
  }

  const url =
    "https://geocoding-api.open-meteo.com/v1/search" +
    `?name=${encodeURIComponent(cleanPin)}` +
    "&count=10" +
    "&language=en" +
    "&format=json";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Location service unavailable.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  const indianResult =
    data.results.find(
      (item: {
        country_code?: string;
        latitude: number;
        longitude: number;
      }) => item.country_code === "IN"
    ) || data.results[0];

  return {
    latitude: indianResult.latitude,
    longitude: indianResult.longitude,
    name:
      indianResult.name ||
      `${cleanPin}, India`,
  };
}

/*
 * Fallback location search.
 *
 * If PIN geocoding does not work, we try:
 *
 * village + district + state
 *
 * and then district + state.
 */
async function searchLocation(
  query: string
): Promise<Coordinates | null> {
  if (!query.trim()) {
    return null;
  }

  const url =
    "https://geocoding-api.open-meteo.com/v1/search" +
    `?name=${encodeURIComponent(query)}` +
    "&count=10" +
    "&language=en" +
    "&format=json";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Location service unavailable.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  const indianResult = data.results.find(
    (item: {
      country_code?: string;
      latitude: number;
      longitude: number;
    }) => item.country_code === "IN"
  );

  if (!indianResult) {
    return null;
  }

  return {
    latitude: indianResult.latitude,
    longitude: indianResult.longitude,
    name: indianResult.name || query,
  };
}

/*
 * Main coordinate function.
 *
 * Order:
 *
 * 1. PIN code
 * 2. Village + District + State
 * 3. District + State
 * 4. State
 */
async function getFarmerCoordinates(
  profile: FarmerProfile
): Promise<Coordinates | null> {
  const pinCode = profile.pinCode?.trim() || "";
  const village = profile.village?.trim() || "";
  const district = profile.district?.trim() || "";
  const state = profile.state?.trim() || "";

  /*
   * STEP 1:
   * Try PIN code.
   */
  if (pinCode) {
    try {
      const pinCoordinates =
        await getCoordinatesFromPin(pinCode);

      if (pinCoordinates) {
        return {
          ...pinCoordinates,
          name:
            [village, district, state]
              .filter(Boolean)
              .join(", ") ||
            pinCoordinates.name,
        };
      }
    } catch (error) {
      console.warn(
        "PIN geocoding failed:",
        error
      );
    }
  }

  /*
   * STEP 2:
   * Village + District + State
   */
  if (village || district || state) {
    const detailedLocation = [
      village,
      district,
      state,
      "India",
    ]
      .filter(Boolean)
      .join(", ");

    try {
      const coordinates =
        await searchLocation(detailedLocation);

      if (coordinates) {
        return coordinates;
      }
    } catch (error) {
      console.warn(
        "Detailed location search failed:",
        error
      );
    }
  }

  /*
   * STEP 3:
   * District + State
   */
  if (district || state) {
    const districtLocation = [
      district,
      state,
      "India",
    ]
      .filter(Boolean)
      .join(", ");

    try {
      const coordinates =
        await searchLocation(districtLocation);

      if (coordinates) {
        return coordinates;
      }
    } catch (error) {
      console.warn(
        "District location search failed:",
        error
      );
    }
  }

  /*
   * STEP 4:
   * State only.
   */
  if (state) {
    try {
      const coordinates =
        await searchLocation(
          `${state}, India`
        );

      if (coordinates) {
        return coordinates;
      }
    } catch (error) {
      console.warn(
        "State location search failed:",
        error
      );
    }
  }

  return null;
}

/*
 * Get actual weather from Open-Meteo.
 */
async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
    "&timezone=auto" +
    "&forecast_days=7";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Weather service unavailable."
    );
  }

  const data = await response.json();

  if (!data.current || !data.daily) {
    throw new Error(
      "Weather data is incomplete."
    );
  }

  return data as WeatherData;
}

export default function WeatherPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [language, setLanguage] =
    useState<Language>("en");

  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [farmerLocation, setFarmerLocation] =
    useState("");

  const [coordinates, setCoordinates] =
    useState<Coordinates | null>(null);

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "selectedLanguage"
      );

    if (
      savedLanguage &&
      Object.prototype.hasOwnProperty.call(
        translations,
        savedLanguage
      )
    ) {
      setLanguage(
        savedLanguage as Language
      );
    }

    const loadWeather = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * Get exact profile saved by Profile page.
         */
        const profile =
          getFarmerProfile();

        if (!profile) {
          throw new Error(
            "Farmer profile was not found. Please save your profile first."
          );
        }

        /*
         * Build a readable location.
         */
        const displayLocation = [
          profile.village,
          profile.district,
          profile.state,
          profile.pinCode,
        ]
          .filter(Boolean)
          .join(", ");

        if (!displayLocation) {
          throw new Error(
            "Farmer location is missing in profile."
          );
        }

        setFarmerLocation(
          displayLocation
        );

        /*
         * Find coordinates.
         *
         * PIN is tried first.
         */
        const coords =
          await getFarmerCoordinates(
            profile
          );

        if (!coords) {
          throw new Error(
            "Could not find the farmer's location. Please check the Village, District, State and PIN code in your profile."
          );
        }

        setCoordinates(coords);

        /*
         * Get actual weather.
         */
        const weatherData =
          await getWeather(
            coords.latitude,
            coords.longitude
          );

        setWeather(weatherData);
      } catch (err) {
        console.error(
          "Weather error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Weather information could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  const t = translations[language];

  const getWeatherText = (
    code: number
  ): string => {
    if (code === 0) {
      return t.clearSky;
    }

    if ([1, 2, 3].includes(code)) {
      return t.partlyCloudy;
    }

    if ([45, 48].includes(code)) {
      return t.foggy;
    }

    if ([51, 53, 55].includes(code)) {
      return t.drizzle;
    }

    if ([61, 63, 65].includes(code)) {
      return t.rainText;
    }

    if ([71, 73, 75].includes(code)) {
      return t.snow;
    }

    if ([80, 81, 82].includes(code)) {
      return t.rainShowers;
    }

    if ([95, 96, 99].includes(code)) {
      return t.thunderstorm;
    }

    return t.unknown;
  };

  const getLocale = (): string => {
    return localeMap[language];
  };

  /*
   * Loading screen.
   */
  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={
          language === "ur"
            ? "rtl"
            : "ltr"
        }
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">
            🌦️
          </div>

          <h1 className="text-2xl font-bold text-green-800">
            {t.loading}
          </h1>

          <p className="text-gray-500 mt-2">
            {t.loadingDesc}
          </p>
        </div>
      </main>
    );
  }

  /*
   * Error screen.
   */
  if (error || !weather) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={
          language === "ur"
            ? "rtl"
            : "ltr"
        }
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-lg">
          <div className="text-5xl mb-4">
            ⚠️
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.unavailable}
          </h1>

          <p className="text-gray-600 mt-2">
            {error ||
              t.unavailableDesc}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
          >
            {t.tryAgain}
          </button>

          <button
            onClick={() =>
              router.push("/profile")
            }
            className="mt-3 block w-full px-6 py-3 rounded-xl border border-green-700 text-green-700 font-bold hover:bg-green-50"
          >
            Edit Profile
          </button>
        </div>
      </main>
    );
  }

  const current = weather.current;
  const daily = weather.daily;

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={
        language === "ur"
          ? "rtl"
          : "ltr"
      }
    >
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() =>
            router.push(
              `/crops/${params.id}`
            )
          }
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.back}
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="text-6xl mb-3">
            🌦️
          </div>

          <h1 className="text-3xl font-bold text-green-800">
            {t.title}
          </h1>

          <p className="text-gray-600 mt-2">
            {t.subtitle}
          </p>

          {/* Farmer Location */}
          <div className="mt-5 bg-white rounded-2xl shadow-sm p-5">
            <p className="text-sm text-gray-500">
              📍 {t.location}
            </p>

            <p className="text-lg font-bold text-green-800 mt-1">
              {coordinates?.name ||
                farmerLocation}
            </p>

            {coordinates && (
              <p className="text-sm text-gray-500 mt-1">
                {t.coordinates}:{" "}
                {coordinates.latitude.toFixed(
                  4
                )}
                ,{" "}
                {coordinates.longitude.toFixed(
                  4
                )}
              </p>
            )}
          </div>
        </div>

        {/* Current Weather */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <p className="text-sm text-gray-500">
            {t.currentConditions}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-4">
            <div className="text-7xl">
              🌤️
            </div>

            <div>
              <div className="text-5xl font-bold text-green-800">
                {Math.round(
                  current.temperature_2m
                )}
                °C
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-2">
                {getWeatherText(
                  current.weather_code
                )}
              </h2>

              <p className="text-gray-500 mt-1">
                {t.feelsLike}{" "}
                {Math.round(
                  current.apparent_temperature
                )}
                °C
              </p>
            </div>
          </div>

          {/* Weather Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-2">
                💧
              </div>

              <p className="text-sm text-gray-500">
                {t.humidity}
              </p>

              <p className="text-xl font-bold text-green-800">
                {current.relative_humidity_2m}%
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-2">
                💨
              </div>

              <p className="text-sm text-gray-500">
                {t.windSpeed}
              </p>

              <p className="text-xl font-bold text-green-800">
                {Math.round(
                  current.wind_speed_10m
                )}{" "}
                km/h
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-2">
                🌧️
              </div>

              <p className="text-sm text-gray-500">
                {t.rainProbability}
              </p>

              <p className="text-xl font-bold text-green-800">
                {daily
                  .precipitation_probability_max?.[0] ??
                  0}
                %
              </p>
            </div>

          </div>
        </div>

        {/* Farming Advice */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <h2 className="text-2xl font-bold text-green-800">
            🌱 {t.farmingAdvice}
          </h2>

          <div className="mt-5 space-y-4">

            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="font-bold text-green-800">
                💧 {t.irrigation}
              </h3>

              <p className="text-gray-600 mt-1">
                {t.irrigationDesc}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="font-bold text-green-800">
                🌾 {t.cropCare}
              </h3>

              <p className="text-gray-600 mt-1">
                {t.cropCareDesc}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="font-bold text-green-800">
                🌧️ {t.rainAlert}
              </h3>

              <p className="text-gray-600 mt-1">
                {t.rainAlertDesc}
              </p>
            </div>

          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white rounded-3xl shadow-lg p-7">

          <h2 className="text-2xl font-bold text-green-800 mb-6">
            {t.forecast}
          </h2>

          <div className="space-y-3">

            {daily.time.map(
              (date, index) => (
                <div
                  key={date}
                  className="flex items-center justify-between gap-4 border border-green-100 rounded-2xl p-4"
                >

                  <div className="font-semibold text-gray-700">
                    {new Date(
                      date
                    ).toLocaleDateString(
                      getLocale(),
                      {
                        weekday:
                          "short",
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </div>

                  <div className="text-2xl">
                    🌦️
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-green-800">
                      {Math.round(
                        daily
                          .temperature_2m_max[
                          index
                        ]
                      )}
                      ° /{" "}
                      {Math.round(
                        daily
                          .temperature_2m_min[
                          index
                        ]
                      )}
                      °
                    </p>

                    <p className="text-sm text-gray-500">
                      {t.rain}{" "}
                      {daily
                        .precipitation_probability_max[
                        index
                      ] ?? 0}
                      %
                    </p>
                  </div>

                </div>
              )
            )}

          </div>
        </div>

      </div>
    </main>
  );
}