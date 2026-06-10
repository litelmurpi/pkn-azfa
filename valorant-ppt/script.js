// ============================================================
//  VALORANT TACTICAL — Interactive Presentation Engine
//  Based on design-valorant.md guidelines
// ============================================================

(function () {
  'use strict';

  const TOTAL = 8;
  let current = 1;
  let isTransitioning = false;
  let touchStartY = 0;

  // Slide color map — Valorant palette
  const SLIDE_THEMES = {
    1: { bg: '#0F1923' },  // dark
    2: { bg: '#0F1923' },  // dark
    3: { bg: '#0F1923' },  // dark
    4: { bg: '#FF4655' },  // red
    5: { bg: '#0F1923' },  // dark
    6: { bg: '#ECE8E1' },  // warm ivory
    7: { bg: '#0F1923' },  // dark
    8: { bg: '#0F1923' },  // dark
  };

  // Cursor glow color per slide
  const GLOW_COLORS = {
    1: 'rgba(255,70,85,.08)',
    2: 'rgba(0,212,170,.06)',
    3: 'rgba(255,70,85,.06)',
    4: 'rgba(15,25,35,.1)',
    5: 'rgba(255,70,85,.08)',
    6: 'rgba(15,25,35,.06)',
    7: 'rgba(255,70,85,.08)',
    8: 'rgba(255,70,85,.08)',
  };

  // DOM refs
  const cnt = document.getElementById('cnt');
  const progressBar = document.getElementById('progress-bar');
  const bgOverlay = document.getElementById('bg-overlay');
  const cursorGlow = document.getElementById('cursor-glow');
  const allDots = [...document.querySelectorAll('.nav-dot')];

  function $$(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  function updateCounter() {
    if (cnt) cnt.textContent = String(current).padStart(2, '0') + ' / ' + String(TOTAL).padStart(2, '0');
    if (progressBar) progressBar.style.width = ((current / TOTAL) * 100) + '%';
    allDots.forEach((d, i) => d.classList.toggle('active', i + 1 === current));
  }

  function transitionBackground(n) {
    const theme = SLIDE_THEMES[n];
    if (!theme || !bgOverlay) return;
    bgOverlay.style.backgroundColor = theme.bg;
    // Update cursor glow color
    if (cursorGlow && GLOW_COLORS[n]) {
      cursorGlow.style.background = `radial-gradient(circle, ${GLOW_COLORS[n]} 0%, transparent 70%)`;
    }
  }

  // --- SLIDE ANIMATIONS ---
  function animateSlideIn(slideEl) {
    const reveals = $$('.reveal', slideEl);
    reveals.forEach((el, i) => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      void el.offsetHeight;
      el.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });

    // Deco icons
    const decos = $$('.deco-icon', slideEl);
    decos.forEach((el, i) => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.7) rotate(-10deg)';
      void el.offsetHeight;
      el.style.transition = `opacity 1s ease ${0.3 + i * 0.15}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s`;
      el.style.opacity = '';
      el.style.transform = 'scale(1) rotate(0deg)';
    });

    // Slash accents — draw in
    const slashes = $$('.slash-accent', slideEl);
    slashes.forEach((el, i) => {
      el.style.transition = 'none';
      el.style.width = '0';
      el.style.opacity = '0';
      void el.offsetHeight;
      el.style.transition = `width 0.8s cubic-bezier(0.77,0,0.175,1) ${0.5 + i * 0.2}s, opacity 0.4s ease ${0.5 + i * 0.2}s`;
      el.style.width = '120px';
      el.style.opacity = '.15';
    });

    // Glyphs pop
    const glyphs = $$('.glyph', slideEl);
    glyphs.forEach((el, i) => {
      el.style.transition = 'none';
      el.style.transform = 'scale(0)';
      void el.offsetHeight;
      el.style.transition = `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.4 + i * 0.06}s`;
      el.style.transform = 'scale(1)';
    });
  }

  function animateSlideOut(slideEl) {
    $$('.reveal', slideEl).forEach(el => {
      el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
    });
  }

  // --- NAVIGATION ---
  function goTo(n) {
    if (n < 1 || n > TOTAL || isTransitioning) return;
    isTransitioning = true;

    const oldSlide = document.getElementById('s' + current);
    const newSlide = document.getElementById('s' + n);
    if (!oldSlide || !newSlide) { isTransitioning = false; return; }

    if (oldSlide !== newSlide) animateSlideOut(oldSlide);
    transitionBackground(n);
    current = n;
    updateCounter();
    newSlide.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      animateSlideIn(newSlide);
      isTransitioning = false;
    }, 400);
  }

  window.next = function () { goTo(current + 1); };
  window.prev = function () { goTo(current - 1); };

  // --- KEYBOARD ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); window.next(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); window.prev(); }
    if (e.key === 'Home') { e.preventDefault(); goTo(1); }
    if (e.key === 'End') { e.preventDefault(); goTo(TOTAL); }
  });

  // --- WHEEL ---
  let wheelTimeout = null;
  document.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (wheelTimeout) return;
    wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 800);
    if (e.deltaY > 30) window.next();
    else if (e.deltaY < -30) window.prev();
  }, { passive: false });

  // --- TOUCH ---
  document.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 60) { diff > 0 ? window.next() : window.prev(); }
  }, { passive: true });

  // --- SCROLL SPY ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isTransitioning) {
        const n = parseInt(entry.target.id.replace('s', ''));
        if (n && n !== current) {
          current = n;
          updateCounter();
          transitionBackground(n);
          animateSlideIn(entry.target);
        }
      }
    });
  }, { threshold: 0.55 });

  for (let i = 1; i <= TOTAL; i++) {
    const el = document.getElementById('s' + i);
    if (el) observer.observe(el);
  }

  // --- MOUSE PARALLAX + CURSOR GLOW ---
  document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      if (!cursorGlow.classList.contains('visible')) cursorGlow.classList.add('visible');
    }
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;
    const slide = document.getElementById('s' + current);
    if (!slide) return;
    $$('.deco-icon', slide).forEach((el, i) => {
      const depth = (i + 1) * 8;
      el.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
    });
  });

  document.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.classList.remove('visible');
  });

  // --- CARD TILT ---
  $$('.card-tac').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
    card.addEventListener('mouseenter', () => { card.style.transition = 'transform 0.1s ease'; });
  });

  // --- GLYPH HOVER ---
  $$('.glyph').forEach(g => {
    g.addEventListener('mouseenter', () => {
      g.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
      g.style.transform = 'scale(1.15) rotate(5deg)';
    });
    g.addEventListener('mouseleave', () => {
      g.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      g.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // --- NAV DOTS ---
  $$('.nav-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const n = parseInt(dot.dataset.slide);
      if (n) goTo(n);
    });
  });

  // --- INIT ---
  updateCounter();
  transitionBackground(1);
  const firstSlide = document.getElementById('s1');
  if (firstSlide) setTimeout(() => animateSlideIn(firstSlide), 300);

})();
