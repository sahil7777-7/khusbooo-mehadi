/* ============================================================
   KHUSHBU YADAV — MEHNDI ARTIST PORTFOLIO
   script.js — Interactive Logic & Security Hardening
   ============================================================ */

'use strict';

/* ─── GALLERY DATA (12 Uploaded Artwork Images) ─────────── */
const GALLERY_ITEMS = Object.freeze([
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_10_32 PM.png',
    alt:     'Full-hand Royal Bridal Mehndi Design by Khushbu Yadav',
    title:   'Royal Bridal Full-Hand',
    cat:     'bridal',
    label:   'Bridal',
    size:    'tall'
  },
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_11_07 PM.png',
    alt:     'Intricate Mehndi artistry by Khushbu Yadav',
    title:   'Intricate Mehndi Detail',
    cat:     'traditional',
    label:   'Royal Traditional',
    size:    'standard'
  },
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_11_18 PM.png',
    alt:     'Arabic floral vine Mehndi design by Khushbu Yadav',
    title:   'Arabic Floral Vines',
    cat:     'arabic',
    label:   'Arabic Flow',
    size:    'standard'
  },
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_11_29 PM.png',
    alt:     'Traditional peacock motif Mehndi by Khushbu Yadav',
    title:   'Peacock Heritage Motif',
    cat:     'traditional',
    label:   'Royal Traditional',
    size:    'tall'
  },
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_11_41 PM.png',
    alt:     'Modern minimalist Mehndi by Khushbu Yadav',
    title:   'Modern Geometric Art',
    cat:     'modern',
    label:   'Modern & Minimal',
    size:    'standard'
  },
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_11_52 PM.png',
    alt:     'Engagement ceremony Mehndi design by Khushbu Yadav',
    title:   'Engagement Ceremony Design',
    cat:     'engagement',
    label:   'Engagement',
    size:    'standard'
  },
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_12_03 PM.png',
    alt:     'Festive Mehndi design by Khushbu Yadav',
    title:   'Festive Celebration Art',
    cat:     'festive',
    label:   'Festive',
    size:    'wide'
  },
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_12_15 PM.png',
    alt:     'Arabic back-hand Mehndi design by Khushbu Yadav',
    title:   'Arabic Back-Hand Flow',
    cat:     'arabic',
    label:   'Arabic Flow',
    size:    'tall'
  },
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_15_01 PM.png',
    alt:     'Bridal Mehndi masterpiece by Khushbu Yadav',
    title:   'Bridal Mehndi Masterpiece',
    cat:     'bridal',
    label:   'Bridal',
    size:    'standard'
  },
  {
    src:     'assets/images/ChatGPT Image Aug 23, 2026, 11_15_53 PM.png',
    alt:     'Grand full-set Mehndi design by Khushbu Yadav',
    title:   'Grand Bridal Full-Set',
    cat:     'bridal',
    label:   'Bridal',
    size:    'standard'
  },
  {
    src:     'assets/images/new 1.png',
    alt:     'Bridal Ceremony Illustrations Mehndi Design by Khushbu Yadav',
    title:   'Bridal Ceremony Illustrations',
    cat:     'bridal',
    label:   'Bridal',
    size:    'standard'
  },
  {
    src:     'assets/images/new 2.png',
    alt:     'Karwa Chauth Bridal Hand Mehndi Design by Khushbu Yadav',
    title:   'Karwa Chauth Bridal Hand Design',
    cat:     'festive',
    label:   'Festive',
    size:    'standard'
  }
]);

/* ─── UTILITIES ─────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const pad = n => String(n).padStart(2, '0');

/**
 * Sanitize text strings to prevent Cross-Site Scripting (XSS)
 * @param {string} str - Raw user input string
 * @returns {string} Sanitized string
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')               // Strip HTML tag delimiters
    .replace(/javascript:/gi, '')       // Strip pseudo-protocols
    .replace(/onload|onerror|onclick/gi, '') // Strip common event attributes
    .trim();
}

/* ─── LOADER ────────────────────────────────────────────── */
function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  const minShowTime = 1600;
  const startTime = Date.now();

  function hideLoader() {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, minShowTime - elapsed);

    setTimeout(() => {
      loader.classList.add('loaded');
      document.body.style.overflow = '';
      setTimeout(animateHeroEntrance, 200);
    }, delay);
  }

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader, { once: true });
  }

  document.body.style.overflow = 'hidden';
}

