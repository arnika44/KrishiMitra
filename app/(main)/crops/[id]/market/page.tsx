"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Crop = {
  id?: string | number;
  crop?: string;
  name?: string;
  season?: string;
  land?: string;
};

type Profile = {
  name?: string;
  farmerName?: string;
  district?: string;
  state?: string;
  address?: string;
  village?: string;
  city?: string;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
};

type QuantityUnit = "kg" | "quintal" | "ton" | "bag";

type MandiBase = {
  id: string;
  name: string;
  district: string;
  state: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  ratePerKg: number;
  crops: string[];
};

type Mandi = MandiBase & {
  distanceKm: number;
  totalKg: number;
  estimatedAmount: number;
};

const MAX_DISTANCE_KM = 60;

const MANDI_DATABASE: MandiBase[] = [
  // ================= BIHAR =================
  {
    id: "bihar-gulabbagh",
    name: "Gulabbagh Mandi",
    district: "Purnia",
    state: "Bihar",
    address: "Gulabbagh, Purnia, Bihar",
    phone: "06454-242100",
    lat: 25.7771,
    lng: 87.4753,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Maize", "Corn"],
  },
  {
    id: "bihar-saharsa",
    name: "Saharsa Mandi",
    district: "Saharsa",
    state: "Bihar",
    address: "Saharsa, Bihar",
    phone: "06478-222100",
    lat: 25.883,
    lng: 86.599,
    ratePerKg: 23,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "bihar-supaul",
    name: "Supaul Mandi",
    district: "Supaul",
    state: "Bihar",
    address: "Supaul, Bihar",
    phone: "06473-222100",
    lat: 26.126,
    lng: 86.605,
    ratePerKg: 22,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "bihar-darbhanga",
    name: "Darbhanga Mandi",
    district: "Darbhanga",
    state: "Bihar",
    address: "Darbhanga, Bihar",
    phone: "06272-222100",
    lat: 26.1542,
    lng: 85.8918,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Mustard"],
  },
  {
    id: "bihar-muzaffarpur",
    name: "Muzaffarpur Mandi",
    district: "Muzaffarpur",
    state: "Bihar",
    address: "Muzaffarpur, Bihar",
    phone: "0621-222100",
    lat: 26.1197,
    lng: 85.391,
    ratePerKg: 25,
    crops: ["Wheat", "Rice", "Maize", "Potato"],
  },
  {
    id: "bihar-samastipur",
    name: "Samastipur Mandi",
    district: "Samastipur",
    state: "Bihar",
    address: "Samastipur, Bihar",
    phone: "06274-222100",
    lat: 25.8629,
    lng: 85.781,
    ratePerKg: 23,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "bihar-begusarai",
    name: "Begusarai Mandi",
    district: "Begusarai",
    state: "Bihar",
    address: "Begusarai, Bihar",
    phone: "06243-222100",
    lat: 25.4182,
    lng: 86.1272,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "bihar-patna",
    name: "Patna Mandi",
    district: "Patna",
    state: "Bihar",
    address: "Patna, Bihar",
    phone: "0612-222100",
    lat: 25.5941,
    lng: 85.1376,
    ratePerKg: 26,
    crops: ["Wheat", "Rice", "Potato", "Onion"],
  },
  {
    id: "bihar-gaya",
    name: "Gaya Mandi",
    district: "Gaya",
    state: "Bihar",
    address: "Gaya, Bihar",
    phone: "0631-222100",
    lat: 24.7914,
    lng: 84.9994,
    ratePerKg: 25,
    crops: ["Wheat", "Rice", "Mustard"],
  },
  {
    id: "bihar-bhagalpur",
    name: "Bhagalpur Mandi",
    district: "Bhagalpur",
    state: "Bihar",
    address: "Bhagalpur, Bihar",
    phone: "0641-222100",
    lat: 25.2425,
    lng: 86.9842,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Maize"],
  },

  // ================= DELHI =================
  {
    id: "delhi-azadpur",
    name: "Azadpur Mandi",
    district: "North Delhi",
    state: "Delhi",
    address: "Azadpur, Delhi",
    phone: "011-27673521",
    lat: 28.7041,
    lng: 77.1819,
    ratePerKg: 28,
    crops: ["Potato", "Onion", "Rice", "Wheat"],
  },
  {
    id: "delhi-ghazipur",
    name: "Ghazipur Mandi",
    district: "East Delhi",
    state: "Delhi",
    address: "Ghazipur, Delhi",
    phone: "011-22151500",
    lat: 28.625,
    lng: 77.318,
    ratePerKg: 27,
    crops: ["Potato", "Onion", "Rice"],
  },
  {
    id: "delhi-keshopur",
    name: "Keshopur Mandi",
    district: "West Delhi",
    state: "Delhi",
    address: "Keshopur, Delhi",
    phone: "011-25173600",
    lat: 28.647,
    lng: 77.083,
    ratePerKg: 26,
    crops: ["Potato", "Onion", "Wheat"],
  },
  {
    id: "delhi-okhla",
    name: "Okhla Mandi",
    district: "South Delhi",
    state: "Delhi",
    address: "Okhla, Delhi",
    phone: "011-26834100",
    lat: 28.5355,
    lng: 77.264,
    ratePerKg: 27,
    crops: ["Rice", "Wheat", "Onion"],
  },

  // ================= HARYANA =================
  {
    id: "haryana-gurugram",
    name: "Gurugram Mandi",
    district: "Gurugram",
    state: "Haryana",
    address: "Gurugram, Haryana",
    phone: "0124-2321000",
    lat: 28.4595,
    lng: 77.0266,
    ratePerKg: 25,
    crops: ["Wheat", "Mustard", "Potato"],
  },
  {
    id: "haryana-faridabad",
    name: "Faridabad Mandi",
    district: "Faridabad",
    state: "Haryana",
    address: "Faridabad, Haryana",
    phone: "0129-2411000",
    lat: 28.4089,
    lng: 77.3178,
    ratePerKg: 26,
    crops: ["Wheat", "Rice", "Potato"],
  },
  {
    id: "haryana-sonipat",
    name: "Sonipat Mandi",
    district: "Sonipat",
    state: "Haryana",
    address: "Sonipat, Haryana",
    phone: "0130-2201000",
    lat: 28.9931,
    lng: 77.0151,
    ratePerKg: 24,
    crops: ["Wheat", "Mustard", "Rice"],
  },
  {
    id: "haryana-panipat",
    name: "Panipat Mandi",
    district: "Panipat",
    state: "Haryana",
    address: "Panipat, Haryana",
    phone: "0180-2631000",
    lat: 29.3909,
    lng: 76.9635,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Mustard"],
  },
  {
    id: "haryana-rohtak",
    name: "Rohtak Mandi",
    district: "Rohtak",
    state: "Haryana",
    address: "Rohtak, Haryana",
    phone: "01262-251000",
    lat: 28.8955,
    lng: 76.6066,
    ratePerKg: 23,
    crops: ["Wheat", "Mustard", "Rice"],
  },
  {
    id: "haryana-hisar",
    name: "Hisar Mandi",
    district: "Hisar",
    state: "Haryana",
    address: "Hisar, Haryana",
    phone: "01662-233000",
    lat: 29.1492,
    lng: 75.7217,
    ratePerKg: 24,
    crops: ["Wheat", "Mustard", "Maize"],
  },

  // ================= UTTAR PRADESH =================
  {
    id: "up-ghaziabad",
    name: "Ghaziabad Mandi",
    district: "Ghaziabad",
    state: "Uttar Pradesh",
    address: "Ghaziabad, Uttar Pradesh",
    phone: "0120-2821000",
    lat: 28.6692,
    lng: 77.4538,
    ratePerKg: 25,
    crops: ["Wheat", "Rice", "Potato"],
  },
  {
    id: "up-noida",
    name: "Noida Mandi",
    district: "Gautam Buddha Nagar",
    state: "Uttar Pradesh",
    address: "Noida, Uttar Pradesh",
    phone: "0120-2511000",
    lat: 28.5355,
    lng: 77.391,
    ratePerKg: 27,
    crops: ["Wheat", "Rice", "Potato", "Onion"],
  },
  {
    id: "up-meerut",
    name: "Meerut Mandi",
    district: "Meerut",
    state: "Uttar Pradesh",
    address: "Meerut, Uttar Pradesh",
    phone: "0121-2661000",
    lat: 28.9845,
    lng: 77.7064,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Mustard"],
  },
  {
    id: "up-lucknow",
    name: "Lucknow Mandi",
    district: "Lucknow",
    state: "Uttar Pradesh",
    address: "Lucknow, Uttar Pradesh",
    phone: "0522-2221000",
    lat: 26.8467,
    lng: 80.9462,
    ratePerKg: 26,
    crops: ["Wheat", "Rice", "Potato", "Onion"],
  },

  // ================= JHARKHAND =================
  {
    id: "jharkhand-ranchi",
    name: "Ranchi Mandi",
    district: "Ranchi",
    state: "Jharkhand",
    address: "Ranchi, Jharkhand",
    phone: "0651-2221000",
    lat: 23.3441,
    lng: 85.3096,
    ratePerKg: 24,
    crops: ["Wheat", "Rice", "Maize"],
  },
  {
    id: "jharkhand-dhanbad",
    name: "Dhanbad Mandi",
    district: "Dhanbad",
    state: "Jharkhand",
    address: "Dhanbad, Jharkhand",
    phone: "0326-2221000",
    lat: 23.7957,
    lng: 86.4304,
    ratePerKg: 23,
    crops: ["Wheat", "Rice", "Maize"],
  },
];

