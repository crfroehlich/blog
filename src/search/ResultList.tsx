import * as React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import Img from 'gatsby-image';
import {
  ResultListWrapper as ResultListWrapper,
  ResultPreview as ResultPreview,
  ResultDetails as ResultDetails,
  ResultTitle as ResultTitle,
  ResultMeta as ResultMeta,
  ResultDate as ResultDate,
  ResultTags as ResultTags,
} from '../styles/ResultListStyles';

interface ResultListProps {
  image?: any;
  title: string;
  url: string;
  date?: string;
  tags?: [];
  className?: string;
  imageType?: 'fixed' | 'fluid';
}

export const ResultList: React.FC<ResultListProps> = ({
  image,
  title,
  url,
  date,
  tags,
  className,
  imageType,
  ...props
}) => {
  // Add all classs to an array
  const addAllClasses = ['post_list'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <ResultListWrapper className={addAllClasses.join(' ')} {...props}>
      <Link to={url}>
        {image == null ? null : (
          <ResultPreview className="post_preview">
            {imageType === 'fluid' ? (
              <Img fluid={image} alt="post preview" />
            ) : (
              <Img fixed={image} alt="post preview" />
            )}
          </ResultPreview>
        )}

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
            {tags == null ? null : (
              <ResultTags className="post_tags">
                {tags.map((tag: string, index: number) => (
                  <span key={index}>{`#${tag}`}</span>
                ))}
              </ResultTags>
            )}
          </ResultMeta>
        </ResultDetails>
      </Link>
    </ResultListWrapper>
  );
};

ResultList.defaultProps = {
  imageType: 'fluid',
};

export default ResultList;
