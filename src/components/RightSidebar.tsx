import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

// import Link from './link';
import { Query } from '../../graphql-types';
import { config } from '../../config';
import { Sidebar, ListItem } from './styles/Sidebar';
import { IProps } from '../types/interfaces';

export const RightSidebar: React.FC<IProps> = ({ location }): JSX.Element => (
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
        allMdx.edges.map((item) => {
          let innerItems;

          if (item !== undefined && item.node.fields.slug !== '/') {
            if (
              location.pathname.startsWith(item.node.fields.slug) ||
              config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
            ) {
              if (item.node.tableOfContents.items) {
                innerItems = item.node.tableOfContents.items.map((innerItem, i) => {
                  const itemId = innerItem.title
                    ? innerItem.title?.replace(/\s+/g, '').toLowerCase()
                    : '#';

                  return (
                    <ListItem key={i} to={`#${itemId}`} level={1}>
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
      }
      return (
        <Sidebar>
          <ul></ul>
        </Sidebar>
      );
    }}
  />
);

export default RightSidebar;
