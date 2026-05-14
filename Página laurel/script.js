/* ===========================
   LAUREL STUDIO — script.js
=========================== */

// --- CUSTOM CURSOR ---
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hide cursor on mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorFollower.style.display = 'none';
  document.body.style.cursor = 'auto';
  document.querySelectorAll('*').forEach(el => el.style.cursor = '');
}

// --- NAV SCROLL ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// --- MOBILE MENU ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- REVEAL ON SCROLL ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Stagger siblings
document.querySelectorAll('.reveal').forEach((el, i) => {
  // Stagger sibling reveals
  const parent = el.parentElement;
  const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
  const sibIndex = siblings.indexOf(el);
  if (sibIndex > 0) {
    el.style.transitionDelay = `${sibIndex * 0.1}s`;
  }
  revealObserver.observe(el);
});

// Trigger hero reveals immediately
setTimeout(() => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
}, 100);

// --- STATS COUNTER ---
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat__num');
      nums.forEach(num => {
        const target = parseInt(num.dataset.target);
        let current = 0;
        const duration = 1800;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          num.textContent = Math.floor(current).toLocaleString('es-CO');
        }, 16);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// --- CART ---
let cartCount = 0;
const cartCountEl = document.querySelector('.cart-count');
const cartToast = document.getElementById('cartToast');
const cartToastText = document.getElementById('cartToastText');
let toastTimeout;

document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    cartCountEl.textContent = cartCount;

    const name = btn.dataset.name;
    cartToastText.textContent = `"${name}" agregado`;
    cartToast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => cartToast.classList.remove('show'), 3000);

    // Bounce the count
    cartCountEl.style.transform = 'scale(1.5)';
    setTimeout(() => cartCountEl.style.transform = 'scale(1)', 200);
    cartCountEl.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});

// --- NEWSLETTER ---
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const btn = newsletterForm.querySelector('button');
    btn.textContent = '¡Listo! 🌿';
    btn.style.background = 'var(--olive-light)';
    input.value = '';
    input.placeholder = 'Te escribiremos pronto';
    setTimeout(() => {
      btn.textContent = 'Suscribirme';
      btn.style.background = '';
      input.placeholder = 'tu@correo.com';
    }, 4000);
  });
}

// --- SMOOTH SCROLL for nav links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- PARALLAX on hero badge ---
window.addEventListener('scroll', () => {
  const badge = document.querySelector('.hero__badge');
  if (badge) {
    const scrolled = window.scrollY;
    badge.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// --- PRODUCT CARD hover sound (visual feedback only) ---
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'border-color 0.3s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});

console.log('%cLaurel Studio 🌿', 'color: #6b7c5c; font-family: Georgia, serif; font-size: 18px; font-style: italic;');
console.log('%cModa Ética Circular — Bogotá', 'color: #8fa07a; font-size: 12px;');
