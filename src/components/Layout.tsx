import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { graphql, useStaticQuery } from 'gatsby';
import { once } from 'lodash';
import { DarkTheme } from './styles/DarkTheme';
import mdxComponents from './styles/StyledProp';
import { RightSidebar } from './RightSidebar';
import { ILayoutProps } from '../types/interfaces';
import { LeftSidebar } from './LeftSidebar';
import { Wrapper, LeftSideBarWidth, Content, MaxWidth, RightSideBarWidth } from './styles';

const getSideBarData = once(() => {
  const { allMdx } = useStaticQuery(
    graphql`
      query GetNewSidebarLayoutQuery {
        allMdx(
          filter: { fields: { slug: { ne: "/" } } }
          sort: { fields: fields___date, order: DESC }
        ) {
          group(field: fields___year) {
            edges {
              node {
                fields {
                  date
                  description
                  id
                  img
                  slug
                  subtitle
                  tags
                  title
                  year
                }
              }
            }
            fieldValue
          }
        }
      }
    `,
  );
  const archive = allMdx.group.sort((a, b) => {
    switch (a.fieldValue.localeCompare(b.fieldValue, 'en', { numeric: true })) {
      case -1:
        return 1;
      case 1:
        return -1;
      default:
        return 0;
    }
  });
  const ret = {
    archive,
    open: true,
  };
  ret.archive = ret.archive.map((g) => {
    return {
      open: false,
      year: +g.fieldValue,
      articles: g.edges.map((e) => {
        return {
          date: new Date(e.node.fields.date),
          description: e.node.fields.description,
          id: e.node.fields.id,
          img: e.node.fields.img,
          slug: e.node.fields.slug,
          subtitle: e.node.fields.subtitle,
          tags: e.node.fields.tags,
          title: e.node.fields.title,
          year: e.node.fields.year,
          active: false,
        };
      }),
    };
  });
  return ret;
});

export const Layout: React.FC<ILayoutProps> = ({ children, location }): JSX.Element => {
  const [collapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [sidebar, setSidebar] = useState(getSideBarData());

  return (
    <DarkTheme location={location}>
      <MDXProvider components={mdxComponents}>
        <Wrapper>
          <LeftSideBarWidth className={'hiddenMobile'}>
            <LeftSidebar
              sidebar={sidebar}
              collapsed={collapsed}
              toggled={toggled}
              handleToggleSidebar={setToggled}
              setSidebar={setSidebar}
            />
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
