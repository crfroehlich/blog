export interface ISearch {
  term:   string;
  result: IResult[];
}

export interface IResult {
  item:     IArticle;
  refIndex: number;
  matches:  IMatch[];
}

interface IArticle {
  date:        string;
  subtitle:    null;
  title:       string;
  description: string;
  tags:        string[];
  background:  IBackground;
  slug:        string;
  excerpt:     string;
}

interface IBackground {
  childImageSharp: IChildImageSharp;
}

interface IChildImageSharp {
  fixed: IFixed;
}

interface IFixed {
  base64:      string;
  aspectRatio: number;
  width:       number;
  height:      number;
  src:         string;
  srcSet:      string;
}

export interface IMatch {
  indices:   Array<number[]>;
  value:     string;
  key:       string;
  refIndex?: number;
}