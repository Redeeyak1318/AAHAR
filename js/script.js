/* ===== AAHAR - Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.querySelector('.navbar')?.offsetHeight || 0;
        window.scrollTo({
          top: target.offsetTop - navH - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Sticky Navbar ---
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // --- Mobile Menu ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Active Nav Link Highlight ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // --- Testimonials Slider ---
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  let currentSlide = 0;
  let autoSlide;

  function showSlide(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + testimonials.length) % testimonials.length;
    testimonials[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  if (testimonials.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(autoSlide);
        showSlide(i);
        startAutoSlide();
      });
    });
    showSlide(0);
    startAutoSlide();
  }

  // --- Gallery Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.display = match ? 'block' : 'none';
        if (match) {
          item.style.animation = 'fadeIn 0.5s ease forwards';
        }
      });
    });
  });

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxCaption = document.getElementById('lightbox-caption');

  function openLightbox(src, alt, caption) {
    if (!lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Gallery item clicks
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const overlay = item.querySelector('.gallery-item-overlay span');
      if (img) openLightbox(img.src, img.alt, overlay?.textContent || '');
    });
  });

  // Gallery card clicks (premium gallery)
  document.querySelectorAll('.gallery-card').forEach(card => {
    const imageArea = card.querySelector('.gallery-card-image');
    imageArea?.addEventListener('click', () => {
      const img = card.querySelector('.gallery-card-image img');
      const title = card.querySelector('.gallery-card-title');
      if (img) openLightbox(img.src, img.alt, title?.textContent || '');
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // --- Form Validation ---
  function validateField(input) {
    const val = input.value.trim();
    const type = input.type;
    const errorEl = document.getElementById('error-' + input.id);
    let msg = '';

    if (input.required && !val) {
      msg = 'This field is required';
    } else if (type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      msg = 'Please enter a valid email';
    } else if (type === 'tel' && val && !/^[+]?[\d\s]{10,15}$/.test(val)) {
      msg = 'Please enter a valid phone number';
    } else if (input.minLength > 0 && val.length > 0 && val.length < input.minLength) {
      msg = `Minimum ${input.minLength} characters required`;
    } else if (type === 'date' && val) {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) msg = 'Please select a future date';
    }

    if (errorEl) errorEl.textContent = msg;
    input.classList.toggle('invalid', !!msg);
    input.classList.toggle('valid', !msg && val.length > 0);
    return !msg;
  }

  function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    inputs.forEach(input => {
      if (!validateField(input)) valid = false;
    });
    // Also validate optional fields that have values
    form.querySelectorAll('input[type="tel"], input[type="email"]').forEach(input => {
      if (input.value.trim() && !validateField(input)) valid = false;
    });
    return valid;
  }

  // Live validation on blur
  document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) validateField(input);
    });
  });

  // Toast notification
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  document.getElementById('toast-close')?.addEventListener('click', () => {
    document.getElementById('toast')?.classList.remove('show');
  });

  // Contact Form Submit
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(contactForm)) return;
    const btn = contactForm.querySelector('.btn-form');
    const btnText = btn?.querySelector('.btn-text');
    if (btnText) {
      const original = btnText.textContent;
      btnText.textContent = 'Sending...';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btnText.textContent = original;
        btn.style.pointerEvents = '';
        contactForm.reset();
        contactForm.querySelectorAll('.valid,.invalid').forEach(el => {
          el.classList.remove('valid', 'invalid');
        });
        showToast('Your message has been sent successfully!');
      }, 1200);
    }
  });

  // Reservation Form Submit
  const reservationForm = document.getElementById('reservation-form');
  reservationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(reservationForm)) return;
    const btn = reservationForm.querySelector('.btn-form');
    const btnText = btn?.querySelector('.btn-text');
    if (btnText) {
      const original = btnText.textContent;
      btnText.textContent = 'Reserving...';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btnText.textContent = original;
        btn.style.pointerEvents = '';
        reservationForm.reset();
        document.getElementById('res-guests').value = 2;
        reservationForm.querySelectorAll('.valid,.invalid').forEach(el => {
          el.classList.remove('valid', 'invalid');
        });
        showToast('Reservation confirmed! We look forward to seeing you.');
      }, 1200);
    }
  });

  // Guest counter buttons
  const guestInput = document.getElementById('res-guests');
  document.getElementById('guest-minus')?.addEventListener('click', () => {
    if (guestInput && parseInt(guestInput.value) > 1) {
      guestInput.value = parseInt(guestInput.value) - 1;
    }
  });
  document.getElementById('guest-plus')?.addEventListener('click', () => {
    if (guestInput && parseInt(guestInput.value) < 20) {
      guestInput.value = parseInt(guestInput.value) + 1;
    }
  });

  // Set min date for reservation to today
  const resDate = document.getElementById('res-date');
  if (resDate) {
    const today = new Date().toISOString().split('T')[0];
    resDate.setAttribute('min', today);
  }

  // --- Counter Animation ---
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current += step;
          if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            el.textContent = target;
          }
        };
        update();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

});