const CROP_RATE_FACTOR: Record<string, number> = {
  rice: 1,
  paddy: 1,
  wheat: 1,
  maize: 0.95,
  corn: 0.95,
  mustard: 1.08,
  potato: 0.8,
  onion: 0.9,
};

function normalizeCropName(value: string) {
  return value.trim().toLowerCase();
}

function getCropFactor(cropName: string) {
  return (
    CROP_RATE_FACTOR[
      normalizeCropName(cropName)
    ] ?? 1
  );
}

function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const earthRadius = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLng =
    ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
}

function getTotalKg(
  quantity: number,
  unit: QuantityUnit
) {
  if (unit === "kg") return quantity;

  if (unit === "quintal") {
    return quantity * 100;
  }

  if (unit === "ton") {
    return quantity * 1000;
  }

  if (unit === "bag") {
    return quantity * 50;
  }

  return quantity;
}

function getProfileLocation(
  profile: Profile | null
) {
  if (!profile) return null;

  const lat =
    typeof profile.lat === "number"
      ? profile.lat
      : typeof profile.latitude === "number"
      ? profile.latitude
      : null;

  const lng =
    typeof profile.lng === "number"
      ? profile.lng
      : typeof profile.longitude === "number"
      ? profile.longitude
      : null;

  if (lat !== null && lng !== null) {
    return {
      lat,
      lng,
      source: "profile",
    };
  }

  return null;
}

