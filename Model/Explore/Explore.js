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
searchInput.addEventListener('input', function() {
    const query = this.value.trim();
    if (query.length > 0) {
        searchSuggestions.classList.add('active');
    } else {
        searchSuggestions.classList.remove('active');
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.search-box')) {
        searchSuggestions.classList.remove('active');
    }
});

// Handle suggestion clicks
document.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', function() {
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
        // This is where you would integrate with your backend
        // Example: filterTools(query);
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

// View toggle functionality
const viewBtns = document.querySelectorAll('.view-btn');
const toolsGrid = document.getElementById('toolsGrid');

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (btn.textContent.includes('List')) {
            toolsGrid.classList.add('list-view');
        } else {
            toolsGrid.classList.remove('list-view');
        }
    });
});

// Sort functionality
const sortBtns = document.querySelectorAll('.sort-btn');
sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        console.log('Sorting by:', btn.textContent);
    });
});

// Filter functionality
const filterDropdowns = document.querySelectorAll('.filter-dropdown');
filterDropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', (e) => {
        console.log('Filter changed:', e.target.value);
    });
});

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
document.addEventListener('keydown', function(e) {
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Explore page loaded');
});