import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, Global } from '@emotion/react';
import { MdxNodes } from '../styles';
import { RightSidebar } from './RightSidebar';
import { IPageProps } from '../types';
import { LeftSidebar } from './LeftSidebar';
import { Header } from './Header';
import { SEO } from './SEO';
import {
  DarkStyles,
  GlobalStyles,
  Wrapper,
  Content,
  MaxWidth,
} from '../styles';
import { getSideBarData } from '../utils';
import { Paper } from '@material-ui/core';

export const Layout: React.FC<IPageProps> = (props): JSX.Element => {
  const [sidebar] = useState(getSideBarData());

  const { children } = props;

  return (
    <div>
      <Global styles={GlobalStyles} />
      <Header {...props} />
      <ThemeProvider theme={{...DarkStyles}}/>
      <SEO {...props} />
      <MDXProvider components={MdxNodes}>
        <Wrapper>
          <LeftSidebar sidebar={sidebar} />
          <Content>
            <Paper>
              <MaxWidth>{children}</MaxWidth>
            </Paper>
          </Content>
          <RightSidebar {...props} />
        </Wrapper>
      </MDXProvider>
    </div>
  );
};
 
export default Layout;
