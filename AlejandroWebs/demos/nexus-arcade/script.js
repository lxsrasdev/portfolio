const selected = { zone: 'Core PC', time: '17:00 - 18:00' };
const portfolioWhatsApp = '34646201139';

const summary = document.querySelector('#booking-summary');
const status = document.querySelector('#booking-status');
const bookingLink = document.querySelector('#booking-link');

function updateBooking() {
  summary.textContent = `${selected.zone} · ${selected.time}`;
  status.textContent = 'LISTO PARA CONTINUAR';
  const text = `Hola, quiero consultar una reserva de ${selected.zone} para la franja ${selected.time}.`;
  bookingLink.href = `https://wa.me/${portfolioWhatsApp}?text=${encodeURIComponent(text)}`;
}

document.querySelectorAll('[data-zone]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-zone]').forEach((item) => item.classList.remove('is-selected'));
    button.classList.add('is-selected');
    selected.zone = button.dataset.zone;
    updateBooking();
  });
});

document.querySelectorAll('[data-time]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-time]').forEach((item) => item.classList.remove('is-selected'));
    button.classList.add('is-selected');
    selected.time = button.dataset.time;
    updateBooking();
  });
});

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.classList.toggle('is-open');
  mobileNav.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.classList.remove('is-open');
  mobileNav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}));

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

updateBooking();
