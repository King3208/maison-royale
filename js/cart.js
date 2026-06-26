// ========================================
// Maison Royale - Cart Functionality
// ========================================

const CART_KEY = 'maison_royale_cart';
// WHATSAPP_NUMBER is defined in whatsapp.js — do not redeclare here

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart — supports variant (ram, storage, variantPrice)
function addToCart(productId, ram, storage, variantPrice) {
    const product = getProductById(productId);
    if (!product) return;

    const price = variantPrice !== undefined ? variantPrice : product.price;
    // Unique cart key: for phones include variant, otherwise just product id
    const cartKey = (ram && storage) ? `${productId}_${ram}_${storage}` : productId;

    let cart = getCart();
    const existingItem = cart.find(item => item.cartKey === cartKey);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            cartKey,
            id: product.id,
            name: product.name,
            price,
            image: product.image,
            category: product.category,
            quantity: 1,
            // Variant details (null for non-phones)
            ram: ram || null,
            storage: storage || null,
            variantLabel: (ram && storage) ? `${ram} RAM / ${storage} Storage` : null
        });
    }

    saveCart(cart);
    showToast(`${product.name}${ram ? ` (${ram}/${storage})` : ''} added to cart!`);
}

// Remove item from cart
function removeFromCart(cartKey) {
    let cart = getCart();
    cart = cart.filter(item => item.cartKey !== cartKey);
    saveCart(cart);
    renderCart();
}

// Clear all items from cart
function clearCart() {
    if (!confirm('Are you sure you want to clear your cart?')) return;
    saveCart([]);
    renderCart();
}

// Update item quantity
function updateQuantity(cartKey, change) {
    let cart = getCart();
    const item = cart.find(item => item.cartKey === cartKey);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(cartKey);
            return;
        }
        saveCart(cart);
        renderCart();
    }
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count badge
function updateCartCount() {
    const count = getCartItemCount();
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Render cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummaryContainer = document.getElementById('cart-summary');

    if (!cartItemsContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your Cart is Empty</h3>
                <p>Browse our products and add items to your cart.</p>
                <a href="index.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        if (cartSummaryContainer) cartSummaryContainer.style.display = 'none';
        return;
    }

    if (cartSummaryContainer) cartSummaryContainer.style.display = 'block';

    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item" data-key="${item.cartKey}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    ${item.variantLabel ? `<p class="cart-variant-label"><i class="fas fa-microchip"></i> ${item.variantLabel}</p>` : ''}
                    <p>${item.category.replace('-', ' ').toUpperCase()}</p>
                </div>
                <div class="quantity-control">
                    <button onclick="updateQuantity('${item.cartKey}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.cartKey}', 1)">+</button>
                </div>
                <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
                <button class="remove-btn" onclick="removeFromCart('${item.cartKey}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;

    // Update summary
    const total = getCartTotal();
    const itemCount = getCartItemCount();

    if (cartSummaryContainer) {
        cartSummaryContainer.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Items (${itemCount})</span>
                <span>${formatPrice(total)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
            </div>
            <div class="summary-row total">
                <span>Grand Total</span>
                <span>${formatPrice(total)}</span>
            </div>
            <button class="btn btn-whatsapp" style="width:100%;margin-top:20px;" onclick="checkoutViaWhatsApp()">
                <i class="fab fa-whatsapp"></i> Checkout via WhatsApp
            </button>
            <a href="index.html" class="btn btn-outline" style="width:100%;margin-top:12px;">
                Continue Shopping
            </a>
            <button class="btn btn-outline" style="width:100%;margin-top:12px;color:#c0392b;border-color:#c0392b;" onclick="clearCart()">
                <i class="fas fa-trash"></i> Clear Cart
            </button>
        `;
    }
}

// Checkout via WhatsApp
function checkoutViaWhatsApp() {
    const cart = getCart();
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }

    let message = "Hello,\n\nI want to place an order from Maison Royale.\n\nProducts:\n";
    cart.forEach(item => {
        message += `- ${item.name}`;
        if (item.variantLabel) message += ` [${item.variantLabel}]`;
        message += ` x${item.quantity} — ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\nGrand Total: ${formatPrice(getCartTotal())}\n\nPlease provide payment and delivery details.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Preorder from China via WhatsApp
function preorderFromChina(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const message = `Hello,\n\nI want to preorder this product from China.\n\nProduct Name: ${product.name}\nPrice: ${formatPrice(product.price)}\n\nPlease provide more information.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}
