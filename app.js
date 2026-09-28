// Logica Sito Cliente — Friends Pub Toritto (Collegata a Supabase)

const TIME_SLOTS = [
  "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
];

let supabaseClient = null;
let realtimeChannel = null;

let state = {
  menu: [...INITIAL_MENU],
  reviews: [...INITIAL_REVIEWS],
  bookings: [],
  settings: {
    maxSeatsIndoor: FRIENDS_CONFIG.maxSeatsPerSlotIndoor,
    maxSeatsOutdoor: FRIENDS_CONFIG.maxSeatsPerSlotOutdoor,
    outdoorEnabled: FRIENDS_CONFIG.outdoorEnabled
  },
  menuCategory: "all",
  menuSearch: ""
};

function initSupabase() {
  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(
      FRIENDS_CONFIG.supabaseUrl,
      FRIENDS_CONFIG.supabaseAnonKey
    );
  }
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3400);
}

async function fetchPublicData() {
  if (!supabaseClient) {
    renderAll();
    return;
  }

  try {
    const [settingsRes, menuRes, reviewsRes, bookingsRes] = await Promise.all([
      supabaseClient.from("restaurant_settings").select("*").eq("id", 1).maybeSingle(),
      supabaseClient.from("menu_items").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
      supabaseClient.from("reviews").select("*").order("created_at", { ascending: false }),
      supabaseClient.from("bookings").select("*")
    ]);

    if (settingsRes.data) {
      state.settings = {
        maxSeatsIndoor: Number(settingsRes.data.max_seats_indoor || 42),
        maxSeatsOutdoor: Number(settingsRes.data.max_seats_outdoor || 48),
        outdoorEnabled: Boolean(settingsRes.data.outdoor_enabled)
      };
    }

    if (menuRes.data && menuRes.data.length > 0) {
      state.menu = menuRes.data.map((row) => ({
        id: row.id,
        name: row.name,
        category: row.category,
        categoryLabel: row.category_label,
        price: Number(row.price),
        description: row.description,
        tagLabels: Array.isArray(row.tag_labels) ? row.tag_labels : [],
        available: Boolean(row.available)
      }));
    }

    if (reviewsRes.data) {
      state.reviews = reviewsRes.data.map((row) => ({
        id: row.id,
        author: row.author,
        rating: Number(row.rating),
        date: row.date_label || "Recente",
        favoriteDish: row.favorite_dish || "",
        text: row.text,
        ownerReply: row.owner_reply || ""
      }));
    }

    if (bookingsRes.data) {
      state.bookings = bookingsRes.data.map((row) => ({
        id: row.id,
        customerName: row.customer_name,
        phone: row.phone,
        date: row.booking_date,
        time: row.booking_time,
        guests: Number(row.guests),
        area: row.area,
        assignedTable: row.assigned_table || "",
        status: row.status || "pending"
      }));
    }
  } catch (err) {
    console.warn("Errore caricamento dati:", err);
  }

  renderAll();
}

function subscribePublicRealtime() {
  if (!supabaseClient || realtimeChannel) return;
  realtimeChannel = supabaseClient
    .channel("friends-public-sync")
    .on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, () => fetchPublicData())
    .on("postgres_changes", { event: "*", schema: "public", table: "reviews" }, () => fetchPublicData())
    .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => fetchPublicData())
    .on("postgres_changes", { event: "*", schema: "public", table: "restaurant_settings" }, () => fetchPublicData())
    .subscribe();
}

