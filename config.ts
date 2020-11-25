import { PluginRef } from 'gatsby';

/* eslint-disable camelcase */
export interface IConfig {
  gatsby: Gatsby;
  header: Header;
  sidebar: Sidebar;
  siteMetadata: SiteMetadata;
  offline: Offline;
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

export interface Offline {
  enabled: boolean;
  manifest: Manifest;
}

export interface Manifest {
  background_color: string;
  cache_busting_mode: string;
  crossOrigin: string;
  display: string;
  icon: string;
  name: string;
  short_name: string;
  start_url: string;
  theme_color: string;
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
  offline: {
    enabled: true, // disabling this will also remove the existing service worker.
    manifest: {
      background_color: '#6b37bf',
      cache_busting_mode: 'query',
      crossOrigin: 'use-credentials',
      display: 'standalone',
      icon: './static/favicon.svg',
      name: 'Hiking My Desk',
      short_name: 'HikingMyDesk',
      start_url: '/',
      theme_color: '#6b37bf',
    },
  },
};

export const getConfig = (): IConfig => siteConfig;

export type addConfig = (conf: IConfig, plugins: Array<PluginRef>) => void;
