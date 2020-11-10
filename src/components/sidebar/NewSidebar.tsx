import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';
import { once } from 'lodash';
import { getIcon } from '../Icon';
import { Link } from '../Link';

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
  return allMdx.group.sort((a, b) => {
    switch (a.fieldValue.localeCompare(b.fieldValue, 'en', { numeric: true })) {
      case -1:
        return 1;
      case 1:
        return -1;
      default:
        return 0;
    }
  });
});
export const NewSidebar = (): JSX.Element => {
  const [sidebar] = useState(getSideBarData());
  return (
    <ProSidebar className={'sidebarOR'}>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={getIcon({ icon: 'ruble-sign', size: 'lg' })}>
            <Link to={'/'} title={'Home'}>
              <div>Home</div>
            </Link>
          </MenuItem>
          <SubMenu title="Archives" icon={getIcon({ icon: 'archive', size: 'lg' })}>
            {sidebar.map((group, i) => {
              return (
                <SubMenu
                  title={group.fieldValue}
                  icon={getIcon({ icon: ['fad', 'corn'], size: 'lg' })}
                  key={`${i}_${group.fieldValue}`}
                >
                  <MenuItem>10</MenuItem>
                  <MenuItem>09</MenuItem>
                </SubMenu>
              );
            })}
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        {/**
         *  You can add a footer for the sidebar ex: copyright
         */}
      </SidebarFooter>
    </ProSidebar>
  );
};

export const noSidebar = () => <NewSidebar />;
