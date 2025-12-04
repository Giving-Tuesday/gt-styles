# GivingTuesday Data Commons Style Framework

A comprehensive SCSS framework implementing the official GivingTuesday Data Commons 2025 Brand Guidelines. Built for seamless integration across WordPress, Reveal.js, Leaflet maps, React applications, and static SPAs.

## Features

- **Brand-compliant design tokens** - Colors, typography, spacing following official guidelines
- **Platform-specific modules** - Optimized styles for different use cases
- **CSS Custom Properties** - Runtime theming without recompilation
- **JavaScript token exports** - ES modules, CommonJS, and JSON for React/design tools
- **Validation utilities** - Enforce brand rules programmatically
- **Responsive mixins** - Mobile-first breakpoint system
- **Accessibility-first** - WCAG 2.1 AA compliant contrast ratios

## Quick Start

### Installation

```bash
npm install gt-styles
```

Or clone and build locally:

```bash
git clone https://github.com/givingtuesday/gt-styles.git
cd gt-styles
npm install
npm run build
```

### Basic Usage

#### SCSS Import

```scss
// Import everything
@use 'gt-styles/scss/core';

// Or import specific modules
@use 'gt-styles/scss/core/variables' as *;
@use 'gt-styles/scss/core/mixins' as *;
```

#### CSS Link

```html
<!-- Full SPA stylesheet -->
<link rel="stylesheet" href="gt-styles/dist/css/modules/spa/gt-spa.css">

<!-- Or specific modules -->
<link rel="stylesheet" href="gt-styles/dist/css/modules/wordpress/gt-wordpress.css">
```

#### JavaScript Tokens

```javascript
// ES Module
import { colors, typography, getColor } from 'gt-styles/dist/tokens/tokens.js';

// CommonJS
const { colors, spacing } = require('gt-styles/dist/tokens/tokens.cjs');

// Use in CSS-in-JS
const styles = {
  color: colors.navy,
  fontFamily: typography.fontFamilies.primary,
};
```

## Color Palette

### Primary Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Red | `#ED132E` | `--gt-red` | Primary brand, CTAs, logos |
| Navy | `#001548` | `--gt-navy` | Headlines, text on light |
| Black | `#000000` | `--gt-black` | Body text alternative |

### Secondary Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Lavender | `#CAC7F8` | `--gt-lavender` | Backgrounds, graphics |
| Light Blue | `#6CF4FF` | `--gt-light-blue` | Backgrounds, accents |
| Beige | `#FDF7F7` | `--gt-beige` | Light backgrounds |

### Digital Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Teal | `#0fb5c3` | `--gt-teal` | Links, interactive elements |
| Teal Hover | `#10c8d8` | `--gt-teal-hover` | Hover states |
| Copy | `#1b1a19` | `--gt-copy` | Body text |

## Typography

### Font Families
- **Primary**: Montserrat (headlines, labels, UI)
- **Secondary**: Georgia (body copy)

```scss
// Use via mixins
@include h1;  // Montserrat SemiBold, 72px, line-height 1.1
@include h2;  // Montserrat SemiBold, 48px
@include body-text;  // Georgia, 16px, line-height 1.4
@include label-text;  // Montserrat uppercase, tracking wide
```

### Type Scale
| Style | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| H1 | Montserrat | 72px | 600 | 1.1 |
| H2 | Montserrat | 48px | 600 | 1.1 |
| H3 | Montserrat | 32px | 400 | 1.2 |
| H4 | Montserrat | 24px | 500 | 1.2 |
| Body | Georgia | 16px | 400 | 1.4 |
| Label | Montserrat | 18px | 400 | 1.3 |

## Spacing

All spacing uses an 8px base unit:

```scss
$spacer-1: 8px;
$spacer-2: 16px;
$spacer-3: 24px;
$spacer-4: 32px;
// ... up to $spacer-20: 160px

// Use via function
padding: spacer(4);  // 32px
margin: gt-space(3); // 24px
```

## Platform Modules

### WordPress / Gutenberg

```scss
@use 'gt-styles/scss/modules/wordpress/gt-wordpress';
```

Includes:
- Gutenberg block styles
- Alignment utilities (alignwide, alignfull)
- Color palette classes for block editor
- Custom GT blocks (stats, CTA, cards)

### Reveal.js Presentations

```scss
@use 'gt-styles/scss/modules/reveal/gt-reveal';
```

