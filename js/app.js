/**
 * Beyon Store Locator — Main App
 * Interaction hooks as defined in execution_plan.md § 6
 */

/* ============================================================
   HELPERS — TIME / STATUS
   ============================================================ */

/** Returns the current time in IST (UTC+5:30) */
function getNowIST() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
}

/** Parse "HH:MM" into total minutes since midnight */
function toMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/** Format "HH:MM" → "H:MM AM/PM" */
function formatTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

/**
 * Calculate open/closed status for a store.
 * Ref: gmb_integration_plan.md § 5 — Open/Closed Status Calculation
 * @returns {{ isOpen: boolean, todayHours: object|null }}
 */
function getStoreStatus(store) {
  const now  = getNowIST();
  const dayIdx = now.getDay(); // 0 = Sunday
  const todayName = DAY_NAMES[dayIdx];
  const todayHours = store.regular_hours.find(h => h.day === todayName) || null;

  if (!todayHours) return { isOpen: false, todayHours: null };

  const currentMin = now.getHours() * 60 + now.getMinutes();
  const isOpen = currentMin >= toMinutes(todayHours.open) && currentMin < toMinutes(todayHours.close);

  return { isOpen, todayHours };
}

/** Render ★ stars as a string (filled/empty) */
function renderStars(rating, count = 5) {
  let html = '';
  for (let i = 1; i <= count; i++) {
    html += `<span class="${i <= Math.round(rating) ? 'rating-star' : ''}" style="${i > Math.round(rating) ? 'color:var(--color-grey-300)' : ''}">★</span>`;
  }
  return html;
}

/* ============================================================
   ICONS  (inline SVG, no external dependency)
   ============================================================ */
const ICONS = {
  search:     `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  location:   `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 1 10 10c0 5.52-10 12-10 12S2 17.52 2 12A10 10 0 0 1 12 2z"/></svg>`,
  clock:      `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  phone:      `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  directions: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
  calendar:   `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  pin:        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  parking:    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>`,
  globe:      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  check:      `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  gem:        `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="2" x2="12" y2="22"/><polyline points="2 8.5 12 13 22 8.5"/></svg>`,
  close:      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  wishlist:   `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  bag:        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  arrow_left: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
};

/* ============================================================
   STATE
   ============================================================ */
let currentCity   = 'all';
let currentSearch = '';
let bookingStoreId = null;

/* ============================================================
   RENDER — STORE CARD
   ============================================================ */
function createStoreCard(store) {
  const { isOpen, todayHours } = getStoreStatus(store);
  const reopensText = todayHours ? `Reopens at ${formatTime(todayHours.open)}` : 'Closed';
  const statusBadge = isOpen
    ? `<span class="badge badge--open"><span class="badge-dot"></span>Open Now</span>`
    : `<span class="badge badge--closed"><span class="badge-dot"></span>${reopensText}</span>`;

  const hoursText = todayHours
    ? `${formatTime(todayHours.open)} – ${formatTime(todayHours.close)}`
    : 'Hours unavailable';

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.name + ', ' + store.address)}`;

  const article = document.createElement('article');
  article.className = 'store-card';
  article.setAttribute('data-store-id', store.store_id);
  article.setAttribute('data-city', store.city);

  article.innerHTML = `
    <div class="card-image">
      <img src="Images/bottom-2.webp" alt="${store.name}" loading="lazy" class="card-image-photo" />
      <div class="card-image-badge">${statusBadge}</div>
    </div>
    <div class="card-content">
      <div class="card-header">
        <span class="card-name">${store.name}</span>
        <div class="card-rating">
          <span class="rating-star">★</span>
          <span class="rating-value">${store.rating}</span>
          <span class="rating-count">(${store.review_count})</span>
        </div>
      </div>
      <p class="card-address">${store.address}</p>
      <div class="card-info-row">
        ${ICONS.clock}
        <span>Today: ${hoursText}</span>
      </div>
      <div class="card-info-row">
        ${ICONS.phone}
        <span>${store.phone}</span>
      </div>
      <div class="card-footer">
        <div class="btn-container">
          <button class="btn btn-book js-open-booking" data-store-id="${store.store_id}" aria-label="Book appointment at ${store.name}">${ICONS.calendar} Book a Visit</button>
          <a href="${mapsUrl}" target="_blank" rel="noopener" class="btn btn-directions js-stop-prop" aria-label="Get directions to ${store.name}">${ICONS.directions} Directions</a>
          <a href="tel:${store.phone}" class="btn btn-call js-stop-prop" aria-label="Call ${store.name}">${ICONS.phone}</a>
        </div>
      </div>
    </div>
  `;

  /* Entire card navigates to detail view (onviewstoredetails) */
  article.addEventListener('click', e => {
    if (e.target.closest('.js-open-booking') || e.target.closest('.js-stop-prop')) return;
    window.location.href = `store-detail.html?id=${store.store_id}`;
  });

  return article;
}

/* ============================================================
   RENDER — STORE GRID  (onsearchinput / oncitytileclick)
   ============================================================ */
function filterStores(searchTerm, city) {
  const term = searchTerm.toLowerCase().trim();
  return STORES.filter(store => {
    const matchesCity   = city === 'all' || store.city === city;
    const matchesSearch = !term
      || store.name.toLowerCase().includes(term)
      || store.city.toLowerCase().includes(term)
      || store.address.toLowerCase().includes(term);
    return matchesCity && matchesSearch;
  });
}

function renderStores() {
  const grid      = document.getElementById('storeGrid');
  const countEl   = document.getElementById('storeCount');
  const filtered  = filterStores(currentSearch, currentCity);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-gem">${ICONS.gem}</div>
        <p class="no-results-title">No stores found</p>
        <p class="no-results-sub">Try a different city or search term.</p>
      </div>`;
  } else {
    filtered.forEach(store => grid.appendChild(createStoreCard(store)));
  }

  if (countEl) {
    countEl.innerHTML = `<strong>${filtered.length}</strong> store${filtered.length !== 1 ? 's' : ''} found`;
  }
}

