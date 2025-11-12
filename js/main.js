/**
 * MeatMasters Website JavaScript
 *
 * This script powers the MeatMasters website, a platform for ordering and learning about high-quality meat products
 * including beef, chicken, lamb, pork, and goat. The website features an interactive product catalog, enquiry forms
 * for ordering, contact options, and a responsive design for mobile and desktop users.
 *
 * Key features implemented in this script:
 * - Interactive slideshow for showcasing hero images and products
 * - Form validation and submission for enquiries (pricing, orders) and contact messages
 * - Product filtering and search functionality on the products page
 * - Lightbox gallery for viewing detailed product images with navigation
 * - Mobile-responsive navigation menu
 * - Dynamic date/time and year updates
 * - Smooth scrolling for anchor links
 */

/**
 * Controls the slideshow functionality, including auto-advancing, navigation, and pause on hover.
 */
class SlideshowController {
    /**
     * Initializes the slideshow controller with DOM elements and starts functionality.
     */
    constructor() {
        // Select all radio inputs for slides
        this.slides = document.querySelectorAll('input[name="slides"]');
        // Track current slide index
        this.currentSlide = 0;
        // Total number of slides
        this.totalSlides = this.slides.length;
        // Interval ID for auto-advance
        this.autoAdvanceInterval = null;
        // Flag to pause auto-advance on hover
        this.isPaused = false;
        // Initialize all features
        this.init();
    }

    /**
     * Initializes all slideshow features.
     */
    init() {
        this.startAutoAdvance();
        this.addKeyboardNavigation();
        this.addHoverPause();
        this.addDotClickHandlers();
    }

    /**
     * Starts the auto-advance interval for slides.
     */
    startAutoAdvance() {
        this.autoAdvanceInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, 4000);
    }

    /**
     * Advances to the next slide.
     */
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.slides[this.currentSlide].checked = true;
    }

    /**
     * Goes to the previous slide.
     */
    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.slides[this.currentSlide].checked = true;
    }

    /**
     * Goes to a specific slide by index.
     * @param {number} index - The index of the slide to go to.
     */
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.slides[this.currentSlide].checked = true;
        }
    }

    /**
     * Adds keyboard navigation for arrow keys.
     */
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    /**
     * Adds hover pause functionality to the slideshow container.
     */
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

    /**
     * Adds click handlers to dot navigation elements.
     */
    addDotClickHandlers() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
    }
}

/**
 * Handles form validation, submission, and response display for contact and enquiry forms.
 */
class FormHandler {
    /**
     * Initializes the form handler for a specific form by ID.
     * @param {string} formId - The ID of the form element to handle.
     */
    constructor(formId) {
        // Get the form element by ID
        this.form = document.getElementById(formId);
        // Initialize if form exists
        if (this.form) {
            this.init();
        }
    }

