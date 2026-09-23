"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../lib/LanguageProvider";
import type { LanguageCode } from "../../lib/language";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const speechLanguages: Record<LanguageCode, string> = {
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
  ur: "ur-PK",
};

const text: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    placeholder: string;
    listening: string;
    thinking: string;
    clear: string;
    speak: string;
    voiceNotSupported: string;
    welcome: string;
  }
> = {
  en: {
    title: "AI Krishi Mitra",
    subtitle: "Talk to your farming assistant",
    placeholder: "Or type your question here...",
    listening: "Listening... Speak your question",
    thinking: "AI is thinking...",
    clear: "Clear Chat",
    speak: "Tap the microphone and speak",
    voiceNotSupported: "Voice input is not supported in this browser.",
    welcome:
      "Hello! I am your AI Krishi Mitra. Tap the microphone and ask me anything about farming, crops, irrigation, fertilizer, diseases, weather or mandi.",
  },

  hi: {
    title: "AI कृषि मित्र",
    subtitle: "अपने कृषि सहायक से बात करें",
    placeholder: "या अपना सवाल यहाँ लिखें...",
    listening: "सुन रहा हूँ... अपना सवाल बोलिए",
    thinking: "AI सोच रहा है...",
    clear: "चैट साफ करें",
    speak: "माइक्रोफोन दबाकर बोलें",
    voiceNotSupported: "इस ब्राउज़र में voice input उपलब्ध नहीं है।",
    welcome:
      "नमस्ते! मैं आपका AI कृषि मित्र हूँ। माइक्रोफोन दबाकर खेती, फसल, सिंचाई, खाद, बीमारी, मौसम या मंडी से जुड़ा कोई भी सवाल पूछें।",
  },

  bn: {
    title: "AI কৃষি মিত্র",
    subtitle: "আপনার কৃষি সহায়কের সাথে কথা বলুন",
    placeholder: "অথবা আপনার প্রশ্ন লিখুন...",
    listening: "শুনছি... আপনার প্রশ্ন বলুন",
    thinking: "AI ভাবছে...",
    clear: "চ্যাট পরিষ্কার করুন",
    speak: "মাইক্রোফোন চাপুন এবং বলুন",
    voiceNotSupported: "এই ব্রাউজারে voice input সমর্থিত নয়।",
    welcome:
      "নমস্কার! আমি আপনার AI কৃষি মিত্র। মাইক্রোফোন চাপুন এবং কৃষি, ফসল, সেচ, সার, রোগ, আবহাওয়া বা বাজার সম্পর্কে প্রশ্ন করুন।",
  },

  mr: {
    title: "AI कृषी मित्र",
    subtitle: "तुमच्या कृषी सहाय्यकाशी बोला",
    placeholder: "किंवा तुमचा प्रश्न लिहा...",
    listening: "ऐकत आहे... तुमचा प्रश्न बोला",
    thinking: "AI विचार करत आहे...",
    clear: "चॅट साफ करा",
    speak: "मायक्रोफोन दाबा आणि बोला",
    voiceNotSupported: "या ब्राउझरमध्ये voice input उपलब्ध नाही.",
    welcome:
      "नमस्कार! मी तुमचा AI कृषी मित्र आहे. मायक्रोफोन दाबा आणि शेती, पिके, सिंचन, खत, रोग, हवामान किंवा बाजाराबद्दल प्रश्न विचारा.",
  },

  ta: {
    title: "AI விவசாய நண்பர்",
    subtitle: "உங்கள் விவசாய உதவியாளரிடம் பேசுங்கள்",
    placeholder: "அல்லது உங்கள் கேள்வியை எழுதுங்கள்...",
    listening: "கேட்கிறேன்... உங்கள் கேள்வியைப் பேசுங்கள்",
    thinking: "AI சிந்திக்கிறது...",
    clear: "அரட்டையை அழிக்கவும்",
    speak: "மைக்ரோஃபோனை அழுத்தி பேசுங்கள்",
    voiceNotSupported: "இந்த உலாவியில் voice input ஆதரிக்கப்படவில்லை.",
    welcome:
      "வணக்கம்! நான் உங்கள் AI விவசாய நண்பர். மைக்ரோஃபோனை அழுத்தி விவசாயம், பயிர்கள், பாசனம், உரம், நோய்கள், வானிலை அல்லது சந்தை பற்றி கேளுங்கள்.",
  },

  te: {
    title: "AI కృషి మిత్ర",
    subtitle: "మీ వ్యవసాయ సహాయకుడితో మాట్లాడండి",
    placeholder: "లేదా మీ ప్రశ్నను టైప్ చేయండి...",
    listening: "వింటున్నాను... మీ ప్రశ్నను చెప్పండి",
    thinking: "AI ఆలోచిస్తోంది...",
    clear: "చాట్ క్లియర్ చేయండి",
    speak: "మైక్రోఫోన్ నొక్కి మాట్లాడండి",
    voiceNotSupported: "ఈ బ్రౌజర్‌లో voice input అందుబాటులో లేదు.",
    welcome:
      "నమస్కారం! నేను మీ AI కృషి మిత్రను. మైక్రోఫోన్ నొక్కి వ్యవసాయం, పంటలు, నీటిపారుదల, ఎరువులు, వ్యాధులు, వాతావరణం లేదా మార్కెట్ గురించి అడగండి.",
  },

  gu: {
    title: "AI કૃષિ મિત્ર",
    subtitle: "તમારા કૃષિ સહાયક સાથે વાત કરો",
    placeholder: "અથવા તમારો પ્રશ્ન લખો...",
    listening: "સાંભળી રહ્યો છું... તમારો પ્રશ્ન બોલો",
    thinking: "AI વિચારી રહ્યું છે...",
    clear: "ચેટ સાફ કરો",
    speak: "માઇક્રોફોન દબાવીને બોલો",
    voiceNotSupported: "આ બ્રાઉઝરમાં voice input ઉપલબ્ધ નથી.",
    welcome:
      "નમસ્તે! હું તમારો AI કૃષિ મિત્ર છું. માઇક્રોફોન દબાવીને ખેતી, પાક, સિંચાઈ, ખાતર, રોગ, હવામાન અથવા બજાર વિશે પૂછો.",
  },

  kn: {
    title: "AI ಕೃಷಿ ಮಿತ್ರ",
    subtitle: "ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕರೊಂದಿಗೆ ಮಾತನಾಡಿ",
    placeholder: "ಅಥವಾ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ... ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಹೇಳಿ",
    thinking: "AI ಯೋಚಿಸುತ್ತಿದೆ...",
    clear: "ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ",
    speak: "ಮೈಕ್ರೋಫೋನ್ ಒತ್ತಿ ಮಾತನಾಡಿ",
    voiceNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ voice input ಲಭ್ಯವಿಲ್ಲ.",
    welcome:
      "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಮಿತ್ರ. ಮೈಕ್ರೋಫೋನ್ ಒತ್ತಿ ಕೃಷಿ, ಬೆಳೆಗಳು, ನೀರಾವರಿ, ಗೊಬ್ಬರ, ರೋಗ, ಹವಾಮಾನ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ಬಗ್ಗೆ ಕೇಳಿ.",
  },

  ml: {
    title: "AI കൃഷി മിത്ര",
    subtitle: "നിങ്ങളുടെ കൃഷി സഹായിയോട് സംസാരിക്കുക",
    placeholder: "അല്ലെങ്കിൽ നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...",
    listening: "കേൾക്കുന്നു... നിങ്ങളുടെ ചോദ്യം പറയുക",
    thinking: "AI ചിന്തിക്കുന്നു...",
    clear: "ചാറ്റ് മായ്ക്കുക",
    speak: "മൈക്രോഫോൺ അമർത്തി സംസാരിക്കുക",
    voiceNotSupported: "ഈ ബ്രൗസറിൽ voice input ലഭ്യമല്ല.",
    welcome:
      "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കൃഷി മിത്രയാണ്. മൈക്രോഫോൺ അമർത്തി കൃഷി, വിളകൾ, ജലസേചനം, വളം, രോഗങ്ങൾ, കാലാവസ്ഥ അല്ലെങ്കിൽ വിപണി എന്നിവയെക്കുറിച്ച് ചോദിക്കൂ.",
  },

  pa: {
    title: "AI ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ",
    subtitle: "ਆਪਣੇ ਖੇਤੀ ਸਹਾਇਕ ਨਾਲ ਗੱਲ ਕਰੋ",
    placeholder: "ਜਾਂ ਆਪਣਾ ਸਵਾਲ ਲਿਖੋ...",
    listening: "ਸੁਣ ਰਿਹਾ ਹਾਂ... ਆਪਣਾ ਸਵਾਲ ਬੋਲੋ",
    thinking: "AI ਸੋਚ ਰਿਹਾ ਹੈ...",
    clear: "ਚੈਟ ਸਾਫ਼ ਕਰੋ",
    speak: "ਮਾਈਕ੍ਰੋਫੋਨ ਦਬਾ ਕੇ ਬੋਲੋ",
    voiceNotSupported: "ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ voice input ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",
    welcome:
      "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਹਾਂ। ਮਾਈਕ੍ਰੋਫੋਨ ਦਬਾ ਕੇ ਖੇਤੀ, ਫਸਲਾਂ, ਸਿੰਚਾਈ, ਖਾਦ, ਬਿਮਾਰੀ, ਮੌਸਮ ਜਾਂ ਮੰਡੀ ਬਾਰੇ ਪੁੱਛੋ।",
  },

  or: {
    title: "AI କୃଷି ମିତ୍ର",
    subtitle: "ଆପଣଙ୍କ କୃଷି ସହାୟକଙ୍କ ସହ କଥା ହୁଅନ୍ତୁ",
    placeholder: "କିମ୍ବା ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ...",
    listening: "ଶୁଣୁଛି... ଆପଣଙ୍କ ପ୍ରଶ୍ନ କୁହନ୍ତୁ",
    thinking: "AI ଭାବୁଛି...",
    clear: "ଚାଟ୍ ସଫା କରନ୍ତୁ",
    speak: "ମାଇକ୍ରୋଫୋନ୍ ଦବାଇ କୁହନ୍ତୁ",
    voiceNotSupported: "ଏହି ବ୍ରାଉଜରରେ voice input ଉପଲବ୍ଧ ନାହିଁ।",
    welcome:
      "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ AI କୃଷି ମିତ୍ର। ମାଇକ୍ରୋଫୋନ୍ ଦବାଇ ଚାଷ, ଫସଲ, ଜଳସେଚନ, ସାର, ରୋଗ, ପାଣିପାଗ କିମ୍ବା ମଣ୍ଡି ବିଷୟରେ ପଚାରନ୍ତୁ।",
  },

  as: {
    title: "AI কৃষি মিত্ৰ",
    subtitle: "আপোনাৰ কৃষি সহায়কৰ সৈতে কথা পাতক",
    placeholder: "অথবা আপোনাৰ প্ৰশ্ন লিখক...",
    listening: "শুনি আছোঁ... আপোনাৰ প্ৰশ্নটো কওক",
    thinking: "AI-এ ভাবি আছে...",
    clear: "চাট পৰিষ্কাৰ কৰক",
    speak: "মাইক্ৰ'ফোন টিপি কথা কওক",
    voiceNotSupported: "এই ব্ৰাউজাৰত voice input উপলব্ধ নহয়।",
    welcome:
      "নমস্কাৰ! মই আপোনাৰ AI কৃষি মিত্ৰ। মাইক্ৰ'ফোন টিপি কৃষি, শস্য, জলসিঞ্চন, সাৰ, ৰোগ, বতৰ বা বজাৰৰ বিষয়ে প্ৰশ্ন কৰক।",
  },

  ur: {
    title: "AI زرعی دوست",
    subtitle: "اپنے زرعی معاون سے بات کریں",
    placeholder: "یا اپنا سوال یہاں لکھیں...",
    listening: "سن رہا ہوں... اپنا سوال بولیں",
    thinking: "AI سوچ رہا ہے...",
    clear: "چیٹ صاف کریں",
    speak: "مائیکروفون دبا کر بولیں",
    voiceNotSupported: "اس براؤزر میں voice input دستیاب نہیں ہے۔",
    welcome:
      "السلام علیکم! میں آپ کا AI زرعی دوست ہوں۔ مائیکروفون دبا کر فصل، زراعت، آبپاشی، کھاد، بیماری، موسم یا منڈی کے بارے میں سوال پوچھیں۔",
  },
};

