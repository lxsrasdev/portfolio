const menuButton = document.querySelector('.menu-button');
const navTrigger = document.querySelector('.nav-trigger');
const navigation = document.querySelector('.immersive-nav');
const closeButton = document.querySelector('.nav-close');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setNavigation(open) {
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('nav-open', open);
  navigation.setAttribute('aria-hidden', String(!open));
  [menuButton, navTrigger].forEach((button) => {
    if (button) button.setAttribute('aria-expanded', String(open));
  });
  menuButton.classList.toggle('open', open);
  menuButton.setAttribute('aria-label', open ? 'Cerrar menu' : 'Abrir menu');
  if (open) closeButton.focus();
}

[menuButton, navTrigger].filter(Boolean).forEach((button) => button.addEventListener('click', () => setNavigation(true)));
closeButton.addEventListener('click', () => setNavigation(false));
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setNavigation(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setNavigation(false); });

const reveal = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  reveal.forEach((item) => observer.observe(item));
} else { reveal.forEach((item) => item.classList.add('visible')); }

const parallaxItems = document.querySelectorAll('[data-parallax]');
let animationFrame = null;
function updateScrollScene() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  document.documentElement.style.setProperty('--scroll-progress', `${progress * 100}%`);
  document.documentElement.style.setProperty('--hero-line', String(Math.min(window.scrollY / (window.innerHeight * .72), 1)));
  if (!reduceMotion) {
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0);
      const rect = item.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
      item.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  }
  animationFrame = null;
}
function requestSceneUpdate() {
  if (!animationFrame) animationFrame = requestAnimationFrame(updateScrollScene);
}
window.addEventListener('scroll', requestSceneUpdate, { passive:true });
window.addEventListener('resize', requestSceneUpdate);
requestSceneUpdate();

if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 5;
      const rotateX = ((event.clientY - rect.top) / rect.height - .5) * -5;
      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}
