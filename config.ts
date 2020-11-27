import { PluginRef } from 'gatsby';

/* eslint-disable camelcase */
export interface IConfig {
  gatsby: Gatsby;
  header: Header;
  sidebar: Sidebar;
  siteMetadata: SiteMetadata;
}

export interface Gatsby {
  pathPrefix: string;
  siteUrl: string;
  gaTrackingId: string;
  trailingSlash: boolean;
  cdnUrl: string;
}

export interface Header {
  logo: string;
  logoLink: string;
  title: string;
  githubUrl: string;
  helpUrl: string;
  tweetText: string;
  twitterUrl: string;
  linkedInUrl: string;
  links: Link[];
}

export interface Link {
  text: string;
  link: string;
  tooltip: string;
}

export interface Sidebar {
  links: any[];
  frontLine: boolean;
}

export interface SiteMetadata {
  title: string;
  description: string;
  ogImage: null;
  docsLocation: string;
  favicon: string;
}

const siteConfig = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://blog.luddites.me',
    gaTrackingId: 'G-WZTYEG3VZJ',
    trailingSlash: false,
    cdnUrl: '/',
  },
  header: {
    logo: '/luddite_logo.svg',
    logoLink: 'https://github.com/crfroehlich/',
    title: 'ЛУДДИТЫ, INC.',
    githubUrl: 'https://github.com/crfroehlich/blog',
    helpUrl: '',
    tweetText: "T'was...",
    twitterUrl: 'https://twitter.com/tquestingbeast',
    linkedInUrl: 'https://www.linkedin.com/in/christopherfroehlich/',
    links: [{ text: 'визуализации', link: '/визуализации', tooltip: 'Visualizations' }],
  },
  sidebar: {
    links: [],
    frontLine: false,
  },
  siteMetadata: {
    title: "Christopher Froehlich's Blog | Hiking My Desk",
    description: 'A blog apart',
    ogImage: null,
    docsLocation: 'https://github.com/crfroehlich/blog/tree/main/content',
    favicon: '/favicon.svg',
  },
};

export const getConfig = (): IConfig => siteConfig;

export type addConfig = (conf: IConfig, plugins: Array<PluginRef>) => void;
