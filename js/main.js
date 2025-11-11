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
        this.dateTimeElement = document.getElementById('currentDateTime');
        if (this.dateTimeElement) {
            this.updateDateTime();
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
        this.dateTimeElement.textContent = now.toLocaleString('en-ZA', options);
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
