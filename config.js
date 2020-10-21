
const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://blog.luddites.me',
    gaTrackingId: 'G-WZTYEG3VZJ',
    trailingSlash: false,
  },
  header: {
    logo: 'https://raw.githubusercontent.com/crfroehlich/cdn/main/images/luddite_logo.svg',
    logoLink: 'https://github.com/crfroehlich/',
    title: 'LUDDITES, INC.',
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
    links: [{ text: 'Home', link: '/' }],
    search: {
      enabled: true,
      indexName: 'blog',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: ['/Welcome'],
    collapsedNav: [],
    links: [{ text: 'CRF', link: 'https://www.linkedin.com/in/christopherfroehlich/' }],
    frontline: false,
    ignoreIndex: true,
    title:
      "<div>hiking</div><div class='greenCircle'></div><div>my</div><div class='greenCircle'></div><div>desk</div>",
  },
  siteMetadata: {
    title: 'Christopher Froehlich\'s Blog | Hiking My Desk',
    description: 'A blog apart ',
    ogImage: null,
    docsLocation: 'https://github.com/crfroehlich/blog/tree/main/content',
    favicon: 'https://raw.githubusercontent.com/crfroehlich/cdn/main/images/luddite_favicon.svg',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Hiking My Desk',
      short_name: 'HikingMyDesk',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.svg',
          sizes: `512x512`,
          type: `image/svg`,
        },
      ],
    },
  },
};

module.exports = config;
