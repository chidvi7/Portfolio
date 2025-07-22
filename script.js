// Smooth scrolling for navigation menu links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      const targetSection = document.querySelector(href);
      const yOffset = -72; // Adjust if your navbar height varies
      const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Close mobile menu if open
      if(window.innerWidth < 700) {
        document.getElementById('mobile-menu').classList.remove('active');
        document.getElementById('nav-menu').classList.remove('active');
      }
    }
  });
});

// Update active link in the menu bar based on scroll position
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll("section[id]")];
window.addEventListener('scroll', () => {
  let scroll = window.scrollY + 82;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) {
      if (scroll >= sec.offsetTop && scroll < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
});

// Mobile navigation toggle functionality
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}
