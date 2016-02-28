export const constants = {
  RESIZE:  'APP_RESIZE',
  ANIMATE: 'APP_ANIMATE',
  COLORS:  {
    // Solarized Colors: http://ethanschoonover.com/solarized#features
    base03:    0x002b36,
    base02:    0x073642,
    base01:    0x586e75,
    base00:    0x657b83,
    base0:     0x839496,
    base1:     0x93a1a1,
    base2:     0xeee8d5,
    base3:     0xfdf6e3,
    yellow:    0xb58900,
    orange:    0xcb4b16,
    red:       0xdc322f,
    magenta:   0xd33682,
    violet:    0x6c71c4,
    blue:      0x268bd2,
    cyan:      0x2aa198,
    green:     0x859900
  }
}

const themes = {
  // Solarized Colors: http://ethanschoonover.com/solarized#features
  dark: {
    background: constants.COLORS.base03,
    highlight:  constants.COLORS.base02,
    subtext:    constants.COLORS.base01,
    body:       constants.COLORS.base0,
    emphasis:  constants.COLORS.base1
  },
  light: {
    background: constants.COLORS.base3,
    highlight:  constants.COLORS.base2,
    subtext:    constants.COLORS.base1,
    body:       constants.COLORS.base00,
    emphasis:  constants.COLORS.base01
  },
  font: {
    title: 'bold 100pt Trebuchet MS',
    header: '32pt Trebuchet MS',
    button: '24pt Trebuchet MS',
    text: '14pt Trebuchet MS',
    subtext: 'italic 12pt Trebuchet MS'
  }
}

themes.current = themes.dark;

export const THEME = themes;
