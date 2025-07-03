// Force page to top on load/reload - same as Index/About
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Enhanced mobile menu functionality - EXACT COPY FROM INDEX/ABOUT
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
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Enhanced FAQ functionality with animations
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items with smooth animation
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = '0';
        }
    });
    
    // Toggle clicked item
    if (!isActive) {
        faqItem.classList.add('active');
        const answer = faqItem.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        
        // Smooth scroll to the opened FAQ
        setTimeout(() => {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 200);
    } else {
        faqItem.classList.remove('active');
        const answer = faqItem.querySelector('.faq-answer');
        answer.style.maxHeight = '0';
    }
}

// Enhanced form validation and submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Enhanced form validation
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    let isValid = true;
    let firstErrorField = null;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        const value = data[field];
        
        if (!value || value.trim() === '') {
            isValid = false;
            input.style.borderColor = '#ff4444';
            input.style.animation = 'shake 0.5s ease-in-out';
            
            if (!firstErrorField) {
                firstErrorField = input;
            }
            
            // Reset border color after animation
            setTimeout(() => {
                input.style.borderColor = '#333';
                input.style.animation = '';
            }, 500);
        }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailField = document.getElementById('email');
    if (data.email && !emailRegex.test(data.email)) {
        isValid = false;
        emailField.style.borderColor = '#ff4444';
        emailField.style.animation = 'shake 0.5s ease-in-out';
        
        if (!firstErrorField) {
            firstErrorField = emailField;
        }
        
        setTimeout(() => {
            emailField.style.borderColor = '#333';
            emailField.style.animation = '';
        }, 500);
    }
    
    if (!isValid) {
        showErrorMessage('Please fill in all required fields correctly.');
        if (firstErrorField) {
            firstErrorField.focus();
        }
        return;
    }
    
    // Simulate form submission with loading state
    const submitBtn = document.querySelector('.submit-form-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate API call
    setTimeout(() => {
        console.log('Form submitted:', data);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
        // Show success message
        showSuccessMessage('Message sent successfully! We\'ll get back to you within 24 hours.');
        
        // Reset form with animation
        this.reset();
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 2000);
});

// Enhanced success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    // Show message with animation
    setTimeout(() => successDiv.classList.add('show'), 100);
    
    // Hide message after 6 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 400);
    }, 6000);
}

// Enhanced error message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'success-message';
    errorDiv.style.background = 'linear-gradient(135deg, #ff4444, #cc3333)';
    errorDiv.style.color = '#fff';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    // Show message
    setTimeout(() => errorDiv.classList.add('show'), 100);
    
    // Hide message after 4 seconds
    setTimeout(() => {
        errorDiv.classList.remove('show');
        setTimeout(() => errorDiv.remove(), 400);
    }, 4000);
}

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add focus animations to form fields
    const formFields = document.querySelectorAll('input, textarea, select');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Real-time validation feedback
        field.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#00ff9d';
            } else {
                this.style.borderColor = '#333';
            }
        });
    });
    
    // Animate FAQ items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        faqObserver.observe(item);
    });
    
    // Animate contact form on scroll
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateY(50px)';
        contactForm.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const formObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        formObserver.observe(contactForm);
    }
});

// Smooth scrolling for anchor links
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
    
    // Detect swipe gestures for mobile menu
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

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Page visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause any ongoing animations when tab is hidden
        document.querySelectorAll('.faq-item, .contact-form').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab is visible
        document.querySelectorAll('.faq-item, .contact-form').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

console.log('Enhanced Sparks Contact page loaded');