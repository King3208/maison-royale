// ========================================
// Maison Royale - Search Functionality
// ========================================

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.trim().toLowerCase();

        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        const allProducts = getAllProducts();

        // Score-based search: name matches score higher than description
        const scored = allProducts
            .map(product => {
                const name = product.name.toLowerCase();
                const desc = product.description.toLowerCase();
                const cat = product.category.toLowerCase();
                // Split query into tokens for partial/multi-word matching
                const tokens = query.split(/\s+/).filter(Boolean);

                let score = 0;
                tokens.forEach(token => {
                    if (name.includes(token)) score += 10;
                    if (name.startsWith(token)) score += 5;
                    if (cat.includes(token)) score += 4;
                    if (desc.includes(token)) score += 2;
                    // Also check specs values
                    if (product.specs) {
                        const specsText = Object.values(product.specs).join(' ').toLowerCase();
                        if (specsText.includes(token)) score += 3;
                    }
                });
                return { product, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8)
            .map(item => item.product);

        if (scored.length === 0) {
            searchResults.innerHTML = `
                <div class="search-result-item" style="justify-content:center;padding:20px;">
                    <p style="color:#999;">No products found for "<strong>${escapeHtml(this.value.trim())}</strong>"</p>
                </div>
            `;
        } else {
            searchResults.innerHTML = scored.map(product => `
                <div class="search-result-item" onclick="window.location.href='product-details.html?id=${product.id}'">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="search-result-info">
                        <h4>${product.name}</h4>
                        <p>${formatPrice(product.price)}${product.isPhone ? ' from' : ''}</p>
                        <span class="search-result-cat">${product.category.replace('-', ' ')}</span>
                    </div>
                </div>
            `).join('');
        }

        searchResults.classList.add('active');
    }, 250));

    // Handle Enter key — redirect to first result
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim().toLowerCase();
            if (query.length < 2) return;
            const allProducts = getAllProducts();
            const match = allProducts.find(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
            if (match) window.location.href = `product-details.html?id=${match.id}`;
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
