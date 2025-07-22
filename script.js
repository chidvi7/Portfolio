// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  // Toggle mobile menu
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
  // Active section highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }
  // Animate skill bars
  function animateSkillBars() {
    const skillsSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillsSection) return;
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      skillBars.forEach((bar, index) => {
        if (!bar.classList.contains('animated')) {
          setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            bar.classList.add('animated');
          }, index * 200);
        }
      });
    }
  }
  function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      bar.style.width = '0%';
      bar.classList.remove('animated');
    });
  }
  // Dark mode toggle
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-color-scheme', currentTheme);
  function updateThemeToggle(theme) {
    const sunIcon = themeToggle?.querySelector('.sun-icon');
    const moonIcon = themeToggle?.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
      } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
      }
    }
  }
  if (themeToggle) {
    updateThemeToggle(currentTheme);
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-color-scheme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-color-scheme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggle(newTheme);
    });
  }
  // Animations & scroll handlers
  initializeSkillBars();
  window.addEventListener('scroll', function () {
    animateSkillBars();
    updateActiveNavLink();
  });
  // Initial trigger
  animateSkillBars();
  updateActiveNavLink();
});
