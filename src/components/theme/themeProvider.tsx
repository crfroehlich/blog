import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';

import { lightTheme, darkTheme } from './index';
import Header from '../Header';
import { baseStyles } from '../styles/GlobalStyles';
import { tools } from '../../utils/tools';

class ThemeProvider extends React.Component<any> {

  render(): JSX.Element {

    const { children, location } = this.props;

    return (
      <div>
        <Global styles={baseStyles} />
        <Header
          location={location}
        />
        <EmotionThemeProvider theme={darkTheme}>{children}</EmotionThemeProvider>
      </div>
    );
  }
}

export default ThemeProvider;
