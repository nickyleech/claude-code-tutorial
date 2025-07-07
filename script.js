// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const sideMenu = document.getElementById('side-menu');
const menuLinks = document.querySelectorAll('.menu-link');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const progressIndicator = document.getElementById('progress-indicator');

// Menu overlay for mobile
let menuOverlay = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeTabs();
    initializeProgressIndicator();
    initializeScrollSpy();
    initializeSmoothScroll();
});

// Menu functionality
function initializeMenu() {
    // Create menu overlay
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        toggleMenu();
    });
    
    // Close menu
    closeMenu.addEventListener('click', function() {
        closeMenuHandler();
    });
    
    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        closeMenuHandler();
    });
    
    // Close menu when clicking menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenuHandler();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
            closeMenuHandler();
        }
    });
}

function toggleMenu() {
    const isActive = sideMenu.classList.contains('active');
    
    if (isActive) {
        closeMenuHandler();
    } else {
        openMenuHandler();
    }
}

function openMenuHandler() {
    sideMenu.classList.add('active');
    menuOverlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenuHandler() {
    sideMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Tab functionality
function initializeTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Progress indicator
function initializeProgressIndicator() {
    updateProgressIndicator();
    
    window.addEventListener('scroll', function() {
        updateProgressIndicator();
    });
}

function updateProgressIndicator() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    progressIndicator.style.width = scrollPercentage + '%';
}

// Scroll spy functionality
function initializeScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const menuLinksArray = Array.from(menuLinks);
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active menu link
        menuLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scroll for menu links
function initializeSmoothScroll() {
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Close menu on desktop
    if (window.innerWidth > 768 && sideMenu.classList.contains('active')) {
        closeMenuHandler();
    }
});

// Prevent scroll when menu is open on mobile
function preventScroll(e) {
    if (sideMenu.classList.contains('active')) {
        e.preventDefault();
    }
}

// Touch event handlers for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', function(e) {
    if (sideMenu.classList.contains('active')) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        // If swiping left and not scrolling vertically, close menu
        if (deltaX < -50 && Math.abs(deltaY) < 50) {
            closeMenuHandler();
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Ensure focus stays within menu when open
        if (sideMenu.classList.contains('active')) {
            const focusableElements = sideMenu.querySelectorAll('button, a');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.content-card, .task-card, .practice-card, .example-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .content-card, .task-card, .practice-card, .example-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .content-card.animate-in, .task-card.animate-in, .practice-card.animate-in, .example-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize animation on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker if needed for offline functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Copy code functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('code-block')) {
        // Copy code to clipboard
        const text = e.target.textContent;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function() {
                showCopyFeedback(e.target);
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showCopyFeedback(e.target);
            } catch (err) {
                console.error('Copy failed:', err);
            }
            document.body.removeChild(textArea);
        }
    }
});

function showCopyFeedback(element) {
    const originalText = element.textContent;
    element.textContent = 'Copied!';
    element.style.background = '#059669';
    
    setTimeout(function() {
        element.textContent = originalText;
        element.style.background = '#1f2937';
    }, 1000);
}

// Enhanced accessibility
function enhanceAccessibility() {
    // Add aria labels
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    closeMenu.setAttribute('aria-label', 'Close navigation menu');
    sideMenu.setAttribute('aria-label', 'Navigation menu');
    
    // Add role attributes
    sideMenu.setAttribute('role', 'navigation');
    progressIndicator.setAttribute('role', 'progressbar');
    
    // Update aria-expanded for menu toggle
    menuToggle.addEventListener('click', function() {
        const isExpanded = sideMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Print functionality
function initializePrint() {
    // Add print styles dynamically if needed
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Tutorial';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2563eb;
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        display: none;
    `;
    
    // Show print button on desktop
    if (window.innerWidth > 768) {
        printButton.style.display = 'block';
    }
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
    
    // Show/hide print button based on screen size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            printButton.style.display = 'block';
        } else {
            printButton.style.display = 'none';
        }
    });
}

// Initialize print functionality
initializePrint();

// Analytics placeholder (if needed)
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
}

// Track menu usage
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('menu_click', {
            section: this.getAttribute('href'),
            text: this.textContent
        });
    });
});

// Track tab usage
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('tab_click', {
            tab: this.dataset.tab,
            text: this.textContent
        });
    });
});

// Handle errors gracefully
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log('Page loaded in', Math.round(loadTime), 'ms');
    
    // Track performance
    trackEvent('page_load', {
        loadTime: Math.round(loadTime)
    });
});

// Dark mode toggle (optional feature)
function initializeDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #374151;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        width: 40px;
        height: 40px;
        z-index: 1000;
        display: none;
    `;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        trackEvent('dark_mode_toggle', { enabled: isDark });
    });
    
    document.body.appendChild(darkModeToggle);
}

// Initialize dark mode (commented out for now)
// initializeDarkMode();