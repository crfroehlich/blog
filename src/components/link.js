import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';

export const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  );

export const DisplayDate = ({ date }) => {
  return (<span className={'blogDate'}>{date ? date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit'
  }) : ''}</span>);
}

export default Link;
