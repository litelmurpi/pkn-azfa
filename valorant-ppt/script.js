// ============================================================
//  VALORANT × GOOD SECRETS — Interactive Presentation Engine
// ============================================================

(function () {
  'use strict';

  // --- CONFIG ---
  const TOTAL = 9;
  let current = 1;
  let isTransitioning = false;
  let touchStartY = 0;

  // Slide color map (from design.md)
  const SLIDE_THEMES = {
    1: { bg: '#d3ed6b', text: '#0e0e0e' },
    2: { bg: '#6464ff', text: '#efefef' },
    3: { bg: '#0e0e0e', text: '#efefef' },
    4: { bg: '#d3ed6b', text: '#0e0e0e' },
    5: { bg: '#6464ff', text: '#efefef' },
    6: { bg: '#efefef', text: '#0e0e0e' },
    7: { bg: '#0e0e0e', text: '#efefef' },
    8: { bg: '#d3ed6b', text: '#0e0e0e' },
    9: { bg: '#0e0e0e', text: '#efefef' },
  };

  // --- DOM REFS ---
  const cnt = document.getElementById('cnt');
  const progressBar = document.getElementById('progress-bar');
  const bgOverlay = document.getElementById('bg-overlay');
  const cursorGlow = document.getElementById('cursor-glow');
  const allDots = [...document.querySelectorAll('.nav-dot')];

  // --- HELPERS ---
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  function updateCounter() {
    if (cnt) cnt.textContent = String(current).padStart(2, '0') + ' / ' + String(TOTAL).padStart(2, '0');
    if (progressBar) progressBar.style.width = ((current / TOTAL) * 100) + '%';
    // Update nav dots
    allDots.forEach((d, i) => {
      d.classList.toggle('active', i + 1 === current);
    });
  }

  // --- SMOOTH BACKGROUND TRANSITION ---
  function transitionBackground(n) {
    const theme = SLIDE_THEMES[n];
    if (!theme || !bgOverlay) return;
    bgOverlay.style.backgroundColor = theme.bg;
  }

  // --- SLIDE ELEMENT ANIMATIONS ---
  function animateSlideIn(slideEl) {
    const reveals = $$('.reveal', slideEl);
    reveals.forEach((el, i) => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      // Force reflow
      void el.offsetHeight;
      el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });

    // Animate decorative icons with parallax pop
    const decos = $$('.deco-icon', slideEl);
    decos.forEach((el, i) => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.7) rotate(-10deg)';
      void el.offsetHeight;
      el.style.transition = `opacity 1s ease ${0.3 + i * 0.15}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s`;
      el.style.opacity = '';  // revert to CSS default
      el.style.transform = 'scale(1) rotate(0deg)';
    });

    // Animate glyphs with a pop effect
    const glyphs = $$('.glyph', slideEl);
    glyphs.forEach((el, i) => {
      el.style.transition = 'none';
      el.style.transform = 'scale(0)';
      void el.offsetHeight;
      el.style.transition = `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.4 + i * 0.08}s`;
      el.style.transform = 'scale(1)';
    });
  }

  function animateSlideOut(slideEl) {
    const reveals = $$('.reveal', slideEl);
    reveals.forEach((el) => {
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
    });
  }

  // --- NAVIGATE ---
  function goTo(n, direction) {
    if (n < 1 || n > TOTAL || isTransitioning) return;
    isTransitioning = true;

    const oldSlide = document.getElementById('s' + current);
    const newSlide = document.getElementById('s' + n);
    if (!oldSlide || !newSlide) { isTransitioning = false; return; }

    // Animate out current
    if (oldSlide !== newSlide) {
      animateSlideOut(oldSlide);
    }

    // Transition background
    transitionBackground(n);

    // Scroll to new slide
    current = n;
    updateCounter();

    newSlide.scrollIntoView({ behavior: 'smooth' });

    // Animate in new slide after scroll settles
    setTimeout(() => {
      animateSlideIn(newSlide);
      isTransitioning = false;
    }, 450);
  }

  window.next = function () { goTo(current + 1, 'down'); };
  window.prev = function () { goTo(current - 1, 'up'); };

  // --- KEYBOARD ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault(); window.next();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault(); window.prev();
    }
    if (e.key === 'Home') { e.preventDefault(); goTo(1); }
    if (e.key === 'End') { e.preventDefault(); goTo(TOTAL); }
  });

  // --- WHEEL (debounced) ---
  let wheelTimeout = null;
  document.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (wheelTimeout) return;
    wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 800);
    if (e.deltaY > 30) window.next();
    else if (e.deltaY < -30) window.prev();
  }, { passive: false });

  // --- TOUCH ---
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 60) {
      if (diff > 0) window.next();
      else window.prev();
    }
  }, { passive: true });

  // --- SCROLL SPY (fallback for manual scroll) ---
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
    // Cursor glow
    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      if (!cursorGlow.classList.contains('visible')) cursorGlow.classList.add('visible');
    }
    // Parallax deco icons
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;
    const slide = document.getElementById('s' + current);
    if (!slide) return;
    const decos = $$('.deco-icon', slide);
    decos.forEach((el, i) => {
      const depth = (i + 1) * 8;
      el.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
    });
  });

  document.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.classList.remove('visible');
  });

  // --- CARD TILT EFFECT ---
  $$('.card-gs').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // --- GLYPH HOVER PULSE ---
  $$('.glyph').forEach(g => {
    g.addEventListener('mouseenter', () => {
      g.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
      g.style.transform = 'scale(1.2)';
    });
    g.addEventListener('mouseleave', () => {
      g.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      g.style.transform = 'scale(1)';
    });
  });

  // --- NAV PILL SLIDE SELECTOR ---
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
  if (firstSlide) {
    setTimeout(() => animateSlideIn(firstSlide), 300);
  }

})();
