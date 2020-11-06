import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';
import { tools } from '../utils/tools';

export const Link: React.FC<any> = ({ to, ...props }): JSX.Element =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  );

interface IDisplayDate {
  date: Date;
  props?: any;
  style?: any;
}

export const DisplayDate: React.FC<IDisplayDate> = ({ date, style, ...props }): JSX.Element => {
  return (
    <span {...props} style={style} className={'blogDate'}>
      {tools.getLocalDate(date)}
    </span>
  );
};

export default Link;