// ===================== MENU DIVISO IN SEZIONI =====================
const MENU_SECTIONS = [
  {
    id: "stuzzicheria-fritti",
    title: "Stuzzichiamo & Friggiamo",
    subtitle: "Sfizi, patatine speciali e fritti dorati per iniziare"
  },
  {
    id: "pizze",
    title: "Pizze & Panzerotti XXL",
    subtitle: "Pizze classiche, speciali e panzerotti al forno XXL"
  },
  {
    id: "hamburger",
    title: "Hamburger + Patatine",
    subtitle: "Tutti gli hamburger sono serviti accompagnati da patatine"
  },
  {
    id: "mare-bao",
    title: "Hamburger di Mare & Bao",
    subtitle: "Burger con tartare di pesce fresco e bao artigianali al vapore"
  },
  {
    id: "insalate-tagliate",
    title: "Insalate & Tagliate",
    subtitle: "Insalate ricche e tagliate di carne da 300g con rucola, grana e pomodorini"
  },
  {
    id: "sushi-poke",
    title: "Sushi & Poke",
    subtitle: "Roll da 8 pezzi e Poke Bowl componibili"
  }
];

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  const q = state.menuSearch.trim().toLowerCase();
  const filtered = state.menu.filter((item) => {
    const matchCat = state.menuCategory === "all" || item.category === state.menuCategory;
    const matchSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      (item.description || "").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-secondary); padding:24px 0;">Nessun piatto trovato.</p>`;
    return;
  }

  const sectionsHtml = MENU_SECTIONS.map((sec) => {
    const items = filtered.filter((item) => item.category === sec.id);
    if (items.length === 0) return "";

    const rowsHtml = items
      .map(
        (item) => `
        <div class="menu-row ${!item.available ? "sold-out" : ""}">
          <div class="menu-row-top">
            <span class="menu-row-name">${escapeHtml(item.name)}</span>
            <span class="menu-row-dots"></span>
            <span class="menu-row-price">${
              item.available
                ? `${Number(item.price).toFixed(2).replace(".", ",")} €`
                : "Esaurito"
            }</span>
          </div>
          ${
            item.description
              ? `<p class="menu-row-desc">${escapeHtml(item.description)}</p>`
              : ""
          }
        </div>
      `
      )
      .join("");

    return `
      <div class="menu-section-block">
        <div class="menu-section-block-header">
          <h3 class="menu-section-block-title">${escapeHtml(sec.title)}</h3>
          <p class="menu-section-block-sub">${escapeHtml(sec.subtitle)}</p>
        </div>
        <div class="menu-section-block-list">
          ${rowsHtml}
        </div>
      </div>
    `;
  })
    .filter(Boolean)
    .join("");

  grid.innerHTML = sectionsHtml;
}

function setMenuCategory(cat, btnEl) {
  state.menuCategory = cat;
  document.querySelectorAll(".cat-tab").forEach((b) => {
    b.classList.toggle("active", b.dataset.cat === cat);
  });
  if (btnEl) btnEl.classList.add("active");
  renderMenu();
}

