// ================= GALLERY LIGHTBOX =================
class LightboxGallery {
    constructor() {
        this.overlay = null;
        this.currentIndex = 0;
        this.images = [];
        this.currentGallery = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.createLightboxHTML();
        this.bindEvents();
    }

    createLightboxHTML() {
        const lightboxHTML = `
            <div class="lightbox-overlay" id="lightbox-overlay">
                <div class="lightbox-container">
                    <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="lightbox-nav lightbox-next" aria-label="Next image">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <button class="lightbox-close" aria-label="Close lightbox">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="lightbox-counter"></div>
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-caption"></div>
                    <div class="lightbox-loading"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.overlay = document.getElementById('lightbox-overlay');
    }

    bindEvents() {
        // Click events for lightbox triggers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox-trigger')) {
                e.preventDefault();
                this.openLightbox(e.target);
            }
        });

        // Lightbox navigation
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay || e.target.classList.contains('lightbox-close')) {
                    this.closeLightbox();
                } else if (e.target.classList.contains('lightbox-prev')) {
                    this.showPrevious();
                } else if (e.target.classList.contains('lightbox-next')) {
                    this.showNext();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
            }
        });

        // Touch events for swipe navigation
        if (this.overlay) {
            this.overlay.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            });

            this.overlay.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            });
        }
    }

    openLightbox(triggerElement) {
        const gallery = triggerElement.dataset.gallery || 'default';
        this.currentGallery = gallery;

        // Get all images in the same gallery
        this.images = Array.from(document.querySelectorAll(`[data-gallery="${gallery}"]`));

        // Find current image index
        this.currentIndex = this.images.indexOf(triggerElement);

        this.showImage(this.currentIndex);
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    showImage(index) {
        if (index < 0 || index >= this.images.length) return;

        this.currentIndex = index;
        const image = this.images[index];
        const lightboxImage = this.overlay.querySelector('.lightbox-image');
        const caption = this.overlay.querySelector('.lightbox-caption');
        const counter = this.overlay.querySelector('.lightbox-counter');
        const loading = this.overlay.querySelector('.lightbox-loading');

        // Show loading spinner
        loading.style.display = 'block';
        lightboxImage.style.opacity = '0';

        // Update counter
        counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;

        // Update caption
        const altText = image.getAttribute('alt') || image.getAttribute('title') || '';
        caption.textContent = altText;

        // Load image
        const img = new Image();
        img.onload = () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = altText;
            loading.style.display = 'none';
            lightboxImage.style.opacity = '1';
        };
        img.src = image.src;
    }

    showNext() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(nextIndex);
    }

    showPrevious() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(prevIndex);
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchStartX - this.touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                this.showNext();
            } else {
                this.showPrevious();
            }
        }
    }

    closeLightbox() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}