Features:
- Branded slide backgrounds
- Section header variants
- Two-column layouts
- Statistics display
- Code block styling

### Leaflet Maps

```scss
@use 'gt-styles/scss/modules/leaflet/gt-leaflet';
```

Includes:
- Popup and tooltip styling
- Custom marker classes
- Legend component
- Choropleth palettes
- Control overrides

### React Components

```scss
@use 'gt-styles/scss/modules/react/gt-react';
```

Provides:
- Button variants and states
- Form elements
- Cards, badges, alerts
- Modal, tabs, accordion
- Loading states (skeleton, spinner)

### Static SPA

```scss
@use 'gt-styles/scss/modules/spa/gt-spa';
```

Complete stylesheet including:
- CSS reset
- Typography
- Layout utilities
- All components
- Header/footer
- Responsive utilities

## Mixins Reference

### Media Queries

```scss
@include media-up('md') { ... }    // min-width: 768px
@include media-down('lg') { ... }  // max-width: 991.98px
@include media-between('sm', 'lg') { ... }
```

### Components

```scss
@include button-base;      // Base button styles
@include button-primary;   // Red background
@include button-secondary; // Navy background
@include button-outline;   // Bordered variant

@include card;             // Card with shadow
@include input;            // Form input styling
@include container('lg');  // Centered container
```

### Layout

```scss
@include flex-center;      // Center both axes
@include flex-between;     // Space between
@include grid(3, $spacer-4); // 3-column grid
```

## Brand Rules

### Forbidden Color Combinations

**Never combine Red (#ED132E) and Lavender (#CAC7F8)**

```javascript
import { isValidColorCombo } from 'gt-styles/dist/tokens/tokens.js';

isValidColorCombo('#ED132E', '#CAC7F8'); // false
isValidColorCombo('#ED132E', '#001548'); // true
```

### Typography-Safe Colors

These colors should NOT be used for text:
- Light Blue (#6CF4FF)
- Lavender (#CAC7F8)
- Beige (#FDF7F7) - except on dark backgrounds

```javascript
import { isTypographySafe } from 'gt-styles/dist/tokens/tokens.js';

isTypographySafe('#6CF4FF'); // false
isTypographySafe('#001548'); // true
```

### Photo Border Radius

Maximum border radius for photos: **50px**

```scss
@include photo-radius; // border-radius: 50px
```

## File Structure

```
gt-styles/
├── scss/
│   ├── core/
│   │   ├── _variables.scss      # Design tokens
│   │   ├── _custom-properties.scss # CSS variables
│   │   ├── _functions.scss      # Helper functions
│   │   ├── _mixins.scss         # Reusable patterns
│   │   ├── _typography.scss     # Font imports & styles
│   │   └── _index.scss          # Barrel export
│   ├── modules/
│   │   ├── reveal/              # Reveal.js theme
│   │   ├── leaflet/             # Leaflet map styles
│   │   ├── wordpress/           # WordPress/Gutenberg
│   │   ├── react/               # React components
│   │   └── spa/                 # Static SPA
│   └── gt-styles.scss           # Main entry
├── dist/
│   ├── css/                     # Compiled CSS
│   └── tokens/
│       ├── tokens.js            # ES module
│       ├── tokens.cjs           # CommonJS
│       └── tokens.json          # JSON for design tools
├── demos/
│   ├── brand-pdf-style.html     # PDF brand style demo
│   ├── website-style.html       # Website style demo
│   ├── reveal-demo.html         # Presentation demo
│   └── leaflet-demo.html        # Map demo
└── scripts/
    └── build-tokens.js          # Token generator
```

## Build Commands

```bash
# Build everything
npm run build

# Build CSS only
npm run build:css

# Build tokens only
npm run build:tokens

# Watch for changes
npm run watch
```

## Theming

### Dark Mode

```html
<html data-theme="dark">
```

CSS custom properties automatically adjust for dark backgrounds.

### High Contrast

```html
<html data-theme="high-contrast">
```

Enhances contrast for accessibility compliance.

### Custom Theme

Override CSS custom properties:

```css
:root {
  --color-primary: #custom-color;
  --color-background: #another-color;
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following existing conventions
4. Ensure all demos render correctly
5. Submit a pull request

## License

MIT License - See LICENSE file for details.

---

Built with care for the GivingTuesday Data Commons by the GivingTuesday team.
