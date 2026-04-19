/* ===== AAHAR — Luxury UI Sound Effects (Web Audio API) ===== */
(function () {
  'use strict';

  // ── Guard: touch devices / reduced-motion preference ──
  if (
    'ontouchstart' in window ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  // ── State ──
  var audioCtx = null;
  var unlocked = false;
  var lastHoverTime = 0;
  var HOVER_COOLDOWN = 120; // ms — prevents rapid-fire hover sounds

  // ── Selectors for interactive elements ──
  var clickSelector = [
    'a', 'button', '.btn', '.filter-btn', '.dot',
    '.hamburger', '.lightbox-close', '.theme-toggle',
    '.guest-btn', '.social-link-card', '.svc-showcase-cta'
  ].join(', ');

  var hoverSelector = [
    '.btn', '.nav-links a', '.dish-card', '.culture-card',
    '.gallery-card-inner', '.service-card', '.philosophy-card',
    '.svc-showcase-card', '.svc-feature', '.info-card',
    '.chef-card', '.social-links a', '.social-link-card',
    '.filter-btn', '.theme-toggle'
  ].join(', ');

  // ── Lazy-init AudioContext (respects browser autoplay policy) ──
  function getContext() {
    if (!audioCtx) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
    }
    // Resume if suspended (Safari / Chrome policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // ── Unlock audio on first user gesture ──
  function unlockAudio() {
    if (unlocked) return;
    var ctx = getContext();
    if (!ctx) return;
    // Play a silent buffer to unlock
    var buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    unlocked = true;
  }

  /* ──────────────────────────────────────────────
     CLICK SOUND
     A refined, very short "tick" — like tapping
     a premium glass surface. Two layered tones
     with fast decay for a crisp, satisfying feel.
     ────────────────────────────────────────────── */
  function playClick() {
    var ctx = getContext();
    if (!ctx) return;

    var now = ctx.currentTime;

    // Master gain (overall volume)
    var master = ctx.createGain();
    master.gain.setValueAtTime(0.06, now);
    master.connect(ctx.destination);

    // Layer 1: High-frequency tick (2400 Hz, very short)
    var osc1 = ctx.createOscillator();
    var gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2400, now);
    osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
    gain1.gain.setValueAtTime(0.8, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc1.connect(gain1);
    gain1.connect(master);
    osc1.start(now);
    osc1.stop(now + 0.07);

    // Layer 2: Low body thump (180 Hz, subtle warmth)
    var osc2 = ctx.createOscillator();
    var gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(180, now);
    osc2.frequency.exponentialRampToValueAtTime(80, now + 0.05);
    gain2.gain.setValueAtTime(0.4, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc2.connect(gain2);
    gain2.connect(master);
    osc2.start(now);
    osc2.stop(now + 0.06);
  }

  /* ──────────────────────────────────────────────
     HOVER SOUND
     An extremely subtle, breathy "whisp" — almost
     subliminal. A filtered noise burst that feels
     like air brushing past silk. Barely audible.
     ────────────────────────────────────────────── */
  function playHover() {
    var ctx = getContext();
    if (!ctx) return;

    var now = ctx.currentTime;

    // Master gain — intentionally very quiet
    var master = ctx.createGain();
    master.gain.setValueAtTime(0.018, now);
    master.connect(ctx.destination);

    // Soft sine tone (very high, very short — a gentle "pip")
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(3800, now);
    osc.frequency.exponentialRampToValueAtTime(2800, now + 0.04);
    gain.gain.setValueAtTime(1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // ── Event Listeners ──

  // Unlock on first interaction
  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('keydown', unlockAudio, { once: true });

  // Click sound — delegated
  document.addEventListener('mousedown', function (e) {
    if (!unlocked) return;
    if (e.target.closest(clickSelector)) {
      playClick();
    }
  });

  // Hover sound — delegated with cooldown
  document.addEventListener('mouseover', function (e) {
    if (!unlocked) return;
    var now = Date.now();
    if (now - lastHoverTime < HOVER_COOLDOWN) return;

    if (e.target.closest(hoverSelector)) {
      lastHoverTime = now;
      playHover();
    }
  });

})();
