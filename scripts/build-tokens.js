#!/usr/bin/env node

/**
 * GivingTuesday Design Token Generator
 * Generates JS, JSON, and CJS token exports from the brand specification
 */

const fs = require('fs');
const path = require('path');

// Design Tokens - Single Source of Truth
const tokens = {
  // ==========================================================================
  // COLORS
  // ==========================================================================
  colors: {
    // Brand Primary
    red: '#ED132E',
    navy: '#001548',
    black: '#000000',

    // Brand Secondary
    lavender: '#CAC7F8',
    lightBlue: '#6CF4FF',
    beige: '#FDF7F7',
    white: '#FFFFFF',

    // Digital/Website
    teal: '#0fb5c3',
    tealHover: '#10c8d8',
    headingBlue: '#33487e',
    copy: '#1b1a19',
    lightBg: '#f4f4f1',
    divider: '#e0e0e0',
  },

  // Semantic Color Aliases
  semantic: {
    primary: '#ED132E',
    secondary: '#001548',
    accent: '#0fb5c3',
    background: '#FDF7F7',
    backgroundAlt: '#f4f4f1',
    surface: '#FFFFFF',
    text: '#001548',
    textMuted: '#1b1a19',
    border: '#e0e0e0',
    link: '#0fb5c3',
    linkHover: '#10c8d8',
  },

  // Theme Colors
  theme: {
    primary: '#ED132E',
    secondary: '#001548',
    success: '#0fb5c3',
    warning: '#FFC107',
    error: '#ED132E',
    info: '#0fb5c3',
  },

  // ==========================================================================
  // TYPOGRAPHY
  // ==========================================================================
  typography: {
    fontFamilies: {
      primary: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      secondary: "Georgia, 'Times New Roman', serif",
      mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
    },

    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    fontSizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      md: '18px',
      lg: '20px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '40px',
      '4xl': '48px',
      '5xl': '64px',
      '6xl': '72px',

      // Semantic sizes
      h1: '72px',
      h2: '48px',
      h3: '32px',
      h4: '24px',
      h5: '18px',
      h6: '16px',
      small: '14px',
      label: '18px',
    },

    lineHeights: {
      headline: 1.1,
      subhead: 1.2,
      label: 1.3,
      body: 1.4,
      loose: 1.6,
    },

    letterSpacings: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em',
      wider: '0.1em',
    },
  },

  // ==========================================================================
  // SPACING
  // ==========================================================================
  spacing: {
    base: '8px',
    0: '0',
    1: '8px',
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px',
    7: '56px',
    8: '64px',
    9: '72px',
    10: '80px',
    12: '96px',
    16: '128px',
    20: '160px',
  },

  // ==========================================================================
  // BORDERS
  // ==========================================================================
  borders: {
    widths: {
      default: '1px',
      2: '2px',
      4: '4px',
    },

    radii: {
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      '2xl': '24px',
      '3xl': '32px',
      full: '9999px',
      photo: '50px', // Max radius for photos per brand guidelines
    },
  },

  // ==========================================================================
  // SHADOWS
  // ==========================================================================
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  // ==========================================================================
  // TRANSITIONS
  // ==========================================================================
  transitions: {
    durations: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // ==========================================================================
  // BREAKPOINTS
  // ==========================================================================
  breakpoints: {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },

  // ==========================================================================
  // CONTAINER WIDTHS
  // ==========================================================================
  containers: {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    '2xl': '1320px',
  },

  // ==========================================================================
  // Z-INDEX
  // ==========================================================================
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // ==========================================================================
  // GRADIENTS
  // ==========================================================================
  gradients: {
    lavenderNavy: 'linear-gradient(135deg, #CAC7F8 0%, #001548 100%)',
    lightBlueBeige: 'linear-gradient(135deg, #6CF4FF 0%, #FDF7F7 100%)',
    beigeLavender: 'linear-gradient(135deg, #FDF7F7 0%, #CAC7F8 100%)',
    redBeige: 'linear-gradient(135deg, #ED132E 0%, #FDF7F7 100%)',
  },

  // ==========================================================================
  // BRAND RULES (for validation)
  // ==========================================================================
  brandRules: {
    // Colors that should NEVER be combined
    forbiddenCombinations: [
      ['#ED132E', '#CAC7F8'], // Red + Lavender
    ],

    // Colors that should NOT be used for typography
    nonTypographyColors: [
      '#6CF4FF',  // Light Blue
      '#CAC7F8',  // Lavender
      '#FDF7F7',  // Beige (except on dark backgrounds)
    ],

    // Maximum photo border radius
    maxPhotoBorderRadius: '50px',
  },
};

