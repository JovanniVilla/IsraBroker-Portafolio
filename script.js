document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Reveal Animation on Scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Smooth scrolling for internal links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .footer-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Adjust scroll position for fixed navbar
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // 4. Counter Animation for Interactive Badges
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // The lower the slower

    const counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, revealOptions);

    // 5. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksList = document.querySelector('.nav-links');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksList.classList.toggle('active');
        // Prevent scroll when menu is open
        body.style.overflow = navLinksList.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksList.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });
});
