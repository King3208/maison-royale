// ========================================
// Maison Royale - Homepage Banner Carousel
// ========================================

(function () {
    'use strict';

    const BANNERS = [
        {
            image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-model-unselect-gallery-2-202509_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=90&.v=dU9qRExIQUlQTzVKeDd1V1dtUE1MUWFRQXQ2R0JQTk5udUZxTkR3ZVlpTEJBSVhDREVhQVF4eThVb2E3Y2VibUlYUWYrQkRLNitCbE9QRVRqNHErMkE3b3pFWnhZZ2g0M0pRR0pEdHVSRUVtYkFqYmVJbENIK1gycDVvVjJtTEZkWHlyQUZHM0VoZTBZR3diWjJXVERn&traceId=1',
            title: 'Electronics',
            subtitle: 'Unbeatable deals on premium smartphones, laptops & more',
            cta: 'Shop Gadgets',
            link: 'gadgets.html',
            accent: '#c9a96e'
        },
        {
            image: 'images/gadgets/iphone-13.jpg',
            title: 'Latest Smartphones',
            subtitle: 'iPhone 13 & Samsung S21 Ultra — flagship performance at great prices',
            cta: 'View Phones',
            link: 'gadgets.html',
            accent: '#c9a96e'
        },
        {
            image: 'images/gadgets/macbook-air.jpg',
            title: 'New Laptop Collection',
            subtitle: 'MacBook Air & HP EliteBook — power and portability redefined',
            cta: 'Shop Laptops',
            link: 'gadgets.html',
            accent: '#c9a96e'
        },
        {
            image: 'images/human-hair/bone-straight.jpg',
            title: 'Premium Hair Products',
            subtitle: 'Luxury human hair bundles & wigs — crafted for your crown',
            cta: 'Shop Hair',
            link: 'human-hair.html',
            accent: '#c9a96e'
        },
        {
            image: 'images/kitchen-household/pots.jpg',
            title: 'Kitchen Essentials Sale',
            subtitle: 'Premium cookware & organizers for the modern home',
            cta: 'Shop Kitchen',
            link: 'kitchen-household.html',
            accent: '#c9a96e'
        }
    ];

    const AUTOPLAY_MS = 5000;
    const RESUME_DELAY = 8000;

    let current = 0;
    let autoplayTimer = null;
    let resumeTimer = null;
    let isTransitioning = false;

    function buildBannerHTML() {
        return `
        <section class="promo-banner-section" aria-label="Promotional Banners">
            <div class="promo-banner-wrapper">
                <div class="promo-slides" id="promo-slides">
                    ${BANNERS.map((b, i) => `
                    <div class="promo-slide${i === 0 ? ' active' : ''}" data-index="${i}" role="group" aria-roledescription="slide" aria-label="${b.title}">
                        <div class="promo-slide-bg" style="background-image:url('${b.image}')" aria-hidden="true"></div>
                        <div class="promo-slide-overlay" aria-hidden="true"></div>
                        <div class="promo-slide-content">
                            <h2 class="promo-title">${b.title}</h2>
                            <p class="promo-subtitle">${b.subtitle}</p>
                            <a href="${b.link}" class="btn btn-primary promo-cta" onclick="event.stopPropagation()">${b.cta} <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>`).join('')}
                </div>

                <!-- Arrows -->
                <button class="promo-arrow promo-arrow-prev" id="promo-prev" aria-label="Previous banner">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="promo-arrow promo-arrow-next" id="promo-next" aria-label="Next banner">
                    <i class="fas fa-chevron-right"></i>
                </button>

                <!-- Dots -->
                <div class="promo-dots" role="tablist" aria-label="Banner navigation" id="promo-dots">
                    ${BANNERS.map((_, i) =>
                        `<button class="promo-dot${i === 0 ? ' active' : ''}" data-index="${i}" role="tab" aria-label="Banner ${i + 1}" aria-selected="${i === 0}"></button>`
                    ).join('')}
                </div>
            </div>
        </section>`;
    }

    function goTo(index, manual) {
        if (isTransitioning) return;
        const slides = document.querySelectorAll('.promo-slide');
        const dots = document.querySelectorAll('.promo-dot');
        if (!slides.length) return;

        isTransitioning = true;
        const next = ((index % BANNERS.length) + BANNERS.length) % BANNERS.length;

        slides[current].classList.remove('active');
        slides[current].classList.add('exit');
        slides[next].classList.add('active');

        setTimeout(() => {
            slides[current].classList.remove('exit');
            current = next;
            isTransitioning = false;
        }, 600);

        dots.forEach((d, i) => {
            d.classList.toggle('active', i === next);
            d.setAttribute('aria-selected', i === next ? 'true' : 'false');
        });

        if (manual) pauseThenResume();
    }

    function pauseThenResume() {
        stopAutoplay();
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(startAutoplay, RESUME_DELAY);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => { goTo(current + 1, false); }, AUTOPLAY_MS);
    }

    function stopAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = null;
    }

    function init() {
        // Find insertion point: after .overlay (mobile menu overlay), before search or hero
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = buildBannerHTML();
        const section = wrapper.firstElementChild;
        hero.insertAdjacentElement('afterend', section);

        // Bind arrows
        document.getElementById('promo-prev').addEventListener('click', () => goTo(current - 1, true));
        document.getElementById('promo-next').addEventListener('click', () => goTo(current + 1, true));

        // Bind dots
        document.querySelectorAll('.promo-dot').forEach(dot => {
            dot.addEventListener('click', function () { goTo(parseInt(this.dataset.index), true); });
        });

        // Pause on hover
        section.addEventListener('mouseenter', stopAutoplay);
        section.addEventListener('mouseleave', startAutoplay);

        // Touch swipe
        let tx = 0;
        section.addEventListener('touchstart', e => { tx = e.touches[0].clientX; stopAutoplay(); }, { passive: true });
        section.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - tx;
            if (Math.abs(dx) > 50) dx < 0 ? goTo(current + 1, true) : goTo(current - 1, true);
            else pauseThenResume();
        });

        startAutoplay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
