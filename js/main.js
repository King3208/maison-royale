// ========================================
// Maison Royale - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initMobileMenu();
    initBackToTop();
    initFAQ();
    updateCartCount();
    initSearch();
    initProductDetails();
    initFilterButtons();
});

// Navigation scroll effect
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    const overlay = document.querySelector('.overlay');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', openMobileMenu);
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function openMobileMenu() {
    document.querySelector('.mobile-menu')?.classList.add('active');
    document.querySelector('.overlay')?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    document.querySelector('.mobile-menu')?.classList.remove('active');
    document.querySelector('.overlay')?.classList.remove('active');
    document.body.style.overflow = '';
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Toast Notification
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Product Details Page
function initProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) return;

    const product = getProductById(productId);
    if (!product) return;

    // Update page title
    document.title = `${product.name} - Maison Royale`;

    // Breadcrumb
    const categoryPageMap = {
        'kitchen': 'kitchen-household.html',
        'human-hair': 'human-hair.html',
        'hair-blends': 'hair-blends.html',
        'hair-accessories': 'hair-accessories.html',
        'gadgets': 'gadgets.html',
        'clothing': 'clothing.html'
    };
    const catLink = document.getElementById('breadcrumb-category-link');
    const catProd = document.getElementById('breadcrumb-product');
    if (catLink) {
        catLink.textContent = product.category.replace('-', ' ');
        catLink.href = categoryPageMap[product.category] || 'index.html';
    }
    if (catProd) catProd.textContent = product.name;

    // Populate core fields
    const mainImage = document.getElementById('detail-main-image');
    const productName = document.getElementById('detail-name');
    const productPrice = document.getElementById('detail-price');
    const productCategory = document.getElementById('detail-category');
    const productStock = document.getElementById('detail-stock');
    const productDescription = document.getElementById('detail-description');
    const specsTable = document.getElementById('detail-specs');
    const relatedContainer = document.getElementById('related-products');

    if (productName) productName.textContent = product.name;
    if (productCategory) productCategory.textContent = product.category.replace(/-/g, ' ').toUpperCase();

    if (productStock) {
        const stockClass = product.stock === 'in-stock' ? 'in-stock' : 'preorder';
        const stockText = product.stock === 'in-stock' ? 'In Stock' : 'Preorder';
        productStock.innerHTML = `<span class="stock-status ${stockClass}">${stockText}</span>`;
    }

    if (productDescription) productDescription.textContent = product.description;

    // Specs table
    if (specsTable && product.specs) {
        let specsHtml = '';
        for (const [key, value] of Object.entries(product.specs)) {
            specsHtml += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
        specsTable.innerHTML = specsHtml;
    }

    // Initialize multi-image gallery
    const productImages = product.images && product.images.length > 0
        ? product.images
        : [product.image];
    if (window.MaisonGallery) {
        window.MaisonGallery.init(productImages, product.name);
    } else if (mainImage) {
        mainImage.src = productImages[0];
        mainImage.alt = product.name;
    }

    // Related products
    if (relatedContainer) {
        const related = getRelatedProducts(product.category, product.id);
        relatedContainer.innerHTML = related.map(p => createProductCard(p)).join('');
    }

    // ---- Phone Variant Logic ----
    const variantSection = document.getElementById('variant-section');
    const addToCartBtn = document.getElementById('detail-add-cart');
    const preorderBtn = document.getElementById('detail-preorder');

    if (product.isPhone && product.ramOptions && product.storageOptions) {
        if (variantSection) variantSection.style.display = 'block';

        // Show starting price
        if (productPrice) productPrice.innerHTML = `<span id="price-display">${formatPrice(product.price)}</span><span class="price-from-label"> (select variant)</span>`;

        let selectedRam = null;
        let selectedStorage = null;

        // Build RAM buttons
        const ramButtons = document.getElementById('ram-buttons');
        if (ramButtons) {
            ramButtons.innerHTML = product.ramOptions.map(ram => `
                <button class="variant-btn" data-type="ram" data-value="${ram}" onclick="selectVariant('ram', '${ram}')">${ram}</button>
            `).join('');
        }

        // Build Storage buttons — filter to only valid combinations
        const storageButtons = document.getElementById('storage-buttons');
        if (storageButtons) {
            storageButtons.innerHTML = product.storageOptions.map(storage => {
                // Check if this storage option is available with any RAM
                const hasVariant = product.ramOptions.some(ram =>
                    product.variantPrices[`${ram}_${storage}`] !== undefined
                );
                return hasVariant
                    ? `<button class="variant-btn" data-type="storage" data-value="${storage}" onclick="selectVariant('storage', '${storage}')">${storage}</button>`
                    : `<button class="variant-btn" data-type="storage" data-value="${storage}" disabled title="Not available">${storage}</button>`;
            }).join('');
        }

        // Attach selectVariant to window scope
        window._productVariantState = { product, selectedRam: null, selectedStorage: null };

        window.selectVariant = function(type, value) {
            const state = window._productVariantState;

            // Toggle off if already selected
            if (type === 'ram') {
                state.selectedRam = (state.selectedRam === value) ? null : value;
            } else {
                state.selectedStorage = (state.selectedStorage === value) ? null : value;
            }

            // Update button active states
            document.querySelectorAll(`.variant-btn[data-type="${type}"]`).forEach(btn => {
                btn.classList.toggle('active', btn.dataset.value === (type === 'ram' ? state.selectedRam : state.selectedStorage));
            });

            // Update selected value labels
            const ramVal = document.getElementById('ram-selected-value');
            const storageVal = document.getElementById('storage-selected-value');
            if (ramVal) ramVal.textContent = state.selectedRam ? `— ${state.selectedRam}` : '';
            if (storageVal) storageVal.textContent = state.selectedStorage ? `— ${state.selectedStorage}` : '';

            // Update price if both selected
            const priceDisplay = document.getElementById('price-display');
            const fromLabel = document.querySelector('.price-from-label');
            const validation = document.getElementById('variant-validation');

            if (state.selectedRam && state.selectedStorage) {
                const variantPrice = getVariantPrice(state.product, state.selectedRam, state.selectedStorage);
                if (variantPrice) {
                    if (priceDisplay) priceDisplay.textContent = formatPrice(variantPrice);
                    if (fromLabel) fromLabel.textContent = '';
                    if (validation) validation.style.display = 'none';
                } else {
                    // Combination unavailable
                    if (priceDisplay) priceDisplay.textContent = 'N/A';
                    if (fromLabel) fromLabel.textContent = ' (variant unavailable)';
                    if (validation) {
                        validation.style.display = 'flex';
                        document.getElementById('variant-validation-msg').textContent = 'This RAM/Storage combination is not available. Please choose a different option.';
                    }
                }
            } else {
                if (fromLabel) fromLabel.textContent = ' (select variant)';
                if (validation) validation.style.display = 'none';
            }
        };

        // Add to cart with validation
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const state = window._productVariantState;
                const validation = document.getElementById('variant-validation');
                const valMsg = document.getElementById('variant-validation-msg');

                if (!state.selectedRam || !state.selectedStorage) {
                    if (validation) validation.style.display = 'flex';
                    if (valMsg) {
                        if (!state.selectedRam && !state.selectedStorage) {
                            valMsg.textContent = 'Please select a RAM option and a Storage option before adding to cart.';
                        } else if (!state.selectedRam) {
                            valMsg.textContent = 'Please select a RAM option to continue.';
                        } else {
                            valMsg.textContent = 'Please select a Storage option to continue.';
                        }
                    }
                    // Shake animation
                    if (validation) {
                        validation.classList.add('shake');
                        setTimeout(() => validation.classList.remove('shake'), 500);
                    }
                    return;
                }

                const variantPrice = getVariantPrice(state.product, state.selectedRam, state.selectedStorage);
                if (!variantPrice) {
                    if (validation) validation.style.display = 'flex';
                    if (valMsg) valMsg.textContent = 'This combination is unavailable. Please choose different options.';
                    return;
                }

                addToCart(state.product.id, state.selectedRam, state.selectedStorage, variantPrice);
            });
        }

    } else {
        // Non-phone product
        if (variantSection) variantSection.style.display = 'none';
        if (productPrice) productPrice.textContent = formatPrice(product.price);

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => addToCart(product.id));
        }
    }

    if (preorderBtn) {
        preorderBtn.addEventListener('click', () => preorderFromChina(product.id));
    }
}

