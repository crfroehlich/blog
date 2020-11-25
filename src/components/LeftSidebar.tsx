/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Paper, makeStyles } from '@material-ui/core';
import React, { useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
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
import { DarkStyles } from '../styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '298px',
  },
  sidebar: {
    width: '100%',
    height: '100vh',
    background: DarkStyles.colors.background,
    fontSize: '20px',
    marginLeft: '5px',
    overflow: 'hidden',
    paddingBottom: '2px',
    paddingLeft: '5px',
    paddingTop: '1.9em',
    position: 'sticky',
    top: 0,
  },
  inner: {
    width: '100%',
    height: '100%',
  },
}));

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

export const LeftSidebar = ({ sidebar }): JSX.Element => {
  const data = useRef(sidebar);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <aside className={`hiddenMobile ${classes.sidebar}`}>
        <Scrollbars autoHeight={true} autohide autoHeightMin={'100vh'}>
          <Paper elevation={15} className={classes.inner}>
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
        </Scrollbars>
      </aside>
    </div>
  );
};
