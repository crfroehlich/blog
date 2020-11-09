import React from 'react';
import { Link } from './Link';
import { INode } from '../types';
import { StyledNextPrevious } from './styles/StyledNextPrevious';

interface INextPrev {
  next: INode;
  prev: INode;
}

export const NextPrevious: React.FC<INextPrev> = ({ next, prev }): JSX.Element => {
  if (!next || !prev) return <div />;

  const locale = 'ru-RU';

  const getDate = (node: INode): string =>
    new Date(node.fields.date).toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  const getTitle = (node: INode) => {
    return node?.fields.title.trim();
  };

  return (
    <StyledNextPrevious>
      {prev?.fields ? (
        <Link to={prev.fields.slug} title={prev.fields.title} className={'previousBtn'}>
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
              <span>{getDate(prev)}</span>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{getTitle(prev)}</span>
            </div>
          </div>
        </Link>
      ) : null}
      {next?.fields ? (
        <Link to={next.fields.slug} title={next.fields.title} className={'nextBtn'}>
          <div className={'nextRightWrapper'}>
            <div className={'smallContent'}>
              <span>{getDate(next)}</span>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{getTitle(next)}</span>
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