// ==========================================================================
// OUTPUT GENERATORS
// ==========================================================================

// Generate ES Module export
function generateESModule(tokens) {
  return `/**
 * GivingTuesday Design Tokens
 * Auto-generated - Do not edit directly
 * @version 1.0.0
 */

export const tokens = ${JSON.stringify(tokens, null, 2)};

// Individual exports for tree-shaking
export const colors = tokens.colors;
export const semantic = tokens.semantic;
export const theme = tokens.theme;
export const typography = tokens.typography;
export const spacing = tokens.spacing;
export const borders = tokens.borders;
export const shadows = tokens.shadows;
export const transitions = tokens.transitions;
export const breakpoints = tokens.breakpoints;
export const containers = tokens.containers;
export const zIndex = tokens.zIndex;
export const gradients = tokens.gradients;
export const brandRules = tokens.brandRules;

// Helper functions
export function getColor(name) {
  return colors[name] || semantic[name] || theme[name] || null;
}

export function getSpacing(key) {
  return spacing[key] || null;
}

export function getFontSize(key) {
  return typography.fontSizes[key] || null;
}

export function isValidColorCombo(color1, color2) {
  return !brandRules.forbiddenCombinations.some(
    ([c1, c2]) => (color1 === c1 && color2 === c2) || (color1 === c2 && color2 === c1)
  );
}

export function isTypographySafe(color) {
  return !brandRules.nonTypographyColors.includes(color);
}

export default tokens;
`;
}

// Generate CommonJS export
function generateCommonJS(tokens) {
  return `/**
 * GivingTuesday Design Tokens
 * Auto-generated - Do not edit directly
 * @version 1.0.0
 */

const tokens = ${JSON.stringify(tokens, null, 2)};

// Individual exports
const colors = tokens.colors;
const semantic = tokens.semantic;
const theme = tokens.theme;
const typography = tokens.typography;
const spacing = tokens.spacing;
const borders = tokens.borders;
const shadows = tokens.shadows;
const transitions = tokens.transitions;
const breakpoints = tokens.breakpoints;
const containers = tokens.containers;
const zIndex = tokens.zIndex;
const gradients = tokens.gradients;
const brandRules = tokens.brandRules;

// Helper functions
function getColor(name) {
  return colors[name] || semantic[name] || theme[name] || null;
}

function getSpacing(key) {
  return spacing[key] || null;
}

function getFontSize(key) {
  return typography.fontSizes[key] || null;
}

function isValidColorCombo(color1, color2) {
  return !brandRules.forbiddenCombinations.some(
    ([c1, c2]) => (color1 === c1 && color2 === c2) || (color1 === c2 && color2 === c1)
  );
}

function isTypographySafe(color) {
  return !brandRules.nonTypographyColors.includes(color);
}

module.exports = {
  tokens,
  colors,
  semantic,
  theme,
  typography,
  spacing,
  borders,
  shadows,
  transitions,
  breakpoints,
  containers,
  zIndex,
  gradients,
  brandRules,
  getColor,
  getSpacing,
  getFontSize,
  isValidColorCombo,
  isTypographySafe,
};
`;
}

// Generate JSON export
function generateJSON(tokens) {
  return JSON.stringify(tokens, null, 2);
}

// ==========================================================================
// MAIN
// ==========================================================================

const distDir = path.join(__dirname, '..', 'dist', 'tokens');

// Ensure dist/tokens directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Generate and write files
const files = [
  { name: 'tokens.js', content: generateESModule(tokens) },
  { name: 'tokens.cjs', content: generateCommonJS(tokens) },
  { name: 'tokens.json', content: generateJSON(tokens) },
];

files.forEach(({ name, content }) => {
  const filePath = path.join(distDir, name);
  fs.writeFileSync(filePath, content);
  console.log(`✓ Generated ${name}`);
});

console.log('\nToken generation complete!');
