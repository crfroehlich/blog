import React from 'react';
import styled from '@emotion/styled';
import { injectGlobal } from '@emotion/css';
import { DarkStyles } from './Theme';

export const RightSidebarStyles = styled('aside')`
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding-right: 5px;
  position: fixed;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  background: ${DarkStyles.colors.background};

  .rightSideTitle {
    font-size: 12px;
    line-height: 1;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    padding: 7px 24px 7px 16px;
    color: ${DarkStyles.colors.text};
  }

  .rightSideBarUL {
    margin-top: 32px;
  }

  .rightSideBarUL li {
    list-style-type: none;
  }

  .rightSideBarUL li a {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    padding: 10px 10px 10px 10px;
    color: ${DarkStyles.colors.text};
  }

  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

export const ListItemStyles = styled(({ className, active, level, ...props }) => {
  return (
    <li className={className}>
      <a href={props.to} {...props}>
        {props.children}
      </a>
    </li>
  );
})`
  list-style: none;

  a {
    color: #5c6975;
    text-decoration: none;
    font-weight: ${({ level }: any) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${({ level }:any) => 2 + (level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      color: #1ed3c6 !important;
    }

    ${({ active }:any) =>
      active &&
      `
      color: #1ED3C6;
      background-color: #fff;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;

// const sidebar_bg_color = '#33475B !default';
// const sidebar_color = '#fff !default';
// const sidebar_width = '297px !default';
// const sidebar_collapsed_width = '80px !default';
// const highlight_color = 'orange !default';
// const submenu_bg_color = '#33475B !default';
// const submenu_bg_color_collapsed = '#2b2b2b !default';
// const icon_bg_color = '#33475B !default';
// const icon_size = '20px !default';
// const breakpoint_xs = '480px !default';
// const breakpoint_sm = '576px !default';
// const breakpoint_md = '768px !default';
// const breakpoint_lg = '992px !default';
// const breakpoint_xl = '1200px !default';

export const GlobalSidebarStyles = injectGlobal`
  @keyframes swing {
    0%, 30%, 50%, 70%, 100% {
      transform: rotate(0deg);
    }
      10% {
        transform: rotate(10deg);
    }
      40% {
        transform: rotate(-10deg);
    }
      60% {
        transform: rotate(5deg);
    }
      80% {
        transform: rotate(-5deg);
    }
  }

  .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item .pro-inner-item:before {
    display: inline-block;
    width: 4px;
    min-width: 4px;
    height: 4px;
    border: 1px solid #33475b;
    border-radius: 50%;
    margin-right: 15px;
    position: relative;
    box-shadow: 1px 0px 0px #fff, 0px -1px 0px #fff, 0px 1px 0px #fff, -1px 0px 0px #fff;
  }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-item-content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
    .pro-sidebar .pro-menu {
      padding-top: 10px;
      padding-bottom: 10px;
  }
    .pro-sidebar .pro-menu > ul > .pro-sub-menu > .pro-inner-list-item {
      position: relative;
      background-color: #33475b;
  }
    .pro-sidebar .pro-menu > ul > .pro-sub-menu > .pro-inner-list-item > div > ul {
      padding-top: 15px;
      padding-bottom: 15px;
  }
    .pro-sidebar .pro-menu a {
      text-decoration: none;
      color: #fff;
  }
    .pro-sidebar .pro-menu a:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
  }
    .pro-sidebar .pro-menu a:hover {
      color: orange;
  }
    .pro-sidebar .pro-menu .pro-menu-item {
      font-size: 15px;
  }
    .pro-sidebar .pro-menu .pro-menu-item.active {
      color: orange;
  }
    .pro-sidebar .pro-menu .pro-menu-item .suffix-wrapper {
      opacity: 1;
      transition: opacity 0.2s;
  }
    .pro-sidebar .pro-menu .pro-menu-item .prefix-wrapper {
      display: flex;
      margin-right: 5px;
      opacity: 1;
      transition: opacity 0.2s;
  }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 8px 35px 8px 20px;
      cursor: pointer;
  }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:focus {
      outline: none;
      color: orange;
  }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
      margin-right: 10px;
      font-size: 14px;
      width: 20px;
      min-width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      display: inline-block;
  }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-icon-wrapper .pro-icon {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      padding-right: 10px;
  }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-item-content {
      flex-grow: 1;
      flex-shrink: 1;
  }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:hover {
      color: orange;
  }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:hover .pro-icon-wrapper .pro-icon {
      animation: swing ease-in-out 0.5s 1 alternate;
  }
    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu > .pro-inner-item:before {
      background: #fff;
  }
    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu > .pro-inner-item > .pro-arrow-wrapper {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
  }
    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu > .pro-inner-item > .pro-arrow-wrapper .pro-arrow {
      display: inline-block;
      border-style: solid;
      border-color: #fff;
      border-width: 0 2px 2px 0;
      padding: 2.5px;
      vertical-align: middle;
      transition: transform 0.3s;
      transform: rotate(-45deg);
  }
    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu.open > .pro-inner-item:before {
      background: transparent !important;
  }
    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu.open > .pro-inner-item > .pro-arrow-wrapper .pro-arrow {
      transform: rotate(45deg);
  }
    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item {
      padding-left: 20px;
  }
    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item .pro-inner-item {
      padding: 8px 30px 8px 15px;
  }
    .pro-sidebar .pro-menu.shaped .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
      background-color: #33475b;
  }
    .pro-sidebar .pro-menu.square .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
      border-radius: 4px;
  }
    .pro-sidebar .pro-menu.round .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
      border-radius: 4px;
  }
    .pro-sidebar .pro-menu.circle .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
      border-radius: 50%;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item {
      position: relative;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item > .pro-inner-item > .suffix-wrapper, .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item > .pro-inner-item > .prefix-wrapper {
      opacity: 0;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item > .pro-inner-list-item {
      background-color: #2b2b2b;
      z-index: 111;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      cursor: pointer;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu {
      position: relative;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-item {
      pointer-events: none;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-item > .pro-arrow-wrapper {
      display: none;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-list-item {
      height: auto !important;
      position: fixed;
      visibility: hidden;
      min-width: 220px;
      max-width: 270px;
      background-color: transparent;
      max-height: 100%;
      padding-left: 3px;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-list-item.has-arrow {
      padding-left: 10px;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-list-item > .popper-inner {
      max-height: 100vh;
      overflow-y: auto;
      background-color: #2b2b2b;
      padding-left: 20px;
      border-radius: 4px;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu:hover > .pro-inner-list-item {
      transition: visibility, transform 0.3s;
      visibility: visible;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu:hover .pro-icon-wrapper .pro-icon {
      animation: swing ease-in-out 0.5s 1 alternate;
  }
    .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu .pro-inner-list-item .pro-sub-menu-item, .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu .pro-inner-list-item .pro-inner-item {
      padding: 8px 30px 8px 5px;
  }
    .pro-sidebar.rtl .pro-menu .pro-menu-item .prefix-wrapper {
      margin-right: 0;
      margin-left: 5px;
  }
    .pro-sidebar.rtl .pro-menu .pro-menu-item > .pro-inner-item {
      padding: 8px 20px 8px 35px;
  }
    .pro-sidebar.rtl .pro-menu .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
      margin-right: 0;
      margin-left: 10px;
  }
    .pro-sidebar.rtl .pro-menu .pro-menu-item.pro-sub-menu > .pro-inner-item > .pro-arrow-wrapper {
      right: auto;
      left: 20px;
  }
    .pro-sidebar.rtl .pro-menu .pro-menu-item.pro-sub-menu > .pro-inner-item > .pro-arrow-wrapper .pro-arrow {
      transform: rotate(135deg);
  }
    .pro-sidebar.rtl .pro-menu .pro-menu-item.pro-sub-menu.open > .pro-inner-item > .pro-arrow-wrapper .pro-arrow {
      transform: rotate(45deg);
  }
    .pro-sidebar.rtl .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item {
      padding-left: 0;
      padding-right: 20px;
  }
    .pro-sidebar.rtl .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item .pro-inner-item {
      padding: 8px 15px 8px 30px;
  }
    .pro-sidebar.rtl .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item .pro-inner-item:before {
      margin-right: 0;
      margin-left: 15px;
  }
    .pro-sidebar.rtl.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-list-item {
      padding-left: 0;
      padding-right: 3px;
  }
    .pro-sidebar.rtl.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-list-item.has-arrow {
      padding-right: 10px;
  }
    .pro-sidebar.rtl.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-list-item > .popper-inner {
      padding-left: 0;
      padding-right: 20px;
  }
    .pro-sidebar.rtl.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu .pro-inner-list-item .pro-sub-menu-item, .pro-sidebar.rtl.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu .pro-inner-list-item .pro-inner-item {
      padding: 8px 5px 8px 30px;
  }

  .popper-arrow {
    position: absolute;
    z-index: -1;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
 }
  .popper-element[data-popper-placement^='left'] > .popper-arrow {
    right: 0;
    border-right: 7px solid #2b2b2b;
 }
  .popper-element[data-popper-placement^='right'] > .popper-arrow {
    left: 0;
    border-left: 7px solid #2b2b2b;
 }

 .react-slidedown {
  height: 0;
  transition-property: none;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
.react-slidedown.transitioning {
  overflow-y: hidden;
}
.react-slidedown.closed {
  display: none;
}

.pro-sidebar {
  color: #fff;
  height: 100%;
  width: 297px;
  min-width: 297px;
  text-align: left;
  transition: width, left, right, 0.3s;
  position: relative;
  z-index: 1009;
}
.pro-sidebar > .pro-sidebar-inner {
  background: #33475b;
  height: 100%;
  position: relative;
  z-index: 101;
}
.pro-sidebar > .pro-sidebar-inner > img.sidebar-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  opacity: 0.3;
  left: 0;
  top: 0;
  z-index: 100;
}
.pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 101;
}
.pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-content {
  flex-grow: 1;
}
.pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.pro-sidebar .overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: none;
}
.pro-sidebar.collapsed {
  width: 80px;
  min-width: 80px;
}
.pro-sidebar.rtl {
  text-align: right;
  direction: rtl;
}
@media (max-width: 480px) {
  .pro-sidebar.xs {
    position: fixed;
    left: -297px;
 }
  .pro-sidebar.xs.collapsed {
    left: -80px;
 }
  .pro-sidebar.xs.toggled {
    left: 0;
 }
  .pro-sidebar.xs.toggled .overlay {
    display: block;
 }
  .pro-sidebar.xs.rtl {
    left: auto;
    right: -297px;
 }
  .pro-sidebar.xs.rtl.collapsed {
    left: auto;
    right: -80px;
 }
  .pro-sidebar.xs.rtl.toggled {
    left: auto;
    right: 0;
 }
}
@media (max-width: 576px) {
  .pro-sidebar.sm {
    position: fixed;
    left: -297px;
 }
  .pro-sidebar.sm.collapsed {
    left: -80px;
 }
  .pro-sidebar.sm.toggled {
    left: 0;
 }
  .pro-sidebar.sm.toggled .overlay {
    display: block;
 }
  .pro-sidebar.sm.rtl {
    left: auto;
    right: -297px;
 }
  .pro-sidebar.sm.rtl.collapsed {
    left: auto;
    right: -80px;
 }
  .pro-sidebar.sm.rtl.toggled {
    left: auto;
    right: 0;
 }
}
@media (max-width: 768px) {
  .pro-sidebar.md {
    position: fixed;
    left: -297px;
 }
  .pro-sidebar.md.collapsed {
    left: -80px;
 }
  .pro-sidebar.md.toggled {
    left: 0;
 }
  .pro-sidebar.md.toggled .overlay {
    display: block;
 }
  .pro-sidebar.md.rtl {
    left: auto;
    right: -297px;
 }
  .pro-sidebar.md.rtl.collapsed {
    left: auto;
    right: -80px;
 }
  .pro-sidebar.md.rtl.toggled {
    left: auto;
    right: 0;
 }
}
@media (max-width: 992px) {
  .pro-sidebar.lg {
    position: fixed;
    left: -297px;
 }
  .pro-sidebar.lg.collapsed {
    left: -80px;
 }
  .pro-sidebar.lg.toggled {
    left: 0;
 }
  .pro-sidebar.lg.toggled .overlay {
    display: block;
 }
  .pro-sidebar.lg.rtl {
    left: auto;
    right: -297px;
 }
  .pro-sidebar.lg.rtl.collapsed {
    left: auto;
    right: -80px;
 }
  .pro-sidebar.lg.rtl.toggled {
    left: auto;
    right: 0;
 }
}
@media (max-width: 1200px) {
  .pro-sidebar.xl {
    position: fixed;
    left: -297px;
 }
  .pro-sidebar.xl.collapsed {
    left: -80px;
 }
  .pro-sidebar.xl.toggled {
    left: 0;
 }
  .pro-sidebar.xl.toggled .overlay {
    display: block;
 }
  .pro-sidebar.xl.rtl {
    left: auto;
    right: -297px;
 }
  .pro-sidebar.xl.rtl.collapsed {
    left: auto;
    right: -80px;
 }
  .pro-sidebar.xl.rtl.toggled {
    left: auto;
    right: 0;
 }
}


`;
