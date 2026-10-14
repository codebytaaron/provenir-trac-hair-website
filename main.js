// Trac site: scroll reveals, the timeline fill, the hero price count-up and
// the animated ponytail. No dependencies.
document.documentElement.classList.remove('no-js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Nav border once the page scrolls.
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, {passive: true});

// Reveal sections as they enter the viewport.
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('in');
    if (entry.target.classList.contains('timeline')) {
      entry.target.style.setProperty('--progress', '1');
    }
    observer.unobserve(entry.target);
  }
}, {threshold: 0.18, rootMargin: '0px 0px -40px 0px'});

document.querySelectorAll('.reveal, .timeline, .scan-visual').forEach((el) => observer.observe(el));

// Count the hero price range up from zero.
const counters = document.querySelectorAll('[data-count]');
if (!reduceMotion) {
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    counters.forEach((el) => {
      el.textContent = '$' + Math.round(Number(el.dataset.count) * eased);
    });
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// A ponytail drawn from many strands that ripple gently, like the one in the app.
const pony = document.querySelector('.pony');
if (pony) {
  const NS = 'http://www.w3.org/2000/svg';
  const width = 190, height = 500, count = 23;
  const shades = ['#5a2f1b', '#8a4f2b', '#b9713f', '#d79a5e', '#7a4124'];
  const paths = [];
  for (let i = 0; i < count; i++) {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('stroke', shades[i % shades.length]);
    path.setAttribute('stroke-width', '6.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('fill', 'none');
    pony.appendChild(path);
    paths.push(path);
  }
  const tie = document.createElementNS(NS, 'rect');
  Object.entries({x: width / 2 - 34, y: 4, width: 68, height: 24, rx: 12, fill: '#A8583C', stroke: '#e7a981', 'stroke-width': 2})
    .forEach(([k, v]) => tie.setAttribute(k, v));
  pony.appendChild(tie);

  const draw = (phase) => {
    paths.forEach((path, i) => {
      const spread = (i - (count - 1) / 2) / ((count - 1) / 2);
      let d = '';
      for (let k = 0; k <= 36; k++) {
        const t = k / 36;
        const body = 20 + 46 * Math.sin(Math.min(1, t * 1.5) * Math.PI * 0.5) - 14 * t * t;
        const wave = Math.sin(phase + t * 8 + i * 0.55) * (4 + 15 * t);
        const drift = Math.sin(phase * 0.6 + t * 2.2) * 14 * t;
        const x = width / 2 + spread * body + wave * 0.6 + drift;
        const y = 16 + t * height * (0.93 + 0.07 * Math.cos(i * 1.7));
        d += (k ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
      }
      path.setAttribute('d', d);
    });
  };

  draw(0);
  if (!reduceMotion) {
    let visible = false;
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(pony);
    const loop = (now) => {
      if (visible) draw(now / 330);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// Phone menu.
const menuButton = document.querySelector('.menu-btn');
const menu = document.getElementById('mobile-menu');
const setMenu = (open) => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.hidden = !open;
};
menuButton.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

document.getElementById('year').textContent = new Date().getFullYear();