/* ============================================================
   RENDER — CITY TILES
   ============================================================ */
function renderCityTiles() {
  const cities = ['all', ...new Set(STORES.map(s => s.city))];
  const row    = document.getElementById('cityRow');
  if (!row) return;

  row.innerHTML = cities.map(city => `
    <button class="city-tile${city === currentCity ? ' active' : ''}" data-city="${city}">
      ${city === 'all' ? 'All Cities' : city}
    </button>`
  ).join('');

  row.addEventListener('click', e => {
    const tile = e.target.closest('.city-tile');
    if (!tile) return;
    // oncitytileclick
    currentCity = tile.dataset.city;
    row.querySelectorAll('.city-tile').forEach(t => t.classList.remove('active'));
    tile.classList.add('active');
    renderStores();
  });
}

/* ============================================================
   BOOKING MODAL
   ============================================================ */
function openBookingModal(storeId) { // onopenbooking
  bookingStoreId = storeId;
  const store   = STORES.find(s => s.store_id === storeId);
  const modal   = document.getElementById('bookingModal');
  const nameEl  = document.getElementById('bookingStoreName');
  const cityEl  = document.getElementById('bookingCity');
  const storeEl = document.getElementById('bookingStore');
  const formEl  = document.getElementById('bookingForm');
  const successEl = document.getElementById('bookingSuccess');

  if (!modal) return;

  // Reset form state
  if (formEl)    { formEl.reset(); formEl.style.display = ''; }
  if (successEl) { successEl.style.display = 'none'; }

  if (nameEl && store) {
    nameEl.textContent = `at ${store.name}`;
  }

  // Auto-fill city & store as read-only text
  if (store) {
    if (cityEl)  cityEl.value  = store.city;
    if (storeEl) storeEl.value = store.name;
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Focus first input
  setTimeout(() => {
    const first = modal.querySelector('input');
    if (first) first.focus();
  }, 100);
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  bookingStoreId = null;
}


/* ============================================================
   USE MY LOCATION  (onclickusemylocation)
   ============================================================ */
function handleUseMyLocation() {
  const btn = document.getElementById('useMyLocation');
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  if (btn) {
    btn.textContent = 'Locating…';
    btn.disabled = true;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;

      // Find closest store using Haversine distance
      const closest = STORES.reduce((best, store) => {
        const d = haversineKm(latitude, longitude, store.coordinates.lat, store.coordinates.lng);
        return d < best.dist ? { store, dist: d } : best;
      }, { store: null, dist: Infinity });

      if (closest.store) {
        currentCity   = closest.store.city;
        currentSearch = '';
        const searchInput = document.getElementById('storeSearch');
        if (searchInput) searchInput.value = '';
        renderCityTiles();
        renderStores();
      }

      if (btn) {
        btn.innerHTML = `${ICONS.location} Use My Location`;
        btn.disabled = false;
      }
    },
    () => {
      alert('Unable to retrieve your location. Please enable location access and try again.');
      if (btn) {
        btn.innerHTML = `${ICONS.location} Use My Location`;
        btn.disabled = false;
      }
    }
  );
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ============================================================
   APPOINTMENT SUBMIT  (onsubmitappointment)
   ============================================================ */
async function handleBookingSubmit(e) {
  e.preventDefault();
  const form      = e.target;
  const formEl    = document.getElementById('bookingForm');
  const successEl = document.getElementById('bookingSuccess');
  const store     = STORES.find(s => s.store_id === bookingStoreId);

  /* Validation */
  const name  = form.elements['name']?.value.trim();
  const phone = form.elements['phone']?.value.trim();
  const date  = form.elements['date']?.value;

  if (!name || !phone || !date) {
    alert('Please fill in all required fields.');
    return;
  }

  /* Loading state */
  const submitBtn  = form.querySelector('[type="submit"]');
  const btnOriginal = submitBtn.textContent;
  submitBtn.textContent = 'Booking…';
  submitBtn.disabled = true;

  try {
    const payload = {
      servicecloudPartnerId: 'Ecomm',
      customerName:    name,
      mobileNumber:    phone,
      appointmentDate: date,
      storeCode:       store?.store_code || '',
      storeName:       store?.name       || form.elements['store']?.value || '',
      city:            store?.city       || form.elements['city']?.value  || '',
      comments:        form.elements['notes']?.value || '',
    };

    const res = await fetch(
      'https://preprd-ms-api.titan.in/titan-ecomm2-exp-app-ch2/api/exp/appointment/v1/bookAnAppointment',
      {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Basic VGl0YW5fTXVsZTphZG1pbl90IXRhbl9tdWxl',
          'servicecloudPartnerId': 'Ecomm',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    /* Success */
    if (formEl)    formEl.style.display    = 'none';
    if (successEl) successEl.style.display = '';

  } catch (err) {
    console.error('Booking API error:', err);
    submitBtn.textContent = btnOriginal;
    submitBtn.disabled    = false;
    alert('Something went wrong. Please try again or call the store directly.');
  }
}

/* ============================================================
   VIEW STORE DETAILS  (onviewstoredetails)
   ============================================================ */
function handleViewStoreDetails(storeId) {
  window.location.href = `store-detail.html?id=${storeId}`;
}

/* ============================================================
   LOADING / ERROR STATES
   ============================================================ */
function showLoading() {
  const grid = document.getElementById('storeGrid');
  if (grid) grid.innerHTML = `<div class="stores-loading">Loading stores…</div>`;
}

function showLoadError() {
  const grid = document.getElementById('storeGrid');
  if (grid) grid.innerHTML = `
    <div class="no-results">
      <div class="no-results-gem">${ICONS.gem}</div>
      <p class="no-results-title">Could not load stores</p>
      <p class="no-results-sub">Please try refreshing the page.</p>
    </div>`;
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  /* Show loading while API fetches */
  showLoading();

  try {
    await loadStores();
  } catch (err) {
    console.error('Failed to load stores:', err);
    showLoadError();
    return;
  }

  /* City tiles */
  renderCityTiles();

  /* Store grid */
  renderStores();

  /* onsearchinput */
  const searchInput = document.getElementById('storeSearch');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentSearch = e.target.value;
      renderStores();
    });
  }

  /* onclickusemylocation */
  const locBtn = document.getElementById('useMyLocation');
  if (locBtn) {
    locBtn.addEventListener('click', handleUseMyLocation);
  }

  /* Event delegation — booking buttons inside cards */
  const grid = document.getElementById('storeGrid');
  if (grid) {
    grid.addEventListener('click', e => {
      const bookBtn = e.target.closest('.js-open-booking');
      if (bookBtn) {
        e.preventDefault();
        openBookingModal(bookBtn.dataset.storeId);
      }
    });
  }

  /* Modal close button */
  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.addEventListener('click', closeBookingModal);

  /* Close modal on overlay click */
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeBookingModal();
    });
  }

  /* Close modal on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeBookingModal();
  });

  /* Booking form submission (onsubmitappointment) */
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) bookingForm.addEventListener('submit', handleBookingSubmit);


  /* Header booking CTAs on detail page */
  document.querySelectorAll('.js-open-booking-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const storeId = btn.dataset.storeId;
      openBookingModal(storeId);
    });
  });
});
