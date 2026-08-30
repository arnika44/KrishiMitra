
// MarketPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

type Crop = {
  id: number;
  season: string;
  crop: string;
  land: string;
  landUnit?: string;
};

type Profile = {
  village?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;

  // Optional address fields used for accurate farmer-location lookup.
  address?: string;
  addressLine1?: string;
  addressLine2?: string;
  postOffice?: string;
  tehsil?: string;
  block?: string;

  villageName?: string;
  cityName?: string;
  districtName?: string;
  stateName?: string;
  pinCode?: string;
};

type QuantityUnit =
  | "gram"
  | "kg"
  | "quintal"
  | "ton"
  | "bag";

type MandiBase = {
  name: string;
  district: string;
  state: string;
  address?: string;

  /*
    IMPORTANT:
    rate is stored as ₹/quintal.
    This keeps all mandi rates comparable.
  */
  rate: number;

  marketType: string;

  lat?: number;
  lng?: number;

  /*
    Bag weight is optional.
    Example:
    bagWeightKg: 50 means 1 bag = 50 kg.
  */
  bagWeightKg?: number;

  /*
    Crops supported by this mandi.
    If omitted, mandi is considered generic.
  */
  crops?: string[];
};

type Mandi = MandiBase & {
  id: string;

  distanceKm: number;

  /*
    Transport is calculated for the user's actual quantity.
  */
  transportPerQuintal: number;
  totalTransport: number;

  effectiveRatePerQuintal: number;
  effectiveRatePerKg: number;

  grossAmount: number;
  estimatedEarning: number;

  isSameDistrict: boolean;
  isSameState: boolean;
};

type T = {
  backTo: string;
  season: string;
  market: string;
  landArea: string;

  loadingTitle: string;
  loadingText: string;

  cropNotFound: string;
  backToCrops: string;

  currentMarket: string;
  marketDescription: string;

  cropLabel: string;
  indicativePrice: string;
  marketTrend: string;
  sellingAdvice: string;

  nearbyMarket: string;
  nearbyMarketDescription: string;

  profileLocation: string;
  usingProfileLocation: string;

  village: string;
  district: string;
  state: string;
  pincode: string;

  findMandi: string;
  refreshRates: string;
  refreshing: string;

  lastUpdated: string;
  searchingMandi: string;
  tryAgain: string;

  mandiFound: string;
  mandiRate: string;
  distance: string;

  transportation: string;
  effectiveRate: string;
  perQuintal: string;
  perKg: string;

  marketType: string;
  apmc: string;
  localMarket: string;

  noMandi: string;
  apiFailed: string;

  indicativeNotice: string;

  importantBeforeSelling: string;
  tip1: string;
  tip2: string;
  tip3: string;
  tip4: string;

  bestMandi: string;
  bestOption: string;

  quantityCalculator: string;
  quantity: string;

  selectUnit: string;
  gram: string;
  kg: string;
  quintal: string;
  ton: string;
  bag: string;

  quantityEquivalent: string;
  totalKg: string;

  grossAmount: string;
  totalTransport: string;
  estimatedEarning: string;

  save: string;
  saved: string;

  directions: string;

  availableCrop: string;

  netPerQuintal: string;
  netPerKg: string;

  sameDistrict: string;
  nearbyDistrict: string;
  otherDistrict: string;

  locationSource: string;
  browserLocation: string;
  profileLocationSource: string;

  rankingNote: string;

  distanceLimit: string;

  invalidQuantity: string;

  rateUnitNote: string;

  seasonNames: {
    Kharif: string;
    Rabi: string;
    Zaid: string;
    Other: string;
  };

  trendStable: string;
  trendModerate: string;
  trendVariable: string;
  trendCheck: string;

  unknownPrice: string;
};

/* =========================================================
   ENGLISH
========================================================= */

