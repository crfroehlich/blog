import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';
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