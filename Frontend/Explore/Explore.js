// Basic functionality for the search and filters
function searchTools() {
    const query = document.getElementById('toolSearch').value.trim();
    if (query) {
        console.log('Searching for:', query);
        // Implement search functionality here
        // This would typically make an API call to fetch filtered results
    }
}

// Enter key search
document.getElementById('toolSearch').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchTools();
    }
});

// View toggle functionality
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all view buttons
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Toggle grid view
        const toolsGrid = document.getElementById('toolsGrid');
        if (btn.dataset.view === 'list') {
            toolsGrid.classList.add('list-view');
        } else {
            toolsGrid.classList.remove('list-view');
        }
    });
});

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all filter buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        console.log('Filtering by:', filter);
        // Implement filter functionality here
        // This would typically filter the displayed tools
    });
});

// Sort functionality
document.getElementById('sortSelect').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    console.log('Sorting by:', sortBy);
    // Implement sort functionality here
    // This would typically reorder the displayed tools
});

// Search input real-time filtering (optional)
document.getElementById('toolSearch').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
        // Implement real-time search filtering
        console.log('Real-time search for:', query);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code can go here
    console.log('Explore page loaded');
    
    // Update results count when tools are loaded
    updateResultsCount(0);
});

// Helper function to update results count
function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${count} tools`;
    }
}

// Future function to load and display tools
function loadTools(filters = {}) {
    // This function would typically:
    // 1. Make an API call to fetch tools based on filters
    // 2. Update the tools grid with the results
    // 3. Update the results count
    // 4. Handle empty states
    
    console.log('Loading tools with filters:', filters);
    
    // Placeholder for now - in a real implementation this would fetch from an API
    const toolsGrid = document.getElementById('toolsGrid');
    const emptyState = document.querySelector('.empty-state');
    
    // Show empty state since we have no tools yet
    if (toolsGrid && emptyState) {
        toolsGrid.innerHTML = '';
        emptyState.style.display = 'block';
        updateResultsCount(0);
    }
}