/* eslint-disable */

// Base colors (darks and greys)
const base = {
  // Solarized Colors: http://ethanschoonover.com/solarized#features
  base03:    0x002b36,
  base02:    0x073642,
  base01:    0x586e75,
  base00:    0x657b83,
  base0:     0x839496,
  base1:     0x93a1a1,
  base2:     0xeee8d5,
  base3:     0xfdf6e3
};

// Theme Colors
export const colors = {
  black:     0x01161B,
  gray:      0x475B62,
  // yellow:    0xb58900,
  orange:    0xcb4b16,
  red:       0xdc322f,
  magenta:   0xd33682,
  violet:    0x6c71c4,
  blue:      0x268bd2,
  cyan:      0x2aa198,
  green:     0x859900,
  yellow:      0xD19607, // gold
  // sky:       0x2C99D3,
  jade:      0x3BA74D,
  white:     base.base3,
}

const themes = {
  // Solarized Colors: http://ethanschoonover.com/solarized#features
  dark: {
    background: base.base03,
    highlight:  base.base02,
    subtext:    base.base01,
    body:       base.base0,
    emphasis:   base.base1
  },

  light: {
    background: base.base3,
    highlight:  base.base2,
    subtext:    base.base1,
    body:       base.base00,
    emphasis:   base.base01
  },
};
export const theme = themes.dark;

export const fonts = {
  name: {
    title: 'UnifrakturMaguntia',
    text: 'Cinzel Decorative'
  },
  size: {
    title: 180,
    header: 32,
    button: 24,
    text: 14,
    subtext: 12
  }
}
