/**
 * ROMIL SOLANKI — ULTRA-PREMIUM DEVELOPER PORTFOLIO
 * Vanilla JavaScript Engine & Interactive Systems
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initThemeEngine();
  initNavbarAndProgress();
  initMobileMenu();
  initTypingAnimation();
  initHeroTerminal();
  initScrollReveal();
  initProjectFiltering();
  initExperienceGallery();
  initLightboxModal();
  initContactForm();
  initCopyToClipboard();
  initScrollToTop();
  initCustomCursorAndSpotlight();
  initMagneticButtons();
  initLiveClock();
});

/* ==========================================================================
   1. THEME ENGINE (DARK / LIGHT MODE WITH PERSISTENCE)
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Retrieve saved preference or check OS preference
  const savedTheme = localStorage.getItem('bp_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    html.setAttribute('data-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('bp_portfolio_theme', newTheme);
    });
  }
}

/* ==========================================================================
   2. NAVBAR SCROLL SHRINK, PROGRESS BAR & ACTIVE SECTION SPY
   ========================================================================== */
function initNavbarAndProgress() {
  const headerWrapper = document.getElementById('headerWrapper');
  const progressBar = document.getElementById('scrollProgress');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Scroll Progress Bar
    if (progressBar && docHeight > 0) {
      const progressPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = `${progressPercent}%`;
    }

    // Navbar Scrolled State
    if (headerWrapper) {
      if (scrollY > 30) {
        headerWrapper.classList.add('scrolled');
      } else {
        headerWrapper.classList.remove('scrolled');
      }
    }

    // Active Section Spy
    const scrollPosition = scrollY + 160;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ==========================================================================
   3. MOBILE DRAWER NAVIGATION & SCROLL LOCK
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileToggle || !mobileMenu) return;

  const toggleMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !mobileMenu.classList.contains('active');
    
    if (shouldOpen) {
      mobileToggle.classList.add('active');
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  mobileToggle.addEventListener('click', () => toggleMenu());

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   4. DYNAMIC TYPING TEXT ANIMATION
   ========================================================================== */
function initTypingAnimation() {
  const typingElement = document.getElementById('typedHeroText');
  if (!typingElement) return;

  const roles = [
    'Web Developer',
    'Python Developer',
    'Frontend & UI Enthusiast',
    'PHP & MySQL Developer',
    'Problem Solver & Quick Learner'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeStep() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingDelay = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingDelay = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingDelay = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingDelay = 500; // Pause before next word
    }

    setTimeout(typeStep, typingDelay);
  }

  setTimeout(typeStep, 600);
}

/* ==========================================================================
   5. HERO TERMINAL / DEVELOPER HUD TAB SWITCHING
   ========================================================================== */
