/* ===== AAHAR - Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

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

  // --- Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
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

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--black)';
    btn.style.borderColor = 'var(--gold)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
      contactForm.reset();
    }, 3000);
  });

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
