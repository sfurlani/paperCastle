// Base colors (darks and greys)
const baseColors = {
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

// 
const themes = {
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
  white:     baseColors.base3,



  // Solarized Colors: http://ethanschoonover.com/solarized#features
  dark: {
    background: baseColors.base03,
    highlight:  baseColors.base02,
    subtext:    baseColors.base01,
    body:       baseColors.base0,
    emphasis:   baseColors.base1
  },
  light: {
    background: baseColors.base3,
    highlight:  baseColors.base2,
    subtext:    baseColors.base1,
    body:       baseColors.base00,
    emphasis:   baseColors.base01
  },
  font: {
    title: 'bold 100pt Trebuchet MS',
    header: '32pt Trebuchet MS',
    button: '24pt Trebuchet MS',
    text: '14pt Trebuchet MS',
    subtext: 'italic 12pt Trebuchet MS'
  }
};

themes.current = themes.dark;

export const theme = themes;

export const constants = {
  theme: themes
};