const en: T = {
  backTo: "Back to",
  season: "Season",
  market: "Market",
  landArea: "Land Area",

  loadingTitle: "Loading Market...",
  loadingText: "Please wait while we prepare market information.",

  cropNotFound: "Crop not found",
  backToCrops: "Back to Crops",

  currentMarket: "📊 Current Market Information",
  marketDescription:
    "Indicative information for your crop. Verify the latest local mandi rate before selling.",

  cropLabel: "Crop",
  indicativePrice: "Indicative Price",
  marketTrend: "Market Trend",
  sellingAdvice: "💡 Selling Advice",

  nearbyMarket: "📍 Nearby Mandi & Markets",
  nearbyMarketDescription:
    "Mandis are found around the farmer's saved profile address using its map coordinates. Nearby mandis from surrounding districts can also appear.",

  profileLocation: "Profile Location",
  usingProfileLocation: "Using location saved in your profile",

  village: "Village",
  district: "District",
  state: "State",
  pincode: "Pincode",

  findMandi: "📍 Find Nearby Mandi",
  refreshRates: "🔄 Refresh Latest Rates",
  refreshing: "🔄 Refreshing...",

  lastUpdated: "Last updated",
  searchingMandi: "🔎 Searching mandis...",
  tryAgain: "Try Again",

  mandiFound: "mandis found",
  mandiRate: "Mandi Rate",
  distance: "Distance",

  transportation: "Estimated Transport",
  effectiveRate: "Effective Rate",
  perQuintal: "per quintal",
  perKg: "per kg",

  marketType: "Market Type",
  apmc: "APMC Mandi",
  localMarket: "Local Market",

  noMandi:
    "No suitable nearby mandi was found for this location.",
  apiFailed:
    "Live mandi search is unavailable right now. Showing available market information.",

  indicativeNotice:
    "Mandi rates are indicative. Final rate must be verified at the mandi. Transport cost is estimated and may vary.",

  importantBeforeSelling: "⚠️ Important Before Selling",

  tip1:
    "Compare prices from more than one nearby mandi whenever possible.",

  tip2:
    "Crop quality, moisture and grading can affect the final selling price.",

  tip3:
    "Consider transportation cost before choosing a mandi with a slightly higher price.",

  tip4:
    "Verify the latest mandi rate before making a final selling decision.",

  bestMandi: "⭐ Best Mandi Recommendation",
  bestOption: "Best option",

  quantityCalculator: "💰 Quantity-wise Earning Calculator",
  quantity: "Amount to Sell",

  selectUnit: "Unit",

  gram: "Gram",
  kg: "Kilogram",
  quintal: "Quintal",
  ton: "Ton",
  bag: "Bag",

  quantityEquivalent: "Equivalent quantity",
  totalKg: "Total kg",

  grossAmount: "Gross Sale Amount",
  totalTransport: "Total Transport Cost",
  estimatedEarning: "Estimated Earning",

  save: "Save Mandi",
  saved: "Saved Mandi",

  directions: "📍 Directions",

  availableCrop: "Available Crop",

  netPerQuintal: "Net per quintal",
  netPerKg: "Net per kg",

  sameDistrict: "Same District",
  nearbyDistrict: "Nearby District",
  otherDistrict: "Other District",

  locationSource: "Location Source",
  browserLocation: "Browser Location",
  profileLocationSource: "Profile Location",

  rankingNote:
    "Ranking considers distance, district priority, transport cost and estimated earning.",

  distanceLimit: "Nearby distance limit",

  invalidQuantity:
    "Please enter a quantity greater than 0.",

  rateUnitNote:
    "Mandi rates are normalized to ₹/quintal for comparison.",

  seasonNames: {
    Kharif: "Kharif",
    Rabi: "Rabi",
    Zaid: "Zaid",
    Other: "Other",
  },

  trendStable: "Stable",
  trendModerate: "Moderate",
  trendVariable: "Variable",
  trendCheck: "Check local mandi",

  unknownPrice: "Market rate unavailable",
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations: Record<string, Partial<T>> = {
  hi: {
    backTo: "वापस जाएँ",
    season: "मौसम",
    market: "बाज़ार",
    landArea: "जमीन का क्षेत्रफल",

    loadingTitle: "बाज़ार की जानकारी लोड हो रही है...",
    loadingText: "कृपया प्रतीक्षा करें।",

    cropNotFound: "फसल नहीं मिली",
    backToCrops: "फसलों पर वापस जाएँ",

    currentMarket: "📊 वर्तमान बाज़ार जानकारी",
    marketDescription:
      "आपकी फसल के लिए अनुमानित जानकारी। बेचने से पहले स्थानीय मंडी का नवीनतम भाव जाँचें।",

    cropLabel: "फसल",
    indicativePrice: "अनुमानित कीमत",
    marketTrend: "बाज़ार का रुझान",
    sellingAdvice: "💡 बिक्री की सलाह",

    nearbyMarket: "📍 नज़दीकी मंडी और बाज़ार",
    nearbyMarketDescription:
      "आपके सेव किए गए पते के आसपास की मंडियाँ वास्तविक दूरी के आधार पर दिखाई जाएँगी। पास के दूसरे जिलों की मंडियाँ भी दिखाई जा सकती हैं।",

    profileLocation: "प्रोफाइल लोकेशन",
    usingProfileLocation:
      "प्रोफाइल में सेव की गई लोकेशन का उपयोग हो रहा है",

    village: "गाँव",
    district: "जिला",
    state: "राज्य",
    pincode: "पिनकोड",

    findMandi: "📍 नज़दीकी मंडी खोजें",
    refreshRates: "🔄 नवीनतम भाव रिफ्रेश करें",
    refreshing: "🔄 रिफ्रेश हो रहा है...",

    lastUpdated: "अंतिम अपडेट",
    searchingMandi: "🔎 मंडियाँ खोजी जा रही हैं...",
    tryAgain: "फिर से कोशिश करें",

    mandiFound: "मंडियाँ मिलीं",
    mandiRate: "मंडी भाव",
    distance: "दूरी",

    transportation: "अनुमानित परिवहन",
    effectiveRate: "प्रभावी भाव",
    perQuintal: "प्रति क्विंटल",
    perKg: "प्रति किलो",

    marketType: "बाज़ार का प्रकार",
    apmc: "APMC मंडी",
    localMarket: "स्थानीय बाज़ार",

    noMandi: "इस लोकेशन के आसपास उपयुक्त मंडी नहीं मिली।",

    indicativeNotice:
      "मंडी भाव अनुमानित हैं। अंतिम भाव मंडी में जरूर जाँचें। परिवहन खर्च अनुमानित है और बदल सकता है।",

    importantBeforeSelling: "⚠️ बेचने से पहले जरूरी बातें",

    tip1:
      "जहाँ संभव हो, एक से अधिक नज़दीकी मंडियों के भाव की तुलना करें।",

    tip2:
      "फसल की गुणवत्ता, नमी और ग्रेडिंग से अंतिम कीमत प्रभावित हो सकती है।",

    tip3:
      "थोड़ा अधिक भाव वाली मंडी चुनने से पहले परिवहन खर्च भी ध्यान में रखें।",

    tip4:
      "अंतिम बिक्री निर्णय से पहले नवीनतम मंडी भाव जरूर जाँचें।",

    bestMandi: "⭐ सबसे अच्छी मंडी की सलाह",
    bestOption: "सबसे अच्छा विकल्प",

    quantityCalculator: "💰 मात्रा के हिसाब से कमाई कैलकुलेटर",
    quantity: "बेचने की मात्रा",

    selectUnit: "इकाई",

    gram: "ग्राम",
    kg: "किलो",
    quintal: "क्विंटल",
    ton: "टन",
    bag: "बोरी",

    quantityEquivalent: "कुल मात्रा",
    totalKg: "कुल किलो",

    grossAmount: "कुल बिक्री रकम",
    totalTransport: "कुल परिवहन खर्च",
    estimatedEarning: "अनुमानित कमाई",

    save: "मंडी सेव करें",
    saved: "मंडी सेव है",

    directions: "📍 रास्ता देखें",

    availableCrop: "उपलब्ध फसल",

    netPerQuintal: "प्रति क्विंटल शुद्ध भाव",
    netPerKg: "प्रति किलो शुद्ध भाव",

    sameDistrict: "इसी जिले की मंडी",
    nearbyDistrict: "नज़दीकी जिले की मंडी",
    otherDistrict: "अन्य जिले की मंडी",

    locationSource: "लोकेशन स्रोत",
    browserLocation: "मोबाइल लोकेशन",
    profileLocationSource: "प्रोफाइल लोकेशन",

    rankingNote:
      "रैंकिंग में दूरी, जिला प्राथमिकता, परिवहन खर्च और अनुमानित कमाई को ध्यान में रखा गया है।",

    distanceLimit: "नज़दीकी दूरी सीमा",

    invalidQuantity:
      "कृपया 0 से अधिक मात्रा दर्ज करें।",

    rateUnitNote:
      "तुलना के लिए सभी मंडी भाव ₹/क्विंटल में normalize किए गए हैं।",

    seasonNames: {
      Kharif: "खरीफ",
      Rabi: "रबी",
      Zaid: "जायद",
      Other: "अन्य",
    },

    trendStable: "स्थिर",
    trendModerate: "मध्यम",
    trendVariable: "बदलता हुआ",
    trendCheck: "स्थानीय मंडी का भाव देखें",

    unknownPrice: "बाज़ार भाव उपलब्ध नहीं है",
  }
};

/* =========================================================
   MANDI DATABASE

   NOTE:
   All rates are ₹/quintal.

   Later, this array can be replaced by:
   /api/mandis
   /api/mandis/nearby
   data.gov.in
   Agmarknet
   etc.

   Coordinates allow real distance calculation when
   browser GPS is available.
========================================================= */

const MANDI_DATABASE: MandiBase[] = [];

/* =========================================================
   HELPERS
========================================================= */

const normalize = (value: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

/*
  Crop name matching.
*/
function isCropMatch(
  cropName: string,
  mandi: MandiBase
): boolean {
  // Farmer can add ANY crop name.
  // A mandi without an explicit crop list is generic.
  if (!mandi.crops || mandi.crops.length === 0) {
    return true;
  }

  const crop = normalize(cropName);
  return mandi.crops.some(
    (mCrop) => normalize(mCrop) === crop
  );
}

/*
  Convert entered quantity into kg into kg.

  1 gram = 0.001 kg
  1 kg = 1 kg
  1 quintal = 100 kg
  1 ton = 1000 kg
  1 bag = 50 kg

  Bag default is 50 kg.
*/
function quantityToKg(
  quantity: number,
  unit: QuantityUnit
) {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return 0;
  }

  switch (unit) {
    case "gram":
      return quantity / 1000;

    case "kg":
      return quantity;

    case "quintal":
      return quantity * 100;

    case "ton":
      return quantity * 1000;

    case "bag":
      return quantity * 50;

    default:
      return 0;
  }
}

/*
  Convert kg to entered unit.
*/
function kgToEnteredUnit(
  kg: number,
  unit: QuantityUnit
) {
  switch (unit) {
    case "gram":
      return kg * 1000;

    case "kg":
      return kg;

    case "quintal":
      return kg / 100;

    case "ton":
      return kg / 1000;

    case "bag":
      return kg / 50;

    default:
      return kg;
  }
}

/*
  Haversine distance.
*/
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

/*
  Build the farmer's most specific saved address.
  The saved profile address is intentionally preferred over browser GPS.
*/
function buildProfileAddress(profileLocation: {
  village: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  address?: string;
  addressLine1?: string;
  addressLine2?: string;
  postOffice?: string;
  tehsil?: string;
  block?: string;
}) {
  return [
    profileLocation.address,
    profileLocation.addressLine1,
    profileLocation.addressLine2,
    profileLocation.village,
    profileLocation.postOffice,
    profileLocation.tehsil,
    profileLocation.block,
    profileLocation.city,
    profileLocation.district,
    profileLocation.state,
    profileLocation.pincode,
    "India",
  ]
    .filter(Boolean)
    .join(", ");
}

type GeocodedLocation = {
  lat: number;
  lng: number;
  displayName: string;
  village?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
};

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function geocodeFarmerAddress(
  address: string
): Promise<GeocodedLocation | null> {
  if (!address.trim()) return null;

  const cleaned = address.replace(/\\s+/g, " ").trim();
  const parts = cleaned.split(",").map((p) => p.trim()).filter(Boolean);

  // Keep the farmer's saved address as the source. Try a few progressively
  // simpler forms because post-office/village names are often indexed differently.
  const queries = Array.from(new Set([
    cleaned,
    parts.slice(-5).join(", "),
    parts.slice(-4).join(", "),
    parts.slice(-3).join(", "),
  ].filter(Boolean)));

  // Try address variants in parallel so a slow geocoder cannot make the page wait minutes.
  const attempts = queries.map(async (query) => {
    try {
      const url = "https://nominatim.openstreetmap.org/search?" +
        new URLSearchParams({
          format: "jsonv2",
          addressdetails: "1",
          limit: "1",
          q: query,
        }).toString();

      const response = await fetchWithTimeout(url, {
        headers: {
          Accept: "application/json",
          "Accept-Language": "en",
        },
      }, 6000);

      if (!response.ok) return null;

      const data = await response.json() as Array<{
        lat?: string;
        lon?: string;
        display_name?: string;
        address?: Record<string, string | undefined>;
      }>;

      const item = data?.[0];
      if (!item?.lat || !item?.lon) return null;

      const lat = Number(item.lat);
      const lng = Number(item.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

      const a = item.address || {};
      return {
        lat,
        lng,
        displayName: item.display_name || address,
        village: a.village || a.hamlet || a.suburb || a.neighbourhood,
        city: a.city || a.town || a.municipality || a.city_district,
        district: a.state_district || a.district || a.county,
        state: a.state,
        pincode: a.postcode,
      } as GeocodedLocation;
    } catch {
      return null;
    }
  });

  const results = await Promise.all(attempts);
  return results.find(Boolean) || null;
}

async function findNearbyIndianMandis(
  location: GeocodedLocation,
  radiusKm: number
): Promise<MandiBase[]> {
  const radiusMeters = Math.round(radiusKm * 1000);
  const { lat, lng } = location;

  // Use OSM Overpass only as one data source. It can be slow or temporarily
  // unavailable, so Nominatim is queried in parallel as a fast fallback.
  const overpassQuery = `
[out:json][timeout:7];
(
  nwr["amenity"="marketplace"](around:${radiusMeters},${lat},${lng});
  nwr["name"~"mandi|apmc|krishi|agricultural market|agriculture market|kisan market|कृषि मंडी|कृषि बाजार|मंडी|बाज़ार|बाजार",i](around:${radiusMeters},${lat},${lng});
);
out center tags;`;

  const overpassEndpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
  ];

  const parseOverpass = async (endpoint: string): Promise<MandiBase[]> => {
    try {
      const response = await fetchWithTimeout(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          Accept: "application/json",
        },
        body: overpassQuery,
      }, 7000);

      if (!response.ok) return [];
      const raw = await response.json() as {
        elements?: Array<{
          type: string;
          id: number;
          lat?: number;
          lon?: number;
          center?: { lat?: number; lon?: number };
          tags?: Record<string, string | undefined>;
        }>;
      };

      return (raw.elements || []).flatMap((element) => {
        const tags = element.tags || {};
        const name = tags.name || tags["name:en"] || tags["name:hi"] || "Agricultural Market";
        const elementLat = typeof element.lat === "number" ? element.lat : element.center?.lat;
        const elementLng = typeof element.lon === "number" ? element.lon : element.center?.lon;
        if (typeof elementLat !== "number" || typeof elementLng !== "number") return [];

        return [{
          name,
          district: tags["addr:district"] || tags["is_in:district"] || tags.district || "",
          state: tags["addr:state"] || tags.state || "",
          address: [
            tags["addr:housenumber"], tags["addr:street"], tags["addr:suburb"],
            tags["addr:city"], tags["addr:district"], tags["addr:state"], tags["addr:postcode"],
          ].filter(Boolean).join(", ") || tags["addr:full"] || undefined,
          rate: 0,
          marketType: /apmc|mandi/i.test(name) || /apmc|mandi/i.test(tags.operator || "")
            ? "APMC"
            : "Local Market",
          lat: elementLat,
          lng: elementLng,
        } as MandiBase];
      });
    } catch {
      return [];
    }
  };

  const nominatimQueries = [
    `mandi near ${location.city || location.district || location.state || ""}`,
    `agricultural market near ${location.city || location.district || location.state || ""}`,
    `APMC near ${location.district || location.state || ""}`,
    `market near ${location.city || location.district || location.state || ""}`,
  ].filter((q, i, arr) => q.trim() && arr.indexOf(q) === i);

  const parseNominatim = async (q: string): Promise<MandiBase[]> => {
    try {
      const params = new URLSearchParams({
        q,
        format: "jsonv2",
        limit: "12",
        addressdetails: "1",
        "accept-language": "en",
      });
      const response = await fetchWithTimeout(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "KrishiMitra/1.0 (agricultural market finder)",
          },
        },
        6500
      );
      if (!response.ok) return [];

      const raw = await response.json() as Array<{
        lat?: string;
        lon?: string;
        display_name?: string;
        name?: string;
        type?: string;
        class?: string;
        address?: Record<string, string | undefined>;
      }>;

      return raw.flatMap((item) => {
        const itemLat = Number(item.lat);
        const itemLng = Number(item.lon);
        if (!Number.isFinite(itemLat) || !Number.isFinite(itemLng)) return [];

        const address = item.address || {};
        const name = item.name || item.display_name?.split(",")[0] || "Agricultural Market";
        const haystack = `${name} ${item.display_name || ""} ${item.type || ""}`.toLowerCase();
        const looksLikeMarket = /mandi|apmc|agricultural|wholesale|market|bazaar|बाजार|मंडी|कृषि/.test(haystack);
        if (!looksLikeMarket) return [];

        return [{
          name,
          district: address.state_district || address.district || address.county || "",
          state: address.state || "",
          address: item.display_name,
          rate: 0,
          marketType: /apmc|mandi/i.test(haystack) ? "APMC" : "Local Market",
          lat: itemLat,
          lng: itemLng,
        } as MandiBase];
      });
    } catch {
      return [];
    }
  };

  // Start all providers together. We do not wait for a slow provider before
  // trying the next one. The first provider returning useful data wins.
  const allRequests = [
    ...overpassEndpoints.map(parseOverpass),
    ...nominatimQueries.map(parseNominatim),
  ];

  const results = await Promise.all(allRequests);
  const merged = new Map<string, MandiBase>();

  for (const list of results) {
    for (const mandi of list) {
      if (typeof mandi.lat !== "number" || typeof mandi.lng !== "number") continue;
      const distance = haversineDistance(lat, lng, mandi.lat, mandi.lng);
      if (distance > radiusKm) continue;
      const key = `${normalize(mandi.name)}|${normalize(mandi.district)}|${normalize(mandi.state)}`;
      if (!merged.has(key)) merged.set(key, mandi);
    }
  }

  return Array.from(merged.values()).sort((a, b) => {
    const distanceA =
      typeof a.lat === "number" && typeof a.lng === "number"
        ? haversineDistance(lat, lng, a.lat, a.lng)
        : Number.POSITIVE_INFINITY;
    const distanceB =
      typeof b.lat === "number" && typeof b.lng === "number"
        ? haversineDistance(lat, lng, b.lat, b.lng)
        : Number.POSITIVE_INFINITY;
    return distanceA - distanceB;
  });
}

