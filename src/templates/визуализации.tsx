import React, { Component } from 'react';
import { graphql, navigate } from 'gatsby';
import KeywordCloud from 'react-keyword-cloud';

import { IPageProps } from '../types';
import { StyledHeading, StyledMainWrapper } from '../components';
import { tools } from '../utils';

export default class визуализации extends Component<IPageProps> {
  render(): JSX.Element {
    if (!tools.isBrowser()) return <div />;

    const {
      data: {
        allMdx: { group },
      },
    } = this.props;

    group.sort((a, b) => b.totalCount - a.totalCount);

    const title = 'Fancy. Thinking the beast was something we could kill...';
    return (
      <div>
        <div className={'titleWrapper'}>
          <StyledHeading>{title}</StyledHeading>
        </div>
        <StyledMainWrapper>
          <KeywordCloud
            height={800}
            width={1066}
            rotate={(d) => {
              const positions = [0, 90, 270];

              return positions[Math.floor(Math.random() * positions.length)];
            }}
            data={group.map((g) => {
              return { text: g.fieldValue, value: g.totalCount * 10, font: 'impact' };
            })}
            colors={['#fff', '#1ed3c6', '#d1d2d3', '#f8f8f8', '#001934']}
            font={'popper'}
            // spiral={'rectangular'}
            // fontSize={(node) => 1.01 * node.value}
            onKeyWordClick={(el) => navigate(`/тег/${el.text}`)}
            // onKeyWordMouseOver={console.info}
            // onKeyWordMouseOut={console.info}
          />
        </StyledMainWrapper>
      </div>
    );
  }
}

export const визуализацииQuery = graphql`
  query GetVisualizationsQuery {
    allMdx(filter: { fileAbsolutePath: { glob: "**/content/posts/**" } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
