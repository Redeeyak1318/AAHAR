/* ===== AAHAR — Scroll Progress Bar ===== */
(function () {
  'use strict';

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  /* ---------- Create progress bar element ---------- */
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  /* ---------- Throttled scroll handler ---------- */
  var ticking = false;

  function updateProgress() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      bar.style.width = '0%';
      return;
    }

    var progress = (scrollTop / docHeight) * 100;
    bar.style.width = Math.min(progress, 100) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  // Initial state
  updateProgress();

})();