function openMenuView(e) {
  if (e && e.preventDefault) e.preventDefault();
  const homeSections = document.getElementById("homeSections");
  const menuSection = document.getElementById("menu");
  const navMenu = document.getElementById("navLinkMenu");

  if (homeSections) homeSections.style.display = "none";
  if (menuSection) menuSection.style.display = "block";
  if (navMenu) navMenu.style.color = "var(--accent-green-light)";

  renderMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeMenuView(targetSectionId = "home", e) {
  if (e && e.preventDefault) e.preventDefault();
  const homeSections = document.getElementById("homeSections");
  const menuSection = document.getElementById("menu");
  const navMenu = document.getElementById("navLinkMenu");

  if (menuSection) menuSection.style.display = "none";
  if (homeSections) homeSections.style.display = "block";
  if (navMenu) navMenu.style.color = "";

  const targetEl = document.getElementById(targetSectionId);
  if (targetEl && targetSectionId !== "home") {
    targetEl.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ===================== PRENOTAZIONE MINIMAL =====================
function getBookedSeats(date, time, area) {
  return state.bookings
    .filter((b) => b.date === date && b.time === time && b.area === area && b.status !== "cancelled")
    .reduce((sum, b) => sum + Number(b.guests || 0), 0);
}

function renderBookingOptions() {
  const areaSelect = document.getElementById("bookArea");
  const timeSelect = document.getElementById("bookTime");
  const dateInput = document.getElementById("bookDate");
  const guestsInput = document.getElementById("bookGuests");
  if (!areaSelect || !timeSelect || !dateInput) return;

  // Se il dehors è chiuso dalle impostazioni admin, mostra solo Sala Interna
  const currentArea = areaSelect.value || "Dehors Piazza";
  if (!state.settings.outdoorEnabled) {
    areaSelect.innerHTML = `<option value="Sala Interna" selected>Sala Interna</option>`;
  } else {
    areaSelect.innerHTML = `
      <option value="Dehors Piazza" ${currentArea === "Dehors Piazza" ? "selected" : ""}>Dehors Piazza</option>
      <option value="Sala Interna" ${currentArea === "Sala Interna" ? "selected" : ""}>Sala Interna</option>
    `;
  }

  const selectedDate = dateInput.value || getTodayFormatted(0);
  const selectedArea = areaSelect.value;
  const requestedGuests = Number(guestsInput?.value || 2);
  const maxSeats =
    selectedArea === "Dehors Piazza"
      ? Number(state.settings.maxSeatsOutdoor || 48)
      : Number(state.settings.maxSeatsIndoor || 42);

  const prevTime = timeSelect.value || "20:30";
  timeSelect.innerHTML = TIME_SLOTS.map((slot) => {
    const booked = getBookedSeats(selectedDate, slot, selectedArea);
    const remaining = Math.max(0, maxSeats - booked);
    const disabled = remaining < requestedGuests;
    return `<option value="${slot}" ${disabled ? "disabled" : ""} ${slot === prevTime && !disabled ? "selected" : ""}>
      ${slot}${disabled ? " (Completo)" : ""}
    </option>`;
  }).join("");
}

async function handleUserBookingSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const date = document.getElementById("bookDate").value;
  const time = document.getElementById("bookTime").value;
  const guests = Number(document.getElementById("bookGuests").value);
  const area = document.getElementById("bookArea").value;
  const name = document.getElementById("bookName").value.trim();
  const phone = document.getElementById("bookPhone").value.trim();
  const notes = document.getElementById("bookNotes").value.trim();

  if (!name || !phone || !date || !time) return;

  if (btn) {
    btn.disabled = true;
    btn.textContent = "Invio in corso...";
  }

  const code = "FRN-" + Math.floor(1000 + Math.random() * 9000);
  const nowStr = new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });

  const payload = {
    id: code,
    customer_name: name,
    phone,
    email: "",
    booking_date: date,
    booking_time: time,
    guests,
    area,
    occasion: "Cena",
    assigned_table: "",
    status: "pending",
    notes: notes || "",
    created_at_label: `Oggi, ${nowStr}`
  };

  if (supabaseClient) {
    const { error } = await supabaseClient.from("bookings").insert(payload);
    if (error) {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Conferma Prenotazione";
      }
      showToast("Si è verificato un errore. Riprova.");
      return;
    }
    await fetchPublicData();
  }

  if (btn) {
    btn.disabled = false;
    btn.textContent = "Conferma Prenotazione";
  }

  const confirmBox = document.getElementById("bookingConfirmationBox");
  if (confirmBox) {
    confirmBox.style.display = "block";
    confirmBox.innerHTML = `
      <div class="booking-confirmation">
        <div style="font-weight:700; margin-bottom:6px;">Prenotazione registrata — Codice: ${escapeHtml(code)}</div>
        <div style="color:var(--text-secondary);">
          ${escapeHtml(name)} • ${escapeHtml(date)} ore ${escapeHtml(time)} • ${guests} persone (${escapeHtml(area)})
        </div>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">
          Conserva il codice ${escapeHtml(code)} per verificare lo stato o annullare la prenotazione.
        </div>
      </div>
    `;
  }

  e.target.reset();
  document.getElementById("bookDate").value = date;
  document.getElementById("bookGuests").value = "2";
  renderBookingOptions();
  showToast(`Prenotazione ${code} registrata.`);
}

function toggleLookupBox() {
  const box = document.getElementById("lookupBox");
  if (!box) return;
  box.style.display = box.style.display === "none" ? "block" : "none";
}

async function handleLookupBooking(e) {
  if (e && e.preventDefault) e.preventDefault();
  const q = document.getElementById("lookupBookingInput")?.value.trim().toLowerCase();
  const resEl = document.getElementById("lookupBookingResult");
  if (!resEl || !q) return;

  await fetchPublicData();

  const matches = state.bookings.filter(
    (b) =>
      b.id.toLowerCase() === q ||
      b.phone.replace(/\s+/g, "").includes(q.replace(/\s+/g, ""))
  );

  if (matches.length === 0) {
    resEl.innerHTML = `<p style="font-size:0.86rem; color:var(--text-secondary);">Nessuna prenotazione trovata.</p>`;
    return;
  }

  const statusMap = {
    pending: "In attesa di conferma",
    confirmed: "Confermata",
    completed: "Completata",
    cancelled: "Annullata"
  };

  resEl.innerHTML = matches
    .map(
      (b) => `
      <div style="padding:14px; background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); margin-bottom:10px; font-size:0.86rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <strong>${escapeHtml(b.id)} — ${escapeHtml(b.customerName)}</strong>
          <span class="status-badge ${escapeHtml(b.status)}">${statusMap[b.status] || b.status}</span>
        </div>
        <div style="color:var(--text-secondary); margin-bottom:8px;">
          ${escapeHtml(b.date)} ore ${escapeHtml(b.time)} • ${b.guests} persone • ${escapeHtml(b.area)}
          ${b.assignedTable ? ` • Tavolo: ${escapeHtml(b.assignedTable)}` : ""}
        </div>
        ${
          b.status !== "cancelled"
            ? `<button type="button" class="btn btn-outline btn-sm" onclick="cancelBookingByUser('${escapeHtml(b.id)}')">Annulla Prenotazione</button>`
            : ""
        }
      </div>
    `
    )
    .join("");
}

