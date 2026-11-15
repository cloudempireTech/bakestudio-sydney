document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Drawer Toggle
  const hamburgerBtn = document.querySelector('.hamburger-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
      const isOpen = navLinks.classList.contains('nav-open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
      });
    });
  }

  // Video Pause/Play Control
  const heroVideo = document.querySelector('.hero-video');
  const videoControlBtn = document.querySelector('.video-control-btn');
  if (heroVideo && videoControlBtn) {
    videoControlBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoControlBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
      } else {
        heroVideo.pause();
        videoControlBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      }
    });
  }

  // Dynamic Typewriter Headline
  const typewriterEl = document.querySelector('.dynamic-typewriter');
  if (typewriterEl) {
    const words = [
      'Sculptural Wedding Cakes',
      'Vintage Lambeth Ruffles',
      'Hand-Painted Floral Gateaux',
      'Artisan Sydney Celebration Cakes'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 45 : 90;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }
    type();
  }

  // Animated Number Counters
  const counters = document.querySelectorAll('.stat-counter');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);
            counter.textContent = `${prefix}${currentVal}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = `${prefix}${target}${suffix}`;
            }
          }
          requestAnimationFrame(updateCounter);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
  }

  // Interactive Cake Size & Serving Calculator
  const cakeGuestSlider = document.getElementById('cakeGuestSlider');
  const cakeGuestVal = document.getElementById('cakeGuestVal');
  const portionTypeSelect = document.getElementById('portionType');
  const outTiers = document.getElementById('outTiers');
  const outServings = document.getElementById('outServings');
  const outLeadTime = document.getElementById('outLeadTime');
  const outSetup = document.getElementById('outSetup');
  const btnCakeEstimateWa = document.getElementById('btnCakeEstimateWa');

  if (cakeGuestSlider && outTiers) {
    function calculateCake() {
      const guests = parseInt(cakeGuestSlider.value, 10);
      if (cakeGuestVal) cakeGuestVal.textContent = guests;
      const isCoffee = portionTypeSelect ? portionTypeSelect.value === 'coffee' : false;

      let tiers = 'Single Tier (6" Extended Height)';
      let servings = isCoffee ? 'Up to 24 coffee slices' : 'Up to 14 dessert portions';
      let lead = '2 weeks advance booking';
      let setup = 'Standard boxed studio pick-up (North Ryde) or courier';

      if (guests > 25 && guests <= 45) {
        tiers = 'Single Tier (7" or 8" Tall Barrel)';
        servings = isCoffee ? '30-48 coffee slices' : '20-28 dessert portions';
        lead = '2-3 weeks advance booking';
        setup = 'Studio pick-up or Sydney courier delivery';
      } else if (guests > 45 && guests <= 85) {
        tiers = 'Two Tier (6" + 8" Stacked)';
        servings = isCoffee ? '60-80 coffee slices' : '38-50 dessert portions';
        lead = '3-4 weeks advance booking';
        setup = 'Chilled courier or white-glove on-site setup';
      } else if (guests > 85) {
        tiers = 'Three Tier (6" + 8" + 10" Grand)';
        servings = isCoffee ? '100-140 coffee slices' : '75-95 dessert portions';
        lead = '4-6 weeks advance booking';
        setup = 'On-site venue delivery & floral placement';
      }

      outTiers.textContent = tiers;
      outServings.textContent = servings;
      outLeadTime.textContent = lead;
      outSetup.textContent = setup;

      if (btnCakeEstimateWa) {
        const text = `Hi Bakestudio.Sydney! I calculated my cake size for ${guests} guests on your website calculator. Recommended size: ${tiers} (${servings}). Could you please share availability and design quote?`;
        btnCakeEstimateWa.href = `https://wa.me/61431639262?text=${encodeURIComponent(text)}`;
      }
    }

    cakeGuestSlider.addEventListener('input', calculateCake);
    if (portionTypeSelect) portionTypeSelect.addEventListener('change', calculateCake);
    calculateCake();
  }

  // Cake Design Quote Form
  const cakeQuoteForm = document.getElementById('cakeQuoteForm');
  if (cakeQuoteForm) {
    cakeQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quoteName')?.value || '';
      const date = document.getElementById('quoteDate')?.value || '';
      const occasion = document.getElementById('quoteOccasion')?.value || '';
      const guests = document.getElementById('quoteGuests')?.value || '';
      const flavors = document.getElementById('quoteFlavors')?.value || '';
      const vision = document.getElementById('quoteVision')?.value || '';

      const msg = `Hi Bakestudio.Sydney!\n\nI would like to enquire about a custom cake design:\n• Name: ${name}\n• Event Date: ${date}\n• Occasion: ${occasion}\n• Serving Count: ${guests} guests\n• Preferred Flavors: ${flavors}\n• Design Vision: ${vision}\n\nLooking forward to your pricing and availability!`;

      window.open(`https://wa.me/61431639262?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // IntersectionObserver for scroll glide animations
  const fadeCards = document.querySelectorAll('.bento-card, .review-card, .estimator-card');
  const scrollObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        scrollObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeCards.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(24px)';
    c.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    scrollObs.observe(c);
  });
});
