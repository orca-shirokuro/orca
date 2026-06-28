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


// V28: mascot is only mascot-orca-summer / mascot-orca-pair.
// Future mascot images can be added by giving data-category="mascot".
function updateGalleryByCategory(filter){
  const items = [...document.querySelectorAll(".gallery-item")];
  items.forEach(item => {
    const show = filter === "all" || item.dataset.category === filter;
    item.hidden = !show;
    item.style.display = show ? "" : "none";
  });

  const visibleCount = items.filter(item => !item.hidden).length;
  const prev = document.querySelector(".gallery-wrap .prev");
  const next = document.querySelector(".gallery-wrap .next");
  if(prev && next){
    const useSlider = visibleCount > 2;
    prev.style.visibility = useSlider ? "visible" : "hidden";
    next.style.visibility = useSlider ? "visible" : "hidden";
  }
}

document.querySelectorAll(".tabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    updateGalleryByCategory(btn.dataset.filter);
    document.querySelector(".gallery-track")?.scrollTo({left:0, behavior:"smooth"});
  });
});

updateGalleryByCategory(document.querySelector(".tabs button.active")?.dataset.filter || "all");


// ===== V31 WEEKLY SCHEDULE EASY EDIT =====
// 編集する場所：data/schedule.json
async function loadWeeklySchedule(){
  const root = document.getElementById("weeklySchedule");
  if(!root) return;

  const fallback = [
    {day:"MON", date:"06/24", time:"おやすみ", title:"OFF", type:"off"},
    {day:"TUE", date:"06/25", time:"22:00", title:"ゲーム配信", type:"game"},
    {day:"WED", date:"06/26", time:"21:00", title:"雑談配信", type:"talk"},
    {day:"THU", date:"06/27", time:"21:00", title:"企画枠", type:"event"},
    {day:"FRI", date:"06/28", time:"22:00", title:"ゲーム配信", type:"game"},
    {day:"SAT", date:"06/29", time:"21:00", title:"メイン配信", type:"main"},
    {day:"SUN", date:"06/30", time:"おやすみ", title:"OFF", type:"off"}
  ];

  let items = fallback;
  try{
    const res = await fetch("data/schedule.json", {cache:"no-store"});
    if(res.ok) items = await res.json();
  }catch(e){}

  const icon = {
    off:"💤",
    game:"🎮",
    talk:"🗣️",
    event:"✨",
    main:"🐋"
  };

  root.innerHTML = items.map(item => `
    <div class="weekly-row ${item.type || ""}">
      <div class="weekly-date">
        <b>${item.day}</b>
        <span>${item.date}</span>
      </div>
      <div class="weekly-info">
        <span class="weekly-time">${icon[item.type] || "🌊"} ${item.time}</span>
        <strong class="weekly-title">${item.title}</strong>
      </div>
    </div>
  `).join("");
}

loadWeeklySchedule();


// ===== V32 NEON / BUBBLE EFFECT =====
const v32Light = document.querySelector(".cursor-light");
window.addEventListener("pointermove", (e) => {
  if(!v32Light) return;
  v32Light.style.left = e.clientX + "px";
  v32Light.style.top = e.clientY + "px";
});

function spawnClickBubbles(x, y){
  const count = 8;
  for(let i = 0; i < count; i++){
    const bubble = document.createElement("span");
    bubble.className = "click-bubble";
    const angle = Math.random() * Math.PI * 2;
    const dist = 26 + Math.random() * 42;
    const up = 22 + Math.random() * 42;
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";
    bubble.style.setProperty("--x", Math.cos(angle) * dist + "px");
    bubble.style.setProperty("--y", (Math.sin(angle) * dist - up) + "px");
    bubble.style.width = bubble.style.height = (6 + Math.random() * 10) + "px";
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 780);
  }
}

document.addEventListener("click", (e) => {
  spawnClickBubbles(e.clientX, e.clientY);
});

// カードやボタンをクリックした時に少し強く光る
document.querySelectorAll(".panel, .btn, .hero-links a, .sns-links a, .tabs button").forEach(el => {
  el.addEventListener("click", () => {
    el.classList.add("flash-glow");
    setTimeout(() => el.classList.remove("flash-glow"), 280);
  });
});


