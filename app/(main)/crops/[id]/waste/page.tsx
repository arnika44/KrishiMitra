
"use client"; 
 
import { useEffect, useRef, useState } from "react"; 
import { useParams, useRouter } from "next/navigation"; 
 
type Crop = { 
  id: number; 
  season: string; 
  crop: string; 
  land: string; 
}; 
 
type WasteAnalysis = { 
  wasteType: string; 
  confidence: string; 
  uses: string[]; 
  decomposition: string[]; 
  decompositionTime: string; 
  avoid: string[]; 
  products: string[]; 
}; 
 
type Translation = { 
  back: string; 
  season: string; 
  wasteTitle: string; 
  land: string; 
  identifyTitle: string; 
  identifyDesc: string; 
  tip: string; 
  tipDesc: string; 
  takePhoto: string; 
  choosePhoto: string; 
  yourPhoto: string; 
  anotherPhoto: string; 
  remove: string; 
  analyzeWaste: string; 
  analyzingWaste: string; 
  analyzingTitle: string; 
  analyzingDesc: string; 
  loading: string; 
  pleaseWait: string; 
  cropNotFound: string; 
  backToCrops: string; 
  wasteIdentified: string; 
  identification: string; 
  whatCanYouDo: string; 
  howToDecompose: string; 
  decompositionDesc: string; 
  estimatedTime: string; 
  usefulProducts: string; 
  thingsToAvoid: string; 
  important: string; 
  disclaimer: string; 
  analyzeAnother: string; 
  selectPhotoFirst: string; 
  invalidImage: string; 
  demoResult: string; 
  wheatStraw: string; 
  cropResidue: string; 
  compost: string; 
  mulch: string; 
  animalBedding: string; 
  biomass: string; 
  briquettes: string; 
  mushroom: string; 
  organicManure: string; 
  avoidBurning: string; 
  avoidWater: string; 
  avoidPlastic: string; 
  avoidChemical: string; 
  cutSmall: string; 
  makeLayer: string; 
  addCowDung: string; 
  maintainMoisture: string; 
  turnPile: string; 
  avoidWaterLogging: string; 
  decomposition45to90: string; 
  decomposition45to90General: string; 
  guideDisclaimer: string; 
}; 
 
