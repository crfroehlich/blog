import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

// import Link from './link';
import { config } from '../../config';
import { Sidebar, ListItem } from './styles/Sidebar';
import { Query } from 'graphql-types';
import { IProps } from '../types/interfaces';

export const SidebarLayout: React.FC<IProps> = ({ location }) => (
  <StaticQuery<Query>
    query={graphql`
      query GetSidebarQuery {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {

      let finalNavItems;

      if (allMdx.edges?.length > 0) {
        allMdx.edges.map((item, index) => {
          let innerItems;

          if (item !== undefined && item.node.fields.slug !== '/') {
            if (
              location.pathname.startsWith(item.node.fields.slug) ||
              config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
            ) {
              console.log([location.pathname, item.node.fields.slug])
              if (item.node.tableOfContents.items) {
                innerItems = item.node.tableOfContents.items.map((innerItem, index) => {
                  const itemId = innerItem.title
                    ? innerItem.title?.replace(/\s+/g, '').toLowerCase()
                    : '#';

                  return (
                    <ListItem key={index} to={`#${itemId}`} level={1}>
                      {innerItem.title}
                    </ListItem>
                  );
                });
              }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems;
          }
        });
      }
      if (finalNavItems?.length) {
        return (
          <div>
            <Sidebar>
              <ul className={'rightSideBarUL'}>
                <li className={'rightSideTitle'}>CONTENTS</li>
                {finalNavItems}
              </ul>
            </Sidebar>
          </div>
        );
      } else {
        return (
          <Sidebar>
            <ul></ul>
          </Sidebar>
        );
      }
    }}
  />
);

export default SidebarLayout;
