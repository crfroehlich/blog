import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Header } from './Header';
import { IPageProps } from '../types';

const Theme = {
  fonts: {
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
  },
};

export const ThemeProvider: React.FC<IPageProps> = (props): JSX.Element => {
  const { children, theme } = props;
  return (
    <div>
      <Header {...props} />
      <EmotionThemeProvider theme={{ ...Theme, ...theme }}>{children}</EmotionThemeProvider>
    </div>
  );
};
