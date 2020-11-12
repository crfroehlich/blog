import React from 'react';
import { Link } from './Link';
import { INode } from '../types';
import { StyledNextPrevious } from './styles/StyledNextPrevious';
import { Icon } from './Icon';

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
          {Icon({ icon: ['fas', 'arrow-alt-left'], size: 'lg', style: { paddingLeft: '5px' } })}
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
          {Icon({
            icon: ['fas', 'arrow-alt-right'],
            size: 'lg',
            style: { paddingRight: '5px' },
          })}
        </Link>
      ) : null}
    </StyledNextPrevious>
  );
};

export default NextPrevious;
