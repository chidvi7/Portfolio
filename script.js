// === SMOOTH SCROLL FOR NAV MENU ITEMS ===
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const yOffset = -75; // adjust for sticky navbar height if needed
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // If mobile, close menu
      if (window.innerWidth < 700 && navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }
  });
});

// === MENU ACTIVE CLASS ON SCROLL ===
const sections = document.querySelectorAll("section[id]");
function activateMenu() {
  let scroll = window.scrollY + 90;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) {
      if (scroll >= sec.offsetTop && scroll < sec.offsetTop + sec.offsetHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}
window.addEventListener('scroll', activateMenu);

// === MOBILE NAV TOGGLE ===
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// === THEME (DARK / LIGHT) TOGGLE (with persistence) ===
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
if (themeToggle) {
  // init
  let theme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-color-scheme', theme);
  themeToggle.addEventListener('click', () => {
    let cTheme = root.getAttribute('data-color-scheme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-color-scheme', cTheme);
    localStorage.setItem('theme', cTheme);
  });
}

// === ANIMATED SKILL BARS ===
function animateSkillBars() {
  const skills = document.querySelectorAll('.skill-progress');
  const skillSection = document.getElementById('skills');
  let sectionTop = skillSection.getBoundingClientRect().top;
  let wh = window.innerHeight;
  if (sectionTop < wh - 100) {
    skills.forEach((bar, i) => {
      if (!bar.classList.contains('animated')) {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
          bar.classList.add('animated');
        }, i * 100);
      }
    });
  }
}
animateSkillBars();
window.addEventListener('scroll', animateSkillBars);

// === ANIME.JS: BUTTONS (pulse) & CARDS (fadeInUp) & SCROLL REVEAL ===
function animeScrollReveal() {
  document.querySelectorAll('.about, .skills, .projects, .experience, #education, .contact')
    .forEach((el, idx) => {
      const triggerTop = el.getBoundingClientRect().top;
      if (triggerTop < window.innerHeight - 80)
        if (!el.classList.contains('anime-faded')) {
          anime({
            targets: el,
            opacity: [0, 1],
            translateY: [40, 0],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: idx * 80
          });
          el.classList.add('anime-faded');
        }
    });
  // Stagger skill cards & project cards
  document.querySelectorAll('.skills-grid .skill-item, .projects-grid .project-card')
    .forEach((el, i) => {
      const trigger = el.getBoundingClientRect().top;
      if (trigger < window.innerHeight - 40)
        if (!el.classList.contains('anime-faded')) {
          anime({
            targets: el,
            opacity: [0, 1],
            translateY: [60, 0],
            scale: [0.94, 1],
            easing: 'easeOutElastic(1, .9)',
            duration: 1000,
            delay: i * 120
          });
          el.classList.add('anime-faded');
        }
    });
}
animeScrollReveal();
window.addEventListener('scroll', animeScrollReveal);

// === BUTTON AND ICON HOVER ANIMATIONS (anime.js, for .icon-btn & .social-link) ===
document.querySelectorAll('.icon-btn, .social-link').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    anime.remove(btn);
    anime({
      targets: btn,
      scale: [1, 1.14, 1],
      rotate: [0, -9, 0],
      duration: 700,
      elasticity: 500
    });
  });
});

