import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './styles/StyledProp';
import { RightSidebar } from './RightSidebar';
import { ILayoutProps } from '../types';
import { LeftSidebar } from './LeftSidebar';
import { SEO } from './SEO';
import {
  Wrapper,
  LeftSideBarWidth,
  Content,
  MaxWidth,
  RightSideBarWidth,
  DarkTheme,
} from './styles';
import { getSideBarData } from '../utils';

export const Layout: React.FC<ILayoutProps> = ({ children, location }): JSX.Element => {
  const [sidebar] = useState(getSideBarData());

  return (
    <DarkTheme location={location}>
      <SEO location={location} />
      <MDXProvider components={mdxComponents}>
        <Wrapper>
          <LeftSideBarWidth className={'hiddenMobile'}>
            <LeftSidebar sidebar={sidebar} />
          </LeftSideBarWidth>
          <Content>
            <MaxWidth>{children}</MaxWidth>
          </Content>
          <RightSideBarWidth className={'hiddenMobile'}>
            <RightSidebar location={location} />
          </RightSideBarWidth>
        </Wrapper>
      </MDXProvider>
    </DarkTheme>
  );
};

export default Layout;
