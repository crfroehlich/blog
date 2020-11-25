import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { tools } from '../utils/tools';

const isRelativeUrl = (url: string): boolean => {
  const doc = tools.getDocument();
  if(doc?.baseURI) {
    return new URL(doc.baseURI).origin === new URL(url, document.baseURI).origin;
  }
  const urlPattern = new RegExp('^(?:[a-z]+:)?//', 'i');
  return urlPattern.test(url) === false;
}

export const Link: React.FC<any> = ({ to, ...props }): JSX.Element => {
  if (isRelativeUrl(to)) {
    return <GatsbyLink to={to} {...props} />;
  }
  return (
    <div>
      <a href={to} {...props}>
        {props.children}
      </a>
    </div>
  );
};

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
