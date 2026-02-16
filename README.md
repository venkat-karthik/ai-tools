# AI Tools Directory

A beautiful, interactive directory of 300+ AI tools with stunning 3D carousel homepage and flip card design.

## 🎨 Features

### Homepage (home.html)
- **3D Rotating Carousel** - Showcasing featured AI tools in a mesmerizing 3D animation
- **Category Cards** - Quick navigation to different tool categories
- **Feature Highlights** - Why choose our platform
- **Modern Design** - Gradient backgrounds and smooth animations

### Tools Page (index.html)
- **Flip Card Design** - Hover over cards to reveal tool details
- **Category Filtering** - 12 categories with color coding
- **Real-time Search** - Find tools instantly
- **Add New Tools** - Add tools directly from the UI
- **Persistent Storage** - All changes saved in localStorage
- **Responsive Design** - Works on all devices

## 🚀 Quick Start

1. Open `home.html` for the landing page
2. Click "Explore All Tools" or navigate to `index.html` for the full directory
3. Hover over tool cards to see descriptions and links
4. Click "Visit Tool →" to open the tool's website

## 📁 Project Structure

```
├── home.html           # Landing page with 3D carousel
├── home-styles.css     # Styles for homepage
├── index.html          # Tools directory page
├── styles.css          # Styles for tools page (flip cards)
├── tools-data.js       # Database of 300 tools
├── app.js             # Application logic
└── README.md          # This file
```

## 🎯 Tool Card Interaction

- **Hover** - Card flips to show description and link
- **Front** - Tool name, icon, and category badge
- **Back** - Full description and "Visit Tool" button
- **Animated Border** - Rotating gradient effect on hover

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css` and `home-styles.css`:

```css
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    --background: #0a0a0a;
}
```

### Categories
12 categories with unique colors and icons:
- 💻 IDE & Coding
- 🎬 Video & Image  
- ⚡ Productivity
- ⚙️ Automation
- ✍️ Content Creation
- 📈 Marketing
- 🎨 Design
- 📚 Learning
- 🚀 Deployment
- 🔌 APIs

## 🌟 Technologies

- Pure HTML, CSS, and JavaScript
- CSS 3D Transforms for carousel
- CSS Flip animations for cards
- LocalStorage for persistence
- Responsive grid layouts

## 📊 Total Tools: 300

All tools from your collection are included and categorized!

Enjoy exploring! 🚀
