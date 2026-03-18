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

    nav.addEventListener('click', function(e) {
      if (window.innerWidth > 768) return;
      var trigger = e.target.closest('.nav-dropdown > .nav-link');
      if (!trigger) return;
      var dropdown = trigger.closest('.nav-dropdown');
      if (!dropdown) return;
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
  }

  // ===== MAPA: pill Categorías → panel lateral (solo móvil) =====
  document.querySelectorAll('.map-categories-pill').forEach(function(pill) {
    pill.addEventListener('click', function() {
      var section = this.closest('.map-section--full');
      if (!section) return;
      section.classList.add('map-filters-open');
      this.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
    });
  });
  document.querySelectorAll('.map-search-drawer-close, .map-filters-overlay').forEach(function(el) {
    el.addEventListener('click', function() {
      var section = this.closest('.map-section--full');
      if (!section) return;
      section.classList.remove('map-filters-open');
      var pill = section.querySelector('.map-categories-pill');
      if (pill) pill.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    });
  });

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

  // ===== VENTAJAS HUB: centrado → slide left → pops → texto derecha =====
  const vhub = document.getElementById('ventajasHub');
  const vhubInfo = document.getElementById('ventajasHubPanelInner');
  const vhubPills = document.querySelectorAll('.vhub-pill');

  if (vhub && vhubInfo) {
    let vhubStarted = false;

    function vhubSetActive(idx) {
      vhubPills.forEach(function(p, i) { p.classList.toggle('is-active', i === idx); });
      var pill = vhubPills[idx];
      if (!pill) return;
      vhubInfo.innerHTML =
        '<div class="vhub-info-icon"><i class="fas ' + (pill.dataset.icon || 'fa-star') + '"></i></div>' +
        '<div class="vhub-info-body"><h3>' + (pill.dataset.title || '') + '</h3><p>' + (pill.dataset.text || '') + '</p></div>';
    }

    function vhubRun() {
      if (vhubStarted) return;
      vhubStarted = true;

      // Fase 1: slide a la izquierda (0.8s)
      setTimeout(function() { vhub.classList.add('phase-slide'); }, 200);

      // Fase 2: pops (empieza tras slide)
      setTimeout(function() { vhub.classList.add('phase-pop'); }, 1100);

      // Fase 3: float + texto (tras pops ~0.6s delay + 6 pills)
      setTimeout(function() {
        vhub.classList.remove('phase-pop');
        vhub.classList.add('phase-float');
        vhub.classList.add('phase-text');
        vhubSetActive(0);
      }, 2200);
    }

    vhubPills.forEach(function(pill, i) {
      pill.addEventListener('click', function() { vhubSetActive(i); });
      pill.addEventListener('mouseenter', function() { vhubSetActive(i); });
    });

    var vhubObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          vhubRun();
          vhubObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    vhubObs.observe(vhub);
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

          const isMobile = window.innerWidth <= 768;
          const delay2 = isMobile ? 0 : 1500;
          const delay3 = isMobile ? 0 : 1900;
          const delayDone = isMobile ? 0 : 2700;

          // Phase 2: slides to side + text appears
          setTimeout(() => {
            stage.classList.remove('phase-1');
            stage.classList.add('phase-2');
          }, delay2);

          // Phase 3: crossfade to realistic
          setTimeout(() => {
            stage.classList.remove('phase-2');
            stage.classList.add('phase-3');
          }, delay3);

          // Done: lock final state
          setTimeout(() => {
            stage.classList.remove('phase-3');
            stage.classList.add('phase-done');
          }, delayDone);
        }
      });
    }, {
      threshold: window.innerWidth <= 768 ? 0.2 : 0.6,
      rootMargin: '0px 0px -10% 0px'
    });

    poolStages.forEach(stage => poolObserver.observe(stage));
  }

  // ===== POMPA CHAT + búsqueda en el sitio (gratis, open source, sin backend) =====
  (function initChatBubble() {
    // Índice del sitio: path, title, description, keywords. Puedes usar window.CUESA_SITE_INDEX si cargas js/site-index.js antes.
    const SITE_INDEX = window.CUESA_SITE_INDEX || [
      { path: 'index.html', title: 'Inicio', description: 'Empresa líder en construcción, mantenimiento y reforma de piscinas en Madrid.', keywords: 'inicio portada presupuesto' },
      { path: 'pages/piscinas-infinity.html', title: 'Piscinas Infinity', description: 'Piscinas infinity en Madrid: el agua se funde con el horizonte.', keywords: 'piscinas infinitas infinity borde infinito horizonte sin límite efecto infinito' },
      { path: 'pages/piscinas-desbordante.html', title: 'Piscinas Desbordantes', description: 'Piscinas desbordantes: el agua rebosa por el borde.', keywords: 'desbordante desbordantes rebosamiento borde rebosa' },
      { path: 'pages/piscinas-forma.html', title: 'Piscinas con Forma', description: 'Piscinas con forma: riñón, laguna, diseños orgánicos.', keywords: 'forma riñón laguna diseño libre orgánico personalizada' },
      { path: 'pages/construccion-piscinas.html', title: 'Construcción de Piscinas', description: 'Construcción de piscinas en Madrid.', keywords: 'construcción construir obra nueva' },
      { path: 'pages/reforma-piscinas.html', title: 'Reforma de Piscinas', description: 'Reforma y renovación de piscinas. Revestimientos, filtración, climatización.', keywords: 'reforma renovar arreglar renovación' },
      { path: 'pages/mantenimiento-piscinas.html', title: 'Mantenimiento de Piscinas', description: 'Mantenimiento de piscinas 365 días al año en Madrid.', keywords: 'mantenimiento mantener limpieza cuidado' },
      { path: 'pages/climatizacion-piscinas.html', title: 'Climatización de Piscinas', description: 'Climatización: bomba de calor, paneles solares, cobertores.', keywords: 'climatización calentar agua temperatura bomba calor' },
      { path: 'pages/revestimiento.html', title: 'Tipos de Revestimiento', description: 'Gresite, azulejo y gres porcelánico.', keywords: 'revestimiento gresite azulejo porcelánico liner' },
      { path: 'pages/servicios.html', title: 'Servicios', description: 'Construcción, mantenimiento, reforma y climatización.', keywords: 'servicios qué hacemos oferta' },
      { path: 'pages/proyectos.html', title: 'Proyectos', description: 'Proyectos: piscinas privadas, públicas, reformas en Madrid.', keywords: 'proyectos galería obras realizadas' },
      { path: 'pages/galeria.html', title: 'Galería', description: 'Galería de proyectos de piscinas.', keywords: 'galería fotos imágenes' },
      { path: 'pages/ubicaciones.html', title: 'Ubicaciones', description: 'Mapa de proyectos y sede en Madrid.', keywords: 'ubicaciones mapa dónde estamos sede Fuenlabrada' },
      { path: 'pages/sectores.html', title: 'Sectores', description: 'Chalets, comunidades, polideportivos, obras públicas.', keywords: 'sectores chalet comunidad pública polideportivo' },
      { path: 'pages/sobre-nosotros.html', title: 'Sobre Nosotros', description: 'Historia de Cuesa Sport desde 1986.', keywords: 'sobre nosotros empresa historia quiénes somos' },
      { path: 'pages/blog.html', title: 'Blog', description: 'Consejos y guías sobre piscinas.', keywords: 'blog consejos guías artículos' },
      { path: 'pages/contacto.html', title: 'Contacto', description: 'Contacto. Teléfono 91 600 20 54. Presupuesto gratuito.', keywords: 'contacto teléfono email presupuesto escribir llamar' }
    ];

    function normalize(str) {
      return (str || '').toLowerCase()
        .normalize('NFD').replace(/\u0301/g, '').replace(/\u0300/g, '')
        .replace(/[^\w\sáéíóúüñ]/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function getHref(path) {
      const inPages = (typeof window !== 'undefined' && window.location.pathname.indexOf('pages/') >= 0);
      if (path === 'index.html') return inPages ? '../index.html' : 'index.html';
      return inPages ? path.replace('pages/', '') : path;
    }

    // Respuesta especial: ya tiene claro medidas (ej. "quiero piscina 7x3 m") → contacto con guiño
    function isPiscinaConMedidas(text) {
      const n = normalize(text);
      const tieneMedidas = /\d+\s*[x×]\s*\d+/.test(text) || /\d+\s*metros?\s*(x|por)\s*\d+/.test(n);
      const quierePiscina = /quiero\s+(una\s+)?piscina|piscina\s+de\s+\d|piscina\s+\d|x\d+\s*metros?|medidas?\s*de\s*piscina|ya\s+tengo\s+claro|tengo\s+claro\s+las\s+medidas/.test(n);
      return tieneMedidas || (quierePiscina && (tieneMedidas || /\d/.test(text)));
    }

    // ~100 preguntas tipo que suelen hacer en una web de piscinas → página recomendada
    const PREGUNTAS = [
      { path: 'pages/contacto.html', title: 'Contacto', phrases: [
        'quiero presupuesto', 'presupuesto gratuito', 'pedir presupuesto', 'solicitar presupuesto', 'pedir cita', 'contactar', 'hablar con alguien', 'teléfono', 'email', 'donde os encontrais', 'dirección', 'escribiros', 'llamar', 'consultar precio', 'cotización', 'quiero que me llamen', 'información sin compromiso', 'ya sé qué piscina quiero', 'tengo claro las medidas', 'piscina de 7x3', 'piscina 8x4', 'piscina 10x5', 'medidas de mi piscina', 'quiero una piscina de', 'piscina rectangular 6x3', 'presupuesto para piscina'
      ]},
      { path: 'pages/piscinas-infinity.html', title: 'Piscinas Infinity', phrases: [
        'piscinas infinitas', 'quiero saber de piscinas infinitas', 'qué es una piscina infinity', 'piscina sin borde', 'borde infinito', 'efecto infinito', 'precio piscina infinity', 'cuánto cuesta piscina infinitas', 'piscina horizonte', 'diseño infinity', 'agua sin límite', 'piscina que se funde con el horizonte', 'infinity pool', 'piscina tipo infinity', 'reforma a infinity', 'convertir a infinity'
      ]},
      { path: 'pages/piscinas-desbordante.html', title: 'Piscinas Desbordantes', phrases: [
        'piscinas desbordantes', 'desbordante', 'agua que rebosa', 'piscina rebose', 'overflow', 'piscina desborde', 'borde desbordante', 'rebosamiento', 'efecto desbordante', 'cuánto cuesta desbordante'
      ]},
      { path: 'pages/piscinas-forma.html', title: 'Piscinas con Forma', phrases: [
        'piscina forma riñón', 'piscina riñón', 'forma laguna', 'diseño libre', 'piscina personalizada forma', 'piscina orgánica', 'forma irregular', 'piscina laguna', 'diseño a medida forma', 'piscina con forma', 'formas de piscina'
      ]},
      { path: 'pages/construccion-piscinas.html', title: 'Construcción de Piscinas', phrases: [
        'construir piscina', 'construcción piscina nueva', 'quiero construir una piscina', 'obra nueva', 'cuánto cuesta construir piscina', 'construcción desde cero', 'piscina de obra', 'hacer una piscina', 'instalación nueva', 'piscina nueva casa', 'cuánto tarda construir'
      ]},
      { path: 'pages/reforma-piscinas.html', title: 'Reforma de Piscinas', phrases: [
        'reformar piscina', 'reforma piscina', 'renovar piscina', 'arreglar piscina', 'arreglo piscina', 'cambiar revestimiento', 'renovación completa', 'reforma integral', 'arreglar fugas', 'piscina vieja arreglar', 'modernizar piscina', 'actualizar piscina',
        'reformais piscinas', 'reformáis piscinas', 'reformais de piscinas', 'reformáis de piscinas', 'reforman piscinas', 'reforma de piscinas', 'hola reformais', 'hola reformáis', 'buenas reformais piscinas'
      ]},
      { path: 'pages/mantenimiento-piscinas.html', title: 'Mantenimiento de Piscinas', phrases: [
        'mantenimiento piscina', 'mantener piscina', 'limpieza piscina', 'servicio mantenimiento', 'cada cuánto limpiar', 'quién mantiene piscinas', 'contratar mantenimiento', 'mantenimiento anual', 'limpieza profesional', 'cuidado piscina', 'tratamiento del agua', 'productos mantenimiento'
      ]},
      { path: 'pages/climatizacion-piscinas.html', title: 'Climatización de Piscinas', phrases: [
        'climatizar piscina', 'calentar piscina', 'calefacción piscina', 'bomba calor', 'alargar temporada baño', 'agua caliente piscina', 'calentar agua piscina', 'piscina climatizada', 'uso invierno', 'paneles solares piscina', 'costo calentar piscina'
      ]},
      { path: 'pages/revestimiento.html', title: 'Tipos de Revestimiento', phrases: [
        'revestimiento piscina', 'gresite azulejo', 'qué revestimiento poner', 'gres porcelánico', 'liner', 'acabado interior', 'revestir piscina', 'gresite o azulejo', 'mejor revestimiento', 'cambiar gresite', 'azulejos piscina', 'revestimiento gresite'
      ]},
      { path: 'pages/servicios.html', title: 'Servicios', phrases: [
        'qué servicios ofrecéis', 'qué hacéis', 'servicios piscinas', 'qué hacen', 'qué ofertas tenéis', 'servicio integral', 'qué trabajos hacéis'
      ]},
      { path: 'pages/proyectos.html', title: 'Proyectos', phrases: [
        'ver proyectos', 'proyectos realizados', 'obras realizadas', 'ejemplos piscinas', 'qué proyectos tenéis', 'proyectos destacados', 'explorar proyectos'
      ]},
      { path: 'pages/galeria.html', title: 'Galería', phrases: [
        'galería fotos', 'fotos piscinas', 'imágenes proyectos', 'ver fotos', 'galería de obras', 'fotos de piscinas construidas', 'ver galería', 'muro de proyectos'
      ]},
      { path: 'pages/ubicaciones.html', title: 'Ubicaciones', phrases: [
        'dónde estáis', 'mapa', 'sede', 'Fuenlabrada', 'zona de actuación', 'trabajáis en Madrid', 'dónde os encontráis', 'ubicación empresa', 'mapa proyectos', 'donde trabajan', 'localidades Madrid',
        'construís en', 'construis en', 'construyen en', 'habéis hecho piscinas en', 'habeis hecho piscinas en', 'hecho piscinas en', 'piscinas en majadahonda', 'piscinas en boadilla', 'piscinas en las rozas', 'piscinas en pozuelo', 'piscinas en getafe', 'piscinas en mostoles', 'piscinas en alcorcon', 'piscinas en torrelodones', 'piscinas en villalba', 'piscinas en fuenlabrada', 'piscinas en pinto', 'piscinas en leganes', 'piscinas en madrid', 'piscinas en alcobendas', 'piscinas en san sebastian de los reyes', 'trabajáis en', 'trabajais en', 'actuáis en', 'actuais en', 'en majadahonda', 'en boadilla', 'en las rozas', 'en pozuelo', 'en getafe', 'en mostoles', 'en alcorcon', 'en torrelodones', 'en villalba', 'en qué zona', 'en qué localidad', 'qué pueblos', 'en qué sitios actuáis', 'donde construis', 'dónde construís'
      ]},
      { path: 'pages/sectores.html', title: 'Sectores', phrases: [
        'piscina chalet', 'piscina comunidad', 'polideportivo', 'obra pública', 'colegios', 'gimnasios', 'piscina comunidad vecinos', 'piscina pública', 'piscina privada', 'sectores', 'trabajáis con comunidades', 'piscina municipal'
      ]},
      { path: 'pages/sobre-nosotros.html', title: 'Sobre Nosotros', phrases: [
        'quiénes sois', 'historia empresa', 'desde cuándo', 'experiencia', 'sobre vosotros', 'conoceros', 'quién es Cuesa Sport', 'años de experiencia', 'empresa de confianza'
      ]},
      { path: 'pages/blog.html', title: 'Blog', phrases: [
        'blog', 'consejos piscinas', 'guías', 'normativa piscinas', 'artículos', 'consejos mantenimiento', 'información piscinas', 'leer sobre piscinas'
      ]},
      { path: 'index.html', title: 'Inicio', phrases: [
        'inicio', 'portada', 'página principal', 'empresa piscinas Madrid', 'Cuesa Sport qué es'
      ]}
    ];

    function findFromPreguntas(query) {
      const nq = normalize(query);
      let best = { entry: null, len: 0 };
      PREGUNTAS.forEach(function(entry) {
        entry.phrases.forEach(function(phrase) {
          const np = normalize(phrase);
          if (np.length >= 2 && nq.indexOf(np) >= 0 && np.length > best.len) {
            best = { entry: entry, len: np.length };
          }
        });
      });
      return best.entry ? { path: best.entry.path, title: best.entry.title } : null;
    }

    function findBestPage(query) {
      const q = normalize(query);
      const words = q.split(/\s+/).filter(Boolean);
      if (words.length === 0) return null;
      let best = { page: null, score: 0 };
      SITE_INDEX.forEach(function(page) {
        const text = normalize([page.title, page.description, page.keywords].join(' '));
        let score = 0;
        words.forEach(function(w) {
          if (w.length < 2) return;
          if (text.indexOf(w) >= 0) score += 2;
          if (page.keywords && normalize(page.keywords).indexOf(w) >= 0) score += 1;
        });
        if (score > best.score) best = { page: page, score: score };
      });
      return best.score > 0 ? best.page : null;
    }

    const wrap = document.createElement('div');
    wrap.className = 'chat-pompa-wrap';
    wrap.innerHTML =
      '<button type="button" class="chat-pompa" aria-label="Abrir chat" title="Abrir chat">' +
        '<span class="chat-pompa-icon"><i class="fas fa-comments"></i></span>' +
        '<span class="chat-pompa-pulse"></span>' +
      '</button>' +
      '<div class="chat-panel" role="dialog" aria-label="Chat" aria-hidden="true">' +
        '<div class="chat-panel-header">' +
          '<span class="chat-panel-title"><i class="fas fa-robot"></i> Maria</span>' +
          '<button type="button" class="chat-panel-close" aria-label="Cerrar chat"><i class="fas fa-times"></i></button>' +
        '</div>' +
        '<div class="chat-panel-messages">' +
          '<div class="chat-panel-placeholder">Soy Maria, tu asistente de inteligencia artificial. ¿En qué puedo ayudarte?</div>' +
        '</div>' +
        '<div class="chat-panel-footer">' +
          '<input type="text" class="chat-panel-input" placeholder="Ej: quiero saber de piscinas infinitas" autocomplete="off">' +
          '<button type="button" class="chat-panel-send" aria-label="Enviar"><i class="fas fa-paper-plane"></i></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);

    const pompa = wrap.querySelector('.chat-pompa');
    const panel = wrap.querySelector('.chat-panel');
    const closeBtn = wrap.querySelector('.chat-panel-close');
    const input = wrap.querySelector('.chat-panel-input');
    const sendBtn = wrap.querySelector('.chat-panel-send');
    const messagesEl = wrap.querySelector('.chat-panel-messages');
    const placeholder = wrap.querySelector('.chat-panel-placeholder');

    function openChat() {
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      wrap.classList.add('chat-open');
      setTimeout(() => input.focus(), 300);
    }

    function closeChat() {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      wrap.classList.remove('chat-open');
    }

    function escapeHtml(s) {
      const div = document.createElement('div');
      div.textContent = s;
      return div.innerHTML;
    }

    function addMessage(content, isUser, isHtml) {
      if (placeholder) placeholder.remove();
      const msg = document.createElement('div');
      msg.className = 'chat-msg ' + (isUser ? 'chat-msg--user' : 'chat-msg--bot');
      const bubble = document.createElement('span');
      bubble.className = 'chat-msg-bubble';
      if (isHtml) bubble.innerHTML = content; else bubble.textContent = content;
      msg.appendChild(bubble);
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function sendMessage() {
      const text = (input.value || '').trim();
      if (!text) return;
      addMessage(text, true, false);
      input.value = '';

      // 1) ¿Pide piscina con medidas? → respuesta especial con guiño y contacto
      if (isPiscinaConMedidas(text)) {
        const contactPath = 'pages/contacto.html';
        const href = getHref(contactPath);
        const linkHtml = '<a href="' + escapeHtml(href) + '" class="chat-msg-link">Contacto</a>';
        addMessage('¡Guay! Si ya tienes claro cómo quieres tu piscina, te recomiendo que nos contactes directamente. <i class="fas fa-face-smile-wink" aria-hidden="true"></i> ' + linkHtml + '.', false, true);
        return;
      }

      // 2) ¿Coincide con alguna de las ~100 preguntas tipo? → enlace a esa página
      const fromPreguntas = findFromPreguntas(text);
      if (fromPreguntas) {
        const href = getHref(fromPreguntas.path);
        const linkHtml = '<a href="' + escapeHtml(href) + '" class="chat-msg-link">' + escapeHtml(fromPreguntas.title) + '</a>';
        addMessage('Para eso te va genial esta página: ' + linkHtml + '.', false, true);
        return;
      }

      // 3) Búsqueda por palabras clave en el índice
      const page = findBestPage(text);
      if (page) {
        const href = getHref(page.path);
        const linkHtml = '<a href="' + escapeHtml(href) + '" class="chat-msg-link">' + escapeHtml(page.title) + '</a>';
        addMessage('Para eso te va genial esta página: ' + linkHtml + '.', false, true);
      } else {
        addMessage('No he encontrado una página concreta. Prueba con: "piscinas infinitas", "revestimiento", "mantenimiento", "contacto" o "presupuesto".', false, false);
      }
    }

    pompa.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); sendMessage(); }
    });
  })();

});
