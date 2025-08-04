# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive tutorial application for Claude Code, designed as a beginner-friendly educational resource. The project consists of static HTML/CSS/JavaScript files that create an interactive tutorial website about using Claude Code effectively.

## Development Commands

### Local Development
```bash
# Start local development server
npm run dev
# or
python3 -m http.server 8000

# Access at http://localhost:8000
```

### Deployment
```bash
# Deploy to Vercel (production)
npm run deploy
# or
vercel --prod

# Build check (static site, no build step needed)
npm run build
```

### File Structure
- `index.html` - Main comprehensive tutorial application
- `styles.css` - Complete styling with responsive design and British English optimizations
- `script.js` - Interactive functionality including menu system, tabs, progress tracking
- `minimal-blue-*.html/css/js` - Alternative minimalist design implementation
- `vercel.json` - Static site deployment configuration
- `REMAINING_WORK.md` - Detailed roadmap and development plan

## Architecture

### Multi-Design System
The repository contains two distinct design implementations:

1. **Main Tutorial App** (`index.html`, `styles.css`, `script.js`)
   - Comprehensive tutorial with extensive content sections
   - Categorized navigation with collapsible sections
   - Progress indicators and smooth scrolling
   - Mobile-first responsive design
   - British English terminology throughout

2. **Minimalist Blue Theme** (`minimal-blue-*.` files)
   - Clean, modern design with blue color scheme
   - Sidebar navigation layout
   - Production-ready with accessibility features
   - CSS Grid and Flexbox layouts

### JavaScript Architecture (`script.js`)
The main application uses a modular JavaScript approach:

- **Menu System**: Collapsible categorized navigation with mobile overlay
- **Tab System**: Interactive content switching within sections
- **Progress Tracking**: Visual indication of reading progress
- **Smooth Scrolling**: Enhanced navigation experience
- **Search Functionality**: Real-time navigation search
- **Accessibility**: Keyboard navigation and screen reader support

Key initialization functions:
- `initializeMenu()` - Mobile-responsive menu with overlay
- `initializeTabs()` - Content tabbing system
- `initializeProgressIndicator()` - Reading progress visualization
- `initializeScrollSpy()` - Active section highlighting
- `initializeCategorizedNavigation()` - Collapsible sections

### CSS Architecture (`styles.css`)
- **Mobile-first responsive design** with British English considerations
- **Categorized navigation system** with visual hierarchy
- **Progressive enhancement** approach
- **CSS custom properties** for consistent theming
- **Print-friendly styles** for offline reference
- **Accessibility optimizations** including high contrast and reduced motion support

## Content Structure & Navigation

The tutorial is organized into categorized sections:

### 🚀 Getting Started
- Introduction to Claude Code
- Installation and setup
- First chat examples

### 📚 Core Concepts  
- CLAUDE.md file creation and management
- Project organization patterns
- Testing strategies with Claude

### 💡 Advanced Features
- Best prompts library
- VS Code integration
- Vercel deployment mastery

### 🛠️ Integrations
- Storage integration (localStorage to enterprise databases)
- API integration patterns (REST, GraphQL, WebSockets)
- Data sources (CMS, real-time data, analytics)

### 📖 Reference
- Downloadable cheat sheets
- Common task examples
- Best practices and safety guidelines

## British English Localization

The entire application uses British English:
- Spelling: "organised", "optimisation", "colour", "realise"
- Terminology: "whilst", "amongst", "towards"
- Currency: UK pricing with VAT considerations
- Cultural references: UK-specific examples and case studies

## Development Guidelines

### When Adding New Content Sections
1. Update the categorized navigation in `index.html`
2. Add corresponding styles in `styles.css` following the existing pattern
3. Include mobile-responsive considerations
4. Add appropriate accessibility labels (ARIA)
5. Update search functionality in `script.js` if needed
6. Include UK cost analysis where applicable
7. Provide downloadable resources where relevant

### When Modifying Navigation
The navigation system uses a complex hierarchical structure:
- Categories are collapsible with expand/collapse functionality
- Search functionality filters across all menu items
- Active section highlighting updates based on scroll position
- Mobile overlay system handles small screen interactions

### CSS Modifications
- Follow the mobile-first approach
- Use CSS custom properties for consistency
- Maintain the established grid and flexbox patterns
- Include print styles for new sections
- Test across the defined browser support matrix

### JavaScript Enhancements
- All new functionality should integrate with the existing module pattern
- Maintain keyboard accessibility
- Include appropriate error handling
- Follow the established event delegation patterns

## Integration with External Services

### Vercel Deployment
- Configured as static site with `@vercel/static`
- No build process required
- Automatic deployment on git push
- Security headers configured

### Content Management
- Static content approach for reliability
- Downloadable resources served directly
- No external dependencies for core functionality
- Progressive enhancement philosophy

## Quality Standards

### Performance
- Mobile-first loading optimization
- Smooth scrolling and transitions
- Minimal JavaScript for core functionality
- Efficient CSS with minimal reflow

### Accessibility
- WCAG 2.1 AA compliance target
- Keyboard navigation throughout
- Screen reader optimizations
- High contrast and reduced motion support

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge latest versions)
- Mobile browser optimization
- Progressive enhancement fallbacks

## Current Development Status

According to `REMAINING_WORK.md`, the project is in active development with:
- **Completed**: Core tutorial sections, storage/API/data integration guides
- **In Progress**: Navigation improvements and GitHub integration
- **Planned**: Python integration, cost analysis enhancements, automation features

The roadmap includes ambitious plans for automated content updates from official Claude Code sources and comprehensive UK market analysis.

## Working with This Codebase

When making changes:
1. Consider both design systems if modifications affect core functionality
2. Maintain the British English terminology and cultural context
3. Update the comprehensive navigation system if adding new sections
4. Test mobile responsiveness thoroughly
5. Include appropriate cost analysis for any new services discussed
6. Maintain the educational, beginner-friendly tone throughout

The codebase emphasizes practical, real-world examples with a strong focus on UK market considerations and professional-grade implementation patterns.