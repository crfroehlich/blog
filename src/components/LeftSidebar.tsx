import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';
import { debounce} from 'lodash';
import { Icon } from './Icon';
import { Link } from './Link';
import { getYearOfThe } from '../utils';

export const LeftSidebar = ({
  sidebar,
  collapsed,
  toggled,
  handleToggleSidebar,
  setSidebar,
}): JSX.Element => {
  const onNodeClick = debounce((e, node) => {
    node.open = !node.open;
    node.active = !node.active;
    setSidebar(sidebar);
    return true;
  }, 300);

  return (
    <ProSidebar
      className={'sidebarOR'}
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint={'md'}
    >
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={Icon({ icon: 'ruble-sign', size: 'lg' })}>
            <Link to={'/'} title={'Home'}>
              <div>Home</div>
            </Link>
          </MenuItem>
          <SubMenu
            title={<span onClick={(e) => onNodeClick(e, sidebar)}>Archive</span>}
            icon={<Icon {...{ icon: 'archive', size: 'lg' }} />}
            defaultOpen={true}
          >
            {sidebar.archive.map((group, i) => {
              return (
                <SubMenu
                  title={<span onClick={(e) => onNodeClick(e, group)}>{group.year}</span>}
                  icon={
                    <Icon
                      {...{
                        icon: getYearOfThe(group.year).font,
                        size: 'lg',
                        onClick: (e) => onNodeClick(e, group),
                      }}
                    />
                  }
                  defaultOpen={group.open}
                  key={`${i}_${group.year}`}
                >
                  {group.articles
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((node, j) => {
                      return (
                        <MenuItem key={`${j}_${node.slug}`} active={node.active}>
                          <Link
                            to={node.slug}
                            title={node.title}
                            onClick={(e) => onNodeClick(e, node)}
                          >
                            <div>{node.title}</div>
                          </Link>
                        </MenuItem>
                      );
                    })}
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
