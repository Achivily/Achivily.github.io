const works = window.ACHIVILY_WORKS || [];
const lightbox = document.querySelector(".lightbox");
const panel = document.querySelector(".lightbox-panel");
const image = document.querySelector("[data-lightbox-image]");
const id = document.querySelector("[data-lightbox-id]");
const date = document.querySelector("[data-lightbox-date]");
const mood = document.querySelector("[data-lightbox-mood]");
const title = document.querySelector("[data-lightbox-title]");
const note = document.querySelector("[data-lightbox-note]");
let closeTimer;

function openWork(work) {
  if (!work || !lightbox) return;
  window.clearTimeout(closeTimer);
  id.textContent = work.id;
  date.textContent = work.date;
  mood.textContent = work.mood;
  title.textContent = work.title;
  note.textContent = work.note;
  image.src = work.image;
  image.alt = work.alt;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-locked");
  window.requestAnimationFrame(() => lightbox.classList.add("is-open"));
}

function closeWork() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  document.body.classList.remove("lightbox-locked");
  closeTimer = window.setTimeout(() => {
    lightbox.hidden = true;
    image.removeAttribute("src");
  }, 280);
}

document.querySelectorAll("[data-work-id]").forEach((button) => {
  button.addEventListener("click", () => {
    openWork(works.find((work) => work.id === button.dataset.workId));
  });
});

lightbox?.addEventListener("click", closeWork);
panel?.addEventListener("click", (event) => event.stopPropagation());
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) closeWork();
});
