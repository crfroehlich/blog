import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

// import Link from './link';
import { Query } from '../../graphql-types';
import { config } from '../../config';
import { RightSidebarStyles, ListItemStyles } from './styles/RightSidebarStyles';
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
                    <ListItemStyles key={i} to={`#${itemId}`} level={1}>
                      {innerItem.title}
                    </ListItemStyles>
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
            <RightSidebarStyles>
              <ul className={'rightSideBarUL'}>
                <li className={'rightSideTitle'}>CONTENTS</li>
                {finalNavItems}
              </ul>
            </RightSidebarStyles>
          </div>
        );
      }
      return (
        <RightSidebarStyles>
          <ul></ul>
        </RightSidebarStyles>
      );
    }}
  />
);

export default RightSidebar;
