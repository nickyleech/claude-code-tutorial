/**
 * Minimalist Blue Website - Interactive JavaScript
 * Handles sidebar navigation, smooth scrolling, and accessibility features
 */

class MinimalistSite {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebar-toggle');
        this.mobileOverlay = document.getElementById('mobile-overlay');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupAccessibility();
        this.setupSmoothScrolling();
        this.setupFormValidation();
        
        // Initialize sidebar state based on screen size
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        
        console.log('Minimalist Blue Site initialized successfully');
    }
    
    setupEventListeners() {
        // Sidebar toggle functionality
        this.sidebarToggle?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleSidebar();
        });
        
        // Mobile overlay click to close sidebar
        this.mobileOverlay?.addEventListener('click', () => {
            this.closeSidebar();
        });
        
        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e, link);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
        
        // Close sidebar when clicking outside on desktop
        document.addEventListener('click', (e) => {
            if (window.innerWidth >= 1024) return; // Only for mobile/tablet
            
            if (!this.sidebar?.contains(e.target) && 
                !this.sidebarToggle?.contains(e.target) && 
                this.sidebar?.classList.contains('open')) {
                this.closeSidebar();
            }
        });
    }
    
    setupIntersectionObserver() {
        // Highlight active navigation based on scroll position
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                }
            });
        }, observerOptions);
        
        this.sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });
    }
    
    setupAccessibility() {
        // Add focus trap for sidebar when open on mobile
        this.sidebar?.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.trapFocus(e);
            }
        });
        
        // Announce sidebar state changes for screen readers
        const sidebarToggle = this.sidebarToggle;
        if (sidebarToggle) {
            sidebarToggle.setAttribute('aria-expanded', 'false');
            sidebarToggle.setAttribute('aria-controls', 'sidebar');
        }
        
        // Add skip link
        this.addSkipLink();
    }
    
    setupSmoothScrolling() {
        // Polyfill for smooth scrolling if not supported
        if (!('scrollBehavior' in document.documentElement.style)) {
            this.polyfillSmoothScrolling();
        }
    }
    
    setupFormValidation() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(contactForm);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    toggleSidebar() {
        const isOpen = this.sidebar?.classList.contains('open');
        
        if (isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }
    
    openSidebar() {
        this.sidebar?.classList.add('open');
        this.mobileOverlay?.classList.add('active');
        this.sidebarToggle?.setAttribute('aria-expanded', 'true');
        
        // Focus first nav link for keyboard users
        const firstNavLink = this.sidebar?.querySelector('.nav-link');
        if (window.innerWidth < 1024) {
            firstNavLink?.focus();
        }
        
        // Prevent body scrolling on mobile
        if (window.innerWidth < 1024) {
            document.body.style.overflow = 'hidden';
        }
        
        this.announceToScreenReader('Navigation menu opened');
    }
    
    closeSidebar() {
        this.sidebar?.classList.remove('open');
        this.mobileOverlay?.classList.remove('active');
        this.sidebarToggle?.setAttribute('aria-expanded', 'false');
        
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Return focus to toggle button
        if (window.innerWidth < 1024) {
            this.sidebarToggle?.focus();
        }
        
        this.announceToScreenReader('Navigation menu closed');
    }
    
    handleNavClick(e, link) {
        const href = link.getAttribute('href');
        
        if (href?.startsWith('#')) {
            e.preventDefault();
            const targetId = href.slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close sidebar on mobile after navigation
                if (window.innerWidth < 1024) {
                    this.closeSidebar();
                }
                
                // Smooth scroll to section
                this.scrollToSection(targetSection);
                
                // Update URL without causing page jump
                history.pushState(null, null, href);
                
                // Update active state
                this.updateActiveNavLink(targetId);
            }
        }
    }
    
    handleKeyboardNavigation(e) {
        // Escape key closes sidebar
        if (e.key === 'Escape' && this.sidebar?.classList.contains('open')) {
            this.closeSidebar();
        }
        
        // Arrow key navigation in sidebar
        if (this.sidebar?.contains(document.activeElement)) {
            this.handleArrowKeyNavigation(e);
        }
    }
    
    handleArrowKeyNavigation(e) {
        const focusableElements = Array.from(
            this.sidebar?.querySelectorAll('.nav-link, .social-link, .sidebar-toggle') || []
        );
        
        const currentIndex = focusableElements.indexOf(document.activeElement);
        
        if (currentIndex === -1) return;
        
        let nextIndex;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                nextIndex = (currentIndex + 1) % focusableElements.length;
                break;
            case 'ArrowUp':
                e.preventDefault();
                nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
                break;
            default:
                return;
        }
        
        focusableElements[nextIndex]?.focus();
    }
    
    trapFocus(e) {
        if (window.innerWidth >= 1024) return; // Only trap focus on mobile
        
        const focusableElements = Array.from(
            this.sidebar?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) || []
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    updateActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }
    
    scrollToSection(section) {
        const headerOffset = window.innerWidth >= 1024 ? 80 : 60;
        const sectionTop = section.offsetTop - headerOffset;
        
        // Use native smooth scrolling if supported
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        } else {
            // Fallback smooth scrolling
            this.smoothScrollTo(sectionTop);
        }
    }
    
    smoothScrollTo(targetY) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const duration = 800;
        let start = null;
        
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function
            const ease = percentage < 0.5 
                ? 2 * percentage * percentage 
                : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
            
            window.scrollTo(0, startY + distance * ease);
            
            if (progress < duration) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }
    
    handleResize() {
        const isDesktop = window.innerWidth >= 1024;
        
        if (isDesktop) {
            // Desktop: show sidebar, hide overlay
            this.sidebar?.classList.remove('open');
            this.mobileOverlay?.classList.remove('active');
            document.body.style.overflow = '';
            this.sidebarToggle?.setAttribute('aria-expanded', 'false');
        } else {
            // Mobile/Tablet: hide sidebar by default
            if (!this.sidebar?.classList.contains('open')) {
                this.sidebarToggle?.setAttribute('aria-expanded', 'false');
            }
        }
    }
    
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        this.clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required`;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Show error if validation failed
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #dc2626;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorElement);
        
        // Add error styles to field
        field.style.borderColor = '#dc2626';
    }
    
    getFieldLabel(field) {
        const label = field.parentNode.querySelector('label');
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }
    
    handleFormSubmit(form) {
        const formData = new FormData(form);
        let isFormValid = true;
        
        // Validate all fields
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.announceToScreenReader('Please correct the errors in the form');
            return;
        }
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showFormSuccess(form);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
        
        console.log('Form submitted:', Object.fromEntries(formData));
    }
    
    showFormSuccess(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        successMessage.style.cssText = `
            background: #dcfce7;
            border: 1px solid #16a34a;
            color: #15803d;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
        `;
        
        form.insertBefore(successMessage, form.firstChild);
        form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
        this.announceToScreenReader('Message sent successfully');
    }
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    polyfillSmoothScrolling() {
        // Add smooth scrolling polyfill for older browsers
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        this.scrollToSection(target);
                    }
                }
            });
        });
    }
}

// Initialize the site when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MinimalistSite();
    });
} else {
    new MinimalistSite();
}

// Add error styles to CSS dynamically
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #dc2626 !important;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }
    
    .field-error {
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .form-success {
        background: #dcfce7;
        border: 1px solid #16a34a;
        color: #15803d;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
`;
document.head.appendChild(errorStyles);