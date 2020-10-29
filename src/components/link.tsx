import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';
import {tools} from '../utils/tools';

export const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  );

export const DisplayDate = ({ date }) => {
  return (<span
      className={'blogDate'}>
      {tools.getLocalDate(date)
    }</span>);
}

export default Link;
