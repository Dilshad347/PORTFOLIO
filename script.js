/* ============================================
   MD DILSHAD — PORTFOLIO
   Pure Vanilla JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ----------------------------------------
     CUSTOM CURSOR
     ---------------------------------------- */
  const cursor = document.getElementById('cursor');
  let isTouchDevice = false;

  function initCursor() {
    if (!cursor) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isTouchDevice = true;
      cursor.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';

      if (!cursor.classList.contains('active')) {
        cursor.classList.add('active');
      }

      // Update spotlight
      const spotlight = document.getElementById('bgSpotlight');
      if (spotlight) {
        spotlight.style.setProperty('--mouse-x', mouseX + 'px');
        spotlight.style.setProperty('--mouse-y', mouseY + 'px');
      }
    });

    // Hover detection
    const hoverTargets = 'a, button, .btn, .stack-item, .project, .platform';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverTargets)) {
        cursor.classList.add('hover');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverTargets)) {
        cursor.classList.remove('hover');
      }
    });

    document.addEventListener('mouseleave', function () {
      cursor.classList.remove('active');
    });
  }

  /* ----------------------------------------
     NAVBAR
     ---------------------------------------- */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  /* ----------------------------------------
     ACTIVE NAV LINK
     ---------------------------------------- */
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + window.innerHeight / 3;

    let currentSection = '';

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  }

  /* ----------------------------------------
     HAMBURGER / MOBILE MENU
     ---------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileMenu() {
    const isOpen = hamburger.classList.contains('active');

    if (isOpen) {
      closeMobileMenu();
    } else {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  /* ----------------------------------------
     HERO REVEAL
     ---------------------------------------- */
  function revealHero() {
    const reveals = document.querySelectorAll('.hero .reveal-text, .hero .reveal-up, .hero .reveal-left, .hero .reveal-right');

    reveals.forEach(function (el) {
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

      setTimeout(function () {
        el.classList.add('revealed');
      }, 200 + delay);
    });
  }

  /* ----------------------------------------
     SCROLL REVEAL
     ---------------------------------------- */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    document.querySelectorAll('.reveal-text, .reveal-up, .reveal-left, .reveal-right').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------
     SMOOTH SCROLL FOR NAV LINKS
     ---------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = navbar.offsetHeight;
          const targetPosition = target.offsetTop - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  const skills = {
    frontend: [
      { name: 'HTML5', icon: 'fab fa-html5', level: 85 },
      { name: 'CSS3', icon: 'fab fa-css3-alt', level: 80 },
      { name: 'JavaScript', icon: 'fab fa-js', level: 75 },
      { name: 'React', icon: 'fab fa-react', level: 65 },
    ],
    backend: [
      { name: 'Node.js', icon: 'fab fa-node-js', level: 65 },
      { name: 'Express.js', icon: 'fas fa-server', level: 60 },
      { name: 'MongoDB', icon: 'fas fa-database', level: 60 },
      { name: 'REST APIs', icon: 'fas fa-code', level: 65 },
    ],
    ai: [
      { name: 'Python', icon: 'fab fa-python', level: 60 },
      { name: 'Machine Learning', icon: 'fas fa-brain', level: 45 },
      { name: 'Generative AI', icon: 'fas fa-wand-magic-sparkles', level: 50 },
    ],
    tools: [
      { name: 'Git', icon: 'fab fa-git-alt', level: 65 },
      { name: 'GitHub', icon: 'fab fa-github', level: 70 },
      { name: 'VS Code', icon: 'fas fa-code', level: 80 },
    ],
  };

  function renderSkills(category) {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.replaceChildren();
    (skills[category] || []).forEach(function (skill) {
      const card = document.createElement('article');
      card.className = 'skill-card';
      const icon = document.createElement('i');
      icon.className = 'skill-icon ' + skill.icon;
      icon.setAttribute('aria-hidden', 'true');
      const title = document.createElement('h4');
      title.textContent = skill.name;
      const level = document.createElement('div');
      level.className = 'skill-level';
      level.setAttribute('aria-label', skill.name + ' skill level ' + skill.level + '%');
      const fill = document.createElement('div');
      fill.className = 'skill-level-fill';
      fill.style.width = skill.level + '%';
      level.appendChild(fill);
      card.append(icon, title, level);
      grid.appendChild(card);
    });
  }

  function initSkills() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        buttons.forEach(function (item) { item.classList.remove('active'); });
        button.classList.add('active');
        renderSkills(button.dataset.tab);
      });
    });
    renderSkills(document.querySelector('.tab-btn.active')?.dataset.tab || 'frontend');
  }

  const projects = [
    { title: 'Personal Portfolio', type: 'web', icon: 'fas fa-laptop-code', description: 'A responsive portfolio presenting my skills, work, LeetCode progress, and contact details.', tags: ['HTML', 'CSS', 'JavaScript'], href: '#home', linkText: 'View portfolio' },
    { title: 'LeetCode Progress Dashboard', type: 'web', icon: 'fas fa-chart-line', description: 'A portfolio dashboard for displaying problem solving progress, difficulty breakdown, and practice focus.', tags: ['JavaScript', 'Data Structures'], href: '#leetcode', linkText: 'View dashboard' },
  ];

  function initProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    projects.forEach(function (project) {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.dataset.category = project.type;
      const thumbnail = document.createElement('div');
      thumbnail.className = 'project-thumbnail';
      const icon = document.createElement('i');
      icon.className = project.icon;
      icon.setAttribute('aria-hidden', 'true');
      const overlay = document.createElement('div');
      overlay.className = 'project-overlay';
      const link = document.createElement('a');
      link.href = project.href;
      link.setAttribute('aria-label', project.linkText);
      link.innerHTML = '<i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>';
      overlay.appendChild(link);
      thumbnail.append(icon, overlay);
      const info = document.createElement('div');
      info.className = 'project-info';
      const tags = document.createElement('div');
      tags.className = 'project-tags';
      project.tags.forEach(function (tag) {
        const badge = document.createElement('span');
        badge.className = 'project-tag';
        badge.textContent = tag;
        tags.appendChild(badge);
      });
      const title = document.createElement('h3');
      title.textContent = project.title;
      const description = document.createElement('p');
      description.textContent = project.description;
      info.append(tags, title, description);
      card.append(thumbnail, info);
      grid.appendChild(card);
    });
    document.querySelectorAll('.filter-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (item) { item.classList.remove('active'); });
        button.classList.add('active');
        const filter = button.dataset.filter;
        grid.querySelectorAll('.project-card').forEach(function (card) {
          card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
        });
      });
    });
  }

  function initThemeToggle() {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    const icon = button.querySelector('i');
    button.addEventListener('click', function () {
      const light = document.body.classList.toggle('light-mode');
      if (icon) icon.className = light ? 'fas fa-sun' : 'fas fa-moon';
      button.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    });
  }

  function initImageFallbacks() {
    document.querySelectorAll('img').forEach(function (img) {
      if (!img.hasAttribute('src')) return;
      function showFallback() {
        if (img.id === 'leetcode-avatar-image') {
          img.classList.add('is-unavailable');
          return;
        }
        const avatar = img.closest('.hero-avatar, .about-avatar');
        if (avatar) {
          avatar.textContent = 'MD';
          avatar.setAttribute('aria-label', 'Md Dilshad');
        }
      }
      img.addEventListener('error', showFallback, { once: true });
      if (img.complete && img.naturalWidth === 0) showFallback();
    });
  }

  async function initLeetCode() {
    const username = 'codewithdilsho';
    const status = document.getElementById('leetcode-sync-status');
    const setText = (id, value) => {
      const element = document.getElementById(id);
      if (element && value !== undefined && value !== null && value !== '') element.textContent = value;
    };

    try {
      const [statsResponse, contestResponse] = await Promise.all([
        fetch(`https://leetcode-stats.tashif.codes/${username}`),
        fetch(`https://leetcode-stats.tashif.codes/${username}/contests`)
      ]);
      if (!statsResponse.ok) throw new Error('Could not load LeetCode stats');
      const stats = await statsResponse.json();
      if (stats.status === 'error') throw new Error(stats.message || 'LeetCode profile unavailable');

      const easy = Number(stats.easySolved) || 0;
      const medium = Number(stats.mediumSolved) || 0;
      const hard = Number(stats.hardSolved) || 0;
      const total = Number(stats.totalSolved) || easy + medium + hard;
      setText('leetcode-solved-total', total);
      setText('leetcode-solved', total);
      setText('leetcode-easy', easy);
      setText('leetcode-medium', medium);
      setText('leetcode-hard', hard);
      setText('leetcode-acceptance', `${Number(stats.acceptanceRate || 0).toFixed(1)}%`);
      setText('leetcode-ranking', stats.ranking ? `#${Number(stats.ranking).toLocaleString()}` : '—');

      [['easy', easy], ['medium', medium], ['hard', hard]].forEach(([difficulty, count]) => {
        const bar = document.getElementById(`leetcode-${difficulty}-bar`);
        if (bar) bar.style.width = `${Math.min(100, total ? count / total * 100 : 0)}%`;
      });

      if (contestResponse.ok) {
        const contest = await contestResponse.json();
        if (contest.status !== 'error') setText('leetcode-rating', contest.rating ? Math.round(contest.rating).toLocaleString() : '—');
      }
      const calendar = stats.submissionCalendar;
      if (calendar && typeof calendar === 'object') {
        const entries = Object.entries(calendar);
        const activeDays = entries
          .filter(([, count]) => Number(count) > 0)
          .map(([timestamp]) => new Date(Number(timestamp) * 1000).toISOString().slice(0, 10));
        const activeSet = new Set(activeDays);
        let streak = 0;
        const day = new Date();
        day.setUTCHours(0, 0, 0, 0);
        while (activeSet.has(day.toISOString().slice(0, 10))) {
          streak++;
          day.setUTCDate(day.getUTCDate() - 1);
        }
        if (!streak) {
          day.setUTCDate(day.getUTCDate() - 1);
          while (activeSet.has(day.toISOString().slice(0, 10))) {
            streak++;
            day.setUTCDate(day.getUTCDate() - 1);
          }
        }
        setText('leetcode-streak', `${streak} day${streak === 1 ? '' : 's'}`);

        const year = new Date().getFullYear();
        setText('leetcode-activity-year', year);
        const monthlyCounts = Array(12).fill(0);
        entries.forEach(([timestamp, count]) => {
          const date = new Date(Number(timestamp) * 1000);
          if (date.getFullYear() === year) monthlyCounts[date.getMonth()] += Number(count) || 0;
        });
        const maxMonthlyCount = Math.max(1, ...monthlyCounts);
        document.querySelectorAll('#leetcode-activity-chart span').forEach((bar, month) => {
          bar.style.height = `${Math.max(4, monthlyCounts[month] / maxMonthlyCount * 100)}%`;
          bar.title = `${monthlyCounts[month]} submissions`;
        });
      }

      if (status) status.textContent = 'Live data · refreshed on page load';
    } catch (error) {
      if (status) status.textContent = 'Live data is unavailable right now';
      console.warn('LeetCode data could not be loaded:', error);
    }
  }

  function initTypewriter() {
    const target = document.getElementById('typewriter');
    if (!target) return;
    const titles = ['Full Stack Developer', 'Creative Developer', 'AI Enthusiast'];
    let titleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    function tick() {
      const title = titles[titleIndex];
      characterIndex += deleting ? -1 : 1;
      target.textContent = title.slice(0, characterIndex);
      let delay = deleting ? 45 : 85;
      if (!deleting && characterIndex === title.length) {
        deleting = true;
        delay = 1300;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        delay = 300;
      }
      window.setTimeout(tick, delay);
    }
    tick();
  }

  /* ----------------------------------------
     CONTACT FORM VALIDATION
     ---------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    // This portfolio form submits through FormSubmit and has no inline error elements.
    if (!form || !nameInput || !emailInput || !messageInput || !nameError || !emailError || !messageError || !formSuccess) return;

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearErrors() {
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      nameInput.classList.remove('error');
      emailInput.classList.remove('error');
      messageInput.classList.remove('error');
    }

    // Live validation on input
    nameInput.addEventListener('input', function () {
      if (this.value.trim()) {
        this.classList.remove('error');
        nameError.textContent = '';
      }
    });

    emailInput.addEventListener('input', function () {
      if (validateEmail(this.value.trim())) {
        this.classList.remove('error');
        emailError.textContent = '';
      }
    });

    messageInput.addEventListener('input', function () {
      if (this.value.trim()) {
        this.classList.remove('error');
        messageError.textContent = '';
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter your email.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter a valid email.';
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageInput.classList.add('error');
        messageError.textContent = 'Please enter a message.';
        isValid = false;
      }

      if (isValid) {
        formSuccess.classList.add('show');
        form.reset();

        setTimeout(function () {
          formSuccess.classList.remove('show');
        }, 5000);
      }
    });
  }

  /* ----------------------------------------
     BACK TO TOP
     ---------------------------------------- */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');

    if (!btn) return;

    btn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  /* ----------------------------------------
     SCROLL HANDLER (THROTTLED)
     ---------------------------------------- */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        handleNavScroll();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  /* ----------------------------------------
     KEYBOARD NAVIGATION — ESC to close menu
     ---------------------------------------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  /* ----------------------------------------
     INITIALIZE
     ---------------------------------------- */
  function init() {
    initCursor();
    initSkills();
    initProjects();
    initThemeToggle();
    initImageFallbacks();
    initLeetCode();
    initTypewriter();
    revealHero();
    initScrollReveal();
    initSmoothScroll();
    initContactForm();
    initBackToTop();

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial calls
    handleNavScroll();
    updateActiveLink();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
