import { Location as HLocation } from 'history';
import { Query } from '../../graphql-types';

export interface IPageProps {
  data: Query;
  path: string;
  pageContext: {
    next: INode;
    previous: INode;
    slug: string;
  };
}

export interface IProps {
  props?: IPageProps;
  pageContent?: JSX.Element;
  pageTitle?: string;
  showGithub?: boolean;
  showComments?: boolean;
  location?: WindowLocation;
}

export interface ILayoutProps {
  location?: WindowLocation;
  children?: any;
  theme?: any;
}

export type WindowLocation = Window['location'] & HLocation;

export interface IColors {
  background?: string;
  text?: string;
  preFormattedText?: string;
  link?: string;
  heading?: string;
}

export interface ITheme {
  colors?: IColors;
  smallBorderRadius?: string | number;
  gray?: string;
  darkBlue?: string;
  lightBlue?: string;
  lightGray?: string;
  darkGray?: string;
  shortTrans?: string | boolean;
  veryLightGray?: string;
}

export interface IStyle {
  theme?: ITheme;
  show?: string | boolean;
  level?: number;
  active?: boolean;
  focus?: any;
}

export interface ICategory {
  fieldValue?: string;
}

export interface INodeFrontMatter {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaDate?: string;
  tags?: string;
  img?: string;
}

export interface INodeFields {
  slug?: string;
  id: number;
  title?: string;
  date?: string;
  tags?: string;
  img?: string;
}

export interface INode {
  fields?: INodeFields;
  ext?: string;
  relativePath?: string;
  body?: any;
  html?: string;
  tableOfContents?: string;
  frontmatter?: INodeFrontMatter;
  name?: string;
}

export interface IEdges {
  edges?: {
    node?: INode;
  }[];
}

export interface IQueryResult {
  allMarkdownRemark?: IEdges;
  allPages?: IEdges;
  allMdx?: IEdges;
  tagsGroup: {
    group?: ICategory[];
  };
}
