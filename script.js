const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

const closeMenu = () => {
  mobileNav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
};

menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 16), { passive: true });

document.querySelector('#year').textContent = new Date().getFullYear();

const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.trust-strip, .section-heading, .project-card, .why-grid, .process li, .contact-inner');

if (motionAllowed && 'IntersectionObserver' in window) {
  document.body.classList.add('js-ready');
  revealTargets.forEach((element) => element.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
}

const heroMedia = document.querySelectorAll('.hero-visual img');
let parallaxFrame;

if (motionAllowed && window.matchMedia('(min-width: 768px)').matches) {
  const updateParallax = () => {
    const offset = Math.max(-36, Math.min(36, window.scrollY * 0.06));
    heroMedia.forEach((image, index) => {
      image.style.transform = `translateY(${offset * (index ? 0.55 : 1)}px) scale(1.04)`;
    });
    parallaxFrame = undefined;
  };
  window.addEventListener('scroll', () => {
    if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax);
  }, { passive: true });
  updateParallax();
}

const marqueeTrack = document.querySelector('.marquee-track');

if (marqueeTrack) {
  const firstGroup = marqueeTrack.querySelector('.marquee-group');
  const fillMarquee = () => {
    if (!firstGroup) return;
    const groupWidth = firstGroup.getBoundingClientRect().width;
    while (marqueeTrack.scrollWidth < window.innerWidth + groupWidth * 2) {
      marqueeTrack.append(firstGroup.cloneNode(true));
    }
    marqueeTrack.style.setProperty('--marquee-distance', `-${groupWidth}px`);
  };
  fillMarquee();
}
