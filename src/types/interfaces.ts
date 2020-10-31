import { Query } from "graphql-types";
import { Location as HLocation } from 'history';

export interface IPageProps {
  data: Query;
  path: string;
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
