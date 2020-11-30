import React from 'react';
import styled from '@emotion/styled';
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