    /**
     * Sets up form submission event listener with validation and submission.
     */
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    /**
     * Validates all form fields based on requirements.
     * @returns {boolean} True if form is valid, false otherwise.
     */
    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        const emailField = this.form.querySelector('input[type="email"]');
        const phoneField = this.form.querySelector('input[type="tel"]');
        const nameField = this.form.querySelector('input[name*="name"]');
        const quantityField = this.form.querySelector('input[name="quantity"]');
        const messageField = this.form.querySelector('textarea[name="message"]');
        this.clearErrors();
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showError(field, 'This field is required');
                isValid = false;
            }
        });
        if (nameField && nameField.value.trim() && nameField.value.trim().length < 2) {
            this.showError(nameField, 'Name must be at least 2 characters long');
            isValid = false;
        }
        if (emailField && emailField.value.trim()) {
            // Basic email regex validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                this.showError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
        }
        if (phoneField && phoneField.value.trim()) {
            // South African phone number regex: starts with +27 or 0, followed by 6-8, then 8 digits
            const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
            if (!phoneRegex.test(phoneField.value)) {
                this.showError(phoneField, 'Please enter a valid South African phone number (e.g., +27123456789 or 0123456789)');
                isValid = false;
            }
        }
        if (quantityField && quantityField.value.trim()) {
            const quantity = parseFloat(quantityField.value);
            if (quantity < 0.5) {
                this.showError(quantityField, 'Minimum quantity is 0.5 kg');
                isValid = false;
            }
        }
        if (messageField && messageField.value.trim() && messageField.value.trim().length < 10) {
            this.showError(messageField, 'Message must be at least 10 characters long');
            isValid = false;
        }
        return isValid;
    }

    /**
     * Displays an error message for a specific field.
     * @param {HTMLElement} field - The form field element.
     * @param {string} message - The error message to display.
     */
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

    /**
     * Clears all error messages and resets field borders.
     */
    clearErrors() {
        const errors = this.form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        const fields = this.form.querySelectorAll('input,textarea,select');
        fields.forEach(field => field.style.borderColor = '');
    }

    /**
     * Submits the form based on its ID (enquiry or contact).
     */
    submitForm() {
        const formId = this.form.id;
        if (formId === 'enquiryForm') {
            this.submitEnquiryForm();
        } else if (formId === 'contactForm') {
            this.submitContactForm();
        }
    }

    /**
     * Handles submission of the enquiry form with simulated processing and response.
     */
    submitEnquiryForm() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        setTimeout(() => {
            const formData = new FormData(this.form);
            const enquiryType = formData.get('enquiryType');
            const product = formData.get('productInterest') || 'mixed';
            const quantity = parseFloat(formData.get('quantity')) || 0;
            const delivery = formData.get('delivery') === 'yes';
            let response = '';
            if (enquiryType === 'volunteer') {
                response = 'Thank you for your interest in volunteering! We appreciate your willingness to contribute to our community. We will review your application and contact you within 3-5 business days with more details about volunteer opportunities.';
            } else if (enquiryType === 'sponsor') {
                response = 'Thank you for considering sponsorship! We value partnerships that help us serve our community better. Our sponsorship coordinator will contact you within 2 business days to discuss opportunities.';
            } else {
                // Price per kg for each product
                const prices = {beef: 180, chicken: 120, lamb: 220, pork: 150, goat: 200, mixed: 170};
                const pricePerKg = prices[product] || prices.mixed;
                const estimatedCost = quantity * pricePerKg;
                const deliveryFee = delivery ? 50 : 0;
                const totalCost = estimatedCost + deliveryFee;
                response = `Thank you for your enquiry! Based on your request:\n\n`;
                response += `Product: ${product.charAt(0).toUpperCase() + product.slice(1)}\n`;
                response += `Quantity: ${quantity} kg\n`;
                response += `Estimated Cost: R${estimatedCost.toFixed(2)}\n`;
                if (delivery) response += `Delivery Fee: R${deliveryFee.toFixed(2)}\n`;
                response += `Total Estimated Cost: R${totalCost.toFixed(2)}\n\n`;
                response += `Availability: In stock (subject to confirmation)\n\n`;
                response += `We will contact you within 1 business day to confirm details and arrange your order.`;
            }
            this.showResponseModal(response);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    /**
     * Handles submission of the contact form by opening a mailto link.
     */
    submitContactForm() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        setTimeout(() => {
            const formData = new FormData(this.form);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const messageType = formData.get('messageType');
            const message = formData.get('message');
            const subject = `MeatMasters Contact: ${messageType.charAt(0).toUpperCase() + messageType.slice(1)}`;
            const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage Type: ${messageType}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:info@meatmasters.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
            alert('Your email client has been opened with your message. Please send the email to complete your submission.');
            this.form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    }

    /**
     * Displays a modal with the response message.
     * @param {string} response - The response text to display.
     */
    showResponseModal(response) {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:1000;`;
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `background:white;padding:2rem;border-radius:8px;max-width:500px;max-height:80vh;overflow-y:auto;text-align:left;`;
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.cssText = `float:right;font-size:1.5rem;background:none;border:none;cursor:pointer;`;
        closeButton.onclick = () => modal.remove();
        const title = document.createElement('h3');
        title.textContent = 'Enquiry Response';
        title.style.marginTop = '0';
        const responseText = document.createElement('pre');
        responseText.textContent = response;
        responseText.style.cssText = `white-space:pre-wrap;font-family:inherit;margin:1rem 0;`;
        modalContent.appendChild(closeButton);
        modalContent.appendChild(title);
        modalContent.appendChild(responseText);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
}

/**
 * Manages the mobile navigation menu toggle.
 */
class MobileMenu {
    /**
     * Initializes the mobile menu with toggle and nav elements.
     */
    constructor() {
        this.toggle = document.getElementById('nav-toggle');
        this.nav = document.querySelector('nav');
        if (this.toggle && this.nav) {
            this.init();
        }
    }

    /**
     * Sets up the toggle event listener for the menu.
     */
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

/**
 * Updates date/time and year elements dynamically.
 */
class DateTimeUpdater {
    /**
     * Initializes the updater with elements to update.
     */
    constructor() {
        this.dateTimeElements = document.querySelectorAll('.currentDateTime');
        this.yearElements = document.querySelectorAll('.currentYear');
        if (this.dateTimeElements.length > 0 || this.yearElements.length > 0) {
            this.updateDateTime();
            this.updateYear();
            setInterval(() => this.updateDateTime(), 1000);
        }
    }

    /**
     * Updates date/time elements with current date and time in South African format.
     */
    updateDateTime() {
        const now = new Date();
        const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'};
        const dateTimeString = now.toLocaleString('en-ZA', options);
        this.dateTimeElements.forEach(el => el.textContent = dateTimeString);
    }

    /**
     * Updates year elements with the current year.
     */
    updateYear() {
        const currentYear = new Date().getFullYear();
        this.yearElements.forEach(el => el.textContent = currentYear);
    }
}

/**
 * Handles product filtering by category and search term with animations.
 */
class ProductFilter {
    /**
     * Initializes the product filter with DOM elements.
     */
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

    /**
     * Sets up event listeners and initial state.
     */
    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterByCategory(button));
        });
        this.searchInput.addEventListener('input', () => this.filterBySearch());
        this.checkUrlHash();
        this.applyFilters();
        // Add fade-in animation to all visible products on page load
        this.productItems.forEach(item => {
            if (item.style.display !== 'none') {
                item.classList.add('fade-in');
            }
        });
    }

    /**
     * Filters products by selected category.
     * @param {HTMLElement} button - The clicked filter button.
     */
    filterByCategory(button) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.currentCategory = button.dataset.category;
        this.applyFilters();
    }

    /**
     * Filters products by search input.
     */
    filterBySearch() {
        this.searchTerm = this.searchInput.value.toLowerCase().trim();
        this.applyFilters();
    }

    /**
     * Checks URL hash for initial category filter.
     */
    checkUrlHash() {
        const hash = window.location.hash.substring(1);
        const validCategories = ['beef', 'chicken', 'lamb', 'pork', 'goat'];
        if (validCategories.includes(hash)) {
            this.currentCategory = hash;
            const targetButton = Array.from(this.filterButtons).find(btn => btn.dataset.category === hash);
            if (targetButton) {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                targetButton.classList.add('active');
            }
        }
    }

    /**
     * Applies current filters to show/hide products with animations.
     */
    applyFilters() {
        let visibleIndex = 0;
        this.productItems.forEach(item => {
            const category = item.dataset.category;
            const name = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const categoryMatch = this.currentCategory === 'all' || category === this.currentCategory;
            const searchMatch = this.searchTerm === '' || name.includes(this.searchTerm) || description.includes(this.searchTerm);
            if (categoryMatch && searchMatch) {
                // Item should be visible
                if (item.style.display === 'none') {
                    item.style.display = 'block';
                    item.classList.remove('fade-out');
                    item.classList.add('fade-in');
                } else {
                    item.classList.remove('fade-out');
                    item.classList.add('fade-in');
                }
                // Apply staggered animation delay based on visible position
                const delay = visibleIndex * 0.05; // 0.05s delay between each item
                item.style.animationDelay = `${delay}s`;
                visibleIndex++;
            } else {
                // Item should be hidden
                item.classList.remove('fade-in');
                item.classList.add('fade-out');
                // Delay hiding to allow fade-out animation
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400); // Match the transition duration
            }
        });
    }
}

/**
 * Manages a lightbox gallery for image viewing with navigation and touch support.
 */
class LightboxGallery {
    /**
     * Initializes the lightbox gallery.
     */
    constructor() {
        this.overlay = null;
        this.currentIndex = 0;
        this.images = [];
        this.currentGallery = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.init();
    }

    /**
     * Initializes the lightbox by creating HTML and binding events.
     */
    init() {
        this.createLightboxHTML();
        this.bindEvents();
    }

    /**
     * Creates the lightbox HTML structure and appends it to the body.
     */
    createLightboxHTML() {
        const lightboxHTML = `<div class="lightbox-overlay" id="lightbox-overlay"><div class="lightbox-container"><button class="lightbox-nav lightbox-prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button><button class="lightbox-nav lightbox-next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button><button class="lightbox-close" aria-label="Close lightbox"><i class="fas fa-times"></i></button><div class="lightbox-counter"></div><img class="lightbox-image" src="" alt=""><div class="lightbox-caption"></div><div class="lightbox-loading"></div></div></div>`;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.overlay = document.getElementById('lightbox-overlay');
    }

    /**
     * Binds all event listeners for the lightbox functionality.
     */
    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox-trigger')) {
                e.preventDefault();
                this.openLightbox(e.target);
            }
        });
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => this.closeLightbox());
        }
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
        if (this.overlay) {
            this.overlay.addEventListener('touchstart', (e) => this.touchStartX = e.changedTouches[0].screenX);
            this.overlay.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            });
        }
    }

    /**
     * Opens the lightbox for a specific trigger element.
     * @param {HTMLElement} triggerElement - The element that triggered the lightbox.
     */
    openLightbox(triggerElement) {
        const gallery = triggerElement.dataset.gallery || 'default';
        this.currentGallery = gallery;
        this.images = Array.from(document.querySelectorAll(`[data-gallery="${gallery}"]`));
        this.currentIndex = this.images.indexOf(triggerElement);
        this.showImage(this.currentIndex);
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Shows a specific image in the lightbox by index.
     * @param {number} index - The index of the image to show.
     */
    showImage(index) {
        if (index < 0 || index >= this.images.length) return;
        this.currentIndex = index;
        const image = this.images[index];
        const lightboxImage = this.overlay.querySelector('.lightbox-image');
        const caption = this.overlay.querySelector('.lightbox-caption');
        const counter = this.overlay.querySelector('.lightbox-counter');
        const loading = this.overlay.querySelector('.lightbox-loading');
        loading.style.display = 'block';
        lightboxImage.style.opacity = '0';
        counter.textContent = `${this.currentIndex + 1}/${this.images.length}`;
        const altText = image.getAttribute('alt') || image.getAttribute('title') || '';
        caption.textContent = altText;
        const img = new Image();
        img.onload = () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = altText;
            loading.style.display = 'none';
            lightboxImage.style.opacity = '1';
        };
        img.src = image.src;
    }

    /**
     * Shows the next image in the gallery.
     */
    showNext() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(nextIndex);
    }

    /**
     * Shows the previous image in the gallery.
     */
    showPrevious() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(prevIndex);
    }

    /**
     * Handles swipe gestures for touch navigation.
     */
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

    /**
     * Closes the lightbox and restores page scroll.
     */
    closeLightbox() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slideshow if container exists
    if (document.querySelector('.slideshow-container')) {
        new SlideshowController();
    }
    // Initialize contact form handler if form exists
    if (document.getElementById('contactForm')) {
        new FormHandler('contactForm');
    }
    // Initialize enquiry form handler if form exists
    if (document.getElementById('enquiryForm')) {
        new FormHandler('enquiryForm');
    }
    // Initialize product filter if categories exist
    if (document.querySelector('.product-categories')) {
        new ProductFilter();
    }
    // Initialize lightbox if triggers exist
    if (document.querySelector('.lightbox-trigger')) {
        new LightboxGallery();
    }
    // Always initialize mobile menu and date/time updater
    new MobileMenu();
    new DateTimeUpdater();
    // Add smooth scrolling to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({behavior: 'smooth'});
            }
        });
    });
});