function changeMainImage(src, thumb) {
    const mainImage = document.getElementById('detail-main-image');
    if (mainImage) mainImage.src = src;
    
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

function changeQuantity(change) {
    const qtyEl = document.getElementById('detail-quantity');
    if (!qtyEl) return;
    
    let qty = parseInt(qtyEl.textContent) + change;
    if (qty < 1) qty = 1;
    qtyEl.textContent = qty;
}

// Filter Buttons (for gadgets and clothing pages)
function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    const container = document.getElementById('products-container');
    if (!container) return;

    // Detect which category this page belongs to by sniffing the URL
    let pageCategory = null;
    const path = window.location.pathname;
    if (path.includes('gadgets')) pageCategory = 'gadgets';
    else if (path.includes('clothing')) pageCategory = 'clothing';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Scope to current page category — never pull in other categories
            let baseProducts = [];
            if (pageCategory === 'gadgets') baseProducts = PRODUCTS.gadgets;
            else if (pageCategory === 'clothing') baseProducts = PRODUCTS.clothing;
            else baseProducts = getAllProducts();

            let filtered = baseProducts;
            if (filter && filter !== 'all') {
                filtered = baseProducts.filter(p => {
                    if (p.gadgetType === filter) return true;
                    if (p.clothType === filter) return true;
                    return false;
                });
            }

            container.innerHTML = filtered.map(p => createProductCard(p)).join('');
        });
    });
}

