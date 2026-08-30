"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type LanguageCode = "en" | "hi";

type StateItem = {
  name: string;
  slug: string;
  districtCount?: number;
  officeCount?: number;
};

type DistrictItem = {
  name: string;
  slug: string;
  officeCount?: number;
};

type PostOffice = {
  Name: string;
  District?: string;
  State?: string;
  Block?: string;
  BranchType?: string;
  DeliveryStatus?: string;
  Pincode?: string;

  officeName?: string;
  officeType?: string;
  deliveryStatus?: string;
  circleName?: string;
  regionName?: string;
  divisionName?: string;
  pincode?: string;
};

type PinApiResponse = {
  state?: string;
  district?: string;
  offices?: PostOffice[];

  Message?: string;
  Status?: string;
  PostOffice?: PostOffice[] | null;
};

/* =========================================================
   API
========================================================= */

const BASE_URL =
  "https://aniket-thapa.github.io/india-pincode-api";

/* =========================================================
   TRANSLATIONS
========================================================= */

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

    invalidMobile: "Please enter a valid 10-digit mobile number.",

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

    invalidMobile: "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",

    locationHelp:
      "पहले पिन कोड दर्ज करें। राज्य, जिला और आसपास के स्थान अपने आप सुझाए जाएंगे।",
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FarmerProfile() {
  const router = useRouter();

  const [language, setLanguage] =
    useState<LanguageCode>("en");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pinCode: "",
    state: "",
    district: "",
    village: "",
  });

  const [states, setStates] = useState<StateItem[]>([]);
  const [districts, setDistricts] =
    useState<DistrictItem[]>([]);

  const [postOffices, setPostOffices] =
    useState<PostOffice[]>([]);

  const [loadingStates, setLoadingStates] =
    useState(false);

  const [loadingDistricts, setLoadingDistricts] =
    useState(false);

  const [searchingPin, setSearchingPin] =
    useState(false);

  const [showStateSuggestions, setShowStateSuggestions] =
    useState(false);

  const [showDistrictSuggestions, setShowDistrictSuggestions] =
    useState(false);

  const [showVillageSuggestions, setShowVillageSuggestions] =
    useState(false);

  const [pinMessage, setPinMessage] = useState("");

  const t =
    translations[language] || translations.en;

  /* =======================================================
     LOAD LANGUAGE + SAVED PROFILE
  ======================================================= */

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

    const savedProfile =
      localStorage.getItem("farmerProfile");

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
        console.error(
          "Invalid saved farmer profile"
        );
      }
    }
  }, []);

  /* =======================================================
     LOAD ALL STATES
  ======================================================= */

  useEffect(() => {
    const controller = new AbortController();

    const loadStates = async () => {
      try {
        setLoadingStates(true);

        const response = await fetch(
          `${BASE_URL}/states.json`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `State API error: ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid states response"
          );
        }

        const cleanedStates: StateItem[] =
          data
            .map((item: any) => ({
              name: String(
                item?.name || ""
              ).trim(),

              slug: String(
                item?.slug || ""
              ).trim(),

              districtCount:
                Number(
                  item?.districtCount
                ) || 0,

              officeCount:
                Number(
                  item?.officeCount
                ) || 0,
            }))
            .filter(
              (item: StateItem) =>
                item.name && item.slug
            );

        setStates(cleanedStates);
      } catch (error: any) {
        if (
          error?.name !== "AbortError"
        ) {
          console.error(
            "State loading error:",
            error
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingStates(false);
        }
      }
    };

    loadStates();

    return () => {
      controller.abort();
    };
  }, []);

  /* =======================================================
     FIND SELECTED STATE
  ======================================================= */

  const selectedState = useMemo(() => {
    const stateName =
      form.state.trim().toLowerCase();

    if (!stateName) {
      return null;
    }

    return (
      states.find(
        (item) =>
          item.name
            .trim()
            .toLowerCase() === stateName
      ) || null
    );
  }, [states, form.state]);

  /* =======================================================
     LOAD DISTRICTS FOR SELECTED STATE
  ======================================================= */

  useEffect(() => {
    if (!selectedState?.slug) {
      setDistricts([]);
      setLoadingDistricts(false);
      return;
    }

    const controller =
      new AbortController();

    const loadDistricts = async () => {
      try {
        setLoadingDistricts(true);

        const url =
          `${BASE_URL}/states/` +
          `${encodeURIComponent(
            selectedState.slug
          )}.json`;

        const response = await fetch(
          url,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `District API error: ${response.status}`
          );
        }

        const data = await response.json();

        if (
          !data ||
          !Array.isArray(data.districts)
        ) {
          throw new Error(
            "Invalid district response"
          );
        }

        const districtList: DistrictItem[] =
          data.districts
            .map((item: any) => ({
              name: String(
                item?.name || ""
              ).trim(),

              slug: String(
                item?.slug || ""
              ).trim(),

              officeCount:
                Number(
                  item?.officeCount
                ) || 0,
            }))
            .filter(
              (item: DistrictItem) =>
                item.name && item.slug
            );

        setDistricts(districtList);
      } catch (error: any) {
        if (
          error?.name !== "AbortError"
        ) {
          console.error(
            "District loading error:",
            error
          );

          setDistricts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingDistricts(false);
        }
      }
    };

    loadDistricts();

    return () => {
      controller.abort();
    };
  }, [selectedState]);

  /* =======================================================
     PIN CODE LOOKUP
  ======================================================= */

  useEffect(() => {
    const pin =
      form.pinCode.trim();

    if (!/^\d{6}$/.test(pin)) {
      setPostOffices([]);
      setPinMessage("");
      setSearchingPin(false);
      return;
    }

    const controller =
      new AbortController();

    const lookupPin = async () => {
      try {
        setSearchingPin(true);
        setPinMessage("");
        setPostOffices([]);

        const response = await fetch(
          `${BASE_URL}/pincodes/${pin}.json`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `PIN not found: ${response.status}`
          );
        }

        const data: PinApiResponse =
          await response.json();

        let offices: PostOffice[] =
          Array.isArray(data?.offices)
            ? data.offices
            : [];

        if (
          offices.length === 0 &&
          Array.isArray(
            data?.PostOffice
          )
        ) {
          offices =
            data.PostOffice;
        }

        if (!offices.length) {
          setPostOffices([]);
          setPinMessage(
            t.invalidPin
          );
          return;
        }

        const normalizedOffices =
          offices.map(
            (office: any) => ({
              ...office,

              Name:
                office?.Name ||
                office?.officeName ||
                "",

              District:
                office?.District ||
                data?.district ||
                "",

              State:
                office?.State ||
                data?.state ||
                "",

              DeliveryStatus:
                office?.DeliveryStatus ||
                office?.deliveryStatus ||
                "",

              Pincode:
                office?.Pincode ||
                office?.pincode ||
                pin,
            })
          );

        setPostOffices(
          normalizedOffices
        );

        const detectedState =
          String(
            data?.state ||
              normalizedOffices[0]
                ?.State ||
              ""
          ).trim();

        const detectedDistrict =
          String(
            data?.district ||
              normalizedOffices[0]
                ?.District ||
              ""
          ).trim();

        if (
          detectedState ||
          detectedDistrict
        ) {
          setForm((prev) => ({
            ...prev,

            state:
              detectedState ||
              prev.state,

            district:
              detectedDistrict ||
              prev.district,
          }));
        }

        setPinMessage(
          t.pinFound
        );
      } catch (error: any) {
        if (
          error?.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "PIN lookup error:",
          error
        );

        setPostOffices([]);
        setPinMessage(
          t.invalidPin
        );
      } finally {
        if (!controller.signal.aborted) {
          setSearchingPin(false);
        }
      }
    };

    lookupPin();

    return () => {
      controller.abort();
    };
  }, [
    form.pinCode,
    t.invalidPin,
    t.pinFound,
  ]);

  /* =======================================================
     STATE SUGGESTIONS
  ======================================================= */

  const filteredStates =
    useMemo(() => {
      const query =
        form.state
          .trim()
          .toLowerCase();

      if (!query) {
        return states.slice(0, 20);
      }

      return states
        .filter((item) =>
          item.name
            .toLowerCase()
            .includes(query)
        )
        .slice(0, 20);
    }, [
      states,
      form.state,
    ]);

  /* =======================================================
     DISTRICT SUGGESTIONS
  ======================================================= */

  const filteredDistricts =
    useMemo(() => {
      const query =
        form.district
          .trim()
          .toLowerCase();

      if (!query) {
        return districts.slice(
          0,
          30
        );
      }

      return districts
        .filter((item) =>
          item.name
            .toLowerCase()
            .includes(query)
        )
        .slice(0, 30);
    }, [
      districts,
      form.district,
    ]);

  /* =======================================================
     VILLAGE / POST OFFICE SUGGESTIONS
  ======================================================= */

  const filteredPostOffices =
    useMemo(() => {
      const query =
        form.village
          .trim()
          .toLowerCase();

      const unique =
        new Map<
          string,
          PostOffice
        >();

      postOffices.forEach(
        (office) => {
          const name =
            String(
              office?.Name ||
                office?.officeName ||
                ""
            ).trim();

          if (!name) {
            return;
          }

          if (
            !query ||
            name
              .toLowerCase()
              .includes(query)
          ) {
            unique.set(
              name.toLowerCase(),
              office
            );
          }
        }
      );

      return Array.from(
        unique.values()
      ).slice(0, 30);
    }, [
      postOffices,
      form.village,
    ]);

  /* =======================================================
     CHANGE HANDLER
  ======================================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = e.target;

    if (name === "phone") {
      const numericValue =
        value
          .replace(/\D/g, "")
          .slice(0, 10);

      setForm((prev) => ({
        ...prev,
        phone: numericValue,
      }));

      return;
    }

    if (name === "pinCode") {
      const numericValue =
        value
          .replace(/\D/g, "")
          .slice(0, 6);

      setForm((prev) => ({
        ...prev,
        pinCode: numericValue,
      }));

      if (
        numericValue.length < 6
      ) {
        setPinMessage("");
        setPostOffices([]);
      }

      return;
    }

    if (name === "state") {
      setForm((prev) => ({
        ...prev,
        state: value,
        district: "",
        village: "",
      }));

      setShowStateSuggestions(
        true
      );

      setShowDistrictSuggestions(
        false
      );

      setShowVillageSuggestions(
        false
      );

      return;
    }

    if (name === "district") {
      setForm((prev) => ({
        ...prev,
        district: value,
        village: "",
      }));

      setShowDistrictSuggestions(
        true
      );

      return;
    }

    if (name === "village") {
      setForm((prev) => ({
        ...prev,
        village: value,
      }));

      setShowVillageSuggestions(
        true
      );

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     SELECT STATE
  ======================================================= */

  const selectState = (
    stateName: string
  ) => {
    setForm((prev) => ({
      ...prev,
      state: stateName,
      district: "",
      village: "",
    }));

    setShowStateSuggestions(
      false
    );

    setShowDistrictSuggestions(
      false
    );

    setShowVillageSuggestions(
      false
    );
  };

  /* =======================================================
     SELECT DISTRICT
  ======================================================= */

  const selectDistrict = (
    districtName: string
  ) => {
    setForm((prev) => ({
      ...prev,
      district: districtName,
      village: "",
    }));

    setShowDistrictSuggestions(
      false
    );
  };

  /* =======================================================
     SELECT VILLAGE / POST OFFICE
  ======================================================= */

  const selectVillage = (
    office: PostOffice
  ) => {
    const name =
      String(
        office?.Name ||
          office?.officeName ||
          ""
      ).trim();

    const district =
      String(
        office?.District || ""
      ).trim();

    const state =
      String(
        office?.State || ""
      ).trim();

    setForm((prev) => ({
      ...prev,

      village:
        name || prev.village,

      district:
        district || prev.district,

      state:
        state || prev.state,
    }));

    setShowVillageSuggestions(
      false
    );
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert(
        t.fullNamePlaceholder
      );
      return;
    }

    if (
      !/^\d{10}$/.test(
        form.phone
      )
    ) {
      alert(
        t.invalidMobile
      );
      return;
    }

    if (
      !/^\d{6}$/.test(
        form.pinCode
      )
    ) {
      alert(
        t.pinCodePlaceholder
      );
      return;
    }

    if (
      !postOffices.length
    ) {
      alert(
        t.invalidPin
      );
      return;
    }

    if (!form.state.trim()) {
      alert(
        t.statePlaceholder
      );
      return;
    }

    if (
      !form.district.trim()
    ) {
      alert(
        t.districtPlaceholder
      );
      return;
    }

    if (
      !form.village.trim()
    ) {
      alert(
        t.villagePlaceholder
      );
      return;
    }

    localStorage.setItem(
      "farmerProfile",
      JSON.stringify(form)
    );

    alert(t.saved);

    router.push("/crops");
  };

  /* =======================================================
     CLOSE ALL SUGGESTIONS
  ======================================================= */

  const closeSuggestions = () => {
    setShowStateSuggestions(
      false
    );

    setShowDistrictSuggestions(
      false
    );

    setShowVillageSuggestions(
      false
    );
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      className="min-h-screen bg-green-50 px-5 py-10"
      dir="ltr"
    >
      <div className="max-w-3xl mx-auto">

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            router.push(
              "/crops"
            )
          }
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

          <form
            onSubmit={
              handleSubmit
            }
          >

            {/* FULL NAME */}

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.fullName}
              </label>

              <input
                name="name"
                value={form.name}
                onChange={
                  handleChange
                }
                type="text"
                placeholder={
                  t.fullNamePlaceholder
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

            </div>

            {/* MOBILE */}

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.mobile}
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={
                  handleChange
                }
                type="tel"
                inputMode="numeric"
                placeholder={
                  t.mobilePlaceholder
                }
                maxLength={10}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

            </div>

            {/* PIN CODE */}

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.pinCode}
              </label>

              <input
                name="pinCode"
                value={
                  form.pinCode
                }
                onChange={
                  handleChange
                }
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder={
                  t.pinCodePlaceholder
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

              <p className="text-xs text-gray-500 mt-2">
                {t.locationHelp}
              </p>

              {searchingPin && (
                <p className="text-sm text-blue-600 mt-2 font-medium">
                  🔎{" "}
                  {t.searchingPin}
                </p>
              )}

              {!searchingPin &&
                pinMessage && (
                  <p
                    className={`text-sm mt-2 font-medium ${
                      pinMessage ===
                      t.pinFound
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {pinMessage ===
                    t.pinFound
                      ? "✓ "
                      : "⚠️ "}

                    {pinMessage}
                  </p>
                )}

            </div>

            {/* STATE */}

            <div className="mb-5 relative">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.state}
              </label>

              <input
                name="state"
                value={form.state}
                onChange={
                  handleChange
                }
                onFocus={() =>
                  setShowStateSuggestions(
                    true
                  )
                }
                autoComplete="off"
                type="text"
                placeholder={
                  t.statePlaceholder
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

              {showStateSuggestions && (
                <div className="absolute z-30 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">

                  {loadingStates ? (
                    <div className="px-4 py-3 text-gray-500">
                      {
                        t.loadingStates
                      }
                    </div>
                  ) : filteredStates.length >
                    0 ? (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-400 border-b">
                        {
                          t.selectSuggestion
                        }
                      </div>

                      {filteredStates.map(
                        (
                          item
                        ) => (
                          <button
                            type="button"
                            key={
                              item.slug
                            }
                            onMouseDown={(
                              e
                            ) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              selectState(
                                item.name
                              )
                            }
                            className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-800"
                          >
                            <div>
                              {
                                item.name
                              }
                            </div>

                            {item.districtCount ? (
                              <div className="text-xs text-gray-400 mt-1">
                                {
                                  item.districtCount
                                }{" "}
                                districts
                              </div>
                            ) : null}
                          </button>
                        )
                      )}
                    </>
                  ) : (
                    <div className="px-4 py-3 text-gray-500">
                      {
                        t.noSuggestions
                      }
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* DISTRICT */}

            <div className="mb-5 relative">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.district}
              </label>

              <input
                name="district"
                value={
                  form.district
                }
                onChange={
                  handleChange
                }
                onFocus={() =>
                  setShowDistrictSuggestions(
                    true
                  )
                }
                autoComplete="off"
                type="text"
                placeholder={
                  form.state
                    ? t.districtPlaceholder
                    : t.districtAfterState
                }
                disabled={
                  !form.state
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

              {form.state &&
                showDistrictSuggestions && (
                  <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">

                    {loadingDistricts ? (
                      <div className="px-4 py-3 text-gray-500">
                        {
                          t.loadingDistricts
                        }
                      </div>
                    ) : filteredDistricts.length >
                      0 ? (
                      <>
                        <div className="px-4 py-2 text-xs text-gray-400 border-b">
                          {
                            t.selectSuggestion
                          }
                        </div>

                        {filteredDistricts.map(
                          (
                            item
                          ) => (
                            <button
                              type="button"
                              key={
                                item.slug
                              }
                              onMouseDown={(
                                e
                              ) =>
                                e.preventDefault()
                              }
                              onClick={() =>
                                selectDistrict(
                                  item.name
                                )
                              }
                              className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-800"
                            >
                              {
                                item.name
                              }
                            </button>
                          )
                        )}
                      </>
                    ) : (
                      <div className="px-4 py-3 text-gray-500">
                        {
                          t.noSuggestions
                        }
                      </div>
                    )}

                  </div>
                )}

            </div>

            {/* VILLAGE / CITY / TOWN */}

            <div className="mb-7 relative">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.village}
              </label>

              <input
                name="village"
                value={
                  form.village
                }
                onChange={
                  handleChange
                }
                onFocus={() =>
                  setShowVillageSuggestions(
                    true
                  )
                }
                autoComplete="off"
                type="text"
                placeholder={
                  t.villagePlaceholder
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
              />

              {postOffices.length >
                0 &&
                showVillageSuggestions && (
                  <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">

                    <div className="px-4 py-2 text-xs text-gray-400 border-b">
                      {
                        t.selectSuggestion
                      }
                    </div>

                    {filteredPostOffices.length >
                    0 ? (
                      filteredPostOffices.map(
                        (
                          office,
                          index
                        ) => (
                          <button
                            type="button"
                            key={`${office.Name}-${index}`}
                            onMouseDown={(
                              e
                            ) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              selectVillage(
                                office
                              )
                            }
                            className="w-full text-left px-4 py-3 hover:bg-green-50"
                          >
                            <div className="font-semibold text-gray-800">
                              {
                                office.Name
                              }
                            </div>

                            <div className="text-xs text-gray-500 mt-1">
                              {office.District
                                ? `${office.District}, `
                                : ""}

                              {
                                office.State
                              }
                            </div>
                          </button>
                        )
                      )
                    ) : (
                      <div className="px-4 py-3 text-gray-500">
                        {
                          t.noSuggestions
                        }
                      </div>
                    )}

                  </div>
                )}

              {form.pinCode.length <
                6 && (
                <p className="text-xs text-gray-400 mt-2">
                  {
                    t.enterPinFirst
                  }
                </p>
              )}

            </div>

            {/* SAVE */}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
            >
              {t.save}
            </button>

          </form>
        </div>
      </div>

      {/* BACKGROUND CLICK AREA */}

      <button
        type="button"
        aria-label="Close suggestions"
        className="fixed inset-0 -z-10 cursor-default"
        onClick={
          closeSuggestions
        }
      />

    </main>
  );
}