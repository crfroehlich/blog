import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { PageTitle } from '../components';
import { StyledMainWrapper } from '../styles';

export const Source = (props): JSX.Element => {
  const {
    pageContext: { pageLabels, mdx },
  } = props;
  const { title, github } = mdx.fields;
  const updated = new Date(mdx.fields.updated);

  return (
    <div>
      <PageTitle
        title={title}
        gitHubPath={github}
        tags={pageLabels}
        tagLinkPrefix={'этикетка'}
        date={updated}
      />
      <StyledMainWrapper>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </StyledMainWrapper>
    </div>
  );
};

export default Source;
