import React from 'react';
import { IProps } from 'src/types/interfaces';
import Link from './Link';
import PageWrapper from './PageWrapper';

export const NotFound: React.FC<IProps> = ({ props }) => {
  const {
    path,
  } = props;

  const fourOhFour = <div>Sadly, your journey to <code>{path}</code> ends here. <Link to={'/'}>Go back</Link> to the beginning; consider the navel and its many wonders; cast your gaze inward and skyward and outbetween.</div>;

  return (
    <PageWrapper
      pageTitle={'This Trail Closed for Maintenance'}
      props={props}
      pageContent={fourOhFour}
    />
  );
};

export default NotFound;