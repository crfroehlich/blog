import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { Header } from '../Header';
import { BaseStyles } from '../styles/BaseStyles';

export const darkTheme = {
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

export class ThemeProvider extends React.Component<any> {
  render(): JSX.Element {
    const { children, location } = this.props;

    return (
      <div>
        <Global styles={BaseStyles} />
        <Header location={location} />
        <EmotionThemeProvider theme={darkTheme}>{children}</EmotionThemeProvider>
      </div>
    );
  }
}

export default ThemeProvider;
