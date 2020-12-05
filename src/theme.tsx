import { theme as chakraTheme, Theme } from "@chakra-ui/react";
const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };

const theme: Theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
  },
  fonts,
  styles: {
    global: {
      body: { height: "100%" },
      html: { height: "100%" },
      "#__next": { height: "100%" },
    },
  },
};

export default theme;