// Render products for category pages
function renderCategoryProducts(category) {
    const container = document.getElementById('products-container');
    if (!container) return;

    let products = [];
    switch(category) {
        case 'kitchen': products = PRODUCTS.kitchen; break;
        case 'human-hair': products = PRODUCTS.humanHair; break;
        case 'hair-blends': products = PRODUCTS.hairBlends; break;
        case 'hair-accessories': products = PRODUCTS.hairAccessories; break;
        case 'gadgets': products = PRODUCTS.gadgets; break;
        case 'clothing': products = PRODUCTS.clothing; break;
    }

    container.innerHTML = products.map(p => createProductCard(p)).join('');
}

// Render featured products for home page
function renderFeaturedProducts() {
    const containers = {
        'featured-kitchen': PRODUCTS.kitchen.slice(0, 4),
        'featured-hair': PRODUCTS.humanHair.slice(0, 4),
        'featured-blends': PRODUCTS.hairBlends.slice(0, 4),
        'featured-accessories': PRODUCTS.hairAccessories.slice(0, 4),
        'featured-gadgets': PRODUCTS.gadgets.slice(0, 4),
        'featured-clothing': PRODUCTS.clothing.slice(0, 4)
    };

    for (const [id, products] of Object.entries(containers)) {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = products.map(p => createProductCard(p)).join('');
        }
    }
}

// Render mixed featured products
function renderHomeFeatured() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    // .filter(Boolean) guards against undefined if any product array is shorter than expected
    const featured = [
        PRODUCTS.gadgets[0], PRODUCTS.gadgets[4],
        PRODUCTS.humanHair[0], PRODUCTS.humanHair[4],
        PRODUCTS.clothing[0], PRODUCTS.clothing[3],
        PRODUCTS.kitchen[0], PRODUCTS.kitchen[3]
    ].filter(Boolean);

    container.innerHTML = featured.map(p => createProductCard(p)).join('');
}
