// Mobile Menu (រក្សាតែមួយកន្លែងប៉ុណ្ណឹង)
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Portfolio Lightbox - គាំទ្រ hidden images ក្នុង group
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentImages = [];
let currentIndex = 0;

function showImage() {
  if (currentImages[currentIndex]) {
    lightboxImg.src = currentImages[currentIndex].src;
    lightboxImg.alt = currentImages[currentIndex].alt || "Project image";
  }
}

if (gallery) {
  gallery.addEventListener("click", (e) => {
    // ចុចលើ gallery-item ឬ img ក៏បាន
    const item = e.target.closest(".gallery-item") || e.target.closest("img");
    if (!item) return;

    const group = item.dataset.group;
    if (!group) return;

    // យករូបទាំងអស់ដែលមាន data-group ដូចគ្នា (រួមទាំង hidden)
    currentImages = Array.from(
      document.querySelectorAll(`[data-group="${group}"]`),
    ).filter((el) => el.tagName === "IMG");

    // បើចុចលើ preview (gallery-item) ចាប់ផ្តើមពី index 0
    // បើចុចលើ img ធម្មតា យក index របស់វា
    currentIndex = currentImages.indexOf(item.querySelector("img") || item);

    if (currentIndex === -1) currentIndex = 0; // ការពារករណីមិនរកឃើញ

    showImage();
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
  });
}

// បិទ lightbox
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    currentImages = [];
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
      currentImages = [];
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage();
  });
}

// Keyboard navigation (optional ប៉ុន្តែស្រួលប្រើ)
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("hidden")) return;
  if (e.key === "ArrowLeft") prevBtn?.click();
  if (e.key === "ArrowRight") nextBtn?.click();
  if (e.key === "Escape") closeBtn?.click();
});