const translations: Record<string, Translation> = { 
  en: { 
    back: "← Back to", 
    season: "Season", 
    wasteTitle: "Waste Utilization", 
    land: "acres", 
    identifyTitle: "🌾 Identify Your Crop Waste", 
    identifyDesc: 
      "Take a clear photo of your crop waste. The system can analyze the waste and suggest useful ways to reuse, compost or decompose it.", 
    tip: "📸 Tip", 
    tipDesc: 
      "Take the photo in good light and keep the crop waste clearly visible.", 
    takePhoto: "📷 Take Photo", 
    choosePhoto: "🖼️ Choose Photo", 
    yourPhoto: "📸 Your Waste Photo", 
    anotherPhoto: "📷 Take Another Photo", 
    remove: "🗑️ Remove", 
    analyzeWaste: "🔍 Analyze Waste", 
    analyzingWaste: "🔍 Analyzing Waste...", 
    analyzingTitle: "Analyzing Your Waste", 
    analyzingDesc: 
      "Please wait while we identify possible uses and decomposition methods.", 
    loading: "Loading...", 
    pleaseWait: "Please wait...", 
    cropNotFound: "Crop not found", 
    backToCrops: "← Back to Crops", 
    wasteIdentified: "Waste Identified", 
    identification: "ℹ️ Identification", 
    whatCanYouDo: "💡 What Can You Do With It?", 
    howToDecompose: "♻️ How To Decompose It", 
    decompositionDesc: 
      "Suggested compost/decomposition process:", 
    estimatedTime: "⏱️ Estimated Decomposition Time", 
    usefulProducts: "📦 Useful Products", 
    thingsToAvoid: "⚠️ Things To Avoid", 
    important: "ℹ️ Important", 
    disclaimer: 
      "Photo-based identification is only a guide. Before using crop residue for animal feed, compost, mushroom cultivation or commercial products, confirm that the material is suitable and free from chemicals, disease or contamination.", 
    analyzeAnother: "📷 Analyze Another Waste Photo", 
    selectPhotoFirst: "Please take or select a photo first.", 
    invalidImage: "Please select an image.", 
    demoResult: "Demo result", 
    wheatStraw: "Wheat Straw / Crop Residue", 
    cropResidue: "Crop Residue", 
    compost: "Compost", 
    mulch: "Mulch", 
    animalBedding: "Animal Bedding", 
    biomass: "Biomass", 
    briquettes: "Briquettes", 
    mushroom: "Mushroom Cultivation", 
    organicManure: "Organic Manure", 
    avoidBurning: "Do not burn the crop residue in the open.", 
    avoidWater: "Do not add too much water and make it overly wet.", 
    avoidPlastic: "Do not mix plastic or chemical waste with compost.", 
    avoidChemical: 
      "Do not mix plastic, metal or chemical waste with the residue.", 
    cutSmall: "Cut the crop residue into small pieces.", 
    makeLayer: "Place the residue in a 4–6 inch layer.", 
    addCowDung: 
      "Add a thin layer of cow dung or mature compost.", 
    maintainMoisture: 
      "Sprinkle a little water and maintain proper moisture.", 
    turnPile: 
      "Turn the compost pile every 15–20 days so that air can circulate.", 
    avoidWaterLogging: 
      "Do not allow too much water to collect in the pile.", 
    decomposition45to90: 
      "Approximately 45–90 days, depending on weather and moisture.", 
    decomposition45to90General: 
      "Approximately 45–90 days, depending on waste type and weather.", 
    guideDisclaimer: 
      "Photo-based identification is only a guide. Please verify the material before using it for animals, composting, mushroom cultivation or commercial purposes.", 
  }, 
 
  hi: { 
    back: "← वापस जाएँ", 
    season: "सीजन", 
    wasteTitle: "फसल अवशेष प्रबंधन", 
    land: "एकड़", 
    identifyTitle: "🌾 फसल के अवशेष की पहचान करें", 
    identifyDesc: 
      "फसल के अवशेष की साफ फोटो खींचें। सिस्टम फोटो के आधार पर इसके संभावित उपयोग, खाद बनाने और सड़ाने की जानकारी देगा।", 
    tip: "📸 सुझाव", 
    tipDesc: 
      "अच्छी रोशनी में फोटो लें और फसल के अवशेष को साफ दिखाई देने दें।", 
    takePhoto: "📷 फोटो खींचें", 
    choosePhoto: "🖼️ फोटो चुनें", 
    yourPhoto: "📸 आपके अवशेष की फोटो", 
    anotherPhoto: "📷 दूसरी फोटो खींचें", 
    remove: "🗑️ हटाएँ", 
    analyzeWaste: "🔍 अवशेष की जाँच करें", 
    analyzingWaste: "🔍 अवशेष की जाँच हो रही है...", 
    analyzingTitle: "आपके फसल अवशेष की जाँच हो रही है", 
    analyzingDesc: 
      "कृपया प्रतीक्षा करें। हम इसके संभावित उपयोग और सड़ाने की विधि की जानकारी तैयार कर रहे हैं।", 
    loading: "लोड हो रहा है...", 
    pleaseWait: "कृपया प्रतीक्षा करें...", 
    cropNotFound: "फसल नहीं मिली", 
    backToCrops: "← फसलों पर वापस जाएँ", 
    wasteIdentified: "अवशेष की पहचान", 
    identification: "ℹ️ पहचान", 
    whatCanYouDo: "💡 इसका क्या उपयोग किया जा सकता है?", 
    howToDecompose: "♻️ इसे कैसे सड़ाएँ?", 
    decompositionDesc: 
      "खाद बनाने और सड़ाने की सुझाई गई प्रक्रिया:", 
    estimatedTime: "⏱️ अनुमानित सड़ने का समय", 
    usefulProducts: "📦 इससे बनने वाले उपयोगी उत्पाद", 
    thingsToAvoid: "⚠️ किन चीजों से बचें", 
    important: "ℹ️ महत्वपूर्ण जानकारी", 
    disclaimer: 
      "फोटो के आधार पर की गई पहचान केवल मार्गदर्शन के लिए है। पशु चारा, खाद, मशरूम उत्पादन या व्यावसायिक उपयोग से पहले यह सुनिश्चित करें कि सामग्री उपयुक्त हो और रसायन, रोग या किसी अन्य प्रदूषण से मुक्त हो।", 
    analyzeAnother: "📷 किसी दूसरे अवशेष की फोटो जाँचें", 
    selectPhotoFirst: "कृपया पहले फोटो खींचें या चुनें।", 
    invalidImage: "कृपया फोटो चुनें।", 
    demoResult: "डेमो परिणाम", 
    wheatStraw: "गेहूँ का भूसा / फसल अवशेष", 
    cropResidue: "फसल अवशेष", 
    compost: "कम्पोस्ट खाद", 
    mulch: "मल्च", 
    animalBedding: "पशुओं के लिए बिछावन", 
    biomass: "बायोमास", 
    briquettes: "ब्रिकेट्स", 
    mushroom: "मशरूम उत्पादन", 
    organicManure: "जैविक खाद", 
    avoidBurning: "फसल के अवशेष को खुले में जलाने से बचें।", 
    avoidWater: 
      "बहुत ज्यादा पानी डालकर अवशेष को अत्यधिक गीला न करें।", 
    avoidPlastic: 
      "प्लास्टिक या रासायनिक कचरे को कम्पोस्ट में न मिलाएँ।", 
    avoidChemical: 
      "प्लास्टिक, धातु या रासायनिक कचरे को अवशेष में न मिलाएँ।", 
    cutSmall: "फसल के अवशेष को छोटे-छोटे टुकड़ों में काटें।", 
    makeLayer: 
      "अवशेष को 4–6 इंच की परत में एक जगह रखें।", 
    addCowDung: 
      "गोबर या तैयार कम्पोस्ट की एक पतली परत डालें।", 
    maintainMoisture: 
      "थोड़ा पानी छिड़कें और उचित नमी बनाए रखें।", 
    turnPile: 
      "हर 15–20 दिन में कम्पोस्ट के ढेर को पलटें ताकि हवा मिलती रहे।", 
    avoidWaterLogging: 
      "ढेर में बहुत ज्यादा पानी जमा न होने दें।", 
    decomposition45to90: 
      "लगभग 45–90 दिन, मौसम और नमी के अनुसार।", 
    decomposition45to90General: 
      "लगभग 45–90 दिन, अवशेष के प्रकार और मौसम पर निर्भर।", 
    guideDisclaimer: 
      "फोटो के आधार पर की गई पहचान केवल मार्गदर्शन है। पशुओं, खाद, मशरूम उत्पादन या व्यावसायिक उपयोग से पहले सामग्री की उपयुक्तता की पुष्टि करें।", 
  }, 
}; 
 
