import type { CSSProperties } from 'react';

// Expo Router's stack clips its screen container, so the page scrolls on its own.
export const page: CSSProperties = {
  boxSizing: 'border-box',
  height: '100%',
  overflowY: 'auto',
  padding: 24,
  fontFamily: 'system-ui, sans-serif',
  lineHeight: 1.5,
};

export const content: CSSProperties = {
  maxWidth: 960,
  margin: '0 auto',
};