function initHeroTerminal() {
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const codeContent = document.getElementById('terminalCodeContent');
  if (!terminalTabs.length || !codeContent) return;

  const tabSnippets = {
    'romil.php': `
<div class="code-line"><span class="line-num">01</span><span class="code-content"><span class="keyword">&lt;?php</span></span></div>
<div class="code-line"><span class="line-num">02</span><span class="code-content"><span class="keyword">namespace</span> App\\Developers;</span></div>
<div class="code-line"><span class="line-num">03</span><span class="code-content"></span></div>
<div class="code-line"><span class="line-num">04</span><span class="code-content"><span class="keyword">class</span> <span class="class-name">RomilSolanki</span> <span class="keyword">extends</span> WebDeveloper {</span></div>
<div class="code-line"><span class="line-num">05</span><span class="code-content">&nbsp;&nbsp;<span class="keyword">public string</span> <span class="property">$location</span> = <span class="string">'Ahmedabad, Gujarat'</span>;</span></div>
<div class="code-line"><span class="line-num">06</span><span class="code-content">&nbsp;&nbsp;<span class="keyword">public string</span> <span class="property">$specialization</span> = <span class="string">'Web & Python Development'</span>;</span></div>
<div class="code-line"><span class="line-num">07</span><span class="code-content">&nbsp;&nbsp;<span class="keyword">public string</span> <span class="property">$status</span> = <span class="string">'Available For Opportunities'</span>;</span></div>
<div class="code-line"><span class="line-num">08</span><span class="code-content"></span></div>
<div class="code-line"><span class="line-num">09</span><span class="code-content">&nbsp;&nbsp;<span class="keyword">public function</span> <span class="class-name">deliverSolution</span>(): Solution {</span></div>
<div class="code-line"><span class="line-num">10</span><span class="code-content">&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">return</span> <span class="keyword">new</span> Solution(cleanCode: <span class="keyword">true</span>, responsive: <span class="keyword">true</span>);</span></div>
<div class="code-line"><span class="line-num">11</span><span class="code-content">&nbsp;&nbsp;}</span></div>
<div class="code-line"><span class="line-num">12</span><span class="code-content">}</span></div>`,

    'stack.json': `
<div class="code-line"><span class="line-num">01</span><span class="code-content">{</span></div>
<div class="code-line"><span class="line-num">02</span><span class="code-content">&nbsp;&nbsp;<span class="property">"languages"</span>: [<span class="string">"Python"</span>, <span class="string">"PHP"</span>, <span class="string">"JavaScript"</span>, <span class="string">"SQL"</span>],</span></div>
<div class="code-line"><span class="line-num">03</span><span class="code-content">&nbsp;&nbsp;<span class="property">"web_tech"</span>: [<span class="string">"HTML5"</span>, <span class="string">"CSS3"</span>, <span class="string">"Bootstrap 5"</span>, <span class="string">"WordPress"</span>],</span></div>
<div class="code-line"><span class="line-num">04</span><span class="code-content">&nbsp;&nbsp;<span class="property">"databases"</span>: [<span class="string">"MySQL"</span>],</span></div>
<div class="code-line"><span class="line-num">05</span><span class="code-content">&nbsp;&nbsp;<span class="property">"tools"</span>: [<span class="string">"Git"</span>, <span class="string">"GitHub"</span>, <span class="string">"VS Code"</span>],</span></div>
<div class="code-line"><span class="line-num">06</span><span class="code-content">&nbsp;&nbsp;<span class="property">"focus"</span>: <span class="string">"Responsive Web &amp; Python Applications"</span></span></div>
<div class="code-line"><span class="line-num">07</span><span class="code-content">}</span></div>`,

    'metrics.sh': `
<div class="code-line"><span class="line-num">01</span><span class="code-content"><span class="comment"># Outputting developer profile</span></span></div>
<div class="code-line"><span class="line-num">02</span><span class="code-content">$ ./run-system-audit.sh</span></div>
<div class="code-line"><span class="line-num">03</span><span class="code-content"><span class="string">[✓] Education: IT Diploma @ LJ University</span></span></div>
<div class="code-line"><span class="line-num">04</span><span class="code-content"><span class="string">[✓] Experience: Web Developer @ Webzyrova | Python Intern @ Sattrix</span></span></div>
<div class="code-line"><span class="line-num">05</span><span class="code-content"><span class="string">[✓] Skills: Python, PHP, JavaScript, MySQL, WordPress</span></span></div>
<div class="code-line"><span class="line-num">06</span><span class="code-content"><span class="string">[✓] Code Quality: Clean, Responsive, User-Friendly</span></span></div>
<div class="code-line"><span class="line-num">07</span><span class="code-content"><span class="comment"># Ready for new challenges &amp; opportunities.</span></span></div>`
  };

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-tab');
      if (tabSnippets[target]) {
        codeContent.innerHTML = tabSnippets[target];
      }
    });
  });
}

/* ==========================================================================
   6. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const match = selectedCategory === 'all' || cardCategory === selectedCategory;

        if (match) {
          card.style.display = card.classList.contains('featured-wide') ? 'grid' : 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 240);
        }
      });
    });
  });
}

/* ==========================================================================
   7.1 WEBZYROVA EXPERIENCE GALLERY CONTROLLER
   ========================================================================== */
