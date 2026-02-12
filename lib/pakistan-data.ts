// Pakistani Provinces
export const PAKISTAN_PROVINCES = [
  "Sindh",
  "Punjab",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
  "Islamabad Capital Territory",
] as const

// Cities by Province
export const PAKISTAN_CITIES: Record<string, string[]> = {
  Sindh: [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Mirpur Khas",
    "Thatta",
    "Badin",
    "Nawabshah",
  ],
  Punjab: [
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Multan",
    "Gujranwala",
    "Sargodha",
    "Bahawalpur",
    "Sialkot",
    "Okara",
    "Gujrat",
  ],
  "Khyber Pakhtunkhwa": [
    "Peshawar",
    "Swat",
    "Mardan",
    "Kohat",
    "Abbottabad",
    "Dera Ismail Khan",
    "Charsadda",
    "Nowshera",
  ],
  Balochistan: [
    "Quetta",
    "Gwadar",
    "Turbat",
    "Khuzdar",
    "Zhob",
    "Loralai",
    "Chaman",
    "Sibi",
  ],
  "Gilgit-Baltistan": [
    "Gilgit",
    "Skardu",
    "Hunza",
    "Nagar",
    "Ghanche",
    "Ghizer",
  ],
  "Azad Jammu & Kashmir": [
    "Muzaffarabad",
    "Mirpur",
    "Rawalakot",
    "Bagh",
    "Kotli",
    "Poonch",
  ],
  "Islamabad Capital Territory": ["Islamabad"],
}

// Gender Options
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer Not to Say" },
] as const

export type GenderOption = (typeof GENDER_OPTIONS)[number]["value"]
export type ProvinceType = (typeof PAKISTAN_PROVINCES)[number]
