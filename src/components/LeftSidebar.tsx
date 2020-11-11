import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';
import { getIcon } from './Icon';
import { Link } from './Link';
import { getYearOfThe } from '../utils';

export const LeftSidebar = ({
  sidebar,
  collapsed,
  toggled,
  handleToggleSidebar,
  setSidebar,
}): JSX.Element => {
  const onNodeExpand = (e, node) => {
    node.open = !node.open;

    //setSidebar(sidebar);
    return true;
  };

  const onNodeActivate = (e, node) => {
    node.active = !node.active;
    //setSidebar(sidebar);
    return true;
  };

  console.log(sidebar);

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
          <MenuItem icon={getIcon({ icon: 'ruble-sign', size: 'lg' })}>
            <Link to={'/'} title={'Home'}>
              <div>Home</div>
            </Link>
          </MenuItem>
          <div onClick={(e) => onNodeExpand(e, sidebar)}>
            <SubMenu title="Archives" icon={getIcon({ icon: 'archive', size: 'lg' })} open={true}>
              {sidebar.archive.map((group, i) => {
                return (
                  <div onClick={(e) => onNodeExpand(e, sidebar)} key={`${i}_${group.year}`}>
                    <SubMenu
                      title={group.year}
                      icon={getIcon({ icon: getYearOfThe(group.year).font, size: 'lg' })}
                      open={group.open}
                    >
                      {group.articles
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((node, j) => {
                          return (
                            <MenuItem key={`${j}_${node.slug}`} active={node.active}>
                              <Link
                                to={node.slug}
                                title={node.title}
                                onClick={(e) => onNodeActivate(e, node)}
                              >
                                <div>{node.title}</div>
                              </Link>
                            </MenuItem>
                          );
                        })}
                    </SubMenu>
                  </div>
                );
              })}
            </SubMenu>
          </div>
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
