const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const indexTrigger = document.querySelector('.studio-index-trigger');
const studioIndex = document.querySelector('.studio-index');
const indexClose = document.querySelector('.index-close');
const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setIndex(open) {
  studioIndex.classList.toggle('is-open', open);
  document.body.classList.toggle('index-open', open);
  studioIndex.setAttribute('aria-hidden', String(!open));
  [menuButton, indexTrigger].forEach((button) => {
    if (button) button.setAttribute('aria-expanded', String(open));
  });
  if (open) indexClose.focus();
}

[menuButton, indexTrigger].filter(Boolean).forEach((button) => button.addEventListener('click', () => setIndex(true)));
indexClose.addEventListener('click', () => setIndex(false));
studioIndex.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setIndex(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setIndex(false); });

document.querySelector('#year').textContent = new Date().getFullYear();
const contactLink = document.querySelector('.contact-link');
contactLink.href = 'https://wa.me/34646201139?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20una%20web%20para%20mi%20negocio';

const revealTargets = document.querySelectorAll('.trust-strip, .section-heading, .project-card, .why-grid, .process li, .contact-inner');
if (motionAllowed && 'IntersectionObserver' in window) {
  document.body.classList.add('js-ready');
  revealTargets.forEach((element) => element.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
}

const heroMedia = document.querySelectorAll('.hero-visual img');
let frame;
function updateScene() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  document.documentElement.style.setProperty('--portfolio-progress', `${progress * 100}%`);
  header.classList.toggle('is-scrolled', window.scrollY > 16);
  if (motionAllowed && window.matchMedia('(min-width: 768px)').matches) {
    const offset = Math.max(-34, Math.min(34, window.scrollY * 0.055));
    heroMedia.forEach((image, index) => {
      image.style.transform = `translate3d(0, ${offset * (index ? .52 : 1)}px, 0) scale(1.04)`;
    });
  }
  frame = undefined;
}
function requestScene() { if (!frame) frame = requestAnimationFrame(updateScene); }
window.addEventListener('scroll', requestScene, { passive:true });
window.addEventListener('resize', requestScene);
requestScene();

const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const firstGroup = marqueeTrack.querySelector('.marquee-group');
  const fillMarquee = () => {
    if (!firstGroup) return;
    const groupWidth = firstGroup.getBoundingClientRect().width;
    while (marqueeTrack.scrollWidth < window.innerWidth + groupWidth * 2) marqueeTrack.append(firstGroup.cloneNode(true));
  };
  fillMarquee();
}
