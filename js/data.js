/**
 * Beyon Jewels Store Data
 * Stubbed from Google Business Profile (GMB) API structure.
 * Replace with live API data once Business Profile API access is provisioned.
 * Ref: gmb_integration_plan.md § 4 — Logical JSON Data Model
 */

const STORES = [
  {
    store_id: "LOC_001",
    name: "Beyon Jewels — Andheri West",
    city: "Mumbai",
    coordinates: { lat: 19.1171, lng: 72.8437 },
    address: "6, Business Point, Paliram Rd, Andheri West, Mumbai, Maharashtra 400058",
    phone: "+91 88790 28513",
    rating: 4.8,
    review_count: 124,
    regular_hours: [
      { day: "MONDAY",    open: "11:00", close: "20:00" },
      { day: "TUESDAY",   open: "11:00", close: "20:00" },
      { day: "WEDNESDAY", open: "11:00", close: "20:00" },
      { day: "THURSDAY",  open: "11:00", close: "20:00" },
      { day: "FRIDAY",    open: "11:00", close: "20:00" },
      { day: "SATURDAY",  open: "11:00", close: "21:00" },
      { day: "SUNDAY",    open: "11:00", close: "20:00" }
    ],
    photos: [],
    attributes: {
      parking: true,
      languages: ["English", "Hindi", "Marathi"]
    }
  },
  {
    store_id: "LOC_002",
    name: "Beyon Jewels — Bandra West",
    city: "Mumbai",
    coordinates: { lat: 19.0596, lng: 72.8295 },
    address: "14, Linking Road, Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 88790 28514",
    rating: 4.7,
    review_count: 98,
    regular_hours: [
      { day: "MONDAY",    open: "10:30", close: "20:30" },
      { day: "TUESDAY",   open: "10:30", close: "20:30" },
      { day: "WEDNESDAY", open: "10:30", close: "20:30" },
      { day: "THURSDAY",  open: "10:30", close: "20:30" },
      { day: "FRIDAY",    open: "10:30", close: "20:30" },
      { day: "SATURDAY",  open: "10:00", close: "21:00" },
      { day: "SUNDAY",    open: "10:00", close: "20:00" }
    ],
    photos: [],
    attributes: {
      parking: false,
      languages: ["English", "Hindi"]
    }
  },
  {
    store_id: "LOC_003",
    name: "Beyon Jewels — Connaught Place",
    city: "Delhi",
    coordinates: { lat: 28.6315, lng: 77.2167 },
    address: "Block A, Connaught Place, New Delhi, Delhi 110001",
    phone: "+91 88790 28515",
    rating: 4.9,
    review_count: 211,
    regular_hours: [
      { day: "MONDAY",    open: "11:00", close: "20:00" },
      { day: "TUESDAY",   open: "11:00", close: "20:00" },
      { day: "WEDNESDAY", open: "11:00", close: "20:00" },
      { day: "THURSDAY",  open: "11:00", close: "20:00" },
      { day: "FRIDAY",    open: "11:00", close: "20:00" },
      { day: "SATURDAY",  open: "11:00", close: "21:00" },
      { day: "SUNDAY",    open: "12:00", close: "19:00" }
    ],
    photos: [],
    attributes: {
      parking: true,
      languages: ["English", "Hindi", "Punjabi"]
    }
  },
  {
    store_id: "LOC_004",
    name: "Beyon Jewels — Indiranagar",
    city: "Bangalore",
    coordinates: { lat: 12.9784, lng: 77.6408 },
    address: "100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
    phone: "+91 88790 28516",
    rating: 4.6,
    review_count: 87,
    regular_hours: [
      { day: "MONDAY",    open: "11:00", close: "20:00" },
      { day: "TUESDAY",   open: "11:00", close: "20:00" },
      { day: "WEDNESDAY", open: "11:00", close: "20:00" },
      { day: "THURSDAY",  open: "11:00", close: "20:00" },
      { day: "FRIDAY",    open: "11:00", close: "20:00" },
      { day: "SATURDAY",  open: "10:30", close: "21:00" },
      { day: "SUNDAY",    open: "10:30", close: "20:00" }
    ],
    photos: [],
    attributes: {
      parking: true,
      languages: ["English", "Kannada", "Hindi"]
    }
  },
  {
    store_id: "LOC_005",
    name: "Beyon Jewels — Koregaon Park",
    city: "Pune",
    coordinates: { lat: 18.5362, lng: 73.8938 },
    address: "Lane 7, North Main Rd, Koregaon Park, Pune, Maharashtra 411001",
    phone: "+91 88790 28517",
    rating: 4.7,
    review_count: 63,
    regular_hours: [
      { day: "MONDAY",    open: "11:00", close: "20:00" },
      { day: "TUESDAY",   open: "11:00", close: "20:00" },
      { day: "WEDNESDAY", open: "11:00", close: "20:00" },
      { day: "THURSDAY",  open: "11:00", close: "20:00" },
      { day: "FRIDAY",    open: "11:00", close: "20:00" },
      { day: "SATURDAY",  open: "11:00", close: "21:00" },
      { day: "SUNDAY",    open: "11:00", close: "20:00" }
    ],
    photos: [],
    attributes: {
      parking: true,
      languages: ["English", "Marathi", "Hindi"]
    }
  },
  {
    store_id: "LOC_006",
    name: "Beyon Jewels — Anna Nagar",
    city: "Chennai",
    coordinates: { lat: 13.0850, lng: 80.2101 },
    address: "2nd Ave, Anna Nagar, Chennai, Tamil Nadu 600040",
    phone: "+91 88790 28518",
    rating: 4.8,
    review_count: 142,
    regular_hours: [
      { day: "MONDAY",    open: "10:00", close: "20:30" },
      { day: "TUESDAY",   open: "10:00", close: "20:30" },
      { day: "WEDNESDAY", open: "10:00", close: "20:30" },
      { day: "THURSDAY",  open: "10:00", close: "20:30" },
      { day: "FRIDAY",    open: "10:00", close: "20:30" },
      { day: "SATURDAY",  open: "10:00", close: "21:00" },
      { day: "SUNDAY",    open: "10:00", close: "20:00" }
    ],
    photos: [],
    attributes: {
      parking: true,
      languages: ["English", "Tamil", "Hindi"]
    }
  },
  {
    store_id: "LOC_007",
    name: "Beyon Jewels — Banjara Hills",
    city: "Hyderabad",
    coordinates: { lat: 17.4260, lng: 78.4490 },
    address: "Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
    phone: "+91 88790 28519",
    rating: 4.9,
    review_count: 178,
    regular_hours: [
      { day: "MONDAY",    open: "11:00", close: "20:00" },
      { day: "TUESDAY",   open: "11:00", close: "20:00" },
      { day: "WEDNESDAY", open: "11:00", close: "20:00" },
      { day: "THURSDAY",  open: "11:00", close: "20:00" },
      { day: "FRIDAY",    open: "11:00", close: "20:00" },
      { day: "SATURDAY",  open: "11:00", close: "21:00" },
      { day: "SUNDAY",    open: "11:00", close: "20:00" }
    ],
    photos: [],
    attributes: {
      parking: true,
      languages: ["English", "Telugu", "Hindi", "Urdu"]
    }
  }
];

const DAY_NAMES = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const DAY_SHORT  = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
