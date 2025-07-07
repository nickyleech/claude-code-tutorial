# Claude Code Tutorial App

A minimalistic, mobile-friendly tutorial for Claude Code designed for non-technical users. Built with British English and optimised for all devices.

## 🌟 Features

- **Mobile-First Design** - Perfect on phones, tablets, and desktops
- **British English** - Localised content and terminology
- **Minimalistic Interface** - Clean, professional design
- **Interactive Navigation** - Smooth scrolling and hamburger menu
- **Progressive Enhancement** - Works without JavaScript
- **Accessibility** - ARIA labels and keyboard navigation
- **Print-Friendly** - Optimised for printing

## 🚀 Quick Start

### Local Development
```bash
# Navigate to project directory
cd claude-code-tutorial-app

# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Deploy to Vercel

#### Option 1: Using Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd claude-code-tutorial-app

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

#### Option 2: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub, GitLab, or Bitbucket
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect the configuration
6. Click "Deploy"

#### Option 3: Direct Upload
1. Zip the entire `claude-code-tutorial-app` folder
2. Go to [vercel.com](https://vercel.com)
3. Drag and drop the zip file
4. Your app will be deployed instantly

## 📁 Project Structure

```
claude-code-tutorial-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styles (mobile-first)
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
└── README.md          # This file
```

## 🎨 Design Features

- **Responsive Grid Layout** - Adapts to all screen sizes
- **Touch-Friendly Interface** - Large buttons and touch targets
- **Smooth Animations** - Elegant transitions and effects
- **Progress Indicator** - Shows reading progress
- **Copy Code Feature** - Click code blocks to copy
- **Print Functionality** - Print-friendly version available

## 🔧 Configuration

### Vercel Configuration (vercel.json)
- Static site deployment
- Security headers
- Cache optimisation
- SPA routing support

### Performance Optimisations
- Minified CSS and JavaScript
- Optimised images
- Efficient loading
- Mobile-first approach

## 📱 Mobile Features

- **Hamburger Menu** - Space-efficient navigation
- **Touch Gestures** - Swipe to close menu
- **Responsive Typography** - Readable on all devices
- **Optimised Images** - Fast loading on mobile networks

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔒 Security

- Content Security Policy headers
- XSS protection
- Frame options
- HTTPS by default on Vercel

## 📊 Analytics

The app includes placeholder analytics tracking that can be connected to:
- Google Analytics
- Vercel Analytics
- Custom tracking solutions

## 🎯 SEO Optimisation

- Semantic HTML structure
- Meta tags for social sharing
- Mobile-friendly design
- Fast loading times
- Accessibility features

## 🔄 Updates

To update the deployed app:
1. Make changes to your files
2. Commit to your repository
3. Vercel will automatically redeploy

Or use the CLI:
```bash
vercel --prod
```

## 🐛 Troubleshooting

### Common Issues

**App not loading:**
- Check console for JavaScript errors
- Verify all files are present
- Ensure proper file permissions

**Mobile menu not working:**
- Check JavaScript is enabled
- Verify touch events are supported
- Test on different devices

**Styling issues:**
- Clear browser cache
- Check CSS file is loading
- Verify media queries

## 📝 License

MIT License - feel free to use and modify for your own projects.

## 🤝 Contributing

This is a tutorial project, but suggestions for improvements are welcome!

## 📞 Support

For issues with Claude Code itself, visit the [official documentation](https://docs.anthropic.com/en/docs/claude-code).

---

**Live Demo:** [Your Vercel URL will appear here after deployment]

Built with ❤️ for the Claude Code community