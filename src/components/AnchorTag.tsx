import React from 'react';

export const AnchorTag = ({ children: link, ...props }): JSX.Element => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {link}
    </a>
  );
};

export default AnchorTag;
