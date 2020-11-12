import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Header } from './Header';
import { ILayoutProps } from '../types';

export const Theme = {
  fonts: {
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
  },
};

export const ThemeProvider: React.FC<ILayoutProps> = ({
  children,
  theme = {},
  location,
}): JSX.Element => (
  <div>
    <Header location={location} />
    <EmotionThemeProvider theme={{ ...Theme, ...theme }}>{children}</EmotionThemeProvider>
  </div>
);
