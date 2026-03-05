# Google Business Profile (GMB) Technical Integration Plan

This plan details the integration of the Google Business Profile (formerly GMB) API to power the Beyon Store Locator with real-time data.

## 1. API Architecture & Endpoints

| Data Point | Endpoint (Resource) | Description |
| :--- | :--- | :--- |
| **Store List/Info** | `accounts.locations.list` | Fetches all verified locations (Name, Address, Phone). |
| **Opening Hours** | `accounts.locations` (field: `regularHours`) | Fetches standard weekly hours. |
| **Reviews & Ratings** | `accounts.locations.reviews.list` | Fetches star ratings and review text/counts. |
| **Store Photos** | `accounts.locations.media.list` | Fetches store imagery (Exterior, Interior, Products). |
| **Attributes** | `accounts.locations` (field: `attributes`) | Custom fields like Parking, Languages. |

## 2. Authentication & Setup
- **Access**: Requires a Google Cloud Project with the **Business Profile API** enabled.
- **Auth Method**: **OAuth 2.0**. Since this is a public website, the API calls must be made via a secure backend or serverless function to protect the `Client ID` and `Client Secret`.
- **API Key**: Required for maps and distance matrix interactions (Google Maps Platform).

## 3. Data Fetching & Caching Strategy
> [!IMPORTANT]
> To ensure high performance and avoid rate limits, **do not** make live API calls on every page load.

- **Strategy**: **Static Site Generation (SSG) with ISR (Incremental Static Regeneration)** or a nightly cron job.
- **Cache Layer**: Store the JSON response in a local file or Redis cache.
- **TTL (Time to Live)**: 24 hours (Hours/Reviews change infrequently). Status calculation happens client-side based on this cached data.

## 4. Logical JSON Data Model
The frontend will consume a simplified JSON structure:

```json
{
  "store_id": "LOC_123",
  "name": "Beyon Jewels - Mumbai",
  "coordinates": { "lat": 19.1171, "lng": 72.8437 },
  "address": "6, Business Point, Paliram Rd, Andheri West, Mumbai...",
  "phone": "+91 88790 28513",
  "rating": 4.8,
  "review_count": 124,
  "regular_hours": [
    { "day": "MONDAY", "open": "11:00", "close": "20:00" },
    ...
  ],
  "photos": ["url1", "url2"],
  "attributes": {
    "parking": true,
    "languages": ["English", "Hindi", "Marathi"]
  }
}
```

## 5. Open/Closed Status Calculation
Since hours are static but status is dynamic, the frontend logic will:
1. Get the store's `regular_hours`.
2. Determine store's local time (Mumbai: UTC+5:30).
3. Check current day and time against intervals.
4. **Edge Case**: Handle `specialHours` (holidays) by checking if the current date exists in that array before regular hours.

## 6. Known Limitations
- **Verification**: Only verified locations are returned by the API.
- **Delay**: Updates on the GMB dashboard can take up to 24-48 hours to reflect in the API.
- **Photos**: High-resolution photos are served via Google's CDN; ensure proper attribution if required.

## 7. Beyon Mumbai Store (Reference)
- **Location**: Andheri West, Mumbai.
- **Note**: The first implementation will hard-code/stub this store's data based on the GMB structure to unblock frontend development while API access is being provisioned.
