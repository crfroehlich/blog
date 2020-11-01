import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';
import { tools } from '../utils/tools';

export const Link: React.FC<any> = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  );

export const DisplayDate: React.FC<any> = ({ date }) => {
  return <span className={'blogDate'}>{tools.getLocalDate(date)}</span>;
};

export default Link;
