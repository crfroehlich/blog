import React from 'react';
import { IProps } from '../types/interfaces';
import { Empty } from './Empty';
import { Link } from './Link';
import { PageWrapper } from './PageWrapper';

export const NotFound: React.FC<IProps> = ({ props }): JSX.Element => {
  if (!props) return <Empty />;

  const { path } = props;

  const fourOhFour = (
    <div>
      Sadly, your journey to <code>{path}</code> ends here. <Link to={'/'}>Go back</Link> to the
      beginning; consider the navel and its many wonders; cast your gaze inward and skyward and
      outbetween.
    </div>
  );

  return (
    <PageWrapper
      pageTitle={'This Trail Closed for Maintenance'}
      props={props}
      pageContent={fourOhFour}
    />
  );
};

export default NotFound;
