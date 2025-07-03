// Force page to top on load/reload - same as Index page
window.addEventListener('beforeunload', function() {
    // Store scroll position as 0 before page unloads
    window.scrollTo(0, 0);
});

// Also force to top when page loads
window.addEventListener('load', function() {
    // Force scroll to top after everything loads
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

// Additional backup method
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Enhanced mobile menu functionality - EXACT COPY FROM INDEX
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        mobileMenu.classList.add('active');
        menuBtn.innerHTML = '✕';
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenu.classList.remove('active');
    menuBtn.innerHTML = '☰';
    document.body.style.overflow = 'auto';
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Enhanced card animations - excluding values cards from scroll animation
function initCardAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Only animate mission/vision cards and stats cards, not values cards
    document.querySelectorAll('.mv-card, .stat-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        cardObserver.observe(card);
    });
}

// Animated counter for stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                const finalNumber = parseInt(finalText.replace(/,/g, ''));
                
                let current = 0;
                const increment = Math.ceil(finalNumber / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalNumber) {
                        current = finalNumber;
                        clearInterval(timer);
                    }
                    target.textContent = current.toLocaleString();
                }, 40);
                
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Enhanced button ripple effect
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .cta-btn, .submit-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Enhanced card hover effects - removed 3D tilt for better performance
function initAdvancedHoverEffects() {
    const cards = document.querySelectorAll('.mv-card, .value-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 15px 35px rgba(0, 255, 157, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset to default shadow
            this.style.boxShadow = '';
        });
    });
}

// Loading animation for page
function initPageAnimations() {
    // Fade in animation for sections
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// Responsive helper functions
function handleResize() {
    const width = window.innerWidth;
    
    // Close mobile menu if screen gets larger
    if (width > 768) {
        closeMobileMenu();
    }
}

// Debounced resize handler for better performance
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
});

// Additional keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + M to toggle mobile menu (for testing)
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        toggleMobileMenu();
    }
});

// Touch gesture support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Detect swipe right to open menu (when closed) or swipe left to close menu (when open)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (diffX < 0 && !mobileMenu.classList.contains('active')) {
            // Swipe right - open menu
            toggleMobileMenu();
        } else if (diffX > 0 && mobileMenu.classList.contains('active')) {
            // Swipe left - close menu
            closeMobileMenu();
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// Page visibility API for pausing animations when tab is not active
document.addEventListener('visibilitychange', function() {
    const particles = document.querySelectorAll('.particle');
    
    if (document.hidden) {
        // Pause animations when tab is hidden
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab is visible
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});

// Enhanced intersection observer for better performance
function initPerformantAnimations() {
    const observerOptions = {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '0px 0px -20% 0px'
    };
    
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const ratio = entry.intersectionRatio;
            
            if (ratio > 0.1) {
                element.classList.add('visible');
                element.style.opacity = Math.min(ratio * 2, 1);
                element.style.transform = `translateY(${(1 - ratio) * 30}px)`;
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.mv-card, .value-card, .stat-card').forEach(el => {
        performanceObserver.observe(el);
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function for throttling
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
    }
}

// Preload images for better performance
function preloadImages() {
    const imagesToPreload = [
        '../Graphics/Logo.png'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Sparks About page loaded');
    
    // Initialize all features
    createParticles();
    initCardAnimations();
    animateStats();
    addRippleEffect();
    initSmoothScrolling();
    initParallax();
    initAdvancedHoverEffects();
    initPageAnimations();
    initPerformantAnimations();
    preloadImages();
    
    // Initial updates
    handleResize();
    
    // Add loading completion class
    document.body.classList.add('loaded');
    
    // Log performance metrics if available
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// Handle reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        closeMobileMenu
    };
}