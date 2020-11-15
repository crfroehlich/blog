import { Location as HLocation } from 'history';
import { Query } from '../../graphql-types';

export interface IPageProps {
  data: Query;
  path: string;
  pageContext: {
    next?: INode;
    previous?: INode;
    slug: string;
    pageTags?: any[];
    pageLabels?: any[];
    toc?: {
      type: 'Article' | 'Tag' | 'Visualization';
      content: any;
    };
    title: string;
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

export interface IColors {
  background?: string;
  heading?: string;
  link?: string;
  preFormattedText?: string;
  text?: string;
}

export interface ITheme {
  colors?: IColors;
  darkBlue?: string;
  darkGray?: string;
  gray?: string;
  lightBlue?: string;
  lightGray?: string;
  shortTrans?: string | boolean;
  smallBorderRadius?: string | number;
  veryLightGray?: string;
}

export interface IStyle {
  active?: boolean;
  focus?: any;
  level?: number;
  show?: string | boolean;
  theme?: ITheme;
}

export interface ICategory {
  fieldValue?: string;
  totalCount?: number;
}

export interface INodeFrontMatter {
  created?: Date;
  date?: Date | string;
  description?: string;
  draft: boolean;
  github?: string;
  img?: string;
  labels?: string[] | string;
  subtitle?: string;
  tags?: string[] | string;
  title?: string;
  updated?: Date;
}

export interface INodeFields {
  created?: string;
  date?: string;
  github?: string;
  id: number;
  img?: string;
  labels?: string[];
  slug?: string;
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
