// Force page to top on load/reload
window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function () {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Mobile menu functionality
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

// Search functionality with suggestions
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchIcon = document.querySelector('.search-icon');

// Show suggestions when typing
searchInput.addEventListener('input', function () {
    const query = this.value.trim();
    if (query.length > 0) {
        searchSuggestions.classList.add('active');
    } else {
        searchSuggestions.classList.remove('active');
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('.search-box')) {
        searchSuggestions.classList.remove('active');
    }
});

// Handle suggestion clicks
document.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', function () {
        const text = this.querySelector('.suggestion-text').textContent;
        searchInput.value = text;
        searchSuggestions.classList.remove('active');
        performSearch();
    });
});

// Search functionality
function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        console.log('Searching for:', query);
        // Implement search functionality here
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

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Escape key to close mobile menu and search suggestions
    if (e.key === 'Escape') {
        closeMobileMenu();
        searchSuggestions.classList.remove('active');
    }

    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
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

    const sections = document.querySelectorAll('.search-section, .tools-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

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

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const mobileMenu = document.getElementById('mobileMenu');

        if (diffX < 0 && !mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        } else if (diffX > 0 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }

    touchStartX = 0;
    touchStartY = 0;
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('AI Compass homepage loaded');
    initScrollAnimations();
    document.body.classList.add('loaded');
});

// Page visibility API for pausing animations when tab is not active
document.addEventListener('visibilitychange', function () {
    const cards = document.querySelectorAll('.floating-card');

    if (document.hidden) {
        cards.forEach(card => {
            card.style.animationPlayState = 'paused';
        });
    } else {
        cards.forEach(card => {
            card.style.animationPlayState = 'running';
        });
    }
});