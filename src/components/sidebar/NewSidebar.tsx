import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';
import { Query } from '../../../graphql-types';
import { getIcon } from '../Icon';
import { Link } from '../Link';

export const NewSidebar = (): JSX.Element => (
  <ProSidebar className={'sidebarOR'}>
    <SidebarContent>
      <Menu iconShape="square">
        <MenuItem icon={getIcon({ icon: 'ruble-sign', size: '2x' })}>
          <Link to={'/'} title={'Home'}>
            <div>Home</div>
          </Link>
        </MenuItem>
        <SubMenu title="Archives" icon={getIcon({ icon: 'archive', size: '2x' })}>
          <MenuItem>2020</MenuItem>
          <SubMenu title="October">
            <MenuItem>10</MenuItem>
            <MenuItem>09</MenuItem>
          </SubMenu>
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

export const noSidebar = () => (
  <StaticQuery<Query>
    query={graphql`
      query GetNewSidebarLayoutQuery {
        allMdx(sort: { fields: fields___date, order: DESC }) {
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
    `}
    render={({ allMdx }) => {
      console.log(allMdx);
      return <NewSidebar />;
    }}
  />
);
