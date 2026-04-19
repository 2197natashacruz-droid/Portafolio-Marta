/* ═══════════════════════════════════════════════════
   MARTA APABLAZA — PORTFOLIO · scripts.js
═══════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   MOBILE MENU — runs immediately, no wrapper needed
   because script tag is at end of body
───────────────────────────────────────── */
(function () {
  var hamburgerBtn    = document.getElementById('hamburgerBtn');
  var mobileOverlay   = document.getElementById('mobileOverlay');
  var overlayBackdrop = document.getElementById('overlayBackdrop');
  var overlayClose    = document.getElementById('overlayClose');

  if (!hamburgerBtn || !mobileOverlay) {
    console.warn('Mobile menu elements not found');
    return;
  }

  function openMenu() {
    mobileOverlay.classList.add('is-open');
    hamburgerBtn.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileOverlay.classList.remove('is-open');
    hamburgerBtn.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openMenu);

  if (overlayClose)    overlayClose.addEventListener('click', closeMenu);
  if (overlayBackdrop) overlayBackdrop.addEventListener('click', closeMenu);

  // Close on any menu link click
  var mobileLinks = mobileOverlay.querySelectorAll('a');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });
}());


/* ─────────────────────────────────────────
   REST — waits for full DOM
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  /* 1. Navbar scroll style */
  var nav = document.getElementById('mainNav');
  if (nav) {
    function handleNavScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  /* 2. Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var navHeight = nav ? nav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* 3. Reveal on scroll */
  document.querySelectorAll('.section-label, .section-title').forEach(function(el) {
    el.classList.add('reveal-left');
  });
  document.querySelectorAll('.lead-text, .body-text, .hero-quote').forEach(function(el) {
    el.classList.add('reveal');
  });
  document.querySelectorAll('.info-card, .intl-card').forEach(function(el) {
    el.classList.add('reveal-scale');
  });
  document.querySelectorAll('.project-card').forEach(function(el) {
    el.classList.add('reveal');
  });
  document.querySelectorAll('.skill-group').forEach(function(el) {
    el.classList.add('reveal-right');
  });
  document.querySelectorAll('.contact-card').forEach(function(el) {
    el.classList.add('reveal-scale');
  });

  var revealClasses = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale'];

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var parent = entry.target.parentElement;
      var siblings = Array.from(parent.children).filter(function(c) {
        return revealClasses.some(function(cls) { return c.classList.contains(cls); });
      });
      var idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 0.09) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function(el) {
    revealObserver.observe(el);
  });

  /* 4. Timeline stagger */
  var timelineItems = document.querySelectorAll('.timeline-item');
  var timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var idx = Array.from(timelineItems).indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 0.15) + 's';
      entry.target.classList.add('visible');
      timelineObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  timelineItems.forEach(function(el) { timelineObserver.observe(el); });

  /* 5. Active nav on scroll */
  var sections  = document.querySelectorAll('section[id]');
  var navLinks  = document.querySelectorAll('.nav-link');
  var mobileLinks = document.querySelectorAll('.mobile-overlay__link');

  var sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.getAttribute('id');
      navLinks.forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
      mobileLinks.forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' });
  sections.forEach(function(s) { sectionObserver.observe(s); });

  /* 6. Contact form */
  var sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      var inputs = document.querySelectorAll('.contact-card .custom-input');
      var valid = true;
      inputs.forEach(function(input) {
        var empty = !input.value.trim();
        input.style.borderColor = empty ? '#e06c6c' : '';
        if (empty) valid = false;
      });
      if (!valid) return;

      sendBtn.textContent = 'Sending…';
      sendBtn.disabled = true;
      setTimeout(function() {
        sendBtn.textContent = '✓ Message sent';
        sendBtn.style.background = '#2c6e3a';
        sendBtn.style.color = '#fff';
        setTimeout(function() {
          sendBtn.textContent = 'Get in touch';
          sendBtn.style.background = '';
          sendBtn.style.color = '';
          sendBtn.disabled = false;
          inputs.forEach(function(input) { input.value = ''; });
        }, 3000);
      }, 1200);
    });
  }

  /* 7. Project cards parallax hover */
  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
      var y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
      card.style.transform = 'translateY(-4px) rotateX(' + (-y * 0.3) + 'deg) rotateY(' + (x * 0.3) + 'deg)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });

});
