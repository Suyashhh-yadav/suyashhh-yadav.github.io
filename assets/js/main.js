// Main JavaScript for Suyash Yadav Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Fullscreen Lightbox Modal for Dashboards
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxZoomIn = document.getElementById('lightbox-zoom-in');
  const lightboxZoomOut = document.getElementById('lightbox-zoom-out');
  const lightboxReset = document.getElementById('lightbox-reset');

  let currentZoom = 1;

  function openLightbox(src, title) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || 'Dashboard View';
    currentZoom = 1;
    lightboxImg.style.transform = `scale(${currentZoom})`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    currentZoom = 1;
  }

  // Bind all elements with .lightbox-trigger
  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-img') || trigger.querySelector('img')?.src;
      const title = trigger.getAttribute('data-title') || 'Dashboard View';
      if (src) openLightbox(src, title);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
      }
    });
  }

  // Keyboard escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Zoom controls
  if (lightboxZoomIn) {
    lightboxZoomIn.addEventListener('click', () => {
      currentZoom = Math.min(currentZoom + 0.25, 2.5);
      lightboxImg.style.transform = `scale(${currentZoom})`;
    });
  }
  if (lightboxZoomOut) {
    lightboxZoomOut.addEventListener('click', () => {
      currentZoom = Math.max(currentZoom - 0.25, 0.75);
      lightboxImg.style.transform = `scale(${currentZoom})`;
    });
  }
  if (lightboxReset) {
    lightboxReset.addEventListener('click', () => {
      currentZoom = 1;
      lightboxImg.style.transform = `scale(1)`;
    });
  }

  // 4. Copy Email to Clipboard
  window.copyEmail = function(event) {
    const email = 'suyashhh09@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const tooltip = document.getElementById('copy-tooltip');
      if (tooltip) {
        tooltip.textContent = 'Copied to clipboard!';
        tooltip.classList.remove('opacity-0');
        tooltip.classList.add('opacity-100');
        setTimeout(() => {
          tooltip.classList.remove('opacity-100');
          tooltip.classList.add('opacity-0');
          setTimeout(() => { tooltip.textContent = 'Click to copy'; }, 300);
        }, 2200);
      }
    }).catch(err => {
      window.location.href = `mailto:${email}`;
    });
  };

  // 5. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent = 'Please fill out all required fields.';
          formStatus.className = 'text-sm text-red-600 font-medium block mt-3';
        }
        return;
      }

      // Show sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        `;
      }

      // Construct mailto link as reliable fallback or send via formspree/endpoint
      setTimeout(() => {
        if (formStatus) {
          formStatus.innerHTML = `
            <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm">
              ✓ <strong>Thank you, ${name}!</strong> Your message has been prepared. If your email client didn't open automatically, you can also reach me directly at <a href="mailto:suyashhh09@gmail.com" class="underline font-semibold">suyashhh09@gmail.com</a>.
            </div>
          `;
          formStatus.className = 'block mt-3';
        }
        
        // Open default mail client with prefilled details
        const mailtoUri = `mailto:suyashhh09@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('Hi Suyash,\n\n' + message + '\n\nBest regards,\n' + name + '\n' + email)}`;
        window.location.href = mailtoUri;

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Message Ready`;
        }
        contactForm.reset();
      }, 700);
    });
  }

  // 6. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-blue-600', 'font-semibold');
      }
    });
  }, { passive: true });
});
