const SPRITES = [
  "sprite1-b.jpg",   // ← aqyui agrego mis Sprite Sheet
  "sprite2-b.jpg",
  "sprite3-b.jpg",
  "sprite4-b.jpg",
  "sprite5-b.jpg",
  "sprite6-b.jpg",
  "sprite7-b.jpg",
  "sprite8-b.jpg",
  
]

// ── Sprite animation ──
const walker = document.getElementById("walker");
const nav    = document.querySelector("nav");

let posX       = -55;
let frame      = 0;
const TOTAL_FRAMES = 8;
const FRAME_MS     = 110;   // milliseconds per frame
const PX_PER_FRAME = 2.5;   // pixels per frame tick

let lastTick   = null;
let frameTimer = 0;

function tick(ts) {
  if (!lastTick) lastTick = ts;
  const dt = ts - lastTick;
  lastTick = ts;

  // Advance horizontal position
  posX += PX_PER_FRAME * (dt / FRAME_MS);
  if (posX > nav.clientWidth + 10) posX = -55;

  // Advance sprite frame
  frameTimer += dt;
  if (frameTimer >= FRAME_MS) {
    frame = (frame + 1) % TOTAL_FRAMES;
    frameTimer -= FRAME_MS;
  }

  walker.style.left            = posX + "px";
  walker.style.backgroundImage = "url(" + SPRITES[frame] + ")";

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

// ── Translation data ──
const translations = {
  es: {
    brand:      "English Grammar Master",
    tiempos:    "Tiempos Verbales",
    aspectos:   "Aspectos",
    verbos:     "Lista de Verbos",
    phrasal:    "Phrasal Verbs",
    conectores: "Conectores",
    btn:        "ES / EN"
  },
  en: {
    brand:      "English Grammar Master",
    tiempos:    "Verb Tenses",
    aspectos:   "Aspects",
    verbos:     "Verb List",
    phrasal:    "Phrasal Verbs",
    conectores: "Connectors",
    btn:        "EN / ES"
  }
};

let currentLang = "es";

function applyLang(lang) {
  const t = translations[lang];
  document.getElementById("brand-text").textContent = t.brand;
  document.querySelectorAll("[data-key]").forEach(el => {
    el.textContent = t[el.dataset.key];
  });
  document.getElementById("lang-btn").textContent = t.btn;
}

document.getElementById("lang-btn").addEventListener("click", () => {
  currentLang = currentLang === "es" ? "en" : "es";
  applyLang(currentLang);
});

// Init
applyLang(currentLang);
