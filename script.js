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


// ===== V7 VTUBER GALLERY / TITLELESS =====
loadJSON('data/gallery.json', []).then(items => {
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;
  grid.innerHTML = items.map((g, i) => `
    <button class="gallery-card titleless" data-index="${i}" type="button">
      <img src="${g.src}" alt="">
      <span>🔍</span>
    </button>
  `).join('');

  window.__orcaGalleryItems = items;
});

// Better gallery lightbox with left/right
(() => {
  if(document.querySelector('.orca-lightbox')) return;
  const lb = document.createElement('div');
  lb.className = 'orca-lightbox';
  lb.innerHTML = `
    <button class="lb-close" type="button">×</button>
    <button class="lb-prev" type="button">‹</button>
    <img alt="">
    <button class="lb-next" type="button">›</button>
  `;
  document.body.appendChild(lb);

  let index = 0;
  const img = lb.querySelector('img');
  const show = (i) => {
    const items = window.__orcaGalleryItems || [];
    if(!items.length) return;
    index = (i + items.length) % items.length;
    img.src = items[index].src;
    lb.classList.add('open');
  };

  document.addEventListener('click', e => {
    const card = e.target.closest('.gallery-card');
    if(card && card.dataset.index !== undefined){
      show(Number(card.dataset.index));
    }
  });
  lb.querySelector('.lb-close').addEventListener('click', () => lb.classList.remove('open'));
  lb.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
  lb.addEventListener('click', e => { if(e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') lb.classList.remove('open');
    if(e.key === 'ArrowLeft') show(index - 1);
    if(e.key === 'ArrowRight') show(index + 1);
  });
})();


// ===== GALLERY FIXED / TITLELESS LIGHTBOX =====
async function orcaLoadGalleryFixed(){
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;

  let items = [];
  try{
    const res = await fetch('data/gallery.json', {cache:'no-store'});
    items = await res.json();
  }catch(e){
    items = [
      {src:'assets/orca.png'},
      {src:'assets/orca-formal.png'}
    ];
  }

  window.__orcaGalleryItems = items;

  grid.innerHTML = items.map((g,i)=>`
    <button class="gallery-card titleless" type="button" data-index="${i}">
      <img src="${g.src}" alt="">
    </button>
  `).join('');
}

orcaLoadGalleryFixed();

(() => {
  if(document.querySelector('.orca-lightbox')) return;

  const lb = document.createElement('div');
  lb.className = 'orca-lightbox';
  lb.innerHTML = `
    <button class="lb-close" type="button">×</button>
    <button class="lb-prev" type="button">‹</button>
    <img alt="">
    <button class="lb-next" type="button">›</button>
  `;
  document.body.appendChild(lb);

  let index = 0;
  const img = lb.querySelector('img');

  function show(i){
    const items = window.__orcaGalleryItems || [];
    if(!items.length) return;
    index = (i + items.length) % items.length;
    img.src = items[index].src;
    lb.classList.add('open');
  }

  document.addEventListener('click', e => {
    const card = e.target.closest('.gallery-card');
    if(card && card.dataset.index !== undefined){
      show(Number(card.dataset.index));
    }
  });

  lb.querySelector('.lb-close').addEventListener('click', () => lb.classList.remove('open'));
  lb.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(index + 1));

  lb.addEventListener('click', e => {
    if(e.target === lb) lb.classList.remove('open');
  });

  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') lb.classList.remove('open');
    if(e.key === 'ArrowLeft') show(index - 1);
    if(e.key === 'ArrowRight') show(index + 1);
  });
})();


// ===== V8 GALLERY TABS + SLIDER =====
(() => {
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;

  let galleryItems = [];
  let currentFilter = 'all';

  async function loadGalleryV8(){
    try{
      const res = await fetch('data/gallery.json', {cache:'no-store'});
      galleryItems = await res.json();
    }catch(e){
      galleryItems = [
        {src:'assets/orca.png', category:'official'},
        {src:'assets/orca-formal.png', category:'official'}
      ];
    }
    renderGalleryV8();
  }

  function filteredItems(){
    return currentFilter === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === currentFilter);
  }

  function renderGalleryV8(){
    const items = filteredItems();
    window.__orcaGalleryItems = items;
    grid.innerHTML = items.map((g, i) => `
      <button class="gallery-card titleless" type="button" data-index="${i}">
        <img src="${g.src}" alt="">
      </button>
    `).join('');
    grid.scrollTo({left:0, behavior:'smooth'});
  }

  document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentFilter = tab.dataset.filter;
      document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderGalleryV8();
    });
  });

  document.querySelector('.gallery-prev')?.addEventListener('click', () => {
    grid.scrollBy({left: -grid.clientWidth * .85, behavior:'smooth'});
  });

  document.querySelector('.gallery-next')?.addEventListener('click', () => {
    grid.scrollBy({left: grid.clientWidth * .85, behavior:'smooth'});
  });

  if(!document.querySelector('.orca-lightbox')){
    const lb = document.createElement('div');
    lb.className = 'orca-lightbox';
    lb.innerHTML = `
      <button class="lb-close" type="button">×</button>
      <button class="lb-prev" type="button">‹</button>
      <img alt="">
      <button class="lb-next" type="button">›</button>
    `;
    document.body.appendChild(lb);

    let index = 0;
    const img = lb.querySelector('img');

    function show(i){
      const items = window.__orcaGalleryItems || [];
      if(!items.length) return;
      index = (i + items.length) % items.length;
      img.src = items[index].src;
      lb.classList.add('open');
    }

    document.addEventListener('click', e => {
      const card = e.target.closest('.gallery-card');
      if(card && card.dataset.index !== undefined){
        show(Number(card.dataset.index));
      }
    });

    lb.querySelector('.lb-close').addEventListener('click', () => lb.classList.remove('open'));
    lb.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
    lb.addEventListener('click', e => { if(e.target === lb) lb.classList.remove('open'); });

    document.addEventListener('keydown', e => {
      if(!lb.classList.contains('open')) return;
      if(e.key === 'Escape') lb.classList.remove('open');
      if(e.key === 'ArrowLeft') show(index - 1);
      if(e.key === 'ArrowRight') show(index + 1);
    });
  }

  loadGalleryV8();
})();


