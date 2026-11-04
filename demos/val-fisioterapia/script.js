const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', isOpen); });
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), {threshold:.15});
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
document.querySelectorAll('.service button').forEach(button => button.addEventListener('click', () => document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' })));
document.getElementById('year').textContent = new Date().getFullYear();
