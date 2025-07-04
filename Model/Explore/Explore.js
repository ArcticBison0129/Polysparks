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

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            console.log('Searching for:', e.target.value);
        });

        // Filter functionality
        const filterDropdowns = document.querySelectorAll('.filter-dropdown');
        filterDropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', (e) => {
                console.log('Filter changed:', e.target.value);
            });
        });