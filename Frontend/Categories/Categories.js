// Force page to top on load/reload - same as other pages
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

// Enhanced mobile menu functionality - EXACT COPY FROM OTHER PAGES
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
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('categorySearch').focus();
    }
});

// Simple search functionality
function searchCategories() {
    const query = document.getElementById('categorySearch').value.trim();
    
    if (query) {
        console.log('Searching for categories:', query);
        showMessage(`🔍 Searched for "${query}" - No categories found yet`, 'info');
    } else {
        showMessage('Please enter a search term', 'info');
    }
}

// Enter key search
document.getElementById('categorySearch').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchCategories();
    }
});

// View toggle functionality
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all view buttons
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Toggle grid view
        const categoriesGrid = document.getElementById('categoriesGrid');
        if (this.dataset.view === 'list') {
            categoriesGrid.classList.add('list-view');
        } else {
            categoriesGrid.classList.remove('list-view');
        }
        
        // Save preference
        localStorage.setItem('preferredCategoriesView', this.dataset.view);
        
        showMessage(`📋 Switched to ${this.dataset.view} view`, 'success');
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

// Message system
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message based on type
    const colors = {
        success: 'linear-gradient(135deg, #00ff9d, #00d4aa)',
        error: 'linear-gradient(135deg, #ff4444, #cc3333)',
        info: 'linear-gradient(135deg, #4444ff, #3333cc)'
    };
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${colors[type] || colors.info};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 300px;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Show message
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide message after 4 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(400px)';
        setTimeout(() => messageDiv.remove(), 400);
    }, 4000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.search-box, .empty-state, .categories-header').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Initialize categories display
function initializeCategories() {
    // Since we have no categories, show empty state
    const categoriesGrid = document.getElementById('categoriesGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (categoriesGrid && emptyState) {
        categoriesGrid.innerHTML = '';
        emptyState.style.display = 'block';
    }
}

// Future function to load categories when they become available
function loadCategories(categories = []) {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const emptyState = document.getElementById('emptyState');
    const categoriesTitle = document.getElementById('categoriesTitle');
    
    if (categories.length === 0) {
        emptyState.style.display = 'block';
        categoriesGrid.style.display = 'none';
        categoriesTitle.textContent = 'AI Categories';
        return;
    }
    
    // Hide empty state and show grid
    emptyState.style.display = 'none';
    categoriesGrid.style.display = 'grid';
    categoriesTitle.textContent = `AI Categories (${categories.length})`;
    
    // Clear existing content
    categoriesGrid.innerHTML = '';
    
    // Create category cards
    categories.forEach((category, index) => {
        const categoryCard = createCategoryCard(category);
        categoryCard.style.animationDelay = `${index * 0.1}s`;
        categoriesGrid.appendChild(categoryCard);
    });
}

// Helper function to create category card (for future use)
function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.dataset.category = category.slug || '';
    card.dataset.tags = category.tags?.join(',') || '';
    
    card.innerHTML = `
        <div class="category-header">
            <div class="category-icon">${category.icon || '📁'}</div>
            <div class="category-info">
                <h3>${category.name}</h3>
                <div class="category-count">${category.toolCount || 0} tools</div>
            </div>
        </div>
        <div class="category-description">
            ${category.description || 'Explore AI tools in this category.'}
        </div>
        <div class="category-tags">
            ${category.tags?.map(tag => `<span class="category-tag">${tag}</span>`).join('') || ''}
        </div>
        <div class="category-footer">
            <div class="category-popular">${category.badge || ''}</div>
            <div class="category-arrow">→</div>
        </div>
    `;
    
    // Add click handler
    card.addEventListener('click', function() {
        console.log(`Navigating to ${category.name} category`);
        showMessage(`📂 ${category.name} category selected`, 'info');
        // In real implementation: window.location.href = `category/${category.slug}.html`;
    });
    
    return card;
}

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sparks Categories page loaded');
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize categories display
    initializeCategories();
    
    // Load saved view preference
    const savedView = localStorage.getItem('preferredCategoriesView');
    if (savedView) {
        const viewBtn = document.querySelector(`[data-view="${savedView}"]`);
        if (viewBtn) {
            viewBtn.click();
        }
    }
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is hidden
        document.querySelectorAll('.search-box, .category-card').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab is visible
        document.querySelectorAll('.search-box, .category-card').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

console.log('Sparks Categories page initialized');