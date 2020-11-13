import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './styles/StyledProp';
import { RightSidebar } from './RightSidebar';
import { IPageProps } from '../types';
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

export const Layout: React.FC<IPageProps> = (props): JSX.Element => {
  const [sidebar] = useState(getSideBarData());

  const { children } = props;

  return (
    <DarkTheme {...props}>
      <SEO {...props} />
      <MDXProvider components={mdxComponents}>
        <Wrapper>
          <LeftSideBarWidth className={'hiddenMobile'}>
            <LeftSidebar sidebar={sidebar} />
          </LeftSideBarWidth>
          <Content>
            <MaxWidth>{children}</MaxWidth>
          </Content>
          <RightSideBarWidth className={'hiddenMobile'}>
            <RightSidebar {...props} />
          </RightSideBarWidth>
        </Wrapper>
      </MDXProvider>
    </DarkTheme>
  );
};

export default Layout;
