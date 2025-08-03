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

// Enhanced functionality for new sections

// Download functionality
function downloadCheatSheetPDF() {
    // Create a comprehensive cheat sheet content
    const cheatSheetData = generateCheatSheetContent();
    downloadFile(cheatSheetData, 'claude-code-cheat-sheet.md', 'text/markdown');
    
    trackEvent('cheat_sheet_download', { format: 'markdown' });
}

function printCheatSheet() {
    // Create a print-friendly version
    const printContent = generatePrintableCheatSheet();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    
    trackEvent('cheat_sheet_print', {});
}

function downloadTemplate(templateType) {
    const templates = {
        portfolio: generatePortfolioTemplate(),
        business: generateBusinessTemplate(),
        webapp: generateWebappTemplate(),
        blog: generateBlogTemplate()
    };
    
    const template = templates[templateType];
    if (template) {
        downloadFile(template.content, template.filename, 'text/markdown');
        trackEvent('template_download', { type: templateType });
    }
}

function downloadProjectTemplate() {
    const template = generateProjectStructureTemplate();
    downloadFile(template, 'project-structure-guide.md', 'text/markdown');
    trackEvent('project_template_download', {});
}

// Helper function to generate cheat sheet content
function generateCheatSheetContent() {
    return `# Claude Code Cheat Sheet

## Essential Commands
- \`claude\` - Start Claude Code in current directory
- \`/help\` - Show all available commands
- \`/memory\` - Edit your CLAUDE.md file
- \`/init\` - Create a new CLAUDE.md file

## VS Code Shortcuts
### Mac
- \`Cmd+Esc\` - Quick launch Claude Code
- \`Cmd+Option+K\` - Reference current file

### Windows/Linux
- \`Ctrl+Esc\` - Quick launch Claude Code
- \`Alt+Ctrl+K\` - Reference current file

## Best Practice Prompts

### Project Review
- "Give me an overview of this project"
- "Review this code for improvements"
- "Analyse this website for performance improvements"

### Feature Development
- "Make this website mobile-friendly"
- "Add accessibility features"
- "Optimise for Vercel deployment"

### Debugging
- "This [element] isn't working on [device/browser]"
- "Explain this error: [error message]"
- "Review this code for potential bugs"

## Pro Tips
- Be specific in your requests
- Mention your target audience and platform
- Ask for explanations to learn while you code
- Use British English spelling (colour, centre, optimise)
- Break large tasks into smaller steps

## Vercel Deployment
- \`vercel\` - Deploy your project
- \`vercel --prod\` - Deploy to production
- Always test mobile responsiveness before deploying
- Add proper meta tags for SEO

Generated with Claude Code Tutorial App
`;
}

