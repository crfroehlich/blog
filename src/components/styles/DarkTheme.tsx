import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { Header } from '../Header';
import { BaseStyles } from './BaseStyles';
import { IPageProps } from '../../types';

export const theme = {
  fonts: {
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
  },
  colors: {
    background: '#001933',
    heading: '#fff',
    text: '#fff',
    preFormattedText: '#000',
    link: '#1ED3C6',
  },
};

export const DarkTheme: React.FC<IPageProps> = (props): JSX.Element => {
  const { children } = props;

  return (
    <div>
      <Global styles={BaseStyles} />
      <Header {...props} />
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </div>
  );
};

export default DarkTheme;
