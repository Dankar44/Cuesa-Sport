document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 600);
    });
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  // ===== HEADER SCROLL =====
  const header = document.querySelector('.header');
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ===== MOBILE NAV =====
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:998;opacity:0;visibility:hidden;transition:0.3s;';
  document.body.appendChild(overlay);

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
      const isOpen = nav.classList.contains('active');
      overlay.style.opacity = isOpen ? '1' : '0';
      overlay.style.visibility = isOpen ? 'visible' : 'hidden';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      document.body.style.overflow = '';
    });

    document.querySelectorAll('.nav-dropdown > .nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  }

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== STAGGER CHILDREN =====
  document.querySelectorAll('.stagger').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  // ===== TEXT REVEAL =====
  const textReveals = document.querySelectorAll('.text-reveal');
  const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        textRevealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  textReveals.forEach(el => textRevealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ===== TYPEWRITER =====
  document.querySelectorAll('[data-typewriter]').forEach(el => {
    const text = el.dataset.typewriter;
    el.textContent = '';

    const twObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter(el, text, 0);
          twObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    twObserver.observe(el);
  });

  function typeWriter(el, text, i) {
    if (i <= text.length) {
      el.textContent = text.substring(0, i);
      setTimeout(() => typeWriter(el, text, i + 1), 50);
    }
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav && nav.classList.contains('active')) {
          hamburger.classList.remove('active');
          nav.classList.remove('active');
          overlay.style.opacity = '0';
          overlay.style.visibility = 'hidden';
          document.body.style.overflow = '';
        }
      }
    });
  });

  // ===== BACK TO TOP =====
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== PARALLAX EFFECT =====
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  // ===== NAVBAR ACTIVE LINK =====
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/' && href !== 'index.html') {
      link.classList.add('active');
    }
  });

  // ===== FORM VALIDATION =====
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Mensaje enviado';
        btn.style.background = 'linear-gradient(135deg, #7EC8B4, #5AB89E)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }
    });
  });

  // ===== IMAGE LAZY LOADING =====
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  lazyImages.forEach(img => imgObserver.observe(img));

  // ===== POOL SHOWCASE SCROLL ANIMATION =====
  const poolStages = document.querySelectorAll('.pool-stage');
  const stageTriggered = new Set();

  if (poolStages.length) {
    const poolObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const stage = entry.target;
        const index = Array.from(poolStages).indexOf(stage);

        if (stageTriggered.has(index)) return;

        if (entry.isIntersecting) {
          stageTriggered.add(index);
          poolObserver.unobserve(stage);

          // Phase 1: blueprint appears big and centered (0ms)
          stage.classList.add('phase-1');

          // Phase 2: slides to side + text appears (1.5s)
          setTimeout(() => {
            stage.classList.remove('phase-1');
            stage.classList.add('phase-2');
          }, 1500);

          // Phase 3: crossfade to realistic (3s)
          setTimeout(() => {
            stage.classList.remove('phase-2');
            stage.classList.add('phase-3');
          }, 3000);

          // Done: lock final state (4.5s)
          setTimeout(() => {
            stage.classList.remove('phase-3');
            stage.classList.add('phase-done');
          }, 4500);
        }
      });
    }, { threshold: 0.6, rootMargin: '0px 0px -10% 0px' });

    poolStages.forEach(stage => poolObserver.observe(stage));
  }

  // ===== MISSION/VISION: fallback a imagen si el vídeo no carga =====
  const mvBg = document.querySelector('.mv-bg');
  const mvVideo = document.querySelector('.mv-bg-video');
  if (mvBg && mvVideo) {
    mvVideo.addEventListener('error', () => mvBg.classList.add('mv-bg--fallback'));
    mvVideo.addEventListener('loadeddata', () => mvBg.classList.remove('mv-bg--fallback'));
    const t = setTimeout(() => {
      if (mvVideo.readyState < 2) mvBg.classList.add('mv-bg--fallback');
    }, 3000);
    mvVideo.addEventListener('canplay', () => clearTimeout(t), { once: true });
  }

  // ===== VALORES: carrusel vertical (palabras que se mueven arriba/abajo con flechas) =====
  const valuesTrack = document.getElementById('valuesWordsTrack');
  const valuesDescription = document.getElementById('valuesDescription');
  const valuesPrev = document.getElementById('valuesPrev');
  const valuesNext = document.getElementById('valuesNext');
  const valuesDataEl = document.getElementById('valuesData');

  if (valuesTrack && valuesDescription && valuesDataEl) {
    const items = valuesTrack.querySelectorAll('.values-word-item');
    const total = items.length;
    const barritaThumb = document.querySelector('#valuesBarrita .values-barrita-thumb');

    let activeIndex = 0;
    let data = [];
    try {
      data = JSON.parse(valuesDataEl.textContent || '[]');
    } catch (e) {}

    function getValuesHeights() {
      const isNarrow = window.innerWidth <= 768;
      return { itemHeight: isNarrow ? 48 : 56, rowTop: isNarrow ? 48 : 56 };
    }

    function updateValuesCarousel() {
      const { itemHeight, rowTop } = getValuesHeights();
      const ty = rowTop - activeIndex * itemHeight;
      valuesTrack.style.transform = `translateY(${ty}px)`;
      items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
      if (data[activeIndex]) {
        valuesDescription.textContent = data[activeIndex].description;
      }
      if (barritaThumb) {
        barritaThumb.style.left = (activeIndex * (100 / total)) + '%';
      }
    }

    if (valuesPrev) {
      valuesPrev.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + total) % total;
        updateValuesCarousel();
      });
    }
    if (valuesNext) {
      valuesNext.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % total;
        updateValuesCarousel();
      });
    }

    updateValuesCarousel();
    window.addEventListener('resize', updateValuesCarousel);
  }

});