/* ─── PARTICLE CANVAS (Resource-Optimized) ──────────────── */
function initParticles() {
  const canvas = $('#particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  let animId = null;
  let isPaused = false;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x    = Math.random() * W;
      this.y    = Math.random() * H;
      this.r    = Math.random() * 1.8 + 0.4;
      this.vx   = (Math.random() - 0.5) * 0.15;
      this.vy   = -(Math.random() * 0.22 + 0.06);
      this.life = Math.random();
      this.maxLife = Math.random() * 0.45 + 0.25;
      this.color = `rgba(198, 161, 91, ${this.maxLife * 0.7})`;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.life += 0.002;
      if (this.y < -4 || this.life > 1) this.reset();
    }
    draw() {
      const alpha = this.maxLife * Math.sin(this.life * Math.PI);
      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function loop() {
    if (isPaused) return;
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  // Pause loop when document is hidden to conserve CPU/battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isPaused = true;
      if (animId) cancelAnimationFrame(animId);
    } else {
      isPaused = false;
      loop();
    }
  });

  resize();
  particles = Array.from({ length: 45 }, () => new Particle());
  loop();

  window.addEventListener('resize', resize, { passive: true });
}

/* ─── NAVBAR ────────────────────────────────────────────── */
function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobileMenu');
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scroll = window.scrollY;
        navbar.classList.toggle('scrolled', scroll > 50);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  hamburger?.addEventListener('click', () => {
    const open = mobileMenu?.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(Boolean(open)));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  $$('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('open');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  const sections = $$('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('.nav-link[data-nav]').forEach(l => l.classList.remove('active'));
        const active = $$(`.nav-link[href="#${entry.target.id}"]`);
        active.forEach(l => l.classList.add('active'));
      }
    });
  }, { rootMargin: '-30% 0px -30% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ─── CUSTOM CURSOR ─────────────────────────────────────── */
function initCursor() {
  const dot  = $('#cursorDot');
  const ring = $('#cursorRing');
  if (!dot || !ring) return;

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  }, { passive: true });

  (function moveRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(moveRing);
  })();

  const interactives = 'a, button, .gallery-card, .filter-btn, .service-card, .insta-tile, .why-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) ring.classList.add('hovered');
  }, { passive: true });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) ring.classList.remove('hovered');
  }, { passive: true });
}

/* ─── MAGNETIC BUTTONS ──────────────────────────────────── */
function initMagneticButtons() {
  $$('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.22;
      const dy   = (e.clientY - cy) * 0.22;
      el.style.transform = `translate(${dx}px, ${dy}px) scale(1.02)`;
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ─── SCROLL REVEAL (Fail-Safe) ─────────────────────────── */
function initScrollReveal() {
  document.body.classList.add('js-reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('in-view');
        obs.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

  $$('[data-reveal]').forEach(el => observer.observe(el));

  // Fallback timer: ensure all elements become visible
  setTimeout(() => {
    $$('[data-reveal]:not(.in-view)').forEach(el => el.classList.add('in-view'));
  }, 2500);
}

/* ─── HERO ENTRANCE (GSAP) ─────────────────────────────── */
function animateHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    .fromTo('.hero-eyebrow-wrap',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7 }, 0
    )
    .fromTo('.hero-title-line',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.15
    )
    .fromTo('.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }, 0.45
    )
    .fromTo('.hero-actions',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 }, 0.6
    )
    .fromTo('.hero-frame',
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.9 }, 0.2
    )
    .fromTo('.floating-badge',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)' }, 0.8
    );
}

