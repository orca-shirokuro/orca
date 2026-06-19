window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loading")?.classList.add("hide"), 700);
});

const bubbles = document.getElementById("bubbles");
function createBubble(){
  if(!bubbles) return;
  const b = document.createElement("span");
  b.className = "bubble";
  const size = Math.random() * 34 + 8;
  b.style.width = `${size}px`;
  b.style.height = `${size}px`;
  b.style.left = `${Math.random() * 100}%`;
  b.style.setProperty("--drift", `${(Math.random() - .5) * 160}px`);
  b.style.animationDuration = `${Math.random() * 8 + 7}s`;
  b.style.opacity = Math.random() * .55 + .25;
  bubbles.appendChild(b);
  setTimeout(() => b.remove(), 16000);
}
for(let i=0;i<26;i++) setTimeout(createBubble, i * 170);
setInterval(createBubble, 520);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const navLinks = document.querySelectorAll(".nav a");
window.addEventListener("scroll", () => {
  let current = "";
  document.querySelectorAll("section[id], article[id]").forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if(top < 160) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
});

document.getElementById("topBtn")?.addEventListener("click", () => {
  window.scrollTo({top:0, behavior:"smooth"});
});

document.getElementById("menuBtn")?.addEventListener("click", () => {
  document.getElementById("nav")?.classList.toggle("open");
});

