/* =========================
   FOOTER YEAR
========================= */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* =========================
   MOBILE NAV
========================= */
const toggleBtn = document.querySelector(".nav__toggle");
const nav = document.querySelector("[data-nav]");

toggleBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggleBtn.setAttribute("aria-expanded", open);
});

/* =========================
   THEME TOGGLE (localStorage)
========================= */
const themeBtn = document.querySelector("[data-theme-toggle]");
const root = document.documentElement;

function setTheme(theme){
  if(theme === "light"){
    root.setAttribute("data-theme","light");
  }else{
    root.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
if(savedTheme) setTheme(savedTheme);

themeBtn?.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  setTheme(isLight ? "dark" : "light");
});

/* =========================
   GALLERY FILTER
========================= */
const filterButtons = document.querySelectorAll("[data-filter]");
const thumbs = document.querySelectorAll(".thumb");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filter = btn.dataset.filter;
    thumbs.forEach(t => {
      t.style.display =
        filter === "all" || t.dataset.category === filter
          ? "flex"
          : "none";
    });
  });
});

/* =========================
   MODAL / LIGHTBOX
========================= */
const modal = document.querySelector("[data-modal]");
const modalImg = document.querySelector("[data-modal-img]");
const closeEls = document.querySelectorAll("[data-close]");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    const src = thumb.dataset.full;
    if (!src) return;
    modalImg.src = src;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
  });
});

closeEls.forEach(el => {
  el.addEventListener("click", closeModal);
});

function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  modalImg.src = "";
}

document.addEventListener("keydown", e => {
  if(e.key === "Escape") closeModal();
});