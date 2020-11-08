import React from 'react';
import styled from '@emotion/styled';
import { Link } from './Link';
import { getIcon, ICON } from './Icon';
import { config } from '../../config';
import { LeftSidebar } from './sidebar/LeftSidebar';
import { IProps } from '../types/interfaces';
import { Tools } from '../utils';
import { SearchComponent } from './search/SearchComponent';

const isSearchEnabled = !!(config.header.search && config.header.search.enabled);

const searchIndices = [];

if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push({
    name: `${config.header.search.indexName}`,
    title: `Results`,
    hitComp: `PageHit`,
  });
}

const setNavBar = () => {
  const tools = new Tools();
  const x = tools.getDocument()?.getElementById('navbar');

  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
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

export const Header: React.FC<IProps> = ({ location }): JSX.Element => (
  <div className={'navBarWrapper'}>
    <nav className={'navBarDefault'}>
      <div className={'navBarHeader'}>
        <Link to={'/'} className={'navBarBrand'}>
          <img className={'img-responsive displayInline'} src={config.header.logo} alt={'logo'} />
        </Link>
        <div
          className={'headerTitle displayInline'}
          dangerouslySetInnerHTML={{ __html: config.header.title }}
        />
      </div>
      {isSearchEnabled ? (
        <div className={'searchWrapper hiddenMobile navBarUL'}>
          <SearchComponent collapse={true} indices={searchIndices} />
        </div>
      ) : null}
      <div id="navbar" className={'topnav'}>
        <div className={'visibleMobile'}>
          <LeftSidebar location={location} />
          <hr />
        </div>
        <ul className={'navBarUL navBarNav navBarULRight'}>
          {config.header.links.map((link, key) => (
            <li key={key}>
              <Link className="sidebarLink" to={link.link} title={link.text}>
                {link.text}
              </Link>
            </li>
          ))}
          <li className={'hiddenMobile githubBtn'}>
            <Link to={config.header.githubUrl} aria-label="Follow">
              {getIcon(ICON.GITHUB)}
            </Link>
          </li>
          <li>
            <Link to={config.header.twitterUrl}>{getIcon(ICON.TWITTER)}</Link>
          </li>
          <li>
            <Link to={config.header.linkedInUrl}>{getIcon(ICON.LINKEDIN)}</Link>
          </li>
          <li>
            <Link to={'/rss.xml'}>{getIcon(ICON.RSS)}</Link>
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
      {isSearchEnabled ? (
        <div className={'searchWrapper'}>
          <SearchComponent collapse={true} indices={searchIndices} />
        </div>
      ) : null}
    </StyledBgDiv>
  </div>
);

export default Header;