function getIndicativeRateForMandi(
  mandi: MandiBase,
  cropName: string,
  market: { price: string }
) {
  const known = MANDI_DATABASE.find((item) => {
    const sameName =
      normalize(item.name) === normalize(mandi.name);
    const sameArea =
      normalize(item.district) !== "" &&
      normalize(item.district) === normalize(mandi.district) &&
      normalize(item.state) === normalize(mandi.state);
    return sameName || sameArea;
  });

  if (known) return known.rate;

  const numbers = market.price.match(/[0-9][0-9,]*/g);
  if (numbers?.length) {
    const values = numbers
      .map((value) => Number(value.replace(/,/g, "")))
      .filter((value) => Number.isFinite(value));

    if (values.length) {
      return Math.round(
        values.reduce((sum, value) => sum + value, 0) /
          values.length
      );
    }
  }

  // No fixed crop names or fixed crop rates.
  // Any farmer-entered crop is accepted.
  return 0;
}

/*
  Transport estimate per quintal.
*/
function estimateTransport(
  distanceKm: number
) {
  if (distanceKm <= 10) return 120;
  if (distanceKm <= 25) return 220;
  if (distanceKm <= 50) return 350;
  if (distanceKm <= 75) return 500;
  if (distanceKm <= 100) return 650;
  if (distanceKm <= 150) return 850;
  if (distanceKm <= 200) return 1050;

  return 1300;
}

