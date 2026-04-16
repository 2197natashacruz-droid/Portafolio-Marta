/* ═══════════════════════════════════════════════════
   MARTA APABLAZA — PORTFOLIO · scripts.js
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar scroll style ── */
  const nav = document.getElementById('mainNav');

  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ── 2. Smooth scroll on nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile menu if open
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });


  /* ── 3. Mobile menu: lock body scroll when open ── */
  const navMenu = document.getElementById('navMenu');

  navMenu.addEventListener('show.bs.collapse', () => {
    document.body.style.overflow = 'hidden';
  });

  navMenu.addEventListener('hide.bs.collapse', () => {
    document.body.style.overflow = '';
  });


  /* ── 4. Reveal on scroll — varied animations ── */

  // Titles → slide from left
  document.querySelectorAll('.section-label, .section-title').forEach(el => {
    el.classList.add('reveal-left');
  });

  // Body text → fade up
  document.querySelectorAll('.lead-text, .body-text, .hero-quote').forEach(el => {
    el.classList.add('reveal');
  });

  // Info & intl cards → scale in
  document.querySelectorAll('.info-card, .intl-card').forEach(el => {
    el.classList.add('reveal-scale');
  });

  // Project cards → fade up
  document.querySelectorAll('.project-card').forEach(el => {
    el.classList.add('reveal');
  });

  // Skill groups → slide from right
  document.querySelectorAll('.skill-group').forEach(el => {
    el.classList.add('reveal-right');
  });

  // Contact card → scale in
  document.querySelectorAll('.contact-card').forEach(el => {
    el.classList.add('reveal-scale');
  });

  // Shared observer for all reveal types
  const revealClasses = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale'];

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const siblings = [...parent.children].filter(c =>
          revealClasses.some(cls => c.classList.contains(cls))
        );
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.09}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });


  /* ── 5. Timeline staggered reveal ── */
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = [...timelineItems].indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.15}s`;
        entry.target.classList.add('visible');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  timelineItems.forEach(el => timelineObserver.observe(el));


  /* ── 6. Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── 7. Contact form ── */
  const sendBtn = document.getElementById('sendBtn');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const inputs = document.querySelectorAll('.contact-card .custom-input');
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#e06c6c';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });

      if (!valid) return;

      sendBtn.textContent = 'Sending...';
      sendBtn.disabled = true;

      setTimeout(() => {
        sendBtn.textContent = '✓ Message sent';
        sendBtn.style.background = '#2c6e3a';
        sendBtn.style.color = '#fff';

        setTimeout(() => {
          sendBtn.textContent = 'Get in touch';
          sendBtn.style.background = '';
          sendBtn.style.color = '';
          sendBtn.disabled = false;
          inputs.forEach(input => input.value = '');
        }, 3000);
      }, 1200);
    });
  }


  /* ── 8. Project card parallax hover ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      card.style.transform = `translateY(-4px) rotateX(${-y * 0.3}deg) rotateY(${x * 0.3}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
