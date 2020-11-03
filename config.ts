export const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://blog.luddites.me',
    gaTrackingId: 'G-WZTYEG3VZJ',
    trailingSlash: false,
    cdnUrl: 'https://raw.githubusercontent.com/crfroehlich/cdn/main/images/'
  },
  header: {
    logo: 'https://raw.githubusercontent.com/crfroehlich/cdn/main/images/luddite_logo.svg',
    logoLink: 'https://github.com/crfroehlich/',
    title: 'ЛУДДИТЫ, INC.',
    githubUrl: 'https://github.com/crfroehlich/blog',
    helpUrl: '',
    tweetText: '',
    social: `<li>
		    <a href="https://twitter.com/tquestingbeast" target="_blank" rel="noopener">
		      <div class="twitterBtn">
		        <img src="https://raw.githubusercontent.com/crfroehlich/cdn/main/images/twitter_icon.svg" alt={'Discord'}/>
		      </div>
		    </a>
		  </li>`,
    links: [{ text: 'визуализации', link: '/визуализации' }],
    search: {
      enabled: true,
      indexName: 'blog',
      algoliaAppId: process.env.ALGOLIA_APPLICATION_ID,
      algoliaSearchKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_API_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: ['/Welcome'],
    collapsedNav: [],
    links: [{ text: 'CRF', link: 'https://www.linkedin.com/in/christopherfroehlich/' }],
    frontLine: false,
    ignoreIndex: true,
    title:
      "<div>hiking</div><div class='greenCircle'></div><div>my</div><div class='greenCircle'></div><div>desk</div>",
  },
  siteMetadata: {
    title: 'Christopher Froehlich\'s Blog | Hiking My Desk',
    description: 'A blog apart',
    ogImage: null,
    docsLocation: 'https://github.com/crfroehlich/blog/tree/main/content',
    favicon: 'https://raw.githubusercontent.com/crfroehlich/cdn/main/images/luddite_favicon.svg',
  },
  pwa: {
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