/*
  Location from localStorage.
*/
function getProfileFromStorage(): Profile {
  if (typeof window === "undefined") {
    return {};
  }

  const keys = [
    "farmerProfile",
    "profile",
    "userProfile",
    "farmer",
    "user",
    "profileData",
  ];

  for (const key of keys) {
    const raw = localStorage.getItem(key);

    if (!raw) continue;

    try {
      const data = JSON.parse(raw);

      if (
        data &&
        typeof data === "object"
      ) {
        return data as Profile;
      }
    } catch {
      // ignore
    }
  }

  return {};
}

/* =========================================================
   MARKET INFO
========================================================= */

function getMarketInfo(
  cropName: string,
  language: string,
  t: T
) {
  // Do not restrict the farmer to a fixed crop list.
  // The crop name comes directly from the farmer's saved crop.
  // Market information is therefore generic unless a live/known rate is available.
  return {
    price: t.unknownPrice,
    trend: t.trendCheck,
    advice:
      language === "hi"
        ? "इस फसल का नवीनतम भाव जानने के लिए अपनी नज़दीकी मंडी से संपर्क करें।"
        : "Check your nearest mandi for the latest price before selling.",
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] =
    useState("en");

  const [crop, setCrop] =
    useState<Crop | null>(null);

  const [profile, setProfile] =
    useState<Profile>({});

  const [loading, setLoading] =
    useState(true);

  const [searching, setSearching] =
    useState(false);

  const [searched, setSearched] =
    useState(false);

  const [mandis, setMandis] =
    useState<Mandi[]>([]);

  /*
    IMPORTANT:
    Quantity is controlled by user.
  */
  const [quantity, setQuantity] =
    useState("20");

  const [quantityUnit, setQuantityUnit] =
    useState<QuantityUnit>("quintal");

  const [lastUpdated, setLastUpdated] =
    useState("");

  const [favorites, setFavorites] =
    useState<string[]>([]);

  /*
    Browser GPS.
  */
  const [browserCoords, setBrowserCoords] =
    useState<{
      lat: number;
      lng: number;
    } | null>(null);

  const [locationSource, setLocationSource] =
    useState<
      "browser" | "profile"
    >("profile");

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "selectedLanguage"
      );

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const savedCrops =
      localStorage.getItem(
        "farmerCrops"
      );

    if (savedCrops) {
      try {
        const crops: Crop[] =
          JSON.parse(savedCrops);

        const selected = crops.find(
          (item) =>
            item.id ===
            Number(params.id)
        );

        if (selected) {
          setCrop(selected);
        }
      } catch {
        // ignore
      }
    }

    setProfile(
      getProfileFromStorage()
    );

    try {
      const savedFavs =
        JSON.parse(
          localStorage.getItem(
            "favoriteMandis"
          ) || "[]"
        );

      if (Array.isArray(savedFavs)) {
        setFavorites(savedFavs);
      }
    } catch {
      // ignore
    }

    // Do NOT request browser/live GPS here.
    // Mandi search must always use the farmer's saved profile location.
    setLocationSource("profile");

    setLoading(false);
  }, [params.id]);

  /* =======================================================
     TRANSLATION
  ======================================================= */

  const t: T = {
    ...en,
    ...(translations[language] ||
      {}),
  };

  const isRTL = false;

  /* =======================================================
     PROFILE LOCATION
  ======================================================= */

  const profileLocation =
    useMemo(
      () => ({
        village: String(
          profile.village ||
            profile.villageName ||
            ""
        ),

        city: String(
          profile.city ||
            profile.cityName ||
            ""
        ),

        district: String(
          profile.district ||
            profile.districtName ||
            ""
        ),

        state: String(
          profile.state ||
            profile.stateName ||
            ""
        ),

        pincode: String(
          profile.pincode ||
            profile.pinCode ||
            ""
        ),

        address: String(profile.address || ""),
        addressLine1: String(profile.addressLine1 || ""),
        addressLine2: String(profile.addressLine2 || ""),
        postOffice: String(profile.postOffice || ""),
        tehsil: String(profile.tehsil || ""),
        block: String(profile.block || ""),
      }),
      [profile]
    );

  /* =======================================================
     SEASON
  ======================================================= */

  const getSeasonName = (
    season: string
  ) => {
    if (season === "Kharif") {
      return t.seasonNames.Kharif;
    }

    if (season === "Rabi") {
      return t.seasonNames.Rabi;
    }

    if (season === "Zaid") {
      return t.seasonNames.Zaid;
    }

    if (season === "Other") {
      return t.seasonNames.Other;
    }

    return season;
  };

  /* =======================================================
     USER QUANTITY
  ======================================================= */

  const parsedQuantity =
    Number(quantity);

  const safeQuantity =
    Number.isFinite(
      parsedQuantity
    ) &&
    parsedQuantity > 0
      ? parsedQuantity
      : 0;

  const totalKg =
    quantityToKg(
      safeQuantity,
      quantityUnit
    );

  const enteredQuantityLabel =
    `${safeQuantity || 0} ${
      quantityUnit === "gram"
        ? t.gram
        : quantityUnit === "kg"
        ? t.kg
        : quantityUnit === "quintal"
        ? t.quintal
        : quantityUnit === "ton"
        ? t.ton
        : t.bag
    }`;

  /* =======================================================
     MARKET
  ======================================================= */

  const market = crop
    ? getMarketInfo(
        crop.crop,
        language,
        t
      )
    : null;

  /* =======================================================
     SEARCH MANDIS
  ======================================================= */

  const searchMandis = async () => {
    if (!crop) return;

    if (totalKg <= 0) {
      setSearched(true);
      setMandis([]);
      return;
    }

    setSearching(true);
    setSearched(false);

    try {
      /* IMPORTANT: Mandi search ALWAYS uses the farmer's saved profile address.
         Browser/live GPS is deliberately NOT used for mandi search. */
      const savedAddress = buildProfileAddress(profileLocation);
      let searchLocation: GeocodedLocation | null = null;

      if (savedAddress) {
        searchLocation = await geocodeFarmerAddress(savedAddress);
      }

      if (searchLocation) {
        setLocationSource("profile");
      }

      if (!searchLocation) {
        setMandis([]);
        setSearched(true);
        return;
      }

      /*
        75 km catches border-area cases (for example Panchgachia/Supaul)
        where mandis from both Supaul and Saharsa can genuinely be nearby.
      */
      // One bounded search keeps the UI fast while still allowing a nearby
      // mandi from a neighbouring district. There is no fixed mandi list.
      const nearby = await findNearbyIndianMandis(searchLocation, 150);

      const quantityQuintal = totalKg / 100;

      const finalMandis: Mandi[] = nearby
        .map((mandi, index) => {
          if (
            typeof mandi.lat !== "number" ||
            typeof mandi.lng !== "number"
          ) return null;

          const distanceKm = haversineDistance(
            searchLocation!.lat,
            searchLocation!.lng,
            mandi.lat,
            mandi.lng
          );

          if (distanceKm > 150) return null;

          const resolvedDistrict =
            mandi.district ||
            searchLocation!.district ||
            profileLocation.district;

          const resolvedState =
            mandi.state ||
            searchLocation!.state ||
            profileLocation.state;

          const isSameDistrict =
            normalize(resolvedDistrict) !== "" &&
            normalize(resolvedDistrict) ===
              normalize(
                searchLocation!.district ||
                  profileLocation.district
              );

          const isSameState =
            normalize(resolvedState) !== "" &&
            normalize(resolvedState) ===
              normalize(
                searchLocation!.state ||
                  profileLocation.state
              );

          const rate = getIndicativeRateForMandi(
            mandi,
            crop.crop,
            market || { price: "" }
          );

          const transportPerQuintal =
            estimateTransport(distanceKm);
          const grossAmount =
            rate * quantityQuintal;
          const totalTransport =
            transportPerQuintal * quantityQuintal;
          const estimatedEarning = Math.max(
            0,
            grossAmount - totalTransport
          );
          const effectiveRatePerQuintal = Math.max(
            0,
            rate - transportPerQuintal
          );

          return {
            ...mandi,
            district: resolvedDistrict,
            state: resolvedState,
            rate,
            id: `osm-${index}-${mandi.name}-${mandi.district}-${mandi.state}`,
            distanceKm:
              Math.round(distanceKm * 10) / 10,
            transportPerQuintal,
            totalTransport,
            effectiveRatePerQuintal,
            effectiveRatePerKg:
              effectiveRatePerQuintal / 100,
            grossAmount,
            estimatedEarning,
            isSameDistrict,
            isSameState,
          };
        })
        .filter(
          (item): item is Mandi => item !== null
        );

      /* Real distance is the primary ranking factor. */
      finalMandis.sort((a, b) => {
        if (Math.abs(a.distanceKm - b.distanceKm) > 2) {
          return a.distanceKm - b.distanceKm;
        }
        if (a.isSameDistrict !== b.isSameDistrict) {
          return a.isSameDistrict ? -1 : 1;
        }
        if (a.isSameState !== b.isSameState) {
          return a.isSameState ? -1 : 1;
        }
        return b.estimatedEarning - a.estimatedEarning;
      });

      setMandis(finalMandis.slice(0, 12));
      setSearched(true);
      setLastUpdated(new Date().toLocaleString("en-IN"));
    } catch (error) {
      console.error("Nearby mandi search failed:", error);
      setMandis([]);
      setSearched(true);
    } finally {
      setSearching(false);
    }
  };

  /* =======================================================
     LIVE RECALCULATION

     If user changes quantity/unit after searching,
     all mandi calculations are recalculated immediately.
  ======================================================= */

  const recalculatedMandis =
    useMemo(() => {
      if (!mandis.length) {
        return [];
      }

      const quantityQuintal =
        totalKg / 100;

      return mandis.map(
        (mandi) => {
          const grossAmount =
            mandi.rate *
            quantityQuintal;

          const totalTransport =
            mandi.transportPerQuintal *
            quantityQuintal;

          const estimatedEarning =
            Math.max(
              0,
              grossAmount -
                totalTransport
            );

          return {
            ...mandi,
            grossAmount,
            totalTransport,
            estimatedEarning,
          };
        }
      );
    }, [mandis, totalKg]);

  const bestMandi =
    recalculatedMandis[0] ||
    null;

  /* =======================================================
     FAVORITE
  ======================================================= */

  const toggleFavorite = (
    mandi: Mandi
  ) => {
    const next =
      favorites.includes(
        mandi.id
      )
        ? favorites.filter(
            (id) =>
              id !== mandi.id
          )
        : [
            ...favorites,
            mandi.id,
          ];

    setFavorites(next);

    localStorage.setItem(
      "favoriteMandis",
      JSON.stringify(next)
    );
  };

  /* =======================================================
     DIRECTIONS
  ======================================================= */

  const openDirections = (
    mandi: Mandi
  ) => {
    const origin =
      buildProfileAddress(profileLocation) ||
      (browserCoords
        ? `${browserCoords.lat},${browserCoords.lng}`
        : "India");

    const destination = [
      mandi.name,
      mandi.address,
      mandi.district,
      mandi.state,
      "India",
    ]
      .filter(Boolean)
      .join(", ");

    const url =
      `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        origin
      )}&destination=${encodeURIComponent(
        destination
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={
          isRTL
            ? "rtl"
            : "ltr"
        }
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">
            🏪
          </div>

          <h1 className="text-2xl font-bold text-green-800">
            {t.loadingTitle}
          </h1>

          <p className="text-gray-900 mt-2">
            {t.loadingText}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     CROP NOT FOUND
  ======================================================= */

  if (!crop || !market) {
    return (
      <main
        className="min-h-screen bg-green-50 flex items-center justify-center px-5"
        dir={
          isRTL
            ? "rtl"
            : "ltr"
        }
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">
            🌱
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.cropNotFound}
          </h1>

          <button
            onClick={() =>
              router.push(
                "/crops"
              )
            }
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
          >
            ← {t.backToCrops}
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir={
        isRTL
          ? "rtl"
          : "ltr"
      }
    >
      <div className="max-w-6xl mx-auto">

        {/* BACK */}
        <button
          onClick={() =>
            router.push(
              `/crops/${crop.id}`
            )
          }
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← {t.backTo}{" "}
          {crop.crop}
        </button>

        {/* =================================================
            CROP HEADER
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-5xl">
              🌾
            </div>

            <div>
              <p className="text-sm text-green-600 font-semibold">
                {getSeasonName(
                  crop.season
                )}{" "}
                {t.season}
              </p>

              <h1 className="text-3xl font-bold text-green-800 mt-1">
                {crop.crop}{" "}
                {t.market}
              </h1>

              <p className="text-gray-900 mt-2">
                {t.landArea}:{" "}
                <span className="font-semibold">
                  {crop.land}{" "}
                  {crop.landUnit ||
                    "acres"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            CURRENT MARKET
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <h2 className="text-2xl font-bold text-green-800">
            {t.currentMarket}
          </h2>

          <p className="text-gray-900 mt-2">
            {t.marketDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                🌾
              </div>

              <p className="text-sm text-gray-900">
                {t.cropLabel}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {crop.crop}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                💰
              </div>

              <p className="text-sm text-gray-900">
                {t.indicativePrice}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.price}
              </p>

              <p className="text-sm text-gray-900 mt-1">
                {t.perQuintal}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-3">
                📈
              </div>

              <p className="text-sm text-gray-900">
                {t.marketTrend}
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {market.trend}
              </p>
            </div>

          </div>

          <div className="mt-5 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-900">
              ℹ️ {t.rateUnitNote}
            </p>
          </div>
        </div>

        {/* =================================================
            SELLING ADVICE
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">
          <h2 className="text-2xl font-bold text-green-800">
            {t.sellingAdvice}
          </h2>

          <div className="bg-green-50 rounded-2xl p-6 mt-5">
            <p className="text-gray-900 leading-relaxed">
              {market.advice}
            </p>
          </div>
        </div>

        {/* =================================================
            NEARBY MANDI
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            {t.nearbyMarket}
          </h2>

          <p className="text-gray-900 mt-2">
            {t.nearbyMarketDescription}
          </p>

          {/* LOCATION CARD */}

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <div className="text-3xl">
                📍
              </div>

              <div>

                <p className="text-sm text-blue-600 font-semibold">
                  {t.profileLocation}
                </p>

                <p className="font-bold text-blue-900">
                  {buildProfileAddress(profileLocation) ||
                    (browserCoords
                      ? `${browserCoords.lat.toFixed(5)}, ${browserCoords.lng.toFixed(5)}`
                      : "—")}
                </p>

                <p className="text-sm text-blue-700 mt-1">
                  ✓{" "}
                  {locationSource === "browser"
                    ? t.browserLocation
                    : t.usingProfileLocation}
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {[
                [
                  t.village,
                  profileLocation.village,
                ],

                [
                  t.district,
                  profileLocation.district,
                ],

                [
                  t.state,
                  profileLocation.state,
                ],

                [
                  t.pincode,
                  profileLocation.pincode,
                ],
              ].map(
                ([label, value]) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl p-3"
                  >
                    <p className="text-xs text-gray-900">
                      {label}
                    </p>

                    <p className="font-bold text-gray-800 mt-1">
                      {value ||
                        "—"}
                    </p>
                  </div>
                )
              )}

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              <span className="px-3 py-1 rounded-full bg-white border text-xs font-semibold text-gray-900">
                {t.locationSource}:{" "}
                {locationSource ===
                "browser"
                  ? `📱 ${t.browserLocation}`
                  : `👤 ${t.profileLocationSource}`}
              </span>

              <span className="px-3 py-1 rounded-full bg-white border text-xs font-semibold text-gray-900">
                {t.distanceLimit}:{" "}
                {browserCoords
                  ? "180 km"
                  : "220 km"}
              </span>

            </div>

          </div>

          {/* =================================================
              QUANTITY INPUT
          ================================================= */}

          <div className="mt-7 bg-green-50 border border-green-200 rounded-3xl p-6">

            <h3 className="text-xl font-bold text-green-900">
              {t.quantityCalculator}
            </h3>

            <p className="text-sm text-green-800 mt-1">
              {t.quantity}:{" "}
              <strong>
                {enteredQuantityLabel}
              </strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

              {/* QUANTITY */}

              <div>

                <label className="text-sm font-semibold text-gray-900">
                  {t.quantity}
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.001"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="20"
                />

              </div>

              {/* UNIT */}

              <div>

                <label className="text-sm font-semibold text-gray-900">
                  {t.selectUnit}
                </label>

                <select
                  value={
                    quantityUnit
                  }
                  onChange={(e) =>
                    setQuantityUnit(
                      e.target
                        .value as QuantityUnit
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-green-400"
                >

                  <option value="gram">
                    {t.gram}
                  </option>

                  <option value="kg">
                    {t.kg}
                  </option>

                  <option value="quintal">
                    {t.quintal}
                  </option>

                  <option value="ton">
                    {t.ton}
                  </option>

                  <option value="bag">
                    {t.bag} — 50 kg
                  </option>

                </select>

              </div>

            </div>

            {/* QUANTITY CONVERSION */}

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-white rounded-2xl p-4 border border-green-100">

                <p className="text-xs text-gray-900">
                  {t.quantityEquivalent}
                </p>

                <p className="text-xl font-extrabold text-green-800 mt-1">
                  {totalKg.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 3,
                    }
                  )}{" "}
                  {t.kg}
                </p>

              </div>

              <div className="bg-white rounded-2xl p-4 border border-green-100">

                <p className="text-xs text-gray-900">
                  {t.quantity}
                </p>

                <p className="text-xl font-extrabold text-green-800 mt-1">
                  {enteredQuantityLabel}
                </p>

              </div>

            </div>

            {safeQuantity <=
              0 && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-700 font-semibold">
                  {t.invalidQuantity}
                </p>
              </div>
            )}

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex flex-wrap gap-3 mt-6">

            <button
              onClick={
                searchMandis
              }
              disabled={
                searching ||
                totalKg <= 0
              }
              className="px-7 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 disabled:opacity-60 transition"
            >
              {searching
                ? t.searchingMandi
                : t.findMandi}
            </button>

            {searched && (
              <button
                onClick={
                  searchMandis
                }
                disabled={
                  searching ||
                  totalKg <= 0
                }
                className="px-7 py-3 rounded-xl bg-white border-2 border-green-700 text-green-700 font-bold hover:bg-green-50 disabled:opacity-60 transition"
              >
                {searching
                  ? t.refreshing
                  : t.refreshRates}
              </button>
            )}

          </div>

          {lastUpdated && (
            <p className="text-sm text-gray-900 mt-3">
              🕒{" "}
              {t.lastUpdated}:{" "}
              {lastUpdated}
            </p>
          )}

          {/* =================================================
              RANKING INFO
          ================================================= */}

          {searched && (
            <div className="mt-5 bg-gray-50 rounded-2xl p-4">
              <p className="text-sm text-gray-900">
                ℹ️{" "}
                {t.rankingNote}
              </p>
            </div>
          )}

          {/* =================================================
              BEST MANDI
          ================================================= */}

          {searched &&
            bestMandi && (
              <div className="mt-7 bg-green-700 text-white rounded-3xl p-6 shadow-md">

                <p className="font-bold text-lg">
                  {t.bestMandi}
                </p>

                <h3 className="text-2xl font-extrabold mt-2">
                  ⭐{" "}
                  {t.bestOption}:{" "}
                  {bestMandi.name}
                </h3>

                <p className="mt-2">
                  {t.estimatedEarning}:{" "}
                  <strong>
                    ₹
                    {bestMandi.estimatedEarning.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                  </strong>
                </p>

                <p className="text-sm text-green-100 mt-2">
                  {t.mandiRate}: ₹
                  {bestMandi.rate.toLocaleString(
                    "en-IN"
                  )}{" "}
                  {t.perQuintal}
                </p>

                <p className="text-sm text-green-100 mt-1">
                  {t.distance}:{" "}
                  {bestMandi.distanceKm}{" "}
                  km
                </p>

                <p className="text-sm text-green-100 mt-1">
                  {t.totalTransport}: ₹
                  {bestMandi.totalTransport.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </p>

              </div>
            )}

          {/* =================================================
              MANDI LIST
          ================================================= */}

          {searched &&
            recalculatedMandis.length >
              0 && (
              <div className="mt-8">

                <h3 className="text-2xl font-bold text-green-800">
                  {
                    recalculatedMandis.length
                  }{" "}
                  {t.mandiFound}
                </h3>

                <p className="text-gray-900 text-sm mt-1">
                  {profileLocation.district ||
                    profileLocation.state ||
                    "Nearby"}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

                  {recalculatedMandis.map(
                    (
                      mandi,
                      index
                    ) => {

                      const isFavorite =
                        favorites.includes(
                          mandi.id
                        );

                      const areaLabel =
                        mandi.isSameDistrict
                          ? t.sameDistrict
                          : mandi.isSameState
                          ? t.nearbyDistrict
                          : t.otherDistrict;

                      return (
                        <div
                          key={
                            mandi.id
                          }
                          className={`border rounded-3xl p-6 bg-green-50 hover:shadow-md transition ${
                            index === 0
                              ? "border-green-400 ring-2 ring-green-100"
                              : "border-green-100"
                          }`}
                        >

                          {/* HEADER */}

                          <div className="flex items-start justify-between gap-4">

                            <div className="flex gap-4">

                              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                                🏪
                              </div>

                              <div>

                                <h4 className="text-xl font-bold text-green-900">
                                  {index ===
                                    0 &&
                                    "⭐ "}
                                  {
                                    mandi.name
                                  }
                                </h4>

                                <p className="text-sm text-gray-900 mt-1">
                                  {mandi.district || ""}
                                  {mandi.district && mandi.state ? ", " : ""}
                                  {mandi.state || ""}
                                </p>

                                {mandi.address && (
                                  <p className="text-sm text-gray-900 mt-1 leading-relaxed">
                                    📍 {mandi.address}
                                  </p>
                                )}

                                <div className="flex flex-wrap gap-2 mt-2">

                                  <span className="text-xs px-2 py-1 rounded-full bg-white border font-semibold text-gray-900">
                                    {
                                      mandi.marketType ===
                                      "APMC"
                                        ? t.apmc
                                        : t.localMarket
                                    }
                                  </span>

                                  <span className="text-xs px-2 py-1 rounded-full bg-white border font-semibold text-green-700">
                                    {
                                      areaLabel
                                    }
                                  </span>

                                </div>

                              </div>

                            </div>

                            <button
                              onClick={() =>
                                toggleFavorite(
                                  mandi
                                )
                              }
                              className="shrink-0 px-3 py-2 rounded-xl bg-white border text-sm font-bold hover:bg-yellow-50"
                              title={
                                isFavorite
                                  ? t.saved
                                  : t.save
                              }
                            >
                              {isFavorite
                                ? "❤️"
                                : "🤍"}
                            </button>

                          </div>

                          {/* RATE */}

                          <div className="mt-6 bg-white rounded-2xl p-5">

                            <div className="flex items-center justify-between">

                              <div>

                                <p className="text-sm text-gray-900">
                                  {
                                    t.mandiRate
                                  }
                                </p>

                                <p className="text-3xl font-extrabold text-green-700 mt-1">
                                  ₹
                                  {mandi.rate.toLocaleString(
                                    "en-IN"
                                  )}
                                </p>

                                <p className="text-sm text-gray-900">
                                  {
                                    t.perQuintal
                                  }
                                </p>

                              </div>

                              <div className="text-5xl">
                                💰
                              </div>

                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">

                              <div className="bg-green-50 rounded-xl p-3">
                                <p className="text-xs text-gray-900">
                                  {
                                    t.perKg
                                  }
                                </p>

                                <p className="font-bold text-green-700 mt-1">
                                  ₹
                                  {(
                                    mandi.rate /
                                    100
                                  ).toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </p>
                              </div>

                              <div className="bg-green-50 rounded-xl p-3">
                                <p className="text-xs text-gray-900">
                                  {
                                    t.netPerKg
                                  }
                                </p>

                                <p className="font-bold text-green-700 mt-1">
                                  ₹
                                  {mandi.effectiveRatePerKg.toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </p>
                              </div>

                            </div>

                          </div>

                          {/* DISTANCE / TRANSPORT / EFFECTIVE RATE */}

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

                            <div className="bg-white rounded-xl p-4">

                              <p className="text-xs text-gray-900">
                                📏{" "}
                                {
                                  t.distance
                                }
                              </p>

                              <p className="font-bold text-gray-800 mt-1">
                                {
                                  mandi.distanceKm
                                }{" "}
                                km
                              </p>

                            </div>

                            <div className="bg-white rounded-xl p-4">

                              <p className="text-xs text-gray-900">
                                🚚{" "}
                                {
                                  t.transportation
                                }
                              </p>

                              <p className="font-bold text-orange-700 mt-1">
                                ₹
                                {mandi.transportPerQuintal.toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                              <p className="text-xs text-gray-900">
                                {
                                  t.perQuintal
                                }
                              </p>

                            </div>

                            <div className="bg-white rounded-xl p-4">

                              <p className="text-xs text-gray-900">
                                💵{" "}
                                {
                                  t.effectiveRate
                                }
                              </p>

                              <p className="font-bold text-green-700 mt-1">
                                ₹
                                {mandi.effectiveRatePerQuintal.toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                              <p className="text-xs text-gray-900">
                                {
                                  t.perQuintal
                                }
                              </p>

                            </div>

                          </div>

                          {/* =================================================
                              EXACT QUANTITY CALCULATION
                          ================================================= */}

                          <div className="mt-4 bg-green-100 rounded-2xl p-5">

                            <p className="font-bold text-green-900">
                              {
                                t.quantityCalculator
                              }
                            </p>

                            <p className="text-sm text-green-800 mt-1">
                              {t.quantity}:{" "}
                              <strong>
                                {
                                  enteredQuantityLabel
                                }
                              </strong>
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

                              <div className="bg-white rounded-xl p-4">

                                <p className="text-xs text-gray-900">
                                  {
                                    t.grossAmount
                                  }
                                </p>

                                <p className="font-bold text-blue-700 mt-1">
                                  ₹
                                  {mandi.grossAmount.toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )}
                                </p>

                                <p className="text-xs text-gray-900 mt-1">
                                  {enteredQuantityLabel}
                                </p>

                              </div>

                              <div className="bg-white rounded-xl p-4">

                                <p className="text-xs text-gray-900">
                                  {
                                    t.totalTransport
                                  }
                                </p>

                                <p className="font-bold text-orange-700 mt-1">
                                  ₹
                                  {mandi.totalTransport.toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )}
                                </p>

                                <p className="text-xs text-gray-900 mt-1">
                                  {enteredQuantityLabel}
                                </p>

                              </div>

                              <div className="bg-white rounded-xl p-4">

                                <p className="text-xs text-gray-900">
                                  {
                                    t.estimatedEarning
                                  }
                                </p>

                                <p className="font-extrabold text-green-700 mt-1">
                                  ₹
                                  {mandi.estimatedEarning.toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )}
                                </p>

                                <p className="text-xs text-gray-900 mt-1">
                                  {enteredQuantityLabel}
                                </p>

                              </div>

                            </div>

                            {/* FORMULA */}

                            <div className="mt-4 bg-white rounded-xl p-4">

                              <p className="text-xs text-gray-900">
                                Calculation
                              </p>

                              <p className="text-sm text-gray-900 mt-1">

                                {totalKg.toLocaleString(
                                  "en-IN",
                                  {
                                    maximumFractionDigits: 3,
                                  }
                                )}{" "}
                                kg × ₹
                                {(
                                  mandi.rate /
                                  100
                                ).toLocaleString(
                                  "en-IN",
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                )}
                                /kg = ₹
                                {mandi.grossAmount.toLocaleString(
                                  "en-IN",
                                  {
                                    maximumFractionDigits: 0,
                                  }
                                )}

                              </p>

                            </div>

                          </div>

                          {/* AVAILABLE CROP */}

                          <div className="mt-4 bg-white rounded-2xl p-5">

                            <div className="grid grid-cols-2 gap-3">

                              <div>

                                <p className="text-xs text-gray-900">
                                  {
                                    t.availableCrop
                                  }
                                </p>

                                <p className="font-bold mt-1">
                                  {
                                    crop.crop
                                  }
                                </p>

                              </div>

                              <div>

                                <p className="text-xs text-gray-900">
                                  {
                                    t.netPerQuintal
                                  }
                                </p>

                                <p className="font-bold text-green-700 mt-1">
                                  ₹
                                  {mandi.effectiveRatePerQuintal.toLocaleString(
                                    "en-IN"
                                  )}
                                </p>

                              </div>

                            </div>

                            <button
                              onClick={() =>
                                openDirections(
                                  mandi
                                )
                              }
                              className="mt-4 w-full px-4 py-3 rounded-xl border-2 border-green-700 text-green-700 font-bold hover:bg-green-50"
                            >
                              {
                                t.directions
                              }
                            </button>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

                {/* NOTICE */}

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

                  <p className="text-sm text-yellow-900 leading-relaxed">
                    ⚠️{" "}
                    {
                      t.indicativeNotice
                    }
                  </p>

                </div>

              </div>
            )}

          {/* NO MANDI */}

          {searched &&
            recalculatedMandis.length ===
              0 && (
              <div className="mt-7 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">

                <p className="text-yellow-900">
                  {t.noMandi}
                </p>

                <button
                  onClick={
                    searchMandis
                  }
                  className="mt-4 px-5 py-2 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
                >
                  {t.tryAgain}
                </button>

              </div>
            )}

        </div>

        {/* =================================================
            IMPORTANT BEFORE SELLING
        ================================================= */}

        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7">

          <h2 className="text-2xl font-bold text-yellow-800">
            {
              t.importantBeforeSelling
            }
          </h2>

          <div className="space-y-4 mt-5">

            {[
              [
                "📊",
                t.tip1,
              ],
              [
                "🌾",
                t.tip2,
              ],
              [
                "🚚",
                t.tip3,
              ],
              [
                "💰",
                t.tip4,
              ],
            ].map(
              ([icon, text]) => (
                <div
                  className="flex gap-4"
                  key={text}
                >
                  <div className="text-2xl">
                    {icon}
                  </div>

                  <p className="text-yellow-900">
                    {text}
                  </p>
                </div>
              )
            )}

          </div>

        </div>

      </div>
    </main>
  );
}