const DISTRICT_COORDINATES: Record<
  string,
  { lat: number; lng: number }
> = {
  purnia: {
    lat: 25.7771,
    lng: 87.4753,
  },

  saharsa: {
    lat: 25.883,
    lng: 86.599,
  },

  supaul: {
    lat: 26.126,
    lng: 86.605,
  },

  darbhanga: {
    lat: 26.1542,
    lng: 85.8918,
  },

  muzaffarpur: {
    lat: 26.1197,
    lng: 85.391,
  },

  samastipur: {
    lat: 25.8629,
    lng: 85.781,
  },

  begusarai: {
    lat: 25.4182,
    lng: 86.1272,
  },

  patna: {
    lat: 25.5941,
    lng: 85.1376,
  },

  gaya: {
    lat: 24.7914,
    lng: 84.9994,
  },

  bhagalpur: {
    lat: 25.2425,
    lng: 86.9842,
  },

  "north delhi": {
    lat: 28.7041,
    lng: 77.1819,
  },

  "east delhi": {
    lat: 28.625,
    lng: 77.318,
  },

  "west delhi": {
    lat: 28.647,
    lng: 77.083,
  },

  "south delhi": {
    lat: 28.5355,
    lng: 77.264,
  },

  gurugram: {
    lat: 28.4595,
    lng: 77.0266,
  },

  faridabad: {
    lat: 28.4089,
    lng: 77.3178,
  },

  sonipat: {
    lat: 28.9931,
    lng: 77.0151,
  },

  panipat: {
    lat: 29.3909,
    lng: 76.9635,
  },

  rohtak: {
    lat: 28.8955,
    lng: 76.6066,
  },

  hisar: {
    lat: 29.1492,
    lng: 75.7217,
  },

  ghaziabad: {
    lat: 28.6692,
    lng: 77.4538,
  },

  "gautam buddha nagar": {
    lat: 28.5355,
    lng: 77.391,
  },

  meerut: {
    lat: 28.9845,
    lng: 77.7064,
  },

  lucknow: {
    lat: 26.8467,
    lng: 80.9462,
  },

  ranchi: {
    lat: 23.3441,
    lng: 85.3096,
  },

  dhanbad: {
    lat: 23.7957,
    lng: 86.4304,
  },
};

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();

  const [crop, setCrop] =
    useState<Crop | null>(null);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  // Quantity starts EMPTY
  const [quantity, setQuantity] =
    useState<number | "">("");

  const [unit, setUnit] =
    useState<QuantityUnit>("quintal");

  const [mandis, setMandis] =
    useState<Mandi[]>([]);

  const [selectedMandi, setSelectedMandi] =
    useState<Mandi | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [language, setLanguage] =
    useState<"en" | "hi">("en");

  const [profileLocation, setProfileLocation] =
    useState<{
      lat: number;
      lng: number;
      source: string;
    } | null>(null);

  const cropId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  useEffect(() => {
    try {
      const possibleProfileKeys = [
        "farmerProfile",
        "profile",
        "userProfile",
        "farmer",
        "user",
        "profileData",
      ];

      let foundProfile: Profile | null =
        null;

      for (const key of possibleProfileKeys) {
        const stored =
          localStorage.getItem(key);

        if (stored) {
          try {
            const parsed =
              JSON.parse(stored);

            if (
              parsed &&
              typeof parsed === "object"
            ) {
              foundProfile = parsed;
              break;
            }
          } catch {
            // Ignore invalid profile
          }
        }
      }

      if (foundProfile) {
        setProfile(foundProfile);

        const exactLocation =
          getProfileLocation(
            foundProfile
          );

        if (exactLocation) {
          setProfileLocation(
            exactLocation
          );
        } else {
          const district = (
            foundProfile.district ||
            foundProfile.city ||
            ""
          )
            .trim()
            .toLowerCase();

          const fallback =
            DISTRICT_COORDINATES[
              district
            ];

          if (fallback) {
            setProfileLocation({
              ...fallback,
              source: "district",
            });
          }
        }
      }

      const cropData =
        localStorage.getItem(
          "farmerCrops"
        );

      if (cropData) {
        try {
          const parsedCrops =
            JSON.parse(cropData);

          if (Array.isArray(parsedCrops)) {
            const foundCrop =
              parsedCrops.find(
                (item: Crop) =>
                  String(item.id) ===
                  String(cropId)
              );

            if (foundCrop) {
              setCrop(foundCrop);
            } else if (
              parsedCrops.length > 0
            ) {
              setCrop(
                parsedCrops[0]
              );
            }
          }
        } catch {
          // Ignore invalid crop data
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [cropId]);

  const cropName = useMemo(() => {
    return (
      crop?.crop ||
      crop?.name ||
      "Wheat"
    );
  }, [crop]);

  const totalKg = useMemo(() => {
    if (quantity === "") {
      return 0;
    }

    return getTotalKg(
      Number(quantity),
      unit
    );
  }, [quantity, unit]);

  const cropFactor = useMemo(() => {
    return getCropFactor(cropName);
  }, [cropName]);

  const getMandiRate = (
    baseRate: number
  ) => {
    return Number(
      (baseRate * cropFactor).toFixed(2)
    );
  };

  // ==============================
  // INDICATIVE PRICE PER KG
  // ==============================
  const indicativePricePerKg =
    useMemo(() => {
      const cropLower =
        normalizeCropName(
          cropName
        );

      const matchingMandis =
        MANDI_DATABASE.filter(
          (mandi) => {
            return mandi.crops.some(
              (item) => {
                const itemLower =
                  normalizeCropName(
                    item
                  );

                return (
                  itemLower ===
                    cropLower ||
                  (cropLower ===
                    "paddy" &&
                    itemLower ===
                      "rice") ||
                  (cropLower ===
                    "corn" &&
                    itemLower ===
                      "maize")
                );
              }
            );
          }
        );

      if (
        matchingMandis.length === 0
      ) {
        return 0;
      }

      const total =
        matchingMandis.reduce(
          (sum, mandi) =>
            sum +
            getMandiRate(
              mandi.ratePerKg
            ),
          0
        );

      return Number(
        (
          total /
          matchingMandis.length
        ).toFixed(2)
      );
    }, [cropName, cropFactor]);

  // ==============================
  // INDICATIVE TOTAL VALUE
  // ==============================
  const indicativeEstimatedValue =
    useMemo(() => {
      if (
        !indicativePricePerKg ||
        !totalKg
      ) {
        return 0;
      }

      return (
        indicativePricePerKg *
        totalKg
      );
    }, [
      indicativePricePerKg,
      totalKg,
    ]);

  // ==============================
  // SEARCH MANDIS
  // ==============================
  const searchMandis = () => {
    if (
      quantity === "" ||
      Number(quantity) <= 0
    ) {
      alert(
        language === "hi"
          ? "Please quantity enter karein."
          : "Please enter a quantity."
      );

      return;
    }

    if (!profileLocation) {
      alert(
        language === "hi"
          ? "Farmer profile location nahi mili. Please profile me district/location save karein."
          : "Farmer profile location was not found. Please save district/location in the profile."
      );

      return;
    }

    setLoading(true);

    const cropLower =
      normalizeCropName(cropName);

    const results: Mandi[] =
      MANDI_DATABASE
        .filter((mandi) => {
          if (
            !mandi.crops ||
            mandi.crops.length === 0
          ) {
            return true;
          }

          return mandi.crops.some(
            (item) => {
              const itemLower =
                normalizeCropName(
                  item
                );

              return (
                itemLower ===
                  cropLower ||
                (cropLower ===
                  "paddy" &&
                  itemLower ===
                    "rice") ||
                (cropLower ===
                  "corn" &&
                  itemLower ===
                    "maize")
              );
            }
          );
        })
        .map((mandi) => {
          const distanceKm =
            getDistanceKm(
              profileLocation.lat,
              profileLocation.lng,
              mandi.lat,
              mandi.lng
            );

          const ratePerKg =
            getMandiRate(
              mandi.ratePerKg
            );

          return {
            ...mandi,
            ratePerKg,
            distanceKm,
            totalKg,
            estimatedAmount:
              ratePerKg *
              totalKg,
          };
        })
        .filter(
          (mandi) =>
            mandi.distanceKm <=
            MAX_DISTANCE_KM
        )
        .sort((a, b) => {
          if (
            a.distanceKm !==
            b.distanceKm
          ) {
            return (
              a.distanceKm -
              b.distanceKm
            );
          }

          return (
            b.ratePerKg -
            a.ratePerKg
          );
        });

    setMandis(results);
    setSelectedMandi(null);
    setLoading(false);
  };

  // ==============================
  // CURRENT LOCATION
  // ==============================
  const useCurrentLocation = () => {
    if (
      !navigator.geolocation
    ) {
      alert(
        language === "hi"
          ? "Aapke browser me location support nahi hai."
          : "Geolocation is not supported by your browser."
      );

      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat:
            position.coords.latitude,
          lng:
            position.coords.longitude,
          source: "gps",
        };

        setProfileLocation(
          location
        );

        setLocationLoading(false);

        alert(
          language === "hi"
            ? "Current location set ho gayi."
            : "Current location has been set."
        );
      },
      () => {
        setLocationLoading(false);

        alert(
          language === "hi"
            ? "Current location nahi mil payi. Location permission check karein."
            : "Could not get current location. Please check location permission."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ==============================
  // SELECT MANDI
  // ==============================
  const selectMandi = (
    mandi: Mandi
  ) => {
    setSelectedMandi(mandi);

    const dataToSave = {
      id: mandi.id,
      name: mandi.name,
      district:
        mandi.district,
      state: mandi.state,
      address: mandi.address,
      phone: mandi.phone,
      lat: mandi.lat,
      lng: mandi.lng,
      ratePerKg:
        mandi.ratePerKg,
      crop: cropName,
      quantity:
        Number(quantity),
      unit,
      totalKg,
      estimatedAmount:
        mandi.estimatedAmount,
    };

    localStorage.setItem(
      "selectedMandi",
      JSON.stringify(
        dataToSave
      )
    );

    alert(
      language === "hi"
        ? `${mandi.name} select ho gayi.`
        : `${mandi.name} has been selected.`
    );
  };

  // ==============================
  // DIRECTIONS
  // ==============================
  const openDirections = (
    mandi: Mandi
  ) => {
    let origin = "";

    if (profileLocation) {
      origin = `${profileLocation.lat},${profileLocation.lng}`;
    } else if (
      profile?.address
    ) {
      origin = profile.address;
    } else {
      origin =
        `${profile?.district || ""}, ` +
        `${profile?.state || ""}`;
    }

    const destination =
      `${mandi.lat},${mandi.lng}`;

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${encodeURIComponent(
        origin
      )}` +
      `&destination=${encodeURIComponent(
        destination
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==============================
  // CALL MANDI
  // ==============================
  const callMandi = (
    phone: string
  ) => {
    window.location.href =
      `tel:${phone}`;
  };

  // ==============================
  // CLEAR RESULTS
  // ==============================
  const clearResults = () => {
    setMandis([]);
    setSelectedMandi(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-green-700">
              🌾 Mandi & Market
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Find mandis within 60 KM
              of the farmer profile
              location.
            </p>
          </div>

          <button
            onClick={() =>
              setLanguage(
                language === "en"
                  ? "hi"
                  : "en"
              )
            }
            className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
          >
            {language === "en"
              ? "हिंदी"
              : "English"}
          </button>
        </div>

        {/* CROP + PROFILE */}
        <div className="mb-6 grid gap-5 md:grid-cols-2">

          {/* CROP */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-gray-800">
              🌱 Crop Details
            </h2>

            <div className="rounded-xl bg-green-50 p-4">

              <p className="text-sm text-gray-500">
                Selected Crop
              </p>

              <p className="mt-1 text-xl font-bold capitalize text-green-700">
                {cropName}
              </p>

              {crop?.season && (
                <p className="mt-1 text-sm text-gray-600">
                  Season:{" "}
                  {crop.season}
                </p>
              )}

            </div>
          </div>

          {/* FARMER LOCATION */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-gray-800">
              📍 Farmer Location
            </h2>

            <div className="rounded-xl bg-blue-50 p-4">

              <p className="font-semibold uppercase text-gray-800">
                {profile?.district ||
                  profile?.city ||
                  "Location not available"}

                {profile?.state
                  ? `, ${profile.state}`
                  : ""}
              </p>

              {profile?.address && (
                <p className="mt-1 text-sm text-gray-600">
                  {profile.address}
                </p>
              )}

              {profileLocation && (
                <p className="mt-2 text-xs text-gray-500">
                  Location source:{" "}
                  {profileLocation.source ===
                  "gps"
                    ? "Current GPS"
                    : profileLocation.source ===
                      "profile"
                    ? "Profile coordinates"
                    : "District"}
                </p>
              )}

              <button
                onClick={
                  useCurrentLocation
                }
                disabled={
                  locationLoading
                }
                className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {locationLoading
                  ? "Getting location..."
                  : "📍 Use Current Location"}
              </button>

            </div>
          </div>
        </div>

        {/* PRICE SECTION */}
        <div className="mb-6 grid gap-5 md:grid-cols-2">

          {/* INDICATIVE PRICE */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-gray-800">
              💰 Indicative Price
            </h2>

            <div className="rounded-xl bg-green-50 p-5">

              <p className="text-sm font-medium text-gray-600">
                Current indicative
                market rate
              </p>

              <div className="mt-2 flex items-end gap-2">

                <p className="text-3xl font-bold text-green-700">
                  ₹
                  {indicativePricePerKg >
                  0
                    ? indicativePricePerKg
                    : "--"}
                </p>

                <p className="mb-1 text-base font-semibold text-gray-700">
                  per KG
                </p>

              </div>

              <p className="mt-2 text-xs text-gray-500">
                Indicative demo price
                based on the selected
                crop.
              </p>

            </div>
          </div>

          {/* PRICE BASIS */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-gray-800">
              📌 Price Basis
            </h2>

            <div className="rounded-xl bg-blue-50 p-5">

              {/* PRICE */}
              <div className="flex items-center justify-between">

                <span className="text-sm font-medium text-gray-600">
                  Indicative Price
                </span>

                <span className="text-xl font-bold text-blue-700">
                  ₹
                  {indicativePricePerKg >
                  0
                    ? indicativePricePerKg
                    : "--"}

                  <span className="ml-1 text-sm font-medium text-gray-600">
                    / KG
                  </span>
                </span>

              </div>

              {/* QUANTITY */}
              <div className="mt-3 flex items-center justify-between border-t border-blue-200 pt-3">

                <span className="text-sm font-medium text-gray-600">
                  Your Quantity
                </span>

                <span className="font-bold text-gray-800">
                  {totalKg.toLocaleString()}{" "}
                  KG
                </span>

              </div>

              {/* ESTIMATED VALUE */}
              <div className="mt-3 rounded-lg bg-white p-3">

                <p className="text-sm text-gray-600">
                  Indicative Estimated
                  Value
                </p>

                <p className="mt-1 text-2xl font-bold text-green-700">
                  ₹
                  {indicativeEstimatedValue.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  Calculation: ₹
                  {indicativePricePerKg ||
                    0}{" "}
                  ×{" "}
                  {totalKg.toLocaleString()}{" "}
                  KG
                </p>

              </div>

              <p className="mt-3 text-xs text-gray-500">
                This amount is an
                indicative value based
                on the selected crop
                price. Use it to compare
                different mandi offers.
              </p>

            </div>
          </div>

        </div>

        {/* QUANTITY */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-lg font-bold text-gray-800">
            📦 Quantity
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            {/* QUANTITY INPUT */}
            <div>

              <label className="mb-1 block text-sm font-medium text-gray-700">
                Quantity
              </label>

              <input
                type="number"
                min="0"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => {
                  const value =
                    e.target.value;

                  if (value === "") {
                    setQuantity("");
                  } else {
                    setQuantity(
                      Number(value)
                    );
                  }
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />

            </div>

            {/* UNIT */}
            <div>

              <label className="mb-1 block text-sm font-medium text-gray-700">
                Unit
              </label>

              <select
                value={unit}
                onChange={(e) =>
                  setUnit(
                    e.target.value as QuantityUnit
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              >

                <option value="kg">
                  Kilogram (KG)
                </option>

                <option value="quintal">
                  Quintal
                </option>

                <option value="ton">
                  Ton
                </option>

                <option value="bag">
                  Bag (50 KG)
                </option>

              </select>

            </div>

            {/* TOTAL WEIGHT */}
            <div className="rounded-lg bg-yellow-50 p-3">

              <p className="text-sm text-gray-600">
                Total Weight
              </p>

              <p className="text-xl font-bold text-yellow-700">
                {totalKg.toLocaleString()}{" "}
                KG
              </p>

            </div>

          </div>

          <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
            <strong>Note:</strong>{" "}
            1 Quintal = 100 KG, 1 Ton =
            1000 KG, 1 Bag = 50 KG
          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-lg font-bold text-gray-800">
                🔎 Nearby Mandi Search
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Only mandis within{" "}
                <strong>
                  60 KM
                </strong>{" "}
                will be shown.
              </p>

            </div>

            <div className="flex gap-2">

              <button
                onClick={
                  searchMandis
                }
                disabled={loading}
                className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {loading
                  ? "Searching..."
                  : "🔎 Find Nearby Mandis"}
              </button>

              {mandis.length > 0 && (
                <button
                  onClick={
                    clearResults
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Clear
                </button>
              )}

            </div>

          </div>

        </div>

        {/* RESULTS */}
        {mandis.length > 0 && (
          <div className="mb-6">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-xl font-bold text-gray-800">
                🏪 Nearby Mandis
              </h2>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {mandis.length}{" "}
                found
              </span>

            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {mandis.map(
                (mandi) => (
                  <div
                    key={mandi.id}
                    className={`rounded-2xl bg-white p-5 shadow-sm transition ${
                      selectedMandi?.id ===
                      mandi.id
                        ? "ring-2 ring-green-600"
                        : ""
                    }`}
                  >

                    {/* MANDI NAME */}
                    <div className="mb-3 flex items-start justify-between gap-2">

                      <div>

                        <h3 className="text-lg font-bold text-gray-800">
                          {mandi.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {
                            mandi.district
                          }
                          ,{" "}
                          {
                            mandi.state
                          }
                        </p>

                      </div>

                      <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                        {mandi.distanceKm.toFixed(
                          1
                        )}{" "}
                        KM
                      </span>

                    </div>

                    {/* PRICE */}
                    <div className="mb-4 rounded-xl bg-green-50 p-4">

                      <div className="flex items-center justify-between">

                        <span className="text-sm text-gray-600">
                          Price / KG
                        </span>

                        <span className="text-xl font-bold text-green-700">
                          ₹
                          {
                            mandi.ratePerKg
                          }
                        </span>

                      </div>

                      <div className="mt-2 flex items-center justify-between">

                        <span className="text-sm text-gray-600">
                          Total Quantity
                        </span>

                        <span className="font-semibold text-gray-800">
                          {mandi.totalKg.toLocaleString()}{" "}
                          KG
                        </span>

                      </div>

                      <div className="mt-2 flex items-center justify-between border-t border-green-200 pt-2">

                        <span className="text-sm font-medium text-gray-700">
                          Estimated Amount
                        </span>

                        <span className="text-lg font-bold text-green-800">
                          ₹
                          {mandi.estimatedAmount.toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 0,
                            }
                          )}
                        </span>

                      </div>

                    </div>

                    {/* ADDRESS */}
                    <div className="mb-4 space-y-2 text-sm text-gray-600">

                      <p>
                        📍{" "}
                        {
                          mandi.address
                        }
                      </p>

                      <p>
                        📞{" "}
                        {
                          mandi.phone
                        }
                      </p>

                    </div>

                    {/* BUTTONS */}
                    <div className="grid grid-cols-2 gap-2">

                      <button
                        onClick={() =>
                          selectMandi(
                            mandi
                          )
                        }
                        className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                          selectedMandi?.id ===
                          mandi.id
                            ? "bg-green-700 text-white"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {selectedMandi?.id ===
                        mandi.id
                          ? "✓ Selected"
                          : "Select Mandi"}
                      </button>

                      <button
                        onClick={() =>
                          openDirections(
                            mandi
                          )
                        }
                        className="rounded-lg border border-blue-600 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                      >
                        🗺️ Directions
                      </button>

                      <button
                        onClick={() =>
                          callMandi(
                            mandi.phone
                          )
                        }
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        📞 Call
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(
                            `${mandi.name}, ${mandi.address}`
                          );

                          alert(
                            "Mandi address copied."
                          );
                        }}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        📋 Copy
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          </div>
        )}

        {/* NO RESULTS */}
        {!loading &&
          mandis.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

              <div className="text-5xl">
                🏪
              </div>

              <h3 className="mt-3 text-lg font-bold text-gray-800">
                {language === "hi"
                  ? "Nearby mandi search karein"
                  : "Search for nearby mandis"}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {language === "hi"
                  ? "Farmer location ke basis par 60 KM ke andar mandi results yahan dikhenge."
                  : "Mandi results within 60 KM of the farmer location will appear here."}
              </p>

            </div>
          )}

        {/* SELECTED MANDI */}
        {selectedMandi && (
          <div className="mt-6 rounded-2xl border-2 border-green-500 bg-green-50 p-5">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-sm font-semibold text-green-700">
                  ✓ Selected Mandi
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-800">
                  {
                    selectedMandi.name
                  }
                </h2>

                <p className="text-sm text-gray-600">
                  {
                    selectedMandi.address
                  }
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Crop:{" "}
                  <strong>
                    {cropName}
                  </strong>{" "}
                  | Quantity:{" "}
                  <strong>
                    {totalKg.toLocaleString()}{" "}
                    KG
                  </strong>
                </p>

              </div>

              <button
                onClick={() => {
                  localStorage.setItem(
                    "selectedMandi",
                    JSON.stringify({
                      id: selectedMandi.id,
                      name: selectedMandi.name,
                      district:
                        selectedMandi.district,
                      state:
                        selectedMandi.state,
                      address:
                        selectedMandi.address,
                      phone:
                        selectedMandi.phone,
                      lat: selectedMandi.lat,
                      lng: selectedMandi.lng,
                      ratePerKg:
                        selectedMandi.ratePerKg,
                      crop: cropName,
                      quantity:
                        Number(quantity),
                      unit,
                      totalKg,
                      estimatedAmount:
                        selectedMandi.estimatedAmount,
                    })
                  );

                  router.push(
                    "/logistics"
                  );
                }}
                className="rounded-lg bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
              >
                Continue to Logistics →
              </button>

            </div>
          </div>
        )}

        {/* DEMO NOTE */}
        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          <strong>
            Demo Note:
          </strong>{" "}
          The mandi list, prices and
          contact numbers in this
          prototype are
          static/indicative demo data.
          They are not live government
          market rates.
        </div>

      </div>
    </div>
  );
}