async function cancelBookingByUser(bookingId) {
  if (supabaseClient) {
    await supabaseClient.from("bookings").update({ status: "cancelled", assigned_table: "" }).eq("id", bookingId);
    await fetchPublicData();
  }
  await handleLookupBooking();
  showToast(`Prenotazione ${bookingId} annullata.`);
}

// ===================== RECENSIONI =====================
function renderReviews() {
  const listEl = document.getElementById("reviewsList");
  const avgEl = document.getElementById("avgRatingScore");
  const countEl = document.getElementById("totalReviewsCount");
  if (!listEl) return;

  const total = state.reviews.length;
  const avg =
    total > 0
      ? (state.reviews.reduce((s, r) => s + Number(r.rating), 0) / total).toFixed(1)
      : "4.5";

  if (avgEl) avgEl.textContent = avg;
  if (countEl) countEl.textContent = `${total} recensioni pubblicate`;

  listEl.innerHTML = state.reviews
    .map(
      (r) => `
      <article class="review-card">
        <div>
          <div class="review-meta-top">
            <div>
              <div class="review-author">${escapeHtml(r.author)}</div>
              <div style="font-size:0.76rem; color:var(--text-muted);">${escapeHtml(r.date)}</div>
            </div>
            <div class="review-rating-text">Voto: ${Number(r.rating)} / 5</div>
          </div>
          <p class="review-body">"${escapeHtml(r.text)}"</p>
        </div>
        <div>
          ${
            r.favoriteDish
              ? `<div style="font-size:0.78rem; color:var(--accent-green-light);">Piatto consigliato: ${escapeHtml(r.favoriteDish)}</div>`
              : ""
          }
          ${
            r.ownerReply
              ? `<div class="review-owner-reply">
                  <strong>Risposta di Friends Pub</strong>
                  <span>${escapeHtml(r.ownerReply)}</span>
                </div>`
              : ""
          }
        </div>
      </article>
    `
    )
    .join("");
}

async function handleNewReviewSubmit(e) {
  e.preventDefault();
  const author = document.getElementById("revAuthor").value.trim();
  const rating = Number(document.getElementById("revRating").value || 5);
  const dish = document.getElementById("revDish").value.trim();
  const text = document.getElementById("revText").value.trim();

  if (!author || !text) return;

  const newRev = {
    id: "rev-" + Date.now(),
    author,
    rating,
    date_label: "Oggi",
    category: "Cena",
    favorite_dish: dish,
    text,
    owner_reply: ""
  };

  if (supabaseClient) {
    const { error } = await supabaseClient.from("reviews").insert(newRev);
    if (error) {
      showToast("Errore durante l'invio della recensione.");
      return;
    }
    await fetchPublicData();
  }

  e.target.reset();
  showToast("Recensione pubblicata. Grazie!");
}

function renderAll() {
  renderMenu();
  renderBookingOptions();
  renderReviews();
}

document.addEventListener("DOMContentLoaded", async () => {
  initSupabase();

  const today = getTodayFormatted(0);
  const bookDate = document.getElementById("bookDate");
  if (bookDate) {
    bookDate.value = today;
    bookDate.min = today;
    bookDate.addEventListener("change", renderBookingOptions);
  }

  document.getElementById("bookGuests")?.addEventListener("change", renderBookingOptions);
  document.getElementById("bookArea")?.addEventListener("change", renderBookingOptions);

  const searchInput = document.getElementById("menuSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.menuSearch = e.target.value;
      renderMenu();
    });
  }

  renderAll();
  await fetchPublicData();
  subscribePublicRealtime();
});
