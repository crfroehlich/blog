import React from 'react';

export const GithubLink = ({ link, text }) => {
  return (
    <a href={link} className="githubSection">
      <img className="githubIcon" src={'../github.svg'} alt="github" />
      {text}
    </a>
  );
};

export default GithubLink;
