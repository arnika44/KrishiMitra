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