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

  // ===== CURSOR GLOW (desktop only) =====
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed; width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(126,181,214,0.08) 0%, transparent 70%);
      pointer-events: none; z-index: 0; transition: transform 0.15s ease-out;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  // ===== CARD DECK: carta sale de baraja → sube al stage → despliega texto → cierra → baja =====
  const deckStage = document.getElementById('cardDeckStage');
  const deckCards = document.querySelectorAll('.deck-card');
  const deckDots = document.querySelectorAll('.deck-dot');

  if (deckCards.length && deckStage) {
    let currentDeckIndex = 0;
    let deckTimeout = null;
    let flyingClone = null;
    let deployEl = null;

    const FLY_UP_MS   = 650;
    const DEPLOY_DELAY = 150;
    const HOLD_MS     = 2200;
    const FOLD_MS     = 450;
    const FLY_DOWN_MS = 550;
    const PAUSE_MS    = 700;

    function clearDeck() {
      if (deckTimeout) clearTimeout(deckTimeout);
      deckTimeout = null;
      if (flyingClone) { flyingClone.remove(); flyingClone = null; }
      if (deployEl) { deployEl.remove(); deployEl = null; }
      deckCards.forEach(c => {
        c.classList.remove('deck-card--gone', 'deck-card--staged');
      });
      deckDots.forEach(d => d.classList.remove('deck-dot--active'));
      deckStage.innerHTML = '';
    }

    function highlightDot(index) {
      deckDots.forEach(d => d.classList.remove('deck-dot--active'));
      if (index >= 0 && deckDots[index]) deckDots[index].classList.add('deck-dot--active');
    }

    /** PASO 1: Carta sale de baraja y vuela al stage */
    function step1_flyUp(index) {
      currentDeckIndex = index;
      const card = deckCards[index];
      const cardRect = card.getBoundingClientRect();
      const stageRect = deckStage.getBoundingClientRect();
      const targetLeft = stageRect.left + 40;
      const targetTop = stageRect.top + (stageRect.height / 2) - (cardRect.height / 2);

      card.classList.add('deck-card--gone');
      highlightDot(index);

      flyingClone = card.cloneNode(true);
      flyingClone.classList.remove('deck-card--gone');
      flyingClone.classList.add('deck-card--flying');
      flyingClone.style.cssText = `
        position: fixed;
        left: ${cardRect.left}px;
        top: ${cardRect.top}px;
        width: ${cardRect.width}px;
        height: ${cardRect.height}px;
        margin: 0; z-index: 1000; pointer-events: none;
        transition: left ${FLY_UP_MS}ms cubic-bezier(0.25,0.46,0.45,0.94),
                    top ${FLY_UP_MS}ms cubic-bezier(0.25,0.46,0.45,0.94);
      `;
      document.body.appendChild(flyingClone);

      flyingClone.offsetHeight;
      requestAnimationFrame(() => {
        flyingClone.style.left = targetLeft + 'px';
        flyingClone.style.top = targetTop + 'px';
      });

      deckTimeout = setTimeout(() => step2_placeAndDeploy(index), FLY_UP_MS + 60);
    }

    /** PASO 2: Carta se queda en el stage y despliega texto a la derecha */
    function step2_placeAndDeploy(index) {
      if (flyingClone) { flyingClone.remove(); flyingClone = null; }
      const card = deckCards[index];

      const stagedCard = card.cloneNode(true);
      stagedCard.classList.remove('deck-card--gone');
      stagedCard.classList.add('deck-card--staged');
      stagedCard.style.position = 'relative';
      stagedCard.style.display = 'inline-flex';

      deployEl = document.createElement('div');
      deployEl.className = 'card-deploy-text';
      deployEl.innerHTML = `<div class="card-deploy-text-inner"><h4>${card.dataset.title}</h4><p>${card.dataset.text}</p></div>`;
      stagedCard.appendChild(deployEl);

      deckStage.innerHTML = '';
      deckStage.style.cssText = 'display:flex;align-items:center;padding-left:40px;';
      deckStage.appendChild(stagedCard);

      deckTimeout = setTimeout(() => {
        deployEl.classList.add('is-open');
        deckTimeout = setTimeout(step3_foldText, HOLD_MS);
      }, DEPLOY_DELAY);
    }

    /** PASO 3: Pliega el texto */
    function step3_foldText() {
      if (deployEl) deployEl.classList.remove('is-open');
      deckTimeout = setTimeout(step4_flyDown, FOLD_MS);
    }

    /** PASO 4: Carta vuela de vuelta a su sitio en la baraja */
    function step4_flyDown() {
      const index = currentDeckIndex;
      const card = deckCards[index];
      const cardRect = card.getBoundingClientRect();

      const stagedCard = deckStage.querySelector('.deck-card--staged');
      if (!stagedCard) { step5_landed(); return; }
      const stagedRect = stagedCard.getBoundingClientRect();

      flyingClone = document.createElement('div');
      flyingClone.className = 'deck-card deck-card--flying';
      flyingClone.innerHTML = card.innerHTML;
      flyingClone.style.cssText = `
        position: fixed;
        left: ${stagedRect.left}px;
        top: ${stagedRect.top}px;
        width: ${stagedRect.width}px;
        height: ${stagedRect.height}px;
        margin: 0; z-index: 1000; pointer-events: none;
        transition: left ${FLY_DOWN_MS}ms cubic-bezier(0.25,0.46,0.45,0.94),
                    top ${FLY_DOWN_MS}ms cubic-bezier(0.25,0.46,0.45,0.94),
                    width ${FLY_DOWN_MS}ms ease,
                    height ${FLY_DOWN_MS}ms ease;
      `;
      document.body.appendChild(flyingClone);

      deckStage.innerHTML = '';
      deployEl = null;

      flyingClone.offsetHeight;
      requestAnimationFrame(() => {
        flyingClone.style.left = cardRect.left + 'px';
        flyingClone.style.top = cardRect.top + 'px';
        flyingClone.style.width = cardRect.width + 'px';
        flyingClone.style.height = cardRect.height + 'px';
      });

      deckTimeout = setTimeout(step5_landed, FLY_DOWN_MS + 60);
    }

    /** PASO 5: Carta vuelve a la baraja, pausa, siguiente */
    function step5_landed() {
      if (flyingClone) { flyingClone.remove(); flyingClone = null; }
      deckCards[currentDeckIndex].classList.remove('deck-card--gone');
      highlightDot(-1);
      currentDeckIndex = (currentDeckIndex + 1) % deckCards.length;
      deckTimeout = setTimeout(() => step1_flyUp(currentDeckIndex), PAUSE_MS);
    }

    function startDeckCycle() {
      clearDeck();
      deckTimeout = setTimeout(() => step1_flyUp(0), 1000);
    }

    function goToDeckCard(index) {
      clearDeck();
      step1_flyUp(index);
    }

    deckCards.forEach((card, i) => {
      card.addEventListener('click', () => goToDeckCard(i));
    });

    deckDots.forEach((dot) => {
      dot.addEventListener('click', () => goToDeckCard(parseInt(dot.dataset.index, 10)));
    });

    const deckObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startDeckCycle();
          deckObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    deckObserver.observe(deckStage);
  }

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

});
