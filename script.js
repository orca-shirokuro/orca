window.addEventListener("load",()=>setTimeout(()=>document.getElementById("preloader")?.classList.add("hide"),650));

const bubbles=document.getElementById("bubbles");
function addBubble(){
 const b=document.createElement("span"); b.className="bubble";
 const s=Math.random()*34+8; b.style.width=s+"px"; b.style.height=s+"px";
 b.style.left=Math.random()*100+"%"; b.style.setProperty("--drift",((Math.random()-.5)*160)+"px");
 b.style.animationDuration=(Math.random()*8+7)+"s"; b.style.opacity=Math.random()*.55+.25;
 bubbles.appendChild(b); setTimeout(()=>b.remove(),16000);
}
for(let i=0;i<34;i++)setTimeout(addBubble,i*120);
setInterval(addBubble,460);

async function loadJSON(path,fallback){try{const r=await fetch(path+"?v="+Date.now());if(!r.ok)throw new Error();return await r.json()}catch(e){return fallback}}
const fallbackNews=[{date:"2026.06.19",tag:"NEWS",text:"白黒オルカ公式サイトを公開しました！"}];
const fallbackSchedule=[{date:"06.20 SAT",time:"21:00",title:"雑談配信",desc:"まったり深海トーク"}];
const fallbackGallery=[{title:"MAIN VISUAL",category:"OFFICIAL ART",src:"assets/orca.png"},{title:"LOGO",category:"BRAND LOGO",src:"assets/logo.png"}];
const fallbackVideos=[{title:"雑談配信｜深海トーク",date:"2026.06.20",duration:"LIVE",url:"https://www.youtube.com/channel/UCW4zQ8kVzc1AtdVZ9xfGdmQ",thumb:"assets/orca.png"}];

loadJSON("data/news.json",fallbackNews).then(items=>newsList.innerHTML=items.map(n=>`<div class="news-item"><small>${n.date}</small><b>${n.tag}</b><p>${n.text}</p></div>`).join(""));
loadJSON("data/schedule.json",fallbackSchedule).then(items=>scheduleList.innerHTML=items.map(s=>`<div class="schedule-item"><small>${s.date}　${s.time}</small><p><b>${s.title}</b><br>${s.desc}</p></div>`).join(""));
loadJSON("data/gallery.json",fallbackGallery).then(items=>galleryGrid.innerHTML=items.map(g=>`<div class="gallery-card"><img src="${g.src}" alt="${g.title}"><span>${g.category}</span></div>`).join(""));
loadJSON("data/videos.json",fallbackVideos).then(items=>movieGrid.innerHTML=items.map(v=>`<a class="movie-card" href="${v.url}" target="_blank"><div class="play">▶</div><img src="${v.thumb}" alt=""><b>${v.title}</b><small>${v.date} / ${v.duration}</small></a>`).join(""));

const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>ob.observe(el));
const navLinks=document.querySelectorAll(".nav a");
window.addEventListener("scroll",()=>{let cur="";document.querySelectorAll("section[id],article[id]").forEach(sec=>{if(sec.getBoundingClientRect().top<160)cur=sec.id});navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur))});
top?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
