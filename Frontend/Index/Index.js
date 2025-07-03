// Force page to top on load/reload
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

// Enhanced mobile menu functionality - EXACT COPY FROM ABOUT
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

// Interactive functionality for existing elements
const toolItems = document.querySelectorAll('.tool-item');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

// Tool items interaction
toolItems.forEach(item => {
    item.addEventListener('click', () => {
        // Simulate click effect
        item.style.transform = 'translateY(-2px) scale(0.98)';
        setTimeout(() => {
            item.style.transform = 'translateY(-4px)';
        }, 150);
    });
});

// Search functionality
function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        console.log('Searching for:', query);
        // Implement search functionality
        // This could redirect to explore page with search query
        // window.location.href = `../Explore/Explore.html?search=${encodeURIComponent(query)}`;
    }
}

if (searchIcon) {
    searchIcon.addEventListener('click', performSearch);
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Category chips interaction
const categoryChips = document.querySelectorAll('.category-chip');
categoryChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all chips
        categoryChips.forEach(c => c.classList.remove('active'));
        // Add active class to clicked chip
        chip.classList.add('active');
        console.log('Category selected:', chip.textContent);
    });
});

// Smooth scrolling for internal anchor links
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

// Hero stats animation on page load
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Since we're showing 0 for now, we can animate from 0 to 0
    // But this function is ready for when you have real numbers
    statNumbers.forEach((stat, index) => {
        const finalNumber = parseInt(stat.textContent) || 0;
        let current = 0;
        
        // Animation delay for each stat
        setTimeout(() => {
            const increment = Math.ceil(finalNumber / 20) || 1;
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    current = finalNumber;
                    clearInterval(timer);
                }
                stat.textContent = current.toLocaleString();
            }, 50);
        }, index * 200);
    });
}

// Floating cards enhanced animation - NO JS INTERFERENCE
function enhanceFloatingCards() {
    // Completely removed all JavaScript interaction with floating cards
    // Let CSS handle everything
    console.log('Floating cards initialized - CSS only');
}

// Intersection Observer for animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.search-section, .tools-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
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
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
    
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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Compass homepage loaded');
    
    // Initialize animations and interactions
    animateStats();
    enhanceFloatingCards();
    initScrollAnimations();
    
    // Initial resize check
    handleResize();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Page visibility API for pausing animations when tab is not active
document.addEventListener('visibilitychange', function() {
    const cards = document.querySelectorAll('.floating-card');
    
    if (document.hidden) {
        // Pause animations when tab is hidden
        cards.forEach(card => {
            card.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab is visible
        cards.forEach(card => {
            card.style.animationPlayState = 'running';
        });
    }
});

// Preload critical images/resources for better performance
function preloadResources() {
    // If you add images later, preload them here
    // const imagesToPreload = ['logo.png', 'hero-bg.jpg'];
    // imagesToPreload.forEach(src => {
    //     const img = new Image();
    //     img.src = src;
    // });
}

// Initialize preloading
preloadResources();