export default function AIPage() {
  const { language } = useLanguage();
  const ui = text[language] || text.en;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: ui.welcome,
      },
    ]);
  }, [language, ui.welcome]);

  // Cleans AI markdown formatting before sending text to speech.
  // The chat UI still shows the original AI response.
  const cleanSpeechText = (text: string) => {
    return text
      // Convert number ranges for speech:
      // 30-40 -> 30 to 40
      // 20 - 30 kg -> 20 to 30 kg
      .replace(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/g, "$1 to $2")

      // Remove headings
      .replace(/^#{1,6}\s*/gm, "")

      // Remove bold markdown
      .replace(/\*\*(.*?)\*\*/g, "$1")

      // Remove italic markdown
      .replace(/__(.*?)__/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/_(.*?)_/g, "$1")

      // Remove bullet points
      .replace(/^\s*[-•]\s+/gm, "")

      // Remove numbered list formatting
      .replace(/^\s*\d+\.\s+/gm, "")

      // Remove markdown links but keep visible text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

      // Remove backticks
      .replace(/`/g, "")

      // Remove remaining markdown symbols commonly spoken by TTS
      .replace(/[*#_~]/g, "")

      // Clean extra spaces
      .replace(/[ \t]+/g, " ")

      // Clean excessive blank lines
      .replace(/\n{2,}/g, "\n")

      .trim();
  };

  const speak = (answer: string) => {
    if (typeof window === "undefined") return;
    if (!window.speechSynthesis) return;

    const cleanText = cleanSpeechText(answer);

    if (!cleanText) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(cleanText);

    speech.lang = speechLanguages[language] || "en-IN";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const askAI = async (question: string) => {
    if (!question.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          language,
          history: newMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.details || data.error || "AI request failed"
        );
      }

      const answer =
        data.answer || "Sorry, I could not answer that.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: answer,
        },
      ]);

      // Automatically speak AI response
      speak(answer);
    } catch (error) {
      console.error("AI error:", error);

      const errorMessage =
        language === "hi"
          ? "माफ़ कीजिए, अभी AI से response नहीं मिल पाया।"
          : "Sorry, I could not get a response from AI right now.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);

      speak(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const startVoice = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(ui.voiceNotSupported);
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    if (loading) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = speechLanguages[language] || "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      const spokenText =
        event.results?.[0]?.[0]?.transcript?.trim();

      if (!spokenText) return;

      setInput(spokenText);

      // Automatically send voice question to AI
      askAI(spokenText);
    };

    recognition.onerror = (event: any) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "Could not start speech recognition:",
        error
      );

      setListening(false);
    }
  };

  const sendTypedMessage = async () => {
    await askAI(input);
  };

  const clearChat = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }

    setMessages([
      {
        role: "assistant",
        content: ui.welcome,
      },
    ]);

    setInput("");
  };

  return (
    <main
      className="min-h-screen bg-[#f2fff7] px-4 py-6 md:px-8"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#063b2a]">
              🤖 {ui.title}
            </h1>

            <p className="mt-1 text-gray-600">
              {ui.subtitle}
            </p>
          </div>

          <button
            onClick={clearChat}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            {ui.clear}
          </button>
        </div>

        {/* Main AI area */}
        <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg">
          {/* Chat */}
          <div className="h-[55vh] overflow-y-auto p-5 md:p-7">
            <div className="space-y-5">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                      message.role === "user"
                        ? "bg-[#008c3a] text-white"
                        : "bg-[#eef9f1] text-[#173b2c]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-7">
                      {message.content}
                    </p>

                    {message.role === "assistant" && (
                      <button
                        onClick={() =>
                          speak(message.content)
                        }
                        className="mt-3 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-[#008c3a] shadow-sm"
                        title="Listen"
                      >
                        🔊 Listen
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-[#eef9f1] px-5 py-4 text-gray-600">
                    {ui.thinking}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Voice section */}
          <div className="border-t bg-[#f8fffa] px-5 py-6">
            <div className="flex flex-col items-center">
              <button
                onClick={startVoice}
                disabled={loading}
                className={`flex h-24 w-24 items-center justify-center rounded-full text-4xl shadow-lg transition ${
                  listening
                    ? "animate-pulse bg-red-500 text-white"
                    : "bg-[#008c3a] text-white hover:scale-105"
                } disabled:opacity-50`}
              >
                {listening ? "🔴" : "🎤"}
              </button>

              <p className="mt-4 text-center font-semibold text-[#063b2a]">
                {listening ? ui.listening : ui.speak}
              </p>

              {/* Typed input - optional */}
              <div className="mt-6 flex w-full max-w-3xl gap-2">
                <input
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendTypedMessage();
                    }
                  }}
                  placeholder={ui.placeholder}
                  className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#008c3a]"
                />

                <button
                  onClick={sendTypedMessage}
                  disabled={!input.trim() || loading}
                  className="rounded-xl bg-[#008c3a] px-5 py-3 font-bold text-white disabled:opacity-50"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}