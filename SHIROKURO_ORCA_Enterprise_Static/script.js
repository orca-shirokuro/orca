window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader")?.classList.add("hide"),700));

const bubbleLayer=document.getElementById("bubbleLayer");
function bubble(){
  const b=document.createElement("span");
  b.className="bubble";
  const s=Math.random()*34+8;
  b.style.width=s+"px";b.style.height=s+"px";b.style.left=Math.random()*100+"%";
  b.style.setProperty("--drift",((Math.random()-.5)*160)+"px");
  b.style.animationDuration=(Math.random()*8+7)+"s";
  b.style.opacity=Math.random()*.55+.25;
  bubbleLayer.appendChild(b);
  setTimeout(()=>b.remove(),16000);
}
for(let i=0;i<30;i++)setTimeout(bubble,i*140);
setInterval(bubble,480);

async function loadJSON(path,fallback){try{const r=await fetch(path+"?v="+Date.now());return await r.json()}catch(e){return fallback}}

const fallbackNews=[
{date:"2026.06.19",tag:"NEWS",text:"白黒オルカ公式サイトを公開しました！"},
{date:"2026.06.20",tag:"STREAM",text:"21:00〜 雑談配信予定。飼育員さん集合！"}
];
const fallbackSchedule=[
{date:"06.20（土）",time:"21:00〜",title:"雑談配信 〜まったり深海トーク〜"},
{date:"06.22（月）",time:"22:00〜",title:"ゲーム配信 〜初見さん歓迎〜"}
];
const fallbackGallery=[
{title:"立ち絵",category:"OFFICIAL",src:"assets/orca.png"},
{title:"ロゴ",category:"LOGO",src:"assets/logo.png"}
];
const fallbackVideos=[
{title:"雑談配信｜深海トーク",date:"2026.06.12",duration:"LIVE",url:"https://www.youtube.com/channel/UCW4zQ8kVzc1AtdVZ9xfGdmQ",thumb:"assets/orca.png"}
];

loadJSON("data/news.json",fallbackNews).then(items=>{
  document.getElementById("newsList").innerHTML=items.map(n=>`<div class="news-item"><small>${n.date}</small><b>${n.tag}</b><p>${n.text}</p></div>`).join("");
});
loadJSON("data/schedule.json",fallbackSchedule).then(items=>{
  document.getElementById("scheduleList").innerHTML=items.map(s=>`<div class="schedule-item"><small>${s.date}　${s.time}</small><p>${s.title}</p></div>`).join("");
});
loadJSON("data/gallery.json",fallbackGallery).then(items=>{
  document.getElementById("galleryGrid").innerHTML=items.map(g=>`<div class="gallery-card"><img src="${g.src}" alt="${g.title}"><span>${g.category}</span></div>`).join("");
});
loadJSON("data/videos.json",fallbackVideos).then(items=>{
  document.getElementById("movieGrid").innerHTML=items.map(v=>`<a class="movie-card" href="${v.url}" target="_blank"><div class="play">▶</div><img src="${v.thumb}" alt=""><b>${v.title}</b><small>${v.date} / ${v.duration}</small></a>`).join("");
});

const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>ob.observe(el));

const navLinks=document.querySelectorAll(".nav a");
window.addEventListener("scroll",()=>{
 let cur="";
 document.querySelectorAll("section[id],article[id]").forEach(sec=>{if(sec.getBoundingClientRect().top<160)cur=sec.id});
 navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur));
});
document.getElementById("topBtn")?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
document.getElementById("menuBtn")?.addEventListener("click",()=>document.getElementById("nav")?.classList.toggle("open"));