const webzyrovaSnapshots = [
  {
    src: 'images-ss/webzyrova-1-hero.png',
    title: 'Webzyrova — 01. Hero & Branding Landing',
    label: '01 • Hero & Brand Presentation',
    counter: 'Snapshot 1 of 4 • Hero Section',
    caption: 'Hero landing interface showcasing dynamic branding, typography, and call-to-action pathways.',
    short: '01. Hero'
  },
  {
    src: 'images-ss/webzyrova-2-services.png',
    title: 'Webzyrova — 02. Core Services Ecosystem',
    label: '02 • Services Ecosystem',
    counter: 'Snapshot 2 of 4 • Services Ecosystem',
    caption: 'Modern interactive services cards: Digital Marketing, SEO Firm, Web Development, and UI Animation.',
    short: '02. Services'
  },
  {
    src: 'images-ss/webzyrova-3-faq.png',
    title: 'Webzyrova — 03. Interactive FAQ Section',
    label: '03 • Interactive Client FAQ',
    counter: 'Snapshot 3 of 4 • Client FAQ Accordion',
    caption: 'User-friendly accordion FAQ component providing transparent information for prospective business clients.',
    short: '03. FAQ'
  },
  {
    src: 'images-ss/webzyrova-4-contact.png',
    title: 'Webzyrova — 04. Client Contact & Inquiries',
    label: '04 • Client Contact Portal',
    counter: 'Snapshot 4 of 4 • Contact Portal & Map',
    caption: 'High-conversion contact section with integrated message dispatch, direct channels, and map view.',
    short: '04. Contact'
  }
];

function initExperienceGallery() {
  const mainImage = document.getElementById('expMainImage');
  const mainLabel = document.getElementById('expMainLabel');
  const activeCounter = document.getElementById('expActiveCounter');
  const mainTrigger = document.getElementById('expMainTrigger');
  const thumbBtns = document.querySelectorAll('.exp-thumb-btn');

  if (!mainImage || !thumbBtns.length) return;

  thumbBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const snap = webzyrovaSnapshots[index];
      if (!snap) return;

      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      mainImage.style.opacity = '0.4';
      setTimeout(() => {
        mainImage.src = snap.src;
        mainImage.alt = snap.title;
        if (mainLabel) mainLabel.textContent = snap.label;
        if (activeCounter) activeCounter.textContent = snap.counter;
        if (mainTrigger) mainTrigger.setAttribute('data-index', index);
        mainImage.style.opacity = '1';
      }, 120);
    });
  });
}

/* ==========================================================================
   8. ADVANCED GALLERY LIGHTBOX MODAL (SLIDESHOW & KEYBOARD CONTROLS)
   ========================================================================== */
