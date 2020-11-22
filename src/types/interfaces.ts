import { Location as HLocation } from 'history';
import { Query } from '../../graphql-types';

export interface IPageProps {
  data: Query;
  path: string;
  pageContext: {
    background?: any;
    next?: INode;
    pageLabels?: any[];
    pageTags?: any[];
    previous?: INode;
    slug: string;
    toc?: {
      type: 'Article' | 'Tag' | 'Visualization';
      content: any;
    };
    title: string;
    mdx?: INode;
  };
  pageTags?: any;
  site: {
    siteMetadata: {
      docsLocation: any;
    };
  };
  location?: WindowLocation;
  pageContent?: JSX.Element;
  pageTitle?: string;
  props?: IPageProps;
  children?: any;
  theme?: any;
}

export type WindowLocation = Window['location'] & HLocation;

export interface ICategory {
  fieldValue?: string;
  totalCount?: number;
}

export interface INodeFrontMatter {
  background?: any;
  created?: Date;
  date?: Date | string;
  description?: string;
  draft: boolean;
  github?: string;
  labels?: string[];
  subtitle?: string;
  tags?: string[];
  title?: string;
  updated?: Date;
}

export interface INodeFields {
  background?: any;
  created?: string;
  date?: string;
  description?: string;
  github?: string;
  id: number;
  labels?: string[];
  slug?: string;
  subtitle?: string;
  tags?: string[];
  title?: string;
  type: 'Article' | 'Source';
  updated?: string;
}

export interface INode {
  body?: any;
  ext?: string;
  fields?: INodeFields;
  frontmatter?: INodeFrontMatter;
  html?: string;
  name?: string;
  relativePath?: string;
  parent?: INode;
  tableOfContents?: {
    items?: any[];
  };
}

export interface IEdges {
  edges?: {
    node?: INode;
  }[];
}

export interface IQueryResult {
  allMarkdownRemark?: IEdges;
  allMdx?: IEdges;
  allPages?: IEdges;
  allSrc?: IEdges;
  labelsGroup: {
    group?: ICategory[];
  };
  tagsGroup: {
    group?: ICategory[];
  };
}
