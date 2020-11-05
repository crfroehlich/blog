import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Theme } from './Theme';
import { Header } from './Header';

export const ThemeProvider = ({ children, theme = {}, location }) => (
  <div>
    <Header location={location} />
    <EmotionThemeProvider theme={{ ...Theme, ...theme }}>{children}</EmotionThemeProvider>
  </div>
);
