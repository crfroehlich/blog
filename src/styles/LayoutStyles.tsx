import styled from '@emotion/styled';
import { DarkStyles } from './Theme';

export const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background: ${DarkStyles.colors.background};

  .sideBarUL li a {
    color: ${DarkStyles.colors.text};
  }

  .sideBarUL .item > a:hover {
    background-color: #1ed3c6;
    color: #fff !important;

    /* background: #F8F8F8 */
  }

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

export const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  padding-top: 3rem;
  background: ${DarkStyles.colors.background};

  table tr {
    background: ${DarkStyles.colors.background};
  }

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    padding-top: 3rem;
  }
`;

export const MaxWidth = styled('div')`
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

export const LeftSideBarWidth = styled('div')`
  width: 298px;
`;

export const RightSideBarWidth = styled('div')`
  width: 224px;
`;
