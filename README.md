# 🎨 Mood-Based Color Palette Generator

A sophisticated Angular application that generates curated color palettes based on moods and emotions. Perfect for designers, creative professionals, and developers seeking color inspiration with scientific backing.

## ✨ Features

### Core Features
- **Mood Search** - Type any mood to get a color palette
- **Auto-complete Suggestions** - Quick access to 10 predefined moods
- **Multiple Export Formats** - Download as JSON or CSS variables

### Advanced Features
- **🎲 Random Palette Generator** - Instant inspiration with one click
- **🧠 Color Psychology Info** - Scientific explanations of color meanings
- **🌈 Gradient Preview** - Visual gradient display of the palette
- **🔄 Mood Mixer** - Combine two moods to create hybrid palettes
- **♿ WCAG Accessibility Checker** - Contrast ratios and accessibility compliance

## 🎯 Available Moods

Happy • Sad • Calm • Energetic • Romantic • Mysterious • Peaceful • Creative • Melancholic • Playful

## 🚀 Quick Start

### Prerequisites
- Node.js v24.15.0+
- npm 11.12.1+
- Angular CLI 21.2.11

### Installation & Running

```powershell
# Install dependencies
npm install

# Start development server
npm start

# App opens at http://localhost:4200/
```

## 📖 How to Use

1. **Type a mood** (e.g., "happy", "calm", "creative")
2. **View the palette** - See colors with names and hex codes
3. **Explore features**:
   - 🎲 Click Random for instant palettes
   - 🔄 Mix two moods together
   - ♿ Check WCAG accessibility
4. **Download** - Export as JSON or CSS

## 🏗️ Project Structure

```
src/app/
├── app.ts                      # Component logic
├── app.html                    # Template UI
├── app.css                     # Styling
├── color-palette.service.ts    # Color data & utilities
```

## 🎨 Technologies

- **Framework**: Angular 17+ (Standalone Components)
- **Language**: TypeScript
- **Styling**: CSS3 Variables, Dark Theme
- **Features**: Responsive, Animations, Accessibility

## 💾 Export Options

### JSON
```json
{
  "mood": "Happy",
  "colors": ["Sunny Yellow", "Warm Orange"],
  "hexCodes": ["#FFD700", "#FF8C00"]
}
```

### CSS Variables
```css
:root {
  --color-1: #FFD700;
  --color-1-name: "Sunny Yellow";
}
```

## ♿ Accessibility

- WCAG AA/AAA contrast ratios
- Luminance calculation
- Dark theme for reduced eye strain
- ARIA labels & semantic HTML
- Screen reader friendly

## 🧠 Color Psychology

Each mood includes scientific explanations of color psychology:
- Warm colors evoke energy and warmth
- Cool colors promote calmness
- Saturation affects vibrancy
- Luminance impacts readability

## 📦 Available Commands

```powershell
# Development
npm start              # Start dev server

# Building
npm run build          # Production build

# Testing
npm test              # Run tests

# Additional
ng serve --open       # Open in browser automatically
ng build --prod       # Optimized production build
```

## 🎯 Perfect For

- Graphic Designers - Color inspiration
- Web Developers - Design system colors
- Brand Teams - Mood-based branding
- Creatives - Portfolio projects
- Students - Color theory learning

## 📄 License

MIT License - Open source and free to use

## 👨‍💻 About

Created as a portfolio project demonstrating:
- Angular development expertise
- Color science & psychology
- UX/UI design principles
- Web accessibility standards
- Modern web development practices

---

**Made with ❤️ for designers and creatives** 🎨
