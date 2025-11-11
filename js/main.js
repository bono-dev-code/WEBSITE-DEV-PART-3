// ========================================
// MEATMASTERS BUTCHERY - JAVASCRIPT
// ========================================

// ================= SLIDESHOW CONTROL =================
class SlideshowController {
    constructor() {
        this.slides = document.querySelectorAll('input[name="slides"]');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoAdvanceInterval = null;
        this.isPaused = false;

        this.init();
    }

    init() {
        // Start auto-advance
        this.startAutoAdvance();

        // Add event listeners
        this.addKeyboardNavigation();
        this.addHoverPause();
        this.addDotClickHandlers();
    }

    startAutoAdvance() {
        this.autoAdvanceInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, 4000); // 4 seconds
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.slides[this.currentSlide].checked = true;
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.slides[this.currentSlide].checked = true;
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.slides[this.currentSlide].checked = true;
        }
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    addHoverPause() {
        const slideshow = document.querySelector('.slideshow-container');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', () => {
                this.isPaused = true;
            });
            slideshow.addEventListener('mouseleave', () => {
                this.isPaused = false;
            });
        }
    }

    addDotClickHandlers() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }
}

// ================= FORM HANDLING =================
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        const emailField = this.form.querySelector('input[type="email"]');

        // Clear previous errors
        this.clearErrors();

        // Check required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate email
        if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                this.showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }

        return isValid;
    }

    showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        field.style.borderColor = 'red';
    }

    clearErrors() {
        const errors = this.form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => field.style.borderColor = '');
    }

    submitForm() {
        // Simulate form submission (since this is a static site)
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
}

// ================= MOBILE MENU TOGGLE =================
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('nav-toggle');
        this.nav = document.querySelector('nav');
        if (this.toggle && this.nav) {
            this.init();
        }
    }

    init() {
        this.toggle.addEventListener('change', () => {
            if (this.toggle.checked) {
                this.nav.style.display = 'block';
            } else {
                this.nav.style.display = 'none';
            }
        });
    }
}

// ================= REAL-TIME DATE AND TIME =================
class DateTimeUpdater {
    constructor() {
        this.dateTimeElements = document.querySelectorAll('.currentDateTime');
        this.yearElements = document.querySelectorAll('.currentYear');
        if (this.dateTimeElements.length > 0 || this.yearElements.length > 0) {
            this.updateDateTime();
            this.updateYear();
            setInterval(() => this.updateDateTime(), 1000);
        }
    }

    updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        const dateTimeString = now.toLocaleString('en-ZA', options);
        this.dateTimeElements.forEach(el => el.textContent = dateTimeString);
    }

    updateYear() {
        const currentYear = new Date().getFullYear();
        this.yearElements.forEach(el => el.textContent = currentYear);
    }
}

// ================= PRODUCT FILTERING =================
class ProductFilter {
    constructor() {
        this.searchInput = document.getElementById('product-search');
        this.filterButtons = document.querySelectorAll('.filter-button');
        this.productItems = document.querySelectorAll('.product-item');
        this.currentCategory = 'all';
        this.searchTerm = '';

        if (this.searchInput && this.filterButtons.length > 0 && this.productItems.length > 0) {
            this.init();
        }
    }

    init() {
        // Add event listeners
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterByCategory(button));
        });

        this.searchInput.addEventListener('input', () => this.filterBySearch());

        // Initial filter
        this.applyFilters();
    }

    filterByCategory(button) {
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Update current category
        this.currentCategory = button.dataset.category;

        // Apply filters
        this.applyFilters();
    }

    filterBySearch() {
        this.searchTerm = this.searchInput.value.toLowerCase().trim();
        this.applyFilters();
    }

    applyFilters() {
        this.productItems.forEach(item => {
            const category = item.dataset.category;
            const name = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();

            // Check category filter
            const categoryMatch = this.currentCategory === 'all' || category === this.currentCategory;

            // Check search filter
            const searchMatch = this.searchTerm === '' ||
                name.includes(this.searchTerm) ||
                description.includes(this.searchTerm);

            // Show/hide item
            if (categoryMatch && searchMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

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

        // Lightbox navigation - close on any click (overlay or image)
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                this.closeLightbox();
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

// ================= INITIALIZE EVERYTHING =================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slideshow if on homepage
    if (document.querySelector('.slideshow-container')) {
        new SlideshowController();
    }

    // Initialize form handler if contact form exists
    if (document.getElementById('contactForm')) {
        new FormHandler('contactForm');
    }

    // Initialize product filter if on products page
    if (document.querySelector('.product-categories')) {
        new ProductFilter();
    }

    // Initialize lightbox if on products page
    if (document.querySelector('.lightbox-trigger')) {
        new LightboxGallery();
    }

    // Initialize mobile menu
    new MobileMenu();

    // Initialize date and time updater
    new DateTimeUpdater();

    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
