/* ===== AAHAR — Theme Toggle (Dark / Light) ===== */
(function () {
  'use strict';

  const STORAGE_KEY = 'aahar-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  /* ---------- Determine initial theme ---------- */
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage unavailable — silent fail
    }
  }

  function applyTheme(theme, animate) {
    const root = document.documentElement;

    if (animate) {
      root.classList.add('theme-transition');
      // Remove transition class after animations complete
      setTimeout(function () {
        root.classList.remove('theme-transition');
      }, 550);
    }

    if (theme === LIGHT) {
      root.setAttribute('data-theme', LIGHT);
    } else {
      root.removeAttribute('data-theme');
    }

    setStoredTheme(theme);
  }

  /* ---------- Initial load (no animation) ---------- */
  var storedTheme = getStoredTheme();
  // Default to dark if nothing stored
  var currentTheme = storedTheme === LIGHT ? LIGHT : DARK;
  applyTheme(currentTheme, false);

  /* ---------- Create toggle button ---------- */
  function createToggleButton() {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark/light theme');
    btn.setAttribute('id', 'theme-toggle');
    btn.innerHTML =
      '<span class="icon-moon"><i class="fas fa-moon"></i></span>' +
      '<span class="icon-sun"><i class="fas fa-sun"></i></span>';

    btn.addEventListener('click', function () {
      currentTheme = currentTheme === DARK ? LIGHT : DARK;
      applyTheme(currentTheme, true);
    });

    return btn;
  }

  /* ---------- Inject toggle into navbar ---------- */
  function injectToggle() {
    var navbar = document.querySelector('.navbar .container');
    if (!navbar) return;

    var btn = createToggleButton();

    // Insert after nav-links, before hamburger, or at the end
    var hamburger = navbar.querySelector('.hamburger');
    if (hamburger) {
      navbar.insertBefore(btn, hamburger);
    } else {
      navbar.appendChild(btn);
    }
  }

  /* ---------- Wait for DOM ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectToggle);
  } else {
    injectToggle();
  }
})();
