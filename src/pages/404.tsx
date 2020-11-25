import React from 'react';
import { Link, PageTitle } from '../components';
import { StyledMainWrapper } from '../styles';

export const PageNotFound = (props): JSX.Element => {
  const { path } = props;
  const title = 'This Trail Closed for Maintenance';

  return (
    <div>
      <PageTitle title={title} />
      <StyledMainWrapper>
        <div>
          Sadly, your journey to <code>{path}</code> ends here. <Link to={'/'}>Go back</Link> to
            the beginning; consider the navel and its many wonders; cast your gaze inward and
            skyward and outbetween.
          </div>
      </StyledMainWrapper>
    </div>
  );
};

export default PageNotFound;