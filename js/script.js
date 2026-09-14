/* =========================================================
   1. YOUR CONTENT — edit these arrays to update the site
   ========================================================= */

/**
 * VIDEOS
 * -----------------------------------------------------------
 * youtubeId : the part of a YouTube URL after "v=" or after
 *             "youtu.be/". Example:
 *             https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *                                              ^^^^^^^^^^^ this
 *             https://youtu.be/dQw4w9WgXcQ
 *                              ^^^^^^^^^^^ this
 * category  : "long" | "shorts" | "ads"  (used by the filter tabs)
 * orientation: "landscape" (16:9) or "portrait" (9:16, for Shorts/Reels)
 *
 * The thumbnail image is pulled automatically from YouTube using
 * the youtubeId, so you only need to paste the ID once.
 * Until you replace a placeholder ID, that card just shows a
 * "add your video" placeholder instead of a broken image.
 */
const videos = [
  {
    title: "Product Unboxing — Long Form",
    category: "long",
    orientation: "landscape",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID_1"
  },
  {
    title: "Motion Graphics",
    category: "Motion",
    orientation: "landscape",
    youtubeId: "/UsH349ldJJU"
  },
  {
    title: "TikTok Trend Edit",
    category: "shorts",
    orientation: "portrait",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID_3"
  },
  {
    title: "Instagram Reel — Fashion",
    category: "shorts",
    orientation: "portrait",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID_4"
  },
  {
    title: "YouTube Short",
    category: "shorts",
    orientation: "portrait",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID_5"
  },
  {
    title: "Commercial Ad Spot",
    category: "ads",
    orientation: "landscape",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID_6"
  }
];

/**
 * EDITED FOR
 * -----------------------------------------------------------
 * A list of creators / clients you've edited for.
 * `color` sets the avatar circle color, `initial` is the letter
 * shown inside it (until you swap in real avatar photos, which
 * you can do by editing the renderEditedFor() function below).
 */
const editedFor = [
  { handle: "@ClientOne", initial: "C", color: "#4f8cff" },
  { handle: "@ClientTwo", initial: "C", color: "#ff6b6b" },
  { handle: "@ClientThree", initial: "C", color: "#ffb347" }
];

/**
 * TOOLS
 * -----------------------------------------------------------
 * The software you edit with.
 */
const tools = [
  { name: "Adobe Premiere Pro", color: "#00005B" },
  { name: "After Effects", color: "#9999FF" },
  { name: "DaVinci Resolve", color: "#233A51" }
];

/* =========================================================
   2. RENDERING — turns the arrays above into HTML
   ========================================================= */

const videoGrid = document.getElementById("videoGrid");
const editedForRow = document.getElementById("editedForRow");
const toolsRow = document.getElementById("toolsRow");

function playIconSVG() {
  return `<svg viewBox="0 0 24 24" fill="none"><path d="M7 5l12 7-12 7V5z" fill="#0a0a0b"/></svg>`;
}

function renderVideos(filter) {
  videoGrid.innerHTML = "";

  const list = filter === "all" ? videos : videos.filter(v => v.category === filter);

  list.forEach((video, index) => {
    const card = document.createElement("div");
    card.className = "video-card reveal";
    card.dataset.index = videos.indexOf(video);

    const thumbClass = video.orientation === "portrait" ? "thumb portrait" : "thumb";
    const thumbSrc = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

    card.innerHTML = `
      <div class="clip-bar"><span></span><span></span><span></span><span></span><span></span></div>
      <div class="${thumbClass}">
        <img src="${thumbSrc}" alt="${video.title}"
             onerror="this.style.display='none'; this.parentElement.classList.add('placeholder');" />
        <div class="play-btn">${playIconSVG()}</div>
      </div>
      <div class="card-body">
        <div class="card-title">${video.title}</div>
        <div class="card-cat">${categoryLabel(video.category)}</div>
      </div>
    `;

    card.addEventListener("click", () => openModal(video));
    videoGrid.appendChild(card);
    observeReveal(card);
  });
}

function categoryLabel(cat) {
  if (cat === "long") return "Long-form";
  if (cat === "shorts") return "Shorts / Reels";
  if (cat === "ads") return "Ad";
  return cat;
}

function renderEditedFor() {
  editedForRow.innerHTML = editedFor
    .map(
      p => `
      <div class="chip">
        <div class="chip-avatar" style="background:${p.color}">${p.initial}</div>
        <div class="chip-handle">${p.handle}</div>
      </div>`
    )
    .join("");
}

function renderTools() {
  toolsRow.innerHTML = tools
    .map(
      t => `
      <div class="tool-badge">
        <div class="tool-icon" style="background:${t.color}">${t.name.charAt(0)}</div>
        ${t.name}
      </div>`
    )
    .join("");
}

/* =========================================================
   3. FILTER TABS
   ========================================================= */
const filterTabs = document.getElementById("filterTabs");

filterTabs.addEventListener("click", e => {
  const btn = e.target.closest(".tab");
  if (!btn) return;

  filterTabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderVideos(btn.dataset.filter);
});

/* =========================================================
   4. VIDEO MODAL
   ========================================================= */
const modal = document.getElementById("videoModal");
const modalVideoWrap = document.getElementById("modalVideoWrap");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");

function openModal(video) {
  const wrapClass = video.orientation === "portrait" ? "modal-video-wrap portrait" : "modal-video-wrap";
  modalVideoWrap.className = wrapClass;
  modalVideoWrap.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0"
      title="${video.title}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalVideoWrap.innerHTML = ""; // stops playback
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

/* =========================================================
   5. SCROLL-REVEAL ANIMATIONS
   ========================================================= */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

function observeReveal(el) {
  revealObserver.observe(el);
}

document.querySelectorAll(".reveal").forEach(observeReveal);

/* =========================================================
   6. INIT
   ========================================================= */
renderVideos("all");
renderEditedFor();
renderTools();
document.getElementById("year").textContent = new Date().getFullYear();