/* ─── 3D TILT ON GALLERY CARDS ──────────────────────────── */
function initTiltEffect() {
  $$('.gallery-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      const rx   = dy * -6;
      const ry   = dx *  6;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02) translateY(-4px)`;
    }, { passive: true });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─── GALLERY ───────────────────────────────────────────── */
let activeFilter  = 'all';
let lightboxIndex = 0;
let filteredItems = [...GALLERY_ITEMS];

function buildGallery() {
  const grid = $('#galleryMasonry');
  if (!grid) return;

  grid.innerHTML = '';

  GALLERY_ITEMS.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className   = 'gallery-card in-view';
    card.dataset.cat = item.cat;
    card.dataset.idx = String(idx);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open: ${item.title}`);

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-img-wrap">
          <img
            src="${encodeURI(item.src)}"
            alt="${item.alt.replace(/"/g, '&quot;')}"
            class="gallery-img"
            loading="lazy"
            decoding="async"
          />
          <div class="card-glow"></div>
        </div>
        <div class="card-overlay">
          <span class="card-tag">${item.label}</span>
          <h3 class="card-title">${item.title}</h3>
          <div class="card-action">
            <span class="view-label">View Full Artwork</span>
            <span class="view-icon">
              <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M4 1h9v9M13 1L1 13"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click',  () => openLightbox(idx));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
    });

    grid.appendChild(card);
  });

  initTiltEffect();
}

/* ─── FILTER BAR ────────────────────────────────────────── */
function initFilter() {
  const buttons = $$('.filter-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter === activeFilter) return;

      activeFilter = filter;
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      applyFilter(filter);
    });
  });
}

function applyFilter(filter) {
  const cards = $$('.gallery-card');
  filteredItems = filter === 'all'
    ? [...GALLERY_ITEMS]
    : GALLERY_ITEMS.filter(it => it.cat === filter);

  cards.forEach(card => {
    const cat = card.dataset.cat;
    const visible = filter === 'all' || cat === filter;
    card.style.display = visible ? '' : 'none';
  });
}

/* ─── LIGHTBOX ──────────────────────────────────────────── */
function openLightbox(globalIdx) {
  const lightbox = $('#lightbox');
  const img      = $('#lbImage');
  if (!lightbox || !img) return;

  const item = GALLERY_ITEMS[globalIdx];
  if (!item) return;

  filteredItems = activeFilter === 'all'
    ? [...GALLERY_ITEMS]
    : GALLERY_ITEMS.filter(it => it.cat === activeFilter);

  lightboxIndex = filteredItems.findIndex(it => it.src === item.src);
  if (lightboxIndex === -1) {
    filteredItems = [...GALLERY_ITEMS];
    lightboxIndex = globalIdx;
  }

  updateLightboxSlide(lightboxIndex);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => $('#lbClose')?.focus(), 50);
}

function updateLightboxSlide(idx, direction) {
  const img     = $('#lbImage');
  const title   = $('#lbTitle');
  const tag     = $('#lbTag');
  const counter = $('#lbCounter');
  if (!img) return;

  const item = filteredItems[idx];
  if (!item) return;

  if (direction) {
    const dx = direction === 'next' ? -30 : 30;
    img.style.transition = 'opacity 0.2s, transform 0.2s';
    img.style.opacity    = '0';
    img.style.transform  = `translateX(${dx}px)`;
  }

  setTimeout(() => {
    img.src          = item.src;
    img.alt          = item.alt;
    if (title) title.textContent = item.title;
    if (tag)   tag.textContent   = item.label;
    if (counter) counter.textContent = `${pad(idx + 1)} / ${pad(filteredItems.length)}`;

    img.style.transition = '';
    img.style.opacity    = '0';
    img.style.transform  = direction === 'next' ? 'translateX(30px)' : direction === 'prev' ? 'translateX(-30px)' : '';

    img.offsetHeight; // reflow

    img.style.transition = 'opacity 0.3s, transform 0.3s';
    img.style.opacity    = '1';
    img.style.transform  = 'translateX(0)';
  }, direction ? 200 : 0);
}

function closeLightbox() {
  const lb = $('#lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function nextSlide() {
  lightboxIndex = (lightboxIndex + 1) % filteredItems.length;
  updateLightboxSlide(lightboxIndex, 'next');
}

function prevSlide() {
  lightboxIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
  updateLightboxSlide(lightboxIndex, 'prev');
}

function initLightbox() {
  $('#lbClose')?.addEventListener('click', closeLightbox);
  $('#lbBackdrop')?.addEventListener('click', closeLightbox);
  $('#lbNext')?.addEventListener('click', nextSlide);
  $('#lbPrev')?.addEventListener('click', prevSlide);

  document.addEventListener('keydown', e => {
    if (!$('#lightbox')?.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  nextSlide();
    if (e.key === 'ArrowLeft')   prevSlide();
  });

  let touchStartX = 0;
  const lb = $('#lightbox');
  lb?.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lb?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx < 0 ? nextSlide() : prevSlide();
    }
  }, { passive: true });
}