function initLightboxModal() {
  const modal = document.getElementById('lightboxModal');
  const modalImage = document.getElementById('lightboxImage');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalCounter = document.getElementById('lightboxCounter');
  const modalCaption = document.getElementById('lightboxCaption');
  const thumbStrip = document.getElementById('lightboxThumbStrip');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const previewTriggers = document.querySelectorAll('.lightbox-trigger');
  const openGalleryBtn = document.getElementById('openWebzyrovaGalleryBtn');

  if (!modal || !modalImage) return;

  let currentSlideIndex = 0;

  // Render thumbnail strip once
  if (thumbStrip) {
    thumbStrip.innerHTML = '';
    webzyrovaSnapshots.forEach((snap, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `lightbox-thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.setAttribute('data-index', idx);
      thumb.innerHTML = `<img src="${snap.src}" alt="${snap.short}" />`;
      thumb.addEventListener('click', () => {
        setSlide(idx);
      });
      thumbStrip.appendChild(thumb);
    });
  }

  function setSlide(index) {
    if (index < 0) index = webzyrovaSnapshots.length - 1;
    if (index >= webzyrovaSnapshots.length) index = 0;
    currentSlideIndex = index;

    const snap = webzyrovaSnapshots[currentSlideIndex];
    if (!snap) return;

    modalImage.style.opacity = '0.3';
    setTimeout(() => {
      modalImage.src = snap.src;
      modalImage.alt = snap.title;
      if (modalTitle) modalTitle.textContent = snap.title;
      if (modalCounter) modalCounter.textContent = `${currentSlideIndex + 1} / ${webzyrovaSnapshots.length}`;
      if (modalCaption) modalCaption.textContent = snap.caption;
      modalImage.style.opacity = '1';
    }, 100);

    // Update thumbnail active state
    if (thumbStrip) {
      const thumbs = thumbStrip.querySelectorAll('.lightbox-thumb-item');
      thumbs.forEach((t, i) => {
        t.classList.toggle('active', i === currentSlideIndex);
      });
    }
  }

  const openLightbox = (startIndex = 0) => {
    setSlide(startIndex);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  previewTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const indexAttr = trigger.getAttribute('data-index');
      const startIndex = indexAttr !== null ? parseInt(indexAttr, 10) : 0;
      openLightbox(isNaN(startIndex) ? 0 : startIndex);
    });
  });

  if (openGalleryBtn) {
    openGalleryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(0);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setSlide(currentSlideIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setSlide(currentSlideIndex - 1);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Keyboard Navigation: Esc, ArrowLeft, ArrowRight
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') setSlide(currentSlideIndex + 1);
    if (e.key === 'ArrowLeft') setSlide(currentSlideIndex - 1);
  });
}

/* ==========================================================================
   9. CONTACT FORM (WEB3FORMS AJAX INTEGRATION & VALIDATION)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('formName')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim();
    const subject = document.getElementById('formSubject')?.value.trim();
    const message = document.getElementById('formMessage')?.value.trim();

    // Client-side Validation
    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Submit state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
    }

    try {
      const formData = new FormData(contactForm);
      const json = JSON.stringify(Object.fromEntries(formData));

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();

      if (result.success) {
        showFeedback('🎉 Message delivered successfully! Romil will respond promptly.', 'success');
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      showFeedback('Message delivery failed. Please email romilsolanki7172@gmail.com directly.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      }
    }
  });

  function showFeedback(text, type) {
    if (!formFeedback) return;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> <span>${text}</span>`;
    formFeedback.style.display = 'flex';
  }
}

/* ==========================================================================
   10. 1-CLICK COPY TO CLIPBOARD
   ========================================================================== */
function initCopyToClipboard() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2200);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    });
  });
}

/* ==========================================================================
   11. SCROLL TO TOP BUTTON
   ========================================================================== */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   12. CUSTOM CURSOR & AMBIENT SPOTLIGHT
   ========================================================================== */
function initCustomCursorAndSpotlight() {
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const spotlight = document.getElementById('ambientSpotlight');

  // Check if fine pointer device & reduced motion not preferred
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReducedMotion) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }

    if (spotlight) {
      spotlight.style.left = `${mouseX}px`;
      spotlight.style.top = `${mouseY}px`;
    }
  });

  // Smooth trailing for outer ring
  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }

    requestAnimationFrame(renderRing);
  }
  renderRing();

  // Hover state expansions
  const hoverSelectors = 'a, button, .project-media, .skill-chip, .terminal-tab, .metric-card';
  document.querySelectorAll(hoverSelectors).forEach(item => {
    item.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ==========================================================================
   13. MAGNETIC BUTTON MICRO-INTERACTION (DESKTOP)
   ========================================================================== */
function initMagneticButtons() {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary');

  magneticElements.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ==========================================================================
   14. LIVE CLOCK (INDIA STANDARD TIME / UTC)
   ========================================================================== */
function initLiveClock() {
  const clockElement = document.getElementById('liveClock');
  if (!clockElement) return;

  function updateTime() {
    const now = new Date();
    // India Standard Time (UTC + 5:30)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockElement.textContent = now.toLocaleTimeString('en-US', options) + ' IST (Gujarat)';
  }

  updateTime();
  setInterval(updateTime, 1000);
}
