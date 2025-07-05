// Reduced AI Tool Categories Data (only 6 categories)
const aiCategories = [
    {
        name: "Content Creation",
        slug: "content-creation",
        icon: "✍️",
        toolCount: 45,
        description: "AI-powered tools for writing, copywriting, and content generation. Create blog posts, articles, social media content, and more.",
        tags: ["Writing", "Copywriting", "Blogging", "Social Media"],
        badge: "Popular"
    },
    {
        name: "Image Generation",
        slug: "image-generation",
        icon: "🎨",
        toolCount: 32,
        description: "Create stunning visual content with AI. Generate artwork, logos, photos, and designs from text descriptions.",
        tags: ["Art", "Design", "Photos", "Graphics"],
        badge: "Trending"
    },
    {
        name: "Code & Development",
        slug: "code-development",
        icon: "💻",
        toolCount: 28,
        description: "AI coding assistants and development tools. Write, debug, and optimize code faster with intelligent suggestions.",
        tags: ["Programming", "Debugging", "Documentation", "APIs"],
        badge: ""
    },
    {
        name: "Video & Animation",
        slug: "video-animation",
        icon: "🎬",
        toolCount: 24,
        description: "Create and edit videos with AI. Generate animations, add effects, and produce professional video content.",
        tags: ["Video Editing", "Animation", "Effects", "Production"],
        badge: ""
    },
    {
        name: "Business & Marketing",
        slug: "business-marketing",
        icon: "📈",
        toolCount: 38,
        description: "AI tools for business growth and marketing. Analyze data, generate leads, create campaigns, and optimize strategies.",
        tags: ["Analytics", "Lead Generation", "SEO", "Automation"],
        badge: "Popular"
    },
    {
        name: "Data & Analytics",
        slug: "data-analytics",
        icon: "📊",
        toolCount: 26,
        description: "Extract insights from data with AI. Analyze patterns, create visualizations, and make data-driven decisions.",
        tags: ["Data Analysis", "Visualization", "Machine Learning", "Statistics"],
        badge: ""
    }
];

let originalCategories = [...aiCategories];
let filteredCategories = [...aiCategories];

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        mobileMenu.classList.add('active');
        menuBtn.innerHTML = '✕';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    mobileMenu.classList.remove('active');
    menuBtn.innerHTML = '☰';
}

// Search functionality with suggestions
const searchInput = document.getElementById('categorySearch');
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
        searchCategories();
    });
});

// Search functionality
function searchCategories() {
    const query = document.getElementById('categorySearch').value.trim().toLowerCase();

    if (query) {
        filteredCategories = originalCategories.filter(category => {
            return category.name.toLowerCase().includes(query) ||
                category.description.toLowerCase().includes(query) ||
                category.tags.some(tag => tag.toLowerCase().includes(query));
        });
    } else {
        filteredCategories = [...originalCategories];
    }

    loadCategories(filteredCategories);
}

// Real-time search
document.addEventListener('DOMContentLoaded', function () {
    let searchTimeout;

    searchInput.addEventListener('input', function (e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.trim();
            if (query.length >= 2 || query.length === 0) {
                searchCategories();
            }
        }, 300);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCategories();
            searchSuggestions.classList.remove('active');
        }
    });

    if (searchIcon) {
        searchIcon.addEventListener('click', function () {
            searchCategories();
            searchSuggestions.classList.remove('active');
        });
    }
});

// Sort functionality
function sortCategories(sortBy = 'name') {
    switch (sortBy) {
        case 'name':
            filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'tools':
            filteredCategories.sort((a, b) => b.toolCount - a.toolCount);
            break;
        case 'popular':
            filteredCategories.sort((a, b) => {
                const aPop = a.badge === 'Popular' || a.badge === 'Trending' ? 1 : 0;
                const bPop = b.badge === 'Popular' || b.badge === 'Trending' ? 1 : 0;
                return bPop - aPop;
            });
            break;
    }
    loadCategories(filteredCategories);
}

// Clear search
function clearSearch() {
    document.getElementById('categorySearch').value = '';
    document.getElementById('sortSelect').value = 'name';
    filteredCategories = [...originalCategories];
    sortCategories('name');
    searchSuggestions.classList.remove('active');
}

// View toggle
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const categoriesGrid = document.getElementById('categoriesGrid');
            if (this.dataset.view === 'list') {
                categoriesGrid.classList.add('list-view');
            } else {
                categoriesGrid.classList.remove('list-view');
            }
        });
    });
});

// Load categories
function loadCategories(categories = aiCategories) {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const emptyState = document.getElementById('emptyState');
    const categoriesTitle = document.getElementById('categoriesTitle');

    if (categories.length === 0) {
        emptyState.style.display = 'block';
        categoriesGrid.style.display = 'none';
        categoriesTitle.textContent = 'AI Categories';
        return;
    }

    emptyState.style.display = 'none';
    categoriesGrid.style.display = 'grid';

    categoriesTitle.textContent = 'AI Categories';

    categoriesGrid.innerHTML = '';

    categories.forEach((category, index) => {
        const categoryCard = createCategoryCard(category);
        categoriesGrid.appendChild(categoryCard);
    });
}

// Create category card
function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';

    card.innerHTML = `
                <div class="category-header">
                    <div class="category-icon">${category.icon}</div>
                    <div class="category-info">
                        <h3>${category.name}</h3>
                        <div class="category-count">${category.toolCount} tools</div>
                    </div>
                </div>
                <div class="category-description">
                    ${category.description}
                </div>
                <div class="category-tags">
                    ${category.tags.map(tag => `<span class="category-tag" onclick="filterByTag('${tag}')">${tag}</span>`).join('')}
                </div>
                <div class="category-footer">
                    ${category.badge ? `<div class="category-popular">${category.badge}</div>` : '<div></div>'}
                    <div class="category-arrow">→</div>
                </div>
            `;

    card.addEventListener('click', function (e) {
        if (!e.target.classList.contains('category-tag')) {
            console.log(`📂 ${category.name} category selected - ${category.toolCount} tools available`);
        }
    });

    return card;
}

// Filter by tag
function filterByTag(tag) {
    filteredCategories = originalCategories.filter(category =>
        category.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
    loadCategories(filteredCategories);
    document.getElementById('categorySearch').value = tag;
    searchSuggestions.classList.remove('active');
    console.log(`🏷️ Filtered by "${tag}" - ${filteredCategories.length} categories`);
}

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Escape key to close search suggestions and mobile menu
    if (e.key === 'Escape') {
        searchSuggestions.classList.remove('active');
        closeMobileMenu();
    }

    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
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

// Initialize page - REMOVED the success message
document.addEventListener('DOMContentLoaded', function () {
    loadCategories(aiCategories);
});