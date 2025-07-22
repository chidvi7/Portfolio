document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Optional: Update active class for navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Intersection Observer for "on-scroll" animations
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Stagger animations for items within the section
                const itemsToAnimate = entry.target.querySelectorAll(
                    '.skill-item, .job-entry, .education-entry, .project-entry, #certifications li, .contact-info p'
                );
                itemsToAnimate.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`; // Stagger by 0.1s
                    if (item.classList.contains('skill-item')) {
                         // Apply specific popIn animation for skills
                         item.style.animationName = 'popIn';
                         item.style.animationFillMode = 'forwards';
                    } else if (item.closest('#certifications') && item.tagName === 'LI') {
                        // Apply slide-in from left for certification list items
                        item.style.animationName = 'slideInFromLeft';
                        item.style.animationFillMode = 'forwards';
                    }
                    else if (item.classList.contains('job-entry') || item.classList.contains('education-entry') || item.classList.contains('project-entry')) {
                        // Apply fade-in slide-up for job/education/project entries
                        item.style.animationName = 'fadeInSlideUp';
                        item.style.animationFillMode = 'forwards';
                    }
                    else if (item.closest('#contact') && item.tagName === 'P') {
                        // Apply fade-in slide-up for contact info paragraphs
                        item.style.animationName = 'fadeInSlideUp';
                        item.style.animationFillMode = 'forwards';
                    }
                    else {
                        // Default fallback for other items if needed
                        item.style.animationName = 'fadeIn';
                        item.style.animationFillMode = 'forwards';
                    }
                });

                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Optional: Add active class to nav link based on scroll position
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust scroll position to account for sticky header
            const headerOffset = document.querySelector('.header').offsetHeight;
            if (pageYOffset >= (sectionTop - headerOffset - 50)) { // 50px buffer
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
