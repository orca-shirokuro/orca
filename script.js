window.addEventListener('load',()=>setTimeout(()=>document.getElementById('preloader')?.classList.add('hide'),650));const glow=document.getElementById('cursorGlow');window.addEventListener('mousemove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});const bubbles=document.getElementById('bubbles');function addBubble(){const b=document.createElement('span');b.className='bubble';const s=Math.random()*38+8;b.style.width=s+'px';b.style.height=s+'px';b.style.left=Math.random()*100+'%';b.style.setProperty('--drift',((Math.random()-.5)*180)+'px');b.style.animationDuration=(Math.random()*8+7)+'s';b.style.opacity=Math.random()*.58+.25;bubbles.appendChild(b);setTimeout(()=>b.remove(),16000)}for(let i=0;i<44;i++)setTimeout(addBubble,i*90);setInterval(addBubble,360);async function loadJSON(path,fallback){try{const r=await fetch(path+'?v='+Date.now());if(!r.ok)throw new Error();return await r.json()}catch(e){return fallback}}const fallbackNews=[{date:'2026.06.19',time:'2時間前',tag:'NEWS',text:'白黒オルカ公式サイトを公開しました！'}];const fallbackSchedule=[{date:'06.20 SAT',time:'21:00',title:'雑談配信',desc:'まったり深海トーク'}];const fallbackGallery=[{title:'MAIN VISUAL',category:'OFFICIAL ART',src:'assets/orca.png'},{title:'LOGO',category:'BRAND LOGO',src:'assets/logo.png'}];const fallbackVideos=[{title:'First Movie',date:'COMING SOON',duration:'--:--',url:'https://www.youtube.com/channel/UCW4zQ8kVzc1AtdVZ9xfGdmQ',thumb:'assets/deep-orca.svg'}];loadJSON('data/news.json',fallbackNews).then(items=>newsList.innerHTML=items.map(n=>`<div class="news-item"><small>${n.date} ${n.time||''}</small><b>${n.tag}</b><p>${n.text}</p></div>`).join(''));loadJSON('data/schedule.json',fallbackSchedule).then(items=>scheduleList.innerHTML=items.map(s=>`<div class="schedule-item"><small>${s.date}　${s.time}</small><p><b>${s.title}</b><br>${s.desc}</p></div>`).join(''));loadJSON('data/gallery.json',fallbackGallery).then(items=>galleryGrid.innerHTML=items.map(g=>`<div class="gallery-card"><img src="${g.src}" alt="${g.title}"><span>${g.category}</span></div>`).join(''));loadJSON('data/videos.json',fallbackVideos).then(items=>movieGrid.innerHTML=items.map(v=>`<a class="movie-card" href="${v.url}" target="_blank"><div class="play">▶</div><img src="${v.thumb}" alt=""><b>${v.title}</b><small>${v.date} / ${v.duration}</small></a>`).join(''));const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>ob.observe(el));const navLinks=document.querySelectorAll('nav a');window.addEventListener('scroll',()=>{let cur='';document.querySelectorAll('section[id],article[id]').forEach(sec=>{if(sec.getBoundingClientRect().top<160)cur=sec.id});navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur))});top?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));menu?.addEventListener('click',()=>nav.classList.toggle('open'));
const mainCharacter = document.getElementById('mainCharacter');
const charButtons = document.querySelectorAll('.char-btn');
charButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const next = btn.dataset.char;
    if (!mainCharacter || mainCharacter.src.includes(next)) return;
    mainCharacter.classList.remove('fade-change');
    void mainCharacter.offsetWidth;
    mainCharacter.src = next;
    mainCharacter.classList.add('fade-change');
    charButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});


// ===== V5 EFFECTS =====

// Lightbox for gallery images
(() => {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<button aria-label="閉じる">×</button><img alt="">';
  document.body.appendChild(lightbox);
  const img = lightbox.querySelector('img');
  const close = lightbox.querySelector('button');

  document.addEventListener('click', (e) => {
    const cardImg = e.target.closest('.gallery-card img');
    if (!cardImg) return;
    img.src = cardImg.src;
    lightbox.classList.add('open');
  });

  close.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });
})();

// Countdown
const nextStreamDate = '2026-06-20T21:00:00+09:00';
function updateCountdown(){
  const target = new Date(nextStreamDate).getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / (1000*60*60*24)); diff -= d*(1000*60*60*24);
  const h = Math.floor(diff / (1000*60*60)); diff -= h*(1000*60*60);
  const m = Math.floor(diff / (1000*60)); diff -= m*(1000*60);
  const s = Math.floor(diff / 1000);
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = String(val).padStart(2,'0'); };
  set('cdDays', d); set('cdHours', h); set('cdMinutes', m); set('cdSeconds', s);
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Jellyfish particles
const jellyLayer = document.body;
function addJelly(){
  const j = document.createElement('span');
  j.className = 'jelly';
  j.style.left = Math.random()*100 + '%';
  j.style.bottom = '-90px';
  j.style.opacity = Math.random()*.28 + .08;
  j.style.setProperty('--drift', ((Math.random()-.5)*220)+'px');
  j.style.animationDuration = (Math.random()*20 + 18) + 's';
  j.style.transform = `scale(${Math.random()*.8 + .6})`;
  jellyLayer.appendChild(j);
  setTimeout(()=>j.remove(), 40000);
}
for(let i=0;i<6;i++) setTimeout(addJelly, i*1200);
setInterval(addJelly, 5200);


// ===== V6 ROBUST CHARACTER SWITCH =====
(() => {
  const mainCharacter = document.getElementById("mainCharacter");
  const charButtons = document.querySelectorAll(".char-btn");
  if(!mainCharacter || !charButtons.length) return;

  charButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.char;
      if(!next) return;

      mainCharacter.classList.add("switching");

      setTimeout(() => {
        mainCharacter.src = next;
        if(next.includes("formal")){
          document.body.classList.add("formal-mode");
        }else{
          document.body.classList.remove("formal-mode");
        }

        charButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        setTimeout(() => mainCharacter.classList.remove("switching"), 120);
      }, 180);
    });
  });
})();
