// Set current year in copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();

// ==================== DOM ELEMENTS ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const formSpinner = document.getElementById('formSpinner');
const themeSwitch = document.getElementById('themeSwitch');

// ==================== THEME TOGGLE FUNCTIONALITY ====================

/**
 * Initialize theme from localStorage or system preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        document.body.classList.add('light-mode');
        themeSwitch.checked = true;
        
    } else {
        document.body.classList.remove('light-mode');
        themeSwitch.checked = false;
        
    }
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    if (themeSwitch.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        
    }
}

// ==================== NAVIGATION FUNCTIONALITY ====================

/**
 * Toggle mobile menu visibility
 */
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    
});

/**
 * Close mobile menu when clicking on navigation links
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
    });
});

/**
 * Close mobile menu when clicking outside
 */
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
    }
});

/**
 * Add scroll effect to navbar
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== ABOUT SECTION TABS ====================

/**
 * Tab functionality for About section
 */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding tab pane
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        
    });
});

// ==================== TYPEWRITER EFFECT ====================

/**
 * Typewriter animation for hero section
 */
const texts = ["Frontend Developer", "UI/UX Designer", "Web Developer", "Problem Solver"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function typeWriter() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    document.querySelector(".animated-text").textContent = letter;
    
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(typeWriter, 2000); // Wait 2 seconds before starting next text
    } else {
        setTimeout(typeWriter, 100); // Typing speed
    }
}

// ==================== ANIMATED STATISTICS COUNTERS ====================

/**
 * Animated number counters for stats section
 */
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ==================== EMAILJS INTEGRATION ====================

/**
 * EmailJS Configuration - Replace with your actual credentials
 * IMPORTANT: Replace these values with your actual EmailJS credentials
 */
const EMAILJS_CONFIG = {
    serviceId: 'service_jc26cuj', // Replace with your EmailJS service ID
    templateId: 'template_gdxownv', // Replace with your EmailJS template ID
    publicKey: 'UCArpK50AMWN8hVjB' 
};

/**
 * Initialize EmailJS with public key
 * Note: EmailJS is already initialized in the HTML head section
 */


/**
 * Handle contact form submission with EmailJS
 */
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        
        
        // Form validation
        if (!name || !email || !subject || !message) {
            showError('Please fill in all fields');
            
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: name,
                reply_to: email,
                subject: subject,
                message: message,
                to_name: 'Mahendra',
                to_email: 'mahendra201118@gmail.com',
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            };
            
            
            
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            console.log('EmailJS Response:', response);
            
            // Handle success
            if (response.status === 200) {
                showSuccess('Message sent successfully! I will get back to you within 24 hours.');
                contactForm.reset();
                
            } else {
                throw new Error('Failed to send message - Status: ' + response.status);
            }
            
        } catch (error) {
            
            showError('Failed to send message. Please try again or contact me directly at mahendra201118@gmail.com');
        } finally {
            // Reset loading state
            setLoadingState(false);
        }
    });
}

/**
 * Validate email format using regex
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show loading state on submit button
 */
function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        formSpinner.style.display = 'flex';
        submitBtn.style.opacity = '0.8';
        
    } else {
        submitBtn.disabled = false;
        submitText.style.display = 'block';
        formSpinner.style.display = 'none';
        submitBtn.style.opacity = '1';
        
    }
}

/**
 * Show success message with custom text
 */
function showSuccess(message) {
    // Hide any previous error messages
    formError.style.display = 'none';
    
    // Update success message
    const successContent = formSuccess.querySelector('.success-content p');
    if (successContent && message) {
        successContent.textContent = message;
    }
    
    // Show success message
    formSuccess.style.display = 'flex';
    
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        formSuccess.style.display = 'none';
        
    }, 5000);
}

/**
 * Show error message with custom text
 */
function showError(message) {
    const errorContent = document.querySelector('.error-content p');
    if (errorContent && message) {
        errorContent.textContent = message;
    }
    formError.style.display = 'flex';
    
    
    // Hide error message after 5 seconds
    setTimeout(() => {
        formError.style.display = 'none';
        
    }, 5000);
}

// ==================== SMOOTH SCROLLING ====================

/**
 * Smooth scrolling for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
               
            }
            
            // Smooth scroll to target with offset for fixed navbar
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            
        }
    });
});

// ==================== ANIMATION ON SCROLL ====================

/**
 * Intersection Observer for animating elements when they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            
            // Animate progress bars in skills section
            if (entry.target.id === 'skill') {
                const progressBars = document.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                        
                    }, 300);
                });
            }
        }
    });
}, observerOptions);

/**
 * Observe sections for animation triggers
 */
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==================== PARALLAX EFFECT ====================

/**
 * Add parallax effect to hero section shapes
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.bg-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// ==================== ACTIVE NAVIGATION HIGHLIGHT ====================

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = navbar.offsetHeight;
        
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==================== PAGE INITIALIZATION ====================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    
    
    // Initialize theme
    initTheme();
    
    // Add event listener for theme toggle
    if (themeSwitch) {
        themeSwitch.addEventListener('change', toggleTheme);
    }
    
    // Start typewriter effect with delay
    setTimeout(typeWriter, 1000);
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial call to set active navigation
    updateActiveNav();
    
    // Initialize animated stats
    animateStats();
    
    // Set current year in footer copyright
    const yearSpan = document.querySelector('.copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
        
    }
    
    // Add event listeners for smooth scrolling on all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/**
 * Helper function to throttle scroll events for performance
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Throttle scroll-intensive functions
window.addEventListener('scroll', throttle(updateActiveNav, 100));
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.bg-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
}, 50));

/**
 * Handle newsletter form submission
 */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Here you would typically send this to your newsletter service
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

/**
 * Add hover effects to social icons
 */
const socialIcons = document.querySelectorAll('.social-icon, .footer-social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) scale(1)';
    });
});

/**
 * Add click animation to buttons
 */
const buttons = document.querySelectorAll('.btn, .hire-btn, .project-link, .submit-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
    }
    
    // Tab key navigation in mobile menu
    if (navMenu.classList.contains('active') && e.key === 'Tab') {
        const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

/**
 * Add CSS for ripple animation
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

