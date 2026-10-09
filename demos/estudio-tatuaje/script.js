const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const form = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

document.querySelectorAll('.hero .reveal').forEach((element) => element.classList.add('is-visible'));

const closeMenu = () => {
  mobileNav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
};

menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 16), { passive: true });

const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-backdrop');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let parallaxFrame = null;

const updateParallax = () => {
  parallaxFrame = null;
  if (reduceMotion.matches || window.innerWidth < 768 || !heroImage) return;
  const distance = Math.max(0, Math.min(window.scrollY, hero.offsetHeight));
  heroImage.style.transform = `translate3d(0, ${distance * 0.08}px, 0)`;
};

window.addEventListener('scroll', () => {
  if (parallaxFrame === null) parallaxFrame = requestAnimationFrame(updateParallax);
}, { passive: true });
window.addEventListener('resize', updateParallax, { passive: true });
updateParallax();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

if (window.location.hash) {
  const linkedSection = document.querySelector(window.location.hash);
  linkedSection?.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const idea = new FormData(form).get('idea').trim();
  const message = `Hola, me gustaría consultar un tatuaje.\n\nMi idea: ${idea}`;
  window.open(`https://wa.me/34600000000?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  formStatus.textContent = 'Abriendo WhatsApp con tu consulta...';
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
