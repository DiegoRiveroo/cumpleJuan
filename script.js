// 1) Pega aquí la URL de tu Web App de Google Apps Script cuando la publiques.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxzQtnpqcYpxSfWwL-cO5_MnDvegZ8-3z2rVuyoVGxE_m0Tk-5VpZUH1sx_XW_WYXWm/exec";

const eventDate = new Date("2026-06-12T20:00:00-03:00");
const countdownEl = document.getElementById("countdown");
const music = document.getElementById("bgMusic");
const enterBtn = document.getElementById("enterBtn");
const musicToggle = document.getElementById("musicToggle");
const cursorGlow = document.getElementById("cursorGlow");

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;
  if (diff <= 0) {
    countdownEl.innerHTML = `<span><strong>Tonight</strong><small>is the night</small></span>`;
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdownEl.innerHTML = `
    <span><strong>${days}</strong><small>días</small></span>
    <span><strong>${hours}</strong><small>horas</small></span>
    <span><strong>${minutes}</strong><small>min</small></span>
    <span><strong>${seconds}</strong><small>seg</small></span>
  `;
}
setInterval(updateCountdown, 1000);
updateCountdown();

async function tryPlayMusic() {
  try {
    await music.play();
    musicToggle.textContent = "Sound on";
  } catch (err) {
    musicToggle.textContent = "Add music file";
  }
}

enterBtn.addEventListener("click", () => {
  tryPlayMusic();
  document.querySelector(".night").scrollIntoView({ behavior: "smooth" });
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    await tryPlayMusic();
  } else {
    music.pause();
    musicToggle.textContent = "Sound off";
  }
});

window.addEventListener("pointermove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.24 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

async function submitToSheet(type, data, statusEl) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("GOOGLE_SCRIPT_URL")) {
    statusEl.textContent = "Demo activa: falta conectar Google Sheets.";
    return { ok: false };
  }

  statusEl.textContent = "Guardando...";
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data })
    });
    statusEl.textContent = "Listo. Gracias ✨";
    return { ok: true };
  } catch (error) {
    statusEl.textContent = "No se pudo guardar. Intentalo de nuevo.";
    return { ok: false };
  }
}

function formDataToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

document.getElementById("playlistForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("playlistStatus");
  const result = await submitToSheet("playlist", formDataToObject(form), status);
  if (result.ok) form.reset();
});

document.getElementById("memoryForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("memoryStatus");
  const result = await submitToSheet("memory", formDataToObject(form), status);
  if (result.ok) form.reset();
});

document.getElementById("rsvpForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("rsvpStatus");
  const result = await submitToSheet("rsvp", formDataToObject(form), status);
  if (result.ok) {
    form.reset();
    status.textContent = "Confirmación recibida. Nos vemos el 12 de junio ✨";
  }
});
