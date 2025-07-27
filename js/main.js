// Main JavaScript for Aaron Brier's Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initMobileMenu();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Navbar background on scroll
    initNavbarScroll();
    
    // Typing animation for hero section
    initTypingAnimation();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // Dynamic years of experience
    updateYearsExperience();
});

// Mobile menu toggle functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link (mobile)
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar background change on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Fade transition animation for hero subtitle
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const roles = [
        'Software Development Engineer II @ Amazon',
        'AWS Services Specialist', 
        'Distributed Systems Engineer',
        'Mentor & Technical Leader'
    ];
    
    let currentRole = 0;
    
    function fadeToNextRole() {
        // Fade out
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // Change text
            currentRole = (currentRole + 1) % roles.length;
            subtitle.textContent = roles[currentRole];
            
            // Fade in
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 500);
        
        // Schedule next transition
        setTimeout(fadeToNextRole, 4000);
    }
    
    // Set initial transition style
    subtitle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Start animation after a delay
    setTimeout(fadeToNextRole, 3000);
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .project-card, .skill-tag, .section-title, .about-content p'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility function to add CSS animation classes
function addAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animation styles */
        .timeline-item,
        .project-card,
        .skill-tag,
        .section-title,
        .about-content p {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .timeline-item.animate-in,
        .project-card.animate-in,
        .skill-tag.animate-in,
        .section-title.animate-in,
        .about-content p.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-tag.animate-in {
            transition-delay: calc(var(--i) * 0.1s);
        }
        
        .timeline-item.animate-in {
            transition-delay: calc(var(--i) * 0.2s);
        }
        
        .project-card.animate-in {
            transition-delay: calc(var(--i) * 0.15s);
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                border-top: 1px solid #e2e8f0;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                z-index: 999;
            }
            
            .nav-links.active {
                transform: translateX(0);
            }
            
            .nav-links ul {
                flex-direction: column;
                padding: 2rem 0;
                gap: 1rem;
            }
            
            .nav-links li {
                width: 100%;
                text-align: center;
            }
            
            .nav-links a {
                display: block;
                padding: 1rem;
                width: 100%;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        /* Navbar scroll effect */
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        /* Loading animation for profile image */
        .profile {
            animation: fadeInScale 1s ease-out 0.5s both;
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        /* Pulse animation for contact links */
        .contact-link:hover {
            animation: pulse 0.6s ease-in-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animation CSS
addAnimationCSS();

// Add animation delay variables to elements
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--i', index);
    });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
});

// Email contact functionality
function initContactForm() {
    const contactButtons = document.querySelectorAll('a[href^="mailto:"]');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track analytics event if Google Analytics is loaded
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'method': 'email'
                });
            }
        });
    });
}

// External link tracking
function initExternalLinkTracking() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (typeof gtag !== 'undefined') {
                const linkText = this.textContent || this.innerText;
                gtag('event', 'click', {
                    'event_category': 'external_link',
                    'event_label': linkText,
                    'transport_type': 'beacon'
                });
            }
        });
    });
}

// Initialize additional functionality
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initExternalLinkTracking();
});

// Scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollButton);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: #3182ce;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(100px);
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(49, 130, 206, 0.4);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .scroll-to-top:hover {
            background: #2c5aa0;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(49, 130, 206, 0.6);
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Calculate and update years of experience dynamically
function updateYearsExperience() {
    const startDate = new Date('2022-07-01'); // Started at Amazon in August 2022
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const diffInMs = currentDate - startDate;
    
    // Convert to years with decimal precision
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    
    // Format the experience text
    const years = Math.floor(diffInYears);
    const experienceText = `over ${years} years`;
    
    // Update the DOM element
    const experienceElement = document.getElementById('years-experience');
    if (experienceElement) {
        experienceElement.textContent = experienceText;
    }
}
