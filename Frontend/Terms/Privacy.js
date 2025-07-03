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

// Smooth scrolling for table of contents
document.querySelectorAll('.toc-list a').forEach(anchor => {
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

// Enhanced section highlighting and progress tracking
const sections = document.querySelectorAll('.policy-content');
const tocLinks = document.querySelectorAll('.toc-list a');
const toc = document.querySelector('.toc');
const lastSection = document.querySelector('#contact'); // Section 12 - Contact Us

function updateTOCHighlight() {
    let current = '';
    let scrollProgress = 0;
    
    // Calculate scroll progress
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    scrollProgress = (scrolled / documentHeight) * 100;
    
    // Update progress indicator
    if (toc) {
        toc.style.setProperty('--progress', `${Math.min(scrollProgress, 100)}%`);
    }
    
    // Handle TOC sliding up when reaching end of section 12
    if (toc && lastSection) {
        const lastSectionRect = lastSection.getBoundingClientRect();
        const lastSectionBottom = lastSection.offsetTop + lastSection.offsetHeight;
        const tocRect = toc.getBoundingClientRect();
        const tocBottom = window.scrollY + tocRect.bottom;
        
        // If user has scrolled past the bottom of section 12, slide up the TOC
        if (window.scrollY + window.innerHeight > lastSectionBottom + 50) {
            toc.style.transform = 'translateY(-100%)';
            toc.style.opacity = '0';
        } else {
            toc.style.transform = 'translateY(0)';
            toc.style.opacity = '1';
        }
    }
    
    // Find current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
            current = section.getAttribute('id');
        }
    });

    // Update TOC links
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Throttled scroll event for better performance
let scrollTimeout;
function throttledScroll() {
    if (scrollTimeout) {
        return;
    }
    scrollTimeout = setTimeout(() => {
        updateTOCHighlight();
        scrollTimeout = null;
    }, 10);
}

window.addEventListener('scroll', throttledScroll);

// Initial highlight
updateTOCHighlight();

// Add animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Animate TOC items on load
    const tocItems = document.querySelectorAll('.toc-list a');
    tocItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 50);
    });
});