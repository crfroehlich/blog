import React from 'react';
//const githubIcon = require.resolve('./components/images/github.svg');

export const GithubLink = ({ link, text }) => {
  return (
    <a href={link} className="githubSection">
      <img className="githubIcon" src={'./components/images/github.svg'} alt="github" />
      {text}
    </a>
  );
};

export default GithubLink;
