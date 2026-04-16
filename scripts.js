/* ═══════════════════════════════════════════════════
   MARTA APABLAZA — PORTFOLIO · scripts.js
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar: cambia estilo al hacer scroll ── */
  const nav = document.getElementById('mainNav');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ── 2. Scroll suave ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });

      const navCollapse = document.getElementById('navMenu');
      if (navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });


  /* ── 3. Reveal on scroll — animaciones variadas ── */

  // Sección labels y títulos: slide desde la izquierda
  document.querySelectorAll('.section-label, .section-title').forEach(el => {
    el.classList.add('reveal-left');
  });

  // Lead text y body text: fade up estándar
  document.querySelectorAll('.lead-text, .body-text').forEach(el => {
    el.classList.add('reveal');
  });

  // Info cards: scale fade
  document.querySelectorAll('.info-card').forEach(el => {
    el.classList.add('reveal-scale');
  });

  // Project cards: fade up con stagger
  document.querySelectorAll('.project-card').forEach(el => {
    el.classList.add('reveal');
  });

  // Skill groups: slide desde la derecha
  document.querySelectorAll('.skill-group').forEach(el => {
    el.classList.add('reveal-right');
  });

  // Contact card: scale
  document.querySelectorAll('.contact-card').forEach(el => {
    el.classList.add('reveal-scale');
  });

  // Observer genérico para todas las variantes
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const revealClasses = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale'];
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


  /* ── 4. Timeline: reveal con animación escalonada ── */
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const allItems = [...timelineItems];
        const idx = allItems.indexOf(entry.target);
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


  /* ── 5. Nav link activo según sección visible ── */
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


  /* ── 6. Formulario de contacto ── */
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

      sendBtn.textContent = 'Enviando...';
      sendBtn.disabled = true;

      setTimeout(() => {
        sendBtn.textContent = '✓ Mensaje enviado';
        sendBtn.style.background = '#2c6e3a';
        sendBtn.style.color = '#fff';

        setTimeout(() => {
          sendBtn.textContent = 'Enviar mensaje';
          sendBtn.style.background = '';
          sendBtn.style.color = '';
          sendBtn.disabled = false;
          inputs.forEach(input => input.value = '');
        }, 3000);
      }, 1200);
    });
  }


  /* ── 7. Hover parallax en project cards ── */
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
