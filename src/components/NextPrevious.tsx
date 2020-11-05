import React from 'react';
import { Link } from './Link';

import { StyledNextPrevious } from './styles/StyledNextPrevious';

export const NextPrevious = ({ mdx, nav }) => {
  if (!nav || !mdx) return <div />;

  let currentIndex = 0;

  nav.map((el, index) => {
    if (el && el.slug === mdx.fields.slug) {
      currentIndex = index;
    }
  });
  const locale = 'ru-RU';

  const getNav = (offset) => nav[currentIndex + offset];

  const getNavPrev = () => getNav(-1);

  const getNavNext = () => getNav(1);

  const getDate = (offset) =>
    new Date(getNav(offset).date).toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  const getTitle = (offset) => {
    let title = getNav(offset).title.trim();

    // TODO: compute the total length of left/right and set accordingly
    if (offset === 1 && title.length > 38) {
      title = `${title.substr(0, 34).trim()}…`;
    }
    if (offset === -1 && title.length > 41) {
      title = `${title.substr(0, 38).trim()}…`;
    }
    return title;
  };

  const nextInfo = getNav(1);

  const previousInfo = getNav(-1);

  return (
    <StyledNextPrevious>
      {previousInfo && currentIndex >= 0 ? (
        <Link to={getNavPrev().slug} title={getNavPrev().title} className={'previousBtn'}>
          <div className={'leftArrow'}>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </g>
            </svg>
          </div>
          <div className={'preRightWrapper'}>
            <div className={'smallContent'}>
              <span>{getDate(-1)}</span>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{getTitle(-1)}</span>
            </div>
          </div>
        </Link>
      ) : null}
      {nextInfo && currentIndex >= 0 ? (
        <Link to={getNavNext().slug} title={getNavNext().title} className={'nextBtn'}>
          <div className={'nextRightWrapper'}>
            <div className={'smallContent'}>
              <span>{getDate(1)}</span>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{getTitle(1)}</span>
            </div>
          </div>
          <div className={'rightArrow'}>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </g>
            </svg>
          </div>
        </Link>
      ) : null}
    </StyledNextPrevious>
  );
};

export default NextPrevious;
