// ========================================
// Maison Royale - Product Data
// ========================================

// Variant pricing model: each phone has RAM/Storage combinations with individual prices
const PRODUCTS = {
    kitchen: [
        { id: 'k1', name: 'Stainless Steel Pot Set', price: 45000, category: 'kitchen', image: 'images/kitchen-household/pots.jpg', images: ['images/kitchen-household/pots.jpg', 'images/kitchen-household/frying-pan.jpg', 'images/kitchen-household/cooking-spoons.jpg'], description: 'Premium 5-piece stainless steel cookware set with glass lids. Perfect for everyday cooking.', specs: { Brand: 'Maison Royale', Material: 'Stainless Steel', Pieces: '5', 'Dishwasher Safe': 'Yes' }, stock: 'in-stock' },
        { id: 'k2', name: 'Non-Stick Frying Pan', price: 12000, category: 'kitchen', image: 'images/kitchen-household/frying-pan.jpg', images: ['images/kitchen-household/frying-pan.jpg', 'images/kitchen-household/pots.jpg', 'images/kitchen-household/cooking-spoons.jpg'], description: 'Professional grade non-stick frying pan with heat-resistant handle.', specs: { Brand: 'Maison Royale', Size: '28cm', Material: 'Aluminum', Coating: 'Ceramic Non-Stick' }, stock: 'in-stock' },
        { id: 'k3', name: 'Professional Knife Set', price: 25000, category: 'kitchen', image: 'images/kitchen-household/knife-set.jpg', images: ['images/kitchen-household/knife-set.jpg', 'images/kitchen-household/cooking-spoons.jpg', 'images/kitchen-household/food-storage.jpg'], description: '8-piece knife set with wooden block. Includes chef, bread, utility, and paring knives.', specs: { Brand: 'Maison Royale', Pieces: '8', Material: 'High Carbon Steel', Block: 'Wood' }, stock: 'in-stock' },
        { id: 'k4', name: 'Digital Blender', price: 35000, category: 'kitchen', image: 'images/kitchen-household/blender.jpg', images: ['images/kitchen-household/blender.jpg', 'images/kitchen-household/food-storage.jpg', 'images/kitchen-household/storage-organizers.jpg'], description: 'High-speed digital blender with 6 preset programs and pulse function.', specs: { Brand: 'Maison Royale', Power: '1200W', Capacity: '1.8L', Speeds: '6 + Pulse' }, stock: 'in-stock' },
        { id: 'k5', name: 'Food Storage Containers', price: 8500, category: 'kitchen', image: 'images/kitchen-household/food-storage.jpg', images: ['images/kitchen-household/food-storage.jpg', 'images/kitchen-household/storage-organizers.jpg', 'images/kitchen-household/blender.jpg'], description: '10-piece airtight food storage container set with colorful lids.', specs: { Brand: 'Maison Royale', Pieces: '10', Material: 'BPA-Free Plastic', 'Microwave Safe': 'Yes' }, stock: 'in-stock' },
        { id: 'k6', name: 'Wooden Cooking Spoons', price: 5500, category: 'kitchen', image: 'images/kitchen-household/cooking-spoons.jpg', images: ['images/kitchen-household/cooking-spoons.jpg', 'images/kitchen-household/knife-set.jpg', 'images/kitchen-household/pots.jpg'], description: 'Set of 6 premium teakwood cooking utensils with ceramic holder.', specs: { Brand: 'Maison Royale', Pieces: '6', Material: 'Teak Wood', Holder: 'Ceramic' }, stock: 'in-stock' },
        { id: 'k7', name: 'Cleaning Tool Set', price: 15000, category: 'kitchen', image: 'images/kitchen-household/cleaning-tools.jpg', images: ['images/kitchen-household/cleaning-tools.jpg', 'images/kitchen-household/storage-organizers.jpg', 'images/kitchen-household/food-storage.jpg'], description: 'Complete home cleaning set with spray mop, microfiber cloths, and brushes.', specs: { Brand: 'Maison Royale', Pieces: '5', Material: 'Microfiber', Type: 'Spray Mop' }, stock: 'in-stock' },
        { id: 'k8', name: 'Storage Organizers', price: 18000, category: 'kitchen', image: 'images/kitchen-household/storage-organizers.jpg', images: ['images/kitchen-household/storage-organizers.jpg', 'images/kitchen-household/cleaning-tools.jpg', 'images/kitchen-household/food-storage.jpg'], description: 'Foldable fabric storage bins and closet organizers in neutral colors.', specs: { Brand: 'Maison Royale', Pieces: '8', Material: 'Fabric', Type: 'Foldable' }, stock: 'in-stock' }
    ],
    humanHair: [
        { id: 'h1', name: 'Bone Straight Bundles', price: 85000, category: 'human-hair', image: 'images/human-hair/bone-straight.jpg', images: ['images/human-hair/bone-straight.jpg', 'images/human-hair/closure.jpg', 'images/human-hair/wig.jpg'], description: 'Premium 10A bone straight human hair bundles. 3 bundles per pack.', specs: { Brand: 'Maison Royale', Length: '12-30 inches', Origin: 'Brazilian', Weight: '100g per bundle' }, stock: 'in-stock' },
        { id: 'h2', name: 'Deep Wave Bundles', price: 90000, category: 'human-hair', image: 'images/human-hair/deep-wave.jpg', images: ['images/human-hair/deep-wave.jpg', 'images/human-hair/curly-hair.jpg', 'images/human-hair/water-wave.jpg'], description: 'Luxurious deep wave human hair with natural luster. 3 bundles per pack.', specs: { Brand: 'Maison Royale', Length: '12-28 inches', Origin: 'Peruvian', Weight: '100g per bundle' }, stock: 'in-stock' },
        { id: 'h3', name: 'Curly Hair Bundles', price: 95000, category: 'human-hair', image: 'images/human-hair/curly-hair.jpg', images: ['images/human-hair/curly-hair.jpg', 'images/human-hair/deep-wave.jpg', 'images/human-hair/water-wave.jpg'], description: 'Beautiful tight curl pattern human hair bundles. Natural and bouncy.', specs: { Brand: 'Maison Royale', Length: '10-26 inches', Origin: 'Mongolian', Weight: '100g per bundle' }, stock: 'in-stock' },
        { id: 'h4', name: 'Water Wave Bundles', price: 88000, category: 'human-hair', image: 'images/human-hair/water-wave.jpg', images: ['images/human-hair/water-wave.jpg', 'images/human-hair/deep-wave.jpg', 'images/human-hair/curly-hair.jpg'], description: 'Elegant water wave texture human hair. Soft and manageable.', specs: { Brand: 'Maison Royale', Length: '12-30 inches', Origin: 'Indian', Weight: '100g per bundle' }, stock: 'in-stock' },
        { id: 'h5', name: 'Lace Front Wig', price: 150000, category: 'human-hair', image: 'images/human-hair/wig.jpg', images: ['images/human-hair/wig.jpg', 'images/human-hair/closure.jpg', 'images/human-hair/bone-straight.jpg'], description: 'Pre-plucked lace front wig with baby hair. 150% density.', specs: { Brand: 'Maison Royale', Length: '14-26 inches', Density: '150%', Lace: 'Swiss HD' }, stock: 'in-stock' },
        { id: 'h6', name: '4x4 Lace Closure', price: 35000, category: 'human-hair', image: 'images/human-hair/closure.jpg', images: ['images/human-hair/closure.jpg', 'images/human-hair/wig.jpg', 'images/human-hair/bone-straight.jpg'], description: 'Free part Swiss lace closure with natural hairline.', specs: { Brand: 'Maison Royale', Size: '4x4', Length: '10-20 inches', Lace: 'Swiss' }, stock: 'in-stock' }
    ],
    hairBlends: [
        { id: 'b1', name: 'Mixed Texture Bundles', price: 55000, category: 'hair-blends', image: 'images/hair-blends/mixed-texture.jpg', images: ['images/hair-blends/mixed-texture.jpg', 'images/hair-blends/human-synthetic.jpg', 'images/hair-blends/colored-blend.jpg'], description: 'Blend of straight and wavy textures for a versatile look.', specs: { Brand: 'Maison Royale', Blend: 'Human/Synthetic', Length: '14-24 inches', Weight: '120g' }, stock: 'in-stock' },
        { id: 'b2', name: 'Premium Blend Bundles', price: 45000, category: 'hair-blends', image: 'images/hair-blends/human-synthetic.jpg', images: ['images/hair-blends/human-synthetic.jpg', 'images/hair-blends/mixed-texture.jpg', 'images/hair-blends/premium-wig.jpg'], description: 'High-quality human and synthetic blend with natural shine.', specs: { Brand: 'Maison Royale', Blend: '70/30', Length: '12-22 inches', Weight: '110g' }, stock: 'in-stock' },
        { id: 'b3', name: 'Blended Lace Wig', price: 85000, category: 'hair-blends', image: 'images/hair-blends/premium-wig.jpg', images: ['images/hair-blends/premium-wig.jpg', 'images/hair-blends/custom-wig.jpg', 'images/hair-blends/colored-blend.jpg'], description: 'Affordable lace front wig with premium blended hair.', specs: { Brand: 'Maison Royale', Density: '130%', Length: '14-24 inches', Lace: 'Swiss' }, stock: 'in-stock' },
        { id: 'b4', name: 'Colored Blend Bundles', price: 50000, category: 'hair-blends', image: 'images/hair-blends/colored-blend.jpg', images: ['images/hair-blends/colored-blend.jpg', 'images/hair-blends/mixed-texture.jpg', 'images/hair-blends/human-synthetic.jpg'], description: 'Vibrant burgundy and ombre colored blend bundles.', specs: { Brand: 'Maison Royale', Colors: 'Burgundy/Ombre', Length: '14-22 inches', Weight: '110g' }, stock: 'in-stock' },
        { id: 'b5', name: 'Custom Highlight Wig', price: 95000, category: 'hair-blends', image: 'images/hair-blends/custom-wig.jpg', images: ['images/hair-blends/custom-wig.jpg', 'images/hair-blends/premium-wig.jpg', 'images/hair-blends/colored-blend.jpg'], description: 'Custom blend wig with honey blonde highlights.', specs: { Brand: 'Maison Royale', Colors: 'Black/Blonde', Length: '16-26 inches', Density: '150%' }, stock: 'preorder' }
    ],
    hairAccessories: [
        { id: 'a1', name: 'Professional Hair Brush Set', price: 8500, category: 'hair-accessories', image: 'images/hair-accessories/hair-brush.jpg', images: ['images/hair-accessories/hair-brush.jpg', 'images/hair-accessories/edge-brush.jpg', 'images/hair-accessories/hair-bands.jpg'], description: 'Paddle brush and round brush set with ergonomic handles.', specs: { Brand: 'Maison Royale', Pieces: '2', Material: 'Ceramic', Type: 'Paddle/Round' }, stock: 'in-stock' },
        { id: 'a2', name: 'Ionic Hair Dryer', price: 25000, category: 'hair-accessories', image: 'images/hair-accessories/hair-dryer.jpg', images: ['images/hair-accessories/hair-dryer.jpg', 'images/hair-accessories/hair-brush.jpg', 'images/hair-accessories/bonnet.jpg'], description: 'Professional ionic hair dryer with multiple heat settings.', specs: { Brand: 'Maison Royale', Power: '2000W', Settings: '3 Heat/2 Speed', Technology: 'Ionic' }, stock: 'in-stock' },
        { id: 'a3', name: 'Hair Bands Collection', price: 4500, category: 'hair-accessories', image: 'images/hair-accessories/hair-bands.jpg', images: ['images/hair-accessories/hair-bands.jpg', 'images/hair-accessories/hair-pins.jpg', 'images/hair-accessories/bonnet.jpg'], description: 'Set of 12 elegant hair bands in various styles and colors.', specs: { Brand: 'Maison Royale', Pieces: '12', Material: 'Velvet/Satin', Styles: 'Multiple' }, stock: 'in-stock' },
        { id: 'a4', name: 'Pearl Hair Pins Set', price: 3500, category: 'hair-accessories', image: 'images/hair-accessories/hair-pins.jpg', images: ['images/hair-accessories/hair-pins.jpg', 'images/hair-accessories/hair-bands.jpg', 'images/hair-accessories/edge-brush.jpg'], description: 'Beautiful pearl and crystal decorative hair pins.', specs: { Brand: 'Maison Royale', Pieces: '8', Material: 'Pearl/Crystal', Style: 'Decorative' }, stock: 'in-stock' },
        { id: 'a5', name: 'Edge Brush Set', price: 2500, category: 'hair-accessories', image: 'images/hair-accessories/edge-brush.jpg', images: ['images/hair-accessories/edge-brush.jpg', 'images/hair-accessories/hair-brush.jpg', 'images/hair-accessories/hair-pins.jpg'], description: 'Double-sided edge brush and comb for baby hair styling.', specs: { Brand: 'Maison Royale', Pieces: '3', Material: 'Bamboo', Type: 'Edge Control' }, stock: 'in-stock' },
        { id: 'a6', name: 'Satin Hair Bonnet', price: 3500, category: 'hair-accessories', image: 'images/hair-accessories/bonnet.jpg', images: ['images/hair-accessories/bonnet.jpg', 'images/hair-accessories/hair-bands.jpg', 'images/hair-accessories/hair-pins.jpg'], description: 'Luxurious satin bonnet for hair protection while sleeping.', specs: { Brand: 'Maison Royale', Material: 'Satin', Size: 'Adjustable', Color: 'Black/Gold' }, stock: 'in-stock' }
    ],
    gadgets: [
        {
            id: 'g1',
            name: 'Samsung S21 Ultra',
            price: 450000, // base price (cheapest variant)
            category: 'gadgets',
            image: 'images/gadgets/samsung-s21-ultra.jpg',
            images: ['https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/66/4629752/1.jpg?8409','images/gadgets/samsung-s21-ultra.jpg', 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/95/8804052/1.jpg?4092'],
            description: 'Samsung Galaxy S21 Ultra 5G with a stunning 108MP quad-camera system, Dynamic AMOLED 2X display, and a massive 5000mAh battery. Built for those who demand the best.',
            specs: { Brand: 'Samsung', Display: '6.8" Dynamic AMOLED 2X', Camera: '108MP Quad', Battery: '5000mAh', OS: 'Android 12', Network: '5G' },
            stock: 'preorder',
            gadgetType: 'phones',
            isPhone: true,
            ramOptions: ['8GB', '12GB', '16GB'],
            storageOptions: ['128GB', '256GB', '512GB'],
            // Variant prices map: "RAM_STORAGE" -> price
            variantPrices: {
                '8GB_128GB': 450000,
                '8GB_256GB': 490000,
                '8GB_512GB': 540000,
                '12GB_128GB': 500000,
                '12GB_256GB': 545000,
                '12GB_512GB': 595000,
                '16GB_256GB': 610000,
                '16GB_512GB': 660000
            }
        },
        {
            id: 'g2',
            name: 'iPhone 13',
            price: 520000,
            category: 'gadgets',
            image: 'images/gadgets/iphone-13.jpg',
            images: ['images/gadgets/iphone-13.jpg', 'images/gadgets/samsung-s21.jpg', 'images/gadgets/apple-watch.jpg'],
            description: 'Apple iPhone 13 powered by the blazing-fast A15 Bionic chip, featuring a dual 12MP camera system, Super Retina XDR display, and all-day battery life.',
            specs: { Brand: 'Apple', Display: '6.1" Super Retina XDR', Camera: '12MP Dual', Chip: 'A15 Bionic', OS: 'iOS 15', Network: '5G' },
            stock: 'preorder',
            gadgetType: 'phones',
            isPhone: true,
            ramOptions: ['4GB'],
            storageOptions: ['128GB', '256GB', '512GB'],
            variantPrices: {
                '4GB_128GB': 520000,
                '4GB_256GB': 580000,
                '4GB_512GB': 650000
            }
        },   
        {
            id: 'g3',
            name: 'iPhone 17 pro',
            price: 3000000,
            category: 'gadgets',
            image: 'https://www.apple.com/v/iphone-17-pro/c/images/overview/cameras/pro-video/prores__da2ay2urzh4y_large_2x.jpg',
            images: ['https://www.apple.com/v/iphone-17-pro/c/images/overview/cameras/pro-video/prores__da2ay2urzh4y_large_2x.jpg', 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-model-unselect-gallery-2-202509_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=90&.v=dU9qRExIQUlQTzVKeDd1V1dtUE1MUWFRQXQ2R0JQTk5udUZxTkR3ZVlpTEJBSVhDREVhQVF4eThVb2E3Y2VibUlYUWYrQkRLNitCbE9QRVRqNHErMkE3b3pFWnhZZ2g0M0pRR0pEdHVSRUVtYkFqYmVJbENIK1gycDVvVjJtTEZkWHlyQUZHM0VoZTBZR3diWjJXVERn&traceId=1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2d4UKIl2Ehy18Iu_nt3Gd4xjH-t_QMr233sjd156PAw&s=10'],
            description: 'Apple iPhone 17 Pro with A17 Bionic chip, 48MP triple camera system, and Super Retina XDR display. Experience the future of mobile technology.',
            specs: { Brand: 'Apple', Display: '6.7" Super Retina XDR', Camera: '48MP Triple', Chip: 'A17 Bionic', OS: 'iOS 17', Network: '5G' },
            stock: 'preorder',
            gadgetType: 'phones',
            isPhone: true,
            ramOptions: ['12GB', '16GB'],
            storageOptions: ['512GB', '1TB'],
            variantPrices: {
                '12GB_512GB': 3000000,
                '12GB_1TB': 3100000,
                '16GB_512GB': 1350000,
                '16GB_1TB': 1450000
            }
        }, 
        { id: 'g4', name: 'MacBook Air', price: 750000, category: 'gadgets', image: 'images/gadgets/macbook-air.jpg', images: ['images/gadgets/macbook-air.jpg', 'images/gadgets/hp-elitebook.jpg', 'images/gadgets/jbl-speaker.jpg'], description: 'Apple MacBook Air with M1 chip, 18-hour battery life.', specs: { Brand: 'Apple', Storage: '256GB/512GB', RAM: '8GB/16GB', Display: '13.3" Retina' }, stock: 'preorder', gadgetType: 'laptops' },
        { id: 'g5', name: 'HP EliteBook', price: 380000, category: 'gadgets', image: 'images/gadgets/hp-elitebook.jpg', images: ['images/gadgets/hp-elitebook.jpg', 'images/gadgets/macbook-air.jpg', 'images/gadgets/jbl-speaker.jpg'], description: 'HP EliteBook 840 G8 business laptop with Intel Core i5.', specs: { Brand: 'HP', Storage: '256GB SSD', RAM: '8GB/16GB', Display: '14" FHD' }, stock: 'preorder', gadgetType: 'laptops' },
        { id: 'g6', name: 'JBL Portable Speaker', price: 45000, category: 'gadgets', image: 'images/gadgets/jbl-speaker.jpg', images: ['images/gadgets/jbl-speaker.jpg', 'images/gadgets/apple-watch.jpg', 'images/gadgets/samsung-s21.jpg'], description: 'JBL Flip 6 waterproof portable Bluetooth speaker.', specs: { Brand: 'JBL', Battery: '12 hours', Waterproof: 'IP67', Power: '30W' }, stock: 'in-stock', gadgetType: 'audio' },
        { id: 'g7', name: 'Apple Watch Series 7', price: 180000, category: 'gadgets', image: 'images/gadgets/apple-watch.jpg', images: ['images/gadgets/apple-watch.jpg', 'images/gadgets/iphone-13.jpg', 'images/gadgets/jbl-speaker.jpg'], description: 'Apple Watch Series 7 with blood oxygen and ECG apps.', specs: { Brand: 'Apple', Size: '41mm/45mm', Material: 'Aluminum', 'Water Resistant': '50m' }, stock: 'preorder', gadgetType: 'smart-watches' }
    ],
    clothing: [
        { id: 'c1', name: 'Premium Cotton T-Shirt', price: 8500, category: 'clothing', image: 'images/clothing/tshirt.jpg', images: ['images/clothing/tshirt.jpg', 'images/clothing/hoodie.jpg', 'images/clothing/jeans.jpg'], description: 'High-quality 100% cotton t-shirt in classic black.', specs: { Brand: 'Maison Royale', Material: '100% Cotton', Fit: 'Regular', Sizes: 'S-XXL' }, stock: 'preorder', clothType: 't-shirts' },
        { id: 'c2', name: 'Classic Black Hoodie', price: 18000, category: 'clothing', image: 'images/clothing/hoodie.jpg', images: ['images/clothing/hoodie.jpg', 'images/clothing/tshirt.jpg', 'images/clothing/jacket.jpg'], description: 'Comfortable fleece-lined hoodie with front pocket.', specs: { Brand: 'Maison Royale', Material: 'Cotton/Poly', Fit: 'Relaxed', Sizes: 'S-XXL' }, stock: 'in-stock', clothType: 'hoodies' },
        { id: 'c3', name: 'Slim Fit Jeans', price: 22000, category: 'clothing', image: 'images/clothing/jeans.jpg', images: ['images/clothing/jeans.jpg', 'images/clothing/tshirt.jpg', 'images/clothing/sneakers.jpg'], description: 'Classic blue slim fit denim jeans with stretch.', specs: { Brand: 'Maison Royale', Material: 'Denim/Cotton', Fit: 'Slim', Sizes: '30-40' }, stock: 'in-stock', clothType: 'jeans' },
        { id: 'c4', name: 'Leather Bomber Jacket', price: 65000, category: 'clothing', image: 'images/clothing/jacket.jpg', images: ['images/clothing/jacket.jpg', 'images/clothing/hoodie.jpg', 'images/clothing/jeans.jpg'], description: 'Premium black leather bomber jacket with zip closure.', specs: { Brand: 'Maison Royale', Material: 'Genuine Leather', Fit: 'Regular', Sizes: 'S-XXL' }, stock: 'in-stock', clothType: 'jackets' },
        { id: 'c5', name: 'Running Sneakers', price: 28000, category: 'clothing', image: 'images/clothing/sneakers.jpg', images: ['images/clothing/sneakers.jpg', 'images/clothing/jeans.jpg', 'images/clothing/tshirt.jpg'], description: 'Lightweight athletic running shoes with cushioned sole.', specs: { Brand: 'Maison Royale', Material: 'Mesh/Rubber', Type: 'Running', Sizes: '40-45' }, stock: 'in-stock', clothType: 'sneakers' },
        { id: 'c6', name: 'Embroidered Native Wear', price: 35000, category: 'clothing', image: 'images/clothing/native-wear.jpg', images: ['images/clothing/native-wear.jpg', 'images/clothing/jacket.jpg', 'images/clothing/hoodie.jpg'], description: 'Traditional embroidered dashiki with gold detailing.', specs: { Brand: 'Maison Royale', Material: 'Cotton', Style: 'Traditional', Sizes: 'M-XXL' }, stock: 'in-stock', clothType: 'native-wear' }
    ]
};

// Helper function to get all products as a flat array
function getAllProducts() {
    return [
        ...PRODUCTS.kitchen,
        ...PRODUCTS.humanHair,
        ...PRODUCTS.hairBlends,
        ...PRODUCTS.hairAccessories,
        ...PRODUCTS.gadgets,
        ...PRODUCTS.clothing
    ];
}

// Helper function to get product by ID
function getProductById(id) {
    return getAllProducts().find(p => p.id === id);
}

// Helper to get variant price for a phone
function getVariantPrice(product, ram, storage) {
    if (!product.isPhone || !product.variantPrices) return product.price;
    const key = `${ram}_${storage}`;
    return product.variantPrices[key] || null;
}

// Helper function to get related products
function getRelatedProducts(category, excludeId) {
    let products = [];
    switch(category) {
        case 'kitchen': products = PRODUCTS.kitchen; break;
        case 'human-hair': products = PRODUCTS.humanHair; break;
        case 'hair-blends': products = PRODUCTS.hairBlends; break;
        case 'hair-accessories': products = PRODUCTS.hairAccessories; break;
        case 'gadgets': products = PRODUCTS.gadgets; break;
        case 'clothing': products = PRODUCTS.clothing; break;
    }
    return products.filter(p => p.id !== excludeId).slice(0, 4);
}

// Format price in Naira
function formatPrice(price) {
    return '\u20A6' + price.toLocaleString('en-NG');
}

// Create product card HTML — clicking goes to product-details page
function createProductCard(product) {
    const stockClass = product.stock === 'in-stock' ? 'in-stock' : 'preorder';
    const stockText = product.stock === 'in-stock' ? 'In Stock' : 'Preorder';
    const detailsUrl = `product-details.html?id=${product.id}`;

    return `
        <div class="product-card" data-id="${product.id}" onclick="window.location.href='${detailsUrl}'" style="cursor:pointer;">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <a href="${detailsUrl}" class="btn btn-primary btn-small" onclick="event.stopPropagation()">
                        <i class="fas fa-eye"></i> View Details
                    </a>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.replace('-', ' ').toUpperCase()}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}${product.isPhone ? '<span class="price-from"> from</span>' : ''}</div>
                <span class="stock-status ${stockClass}">${stockText}</span>
            </div>
        </div>
    `;
}
