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