// ===== V9 FINAL GALLERY: TABS / SLIDER / NO PAGE JUMP =====
(() => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  let itemsAll = [];
  let currentFilter = 'all';
  let currentIndex = 0;

  const fallback = [
    {src:'assets/orca.png', category:'official'},
    {src:'assets/orca-formal.png', category:'official'}
  ];

  const getItems = () => currentFilter === 'all'
    ? itemsAll
    : itemsAll.filter(item => item.category === currentFilter);

  function render(){
    const items = getItems();
    window.__orcaGalleryItems = items;
    currentIndex = 0;

    grid.innerHTML = items.map((item, index) => `
      <button class="gallery-card titleless" type="button" data-gallery-index="${index}" aria-label="ギャラリー画像を拡大">
        <img src="${item.src}" alt="" loading="lazy">
      </button>
    `).join('');

    requestAnimationFrame(() => grid.scrollTo({left:0, behavior:'smooth'}));
  }

  async function init(){
    try{
      const res = await fetch('data/gallery.json', {cache:'no-store'});
      if(!res.ok) throw new Error('gallery json not found');
      itemsAll = await res.json();
    }catch(e){
      itemsAll = fallback;
    }
    render();
  }

  // Tabs
  document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      currentFilter = tab.dataset.filter || 'all';
      document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      render();
    });
  });

  // Slider arrows
  document.querySelector('.gallery-prev')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    grid.scrollBy({left: -grid.clientWidth * 0.9, behavior:'smooth'});
  });

  document.querySelector('.gallery-next')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    grid.scrollBy({left: grid.clientWidth * 0.9, behavior:'smooth'});
  });

  // Lightbox
  let lightbox = document.querySelector('.orca-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'orca-lightbox';
    lightbox.innerHTML = `
      <button class="lb-close" type="button" aria-label="閉じる">×</button>
      <button class="lb-prev" type="button" aria-label="前へ">‹</button>
      <img alt="">
      <button class="lb-next" type="button" aria-label="次へ">›</button>
    `;
    document.body.appendChild(lightbox);
  }

  const lbImg = lightbox.querySelector('img');

  function showLightbox(index){
    const items = getItems();
    if (!items.length) return;

    currentIndex = (index + items.length) % items.length;
    lbImg.src = items[currentIndex].src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Capture phase prevents any old href="#" / anchor handler from moving the page
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (!card) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const index = Number(card.dataset.galleryIndex ?? card.dataset.index ?? 0);
    showLightbox(index);
  }, true);

  lightbox.querySelector('.lb-close')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.querySelector('.lb-prev')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    showLightbox(currentIndex - 1);
  });

  lightbox.querySelector('.lb-next')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    showLightbox(currentIndex + 1);
  });

  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') showLightbox(currentIndex - 1);
    if(e.key === 'ArrowRight') showLightbox(currentIndex + 1);
  });

  init();
})();


// ===== V10 GALLERY CREDIT SEPARATION + SAVE DETERRENCE =====
(() => {
  const credit = document.getElementById("galleryCredit");

  function updateGalleryCredit(filter){
    if(!credit) return;
    if(filter === "chiipen" || filter === "mascot"){
      credit.style.display = "block";
    }else{
      credit.style.display = "none";
    }
  }

  // Initial state: ALL / official do not show chiipen credit
  updateGalleryCredit("all");

  // Watch gallery tab clicks and show credit only for chiipen + mascot
  document.querySelectorAll(".gallery-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      updateGalleryCredit(tab.dataset.filter || "all");
    });
  });

  // Prevent easy right-click save inside gallery/lightbox
  document.addEventListener("contextmenu", (e) => {
    if(
      e.target.closest(".gallery-card") ||
      e.target.closest(".orca-lightbox")
    ){
      e.preventDefault();
    }
  });

  // Prevent easy drag-save inside gallery/lightbox
  document.addEventListener("dragstart", (e) => {
    if(
      e.target.closest(".gallery-card") ||
      e.target.closest(".orca-lightbox")
    ){
      e.preventDefault();
    }
  });

  // Prevent long-press context menu on touch devices as much as possible
  document.addEventListener("touchstart", (e) => {
    if(
      e.target.closest(".gallery-card") ||
      e.target.closest(".orca-lightbox")
    ){
      e.target.style.webkitTouchCallout = "none";
      e.target.style.userSelect = "none";
    }
  }, {passive:true});
})();


// ===== V11 IMAGE SAVE PROTECTION =====

// ギャラリー・拡大表示の右クリック保存を防ぐ
document.addEventListener("contextmenu", (e) => {
  if (
    e.target.closest(".gallery-card") ||
    e.target.closest(".orca-lightbox")
  ) {
    e.preventDefault();
  }
});

// ドラッグ保存を防ぐ
document.addEventListener("dragstart", (e) => {
  if (
    e.target.closest(".gallery-card") ||
    e.target.closest(".orca-lightbox")
  ) {
    e.preventDefault();
  }
});

// タッチ長押し対策
document.addEventListener("touchstart", (e) => {
  if (
    e.target.closest(".gallery-card") ||
    e.target.closest(".orca-lightbox")
  ) {
    e.target.style.webkitTouchCallout = "none";
    e.target.style.userSelect = "none";
  }
}, { passive:true });
