import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';
import { getIcon, ICON } from '../Icon';

export const NewSidebar = (): JSX.Element => (
  <ProSidebar className={'sidebarOR'}>
    <SidebarHeader>
      {/**
       *  You can add a header for the sidebar ex: logo
       */}
    </SidebarHeader>
    <SidebarContent>
      <Menu className={'sidebarOR'} iconShape="square">
        <MenuItem icon={getIcon(ICON.RUBLE_SIGN)}>Home</MenuItem>
        <SubMenu title="Archives" icon={getIcon(ICON.GITHUB)}>
          <MenuItem>2020</MenuItem>
          <SubMenu title="October" icon={getIcon(ICON.GITHUB)}>
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
