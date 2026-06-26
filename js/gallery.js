// ========================================
// Maison Royale - Product Image Gallery
// Features: Slideshow, Zoom, Swipe, Keyboard
// ========================================

(function () {
    'use strict';

    // ---- State ----
    let images = [];
    let currentIndex = 0;
    let autoplayTimer = null;
    let pauseResumeTimer = null;
    let isZoomed = false;
    let zoomScale = 1;
    let zoomOriginX = 50;
    let zoomOriginY = 50;
    const AUTOPLAY_INTERVAL = 4000;
    const RESUME_DELAY = 7000;

    // ---- DOM refs (set after DOMContentLoaded) ----
    let mainImg, prevBtn, nextBtn, thumbnailList, dotsContainer;

    // ---- Init ----
    function initGallery(productImages, productName) {
        if (!productImages || productImages.length === 0) return;

        images = productImages;
        currentIndex = 0;

        mainImg = document.getElementById('detail-main-image');
        prevBtn = document.getElementById('gallery-prev');
        nextBtn = document.getElementById('gallery-next');
        thumbnailList = document.getElementById('detail-thumbnails');
        dotsContainer = document.getElementById('gallery-dots');

        if (!mainImg) return;

        renderThumbnails(productName);
        renderDots();
        setActiveImage(0, false);
        bindEvents();
        startAutoplay();
    }

    // ---- Render thumbnails ----
    function renderThumbnails(productName) {
        if (!thumbnailList) return;
        thumbnailList.innerHTML = images.map((src, i) =>
            `<div class="thumbnail${i === 0 ? ' active' : ''}" data-index="${i}" tabindex="0" role="button" aria-label="View image ${i + 1}">
                <img src="${src}" alt="${productName} view ${i + 1}" loading="lazy">
            </div>`
        ).join('');

        thumbnailList.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function () {
                const idx = parseInt(this.dataset.index);
                goTo(idx, true);
            });
            thumb.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const idx = parseInt(this.dataset.index);
                    goTo(idx, true);
                }
            });
        });
    }

    // ---- Render dots ----
    function renderDots() {
        if (!dotsContainer || images.length <= 1) return;
        dotsContainer.innerHTML = images.map((_, i) =>
            `<button class="gallery-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Go to image ${i + 1}"></button>`
        ).join('');

        dotsContainer.querySelectorAll('.gallery-dot').forEach(dot => {
            dot.addEventListener('click', function () {
                goTo(parseInt(this.dataset.index), true);
            });
        });
    }

    // ---- Navigation ----
    function goTo(index, manual) {
        if (images.length === 0) return;
        currentIndex = ((index % images.length) + images.length) % images.length;
        setActiveImage(currentIndex, true);
        if (manual) pauseThenResume();
    }

    function prev(manual) { goTo(currentIndex - 1, manual); }
    function next(manual) { goTo(currentIndex + 1, manual); }

    function setActiveImage(index, animate) {
        if (!mainImg || !images[index]) return;

        // Reset zoom
        resetZoom();

        // Animate transition
        if (animate) {
            mainImg.style.opacity = '0';
            mainImg.style.transform = 'scale(0.97)';
            setTimeout(() => {
                mainImg.src = images[index];
                mainImg.alt = mainImg.alt;
                mainImg.style.opacity = '1';
                mainImg.style.transform = 'scale(1)';
            }, 150);
        } else {
            mainImg.src = images[index];
        }

        // Preload next image
        if (images[index + 1]) {
            const preload = new Image();
            preload.src = images[index + 1];
        }

        // Update thumbnails
        if (thumbnailList) {
            thumbnailList.querySelectorAll('.thumbnail').forEach((t, i) => {
                t.classList.toggle('active', i === index);
            });
            // Scroll active thumbnail into view
            const activeThumb = thumbnailList.querySelector('.thumbnail.active');
            if (activeThumb) activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        // Update dots
        if (dotsContainer) {
            dotsContainer.querySelectorAll('.gallery-dot').forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
        }
    }

    // ---- Autoplay ----
    function startAutoplay() {
        if (images.length <= 1) return;
        stopAutoplay();
        autoplayTimer = setInterval(() => { next(false); }, AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = null;
    }

    function pauseThenResume() {
        stopAutoplay();
        if (pauseResumeTimer) clearTimeout(pauseResumeTimer);
        pauseResumeTimer = setTimeout(startAutoplay, RESUME_DELAY);
    }

    // ---- Zoom (Desktop hover) ----
    function resetZoom() {
        if (!mainImg) return;
        isZoomed = false;
        zoomScale = 1;
        mainImg.style.transformOrigin = '50% 50%';
        mainImg.style.transform = 'scale(1)';
        mainImg.style.cursor = 'zoom-in';
    }

    function applyZoom(x, y, scale) {
        if (!mainImg) return;
        mainImg.style.transformOrigin = `${x}% ${y}%`;
        mainImg.style.transform = `scale(${scale})`;
    }

    function setupDesktopZoom() {
        if (!mainImg) return;
        const wrapper = document.querySelector('.main-image');
        if (!wrapper) return;

        mainImg.style.cursor = 'zoom-in';
        mainImg.style.transition = 'transform 0.2s ease, opacity 0.15s ease';
        mainImg.style.willChange = 'transform';

        wrapper.addEventListener('mousemove', function (e) {
            if (!isZoomed) return;
            const rect = wrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            applyZoom(x, y, 2.2);
        });

        wrapper.addEventListener('mouseenter', function () {
            stopAutoplay();
        });

        wrapper.addEventListener('mouseleave', function () {
            resetZoom();
            startAutoplay();
        });

        wrapper.addEventListener('click', function () {
            isZoomed = !isZoomed;
            if (isZoomed) {
                mainImg.style.cursor = 'zoom-out';
                applyZoom(50, 50, 2.2);
            } else {
                resetZoom();
            }
        });
    }

    // ---- Touch / Swipe + Pinch Zoom ----
    function setupTouchEvents() {
        const wrapper = document.querySelector('.main-image');
        if (!wrapper) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        let initialPinchDist = 0;
        let currentPinchScale = 1;
        let isPinching = false;

        wrapper.addEventListener('touchstart', function (e) {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                stopAutoplay();
            } else if (e.touches.length === 2) {
                isPinching = true;
                initialPinchDist = getPinchDist(e.touches);
                currentPinchScale = zoomScale;
                e.preventDefault();
            }
        }, { passive: false });

        wrapper.addEventListener('touchmove', function (e) {
            if (isPinching && e.touches.length === 2) {
                const dist = getPinchDist(e.touches);
                const scale = Math.min(3, Math.max(1, currentPinchScale * (dist / initialPinchDist)));
                zoomScale = scale;
                const midX = ((e.touches[0].clientX + e.touches[1].clientX) / 2);
                const midY = ((e.touches[0].clientY + e.touches[1].clientY) / 2);
                const rect = wrapper.getBoundingClientRect();
                const x = ((midX - rect.left) / rect.width) * 100;
                const y = ((midY - rect.top) / rect.height) * 100;
                applyZoom(x, y, scale);
                e.preventDefault();
            }
        }, { passive: false });

        wrapper.addEventListener('touchend', function (e) {
            if (isPinching) {
                isPinching = false;
                if (zoomScale <= 1.1) resetZoom();
                pauseThenResume();
                return;
            }
            if (e.touches.length === 0) {
                touchEndX = e.changedTouches[0].clientX;
                touchEndY = e.changedTouches[0].clientY;
                handleSwipe();
                pauseThenResume();
            }
        });

        // Double-tap zoom
        let lastTapTime = 0;
        wrapper.addEventListener('touchend', function (e) {
            const now = Date.now();
            if (now - lastTapTime < 300) {
                e.preventDefault();
                if (zoomScale > 1) { resetZoom(); }
                else { applyZoom(50, 50, 2); zoomScale = 2; }
            }
            lastTapTime = now;
        });

        function handleSwipe() {
            const dx = touchEndX - touchStartX;
            const dy = Math.abs(touchEndY - touchStartY);
            if (Math.abs(dx) > 50 && dy < 80) {
                if (dx < 0) next(true);
                else prev(true);
            }
        }

        function getPinchDist(touches) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    // ---- Keyboard ----
    function setupKeyboard() {
        document.addEventListener('keydown', function (e) {
            const gallery = document.querySelector('.product-gallery');
            if (!gallery) return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); prev(true); }
            if (e.key === 'ArrowRight') { e.preventDefault(); next(true); }
        });
    }

    // ---- Bind nav buttons ----
    function bindEvents() {
        if (prevBtn) prevBtn.addEventListener('click', () => prev(true));
        if (nextBtn) nextBtn.addEventListener('click', () => next(true));
        setupDesktopZoom();
        setupTouchEvents();
        setupKeyboard();
    }

    // ---- Expose ----
    window.MaisonGallery = { init: initGallery };

})();
