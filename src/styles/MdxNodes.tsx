import React from 'react';

export const MdxNodes = {
  h1: (props) => (
    <h1 className="heading1" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
  ),
  h2: (props) => (
    <h2 className="heading2" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
  ),
  h3: (props) => (
    <h3 className="heading3" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
  ),
  h4: (props) => (
    <h4 className="heading4" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
  ),
  h5: (props) => (
    <h5 className="heading5" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
  ),
  h6: (props) => (
    <h6 className="heading6" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />
  ),
  p: (props) => <p className="paragraph" {...props} />,
  a: (props) => <a href={props.href} target="_blank" rel="noopener noreferrer" id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};