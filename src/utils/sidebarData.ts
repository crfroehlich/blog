import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { graphql, useStaticQuery } from 'gatsby';

export interface ISection {
  active: boolean;
  articles?: any[];
  source?: any;
  icon: IconProp;
  name: string;
  open: boolean;
}

export interface ISidebar {
  sections: ISection[];
  open: boolean;
}

export const buildSidebar = (mdx, src): ISidebar => {
  const allArticles = mdx.group.sort((a, b) => {
    switch (a.fieldValue.localeCompare(b.fieldValue, 'en', { numeric: true })) {
      case -1:
        return 1;
      case 1:
        return -1;
      default:
        return 0;
    }
  });

  const flatten = (g) => {
    return {
      active: false,
      open: false,
      year: g.fieldValue,
      posts: g.edges.map((e) => {
        return {
          active: false,
          date: new Date(e.node.fields.date),
          open: false,
          slug: e.node.fields.slug,
          title: e.node.fields.title,
          year: e.node.fields.year,
        };
      }),
    };
  };

  const buildSrc = (s) => {
    const menu = {
      name: 'src',
      links: [],
    };
    s.edges.forEach((e) => {
      const sub1 = e.node.fields.slug.split('/');
      const sub = sub1.slice(1, sub1.length);
      const link = {
        slug: e.node.fields.slug,
        title: e.node.fields.title,
        active: false,
        open: false,
      };
      if (sub.length === 1) {
        menu.links.push(link);
      } else {
        let m = menu;
        sub.forEach((name, i) => {
          if (i === sub.length - 1) {
            m.links.push(link);
          } else {
            let x = m.links.find((e) => e.name === name);
            if (!x) {
              x = { name, links: [] };
              m.links.push(x);
            }
            m = x;
          }
        });
      }
    });
    return menu;
  };

  const recent: ISection = {
    active: true,
    articles: allArticles.slice(0, 2).map(flatten),
    icon: ['fas', 'mug-hot'],
    name: 'Recent',
    open: true,
  };

  const archive: ISection = {
    active: false,
    articles: allArticles.slice(3, allArticles.length - 1).map(flatten),
    icon: ['fas', 'treasure-chest'],
    name: 'Alcoves',
    open: false,
  };

  const source: ISection = {
    active: false,
    source: buildSrc(src),
    icon: ['fas', 'soup'],
    name: 'Source Code',
    open: false,
  };
  return {
    sections: [recent, archive, source],
    open: true,
  };
};

export const getSideBarData = (): ISidebar => {
  const { allMdx, allSrc } = useStaticQuery(
    graphql`
      query GetNewSidebarLayoutQuery {
        allMdx(
          filter: {
            fileAbsolutePath: { glob: "**/content/posts/**" }
            fields: { slug: { ne: "/" } }
          }
          sort: { fields: fields___date, order: DESC }
        ) {
          group(field: fields___year) {
            edges {
              node {
                fields {
                  slug
                  title
                  year
                  date
                }
              }
            }
            fieldValue
          }
        }
        allSrc: allMdx(
          filter: { fileAbsolutePath: { glob: "**/content/src/**" } }
          sort: { fields: slug }
        ) {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `,
  );
  return buildSidebar(allMdx, allSrc);
};
