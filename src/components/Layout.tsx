import React from 'react';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import { DarkTheme } from './theme/DarkTheme';
import mdxComponents from './misc/StyledProp';
import { LeftSidebar } from './sidebar/LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { config } from '../../config';
import { ILayoutProps, IStyle } from '../types/interfaces';

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }: IStyle) => theme.colors.background};

  .sideBarUL li a {
    color: ${({ theme }: IStyle) => theme.colors.text};
  }

  .sideBarUL .item > a:hover {
    background-color: #1ed3c6;
    color: #fff !important;

    /* background: #F8F8F8 */
  }

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  padding-top: 3rem;
  background: ${({ theme }: IStyle) => theme.colors.background};

  table tr {
    background: ${({ theme }: IStyle) => theme.colors.background};
  }

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    padding-top: 3rem;
  }
`;

const MaxWidth = styled('div')`
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

const LeftSideBarWidth = styled('div')`
  width: 298px;
`;

const RightSideBarWidth = styled('div')`
  width: 224px;
`;

export const Layout: React.FC<ILayoutProps> = ({ children, location }) => (
  <DarkTheme location={location}>
    <MDXProvider components={mdxComponents}>
      <Wrapper>
        <LeftSideBarWidth className={'hiddenMobile'}>
          <LeftSidebar location={location} />
        </LeftSideBarWidth>
        {config.sidebar.title ? (
          <div
            className={'sidebarTitle sideBarShow'}
            dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
          />
        ) : null}
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

export default Layout;
