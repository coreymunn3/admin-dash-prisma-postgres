import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const overrides = {
  fontWeights: {
    normal: 300,
    medium: 500,
    bold: 700,
  },
  breakpoints: createBreakpoints({
    sm: '48em',
    md: '62em',
    lg: '80em',
    xl: '80em',
  }),
};

const customTheme = extendTheme(overrides);

export default customTheme;
