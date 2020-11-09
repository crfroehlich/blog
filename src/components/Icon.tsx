import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGithub,
  faLinkedin,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faRss, faArchive, faRubleSign } from '@fortawesome/free-solid-svg-icons';

export enum ICON {
  GITHUB = 'github',
  LINKEDIN = 'linkedin',
  RSS = 'rss',
  TWITTER = 'twitter',
  RUBLE_SIGN = 'rublesign',
}

export const getIcon = (icon: ICON, props?: Partial<FontAwesomeIconProps>): JSX.Element => {
  let ico: IconDefinition = faGithub;

  switch (icon) {
    case ICON.GITHUB:
      ico = faGithub;
      break;
    case ICON.LINKEDIN:
      ico = faLinkedin;
      break;
    case ICON.RSS:
      ico = faRss;
      break;
    case ICON.RUBLE_SIGN:
      ico = faRubleSign;
      break;
    case ICON.TWITTER:
      ico = faTwitter;
      break;
    default:
      ico = faArchive;
      break;
  }
  return <FontAwesomeIcon icon={ico} {...props} />;
};
