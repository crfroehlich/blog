/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Paper } from '@material-ui/core';
import React, { useRef } from 'react';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SubMenu,
} from 'react-pro-sidebar';
import { getYearOfThe } from '../utils';
import { Icon } from './Icon';
import { Link } from './Link';
import { LeftSideBarWidth } from '../styles';

export const LeftSidebar = ({ sidebar }): JSX.Element => {
  const data = useRef(sidebar);

  const onNodeClick = (e, node) => {
    node.open = !node.open;
    node.active = !node.active;
    return true;
  };

  const getSourceMenu = (menu, idx = 0): JSX.Element => {
    if (!menu) return <div />;

    if (menu.slug) {
      return (
        <MenuItem
          active={menu.active}
          {...{ onClick: (e) => onNodeClick(e, menu) }}
          key={`${idx}_${menu.slug}`}
        >
          <Link to={menu.slug} title={menu.title} {...{ onClick: (e) => onNodeClick(e, menu) }}>
            <div>{menu.title}</div>
          </Link>
        </MenuItem>
      );
    }
    if (menu.links) {
      return (
        <SubMenu
          title={<div {...{ onClick: (e) => onNodeClick(e, menu) }}>{menu.name}</div>}
          defaultOpen={menu.open}
          key={`${idx}_${menu.name}`}
        >
          {menu.links.map(getSourceMenu)}
        </SubMenu>
      );
    }
  };

  const getArticlesMenu = (menu): JSX.Element => {
    if (!menu) return <div />;
    return menu.map((group, i) => {
      return (
        <SubMenu
          title={<div {...{ onClick: (e) => onNodeClick(e, group) }}>{group.year}</div>}
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
          {group.posts
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((node, j) => {
              return (
                <MenuItem
                  key={`${j}_${node.slug}`}
                  active={node.active}
                  {...{ onClick: (e) => onNodeClick(e, node) }}
                >
                  <Link
                    to={node.slug}
                    title={node.title}
                    {...{ onClick: (e) => onNodeClick(e, node) }}
                  >
                    <div>{node.title}</div>
                  </Link>
                </MenuItem>
              );
            })}
        </SubMenu>
      );
    });
  };

  return (
    <LeftSideBarWidth className={'hiddenMobile'}>
      <Paper
        elevation={15}
        style={{
          backgroundColor: '#33475B',
          fontSize: '20px',
          marginLeft: '5px',
          marginTop: '1.9em',
          overflow: 'auto',
          paddingBottom: '2px',
          paddingTop: '2px',
          position: 'sticky',
          top: 0,
          width: '100%',
        }}
      >
        <ProSidebar breakPoint={'md'}>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={Icon({ icon: 'ruble-sign', size: 'lg' })}>
                <Link to={'/'} title={'Home'}>
                  <div>Home</div>
                </Link>
              </MenuItem>
              {data.current.sections.map((s, si) => {
                return (
                  <SubMenu
                    title={<div {...{ onClick: (e) => onNodeClick(e, s) }}>{s.name}</div>}
                    icon={<Icon {...{ icon: s.icon, size: 'lg' }} />}
                    defaultOpen={s.open}
                    key={`${si}_${s.name}`}
                  >
                    {s.articles && getArticlesMenu(s.articles)}
                    {s.source && getSourceMenu(s.source)}
                  </SubMenu>
                );
              })}
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </Paper>
    </LeftSideBarWidth>
  );
};
