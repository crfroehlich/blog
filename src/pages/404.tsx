import React, { Component } from 'react';
import { IPageProps } from '../types';
import { Link, StyledHeading, StyledMainWrapper } from '../components';

export default class PageNotFound extends Component<IPageProps> {
  render(): JSX.Element {
    const { path } = this.props;
    const title = 'This Trail Closed for Maintenance';

    return (
      <div>
        <div className={'titleWrapper'}>
          <StyledHeading>{title}</StyledHeading>
        </div>
        <StyledMainWrapper>
          <div>
            Sadly, your journey to <code>{path}</code> ends here. <Link to={'/'}>Go back</Link> to
            the beginning; consider the navel and its many wonders; cast your gaze inward and
            skyward and outbetween.
          </div>
        </StyledMainWrapper>
      </div>
    );
  }
}