/* ─── TESTIMONIAL CAROUSEL ──────────────────────────────── */
function initTestimonials() {
  const track    = $('#testiTrack');
  const dotsWrap = $('#testiDots');
  if (!track) return;

  const cards = $$('.testi-card', track);
  if (cards.length === 0) return;

  let current = 0;
  let timer;

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Review ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap?.appendChild(dot);
  });

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    $$('button', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function advance() { goTo(current + 1); }

  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) dx < 0 ? goTo(current + 1) : goTo(current - 1);
    timer = setInterval(advance, 5000);
  }, { passive: true });

  timer = setInterval(advance, 5000);
}

/* ─── CONTACT FORM (Secure Validation & Submission) ─────── */
function initContactForm() {
  const form    = $('#contactForm');
  const success = $('#formSuccess');
  if (!form) return;

  let isSubmitting = false;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (isSubmitting) return;

    // Honeypot anti-spam check: if bot fills honeypot, reject silently
    const honey = form.querySelector('input[name="_honey"]')?.value;
    if (honey && honey.trim() !== '') {
      return;
    }

    // Input fields
    const nameInput     = form.querySelector('#fullName');
    const phoneInput    = form.querySelector('#phone');
    const emailInput    = form.querySelector('#email');
    const eventInput    = form.querySelector('#eventType');
    const dateInput     = form.querySelector('#eventDate');
    const locationInput = form.querySelector('#location');
    const msgInput      = form.querySelector('#message');

    // Validation checks
    const sanitizedName  = sanitizeInput(nameInput?.value || '');
    const sanitizedPhone = sanitizeInput(phoneInput?.value || '');
    const sanitizedEmail = sanitizeInput(emailInput?.value || '');
    const eventType      = sanitizeInput(eventInput?.value || '');
    const eventDate      = sanitizeInput(dateInput?.value || '');
    const locationVal    = sanitizeInput(locationInput?.value || '');
    const messageVal     = sanitizeInput(msgInput?.value || '');

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!sanitizedEmail || !emailRegex.test(sanitizedEmail)) {
      emailInput?.focus();
      return;
    }

    if (!sanitizedName || sanitizedName.length < 2) {
      nameInput?.focus();
      return;
    }

    if (!sanitizedPhone || sanitizedPhone.length < 7) {
      phoneInput?.focus();
      return;
    }

    isSubmitting = true;
    const submitBtn = form.querySelector('[type="submit"]');
    const textSpan  = submitBtn?.querySelector('.btn-text');
    if (textSpan) textSpan.textContent = 'Sending Request…';
    if (submitBtn) submitBtn.disabled = true;

    // Prepare clean payload
    const formData = new FormData();
    formData.append('Full Name', sanitizedName);
    formData.append('Phone Number', sanitizedPhone);
    formData.append('Email', sanitizedEmail);
    formData.append('Event Type', eventType);
    formData.append('Event Date', eventDate);
    if (locationVal) formData.append('Location', locationVal);
    if (messageVal) formData.append('Message', messageVal);
    formData.append('_subject', 'New Mehndi Appointment Booking – Khushbu Yadav');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok || res.status === 200 || res.redirected) {
        form.style.display = 'none';
        if (success) {
          success.classList.add('show');
          success.setAttribute('aria-hidden', 'false');
        }
      } else {
        throw new Error('Network error during form submission');
      }
    } catch {
      // Fallback: standard POST without throwing uncaught errors
      form.submit();
    } finally {
      isSubmitting = false;
    }
  });
}

/* ─── SMOOTH ANCHOR SCROLL ──────────────────────────────── */
function initAnchorScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const navH   = $('#navbar')?.offsetHeight || 75;
      const offset = el.getBoundingClientRect().top + window.scrollY - navH - 10;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}

/* ─── INITIALIZE ─────────────────────────────────────────── */
function init() {
  initLoader();
  initParticles();
  initNavbar();
  initCursor();
  initMagneticButtons();
  initScrollReveal();
  buildGallery();
  initFilter();
  initLightbox();
  initTestimonials();
  initContactForm();
  initAnchorScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
