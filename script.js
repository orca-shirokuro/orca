const track = document.querySelector(".gallery-track");
document.querySelector(".next")?.addEventListener("click", () => track.scrollBy({left: 320, behavior:"smooth"}));
document.querySelector(".prev")?.addEventListener("click", () => track.scrollBy({left: -320, behavior:"smooth"}));

document.querySelectorAll(".tabs button").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".gallery-item").forEach(item=>{
      item.style.display = filter === "all" || item.classList.contains(filter) ? "grid" : "none";
    });
    track.scrollTo({left:0,behavior:"smooth"});
  });
});

// casual save deterrent for gallery
document.querySelectorAll("#gallery img").forEach(img=>{
  img.addEventListener("contextmenu", e => e.preventDefault());
  img.setAttribute("draggable","false");
});


// V26 cursor light
const cursorLight = document.querySelector(".cursor-light");
window.addEventListener("pointermove", (e) => {
  if (!cursorLight) return;
  cursorLight.style.left = e.clientX + "px";
  cursorLight.style.top = e.clientY + "px";
});

// V26 costume switch
const heroOrca = document.getElementById("heroOrca");
document.querySelectorAll(".costume-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!heroOrca) return;
    document.querySelectorAll(".costume-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    heroOrca.classList.add("switching");
    setTimeout(() => {
      heroOrca.src = btn.dataset.src;
      heroOrca.classList.remove("switching");
    }, 180);
  });
});

// V26 stronger casual save deterrent
document.addEventListener("contextmenu", (e) => {
  if (e.target.closest("img, .gallery-item, .goods-card, .unit-card, .movie-card")) {
    e.preventDefault();
  }
});
document.addEventListener("dragstart", (e) => {
  if (e.target.closest("img")) e.preventDefault();
});
document.addEventListener("selectstart", (e) => {
  if (e.target.closest("#gallery, #goods, #unit, #movies, .hero-visual")) e.preventDefault();
});
document.querySelectorAll("img").forEach(img => {
  img.setAttribute("draggable", "false");
});


// V27 gallery category fix
const galleryTrackV27 = document.querySelector(".gallery-track");
document.querySelectorAll(".tabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".gallery-item").forEach(item => {
      const category = item.dataset.category;
      const show = filter === "all" || category === filter;
      item.hidden = !show;
      item.style.display = show ? "" : "none";
    });

    if (galleryTrackV27) {
      galleryTrackV27.scrollTo({ left: 0, behavior: "smooth" });
    }
  });
});