function generatePrintableCheatSheet() {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Claude Code Cheat Sheet</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 20px; }
        h1, h2, h3 { color: #2563eb; }
        code { background: #f3f4f6; padding: 2px 4px; border-radius: 3px; }
        .section { margin-bottom: 20px; page-break-inside: avoid; }
        ul { padding-left: 20px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    ${generateCheatSheetContent().replace(/\n/g, '<br>').replace(/#{1,3}\s/g, '<h3>').replace(/- /g, '<li>').replace(/\`([^`]+)\`/g, '<code>$1</code>')}
</body>
</html>`;
}

// Template generators
function generatePortfolioTemplate() {
    return {
        filename: 'portfolio-claude.md',
        content: `# My Portfolio Website

## Project Overview
- Personal portfolio showcasing creative work
- Target audience: potential employers and clients
- Clean, professional design emphasising visual content

## Content Structure
- Homepage with introduction and call-to-action
- Portfolio gallery with project showcases
- About page with personal story and skills
- Contact form for enquiries

## Design Preferences
- Modern, minimalist aesthetic
- Mobile-first responsive design
- Fast loading with optimised images
- Accessibility compliant (WCAG guidelines)

## Technical Requirements
- Static HTML/CSS/JavaScript
- Deploy to Vercel for global performance
- SEO optimised for search visibility
- Social media sharing integration

## Coding Standards
- Use British English throughout
- Semantic HTML5 elements
- CSS Grid and Flexbox for layouts
- Progressive enhancement approach`
    };
}

function generateBusinessTemplate() {
    return {
        filename: 'business-claude.md',
        content: `# Business Website

## Project Overview
- Professional business website
- Target audience: potential customers and partners
- Credible, trustworthy design that converts visitors

## Key Features
- Company information and services
- Team profiles and testimonials
- Contact details and enquiry forms
- News/blog section for updates

## Design Requirements
- Professional, corporate aesthetic
- Strong call-to-action elements
- Mobile-optimised for all devices
- Fast loading for better user experience

## Technical Specifications
- Static site for security and speed
- Vercel deployment for reliability
- Analytics integration for insights
- Contact form with validation

## Content Guidelines
- Clear, professional language
- Focus on benefits to customers
- Include social proof and testimonials
- Regular content updates for SEO`
    };
}

function generateWebappTemplate() {
    return {
        filename: 'webapp-claude.md',
        content: `# Web Application

## Project Overview
- Interactive web application
- Target audience: end users requiring functionality
- Intuitive, user-friendly interface design

## Core Features
- User authentication and profiles
- Interactive functionality and forms
- Data management and storage
- Responsive design for all devices

## Technical Architecture
- Frontend: HTML5, CSS3, JavaScript
- Backend integration capabilities
- API connectivity for data exchange
- Progressive Web App features

## Development Standards
- Component-based architecture
- Accessibility first approach
- Performance optimisation
- Cross-browser compatibility

## Deployment Strategy
- Vercel for frontend hosting
- Environment variable management
- Staging and production environments
- Automated testing and deployment`
    };
}

function generateBlogTemplate() {
    return {
        filename: 'blog-claude.md',
        content: `# Blog & Content Website

## Project Overview
- Content-focused website or blog
- Target audience: readers and subscribers
- SEO-optimised for search visibility

## Content Strategy
- Regular blog posts and articles
- Categories and tagging system
- Author profiles and bios
- Comment system and engagement

## Design Focus
- Readable typography and layout
- Content-first design approach
- Social sharing integration
- Newsletter signup and RSS feeds

## Technical Features
- Static site generation for speed
- SEO meta tags and structured data
- Social media integration
- Analytics and performance tracking

## Content Management
- Easy content creation workflow
- Image optimisation and management
- Content scheduling capabilities
- Search functionality for readers`
    };
}

function generateProjectStructureTemplate() {
    return `# Project Structure Guide

## Recommended Folder Structure

\`\`\`
my-project/
├── CLAUDE.md (project memory)
├── README.md (project overview)
├── index.html (main entry point)
├── styles.css (styling)
├── script.js (functionality)
├── vercel.json (deployment config)
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PATTERNS.md
│   └── CHANGELOG.md
├── examples/
│   ├── basic-usage.html
│   └── advanced-features.js
├── templates/
│   ├── page-template.html
│   └── component-template.js
└── assets/
    ├── images/
    ├── fonts/
    └── icons/
\`\`\`

## Essential Files

### CLAUDE.md
Your project's memory file containing:
- Project overview and goals
- Coding standards and preferences
- Deployment instructions
- Team conventions

### docs/ARCHITECTURE.md
Explains your project structure:
- File organisation rationale
- Design decisions and trade-offs
- Technology choices
- Future planning considerations

### docs/PATTERNS.md
Common coding patterns:
- Naming conventions
- Code style guidelines
- Reusable components
- Best practices

## Benefits of Good Organisation
- Faster onboarding for new team members
- Easier maintenance and updates
- Better collaboration with Claude
- Professional project presentation
- Simplified deployment processes

This structure scales from simple websites to complex applications.
`;
}

// File download utility
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Enhanced checklist functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make checklists interactive
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not([disabled])');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.6';
                trackEvent('checklist_item_completed', {
                    item: label.textContent.substring(0, 50)
                });
            } else {
                label.style.textDecoration = 'none';
                label.style.opacity = '1';
            }
        });
    });
    
    // Add copy functionality to code blocks
    const codeBlocks = document.querySelectorAll('.code-block, .prompt-text');
    codeBlocks.forEach(block => {
        block.style.cursor = 'pointer';
        block.title = 'Click to copy';
        
        block.addEventListener('click', function() {
            const text = this.textContent;
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopyFeedback(this);
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showCopyFeedback(this);
                } catch (err) {
                    console.error('Copy failed:', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });
});

// Enhanced copy feedback
function showCopyFeedback(element) {
    const originalBg = element.style.backgroundColor;
    const originalText = element.textContent;
    
    // Show feedback
    element.style.backgroundColor = '#059669';
    element.style.color = 'white';
    const feedback = document.createElement('span');
    feedback.textContent = '✓ Copied!';
    feedback.style.cssText = `
        position: absolute;
        background: #059669;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
    `;
    
    document.body.appendChild(feedback);
    const rect = element.getBoundingClientRect();
    feedback.style.left = rect.left + 'px';
    feedback.style.top = (rect.top - 30) + 'px';
    
    setTimeout(() => {
        element.style.backgroundColor = originalBg;
        element.style.color = '';
        document.body.removeChild(feedback);
    }, 1000);
}

// Smooth reveal animation for sections
function initializeSectionReveal() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initializeSectionReveal();
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.cheat-card, .template-card, .prompt-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Progress tracking for tutorial completion
function initializeTutorialProgress() {
    const sections = document.querySelectorAll('.section[id]');
    const totalSections = sections.length;
    let visitedSections = new Set();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visitedSections.add(entry.target.id);
                const progress = (visitedSections.size / totalSections) * 100;
                updateProgressIndicator(progress);
                
                trackEvent('section_visited', {
                    section: entry.target.id,
                    progress: Math.round(progress)
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
}

function updateProgressIndicator(percentage) {
    const indicator = document.getElementById('progress-indicator');
    if (indicator) {
        indicator.style.width = percentage + '%';
        
        // Add celebration effect when complete
        if (percentage >= 100) {
            indicator.style.background = 'linear-gradient(90deg, #059669, #10b981)';
            setTimeout(() => {
                indicator.style.background = '#2563eb';
            }, 2000);
        }
    }
}

// Initialize tutorial progress tracking
document.addEventListener('DOMContentLoaded', initializeTutorialProgress);