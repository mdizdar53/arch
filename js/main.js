// ===========================
// HEADER — scroll (sadece ana sayfa)
// ===========================
const header = document.getElementById('header');

if (document.body.classList.contains('page-home')) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ===========================
// MOBİL MENÜ
// ===========================
const burger      = document.getElementById('burger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

burger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

mobileClose.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));

// ===========================
// HERO SLİDESHOW
// ===========================
const slides = document.querySelectorAll('.slide');

if (slides.length > 0) {
  const currentNumEl = document.getElementById('slideCurrentNum');
  const totalNumEl   = document.getElementById('slideTotalNum');
  const counter      = document.getElementById('slideCounter');
  const INTERVAL     = 10000;

  let current = 0;
  if (totalNumEl) totalNumEl.textContent = String(slides.length).padStart(2, '0');

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (currentNumEl) currentNumEl.textContent = String(current + 1).padStart(2, '0');
  }

  let timer = setInterval(() => goTo(current + 1), INTERVAL);

  counter?.addEventListener('click', () => {
    clearInterval(timer);
    goTo(current + 1);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  });
}

// ===========================
// FADE-IN
// ===========================
const fadeEls = document.querySelectorAll('.fade-in');

// Proje kartlarına kademeli gecikme
document.querySelectorAll('.proj-card.fade-in').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

fadeEls.forEach(el => observer.observe(el));

// ===========================
// FORM
// ===========================
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Gönderiliyor...';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 1200);
  });
}