export default function WasteUtilizationPage() { 
  const router = useRouter(); 
  const params = useParams(); 
 
  const cameraInputRef = useRef<HTMLInputElement>(null); 
  const uploadInputRef = useRef<HTMLInputElement>(null); 
 
  const [crop, setCrop] = useState<Crop | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [language, setLanguage] = useState("en"); 
 
  const [photo, setPhoto] = useState<string | null>(null); 
  const [analyzing, setAnalyzing] = useState(false); 
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null); 
 
  useEffect(() => { 
    const savedLanguage = localStorage.getItem("selectedLanguage"); 
 
    if (savedLanguage && translations[savedLanguage]) { 
      setLanguage(savedLanguage); 
    } 
 
    const savedCrops = localStorage.getItem("farmerCrops"); 
 
    if (!savedCrops) { 
      setLoading(false); 
      return; 
    } 
 
    try { 
      const crops: Crop[] = JSON.parse(savedCrops); 
 
      const selectedCrop = crops.find( 
        (item) => item.id === Number(params.id) 
      ); 
 
      if (selectedCrop) { 
        setCrop(selectedCrop); 
      } 
    } catch { 
      setCrop(null); 
    } finally { 
      setLoading(false); 
    } 
  }, [params.id]); 
 
  const t = translations[language] || translations.en; 
 
  const handlePhotoChange = ( 
    event: React.ChangeEvent<HTMLInputElement> 
  ) => { 
    const file = event.target.files?.[0]; 
 
    if (!file) return; 
 
    if (!file.type.startsWith("image/")) { 
      alert(t.invalidImage); 
      return; 
    } 
 
    const imageUrl = URL.createObjectURL(file); 
 
    setPhoto(imageUrl); 
    setAnalysis(null); 
  }; 
 
  const removePhoto = () => { 
    setPhoto(null); 
    setAnalysis(null); 
 
    if (cameraInputRef.current) { 
      cameraInputRef.current.value = ""; 
    } 
 
    if (uploadInputRef.current) { 
      uploadInputRef.current.value = ""; 
    } 
  }; 
 
  const analyzeWaste = async () => { 
    if (!photo) { 
      alert(t.selectPhotoFirst); 
      return; 
    } 
 
    setAnalyzing(true); 
    setAnalysis(null); 
 
    await new Promise((resolve) => setTimeout(resolve, 1800)); 
 
    const cropName = crop?.crop?.toLowerCase() || ""; 
 
    let result: WasteAnalysis; 
 
    if ( 
      cropName.includes("wheat") || 
      cropName.includes("गेहूं") || 
      cropName.includes("gahu") || 
      cropName.includes("গম") || 
      cropName.includes("गहू") || 
      cropName.includes("கோதுமை") || 
      cropName.includes("గోధుమ") || 
      cropName.includes("ઘઉં") || 
      cropName.includes("ಗೋಧಿ") || 
      cropName.includes("ഗോതമ്പ്") || 
      cropName.includes("ਕਣਕ") || 
      cropName.includes("ଗହମ") || 
      cropName.includes("ঘেঁহু") || 
      cropName.includes("گندم") 
    ) { 
      result = { 
        wasteType: t.wheatStraw, 
        confidence: t.demoResult, 
        uses: [ 
          `${t.compost} बनाने में उपयोग किया जा सकता है।`, 
          `${t.mulch} के लिए खेत में इस्तेमाल किया जा सकता है।`, 
          `${t.animalBedding} के रूप में उपयोग किया जा सकता है।`, 
          `${t.biomass} / ${t.briquettes} बनाने में उपयोग हो सकता है।`, 
          `${t.mushroom} में कुछ परिस्थितियों में उपयोग किया जा सकता है।`, 
        ], 
        decomposition: [ 
          t.cutSmall, 
          t.makeLayer, 
          t.addCowDung, 
          t.maintainMoisture, 
          t.turnPile, 
          t.avoidWaterLogging, 
        ], 
        decompositionTime: t.decomposition45to90, 
        avoid: [ 
          t.avoidBurning, 
          t.avoidWater, 
          t.avoidPlastic, 
        ], 
        products: [ 
          t.compost, 
          t.organicManure, 
          t.mulch, 
          t.biomass, 
          t.briquettes, 
        ], 
      }; 
    } else { 
      result = { 
        wasteType: t.cropResidue, 
        confidence: t.demoResult, 
        uses: [ 
          `${t.compost} बनाने में उपयोग किया जा सकता है।`, 
          `${t.mulch} के लिए इस्तेमाल किया जा सकता है।`, 
          `${t.organicManure} बनाने में उपयोग किया जा सकता है।`, 
          `${t.biomass} के रूप में उपयोग किया जा सकता है।`, 
        ], 
        decomposition: [ 
          t.cutSmall, 
          t.makeLayer, 
          t.addCowDung, 
          t.maintainMoisture, 
          t.turnPile, 
        ], 
        decompositionTime: t.decomposition45to90General, 
        avoid: [ 
          t.avoidBurning, 
          t.avoidChemical, 
          t.avoidWaterLogging, 
        ], 
        products: [ 
          t.compost, 
          t.organicManure, 
          t.mulch, 
          t.biomass, 
        ], 
      }; 
    } 
 
    setAnalysis(result); 
    setAnalyzing(false); 
  }; 
 
  if (loading) { 
    return ( 
      <main 
        className="min-h-screen bg-green-50 flex items-center justify-center px-5" 
        dir={language === "ur" ? "rtl" : "ltr"} 
      > 
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center"> 
          <div className="text-5xl mb-4">♻️</div> 
 
          <h1 className="text-2xl font-bold text-green-800"> 
            {t.loading} 
          </h1> 
 
          <p className="text-gray-500 mt-2"> 
            {t.pleaseWait} 
          </p> 
        </div> 
      </main> 
    ); 
  } 
 
  if (!crop) { 
    return ( 
      <main 
        className="min-h-screen bg-green-50 flex items-center justify-center px-5" 
        dir={language === "ur" ? "rtl" : "ltr"} 
      > 
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center"> 
          <div className="text-5xl mb-4">🌱</div> 
 
          <h1 className="text-2xl font-bold text-gray-900"> 
            {t.cropNotFound} 
          </h1> 
 
          <button 
            onClick={() => router.push("/crops")} 
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold" 
          > 
            {t.backToCrops} 
          </button> 
        </div> 
      </main> 
    ); 
  } 
 
  return ( 
    <main 
      className="min-h-screen bg-green-50 px-5 py-8" 
      dir={language === "ur" ? "rtl" : "ltr"} 
    > 
      <div className="max-w-4xl mx-auto"> 
 
        <button 
          onClick={() => 
            router.push(`/crops/${crop.id}`) 
          } 
          className="text-green-700 font-semibold mb-6 hover:text-green-900" 
        > 
          {t.back} {crop.crop} 
        </button> 
 
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-7"> 
          <div className="flex items-center gap-5"> 
 
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl"> 
              ♻️ 
            </div> 
 
            <div> 
              <p className="text-sm text-green-600 font-semibold"> 
                {crop.season} {t.season} 
              </p> 
 
              <h1 className="text-3xl font-bold text-green-800 mt-1"> 
                {t.wasteTitle} 
              </h1> 
 
              <p className="text-gray-600 mt-2"> 
                {crop.crop} • {crop.land} {t.land} 
              </p> 
            </div> 
 
          </div> 
        </div> 
 
        <div className="bg-white rounded-3xl shadow-md p-7 mb-7"> 
 
          <h2 className="text-2xl font-bold text-green-800"> 
            {t.identifyTitle} 
          </h2> 
 
          <p className="text-gray-600 mt-3 leading-relaxed"> 
            {t.identifyDesc} 
          </p> 
 
          <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4"> 
 
            <p className="text-green-800 font-semibold"> 
              {t.tip} 
            </p> 
 
            <p className="text-green-700 text-sm mt-1"> 
              {t.tipDesc} 
            </p> 
 
          </div> 
 
        </div> 
 
        <input 
          ref={cameraInputRef} 
          type="file" 
          accept="image/*" 
          capture="environment" 
          onChange={handlePhotoChange} 
          className="hidden" 
        /> 
 
        <input 
          ref={uploadInputRef} 
          type="file" 
          accept="image/*" 
          onChange={handlePhotoChange} 
          className="hidden" 
        /> 
 
        <div className="bg-white rounded-3xl shadow-md p-7 mb-7"> 
 
          {!photo ? ( 
            <div className="border-2 border-dashed border-green-300 rounded-3xl p-10 text-center bg-green-50"> 
 
              <div className="text-6xl mb-5"> 
                📷 
              </div> 
 
              <h2 className="text-xl font-bold text-gray-900"> 
                {t.takePhoto} 
              </h2> 
 
              <p className="text-gray-500 mt-2"> 
                {t.tipDesc} 
              </p> 
 
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-7"> 
 
                <button 
                  onClick={() => 
                    cameraInputRef.current?.click() 
                  } 
                  className="px-6 py-4 rounded-2xl bg-green-700 text-white font-bold text-lg hover:bg-green-800 transition shadow-md" 
                > 
                  {t.takePhoto} 
                </button> 
 
                <button 
                  onClick={() => 
                    uploadInputRef.current?.click() 
                  } 
                  className="px-6 py-4 rounded-2xl bg-white border-2 border-green-600 text-green-700 font-bold text-lg hover:bg-green-50 transition" 
                > 
                  {t.choosePhoto} 
                </button> 
 
              </div> 
 
            </div> 
          ) : ( 
            <> 
              <h2 className="text-2xl font-bold text-green-800 mb-5"> 
                {t.yourPhoto} 
              </h2> 
 
              <div className="relative rounded-3xl overflow-hidden bg-gray-100"> 
 
                <img 
                  src={photo} 
                  alt="Crop waste" 
                  className="w-full max-h-[500px] object-contain bg-gray-100" 
                /> 
 
              </div> 
 
              <div className="flex flex-col sm:flex-row gap-4 mt-5"> 
 
                <button 
                  onClick={() => 
                    cameraInputRef.current?.click() 
                  } 
                  className="flex-1 px-5 py-4 rounded-2xl bg-green-700 text-white font-bold hover:bg-green-800 transition" 
                > 
                  {t.anotherPhoto} 
                </button> 
 
                <button 
                  onClick={removePhoto} 
                  className="px-5 py-4 rounded-2xl bg-red-50 text-red-700 font-bold border border-red-200 hover:bg-red-100 transition" 
                > 
                  {t.remove} 
                </button> 
 
              </div> 
 
              <button 
                onClick={analyzeWaste} 
                disabled={analyzing} 
                className="w-full mt-5 px-6 py-5 rounded-2xl bg-green-800 text-white font-bold text-xl hover:bg-green-900 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg" 
              > 
                {analyzing 
                  ? t.analyzingWaste 
                  : t.analyzeWaste} 
              </button> 
 
            </> 
          )} 
 
        </div> 
 
        {analyzing && ( 
          <div className="bg-white rounded-3xl shadow-md p-8 mb-7 text-center"> 
 
            <div className="text-5xl animate-pulse"> 
              🤖 
            </div> 
 
            <h2 className="text-2xl font-bold text-green-800 mt-4"> 
              {t.analyzingTitle} 
            </h2> 
 
            <p className="text-gray-600 mt-2"> 
              {t.analyzingDesc} 
            </p> 
 
            <div className="w-full bg-gray-200 rounded-full h-3 mt-6 overflow-hidden"> 
              <div className="bg-green-600 h-3 rounded-full w-2/3 animate-pulse" /> 
            </div> 
 
          </div> 
        )} 
 
        {analysis && !analyzing && ( 
          <div className="space-y-6"> 
 
            <div className="bg-white rounded-3xl shadow-md p-7"> 
 
              <div className="flex items-center gap-3"> 
 
                <span className="text-4xl"> 
                  🌾 
                </span> 
 
                <div> 
 
                  <p className="text-sm text-green-600 font-semibold"> 
                    {t.wasteIdentified} 
                  </p> 
 
                  <h2 className="text-2xl font-bold text-green-800"> 
                    {analysis.wasteType} 
                  </h2> 
 
                </div> 
 
              </div> 
 
              <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4"> 
 
                <p className="text-green-800 font-semibold"> 
                  {t.identification} 
                </p> 
 
                <p className="text-green-700 text-sm mt-1"> 
                  {analysis.confidence} 
                </p> 
 
              </div> 
 
            </div> 
 
            <div className="bg-white rounded-3xl shadow-md p-7"> 
 
              <h2 className="text-2xl font-bold text-green-800"> 
                {t.whatCanYouDo} 
              </h2> 
 
              <div className="space-y-3 mt-5"> 
 
                {analysis.uses.map((use, index) => ( 
                  <div 
                    key={index} 
                    className="flex gap-3 bg-green-50 rounded-2xl p-4" 
                  > 
                    <span className="text-xl"> 
                      ✓ 
                    </span> 
 
                    <p className="text-gray-700"> 
                      {use} 
                    </p> 
                  </div> 
                ))} 
 
              </div> 
 
            </div> 
 
            <div className="bg-white rounded-3xl shadow-md p-7"> 
 
              <h2 className="text-2xl font-bold text-green-800"> 
                {t.howToDecompose} 
              </h2> 
 
              <p className="text-gray-600 mt-2"> 
                {t.decompositionDesc} 
              </p> 
 
              <div className="space-y-3 mt-5"> 
 
                {analysis.decomposition.map( 
                  (step, index) => ( 
                    <div 
                      key={index} 
                      className="flex gap-4 items-start" 
                    > 
                      <div className="min-w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold"> 
                        {index + 1} 
                      </div> 
 
                      <p className="text-gray-700 pt-1 leading-relaxed"> 
                        {step} 
                      </p> 
                    </div> 
                  ) 
                )} 
 
              </div> 
 
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5"> 
 
                <p className="font-bold text-yellow-800"> 
                  {t.estimatedTime} 
                </p> 
 
                <p className="text-yellow-700 mt-1"> 
                  {analysis.decompositionTime} 
                </p> 
 
              </div> 
 
            </div> 
 
            <div className="bg-white rounded-3xl shadow-md p-7"> 
 
              <h2 className="text-2xl font-bold text-green-800"> 
                {t.usefulProducts} 
              </h2> 
 
              <div className="flex flex-wrap gap-3 mt-5"> 
 
                {analysis.products.map( 
                  (product, index) => ( 
                    <span 
                      key={index} 
                      className="px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold" 
                    > 
                      🌱 {product} 
                    </span> 
                  ) 
                )} 
 
              </div> 
 
            </div> 
 
            <div className="bg-white rounded-3xl shadow-md p-7"> 
 
              <h2 className="text-2xl font-bold text-red-700"> 
                {t.thingsToAvoid} 
              </h2> 
 
              <div className="space-y-3 mt-5"> 
 
                {analysis.avoid.map( 
                  (item, index) => ( 
                    <div 
                      key={index} 
                      className="flex gap-3 bg-red-50 border border-red-100 rounded-2xl p-4" 
                    > 
                      <span className="text-xl"> 
                        ⚠️ 
                      </span> 
 
                      <p className="text-gray-700"> 
                        {item} 
                      </p> 
                    </div> 
                  ) 
                )} 
 
              </div> 
 
            </div> 
 
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6"> 
 
              <p className="font-bold text-blue-800"> 
                {t.important} 
              </p> 
 
              <p className="text-blue-700 text-sm mt-2 leading-relaxed"> 
                {t.disclaimer} 
              </p> 
 
            </div> 
 
            <button 
              onClick={() => { 
                setAnalysis(null); 
                setPhoto(null); 
 
                if (cameraInputRef.current) { 
                  cameraInputRef.current.value = ""; 
                } 
 
                if (uploadInputRef.current) { 
                  uploadInputRef.current.value = ""; 
                } 
              }} 
              className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-green-700 text-green-700 font-bold hover:bg-green-50 transition" 
            > 
              {t.analyzeAnother} 
            </button> 
 
          </div> 
        )} 
 
      </div> 
    </main> 
  ); 
}