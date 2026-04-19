/* ===== AAHAR — Custom Cursor (Pure JS) ===== */
(function () {
  'use strict';

  // Abort on touch / mobile devices
  if (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  ) {
    return;
  }

  /* ---------- Create DOM elements ---------- */
  const dot = document.createElement('div');
  dot.classList.add('cursor-dot');
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.classList.add('cursor-ring');
  document.body.appendChild(ring);

  /* ---------- State ---------- */
  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  const lag = 0.15; // trailing smoothness (lower = slower follow)
  let isHovering = false;
  let rafId = null;

  /* ---------- Interactive selectors ---------- */
  const interactiveSelector = [
    'a',
    'button',
    'input',
    'textarea',
    'select',
    'label',
    'img',
    '.btn',
    '.dish-card',
    '.culture-card',
    '.gallery-item',
    '.service-card',
    '.chef-card',
    '.social-links a',
    '.filter-btn',
    '.dot',
    '.hamburger',
    '.lightbox-close'
  ].join(', ');

  /* ---------- Event listeners ---------- */
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Snap the dot instantly
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Click animation
  document.addEventListener('mousedown', function () {
    dot.classList.add('cursor-click');
    ring.classList.add('cursor-click');
  });

  document.addEventListener('mouseup', function () {
    dot.classList.remove('cursor-click');
    ring.classList.remove('cursor-click');
  });

  // Hide when cursor leaves viewport
  document.addEventListener('mouseleave', function () {
    dot.classList.add('cursor-hidden');
    ring.classList.add('cursor-hidden');
  });

  document.addEventListener('mouseenter', function () {
    dot.classList.remove('cursor-hidden');
    ring.classList.remove('cursor-hidden');
  });

  // Hover detection via event delegation
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSelector)) {
      if (!isHovering) {
        isHovering = true;
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      }
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactiveSelector)) {
      // Only remove if we are not moving into another interactive element
      const related = e.relatedTarget;
      if (!related || !related.closest(interactiveSelector)) {
        isHovering = false;
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      }
    }
  });

  /* ---------- Animation loop (ring trailing) ---------- */
  function animate() {
    // Lerp the ring position for smooth trailing
    ringX += (mouseX - ringX) * lag;
    ringY += (mouseY - ringY) * lag;

    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    rafId = requestAnimationFrame(animate);
  }

  animate();

  /* ---------- Cleanup on page unload ---------- */
  window.addEventListener('beforeunload', function () {
    if (rafId) cancelAnimationFrame(rafId);
  });
})();
