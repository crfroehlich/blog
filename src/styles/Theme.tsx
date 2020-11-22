import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import { IPageProps } from '../types';
import { Header } from '../components';

export const DarkStyles = {
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
      <Header {...props} />
      <ThemeProvider theme={DarkStyles}>{children}</ThemeProvider>
    </div>
  );
};

export default DarkTheme;
