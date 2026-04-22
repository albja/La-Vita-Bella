/* ============================================
   La Vita è Bella — script.js
   ============================================ */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
if (navbar) {
  // Don't add scroll behavior on inner pages (already has .scrolled)
  const isInnerPage = navbar.classList.contains('scrolled');
  if (!isInnerPage) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

/* ---- Mobile burger menu ---- */
const burger = document.getElementById('burger');
const navMobile = document.getElementById('nav-mobile');
if (burger && navMobile) {
  burger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (navMobile.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  // Close on link click
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMobile.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

/* ---- Scroll animations (Intersection Observer) ---- */
const animatedEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
if (animatedEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  animatedEls.forEach(el => observer.observe(el));
}

/* ---- Menu tabs (accueil) ---- */
const tabs = document.querySelectorAll('.menu-tab');
const cards = document.querySelectorAll('.menu-card[data-cat]');

if (tabs.length && cards.length) {
  // Show first category on load
  const firstCat = tabs[0]?.dataset.target;
  showCategory(firstCat);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showCategory(tab.dataset.target);
    });
  });

  function showCategory(cat) {
    cards.forEach((card, i) => {
      if (card.dataset.cat === cat) {
        card.style.display = 'block';
        card.style.animationDelay = `${i * 0.05}s`;
        card.style.animation = 'none';
        void card.offsetWidth; // reflow
        card.style.animation = '';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

/* ---- Highlight today in hours table ---- */
const hoursTable = document.getElementById('hours-table');
if (hoursTable) {
  const today = new Date().getDay(); // 0=Sun, 1=Mon, ...
  const rows = hoursTable.querySelectorAll('tr[data-day]');
  rows.forEach(row => {
    if (parseInt(row.dataset.day) === today) {
      row.classList.add('today');
    }
  });
}

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