// V34 gallery future-ready slider visibility
function v34GalleryButtonState(){
  const visible = [...document.querySelectorAll(".gallery-item")].filter(item => item.style.display !== "none" && !item.hidden);
  const prev = document.querySelector(".gallery-wrap .prev");
  const next = document.querySelector(".gallery-wrap .next");
  if(prev && next){
    const show = visible.length > 2;
    prev.style.visibility = show ? "visible" : "hidden";
    next.style.visibility = show ? "visible" : "hidden";
  }
}
document.querySelectorAll(".tabs button").forEach(btn=>{
  btn.addEventListener("click",()=>setTimeout(v34GalleryButtonState,30));
});
v34GalleryButtonState();

// ===== V35 FAN KIT / COLLECTION / COUNTER =====
async function loadJson(path,fallback=[]){try{const r=await fetch(path,{cache:"no-store"});if(r.ok)return await r.json()}catch(e){}return fallback}
function renderKitCard(item,locked=false){const b=item.download&&!locked?`<a class="download-btn" href="${item.image}" download>Download PNG</a>`:`<span class="status-badge">${item.status||"VIEW ONLY"}</span>`;return `<article class="kit-card ${locked?"locked-card":""}"><small>${item.category||item.status||""}</small><img class="protected-img" src="${item.image}" alt="${item.title}" draggable="false"><h4>${item.title}</h4>${b}</article>`}
async function loadFanKit(){const [rings,collab,special,zeto]=await Promise.all([loadJson("data/rings.json"),loadJson("data/collab_downloads.json"),loadJson("data/special_collection.json"),loadJson("data/zetoluka_gallery.json")]);const set=(id,arr,lock=false)=>{const el=document.getElementById(id);if(el)el.innerHTML=arr.map(i=>renderKitCard(i,lock)).join("")};set("ringGallery",rings);set("collabDownloads",collab);set("specialCollection",special,true);set("zetolukaGalleryGrid",zeto,true)}
async function addChipenExtra(){const extra=await loadJson("data/chipen_extra.json");const track=document.querySelector(".gallery-track");if(!track)return;extra.forEach(item=>{if(document.querySelector(`img[src="${item.image}"]`))return;const fig=document.createElement("figure");fig.className="gallery-item chii";fig.dataset.category="chii";fig.innerHTML=`<img class="protected-img" src="${item.image}" alt="${item.title}" draggable="false"><figcaption>ちーぺん。</figcaption>`;const m=track.querySelector('.gallery-item[data-category="mascot"]');m?track.insertBefore(fig,m):track.appendChild(fig)})}
function initAquariumCounter(){const t=document.getElementById("todayVisitors"),l=document.getElementById("localVisitors");if(!t||!l)return;const day=new Date().toISOString().slice(0,10),tk=`orca_today_${day}`,lk="orca_local_visits";let tc=Number(localStorage.getItem(tk)||0)+1,lc=Number(localStorage.getItem(lk)||0)+1;localStorage.setItem(tk,tc);localStorage.setItem(lk,lc);t.textContent=String(tc).padStart(3,"0");l.textContent=String(lc).padStart(4,"0");if([10,50,77,100,111,222,500,777,1000].includes(lc))launchKiriban(lc)}
function launchKiriban(n){for(let i=0;i<46;i++){const f=document.createElement("span");f.className="firework";f.style.left=(20+Math.random()*60)+"vw";f.style.top=(18+Math.random()*45)+"vh";f.style.setProperty("--fx",(Math.random()*220-110)+"px");f.style.setProperty("--fy",(Math.random()*220-110)+"px");document.body.appendChild(f);setTimeout(()=>f.remove(),950)}const m=document.createElement("div");m.textContent=`🎉 ${n}回目のご来館！`;m.style.cssText="position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10002;padding:20px 28px;border-radius:18px;background:rgba(0,10,26,.88);color:#fff;font-weight:900;border:1px solid rgba(142,238,255,.65);box-shadow:0 0 40px rgba(0,200,255,.28)";document.body.appendChild(m);setTimeout(()=>m.remove(),2400)}
loadFanKit();addChipenExtra();initAquariumCounter();
