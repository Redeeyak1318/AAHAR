/* ===== AAHAR - Premium GSAP Animations ===== */
/* Calm, cultural, luxury feel — smooth like Apple website */

(function () {
  'use strict';

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // --- Reusable Easing Presets ---
  const EASE = {
    smooth: 'power2.out',
    elegant: 'power3.out',
    soft: 'power2.inOut',
    gentle: 'power1.out',
    luxe: 'power4.out',
  };

  // --- Utility: Check if element exists ---
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  // --- Disable old reveal so GSAP takes over ---
  function disableOldReveal() {
    $$('.reveal').forEach(el => {
      el.classList.remove('reveal');
      el.classList.add('gsap-reveal');
    });
  }

  // =============================================
  // 1. PAGE LOAD FADE-IN
  // =============================================
  function initPageTransition() {
    gsap.set('body', { opacity: 0 });
    gsap.to('body', {
      opacity: 1,
      duration: 0.6,
      ease: EASE.gentle,
      delay: 0.1,
    });
  }

  // =============================================
  // 2. HERO SECTION ANIMATION
  // =============================================
  function initHeroAnimation() {
    const hero = $('#hero');
    if (!hero) return;

    const tl = gsap.timeline({ delay: 0.4 });

    // Parallax on hero background
    const heroBg = hero.querySelector('.hero-bg img');
    if (heroBg) {
      gsap.set(heroBg, { scale: 1.15 });
      gsap.to(heroBg, {
        scale: 1,
        duration: 2,
        ease: EASE.soft,
      });
      // Scroll-based parallax
      gsap.to(heroBg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }

    // Eyebrow lines
    const eyebrowLines = hero.querySelectorAll('.eyebrow-line');
    const eyebrowText = hero.querySelector('.eyebrow > span:not(.eyebrow-line)');
    if (eyebrowLines.length) {
      tl.fromTo(eyebrowLines, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: EASE.elegant, stagger: 0.1 });
    }
    if (eyebrowText) {
      tl.fromTo(eyebrowText, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE.smooth }, '-=0.4');
    }

    // Hero title — character split reveal
    const heroTitle = hero.querySelector('.hero-title');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.innerHTML = '';
      heroTitle.setAttribute('aria-label', text);
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        heroTitle.appendChild(span);
      });
      tl.to(heroTitle.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.08,
        stagger: 0.06,
        ease: EASE.smooth,
      }, '-=0.2');
    }

    // Tagline slide up
    const tagline = hero.querySelector('.hero-tagline');
    if (tagline) {
      gsap.set(tagline, { opacity: 0, y: 30 });
      tl.to(tagline, { opacity: 1, y: 0, duration: 1, ease: EASE.elegant }, '-=0.1');
    }

    // Description fade in
    const desc = hero.querySelector('.hero-description');
    if (desc) {
      gsap.set(desc, { opacity: 0, y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.8, ease: EASE.smooth }, '-=0.6');
    }

    // Buttons scale in
    const buttons = hero.querySelectorAll('.hero-buttons .btn');
    if (buttons.length) {
      gsap.set(buttons, { opacity: 0, scale: 0.9 });
      tl.to(buttons, { opacity: 1, scale: 1, duration: 0.7, ease: EASE.elegant, stagger: 0.15 }, '-=0.4');
    }

    // Scroll indicator
    const scrollInd = hero.querySelector('.scroll-indicator');
    if (scrollInd) {
      gsap.set(scrollInd, { opacity: 0 });
      tl.to(scrollInd, { opacity: 1, duration: 0.6, ease: EASE.gentle }, '-=0.2');
    }
  }

  // =============================================
  // 3. PAGE HERO ANIMATION (inner pages)
  // =============================================
  function initPageHeroAnimation() {
    const pageHero = $('.page-hero');
    if (!pageHero) return;

    const tl = gsap.timeline({ delay: 0.3 });

    const breadcrumb = pageHero.querySelector('.breadcrumb');
    const h1 = pageHero.querySelector('h1');
    const subtitle = pageHero.querySelector('.page-hero-subtitle, .hero-sub');

    if (breadcrumb) {
      gsap.set(breadcrumb, { opacity: 0, y: 15 });
      tl.to(breadcrumb, { opacity: 1, y: 0, duration: 0.6, ease: EASE.smooth });
    }
    if (h1) {
      gsap.set(h1, { opacity: 0, y: 30 });
      tl.to(h1, { opacity: 1, y: 0, duration: 0.9, ease: EASE.elegant }, '-=0.3');
    }
    if (subtitle) {
      gsap.set(subtitle, { opacity: 0, y: 20 });
      tl.to(subtitle, { opacity: 1, y: 0, duration: 0.7, ease: EASE.smooth }, '-=0.4');
    }
  }

  // =============================================
  // 4. SCROLL REVEAL — Sections fade in + move up
  // =============================================
  function initScrollReveal() {
    // Section headers
    $$('.section-header').forEach(header => {
      const subtitle = header.querySelector('.subtitle');
      const h2 = header.querySelector('h2');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true,
        }
      });
      if (subtitle) {
        gsap.set(subtitle, { opacity: 0, y: 15 });
        tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: EASE.smooth });
      }
      if (h2) {
        gsap.set(h2, { opacity: 0, y: 25 });
        tl.to(h2, { opacity: 1, y: 0, duration: 0.8, ease: EASE.elegant }, '-=0.3');
      }
    });

    // Generic sections — fade up gently
    $$('.gsap-reveal').forEach(el => {
      gsap.set(el, { opacity: 0, y: 40 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    });
  }

  // =============================================
  // 5. CARDS STAGGER ANIMATION
  // =============================================
  function initCardStagger() {
    // Dish cards
    const dishCards = $$('.dish-card');
    if (dishCards.length) {
      gsap.set(dishCards, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: '.dishes-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(dishCards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: EASE.elegant,
          });
        },
      });
    }

    // Culture cards
    const cultureCards = $$('.culture-card');
    if (cultureCards.length) {
      gsap.set(cultureCards, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: '.culture-cards',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(cultureCards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: EASE.elegant,
          });
        },
      });
    }

    // Philosophy cards (About page)
    const philCards = $$('.philosophy-card');
    if (philCards.length) {
      gsap.set(philCards, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: '.philosophy-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(philCards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: EASE.elegant,
          });
        },
      });
    }

    // Service showcase cards
    const svcCards = $$('.svc-showcase-card');
    if (svcCards.length) {
      gsap.set(svcCards, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: '.svc-showcase-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(svcCards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: EASE.elegant,
          });
        },
      });
    }

    // Info cards (Contact page)
    const infoCards = $$('.info-card');
    if (infoCards.length) {
      gsap.set(infoCards, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: '.info-cards-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(infoCards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: EASE.elegant,
          });
        },
      });
    }

    // Stat items
    const statItems = $$('.stat-item');
    if (statItems.length) {
      gsap.set(statItems, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(statItems, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: EASE.smooth,
          });
        },
      });
    }
  }

  // =============================================
  // 6. GALLERY GRID REVEAL WITH STAGGER
  // =============================================
  function initGalleryAnimation() {
    const galleryCards = $$('.gallery-card');
    if (!galleryCards.length) return;

    gsap.set(galleryCards, { opacity: 0, y: 60, scale: 0.95 });
    ScrollTrigger.create({
      trigger: '.gallery-grid-premium',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(galleryCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: EASE.elegant,
        });
      },
    });
  }

  // =============================================
  // 7. IMAGE SCALE ANIMATION (1.1 → 1)
  // =============================================
  function initImageScaleReveal() {
    const imageSelectors = [
      '.intro-image img',
      '.culture-banner img',
      '.about-story-img-wrapper img',
      '.about-culture-img-wrapper img',
      '.svc-feature-image img',
    ];

    imageSelectors.forEach(sel => {
      $$(sel).forEach(img => {
        gsap.set(img, { scale: 1.1 });
        gsap.to(img, {
          scale: 1,
          duration: 1.2,
          ease: EASE.soft,
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
            once: true,
          },
        });
      });
    });
  }

  // =============================================
  // 8. NAVBAR SCROLL ANIMATION
  // =============================================
  function initNavbarAnimation() {
    const navbar = $('#navbar');
    if (!navbar) return;

    ScrollTrigger.create({
      start: 'top -60',
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 60) {
          gsap.to(navbar, {
            padding: '0.6rem 0',
            duration: 0.4,
            ease: EASE.smooth,
            overwrite: 'auto',
          });
        } else if (self.scroll() <= 60) {
          gsap.to(navbar, {
            padding: '1.2rem 0',
            duration: 0.4,
            ease: EASE.smooth,
            overwrite: 'auto',
          });
        }
      },
    });
  }

  // =============================================
  // 9. BUTTON HOVER ANIMATIONS
  // =============================================
  function initButtonAnimations() {
    // Handled by CSS micro-interactions — GSAP hover removed
    // to prevent competing transform/shadow animations
  }

  // =============================================
  // 10. SUBTLE FLOATING ANIMATION FOR IMAGES
  // =============================================
  function initFloatingImages() {
    const floatTargets = [
      '.intro-image-accent',
      '.about-story-img-accent',
      '.about-culture-img-accent',
    ];
    floatTargets.forEach(sel => {
      $$(sel).forEach(el => {
        gsap.to(el, {
          y: -8,
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    });
  }

  // =============================================
  // 11. TEXT REVEAL EFFECT (intro labels, quotes)
  // =============================================
  function initTextReveal() {
    // Labels with line accents
    const labels = $$('.intro-label, .about-label, .svc-feature-label, .form-label');
    labels.forEach(label => {
      gsap.set(label, { opacity: 0, x: -20 });
      gsap.to(label, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: label,
          start: 'top 88%',
          once: true,
        },
      });
    });

    // Dividers draw in
    const dividers = $$('.intro-divider, .about-divider');
    dividers.forEach(div => {
      gsap.set(div, { scaleX: 0, transformOrigin: 'left' });
      gsap.to(div, {
        scaleX: 1,
        duration: 0.8,
        ease: EASE.elegant,
        scrollTrigger: {
          trigger: div,
          start: 'top 90%',
          once: true,
        },
      });
    });

    // Signature lines
    const sigLines = $$('.signature-line, .about-signature-line, .about-quote-line, .gallery-quote-line');
    sigLines.forEach(line => {
      gsap.set(line, { scaleX: 0, transformOrigin: 'center' });
      gsap.to(line, {
        scaleX: 1,
        duration: 0.8,
        ease: EASE.elegant,
        scrollTrigger: {
          trigger: line,
          start: 'top 90%',
          once: true,
        },
      });
    });

    // Blockquotes
    $$('.about-quote-content blockquote, .gallery-quote blockquote').forEach(quote => {
      gsap.set(quote, { opacity: 0, y: 20 });
      gsap.to(quote, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: quote,
          start: 'top 85%',
          once: true,
        },
      });
    });
  }

  // =============================================
  // 12. FOOTER REVEAL
  // =============================================
  function initFooterAnimation() {
    const footer = $('footer.footer');
    if (!footer) return;

    const footerCols = footer.querySelectorAll('.footer-grid > div');
    if (footerCols.length) {
      gsap.set(footerCols, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: footer,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(footerCols, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: EASE.smooth,
          });
        },
      });
    }
  }

  // =============================================
  // 13. SERVICE FEATURE SECTIONS (slide in)
  // =============================================
  function initServiceFeatures() {
    $$('.svc-feature').forEach(feature => {
      const image = feature.querySelector('.svc-feature-image');
      const content = feature.querySelector('.svc-feature-content');
      const isReversed = feature.classList.contains('reverse');

      if (image) {
        gsap.set(image, { opacity: 0, x: isReversed ? 60 : -60 });
        gsap.to(image, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: EASE.elegant,
          scrollTrigger: { trigger: feature, start: 'top 80%', once: true },
        });
      }
      if (content) {
        gsap.set(content, { opacity: 0, x: isReversed ? -60 : 60 });
        gsap.to(content, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: EASE.elegant,
          delay: 0.15,
          scrollTrigger: { trigger: feature, start: 'top 80%', once: true },
        });
      }
    });
  }

  // =============================================
  // 14. CULTURE BANNER PARALLAX
  // =============================================
  function initParallaxSections() {
    // Culture banner parallax
    const cultureBanner = $('.culture-banner img');
    if (cultureBanner) {
      gsap.to(cultureBanner, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.culture-banner',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }

    // Stats section — subtle parallax bg
    const statsSection = $('.stats-section');
    if (statsSection) {
      gsap.to(statsSection, {
        backgroundPosition: '50% 30%',
        ease: 'none',
        scrollTrigger: {
          trigger: statsSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }

  // =============================================
  // 15. SOCIAL CARDS (Contact page)
  // =============================================
  function initSocialCards() {
    const socialCards = $$('.social-link-card');
    if (!socialCards.length) return;

    gsap.set(socialCards, { opacity: 0, y: 30, scale: 0.9 });
    ScrollTrigger.create({
      trigger: '.social-links-large',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(socialCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: EASE.elegant,
        });
      },
    });
  }

  // =============================================
  // MASTER INIT
  // =============================================
  function init() {
    initPageTransition();
    disableOldReveal();

    // Wait a tick for DOM to settle after removing .reveal
    requestAnimationFrame(() => {
      initHeroAnimation();
      initPageHeroAnimation();
      initNavbarAnimation();
      initScrollReveal();
      initCardStagger();
      initGalleryAnimation();
      initImageScaleReveal();
      initButtonAnimations();
      initFloatingImages();
      initTextReveal();
      initFooterAnimation();
      initServiceFeatures();
      initParallaxSections();
      initSocialCards();
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
