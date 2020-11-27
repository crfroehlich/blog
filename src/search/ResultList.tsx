import * as React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import Img from 'gatsby-image';
import {
  ResultListWrapper,
  ResultPreview,
  ResultDetails,
  ResultTitle,
  ResultMeta,
  ResultDate,
  ResultTags,
} from '../styles/ResultListStyles';
import { Logger } from '../utils';

export const ResultList = (props) => {
  const {
    item: {
      background,
      title,
      slug,
      date,
      tags,
      className,
    },
  } = props;
  // Add all classs to an array
  const addAllClasses = ['resultList'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }
  try {
    return (
      <ResultListWrapper className={addAllClasses.join(' ')} {...props}>
        <Link to={slug}>
          <ResultPreview className="post_preview">
            <Img fixed={background?.childImageSharp?.fixed} alt="post preview" />
          </ResultPreview>
          <ResultDetails>
            <ResultTitle className="post_title">{title}</ResultTitle>
            <ResultMeta>
              {date && (
                <ResultDate
                  dangerouslySetInnerHTML={{
                    __html: date,
                  }}
                  className="post_date"
                />
              )}
              <ResultTags className="post_tags">
                {tags?.map((tag: string, index: number) => (
                  <span key={index}>{`#${tag}`}</span>
                ))}
              </ResultTags>
            </ResultMeta>
          </ResultDetails>
        </Link>
      </ResultListWrapper>
    );
  } catch (e) {
    Logger.error(e);
  }
};

export default ResultList;
