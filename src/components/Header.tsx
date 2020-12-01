import styled from '@emotion/styled';
import React, { useState } from 'react';
import { getConfig } from '../../config';
import {
  NavSearchButton,
  NavSearchFromWrapper,
  NavSearchWrapper,
  SearchCloseButton,
} from '../styles/NavbarStyles';
import SearchContainer from '../search/Search';
import { IPageProps } from '../types';
import { Tools } from '../utils';
import { Icon } from './Icon';
import { Link } from './Link';
import { Tooltip } from './Tooltip';
import { ClickAwayListener } from '@material-ui/core';

const config = getConfig();

const setNavBar = () => {
  const tools = new Tools();
  const navbar = tools.getDocument()?.getElementById('navbar');
  navbar.className = (navbar.className === 'topnav') ? 'topnav responsive' : 'topnav';
};

const StyledBgDiv = styled('div')`
  height: 60px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #f8f8f8;
  position: relative;
  display: none;
  background: #001932;

  @media (max-width: 767px) {
    display: block;
  }
`;

export const Header: React.FC<IPageProps> = (): JSX.Element => {
  const [state, setState] = useState({
    toggle: false,
    clickAway: false,
    search: '',
  });

  const toggleHandle = (e) => {
    setState({
      ...state,
      toggle: !state.toggle,
      clickAway: !state.toggle,
    });
    e.stopPropagation();
  };

  const handleClickAway = (e) => {
    if (state.clickAway === true) {
      setState({
        ...state,
        toggle: false,
        clickAway: false,
      });
    }
    e.preventDefault();
  }

  return (
    <div className={'navBarWrapper'}>
      <nav className={'navBarDefault'}>
        <div className={'navBarHeader'}>
          <Link to={'/'} className={'navBarBrand'}>
            <img className={'img-responsive displayInline'} src={config.header.logo} alt={'logo'} />
          </Link>
          <Tooltip tip="Luddites, Incorporated">
            <div
              className={'headerTitle displayInline'}
              dangerouslySetInnerHTML={{ __html: config.header.title }}
            />
          </Tooltip>
        </div>
        <div id="navbar" className={'topnav'}>
          <ul className={'navBarUL navBarNav navBarULRight'}>
            {config.header.links.map((link, key) => (
              <li key={key}>
                <Link className="sidebarLink" to={link.link} title={link.tooltip}>
                  {link.text}
                </Link>
              </li>
            ))}
            <li className={'hiddenMobile githubBtn'}>
              <Link to={config.header.githubUrl} aria-label="Follow">
                <Icon {...{ icon: ['fab', 'github'] }} />
              </Link>
            </li>
            <li>
              <Link to={config.header.twitterUrl}>
                <Icon {...{ icon: ['fab', 'twitter'] }} />
              </Link>
            </li>
            <li>
              <Link to={config.header.linkedInUrl}>
                <Icon {...{ icon: ['fab', 'linkedin'] }} />
              </Link>
            </li>
            <li>
              <a href={'/rss.xml'}>
                <Icon {...{ icon: 'rss' }} />
              </a>
            </li>
            <li>
              <NavSearchButton type="button" aria-label="search" onClick={toggleHandle}>
                <Icon icon={'search'} />
              </NavSearchButton>
            </li>
          </ul>
        </div>
      </nav>
      <StyledBgDiv>
        <div className={'navBarDefault removePadd'}>
          <span
            onClick={setNavBar}
            className={'navBarToggle'}
            onKeyDown={setNavBar}
            role="button"
            tabIndex={0}
          >
            <span className={'iconBar'}></span>
            <span className={'iconBar'}></span>
            <span className={'iconBar'}></span>
          </span>
        </div>
      </StyledBgDiv>
      <NavSearchWrapper className={state.toggle === true ? 'expand' : ''}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <NavSearchFromWrapper>
            <SearchContainer />
            <SearchCloseButton
              type="submit"
              aria-label="close"
              onClick={handleClickAway}
            ></SearchCloseButton>
          </NavSearchFromWrapper>
        </ClickAwayListener>
      </NavSearchWrapper>
    </div>
  );
};

export default Header;
