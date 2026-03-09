/**
 * Beyon Store Locator — Data / API Layer
 * Fetches live store data from the Get Branch Data API.
 * Client ID: 230000171
 */

const CLIENT_ID = '230000171';
const API_URL   = `https://api-digitalwall.xploro.io/Google/GetBranchData/${CLIENT_ID}`;

/* Global store array — populated by loadStores(). All other modules reference this. */
const STORES = [];

const DAY_NAMES = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
const DAY_SHORT  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* ============================================================
   CITY DETECTION
   Checks address string against known Indian city names.
   ============================================================ */
const CITY_PATTERNS = [
  'Mumbai', 'Navi Mumbai', 'Thane',
  'Delhi', 'New Delhi',
  'Bengaluru', 'Bangalore',
  'Pune',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Ahmedabad',
  'Surat',
  'Jaipur',
  'Lucknow',
  'Kochi', 'Cochin',
  'Chandigarh',
  'Indore',
  'Bhopal',
  'Nagpur',
  'Visakhapatnam',
  'Vadodara',
];

function extractCity(address) {
  const lower = (address || '').toLowerCase();
  for (const city of CITY_PATTERNS) {
    if (lower.includes(city.toLowerCase())) return city;
  }
  return 'Other';
}

/* ============================================================
   HOURS TRANSFORMER
   API: { "MONDAY": "11:00 - 21:00" }
   → [{ day: "MONDAY", open: "11:00", close: "21:00" }]
   ============================================================ */
function parseHours(storeHrs) {
  if (!storeHrs || typeof storeHrs !== 'object') return [];
  return Object.entries(storeHrs).map(([day, range]) => {
    const parts = range.split(' - ');
    return {
      day:   day.toUpperCase(),
      open:  (parts[0] || '').trim(),
      close: (parts[1] || '').trim(),
    };
  });
}

/* ============================================================
   API FETCH — single page
   ============================================================ */
async function fetchPage(page, pageSize) {
  const body = new URLSearchParams({
    StoreCode:  '',
    page:       page,
    page_size:  pageSize,
  });

  const res = await fetch(API_URL, {
    method:  'POST',
    headers: {
      'accept':       'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  if (data.Status !== 1) throw new Error(`API returned status: ${data.Status}`);

  return data.LocationInfo || [];
}

/* ============================================================
   LOAD ALL STORES  (paginated)
   ============================================================ */
async function loadStores() {
  const PAGE_SIZE = 50;
  let page = 1;
  let all  = [];

  while (true) {
    const batch = await fetchPage(page, PAGE_SIZE);
    all = all.concat(batch);
    if (batch.length < PAGE_SIZE) break;  // last page reached
    page++;
  }

  // Clear in-place so all existing references to STORES stay valid
  STORES.length = 0;

  all.forEach((loc, i) => {
    STORES.push({
      store_id:     `loc_${i + 1}`,
      name:          loc.StoreDisplayName || loc.BranchName || `Store ${i + 1}`,
      city:          extractCity(loc.StoreAddress),
      coordinates:  { lat: loc.Latitude, lng: loc.Longitude },
      address:       loc.StoreAddress || '',
      maps_url:      loc.ReviewPageURL || null,
      phone:         loc.PhoneNumber  || '',
      rating:        loc.GoogleAverageRating     || 0,
      review_count:  loc.TotalGoogleReviewCount  || 0,
      regular_hours: parseHours(loc.StoreHrs),
      photos:        [],
      attributes:    { parking: false, languages: [] },
    });
  });
}
