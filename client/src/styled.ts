import { createStitches } from '@stitches/react';

export const { styled, css, keyframes } = createStitches({
  theme: {
    colors: {
      background: '#05070f',
      elevated: '#1c1c1c',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      text: '#fff',
      textMuted: '#ededed',
      muted1: 'rgb(142,142,147)',
      muted2: 'rgb(99,99,102)',
      muted3: 'rgb(72,72,74)',
      muted4: 'rgb(58,58,60)',
      muted5: 'rgb(44,44,46)',
      muted6: 'rgb(28,28,30)',
    },
    space: {
      none: 0,
      xxxsmall: 2,
      xxsmall: 4,
      xsmall: 8,
      small: 12,
      regular: 16,
      medium: 24,
      large: 32,
      xlarge: 48,
      xxlarge: 56,
      xxxlarge: 72,
    },
    radii: {
      circle: '50%',
      full: 999,
      large: 24,
      medium: 16,
      regular: 8,
      small: 4,
      none: 0,
    },
  },
});
