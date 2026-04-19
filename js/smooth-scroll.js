/* ===== AAHAR — Smooth Scrolling & Section Glide ===== */
/* Combines CSS scroll-behavior + GSAP-powered anchor scrolling
   + scrub-driven section glide-in effects for a luxury feel */

(function () {
  'use strict';

  // ── Guard for GSAP & ScrollTrigger ──
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  var EASE = {
    smooth: 'power2.out',
    elegant: 'power3.out',
    luxe: 'power4.out',
    soft: 'power2.inOut',
  };

  /* ═══════════════════════════════════════════
     1. GSAP-POWERED ANCHOR SCROLL
     Replaces native scrollTo with GSAP for
     buttery-smooth, deceleration-curve scrolling
     ═══════════════════════════════════════════ */
  function initGSAPAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        var navbarHeight = 0;
        var navbar = document.querySelector('.navbar');
        if (navbar) navbarHeight = navbar.offsetHeight;

        // Close mobile menu if open
        var navLinks = document.querySelector('.nav-links');
        var hamburger = document.querySelector('.hamburger');
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          if (hamburger) hamburger.classList.remove('active');
          document.body.style.overflow = '';
        }

        // GSAP smooth scroll — gorgeous deceleration curve
        gsap.to(window, {
          scrollTo: {
            y: target,
            offsetY: navbarHeight + 20,
            autoKill: true,
          },
          duration: 1.2,
          ease: EASE.luxe,
        });
      });
    });
  }

  /* ═══════════════════════════════════════════
     2. SECTION GLIDE-IN — Scrub parallax
     Sections gently translate from below as they
     enter the viewport, creating a "gliding" feel.
     This is NOT a one-shot reveal — it's tied to
     scroll position via scrub for continuous flow.
     ═══════════════════════════════════════════ */
  function initSectionGlide() {
    // Target all major content sections (skip hero — it has its own animation)
    var sections = document.querySelectorAll(
      '.intro-section, .featured-section, .culture-section, .stats-section, ' +
      '.testimonials-section, .cta-section, ' +
      '.about-story-section, .about-philosophy-section, .about-culture-section, .about-quote-section, ' +
      '.svc-feature, .svc-cards-section, .svc-cta-section, ' +
      '.gallery-section, .gallery-quote-section, ' +
      '.contact-info-section, .contact-form-section, .social-connect-section, .map-section'
    );

    sections.forEach(function (section) {
      // Subtle upward glide: starts 30px below, settles to natural position
      gsap.fromTo(section, {
        y: 30,
        opacity: 0.85,
      }, {
        y: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'top 55%',
          scrub: 0.6,
        },
      });
    });
  }

  /* ═══════════════════════════════════════════
     3. PARALLAX DEPTH LAYERS
     Create depth by moving decorative elements
     at different speeds — like looking through a
     window into the scene.
     ═══════════════════════════════════════════ */
  function initDepthParallax() {
    // Section header subtitles — slight lag behind scroll
    document.querySelectorAll('.section-header .subtitle').forEach(function (el) {
      gsap.to(el, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.4,
        },
      });
    });

    // Decorative accents float slower than content
    var accents = document.querySelectorAll(
      '.intro-image-accent, .about-story-img-accent, .about-culture-img-accent, ' +
      '.gamosa-accent-top'
    );
    accents.forEach(function (el) {
      gsap.to(el, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    });

    // Section gold divider lines — draw-in tied to scroll
    document.querySelectorAll('.gamosa-border::after, .svc-divider').forEach(function (el) {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 65%',
          scrub: 0.3,
        },
      });
    });
  }

  /* ═══════════════════════════════════════════
     4. FOOTER GLIDE
     Footer slides up gently from below
     ═══════════════════════════════════════════ */
  function initFooterGlide() {
    var footer = document.querySelector('footer.footer');
    if (!footer) return;

    gsap.fromTo(footer, {
      y: 20,
      opacity: 0.9,
    }, {
      y: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: footer,
        start: 'top 98%',
        end: 'top 75%',
        scrub: 0.5,
      },
    });
  }

  /* ═══════════════════════════════════════════
     5. SCROLL VELOCITY INDICATOR
     Scroll progress bar speed reflects scroll
     velocity — gives a sense of momentum
     ═══════════════════════════════════════════ */
  function initScrollVelocityFeedback() {
    var progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    ScrollTrigger.create({
      onUpdate: function (self) {
        var velocity = Math.abs(self.getVelocity());
        // Scale the progress bar height based on velocity (subtle effect)
        var h = Math.min(3 + velocity * 0.003, 6);
        progressBar.style.height = h + 'px';
      },
    });
  }

  /* ═══════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════ */
  function init() {
    // Check if GSAP ScrollToPlugin is available — if not, we skip anchor GSAP scroll
    // and rely on the existing script.js smooth scroll
    if (gsap.plugins && gsap.plugins.scrollTo) {
      initGSAPAnchorScroll();
    } else {
      // Fallback: still enhance with section glide
    }

    initSectionGlide();
    initDepthParallax();
    initFooterGlide();
    initScrollVelocityFeedback();

    // Refresh ScrollTrigger after all new triggers are created
    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Small delay so GSAP animations init first
    requestAnimationFrame(function () {
      requestAnimationFrame(init);
    });
  }
})();
