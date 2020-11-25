import styled from '@emotion/styled';

import { DarkStyles } from '.';

export const NavSearchButton = styled.button`
  background: transparent;
  color: ${DarkStyles.colors.text};
  border: 0;
  outline: 0;
  padding: 5px 0 5px 10px;
  margin-left: 15px;
  cursor: pointer;
  @media (max-width: 990px) {
    margin-left: 0;
  }
  svg {
    display: block;
  }
`;

export const SearchCloseButton = styled.button`
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
  cursor: pointer;
  z-index: 1;
  padding: 0;
  color: #757575;
  font-size: 45px;
  margin-left: -54px;
  @media (max-width: 990px) {
    font-size: 35px;
  }
  @media (max-width: 767px) {
    font-size: 30px;
  }
  svg {
    display: block;
  }
`;

export const NavSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  height: 0;
  visibility: hidden;
  transition: 0.35s ease-in-out;
  z-index: 99999;
  > * {
    opacity: 0;
    transition: 0.35s ease-in-out;
  }

  &.expand {
    height: 145px;
    visibility: visible;
    @media (max-width: 1199px) {
      height: 120px;
    }
    @media (max-width: 990px) {
      height: 100px;
    }
    @media (max-width: 767px) {
      height: 75px;
    }
    .nav-search-input,
    > * {
      opacity: 1;
    }
  }

  .nav-search-input {
    width: 870px;
    transition: 0.35s ease-in-out;

    .inner-wrap {
      .search-icon {
        width: 70px;
      }
      input,
      .icon-left {
        height: 54px;
        padding: 0 70px;
        border-radius: 3px;
        ::placeholder {
          color: #757575;
        }
      }
    }
  }
`;

export const NavSearchFromWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  width: 100%;
  height: 100%;
  position: relative;
  @media (min-width: 990px) {
    width: 900px;
  }
  @media (min-width: 1200px) {
    width: 1050px;
  }
  @media (min-width: 1400px) {
    width: 1170px;
  }
  @media (max-width: 990px) {
    padding: 0 45px;
  }
  @media (max-width: 767px) {
    padding: 0 25px;
  }
`;
